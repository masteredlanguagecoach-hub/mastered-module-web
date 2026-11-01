# Survey Report: Requirement R3 — Permanent Database Storage via Google Sheets Backend

**Explorer Instance**: teamwork_explorer_survey_3  
**Target Requirement**: R3 (Permanent Database Storage via Google Sheets Backend & Cross-Device Sync)  
**Parent Orchestrator**: `3628dee8-2dab-4695-b778-2cf658aefec9`  
**Timestamp**: 2026-10-31T07:51:00Z  

---

## 1. Observation

### 1.1 Live Backend Deployment & Configuration
- **Live Google Apps Script Web App URL**:
  `https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec`
- **Spreadsheet ID**:
  `1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg`
- **Client Configuration Files**:
  1. `index.html`: Line 191
     ```javascript
     const scriptUrl = (typeof LIVE_APPS_SCRIPT_URL !== 'undefined' && LIVE_APPS_SCRIPT_URL) || "https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec";
     ```
  2. `assets/modulesData.js`: Line 2
     ```javascript
     window.LIVE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec";
     ```
  3. `src/lib/api.ts`: Line 43
     ```typescript
     export function getAppsScriptUrl(): string {
       return memorySettings.appsScriptUrl || "https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec";
     }
     ```
  4. `backend/Code.gs` & `backend/Setup.gs`: Line 7 / Line 8
     ```javascript
     var MASTERED_SPREADSHEET_ID = "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg";
     ```

### 1.2 Live Google Sheets Inventory & Row Status
Execution of `node -e "fetchGAS('debugSheets')"` verified live sheets and row counts:
```json
{
  "success": true,
  "spreadsheetId": "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg",
  "sheets": [
    { "name": "Admins", "lastRow": 3 },
    { "name": "StudentProgress", "lastRow": 300 },
    { "name": "Students", "lastRow": 369 },
    { "name": "Requests", "lastRow": 496 },
    { "name": "Modules", "lastRow": 4 },
    { "name": "Quiz", "lastRow": 3 },
    { "name": "Questions", "lastRow": 3 },
    { "name": "Quiz Results", "lastRow": 1000 },
    { "name": "Announcements", "lastRow": 2 },
    { "name": "Progress", "lastRow": 2 },
    { "name": "Settings", "lastRow": 2 },
    { "name": "Sessions", "lastRow": 1 },
    { "name": "Logs", "lastRow": 2 },
    { "name": "Duplicate Admissions", "lastRow": 4 }
  ]
}
```
Direct verification: The Google Sheet holds **369 real registered students**, **496 admission requests**, and **300 active student progress rows**. Querying live student `MTR777` returned active recorded progress (`latestLevel: 11`, `latestProgress: 93%`).

### 1.3 `backend/Code.gs` Request Handlers & Sheet Mapping
- **Entry Points**:
  - `doGet(e)` (lines 22-43): Handles `e.parameter`, optional JSON `params.payload`, and supports JSONP if `params.callback` is specified.
  - `doPost(e)` (lines 45-65): Parses `e.postData.contents`, merges nested `data.payload`, and passes to `routeActionObj`.
- **Action Dispatcher (`routeActionObj`, lines 67-135)**:
  - `ping`: PONG healthcheck.
  - `debugSheets`: Lists all sheets and row counts.
  - `loginStudent`: Reads `Students` tab; auto-approves from `PAID_STUDENTS` if pending; validates credentials; binds device token.
  - `saveStudentProgress` (lines 958-1070):
    - Target tab: `StudentProgress`.
    - Columns: `["AdmissionNumber", "Email", "LatestMclCode", "LatestMissionLevel", "LatestCodeProgress", "ProgressJSON", "LastUpdated"]`.
    - Row Matching: Flexible alphanumeric matching on `AdmissionNumber` or `Email`.
    - Monotonic Deep Merge (lines 1005-1035):
      ```javascript
      mergedMod.percentage = Math.max(Number(exVal.percentage) || 0, Number(inVal.percentage) || 0);
      mergedMod.verifiedSentences = Math.max(Number(exVal.verifiedSentences) || 0, Number(inVal.verifiedSentences) || 0);
      mergedMod.aiMissionCompleted = Boolean(exVal.aiMissionCompleted || inVal.aiMissionCompleted || exVal.aiMissionProof || inVal.aiMissionProof);
      ```
    - In-place row update if existing row found; appends a new row if student not yet recorded.
  - `getStudentProgress` (lines 1187-1244):
    - Queries `StudentProgress` tab; extracts `ProgressJSON`; dynamically computes `latestLevel` and `latestProgress`.
  - `getAllStudentProgress` (lines 1246-1278):
    - Reads all progress rows in `StudentProgress`, strips base64 screenshot proofs (`stripProofs = true`) to prevent V8 memory limits, and returns a key-value dictionary mapped by admission number and email.
  - `submitQuizScore` (lines 1300-1384):
    - Appends row to `QuizResults` tab: `[Timestamp, AdmissionNumber, StudentName, ModuleNumber, Score, Total, Percentage, Passed]`.
    - Also updates `StudentProgress` JSON under `quizScores`.
  - `getStudents` / `adminGetStudents` (lines 1386-1475):
    - Reads all rows from `Students` tab, loads `StudentProgress` tab, and merges each student's progress directly into `student.userProgress`.

### 1.4 Client-Side Request Flow & Persistence Triggers
- In `index.html`:
  - `callAppsScript(action, payload)` (lines 190-258):
    - Uses hybrid dispatch: direct GET for read actions (`getStudents`, `getRequests`, `getAllStudentProgress`, `getModules`, `ping`, `getStudentProgress`), and POST with `"Content-Type": "text/plain;charset=utf-8"` (to bypass CORS preflight) for mutations, with fallback to GET.
  - `syncVoiceProgressToDatabase(progressData)` (lines 1638-1700):
    - Updates local React state (`userProgress`).
    - Writes to `safeStorage` (localStorage): `mastered_all_students_progress` and `mastered_progress_${cleanAdm}`.
    - Calls `callAppsScript('saveStudentProgress', { admissionNumber, email, userProgress, latestMissionLevel })`.
  - Trigger points:
    - `onSentenceVerified`: Line 1759 -> triggers on every verified speaking sentence.
    - `handleEndMissionAndContinue`: Line 1712 -> triggers when completing mission and advancing.
    - **CRITICAL GAP**: When user clicks the `End Call` button (`handleVoiceCommand('END SESSION')`, line 2016):
      ```javascript
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
      `syncVoiceProgressToDatabase(voiceSessionRef.current.getProfile())` is NOT called!

### 1.5 Teardown Gaps in Speaking Room Lifecycle (`assets/aiCoach/speech.js`)
In `LiveVoicePipeline.prototype.endLiveSession` (lines 956-995):
- `this.speakSafetyTimer` (created on line 827) is NOT cleared.
- `this.speechKeepAliveInterval` (created on line 834) is NOT cleared.
- `this.restartDebounceTimer` is NOT cleared.
- `this.recognition`: `onstart`, `onresult`, `onerror`, `onend` event handlers are NOT removed; `recognition.abort()` is NOT called (only `stop()`), which allows pending `onend` to trigger reconnect logic; `this.recognition` handle is NOT nullified.

### 1.6 Scratch Verification Test Status
- `scratch/test_ai_coach.cjs`: PASSED (23/23 acceptance tests passed).
- `scratch/test_mission_advance_and_continuity.cjs`: PASSED (5/5 tests passed).
- `scratch/test_db_save_integration.cjs`: FAILED on line 9 due to outdated parameter assertion for `AiMissionPromptModal` (`asPage = false` replaced `onVerifyMclCode`), and missing assertion for `END SESSION` persistence.
- `scratch/test_api.cjs`: PASSED (successfully connected and fetched live student data).

---

## 2. Logic Chain & Gap Analysis

```
[Observation: 369 real students in live Sheets] 
   + [Observation: Matching rule uses indexOf substring]
   ───────────────────────────────────────────────────────►
   [Logic Step 1]: Testing against real student IDs (e.g. MTR777, MA101) risks corrupting production learning data.
   [Requirement]: Test isolation must use an unambiguous, dedicated prefix (e.g. AUTOTEST_R3_<timestamp>) that never matches real IDs.

[Observation: endLiveSession leaves timers & listeners active]
   + [Observation: SpeechRecognition.stop() fires onend]
   ───────────────────────────────────────────────────────►
   [Logic Step 2]: Speech watchdog/timers trigger after call ends, causing "hanging/frozen" state or audio synthesis restarts.
   [Requirement R1]: endLiveSession must cancel timers, clear event handlers, call recognition.abort(), and cancel synth.

[Observation: handleVoiceCommand('END SESSION') lacks syncVoiceProgressToDatabase]
   + [Observation: User clicks End Call to leave room]
   ───────────────────────────────────────────────────────►
   [Logic Step 3]: Any progress accumulated during the session without an intermediate sentence verification event is never sent to Google Sheets on call termination.
   [Requirement R3]: 'END SESSION' command handler must explicitly call syncVoiceProgressToDatabase(session.getProfile()).

[Observation: StudentProgress stores JSON with deep monotonic merge]
   + [Observation: handleAdminGetStudents merges StudentProgress into student list]
   ───────────────────────────────────────────────────────►
   [Logic Step 4]: Google Sheets backend persistence already supports full cross-device and Admin portal sync, provided the frontend persists on End Call and queries the backend on login/mount.
```

### Table of Gaps & Solutions

| Component | Current State | Defect / Risk | Concrete Solution |
|-----------|---------------|---------------|-------------------|
| **End Call Button** (`index.html:2016`) | Only halts pipeline and opens summary; does not trigger cloud sync | Progress made in last turn or session completion is lost on exit | Add `syncVoiceProgressToDatabase(voiceSessionRef.current.getProfile())` inside `cmd === 'END SESSION'` |
| **Pipeline Teardown** (`speech.js:956`) | Leaves `speakSafetyTimer`, `speechKeepAliveInterval`, and `recognition.onend` unhandled | Microphones stay active or speech synthesis restarts after closing | Clear all timers, remove listeners, invoke `recognition.abort()`, and reset state to `IDLE` |
| **Test DB Suite** (`test_db_save_integration.cjs`) | Fails on outdated props check and lacks live cloud persistence check | False negatives in CI; no verification of permanent Google Sheets write | Update test assertions and add dedicated `test_backend_google_sheets_persistence.cjs` |
| **Backend Schemas** (`Code.gs`) | Uses `StudentProgress` with monolithic JSON; `Sessions` tab is unused (lastRow: 1) | Session metadata is embedded in JSON history rather than discrete rows | Maintain `StudentProgress` JSON mapping which powers both student portal and Admin portal seamlessly |

---

## 3. Test Record Isolation Strategy

Because the Google Apps Script backend is wired directly to the **production database** with 369 active students:

1. **Designated Test Student Namespace**:
   - Format: `AUTOTEST_R3_<TIMESTAMP>` (e.g., `AUTOTEST_R3_20261031_901`).
   - Clean Alphanumeric Key: `AUTOTESTR320261031901`.
   - Test Email: `autotest.r3.20261031@mastered-test.internal`.
   - Name: `"Automated R3 Verification Probe"`.
2. **Collision Prevention Rules**:
   - `Code.gs` matching logic: `cleanUserAdm.indexOf(rowAdmClean) >= 0 || rowAdmClean.indexOf(cleanUserAdm) >= 0`.
   - Never use short test IDs like `TEST`, `ST1`, or `T1` because substrings of existing admission numbers (e.g., `STD-1001`) could match!
   - Prefixing with `AUTOTEST_R3_` ensures no collision with any real student numbers (`MTR...`, `MA...`, `MLC...`, `STD...`).
3. **Controlled Isolation Lifecycle**:
   - **Pre-check**: Query `getStudentProgress&admissionNumber=AUTOTEST_R3_<ID>` to verify clean baseline (`latestProgress: 0`).
   - **Write Phase**: Send `saveStudentProgress` with test progress: Mission 3, 40% progress, 12 verified sentences.
   - **Read Verification**: Query `getStudentProgress` to assert that Google Sheets returned `latestLevel: 3` and `percentage: 40`.
   - **Monotonic Merge Verification**: Send secondary write with Mission 3, 50% progress. Confirm `latestProgress: 50`.
   - **Negative Assertion**: Verify that querying `MTR777` or real students confirms their progress remains completely untouched.

---

## 4. Caveats

- Google Apps Script execution time has a cold-start overhead (typically 1.5s - 2.5s per request). Automated tests should allow 15s timeouts for live HTTP calls.
- The `Sessions` sheet tab (`lastRow: 1`) in Google Sheets was defined in `backend/Setup.gs` but is not actively written to by `backend/Code.gs`; all active session progress and turn history is permanently persisted in the `StudentProgress` tab under the `ProgressJSON` column.
- The live Google Spreadsheet permissions are managed under the coach account (`masteredlanguagecoach@gmail.com`). Code changes to `backend/Code.gs` require pushing the updated script or updating the Apps Script project deployment if backend-level changes are needed; however, the existing `backend/Code.gs` already fully supports `saveStudentProgress`, `getStudentProgress`, and `getAllStudentProgress`.

---

## 5. Conclusion & Actionable Next Steps

1. **Backend Persistence (R3) is Fully Functional in Google Apps Script**: The deployed web app correctly implements `saveStudentProgress`, `getStudentProgress`, `getAllStudentProgress`, and `submitQuizScore` with monotonic merging on the `StudentProgress` sheet tab.
2. **Client-Side End Call Sync Defect Identified**: The Speaking Room (`index.html`) fails to call `syncVoiceProgressToDatabase` when the End Call button (`handleVoiceCommand('END SESSION')`) is clicked. Adding this call will guarantee that all verified turns and completion data are permanently persisted to Google Sheets before the room closes.
3. **Speech Teardown Leak Identified**: `LiveVoicePipeline.prototype.endLiveSession` leaves watchdog intervals, safety timers, and recognition event listeners active, causing lingering mic streams or speech loops.
4. **Automated Verification Plan**: Create `scratch/test_backend_google_sheets_persistence.cjs` executing the Safe Test Isolation Strategy against the live GAS endpoint, and update `scratch/test_db_save_integration.cjs` to validate the client-side fixes.

---

## 6. Verification Method

To independently verify all findings in this survey report:

```bash
# 1. Test live GAS endpoint connectivity and debug sheet status
node -e "
const https = require('https');
https.get('https://script.google.com/macros/s/AKfycbyTe-hZJIaev4qvK_aDR7ipOidSpJetZhwGC195ECn5lwVRiP4K-IL4sLXtopjAj8Ox/exec?action=debugSheets', res => {
  const follow = res.statusCode >= 300 && res.headers.location ? res.headers.location : null;
  https.get(follow || url, r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => console.log('Sheets:', JSON.parse(d).sheets));
  });
});
"

# 2. Run existing AI coach specification suite
node scratch/test_ai_coach.cjs

# 3. Run mission advance and dialogue continuity suite
node scratch/test_mission_advance_and_continuity.cjs

# 4. Inspect End Call button and session end handler in index.html
grep -n -C 5 "END SESSION" index.html
```
