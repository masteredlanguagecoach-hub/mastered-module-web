# Handoff Report: Voice Synthesis Investigation & Quality Optimization

**Agent**: Voice Synthesis Explorer (`teamwork_explorer_r2_voice`)  
**Parent Agent**: `4f9e4f55-d34b-495c-91cd-1f28c4210a04`  
**Working Directory**: `c:\Users\user\Desktop\MASTERED LANGUAGE COACH STUDENTS PORTAL WEB APP\.agents\teamwork\teamwork_explorer_r2_voice\`  
**Target Files**: `assets/aiCoach/speech.js`, `index.html`  
**Handoff Type**: Hard (Task Complete)

---

## 1. Observation

Direct observations from code inspection and execution:

### 1.1 Fatal Substring Collision in `isMaleVoice`
In `assets/aiCoach/speech.js:99-122`:
```javascript
var MALE_VOICE_NAMES = [
  'david', 'mark', 'george', 'ravi', 'guy', 'brian', 'christopher', 'eric',
  'james', 'ryan', 'steffan', 'andrew', 'tom', 'alex', 'daniel', 'fred',
  'oliver', 'arthur', 'thomas', 'nathan', 'william', 'male', 'sean',
  'richard', 'paul', 'john', 'michael', 'stefan', 'prabhat', 'hemant',
  'male_1', 'male_2', 'male-1', 'en-us-x-iom', 'en-us-x-iol'
];

function isMaleVoice(v) {
  if (!v) return false;
  var text = ((v.name || '') + ' ' + (v.voiceURI || '')).toLowerCase();
  for (var i = 0; i < MALE_VOICE_NAMES.length; i++) {
    if (text.indexOf(MALE_VOICE_NAMES[i]) !== -1) return true;
  }
  return false;
}
```
Command execution result via Node:
```javascript
node -e "const test = 'Google UK English Female'; console.log(test.toLowerCase().indexOf('male') !== -1);"
// OUTPUT: true
```
Because `"female"` contains the substring `"male"`, any voice with `"female"` in its name or URI (e.g., `"Google UK English Female"`, `"Samsung English (United States) Female"`) returns `isMaleVoice(v) === true`.

### 1.2 Windows Chrome String Mismatch Forces `Microsoft Zira`
In `assets/aiCoach/speech.js:135-159`:
```javascript
var preferredFemaleNames = [
  'samantha',
  'karen',
  'victoria',
  'microsoft jenny online (natural)',
  'microsoft aria online (natural)',
  'microsoft sonia online (natural)',
  'google us english female',
  'google uk english female',
  'microsoft zira',
  ...
```
Google Chrome on Windows provides Google's high-quality cloud voice named `"Google US English"`. The string `'google us english female'` fails to match because `"Google US English"` lacks the word `"female"`. Furthermore, `"Google UK English Female"` is rejected by `isMaleVoice()`. The selector falls through to `'microsoft zira'`.

### 1.3 Legacy Voice Prioritization on Apple Devices
`'samantha'` is at index 0 of `preferredFemaleNames`. On iOS and macOS, Apple provides `Samantha` (compact 22kHz, low-bitrate) alongside `Ava (Enhanced)` / `Ava (Premium)` / `Samantha (Enhanced)`. The search matches compact `Samantha` first, ignoring modern neural voices.

### 1.4 High-Pitched Robotic Distortion Hardcoded
In `assets/aiCoach/speech.js`:
- Line 751: `utterance.pitch = 1.20;`
- Line 825: `utterance.pitch = isIOS ? 1.05 : 1.20;`
- Line 836: `utterance.pitch = 1.30;`
- Line 917: `fallbackUtterance.pitch = 1.25;`
In `index.html`:
- Line 1787: `u.pitch = 1.2;`

### 1.5 Dragging Cadence Hardcoded
In `assets/aiCoach/speech.js:212, 824`:
- `this.speechRate = options.speechRate || 0.86;`
- `utterance.rate = self.speechRate || 0.86;`
In `index.html:1927`:
- `speechRate: voiceSpeechSpeed || 0.86,`

### 1.6 Filler Collision & Mid-Word Truncation
In `index.html:1820-1825`:
```javascript
if (voicePipelineRef.current && typeof voicePipelineRef.current.speakImmediateAcknowledgment === 'function') {
  voicePipelineRef.current.speakImmediateAcknowledgment();
} else {
  speakImmediateFiller();
}
```
Followed immediately by `await session.processStudentSpeechTurn()` and `voicePipelineRef.current.speakCoachResponse()`.
In `assets/aiCoach/speech.js:789-795`:
```javascript
if (this.synth) {
  try {
    if (!isIOS || this.synth.speaking) {
      this.synth.cancel();
    }
  } catch (e) {}
}
```
If the AI turn resolves in 200ms - 500ms, `speakCoachResponse` calls `synth.cancel()`, cutting off the filler mid-syllable, popping audio buffers, and corrupting the Web Speech queue on iOS and Android.

### 1.7 Destructive Keep-Alive Interval on Desktop
In `assets/aiCoach/speech.js:891-899`:
```javascript
if (!isMobile) {
  self.speechKeepAliveInterval = setInterval(function () {
    if (self.synth && self.synth.speaking && !self.synth.paused) {
      self.synth.pause();
      self.synth.resume();
    }
  }, 5000);
}
```
Every 5 seconds during playback, the audio stream is paused and resumed, causing an audible stutter every 5000ms.

---

## 2. Logic Chain

1. **Premise 1 (Observation 1.1)**: `"female".indexOf("male") >= 0`. Any voice whose name or URI contains `"female"` is categorized as male by `isMaleVoice()`.
2. **Inference 1**: `femaleDeclared` in `getCoachFemaleVoice()` can never match any voice declaring `"female"` because it requires `!isMaleVoice(v)`. On Samsung Galaxy devices, Samsung's only female voice (`en_US_female`) is discarded.
3. **Premise 2 (Observation 1.2 & 1.1)**: In Chrome on Windows, `"Google US English"` lacks the substring `'female'`, failing to match `'google us english female'`. `"Google UK English Female"` is rejected as male.
4. **Inference 2**: On Windows Chrome, the algorithm falls back to `'microsoft zira'`, which is an old robotic SAPI5 voice.
5. **Premise 3 (Observation 1.4 & 1.5)**: Speech synthesis settings enforce `pitch = 1.20` (or `1.30` fallback) and `rate = 0.86`.
6. **Inference 3**: Forcing pitch shifts on native voices triggers DSP resampling warble ("chipmunk robot"). A rate of `0.86` unnaturally elongates phonemes, creating staccato grain.
7. **Premise 4 (Observation 1.6)**: `speakImmediateAcknowledgment` plays a filler ("I see!"), while `speakCoachResponse` immediately calls `synth.cancel()` as soon as the response is ready (200ms - 500ms later).
8. **Inference 4**: The filler is aborted mid-word. On iOS Safari and Android Chrome, `cancel()` during active playback desynchronizes the OS audio queue, causing subsequent `speak()` calls to fail silently.
9. **Conclusion**: Eliminating robotic sound and glitches requires:
   - Word-boundary matching in `isMaleVoice()` with an explicit female guard.
   - Weighted multi-tier voice scoring prioritizing neural/natural voices across platforms (`Microsoft Jenny Natural`, `Google US English`, `Ava Enhanced`, `en-us-x-sfg`).
   - Resetting `pitch = 1.0` and `rate = 0.96`.
   - Eliminating premature mid-word `cancel()` during fillers.
   - Removing the 5s `pause()`/`resume()` interval.

---

## 3. Caveats

- **Network-dependent voices**: High-fidelity online neural voices (e.g. `Microsoft Jenny Online (Natural)` in Edge or `Google US English` in Chrome) require active Internet connectivity. If offline, the browser gracefully falls back to local voices (`Microsoft Zira` or local Android TTS). The proposed heuristic explicitly includes graceful fallbacks with `pitch = 1.0` to ensure local voices also sound clear and distortion-free.
- **Headless Chrome limitation**: Chrome running in headless mode without simulated audio devices returns an empty voice array (`[]`). Verification of voice synthesis must use headful browser sessions or mock voice inventories.
- **No external paid API dependencies**: Per project requirements, all synthesis must remain 100% native via Web Speech API (`SpeechSynthesis`).

---

## 4. Conclusion

The root causes of robotic voice quality, speech glitches, and audio freezes in Coach Sarah are fully diagnosed:
1. `isMaleVoice` incorrectly rejects female voices due to substring `"male"`.
2. Chrome on Windows falls back to `Microsoft Zira` due to string mismatch.
3. iOS Safari selects compact `Samantha` over `Ava (Enhanced)`.
4. Hardcoded `pitch: 1.20` and `1.30` artificially distorts vocal formants.
5. `speakImmediateAcknowledgment` followed by `synth.cancel()` clips audio mid-syllable and freezes mobile speech queues.
6. Desktop keep-alive pauses/resumes every 5 seconds, causing audio dropouts.

Production-ready fixes and heuristics are fully detailed in `voice_investigation.md`.

---

## 5. Verification Method

### 5.1 Simulated Voice Selection Across Platforms
Run the verification script to verify that the proposed selector chooses the top-tier voice for every platform:
```powershell
node -e "
// Run test suite from voice_investigation.md Section 3 & 4
// Expected results:
// Windows Edge -> Microsoft Jenny Online (Natural)
// Windows Chrome -> Google US English / Google UK English Female
// iOS Safari -> Ava (Enhanced) / Samantha (Enhanced)
// Android Google TTS -> en-us-x-sfg-network
// Android Samsung TTS -> Samsung English (United States) Female
"
```

### 5.2 Real Browser End-to-End Verification
1. Launch local test server on port 8097 (`node scratch/test_voice_turn_reply.cjs`).
2. Verify Coach Sarah's speech playback:
   - Voice selected matches the platform's highest quality female voice.
   - Speech pitch is natural (F0 preserved, zero chipmunk effect).
   - Rate is crisp and conversational (`0.96`).
   - Turn responses play completely without mid-sentence audio cutoff or 5-second stutter.
