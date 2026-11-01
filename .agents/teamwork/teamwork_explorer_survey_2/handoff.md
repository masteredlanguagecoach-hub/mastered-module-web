# Comprehensive Survey Report: Requirement R2 — Cross-Device and Admin Portal Progress & History Sync

## 1. Observation

### 1.1 Client Local Storage & Remote Backend Storage Architecture
- **Client Deployment Entry Point**: `vercel.json` configures the static single-page application served directly from root `index.html`:
  - `vercel.json:1-7`:
    ```json
    {
      "buildCommand": "echo 'Static build ready'",
      "outputDirectory": ".",
      "cleanUrls": true,
      "rewrites": [
        { "source": "/((?!assets/|.*\\..*).*)", "destination": "/index.html" }
      ]
    }
    ```
- **Local Storage Abstraction (`safeStorage`)**:
  - `index.html:126-151`: `safeStorage` wraps `window.localStorage` with quota eviction:
    - Primary keys stored:
      - `mastered_user_session` (`index.html:3367`): Holds `{ user, role, tab, deviceToken }`.
      - `mastered_device_token` (`index.html:3181`): Holds unique client token `DEV-${Date.now()}-${rand}`.
      - `mastered_progress_${cleanAdm}` and `mastered_progress_${rawAdm}` (`index.html:1683-1684, 2824-2825`): Module-by-module JSON object.
      - `mastered_all_students_progress` (`index.html:1682, 2823`): Combined progress map across students.
      - `mastered_approved_students` (`index.html:2667`): Cached student directory.
      - `mastered_pending_requests` (`index.html:2673`): Cached access requests.
      - `mastered_selected_course` (`index.html:2696`): `'MAL TO ENG'` or `'HIND TO ENG'`.
      - `mastered_custom_quiz_bank` (`index.html:2757`): Admin custom quiz overrides.
- **Backend Schema & Endpoints (`backend/Code.gs`)**:
  - `backend/Code.gs:958-1070` (`handleSaveStudentProgress`):
    - Reads and writes to `StudentProgress` sheet tab.
    - Columns: `["AdmissionNumber", "Email", "LatestMclCode", "LatestMissionLevel", "LatestCodeProgress", "ProgressJSON", "LastUpdated"]`.
    - Merges module objects monotonically: `percentage = Math.max(existing, incoming)`, `verifiedSentences = Math.max(...)`, `aiMissionCompleted = true` if completed, merges `quizScores`.
  - `backend/Code.gs:1187-1244` (`handleGetStudentProgress`):
    - Queries `StudentProgress` sheet by `admissionNumber` or `email`.
    - Returns `{ success: true, userProgress: progObj, latestLevel: highestLvl, latestProgress: highestProg }`.
  - `backend/Code.gs:1246-1278` (`handleAdminGetAllStudentProgress`):
    - Reads all rows in `StudentProgress`, strips base64 proof images (`stripProofs: true`), and maps to `{ success: true, userProgress: allProgMap }`.
  - `backend/Code.gs:1300-1384` (`handleSubmitQuizScore`):
    - Appends record to `QuizResults` sheet tab: `["Timestamp", "AdmissionNumber", "StudentName", "ModuleNumber", "Score", "Total", "Percentage", "Passed"]`.
    - Also updates `StudentProgress` JSON with `quizScores[modNum]`.
  - **Absence of Session History Storage**:
    - Neither `index.html` nor `backend/Code.gs` has any table or action for speaking call session history (`CallLogs`, `SpeakingSessions`, or `SessionHistory`).
    - In `AiMissionPromptModal` (`index.html:1525, 1531`), `conversationTurns` and `callDuration` are stored only in volatile React component state (`useState([])` and `useState(0)`).
    - In `backend/Code.gs:67-135`, `routeActionObj` contains no action for saving or querying call history.

### 1.2 Speaking Room Session Completion & Desynchronization
- **Calling End Call in Speaking Room (`index.html:2423-2433`)**:
  ```html
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
  ```
- **Handler Implementation (`index.html:2011-2024`)**:
  ```javascript
  const handleVoiceCommand = (cmd) => {
    const session = voiceSessionRef.current;
    if (!session) return;
    const reply = session.executeCommand(cmd);

    if (cmd === 'END SESSION') {
      if (voicePipelineRef.current) {
        voicePipelineRef.current.endLiveSession();
      }
      const rep = session.generateDailyReport();
      setVoiceSessionSummary(rep);
      setVoiceSessionEnded(true);
      return;
    }
  ```
- **Runtime Method Mismatches on `AiCoachSession` (`assets/aiCoach/engine.js`)**:
  - `session.executeCommand`: **Does not exist**. The actual method in `assets/aiCoach/engine.js:1207` is `AiCoachSession.prototype.dispatchCommand(userInput)`.
  - `session.generateDailyReport`: **Does not exist**. The actual method in `assets/aiCoach/engine.js:2167` is `AiCoachSession.prototype.endSession()`, which returns `{ command: 'END SESSION', summary: summary, message: "..." }`.
  - Calling `handleVoiceCommand('END SESSION')` throws `TypeError: session.executeCommand is not a function`, terminating execution before reaching `voicePipelineRef.current.endLiveSession()` and leaving active audio listeners and timers hanging.
  - Furthermore, `handleVoiceCommand('END SESSION')` **omits any call to `syncVoiceProgressToDatabase(session.getProfile())`**.
- **Test Failure in Existing Scratch Test (`scratch/test_db_save_integration.cjs`)**:
  - Command execution: `node scratch/test_db_save_integration.cjs`
  - Output:
    ```
    --- Testing Database Save and Scope Fix in index.html ---
    AssertionError [ERR_ASSERTION]: AiMissionPromptModal must receive setUserProgress and getCurrentStudentProgressMap in props
        at Object.<anonymous> (test_db_save_integration.cjs:9:8)
    ```
  - Direct check: `test_db_save_integration.cjs:50` requires:
    ```javascript
    assert.ok(
      indexHtml.includes('syncVoiceProgressToDatabase(voiceSessionRef.current.getProfile())'),
      'END SESSION must call syncVoiceProgressToDatabase'
    );
    ```
    This assertion fails because `index.html` does not invoke `syncVoiceProgressToDatabase` inside the `END SESSION` branch.

### 1.3 Multi-Viewport and Cross-Device Profile Loading
- **No Standalone `admin.html`**:
  - Inspection confirms `admin.html` does not exist in the root or build directories (`fs.existsSync('admin.html') === false`).
  - The Admin portal is built directly into `index.html:4735-5145` as sub-views rendered when `role === 'admin'`.
- **Admin Polling & Data Retrieval (`index.html:3197-3274`)**:
  - Admin view polls `refreshLiveData()` every 5000ms (`index.html:3257-3258`).
  - Calls `getRequests`, `getStudents`, and `getAllStudentProgress`.
  - In `handleAdminGetStudents()` (`backend/Code.gs:1386-1475`), each student row in `Students` is matched with progress from `StudentProgress` sheet and embedded as `s.userProgress`.
- **Student History Modal (`index.html:1264-1509`)**:
  - Opened via `handleOpenStudentHistory(student)` (`index.html:3100-3103`), which triggers `fetchStudentProgressFromCloud(student)`.
  - Merges:
    1. `student.userProgress` (from backend `getStudents`)
    2. `userProgress` (from backend `getAllStudentProgress` or local React state)
    3. `safeStorage.getItem('mastered_progress_${cleanStudentAdm}')` (device local storage).
- **Cross-Device Desynchronization Root Causes**:
  1. **Missing Save on Call End**: If a student practices in the speaking room and clicks "End Call", intermediate verified sentences may have synced via `onSentenceVerified`, but final session summary, completed mission status, and final profile reconciliation are never pushed to Google Sheets due to the `session.executeCommand` crash.
  2. **Admin Isolation from Local Storage**: On the Admin machine, `safeStorage` contains only Admin-local data. If Google Sheets `StudentProgress` is not updated by the student device, the Admin portal displays stale 0% or previous-level progress.
  3. **Second Device Login Cache Invalidation**: On a second device (e.g., desktop after mobile practice), `handleStudentLogin` (`index.html:3356`) checks local memory first. If stale student data exists locally, it logs in immediately and schedules `fetchStudentProgressFromCloud`. If `fetchStudentProgressFromCloud` completes, `mergeProgressMaps` merges cloud with local. But if the course selection (`selectedCourse`) was changed on mobile, desktop defaults to `'MAL TO ENG'` because course preference is only saved to `safeStorage.getItem('mastered_selected_course')` and never persisted to the backend user record.
  4. **XP and Streak Absence**: Neither XP nor Streak exists in `index.html`, `StudentProgress` schema, or `backend/Code.gs`.

---

## 2. Logic Chain & Gap Analysis

```
[Observation 1.2: End Call Button Click]
  │
  ▼
Triggers handleVoiceCommand('END SESSION') in index.html:2011
  │
  ├─► Calls session.executeCommand(cmd)
  │     └─► [RUNTIME ERROR]: executeCommand is undefined on AiCoachSession (engine.js:1207 has dispatchCommand)
  │
  ├─► Code never reaches voicePipelineRef.current.endLiveSession()
  │     └─► Audio listeners, SpeechRecognition, SpeechSynthesis remain hanging
  │
  ├─► Code never reaches session.generateDailyReport()
  │     └─► [RUNTIME ERROR]: generateDailyReport is undefined on AiCoachSession (engine.js:2167 has endSession)
  │
  └─► NEVER calls syncVoiceProgressToDatabase(session.getProfile())
        └─► Google Sheets backend `StudentProgress` sheet NOT updated with session completion
              │
              ▼
        [Observation 1.3: Admin Portal & Second Device Query Cloud]
          │
          ├─► Admin polls getAllStudentProgress & getStudents
          │     └─► Cloud returns stale progress because student device failed to sync
          │     └─► Admin Student Directory & StudentHistoryModal show old / 0% progress
          │
          └─► Student logs into Desktop after Mobile session
                └─► Desktop queries getStudentProgress
                └─► Cloud has no updated record for completed session
                └─► Desktop renders old progress
```

### Gap Matrix

| Area | Observed Current State | Expected State (R2 Requirement) | Impact |
| :--- | :--- | :--- | :--- |
| **End Call Button** | Calls `session.executeCommand()` and `session.generateDailyReport()` (`index.html:2014, 2020`) | Must call `session.dispatchCommand('END SESSION')` or `session.endSession()`, immediately stop `voicePipeline.endLiveSession()`, and cleanly transition UI | Uncaught TypeError; media stream / audio recognition hangs; UI remains frozen |
| **Session End Cloud Sync** | No backend write executed in `END SESSION` branch | Must call `await syncVoiceProgressToDatabase(session.getProfile())` with mission level, verified sentences, and percentage | Session completion not persisted to Google Sheets |
| **Session History Storage** | Turns and summary discarded on modal close; zero database persistence | Must store session record (timestamp, duration, mission, sentences verified, turn count) in local cache and push to backend | History log inaccessible in Admin and across viewports |
| **Admin Real-Time Sync** | Polling works (5s), but receives stale data when client fails to push session end payload | Admin receives live updated mission level, percentage, and history logs immediately after student call completes | Desynchronization between student mobile practice and Admin portal |
| **Cross-Device Course & Progress Sync** | `selectedCourse` is stored only in local `safeStorage` (`index.html:2696`) | Course preference synchronized with student profile in backend (`Students` sheet Col F) | Student switching course on mobile sees default course on desktop |
| **Automated Test Suite** | `test_db_save_integration.cjs` fails due to outdated prop signature assertions and missing `END SESSION` sync check | Test suite must cleanly pass all assertions matching the current production codebase | CI/verification failure |

---

## 3. Caveats
- No direct Google Sheets API keys or credentials are stored locally; all remote communications route through the Google Apps Script Web App endpoint (`LIVE_APPS_SCRIPT_URL` at `https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec`).
- In environments where Google Apps Script responses encounter CORS or network latency, the client uses fallback monotonic local caching; fixes must ensure local cache never overwrites newer cloud data or vice versa (monotonic max merge).
- Single-device enforcement: `backend/Code.gs:715-718` implements `handleVerifyDeviceSession`, but returns `{ valid: true }` without blocking multi-device access, so multi-device testing can proceed without device lockout conflicts.

---

## 4. Conclusion & Recommended Architecture

### 4.1 Recommended Implementation Fixes

#### Fix A: Speaking Room End Call Lifecycle & Clean State Transition (`index.html`)
Refactor `handleVoiceCommand` in `index.html:2011-2040` to:
1. Wrap teardown in a robust fail-safe block.
2. Immediately invoke `voicePipelineRef.current.endLiveSession()` to halt active recognition, cancel speech synthesis, stop microphone media streams, and clear safety watchdog timers.
3. Call `session.dispatchCommand('END SESSION')` or `session.endSession()` (aligning with `assets/aiCoach/engine.js`).
4. Execute `await syncVoiceProgressToDatabase(session.getProfile())` to persist the completed mission progress to Google Sheets.
5. Save the session report `{ timestamp: new Date().toISOString(), duration: callDuration, mission: activeMissionNumber, verifiedSentences: voiceVerifiedCount, turns: conversationTurns.length }` to local storage under `mastered_session_history_${cleanAdm}`.
6. Set `setVoiceSessionSummary(summary)` and `setVoiceSessionEnded(true)` to display the clean daily report card.

#### Fix B: Backend Session History Persistence (`backend/Code.gs`)
1. Add action `'saveSessionHistory'` and `'getSessionHistory'` to `routeActionObj` in `backend/Code.gs:67-135`.
2. Append speaking session logs to a dedicated sheet tab `"SessionHistory"` with columns: `["Timestamp", "AdmissionNumber", "StudentName", "MissionNumber", "VerifiedSentences", "DurationSeconds", "Completed", "DeviceToken"]`.
3. In `handleAdminGetStudents()` and `handleOpenStudentHistory()`, attach recent session history logs to the student payload so the Admin portal and `StudentHistoryModal` display real-time speaking session history alongside quiz results.

#### Fix C: Cross-Device Course & Progress Alignment (`index.html`)
1. In `handleSwitchCourse(newCourse)`, add a non-blocking background API call:
   `callAppsScript('updateStudentCourse', { admissionNumber: currentUser.admissionNumber, course: newCourse })`.
2. In `fetchStudentProgressFromCloud(userObj)`, ensure `selectedCourse` updates to match the student's cloud course record if available.

#### Fix D: Synchronize Admin Student History Modal (`StudentHistoryModal`)
Update `StudentHistoryModal` in `index.html:1264-1509` to:
1. Render a "Speaking Practice Sessions" table displaying past calls (date, mission, duration, verified sentences) fetched live from `getSessionHistory` or student session history array.
2. Ensure progress bars and level badges pull strictly from monotonically merged cloud + device data.

#### Fix E: Repair and Update Test Suite (`scratch/`)
1. Update `scratch/test_db_save_integration.cjs` to match current `AiMissionPromptModal` signature and verify that `handleVoiceCommand('END SESSION')` guarantees `syncVoiceProgressToDatabase` invocation.
2. Add automated end-to-end multi-viewport Puppeteer verification test (`scratch/test_cross_device_sync.cjs`) verifying that:
   - Speaking room session ends cleanly without hanging state.
   - Progress generated in mobile viewport (375x812) is saved to backend.
   - Desktop viewport (1280x900) and Admin portal (under `role === 'admin'`) reflect the updated progress and session record.

---

## 5. Verification Method

### 5.1 Verification Commands
Execute the following verification commands from the project root:

1. **Verify Backend Syntax & Handlers**:
   ```bash
   node -e "const fs = require('fs'); const code = fs.readFileSync('backend/Code.gs', 'utf8'); console.log('Code.gs length:', code.length); new Function(code.replace(/var |let |const /g, 'global.')); console.log('Syntax valid!');"
   ```

2. **Run Existing Curriculum & AI Coach Tests**:
   ```bash
   node scratch/test_ai_coach.cjs
   node scratch/test_connected_conversation.cjs
   node scratch/test_mission_advance_and_continuity.cjs
   node scratch/test_master_prompt_audit.cjs
   node scratch/test_dash_math.cjs
   ```

3. **Run Database Save Integration Test**:
   ```bash
   node scratch/test_db_save_integration.cjs
   ```

4. **Run Live Speaking Room & End Call Browser Tests**:
   ```bash
   node scratch/test_live_call_button.cjs
   node scratch/test_voice_turn_reply.cjs
   ```

5. **Automated Cross-Device & Admin Portal Sync Verification**:
   Run the newly created cross-device test script in `scratch/test_cross_device_sync.cjs`:
   - Step 1: Emulate Mobile viewport (375x812), log in as designated test student (`MTR7082`), start Coach Sarah call, simulate verified sentences, click "End Call", verify speech synthesis is cancelled, timers stopped, and session summary displayed.
   - Step 2: Emulate Desktop viewport (1280x900) in a separate browser context, log in as `MTR7082`, verify the completed level and verified sentences match mobile.
   - Step 3: Log in as Admin (`masteredlanguagecoach@gmail.com`), navigate to `admin-students`, verify test student displays the updated Level and AI Growth percentage, and open `StudentHistoryModal` to verify the session record is visible.

### 5.2 Invalidation Conditions
The survey conclusions would be invalidated if:
- `backend/Code.gs` is not deployed to the live Google Apps Script web app endpoint URL referenced in `index.html` (`window.LIVE_APPS_SCRIPT_URL`).
- Google Sheets API restricts sheet creation or rejects CORS POST requests from the web client.
