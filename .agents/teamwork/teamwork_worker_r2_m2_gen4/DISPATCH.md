# Dispatch: Progress Persistence Remediation Worker (Milestone 2 Iteration 3)

## Identity & Role
- **Agent**: `teamwork_worker_r2_m2_gen4`
- **Role**: Progress Persistence Remediation Worker
- **Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen4\`
- **Parent**: Orchestrator R2 (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`)

## Ground Truth
You MUST read `ORIGINAL_REQUEST.md` before starting work:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md`

Read Headless Challenger Iter 2 handoff report:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m2_iter2_2\handoff.md`

## Defect to Remediate: `ReferenceError: setCurrentUser is not defined` in `index.html`

### Root Cause
At line 1736 inside `syncVoiceProgressToDatabase` in `AiMissionPromptModal`, `setCurrentUser(prevUser => ...)` is invoked.
However:
1. At line 1525, `AiMissionPromptModal` does not include `setCurrentUser` in its destructured props:
   `function AiMissionPromptModal({ onClose, showToast, currentUser, userProgress, setUserProgress, getCurrentStudentProgressMap, activeModule, asPage = false })`
2. At caller sites (lines 4667–4677 and 5471–5480), `MasteredLanguageCoachPortal` does not pass `setCurrentUser={setCurrentUser}`.
3. This throws an uncaught `ReferenceError: setCurrentUser is not defined`, aborting `syncVoiceProgressToDatabase` mid-execution, skipping active mission saving (line 1756), cloud persistence via Google Apps Script (line 1761), and mission switching (line 1797).

### Remediation
1. In `index.html` at line 1525, add `setCurrentUser` to `AiMissionPromptModal`'s destructured props:
   ```javascript
   function AiMissionPromptModal({ onClose, showToast, currentUser, setCurrentUser, userProgress, setUserProgress, getCurrentStudentProgressMap, activeModule, asPage = false }) {
   ```
2. In `index.html` at lines 1736–1755, guard `setCurrentUser` with a fallback to `safeStorage`:
   ```javascript
   // 3. Keep currentUser and mastered_user_session synchronously updated
   if (typeof setCurrentUser === 'function') {
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
   } else {
     try {
       const session = safeStorage.getItem('mastered_user_session');
       if (session) {
         const parsed = JSON.parse(session);
         parsed.user = {
           ...(parsed.user || {}),
           userProgress: mergeProgressMaps(parsed.user?.userProgress || {}, updatedStudentMap)
         };
         parsed.tab = 'ai_coach';
         safeStorage.setItem('mastered_user_session', JSON.stringify(parsed));
       }
     } catch(e) {}
   }
   ```
3. In `index.html` at lines 4667–4677 and lines 5471–5480, pass `setCurrentUser={setCurrentUser}` to `<AiMissionPromptModal />`.

### Verification Commands
1. Reproduce and verify bug resolution:
   `node scratch/test_empirical_setcurrentuser_bug.cjs`
   MUST exit 0 with 0 caught page errors!
2. Verify full multi-cycle persistence and voice mission continuity:
   `node scratch/test_challenger_m2_multicycle_deep.cjs`
   MUST pass all 8 steps with exit 0 (`ALL 8 ADVERSARIAL MULTI-CYCLE & PERSISTENCE CHECKS PASSED EMPIRICALLY!`)!
3. Run all regression suites:
   `node scratch/test_persistence_diagnostic.cjs`
   `node scratch/test_adversarial_deep_nesting.cjs`
   `node scratch/test_adversarial_persistence.cjs`
   `node scratch/test_connected_conversation.cjs`
   `node scratch/test_mission_advance_and_continuity.cjs`
   `node scratch/test_voice_natural_selector.cjs`
   `node scratch/test_ai_coach.cjs`

## Output Requirements
Document all file modifications in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen4\changes.md`
Write full handoff report in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen4\handoff.md`
Send completion message to Orchestrator (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`).
