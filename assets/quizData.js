/**
 * Mastered Language Coach - 32-Mission Malayalam Quiz Bank
 * Aligned with Official 32-Mission Curriculum (Missions.pdf & curriculum.js)
 * Exactly 32 missions (keys "1" to "32"), 30 questions each = 960 questions total.
 * Schema: { id, question, questionMl, options: [4], correctIndex: 0..3 }
 */
const QUIZ_BANK = {
  "1": [
    {
      "id": 1,
      "question": "What is the primary goal when introducing yourself in English?",
      "questionMl": "ഇംഗ്ലീഷിൽ സ്വയം പരിചയപ്പെടുത്തുമ്പോൾ പ്രധാന ലക്ഷ്യം എന്താണ്?",
      "options": [
        "A) To achieve confident English communication",
        "B) To memorize complicated grammar rules",
        "C) To read English literature fluently",
        "D) To eliminate every spoken mistake immediately"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Which helping verb is specifically paired with the subject pronoun 'I' in the present tense?",
      "questionMl": "വർത്തമാനകാലത്തിൽ 'I' എന്ന സർവ്വനാമത്തോടൊപ്പം ഉപയോഗിക്കുന്ന സഹായക്രിയ ഏതാണ്?",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) be"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "What is the literal meaning of the pronoun \"I\" as defined in the Malayalam explanation?",
      "questionMl": "മലയാളം വിശദീകരണത്തിൽ നിർവ്വചിച്ചിരിക്കുന്നത് പോലെ \"I\" എന്ന പ്രൊനൗണിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) എനിക്ക്",
        "B) എന്റെ",
        "C) ഞാൻ",
        "D) നമ്മൾ"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Which sentence correctly pairs the pronoun 'I' with its present tense helping verb?",
      "questionMl": "'I' എന്ന സർവ്വനാമത്തോടൊപ്പം ശരിയായ വർത്തമാനകാല ക്രിയ ഉപയോഗിച്ച വാക്യം ഏതാണ്?",
      "options": [
        "A) I is ready.",
        "B) I are ready.",
        "C) I be ready.",
        "D) Whenever we use 'I', we always use 'am' (I am ready)"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Which of the following sentences contains a grammatical error?",
      "questionMl": "താഴെ പറയുന്ന വാക്യങ്ങളിൽ വ്യാകരണപരമായ തെറ്റുള്ളത് ഏതിലാണ്?",
      "options": [
        "A) I is happy.",
        "B) I am from Kerala.",
        "C) My name is Abdul.",
        "D) I am a teacher."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What does the possessive word \"My\" mean according to the Malayalam translation guide?",
      "questionMl": "മലയാളം വിവർത്തന ഗൈഡ് അനുസരിച്ച് \"My\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഞാൻ",
        "B) എന്റെ",
        "C) നമ്മൾ",
        "D) അവർ"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "What is the absolute definitive rule provided for choosing between the indefinite articles \"a\" and \"an\"?",
      "questionMl": "അനിശ്ചിതകാല ആർട്ടിക്കിളുകളായ \"a\", \"an\" എന്നിവ തിരഞ്ഞെടുക്കുന്നതിനായി നൽകിയിട്ടുള്ള അന്തിമ നിയമം എന്താണ്?",
      "options": [
        "A) The choice is strictly determined by the first letter of the written word",
        "B) Vowel letters always take \"a\", and consonant letters take \"an\"",
        "C) The choice is completely based on the sound, not just the letter",
        "D) Articles are selected based on whether the word is singular or plural"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Why does the word \"University\" properly take the article \"a\" (\"a university\") rather than \"an\"?",
      "questionMl": "എന്തുകൊണ്ടാണ് \"University\" എന്ന വാക്ക് \"an\" എന്നതിന് പകരം \"a\" (\"a university\") എന്ന ആർട്ടിക്കിൾ സ്വീകരിക്കുന്നത്?",
      "options": [
        "A) Because it starts with a vowel letter",
        "B) Because it refers to a specific geographic location",
        "C) Because the letter 'U' is completely silent in speech",
        "D) Because it sounds like a consonant sound (\"You-niversity\")"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Why does the word \"Hour\" properly take the article \"an\" (\"an hour\")?",
      "questionMl": "എന്തുകൊണ്ടാണ് \"Hour\" എന്ന വാക്ക് \"an\" (\"an hour\") എന്ന ആർട്ടിക്കിൾ സ്വീകരിക്കുന്നത്?",
      "options": [
        "A) Because the letter 'H' is silent, making it start with a vowel sound",
        "B) Because it starts with a vowel letter",
        "C) Because it represents a duration of time",
        "D) Because it is an irregular noun phrase"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Complete the standard polite greeting: \"_____ to meet you.\"",
      "questionMl": "സ്റ്റാൻഡേർഡ് ഗ്രീറ്റിംഗ് പാറ്റേൺ പൂർത്തിയാക്കുക: \"_____ to meet you.\"",
      "options": [
        "A) Fine",
        "B) Nice",
        "C) Goodly",
        "D) Well"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "What is the stated goal of Person B in the Example Conversation?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ ബി വ്യക്തിയുടെ പ്രഖ്യാപിത ലക്ഷ്യം എന്താണ്?",
      "options": [
        "A) To travel around the world",
        "B) To write perfect grammar books",
        "C) To speak English confidently",
        "D) To pass an upcoming exam"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Correct the following common mistake: \"I from Kerala.\"",
      "questionMl": "താഴെ പറയുന്ന പൊതുവായ തെറ്റ് തിരുത്തുക: \"I from Kerala.\"",
      "options": [
        "A) My from Kerala.",
        "B) I is from Kerala.",
        "C) I are from Kerala.",
        "D) I am from Kerala."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "What core mindset phrase should students remember if they make mistakes during practice?",
      "questionMl": "പരിശീലനത്തിനിടയിൽ തെറ്റുകൾ വരുത്തിയാൽ വിദ്യാർത്ഥികൾ ഓർമ്മിക്കേണ്ട പ്രധാന മാനസികാവസ്ഥ വാചകം ഏതാണ്?",
      "options": [
        "A) Confidence comes before correctness",
        "B) Correctness comes before confidence",
        "C) Never speak with mistakes",
        "D) Grammar rules must be perfect"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Which of the following is NOT a recommended point to include in the self-introduction practice?",
      "questionMl": "സ്വയം പരിചയപ്പെടുത്തൽ പരിശീലനത്തിൽ ഉൾപ്പെടുത്താൻ ശുപാർശ ചെയ്യാത്ത പോയിന്റ് താഴെ പറയുന്നവയിൽ ഏതാണ്?",
      "options": [
        "A) Your name and profession",
        "B) Detailed financial background",
        "C) One hobby and one goal",
        "D) Why you joined this course"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Complete the sentence using the correct Power Vocabulary word: \"Practice makes ___.\"",
      "questionMl": "ശരിയായ പവർ വൊക്കാബുലറി വാക്ക് ഉപയോഗിച്ച് വാക്യം പൂർത്തിയാക്കുക: \"Practice makes ___.\"",
      "options": [
        "A) Perfect",
        "B) Success",
        "C) Progress",
        "D) Confident"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Which word describes the feeling of being worried or anxious about speaking in front of others?",
      "questionMl": "സംസാരിക്കുന്നതിനെക്കുറിച്ച് ആശങ്കയോ ഉത്കണ്ഠയോ ഉള്ള വികാരത്തെ സൂചിപ്പിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Confident",
        "B) Energetic",
        "C) Relaxed",
        "D) Nervous"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "What instruction is given regarding translation in the preparation for the live session?",
      "questionMl": "ലൈവ് സെഷനായുള്ള തയ്യാറെടുപ്പിൽ വിവർത്തനത്തെക്കുറിച്ച് (translation) എന്ത് നിർദ്ദേശമാണ് നൽകിയിട്ടുള്ളത്?",
      "options": [
        "A) Don't translate from Malayalam. Speak naturally",
        "B) Translate every sentence perfectly from Malayalam first",
        "C) Write sentences down and translate them word-for-word",
        "D) Consult a dictionary to verify every single word"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Choose the vowel sound example that takes the article \"an\" from the options below:",
      "questionMl": "താഴെ പറയുന്ന ഓപ്ഷനുകളിൽ നിന്ന് \"an\" എന്ന ആർട്ടിക്കിൾ സ്വീകരിക്കുന്ന വവ്വൽ സൗണ്ട് (vowel sound) ഉദാഹരണം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) European",
        "B) Opportunity",
        "C) University",
        "D) Businessman"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Identify the word that matches the consonant sound rule for using the article \"a\":",
      "questionMl": "“a” എന്ന ആർട്ടിക്കിൾ ഉപയോഗിക്കുന്നതിനുള്ള കോൺസണന്റ് സൗണ്ട് (consonant sound) നിയമവുമായി പൊരുത്തപ്പെടുന്ന വാക്ക് തിരിച്ചറിയുക:",
      "options": [
        "A) Apple",
        "B) Idea",
        "C) Doctor",
        "D) Office"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Fill in the blank: \"I have an ___ to present my thoughts today.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"I have an ___ to present my thoughts today.\"",
      "options": [
        "A) Challenge",
        "B) Progress",
        "C) Goal",
        "D) Opportunity"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "How do you introduce yourself to a new colleague at work?",
      "questionMl": "ജോലിസ്ഥലത്ത് ഒരു പുതിയ സഹപ്രവർത്തകനോട് സ്വയം പരിചയപ്പെടുത്തുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) Hello, I am Rahul and I am an accountant here.",
        "B) Hello, I Rahul and am an accountant.",
        "C) Hello, I is Rahul and I are an accountant.",
        "D) Hello, my are Rahul and I am an accountant."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "The English vocabulary word 'Career' refers to:",
      "questionMl": "'Career' എന്ന ഇംഗ്ലീഷ് വാക്ക് എന്തുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു:",
      "options": [
        "A) A family dynamic",
        "B) A person's professional or job journey",
        "C) A grammatical term",
        "D) A specific travel destination"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What does the Malayalam phrase \"സ്വയം കുറിച്ച് സംസാരിക്കുമ്പോൾ എപ്പോഴും ഉപയോഗിക്കണം\" refer to?",
      "questionMl": "“സ്വയം കുറിച്ച് സംസാരിക്കുമ്പോൾ എപ്പോഴും ഉപയോഗിക്കണം” എന്ന മലയാളം വാചകം എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
      "options": [
        "A) My",
        "B) Am",
        "C) I",
        "D) An"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Which indefinite article is used before a profession starting with a vowel sound, like 'architect'?",
      "questionMl": "'architect' പോലെ സ്വരാക്ഷര ശബ്ദത്തിൽ തുടങ്ങുന്ന തൊഴിൽപ്പേരിന് മുമ്പ് ഏത് ആർട്ടിക്കിളാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) a",
        "B) the",
        "C) at",
        "D) an"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "How do you state your hometown when someone asks 'Where are you from?'",
      "questionMl": "\"നിങ്ങൾ എവിടെ നിന്നാണ്?\" എന്ന് ചോദിക്കുമ്പോൾ നിങ്ങളുടെ സ്വദേശം പറയാൻ ഏത് വാക്യമാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) I am from Kochi.",
        "B) I is from Kochi.",
        "C) I from Kochi.",
        "D) My am from Kochi."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "How do you describe your favorite hobby during a self-introduction?",
      "questionMl": "സ്വയം പരിചയപ്പെടുത്തുമ്പോൾ നിങ്ങളുടെ വിനോദത്തെക്കുറിച്ച് (hobby) പറയാൻ അനുയോജ്യമായ വാക്യം ഏതാണ്?",
      "options": [
        "A) My hobby are reading books.",
        "B) My hobby is reading books.",
        "C) I hobby reading books.",
        "D) Mine hobby is read books."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Fill in the blank with the correct pronoun: \"_____ name is Sara and I am an engineer.\"",
      "questionMl": "വിടവ് പൂരിപ്പിക്കുക: \"എന്റെ പേര് സാറ എന്നാണ്, ഞാൻ ഒരു എഞ്ചിനീയറാണ്.\"",
      "options": [
        "A) Me",
        "B) Mine",
        "C) My",
        "D) I"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Which sentence is grammatically correct when introducing yourself?",
      "questionMl": "സ്വയം പരിചയപ്പെടുത്തുമ്പോൾ വ്യാകരണപരമായി ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I am an web designer in Technopark.",
        "B) I is a web designer in Technopark.",
        "C) I are a web designer in Technopark.",
        "D) I am a web designer in Technopark."
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "How do you explain your primary goal for learning English?",
      "questionMl": "ഇംഗ്ലീഷ് പഠിക്കുന്നതിന്റെ പ്രധാന ലക്ഷ്യം വ്യക്തമാക്കാൻ ഏത് വാക്യമാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) My goal is to speak English fluently and confidently.",
        "B) My goal are to speak English fluently.",
        "C) I goal is speaking English.",
        "D) My goal be to speak English."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "When someone says 'Nice to meet you', what is the most polite and natural response?",
      "questionMl": "ഒരാൾ 'Nice to meet you' എന്ന് പറയുമ്പോൾ ഏറ്റവും അനുയോജ്യമായ മറുപടി എന്താണ്?",
      "options": [
        "A) I am fine.",
        "B) Nice to meet you too!",
        "C) Yes, thank you.",
        "D) You are welcome."
      ],
      "correctIndex": 1
    }
  ],
  "2": [
    {
      "id": 1,
      "question": "Which pronoun is used to talk about a group of people including yourself?",
      "questionMl": "നിങ്ങളുൾപ്പെടെയുള്ള ഒരു കൂട്ടം ആളുകളെക്കുറിച്ച് സംസാരിക്കാൻ ഏത് സർവ്വനാമമാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) They",
        "B) She",
        "C) We",
        "D) He"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "What are the Malayalam meanings for the personal pronouns \"He\" and \"She\" respectively?",
      "questionMl": "“He”, “She” എന്നീ പേഴ്സണൽ പ്രൊനൗണുകളുടെ മലയാളം അർത്ഥങ്ങൾ യഥാക്രമം എന്തൊക്കെയാണ്?",
      "options": [
        "A) അവൻ (He) / അവർ (She)",
        "B) അവൾ (He) / അവൻ (She)",
        "C) നമ്മൾ (He) / അവർ (She)",
        "D) അവൻ (He) / അവൾ (She)"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "When should a student use the pronoun \"We\" based on the grammar rules?",
      "questionMl": "വ്യാകരണ നിയമങ്ങൾ അനുസരിച്ച് ഒരു വിദ്യാർത്ഥി \"We\" എന്ന പ്രൊനൗൺ എപ്പോഴാണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) When talking about a collective group that includes oneself",
        "B) When talking about a single male colleague far away",
        "C) When talking exclusively about a group of third-party strangers",
        "D) When introducing a single female teacher"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "What is the exact translation of \"They\" provided in the Malayalam explanation?",
      "questionMl": "മലയാളം വിശദീകരണത്തിൽ നൽകിയിട്ടുള്ള \"They\" എന്ന വാക്കിന്റെ കൃത്യമായ വിവർത്തനം എന്താണ്?",
      "options": [
        "A) നമ്മൾ",
        "B) അവർ",
        "C) അവൻ",
        "D) അവൾ"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Which verbs correctly pair with singular pronouns (He/She/It) and plural pronouns (We/You/They)?",
      "questionMl": "ഏകവചന സർവ്വനാമങ്ങളോടും (He/She/It) ബഹുവചന സർവ്വനാമങ്ങളോടും (We/You/They) ശരിയായി പൊരുത്തപ്പെടുന്ന ക്രിയകൾ ഏവ?",
      "options": [
        "A) Singular pronouns take 'are'; Plural pronouns take 'is'",
        "B) Singular pronouns take 'am'; Plural pronouns take 'are'",
        "C) Singular pronouns take 'is'; Plural pronouns take 'are'",
        "D) Both singular and plural pronouns take 'is' exclusively"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Identify the correct grammatical combination from the examples below:",
      "questionMl": "താഴെ പറയുന്ന ഉദാഹരണങ്ങളിൽ നിന്ന് ശരിയായ വ്യാകരണ സംയോജനം തിരിച്ചറിയുക:",
      "options": [
        "A) He are my friend.",
        "B) They is happy.",
        "C) We is ready.",
        "D) She is a teacher."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Correct the following common error: \"They is happy.\"",
      "questionMl": "താഴെ പറയുന്ന പൊതുവായ തെറ്റ് തിരുത്തുക: \"They is happy.\"",
      "options": [
        "A) They are happy.",
        "B) He is happy.",
        "C) They am happy.",
        "D) We is happy."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Which of the following words describes a person you work with, as listed in the Power Vocabulary?",
      "questionMl": "പവർ വൊക്കാബുലറിയിൽ ലിസ്റ്റ് ചെയ്തിട്ടുള്ള, നിങ്ങളോടൊപ്പം ജോലി ചെയ്യുന്ന ഒരു വ്യക്തിയെ വിവരിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Neighbour",
        "B) Colleague",
        "C) Classmate",
        "D) Teammate"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "What does the Power Vocabulary word \"Generous\" mean conceptually?",
      "questionMl": "“Generous” എന്ന പവർ വൊക്കാബുലറി വാക്കിന്റെ ആശയപരമായ അർത്ഥം എന്താണ്?",
      "options": [
        "A) Showing absolute respect to elders",
        "B) Having high levels of professional intelligence",
        "C) Willing to give money, help, or kindness freely",
        "D) Staying calm under stressful conditions"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Complete the Useful Sentence Pattern: \"They are ___.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"They are ___.\"",
      "options": [
        "A) neighbour",
        "B) a neighbours",
        "C) an neighbour",
        "D) neighbours"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which English Power Usage is perfect for introducing a friend to another person?",
      "questionMl": "ഒരു സുഹൃത്തിനെ മറ്റൊരു വ്യക്തിക്ക് പരിചയപ്പെടുത്താൻ ഏറ്റവും അനുയോജ്യമായ ഇംഗ്ലീഷ് പവർ യൂസേജ് ഏതാണ്?",
      "options": [
        "A) Let me introduce my friend.",
        "B) He works with me.",
        "C) They are from...",
        "D) We study together."
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "How do you introduce your brother and his profession?",
      "questionMl": "നിങ്ങളുടെ സഹോദരനെയും അദ്ദേഹത്തിന്റെ തൊഴിലിനെയും പരിചയപ്പെടുത്തുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) He are my brother and he are a doctor.",
        "B) He is my brother and he is a doctor.",
        "C) He is my brother and he am a doctor.",
        "D) Him is my brother and is a doctor."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "In the same Example Conversation, who are \"they\"?",
      "questionMl": "അതേ മാതൃകാ സംഭാഷണത്തിൽ \"they\" എന്ന് ഉദ്ദേശിക്കുന്നത് ആരെയാണ്?",
      "options": [
        "A) Classmates",
        "B) Colleagues",
        "C) Neighbours",
        "D) Relatives"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Fix this sentence pattern mistake: \"She are a doctor.\"",
      "questionMl": "ഈ വാക്യ ഘടനയിലെ തെറ്റ് തിരുത്തുക: \"She are a doctor.\"",
      "options": [
        "A) She am a doctor.",
        "B) They are a doctor.",
        "C) He are a doctor.",
        "D) She is a doctor."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Choose the Power Vocabulary word that describes someone who is always happy and full of positive energy:",
      "questionMl": "എപ്പോഴും സന്തോഷവാനായിരിക്കുകയും പോസിറ്റീവ് ഊർജ്ജം നിറഞ്ഞുനിൽക്കുകയും ചെയ്യുന്ന ഒരാളെ വിവരിക്കുന്ന പവർ വൊക്കാബുലറി വാക്ക് തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) Cheerful",
        "B) Polite",
        "C) Patient",
        "D) Responsible"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Fill in the blank: \"We are happy to be ___.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"We are happy to be ___.\"",
      "options": [
        "A) there",
        "B) here",
        "C) away",
        "D) home"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "What pronoun should you use to talk about a single female person?",
      "questionMl": "ഒരു സ്ത്രീയെക്കുറിച്ച് മാത്രം സംസാരിക്കാൻ നിങ്ങൾ ഏത് പ്രൊനൗൺ ആണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) He",
        "B) They",
        "C) She",
        "D) We"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "If you want to describe a person who behaves well and shows good manners, which vocabulary word fits best?",
      "questionMl": "നന്നായി പെരുമാറുകയും നല്ല മര്യാദകൾ കാണിക്കുകയും ചെയ്യുന്ന ഒരാളെ വിവരിക്കാൻ ഏറ്റവും അനുയോജ്യമായ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Intelligent",
        "B) Successful",
        "C) Hardworking",
        "D) Polite"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Which sentence correctly describes your best friend's supportive personality?",
      "questionMl": "നിങ്ങളുടെ സുഹൃത്തിന്റെ നല്ല സ്വഭാവത്തെക്കുറിച്ച് പറയാൻ ഏറ്റവും അനുയോജ്യമായ വാക്യം ഏതാണ്?",
      "options": [
        "A) She is very kind and always helps others.",
        "B) She are very kind and always help others.",
        "C) She am very kind and always helps.",
        "D) Her is very kind and always helping."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Which pronoun represents a group that does NOT include the speaker?",
      "questionMl": "സംസാരിക്കുന്ന വ്യക്തി ഉൾപ്പെടാത്ത ഒരു ഗ്രൂപ്പിനെ പ്രതിനിധീകരിക്കുന്ന പ്രൊനൗൺ ഏതാണ്?",
      "options": [
        "A) We",
        "B) They",
        "C) I",
        "D) You"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Complete the sentence pattern: \"She is interested ___...\"",
      "questionMl": "ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"She is interested ___...\"",
      "options": [
        "A) at",
        "B) on",
        "C) in",
        "D) for"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "What is the Malayalam meaning given for the structure containing the word \"We\"?",
      "questionMl": "“We” എന്ന വാക്ക് ഉൾക്കൊള്ളുന്ന ഘടനയ്ക്ക് നൽകിയിട്ടുള്ള മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) അവർ",
        "B) അവൻ",
        "C) അവൾ",
        "D) നമ്മൾ"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "How do you introduce two of your coworkers to a visitor?",
      "questionMl": "നിങ്ങളുടെ രണ്ട് സഹപ്രവർത്തകരെ മറ്റൊരാൾക്ക് പരിചയപ്പെടുത്തുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) They are my colleagues from the marketing team.",
        "B) They is my colleagues from the marketing team.",
        "C) Them are my colleagues from the marketing team.",
        "D) They am my colleagues from marketing team."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Which vocabulary word means a person who manages a team or office?",
      "questionMl": "ഒരു ടീമിനെയോ ഓഫീസിനെയോ നിയന്ത്രിക്കുന്ന വ്യക്തി എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Colleague",
        "B) Manager",
        "C) Friend",
        "D) Classmate"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Fill in the blank: \"They are very ___.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"They are very ___.\"",
      "options": [
        "A) friend",
        "B) friendliness",
        "C) friendly",
        "D) friends"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Which pronoun correctly replaces 'Sarah' in the sentence: 'Sarah is an engineer'?",
      "questionMl": "'Sarah is an engineer' എന്ന വാക്യത്തിൽ 'Sarah' എന്നതിന് പകരമായി ഉപയോഗിക്കേണ്ട സർവ്വനാമം ഏതാണ്?",
      "options": [
        "A) He",
        "B) They",
        "C) It",
        "D) She"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Which helping verb is correctly paired with the plural pronoun 'They' in the present tense?",
      "questionMl": "വർത്തമാനകാലത്തിൽ 'They' എന്ന ബഹുവചന സർവ്വനാമത്തോടൊപ്പം ഉപയോഗിക്കുന്ന സഹായക്രിയ ഏതാണ്?",
      "options": [
        "A) are",
        "B) is",
        "C) am",
        "D) be"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Fill in the blank: \"My father and mother _____ teachers in a government school.\"",
      "questionMl": "എന്റെ അച്ഛനും അമ്മയും അധ്യാപകരാണ് എന്ന് പറയാൻ:",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) was"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "How do you describe your sister's hobby?",
      "questionMl": "നിങ്ങളുടെ സഹോദരിയുടെ വിനോദത്തെക്കുറിച്ച് പറയാൻ ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) She love painting and classical music.",
        "B) Her loves painting and classical music.",
        "C) She loves painting and classical music.",
        "D) She are loving painting."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Which sentence correctly describes your classmate?",
      "questionMl": "നിങ്ങളുടെ സഹപാഠിയെക്കുറിച്ച് വിവരിക്കുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) He are my classmate and he are very hardworking.",
        "B) Him is my classmate and is very hardworking.",
        "C) He am my classmate and is hardworking.",
        "D) He is my classmate and he is very hardworking."
      ],
      "correctIndex": 3
    }
  ],
  "3": [
    {
      "id": 1,
      "question": "What do the verbs 'Have' and 'Has' express in English sentences?",
      "questionMl": "ഇംഗ്ലീഷ് വാക്യങ്ങളിൽ 'Have', 'Has' എന്നിവ എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
      "options": [
        "A) ഉണ്ട് / കൈവശമുണ്ട് (Possession)",
        "B) വരും / പോകും (Movement)",
        "C) ചെയ്യും / ചെയ്യണം (Action)",
        "D) വേണം / അരുത് (Prohibition)"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Which of the following pronoun groups exclusively takes the verb \"Have\"?",
      "questionMl": "താഴെ പറയുന്ന പ്രൊനൗൺ ഗ്രൂപ്പുകളിൽ \"Have\" എന്ന വെർബ് മാത്രം സ്വീകരിക്കുന്നത് ഏതാണ്?",
      "options": [
        "A) He, She, It",
        "B) I, You, We, They",
        "C) He, She, They",
        "D) I, He, She, It"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "When is it appropriate to use the demonstrative word \"This\"?",
      "questionMl": "“This” എന്ന ഡെമോൺസ്ട്രേറ്റീവ് വാക്ക് ഉപയോഗിക്കുന്നത് എപ്പോഴാണ് അനുയോജ്യം?",
      "options": [
        "A) For many things or people near you",
        "B) For one person or one thing that is far from you",
        "C) For one person or one thing that is near you",
        "D) For many things or people far from you"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "What is the core geographical difference between using \"This\" and \"That\"?",
      "questionMl": "“This”, “That” എന്നിവ ഉപയോഗിക്കുന്നതിലെ പ്രധാന ഭൂമിശാസ്ത്രപരമായ (അകലത്തെ അടിസ്ഥാനമാക്കിയുള്ള) വ്യത്യാസം എന്താണ്?",
      "options": [
        "A) \"This\" is used for plural; \"That\" is used for singular",
        "B) \"This\" is for formal settings; \"That\" is for informal settings",
        "C) \"This\" is for family; \"That\" is for objects",
        "D) \"This\" is for things near you; \"That\" is for things far from you"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "What is the Malayalam meaning of the plural demonstrative \"These\"?",
      "questionMl": "“These” എന്ന ബഹുവചന ഡെമോൺസ്ട്രേറ്റീവിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഇവ",
        "B) ഇത്",
        "C) അത്",
        "D) അവ"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "When should a speaker choose \"Those\" instead of \"These\"?",
      "questionMl": "ഒരു സംസാരിക്കുന്ന വ്യക്തി \"These\" എന്നതിന് പകരം \"Those\" തിരഞ്ഞെടുക്കേണ്ടത് എപ്പോഴാണ്?",
      "options": [
        "A) When the multiple people or things are near the speaker",
        "B) When the multiple people or things are far from the speaker",
        "C) When there is only one object far away",
        "D) When the objects are inside a backpack"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Identify the \"Common Mistake\" regarding the verb \"have/has\" from the options below:",
      "questionMl": "താഴെ പറയുന്ന ഓപ്ഷനുകളിൽ നിന്ന് \"have/has\" വെർബ് സംബന്ധിച്ച \"Common Mistake\" (പൊതുവായ തെറ്റ്) തിരിച്ചറിയുക:",
      "options": [
        "A) He has a car.",
        "B) I have a bike.",
        "C) He have a car.",
        "D) She has a laptop."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Correct this erroneous expression: \"I has a bike.\"",
      "questionMl": "ഈ തെറ്റായ പ്രയോഗം തിരുത്തുക: \"I has a bike.\"",
      "options": [
        "A) He has a bike.",
        "B) I am a bike.",
        "C) They has a bike.",
        "D) I have a bike."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Which of the following represents an incorrect matching of a demonstrative word and a verb?",
      "questionMl": "താഴെ പറയുന്നവയിൽ ഒരു ഡെമോൺസ്ട്രേറ്റീവ് വാക്കും വെർബും തമ്മിലുള്ള തെറ്റായ പൊരുത്തപ്പെടുത്തലിനെ പ്രതിനിധീകരിക്കുന്നത് ഏതാണ്?",
      "options": [
        "A) This are my books.",
        "B) This is my phone.",
        "C) These are my books.",
        "D) Those are my classmates."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Fix the following error sentence: \"Those is my friend.\"",
      "questionMl": "താഴെ പറയുന്ന തെറ്റായ വാക്യം തിരുത്തുക: \"Those is my friend.\"",
      "options": [
        "A) That are my friend.",
        "B) Those are my friends.",
        "C) These is my friend.",
        "D) Those am my friend."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Which vocabulary word means a child of your aunt or uncle?",
      "questionMl": "നിങ്ങളുടെ അമ്മായിയുടെയോ അമ്മാവന്റെയോ കുട്ടിയെ അർത്ഥമാക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Niece",
        "B) Nephew",
        "C) Cousin",
        "D) Sibling"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Select the correct English Power Usage to express that something belongs to you:",
      "questionMl": "ഒരു സാധനം നിങ്ങളുടേതാണെന്ന് പ്രകടിപ്പിക്കുന്നതിനുള്ള ശരിയായ ഇംഗ്ലീഷ് പവർ യൂസേജ് തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) Those are yours.",
        "B) That looks beautiful.",
        "C) Take a look at this.",
        "D) This belongs to me."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Complete the dialogue from the Example Conversation:",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ നിന്നുള്ള ഡയലോഗ് പൂർത്തിയാക്കുക:",
      "options": [
        "A) they have jobs",
        "B) they has jobs",
        "C) those is jobs",
        "D) we are jobs"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "What does the sentence pattern \"My family is very supportive\" emphasize?",
      "questionMl": "“My family is very supportive” എന്ന വാക്യ ഘടന എന്തിനെയാണ് ഊന്നിപ്പറയുന്നത്?",
      "options": [
        "A) A physical location of the home",
        "B) A power vocabulary trait meaning helpful and encouraging",
        "C) The exact number of family members",
        "D) A specific historical event"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct sentence that uses \"has\" with an animal or object:",
      "questionMl": "ഒരു മൃഗത്തോടൊപ്പമോ വസ്തുവോടൊപ്പമോ \"has\" ഉപയോഗിക്കുന്ന ശരിയായ വാക്യം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) It have four legs.",
        "B) It is four legs.",
        "C) It has four legs.",
        "D) They has four legs."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "What does the pronoun \"Those\" mean based on the Malayalam description?",
      "questionMl": "മലയാളം വിവരണത്തിന്റെ അടിസ്ഥാനത്തിൽ \"Those\" എന്ന പ്രൊനൗണിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഇത്",
        "B) അത്",
        "C) ഇവ",
        "D) അവ"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Fill in the blank with the correct verb: \"We ___ a class today.\"",
      "questionMl": "ശരിയായ വെർബ് ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"We ___ a class today.\"",
      "options": [
        "A) have",
        "B) has",
        "C) is",
        "D) am"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What error is found in the sentence: \"That are my parents\"?",
      "questionMl": "“That are my parents” എന്ന വാക്യത്തിൽ എന്ത് തെറ്റാണ് കണ്ടെത്താൻ കഴിയുന്നത്?",
      "options": [
        "A) \"parents\" must be singular",
        "B) \"That\" should be replaced with \"Those\" and it should be \"Those are my parents\"",
        "C) \"are\" must be changed to \"am\"",
        "D) No error is present"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Complete the sentence: \"You have a beautiful ___.\"",
      "questionMl": "വാക്യം പൂർത്തിയാക്കുക: \"You have a beautiful ___.\"",
      "options": [
        "A) hair",
        "B) laptop",
        "C) smile",
        "D) class"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Which sentence correctly expresses having a family member or possession?",
      "questionMl": "കുടുംബാംഗത്തെയോ സ്വന്തം വസ്തുവിനെയോ സൂചിപ്പിക്കുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I having two brothers.",
        "B) I has two brothers.",
        "C) I am have two brothers.",
        "D) I have two brothers."
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Which sentence correctly describes a special belonging you own?",
      "questionMl": "നിങ്ങളുടെ പക്കലുള്ള വിലപ്പെട്ട ഒരു വസ്തുവിനെക്കുറിച്ച് പറയാൻ ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I have a precious watch given by my grandfather.",
        "B) I has a precious watch given by my grandfather.",
        "C) I having a precious watch.",
        "D) Mine have a precious watch."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Which sentence correctly uses 'has' for third-person singular?",
      "questionMl": "'Has' ശരിയായി ഉപയോഗിച്ചിട്ടുള്ള മൂന്നാം പുരുഷ ഏകവചന വാക്യം ഏതാണ്?",
      "options": [
        "A) They has a new laptop.",
        "B) She has a new laptop.",
        "C) We has a new laptop.",
        "D) You has a new laptop."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "When describing things during practice, what is the golden rule for confidence?",
      "questionMl": "പരിശീലനത്തിനിടയിൽ കാര്യങ്ങൾ വിവരിക്കുമ്പോൾ, ആത്മവിശ്വാസത്തിനായുള്ള സുവർണ്ണ നിയമം എന്താണ്?",
      "options": [
        "A) Focus heavily on grammar rules before making a sound",
        "B) Translate every single word systematically",
        "C) Don't worry about mistakes; speak naturally",
        "D) Speak only if you are 100% correct"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Which pronoun is matched correctly with the verb \"has\"?",
      "questionMl": "ഏത് പ്രൊനൗൺ ആണ് \"has\" എന്ന വെർബുമായി ശരിയായി പൊരുത്തപ്പെടുന്നത്?",
      "options": [
        "A) You",
        "B) They",
        "C) We",
        "D) She"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the following sentence pattern: \"This is my ___ book.\"",
      "questionMl": "താഴെ പറയുന്ന വാക്യ ഘടന പൂർത്തിയാക്കുക: \"This is my ___ book.\"",
      "options": [
        "A) favourite",
        "B) has",
        "C) belong",
        "D) those"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Which sentence correctly describes things that are near to you in the plural form?",
      "questionMl": "അടുത്തുനിൽക്കുന്ന ഒന്നിലധികം വസ്തുക്കളെക്കുറിച്ച് പറയാൻ ഉപയോഗിക്കുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) This are my favorite books.",
        "B) These are my favorite books.",
        "C) Those is my favorite books.",
        "D) That are my favorite books."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Fill in the blank with 'have' or 'has': \"My brother _____ two mobile phones.\"",
      "questionMl": "\"എന്റെ സഹോദരന് രണ്ട് മൊബൈൽ ഫോണുകളുണ്ട്\" എന്ന് പറയാൻ ശരിയായ വാക്ക്:",
      "options": [
        "A) have",
        "B) having",
        "C) has",
        "D) haves"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "How do you ask someone if they have a pen you can borrow?",
      "questionMl": "\"നിങ്ങളുടെ കയ്യിൽ ഒരു പേനയുണ്ടോ?\" എന്ന് ഒരാളോട് ചോദിക്കാൻ:",
      "options": [
        "A) Are you have a pen?",
        "B) Have you a pen?",
        "C) Does you have a pen?",
        "D) Do you have a pen?"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Which demonstrative pronoun is used for a single object that is far away from you?",
      "questionMl": "അകലെയിരിക്കുന്ന ഒരൊറ്റ വസ്തുവിനെ ചൂണ്ടിക്കാണിക്കാൻ ഏത് വാക്കാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) That",
        "B) This",
        "C) These",
        "D) Those"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"We _____ a beautiful garden behind our house.\"",
      "questionMl": "\"ഞങ്ങളുടെ വീടിന് പിന്നിൽ ഒരു മനോഹരമായ പൂന്തോട്ടമുണ്ട്\" എന്ന് പറയാൻ:",
      "options": [
        "A) has",
        "B) have",
        "C) having",
        "D) are have"
      ],
      "correctIndex": 1
    }
  ],
  "4": [
    {
      "id": 1,
      "question": "Which three core words are introduced in today's lesson as the most used in spoken English?",
      "questionMl": "ഇന്നത്തെ പാഠഭാഗത്തിൽ ഇംഗ്ലീഷ് സംഭാഷണത്തിൽ ഏറ്റവും കൂടുതൽ ഉപയോഗിക്കുന്നതായി പരിചയപ്പെടുത്തുന്ന മൂന്ന് പ്രധാന വാക്കുകൾ ഏവ?",
      "options": [
        "A) am, is, are",
        "B) have, has, had",
        "C) can, can’t, could",
        "D) this, that, these"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "What does the word \"Can\" mean according to the Malayalam explanation?",
      "questionMl": "മലയാളം വിശദീകരണം അനുസരിച്ച് \"Can\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) കഴിയില്ല",
        "B) വേണം",
        "C) ചെയ്യാം",
        "D) കഴിയും"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "When do we systematically use the word \"Can\" in English grammar?",
      "questionMl": "ഇംഗ്ലീഷ് വ്യാകരണത്തിൽ നമ്മൾ ഏത് സാഹചര്യത്തിലാണ് \"Can\" എന്ന വാക്ക് വ്യവസ്ഥാപിതമായി ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) To talk about ability or skill",
        "B) To talk about past actions",
        "C) To ask for permission formally",
        "D) To describe family possessions"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Fill in the blank: \"She can ___ a car.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"She can ___ a car.\"",
      "options": [
        "A) drives",
        "B) drive",
        "C) to drive",
        "D) driving"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "What is the Malayalam meaning of the grammatical word \"Can’t\"?",
      "questionMl": "“Can’t” എന്ന വ്യാകരണ വാക്കിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) കഴിയും",
        "B) വരാം",
        "C) കഴിയില്ല",
        "D) ചെയ്യാം"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Fill in the blank: \"We can’t ___ you.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"We can’t ___ you.\"",
      "options": [
        "A) to hear",
        "B) hears",
        "C) hearing",
        "D) hear"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which of the following is a polite way to ask for something or request help?",
      "questionMl": "താഴെ പറയുന്നവയിൽ സഹായം ചോദിക്കുന്നതിനോ ഒരു കാര്യം ആവശ്യപ്പെടുന്നതിനോ ഉള്ള വിനയപൂർവ്വമായ മാർഗ്ഗം ഏതാണ്?",
      "options": [
        "A) Could",
        "B) Can’t",
        "C) Am",
        "D) Have"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Translate the contextual purpose of \"Could\" into Malayalam:",
      "questionMl": "“Could” എന്ന വാക്കിന്റെ സന്ദർഭോചിതമായ ഉപയോഗ ലക്ഷ്യം മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) കഴിയില്ല എന്ന് പറയുമ്പോൾ ഉപയോഗിക്കുന്നു",
        "B) വിനയത്തോടെ സഹായം ചോദിക്കുമ്പോൾ ഉപയോഗിക്കുന്നു",
        "C) ഒരു കഴിവ് പറയുമ്പോൾ ഉപയോഗിക്കുന്നു",
        "D) അനുവാദം കൊടുക്കുമ്പോൾ ഉപയോഗിക്കുന്നു"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Fill in the blank to complete the polite request: \"Could you ___ that?\"",
      "questionMl": "വിനയപൂർവ്വമായ ഈ അഭ്യർത്ഥന പൂർത്തിയാക്കാൻ കോടി പൂരിപ്പിക്കുക: \"Could you ___ that?\"",
      "options": [
        "A) to repeat",
        "B) repeating",
        "C) repeat",
        "D) repeats"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Complete the sentence pattern: \"Could you explain ___?\"",
      "questionMl": "ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"Could you explain ___?\"",
      "options": [
        "A) slow",
        "B) carefully",
        "C) together",
        "D) again"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which natural spoken English phrase politely tells someone not to hurry?",
      "questionMl": "തിടുക്കം കൂട്ടേണ്ടതില്ല എന്ന് മര്യാദയോടെ പറയാൻ ഉപയോഗിക്കുന്ന ഇംഗ്ലീഷ് പ്രയോഗം ഏതാണ്?",
      "options": [
        "A) Take your time.",
        "B) I can to do it.",
        "C) He can drives.",
        "D) Could you to help me?"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What is the correct response given by Person B when Person A asks \"Could you help me?\" in the Example Conversation?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ \"Could you help me?\" എന്ന് എ വ്യക്തി ചോദിക്കുമ്പോൾ ബി വ്യക്തി നൽകുന്ന ശരിയായ മറുപടി എന്താണ്?",
      "options": [
        "A) Certainly",
        "B) Of course",
        "C) No problem",
        "D) Thank you"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Identify the grammatically CORRECT sentence from the options below:",
      "questionMl": "താഴെ പറയുന്ന ഓപ്ഷനുകളിൽ നിന്ന് വ്യാകരണപരമായി ശരിയായ വാക്യം തിരിച്ചറിയുക:",
      "options": [
        "A) I can to speak English.",
        "B) He can drives.",
        "C) I can speak English.",
        "D) I can speaks English."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "What is the error in the sentence \"She can’t to swim\"?",
      "questionMl": "“She can’t to swim” എന്ന വാക്യത്തിലെ തെറ്റ് എന്താണ്?",
      "options": [
        "A) The word \"swim\" should be \"swims\"",
        "B) \"She\" should be replaced with \"They\"",
        "C) \"can’t\" should be changed to \"could\"",
        "D) The word \"to\" should be removed"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct the common mistake: \"Could you to help me?\"",
      "questionMl": "பொതുവായ ഈ തെറ്റ് തിരുത്തുക: \"Could you to help me?\"",
      "options": [
        "A) Could you help me?",
        "B) Could you helping me?",
        "C) Could you helps me?",
        "D) Can you to help me?"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Fix this sentence structure error: \"He can drives.\"",
      "questionMl": "ഈ വാക്യ ഘടനയിലെ തെറ്റ് പരിഹരിക്കുക: \"He can drives.\"",
      "options": [
        "A) He can to drive.",
        "B) He can drive.",
        "C) He could drives.",
        "D) He can’t to drive."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Complete the useful sentence pattern: \"We can learn ___.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"We can learn ___.\"",
      "options": [
        "A) slowly",
        "B) repeat",
        "C) together",
        "D) confident"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Which of the following topics is NOT requested to talk about during the Speaking Practice phase?",
      "questionMl": "സ്പീക്കിംഗ് പരിശീലന ഘട്ടത്തിൽ സംസാരിക്കാൻ ആവശ്യപ്പെടാത്ത വിഷയം താഴെ പറയുന്നവയിൽ ഏതാണ്?",
      "options": [
        "A) Things you can do",
        "B) Skills you want to learn",
        "C) Ask your partner for help politely",
        "D) Things your neighbors cannot do"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Which modal verb is primarily used to express general physical or mental ability?",
      "questionMl": "പൊതുവായ ശാരീരികമോ മാനസികമോ ആയ കഴിവ് പ്രകടിപ്പിക്കാൻ ഉപയോഗിക്കുന്ന മോഡൽ ക്രിയ ഏതാണ്?",
      "options": [
        "A) Can",
        "B) Must",
        "C) Should",
        "D) Might"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "What golden advice is explicitly repeated during the Speaking Practice instructions?",
      "questionMl": "സ്പീക്കിംഗ് പരിശീലന നിർദ്ദേശങ്ങൾക്കിടയിൽ വ്യക്തമായി ആവർത്തിച്ചു നൽകുന്ന സുവർണ്ണ ഉപദേശം എന്താണ്?",
      "options": [
        "A) Focus perfectly on grammar rules first",
        "B) Don’t worry about mistakes. Keep speaking confidently",
        "C) Translate carefully from your native language",
        "D) Stop speaking if you make any errors"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Complete the English Power Usage: \"No problem, I can ___.\"",
      "questionMl": "ഈ ഇംഗ്ലീഷ് പവർ യൂസേജ് പൂർത്തിയാക്കുക: \"No problem, I can ___.\"",
      "options": [
        "A) repeat",
        "B) explain",
        "C) help",
        "D) learn"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Which vocabulary word means to speak or act at a low speed?",
      "questionMl": "കുറഞ്ഞ വേഗതയിൽ സംസാരിക്കുകയോ പ്രവർത്തിക്കുകയോ ചെയ്യുക എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Quickly",
        "B) Loudly",
        "C) Softly",
        "D) Slowly"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Fill in the blank using the correct vocabulary word: \"I want to ___ my English speaking skills.\"",
      "questionMl": "ശരിയായ വൊക്കാബുലറി വാക്ക് ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"I want to ___ my English speaking skills.\"",
      "options": [
        "A) improve",
        "B) repeat",
        "C) talent",
        "D) experience"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Fill in the blank: \"Could you open the ___?\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"Could you open the ___?\"",
      "options": [
        "A) window",
        "B) door",
        "C) book",
        "D) car"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Complete the sentence: \"They can't _____ English fluently yet.\"",
      "questionMl": "വാക്യം പൂർത്തിയാക്കുക: \"അവർക്ക് ഇതുവരെ ഇംഗ്ലീഷ് നന്നായി സംസാരിക്കാൻ കഴിയില്ല.\"",
      "options": [
        "A) speaks",
        "B) spoken",
        "C) speak",
        "D) speaking"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "How do you politely ask someone for help using 'could'?",
      "questionMl": "ഒരാളോട് വളരെ മാന്യമായി സഹായം അഭ്യർത്ഥിക്കാൻ അനുയോജ്യമായ ചോദ്യം ഏതാണ്?",
      "options": [
        "A) Can you help me please with this bag?",
        "B) Could you to help me with this bag?",
        "C) Can you helping me with this bag?",
        "D) Could you please help me with this bag?"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Fill in the blank: \"She _____ swim very well, so she goes to the pool every day.\"",
      "questionMl": "അവൾക്ക് നന്നായി നീന്താൻ കഴിയും എന്ന് സൂചിപ്പിക്കാൻ ശരിയായ വാക്ക്:",
      "options": [
        "A) can",
        "B) can't",
        "C) could not",
        "D) cannot to"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Which sentence correctly expresses an inability to do something in spoken English?",
      "questionMl": "ഒരു കാര്യം ചെയ്യാൻ കഴിയില്ല എന്ന് വ്യക്തമാക്കുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I can't to speak French, but I can.",
        "B) I can't speak French, but I can speak English.",
        "C) I no can speak French.",
        "D) I cannot speaks French."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "How do you respond politely when someone asks 'Can you help me carry this box?'",
      "questionMl": "സഹായം ചോദിക്കുമ്പോൾ സന്തോഷത്തോടെ സമ്മതിക്കുന്ന മാന്യമായ മറുപടി ഏതാണ്?",
      "options": [
        "A) No, I am busy always.",
        "B) Can you carry yourself?",
        "C) Yes, of course! I can help you.",
        "D) I am doing help."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"_____ you please repeat that question slowly?\"",
      "questionMl": "ആ ചോദ്യം ഒന്നു കൂടി സാവധാനം ആവർത്തിക്കാമോ എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) Should to",
        "B) Are",
        "C) Have",
        "D) Could"
      ],
      "correctIndex": 3
    }
  ],
  "5": [
    {
      "id": 1,
      "question": "Which pronoun group is correctly matched with the grammar rule for \"have to\"?",
      "questionMl": "“have to” എന്ന വ്യാകരണ നിയമവുമായി ശരിയായി പൊരുത്തപ്പെടുന്ന പ്രൊനൗൺ ഗ്രൂപ്പ് ഏതാണ്?",
      "options": [
        "A) I, You, We, They",
        "B) He, She, It",
        "C) He, She, They",
        "D) I, He, It"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "What does the expression \"have to\" or \"has to\" mean in Malayalam?",
      "questionMl": "“have to” അല്ലെങ്കിൽ “has to” എന്ന പ്രയോഗത്തിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ചെയ്യേണ്ടി വന്നു",
        "B) ചെയ്യേണ്ടതുണ്ട്",
        "C) ചെയ്യുമായിരുന്നു",
        "D) ചെയ്യണം"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Which of the following sentences correctly matches a singular third-person pronoun with its verb?",
      "questionMl": "താഴെ പറയുന്ന വാക്യങ്ങളിൽ സിംഗുലർ തേർഡ് പേഴ്‌സൺ പ്രൊനൗണും വെർബും ശരിയായി പൊരുത്തപ്പെടുന്നത് ഏതിലാണ്?",
      "options": [
        "A) He have to study.",
        "B) They has to study.",
        "C) He has to study.",
        "D) We has to study."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "When should you use the grammatical structure \"had to\"?",
      "questionMl": "“had to” എന്ന വ്യാകരണ ഘടന നിങ്ങൾ എപ്പോഴാണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) To talk about future plans",
        "B) To give general advice to a friend",
        "C) To describe a daily routine happening now",
        "D) To talk about a responsibility in the past"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Translate the phrase into Malayalam: \"I had to work yesterday.\"",
      "questionMl": "“I had to work yesterday” എന്ന വാചകം മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) എനിക്ക് ഇന്നലെ ജോലി ചെയ്യേണ്ടതുണ്ടായിരുന്നു (ജോലി ചെയ്യേണ്ടി വന്നു)",
        "B) ഞാൻ ഇന്ന് ജോലി ചെയ്യണം",
        "C) എനിക്ക് നാളെ ജോലി ചെയ്യേണ്ടതുണ്ട്",
        "D) ഞാൻ ഇന്നലെ ജോലി ചെയ്യുകയായിരുന്നു"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What is the primary purpose of using the word \"should\" in English communication?",
      "questionMl": "ഇംഗ്ലീഷ് ആശയവിനിമയത്തിൽ \"should\" എന്ന വാക്ക് ഉപയോഗിക്കുന്നതിന്റെ പ്രധാന ഉദ്ദേശ്യം എന്താണ്?",
      "options": [
        "A) To force someone to do a task past due",
        "B) To give advice or suggestions",
        "C) To ask for permission politely",
        "D) To talk about a mandatory law"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "What does the modal verb 'should' express in English sentences?",
      "questionMl": "ഇംഗ്ലീഷിൽ 'should' എന്ന മോഡൽ വെർബ് എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
      "options": [
        "A) Compulsion",
        "B) Ability",
        "C) Advice or suggestion",
        "D) Past habit"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Complete the Useful Sentence Pattern: \"I have to wake up ___.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"I have to wake up ___.\"",
      "options": [
        "A) daily",
        "B) priority",
        "C) discipline",
        "D) early"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Complete the advice pattern: \"You should practise English ___.\"",
      "questionMl": "ഈ ഉപദേശ ഘടന പൂർത്തിയാക്കുക: \"You should practise English ___.\"",
      "options": [
        "A) daily",
        "B) yesterday",
        "C) had to",
        "D) necessary"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Correct the following common mistake: \"He have to study.\"",
      "questionMl": "താഴെ പറയുന്ന പൊതുവായ തെറ്റ് തിരുത്തുക: \"He have to study.\"",
      "options": [
        "A) He is study.",
        "B) He has to study.",
        "C) He should to study.",
        "D) He had to studied."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Correct the following error regarding the use of \"has to\": \"I has to go.\"",
      "questionMl": "“has to” എന്നതിന്റെ ഉപയോഗവുമായി ബന്ധപ്പെട്ട താഴെ പറയുന്ന തെറ്റ് തിരുത്തുക: \"I has to go.\"",
      "options": [
        "A) I had to went.",
        "B) I should to go.",
        "C) I have to go.",
        "D) I am go."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Fix the sentence structure error: \"You should to practise.\"",
      "questionMl": "ഈ വാക്യ ഘടനയിലെ തെറ്റ് പരിഹരിക്കുക: \"You should to practise.\"",
      "options": [
        "A) You should practising.",
        "B) You has to practise.",
        "C) You had to practised.",
        "D) You should practise."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Identify the mistake in the sentence: \"I had to went.\"",
      "questionMl": "“I had to went” എന്ന വാക്യത്തിലെ തെറ്റ് എന്താണ്?",
      "options": [
        "A) \"went\" should be replaced with the base form \"go\"",
        "B) \"I\" should be replaced with \"He\"",
        "C) \"had to\" should be changed to \"has to\"",
        "D) \"went\" should be changed to \"gone\""
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct this sentence pattern: \"She should studies.\"",
      "questionMl": "ഈ വാക്യ ഘടന ശരിയാക്കുക: \"She should studies.\"",
      "options": [
        "A) She have to study.",
        "B) She should study.",
        "C) She should to study.",
        "D) She had to studied."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Which sentence correctly gives friendly advice to a colleague who is feeling unwell?",
      "questionMl": "അസുഖം ബാധിച്ച സുഹൃത്തിന് ഉപദേശം നൽകാൻ ഏറ്റവും അനുയോജ്യമായ വാക്യം ഏതാണ്?",
      "options": [
        "A) You have to see a doctor yesterday.",
        "B) You had to seeing a doctor.",
        "C) You should see a doctor and take some rest.",
        "D) You should to see a doctor."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "What response does Person B give to the question \"What should I do to improve my English?\" in the conversation?",
      "questionMl": "സംഭാഷണത്തിൽ \"What should I do to improve my English?\" എന്ന ചോദ്യത്തിന് ബി വ്യക്തി നൽകുന്ന മറുപടി എന്താണ്?",
      "options": [
        "A) You have to go to work.",
        "B) I had to visit the hospital.",
        "C) She has to study every evening.",
        "D) You should practise speaking every day."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Where did Person B have to go yesterday according to the example conversation?",
      "questionMl": "മാതൃകാ സംഭാഷണം അനുസരിച്ച് ഇന്നലെ ബി വ്യക്തിക്ക് എവിടെയാണ് പോകേണ്ടി വന്നത്?",
      "options": [
        "A) To the hospital",
        "B) To the office",
        "C) To the school",
        "D) To the market"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Which vocabulary word refers to a fixed time limit by which something must be completed?",
      "questionMl": "ഒരു കാര്യം ചെയ്തു തീർക്കേണ്ട അവസാന സമയപരിധിയെ സൂചിപ്പിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Schedule",
        "B) Deadline",
        "C) Routine",
        "D) Delay"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What does the vocabulary word \"Priority\" mean?",
      "questionMl": "“Priority” എന്ന വൊക്കാബുലറി വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഒരു സാധാരണ ശീലം",
        "B) കഴിഞ്ഞകാല ഉത്തരവാദിത്തം",
        "C) എറ്റവും പ്രാധാന്യമുള്ള കാര്യം (മുൻഗണന)",
        "D) ഒരു നിശ്ചിത അപ്പോയിന്റ്മെന്റ്"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Fill in the blank: \"It’s important to ___ your work.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"It’s important to ___ your work.\"",
      "options": [
        "A) duty",
        "B) should",
        "C) advice",
        "D) prepare"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Fill in the blank: \"They have to wear ___ at school.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"They have to wear ___ at school.\"",
      "options": [
        "A) uniforms",
        "B) homework",
        "C) routines",
        "D) appointments"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Complete the Power Usage phrase: \"Make it a ___.\"",
      "questionMl": "ഈ പവർ യൂസേജ് വാചകം പൂർത്തിയാക്കുക: \"Make it a ___.\"",
      "options": [
        "A) discipline",
        "B) habit",
        "C) priority",
        "D) deadline"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Which of the following is a correct sentence template for plural third-person pronouns?",
      "questionMl": "താഴെ പറയുന്നവയിൽ ബഹുവചന തേർഡ് പേഴ്‌സൺ പ്രൊനൗണുകൾക്കുള്ള ശരിയായ വാക്യ ഘടന ഏതാണ്?",
      "options": [
        "A) They has to complete the project.",
        "B) They should to complete the project.",
        "C) They have to complete the project.",
        "D) They had to completed the project."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Which sentence correctly describes a past obligation that you had to fulfill yesterday?",
      "questionMl": "ഇന്നലെ നിർബന്ധമായും ചെയ്യേണ്ടിവന്ന ഒരു കാര്യത്തെക്കുറിച്ച് പറയുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I have to submit my project report yesterday.",
        "B) I has to submit my project report yesterday.",
        "C) I had submit my project report yesterday.",
        "D) I had to submit my project report yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Choose the correct sentence that represents a past duty:",
      "questionMl": "കഴിഞ്ഞകാല കടമയെ പ്രതിനിധീകരിക്കുന്ന ശരിയായ വാക്യം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) She had to leave early.",
        "B) She has to leave early today.",
        "C) She should to leave early.",
        "D) She have to leave early."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Complete the pattern: \"We should ___ everyone.\"",
      "questionMl": "ഈ ഘടന പൂർത്തിയാക്കുക: \"We should ___ everyone.\"",
      "options": [
        "A) to respect",
        "B) respect",
        "C) respecting",
        "D) respected"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "What does the Malayalam definition \"ചെയ്യേണ്ടി വന്നു\" match with?",
      "questionMl": "“ചെയ്യേണ്ടി വന്നു” എന്ന മലയാളം അർത്ഥം ഏത് ഘടനയുമായാണ് പൊരുത്തപ്പെടുന്നത്?",
      "options": [
        "A) have to",
        "B) has to",
        "C) had to",
        "D) should"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Fill in the blank: \"He _____ wake up early tomorrow because he has an exam.\"",
      "questionMl": "നാളെ പരീക്ഷയുള്ളതുകൊണ്ട് അവന് നേരത്തെ എഴുന്നേൽക്കണം:",
      "options": [
        "A) have to",
        "B) had to",
        "C) having to",
        "D) has to"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Which sentence correctly expresses a work responsibility using 'have to'?",
      "questionMl": "ജോലിസ്ഥലത്തെ ഒരു ഉത്തരവാദിത്തത്തെക്കുറിച്ച് പറയുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) We have to attend the team meeting at 10 AM.",
        "B) We has to attend the team meeting at 10 AM.",
        "C) We had to attending the meeting tomorrow.",
        "D) We have attend the meeting."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"You _____ drive carefully when the roads are wet.\"",
      "questionMl": "റോഡിൽ വെള്ളമുള്ളപ്പോൾ നിങ്ങൾ ശ്രദ്ധിച്ച് വണ്ടിയോടിക്കണം എന്ന് ഉപദേശിക്കാൻ:",
      "options": [
        "A) had to",
        "B) should",
        "C) would to",
        "D) has to"
      ],
      "correctIndex": 1
    }
  ],
  "6": [
    {
      "id": 1,
      "question": "What is the grammatical function of expressions like 'Would you please' and 'I would like to'?",
      "questionMl": "'Would you please', 'I would like to' തുടങ്ങിയ പ്രയോഗങ്ങളുടെ വ്യാകരണപരമായ പ്രവർത്തനം എന്താണ്?",
      "options": [
        "A) Talking about professional routines",
        "B) Asking structural past tense WH questions",
        "C) Making polite requests, expressing wishes, and talking about possibilities",
        "D) Describing items possessed by your family"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Which group of modal verbs is used for polite requests and future possibilities?",
      "questionMl": "മര്യാദയുള്ള അഭ്യർത്ഥനകൾക്കും സാധ്യതകൾക്കും ഉപയോഗിക്കുന്ന മോഡൽ ക്രിയകൾ ഏവ?",
      "options": [
        "A) can, can't, could, should",
        "B) have to, has to, had to, should",
        "C) who, what, where, why",
        "D) would, would like to, may, might"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "In the polite request 'Would you please help me?', what is 'Would' used for?",
      "questionMl": "'Would you please help me?' എന്ന വാക്യത്തിൽ 'Would' എന്തിനാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) For polite requests",
        "B) To talk about past habits",
        "C) To express complete certainty",
        "D) To show sudden anger"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "What is the Malayalam meaning of the polite request: \"Would you help me?\"",
      "questionMl": "“Would you help me?” എന്ന വിനയപൂർവ്വമായ അഭ്യർത്ഥനയുടെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഞാൻ നിങ്ങളെ സഹായിക്കണോ?",
        "B) ദയവായി എന്നെ സഹായിക്കാമോ?",
        "C) നിങ്ങൾക്ക് എന്നെ സഹായിക്കാൻ കഴിയില്ലേ?",
        "D) അവൻ എന്നെ സഹായിക്കും"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "What structure should you use to express a wish or preference?",
      "questionMl": "ഒരു ആഗ്രഹമോ മുൻഗണനയോ പ്രകടിപ്പിക്കാൻ നിങ്ങൾ ഏത് ഘടനയാണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) May",
        "B) Might",
        "C) Would like to",
        "D) Had to"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Translate this wish into English: \"എനിക്ക് ഇംഗ്ലീഷ് പഠിക്കാൻ ആഗ്രഹമുണ്ട്.\"",
      "questionMl": "“എനിക്ക് ഇംഗ്ലീഷ് പഠിക്കാൻ ആഗ്രഹമുണ്ട്” എന്ന വാചകം ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) I can speak English.",
        "B) I might learn English tomorrow.",
        "C) I have to learn English now.",
        "D) I would like to learn English."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "What are the two primary uses of the modal verb 'May'?",
      "questionMl": "'May' എന്ന മോഡൽ വെർബിന്റെ രണ്ട് പ്രധാന ഉപയോഗങ്ങൾ ഏവ?",
      "options": [
        "A) Asking permission and expressing possibility",
        "B) Obligation and necessity",
        "C) Past action and future continuous",
        "D) Refusal and command"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Translate the possibility sentence: \"It may rain today.\"",
      "questionMl": "“It may rain today” എന്ന വാക്യം വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) ഇന്ന് മഴ പെയ്തേക്കാം (ചെറിയ സാധ്യത)",
        "B) ഇന്ന് മഴ പെയ്യാൻ സാധ്യതയുണ്ട്",
        "C) ഇന്നലെ മഴ പെയ്തു",
        "D) ഇന്ന് മഴ പെയ്യണം"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "What is the difference between \"May\" and \"Might\" when talking about possibilities?",
      "questionMl": "സാധ്യതകളെക്കുറിച്ച് സംസാരിക്കുമ്പോൾ \"May\", \"Might\" എന്നിവ തമ്മിലുള്ള വ്യത്യാസം എന്താണ്?",
      "options": [
        "A) \"May\" shows past actions; \"Might\" shows future actions",
        "B) \"May\" is completely informal; \"Might\" is strictly formal",
        "C) \"Might\" is used for a smaller possibility than \"May\"",
        "D) There is absolutely no difference between them"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate this smaller possibility into English: \"ഞാൻ വൈകിയേക്കാം.\"",
      "questionMl": "“ഞാൻ വൈകിയേക്കാം” എന്ന വാചകം ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) I am late today.",
        "B) I would like to be late.",
        "C) May I be late?",
        "D) I might be late."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which word from the Power Vocabulary list means to ask someone to come to a social event or meeting?",
      "questionMl": "ഒരു സാമൂഹിക പരിപാടിക്കോ മീറ്റിംഗിനോ ഒരാളെ ക്ഷണിക്കുക എന്ന അർത്ഥം വരുന്ന പവർ വൊക്കാബുലറിയിലെ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Invite",
        "B) Accept",
        "C) Refuse",
        "D) Choice"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Fill in the blank with the correct phrase: \"___ you mind helping me move this?\"",
      "questionMl": "ശരിയായ പദപ്രയോഗം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"___ you mind helping me move this?\"",
      "options": [
        "A) May",
        "B) Would",
        "C) Might",
        "D) Would like to"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "What is the short, natural contraction pattern for \"I would like to...\" taught in Power Usages?",
      "questionMl": "പവർ യൂസേജിൽ പഠിപ്പിക്കുന്ന \"I would like to...\" എന്നതിന്റെ ചുരുക്കരൂപം ഏതാണ്?",
      "options": [
        "A) I’m like to…",
        "B) I’ve like to…",
        "C) I’d like to…",
        "D) I’ll like to…"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "In the Example Conversation, what is the English phrase for \"അതെ, സന്തോഷത്തോടെ\"?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ \"അതെ, സന്തോഷത്തോടെ\" എന്നതിനുള്ള ഇംഗ്ലീഷ് വാചകം ഏതാണ്?",
      "options": [
        "A) Of course.",
        "B) No problem.",
        "C) Certainly.",
        "D) Yes, I’d love to."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct the following common mistake: \"I would like learn English.\"",
      "questionMl": "താഴെ പറയുന്ന പൊതുവായ തെറ്റ് തിരുത്തുക: \"I would like learn English.\"",
      "options": [
        "A) I would like to learn English.",
        "B) I would like learning English.",
        "C) I would likes tea.",
        "D) I may to learn English."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Correct this permission mistake: \"May I to come in?\"",
      "questionMl": "അനുവാദം ചോദിക്കുന്നതിലെ ഈ തെറ്റ് തിരുത്തുക: \"May I to come in?\"",
      "options": [
        "A) May I coming in?",
        "B) May I come in?",
        "C) Would I come in?",
        "D) Might I to come in?"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Fix the sentence structure error: \"He might comes.\"",
      "questionMl": "ഈ വാക്യ ഘടനയിലെ തെറ്റ് പരിഹരിക്കുക: \"He might comes.\"",
      "options": [
        "A) He might to come.",
        "B) He may comes.",
        "C) He might come.",
        "D) He would likes to come."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Fix this question pattern mistake: \"Would you likes tea?\"",
      "questionMl": "ഈ ചോദ്യ ഘടനയിലെ തെറ്റ് പരിഹരിക്കുക: \"Would you likes tea?\"",
      "options": [
        "A) Would you to like tea?",
        "B) May you like tea?",
        "C) Might you like tea?",
        "D) Would you like tea?"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Complete the Useful Sentence Pattern: \"We might visit Kochi ___.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"We might visit Kochi ___.\"",
      "options": [
        "A) next week",
        "B) today",
        "C) yesterday",
        "D) perhaps"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Which vocabulary word means to politely say 'no' to an invitation or offer?",
      "questionMl": "ഒരു ക്ഷണമോ ഓഫറോ മാന്യമായി നിരസിക്കുക എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Accept",
        "B) Decline",
        "C) Postpone",
        "D) Inquire"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Fill in the blank: \"It’s ___ that Ahmed will arrive later.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"It’s ___ that Ahmed will arrive later.\"",
      "options": [
        "A) refuse",
        "B) decision",
        "C) possible",
        "D) permission"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Complete the conversation pattern: \"May I sit here? Yes, you ___.\"",
      "questionMl": "ഈ സംഭാഷണ ശൈലി പൂർത്തിയാക്കുക: \"May I sit here? Yes, you ___.\"",
      "options": [
        "A) would",
        "B) might",
        "C) like to",
        "D) may"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Select the correct sentence that describes a wish for a group:",
      "questionMl": "ഒരു ഗ്രൂപ്പിന്റെ ആഗ്രഹത്തെ വിവരിക്കുന്ന ശരിയായ വാക്യം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) We would like to join the course.",
        "B) We would like join the course.",
        "C) We may to join the course.",
        "D) We might joins the course."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Complete the Power Usage phrase: \"No problem, ___.\"",
      "questionMl": "ഈ പവർ യൂസേജ് വാചകം പൂർത്തിയാക്കുക: \"No problem, ___.\"",
      "options": [
        "A) Of course",
        "B) I’d love to",
        "C) Certainly",
        "D) It might happen"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "How do you politely invite a coworker for a cup of coffee?",
      "questionMl": "ഒരു സഹപ്രവർത്തകനെ കാപ്പി കുടിക്കാൻ മാന്യമായി ക്ഷണിക്കുന്നത് എങ്ങനെയാണ്?",
      "options": [
        "A) Will you having coffee with me?",
        "B) May you drink coffee now?",
        "C) Would you like to have a cup of coffee with me?",
        "D) Do you like coffee yesterday?"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"Would you ___ that?\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"Would you ___ that?\"",
      "options": [
        "A) repeating",
        "B) repeats",
        "C) to repeat",
        "D) repeat"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Which word means the act of choosing or making up your mind?",
      "questionMl": "ഒരു തീരുമാനം എടുക്കുക എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Decision",
        "B) Opportunity",
        "C) Chance",
        "D) Permission"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "How do you politely ask permission to leave an office meeting early?",
      "questionMl": "മീറ്റിംഗിൽ നിന്ന് നേരത്തെ പോകാൻ മാന്യമായി അനുവാദം ചോദിക്കുന്നത് എങ്ങനെ?",
      "options": [
        "A) Would I leave early today?",
        "B) May I leave early today, sir?",
        "C) Might I leave today early?",
        "D) I will leave early today."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Complete the sentence to express a possibility: \"Take an umbrella; it _____ rain later today.\"",
      "questionMl": "മഴ പെയ്യാൻ സാധ്യതയുണ്ട് എന്ന് പറയാൻ ശരിയായ വാക്ക്:",
      "options": [
        "A) would to",
        "B) must to",
        "C) might",
        "D) should to"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "What is the most polite way to order water in a café using 'would like'?",
      "questionMl": "കഫേയിൽ മാന്യമായി ഒരു ഗ്ലാസ്സ് വെള്ളം ആവശ്യപ്പെടാൻ:",
      "options": [
        "A) I want water quickly.",
        "B) Give me water now.",
        "C) I would water please.",
        "D) I would like a glass of water, please."
      ],
      "correctIndex": 3
    }
  ],
  "7": [
    {
      "id": 1,
      "question": "Which question word is used when asking about a place or location?",
      "questionMl": "ഒരു സ്ഥലത്തെക്കുറിച്ച് ചോദിക്കാൻ ഉപയോഗിക്കുന്ന ചോദ്യ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Where",
        "B) When",
        "C) Why",
        "D) Who"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "What is the word \"Who\" used to ask about in English grammar focus?",
      "questionMl": "ഇംഗ്ലീഷ് വ്യാകരണത്തിൽ \"Who\" എന്ന വാക്ക് എന്തിനെക്കുറിച്ച് ചോദിക്കാനാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) A location or place",
        "B) A person",
        "C) A time frame",
        "D) A hidden reason"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "What is the Malayalam meaning of the question word \"Whom\"?",
      "questionMl": "“Whom” എന്ന ചോദ്യ വാക്കിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ആര്",
        "B) എവിടെ",
        "C) ആരെ",
        "D) എന്ത്"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "In natural everyday spoken English, which question word is most commonly used when asking about a person?",
      "questionMl": "ദൈനംദിന സംസാര ഇംഗ്ലീഷിൽ ഒരു വ്യക്തിയെക്കുറിച്ച് ചോദിക്കാൻ സാധാരണയായി ഏത് വാക്കാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) Whom is preferred in casual speech",
        "B) Both are used identically in speech",
        "C) Neither word should be used spoken aloud",
        "D) Who is most commonly used in spoken English"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Which question word is specifically used to ask about time?",
      "questionMl": "സമയത്തെക്കുറിച്ച് ചോദിക്കാൻ പ്രത്യേകമായി ഉപയോഗിക്കുന്ന ചോദ്യ വാക്ക് ഏതാണ്?",
      "options": [
        "A) When",
        "B) Where",
        "C) Which",
        "D) Whose"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What does the question word 'Where' mean in Malayalam?",
      "questionMl": "'Where' എന്ന ഇംഗ്ലീഷ് ചോദ്യ വാക്കിന്റെ മലയാള അർത്ഥം എന്താണ്?",
      "options": [
        "A) എപ്പോൾ (When)",
        "B) എവിടെ (Where)",
        "C) എന്തുകൊണ്ട് (Why)",
        "D) എങ്ങനെ (How)"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Translate the question: \"Why are you late?\"",
      "questionMl": "“Why are you late?” എന്ന ചോദ്യം വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) നിങ്ങൾ എപ്പോഴാണ് വരുന്നത്?",
        "B) നിങ്ങളുടെ ഓഫീസ് എവിടെയാണ്?",
        "C) നിങ്ങൾ എന്തുകൊണ്ടാണ് വൈകിയത്?",
        "D) നിങ്ങൾ ആരാണ്?"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "When should you choose to use the question word \"Which\"?",
      "questionMl": "“Which” എന്ന ചോദ്യ വാക്ക് നിങ്ങൾ എപ്പോഴാണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) To ask about ownership or possession",
        "B) To ask for a structural location",
        "C) To gather general time data",
        "D) To choose from options"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Which question word is used to discover ownership or possession?",
      "questionMl": "ഉടമസ്ഥതയോ കൈവശമുള്ള കാര്യങ്ങളോ കണ്ടെത്തുന്നതിന് ഉപയോഗിക്കുന്ന ചോദ്യ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Whose",
        "B) Which",
        "C) Whom",
        "D) What"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Translate this ownership question into English: \"ഇത് ആരുടെ ബാഗാണ്?\"",
      "questionMl": "“ഇത് ആരുടെ ബാഗാണ്?” എന്ന ചോദ്യം ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) Which bag is this?",
        "B) Whose bag is this?",
        "C) What bag is this?",
        "D) Where bag is this?"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Fill in the blank to ask about method or condition: \"___ can I improve my English?\"",
      "questionMl": "രീതിയെയോ അവസ്ഥയെയോ കുറിച്ച് ചോദിക്കാൻ കോടി പൂരിപ്പിക്കുക: \"___ can I improve my English?\"",
      "options": [
        "A) Why",
        "B) Who",
        "C) How",
        "D) When"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Which vocabulary word describes a state of being eager to know or learn something?",
      "questionMl": "ഒരു കാര്യത്തെക്കുറിച്ച് അറിയാൻ താൽപ്പര്യമുള്ള അവസ്ഥയെ സൂചിപ്പിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Silent",
        "B) Busy",
        "C) Strict",
        "D) Curious"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the following extremely common spoken mistake: \"Where you live?\"",
      "questionMl": "സംസാരത്തിൽ സാധാരണയായി വരുത്താറുള്ള താഴെ പറയുന്ന തെറ്റ് തിരുത്തുക: \"Where you live?\"",
      "options": [
        "A) Where do you live?",
        "B) Where are you live?",
        "C) Where you living?",
        "D) When do you live?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the following direct missing-verb error: \"What your name?\"",
      "questionMl": "വെർബ് ഇല്ലാത്ത താഴെ പറയുന്ന തെറ്റ് തിരുത്തുക: \"What your name?\"",
      "options": [
        "A) What do your name?",
        "B) What is your name?",
        "C) What name is yours?",
        "D) Whose your name?"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Fix this question word order mistake: \"Why you are late?\"",
      "questionMl": "ഈ ചോദ്യത്തിലെ പദങ്ങളുടെ ക്രമത്തിലുള്ള തെറ്റ് തിരുത്തുക: \"Why you are late?\"",
      "options": [
        "A) Why late you are?",
        "B) Why do you late?",
        "C) Why are you late?",
        "D) What reason you late?"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Fix the following error sentence: \"How you improve English?\"",
      "questionMl": "താഴെ പറയുന്ന തെറ്റായ വാക്യം തിരുത്തുക: \"How you improve English?\"",
      "options": [
        "A) How do you to improve English?",
        "B) How you are improve English?",
        "C) Which way you improve English?",
        "D) How can you improve your English?"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Fix this teacher-related question mistake: \"Whom is your teacher?\"",
      "questionMl": "അധ്യാപകനെക്കുറിച്ചുള്ള ഈ ചോദ്യത്തിലെ തെറ്റ് തിരുത്തുക: \"Whom is your teacher?\"",
      "options": [
        "A) Who is your teacher?",
        "B) What is your teacher?",
        "C) Which is your teacher?",
        "D) Whose is your teacher?"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Which of the following is a polite \"English Power Usage\" used to initiate a question conversationally?",
      "questionMl": "സംഭാഷണത്തിനിടയിൽ വിനയപൂർവ്വം ഒരു ചോദ്യം ചോദിക്കാൻ ഉപയോഗിക്കുന്ന \"English Power Usage\" ഏതാണ്?",
      "options": [
        "A) Tell me more.",
        "B) Can I ask you something?",
        "C) That’s interesting.",
        "D) Thank you for answering."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "In the Example Conversation, why is Ahmed learning English?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ അഹമ്മദ് എന്തുകൊണ്ടാണ് ഇംഗ്ലീഷ് പഠിക്കുന്നത്?",
      "options": [
        "A) Because he wants to travel to Kochi",
        "B) Because his friend requested it",
        "C) Because he wants a better job",
        "D) To talk to his family members"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "How does Ahmed say he practises English every day?",
      "questionMl": "താൻ ദിവസവും എങ്ങനെയാണ് ഇംഗ്ലീഷ് പരിശീലിക്കുന്നത് എന്നാണ് അഹമ്മദ് പറയുന്നത്?",
      "options": [
        "A) With his classmates at school",
        "B) By reading massive grammar files",
        "C) By translating news channels",
        "D) With AI every day"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Which WH-question word is used to ask about someone's reason or purpose?",
      "questionMl": "ഒരു കാര്യത്തിന്റെ കാരണം ചോദിക്കാൻ ഏത് ചോദ്യവാക്കാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) Why",
        "B) Where",
        "C) When",
        "D) Which"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Complete the Useful Sentence Pattern: \"Whose book is ___?\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"Whose book is ___?\"",
      "options": [
        "A) these",
        "B) this",
        "C) those",
        "D) whom"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Fill in the blank: \"Which one do you ___?\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"Which one do you ___?\"",
      "options": [
        "A) discover",
        "B) direction",
        "C) prefer",
        "D) location"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Complete the conversation phrase: \"When will you ___?\"",
      "questionMl": "ഈ സംഭാഷണ വാചകം പൂർത്തിയാക്കുക: \"When will you ___?\"",
      "options": [
        "A) arrive",
        "B) live",
        "C) happen",
        "D) come"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the Power Usage phrase: \"Excuse me, I’d like to ___.\"",
      "questionMl": "ഈ പവർ യൂസേജ് വാചകം പൂർത്തിയാക്കുക: \"Excuse me, I’d like to ___.\"",
      "options": [
        "A) know…",
        "B) explain…",
        "C) response…",
        "D) discover…"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "How do you ask a new acquaintance about their daily commute to work?",
      "questionMl": "ദിവസവും ജോലിസ്ഥലത്തേക്ക് എങ്ങനെയാണ് യാത്ര ചെയ്യുന്നത് എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) Where do you travel to work every day?",
        "B) How do you travel to work every day?",
        "C) When do you work travel?",
        "D) Who do you travel to work?"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the template: \"___ colour do you like?\"",
      "questionMl": "ഈ ഘടന പൂർത്തിയാക്കുക: \"___ colour do you like?\"",
      "options": [
        "A) Who",
        "B) Whose",
        "C) Which",
        "D) Whom"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Which question word is used to ask about ownership or possession?",
      "questionMl": "ഒരു വസ്തു ആരുടേതാണ് എന്ന് ചോദിക്കാൻ ഏത് ചോദ്യവാക്കാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) Whom",
        "B) Who",
        "C) Which",
        "D) Whose"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Complete the question: \"_____ one do you prefer, tea or coffee?\"",
      "questionMl": "തെരഞ്ഞെടുപ്പ് ചോദിക്കാൻ ഏത് ചോദ്യവാക്കാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) Which",
        "B) What",
        "C) Where",
        "D) Whose"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "How do you ask someone politely about their free-time hobbies?",
      "questionMl": "ഒഴിവുസമയങ്ങളിൽ എന്തൊക്കെ ചെയ്യാനാണ് ഇഷ്ടം എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) When you enjoy your free time?",
        "B) What do you enjoy doing in your free time?",
        "C) Why do you like free time?",
        "D) Who enjoys your free time?"
      ],
      "correctIndex": 1
    }
  ],
  "8": [
    {
      "id": 1,
      "question": "Which preposition should you use when describing months, years, countries, or cities?",
      "questionMl": "മാസങ്ങൾ, വർഷങ്ങൾ, രാജ്യങ്ങൾ, അല്ലെങ്കിൽ നഗരങ്ങൾ എന്നിവ വിവരിക്കുമ്പോൾ നിങ്ങൾ ഏത് പ്രെപ്പോസിഷൻ ആണ് ഉപയോഗിക്കേണ്ടത്?",
      "options": [
        "A) on",
        "B) at",
        "C) in",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Translate the sentence into Malayalam: \"My birthday is in July.\"",
      "questionMl": "“My birthday is in July” എന്ന വാചകം മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) എന്റെ ജന്മദിനം ജൂലൈ 10-നാണ്.",
        "B) എന്റെ ക്ലാസ് തിങ്കളാഴ്ചയാണ്.",
        "C) ഞാൻ ജൂലൈയിൽ വരാം.",
        "D) എന്റെ ജന്മദിനം ജൂലൈയിലാണ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Which preposition is strictly designated for days, dates, and surfaces?",
      "questionMl": "ദിവസങ്ങൾ, തീയതികൾ, ഉപരിതലങ്ങൾ (surfaces) എന്നിവയ്ക്ക് വേണ്ടി കൃത്യമായി നിശ്ചയിച്ചിട്ടുള്ള പ്രെപ്പോസിഷൻ ഏതാണ്?",
      "options": [
        "A) on",
        "B) in",
        "C) at",
        "D) from"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Fill in the blank using the correct preposition: \"The phone is ___ the table.\"",
      "questionMl": "ശരിയായ പ്രെപ്പോസിഷൻ ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"The phone is ___ the table.\"",
      "options": [
        "A) in",
        "B) on",
        "C) at",
        "D) for"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Correct the following common mistake: \"Meet me in 9 PM.\"",
      "questionMl": "താഴെ പറയുന്ന പൊതുവായ തെറ്റ് തിരുത്തുക: \"Meet me in 9 PM.\"",
      "options": [
        "A) Meet me on 9 PM.",
        "B) Meet me to 9 PM.",
        "C) Meet me at 9 PM.",
        "D) Meet me for 9 PM."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "What does the preposition \"To\" show in a sentence pattern?",
      "questionMl": "ഒരു വാക്യ ഘടനയിൽ \"To\" എന്ന പ്രെപ്പോസിഷൻ എന്തിനെയാണ് കാണിക്കുന്നത്?",
      "options": [
        "A) Duration",
        "B) Companionship",
        "C) Surface position",
        "D) Direction"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Fill in the blank: \"She went ___ Kochi.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"She went ___ Kochi.\"",
      "options": [
        "A) to",
        "B) in",
        "C) on",
        "D) at"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "What are the two functions shown by the preposition \"For\"?",
      "questionMl": "“For” എന്ന പ്രെപ്പോസിഷൻ കാണിക്കുന്ന രണ്ട് ധർമ്മങ്ങൾ ഏവ?",
      "options": [
        "A) Exact time and specific place",
        "B) Purpose or duration",
        "C) Origin and starting point",
        "D) Singular and plural relationship"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Translate the duration expression: \"I studied for two hours.\"",
      "questionMl": "“I studied for two hours” എന്ന കാലയളവ് വ്യക്തമാക്കുന്ന വാചകം വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) ഞാൻ രണ്ട് മണിക്ക് പഠിച്ചു.",
        "B) ഞാൻ രണ്ട് ദിവസമായി പഠിക്കുന്നു.",
        "C) ഞാൻ രണ്ട് മണിക്കൂർ പഠിച്ചു.",
        "D) ഞാൻ രണ്ടു തവണ പഠിച്ചു."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Which preposition shows the starting point or origin?",
      "questionMl": "തുടങ്ങുന്ന സ്ഥലത്തെയോ ഉത്ഭവത്തെയോ കാണിക്കുന്ന പ്രെപ്പോസിഷൻ ഏതാണ്?",
      "options": [
        "A) to",
        "B) inside",
        "C) with",
        "D) from"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Complete the sentence pattern: \"This train comes ___ Chennai.\"",
      "questionMl": "ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"This train comes ___ Chennai.\"",
      "options": [
        "A) from",
        "B) to",
        "C) at",
        "D) on"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Fill in the blank: \"Write ___ a pen.\"",
      "questionMl": "കോടി പൂരിപ്പിക്കുക: \"Write ___ a pen.\"",
      "options": [
        "A) of",
        "B) with",
        "C) by",
        "D) in"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Which preposition shows relationship or possession, such as \"the colour of the car\"?",
      "questionMl": "“the colour of the car” എന്നതിലെ പോലെ ബന്ധത്തെയോ ഉടമസ്ഥതയെയോ കാണിക്കുന്ന പ്രെപ്പോസിഷൻ ഏതാണ്?",
      "options": [
        "A) with",
        "B) for",
        "C) of",
        "D) at"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Correct the article error in this sentence: \"She is a engineer.\"",
      "questionMl": "ഈ വാക്യത്തിലെ ആർട്ടിക്കിൾ തെറ്റ് തിരുത്തുക: \"She is a engineer.\"",
      "options": [
        "A) She is the engineer.",
        "B) She is one engineer.",
        "C) She are an engineer.",
        "D) She is an engineer."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "What is the correct irregular plural form of the noun 'child'?",
      "questionMl": "'Child' എന്ന വാക്കിന്റെ ശരിയായ ബഹുവചന രൂപം ഏതാണ്?",
      "options": [
        "A) children",
        "B) childs",
        "C) childrens",
        "D) childes"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "What is the plural form of the word \"person\" listed in Singular & Plural focus?",
      "questionMl": "“Singular & Plural” ഫോക്കസിൽ നൽകിയിട്ടുള്ള \"person\" എന്ന വാക്കിന്റെ ബഹുവചനം ഏതാണ്?",
      "options": [
        "A) persons",
        "B) people",
        "C) peoples",
        "D) peopleses"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Choose the correct plural match for \"foot\":",
      "questionMl": "“foot” എന്ന വാക്കിന്റെ ശരിയായ ബഹുവചനം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) foots",
        "B) feets",
        "C) feet",
        "D) footes"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Which of the following words belongs to the Power Vocabulary and means the place to which someone is going?",
      "questionMl": "പവർ വൊക്കാബുലറിയിൽ ഉൾപ്പെടുന്നതും ഒരാൾ എവിടേക്കാണോ പോകുന്നത് ആ സ്ഥലത്തെ അർത്ഥമാക്കുന്നതുമായ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Journey",
        "B) Entrance",
        "C) Centre",
        "D) Destination"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Complete the Power Usage phrase: \"See you ___...\"",
      "questionMl": "ഈ പവർ യൂസേജ് വാചകം പൂർത്തിയാക്കുക: \"See you ___...\"",
      "options": [
        "A) at…",
        "B) on time",
        "C) right now",
        "D) welcome to"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "In the Example Conversation, where does Person B live?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ ബി വ്യക്തി എവിടെയാണ് താമസിക്കുന്നത്?",
      "options": [
        "A) Kochi",
        "B) Perinthalmanna",
        "C) Chennai",
        "D) Dubai"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Who is Person B coming with in the example conversation?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ ബി വ്യക്തി ആരുടെ കൂടെയാണ് വരുന്നത്?",
      "options": [
        "A) Friend",
        "B) Colleague",
        "C) Brother",
        "D) Father"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Correct the common mistake: \"I live at Kerala.\"",
      "questionMl": "പൊതുവായ ഈ തെറ്റ് തിരുത്തുക: \"I live at Kerala.\"",
      "options": [
        "A) I live on Kerala.",
        "B) I live to Kerala.",
        "C) I am live in Kerala.",
        "D) I live in Kerala."
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Correct this mistake: \"I am going in school.\"",
      "questionMl": "ഈ തെറ്റ് തിരുത്തുക: \"I am going in school.\"",
      "options": [
        "A) I am going to school.",
        "B) I am going at school.",
        "C) I am going on school.",
        "D) I am going inside school."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Which word from Power Vocabulary means the space between sides or walls (e.g., inside vs outside)?",
      "questionMl": "ഉൾഭാഗം എന്ന അർത്ഥം വരുന്ന പവർ വൊക്കാബുലറിയിലെ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Outside",
        "B) Inside",
        "C) Between",
        "D) Beside"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Complete the Useful Sentence Pattern: \"A cup ___ coffee, please.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"A cup ___ coffee, please.\"",
      "options": [
        "A) with",
        "B) for",
        "C) of",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Which preposition is correctly used before days of the week, like Monday or Friday?",
      "questionMl": "ആഴ്ചയിലെ ദിവസങ്ങൾക്ക് മുമ്പ് ഏത് പ്രിപ്പോസിഷനാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) in",
        "B) at",
        "C) for",
        "D) on"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "What is the correct English translation for 'ഫോൺ മേശപ്പുറത്താണ്'?",
      "questionMl": "'ഫോൺ മേശപ്പുറത്താണ്' എന്നതിന്റെ ശരിയായ ഇംഗ്ലീഷ് വിവർത്തനം ഏതാണ്?",
      "options": [
        "A) The phone is on the table.",
        "B) The phone is in the table.",
        "C) The phone is at the table.",
        "D) The phone is under the table."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Fill in the blank: \"She arrived _____ the airport two hours before departure.\"",
      "questionMl": "എയർപോർട്ടിൽ എത്തിച്ചേർന്നു എന്ന് പറയാൻ ശരിയായ പ്രിപ്പോസിഷൻ:",
      "options": [
        "A) on",
        "B) at",
        "C) to",
        "D) of"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Which sentence correctly uses the definite article 'the' for a specific item?",
      "questionMl": "മേശപ്പുറത്തിരിക്കുന്ന നിർദ്ദിഷ്ട പുസ്തകം ആവശ്യപ്പെടുന്ന ശരിയായ വാക്യം:",
      "options": [
        "A) Please pass me an book on table.",
        "B) Please pass me a book on a table.",
        "C) Please pass me the book on the table.",
        "D) Please pass the me book."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "What is the correct plural form of the irregular noun 'child'?",
      "questionMl": "'child' എന്ന വാക്കിന്റെ ശരിയായ ബഹുവചന രൂപം ഏതാണ്?",
      "options": [
        "A) childs",
        "B) childrens",
        "C) childes",
        "D) children"
      ],
      "correctIndex": 3
    }
  ],
  "9": [
    {
      "id": 1,
      "question": "What is the correct structural formula for plural pronouns (I/You/We/They) in the Simple Present Tense?",
      "questionMl": "സിംപിൾ പ്രസന്റ് ടെൻസിൽ ബഹുവചന പ്രൊനൗണുകൾക്കുള്ള (I/You/We/They) ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Pronoun + Verb (V1)",
        "B) Pronoun + Verb + s/es",
        "C) Pronoun + am/is/are + Verb",
        "D) Pronoun + had + Verb"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Translate the everyday pattern: \"I wake up at 6 AM.\"",
      "questionMl": "“I wake up at 6 AM” എന്ന സാധാരണ വാചകം മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) ഞാൻ രാവിലെ 6 മണിക്ക് എഴുന്നേൽക്കുമായിരുന്നു.",
        "B) ഞാൻ രാവിലെ 6 മണിക്ക് എഴുന്നേൽക്കും.",
        "C) ഞാൻ വൈകിട്ട് 6 മണിക്ക് ഉറങ്ങും.",
        "D) ഞാൻ രാവിലെ എഴുന്നേൽക്കാറുണ്ട്."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Fill in the blank using the plural rule: \"They ___ football every Sunday.\"",
      "questionMl": "ബഹുവചന നിയമം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"They ___ football every Sunday.\"",
      "options": [
        "A) plays",
        "B) playing",
        "C) play",
        "D) played"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Apply the He/She/It rule to fill in the blank: \"She ___ coffee every morning.\"",
      "questionMl": "He/She/It നിയമം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"She ___ coffee every morning.\"",
      "options": [
        "A) drink",
        "B) drinking",
        "C) drank",
        "D) drinks"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Which sentence correctly describes a daily morning routine?",
      "questionMl": "രാവിലത്തെ ദിനചര്യയെക്കുറിച്ച് പറയുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I wake up at 6 AM and go for a morning walk.",
        "B) I wakes up at 6 AM and goes for a walk.",
        "C) I waking up at 6 AM every day.",
        "D) I am wake up at 6 AM."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Fill in the blank for a regular timetable action: \"The train ___ at 7 PM.\"",
      "questionMl": "ഒരു നിശ്ചിത സമയക്രമത്തിലുള്ള പ്രവർത്തനം സൂചിപ്പിക്കാൻ കോടി പൂരിപ്പിക്കുക: \"The train ___ at 7 PM.\"",
      "options": [
        "A) leave",
        "B) leaves",
        "C) leaving",
        "D) left"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Which vocabulary word means a plan that gives expected times for different things to happen?",
      "questionMl": "വ്യത്യസ്ത കാര്യങ്ങൾ നടക്കേണ്ട നിശ്ചിത സമയക്രമം നൽകുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Holiday",
        "B) Routine",
        "C) Schedule",
        "D) Memory"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Complete the Useful Sentence Pattern: \"I always ___ before work.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"I always ___ before work.\"",
      "options": [
        "A) wake up",
        "B) wash",
        "C) brush",
        "D) (Any base verb/V1 activity)"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Complete the negative sentence pattern: \"I never ___.\"",
      "questionMl": "ഈ നെഗറ്റീവ് വാക്യ ഘടന പൂർത്തിയാക്കുക: \"I never ___.\"",
      "options": [
        "A) (Any base verb/V1 action you never do)",
        "B) plays cricket",
        "C) goes to office",
        "D) works in Dubai"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Correct the common mistake: \"He work every day.\"",
      "questionMl": "പൊതുവായ ഈ തെറ്റ് തിരുത്തുക: \"He work every day.\"",
      "options": [
        "A) He working every day.",
        "B) He works every day.",
        "C) He goes to work every day.",
        "D) He don't work every day."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Fix the following error sentence: \"She study English.\"",
      "questionMl": "താഴെ പറയുന്ന തെറ്റായ വാക്യം തിരുത്തുക: \"She study English.\"",
      "options": [
        "A) She is study English.",
        "B) She studying English.",
        "C) She studies English.",
        "D) She go to study English."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Fix this plural pronoun mistake: \"I goes to work.\"",
      "questionMl": "ഈ പ്രൊനൗൺ തെറ്റ് തിരുത്തുക: \"I goes to work.\"",
      "options": [
        "A) I going to work.",
        "B) I am go to work.",
        "C) He goes to work.",
        "D) I go to work."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Fix this third-person plural mistake: \"They plays football.\"",
      "questionMl": "ഈ ബഹുവചന തെറ്റ് തിരുത്തുക: \"They plays football.\"",
      "options": [
        "A) They play football.",
        "B) They playing football.",
        "C) They is play football.",
        "D) She plays football."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the negative auxiliary mistake: \"He don’t drink tea.\"",
      "questionMl": "ഈ നെഗറ്റീവ് തെറ്റ് തിരുത്തുക: \"He don’t drink tea.\"",
      "options": [
        "A) He not drink tea.",
        "B) He doesn’t drink tea.",
        "C) He isn't drink tea.",
        "D) He don't drinks tea."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Which English Power Usage can be used to describe the final step in a routine sequence?",
      "questionMl": "ഒരു ദിനചര്യയുടെ അവസാന പടിയെ വിവരിക്കാൻ ഉപയോഗിക്കുന്ന പവർ യൂസേജ് ഏതാണ്?",
      "options": [
        "A) After that…",
        "B) Then…",
        "C) Finally…",
        "D) Usually…"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "In the Example Conversation, what does Person B do after breakfast?",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിൽ പ്രഭാതഭക്ഷണത്തിന് ശേഷം ബി വ്യക്തി എന്താണ് ചെയ്യുന്നത്?",
      "options": [
        "A) Practise English",
        "B) Go to sleep",
        "C) Play football",
        "D) Go to work."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "When does Person B state that they practise English?",
      "questionMl": "താൻ എപ്പോഴാണ് ഇംഗ്ലീഷ് പരിശീലിക്കുന്നത് എന്നാണ് ബി വ്യക്തി പറയുന്നത്?",
      "options": [
        "A) Every evening.",
        "B) Every morning",
        "C) Only on Sundays",
        "D) At 6 AM"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Fill in the blank with the correct simple present verb: \"My brother _____ in an IT company in Bangalore.\"",
      "questionMl": "എന്റെ സഹോദരൻ ബാംഗ്ലൂരിലെ ഒരു ഐടി കമ്പനിയിൽ ജോലി ചെയ്യുന്നു:",
      "options": [
        "A) work",
        "B) works",
        "C) working",
        "D) is work"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Which vocabulary word indicates an action that happens almost all the time?",
      "questionMl": "മിക്കപ്പോഴും നടക്കുന്ന ഒരു പ്രവർത്തിയെ സൂചിപ്പിക്കുന്ന വൊക്കാബുലറി വാക്ക് ഏതാണ്?",
      "options": [
        "A) Rarely",
        "B) Sometimes",
        "C) Always",
        "D) Never"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "What is the Malayalam translation for the adverb \"usually\"?",
      "questionMl": "“usually” എന്ന അഡ്വെർബിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഒരിക്കലും ഇല്ല",
        "B) അപൂർവ്വമായി",
        "C) എപ്പോഴും",
        "D) സാധാരണയായി (സാധാരണ)"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Complete the pattern: \"We practise English ___.\"",
      "questionMl": "ഈ ഘടന പൂർത്തിയാക്കുക: \"We practise English ___.\"",
      "options": [
        "A) every day.",
        "B) yesterday",
        "C) plays",
        "D) rarely completed"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Fill in the blank for an evening action: \"I finish my work at ___.\"",
      "questionMl": "വൈകുന്നേരത്തെ ഒരു പ്രവർത്തനം സൂചിപ്പിക്കാൻ കോടി പൂരിപ്പിക്കുക: \"I finish my work at ___.\"",
      "options": [
        "A) 6 AM",
        "B) 6 PM.",
        "C) morning",
        "D) weekend"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Which word represents the absolute absence of an action (0% frequency)?",
      "questionMl": "ഒരു പ്രവർത്തിയെ പൂർണ്ണമായും നിഷേധിക്കുന്ന വാക്ക് ഏതാണ് (0% ആവൃത്തി)?",
      "options": [
        "A) Often",
        "B) Sometimes",
        "C) Never",
        "D) Usually"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Fill in the blank using the correct verb form: \"My mother ___ delicious food.\"",
      "questionMl": "ശരിയായ വെർബ് രൂപം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"My mother ___ delicious food.\"",
      "options": [
        "A) cook",
        "B) cooking",
        "C) cooked",
        "D) cooks"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "How do you describe how you usually spend your weekends?",
      "questionMl": "വാരാന്ത്യങ്ങൾ കുടുംബത്തോടൊപ്പം ചെലവഴിക്കുന്നതിനെക്കുറിച്ച് പറയാൻ:",
      "options": [
        "A) On weekends, I usually relax at home with my family.",
        "B) On weekends, I am usually relax with family.",
        "C) On weekends, I usually relaxes with family.",
        "D) On weekends, I relaxing with my family."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Complete the routine sequence pattern: \"I wake up at 6 AM. ___ I brush my teeth.\"",
      "questionMl": "ദിനചര്യയുടെ ക്രമം പൂർത്തിയാക്കുക: \"I wake up at 6 AM. ___ I brush my teeth.\"",
      "options": [
        "A) Finally",
        "B) Then / After that",
        "C) Never",
        "D) Usually"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Which negative auxiliary verb is used with 'He' and 'She' in the simple present tense?",
      "questionMl": "സിമ്പിൾ പ്രസന്റ് ടെൻസിൽ 'He', 'She' എന്നിവയോടൊപ്പം ഉപയോഗിക്കുന്ന നെഗറ്റീവ് സഹായക്രിയ ഏതാണ്?",
      "options": [
        "A) don't",
        "B) isn't",
        "C) doesn't",
        "D) aren't"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "What does the Malayalam phrase \"ഞാൻ ബസിൽ ജോലിക്ക് പോകും\" mean in English?",
      "questionMl": "“ഞാൻ ബസിൽ ജോലിക്ക് പോകും” എന്ന മലയാളം വാചകത്തിന്റെ ഇംഗ്ലീഷ് രൂപം എന്താണ്?",
      "options": [
        "A) He goes to work by bus.",
        "B) They go to work by bus.",
        "C) I went to work by bus.",
        "D) I go to work by bus."
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Complete the sentence: \"She _____ drink coffee; she prefers green tea.\"",
      "questionMl": "അവൾ കാപ്പി കുടിക്കാറില്ല, ഗ്രീൻ ടീയാണ് ഇഷ്ടപ്പെടുന്നത്:",
      "options": [
        "A) doesn't",
        "B) don't",
        "C) not",
        "D) isn't"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"How often _____ you exercise each week?\"",
      "questionMl": "ആഴ്ചയിൽ എത്ര തവണ വ്യായാമം ചെയ്യാറുണ്ട് എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) does",
        "B) do",
        "C) are",
        "D) is"
      ],
      "correctIndex": 1
    }
  ],
  "10": [
    {
      "id": 1,
      "question": "Translate the definition into Malayalam: \"Verb എന്നാൽ ഒരു പ്രവർത്തിയെ (Action) സൂചിപ്പിക്കുന്ന വാക്കാണ്.\"",
      "questionMl": "“Verb എന്നാൽ ഒരു പ്രവർത്തിയെ (Action) സൂചിപ്പിക്കുന്ന വാക്കാണ്” എന്ന ഇംഗ്ലീഷ് നിർവ്വചനം ഏതാണ്?",
      "options": [
        "A) A verb is a decorative phrase.",
        "B) A verb shows time.",
        "C) A verb is an action word.",
        "D) A verb describes options."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Match the verb base form (V1) to its corresponding meaning: \"buy\"",
      "questionMl": "“buy” എന്ന വെർബ് രൂപത്തിന്റെ ശരിയായ മലയാളം അർത്ഥം കണ്ടെത്തുക:",
      "options": [
        "A) വിൽക്കുക",
        "B) പാചകം ചെയ്യുക",
        "C) യാത്ര ചെയ്യുക",
        "D) വാങ്ങുക"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "What is the V1 base form for the past verb \"went\" as shown in the Verb Forms chart?",
      "questionMl": "വെർബ് ഫോം ചാർട്ടിൽ കാണിച്ചിരിക്കുന്നത് പോലെ \"went\" എന്ന വെർബിന്റെ V1 രൂപം ഏതാണ്?",
      "options": [
        "A) go",
        "B) gone",
        "C) come",
        "D) wented"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Fill in the blank according to the plural subject rule: \"They ___ football.\"",
      "questionMl": "ബഹുവചന സബ്ജക്റ്റ് നിയമം അനുസരിച്ച് കോടി പൂരിപ്പിക്കുക: \"They ___ football.\"",
      "options": [
        "A) plays",
        "B) play",
        "C) playing",
        "D) played"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Apply the singular third-person rule to fill in the blank: \"She ___ English.\"",
      "questionMl": "ഏകവചന തേർഡ് പേഴ്‌സൺ നിയമം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"She ___ English.\"",
      "options": [
        "A) study",
        "B) studying",
        "C) studies",
        "D) studied"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Translate the expression of liking: \"I like coffee.\"",
      "questionMl": "“I like coffee” എന്ന വാചകം മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) എനിക്ക് കാപ്പി ഇഷ്ടമല്ല.",
        "B) അവൾക്ക് കാപ്പി ഇഷ്ടമാണ്.",
        "C) എനിക്ക് ചായയാണ് ഇഷ്ടം.",
        "D) എനിക്ക് കാപ്പി ഇഷ്ടമാണ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you correctly state a dislike for a singular third person (He/She)?",
      "questionMl": "ഒരു ഏകവചന തേർഡ് പേഴ്‌സണോട് (He/She) ബന്ധപ്പെടുത്തി ‘ഇഷ്ടമല്ല’ എന്ന് എങ്ങനെയാണ് ശരിയായി പറയുക?",
      "options": [
        "A) He doesn’t like tea.",
        "B) He don’t like tea.",
        "C) He not like tea.",
        "D) He isn't like tea."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Which phrase is used to express a structural choice or preference over something else?",
      "questionMl": "ഒരു കാര്യത്തിന് പകരം മറ്റൊരു കാര്യത്തോടുള്ള മുൻഗണന പ്രകടിപ്പിക്കാൻ ഉപയോഗിക്കുന്ന വാചകം ഏതാണ്?",
      "options": [
        "A) I like travel",
        "B) I prefer tea to coffee.",
        "C) I think it is important.",
        "D) I don't like waiting."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Translate the opinion structure: \"I think English is important.\"",
      "questionMl": "“I think English is important” എന്ന അഭിപ്രായ പ്രകടന വാചകം വിവർത്തനം ചെയ്യുക:",
      "options": [
        "A) ഞാൻ ഇംഗ്ലീഷ് പഠിക്കുന്നു.",
        "B) ഇംഗ്ലീഷ് പഠിക്കാൻ എനിക്ക് ആഗ്രഹമുണ്ട്.",
        "C) എന്റെ അഭിപ്രായത്തിൽ ഇംഗ്ലീഷ് പ്രധാനമാണ്.",
        "D) ഇംഗ്ലീഷ് എളുപ്പമാണെന്ന് ഞാൻ കരുതുന്നു."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Complete the belief pattern: \"I believe practice ___ confidence.\"",
      "questionMl": "ഈ വിശ്വാസ പ്രകടന ഘടന പൂർത്തിയാക്കുക: \"I believe practice ___ confidence.\"",
      "options": [
        "A) key to success",
        "B) interesting",
        "C) opinion",
        "D) improves"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which vocabulary word describes something that causes boredom or is uninteresting?",
      "questionMl": "വിരസത ഉണ്ടാക്കുന്ന അല്ലെങ്കിൽ താൽപ്പര്യമില്ലാത്ത ഒരു കാര്യത്തെ വിവരിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Boring",
        "B) Exciting",
        "C) Creative",
        "D) Amazing"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Correct the common mistake: \"She like music.\"",
      "questionMl": "പൊതുവായ ഈ തെറ്റ് തിരുത്തുക: \"She like music.\"",
      "options": [
        "A) She is like music.",
        "B) She likes music.",
        "C) She don't like music.",
        "D) She prefers music."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Fix the following error sentence: \"He don’t like coffee.\"",
      "questionMl": "താഴെ പറയുന്ന തെറ്റായ വാക്യം തിരുത്തുക: \"He don’t like coffee.\"",
      "options": [
        "A) He not like coffee.",
        "B) He don't likes coffee.",
        "C) He doesn’t like coffee.",
        "D) He isn't like coffee."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Fix this preference error pattern: \"I prefers tea.\"",
      "questionMl": "മുൻഗണന വ്യക്തമാക്കുന്നതിലെ ഈ തെറ്റ് തിരുത്തുക: \"I prefers tea.\"",
      "options": [
        "A) I am prefer tea.",
        "B) I prefering tea.",
        "C) He prefers tea.",
        "D) I prefer tea."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct this addition error: \"I am like football.\"",
      "questionMl": "ഈ തെറ്റ് തിരുത്തുക: \"I am like football.\"",
      "options": [
        "A) I like football.",
        "B) I liking football.",
        "C) I likes football.",
        "D) I do like football."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete the dialogue from the example conversation:",
      "questionMl": "മാതൃകാ സംഭാഷണത്തിലെ ഭാഗം പൂർത്തിയാക്കുക:",
      "options": [
        "A) like",
        "B) prefer",
        "C) think",
        "D) believe"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "In the same example conversation, what is Person B's opinion about learning English?",
      "questionMl": "അതേ മാതൃകാ സംഭാഷണത്തിൽ, ഇംഗ്ലീഷ് പഠിക്കുന്നതിനെക്കുറിച്ച് ബി വ്യക്തിയുടെ അഭിപ്രായം എന്താണ്?",
      "options": [
        "A) It is very boring",
        "B) It is healthy",
        "C) It is very important.",
        "D) It is comfortable"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Which of the following is an \"English Power Usage\" used to express agreement with an opinion?",
      "questionMl": "ഒരു അഭിപ്രായത്തോട് യോജിക്കുന്നു എന്ന് പ്രകടിപ്പിക്കാൻ ഉപയോഗിക്കുന്ന പവർ യൂസേജ് ഏതാണ്?",
      "options": [
        "A) I disagree.",
        "B) That’s my opinion.",
        "C) My favourite…",
        "D) I agree."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "What does the vocabulary word \"delicious\" relate to?",
      "questionMl": "“delicious” എന്ന വൊക്കാബുലറി വാക്ക് ഏതുമായി ബന്ധപ്പെട്ടിരിക്കുന്നു?",
      "options": [
        "A) Highly pleasant taste in food.",
        "B) High speed travel",
        "C) An opinion on grammar charts",
        "D) A physical workspace structure"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Complete the Useful Sentence Pattern: \"My favourite hobby is ___.\"",
      "questionMl": "ഉപയോഗപ്രദമായ ഈ വാക്യ ഘടന പൂർത്തിയാക്കുക: \"My favourite hobby is ___.\"",
      "options": [
        "A) travel",
        "B) reading.",
        "C) think",
        "D) important"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Translate the Malayalam phrase: \"പരിശീലനം ആത്മവിശ്വാസം വർധിപ്പിക്കുമെന്ന് ഞാൻ വിശ്വസിക്കുന്നു.\"",
      "questionMl": "“പരിശീലനം ആത്മവിശ്വാസം വർധിപ്പിക്കുമെന്ന് ഞാൻ വിശ്വസിക്കുന്നു” എന്ന വാചകത്തിന്റെ ഇംഗ്ലീഷ് രൂപം എന്താണ്?",
      "options": [
        "A) I think practice is key to success.",
        "B) In my opinion, speaking is important.",
        "C) I believe practice improves confidence.",
        "D) My favourite hobby is reading."
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Which verb from the Important Verbs list means to move from one place to another, usually far away?",
      "questionMl": "പ്രധാന വെർബുകളുടെ ലിസ്റ്റിൽ ഉൾപ്പെടുന്നതും ഒരു സ്ഥലത്തുനിന്ന് മറ്റൊരു സ്ഥലത്തേക്ക് യാത്ര ചെയ്യുക എന്ന അർത്ഥം വരുന്നതുമായ വാക്ക് ഏതാണ്?",
      "options": [
        "A) drive",
        "B) play",
        "C) cook",
        "D) travel"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Fill in the blank using the correct verb form: \"My father ___ a car.\"",
      "questionMl": "ശരിയായ വെർബ് രൂപം ഉപയോഗിച്ച് കോടി പൂരിപ്പിക്കുക: \"My father ___ a car.\"",
      "options": [
        "A) drives",
        "B) drive",
        "C) driving",
        "D) droven"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "How do you politely express your personal opinion during a group discussion?",
      "questionMl": "ഒരു ചർച്ചയിൽ സ്വന്തം അഭിപ്രായം മാന്യമായി വ്യക്തമാക്കാൻ ഏത് വാക്യമാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) In mine opinion, online learning offer.",
        "B) In my opinion, online learning offers great flexibility.",
        "C) To my opinion, online learning is flex.",
        "D) For my opinion, online learning offer."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Complete the opinion phrase: \"In my ___, speaking is more important than memorizing.\"",
      "questionMl": "ഈ അഭിപ്രായ പ്രകടന വാചകം പൂർത്തിയാക്കുക: \"In my ___, speaking is more important than memorizing.\"",
      "options": [
        "A) believe",
        "B) recommendation",
        "C) opinion",
        "D) favourite"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "What is the base form (V1) for the verb meaning \"സംസാരിക്കുക\"?",
      "questionMl": "“സംസാരിക്കുക” എന്ന് അർത്ഥം വരുന്ന വെർബിന്റെ V1 (ബേസ് ഫോം) ഏതാണ്?",
      "options": [
        "A) spoke",
        "B) spoken",
        "C) speaking",
        "D) speak"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Which of the following sentences represents an accurate opinion structure?",
      "questionMl": "താഴെ പറയുന്നവയിൽ ശരിയായ ഒരു അഭിപ്രായ പ്രകടന വാചകം ഏതാണ്?",
      "options": [
        "A) I think this course is useful.",
        "B) I am think this course is useful.",
        "C) I thinks this course is useful.",
        "D) This course are useful in my opinion."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: \"I _____ reading non-fiction books to watching TV.\"",
      "questionMl": "ടിവി കാണുന്നതിനേക്കാൾ ഞാൻ ഇഷ്ടപ്പെടുന്നത് പുസ്തകം വായിക്കാനാണ്:",
      "options": [
        "A) prefers",
        "B) prefer",
        "C) preferring",
        "D) am prefer"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "How do you express that you really like a particular South Indian dish?",
      "questionMl": "ദോശ കഴിക്കാൻ തനിക്ക് വളരെ ഇഷ്ടമാണ് എന്ന് പറയാൻ:",
      "options": [
        "A) I really loves eating hot dosa.",
        "B) I loving hot dosa with chutney.",
        "C) I really love eating hot dosa with coconut chutney.",
        "D) Mine love is hot dosa."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"She _____ that teamwork is the key to business success.\"",
      "questionMl": "ടീം വർക്കാണ് വിജയത്തിന്റെ രഹസ്യമെന്ന് അവൾ വിശ്വസിക്കുന്നു:",
      "options": [
        "A) believe",
        "B) believing",
        "C) is believe",
        "D) believes"
      ],
      "correctIndex": 3
    }
  ],
  "11": [
    {
      "id": 1,
      "question": "Which sentence is grammatically correct?",
      "questionMl": "\"അവൻ ഇവിടെ ജോലി ചെയ്യുമോ?\" എന്ന് ചോദിക്കാൻ 'Does' വന്നുകഴിഞ്ഞാൽ ക്രിയയുടെ കൂടെ 's' ചേർക്കരുത്.2",
      "options": [
        "A) Does he work here?",
        "B) Does he works here?",
        "C) Do he work here?",
        "D) He working here?"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct statement:",
      "questionMl": "'She' എന്ന ഏകവചനത്തിനൊപ്പം ചോദ്യം ചോദിക്കാൻ 'Does' ഉപയോഗിക്കണം, കൂടാതെ ക്രിയ 'speak' എന്ന് ബേസ് ഫോം ആയിരിക്കണം.2",
      "options": [
        "A) Do she speak English?",
        "B) Does she speak English?",
        "C) Does she speaks English?",
        "D) She speaks English?"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Identify the mistake: \"Where you live?\"",
      "questionMl": "\"നിങ്ങൾ എവിടെയാണ് താമസിക്കുന്നത്?\" എന്ന് കൃത്യമായി ചോദിക്കാൻ 'do' ആവശ്യമാണ്.2",
      "options": [
        "A) Where does you live?",
        "B) Where you are live?",
        "C) Where do you live?",
        "D) Where live you?"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "What is the correct question for \"I work in a hospital\"?",
      "questionMl": "\"നിങ്ങൾ എന്ത് ജോലി ചെയ്യുന്നു?\" എന്ന് ചോദിക്കാനുള്ള ശരിയായ രൂപം.2",
      "options": [
        "A) What does you do?",
        "B) What you do?",
        "C) Where do you do?",
        "D) What do you do?"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Fill in the blank: \"He never ______ tea.\"",
      "questionMl": "'He' എന്ന സബ്ജക്റ്റ് വരുമ്പോൾ സാധാരണ പ്രസ്താവനകളിൽ ക്രിയയുടെ കൂടെ 's' അല്ലെങ്കിൽ 'es' ചേർക്കണം (He never drinks tea - അവൻ ഒരിക്കലും കള്ളം പറയില്ല/ചായ കുടിക്കില്ല).2",
      "options": [
        "A) drinks",
        "B) drink",
        "C) drinking",
        "D) does drink"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What does \"Always\" mean in Malayalam?",
      "questionMl": "Always എന്നാൽ എപ്പോഴും.2",
      "options": [
        "A) സാധാരണ",
        "B) എപ്പോഴും",
        "C) പലപ്പോഴും",
        "D) ചിലപ്പോൾ"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Choose the correct translation: \"ഞാൻ സാധാരണ ചായ കുടിക്കും.\"",
      "questionMl": "'Usually' എന്നാൽ 'സാധാരണ' എന്നാണ് അർത്ഥം.2",
      "options": [
        "A) I always drink tea.",
        "B) I often drink tea.",
        "C) I usually drink tea.",
        "D) I sometimes drink tea."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Complete the sentence: \"I ______ practise English.\" (ഞാൻ പലപ്പോഴും ഇംഗ്ലീഷ് പരിശീലിക്കും.)",
      "questionMl": "'Often' എന്നാൽ പലപ്പോഴും.2",
      "options": [
        "A) never",
        "B) rarely",
        "C) always",
        "D) often"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Which word means \"അപൂർവ്വമായി\"?",
      "questionMl": "Rarely എന്നാൽ അപൂർവ്വമായി.2",
      "options": [
        "A) Rarely",
        "B) Sometimes",
        "C) Usually",
        "D) Never"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Complete the response: \"Do you practise English every day?\" -> \"Yes, ______.\"",
      "questionMl": "'Do' ഉപയോഗിച്ച് ചോദിക്കുന്ന ചോദ്യങ്ങൾക്ക് അതെ എന്ന് പറയാൻ 'Yes, I do' എന്ന് ഉപയോഗിക്കാം.2",
      "options": [
        "A) I practise",
        "B) I do",
        "C) I am",
        "D) I does"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "\"Does your father work abroad?\" - What is the Malayalam meaning?",
      "questionMl": "വിദേശത്ത് ജോലി ചെയ്യുമോ എന്ന് ചോദിക്കുന്ന ലളിതമായ ചോദ്യം.2",
      "options": [
        "A) നിങ്ങളുടെ അച്ഛൻ എവിടെയാണ് ജോലി ചെയ്യുന്നത്?",
        "B) നിങ്ങളുടെ അച്ഛൻ ജോലി ചെയ്യുകയാണോ?",
        "C) നിങ്ങളുടെ അച്ഛൻ വിദേശത്ത് ജോലി ചെയ്യുമോ?",
        "D) അച്ഛൻ എപ്പോഴാണ് വരുന്നത്?"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Fill in the blank: \"______ language do you speak at home?\"",
      "questionMl": "\"നിങ്ങൾ വീട്ടിൽ ഏത് ഭാഷയാണ് സംസാരിക്കുന്നത്?\" എന്നതിൽ 'ഏത്' എന്നതിന് 'Which' ഉപയോഗിക്കുന്നു.2",
      "options": [
        "A) Who",
        "B) Whose",
        "C) Where",
        "D) Which"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the correct WH-word: \"______ do you wake up?\" (നിങ്ങൾ എപ്പോഴാണ് എഴുന്നേൽക്കുന്നത്?)",
      "questionMl": "'എപ്പോൾ' എന്ന് ചോദിക്കാൻ 'When' ഉപയോഗിക്കണം.2",
      "options": [
        "A) When",
        "B) What",
        "C) Where",
        "D) Why"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "What is the correct structure for a question with 'They'?",
      "questionMl": "'They' ബഹുവചനം ആയതുകൊണ്ട് 'Do' ഉപയോഗിക്കണം.2",
      "options": [
        "A) Does they play football?",
        "B) Do they play football?",
        "C) Are they play football?",
        "D) Do they plays football?"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "What does the power usage \"Tell me more\" mean?",
      "questionMl": "Tell me more എന്നാൽ കൂടുതൽ വിവരങ്ങൾ പങ്കുവെക്കാൻ ആവശ്യപ്പെടുന്നത്.2",
      "options": [
        "A) അത് താല്പര്യമുണർത്തുന്നതാണ്.",
        "B) എനിക്ക് മനസ്സിലായി.",
        "C) എന്നോട് കൂടുതൽ പറയൂ.",
        "D) ശരി."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "What is the English vocabulary word for \"ദിനചര്യ\"?",
      "questionMl": "Routine എന്നാൽ ദിനചര്യ.2",
      "options": [
        "A) Conversation",
        "B) Confidence",
        "C) Interview",
        "D) Routine"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Translate to English: \"നിങ്ങൾ എങ്ങനെയാണ് ജോലിക്ക് പോകുന്നത്?\"",
      "questionMl": "'എങ്ങനെ' എന്നതിന് 'How' ഉപയോഗിക്കുന്നു.2",
      "options": [
        "A) How do you travel to work?",
        "B) Where do you travel to work?",
        "C) When do you travel to work?",
        "D) Why do you travel to work?"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Choose the negative answer for: \"Does she study every day?\"",
      "questionMl": "'Does' ചോദ്യത്തിന്റെ നെഗറ്റീവ് ഷോർട്ട് ആൻസർ 'No, she doesn't' എന്നാണ്.2",
      "options": [
        "A) No, she don't.",
        "B) No, she doesn't.",
        "C) No, she isn't.",
        "D) No, she not."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "\"Whose book do you use?\" - What is the Malayalam meaning?",
      "questionMl": "'Whose' എന്നാൽ 'ആരുടെ' എന്നാണ് അർത്ഥം.2",
      "options": [
        "A) നിങ്ങൾ ഏത് പുസ്തകമാണ് ഉപയോഗിക്കുന്നത്?",
        "B) നിങ്ങൾ എവിടെയാണ് പുസ്തകം വെച്ചത്?",
        "C) നിങ്ങൾ ആരുടെ പുസ്തകമാണ് ഉപയോഗിക്കുന്നത്?",
        "D) ആരാണ് ഈ പുസ്തകം തന്നത്?"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Fill in the blank: \"We usually ______ at night.\"",
      "questionMl": "'We' എന്ന സബ്ജക്റ്റിനൊപ്പം ക്രിയയുടെ ബേസ് ഫോം (study) ഉപയോഗിക്കുന്നു.2",
      "options": [
        "A) studies",
        "B) studying",
        "C) studied",
        "D) study"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Which word matches with \"ഒരിക്കലും ഇല്ല\"?",
      "questionMl": "Never എന്നാൽ ഒരിക്കലും ഇല്ല.2",
      "options": [
        "A) Never",
        "B) Rarely",
        "C) Sometimes",
        "D) Often"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Select the correct vocabulary for \"ആശയവിനിമയം\":",
      "questionMl": "Communication എന്നാൽ ആശയവിനിമയം.2",
      "options": [
        "A) Practice",
        "B) Communication",
        "C) Schedule",
        "D) Habit"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What is the meaning of \"That’s interesting\"?",
      "questionMl": "സംഭാഷണങ്ങളിൽ താല്പര്യം പ്രകടിപ്പിക്കാൻ ഉപയോഗിക്കുന്ന ശൈലി.2",
      "options": [
        "A) തീർച്ചയായും.",
        "B) നന്ദി.",
        "C) അത് വളരെ കൗതുകകരമാണ് / താല്പര്യമുണർത്തുന്നതാണ്.",
        "D) എനിക്ക് മനസ്സിലായി."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "\"Who teaches you English?\" - What is the translation?",
      "questionMl": "'Who' എന്നാൽ 'ആര്'.2",
      "options": [
        "A) നിങ്ങൾ എപ്പോഴാണ് ഇംഗ്ലീഷ് പഠിക്കുന്നത്?",
        "B) നിങ്ങൾ എങ്ങനെയാണ് ഇംഗ്ലീഷ് പഠിക്കുന്നത്?",
        "C) നിങ്ങൾ എവിടെയാണ് ഇംഗ്ലീഷ് പഠിക്കുന്നത്?",
        "D) നിങ്ങളെ ഇംഗ്ലീഷ് പഠിപ്പിക്കുന്നത് ആരാണ്?"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the statement: \"She always ______ on time.\"",
      "questionMl": "ഏകവചനമായ 'She' ഒപ്പം 'comes' വരുന്നു.2",
      "options": [
        "A) comes",
        "B) come",
        "C) coming",
        "D) does come"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"______ do you live?\" - \"I live in Malappuram.\"",
      "questionMl": "സ്ഥലത്തെക്കുറിച്ച് ചോദിക്കാൻ 'Where' ഉപയോഗിക്കുന്നു.2",
      "options": [
        "A) What",
        "B) Where",
        "C) When",
        "D) How"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Find the incorrect sentence structure:",
      "questionMl": "'You' വിനൊപ്പം 'does' ഉപയോഗിക്കാൻ പാടില്ല, 'do' ആണ് വരേണ്ടത്.2",
      "options": [
        "A) I always wake up early.",
        "B) I never miss my class.",
        "C) What does you do?",
        "D) Do you work on Sundays?"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "What does \"Habit\" mean?",
      "questionMl": "Habit എന്നാൽ ശീലം.2",
      "options": [
        "A) ദിനചര്യ",
        "B) സംഭാഷണം",
        "C) ആത്മവിശ്വാസം",
        "D) ശീലം"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "\"I see.\" in a conversation expression means:",
      "questionMl": "മറ്റൊരാൾ പറയുന്നത് കേട്ട് മനസ്സിലായി എന്ന് കാണിക്കുന്ന പ്രയോഗം.2",
      "options": [
        "A) എനിക്ക് മനസ്സിലായി / ഓ അങ്ങനെയാണോ.",
        "B) ഞാൻ കാണുന്നുണ്ട്.",
        "C) ശരി പോകാം.",
        "D) ഇതൊരു നല്ല ചോദ്യമാണ്."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Correct this question: \"Do you speaks English?\"",
      "questionMl": "'You' വിനൊപ്പം 'Do' വരണം, ക്രിയയിൽ 's' വരാൻ പാടില്ല.2",
      "options": [
        "A) Does you speak English?",
        "B) Do you speak English?",
        "C) Are you speak English?",
        "D) You speaking English?"
      ],
      "correctIndex": 1
    }
  ],
  "12": [
    {
      "id": 1,
      "question": "What is the basic structure of the Present Continuous Tense?",
      "questionMl": "നിലവിൽ നടക്കുന്ന കാര്യങ്ങൾ പറയാനുള്ള വാചകഘടന.3",
      "options": [
        "A) Subject + V1 + s/es",
        "B) Subject + have/has + V3",
        "C) Subject + am/is/are + Verb + ing",
        "D) Subject + do/does + V1"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Which sentence represents an action happening right now?",
      "questionMl": "\"ഞാൻ ഇംഗ്ലീഷ് പഠിച്ചുകൊണ്ടിരിക്കുന്നു\".3",
      "options": [
        "A) I study English every day.",
        "B) I studied English yesterday.",
        "C) I always study English.",
        "D) I am studying English."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Correct the mistake: \"I studying English.\"",
      "questionMl": "'I' എന്നതിനൊപ്പം എപ്പോഴും 'am' ചേർക്കണം.3",
      "options": [
        "A) I am studying English.",
        "B) I is studying English.",
        "C) I are studying English.",
        "D) I be studying English."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Complete the sentence: \"He ______ working now.\"",
      "questionMl": "'He' എന്ന ഏകവചനത്തിനൊപ്പം 'is' ഉപയോഗിക്കുന്നു.3",
      "options": [
        "A) are",
        "B) is",
        "C) am",
        "D) be"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Choose the correct form: \"They ______ playing football.\"",
      "questionMl": "'They' ബഹുവചനമായതിനാൽ 'are' വരുന്നു.3",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) was"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "What is the Malayalam translation for \"She is cooking dinner.\"?",
      "questionMl": "Dinner എന്നാൽ രാത്രിയിലെ ഭക്ഷണം.3",
      "options": [
        "A) അവൾ ഉച്ചഭക്ഷണം കഴിക്കുകയാണ്.",
        "B) അവൾ ഭക്ഷണം വിളമ്പുകയാണ്.",
        "C) അവൾ എപ്പോഴും പാചകം ചെയ്യും.",
        "D) അവൾ രാത്രി ഭക്ഷണം പാചകം ചെയ്യുകയാണ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Complete the sentence: \"The baby ______ sleeping.\"",
      "questionMl": "കുഞ്ഞ് (ഏകവചനം) ഉറങ്ങുകയാണ്.3",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) being"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Fill in the blank: \"We are ______ for the bus.\"",
      "questionMl": "തുടർച്ചയായ പ്രവർത്തിയെ കാണിക്കാൻ verb + ing വേണം.3",
      "options": [
        "A) wait",
        "B) waiting",
        "C) waited",
        "D) waits"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Identify the incorrect sentence:",
      "questionMl": "'They' എന്നതിനൊപ്പം 'is' ഉപയോഗിച്ചത് തെറ്റാണ്, 'are' ആണ് വരേണ്ടത്.3",
      "options": [
        "A) He is driving a car.",
        "B) We are learning English.",
        "C) They is playing.",
        "D) I am watching a movie."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate to English: \"ഞാൻ എന്റെ സുഹൃത്തിനോട് സംസാരിക്കുകയാണ്.\"",
      "questionMl": "ഇപ്പോൾ സംസാരിച്ചുകൊണ്ടിരിക്കുന്നതിനാൽ Present Continuous രൂപം.3",
      "options": [
        "A) I talk to my friend.",
        "B) I speaking to my friend.",
        "C) I was talking to my friend.",
        "D) I am talking to my friend."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "What is the \"ing\" form of the verb \"drive\"?",
      "questionMl": "'drive' എന്ന വാക്കിന്റെ ഒടുവിലെ 'e' ഒഴിവാക്കിയാണ് 'ing' ചേർക്കുന്നത്.3",
      "options": [
        "A) driving",
        "B) driveing",
        "C) drivesing",
        "D) droving"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Which word means \"നിലവിൽ\" or \"ഇപ്പോൾ\"?",
      "questionMl": "Currently എന്നാൽ നിലവിൽ.3",
      "options": [
        "A) Yesterday",
        "B) Currently",
        "C) Always",
        "D) Rarely"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Fill in the blank: \"They are travelling ______ Kochi.\"",
      "questionMl": "കൊച്ചിയിലേക്ക് യാത്ര ചെയ്യുകയാണ് എന്ന് പറയാൻ 'to' ഉപയോഗിക്കുന്നു.3",
      "options": [
        "A) at",
        "B) on",
        "C) to",
        "D) in"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "What does the power usage \"Hold on…\" mean?",
      "questionMl": "Hold on എന്നാൽ അല്പം കാത്തുനിൽക്കാൻ ആവശ്യപ്പെടുന്നത്.3",
      "options": [
        "A) ഞാൻ വന്നുകൊണ്ടിരിക്കുകയാണ്.",
        "B) എനിക്ക് തിരക്കാണ്.",
        "C) ഞാൻ അതിൽ വർക്ക് ചെയ്യുകയാണ്.",
        "D) അല്പം കാത്തിരിക്കൂ / ഒരു മിനിറ്റ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Translate to English: \"അവർ ഉച്ചഭക്ഷണം കഴിക്കുകയാണ്.\"",
      "questionMl": "Lunch എന്നാൽ ഉച്ചഭക്ഷണം.3",
      "options": [
        "A) They are having lunch.",
        "B) They are cooking lunch.",
        "C) They have lunch.",
        "D) They are eating dinner."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "What is the correct short answer to: \"Is your brother working now?\"",
      "questionMl": "'Is' വെച്ച് ചോദിച്ച ചോദ്യത്തിന് 'Yes, he is' എന്ന് മറുപടി നൽകാം.3",
      "options": [
        "A) Yes, he does.",
        "B) Yes, he is.",
        "C) Yes, he working.",
        "D) Yes, he am."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "\"Give me a moment.\" means:",
      "questionMl": "സമയത്തിനായി അപേക്ഷിക്കുന്ന പ്രയോഗം.3",
      "options": [
        "A) എനിക്ക് ഒരു അവസരം തരൂ.",
        "B) എനിക്ക് വഴി തരൂ.",
        "C) എനിക്ക് ഒരു നിമിഷം തരൂ.",
        "D) ഞാൻ പോവുകയാണ്."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "\"We ______ practising together.\"",
      "questionMl": "We എന്നതിനൊപ്പം 'are' വരുന്നു.3",
      "options": [
        "A) am",
        "B) is",
        "C) be",
        "D) are"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Find the mistake: \"She cooking now.\"",
      "questionMl": "തുണക്രിയയായ 'is' ഇവിടെ വിട്ടുപോയിരിക്കുന്നു.3",
      "options": [
        "A) She is cooking now.",
        "B) She are cooking now.",
        "C) She am cooking now.",
        "D) She does cooking now."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "\"Right now…\" is best translated as:",
      "questionMl": "ഇപ്പോൾ നടന്നുകൊണ്ടിരിക്കുന്ന കാര്യങ്ങൾക്ക് ഊന്നൽ നൽകാൻ.3",
      "options": [
        "A) ശരിയായ വശത്ത്",
        "B) ഈ നിമിഷത്തിൽ / ഇപ്പോൾ തന്നെ",
        "C) പിന്നീട്",
        "D) എപ്പോഴും"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "What is the vocabulary word for \"കാത്തിരിക്കുന്നു\"?",
      "questionMl": "Waiting എന്നാൽ കാത്തിരിക്കുന്നു.3",
      "options": [
        "A) Learning",
        "B) Travelling",
        "C) Waiting",
        "D) Speaking"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "\"He is talking on the phone.\" - What is the Malayalam meaning?",
      "questionMl": "നിലവിൽ ഫോണിൽ സംസാരിച്ചുകൊണ്ടിരിക്കുന്നു.3",
      "options": [
        "A) അവൻ ഫോൺ വിളിക്കുകയായിരുന്നു.",
        "B) അവൻ ഫോൺ വാങ്ങുകയാണ്.",
        "C) അവൻ ഫോൺ തിരയുകയാണ്.",
        "D) അവൻ ഫോണിൽ സംസാരിക്കുകയാണ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Fill in the blank: \"I am ______ a movie.\"",
      "questionMl": "സിനിമ കണ്ടുകൊണ്ടിരിക്കുകയാണ്.3",
      "options": [
        "A) watching",
        "B) watch",
        "C) watches",
        "D) watched"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correctly spelled \"-ing\" word for \"write\":",
      "questionMl": "'write' എന്ന വാക്ക് 'writing' ആയി മാറുന്നു.3",
      "options": [
        "A) writeing",
        "B) writing",
        "C) writting",
        "D) writesing"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What does \"I’m on my way.\" mean?",
      "questionMl": "യാത്രയിലാണ് എന്ന് അറിയിക്കാൻ ഉപയോഗിക്കുന്ന കോമൺ പ്രയോഗം.3",
      "options": [
        "A) ഞാൻ എന്റെ സ്വന്തം വഴിയിലാണ്.",
        "B) എനിക്ക് വഴി അറിയാം.",
        "C) ഞാൻ വന്നുകൊണ്ടിരിക്കുകയാണ് / വഴിയിലാണ്.",
        "D) ഞാൻ തിരക്കിലാണ്."
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "\"You are speaking very well.\" - What does this sentence convey?",
      "questionMl": "മറുപക്ഷത്തുള്ളയാളുടെ നിലവിലെ സംസാരത്തെ അഭിനന്ദിക്കുന്നു.3",
      "options": [
        "A) നിങ്ങൾ സംസാരിക്കണം.",
        "B) നിങ്ങൾ നന്നായി സംസാരിക്കാറില്ല.",
        "C) നിങ്ങൾ സംസാരിക്കാൻ പഠിക്കുകയാണ്.",
        "D) നിങ്ങൾ വളരെ നന്നായി സംസാരിക്കുകയാണ്."
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete: \"I am learning ______ words.\"",
      "questionMl": "\"ഞാൻ പുതിയ വാക്കുകൾ പഠിക്കുകയാണ്.\"3",
      "options": [
        "A) new",
        "B) now",
        "C) currently",
        "D) right now"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Correct this sentence: \"We am learning English.\"",
      "questionMl": "'We' വിനൊപ്പം 'are' ആണ് ഉപയോഗിക്കേണ്ടത്.3",
      "options": [
        "A) We is learning English.",
        "B) We are learning English.",
        "C) We be learning English.",
        "D) We learning English."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "\"I am drinking coffee.\" - What is the action time?",
      "questionMl": "പ്രസന്റ് കണ്ടിന്യൂവസ് തത്സമയ പ്രവർത്തനങ്ങളെ സൂചിപ്പിക്കുന്നു.3",
      "options": [
        "A) Past time",
        "B) Every day habit",
        "C) Right now (ഇപ്പോൾ)",
        "D) Future plan"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "\"At the moment…\" has the same meaning as:",
      "questionMl": "At the moment എന്നാൽ ഈ സമയത്ത് / ഇപ്പോൾ.3",
      "options": [
        "A) Always",
        "B) Sometimes",
        "C) Never",
        "D) Right now / Currently"
      ],
      "correctIndex": 3
    }
  ],
  "13": [
    {
      "id": 1,
      "question": "What is the sentence structure for a negative sentence in Present Continuous?",
      "questionMl": "ഇല്ല എന്ന് നെഗറ്റീവ് ആയി പറയാൻ 'not' ചേർക്കുന്ന രീതി.1",
      "options": [
        "A) Subject + am/is/are + not + Verb+ing",
        "B) Subject + not + V1",
        "C) Subject + do/does + not + V1",
        "D) Subject + am/is/are + Verb+ing + not"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct negative sentence:",
      "questionMl": "\"അവൻ ഇന്ന് ജോലി ചെയ്യുന്നില്ല\".1",
      "options": [
        "A) He not working today.",
        "B) He isn’t working today.",
        "C) He aren’t working today.",
        "D) He doesn’t working today."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Identify the mistake: \"They aren’t comes.\"",
      "questionMl": "നെഗറ്റീവ് ആക്കുമ്പോഴും ക്രിയ 'ing' രൂപത്തിൽ തന്നെ ആയിരിക്കണം.1",
      "options": [
        "A) They aren’t come.",
        "B) They isn’t coming.",
        "C) They aren’t coming.",
        "D) They don’t coming."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "What is the translation for \"ഞങ്ങൾ കാത്തിരിക്കുന്നില്ല.\"?",
      "questionMl": "'aren't waiting' എന്നാൽ കാത്തിരിക്കുന്നില്ല.1",
      "options": [
        "A) We are waiting.",
        "B) We don’t wait.",
        "C) We not waiting.",
        "D) We aren’t waiting."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Complete the question: \"______ you studying now?\"",
      "questionMl": "'You' വിനോട് ചോദ്യം ചോദിക്കാൻ 'Are' മുന്നിൽ ചേർക്കണം.1",
      "options": [
        "A) Are",
        "B) Is",
        "C) Am",
        "D) Do"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Correct the short answer: \"Are you coming? — Yes, I coming.\"",
      "questionMl": "കൃത്യമായ മറുപടി 'Yes, I am' എന്നാണ്.1",
      "options": [
        "A) Yes, I do.",
        "B) Yes, I am.",
        "C) Yes, I coming.",
        "D) Yes, I are."
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "\"Is she cooking?\" - What is the Malayalam meaning?",
      "questionMl": "ഇതൊരു Yes/No ചോദ്യമാണ് (ചെയ്യുകയാണോ?).1",
      "options": [
        "A) അവൾ എന്താണ് പാചകം ചെയ്യുന്നത്?",
        "B) അവൾ പാചകം ചെയ്യാറുണ്ടോ?",
        "C) അവൾ പാചകം ചെയ്യുകയാണോ?",
        "D) അവൾ എപ്പോഴാണ് പാചകം ചെയ്യുന്നത്?"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct WH-question for: \"നിങ്ങൾ എന്താണ് ചെയ്യുന്നത്?\"",
      "questionMl": "'എന്ത്' എന്നതിന് 'What' ഉപയോഗിക്കുന്നു.1",
      "options": [
        "A) Where are you doing?",
        "B) Why are you doing?",
        "C) When are you doing?",
        "D) What are you doing?"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: \"______ is calling you?\" (ആരാണ് നിങ്ങളെ വിളിക്കുന്നത്?)",
      "questionMl": "വ്യക്തിയെക്കുറിച്ച് ചോദിക്കാൻ 'Who' ഉപയോഗിക്കുന്നു.1",
      "options": [
        "A) Who",
        "B) What",
        "C) Whose",
        "D) Which"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "\"Where is he working?\" translates to:",
      "questionMl": "'Where' എന്നാൽ എവിടെ.1",
      "options": [
        "A) അവൻ എപ്പോഴാണ് ജോലി ചെയ്യുന്നത്?",
        "B) അവൻ എവിടെയാണ് ജോലി ചെയ്യുന്നത്?",
        "C) അവൻ എങ്ങനെയാണ് ജോലി ചെയ്യുന്നത്?",
        "D) അവൻ എന്ത് ജോലിയാണ് ചെയ്യുന്നത്?"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Fill in the blank: \"______ book are you reading?\" (നിങ്ങൾ ഏത് പുസ്തകമാണ് വായിക്കുന്നത്?)",
      "questionMl": "'ഏത്' എന്ന് ചോദിക്കാൻ 'Which' എന്ന് ഉപയോഗിക്കാം.1",
      "options": [
        "A) Whose",
        "B) Whom",
        "C) Which",
        "D) What"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "\"Whose laptop are you using?\" - What does \"Whose\" mean?",
      "questionMl": "Whose എന്നാൽ ആരുടെ.1",
      "options": [
        "A) ഏത്",
        "B) ആരെയാണ്",
        "C) എന്തുകൊണ്ട്",
        "D) ആരുടെ"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Present Continuous Tense can be used for \"Future Arrangements\". Which sentence shows a future plan?",
      "questionMl": "'tomorrow' (നാളെ) എന്ന് വ്യക്തമാക്കിയ തിട്ടപ്പെടുത്തിയ ഭാവി കാര്യം.1",
      "options": [
        "A) I am meeting my manager tomorrow.",
        "B) I am sleeping now.",
        "C) He isn’t working today.",
        "D) Why are you laughing?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Translate to English: \"ഞങ്ങൾ അടുത്ത ആഴ്ച യാത്ര പോകുകയാണ്.\"",
      "questionMl": "പ്ലാൻ ചെയ്ത ഭാവി കാര്യത്തിന് പ്രസന്റ് കണ്ടിന്യൂവസ് ഉപയോഗിച്ച രൂപം.1",
      "options": [
        "A) We travel next week.",
        "B) We are travelling next week.",
        "C) We aren’t travelling next week.",
        "D) We will travel next week."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Complete the sentence: \"She is ______ a new company next month.\"",
      "questionMl": "ഭാവി പ്ലാൻ ആയതിനാൽ 'is + joining' വരുന്നു.1",
      "options": [
        "A) join",
        "B) joins",
        "C) joining",
        "D) joined"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "What is the mistake in: \"We aren’t go tomorrow.\"",
      "questionMl": "'go' എന്നതിന് പകരം 'going' എന്ന് വേണം.1",
      "options": [
        "A) We not going tomorrow.",
        "B) We don’t going tomorrow.",
        "C) We isn’t going tomorrow.",
        "D) We aren’t going tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "\"They are visiting us tonight.\" - When is the action planned to happen?",
      "questionMl": "'tonight' എന്നത് ഭാവി പ്ലാൻ ആണ്.1",
      "options": [
        "A) Tonight (ഇന്ന് രാത്രി)",
        "B) Right now",
        "C) Next month",
        "D) Every day"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Select the correct vocabulary for \"അഭിമുഖം\":",
      "questionMl": "Interview എന്നാൽ അഭിമുഖം.1",
      "options": [
        "A) Appointment",
        "B) Interview",
        "C) Schedule",
        "D) Preparation"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What does the power usage \"See you tomorrow.\" mean?",
      "questionMl": "പിരിയുമ്പോൾ പറയാവുന്ന ഒരു പ്രയോഗം.1",
      "options": [
        "A) ഇപ്പോൾ വരാം.",
        "B) അത് നന്നായിരിക്കുന്നു.",
        "C) നാളെ കാണാം.",
        "D) വഴിയിലാണ്."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Fill in the blank: \"Whom ______ she talking to?\"",
      "questionMl": "'She' ഏകവചനം ആയതുകൊണ്ട് 'is' വരുന്നു.1",
      "options": [
        "A) are",
        "B) am",
        "C) do",
        "D) is"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "\"Why is she crying?\" - What is the Malayalam meaning?",
      "questionMl": "Crying എന്നാൽ കരയുന്നു.1",
      "options": [
        "A) അവൾ എന്തുകൊണ്ടാണ് കരയുന്നത്?",
        "B) അവൾ എന്തുകൊണ്ടാണ് ചിരിക്കുന്നത്?",
        "C) അവൾ എവിടേക്കാണ് പോകുന്നത്?",
        "D) അവൾ എപ്പോഴാണ് വരുന്നത്?"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "What is the vocabulary word for \"ക്രമപ്പട്ടിക\" or \"നിശ്ചയിച്ച സമയം\"?",
      "questionMl": "Schedule എന്നാൽ ക്രമപ്പട്ടിക.1",
      "options": [
        "A) Project",
        "B) Schedule",
        "C) Arrival",
        "D) Meeting"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Translate: \"എനിക്ക് സുഖമില്ല.\"",
      "questionMl": "ശരീരത്തിന് അസ്വസ്ഥത തോന്നുമ്പോൾ പറയുന്ന പാറ്റേൺ.1",
      "options": [
        "A) I am not working.",
        "B) I am not sleeping.",
        "C) I am not feeling well.",
        "D) I am not coming."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "\"Are you busy now?\" - What is the correct translation?",
      "questionMl": "Busy എന്നാൽ തിരക്ക്.1",
      "options": [
        "A) നിങ്ങൾ ഇപ്പോൾ എവിടെയാണ്?",
        "B) നിങ്ങൾ നാളെ വരുമോ?",
        "C) നിങ്ങൾക്ക് സുഖമാണോ?",
        "D) നിങ്ങൾ ഇപ്പോൾ തിരക്കിലാണോ?"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Fill in the blank for a future plan: \"We are having a meeting ______ 10 AM.\"",
      "questionMl": "കൃത്യമായ സമയത്തിന് മുൻപ് 'at' ഉപയോഗിക്കണം.1",
      "options": [
        "A) at",
        "B) on",
        "C) in",
        "D) for"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Choose the correct spelling for the vocabulary \"യാത്ര ചെയ്യൽ\":",
      "questionMl": "Module പ്രകാരം 'travelling' എന്ന സ്പെല്ലിംഗ്.1",
      "options": [
        "A) traveling",
        "B) travelling",
        "C) travelly",
        "D) travaling"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "\"I’m looking forward to it.\" means:",
      "questionMl": "ഒരു നല്ല കാര്യത്തിനായി ആകാംഷയോടെ കാത്തിരിക്കുമ്പോൾ ഉപയോഗിക്കുന്ന പ്രയോഗം.1",
      "options": [
        "A) ഞാൻ അത് നോക്കുകയാണ്.",
        "B) എനിക്ക് അത് വേണ്ട.",
        "C) ഞാൻ അതിനായി കാത്തിരിക്കുകയാണ് (വളരെ പ്രതീക്ഷയോടെ).",
        "D) ഞാൻ അത് പിന്നീട് ചെയ്യാം."
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the dialogue: \"Are you free tonight?\" -> \"No, ______ my relatives.\"",
      "questionMl": "ഇന്ന് രാത്രിയിലെ പ്ലാൻ ആയതുകൊണ്ട് Present Continuous രൂപം.1",
      "options": [
        "A) I meet",
        "B) I don’t meet",
        "C) I will meeting",
        "D) I’m meeting"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "\"How are you travelling?\" - What is being asked?",
      "questionMl": "യാത്ര ചെയ്യുന്ന രീതിയെക്കുറിച്ചാണ് (How) ചോദിക്കുന്നത്.1",
      "options": [
        "A) നിങ്ങൾ എങ്ങനെയാണ് യാത്ര ചെയ്യുന്നത്?",
        "B) നിങ്ങൾ എപ്പോഴാണ് യാത്ര ചെയ്യുന്നത്?",
        "C) നിങ്ങൾ ആരുടെ കൂടെയാണ് യാത്ര ചെയ്യുന്നത്?",
        "D) നിങ്ങൾ എവിടേക്കാണ് യാത്ര ചെയ്യുന്നത്?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Find the sentence that uses Present Continuous for a future plan:",
      "questionMl": "'tomorrow' എന്ന വാക്ക് നാളത്തെ പ്ലാനിനെ കാണിക്കുന്നു",
      "options": [
        "A) She isn’t watching TV.",
        "B) I am attending an interview tomorrow.",
        "C) Who is waiting outside?",
        "D) They aren’t studying now."
      ],
      "correctIndex": 1
    }
  ],
  "14": [
    {
      "id": 1,
      "question": "I __________ to school yesterday.",
      "questionMl": "ഞാൻ ഇന്നലെ സ്കൂളിൽ പോയി.",
      "options": [
        "A) go",
        "B) gone",
        "C) went",
        "D) going"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "She __________ English last night.",
      "questionMl": "അവൾ ഇന്നലെ രാത്രി ഇംഗ്ലീഷ് പഠിച്ചു.",
      "options": [
        "A) study",
        "B) studying",
        "C) studies",
        "D) studied"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "We __________ our grandparents last weekend.",
      "questionMl": "ഞങ്ങൾ കഴിഞ്ഞ വാരാന്ത്യത്തിൽ മുത്തശ്ശനെയും മുത്തശ്ശിയെയും സന്ദർശിച്ചു.",
      "options": [
        "A) visited",
        "B) visit",
        "C) visiting",
        "D) visits"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "They __________ football yesterday afternoon.",
      "questionMl": "അവർ ഇന്നലെ വൈകുന്നേരം ഫുട്ബോൾ കളിച്ചു.",
      "options": [
        "A) play",
        "B) played",
        "C) playing",
        "D) plays"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "He __________ a wonderful movie last night.",
      "questionMl": "അവൻ കഴിഞ്ഞ രാത്രി ഒരു സിനിമ കണ്ടു.",
      "options": [
        "A) watch",
        "B) watching",
        "C) watched",
        "D) watches"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "I __________ to Kochi last week.",
      "questionMl": "ഞാൻ കഴിഞ്ഞ ആഴ്ച കൊച്ചിയിലേക്ക് പോയി.",
      "options": [
        "A) go",
        "B) gone",
        "C) goes",
        "D) went"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "She __________ breakfast very early this morning.",
      "questionMl": "അവൾ ഇന്ന് രാവിലെ പ്രഭാതഭക്ഷണം വളരെ നേരത്തെ കഴിച്ചു.",
      "options": [
        "A) ate",
        "B) eat",
        "C) eaten",
        "D) eating"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "He __________ hot tea after the meeting.",
      "questionMl": "മീറ്റിംഗിന് ശേഷം അവൻ ചൂടുചായ കുടിച്ചു.",
      "options": [
        "A) drink",
        "B) drank",
        "C) drunk",
        "D) drinks"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "We __________ home late last night.",
      "questionMl": "ഞങ്ങൾ കഴിഞ്ഞ രാത്രി വൈകിയാണ് വീട്ടിലെത്തിയത്.",
      "options": [
        "A) come",
        "B) coming",
        "C) came",
        "D) comes"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "They __________ a detailed letter to the manager.",
      "questionMl": "അവർ മാനേജർക്ക് ഒരു വിശദമായ കത്ത് എഴുതി.",
      "options": [
        "A) write",
        "B) written",
        "C) writing",
        "D) wrote"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "I __________ my old school teacher yesterday.",
      "questionMl": "ഞാൻ ഇന്നലെ എന്റെ പഴയ സ്കൂൾ അധ്യാപകനെ കണ്ടു.",
      "options": [
        "A) saw",
        "B) see",
        "C) seen",
        "D) seeing"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "She __________ a new smartphone last month.",
      "questionMl": "അവൾ കഴിഞ്ഞ മാസം ഒരു പുതിയ സ്മാർട്ട്ഫോൺ വാങ്ങി.",
      "options": [
        "A) buy",
        "B) bought",
        "C) buying",
        "D) buys"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "He __________ to his manager a few minutes ago.",
      "questionMl": "അവൻ കുറച്ച് മിനിറ്റുകൾക്ക് മുമ്പ് തന്റെ മാനേജറോട് സംസാരിച്ചു.",
      "options": [
        "A) speak",
        "B) spoken",
        "C) spoke",
        "D) speaks"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "We __________ a great time at the party.",
      "questionMl": "ഞങ്ങൾക്ക് പാർട്ടിയിൽ നല്ലൊരു സമയം ലഭിച്ചു.",
      "options": [
        "A) have",
        "B) has",
        "C) having",
        "D) had"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "She __________ her homework before dinner.",
      "questionMl": "അവൾ അത്താഴത്തിന് മുമ്പ് തന്റെ ഹോംവർക്ക് പൂർത്തിയാക്കി.",
      "options": [
        "A) finished",
        "B) finish",
        "C) finishing",
        "D) finishes"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "He __________ a new bike two days ago.",
      "questionMl": "അവൻ രണ്ട് ദിവസം മുമ്പ് ഒരു പുതിയ ബൈക്ക് വാങ്ങി.",
      "options": [
        "A) buy",
        "B) bought",
        "C) buys",
        "D) buying"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "I __________ my childhood friend yesterday.",
      "questionMl": "ഞാൻ ഇന്നലെ എന്റെ കുട്ടിക്കാലത്തെ സുഹൃത്തിനെ കണ്ടു.",
      "options": [
        "A) meet",
        "B) meeting",
        "C) met",
        "D) meets"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "We __________ to Kozhikode by car.",
      "questionMl": "ഞങ്ങൾ കാറിൽ കോഴിക്കോട്ടേക്ക് യാത്ര ചെയ്തു.",
      "options": [
        "A) travel",
        "B) travelling",
        "C) travels",
        "D) travelled"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "They thoroughly __________ the vacation trip.",
      "questionMl": "അവർ അവധിക്കാല യാത്ര പൂർണ്ണമായും ആസ്വദിച്ചു.",
      "options": [
        "A) enjoyed",
        "B) enjoy",
        "C) enjoying",
        "D) enjoys"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "I __________ early last night because I was tired.",
      "questionMl": "ഞാൻ തളർന്നിരുന്നതുകൊണ്ട് കഴിഞ്ഞ രാത്രി നേരത്തെ ഉറങ്ങി.",
      "options": [
        "A) sleep",
        "B) slept",
        "C) sleeping",
        "D) sleeps"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "The train __________ at the station an hour ago.",
      "questionMl": "ട്രെയിൻ ഒരു മണിക്കൂർ മുമ്പ് സ്റ്റേഷനിൽ എത്തി.",
      "options": [
        "A) arrive",
        "B) arriving",
        "C) arrived",
        "D) arrives"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "The office meeting __________ at exactly 10 AM.",
      "questionMl": "ഓഫീസ് മീറ്റിംഗ് കൃത്യം 10 മണിക്ക് ആരംഭിച്ചു.",
      "options": [
        "A) start",
        "B) starting",
        "C) starts",
        "D) started"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "We __________ the beautiful moments from our childhood.",
      "questionMl": "ഞങ്ങൾ ഞങ്ങളുടെ കുട്ടിക്കാലത്തെ മനോഹരമായ നിമിഷങ്ങൾ ഓർത്തു.",
      "options": [
        "A) remembered",
        "B) remember",
        "C) remembering",
        "D) remembers"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "They __________ the office early yesterday.",
      "questionMl": "അവർ ഇന്നലെ നേരത്തെ ഓഫീസ് വിട്ടുപോയി.",
      "options": [
        "A) leave",
        "B) left",
        "C) leaving",
        "D) leaves"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Select the correct past form of the irregular verb 'eat':",
      "questionMl": "'eat' എന്ന ക്രമരഹിത ക്രിയയുടെ ശരിയായ ഭൂതകാല രൂപം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) eated",
        "B) eaten",
        "C) ate",
        "D) eating"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Identify the correct sentence:",
      "questionMl": "ശരിയായ വാക്യം തിരിച്ചറിയുക:",
      "options": [
        "A) I goed to school yesterday.",
        "B) I was go to school yesterday.",
        "C) I gone to school yesterday.",
        "D) I went to school yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Identify the mistake: \"She eated breakfast early.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"She eated breakfast early.\"",
      "options": [
        "A) eated",
        "B) early",
        "C) breakfast",
        "D) She"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: \"It __________ a wonderful experience.\"",
      "questionMl": "വാക്യം പൂർത്തിയാക്കുക: \"അതൊരു അത്ഭുതകരമായ അനുഭവമായിരുന്നു.\"",
      "options": [
        "A) is",
        "B) was",
        "C) were",
        "D) am"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "\"Two days __________\" is a common past time expression.",
      "questionMl": "\"രണ്ട് ദിവസം മുമ്പ്\" എന്നത് സാധാരണയായി ഉപയോഗിക്കുന്ന ഒരു ഭൂതകാല പ്രയോഗമാണ്.",
      "options": [
        "A) last",
        "B) before",
        "C) ago",
        "D) next"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "He __________ the project on time last week.",
      "questionMl": "അവൻ കഴിഞ്ഞ ആഴ്ച കൃത്യസമയത്ത് പ്രോജക്റ്റ് പൂർത്തിയാക്കി.",
      "options": [
        "A) finish",
        "B) finishing",
        "C) finishes",
        "D) finished"
      ],
      "correctIndex": 3
    }
  ],
  "15": [
    {
      "id": 1,
      "question": "I __________ to school yesterday.",
      "questionMl": "ഞാൻ ഇന്നലെ സ്കൂളിൽ പോയില്ല.",
      "options": [
        "A) didn't go",
        "B) didn't went",
        "C) don't go",
        "D) not went"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "She __________ English last night.",
      "questionMl": "അവൾ ഇന്നലെ രാത്രി ഇംഗ്ലീഷ് പഠിച്ചില്ല.",
      "options": [
        "A) didn't studied",
        "B) didn't study",
        "C) doesn't study",
        "D) not study"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "He __________ to class last Monday.",
      "questionMl": "അവൻ കഴിഞ്ഞ തിങ്കളാഴ്ച ക്ലാസിൽ വന്നില്ല.",
      "options": [
        "A) didn't came",
        "B) doesn't come",
        "C) didn't come",
        "D) not come"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "We __________ the movie last weekend.",
      "questionMl": "ഞങ്ങൾ കഴിഞ്ഞ വാരാന്ത്യത്തിൽ സിനിമ കണ്ടില്ല.",
      "options": [
        "A) didn't watched",
        "B) don't watch",
        "C) not watch",
        "D) didn't watch"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "They __________ football yesterday evening.",
      "questionMl": "അവർ ഇന്നലെ വൈകുന്നേരം ഫുട്ബോൾ കളിച്ചില്ല.",
      "options": [
        "A) didn't play",
        "B) didn't played",
        "C) don't play",
        "D) not play"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "I __________ well last night.",
      "questionMl": "ഞാൻ കഴിഞ്ഞ രാത്രി നന്നായി ഉറങ്ങിയില്ല.",
      "options": [
        "A) didn't slept",
        "B) didn't sleep",
        "C) don't sleep",
        "D) not sleep"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "__________ you go to work yesterday?",
      "questionMl": "നിങ്ങൾ ഇന്നലെ ജോലിക്ക് പോയോ?",
      "options": [
        "A) Do",
        "B) Does",
        "C) Did",
        "D) Have"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "__________ she call you last night?",
      "questionMl": "അവൾ ഇന്നലെ രാത്രി നിങ്ങളെ വിളിച്ചോ?",
      "options": [
        "A) Do",
        "B) Does",
        "C) Was",
        "D) Did"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "__________ he finish the project yesterday?",
      "questionMl": "അവൻ ഇന്നലെ പ്രോജക്റ്റ് പൂർത്തിയാക്കിയോ?",
      "options": [
        "A) Did",
        "B) Has",
        "C) Does",
        "D) Do"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "__________ they arrive on time for the meeting?",
      "questionMl": "അവർ മീറ്റിംഗിന് കൃത്യസമയത്ത് എത്തിയോ?",
      "options": [
        "A) Do",
        "B) Did",
        "C) Does",
        "D) Have"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "__________ your parents visit you last week?",
      "questionMl": "നിങ്ങളുടെ മാതാപിതാക്കൾ കഴിഞ്ഞ ആഴ്ച നിങ്ങളെ സന്ദർശിച്ചോ?",
      "options": [
        "A) Do",
        "B) Does",
        "C) Did",
        "D) Was"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "\"Did you enjoy the trip?\" — \"Yes, I __________.\"",
      "questionMl": "\"നിങ്ങൾ യാത്ര ആസ്വദിച്ചോ?\" — \"അതെ.\"",
      "options": [
        "A) enjoy",
        "B) enjoyed",
        "C) do",
        "D) did"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "\"Did he come to office?\" — \"No, he __________.\"",
      "questionMl": "\"അവൻ ഓഫീസിൽ വന്നോ?\" — \"ഇല്ല.\"",
      "options": [
        "A) didn't",
        "B) doesn't",
        "C) don't",
        "D) wasn't"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "__________ did you do yesterday?",
      "questionMl": "ഇന്നലെ നിങ്ങൾ എന്ത് ചെയ്തു?",
      "options": [
        "A) Where",
        "B) What",
        "C) When",
        "D) Who"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "__________ did she buy from the shop?",
      "questionMl": "അവൾ കടയിൽ നിന്ന് എന്താണ് വാങ്ങിയത്?",
      "options": [
        "A) Where",
        "B) Why",
        "C) What",
        "D) Who"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "__________ did you go for the holidays?",
      "questionMl": "നിങ്ങൾ അവധിക്കാലത്ത് എവിടെയാണ് പോയത്?",
      "options": [
        "A) What",
        "B) Who",
        "C) Which",
        "D) Where"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "__________ did they stay in Kochi?",
      "questionMl": "അവർ കൊച്ചിയിൽ എവിടെയാണ് താമസിച്ചത്?",
      "options": [
        "A) Where",
        "B) What",
        "C) Which",
        "D) Whom"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "__________ did you arrive at the airport?",
      "questionMl": "നിങ്ങൾ എപ്പോഴാണ് എയർപോർട്ടിൽ എത്തിയത്?",
      "options": [
        "A) What",
        "B) When",
        "C) Who",
        "D) Whose"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "__________ did he leave the company?",
      "questionMl": "അവൻ എപ്പോഴാണ് കമ്പനി വിട്ടുപോയത്?",
      "options": [
        "A) What",
        "B) Which",
        "C) When",
        "D) Whom"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "__________ did you call me last night?",
      "questionMl": "നിങ്ങൾ ഇന്നലെ രാത്രി എന്നെ എന്തിനാണ് വിളിച്ചത്?",
      "options": [
        "A) What",
        "B) Which",
        "C) Whom",
        "D) Why"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "__________ did she resign from her job?",
      "questionMl": "അവൾ എന്തുകൊണ്ടാണ് ജോലി രാജിവെച്ചത്?",
      "options": [
        "A) Why",
        "B) What",
        "C) Which",
        "D) Whose"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "__________ helped you to finish the work yesterday?",
      "questionMl": "ഇന്നലെ ജോലി പൂർത്തിയാക്കാൻ നിങ്ങളെ ആരാണ് സഹായിച്ചത്?",
      "options": [
        "A) What",
        "B) Who",
        "C) Whom",
        "D) Which"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "__________ did you meet at the market yesterday?",
      "questionMl": "ഇന്നലെ നിങ്ങൾ ആരെയാണ് മാർക്കറ്റിൽ വെച്ച് കണ്ടത്?",
      "options": [
        "A) What",
        "B) Which",
        "C) Whom",
        "D) Whose"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "__________ movie did you watch last night?",
      "questionMl": "നിങ്ങൾ കഴിഞ്ഞ രാത്രി ഏത് സിനിമയാണ് കണ്ടത്?",
      "options": [
        "A) What",
        "B) Who",
        "C) Whom",
        "D) Which"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "__________ phone did you borrow yesterday?",
      "questionMl": "നിങ്ങൾ ഇന്നലെ ആരുടെ ഫോണാണ് കടം വാങ്ങിയത്?",
      "options": [
        "A) Whose",
        "B) Who",
        "C) Whom",
        "D) Which"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "__________ did you travel to Delhi?",
      "questionMl": "നിങ്ങൾ എങ്ങനെയാണ് ഡൽഹിയിലേക്ക് യാത്ര ചെയ്തത്?",
      "options": [
        "A) What",
        "B) How",
        "C) Which",
        "D) Whom"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Identify the correct question form:",
      "questionMl": "ശരിയായ ചോദ്യരൂപം തിരിച്ചറിയുക:",
      "options": [
        "A) Did you went there?",
        "B) Where did you went?",
        "C) Did you go there?",
        "D) Did she saw him?"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Identify the mistake: \"She didn’t went to office.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"She didn’t went to office.\"",
      "options": [
        "A) to",
        "B) office",
        "C) didn't",
        "D) went"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Identify the mistake: \"He didn’t finished the project.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"He didn’t finished the project.\"",
      "options": [
        "A) finished",
        "B) project",
        "C) didn't",
        "D) He"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "I __________ understand the lesson yesterday.",
      "questionMl": "എനിക്ക് ഇന്നലെ പാഠം മനസ്സിലായില്ല.",
      "options": [
        "A) don't",
        "B) didn't",
        "C) not",
        "D) doesn't"
      ],
      "correctIndex": 1
    }
  ],
  "16": [
    {
      "id": 1,
      "question": "Which connector is best used to begin telling a story chronologically?",
      "questionMl": "ഒരു കഥ കാലാനുക്രമത്തിൽ പറയാൻ തുടങ്ങുമ്പോൾ ആദ്യം ഉപയോഗിക്കാൻ ഏറ്റവും അനുയോജ്യമായ വാക്ക് ഏതാണ്?",
      "options": [
        "A) Finally",
        "B) Suddenly",
        "C) First",
        "D) After that"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Fill in the blank: \"_____, the electricity went out and the entire room became dark.\"",
      "questionMl": "പെട്ടെന്നുണ്ടായ സംഭവത്തെ സൂചിപ്പിക്കാൻ ശരിയായ വാക്ക് തിരഞ്ഞെടുക്കുക: \"_____, electricity പോയി, മുറി മുഴുവൻ ഇരുട്ടിലായി.\"",
      "options": [
        "A) First",
        "B) Usually",
        "C) Rarely",
        "D) Suddenly"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Complete the story: \"We searched for the lost keys everywhere. _____, my brother found them under the sofa.\"",
      "questionMl": "കഥ പൂർത്തിയാക്കുക: \"ഞങ്ങൾ താക്കോൽ എല്ലായിടത്തും തിരഞ്ഞു. ഒടുവിൽ എന്റെ സഹോദരൻ അത് സോഫയുടെ അടിയിൽ കണ്ടെത്തി.\"",
      "options": [
        "A) Finally",
        "B) First",
        "C) Suddenly",
        "D) Yesterday"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Which sequence word shows what happened immediately after the first event?",
      "questionMl": "ആദ്യത്തെ സംഭവത്തിന് തൊട്ടുപിന്നാലെ എന്ത് സംഭവിച്ചു എന്ന് കാണിക്കാൻ ഉപയോഗിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Finally",
        "B) Then",
        "C) Last year",
        "D) In conclusion"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Fill in the blank with the correct past tense: \"Last Sunday, we _____ an adventurous road trip to Wayanad.\"",
      "questionMl": "ശരിയായ ഭൂതകാല ക്രിയ ഉപയോഗിക്കുക: \"കഴിഞ്ഞ ഞായറാഴ്ച ഞങ്ങൾ വയനാട്ടിലേക്ക് ഒരു യാത്ര പോയി.\"",
      "options": [
        "A) take",
        "B) taken",
        "C) took",
        "D) takes"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Complete the sentence: \"The bus broke down on the highway, but _____, a mechanic was nearby.\"",
      "questionMl": "ഭാഗ്യകരമായ ഒരു വഴിത്തിരിവ് കാണിക്കാൻ ശരിയായ വാക്ക് ഏതാണ്: \"ഹൈവേയിൽ ബസ് കേടായി, പക്ഷേ ഭാഗ്യവശാൽ ഒരു മെക്കാനിക്ക് അടുത്തുണ്ടായിരുന്നു.\"",
      "options": [
        "A) unfortunately",
        "B) slowly",
        "C) finally",
        "D) luckily"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "What does the sequence phrase \"After that\" indicate in storytelling?",
      "questionMl": "കഥ പറയുമ്പോൾ \"After that\" എന്ന പ്രയോഗം എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
      "options": [
        "A) The next subsequent event",
        "B) The opening event",
        "C) The end of the story",
        "D) A sudden accident"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Choose the correct sentence describing a childhood memory:",
      "questionMl": "കുട്ടിക്കാലത്തെ ഒരു ഓർമ്മയെ ശരിയായി വിവരിക്കുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) When I am a child, I visit my grandparents.",
        "B) When I was a child, I visited my grandparents every summer.",
        "C) When I was a child, I will visit my grandparents.",
        "D) When I was a child, I visiting my grandparents."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Fill in the blank: \"First, I heard a strange noise outside. _____, I opened the front door to check.\"",
      "questionMl": "കഥയിലെ തുടർച്ച കാണിക്കാൻ വിടവ് പൂരിപ്പിക്കുക: \"ആദ്യം ഞാൻ പുറത്ത് വിചിത്രമായ ഒരു ശബ്ദം കേട്ടു. പിന്നീട് ഞാൻ മുൻവാതിൽ തുറന്നു നോക്കി.\"",
      "options": [
        "A) Finally",
        "B) At last",
        "C) Then",
        "D) Never"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Which sentence correctly uses simple past to describe an unexpected event?",
      "questionMl": "അപ്രതീക്ഷിതമായ ഒരു സംഭവത്തെ ലളിതമായ ഭൂതകാലത്തിൽ ശരിയായി പറയുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) A cat suddenly jumps in front of my car.",
        "B) A cat suddenly jumping in front of my car.",
        "C) A cat suddenly has jump in front of my car.",
        "D) A cat suddenly jumped in front of my car."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Complete the dialogue: \"How did your weekend trip go?\" - \"_____ we missed the train, but we caught the next one.\"",
      "questionMl": "സംഭാഷണം പൂർത്തിയാക്കുക: \"ആദ്യം ഞങ്ങൾക്ക് ട്രെയിൻ മിസ്സായി, പക്ഷേ ഞങ്ങൾ അടുത്ത ട്രെയിൻ പിടിച്ചു.\"",
      "options": [
        "A) At first",
        "B) Finally",
        "C) Always",
        "D) After"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Which word means an amusing or humorous event that happened to you?",
      "questionMl": "രസകരമായ അല്ലെങ്കിൽ ചിരിയുണർത്തുന്ന ഒരു അനുഭവത്തെ സൂചിപ്പിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Tragedy",
        "B) Funny incident",
        "C) Scheduled meeting",
        "D) Career milestone"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Fill in the blank: \"We walked for three hours in the forest. _____, we reached the beautiful waterfall.\"",
      "questionMl": "ഒടുവിൽ ലക്ഷ്യസ്ഥാനത്ത് എത്തിച്ചേർന്നതിനെ സൂചിപ്പിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Suddenly",
        "B) First",
        "C) Eventually",
        "D) Tomorrow"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Complete the story sentence: \"While playing cricket in the rain, my friend _____ and dropped the ball.\"",
      "questionMl": "മഴയത്ത് കളിക്കുന്നതിനിടയിൽ സുഹൃത്ത് തെന്നിവീണതിനെ ഭൂതകാലത്തിൽ പറയുക:",
      "options": [
        "A) slips",
        "B) slipping",
        "C) has slip",
        "D) slipped"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "What is the past tense of the irregular verb 'lose' when talking about a lost wallet?",
      "questionMl": "നഷ്ടപ്പെട്ടു എന്ന് പറയാൻ 'lose' എന്ന ക്രിയയുടെ ശരിയായ ഭൂതകാല രൂപം ഏതാണ്?",
      "options": [
        "A) lost",
        "B) losed",
        "C) loosen",
        "D) losing"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete the sentence: \"Luckily, an honest person _____ my wallet and returned it.\"",
      "questionMl": "ഭാഗ്യവശാൽ ഒരാൾ എന്റെ വാലറ്റ് കണ്ടെത്തുകയും അത് തിരികെ നൽകുകയും ചെയ്തു:",
      "options": [
        "A) find",
        "B) found",
        "C) finds",
        "D) finding"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which expression is commonly used to bring a short story to an end?",
      "questionMl": "കഥ അവസാനിപ്പിക്കുമ്പോൾ സാധാരണയായി ഉപയോഗിക്കുന്ന പ്രയോഗം ഏതാണ്?",
      "options": [
        "A) To begin with",
        "B) In the beginning",
        "C) In the end",
        "D) Suddenly"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Fill in the blank: \"We packed our bags, loaded the car, and _____ set off on our holiday.\"",
      "questionMl": "യാത്ര പുറപ്പെട്ടതിനെ സൂചിപ്പിക്കാൻ ശരിയായ വാക്ക്: \"ഞങ്ങൾ ബാഗുകൾ പാക്ക് ചെയ്തു, ഒടുവിൽ യാത്ര തിരിച്ചു.\"",
      "options": [
        "A) suddenly",
        "B) usually",
        "C) rarely",
        "D) finally"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Which question is best to ask a friend to hear their travel story?",
      "questionMl": "സുഹൃത്തിന്റെ യാത്രാനുഭവത്തെക്കുറിച്ച് ചോദിക്കാൻ ഏറ്റവും അനുയോജ്യമായ ചോദ്യം ഏതാണ്?",
      "options": [
        "A) What did you do on your holiday trip?",
        "B) What do you do tomorrow?",
        "C) What are you doing now?",
        "D) What will you do next year?"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Complete the story: \"The lights flickered, the wind howled, and _____ a loud thunder shook the windows.\"",
      "questionMl": "അപ്രതീക്ഷിതമായി വലിയ ഇടിമിന്നലുണ്ടായതിനെ സൂചിപ്പിക്കാൻ ശരിയായ വാക്ക് ഏതാണ്?",
      "options": [
        "A) slowly",
        "B) suddenly",
        "C) first",
        "D) politely"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct past tense sentence describing a reunion:",
      "questionMl": "സ്കൂൾ അധ്യാപകനെ കണ്ടുമുട്ടിയതിനെ സൂചിപ്പിക്കുന്ന ശരിയായ ഭൂതകാല വാക്യം ഏതാണ്?",
      "options": [
        "A) We meet our school teacher yesterday.",
        "B) We are meet our school teacher last week.",
        "C) We met our school teacher after ten years.",
        "D) We meeting our school teacher two days ago."
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Fill in the blank: \"First we bought the tickets, _____ we went inside the cinema hall.\"",
      "questionMl": "ആദ്യം ഞങ്ങൾ ടിക്കറ്റ് വാങ്ങി, പിന്നീട് സിനിമ ഹാളിനുള്ളിലേക്ക് കയറി:",
      "options": [
        "A) sudden",
        "B) at first",
        "C) before",
        "D) then"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "How do you describe a funny school memory in the past tense?",
      "questionMl": "സ്കൂൾ കാലത്തെ ഒരു രസകരമായ അനുഭവം പങ്കുവെക്കുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) One day during lunch break, my friend mistakenly drank salt water.",
        "B) One day my friend will drink salt water.",
        "C) One day my friend is drinking salt water tomorrow.",
        "D) One day during lunch break, my friend mistakenly drink salt water."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Complete the sentence: \"The dog barked loudly, and _____ the thief jumped over the wall and escaped.\"",
      "questionMl": "പട്ടി കുരച്ച ഉടൻ തന്നെ കള്ളൻ മതിൽ ചാടി രക്ഷപ്പെട്ടു:",
      "options": [
        "A) yesterday",
        "B) immediately",
        "C) never",
        "D) always"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What is the best response when someone tells an exciting story?",
      "questionMl": "ഒരാൾ രസകരമായ ഒരു കഥ പറഞ്ഞു കേൾപ്പിക്കുമ്പോൾ നൽകാൻ അനുയോജ്യമായ മറുപടി ഏതാണ്?",
      "options": [
        "A) What is your name?",
        "B) I am going home tomorrow.",
        "C) That sounds like an amazing experience!",
        "D) Please do this work now."
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Identify the grammatical error in this storytelling sentence: \"First he woke up, then he washes his face.\"",
      "questionMl": "ഈ വാക്യത്തിലെ വ്യാകരണപരമായ തെറ്റ് കണ്ടെത്തുക: \"First he woke up, then he washes his face.\"",
      "options": [
        "A) 'woke up' is wrong",
        "B) 'then' is wrong",
        "C) 'he' is wrong",
        "D) 'washes' should be 'washed'"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the sentence: \"_____ we arrived at the airport, we realized we forgot our passports at home.\"",
      "questionMl": "എയർപോർട്ടിൽ എത്തിയപ്പോഴാണ് പാസ്‌പോർട്ട് വീട്ടിൽ മറന്നുവെച്ച കാര്യം ഓർത്തത്:",
      "options": [
        "A) When",
        "B) First",
        "C) Suddenly",
        "D) Finally"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Choose the correct connector: \"We missed our flight; _____, the airline booked us on the evening flight without extra charge.\"",
      "questionMl": "ഞങ്ങൾക്ക് ഫ്ലൈറ്റ് മിസ്സായി; ഭാഗ്യവശാൽ എയർലൈൻ അടുത്ത ഫ്ലൈറ്റിൽ അധിക ചാർജില്ലാതെ ടിക്കറ്റ് നൽകി:",
      "options": [
        "A) suddenly",
        "B) fortunately",
        "C) first",
        "D) yesterday"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Complete the narrative: \"The examination was very tough, but _____ all my classmates passed with good marks.\"",
      "questionMl": "പരീക്ഷ വളരെ കഠിനമായിരുന്നു, എങ്കിലും അവസാനം എല്ലാ കൂട്ടുകാരും നല്ല മാർക്കോടെ വിജയിച്ചു:",
      "options": [
        "A) first",
        "B) suddenly",
        "C) in the end",
        "D) right now"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Which sentence correctly uses past sequence markers?",
      "questionMl": "സംഭവങ്ങളുടെ ക്രമം ശരിയായി വ്യക്തമാക്കുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) First I call customer care, and after that they resolve.",
        "B) First I calling customer care, and then they resolving.",
        "C) First I have called, and after that they resolve.",
        "D) First I called the customer care, and after that they resolved my issue."
      ],
      "correctIndex": 3
    }
  ],
  "17": [
    {
      "id": 1,
      "question": "What is the basic grammatical structure of the Past Continuous Tense?",
      "questionMl": "പാസ്റ്റ് കണ്ടിന്യൂവസ് ടെൻസിന്റെ (Past Continuous Tense) അടിസ്ഥാന വാക്യ ഘടന എന്താണ്?",
      "options": [
        "A) Subject + was/were + verb-ing",
        "B) Subject + is/are + verb-ing",
        "C) Subject + will be + verb-ing",
        "D) Subject + has been + verb-ing"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Which helping verb is used with singular subjects (I, He, She, It) in Past Continuous?",
      "questionMl": "ഏകവചന സബ്ജക്റ്റുകൾക്കൊപ്പം (I, He, She, It) പാസ്റ്റ് കണ്ടിന്യൂവസിൽ ഉപയോഗിക്കുന്ന സഹായക്രിയ ഏതാണ്?",
      "options": [
        "A) were",
        "B) was",
        "C) is",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Which helping verb is used with plural subjects (We, You, They) in Past Continuous?",
      "questionMl": "ബഹുവചന സബ്ജക്റ്റുകൾക്കൊപ്പം (We, You, They) പാസ്റ്റ് കണ്ടിന്യൂവസിൽ ഉപയോഗിക്കുന്ന സഹായക്രിയ ഏതാണ്?",
      "options": [
        "A) was",
        "B) are",
        "C) were",
        "D) have"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Fill in the blank: \"I _____ dinner when the doorbell rang.\"",
      "questionMl": "കോളിംഗ് ബെൽ അടിച്ചപ്പോൾ ഞാൻ ഭക്ഷണം പാകം ചെയ്യുകയായിരുന്നു:",
      "options": [
        "A) were cooking",
        "B) am cooking",
        "C) cook",
        "D) was cooking"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Complete the sentence: \"While they _____ along the road, it started raining heavily.\"",
      "questionMl": "അവർ റോഡിലൂടെ നടക്കുമ്പോൾ കനത്ത മഴ പെയ്യാൻ തുടങ്ങി:",
      "options": [
        "A) were walking",
        "B) was walking",
        "C) are walking",
        "D) walked"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Fill in the blank: \"What _____ you doing at 8 PM yesterday evening?\"",
      "questionMl": "\"ഇന്നലെ വൈകുന്നേരം 8 മണിക്ക് നിങ്ങൾ എന്തെടുക്കുകയായിരുന്നു?\" എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) was",
        "B) were",
        "C) did",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Complete the sentence: \"The students _____ quietly when the principal entered the classroom.\"",
      "questionMl": "പ്രിൻസിപ്പൽ ക്ലാസ്സിലേക്ക് വന്നപ്പോൾ കുട്ടികൾ പഠിക്കുകയായിരുന്നു:",
      "options": [
        "A) was studying",
        "B) is studying",
        "C) were studying",
        "D) studied"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which conjunction is typically followed by a continuous ongoing action in the past?",
      "questionMl": "മുൻപ് നടന്നുകൊണ്ടിരുന്ന ഒരു പ്രവർത്തിക്ക് മുമ്പായി സാധാരണയായി ഉപയോഗിക്കുന്ന കൺജങ്ഷൻ ഏതാണ്?",
      "options": [
        "A) Soon",
        "B) Yesterday",
        "C) Tomorrow",
        "D) While"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: \"She _____ television when the power went out.\"",
      "questionMl": "വൈദ്യുതി നിലച്ചപ്പോൾ അവൾ ടിവി കാണുകയായിരുന്നു:",
      "options": [
        "A) was watching",
        "B) were watching",
        "C) watched",
        "D) is watching"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Complete the question: \"_____ he sleeping when you called him yesterday?\"",
      "questionMl": "\"ഇന്നലെ നീ വിളിച്ചപ്പോൾ അവൻ ഉറങ്ങുകയായിരുന്നോ?\" എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) Were",
        "B) Was",
        "C) Did",
        "D) Is"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct negative sentence in Past Continuous:",
      "questionMl": "പാസ്റ്റ് കണ്ടിന്യൂവസിലെ ശരിയായ നിഷേധാത്മക (negative) വാക്യം ഏതാണ്?",
      "options": [
        "A) I were not listening to music at that time.",
        "B) I did not listening to music at that time.",
        "C) I was not listening to music at that time.",
        "D) I was not listen to music at that time."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Fill in the blank: \"While my mother was cooking, my father _____ the newspaper.\"",
      "questionMl": "ഒരേ സമയം രണ്ട് കാര്യങ്ങൾ നടന്നുകൊണ്ടിരുന്നതിനെ സൂചിപ്പിക്കാൻ: \"അമ്മ പാചകം ചെയ്യുമ്പോൾ അച്ഛൻ പത്രം വായിക്കുകയായിരുന്നു.\"",
      "options": [
        "A) were reading",
        "B) readed",
        "C) is reading",
        "D) was reading"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Complete the sentence: \"We _____ for the bus when the accident happened.\"",
      "questionMl": "അപകടം നടക്കുമ്പോൾ ഞങ്ങൾ ബസിനായി കാത്തുനിൽക്കുകയായിരുന്നു:",
      "options": [
        "A) were waiting",
        "B) was waiting",
        "C) waited",
        "D) are waiting"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Fill in the blank: \"The phone rang while I _____ a shower.\"",
      "questionMl": "ഞാൻ കുളിച്ചുകൊണ്ടിരിക്കുമ്പോഴാണ് ഫോൺ റിംഗ് ചെയ്തത്:",
      "options": [
        "A) were taking",
        "B) was taking",
        "C) took",
        "D) am taking"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the grammatically correct question:",
      "questionMl": "നിങ്ങൾ അവളെ കണ്ടപ്പോൾ അവൾ എന്തെടുക്കുകയായിരുന്നു എന്ന് ചോദിക്കുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) What were she doing when you saw her?",
        "B) What did she doing when you saw her?",
        "C) What was she doing when you saw her?",
        "D) What is she doing yesterday?"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete the sentence: \"My laptop battery died while I _____ the office report.\"",
      "questionMl": "ഓഫീസിലെ റിപ്പോർട്ട് എഴുതിക്കൊണ്ടിരിക്കുമ്പോഴാണ് ലാപ്ടോപ്പിന്റെ ബാറ്ററി തീർന്നത്:",
      "options": [
        "A) were writing",
        "B) wrote",
        "C) is writing",
        "D) was writing"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Fill in the blank: \"They _____ football in the ground when it suddenly began to storm.\"",
      "questionMl": "പെട്ടെന്ന് കൊടുങ്കാറ്റ് ഉണ്ടായപ്പോൾ അവർ ഗ്രൗണ്ടിൽ ഫുട്ബോൾ കളിക്കുകയായിരുന്നു:",
      "options": [
        "A) were playing",
        "B) was playing",
        "C) played",
        "D) are playing"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Which sentence correctly describes an interrupted past action?",
      "questionMl": "ഒരു പ്രവർത്തിക്കിടയിൽ മറ്റൊരു തടസ്സം ഉണ്ടായതിനെ ശരിയായി വിവരിക്കുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) I drove to the supermarket when my tire was puncturing.",
        "B) I was driving to the supermarket when my tire punctured.",
        "C) I driving to the supermarket when my tire puncture.",
        "D) I was drive to the supermarket when my tire punctured."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Fill in the blank: \"Why _____ you laughing during the serious team meeting yesterday?\"",
      "questionMl": "ഇന്നലത്തെ മീറ്റിംഗിൽ നിങ്ങൾ എന്തിനാണ് ചിരിച്ചുകൊണ്ടിരുന്നത് എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) was",
        "B) did",
        "C) were",
        "D) are"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Complete the sentence: \"The baby _____ peacefully until the loud thunderstorm woke him up.\"",
      "questionMl": "ഇടിമിന്നൽ ഉണർത്തുന്നത് വരെ കുഞ്ഞ് ശാന്തമായി ഉറങ്ങുകയായിരുന്നു:",
      "options": [
        "A) were sleeping",
        "B) slept",
        "C) is sleeping",
        "D) was sleeping"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Choose the correct option: \"At 10 AM yesterday, the manager _____ an important presentation.\"",
      "questionMl": "ഇന്നലെ രാവിലെ 10 മണിക്ക് മാനേജർ ഒരു പ്രധാന പ്രസന്റേഷൻ നൽകിക്കൊണ്ടിരിക്കുകയായിരുന്നു:",
      "options": [
        "A) was delivering",
        "B) were delivering",
        "C) delivered",
        "D) is delivering"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Fill in the blank: \"While we _____ in the traffic jam, we listened to the radio.\"",
      "questionMl": "ഞങ്ങൾ ട്രാഫിക്കിൽ കുടുങ്ങിക്കിടക്കുമ്പോൾ റേഡിയോ കേട്ടു:",
      "options": [
        "A) was sitting",
        "B) were sitting",
        "C) sat",
        "D) are sitting"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Complete the sentence: \"He burnt his finger while he _____ water for tea.\"",
      "questionMl": "ചായയ്ക്ക് വെള്ളം തിളപ്പിച്ചുകൊണ്ടിരുന്നപ്പോൾ അവൻ കൈ പൊള്ളിച്ചു:",
      "options": [
        "A) were boiling",
        "B) boiled",
        "C) was boiling",
        "D) is boiling"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Identify the grammatical error: \"They was traveling on the train when they lost their luggage.\"",
      "questionMl": "ഈ വാക്യത്തിലെ വ്യാകരണപരമായ തെറ്റ് കണ്ടെത്തുക: \"They was traveling on the train when they lost their luggage.\"",
      "options": [
        "A) 'traveling' should be 'travel'",
        "B) 'lost' should be 'lose'",
        "C) 'on' should be 'in'",
        "D) 'was' should be 'were'"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the conversation: \"What were you doing when I called you?\" - \"I _____ my bike.\"",
      "questionMl": "സംഭാഷണം പൂർത്തിയാക്കുക: \"ഞാൻ വിളിച്ചപ്പോൾ നീ എന്തെടുക്കുകയായിരുന്നു?\" - \"ഞാൻ ബൈക്ക് നന്നാക്കുകയായിരുന്നു.\"",
      "options": [
        "A) was repairing",
        "B) were repairing",
        "C) repaired",
        "D) am repairing"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"The teacher noticed that two students _____ notes during the lecture.\"",
      "questionMl": "ക്ലാസ് നടക്കുന്നതിനിടയിൽ രണ്ട് കുട്ടികൾ കുറിപ്പുകൾ കൈമാറുന്നത് അധ്യാപിക ശ്രദ്ധിച്ചു:",
      "options": [
        "A) was passing",
        "B) were passing",
        "C) passed",
        "D) are passing"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Choose the correct sentence with 'when':",
      "questionMl": "അതിഥികൾ എത്തുമ്പോൾ ഞങ്ങൾ ഉച്ചഭക്ഷണം കഴിക്കുകയായിരുന്നു എന്ന് പറയുന്ന ശരിയായ വാക്യം ഏതാണ്?",
      "options": [
        "A) We had lunch when the guests were arriving.",
        "B) We are having lunch when the guests arrived.",
        "C) We were having lunch when the guests arrived.",
        "D) We were have lunch when the guests arrived."
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Fill in the blank: \"She slipped and dropped her phone while she _____ across the wet floor.\"",
      "questionMl": "നനഞ്ഞ തറയിലൂടെ ഓടുമ്പോൾ അവൾ തെന്നിവീഴുകയും ഫോൺ താഴെ വീഴുകയും ചെയ്തു:",
      "options": [
        "A) were running",
        "B) ran",
        "C) runs",
        "D) was running"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Complete the sentence: \"The security guard _____ at the gate when the delivery van arrived.\"",
      "questionMl": "ഡെലിവറി വാൻ എത്തുമ്പോൾ സെക്യൂരിറ്റി ഗാർഡ് ഗേറ്റിൽ നിൽക്കുകയായിരുന്നു:",
      "options": [
        "A) was standing",
        "B) were standing",
        "C) stood",
        "D) is standing"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which sentence correctly uses Past Continuous to talk about a past evening at home?",
      "questionMl": "ഇന്നലെ രാത്രി സഹോദരി ഹോംവർക്ക് ചെയ്യുകയും ഞാൻ നോവൽ വായിക്കുകയും ചെയ്തുകൊണ്ടിരിക്കുകയായിരുന്നു എന്ന് ശരിയായി പറയുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) Last night, my sister was do her homework while I was read a novel.",
        "B) Last night, my sister was doing her homework while I was reading a novel.",
        "C) Last night, my sister did do her homework while I am reading a novel.",
        "D) Last night, my sister were doing her homework while I was reading."
      ],
      "correctIndex": 1
    }
  ],
  "18": [
    {
      "id": 1,
      "question": "I __________ my graduation successfully.",
      "questionMl": "ഞാൻ എന്റെ ബിരുദം പൂർത്തിയാക്കിയിട്ടുണ്ട്.",
      "options": [
        "A) completion",
        "B) has completed",
        "C) have completed",
        "D) completes"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "I __________ as a dedicated teacher in a school before.",
      "questionMl": "ഞാൻ ഒരു അധ്യാപകനായി ജോലി ചെയ്തിട്ടുണ്ട്.",
      "options": [
        "A) worked yesterday",
        "B) has worked",
        "C) working",
        "D) have worked"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "She __________ her intensive nursing course this term.",
      "questionMl": "അവൾ നഴ്സിംഗ് കോഴ്സ് പൂർത്തിയാക്കിയിട്ടുണ്ട്.",
      "options": [
        "A) has completed",
        "B) have completed",
        "C) complete",
        "D) completing"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "He __________ in Dubai for several years in the past.",
      "questionMl": "അവൻ ദുബായിൽ ജോലി ചെയ്തിട്ടുണ്ട്.",
      "options": [
        "A) have worked",
        "B) has worked",
        "C) working",
        "D) works"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "My brother __________ Arabic from a well-known institute.",
      "questionMl": "എന്റെ സഹോദരൻ അറബിക് പഠിച്ചിട്ടുണ്ട്.",
      "options": [
        "A) have learned",
        "B) learning",
        "C) has learned",
        "D) learn"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "My father __________ a new business in our hometown.",
      "questionMl": "എന്റെ അച്ഛൻ ഒരു ബിസിനസ് തുടങ്ങിയിട്ടുണ്ട്.",
      "options": [
        "A) have started",
        "B) starting",
        "C) starts",
        "D) has started"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Have you __________ worked abroad in your career?",
      "questionMl": "നിങ്ങൾ എപ്പോഴെങ്കിലും വിദേശത്ത് ജോലി ചെയ്തിട്ടുണ്ടോ?",
      "options": [
        "A) ever",
        "B) never",
        "C) yet",
        "D) since"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "I have __________ travelled by flight in my life journey.",
      "questionMl": "ഞാൻ ഒരിക്കലും വിമാനത്തിൽ യാത്ര ചെയ്തിട്ടില്ല.",
      "options": [
        "A) ever",
        "B) never",
        "C) already",
        "D) recently"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "So far, I have __________ many new practical skills.",
      "questionMl": "ഇതുവരെ ഞാൻ നിരവധി പുതിയ കഴിവുകൾ പഠിച്ചിട്ടുണ്ട്.",
      "options": [
        "A) learn",
        "B) learning",
        "C) learned",
        "D) learns"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "I have __________ completed my comprehensive diploma.",
      "questionMl": "ഞാൻ ഇതിനകം എന്റെ ഡിപ്ലോമ പൂർത്തിയാക്കിയിട്ടുണ്ട്.",
      "options": [
        "A) yet",
        "B) since",
        "C) ever",
        "D) already"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "I have __________ started learning English with a coach.",
      "questionMl": "ഞാൻ അടുത്തിടെ ഇംഗ്ലീഷ് പഠിക്കാൻ തുടങ്ങിയിട്ടുണ്ട്.",
      "options": [
        "A) recently",
        "B) yet",
        "C) ever",
        "D) ago"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"I have went to Dubai.\"",
      "questionMl": "ഈ തെറ്റ് തിരുത്തുക: \"I have went to Dubai.\"",
      "options": [
        "A) I have go to Dubai.",
        "B) I have gone to Dubai.",
        "C) I have going to Dubai.",
        "D) I am went to Dubai."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Correct the error sentence: \"She have completed the course.\"",
      "questionMl": "തെറ്റായ ഈ വാചകം ശരിയാക്കുക: \"She have completed the course.\"",
      "options": [
        "A) She completing the course.",
        "B) She has complete the course.",
        "C) She has completed the course.",
        "D) She have complete the course."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Fix the following error pattern: \"I have saw that movie.\"",
      "questionMl": "ഈ തെറ്റ് തിരുത്തുക: \"I have saw that movie.\"",
      "options": [
        "A) I have see that movie.",
        "B) I sawed that movie.",
        "C) I am saw that movie.",
        "D) I have seen that movie."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Fix this verb mistake: \"He has wrote a book.\"",
      "questionMl": "ഈ ക്രിയാപരമായ തെറ്റ് തിരുത്തുക: \"He has wrote a book.\"",
      "options": [
        "A) He has written a book.",
        "B) He has write a book.",
        "C) He has writing a book.",
        "D) He wrote a book already."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Correct this specific time error: \"I have completed my degree yesterday.\"",
      "questionMl": "ഈ തെറ്റ് തിരുത്തുക: \"I have completed my degree yesterday.\" (കൃത്യമായ സമയം ഉള്ളതിനാൽ സിമ്പിൾ പാസ്റ്റ് വേണം).",
      "options": [
        "A) I have complete my degree yesterday.",
        "B) I completed my degree yesterday.",
        "C) I completing my degree yesterday.",
        "D) I has completed my degree yesterday."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "What is the V3 (Past Participle) form of the verb 'go'?",
      "questionMl": "'go' എന്ന ക്രിയയുടെ ശരിയായ V3 രൂപം ഏതാണ്?",
      "options": [
        "A) went",
        "B) going",
        "C) gone",
        "D) goes"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What is the V3 form of the verb 'see'?",
      "questionMl": "'see' എന്ന ക്രിയയുടെ ശരിയായ V3 രൂപം ഏതാണ്?",
      "options": [
        "A) saw",
        "B) seeing",
        "C) sees",
        "D) seen"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "\"I'm proud of my journey\" translates to:",
      "questionMl": "\"I'm proud of my journey\" എന്നതിന്റെ ശരിയായ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) എനിക്ക് എന്റെ യാത്രയിൽ അഭിമാനമുണ്ട്.",
        "B) ഞാൻ വഴി തെറ്റിപ്പോയി.",
        "C) ഞാൻ ഒന്നും പഠിച്ചിട്ടില്ല.",
        "D) എന്റെ പഠനം കഴിഞ്ഞു."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Which word matches with the meaning \"നേട്ടം\"?",
      "questionMl": "\"നേട്ടം\" എന്ന അർത്ഥം വരുന്ന പവർ വൊക്കാബുലറി വാക്ക് ഏതാണ്?",
      "options": [
        "A) Education",
        "B) Achievement",
        "C) Career",
        "D) Confidence"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "What does the word \"Confidence\" mean in Malayalam?",
      "questionMl": "\"Confidence\" എന്ന വാക്കിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) വിദ്യഭ്യാസം",
        "B) സർട്ടിഫിക്കറ്റ്",
        "C) ആത്മവിശ്വാസം",
        "D) നേതൃത്വം"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Complete the Useful Sentence Pattern: \"I have never __________ up.\"",
      "questionMl": "\"ഞാൻ ഒരിക്കലും പിന്മാറിയിട്ടില്ല.\"",
      "options": [
        "A) give",
        "B) gave",
        "C) giving",
        "D) given"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "\"I have always wanted to become a businessman.\" What does \"always\" mean?",
      "questionMl": "\"I have always wanted to become a businessman.\" എന്നതിൽ \"always\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) എപ്പോഴും",
        "B) ഒരിക്കലും ഇല്ല",
        "C) അടുത്തിടെ",
        "D) ഇതുവരെ"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Select the correct structure used with 'He / She / It':",
      "questionMl": "'He / She / It' എന്നിവയ്ക്കൊപ്പം ഉപയോഗിക്കുന്ന ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + have + V3",
        "B) Subject + has + V3",
        "C) Subject + am + V3",
        "D) Subject + V1"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Complete the dialogue pattern: \"What have you learned from your career?\" — \"I have __________ communication.\"",
      "questionMl": "\"നിങ്ങളുടെ കരിയറിൽ നിന്ന് നിങ്ങൾ എന്താണ് പഠിച്ചത്?\" — \"ഞാൻ ആശയവിനിമയം പഠിച്ചിട്ടുണ്ട്.\"",
      "options": [
        "A) learn",
        "B) learning",
        "C) learned",
        "D) learns"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "\"So far\" is a power usage that means:",
      "questionMl": "\"So far\" എന്ന പവർ യൂസേജിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഒരിയ്ക്കൽ",
        "B) നാളെ",
        "C) വളരെ ദൂരെ",
        "D) ഇതുവരെ"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "\"I have gained valuable experience.\" What does \"valuable\" mean?",
      "questionMl": "\"I have gained valuable experience.\" എന്നതിൽ \"valuable\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) വിലയേറിയ / മൂല്യവത്തായ",
        "B) വിലയില്ലാത്ത",
        "C) പുതിയ",
        "D) പഴയ"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: \"I have _____ worked in a foreign country, but I want to travel soon.\"",
      "questionMl": "ഞാൻ ഇതുവരെ വിദേശത്ത് ജോലി ചെയ്തിട്ടില്ല എന്ന് പറയാൻ:",
      "options": [
        "A) ever",
        "B) never",
        "C) already",
        "D) yet"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "How do you state your career experience so far in an interview?",
      "questionMl": "ഇതുവരെയുള്ള തൊഴിൽ പരിചയത്തെക്കുറിച്ച് അഭിമുഖത്തിൽ പറയാൻ:",
      "options": [
        "A) So far, I gained five years experience in sales.",
        "B) So far, I am gaining five years of experience.",
        "C) So far, I have gained five years of experience in sales.",
        "D) So far, I have gain five years experience."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"Have you _____ visited the historic monuments in Delhi?\"",
      "questionMl": "നിങ്ങൾ എപ്പോഴെങ്കിലും ഡൽഹിയിലെ ചരിത്രസ്മാരകങ്ങൾ സന്ദർശിച്ചിട്ടുണ്ടോ എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) never",
        "B) yet",
        "C) so far",
        "D) ever"
      ],
      "correctIndex": 3
    }
  ],
  "19": [
    {
      "id": 1,
      "question": "Have you finished your work __________?",
      "questionMl": "നിങ്ങൾ നിങ്ങളുടെ ജോലി ഇതുവരെ പൂർത്തിയാക്കിയോ?",
      "options": [
        "A) yet",
        "B) already",
        "C) just",
        "D) still"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "She has __________ left the office.",
      "questionMl": "അവൾ ഇതിനകം ഓഫീസിൽ നിന്ന് പോയിട്ടുണ്ട്.",
      "options": [
        "A) yet",
        "B) already",
        "C) still",
        "D) ago"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "I __________ haven't completed the project.",
      "questionMl": "ഞാൻ ഇപ്പോഴും പ്രോജക്റ്റ് പൂർത്തിയാക്കിയിട്ടില്ല.",
      "options": [
        "A) already",
        "B) yet",
        "C) still",
        "D) just"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "We have __________ reached home.",
      "questionMl": "ഞങ്ങൾ ഇപ്പോൾത്തന്നെ വീട്ടിലെത്തി.",
      "options": [
        "A) yet",
        "B) still",
        "C) tomorrow",
        "D) just"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "They haven't replied __________.",
      "questionMl": "അവർ ഇതുവരെ മറുപടി നൽകിയിട്ടില്ല.",
      "options": [
        "A) yet",
        "B) already",
        "C) just",
        "D) recently"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "I have __________ joined this company.",
      "questionMl": "ഞാൻ അടുത്തിടെ ഈ കമ്പനിയിൽ ചേർന്നിട്ടുണ്ട്.",
      "options": [
        "A) yet",
        "B) recently",
        "C) still",
        "D) already yesterday"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "My manager has just __________ the report.",
      "questionMl": "എന്റെ മാനേജർ ഇപ്പോൾത്തന്നെ റിപ്പോർട്ട് അംഗീകരിച്ചിട്ടുണ്ട്.",
      "options": [
        "A) approve",
        "B) approving",
        "C) approved",
        "D) approves"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "We have already __________ the tickets.",
      "questionMl": "ഞങ്ങൾ ഇതിനകം ടിക്കറ്റുകൾ ബുക്ക് ചെയ്തിട്ടുണ്ട്.",
      "options": [
        "A) book",
        "B) booking",
        "C) books",
        "D) booked"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "She __________ hasn't called me.",
      "questionMl": "അവൾ ഇപ്പോഴും എന്നെ വിളിച്ചിട്ടില്ല.",
      "options": [
        "A) still",
        "B) yet",
        "C) already",
        "D) just"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "What is the correct structure for the Present Perfect Tense?",
      "questionMl": "പ്രസന്റ് പെർഫെക്റ്റ് ടെൻസിന്റെ ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + will + V1",
        "B) Subject + have/has + V3",
        "C) Subject + will be + V+ing",
        "D) Subject + V2"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Identify the correct sentence:",
      "questionMl": "ശരിയായ വാക്യം തിരിച്ചറിയുക:",
      "options": [
        "A) I have just went home.",
        "B) I have already finished yesterday.",
        "C) I have just gone home.",
        "D) Did you finish yet?"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"She has already finish.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"She has already finish.\"",
      "options": [
        "A) She has already finishing.",
        "B) She already finished yesterday.",
        "C) She is already finish.",
        "D) She has already finished."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the correct negative form:",
      "questionMl": "ശരിയായ നെഗറ്റീവ് രൂപം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) I haven't completed it yet.",
        "B) I didn't complete it yet.",
        "C) I not completed it yet.",
        "D) I don't completed it yet."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "\"Yet\" is used mainly in:",
      "questionMl": "\"Yet\" പ്രധാനമായും ഉപയോഗിക്കുന്നത് എവിടെയാണ്?",
      "options": [
        "A) Positive sentences",
        "B) Questions and negative sentences",
        "C) Future predictions",
        "D) Instant decisions"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "I have already __________ the email.",
      "questionMl": "ഞാൻ ഇതിനകം ഇമെയിൽ അയച്ചിട്ടുണ്ട്.",
      "options": [
        "A) send",
        "B) sending",
        "C) sent",
        "D) sends"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Have you booked your ticket __________?",
      "questionMl": "നിങ്ങൾ ടിക്കറ്റ് ഇതുവരെ ബുക്ക് ചെയ്തോ?",
      "options": [
        "A) just",
        "B) still",
        "C) recently",
        "D) yet"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "He has recently __________ English.",
      "questionMl": "അവൻ അടുത്തിടെ ഇംഗ്ലീഷ് പഠിച്ചിട്ടുണ്ട്.",
      "options": [
        "A) learned",
        "B) learn",
        "C) learning",
        "D) learns"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "\"ഇതിനകം\" matches with which English word?",
      "questionMl": "\"ഇതിനകം\" എന്ന അർത്ഥം വരുന്ന ഇംഗ്ലീഷ് വാക്ക് ഏതാണ്?",
      "options": [
        "A) Yet",
        "B) Already",
        "C) Still",
        "D) Just"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "\"അടുത്തിടെ\" matches with which vocabulary word?",
      "questionMl": "\"അടുത്തിടെ\" എന്ന അർത്ഥം വരുന്ന വൊക്കാബുലറി വാക്ക് ഏതാണ്?",
      "options": [
        "A) Just",
        "B) Still",
        "C) Recently",
        "D) Yet"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "\"ഇപ്പോഴും\" matches with which word?",
      "questionMl": "\"ഇപ്പോഴും\" എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Already",
        "B) Yet",
        "C) Just",
        "D) Still"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "\"ഇപ്പോൾത്തന്നെ\" matches with which word?",
      "questionMl": "\"ഇപ്പോൾത്തന്നെ\" എന്ന അർത്ഥം വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Just",
        "B) Yet",
        "C) Still",
        "D) Recently"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Find the mistake: \"Have you finished today's work yesterday?\"",
      "questionMl": "തെറ്റ് കണ്ടെത്തുക: \"Have you finished today's work yesterday?\"",
      "options": [
        "A) finished",
        "B) yesterday (Present Perfect cannot be used with specific past times)",
        "C) today's",
        "D) work"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Complete the sentence: \"We have recently __________ this course.\"",
      "questionMl": "ഞങ്ങൾ അടുത്തിടെ ഈ കോഴ്സ് തുടങ്ങിയിട്ടുണ്ട്.",
      "options": [
        "A) start",
        "B) starting",
        "C) started",
        "D) starts"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "I haven't __________ him yet.",
      "questionMl": "ഞാൻ ഇതുവരെ അവനെ വിളിച്ചിട്ടില്ല.",
      "options": [
        "A) call",
        "B) calling",
        "C) calls",
        "D) called"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "\"Not yet\" translates to:",
      "questionMl": "\"Not yet\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഇതുവരെ ഇല്ല",
        "B) ഇതിനകം കഴിഞ്ഞു",
        "C) ഇപ്പോൾത്തന്നെ",
        "D) എപ്പോഴും"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "\"That's done\" means:",
      "questionMl": "\"That's done\" എന്നതിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) അത് ചെയ്യണം",
        "B) അത് കഴിഞ്ഞു",
        "C) അത് ചെയ്യുന്നില്ല",
        "D) അത് ചെയ്യാം"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "\"I'm waiting for the reply\" translates to:",
      "questionMl": "\"I'm waiting for the reply\" എന്നതിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഞാൻ മറുപടി അയച്ചിട്ടുണ്ട്",
        "B) ഞാൻ മറുപടി തന്നു",
        "C) ഞാൻ മറുപടിക്കായി കാത്തിരിക്കുകയാണ്",
        "D) എനിക്ക് മറുപടി ആവശ്യമില്ല"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Choose the correct past participle (V3) form for 'submit':",
      "questionMl": "'submit' എന്ന ക്രിയയുടെ ശരിയായ V3 രൂപം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) submit",
        "B) submitting",
        "C) submits",
        "D) submitted"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Complete the sentence: \"She has _____ joined our team as a senior project manager.\"",
      "questionMl": "അവൾ അടുത്തിടെയാണ് ഞങ്ങളുടെ ടീമിൽ സീനിയർ പ്രൊജക്റ്റ് മാനേജരായി ചേർന്നത്:",
      "options": [
        "A) recently",
        "B) yet",
        "C) still",
        "D) ago"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"Have you received the client's confirmation email _____?\"",
      "questionMl": "ക്ലയന്റിന്റെ സ്ഥിരീകരണ ഇമെയിൽ ഇതുവരെ ലഭിച്ചോ എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) already",
        "B) yet",
        "C) still",
        "D) just"
      ],
      "correctIndex": 1
    }
  ],
  "20": [
    {
      "id": 1,
      "question": "She __________ become a doctor.",
      "questionMl": "അവൾ ഒരു ഡോക്ടർ ആകാൻ പോകുകയാണ്.",
      "options": [
        "A) am going to",
        "B) are going to",
        "C) is going to",
        "D) going to"
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "We __________ open a new office.",
      "questionMl": "ഞങ്ങൾ ഒരു പുതിയ ഓഫീസ് തുറക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) am going to",
        "B) is going to",
        "C) going to",
        "D) are going to"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "He is going to __________ a new bike.",
      "questionMl": "അവൻ ഒരു പുതിയ ബൈക്ക് വാങ്ങാൻ പോകുകയാണ്.",
      "options": [
        "A) buy",
        "B) bought",
        "C) buying",
        "D) buys"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "I am going to __________ my friend tomorrow.",
      "questionMl": "ഞാൻ നാളെ എന്റെ സുഹൃത്തിനെ കാണാൻ പോകുകയാണ്.",
      "options": [
        "A) met",
        "B) meet",
        "C) meeting",
        "D) meets"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "They are going to __________ a new house next year.",
      "questionMl": "അവർ അടുത്ത വർഷം ഒരു പുതിയ വീട് നിർമ്മിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) built",
        "B) building",
        "C) build",
        "D) builds"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "\"നാളെ\" matches with which future time expression?",
      "questionMl": "\"നാളെ\" എന്ന അർത്ഥം വരുന്ന ഭാവികാല പ്രയോഗം ഏതാണ്?",
      "options": [
        "A) Next week",
        "B) Soon",
        "C) Future",
        "D) Tomorrow"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "\"അടുത്ത മാസം\" translates to:",
      "questionMl": "\"അടുത്ത മാസം\" എന്നതിന്റെ ഇംഗ്ലീഷ് രൂപം ഏതാണ്?",
      "options": [
        "A) Next month",
        "B) Next week",
        "C) Next year",
        "D) Soon"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "I am going to __________ my English.",
      "questionMl": "ഞാൻ എന്റെ ഇംഗ്ലീഷ് മെച്ചപ്പെടുത്താൻ പോകുകയാണ്.",
      "options": [
        "A) improved",
        "B) improve",
        "C) improving",
        "D) improves"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "We are going to __________ a new project.",
      "questionMl": "ഞങ്ങൾ ഒരു പുതിയ പ്രോജക്റ്റ് ആരംഭിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) launched",
        "B) launching",
        "C) launch",
        "D) launches"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "She is going to __________ abroad.",
      "questionMl": "അവൾ വിദേശത്ത് പഠിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) studied",
        "B) studying",
        "C) studies",
        "D) study"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "They are going to __________ tomorrow.",
      "questionMl": "അവർ നാളെ ആഘോഷിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) celebrate",
        "B) celebrated",
        "C) celebrating",
        "D) celebrates"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Identify the correct structure for 'You / We / They':",
      "questionMl": "'You / We / They' എന്നിവയ്ക്കൊപ്പം ഉപയോഗിക്കുന്ന ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + am going to + V1",
        "B) Subject + are going to + V1",
        "C) Subject + is going to + V1",
        "D) Subject + going to + V1"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Identify the mistake: \"I going to start a business.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"I going to start a business.\"",
      "options": [
        "A) start",
        "B) business",
        "C) going (missing 'am')",
        "D) I"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Identify the mistake: \"She are going to study.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"She are going to study.\"",
      "options": [
        "A) study",
        "B) going",
        "C) She",
        "D) are (should be 'is')"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct the sentence: \"We is going to travel.\"",
      "questionMl": "വാക്യം ശരിയാക്കുക: \"We is going to travel.\"",
      "options": [
        "A) We are going to travel.",
        "B) We am going to travel.",
        "C) We going to travel.",
        "D) We will going to travel."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Correct the sentence: \"I am going to starts a business.\"",
      "questionMl": "വാക്യം ശരിയാക്കുക: \"I am going to starts a business.\"",
      "options": [
        "A) I am going to started a business.",
        "B) I am going to start a business.",
        "C) I going to start a business.",
        "D) I am go to start a business."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "\"My plan is to...\" translates to:",
      "questionMl": "\"My plan is to...\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) എന്റെ ലക്ഷ്യം...",
        "B) ഞാൻ പ്രതീക്ഷിക്കുന്നു...",
        "C) എന്റെ പദ്ധതി...",
        "D) എനിക്ക് കാത്തിരിക്കാനാവില്ല..."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "\"My goal is...\" translates to:",
      "questionMl": "\"My goal is...\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) എന്റെ പദ്ധതി...",
        "B) എന്റെ സ്വപ്നം...",
        "C) എന്റെ ജോലി...",
        "D) എന്റെ ലക്ഷ്യം..."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "\"I can't wait to...\" shows:",
      "questionMl": "\"I can't wait to...\" എന്ന പ്രയോഗം എന്തിനെ കാണിക്കുന്നു?",
      "options": [
        "A) വലിയ ആകാക്ഷ/കാത്തിരിക്കാൻ വയ്യ",
        "B) പേടി",
        "C) വിഷമം",
        "D) വിമുഖത"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "What is the Malayalam meaning of \"Career\"?",
      "questionMl": "\"Career\" എന്ന വാക്കിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) വിനോദം",
        "B) തൊഴിൽ/കരിയർ",
        "C) യാത്ര",
        "D) വിജയം"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "\"Dream\" matches with which meaning?",
      "questionMl": "\"Dream\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ലക്ഷ്യം",
        "B) പദ്ധതി",
        "C) സ്വപ്നം",
        "D) വിജയം"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "\"Success\" means:",
      "questionMl": "\"Success\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) പരാജയം",
        "B) അവസരം",
        "C) വിദ്യാഭ്യാസം",
        "D) വിജയം"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "We are going to meet our __________.",
      "questionMl": "ഞങ്ങൾ ഞങ്ങളുടെ ക്ലയന്റുകളെ കാണാൻ പോകുകയാണ്.",
      "options": [
        "A) clients",
        "B) career",
        "C) success",
        "D) future"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "He is going to __________ for a new job.",
      "questionMl": "അവൻ ഒരു പുതിയ ജോലിക്ക് അപേക്ഷിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) applied",
        "B) apply",
        "C) applying",
        "D) applies"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "I am going to __________ more money.",
      "questionMl": "ഞാൻ കൂടുതൽ പണം സംരക്ഷിക്കാൻ പോകുകയാണ്.",
      "options": [
        "A) saved",
        "B) saving",
        "C) save",
        "D) saves"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "\"Soon\" means:",
      "questionMl": "\"Soon\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) നാളെ",
        "B) ഭാവിയിൽ",
        "C) കഴിഞ്ഞ വർഷം",
        "D) ഉടൻ"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "\"In the future\" means:",
      "questionMl": "\"In the future\" എന്ന പ്രയോഗത്തിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഭാവിയിൽ",
        "B) ഇന്നലെ",
        "C) ഉടൻ",
        "D) ഇപ്പോൾ"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Fill in the blank: \"I am _____ start preparing for my civil services examination next month.\"",
      "questionMl": "അടുത്ത മാസം മുതൽ സിവിൽ സർവീസ് പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കാൻ തുടങ്ങാൻ പോവുകയാണ്:",
      "options": [
        "A) go to",
        "B) going to",
        "C) will to",
        "D) went to"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "How do you talk about your family's upcoming holiday plan?",
      "questionMl": "അടുത്ത വാരാന്ത്യത്തിൽ മൂന്നാറിലെ മുത്തശ്ശനെയും മുത്തശ്ശിയെയും സന്ദർശിക്കാൻ പോകുന്നു എന്ന് പറയാൻ:",
      "options": [
        "A) We is going to visit our grandparents next weekend.",
        "B) We are go to visit our grandparents.",
        "C) We are going to visit our grandparents in Munnar next weekend.",
        "D) We going to visit our grandparents."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the question: \"What are you _____ do after completing your degree course?\"",
      "questionMl": "ഡിഗ്രി പഠനം കഴിഞ്ഞാൽ നിങ്ങൾ എന്ത് ചെയ്യാനാണ് ഉദ്ദേശിക്കുന്നത് എന്ന് ചോദിക്കാൻ:",
      "options": [
        "A) go to",
        "B) will",
        "C) gone to",
        "D) going to"
      ],
      "correctIndex": 3
    }
  ],
  "21": [
    {
      "id": 1,
      "question": "Don't worry. Everything __________ be okay.",
      "questionMl": "വിഷമിക്കണ്ട. എല്ലാം ശരിയാകും.",
      "options": [
        "A) will",
        "B) is",
        "C) am",
        "D) will to"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "I __________ call you tonight.",
      "questionMl": "ഞാൻ ഇന്ന് രാത്രി നിന്നെ വിളിക്കും.",
      "options": [
        "A) will to",
        "B) will",
        "C) am will",
        "D) will calling"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "She __________ pass the exam.",
      "questionMl": "അവൾ പരീക്ഷ വിജയിക്കും.",
      "options": [
        "A) will to",
        "B) will studies",
        "C) will",
        "D) am will"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "We __________ finish the project on time.",
      "questionMl": "ഞങ്ങൾ പ്രോജക്റ്റ് സമയത്ത് പൂർത്തിയാക്കും.",
      "options": [
        "A) will to",
        "B) will went",
        "C) are will",
        "D) will"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "I __________ always support you.",
      "questionMl": "ഞാൻ എപ്പോഴും നിന്നെ പിന്തുണയ്ക്കും.",
      "options": [
        "A) will",
        "B) will to",
        "C) am going",
        "D) will goes"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "I __________ forget you.",
      "questionMl": "ഞാൻ നിന്നെ മറക്കില്ല.",
      "options": [
        "A) will not to",
        "B) won't",
        "C) don't will",
        "D) am not will"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "I think it __________ rain today.",
      "questionMl": "ഇന്ന് മഴ പെയ്യുമെന്ന് ഞാൻ കരുതുന്നു.",
      "options": [
        "A) is going",
        "B) to",
        "C) will",
        "D) will to"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "I'm thirsty. I__________ buy some water.",
      "questionMl": "എനിക്ക് ദാഹമുണ്ട്. ഞാൻ വെള്ളം വാങ്ങാം.",
      "options": [
        "A) will to",
        "B) am going",
        "C) will buying",
        "D) 'll"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "I __________ answer the phone.",
      "questionMl": "ഞാൻ ഫോൺ എടുക്കാം.",
      "options": [
        "A) will",
        "B) will to",
        "C) am will",
        "D) will helping"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Identify the correct structure for 'will':",
      "questionMl": "'will' ഉപയോഗിക്കുന്ന ശരിയായ വാക്യ ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + will + V2",
        "B) Subject + will + V1",
        "C) Subject + will + V+ing",
        "D) Subject + will to + V1"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Identify the mistake: \"I will goes tomorrow.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"I will goes tomorrow.\"",
      "options": [
        "A) tomorrow",
        "B) will",
        "C) goes (should be 'go')",
        "D) I"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Identify the mistake: \"She will studies hard.\"",
      "questionMl": "തെറ്റ് തിരിച്ചറിയുക: \"She will studies hard.\"",
      "options": [
        "A) hard",
        "B) will",
        "C) She",
        "D) studies (should be 'study')"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the sentence: \"He will to call you.\"",
      "questionMl": "വാക്യം ശരിയാക്കുക: \"He will to call you.\"",
      "options": [
        "A) He will call you.",
        "B) He will calling you.",
        "C) He will calls you.",
        "D) He is will call you."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the sentence: \"We will went there.\"",
      "questionMl": "വാക്യം ശരിയാക്കുക: \"We will went there.\"",
      "options": [
        "A) We will going there.",
        "B) We will go there.",
        "C) We are will go there.",
        "D) We will gone there."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "\"Trust me\" translates to:",
      "questionMl": "\"Trust me\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) വിഷമിക്കണ്ട",
        "B) ഞാൻ നോക്കിക്കൊള്ളാം",
        "C) എന്നെ വിശ്വസിക്കൂ",
        "D) നീ കാണും"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "\"You'll see\" translates to:",
      "questionMl": "\"You'll see\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) നീ നോക്കൂ",
        "B) നീ പോകൂ",
        "C) നീ ചെയ്യൂ",
        "D) നീ കാണും"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "\"I'll take care of it\" means:",
      "questionMl": "\"I'll take care of it\" എന്ന പ്രയോഗത്തിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഞാൻ അത് നോക്കിക്കൊള്ളാം",
        "B) ഞാൻ അത് മറക്കും",
        "C) അത് വിട്ടേക്കൂ",
        "D) എനിക്ക് അറിയില്ല"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "\"Leave it to me\" means:",
      "questionMl": "\"Leave it to me\" എന്ന പ്രയോഗത്തിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) അത് അവിടെ വെക്കൂ",
        "B) അത് എന്നെ ഏൽപ്പിക്കൂ",
        "C) അത് ചെയ്യണ്ട",
        "D) ഞാൻ പോകുന്നു"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What is the Malayalam meaning of \"Promise\"?",
      "questionMl": "\"Promise\" എന്ന വാക്കിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) ലക്ഷ്യം",
        "B) പ്രവചനം",
        "C) വാഗ്ദാനം",
        "D) വിജയം"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "\"Predict\" means:",
      "questionMl": "\"Predict\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) പിന്തുണയ്ക്കുക",
        "B) വിശ്വസിക്കുക",
        "C) തീരുമാനിക്കുക",
        "D) പ്രവചിക്കുക"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "\"Believe\" means:",
      "questionMl": "\"Believe\" എന്ന വാക്കിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) വിശ്വസിക്കുക",
        "B) മറക്കുക",
        "C) സഹായിക്കുക",
        "D) വിജയിക്കുക"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "\"I won't give up\" translates to:",
      "questionMl": "\"I won't give up\" എന്ന വാചകത്തിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) ഞാൻ സഹായിക്കില്ല",
        "B) ഞാൻ പിന്മാറില്ല",
        "C) ഞാൻ വരാം",
        "D) ഞാൻ വിളിക്കാം"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "\"They will support us\" translates to:",
      "questionMl": "\"They will support us\" എന്നതിന്റെ മലയാളം അർത്ഥം എന്താണ്?",
      "options": [
        "A) അവർ നമ്മളെ വിളിക്കും",
        "B) അവർ നമ്മളെ മറക്കും",
        "C) അവർ നമ്മളെ പിന്തുണക്കും",
        "D) അവർ നമ്മളെ സഹായിക്കില്ല"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "I think you will __________.",
      "questionMl": "നീ വിജയിക്കുമെന്ന് ഞാൻ കരുതുന്നു.",
      "options": [
        "A) success",
        "B) succeeding",
        "C) successful",
        "D) succeed"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Which of the following is an instant decision?",
      "questionMl": "പെട്ടെന്നുള്ള തീരുമാനം കാണിക്കുന്ന വാക്യം ഏതാണ്?",
      "options": [
        "A) I'm thirsty. I'll buy some water.",
        "B) I am going to build a house next year.",
        "C) I have lived here for five years.",
        "D) I went to school yesterday."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "He will __________ a doctor.",
      "questionMl": "അവൻ ഒരു ഡോക്ടർ ആകും.",
      "options": [
        "A) became",
        "B) become",
        "C) becoming",
        "D) becomes"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "\"Everything will be fine\" means:",
      "questionMl": "\"Everything will be fine\" എന്നതിന്റെ അർത്ഥം എന്താണ്?",
      "options": [
        "A) എല്ലാം മോശമാകും",
        "B) ഒന്നും ശരിയാകില്ല",
        "C) എല്ലാം ശരിയാകും",
        "D) ഞാൻ നോക്കാം"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "How do you make a sincere promise to a friend who asked for help?",
      "questionMl": "സുഹൃത്തിന് ഉറപ്പായ ഒരു വാക്ക് നൽകാൻ അനുയോജ്യമായ വാക്യം ഏതാണ്?",
      "options": [
        "A) I promise I will helping you tomorrow.",
        "B) I promise I am will help you.",
        "C) I promise I will to help you.",
        "D) I promise I will definitely help you with your project tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Fill in the blank with the correct negative future form: \"Don't worry, I _____ tell your secret to anyone.\"",
      "questionMl": "വിഷമിക്കേണ്ട, ഞാൻ ഈ രഹസ്യം ആരോടും പറയില്ല എന്ന് ഉറപ്പ് നൽകാൻ:",
      "options": [
        "A) won't",
        "B) will",
        "C) am not",
        "D) don't will"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the prediction: \"Looking at the dark clouds in the sky, I think it _____ rain heavily this evening.\"",
      "questionMl": "ആകാശത്തെ കാർമേഘങ്ങൾ കണ്ടിട്ട് ഇന്ന് വൈകുന്നേരം കനത്ത മഴ പെയ്യുമെന്ന് തോന്നുന്നു:",
      "options": [
        "A) is will",
        "B) will",
        "C) will to",
        "D) won't to"
      ],
      "correctIndex": 1
    }
  ],
  "22": [
    {
      "id": 1,
      "question": "Choose the correct Future Continuous sentence:",
      "questionMl": "ശരിയായ ഫ്യൂച്ചർ കണ്ടിന്യൂവസ് വാചകം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) At this time tomorrow, I will study for my exam.",
        "B) At this time tomorrow, I am studying for my exam.",
        "C) At this time tomorrow, I will be studying for my exam.",
        "D) At this time tomorrow, I studied for my exam."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "What is the correct negative structure of the Future Continuous Tense?",
      "questionMl": "ഫ്യൂച്ചർ കണ്ടിന്യൂവസ് ടെൻസിന്റെ ശരിയായ നെഗറ്റീവ് ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + will be not + Verb+ing",
        "B) Subject + not will be + Verb+ing",
        "C) Subject + will be no + Verb+ing",
        "D) Subject + will not (won't) + be + Verb+ing"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Complete the sentence: \"She _____ (not / attend) the meeting tomorrow afternoon.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"അവൾ നാളെ ഉച്ചയ്ക്ക് മീറ്റിംഗിൽ പങ്കെടുക്കുകയായിരിക്കില്ല.\"",
      "options": [
        "A) won't be attending",
        "B) won't attending",
        "C) won't be attend",
        "D) isn't be attending"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Choose the correct question form: \"_____ you be traveling to Dubai next week?\"",
      "questionMl": "ശരിയായ ചോദ്യരൂപം തിരഞ്ഞെടുക്കുക: \"നിങ്ങൾ അടുത്ത ആഴ്ച ദുബായിലേക്ക് യാത്ര ചെയ്യുകയായിരിക്കുമോ?\"",
      "options": [
        "A) Do",
        "B) Will",
        "C) Are",
        "D) Have"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Identify the INCORRECT sentence:",
      "questionMl": "തെറ്റായ വാചകം കണ്ടെത്തുക:",
      "options": [
        "A) He will be working tomorrow morning.",
        "B) They will be playing football.",
        "C) I will studying tomorrow.",
        "D) We will be going there."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Correct the sentence: \"She will be study.\"",
      "questionMl": "തെറ്റായ വാചകം തിരുത്തുക: \"She will be study.\"",
      "options": [
        "A) She will studying.",
        "B) She will be studies.",
        "C) She will studied.",
        "D) She will be studying."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Fill in the blank: \"At this time tomorrow, we _____ to Delhi.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നാളെ ഈ സമയത്ത് ഞങ്ങൾ ഡൽഹിയിലേക്ക് യാത്ര ചെയ്യുകയായിരിക്കും.\"",
      "options": [
        "A) will be flying",
        "B) will fly",
        "C) will flying",
        "D) are fly"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Complete the WH-question: \"What _____ you be doing tomorrow morning?\"",
      "questionMl": "WH-ചോദ്യം പൂർത്തിയാക്കുക: \"നാളെ രാവിലെ നിങ്ങൾ എന്ത് ചെയ്യുകയായിരിക്കും?\"",
      "options": [
        "A) do",
        "B) will",
        "C) are",
        "D) have"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Choose the correct response to: \"Will you be studying tonight?\"",
      "questionMl": "ഈ ചോദ്യത്തിന് ശരിയായ ഉത്തരം തിരഞ്ഞെടുക്കുക: \"നിങ്ങൾ ഇന്ന് രാത്രി പഠിക്കുകയായിരിക്കുമോ?\"",
      "options": [
        "A) Yes, I am.",
        "B) Yes, I do.",
        "C) Yes, I will.",
        "D) Yes, I be."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Fill in the blank: \"Which project _____ she be working on?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൾ ഏത് പ്രോജക്റ്റിലാണ് ജോലി ചെയ്യുകയായിരിക്കുക?\"",
      "options": [
        "A) does",
        "B) is",
        "C) has",
        "D) will"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which English sentence matches: \"ഞങ്ങൾ അടുത്ത ആഴ്ച യാത്ര ചെയ്യുകയായിരിക്കും.\"?",
      "questionMl": "\"ഞങ്ങൾ അടുത്ത ആഴ്ച യാത്ര ചെയ്യുകയായിരിക്കും\" എന്നതിന് അനുയോജ്യമായ ഇംഗ്ലീഷ് വാചകം ഏതാണ്?",
      "options": [
        "A) We will be travelling next week.",
        "B) We travel next week.",
        "C) We were travelling next week.",
        "D) We have travelled next week."
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Which power phrase is commonly used with the Future Continuous Tense?",
      "questionMl": "ഫ്യൂച്ചർ കണ്ടിന്യൂവസ് ടെൻസിനൊപ്പം സാധാരണയായി ഉപയോഗിക്കുന്ന പവർ ഫ്രെയ്സ് ഏതാണ്?",
      "options": [
        "A) Since yesterday...",
        "B) At this time tomorrow...",
        "C) For two hours...",
        "D) Last night..."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Complete the sentence: \"My father _____ to work at 8 AM tomorrow.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"എന്റെ അച്ഛൻ നാളെ രാവിലെ 8 മണിക്ക് ജോലിയിലേക്ക് ഡ്രൈവ് ചെയ്യുകയായിരിക്കും.\"",
      "options": [
        "A) will drive be",
        "B) will driving",
        "C) will be driving",
        "D) is be driving"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Choose the correct negative sentence:",
      "questionMl": "ശരിയായ നെഗറ്റീവ് വാചകം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) I won't working tomorrow.",
        "B) I will be not working tomorrow.",
        "C) I not will be working tomorrow.",
        "D) I won't be working tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Fill in the blank: \"_____ car will you be driving?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നിങ്ങൾ ആരുടെ കാറാണ് ഓടിക്കുകയായിരിക്കുക?\"",
      "options": [
        "A) Whose",
        "B) Who",
        "C) Whom",
        "D) Which one"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Fill in the blank: \"Where _____ they be staying during the vacation?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവധിക്ക് അവർ എവിടെയാണ് താമസിക്കുകയായിരിക്കുക?\"",
      "options": [
        "A) are",
        "B) will",
        "C) do",
        "D) have"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "What is the correct structure for Yes/No questions in the Future Continuous Tense?",
      "questionMl": "ഫ്യൂച്ചർ കണ്ടിന്യൂവസ് ടെൻസിലെ Yes/No ചോദ്യങ്ങളുടെ ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Will + Subject + Verb+ing?",
        "B) Be + Subject + will + Verb+ing?",
        "C) Will + Subject + be + Verb+ing?",
        "D) Subject + will + be + Verb+ing?"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Choose the correct option: \"This time next week, we _____ our success.\"",
      "questionMl": "ശരിയായ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക: \"അടുത്ത ആഴ്ച ഈ സമയത്ത് ഞങ്ങൾ ഞങ്ങളുടെ വിജയം ആഘോഷിക്കുകയായിരിക്കും.\"",
      "options": [
        "A) will celebrating",
        "B) celebrated",
        "C) celebrate",
        "D) will be celebrating"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Fill in the blank: \"Who _____ teaching tomorrow?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നാളെ ആരാണ് പഠിപ്പിക്കുകയായിരിക്കുക?\"",
      "options": [
        "A) will be",
        "B) will",
        "C) is be",
        "D) shall"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Complete the sentence: \"The students _____ English at this time tomorrow.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"വിദ്യാർത്ഥികൾ നാളെ ഈ സമയത്ത് ഇംഗ്ലീഷ് പഠിച്ചുകൊണ്ടിരിക്കുകയായിരിക്കും.\"",
      "options": [
        "A) will learn be",
        "B) will be learning",
        "C) learning",
        "D) will be learn"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Which vocabulary word means \"a plan of activities and times\"?",
      "questionMl": "\"പ്രവർത്തനങ്ങളുടെയും സമയങ്ങളുടെയും പ്ലാൻ/ക്രമം\" എന്നതിനെ കുറിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Journey",
        "B) Vacation",
        "C) Schedule",
        "D) Assignment"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Choose the correct option: \"I won't be using my phone _____ class.\"",
      "questionMl": "ശരിയായ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക: \"ക്ലാസ് സമയത്ത് ഞാൻ ഫോൺ ഉപയോഗിക്കുകയായിരിക്കില്ല.\"",
      "options": [
        "A) for",
        "B) since",
        "C) until",
        "D) during"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Correct the error: \"They will be travel.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"They will be travel.\"",
      "options": [
        "A) They will be travelling.",
        "B) They will travelling.",
        "C) They travel.",
        "D) They will be travelled."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Complete the question: \"How _____ you be preparing for the presentation?\"",
      "questionMl": "ചോദ്യം പൂർത്തിയാക്കുക: \"പ്രസന്റേഷനായി നിങ്ങൾ എങ്ങനെയാണ് തയ്യാറെടുക്കുകയായിരിക്കുക?\"",
      "options": [
        "A) are",
        "B) will",
        "C) do",
        "D) were"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Fill in the blank: \"Whom _____ she be calling later?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൾ പിന്നീട് ആരെയാണ് വിളിക്കുകയായിരിക്കുക?\"",
      "options": [
        "A) is",
        "B) does",
        "C) will",
        "D) has"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Which sentence describes a planned ongoing future action?",
      "questionMl": "ഭാവിയിൽ നടക്കുന്ന ongoing പ്രവർത്തനത്തെ വിവരിക്കുന്ന വാചകം ഏതാണ്?",
      "options": [
        "A) I studied yesterday.",
        "B) I am a teacher.",
        "C) I have finished my homework.",
        "D) I will be writing my exam tomorrow morning."
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Choose the correct short negative answer to: \"Will she be attending the meeting?\"",
      "questionMl": "\"Will she be attending the meeting?\" എന്ന ചോദ്യത്തിന് ശരിയായ ചുരുങ്ങിയ നെഗറ്റീവ് ഉത്തരം ഏതാണ്?",
      "options": [
        "A) No, she won't.",
        "B) No, she doesn't.",
        "C) No, she isn't.",
        "D) No, she hasn't."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: \"My brother _____ joining us tomorrow.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"എന്റെ സഹോദരൻ നാളെ ഞങ്ങളോടൊപ്പം ചേരുകയായിരിക്കില്ല.\"",
      "options": [
        "A) won't",
        "B) won't be",
        "C) not will be",
        "D) doesn't be"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct translation for: \"നാളെ ഈ സമയത്ത് ഞാൻ പ്രസന്റേഷൻ തയ്യാറാക്കുകയായിരിക്കും.\"",
      "questionMl": "\"നാളെ ഈ സമയത്ത് ഞാൻ പ്രസന്റേഷൻ തയ്യാറാക്കുകയായിരിക്കും\" എന്നതിന്റെ ശരിയായ പരിഭാഷ ഏതാണ്?",
      "options": [
        "A) I prepared my presentation tomorrow at this time.",
        "B) I prepare my presentation tomorrow.",
        "C) I will be preparing my presentation at this time tomorrow.",
        "D) I have prepared my presentation at this time tomorrow."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Fill in the blank: \"Why _____ you be working late tonight?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നിങ്ങൾ എന്തുകൊണ്ടാണ് ഇന്ന് രാത്രി വൈകി ജോലി ചെയ്യുകയായിരിക്കുക?\"",
      "options": [
        "A) are",
        "B) do",
        "C) did",
        "D) will"
      ],
      "correctIndex": 3
    }
  ],
  "23": [
    {
      "id": 1,
      "question": "What is the correct structure for the Present Perfect Continuous Tense?",
      "questionMl": "പ്രസന്റ് പെർഫെക്റ്റ് കണ്ടിന്യൂവസ് ടെൻസിന്റെ ശരിയായ ഘടന ഏതാണ്?",
      "options": [
        "A) Subject + have/has been + Verb+ing",
        "B) Subject + has/have + Verb+ing",
        "C) Subject + had been + Verb",
        "D) Subject + is/are + Verb+ing"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct option: \"I _____ English for six months.\"",
      "questionMl": "ശരിയായ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക: \"ഞാൻ ആറുമാസമായി ഇംഗ്ലീഷ് പഠിച്ചുകൊണ്ടിരിക്കുകയാണ്.\"",
      "options": [
        "A) has been learning",
        "B) have been learning",
        "C) am learning",
        "D) was learning"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "Fill in the blank: \"She has been working here _____ 2023.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൾ 2023 മുതൽ ഇവിടെ ജോലി ചെയ്യുകയാണ്.\"",
      "options": [
        "A) for",
        "B) from",
        "C) since",
        "D) during"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Fill in the blank: \"We have been waiting _____ an hour.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഞങ്ങൾ ഒരു മണിക്കൂറായി കാത്തിരിക്കുകയാണ്.\"",
      "options": [
        "A) since",
        "B) from",
        "C) by",
        "D) for"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "When do we use \"for\"?",
      "questionMl": "\"for\" എപ്പോഴാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) To show a duration of time",
        "B) To show a starting point in time",
        "C) To show a future event",
        "D) To show a completed past action"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "When do we use \"since\"?",
      "questionMl": "\"since\" എപ്പോഴാണ് ഉപയോഗിക്കുന്നത്?",
      "options": [
        "A) To show a duration of time",
        "B) To show a starting point in time",
        "C) To show frequency",
        "D) To show a general rule"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Which time phrase requires \"since\"?",
      "questionMl": "ഏത് സമയ സൂചകത്തിനാണ് \"since\" ആവശ്യമുള്ളത്?",
      "options": [
        "A) two hours",
        "B) three days",
        "C) Monday",
        "D) ten years"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which time phrase requires \"for\"?",
      "questionMl": "ഏത് സമയ സൂചകത്തിനാണ് \"for\" ആവശ്യമുള്ളത്?",
      "options": [
        "A) 8 AM",
        "B) January",
        "C) 2024",
        "D) six months"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Choose the correct negative form: \"She _____ coming to class regularly.\"",
      "questionMl": "ശരിയായ നെഗറ്റീവ് രൂപം തിരഞ്ഞെടുക്കുക: \"അവൾ സ്ഥിരമായി ക്ലാസിൽ വരുന്നില്ല.\"",
      "options": [
        "A) hasn't been",
        "B) haven't been",
        "C) don't been",
        "D) isn't been"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Complete the question: \"_____ you been learning English for long?\"",
      "questionMl": "ചോദ്യം പൂർത്തിയാക്കുക: \"നിങ്ങൾ വളരെക്കാലമായി ഇംഗ്ലീഷ് പഠിക്കുകയാണോ?\"",
      "options": [
        "A) Has",
        "B) Have",
        "C) Do",
        "D) Are"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct short answer: \"Has she been working here since January?\" → \"Yes, ____.\"",
      "questionMl": "ശരിയായ ചുരുങ്ങിയ ഉത്തരം തിരഞ്ഞെടുക്കുക: \"അവൾ ജനുവരി മുതൽ ഇവിടെ ജോലി ചെയ്യുകയാണോ?\"",
      "options": [
        "A) she is",
        "B) she does",
        "C) she has",
        "D) she will"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Identify the INCORRECT sentence:",
      "questionMl": "തെറ്റായ വാചകം കണ്ടെത്തുക:",
      "options": [
        "A) I have been learning English.",
        "B) She has been working here since Monday.",
        "C) We have been waiting for an hour.",
        "D) I have been studying since two years."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the sentence: \"He has been living for 2022.\"",
      "questionMl": "വാചകം തിരുത്തുക: \"He has been living for 2022.\"",
      "options": [
        "A) He has been living since 2022.",
        "B) He lives for 2022.",
        "C) He has living since 2022.",
        "D) He is living for 2022."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Complete the question: \"What _____ you been doing since morning?\"",
      "questionMl": "ചോദ്യം പൂർത്തിയാക്കുക: \"രാവിലെ മുതൽ നിങ്ങൾ എന്താണ് ചെയ്യുന്നത്?\"",
      "options": [
        "A) has",
        "B) have",
        "C) do",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Fill in the blank: \"Since when _____ she been working here?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"എപ്പോൾ മുതലാണ് അവൾ ഇവിടെ ജോലി ചെയ്യുന്നത്?\"",
      "options": [
        "A) have",
        "B) is",
        "C) has",
        "D) was"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Fill in the blank: \"Which project _____ he been handling?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൻ ഏത് പ്രോജക്റ്റാണ് കൈകാര്യം ചെയ്യുന്നത്?\"",
      "options": [
        "A) have",
        "B) is",
        "C) does",
        "D) has"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Choose the correct sentence:",
      "questionMl": "ശരിയായ വാചകം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) I have been learning English for six months.",
        "B) I have been learn English for six months.",
        "C) I have learning English for six months.",
        "D) I am learning English since six months."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Fill in the blank: \"He _____ reading this book since Monday.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൻ തിങ്കളാഴ്ച മുതൽ ഈ പുസ്തകം വായിച്ചുകൊണ്ടിരിക്കുകയാണ്.\"",
      "options": [
        "A) have been",
        "B) has been",
        "C) is been",
        "D) was been"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Choose the correct option: \"My English has been _____ day by day.\"",
      "questionMl": "ശരിയായ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക: \"എന്റെ ഇംഗ്ലീഷ് ഓരോ ദിവസവും മെച്ചപ്പെട്ടുകൊണ്ടിരിക്കുകയാണ്.\"",
      "options": [
        "A) improve",
        "B) improved",
        "C) improving",
        "D) improves"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Fill in the blank: \"_____ laptop has she been using?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൾ ആരുടെ ലാപ്ടോപ്പാണ് ഉപയോഗിക്കുന്നത്?\"",
      "options": [
        "A) Who",
        "B) Whom",
        "C) Which",
        "D) Whose"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Select the correct translation for: \"ഞങ്ങൾ കഴിഞ്ഞ മാസം മുതൽ പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കുകയാണ്.\"",
      "questionMl": "\"ഞങ്ങൾ കഴിഞ്ഞ മാസം മുതൽ പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കുകയാണ്\" എന്നതിന്റെ ശരിയായ ഇംഗ്ലീഷ് വാചകം ഏതാണ്?",
      "options": [
        "A) We have been preparing for the exam since last month.",
        "B) We prepared for the exam last month.",
        "C) We are preparing for the exam for last month.",
        "D) We will be preparing for the exam since last month."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Fill in the blank: \"They _____ living in Kochi for five years.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവർ അഞ്ച് വർഷമായി കൊച്ചിയിൽ താമസിക്കുകയാണ്.\"",
      "options": [
        "A) has been",
        "B) have been",
        "C) having been",
        "D) are been"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Choose the correct negative sentence: \"I _____ sleeping well recently.\"",
      "questionMl": "ശരിയായ നെഗറ്റീവ് വാചകം തിരഞ്ഞെടുക്കുക: \"ഞാൻ അടുത്തിടെ നന്നായി ഉറങ്ങുന്നില്ല.\"",
      "options": [
        "A) hasn't been",
        "B) not have been",
        "C) haven't been",
        "D) am not been"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct question word filler: \"Why _____ you been working late?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നിങ്ങൾ എന്തുകൊണ്ടാണ് വൈകി ജോലി ചെയ്യുന്നത്?\"",
      "options": [
        "A) has",
        "B) are",
        "C) do",
        "D) have"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Select the correct vocabulary word meaning \"doing something regularly and steadily\":",
      "questionMl": "\"ഒരു കാര്യം കൃത്യമായും സ്ഥിരമായും ചെയ്യുക\" എന്നതിനെ കുറിക്കുന്ന പദം ഏതാണ്?",
      "options": [
        "A) Consistency",
        "B) Journey",
        "C) Routine",
        "D) Experience"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Correct the mistake: \"We have been waited for an hour.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"We have been waited for an hour.\"",
      "options": [
        "A) We have waiting for an hour.",
        "B) We have been waiting for an hour.",
        "C) We have wait for an hour.",
        "D) We are waited for an hour."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Fill in the blank: \"How _____ you been preparing for the interview?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഇന്റർവ്യൂവിനായി നിങ്ങൾ എങ്ങനെയാണ് തയ്യാറെടുക്കുന്നത്?\"",
      "options": [
        "A) has",
        "B) do",
        "C) have",
        "D) are"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Choose the correct preposition: \"I have been working _____ my goals.\"",
      "questionMl": "ശരിയായ പ്രിപ്പോസിഷൻ തിരഞ്ഞെടുക്കുക: \"ഞാൻ എന്റെ ലക്ഷ്യങ്ങൾക്കായി പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുകയാണ്.\"",
      "options": [
        "A) since",
        "B) into",
        "C) from",
        "D) towards"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Fill in the blank: \"She hasn't been _____ my calls.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവൾ എന്റെ കോളുകൾക്ക് മറുപടി നൽകുന്നില്ല.\"",
      "options": [
        "A) answering",
        "B) answer",
        "C) answered",
        "D) answers"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the sentence: \"She has been practicing yoga every morning _____ three years.\"",
      "questionMl": "ഒരു നിശ്ചിത കാലയളവിനെ (three years) സൂചിപ്പിക്കാൻ 'for' ഉപയോഗിക്കുക:",
      "options": [
        "A) since",
        "B) for",
        "C) from",
        "D) during"
      ],
      "correctIndex": 1
    }
  ],
  "24": [
    {
      "id": 1,
      "question": "Which is the most polite way to ask a shopkeeper to show an item?",
      "questionMl": "ഒരു കടക്കാരനോട് ഒരു സാധനം കാണിക്കാൻ ആവശ്യപ്പെടാനുള്ള ഏറ്റവും മര്യാദയുള്ള മാർഗം ഏതാണ്?",
      "options": [
        "A) Give me this shirt.",
        "B) Show shirt now.",
        "C) Could you please show me this shirt?",
        "D) I want this shirt instantly."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "How should you politely ask for the price of an item?",
      "questionMl": "ഒരു സാധനത്തിന്റെ വില മര്യാദയോടെ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) What price?",
        "B) Give price list.",
        "C) Tell money.",
        "D) How much does this cost?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "If an item costs too much money, what can you say?",
      "questionMl": "ഒരു സാധനത്തിന് വളരെ ഉയർന്ന വിലയാണെങ്കിൽ നിങ്ങൾക്ക് എന്താണ് പറയാൻ സാധിക്കുക?",
      "options": [
        "A) This is too expensive.",
        "B) This is cheap.",
        "C) This is low price.",
        "D) Give free."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "How do you politely request a lower price?",
      "questionMl": "വില കുറച്ചു തരാൻ മര്യാദയോടെ എങ്ങനെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) I want discount.",
        "B) Can you give me a discount?",
        "C) Cut the price down.",
        "D) Less money please."
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "What do you say when you want to test if clothes fit you?",
      "questionMl": "വസ്ത്രങ്ങൾ ധരിച്ചു നോക്കാമോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Can I wear this home?",
        "B) Can I test this?",
        "C) Can I try this on?",
        "D) Can I dress it?"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Which sentence is used to state what you are searching for in a store?",
      "questionMl": "നിങ്ങൾ കടയിൽ എന്താണ് അന്വേഷിക്കുന്നത് എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) I look sports shoes.",
        "B) I searching sports shoes.",
        "C) I am look sports shoes.",
        "D) I'm looking for sports shoes."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you politely ask for a payment receipt?",
      "questionMl": "പേയ്മെന്റ് ബിൽ മര്യാദയോടെ എങ്ങനെ ചോദിച്ചു വാങ്ങാം?",
      "options": [
        "A) Could I have the receipt, please?",
        "B) I need bill.",
        "C) Give receipt paper.",
        "D) Pay bill now."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "What is the person who works at the checkout counter called?",
      "questionMl": "ക്യാഷ് കൗണ്ടറിൽ ജോലി ചെയ്യുന്ന വ്യക്തിയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Customer",
        "B) Cashier",
        "C) Brand",
        "D) Quality"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "If you want a different color, how do you ask?",
      "questionMl": "മറ്റൊരു നിറത്തിൽ ഉണ്ടോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Give black color.",
        "B) Is black color existing?",
        "C) Do you have this in black?",
        "D) Why not black?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Correct the mistake: \"Pack this.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Pack this.\"",
      "options": [
        "A) Packing this.",
        "B) Pack this quickly.",
        "C) You pack this item.",
        "D) Could you please pack this?"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Which word refers to a company's unique product name or mark?",
      "questionMl": "ഒരു കമ്പനിയുടെ ഉൽപ്പന്ന നാമത്തെയോ അടയാളത്തെയോ കുറിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Brand",
        "B) Discount",
        "C) Wallet",
        "D) Change"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What does \"UPI\" refer to in shopping contexts?",
      "questionMl": "ഷോപ്പിംഗിൽ \"UPI\" എന്നത് എന്തിനെ സൂചിപ്പിക്കുന്നു?",
      "options": [
        "A) A clothing brand",
        "B) A digital payment method",
        "C) A store location",
        "D) A type of discount"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "If you want a bigger size in clothing, what do you ask?",
      "questionMl": "വലിയ സൈസ് ഉണ്ടോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Give big size.",
        "B) Make it larger.",
        "C) Do you have a larger size?",
        "D) Where is big size?"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Which phrase expresses that you have decided to buy an item?",
      "questionMl": "ഒരു സാധനം വാങ്ങാൻ നിങ്ങൾ തീരുമാനിച്ചു എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) I'm looking for this.",
        "B) I leave this one.",
        "C) I try this on.",
        "D) I'll take this one."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "What is the balance money returned after paying with a larger currency note called?",
      "questionMl": "വലിയ നോട്ട് നൽകിയ ശേഷം തിരികെ ലഭിക്കുന്ന ബാക്കി പണത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Change",
        "B) Bill",
        "C) Offer",
        "D) Receipt"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "If an item is damaged, what store policy allows you to replace it?",
      "questionMl": "ഒരു സാധനം കേടാണെങ്കിൽ അത് മാറ്റി വാങ്ങാൻ സഹായിക്കുന്ന കടയുടെ പോളിസി ഏതാണ്?",
      "options": [
        "A) Price tag policy",
        "B) Return / Exchange policy",
        "C) Cashier policy",
        "D) Brand policy"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Identify the correct sentence for asking about card payment:",
      "questionMl": "കാർഡ് ഉപയോഗിച്ച് പണം നൽകുന്നതിനെക്കുറിച്ച് ചോദിക്കുന്ന ശരിയായ വാചകം ഏതാണ്?",
      "options": [
        "A) Am I pay card?",
        "B) Do I giving card?",
        "C) Can I pay by card?",
        "D) Card payment do?"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Select the correct vocabulary word for a document showing proof of purchase:",
      "questionMl": "സാധനം വാങ്ങിയതിന്റെ തെളിവായി ലഭിക്കുന്ന രേഖയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Wallet",
        "B) Counter",
        "C) Offer",
        "D) Receipt"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Which phrase is a standard polite closing when leaving a shop?",
      "questionMl": "കടയിൽ നിന്ന് ഇറങ്ങുമ്പോൾ പറയുന്ന മര്യാദയുള്ള വാചകം ഏതാണ്?",
      "options": [
        "A) Have a nice day.",
        "B) Give me more.",
        "C) Stop working.",
        "D) Pay me back."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Complete the conversation:",
      "questionMl": "സംഭാഷണം പൂർത്തിയാക്കുക:",
      "options": [
        "A) I looking",
        "B) I'm looking for",
        "C) I look to",
        "D) I am look"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct spelling and usage: \"Could you please give me a _____ on this item?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഡിസ്കൗണ്ട്\" എന്നതിന്റെ ശരിയായ സ്പെല്ലിംഗ് ഏതാണ്?",
      "options": [
        "A) disscount",
        "B) descount",
        "C) discount",
        "D) discunt"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Which shop would you visit to buy medicines?",
      "questionMl": "മരുന്നുകൾ വാങ്ങാൻ ഏത് കടയിലാണ് പോകേണ്ടത്?",
      "options": [
        "A) Footwear shop",
        "B) Bookstore",
        "C) Jewellery shop",
        "D) Medical shop / Pharmacy"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "What does \"quality\" refer to?",
      "questionMl": "\"Quality\" (ഗുണനിലവാരം) എന്നത് എന്തിനെയാണ് സൂചിപ്പിക്കുന്നത്?",
      "options": [
        "A) How good or well-made something is",
        "B) How much something costs",
        "C) The size of the shop",
        "D) The color of the item"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the best response when the shopkeeper asks: \"What size do you need?\"",
      "questionMl": "\"What size do you need?\" എന്ന ചോദ്യത്തിന് ഏറ്റവും അനുയോജ്യമായ ഉത്തരം ഏതാണ്?",
      "options": [
        "A) Yes, I do.",
        "B) Medium, please.",
        "C) ₹1,250.",
        "D) By card."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Correct the mistake: \"What price?\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"What price?\"",
      "options": [
        "A) How price is?",
        "B) Which price this?",
        "C) How much does this cost?",
        "D) What is cost price?"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"That's _____. I'll take it.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അത് വളരെ അനുയോജ്യമാണ്. ഞാൻ ഇതെടുത്തോളാം.\"",
      "options": [
        "A) expensive",
        "B) wrong",
        "C) bad",
        "D) perfect"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "When a shop offers 10% off the original price, what is it called?",
      "questionMl": "വിലയിൽ നിന്ന് 10% കുറവ് നൽകുമ്പോൾ അതിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) A discount / offer",
        "B) A price hike",
        "C) A bill",
        "D) An exchange"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Which tense is used in: \"I'm looking for sports shoes\"?",
      "questionMl": "\"I'm looking for sports shoes\" എന്ന വാചകത്തിൽ ഉപയോഗിച്ചിരിക്കുന്ന ടെൻസ് ഏതാണ്?",
      "options": [
        "A) Simple Present",
        "B) Present Continuous",
        "C) Simple Past",
        "D) Future Continuous"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Which tense is used in: \"I bought this shirt yesterday\"?",
      "questionMl": "\"I bought this shirt yesterday\" എന്ന വാചകത്തിൽ ഉപയോഗിച്ചിരിക്കുന്ന ടെൻസ് ഏതാണ്?",
      "options": [
        "A) Present Perfect",
        "B) Future Continuous",
        "C) Simple Past",
        "D) Simple Present"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "What is the definition of a \"customer\"?",
      "questionMl": "\"Customer\" (ഉപഭോക്താവ്) എന്നാൽ ആര്?",
      "options": [
        "A) The person selling goods",
        "B) The store owner",
        "C) The security guard",
        "D) The person buying goods or services"
      ],
      "correctIndex": 3
    }
  ],
  "25": [
    {
      "id": 1,
      "question": "How do you politely ask for the food menu at a restaurant?",
      "questionMl": "ഒരു റെസ്റ്റോറന്റിൽ ഭക്ഷണം തിരഞ്ഞെടുക്കാനുള്ള മെനു മര്യാദയോടെ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Could I see the menu, please?",
        "B) Give menu.",
        "C) I want menu now.",
        "D) Where menu paper?"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "What is the polite way to order a dish like chicken biryani?",
      "questionMl": "ചിക്കൻ ബിരിയാണി ഓർഡർ ചെയ്യാനുള്ള മര്യാദയുള്ള രീതി ഏതാണ്?",
      "options": [
        "A) Give me biryani.",
        "B) I'd like to have chicken biryani, please.",
        "C) Bring biryani fast.",
        "D) Biryani send to table."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "How do you ask the waiter for a food recommendation?",
      "questionMl": "റെസ്റ്റോറന്റിലെ വെയ്റ്ററോട് നല്ല വിഭവം നിർദ്ദേശിക്കാൻ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) What is food?",
        "B) Tell me what to eat.",
        "C) What do you recommend?",
        "D) Which food is there?"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "How do you politely ask to reduce the spice level in a dish?",
      "questionMl": "ഒരു വിഭവത്തിൽ എരിവ് കുറയ്ക്കാൻ എങ്ങനെ മര്യാദയോടെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) Too spicy.",
        "B) Don't put chilli.",
        "C) No spice item.",
        "D) Could you make it less spicy?"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "How do you politely ask for drinking water?",
      "questionMl": "കുടിവെള്ളം മര്യാദയോടെ എങ്ങനെ ചോദിച്ചു വാങ്ങാം?",
      "options": [
        "A) Could I have some water, please?",
        "B) Bring water.",
        "C) Water give me.",
        "D) Need water now."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "How do you politely request the final bill after eating?",
      "questionMl": "ഭക്ഷണശേഷം ബിൽ തരാൻ മര്യാദയോടെ എങ്ങനെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) Bill.",
        "B) Could you bring the bill, please?",
        "C) Money bill give.",
        "D) How much total?"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "What is a \"starter\" in a restaurant menu?",
      "questionMl": "റെസ്റ്റോറന്റ് മെനുവിലെ \"starter\" എന്നാൽ എന്ത്?",
      "options": [
        "A) The final sweet item",
        "B) A hot drink after dinner",
        "C) A small dish served before the main meal",
        "D) The bill received at the end"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which word refers to drinks like coffee, tea, or juice?",
      "questionMl": "കാപ്പി, ചായ, ജ്യൂസ് പോലുള്ള പാനീയങ്ങളെ കുറിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Dessert",
        "B) Main course",
        "C) Starter",
        "D) Beverage"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "What is the sweet item eaten at the end of a meal called?",
      "questionMl": "ഭക്ഷണശേഷം കഴിക്കുന്ന മധുരപലഹാരത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Dessert",
        "B) Starter",
        "C) Beverage",
        "D) Recipe"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "How do you ask if a dish contains no meat or fish?",
      "questionMl": "ഒരു വിഭവം വെജിറ്റേറിയനാണോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Food no meat?",
        "B) Is this dish vegetarian?",
        "C) Vegetable inside?",
        "D) Is this meat free?"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "What is the person who serves food in a restaurant called?",
      "questionMl": "റെസ്റ്റോറന്റിൽ ഭക്ഷണം വിളമ്പുന്ന വ്യക്തിയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Customer",
        "B) Manager",
        "C) Waiter",
        "D) Chef"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"Give me biryani.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Give me biryani.\"",
      "options": [
        "A) Biryani bring to me.",
        "B) Biryani give fast.",
        "C) Give biryani please.",
        "D) I'd like a chicken biryani, please."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the mistake: \"Bring water.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Bring water.\"",
      "options": [
        "A) Could I have some water, please?",
        "B) Bring water quick.",
        "C) Water bring here.",
        "D) Give water to table."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the mistake: \"I want coffee.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I want coffee.\"",
      "options": [
        "A) I want coffee now.",
        "B) I'd like a cup of coffee.",
        "C) Coffee give me.",
        "D) Coffee want."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "What compliment can you give when the food is very tasty?",
      "questionMl": "ഭക്ഷണം വളരെ രുചികരമായിരുന്നു എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന വാചകം ഏതാണ്?",
      "options": [
        "A) Food is finished.",
        "B) No bad food.",
        "C) The food was delicious.",
        "D) Food is big."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "How do you ask to pay using a debit or credit card?",
      "questionMl": "കാർഡ് ഉപയോഗിച്ച് പണം നൽകാൻ സാധിക്കുമോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Is card okaying?",
        "B) Giving card for payment?",
        "C) Card machine give.",
        "D) Can I pay by card?"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "What power phrase is used to state your food order politely?",
      "questionMl": "ഭക്ഷണം ഓർഡർ ചെയ്യാൻ ഉപയോഗിക്കുന്ന പവർ ഫ്രെയ്സ് ഏതാണ്?",
      "options": [
        "A) I'd like to...",
        "B) I must to...",
        "C) You give me...",
        "D) Bring me..."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What does \"reservation\" mean in a restaurant context?",
      "questionMl": "റെസ്റ്റോറന്റുമായി ബന്ധപ്പെട്ട് \"reservation\" എന്നാൽ എന്ത്?",
      "options": [
        "A) Paying the bill",
        "B) Booking a table in advance",
        "C) Cleaning the table",
        "D) Cooking the food"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "Complete the sentence: \"I'll _____ a cup of tea.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"ഞാൻ ഒരു കപ്പ് ചായ എടുക്കാം.\"",
      "options": [
        "A) taking",
        "B) drank",
        "C) have",
        "D) gives"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "What is the \"main course\" in a meal?",
      "questionMl": "ഒരു ഭക്ഷണത്തിലെ \"main course\" എന്നാൽ എന്ത്?",
      "options": [
        "A) The light drink at the start",
        "B) The sweet item at the end",
        "C) The tip given to the waiter",
        "D) The primary, principal dish of the meal"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Which phrase expresses gratitude for good service?",
      "questionMl": "നല്ല സേവനത്തിന് നന്ദി പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Thank you for your service.",
        "B) Service is over.",
        "C) Give me receipt.",
        "D) You work good."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Fill in the blank: \"Could I see the _____, please?\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ദയവായി മെനു കാണാമോ?\"",
      "options": [
        "A) table",
        "B) menu",
        "C) chair",
        "D) order"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Which word means \"having a sugary flavor\"?",
      "questionMl": "\"മധുരമുള്ള\" എന്നതിനെ കുറിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Spicy",
        "B) Bitter",
        "C) Sweet",
        "D) Salty"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Fill in the blank: \"The food _____ great.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഭക്ഷണം വളരെ രുചികരമായിരിക്കുന്നു.\"",
      "options": [
        "A) tasting",
        "B) tasted be",
        "C) taste is",
        "D) tastes"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "What do you call a formal meal list with prices?",
      "questionMl": "വിലവിവരങ്ങൾ അടങ്ങിയ ഭക്ഷണ സാധനങ്ങളുടെ ലിസ്റ്റിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Menu",
        "B) Recipe",
        "C) Ticket",
        "D) Coupon"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Complete the response: Waiter: \"Would you like anything else?\" Customer: \"_____, thank you.\"",
      "questionMl": "സംഭാഷണം പൂർത്തിയാക്കുക:",
      "options": [
        "A) Not",
        "B) No",
        "C) Never",
        "D) Don't"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "What is the proof of payment document given after paying the bill?",
      "questionMl": "പണം നൽകിയ ശേഷം ലഭിക്കുന്ന രേഖയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Menu",
        "B) Passport",
        "C) Receipt",
        "D) Ticket"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the polite request: \"_____ you bring the bill, please?\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക:",
      "options": [
        "A) Did",
        "B) Are",
        "C) Have",
        "D) Could"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "What type of place serves quick meals like burgers and fries?",
      "questionMl": "ബർഗറുകൾ, ഫ്രൈസ് തുടങ്ങിയ എളുപ്പത്തിൽ ലഭിക്കുന്ന ഭക്ഷണങ്ങൾ കിട്ടുന്ന സ്ഥലം ഏതാണ്?",
      "options": [
        "A) Fast food restaurant",
        "B) Jewellery shop",
        "C) Medical store",
        "D) Footwear store"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Choose the correct option: \"I'd like to _____ food, please.\"",
      "questionMl": "ശരിയായ ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക: \"എനിക്ക് ഭക്ഷണം ഓർഡർ ചെയ്യണം.\"",
      "options": [
        "A) ordered",
        "B) order",
        "C) ordering",
        "D) orders"
      ],
      "correctIndex": 1
    }
  ],
  "26": [
    {
      "id": 1,
      "question": "How do you politely excuse yourself to ask someone for directions?",
      "questionMl": "വഴി ചോദിക്കാൻ ഒരാളുടെ ശ്രദ്ധ തിരിക്കാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Hey you!",
        "B) Listen here.",
        "C) Excuse me...",
        "D) Stop there."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "How do you ask someone how to reach the bus station?",
      "questionMl": "ബസ് സ്റ്റേഷനിൽ എങ്ങനെ എത്താം എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) How go bus station?",
        "B) Where bus going?",
        "C) Bus station location give.",
        "D) How can I get to the bus station?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "How do you ask about the departure platform for a train?",
      "questionMl": "ട്രെയിൻ ഏത് പ്ലാറ്റ്‌ഫോമിൽ നിന്നാണ് പുറപ്പെടുന്നത് എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Which platform does the train leave from?",
        "B) What platform train going?",
        "C) Train platform where?",
        "D) Which track is train?"
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "How do you ask for the price of a travel ticket?",
      "questionMl": "യാത്രാ ടിക്കറ്റിന്റെ വില എത്രയാണെന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) What ticket money?",
        "B) How much is the ticket?",
        "C) Ticket price give.",
        "D) How many for ticket?"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "How do you politely request a hotel room booking?",
      "questionMl": "ഒരു ഹോട്ടൽ മുറി ബുക്ക് ചെയ്യാൻ മര്യാദയോടെ എങ്ങനെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) Hotel room want.",
        "B) Give me room.",
        "C) I'd like to reserve a hotel room.",
        "D) Room booking now."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "How do you ask if morning meal is provided with the hotel stay?",
      "questionMl": "ഹോട്ടൽ താമസത്തോടൊപ്പം പ്രഭാതഭക്ഷണം ഉൾപ്പെടുത്തിയിട്ടുണ്ടോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Morning food giving?",
        "B) Food inside room price?",
        "C) Eat breakfast free?",
        "D) Is breakfast included?"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you ask someone to arrange a taxi for you?",
      "questionMl": "നിങ്ങൾക്കായി ഒരു ടാക്സി വിളിച്ചു തരാമോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Could you call a taxi for me?",
        "B) Taxi call.",
        "C) Bring taxi now.",
        "D) Where taxi car?"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "How do you ask about a flight's departure time?",
      "questionMl": "വിമാനം എപ്പോഴാണ് പുറപ്പെടുന്നത് എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Flight go when?",
        "B) When does the flight depart?",
        "C) What time flight fly?",
        "D) Flight time where?"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "How do you ask where to collect your bags at an airport?",
      "questionMl": "വിമാനത്താവളത്തിൽ ലഗേജ് എവിടെ നിന്ന് കൈപ്പറ്റാമെന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Where my bag?",
        "B) Luggage place where?",
        "C) Where can I collect my luggage?",
        "D) Bags give me where?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What document gives you permission to board an airplane?",
      "questionMl": "വിമാനത്തിൽ കയറാൻ സഹായിക്കുന്ന രേഖ ഏതാണ്?",
      "options": [
        "A) Receipt",
        "B) Menu",
        "C) License",
        "D) Boarding pass"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "What is the bags/suitcases carried during travel called?",
      "questionMl": "യാത്രകളിൽ കൂടെ കരുതുന്ന ബാഗുകളെ/പെട്ടികളെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Luggage",
        "B) Platform",
        "C) Destination",
        "D) Departure"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What does \"destination\" mean in travel?",
      "questionMl": "യാത്രയുമായി ബന്ധപ്പെട്ട് \"destination\" എന്നാൽ എന്ത്?",
      "options": [
        "A) The starting place",
        "B) The place to which someone is going",
        "C) The vehicle used",
        "D) The ticket price"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "What does \"departure\" mean?",
      "questionMl": "\"Departure\" എന്നാൽ എന്ത്?",
      "options": [
        "A) Arriving at a place",
        "B) Staying in a hotel",
        "C) Leaving a place",
        "D) Eating food"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "What does \"arrival\" mean?",
      "questionMl": "\"Arrival\" എന്നാൽ എന്ത്?",
      "options": [
        "A) Leaving a station",
        "B) Buying a ticket",
        "C) Missing a train",
        "D) Reaching a destination"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct the mistake: \"Where station?\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Where station?\"",
      "options": [
        "A) Where is the railway station?",
        "B) Where station is?",
        "C) Station where going?",
        "D) Is where station?"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Correct the mistake: \"Give one ticket.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Give one ticket.\"",
      "options": [
        "A) One ticket give fast.",
        "B) I'd like to buy one ticket, please.",
        "C) Ticket give me one.",
        "D) Buy ticket one."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Correct the mistake: \"How go airport?\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"How go airport?\"",
      "options": [
        "A) How I can go airport?",
        "B) Airport going how?",
        "C) How can I get to the airport?",
        "D) Way for airport?"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What do you say to wish someone a safe travel?",
      "questionMl": "ഒരാൾക്ക് സുരക്ഷിതമായ യാത്ര ആശംസിക്കാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Go fast.",
        "B) Don't travel.",
        "C) Come back soon.",
        "D) Have a safe journey."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "How do you ask if a destination is far away from your current location?",
      "questionMl": "ഒരു സ്ഥലം ഇവിടെ നിന്ന് വളരെ അകലെയാണോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Is it far from here?",
        "B) Very distance going?",
        "C) Much long here?",
        "D) Far place this?"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Complete the response: \"Thank you very much.\" → \"_____\"",
      "questionMl": "പ്രതികരണം പൂർത്തിയാക്കുക: \"Thank you very much.\" → \"_____\"",
      "options": [
        "A) No thank you.",
        "B) You're welcome.",
        "C) Bye bye.",
        "D) I am fine."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "What is the place where trains stop for passengers called?",
      "questionMl": "ട്രെയിനുകൾ യാത്രക്കാർക്കായി നിർത്തുന്ന സ്ഥലത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Airport",
        "B) Bakery",
        "C) Railway station",
        "D) Food court"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Which official document is essential for international travel?",
      "questionMl": "അന്താരാഷ്ട്ര യാത്രകൾക്ക് നിർബന്ധമായും വേണ്ട ഔദ്യോഗിക രേഖ ഏതാണ്?",
      "options": [
        "A) Bill",
        "B) Receipt",
        "C) Menu",
        "D) Passport"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Fill in the blank: \"Go straight and _____ left.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"നേരെ പോയി ഇടത്തോട്ട് തിരിയുക.\"",
      "options": [
        "A) turn",
        "B) turning",
        "C) turned",
        "D) turns"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Fill in the blank: \"I'm looking _____ the nearest bus stop.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഞാൻ അടുത്തുള്ള ബസ് സ്റ്റോപ്പ് അന്വേഷിക്കുകയാണ്.\"",
      "options": [
        "A) at",
        "B) for",
        "C) on",
        "D) into"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What is a person visiting a new place for pleasure called?",
      "questionMl": "വിനോദത്തിനായി പുതിയ സ്ഥലങ്ങൾ സന്ദർശിക്കുന്ന വ്യക്തിയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Cashier",
        "B) Waiter",
        "C) Tourist",
        "D) Operator"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "What tool shows geographical routes and locations?",
      "questionMl": "വഴികളും സ്ഥലങ്ങളും കാണിക്കുന്ന ഭൂപടത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Ticket",
        "B) Receipt",
        "C) Menu",
        "D) Map"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the phrase: \"Enjoy your _____!\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"നിങ്ങളുടെ യാത്ര ആസ്വദിക്കൂ!\"",
      "options": [
        "A) trip",
        "B) bill",
        "C) menu",
        "D) call"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Which modal verb is used to make polite requests like: \"_____ you please help me?\"",
      "questionMl": "മര്യാദയോടെ സഹായം ചോദിക്കാൻ ഏത് മോഡൽ വെർബ് ഉപയോഗിക്കാം?",
      "options": [
        "A) Did",
        "B) Could",
        "C) Must",
        "D) Was"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct room option for two people staying together:",
      "questionMl": "രണ്ടുപേർക്ക് ഒരുമിച്ച് താമസിക്കാനുള്ള ഹോട്ടൽ മുറി ഏതാണ്?",
      "options": [
        "A) Single room",
        "B) Kitchen",
        "C) Double room",
        "D) Counter"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the question: \"Which _____ does the train leave from?\"",
      "questionMl": "ചോദ്യം പൂർത്തിയാക്കുക:",
      "options": [
        "A) menu",
        "B) table",
        "C) signal",
        "D) platform"
      ],
      "correctIndex": 3
    }
  ],
  "27": [
    {
      "id": 1,
      "question": "How do you introduce yourself on a phone call professionally?",
      "questionMl": "ഫോൺ കോളിൽ നിങ്ങളെക്കുറിച്ച് പ്രൊഫഷണലായി എങ്ങനെ പരിചയപ്പെടുത്താം?",
      "options": [
        "A) Hello, this is Ahmed speaking.",
        "B) I am Ahmed speaking.",
        "C) Myself Ahmed.",
        "D) Ahmed here phone."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "How do you politely ask to speak to someone on the phone?",
      "questionMl": "ഫോണിൽ ഒരാളോട് സംസാരിക്കാമോ എന്ന് മര്യാദയോടെ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Give phone to Rahman.",
        "B) May I speak to Mr. Rahman, please?",
        "C) Call Rahman now.",
        "D) I want Rahman."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "How do you politely ask who is on the line?",
      "questionMl": "ആരാണ് വിളിക്കുന്നത് എന്ന് മര്യാദയോടെ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Who are you?",
        "B) Tell name now.",
        "C) Who's calling, please?",
        "D) Whose phone is this?"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "How do you politely ask the receptionist to connect your call to the manager?",
      "questionMl": "മാനേജറുമായി ഫോൺ ബന്ധിപ്പിച്ചു തരാമോ എന്ന് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Manager give now.",
        "B) Connect phone fast.",
        "C) Call manager to me.",
        "D) Could you connect me to the manager?"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "What do you say when the person requested is not present right now?",
      "questionMl": "നിങ്ങൾ ചോദിക്കുന്ന വ്യക്തി ഇപ്പോൾ അവിടെ ലഭ്യമല്ല എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) He's not available at the moment.",
        "B) He is not here ever.",
        "C) Don't talk now.",
        "D) He went away."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "How do you request someone to return your call later?",
      "questionMl": "അദ്ദേഹത്തോട് എന്നെ തിരിച്ചു വിളിക്കാൻ പറയാമോ എന്ന് എങ്ങനെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) Call me again.",
        "B) Could you ask him to call me back?",
        "C) Tell him phone me.",
        "D) Return call now."
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "How do you tell the caller that you will contact them later?",
      "questionMl": "ഞാൻ പിന്നീട് വിളിക്കാം എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I calling later.",
        "B) Later I phone.",
        "C) I'll call you later.",
        "D) I call back after."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "How do you ask someone to repeat what they just said?",
      "questionMl": "പറഞ്ഞ കാര്യം വീണ്ടും പറയാമോ എന്ന് മര്യാദയോടെ എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Repeat again.",
        "B) Tell once more fast.",
        "C) Say again now.",
        "D) Could you repeat that, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "How do you inform the other person that the audio quality is poor?",
      "questionMl": "ഫോൺ ശബ്ദം വ്യക്തമല്ല എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) The line isn't clear.",
        "B) No sound came.",
        "C) Voice is bad.",
        "D) Phone line destroyed."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "How do you tell someone you will send details via messaging app?",
      "questionMl": "വിവരങ്ങൾ വാട്ട്‌സ്ആപ്പിലൂടെ അയയ്ക്കാം എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) WhatsApp I send details.",
        "B) I'll send you the details by WhatsApp.",
        "C) Details in WhatsApp come.",
        "D) Sending details WhatsApp now."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "What is the polite way to ask a caller to wait briefly on the line?",
      "questionMl": "ഫോൺ ലൈനിൽ അല്പസമയം കാത്തുനിൽക്കാൻ മര്യാദയോടെ എങ്ങനെ ആവശ്യപ്പെടാം?",
      "options": [
        "A) Wait.",
        "B) Stop there.",
        "C) Hold on, please.",
        "D) Don't cut call."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What do you say when someone calls you by mistake?",
      "questionMl": "ഒരാൾ തെറ്റായ നമ്പറിലേക്ക് വിളിച്ചാൽ എന്താണ് പറയുക?",
      "options": [
        "A) Why you calling me?",
        "B) Wrong call cut it.",
        "C) Who told you this number?",
        "D) I'm sorry, you have the wrong number."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the mistake: \"Give phone to him.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Give phone to him.\"",
      "options": [
        "A) May I speak to him, please?",
        "B) Give phone him fast.",
        "C) Phone to him give.",
        "D) Pass phone to him."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the mistake: \"Wait.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Wait.\"",
      "options": [
        "A) Wait there.",
        "B) Please hold for a moment.",
        "C) Waiting now.",
        "D) You wait line."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Correct the mistake: \"I not hear.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I not hear.\"",
      "options": [
        "A) No hearing to me.",
        "B) Hearing not possible.",
        "C) I can't hear you clearly.",
        "D) I am not hear."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Correct the mistake: \"Who are you?\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Who are you?\"",
      "options": [
        "A) Who is you calling?",
        "B) What is your name tell?",
        "C) Who calling me?",
        "D) May I know who's calling?"
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "What term refers to an automated voice message recorded when unattended?",
      "questionMl": "ഫോൺ എടുക്കാത്തപ്പോൾ റെക്കോർഡ് ചെയ്യപ്പെടുന്ന വോയ്സ് മെസ്സേജിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Voicemail",
        "B) Menu",
        "C) Platform",
        "D) Luggage"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What does \"callback\" mean in telephone terms?",
      "questionMl": "\"Callback\" എന്നാൽ എന്ത്?",
      "options": [
        "A) Cutting the call",
        "B) Returning a phone call",
        "C) Changing the phone number",
        "D) Buying a new phone"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What do you say to close a telephone call politely?",
      "questionMl": "ഫോൺ കോൾ മര്യാദയോടെ അവസാനിപ്പിക്കുമ്പോൾ എന്ത് പറയാം?",
      "options": [
        "A) Cut call now.",
        "B) Go away.",
        "C) Thank you for calling. Have a nice day.",
        "D) No more talking."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "What is a call involving three or more people called?",
      "questionMl": "മൂന്നോ അതിലധികമോ ആളുകൾ പങ്കാളികളാകുന്ന ഫോൺ കോളിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Missed call",
        "B) Wrong number",
        "C) Voicemail",
        "D) Conference call"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Fill in the blank: \"Hello, _____ is Ali speaking.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഹലോ, ഞാൻ അലി സംസാരിക്കുന്നു.\"",
      "options": [
        "A) this",
        "B) I",
        "C) my",
        "D) self"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "What phrase means \"a phone call that was not answered\"?",
      "questionMl": "\"എടുക്കാത്ത ഫോൺ കോൾ\" എന്നതിനെ എന്താണ് വിളിക്കുന്നത്?",
      "options": [
        "A) Conference call",
        "B) Missed call",
        "C) Voicemail",
        "D) Callback"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Fill in the blank: \"Please _____ the line while I check.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഞാൻ പരിശോധിക്കുന്നതുവരെ ലൈനിൽ കാത്തുനിൽക്കൂ.\"",
      "options": [
        "A) cut",
        "B) drop",
        "C) hold",
        "D) break"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "What word refers to cellular network connectivity/reception?",
      "questionMl": "ഫോണിന്റെ നെറ്റ്‌വർക്ക് ലഭ്യതയെ കുറിക്കുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Receipt",
        "B) Menu",
        "C) Boarding pass",
        "D) Signal"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the response: \"I'm sorry, she's in a meeting.\" → \"_____. Could you ask her to call me back?\"",
      "questionMl": "പ്രതികരണം പൂർത്തിയാക്കുക:",
      "options": [
        "A) No problem",
        "B) Very bad",
        "C) Why meeting",
        "D) Don't worry not"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"I can't _____ you clearly.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"എനിക്ക് നിങ്ങളെ വ്യക്തമായി കേൾക്കാൻ സാധിക്കുന്നില്ല.\"",
      "options": [
        "A) hearing",
        "B) hear",
        "C) heard",
        "D) hears"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "What is the person receiving the call called?",
      "questionMl": "ഫോൺ കോൾ സ്വീകരിക്കുന്ന വ്യക്തിയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Caller",
        "B) Waiter",
        "C) Receiver",
        "D) Customer"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "What is the person making the call called?",
      "questionMl": "ഫോൺ വിളിക്കുന്ന വ്യക്തിയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Receiver",
        "B) Cashier",
        "C) Tourist",
        "D) Caller"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Choose the polite phrase for scheduling a meeting/time with a professional:",
      "questionMl": "പ്രൊഫഷണൽ മീറ്റിംഗിനായി സമയം ക്രമീകരിക്കുന്നതിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Booking an appointment",
        "B) Buying a ticket",
        "C) Ordering a menu",
        "D) Making a receipt"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the polite request: \"May I _____ to Faisal?\"",
      "questionMl": "ചോദ്യം പൂർത്തിയാക്കുക:",
      "options": [
        "A) speaking",
        "B) speak",
        "C) spoke",
        "D) speaks"
      ],
      "correctIndex": 1
    }
  ],
  "28": [
    {
      "id": 1,
      "question": "How do you start a professional self-introduction in an interview?",
      "questionMl": "ഇന്റർവ്യൂവിൽ എങ്ങനെയാണ് പ്രൊഫഷണലായി നിങ്ങളെക്കുറിച്ച് പരിചയപ്പെടുത്തി തുടങ്ങുന്നത്?",
      "options": [
        "A) Listen to my story.",
        "B) I am candidate here.",
        "C) Let me introduce myself.",
        "D) Me name is Ahmed."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Which sentence correctly describes graduation from a university?",
      "questionMl": "ഒരു യൂണിവേഴ്സിറ്റിയിൽ നിന്ന് ബിരുദം നേടിയതിനെ സൂചിപ്പിക്കുന്ന ശരിയായ വാചകം ഏതാണ്?",
      "options": [
        "A) I am pass Calicut University.",
        "B) I finish university.",
        "C) I out from college.",
        "D) I graduated from Calicut University."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "How do you describe your previous work experience as a sales executive?",
      "questionMl": "സെയിൽസ് എക്സിക്യൂട്ടീവായുള്ള നിങ്ങളുടെ മുൻ തൊഴിൽ പരിചയം എങ്ങനെ പറയാം?",
      "options": [
        "A) I have worked as a sales executive.",
        "B) I working sales executive.",
        "C) I do sales work before.",
        "D) I am sales executive done."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "How do you state that you enjoy collaborating with others at work?",
      "questionMl": "മറ്റുള്ളവരുമായി ചേർന്ന് ടീമിൽ ജോലി ചെയ്യുന്നത് ഇഷ്ടപ്പെടുന്നു എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I like single work.",
        "B) I enjoy working in a team.",
        "C) I work only alone.",
        "D) I no need team."
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "How do you state your ability to handle difficult or demanding work situations?",
      "questionMl": "സമ്മർദ്ദമുള്ള സാഹചര്യങ്ങളിൽ ജോലി ചെയ്യാൻ എനിക്ക് കഴിയും എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I hate pressure work.",
        "B) I can't do hard work.",
        "C) I can work under pressure.",
        "D) Work is too much pressure."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "What is the polite way to explain that you pick up new skills fast?",
      "questionMl": "ഒരു കാര്യം വേഗത്തിൽ പഠിച്ചെടുക്കാൻ കഴിയുന്ന ആളാണ് എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I am slow student.",
        "B) I know everything already.",
        "C) Learning is hard for me.",
        "D) I learn quickly."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you express your confidence that you are suitable for the job role?",
      "questionMl": "ഈ ജോലിക്ക് ഞാൻ അനുയോജ്യനായ വ്യക്തിയാണെന്ന് വിശ്വസിക്കുന്നു എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I believe I am the right person for this role.",
        "B) Give job to me only.",
        "C) I am best than all.",
        "D) I want this job anyway."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "What is the document containing your education, skills, and work history called?",
      "questionMl": "നിങ്ങളുടെ വിദ്യാഭ്യാസം, കഴിവുകൾ, തൊഴിൽ പരിചയം എന്നിവ അടങ്ങിയ രേഖയെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Menu",
        "B) Resume / CV",
        "C) Receipt",
        "D) Boarding pass"
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "What does \"qualification\" refer to in an interview?",
      "questionMl": "ഇന്റർവ്യൂവിൽ \"qualification\" എന്നത് എന്തിനെ സൂചിപ്പിക്കുന്നു?",
      "options": [
        "A) Salary demands",
        "B) Hotel reservation",
        "C) Educational achievements and degrees",
        "D) Daily meal plan"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What power phrase is used when explaining a point or topic in detail?",
      "questionMl": "ഒരു കാര്യം വിശദീകരിച്ച് പറയാൻ ഉപയോഗിക്കുന്ന പവർ ഫ്രെയ്സ് ഏതാണ്?",
      "options": [
        "A) I don't care...",
        "B) Stop talking...",
        "C) Give me money...",
        "D) Let me explain..."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Correct the mistake: \"My name Ahmed.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"My name Ahmed.\"",
      "options": [
        "A) My name is Ahmed.",
        "B) Me name Ahmed.",
        "C) Name my Ahmed.",
        "D) Myself Ahmed is."
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"I have two year experience.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I have two year experience.\"",
      "options": [
        "A) I have two year of experience.",
        "B) I have two years of experience.",
        "C) I am having two year experience.",
        "D) Experience of two year I have."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Correct the mistake: \"I worked here since 2022.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I worked here since 2022.\"",
      "options": [
        "A) I working here since 2022.",
        "B) I work here since 2022.",
        "C) I have worked here since 2022.",
        "D) I am worked here since 2022."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Correct the mistake: \"I am graduate.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I am graduate.\"",
      "options": [
        "A) I am graduating person.",
        "B) Me is graduate.",
        "C) I graduation done.",
        "D) I am a graduate."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Correct the mistake: \"I want job.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I want job.\"",
      "options": [
        "A) I would like to work in your company.",
        "B) Job give me fast.",
        "C) I needing job.",
        "D) Wanting job here."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "What is the English phrase for stating your positive qualities or strong areas?",
      "questionMl": "നിങ്ങളുടെ കഴിവുകളെയും നല്ല ഗുണങ്ങളെയും കുറിച്ച് പറയാൻ ഏത് വാക്ക് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) Weaknesses",
        "B) Strengths",
        "C) Disadvantages",
        "D) Failures"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "What word refers to areas you need to improve upon?",
      "questionMl": "നിങ്ങൾ മെച്ചപ്പെടുത്തേണ്ട കാര്യങ്ങളെ/ദൗർബല്യങ്ങളെ കുറിച്ച് പറയാൻ ഏത് വാക്ക് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) Strengths",
        "B) Achievements",
        "C) Weaknesses",
        "D) Qualifications"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "How do you express your willingness to upgrade your skills?",
      "questionMl": "എന്റെ കഴിവുകൾ മെച്ചപ്പെടുത്താൻ ഞാൻ തയ്യാറാണ് എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) No need to learn new things.",
        "B) I know all skills.",
        "C) Skill is not important.",
        "D) I am willing to improve my skills."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "What do you say to express thanks for the interview time provided?",
      "questionMl": "ഇന്റർവ്യൂവിന് സമയം അനുവദിച്ചതിന് നന്ദി പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Thank you for your time.",
        "B) Time is up now.",
        "C) You wasted my time.",
        "D) Give me result fast."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "How do you politely say you are waiting for their reply after an interview?",
      "questionMl": "ഇന്റർവ്യൂവിന് ശേഷം നിങ്ങളുടെ മറുപടിക്കായി കാത്തിരിക്കുന്നു എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Call me today itself.",
        "B) I look forward to hearing from you.",
        "C) Why no reply given?",
        "D) Give result right now."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "What does \"career goal\" mean?",
      "questionMl": "\"Career goal\" എന്നാൽ എന്ത്?",
      "options": [
        "A) Sports score",
        "B) Daily food plan",
        "C) Professional ambition or target in work life",
        "D) Travel itinerary"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "What word refers to the payment received for work done in a job?",
      "questionMl": "ജോലിക്ക് പകരമായി ലഭിക്കുന്ന പ്രതിഫലത്തെ/ശമ്പളത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Receipt",
        "B) Menu",
        "C) Ticket",
        "D) Salary"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "What word means moving to a higher position or rank in a job?",
      "questionMl": "ജോലിയിൽ ഉന്നത സ്ഥാനത്തേക്ക് കയറ്റം ലഭിക്കുന്നതിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Promotion",
        "B) Resignation",
        "C) Demotion",
        "D) Penalty"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Fill in the blank: \"My biggest _____ is my ability to communicate well.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"എന്റെ ഏറ്റവും വലിയ ശക്തി എന്റെ നല്ല ആശയവിനിമയ ശേഷിയാണ്.\"",
      "options": [
        "A) weakness",
        "B) strength",
        "C) error",
        "D) problem"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Fill in the blank: \"I have completed several _____ courses.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഞാൻ നിരവധി സർട്ടിഫിക്കേഷൻ കോഴ്സുകൾ പൂർത്തിയാക്കിയിട്ടുണ്ട്.\"",
      "options": [
        "A) certificate is",
        "B) certify",
        "C) certification",
        "D) certified of"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Complete the sentence: \"It was a pleasure _____ with you.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"നിങ്ങളോട് സംസാരിക്കാൻ സാധിച്ചതിൽ സന്തോഷമുണ്ട്.\"",
      "options": [
        "A) speak",
        "B) spoke",
        "C) speaks",
        "D) speaking"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "What power phrase is used to state your personal belief or view?",
      "questionMl": "നിങ്ങളുടെ വ്യക്തിപരമായ അഭിപ്രായം പറയാൻ ഏത് പവർ ഫ്രെയ്സ് ഉപയോഗിക്കാം?",
      "options": [
        "A) In my opinion... / I believe...",
        "B) I don't know...",
        "C) You are wrong...",
        "D) No comment..."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Which question asks where you aim to reach professionally in the future?",
      "questionMl": "ഭാവിയിൽ തൊഴിൽ രംഗത്ത് നിങ്ങൾ എവിടെയെത്താൻ ആഗ്രഹിക്കുന്നു എന്ന് ചോദിക്കുന്ന ചോദ്യം ഏതാണ്?",
      "options": [
        "A) Where do you live?",
        "B) Where do you see yourself in five years?",
        "C) When did you wake up?",
        "D) What did you eat today?"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the phrase that means \"from what I have learned in my work history\":",
      "questionMl": "\"എന്റെ തൊഴിൽ പരിചയത്തിൽ നിന്ന്...\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) From my home...",
        "B) From my story...",
        "C) From my experience...",
        "D) From my book..."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the polite closing: \"I am confident that I can _____ to your company.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"നിങ്ങളുടെ കമ്പനിയുടെ വളർച്ചയ്ക്ക് സംഭാവന നൽകാൻ എനിക്ക് സാധിക്കുമെന്ന് ഞാൻ വിശ്വസിക്കുന്നു.\"",
      "options": [
        "A) contributing",
        "B) contributed",
        "C) contributes",
        "D) contribute"
      ],
      "correctIndex": 3
    }
  ],
  "29": [
    {
      "id": 1,
      "question": "What power phrase is used to request that a task be completed as fast as possible?",
      "questionMl": "ഒരു ജോലി എത്രയും വേഗം ചെയ്തു തീർക്കണം എന്ന് ആവശ്യപ്പെടാൻ ഏത് പവർ ഫ്രെയ്സ് ഉപയോഗിക്കാം?",
      "options": [
        "A) As soon as possible...",
        "B) Sometime next month...",
        "C) No hurry...",
        "D) Slowly do it..."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "How do you politely open a workplace meeting?",
      "questionMl": "ഓഫീസ് മീറ്റിംഗ് മര്യാദയോടെ എങ്ങനെ ആരംഭിക്കാം?",
      "options": [
        "A) Start meeting now!",
        "B) Could we start the meeting?",
        "C) Sit quiet meeting starts.",
        "D) Why meeting not start?"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "How do you inform your manager that a report has been finished?",
      "questionMl": "ഞാൻ റിപ്പോർട്ട് പൂർത്തിയാക്കിയിട്ടുണ്ട് എന്ന് മാനേജരെ എങ്ങനെ അറിയിക്കാം?",
      "options": [
        "A) Report finish me.",
        "B) I doing report completed.",
        "C) I have completed the report.",
        "D) Finished report I am."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "How do you state that you are currently working on a project?",
      "questionMl": "ഞാൻ പ്രോജക്റ്റിൽ ജോലി ചെയ്യുകയാണ് എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Project I do now.",
        "B) Working project me.",
        "C) I am project work.",
        "D) I'm working on the project."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "How do you politely ask a colleague to send you a file?",
      "questionMl": "ഒരു ഫയൽ എനിക്ക് അയച്ചുതരാമോ എന്ന് സഹപ്രവർത്തകനോട് എങ്ങനെ ചോദിക്കാം?",
      "options": [
        "A) Could you send me the file?",
        "B) Give file.",
        "C) File send fast.",
        "D) Bring file here."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "How do you state that you will complete a task before the evening?",
      "questionMl": "ഞാൻ ഇത് ഇന്ന് വൈകുന്നേരത്തോടെ പൂർത്തിയാക്കും എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Evening I finish.",
        "B) I'll finish it by this evening.",
        "C) I finishing this evening.",
        "D) Finish in evening me."
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "What word refers to the target date or time by which a task must be completed?",
      "questionMl": "ഒരു ജോലി പൂർത്തിയാക്കേണ്ട അവസാന തീയതിയെ/സമയത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Menu",
        "B) Ticket",
        "C) Deadline",
        "D) Receipt"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "How do you suggest arranging another meeting time?",
      "questionMl": "മറ്റൊരു മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്യാം എന്ന് എങ്ങനെ നിർദ്ദേശിക്കാം?",
      "options": [
        "A) Make meeting again fast.",
        "B) Meeting tomorrow must.",
        "C) Schedule meeting why.",
        "D) Let's schedule another meeting."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "How do you express appreciation for someone's help/support at work?",
      "questionMl": "നിങ്ങളുടെ പിന്തുണയ്ക്ക് നന്ദി എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Thank you for your support.",
        "B) Support is good.",
        "C) You helped me fine.",
        "D) No support needed."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "What do you say to show appreciation for advice or constructive evaluation received?",
      "questionMl": "നിങ്ങളുടെ അഭിപ്രായത്തിന്/അവലോകനത്തിന് നന്ദി എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Feedback not needed.",
        "B) I appreciate your feedback.",
        "C) Don't tell feedback.",
        "D) Your opinion bad."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Correct the mistake: \"Send report quickly.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Send report quickly.\"",
      "options": [
        "A) Report send quick fast.",
        "B) Send quick report now.",
        "C) Please send the report as soon as possible.",
        "D) Quickly sending report."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"I finish tomorrow.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I finish tomorrow.\"",
      "options": [
        "A) I finish iting tomorrow.",
        "B) Tomorrow I finish done.",
        "C) I am finish tomorrow.",
        "D) I'll finish it tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Correct the mistake: \"Meeting now.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Meeting now.\"",
      "options": [
        "A) The meeting is starting now.",
        "B) Now meeting happen.",
        "C) Meeting do now.",
        "D) Is meeting now."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Correct the mistake: \"I completed just now.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I completed just now.\"",
      "options": [
        "A) I complete just now done.",
        "B) I have just completed it.",
        "C) Just now I complete.",
        "D) Completing done just now."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Correct the mistake: \"Give file.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Give file.\"",
      "options": [
        "A) File give fast.",
        "B) Giving file to me.",
        "C) Could you please send me the file?",
        "D) File pass me."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "What phrase means \"I will handle/manage this task\"?",
      "questionMl": "\"ഞാൻ ഈ കാര്യം ഏറ്റെടുത്ത് ചെയ്തോളാം\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) I don't know it.",
        "B) You do it yourself.",
        "C) Leave it away.",
        "D) I'll take care of it."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "What phrase means \"I will give you the latest information/status\"?",
      "questionMl": "\"ഞാൻ പുതിയ വിവരങ്ങൾ നിങ്ങളെ അറിയിക്കാം\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) I'll update you.",
        "B) I'll forget you.",
        "C) Don't ask me.",
        "D) No information now."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What phrase means \"I will find the answer/information and reply to you later\"?",
      "questionMl": "\"ഞാൻ അന്വേഷിച്ച ശേഷം നിങ്ങളെ തിരികെ അറിയിക്കാം\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Go away now.",
        "B) I'll get back to you.",
        "C) Don't call again.",
        "D) I am back home."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What word refers to a person who works in the same organization as you?",
      "questionMl": "നിങ്ങളോടൊപ്പം ജോലി ചെയ്യുന്ന സഹപ്രവർത്തകനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Customer",
        "B) Waiter",
        "C) Colleague",
        "D) Tourist"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "What word refers to a business customer or buyer of services in an office context?",
      "questionMl": "ഓഫീസ് സേവനങ്ങൾ സ്വീകരിക്കുന്ന വ്യക്തിയെ/സ്ഥാപനത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Cashier",
        "B) Driver",
        "C) Passenger",
        "D) Client"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "What power phrase means \"following the decided schedule or strategy\"?",
      "questionMl": "\"തീരുമാനിച്ച പ്ലാൻ അനുസരിച്ച്...\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) According to the plan...",
        "B) Out of plan...",
        "C) No plan made...",
        "D) Against the plan..."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "How do you propose discussing an issue together with a team?",
      "questionMl": "നമുക്ക് ഇതിനെക്കുറിച്ച് ചർച്ച ചെയ്യാം എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Don't discuss this.",
        "B) Let's discuss this.",
        "C) Discussion no need.",
        "D) Stop talking."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What do you say to agree positively with a colleague's suggestion?",
      "questionMl": "സഹപ്രവർത്തകന്റെ നല്ല നിർദ്ദേശത്തോട് യോജിക്കാൻ എന്ത് പറയാം?",
      "options": [
        "A) Bad idea this.",
        "B) Why telling ideas?",
        "C) That's a good idea.",
        "D) No idea good."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Fill in the blank: \"We are making good _____ on this project.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"ഞങ്ങൾ ഈ പ്രോജക്റ്റിൽ നല്ല പുരോഗതി കൈവരിക്കുന്നുണ്ട്.\"",
      "options": [
        "A) delay",
        "B) mistake",
        "C) loss",
        "D) progress"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Complete the sentence: \"Please send the email as _____ as possible.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക:",
      "options": [
        "A) soon",
        "B) fastly",
        "C) early",
        "D) quick"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: \"Keep me _____ on the project status.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"പ്രോജക്റ്റിന്റെ സ്ഥിതിവിവരങ്ങൾ എന്നെ അറിയിച്ചുകൊണ്ടിരിക്കുക.\"",
      "options": [
        "A) updating",
        "B) updated",
        "C) update",
        "D) updates"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Which word refers to a visual talk using slides or speech at work?",
      "questionMl": "സ്ലൈഡുകളും മറ്റും ഉപയോഗിച്ച് നടത്തുന്ന അവതരണത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Receipt",
        "B) Passport",
        "C) Presentation",
        "D) Ticket"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the phrase: \"Let's work _____ to complete this project.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"ഈ പ്രോജക്റ്റ് പൂർത്തിയാക്കാൻ നമുക്ക് ഒരുമിച്ച് പ്രവർത്തിക്കാം.\"",
      "options": [
        "A) single",
        "B) alone",
        "C) away",
        "D) together"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "What term refers to a target goal set for sales or performance?",
      "questionMl": "വിൽപ്പനയിലോ പെർഫോമൻസിലോ കൈവരിക്കേണ്ട ലക്ഷ്യത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Target",
        "B) Menu",
        "C) Luggage",
        "D) Platform"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "How do you politely decline an invitation to a meeting due to a schedule conflict?",
      "questionMl": "മറ്റൊരു തിരക്കുള്ളതുകൊണ്ട് ഒരു മീറ്റിംഗിൽ പങ്കെടുക്കാൻ കഴിയില്ലെന്ന് മാന്യമായി അറിയിക്കാൻ:",
      "options": [
        "A) I cannot come because I don't want to.",
        "B) I apologize, but I have a prior commitment at that time.",
        "C) No, I am very busy.",
        "D) Meeting is cancelled by me."
      ],
      "correctIndex": 1
    }
  ],
  "30": [
    {
      "id": 1,
      "question": "What conversation connector is used to introduce a new topic naturally into speech?",
      "questionMl": "സംഭാഷണത്തിനിടെ ഒരു പുതിയ വിഷയം സ്വാഭാവികമായി അവതരിപ്പിക്കാൻ ഏത് ഫ്രെയ്സ് ഉപയോഗിക്കാം?",
      "options": [
        "A) Stop now...",
        "B) No more topic...",
        "C) By the way...",
        "D) End of talk..."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "What power phrase is used to emphasize a real fact or truth?",
      "questionMl": "ഒരു യഥാർത്ഥ വസ്തുത ഊന്നിപ്പറയാൻ ഏത് ഫ്രെയ്സ് ഉപയോഗിക്കാം?",
      "options": [
        "A) In fake...",
        "B) Out of truth...",
        "C) Not fact...",
        "D) In fact..."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "What phrase is used to show that an answer relies on specific conditions or circumstances?",
      "questionMl": "ഒരു കാര്യം സാഹചര്യങ്ങളെ ആശ്രയിച്ചിരിക്കുന്നു എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) It depends...",
        "B) It is fixed...",
        "C) Always same...",
        "D) No condition..."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "What phrase means \"certainly\" or \"without doubt\"?",
      "questionMl": "\"തീർച്ചയായും\" എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന ലളിതമായ വാചകം ഏതാണ്?",
      "options": [
        "A) Never at all.",
        "B) Of course.",
        "C) No way.",
        "D) Not possible."
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "How do you politely respond when someone apologizes or thanks you?",
      "questionMl": "\"പ്രശ്നമില്ല\" അല്ലെങ്കിൽ \"സാരമില്ല\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Big problem.",
        "B) Don't talk.",
        "C) No problem.",
        "D) Pay money."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "How do you express complete agreement with someone's opinion?",
      "questionMl": "ഞാൻ നിങ്ങളോട് പൂർണ്ണമായും യോജിക്കുന്നു എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I am disagreeing always.",
        "B) You are wrong.",
        "C) No agreement with you.",
        "D) I completely agree with you."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you politely state that you have a different perspective?",
      "questionMl": "എനിക്ക് വ്യത്യസ്തമായ ഒരു അഭിപ്രായമുണ്ട് എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I have a different opinion.",
        "B) You know nothing.",
        "C) Your idea is trash.",
        "D) Stop your opinion."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "What do you say to compliment someone on asking a clever or relevant question?",
      "questionMl": "അത് നല്ലൊരു ചോദ്യമാണ് എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Bad question asked.",
        "B) That's a good question.",
        "C) Why asking question?",
        "D) Don't question me."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Correct the mistake: \"I no understand.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I no understand.\"",
      "options": [
        "A) I not understanding.",
        "B) Me no understand.",
        "C) I don't understand.",
        "D) Understanding no me."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Correct the mistake: \"He go yesterday.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"He go yesterday.\"",
      "options": [
        "A) He goings yesterday.",
        "B) Yesterday he go.",
        "C) He gone yesterday.",
        "D) He went yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Correct the mistake: \"I have went there.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I have went there.\"",
      "options": [
        "A) I have gone there.",
        "B) I have go there.",
        "C) I am went there.",
        "D) I having went there."
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "Correct the mistake: \"I am agree.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I am agree.\"",
      "options": [
        "A) I agreeing am.",
        "B) I agree.",
        "C) Me am agree.",
        "D) Agreed I am."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Correct the mistake: \"Explain me.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Explain me.\"",
      "options": [
        "A) Explain me it.",
        "B) Me explain doing.",
        "C) Explain it to me.",
        "D) Explain to I."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "What power phrase is used to show that you find something intriguing or engaging?",
      "questionMl": "അത് രസകരമായിരിക്കുന്നു എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) That's boring.",
        "B) I don't care.",
        "C) Nothing special.",
        "D) That's interesting."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "How do you politely express disagreement with a statement?",
      "questionMl": "ഞാൻ അങ്ങനെ കരുതുന്നില്ല എന്ന് മര്യാദയോടെ എങ്ങനെ പറയാം?",
      "options": [
        "A) I don't think so.",
        "B) You lie.",
        "C) Completely false.",
        "D) Shut up."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "What word means \"the ability to speak a language smoothly and easily\"?",
      "questionMl": "ഒരു ഭാഷ തടസ്സമില്ലാതെ ഒഴുക്കോടെ സംസാരിക്കാനുള്ള കഴിവിനെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Grammar",
        "B) Fluency",
        "C) Vocabulary",
        "D) Spelling"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Complete the phrase: \"In my opinion, communication is more important than _____.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"എന്റെ അഭിപ്രായത്തിൽ, ഗ്രാമറിനേക്കാൾ പ്രധാനമാണ് ആശയവിനിമയം.\"",
      "options": [
        "A) food",
        "B) sleep",
        "C) grammar",
        "D) travel"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What word refers to a feeling of self-assurance arising from one's appreciation of one's own abilities?",
      "questionMl": "ആത്മവിശ്വാസം എന്നതിനെ ഇംഗ്ലീഷിൽ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Hesitation",
        "B) Fear",
        "C) Doubt",
        "D) Confidence"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "Fill in the blank: \"No problem. _____ your time.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"സാരമില്ല, സമയം എടുത്തോളൂ.\"",
      "options": [
        "A) Take",
        "B) Taking",
        "C) Took",
        "D) Takes"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "What phrase is used when offering to make something clear to the listener?",
      "questionMl": "ഞാൻ ഇത് വിശദീകരിക്കാം എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Don't ask me.",
        "B) Let me explain.",
        "C) I won't tell.",
        "D) Forget it."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Complete the conversation: A: \"Is there a supermarket nearby?\" B: \"Yes, _____ one opposite the station.\"",
      "questionMl": "സംഭാഷണം പൂർത്തിയാക്കുക:",
      "options": [
        "A) is",
        "B) here",
        "C) there's",
        "D) was"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Choose the correct phrase for expressing a personal view:",
      "questionMl": "നിങ്ങളുടെ കാഴ്ചപ്പാട് അവതരിപ്പിക്കാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Out of my view...",
        "B) No view I have...",
        "C) Don't view me...",
        "D) In my opinion..."
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "Fill in the blank: \"In fact, I have _____ completed the course.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"വാസ്തവത്തിൽ, ഞാൻ ഇതിനകം കോഴ്സ് പൂർത്തിയാക്കിയിട്ടുണ്ട്.\"",
      "options": [
        "A) already",
        "B) never",
        "C) not",
        "D) future"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "What does \"opportunity\" mean?",
      "questionMl": "\"Opportunity\" എന്നാൽ എന്ത്?",
      "options": [
        "A) A mistake",
        "B) A set of circumstances that makes it possible to do something / A chance",
        "C) A problem",
        "D) A delay"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What word means \"a conclusion reached after consideration\"?",
      "questionMl": "ഒരു തീരുമാനത്തെ/തീർപ്പിനെ ഇംഗ്ലീഷിൽ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Problem",
        "B) Question",
        "C) Decision",
        "D) Hesitation"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "What word refers to a means of solving a problem or dealing with a difficult situation?",
      "questionMl": "ഒരു പ്രശ്നത്തിനുള്ള പരിഹാരത്തെ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Challenge",
        "B) Conflict",
        "C) Doubt",
        "D) Solution"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "What word means \"a testing or difficult task/situation\"?",
      "questionMl": "ഒരു വെല്ലുവിളിയെ ഇംഗ്ലീഷിൽ എന്ത് വിളിക്കുന്നു?",
      "options": [
        "A) Challenge",
        "B) Agreement",
        "C) Solution",
        "D) Opinion"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the polite response: \"Thank you for helping me.\" → \"_____. It was my pleasure.\"",
      "questionMl": "പ്രതികരണം പൂർത്തിയാക്കുക:",
      "options": [
        "A) Not helping",
        "B) No problem",
        "C) Why thanks",
        "D) Pay me"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the option that correctly combines polite English and natural expression:",
      "questionMl": "മര്യാദയുള്ളതും സ്വാഭാവികവുമായ ശരിയായ ഇംഗ്ലീഷ് വാചകം തിരഞ്ഞെടുക്കുക:",
      "options": [
        "A) Tell interview fast.",
        "B) Interview happened how?",
        "C) By the way, how was your interview?",
        "D) How interview done?"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "What is the ultimate goal of real-life English communication?",
      "questionMl": "വാസ്തവ ജീവിതത്തിലെ ഇംഗ്ലീഷ് ആശയവിനിമയത്തിന്റെ അന്തിമ ലക്ഷ്യം എന്താണ്?",
      "options": [
        "A) To memorize grammar rules without speaking",
        "B) To speak as fast as possible with errors",
        "C) To avoid talking to people",
        "D) To speak naturally and confidently without translating mentally from Malayalam"
      ],
      "correctIndex": 3
    }
  ],
  "31": [
    {
      "id": 1,
      "question": "Instead of the basic phrase \"Very good\", what natural expression can you use?",
      "questionMl": "\"Very good\" എന്നതിന് പകരം ഉപയോഗിക്കാവുന്ന സ്വാഭാവികമായ ഇംഗ്ലീഷ് ശൈലി ഏതാണ്?",
      "options": [
        "A) That's awesome!",
        "B) Very fine.",
        "C) Too much good.",
        "D) Much better good."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "What is a more natural spoken expression for \"Okay\"?",
      "questionMl": "\"Okay\" എന്നതിന് പകരം കൂടുതൽ സ്വാഭാവികമായി എന്താണ് പറയാൻ സാധിക്കുക?",
      "options": [
        "A) Is good.",
        "B) Sounds good.",
        "C) Okaying.",
        "D) Fine okay."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "How do native speakers naturally say \"Wait\" when asking for a brief moment?",
      "questionMl": "\"Wait\" എന്ന് പറയുന്നതിന് പകരം ഒരു നിമിഷം കാത്തുനിൽക്കാൻ ഏത് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) Stop walking.",
        "B) Standing there.",
        "C) Hang on a second.",
        "D) Wait line."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Instead of saying \"I don't know\", what polite phrase can you use?",
      "questionMl": "\"I don't know\" എന്നതിന് പകരം ഉപയോഗിക്കാവുന്ന മര്യാദയുള്ള വാചകം ഏതാണ്?",
      "options": [
        "A) I don't care.",
        "B) No knowledge me.",
        "C) Ask others.",
        "D) I'm not sure."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "What is an expressive way to say \"Thank you\" to show deep appreciation?",
      "questionMl": "\"Thank you\" എന്നതിന് പകരം കൃതജ്ഞത പ്രകടിപ്പിക്കാൻ ഉപയോഗിക്കുന്ന വാചകം ഏതാണ്?",
      "options": [
        "A) I appreciate it.",
        "B) Thanks done.",
        "C) Too much thank.",
        "D) Giving thanks."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What is a natural way to say \"Come quickly / Come fast\"?",
      "questionMl": "\"Come quickly\" എന്നതിന് പകരം എന്താണ് പറയേണ്ടത്?",
      "options": [
        "A) Run fastly.",
        "B) Hurry up!",
        "C) Come speed.",
        "D) Fast coming."
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "What expression means \"I understand / I comprehend\"?",
      "questionMl": "\"എനിക്ക് മനസ്സിലായി\" എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന നാച്വറൽ ശൈലി ഏതാണ്?",
      "options": [
        "A) Catch it.",
        "B) Take it.",
        "C) Got it.",
        "D) Hold it."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "What casual expression is used to say \"It's okay / Don't worry about it\"?",
      "questionMl": "\"പ്രശ്നമില്ല / സാരമില്ല\" എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന കാഷ്വൽ ശൈലി ഏതാണ്?",
      "options": [
        "A) No fear.",
        "B) Worry not.",
        "C) Not matter.",
        "D) No worries."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Which conversation filler is used while considering or thinking about an answer?",
      "questionMl": "ചിന്തിക്കുമ്പോഴും കാര്യങ്ങൾ പ്ലാൻ ചെയ്യുമ്പോഴും ഉപയോഗിക്കുന്ന സംഭാഷണ ഫില്ലർ ഏതാണ്?",
      "options": [
        "A) Well...",
        "B) Stop...",
        "C) End...",
        "D) Fast..."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "What conversation filler is used to state a fact or truth?",
      "questionMl": "ഒരു കാര്യത്തിന്റെ സത്യാവസ്ഥ വെളിപ്പെടുത്തുമ്പോൾ ഉപയോഗിക്കുന്ന ഫില്ലർ ഏതാണ്?",
      "options": [
        "A) Fake...",
        "B) Actually...",
        "C) Lie...",
        "D) Wrongly..."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "What filler is used to share something truthful and candid?",
      "questionMl": "\"സത്യമായി പറഞ്ഞാൽ...\" എന്ന് വ്യക്തമാക്കാൻ ഏത് പദം ഉപയോഗിക്കാം?",
      "options": [
        "A) Dishonestly...",
        "B) Cheat...",
        "C) Honestly...",
        "D) Doubt..."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What filler is used to explain the main point or core idea simply?",
      "questionMl": "\"അടിസ്ഥാനപരമായി പറയുകയാണെങ്കിൽ...\" എന്ന് വ്യക്തമാക്കാൻ ഏത് ഫില്ലർ ഉപയോഗിക്കാം?",
      "options": [
        "A) Hard...",
        "B) Complex...",
        "C) Tough...",
        "D) Basically..."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "What power phrase filler helps keep a casual connection with the listener?",
      "questionMl": "\"നിങ്ങൾക്ക് അറിയാമല്ലോ...\" എന്ന് സ്വാഭാവികമായി സംഭാഷണത്തിൽ ചേർക്കാൻ ഏത് ഫ്രെയ്സ് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) You know...",
        "B) You know not...",
        "C) Don't know...",
        "D) Know you..."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "What filler is used to clarify or rephrase what you intended to say?",
      "questionMl": "\"ഞാൻ ഉദ്ദേശിച്ചത് എന്തെന്നാൽ...\" എന്ന് പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) I say...",
        "B) I mean...",
        "C) I call...",
        "D) I shout..."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "What natural reaction shows shock or disbelief at surprising news?",
      "questionMl": "വിശ്വസിക്കാൻ പ്രയാസമുള്ള കാര്യങ്ങൾ കേൾക്കുമ്പോൾ ഉപയോഗിക്കുന്ന പ്രതികരണം ഏതാണ്?",
      "options": [
        "A) Go away!",
        "B) Yes way!",
        "C) No way!",
        "D) Walk away!"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "How do you express strong emphatic agreement instead of just saying \"Yes\"?",
      "questionMl": "\"Yes\" എന്നതിന് പകരം തീർച്ചയായും യോജിക്കുന്നു എന്ന് പറയാൻ ഏത് വാക്ക് ഉപയോഗിക്കാം?",
      "options": [
        "A) Never.",
        "B) No.",
        "C) Seldom.",
        "D) Absolutely."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "What phrase means \"Go ahead and do it confidently\"?",
      "questionMl": "\"ധൈര്യമായി മുന്നോട്ട് പോയി ചെയ്യൂ\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Go for it.",
        "B) Go back.",
        "C) Don't do it.",
        "D) Stop it."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What casual phrase means \"It was my mistake\"?",
      "questionMl": "\"എന്റെ തെറ്റാണ്\" എന്ന് സ്വയം ഏറ്റുപറയാൻ കാഷ്വലായി ഉപയോഗിക്കുന്ന വാചകം ഏതാണ്?",
      "options": [
        "A) My good.",
        "B) My bad.",
        "C) Your bad.",
        "D) Their fault."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What phrase means \"I am fully prepared and ready\"?",
      "questionMl": "\"ഞാൻ പൂർണ്ണമായും തയ്യാറാണ്\" എന്ന് പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) I'm sleeping.",
        "B) I'm going.",
        "C) I'm all set.",
        "D) I'm confused."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "What phrase means \"I am currently traveling / on my destination route\"?",
      "questionMl": "\"ഞാൻ വരുന്ന വഴിയിലാണ്\" എന്ന് അറിയിക്കാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) I'm at home.",
        "B) I'm sleeping.",
        "C) I'm stopped.",
        "D) I'm on my way."
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "In a professional context, what phrase means \"I will check and provide details later\"?",
      "questionMl": "പ്രൊഫഷണലായി \"ഞാൻ പരിശോധിച്ച ശേഷം പിന്നീട് വിവരങ്ങൾ അറിയിക്കാം\" എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) I'll get back to you.",
        "B) Don't ask me.",
        "C) Ask someone else.",
        "D) I forgot it."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "What professional phrase means \"Keep sharing updates with me\"?",
      "questionMl": "\"പുതിയ വിവരങ്ങൾ എന്നെ അറിയിച്ചുകൊണ്ടിരിക്കുക\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Don't send mail.",
        "B) Keep me posted.",
        "C) Stop updates.",
        "D) Forget me."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What phrase shows that a proposed plan sounds acceptable and good?",
      "questionMl": "\"നല്ലൊരു പദ്ധതിയാണ് / എനിക്ക് സമ്മതമാണ്\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Bad plan.",
        "B) No planning.",
        "C) Sounds like a plan.",
        "D) Don't plan."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Correct the mistake: \"Come fast.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Come fast.\"",
      "options": [
        "A) Fast coming.",
        "B) Speed run.",
        "C) Come speed.",
        "D) Hurry up!"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Correct the mistake: \"Wait.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Wait.\"",
      "options": [
        "A) Hang on a second.",
        "B) Wait line.",
        "C) Stopping.",
        "D) Wait there now."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Correct the mistake: \"Very good.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"Very good.\"",
      "options": [
        "A) Much good.",
        "B) That's awesome!",
        "C) Very much good.",
        "D) Gooding."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the phrase: \"Thanks for _____ me know.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"എന്നെ കാര്യം അറിയിച്ചതിന് നന്ദി.\"",
      "options": [
        "A) making",
        "B) giving",
        "C) letting",
        "D) telling to"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the phrase: \"I'll look _____ it.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"ഞാൻ അത് പരിശോധിക്കാം.\"",
      "options": [
        "A) onto",
        "B) over to",
        "C) out of",
        "D) into"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "What natural reaction means \"How wonderful / impressive!\"?",
      "questionMl": "\"അത്ഭുതകരം / വളരെയധികം കൊള്ളാം\" എന്ന് പറയാൻ ഏത് വാക്ക് ഉപയോഗിക്കാം?",
      "options": [
        "A) That's amazing!",
        "B) That's terrible!",
        "C) That's boring!",
        "D) That's bad!"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the polite disagreement phrase: \"I see your point, _____\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"നിങ്ങളുടെ അഭിപ്രായം എനിക്ക് മനസ്സിലാകുന്നു, പക്ഷേ...\"",
      "options": [
        "A) and...",
        "B) but...",
        "C) so...",
        "D) or..."
      ],
      "correctIndex": 1
    }
  ],
  "32": [
    {
      "id": 1,
      "question": "Instead of saying \"I think...\", what is an advanced professional phrase to state your opinion?",
      "questionMl": "\"I think...\" എന്നതിന് പകരം സ്വന്തം അഭിപ്രായം പറയാൻ ഉപയോഗിക്കുന്ന അഡ്വാൻസ്ഡ് ശൈലി ഏതാണ്?",
      "options": [
        "A) My mind says...",
        "B) Brain thinking...",
        "C) In my opinion...",
        "D) I am thought..."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Instead of saying \"I think yes\", what phrase expresses complete agreement?",
      "questionMl": "\"ഞാൻ പൂർണ്ണമായും യോജിക്കുന്നു\" എന്ന് പറയാൻ ഏത് അഡ്വാൻസ്ഡ് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) I agree yes.",
        "B) Thinking yes.",
        "C) Yes I think.",
        "D) I couldn't agree more."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Instead of \"I don't know\", what advanced expression means \"To the extent of my knowledge\"?",
      "questionMl": "\"എനിക്ക് അറിയാവുന്നിടത്തോളം...\" എന്ന് പറയാൻ ഏത് അഡ്വാൻസ്ഡ് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) As far as I know...",
        "B) No knowledge...",
        "C) Unknown to me...",
        "D) I am blank..."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Instead of saying \"Maybe\", what phrase indicates that the answer depends on conditions?",
      "questionMl": "\"സാഹചര്യങ്ങളെ ആശ്രയിച്ചിരിക്കുന്നു\" എന്ന് വ്യക്തമാക്കാൻ ഏത് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) Maybe yes no.",
        "B) It depends.",
        "C) Doubting.",
        "D) Not fixed."
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Instead of saying \"Listen...\", what phrase is used to draw attention to the main point?",
      "questionMl": "\"കാര്യം ഇതാണ്...\" എന്ന് സംഭാഷണത്തിൽ ശ്രദ്ധ തിരിക്കാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Listen me...",
        "B) Ear give me...",
        "C) Here's the thing...",
        "D) Hearing this..."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Instead of saying \"Because...\", what formal phrase introduces the primary reason?",
      "questionMl": "\"പ്രധാന കാരണം എന്തെന്നാൽ...\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കാം?",
      "options": [
        "A) Because why...",
        "B) Reason is that why...",
        "C) Due to because...",
        "D) The main reason is..."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Instead of saying \"Finally...\", what phrase is used to conclude a topic or presentation?",
      "questionMl": "\"ചുരുക്കി പറഞ്ഞാൽ / ഉപസംഹരിക്കുകയാണെങ്കിൽ...\" എന്ന് പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) To sum up...",
        "B) Finish all...",
        "C) Last line...",
        "D) End of story..."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Instead of \"I want to say...\", what phrase expresses your desire to make a statement politely?",
      "questionMl": "\"ഞാൻ പറയാൻ ആഗ്രഹിക്കുന്നത് എന്തെന്നാൽ...\" എന്ന് മര്യാദയോടെ എങ്ങനെ പറയാം?",
      "options": [
        "A) I tell want...",
        "B) What I'd like to say is...",
        "C) Saying my wish...",
        "D) Want to tell..."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Instead of bluntly saying \"I think you're wrong\", how do you politely disagree?",
      "questionMl": "\"നിങ്ങളുടെ അഭിപ്രായം എനിക്ക് മനസ്സിലാകുന്നുണ്ട്, പക്ഷേ...\" എന്ന് മര്യാദയോടെ എങ്ങനെ പറയാം?",
      "options": [
        "A) You are wrong completely.",
        "B) Bad opinion yours.",
        "C) I see your point, but...",
        "D) Shut your mouth."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What conversation starter is used when sharing a candid, truthful feeling?",
      "questionMl": "\"സത്യമായി പറഞ്ഞാൽ...\" എന്ന് പറയാൻ ഉപയോഗിക്കുന്ന അഡ്വാൻസ്ഡ് ശൈലി ഏതാണ്?",
      "options": [
        "A) Lie away...",
        "B) Fake opinion...",
        "C) Truth telling...",
        "D) To be honest..."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "What phrase means \"Whether you accept it as true or not, it is a fact\"?",
      "questionMl": "\"വിശ്വസിച്ചാലും ഇല്ലെങ്കിലും...\" എന്ന് പറയാൻ ഏത് ഫ്രെയ്സ് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) Believe it or not...",
        "B) Don't believe...",
        "C) Lie or truth...",
        "D) Fake story..."
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What phrase means \"When everything is taken into consideration / ultimately\"?",
      "questionMl": "\"അവസാനം പ്രധാനപ്പെട്ടത്...\" എന്ന് ഉപസംഹാരമായി പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) At night time...",
        "B) At the end of the day...",
        "C) Day ending...",
        "D) Sun setting..."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Which phrase is used to give your own personal perspective?",
      "questionMl": "\"വ്യക്തിപരമായി പറയുകയാണെങ്കിൽ...\" എന്ന് പറയാൻ ഏത് വാക്ക് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) Publicly...",
        "B) Everyone...",
        "C) Personally...",
        "D) Nobody..."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "How do you introduce an opinion based on what you have experienced in life?",
      "questionMl": "\"എന്റെ അനുഭവത്തിൽ നിന്ന്...\" എന്ന് പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കാം?",
      "options": [
        "A) From my eyes...",
        "B) From my brain...",
        "C) From my home...",
        "D) From my experience..."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "What phrase invites the speaker's personal viewpoint if requested?",
      "questionMl": "\"എന്നോട് ചോദിക്കുകയാണെങ്കിൽ...\" എന്ന് പറയാൻ ഏത് ശൈലി ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) If you ask me...",
        "B) Don't ask me...",
        "C) Asking me why...",
        "D) You tell me..."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "What phrase is used to state a firm personal conviction?",
      "questionMl": "\"ഞാൻ ഉറച്ചു വിശ്വസിക്കുന്നു\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) I weakly think...",
        "B) I strongly believe...",
        "C) Doubt is there...",
        "D) Not sure..."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "What advanced phrase means \"As far as it affects or relates to me\"?",
      "questionMl": "\"എന്നെ സംബന്ധിച്ചിടത്തോളം...\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) As far as I go...",
        "B) Far away from me...",
        "C) As far as I'm concerned...",
        "D) Not concerned me..."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What phrase means \"The way I interpret or analyze the situation\"?",
      "questionMl": "\"ഞാൻ ഇതിനെ കാണുന്ന രീതിയിൽ...\" എന്ന് പറയാൻ ഏത് ഫ്രെയ്സ് ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) The eye I look...",
        "B) Seeing way my...",
        "C) Looking like this...",
        "D) The way I see it..."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "How do you offer a polite request to clear up any misunderstanding in a meeting?",
      "questionMl": "\"വ്യക്തത വരുത്താൻ എന്നെ അനുവദിക്കൂ\" എന്ന് പ്രൊഫഷണലായി എങ്ങനെ പറയാം?",
      "options": [
        "A) Allow me to clarify.",
        "B) Clear it now.",
        "C) Stop confusion.",
        "D) Listen to my clear text."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "How do you politely request to contribute a point to an ongoing discussion?",
      "questionMl": "\"എനിക്ക് ഒരു കാര്യം കൂടി കൂട്ടിച്ചേർക്കാനുണ്ട്\" എന്ന് പ്രൊഫഷണലായി എങ്ങനെ പറയാം?",
      "options": [
        "A) I will talk now.",
        "B) I'd like to add something.",
        "C) Stop talking I add.",
        "D) My point listen."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "What compliment do you give when someone raises a thoughtful question in a presentation?",
      "questionMl": "\"അതൊരു മികച്ച ചോദ്യമാണ്\" എന്ന് പറയാൻ ഏത് വാചകം ഉപയോഗിക്കുന്നു?",
      "options": [
        "A) Bad question raised.",
        "B) Why this question?",
        "C) That's a great question.",
        "D) Don't ask questions."
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "How do you thank someone for drawing attention to an important error or detail?",
      "questionMl": "\"അത് ചൂണ്ടിക്കാണിച്ചതിന് നന്ദി\" എന്ന് പ്രൊഫഷണലായി എങ്ങനെ പറയാം?",
      "options": [
        "A) Don't point details.",
        "B) Why pointing me?",
        "C) Finger pointing bad.",
        "D) Thank you for pointing that out."
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "What phrase directs a team's energy toward resolving a problem rather than complaining?",
      "questionMl": "\"നമുക്ക് പരിഹാരത്തിലേക്ക് ശ്രദ്ധ കേന്ദ്രീകരിക്കാം\" എന്ന് എങ്ങനെ പറയാം?",
      "options": [
        "A) Let's focus on the solution.",
        "B) Focus on problem only.",
        "C) Cry about problem.",
        "D) Blame each other."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "What informal idiom means \"To make a long story brief and get to the point\"?",
      "questionMl": "\"ചുരുക്കത്തിൽ സംഗതി ഇതാണ്...\" എന്ന് പറയാൻ ഏത് ഇഡിയം ഉപയോഗിക്കാം?",
      "options": [
        "A) Big story long...",
        "B) Long story short...",
        "C) Short story reading...",
        "D) Tell long story..."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What word refers to a particular attitude or way of considering a matter?",
      "questionMl": "കാഴ്ചപ്പാട് എന്ന അർത്ഥത്തിൽ വരുന്ന വാക്ക് ഏതാണ്?",
      "options": [
        "A) Receipt",
        "B) Platform",
        "C) Perspective",
        "D) Destination"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "What word means \"the quality of always performing in a similar way or maintaining high standards\"?",
      "questionMl": "സ്ഥിരത എന്ന അർത്ഥം വരുന്ന അഡ്വാൻസ്ഡ് വാക്ക് ഏതാണ്?",
      "options": [
        "A) Delay",
        "B) Error",
        "C) Weakness",
        "D) Consistency"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Correct the mistake: \"I think you're wrong.\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I think you're wrong.\"",
      "options": [
        "A) I see your point, but...",
        "B) You are wrong completely.",
        "C) Bad opinion yours.",
        "D) Shut up now."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Correct the mistake: \"I want to say...\"",
      "questionMl": "തെറ്റ് തിരുത്തുക: \"I want to say...\"",
      "options": [
        "A) Saying wish I have.",
        "B) What I'd like to say is...",
        "C) Wanting to tell.",
        "D) I am tell want."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Fill in the blank: \"At the end of the day, _____ matters.\"",
      "questionMl": "വിട്ടഭാഗം പൂരിപ്പിക്കുക: \"അവസാനം പ്രധാനം ആത്മവിശ്വാസമാണ്.\"",
      "options": [
        "A) fear",
        "B) worry",
        "C) confidence",
        "D) hesitation"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the phrase: \"To sum up, practice makes _____.\"",
      "questionMl": "വാചകം പൂർത്തിയാക്കുക: \"ചുരുക്കത്തിൽ, പരിശീലനം പുരോഗതിയിലേക്ക് നയിക്കുന്നു.\"",
      "options": [
        "A) problem",
        "B) failure",
        "C) delay",
        "D) progress"
      ],
      "correctIndex": 3
    }
  ]
};

if (typeof window !== 'undefined') {
  window.QUIZ_BANK = QUIZ_BANK;
}
if (typeof globalThis !== 'undefined') {
  globalThis.QUIZ_BANK = QUIZ_BANK;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUIZ_BANK };
}
