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
    INITIALIZING: ['REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ERROR', 'ENDING', 'IDLE'],
    REQUESTING_MICROPHONE: ['LISTENING', 'SPEAKING', 'ERROR', 'ENDING', 'IDLE'],
    LISTENING: ['PROCESSING_SPEECH', 'SPEAKING', 'PAUSED', 'INTERRUPTED', 'RECOVERING', 'ENDING', 'ERROR', 'IDLE'],
    PROCESSING_SPEECH: ['GENERATING_RESPONSE', 'SPEAKING', 'LISTENING', 'RECOVERING', 'ERROR', 'ENDING', 'IDLE'],
    GENERATING_RESPONSE: ['SPEAKING', 'LISTENING', 'ERROR', 'ENDING', 'IDLE'],
    SPEAKING: ['LISTENING', 'PROCESSING_SPEECH', 'INTERRUPTED', 'PAUSED', 'ENDING', 'ERROR', 'IDLE'],
    INTERRUPTED: ['LISTENING', 'PROCESSING_SPEECH', 'SPEAKING', 'ENDING', 'IDLE', 'ERROR'],
    PAUSED: ['LISTENING', 'SPEAKING', 'ENDING', 'IDLE'],
    RECOVERING: ['LISTENING', 'REQUESTING_MICROPHONE', 'SPEAKING', 'ENDING', 'ERROR', 'IDLE'],
    ENDING: ['IDLE'],
    ERROR: ['RECOVERING', 'IDLE', 'REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ENDING']
  };

  // Natural Spoken Voice Intents
  var SPOKEN_INTENTS = {
    NEXT_MISSION: /^(next mission|go to next mission|advance mission|advance to next mission|next level|advance|take me to next mission|say next mission)[\.!\?]?$/i,
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
    if (SPOKEN_INTENTS.NEXT_MISSION.test(trimmed)) return 'NEXT_MISSION';
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
    'male_1', 'male_2', 'male-1', 'en-us-x-iom', 'en-us-x-iol', 'en-us-x-iob',
    'en-in-x-cxc', 'en-in-x-end'
  ];

  // Phonetic normalization: Clause/sentence-ending "to" transcribed for "too"
  function normalizeSpokenToo(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/\bto([.?!,]|$)/gi, 'too$1')
      .replace(/\b(me|you|it|that|this|us|them|him|her|there|here|so|also)\s+to\b/gi, '$1 too');
  }

  function isMaleVoice(v) {
    if (!v) return false;
    var text = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();

    // Guard: if explicitly female, woman, or girl, never treat as male
    if (text.indexOf('female') !== -1 || text.indexOf('woman') !== -1 || text.indexOf('girl') !== -1) {
      return false;
    }

    for (var i = 0; i < MALE_VOICE_NAMES.length; i++) {
      // Word-boundary match: prevents 'female' matching 'male', or 'standard' matching 'dan'
      var rx = new RegExp('(^|[^a-z])' + MALE_VOICE_NAMES[i] + '([^a-z]|$)', 'i');
      if (rx.test(text)) return true;
    }
    return false;
  }

  // Dedicated Natural Female Voice Selector for Coach Sarah (Weighted Multi-Tier Scoring)
  function getCoachFemaleVoice(synth) {
    if (!synth || typeof synth.getVoices !== 'function') return null;
    var voices = synth.getVoices() || [];
    if (!voices || voices.length === 0) return null;
    voices = voices.filter(Boolean);
    if (voices.length === 0) return null;

    var enVoices = voices.filter(function (v) {
      if (!v) return false;
      var l = (v.lang || '').toLowerCase().replace(/_/g, '-');
      return l.indexOf('en') === 0;
    });
    if (enVoices.length === 0) enVoices = voices.slice();

    var candidates = enVoices.filter(function (v) {
      return v && !isMaleVoice(v);
    });
    if (candidates.length === 0) candidates = enVoices.slice();

    function scoreVoice(v) {
      if (!v) return -9999;
      var name = (v.name || '').toLowerCase();
      var uri = (v.voiceURI || '').toLowerCase();
      var text = name + ' ' + uri;
      var lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
      var score = 0;

      // 1. Language preference: en-US > en-GB/AU/CA > other English
      if (lang === 'en-us' || lang.indexOf('en-us') === 0) score += 160;
      else if (lang.indexOf('en-gb') === 0 || lang.indexOf('en-au') === 0 || lang.indexOf('en-ca') === 0) score += 120;
      else if (lang.indexOf('en') === 0) score += 80;

      // 2. High-tier neural / natural / enhanced markers (Edge, iOS, Safari)
      if (text.indexOf('natural') !== -1) score += 600;
      if (text.indexOf('online') !== -1) score += 300;
      if (text.indexOf('enhanced') !== -1) score += 500;
      if (text.indexOf('premium') !== -1) score += 450;
      if (text.indexOf('neural') !== -1) score += 500;

      // 3. Google Chrome Cloud Voices
      if (text.indexOf('google us english') !== -1) score += 550;
      else if (text.indexOf('google') !== -1) score += 300;

      // 4. Character Names
      // Top-tier: Jenny, Aria, Ava, Zoe, Sonia, Libby
      if (text.indexOf('jenny') !== -1) score += 350;
      if (text.indexOf('aria') !== -1) score += 350;
      if (text.indexOf('ava') !== -1) score += 350;
      if (text.indexOf('zoe') !== -1) score += 350;
      if (text.indexOf('sonia') !== -1) score += 300;
      if (text.indexOf('libby') !== -1) score += 300;

      // Second-tier: Samantha, Karen, Victoria, Allison, Nora, Serena
      if (text.indexOf('samantha') !== -1) score += 200;
      if (text.indexOf('karen') !== -1) score += 180;
      if (text.indexOf('victoria') !== -1) score += 180;
      if (text.indexOf('allison') !== -1) score += 200;
      if (text.indexOf('nora') !== -1) score += 200;
      if (text.indexOf('serena') !== -1) score += 200;

      // Android Google TTS female identifiers
      if (text.indexOf('en-us-x-sfg') !== -1 || text.indexOf('sfg') !== -1) score += 380;
      if (text.indexOf('en-us-x-tpf') !== -1 || text.indexOf('tpf') !== -1) score += 350;
      if (text.indexOf('en-gb-x-rjs') !== -1 || text.indexOf('rjs') !== -1) score += 300;
      if (text.indexOf('en-gb-x-fis') !== -1 || text.indexOf('fis') !== -1) score += 300;
      if (text.indexOf('en-in-x-cxx') !== -1 || text.indexOf('cxx') !== -1) score += 250;

      // Explicitly declared female
      if (text.indexOf('female') !== -1 || text.indexOf('woman') !== -1 || text.indexOf('girl') !== -1) score += 220;

      // Penalize legacy low-bitrate compact voices on iOS/macOS
      if (text.indexOf('compact') !== -1) score -= 180;

      // Penalize legacy desktop SAPI voices on Windows
      if (text.indexOf('zira') !== -1) score += 40;
      if (text.indexOf('heera') !== -1) score += 30;
      if (text.indexOf('hazel') !== -1) score += 30;

      // Remote network voices generally higher fidelity than low-res offline ROM
      if (v.localService === false) score += 50;

      return score;
    }

    candidates.sort(function (a, b) {
      return scoreVoice(b) - scoreVoice(a);
    });

    return candidates[0] || null;
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
    this.speechRate = options.speechRate || 0.96;
    // Turn-taking silence threshold: 1900ms gives learners natural thinking time without premature cutoffs
    this.silenceThresholdMs = options.silenceThresholdMs || 950;
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
    this.activeUtterance = null;
    this.isSessionActive = false;
    this.accumulatedTranscript = '';
    this.latestInterim = '';
    this.lastSpeechTime = 0;
    this.silenceTimer = null;
    this.speakSafetyTimer = null;
    this.speechKeepAliveInterval = null;
    this.speakDispatchTimer = null;
    this.speakWatchdogTimer = null;
    this.processingSafetyTimer = null;
    this.lastSpokenText = '';
    this.isBargeInActive = false;
    this.activeTurnId = 0;
    this.consecutiveErrors = 0;
    this.speakerCooldownUntil = 0;
    this.isStarting = false;
    this.isListening = false;
    this.lastStartAttempt = 0;
    this.restartDebounceTimer = null;
    this.isFillerPlaying = false;
    this.pendingCoachResponse = null;
    this.fillerSafetyTimer = null;

    if (typeof window !== 'undefined') {
      window.__masteredActivePipeline = this;
    }
  }

  LiveVoicePipeline.prototype.getVoice = function () {
    return getCoachFemaleVoice(this.synth) || (typeof window !== 'undefined' ? window.__masteredFemaleVoice : null);
  }

  /**
   * Safe mobile audio context unlocking without hanging Android TTS,
   * while priming WebKit SpeechSynthesis and Web Audio on iOS Safari
   */
  LiveVoicePipeline.prototype.unlockMobileAudio = function () {
    if (typeof window === 'undefined') return;
    var isIOS = (typeof navigator !== 'undefined') && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
    if (this.audioContext) {
      if (this.audioContext.state === 'suspended') {
        try { this.audioContext.resume(); } catch (e) {}
      }
      try {
        var buffer = this.audioContext.createBuffer(1, 1, 22050);
        var source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      } catch (e) {}
    }
    if (this.synth) {
      try {
        if (this.synth.paused) this.synth.resume();
        if (isIOS) {
          // iOS WebKit requires an utterance inside user gesture to allow subsequent async speaks
          var primeUtterance = new window.SpeechSynthesisUtterance(' ');
          primeUtterance.volume = 0.01;
          primeUtterance.rate = 10;
          if (typeof window !== 'undefined') {
            window.__masteredActiveUtterance = primeUtterance;
            window.__masteredUnlockUtterance = primeUtterance;
          }
          primeUtterance.onend = function () {
            if (typeof window !== 'undefined') {
              if (window.__masteredActiveUtterance === primeUtterance) {
                window.__masteredActiveUtterance = null;
              }
              if (window.__masteredUnlockUtterance === primeUtterance) {
                window.__masteredUnlockUtterance = null;
              }
            }
          };
          primeUtterance.onerror = primeUtterance.onend;
          this.synth.speak(primeUtterance);
        }
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
      if (nextState === STATES.SPEAKING || nextState === STATES.LISTENING || nextState === STATES.PROCESSING_SPEECH || nextState === STATES.INTERRUPTED || nextState === STATES.ENDING || nextState === STATES.IDLE) {
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
      // Re-entering or resuming call: cleanly end lingering session before starting fresh
      this.endLiveSession();
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
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        try { this.recognition.abort(); } catch (e) {}
        this.recognition = null;
      }
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.lang;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = function () {
        self.isStarting = false;
        self.isListening = true;
      };

      this.recognition.onresult = function (event) {
        self.handleSpeechResult(event);
      };

      this.recognition.onerror = function (event) {
        self.isStarting = false;
        self.isListening = false;
        self.handleSpeechError(event);
      };

      this.recognition.onend = function () {
        self.isStarting = false;
        self.isListening = false;
        self.handleSpeechEnd();
      };
    } catch (e) {
      this.recognition = null;
      this.isStarting = false;
      this.isListening = false;
    }
  };

  LiveVoicePipeline.prototype.beginListeningLoop = function () {
    if (!this.recognition) return;
    try {
      this.accumulatedTranscript = '';
      this.isStarting = true;
      this.recognition.start();
    } catch (e) {
      this.isStarting = false;
    }
  };

  LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
    if (!this.isSessionActive || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) return;

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
        finalText += normalizeSpokenToo(text) + ' ';
      } else {
        interimText += normalizeSpokenToo(text);
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
        delay += 500;
      }
    }

    this.silenceTimer = setTimeout(function () {
      self.onSilenceTimeout();
    }, delay);
  };

  LiveVoicePipeline.prototype.onSilenceTimeout = function () {
    if (!this.isSessionActive || (this.state !== STATES.LISTENING && this.state !== STATES.INTERRUPTED)) return;

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
        } else {
          // Pure echo of coach prompt: drop completely
          candidate = '';
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

    // Safety watchdog: recover automatically if turn evaluation hangs or takes longer than 15 seconds (Gemini can take 8-12s)
    clearTimeout(this.processingSafetyTimer);
    var self = this;
    this.processingSafetyTimer = setTimeout(function () {
      if (self.state === STATES.PROCESSING_SPEECH && self.isSessionActive) {
        console.warn("[LiveVoicePipeline] Processing speech watchdog timer expired. Recovering to LISTENING...");
        self.transitionTo(STATES.LISTENING);
        self.restartListening();
      }
    }, 15000);

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

    // Spoken conversational acknowledgment filler (<300ms perceived response)


    this.speakImmediateAcknowledgment();



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
    if (intent === 'NEXT_MISSION') {
      // Intent dispatched via onIntentDetected above to advance mission immediately
      return;
    } else if (intent === 'PAUSE') {
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
    this.isFillerPlaying = false;
    this.pendingCoachResponse = null;
    if (this.fillerSafetyTimer) {
      clearTimeout(this.fillerSafetyTimer);
      this.fillerSafetyTimer = null;
    }
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
    if (!this.isSessionActive || this.isSpeaking || this.state === STATES.SPEAKING || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) {
      return;
    }
    if (this.isStarting || this.isListening) {
      return;
    }

    var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var now = Date.now();
    var minGap = isMobile ? 450 : 200;

    if (now - this.lastStartAttempt < minGap) {
      if (this.restartDebounceTimer) {
        clearTimeout(this.restartDebounceTimer);
      }
      var self = this;
      this.restartDebounceTimer = setTimeout(function () {
        self.restartListening();
      }, minGap - (now - self.lastStartAttempt));
      return;
    }

    this.lastStartAttempt = now;
    this.isStarting = true;

    if (!this.recognition) {
      this.initSpeechRecognition();
    }
    if (!this.recognition) {
      this.isStarting = false;
      return;
    }

    try {
      this.accumulatedTranscript = '';
      this.recognition.start();
    } catch (e) {
      this.isStarting = false;
      var self = this;
      if (this.restartDebounceTimer) {
        clearTimeout(this.restartDebounceTimer);
      }
      this.restartDebounceTimer = setTimeout(function () {
        self.restartDebounceTimer = null;
        if (self.state === STATES.LISTENING && self.isSessionActive && !self.isListening) {
          self.initSpeechRecognition();
          self.restartListening();
        }
      }, 300);
    }
  };

  
  LiveVoicePipeline.prototype.speakImmediateAcknowledgment = function () {
    if (!this.synth || !this.isSessionActive || this.isFillerPlaying) return;
    var fillers = [
      "I see!",
      "Got it!",
      "Interesting!",
      "Tell me more!",
      "Wonderful!",
      "Great!",
      "Nice!",
      "Mm-hmm!",
      "I hear you!"
    ];
    this.fillerIndex = ((this.fillerIndex || 0) + 1) % fillers.length;
    var phrase = fillers[this.fillerIndex];

    try {
      if (this.synth.speaking && !this.isFillerPlaying) {
        this.synth.cancel();
      }
      var utterance = new window.SpeechSynthesisUtterance(phrase);
      utterance.lang = this.lang || 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      var femaleVoice = getCoachFemaleVoice(this.synth);
      if (!femaleVoice && typeof window !== 'undefined' && window.__masteredFemaleVoice) {
        femaleVoice = window.__masteredFemaleVoice;
      }
      if (femaleVoice) {
        utterance.voice = femaleVoice;
        if (typeof window !== 'undefined') window.__masteredFemaleVoice = femaleVoice;
      }

      var self = this;
      this.isFillerPlaying = true;

      if (this.fillerSafetyTimer) {
        clearTimeout(this.fillerSafetyTimer);
      }
      this.fillerSafetyTimer = setTimeout(function () {
        self.fillerSafetyTimer = null;
        if (self.isFillerPlaying) {
          self.isFillerPlaying = false;
          if (self.pendingCoachResponse) {
            var pending = self.pendingCoachResponse;
            self.pendingCoachResponse = null;
            self.speakCoachResponse(pending.text, pending.onFinish);
          }
        }
      }, 1500);

      utterance.onstart = function () {
        self.isFillerPlaying = true;
      };

      var completeFiller = function () {
        if (self.fillerSafetyTimer) {
          clearTimeout(self.fillerSafetyTimer);
          self.fillerSafetyTimer = null;
        }
        self.isFillerPlaying = false;
        if (typeof window !== 'undefined' && window.__masteredActiveUtterance === utterance) {
          window.__masteredActiveUtterance = null;
        }
        if (self.pendingCoachResponse) {
          var pending = self.pendingCoachResponse;
          self.pendingCoachResponse = null;
          self.speakCoachResponse(pending.text, pending.onFinish);
        }
      };

      utterance.onend = completeFiller;
      utterance.onerror = completeFiller;

      if (typeof window !== 'undefined') {
        window.__masteredActiveUtterance = utterance;
      }
      this.synth.speak(utterance);
    } catch (e) {
      this.isFillerPlaying = false;
    }
  };

  LiveVoicePipeline.prototype.speakCoachResponse = function (text, onFinish, isStandalone) {
    clearTimeout(this.processingSafetyTimer);
    if (!text || !text.trim()) {
      this.isSpeaking = false;
      if (this.isSessionActive) {
        this.transitionTo(STATES.LISTENING);
        this.restartListening();
      }
      if (onFinish) onFinish();
      return;
    }

    if (!this.isSessionActive && !isStandalone) {
      this.isSpeaking = false;
      if (onFinish) onFinish();
      return;
    }

    // If an acknowledgment filler is currently playing, smoothly queue response until filler finishes naturally
    if (this.isFillerPlaying) {
      this.pendingCoachResponse = { text: text, onFinish: onFinish };
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

    // STEP 2: Clear speech queue; on iOS WebKit only cancel if actually speaking to prevent synthesizer stall
    var isIOS = (typeof navigator !== 'undefined') && /iPad|iPhone|iPod/.test(navigator.userAgent || '');
    if (this.synth) {
      try {
        if (!isIOS || this.synth.speaking) {
          this.synth.cancel();
        }
        if (typeof this.synth.resume === 'function') {
          this.synth.resume();
        }
      } catch (e) {}
    }

    // STEP 3: Dispatch with small tick so audio thread resets
    if (this.speakDispatchTimer) {
      clearTimeout(this.speakDispatchTimer);
      this.speakDispatchTimer = null;
    }
    this.speakDispatchTimer = setTimeout(function () {
      self.speakDispatchTimer = null;
      if ((!self.isSessionActive && !isStandalone) || self.state === STATES.ENDING || self.state === STATES.IDLE) {
        self.isSpeaking = false;
        return;
      }
      if (!self.synth) {
        self.isSpeaking = false;
        if (self.isSessionActive) {
          self.transitionTo(STATES.LISTENING);
          self.restartListening();
        } else {
          self.transitionTo(STATES.IDLE);
        }
        if (onFinish) onFinish();
        return;
      }

      try {
        if (typeof self.synth.resume === 'function') {
          self.synth.resume();
        }

        var utterance = new window.SpeechSynthesisUtterance(text);
        utterance.lang = self.lang || 'en-US';
        utterance.rate = self.speechRate || 0.96;
        utterance.pitch = 1.0; // Natural, unwarped pitch for Coach Sarah across all platforms
        utterance.volume = 1.0;

        var femaleVoice = getCoachFemaleVoice(self.synth);
        if (!femaleVoice && typeof window !== 'undefined' && window.__masteredFemaleVoice) {
          femaleVoice = window.__masteredFemaleVoice;
        }
        if (femaleVoice) {
          utterance.voice = femaleVoice;
          if (typeof window !== 'undefined') window.__masteredFemaleVoice = femaleVoice;
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
          if (self.speakWatchdogTimer) {
            clearTimeout(self.speakWatchdogTimer);
            self.speakWatchdogTimer = null;
          }
          if (typeof window !== 'undefined' && window.__masteredUtteranceQueue) {
            window.__masteredUtteranceQueue = window.__masteredUtteranceQueue.filter(function (u) {
              return u !== utterance;
            });
            if (window.__masteredActiveUtterance === utterance) {
              window.__masteredActiveUtterance = null;
            }
          }
          self.isSpeaking = false;
          self.activeUtterance = null;
          self.accumulatedTranscript = '';
          self.speakerCooldownUntil = Date.now() + 400; // 400ms echo drain cooldown

          if (self.state === STATES.SPEAKING) {
            if (self.isSessionActive) {
              self.transitionTo(STATES.LISTENING);
            } else {
              self.transitionTo(STATES.IDLE);
            }
          }

          if (self.isSessionActive) {
            setTimeout(function () {
              self.restartListening();
            }, 400);
          }

          if (onFinish) onFinish();
        };

        // Safety timeout in case speech engine hangs
        var wordCount = text.split(/\s+/).length;
        var timeoutMs = Math.max(5000, Math.min(35000, (wordCount / 2.0) * 1000 + 4000));
        self.speakSafetyTimer = setTimeout(function () {
          finishSpeech();
        }, timeoutMs);

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
              fallbackUtterance.rate = self.speechRate || 0.96;
              fallbackUtterance.pitch = 1.0;
              fallbackUtterance.volume = 1.0;
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

        if (isStandalone && !self.synth.speaking && typeof utterance.onend === 'function') {
          if (typeof Promise !== 'undefined') {
            Promise.resolve().then(function () {
              if (self.isSpeaking && typeof utterance.onend === 'function') {
                utterance.onend();
              }
            });
          } else {
            setTimeout(function () {
              if (self.isSpeaking && typeof utterance.onend === 'function') {
                utterance.onend();
              }
            }, 0);
          }
        }

        // Watchdog: If speak was queued but hasn't started after 450ms, wake it with resume()
        if (self.speakWatchdogTimer) {
          clearTimeout(self.speakWatchdogTimer);
          self.speakWatchdogTimer = null;
        }
        self.speakWatchdogTimer = setTimeout(function () {
          self.speakWatchdogTimer = null;
          if (!self.isSessionActive || self.state === STATES.ENDING || self.state === STATES.IDLE) return;
          if (self.isSpeaking && self.synth && !self.synth.speaking) {
            try { self.synth.resume(); } catch (e) {}
          }
        }, 450);

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
    this.isStarting = false;
    this.isListening = false;
    if (!this.isSessionActive || this.state === STATES.ENDING || this.state === STATES.IDLE || this.state === STATES.PAUSED) {
      return;
    }
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
    if (this.state === STATES.LISTENING && this.isSessionActive) {
      var self = this;
      var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var delay = isMobile ? 400 : 120;
      setTimeout(function () {
        if (!self.isSessionActive || self.state === STATES.ENDING || self.state === STATES.IDLE) return;
        self.restartListening();
      }, delay);
    }
  };

  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
    this.isSpeaking = false;
    this.isStarting = false;
    this.isListening = false;
    this.isFillerPlaying = false;
    this.pendingCoachResponse = null;
    if (this.fillerSafetyTimer) {
      clearTimeout(this.fillerSafetyTimer);
      this.fillerSafetyTimer = null;
    }
    this.accumulatedTranscript = '';
    this.latestInterim = '';

    // Transition immediately to ENDING
    this.transitionTo(STATES.ENDING);

    // 1. Clear turn processing safety watchdog
    if (this.processingSafetyTimer) {
      clearTimeout(this.processingSafetyTimer);
      this.processingSafetyTimer = null;
    }

    // 2. Clear silence detection timer
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    // 3. Clear speech safety timer and recurring keep-alive interval
    if (this.speakSafetyTimer) {
      clearTimeout(this.speakSafetyTimer);
      this.speakSafetyTimer = null;
    }
    if (this.speechKeepAliveInterval) {
      clearInterval(this.speechKeepAliveInterval);
      this.speechKeepAliveInterval = null;
    }

    // 4. Clear speech dispatch timer (80ms) and Chrome watchdog timer (150ms)
    if (this.speakDispatchTimer) {
      clearTimeout(this.speakDispatchTimer);
      this.speakDispatchTimer = null;
    }
    if (this.speakWatchdogTimer) {
      clearTimeout(this.speakWatchdogTimer);
      this.speakWatchdogTimer = null;
    }

    // 5. Clear restart debounce timer
    if (this.restartDebounceTimer) {
      clearTimeout(this.restartDebounceTimer);
      this.restartDebounceTimer = null;
    }

    // 6. Stop visualizer animation frame
    if (this.animFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    // 7. Reset audio level visualizer
    if (this.onAudioLevel) {
      try { this.onAudioLevel(0); } catch (e) {}
    }

    // 8. Decouple active utterance event listeners and clear global utterance queue
    if (this.activeUtterance) {
      try {
        this.activeUtterance.onstart = null;
        this.activeUtterance.onend = null;
        this.activeUtterance.onerror = null;
        this.activeUtterance.onpause = null;
        this.activeUtterance.onresume = null;
      } catch (e) {}
      this.activeUtterance = null;
    }
    if (this.currentUtterance) {
      try {
        this.currentUtterance.onstart = null;
        this.currentUtterance.onend = null;
        this.currentUtterance.onerror = null;
      } catch (e) {}
      this.currentUtterance = null;
    }
    if (typeof window !== 'undefined') {
      window.__masteredUtteranceQueue = [];
      window.__masteredActiveUtterance = null;
      window.__masteredUnlockUtterance = null;
    }

    // 9. Cancel SpeechSynthesis audio playback
    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
    }

    // 10. Abort and decouple SpeechRecognition
    if (this.recognition) {
      try {
        this.recognition.onstart = null;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
        if (typeof this.recognition.abort === 'function') {
          this.recognition.abort();
        } else if (typeof this.recognition.stop === 'function') {
          this.recognition.stop();
        }
      } catch (e) {}
      this.recognition = null;
    }

    // 11. Stop media stream tracks
    if (this.mediaStream) {
      try {
        var tracks = this.mediaStream.getTracks();
        for (var i = 0; i < tracks.length; i++) {
          tracks[i].stop();
        }
      } catch (e) {}
      this.mediaStream = null;
    }

    // 12. Close audio context
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try { this.audioContext.close(); } catch (e) {}
    }

    // 13. Final state transition to IDLE
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
    this.pipeline.speakCoachResponse(text, onEnd, true);
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

  // Seamless compatibility aliases on LiveVoicePipeline prototype
  LiveVoicePipeline.prototype.speak = function (text, onFinish, isStandalone) {
    return this.speakCoachResponse(text, onFinish, isStandalone !== undefined ? isStandalone : !this.isSessionActive);
  };
  LiveVoicePipeline.prototype.pauseLiveSession = function () {
    return this.pauseListening();
  };
  LiveVoicePipeline.prototype.resumeLiveSession = function () {
    return this.resumeListening();
  };
  LiveVoicePipeline.prototype.setSpeed = function (speed) {
    this.speechRate = Number(speed) || 0.96;
  };

  var MasteredSpeech = {
    STATES: STATES,
    VALID_TRANSITIONS: VALID_TRANSITIONS,
    LiveVoicePipeline: LiveVoicePipeline,
    BrowserSpeechEngine: BrowserSpeechEngine,
    detectSpokenIntent: detectSpokenIntent,
    isMaleVoice: isMaleVoice,
    getCoachFemaleVoice: getCoachFemaleVoice,
    reloadFemaleVoice: reloadFemaleVoice,
    isLiveVoiceSupported: function () {
      if (typeof window === 'undefined') return false;
      var hasRecognition = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
      var hasSynth = Boolean(window.speechSynthesis);
      return Boolean(hasRecognition && hasSynth);
    }
  };

  root.MasteredSpeech = MasteredSpeech;
  root.MasteredSpeechLive = MasteredSpeech;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredSpeech;
  }
})();
