# Automated Headless Test Suites Documentation (Milestone 3)

**Author**: `teamwork_test_writer_r2_m3` (E2E Headless Test Suite Writer)  
**Date**: 2026-11-01  
**Project**: Mastered Language Coach Students Portal Web App  
**Scope Reference**: `orchestrator_r2/SCOPE.md` (Features F11, F12, F13)  
**Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_test_writer_r2_m3\`  

---

## 1. Executive Summary

Three dedicated automated headless test suites have been constructed and executed in `scratch/` using Puppeteer-core, Node.js HTTP server, and simulated cross-platform Web Speech API catalogs.

All 3 test suites execute cleanly and achieve a **100% pass rate with exit code 0**:

| Test Suite File | Feature Covered | Test Type | Total Checks | Passed | Failed | Status |
|---|---|---|:---:|:---:|:---:|:---:|
| `scratch/test_headless_multi_turn_practice.cjs` | F11: Multi-Turn Continuous Spoken Practice | Headless E2E Browser | 11 | 11 | 0 | **PASS (100%)** |
| `scratch/test_headless_reload_persistence.cjs` | F12: 4-Cycle Cold Reload & Storage Audit | Headless E2E Browser | 10 | 10 | 0 | **PASS (100%)** |
| `scratch/test_headless_voice_heuristics.cjs` | F13: Cross-Platform Voice Heuristics & Cadence | Headless Browser / Web Speech | 11 | 11 | 0 | **PASS (100%)** |
| **Total** | **F11, F12, F13** | **Headless Automation** | **32** | **32** | **0** | **100% PASS** |

---

## 2. Test Suite 1: Headless Multi-Turn Practice Simulation (Feature F11)

### File Path
`scratch/test_headless_multi_turn_practice.cjs`

### How to Run
```bash
node scratch/test_headless_multi_turn_practice.cjs
```

### Purpose & Scope
Simulates realistic, hands-free student speaking practice with Coach Sarah in the live speaking room (`ai_coach` tab in `index.html`), validating progressive sentence verification, turn dialogue accumulation, and DOM status updates across 6 consecutive spoken turns.

### Key Architecture & Implementation Details
1. **Local Server & Browser Flags**: Spins up an in-process HTTP server (`http.createServer`) and launches headless Chrome with flags:
   - `--no-sandbox`
   - `--disable-setuid-sandbox`
   - `--autoplay-policy=no-user-gesture-required`
   - `--use-fake-ui-for-media-stream`
   - `--use-fake-device-for-media-stream`
   - `--enable-speech-api`
2. **Deterministic Interception**: Intercepts Google Apps Script API calls (`script.google.com`) and Gemini LLM API calls (`generativelanguage.googleapis.com`), returning structured responses with CORS headers (`Access-Control-Allow-Origin: *`).
3. **Session Seeding**: Seeds student session `mastered_user_session` with `admissionNumber: MTR999`, `role: student`, and `tab: ai_coach`.
4. **Initial Verification**: Confirms speaking room loads with initial verified counter `0 / 30`.
5. **Call Initiation**: Clicks "Start Live Practice Call" and verifies `window.__masteredActivePipeline` is instantiated and active.
6. **6 Consecutive Spoken Turns**:
   - Turn 1: *"Hello Sarah, I am excited to practice my English communication skills today."* -> DOM updates to `1 / 30`.
   - Turn 2: *"Every morning I wake up early and prepare a healthy breakfast for my family."* -> DOM updates to `2 / 30`.
   - Turn 3: *"I work as a software engineer building modern web applications for education."* -> DOM updates to `3 / 30`.
   - Turn 4: *"Collaborating with international teammates requires clear and confident spoken English."* -> DOM updates to `4 / 30`.
   - Turn 5: *"In the evenings I enjoy jogging in the nearby park and reading informative books."* -> DOM updates to `5 / 30`.
   - Turn 6: *"Practicing continuous dialogue every day helps me gain fluency and natural confidence."* -> DOM updates to `6 / 30`.
7. **DOM Dialogue Turn Assertions**:
   - Confirms DOM contains conversational turn labels (`You:`, `Coach Sarah:`).
   - Confirms conversational turns are stored in `mastered_conversation_MTR999`.
8. **Storage Consistency**:
   - Confirms `mastered_progress_MTR999['MOD-01'].verifiedSentences === 6`.
   - Confirms zero recursive wrapping.

### Test Result
- **Passed**: 11/11 assertions (100%)
- **Exit Code**: `0`

---

## 3. Test Suite 2: Multi-Cycle Browser Page Reload Verification Suite (Feature F12)

### File Path
`scratch/test_headless_reload_persistence.cjs`

### How to Run
```bash
node scratch/test_headless_reload_persistence.cjs
```

### Purpose & Scope
Simulates multi-cycle cold browser reloads (`F5` / `page.reload`) to verify that student practice progress, speaking room active tab, conversational history, mission advancement, and clean call teardown persist without data loss or UI regression. Includes a comprehensive architectural storage audit.

### 4-Cycle Cold Reload Lifecycle
- **Cycle 1 (Practice 3 turns)**:
  - Student speaks 3 verified sentences (`3 / 30`).
- **Reload 1 (F5)**:
  - Page cold reloads with `waitUntil: 'domcontentloaded'`.
  - Asserts student remains on Coach Sarah speaking room (`ai_coach`).
  - Asserts DOM verified counter strictly displays `3 / 30`.
  - Asserts conversation turns are rehydrated and visible in DOM/localStorage.
- **Cycle 2 (Practice 3 additional turns)**:
  - Live call resumes; student speaks turns 4, 5, 6, accumulating to `6 / 30`.
- **Reload 2 (F5)**:
  - Page cold reloads.
  - Asserts speaking room remains active.
  - Asserts DOM counter strictly displays `6 / 30`.
  - Asserts all 6 turns are persisted in localStorage.
- **Cycle 3 (Advance Mission)**:
  - Student speaks voice command intent *"next mission"*.
  - Level dropdown updates to Mission 2 (`select.value === '2'`).
- **Reload 3 (F5)**:
  - Page cold reloads on Mission 2.
  - Asserts Mission 2 is retained across reload with `0 / 30` target.
  - Asserts prior mission progress remains preserved.
- **Cycle 4 (Clean End Call)**:
  - Student clicks *"End Call"* button.
  - Asserts call cleanly ends with `setVoiceSessionEnded(true)`.
  - Asserts `mastered_session_summary_MTR999` is saved with verified sentences, current mission, target, and progress %.
- **Reload 4 (F5)**:
  - Final cold reload.
  - Asserts speaking room remains active, session summary intact, and progress intact.
- **Storage Audit**:
  - Full structural audit of `mastered_progress_MTR999`.
  - Confirms flat module keys (`MOD-01`, `MOD-1`, `MOD-02`, `MOD-2`).
  - Confirms **ZERO recursive nesting** (no nested `userProgress`).
  - Confirms **ZERO nested admission numbers** (`cleanAdm`, `studentAdm`, email).

### Test Result
- **Passed**: 10/10 assertions (100%)
- **Exit Code**: `0`

---

## 4. Test Suite 3: Cross-Platform Voice Heuristics & Catalog Selection (Feature F13)

### File Path
`scratch/test_headless_voice_heuristics.cjs`

### How to Run
```bash
node scratch/test_headless_voice_heuristics.cjs
```

### Purpose & Scope
Evaluates Coach Sarah's Web Speech API voice selection and speech synthesis pipeline across simulated native voice catalogs for Microsoft Edge, Google Chrome, Apple iOS Safari, and Android (Google / Samsung TTS) directly inside a headless browser context.

### Evaluated Behaviors & Assertions
1. **Windows Microsoft Edge**:
   - Catalog: `Microsoft Jenny Online (Natural)`, `Microsoft Aria Online (Natural)`, `Microsoft Zira Desktop`, `Microsoft David Desktop`.
   - Selected: `Microsoft Jenny Online (Natural) - English (United States)`.
2. **Windows Google Chrome**:
   - Catalog: `Google US English`, `Microsoft David Desktop`, `Microsoft Zira Desktop`, `Google UK English Female`.
   - Selected: `Google US English` (prioritized over legacy SAPI Zira).
3. **Apple iOS / macOS Safari**:
   - Catalog: `Ava (Enhanced)`, `Samantha (Enhanced)`, `Samantha (Compact)`, `Siri Female`, `Alex`.
   - Selected: `Ava (Enhanced)` (prioritized over compact and male voices).
4. **Android Chrome (Google Speech Services)**:
   - Catalog: `en-us-x-sfg#female_1-local`, `en-us-x-sfg-network`, `en-us-x-iom-local`, `en-us-x-tpf-local`.
   - Selected: `en-us-x-sfg#female_1-local` (highest combined score for female identifier + sfg stream).
5. **Android Samsung TTS**:
   - Catalog: `Samsung English (United States) Male`, `Samsung English Female`.
   - Selected: `Samsung English Female`.
6. **Robotic Voice De-prioritization**:
   - Confirms legacy SAPI5 `Microsoft Zira Desktop` is never chosen when modern neural voices exist.
7. **Female Guard & Substring Safety**:
   - Confirms names containing `"female"`, `"woman"`, or `"girl"` are NEVER categorized as male (e.g. `Google UK English Female`, `Samsung English Female`, `female_1`).
8. **Word-Boundary Male Rejection**:
   - Confirms male voices (`David`, `Mark`, `Guy`, `Brian`, `Alex`, `Daniel`, `en-us-x-iom`, `Samsung Male`) are strictly detected and rejected using regex word boundaries.
9. **Acoustic Synthesis Parameters**:
   - Utterance `pitch` is strictly `1.0` (eliminates chipmunk DSP warble).
   - Utterance `rate` is strictly `0.96` (conversational pacing).
   - Utterance `volume` is strictly `1.0`.
10. **Smooth Filler Queue**:
    - Confirms `speakImmediateAcknowledgment` does not abruptly cancel active speech.
    - Confirms coach response is held in `pendingCoachResponse` and dispatched smoothly after filler ends.
11. **Echo Drain Cooldown**:
    - Confirms `speakerCooldownUntil` enforces a 400ms barrier after speech synthesis concludes to prevent microphone self-echo.

### Test Result
- **Passed**: 11/11 assertions (100%)
- **Exit Code**: `0`

---

## 5. Summary Table of Test Files

| Path | Lines | Test Count | Pass Rate | Primary Command |
|---|:---:|:---:|:---:|---|
| `scratch/test_headless_multi_turn_practice.cjs` | 393 | 11 | 100% | `node scratch/test_headless_multi_turn_practice.cjs` |
| `scratch/test_headless_reload_persistence.cjs` | 460 | 10 | 100% | `node scratch/test_headless_reload_persistence.cjs` |
| `scratch/test_headless_voice_heuristics.cjs` | 523 | 11 | 100% | `node scratch/test_headless_voice_heuristics.cjs` |

All test suites conform strictly to the progressive testability guidelines, operate without dummy or facade code, run completely self-contained, clean up temporary user data directories and HTTP servers, and exit with code 0.
