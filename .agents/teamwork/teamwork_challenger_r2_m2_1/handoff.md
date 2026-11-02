# Adversarial Challenge Report: Student Practice Progress Persistence (Milestone 2)

**Author**: `teamwork_challenger_r2_m2_1` (Empirical Challenger)  
**Recipient**: `orchestrator_r2` / `teamwork_worker_r2_m2`  
**Verdict**: **REQUEST_CHANGES**  
**Date**: 2026-11-01  
**Integrity Mode**: Development  

---

## 1. Observation

### 1.1 Multi-Layer Nested Storage Keys Result in Total Progress Loss
Executing `node scratch/test_adversarial_deep_nesting.cjs` directly in the browser runtime produced:
```
======================================================================
ADVERSARIAL TEST: OFFLINE MULTI-LAYER NESTED LEGACY STORAGE
======================================================================

mergeProgressMaps available in page: true
1-layer nesting unpacked: {"MOD-01":{"percentage":33,"verifiedSentences":10}}
2-layer nesting unpacked: {}
3-layer nesting unpacked: {}
```
Direct inspection of `index.html` lines 1202–1212 shows:
```javascript
1202:         // Defensively filter and unpack any nested admission numbers or emails from legacy storage
1203:         if (typeof sVal === 'object' && sVal !== null && !Array.isArray(sVal)) {
1204:           if (!mKey.startsWith('MOD-') && !mKey.startsWith('HIND-MOD-') && mKey !== 'quizScores' && mKey !== 'aiMissionProof') {
1205:             for (const subKey of Object.keys(sVal)) {
1206:               if (subKey.startsWith('MOD-') || subKey.startsWith('HIND-MOD-')) {
1207:                 result[subKey] = mergeProgressMaps({ [subKey]: result[subKey] }, { [subKey]: sVal[subKey] })[subKey];
1208:               }
1209:             }
1210:             continue;
1211:           }
1212:         }
```
When legacy storage contains 2 or more nested layers (e.g. `{ [adm]: { [email]: { "MOD-01": { percentage: 50 } } } }` or `{ [adm]: { "userProgress": { "MOD-01": ... } } }`), `subKey` is `email` or `userProgress`, which does not start with `MOD-` or `HIND-MOD-`. The inner object is not unpacked recursively; it is dropped completely, returning `{}`.

### 1.2 Zero-Progress Row Extraction Inflates to 100% and Advances Level
Direct execution of `extractStudentProgressFromRow` and `handleGetStudentProgress` from `backend/Code.gs` with a student row having `Mission Level = 1` and `Progress (%) = 0` produced:
```
Extracted for level 1, progress 0:
{
  "MOD-01": {
    "percentage": 100,
    "aiMissionCompleted": true,
    "verifiedSentences": 30
  }
}

Result of getStudentProgress on row with Level 1, Progress 0:
{
  latestLevel: 2,
  latestProgress: 0,
  userProgress: {
    'MOD-01': {
      percentage: 100,
      aiMissionCompleted: true,
      verifiedSentences: 30
    }
  }
}
```
Direct inspection of `backend/Code.gs` lines 1153, 1164, 1165–1168 reveals:
```javascript
1153:           foundProgress = Math.min(Math.max(rProg || 100, 0), 100);
...
1164:       var targetPct = (lvl === foundLevel) ? (foundProgress || 100) : 100;
1165:       if (!progObj[modKey].percentage || Number(progObj[modKey].percentage) < targetPct) {
1166:         progObj[modKey].percentage = targetPct;
1167:         progObj[modKey].aiMissionCompleted = true;
1168:       }
```
1. `(foundProgress || 100)` evaluates `0 || 100` as `100`.
2. `!progObj[modKey].percentage` evaluates `!0` as `true`.
3. In `backend/Code.gs` line 1235–1236, `pct >= 100` triggers `highestLvl = m + 1 = 2`, incorrectly advancing a student with 0 progress on Mission 1 to Mission 2.

### 1.3 Rapid Repeated Reloads (F5 Storm) Passed
Executing `scratch/test_adversarial_persistence.cjs` simulated 2 spoken turns followed by 4 rapid reloads in quick succession (150ms–300ms intervals).
- Spoken turn dialogue stream survived (`Turn history survived: true`).
- Verified count survived (`DOM Verified match: 10 / 30`).
- Storage keys remained flat and stable (`mastered_progress_MTR999`, `mastered_conversation_MTR999`, `mastered_user_session`).

### 1.4 Timeout Resilience & Backend Partition Passed
Intercepting and timing out / aborting all network calls to `script.google.com` (19 aborted requests):
- App rendered Coach Sarah speaking room without freezing or crashing (`App crashed: false`, `Has Coach Sarah room: true`).
- Local progress and verified count (`6 / 30`) remained intact across reload (`F5`).

---

## 2. Logic Chain

```
[Observation 1: Multi-layer Nesting in Storage]
Legacy storage keys contain multiple layers of nesting (e.g. { adm: { email: { MOD-01: ... } } }).
Line 1205 only inspects subKey at depth 1 with subKey.startsWith('MOD-').
      │
      ▼
[Inference 1: Data Loss on Migration]
Any key nested 2 or more layers deep is skipped by the loop and never unpacked.
Empirically proven by node scratch/test_adversarial_deep_nesting.cjs returning {} for 2-layer and 3-layer nesting.
      │
      ▼
[Observation 2: Falsy 0 in backend/Code.gs]
Line 1153 has rProg || 100.
Line 1164 has (foundProgress || 100).
Line 1165 has !progObj[modKey].percentage.
      │
      ▼
[Inference 2: False 100% Completion and Level Leap]
When a student has 0% progress on Mission 1, foundProgress is 0.
0 || 100 evaluates to 100.
MOD-01 is marked percentage = 100, aiMissionCompleted = true, verifiedSentences = 30.
In handleGetStudentProgress, 100% on Mission 1 advances latestLevel to 2.
      │
      ▼
[Conclusion]
While rapid reloads and network timeouts are robustly handled, multi-layer nesting drops student data,
and zero-progress backend rows incorrectly award 100% completion and jump students to Mission 2.
Empirical verdict must be REQUEST_CHANGES.
```

---

## 3. Caveats

1. The Google Sheets backend endpoint live deployment is remote; the backend test was executed against `backend/Code.gs` in local Node environment simulating the exact GAS Google Apps Script engine parser.
2. Web Speech API synthesis playback cannot play in headless Chrome without user media flags; this was appropriately mocked and simulated with `--use-fake-ui-for-media-stream` and fake speech pipelines.

---

## 4. Conclusion & Actionable Fixes

**Verdict**: **REQUEST_CHANGES**

To attain complete adversarial robustness and fulfill Milestone 2 acceptance criteria, the following fixes are required:

### Fix 1: Recursive Unpacking in `index.html` `mergeProgressMaps` (Lines 1202–1212)
Instead of shallow 1-depth loop, recursively unpack `sVal` so any depth of nesting is unpacked:
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

### Fix 2: Strict Zero-Check in `backend/Code.gs` (Lines 1153, 1164, 1165)
In `backend/Code.gs`:
1. Line 1153:
   ```javascript
   var rawProgVal = (rProg !== undefined && !isNaN(rProg)) ? rProg : 100;
   foundProgress = Math.min(Math.max(rawProgVal, 0), 100);
   ```
2. Line 1164–1168:
   ```javascript
   var targetPct = (lvl === foundLevel) ? (foundProgress !== null && foundProgress !== undefined ? foundProgress : 100) : 100;
   if (progObj[modKey].percentage === undefined || Number(progObj[modKey].percentage) < targetPct) {
     progObj[modKey].percentage = targetPct;
     progObj[modKey].aiMissionCompleted = targetPct >= 100 || Boolean(progObj[modKey].aiMissionCompleted);
   }
   ```

---

## 5. Verification Method

To independently verify these findings and confirm subsequent fixes:

1. **Test Multi-layer Legacy Nesting**:
   ```powershell
   node scratch/test_adversarial_deep_nesting.cjs
   ```
   *Pass Criteria*: Both `2-layer nesting unpacked` and `3-layer nesting unpacked` must output valid `{ "MOD-02": ... }` and `{ "MOD-03": ... }` dictionaries instead of `{}`.

2. **Test Zero Progress Handling in Backend**:
   ```powershell
   node -e "const fs = require('fs'); const content = fs.readFileSync('backend/Code.gs', 'utf8'); const extractIdx = content.indexOf('function extractStudentProgressFromRow'); const endIdx = content.indexOf('function handleGetStudentProgress'); const helpers = content.substring(0, endIdx); const fn = new Function(helpers + '\nreturn extractStudentProgressFromRow;')(); const headers = ['Admission Number', 'Email', 'Name', 'Mission Level', 'Progress (%)', 'Progress JSON', 'Last Updated']; const rowWithZero = ['MTR001', 'zero@example.com', 'Zero Student', 1, 0, '', '2026-11-01']; const extracted = fn(rowWithZero, headers, false); console.log(JSON.stringify(extracted)); if (extracted['MOD-01'].percentage !== 0 || extracted['MOD-01'].aiMissionCompleted === true) { console.error('FAILED: Zero progress inflated to 100%'); process.exit(1); } else { console.log('PASSED: Zero progress preserved as 0%'); }"
   ```
   *Pass Criteria*: Exits 0 and confirms `percentage === 0` and `aiMissionCompleted === false`.

3. **Full Adversarial Persistence Test Suite**:
   ```powershell
   node scratch/test_adversarial_persistence.cjs
   ```
   *Pass Criteria*: All 4 test dimensions pass with `OVERALL RESULT: ALL PASS`.
