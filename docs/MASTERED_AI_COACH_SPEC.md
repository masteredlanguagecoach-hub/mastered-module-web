# MASTERED AI COACH SPECIFICATION
## Authoritative Product Behavior, Curriculum, Workflow, and Assessment Specification

**Official Operating Principle:**
> *Speak first. Practice consistently. Improve meaningfully. Communicate confidently.*

---

## 1. System Overview & Architecture

The Mastered AI Coach is a browser-local, voice-first English speaking coach integrated into the Mastered Language Coach Students Portal.
It implements an **application-controlled assessment architecture**:
- **Coaching Role (AI / Speech Engine):** Introduces speaking tasks, transcribes voice locally via Web Speech API, provides concise corrective feedback, and adapts conversational difficulty.
- **Application Role (Deterministic Engine):** Authenticates students, retrieves official student records, validates and deduplicates attempts, deterministically calculates progress percentages, enforces sentence targets and mission transitions, and securely persists confirmed progress records.

---

## 2. Official 32-Mission Curriculum & Targets

The curriculum consists strictly of **32 official missions**. Mission 32 is the terminal mission. **Mission 33 must never be created or referenced.**

### Sentence Target Progression:
- **Missions 1–8 (Foundation Phase):** **30** verified correct spoken sentences per mission.
- **Missions 9–23 (Mastery & Fluency Phase):** **40** verified correct spoken sentences per mission.
- **Missions 24–32 (Professional & Real-World Phase):** **50** verified correct spoken sentences per mission.

### Total Curriculum Target:
$(8 \times 30) + (15 \times 40) + (9 \times 50) = 240 + 600 + 450 = 1,290$ verified spoken sentences.

### Complete 32-Mission Curriculum Directory:

| Mission | Official Title | Target | Focus Area & Grammar | Situation / Speaking Topic |
|---|---|:---:|---|---|
| **1** | Self Introduction | 30 | Present tense, personal pronouns, 'to be' | Introducing name, profession, origin, hobbies, and background |
| **2** | Talking About Other People | 30 | Third-person singular (he/she/they), adjectives | Describing friends, colleagues, personality traits, and roles |
| **3** | Family, Possessions & Demonstratives | 30 | Possessive pronouns (my/his/her/their), this/that/these/those | Describing family relationships, personal belongings, and home |
| **4** | Expressing Abilities & Polite Requests | 30 | Modals: can, could, would, may | Expressing personal abilities, asking polite favors, workplace requests |
| **5** | Daily Routines & Habits | 30 | Simple present, adverbs of frequency (always, often, usually) | Morning routines, work schedules, daily commute, evening habits |
| **6** | Actions Happening Now | 30 | Present continuous (is/am/are + -ing) | Describing current activities, live scenes, temporary situations |
| **7** | Talking About Past Events | 30 | Simple past (regular & irregular verbs), time markers (yesterday, ago) | Childhood memories, yesterday's activities, past trips |
| **8** | Future Plans & Intentions | 30 | Future forms: going to, will, plan to | Weekend plans, upcoming goals, travel plans, next year's targets |
| **9** | Simple Present Mastery | 40 | Question formation (do/does), negatives (don't/doesn't) | Inquiring about habits, clarifying schedules, general facts |
| **10** | Simple Present Playbook | 40 | State vs dynamic verbs, habitual descriptions | Detailed lifestyle interviews, job role breakdowns, daily workflows |
| **11** | Simple Present Mastery Dashboard | 40 | Extended conversational flow, connectors (because, although, however) | Explaining opinions on work-life balance, comparing routines |
| **12** | Present Continuous Mastery | 40 | Present continuous for future arrangements, dynamic descriptions | Organizing events, real-time commentary, project updates |
| **13** | Present Continuous Playbook | 40 | Contrast between simple present and continuous | Describing trends, changes in technology, temporary projects |
| **14** | Past Tense Mastery | 40 | Did you...? past negatives (didn't), irregular verb drill | Investigating past incidents, discussing historical events |
| **15** | Simple Past Mastery | 40 | Sequencers (first, then, after that, finally) | Recounting step-by-step past experiences, recounting an achievement |
| **16** | Storytelling | 40 | Narrative tenses, descriptive adjectives, atmosphere | Telling personal stories, memorable journeys, overcoming challenges |
| **17** | Interrupted Actions | 40 | Past continuous + simple past (was doing when something happened) | Describing unexpected interruptions, accidents, memorable moments |
| **18** | Present Perfect Mastery | 40 | Present perfect (have/has + V3), ever, never, already, yet | Life experiences, travel history, personal milestones |
| **19** | Present Perfect Blueprint | 40 | Present perfect vs simple past, since vs for | Career history, duration of habits, recent accomplishments |
| **20** | Future Plans Blueprint | 40 | Conditional future (if + present, will + verb) | Career aspirations, contingency plans, conditional scenarios |
| **21** | Future Tense Mastery | 40 | Future continuous (will be doing), predictions | Imagining life in 10 years, future industry forecasts, milestones |
| **22** | Future Continuous Mastery | 40 | Specific future times, scheduling arrangements | Describing schedule at 3 PM tomorrow, business travel coordination |
| **23** | Ongoing Actions | 40 | Present perfect continuous (have been doing) | Explaining ongoing projects, hobby progression, recent efforts |
| **24** | Shopping and Retail English | 50 | Inquiries, price negotiation, returns, sizing | Buying clothes, asking for discounts, resolving billing disputes |
| **25** | Restaurant English | 50 | Ordering food, dietary requests, compliments, complaints | Reserving a table, ordering meals, requesting bill, dining feedback |
| **26** | Travel English | 50 | Airport navigation, hotel check-in, asking directions | Boarding flights, customs inquiries, hotel room issues, sightseeing |
| **27** | Telephone Conversations | 50 | Phone etiquette, taking messages, clarifying information | Answering business calls, transferring lines, dealing with bad connections |
| **28** | Job Interview English | 50 | Professional strengths, STAR method, career goals | Self-introduction in interview, handling behavioral questions |
| **29** | Corporate English | 50 | Meeting participation, disagreeing politely, pitching ideas | Leading status meetings, proposing business strategies, team negotiations |
| **30** | English Mastery | 50 | Idiomatic expressions, nuance, persuasive speech | Debating controversial topics, public speaking, influencing others |
| **31** | Natural Fluency Upgrade | 50 | Sentence variety, complex connectors, natural rhythm | Delivering impromptu speeches, analyzing complex world problems |
| **32** | Professional English Mastery | 50 | Executive communication, leadership presentation | Final comprehensive executive presentation, course defense |

---

## 3. Student Registration & Profile Workflows

### Required Profile Fields:
1. `admissionNumber`: Unique student identifier (e.g., `MTR-7082`). Must not serve as authentication by itself.
2. `name`: Student full name.
3. `learningGoal`: Target outcome (e.g., "Fluency for Job Interviews", "Corporate Communication").
4. `englishLevel`: Current assessed difficulty level (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`).
5. `currentMission`: Integer between 1 and 32.
6. `verifiedSentences`: Integer representing verified spoken sentences in current mission.
7. `missionTarget`: Target sentences for current mission (30, 40, or 50).
8. `progressPct`: Calculated integer $(0 \text{ to } 100\%)$.
9. `missionStatus`: `'IN_PROGRESS'`, `'PASSED'`, or `'COMPLETED'`.
10. `lastUpdated`: ISO-8601 timestamp of last confirmed progress sync.

### Registration Rules:
- **New Student:** If no prior record exists, prompt for learning goal and baseline level. Never overwrite existing profiles.
- **Returning Student:** Automatically resume from the last confirmed `currentMission` and `verifiedSentences`.
- **Duplicate Prevention:** If admission number matches an existing registered student, resume that profile rather than creating a duplicate.
- **Missing Records:** If database read fails, report the error honestly. **Never create a replacement record merely because an existing record cannot be retrieved.**

---

## 4. Official Command Dispatcher

The AI Coach supports seven official commands and their natural-language equivalents:

1. **`NEW STUDENT`**
   - *Natural equivalents:* "I am a new student", "Register me", "Sign up", "First time here".
   - *Behavior:* Initializes profile setup workflow without creating duplicates.
2. **`START`**
   - *Natural equivalents:* "Start my course", "Begin", "Let's start", "Ready to practice".
   - *Behavior:* Loads current mission and initiates the first speaking turn.
3. **`CONTINUE`**
   - *Natural equivalents:* "Next question", "Keep going", "Continue practice", "More practice".
   - *Behavior:* Delivers the next speaking prompt within the active mission.
4. **`HOMEWORK`**
   - *Natural equivalents:* "Give me homework", "Assignment", "Home task".
   - *Behavior:* Generates a 3-part homework assignment based on current mission concepts. Does not count toward spoken sentence progress.
5. **`VOCABULARY`**
   - *Natural equivalents:* "Teach me vocabulary", "New words", "Word list".
   - *Behavior:* Provides 5 high-yield vocabulary words with pronunciations and example sentences tailored to the current mission.
6. **`FREE TALK`**
   - *Natural equivalents:* "Free conversation", "Casual chat", "Let's just talk".
   - *Behavior:* Enters guided natural conversation. **Crucial:** Must strictly preserve the student's official mission state without altering verified counts unless structured speaking criteria are resumed.
7. **`END SESSION`**
   - *Natural equivalents:* "I want to stop", "Finish for today", "Goodbye", "Exit", "Bye", "End session".
   - *Behavior:* Stops exercises, reconciles verified attempts, saves progress via authorized cloud storage, confirms save status, provides a learning recap, and suggests optional homework.

Students may also exit at any time using ordinary conversational speech.

---

## 5. Speaking-First Practice Pipeline (12-Step Protocol)

Every speaking turn must strictly follow this 12-step sequence:
1. **Load Profile:** Load confirmed student profile and active mission.
2. **Brief Introduction:** Introduce the situational task in 1–2 sentences.
3. **Clear Prompt:** Ask exactly ONE clear speaking question or give ONE specific speaking task.
4. **Wait for Speech:** Activate browser-local speech recognition and wait for student voice input.
5. **Local Transcription:** Transcribe the audio stream locally using the Web Speech API.
6. **Reliability Check:** Verify transcript confidence score (> 0.6) and length (> 2 words).
7. **Mission Assessment:** Assess the grammatical structure and relevance against current mission focus.
8. **Concise Feedback:** Provide immediate, encouraging feedback (1–2 sentences max).
9. **Correction & Retry:** If incorrect, provide a clear model correction and invite the student to retry.
10. **Application-Controlled Counter:** If and only if the attempt is spoken and correct, increment verified sentence count by 1.
11. **Next Prompt:** Deliver the next contextual question.
12. **Authorized Persistence:** Persist verified progress via authorized Google Sheets / REST endpoint.

### Strict Counting Guardrails:
- **Never answer your own speaking question** before the student attempts it.
- **Typed text NEVER counts** as verified spoken practice.
- **Coach-generated examples NEVER count**.
- **Incorrect attempts NEVER count**.
- **Unverified transcripts or unintelligible speech NEVER count**.
- **Duplicate event submissions NEVER count**.
- If a student repeats an incorrect sentence correctly, **count only the eligible corrected attempt, once**.
- If one response contains multiple distinct correct sentences, count each independently only when reliably parsed and assessed under official rules.

---

## 6. Deterministic Progress & Assessment Engine

All progress calculations must be deterministic application logic:

$$\text{Progress \%} = \min\left(100, \text{round}\left(\frac{\text{Verified Correct Spoken Sentences}}{\text{Mission Target Sentences}} \times 100\right)\right)$$

### Mission PASS Conditions:
A mission is officially marked `PASSED` if and only if:
1. Verified correct spoken sentence count reaches the mission target ($30, 40, \text{ or } 50$).
2. All mission-specific requirements are met.
3. Progress write is confirmed by the cloud database.

Upon PASS, the student advances to $\text{Mission} + 1$, resetting verified sentences to $0$ for the new mission while preserving cumulative historical counts.
Cumulative progress across all missions must **never be reset** between sessions.

---

## 7. Adaptive Teaching Guidance

- **BEGINNER (Missions 1–8):**
  - Use familiar, everyday vocabulary.
  - Ask short, direct questions.
  - Provide sentence starters (e.g., *"My name is..."*, *"I usually..."*).
  - Limit corrections to one critical error at a time.
- **INTERMEDIATE (Missions 9–23):**
  - Encourage complete sentence explanations and reasoning (*"because..."*, *"therefore..."*).
  - Introduce realistic role-plays.
  - Ask follow-up questions to elicit elaboration.
- **ADVANCED (Missions 24–32):**
  - Practice formal debate, executive summaries, negotiation, and STAR interview responses.
  - Expect complex grammatical structures (conditionals, passive voice, subjunctive).
  - Focus feedback on nuance, tone, and professional polish.

---

## 8. Speech and Evidence Limitations

- All speech processing must use the browser's built-in `SpeechRecognition` / `webkitSpeechRecognition` and `SpeechSynthesis`.
- **Raw audio must never be uploaded** to any remote inference service.
- If audio recognition is uncertain or unintelligible, politely request repetition without guessing or inventing words.
- A transcript alone does not prove pronunciation or intonation; avoid false claims about acoustic perfection.

---

## 9. Additive-Only Architectural Integration

- All code for the AI Coach must be housed in isolated modules (e.g. `assets/aiCoach/`).
- No modifications to existing user authentication, database schemas, or quiz logic are permitted without explicit prior authorization.
- Reuses existing authorized Google Sheets REST API endpoints for progress persistence.

---

## 10. Mandatory Acceptance Tests

1. New student registration creates valid record without duplicates.
2. Returning student resumes from confirmed saved state.
3. All 32 official missions load in exact sequence; no Mission 33.
4. Correct sentence targets enforced (1–8: 30, 9–23: 40, 24–32: 50).
5. Correct spoken sentence increments verified count by exactly 1.
6. Incorrect sentence does not increment count.
7. Corrected retry attempt increments count once.
8. Typed text strictly increments verified count by 0.
9. Duplicate rapid-click or duplicate event does not increase count.
10. Deterministic progress percentage matches formula.
11. Mission PASS requires target + confirmed persistence.
12. Failed database writes are reported honestly to the student.
13. Stale concurrent session updates cannot overwrite newer progress.
14. Unclear speech does not invent answers or count.
15. Students can end session at any time with natural language.
16. Mission 32 is strictly the final terminal mission.
17. Progress persists across browser refreshes and sessions.
18. Student PII is strictly protected.
19. Coach accurately displays current mission and confirmed progress.
20. Existing student portal functions remain 100% operational.
