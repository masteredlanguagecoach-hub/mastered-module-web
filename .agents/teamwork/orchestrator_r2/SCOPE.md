# Scope: Round 2 — Student Practice Progress Persistence & Natural Voice Synthesis

## Architecture
- **Voice Synthesis Subsystem**:
  - `assets/aiCoach/speech.js`: `LiveVoicePipeline`, Web Speech API (`window.speechSynthesis`, `SpeechRecognition`), voice detection & ranking heuristic (`getCoachFemaleVoice`), male voice filtering (`isMaleVoice`), speech synthesis execution (`speakCoachResponse`), immediate acknowledgment / filler handling, keep-alive timers, and echo cooldown.
  - `index.html`: `speakImmediateFiller`, UI speaking status indicators, user speech rate settings.
- **Student Progress Persistence Subsystem**:
  - `index.html`: Local state (`userProgress`, `currentUser`, `voiceVerifiedCount`, `activeTab`, `conversationTurns`, `voiceSessionSummary`), `safeStorage` caching (`mastered_progress_${cleanAdm}`, `mastered_user_session`, `mastered_all_students_progress`), and reactive rehydration hooks.
  - `assets/aiCoach/engine.js`: `AiCoachSession` (sentence verification counter, mission level tracking, dialogue history).
  - `backend/Code.gs`: Google Apps Script API endpoints (`saveStudentProgress`, `getStudentProgress`, `saveSessionHistory`) with monotonic merge and verified sentence synthesis.
- **Headless Testing Subsystem**:
  - `scratch/*.cjs`: Puppeteer-core automated test suites executing deterministic multi-turn practice sessions, turn completions, sentence verifications, cold browser reloads (F5), cross-device sync, and voice heuristic validation.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Fix `isMaleVoice` Substring Collision | Use regex word-boundary matching and female guard so "female" is never categorized as male | M1 | Voice Survey (DONE) |
| F2 | Weighted Multi-Tier Natural Voice Selector | Score voices by fidelity: Edge Natural Jenny/Aria, Chrome Google US English, iOS Ava/Samantha Enhanced, Android sfg/Samsung Female | M1 | Voice Survey (DONE) |
| F3 | Optimal Natural Voice Synthesis Settings | Set `pitch: 1.0` (eliminates chipmunk warble), `rate: 0.96` (natural conversational cadence), `volume: 1.0` | M1 | Voice Survey (DONE) |
| F4 | Non-Aborted Filler Speech Queue & Echo Cooldown | Prevent mid-word `synth.cancel()` audio pops, extend echo drain cooldown to 400ms, anchor utterances to prevent V8 GC | M1 | Voice Survey (DONE) |
| F5 | Eliminate LocalStorage Recursive Nesting | Store sanitized student module map `{ "MOD-01": ... }` under `mastered_progress_${cleanAdm}` without global `userProgress` wrapping | M2 | Persistence Survey |
| F6 | Remove Root Spread Pollution in `syncVoiceProgressToDatabase` | Avoid spreading `...updatedStudentMap` into `userProgress` root; cleanly isolate student admission keys | M2 | Persistence Survey |
| F7 | Synchronous `currentUser` & `mastered_user_session` Updates | Update `currentUser.userProgress` and `mastered_user_session` in real time during practice so reload restores active student progress | M2 | Persistence Survey |
| F8 | Fix Cloud Falsy 0 Overwrite & Synthesize `verifiedSentences` | Fix `Number(res.latestProgress) || 100` bug; compute correct verified sentences from target mission count | M2 | Persistence Survey |
| F9 | Reactive Rehydration & Tab Persistence in `AiMissionPromptModal` | Rehydrate `voiceVerifiedCount` and engine session upon storage/cloud sync; persist active tab to restore speaking room on reload | M2 | Persistence Survey |
| F10 | Backend `Code.gs` Monotonic Parity & `latestProgress` Return | Return `latestProgress` in `handleSaveStudentProgress`; advance `highestLvl` on `pct >= 100`; synthesize `verifiedSentences` | M2 | Persistence Survey |
| F11 | Multi-Turn Headless Practice Simulation Suite | Automated Puppeteer suite (`test_headless_multi_turn_practice.cjs`) executing realistic multi-turn sessions with sentence verifications | M3 | Testing Survey |
| F12 | Multi-Cycle Browser Page Reload Verification Suite | Automated Puppeteer suite (`test_headless_reload_persistence.cjs`) executing 4-cycle cold reloads and verifying progress retention | M3 | Testing Survey |
| F13 | Cross-Platform Voice Heuristics Verification Suite | Automated Puppeteer suite (`test_headless_voice_heuristics.cjs`) validating voice selection across Windows, iOS, and Android voice catalogs | M3 | Testing Survey |
| F14 | Comprehensive E2E Verification & Adversarial Coverage Hardening | Full 4-Tier test pass + Tier 5 adversarial stress testing confirming zero regression | Final | Project Pattern |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Natural Voice Synthesis & Web Speech Pipeline Hardening | F1, F2, F3, F4: `assets/aiCoach/speech.js`, `index.html` | none | DONE |
| M2 | Root Cause Fix for Progress Recording & Persistence Across Refreshes | F5, F6, F7, F8, F9, F10: `index.html`, `backend/Code.gs` | M1 | DONE |
| M3 | Automated Headless Test Suites Across Practice & Reload Cycles | F11, F12, F13: `scratch/test_headless_*.cjs` | M1, M2 | DONE |
| Final | 100% E2E Pass & Adversarial Hardening | F14: All test suites passing without regression | M1, M2, M3 | IN_PROGRESS |

---

## Interface Contracts
### `index.html` ↔ `assets/aiCoach/speech.js`
- `getCoachFemaleVoice(synth)`:
  - Returns highest-scoring female voice (`scoreVoice`) filtering out male voices with word boundaries.
  - Safe for all platforms: Edge (`Microsoft Jenny Online (Natural)`), Chrome (`Google US English`), iOS (`Ava Enhanced` / `Samantha Enhanced`), Android (`en-us-x-sfg` / `Samsung English Female`).
- `LiveVoicePipeline.speakCoachResponse(text, onComplete)`:
  - Speaks with `pitch = 1.0`, `rate = 0.96`, `volume = 1.0`.
  - Queues after active filler rather than abruptly aborting mid-syllable.
  - Sets `speakerCooldownUntil` to `now + 400ms`.
  - Retains utterance reference in `window.__masteredActiveUtterance`.

### `index.html` ↔ `localStorage` (`safeStorage`)
- `mastered_progress_${cleanAdm}`:
  - Clean dictionary of modules: `{ "MOD-01": { percentage, verifiedSentences, status, aiMissionCompleted, lastUpdated } }`.
  - Zero admission number keys (`MTR999`) or email keys nested inside.
- `mastered_user_session`:
  - Contains `{ user: { admissionNumber, userProgress }, role, tab: 'ai_coach' }`.

### `index.html` ↔ `backend/Code.gs`
- `saveStudentProgress`:
  - Request: `{ admissionNumber, email, userProgress, latestMissionLevel, latestProgress }`.
  - Response: `{ success: true, userProgress, latestLevel, latestMissionLevel, latestProgress }`.
- `getStudentProgress`:
  - Request: `{ admissionNumber }`.
  - Response: `{ success: true, userProgress, latestLevel, latestProgress }`.

---

## Code Layout
- `assets/aiCoach/speech.js`: Web Speech API pipeline, voice scoring, synthesis lifecycle.
- `index.html`: React application, speaking room modal, localStorage management, cloud sync caller.
- `backend/Code.gs`: Google Apps Script API endpoints.
- `scratch/`: Headless Puppeteer test suites.
