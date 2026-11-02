# Challenger Report & Handoff: Milestone 1 (Natural Voice Synthesis)

**Challenger**: Challenger 1 (Milestone 1 — Natural Voice Synthesis)  
**Parent Agent**: `4f9e4f55-d34b-495c-91cd-1f28c4210a04`  
**Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m1_1\`  
**Date**: November 2, 2026  
**Final Verdict**: **REQUEST_CHANGES**

---

## 1. Observation

Direct observations from code inspection and execution of empirical adversarial test suites (`scratch/test_adversarial_voice_m1.cjs` and `scratch/test_voice_challenger_audit.cjs`):

### 1.1 Verified Strengths in Worker's Implementation
1. **Word-Boundary & Female Guards**:
   `isMaleVoice()` in `assets/aiCoach/speech.js:116-131` successfully rejects male voices while preventing false-positive collisions on `"Danielle"`, `"Tamale"`, `"Maleficent"`, `"Pauline"`, `"Erica"`, `"Georgia"`, `"Brianne"`, and `"Tomoko"`. Substring `"female"` in `"Google UK English Female"` and `"Samsung English Female"` is cleanly preserved via line 121 guard:
   ```javascript
   if (text.indexOf('female') !== -1 || text.indexOf('woman') !== -1 || text.indexOf('girl') !== -1) return false;
   ```
2. **Multi-Tier Heuristic Voice Selection**:
   `getCoachFemaleVoice()` in `assets/aiCoach/speech.js:134-219` correctly selects `Microsoft Jenny Online (Natural)` on Edge, `Google US English` on Chrome, `Ava (Enhanced)` on iOS Safari, and `en-us-x-sfg-network` on Android.
3. **Conversational Pitch and Cadence**:
   All hardcoded pitch settings (`1.20`, `1.25`, `1.30`) were reset to `1.0`. Default speech rate is set to `0.96`.
4. **Active Turn-Taking & Echo Drain Cooldown**:
   In active live sessions, smooth filler queuing (`pendingCoachResponse`) and echo drain cooldown (`speakerCooldownUntil = Date.now() + 400`) prevent mid-word clipping.

---

### 1.2 Empirically Confirmed Failure Modes (Bugs)

#### BUG-M1-01: Sparse / Null Voice Array Uncaught TypeError in `getCoachFemaleVoice`
- **Location**: `assets/aiCoach/speech.js:139-144` and `assets/aiCoach/speech.js:150-155`
- **Verbatim Error**:
  ```
  TypeError: Cannot read properties of null (reading 'lang')
      at assets/aiCoach/speech.js:140:15
  ```
- **Code Observation**:
  ```javascript
  136: var voices = synth.getVoices() || [];
  137: if (!voices || voices.length === 0) return null;
  138: 
  139: var enVoices = voices.filter(function (v) {
  140:   var l = (v.lang || '').toLowerCase().replace(/_/g, '-');
  141:   return l.indexOf('en') === 0;
  142: });
  ```
  If `synth.getVoices()` returns an array with a `null` or `undefined` entry (common with sparse voice lists or certain mobile webviews/extensions), `v.lang` throws an unhandled `TypeError` that crashes voice selection completely rather than filtering invalid entries. Furthermore, `scoreVoice(v)` directly accesses `v.name`, `v.voiceURI`, and `v.lang` without checking `if (!v)`.

#### BUG-M1-02: `speakCoachResponse("")` (Empty/Whitespace Text) in Inactive/IDLE State Leaks State to `LISTENING`
- **Location**: `assets/aiCoach/speech.js:859-865`
- **Verbatim Error**:
  ```
  [LiveVoicePipeline] Invalid state transition from IDLE to LISTENING
  ```
- **Code Observation**:
  ```javascript
  859: if (!text || !text.trim()) {
  860:   this.isSpeaking = false;
  861:   this.transitionTo(STATES.LISTENING);
  862:   this.restartListening();
  863:   if (onFinish) onFinish();
  864:   return;
  865: }
  ```
  When `speakCoachResponse` is called with empty text (e.g. `""` or `" "`) while `isSessionActive` is `false` (e.g. before call begins or after call ends), it unconditionally forces `this.transitionTo(STATES.LISTENING)` and calls `this.restartListening()`, attempting to boot microphone capture while the session is not running.

#### BUG-M1-03: `speakCoachResponse(text)` in Inactive Session Leaves Pipeline State Stuck in `SPEAKING`
- **Location**: `assets/aiCoach/speech.js:876` and `assets/aiCoach/speech.js:907-910`
- **Observed Behavior**:
  ```javascript
  const pipeline = new LiveVoicePipeline(); // state: IDLE, isSessionActive: false
  pipeline.speakCoachResponse("Late reply");
  // 80ms later:
  console.log(pipeline.state); // -> "SPEAKING"
  pipeline.transitionTo(STATES.INITIALIZING);
  // -> [LiveVoicePipeline] Invalid state transition from SPEAKING to INITIALIZING
  ```
- **Code Observation**:
  ```javascript
  876: this.transitionTo(STATES.SPEAKING);
  ...
  905: this.speakDispatchTimer = setTimeout(function () {
  906:   self.speakDispatchTimer = null;
  907:   if (!self.isSessionActive || self.state === STATES.ENDING || self.state === STATES.IDLE) {
  908:     self.isSpeaking = false;
  909:     return;
  910:   }
  ```
  Line 876 sets `this.state = 'SPEAKING'` before checking `this.isSessionActive`. When the 80ms timer fires, it detects `!self.isSessionActive` and aborts speech, but **never resets `self.state` back to `IDLE`** and **never calls `onFinish()`**. The state remains permanently trapped in `SPEAKING`. When the student later initiates a live call, `startLiveSession()` attempts to transition `SPEAKING -> INITIALIZING`, triggering an invalid state transition error and firing `onError`.

#### BUG-M1-04: `BrowserSpeechEngine.prototype.speak()` Never Speaks Because `isSessionActive` is False
- **Location**: `assets/aiCoach/speech.js:907-910` and `assets/aiCoach/speech.js:1263-1265`
- **Code Observation**:
  ```javascript
  1249: function BrowserSpeechEngine(options) {
  1250:   this.pipeline = new LiveVoicePipeline(options);
  1251: }
  ...
  1263: BrowserSpeechEngine.prototype.speak = function (text, onEnd) {
  1264:   this.pipeline.speakCoachResponse(text, onEnd);
  1265: };
  ```
  `BrowserSpeechEngine` is exported as the backward-compatible speech engine for standalone text-to-speech. However, because `this.pipeline.isSessionActive` defaults to `false` (until `startListening()` is called), calling `engine.speak('text', callback)` triggers the abort condition in `speakDispatchTimer` (line 907). `synth.speak()` is **never called**, `onEnd` is **never called**, and `spokenUtterances.length === 0`. The public `BrowserSpeechEngine.speak()` method is completely inoperative.

---

## 2. Logic Chain

1. **Step 1**: `assets/aiCoach/speech.js` exports two key interfaces: `LiveVoicePipeline` (for continuous interactive voice practice) and `BrowserSpeechEngine` (the public wrapper for discrete speech synthesis).
2. **Step 2**: In `getCoachFemaleVoice()`, `synth.getVoices()` is assumed to contain only valid object references. If a browser returns a sparse array or an array containing null/undefined, accessing `.lang` and `.name` without validation causes an unhandled `TypeError` (Observation 1.2, BUG-M1-01).
3. **Step 3**: `speakCoachResponse()` does not guard against execution when `!this.isSessionActive`. 
   - If called with empty text in `IDLE`, lines 859-865 illegally transition the pipeline to `LISTENING` and launch `restartListening()`.
   - If called with non-empty text when inactive (e.g., late asynchronous Gemini turn arriving after call ended, or standalone TTS invocation), line 876 mutates state to `SPEAKING`, and line 907 aborts speech without resetting state to `IDLE` or invoking callbacks.
4. **Step 4**: As a direct consequence of Step 3, `BrowserSpeechEngine.prototype.speak()` is incapable of speaking any text because its internal pipeline has `isSessionActive === false`.
5. **Step 5**: Therefore, while the core voice selection heuristics and formant pitch adjustments are sound, the speech pipeline exhibits state corruption and API breakdown under edge conditions and standalone invocations.

---

## 3. Caveats

- **Active Call In-Session Path**: During a standard, active live call where `isSessionActive === true` and network replies arrive promptly, speech synthesis executes cleanly with natural pitch `1.0` and speed `0.96`.
- **Browser-Specific Voice Manifests**: Voice scoring was validated against simulated native inventories across Edge, Chrome, Safari, and Android. Physical audio hardware device latency (e.g. Bluetooth A2DP profile switching delays) was not tested on physical hardware.

---

## 4. Conclusion

**Verdict: REQUEST_CHANGES**

Worker M1 Generation 2 implemented substantial improvements to voice selection heuristics, eliminated male voice collisions on female names, and restored natural pitch and cadence. However, empirical stress testing has revealed 4 reproducible defects that destabilize the state machine and disable the `BrowserSpeechEngine.speak()` API.

### Required Changes for Worker M1:
1. **Defend `getCoachFemaleVoice` against sparse/null voice entries**:
   Filter out falsy items first: `voices = voices.filter(Boolean);`, and guard `scoreVoice(v)` with `if (!v) return -9999;`.
2. **Handle inactive session / empty text safely in `speakCoachResponse`**:
   - If `!text || !text.trim()`:
     ```javascript
     if (!text || !text.trim()) {
       this.isSpeaking = false;
       if (this.isSessionActive) {
         this.transitionTo(STATES.LISTENING);
         this.restartListening();
       }
       if (onFinish) onFinish();
       return;
     }
     ```
   - At the beginning of `speakCoachResponse`:
     Distinguish between a live call session and standalone speech playback (or if session is ended and inactive, cleanly invoke `if (onFinish) onFinish(); return;` without mutating `this.state` to `SPEAKING`).
3. **Allow standalone speech playback in `BrowserSpeechEngine.prototype.speak`**:
   Ensure `this.synth.speak()` can be executed for standalone playback without requiring `this.isSessionActive === true`.

---

## 5. Verification Method

To reproduce and verify these findings independently, run the dedicated challenger audit suite:

```powershell
node scratch/test_voice_challenger_audit.cjs
```

**Expected output confirming the 4 bugs**:
```
[CONFIRMED BUG 1] getCoachFemaleVoice crashes on null/sparse voice entry:
                 Error: Cannot read properties of null (reading 'lang')
[LiveVoicePipeline] Invalid state transition from IDLE to LISTENING
[CONFIRMED BUG 2] speakCoachResponse("   ") while IDLE mutates pipeline.state to LISTENING
[CONFIRMED BUG 3] speakCoachResponse(text) while session is inactive leaves state stuck in SPEAKING
[CONFIRMED BUG 4] BrowserSpeechEngine.prototype.speak() failed to speak or trigger callback
                 Spoken: false, Callback Called: false

======================================================================
CHALLENGER AUDIT COMPLETE: 4 CONFIRMED BUGS IDENTIFIED
======================================================================
```

**Invalidation Condition**:
If `node scratch/test_voice_challenger_audit.cjs` exits with 0 confirmed bugs and all standalone speech, sparse arrays, and inactive pipeline calls operate without state leakage or uncaught errors, this challenge is invalidated and the verdict transitions to `APPROVE`.
