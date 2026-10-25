/**
 * Official Mastered AI Coach Live Continuous Voice Pipeline
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md & Section 3/4/5/6 Corrective Prompt
 * 
 * Features:
 * 1. 12-State Explicit Conversation Machine (IDLE, INITIALIZING, REQUESTING_MICROPHONE,
 *    LISTENING, PROCESSING_SPEECH, GENERATING_RESPONSE, SPEAKING, INTERRUPTED,
 *    PAUSED, RECOVERING, ENDING, ERROR)
 * 2. Continuous Hands-Free Voice Loop (No push-to-talk button between turns)
 * 3. Web Audio API (AudioContext + AnalyserNode) for real-time volume level & waveform
 * 4. End-of-turn Voice Activity Detection (VAD) / silence timer
 * 5. Barge-in Interruption (Student speaking aborts coach speech immediately)
 * 6. Natural Spoken Intent Recognition ("stop", "pause", "repeat that", "speak slowly", etc.)
 * 7. Browser-local execution with zero remote audio upload and zero paid API dependencies
 */

(function () {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  // 12 Required Official States
  var STATES = {
    IDLE: 'IDLE',
    INITIALIZING: 'INITIALIZING',
    REQUESTING_MICROPHONE: 'REQUESTING_MICROPHONE',
    LISTENING: 'LISTENING',
    PROCESSING_SPEECH: 'PROCESSING_SPEECH',
    GENERATING_RESPONSE: 'GENERATING_RESPONSE',
    SPEAKING: 'SPEAKING',
    INTERRUPTED: 'INTERRUPTED',
    PAUSED: 'PAUSED',
    RECOVERING: 'RECOVERING',
    ENDING: 'ENDING',
    ERROR: 'ERROR'
  };

  // Valid State Transitions
  var VALID_TRANSITIONS = {
    IDLE: ['INITIALIZING', 'REQUESTING_MICROPHONE', 'ERROR', 'ENDING'],
    INITIALIZING: ['REQUESTING_MICROPHONE', 'LISTENING', 'ERROR', 'IDLE'],
    REQUESTING_MICROPHONE: ['LISTENING', 'ERROR', 'IDLE'],
    LISTENING: ['PROCESSING_SPEECH', 'PAUSED', 'INTERRUPTED', 'RECOVERING', 'ENDING', 'ERROR', 'IDLE'],
    PROCESSING_SPEECH: ['GENERATING_RESPONSE', 'LISTENING', 'RECOVERING', 'ERROR', 'ENDING', 'IDLE'],
    GENERATING_RESPONSE: ['SPEAKING', 'LISTENING', 'ERROR', 'ENDING', 'IDLE'],
    SPEAKING: ['LISTENING', 'INTERRUPTED', 'PAUSED', 'ENDING', 'ERROR', 'IDLE'],
    INTERRUPTED: ['LISTENING', 'PROCESSING_SPEECH', 'IDLE', 'ERROR'],
    PAUSED: ['LISTENING', 'ENDING', 'IDLE'],
    RECOVERING: ['LISTENING', 'REQUESTING_MICROPHONE', 'ERROR', 'IDLE'],
    ENDING: ['IDLE'],
    ERROR: ['RECOVERING', 'IDLE', 'REQUESTING_MICROPHONE']
  };

  // Natural Spoken Voice Intents
  var SPOKEN_INTENTS = {
    PAUSE: /^(stop|pause|wait|hold on|give me a second|pause practice|stop practice)[\.!\?]?$/i,
    RESUME: /^(resume|continue|start again|go ahead|i am ready|ready)[\.!\?]?$/i,
    REPEAT: /^(repeat( that| please)?|what did you say|say that again|could you repeat( that)?|pardon)[\.!\?]?$/i,
    SPEAK_SLOW: /^(speak slowly|speak slower|slow down|please speak slowly|too fast)[\.!\?]?$/i,
    SPEAK_NORMAL: /^(speak normally|normal speed|regular speed)[\.!\?]?$/i,
    DONT_UNDERSTAND: /^(i don't understand|i do not understand|what does that mean|explain that|help me)[\.!\?]?$/i,
    END_SESSION: /^(end session|finish( for today)?|goodbye|bye|quit|exit session)[\.!\?]?$/i
  };

  function detectSpokenIntent(text) {
    if (!text || typeof text !== 'string') return null;
    var trimmed = text.trim();
    if (SPOKEN_INTENTS.PAUSE.test(trimmed)) return 'PAUSE';
    if (SPOKEN_INTENTS.RESUME.test(trimmed)) return 'RESUME';
    if (SPOKEN_INTENTS.REPEAT.test(trimmed)) return 'REPEAT';
    if (SPOKEN_INTENTS.SPEAK_SLOW.test(trimmed)) return 'SPEAK_SLOW';
    if (SPOKEN_INTENTS.SPEAK_NORMAL.test(trimmed)) return 'SPEAK_NORMAL';
    if (SPOKEN_INTENTS.DONT_UNDERSTAND.test(trimmed)) return 'DONT_UNDERSTAND';
    if (SPOKEN_INTENTS.END_SESSION.test(trimmed)) return 'END_SESSION';
    return null;
  }

  function LiveVoicePipeline(options) {
    options = options || {};
    this.state = STATES.IDLE;
    this.lang = options.lang || 'en-US';
    this.speechRate = options.speechRate || 0.95; // Clear pedagogical cadence
    this.silenceThresholdMs = options.silenceThresholdMs || 1300; // Silence time before closing turn
    this.volumeThreshold = options.volumeThreshold || 12; // Energy threshold % for speech detection

    // Callbacks
    this.onStateChange = options.onStateChange || function () {};
    this.onAudioLevel = options.onAudioLevel || function () {};
    this.onTranscriptUpdate = options.onTranscriptUpdate || function () {};
    this.onStudentTurnComplete = options.onStudentTurnComplete || function () {};
    this.onIntentDetected = options.onIntentDetected || function () {};
    this.onError = options.onError || function () {};

    // Internal Handles
    this.mediaStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.animFrameId = null;
    this.recognition = null;
    this.synth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.accumulatedTranscript = '';
    this.lastSpeechTime = 0;
    this.silenceTimer = null;
    this.isBargeInActive = false;
    this.activeTurnId = 0;
  }

  LiveVoicePipeline.prototype.isSupported = function () {
    if (typeof window === 'undefined') return false;
    var hasRecognition = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    var hasMedia = Boolean(navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    var hasAudioContext = Boolean(window.AudioContext || window.webkitAudioContext);
    var hasSynth = Boolean(window.speechSynthesis);
    return Boolean(hasRecognition && hasSynth);
  };

  LiveVoicePipeline.prototype.canTransition = function (nextState) {
    var allowed = VALID_TRANSITIONS[this.state];
    return Boolean(allowed && allowed.indexOf(nextState) !== -1);
  };

  LiveVoicePipeline.prototype.transitionTo = function (nextState, meta) {
    if (this.state === nextState) return true;
    if (!this.canTransition(nextState)) {
      var err = "Invalid state transition from " + this.state + " to " + nextState;
      if (this.onError) {
        this.onError({ code: 'INVALID_TRANSITION', message: err });
      }
      return false;
    }

    var prevState = this.state;
    this.state = nextState;
    if (this.onStateChange) {
      this.onStateChange(this.state, prevState, meta);
    }
    return true;
  };

  /**
   * Starts the continuous hands-free live practice loop.
   */
  LiveVoicePipeline.prototype.startLiveSession = async function () {
    if (this.state !== STATES.IDLE && this.state !== STATES.ERROR) {
      return false;
    }

    this.transitionTo(STATES.INITIALIZING);

    // 1. Initialize Microphone Audio Stream & Web Audio Analyser
    try {
      this.transitionTo(STATES.REQUESTING_MICROPHONE);
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        this.setupAudioAnalyser();
      }
    } catch (err) {
      this.transitionTo(STATES.ERROR, { error: err });
      this.onError({
        code: 'MICROPHONE_DENIED',
        message: 'Microphone permission was not granted. Please allow microphone access or switch to Text Practice mode.'
      });
      return false;
    }

    // 2. Initialize Continuous Speech Recognition
    this.initSpeechRecognition();

    // 3. Move to Listening
    this.transitionTo(STATES.LISTENING);
    this.beginListeningLoop();
    return true;
  };

  LiveVoicePipeline.prototype.setupAudioAnalyser = function () {
    if (typeof window === 'undefined') return;
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass || !this.mediaStream) return;

    try {
      this.audioContext = new AudioContextClass();
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      var source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.5;
      source.connect(this.analyser);

      this.monitorAudioEnergy();
    } catch (e) {
      // AudioContext failure should not crash speech recognition
    }
  };

  LiveVoicePipeline.prototype.monitorAudioEnergy = function () {
    var self = this;
    if (!this.analyser) return;

    var dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    var tick = function () {
      if (self.state === STATES.ENDING || self.state === STATES.IDLE) return;

      self.analyser.getByteFrequencyData(dataArray);
      var sum = 0;
      for (var i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      var avg = sum / dataArray.length;
      var level = Math.min(100, Math.round((avg / 128) * 100));

      // Broadcast audio volume level for live visualizer
      if (self.onAudioLevel) {
        self.onAudioLevel(level);
      }

      // Check for Barge-in Interruption:
      // If coach is currently speaking and student begins speaking with significant volume
      if (self.state === STATES.SPEAKING && level > self.volumeThreshold + 8) {
        self.handleBargeInInterruption("Audio energy detected while coach speaking");
      }

      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        self.animFrameId = window.requestAnimationFrame(tick);
      }
    };

    tick();
  };

  LiveVoicePipeline.prototype.initSpeechRecognition = function () {
    if (typeof window === 'undefined') return;
    var SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    var self = this;
    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.lang;
      this.recognition.maxAlternatives = 1;

      this.recognition.onresult = function (event) {
        self.handleSpeechResult(event);
      };

      this.recognition.onerror = function (event) {
        self.handleSpeechError(event);
      };

      this.recognition.onend = function () {
        self.handleSpeechEnd();
      };
    } catch (e) {
      this.recognition = null;
    }
  };

  LiveVoicePipeline.prototype.beginListeningLoop = function () {
    if (!this.recognition) return;
    try {
      this.accumulatedTranscript = '';
      this.recognition.start();
    } catch (e) {
      // Recognition may already be active
    }
  };

  LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
    if (this.state === STATES.PAUSED || this.state === STATES.ENDING) return;

    // Barge-in check: if coach is speaking and recognition receives student input
    if (this.state === STATES.SPEAKING) {
      this.handleBargeInInterruption("Speech recognition captured utterance during coach speech");
    }

    var interimText = '';
    var finalText = '';

    for (var i = event.resultIndex; i < event.results.length; i++) {
      var item = event.results[i];
      var text = item[0].transcript;
      if (item.isFinal) {
        finalText += text + ' ';
      } else {
        interimText += text;
      }
    }

    if (finalText) {
      this.accumulatedTranscript += finalText;
    }

    var combined = (this.accumulatedTranscript + interimText).trim();
    if (this.onTranscriptUpdate) {
      this.onTranscriptUpdate(combined, interimText);
    }

    if (combined.length > 0) {
      this.lastSpeechTime = Date.now();
      this.resetSilenceTimer();
    }
  };

  LiveVoicePipeline.prototype.resetSilenceTimer = function () {
    var self = this;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
    }

    this.silenceTimer = setTimeout(function () {
      self.onSilenceTimeout();
    }, this.silenceThresholdMs);
  };

  LiveVoicePipeline.prototype.onSilenceTimeout = function () {
    if (this.state !== STATES.LISTENING && this.state !== STATES.INTERRUPTED) return;

    var candidate = this.accumulatedTranscript.trim();
    if (!candidate || candidate.split(/\s+/).length < 1) {
      return; // Still waiting for valid speech
    }

    // End-of-turn detected!
    this.transitionTo(STATES.PROCESSING_SPEECH);

    // Check for Spoken Voice Intents ("stop", "pause", "repeat that", etc.)
    var intent = detectSpokenIntent(candidate);
    if (intent) {
      this.accumulatedTranscript = '';
      this.handleVoiceIntent(intent, candidate);
      return;
    }

    // Complete Student Spoken Turn
    var turnUtterance = candidate;
    this.accumulatedTranscript = '';

    if (this.onStudentTurnComplete) {
      this.onStudentTurnComplete({
        turnId: ++this.activeTurnId,
        text: turnUtterance,
        confidence: 0.95,
        source: 'speech',
        timestamp: Date.now()
      });
    }
  };

  LiveVoicePipeline.prototype.handleVoiceIntent = function (intent, text) {
    if (this.onIntentDetected) {
      this.onIntentDetected(intent, text);
    }

    var self = this;
    if (intent === 'PAUSE') {
      this.pauseListening();
    } else if (intent === 'RESUME') {
      this.resumeListening();
    } else if (intent === 'SPEAK_SLOW') {
      this.speechRate = 0.8;
      this.speakCoachResponse("I will speak more slowly now. What would you like to say next?", function () {
        self.transitionTo(STATES.LISTENING);
      });
    } else if (intent === 'SPEAK_NORMAL') {
      this.speechRate = 0.95;
      this.speakCoachResponse("Returning to standard conversational speed. Please continue.", function () {
        self.transitionTo(STATES.LISTENING);
      });
    } else if (intent === 'END_SESSION') {
      this.endLiveSession();
    } else {
      // Return to listening
      this.transitionTo(STATES.LISTENING);
    }
  };

  LiveVoicePipeline.prototype.handleBargeInInterruption = function (reason) {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.transitionTo(STATES.INTERRUPTED, { reason: reason });
    this.accumulatedTranscript = '';
    var self = this;
    setTimeout(function () {
      if (self.state === STATES.INTERRUPTED) {
        self.transitionTo(STATES.LISTENING);
      }
    }, 150);
  };

  LiveVoicePipeline.prototype.speakCoachResponse = function (text, onFinish) {
    if (!text) {
      this.transitionTo(STATES.LISTENING);
      if (onFinish) onFinish();
      return;
    }

    this.transitionTo(STATES.SPEAKING);

    if (!this.synth) {
      this.transitionTo(STATES.LISTENING);
      if (onFinish) onFinish();
      return;
    }

    var self = this;
    try {
      this.synth.cancel();

      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = this.lang;
      utterance.rate = this.speechRate;
      utterance.pitch = 1.0;

      utterance.onend = function () {
        if (self.state === STATES.SPEAKING) {
          self.transitionTo(STATES.LISTENING);
        }
        if (onFinish) onFinish();
      };

      utterance.onerror = function (e) {
        if (self.state === STATES.SPEAKING) {
          self.transitionTo(STATES.LISTENING);
        }
        if (onFinish) onFinish();
      };

      this.synth.speak(utterance);
    } catch (err) {
      this.transitionTo(STATES.LISTENING);
      if (onFinish) onFinish();
    }
  };

  LiveVoicePipeline.prototype.pauseListening = function () {
    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
    }
    this.transitionTo(STATES.PAUSED);
  };

  LiveVoicePipeline.prototype.resumeListening = function () {
    if (this.state === STATES.PAUSED) {
      this.accumulatedTranscript = '';
      this.transitionTo(STATES.LISTENING);
    }
  };

  LiveVoicePipeline.prototype.handleSpeechError = function (event) {
    if (event.error === 'no-speech') {
      // Normal conversational pause; do not treat as fatal error
      return;
    }
    if (event.error === 'aborted') {
      return;
    }

    // Recoverable speech glitch
    if (this.state === STATES.LISTENING) {
      var self = this;
      this.transitionTo(STATES.RECOVERING, { error: event.error });
      setTimeout(function () {
        if (self.state === STATES.RECOVERING) {
          self.transitionTo(STATES.LISTENING);
          try {
            if (self.recognition) self.recognition.start();
          } catch (e) {}
        }
      }, 300);
    }
  };

  LiveVoicePipeline.prototype.handleSpeechEnd = function () {
    // If still in LISTENING state, seamlessly restart continuous recognition
    if (this.state === STATES.LISTENING) {
      try {
        if (this.recognition) {
          this.recognition.start();
        }
      } catch (e) {}
    }
  };

  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.transitionTo(STATES.ENDING);

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.animFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }

    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }

    if (this.mediaStream) {
      try {
        var tracks = this.mediaStream.getTracks();
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].stop();
        }
      } catch (e) {}
      this.mediaStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try { this.audioContext.close(); } catch (e) {}
    }

    this.transitionTo(STATES.IDLE);
  };

  // Backward-compatible BrowserSpeechEngine wrapper for legacy callers
  function BrowserSpeechEngine(options) {
    this.pipeline = new LiveVoicePipeline(options);
  }
  BrowserSpeechEngine.prototype.isSupported = function () {
    return this.pipeline.isSupported();
  };
  BrowserSpeechEngine.prototype.startListening = function (callbacks) {
    this.pipeline.onStudentTurnComplete = callbacks.onResult || function () {};
    this.pipeline.onError = callbacks.onError || function () {};
    this.pipeline.startLiveSession();
  };
  BrowserSpeechEngine.prototype.stopListening = function () {
    this.pipeline.endLiveSession();
  };
  BrowserSpeechEngine.prototype.speak = function (text, onEnd) {
    this.pipeline.speakCoachResponse(text, onEnd);
  };
  BrowserSpeechEngine.prototype.stopSpeaking = function () {
    if (this.pipeline.synth) {
      try { this.pipeline.synth.cancel(); } catch (e) {}
    }
  };

  var MasteredSpeech = {
    STATES: STATES,
    VALID_TRANSITIONS: VALID_TRANSITIONS,
    LiveVoicePipeline: LiveVoicePipeline,
    BrowserSpeechEngine: BrowserSpeechEngine,
    detectSpokenIntent: detectSpokenIntent
  };

  root.MasteredSpeech = MasteredSpeech;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredSpeech;
  }
})();
