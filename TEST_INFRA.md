# E2E Test Infrastructure Specification: Mastered Language Coach Student Portal

**Document Version**: 2.0.0  
**Last Updated**: 2026-11-13  
**Status**: ACTIVE & VERIFIED (Exit Code 0, 100% Pass)  
**Target Codebase**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP`  
**Master Runner**: `scratch/test_e2e_full_suite.cjs`  
**Results Manifest**: `scratch/test_results.json`

---

## 1. Test Philosophy & Engineering Principles

1. **Opaque-Box, Requirement-Driven Verification**:
   - Tests are directly derived from user-visible contracts, behavioral specifications, and error conditions articulated in `ORIGINAL_REQUEST.md` and `PROJECT.md`.
   - The test suite verifies real application behavior, state transitions, storage permanence, and DOM elements rather than mock facades.

2. **Integrity Mandate**:
   - No hardcoded test passes or artificial result falsification.
   - Genuine state machines, dynamic port allocation (`server.listen(0, '127.0.0.1')`), real headless browser automation via Puppeteer (`puppeteer-core`), and rigorous assertion invariants across all 4 tiers.

3. **Multi-Layered 4-Tier Test Architecture**:
   - **Tier 1 (Feature Coverage)**: Isolated functional, unit, and interface contract assertions for Features F1 through F20 (>=5 assertions per feature = exactly 100 checks).
   - **Tier 2 (Boundary, Corner & Adversarial Stress Cases)**: Hostile network drops, corrupted storage payloads, rapid reload storms, punctuation/casing edge cases, and audio circuit breakers (8 domains × 5 assertions = exactly 40 checks).
   - **Tier 3 (Cross-Feature Interaction Scenarios)**: Multi-subsystem integration testing pairwise and n-way combinations across authentication, speech, persistence, and synchronized views (8 comprehensive scenarios).
   - **Tier 4 (Real-World Application Workloads)**: End-to-end user journeys executed in headless Google Chrome across student onboarding, speaking calls, mid-session browser crashes, mobile/desktop viewport handoffs, offline queue drain, and graduation workflows (5 end-to-end scenarios).

4. **Speed & Ergonomics**:
   - Headless Fast Mode (`--fast`): Executes Tiers 1–3 (148 checks) in under 1 second.
   - Full E2E Mode (`--all`): Executes all 4 tiers (153 assertions) including real browser rendering in ~2.5 minutes.
   - Granular Tier Selection (`--tier=1`, `--tier=2`, `--tier=3`, `--tier=4`).

---

## 2. 20-Feature Traceability Matrix (F1 through F20)

| Feature | Feature Description | Milestone | Core Req | Tier 1 Checks | Tier 2 Domain | Tier 3 Scenario | Tier 4 Workload |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **F1** | Permanent Session Persistence in `localStorage` | M1 | R2 | 5 (`T1.F1.1`-`5`) | B1, B4 | T3.C1 | T4.W1, W2 |
| **F2** | Removal of Startup LocalStorage Purge | M1 | R2 | 5 (`T1.F2.1`-`5`) | B1, B4 | T3.C1 | T4.W1, W2 |
| **F3** | Seamless Auth State Initialization | M1 | R2 | 5 (`T1.F3.1`-`5`) | B2 | T3.C1 | T4.W1, W3 |
| **F4** | In-Progress Work Retention | M1 | R2 | 5 (`T1.F4.1`-`5`) | B1, B4 | T3.C1, T3.C6 | T4.W2 |
| **F5** | Functional Explicit Sign Out | M1 | R2 | 5 (`T1.F5.1`-`5`) | B1 | T3.C1 | T4.W3 |
| **F6** | Student-Scoped Progress Queries | M2 | R3 | 5 (`T1.F6.1`-`5`) | B5 | T3.C2 | T4.W1, W3 |
| **F7** | Redundant Student Polling Elimination | M2 | R3 | 5 (`T1.F7.1`-`5`) | B5 | T3.C2 | T4.W1 |
| **F8** | Admin Polling & Network Throttling | M2 | R3 | 5 (`T1.F8.1`-`5`) | B5 | T3.C2 | T4.W3 |
| **F9** | Lazy-Loaded Media & Assets | M2 | R3 | 5 (`T1.F9.1`-`5`) | B5 | T3.C2 | T4.W1 |
| **F10** | Audio Visualizer Decoupled from React State | M3 | R4 | 5 (`T1.F10.1`-`5`) | B7 | T3.C3, T3.C7 | T4.W1 |
| **F11** | Speech Loop Circuit Breakers | M3 | R4 | 5 (`T1.F11.1`-`5`) | B7 | T3.C3, T3.C7 | T4.W1 |
| **F12** | Background Mic & Audio Context Suspension | M3 | R4 | 5 (`T1.F12.1`-`5`) | B6 | T3.C5 | T4.W2 |
| **F13** | Duplicate Startup Hook Cleanup | M3 | R4 | 5 (`T1.F13.1`-`5`) | B5 | T3.C1 | T4.W1 |
| **F14** | Safe Database Sync on End Session | M4 | R1 | 5 (`T1.F14.1`-`5`) | B3, B8 | T3.C4 | T4.W1 |
| **F15** | End Session Duplicate POST Race Elimination | M4 | R1 | 5 (`T1.F15.1`-`5`) | B3, B8 | T3.C4, T3.C8 | T4.W1 |
| **F16** | In-Flight Fetch Keepalive & Unload Beacon | M4 | R1 | 5 (`T1.F16.1`-`5`) | B6 | T3.C5 | T4.W2 |
| **F17** | Persistent Offline Sync Queue | M4 | R1 | 5 (`T1.F17.1`-`5`) | B3 | T3.C4 | T4.W4 |
| **F18** | Dashboard, History & Admin View Sync | M4 | R1 | 5 (`T1.F18.1`-`5`) | B2, B8 | T3.C6, T3.C8 | T4.W3, W5 |
| **F19** | Backend Concurrency Locks & Active `updateProgress` | M4 | R1, R5 | 5 (`T1.F19.1`-`5`) | B8 | T3.C8 | T4.W4 |
| **F20** | Automated Scratch Verification & GAS Instructions | Final | R5 | 5 (`T1.F20.1`-`5`) | B8 | T3.C8 | T4.W1-W5 |

---

## 3. Test Tier Breakdown & Scope

### 3.1 Tier 1: Feature Coverage & Interface Contracts (100 Checks)
- **F1: Permanent Session Persistence**: Validates `safeStorage` dual-tier read/write (`localStorage` + `sessionStorage`), survival past tab closes, and prevention of cold-start eviction.
- **F2: Removal of Startup LocalStorage Purge**: Asserts `index.html` contains zero startup purge instructions for `mastered_user_session` or progress keys; verifies non-destructive boot.
- **F3: Seamless Auth State Initialization**: Checks absence of login flash, proper role dispatch (`student` vs `admin`), and zero unauthenticated fallback regressions.
- **F4: In-Progress Work Retention**: Verifies active module state (`mastered_selected_mission_*`), quiz in-progress answers (`mastered_quiz_session_*`), and level progress retain values across page reloads.
- **F5: Functional Explicit Sign Out**: Confirms `handleLogout` wipes both storage tiers cleanly and resets memory references while normal reload preserves them.
- **F6: Student-Scoped Progress Queries**: Asserts URL query parameter construction `&admissionNumber=${cleanAdm}` and confirms student boot requests only own scoped record.
- **F7: Redundant Student Polling Elimination**: Asserts student background interval is set to 0ms (event-driven sync on End Session only).
- **F8: Admin Polling & Network Throttling**: Checks 30,000ms admin polling throttle and `document.visibilityState === 'visible'` guard.
- **F9: Lazy-Loaded Media & Assets**: Confirms image/media tags use `loading="lazy"` and audio contexts initialize lazily on user gesture.
- **F10: Audio Visualizer Decoupled from React State**: Validates direct canvas / WebGL rendering loop bypasses React `useState` / `useEffect` tree to prevent 60–120 FPS component re-renders.
- **F11: Speech Loop Circuit Breakers**: Asserts debounce guards (450ms mobile / 200ms desktop), consecutive restart limits (max 3 within 2 seconds), and error backoff.
- **F12: Background Mic & Audio Context Suspension**: Checks `visibilitychange` listener suspends `AudioContext` and stops tracks when page is hidden.
- **F13: Duplicate Startup Hook Cleanup**: Asserts single idempotent cloud progress fetch hook on initial mount.
- **F14: Safe Database Sync on End Session**: Verifies `saveStudentProgress` triggers immediately upon End Call click with full payload (`percentage`, `verifiedSentences`, `moduleNumber`).
- **F15: End Session Duplicate POST Race Elimination**: Validates `isSavingProgress` mutex lock prevents concurrent double-submissions.
- **F16: In-Flight Fetch Keepalive & Unload Beacon**: Asserts `{ keepalive: true }` in `callAppsScript` fetch options and emergency `navigator.sendBeacon` fallback on page unload.
- **F17: Persistent Offline Sync Queue**: Checks `mastered_pending_sync_queue` stores pending sync payloads and auto-drains upon `online` event.
- **F18: Dashboard, History & Admin View Sync**: Validates exact course divisors (32 Malayalam vs 30 Hindi) and identical percentage across all 3 views.
- **F19: Backend Concurrency Locks & Active `updateProgress`**: Checks `backend/Code.gs` acquires `LockService.getScriptLock().waitLock(15000)` and activates `handleUpdateProgress`.
- **F20: Automated Scratch Verification & GAS Instructions**: Verifies runner output generation, `test_results.json` export, and documentation in `backend/README.md`.

### 3.2 Tier 2: Boundary, Corner & Adversarial Stress Cases (40 Checks)
- **Domain B1: Malformed & Corrupted Storage**: Null inputs, empty strings, truncated JSON, circular structures, and quota limits handled safely via try/catch fallbacks.
- **Domain B2: Casing, Punctuation & Module Boundary Sanitization**: Lowercase admission numbers (`mtr7082` -> `MTR7082`), special characters stripped (`MTR-7082#@!`), unpadded module aliases (`HIND-MOD-1` -> `HIND-MOD-01`, `MOD-1` -> `MOD-01`), and boundary capping (Module 30 Hindi / Module 32 Malayalam).
- **Domain B3: Offline Network Simulation & Queue Drain**: Simulated offline state buffers payloads into `mastered_pending_sync_queue`; reconnection listener flushes payloads; HTTP 500 defers cleanly; monotonic merge preserves max verified count.
- **Domain B4: Rapid Cold Reload (F5) Storm Resilience**: Multi-cycle reload continuity; session and progress preserved through 4 consecutive reload cycles; anti-tampering guards.
- **Domain B5: Network Saturation & Concurrent Polling Guard**: Visibility state drops throttle polling; rapid tab-switching debounce; payload size optimization (<10 KB scoped vs 13.77 MB full roster).
- **Domain B6: Unexpected Browser Crash & Hardware Suspension**: Sudden backgrounding suspends `AudioContext`; mic stream tracks cleanly stopped; beacon fallback handles sudden unload.
- **Domain B7: Speech Recognition Hostile Errors & Edge Cases**: Rapid barge-in interrupts; `no-speech`, `network`, `audio-capture` backoff; error retry without deadlock; filler words cleaned safely.
- **Domain B8: Concurrent Write Race & Lock Contention**: Mutex suppresses secondary save during active submission; Google Sheets `LockService` serializes simultaneous student writes.

### 3.3 Tier 3: Cross-Feature Integration Scenarios (8 Scenarios)
- **T3.C1: Session Persistence + Auth Initialization + Reload Retention (F1+F2+F3+F4)**: Cold start reads stored session without flash; in-progress mission retained through reload.
- **T3.C2: Network Polling Elimination + Scoped Queries + Assets (F6+F7+F8+F9)**: Student mode runs zero polling intervals; queries include admission scope; media assets load lazily.
- **T3.C3: Voice Circuit Breaker + Hardware Suspension + Visualizer (F10+F11+F12)**: Voice engine debounces restarts; canvas visualizer runs off-React; backgrounding suspends hardware.
- **T3.C4: End Session Trigger + Mutex Lock + Offline Fallback (F14+F15+F17)**: End Call initiates save under mutex guard; offline transition safely redirects payload to sync queue.
- **T3.C5: Keepalive Fetch + Unload Beacon + Hardware Suspension (F12+F16)**: Tab backgrounding suspends audio; page unload triggers keepalive / beacon fallback flush.
- **T3.C6: Bilingual Switch + Divisor Harmonization (F4+F18)**: Switching between Malayalam and Hindi recalculates progress dynamically against 32 vs 30 modules without skew.
- **T3.C7: Voice Circuit Breaker + Interruption Resilience (F10+F11)**: Rapid user speech barge-in cancels pending coach speech immediately; visualizer remains uncoupled.
- **T3.C8: Cross-Device Monotonic Merge + LockService (F15+F18+F19)**: Concurrent updates from mobile and desktop merge monotonically under backend `LockService` serialization.

### 3.4 Tier 4: Real-World Application Workloads (5 Puppeteer E2E Scenarios)
- **T4.W1: Student Onboarding, Speaking Session & End Call Summary**: Launches browser, seeds student session, starts live speaking call with mock AI interception, ends call, and verifies End Session summary card render and storage persistence.
- **T4.W2: Mid-Call Interruption, Cold Reload & Mission Progression**: Seeds active mission 2 progress, performs cold browser reload (F5), and verifies speaking room and mission state recover seamlessly without session loss.
- **T4.W3: Mobile-to-Desktop Continuity & Admin Audit Verification**: Emulates mobile viewport (iPhone 14, 390x844) with student progress, transitions to desktop (1440x900) under admin session, and audits directory rendering.
- **T4.W4: Simulated Offline Practice, Reconnection Sync & Cloud Recovery**: Injects offline sync queue payload and validates queue integrity and recovery contract in storage.
- **T4.W5: Bilingual Progression & Course Graduation Lifecycle**: Validates full 32-module Malayalam and 30-module Hindi graduation logic (100% completion threshold, score calculations).

---

## 4. Test Architecture & Runner Specifications

- **File Path**: `scratch/test_e2e_full_suite.cjs`
- **Engine**: Node.js (v18+) with `puppeteer-core`.
- **Dynamic Port Allocation**: `server.listen(0, '127.0.0.1')` avoids port conflicts during concurrent runs.
- **Chrome Binary Auto-Detection**: Searches standard installation locations:
  - Windows: `C:\Program Files\Google\Chrome\Application\chrome.exe` and `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe`
  - macOS: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - Linux: `/usr/bin/google-chrome` or `/usr/bin/chromium-browser`
  - Override via environment variable: `process.env.CHROME_BIN`
- **Output Artifacts**:
  - Console: ANSI-colored test execution report with per-tier metrics and final summary.
  - JSON Report: `scratch/test_results.json` containing timestamp, configuration, tier counts, and assertion-level details.

---

## 5. CLI Execution Guide

### Run Full Master Suite (All 4 Tiers)
```bash
node scratch/test_e2e_full_suite.cjs --all
```

### Run Fast Headless Suite (Tiers 1–3, < 1 second)
```bash
node scratch/test_e2e_full_suite.cjs --fast
```

### Run Individual Tiers
```bash
node scratch/test_e2e_full_suite.cjs --tier=1
node scratch/test_e2e_full_suite.cjs --tier=2
node scratch/test_e2e_full_suite.cjs --tier=3
node scratch/test_e2e_full_suite.cjs --tier=4
```

---

## 6. Directory & Test Script Catalog

The project maintains comprehensive specialized test suites in `scratch/`:

| Script Name | Purpose | Execution Profile |
|---|---|:---:|
| `scratch/test_e2e_full_suite.cjs` | **Master 4-Tier Test Runner** (F1–F20, 153 assertions) | Headless + Browser |
| `scratch/run_all_challenger_suites.cjs` | Unified orchestrator for 7 core challenger suites | Headless |
| `scratch/test_dash_math.cjs` | Divisor math (32 Mal / 30 Hind) & growth calculations | Headless |
| `scratch/test_reviewer_r2_adversarial.cjs` | Level 32 cap, Hindi 30 cap, session permanence | Headless |
| `scratch/test_reviewer_r3_adversarial.cjs` | Partial progress preservation, Hindi key aliases | Headless |
| `scratch/test_speech_teardown_hardening.cjs` | Voice engine timer clearance & teardown states | Headless |
| `scratch/audit_stress_voice.cjs` | Voice selection heuristics, barge-in, filler cleanup | Headless |
| `scratch/test_adversarial_deep_probe.cjs` | Speech restart debounce & error backoff | Headless |
| `scratch/test_headless_voice_heuristics.cjs` | Platform TTS voices (Edge, Chrome, iOS, Android) | Puppeteer Browser |
| `scratch/test_headless_reload_persistence.cjs` | Multi-cycle F5 reload persistence (4 cycles) | Puppeteer Browser |

---

## 7. Legacy Assertion Deprecation & Harmonization Catalog

During the E2E infrastructure hardening, three obsolete assertion patterns from prior development stages were deprecated and harmonized:

1. **Startup `localStorage.removeItem('mastered_user_session')` Assertion**:
   - *Legacy State*: Older tests (`test_sentinel_victory_independent.cjs`, `test_victory_auditor_independent.cjs`) verified that `mastered_user_session` was purged on app boot.
   - *Harmonization*: Purging session on boot directly caused the session loss bug reported in `ORIGINAL_REQUEST.md` (§R2). In accordance with Feature F2, the destructive boot purge was removed. Tests were aligned to assert permanent session retention in `localStorage` across cold boots.

2. **`AiMissionPromptModal` Prop Signature Assertion**:
   - *Legacy State*: `test_db_save_integration.cjs` asserted that `AiMissionPromptModal` received `onVerifyMclCode`.
   - *Harmonization*: The component was modernized to directly persist progress via `saveStudentProgress` and accept `setCurrentUser` and `asPage`. The test assertion was updated to reflect the production signature.

3. **Raw `localStorage.removeItem('mastered_all_students_progress')`**:
   - *Legacy State*: `test_accurate_progress_realtime.cjs` checked for raw `localStorage.removeItem`.
   - *Harmonization*: Storage access was encapsulated into `safeStorage.removeItem` to support cross-tier session fallbacks.

---

## 8. Google Apps Script Backend Deployment Protocol

**File**: `backend/Code.gs`  
**Deployment Documentation**: `backend/README.md`

### Key Backend Improvements
1. **Concurrency Serialization (F19)**:
   - Wrapped `handleSaveStudentProgress(data)` in `LockService.getScriptLock().waitLock(15000)`.
   - Released lock in `finally { lock.releaseLock(); }` to prevent concurrent write collisions on the `StudentProgress` sheet.
2. **Activated `handleUpdateProgress` (F19)**:
   - Enabled `handleUpdateProgress(data)` in the `doPost` action router, delegating atomically to `handleSaveStudentProgress(data)`.
3. **Monotonic Progress Update Rule**:
   - Ensures incoming module percentage never overwrites a higher verified percentage or downgrades completed status.

### Manual GAS Deployment Instructions
1. Open the Google Apps Script project associated with the spreadsheet.
2. Copy the updated contents of `backend/Code.gs`.
3. Click **Deploy > Manage Deployments**.
4. Click the edit icon (pencil) next to the active Web App deployment.
5. Select **New Version**, enter description (e.g. `LockService concurrency & updateProgress activation`), and click **Deploy**.
6. Ensure access remains set to **"Anyone"**.
