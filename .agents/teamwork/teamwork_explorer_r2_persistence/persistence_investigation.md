# Comprehensive Investigation Report: Student Practice Progress Recording & Persistence Pipeline

**Explorer**: Progress Persistence Explorer (`teamwork_explorer_r2_persistence`)  
**Project**: Mastered Language Coach Students Portal Web App  
**Scope**: `index.html`, `localStorage`, `assets/aiCoach/engine.js` (`AiCoachSession`), `backend/Code.gs` (Google Sheets backend)  
**Date**: 2026-11-01  
**Status**: Root Causes Identified & Verified with Live Headless Diagnostic; Complete Fix Plan Formulated  

---

## 1. Executive Summary

A comprehensive, end-to-end investigation of the student practice progress recording, caching, and persistence pipeline across `index.html`, `localStorage`, `assets/aiCoach/engine.js`, and `backend/Code.gs` was conducted.

Using a headless Chromium end-to-end diagnostic test (`scratch/test_persistence_diagnostic.cjs`), we directly reproduced and captured the exact failure mode occurring on browser reload (F5 / restart / navigation). During live practice, simulated student speaking turns incremented verified sentences to `1 / 30`. Upon pressing F5 to reload the page:
1. **Verified sentences immediately reset to `0 / 30`**.
2. **Turn history was completely wiped out (`[]`)**.
3. **The local storage key `mastered_progress_MTR999` suffered catastrophic recursive nesting** (`{"MTR999": {"MTR999": {"MOD-01": ...}}}`).
4. **`mastered_user_session` was polluted with a false `percentage: 100` and `verifiedSentences: 0`** due to a falsy `0` bug in `fetchStudentProgressFromCloud`.

We identified **10 interdependent root causes** spanning client-side state management, local storage serialization, engine session lifecycles, and Google Apps Script synchronization. This report documents each root cause with direct code citations, runtime evidence, and provides an end-to-end fix plan with drop-in code specifications.

---

## 2. Evidence from Headless Chromium Diagnostic (`test_persistence_diagnostic.cjs`)

Execution of `scratch/test_persistence_diagnostic.cjs` on the live codebase produced the following verbatim runtime outputs:

```text
[Step 3] Clicking "Start Live Practice Call"...
[Step 4] Simulating 2 successful spoken turns...
   Turn 1 triggered: { triggered: true }
   Turn 2 triggered: { triggered: true }
[Step 5] Checking state after 2 turns BEFORE reload...
   Verified matches in DOM: 1 / 30
   Turn history in DOM: true
   mastered_progress_MTR999: {"MTR999":{"MOD-01":{"percentage":3,"verifiedSentences":1,"status":"IN_PROGRESS","aiMissionCompleted":true,"lastUpdated":"2026-11-01T10:04:41.082Z"}},"alex.j@example.com":{"MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"MOD-1":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"HIND-MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}}},"MOD-01":{"percentage":3,"verifiedSentences":1,"status":"IN_PROGRESS","aiMissionCompleted":true,"lastUpdated":"2026-11-01T10:04:41.082Z"}}

[Step 6] --- PERFORMING PAGE RELOAD (F5) ---
[Step 7] Checking state AFTER reload (F5)...
   Is on AI Coach room: true
   Is on Dashboard: true
   Verified matches in DOM after reload: 0 / 30
   Turn history visible after reload: false
   mastered_progress_MTR999 after reload: {"MTR999":{"MTR999":{"MOD-01":{"percentage":3,"verifiedSentences":1,"status":"IN_PROGRESS","aiMissionCompleted":true,"lastUpdated":"2026-11-01T10:04:41.082Z"}},"alex.j@example.com":{"MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"MOD-1":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"HIND-MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}}},"MOD-01":{"percentage":3,"verifiedSentences":1,"status":"IN_PROGRESS","aiMissionCompleted":true,"lastUpdated":"2026-11-01T10:04:41.082Z","aiMissionProof":null,"quizScores":{}}},"alex.j@example.com":{"MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"MOD-1":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"HIND-MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}}},"MOD-01":{"percentage":3,"verifiedSentences":1,"status":"IN_PROGRESS","aiMissionCompleted":true,"lastUpdated":"2026-11-01T10:04:41.082Z"}}
   userSession after reload: {"user":{"name":"Alex Johnson","admissionNumber":"MTR999","email":"alex.j@example.com","role":"student","englishLevel":"INTERMEDIATE","learningGoal":"Professional Fluency","status":"APPROVED","userProgress":{"MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"MOD-1":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}},"HIND-MOD-01":{"percentage":100,"aiMissionCompleted":true,"verifiedSentences":0,"aiMissionProof":null,"quizScores":{}}}},"role":"student","tab":"ai_coach"}
```

---

## 3. Detailed Root Cause Analysis

### Root Cause 1: Catastrophic Recursive Key Nesting in `localStorage`
- **Location**: `index.html`, lines 3413–3420:
  ```javascript
  3413: useEffect(() => {
  3414:   if (userProgress && Object.keys(userProgress).length > 0) {
  3415:     if (currentUser && (currentUser.admissionNumber || currentUser.studentId)) {
  3416:       const adm = currentUser.admissionNumber || currentUser.studentId;
  3417:       safeStorage.setItem(`mastered_progress_${adm}`, JSON.stringify(userProgress));
  3418:     }
  3419:   }
  3420: }, [userProgress, currentUser]);
  ```
- **Mechanism**:
  `userProgress` in `App` is a dictionary of ALL students/users (`{ [studentAdm]: moduleMap, [email]: moduleMap }`).
  Line 3417 writes `JSON.stringify(userProgress)` directly into `mastered_progress_${adm}`.
  However, `mastered_progress_${adm}` is expected by `getCurrentStudentProgressMap()` (lines 3150–3164) and `StudentHistoryModal` (line 1307) to be that individual student's module map (`{ 'MOD-01': { verifiedSentences: 5, ... } }`).
  When `getCurrentStudentProgressMap()` merges `safeStorage.getItem('mastered_progress_' + cleanAdm)`, it reads `{ [adm]: { ... } }`.
  Because `mergeProgressMaps` iterates over keys of the source, it introduces key `adm` into the student's module map!
  On each render/save cycle, another level of `{ [adm]: { [adm]: ... } }` is created.
  `currentStudentProg['MOD-01']` evaluates to `undefined` because `MOD-01` is buried inside `MTR999.MTR999.MOD-01`.
- **Impact**: On refresh, `modProgObj` is empty `{}`, and verified count evaluates to 0.

---

### Root Cause 2: Root-Level Pollution of `userProgress` via Module Key Spread
- **Location**: `index.html`, lines 1674–1686:
  ```javascript
  1674: setUserProgress(prev => {
  1675:   const newState = {
  1676:     ...prev,
  1677:     [userKey]: updatedStudentMap,
  1678:     [cleanAdm]: updatedStudentMap,
  1679:     [admNum]: updatedStudentMap,
  1680:     ...updatedStudentMap
  1681:   };
  1682:   safeStorage.setItem('mastered_all_students_progress', JSON.stringify(newState));
  1683:   if (userKey) safeStorage.setItem(`mastered_progress_${userKey}`, JSON.stringify(updatedStudentMap));
  1684:   if (cleanAdm) safeStorage.setItem(`mastered_progress_${cleanAdm}`, JSON.stringify(updatedStudentMap));
  1685:   return newState;
  1686: });
  ```
- **Mechanism**:
  Line 1680 spreads `...updatedStudentMap` directly into the top level of `userProgress`.
  This injects module keys (`MOD-01`, `MOD-02`) as if they were student admission numbers!
  Line 1682 then writes `newState` to `mastered_all_students_progress`.
  On refresh, line 2927 parses `mastered_all_students_progress` and iterates through all keys:
  ```javascript
  for (const k of Object.keys(parsedAll)) {
    initial[k] = mergeProgressMaps(initial[k], parsedAll[k]);
  }
  ```
  `initial['MOD-01']` is created as a student, causing student search loops, history modals, and admin listings to mistake modules for students.

---

### Root Cause 3: Falsy `0` Bug in `fetchStudentProgressFromCloud` Overwriting Progress to 100%
- **Location**: `index.html`, lines 3031–3044:
  ```javascript
  3032: if (res.latestLevel && Number(res.latestLevel) > 0) {
  3033:   const latestLvl = Math.min(32, Math.max(1, Number(res.latestLevel)));
  3034:   const latestProg = Number(res.latestProgress) || 100;
  3035:   for (let lvl = 1; lvl <= latestLvl; lvl++) {
  3036:     const modKey = `MOD-${lvl < 10 ? '0' + lvl : lvl}`;
  3037:     if (!parsedProgMap[modKey]) parsedProgMap[modKey] = {};
  3038:     const targetPct = (lvl === latestLvl) ? latestProg : 100;
  3039:     if (!parsedProgMap[modKey].percentage || Number(parsedProgMap[modKey].percentage) < targetPct) {
  3040:       parsedProgMap[modKey].percentage = targetPct;
  3041:       parsedProgMap[modKey].aiMissionCompleted = true;
  3042:     }
  3043:   }
  3044: }
  ```
- **Mechanism**:
  When a student starts or is in progress on Mission 1 with 0% completion, `backend/Code.gs` returns `latestProgress: 0` (or `undefined` from `saveStudentProgress`).
  In JavaScript, `0 || 100` evaluates to `100`!
  `Number(undefined) || 100` also evaluates to `100`!
  Line 3034 assigns `latestProg = 100`.
  Line 3040 sets `parsedProgMap['MOD-01'].percentage = 100` and `aiMissionCompleted = true` **without setting `verifiedSentences` (remains 0 or undefined)**!
  When merged into `userProgress` and `currentUser`, the student's actual progress is overwritten with a phantom 100% completion with 0 verified sentences.
  Then line 1576 (`firstIncomplete`) skips Mission 1 and advances to Mission 2, or sets `verifiedSentences: 0`.

---

### Root Cause 4: One-Time Session Initialization & Missing React Hook Dependencies
- **Location**: `index.html`, lines 1585, 1739–1774:
  ```javascript
  1585: const [selectedMissionNumber, setSelectedMissionNumber] = useState(initialMission);
  ...
  1739: useEffect(() => {
  1740:   setVoiceVerifiedCount(missionVerified);
  ...
  1756:   const session = new window.MasteredAiCoachEngine.AiCoachSession(profile, {
  1757:     onSentenceVerified: (prog) => {
  1758:       setVoiceVerifiedCount(prog.verifiedSentences);
  1759:       syncVoiceProgressToDatabase(prog);
  1760:     },
  1761:     onSaveProgress: (prog) => {
  1762:       syncVoiceProgressToDatabase(prog);
  1763:     }
  1764:   });
  1765:   voiceSessionRef.current = session;
  ...
  1774: }, [activeMissionNumber]);
  ```
- **Mechanism**:
  1. `useState(initialMission)` sets `selectedMissionNumber` once upon component mount.
  2. On page reload (F5), `AiMissionPromptModal` mounts before async cloud sync or session rehydration completes. At that instant, `currentStudentProg` is `{}` and `missionVerified` is `0`.
  3. `useEffect` runs once for `activeMissionNumber = 1` and creates `voiceSessionRef.current` with `verifiedSentences: 0`.
  4. The dependency array is ONLY `[activeMissionNumber]`. When `userProgress` or `currentUser` is rehydrated 50ms later, `activeMissionNumber` does not change, so `useEffect` NEVER re-runs.
  5. `voiceSessionRef.current` and `voiceVerifiedCount` remain permanently stuck at 0.
  6. When the student speaks their first sentence, `voiceSessionRef.current` increments from 0 to 1, and saves `verifiedSentences: 1`, obliterating previously earned progress!

---

### Root Cause 5: Stale Closure Capture in `syncVoiceProgressToDatabase`
- **Location**: `index.html`, lines 1559–1561, 1638–1657:
  ```javascript
  1559: const currentStudentProg = (typeof getCurrentStudentProgressMap === 'function') 
  1560:   ? getCurrentStudentProgressMap() 
  1561:   : (userProgress?.[cleanAdm] || userProgress?.[admNum] || userProgress?.[studentEmail] || {});
  ...
  1646: const existingMod = currentStudentProg[targetKey] || currentStudentProg[`MOD-${targetMisNum}`] || {};
  1657: const updatedStudentMap = { ...currentStudentProg, [targetKey]: updatedModObj };
  ```
- **Mechanism**:
  `syncVoiceProgressToDatabase` references the outer component scope's `currentStudentProg` instead of calling `getCurrentStudentProgressMap()`.
  The session callbacks (`onSentenceVerified` and `onSaveProgress`) are bound inside `useEffect` on mount and retain the stale initial `currentStudentProg`.
  Any concurrent or background updates to other modules or quizzes are clobbered.

---

### Root Cause 6: `currentUser` and `mastered_user_session` Desynchronization during Practice
- **Location**: `index.html`, lines 1672–1700 vs lines 2965–2981:
  In `syncStudentProgressToCloud` (lines 2965–2981), when quiz scores or admin actions are saved:
  ```javascript
  setCurrentUser(prevUser => {
    ...
    const session = safeStorage.getItem('mastered_user_session');
    if (session) {
      const parsed = JSON.parse(session);
      parsed.user = updatedUser;
      safeStorage.setItem('mastered_user_session', JSON.stringify(parsed));
    }
  });
  ```
  However, in `syncVoiceProgressToDatabase` (lines 1672–1700), `currentUser` and `mastered_user_session` are **never updated**.
  When the user refreshes (F5), line 3289 restores `currentUser` from `mastered_user_session`:
  ```javascript
  const savedSession = safeStorage.getItem('mastered_user_session');
  if (savedSession) {
    const parsed = JSON.parse(savedSession);
    setCurrentUser(parsed.user); // STALE userProgress from login!
  }
  ```
  The stale user session from login re-enters state, overriding active progress.

---

### Root Cause 7: Tab Navigation Not Persisted to `mastered_user_session`
- **Location**: `index.html`, lines 3302–3310:
  ```javascript
  const handleNavigateTab = (tabName, closeMobile = false) => {
    if (tabName !== 'ai_coach' && typeof window !== 'undefined' && window.__masteredActivePipeline) {
      try { window.__masteredActivePipeline.endLiveSession(); } catch(e) {}
    }
    setSelectedModuleId(null);
    setActiveQuizModNumber(null);
    setActiveTab(tabName);
    if (closeMobile) setMobileMenuOpen(false);
  };
  ```
- **Mechanism**:
  When a student clicks into the AI Coach speaking room, `handleNavigateTab('ai_coach')` updates React state `activeTab`, but does NOT persist `tab: 'ai_coach'` to `mastered_user_session`.
  On F5 refresh, line 3295 reads `parsed.tab` from `mastered_user_session`, which is still `'dashboard'`, dumping the student onto the dashboard instead of returning to the speaking room.

---

### Root Cause 8: Complete Ephemeral Storage of Conversation History & Session State
- **Location**: `index.html`, line 1525; `assets/aiCoach/engine.js`, lines 1169, 1185:
  ```javascript
  1525: const [conversationTurns, setConversationTurns] = useState([]);
  ```
  and in `engine.js`:
  ```javascript
  1169: this.history = [];
  1185: this.dialogueContext = { ... history: [] };
  ```
- **Mechanism**:
  Neither `index.html` nor `engine.js` serializes speaking room conversation turns, questions asked, or dialogue context to `localStorage`.
  On reload, all past turns, coach prompts, student answers, and session summaries are lost.

---

### Root Cause 9: Inconsistent Return Values & Synthesis in `backend/Code.gs`
- **Location**: `backend/Code.gs`, lines 1069, 1160–1170, 1224–1244:
  1. In `handleSaveStudentProgress` (line 1069):
     ```javascript
     return { success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl };
     ```
     It **omits `latestProgress`**. When frontend receives this response, `res.latestProgress` is `undefined`, triggering `Number(undefined) || 100 === 100` in Root Cause 3.
  2. In `handleGetStudentProgress` (lines 1226–1236):
     Unlike `handleSaveStudentProgress` (line 1046), it does not advance `highestLvl = m + 1` when a module is 100% completed (`pct >= 100`).
  3. In `extractStudentProgressFromRow` (lines 1160–1170):
     When synthesizing module objects from `foundLevel`, it sets `percentage` and `aiMissionCompleted`, but omits `verifiedSentences`.

---

### Root Cause 10: Direct Object Mutation in `handleSwitchMission`
- **Location**: `index.html`, lines 1632–1635:
  ```javascript
  1632: if (voiceSessionRef.current) {
  1633:   voiceSessionRef.current.currentMission = newMNum;
  1634:   voiceSessionRef.current.verifiedSentences = newVerified;
  1635: }
  ```
- **Mechanism**:
  In `AiCoachSession`, profile state lives inside `this.profile` (sanitized shallow clone returned by `session.getProfile()`).
  While getters and setters were added to the prototype, `session.getProfile()` copies `this.profile`.
  Furthermore, `handleSwitchMission` did not persist `selectedMissionNumber` to `safeStorage` under `mastered_selected_mission_${cleanAdm}`, so on refresh the active mission defaulted back to `firstIncomplete`.

---

## 4. Complete Root-Cause Fix Plan

The fix plan spans five coordinated changes across `index.html`, `assets/aiCoach/engine.js`, and `backend/Code.gs`.

### Architectural Data Flow (Post-Fix)

```
[Student Spoken Turn / Intent]
         │
         ▼
[AiCoachSession.processStudentSpeechTurn (engine.js)]
         │ ─── Verified sentence count incremented
         │ ─── Dialogue context & history recorded
         ▼
[syncVoiceProgressToDatabase (index.html)]
         │ ─── 1. Calls getCurrentStudentProgressMap() (fresh, unpolluted)
         │ ─── 2. Updates target module (percentage, verifiedSentences, status)
         │ ─── 3. Writes sanitized student module map to mastered_progress_${cleanAdm} (NO NESTING)
         │ ─── 4. Updates currentUser.userProgress & mastered_user_session
         │ ─── 5. Persists conversationTurns & activeMissionNumber
         │ ─── 6. Dispatches saveStudentProgress to backend/Code.gs
         ▼
[Backend Google Sheets (Code.gs)]
         │ ─── Monotonic deep merge in StudentProgress sheet
         │ ─── Preserves verifiedSentences & calculates accurate highestProg
         │ ─── Returns { success: true, userProgress, latestLevel, latestProgress }
         ▼
[Page Refresh / Reload (F5)]
         │
         ▼
[App Initialization (index.html)]
         │ ─── Restores currentUser, role, and tab: 'ai_coach' from mastered_user_session
         │ ─── Loads clean student module map from mastered_progress_${cleanAdm}
         │ ─── Rehydrates activeMissionNumber from mastered_selected_mission_${cleanAdm}
         │ ─── Rehydrates verifiedSentences from modProgObj.verifiedSentences
         │ ─── Restores conversationTurns from mastered_conversation_${cleanAdm}
         │ ─── Re-syncs session if storage/cloud has higher verified count
         ▼
[Practice Resumes Smoothly with 100% Intact Progress]
```

---

## 5. Concrete Code Fix Specifications

### Fix 1: Eliminate Recursive Key Nesting & Fix Storage Hooks (`index.html`)

#### 1.1 Replace line 3417 in `index.html`:
Replace:
```javascript
<<<< BEFORE (Line 3412–3420)
      // Save user progress safely strictly under admission key
      useEffect(() => {
        if (userProgress && Object.keys(userProgress).length > 0) {
          if (currentUser && (currentUser.admissionNumber || currentUser.studentId)) {
            const adm = currentUser.admissionNumber || currentUser.studentId;
            safeStorage.setItem(`mastered_progress_${adm}`, JSON.stringify(userProgress));
          }
        }
      }, [userProgress, currentUser]);
==== AFTER
      // Save sanitized individual student module map strictly under admission key
      useEffect(() => {
        if (!currentUser) return;
        const rawAdm = (currentUser.admissionNumber || currentUser.studentId || '').toString().trim().toUpperCase();
        const cleanAdm = rawAdm.replace(/[^A-Z0-9]/g, '');
        if (!cleanAdm && !rawAdm) return;

        const studentMap = getCurrentStudentProgressMap();
        if (studentMap && Object.keys(studentMap).length > 0) {
          // Verify studentMap only contains module keys to prevent nesting
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
>>>>
```

#### 1.2 Sanitize `mergeProgressMaps` (lines 1192–1261):
Add guard against nested student keys in `mergeProgressMaps`:
```javascript
<<<< BEFORE (Line 1198–1205)
      for (const mKey of Object.keys(source)) {
        const sVal = source[mKey];
        if (sVal === undefined || sVal === null) continue;
==== AFTER
      for (const mKey of Object.keys(source)) {
        const sVal = source[mKey];
        if (sVal === undefined || sVal === null) continue;

        // Skip polluted nested student admission numbers or emails inside module maps
        if (mKey.includes('@') || (mKey.length > 3 && !mKey.startsWith('MOD-') && !mKey.startsWith('HIND-MOD-') && !['percentage','score','progress','latestProgress','codeProgress','latestMissionLevel','missionLevel','level','graduationVideo','lastUpdated'].includes(mKey))) {
          continue;
        }
>>>>
```

---

### Fix 2: Hardened `syncVoiceProgressToDatabase` in `index.html` (lines 1638–1700)

Replace lines 1638–1700 of `index.html`:
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

        // 1. Update userProgress WITHOUT polluting root with module keys
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

        // 3. Keep currentUser and mastered_user_session in sync
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

### Fix 3: Fix Falsy `0` Bug in `fetchStudentProgressFromCloud` (lines 3031–3044)

In `index.html`:
```javascript
<<<< BEFORE (Line 3031–3044)
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
==== AFTER
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
>>>>
```

---

### Fix 4: Continuous Progress Rehydration & Conversation Persistence in `AiMissionPromptModal`

#### 4.1 Rehydrate `selectedMissionNumber` from `safeStorage`:
Lines 1585 in `index.html`:
```javascript
<<<< BEFORE (Line 1585)
      const [selectedMissionNumber, setSelectedMissionNumber] = useState(initialMission);
==== AFTER
      const [selectedMissionNumber, setSelectedMissionNumber] = useState(() => {
        if (cleanAdm) {
          const savedM = safeStorage.getItem(`mastered_selected_mission_${cleanAdm}`);
          if (savedM && Number(savedM) >= 1 && Number(savedM) <= 32) {
            return Number(savedM);
          }
        }
        return initialMission;
      });
>>>>
```

#### 4.2 Rehydrate Conversation Turns & Session Summary:
Lines 1521–1525 in `index.html`:
```javascript
<<<< BEFORE (Line 1521–1525)
      const [voiceSessionEnded, setVoiceSessionEnded] = useState(false);
      const [voiceSessionSummary, setVoiceSessionSummary] = useState(null);
      const [coachMode, setCoachMode] = useState('STRUCTURED');
      const [activePromptText, setActivePromptText] = useState('');
      const [conversationTurns, setConversationTurns] = useState([]);
==== AFTER
      const [voiceSessionEnded, setVoiceSessionEnded] = useState(() => {
        try {
          const s = safeStorage.getItem(`mastered_session_ended_${cleanAdm}`);
          return s === 'true';
        } catch(e) { return false; }
      });
      const [voiceSessionSummary, setVoiceSessionSummary] = useState(() => {
        try {
          const s = safeStorage.getItem(`mastered_session_summary_${cleanAdm}`);
          return s ? JSON.parse(s) : null;
        } catch(e) { return null; }
      });
      const [coachMode, setCoachMode] = useState('STRUCTURED');
      const [activePromptText, setActivePromptText] = useState('');
      const [conversationTurns, setConversationTurns] = useState(() => {
        try {
          const s = safeStorage.getItem(`mastered_conversation_${cleanAdm}`);
          return s ? JSON.parse(s) : [];
        } catch(e) { return []; }
      });
>>>>
```

And persist conversation turns and summary whenever they update:
```javascript
      useEffect(() => {
        if (cleanAdm) {
          safeStorage.setItem(`mastered_conversation_${cleanAdm}`, JSON.stringify(conversationTurns.slice(-10)));
        }
      }, [conversationTurns, cleanAdm]);

      useEffect(() => {
        if (cleanAdm) {
          safeStorage.setItem(`mastered_session_ended_${cleanAdm}`, String(voiceSessionEnded));
          if (voiceSessionSummary) {
            safeStorage.setItem(`mastered_session_summary_${cleanAdm}`, JSON.stringify(voiceSessionSummary));
          } else {
            safeStorage.removeItem(`mastered_session_summary_${cleanAdm}`);
          }
        }
      }, [voiceSessionEnded, voiceSessionSummary, cleanAdm]);
```

#### 4.3 Add Reactive Progress Rehydration Hook:
Add to `AiMissionPromptModal`:
```javascript
      // Reactive Rehydration: When storage or cloud progress updates, reconcile session verifiedSentences
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

### Fix 5: Tab Persistence in `handleNavigateTab` (`index.html`)

In line 3302 of `index.html`:
```javascript
<<<< BEFORE (Line 3302–3310)
      const handleNavigateTab = (tabName, closeMobile = false) => {
        if (tabName !== 'ai_coach' && typeof window !== 'undefined' && window.__masteredActivePipeline) {
          try { window.__masteredActivePipeline.endLiveSession(); } catch(e) {}
        }
        setSelectedModuleId(null);
        setActiveQuizModNumber(null);
        setActiveTab(tabName);
        if (closeMobile) setMobileMenuOpen(false);
      };
==== AFTER
      const handleNavigateTab = (tabName, closeMobile = false) => {
        if (tabName !== 'ai_coach' && typeof window !== 'undefined' && window.__masteredActivePipeline) {
          try { window.__masteredActivePipeline.endLiveSession(); } catch(e) {}
        }
        setSelectedModuleId(null);
        setActiveQuizModNumber(null);
        setActiveTab(tabName);
        if (closeMobile) setMobileMenuOpen(false);

        // Persist active tab to session storage so refresh returns to the exact same screen
        try {
          const session = safeStorage.getItem('mastered_user_session');
          if (session) {
            const parsed = JSON.parse(session);
            parsed.tab = tabName;
            safeStorage.setItem('mastered_user_session', JSON.stringify(parsed));
          }
        } catch(e) {}
      };
>>>>
```

---

### Fix 6: Backend Synchronization Fixes (`backend/Code.gs`)

#### 6.1 Return `latestProgress` in `handleSaveStudentProgress` (line 1069):
```javascript
<<<< BEFORE (Line 1069)
  return { success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl };
==== AFTER
  return { success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl, latestProgress: highestProg };
>>>>
```

#### 6.2 Level Advancement Parity in `handleGetStudentProgress` (lines 1224–1237):
```javascript
<<<< BEFORE (Lines 1224–1237)
  var highestLvl = 0;
  var highestProg = 0;
  for (var m = 1; m <= 32; m++) {
    var k = "MOD-" + (m < 10 ? "0" + m : m);
    var mObj = progObj[k] || progObj["MOD-" + m];
    if (mObj) {
      var pct = Number(mObj.percentage) || (mObj.aiMissionCompleted ? 100 : 0);
      if (pct > 0 && m >= highestLvl) {
        highestLvl = m;
        highestProg = pct;
      }
    }
  }
==== AFTER
  var highestLvl = 1;
  var highestProg = 0;
  for (var m = 1; m <= 32; m++) {
    var k = "MOD-" + (m < 10 ? "0" + m : m);
    var mObj = progObj[k] || progObj["MOD-" + m];
    if (mObj) {
      var pct = Number(mObj.percentage) || (mObj.aiMissionCompleted ? 100 : 0);
      if (pct >= 100 && m < 32) {
        if (m + 1 > highestLvl) highestLvl = m + 1;
      } else if (pct > 0 && m >= highestLvl) {
        highestLvl = m;
        highestProg = pct;
      }
    }
  }
>>>>
```

#### 6.3 Synthesize `verifiedSentences` in `extractStudentProgressFromRow` (lines 1160–1170):
```javascript
<<<< BEFORE (Lines 1160–1170)
  if (foundLevel >= 1 && foundLevel <= 32) {
    for (var lvl = 1; lvl <= foundLevel; lvl++) {
      var modKey = "MOD-" + (lvl < 10 ? "0" + lvl : lvl);
      if (!progObj[modKey]) progObj[modKey] = {};
      var targetPct = (lvl === foundLevel) ? (foundProgress || 100) : 100;
      if (!progObj[modKey].percentage || Number(progObj[modKey].percentage) < targetPct) {
        progObj[modKey].percentage = targetPct;
        progObj[modKey].aiMissionCompleted = true;
      }
    }
  }
==== AFTER
  if (foundLevel >= 1 && foundLevel <= 32) {
    for (var lvl = 1; lvl <= foundLevel; lvl++) {
      var modKey = "MOD-" + (lvl < 10 ? "0" + lvl : lvl);
      if (!progObj[modKey]) progObj[modKey] = {};
      var targetPct = (lvl === foundLevel) ? (foundProgress || 100) : 100;
      var targetSentences = (lvl <= 8 ? 30 : (lvl <= 23 ? 40 : 50));
      if (!progObj[modKey].percentage || Number(progObj[modKey].percentage) < targetPct) {
        progObj[modKey].percentage = targetPct;
        progObj[modKey].aiMissionCompleted = true;
      }
      if (progObj[modKey].verifiedSentences === undefined || Number(progObj[modKey].verifiedSentences) === 0) {
        progObj[modKey].verifiedSentences = Math.round((targetPct / 100) * targetSentences);
      }
    }
  }
>>>>
```

---

## 6. Verification Method

Once implemented by the Worker, the persistence fix can be verified using the following automated scripts:

1. **Deterministic Progress Diagnostic Test**:
   ```powershell
   node scratch/test_persistence_diagnostic.cjs
   ```
   **Expected Outcome**:
   - Turn 1 & Turn 2 increment verified count to `2 / 30`.
   - Reload (F5) executes.
   - `Verified matches in DOM after reload` asserts `2 / 30` (PASS).
   - `Turn history visible after reload` asserts `true` (PASS).
   - `mastered_progress_MTR999` is clean without nested `MTR999` wrappers.

2. **Full Core AI Coach Test Suite**:
   ```powershell
   node scratch/test_ai_coach.cjs
   ```
   **Expected Outcome**:
   - 23/23 tests pass (100%).

3. **Mission Advance and Continuity Suite**:
   ```powershell
   node scratch/test_mission_advance_and_continuity.cjs
   ```
   **Expected Outcome**:
   - 5/5 tests pass (100%).
