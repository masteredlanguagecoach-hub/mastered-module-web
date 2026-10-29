/**
 * Official Mastered AI Coach Curriculum
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md & Section 4 Curriculum Specification
 * Exactly 32 missions. Mission 32 is strictly the final terminal mission.
 * Targets:
 * - Missions 1–8: 30 verified correct spoken sentences each
 * - Missions 9–23: 40 verified correct spoken sentences each
 * - Missions 24–32: 50 verified correct spoken sentences each
 */

(function () {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  var OFFICIAL_CURRICULUM = [
  {
    "missionNumber": 1,
    "title": "Introduce Yourself",
    "targetSentences": 30,
    "objective": "Confidently introduce yourself and answer basic personal questions.",
    "situation": "Meeting someone for the first time.",
    "grammarFocus": "I, am, my, a/an.",
    "topics": "Name, place, profession, hobby, goal.",
    "starterPrompts": [
      "Please introduce yourself with your name, profession, and where you are from.",
      "Tell me about two hobbies or activities you enjoy doing in your free time.",
      "What is your primary goal for improving your English speaking skills?"
    ]
  },
  {
    "missionNumber": 2,
    "title": "Talk About Others",
    "targetSentences": 30,
    "objective": "Talk confidently about people and answer simple questions about family and friends.",
    "situation": "Introducing family, friends, classmates or colleagues.",
    "grammarFocus": "He, she, we, they, is, are.",
    "topics": "Father, mother, brother, sister, friend, teacher, classmate, colleague.",
    "starterPrompts": [
      "Tell me about a close friend or colleague who inspires you.",
      "How would you describe your best friend's personality?",
      "Tell me about a teacher or colleague who helped you learn something new."
    ]
  },
  {
    "missionNumber": 3,
    "title": "Describe Your Family",
    "targetSentences": 30,
    "objective": "Describe family members and things the student has.",
    "situation": "Discussing family, friends, home and belongings.",
    "grammarFocus": "Have, has, this, that, these, those.",
    "topics": "Family, friends, home, personal belongings, favourite things.",
    "starterPrompts": [
      "Describe your family members and what they do.",
      "Tell me about your home and your favorite room in the house.",
      "What is a special belonging or item that is very important to you?"
    ]
  },
  {
    "missionNumber": 4,
    "title": "Talk About What You Can Do",
    "targetSentences": 30,
    "objective": "Describe abilities, ask for help politely and respond using can, can't and could.",
    "situation": "Everyday skills and asking/giving help.",
    "grammarFocus": "Can, can't, could.",
    "topics": "Personal skills, hobbies, daily activities, asking for help, giving help.",
    "starterPrompts": [
      "What are three practical skills you can perform very well?",
      "How do you politely ask a colleague or friend for help when you are busy?",
      "Tell me about a skill you could not do in the past but can do confidently now."
    ]
  },
  {
    "missionNumber": 5,
    "title": "Talk About Responsibilities",
    "targetSentences": 30,
    "objective": "Discuss daily/past responsibilities and give simple advice.",
    "situation": "Routines, work, studies and family duties.",
    "grammarFocus": "Have to, has to, had to, should.",
    "topics": "Responsibilities, work, studies, family duties, advice, yesterday's activities.",
    "starterPrompts": [
      "What are the main responsibilities you have to handle every day?",
      "What tasks did you have to complete yesterday before going to sleep?",
      "What advice should you give to someone struggling to manage their work time?"
    ]
  },
  {
    "missionNumber": 6,
    "title": "Express Yourself Politely",
    "targetSentences": 30,
    "objective": "Express wishes, make polite requests, ask permission and discuss possibilities.",
    "situation": "Everyday polite conversations, invitations and future possibilities.",
    "grammarFocus": "Would, would like to, may, might.",
    "topics": "Wishes, plans, invitations, permission, daily conversations, possibilities.",
    "starterPrompts": [
      "What would you like to achieve in your career over the next two years?",
      "How would you politely invite a friend to have dinner with you this weekend?",
      "Where might you travel on your next vacation if you have free time?"
    ]
  },
  {
    "missionNumber": 7,
    "title": "Ask Like a Pro",
    "targetSentences": 30,
    "objective": "Ask and answer questions to start and continue conversations.",
    "situation": "Meeting people and gathering information.",
    "grammarFocus": "Who, whom, what, when, where, why, which, whose, how.",
    "topics": "Personal information, family, work/study, routine, hobbies, future plans, preferences, general conversation.",
    "starterPrompts": [
      "Imagine you are meeting a new colleague. Ask me three questions to get to know me.",
      "Ask me about my daily routine and what I usually do on weekends.",
      "Ask me why English is so valuable for international careers."
    ]
  },
  {
    "missionNumber": 8,
    "title": "Handle Everyday English",
    "targetSentences": 30,
    "objective": "Use prepositions, articles and singular/plural forms in everyday speech.",
    "situation": "Places, time, travel, routines and directions.",
    "grammarFocus": "In, on, at, to, for, from, with, of; a/an/the; singular/plural.",
    "topics": "Home, hometown, routine, travel, work/school, directions, time, favourite places.",
    "starterPrompts": [
      "Tell me about your hometown and where it is located.",
      "How do you usually travel from your home to your workplace or school?",
      "How would you give directions to someone asking for the nearest railway station or bank?"
    ]
  },
  {
    "missionNumber": 9,
    "title": "Talk About Your Daily Life",
    "targetSentences": 40,
    "objective": "Discuss routines, habits and regular activities.",
    "situation": "Home, work, studies and weekends.",
    "grammarFocus": "Simple present; subject + V1; he/she/it + verb-s/es; do/does; don't/doesn't.",
    "topics": "Morning/daily routine, work, studies, hobbies, weekends, habits, time management.",
    "starterPrompts": [
      "Walk me through your typical morning routine from the moment you wake up.",
      "What does your family or roommate usually do on Sunday afternoons?",
      "What habits help you stay energetic and organized during a busy week?"
    ]
  },
  {
    "missionNumber": 10,
    "title": "Express Your Likes & Opinions",
    "targetSentences": 40,
    "objective": "Express likes, dislikes, preferences and opinions using action verbs.",
    "situation": "Hobbies, interests and everyday activities.",
    "grammarFocus": "V1; he/she/it + s/es; like/don't like, prefer, think, believe.",
    "topics": "Hobbies, favourite food/movie, books, opinions, interests, daily activities.",
    "starterPrompts": [
      "What kind of food do you like most, and what is something you don't like eating?",
      "Do you prefer working from an office or working remotely from home, and why?",
      "What is your opinion on whether social media helps people connect or creates distraction?"
    ]
  },
  {
    "missionNumber": 11,
    "title": "Ask, Answer & Communicate",
    "targetSentences": 40,
    "objective": "Ask and answer questions confidently about daily routines and habits using simple present.",
    "situation": "Meeting people and discussing work, studies, hobbies, family and daily life.",
    "grammarFocus": "Do/does, yes/no questions, WH questions, always, usually, often, sometimes, rarely, never.",
    "topics": "Routine, work, studies, family, hobbies, healthy habits, weekends, personal goals.",
    "starterPrompts": [
      "How often do you exercise or go for a morning walk during the week?",
      "Ask me a question about what I usually do when I have free time on weekends.",
      "What healthy habit do you always try to maintain every single day?"
    ]
  },
  {
    "missionNumber": 12,
    "title": "Talk About What's Happening Now",
    "targetSentences": 40,
    "objective": "Discuss actions happening now.",
    "situation": "Activities at home, work or school.",
    "grammarFocus": "Am/is/are + verb-ing.",
    "topics": "Current activities, home, work, studies, family activities, today's plan.",
    "starterPrompts": [
      "What are you currently doing right now during this practice session?",
      "What are the other people in your home or office doing at this moment?",
      "What project or task are you actively working on today?"
    ]
  },
  {
    "missionNumber": 13,
    "title": "Communicate About Current & Future Activities",
    "targetSentences": 40,
    "objective": "Use negatives, questions and present continuous for future arrangements.",
    "situation": "Activities, meetings, appointments and travel plans.",
    "grammarFocus": "Present continuous negatives, yes/no questions, short answers, WH questions, future arrangements.",
    "topics": "Current activities, daily life, meetings, appointments, travel, tomorrow and next week's plans.",
    "starterPrompts": [
      "What are you planning to do tomorrow evening after your work or studies?",
      "Are you meeting any friends or attending any appointments this coming weekend?",
      "Where are you traveling next month, or what arrangements are you currently making?"
    ]
  },
  {
    "missionNumber": 14,
    "title": "Talk About Yesterday",
    "targetSentences": 40,
    "objective": "Describe completed actions and past experiences.",
    "situation": "Yesterday, holidays, travel, childhood and past events.",
    "grammarFocus": "Simple past, V2, regular and irregular verbs.",
    "topics": "Yesterday, last weekend, holidays, travel, childhood, memorable experiences.",
    "starterPrompts": [
      "What did you do yesterday from morning until evening?",
      "Tell me about a memorable trip or holiday you took in the past.",
      "What was one of your favorite games or memories from your childhood?"
    ]
  },
  {
    "missionNumber": 15,
    "title": "Talk About Past Experiences",
    "targetSentences": 40,
    "objective": "Use past negatives, yes/no questions, WH questions and short answers.",
    "situation": "Past events, travel, studies and memories.",
    "grammarFocus": "Simple past negatives and questions, short answers, WH questions.",
    "topics": "Yesterday, last weekend, holidays, childhood, travel, past experiences, memorable events.",
    "starterPrompts": [
      "Did you travel anywhere interesting during your last long vacation?",
      "What didn't you get time to finish last week that you wanted to do?",
      "Ask me where I went on my most memorable holiday."
    ]
  },
  {
    "missionNumber": 16,
    "title": "Tell a Short Story",
    "targetSentences": 40,
    "objective": "Tell an interesting simple story using past tense and sequence words.",
    "situation": "Sharing memories or unexpected events.",
    "grammarFocus": "Simple past; first, then, after that, suddenly, luckily, finally.",
    "topics": "Funny incident, childhood memory, holiday, school story, family function, unexpected event, adventure, memorable day.",
    "starterPrompts": [
      "Tell me a short story about an unexpected or funny event that happened to you.",
      "Describe a memorable day in school or college using first, then, and finally.",
      "Tell me about a time when something went wrong during a trip, but luckily ended well."
    ]
  },
  {
    "missionNumber": 17,
    "title": "Describe What Was Happening",
    "targetSentences": 40,
    "objective": "Describe ongoing past actions and interruptions.",
    "situation": "Accidents, travel, classroom, work or family incidents.",
    "grammarFocus": "Was/were + verb-ing; while; when.",
    "topics": "Yesterday evening, classroom/funny incident, journey, family event, office situation, unexpected moments.",
    "starterPrompts": [
      "What were you doing yesterday evening around seven o'clock?",
      "Tell me about a time when an unexpected event interrupted what you were doing.",
      "What was happening in your office or classroom when the teacher or manager entered?"
    ]
  },
  {
    "missionNumber": 18,
    "title": "Share Your Life Journey",
    "targetSentences": 40,
    "objective": "Describe education, career, achievements and growth using present perfect.",
    "situation": "Interviews, networking and introductions.",
    "grammarFocus": "Have/has + V3; ever/never; already/recently/so far.",
    "topics": "Education, career, skills, achievements, certificates, life experiences, personal growth, dreams.",
    "starterPrompts": [
      "What important achievements or milestones have you completed in your career or studies so far?",
      "Have you ever lived in another city or visited a famous historical place?",
      "What key skills have you learned recently that have helped you grow?"
    ]
  },
  {
    "missionNumber": 19,
    "title": "Talk About Recent Actions",
    "targetSentences": 40,
    "objective": "Discuss recently completed and pending activities.",
    "situation": "Work updates, assignments and project progress.",
    "grammarFocus": "Present perfect; already, yet, just, recently, still.",
    "topics": "Today's tasks, office updates, study progress, family activities, project status, messages/calls, achievements.",
    "starterPrompts": [
      "What tasks have you already finished today, and what have you not done yet?",
      "Have you received any important messages or phone calls recently?",
      "What project update have you just discussed with your team or family?"
    ]
  },
  {
    "missionNumber": 20,
    "title": "Talk About Your Future Plans",
    "targetSentences": 40,
    "objective": "Discuss plans, goals and intentions.",
    "situation": "Career, education, travel, business and family plans.",
    "grammarFocus": "Am/is/are going to + V1.",
    "topics": "Career goals, business, education, travel, family plans, personal goals, dreams.",
    "starterPrompts": [
      "What major career or study goals are you going to pursue this year?",
      "Where are you going to travel for your next holiday with your family or friends?",
      "What new habit or routine are you going to start next month?"
    ]
  },
  {
    "missionNumber": 21,
    "title": "Make Promises and Predictions",
    "targetSentences": 40,
    "objective": "Make promises, predictions, offers and instant decisions.",
    "situation": "Commitments, helping others and future discussions.",
    "grammarFocus": "Will/won't + V1.",
    "topics": "Promises, family commitments, career predictions, technology, weather, helping others, goals.",
    "starterPrompts": [
      "What promise will you make to yourself regarding your daily English speaking practice?",
      "How do you think artificial intelligence and technology will change our daily lives in five years?",
      "If a friend needs help moving to a new apartment, what will you offer to do?"
    ]
  },
  {
    "missionNumber": 22,
    "title": "Describe Future Ongoing Actions",
    "targetSentences": 40,
    "objective": "Describe future ongoing activities and schedules.",
    "situation": "Tomorrow, meetings, travel, work and study.",
    "grammarFocus": "Will be + verb-ing.",
    "topics": "Tomorrow's schedule, meetings, study/work plans, travel, family activities, weekends.",
    "starterPrompts": [
      "What will you be doing tomorrow afternoon around three o'clock?",
      "Where will you be working or studying this time next year?",
      "What will your family be doing this coming Sunday evening?"
    ]
  },
  {
    "missionNumber": 23,
    "title": "Talk About Ongoing Activities",
    "targetSentences": 40,
    "objective": "Describe continuing activities and long-term actions.",
    "situation": "Learning, work, fitness and personal development.",
    "grammarFocus": "Have/has been + verb-ing; for; since.",
    "topics": "English learning, work experience, study routine, habits, fitness, business, growth, long-term goals.",
    "starterPrompts": [
      "How long have you been learning English, and what has helped you most?",
      "How long have you been working in your current profession or studying your subject?",
      "What fitness or wellness activity have you been practicing consistently recently?"
    ]
  },
  {
    "missionNumber": 24,
    "title": "Shopping Conversation",
    "targetSentences": 50,
    "objective": "Handle shopping conversations using natural English and mixed tenses.",
    "situation": "Clothing, grocery, electronics, pharmacy, book and shoe shops.",
    "grammarFocus": "Mixed tenses, polite requests, questions, can/could/would.",
    "topics": "Choosing items, asking about products, prices, billing and payment.",
    "starterPrompts": [
      "Imagine you are in a clothing store looking for a formal shirt. How would you ask the salesperson for help?",
      "How do you inquire about the warranty, discount, and return policy for a laptop or phone?",
      "How do you ask about available payment options at the checkout counter?"
    ]
  },
  {
    "missionNumber": 25,
    "title": "Order Food Confidently",
    "targetSentences": 50,
    "objective": "Handle food-ordering conversations naturally.",
    "situation": "Restaurants, caf\u00e9s, bakeries, tea shops, hotels and food courts.",
    "grammarFocus": "Mixed tenses, polite requests, WH questions, can/could/would.",
    "topics": "Choosing food, ordering, asking questions, billing/payment.",
    "starterPrompts": [
      "Imagine you are at a nice restaurant. How would you order a main course and a drink from the waiter?",
      "How would you politely ask if a specific dish contains nuts or dairy products?",
      "How would you ask the server for the bill and check if service charge is included?"
    ]
  },
  {
    "missionNumber": 26,
    "title": "Handle Travel Conversations Confidently",
    "targetSentences": 50,
    "objective": "Communicate in common travel situations.",
    "situation": "Airports, railway/bus stations, hotels, taxis and tourist places.",
    "grammarFocus": "Mixed tenses, WH questions, polite requests, can/could/would.",
    "topics": "Directions, check-in, tickets, hotels, taxis, tourist enquiries, lost luggage, travel emergencies.",
    "starterPrompts": [
      "Imagine you arrive at an airport check-in counter. What do you say to the airline agent?",
      "How do you ask the hotel receptionist for an early check-in or a room on a quiet floor?",
      "How do you report a missing bag to the lost luggage desk at the station?"
    ]
  },
  {
    "missionNumber": 27,
    "title": "Handle Telephone Conversations Confidently",
    "targetSentences": 50,
    "objective": "Communicate over the phone in personal and professional situations.",
    "situation": "Personal/office calls, customer care and appointments.",
    "grammarFocus": "Mixed tenses, WH questions, polite requests, can/could/would.",
    "topics": "Calling friends, office calls, customer care, appointments, messages, callbacks, wrong numbers, telephone etiquette.",
    "starterPrompts": [
      "How do you answer a professional phone call at work and ask who is calling?",
      "How do you leave a polite voice message asking someone to call you back about an urgent matter?",
      "How do you explain to customer service that an item you ordered arrived damaged?"
    ]
  },
  {
    "missionNumber": 28,
    "title": "Handle a Job Interview Confidently",
    "targetSentences": 50,
    "objective": "Answer interview questions naturally using mixed tenses.",
    "situation": "Campus, HR, walk-in and online interviews.",
    "grammarFocus": "Mixed tenses, WH questions, self-introduction, professional communication, modals.",
    "topics": "Introduction, education, experience, skills, strengths/weaknesses, career goals, salary, interview closing.",
    "starterPrompts": [
      "Introduce yourself professionally as if you are sitting across from a hiring manager.",
      "What is your greatest professional strength, and can you share an example of when it helped your team?",
      "Where do you see yourself professionally in five years, and what questions do you have for the interviewer?"
    ]
  },
  {
    "missionNumber": 29,
    "title": "Communicate Professionally at Work",
    "targetSentences": 50,
    "objective": "Communicate in workplace situations.",
    "situation": "Meetings, projects, clients, emails, presentations, deadlines and teamwork.",
    "grammarFocus": "Mixed tenses, professional English, WH questions, polite requests, modals.",
    "topics": "Team meetings, project updates, clients, office discussions, deadlines, emails, presentations, collaboration.",
    "starterPrompts": [
      "How would you give a concise 1-minute progress update on your current project during a team meeting?",
      "How would you politely disagree with a colleague's proposal during a brainstorming session?",
      "How do you inform a client that a project milestone will require an extra two days?"
    ]
  },
  {
    "missionNumber": 30,
    "title": "Complete a Real-Life Conversation Confidently",
    "targetSentences": 50,
    "objective": "Combine skills and grammar from Missions 1\u201329 in natural conversations.",
    "situation": "Introductions, travel, shopping, restaurants, phone calls, interviews, work and social conversations.",
    "grammarFocus": "Mixed tenses and all grammar from Modules 1\u201329.",
    "topics": "Self-introduction, daily life, past experiences, current activities, future plans, shopping, restaurants, travel, calls, interviews, work, opinions, stories and personal goals.",
    "starterPrompts": [
      "Tell me about a comprehensive challenge you faced recently at work or in daily life and how you resolved it.",
      "Imagine we are having coffee at a networking conference. Tell me about your journey and your plans.",
      "Share an inspiring life lesson you have learned over the past few years."
    ]
  },
  {
    "missionNumber": 31,
    "title": "Sound More Natural in Everyday English",
    "targetSentences": 50,
    "objective": "Replace basic textbook speech with natural, fluent expressions.",
    "situation": "Friends, office, college, interviews, travel, shopping, restaurants, calls and networking.",
    "grammarFocus": "Conversation fillers, natural reactions, everyday/professional expressions, conversation flow and fluency.",
    "topics": "Free talk, opinions, weekends, daily life, work, friends, hobbies, travel, social conversations, networking.",
    "starterPrompts": [
      "Share your honest opinion on work-life balance using natural everyday phrases and reactions.",
      "Tell me about a relaxing weekend you had recently, speaking in a natural conversational flow.",
      "What are some everyday idioms or natural expressions you would like to master?"
    ]
  },
  {
    "missionNumber": 32,
    "title": "Speak Like a Confident English Speaker",
    "targetSentences": 50,
    "objective": "Develop advanced fluency using connectors, opinions, professional expressions and confident speaking techniques.",
    "situation": "Presentations, meetings, interviews, networking, business, debates and everyday communication.",
    "grammarFocus": "Advanced connectors, opinion expressions, professional English, agreement/disagreement, confidence, public speaking.",
    "topics": "Business, leadership, technology, education, career, travel, social media, current affairs, personal growth and free speaking.",
    "starterPrompts": [
      "Deliver an articulate 2-minute perspective on what qualities make a truly great leader in modern business.",
      "Reflect on your speaking journey from Mission 1 to Mission 32 and how your confidence has grown.",
      "What advice would you give to someone who feels hesitant or shy when speaking English aloud?"
    ]
  }
];

  function getMission(num) {
    var n = parseInt(num, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 32) n = 32;
    return OFFICIAL_CURRICULUM[n - 1];
  }

  function getTargetForMission(num) {
    var m = getMission(num);
    return m ? m.targetSentences : 30;
  }

  function getAllMissions() {
    return OFFICIAL_CURRICULUM.slice();
  }

  var MasteredCurriculum = {
    OFFICIAL_CURRICULUM: OFFICIAL_CURRICULUM,
    TOTAL_MISSIONS: 32,
    getMission: getMission,
    getTargetForMission: getTargetForMission,
    getAllMissions: getAllMissions
  };

  root.MasteredCurriculum = MasteredCurriculum;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredCurriculum;
  }
})();
