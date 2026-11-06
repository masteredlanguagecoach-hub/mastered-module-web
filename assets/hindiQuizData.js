/**
 * Mastered Language Coach - 32-Mission Hindi Quiz Bank
 * Aligned with Official 32-Mission Curriculum (Missions.pdf, spec_report.md & curriculum.js)
 * Exactly 32 missions (keys "1" to "32"), 30 questions each = 960 questions total.
 * Schema: { id: 1..30, question: string, questionHindi: string, options: [string x 4], correctIndex: 0..3 }
 * Options prefixed with A), B), C), D). Balanced correctIndex (~25% each).
 */
const HINDI_QUIZ_BANK = {
  "1": [
    {
      "id": 1,
      "question": "Translate the introduction: 'मेरा नाम राहुल है।' (My name is...)",
      "questionHindi": "आत्म-परिचय का अनुवाद करें: 'मेरा नाम राहुल है।'",
      "options": [
        "A) My name is Rahul.",
        "B) I am name Rahul.",
        "C) My name am Rahul.",
        "D) I name is Rahul."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Translate where you are from: 'मैं दिल्ली से हूँ।' (I am from...)",
      "questionHindi": "आप कहाँ से हैं यह बताने वाले वाक्य का अनुवाद करें: 'मैं दिल्ली से हूँ।'",
      "options": [
        "A) I am to Delhi.",
        "B) I am from Delhi.",
        "C) My place am Delhi.",
        "D) I from Delhi."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I am teacher.",
        "B) I am an teacher.",
        "C) I am a teacher.",
        "D) My job teacher."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Translate your hobby: 'मुझे किताबें पढ़ना पसंद है।' (I like reading...)",
      "questionHindi": "अपने शौक का अनुवाद करें: 'मुझे किताबें पढ़ना पसंद है।'",
      "options": [
        "A) My hobby reading books.",
        "B) I am like reading books.",
        "C) I reading books.",
        "D) I like reading books."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) By profession",
        "B) By hobby",
        "C) By name",
        "D) By goal"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Choose the correct English phrase for 'मेरा लक्ष्य':",
      "questionHindi": "'मेरा लक्ष्य' के लिए सही अंग्रेजी वाक्यांश चुनें:",
      "options": [
        "A) My hobby",
        "B) My goal",
        "C) My profession",
        "D) My place"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Choose the correct English word for where you are from originally: 'मूल रूप से'",
      "questionHindi": "मूल रूप से (where you are from) के लिए सही अंग्रेजी शब्द चुनें: 'मूल रूप से'",
      "options": [
        "A) Currently",
        "B) Finally",
        "C) Originally",
        "D) Usually"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct English phrase for your free-time hobby: 'खाली समय'",
      "questionHindi": "खाली समय के शौक (free-time hobby) के लिए सही अंग्रेजी वाक्यांश चुनें: 'खाली समय'",
      "options": [
        "A) Busy time",
        "B) Work time",
        "C) Goal time",
        "D) Free time"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) am",
        "B) is",
        "C) are",
        "D) be"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Which article correctly fits: 'I am ____ artist.'?",
      "questionHindi": "कौन सा आर्टिकल सही है: 'I am ____ artist.'?",
      "options": [
        "A) 'a'",
        "B) 'an'",
        "C) 'the'",
        "D) no article needed"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) 'an'",
        "B) 'the'",
        "C) 'a'",
        "D) no article needed"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) 'I'",
        "B) Me",
        "C) Am",
        "D) My"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) My",
        "B) 'I'",
        "C) Me",
        "D) Am"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Fill in the blank (एक): 'I have ____ passion for learning new languages.'",
      "questionHindi": "रिक्त स्थान भरें (एक): 'I have ____ passion for learning new languages.'",
      "options": [
        "A) 'an'",
        "B) 'a'",
        "C) 'the'",
        "D) my"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) was"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Please tell your hobby.",
        "B) Please show your place.",
        "C) Please meet your goal.",
        "D) Please introduce yourself."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I enjoy listening to music in my free time.",
        "B) My free time is listen music.",
        "C) I am listening music free time.",
        "D) I like music in my work time."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Translate the sentence: 'मेरा मुख्य लक्ष्य अंग्रेजी बोलना सुधारना है।'",
      "questionHindi": "वाक्य का अनुवाद करें: 'मेरा मुख्य लक्ष्य अंग्रेजी बोलना सुधारना है।'",
      "options": [
        "A) My main hobby is learning English.",
        "B) My primary goal is to improve my English speaking skills.",
        "C) I am improving my English goal.",
        "D) My profession is English speaking skills."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) What is your hometown like?",
        "B) Where do you live now?",
        "C) Where are you originally from?",
        "D) Which profession are you from?"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) What is your hometown name?",
        "B) Where is your hometown located?",
        "C) How is your hometown city?",
        "D) What do you like most about your hometown?"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Hobby",
        "B) Goal",
        "C) Name",
        "D) Place"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Tell your goal",
        "B) Introduce yourself",
        "C) Ask a question",
        "D) Describe your city"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Introduce",
        "B) Enjoy",
        "C) Improve",
        "D) Speak"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Country",
        "B) Profession",
        "C) Skill",
        "D) Hometown"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Select the grammatically correct sentence:",
      "questionHindi": "व्याकरण की दृष्टि से सही वाक्य चुनें:",
      "options": [
        "A) I am a student from Mumbai.",
        "B) I is a student from Mumbai.",
        "C) My am a student from Mumbai.",
        "D) I are a student from Mumbai."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Select the grammatically correct sentence:",
      "questionHindi": "व्याकरण की दृष्टि से सही वाक्य चुनें:",
      "options": [
        "A) I am an accountant.",
        "B) I am a accountant.",
        "C) My name am an accountant.",
        "D) I is an accountant."
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) one",
        "B) two",
        "C) 'an'",
        "D) 'a'"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) My",
        "B) Me",
        "C) 'I'",
        "D) Mine"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I am introducing you today.",
        "B) My name is meeting you.",
        "C) I am happy to see your place.",
        "D) I am meeting you for the first time."
      ],
      "correctIndex": 3
    },
    {
      "id": 30,
      "question": "Translate the sentence describing your two favorite hobbies: 'मेरे दो पसंदीदा शौक खाना पकाना और तैरना हैं।'",
      "questionHindi": "अपने दो पसंदीदा शौक (two hobbies) बताने वाले वाक्य का अनुवाद करें:",
      "options": [
        "A) My two favorite hobbies are cooking and swimming.",
        "B) I like two hobbies is cook and swim.",
        "C) My goal is cooking and swimming.",
        "D) I am hobbies are cooking and swimming."
      ],
      "correctIndex": 0
    }
  ],
  "2": [
    {
      "id": 1,
      "question": "He is my father.",
      "questionHindi": "वह मेरे पिताजी हैं।",
      "options": [
        "A) He is my father.",
        "B) She is my father.",
        "C) They is my father.",
        "D) We is my father."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct pronoun for a female classmate: '____ is my classmate.'",
      "questionHindi": "एक महिला सहपाठी के लिए सही सर्वनाम चुनें: '____ is my classmate.'",
      "options": [
        "A) He",
        "B) They",
        "C) We",
        "D) She"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) He is my friend.",
        "B) They are my friends.",
        "C) She is my friend.",
        "D) We is my friends."
      ],
      "correctIndex": 1
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'My brother is kind. ____ is very helpful.'",
      "questionHindi": "रिक्त स्थान भरें: 'My brother is kind. ____ is very helpful.'",
      "options": [
        "A) She",
        "B) They",
        "C) We",
        "D) He"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) She are my mother.",
        "B) They is my mother.",
        "C) He is my mother.",
        "D) She is my mother."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Complete the sentence: 'We ____ colleagues at the office.'",
      "questionHindi": "वाक्य पूरा करें: 'We ____ colleagues at the office.'",
      "options": [
        "A) are",
        "B) is",
        "C) am",
        "D) be"
      ],
      "correctIndex": 0
    },
    {
      "id": 7,
      "question": "Translate: 'मेरी बहन एक शिक्षिका है।'",
      "questionHindi": "अनुवाद करें: 'मेरी बहन एक शिक्षिका है।'",
      "options": [
        "A) He is a teacher.",
        "B) She is a teacher.",
        "C) They are teachers.",
        "D) We are teachers."
      ],
      "correctIndex": 1
    },
    {
      "id": 8,
      "question": "Choose the correct grammar: '____ are my classmates.'",
      "questionHindi": "सही व्याकरण चुनें: '____ are my classmates.'",
      "options": [
        "A) He",
        "B) She",
        "C) It",
        "D) They"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) She is my friend.",
        "B) He is my friend.",
        "C) They are my friends.",
        "D) We is my friend."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Which sentence is grammatically correct?",
      "questionHindi": "कौन सा वाक्य व्याकरण की दृष्टि से सही है?",
      "options": [
        "A) They is my sister.",
        "B) She are my sister.",
        "C) He is my brother.",
        "D) We is my brother."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) They are friends.",
        "B) We are friends.",
        "C) She is a friend.",
        "D) He is a friend."
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) They",
        "B) We",
        "C) He",
        "D) It"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) She is my colleague.",
        "B) They are my colleagues.",
        "C) He is my colleague.",
        "D) I is my colleague."
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Choose the correct form: 'My sister and I ____ happy.'",
      "questionHindi": "सही रूप चुनें: 'My sister and I ____ happy.'",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) be"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Friend",
        "B) Colleague",
        "C) Classmate",
        "D) Teacher"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) He is my colleague.",
        "B) They are my colleagues.",
        "C) She is my colleague.",
        "D) We are my colleagues."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) She is my friend.",
        "B) They are my friend.",
        "C) He is my friend.",
        "D) We is my friend."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Fill in the blank: '____ is my sister, she is a doctor.'",
      "questionHindi": "रिक्त स्थान भरें: '____ is my sister, she is a doctor.'",
      "options": [
        "A) He",
        "B) They",
        "C) We",
        "D) She"
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) मित्र",
        "B) सहकर्मी",
        "C) भाई",
        "D) शिक्षिका"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) They",
        "B) He",
        "C) She",
        "D) We"
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) He is my brother.",
        "B) They is my brother.",
        "C) She are my brother.",
        "D) We is my brother."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) He is my mother and he is good.",
        "B) They are my mother and they are good.",
        "C) She is my mother and she is good.",
        "D) We are my mother and we are good."
      ],
      "correctIndex": 2
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) He is a helpful classmate.",
        "B) She are a helpful classmate.",
        "C) They is a helpful classmate.",
        "D) We is a helpful classmate."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) He",
        "B) She",
        "C) They",
        "D) It"
      ],
      "correctIndex": 2
    },
    {
      "id": 25,
      "question": "What does 'She is my sister' mean in Hindi?",
      "questionHindi": "'She is my sister' का हिंदी में क्या अर्थ है?",
      "options": [
        "A) वह मेरा भाई है।",
        "B) वह मेरी बहन है।",
        "C) वे मेरी बहनें हैं।",
        "D) हम बहनें हैं।"
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Complete the sentence: 'My friend and I ____ classmates.'",
      "questionHindi": "वाक्य पूरा करें: 'My friend and I ____ classmates.'",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) be"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) He",
        "B) She",
        "C) They",
        "D) We"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) He and she is good.",
        "B) They are good.",
        "C) She and he is good.",
        "D) We is good."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) They are my friends.",
        "B) He are my friends.",
        "C) She are my friends.",
        "D) We is my friends."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Select the correct phrase for 'वे मेरे सहपाठी हैं'.",
      "questionHindi": "'वे मेरे सहपाठी हैं' के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) He is my classmate.",
        "B) She is my classmate.",
        "C) They are my classmates.",
        "D) We is my classmates."
      ],
      "correctIndex": 2
    }
  ],
  "3": [
    {
      "id": 1,
      "question": "Choose the correct translation: 'मेरे पास एक पुरानी किताब है।'",
      "questionHindi": "Choose the correct translation: 'मेरे पास एक पुरानी किताब है।'",
      "options": [
        "A) I has an old book.",
        "B) This have an old book.",
        "C) That has an old book.",
        "D) I have an old book."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Complete the sentence: 'My brother ____ a new bicycle.'",
      "questionHindi": "वाक्य पूरा करें: 'My brother ____ a new bicycle.'",
      "options": [
        "A) have",
        "B) these",
        "C) those",
        "D) has"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) This is my favorite bag.",
        "B) This are my favorite bags.",
        "C) This have my bag.",
        "D) This my bag is."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Translate: 'ये मेरे माता-पिता हैं।'",
      "questionHindi": "Translate: 'ये मेरे माता-पिता हैं।'",
      "options": [
        "A) That is my parents.",
        "B) These is my parents.",
        "C) This are my parents.",
        "D) These are my parents."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) My sister have a teacher.",
        "B) My sister has a teacher.",
        "C) My sister this a teacher.",
        "D) My sister is a teacher."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Choose the correct word for 'वह मेरा घर है।'",
      "questionHindi": "Choose the correct word for 'वह मेरा घर है।'",
      "options": [
        "A) This is my home.",
        "B) These is my home.",
        "C) Those are my home.",
        "D) That is my home."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Fill in the blank: '____ are my friends playing in the garden.'",
      "questionHindi": "खाली स्थान भरें: '____ are my friends playing in the garden.'",
      "options": [
        "A) This",
        "B) That",
        "C) Has",
        "D) Those"
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "Identify the correct English translation for 'मेरी बहन के पास एक गुड़िया है।'",
      "questionHindi": "Identify the correct English translation for 'मेरी बहन के पास एक गुड़िया है।'",
      "options": [
        "A) My sister have a doll.",
        "B) My sister is a doll.",
        "C) My sister that a doll.",
        "D) My sister has a doll."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) They has a big house.",
        "B) They this a big house.",
        "C) They those a big house.",
        "D) They have a big house."
      ],
      "correctIndex": 3
    },
    {
      "id": 10,
      "question": "Translate: 'वे मेरी किताबें हैं।'",
      "questionHindi": "Translate: 'वे मेरी किताबें हैं।'",
      "options": [
        "A) Those are my books.",
        "B) These is my books.",
        "C) That are my books.",
        "D) This is my books."
      ],
      "correctIndex": 0
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) have",
        "B) these",
        "C) has",
        "D) this"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) That is my favorite room.",
        "B) These are my favorite rooms.",
        "C) This is my favorite room.",
        "D) Those is my favorite room."
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) I have a special watch.",
        "B) I has a special watch.",
        "C) I that a special watch.",
        "D) I this a special watch."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Translate: 'क्या तुम्हारे पास एक पालतू कुत्ता है?'",
      "questionHindi": "Translate: 'क्या तुम्हारे पास एक पालतू कुत्ता है?'",
      "options": [
        "A) Has you a pet dog?",
        "B) Is you a pet dog?",
        "C) Have you a pet dog?",
        "D) That you a pet dog?"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) This",
        "B) That",
        "C) Those",
        "D) Has"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) have",
        "B) this",
        "C) has",
        "D) these"
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) These toys are mine.",
        "B) Those toys are mine.",
        "C) This toys are mine.",
        "D) That toys are mine."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Which sentence correctly describes a family activity?",
      "questionHindi": "कौन सा वाक्य पारिवारिक गतिविधि का सही वर्णन करता है?",
      "options": [
        "A) We has dinner together.",
        "B) We have dinner together.",
        "C) We this dinner together.",
        "D) We those dinner together."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) These",
        "B) Those",
        "C) This",
        "D) Have"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) They has a big house.",
        "B) They have a big house.",
        "C) They this a big house.",
        "D) They those a big house."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) This",
        "B) That",
        "C) Those",
        "D) Has"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) My brother is a doctor.",
        "B) My brother has a doctor.",
        "C) My brother this a doctor.",
        "D) My brother those a doctor."
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) That is my pen.",
        "B) This is my pen.",
        "C) These are my pens.",
        "D) Those are my pens."
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) has",
        "B) have",
        "C) this",
        "D) that"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Which sentence describes your belongings?",
      "questionHindi": "कौन सा वाक्य आपके सामान का वर्णन करता है?",
      "options": [
        "A) I have a blue bag.",
        "B) I has a blue bag.",
        "C) I this a blue bag.",
        "D) I that a blue bag."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Translate: 'वे मेरे दोस्त हैं।'",
      "questionHindi": "Translate: 'वे मेरे दोस्त हैं।'",
      "options": [
        "A) These are my friends.",
        "B) Those are my friends.",
        "C) This is my friend.",
        "D) That is my friend."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) have",
        "B) has",
        "C) this",
        "D) those"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) These",
        "B) Those",
        "C) This",
        "D) Have"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I has many books.",
        "B) I have many books.",
        "C) I this many books.",
        "D) I those many books."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Select the correct option for 'वह मेरा भाई है।'",
      "questionHindi": "Select the correct option for 'वह मेरा भाई है।'",
      "options": [
        "A) This is my brother.",
        "B) That is my brother.",
        "C) These are my brothers.",
        "D) Those are my brothers."
      ],
      "correctIndex": 1
    }
  ],
  "4": [
    {
      "id": 1,
      "question": "Choose the correct translation: 'मैं तैर सकता हूँ, लेकिन मैं साइकिल नहीं चला सकता।'",
      "questionHindi": "मैं तैर सकता हूँ, लेकिन मैं साइकिल नहीं चला सकता।",
      "options": [
        "A) I could swim, but I can't ride a bike.",
        "B) I can swim, and I can ride a bike.",
        "C) I can't swim, but I can ride a bike.",
        "D) I can swim, but I can't ride a bicycle."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which sentence is the most polite way to ask for help?",
      "questionHindi": "मदद मांगने का सबसे विनम्र तरीका कौन सा है?",
      "options": [
        "A) Help me now.",
        "B) Can you help me?",
        "C) You help me.",
        "D) Could you please help me with this?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Can you explain me in Hindi?",
        "B) Could you explain Hindi to me?",
        "C) Can you explain me to Hindi?",
        "D) Could you explain to me in Hindi?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'I ______ play the guitar when I was a child, but I can play it perfectly now.'",
      "questionHindi": "रिक्त स्थान भरें: 'मैं बचपन में गिटार नहीं बजा सकता था, लेकिन अब मैं इसे पूरी तरह बजा सकता हूँ।'",
      "options": [
        "A) can",
        "B) can't",
        "C) could",
        "D) couldn't"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I couldn't come tomorrow.",
        "B) I can come tomorrow.",
        "C) I could come tomorrow.",
        "D) I can't come tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Choose the best response to: 'Could you help me carry these bags?'",
      "questionHindi": "'क्या आप इन बैगों को ले जाने में मेरी मदद कर सकते हैं?' का सबसे अच्छा उत्तर चुनें।",
      "options": [
        "A) Yes, I can't.",
        "B) No, I can.",
        "C) I could not.",
        "D) Sure, I'd be happy to help."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Identify the correct sentence: 'क्या आप मेरी फाइल चेक कर सकते हैं?'",
      "questionHindi": "क्या आप मेरी फाइल चेक कर सकते हैं?",
      "options": [
        "A) Can you check my file?",
        "B) Could you checking my file?",
        "C) Can you checking my file?",
        "D) Could you check my file?"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Fill in the blank: '______ you please pass the salt?' (Polite request)",
      "questionHindi": "रिक्त स्थान भरें: 'क्या आप कृपया नमक पास कर सकते हैं?' (विनम्र अनुरोध)",
      "options": [
        "A) Can",
        "B) Should",
        "C) Could",
        "D) Must"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) मैं दो भाषाएं बोल सकता हूँ।",
        "B) मैं दो भाषाएं बोलता था।",
        "C) मैं दो भाषाएं बोलूँगा।",
        "D) मैं दो भाषाओं को समझता हूँ।"
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Choose the grammatically correct sentence.",
      "questionHindi": "व्याकरण की दृष्टि से सही वाक्य चुनें।",
      "options": [
        "A) She can to dance well.",
        "B) She cans dance well.",
        "C) She can dance well.",
        "D) She could to dance well."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) I can run fast.",
        "B) I can't run fast.",
        "C) I couldn't run fast.",
        "D) I could run fast."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) She can cook very well.",
        "B) She could cook very well.",
        "C) She can't cook very well.",
        "D) She could not cook very well."
      ],
      "correctIndex": 0
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) can",
        "B) can't",
        "C) could",
        "D) couldn't"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "How do you politely decline help?",
      "questionHindi": "आप विनम्रतापूर्वक मदद के लिए मना कैसे करेंगे?",
      "options": [
        "A) No, I can't.",
        "B) I am busy, go away.",
        "C) I'm sorry, I'm a bit busy right now.",
        "D) I can't help you."
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Can you tell me where the station is?",
        "B) Could you tell me where is the station?",
        "C) Can you tell me where is the station?",
        "D) Could you tell where the station is?"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) I could play chess.",
        "B) I can play chess.",
        "C) I couldn't play chess.",
        "D) I was able to play chess."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) can",
        "B) could",
        "C) can't",
        "D) couldn't"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Translate: 'क्या मैं आपकी मदद कर सकता हूँ?'",
      "questionHindi": "क्या मैं आपकी मदद कर सकता हूँ?",
      "options": [
        "A) Can I help you?",
        "B) Could I help you?",
        "C) Do I help you?",
        "D) Could I helped you?"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) can",
        "B) could",
        "C) can't",
        "D) couldn't"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Can you help me?",
        "B) Could you please help me?",
        "C) Help me, please.",
        "D) Will you help me?"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I couldn't drive before, but now I can.",
        "B) I can't drive before, but now I could.",
        "C) I can drive before, but now I couldn't.",
        "D) I couldn't drive before, but now I could."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) I am can paint.",
        "B) I can painting.",
        "C) I can paint.",
        "D) I painting can."
      ],
      "correctIndex": 2
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) helping",
        "B) help",
        "C) to help",
        "D) helped"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) मैं तुम्हें सुन सकता हूँ।",
        "B) मैं तुम्हें नहीं सुन सकता।",
        "C) क्या तुम मुझे सुन सकते हो?",
        "D) मैं तुम्हें सुन पाया।"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Choose the correct sentence structure.",
      "questionHindi": "सही वाक्य संरचना चुनें।",
      "options": [
        "A) Can you speak English?",
        "B) Can you to speak English?",
        "C) You can speak English?",
        "D) Speak you English can?"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: 'She ______ sing beautifully when she was a teenager.'",
      "questionHindi": "रिक्त स्थान भरें: 'वह जब किशोरी थी तब बहुत सुंदर गा सकती थी।'",
      "options": [
        "A) can",
        "B) could",
        "C) can't",
        "D) is able"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Can you give me some water?",
        "B) Could you give me some water?",
        "C) Can you gave me some water?",
        "D) Could you gave me some water?"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I can't read this map.",
        "B) I couldn't read this map.",
        "C) I can read this map.",
        "D) I could read this map."
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Yes, I could.",
        "B) Yes, I can.",
        "C) No, I can.",
        "D) Yes, I am."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Fill in the blank: 'I ______ run fast back then, but now I am too tired.'",
      "questionHindi": "रिक्त स्थान भरें: 'मैं तब तेज दौड़ सकता था, लेकिन अब मैं बहुत थक गया हूँ।'",
      "options": [
        "A) can",
        "B) could",
        "C) can't",
        "D) couldn't"
      ],
      "correctIndex": 1
    }
  ],
  "5": [
    {
      "id": 1,
      "question": "Translate: 'I have to finish my project by tomorrow.'",
      "questionHindi": "अनुवाद करें: 'मुझे कल तक अपना प्रोजेक्ट पूरा करना है।'",
      "options": [
        "A) I have to finish my project by tomorrow.",
        "B) I had to finish my project by tomorrow.",
        "C) I should finish my project by tomorrow.",
        "D) I has to finish my project by tomorrow."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Which sentence correctly describes a past responsibility?",
      "questionHindi": "कौन सा वाक्य पिछली जिम्मेदारी का सही वर्णन करता है?",
      "options": [
        "A) She has to clean the house.",
        "B) He should clean the room.",
        "C) I have to cook dinner.",
        "D) They had to attend the meeting yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) You have to quit your job.",
        "B) You should prioritize your tasks.",
        "C) You has to do everything at once.",
        "D) You had to ignore your deadlines."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Choose the correct phrase for: 'उसे आज जल्दी उठना है।'",
      "questionHindi": "Choose the correct phrase for: 'उसे आज जल्दी उठना है।'",
      "options": [
        "A) He has to wake up early today.",
        "B) He have to wake up early today.",
        "C) He should wake up early today.",
        "D) He had to wake up early today."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) has to",
        "B) should",
        "C) have to",
        "D) had to"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'You should take a break if you are tired.'",
      "questionHindi": "अनुवाद करें: 'यदि आप थक गए हैं तो आपको ब्रेक लेना चाहिए।'",
      "options": [
        "A) You should take a break if you are tired.",
        "B) You have to take a break if you are tired.",
        "C) You had to take a break if you are tired.",
        "D) You has to take a break if you are tired."
      ],
      "correctIndex": 0
    },
    {
      "id": 7,
      "question": "Which option correctly uses 'has to'?",
      "questionHindi": "कौन सा विकल्प 'has to' का सही उपयोग करता है?",
      "options": [
        "A) They has to work late.",
        "B) I has to study today.",
        "C) We has to go now.",
        "D) She has to finish her homework."
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "If you have multiple deadlines, what should you do?",
      "questionHindi": "यदि आपके पास कई समय सीमाएं (deadlines) हैं, तो आपको क्या करना चाहिए?",
      "options": [
        "A) You have to ignore them.",
        "B) You should prioritize your duties.",
        "C) You had to work only on one.",
        "D) You has to leave early."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I have to cook food.",
        "B) I should cook food.",
        "C) I has to cook food.",
        "D) I had to cook food yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 10,
      "question": "Which sentence gives advice?",
      "questionHindi": "कौन सा वाक्य सलाह देता है?",
      "options": [
        "A) He has to study hard.",
        "B) You should talk to your manager.",
        "C) I had to finish the work.",
        "D) She has to go home."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) has to",
        "B) had to",
        "C) have to",
        "D) should"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) To do all work at once.",
        "B) To focus on the most important tasks first.",
        "C) To ignore your deadlines.",
        "D) To ask someone else to do your work."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Do you have to go to the office?",
        "B) Should you go to the office?",
        "C) Did you have to go to the office yesterday?",
        "D) Does she have to go to the office?"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Which grammar form is used for a present obligation for 'He'?",
      "questionHindi": "'He' के लिए वर्तमान बाध्यता (obligation) के लिए किस व्याकरण रूप का उपयोग किया जाता है?",
      "options": [
        "A) have to",
        "B) has to",
        "C) had to",
        "D) should"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I have to report to work at 9 AM.",
        "B) I had to report to work yesterday.",
        "C) I should report to work tomorrow.",
        "D) I has to report to work last week."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) You have to work harder.",
        "B) You should take a short break.",
        "C) You had to finish this yesterday.",
        "D) You has to ignore the stress."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) We have to help with housework.",
        "B) We had to help with housework.",
        "C) We should help with housework.",
        "D) We has to help with housework."
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Which sentence indicates a completed past duty?",
      "questionHindi": "कौन सा वाक्य पिछली पूरी की गई जिम्मेदारी को दर्शाता है?",
      "options": [
        "A) I should pay the bills.",
        "B) I have to pay the bills.",
        "C) I had to pay the bills yesterday.",
        "D) I has to pay the bills."
      ],
      "correctIndex": 2
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) should",
        "B) had to",
        "C) has to",
        "D) have to"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Does he have to submit the report today?",
        "B) Did he have to submit the report today?",
        "C) Should he submit the report today?",
        "D) Has he to submit the report today?"
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Attending a yearly conference.",
        "B) Writing a weekly report.",
        "C) Cooking breakfast for the family.",
        "D) Going on a vacation."
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) What you have to do daily?",
        "B) What do you have to do daily?",
        "C) What you has to do daily?",
        "D) What you had to do daily?"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I have to do a lot of work.",
        "B) I should do a lot of work.",
        "C) I had to do a lot of work yesterday.",
        "D) I has to do a lot of work."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) For present duties.",
        "B) For future duties.",
        "C) For past obligations.",
        "D) For giving advice."
      ],
      "correctIndex": 2
    },
    {
      "id": 25,
      "question": "Fill in the blank: 'We _____ wear a uniform at our school.'",
      "questionHindi": "रिक्त स्थान भरें: 'हमें अपने स्कूल में यूनिफॉर्म पहननी _____ है।'",
      "options": [
        "A) have to",
        "B) should",
        "C) had to",
        "D) has to"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Translate: 'तुम्हें समय का प्रबंधन करना सीखना चाहिए।'",
      "questionHindi": "Translate: 'तुम्हें समय का प्रबंधन करना सीखना चाहिए।'",
      "options": [
        "A) You have to learn time management.",
        "B) You should learn time management.",
        "C) You had to learn time management.",
        "D) You has to learn time management."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) have to",
        "B) should",
        "C) had to",
        "D) has to"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) have to",
        "B) has to",
        "C) had to",
        "D) should"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) She has to fulfill her responsibilities.",
        "B) She have to fulfill her responsibilities.",
        "C) She had to fulfill her responsibilities.",
        "D) She should fulfill her responsibilities."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which sentence is grammatically incorrect?",
      "questionHindi": "कौन सा वाक्य व्याकरण की दृष्टि से गलत है?",
      "options": [
        "A) I have to study.",
        "B) She has to study.",
        "C) They has to study.",
        "D) He has to study."
      ],
      "correctIndex": 2
    }
  ],
  "6": [
    {
      "id": 1,
      "question": "Choose the most polite way to ask for a glass of water.",
      "questionHindi": "पानी का एक गिलास माँगने के लिए सबसे विनम्र तरीका चुनें।",
      "options": [
        "A) Give me some water.",
        "B) I want water now.",
        "C) Bring me water.",
        "D) I would like a glass of water, please."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Translate: 'क्या मैं कल आपसे मिल सकता हूँ?'",
      "questionHindi": "Translate: 'क्या मैं कल आपसे मिल सकता हूँ?'",
      "options": [
        "A) May I meet you tomorrow?",
        "B) Can I meet you tomorrow?",
        "C) Must I meet you tomorrow?",
        "D) I will meet you tomorrow."
      ],
      "correctIndex": 0
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I can't come.",
        "B) No, I am busy.",
        "C) Don't ask me again.",
        "D) I would love to, but I have other plans."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'It _____ rain today, so carry an umbrella.'",
      "questionHindi": "रिक्त स्थान भरें: 'It _____ rain today, so carry an umbrella.'",
      "options": [
        "A) would",
        "B) like to",
        "C) would like",
        "D) may"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Hey, listen to me.",
        "B) Stop working and talk to me.",
        "C) I need you now.",
        "D) Excuse me, do you have a moment?"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'मैं चाय लेना पसंद करूँगा।'",
      "questionHindi": "Translate: 'मैं चाय लेना पसंद करूँगा।'",
      "options": [
        "A) I like to have tea.",
        "B) I may have tea.",
        "C) I might have tea.",
        "D) I would like to have tea."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which sentence correctly expresses a future possibility?",
      "questionHindi": "कौन सा वाक्य भविष्य की संभावना को सही ढंग से व्यक्त करता है?",
      "options": [
        "A) I would go to the park.",
        "B) I would like to the park.",
        "C) I may to the park.",
        "D) I might go to the park later."
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "How do you politely ask someone to speak more slowly?",
      "questionHindi": "आप किसी से विनम्रतापूर्वक धीरे बोलने के लिए कैसे कहेंगे?",
      "options": [
        "A) Speak slowly.",
        "B) You are too fast, stop.",
        "C) I can't understand you.",
        "D) Could you please speak a little more slowly?"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I am leaving early.",
        "B) I want to go home now.",
        "C) You must let me go.",
        "D) May I leave early today, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 10,
      "question": "Translate: 'शायद वह कल आ सकता है।'",
      "questionHindi": "Translate: 'शायद वह कल आ सकता है।'",
      "options": [
        "A) He would come tomorrow.",
        "B) He would like to come tomorrow.",
        "C) He might come tomorrow.",
        "D) He may comes tomorrow."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Okay, I will come.",
        "B) Fine, see you.",
        "C) I'd love to join you, thank you.",
        "D) Yes, I will be there."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Would",
        "B) Might",
        "C) May",
        "D) Like"
      ],
      "correctIndex": 0
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Do you want coffee?",
        "B) May you have coffee with me?",
        "C) Would you like to have coffee with me?",
        "D) You like coffee with me?"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Which of these is a polite way to ask for a favor?",
      "questionHindi": "इनमें से मदद माँगने का विनम्र तरीका कौन सा है?",
      "options": [
        "A) Do this for me.",
        "B) I would like you to do this for me.",
        "C) Could you please do this for me?",
        "D) You must help me."
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) would like",
        "B) might",
        "C) may",
        "D) would"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Where is the station?",
        "B) Tell me where the station is.",
        "C) Excuse me, could you tell me the way to the station?",
        "D) I need the station."
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I would be late.",
        "B) I might be late.",
        "C) I would like to be late.",
        "D) I may late."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Which sentence shows a polite wish?",
      "questionHindi": "कौन सा वाक्य एक विनम्र इच्छा दर्शाता है?",
      "options": [
        "A) I want a sandwich.",
        "B) I would like a sandwich, please.",
        "C) Give me a sandwich.",
        "D) I will take a sandwich."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Would",
        "B) Might",
        "C) May",
        "D) Like"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) What?",
        "B) Repeat that.",
        "C) Could you please say that again?",
        "D) I didn't hear you."
      ],
      "correctIndex": 2
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Would you please give me your pen?",
        "B) Might you give me your pen?",
        "C) Do you give me your pen?",
        "D) Can you give me your pen?"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Can I go?",
        "B) May I go?",
        "C) I want to go.",
        "D) I am going."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) would",
        "B) might",
        "C) like",
        "D) may"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Hey you,",
        "B) Could you please,",
        "C) I want you to,",
        "D) You must,"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Translate: 'वह शायद आज रात घर पर हो।'",
      "questionHindi": "Translate: 'वह शायद आज रात घर पर हो।'",
      "options": [
        "A) He might be at home tonight.",
        "B) He would be at home tonight.",
        "C) He would like to be at home tonight.",
        "D) He may at home tonight."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Which sentence expresses a possibility?",
      "questionHindi": "कौन सा वाक्य संभावना व्यक्त करता है?",
      "options": [
        "A) I would like tea.",
        "B) I might finish the project today.",
        "C) I would help you.",
        "D) I would go home."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) No, I can't.",
        "B) I'm sorry, but I can't do that right now.",
        "C) Stop asking.",
        "D) I don't have time."
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) may",
        "B) might",
        "C) would",
        "D) can"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Would you please speak louder?",
        "B) Might you speak louder?",
        "C) Can you speak louder?",
        "D) Do you speak louder?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which phrase is best for making a polite suggestion?",
      "questionHindi": "विनम्र सुझाव देने के लिए कौन सा वाक्यांश सबसे अच्छा है?",
      "options": [
        "A) You should do this.",
        "B) Would you like to try this?",
        "C) Do this now.",
        "D) I want you to do this."
      ],
      "correctIndex": 1
    }
  ],
  "7": [
    {
      "id": 1,
      "question": "Which of these is the correct way to ask about someone's profession?",
      "questionHindi": "किसी के पेशे के बारे में पूछने का सही तरीका कौन सा है?",
      "options": [
        "A) Who are you working?",
        "B) How is your work?",
        "C) Where is your job?",
        "D) What do you do for a living?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Translate: 'आप यह किताब कहाँ से लाए?'",
      "questionHindi": "आप यह किताब कहाँ से लाए?",
      "options": [
        "A) Where you brought this book?",
        "B) How you bring this book?",
        "C) Which book you bring?",
        "D) Where did you bring this book from?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Why you like my idea?",
        "B) What do you think about this idea?",
        "C) When is the idea?",
        "D) Whose idea is this?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Choose the correct phrase to ask for directions to the train station.",
      "questionHindi": "रेलवे स्टेशन का रास्ता पूछने के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) Where is the nearest train station?",
        "B) Who is the train station?",
        "C) How is the train station?",
        "D) Why the train station?"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) When",
        "B) Who",
        "C) Whose",
        "D) Where"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'आपका पसंदीदा शौक क्या है?'",
      "questionHindi": "आपका पसंदीदा शौक क्या है?",
      "options": [
        "A) How is your hobby?",
        "B) Where is your hobby?",
        "C) Who is your hobby?",
        "D) What is your favorite hobby?"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which question correctly asks about a meeting time?",
      "questionHindi": "मीटिंग के समय के बारे में कौन सा प्रश्न सही ढंग से पूछा गया है?",
      "options": [
        "A) How the meeting starts?",
        "B) Whom is the meeting?",
        "C) What time is the meeting starting?",
        "D) Why is the meeting?"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Fill in the blank: '_____ did you talk to at the conference?'",
      "questionHindi": "रिक्त स्थान भरें: 'कॉन्फ्रेंस में आपने _____ से बात की?'",
      "options": [
        "A) What",
        "B) Which",
        "C) Whom",
        "D) How"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) What is the cost of this?",
        "B) How many is this?",
        "C) How much does this cost?",
        "D) Which is the price?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'यह बैग किसका है?'",
      "questionHindi": "यह बैग किसका है?",
      "options": [
        "A) Who bag is this?",
        "B) Which bag is this?",
        "C) Whose bag is this?",
        "D) What is this bag?"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Who color do you like?",
        "B) Where is your color?",
        "C) Which color do you prefer?",
        "D) How is your preference?"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) When",
        "B) Which",
        "C) Why",
        "D) Who"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) When you did last night?",
        "B) What were you doing last night?",
        "C) Who did you do last night?",
        "D) How you doing last night?"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "How do you ask someone how they are feeling?",
      "questionHindi": "आप किसी से कैसे पूछेंगे कि वे कैसा महसूस कर रहे हैं?",
      "options": [
        "A) What are you feeling?",
        "B) How are you feeling?",
        "C) Who are you feeling?",
        "D) Why are you feeling?"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Where are your plans?",
        "B) What are your plans for next year?",
        "C) How are your plans?",
        "D) Why are your plans?"
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) What gave you this idea?",
        "B) Who gave you this idea?",
        "C) Where gave you this idea?",
        "D) How gave you this idea?"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) When",
        "B) How",
        "C) Where",
        "D) Who"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Which phrase is appropriate to continue a conversation?",
      "questionHindi": "बातचीत जारी रखने के लिए कौन सा वाक्यांश उपयुक्त है?",
      "options": [
        "A) I don't know.",
        "B) That's interesting, tell me more.",
        "C) Goodbye.",
        "D) Okay."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) How you wake up morning?",
        "B) What time do you wake up every morning?",
        "C) When you wake up?",
        "D) Who wakes up in the morning?"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Which one do you prefer?",
        "B) Who one do you like?",
        "C) Where one is better?",
        "D) How one is good?"
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Where",
        "B) How",
        "C) Why",
        "D) Whose"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Who is the man you were talking to?",
        "B) Which is the man?",
        "C) How is the man?",
        "D) Why is the man?"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Could you please explain that again?",
        "B) What you said?",
        "C) Who said that?",
        "D) Why you said that?"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) When does the bus arrive?",
        "B) When the bus arrives?",
        "C) When is arrive the bus?",
        "D) When the bus is arrive?"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Translate: 'आपको यह शहर कैसा लगा?'",
      "questionHindi": "आपको यह शहर कैसा लगा?",
      "options": [
        "A) How did you find this city?",
        "B) What did you find this city?",
        "C) Where did you find this city?",
        "D) Who did you find this city?"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: '_____ is your favorite author?'",
      "questionHindi": "रिक्त स्थान भरें: 'आपका पसंदीदा लेखक _____ है?'",
      "options": [
        "A) Where",
        "B) Why",
        "C) Who",
        "D) How"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Why did you choose this course?",
        "B) How did you choose this course?",
        "C) Where did you choose this course?",
        "D) Who did you choose this course?"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) How do you spend your free time?",
        "B) What you spend your free time?",
        "C) Where you spend your free time?",
        "D) Why you spend your free time?"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Excuse me, is this seat taken?",
        "B) Who are you?",
        "C) Give me your name.",
        "D) Why are you here?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Fill in the blank: '_____ of these two shirts should I buy?'",
      "questionHindi": "रिक्त स्थान भरें: 'इन दो शर्ट में से _____ मुझे खरीदनी चाहिए?'",
      "options": [
        "A) Who",
        "B) Which",
        "C) Why",
        "D) How"
      ],
      "correctIndex": 1
    }
  ],
  "8": [
    {
      "id": 1,
      "question": "How do you greet your neighbor when stepping out in the morning?",
      "questionHindi": "सुबह घर से निकलते समय आप अपने पड़ोसी का अभिवादन कैसे करते हैं?",
      "options": [
        "A) Go away, I am busy.",
        "B) What is the time?",
        "C) Where is the shop?",
        "D) Good morning, how are you?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct phrase to guide a visitor to the pharmacy.",
      "questionHindi": "आगंतुक को फार्मेसी (दवा की दुकान) का रास्ता बताने के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) Go in straight and turn left.",
        "B) Go to straight and turn left.",
        "C) Go at straight and turn left.",
        "D) Go on straight and turn left."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Hello, the shop is small.",
        "B) Hello, how is the shop?",
        "C) Hello, I am a shopkeeper.",
        "D) Hello, I want to buy a pen."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "If someone asks the time, which is the polite way to answer?",
      "questionHindi": "यदि कोई समय पूछता है, तो उत्तर देने का विनम्र तरीका कौन सा है?",
      "options": [
        "A) It is exactly at 5 o'clock.",
        "B) It is in 5 o'clock.",
        "C) It is to 5 o'clock.",
        "D) It is 5 o'clock."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) at",
        "B) in",
        "C) on",
        "D) to"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Select the correct plural form: 'I bought two ___ at the market.'",
      "questionHindi": "सही बहुवचन रूप चुनें: 'मैंने बाजार से दो ___ खरीदे।'",
      "options": [
        "A) apple",
        "B) apple's",
        "C) appless",
        "D) apples"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which article is used before 'pharmacy'?",
      "questionHindi": "'pharmacy' शब्द से पहले किस आर्टिकल (article) का उपयोग किया जाता है?",
      "options": [
        "A) 'a'",
        "B) 'an'",
        "C) 'the'",
        "D) none"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct preposition: 'The keys are ___ the table.'",
      "questionHindi": "सही प्रीपोजिशन चुनें: 'चाबियाँ मेज ___ हैं।'",
      "options": [
        "A) at",
        "B) to",
        "C) on",
        "D) for"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I wake up in 7 o'clock.",
        "B) I wake up at 7 o'clock.",
        "C) I wake up on 7 o'clock.",
        "D) I wake up to 7 o'clock."
      ],
      "correctIndex": 1
    },
    {
      "id": 10,
      "question": "Fill in the blank: 'He is waiting ___ the bus stop.'",
      "questionHindi": "रिक्त स्थान भरें: 'वह बस स्टॉप ___ इंतजार कर रहा है।'",
      "options": [
        "A) in",
        "B) at",
        "C) on",
        "D) to"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) in",
        "B) 'a'",
        "C) of",
        "D) No error"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) She is in home.",
        "B) She is at home.",
        "C) She is on home.",
        "D) She is to home."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Can you tell me the way to the railway station?",
        "B) Can you tell me the way at the railway station?",
        "C) Can you tell me the way in the railway station?",
        "D) Can you tell me the way on the railway station?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Complete: 'I have ___ apple in my bag.'",
      "questionHindi": "पूरा करें: 'मेरे बैग में ___ सेब है।'",
      "options": [
        "A) 'a'",
        "B) 'an'",
        "C) 'the'",
        "D) some"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) on",
        "B) at",
        "C) in",
        "D) to"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) I like biscuits at tea.",
        "B) I like biscuits in tea.",
        "C) I like biscuits with tea.",
        "D) I like biscuits for tea."
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Where is the bank?",
        "B) Where are the bank?",
        "C) Where at the bank?",
        "D) Where to the bank?"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Fill the blank: 'I work ___ an office.'",
      "questionHindi": "रिक्त स्थान भरें: 'मैं एक ऑफिस ___ काम करता हूँ।'",
      "options": [
        "A) on",
        "B) at",
        "C) in",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) He is going to market with me.",
        "B) He is going to market for me.",
        "C) He is going to market in me.",
        "D) He is going to market at me."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) child",
        "B) children",
        "C) childs",
        "D) childrens"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) at",
        "B) of",
        "C) in",
        "D) on"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) This road goes to straight.",
        "B) This road goes at straight.",
        "C) This road goes straight.",
        "D) This road goes in straight."
      ],
      "correctIndex": 2
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) 'a'",
        "B) 'an'",
        "C) 'the'",
        "D) none"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) on",
        "B) at",
        "C) in",
        "D) to"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Translate: 'मेरे पास एक कलम है।'",
      "questionHindi": "अनुवाद करें: 'मेरे पास एक कलम है।'",
      "options": [
        "A) I have a pen.",
        "B) I have an pen.",
        "C) I have the pen.",
        "D) I have pens."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Which is correct for travel?",
      "questionHindi": "यात्रा के लिए क्या सही है?",
      "options": [
        "A) I travel by train.",
        "B) I travel on train.",
        "C) I travel at train.",
        "D) I travel in train."
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) on",
        "B) at",
        "C) in",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) in",
        "B) on",
        "C) at",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Do you have a question?",
        "B) Do you have the question?",
        "C) Do you have an question?",
        "D) Do you have questions?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which preposition is correct for 'morning'?",
      "questionHindi": "'morning' (सुबह) के लिए कौन सा प्रीपोजिशन सही है?",
      "options": [
        "A) at",
        "B) in",
        "C) on",
        "D) to"
      ],
      "correctIndex": 1
    }
  ],
  "9": [
    {
      "id": 1,
      "question": "What time do you usually wake up to begin your daily routine?",
      "questionHindi": "आप अपनी दैनिक दिनचर्या (daily routine) शुरू करने के लिए आमतौर पर किस समय उठते हैं?",
      "options": [
        "A) What time you usually wake up?",
        "B) What time does you usually wake up?",
        "C) What time are you usually wake up?",
        "D) What time do you usually wake up?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which sentence correctly describes a daily routine in the simple present tense?",
      "questionHindi": "दैनिक दिनचर्या (daily routine) को साधारण वर्तमान काल में सही ढंग से दर्शाने वाला वाक्य कौन सा है?",
      "options": [
        "A) He wake up early every morning.",
        "B) He does wake up early every morning.",
        "C) He waking up early every morning.",
        "D) He wakes up early every morning."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) How is your day looks like?",
        "B) What do your day look like?",
        "C) How does your day look?",
        "D) What does your day look like?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "How do you describe your daily morning routine before heading to work?",
      "questionHindi": "काम पर जाने (head to work) से पहले आप अपनी दैनिक सुबह की दिनचर्या का वर्णन कैसे करते हैं?",
      "options": [
        "A) drink",
        "B) drinking",
        "C) does drink",
        "D) drinks"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I go to work by bus.",
        "B) I goes to work by bus.",
        "C) I am go to work by bus.",
        "D) I do go to work by bus."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Which sentence is grammatically correct for a regular habit?",
      "questionHindi": "नियमित आदत के लिए कौन सा वाक्य व्याकरण की दृष्टि से सही है?",
      "options": [
        "A) They plays football on Sundays.",
        "B) They does play football on Sundays.",
        "C) They playing football on Sundays.",
        "D) They play football on Sundays."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Complete the sentence describing a work habit: 'He usually arrives at work on time.'",
      "questionHindi": "काम की आदत बताने वाले वाक्य को पूरा करें: 'वह आमतौर पर समय पर काम (work) पर पहुँचता है।'",
      "options": [
        "A) He don't exercise daily.",
        "B) He doesn't exercises daily.",
        "C) He not exercise daily.",
        "D) He doesn't exercise daily."
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "How do you ask someone about their breakfast preference?",
      "questionHindi": "आप किसी से उनके नाश्ते की पसंद के बारे में कैसे पूछेंगे?",
      "options": [
        "A) Do you prefer a quick breakfast?",
        "B) Are you prefer a quick breakfast?",
        "C) Does you prefer a quick breakfast?",
        "D) You prefer a quick breakfast?"
      ],
      "correctIndex": 0
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) does",
        "B) doing",
        "C) do",
        "D) done"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'क्या वह सप्ताहांत (weekend) पर काम करता है?'",
      "questionHindi": "क्या वह सप्ताहांत (weekend) पर काम करता है?",
      "options": [
        "A) Do he work on weekends?",
        "B) Is he work on weekends?",
        "C) Does he work on weekends?",
        "D) Does he works on weekends?"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Wake up",
        "B) Go to work",
        "C) Begin your day",
        "D) Have breakfast"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I am reading books every night.",
        "B) I reads books every night.",
        "C) I read books every night.",
        "D) I do reading books every night."
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) go",
        "B) going",
        "C) goes",
        "D) does go"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Translate: 'मुझे देर से उठना पसंद नहीं है।'",
      "questionHindi": "मुझे देर से उठना पसंद नहीं है।",
      "options": [
        "A) I don't like to wake up late.",
        "B) I doesn't like to wake up late.",
        "C) I am not like to wake up late.",
        "D) I don't likes to wake up late."
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) How you commute to work?",
        "B) How do you commute to work?",
        "C) How does you commute to work?",
        "D) How are you commute to work?"
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) She don't cook food.",
        "B) She doesn't cooks food.",
        "C) She doesn't cook food.",
        "D) She not cook food."
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I relaxes on weekends.",
        "B) I relax on weekends.",
        "C) I do relax on weekends.",
        "D) I am relax on weekends."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Fill in the blank: Do you _______ yoga in the morning?",
      "questionHindi": "खाली स्थान भरें: क्या आप सुबह योग करते हैं?",
      "options": [
        "A) do",
        "B) does",
        "C) doing",
        "D) did"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Does they study together?",
        "B) Do they study together?",
        "C) Do she study together?",
        "D) Does they studies together?"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) He help me.",
        "B) He helps me.",
        "C) He does help me.",
        "D) He is help me."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Rarely",
        "B) Usually",
        "C) Never",
        "D) Once"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) We doesn't sleep late.",
        "B) We don't sleeps late.",
        "C) We don't sleep late.",
        "D) We not sleep late."
      ],
      "correctIndex": 2
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) What do you eat for breakfast?",
        "B) What does you eat for breakfast?",
        "C) What you eat for breakfast?",
        "D) What are you eat for breakfast?"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) check",
        "B) checks",
        "C) checking",
        "D) do check"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Choose the correct English phrase for 'समय प्रबंधन'.",
      "questionHindi": "'समय प्रबंधन' के लिए सही अंग्रेजी वाक्यांश चुनें।",
      "options": [
        "A) Time management",
        "B) Time eating",
        "C) Time working",
        "D) Time routine"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Translate: 'मेरी बहन रोज़ व्यायाम करती है।'",
      "questionHindi": "मेरी बहन रोज़ व्यायाम करती है।",
      "options": [
        "A) My sister do exercise daily.",
        "B) My sister exercise daily.",
        "C) My sister exercises daily.",
        "D) My sister does exercises daily."
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) What is the first thing you do in the morning?",
        "B) What do you first in the morning?",
        "C) What you do first in the morning?",
        "D) What does you do first in the morning?"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) goes",
        "B) go",
        "C) going",
        "D) do go"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Do you like tea?",
        "B) Does you like tea?",
        "C) Are you like tea?",
        "D) Do you likes tea?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which sentence correctly uses 'doesn't'?",
      "questionHindi": "कौन सा वाक्य 'doesn't' का सही उपयोग करता है?",
      "options": [
        "A) She doesn't goes to work.",
        "B) She doesn't go to work.",
        "C) She doesn't goes work.",
        "D) She doesn't to go work."
      ],
      "correctIndex": 1
    }
  ],
  "10": [
    {
      "id": 1,
      "question": "Which sentence correctly expresses a preference for working from home?",
      "questionHindi": "घर से काम करने की प्राथमिकता व्यक्त करने के लिए कौन सा वाक्य सही है?",
      "options": [
        "A) I prefers working from home.",
        "B) I liking work from home.",
        "C) I prefer to works from home.",
        "D) I prefer working from home."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Translate: 'मुझे देर रात तक पढ़ना पसंद है।'",
      "questionHindi": "Translate: 'मुझे देर रात तक पढ़ना पसंद है।'",
      "options": [
        "A) I like study late nights.",
        "B) I likes to study late nights.",
        "C) I am like study late.",
        "D) I like studying late at night."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) believe",
        "B) believing",
        "C) is believe",
        "D) believes"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Complete the sentence: 'In my ______, early mornings are better for studying.'",
      "questionHindi": "वाक्य पूरा करें: 'In my ______, early mornings are better for studying.'",
      "options": [
        "A) view",
        "B) think",
        "C) prefer",
        "D) like"
      ],
      "correctIndex": 0
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Do you prefer a hybrid schedule?",
        "B) Does you prefer hybrid schedule?",
        "C) Are you prefer hybrid schedule?",
        "D) Do you liking hybrid schedule?"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Which sentence uses the correct grammar for a third-person singular subject?",
      "questionHindi": "कौन सा वाक्य तीसरे व्यक्ति एकवचन कर्ता के लिए सही व्याकरण का उपयोग करता है?",
      "options": [
        "A) He like action movies.",
        "B) He liking action movies.",
        "C) He do like action movies.",
        "D) He likes action movies."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Choose the correct phrase for: 'मुझे फिल्में देखना पसंद नहीं है।'",
      "questionHindi": "सही वाक्यांश चुनें: 'मुझे फिल्में देखना पसंद नहीं है।'",
      "options": [
        "A) I don't like watch movies.",
        "B) I not like watching movies.",
        "C) I doesn't like watching movies.",
        "D) I don't like watching movies."
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "Fill in the blank: 'I ______ reading mystery novels in my free time.'",
      "questionHindi": "रिक्त स्थान भरें: 'I ______ reading mystery novels in my free time.'",
      "options": [
        "A) enjoys",
        "B) enjoying",
        "C) enjoy",
        "D) to enjoy"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I think smartphones help people connect.",
        "B) I likes smartphones help.",
        "C) I am think smartphones connect.",
        "D) I believes smartphones connecting."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Translate: 'वह मानती है कि ऑफिस में काम करना बेहतर है।'",
      "questionHindi": "Translate: 'वह मानती है कि ऑफिस में काम करना बेहतर है。'",
      "options": [
        "A) She believe working from office is better.",
        "B) She is believing office work is better.",
        "C) She believes working from office is better.",
        "D) She think working from office better."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Prefer",
        "B) Believe",
        "C) Like",
        "D) Think"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) like",
        "B) think",
        "C) prefer",
        "D) believe"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) He don't like early mornings.",
        "B) He doesn't likes early mornings.",
        "C) He doesn't like early mornings.",
        "D) He not like early mornings."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Translate: 'मुझे लगता है कि किताबें सबसे अच्छी साथी हैं।'",
      "questionHindi": "Translate: 'मुझे लगता है कि किताबें सबसे अच्छी साथी हैं。'",
      "options": [
        "A) I think books are the best companions.",
        "B) I believe books is best companions.",
        "C) I am thinking books are best.",
        "D) I likes books are companions."
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) like",
        "B) liking",
        "C) likes",
        "D) is like"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) prefer",
        "B) believe",
        "C) enjoy",
        "D) like"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Do she like watching movies?",
        "B) Does she likes watching movies?",
        "C) Does she like watching movies?",
        "D) Is she like watching movies?"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Choose the correct phrase for expressing a strong opinion.",
      "questionHindi": "मजबूत राय व्यक्त करने के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) I think",
        "B) I like",
        "C) I enjoy",
        "D) I prefer"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) prefer",
        "B) prefers",
        "C) liking",
        "D) is prefer"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) We don't like working from home.",
        "B) We doesn't like working from home.",
        "C) We not like work from home.",
        "D) We aren't like working from home."
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Believe",
        "B) Prefer",
        "C) Like",
        "D) Think"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) think",
        "B) thinks",
        "C) liking",
        "D) prefer"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I believe early rising is good.",
        "B) I thinks early rising is good.",
        "C) I like early rising is good.",
        "D) I prefer early rising is good."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I prefer coffee than tea.",
        "B) I prefer coffee to tea.",
        "C) I prefer coffee over tea.",
        "D) I prefer coffee for tea."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Which verb form completes: 'He ______ reading in his free time.'",
      "questionHindi": "कौन सा क्रिया रूप पूरा करता है: 'He ______ reading in his free time.'",
      "options": [
        "A) enjoy",
        "B) enjoys",
        "C) enjoying",
        "D) to enjoy"
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Translate: 'क्या आपको सुबह पढ़ना पसंद है?'",
      "questionHindi": "Translate: 'क्या आपको सुबह पढ़ना पसंद है?'",
      "options": [
        "A) Do you like studying in the morning?",
        "B) Does you like study in the morning?",
        "C) Are you like studying in the morning?",
        "D) Do you likes study in the morning?"
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) believe",
        "B) view",
        "C) like",
        "D) prefer"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I enjoy late nights.",
        "B) I like early mornings.",
        "C) I don't like working from an office.",
        "D) I prefer hybrid schedules."
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) She prefer a hybrid schedule.",
        "B) She prefers a hybrid schedule.",
        "C) She is prefer a hybrid schedule.",
        "D) She liking a hybrid schedule."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Choose the correct phrase for 'राय देना'.",
      "questionHindi": "'राय देना' के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) In my view",
        "B) I like",
        "C) I enjoy",
        "D) I prefer"
      ],
      "correctIndex": 0
    }
  ],
  "11": [
    {
      "id": 1,
      "question": "How do you usually start a conversation with a new colleague?",
      "questionHindi": "आप आमतौर पर किसी नए सहकर्मी के साथ बातचीत कैसे शुरू करते हैं?",
      "options": [
        "A) What is your work?",
        "B) What do you do for fun?",
        "C) Where is your desk?",
        "D) How are you doing?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct sentence to ask about someone's daily routine.",
      "questionHindi": "किसी की दिनचर्या के बारे में पूछने के लिए सही वाक्य चुनें।",
      "options": [
        "A) What you do daily?",
        "B) Do you daily routine?",
        "C) How you do daily?",
        "D) What is your daily routine?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) does",
        "B) is",
        "C) are",
        "D) do"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Translate: 'क्या आप अक्सर सप्ताहांत पर बाहर जाते हैं?'",
      "questionHindi": "Translate: 'क्या आप अक्सर सप्ताहांत पर बाहर जाते हैं?'",
      "options": [
        "A) Are you often go out on weekends?",
        "B) Do you often go out on weekends?",
        "C) Does you often go out on weekends?",
        "D) Do you go out oftenly on weekends?"
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Always",
        "B) Usually",
        "C) Often",
        "D) Rarely"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Fill in the blank: 'She ____ exercises in the morning.' (वह अक्सर सुबह व्यायाम करती है)",
      "questionHindi": "रिक्त स्थान भरें: 'She ____ exercises in the morning.' (वह अक्सर सुबह व्यायाम करती है)",
      "options": [
        "A) never",
        "B) always",
        "C) often",
        "D) rarely"
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "What is the best way to ask about someone's hobbies?",
      "questionHindi": "किसी के शौक के बारे में पूछने का सबसे अच्छा तरीका क्या है?",
      "options": [
        "A) Do you have hobbies?",
        "B) What do you like to do in your free time?",
        "C) Why you like hobbies?",
        "D) Are you having hobbies?"
      ],
      "correctIndex": 1
    },
    {
      "id": 8,
      "question": "Choose the correct English translation: 'मैं कभी-कभी किताबे पढ़ता हूँ।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'मैं कभी-कभी किताबे पढ़ता हूँ।'",
      "options": [
        "A) I sometimes read books.",
        "B) I read sometimes books.",
        "C) Sometimes I reads books.",
        "D) I am sometimes reading books."
      ],
      "correctIndex": 0
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Who",
        "B) What",
        "C) Where",
        "D) Are"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What do you say when someone shares exciting news with you?",
      "questionHindi": "जब कोई आपके साथ रोमांचक खबर साझा करता है, तो आप क्या कहते हैं?",
      "options": [
        "A) That sounds boring.",
        "B) Oh, really? That's great!",
        "C) Why did you tell me?",
        "D) I do not care."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) He do play cricket.",
        "B) He does plays cricket.",
        "C) He plays cricket.",
        "D) He play cricket."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) He rarely comes late.",
        "B) He is rarely come late.",
        "C) He does rarely come late.",
        "D) He never comes late."
      ],
      "correctIndex": 0
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) How is your family?",
        "B) Who is your family?",
        "C) Do you have a family?",
        "D) Why your family?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Which option fits: '____ you play any musical instruments?'",
      "questionHindi": "कौन सा विकल्प सही है: '____ you play any musical instruments?'",
      "options": [
        "A) Does",
        "B) Is",
        "C) Do",
        "D) Are"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I have to go.",
        "B) That's interesting, tell me more.",
        "C) Silence is good.",
        "D) I don't know."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) What do you usually eat for breakfast?",
        "B) What you usually eating for breakfast?",
        "C) Do you usually eat for breakfast?",
        "D) What usually you eat breakfast?"
      ],
      "correctIndex": 0
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Do",
        "B) Does",
        "C) Is",
        "D) Are"
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "What is the English for 'स्वस्थ आदतें'?",
      "questionHindi": "'स्वस्थ आदतें' के लिए अंग्रेजी क्या है?",
      "options": [
        "A) Healthy routine",
        "B) Healthy habits",
        "C) Happy habits",
        "D) Health work"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) always",
        "B) often",
        "C) never",
        "D) usually"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Do you have goals?",
        "B) What are your main goals for this year?",
        "C) Are goals important?",
        "D) Why do you have goals?"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Do you speak Hindi?",
        "B) Does you speak Hindi?",
        "C) Are you speak Hindi?",
        "D) Can you speak Hindi?"
      ],
      "correctIndex": 3
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) never",
        "B) rarely",
        "C) always",
        "D) sometimes"
      ],
      "correctIndex": 2
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) What do you do for a living?",
        "B) Where do you live?",
        "C) How is your hobby?",
        "D) When do you study?"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I am fine, thank you.",
        "B) I do fine.",
        "C) I am go to work.",
        "D) I am eat food."
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Fill in: '____ you like reading books?'",
      "questionHindi": "रिक्त स्थान भरें: '____ you like reading books?'",
      "options": [
        "A) Does",
        "B) Is",
        "C) Are",
        "D) Do"
      ],
      "correctIndex": 3
    },
    {
      "id": 26,
      "question": "What does 'usually' mean in Hindi?",
      "questionHindi": "'usually' का हिंदी अर्थ क्या है?",
      "options": [
        "A) कभी-कभी",
        "B) हमेशा",
        "C) आमतौर पर",
        "D) शायद ही कभी"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) She study every day.",
        "B) She studies every day.",
        "C) She is study every day.",
        "D) Does she study every day?"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) How long have you worked here?",
        "B) Do you like your house?",
        "C) Why are you here?",
        "D) Where is the canteen?"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) do",
        "B) does",
        "C) is",
        "D) are"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Which option is correct for a hobby discussion?",
      "questionHindi": "शौक पर चर्चा के लिए कौन सा विकल्प सही है?",
      "options": [
        "A) I like playing football.",
        "B) I likes playing football.",
        "C) I am like playing football.",
        "D) I do like playing football."
      ],
      "correctIndex": 0
    }
  ],
  "12": [
    {
      "id": 1,
      "question": "What are you doing right now?",
      "questionHindi": "आप अभी क्या कर रहे हैं?",
      "options": [
        "A) I am studying English.",
        "B) I study English.",
        "C) I studied English.",
        "D) I will study English."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct sentence for: 'वह खाना पका रही है。'",
      "questionHindi": "सही वाक्य चुनें: 'वह खाना पका रही है。'",
      "options": [
        "A) She cook food.",
        "B) She is cooking food.",
        "C) She cooks food.",
        "D) She are cooking food."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) read",
        "B) reads",
        "C) is reading",
        "D) are reading"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "What is your mother doing in the kitchen?",
      "questionHindi": "आपकी माँ रसोई में क्या कर रही हैं?",
      "options": [
        "A) She is making tea.",
        "B) She makes tea.",
        "C) She made tea.",
        "D) She will make tea."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) We are working on our project.",
        "B) We work on our project.",
        "C) We is working on our project.",
        "D) We worked on our project."
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "What are the students doing in the classroom?",
      "questionHindi": "छात्र कक्षा में क्या कर रहे हैं?",
      "options": [
        "A) They are listening to the teacher.",
        "B) They listen to the teacher.",
        "C) They listened to the teacher.",
        "D) They is listening to the teacher."
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Select the correct form: 'They _____ playing cricket now.'",
      "questionHindi": "सही रूप चुनें: 'They _____ playing cricket now.'",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) be"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "What is happening outside your house right now?",
      "questionHindi": "अभी आपके घर के बाहर क्या हो रहा है?",
      "options": [
        "A) It rain.",
        "B) It rains.",
        "C) It is raining.",
        "D) It rained."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I am learning to speak English.",
        "B) I learn to speak English.",
        "C) I am learn to speak English.",
        "D) I learn speaking English."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "My father _____ to the office right now.",
      "questionHindi": "मेरे पिताजी अभी ऑफिस _____ रहे हैं।",
      "options": [
        "A) go",
        "B) is going",
        "C) are going",
        "D) goes"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) do"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) He is sleep.",
        "B) He is sleeping.",
        "C) He sleeps.",
        "D) He slept."
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) They are watching TV.",
        "B) They watch TV.",
        "C) They is watching TV.",
        "D) They watched TV."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Why _____ she crying?",
      "questionHindi": "वह क्यों रो _____ है?",
      "options": [
        "A) are",
        "B) is",
        "C) am",
        "D) do"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) be"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) They fly.",
        "B) They flew.",
        "C) They will fly.",
        "D) They are flying."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) The children are playing now.",
        "B) The children play now.",
        "C) The children is playing now.",
        "D) The children played now."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "_____ it raining in your city?",
      "questionHindi": "क्या आपके शहर में बारिश _____ रही है?",
      "options": [
        "A) Are",
        "B) Is",
        "C) Am",
        "D) Do"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) is doing",
        "B) am doing",
        "C) are doing",
        "D) does"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) He teach.",
        "B) He teaches.",
        "C) He taught.",
        "D) He is teaching."
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I am reading the newspaper.",
        "B) I read the newspaper.",
        "C) I am read the newspaper.",
        "D) I readed the newspaper."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) listen",
        "B) are listening",
        "C) listens",
        "D) is listening"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) is",
        "B) are",
        "C) am",
        "D) do"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) write",
        "B) wrote",
        "C) written",
        "D) writing"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Translate: 'वह अभी सो रही है।'",
      "questionHindi": "अनुवाद करें: 'वह अभी सो रही है。'",
      "options": [
        "A) She is sleeping now.",
        "B) She sleeps now.",
        "C) She is sleep now.",
        "D) She slept now."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "The dog _____ in the garden.",
      "questionHindi": "कुत्ता बगीचे में _____ रहा है।",
      "options": [
        "A) are running",
        "B) is running",
        "C) run",
        "D) runs"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) is",
        "B) am",
        "C) are",
        "D) do"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) do",
        "B) does",
        "C) did",
        "D) doing"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) We are drinking tea.",
        "B) We drink tea.",
        "C) We are drink tea.",
        "D) We drank tea."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "He _____ a new project these days.",
      "questionHindi": "वह इन दिनों एक नया प्रोजेक्ट _____ रहा है।",
      "options": [
        "A) are managing",
        "B) is managing",
        "C) manage",
        "D) manages"
      ],
      "correctIndex": 1
    }
  ],
  "13": [
    {
      "id": 1,
      "question": "What are you doing tomorrow?",
      "questionHindi": "आप कल क्या कर रहे हैं?",
      "options": [
        "A) What you are doing tomorrow?",
        "B) What do you doing tomorrow?",
        "C) What are you do tomorrow?",
        "D) What are you doing tomorrow?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct translation: 'मैं कल कहीं नहीं जा रहा हूँ।'",
      "questionHindi": "मैं कल कहीं नहीं जा रहा हूँ।",
      "options": [
        "A) I am not go anywhere tomorrow.",
        "B) I not am going anywhere tomorrow.",
        "C) I am no going anywhere tomorrow.",
        "D) I am not going anywhere tomorrow."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Yes, I attend.",
        "B) Yes, I am attend.",
        "C) Yes, I be attending.",
        "D) Yes, I am attending."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'We ____ visiting our relatives this weekend.'",
      "questionHindi": "हम इस सप्ताहांत अपने रिश्तेदारों से मिलने जा रहे हैं।",
      "options": [
        "A) is",
        "B) do",
        "C) be",
        "D) are"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) He is traveling not to Delhi.",
        "B) He not is traveling to Delhi.",
        "C) He does not traveling to Delhi.",
        "D) He is not traveling to Delhi."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Choose the correct question: 'क्या वे कल काम पर नहीं आ रहे हैं?'",
      "questionHindi": "क्या वे कल काम पर नहीं आ रहे हैं?",
      "options": [
        "A) Do they not coming to work tomorrow?",
        "B) Are they not come to work tomorrow?",
        "C) Are they not coming to work tomorrow?",
        "D) Are they no coming to work tomorrow?"
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Select the right phrase for 'future arrangements': 'I _____ a doctor's appointment tomorrow.'",
      "questionHindi": "मैं कल डॉक्टर के पास जा रहा हूँ (अपॉइंटमेंट है)।",
      "options": [
        "A) have",
        "B) am have",
        "C) am having",
        "D) is having"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which sentence is grammatically correct for a future plan?",
      "questionHindi": "भविष्य की योजना के लिए कौन सा वाक्य व्याकरणिक रूप से सही है?",
      "options": [
        "A) She meeting her friend tonight.",
        "B) She is meet her friend tonight.",
        "C) She is meeting her friend tonight.",
        "D) She be meeting her friend tonight."
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Do you working on any new project this month?",
        "B) Are you work on any new project this month?",
        "C) Are you working on any new project this month?",
        "D) Is you working on any new project this month?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Complete the short answer: 'Are you leaving for the trip tonight?' - 'No, ____.'",
      "questionHindi": "क्या आप आज रात ट्रिप के लिए निकल रहे हैं? - 'नहीं, ___।'",
      "options": [
        "A) I am",
        "B) I don't",
        "C) I am not",
        "D) I not"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) We are not go abroad next month.",
        "B) We not are going abroad next month.",
        "C) We are not going abroad next month.",
        "D) We are no going abroad next month."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Where",
        "B) Who",
        "C) Whom",
        "D) What"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) gives",
        "B) giving",
        "C) is giving",
        "D) is give"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Translate: 'Is he participating in the event next week?'",
      "questionHindi": "क्या वह अगले हफ्ते कार्यक्रम में भाग ले रहा है?",
      "options": [
        "A) Are he participating in the event next week?",
        "B) Is he participating in the event next week?",
        "C) Does he participating in the event next week?",
        "D) Is he participate in the event next week?"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I am planning nothing for the weekend.",
        "B) I am not planning anything for the weekend.",
        "C) I not am planning for the weekend.",
        "D) I am not plan for the weekend."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) क्या आप कल अपनी रिपोर्ट खत्म करेंगे?",
        "B) क्या आप आज अपनी रिपोर्ट खत्म कर रहे हैं?",
        "C) क्या आप अपनी रिपोर्ट खत्म कर चुके हैं?",
        "D) क्या आप रिपोर्ट खत्म करना चाहते हैं?"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) not going",
        "B) are not going",
        "C) are no going",
        "D) is not going"
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Choose the correct sentence for future arrangement:",
      "questionHindi": "भविष्य की व्यवस्था के लिए सही वाक्य चुनें:",
      "options": [
        "A) They visiting the museum on Saturday.",
        "B) They are visiting the museum on Saturday.",
        "C) They is visiting the museum on Saturday.",
        "D) They are visit the museum on Saturday."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) What do you do to achieve your goal this month?",
        "B) What are you doing to achieve your goal this month?",
        "C) What you are doing to achieve your goal this month?",
        "D) What are you do to achieve your goal this month?"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) make",
        "B) making",
        "C) made",
        "D) to make"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) No, I am not.",
        "B) No, I am not traveling.",
        "C) No, I am not traveling tomorrow.",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Are they move to a new house next week?",
        "B) Are they moving to a new house next week?",
        "C) Are they moving to a new house on next week?",
        "D) Is they moving to a new house next week?"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) 'meet' should be 'meeting'",
        "B) 'am' should be 'do'",
        "C) 'not' is unnecessary",
        "D) No error"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) What are you doing tomorrow?",
        "B) What do you do every day?",
        "C) Did you go yesterday?",
        "D) Have you done it?"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Complete the sentence: 'She ____ working late this evening.'",
      "questionHindi": "वह आज शाम देर तक काम नहीं कर रही है।",
      "options": [
        "A) is not",
        "B) does not",
        "C) is no",
        "D) not"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Choose the correct English for: 'क्या आप इस सप्ताहांत घर पर रह रहे हैं?'",
      "questionHindi": "क्या आप इस सप्ताहांत घर पर रह रहे हैं?",
      "options": [
        "A) Are you staying at home this weekend?",
        "B) Do you stay at home this weekend?",
        "C) Are you stay at home this weekend?",
        "D) Is you staying at home this weekend?"
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Are you seeing the doctor tomorrow?",
        "B) Do you see the doctor tomorrow?",
        "C) Are you see the doctor tomorrow?",
        "D) Is you seeing the doctor tomorrow?"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) हम कार्यक्रम में भाग नहीं ले रहे हैं।",
        "B) हम कार्यक्रम में भाग नहीं लेते हैं।",
        "C) हम कार्यक्रम में भाग नहीं ले सके।",
        "D) हम कार्यक्रम में भाग नहीं लेंगे।"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Are",
        "B) Do",
        "C) Is",
        "D) Does"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which sentence is correct?",
      "questionHindi": "कौन सा वाक्य सही है?",
      "options": [
        "A) I am not doing anything special this weekend.",
        "B) I am not do anything special this weekend.",
        "C) I not doing anything special this weekend.",
        "D) I am not done anything special this weekend."
      ],
      "correctIndex": 0
    }
  ],
  "14": [
    {
      "id": 1,
      "question": "Translate: 'I went to the market yesterday.'",
      "questionHindi": "अनुवाद करें: 'मैं कल बाज़ार गया था।'",
      "options": [
        "A) I go to the market yesterday.",
        "B) I am going to the market yesterday.",
        "C) I will go to the market yesterday.",
        "D) I went to the market yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct form: 'She ______ a delicious lunch yesterday.'",
      "questionHindi": "सही रूप चुनें: 'उसने कल स्वादिष्ट दोपहर का भोजन ______|'",
      "options": [
        "A) cook",
        "B) cooks",
        "C) cooking",
        "D) cooked"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Yesterday",
        "B) Holiday",
        "C) Travel",
        "D) Childhood"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Translate: 'Did you enjoy the movie last night?'",
      "questionHindi": "अनुवाद करें: 'क्या आपने कल रात फिल्म का आनंद लिया?'",
      "options": [
        "A) Did you enjoy the movie last night?",
        "B) Do you enjoy the movie last night?",
        "C) Are you enjoying the movie last night?",
        "D) Will you enjoy the movie last night?"
      ],
      "correctIndex": 0
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) meet",
        "B) meets",
        "C) meeting",
        "D) met"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Which verb is the past tense of 'see'?",
      "questionHindi": "कौन सी क्रिया 'see' का भूतकाल है?",
      "options": [
        "A) seed",
        "B) seen",
        "C) seeed",
        "D) saw"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Translate: 'मैं कल बहुत व्यस्त था।'",
      "questionHindi": "अनुवाद करें: 'मैं कल बहुत व्यस्त था।'",
      "options": [
        "A) I am very busy yesterday.",
        "B) I were very busy yesterday.",
        "C) I be very busy yesterday.",
        "D) I was very busy yesterday."
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "Choose the correct sentence for past experience.",
      "questionHindi": "अतीत के अनुभव के लिए सही वाक्य चुनें।",
      "options": [
        "A) I travel to Delhi last year.",
        "B) I traveled to Delhi last year.",
        "C) I travels to Delhi last year.",
        "D) I am traveling to Delhi last year."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) gone",
        "B) going",
        "C) went",
        "D) goed"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'We did not go to school yesterday.'",
      "questionHindi": "अनुवाद करें: 'हम कल स्कूल नहीं गए थे।'",
      "options": [
        "A) We did not go to school yesterday.",
        "B) We do not go to school yesterday.",
        "C) We are not going to school yesterday.",
        "D) We will not go to school yesterday."
      ],
      "correctIndex": 0
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Yesterday",
        "B) Holiday",
        "C) Travel",
        "D) Childhood"
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) take",
        "B) takes",
        "C) took",
        "D) taken"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Do you finish the work yesterday?",
        "B) Are you finish the work yesterday?",
        "C) Did you finish the work yesterday?",
        "D) Will you finish the work yesterday?"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Which verb is irregular?",
      "questionHindi": "कौन सी क्रिया अनियमित (irregular) है?",
      "options": [
        "A) Walked",
        "B) Talked",
        "C) Ate",
        "D) Played"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) bought",
        "B) buyed",
        "C) buys",
        "D) buying"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) I have tea in the evening.",
        "B) I had tea in the evening.",
        "C) I am having tea in the evening.",
        "D) I will have tea in the evening."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) memorable",
        "B) memory",
        "C) memorize",
        "D) memorizing"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Which of these describes a past state?",
      "questionHindi": "इनमें से कौन सा पिछली स्थिति का वर्णन करता है?",
      "options": [
        "A) I am happy.",
        "B) I was happy.",
        "C) I will be happy.",
        "D) I be happy."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) He tells me a story yesterday.",
        "B) He tell me a story yesterday.",
        "C) He told me a story yesterday.",
        "D) He is telling me a story yesterday."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) go",
        "B) goes",
        "C) went",
        "D) gone"
      ],
      "correctIndex": 2
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) readed",
        "B) read",
        "C) reads",
        "D) reading"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Did you face any problems?",
        "B) Do you face any problems?",
        "C) Are you facing any problems?",
        "D) Will you face any problems?"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) did",
        "B) do",
        "C) does",
        "D) done"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Tomorrow",
        "B) Yesterday",
        "C) Today",
        "D) Now"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Translate: 'मैंने कल रात पिज़्ज़ा खाया।'",
      "questionHindi": "अनुवाद करें: 'मैंने कल रात पिज़्ज़ा खाया।'",
      "options": [
        "A) I eat pizza last night.",
        "B) I eating pizza last night.",
        "C) I ate pizza last night.",
        "D) I will eat pizza last night."
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Which verb is regular?",
      "questionHindi": "कौन सी क्रिया नियमित (regular) है?",
      "options": [
        "A) Eat",
        "B) Drink",
        "C) Cook",
        "D) Go"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) wrote",
        "B) writed",
        "C) writes",
        "D) writing"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) We visit a museum last year.",
        "B) We visited a museum last year.",
        "C) We are visiting a museum last year.",
        "D) We will visit a museum last year."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) is",
        "B) was",
        "C) were",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Which word represents 'यात्रा'?",
      "questionHindi": "कौन सा शब्द 'यात्रा' को दर्शाता है?",
      "options": [
        "A) Travel",
        "B) Holiday",
        "C) Yesterday",
        "D) Childhood"
      ],
      "correctIndex": 0
    }
  ],
  "15": [
    {
      "id": 1,
      "question": "Choose the correct English translation: 'क्या आपने पिछले सप्ताहांत अपनी पसंदीदा फिल्म देखी?'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'क्या आपने पिछले सप्ताहांत अपनी पसंदीदा फिल्म देखी?'",
      "options": [
        "A) Did you watch your favorite movie last weekend?",
        "B) Do you watch your favorite movie last weekend?",
        "C) Have you watch your favorite movie last weekend?",
        "D) Did you watched your favorite movie last weekend?"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Select the correct option: 'I _____ (नहीं गया) to school yesterday because I was sick.'",
      "questionHindi": "सही विकल्प चुनें: 'I _____ (नहीं गया) to school yesterday because I was sick.'",
      "options": [
        "A) don't go",
        "B) didn't went",
        "C) didn't go",
        "D) was not go"
      ],
      "correctIndex": 2
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Childhood studies",
        "B) Childhood memories",
        "C) Past accomplishments",
        "D) Exciting journeys"
      ],
      "correctIndex": 1
    },
    {
      "id": 4,
      "question": "Choose the correct short answer: 'Did you enjoy your first day at school?' - 'Yes, _____.'",
      "questionHindi": "सही संक्षिप्त उत्तर चुनें: 'Did you enjoy your first day at school?' - 'Yes, _____.'",
      "options": [
        "A) I do",
        "B) I enjoyed",
        "C) I was",
        "D) I did"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Where did you go last year?",
        "B) Where do you go last year?",
        "C) Where you went last year?",
        "D) Where did you went last year?"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Fill in the blank: 'What _____ (आपने हासिल किया) in your previous job?'",
      "questionHindi": "रिक्त स्थान भरें: 'What _____ (आपने हासिल किया) in your previous job?'",
      "options": [
        "A) did you accomplish",
        "B) do you accomplish",
        "C) did you accomplished",
        "D) you did accomplish"
      ],
      "correctIndex": 0
    },
    {
      "id": 7,
      "question": "Choose the correct English translation: 'मैंने कल कोई यात्रा नहीं की।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'मैंने कल कोई यात्रा नहीं की।'",
      "options": [
        "A) I do not take any trip yesterday.",
        "B) I didn't take any trip yesterday.",
        "C) I didn't took any trip yesterday.",
        "D) I was not take any trip yesterday."
      ],
      "correctIndex": 1
    },
    {
      "id": 8,
      "question": "What is the English equivalent of 'एक यादगार यात्रा'?",
      "questionHindi": "'एक यादगार यात्रा' का अंग्रेजी पर्याय क्या है?",
      "options": [
        "A) A memorable journey",
        "B) A past achievement",
        "C) A favorite holiday",
        "D) A exciting experience"
      ],
      "correctIndex": 0
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) she didn't liked",
        "B) she doesn't",
        "C) she didn't",
        "D) she wasn't"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Complete the sentence: 'When _____ (आपने पूरा किया) your graduation project?'",
      "questionHindi": "वाक्य पूरा करें: 'When _____ (आपने पूरा किया) your graduation project?'",
      "options": [
        "A) did you completed",
        "B) you did complete",
        "C) did you complete",
        "D) have you complete"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) We didn't had much fun on our holiday.",
        "B) We didn't have much fun on our holiday.",
        "C) We don't have much fun on our holiday.",
        "D) We were not have much fun on our holiday."
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Childhood job story",
        "B) First experience job",
        "C) Past work memory",
        "D) First job experience"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) How did you reach there?",
        "B) How you reached there?",
        "C) How did you reached there?",
        "D) How do you reached there?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Fill in the blank: 'Why _____ (उसने आपको फोन नहीं किया) last night?'",
      "questionHindi": "रिक्त स्थान भरें: 'Why _____ (उसने आपको फोन नहीं किया) last night?'",
      "options": [
        "A) did he not called you",
        "B) didn't he call you",
        "C) he didn't call you",
        "D) doesn't he call you"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Did he spent his childhood in a village?",
        "B) Did he spend his childhood in a village?",
        "C) Does he spend his childhood in a village?",
        "D) Was he spend his childhood in a village?"
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) they haven't",
        "B) they doesn't",
        "C) they didn't",
        "D) they don't"
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Memorable memory",
        "B) Childhood journey",
        "C) Past experience",
        "D) Exciting accomplishment"
      ],
      "correctIndex": 3
    },
    {
      "id": 18,
      "question": "Choose the correct English translation: 'उसने अपना काम समय पर पूरा नहीं किया।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'उसने अपना काम समय पर पूरा नहीं किया।'",
      "options": [
        "A) He didn't finish his work on time.",
        "B) He didn't finished his work on time.",
        "C) He does not finish his work on time.",
        "D) He was not finish his work on time."
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Who",
        "B) Which",
        "C) Why",
        "D) Where"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Do you finish your homework last night?",
        "B) Did you finish your homework last night?",
        "C) Did you finished your homework last night?",
        "D) Were you finish your homework last night?"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Previous day",
        "B) Next weekend",
        "C) Last weekend",
        "D) Past holiday"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) I met",
        "B) I do",
        "C) I was",
        "D) I did"
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) didn't face",
        "B) didn't faced",
        "C) don't face",
        "D) were not face"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) What you did on your last holiday?",
        "B) What did you do on your last holiday?",
        "C) What did you did on your last holiday?",
        "D) What do you do on your last holiday?"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Choose the correct sentence structure for negative simple past:",
      "questionHindi": "सामान्य भूतकाल के नकारात्मक वाक्य के लिए सही वाक्य संरचना चुनें:",
      "options": [
        "A) Subject + did not + verb (past tense)",
        "B) Subject + do not + verb (base form)",
        "C) Subject + did not + verb (base form)",
        "D) Subject + was not + verb (base form)"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "What is the translation of 'पसंदीदा बचपन की याद'?",
      "questionHindi": "'पसंदीदा बचपन की याद' का अनुवाद क्या है?",
      "options": [
        "A) Memorable childhood work",
        "B) Exciting past journey",
        "C) First school accomplishment",
        "D) Favorite childhood memory"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Did you attend that conference last month?",
        "B) Did you attended that conference last month?",
        "C) Do you attend that conference last month?",
        "D) Have you attend that conference last month?"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) When",
        "B) Why",
        "C) What",
        "D) Where"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I don't sleep well last night.",
        "B) I was not sleep well last night.",
        "C) I didn't sleep well last night.",
        "D) I didn't slept well last night."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the short answer: 'Did Rahul complete his project on time?' - 'No, _____.'",
      "questionHindi": "संक्षिप्त उत्तर पूरा करें: 'Did Rahul complete his project on time?' - 'No, _____.'",
      "options": [
        "A) he hasn't",
        "B) he didn't completed",
        "C) he doesn't",
        "D) he didn't"
      ],
      "correctIndex": 3
    }
  ],
  "16": [
    {
      "id": 1,
      "question": "Which sentence correctly uses sequence words to describe a past event?",
      "questionHindi": "पिछली घटना का वर्णन करने के लिए कौन सा वाक्य क्रम सूचक शब्दों (sequence words) का सही उपयोग करता है?",
      "options": [
        "A) First I ate, then I sleep.",
        "B) First I eat, then I slept.",
        "C) First I ate, after that I sleep.",
        "D) First I ate, then I slept."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Translate: 'अचानक बारिश होने लगी।' (Suddenly, it started raining.)",
      "questionHindi": "अनुवाद करें: 'अचानक बारिश होने लगी।'",
      "options": [
        "A) Suddenly, it starts raining.",
        "B) Suddenly, it start to rain.",
        "C) Suddenly, it was rain.",
        "D) Suddenly, it started raining."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) finds",
        "B) finded",
        "C) is finding",
        "D) found"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'I lost my keys, but ____ I found them in my pocket.' (भाग्यवश)",
      "questionHindi": "रिक्त स्थान भरें: 'I lost my keys, but ____ I found them in my pocket.'",
      "options": [
        "A) luckily",
        "B) suddenly",
        "C) first",
        "D) finally"
      ],
      "correctIndex": 0
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) First",
        "B) Suddenly",
        "C) Then",
        "D) Finally"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'सबसे पहले हम स्कूल गए, फिर हमने पढ़ाई की।'",
      "questionHindi": "अनुवाद करें: 'सबसे पहले हम स्कूल गए, फिर हमने पढ़ाई की।'",
      "options": [
        "A) First we go to school, then we study.",
        "B) First we went to school, then we study.",
        "C) First we go to school, then we studied.",
        "D) First we went to school, then we studied."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which sentence uses the simple past tense correctly?",
      "questionHindi": "कौन सा वाक्य साधारण भूतकाल (simple past) का सही उपयोग करता है?",
      "options": [
        "A) She helped me yesterday.",
        "B) She help me yesterday.",
        "C) She helps me yesterday.",
        "D) She is helping me yesterday."
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "Choose the best option: '____ I saw a monkey in the garden.' (अचानक)",
      "questionHindi": "सबसे अच्छा विकल्प चुनें: '____ I saw a monkey in the garden.'",
      "options": [
        "A) After that",
        "B) Finally",
        "C) Luck",
        "D) Suddenly"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) My friend help me.",
        "B) My friend helps me.",
        "C) My friend helped me.",
        "D) My friend is helping me."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Fill in the blank: 'We reached the station. ____, the train arrived.' (उसके बाद)",
      "questionHindi": "रिक्त स्थान भरें: 'We reached the station. ____, the train arrived.'",
      "options": [
        "A) First",
        "B) Suddenly",
        "C) After that",
        "D) Luckily"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) went, played",
        "B) go, play",
        "C) went, play",
        "D) go, played"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) First, we reached home.",
        "B) Suddenly, we reached home.",
        "C) Finally, we reached home.",
        "D) Then, we reached home."
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Finally",
        "B) Luckily",
        "C) Then",
        "D) Suddenly"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Choose the correct sentence to describe a funny incident.",
      "questionHindi": "एक मजेदार घटना का वर्णन करने के लिए सही वाक्य चुनें।",
      "options": [
        "A) I fall down and everyone laugh.",
        "B) I fell down and everyone laugh.",
        "C) I fell down and everyone laughed.",
        "D) I fall down and everyone laughed."
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) luckily",
        "B) first",
        "C) then",
        "D) finally"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) He suddenly comes to the room.",
        "B) He suddenly coming to the room.",
        "C) He suddenly came to the room.",
        "D) He sudden came to the room."
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) celebrated",
        "B) celebrate",
        "C) celebrates",
        "D) celebrating"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Choose the correct sequence to tell a story.",
      "questionHindi": "कहानी सुनाने के लिए सही क्रम चुनें।",
      "options": [
        "A) First, Then, Finally",
        "B) Finally, First, Then",
        "C) Then, First, Finally",
        "D) First, Finally, Then"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) I lose my watch.",
        "B) I lost my watch.",
        "C) I am losing my watch.",
        "D) I loose my watch."
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Finally",
        "B) First",
        "C) Suddenly",
        "D) Luckily"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I went to school daily.",
        "B) I usually eat breakfast.",
        "C) Suddenly, the lights went out.",
        "D) I like to play cricket."
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) After that, we eat food.",
        "B) After that, we ate food.",
        "C) After that, we eating food.",
        "D) After that, we eaten food."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) seed",
        "B) saw",
        "C) seen",
        "D) seeing"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) finally",
        "B) first",
        "C) suddenly",
        "D) luckily"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Which word implies a lucky situation?",
      "questionHindi": "कौन सा शब्द सौभाग्यपूर्ण स्थिति को दर्शाता है?",
      "options": [
        "A) Suddenly",
        "B) Luckily",
        "C) First",
        "D) Then"
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Translate: 'वह बहुत खुश था।'",
      "questionHindi": "अनुवाद करें: 'वह बहुत खुश था।'",
      "options": [
        "A) He is very happy.",
        "B) He was very happy.",
        "C) He were very happy.",
        "D) He been very happy."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) We went to the beach, then we swam.",
        "B) We go to the beach, then we swim.",
        "C) We went to the beach, then we swimming.",
        "D) We go to the beach, then we swam."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) first",
        "B) suddenly",
        "C) finally",
        "D) after that"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) telled",
        "B) tells",
        "C) told",
        "D) telling"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Translate: 'अंत में मुझे मेरी चाबियाँ मिल गईं।'",
      "questionHindi": "अनुवाद करें: 'अंत में मुझे मेरी चाबियाँ मिल गईं।'",
      "options": [
        "A) Finally I find my keys.",
        "B) Finally I found my keys.",
        "C) Finally I am finding my keys.",
        "D) Finally I was find my keys."
      ],
      "correctIndex": 1
    }
  ],
  "17": [
    {
      "id": 1,
      "question": "What were you doing when the rain started heavily yesterday?",
      "questionHindi": "कल जब जोर से बारिश शुरू हुई, तो आप क्या कर रहे थे?",
      "options": [
        "A) What you were doing when rain started?",
        "B) What was you doing when the rain started?",
        "C) What you did when the rain was starting?",
        "D) What were you doing when the rain started?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct translation: 'मैं कल रात पढ़ाई कर रहा था जब बिजली चली गई।'",
      "questionHindi": "Choose the correct translation: 'मैं कल रात पढ़ाई कर रहा था जब बिजली चली गई।'",
      "options": [
        "A) I studied when the power was going out.",
        "B) I were studying when the power went out.",
        "C) I was study when the power went out.",
        "D) I was studying when the power went out."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) cook",
        "B) were cooking",
        "C) am cooking",
        "D) was cooking"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "What were you working on this time last week?",
      "questionHindi": "पिछले सप्ताह इस समय आप किस काम पर काम कर रहे थे?",
      "options": [
        "A) What did you work this time last week?",
        "B) What were you work this time last week?",
        "C) What was you working on this time last week?",
        "D) What were you working on this time last week?"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) is playing",
        "B) were playing",
        "C) play",
        "D) was playing"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "What were your family members doing when you returned home yesterday?",
      "questionHindi": "कल जब आप घर लौटे, तो आपके परिवार के सदस्य क्या कर रहे थे?",
      "options": [
        "A) What your family members did when you returned?",
        "B) What was your family members doing when you returned?",
        "C) What did your family members doing when you returned?",
        "D) What were your family members doing when you returned?"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Translate: 'वह सड़क पार कर रहा था जब उसने एक दुर्घटना देखी।'",
      "questionHindi": "Translate: 'वह सड़क पार कर रहा था जब उसने एक दुर्घटना देखी।'",
      "options": [
        "A) He crossed the road when he was seeing an accident.",
        "B) He were crossing the road when he saw an accident.",
        "C) He was crossing the road when he saw an accident.",
        "D) He was cross the road when he saw an accident."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "What were you thinking about before you joined this speaking session?",
      "questionHindi": "इस स्पीकिंग सेशन में शामिल होने से पहले आप क्या सोच रहे थे?",
      "options": [
        "A) What you was thinking before you joined?",
        "B) What did you think before you joined?",
        "C) What were you thinking before you joined?",
        "D) What was you thinking before you joined?"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) was watching",
        "B) were watch",
        "C) were watching",
        "D) watching"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Which sentence is grammatically correct?",
      "questionHindi": "कौन सा वाक्य व्याकरण की दृष्टि से सही है?",
      "options": [
        "A) We was talking when the teacher walked in.",
        "B) We were talk when the teacher walked in.",
        "C) We were talking when the teacher walked in.",
        "D) We was talk when the teacher walked in."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) The boss came when I were working in the office.",
        "B) The boss came when I was working in the office.",
        "C) The boss was coming when I worked in the office.",
        "D) The boss come when I was working in the office."
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) was",
        "B) were",
        "C) did",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) were waiting",
        "B) was waiting",
        "C) waited",
        "D) am waiting"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Translate: 'कल शाम आप क्या कर रहे थे?'",
      "questionHindi": "Translate: 'कल शाम आप क्या कर रहे थे?'",
      "options": [
        "A) What you were doing yesterday evening?",
        "B) What was you doing yesterday evening?",
        "C) What were you doing yesterday evening?",
        "D) What did you doing yesterday evening?"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) The teacher explained when the student was laughing.",
        "B) The teacher was explaining when the student laughed.",
        "C) The teacher was explain when the student was laughing.",
        "D) The teacher explain when the student laughed."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) were driving",
        "B) was driving",
        "C) is driving",
        "D) drove"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) was playing",
        "B) were playing",
        "C) played",
        "D) are playing"
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Translate: 'हम यात्रा के दौरान गाना सुन रहे थे।'",
      "questionHindi": "Translate: 'हम यात्रा के दौरान गाना सुन रहे थे।'",
      "options": [
        "A) We were listening to music during the journey.",
        "B) We was listening to music during the journey.",
        "C) We were listen to music during the journey.",
        "D) We listened to music during the journey."
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) were",
        "B) did",
        "C) was",
        "D) is"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) was studying",
        "B) studied",
        "C) study",
        "D) was study"
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) My phone was ringing when I was sleeping.",
        "B) My phone rang when I was sleeping.",
        "C) My phone was ring when I was sleeping.",
        "D) My phone were ringing when I was sleep."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) They was",
        "B) playing",
        "C) while",
        "D) was raining"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) did",
        "B) done",
        "C) doing",
        "D) do"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) we was eating",
        "B) we were eating",
        "C) we were eat",
        "D) we are eating"
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Which sentence describes an ongoing past action interrupted by an event?",
      "questionHindi": "कौन सा वाक्य एक जारी अतीत की क्रिया का वर्णन करता है जो एक घटना से बाधित हुई थी?",
      "options": [
        "A) I went to the store.",
        "B) I was reading when the bell rang.",
        "C) I read a book yesterday.",
        "D) I am reading right now."
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Translate: 'वह खाना बना रही थी जब मेहमान आए।'",
      "questionHindi": "Translate: 'वह खाना बना रही थी जब मेहमान आए।'",
      "options": [
        "A) She was cooking when the guests arrived.",
        "B) She cooked when the guests were arriving.",
        "C) She were cooking when the guests arrived.",
        "D) She was cook when the guests arrived."
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) was speaking",
        "B) were speaking",
        "C) spoke",
        "D) is speaking"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) What you were doing when you heard?",
        "B) What was you doing when you heard?",
        "C) What were you doing when you heard?",
        "D) What did you doing when you heard?"
      ],
      "correctIndex": 2
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) was walking",
        "B) were walking",
        "C) walked",
        "D) walk"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Translate: 'वे कल शाम क्रिकेट खेल रहे थे।'",
      "questionHindi": "Translate: 'वे कल शाम क्रिकेट खेल रहे थे।'",
      "options": [
        "A) They were playing cricket yesterday evening.",
        "B) They was playing cricket yesterday evening.",
        "C) They played cricket yesterday evening.",
        "D) They were play cricket yesterday evening."
      ],
      "correctIndex": 0
    }
  ],
  "18": [
    {
      "id": 1,
      "question": "Choose the correct translation: 'मैंने कभी हवाई जहाज़ से यात्रा नहीं की है।' (I have never...)",
      "questionHindi": "अनुवाद करें: 'मैंने कभी हवाई जहाज़ से यात्रा नहीं की है।' (I have never traveled by plane)",
      "options": [
        "A) I completed my graduation recently.",
        "B) I have completing my graduation.",
        "C) I am recently completed my graduation.",
        "D) I have recently completed my graduation."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Complete the question about life experience: 'Have you ever visited a foreign country?'",
      "questionHindi": "जीवन के अनुभव (life experience) के बारे में प्रश्न पूरा करें: 'क्या आप कभी विदेश गए हैं?'",
      "options": [
        "A) I win three awards so far.",
        "B) I had won three awards so far.",
        "C) I am winning three awards so far.",
        "D) I have won three awards so far."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Which sentence uses the present perfect tense to express an achievement so far?",
      "questionHindi": "अब तक की उपलब्धि (achievement so far) व्यक्त करने के लिए प्रेजेंट परफेक्ट काल का सही वाक्य कौन सा है?",
      "options": [
        "A) Did you ever work in a big company?",
        "B) Have you worked ever in a big company?",
        "C) Are you ever worked in a big company?",
        "D) Have you ever worked in a big company?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Translate: 'मैंने अपने जीवन में अब तक बहुत कुछ सीखा है।' (I have learned so far)",
      "questionHindi": "अनुवाद करें: 'मैंने अपने जीवन में अब तक बहुत कुछ सीखा है।' (learned so far)",
      "options": [
        "A) has",
        "B) am",
        "C) do",
        "D) have"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Which question asks about someone's career experience using 'Have you ever'?",
      "questionHindi": "करियर के अनुभव (career experience) के बारे में 'Have you ever' का प्रयोग कर पूछा जाने वाला प्रश्न कौन सा है?",
      "options": [
        "A) Small daily task",
        "B) A heavy stone",
        "C) A college degree",
        "D) A significant stage or event in life"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'मैंने पिछले पांच वर्षों में बहुत कुछ सीखा है।'",
      "questionHindi": "मैंने पिछले पांच वर्षों में बहुत कुछ सीखा है।",
      "options": [
        "A) I learned a lot in the last five years.",
        "B) I am learning a lot in the last five years.",
        "C) I have been learning a lot since five years.",
        "D) I have learned a lot in the last five years."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Which sentence indicates a completed action with present relevance?",
      "questionHindi": "कौन सा वाक्य वर्तमान प्रासंगिकता के साथ पूर्ण कार्य को दर्शाता है?",
      "options": [
        "A) She already finished her project.",
        "B) She finishes her project already.",
        "C) She has already finished her project.",
        "D) She is already finishing her project."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Translate: 'क्या आपने हाल ही में कोई नया कौशल सीखा है?'",
      "questionHindi": "क्या आपने हाल ही में कोई नया कौशल सीखा है?",
      "options": [
        "A) Did you recently learn any new skill?",
        "B) Have you learn any new skill recently?",
        "C) Have you recently learned any new skill?",
        "D) Do you recently learn any new skill?"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Life road",
        "B) Life path",
        "C) Life journey",
        "D) Life walk"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Fill in the blank: 'She ______ already received her certification for the course.'",
      "questionHindi": "रिक्त स्थान भरें: 'She ______ already received her certification for the course.'",
      "options": [
        "A) have",
        "B) is",
        "C) has",
        "D) did"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) I did not achieve my goal so far.",
        "B) I am not achieving my goal so far.",
        "C) I have not achieved my goal so far.",
        "D) I have not achieve my goal so far."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) have",
        "B) had",
        "C) has",
        "D) is"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Did you ever go abroad?",
        "B) Are you ever going abroad?",
        "C) Have you ever gone abroad?",
        "D) Do you ever go abroad?"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Choose the correct sentence regarding a recent achievement.",
      "questionHindi": "हालिया उपलब्धि के संबंध में सही वाक्य चुनें।",
      "options": [
        "A) I have promoted recently.",
        "B) I have been promoted recently.",
        "C) I promoted recently.",
        "D) I am promoted recently."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) He has taken many important decisions in his career.",
        "B) He took many important decisions in his career.",
        "C) He have taken many important decisions in his career.",
        "D) He is taking many important decisions in his career."
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) has",
        "B) are",
        "C) have",
        "D) did"
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I dedicated my whole life to education.",
        "B) I have dedicated my whole life to education.",
        "C) I have dedicating my whole life to education.",
        "D) I am dedicating my whole life to education."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Identify the correct grammar: 'I have ______ my work.'",
      "questionHindi": "सही व्याकरण पहचानें: 'I have ______ my work.'",
      "options": [
        "A) finish",
        "B) finished",
        "C) finishing",
        "D) finishes"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Have you submitted your report yet?",
        "B) Did you submit your report yet?",
        "C) Are you submitting your report yet?",
        "D) Have you submit your report yet?"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I have completed two projects so far.",
        "B) I completed so far two projects.",
        "C) So far I have complete two projects.",
        "D) I have so far complete two projects."
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) He shifted to Mumbai recently.",
        "B) He has shifted to Mumbai recently.",
        "C) He is shifted to Mumbai recently.",
        "D) He have shifted to Mumbai recently."
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) has",
        "B) have",
        "C) had",
        "D) are"
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) My perspective has changed.",
        "B) My perspective changed.",
        "C) My perspective is change.",
        "D) My perspective have changed."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I have ever traveled to Delhi.",
        "B) I have never traveled to Delhi.",
        "C) I never have traveled to Delhi.",
        "D) I am never traveled to Delhi."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Translate: 'क्या आपने कभी किसी बड़ी उपलब्धि का अनुभव किया है?'",
      "questionHindi": "क्या आपने कभी किसी बड़ी उपलब्धि का अनुभव किया है?",
      "options": [
        "A) Have you ever experienced a major achievement?",
        "B) Did you ever experience a major achievement?",
        "C) Have you experience a major achievement?",
        "D) Are you ever experience a major achievement?"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Fill in the blank: 'She ______ just finished her graduation.'",
      "questionHindi": "रिक्त स्थान भरें: 'She ______ just finished her graduation.'",
      "options": [
        "A) have",
        "B) has",
        "C) is",
        "D) did"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) He has obtained many certificates so far.",
        "B) He obtained many certificates so far.",
        "C) He have obtained many certificates so far.",
        "D) He is obtaining many certificates so far."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I already have finished the task.",
        "B) I have already finished the task.",
        "C) I have finished already the task.",
        "D) Already I have finished the task."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I have seen many ups and downs in my life.",
        "B) I saw many ups and downs in my life.",
        "C) I have see many ups and downs in my life.",
        "D) I am seeing many ups and downs in my life."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Choose the best way to ask about career growth.",
      "questionHindi": "करियर विकास के बारे में पूछने का सबसे अच्छा तरीका चुनें।",
      "options": [
        "A) How has your career grown so far?",
        "B) How your career grow so far?",
        "C) How is your career grown so far?",
        "D) How have your career grown so far?"
      ],
      "correctIndex": 0
    }
  ],
  "19": [
    {
      "id": 1,
      "question": "Choose the correct English translation: 'मैंने अभी-अभी अपनी रिपोर्ट जमा की है।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'मैंने अभी-अभी अपनी रिपोर्ट जमा की है।'",
      "options": [
        "A) I have just submitted my report.",
        "B) I submit my report recently.",
        "C) I already submitted my report.",
        "D) I still have submitted my report."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Choose the correct English translation: 'क्या आपने अभी तक परियोजना पूरी नहीं की है?'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'क्या आपने अभी तक परियोजना पूरी नहीं की है?'",
      "options": [
        "A) Have you finish the project yet?",
        "B) Have you not finished the project yet?",
        "C) Did you finished the project already?",
        "D) Have you just not finish the project?"
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) अभी तक",
        "B) हाल ही में",
        "C) पहले ही",
        "D) अभी-अभी"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'She has ______ sent the email to the manager.' (वह पहले ही मैनेजर को ईमेल भेज चुकी है।)",
      "questionHindi": "रिक्त स्थान भरें: 'She has ______ sent the email to the manager.' (वह पहले ही मैनेजर को ईमेल भेज चुकी है।)",
      "options": [
        "A) yet",
        "B) still",
        "C) ever",
        "D) already"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Have you read any interesting book recently?",
        "B) Did you read any interesting book yet?",
        "C) Are you reading any interesting book just?",
        "D) Have you read any interesting book still?"
      ],
      "correctIndex": 0
    },
    {
      "id": 6,
      "question": "Complete the sentence based on the Hindi prompt (मैंने इस सप्ताह का अपना काम पूरा कर लिया है): 'I ______ completed my work for this week.'",
      "questionHindi": "हिंदी संकेत के आधार पर वाक्य पूरा करें: 'I ______ completed my work for this week.'",
      "options": [
        "A) was",
        "B) have",
        "C) has",
        "D) did"
      ],
      "correctIndex": 1
    },
    {
      "id": 7,
      "question": "Which English phrase translates to 'अभी तक नहीं'?",
      "questionHindi": "किस अंग्रेजी मुहावरे/शब्द का अर्थ 'अभी तक नहीं' होता है?",
      "options": [
        "A) Just now",
        "B) Already done",
        "C) Not yet",
        "D) Recently finished"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct English translation: 'उसने अभी तक अपना असाइनमेंट शुरू नहीं किया है।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'उसने अभी तक अपना असाइनमेंट शुरू नहीं किया है।'",
      "options": [
        "A) He has already started his assignment.",
        "B) He did not started his assignment yet.",
        "C) He has just started his assignment.",
        "D) He has not started his assignment yet."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) We have recently visited a new cafe in the city.",
        "B) We visit a new cafe in the city yet.",
        "C) We had just visit a new cafe in the city.",
        "D) We are recently visiting a new cafe in the city."
      ],
      "correctIndex": 0
    },
    {
      "id": 10,
      "question": "Fill in the blank: 'What have you accomplished so far ______ week?' (आपने इस सप्ताह अब तक क्या हासिल किया है?)",
      "questionHindi": "रिक्त स्थान भरें: 'What have you accomplished so far ______ week?'",
      "options": [
        "A) in",
        "B) this",
        "C) last",
        "D) next"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) yet",
        "B) still",
        "C) just",
        "D) ever"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Already",
        "B) Yet",
        "C) Still",
        "D) Recently"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Has the team received the new office update?",
        "B) Is the team receive the new office update?",
        "C) Did the team receiving the new office update?",
        "D) Has the team receive the new office update yet?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Choose the correct sentence using Present Perfect tense:",
      "questionHindi": "प्रेजेंट परफेक्ट टेंस का सही उपयोग करने वाला वाक्य चुनें:",
      "options": [
        "A) They have finish their homework just.",
        "B) They have just finished their homework.",
        "C) They are just finish their homework.",
        "D) They finished already their homework."
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) have",
        "B) is",
        "C) has",
        "D) does"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) My mother cooks lunch recently.",
        "B) My mother has cooked lunch yet.",
        "C) My mother is cooking lunch already.",
        "D) My mother has just cooked lunch."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) How many chapters have you revised so far?",
        "B) How many chapters do you revised so far?",
        "C) How many chapters are you revise yet?",
        "D) How many chapters have you revise recently?"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Fill in the blank: 'We have ______ achieved our sales target for this month.' (हमने इस महीने के लिए अपना बिक्री लक्ष्य पहले ही हासिल कर लिया है।)",
      "questionHindi": "रिक्त स्थान भरें: 'We have ______ achieved our sales target for this month.'",
      "options": [
        "A) yet",
        "B) already",
        "C) still",
        "D) ever"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) He looks for his file and did not find it.",
        "B) He is finding his file and has found it already.",
        "C) He is still looking for his file and has not found it yet.",
        "D) He has looked for his file and just found it."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) yet",
        "B) still",
        "C) just now",
        "D) already"
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I have recently made good progress in my studies.",
        "B) I am recently making good progress in my studies.",
        "C) I make good progress in my studies yet.",
        "D) I have make good progress in my studies already."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) I didn't received any message yet.",
        "B) I have not received any message yet.",
        "C) I am not receiving any message already.",
        "D) I has not received any message recently."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Is the boss approve the new project?",
        "B) Did the boss approved the new project yet?",
        "C) Has the boss approved the new project?",
        "D) Has the boss approving the new project?"
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) still",
        "B) already",
        "C) yet",
        "D) recently"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Choose the correct English translation: 'मेरे भाई ने अभी-अभी अपनी परीक्षा समाप्त की है।'",
      "questionHindi": "सही अंग्रेजी अनुवाद चुनें: 'मेरे भाई ने अभी-अभी अपनी परीक्षा समाप्त की है।'",
      "options": [
        "A) My brother has just finished his exam.",
        "B) My brother finished his exam yet.",
        "C) My brother has already finish his exam.",
        "D) My brother is just finishing his exam."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "What is the correct English equivalent for 'अभी भी' in negative or ongoing context?",
      "questionHindi": "नकारात्मक या जारी संदर्भ में 'अभी भी' का सही अंग्रेजी विकल्प क्या है?",
      "options": [
        "A) Just",
        "B) Still",
        "C) Recently",
        "D) Already"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) has",
        "B) are",
        "C) have",
        "D) did"
      ],
      "correctIndex": 2
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Do you visit any new place this week?",
        "B) Are you visiting any new place this week?",
        "C) Did you visited any new place this week?",
        "D) Have you visited any new place this week?"
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) My family has already planned our weekend trip.",
        "B) My family have plan our weekend trip recently.",
        "C) My family is already planned our weekend trip.",
        "D) My family has plan our weekend trip yet."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the sentence with the correct phrase: 'I feel good because I ______ all my today's tasks.' (मुझे अच्छा लग रहा है क्योंकि मैंने आज के अपने सभी कार्य पूरे कर लिए हैं।)",
      "questionHindi": "सही वाक्यांश के साथ वाक्य पूरा करें: 'I feel good because I ______ all my today's tasks.'",
      "options": [
        "A) am completing",
        "B) have completed",
        "C) complete yet",
        "D) was complete"
      ],
      "correctIndex": 1
    }
  ],
  "20": [
    {
      "id": 1,
      "question": "Translate the following sentence into English: 'मैं अगले साल एक नई कार खरीदने जा रहा हूँ।'",
      "questionHindi": "निम्नलिखित वाक्य का अंग्रेजी में अनुवाद करें: 'मैं अगले साल एक नई कार खरीदने जा रहा हूँ।'",
      "options": [
        "A) I bought a new car next year.",
        "B) I will buying a new car next year.",
        "C) I go to buy a new car next year.",
        "D) I am going to buy a new car next year."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which sentence correctly uses the structure 'am/is/are going to + V1' to talk about future plans?",
      "questionHindi": "भविष्य की योजनाओं के बारे में बात करने के लिए कौन सा वाक्य 'am/is/are going to + V1' संरचना का सही उपयोग करता है?",
      "options": [
        "A) She is going starting a business soon.",
        "B) She going to start a business soon.",
        "C) She is go to start a business soon.",
        "D) She is going to start a business soon."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) She was going to start her own business.",
        "B) She is start her own business.",
        "C) She will going to start her own business.",
        "D) She is going to start her own business."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Complete the sentence: 'What are your long-term career ______ for the next three to five years?' (दीर्घकालिक करियर की आकांक्षाएं)",
      "questionHindi": "वाक्य को पूरा करें: 'What are your long-term career ______ for the next three to five years?' (दीर्घकालिक करियर की आकांक्षाएं)",
      "options": [
        "A) hobbies",
        "B) past events",
        "C) memories",
        "D) aspirations"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Past memories",
        "B) Current activities",
        "C) Daily routines",
        "D) Future plans"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'वे इस गर्मी में विदेश यात्रा करने जा रहे हैं।'",
      "questionHindi": "अनुवाद करें: 'वे इस गर्मी में विदेश यात्रा करने जा रहे हैं।'",
      "options": [
        "A) They are traveling abroad last summer.",
        "B) They go to travel abroad this summer.",
        "C) They were going to travel abroad this summer.",
        "D) They are going to travel abroad this summer."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Fill in the blank with the correct form: 'I ______ to improve my spoken English after this course.' (मैं सुधार करने जा रहा हूँ)",
      "questionHindi": "सही रूप से रिक्त स्थान भरें: 'I ______ to improve my spoken English after this course.' (मैं सुधार करने जा रहा हूँ)",
      "options": [
        "A) going",
        "B) will going",
        "C) am going",
        "D) is going"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "What is the English meaning of 'लक्ष्य'? (e.g., career ______)",
      "questionHindi": "'लक्ष्य' का अंग्रेजी अर्थ क्या है? (जैसे, करियर ______)",
      "options": [
        "A) Past",
        "B) Failures",
        "C) Goals",
        "D) Doubts"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) How did you plan to use your English once you complete this course?",
        "B) How are you use your English once you complete this course?",
        "C) How do you plan to continue using your English once you complete this course?",
        "D) How do you using your English once you complete this course?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Choose the correct sentence in English: 'हम अगले महीने एक नया घर शिफ्ट करने जा रहे हैं।'",
      "questionHindi": "अंग्रेजी में सही वाक्य चुनें: 'हम अगले महीने एक नया घर शिफ्ट करने जा रहे हैं।'",
      "options": [
        "A) We were going to shift to a new house next month.",
        "B) We are going shifting to a new house next month.",
        "C) We are going to shift to a new house next month.",
        "D) We going to shift to a new house next month."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) did",
        "B) were",
        "C) would",
        "D) are"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) मैं प्रतियोगी परीक्षाओं की तैयारी कर रहा था।",
        "B) मैं प्रतियोगी परीक्षाओं की तैयारी करने जा रहा हूँ।",
        "C) मैंने प्रतियोगी परीक्षाओं की तैयारी कर ली है।",
        "D) मैं प्रतियोगी परीक्षाओं की तैयारी नहीं करूँगा।"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) pursued",
        "B) pursuing",
        "C) pursue",
        "D) pursues"
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Translate: 'वह डॉक्टर बनने जा रहा है।'",
      "questionHindi": "अनुवाद करें: 'वह डॉक्टर बनने जा रहा है।'",
      "options": [
        "A) He is going to become a doctor.",
        "B) He is become a doctor.",
        "C) He going to become a doctor.",
        "D) He will becoming a doctor."
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Intention",
        "B) Hesitation",
        "C) Attitude",
        "D) History"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) yesterday",
        "B) someday",
        "C) last week",
        "D) ago"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) My parents is going to visit us next week.",
        "B) My parents are going to visit us next week.",
        "C) My parents am going to visit us next week.",
        "D) My parents going to visit us next week."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Translate: 'आप भविष्य में कहाँ रहने जा रहे हैं?'",
      "questionHindi": "अनुवाद करें: 'आप भविष्य में कहाँ रहने जा रहे हैं?'",
      "options": [
        "A) Where were you going to live in the future?",
        "B) Where are you going to live in the future?",
        "C) Where you are going to live in the future?",
        "D) Where do you going to live in the future?"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) attract",
        "B) attracted",
        "C) attracting",
        "D) attracts"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Public duties",
        "B) Company rules",
        "C) Personal goals",
        "D) Family history"
      ],
      "correctIndex": 2
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I am going to open my own company.",
        "B) I was going to open my own company.",
        "C) I am open my own company.",
        "D) I going to open my own company."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) for",
        "B) at",
        "C) by",
        "D) from"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) is going",
        "B) are going",
        "C) am going",
        "D) was going"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I am going to learn a new skill.",
        "B) I am learn a new skill.",
        "C) I was going to learn a new skill.",
        "D) I will going to learn a new skill."
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "What is the English word for 'सपना / आकांक्षा'?",
      "questionHindi": "'सपना / आकांक्षा' के लिए अंग्रेजी शब्द क्या है?",
      "options": [
        "A) Dream",
        "B) Fact",
        "C) Reality",
        "D) Truth"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Complete the sentence with correct verb form: 'She is going to ______ a new house near the beach.' (बनाना)",
      "questionHindi": "सही क्रिया रूप के साथ वाक्य पूरा करें: 'She is going to ______ a new house near the beach.' (बनाना)",
      "options": [
        "A) built",
        "B) building",
        "C) build",
        "D) builds"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) We will go to have a meeting next week.",
        "B) We are going to have a meeting next week.",
        "C) We were going to have a meeting next week.",
        "D) We going to have a meeting next week."
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Are you going to change your job?",
        "B) Do you going to change your job?",
        "C) Were you going to change your job?",
        "D) Will you going to change your job?"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) mistakes",
        "B) dreams",
        "C) duties",
        "D) routine"
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Translate: 'वह अगले साल शादी करने जा रही है।'",
      "questionHindi": "अनुवाद करें: 'वह अगले साल शादी करने जा रही है।'",
      "options": [
        "A) She is get married next year.",
        "B) She is going to get married next year.",
        "C) She going to get married next year.",
        "D) She will going to get married next year."
      ],
      "correctIndex": 1
    }
  ],
  "21": [
    {
      "id": 1,
      "question": "Choose the correct English translation for: 'मैं तुम्हारी मदद करूँगा।'",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद चुनें: 'मैं तुम्हारी मदद करूँगा।'",
      "options": [
        "A) I will help you.",
        "B) I helped you.",
        "C) I am help you.",
        "D) I would helped you."
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "What is the correct English translation for: 'मौसम कल साफ़ रहेगा।'?",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद क्या है: 'मौसम कल साफ़ रहेगा।'?",
      "options": [
        "A) The weather is clear tomorrow.",
        "B) The weather will be clear tomorrow.",
        "C) The weather was clear tomorrow.",
        "D) The weather will clearing tomorrow."
      ],
      "correctIndex": 1
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) He does not break his promise.",
        "B) He did not break his promise.",
        "C) He won't break his promise.",
        "D) He will not breaking his promise."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Select the correct sentence for making a promise about self-improvement:",
      "questionHindi": "आत्म-सुधार के बारे में वादा करने के लिए सही वाक्य चुनें:",
      "options": [
        "A) I am read more books next month.",
        "B) I will read every day to improve my skills.",
        "C) I read every day to improve my skills.",
        "D) I will reading every day for improve."
      ],
      "correctIndex": 1
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I carry those heavy bags for you.",
        "B) I am carrying those heavy bags for you.",
        "C) I will carry those heavy bags for you.",
        "D) I carried those heavy bags for you."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Choose the correct English translation for: 'कृत्रिम बुद्धिमत्ता (AI) हमारे काम करने के तरीके को बदल देगी।'",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद चुनें: 'कृत्रिम बुद्धिमत्ता (AI) हमारे काम करने के तरीके को बदल देगी।'",
      "options": [
        "A) Artificial intelligence changes how we work.",
        "B) Artificial intelligence changed how we work.",
        "C) Artificial intelligence will transforming how we work.",
        "D) Artificial intelligence will transform the way we work."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Complete the sentence with the correct grammar: 'I promise I _____ (not / reveal) your secret.'",
      "questionHindi": "सही व्याकरण से वाक्य पूरा करें: 'I promise I _____ (not / reveal) your secret.'",
      "options": [
        "A) won't reveal",
        "B) not reveal",
        "C) don't reveal",
        "D) didn't reveal"
      ],
      "correctIndex": 0
    },
    {
      "id": 8,
      "question": "What is the correct English translation for: 'अगले दशक में तकनीक बहुत तेज़ी से बदलेगी।'",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद क्या है: 'अगले दशक में तकनीक बहुत तेज़ी से बदलेगी।'?",
      "options": [
        "A) Technology changed very fast in the next decade.",
        "B) Technology will change rapidly in the next decade.",
        "C) Technology is change rapidly in the next decade.",
        "D) Technology changes rapidly in the next decade."
      ],
      "correctIndex": 1
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Future promises",
        "B) Past decisions",
        "C) Future predictions",
        "D) Present commitments"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Choose the correct English translation for: 'क्या तुम समय पर आओगे?'",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद चुनें: 'क्या तुम समय पर आओगे?'",
      "options": [
        "A) Do you come on time?",
        "B) Are you come on time?",
        "C) Did you come on time?",
        "D) Will you come on time?"
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) will always support",
        "B) always supported",
        "C) am always support",
        "D) will always supporting"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Electric vehicles are more popular in the future.",
        "B) Electric vehicles will become more popular in the future.",
        "C) Electric vehicles became more popular in the future.",
        "D) Electric vehicles will becoming more popular in the future."
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Don't worry, I drop you at the station.",
        "B) Don't worry, I dropped you at the station.",
        "C) Don't worry, I will drop you at the station.",
        "D) Don't worry, I am drop you at the station."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Identify the offer made in response to an instant need:",
      "questionHindi": "तत्काल आवश्यकता के उत्तर में दिए गए प्रस्ताव (offer) को पहचानें:",
      "options": [
        "A) I am busy right now.",
        "B) I cooked dinner yesterday.",
        "C) I usually get up at 6 AM.",
        "D) The phone is ringing. I will answer it!"
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Commitment",
        "B) Prediction",
        "C) Decision",
        "D) Transportation"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Scientists discover something new soon.",
        "B) Scientists will make a new discovery soon.",
        "C) Scientists made a new discovery soon.",
        "D) Scientists are make a new discovery soon."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) traveled",
        "B) traveling",
        "C) will travel",
        "D) are travel"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What is the English translation for: 'आज रात बारिश नहीं होगी।'",
      "questionHindi": "इस वाक्य का सही अंग्रेजी अनुवाद क्या है: 'आज रात बारिश नहीं होगी।'?",
      "options": [
        "A) It is not raining tonight.",
        "B) It doesn't rain tonight.",
        "C) It didn't rain tonight.",
        "D) It won't rain tonight."
      ],
      "correctIndex": 3
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) will close",
        "B) closed",
        "C) am close",
        "D) close"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I work hard to achieve my goals.",
        "B) I will work hard to achieve my goals.",
        "C) I worked hard to achieve my goals.",
        "D) I am work hard to achieve my goals."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) लंबा विचार",
        "B) पुरानी यादें",
        "C) तत्काल निर्णय",
        "D) भविष्य का वादा"
      ],
      "correctIndex": 2
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) I ate lunch at 1 PM.",
        "B) She will study medicine next year.",
        "C) They are walking in the garden.",
        "D) New technology will create many new jobs in the future."
      ],
      "correctIndex": 3
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) won't forget",
        "B) not will forget",
        "C) will not forgetting",
        "D) don't forget"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Autonomous cars made transportation safer.",
        "B) Autonomous cars will make transportation safer.",
        "C) Autonomous cars making transportation safer.",
        "D) Autonomous cars are make transportation safer."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What is the correct translation for: 'मैं आपको निराश नहीं करूँगा, यह मेरा वादा है।'",
      "questionHindi": "सही अनुवाद क्या है: 'मैं आपको निराश नहीं करूँगा, यह मेरा वादा है।'?",
      "options": [
        "A) I do not let you down, that is my promise.",
        "B) I am not letting you down, that is my promise.",
        "C) I won't let you down, that is my promise.",
        "D) I didn't let you down, that is my promise."
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Choose the correct verb form for making a future prediction: 'Do you think it _____ (be) hot tomorrow?'",
      "questionHindi": "भविष्य की भविष्यवाणी करने के लिए सही क्रिया रूप चुनें: 'Do you think it _____ (be) hot tomorrow?'",
      "options": [
        "A) is",
        "B) was",
        "C) being",
        "D) will be"
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) I will meet you tomorrow morning.",
        "B) I met you tomorrow morning.",
        "C) I am meet you tomorrow morning.",
        "D) I meet you tomorrow morning."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I ate unhealthy food yesterday.",
        "B) I will exercise daily to stay healthy.",
        "C) I am exercising right now.",
        "D) I exercise every morning."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Do robots replace doctors in the future?",
        "B) Are robots replace doctors in the future?",
        "C) Will robots replace doctors in the future?",
        "D) Did robots replace doctors in the future?"
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Complete the sentence: 'Don't worry about the bill, I _____ (pay) for it.'",
      "questionHindi": "वाक्य पूरा करें: 'Don't worry about the bill, I _____ (pay) for it.'",
      "options": [
        "A) paid",
        "B) am paying",
        "C) pay",
        "D) will pay"
      ],
      "correctIndex": 3
    }
  ],
  "22": [
    {
      "id": 1,
      "question": "What will you be doing this time tomorrow afternoon?",
      "questionHindi": "कल दोपहर इस समय आप क्या कर रहे होंगे?",
      "options": [
        "A) What you will do?",
        "B) What will you do?",
        "C) What are you doing?",
        "D) What will you be doing?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct translation: 'मैं अगले महीने इस समय अंग्रेजी सीख रहा होऊँगा।'",
      "questionHindi": "मैं अगले महीने इस समय अंग्रेजी सीख रहा होऊँगा।",
      "options": [
        "A) I will learn English next month.",
        "B) I am learning English next month.",
        "C) I will have learned English next month.",
        "D) I will be learning English this time next month."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Where will you live and work?",
        "B) Where are you living and working?",
        "C) Where have you lived and worked?",
        "D) Where will you be living and working?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Complete the sentence: 'This time tomorrow, my father __________ in a meeting.'",
      "questionHindi": "कल इस समय, मेरे पिताजी एक मीटिंग में _________ होंगे।",
      "options": [
        "A) will sit",
        "B) is sitting",
        "C) will have sat",
        "D) will be sitting"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I will study tomorrow.",
        "B) I study tomorrow.",
        "C) I have been studying tomorrow.",
        "D) I will be studying tomorrow morning."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'मेरे दोस्त कल शाम फुटबॉल खेल रहे होंगे।'",
      "questionHindi": "मेरे दोस्त कल शाम फुटबॉल खेल रहे होंगे।",
      "options": [
        "A) My friends will play football tomorrow evening.",
        "B) My friends are playing football tomorrow evening.",
        "C) My friends have been playing football tomorrow evening.",
        "D) My friends will be playing football tomorrow evening."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "What is the correct form for 'will be + verb-ing'?",
      "questionHindi": "'will be + verb-ing' के लिए सही रूप क्या है?",
      "options": [
        "A) He will be go to work.",
        "B) He will be gone to work.",
        "C) He will be going to work.",
        "D) He will be goes to work."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Fill in the blank: 'While you are enjoying your weekend, I __________ on my project.'",
      "questionHindi": "जब आप अपना वीकेंड एन्जॉय कर रहे होंगे, मैं अपने प्रोजेक्ट पर _________ रहा होऊँगा।",
      "options": [
        "A) will work",
        "B) am working",
        "C) will be working",
        "D) have worked"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) They will attend a meeting.",
        "B) They are attending a meeting.",
        "C) They will be attending a meeting.",
        "D) They attend a meeting."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'वह कल इस समय यात्रा कर रही होगी।'",
      "questionHindi": "वह कल इस समय यात्रा कर रही होगी।",
      "options": [
        "A) She will travel at this time tomorrow.",
        "B) She is traveling at this time tomorrow.",
        "C) She will be traveling at this time tomorrow.",
        "D) She has been traveling at this time tomorrow."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Next year this time",
        "B) In the next year",
        "C) This time next year",
        "D) At the next year"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) will prepare",
        "B) are preparing",
        "C) will be preparing",
        "D) have prepared"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) They will have lunch tomorrow afternoon.",
        "B) They will be having lunch tomorrow afternoon.",
        "C) They are having lunch tomorrow afternoon.",
        "D) They will be eat lunch tomorrow afternoon."
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Select the correct structure for a future continuous question.",
      "questionHindi": "भविष्य के निरंतर प्रश्न (future continuous question) के लिए सही संरचना चुनें।",
      "options": [
        "A) Will you be study?",
        "B) Will you be studying?",
        "C) Will you studying?",
        "D) Are you be studying?"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) will sit",
        "B) will be sitting",
        "C) am sitting",
        "D) have been sitting"
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) I will be waiting for you.",
        "B) I will waiting for you.",
        "C) I will be wait for you.",
        "D) I will be waited for you."
      ],
      "correctIndex": 0
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Will you work tomorrow morning?",
        "B) Are you working tomorrow morning?",
        "C) Will you be working tomorrow morning?",
        "D) Do you work tomorrow morning?"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "What skill will you be practicing this time next month?",
      "questionHindi": "अगले महीने इस समय आप कौन सा कौशल (skill) अभ्यास कर रहे होंगे?",
      "options": [
        "A) I will practice coding.",
        "B) I will be practicing coding.",
        "C) I am practicing coding.",
        "D) I practice coding."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) will be cleaning",
        "B) will clean",
        "C) is cleaning",
        "D) will have cleaned"
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) We will be watching a movie tomorrow night.",
        "B) We will watch a movie tomorrow night.",
        "C) We are watching a movie tomorrow night.",
        "D) We will have watched a movie tomorrow night."
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) He won't be study.",
        "B) He will not be studying.",
        "C) He isn't studying.",
        "D) He won't study."
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) will be flying",
        "B) will fly",
        "C) am flying",
        "D) will have flown"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I will eat.",
        "B) I am eating.",
        "C) I will be eating.",
        "D) I ate."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Will they be playing tomorrow?",
        "B) Will they play tomorrow?",
        "C) Are they playing tomorrow?",
        "D) Do they play tomorrow?"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Fill in the blank: 'She __________ her presentation at 2 PM tomorrow.'",
      "questionHindi": "वह कल दोपहर 2 बजे अपनी प्रेजेंटेशन _________ रही होगी।",
      "options": [
        "A) will be giving",
        "B) will give",
        "C) is giving",
        "D) will have given"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Select the option that shows a future schedule.",
      "questionHindi": "वह विकल्प चुनें जो भविष्य के कार्यक्रम को दर्शाता है।",
      "options": [
        "A) I will be meeting the manager tomorrow.",
        "B) I meet the manager tomorrow.",
        "C) I met the manager tomorrow.",
        "D) I have met the manager tomorrow."
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) They will have breakfast.",
        "B) They will be having breakfast.",
        "C) They are having breakfast.",
        "D) They have breakfast."
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I won't work tomorrow night.",
        "B) I will not be working tomorrow night.",
        "C) I am not working tomorrow night.",
        "D) I haven't worked tomorrow night."
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) They will be sleep.",
        "B) They will be sleeping.",
        "C) They will be slept.",
        "D) They will be sleeps."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Complete the sentence: 'At this time tomorrow, we __________ on the beach.'",
      "questionHindi": "कल इस समय, हम समुद्र तट पर _________ रहे होंगे।",
      "options": [
        "A) will be relaxing",
        "B) will relax",
        "C) are relaxing",
        "D) will have relaxed"
      ],
      "correctIndex": 0
    }
  ],
  "23": [
    {
      "id": 1,
      "question": "How long have you been learning English?",
      "questionHindi": "आप कितनी देर से अंग्रेजी सीख रहे हैं?",
      "options": [
        "A) How long you are learning English?",
        "B) How long do you learn English?",
        "C) How long you learn English?",
        "D) How long have you been learning English?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "I have been practicing yoga ________ three months.",
      "questionHindi": "मैं तीन महीनों से योग का अभ्यास कर रहा हूँ।",
      "options": [
        "A) since",
        "B) at",
        "C) during",
        "D) for"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) have been",
        "B) is",
        "C) was",
        "D) has been"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Choose the correct translation: 'मैं पिछले दो हफ्तों से व्यायाम कर रहा हूँ।'",
      "questionHindi": "मैं पिछले दो हफ्तों से व्यायाम कर रहा हूँ।",
      "options": [
        "A) I am exercising for two weeks.",
        "B) I have been exercising since two weeks.",
        "C) I exercise for two weeks.",
        "D) I have been exercising for two weeks."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) What you focus lately?",
        "B) What are you focus lately?",
        "C) What have you been focusing on lately?",
        "D) What do you been focusing on?"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "They ________ (study) for their exams since morning.",
      "questionHindi": "वे सुबह से अपनी परीक्षाओं के लिए पढ़ रहे हैं।",
      "options": [
        "A) has been studying",
        "B) are studying",
        "C) have been studying",
        "D) have study"
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "I have been working at this company ________ 2020.",
      "questionHindi": "मैं 2020 से इस कंपनी में काम कर रहा हूँ।",
      "options": [
        "A) for",
        "B) until",
        "C) since",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct phrase: 'अपनी प्रगति के बारे में बताना'",
      "questionHindi": "अपनी प्रगति के बारे में बताना",
      "options": [
        "A) Talking my progress",
        "B) Talk progress",
        "C) Talk about my progress",
        "D) Talked to progress"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Have he been following?",
        "B) Has he been following?",
        "C) Is he follow?",
        "D) Does he been following?"
      ],
      "correctIndex": 1
    },
    {
      "id": 10,
      "question": "We have been ________ (learn) new skills for our professional growth.",
      "questionHindi": "हम अपने पेशेवर विकास के लिए नए कौशल सीख रहे हैं।",
      "options": [
        "A) learn",
        "B) learned",
        "C) learning",
        "D) learns"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) I am try to improve my mistakes.",
        "B) I have been trying to improve my mistakes.",
        "C) I have been try to improve my mistakes.",
        "D) I try to improve my mistakes."
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) do",
        "B) has",
        "C) are",
        "D) have"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) She has been work for long.",
        "B) She has been working for long.",
        "C) She has working for long.",
        "D) She have been working for long."
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "I ________ (not/feel) well for the past few days.",
      "questionHindi": "मैं पिछले कुछ दिनों से अच्छा महसूस नहीं कर रहा हूँ।",
      "options": [
        "A) have not been feeling",
        "B) has not been feeling",
        "C) am not feel",
        "D) have not feel"
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Short term plans",
        "B) Immediate tasks",
        "C) Long-term objectives",
        "D) Daily habits"
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) since",
        "B) for",
        "C) at",
        "D) in"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) do",
        "B) did",
        "C) doing",
        "D) done"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Choose the correct translation: 'वह सुबह से काम कर रहा है।'",
      "questionHindi": "वह सुबह से काम कर रहा है।",
      "options": [
        "A) He has been working since morning.",
        "B) He has been working for morning.",
        "C) He is working since morning.",
        "D) He works since morning."
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) try",
        "B) tries",
        "C) trying",
        "D) tried"
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) for",
        "B) since",
        "C) during",
        "D) always"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) exercise",
        "B) exercises",
        "C) exercised",
        "D) exercising"
      ],
      "correctIndex": 3
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Have you been focusing on your studies?",
        "B) Are you focus on your studies?",
        "C) Do you been focus on studies?",
        "D) Have you focus on studies?"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) has been reading",
        "B) have been reading",
        "C) is reading",
        "D) was reading"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) been",
        "B) be",
        "C) being",
        "D) is"
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "I have been working on my communication skills ________ last month.",
      "questionHindi": "मैं पिछले महीने से अपने संचार कौशल पर काम कर रहा हूँ।",
      "options": [
        "A) for",
        "B) since",
        "C) during",
        "D) at"
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Choose the correct translation: 'मैं अपनी फिटनेस दिनचर्या का पालन कर रहा हूँ।'",
      "questionHindi": "मैं अपनी फिटनेस दिनचर्या का पालन कर रहा हूँ।",
      "options": [
        "A) I have been following my fitness routine.",
        "B) I follow my fitness routine.",
        "C) I am follow my fitness routine.",
        "D) I have been follow my fitness routine."
      ],
      "correctIndex": 0
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Has",
        "B) Have",
        "C) Are",
        "D) Do"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) overcome",
        "B) overcoming",
        "C) overcomes",
        "D) overcame"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Ongoing activities",
        "B) Past activities",
        "C) Short activities",
        "D) Future activities"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "He ________ (practice) his presentation skills for weeks.",
      "questionHindi": "वह हफ्तों से अपने प्रेजेंटेशन कौशल का अभ्यास कर रहा है।",
      "options": [
        "A) has been practicing",
        "B) have been practicing",
        "C) is practicing",
        "D) was practicing"
      ],
      "correctIndex": 0
    }
  ],
  "24": [
    {
      "id": 1,
      "question": "How do you politely ask a shop assistant for a larger size?",
      "questionHindi": "आप विनम्रतापूर्वक दुकान सहायक से बड़े आकार के लिए कैसे पूछेंगे?",
      "options": [
        "A) Give me a big one.",
        "B) I want big size.",
        "C) Can I have this in a larger size?",
        "D) Make it bigger."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Choose the best way to ask about seasonal discounts.",
      "questionHindi": "मौसमी छूट के बारे में पूछने का सबसे अच्छा तरीका चुनें।",
      "options": [
        "A) Is there any discount?",
        "B) Give me discount.",
        "C) Are there any seasonal discounts available?",
        "D) Discount is there?"
      ],
      "correctIndex": 2
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I try this?",
        "B) Try this shirt now.",
        "C) Can I try this on?",
        "D) Is this for trying?"
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "Translate: 'क्या आपके पास यह जूता दूसरे रंग में उपलब्ध है?'",
      "questionHindi": "क्या आपके पास यह जूता दूसरे रंग में उपलब्ध है?",
      "options": [
        "A) This shoe is another color?",
        "B) Give me another color shoe.",
        "C) Do you have this shoe in another color?",
        "D) Is this shoe color available?"
      ],
      "correctIndex": 2
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) What is the cost?",
        "B) Tell me the price.",
        "C) How much does this cost?",
        "D) Is this expensive?"
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Fill in the blank: 'Could you please _____ this item for me?' (regarding an exchange)",
      "questionHindi": "खाली स्थान भरें: 'क्या आप कृपया मेरे लिए इस वस्तु को _____ कर सकते हैं?' (बदलने के संदर्भ में)",
      "options": [
        "A) change",
        "B) return",
        "C) exchange",
        "D) take"
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Translate: 'मैं इसे वापस करना चाहता हूँ क्योंकि यह फिट नहीं है।'",
      "questionHindi": "मैं इसे वापस करना चाहता हूँ क्योंकि यह फिट नहीं है।",
      "options": [
        "A) I am returning this as it is not fit.",
        "B) Please take this back, no fit.",
        "C) I want to return this because it doesn't fit.",
        "D) It doesn't fit, take it back."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which phrase is used to ask for the payment counter?",
      "questionHindi": "भुगतान काउंटर के बारे में पूछने के लिए किस वाक्यांश का उपयोग किया जाता है?",
      "options": [
        "A) Where to pay?",
        "B) Give money where?",
        "C) Where is the billing counter?",
        "D) Counter is where?"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Is this item available?",
        "B) Do you have this item?",
        "C) Is this in stock?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 10,
      "question": "Translate: 'क्या आप मुझे यह दिखा सकते हैं?'",
      "questionHindi": "क्या आप मुझे यह दिखा सकते हैं?",
      "options": [
        "A) Show this to me.",
        "B) Can you show me this?",
        "C) May I see this?",
        "D) Do you show this?"
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Help me.",
        "B) Can you help me, please?",
        "C) I need help.",
        "D) You help me now."
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) return",
        "B) exchange",
        "C) buy",
        "D) keep"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Is card okay?",
        "B) Do you accept cards?",
        "C) Take card?",
        "D) Payment by card?"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Which option is best for asking about the material of a cloth?",
      "questionHindi": "कपड़े की सामग्री के बारे में पूछने के लिए कौन सा विकल्प सबसे अच्छा है?",
      "options": [
        "A) What is this made of?",
        "B) What material is this?",
        "C) Is this cotton?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Is there a warranty?",
        "B) Does it have a warranty?",
        "C) What is the warranty period?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Sale is here?",
        "B) Is there a sale going on here?",
        "C) Any sale today?",
        "D) Are you selling?"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I see that watch?",
        "B) Could I see that watch?",
        "C) Watch see I?",
        "D) Can watch see I?"
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "How do you ask for a bag for your items?",
      "questionHindi": "अपने सामान के लिए बैग कैसे मांगें?",
      "options": [
        "A) Give me a bag.",
        "B) Can I have a bag, please?",
        "C) Where is the bag?",
        "D) Need a bag."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) color",
        "B) style",
        "C) size",
        "D) All of the above"
      ],
      "correctIndex": 3
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I am liking this.",
        "B) I like this very much.",
        "C) Like this I.",
        "D) This is liked by me."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I am just browsing, thank you.",
        "B) I look.",
        "C) Looking only.",
        "D) I don't want anything."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Where is the fitting room?",
        "B) Fitting room where?",
        "C) Need fitting room.",
        "D) Is there a room?"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Do you have any other variety?",
        "B) Other variety here?",
        "C) More variety?",
        "D) Is there variety?"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) How much is the total?",
        "B) Total bill?",
        "C) How much to pay?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Translate: 'मैं यह लेना चाहूँगा।'",
      "questionHindi": "मैं यह लेना चाहूँगा।",
      "options": [
        "A) I would like to take this.",
        "B) I take this.",
        "C) Taking this.",
        "D) I will take this."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "How to ask if an item is on sale?",
      "questionHindi": "यह पूछने के लिए कि क्या कोई वस्तु सेल पर है, कैसे कहें?",
      "options": [
        "A) Is this on sale?",
        "B) Sale this?",
        "C) Is this discounted?",
        "D) Both A and C."
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Do you have any other options?",
        "B) Other options?",
        "C) Any more?",
        "D) Options available?"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Thank you, have a nice day.",
        "B) Bye.",
        "C) Done.",
        "D) Okay, thanks."
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Can I exchange this tomorrow?",
        "B) Exchange tomorrow?",
        "C) Change this tomorrow?",
        "D) Return this tomorrow?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which is the most natural way to ask for a receipt?",
      "questionHindi": "रसीद मांगने का सबसे स्वाभाविक तरीका कौन सा है?",
      "options": [
        "A) May I have the receipt, please?",
        "B) Give me receipt.",
        "C) Where is receipt?",
        "D) Receipt please."
      ],
      "correctIndex": 0
    }
  ],
  "25": [
    {
      "id": 1,
      "question": "How would you politely ask to reserve a table for four people?",
      "questionHindi": "आप चार लोगों के लिए टेबल रिजर्व करने के लिए विनम्रतापूर्वक कैसे पूछेंगे?",
      "options": [
        "A) I want a table for four.",
        "B) Give me a table for four.",
        "C) Reserve a table for four now.",
        "D) Can I reserve a table for four, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Choose the correct phrase to ask about vegetarian options on the menu.",
      "questionHindi": "मेन्यू में शाकाहारी विकल्पों के बारे में पूछने के लिए सही वाक्यांश चुनें।",
      "options": [
        "A) Is this food vegetarian?",
        "B) I only eat vegetarian food.",
        "C) Where is the vegetarian menu?",
        "D) Do you have any vegetarian options?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I take the menu card.",
        "B) Give me the menu card.",
        "C) Will I have the menu card?",
        "D) Could I have the menu card, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Which sentence is the most polite way to order a dish?",
      "questionHindi": "डिश ऑर्डर करने का सबसे विनम्र तरीका कौन सा है?",
      "options": [
        "A) I want the chicken curry.",
        "B) Order me a chicken curry.",
        "C) Give me the chicken curry.",
        "D) I would like to have the chicken curry, please."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) How much spice is in this?",
        "B) Do you put spice in this?",
        "C) Is this dish not spicy?",
        "D) Is this dish spicy?"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Fill in the blank: 'Could you please _____ the bill?'",
      "questionHindi": "रिक्त स्थान भरें: 'Could you please _____ the bill?'",
      "options": [
        "A) take",
        "B) give",
        "C) bring",
        "D) make"
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Translate: 'क्या इसमें मूंगफली है? मुझे एलर्जी है।'",
      "questionHindi": "Translate: 'क्या इसमें मूंगफली है? मुझे एलर्जी है।'",
      "options": [
        "A) Does this have peanuts? I have an allergy.",
        "B) Do you use peanuts? I have allergy.",
        "C) Is there peanut in this? I am allergic.",
        "D) Are peanuts in this? I am allergic."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "How do you inform the waiter that your order is missing an item?",
      "questionHindi": "आप वेटर को कैसे सूचित करेंगे कि आपके ऑर्डर में एक आइटम कम है?",
      "options": [
        "A) My order is wrong.",
        "B) You forgot my order.",
        "C) Excuse me, I think one item is missing from my order.",
        "D) Where is my food?"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I want the money now.",
        "B) How much is the food?",
        "C) Can I get the check, please?",
        "D) Where is the bill counter?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'क्या आप मुझे बता सकते हैं कि आज का स्पेशल क्या है?'",
      "questionHindi": "Translate: 'क्या आप मुझे बता सकते हैं कि आज का स्पेशल क्या है?'",
      "options": [
        "A) What is today special?",
        "B) Tell me the special today.",
        "C) Could you tell me what the special of the day is?",
        "D) Is today a special day?"
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) I am ready.",
        "B) No, I order now.",
        "C) Yes, I will have the pasta.",
        "D) Yes, I am ordering."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) like",
        "B) want",
        "C) need",
        "D) wish"
      ],
      "correctIndex": 0
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Can you make it less spicy?",
        "B) Make it not spicy.",
        "C) Is it possible to be less spicy?",
        "D) Can you reduce the spice?"
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Which question asks about ingredients in a dish?",
      "questionHindi": "कौन सा प्रश्न डिश में सामग्री (ingredients) के बारे में पूछता है?",
      "options": [
        "A) How is this cooked?",
        "B) Is this dish good?",
        "C) What ingredients are in this dish?",
        "D) Can I have the recipe?"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Give me the Wi-Fi password.",
        "B) What is the Wi-Fi password?",
        "C) Could you please tell me the Wi-Fi password?",
        "D) I need the Wi-Fi."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Do you take cards?",
        "B) Is card accepted here?",
        "C) Can I pay by card?",
        "D) Are cards accepted?"
      ],
      "correctIndex": 0
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) This food is cold.",
        "B) Excuse me, this dish is a bit cold. Could you heat it up?",
        "C) Your food is cold.",
        "D) I don't like cold food."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Which option is correct for asking about the waiting time?",
      "questionHindi": "वेटिंग टाइम के बारे में पूछने के लिए कौन सा विकल्प सही है?",
      "options": [
        "A) How long will it take?",
        "B) When will the food come?",
        "C) What is the time of food?",
        "D) How much wait?"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) I want to book a table.",
        "B) I would like to reserve a table.",
        "C) I am booking a table.",
        "D) Can I have a table?"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) keep",
        "B) have",
        "C) stay",
        "D) make"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) What do you recommend?",
        "B) Tell me the best food.",
        "C) What is your best dish?",
        "D) Give me something good."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) What is in this?",
        "B) Can you tell me what is in this?",
        "C) Is there something in this?",
        "D) Tell me the contents."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Is a table free?",
        "B) Is there a table available?",
        "C) Can I sit here?",
        "D) Is this table empty?"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I would like a coffee, please.",
        "B) I would have a coffee.",
        "C) Would I have a coffee?",
        "D) I would coffee like."
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Translate: 'क्या आप मुझे पानी का गिलास दे सकते हैं?'",
      "questionHindi": "Translate: 'क्या आप मुझे पानी का गिलास दे सकते हैं?'",
      "options": [
        "A) Can I get a glass of water?",
        "B) Could you give me a glass of water?",
        "C) Give me a glass of water.",
        "D) I want a glass of water."
      ],
      "correctIndex": 1
    },
    {
      "id": 26,
      "question": "Which is the most appropriate way to ask for the price of an item?",
      "questionHindi": "किसी आइटम की कीमत पूछने का सबसे उपयुक्त तरीका कौन सा है?",
      "options": [
        "A) How much is this?",
        "B) What is the cost?",
        "C) How much does it cost?",
        "D) All are correct."
      ],
      "correctIndex": 3
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) would",
        "B) will",
        "C) can",
        "D) could"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Do you have a kids menu?",
        "B) Is there a menu for children?",
        "C) Have you got a child menu?",
        "D) Do you serve kids food?"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) No, I don't want it.",
        "B) I'm fine, thank you.",
        "C) Stop asking me.",
        "D) No, not now."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Translate: 'यह खाना बहुत स्वादिष्ट था, धन्यवाद!'",
      "questionHindi": "Translate: 'यह खाना बहुत स्वादिष्ट था, धन्यवाद!'",
      "options": [
        "A) The food was very tasty, thanks!",
        "B) That food was delicious, thank you!",
        "C) The meal was good, thanks.",
        "D) Food was nice, thank you."
      ],
      "correctIndex": 1
    }
  ],
  "26": [
    {
      "id": 1,
      "question": "How do you politely ask for a window seat at the airport check-in counter?",
      "questionHindi": "एयरपोर्ट चेक-इन काउंटर पर आप विनम्रतापूर्वक विंडो सीट के लिए कैसे पूछेंगे?",
      "options": [
        "A) Give me a window seat.",
        "B) I want a window seat now.",
        "C) Could I please have a window seat?",
        "D) Window seat is required."
      ],
      "correctIndex": 2
    },
    {
      "id": 2,
      "question": "Which sentence is correct for asking about city transport from the airport?",
      "questionHindi": "एयरपोर्ट से शहर के परिवहन के बारे में पूछने के लिए कौन सा वाक्य सही है?",
      "options": [
        "A) Where is city center transport?",
        "B) What is the transport to city?",
        "C) How can I get to the city center?",
        "D) Why I go to city center?"
      ],
      "correctIndex": 2
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) My bag is finishing.",
        "B) I lost my bag somewhere.",
        "C) My luggage has not arrived.",
        "D) The bag is too late."
      ],
      "correctIndex": 2
    },
    {
      "id": 4,
      "question": "How do you ask the hotel receptionist about the Wi-Fi password?",
      "questionHindi": "होटल रिसेप्शनिस्ट से वाई-फाई पासवर्ड के बारे में आप कैसे पूछेंगे?",
      "options": [
        "A) Tell me the Wi-Fi code.",
        "B) I need internet access now.",
        "C) What is the Wi-Fi password?",
        "D) Where is the Wi-Fi?"
      ],
      "correctIndex": 2
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Take me to the hotel now.",
        "B) Is there a taxi nearby?",
        "C) Can I get a taxi to this address?",
        "D) I need a taxi to go home."
      ],
      "correctIndex": 2
    },
    {
      "id": 6,
      "question": "Which question correctly asks for directions to a tourist spot?",
      "questionHindi": "किसी पर्यटन स्थल के लिए रास्ता पूछने वाला सही प्रश्न कौन सा है?",
      "options": [
        "A) How do I go to the museum?",
        "B) Where is the museum located?",
        "C) Can you tell me the way to the museum?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Fill in the blank: 'Could you ______ me where the platform is?'",
      "questionHindi": "रिक्त स्थान भरें: 'क्या आप मुझे बता सकते हैं कि प्लेटफॉर्म कहाँ है?'",
      "options": [
        "A) say",
        "B) speak",
        "C) tell",
        "D) talk"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "How do you politely ask for an early check-in at a hotel?",
      "questionHindi": "होटल में जल्दी चेक-इन के लिए आप विनम्रतापूर्वक कैसे पूछेंगे?",
      "options": [
        "A) I want early check-in.",
        "B) Check me in now.",
        "C) Can I check in early, please?",
        "D) Why is my room not ready?"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) यात्रा टिकट",
        "B) विमान में चढ़ने का परमिट",
        "C) सामान का रसीद",
        "D) होटल का पास"
      ],
      "correctIndex": 1
    },
    {
      "id": 10,
      "question": "Which sentence is appropriate when asking for the bill at a restaurant?",
      "questionHindi": "रेस्तरां में बिल मांगते समय कौन सा वाक्य उचित है?",
      "options": [
        "A) Give me the bill.",
        "B) Can I have the bill, please?",
        "C) Where is the money?",
        "D) I want to pay now."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Do you serve breakfast?",
        "B) Is breakfast included in the rate?",
        "C) I want free breakfast.",
        "D) Breakfast is free, right?"
      ],
      "correctIndex": 1
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Give me a map.",
        "B) I need a map.",
        "C) Could I have a map, please?",
        "D) Where is the map?"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Where am I?",
        "B) Can you help me? I think I am lost.",
        "C) Help me find my way.",
        "D) Where is the police station?"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "What is the best way to ask about the train departure time?",
      "questionHindi": "ट्रेन के छूटने के समय के बारे में पूछने का सबसे अच्छा तरीका क्या है?",
      "options": [
        "A) When does the train leave?",
        "B) Tell me the train time.",
        "C) Why is the train late?",
        "D) Is the train coming?"
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) book",
        "B) take",
        "C) give",
        "D) make"
      ],
      "correctIndex": 0
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Are there buses here?",
        "B) Is there a bus service to the city?",
        "C) Where do I catch a bus?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) How much is the fare to the station?",
        "B) Give me a cheap ride.",
        "C) I will pay you later.",
        "D) Is the taxi expensive?"
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "What do you say when you reach the hotel for check-in?",
      "questionHindi": "चेक-इन के लिए होटल पहुँचने पर आप क्या कहेंगे?",
      "options": [
        "A) I have a reservation under the name...",
        "B) I want a room.",
        "C) Is the hotel open?",
        "D) Where is my room?"
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Would you help me with my bags?",
        "B) Would I go there?",
        "C) Would you be there?",
        "D) I would like a taxi."
      ],
      "correctIndex": 0
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I want no noise.",
        "B) Could I have a quiet room, please?",
        "C) Make the room quiet.",
        "D) Is this room noisy?"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) हवाई जहाज से उतरना",
        "B) टिकट दिखाना और सामान जमा करना",
        "C) सुरक्षा जांच करना",
        "D) सीट पर बैठना"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) How long is the flight?",
        "B) When is the flight?",
        "C) Why is the flight long?",
        "D) Where is the flight?"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Where is the nearest ATM?",
        "B) Can you show me an ATM?",
        "C) I need money, where is an ATM?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) keep",
        "B) take",
        "C) hold",
        "D) store"
      ],
      "correctIndex": 3
    },
    {
      "id": 25,
      "question": "Which is the most polite way to ask a stranger for directions?",
      "questionHindi": "किसी अजनबी से रास्ता पूछने का सबसे विनम्र तरीका क्या है?",
      "options": [
        "A) Excuse me, could you tell me the way to...",
        "B) Hey, where is...",
        "C) Tell me where to go.",
        "D) I need directions."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "How do you ask about the hotel checkout time?",
      "questionHindi": "होटल के चेकआउट समय के बारे में आप कैसे पूछेंगे?",
      "options": [
        "A) When do I have to leave?",
        "B) What is the checkout time?",
        "C) Can I stay longer?",
        "D) Is checkout at noon?"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) I want vegetarian food.",
        "B) Could I request a vegetarian meal?",
        "C) Give me a veg meal.",
        "D) Is the food vegetarian?"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Why is the flight delayed?",
        "B) Is the flight on time?",
        "C) How long is the delay?",
        "D) All of the above."
      ],
      "correctIndex": 3
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Can I have a receipt, please?",
        "B) Give me a bill.",
        "C) I need a paper.",
        "D) Where is the receipt?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Which phrase is used to ask for a place to sit at a crowded station?",
      "questionHindi": "भीड़भाड़ वाले स्टेशन पर बैठने की जगह के लिए कौन सा वाक्यांश इस्तेमाल होता है?",
      "options": [
        "A) Is this seat taken?",
        "B) Can I sit here?",
        "C) Is this seat free?",
        "D) All of the above."
      ],
      "correctIndex": 3
    }
  ],
  "27": [
    {
      "id": 1,
      "question": "How do you professionally answer an office phone call?",
      "questionHindi": "आप ऑफिस का फोन कॉल पेशेवर तरीके से कैसे उठाते हैं?",
      "options": [
        "A) Hello, who is this?",
        "B) Yeah, what do you want?",
        "C) Who are you calling?",
        "D) Good morning, ABC Company, how may I help you?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Translate: 'क्या मैं मिस्टर शर्मा से बात कर सकता हूँ?'",
      "questionHindi": "Translate: 'क्या मैं मिस्टर शर्मा से बात कर सकता हूँ?'",
      "options": [
        "A) Can I talk to Mr. Sharma?",
        "B) I want to talk to Mr. Sharma.",
        "C) Will Mr. Sharma talk to me?",
        "D) Could I speak to Mr. Sharma, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Wait here.",
        "B) Go away.",
        "C) Stop talking.",
        "D) Hold on a minute."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Fill in the blank: 'Could you please _______ your name?'",
      "questionHindi": "रिक्त स्थान भरें: 'क्या आप कृपया अपना नाम _______ सकते हैं?'",
      "options": [
        "A) say",
        "B) tell",
        "C) write",
        "D) spell"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Sorry, you dialed a wrong number.",
        "B) You called the wrong person.",
        "C) This is the wrong number.",
        "D) Sorry, I think you have the wrong number."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "What is the polite way to ask someone to repeat what they said?",
      "questionHindi": "किसी से यह कहने का विनम्र तरीका क्या है कि वे जो उन्होंने कहा उसे दोहराएं?",
      "options": [
        "A) What did you say?",
        "B) Speak louder.",
        "C) I didn't hear you.",
        "D) Could you please repeat that?"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How do you leave a message if the person is not available?",
      "questionHindi": "यदि व्यक्ति उपलब्ध नहीं है तो आप संदेश कैसे छोड़ते हैं?",
      "options": [
        "A) I will call again.",
        "B) Tell him to call me.",
        "C) Could you please take a message?",
        "D) Why is he not there?"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Translate: 'मैं बाद में कॉल करूँगा।'",
      "questionHindi": "Translate: 'मैं बाद में कॉल करूँगा।'",
      "options": [
        "A) I call later.",
        "B) I am calling later.",
        "C) I will call back later.",
        "D) I can call later."
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) I want to meet you now.",
        "B) Come to meet me.",
        "C) Can we schedule an appointment for tomorrow?",
        "D) You should meet me."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What do you say when the connection is bad?",
      "questionHindi": "जब कनेक्शन खराब हो तो आप क्या कहते हैं?",
      "options": [
        "A) Your phone is bad.",
        "B) Stop talking.",
        "C) I can't hear you clearly.",
        "D) I am hanging up."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) Will you call me back?",
        "B) Why don't you call back?",
        "C) Can you tell him to call me back?",
        "D) Please call back."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) in",
        "B) at",
        "C) on",
        "D) to"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Bye.",
        "B) I'm done.",
        "C) Talk to you later, thank you.",
        "D) See you."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Translate: 'मैं आपकी कैसे सहायता कर सकता हूँ?'",
      "questionHindi": "Translate: 'मैं आपकी कैसे सहायता कर सकता हूँ?'",
      "options": [
        "A) What do you want?",
        "B) Can I help?",
        "C) How can I help you?",
        "D) How are you helping?"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Cut the call.",
        "B) Wait on the phone.",
        "C) Speak loudly.",
        "D) Disconnect the call."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) ask",
        "B) tell",
        "C) say",
        "D) speak"
      ],
      "correctIndex": 0
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Can you talk to Mr. Gupta?",
        "B) Could you please put me through to Mr. Gupta?",
        "C) Tell Mr. Gupta to talk.",
        "D) I want to speak to Mr. Gupta."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "How do you ask someone to call back later?",
      "questionHindi": "आप किसी से बाद में कॉल करने के लिए कैसे कहते हैं?",
      "options": [
        "A) Don't call me now.",
        "B) Please call back later.",
        "C) Call me later.",
        "D) You call me again."
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) He is not here.",
        "B) He is currently unavailable.",
        "C) He is doing work.",
        "D) He cannot talk."
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Sorry, speak slowly.",
        "B) Could you please speak a bit slower?",
        "C) Slow down your voice.",
        "D) Can you speak quiet?"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Let me repeat that to be sure.",
        "B) I heard you.",
        "C) Okay, I know.",
        "D) Whatever."
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) make",
        "B) do",
        "C) take",
        "D) give"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) What is your name?",
        "B) May I have your name, please?",
        "C) Tell me your name.",
        "D) Who are you?"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Call me back.",
        "B) Could you please ask him to call me back?",
        "C) Tell him to call.",
        "D) I need a call back."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "What is the correct response to 'Thank you for your help'?",
      "questionHindi": "'Thank you for your help' का सही उत्तर क्या है?",
      "options": [
        "A) You're welcome.",
        "B) No problem.",
        "C) It's okay.",
        "D) Whatever."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Translate: 'मैं मिस्टर खन्ना की ओर से बोल रहा हूँ।'",
      "questionHindi": "Translate: 'मैं मिस्टर खन्ना की ओर से बोल रहा हूँ।'",
      "options": [
        "A) I am speaking for Mr. Khanna.",
        "B) I am calling on behalf of Mr. Khanna.",
        "C) Mr. Khanna is calling.",
        "D) I speak as Mr. Khanna."
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) This is Amit speaking.",
        "B) I am Amit.",
        "C) My name is Amit.",
        "D) It's Amit."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) pass",
        "B) give",
        "C) take",
        "D) bring"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Are you free now?",
        "B) Are you busy?",
        "C) Can you talk?",
        "D) Are you empty?"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "What do you say when you have reached the wrong number?",
      "questionHindi": "जब आप गलत नंबर पर पहुँच जाते हैं तो आप क्या कहते हैं?",
      "options": [
        "A) Oh, sorry, I have the wrong number.",
        "B) Who is this?",
        "C) You gave me the wrong number.",
        "D) Hang up."
      ],
      "correctIndex": 0
    }
  ],
  "28": [
    {
      "id": 1,
      "question": "How do you introduce yourself when the interviewer says, 'Tell me about yourself'?",
      "questionHindi": "जब इंटरव्यू लेने वाला कहता है 'अपने बारे में बताएं', तो आप अपना परिचय कैसे देते हैं?",
      "options": [
        "A) I am a person who likes to eat food.",
        "B) My name is John and I live in Delhi.",
        "C) I don't know what to say.",
        "D) I have completed my degree and have a passion for marketing."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which sentence correctly uses mixed tenses to describe your experience?",
      "questionHindi": "अपने अनुभव का वर्णन करने के लिए कौन सा वाक्य मिश्रित काल (mixed tenses) का सही उपयोग करता है?",
      "options": [
        "A) I work here for two years and I will leave soon.",
        "B) I worked here and I will work here.",
        "C) I am work here for two years.",
        "D) I have been working here for two years and I am learning a lot."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I am very lazy.",
        "B) I don't have any weaknesses.",
        "C) I am bad at everything.",
        "D) I sometimes struggle with public speaking, so I have joined a club to improve."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Translate: 'मेरी सबसे बड़ी ताकत मेरी समस्या सुलझाने की क्षमता है।'",
      "questionHindi": "मेरी सबसे बड़ी ताकत मेरी समस्या सुलझाने की क्षमता है।",
      "options": [
        "A) I have a big strength in solving problems.",
        "B) My strength is that I solve problems.",
        "C) I am strong at solving problems.",
        "D) My biggest strength is my problem-solving ability."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I want a lot of money.",
        "B) I will quit after one year.",
        "C) I don't have any goals.",
        "D) I hope to contribute to your company while growing my skills."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Complete the sentence: 'I ________ a challenging situation at college when I had to lead a team.'",
      "questionHindi": "वाक्य पूरा करें: 'I ________ a challenging situation at college when I had to lead a team.'",
      "options": [
        "A) am face",
        "B) will face",
        "C) am facing",
        "D) faced"
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "How would you ask about the salary expectations professionally?",
      "questionHindi": "आप वेतन की उम्मीदों के बारे में पेशेवर तरीके से कैसे पूछेंगे?",
      "options": [
        "A) How much will you pay me?",
        "B) Can you tell me the salary?",
        "C) Could you please clarify the salary range for this position?",
        "D) I want a high salary."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Translate: 'क्या आप मुझे बता सकते हैं कि इस भूमिका में आपकी क्या अपेक्षाएं हैं?'",
      "questionHindi": "क्या आप मुझे बता सकते हैं कि इस भूमिका में आपकी क्या अपेक्षाएं हैं?",
      "options": [
        "A) Do you expect from me in this role?",
        "B) What is your expectation?",
        "C) Can you tell me what are your expectations in this role?",
        "D) Tell me your expectations."
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) might",
        "B) shall",
        "C) would",
        "D) could"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "What is the best way to close an interview?",
      "questionHindi": "इंटरव्यू खत्म करने का सबसे अच्छा तरीका क्या है?",
      "options": [
        "A) Okay, bye.",
        "B) When will I get the money?",
        "C) Thank you for your time; I look forward to hearing from you.",
        "D) I am going now."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) completing",
        "B) complete",
        "C) completed",
        "D) completes"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I want to improve my skills.",
        "B) I am waiting to improve skills.",
        "C) I am eager to improve my skills further.",
        "D) I will improve my skills."
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) I was a student and I am a student.",
        "B) I work on projects.",
        "C) I worked on a project last year, and now I am applying those skills.",
        "D) I will work on projects."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Choose the professional word for 'काम करने का अनुभव'.",
      "questionHindi": "'काम करने का अनुभव' के लिए पेशेवर शब्द चुनें।",
      "options": [
        "A) Job work",
        "B) Doing work",
        "C) Work experience",
        "D) Job life"
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I am good at team work.",
        "B) My key strength is my ability to work well in a team.",
        "C) I like working with a team.",
        "D) Team work is my strength."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) What do you want to do?",
        "B) Where do you see yourself in five years?",
        "C) Are you rich?",
        "D) Do you like this job?"
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) I was solving a hard situation.",
        "B) I solved a tough situation smartly.",
        "C) I will solve a tough situation.",
        "D) I am solving a situation."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Fill in the blank: 'I am ________ to join a company that values innovation.'",
      "questionHindi": "खाली स्थान भरें: 'I am ________ to join a company that values innovation.'",
      "options": [
        "A) exciting",
        "B) excited",
        "C) excite",
        "D) excitement"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) I wait for instructions.",
        "B) I take initiative to solve problems.",
        "C) I do only what I am told.",
        "D) I don't like to work."
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Do you have any questions for me?",
        "B) Have you questions for me?",
        "C) Are there questions for me?",
        "D) Will you ask me?"
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) manage",
        "B) managed",
        "C) am managing",
        "D) will manage"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Talk about a real skill gap and how you are fixing it.",
        "B) Say you have no weaknesses.",
        "C) Tell them you are a perfectionist.",
        "D) Blame others for your mistakes."
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Hey, what's up?",
        "B) Good morning, thank you for having me today.",
        "C) Hi there.",
        "D) Yo, how are you?"
      ],
      "correctIndex": 1
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I am thankful for this opportunity.",
        "B) I am happy for this chance.",
        "C) I like this opportunity.",
        "D) This is a good opportunity."
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Fill in the blank: 'I ________ my skills by attending regular workshops.'",
      "questionHindi": "खाली स्थान भरें: 'I ________ my skills by attending regular workshops.'",
      "options": [
        "A) am enhancing",
        "B) enhanced",
        "C) will enhance",
        "D) enhances"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Which tense is used to talk about your current role?",
      "questionHindi": "आपकी वर्तमान भूमिका के बारे में बात करने के लिए किस काल का उपयोग किया जाता है?",
      "options": [
        "A) Past simple",
        "B) Present simple or continuous",
        "C) Future perfect",
        "D) Past perfect"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) I am always ready to learn new things.",
        "B) I like learning.",
        "C) I will learn new things.",
        "D) I am learning."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Collaborative",
        "B) Individualistic",
        "C) Aggressive",
        "D) Passive"
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I am very interested in working with this company.",
        "B) I like working here.",
        "C) I want to work with you.",
        "D) I am interested in the company."
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Complete the sentence: 'Could you ________ tell me more about the team culture?'",
      "questionHindi": "वाक्य पूरा करें: 'Could you ________ tell me more about the team culture?'",
      "options": [
        "A) please",
        "B) kindly",
        "C) maybe",
        "D) also"
      ],
      "correctIndex": 0
    }
  ],
  "29": [
    {
      "id": 1,
      "question": "Choose the best translation for: 'क्या हम कल सुबह की बैठक को फिर से शेड्यूल कर सकते हैं?'",
      "questionHindi": "इस वाक्य का सबसे अच्छा अनुवाद चुनें: 'क्या हम कल सुबह की बैठक को फिर से शेड्यूल कर सकते हैं?'",
      "options": [
        "A) Will we rescheduling tomorrow morning meeting?",
        "B) Can we schedule again tomorrow morning meetings?",
        "C) Do we reschedule tomorrow morning's meeting?",
        "D) Can we reschedule tomorrow morning's meeting?"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which phrase is most professional for giving a project update?",
      "questionHindi": "प्रोजेक्ट अपडेट देने के लिए कौन सा वाक्यांश सबसे अधिक पेशेवर है?",
      "options": [
        "A) I am doing the work now.",
        "B) I finished some things but not all things yet.",
        "C) Everything is okay with the project.",
        "D) The project is currently on track and meeting all milestones."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I am agree to your propose, but we must thinking about budget.",
        "B) I agree with your proposal, but we needing to consider budget.",
        "C) I agreed with your proposal, but we need considering the budget.",
        "D) I agree with your proposal, but we need to consider the budget."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "Complete the sentence: 'Could you please _______ me the latest report by EOD?'",
      "questionHindi": "वाक्य पूरा करें: 'क्या आप कृपया मुझे ईओडी (दिन के अंत) तक नवीनतम रिपोर्ट _______ कर सकते हैं?'",
      "options": [
        "A) forwarding",
        "B) forwards",
        "C) forwarded",
        "D) forward"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) Your idea is wrong.",
        "B) I don't like what you said.",
        "C) I disagree because I am right.",
        "D) I see your point, however, I have a different perspective."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'हमें इस प्रोजेक्ट को शुक्रवार तक पूरा करना होगा।'",
      "questionHindi": "अनुवाद करें: 'हमें इस प्रोजेक्ट को शुक्रवार तक पूरा करना होगा।'",
      "options": [
        "A) We should finished this project by Friday.",
        "B) We are complete this project until Friday.",
        "C) We must complete this project by Friday.",
        "D) We have to completing this project by Friday."
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Which WH-question is correct for asking about a deadline?",
      "questionHindi": "समय सीमा (deadline) के बारे में पूछने के लिए कौन सा WH-प्रश्न सही है?",
      "options": [
        "A) Who is the deadline for this task?",
        "B) Where is the deadline for this task?",
        "C) When is the deadline for this task?",
        "D) Why is the deadline for this task?"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Choose the correct professional closing for an email.",
      "questionHindi": "ईमेल के लिए सही पेशेवर समापन (closing) चुनें।",
      "options": [
        "A) Bye bye,",
        "B) Thanks for everything,",
        "C) See you soon,",
        "D) Best regards,"
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Can you helping me with this task?",
        "B) Will you assisted me in this task?",
        "C) Could you please assist me with this task?",
        "D) Do you assist me with this task?"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "How do you respond professionally to constructive feedback?",
      "questionHindi": "आप रचनात्मक फीडबैक (constructive feedback) पर पेशेवर रूप से कैसे प्रतिक्रिया देते हैं?",
      "options": [
        "A) I will try to do better next time.",
        "B) Thank you for the feedback; I will work on these areas.",
        "C) It was not my fault.",
        "D) I don't agree with your feedback."
      ],
      "correctIndex": 1
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) looking",
        "B) look",
        "C) looked",
        "D) looks"
      ],
      "correctIndex": 0
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) I am in a call now, can I call you later?",
        "B) I am on a call right now; may I call you back later?",
        "C) I was on a call, can I call you back?",
        "D) I am on call now, will I call you later?"
      ],
      "correctIndex": 1
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Must",
        "B) Would",
        "C) Should",
        "D) Will"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Translate: 'प्रस्तुति (presentation) दोपहर 2 बजे शुरू होगी।'",
      "questionHindi": "अनुवाद करें: 'प्रस्तुति (presentation) दोपहर 2 बजे शुरू होगी।'",
      "options": [
        "A) The presentation will start at 2 PM.",
        "B) The presentation starts on 2 PM.",
        "C) The presentation shall starting at 2 PM.",
        "D) The presentation will starting at 2 PM."
      ],
      "correctIndex": 0
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I don't understand.",
        "B) What did you say?",
        "C) Could you please clarify what you meant by that?",
        "D) Say it again."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) We need to focus on teamwork.",
        "B) We needing to focus on teamwork.",
        "C) We needs to focusing on teamwork.",
        "D) We need focusing on teamwork."
      ],
      "correctIndex": 0
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) inform",
        "B) informed",
        "C) informing",
        "D) informs"
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Translate: 'क्या आप मुझे इस ईमेल का जवाब देने में मदद कर सकते हैं?'",
      "questionHindi": "अनुवाद करें: 'क्या आप मुझे इस ईमेल का जवाब देने में मदद कर सकते हैं?'",
      "options": [
        "A) Can you help me for replying this email?",
        "B) Could you help me in reply this email?",
        "C) Could you help me respond to this email?",
        "D) Will you help me responding this email?"
      ],
      "correctIndex": 2
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) Late",
        "B) Punctual",
        "C) Slow",
        "D) Quick"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I am responsible for this project.",
        "B) I am responsibility for this project.",
        "C) I have responsible for this project.",
        "D) I am responsible of this project."
      ],
      "correctIndex": 0
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) schedule",
        "B) scheduling",
        "C) scheduled",
        "D) schedules"
      ],
      "correctIndex": 0
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Sorry for late.",
        "B) I am sorry for the delay.",
        "C) Apologize for delay.",
        "D) Sorry for delaying."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Listen to my idea.",
        "B) I want to say something.",
        "C) I would like to propose an idea.",
        "D) My idea is the best."
      ],
      "correctIndex": 2
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) Please keeping me updated.",
        "B) Please keep me updated.",
        "C) Please keep me update.",
        "D) Please kept me updated."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Choose the correct sentence for delegating a task.",
      "questionHindi": "किसी कार्य को सौंपने (delegate) के लिए सही वाक्य चुनें।",
      "options": [
        "A) You do this work now.",
        "B) I am giving you this work.",
        "C) I would like you to take the lead on this task.",
        "D) Take this work and finish it."
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Translate: 'क्या आप इस बिंदु को फिर से समझा सकते हैं?'",
      "questionHindi": "अनुवाद करें: 'क्या आप इस बिंदु को फिर से समझा सकते हैं?'",
      "options": [
        "A) Can you explain this point again?",
        "B) Could you please explain this point again?",
        "C) Will you explaining this point again?",
        "D) Do you explain this point again?"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) meet",
        "B) meeting",
        "C) met",
        "D) meets"
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) He is a very good team player.",
        "B) He is very good teams player.",
        "C) He was a very good team player.",
        "D) He is a goodly team player."
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I am starting now.",
        "B) Look at the screen.",
        "C) Thank you all for coming; today I will discuss...",
        "D) Hello, I am here."
      ],
      "correctIndex": 2
    },
    {
      "id": 30,
      "question": "Translate: 'मैं इस बारे में सोचूंगा और आपको बताऊंगा।'",
      "questionHindi": "अनुवाद करें: 'मैं इस बारे में सोचूंगा और आपको बताऊंगा।'",
      "options": [
        "A) I will think about it and let you know.",
        "B) I am thinking about it and tell you.",
        "C) I will thought about it and let you know.",
        "D) I think about it and will tell you."
      ],
      "correctIndex": 0
    }
  ],
  "30": [
    {
      "id": 1,
      "question": "How do you introduce yourself to a new client at a networking event?",
      "questionHindi": "नेटवर्किंग इवेंट में आप एक नए क्लाइंट को अपना परिचय कैसे देते हैं?",
      "options": [
        "A) Hi, I am Rahul. Nice to meet you.",
        "B) Give me your card.",
        "C) Where do you work?",
        "D) Who are you?"
      ],
      "correctIndex": 0
    },
    {
      "id": 2,
      "question": "Which phrase is best to initiate small talk in a professional conversation?",
      "questionHindi": "व्यावसायिक बातचीत (conversation) में अनौपचारिक बातचीत शुरू करने के लिए कौन सा वाक्यांश सबसे अच्छा है?",
      "options": [
        "A) How are you enjoying the event so far?",
        "B) I am bored here.",
        "C) Why are you here?",
        "D) What is your salary?"
      ],
      "correctIndex": 0
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) I have been working in this industry for five years.",
        "B) I am working here five years.",
        "C) I worked here for five years.",
        "D) I work in this industry for five years."
      ],
      "correctIndex": 0
    },
    {
      "id": 4,
      "question": "Which question helps you understand a client's business challenges?",
      "questionHindi": "क्लाइंट की व्यावसायिक चुनौतियों को समझने के लिए कौन सा प्रश्न सहायक है?",
      "options": [
        "A) What are your biggest priorities this year?",
        "B) Do you like coffee?",
        "C) How much money do you have?",
        "D) Are you tired?"
      ],
      "correctIndex": 0
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) complete",
        "B) have completed",
        "C) am completing",
        "D) completed"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "How do you articulate your unique value proposition clearly?",
      "questionHindi": "आप अपने अद्वितीय मूल्य प्रस्ताव (value proposition) को स्पष्ट रूप से कैसे व्यक्त करते हैं?",
      "options": [
        "A) I am good at many things.",
        "B) I think I am the best.",
        "C) Just hire me.",
        "D) I help companies streamline operations to increase efficiency by 20%."
      ],
      "correctIndex": 3
    },
    {
      "id": 7,
      "question": "Translate: 'Could you please clarify what you mean by these requirements?'",
      "questionHindi": "स्पष्टीकरण मांगने का अनुवाद करें: 'क्या आप कृपया स्पष्ट कर सकते हैं (clarify what you mean)?'",
      "options": [
        "A) Tell me what you want.",
        "B) Why do you need this?",
        "C) Give me your requirements.",
        "D) Could you please tell me more about your requirements?"
      ],
      "correctIndex": 3
    },
    {
      "id": 8,
      "question": "Which sentence correctly uses future tense for a follow-up meeting?",
      "questionHindi": "फॉलो-अप मीटिंग के लिए भविष्य काल (future tense) का सही उपयोग करने वाला वाक्य कौन सा है?",
      "options": [
        "A) I am meeting you tomorrow.",
        "B) I sent an email yesterday.",
        "C) I meet you tomorrow.",
        "D) I will send you an email tomorrow to schedule our next chat."
      ],
      "correctIndex": 3
    },
    {
      "id": 9,
      "question": "Choose the correct phrase to repair a misunderstanding in a conversation:",
      "questionHindi": "बातचीत में गलतफहमी को सुधारने (conversational repair) के लिए सही वाक्यांश चुनें:",
      "options": [
        "A) Anyway, let's talk business.",
        "B) Stop talking about the weather.",
        "C) What is your budget?",
        "D) I'd love to hear more about how your company approaches these challenges."
      ],
      "correctIndex": 3
    },
    {
      "id": 10,
      "question": "Translate: 'It was a pleasure meeting you today.'",
      "questionHindi": "'आज आपसे मिलकर खुशी हुई।' का अनुवाद करें।",
      "options": [
        "A) Nice to meet you today.",
        "B) I met you today.",
        "C) Meeting you is good.",
        "D) It was a pleasure meeting you today."
      ],
      "correctIndex": 3
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) achieve",
        "B) achieved",
        "C) are achieving",
        "D) will achieve"
      ],
      "correctIndex": 3
    },
    {
      "id": 12,
      "question": "Which polite phrase is used to say 'pardon' when you didn't hear someone clearly in a conversation?",
      "questionHindi": "बातचीत में दोबारा सुनने के लिए 'Pardon' (माफ कीजिए) कहने का विनम्र तरीका कौन सा है?",
      "options": [
        "A) Give me your number.",
        "B) What is your number?",
        "C) Write your number here.",
        "D) Could I have your contact details, please?"
      ],
      "correctIndex": 3
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) What is your goal now?",
        "B) Do you have goals?",
        "C) What are your main goals for this quarter?",
        "D) Tell me your goals."
      ],
      "correctIndex": 2
    },
    {
      "id": 14,
      "question": "Which sentence shows a past experience related to work?",
      "questionHindi": "कौन सा वाक्य काम से संबंधित पिछले अनुभव को दर्शाता है?",
      "options": [
        "A) I am working on a new project.",
        "B) I will lead a team.",
        "C) I led a team of ten developers last year.",
        "D) I like my team."
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I know, it was great.",
        "B) It was easy.",
        "C) Thank you, I appreciate that.",
        "D) Whatever."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) come",
        "B) am coming",
        "C) came",
        "D) was come"
      ],
      "correctIndex": 2
    },
    {
      "id": 17,
      "question": "Which phrase is used to clarify an understanding during a business conversation?",
      "questionHindi": "व्यावसायिक बातचीत में समझ को स्पष्ट करने (clarify) के लिए किस वाक्यांश का उपयोग किया जाता है?",
      "options": [
        "A) So, what you're saying is...",
        "B) You are wrong.",
        "C) I don't understand.",
        "D) Tell me again."
      ],
      "correctIndex": 0
    },
    {
      "id": 18,
      "question": "Translate: 'I am looking forward to our collaboration.'",
      "questionHindi": "'मैं हमारे सहयोग के लिए उत्सुक हूँ।' का अनुवाद करें।",
      "options": [
        "A) I wait for our work.",
        "B) I want to work with you.",
        "C) I am looking forward to our collaboration.",
        "D) Looking forward to work."
      ],
      "correctIndex": 2
    },
    {
      "id": 19,
      "question": "Which option is an effective conversational repair phrase: 'What I actually mean is...'?",
      "questionHindi": "अपनी बात को स्पष्ट करने और सुधारने (conversational repair) के लिए कौन सा विकल्प सही है?",
      "options": [
        "A) Bye.",
        "B) I have to go now.",
        "C) It was great connecting with you. Let's stay in touch.",
        "D) See you later."
      ],
      "correctIndex": 2
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) provide",
        "B) provides",
        "C) is provide",
        "D) providing"
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) Did you face challenges?",
        "B) Have you faced any challenges recently?",
        "C) Are you facing challenges?",
        "D) What challenges do you have?"
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Which sentence expresses polite agreement in a professional discussion: 'I completely agree with you.'?",
      "questionHindi": "व्यावसायिक चर्चा में विनम्र सहमति (polite agreement) व्यक्त करने वाला वाक्य कौन सा है?",
      "options": [
        "A) I have been finish the task.",
        "B) I have finished the task.",
        "C) I has finished the task.",
        "D) I finish the task already."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "Which question asks a speaker to clarify what they mean: 'What do you mean by that?'?",
      "questionHindi": "वक्ता से अर्थ स्पष्ट करने (clarify what they mean) के लिए कौन सा प्रश्न सही है?",
      "options": [
        "A) What do you think about our new strategy?",
        "B) Is the strategy good?",
        "C) Why this strategy?",
        "D) Who made this strategy?"
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) My specialty is digital marketing.",
        "B) I specialize in digital marketing.",
        "C) I work in digital marketing.",
        "D) Digital marketing is my work."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "How do you politely disagree in a business conversation: 'I see your point, but I respectfully disagree.'?",
      "questionHindi": "बातचीत में विनम्रता से असहमति (respectfully disagree) व्यक्त करने का सही तरीका कौन सा है?",
      "options": [
        "A) have",
        "B) had",
        "C) will have",
        "D) has"
      ],
      "correctIndex": 2
    },
    {
      "id": 26,
      "question": "Which sentence expresses a future goal?",
      "questionHindi": "कौन सा वाक्य भविष्य के लक्ष्य को व्यक्त करता है?",
      "options": [
        "A) I wanted to expand my business.",
        "B) I am expanding my business.",
        "C) I plan to expand my business globally by next year.",
        "D) I expanded my business."
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) What do you do there?",
        "B) What is your role at the company?",
        "C) Why do you work there?",
        "D) Are you a boss?"
      ],
      "correctIndex": 1
    },
    {
      "id": 28,
      "question": "Which phrase is used to smoothly continue a conversation and clarify details: 'Let me clarify further.'?",
      "questionHindi": "बातचीत जारी रखने और विवरण स्पष्ट करने (clarify details) के लिए कौन सा वाक्यांश उपयुक्त है?",
      "options": [
        "A) Ask me if you have questions.",
        "B) Let me know if you have any questions.",
        "C) Tell me your questions.",
        "D) Do you have questions?"
      ],
      "correctIndex": 1
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) Hey, what's up?",
        "B) It was a pleasure meeting you at the event.",
        "C) Yo, remember me?",
        "D) See you."
      ],
      "correctIndex": 1
    },
    {
      "id": 30,
      "question": "Fill in the blank: 'She ______ for the position for three months.'",
      "questionHindi": "रिक्त स्थान भरें: 'वह तीन महीने से इस पद के लिए ______।'",
      "options": [
        "A) prepared",
        "B) has been preparing",
        "C) is preparing",
        "D) prepares"
      ],
      "correctIndex": 1
    }
  ],
  "31": [
    {
      "id": 1,
      "question": "If someone asks for your opinion and you want to be polite but honest, what is the best opening phrase?",
      "questionHindi": "अगर कोई आपसे आपकी राय पूछे और आप विनम्र लेकिन ईमानदार होना चाहते हैं, तो सबसे अच्छा शुरुआती वाक्यांश क्या है?",
      "options": [
        "A) Actually, I hate it.",
        "B) You are wrong.",
        "C) I don't care.",
        "D) To be honest, I think it could be better."
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which phrase is a natural way to buy time while thinking of an answer?",
      "questionHindi": "जवाब सोचने के दौरान समय लेने का एक स्वाभाविक तरीका कौन सा वाक्यांश है?",
      "options": [
        "A) Let me think about it.",
        "B) I don't know.",
        "C) Wait for a second.",
        "D) That's a good question, let me see."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "While I ________ dinner, the phone rang.",
      "questionHindi": "वाक्य पूरा करें: 'जब मैं रात का खाना बना रहा था (was cooking), फोन बजा।'",
      "options": [
        "A) Actually, I didn't like the movie.",
        "B) Frankly, the movie was bad.",
        "C) In fact, the movie was boring.",
        "D) To be honest, I wasn't that impressed by the movie."
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "How would you soften the direct statement 'I disagree' in a professional meeting?",
      "questionHindi": "पेशेवर मीटिंग में 'I disagree' (मैं असहमत हूँ) जैसे सीधे बयान को आप अधिक विनम्र कैसे बनाएंगे?",
      "options": [
        "A) You are completely wrong.",
        "B) No, that is not true.",
        "C) I don't agree with you at all.",
        "D) I see your point, but I have a different perspective."
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Choose the correct option: 'My brother ________ (play) video games when I entered the room.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं कमरे में आया, मेरा भाई वीडियो गेम खेल रहा था (was playing)।'",
      "options": [
        "A) I suppose that is okay.",
        "B) I guess so.",
        "C) Sure, whatever.",
        "D) Yeah, that sounds like a great idea!"
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Which phrase is best used to add information that contradicts a previous assumption?",
      "questionHindi": "पिछली धारणा के विपरीत जानकारी जोड़ने के लिए कौन सा वाक्यांश सबसे अच्छा है?",
      "options": [
        "A) I think it is fine.",
        "B) To be fair, it is okay.",
        "C) As a matter of fact, I actually enjoyed it.",
        "D) For instance, I liked it."
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Translate: 'क्या आप मुझे थोड़ा और विस्तार से बता सकते हैं?' (Polite request)",
      "questionHindi": "क्या आप मुझे थोड़ा और विस्तार से बता सकते हैं?",
      "options": [
        "A) Tell me more about it.",
        "B) Why are you saying that?",
        "C) Could you elaborate on that a bit?",
        "D) Give me more details."
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Which filler is often used to start a sentence when you are about to share a surprising fact?",
      "questionHindi": "जब आप कोई आश्चर्यजनक तथ्य साझा करने वाले हों, तो वाक्य शुरू करने के लिए किस 'फिलर' का उपयोग किया जाता है?",
      "options": [
        "A) Basically,",
        "B) So,",
        "C) Actually,",
        "D) Well,"
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) Oh, okay.",
        "B) I don't care.",
        "C) That sounds really tough, I'm sorry to hear that.",
        "D) That's life."
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Fill in the blank: 'I was going to go to the gym, but ________, I stayed home to rest.'",
      "questionHindi": "खाली स्थान भरें: 'मैं जिम जाने वाला था, लेकिन ________, मैं आराम करने के लिए घर पर ही रहा।'",
      "options": [
        "A) as a matter of fact",
        "B) to be honest",
        "C) to be fair",
        "D) in other words"
      ],
      "correctIndex": 0
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) You made a mistake.",
        "B) You are wrong about this.",
        "C) I think there might be a slight misunderstanding here.",
        "D) This is completely incorrect."
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) By the way, what happened with the meeting yesterday?",
        "B) Actually, what about the meeting?",
        "C) To be honest, what was the meeting?",
        "D) In fact, did the meeting happen?"
      ],
      "correctIndex": 0
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Basically, what I'm saying is...",
        "B) To be fair...",
        "C) As a matter of fact...",
        "D) Actually..."
      ],
      "correctIndex": 0
    },
    {
      "id": 14,
      "question": "Choose the most natural way to ask for a favor.",
      "questionHindi": "मदद मांगने का सबसे स्वाभाविक तरीका चुनें।",
      "options": [
        "A) Do this for me.",
        "B) Help me now.",
        "C) Would you mind helping me with this?",
        "D) I need you to do this."
      ],
      "correctIndex": 2
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) I totally disagree.",
        "B) That's not right.",
        "C) I see your point, but have you considered...?",
        "D) You are wrong."
      ],
      "correctIndex": 2
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) Actually, we have no time.",
        "B) The thing is, we're really short on time.",
        "C) To be honest, time is less.",
        "D) Basically, time is over."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) You are welcome.",
        "B) No worries, happy to help!",
        "C) It was nothing.",
        "D) Don't mention it."
      ],
      "correctIndex": 1
    },
    {
      "id": 18,
      "question": "Which expression is used to acknowledge that you understand someone's feeling?",
      "questionHindi": "किसी की भावना को समझने के लिए किस अभिव्यक्ति का उपयोग किया जाता है?",
      "options": [
        "A) I know what you mean.",
        "B) You are right.",
        "C) Okay.",
        "D) I agree."
      ],
      "correctIndex": 0
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) to be fair",
        "B) to be honest",
        "C) as a matter of fact",
        "D) basically"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) Speak slowly.",
        "B) Could you please speak a bit slower?",
        "C) You are too fast.",
        "D) Slow down your talking."
      ],
      "correctIndex": 1
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) I am hanging up now.",
        "B) It was great catching up with you!",
        "C) Bye.",
        "D) Talk later."
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) I don't know.",
        "B) I'm not entirely sure, but I think...",
        "C) Maybe.",
        "D) I doubt it."
      ],
      "correctIndex": 1
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) Anyway, speaking of that...",
        "B) Stop talking about this.",
        "C) Change the topic.",
        "D) Let's talk about something else."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) I don't know much about this, but I feel...",
        "B) I'm not an expert, but my take is...",
        "C) I have no idea.",
        "D) I'm not sure, but it is."
      ],
      "correctIndex": 1
    },
    {
      "id": 25,
      "question": "Which filler helps to soften a direct 'No'?",
      "questionHindi": "सीधे 'No' (ना) को नरम बनाने में कौन सा फिलर मदद करता है?",
      "options": [
        "A) Actually, I'd love to, but...",
        "B) No.",
        "C) I can't.",
        "D) Not today."
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "What is a natural way to ask if someone is busy?",
      "questionHindi": "यह पूछने का स्वाभाविक तरीका क्या है कि क्या कोई व्यस्त है?",
      "options": [
        "A) Are you busy?",
        "B) Are you doing something?",
        "C) Is now a good time to talk?",
        "D) Why are you busy?"
      ],
      "correctIndex": 2
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) That's a fair point.",
        "B) I don't think so.",
        "C) You are wrong.",
        "D) Whatever you say."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) I thought it was a great idea.",
        "B) It was a good idea.",
        "C) I liked the idea.",
        "D) I think so."
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) I see.",
        "B) Yeah.",
        "C) Go on.",
        "D) I'm with you so far."
      ],
      "correctIndex": 3
    },
    {
      "id": 30,
      "question": "What is a polite way to interrupt someone?",
      "questionHindi": "किसी को बीच में टोकने का विनम्र तरीका क्या है?",
      "options": [
        "A) Stop talking.",
        "B) Sorry to interrupt, but...",
        "C) Wait.",
        "D) Let me speak."
      ],
      "correctIndex": 1
    }
  ],
  "32": [
    {
      "id": 1,
      "question": "Which phrase is most appropriate to express a confident professional opinion in a debate?",
      "questionHindi": "बहस (debate) या मीटिंग में एक मजबूत पेशेवर राय (confident opinion) व्यक्त करने के लिए कौन सा वाक्यांश सबसे उपयुक्त है?",
      "options": [
        "A) I guess maybe it is okay",
        "B) I think so, maybe",
        "C) Whatever you say",
        "D) I am firmly of the opinion that"
      ],
      "correctIndex": 3
    },
    {
      "id": 2,
      "question": "Which rhetorical transition is best to persuade your audience during a keynote speech?",
      "questionHindi": "भाषण (speech) के दौरान अपने श्रोताओं को मनाने (persuade) के लिए कौन सा परिवर्तन सबसे अच्छा है?",
      "options": [
        "A) My career vision is to learn and innovate.",
        "B) I want to learn and innovate in my career.",
        "C) My vision is continuous learning for career.",
        "D) My main vision for my career is continuous learning and innovation."
      ],
      "correctIndex": 3
    },
    {
      "id": 3,
      "question": "Which sentence is best for a confident speaker to conclude a formal presentation?",
      "questionHindi": "एक आत्मविश्वासी वक्ता द्वारा प्रेजेंटेशन समाप्त (conclude) करने के लिए सबसे अच्छा वाक्य कौन सा है?",
      "options": [
        "A) Furthermore",
        "B) Consequently",
        "C) Similarly",
        "D) On the other hand"
      ],
      "correctIndex": 3
    },
    {
      "id": 4,
      "question": "How do you articulate a strategic leadership vision with confidence in a high-stakes meeting?",
      "questionHindi": "उच्च स्तरीय बैठक में आत्मविश्वास के साथ नेतृत्व दृष्टि (leadership vision) कैसे व्यक्त करें?",
      "options": [
        "A) By means of",
        "B) Through the lens of",
        "C) In spite of",
        "D) By committing to"
      ],
      "correctIndex": 3
    },
    {
      "id": 5,
      "question": "Which phrase is used to respectfully counter an opposing opinion in a formal debate?",
      "questionHindi": "औपचारिक बहस (debate) में विरोधी राय (opposing opinion) का सम्मानपूर्वक खंडन करने के लिए कौन सा वाक्यांश उपयुक्त है?",
      "options": [
        "A) I see what you mean, but...",
        "B) Maybe you are right.",
        "C) I am not sure about that.",
        "D) I couldn't agree more with your perspective."
      ],
      "correctIndex": 3
    },
    {
      "id": 6,
      "question": "Translate: 'एक नेता के रूप में, मेरा मानना है कि सहानुभूति और पारदर्शिता सबसे महत्वपूर्ण मूल्य हैं।'",
      "questionHindi": "Translate: 'एक नेता के रूप में, मेरा मानना है कि सहानुभूति और पारदर्शिता सबसे महत्वपूर्ण मूल्य हैं।'",
      "options": [
        "A) Being a leader, empathy is good.",
        "B) I think transparency is a value for leaders.",
        "C) As a leader, I believe empathy and transparency are paramount values.",
        "D) Leaders need empathy and transparency."
      ],
      "correctIndex": 2
    },
    {
      "id": 7,
      "question": "Which expression is used to transition to a new point in a presentation?",
      "questionHindi": "प्रेजेंटेशन में किसी नए बिंदु पर जाने के लिए किस अभिव्यक्ति का उपयोग किया जाता है?",
      "options": [
        "A) In conclusion",
        "B) To sum up",
        "C) Moving on to the next point",
        "D) I am done"
      ],
      "correctIndex": 2
    },
    {
      "id": 8,
      "question": "Select the most professional way to disagree with a colleague.",
      "questionHindi": "किसी सहकर्मी से असहमत होने का सबसे पेशेवर तरीका चुनें।",
      "options": [
        "A) You are completely wrong.",
        "B) That is a bad idea.",
        "C) I see your point, however, I have a different perspective.",
        "D) I don't think so at all."
      ],
      "correctIndex": 2
    },
    {
      "id": 9,
      "question": "Fill in the blank: 'They ________ (watch) a movie while I was sleeping.'",
      "questionHindi": "रिक्त स्थान भरें: 'जब मैं सो रहा था, वे फिल्म देख रहे थे (were watching)।'",
      "options": [
        "A) optional",
        "B) secondary",
        "C) integral",
        "D) avoidable"
      ],
      "correctIndex": 2
    },
    {
      "id": 10,
      "question": "Translate: 'चुनौतियों का सामना करना मुझे सिखाता है कि लचीलापन (resilience) सफलता की कुंजी है।'",
      "questionHindi": "Translate: 'चुनौतियों का सामना करना मुझे सिखाता है कि लचीलापन (resilience) सफलता की कुंजी है।'",
      "options": [
        "A) I face challenges and I succeed.",
        "B) Resilience is good for success.",
        "C) Facing challenges teaches me that resilience is key to success.",
        "D) Challenges make me strong."
      ],
      "correctIndex": 2
    },
    {
      "id": 11,
      "question": "Choose the correct phrase: 'My father ____ a blue car.'",
      "questionHindi": "सही विकल्प चुनें: 'मेरे पिता के पास एक नीली कार है।' ('has' का प्रयोग)",
      "options": [
        "A) I think maybe",
        "B) Sort of",
        "C) It is worth noting that",
        "D) If I am not mistaken"
      ],
      "correctIndex": 2
    },
    {
      "id": 12,
      "question": "What ________ you doing when the lights went out?",
      "questionHindi": "वाक्य पूरा करें: 'जब बत्ती चली गई, तब आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) put it briefly",
        "B) put it mildly",
        "C) put it simply",
        "D) put it clearly"
      ],
      "correctIndex": 2
    },
    {
      "id": 13,
      "question": "Choose the best fit: 'While I ________ (wait) for the bus, it started to rain.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैं बस का इंतज़ार कर रहा था (was waiting), बारिश शुरू हो गई।'",
      "options": [
        "A) Can you explain it small?",
        "B) Can you elaborate on my proposal?",
        "C) Tell me about proposal.",
        "D) What is the proposal?"
      ],
      "correctIndex": 1
    },
    {
      "id": 14,
      "question": "Which connector shows a cause-and-effect relationship?",
      "questionHindi": "कौन सा कनेक्टर कारण-और-प्रभाव संबंध दिखाता है?",
      "options": [
        "A) Furthermore",
        "B) Consequently",
        "C) However",
        "D) In addition"
      ],
      "correctIndex": 1
    },
    {
      "id": 15,
      "question": "Choose the correct option: '____ shoes are very comfortable.' (indicating shoes far away)",
      "questionHindi": "सही विकल्प चुनें: 'वे जूते बहुत आरामदायक हैं।' (दूर की वस्तु दर्शाने के लिए 'Those')",
      "options": [
        "A) Shut up, let me speak.",
        "B) Could I just jump in here for a moment?",
        "C) Stop talking.",
        "D) Wait, I want to say."
      ],
      "correctIndex": 1
    },
    {
      "id": 16,
      "question": "Complete: 'While she ________ (drive) to work, she saw a dog on the road.'",
      "questionHindi": "वाक्य पूरा करें: 'जब वह काम पर गाड़ी चला कर जा रही थी (was driving), उसने सड़क पर एक कुत्ता देखा।'",
      "options": [
        "A) We should find a solution together.",
        "B) We need to work together to find a solution to this problem.",
        "C) Let's work on the problem.",
        "D) Working together is needed."
      ],
      "correctIndex": 1
    },
    {
      "id": 17,
      "question": "Which option completes the sentence: 'They ________ (play) football when it started raining.'",
      "questionHindi": "सही विकल्प चुनें: 'जब बारिश शुरू हुई, वे फुटबॉल खेल रहे थे (were playing)।'",
      "options": [
        "A) Maybe",
        "B) Possibly",
        "C) Undoubtedly",
        "D) Perhaps"
      ],
      "correctIndex": 2
    },
    {
      "id": 18,
      "question": "Fill in the blank: 'I __________ agree with your assessment of the current market trends.'",
      "questionHindi": "खाली स्थान भरें: 'मैं मौजूदा बाजार के रुझानों के आपके आकलन से __________ सहमत हूँ।'",
      "options": [
        "A) lightly",
        "B) strongly",
        "C) barely",
        "D) hardly"
      ],
      "correctIndex": 1
    },
    {
      "id": 19,
      "question": "What ________ he doing when the accident happened?",
      "questionHindi": "वाक्य पूरा करें: 'जब दुर्घटना हुई, वह क्या कर रहा था (was he doing)?'",
      "options": [
        "A) For example",
        "B) In summary",
        "C) Moreover",
        "D) However"
      ],
      "correctIndex": 1
    },
    {
      "id": 20,
      "question": "Choose the correct phrase: 'While I ________, my mother was cooking.'",
      "questionHindi": "सही वाक्यांश चुनें: 'जब मैं पढ़ रहा था (was studying), मेरी माँ खाना बना रही थीं।'",
      "options": [
        "A) I believe soft skills are important with technical skills.",
        "B) I think technical skills are good.",
        "C) Soft skills are okay.",
        "D) I believe that alongside technical skills, soft skills are equally vital."
      ],
      "correctIndex": 3
    },
    {
      "id": 21,
      "question": "Choose the correct grammar: '____ pictures on the wall are beautiful.'",
      "questionHindi": "सही व्याकरण चुनें: 'दीवार पर लगी वे तस्वीरें सुंदर हैं।' ('Those' का प्रयोग)",
      "options": [
        "A) You are wrong.",
        "B) That is an interesting point of view.",
        "C) I don't care.",
        "D) That is irrelevant."
      ],
      "correctIndex": 1
    },
    {
      "id": 22,
      "question": "Identify the error: 'They was playing cricket while it was raining.'",
      "questionHindi": "व्याकरण की त्रुटि पहचानें: 'वे बारिश में क्रिकेट खेल रहे थे।' (They were playing)",
      "options": [
        "A) Moreover",
        "B) Therefore",
        "C) Nevertheless",
        "D) Otherwise"
      ],
      "correctIndex": 0
    },
    {
      "id": 23,
      "question": "What were you ________ (do) before the meeting started?",
      "questionHindi": "वाक्य पूरा करें: 'मीटिंग शुरू होने से पहले आप क्या कर रहे थे (were you doing)?'",
      "options": [
        "A) We must be prepared for future challenges.",
        "B) We need to be ready.",
        "C) Future is challenging.",
        "D) Let's prepare for the future."
      ],
      "correctIndex": 0
    },
    {
      "id": 24,
      "question": "Choose the correct structure: 'While ________ (we/eat), the door opened.'",
      "questionHindi": "सही संरचना चुनें: 'जब हम खाना खा रहे थे (we were eating), दरवाजा खुला।'",
      "options": [
        "A) What is your take on this?",
        "B) Do you have any idea?",
        "C) Tell me.",
        "D) Give me your answer."
      ],
      "correctIndex": 0
    },
    {
      "id": 25,
      "question": "Fill in the blank: '__________ global competition, companies must innovate constantly.'",
      "questionHindi": "खाली स्थान भरें: '__________ वैश्विक प्रतिस्पर्धा, कंपनियों को लगातार नवाचार करना चाहिए।'",
      "options": [
        "A) In light of",
        "B) By the way",
        "C) Instead of",
        "D) Because"
      ],
      "correctIndex": 0
    },
    {
      "id": 26,
      "question": "Which word is a professional synonym for 'big'?",
      "questionHindi": "'बड़ा' के लिए कौन सा शब्द एक पेशेवर पर्यायवाची है?",
      "options": [
        "A) Small",
        "B) Significant",
        "C) Tiny",
        "D) Little"
      ],
      "correctIndex": 1
    },
    {
      "id": 27,
      "question": "Complete the sentence: 'While the teacher ________ (speak), the students were writing.'",
      "questionHindi": "वाक्य पूरा करें: 'जब शिक्षक बोल रहे थे (was speaking), छात्र लिख रहे थे।'",
      "options": [
        "A) Networking is a great way to enhance career opportunities.",
        "B) Networking is good for job.",
        "C) I like networking.",
        "D) Career needs networking."
      ],
      "correctIndex": 0
    },
    {
      "id": 28,
      "question": "Complete the sentence: '____ is my favorite book.'",
      "questionHindi": "वाक्य पूरा करें: 'यह मेरी पसंदीदा किताब है।' (पास की वस्तु के लिए 'This')",
      "options": [
        "A) Thank you for your time and attention.",
        "B) Okay, bye.",
        "C) See you later.",
        "D) That is all."
      ],
      "correctIndex": 0
    },
    {
      "id": 29,
      "question": "Choose the correct option: 'I ________ (walk) home when I saw the accident.'",
      "questionHindi": "सही विकल्प चुनें: 'जब मैंने दुर्घटना देखी, मैं घर जा रहा था (was walking)।'",
      "options": [
        "A) However",
        "B) Furthermore",
        "C) Also",
        "D) Consequently"
      ],
      "correctIndex": 0
    },
    {
      "id": 30,
      "question": "Translate: 'मेरा नेतृत्व दर्शन (leadership philosophy) विश्वास और जवाबदेही पर आधारित है।'",
      "questionHindi": "Translate: 'मेरा नेतृत्व दर्शन (leadership philosophy) विश्वास और जवाबदेही पर आधारित है।'",
      "options": [
        "A) My leadership philosophy is based on trust and accountability.",
        "B) I lead with trust.",
        "C) Trust is good for leadership.",
        "D) My philosophy is accountability."
      ],
      "correctIndex": 0
    }
  ]
};

if (typeof window !== 'undefined') {
  window.HINDI_QUIZ_BANK = HINDI_QUIZ_BANK;
}
if (typeof globalThis !== 'undefined') {
  globalThis.HINDI_QUIZ_BANK = HINDI_QUIZ_BANK;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HINDI_QUIZ_BANK };
}
