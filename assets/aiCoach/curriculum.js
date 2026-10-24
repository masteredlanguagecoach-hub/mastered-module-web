/**
 * Official Mastered AI Coach Curriculum
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md
 * Exactly 32 missions. Mission 32 is terminal. Never Mission 33.
 */

(function () {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  var OFFICIAL_CURRICULUM = [
    {
      missionNumber: 1,
      title: "Module 1: Self Introduction",
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
      title: "Module 2: Talking About Other People",
      targetSentences: 30,
      grammarFocus: "Third-person singular (he/she/they), adjectives",
      situation: "Describing friends, colleagues, personality traits, and roles",
      starterPrompts: [
        "Describe your best friend or a close colleague in three complete sentences.",
        "What qualities make a person reliable and supportive at work?",
        "Tell me about a person who inspires you and explain why."
      ]
    },
    {
      missionNumber: 3,
      title: "Module 3: Family, Possessions & Demonstratives",
      targetSentences: 30,
      grammarFocus: "Possessive pronouns (my/his/her/their), this/that/these/those",
      situation: "Describing family relationships, personal belongings, and home",
      starterPrompts: [
        "Describe your family members and what roles they have.",
        "Choose an item near you and explain who owns it and what it is used for.",
        "Tell me about your favorite possession and why it is important to you."
      ]
    },
    {
      missionNumber: 4,
      title: "Module 4: Expressing Abilities & Polite Requests",
      targetSentences: 30,
      grammarFocus: "Modals: can, could, would, may",
      situation: "Expressing personal abilities, asking polite favors, workplace requests",
      starterPrompts: [
        "What are three professional skills you can perform exceptionally well?",
        "How would you politely ask your manager for permission to leave early?",
        "Ask a colleague politely to assist you with an urgent project deadline."
      ]
    },
    {
      missionNumber: 5,
      title: "Module 5: Daily Routines & Habits",
      targetSentences: 30,
      grammarFocus: "Simple present, adverbs of frequency (always, often, usually)",
      situation: "Morning routines, work schedules, daily commute, evening habits",
      starterPrompts: [
        "Walk me through your morning routine from the moment you wake up.",
        "How often do you exercise or read, and when do you usually do it?",
        "Describe how you structure your daily workflow to stay productive."
      ]
    },
    {
      missionNumber: 6,
      title: "Module 6: Actions Happening Now",
      targetSentences: 30,
      grammarFocus: "Present continuous (is/am/are + -ing)",
      situation: "Describing current activities, live scenes, temporary situations",
      starterPrompts: [
        "Look around your current space and describe three things currently happening.",
        "What major project or skill are you currently working on this week?",
        "Describe what people in a busy city park are doing right now."
      ]
    },
    {
      missionNumber: 7,
      title: "Module 7: Talking About Past Events",
      targetSentences: 30,
      grammarFocus: "Simple past (regular & irregular verbs), time markers (yesterday, ago)",
      situation: "Childhood memories, yesterday's activities, past trips",
      starterPrompts: [
        "Tell me in detail what you did yesterday after finishing work or studies.",
        "Describe a memorable trip you took a few years ago.",
        "What was the most rewarding challenge you overcame in the past?"
      ]
    },
    {
      missionNumber: 8,
      title: "Module 8: Future Plans & Intentions",
      targetSentences: 30,
      grammarFocus: "Future forms: going to, will, plan to",
      situation: "Weekend plans, upcoming goals, travel plans, next year's targets",
      starterPrompts: [
        "What are your specific plans for the upcoming weekend?",
        "Tell me about a major goal you are going to accomplish within six months.",
        "Where will you travel for your next vacation, and who will accompany you?"
      ]
    },
    {
      missionNumber: 9,
      title: "Module 9: Simple Present Mastery",
      targetSentences: 40,
      grammarFocus: "Question formation (do/does), negatives (don't/doesn't)",
      situation: "Inquiring about habits, clarifying schedules, general facts",
      starterPrompts: [
        "Ask me three questions about my daily working habits using 'Do' or 'Does'.",
        "Explain three things you don't do on weekends and why.",
        "State two universal scientific or general facts about the world."
      ]
    },
    {
      missionNumber: 10,
      title: "Module 10: Simple Present Playbook",
      targetSentences: 40,
      grammarFocus: "State vs dynamic verbs, habitual descriptions",
      situation: "Detailed lifestyle interviews, job role breakdowns, daily workflows",
      starterPrompts: [
        "Describe your exact job responsibilities using state and dynamic verbs.",
        "Explain how your preferred working habits differ from other colleagues.",
        "What does an ideal productive workday look like from start to finish?"
      ]
    },
    {
      missionNumber: 11,
      title: "Module 11: Simple Present Mastery Dashboard",
      targetSentences: 40,
      grammarFocus: "Extended conversational flow, connectors (because, although, however)",
      situation: "Explaining opinions on work-life balance, comparing routines",
      starterPrompts: [
        "Discuss your perspective on work-life balance using 'although' and 'however'.",
        "Why do many professionals struggle to maintain healthy daily habits?",
        "Compare remote work habits with office work habits in complete sentences."
      ]
    },
    {
      missionNumber: 12,
      title: "Module 12: Present Continuous Mastery",
      targetSentences: 40,
      grammarFocus: "Present continuous for future arrangements, dynamic descriptions",
      situation: "Organizing events, real-time commentary, project updates",
      starterPrompts: [
        "Tell me about meetings or events you are attending later this week.",
        "Give a live verbal commentary of a sporting event or busy office scene.",
        "Explain how modern technology is actively changing our communication habits."
      ]
    },
    {
      missionNumber: 13,
      title: "Module 13: Present Continuous Playbook",
      targetSentences: 40,
      grammarFocus: "Contrast between simple present and continuous",
      situation: "Describing trends, changes in technology, temporary projects",
      starterPrompts: [
        "Contrast what you usually do every day with what you are doing temporarily this week.",
        "What industry trends are developing rapidly in your field right now?",
        "Explain why temporary changes often lead to permanent workplace habits."
      ]
    },
    {
      missionNumber: 14,
      title: "Module 14: Past Tense Mastery",
      targetSentences: 40,
      grammarFocus: "Did you...? past negatives (didn't), irregular verb drill",
      situation: "Investigating past incidents, discussing historical events",
      starterPrompts: [
        "Ask me three investigative questions about an event that occurred last month.",
        "Explain three things you didn't manage to accomplish last week and why.",
        "Describe a major historical event and its lasting consequences."
      ]
    },
    {
      missionNumber: 15,
      title: "Module 15: Simple Past Mastery",
      targetSentences: 40,
      grammarFocus: "Sequencers (first, then, after that, finally)",
      situation: "Recounting step-by-step past experiences, recounting an achievement",
      starterPrompts: [
        "Recount step-by-step how you solved a difficult problem using sequencers.",
        "Tell me about a memorable project you completed from initial idea to final delivery.",
        "Describe your journey of learning your first professional skill."
      ]
    },
    {
      missionNumber: 16,
      title: "Module 16: Storytelling",
      targetSentences: 40,
      grammarFocus: "Narrative tenses, descriptive adjectives, atmosphere",
      situation: "Telling personal stories, memorable journeys, overcoming challenges",
      starterPrompts: [
        "Tell a 4-sentence story about a journey that took an unexpected turn.",
        "Describe a moment in your life when you felt genuine surprise.",
        "Share an inspiring story of a person who overcame tremendous obstacles."
      ]
    },
    {
      missionNumber: 17,
      title: "Module 17: Interrupted Actions",
      targetSentences: 40,
      grammarFocus: "Past continuous + simple past (was doing when something happened)",
      situation: "Describing unexpected interruptions, accidents, memorable moments",
      starterPrompts: [
        "Describe what you were doing when an unexpected phone call or news arrived.",
        "Tell me about an instance when a power outage or storm interrupted your work.",
        "Explain how you handled an unexpected interruption during an important meeting."
      ]
    },
    {
      missionNumber: 18,
      title: "Module 18: Present Perfect Mastery",
      targetSentences: 40,
      grammarFocus: "Present perfect (have/has + V3), ever, never, already, yet",
      situation: "Life experiences, travel history, personal milestones",
      starterPrompts: [
        "What are three meaningful life experiences you have had so far?",
        "Tell me about a country or city you have never visited but want to see.",
        "What significant professional milestones have you already achieved this year?"
      ]
    },
    {
      missionNumber: 19,
      title: "Module 19: Present Perfect Blueprint",
      targetSentences: 40,
      grammarFocus: "Present perfect vs simple past, since vs for",
      situation: "Career history, duration of habits, recent accomplishments",
      starterPrompts: [
        "How long have you lived in your current city or worked in your field (using 'for'/'since')?",
        "Compare a skill you started learning years ago with when you first discovered it.",
        "Explain the key accomplishments your team has delivered over the past six months."
      ]
    },
    {
      missionNumber: 20,
      title: "Module 20: Future Plans Blueprint",
      targetSentences: 40,
      grammarFocus: "Conditional future (if + present, will + verb)",
      situation: "Career aspirations, contingency plans, conditional scenarios",
      starterPrompts: [
        "If you receive an exceptional job opportunity abroad, what will you do?",
        "What will happen to your career if you achieve fluent English speaking skills?",
        "Outline a contingency plan for your team if a project deadline is moved forward."
      ]
    },
    {
      missionNumber: 21,
      title: "Module 21: Future Tense Mastery",
      targetSentences: 40,
      grammarFocus: "Future continuous (will be doing), predictions",
      situation: "Imagining life in 10 years, future industry forecasts, milestones",
      starterPrompts: [
        "What will you be doing at this exact time five years from today?",
        "Predict how artificial intelligence will be impacting education by 2030.",
        "Describe what major milestones your organization will be celebrating soon."
      ]
    },
    {
      missionNumber: 22,
      title: "Module 22: Future Continuous Mastery",
      targetSentences: 40,
      grammarFocus: "Specific future times, scheduling arrangements",
      situation: "Describing schedule at 3 PM tomorrow, business travel coordination",
      starterPrompts: [
        "What will you be working on at 3:00 PM tomorrow afternoon?",
        "Describe the schedule and travel arrangements you will be coordinating next week.",
        "Explain how you will be spending your time during your next professional training."
      ]
    },
    {
      missionNumber: 23,
      title: "Module 23: Ongoing Actions",
      targetSentences: 40,
      grammarFocus: "Present perfect continuous (have been doing)",
      situation: "Explaining ongoing projects, hobby progression, recent efforts",
      starterPrompts: [
        "What important project have you been developing over the past few weeks?",
        "How long have you been practicing spoken English on this platform?",
        "Explain an area of personal growth you have been focusing on recently."
      ]
    },
    {
      missionNumber: 24,
      title: "Module 24: Shopping and Retail English",
      targetSentences: 50,
      grammarFocus: "Inquiries, price negotiation, returns, sizing",
      situation: "Buying clothes, asking for discounts, resolving billing disputes",
      starterPrompts: [
        "Role-play asking a shop assistant for a different size and color of a jacket.",
        "How would you politely negotiate a discount for purchasing multiple items?",
        "Explain to a customer service clerk why you wish to return a defective electronic device."
      ]
    },
    {
      missionNumber: 25,
      title: "Module 25: Restaurant English",
      targetSentences: 50,
      grammarFocus: "Ordering food, dietary requests, compliments, complaints",
      situation: "Reserving a table, ordering meals, requesting bill, dining feedback",
      starterPrompts: [
        "Call a restaurant and reserve a table for four guests on Friday evening.",
        "Order a three-course meal while requesting dietary accommodations for allergies.",
        "Politely complain to the server that your order arrived cold and request a replacement."
      ]
    },
    {
      missionNumber: 26,
      title: "Module 26: Travel English",
      targetSentences: 50,
      grammarFocus: "Airport navigation, hotel check-in, asking directions",
      situation: "Boarding flights, customs inquiries, hotel room issues, sightseeing",
      starterPrompts: [
        "Ask an airport official for directions to your connecting departure gate.",
        "Check in at a hotel reception desk and request a quiet room on a high floor.",
        "Report to the airline baggage counter that your luggage did not arrive on the carousel."
      ]
    },
    {
      missionNumber: 27,
      title: "Module 27: Telephone Conversations",
      targetSentences: 50,
      grammarFocus: "Phone etiquette, taking messages, clarifying information",
      situation: "Answering business calls, transferring lines, dealing with bad connections",
      starterPrompts: [
        "Answer a formal business call on behalf of your executive director.",
        "Leave a concise, professional voicemail requesting a callback about an invoice.",
        "Handle a customer inquiry when the phone line has severe audio interference."
      ]
    },
    {
      missionNumber: 28,
      title: "Module 28: Job Interview English",
      targetSentences: 50,
      grammarFocus: "Professional strengths, STAR method, career goals",
      situation: "Self-introduction in interview, handling behavioral questions",
      starterPrompts: [
        "Answer the classic interview opener: 'Walk me through your resume and key strengths.'",
        "Describe a time you handled conflict within a team using the STAR method.",
        "Where do you see yourself contributing within this organization in three years?"
      ]
    },
    {
      missionNumber: 29,
      title: "Module 29: Corporate English",
      targetSentences: 50,
      grammarFocus: "Meeting participation, disagreeing politely, pitching ideas",
      situation: "Leading status meetings, proposing business strategies, team negotiations",
      starterPrompts: [
        "Pitch a new marketing or operational idea to your senior leadership team.",
        "Politely disagree with a proposed strategy during a project review meeting.",
        "Provide a structured update on key deliverables and mitigation steps for current risks."
      ]
    },
    {
      missionNumber: 30,
      title: "Module 30: English Mastery",
      targetSentences: 50,
      grammarFocus: "Idiomatic expressions, nuance, persuasive speech",
      situation: "Debating controversial topics, public speaking, influencing others",
      starterPrompts: [
        "Present a persuasive 4-sentence argument supporting renewable energy adoption.",
        "Explain how you influence stakeholders who are resistant to organizational change.",
        "Deliver a speech introducing a keynote speaker at an international conference."
      ]
    },
    {
      missionNumber: 31,
      title: "Module 31: Natural Fluency Upgrade",
      targetSentences: 50,
      grammarFocus: "Sentence variety, complex connectors, natural rhythm",
      situation: "Delivering impromptu speeches, analyzing complex world problems",
      starterPrompts: [
        "Deliver an impromptu speech on the importance of lifelong learning.",
        "Analyze the economic and social impacts of remote work on global business.",
        "Summarize a complex book or philosophical concept in clear, articulate English."
      ]
    },
    {
      missionNumber: 32,
      title: "Module 32: Professional English Mastery",
      targetSentences: 50,
      grammarFocus: "Executive communication, leadership presentation",
      situation: "Final comprehensive executive presentation, course defense",
      starterPrompts: [
        "Deliver your executive summary demonstrating your full mastery of English communication.",
        "Address a crisis communication scenario reassuring investors and team members.",
        "Reflect on your speaking transformation from Module 1 to Module 32."
      ]
    }
  ];

  function getMission(missionNumber) {
    var num = parseInt(missionNumber, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 32) num = 32; // Enforce terminal cap: Mission 32 is strictly final.
    return OFFICIAL_CURRICULUM[num - 1];
  }

  function getTargetForMission(missionNumber) {
    var num = parseInt(missionNumber, 10);
    if (num <= 8) return 30;
    if (num <= 23) return 40;
    return 50;
  }

  function getAllMissions() {
    return OFFICIAL_CURRICULUM.slice();
  }

  var MasteredCurriculum = {
    TOTAL_MISSIONS: 32,
    getAllMissions: getAllMissions,
    getMission: getMission,
    getTargetForMission: getTargetForMission
  };

  root.MasteredCurriculum = MasteredCurriculum;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredCurriculum;
  }
})();
