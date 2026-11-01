# Project: Mastered Language Coach Student Portal & Speaking Room Fixes

## Architecture
- **Frontend SPA**: `index.html` (React 18 via Babel Standalone, Tailwind CSS). Contains student views, Coach Sarah speaking room modal (`AiMissionPromptModal`), and Admin portal (`role === 'admin'`).
- **Speaking Room Subsystem**:
  - `index.html`: UI state machine (`voiceState`, `callDuration`, `voiceVerifiedCount`, `voiceSessionEnded`, `voiceSessionSummary`), event listeners, and cloud sync caller.
  - `assets/aiCoach/speech.js`: `LiveVoicePipeline` (Web Speech API, `SpeechRecognition` / `webkitSpeechRecognition`, `window.speechSynthesis`, `AudioContext`, state transitions, keep-alive & safety timers).
  - `assets/aiCoach/engine.js`: `AiCoachSession` (dialogue progression, turn tracking, curriculum evaluation, session end reports).
- **Backend & Database**:
  - `backend/Code.gs`: Google Apps Script Web App endpoint (`LIVE_APPS_SCRIPT_URL` at `https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec`).
  - Google Spreadsheet ID: `1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg` (369 real students, 300 student progress rows).
  - Storage mapping: `StudentProgress` tab (`ProgressJSON` with deep monotonic merge), `Students` tab, `QuizResults` tab, and `SessionHistory` tab.
- **Data Flow**:
  1. Student speaks -> `SpeechRecognition` -> `LiveVoicePipeline` -> `AiCoachSession.processTurn()`.
  2. Verified turns accumulate -> `syncVoiceProgressToDatabase()` sends `saveStudentProgress` to Google Apps Script.
  3. On "End Call" -> `handleEndCall()` halts audio pipeline, aborts speech recognition, cancels speech synthesis, clears all timers, invokes `syncVoiceProgressToDatabase(session.getProfile())`, saves session record, and transitions UI to Session Summary with Ready State option.
  4. Google Apps Script monotonically merges incoming progress (`Math.max` on percentage and verified sentences) into `StudentProgress` sheet.
  5. Admin portal polls Google Apps Script every 5s (`getAllStudentProgress` and `getStudents`) and displays real-time progress and session history logs.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | End Call Immediate Audio Recognition & Speech Teardown | `recognition.abort()`, remove listeners, `speechSynthesis.cancel()`, clear audio stream | M1 | Survey R1 |
| F2 | Speech Pipeline Timer & Watchdog Clearance | Clear `speechKeepAliveInterval`, `speakSafetyTimer`, `restartDebounceTimer`, 80ms dispatch timer, 150ms watchdog | M1 | Survey R1 |
| F3 | Crash-Proof End Call Handler & Engine Aliases | Replace missing `executeCommand` and `generateDailyReport` with `dispatchCommand` / `endSession`, add aliases in `engine.js` | M1 | Survey R1 |
| F4 | Clean UI State Transition (Summary & Ready State) | Transition UI cleanly to Session Summary, add "Ready / Practice Again" button to return to Ready state | M1 | Survey R1 |
| F5 | End Call Progress Persistence | Explicitly invoke `syncVoiceProgressToDatabase(session.getProfile())` inside `END SESSION` handler | M2 | Survey R2, R3 |
| F6 | Session History Storage | Capture and persist session record (timestamp, duration, mission, sentences verified, turns) to cache and backend | M2 | Survey R2 |
| F7 | Admin Portal Real-Time Progress & History Sync | Admin student list and `StudentHistoryModal` reflect updated mission level, percentage, and call history | M2 | Survey R2 |
| F8 | Cross-Device / Multi-Viewport Profile Synchronization | Progress and session state saved in mobile viewport matches desktop viewport query | M2 | Survey R2 |
| F9 | Google Sheets Backend Persistence & Monotonic Merge | Verify `saveStudentProgress` and `getStudentProgress` in `backend/Code.gs` with monotonic deep merge | M3 | Survey R3 |
| F10 | Safe Test Record Isolation Namespace | Use `AUTOTEST_R3_<timestamp>` for all automated tests against live GAS to prevent corrupting real student records | M3 | Survey R3 |
| F11 | Automated E2E Suite & Adversarial Hardening | Comprehensive 4-Tier test suite (`scratch/test_e2e_suite.cjs`) + Tier 5 adversarial stress testing | Final | Project Pattern |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Speaking Room Clean End Call Lifecycle | F1, F2, F3, F4: `index.html`, `speech.js`, `engine.js` | none | IN_PROGRESS |
| M2 | Cross-Device & Admin Portal Progress & History Sync | F5, F6, F7, F8: `index.html`, `backend/Code.gs` | M1 | PLANNED |
| M3 | Google Sheets Backend Persistence & Safe Isolation | F9, F10: `backend/Code.gs`, `scratch/test_backend_google_sheets_persistence.cjs` | none | PLANNED |
| Final | 100% E2E Pass & Adversarial Hardening | F11: Phase 1 (Tiers 1-4 in `test_e2e_suite.cjs`) + Phase 2 (Tier 5 adversarial hardening) | M1, M2, M3 | PLANNED |

---

## Interface Contracts
### `index.html` ↔ `assets/aiCoach/speech.js`
- `voicePipelineRef.current.endLiveSession()`:
  - Immediately sets `isSessionActive = false`, `isSpeaking = false`.
  - Clears `speechKeepAliveInterval`, `speakSafetyTimer`, `restartDebounceTimer`, `speakDispatchTimer`, `speakWatchdogTimer`.
  - Clears and aborts `SpeechRecognition` (`recognition.abort()`, removes `onstart`, `onresult`, `onerror`, `onend`).
  - Cancels `window.speechSynthesis.cancel()`, nulls active utterances, clears queue.
  - Transitions to `STATES.ENDING` then `STATES.IDLE`. Valid from all states (`INITIALIZING`, `REQUESTING_MICROPHONE`, `INTERRUPTED`, `RECOVERING`, `ERROR`).
  - Calls `onAudioLevel(0)`.

### `index.html` ↔ `assets/aiCoach/engine.js`
- `session.dispatchCommand('END SESSION')` / `session.endSession()`:
  - Returns `{ command: 'END SESSION', summary: { ... }, message: "..." }`.
  - Compatibility aliases: `executeCommand(userInput)` -> `dispatchCommand(userInput)`, `generateDailyReport()` -> `endSession().summary`.

### `index.html` ↔ `backend/Code.gs`
- `callAppsScript('saveStudentProgress', { admissionNumber, email, userProgress, latestMissionLevel })`:
  - Returns `{ success: true, admissionNumber, message }`.
  - Monotonic merge in `StudentProgress` sheet tab (`Math.max` on percentage and verified sentences).
- `callAppsScript('getStudentProgress', { admissionNumber })`:
  - Returns `{ success: true, userProgress, latestLevel, latestProgress }`.
- `callAppsScript('saveSessionHistory', { admissionNumber, sessionRecord })`:
  - Appends record to `SessionHistory` sheet tab and returns `{ success: true }`.

---

## Code Layout
- `index.html`: Main React application, speaking room modal, Admin portal, and storage layer.
- `assets/aiCoach/speech.js`: Audio and speech pipeline state machine.
- `assets/aiCoach/engine.js`: Dialogue engine and session management.
- `backend/Code.gs`: Google Apps Script API endpoints and Google Sheet operations.
- `scratch/`: Test harnesses and automated verification suites (`test_ai_coach.cjs`, `test_db_save_integration.cjs`, `test_cross_device_sync.cjs`, `test_backend_google_sheets_persistence.cjs`, `test_e2e_suite.cjs`).
