# BRIEFING — 2026-11-01T10:01:00Z

## Mission
Investigate Coach Sarah's Web Speech API synthesis implementation in assets/aiCoach/speech.js and index.html, uncover root causes for robotic tone and glitches across desktop and mobile, and propose high-quality natural voice selection heuristics and synthesis settings.

## 🔒 My Identity
- Archetype: explorer
- Roles: Voice Synthesis Explorer
- Working directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_voice\
- Original parent: 4f9e4f55-d34b-495c-91cd-1f28c4210a04
- Milestone: Voice Synthesis Investigation & Quality Heuristics

## 🔒 Key Constraints
- Read-only investigation — do NOT implement or modify project source code
- Work within assigned directory (.agents/teamwork/teamwork_explorer_r2_voice/)
- Base all conclusions on verified source code and reproducible evidence
- Deliver detailed findings in voice_investigation.md and handoff.md

## Current Parent
- Conversation ID: 4f9e4f55-d34b-495c-91cd-1f28c4210a04
- Updated: not yet

## Investigation State
- **Explored paths**: `assets/aiCoach/speech.js`, `index.html`, `assets/aiCoach/ui.js`, `assets/aiCoach/engine.js`, `scratch/test_chrome_speech.cjs`, `scratch/test_female_selector.cjs`, `scratch/test_voice_turn_reply.cjs`
- **Key findings**:
  1. `isMaleVoice()` substring bug (`"female".indexOf("male") !== -1`) rejects all female voices with "female" in name/URI (Google UK English Female, Samsung English Female).
  2. String mismatch on Windows Chrome searches for `'google us english female'` instead of `"Google US English"`, falling back to robotic `Microsoft Zira`.
  3. iOS Safari prioritizes compact `Samantha` over `Ava (Enhanced)` / `Samantha (Enhanced)`.
  4. Hardcoded `pitch: 1.20` & `1.30` triggers DSP resampler chipmunk warble.
  5. Slow `rate: 0.86` creates staccato phoneme stretching (optimal: `0.96`).
  6. Immediate filler ("I see!") aborted mid-syllable by `synth.cancel()`, popping audio and freezing mobile queues.
  7. Desktop 5000ms `pause()`/`resume()` causes periodic audio stutter.
- **Unexplored areas**: None (investigation complete).

## Key Decisions Made
- Designed and validated weighted multi-tier voice selection heuristic across 5 OS/browser platforms.
- Formulated optimal synthesis parameters (`pitch = 1.0`, `rate = 0.96`, volume = 1.0).
- Devised smooth filler queueing strategy to eliminate mid-word audio clipping.

## Artifact Index
- DISPATCH.md — Initial dispatch message
- BRIEFING.md — Persistent context & state
- progress.md — Liveness heartbeat & progress log
- voice_investigation.md — Comprehensive voice synthesis report
- handoff.md — 5-component handoff report
