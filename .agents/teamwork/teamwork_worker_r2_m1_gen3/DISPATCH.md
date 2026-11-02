# Task Assignment: Worker M1 (Generation 3) — Voice Synthesis Challenger Remediation

## Context
Working Directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m1_gen3\
Project Root: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\
ORIGINAL_REQUEST.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
SCOPE.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\orchestrator_r2\SCOPE.md
GATE_STATUS.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\orchestrator_r2\GATE_STATUS.md
Challenger 1 Handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m1_1\handoff.md
Challenger 2 Handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_challenger_r2_m1_2\handoff.md
Test Suites:
- `scratch/test_voice_challenger_audit.cjs`
- `scratch/test_adversarial_voice_edge_cases.cjs`
- `scratch/test_resilience_empirical.cjs`
- `scratch/test_voice_natural_selector.cjs`

## Write Ownership
You exclusively own:
- `assets/aiCoach/speech.js`
- `index.html` (only voice-related sections)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Defects to Remediate in `assets/aiCoach/speech.js` and `index.html`:
1. `BUG-M1-01`: In `getCoachFemaleVoice()` (`speech.js`), defend against null/sparse voice entries: filter out falsy elements (`voices = voices.filter(Boolean)`) and guard `scoreVoice(v)` with `if (!v) return -9999;`.
2. `BUG-M1-02`: In `speakCoachResponse()` (`speech.js`), when `!text || !text.trim()`, only transition to `STATES.LISTENING` and invoke `restartListening()` if `this.isSessionActive === true`.
3. `BUG-M1-03`: In `speakCoachResponse()` (`speech.js`), do not mutate `this.state` to `STATES.SPEAKING` when the session is inactive (`!this.isSessionActive && !isStandalone`). If inactive and not standalone, cleanly invoke `if (onFinish) onFinish(); return;`.
4. `BUG-M1-04`: Support standalone speech playback in `BrowserSpeechEngine.prototype.speak` without requiring continuous session listening (`isSessionActive: true`).
5. `ADV-01`: Deduplicate filler invocations between `speech.js` (`onStudentTurnComplete` trigger) and `index.html` (`speakImmediateFiller`). Ensure only one filler utterance is created and queued.
6. `ADV-02`: Fix prompt echo sanitizer (`speech.js:616`) when candidate speech is pure echo (`candWords.length <= promptWordCount`). Reject pure prompt echoes so they do not loop.
7. `ADV-03`: In mobile `restartListening()` (`speech.js`), add a retry timer (e.g. 300ms) on `recognition.start()` exception so the pipeline does not remain deaf.
8. `ADV-04`: In iOS `unlockMobileAudio()` (`speech.js`), anchor primer utterance to global scope (`window.__masteredUnlockUtterance`) to prevent premature GC lockup.

## Verification:
Run:
- `node scratch/test_voice_challenger_audit.cjs` (Must report 0 bugs!)
- `node scratch/test_resilience_empirical.cjs`
- `node scratch/test_voice_natural_selector.cjs`
- `node scratch/test_ai_coach.cjs`
- `node scratch/test_connected_conversation.cjs`

Write your report to `changes.md` and complete `handoff.md`.
