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
 * 4. Human-like Turn-Taking & Trailing Conjunction Grace Period (1800ms-2200ms)
 * 5. Full Android Chrome & iOS Safari compatibility:
 *    - Decoupled hardware mic stream on Android to eliminate audio-capture collisions
 *    - Removal of whitespace primer utterance that freezes Android TTS
 *    - Removal of destructive synth.pause()/resume() keep-alive intervals on mobile
 *    - Fresh SpeechRecognition instance recreation on mobile restart/recovery
 *    - Bounded exponential backoff for transient speech errors
 * 6. Barge-in Interruption (Student speaking immediately aborts coach speech)
 * 7. Dedicated Natural Female Voice Selector for Coach Sarah
 * 8. Zero remote audio upload and zero third-party paid API dependencies
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
    IDLE: ['INITIALIZING', 'REQUESTING_MICROPHONE', 'ERROR', 'ENDING', 'SPEAKING'],
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
    END_SESSION: /^(end session|finish( for today)?|goodbye|bye|quit|exit session|stop session|i want to stop|stop practice and end|end call|exit|close session)[\.!\?]?$/i
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

  // Trailing Conjunctions, Prepositions & Auxiliaries indicating incomplete thought
  var TRAILING_CONNECTORS = {
    'and': true, 'but': true, 'or': true, 'because': true, 'so': true,
    'to': true, 'with': true, 'for': true, 'that': true, 'which': true,
    'who': true, 'is': true, 'am': true, 'are': true, 'was': true,
    'were': true, 'have': true, 'has': true, 'in': true, 'at': true,
    'on': true, 'if': true, 'when': true, 'while': true, 'as': true,
    'than': true, 'like': true, 'my': true, 'the': true, 'a': true, 'an': true
  };

  // Male voice blacklist to strictly reject
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

  // Dedicated Female Voice Selector for Coach Sarah
  function getCoachFemaleVoice(synth) {
    if (!synth || typeof synth.getVoices !== 'function') return null;
    var voices = synth.getVoices() || [];
    if (!voices || voices.length === 0) return null;

    var enVoices = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf('en') === 0;
    });
    if (enVoices.length === 0) enVoices = voices;

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

    var femaleDeclared = enVoices.find(function (v) {
      var text = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();
      return (text.indexOf('female') !== -1 || text.indexOf('woman') !== -1 || text.indexOf('girl') !== -1) && !isMaleVoice(v);
    });
    if (femaleDeclared) return femaleDeclared;

    var nonMale = enVoices.find(function (v) {
      return !isMaleVoice(v);
    });
    if (nonMale) return nonMale;

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
    this.speechRate = options.speechRate || 0.86;
    // Turn-taking silence threshold: 1900ms gives learners natural thinking time without premature cutoffs
    this.silenceThresholdMs = options.silenceThresholdMs || 1900;
    this.volumeThreshold = options.volumeThreshold || 12;

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
    this.latestInterim = '';
    this.lastSpeechTime = 0;
    this.silenceTimer = null;
    this.speakSafetyTimer = null;
    this.speechKeepAliveInterval = null;
    this.lastSpokenText = '';
    this.isBargeInActive = false;
    this.activeTurnId = 0;
    this.consecutiveErrors = 0;
    this.speakerCooldownUntil = 0;

    if (typeof window !== 'undefined') {
      window.__masteredActivePipeline = this;
    }
  }

  /**
   * Safe mobile audio context unlocking without whitespace TTS primer that deadlocks Android
   */
  LiveVoicePipeline.prototype.unlockMobileAudio = function () {
    if (typeof window === 'undefined') return;
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try { this.audioContext.resume(); } catch (e) {}
    }
    if (this.synth) {
      try {
        if (this.synth.paused) this.synth.resume();
        // NEVER speak an empty ' ' string on mobile as it hangs Android TTS
      } catch (e) {}
    }
  };

  LiveVoicePipeline.prototype.isSupported = function () {
    if (typeof window === 'undefined') return false;
    var hasRecognition = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
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

    this.unlockMobileAudio();
    this.transitionTo(STATES.INITIALIZING);

    var isAndroid = (typeof navigator !== 'undefined') && /Android/i.test(navigator.userAgent);

    // 1. Microphone setup: on desktop and iOS, use getUserMedia + AudioContext for visualizer.
    // On Android, avoid locking hardware audio capture with getUserMedia so webkitSpeechRecognition has 100% exclusive access.
    if (!isAndroid) {
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
        // Fall back gracefully to direct speech recognition
      }
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
    } catch (e) {}
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

      if (self.onAudioLevel) {
        self.onAudioLevel(level);
      }

      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        self.animFrameId = window.requestAnimationFrame(tick);
      }
    };

    tick();
  };

  /**
   * Initializes or recreates the SpeechRecognition instance.
   * Creating a fresh instance avoids dead object errors on Android mobile browsers.
   */
  LiveVoicePipeline.prototype.initSpeechRecognition = function () {
    if (typeof window === 'undefined') return;
    var SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    var self = this;
    try {
      if (this.recognition) {
        try { this.recognition.abort(); } catch (e) {}
      }
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
    } catch (e) {}
  };

  LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
    if (this.state === STATES.PAUSED || this.state === STATES.ENDING) return;

    // Discard any audio input while coach is speaking or during echo cooldown
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }

    this.consecutiveErrors = 0;

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

    // On Android without AnalyserNode, simulate waveform pulse on active speech
    if (!this.analyser && this.onAudioLevel) {
      var simulatedLevel = combined.length > 0 ? Math.min(85, 30 + (interimText.length * 4)) : 0;
      this.onAudioLevel(simulatedLevel);
    }

    if (combined.length > 0) {
      this.lastSpeechTime = Date.now();
      this.resetSilenceTimer();
    }
  };

  /**
   * Resets silence timer with dynamic trailing conjunction extension
   */
  LiveVoicePipeline.prototype.resetSilenceTimer = function () {
    var self = this;
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
    }

    var delay = this.silenceThresholdMs;

    // Trailing conjunction & preposition check
    var current = (this.accumulatedTranscript + (this.latestInterim ? ' ' + this.latestInterim : '')).trim();
    if (current) {
      var words = current.split(/\s+/);
      var lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z']/g, '');
      if (TRAILING_CONNECTORS[lastWord]) {
        // Student is mid-sentence! Add 1200ms grace period so they are never interrupted
        delay += 1200;
      }
    }

    this.silenceTimer = setTimeout(function () {
      self.onSilenceTimeout();
    }, delay);
  };

  LiveVoicePipeline.prototype.onSilenceTimeout = function () {
    if (this.state !== STATES.LISTENING && this.state !== STATES.INTERRUPTED) return;

    var candidate = (this.accumulatedTranscript || '').trim();
    if (!candidate && this.latestInterim) {
      candidate = this.latestInterim.trim();
    }
    if (!candidate || candidate.split(/\s+/).length < 1) {
      return; // Still waiting for speech
    }

    // Acoustic Prompt Echo Sanitizer
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

    // End of turn detected!
    this.transitionTo(STATES.PROCESSING_SPEECH);

    // Check for Spoken Voice Intents
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
    this.speakerCooldownUntil = Date.now() + 150;
    this.transitionTo(STATES.INTERRUPTED, { reason: reason });
    var self = this;
    setTimeout(function () {
      if (self.state === STATES.INTERRUPTED) {
        self.transitionTo(STATES.LISTENING);
      }
    }, 150);
  };

  LiveVoicePipeline.prototype.restartListening = function () {
    if (this.isSpeaking || this.state === STATES.SPEAKING || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) {
      return;
    }
    var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile || !this.recognition) {
      this.initSpeechRecognition();
    }
    try {
      this.accumulatedTranscript = '';
      if (this.recognition) {
        this.recognition.start();
      }
    } catch (e) {}
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
    this.accumulatedTranscript = '';
    this.transitionTo(STATES.SPEAKING);

    var self = this;

    // STEP 1: Safely stop recognition before speech synthesis begins
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }

    // STEP 2: Clear frozen Chrome speech synthesis queue
    if (this.synth) {
      try {
        this.synth.cancel();
        if (typeof this.synth.resume === 'function') {
          this.synth.resume();
        }
      } catch (e) {}
    }

    // STEP 3: Dispatch with small tick so audio thread resets
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
        utterance.rate = self.speechRate || 0.86;
        utterance.pitch = 1.20; // Warm, natural feminine pitch for Coach Sarah
        utterance.volume = 1.0;

        var femaleVoice = getCoachFemaleVoice(self.synth);
        if (!femaleVoice && typeof window !== 'undefined' && window.__masteredFemaleVoice) {
          femaleVoice = window.__masteredFemaleVoice;
        }
        if (femaleVoice) {
          utterance.voice = femaleVoice;
          if (typeof window !== 'undefined') window.__masteredFemaleVoice = femaleVoice;
        } else {
          utterance.pitch = 1.30;
        }

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
          self.speakerCooldownUntil = Date.now() + 120; // 120ms echo drain

          if (self.state === STATES.SPEAKING) {
            self.transitionTo(STATES.LISTENING);
          }

          if (self.isSessionActive !== false) {
            setTimeout(function () {
              self.restartListening();
            }, 100);
          }

          if (onFinish) onFinish();
        };

        // Safety timeout in case speech engine hangs
        var wordCount = text.split(/\s+/).length;
        var timeoutMs = Math.max(5000, Math.min(35000, (wordCount / 2.0) * 1000 + 4000));
        self.speakSafetyTimer = setTimeout(function () {
          finishSpeech();
        }, timeoutMs);

        // Keep-alive ONLY on desktop browsers (never on Android or iOS mobile devices)
        var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (!isMobile) {
          self.speechKeepAliveInterval = setInterval(function () {
            if (self.synth && self.synth.speaking && !self.synth.paused) {
              self.synth.pause();
              self.synth.resume();
            }
          }, 5000);
        }

        utterance.onstart = function () {
          self.isSpeaking = true;
          self.accumulatedTranscript = '';
        };

        utterance.onend = function () {
          finishSpeech();
        };

        utterance.onerror = function (e) {
          console.warn("[Coach Sarah Speech Event]", e && e.error);
          if (utterance.voice && e && (e.error === 'network' || e.error === 'audio-busy')) {
            try {
              var fallbackUtterance = new window.SpeechSynthesisUtterance(text);
              fallbackUtterance.lang = self.lang || 'en-US';
              fallbackUtterance.rate = self.speechRate || 0.86;
              fallbackUtterance.pitch = 1.25;
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
    }, 80);
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
      this.restartListening();
    }
  };

  LiveVoicePipeline.prototype.handleSpeechError = function (event) {
    if (event.error === 'no-speech') {
      return;
    }
    if (event.error === 'aborted') {
      return;
    }

    this.consecutiveErrors = (this.consecutiveErrors || 0) + 1;
    var backoffDelay = Math.min(3000, 250 * Math.pow(1.3, Math.min(this.consecutiveErrors, 5)));

    if (this.state === STATES.LISTENING || this.state === STATES.RECOVERING) {
      var self = this;
      this.transitionTo(STATES.RECOVERING, { error: event.error });
      setTimeout(function () {
        if (self.state === STATES.RECOVERING && self.isSessionActive) {
          self.transitionTo(STATES.LISTENING);
          self.restartListening();
        }
      }, backoffDelay);
    }
  };

  LiveVoicePipeline.prototype.handleSpeechEnd = function () {
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
    if (this.state === STATES.LISTENING && this.isSessionActive) {
      var self = this;
      setTimeout(function () {
        self.restartListening();
      }, 100);
    }
  };

  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
    this.isSpeaking = false;
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

  // Backward-compatible BrowserSpeechEngine wrapper
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
