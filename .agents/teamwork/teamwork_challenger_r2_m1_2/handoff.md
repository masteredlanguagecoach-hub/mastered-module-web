# Handoff Report: Empirical Challenge of Natural Voice Synthesis Resilience

**Agent**: Challenger 2 (Milestone 1 — Natural Voice Synthesis)  
**Parent Agent**: `4f9e4f55-d34b-495c-91cd-1f28c4210a04`  
**Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m1_2\`  
**Date**: November 2, 2026  
**Handoff Type**: Hard (Challenge Evaluation Complete)  
**Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

Direct empirical observations and execution results from testing the speech synthesis pipeline across `assets/aiCoach/speech.js` and `index.html`:

### 1.1 Baseline Test Verification
- Executed Worker M1 test suite `node scratch/test_voice_natural_selector.cjs`: 10/10 tests passed (100%).
- Executed existing suites `node scratch/test_ai_coach.cjs`, `node scratch/test_female_selector.cjs`, `node scratch/test_connected_conversation.cjs`, `node scratch/test_mission_advance_and_continuity.cjs`: all passed.
- Developed `scratch/test_resilience_empirical.cjs` (13 tests verifying lifecycle teardown, 400ms echo cooldown, barge-in aborts, Android decoupled getUserMedia, and 100-turn stress test): 13/13 passed.

### 1.2 Vulnerability ADV-01: Duplicate Filler Invocation & Queue Cancellation Collision
- **Location**: `assets/aiCoach/speech.js:660`, `index.html:1841`, and `assets/aiCoach/speech.js:773-792`.
- **Observation**:
  In `speech.js:660`:
  ```javascript
  // Complete Student Spoken Turn
  var turnUtterance = candidate;
  this.accumulatedTranscript = '';
  this.latestInterim = '';

  // Spoken conversational acknowledgment filler (<300ms perceived response)
  this.speakImmediateAcknowledgment();

  if (this.onStudentTurnComplete) {
    this.onStudentTurnComplete({ ... });
  }
  ```
  In `index.html:1841`:
  ```javascript
  // Instant filler acknowledgment in Coach Sarah's voice while AI generates response
  if (voicePipelineRef.current && typeof voicePipelineRef.current.speakImmediateAcknowledgment === 'function') {
    voicePipelineRef.current.speakImmediateAcknowledgment();
  } else {
    speakImmediateFiller();
  }
  ```
  In `speech.js:773`:
  ```javascript
  LiveVoicePipeline.prototype.speakImmediateAcknowledgment = function () {
    if (!this.synth || !this.isSessionActive) return;
  ```
  `speakImmediateAcknowledgment` does NOT guard `if (this.isFillerPlaying) return;`.
- **Empirical Execution**:
  When tested in `scratch/test_adversarial_voice_edge_cases.cjs` (Challenge 1):
  - On turn completion, both `speech.js:660` and `index.html:1841` fire `speakImmediateAcknowledgment()` within 1ms.
  - Two distinct fillers (e.g. `"Got it!"` and `"Interesting!"`) are queued into `window.speechSynthesis`.
  - While Filler 1 is speaking, the AI coach response arrives and parks in `pendingCoachResponse`.
  - Upon Filler 1 `onend`, `completeFiller` invokes `speakCoachResponse(pending.text)`.
  - `speakCoachResponse` calls `synth.cancel()` (line 892), which forcibly aborts Filler 2 mid-speech with audio pops and WebKit error events.

### 1.3 Vulnerability ADV-02: Acoustic Prompt Echo Sanitizer Pure Echo Bypass
- **Location**: `assets/aiCoach/speech.js:610-620`.
- **Observation**:
  ```javascript
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
  ```
- **Empirical Execution**:
  When tested in `scratch/test_adversarial_voice_edge_cases.cjs` (Challenge 2):
  - Coach speaks: `"What did you do during your holiday vacation?"` (7 words).
  - Student is silent, but microphone picks up the physical room echo of Coach Sarah's prompt after the 400ms cooldown window.
  - `candWords.length` is 7. `promptWordCount` is 7.
  - The condition `if (candWords.length > promptWordCount)` evaluates to `false` because `7 > 7` is false.
  - `candidate` is NOT cleared and remains `"What did you do during your holiday vacation?"`.
  - `onSilenceTimeout()` treats the echo as a student response and dispatches `onStudentTurnComplete` with the coach's own prompt text, causing Coach Sarah to evaluate and respond to her own echo in an infinite loop.

### 1.4 Vulnerability ADV-03: Mobile SpeechRecognition Exception Deadlock on `restartListening()`
- **Location**: `assets/aiCoach/speech.js:764-769`.
- **Observation**:
  ```javascript
  try {
    this.accumulatedTranscript = '';
    this.recognition.start();
  } catch (e) {
    this.isStarting = false;
  }
  ```
- **Empirical Execution**:
  When tested in `scratch/test_adversarial_voice_edge_cases.cjs` (Challenge 3):
  - On mobile Chrome / Android, calling `recognition.start()` before the native audio hardware has completed release throws `InvalidStateError: recognition has already started`.
  - The `catch (e)` block sets `this.isStarting = false` but schedules no retry timer and does not re-initialize the recognition instance.
  - State remains `STATES.LISTENING` while `isListening = false` and `isStarting = false`. No event listeners fire, permanently deadlocking the voice listening loop until the user manually toggles Pause or End Call.

### 1.5 Vulnerability ADV-04: iOS `unlockMobileAudio()` Primer Utterance Lacks GC Anchor
- **Location**: `assets/aiCoach/speech.js:320-327`.
- **Observation**:
  ```javascript
  if (isIOS) {
    // iOS WebKit requires an utterance inside user gesture to allow subsequent async speaks
    var primeUtterance = new window.SpeechSynthesisUtterance(' ');
    primeUtterance.volume = 0.01;
    primeUtterance.rate = 10;
    this.synth.speak(primeUtterance);
  }
  ```
- **Empirical Execution**:
  When tested in `scratch/test_adversarial_voice_edge_cases.cjs` (Challenge 4):
  - `primeUtterance` is allocated as a local variable.
  - It is neither assigned to `window.__masteredActiveUtterance` nor pushed to `window.__masteredUtteranceQueue`.
  - On iOS WebKit, unanchored utterances in `SpeechSynthesis` are vulnerable to JavaScriptCore garbage collection mid-speech (Chromium Issue 26382 / WebKit Bug 213824), which locks up WebKit's speech synthesis IPC queue.

---

## 2. Logic Chain

1. **Premise 1 (Filler Coordination)**: An acknowledgment filler should speak immediately to provide perceived low-latency interaction, but must never play in duplicate or be abruptly clipped by the coach response. In the current implementation, `speakImmediateAcknowledgment()` is invoked both inside `speech.js` and `index.html`, and lacks a re-entrancy guard. This leads to two queued fillers and causes `speakCoachResponse()` to abort the second filler with `synth.cancel()`.
2. **Premise 2 (Acoustic Echo Rejection)**: When a microphone picks up the speaker output, it can be either a mixed utterance (echo + student answer) or a pure echo (echo only). The current echo sanitizer only handles mixed utterances (`candWords.length > promptWordCount`). When pure echo occurs (`candWords.length <= promptWordCount`), the text is preserved unmodified, triggering unintended turns.
3. **Premise 3 (Mobile Recognizer Resilience)**: Native speech recognizers on mobile frequently throw transient errors on `start()`. Catching the error without scheduling an exponential backoff retry leaves the pipeline permanently deaf in `STATES.LISTENING`.
4. **Premise 4 (GC Anchoring on iOS)**: iOS WebKit requires that all utterances dispatched to `speechSynthesis.speak()` remain rooted in the global JavaScript scope until `onend` or `onerror` fires to avoid internal WebKit queue corruption.
5. **Conclusion**: While the core voice synthesis selection and multi-tier heuristics are high quality, the 4 identified edge cases compromise mobile and desktop speech synthesis resilience under continuous practice. A verdict of **REQUEST_CHANGES** is required.

---

## 3. Caveats

- **Hardware Speaker Reverberation**: In quiet rooms or when using headphones, acoustic echo does not trigger `ADV-02`. However, in open-speaker laptop or mobile environments, physical reverberation will trigger the loopback bug.
- **Chrome Engine Timing**: On fast desktop machines, `recognition.start()` rarely throws `InvalidStateError`. This is primarily observed on mobile devices (Android Chrome) with constrained audio hardware.
- **Voice Quality**: The voice selection logic (`getCoachFemaleVoice`) and audio parameters (`pitch = 1.0`, `rate = 0.96`) are thoroughly verified and work exceptionally well. The requested changes focus strictly on lifecycle resilience, queuing, and echo protection.

---

## 4. Conclusion & Required Changes

**Verdict**: **REQUEST_CHANGES**

The following concrete, targeted fixes are required in `assets/aiCoach/speech.js` and `index.html`:

### Required Fix 1: Add Re-Entrancy Guard to `speakImmediateAcknowledgment()` & Clean Duplicate Call in `index.html`
- In `assets/aiCoach/speech.js:773`:
  ```javascript
  LiveVoicePipeline.prototype.speakImmediateAcknowledgment = function () {
    if (!this.synth || !this.isSessionActive || this.isFillerPlaying) return;
  ```
- In `index.html:1840-1845`:
  Ensure `speakImmediateAcknowledgment()` is only called once per student turn (e.g. relying on `speech.js` line 660, or guarding in `index.html`).

### Required Fix 2: Handle Pure Prompt Echo in Acoustic Echo Sanitizer
- In `assets/aiCoach/speech.js:616-620`:
  ```javascript
  if (candWords.length > promptWordCount) {
    candidate = candWords.slice(promptWordCount).join(' ').trim();
  } else {
    // Pure echo of coach prompt: drop completely
    candidate = '';
  }
  ```

### Required Fix 3: Implement Mobile Recognizer Restart Retry on Exception
- In `assets/aiCoach/speech.js:767-769`:
  ```javascript
  } catch (e) {
    this.isStarting = false;
    var self = this;
    setTimeout(function () {
      if (self.state === STATES.LISTENING && self.isSessionActive && !self.isListening) {
        self.initSpeechRecognition();
        self.restartListening();
      }
    }, 500);
  }
  ```

### Required Fix 4: Anchor iOS Primer Utterance in `unlockMobileAudio()`
- In `assets/aiCoach/speech.js:322-326`:
  ```javascript
  var primeUtterance = new window.SpeechSynthesisUtterance(' ');
  primeUtterance.volume = 0.01;
  primeUtterance.rate = 10;
  if (typeof window !== 'undefined') {
    window.__masteredActiveUtterance = primeUtterance;
  }
  primeUtterance.onend = function () {
    if (typeof window !== 'undefined' && window.__masteredActiveUtterance === primeUtterance) {
      window.__masteredActiveUtterance = null;
    }
  };
  primeUtterance.onerror = primeUtterance.onend;
  this.synth.speak(primeUtterance);
  ```

---

## 5. Verification Method

To independently reproduce the findings and verify future fixes, run the following test commands from the project root:

```powershell
# 1. Run the adversarial stress test suite to observe the 4 vulnerabilities:
node scratch/test_adversarial_voice_edge_cases.cjs

# 2. Run the empirical resilience harness:
node scratch/test_resilience_empirical.cjs

# 3. Run the natural voice selector verification suite:
node scratch/test_voice_natural_selector.cjs

# 4. Run the full continuous speaking test suite:
node scratch/test_ai_coach.cjs
```

**Invalidation Conditions**:
- If `node scratch/test_adversarial_voice_edge_cases.cjs` reports 0 vulnerabilities and exits with code 0, all 4 challenges have been successfully resolved.
