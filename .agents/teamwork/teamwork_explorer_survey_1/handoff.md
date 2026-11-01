# Survey Report: Requirement R1 — Clean End Call Lifecycle in Speaking Room

## 1. Observation

### 1.1 Speaking Room Architecture & Deployment Model
The web application is deployed directly via Vercel (`vercel.json`) serving `index.html` as a standalone single-page React 18 application transpiled in-browser with Babel Standalone. The speaking room architecture is partitioned across four primary source files:
- **`index.html`** (lines 1512–2580): Contains the React speaking room component (`AiMissionPromptModal`), managing UI state (`voiceState`, `callDuration`, `voiceVerifiedCount`, `voiceSessionEnded`, `voiceSessionSummary`), user interaction buttons, timer effects, and speech pipeline orchestration.
- **`assets/aiCoach/speech.js`** (1,061 lines): Defines `LiveVoicePipeline`, which implements the 12-state conversation machine (`IDLE`, `INITIALIZING`, `REQUESTING_MICROPHONE`, `LISTENING`, `PROCESSING_SPEECH`, `GENERATING_RESPONSE`, `SPEAKING`, `INTERRUPTED`, `PAUSED`, `RECOVERING`, `ENDING`, `ERROR`), Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`), `window.speechSynthesis` queue and audio playback, and Web Audio API (`AudioContext` and `AnalyserNode`).
- **`assets/aiCoach/engine.js`** (2,219 lines): Defines `AiCoachSession`, managing mission dialogue progression, curriculum rules, grammar evaluation, turn tracking, and session completion metrics.
- **`assets/aiCoach/ui.js`** (637 lines): Standalone reference speaking room component (`MasteredAiCoachSpeakingRoom`), not directly invoked by `index.html`.

---

### 1.2 Exact Observations & Verbatim Errors in `index.html`

#### A. The End Call Button Event Binding
In `index.html`, lines 2424–2434:
```jsx
2424:                         <button
2425:                           type="button"
2426:                           onClick={() => {
2427:                             handleVoiceCommand('END SESSION');
2428:                           }}
2429:                           className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-1 cursor-pointer"
2430:                           title="End current call"
2431:                         >
2432:                           <span>🔴</span>
2433:                           <span>End Call</span>
2434:                         </button>
```

#### B. The Broken `handleVoiceCommand` Handler
In `index.html`, lines 2011–2039:
```javascript
2011:       const handleVoiceCommand = (cmd) => {
2012:         const session = voiceSessionRef.current;
2013:         if (!session) return;
2014:         const reply = session.executeCommand(cmd);
2015: 
2016:         if (cmd === 'END SESSION') {
2017:           if (voicePipelineRef.current) {
2018:             voicePipelineRef.current.endLiveSession();
2019:           }
2020:           const rep = session.generateDailyReport();
2021:           setVoiceSessionSummary(rep);
2022:           setVoiceSessionEnded(true);
2023:           return;
2024:         }
...
```

#### C. Verbatim Method Absence on `AiCoachSession` (`engine.js`)
Direct Node.js execution against `assets/aiCoach/engine.js`:
```powershell
node -e "require('./assets/aiCoach/engine.js'); const s = new globalThis.MasteredAiCoachEngine.AiCoachSession({ admissionNumber: 'MTR777', currentMission: 1 }); s.executeCommand('END SESSION');"
```
**Verbatim Output**:
```
TypeError: s.executeCommand is not a function
```

```powershell
node -e "require('./assets/aiCoach/engine.js'); const s = new globalThis.MasteredAiCoachEngine.AiCoachSession({ admissionNumber: 'MTR777', currentMission: 1 }); s.generateDailyReport();"
```
**Verbatim Output**:
```
TypeError: s.generateDailyReport is not a function
```

In `assets/aiCoach/engine.js`:
- Line 1207 defines `AiCoachSession.prototype.dispatchCommand = function (userInput) { ... }` (lines 1276–1278: `if (cmd === 'END SESSION') { return this.endSession(); }`).
- Line 2167 defines `AiCoachSession.prototype.endSession = function () { ... return { command: 'END SESSION', summary: summary, message: "..." }; }`.
- Method names `executeCommand` and `generateDailyReport` do **not** exist anywhere on `AiCoachSession.prototype`.

#### D. Global Window Error Silencing Masking the Crash
In `index.html`, lines 58–61:
```javascript
58:   <script>
59:     window.onerror = function(msg, url, lineNo, columnNo, error) {
60:       console.error("Diagnostic Caught:", msg, url, lineNo, error);
61:       return true;
62:     };
63:   </script>
```
Because line 61 returns `true`, the browser swallows the `TypeError` caused by `session.executeCommand(cmd)`. No unhandled error dialog or toast appears; execution aborts midway, leaving the user with a completely non-responsive End Call button.

#### E. Secondary Triggers for `handleVoiceCommand`
- Line 1926: `onIntentDetected: (intent, text) => { ... else if (intent === 'END_SESSION') { handleVoiceCommand('END SESSION'); } }`
- Lines 2496–2498: "Free Talk", "Vocab", and "Homework" buttons all invoke `handleVoiceCommand` and similarly fail due to missing `executeCommand`.

---

### 1.3 Exact Observations in `assets/aiCoach/speech.js`

#### A. Incomplete Teardown in `endLiveSession`
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

1. **`this.speechKeepAliveInterval` is NEVER cleared**:
   Line 834:
   ```javascript
   self.speechKeepAliveInterval = setInterval(function () {
     if (self.synth && self.synth.speaking && !self.synth.paused) {
       self.synth.pause();
       self.synth.resume();
     }
   }, 5000);
   ```
   If a call is ended during or immediately after speech synthesis, this 5000ms recurring timer runs indefinitely in the background.

2. **`this.speakSafetyTimer` is NEVER cleared**:
   Line 827:
   ```javascript
   self.speakSafetyTimer = setTimeout(function () {
     finishSpeech();
   }, timeoutMs);
   ```
   If not cleared, `finishSpeech()` executes after the call is ended, changing `self.state` back to `LISTENING` and calling `restartListening()`.

3. **`this.restartDebounceTimer` is NEVER cleared**:
   Line 690:
   ```javascript
   this.restartDebounceTimer = setTimeout(function () {
     self.restartListening();
   }, minGap - (now - self.lastStartAttempt));
   ```
   If a debounce was scheduled, it fires after `endLiveSession()` and resurrects `SpeechRecognition`.

4. **Speech initiation dispatch timeout (80ms) and Chrome Watchdog (150ms) are anonymous and un-cleared**:
   Line 753: `setTimeout(function () { ... self.synth.speak(utterance); ... }, 80);`
   Line 874: `setTimeout(function () { if (self.isSpeaking && self.synth && !self.synth.speaking) { try { self.synth.resume(); } catch (e) {} } }, 150);`
   Neither timeout checks `this.isSessionActive`, and neither timeout handle is tracked or cancelled in `endLiveSession()`. If `endLiveSession()` is called within 80ms of `speakCoachResponse()`, `synth.speak()` fires **after** `synth.cancel()`.

5. **`this.recognition.stop()` vs `this.recognition.abort()`**:
   Line 977 calls `this.recognition.stop()`. In the W3C Web Speech API specification, `stop()` stops audio capture but continues processing buffered audio, triggering deferred `onresult` and `onend` events. `abort()` halts capture and discards all pending audio immediately.
   Furthermore, event listeners (`onstart`, `onresult`, `onerror`, `onend`) are not decoupled or nullified, and `this.recognition` is not set to `null`.

6. **Global Utterance Queue Not Reset**:
   Lines 785–788 assign `window.__masteredUtteranceQueue` and `window.__masteredActiveUtterance`, which are never reset upon `endLiveSession()`.

7. **Audio Level Not Zeroed**:
   `this.onAudioLevel(0)` is never emitted, which can leave visualizer bars frozen at mid-level heights.

#### B. State Transition Restrictions in `VALID_TRANSITIONS`
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
Notice:
- `INTERRUPTED` does not include `'ENDING'`.
- `RECOVERING` does not include `'ENDING'`.
- `INITIALIZING` does not include `'ENDING'`.
- `REQUESTING_MICROPHONE` does not include `'ENDING'`.
- `ERROR` does not include `'ENDING'`.
If the user clicks "End Call" while Coach Sarah was interrupted or while the mic is recovering, `this.transitionTo(STATES.ENDING)` fails with:
`[LiveVoicePipeline] Invalid state transition from INTERRUPTED to ENDING`.

#### C. Late Result Guard in `handleSpeechResult` & `handleSpeechEnd`
- Line 483: `if (this.state === STATES.PAUSED || this.state === STATES.ENDING) return;`
  Because `endLiveSession()` immediately executes `this.transitionTo(STATES.IDLE)`, `this.state` is `IDLE`. A delayed recognition result is not blocked by line 483 and can re-trigger turn processing.
- Line 946: `if (this.state === STATES.LISTENING && this.isSessionActive)` in `handleSpeechEnd()` should be reinforced with a check on `!this.isSessionActive || this.state === STATES.ENDING || this.state === STATES.IDLE`.

---

### 1.4 State Transitions Upon Ending Call
In `index.html`:
1. **In-Call View Condition**: `voiceState !== 'IDLE' && !voiceSessionEnded` (lines 2253–2436).
2. **Session Summary View Condition**: `voiceSessionEnded && voiceSessionSummary` (lines 2159–2205).
   Currently, the Session Summary view only offers two action buttons:
   - "End Mission & Advance to Next Level" (`handleEndMissionAndContinue`)
   - "Continue Live Call" (`startLiveSession()`)
   It lacks a "Done / Ready to Call" button to return cleanly to the Ready State without forcing the user to advance or resume.
3. **Ready to Call View Condition**: `voiceState === 'IDLE' && !voiceSessionEnded` (lines 2212–2251).
   Displays Coach Sarah avatar, topic starter question, 00:00 duration, and "Start Live Practice Call" button.

---

### 1.5 Scratch Test Scripts Analysis
- **`scratch/test_ai_coach.cjs`**: 23 acceptance tests checking the engine state machine, sentence verification, and commands. Passes 23/23 tests. In Test 20, it calls `session.endSession().summary` directly, which is why it passed while `index.html` failed.
- **`scratch/test_live_call_button.cjs`**: Puppeteer headless Chrome test verifying that "Start Live Practice Call" connects. Successfully connects, but never clicks "End Call".
- **`scratch/test_voice_turn_reply.cjs`**: Puppeteer test verifying speech turn evaluation and coach response.
- **`scratch/test_live_conversation_loop.cjs`**: Node simulation of multi-turn spoken dialogue.

---

## 2. Logic Chain & Root Cause Analysis

### Step 1: The End Call Trigger
The user clicks the red "End Call" button in `index.html` (line 2426). This button executes `onClick={() => { handleVoiceCommand('END SESSION'); }}`.

### Step 2: The Premature Exception
In `handleVoiceCommand` (line 2014), the very first operational statement is:
```javascript
const reply = session.executeCommand(cmd);
```
`AiCoachSession` (in `assets/aiCoach/engine.js`) defines `dispatchCommand()`, not `executeCommand()`. Therefore, `session.executeCommand` evaluates to `undefined`, and invoking it causes a fatal JavaScript `TypeError: session.executeCommand is not a function`.

### Step 3: Global Error Handler Silencing
The browser executes `window.onerror` (lines 58–61 of `index.html`), which prints a diagnostic log and returns `true`. This cancels the default browser error handling, leaving the user with zero visual indication that an unhandled exception occurred.

### Step 4: Complete Pipeline Teardown Bypass
Because line 2014 threw an exception, lines 2016–2024 were **never reached**:
```javascript
if (voicePipelineRef.current) {
  voicePipelineRef.current.endLiveSession(); // NEVER CALLED
}
const rep = session.generateDailyReport();    // NEVER CALLED (and would also throw TypeError)
setVoiceSessionSummary(rep);                 // NEVER CALLED
setVoiceSessionEnded(true);                  // NEVER CALLED
```
As a result:
- The Web Speech `SpeechRecognition` instance remains active, listening and transmitting audio.
- The `window.speechSynthesis` audio queue continues playing.
- The `callDuration` timer (lines 1533–1545) continues ticking upward indefinitely because `voiceState` remains in `LISTENING` or `SPEAKING`.
- `voiceSessionEnded` remains `false`, so the Session Summary view is never mounted.
- The call interface is completely frozen in the active call view.

### Step 5: Latent Leaks in `speech.js` (Secondary Failure Mechanism)
Even when `endLiveSession()` is invoked through other routes (such as `handleEndMissionAndContinue` or component unmount):
- `this.speechKeepAliveInterval` continues executing every 5,000ms.
- `this.speakSafetyTimer` and `this.restartDebounceTimer` continue running and fire `finishSpeech()` or `restartListening()`.
- Pending 80ms speak timeouts fire `synth.speak()` after the call has ended.
- `this.recognition.stop()` does not abort pending speech input and leaves callbacks active.
- `transitionTo('ENDING')` from states like `INTERRUPTED` or `RECOVERING` fails.

---

## 3. Caveats
1. **Development Environment Mock vs Live Browser Speech**: In headless Puppeteer environments without hardware microphones, `SpeechRecognition` requires `--use-fake-ui-for-media-stream` and `--use-fake-device-for-media-stream` flags. In actual Android Chrome and iOS Safari mobile browsers, hardware stream ownership and TTS queue behaviors have slight platform variances that require defensive `try...catch` blocks and `recognition.abort()`.
2. **Read-Only Scope**: In accordance with the dispatch rules, no production files or tests were modified during this investigation. Concrete implementation changes are documented below for subsequent implementation.
3. **Database Sync Scope**: The End Call button itself does not directly trigger backend sync; session verification progress is synced per turn via `syncVoiceProgressToDatabase` (lines 1638–1700 of `index.html`) and when advancing via `handleEndMissionAndContinue`.

---

## 4. Conclusion & Recommended Fix Strategy

### 4.1 Summary Assessment
The failure of the "End Call" button to cleanly terminate calls is caused by a **dual architectural defect**:
1. **Calling non-existent methods on `AiCoachSession`** (`executeCommand` and `generateDailyReport`) inside `index.html`'s `handleVoiceCommand`, which throws a `TypeError` and prevents `endLiveSession()` and React state updates from executing.
2. **Missing timer/resource cleanup in `assets/aiCoach/speech.js`** (`speechKeepAliveInterval`, `speakSafetyTimer`, `restartDebounceTimer`, 80ms dispatch timeout, un-aborted `recognition`), which allows background processes to persist.

---

### 4.2 Recommended Concrete Fix Strategy

#### Fix 1: Refactor `handleEndCall` in `index.html` (Lines 2011–2039 & 2426)
Create an explicit, bulletproof, crash-resistant `handleEndCall` handler that performs unconditional audio shutdown before generating session summaries:

```javascript
      // Dedicated, crash-proof End Call handler
      const handleEndCall = () => {
        // 1. Immediately halt audio pipeline and speech synthesis
        if (voicePipelineRef.current) {
          try {
            voicePipelineRef.current.endLiveSession();
          } catch(e) {
            console.warn("[End Call] Pipeline teardown warning:", e);
          }
        }

        if (typeof window !== 'undefined' && window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
          } catch(e) {}
        }

        // 2. Immediately reset UI visual state
        setVoiceState('IDLE');
        setVoiceAudioLevel(0);
        setCallDuration(0);

        // 3. Retrieve or construct session summary safely
        const session = voiceSessionRef.current;
        let summary = null;
        if (session) {
          try {
            if (typeof session.endSession === 'function') {
              const res = session.endSession();
              summary = res.summary || res;
            } else if (typeof session.generateDailyReport === 'function') {
              summary = session.generateDailyReport();
            } else if (typeof session.dispatchCommand === 'function') {
              const res = session.dispatchCommand('END SESSION');
              summary = res?.summary || res;
            }
          } catch(err) {
            console.warn("[End Call] Session summary warning:", err);
          }
        }

        if (!summary) {
          summary = {
            name: currentUser?.name || 'Student',
            admissionNumber: admNum,
            currentMission: activeMissionNumber,
            verifiedSentences: voiceVerifiedCount,
            missionTarget: missionInfo.targetSentences,
            progressPct: Math.min(100, Math.round((voiceVerifiedCount / missionInfo.targetSentences) * 100))
          };
        }

        setVoiceSessionSummary(summary);
        setVoiceSessionEnded(true);
      };
```
Bind the End Call button (line 2426) directly to `handleEndCall`:
```jsx
<button
  type="button"
  onClick={handleEndCall}
  className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-1 cursor-pointer"
  title="End current call"
>
  <span>🔴</span>
  <span>End Call</span>
</button>
```
Update `handleVoiceCommand` to delegate `'END SESSION'` to `handleEndCall()`, and safely call `dispatchCommand` for other commands (`FREE TALK`, `HOMEWORK`, `VOCABULARY`).

Also add a "Done / Ready to Call" button to the Session Summary card (lines 2182–2205) so students can return to the Ready state without advancing to the next level:
```jsx
<button
  type="button"
  onClick={() => {
    setVoiceSessionEnded(false);
    setVoiceSessionSummary(null);
    setVoiceState('IDLE');
  }}
  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition cursor-pointer"
>
  🔄 Practice Level Again / Ready
</button>
```

#### Fix 2: Add Compatibility Methods in `assets/aiCoach/engine.js` (Around Line 2200)
Add alias methods on `AiCoachSession.prototype` so that any caller invoking `executeCommand` or `generateDailyReport` succeeds:
```javascript
  AiCoachSession.prototype.executeCommand = function (userInput) {
    return this.dispatchCommand(userInput);
  };

  AiCoachSession.prototype.generateDailyReport = function () {
    var res = this.endSession();
    return res.summary;
  };
```

#### Fix 3: Harden Resource Teardown in `assets/aiCoach/speech.js`
1. **Extend `VALID_TRANSITIONS`** (lines 47–60) so `'ENDING'` is allowed from all states:
   - `INITIALIZING`: add `'ENDING'`
   - `REQUESTING_MICROPHONE`: add `'ENDING'`
   - `INTERRUPTED`: add `'ENDING'`
   - `RECOVERING`: add `'ENDING'`
   - `ERROR`: add `'ENDING'`
2. **Track and clear all timeouts and intervals in `endLiveSession()`** (lines 956–995):
   ```javascript
   if (this.speechKeepAliveInterval) {
     clearInterval(this.speechKeepAliveInterval);
     this.speechKeepAliveInterval = null;
   }
   if (this.speakSafetyTimer) {
     clearTimeout(this.speakSafetyTimer);
     this.speakSafetyTimer = null;
   }
   if (this.restartDebounceTimer) {
     clearTimeout(this.restartDebounceTimer);
     this.restartDebounceTimer = null;
   }
   if (this.speakDispatchTimer) {
     clearTimeout(this.speakDispatchTimer);
     this.speakDispatchTimer = null;
   }
   if (this.speakWatchdogTimer) {
     clearTimeout(this.speakWatchdogTimer);
     this.speakWatchdogTimer = null;
   }
   if (this.activeUtterance) {
     this.activeUtterance.onstart = null;
     this.activeUtterance.onend = null;
     this.activeUtterance.onerror = null;
     this.activeUtterance = null;
   }
   if (typeof window !== 'undefined') {
     window.__masteredUtteranceQueue = [];
     window.__masteredActiveUtterance = null;
   }
   if (this.recognition) {
     try {
       this.recognition.onstart = null;
       this.recognition.onresult = null;
       this.recognition.onerror = null;
       this.recognition.onend = null;
       if (typeof this.recognition.abort === 'function') {
         this.recognition.abort();
       } else {
         this.recognition.stop();
       }
     } catch (e) {}
     this.recognition = null;
   }
   if (this.onAudioLevel) {
     try { this.onAudioLevel(0); } catch (e) {}
   }
   ```
3. **Guard `handleSpeechResult` and `handleSpeechEnd`**:
   Check `if (!this.isSessionActive || this.state === STATES.ENDING || this.state === STATES.IDLE || this.state === STATES.PAUSED) return;`.

---

## 5. Verification Method

### 5.1 Unit Verification of Engine & Speech API
Run the existing test suite:
```powershell
node scratch/test_ai_coach.cjs
```
Verify that `AiCoachSession.executeCommand('END SESSION')` and `generateDailyReport()` return valid summaries without errors:
```powershell
node -e "require('./assets/aiCoach/engine.js'); const s = new globalThis.MasteredAiCoachEngine.AiCoachSession({ admissionNumber: 'MTR777', currentMission: 1 }); const rep = s.generateDailyReport(); console.log(rep.admissionNumber, rep.currentMission);"
```

### 5.2 Automated End Call Lifecycle Integration Test
Construct an automated Puppeteer test script (`scratch/test_end_call_lifecycle.cjs`):
1. Launch Chrome with headless flags (`--enable-speech-api`, `--use-fake-ui-for-media-stream`, `--use-fake-device-for-media-stream`).
2. Serve `index.html` on local port 8098.
3. Inject active student session (`activeTab: 'ai_coach'`).
4. Click "Start Live Practice Call (Coach Sarah)".
5. Wait for call connection and greeting playback (`isSessionActive === true`, `voiceState === 'LISTENING'` or `'SPEAKING'`).
6. Click the red "End Call" button (`document.querySelector('button[title="End current call"]').click()`).
7. Assert within 500ms:
   - `window.speechSynthesis.speaking` is `false`.
   - `window.__masteredActivePipeline.isSessionActive` is `false`.
   - `window.__masteredActivePipeline.state` is `'IDLE'`.
   - DOM displays "Daily Session Completed!" or the session summary card with student admission ID and verified count.
   - Call duration timer is halted (no longer incrementing).
   - Audio level is 0.
8. Click "Practice Level Again / Ready" button:
   - Assert interface transitions back to the "Ready to Call" card with `voiceState === 'IDLE'`, 00:00 duration, and no lingering speech or media streams.

### 5.3 Invalidation Conditions
The fix is considered invalidated if:
- Clicking "End Call" leaves `isSessionActive === true`.
- Any audio synthesis continues playing after the button click.
- The UI stays in the active call view instead of transitioning to the summary card or ready state.
- An unhandled `TypeError` is logged in the console.
- Ongoing `setInterval` or `setTimeout` processes continue executing in the background after call termination.
