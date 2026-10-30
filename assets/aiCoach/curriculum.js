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
      "What is your primary goal for improving your English speaking skills?",
      "Where are you originally from, and what do you like most about your hometown?",
      "What kind of work or studies are you currently focused on each day?",
      "How do you usually spend a typical evening after your work or study?",
      "If you meet someone new at a gathering, what is your favorite way to start a conversation?"
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
      "Tell me about a teacher or colleague who helped you learn something new.",
      "What are two qualities you admire most in your favorite coworker or classmate?",
      "Tell me about a friend who has a very different hobby or personality from you.",
      "How does your close friend usually spend their weekends?",
      "What is one memorable experience you shared with a good friend?"
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
      "What is a special belonging or item that is very important to you?",
      "How do you and your family usually spend time together on weekends?",
      "Tell me about a traditional family meal or celebration you enjoy.",
      "Who in your family are you most similar to in personality?",
      "What is something special about the neighborhood where your home is located?"
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
      "Tell me about a skill you could not do in the past but can do confidently now.",
      "Can you speak any other languages besides English and your mother tongue?",
      "What is a new skill you would love to learn if you had extra free time?",
      "How do you offer your help when you notice a friend struggling with a task?",
      "Tell me about something you can do to stay energetic and focused during the day."
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
      "What are your top three daily responsibilities at work or at home?",
      "What duties did you have to handle yesterday before finishing your day?",
      "What advice would you give to someone who has too many tasks to complete?",
      "How do you prioritize your duties when multiple deadlines arrive at once?",
      "Tell me about a responsibility you find most satisfying or rewarding.",
      "What household chores or family duties are you usually responsible for?",
      "How do you manage your time so that all your daily duties are completed on schedule?"
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
      "How do you politely request a glass of water or tea in an office or restaurant?",
      "How do you decline an invitation politely when you already have other plans?",
      "How would you politely ask someone to speak a little louder or more slowly?",
      "What polite phrase do you use when interrupting a busy colleague for a quick question?",
      "How do you apologize politely if you arrive a few minutes late for an appointment?",
      "How do you express gratitude warmly when someone does a special favor for you?",
      "How would you politely ask for someone's permission to open a window or borrow a pen?"
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
      "What questions would you ask a store clerk when looking for a specific item?",
      "How do you ask someone for directions to the nearest train station or hospital?",
      "What questions do you ask when confirming the timing and venue of a meeting?",
      "How would you ask a colleague for their opinion on an idea you have?",
      "What question do you ask when you want to know the price and available discounts?",
      "How do you politely ask someone what they think about a recent movie or book?",
      "What questions would you ask to learn more about someone's career background?"
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
      "How do you greet your neighbor when stepping out in the morning?",
      "How do you guide a visitor asking for directions to the nearest pharmacy?",
      "What do you say when entering a small shop and greeting the shopkeeper?",
      "If someone on the street asks what the time is, how do you answer politely?",
      "How would you ask someone in a noisy room to repeat what they just said?",
      "What friendly parting phrase do you say when leaving a local store or cafe?",
      "How do you respond when a neighbor asks how your day or week is going?"
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
      "What time do you usually wake up to begin your day?",
      "What is the first thing you like to do after waking up in the morning?",
      "Do you prefer having a quick breakfast or a relaxed meal in the morning?",
      "How do you usually commute to work, college, or your daily activities?",
      "What is your favorite part of your daily evening routine after work?",
      "How do you unwind and relax before going to sleep at night?",
      "How does your weekend routine differ from your weekday schedule?"
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
      "Do you prefer working from home, working from an office, or a hybrid schedule, and why?",
      "In your view, do smartphones help people connect better or create more distractions?",
      "What kind of books, movies, or shows do you enjoy most in your free time, and why?",
      "What is your opinion on whether early mornings or late nights are better for studying?",
      "Do you prefer living in a quiet countryside or a bustling city, and why?",
      "What is your favorite type of food or cuisine, and what makes it special to you?",
      "What is an opinion you hold strongly about healthy living and exercise?"
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
      "How do you usually start a conversation with a new colleague at work?",
      "What questions do you ask when you want to get to know someone's hobbies?",
      "How do you keep a conversation going when there is an awkward silence?",
      "What do you say when someone shares exciting news with you?",
      "How do you express polite interest when a friend tells a story?",
      "What is a friendly way to transition from small talk into discussing work?",
      "How do you conclude a conversation politely when you need to leave?"
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
      "What are you currently doing right now to practice your English speaking?",
      "What is happening around you in your room or environment at this moment?",
      "What project or task are you actively working on these days?",
      "Describe what people around you are usually doing at this time of day.",
      "What new habit or routine are you trying to build this month?",
      "What book, course, or topic are you studying or reading right now?",
      "What kind of changes are happening in your workplace or daily life these days?"
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
      "What are your main plans and appointments for tomorrow?",
      "What are you planning to do this coming weekend with friends or family?",
      "Are you traveling or visiting anywhere special in the upcoming weeks?",
      "What important goals are you working toward completing before the end of this month?",
      "Who are you planning to meet or call in the next few days?",
      "What new skills are you preparing to learn in the coming months?",
      "How do you plan to celebrate your next birthday or upcoming festival?"
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
      "Tell me about three things you did yesterday from morning to evening.",
      "What was the most interesting or memorable part of your day yesterday?",
      "What did you have for lunch or dinner yesterday, and did you enjoy it?",
      "Did you face any unexpected challenges or delays yesterday, and how did you handle them?",
      "Who did you talk or chat with yesterday, and what did you discuss?",
      "What time did you finish your work or responsibilities yesterday?",
      "How did you spend your evening yesterday to relax?"
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
      "Tell me about a memorable trip or journey you took in the past.",
      "What was your first job or school experience like?",
      "Tell me about an exciting accomplishment you achieved in the past.",
      "What is a favorite childhood memory that always makes you smile?",
      "Have you ever experienced a difficult challenge that taught you a valuable life lesson?",
      "Tell me about a delicious meal you had at a restaurant or celebration in the past.",
      "What was a memorable celebration or holiday you enjoyed with your loved ones?"
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
      "Tell me a short story about an unexpected event that happened to you.",
      "Tell me about a time you lost something important and how you found it.",
      "Describe a funny or amusing incident that happened with your friends.",
      "Tell me a story about a time you helped someone or someone helped you.",
      "What was an adventure or spontaneous trip you took that turned out surprisingly well?",
      "Tell me about a time you had to solve a tricky problem on the spot.",
      "Describe a memorable experience where teamwork made a big difference."
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
      "What were you doing when the rain started heavily yesterday?",
      "What were you working on this time last week?",
      "Describe what your family members were doing when you returned home yesterday.",
      "What were you thinking about before you joined this speaking session?",
      "Tell me about a time you were studying or working while listening to music.",
      "What were you doing during your last long holiday or vacation?",
      "Describe what was happening around you during a busy moment at your workplace."
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
      "Tell me the story of your life journey from childhood to where you are today.",
      "What major milestones have shaped who you are as a person?",
      "How has your perspective on life changed over the last five years?",
      "What are two important decisions you made that changed your life direction?",
      "Tell me about someone who has played a major role in your personal growth.",
      "What are you most grateful for when you look back at your journey so far?",
      "What wisdom would you share with your younger self if you could go back in time?"
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
      "What have you accomplished so far this week that you feel good about?",
      "Have you read any interesting articles, news, or books recently?",
      "What new places or cafes have you visited recently in your city?",
      "Have you spoken with any old friends recently, and what did you talk about?",
      "What positive changes have you noticed in your English speaking recently?",
      "What has been the most exciting news you have received recently?",
      "Have you watched any interesting movies or shows recently that you would recommend?"
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
      "What are your long-term career aspirations for the next three to five years?",
      "Where would you like to travel in the future, and why does that place attract you?",
      "What kind of home or environment would you like to live in someday?",
      "How do you plan to continue using your English once you complete this course?",
      "What personal goals or fitness targets do you hope to achieve next year?",
      "What project or business idea would you love to start in the future?",
      "How do you envision your life and career ten years from now?"
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
      "What is a promise you have made to yourself regarding your self-improvement?",
      "What do you predict will be the biggest technological change in the next decade?",
      "How do you think artificial intelligence will transform your profession in the future?",
      "What predictions do you have about the future of transportation and travel?",
      "How will you reward yourself once you achieve full English speaking fluency?",
      "What do you predict will happen in your city or country over the coming years?",
      "What promise can you make to practice speaking English every single day?"
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
      "What will you be doing this time tomorrow afternoon?",
      "Where do you think you will be living and working five years from now?",
      "What skills will you be practicing this time next month?",
      "What will your colleagues or friends be doing while you are enjoying your weekend?",
      "How will you be using your English skills in your daily meetings next year?",
      "What goals will you be pursuing as you step into the new year?",
      "Imagine your ideal future: what will you be doing on a typical sunny morning?"
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
      "How long have you been learning English, and how has your progress been?",
      "What activities have you been focusing on the most over the past few weeks?",
      "Have you been exercising or following any fitness routine lately?",
      "What challenges have you been overcoming in your daily work or studies?",
      "How have you been spending your free time over the last few weekends?",
      "What exciting ideas or plans have you been thinking about recently?",
      "How has your confidence in speaking English been improving day by day?"
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
      "How do you ask a shop assistant for a different size, color, or style of clothing?",
      "How do you ask if there are any seasonal discounts or special promotions available?",
      "What do you say when you want to return or exchange an item you bought?",
      "How do you politely ask to try on an outfit in the fitting room?",
      "What questions do you ask when comparing the quality or features of two products?",
      "How do you ask about accepted payment methods and warranty terms?",
      "What do you say when you are just browsing and not ready to buy yet?"
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
      "How do you reserve a table at a popular restaurant for your family or friends?",
      "What do you say to the server when you are ready to order your meal?",
      "How do you ask about special ingredients, spice levels, or vegetarian options?",
      "How do you politely inform the waiter if an order item is incorrect or missing?",
      "How do you ask for recommendations on the chef's special dishes?",
      "What do you say when requesting extra water, napkins, or the bill?",
      "How do you compliment the restaurant staff if the food was exceptionally delicious?"
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
      "How do you check in at the airport counter and request a window or aisle seat?",
      "What questions do you ask the hotel receptionist when checking into your room?",
      "How do you ask about public transportation options from the airport to the city center?",
      "What do you say if your luggage is delayed or missing at the baggage claim?",
      "How do you ask a local guide for recommendations on must-visit scenic spots?",
      "What questions do you ask when buying a train ticket or booking a taxi?",
      "How do you handle a situation if your flight or train schedule is delayed?"
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
      "How do you greet someone professionally when answering an official phone call?",
      "How do you politely ask to speak with a specific person or department?",
      "What do you say when taking a clear, detailed message for an absent colleague?",
      "How do you handle a bad telephone connection or ask someone to repeat themselves?",
      "What polite phrase do you use when placing a caller on brief hold?",
      "How do you confirm important dates, times, or email addresses over the phone?",
      "How do you wrap up a business phone call courteously and summarize next steps?"
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
      "How do you introduce yourself confidently when an interviewer says 'Tell me about yourself'?",
      "How do you explain your greatest professional strengths with concrete examples?",
      "How do you address a weakness honestly while showing how you are improving it?",
      "Describe a challenging situation at work or college and how you resolved it.",
      "Why are you interested in this specific role and what makes you a great fit?",
      "Where do you see yourself contributing and growing in this organization in three years?",
      "What thoughtful questions would you ask the interviewers at the end of the interview?"
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
      "How do you give a concise, structured progress update during a team meeting?",
      "How do you politely disagree with a colleague's proposal while suggesting an alternative?",
      "What professional phrasing do you use when delegating a task or requesting assistance?",
      "How do you handle constructive feedback from your manager with professionalism?",
      "What do you say when facilitating a discussion and encouraging quiet members to contribute?",
      "How do you follow up on an overdue task with an external partner or colleague politely?",
      "How do you present the key benefits of a new project idea to senior leadership?"
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
      "Imagine meeting an important client at a networking event: how do you introduce yourself?",
      "How do you initiate small talk about the event before transitioning to business collaboration?",
      "What questions do you ask to understand their business priorities and challenges?",
      "How do you articulate your unique value proposition in two clear, compelling sentences?",
      "How do you politely handle an objection or concern raised by the client?",
      "What closing statements do you use to agree on a follow-up meeting next week?",
      "How do you follow up warmly after the conversation to build a long-term relationship?"
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
      "How do you use natural idioms and conversational connectors like 'To be honest' or 'As a matter of fact'?",
      "What natural phrases do you use to express subtle agreement, enthusiasm, or empathy?",
      "How do you soften a direct statement to sound more diplomatic and polite in conversation?",
      "What expressions do you use when thinking out loud or buying time to formulate an idea?",
      "How do you naturally express contrast or balance two sides of an argument?",
      "What conversational phrases help you summarize someone else's point to show active listening?",
      "How do you conclude a discussion with natural conversational rhythm and confidence?"
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
      "Deliver a confident one-minute speech sharing your key vision for your career and life.",
      "Present a persuasive argument on why continuous learning is essential in modern life.",
      "How do you express your personal leadership philosophy and values in English?",
      "Share an inspiring story about overcoming a major obstacle and what it taught you.",
      "What does speaking English with natural confidence mean to you personally?",
      "How will you inspire and mentor others who are beginning their language learning journey?",
      "Reflect on your transformation from Mission 1 to Mission 32: what are you most proud of?"
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
