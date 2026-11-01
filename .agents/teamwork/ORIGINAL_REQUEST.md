# Original User Request

## Initial Request — 2026-10-31T07:38:23Z

Fix the End Call button in the Coach Sarah speaking room (index.html) to cleanly end calls without hanging state, and verify student progress and history synchronization across multiple devices/viewports, the Admin portal, and permanent Google Sheets database storage (backend/Code.gs).

Integrity mode: development

Reference:
- Live deployment: https://mastered-module-web.vercel.app/
- Backend script: backend/Code.gs

## Requirements

### R1. Clean End Call Lifecycle in Speaking Room
The End Call button in the Coach Sarah speaking room (index.html) must cleanly end the call session: immediately stop active Web Speech audio recognition, cancel speech synthesis playback, tear down ongoing timers/streams, and display the session summary or return to the ready state with no lingering or frozen state.

### R2. Cross-Device and Admin Portal Progress & History Sync
Student progress and session history must synchronize accurately across different devices and browser sessions (including mobile device emulation and desktop viewports) and be correctly reflected and visible in the Admin portal.

### R3. Permanent Database Storage via Google Sheets Backend
Session data, student progress updates, and history records must be permanently persisted to the Google Sheets database via the backend endpoint (backend/Code.gs) using designated test records without corrupting existing records.

## Acceptance Criteria

### End Call Handling
- [ ] Clicking the End Call button immediately halts active speech recognition and stops speech synthesis playback.
- [ ] The call interface cleanly transitions to the session summary or ready state with zero hanging timers, active media/audio recognition listeners, or frozen UI controls.

### Cross-Device & Admin Syncing
- [ ] A completed session or progress update performed in one session/viewport (e.g., mobile view) is retrievable and accurately displayed when accessing the student profile from a separate desktop session/viewport.
- [ ] The Admin portal accurately reflects the updated student progress and session history after a completed speaking session.

### Google Sheets Database Storage
- [ ] Backend API calls for saving student progress and session history execute successfully against the Google Sheets backend endpoint.
- [ ] Verification tests using designated test records confirm that session entries and progress values are permanently written to and retrievable from the Google Sheets database.

## Verification Resources
- Existing test suites available in `scratch/`: `test_ai_coach.cjs`, `test_connected_conversation.cjs`, `test_mission_advance_and_continuity.cjs`, `test_master_prompt_audit.cjs`, `test_live_call_button.cjs`, `test_voice_turn_reply.cjs`.
- Additional automated test scripts created by the team to verify the End Call lifecycle, cross-device sync, and backend Google Sheets persistence.
