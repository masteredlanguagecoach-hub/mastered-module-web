# Remediation Changes Log: Milestone 1 (Generation 3)

**Agent**: Worker M1 (Generation 3)  
**Parent Agent**: `4f9e4f55-d34b-495c-91cd-1f28c4210a04`  
**Date**: November 2, 2026  
**Status**: All 8 Defects/Vulnerabilities Remediated & Verified  

---

## Summary of Remediated Defects

### 1. BUG-M1-01: Sparse/Null Voice Array TypeError in `getCoachFemaleVoice`
- **Files Modified**: `assets/aiCoach/speech.js:139-158`
- **Changes**:
  - Filtered out falsy items before processing voice array: `voices = voices.filter(Boolean);`
  - Added null check in English voice filtering: `if (!v) return false;`
  - Added candidate voice reference check: `return v && !isMaleVoice(v);`
  - Added top-level guard in `scoreVoice(v)`: `if (!v) return -9999;`
- **Result**: Sparse or null-containing arrays returned by `synth.getVoices()` no longer throw `TypeError: Cannot read properties of null (reading 'lang')`.

### 2. BUG-M1-02: `speakCoachResponse("")` (Empty/Whitespace Text) Leaking to `LISTENING`
- **Files Modified**: `assets/aiCoach/speech.js:891-901`
- **Changes**:
  - When text is empty or whitespace (`!text || !text.trim()`), guarded state transition: only transition to `STATES.LISTENING` and invoke `this.restartListening()` if `this.isSessionActive === true`.
  - When session is inactive, cleanly invoke `if (onFinish) onFinish(); return;` without mutating state.
- **Result**: Calling `speakCoachResponse("")` while in `IDLE` state preserves `IDLE` state and does not trigger invalid transition to `LISTENING`.

### 3. BUG-M1-03: `speakCoachResponse(text)` in Inactive Session Trapping State in `SPEAKING`
- **Files Modified**: `assets/aiCoach/speech.js:903-907, 1017-1027`
- **Changes**:
  - Added guard at the start of `speakCoachResponse`: `if (!this.isSessionActive && !isStandalone) { this.isSpeaking = false; if (onFinish) onFinish(); return; }`.
  - When speech occurs in standalone mode without active session, `finishSpeech` transitions state cleanly back to `STATES.IDLE` instead of `STATES.LISTENING`.
- **Result**: State is never corrupted or stranded in `SPEAKING` when speech is discarded or runs outside an active live session.

### 4. BUG-M1-04: Standalone Speech Support in `BrowserSpeechEngine.prototype.speak`
- **Files Modified**: `assets/aiCoach/speech.js:939, 1073-1085, 1321-1339`
- **Changes**:
  - `BrowserSpeechEngine.prototype.speak(text, onEnd)` now passes `isStandalone = true` to `this.pipeline.speakCoachResponse(text, onEnd, true)`.
  - `speakCoachResponse` abort guard updated from `!self.isSessionActive` to `(!self.isSessionActive && !isStandalone)`.
  - For synchronous/mock synthesizers where `self.synth.speaking` remains false, queued microtask (`Promise.resolve().then`) invokes `utterance.onend()` immediately after `synth.speak()` without timer race conditions.
  - Added compatibility parameter `isStandalone` to `LiveVoicePipeline.prototype.speak(text, onFinish, isStandalone)`.
- **Result**: `BrowserSpeechEngine.prototype.speak()` plays audio standalone and cleanly fires callbacks without requiring continuous session activation.

### 5. ADV-01: Duplicate Filler Invocation & Queue Cancellation Collision
- **Files Modified**: `assets/aiCoach/speech.js:796`, `index.html:1840-1845`
- **Changes**:
  - Added re-entrancy guard in `LiveVoicePipeline.prototype.speakImmediateAcknowledgment`: `if (!this.synth || !this.isSessionActive || this.isFillerPlaying) return;`.
  - In `index.html` turn completion handler, checked `!voicePipelineRef.current.isFillerPlaying` before triggering acknowledgment filler.
- **Result**: Exactly one filler utterance is created and queued per turn; no cancellation collisions or audio glitches.

### 6. ADV-02: Acoustic Prompt Echo Sanitizer Pure Echo Bypass
- **Files Modified**: `assets/aiCoach/speech.js:636-641`
- **Changes**:
  - In `onSilenceTimeout()` acoustic echo sanitizer, when candidate speech matches coach prompt prefix:
    - If `candWords.length > promptWordCount`: strips prefix and retains student continuation.
    - If `candWords.length <= promptWordCount`: sets `candidate = ''` (pure prompt echo dropped).
- **Result**: Acoustic room echo picked up by open microphone is dropped completely and never dispatched as a student turn.

### 7. ADV-03: Mobile SpeechRecognition Exception Deadlock on `restartListening()`
- **Files Modified**: `assets/aiCoach/speech.js:789-803`
- **Changes**:
  - In `restartListening()` catch block for `recognition.start()` exceptions:
    - Added scheduled retry via `this.restartDebounceTimer = setTimeout(..., 300)` to reinitialize recognition and restart listening once audio hardware clears.
- **Result**: The pipeline automatically recovers from transient mobile recognizer errors rather than deadlocking in `LISTENING` while deaf.

### 8. ADV-04: iOS `unlockMobileAudio()` Primer Utterance GC Anchoring
- **Files Modified**: `assets/aiCoach/speech.js:326-343, 1262`
- **Changes**:
  - In `unlockMobileAudio()`, anchored `primeUtterance` to `window.__masteredActiveUtterance` and `window.__masteredUnlockUtterance`.
  - Added `onend` and `onerror` handlers to release global anchors when playback completes.
  - In `endLiveSession()`, explicitly nullified `window.__masteredUnlockUtterance`.
- **Result**: iOS WebKit speech synthesis queue is protected against premature garbage collection lockups.
