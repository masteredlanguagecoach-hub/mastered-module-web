# Dispatch: Progress Persistence Remediation Worker (Milestone 2 Iteration 2 Gen 3)

## Identity & Role
- **Agent**: `teamwork_worker_r2_m2_gen3`
- **Role**: Progress Persistence Remediation Worker
- **Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen3\`
- **Parent**: Orchestrator R2 (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`)

## Ground Truth
You MUST read `ORIGINAL_REQUEST.md` before starting work:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md`

Read Challenger M2-1's detailed defect analysis and reproducer tests:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m2_1\handoff.md`

## Objectives: Fix the 2 Critical Defects in Milestone 2

### Defect 1: Multi-Layer Nested Storage Keys in `index.html` (Lines 1202–1212)
**Root Cause**: When legacy storage contains 2 or more nested layers (e.g. `{ [adm]: { [email]: { "MOD-01": { percentage: 50 } } } }` or `{ [adm]: { "userProgress": { "MOD-01": ... } } }`), `mergeProgressMaps` currently does a shallow 1-depth loop over `sVal`. Any depth >= 2 nested keys are completely dropped, returning `{}` and losing student progress.
**Remediation**:
In `index.html` `mergeProgressMaps` (around lines 1202–1212), replace the shallow check with recursive unpacking:
```javascript
        // Defensively filter and recursively unpack any nested admission numbers, emails, or wrapper objects
        if (typeof sVal === 'object' && sVal !== null && !Array.isArray(sVal)) {
          if (!mKey.startsWith('MOD-') && !mKey.startsWith('HIND-MOD-') && mKey !== 'quizScores' && mKey !== 'aiMissionProof') {
            const unpackedSub = mergeProgressMaps({}, sVal);
            for (const subKey of Object.keys(unpackedSub)) {
              if (subKey.startsWith('MOD-') || subKey.startsWith('HIND-MOD-')) {
                result[subKey] = mergeProgressMaps({ [subKey]: result[subKey] }, { [subKey]: unpackedSub[subKey] })[subKey];
              }
            }
            continue;
          }
        }
```
**Verification Command**:
`node scratch/test_adversarial_deep_nesting.cjs`
MUST show valid `{ "MOD-02": ... }` and `{ "MOD-03": ... }` dictionaries for both 2-layer and 3-layer nesting (NOT `{}`).

---

### Defect 2: Zero-Progress Row Extraction Inflating to 100% in `backend/Code.gs` (Lines 1153, 1164, 1165–1168)
**Root Cause**:
In `backend/Code.gs`:
1. Line 1153: `foundProgress = Math.min(Math.max(rProg || 100, 0), 100);` evaluates `0 || 100` as `100`.
2. Line 1164: `var targetPct = (lvl === foundLevel) ? (foundProgress || 100) : 100;` evaluates `0 || 100` as `100`.
3. Line 1165: `if (!progObj[modKey].percentage || Number(progObj[modKey].percentage) < targetPct)` evaluates `!0` as `true`.
This awards 100% completion to students with 0% progress on Mission 1 and advances them to Mission 2 in `handleGetStudentProgress`.
**Remediation**:
Use strict null/undefined/NaN checks:
1. In `extractStudentProgressFromRow` (around line 1153):
```javascript
    var rawProgVal = (rProg !== undefined && rProg !== null && !isNaN(rProg)) ? Number(rProg) : 100;
    foundProgress = Math.min(Math.max(rawProgVal, 0), 100);
```
2. Around line 1164–1168:
```javascript
    var targetPct = (lvl === foundLevel) ? (foundProgress !== null && foundProgress !== undefined ? foundProgress : 100) : 100;
    if (progObj[modKey].percentage === undefined || Number(progObj[modKey].percentage) < targetPct) {
      progObj[modKey].percentage = targetPct;
      progObj[modKey].aiMissionCompleted = targetPct >= 100 || Boolean(progObj[modKey].aiMissionCompleted);
    }
```
**Verification Command**:
Run the backend zero-progress check:
```powershell
node -e "const fs = require('fs'); const content = fs.readFileSync('backend/Code.gs', 'utf8'); const extractIdx = content.indexOf('function extractStudentProgressFromRow'); const endIdx = content.indexOf('function handleGetStudentProgress'); const helpers = content.substring(0, endIdx); const fn = new Function(helpers + '\nreturn extractStudentProgressFromRow;')(); const headers = ['Admission Number', 'Email', 'Name', 'Mission Level', 'Progress (%)', 'Progress JSON', 'Last Updated']; const rowWithZero = ['MTR001', 'zero@example.com', 'Zero Student', 1, 0, '', '2026-11-01']; const extracted = fn(rowWithZero, headers, false); console.log(JSON.stringify(extracted)); if (extracted['MOD-01'].percentage !== 0 || extracted['MOD-01'].aiMissionCompleted === true) { console.error('FAILED: Zero progress inflated to 100%'); process.exit(1); } else { console.log('PASSED: Zero progress preserved as 0%'); }"
```
MUST pass with `percentage === 0` and `aiMissionCompleted === false`.

---

## Required Regression Suite Execution
After making changes, run ALL of these suites to ensure no regressions:
1. `node scratch/test_adversarial_deep_nesting.cjs`
2. `node scratch/test_adversarial_persistence.cjs`
3. `node scratch/test_persistence_diagnostic.cjs`
4. `node scratch/test_connected_conversation.cjs`
5. `node scratch/test_ai_coach.cjs`
6. `node scratch/test_mission_advance_and_continuity.cjs`
7. `node scratch/test_voice_natural_selector.cjs`

## Output Requirements
Document all file modifications in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen3\changes.md`
Write full handoff report in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen3\handoff.md`
Send completion message to Orchestrator (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`).


## 2026-11-01T19:37:19Z
MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You are teamwork_worker_r2_m2_gen3 (Progress Persistence Remediation Worker).
Working Directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen3\
Parent Orchestrator: 4f9e4f55-d34b-495c-91cd-1f28c4210a04

Ground Truth:
Read ORIGINAL_REQUEST.md first: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
Read DISPATCH.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m2_gen3\DISPATCH.md
Read Challenger M2-1 handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m2_1\handoff.md

Your exclusive write files:
- index.html
- backend/Code.gs

Fix the 2 critical defects found in Milestone 2 Iteration 1:
1. Fix 1: Recursive Unpacking in index.html mergeProgressMaps (lines 1202-1212) using `const unpackedSub = mergeProgressMaps({}, sVal);` so that multi-layer nested storage keys (depth >= 2) are not dropped and unpack correctly. Verify with `node scratch/test_adversarial_deep_nesting.cjs`.
2. Fix 2: Strict Zero-Checks in backend/Code.gs lines 1153, 1164, 1165 so that students with 0% progress on Mission 1 are preserved as 0% (percentage === 0, aiMissionCompleted === false) and not falsely inflated to 100% or advanced to Mission 2. Verify with the powershell zero-progress command in DISPATCH.md.

Run all 7 regression suites:
- `node scratch/test_adversarial_deep_nesting.cjs`
- `node scratch/test_adversarial_persistence.cjs`
- `node scratch/test_persistence_diagnostic.cjs`
- `node scratch/test_connected_conversation.cjs`
- `node scratch/test_ai_coach.cjs`
- `node scratch/test_mission_advance_and_continuity.cjs`
- `node scratch/test_voice_natural_selector.cjs`

Document your changes in `.agents/teamwork/teamwork_worker_r2_m2_gen3/changes.md`.
Write full handoff report in `.agents/teamwork/teamwork_worker_r2_m2_gen3/handoff.md`.
Message orchestrator (4f9e4f55-d34b-495c-91cd-1f28c4210a04) upon completion.
