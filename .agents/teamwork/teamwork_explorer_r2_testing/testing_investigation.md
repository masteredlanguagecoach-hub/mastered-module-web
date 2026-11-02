# Automated Headless Testing & Persistence Verification Investigation Report

**Author**: Headless Testing Explorer  
**Date**: 2026-11-01  
**Project**: Mastered Language Coach Student Portal & Coach Sarah Speaking Room  
**Target Files**: `index.html`, `assets/aiCoach/speech.js`, `assets/aiCoach/engine.js`, `backend/Code.gs`, `scratch/` test suite

---

## 1. Executive Summary

This investigation analyzes how automated headless browser testing via Puppeteer can realistically simulate multi-turn student speaking practice sessions, verify sentence completions and level advancements, evaluate reload persistence across browser refresh cycles, and programmatically validate voice synthesis selection heuristics without human intervention.

Key findings from our audit:
1. **Existing Test Suite Gaps**: The existing test scripts in `scratch/` (such as `test_e2e_suite.cjs`, `test_puppeteer_live_call.cjs`, and `test_cross_device_admin_sync.cjs`) verify isolated UI actions, timers, mock storage states, or individual spoken turns. None currently execute a full continuous multi-turn dialogue loop that tests turn-by-turn verified sentence accumulation followed by cold browser page reloads and verification of speaking room state rehydration.
2. **Multi-Turn Speech Simulation**: In headless Chrome, realistic multi-turn student practice can be simulated with 100% determinism via direct pipeline dispatch (`window.__masteredActivePipeline.onStudentTurnComplete()`) or by injecting a Web Speech `MockSpeechRecognition` prototype. This exercises the full application pipeline: turn handling, immediate filler speech, grammar evaluation in `AiCoachSession`, verified sentence incrementing, real-time local storage commits, Google Apps Script synchronization, and Coach Sarah conversational follow-up questions.
3. **Progress Persistence & Reload Cycle Mechanics**: To guarantee zero progress loss across page reloads (F5) and tab restarts, state retention relies on three synchronized layers:
   - Client `safeStorage` (`mastered_progress_${cleanAdm}`, `mastered_user_session`, `mastered_all_students_progress`) with strict admission number sanitization (`cleanAdm`).
   - Deep monotonic merge (`mergeProgressMaps`) in both client and `backend/Code.gs`, ensuring cloud sync polling (`fetchStudentProgressFromCloud`) can never overwrite higher local progress.
   - Speaking room rehydration logic in `AiMissionPromptModal` (`index.html`), which scans modules 1..32 for `firstIncomplete` and accurately restores `missionVerified` and `AiCoachSession` initialization.
4. **Voice Synthesis Selection Heuristics**: Headless Chrome on Windows provides standard SAPI desktop voices (`Microsoft David`, `Microsoft Zira`, `Microsoft Mark`, `Microsoft Heera`, `Microsoft Ravi`). In `assets/aiCoach/speech.js`, `getCoachFemaleVoice` enforces a prioritized candidate hierarchy and a strict male voice exclusion blacklist. To verify cross-platform natural voice selection programmatically across Windows, iOS, and Android without requiring physical hardware, Puppeteer tests can inject synthetic platform voice catalogs into `speechSynthesis.getVoices()` and intercept `speechSynthesis.speak()` to verify voice selection, pitch, rate, and volume.

---

## 2. Audit of Existing Test Infrastructure in `scratch/`

We audited the key test scripts in `scratch/` against the requirements in `ORIGINAL_REQUEST.md`:

| Test Script | Primary Scope | Simulation Technique | Reload Testing | Voice Verification | Limitations Identified |
|-------------|---------------|----------------------|----------------|--------------------|------------------------|
| `test_e2e_suite.cjs` | 4-Tier E2E Suite (93 checks) | Headless Chrome, static DOM evaluation, mock data | Partial (session seed reload) | Checks speech cancellation | Checks static UI/timers; does not execute multi-turn conversational loops or verify sentence accumulation across reload. |
| `test_puppeteer_live_call.cjs` | Live speaking call & Coach Sarah replies | Injects 3 hardcoded turns via `pipeline.onStudentTurnComplete` | No reload test | Intercepts `speechSynthesis.speak` | Fixed 3 turns, does not test sentence counter accumulation, mission target reach, or reload persistence. |
| `test_cross_device_admin_sync.cjs` | Mobile vs Desktop admin sync | Directly writes mock progress object to `localStorage` | Yes (mobile & desktop reload) | None | Progress is seeded artificially rather than earned through student speaking turns. |
| `test_female_selector.cjs` | Voice selector prototype | Standalone Node.js script testing 5 mock voices | None (Node unit test) | Tests simplified function | Does not test `assets/aiCoach/speech.js` or real browser `window.speechSynthesis`. |
| `test_mission_advance_and_continuity.cjs` | Engine level advance & non-repetition | Node unit test of `AiCoachSession` | None | None | Unit test of engine logic only; does not run inside browser DOM or test UI synchronization. |
| `test_voice_turn_reply.cjs` | Single turn latency & reply check | Single turn injection via `pipeline.onStudentTurnComplete` | No reload test | Checks reply text | Limited to a single turn; no verification count persistence. |

### Identified Test Architecture Gaps
- **Lack of Multi-Cycle Reload Testing**: Existing tests do not simulate: Practice 3 turns -> verify count is 3 -> Reload page -> assert count remains 3 -> Practice 2 more turns -> verify count is 5 -> Reload page -> assert count remains 5.
- **Mission Advance Persistence Gap**: No automated test verifies that reaching 30/30 verified sentences advances the user to Mission 2, and that upon page reload, the student automatically resumes on Mission 2 with Mission 1 remaining 100% completed.
- **Cross-Platform Voice Matrix Gap**: Voice testing has only been run against the host machine's local voices rather than simulated cross-platform catalogs (Windows Natural Neural vs iOS Siri/Ava vs Android Google TTS).

---

## 3. Puppeteer Simulation Architecture for Multi-Turn Student Practice

### 3.1 Speech Simulation Strategies

Headless Chrome does not have an active microphone hardware feed by default. Two simulation architectures are viable:

```
+---------------------------------------------------------------------------------------------+
|                                    STUDENT SPEECH SIMULATOR                                 |
+---------------------------------------------------------------------------------------------+
|                                                                                             |
|   APPROACH 1: Direct Pipeline Event Dispatch (Recommended for Fast, Deterministic E2E)       |
|   `page.evaluate((turn) => window.__masteredActivePipeline.onStudentTurnComplete(turn))`   |
|                                       |                                                     |
|                                       v                                                     |
|   APPROACH 2: Web Speech API Recognition Mocking (Recommended for Low-Level Pipeline Tests)  |
|   `window.webkitSpeechRecognition = class MockRecognition { ... }`                         |
|   Triggers: onstart -> onresult({ transcript, confidence }) -> onend                        |
|                                       |                                                     |
+---------------------------------------+-----------------------------------------------------+
                                        |
                                        v
+---------------------------------------------------------------------------------------------+
|                                  APPLICATION PROCESSING PIPELINE                            |
+---------------------------------------------------------------------------------------------+
| 1. handleStudentVoiceTurn(spokenText) [index.html:1792]                                     |
|    - Instant Coach Sarah filler acknowledgment ("I see!", "Got it!") via speechSynthesis   |
| 2. session.recordAttempt({ text, source: 'speech', confidence: 0.95 }) [engine.js:1295]    |
|    - Sentence Segmentation: segmentSentences(text)                                          |
|    - Grammar & Syntax Validation: evaluateSentenceGrammar(segment)                          |
|    - Verification Increment: verifiedSentences += validCompleteSentences.length             |
|    - Context Update: Dialogue history and zero-repetition question generation                |
| 3. Progress Event Callbacks                                                                 |
|    - onSentenceVerified(profile) -> setVoiceVerifiedCount(profile.verifiedSentences)       |
|    - syncVoiceProgressToDatabase(profile) [index.html:1638]                                 |
|      - Updates React userProgress state                                                     |
|      - Commits to safeStorage ('mastered_progress_' + cleanAdm)                             |
|      - Asynchronously dispatches callAppsScript('saveStudentProgress')                      |
| 4. Coach Sarah Spoken Response                                                              |
|    - LiveVoicePipeline.speakCoachResponse(turnResult.spokenResponse)                        |
|    - Selects natural female voice -> speechSynthesis.speak(utterance)                       |
+---------------------------------------------------------------------------------------------+
```

### 3.2 Dialogue Corpus for Comprehensive Turn Verification

To verify that the engine and UI properly distinguish valid sentences, multi-sentence utterances, grammatical errors, and spoken commands, the multi-turn test runner should execute a parameterized sequence:

1. **Turn 1 (Valid Simple Sentence)**:
   - Input: `"My name is Alex and I am a software engineer."`
   - Expected: `verifiedIncrement: 1`, `voiceVerifiedCount: 1`, Coach Sarah acknowledges and asks a follow-up question.
2. **Turn 2 (Multi-Sentence Compound Turn)**:
   - Input: `"I usually wake up at seven in the morning. I always drink hot coffee before work."`
   - Expected: `verifiedIncrement: 2`, `voiceVerifiedCount: 3`, Coach Sarah acknowledges both actions and develops the topic.
3. **Turn 3 (Grammatical Error / Sentence Fragment)**:
   - Input: `"Yesterday I go store buy apple."` (Tense error / missing preposition)
   - Expected: `verifiedIncrement: 0`, `voiceVerifiedCount: 3` (no increase), `pendingCorrection` set, Coach Sarah provides guidance and model correction.
4. **Turn 4 (Self-Correction Retry)**:
   - Input: `"Yesterday I went to the store to buy an apple."`
   - Expected: `verifiedIncrement: 1`, `voiceVerifiedCount: 4`, self-correction recognized, Coach Sarah praises correction and moves forward.
5. **Turn 5 (Spoken Intent Command)**:
   - Input: `"Coach Sarah, please repeat the question."`
   - Expected: `intent: 'REPEAT'`, `verifiedIncrement: 0`, Coach Sarah repeats the active prompt.

---

## 4. Browser Page Reload Cycles & Progress Persistence Architecture

### 4.1 Data Pipeline and Failure Mode Analysis

The data persistence pipeline spans four interconnected layers:

```
[Speaking Room Modal UI]
       │
       ▼ (onSentenceVerified)
[React State: userProgress, voiceVerifiedCount]
       │
       ▼ (safeStorage.setItem)
[Browser LocalStorage: mastered_progress_${cleanAdm}]
       │
       ▼ (callAppsScript: 'saveStudentProgress')
[Google Apps Script Backend: handleSaveStudentProgress]
       │
       ▼ (SpreadsheetApp monotonic merge)
[Google Sheet: StudentProgress Tab (ProgressJSON)]
```

#### Identified Potential Failure Modes & Safeguards:

| # | Potential Failure Mode | Root Cause | Built-In Safeguard / Required Assertion |
|---|------------------------|------------|-----------------------------------------|
| 1 | **Key Mismatch on Reload** | Inconsistent storage keys (`MTR7082` vs `MTR-7082` vs email). | `index.html` sanitizes admission number using `cleanAdm = adm.replace(/[^A-Z0-9]/g, '')`. Test must assert storage keys under `cleanAdm` and verify rehydration regardless of hyphenation. |
| 2 | **Cloud Overwrite Race Condition** | `fetchStudentProgressFromCloud` runs on mount; if backend returns stale data, local progress could be overwritten. | Monotonic merge in `mergeProgressMaps` (`Math.max(tPct, sPct)` and `Math.max(tSentences, sSentences)`). Local higher counts are preserved, and bidirectional upward sync pushes the higher count to cloud. |
| 3 | **Speaking Room Session Rehydration** | Speaking room opened after reload might instantiate `AiCoachSession` with default `0` verified sentences. | `index.html:1594-1596` derives `missionVerified` from `currentStudentProg[modKey].verifiedSentences` and passes it to `createProfile({ verifiedSentences: missionVerified })`. Test must assert `session.getProfile().verifiedSentences === expectedCount`. |
| 4 | **Mission Advance Lost on Reload** | After completing Mission 1 (30/30) and advancing to Mission 2, reload might reset active mission to Mission 1. | `index.html:1568-1583` scans modules 1..32 for `firstIncomplete`. When Mission 1 has `percentage: 100`, `firstIncomplete` is `2`. Test must verify active mission remains `2` after reload. |
| 5 | **In-Call Unsaved Turn Drops** | If student refreshes without clicking "End Call", turns completed during the call might be lost. | `onSentenceVerified` invokes `syncVoiceProgressToDatabase(prog)` immediately on EVERY turn. Test must verify page reload mid-call retains all completed turns without needing an explicit "End Call" click. |

### 4.2 Multi-Cycle Reload Verification Protocol

The automated test runner should execute a 4-Cycle Test Protocol:

```
   [CYCLE 1: PRACTICE & COLD RELOAD]
   - Seed test student (AUTOTEST_PERSIST_<timestamp>)
   - Start Live Call -> Execute Turns 1 to 3 (3 verified sentences)
   - Assert in-memory count == 3, localStorage == 3
   - Trigger cold reload: `page.reload({ waitUntil: 'domcontentloaded' })`
   - Wait for React mount
   - Assert dashboard progress shows 3 verified sentences
   - Reopen Coach Sarah room -> Assert voiceVerifiedCount == 3, session.verifiedSentences == 3
   
   [CYCLE 2: ACCUMULATION & REFRESH MID-CALL]
   - Execute Turns 4 and 5 (total 5 verified sentences)
   - Do NOT click End Call
   - Trigger immediate page refresh: `page.reload()`
   - Assert storage retains 5 verified sentences
   - Assert Coach Sarah room resumes at 5 verified sentences
   
   [CYCLE 3: MISSION COMPLETION & LEVEL PROGRESSION]
   - Advance mission to completion (30/30 sentences on Mission 1)
   - Assert Mission 1 marked COMPLETED (100%)
   - Advance to Mission 2 -> activeMissionNumber == 2, verifiedSentences == 0
   - Trigger cold reload: `page.reload()`
   - Assert Mission 1 remains 100% completed
   - Assert speaking room automatically opens to Mission 2
   - Execute 1 turn on Mission 2 -> Assert Mission 2 verified count == 1
   
   [CYCLE 4: CLOUD BACKEND SYNC VALIDATION]
   - Launch separate incognito context (empty localStorage)
   - Fetch progress via API: `callAppsScript('getStudentProgress', { admissionNumber })`
   - Assert Google Sheets database returns latestMissionLevel: 2, MOD-01: 100%, MOD-02: progress verified
```

---

## 5. Voice Synthesis Selection Heuristics & Programmatic Verification

### 5.1 Native Voice Selection Heuristic Engine

In `assets/aiCoach/speech.js`, `getCoachFemaleVoice(synth)` executes a 4-tier filtering hierarchy:

1. **Tier 1 (Preferred Female Candidate List)**:
   Matches English voices against:
   `['samantha', 'karen', 'victoria', 'microsoft jenny online (natural)', 'microsoft aria online (natural)', 'microsoft sonia online (natural)', 'google us english female', 'google uk english female', 'microsoft zira', 'microsoft heera', 'microsoft hazel', 'microsoft susan', 'microsoft linda', 'moira', 'tessa', 'fiona', 'ava', 'allison', 'nora', 'jenny', 'aria', 'zira', 'heera']`
   while strictly excluding male voices (`!isMaleVoice(v)`).
2. **Tier 2 (Explicit Gender Declaration)**:
   Searches for any English voice whose name or URI contains `'female'`, `'woman'`, or `'girl'` and is `!isMaleVoice(v)`.
3. **Tier 3 (Non-Male English Fallback)**:
   Finds any English voice that is not in `MALE_VOICE_NAMES`.
4. **Tier 4 (Any Non-Male Fallback)**:
   Finds any voice across all languages that is not in `MALE_VOICE_NAMES`.

### 5.2 Male Voice Exclusion Blacklist (`isMaleVoice`)
The exclusion blacklist in `speech.js:100-105` filters out 33 male name patterns:
`['david', 'mark', 'george', 'ravi', 'guy', 'brian', 'christopher', 'eric', 'james', 'ryan', 'steffan', 'andrew', 'tom', 'alex', 'daniel', 'fred', 'oliver', 'arthur', 'thomas', 'nathan', 'william', 'male', 'sean', 'richard', 'paul', 'john', 'michael', 'stefan', 'prabhat', 'hemant', 'male_1', 'male_2', 'male-1', 'en-us-x-iom', 'en-us-x-iol']`

### 5.3 Cross-Platform Synthetic Voice Catalog Matrix

To verify the heuristics programmatically in headless Puppeteer, tests inject mock catalogs representing the primary target platforms:

```javascript
const PLATFORM_VOICE_MATRICES = {
  'Windows 11 (Edge / Modern Chrome)': [
    { name: 'Microsoft David - English (United States)', lang: 'en-US', default: true },   // Male -> Reject
    { name: 'Microsoft Mark - English (United States)', lang: 'en-US' },                   // Male -> Reject
    { name: 'Microsoft Zira - English (United States)', lang: 'en-US' },                   // Female standard -> Rank 2
    { name: 'Microsoft Jenny Online (Natural) - English (United States)', lang: 'en-US' }, // Neural Natural -> Expected Rank 1
    { name: 'Microsoft Aria Online (Natural) - English (United States)', lang: 'en-US' }   // Neural Natural -> Rank 1 alt
  ],
  'Apple iOS 17 / iPadOS / macOS (Safari / WebKit)': [
    { name: 'Alex', lang: 'en-US' },                                                       // Male -> Reject
    { name: 'Fred', lang: 'en-US' },                                                       // Male -> Reject
    { name: 'Samantha', lang: 'en-US', default: true },                                    // Standard Apple female
    { name: 'Victoria', lang: 'en-US' },                                                   // Standard Apple female
    { name: 'Ava (Premium)', lang: 'en-US' },                                              // Premium Natural Apple
    { name: 'Karen', lang: 'en-AU' }                                                       // Australian female
  ],
  'Android 14 (Google Speech Services / Google TTS)': [
    { name: 'en-us-x-iom-local', lang: 'en-US' },                                          // Male -> Reject
    { name: 'en-us-x-iol-local', lang: 'en-US' },                                          // Male -> Reject
    { name: 'Google US English Female', lang: 'en-US' },                                   // Expected Match
    { name: 'en-us-x-sfg#female_1-local', lang: 'en-US' }                                 // Expected Match via gender tag
  ],
  'Edge Case: Delayed Voice Loading': [], // Tests onvoiceschanged listener
  'Edge Case: All-Male Catalogue': [
    { name: 'Microsoft David', lang: 'en-US' },
    { name: 'Microsoft Mark', lang: 'en-US' }
  ] // Must handle gracefully without crash
};
```

### 5.4 Programmatic Interception and Parameter Verification

In Puppeteer, speech synthesis can be verified by intercepting `window.speechSynthesis.speak`:

```javascript
await page.evaluate(() => {
  window.__spokenUtterances = [];
  const origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
  window.speechSynthesis.speak = function (utt) {
    window.__spokenUtterances.push({
      text: utt.text,
      voiceName: utt.voice ? utt.voice.name : null,
      voiceLang: utt.voice ? utt.voice.lang : null,
      pitch: utt.pitch,
      rate: utt.rate,
      volume: utt.volume
    });
    // Fire completion events to prevent audio queue stalls
    setTimeout(() => { if (utt.onstart) utt.onstart(); }, 10);
    setTimeout(() => { if (utt.onend) utt.onend(); }, 50);
  };
});
```

#### Assertions to Verify:
1. **Selected Voice Quality**:
   - On Windows with Jenny available: `voiceName === 'Microsoft Jenny Online (Natural) - English (United States)'`.
   - On Android: `voiceName` contains `'female'` or matches `'Google US English Female'`.
   - Zero male voices selected across all tests (`assert.ok(!isMale(voiceName))`).
2. **Pitch Tuning**:
   - iOS: `pitch === 1.05` (prevents tinny/chipmunk artifacts on Apple WebKit).
   - Desktop / Android: `pitch === 1.20` (warm, natural female tone).
3. **Speech Rate**:
   - `rate >= 0.86 && rate <= 1.0` (natural conversational rhythm).

---

## 6. Concrete Test Suite Blueprint for Implementation

We recommend organizing the headless verification into three focused test scripts in `scratch/`:

### Blueprint 1: `scratch/test_headless_multi_turn_practice.cjs`
- **Objective**: Simulates 10 consecutive student speaking turns with Coach Sarah.
- **Key Assertions**:
  - Turns 1-3 increment `voiceVerifiedCount` from 0 to 3.
  - Filler speech is triggered immediately on each student turn.
  - Grammatical errors are properly flagged with constructive coach feedback.
  - Self-corrections are recognized and rewarded with 1 verified count increment.
  - Conversation turns history renders student and coach dialogue bubbles cleanly.
  - Call duration timer increments smoothly every second.
  - Clicking "End Call" cleanly stops listeners, cancels speech, and displays Session Summary.

### Blueprint 2: `scratch/test_headless_reload_persistence.cjs`
- **Objective**: Proves that progress persists across 4 cold reload cycles without data loss.
- **Key Assertions**:
  - Cycle 1: 3 verified sentences -> Cold Reload -> Verify 3 sentences in Dashboard & Speaking Room.
  - Cycle 2: 2 more turns (total 5) -> Reload mid-call -> Verify 5 sentences restored.
  - Cycle 3: Complete Mission 1 -> Advance to Mission 2 -> Reload -> Verify Mission 1 completed and Mission 2 active.
  - Cycle 4: Incognito browser context -> Query Google Sheets backend -> Assert cloud records match local progress.

### Blueprint 3: `scratch/test_headless_voice_heuristics.cjs`
- **Objective**: Verifies voice selection heuristics across Windows, iOS, and Android voice catalogues.
- **Key Assertions**:
  - Windows: Jenny/Aria selected over Zira; David/Mark rejected.
  - iOS: Ava/Samantha selected; Alex/Fred rejected. Pitch set to 1.05.
  - Android: `Google US English Female` or `#female_1` selected; `iom`/`iol` rejected.
  - Asynchronous loading: Voices arriving after `onvoiceschanged` are properly picked up.
  - Audio parameter checks: Rate 0.86, Volume 1.0, zero distortion flags.

---

## 7. Synthesis and Recommendations

1. **Deterministic Test Isolation**:
   Always generate a fresh test namespace (e.g. `AUTOTEST_PERSIST_${Date.now()}_${Math.floor(Math.random()*1000)}`) when running E2E reload tests against Google Sheets to ensure test runs are isolated and cannot corrupt live student records.
2. **Expose Dedicated Voice Selector on MasteredSpeech**:
   Exporting `getCoachFemaleVoice` on `globalThis.MasteredSpeech` will allow both unit-level heuristic evaluation and full E2E pipeline verification.
3. **Turn-Level Synchronous Local Storage Save**:
   Ensure `syncVoiceProgressToDatabase` is called inside `onSentenceVerified` (already in `index.html:1759`) so every turn is written to `localStorage` immediately upon evaluation, immunizing the user against sudden browser crashes or accidental page reloads.
4. **Integration into CI/Runner**:
   Incorporate the 3 new test blueprints into `scratch/test_e2e_suite.cjs` as an expanded Tier 4/Tier 5 suite to provide ongoing regression protection.
