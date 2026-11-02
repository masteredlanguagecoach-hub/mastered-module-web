# Task Assignment: Worker M2 — Student Practice Progress Persistence Implementation

## Context
Working Directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2\
Project Root: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\
ORIGINAL_REQUEST.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
SCOPE.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\orchestrator_r2\SCOPE.md
Persistence Handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_persistence\handoff.md
Persistence Investigation: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_persistence\persistence_investigation.md

## Write Ownership
You exclusively own:
- `index.html` (persistence sections: storage effect, syncVoiceProgressToDatabase, fetchStudentProgressFromCloud, handleNavigateTab, AiMissionPromptModal rehydration)
- `backend/Code.gs` (saveStudentProgress latestProgress return, getStudentProgress monotonic level advancement, extractStudentProgressFromRow verifiedSentences synthesis)

DO NOT modify `assets/aiCoach/speech.js` (Milestone 1 is complete and verified).

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Detailed Requirements (Follow exact drop-in specifications in Persistence Handoff §4):
1. Read ORIGINAL_REQUEST.md and the Persistence Handoff report completely.
2. `index.html` Specification 1 (Storage Key Isolation & Nesting Elimination):
   - Replace lines 3412–3420: Do NOT save global `userProgress` dictionary into `mastered_progress_${adm}`. Instead, get individual student module map (`getCurrentStudentProgressMap()`), sanitize keys (`MOD-*`, `HIND-MOD-*`), and save clean module map strictly under `mastered_progress_${cleanAdm}`.
3. `index.html` Specification 2 (Hardened `syncVoiceProgressToDatabase`):
   - Replace lines 1638–1700:
     a) Do not spread `...updatedStudentMap` into `userProgress` root.
     b) Save clean student module map directly to `safeStorage.setItem('mastered_progress_' + cleanAdm)`.
     c) Synchronously update `currentUser` and `mastered_user_session` during practice so reload restores active student progress.
     d) Save active mission number under `mastered_selected_mission_${cleanAdm}`.
     e) Send `latestProgress: targetPct` in `callAppsScript('saveStudentProgress', ...)`.
4. `index.html` Specification 3 (Fix Cloud Falsy 0 Overwrite & Synthesize `verifiedSentences`):
   - Replace lines 3031–3044: Handle `latestProgress: 0` without fallback to 100 (`const latestProg = rawProg !== null ? rawProg : 0`). Synthesize `verifiedSentences = Math.round((targetPct / 100) * tSentences)` when missing.
5. `index.html` Specification 4 (Tab Navigation & Speaking Room Rehydration):
   - In `handleNavigateTab` (line 3302): persist active tab in `mastered_user_session`.
   - In `AiMissionPromptModal`: rehydrate active mission selection, conversation history, and add reactive rehydration `useEffect` to sync `voiceVerifiedCount` and `voiceSessionRef.current.verifiedSentences` when storage updates.
6. `backend/Code.gs` Specification 5 (Return Parity & Synthesis):
   - Line 1069 (`handleSaveStudentProgress`): Return `latestProgress: highestProg`.
   - Lines 1226–1236 (`handleGetStudentProgress`): Advance `highestLvl = m + 1` when `pct >= 100`.
   - Lines 1160–1170 (`extractStudentProgressFromRow`): Synthesize `verifiedSentences`.

## Verification:
Run:
- `node scratch/test_persistence_diagnostic.cjs` (Must assert verified sentences and turn history preserved across reload!)
- `node scratch/test_ai_coach.cjs`
- `node scratch/test_mission_advance_and_continuity.cjs`
- `node scratch/test_connected_conversation.cjs`
- `node scratch/test_voice_natural_selector.cjs`

Write your report to `changes.md` and complete `handoff.md`.


## 2026-11-01T14:34:22Z
You are the Progress Persistence Implementer (Worker M2).
Working directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2\
Project root: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\
ORIGINAL_REQUEST.md path: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
DISPATCH.md path: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2\DISPATCH.md
Persistence Handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_persistence\handoff.md
Persistence Investigation: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_persistence\persistence_investigation.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You MUST read ORIGINAL_REQUEST.md and the Persistence Handoff report before starting work.
Implement the 5 specifications in index.html and backend/Code.gs as detailed in DISPATCH.md and Persistence Handoff §4.
Run builds and tests (especially node scratch/test_persistence_diagnostic.cjs and node scratch/test_mission_advance_and_continuity.cjs).
Write your report to changes.md and handoff.md in your working directory.
When finished, send a completion message back to the orchestrator.
