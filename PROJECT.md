# Project: 32-Mission Bilingual Quiz Re-Creation and Portal Integration

## Architecture
- **Frontend SPA**: `index.html` (React 18 via Babel Standalone, Tailwind CSS).
  - `StudentQuizView`: Component for question presentation, multiple-choice selection, timer, hints (`questionMl`, `questionHindi`), scoring, and answer review.
  - `StudentQuizzesHub`: Mission selection grid displaying module cards and quiz scores for all 32 missions in Malayalam and Hindi modes.
  - Active bank state: `window.ACTIVE_QUIZ_BANK`, `window.QUIZ_BANK`, `window.HINDI_QUIZ_BANK`.
- **Quiz Data Banks**:
  - `assets/quizData.js`: `QUIZ_BANK` containing 32 mission keys (`"1"` to `"32"`), each with exactly 30 questions (960 questions total). Schema: `{ id: 1..30, question: string, questionMl: string, options: [string x 4], correctIndex: 0..3 }`.
  - `assets/hindiQuizData.js`: `HINDI_QUIZ_BANK` containing 32 mission keys (`"1"` to `"32"`), each with exactly 30 questions (960 questions total). Schema: `{ id: 1..30, question: string, questionHindi: string, options: [string x 4], correctIndex: 0..3 }`.
- **Curriculum & Specification Source of Truth**:
  - `C:\Users\user\Downloads\Missions.pdf.pdf` & `assets/aiCoach/curriculum.js` (`OFFICIAL_CURRICULUM`): 32 missions with objectives, situations, grammar foci, speaking topics, starter prompts.
  - Synthesized Specification: `.agents/teamwork/teamwork_spec_miner_survey_missions/spec_report.md`.
- **Data Flow**:
  1. Student selects Mission (1 to 32) and language mode (Malayalam vs Hindi).
  2. `index.html` pulls the 30 mission questions from `QUIZ_BANK[missionId]` or `HINDI_QUIZ_BANK[missionId]`.
  3. UI displays question text, vernacular hint (`questionMl` or `questionHindi`), and 4 randomized/labeled options A, B, C, D.
  4. On submission, `calculateScore()` checks `userAnswers[idx] === q.correctIndex`, calculates percentage, and renders feedback.
  5. Monotonic score saved to `localStorage` and synced to Google Sheets via `callAppsScript('submitQuizScore')`.

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Authoritative 32-Mission Curriculum Specification | Extract and document all 32 missions, objectives, situations, grammar, vocabulary | Survey | `Missions.pdf`, `curriculum.js` |
| F2 | Mission-Aligned Malayalam Quiz Bank (960 Qs) | 32 missions x 30 questions in `assets/quizData.js` matching `QUIZ_BANK` schema, fixing M19-21 option corruption and M27 Q30 correctIndex | M1 | R1, Survey |
| F3 | Mission-Aligned Hindi Quiz Bank (960 Qs) | 32 missions x 30 questions in `assets/hindiQuizData.js` matching `HINDI_QUIZ_BANK` schema, adding missing M31-M32, eliminating 99.6% Option A bias | M2 | R2, Survey |
| F4 | Dual Environment Export Compatibility | Support both browser (`window.QUIZ_BANK` / `window.HINDI_QUIZ_BANK`) and Node.js (`module.exports`) in both quiz files | M1, M2 | Survey, R4 |
| F5 | Portal Vernacular Hint & Review Rendering | Support `{currentQ.questionHindi || currentQ.questionMl}` in `StudentQuizView` active view and answer review in `index.html` | M3 | R3, Survey |
| F6 | Portal Active Bank Fallback Precedence | Resolve `window.ACTIVE_QUIZ_BANK` fallback race condition in `index.html` to prevent accidental Hindi defaulting for Malayalam students | M3 | R3, Survey |
| F7 | Portal 32-Mission Support for Hindi Mode | Extend `assets/hindiModulesData.js` or `index.html` to ensure missions 31 and 32 are fully accessible in Hindi mode | M3 | R3, Survey |
| F8 | Automated Standalone Verification Test Suite | Standalone script (`scratch/verify_quizzes.cjs`) validating all 1,920 questions, schemas, IDs, bounds, and distributions | Final | R4 |
| F9 | E2E Dual-Track Testing & Adversarial Hardening | Comprehensive 4-tier opaque-box E2E test suite (`scratch/test_e2e_quiz_portal.cjs`) + Tier 5 adversarial stress testing | Final | Project Pattern |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Mission-Aligned Malayalam Quiz Bank | F2, F4: Re-create 960 questions for 32 missions in `assets/quizData.js` | none | DONE |
| M2 | Mission-Aligned Hindi Quiz Bank | F3, F4: Re-create 960 questions for 32 missions in `assets/hindiQuizData.js` | none | IN_PROGRESS |
| M3 | Web Portal Integration & Error Fixing | F5, F6, F7: Fix `index.html` and `assets/hindiModulesData.js` for 32 missions | none | IN_PROGRESS |
| Final | 100% Verification Pass & Adversarial Hardening | F8, F9: Phase 1 (1,920 questions verification + Tiers 1-4 E2E) + Phase 2 (Tier 5 adversarial hardening) | M1, M2, M3 | PLANNED |

---

## Interface Contracts
### `assets/quizData.js` (`QUIZ_BANK`)
- Structure: Object with string keys `"1"` through `"32"`.
- Each key maps to an array of exactly 30 question objects.
- Each question object conforms strictly to:
  ```typescript
  interface QuizQuestionMl {
    id: number;           // Sequential integer 1 to 30
    question: string;     // English sentence / question prompt
    questionMl: string;   // Malayalam translation or contextual hint
    options: string[];    // Exactly 4 options: ["A) ...", "B) ...", "C) ...", "D) ..."]
    correctIndex: number; // Integer in range [0, 3]
  }
  ```
- Export contract:
  ```javascript
  if (typeof window !== 'undefined') { window.QUIZ_BANK = QUIZ_BANK; }
  if (typeof module !== 'undefined' && module.exports) { module.exports = { QUIZ_BANK }; }
  ```

### `assets/hindiQuizData.js` (`HINDI_QUIZ_BANK`)
- Structure: Object with string keys `"1"` through `"32"`.
- Each key maps to an array of exactly 30 question objects.
- Each question object conforms strictly to:
  ```typescript
  interface QuizQuestionHindi {
    id: number;           // Sequential integer 1 to 30
    question: string;     // English sentence / question prompt
    questionHindi: string;// Hindi translation or contextual hint
    options: string[];    // Exactly 4 options: ["A) ...", "B) ...", "C) ...", "D) ..."]
    correctIndex: number; // Integer in range [0, 3]
  }
  ```
- Export contract:
  ```javascript
  if (typeof window !== 'undefined') { window.HINDI_QUIZ_BANK = HINDI_QUIZ_BANK; }
  if (typeof module !== 'undefined' && module.exports) { module.exports = { HINDI_QUIZ_BANK }; }
  ```

### `index.html` ↔ Quiz Banks
- In Malayalam mode (`selectedCourse !== 'HIND TO ENG'`):
  - Uses `window.QUIZ_BANK[missionId]`.
  - Renders `questionMl` as contextual hint.
- In Hindi mode (`selectedCourse === 'HIND TO ENG'`):
  - Uses `window.HINDI_QUIZ_BANK[missionId]`.
  - Renders `questionHindi` as contextual hint.
- All 32 missions must be selectable and render without crashing.
- Evaluation: `userAnswers[idx] === q.correctIndex`.

---

## Code Layout
- `assets/quizData.js`: Malayalam quiz bank (owned by M1 Worker).
- `assets/hindiQuizData.js`: Hindi quiz bank (owned by M2 Worker).
- `index.html`: Web portal UI and quiz view (owned by M3 Worker).
- `assets/hindiModulesData.js`: Hindi module metadata (owned by M3 Worker).
- `scratch/verify_quizzes.cjs`: Standalone verification test script (owned by Verification / Final Worker).
- `scratch/test_e2e_quiz_portal.cjs`: E2E 4-tier test runner (owned by E2E Test Writer).
- `TEST_INFRA.md`: E2E testing framework specification (owned by E2E Test Writer).
- `TEST_READY.md`: E2E test completion signal (owned by E2E Test Writer).
