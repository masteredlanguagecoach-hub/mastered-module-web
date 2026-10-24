/**
 * Official Mastered AI Coach Browser-Local Speech Pipeline
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md
 * Integrates Web Speech API (SpeechRecognition / webkitSpeechRecognition)
 * and SpeechSynthesis entirely within the browser.
 * NEVER uploads raw audio to any remote server.
 */

(function (global) {
  'use strict';

  function BrowserSpeechEngine(options) {
    options = options || {};
    this.lang = options.lang || 'en-US';
    this.state = 'IDLE'; // 'IDLE' | 'LISTENING' | 'TRANSCRIBING' | 'SPEAKING'
    this.recognition = null;
    this.synth = (typeof window !== 'undefined' && window.speechSynthesis) ? window.speechSynthesis : null;
    this.onStateChange = options.onStateChange || function () {};

    this.initRecognition();
  }

  BrowserSpeechEngine.prototype.isSupported = function () {
    return Boolean(
      (typeof window !== 'undefined') &&
      (window.SpeechRecognition || window.webkitSpeechRecognition)
    );
  };

  BrowserSpeechEngine.prototype.initRecognition = function () {
    if (typeof window === 'undefined') return;
    var SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.lang = this.lang;
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    } catch (e) {
      this.recognition = null;
    }
  };

  BrowserSpeechEngine.prototype.setState = function (newState) {
    this.state = newState;
    this.onStateChange(this.state);
  };

  BrowserSpeechEngine.prototype.startListening = function (callbacks) {
    callbacks = callbacks || {};
    var onResult = callbacks.onResult || function () {};
    var onError = callbacks.onError || function () {};

    if (!this.recognition) {
      this.initRecognition();
      if (!this.recognition) {
        onError({
          code: 'NOT_SUPPORTED',
          message: 'Web Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
        });
        return;
      }
    }

    var self = this;
    self.setState('LISTENING');

    this.recognition.onstart = function () {
      self.setState('LISTENING');
    };

    this.recognition.onresult = function (event) {
      self.setState('TRANSCRIBING');
      if (event.results && event.results.length > 0) {
        var result = event.results[0][0];
        var transcript = result.transcript ? result.transcript.trim() : '';
        var confidence = typeof result.confidence === 'number' ? result.confidence : 1.0;

        self.setState('IDLE');
        onResult({
          source: 'speech',
          text: transcript,
          confidence: confidence,
          timestamp: Date.now()
        });
      } else {
        self.setState('IDLE');
        onError({ code: 'NO_SPEECH', message: 'No speech was detected.' });
      }
    };

    this.recognition.onerror = function (event) {
      self.setState('IDLE');
      onError({
        code: event.error || 'SPEECH_ERROR',
        message: event.message || ('Speech recognition error: ' + event.error)
      });
    };

    this.recognition.onend = function () {
      if (self.state === 'LISTENING') {
        self.setState('IDLE');
      }
    };

    try {
      this.recognition.start();
    } catch (err) {
      self.setState('IDLE');
      onError({ code: 'START_FAILED', message: err.toString() });
    }
  };

  BrowserSpeechEngine.prototype.stopListening = function () {
    if (this.recognition && this.state === 'LISTENING') {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.setState('IDLE');
  };

  BrowserSpeechEngine.prototype.speak = function (text, onEnd) {
    if (!this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }

    var self = this;
    try {
      this.synth.cancel(); // Stop any pending utterance

      var utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = this.lang;
      utterance.rate = 0.95; // Gentle, clear teaching cadence
      utterance.pitch = 1.0;

      utterance.onstart = function () {
        self.setState('SPEAKING');
      };

      utterance.onend = function () {
        self.setState('IDLE');
        if (onEnd) onEnd();
      };

      utterance.onerror = function () {
        self.setState('IDLE');
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (e) {
      self.setState('IDLE');
      if (onEnd) onEnd();
    }
  };

  BrowserSpeechEngine.prototype.stopSpeaking = function () {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    if (this.state === 'SPEAKING') {
      this.setState('IDLE');
    }
  };

  var MasteredSpeech = {
    BrowserSpeechEngine: BrowserSpeechEngine
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredSpeech;
  }
  global.MasteredSpeech = MasteredSpeech;

})(typeof window !== 'undefined' ? window : globalThis);
