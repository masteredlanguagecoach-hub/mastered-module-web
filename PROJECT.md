# Project: Mastered Language Coach - Persistence, Session, Data & Thermal Optimization

## Architecture
- **Frontend Web Application**: `index.html` (React 18 via Babel Standalone, Tailwind CSS, Web Speech API).
  - Authentication & Session: `safeStorage` abstraction managing `localStorage` and `sessionStorage`, `currentUser` state, `handleLogout`.
  - Student Dashboard & Views: Student profile, mission selection grid (32 Malayalam / 30 Hindi modules), History Modal, Admin Table.
  - Voice Coach Call: `AiMissionPromptModal`, Coach Sarah audio loop (`assets/aiCoach/speech.js`), conversation state machine (`assets/aiCoach/engine.js`), visualizer (`assets/aiCoach/ui.js`).
  - Network & Sync: `callAppsScript` communicating with Google Apps Script Web App endpoint, offline sync queue.
- **Backend Service**: `backend/Code.gs` (Google Apps Script Web App).
  - Actions: `saveStudentProgress`, `updateProgress`, `getStudentProgress`, `getAllStudentProgress`, `getStudents`, `submitQuizScore`, `verifyMclCode`.
  - Storage: Google Sheets ("StudentProgress", "ApprovedStudents", "QuizScores").
- **Secondary React SPA**: `src/App.tsx`, `src/services/googleSheetsService.ts` (Admin / student directory portal).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Permanent Session Persistence in `localStorage` | Re-enable `localStorage` read/write in `safeStorage` for `mastered_user_session`, eliminating tab-close/sleep logouts | M1 | R2, Survey 2 |
| F2 | Removal of Startup LocalStorage Purge | Eliminate destructive `localStorage.removeItem('mastered_user_session')` and progress wipe on app boot | M1 | R2, Survey 2 |
| F3 | Seamless Auth State Initialization | Initialize `currentUser` synchronously from stored session to eliminate login flash and `'MTR777'` fallbacks | M1 | R2, Survey 2 |
| F4 | In-Progress Work Retention | Retain active quiz drafts (`mastered_quiz_session_mod_*`), selected mission, and speech turns across reloads/sleep | M1 | R2, Survey 2 |
| F5 | Functional Explicit Sign Out | Ensure `handleLogout` cleanly purges all session keys from both `sessionStorage` and `localStorage` | M1 | R2, Survey 2 |
| F6 | Student-Scoped Progress Queries | Strictly query student's own progress (`getStudentProgress&admissionNumber=...`, ~4.3 KB) instead of all students (13.77 MB) | M2 | R3, Survey 3 |
| F7 | Redundant Student Polling Elimination | Eliminate periodic student background polling (set from 120s to 0s) in favor of on-demand/event-driven sync | M2 | R3, Survey 3 |
| F8 | Admin Polling & Network Throttling | Throttle Admin polling to 30s-60s with `visibilityState` guards; gate `fetchAllStudents` in `src/App.tsx` behind Admin | M2 | R3, Survey 3 |
| F9 | Lazy-Loaded Media & Assets | Apply `loading="lazy"` to module thumbnails and lazy-load audio/video assets on demand | M2 | R3, Survey 3 |
| F10 | Audio Visualizer Decoupled from React State | Remove 60-120 FPS `setVoiceAudioLevel` re-render loop; update 12 waveform bars directly via DOM refs or 10 FPS isolated component | M3 | R4, Survey 3 |
| F11 | Speech Loop Circuit Breakers | Cap rapid SpeechRecognition restarts and implement exponential backoff on unrecoverable speech errors | M3 | R4, Survey 3 |
| F12 | Background Mic & Audio Context Suspension | Listen to `visibilitychange` to pause AudioContext and mic hardware when tab is hidden or screen is locked | M3 | R4, Survey 3 |
| F13 | Duplicate Startup Hook Cleanup | Deduplicate redundant startup `useEffect` hooks fetching cloud progress in `index.html` | M3 | R4, Survey 3 |
| F14 | Safe Database Sync on End Session | Fix `TypeError` in `syncVoiceProgressToDatabase` (`index.html:1971`) with safe fallback chain `(cleanAdm || rawAdm || email)` | M4 | R1, Survey 1 |
| F15 | End Session Duplicate POST Race Elimination | Prevent concurrent POST requests from `engine.js` `saveHandler` and `handleEndCall` via an in-flight save mutex | M4 | R1, Survey 1 |
| F16 | In-Flight Fetch Keepalive & Unload Beacon | Add `{ keepalive: true }` to `fetch()` in `callAppsScript` and add `navigator.sendBeacon` fallback on page unload | M4 | R1, Survey 1 |
| F17 | Persistent Offline Sync Queue | Store failed or timed-out progress saves in `mastered_pending_sync_queue` and auto-retry on network reconnection | M4 | R1, Survey 1 |
| F18 | Dashboard, History & Admin View Sync | Harmonize course length divisor (30 for Hindi, 32 for Malayalam) and direct progress fallback across all 3 views | M4 | R1, Survey 1 |
| F19 | Backend Concurrency Locks & Active `updateProgress` | Implement `LockService` in `backend/Code.gs` write actions, activate `handleUpdateProgress`, and fix aggressive sanitizer | M4 | R1, R5, Survey 1 |
| F20 | Automated Scratch Verification & GAS Instructions | Ensure all automated tests in `scratch/` pass cleanly and document exact GAS deployment steps | Final | R5, All |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Permanent Session Persistence & Data Retention | F1, F2, F3, F4, F5: `safeStorage` in `localStorage`, remove boot purge, synchronous auth restore, in-progress draft retention, clean sign-out | none | DONE |
| M2 | Network Data Consumption & Polling Optimization | F6, F7, F8, F9: 0s student polling, single-student queries, Admin poll throttling, lazy media assets | none | DONE |
| M3 | Device Performance & Thermal Optimization | F10, F11, F12, F13: Decouple 60-120 FPS audio visualizer, speech loop circuit breaker, background mic suspension | none | DONE |
| M4 | Reliable Database Persistence on End Session & View Sync | F14, F15, F16, F17, F18, F19: End session sync fix, concurrency mutex, keepalive/beacon, offline queue, view math harmonization, `backend/Code.gs` locks & updateProgress | M1 | DONE |
| Final | 100% E2E Pass & Adversarial Hardening | F20: Clean pass across all `scratch/` test suites, adversarial validation, GAS deployment guide | M1, M2, M3, M4 | IN_PROGRESS (convId: 7a10bc45-a45e-4985-8c93-51b7a7d3af7c) |

---

## Interface Contracts
### `safeStorage` Contract (`index.html`)
- `getItem(key: string): string | null`:
  - Checks `sessionStorage` first.
  - If null, checks `localStorage`.
  - Must NOT block `mastered_user_session`, `mastered_progress*`, `mastered_quiz_session*`.
- `setItem(key: string, value: string): void`:
  - Writes to `sessionStorage`.
  - Also writes to `localStorage` for `mastered_user_session`, `mastered_progress*`, `mastered_quiz_session*`, `mastered_device_token`, `mastered_selected_mission*`, `mastered_conversation*`.
- `removeItem(key: string): void`:
  - Clears from both `sessionStorage` and `localStorage`.

### Data Fetching Contract (`index.html`)
- Student Clients:
  - Must NEVER call `getAllStudentProgress` or `getStudents`.
  - Must call `getStudentProgress&admissionNumber=${cleanAdm}` (~4.3 KB).
  - Background polling interval: 0ms (no interval polling).
- Admin Clients:
  - Background polling interval: 30,000ms (30s) or higher.
  - Polling gated by `document.visibilityState === 'visible'`.

### Audio Visualizer Contract (`assets/aiCoach/speech.js` & `index.html`)
- Audio monitoring runs via Web Audio `AnalyserNode`.
- Visualizer DOM updates MUST NOT trigger React state updates or component re-renders.
- 12 visualizer bar elements updated directly via DOM element style properties or isolated, throttled (<=10 FPS) canvas/component.

### End Session Database Save Contract (`index.html` ↔ `backend/Code.gs`)
- Save Payload: `{ action: 'saveStudentProgress', admissionNumber: cleanAdm, email: userEmail, moduleNumber: num, percentage: pct, verifiedSentences: count, status: 'IN_PROGRESS' | 'COMPLETED', timestamp: ISOString }`
- Mutex: Only one in-flight POST per student save.
- Network transport: `fetch(url, { method: 'POST', keepalive: true, body: ... })` with `navigator.sendBeacon` fallback.
- Backend: `LockService.getScriptLock().waitLock(15000)` ensures atomic read-modify-write on Google Sheets.

---

## Code Layout
- `index.html`: Main SPA (owned by M1 for auth/storage, M2 for polling/network, M3 for visualizer/thermal, M4 for end-session sync & dashboard math).
- `assets/aiCoach/speech.js`: Audio pipeline & speech recognition (owned by M3 for visualizer decoupling, circuit breakers, visibility listeners).
- `assets/aiCoach/engine.js`: Conversation state machine (owned by M4 for End Call saveHandler race elimination).
- `assets/aiCoach/ui.js`: Visualizer UI helpers (owned by M3).
- `src/App.tsx`: Secondary React app (owned by M2 for `fetchAllStudents` admin gating).
- `backend/Code.gs`: Google Apps Script backend (owned by M4 for `LockService`, `handleUpdateProgress`, sanitizer fixes).
- `scratch/`: Automated test scripts (read by all, maintained for verification).
