# Milestone 1 Exploration Report: Clean End Call Lifecycle in Speaking Room

**Author**: `teamwork_explorer_m1_1`  
**Milestone**: Milestone 1 (F1, F2, F3, F4, F5)  
**Target Files**: `index.html`, `assets/aiCoach/speech.js`, `assets/aiCoach/engine.js`  
**Status**: Ready for Worker Implementation  

---

## 1. Observation

### 1.1 Speaking Room Component Structure in `index.html`
- **Location**: `index.html`, lines 1512–2580 (`function AiMissionPromptModal(...)`).
- **State Hooks**:
  - `voiceState`: `'IDLE' | 'INITIALIZING' | 'REQUESTING_MICROPHONE' | 'LISTENING' | 'SPEAKING' | 'PAUSED' | 'ERROR' | 'ENDING'` (line 1516).
  - `callDuration`: Elapsed seconds of active call (line 1531), driven by `useEffect` at lines 1533–1545.
  - `voiceAudioLevel`: Dynamic microphone visualizer amplitude (line 1517).
  - `voiceTranscript`: Real-time spoken transcript string (line 1514).
  - `voiceSessionEnded`: Boolean flag controlling whether Session Summary modal view is shown (line 1521).
  - `voiceSessionSummary`: Object containing session metrics (`name`, `admissionNumber`, `currentMission`, `verifiedSentences`, `missionTarget`, `progressPct`, `sessionEndedAt`) (line 1522).
  - `voicePipelineRef`: Ref to `LiveVoicePipeline` instance (line 1528).
  - `voiceSessionRef`: Ref to `AiCoachSession` instance (line 1527).

### 1.2 Current State of End Call Button and Handlers in `index.html`
- **End Call Button Event Handler** (lines 2482–2492):
  ```jsx
  2482: <button
  2483:   type="button"
  2484:   onClick={() => {
  2485:     handleVoiceCommand('END SESSION');
  2486:   }}
  2487:   className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-1 cursor-pointer"
  2488:   title="End current call"
  2489: >
  2490:   <span>🔴</span>
  2491:   <span>End Call</span>
  2492: </button>
  ```
- **Spoken Intent Handler** (line 1926):
  ```javascript
  1925: } else if (intent === 'END_SESSION') {
  1926:   handleVoiceCommand('END SESSION');
  1927: }
  ```
- **`handleVoiceCommand` Implementation** (lines 2011–2098):
  - Inlines `'END SESSION'` inside a generic command dispatcher.
  - Does NOT call `window.speechSynthesis.cancel()`.
  - Does NOT call `setCallDuration(0)` or `setVoiceAudioLevel(0)`.
  - Does NOT reset `voiceTranscript`.
  - Calls `syncVoiceProgressToDatabase` with an ad-hoc object instead of passing `voiceSessionRef.current.getProfile()`.
  - Does not type-check non-string replies from `session.dispatchCommand(cmd)` (`FREE TALK`, `VOCABULARY`, `HOMEWORK` return objects with `.systemMessage`), which risks passing raw objects to JSX text nodes.

### 1.3 Session Summary Card in `index.html` (lines 2241–2264)
- Current action buttons upon call termination:
  1. `handleEndMissionAndContinue` ("End Mission & Advance to Next Level")
  2. `startLiveSession()` ("Continue Live Call")
- **Missing Action**: There is no button allowing the student to return to the **"Ready to Call" state** (`voiceState === 'IDLE'`, `voiceSessionEnded === false`, `voiceSessionSummary === null`) to practice the same mission level again or prepare for another call without immediately starting it or advancing.

### 1.4 Resource Leaks in `assets/aiCoach/speech.js`
- **Lines 47–60 (`VALID_TRANSITIONS`)**:
  - `INITIALIZING`, `REQUESTING_MICROPHONE`, `INTERRUPTED`, `RECOVERING`, and `ERROR` do NOT list `'ENDING'` in their allowed targets. Calling `pipeline.endLiveSession()` while in any of these states throws:
    `[LiveVoicePipeline] Invalid state transition from <STATE> to ENDING`.
- **Lines 834 (`speechKeepAliveInterval`)**:
  - `setInterval(..., 5000)` is scheduled when speaking, but `endLiveSession()` never clears `this.speechKeepAliveInterval`.
- **Lines 827 (`speakSafetyTimer`)**:
  - `setTimeout(..., timeoutMs)` calls `finishSpeech()` which restarts listening; never cleared in `endLiveSession()`.
- **Lines 690 (`restartDebounceTimer`)**:
  - `setTimeout(..., delay)` calls `restartListening()`; never cleared in `endLiveSession()`.
- **Lines 753 & 874 (`speakDispatchTimer` & `speakWatchdogTimer`)**:
  - Anonymous `setTimeout(..., 80)` and `setTimeout(..., 150)` are unreferenced and fire after `endLiveSession()` if called in close temporal proximity.
- **Line 977**:
  - Calls `this.recognition.stop()` instead of defensive `this.recognition.abort()`, leaving callbacks bound and un-nullified.
- **Lines 785–788**:
  - `window.__masteredUtteranceQueue` and `window.__masteredActiveUtterance` are not cleared on session termination.
- **Line 956–995**:
  - `this.onAudioLevel(0)` is never called to zero visualizer amplitude on the engine side.

### 1.5 Compatibility Methods on `AiCoachSession` (`assets/aiCoach/engine.js`)
- `session.executeCommand(cmd)` -> aliases `session.dispatchCommand(cmd)`.
- `session.generateDailyReport()` -> aliases `session.endSession().summary`.
- `session.getProfile()` returns a sanitized shallow clone of `this.profile` (`admissionNumber`, `name`, `learningGoal`, `englishLevel`, `currentMission`, `verifiedSentences`, `missionTarget`, `progressPct`, `missionStatus`, `lastUpdated`).
- `session.endSession()` calls `this.saveHandler(this.getProfile())` and returns `{ command: 'END SESSION', summary, message }`.

---

## 2. Logic Chain

1. **Premise 1**: When a student clicks "End Call" or says "End session", all active audio capture, speech recognition, speech synthesis audio output, and timers must halt immediately to avoid hanging or frozen state.
2. **Premise 2**: Direct invocation of `handleVoiceCommand('END SESSION')` bundles audio teardown with string dispatching and lacks immediate SpeechSynthesis cancellation, timer resets, and visualizer zeroing.
3. **Premise 3**: If `window.speechSynthesis` is not cancelled via `window.speechSynthesis.cancel()`, buffered utterances continue playing into the student's speakers even after the UI has transitioned to the summary.
4. **Premise 4**: If `voiceState` is not reset to `'IDLE'`, `callDuration` is not reset to 0, and `voiceAudioLevel` is not set to 0, the visualizer bars and duration timers may stay frozen at mid-call numbers.
5. **Premise 5**: Calling `syncVoiceProgressToDatabase(voiceSessionRef.current.getProfile())` guarantees that progress accumulated during the call is saved to local storage (`safeStorage`) and synced to Google Apps Script (`saveStudentProgress`).
6. **Premise 6**: Adding a "Practice Again / Ready" button setting `voiceSessionEnded(false)`, `voiceSessionSummary(null)`, and `voiceState('IDLE')` cleanly restores the "Ready to Call" card (lines 2270–2310), satisfying Requirement R1.
7. **Conclusion**: Introducing a standalone `handleEndCall` function in `index.html`, binding the End Call button and `onIntentDetected` directly to it, adding the "Practice Again / Ready" button, and hardening `speech.js` resource teardown creates a crash-proof, leak-free End Call lifecycle.

---

## 3. Caveats

- **No Caveats on Feasibility**: The architecture of `index.html`, `speech.js`, and `engine.js` fully supports this pattern.
- **Browser Environment Differences**: In desktop Chrome and Edge, `window.speechSynthesis.cancel()` is immediate; in iOS Safari, clearing `window.__masteredUtteranceQueue` is required to prevent queued speech restart. Both are accommodated in the drop-in specification.
- **Port Reuse in Verification**: Port 8098 may occasionally be in a `TimeWait` state in PowerShell; automated test scripts should use port 8099 or dynamic port binding.

---

## 4. Conclusion & Drop-In Code Specifications for Worker

### 4.1 Specification 1: `index.html` — Dedicated `handleEndCall` Function & Hardened `handleVoiceCommand`
**Target File**: `index.html`  
**Target Lines**: Replace lines 2011–2098 with the following block:

```javascript
      // Dedicated, crash-proof End Call lifecycle handler
      const handleEndCall = async () => {
        // 1. Immediately halt audio pipeline and speech synthesis
        if (voicePipelineRef.current) {
          try {
            voicePipelineRef.current.endLiveSession();
          } catch (err) {
            console.warn('[handleEndCall] Voice pipeline teardown error:', err);
          }
        }

        if (typeof window !== 'undefined' && window.speechSynthesis) {
          try {
            window.speechSynthesis.cancel();
          } catch (err) {
            console.warn('[handleEndCall] SpeechSynthesis cancel error:', err);
          }
        }

        // 2. Immediately reset UI visual state and timers
        setVoiceState('IDLE');
        setVoiceAudioLevel(0);
        setCallDuration(0);
        setVoiceTranscript('');

        // 3. Retrieve session summary safely via endSession, generateDailyReport, or dispatchCommand
        const session = voiceSessionRef.current;
        let summary = null;
        if (session) {
          try {
            if (typeof session.endSession === 'function') {
              const res = session.endSession();
              summary = (res && res.summary) ? res.summary : res;
            } else if (typeof session.generateDailyReport === 'function') {
              summary = session.generateDailyReport();
            } else if (typeof session.dispatchCommand === 'function') {
              const res = session.dispatchCommand('END SESSION');
              summary = (res && res.summary) ? res.summary : res;
            }
          } catch (err) {
            console.warn('[handleEndCall] Error generating session report:', err);
          }
        }

        const tSentences = (window.MasteredCurriculum && window.MasteredCurriculum.getTargetForMission)
          ? window.MasteredCurriculum.getTargetForMission(activeMissionNumber)
          : (activeMissionNumber <= 8 ? 30 : (activeMissionNumber <= 23 ? 40 : 50));

        if (!summary) {
          summary = {
            name: currentUser?.name || 'Student',
            admissionNumber: admNum,
            currentMission: activeMissionNumber,
            missionTitle: missionInfo.title || `Mission ${activeMissionNumber}`,
            verifiedSentences: voiceVerifiedCount,
            missionTarget: tSentences,
            progressPct: Math.min(100, Math.round((voiceVerifiedCount / (tSentences || 1)) * 100)),
            sessionEndedAt: new Date().toISOString()
          };
        }

        if (!summary.missionTarget) summary.missionTarget = tSentences;
        if (summary.progressPct === undefined) {
          summary.progressPct = Math.min(100, Math.round((voiceVerifiedCount / (tSentences || 1)) * 100));
        }

        // 4. Safely sync profile progress to database so spoken progress is never lost
        try {
          if (voiceSessionRef.current && typeof voiceSessionRef.current.getProfile === 'function') {
            await syncVoiceProgressToDatabase(voiceSessionRef.current.getProfile());
          } else if (session && typeof session.getProfile === 'function') {
            await syncVoiceProgressToDatabase(session.getProfile());
          } else {
            await syncVoiceProgressToDatabase({
              currentMission: activeMissionNumber,
              verifiedSentences: voiceVerifiedCount,
              progressPct: summary.progressPct,
              status: summary.progressPct >= 100 ? 'COMPLETED' : 'IN_PROGRESS'
            });
          }
        } catch (syncErr) {
          console.warn('[handleEndCall] Database sync warning:', syncErr);
        }

        // 5. Present Session Summary
        setVoiceSessionSummary(summary);
        setVoiceSessionEnded(true);

        if (showToast) {
          showToast('📞 Call ended. Spoken progress saved!');
        }
      };

      const handleVoiceCommand = (cmd) => {
        if (cmd === 'END SESSION') {
          handleEndCall();
          return;
        }

        const session = voiceSessionRef.current;
        if (!session) return;
        const reply = typeof session.executeCommand === 'function' 
          ? session.executeCommand(cmd) 
          : (typeof session.dispatchCommand === 'function' ? session.dispatchCommand(cmd) : '');

        if (cmd === 'FREE TALK') setCoachMode('FREE_TALK');
        if (cmd === 'STRUCTURED') setCoachMode('STRUCTURED');

        if (reply) {
          const replyText = typeof reply === 'string' ? reply : (reply.systemMessage || reply.message || reply.prompt || '');
          if (replyText) {
            setVoiceFeedback(replyText);
            updateActivePrompt(replyText);
            setConversationTurns(prev => [
              ...prev,
              { role: 'coach', text: replyText }
            ]);

            if (voicePipelineRef.current && voicePipelineRef.current.isSessionActive) {
              if (typeof voicePipelineRef.current.speakCoachResponse === 'function') {
                voicePipelineRef.current.speakCoachResponse(replyText);
              } else if (typeof voicePipelineRef.current.speak === 'function') {
                voicePipelineRef.current.speak(replyText);
              }
            }
          }
        }
      };
```

---

### 4.2 Specification 2: `index.html` — Direct `handleEndCall` Call in `onIntentDetected`
**Target File**: `index.html`  
**Target Lines**: Around line 1926:
```javascript
<<<< BEFORE
            onIntentDetected: (intent, text) => {
              if (intent === 'NEXT_MISSION') {
                handleEndMissionAndContinue();
              } else if (intent === 'END_SESSION') {
                handleVoiceCommand('END SESSION');
              } else if (intent === 'PAUSE') {
==== AFTER
            onIntentDetected: (intent, text) => {
              if (intent === 'NEXT_MISSION') {
                handleEndMissionAndContinue();
              } else if (intent === 'END_SESSION') {
                handleEndCall();
              } else if (intent === 'PAUSE') {
>>>>
```

---

### 4.3 Specification 3: `index.html` — End Call Button Event Binding
**Target File**: `index.html`  
**Target Lines**: Around lines 2482–2492:
```jsx
<<<< BEFORE
                        <button
                          type="button"
                          onClick={() => {
                            handleVoiceCommand('END SESSION');
                          }}
                          className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                          title="End current call"
                        >
                          <span>🔴</span>
                          <span>End Call</span>
                        </button>
==== AFTER
                        <button
                          type="button"
                          onClick={handleEndCall}
                          className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-1 cursor-pointer"
                          title="End current call"
                        >
                          <span>🔴</span>
                          <span>End Call</span>
                        </button>
>>>>
```

---

### 4.4 Specification 4: `index.html` — Add "Practice Again / Ready" Button to Session Summary Card
**Target File**: `index.html`  
**Target Lines**: Around lines 2241–2264:
```jsx
<<<< BEFORE
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleEndMissionAndContinue}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>⏩</span>
                  <span>End Mission & Advance to Next Level</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVoiceSessionEnded(false);
                    if (voicePipelineRef.current) {
                      voicePipelineRef.current.startLiveSession();
                    }
                  }}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition cursor-pointer"
                >
                  ✨ Continue Live Call
                </button>
              </div>
==== AFTER
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleEndMissionAndContinue}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>⏩</span>
                  <span>End Mission & Advance to Next Level</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVoiceSessionEnded(false);
                    setVoiceSessionSummary(null);
                    setVoiceState('IDLE');
                  }}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs rounded-xl border border-slate-700 transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  title="Return to Ready to Call state for this mission"
                >
                  <span>🔄</span>
                  <span>Practice Again / Ready</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVoiceSessionEnded(false);
                    if (voicePipelineRef.current) {
                      voicePipelineRef.current.startLiveSession();
                    }
                  }}
                  className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl border border-indigo-500/50 transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>✨</span>
                  <span>Continue Live Call</span>
                </button>
              </div>
>>>>
```

---

### 4.5 Specification 5: `assets/aiCoach/speech.js` — Complete Resource & Timer Teardown
**Target File**: `assets/aiCoach/speech.js`

1. **State Machine Transitions** (lines 47–60):
Ensure `'ENDING'` is an allowed target for all active and intermediate states:
```javascript
  var VALID_TRANSITIONS = {
    IDLE: ['INITIALIZING', 'REQUESTING_MICROPHONE', 'ERROR', 'ENDING', 'SPEAKING'],
    INITIALIZING: ['REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ERROR', 'IDLE', 'ENDING'],
    REQUESTING_MICROPHONE: ['LISTENING', 'SPEAKING', 'ERROR', 'IDLE', 'ENDING'],
    LISTENING: ['PROCESSING_SPEECH', 'SPEAKING', 'PAUSED', 'INTERRUPTED', 'RECOVERING', 'ENDING', 'ERROR', 'IDLE'],
    PROCESSING_SPEECH: ['GENERATING_RESPONSE', 'SPEAKING', 'LISTENING', 'RECOVERING', 'ERROR', 'ENDING', 'IDLE'],
    GENERATING_RESPONSE: ['SPEAKING', 'LISTENING', 'ERROR', 'ENDING', 'IDLE'],
    SPEAKING: ['LISTENING', 'PROCESSING_SPEECH', 'INTERRUPTED', 'PAUSED', 'ENDING', 'ERROR', 'IDLE'],
    INTERRUPTED: ['LISTENING', 'PROCESSING_SPEECH', 'SPEAKING', 'IDLE', 'ERROR', 'ENDING'],
    PAUSED: ['LISTENING', 'SPEAKING', 'ENDING', 'IDLE'],
    RECOVERING: ['LISTENING', 'REQUESTING_MICROPHONE', 'SPEAKING', 'ERROR', 'IDLE', 'ENDING'],
    ENDING: ['IDLE'],
    ERROR: ['RECOVERING', 'IDLE', 'REQUESTING_MICROPHONE', 'LISTENING', 'SPEAKING', 'ENDING']
  };
```

2. **`speakCoachResponse` Timeout Tracking** (lines 753 & 874):
Assign timeouts to `self.speakDispatchTimer` and `self.speakWatchdogTimer`, and check `if (!self.isSessionActive) return;` at the beginning of the callbacks:
```javascript
    // STEP 3: Dispatch with small tick so audio thread resets
    self.speakDispatchTimer = setTimeout(function () {
      if (!self.isSessionActive) return;
      if (!self.synth) {
...
```
and:
```javascript
        self.speakWatchdogTimer = setTimeout(function () {
          if (!self.isSessionActive) return;
          if (self.isSpeaking && self.synth && !self.synth.speaking) {
            try { self.synth.resume(); } catch (e) {}
          }
        }, 150);
```

3. **`endLiveSession` Exhaustive Clearance** (lines 956–995):
```javascript
  LiveVoicePipeline.prototype.endLiveSession = function () {
    this.isSessionActive = false;
    clearTimeout(this.processingSafetyTimer);
    this.isSpeaking = false;
    this.transitionTo(STATES.ENDING);

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

    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }

    if (this.animFrameId && typeof window !== 'undefined' && window.cancelAnimationFrame) {
      window.cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
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

    if (this.synth) {
      try { this.synth.cancel(); } catch (e) {}
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

    if (this.onAudioLevel) {
      try { this.onAudioLevel(0); } catch (e) {}
    }

    this.transitionTo(STATES.IDLE);
  };
```

---

## 5. Verification Method

### 5.1 Static Syntax & Unit Suite Commands
1. Verify Engine tests:
   ```powershell
   node scratch/test_ai_coach.cjs
   ```
   **Expected**: 23/23 tests pass (100%).
2. Verify Connected Conversation progression:
   ```powershell
   node scratch/test_connected_conversation.cjs
   ```
   **Expected**: 5/5 scenarios pass (100%).
3. Verify Mission Advance and Continuity:
   ```powershell
   node scratch/test_mission_advance_and_continuity.cjs
   ```
   **Expected**: 5/5 tests pass (100%).
4. Verify Master Prompt Audit:
   ```powershell
   node scratch/test_master_prompt_audit.cjs
   ```
   **Expected**: 23/23 acceptance tests pass (100%).

### 5.2 Automated End Call Lifecycle Puppeteer Verification
Run the dedicated End Call lifecycle test script using a non-conflicting port (e.g. 8099):
```powershell
node -e "
const fs = require('fs');
let code = fs.readFileSync('scratch/test_end_call_lifecycle.cjs', 'utf-8');
code = code.replace(/8098/g, '8099');
fs.writeFileSync('scratch/test_end_call_lifecycle_8099.cjs', code);
"
node scratch/test_end_call_lifecycle_8099.cjs
```
**Expected Output**:
- Local server starts on port 8099.
- Connects live call with Coach Sarah (`isSessionActive: true`).
- Clicks "End Call" button.
- Daily Session Completed report card appears immediately (`hasTitle: true`, `hasTrophy: true`).
- `window.speechSynthesis.speaking` is `false`.
- Call duration timer stops.
- Clicks "Practice Again / Ready" button: UI cleanly transitions to "Ready to Call" screen (`voiceState === 'IDLE'`, `callDuration === 0`).
- Console logs: `✅ ALL END CALL LIFECYCLE TESTS PASSED PERFECTLY!`.

### 5.3 Invalidation Conditions
The fix is considered invalid if:
1. Clicking "End Call" leaves speech synthesis speaking or speech recognition listening.
2. The UI remains on the active call screen instead of transitioning to the session summary.
3. Clicking "Practice Again / Ready" does not return the interface to the Ready to Call state.
4. Any `TypeError` is thrown in the browser console.
5. `speechKeepAliveInterval` or any un-cleared watchdog timer continues firing in the background.
