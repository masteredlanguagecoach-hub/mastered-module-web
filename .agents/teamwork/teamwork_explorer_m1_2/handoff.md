# Handoff Report: Milestone 1-2 — `assets/aiCoach/speech.js` Audio & Web Speech Pipeline Teardown Hardening

**Target File**: `assets/aiCoach/speech.js`  
**Author**: teamwork_explorer M1-2  
**Recipient**: teamwork_worker (Milestone 1 Implementation)  
**Date**: 2026-10-31  

---

## 1. Observation

### 1.1 Incomplete State Transitions to `ENDING` in `VALID_TRANSITIONS`
In `assets/aiCoach/speech.js`, lines 47–60:
```javascript
47:   var VALID_TRANSITIONS = {
48:     IDLE: ['INITIALIZING', 'REQUESTING_MICROPHONE', 'ERROR', 'ENDING', 'SPEAKING'],
49:     INITIALIZING: ['REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ERROR', 'IDLE'],
50:     REQUESTING_MICROPHONE: ['LISTENING', 'SPEAKING', 'ERROR', 'IDLE'],
51:     LISTENING: ['PROCESSING_SPEECH', 'SPEAKING', 'PAUSED', 'INTERRUPTED', 'RECOVERING', 'ENDING', 'ERROR', 'IDLE'],
52:     PROCESSING_SPEECH: ['GENERATING_RESPONSE', 'SPEAKING', 'LISTENING', 'RECOVERING', 'ERROR', 'ENDING', 'IDLE'],
53:     GENERATING_RESPONSE: ['SPEAKING', 'LISTENING', 'ERROR', 'ENDING', 'IDLE'],
54:     SPEAKING: ['LISTENING', 'PROCESSING_SPEECH', 'INTERRUPTED', 'PAUSED', 'ENDING', 'ERROR', 'IDLE'],
55:     INTERRUPTED: ['LISTENING', 'PROCESSING_SPEECH', 'SPEAKING', 'IDLE', 'ERROR'],
56:     PAUSED: ['LISTENING', 'SPEAKING', 'ENDING', 'IDLE'],
57:     RECOVERING: ['LISTENING', 'REQUESTING_MICROPHONE', 'SPEAKING', 'ERROR', 'IDLE'],
58:     ENDING: ['IDLE'],
59:     ERROR: ['RECOVERING', 'IDLE', 'REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING']
60:   };
```
Observed defects:
- `INITIALIZING` (line 49): does **not** include `'ENDING'`.
- `REQUESTING_MICROPHONE` (line 50): does **not** include `'ENDING'`.
- `INTERRUPTED` (line 55): does **not** include `'ENDING'`.
- `RECOVERING` (line 57): does **not** include `'ENDING'`.
- `ERROR` (line 59): does **not** include `'ENDING'`.

Furthermore, in `LiveVoicePipeline.prototype.transitionTo` (lines 301–316):
```javascript
301:     if (!this.canTransition(nextState)) {
302:       var err = "Invalid state transition from " + this.state + " to " + nextState;
303:       console.warn("[LiveVoicePipeline]", err);
304:       if (nextState === STATES.SPEAKING || nextState === STATES.LISTENING || nextState === STATES.PROCESSING_SPEECH || nextState === STATES.INTERRUPTED) {
305:         var prevSt = this.state;
306:         this.state = nextState;
307:         if (this.onStateChange) {
308:           this.onStateChange(this.state, prevSt, meta);
309:         }
310:         return true;
311:       }
312:       if (this.onError) {
313:         this.onError({ code: 'INVALID_TRANSITION', message: err });
314:       }
315:       return false;
316:     }
```
If the user clicks "End Call" while Coach Sarah was interrupted (`INTERRUPTED`), while microphone permissions were pending (`REQUESTING_MICROPHONE`), during startup (`INITIALIZING`), or during backoff recovery (`RECOVERING`), `endLiveSession()` calls `this.transitionTo(STATES.ENDING)` (line 960). Because `'ENDING'` is not in `VALID_TRANSITIONS` for those states, and is not in line 304's emergency recovery set, `transitionTo` logs a warning, calls `this.onError`, and returns `false`, blocking the transition to `ENDING`.

---

### 1.2 Leaking Timers and Unclosed Resources in `endLiveSession`
In `assets/aiCoach/speech.js`, lines 956–995:
```javascript
956:   LiveVoicePipeline.prototype.endLiveSession = function () {
957:     this.isSessionActive = false;
958:     clearTimeout(this.processingSafetyTimer);
959:     this.isSpeaking = false;
960:     this.transitionTo(STATES.ENDING);
961: 
962:     if (this.silenceTimer) {
963:       clearTimeout(this.silenceTimer);
964:       this.silenceTimer = null;
965:     }
966: 
967:     if (this.animFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
968:       window.cancelAnimationFrame(this.animFrameId);
969:       this.animFrameId = null;
970:     }
971: 
972:     if (this.synth) {
973:       try { this.synth.cancel(); } catch (e) {}
974:     }
975: 
976:     if (this.recognition) {
977:       try { this.recognition.stop(); } catch (e) {}
978:     }
979: 
980:     if (this.mediaStream) {
981:       try {
982:         var tracks = this.mediaStream.getTracks();
983:         for (var i = 0; i < tracks.length; i++) {
984:           tracks[i].stop();
985:         }
986:       } catch (e) {}
987:       this.mediaStream = null;
988:     }
989: 
990:     if (this.audioContext && this.audioContext.state !== 'closed') {
991:       try { this.audioContext.close(); } catch (e) {}
992:     }
993: 
994:     this.transitionTo(STATES.IDLE);
995:   };
```

Direct observations of leaking handles:
1. **Recurring Keep-Alive Interval**:
   Line 834 schedules:
   ```javascript
   self.speechKeepAliveInterval = setInterval(function () {
     if (self.synth && self.synth.speaking && !self.synth.paused) {
       self.synth.pause();
       self.synth.resume();
     }
   }, 5000);
   ```
   `this.speechKeepAliveInterval` is **never cleared** in `endLiveSession`. If a session is ended while speaking, this 5000ms recurring timer runs indefinitely in the browser background.
2. **Speech Safety Timer**:
   Line 827 schedules:
   ```javascript
   self.speakSafetyTimer = setTimeout(function () {
     finishSpeech();
   }, timeoutMs);
   ```
   `this.speakSafetyTimer` is **never cleared** in `endLiveSession`. When it fires, `finishSpeech()` executes, setting `self.state = STATES.LISTENING` and calling `self.restartListening()`, which revives audio listening after the call was supposed to be dead.
3. **Restart Debounce Timer**:
   Line 690 schedules:
   ```javascript
   this.restartDebounceTimer = setTimeout(function () {
     self.restartListening();
   }, minGap - (now - self.lastStartAttempt));
   ```
   `this.restartDebounceTimer` is **never cleared** in `endLiveSession`. When it fires, it restarts `SpeechRecognition`.
4. **Anonymous Speak Dispatch (80ms) and Chrome Watchdog (150ms) Timers**:
   - Line 753: `setTimeout(function () { ... }, 80);`
   - Line 874: `setTimeout(function () { ... }, 150);`
   Neither timer is tracked in an instance variable or cleared in `endLiveSession`. If `endLiveSession()` is called within 80ms of `speakCoachResponse()`, the dispatch callback fires **after** `synth.cancel()`, queuing speech synthesis and restarting the entire speech cycle.
5. **Utterance Listeners and Global Utterance Queue**:
   Lines 785–789 assign:
   ```javascript
   window.__masteredUtteranceQueue.push(utterance);
   window.__masteredActiveUtterance = utterance;
   self.activeUtterance = utterance;
   ```
   `endLiveSession` does not nullify `this.activeUtterance.onstart`, `onend`, `onerror`, `onpause`, `onresume`, nor does it clear `window.__masteredUtteranceQueue` or `window.__masteredActiveUtterance`.
6. **`recognition.stop()` vs `recognition.abort()` and Listener Retention**:
   Line 977 calls `this.recognition.stop()`. According to the W3C Web Speech API specification:
   - `stop()` halts capture but continues processing buffered audio, triggering deferred `onresult` and `onend` events.
   - `abort()` immediately halts audio capture and discards all pending audio.
   Furthermore, `onstart`, `onresult`, `onerror`, `onend` listeners remain bound to `this.recognition`, and `this.recognition` is never nullified.
7. **Audio Level Visualizer Not Zeroed**:
   `this.onAudioLevel(0)` is never emitted, leaving visualizer bars frozen in their last recorded state.

---

### 1.3 Unguarded Late Recognition Events in `handleSpeechResult` and `handleSpeechEnd`
In `assets/aiCoach/speech.js`, lines 482–488:
```javascript
482:   LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
483:     if (this.state === STATES.PAUSED || this.state === STATES.ENDING) return;
484: 
485:     // Discard any audio input while coach is speaking or during echo cooldown
486:     if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
487:       return;
488:     }
```
Observed defect:
`endLiveSession()` immediately executes `this.transitionTo(STATES.IDLE)` (line 994). At that point:
`this.state === STATES.IDLE` and `this.isSessionActive === false`.
Line 483 only checks `this.state === STATES.PAUSED || this.state === STATES.ENDING`. It does **not** check `!this.isSessionActive` and does **not** check `this.state === STATES.IDLE`.
Therefore, a late speech recognition result arriving after teardown bypasses the guard, enters lines 490–525, accumulates transcripts, invokes `this.onTranscriptUpdate`, and calls `this.resetSilenceTimer()`, which eventually dispatches `this.onStudentTurnComplete()` and corrupts dialogue state.

Similarly, in `handleSpeechEnd` (lines 940–954):
```javascript
940:   LiveVoicePipeline.prototype.handleSpeechEnd = function () {
941:     this.isStarting = false;
942:     this.isListening = false;
943:     if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
944:       return;
945:     }
946:     if (this.state === STATES.LISTENING && this.isSessionActive) {
947:       var self = this;
948:       var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
949:       var delay = isMobile ? 400 : 120;
950:       setTimeout(function () {
951:         self.restartListening();
952:       }, delay);
953:     }
954:   };
```
If `handleSpeechEnd` fired right before `endLiveSession()`, the scheduled timeout at line 950 executes `restartListening()` after the call was ended. In `restartListening()` (line 674), there is no check for `!this.isSessionActive`.

---

## 2. Logic Chain

```
[Observation 1.1]
VALID_TRANSITIONS lacks 'ENDING' in INITIALIZING, REQUESTING_MICROPHONE, INTERRUPTED, RECOVERING, ERROR
     │
     ▼
[Step 1]
When student clicks "End Call" while pipeline is in any of these 5 states,
transitionTo(STATES.ENDING) fails with INVALID_TRANSITION, leaving pipeline stuck.
     │
     ▼
[Observation 1.2]
speechKeepAliveInterval, speakSafetyTimer, restartDebounceTimer, speakDispatchTimer,
and speakWatchdogTimer are not tracked or cleared in endLiveSession.
     │
     ▼
[Step 2]
Any scheduled callback fires post-call, executing finishSpeech() or restartListening(),
resurrecting speech recognition or synthesis in the background.
     │
     ▼
[Observation 1.2.6 & 1.2.7]
recognition.stop() buffers pending audio instead of discarding via recognition.abort();
listeners stay attached; onAudioLevel(0) is not emitted.
     │
     ▼
[Step 3]
Web Speech recognition continues running audio processing; onAudioLevel leaves visualizer bars frozen.
     │
     ▼
[Observation 1.3]
handleSpeechResult and handleSpeechEnd do not check !isSessionActive or state === IDLE.
     │
     ▼
[Step 4]
Late recognition events bypass guards, accumulate phantom transcripts, and trigger silenceTimer,
dispatching ghost student turns into the backend/engine.
     │
     ▼
[Conclusion]
Applying targeted fixes to:
1. VALID_TRANSITIONS (add 'ENDING' to all 5 states, plus fallback emergency bypass in transitionTo)
2. LiveVoicePipeline constructor (explicitly initialize speakDispatchTimer, speakWatchdogTimer, isSessionActive)
3. speakCoachResponse (track speakDispatchTimer & speakWatchdogTimer, check isSessionActive before speak)
4. endLiveSession (clear all 5 timers, abort and decouple recognition, unhook utterances, reset onAudioLevel(0))
5. handleSpeechResult, handleSpeechEnd, restartListening, onSilenceTimeout (guard against !isSessionActive / IDLE)
guarantees clean, leak-free, un-resurrectable termination under all call conditions.
```

---

## 3. Caveats

1. **Browser SpeechSynthesis Garbage Collection Quirks**: In desktop Google Chrome, long utterances can freeze if garbage collected. `speech.js` mitigates this with `window.__masteredUtteranceQueue` and `speechKeepAliveInterval`. In `endLiveSession()`, clearing `window.__masteredUtteranceQueue = []` and `clearInterval(this.speechKeepAliveInterval)` is essential so the garbage collector can cleanly reclaim audio context without triggering an unhandled audio thread error.
2. **Mobile Device Differences**: On iOS Safari and Android Chrome, `SpeechRecognition.abort()` is asynchronous in native WebKit/Blink implementations. Defensively nullifying `onstart`, `onresult`, `onerror`, `onend` before calling `abort()` ensures that any subsequent native callbacks are no-ops.
3. **No Code Modification by Explorer**: In strict adherence to read-only explorer duties, no files in `assets/`, `backend/`, or `scratch/` have been modified by this explorer. All drop-in code blocks below are provided for the Worker to apply.

---

## 4. Conclusion & Concrete Code Specifications

### 4.1 Summary of Required Edits in `assets/aiCoach/speech.js`

| # | Target Area | Lines | Change Description |
|---|-------------|-------|--------------------|
| **C1** | `VALID_TRANSITIONS` | 47–60 | Add `'ENDING'` to `INITIALIZING`, `REQUESTING_MICROPHONE`, `INTERRUPTED`, `RECOVERING`, and `ERROR`. |
| **C2** | Constructor initialization | 225–248 | Initialize `speakDispatchTimer`, `speakWatchdogTimer`, `processingSafetyTimer`, `isSessionActive = false`, and `activeUtterance = null`. |
| **C3** | Emergency bypass in `transitionTo` | 304 | Add `|| nextState === STATES.ENDING || nextState === STATES.IDLE` to emergency bypass. |
| **C4** | Result & silence timeout guards | 482–488, 554, 674 | Guard `handleSpeechResult`, `onSilenceTimeout`, and `restartListening` with `!this.isSessionActive \|\| this.state === STATES.IDLE \|\| this.state === STATES.ENDING`. |
| **C5** | `speakCoachResponse` timer tracking | 751–880 | Assign `this.speakDispatchTimer` (80ms) and `this.speakWatchdogTimer` (150ms); clear in `finishSpeech` and check `this.isSessionActive`. |
| **C6** | `handleSpeechEnd` guard | 940–954 | Guard `handleSpeechEnd` with `!this.isSessionActive \|\| this.state === STATES.ENDING \|\| this.state === STATES.IDLE`, plus check `!self.isSessionActive` inside `setTimeout`. |
| **C7** | Complete `endLiveSession` teardown | 956–995 | Fully clear all 5 timers/intervals, decouple and abort `recognition`, unhook utterances, emit `onAudioLevel(0)`, and transition to `IDLE`. |

---

### 4.2 Drop-In Code Chunks for the Worker

#### Chunk 1: `VALID_TRANSITIONS` (Lines 47–60)
**File**: `assets/aiCoach/speech.js`  
**Start Line**: 47  
**End Line**: 60  

**Target Content**:
```javascript
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
```

**Replacement Content**:
```javascript
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
```

---

#### Chunk 2: `LiveVoicePipeline` Constructor Handles (Lines 225–248)
**File**: `assets/aiCoach/speech.js`  
**Start Line**: 225  
**End Line**: 248  

**Target Content**:
```javascript
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
    this.isStarting = false;
    this.isListening = false;
    this.lastStartAttempt = 0;
    this.restartDebounceTimer = null;
```

**Replacement Content**:
```javascript
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
```

---

#### Chunk 3: Emergency Bypass in `transitionTo` (Lines 301–316)
**File**: `assets/aiCoach/speech.js`  
**Start Line**: 301  
**End Line**: 316  

**Target Content**:
```javascript
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
```

**Replacement Content**:
```javascript
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
```

---

#### Chunk 4: Guard `handleSpeechResult`, `onSilenceTimeout`, and `restartListening`
**File**: `assets/aiCoach/speech.js`  

**Target 4A** (Lines 482–488):
```javascript
  LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
    if (this.state === STATES.PAUSED || this.state === STATES.ENDING) return;

    // Discard any audio input while coach is speaking or during echo cooldown
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
```
**Replacement 4A**:
```javascript
  LiveVoicePipeline.prototype.handleSpeechResult = function (event) {
    if (!this.isSessionActive || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) return;

    // Discard any audio input while coach is speaking or during echo cooldown
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
```

**Target 4B** (Line 554–555):
```javascript
  LiveVoicePipeline.prototype.onSilenceTimeout = function () {
    if (this.state !== STATES.LISTENING && this.state !== STATES.INTERRUPTED) return;
```
**Replacement 4B**:
```javascript
  LiveVoicePipeline.prototype.onSilenceTimeout = function () {
    if (!this.isSessionActive || (this.state !== STATES.LISTENING && this.state !== STATES.INTERRUPTED)) return;
```

**Target 4C** (Lines 673–676):
```javascript
  LiveVoicePipeline.prototype.restartListening = function () {
    if (this.isSpeaking || this.state === STATES.SPEAKING || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) {
      return;
    }
```
**Replacement 4C**:
```javascript
  LiveVoicePipeline.prototype.restartListening = function () {
    if (!this.isSessionActive || this.isSpeaking || this.state === STATES.SPEAKING || this.state === STATES.PAUSED || this.state === STATES.ENDING || this.state === STATES.IDLE) {
      return;
    }
```

---

#### Chunk 5: `speakCoachResponse` Dispatch & Watchdog Tracking (Lines 751–887)
**File**: `assets/aiCoach/speech.js`  

**Target 5A** (Lines 752–760):
```javascript
    // STEP 3: Dispatch with small tick so audio thread resets
    setTimeout(function () {
      if (!self.synth) {
        self.isSpeaking = false;
        self.transitionTo(STATES.LISTENING);
        self.restartListening();
        if (onFinish) onFinish();
        return;
      }
```
**Replacement 5A**:
```javascript
    // STEP 3: Dispatch with small tick so audio thread resets
    if (this.speakDispatchTimer) {
      clearTimeout(this.speakDispatchTimer);
      this.speakDispatchTimer = null;
    }
    this.speakDispatchTimer = setTimeout(function () {
      self.speakDispatchTimer = null;
      if (!self.isSessionActive || self.state === STATES.ENDING || self.state === STATES.IDLE) {
        self.isSpeaking = false;
        return;
      }
      if (!self.synth) {
        self.isSpeaking = false;
        self.transitionTo(STATES.LISTENING);
        self.restartListening();
        if (onFinish) onFinish();
        return;
      }
```

**Target 5B** in `finishSpeech` (Lines 791–800):
```javascript
        var finishSpeech = function () {
          if (self.speakSafetyTimer) {
            clearTimeout(self.speakSafetyTimer);
            self.speakSafetyTimer = null;
          }
          if (self.speechKeepAliveInterval) {
            clearInterval(self.speechKeepAliveInterval);
            self.speechKeepAliveInterval = null;
          }
```
**Replacement 5B**:
```javascript
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
```

**Target 5C** Chrome Watchdog (Lines 873–878):
```javascript
        // Chrome Watchdog: If speak was queued but hasn't started after 150ms, wake it with resume()
        setTimeout(function () {
          if (self.isSpeaking && self.synth && !self.synth.speaking) {
            try { self.synth.resume(); } catch (e) {}
          }
        }, 150);
```
**Replacement 5C**:
```javascript
        // Chrome Watchdog: If speak was queued but hasn't started after 150ms, wake it with resume()
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
        }, 150);
```

---

#### Chunk 6: `handleSpeechEnd` Guard (Lines 940–954)
**File**: `assets/aiCoach/speech.js`  
**Start Line**: 940  
**End Line**: 954  

**Target Content**:
```javascript
  LiveVoicePipeline.prototype.handleSpeechEnd = function () {
    this.isStarting = false;
    this.isListening = false;
    if (this.isSpeaking || this.state === STATES.SPEAKING || (this.speakerCooldownUntil && Date.now() < this.speakerCooldownUntil)) {
      return;
    }
    if (this.state === STATES.LISTENING && this.isSessionActive) {
      var self = this;
      var isMobile = (typeof navigator !== 'undefined') && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      var delay = isMobile ? 400 : 120;
      setTimeout(function () {
        self.restartListening();
      }, delay);
    }
  };
```

**Replacement Content**:
```javascript
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
```

---

#### Chunk 7: Complete Hardened `endLiveSession` (Lines 956–995)
**File**: `assets/aiCoach/speech.js`  
**Start Line**: 956  
**End Line**: 995  

**Target Content**:
```javascript
  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
    clearTimeout(this.processingSafetyTimer);
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
```

**Replacement Content**:
```javascript
  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
    this.isSpeaking = false;
    this.isStarting = false;
    this.isListening = false;
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
```

---

## 5. Verification Method

### 5.1 Independent Test Suite Verification
The Worker can execute the existing test suites:
```powershell
node scratch/test_ai_coach.cjs
node scratch/test_pipeline_flow.cjs
```
Both must pass 100%.

### 5.2 Standalone Hardened Teardown Test Script (`scratch/test_speech_teardown_hardening.cjs`)
The Worker can save and run this comprehensive 7-point Node verification script to test all teardown invariants:

```javascript
// scratch/test_speech_teardown_hardening.cjs
const assert = require('assert');

// Setup mock browser globals
global.window = {
  SpeechSynthesisUtterance: function(text) {
    this.text = text;
    this.lang = 'en-US';
    this.onstart = null;
    this.onend = null;
    this.onerror = null;
  },
  __masteredUtteranceQueue: [],
  __masteredActiveUtterance: null,
  cancelAnimationFrame: function(id) {}
};

require('../assets/aiCoach/speech.js');
const { LiveVoicePipeline, STATES, VALID_TRANSITIONS } = global.MasteredSpeech;

console.log('--- STARTING SPEECH TEARDOWN HARDENING VERIFICATION ---');

// Test 1: VALID_TRANSITIONS allows ENDING from all required states
console.log('[Test 1] Verifying VALID_TRANSITIONS allows ENDING from all states...');
const requiredStates = ['INITIALIZING', 'REQUESTING_MICROPHONE', 'INTERRUPTED', 'RECOVERING', 'ERROR', 'IDLE', 'LISTENING', 'PROCESSING_SPEECH', 'GENERATING_RESPONSE', 'SPEAKING', 'PAUSED'];
requiredStates.forEach(st => {
  assert.ok(VALID_TRANSITIONS[st].includes('ENDING'), `State ${st} must include ENDING in VALID_TRANSITIONS`);
  const p = new LiveVoicePipeline();
  p.state = st;
  assert.strictEqual(p.transitionTo('ENDING'), true, `Pipeline must transition from ${st} to ENDING`);
});
assert.ok(VALID_TRANSITIONS.ENDING.includes('IDLE'), 'ENDING must allow transition to IDLE');
console.log('✅ Test 1 Passed: All states cleanly transition to ENDING');

// Test 2: endLiveSession clears all 5 timers and intervals
console.log('[Test 2] Verifying endLiveSession clears all 5 timers and intervals...');
const p2 = new LiveVoicePipeline();
p2.isSessionActive = true;
p2.state = STATES.SPEAKING;

// Seed all timers
p2.speechKeepAliveInterval = setInterval(() => {}, 5000);
p2.speakSafetyTimer = setTimeout(() => {}, 10000);
p2.restartDebounceTimer = setTimeout(() => {}, 500);
p2.speakDispatchTimer = setTimeout(() => {}, 80);
p2.speakWatchdogTimer = setTimeout(() => {}, 150);
p2.processingSafetyTimer = setTimeout(() => {}, 6000);
p2.silenceTimer = setTimeout(() => {}, 1900);

p2.endLiveSession();

assert.strictEqual(p2.speechKeepAliveInterval, null, 'speechKeepAliveInterval must be null');
assert.strictEqual(p2.speakSafetyTimer, null, 'speakSafetyTimer must be null');
assert.strictEqual(p2.restartDebounceTimer, null, 'restartDebounceTimer must be null');
assert.strictEqual(p2.speakDispatchTimer, null, 'speakDispatchTimer must be null');
assert.strictEqual(p2.speakWatchdogTimer, null, 'speakWatchdogTimer must be null');
assert.strictEqual(p2.processingSafetyTimer, null, 'processingSafetyTimer must be null');
assert.strictEqual(p2.silenceTimer, null, 'silenceTimer must be null');
assert.strictEqual(p2.state, STATES.IDLE, 'Final state must be IDLE');
assert.strictEqual(p2.isSessionActive, false, 'isSessionActive must be false');
console.log('✅ Test 2 Passed: All 7 timers/intervals are cleared and nulled');

// Test 3: endLiveSession aborts and decouples SpeechRecognition
console.log('[Test 3] Verifying recognition.abort() and listener decoupling...');
const p3 = new LiveVoicePipeline();
let aborted = false;
let stopped = false;
p3.recognition = {
  abort: function() { aborted = true; },
  stop: function() { stopped = true; },
  onstart: () => {},
  onresult: () => {},
  onerror: () => {},
  onend: () => {}
};

p3.endLiveSession();

assert.strictEqual(aborted, true, 'recognition.abort() must be called');
assert.strictEqual(stopped, false, 'recognition.stop() should not be called when abort exists');
assert.strictEqual(p3.recognition, null, 'p3.recognition must be set to null');
console.log('✅ Test 3 Passed: recognition.abort() called and instance nulled');

// Test 4: endLiveSession nullifies utterance listeners and clears queue
console.log('[Test 4] Verifying utterance decoupling and queue clearance...');
const p4 = new LiveVoicePipeline();
const mockUtt = new global.window.SpeechSynthesisUtterance('Test speech');
mockUtt.onstart = () => {};
mockUtt.onend = () => {};
mockUtt.onerror = () => {};
p4.activeUtterance = mockUtt;
global.window.__masteredUtteranceQueue = [mockUtt];
global.window.__masteredActiveUtterance = mockUtt;

p4.endLiveSession();

assert.strictEqual(mockUtt.onstart, null, 'activeUtterance.onstart must be null');
assert.strictEqual(mockUtt.onend, null, 'activeUtterance.onend must be null');
assert.strictEqual(mockUtt.onerror, null, 'activeUtterance.onerror must be null');
assert.strictEqual(p4.activeUtterance, null, 'p4.activeUtterance must be null');
assert.strictEqual(global.window.__masteredUtteranceQueue.length, 0, 'utterance queue must be empty');
assert.strictEqual(global.window.__masteredActiveUtterance, null, 'active utterance global must be null');
console.log('✅ Test 4 Passed: Utterances decoupled and queue emptied');

// Test 5: endLiveSession resets audio level to 0
console.log('[Test 5] Verifying onAudioLevel(0) reset...');
let audioLevelEmitted = -1;
const p5 = new LiveVoicePipeline({
  onAudioLevel: function(lvl) { audioLevelEmitted = lvl; }
});
p5.endLiveSession();
assert.strictEqual(audioLevelEmitted, 0, 'onAudioLevel(0) must be called on teardown');
console.log('✅ Test 5 Passed: onAudioLevel(0) called');

// Test 6: Late speech recognition results are discarded when session inactive or in IDLE
console.log('[Test 6] Verifying late speech results are discarded...');
const p6 = new LiveVoicePipeline();
p6.endLiveSession(); // Now state === IDLE, isSessionActive === false

let transcriptUpdated = false;
p6.onTranscriptUpdate = () => { transcriptUpdated = true; };

p6.handleSpeechResult({
  resultIndex: 0,
  results: [
    Object.assign([{ transcript: "Ghost words after call ended" }], { isFinal: true })
  ]
});

assert.strictEqual(transcriptUpdated, false, 'Late speech results must not trigger onTranscriptUpdate');
assert.strictEqual(p6.accumulatedTranscript, '', 'Transcript must remain empty');
assert.strictEqual(p6.silenceTimer, null, 'silenceTimer must not be scheduled');
console.log('✅ Test 6 Passed: Late speech results strictly discarded');

// Test 7: Late speech end event does not restart listening
console.log('[Test 7] Verifying handleSpeechEnd does not restart when session inactive...');
const p7 = new LiveVoicePipeline();
p7.endLiveSession();

let restartAttempted = false;
p7.restartListening = () => { restartAttempted = true; };

p7.handleSpeechEnd();

setTimeout(() => {
  assert.strictEqual(restartAttempted, false, 'restartListening must not be triggered post-teardown');
  console.log('✅ Test 7 Passed: handleSpeechEnd strictly blocks restart');
  console.log('\n🎉 ALL 7 SPEECH TEARDOWN HARDENING TESTS PASSED 100%!');
}, 500);
```

### 5.3 Invalidation Conditions
This investigation is considered invalidated if:
1. Clicking "End Call" leaves any `setInterval` or `setTimeout` handle active.
2. `SpeechRecognition` remains alive or fires deferred speech transcripts after call end.
3. `window.speechSynthesis` speaks any utterance queued before call end.
4. Calling `endLiveSession()` while in `INTERRUPTED` or `RECOVERING` logs `[LiveVoicePipeline] Invalid state transition`.
5. `test_ai_coach.cjs` fails any of its 23 existing acceptance tests.
