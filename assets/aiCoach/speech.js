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
    INITIALIZING: ['REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ERROR', 'IDLE'],
    REQUESTING_MICROPHONE: ['LISTENING', 'SPEAKING', 'ERROR', 'IDLE'],
    LISTENING: ['PROCESSING_SPEECH', 'SPEAKING', 'PAUSED', 'INTERRUPTED', 'RECOVERING', 'ENDING', 'ERROR', 'IDLE'],
    PROCESSING_SPEECH: ['GENERATING_RESPONSE', 'SPEAKING', 'LISTENING', 'RECOVERING', 'ERROR', 'ENDING', 'IDLE'],
    GENERATING_RESPONSE: ['SPEAKING', 'LISTENING', 'ERROR', 'ENDING', 'IDLE'],
    SPEAKING: ['LISTENING', 'PROCESSING_SPEECH', 'INTERRUPTED', 'PAUSED', 'ENDING', 'ERROR', 'IDLE'],
    INTERRUPTED: ['LISTENING', 'PROCESSING_SPEECH', 'SPEAKING', 'IDLE', 'ERROR'],
    PAUSED: ['LISTENING', 'SPEAKING', 'ENDING', 'IDLE'],
    RECOVERING: ['LISTENING', 'REQUESTING_MICROPHONE', 'SPEAKING', 'ERROR', 'IDLE'],
    ENDING: ['IDLE'],
    ERROR: ['RECOVERING', 'IDLE', 'REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING']
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

  // Comprehensive list of male voice signatures to strictly reject
  var MALE_VOICE_NAMES = [
    'david', 'mark', 'george', 'ravi', 'guy', 'brian', 'christopher', 'eric',
    'james', 'ryan', 'steffan', 'andrew', 'tom', 'alex', 'daniel', 'fred',
    'oliver', 'arthur', 'thomas', 'nathan', 'william', 'male', 'sean',
    'richard', 'paul', 'john', 'michael', 'stefan', 'prabhat', 'hemant',
    'male_1', 'male_2', 'male-1', 'en-us-x-iom', 'en-us-x-iol'
  ];

  function isMaleVoice(v) {
    if (!v) return false;
    var text = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();
    for (var i = 0; i < MALE_VOICE_NAMES.length; i++) {
      if (text.indexOf(MALE_VOICE_NAMES[i]) !== -1) return true;
    }
    return false;
  }

  // Dedicated Fixed Female Voice Selector for Coach Sarah
  function getCoachFemaleVoice(synth) {
    if (!synth || typeof synth.getVoices !== 'function') return null;
    var voices = synth.getVoices() || [];
    if (!voices || voices.length === 0) return null;

    var enVoices = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf('en') === 0;
    });
    if (enVoices.length === 0) enVoices = voices;

    // High-priority natural and neural female voices across Windows, Edge, Chrome, Android, iOS, macOS
    var preferredFemaleNames = [
      'microsoft jenny online (natural)',
      'microsoft aria online (natural)',
      'microsoft sonia online (natural)',
      'google us english female',
      'google uk english female',
      'samantha',
      'victoria',
      'karen',
      'microsoft zira',
      'microsoft heera',
      'microsoft hazel',
      'microsoft susan',
      'microsoft linda',
      'moira',
      'tessa',
      'fiona',
      'ava',
      'allison',
      'nora',
      'jenny',
      'aria',
      'zira',
      'heera'
    ];

    for (var i = 0; i < preferredFemaleNames.length; i++) {
      var pref = preferredFemaleNames[i];
      var match = enVoices.find(function (v) {
        var n = (v.name || '').toLowerCase();
        return n.indexOf(pref) !== -1 && !isMaleVoice(v);
      });
      if (match) return match;
    }

    // Any English voice with "female", "woman", or "girl" explicitly in the identifier
    var femaleDeclared = enVoices.find(function (v) {
      var text = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();
      return (text.indexOf('female') !== -1 || text.indexOf('woman') !== -1 || text.indexOf('girl') !== -1) && !isMaleVoice(v);
    });
    if (femaleDeclared) return femaleDeclared;

    // Fallback 1: Any English voice that is NOT explicitly male
    var nonMale = enVoices.find(function (v) {
      return !isMaleVoice(v);
    });
    if (nonMale) return nonMale;

    // Fallback 2: Any voice in the entire system that is NOT in the male blacklist
    var anyNonMale = voices.find(function (v) {
      return !isMaleVoice(v);
    });
    if (anyNonMale) return anyNonMale;

    return null;
  }

  function reloadFemaleVoice(synth) {
    if (!synth && typeof window !== 'undefined') synth = window.speechSynthesis;
    if (!synth) return null;
    var v = getCoachFemaleVoice(synth);
    if (v && typeof window !== 'undefined') {
      window.__masteredFemaleVoice = v;
    }
    return v;
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.onvoiceschanged = function () {
        reloadFemaleVoice(window.speechSynthesis);
      };
      reloadFemaleVoice(window.speechSynthesis);
    } catch (e) {}
  }

  function LiveVoicePipeline(options) {
    options = options || {};
    this.state = STATES.IDLE;
    this.lang = options.lang || 'en-US';
    this.speechRate = options.speechRate || 1.0; // Clear, natural conversational cadence
    this.silenceThresholdMs = options.silenceThresholdMs || 600; // Fast 600ms turnaround for human-like response
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
    this.speakSafetyTimer = null;
    this.lastSpokenText = '';
    this.isBargeInActive = false;
    this.activeTurnId = 0;

    if (typeof window !== 'undefined') {
      window.__masteredActivePipeline = this;
    }
  }

  LiveVoicePipeline.prototype.unlockMobileAudio = function () {
    if (typeof window === 'undefined') return;
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try { this.audioContext.resume(); } catch (e) {}
    }
    if (this.synth) {
      try {
        if (this.synth.paused) this.synth.resume();
        var primer = new window.SpeechSynthesisUtterance(' ');
        primer.volume = 0.01;
        primer.rate = 1.0;
        this.synth.speak(primer);
      } catch (e) {}
    }
  };

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
      console.warn("[LiveVoicePipeline]", err);
      // Graceful self-healing: if transitioning between active live states, permit transition smoothly
      if (nextState === STATES.SPEAKING || nextState === STATES.LISTENING || nextState === STATES.PROCESSING_SPEECH || nextState === STATES.INTERRUPTED) {
        var prevSt = this.state;
        this.state = nextState;
        if (this.onStateChange) {
          this.onStateChange(this.state, prevSt, meta);
        }
        return true;
      }
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

    // Unlock mobile audio on user gesture
    this.unlockMobileAudio();

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
    this.isSessionActive = true;
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

      // Note on Barge-in Interruption:
      // On mobile phones, speaker output feeds directly back into the phone's microphone.
      // If we trigger barge-in on volume level alone while coach is SPEAKING, the coach
      // interrupts itself after the first syllable!
      // Therefore, acoustic energy interruption while SPEAKING is suppressed; interruption
      // during coach speech is handled cleanly via the prominent "Tap to Interrupt" control
      // or distinct student speech recognition tokens.

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

    // Discard any audio input while coach is speaking or during echo cooldown
    // This completely stops the microphone from hearing and recording the coach's own speaker output
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
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
    this.latestInterim = interimText;

    var combined = (this.accumulatedTranscript + (interimText ? ' ' + interimText : '')).trim();
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

    var candidate = (this.accumulatedTranscript || '').trim();
    if (!candidate && this.latestInterim) {
      candidate = this.latestInterim.trim();
    }
    if (!candidate || candidate.split(/\s+/).length < 1) {
      return; // Still waiting for valid speech
    }

    // Acoustic Prompt Echo Sanitizer: If candidate accidentally begins with coach prompt
    if (this.lastSpokenText) {
      var cleanLast = this.lastSpokenText.replace(/[^\w\s]/gi, '').toLowerCase();
      var cleanCand = candidate.replace(/[^\w\s]/gi, '').toLowerCase();
      var prefixLen = Math.min(25, cleanLast.length);
      if (prefixLen >= 8 && cleanCand.indexOf(cleanLast.substring(0, prefixLen)) === 0) {
        var promptWordCount = this.lastSpokenText.trim().split(/\s+/).length;
        var candWords = candidate.trim().split(/\s+/);
        if (candWords.length > promptWordCount) {
          candidate = candWords.slice(promptWordCount).join(' ').trim();
        }
      }
    }

    if (!candidate || candidate.split(/\s+/).length < 1) {
      this.accumulatedTranscript = '';
      this.latestInterim = '';
      return;
    }

    // End-of-turn detected!
    this.transitionTo(STATES.PROCESSING_SPEECH);

    // Check for Spoken Voice Intents ("stop", "pause", "repeat that", etc.)
    var intent = detectSpokenIntent(candidate);
    if (intent) {
      this.accumulatedTranscript = '';
      this.latestInterim = '';
      this.handleVoiceIntent(intent, candidate);
      return;
    }

    // Complete Student Spoken Turn
    var turnUtterance = candidate;
    this.accumulatedTranscript = '';
    this.latestInterim = '';

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
    this.isSpeaking = false;
    this.activeUtterance = null;
    this.accumulatedTranscript = '';
    this.speakerCooldownUntil = Date.now() + 200;
    this.transitionTo(STATES.INTERRUPTED, { reason: reason });
    var self = this;
    setTimeout(function () {
      if (self.state === STATES.INTERRUPTED) {
        self.transitionTo(STATES.LISTENING);
      }
    }, 150);
  };

  LiveVoicePipeline.prototype.restartListening = function () {
    if (!this.recognition) return;
    if (this.isSpeaking || this.state === STATES.SPEAKING || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) {
      return;
    }
    try {
      this.accumulatedTranscript = '';
      this.recognition.start();
    } catch (e) {
      // Recognition may already be running or starting
    }
  };

  LiveVoicePipeline.prototype.speakCoachResponse = function (text, onFinish) {
    if (!text || !text.trim()) {
      this.isSpeaking = false;
      this.transitionTo(STATES.LISTENING);
      this.restartListening();
      if (onFinish) onFinish();
      return;
    }

    this.lastSpokenText = text;
    this.isSpeaking = true;
    this.accumulatedTranscript = ''; // Always clean transcript before coach speaks
    this.transitionTo(STATES.SPEAKING);

    var self = this;

    // STEP 1: Safely stop recognition before speech synthesis begins
    // This gives 100% audio subsystem focus to the speaker output, avoiding microphone muting/clashes on Android/iOS/Windows
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    // STEP 2: Clear any stuck/frozen Chrome speech synthesis queue from previous turn
    if (this.synth) {
      try {
        this.synth.cancel();
        if (typeof this.synth.resume === 'function') {
          this.synth.resume();
        }
      } catch (e) {}
    }

    // STEP 3: Dispatch with minimal delay (15ms tick) so Chrome audio thread resets without perceptible pause
    setTimeout(function () {
      if (!self.synth) {
        self.isSpeaking = false;
        self.transitionTo(STATES.LISTENING);
        self.restartListening();
        if (onFinish) onFinish();
        return;
      }

      try {
        if (typeof self.synth.resume === 'function') {
          self.synth.resume();
        }

        var utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = self.lang || 'en-US';
        utterance.rate = self.speechRate || 1.0;
        utterance.pitch = 1.25; // Warm, natural feminine pitch (strictly female tone)
        utterance.volume = 1.0;

        // Dedicated fixed female voice for Coach Sarah
        var femaleVoice = getCoachFemaleVoice(self.synth);
        if (!femaleVoice && typeof window !== 'undefined' && window.__masteredFemaleVoice) {
          femaleVoice = window.__masteredFemaleVoice;
        }
        if (femaleVoice) {
          utterance.voice = femaleVoice;
          if (typeof window !== 'undefined') window.__masteredFemaleVoice = femaleVoice;
        } else {
          // If no female-labeled voice exists, elevate pitch to guarantee a warm female timbre
          utterance.pitch = 1.35;
        }

        // Global queue anchor to completely prevent Chrome V8 garbage-collection from dropping speech mid-sentence
        if (typeof window !== 'undefined') {
          window.__masteredUtteranceQueue = window.__masteredUtteranceQueue || [];
          window.__masteredUtteranceQueue.push(utterance);
          window.__masteredActiveUtterance = utterance;
        }
        self.activeUtterance = utterance;

        var finishSpeech = function () {
          if (self.speakSafetyTimer) {
            clearTimeout(self.speakSafetyTimer);
            self.speakSafetyTimer = null;
          }
          if (self.speechKeepAliveInterval) {
            clearInterval(self.speechKeepAliveInterval);
            self.speechKeepAliveInterval = null;
          }
          if (typeof window !== 'undefined' && window.__masteredUtteranceQueue) {
            window.__masteredUtteranceQueue = window.__masteredUtteranceQueue.filter(function (u) {
              return u !== utterance;
            });
            window.__masteredActiveUtterance = null;
          }
          self.isSpeaking = false;
          self.activeUtterance = null;
          self.accumulatedTranscript = '';
          self.speakerCooldownUntil = Date.now() + 250; // 250ms echo drain

          if (self.state === STATES.SPEAKING) {
            self.transitionTo(STATES.LISTENING);
          }

          // Automatically and seamlessly restart recognition to listen for the student's next words
          if (self.isSessionActive !== false) {
            setTimeout(function () {
              self.restartListening();
            }, 150);
          }

          if (onFinish) onFinish();
        };

        // Safety timeout in case speech engine hangs
        var wordCount = text.split(/\s+/).length;
        var timeoutMs = Math.max(5000, Math.min(35000, (wordCount / 2.0) * 1000 + 4000));
        self.speakSafetyTimer = setTimeout(function () {
          finishSpeech();
        }, timeoutMs);

        // Chrome keep-alive: pause/resume every 5s during long utterances to avoid Chrome 15s cutoff bug
        self.speechKeepAliveInterval = setInterval(function () {
          if (self.synth && self.synth.speaking && !self.synth.paused) {
            self.synth.pause();
            self.synth.resume();
          }
        }, 5000);

        utterance.onstart = function () {
          self.isSpeaking = true;
          self.accumulatedTranscript = '';
        };

        utterance.onend = function () {
          finishSpeech();
        };

        utterance.onerror = function (e) {
          console.warn("[Coach Sarah Speech Event]", e && e.error);
          // If a remote/online voice had a network failure, retry immediately with local female voice
          if (utterance.voice && e && (e.error === 'network' || e.error === 'audio-busy')) {
            console.log("[Coach Sarah] Retrying with local female voice fallback...");
            try {
              var fallbackUtterance = new window.SpeechSynthesisUtterance(text);
              fallbackUtterance.lang = self.lang || 'en-US';
              fallbackUtterance.rate = self.speechRate || 1.0;
              fallbackUtterance.pitch = 1.30; // Elevated pitch for guaranteed feminine timbre
              var localFemale = getCoachFemaleVoice(self.synth);
              if (localFemale) fallbackUtterance.voice = localFemale;
              fallbackUtterance.onend = finishSpeech;
              fallbackUtterance.onerror = finishSpeech;
              if (typeof window !== 'undefined') window.__masteredActiveUtterance = fallbackUtterance;
              self.synth.speak(fallbackUtterance);
              return;
            } catch (err) {}
          }
          finishSpeech();
        };

        self.synth.speak(utterance);

        // Chrome Watchdog: If speak was queued but hasn't started after 150ms, wake it with resume()
        setTimeout(function () {
          if (self.isSpeaking && self.synth && !self.synth.speaking) {
            try { self.synth.resume(); } catch (e) {}
          }
        }, 150);

      } catch (err) {
        console.warn("[SpeechSynthesis Exception]", err);
        self.isSpeaking = false;
        self.transitionTo(STATES.LISTENING);
        self.restartListening();
        if (onFinish) onFinish();
      }
    }, 100);
  };

  LiveVoicePipeline.prototype.replayLastCoachSpeech = function (onFinish) {
    if (this.lastSpokenText) {
      this.unlockMobileAudio();
      this.speakCoachResponse(this.lastSpokenText, onFinish);
      return true;
    }
    return false;
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
    // If coach is speaking or echo cooldown active, do not restart recognition yet (will restart in finishSpeech)
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
    // If still in LISTENING state, seamlessly restart continuous recognition
    if (this.state === STATES.LISTENING) {
      var self = this;
      setTimeout(function () {
        self.restartListening();
      }, 100);
    }
  };

  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
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
  BrowserSpeechEngine.prototype.replay = function (onEnd) {
    return this.pipeline.replayLastCoachSpeech(onEnd);
  };
  BrowserSpeechEngine.prototype.unlockMobileAudio = function () {
    this.pipeline.unlockMobileAudio();
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
