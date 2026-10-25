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
| **1** | Introduce Yourself | 30 | Present tense, personal pronouns, 'to be' | Introducing name, profession, origin, hobbies, and background |
| **2** | Talk About Others | 30 | Third-person singular (he/she/they), descriptive adjectives | Describing friends, colleagues, personality traits, and roles |
| **3** | Describe Your Family | 30 | Possessive pronouns (my/his/her/their), family vocabulary | Describing family relationships, personal belongings, and home |
| **4** | Talk About What You Can Do | 30 | Modal verbs: can, could, be able to | Expressing personal abilities, talents, and professional skills |
| **5** | Talk About Responsibilities | 30 | Obligation modals: must, have to, need to, responsible for | Work duties, daily obligations, family responsibilities |
| **6** | Express Yourself Politely | 30 | Polite modals: would you mind, could you please, may I | Workplace etiquette, asking favors, polite requests |
| **7** | Ask Like a Pro | 30 | Wh- questions, inverted auxiliary questions, tag questions | Professional inquiries, interviewing others, gathering information |
| **8** | Handle Everyday English | 30 | Common phrasal verbs, conversational idioms, daily survival phrases | Daily greetings, small talk, street directions, common social situations |
| **9** | Talk About Your Daily Life | 40 | Simple present, adverbs of frequency (always, often, rarely) | Morning routines, commute, workday structure, evening unwind |
| **10** | Express Your Likes and Opinions | 40 | Opinion phrases (in my view, I prefer), gerunds vs infinitives | Debating preferences, sharing reviews, expressing viewpoints |
| **11** | Ask, Answer and Communicate | 40 | Direct and indirect speech, conversational connectors (however, moreover) | Two-way discussions, clarifying ambiguity, meeting participation |
| **12** | Talk About What's Happening Now | 40 | Present continuous (is/am/are + -ing), dynamic vs stative verbs | Describing live scenes, ongoing tasks, current temporary situations |
| **13** | Communicate About Current and Future Activities | 40 | Present continuous for future arrangements, 'going to' for plans | Scheduling appointments, upcoming weekend plans, project milestones |
| **14** | Talk About Yesterday | 40 | Simple past regular and irregular verbs, past time markers | Recounting yesterday's actions, unexpected events, accomplishments |
| **15** | Talk About Past Experiences | 40 | Present perfect (have + past participle) vs simple past | Life achievements, travel experiences, skills acquired over time |
| **16** | Tell a Short Story | 40 | Narrative tenses, chronological connectors (first, then, suddenly, finally) | Storytelling, recounting an anecdote, sharing an adventure |
| **17** | Describe What Was Happening | 40 | Past continuous (was/were + -ing), interrupted past with 'when' / 'while' | Describing background scenes in the past, simultaneous actions |
| **18** | Share Your Life Journey | 40 | Past perfect (had + participle), used to, life milestones | Personal autobiography, career milestones, major transitions |
| **19** | Talk About Recent Actions | 40 | Present perfect continuous (have been + -ing), just, already, yet | Recent activities with present effects, ongoing projects |
| **20** | Talk About Your Future Plans | 40 | Future forms: will, be going to, planning to, intend to | 1-year and 5-year goals, career aspirations, family plans |
| **21** | Make Promises and Predictions | 40 | Will for spontaneous decisions and promises, likely to, might | Work commitments, future trends, technology predictions |
| **22** | Describe Future Ongoing Actions | 40 | Future continuous (will be + -ing), time clauses with future meaning | Future schedules, visualizing upcoming life events |
| **23** | Talk About Ongoing Activities | 40 | Contrast between simple, continuous, and perfect aspects | Status updates, stand-up meetings, project progress reviews |
| **24** | Shopping Conversation | 50 | Comparative & superlative adjectives, price inquiries, refund phrases | Retail store, comparing products, negotiating prices, returns |
| **25** | Order Food Confidently | 50 | Restaurant vocabulary, conditional requests ('I would like', 'could we get') | Fine dining, dietary restrictions, paying the bill, tipping etiquette |
| **26** | Handle Travel Conversations Confidently | 50 | Airport and hotel vocabulary, checking in, directions, transit | International airports, hotel check-in, customs immigration, lost luggage |
| **27** | Handle Telephone Conversations Confidently | 50 | Telephone etiquette, taking messages, spelling names with phonetics | Professional phone calls, customer service, conference scheduling |
| **28** | Handle a Job Interview Confidently | 50 | STAR method (Situation, Task, Action, Result), professional accomplishments | Job interview, answering behavioral questions, salary discussions |
| **29** | Communicate Professionally at Work | 50 | Executive presence, diplomatic phrasing, persuasive argumentation | Boardroom presentations, cross-functional collaboration, client pitching |
| **30** | Complete a Real-Life Conversation Confidently | 50 | Spontaneous conversational repair, nuance, natural English idioms | Extended unscripted social conversation, networking mixer, dinner party |
| **31** | Speak Like a Native | 50 | Advanced collocations, natural rhythm, connected speech, nuance | Deep intellectual discussions, emotional expression, humor, subtlety |
| **32** | Speak Like a Confident English Speaker | 50 | Mastery of all tenses, persuasive rhetoric, keynote delivery | Graduation speech, keynote address, master-level fluency showcase |

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

---

## 11. Live Speaking Coach Architecture & Continuous Voice Loop

### 11.1 Two Interaction Modes:
- **Live Voice Coach (Default & Primary):** Tap "Start Live Practice" once to initiate a continuous, hands-free conversation loop. Microphone audio is continuously monitored with Web Audio API `AudioContext` and `AnalyserNode`. Spoken turns are automatically detected with end-of-turn voice activity detection (VAD).
- **Text Practice (Optional Fallback):** Intended for silent environments or unsupported browsers. Text inputs are evaluated for grammatical accuracy, but **never** increment official verified spoken sentence progress.

### 11.2 12-State Conversation State Machine:
1. `IDLE`: Session initialized, waiting to start live practice.
2. `INITIALIZING`: Setting up audio context and engine pipelines.
3. `REQUESTING_MICROPHONE`: Requesting browser media permission (`navigator.mediaDevices.getUserMedia`).
4. `LISTENING`: Microphone active, speech recognition listening, real-time volume monitored.
5. `PROCESSING_SPEECH`: End-of-turn detected; transcribing and tokenizing student speech.
6. `GENERATING_RESPONSE`: Application engine assessing eligibility and drafting spoken response.
7. `SPEAKING`: Browser `SpeechSynthesis` speaking aloud. Student can interrupt.
8. `INTERRUPTED`: Student spoke during coach speech; audio cancelled immediately, pivoting to student turn.
9. `PAUSED`: User paused session or issued voice pause intent ("stop", "pause").
10. `RECOVERING`: Transient recognition glitch; restarting listening loop safely without duplicate handlers.
11. `ENDING`: User ending session; flushing final progress and releasing audio resources.
12. `ERROR`: Microphone denial or unsupported browser state with friendly guidance.

### 11.3 Barge-In Interruption:
While state is `SPEAKING`, if student speech or voice energy is detected, the coach immediately aborts audio output (`window.speechSynthesis.cancel()`), transitions to `INTERRUPTED` $\to$ `LISTENING`, and captures the student's utterance.

### 11.4 Spoken Natural Voice Intents:
- "stop" / "pause": Pauses live listening.
- "resume" / "start" / "continue": Resumes live conversation.
- "repeat that" / "repeat please": Repeats the last question.
- "speak slowly" / "slower please": Reduces coach speech speed.
- "I don't understand" / "help": Provides simplified prompt explanation.
- "end session" / "goodbye": Finalizes practice and generates Daily Session Report.
