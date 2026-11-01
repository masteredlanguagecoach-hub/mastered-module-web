Optimize Coach Sarah's conversational latency and interaction behaviour in the Mastered Language Coach Students Portal web application so replies feel immediate, natural, and engaging like talking to a real human English trainer.

Working directory: c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP
Integrity mode: development

## Requirements

### R1. Sub-2-Second Perceived Voice Response Latency
Eliminate conversation lag across the voice pipeline (index.html, assets/aiCoach/engine.js, assets/aiCoach/speech.js):
- Implement immediate conversational acknowledgments and fillers (e.g., "I see!", "Got it!", "Interesting!", "Tell me more!") spoken immediately upon student speech completion while the AI generates the complete response.
- Streamline transition states from PROCESSING_SPEECH to SPEAKING, removing artificial pauses, unnecessary delays, or blocking operations.
- Ensure the perceived time between student speech end and coach audio response is under 2 seconds.

### R2. Natural, Context-Aware Coach Persona & Dynamic Dialogue
Enhance Coach Sarah's conversational engine (generateConnectedTurn / processStudentSpeechTurn) to sound human, warm, and responsive:
- Generate contextually grounded responses that directly reference and react to the student's actual words rather than cycling through static scripted questions.
- Maintain a warm, encouraging English trainer persona using natural phrasing, positive reinforcement, and intelligent follow-up questions tailored to student responses.
- Keep the 32-mission curriculum and learning objectives intact while making in-mission dialogue dynamic and adaptive.

### R3. Preservation of Application Data & Core Architecture
- Preserve the existing application architecture without complete rewrites.
- Do NOT alter the 4 student registration fields: Name, Admission Number, English Level, and Learning Goal.
- Maintain compatibility with backend Google Apps Script and ensure existing Google Sheets student records remain uncorrupted.

### R4. Automated Testing and Live Deployment
- Write and run automated Puppeteer headless Chrome test suites that simulate student speech turns, verify state transitions, validate acknowledgment fillers, and measure response latency under 2 seconds.
- Deploy the verified application to Vercel (https://mastered-module-web.vercel.app/) and verify live deployment health.

## Acceptance Criteria

### Response Latency & Conversational Flow
- [ ] Perceived delay from student speech completion to coach audio playback (acknowledgment filler or direct turn) is under 2 seconds.
- [ ] Immediate conversational fillers ("I see!", "Got it!", etc.) trigger smoothly without blocking or cutting off the subsequent AI turn.
- [ ] Pipeline transitions (LISTENING -> PROCESSING_SPEECH -> SPEAKING -> LISTENING) execute reliably without deadlocks, state hangs, or dropped turns.

### Coach Dialogue Persona
- [ ] Coach Sarah's replies directly address the semantic content of the student's speech.
- [ ] Sarah does not loop or repeat identical scripted questions within consecutive conversation turns.
- [ ] Coach turns demonstrate warm, encouraging, human-like English trainer tone with natural conversational follow-ups.

### System & Curriculum Integrity
- [ ] All 32 curriculum missions remain functional and accessible.
- [ ] Student registration fields (Name, Admission Number, English Level, Learning Goal) remain unchanged.
- [ ] Google Sheets backend integration operates correctly without data loss or corruption.

### Verification & Deployment
- [ ] Automated headless Puppeteer test scripts execute successfully, confirming response timing and dialogue turn progression.
- [ ] Application is deployed to Vercel and the live URL loads and functions correctly.
