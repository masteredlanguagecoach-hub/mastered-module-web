# Task Assignment: Worker M1 (Generation 2) — Natural Voice Synthesis Implementation

## Context
Working Directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m1_gen2\
Project Root: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\
ORIGINAL_REQUEST.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
SCOPE.md: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\orchestrator_r2\SCOPE.md
Voice Investigation Report: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_voice\voice_investigation.md
Voice Explorer Handoff: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_voice\handoff.md

## Write Ownership
You exclusively own:
- `assets/aiCoach/speech.js`
- `index.html` (only voice-related sections: `speakImmediateFiller` around line 1786, and default speech speed)
- `scratch/test_voice_natural_selector.cjs` (new verification test script)

DO NOT modify `backend/Code.gs` or other modules in this milestone.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Detailed Requirements
1. Read ORIGINAL_REQUEST.md and the Voice Investigation Report completely.
2. Implement the weighted scoring voice selector in `assets/aiCoach/speech.js`:
   - Replace lines 99–122 with regex word-boundary `isMaleVoice()` that explicitly guards against `'female'`, `'woman'`, `'girl'` being detected as male.
   - Replace lines 125–187 with the weighted multi-tier scoring heuristic (`getCoachFemaleVoice`) giving top priority to Natural/Neural voices: Edge Jenny/Aria, Chrome Google US English, iOS Ava/Samantha Enhanced, Android sfg/Samsung Female.
   - Set optimal voice parameters: `pitch = 1.0` (eliminates robotic chipmunk warble), `rate = 0.96` (clear natural conversational pacing), `volume = 1.0`.
   - Prevent mid-sentence filler audio pops: track active filler with `isFillerPlaying` and do not abruptly call `synth.cancel()` when coach response is ready; queue or transition smoothly.
   - Remove the destructive 5000ms `pause()`/`resume()` interval.
   - Extend echo drain cooldown from 120ms to 400ms.
   - Anchor active utterances to `window.__masteredActiveUtterance` to prevent Chromium V8 garbage collection mid-speech.
3. In `index.html`:
   - In `speakImmediateFiller`, set `u.voice = window.__masteredFemaleVoice || ...`.
   - Set default speech rate to 0.96.
4. Verification:
   - Create and run `scratch/test_voice_natural_selector.cjs` using real and simulated voice lists across Windows, iOS, and Android to prove that natural female voices are selected and male voices are rejected.
   - Run existing test suites: `node scratch/test_female_selector.cjs`, `node scratch/test_ai_coach.cjs`.
5. Write your implementation report to `changes.md` and complete `handoff.md` in your working directory.


## 2026-11-01T12:27:24Z
You are the Voice Synthesis Implementer (Worker M1, Generation 2).
Working directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m1_gen2\
Project root: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\
ORIGINAL_REQUEST.md path: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\ORIGINAL_REQUEST.md
DISPATCH.md path: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_worker_r2_m1_gen2\DISPATCH.md
Voice Investigation report: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_voice\voice_investigation.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

You MUST read ORIGINAL_REQUEST.md and the Voice Investigation report before starting work.
Implement the natural voice synthesis solutions in assets/aiCoach/speech.js and index.html as detailed in DISPATCH.md.
Run builds/tests to verify your work.
Write your report to changes.md and handoff.md in your working directory.
When finished, send a completion message back to the orchestrator.
