# Dispatch: E2E Headless Test Suite Writer (Milestone 3)

## Identity & Role
- **Agent**: `teamwork_test_writer_r2_m3`
- **Role**: E2E Headless Test Suite Writer
- **Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_test_writer_r2_m3\`
- **Parent**: Orchestrator R2 (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`)

## Ground Truth
You MUST read `ORIGINAL_REQUEST.md` before starting work:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md`

Read SCOPE.md:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\orchestrator_r2\SCOPE.md`

Read existing tests for structure:
- `scratch/test_persistence_diagnostic.cjs`
- `scratch/test_voice_natural_selector.cjs`
- `scratch/test_adversarial_persistence.cjs`
- `scratch/test_challenger_m2_multicycle_deep.cjs`

## Objectives
Implement and execute the three dedicated automated headless browser test suites in `scratch/`:

### 1. `scratch/test_headless_multi_turn_practice.cjs` (Feature F11)
- Spin up local HTTP server (using `http.createServer`).
- Launch headless Puppeteer browser with flags: `--no-sandbox`, `--enable-speech-api`, `--use-fake-ui-for-media-stream`, `--use-fake-device-for-media-stream`.
- Seed student session (`mastered_user_session`, `mastered_progress_MTR999`).
- Start live practice call with Coach Sarah (`ai_coach`).
- Simulate 5+ consecutive spoken student practice turns with authentic sentences.
- Assert progressive verified sentence counter accumulation in the DOM (`1 / 30`, `2 / 30`, ...).
- Assert conversational dialogue turns rendered in DOM (`You: ...`, `Coach Sarah: ...`).
- Assert clean completion with exit code 0.

### 2. `scratch/test_headless_reload_persistence.cjs` (Feature F12)
- Execute a 4-cycle cold page reload verification:
  - Cycle 1: Student starts practice, verifies sentences (`3 / 30`).
  - Reload 1 (F5): Page reloads; verifies student remains in Coach Sarah speaking room (`ai_coach`), verified sentences stay at `3 / 30`, turn history retained in DOM.
  - Cycle 2: Student speaks more sentences, accumulating to `6 / 30`.
  - Reload 2 (F5): Page reloads; verified count stays at `6 / 30`, conversation turns retained.
  - Cycle 3: Student completes mission or navigates tabs; reload 3 (F5) maintains state.
  - Cycle 4: Student cleanly ends call ("End Call"); verifies session summary saved in `mastered_session_summary_${cleanAdm}`.
  - Reload 4 (F5): Final reload verifies session summary and progress intact.
- Storage audit: Confirms `mastered_progress_${cleanAdm}` has clean flat module keys (`MOD-01`, `MOD-1`) with ZERO recursive nesting and ZERO student admission numbers inside.
- Assert clean completion with exit code 0.

### 3. `scratch/test_headless_voice_heuristics.cjs` (Feature F13)
- Comprehensive cross-platform voice selection catalog test.
- Test `getCoachFemaleVoice` against simulated voice catalogs:
  - Windows Edge: `Microsoft Jenny Online (Natural)`, `Microsoft Aria Online (Natural)`, `Microsoft Zira Desktop`.
  - Windows Chrome: `Google US English`, `Microsoft David Desktop`, `Microsoft Zira Desktop`.
  - iOS Safari: `Ava (Enhanced)`, `Samantha (Enhanced)`, `Siri Female`.
  - Android Chrome: `en-us-x-sfg#female_1-local`, `Samsung English Female`.
- Verify:
  - Highest-fidelity natural voice is chosen per platform.
  - SAPI5 robotic voice (`Zira`) is never selected when high-fidelity voices exist.
  - Words containing "female" are never rejected as male.
  - Pitch is strictly `1.0` (not chipmunk DSP warble), rate is `0.96`, volume is `1.0`.
- Assert clean completion with exit code 0.

## Output Requirements
Document newly created test suites in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_test_writer_r2_m3\test_suites.md`
Write full handoff report with execution commands and outputs in:
`c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_test_writer_r2_m3\handoff.md`
Send completion message to Orchestrator (`4f9e4f55-d34b-495c-91cd-1f28c4210a04`).
