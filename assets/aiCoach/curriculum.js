/**
 * Official Mastered AI Coach Curriculum
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md & Section 7 Curriculum Specification
 * Exactly 32 missions. Mission 32 is terminal. Never Mission 33.
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
      missionNumber: 1,
      title: "Introduce Yourself",
      targetSentences: 30,
      grammarFocus: "Present tense, personal pronouns, 'to be'",
      situation: "Introducing name, profession, origin, hobbies, and background",
      starterPrompts: [
        "Please introduce yourself with your full name, profession, and where you are from.",
        "Tell me about two hobbies or activities you enjoy doing in your free time.",
        "What is your primary motivation for improving your English speaking skills?"
      ]
    },
    {
      missionNumber: 2,
      title: "Talk About Others",
      targetSentences: 30,
      grammarFocus: "Third-person singular (he/she/they), descriptive adjectives",
      situation: "Describing friends, colleagues, personality traits, and roles",
      starterPrompts: [
        "Describe your best friend or a close colleague in three complete sentences.",
        "What qualities make a person reliable and supportive at work?",
        "Tell me about a person who inspires you and explain why."
      ]
    },
    {
      missionNumber: 3,
      title: "Describe Your Family",
      targetSentences: 30,
      grammarFocus: "Possessive pronouns (my/his/her/their), family vocabulary",
      situation: "Describing family relationships, personal belongings, and home",
      starterPrompts: [
        "Describe your family members and what roles they have.",
        "Tell me about your favorite family tradition or celebration.",
        "How do you and your family usually spend weekends together?"
      ]
    },
    {
      missionNumber: 4,
      title: "Talk About What You Can Do",
      targetSentences: 30,
      grammarFocus: "Modal verbs: can, could, be able to",
      situation: "Expressing personal abilities, talents, and professional skills",
      starterPrompts: [
        "What are three professional skills you can perform exceptionally well?",
        "Tell me about a skill you could not do before but can do now.",
        "What new language or technical skill are you able to learn this year?"
      ]
    },
    {
      missionNumber: 5,
      title: "Talk About Responsibilities",
      targetSentences: 30,
      grammarFocus: "Obligation modals: must, have to, need to, responsible for",
      situation: "Work duties, daily obligations, family responsibilities",
      starterPrompts: [
        "What are your top three daily responsibilities at work or home?",
        "Explain what tasks you have to complete before ending your workday.",
        "How do you prioritize responsibilities when you have multiple deadlines?"
      ]
    },
    {
      missionNumber: 6,
      title: "Express Yourself Politely",
      targetSentences: 30,
      grammarFocus: "Polite modals: would you mind, could you please, may I",
      situation: "Workplace etiquette, asking favors, polite requests",
      starterPrompts: [
        "How would you politely ask a colleague for help with an urgent project?",
        "Ask your manager politely for permission to leave early today.",
        "How would you politely decline an invitation while remaining friendly?"
      ]
    },
    {
      missionNumber: 7,
      title: "Ask Like a Pro",
      targetSentences: 30,
      grammarFocus: "Wh- questions, inverted auxiliary questions, tag questions",
      situation: "Professional inquiries, interviewing others, gathering information",
      starterPrompts: [
        "Ask me three insightful questions about career development.",
        "How would you ask a client about their exact requirements for a project?",
        "Formulate two professional questions to ask during a team meeting."
      ]
    },
    {
      missionNumber: 8,
      title: "Handle Everyday English",
      targetSentences: 30,
      grammarFocus: "Common phrasal verbs, conversational idioms, daily survival phrases",
      situation: "Daily greetings, small talk, street directions, common social situations",
      starterPrompts: [
        "How do you start a friendly small talk conversation with a neighbor?",
        "Explain how someone can navigate from a subway station to the nearest bank.",
        "Describe how you handle a small misunderstanding politely in English."
      ]
    },
    {
      missionNumber: 9,
      title: "Talk About Your Daily Life",
      targetSentences: 40,
      grammarFocus: "Simple present, adverbs of frequency (always, often, rarely)",
      situation: "Morning routines, commute, workday structure, evening unwind",
      starterPrompts: [
        "Walk me through your typical morning routine from waking up until work.",
        "How often do you exercise or read, and when do you usually do it?",
        "Describe how you manage your evenings to relax and prepare for tomorrow."
      ]
    },
    {
      missionNumber: 10,
      title: "Express Your Likes and Opinions",
      targetSentences: 40,
      grammarFocus: "Opinion phrases (in my view, I prefer, I believe), gerunds vs infinitives",
      situation: "Debating preferences, sharing reviews, expressing viewpoints",
      starterPrompts: [
        "Do you prefer working remotely or in an office? Explain your reasons.",
        "Share your opinion on how modern technology affects human relationships.",
        "What kind of books or movies do you enjoy most, and why?"
      ]
    },
    {
      missionNumber: 11,
      title: "Ask, Answer and Communicate",
      targetSentences: 40,
      grammarFocus: "Direct and indirect speech, conversational connectors (however, moreover)",
      situation: "Two-way discussions, clarifying ambiguity, meeting participation",
      starterPrompts: [
        "How do you ask for clarification when you do not understand someone?",
        "Summarize what a teammate told you recently using indirect speech.",
        "Explain your point of view in a group discussion using linking words."
      ]
    },
    {
      missionNumber: 12,
      title: "Talk About What's Happening Now",
      targetSentences: 40,
      grammarFocus: "Present continuous (is/am/are + -ing), dynamic vs stative verbs",
      situation: "Describing live scenes, ongoing tasks, current temporary situations",
      starterPrompts: [
        "Look around your room or window and describe what is happening right now.",
        "What major project or skill are you currently working on this week?",
        "Describe the actions taking place in a busy airport terminal."
      ]
    },
    {
      missionNumber: 13,
      title: "Communicate About Current and Future Activities",
      targetSentences: 40,
      grammarFocus: "Present continuous for future arrangements, 'going to' for plans",
      situation: "Scheduling appointments, upcoming weekend plans, project milestones",
      starterPrompts: [
        "What are your plans for this coming weekend? Use 'going to' and continuous.",
        "Describe the major milestones you are completing over the next month.",
        "How do you coordinate calendar schedules with a busy colleague?"
      ]
    },
    {
      missionNumber: 14,
      title: "Talk About Yesterday",
      targetSentences: 40,
      grammarFocus: "Simple past regular and irregular verbs, past time markers",
      situation: "Recounting yesterday's actions, unexpected events, accomplishments",
      starterPrompts: [
        "Tell me step-by-step what you did yesterday from morning to night.",
        "Describe a challenge or unexpected event you resolved yesterday.",
        "What was the most productive task you accomplished yesterday?"
      ]
    },
    {
      missionNumber: 15,
      title: "Talk About Past Experiences",
      targetSentences: 40,
      grammarFocus: "Present perfect (have + past participle) vs simple past",
      situation: "Life achievements, travel experiences, skills acquired over time",
      starterPrompts: [
        "Have you ever traveled to another country or city? Describe the experience.",
        "Tell me about a skill you have learned and how long you have practiced it.",
        "What is the most memorable project you have completed in your career?"
      ]
    },
    {
      missionNumber: 16,
      title: "Tell a Short Story",
      targetSentences: 40,
      grammarFocus: "Narrative tenses, chronological connectors (first, then, suddenly, finally)",
      situation: "Storytelling, recounting an anecdote, sharing an adventure",
      starterPrompts: [
        "Tell me a short story about an adventure or memorable day in your life.",
        "Narrate an amusing or surprising event that happened to you recently.",
        "How did you overcome an obstacle in your education or career?"
      ]
    },
    {
      missionNumber: 17,
      title: "Describe What Was Happening",
      targetSentences: 40,
      grammarFocus: "Past continuous (was/were + -ing), interrupted past with 'when' / 'while'",
      situation: "Describing background scenes in the past, simultaneous actions",
      starterPrompts: [
        "What were you doing when an important news event occurred?",
        "Describe what everyone in your office or home was doing at 2 PM yesterday.",
        "Explain what happened while you were commuting or traveling recently."
      ]
    },
    {
      missionNumber: 18,
      title: "Share Your Life Journey",
      targetSentences: 40,
      grammarFocus: "Past perfect (had + participle), used to, life milestones",
      situation: "Personal autobiography, career milestones, major transitions",
      starterPrompts: [
        "Describe where you used to live and how your lifestyle has changed.",
        "Explain the key milestones that led you to your current profession.",
        "What had you achieved before taking on your current life goal?"
      ]
    },
    {
      missionNumber: 19,
      title: "Talk About Recent Actions",
      targetSentences: 40,
      grammarFocus: "Present perfect continuous (have been + -ing), just, already, yet",
      situation: "Recent activities with present effects, ongoing projects",
      starterPrompts: [
        "What project or hobby have you been focusing on recently?",
        "Explain what you have just completed in your speaking practice today.",
        "What goals have you already achieved this month and what is not yet done?"
      ]
    },
    {
      missionNumber: 20,
      title: "Talk About Your Future Plans",
      targetSentences: 40,
      grammarFocus: "Future forms: will, be going to, planning to, intend to",
      situation: "1-year and 5-year goals, career aspirations, family plans",
      starterPrompts: [
        "Where do you see yourself professionally in two years? Describe your plan.",
        "What concrete steps are you going to take to achieve English fluency?",
        "Describe a major personal goal you intend to accomplish next year."
      ]
    },
    {
      missionNumber: 21,
      title: "Make Promises and Predictions",
      targetSentences: 40,
      grammarFocus: "Will for spontaneous decisions and promises, likely to, might",
      situation: "Work commitments, future trends, technology predictions",
      starterPrompts: [
        "Make three commitments to yourself regarding your daily practice routine.",
        "What major technological predictions do you make for the next decade?",
        "How will artificial intelligence likely transform global communication?"
      ]
    },
    {
      missionNumber: 22,
      title: "Describe Future Ongoing Actions",
      targetSentences: 40,
      grammarFocus: "Future continuous (will be + -ing), time clauses with future meaning",
      situation: "Future schedules, visualizing upcoming life events",
      starterPrompts: [
        "What will you be doing at this exact time tomorrow?",
        "Describe what you will be working on by the middle of next year.",
        "When you achieve full fluency, how will you be using English daily?"
      ]
    },
    {
      missionNumber: 23,
      title: "Talk About Ongoing Activities",
      targetSentences: 40,
      grammarFocus: "Contrast between simple, continuous, and perfect aspects",
      situation: "Status updates, stand-up meetings, project progress reviews",
      starterPrompts: [
        "Deliver a 2-minute status update on your current professional priorities.",
        "Explain how ongoing team collaboration is proceeding on your projects.",
        "What challenges are you currently resolving in your daily workflow?"
      ]
    },
    {
      missionNumber: 24,
      title: "Shopping Conversation",
      targetSentences: 50,
      grammarFocus: "Comparative & superlative adjectives, price inquiries, refund phrases",
      situation: "Retail store, comparing products, negotiating prices, returns",
      starterPrompts: [
        "Ask a shop assistant to compare two different laptop or phone models.",
        "How would you explain that an item is defective and request an exchange?",
        "Describe how you negotiate a discount politely at an electronics market."
      ]
    },
    {
      missionNumber: 25,
      title: "Order Food Confidently",
      targetSentences: 50,
      grammarFocus: "Restaurant vocabulary, conditional requests ('I would like', 'could we get')",
      situation: "Fine dining, dietary restrictions, paying the bill, tipping etiquette",
      starterPrompts: [
        "Order a three-course dinner for two guests at a fine dining restaurant.",
        "Explain a dietary restriction or allergy politely to the head server.",
        "How do you address a wrong dish or an overcooked meal with the manager?"
      ]
    },
    {
      missionNumber: 26,
      title: "Handle Travel Conversations Confidently",
      targetSentences: 50,
      grammarFocus: "Airport and hotel vocabulary, checking in, directions, transit",
      situation: "International airports, hotel check-in, customs immigration, lost luggage",
      starterPrompts: [
        "Explain your purpose of visit and accommodation details to an immigration officer.",
        "Check into a luxury hotel and request a quiet room with a high floor view.",
        "Report a lost suitcase to the airline baggage counter with specific details."
      ]
    },
    {
      missionNumber: 27,
      title: "Handle Telephone Conversations Confidently",
      targetSentences: 50,
      grammarFocus: "Telephone etiquette, taking messages, spelling names with phonetics",
      situation: "Professional phone calls, customer service, conference scheduling",
      starterPrompts: [
        "Answer a business phone call, take a detailed message, and confirm details.",
        "Call customer support to resolve a billing error on your account.",
        "Schedule an urgent teleconference with an overseas client across time zones."
      ]
    },
    {
      missionNumber: 28,
      title: "Handle a Job Interview Confidently",
      targetSentences: 50,
      grammarFocus: "STAR method (Situation, Task, Action, Result), professional accomplishments",
      situation: "Job interview, answering behavioral questions, salary discussions",
      starterPrompts: [
        "Answer the interview prompt: 'Tell me about yourself and your career focus.'",
        "Describe a major conflict or challenge at work and how you resolved it.",
        "Explain why you are the ideal candidate for this senior role."
      ]
    },
    {
      missionNumber: 29,
      title: "Communicate Professionally at Work",
      targetSentences: 50,
      grammarFocus: "Executive presence, diplomatic phrasing, persuasive argumentation",
      situation: "Boardroom presentations, cross-functional collaboration, client pitching",
      starterPrompts: [
        "Pitch a new initiative or process improvement to company leadership.",
        "Deliver constructive feedback to a junior team member empathetically.",
        "Lead a project kickoff meeting and assign clear deliverables."
      ]
    },
    {
      missionNumber: 30,
      title: "Complete a Real-Life Conversation Confidently",
      targetSentences: 50,
      grammarFocus: "Spontaneous conversational repair, nuance, natural English idioms",
      situation: "Extended unscripted social conversation, networking mixer, dinner party",
      starterPrompts: [
        "Network with an executive at an international industry conference mixer.",
        "Discuss your philosophy on balancing ambition with personal happiness.",
        "Engage in a friendly debate on the future of remote work vs office work."
      ]
    },
    {
      missionNumber: 31,
      title: "Speak Like a Native",
      targetSentences: 50,
      grammarFocus: "Advanced collocations, natural rhythm, connected speech, nuance",
      situation: "Deep intellectual discussions, emotional expression, humor, subtlety",
      starterPrompts: [
        "Analyze a complex social or economic trend using advanced collocations.",
        "Tell an engaging personal story with humor, suspense, and natural cadence.",
        "Articulate your long-term legacy and the impact you want to create."
      ]
    },
    {
      missionNumber: 32,
      title: "Speak Like a Confident English Speaker",
      targetSentences: 50,
      grammarFocus: "Mastery of all tenses, persuasive rhetoric, keynote delivery",
      situation: "Graduation speech, keynote address, master-level fluency showcase",
      starterPrompts: [
        "Deliver a powerful 3-minute keynote address on overcoming adversity.",
        "Reflect on your 32-mission journey and describe how your fluency has transformed.",
        "Share an inspiring message to empower new students beginning their English journey."
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
