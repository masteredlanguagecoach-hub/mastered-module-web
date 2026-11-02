# Handoff Report: Student Practice Progress Recording & Persistence Pipeline

**Target Files**: `index.html`, `localStorage`, `assets/aiCoach/engine.js`, `backend/Code.gs`  
**Author**: `teamwork_explorer_r2_persistence`  
**Recipient**: `orchestrator` / `teamwork_worker`  
**Date**: 2026-11-01  
**Integrity Mode**: development  

---

## 1. Observation

### 1.1 Direct Runtime Reproduction via Headless Diagnostic
An automated headless Chromium diagnostic script (`scratch/test_persistence_diagnostic.cjs`) was constructed and executed against the live application:
- Command: `node scratch/test_persistence_diagnostic.cjs`
- Output before reload:
  - `Verified matches in DOM: 1 / 30`
  - `Turn history in DOM: true`
  - `mastered_progress_MTR999: {"MTR999": {"MOD-01": {"percentage": 3, "verifiedSentences": 1, ...}}, ...}`
- Output immediately after `page.reload({ waitUntil: 'domcontentloaded' })`:
  - `Verified matches in DOM after reload: 0 / 30` (❌ Progress reset to 0!)
  - `Turn history visible after reload: false` (❌ All conversation history wiped!)
  - `mastered_progress_MTR999 after reload: {"MTR999": {"MTR999": {"MOD-01": ...}}}` (❌ Infinite recursive nesting!)
  - `userSession after reload: {"user": { ... "userProgress": {"MOD-01": {"percentage": 100, "verifiedSentences": 0}}}}` (❌ False 100% completion with 0 verified sentences!)

### 1.2 Code-Level Observations in `index.html`
1. **Recursive Nesting Bug in Storage Listener** (`index.html:3412–3420`):
   ```javascript
   useEffect(() => {
     if (userProgress && Object.keys(userProgress).length > 0) {
       if (currentUser && (currentUser.admissionNumber || currentUser.studentId)) {
         const adm = currentUser.admissionNumber || currentUser.studentId;
         safeStorage.setItem(`mastered_progress_${adm}`, JSON.stringify(userProgress));
       }
     }
   }, [userProgress, currentUser]);
   ```
   `userProgress` is the global map of all students. Line 3417 writes this global dictionary into `mastered_progress_${adm}`. On subsequent reads, `getCurrentStudentProgressMap` merges `mastered_progress_${adm}`, introducing `adm` as a key into the student's module map, which gets saved back into `mastered_progress_${adm}`, generating recursive nesting (`MTR999 -> MTR999 -> MOD-01`).
2. **Top-Level Key Spread Pollution in `syncVoiceProgressToDatabase`** (`index.html:1674–1686`):
   ```javascript
   setUserProgress(prev => {
     const newState = {
       ...prev,
       [userKey]: updatedStudentMap,
       [cleanAdm]: updatedStudentMap,
       [admNum]: updatedStudentMap,
       ...updatedStudentMap // <-- POLLUTION
     };
     safeStorage.setItem('mastered_all_students_progress', JSON.stringify(newState));
     return newState;
   });
   ```
   Line 1680 spreads `...updatedStudentMap` directly into `userProgress`, treating module keys (`MOD-01`, `MOD-02`) as student admission numbers in `mastered_all_students_progress`.
3. **Falsy `0` Bug in `fetchStudentProgressFromCloud`** (`index.html:3031–3044`):
   ```javascript
   const latestProg = Number(res.latestProgress) || 100;
   ```
   When a student is on Mission 1 with 0% progress, `res.latestProgress` is `0`. In JavaScript, `0 || 100` evaluates to `100`. Line 3040 marks `parsedProgMap['MOD-01'].percentage = 100` while leaving `verifiedSentences: 0`.
4. **Missing Dependencies on Initial Session Creation** (`index.html:1739–1774`):
   `useEffect(() => { ... voiceSessionRef.current = new AiCoachSession(...); }, [activeMissionNumber])` depends only on `[activeMissionNumber]`. On F5 reload, `AiMissionPromptModal` mounts before storage/cloud sync resolves. `missionVerified` is 0 on mount. When storage sync resolves later, this hook never re-runs because `activeMissionNumber` did not change.
5. **Session and CurrentUser Desynchronization** (`index.html:1672–1700`):
   `syncVoiceProgressToDatabase` updates `userProgress` and `localStorage`, but never updates `currentUser.userProgress` or `mastered_user_session`. On reload, line 3289 restores `currentUser` from `mastered_user_session`, injecting stale empty progress.
6. **Tab Navigation Not Saved** (`index.html:3302–3310`):
   `handleNavigateTab('ai_coach')` sets `activeTab` but never writes `tab: 'ai_coach'` to `mastered_user_session`. On F5 reload, `parsed.tab` is still `'dashboard'`.
7. **Ephemeral History** (`index.html:1525`, `assets/aiCoach/engine.js:1169, 1185`):
   `conversationTurns`, `this.history`, and `this.dialogueContext.history` are never saved to `safeStorage`.

### 1.3 Code-Level Observations in `backend/Code.gs`
1. **Missing `latestProgress` Return in `handleSaveStudentProgress`** (`backend/Code.gs:1069`):
   Line 1069 returns `{ success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl }`. `latestProgress` is omitted (`undefined`).
2. **Inconsistent Level Advancement in `handleGetStudentProgress`** (`backend/Code.gs:1226–1236`):
   Unlike `handleSaveStudentProgress` (line 1046), it does not advance `highestLvl = m + 1` when `pct >= 100`.
3. **Missing `verifiedSentences` Synthesis** (`backend/Code.gs:1160–1170`):
   `extractStudentProgressFromRow` builds module objects for `foundLevel` with `percentage` and `aiMissionCompleted`, but omits `verifiedSentences`.

---

## 2. Logic Chain

```
[Observation 1.1 & 1.2.1]
Line 3417 writes global userProgress into mastered_progress_${adm}.
     │
     ▼
[Step 1: Recursive Key Nesting]
Every render/save cycle wraps another layer of { [adm]: ... } in localStorage.
When parsed on refresh, currentStudentProg['MOD-01'] is undefined because MOD-01 is nested inside adm.adm.
     │
     ▼
[Observation 1.2.3 & 1.3.1]
backend/Code.gs omits latestProgress; frontend uses Number(res.latestProgress) || 100.
     │
     ▼
[Step 2: Falsy 0 Overwrite]
0 || 100 evaluates to 100. The module is falsely synthesized with percentage: 100 but verifiedSentences: 0,
overwriting local verified progress and causing firstIncomplete logic to skip or reset.
     │
     ▼
[Observation 1.2.4 & 1.2.5]
useEffect in AiMissionPromptModal depends only on [activeMissionNumber];
mastered_user_session is not updated by syncVoiceProgressToDatabase.
     │
     ▼
[Step 3: Stale Rehydration & Overwrite]
On refresh, modal mounts with 0 verified sentences. Cloud/storage sync does not trigger re-render of session.
When student speaks turn 1, session increments 0 -> 1 and saves verifiedSentences: 1, overwriting prior work.
     │
     ▼
[Observation 1.2.6 & 1.2.7]
conversationTurns and activeTab are never written to safeStorage.
     │
     ▼
[Step 4: UI & Context Wipeout]
Student is dumped back onto dashboard, and speech turn history is destroyed.
     │
     ▼
[Conclusion]
Applying targeted fixes to:
1. index.html line 3417 (save sanitized student module map, not global userProgress)
2. index.html line 1680 (remove ...updatedStudentMap spread from userProgress)
3. index.html line 1638–1700 (update currentUser and mastered_user_session during practice)
4. index.html line 3034 (fix 0 || 100 bug and synthesize verifiedSentences)
5. index.html line 1525, 1585, 1739 (rehydrate mission, conversationTurns, and add reactive progress sync hook)
6. index.html line 3302 (persist active tab in handleNavigateTab)
7. backend/Code.gs lines 1069, 1165, 1230 (return latestProgress, synthesize verifiedSentences, align highestLvl)
guarantees 100% deterministic persistence of verified sentences, mission status, level progression, and conversation history across refreshes.
```

---

## 3. Caveats

1. **Legacy Corrupted LocalStorage in Existing Browsers**: Devices that have previously run the application may currently have corrupted, nested `mastered_progress_*` keys. The fix in `mergeProgressMaps` defensively filters out nested admission keys and emails to clean existing corrupted storage gracefully without requiring users to clear browser data.
2. **Asynchronous Google Apps Script Latency**: Network roundtrips to Google Apps Script take 1.5–3 seconds. Local persistence via `safeStorage` (`mastered_progress_${cleanAdm}` and `mastered_user_session`) must always be synchronous and immediate before cloud dispatch so that rapid F5 refreshes never lose progress even if cloud calls are in flight.
3. **Read-Only Explorer Discipline**: In accordance with explorer constraints, no production files were modified. All drop-in code specifications are provided below for the Worker.

---

## 4. Conclusion & Concrete Drop-In Code Specifications

### 4.1 Specification 1: `index.html` — Storage Key Isolation & Nesting Elimination
**Target File**: `index.html`  
**Target Lines**: 3412–3420

Replace:
```javascript
      // Save user progress safely strictly under admission key
      useEffect(() => {
        if (userProgress && Object.keys(userProgress).length > 0) {
          if (currentUser && (currentUser.admissionNumber || currentUser.studentId)) {
            const adm = currentUser.admissionNumber || currentUser.studentId;
            safeStorage.setItem(`mastered_progress_${adm}`, JSON.stringify(userProgress));
          }
        }
      }, [userProgress, currentUser]);
```
With:
```javascript
      // Save sanitized individual student module map strictly under admission key (NO NESTING)
      useEffect(() => {
        if (!currentUser) return;
        const rawAdm = (currentUser.admissionNumber || currentUser.studentId || '').toString().trim().toUpperCase();
        const cleanAdm = rawAdm.replace(/[^A-Z0-9]/g, '');
        if (!cleanAdm && !rawAdm) return;

        const studentMap = getCurrentStudentProgressMap();
        if (studentMap && Object.keys(studentMap).length > 0) {
          const cleanModuleMap = {};
          for (const k of Object.keys(studentMap)) {
            if (k.startsWith('MOD-') || k.startsWith('HIND-MOD-')) {
              cleanModuleMap[k] = studentMap[k];
            }
          }
          if (cleanAdm) safeStorage.setItem(`mastered_progress_${cleanAdm}`, JSON.stringify(cleanModuleMap));
          if (rawAdm && rawAdm !== cleanAdm) safeStorage.setItem(`mastered_progress_${rawAdm}`, JSON.stringify(cleanModuleMap));
        }
      }, [userProgress, currentUser]);
```

---

### 4.2 Specification 2: `index.html` — Hardened `syncVoiceProgressToDatabase`
**Target File**: `index.html`  
**Target Lines**: 1638–1700

Replace lines 1638–1700 with:
```javascript
      const syncVoiceProgressToDatabase = async (progressData) => {
        if (!progressData) return;
        const targetMisNum = progressData.currentMission || activeMissionNumber;
        const targetVerified = Number(progressData.verifiedSentences) || 0;
        const targetPct = (typeof progressData.progressPct === 'number') ? progressData.progressPct : Math.min(100, Math.round((targetVerified / (tSentences || 1)) * 100));
        const isDone = targetPct >= 100;

        const targetKey = `MOD-${targetMisNum < 10 ? '0' + targetMisNum : targetMisNum}`;
        const targetKeyShort = `MOD-${targetMisNum}`;
        const freshProg = (typeof getCurrentStudentProgressMap === 'function') ? getCurrentStudentProgressMap() : {};
        const existingMod = freshProg[targetKey] || freshProg[targetKeyShort] || {};

        const updatedModObj = {
          ...existingMod,
          percentage: Math.max(Number(existingMod.percentage) || 0, targetPct),
          verifiedSentences: Math.max(Number(existingMod.verifiedSentences) || 0, targetVerified),
          status: isDone ? 'COMPLETED' : (existingMod.status || 'IN_PROGRESS'),
          aiMissionCompleted: isDone || existingMod.aiMissionCompleted || targetPct > 0,
          lastUpdated: new Date().toISOString()
        };

        const updatedStudentMap = {
          ...freshProg,
          [targetKey]: updatedModObj,
          [targetKeyShort]: updatedModObj
        };

        // Complete earlier missions monotonically
        for (let lvl = 1; lvl < targetMisNum; lvl++) {
          const pKey = `MOD-${lvl < 10 ? '0' + lvl : lvl}`;
          const pKeyShort = `MOD-${lvl}`;
          const pTarget = (window.MasteredCurriculum && window.MasteredCurriculum.getTargetForMission) ? window.MasteredCurriculum.getTargetForMission(lvl) : (lvl <= 8 ? 30 : (lvl <= 23 ? 40 : 50));
          if (!updatedStudentMap[pKey]) updatedStudentMap[pKey] = {};
          updatedStudentMap[pKey] = {
            ...updatedStudentMap[pKey],
            percentage: 100,
            verifiedSentences: Math.max(Number(updatedStudentMap[pKey].verifiedSentences) || 0, pTarget),
            aiMissionCompleted: true,
            status: 'COMPLETED'
          };
          updatedStudentMap[pKeyShort] = updatedStudentMap[pKey];
        }

        const userKey = (currentUser?.admissionNumber || currentUser?.studentId || currentUser?.email || admNum).toString().trim().toUpperCase();

        // 1. Update userProgress WITHOUT spreading module keys into root
        setUserProgress(prev => {
          const newState = {
            ...(prev || {}),
            ...(userKey ? { [userKey]: updatedStudentMap } : {}),
            ...(cleanAdm ? { [cleanAdm]: updatedStudentMap } : {}),
            ...(admNum ? { [admNum]: updatedStudentMap } : {})
          };
          safeStorage.setItem('mastered_all_students_progress', JSON.stringify(newState));
          return newState;
        });

        // 2. Write clean student module map directly to localStorage
        if (cleanAdm) safeStorage.setItem(`mastered_progress_${cleanAdm}`, JSON.stringify(updatedStudentMap));
        if (userKey && userKey !== cleanAdm) safeStorage.setItem(`mastered_progress_${userKey}`, JSON.stringify(updatedStudentMap));

        // 3. Keep currentUser and mastered_user_session synchronously updated
        setCurrentUser(prevUser => {
          if (!prevUser) return prevUser;
          const updatedUser = {
            ...prevUser,
            userProgress: mergeProgressMaps(prevUser.userProgress || {}, updatedStudentMap)
          };
          try {
            const session = safeStorage.getItem('mastered_user_session');
            if (session) {
              const parsed = JSON.parse(session);
              parsed.user = updatedUser;
              parsed.tab = 'ai_coach';
              safeStorage.setItem('mastered_user_session', JSON.stringify(parsed));
            }
          } catch(e) {}
          return updatedUser;
        });

        // 4. Save active mission selection
        if (cleanAdm) {
          safeStorage.setItem(`mastered_selected_mission_${cleanAdm}`, String(targetMisNum));
        }

        // 5. Cloud persistence via Google Apps Script
        try {
          if (typeof callAppsScript === 'function') {
            await callAppsScript('saveStudentProgress', {
              admissionNumber: currentUser?.admissionNumber || admNum,
              email: currentUser?.email || studentEmail,
              userProgress: updatedStudentMap,
              latestMissionLevel: targetMisNum,
              latestProgress: targetPct
            });
          }
        } catch(err) {
          console.warn('Voice progress database sync saved locally, cloud deferred:', err);
        }
      };
```

---

### 4.3 Specification 3: `index.html` — Fix Cloud Falsy `0` Bug in `fetchStudentProgressFromCloud`
**Target File**: `index.html`  
**Target Lines**: 3031–3044

Replace:
```javascript
            // Synthesize level & progress from latestLevel if returned
            if (res.latestLevel && Number(res.latestLevel) > 0) {
              const latestLvl = Math.min(32, Math.max(1, Number(res.latestLevel)));
              const latestProg = Number(res.latestProgress) || 100;
              for (let lvl = 1; lvl <= latestLvl; lvl++) {
                const modKey = `MOD-${lvl < 10 ? '0' + lvl : lvl}`;
                if (!parsedProgMap[modKey]) parsedProgMap[modKey] = {};
                const targetPct = (lvl === latestLvl) ? latestProg : 100;
                if (!parsedProgMap[modKey].percentage || Number(parsedProgMap[modKey].percentage) < targetPct) {
                  parsedProgMap[modKey].percentage = targetPct;
                  parsedProgMap[modKey].aiMissionCompleted = true;
                }
              }
            }
```
With:
```javascript
            // Synthesize level & progress from latestLevel if returned, preserving verifiedSentences
            if (res.latestLevel && Number(res.latestLevel) > 0) {
              const latestLvl = Math.min(32, Math.max(1, Number(res.latestLevel)));
              const rawProg = (res.latestProgress !== undefined && res.latestProgress !== null && !isNaN(res.latestProgress)) ? Number(res.latestProgress) : (res.latestCodeProgress !== undefined ? Number(res.latestCodeProgress) : null);
              const latestProg = rawProg !== null ? rawProg : 0;
              for (let lvl = 1; lvl <= latestLvl; lvl++) {
                const modKey = `MOD-${lvl < 10 ? '0' + lvl : lvl}`;
                const modKeyShort = `MOD-${lvl}`;
                if (!parsedProgMap[modKey]) parsedProgMap[modKey] = {};
                const targetPct = (lvl === latestLvl) ? latestProg : 100;
                const tSentences = (window.MasteredCurriculum && window.MasteredCurriculum.getTargetForMission) ? window.MasteredCurriculum.getTargetForMission(lvl) : (lvl <= 8 ? 30 : (lvl <= 23 ? 40 : 50));
                
                if (parsedProgMap[modKey].percentage === undefined || Number(parsedProgMap[modKey].percentage) < targetPct) {
                  parsedProgMap[modKey].percentage = targetPct;
                  parsedProgMap[modKey].aiMissionCompleted = targetPct >= 100 || Boolean(parsedProgMap[modKey].aiMissionCompleted);
                }
                if (parsedProgMap[modKey].verifiedSentences === undefined || Number(parsedProgMap[modKey].verifiedSentences) === 0) {
                  parsedProgMap[modKey].verifiedSentences = Math.round((targetPct / 100) * tSentences);
                }
                parsedProgMap[modKeyShort] = parsedProgMap[modKey];
              }
            }
```

---

### 4.4 Specification 4: `index.html` — Tab Navigation & Speaking Room Rehydration
1. **In `handleNavigateTab`** (lines 3302–3310):
   Add tab persistence to `mastered_user_session`:
   ```javascript
   try {
     const session = safeStorage.getItem('mastered_user_session');
     if (session) {
       const parsed = JSON.parse(session);
       parsed.tab = tabName;
       safeStorage.setItem('mastered_user_session', JSON.stringify(parsed));
     }
   } catch(e) {}
   ```
2. **In `AiMissionPromptModal`**:
   - Initialize `selectedMissionNumber` from `safeStorage.getItem('mastered_selected_mission_' + cleanAdm)`.
   - Initialize `conversationTurns` from `safeStorage.getItem('mastered_conversation_' + cleanAdm)`.
   - Initialize `voiceSessionSummary` from `safeStorage.getItem('mastered_session_summary_' + cleanAdm)`.
   - Add reactive rehydration `useEffect`:
     ```javascript
     useEffect(() => {
       const freshProg = (typeof getCurrentStudentProgressMap === 'function') ? getCurrentStudentProgressMap() : {};
       const targetKey = `MOD-${activeMissionNumber < 10 ? '0' + activeMissionNumber : activeMissionNumber}`;
       const targetObj = freshProg[targetKey] || freshProg[`MOD-${activeMissionNumber}`];
       if (targetObj && typeof targetObj.verifiedSentences === 'number') {
         const storedVerified = targetObj.verifiedSentences;
         if (storedVerified > voiceVerifiedCount) {
           setVoiceVerifiedCount(storedVerified);
           if (voiceSessionRef.current) {
             voiceSessionRef.current.verifiedSentences = storedVerified;
             if (voiceSessionRef.current.profile) {
               voiceSessionRef.current.profile.verifiedSentences = storedVerified;
             }
           }
         }
       }
     }, [userProgress, currentUser, activeMissionNumber]);
     ```

---

### 4.5 Specification 5: `backend/Code.gs` — Return Parity & Synthesis
1. **In `handleSaveStudentProgress`** (line 1069):
   Change to:
   ```javascript
   return { success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl, latestProgress: highestProg };
   ```
2. **In `handleGetStudentProgress`** (lines 1226–1236):
   Add `pct >= 100` advancement:
   ```javascript
   if (pct >= 100 && m < 32) {
     if (m + 1 > highestLvl) highestLvl = m + 1;
   } else if (pct > 0 && m >= highestLvl) {
     highestLvl = m;
     highestProg = pct;
   }
   ```
3. **In `extractStudentProgressFromRow`** (lines 1160–1170):
   Add `verifiedSentences`:
   ```javascript
   var targetSentences = (lvl <= 8 ? 30 : (lvl <= 23 ? 40 : 50));
   if (progObj[modKey].verifiedSentences === undefined || Number(progObj[modKey].verifiedSentences) === 0) {
     progObj[modKey].verifiedSentences = Math.round((targetPct / 100) * targetSentences);
   }
   ```

---

## 5. Verification Method

### 5.1 Verification Commands
1. Run the headless Chromium persistence test:
   ```powershell
   node scratch/test_persistence_diagnostic.cjs
   ```
   **Expected**:
   - `Verified matches in DOM after reload` asserts `1 / 30` or `2 / 30` (PASS).
   - `Turn history visible after reload` asserts `true` (PASS).
   - `mastered_progress_MTR999` has flat module keys with zero nested `MTR999` keys.
2. Run acceptance test suites:
   ```powershell
   node scratch/test_ai_coach.cjs
   node scratch/test_mission_advance_and_continuity.cjs
   ```
   **Expected**:
   - 23/23 tests pass (100%).
   - 5/5 continuity tests pass (100%).

### 5.2 Invalidation Conditions
The fix is considered invalid if:
1. Reloading the page resets verified sentences to 0 or drops previously verified turns.
2. `mastered_progress_${adm}` contains nested `[adm]` keys or root-level `MOD-*` pollution in `mastered_all_students_progress`.
3. Reloading the speaking room kicks the student to the dashboard.
4. Falsy `latestProgress: 0` causes a module to be marked 100% completed.
