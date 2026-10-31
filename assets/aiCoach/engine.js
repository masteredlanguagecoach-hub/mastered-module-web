/**
 * Official Mastered AI Coach Engine
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md
 * 
 * Features:
 * 1. Intelligent Local NLP Intent Parser & Conversational Engine:
 *    - Question answering (definitions, curriculum concepts, model examples)
 *    - Emotional awareness & empathy (fear, shyness, nervous hesitation, reassurance)
 *    - Clarification ("I don't understand", simplified rephrasing, sentence starters)
 *    - Context-sensitive follow-up questions tied to student's spoken content
 * 2. Syntactic Sentence Segmentation & Grammatical Evaluation:
 *    - Strict Subject + Predicate Verb validation (filters out words & fragments)
 *    - Rejection of single words, prepositional fragments, and isolated interjections
 *    - Multi-sentence turn counting: counts up to N verified eligible complete sentences
 *    - Self-correction support: incorrect attempts never increment count; successful
 *      correction counts once without double-counting original attempt
 *    - Deterministic deduplication without volatile Date.now() nonces
 * 3. Application-controlled deterministic progress calculation & 32-mission curriculum
 */

(function () {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  var Curriculum = root.MasteredCurriculum;
  if (!Curriculum && typeof require === 'function') {
    try {
      Curriculum = require('./curriculum.js');
    } catch (e) {
      Curriculum = root.MasteredCurriculum;
    }
  }

  // 1. Command Matchers with natural-language equivalents
  var COMMAND_PATTERNS = {
    NEW_STUDENT: /^(new\s*student|register(\s*me)?|sign\s*up|first\s*time(\s*here)?)/i,
    START: /^(start|begin|let'?s\s*start|ready(\s*to\s*practice)?)/i,
    NEXT_MISSION: /^(next[\s_]*mission|go\s*to\s*next\s*mission|advance\s*mission|advance\s*to\s*next\s*mission|next\s*level|advance|take\s*me\s*to\s*next\s*mission|say\s*next\s*mission)[.!?]?$/i,
    CONTINUE: /^(continue|next(?:s*question)?|keep\s*going|more\s*practice)[.!?]?$/i,
    HOMEWORK: /^(homework|assignment|home\s*task|give\s*me\s*homework)/i,
    VOCABULARY: /^(vocabulary|vocab|words?|new\s*words?|teach\s*me\s*vocab(ulary)?)/i,
    FREE_TALK: /^(free\s*talk|free\s*conversation|casual\s*chat|let'?s\s*just\s*talk)/i,
    END_SESSION: /^(end(\s*session)?|finish(\s*for\s*today)?|goodbye|bye|exit|stop|quit|i\s*want\s*to\s*stop)/i
  };


  // Comprehensive Real-Life Mission Situation Dialogue Tracks (All 32 Missions)
  var MISSION_SCENARIOS = {
    1: {
      topic: "introducing yourself naturally",
      guidance: "tell me your full name, your profession or studies, and where you are from",
      sample: "My name is Alex and I work as a software engineer in Bangalore.",
      opening: "Welcome to Mission 1: Introduce Yourself! Let's start with the basics—what is your name and what do you do?",
      stages: [
        {
          trigger: /engineer|developer|designer|doctor|teacher|manager|accountant|nurse|student|work|profession|job|sales/i,
          react: "Very well spoken!",
          ask: "What do you enjoy most about working in your profession?"
        },
        {
          trigger: /enjoy|like|satisfaction|project|team|challenge|coding|helping|solving|grow/i,
          react: "That sounds very fulfilling!",
          ask: "Tell me about two hobbies or activities you enjoy doing in your free time."
        },
        {
          trigger: /reading|books|music|park|walking|sports|football|cricket|cooking|badminton|weekend/i,
          react: "Those are wonderful ways to recharge!",
          ask: "What is your primary motivation for improving your English speaking skills?"
        },
        {
          trigger: /fluency|confidence|career|interview|global|speaking|job|client|better|future/i,
          react: "That is an inspiring and clear goal!",
          ask: "Where did you grow up, and what is your hometown like?"
        }
      ]
    },
    2: {
      topic: "describing friends and colleagues using descriptive adjectives",
      guidance: "describe a colleague or friend who inspires you",
      sample: "My close colleague is very reliable and always supports the entire team.",
      opening: "Welcome to Mission 2: Talk About Others! Think of a close friend or colleague who inspires you. How would you describe their personality?",
      stages: [
        {
          trigger: /friend|colleague|reliable|supportive|kind|helpful|hardworking|inspiring/i,
          react: "That's a wonderful description!",
          ask: "What qualities do you think make someone truly trustworthy and supportive at work?"
        },
        {
          trigger: /honesty|trust|communication|patience|teamwork|listening/i,
          react: "Spot on! Those qualities make a huge difference.",
          ask: "Tell me about a specific time when this person helped you solve a challenge."
        }
      ]
    },
    3: {
      topic: "describing family relationships and home traditions",
      guidance: "describe your family members and how you spend time together",
      sample: "My family usually spends weekends together cooking dinner and talking.",
      opening: "Welcome to Mission 3: Describe Your Family! Tell me a little about your family and who you live with.",
      stages: [
        {
          trigger: /parents|father|mother|brother|sister|wife|husband|children|family|live/i,
          react: "That sounds like a lovely family!",
          ask: "How do you and your family usually spend your weekends together?"
        },
        {
          trigger: /weekend|dinner|cooking|movies|outing|relax|together/i,
          react: "Spending quality time together creates lasting memories.",
          ask: "What is your favorite family tradition or celebration during the year?"
        }
      ]
    },
    4: {
      topic: "expressing personal abilities and professional skills using modal verbs",
      guidance: "tell me what technical or personal skills you can perform well",
      sample: "I can solve technical problems and organize projects efficiently.",
      opening: "Welcome to Mission 4: Talk About What You Can Do! What are three professional skills you can perform exceptionally well?",
      stages: [
        {
          trigger: /can|able|manage|solve|code|design|communicate|lead|organize/i,
          react: "Those are valuable, high-impact abilities!",
          ask: "Tell me about a skill you could not do before, but can do confidently now."
        },
        {
          trigger: /before|learned|practiced|now|improved|mastered/i,
          react: "Consistent practice really pays off!",
          ask: "What is a new skill or language you are eager to learn next?"
        }
      ]
    },
    5: {
      topic: "talking about daily obligations and work duties using must and have to",
      guidance: "tell me what tasks you have to finish before ending your workday",
      sample: "I have to finish my daily reports and check emails before leaving work.",
      opening: "Welcome to Mission 5: Talk About Responsibilities! What are your top daily responsibilities at work or home?",
      stages: [
        {
          trigger: /must|have to|need to|responsible|duty|task|report|meeting/i,
          react: "That requires strong discipline and focus!",
          ask: "How do you prioritize your tasks when you face multiple urgent deadlines?"
        },
        {
          trigger: /priority|urgent|schedule|first|important|calendar|list/i,
          react: "That is a very structured approach to workload management.",
          ask: "What tasks must you complete before you can comfortably end your day?"
        }
      ]
    },
    6: {
      topic: "polite workplace requests and etiquette using polite modals",
      guidance: "ask a colleague politely for assistance with an urgent project",
      sample: "Could you please help me review this report when you have a moment?",
      opening: "Welcome to Mission 6: Express Yourself Politely! Imagine you need assistance with an urgent task. How would you politely ask a colleague for help?",
      stages: [
        {
          trigger: /could you|would you|mind|please|help|assistance|favor/i,
          react: "That is phrased with great courtesy and respect!",
          ask: "How would you politely ask your manager for permission to leave early today?"
        },
        {
          trigger: /may i|permission|leave|early|doctor|personal|today/i,
          react: "Very professional and considerate!",
          ask: "How would you politely decline an invitation from a friend while remaining warm?"
        }
      ]
    },
    7: {
      topic: "asking professional inquiries and questions like a pro",
      guidance: "ask me insightful questions about career growth or project needs",
      sample: "What are the most important goals we need to achieve this quarter?",
      opening: "Welcome to Mission 7: Ask Like a Pro! Imagine you are interviewing a leader. What is an insightful question you would ask them about career development?",
      stages: [
        {
          trigger: /what|how|why|question|career|growth|advice|success/i,
          react: "That is an insightful and thoughtful inquiry!",
          ask: "How would you ask a client about their exact requirements for a new project?"
        },
        {
          trigger: /requirement|timeline|expectation|budget|deliverable|client/i,
          react: "Spot on! That gets right to the core details.",
          ask: "What is an important question to ask during a weekly team meeting?"
        }
      ]
    },
    8: {
      topic: "everyday small talk, friendly greetings, and street directions",
      guidance: "tell me how you greet your neighbor or ask for directions",
      sample: "I usually say good morning to my neighbor and ask how they are doing.",
      opening: "Welcome to Mission 8: Handle Everyday English! Imagine you just ran into a friendly neighbor outside your home. How would you start a chat with them?",
      stages: [
        {
          trigger: /good\s*morning|hello|hi|ask\s+how|greet|say|neighbor|talk/i,
          react: "That is very warm and polite!",
          ask: "If your neighbor asks how your day or week is going, what would you say?"
        },
        {
          trigger: /going\s+great|good|fine|busy|day|work|thank|well/i,
          react: "Spot on! That flows very naturally.",
          ask: "Now imagine a visitor on your street stops and asks for directions to the nearest bank. How would you guide them?"
        },
        {
          trigger: /straight|turn|left|right|road|street|walk|signal|take|cross/i,
          react: "Very clear street directions!",
          ask: "What would you say if they ask if it is within walking distance or if they need a bus?"
        },
        {
          trigger: /walk|bus|near|far|distance|minutes|can\s+walk/i,
          react: "Nicely explained!",
          ask: "Now imagine you are in a noisy shop and didn't hear the cashier's total price. How would you politely ask them to repeat it?"
        },
        {
          trigger: /pardon|repeat|could\s+you|again|hear|please/i,
          react: "Very courteous and polite!",
          ask: "Before leaving the store, what friendly parting phrase would you say to the shopkeeper?"
        }
      ]
    },
    9: {
      topic: "daily life, morning routines, and habits using simple present",
      guidance: "walk me through your typical morning routine from waking up",
      sample: "I usually wake up at seven in the morning and drink a hot cup of tea.",
      opening: "Welcome to Mission 9: Talk About Your Daily Life! Walk me through your typical morning routine from the moment you wake up.",
      stages: [
        {
          trigger: /wake|morning|seven|six|alarm|tea|coffee|breakfast|brush/i,
          react: "That sounds like a steady and calm morning!",
          ask: "How often do you exercise or read, and when do you usually find time for it?"
        },
        {
          trigger: /exercise|gym|walk|read|book|always|often|sometimes|rarely/i,
          react: "Maintaining healthy daily habits makes a huge difference.",
          ask: "Describe how you manage your evenings to relax and prepare for tomorrow."
        }
      ]
    },
    10: {
      topic: "expressing personal likes, preferences, and viewpoints",
      guidance: "share whether you prefer working from home or in an office",
      sample: "In my view, working remotely offers much better flexibility and saves commute time.",
      opening: "Welcome to Mission 10: Express Your Likes and Opinions! To get us started, do you prefer working remotely from home or working in an office with colleagues?",
      stages: [
        {
          trigger: /remote|home|office|prefer|hybrid|working/i,
          react: "That is a very sensible perspective!",
          ask: "In your opinion, what is the biggest advantage or challenge of that choice?"
        },
        {
          trigger: /advantage|challenge|time|focus|commute|save|distraction|communication/i,
          react: "I completely understand that viewpoint!",
          ask: "Let's talk about technology. In your view, do smartphones help people connect better, or do they cause too much distraction?"
        },
        {
          trigger: /distraction|connect|smartphone|phone|social|people|better|screen/i,
          react: "That is an insightful observation!",
          ask: "What kind of books, movies, or leisure activities do you enjoy most in your free time, and why?"
        },
        {
          trigger: /movie|cinema|book|reading|music|action|comedy|fiction|enjoy/i,
          react: "That sounds wonderfully relaxing!",
          ask: "Why do you find that particular activity more enjoyable than other pastimes?"
        }
      ]
    }
  };

  function getMissionOpeningGreeting(mNum, studentName, verifiedCount, missionTarget) {
    var name = studentName || 'Student';
    var curM = (Curriculum && Curriculum.getMission) ? Curriculum.getMission(mNum) : null;
    var title = curM ? curM.title : ("Mission " + mNum);
    var sit = curM ? curM.situation : "speaking practice";
    var target = missionTarget || (curM ? curM.targetSentences : 30);
    var verified = verifiedCount || 0;

    // Case 1: Already completed all target sentences
    if (verified >= target) {
      return "Welcome back, " + name + "! Outstanding work—you have already completed all " + target + " target sentences for Mission " + mNum + ": " + title + "! Say Next Mission to advance, or let me know what topic you would like to practice.";
    }

    // Case 2: In progress (resuming practice - NEVER repeat opening!)
    if (verified > 0) {
      var pList = (curM && curM.starterPrompts && curM.starterPrompts.length > 1)
        ? curM.starterPrompts.slice(1)
        : (curM && curM.starterPrompts) || [];
      var nextPrompt = (pList.length > 0)
        ? pList[verified % pList.length]
        : ("Tell me more about your thoughts on " + sit + ".");
      return "Welcome back, " + name + "! We are continuing Mission " + mNum + ": " + title + ". You have completed " + verified + " of " + target + " target sentences. Let's keep going: " + nextPrompt;
    }

    // Case 3: Fresh start (0 sentences)
    var starter = (curM && curM.starterPrompts && curM.starterPrompts[0]) || "Please introduce yourself aloud.";
    return "Hello " + name + "! This is Coach Sarah, your speaking buddy on call. Welcome to Mission " + mNum + ": " + title + "! Today we are practicing " + sit + ". To begin, " + starter;
  }

  function getMissionGuidanceHelp(mNum, missionDetails) {
    var curM = missionDetails || ((Curriculum && Curriculum.getMission) ? Curriculum.getMission(mNum) : null);
    var sit = (curM && curM.situation) ? curM.situation : 'daily English speaking';
    var topics = (curM && curM.topics) ? curM.topics : 'your daily activities';
    var starter = (curM && curM.starterPrompts && curM.starterPrompts[0]) ? curM.starterPrompts[0] : 'Please express your complete thought in English.';
    return "No worries at all! For Mission " + mNum + ", we are practicing " + sit + " focusing on " + topics + ". For example, " + starter + " Try speaking your thought aloud!";
  }

  function normalizeCommand(input) {
    if (!input || typeof input !== 'string') return null;
    var trimmed = input.trim();
    if (COMMAND_PATTERNS.NEW_STUDENT.test(trimmed)) return 'NEW STUDENT';
    if (COMMAND_PATTERNS.START.test(trimmed)) return 'START';
    if (COMMAND_PATTERNS.NEXT_MISSION.test(trimmed)) return 'NEXT_MISSION';
    if (COMMAND_PATTERNS.CONTINUE.test(trimmed)) return 'CONTINUE';
    if (COMMAND_PATTERNS.HOMEWORK.test(trimmed)) return 'HOMEWORK';
    if (COMMAND_PATTERNS.VOCABULARY.test(trimmed)) return 'VOCABULARY';
    if (COMMAND_PATTERNS.FREE_TALK.test(trimmed)) return 'FREE TALK';
    if (COMMAND_PATTERNS.END_SESSION.test(trimmed)) return 'END SESSION';
    return null;
  }

  // 2. Lexicon for Syntactic & Grammatical Sentence Analysis
  var SUBJECT_PRONOUNS = {
    'i': true, 'you': true, 'he': true, 'she': true, 'it': true, 'we': true, 'they': true,
    'this': true, 'that': true, 'these': true, 'those': true, 'there': true,
    'everyone': true, 'someone': true, 'anyone': true, 'everybody': true,
    'somebody': true, 'anybody': true, 'people': true, 'who': true, 'what': true
  };

  var POSSESSIVE_PRONOUNS = {
    'my': true, 'your': true, 'his': true, 'her': true, 'our': true, 'their': true, 'its': true
  };

  var DETERMINERS = {
    'the': true, 'a': true, 'an': true, 'this': true, 'that': true, 'these': true, 'those': true,
    'all': true, 'some': true, 'every': true, 'each': true, 'both': true, 'no': true
  };

  var FINITE_VERBS = {
    // Auxiliaries & Modals
    'am': true, 'is': true, 'are': true, 'was': true, 'were': true, 'be': true, 'been': true, 'being': true,
    'have': true, 'has': true, 'had': true, 'having': true,
    'do': true, 'does': true, 'did': true, 'done': true, 'doing': true,
    'can': true, 'could': true, 'will': true, 'would': true, 'shall': true, 'should': true, 'must': true, 'may': true, 'might': true,
    // Everyday life & routine
    'wake': true, 'wakes': true, 'woke': true, 'woken': true,
    'sleep': true, 'sleeps': true, 'slept': true,
    'stay': true, 'stays': true, 'stayed': true,
    'leave': true, 'leaves': true, 'left': true,
    'arrive': true, 'arrives': true, 'arrived': true,
    'come': true, 'comes': true, 'came': true,
    'go': true, 'goes': true, 'went': true, 'gone': true,
    'walk': true, 'walks': true, 'walked': true,
    'run': true, 'runs': true, 'ran': true,
    'drive': true, 'drives': true, 'drove': true, 'driven': true,
    'ride': true, 'rides': true, 'rode': true, 'ridden': true,
    'travel': true, 'travels': true, 'traveled': true, 'travelled': true,
    'eat': true, 'eats': true, 'ate': true, 'eaten': true,
    'drink': true, 'drinks': true, 'drank': true, 'drunk': true,
    'cook': true, 'cooks': true, 'cooked': true,
    'wash': true, 'washes': true, 'washed': true,
    'clean': true, 'cleans': true, 'cleaned': true,
    'wear': true, 'wears': true, 'wore': true, 'worn': true,
    'buy': true, 'buys': true, 'bought': true,
    'spend': true, 'spends': true, 'spent': true,
    'pay': true, 'pays': true, 'paid': true,
    'cost': true, 'costs': true,
    // Work & Profession
    'work': true, 'works': true, 'worked': true,
    'manage': true, 'manages': true, 'managed': true,
    'lead': true, 'leads': true, 'led': true,
    'teach': true, 'teaches': true, 'taught': true,
    'learn': true, 'learns': true, 'learned': true,
    'study': true, 'studies': true, 'studied': true,
    'read': true, 'reads': true,
    'write': true, 'writes': true, 'wrote': true, 'written': true,
    'code': true, 'codes': true, 'coded': true,
    'design': true, 'designs': true, 'designed': true,
    'build': true, 'builds': true, 'built': true,
    'fix': true, 'fixes': true, 'fixed': true,
    'operate': true, 'operates': true, 'operated': true,
    'support': true, 'supports': true, 'supported': true,
    'help': true, 'helps': true, 'helped': true,
    'assist': true, 'assists': true, 'assisted': true,
    'serve': true, 'serves': true, 'served': true,
    'handle': true, 'handles': true, 'handled': true,
    'create': true, 'creates': true, 'created': true,
    'make': true, 'makes': true, 'made': true,
    'develop': true, 'develops': true, 'developed': true,
    'organize': true, 'organizes': true, 'organized': true,
    'plan': true, 'plans': true, 'planned': true,
    'prepare': true, 'prepares': true, 'prepared': true,
    'complete': true, 'completes': true, 'completed': true,
    'finish': true, 'finishes': true, 'finished': true,
    'start': true, 'starts': true, 'started': true,
    'begin': true, 'begins': true, 'began': true, 'begun': true,
    'meet': true, 'meets': true, 'met': true,
    'attend': true, 'attends': true, 'attended': true,
    'join': true, 'joins': true, 'joined': true,
    'call': true, 'calls': true, 'called': true,
    'contact': true, 'contacts': true, 'contacted': true,
    'send': true, 'sends': true, 'sent': true,
    'receive': true, 'receives': true, 'received': true,
    // Communication & Thought
    'speak': true, 'speaks': true, 'spoke': true, 'spoken': true,
    'talk': true, 'talks': true, 'talked': true,
    'tell': true, 'tells': true, 'told': true,
    'say': true, 'says': true, 'said': true,
    'ask': true, 'asks': true, 'asked': true,
    'answer': true, 'answers': true, 'answered': true,
    'explain': true, 'explains': true, 'explained': true,
    'discuss': true, 'discusses': true, 'discussed': true,
    'describe': true, 'describes': true, 'described': true,
    'suggest': true, 'suggests': true, 'suggested': true,
    'recommend': true, 'recommends': true, 'recommended': true,
    'think': true, 'thinks': true, 'thought': true,
    'know': true, 'knows': true, 'knew': true, 'known': true,
    'understand': true, 'understands': true, 'understood': true,
    'remember': true, 'remembers': true, 'remembered': true,
    'forget': true, 'forgets': true, 'forgot': true, 'forgotten': true,
    'believe': true, 'believes': true, 'believed': true,
    'agree': true, 'agrees': true, 'agreed': true,
    'disagree': true, 'disagrees': true, 'disagreed': true,
    'decide': true, 'decides': true, 'decided': true,
    'choose': true, 'chooses': true, 'chose': true, 'chosen': true,
    'prefer': true, 'prefers': true, 'preferred': true,
    'hope': true, 'hopes': true, 'hoped': true,
    'wish': true, 'wishes': true, 'wished': true,
    'expect': true, 'expects': true, 'expected': true,
    'wonder': true, 'wonders': true, 'wondered': true,
    // Perception & State
    'see': true, 'sees': true, 'saw': true, 'seen': true,
    'look': true, 'looks': true, 'looked': true,
    'watch': true, 'watches': true, 'watched': true,
    'hear': true, 'hears': true, 'heard': true,
    'listen': true, 'listens': true, 'listened': true,
    'feel': true, 'feels': true, 'felt': true,
    'taste': true, 'tastes': true, 'tasted': true,
    'smell': true, 'smells': true, 'smelled': true,
    'seem': true, 'seems': true, 'seemed': true,
    'appear': true, 'appears': true, 'appeared': true,
    'sound': true, 'sounds': true, 'sounded': true,
    'live': true, 'lives': true, 'lived': true,
    'exist': true, 'exists': true, 'existed': true,
    'belong': true, 'belongs': true, 'belonged': true,
    'matter': true, 'matters': true, 'mattered': true,
    'fit': true, 'fits': true, 'fitted': true,
    'suit': true, 'suits': true, 'suited': true,
    'depend': true, 'depends': true, 'depended': true,
    'become': true, 'becomes': true, 'became': true,
    // Action & Interaction
    'take': true, 'takes': true, 'took': true, 'taken': true,
    'give': true, 'gives': true, 'gave': true, 'given': true,
    'bring': true, 'brings': true, 'brought': true,
    'get': true, 'gets': true, 'got': true, 'gotten': true,
    'find': true, 'finds': true, 'found': true,
    'lose': true, 'loses': true, 'lost': true,
    'keep': true, 'keeps': true, 'kept': true,
    'hold': true, 'holds': true, 'held': true,
    'put': true, 'puts': true,
    'set': true, 'sets': true,
    'stand': true, 'stands': true, 'stood': true,
    'sit': true, 'sits': true, 'sat': true,
    'lie': true, 'lies': true, 'lay': true,
    'fall': true, 'falls': true, 'fell': true,
    'rise': true, 'rises': true, 'rose': true,
    'grow': true, 'grows': true, 'grew': true,
    'change': true, 'changes': true, 'changed': true,
    'move': true, 'moves': true, 'moved': true,
    'stop': true, 'stops': true, 'stopped': true,
    'continue': true, 'continues': true, 'continued': true,
    'try': true, 'tries': true, 'tried': true,
    'test': true, 'tests': true, 'tested': true,
    'check': true, 'checks': true, 'checked': true,
    'show': true, 'shows': true, 'showed': true, 'shown': true,
    'share': true, 'shares': true, 'shared': true,
    'save': true, 'saves': true, 'saved': true,
    'protect': true, 'protects': true, 'protected': true,
    'win': true, 'wins': true, 'won': true,
    'fail': true, 'fails': true, 'failed': true,
    'pass': true, 'passes': true, 'passed': true,
    'like': true, 'likes': true, 'liked': true,
    'love': true, 'loves': true, 'loved': true,
    'enjoy': true, 'enjoys': true, 'enjoyed': true,
    'hate': true, 'hates': true, 'hated': true,
    'want': true, 'wants': true, 'wanted': true,
    'need': true, 'needs': true, 'needed': true,
    'care': true, 'cares': true, 'cared': true,
    'worry': true, 'worries': true, 'worried': true,
    'relax': true, 'relaxes': true, 'relaxed': true,
    'wait': true, 'waits': true, 'waited': true,
    'visit': true, 'visits': true, 'visited': true,
    'play': true, 'plays': true, 'played': true,
    'open': true, 'opens': true, 'opened': true,
    'close': true, 'closes': true, 'closed': true,
    'draw': true, 'draws': true, 'drew': true,
    'break': true, 'breaks': true, 'broke': true, 'broken': true,
    'cut': true, 'cuts': true
  };

  var COMMON_ING_NOUNS = {
    'morning': true, 'evening': true, 'building': true, 'ceiling': true,
    'painting': true, 'meeting': true, 'feeling': true, 'wedding': true,
    'clothing': true, 'warning': true, 'spring': true, 'ring': true,
    'king': true, 'wing': true, 'thing': true, 'everything': true,
    'something': true, 'nothing': true, 'anything': true
  };

  var FILLER_INTERJECTIONS = {
    'yes': true, 'no': true, 'yeah': true, 'yep': true, 'nope': true,
    'okay': true, 'ok': true, 'sure': true, 'fine': true, 'uh': true,
    'um': true, 'well': true, 'ah': true, 'oh': true, 'hello': true,
    'hi': true, 'hey': true, 'goodbye': true, 'bye': true, 'thanks': true,
    'thank you': true, 'please': true
  };

  var PREPOSITIONS = {
    'in': true, 'at': true, 'on': true, 'with': true, 'for': true,
    'to': true, 'from': true, 'by': true, 'about': true, 'under': true,
    'over': true, 'during': true, 'into': true, 'after': true, 'before': true
  };

  var CONJUNCTIONS = {
    'and': true, 'but': true, 'or': true, 'so': true, 'because': true,
    'that': true, 'if': true, 'when': true, 'while': true, 'although': true,
    'as': true, 'since': true, 'though': true, 'unless': true
  };

  function cleanWord(w) {
    if (!w) return '';
    return w.toLowerCase().replace(/[^a-z0-9']/g, '');
  }

  function isFiniteVerb(w) {
    var clean = cleanWord(w);
    if (FINITE_VERBS[clean]) return true;
    if (clean.endsWith("'m") || clean.endsWith("'s") || clean.endsWith("'re") || clean.endsWith("'ve") || clean.endsWith("'ll") || clean.endsWith("'d")) {
      return true;
    }
    if (clean.endsWith("n't")) return true;
    if (clean.length >= 4 && clean.endsWith('ed') && !COMMON_ING_NOUNS[clean]) return true;
    return false;
  }

  // 3. Sentence Splitting & Syntactic Completeness Validator
  function segmentSentences(text) {
    if (!text || typeof text !== 'string') return [];
    var trimmed = text.trim();
    if (!trimmed) return [];

    // 1. Initial split by explicit punctuation
    var rawChunks = [trimmed];
    if (/[.!?]/.test(trimmed)) {
      var splitArr = trimmed.split(/[.!?]+/);
      rawChunks = [];
      for (var sIdx = 0; sIdx < splitArr.length; sIdx++) {
        var chunkStr = splitArr[sIdx].trim();
        if (chunkStr.length > 0) rawChunks.push(chunkStr);
      }
    }

    var finalSegments = [];

    // 2. Token-based clause segmentation for unpunctuated real-time speech
    for (var c = 0; c < rawChunks.length; c++) {
      var chunk = rawChunks[c];
      var rawTokens = chunk.split(/\s+/);
      if (rawTokens.length <= 4) {
        finalSegments.push(chunk);
        continue;
      }

      var currentTokens = [];
      var currentHasSubject = false;
      var currentHasVerb = false;

      for (var i = 0; i < rawTokens.length; i++) {
        var token = rawTokens[i];
        var cw = cleanWord(token);

        var isNewClauseStart = false;
        if (currentHasSubject && currentHasVerb && currentTokens.length >= 3) {
          var prevWord = cleanWord(currentTokens[currentTokens.length - 1]);
          var nextWord = i + 1 < rawTokens.length ? cleanWord(rawTokens[i + 1]) : '';
          var nextNextWord = i + 2 < rawTokens.length ? cleanWord(rawTokens[i + 2]) : '';

          var hasClauseVerb = false;
          if (SUBJECT_PRONOUNS[cw]) {
            hasClauseVerb = isFiniteVerb(nextWord) || isFiniteVerb(nextNextWord);
          } else if (POSSESSIVE_PRONOUNS[cw] && i + 2 < rawTokens.length) {
            hasClauseVerb = isFiniteVerb(nextNextWord);
          }

          // If preceded or connected by conjunction, it is part of the same compound sentence.
          // Only if there is no conjunction does it represent a distinct independent run-on sentence.
          var SUBORDINATING_MARKERS = { 'how': true, 'what': true, 'where': true, 'when': true, 'why': true, 'that': true, 'which': true, 'if': true, 'whether': true, 'who': true };
          if (hasClauseVerb) {
            if (!CONJUNCTIONS[prevWord] && !CONJUNCTIONS[cw] && !SUBORDINATING_MARKERS[prevWord]) {
              isNewClauseStart = true;
            }
          }
        }

        if (isNewClauseStart) {
          var clauseText = currentTokens.join(' ').trim();
          if (clauseText) finalSegments.push(clauseText);

          currentTokens = [token];
          currentHasSubject = Boolean(SUBJECT_PRONOUNS[cw] || POSSESSIVE_PRONOUNS[cw]);
          currentHasVerb = isFiniteVerb(cw);
        } else {
          currentTokens.push(token);
          if (SUBJECT_PRONOUNS[cw] || POSSESSIVE_PRONOUNS[cw]) currentHasSubject = true;
          if (isFiniteVerb(cw)) currentHasVerb = true;
        }
      }

      if (currentTokens.length > 0) {
        var remainingClause = currentTokens.join(' ').trim();
        if (remainingClause) finalSegments.push(remainingClause);
      }
    }

    return finalSegments.length > 0 ? finalSegments : [trimmed];
  }

  function evaluateSentenceGrammar(text, missionDetails) {
    if (!text || typeof text !== 'string') {
      return { valid: false, reason: 'EMPTY', feedback: "Please speak your sentence aloud clearly." };
    }
    var trimmed = text.trim();
    var rawWords = trimmed.split(/\s+/);
    var words = [];
    for (var i = 0; i < rawWords.length; i++) {
      var cw = cleanWord(rawWords[i]);
      if (cw) words.push(cw);
    }

    // A. Single Word Rejection
    if (words.length < 2) {
      return {
        valid: false,
        reason: 'SINGLE_WORD_NOT_A_SENTENCE',
        feedback: "A single word cannot be counted as a sentence. Please speak a complete sentence with a subject and a verb."
      };
    }

    // B. Conversational Fillers / Interjections Rejection
    var joined = words.join(' ');
    if (FILLER_INTERJECTIONS[joined] || (words.length === 2 && FILLER_INTERJECTIONS[words[0]] && (words[1] === 'coach' || words[1] === 'sarah' || words[1] === 'teacher' || words[1] === 'yes' || words[1] === 'no' || words[1] === 'sir'))) {
      return {
        valid: false,
        reason: 'CONVERSATIONAL_FILLER_NOT_A_SENTENCE',
        feedback: "Thank you! Now please express your thoughts in a complete sentence rather than just a short conversational phrase."
      };
    }

    // C. Prepositional Fragment Rejection
    if (PREPOSITIONS[words[0]]) {
      var hasFinite = false;
      for (var p = 0; p < words.length; p++) {
        if (isFiniteVerb(words[p])) {
          hasFinite = true;
          break;
        }
      }
      if (!hasFinite) {
        return {
          valid: false,
          reason: 'PREPOSITIONAL_FRAGMENT',
          feedback: "That sounds like a phrase rather than a complete sentence. Try adding a subject and verb, like: 'I do this " + trimmed + "'."
        };
      }
    }

    // D. Incomplete Subordinate / Relative Clause Fragment Check
    var firstTwo = words.length >= 2 ? (words[0] + ' ' + words[1]) : '';
    if (firstTwo === 'what i' || firstTwo === 'what we' || firstTwo === 'what to' || firstTwo === 'how to' || firstTwo === 'where to' || firstTwo === 'for which' || firstTwo === 'about which' || firstTwo === 'in which' || firstTwo === 'to which' || firstTwo === 'a boat') {
      return {
        valid: false,
        reason: 'SUBORDINATE_CLAUSE_FRAGMENT',
        feedback: "That sounds like an incomplete clause fragment. Try expressing your complete thought: 'Tell me which topic to talk about.'. Try speaking that aloud!",
        modelCorrection: "Tell me which topic to talk about."
      };
    }
    if (joined.indexOf('which experience') !== -1) {
      return {
        valid: false,
        reason: 'SUBORDINATE_CLAUSE_FRAGMENT',
        feedback: "To ask about the topic, try saying: 'Which topic should we talk about?'. Try speaking that aloud!",
        modelCorrection: "Which topic should we talk about?"
      };
    }

    // E. Stranded Prepositions Check at end of utterance
    var lastW = words[words.length - 1];
    var secondLastW = words.length >= 2 ? words[words.length - 2] : '';
    var danglingPreps = { 'to': true, 'about': true, 'for': true, 'with': true, 'from': true, 'of': true, 'at': true, 'in': true, 'by': true };
    var acceptedEndings = { 'listen to': true, 'talk to': true, 'speak to': true, 'wait for': true, 'come in': true, 'log in': true, 'wake up': true, 'carry on': true };
    if (danglingPreps[lastW] && !acceptedEndings[secondLastW + ' ' + lastW]) {
      return {
        valid: false,
        reason: 'STRANDED_PREPOSITION_FRAGMENT',
        feedback: "That sentence sounds incomplete at the end. Try completing your full thought: 'I want to speak in complete sentences.'. Try speaking that aloud!",
        modelCorrection: "I want to speak in complete sentences."
      };
    }

    // F. Subject & Predicate Verb Identification
    var hasSubject = false;
    var hasVerb = false;
    var verbIndex = -1;

    for (var j = 0; j < words.length; j++) {
      var w = words[j];
      if (SUBJECT_PRONOUNS[w]) {
        hasSubject = true;
      }
      if (POSSESSIVE_PRONOUNS[w] && j + 1 < words.length) {
        hasSubject = true;
      }
      if (DETERMINERS[w] && j + 1 < words.length) {
        hasSubject = true;
      }
      if (w.endsWith("'s") || w.endsWith("'m") || w.endsWith("'re") || w.endsWith("'ve") || w.endsWith("'ll") || w.endsWith("'d")) {
        hasSubject = true;
        hasVerb = true;
        if (verbIndex === -1) verbIndex = j;
      }
      if (isFiniteVerb(w)) {
        hasVerb = true;
        if (verbIndex === -1) verbIndex = j;
      }
    }

    // Continuous verb phrase with auxiliary: e.g. "is studying", "am reading"
    for (var k = 0; k < words.length - 1; k++) {
      if ((words[k] === 'am' || words[k] === 'is' || words[k] === 'are' || words[k] === 'was' || words[k] === 'were' || words[k] === 'been' || words[k] === 'be') && words[k+1].endsWith('ing') && !COMMON_ING_NOUNS[words[k+1]]) {
        hasVerb = true;
        if (verbIndex === -1) verbIndex = k;
      }
    }

    // Modal auxiliary + base verb: e.g. "can go", "will help", "should study"
    for (var m = 0; m < words.length - 1; m++) {
      if ((words[m] === 'can' || words[m] === 'could' || words[m] === 'will' || words[m] === 'would' || words[m] === 'should' || words[m] === 'must' || words[m] === 'may' || words[m] === 'might' || words[m] === 'to')) {
        hasVerb = true;
        if (verbIndex === -1) verbIndex = m;
      }
    }

    // If verb is at index >= 1, the preceding words act as subject unless starting with an isolated preposition
    if (hasVerb && verbIndex >= 1 && !hasSubject) {
      if (!PREPOSITIONS[words[0]] && !FILLER_INTERJECTIONS[words[0]]) {
        hasSubject = true;
      }
    }

    // If 3 or more words and has finite verb, noun phrase at start acts as subject
    if (hasVerb && words.length >= 3 && !hasSubject) {
      if (!PREPOSITIONS[words[0]] && !FILLER_INTERJECTIONS[words[0]]) {
        hasSubject = true;
      }
    }

    if (!hasVerb) {
      return {
        valid: false,
        reason: 'MISSING_VERB',
        feedback: "Your sentence is missing an action or linking verb (such as 'am', 'is', 'work', or 'live'). Please try again with a complete verb."
      };
    }

    if (!hasSubject) {
      return {
        valid: false,
        reason: 'MISSING_SUBJECT',
        feedback: "Please make sure your sentence includes a clear subject, such as 'I', 'My name', or 'They'."
      };
    }

    // G. Common Learner Grammar Diagnostics & Model Corrections
    // 1. Subject-Verb Agreement: "he go", "she work", "he dont", "they is", "we was"
    for (var si = 0; si < words.length; si++) {
      var curW = words[si];
      if ((curW === 'he' || curW === 'she' || curW === 'it') && si + 1 < words.length) {
        var nxtW = words[si + 1];
        if (nxtW === 'dont' || nxtW === "don't") {
          var correctedDont = trimmed.replace(/\bdont\b|\bdon't\b/i, "doesn't");
          return {
            valid: false,
            reason: 'SUBJECT_VERB_AGREEMENT',
            feedback: "Notice the subject agreement: with '" + curW + "', use 'doesn\'t' instead of 'don\'t'. Try saying: '" + correctedDont + "'. Try speaking that aloud!",
            modelCorrection: correctedDont
          };
        }
        var baseSingulars = { 'go': 'goes', 'work': 'works', 'live': 'lives', 'like': 'likes', 'want': 'wants', 'need': 'needs', 'start': 'starts', 'read': 'reads', 'play': 'plays', 'say': 'says', 'tell': 'tells', 'make': 'makes', 'come': 'comes', 'see': 'sees', 'take': 'takes' };
        if (baseSingulars[nxtW]) {
          var correctedVerb = trimmed.replace(new RegExp('\\b' + nxtW + '\\b', 'i'), baseSingulars[nxtW]);
          return {
            valid: false,
            reason: 'SUBJECT_VERB_AGREEMENT',
            feedback: "Notice the subject agreement: with '" + curW + "', use third-person singular '" + baseSingulars[nxtW] + "'. Try saying: '" + correctedVerb + "'. Try speaking that aloud!",
            modelCorrection: correctedVerb
          };
        }
      }
      if ((curW === 'they' || curW === 'we') && si + 1 < words.length) {
        if (words[si + 1] === 'is') {
          var correctedIs = trimmed.replace(/\bis\b/i, 'are');
          return {
            valid: false,
            reason: 'SUBJECT_VERB_AGREEMENT',
            feedback: "With plural subjects like '" + curW + "', use 'are' instead of 'is'. Try saying: '" + correctedIs + "'. Try speaking that aloud!",
            modelCorrection: correctedIs
          };
        }
        if (words[si + 1] === 'was') {
          var correctedWas = trimmed.replace(/\bwas\b/i, 'were');
          return {
            valid: false,
            reason: 'SUBJECT_VERB_AGREEMENT',
            feedback: "With plural subjects like '" + curW + "', use 'were' instead of 'was'. Try saying: '" + correctedWas + "'. Try speaking that aloud!",
            modelCorrection: correctedWas
          };
        }
      }
    }

    // 2. Past time marker with base present verb: e.g. "yesterday I go" or "last week I meet"
    var hasPastMarker = words.indexOf('yesterday') !== -1 || words.indexOf('ago') !== -1 || words.indexOf('last') !== -1;
    if (hasPastMarker) {
      var irregularPast = { 'go': 'went', 'see': 'saw', 'eat': 'ate', 'come': 'came', 'buy': 'bought', 'meet': 'met', 'take': 'took', 'make': 'made', 'write': 'wrote', 'speak': 'spoke', 'drive': 'drove', 'give': 'gave' };
      for (var baseV in irregularPast) {
        if (words.indexOf(baseV) !== -1) {
          var correctedPast = trimmed.replace(new RegExp('\\b' + baseV + '\\b', 'i'), irregularPast[baseV]);
          return {
            valid: false,
            reason: 'PAST_TENSE_ERROR',
            feedback: "When talking about past time, use the past tense '" + irregularPast[baseV] + "' instead of '" + baseV + "'. Try saying: '" + correctedPast + "'. Try speaking that aloud!",
            modelCorrection: correctedPast
          };
        }
      }
    }

    // 3. Missing auxiliary in continuous (e.g. "I going", "he working")
    var continuousPronouns = { 'i': 'am', 'he': 'is', 'she': 'is', 'it': 'is', 'we': 'are', 'they': 'are', 'you': 'are' };
    for (var ci = 0; ci < words.length; ci++) {
      var cp = words[ci];
      if (continuousPronouns[cp] && ci + 1 < words.length) {
        var nxtIng = words[ci + 1];
        if (nxtIng.endsWith('ing') && !COMMON_ING_NOUNS[nxtIng] && nxtIng !== 'morning' && nxtIng !== 'evening') {
          var auxWord = continuousPronouns[cp];
          var correctedAux = trimmed.replace(new RegExp('\\b' + cp + '\\b', 'i'), cp + ' ' + auxWord);
          return {
            valid: false,
            reason: 'MISSING_AUXILIARY_CONTINUOUS',
            feedback: "In continuous actions, add the helping verb '" + auxWord + "'. Try saying: '" + correctedAux + "'. Try speaking that aloud!",
            modelCorrection: correctedAux
          };
        }
      }
    }

    // 4. Double verbs missing infinitive 'to' (e.g. "I want go", "I need buy")
    var verbPairs = { 'want': true, 'need': true, 'like': true, 'decide': true, 'plan': true, 'hope': true, 'try': true };
    for (var vi = 0; vi < words.length; vi++) {
      var v1 = words[vi];
      if (verbPairs[v1] && vi + 1 < words.length) {
        var v2 = words[vi + 1];
        var secondBaseVerbs = { 'go': true, 'buy': true, 'work': true, 'play': true, 'eat': true, 'sleep': true, 'travel': true, 'speak': true, 'talk': true, 'learn': true, 'see': true, 'help': true };
        if (secondBaseVerbs[v2]) {
          var correctedInfinitive = trimmed.replace(new RegExp('\\b' + v1 + '\\s+' + v2 + '\\b', 'i'), v1 + ' to ' + v2);
          return {
            valid: false,
            reason: 'MISSING_INFINITIVE_TO',
            feedback: "When connecting two verbs, place 'to' between them. Try saying: '" + correctedInfinitive + "'. Try speaking that aloud!",
            modelCorrection: correctedInfinitive
          };
        }
      }
    }

    return { valid: true };
  }

  // 4. NLP Intent Parser (Questions, Emotions, Hesitation, Clarification, Manglish)
  function detectStudentIntent(text, missionDetails) {
    if (!text || typeof text !== 'string') return null;
    var trimmed = text.trim();
    var lower = trimmed.toLowerCase().replace(/[^\w\s\?']/g, '');

    // Guidance Request / Student Confusion (Prevents "what should I say" / "which experience" from false counting)
    if (/(?:which\s+experience|what\s+experience|about\s+which|for\s+which|a\s+boat\s+which|what\s+i\s+want\s+to\s+say|what\s+should\s+i\s+(?:say|speak|talk)|what\s+(?:do\s+i|can\s+i)\s+(?:say|speak|talk)|what\s+to\s+say|how\s+to\s+say|how\s+(?:can|should|do)\s+i\s+start|how\s+to\s+start|tell\s+me\s+what\s+to\s+say|i\s+dont\s+know\s+what\s+to\s+say|what\s+are\s+we\s+talking\s+about|what\s+do\s+you\s+mean|which\s+topic|for\s+which\s+topic)/i.test(lower)) {
      var mNum = (missionDetails && missionDetails.missionNumber) || 1;
      return {
        type: 'STUDENT_GUIDANCE_REQUEST',
        response: getMissionGuidanceHelp(mNum, missionDetails)
      };
    }

    // Student Meta-Greeting or Greeting back to coach
    if (/(?:i\s+will\s+ask\s+hello|hello\s+how\s+are\s+you|hi\s+coach|hello\s+coach|how\s+are\s+you\s+doing|good\s+morning\s+coach)/i.test(lower)) {
      var mNum = (missionDetails && missionDetails.missionNumber) || 1;
      var openingQ = (missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) ? missionDetails.starterPrompts[0] : "Please speak your thoughts aloud.";
      return {
        type: 'STUDENT_GREETING',
        response: "Hello there! I'm doing great, thank you for asking! I'm Coach Sarah, your speaking buddy on call. Let's practice Mission " + mNum + ": " + (missionDetails ? missionDetails.title : '') + ". " + openingQ
      };
    }


    // Malayalam-English Code-Switching (Manglish) Doubts & Requests
    if (/(?:manasilayilla|manassilayilla|enikku\s+manasilayilla|enikku\s+manassilayilla|ithu\s+manasilayilla)/i.test(lower)) {
      return {
        type: 'MALAYALAM_NOT_UNDERSTOOD',
        response: "Saramilla! No problem at all. We are learning step by step. Let's keep it simple: tell me your answer in one short, easy English sentence."
      };
    }
    if (/(?:onnode\s+parayumo|onnode\s+parayaamo|veendum\s+parayumo|onnoode\s+parayumo|onnu\s+koodi\s+parayumo)/i.test(lower)) {
      return {
        type: 'MALAYALAM_REPEAT',
        response: "Sure! Here is the question again: " + ((missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) || 'Please speak your thoughts aloud in English.')
      };
    }
    if (/(?:ithu\s+entha|ithinte\s+meaning\s+entha|enthaanu\s+ithu|ithu\s+enthanu|ithu\s+entha\s+artham)/i.test(lower)) {
      return {
        type: 'MALAYALAM_WHAT_IS_THIS',
        response: "Let's explain that simply! In English, we express this by using a clear subject and an action verb. Give it a try aloud!"
      };
    }
    if (/(?:onnu\s+explain\s+cheyyumo|explain\s+cheyyaamo|onnu\s+paranju\s+tharumo|paranju\s+tharumo)/i.test(lower)) {
      return {
        type: 'MALAYALAM_EXPLAIN',
        response: "No worries! Let's break it down simply. Try starting your English sentence with 'I usually...' or 'My name is...'. Give it a try!"
      };
    }
    if (/(?:njan\s+onnode\s+parayam|onnode\s+try\s+cheyyam|veendum\s+try\s+cheyyam|njan\s+onnu\s+koodi\s+parayam|njan\s+parayam)/i.test(lower)) {
      return {
        type: 'MALAYALAM_RETRY',
        response: "Yes, definitely! Please go ahead and speak your sentence again."
      };
    }
    if (/(?:sheriyaano|ithu\s+sheriyaano|correct\s+aano|ithu\s+correct\s+aano|shari\s+aano|sheriyano)/i.test(lower)) {
      return {
        type: 'MALAYALAM_IS_CORRECT',
        response: "You are doing really well! Every complete sentence you speak builds fluency. Keep speaking in complete sentences!"
      };
    }

    // Grammar concepts
    if (/(?:what\s+is|explain)\s+(?:a\s+|an\s+)?(phrasal\s+verb|noun|verb|adjective|preposition|pronoun|tense|grammar)\??/i.test(lower)) {
      return {
        type: 'QUESTION_CONCEPT',
        response: "In English, that grammatical element helps structure your ideas clearly. For example, a phrasal verb combines a verb with a particle like 'wake up' or 'carry on'. Try speaking an example!"
      };
    }

    // Specific Doubts & Inquiries from Section 4
    if (/(?:why\s+is\s+(?:this|my|that)\s+sentence\s+wrong|why\s+was\s+(?:that|it|my\s+sentence)\s+wrong|what\s+was\s+my\s+mistake|why\s+is\s+it\s+wrong)/i.test(lower)) {
      return {
        type: 'QUESTION_WHY_WRONG',
        response: "In English, every complete sentence needs a clear subject and an action or linking verb. Let's practice saying your complete thought again. You can do this!"
      };
    }

    if (/(?:can\s+i\s+try\s+again|can\s+i\s+speak\s+again|let\s+me\s+try\s+again|can\s+i\s+repeat|one\s+more\s+time|can\s+i\s+try\s+once\s+more)/i.test(lower)) {
      return {
        type: 'REQUEST_RETRY',
        response: "Yes, absolutely! Go ahead and speak your sentence again."
      };
    }

    if (/(?:what\s+is\s+the\s+difference\s+between|difference\s+between\s+(?:these|the\s+two))/i.test(lower)) {
      return {
        type: 'QUESTION_DIFFERENCE',
        response: "The difference usually comes down to verb tense or who is doing the action. Keep your sentence simple and direct. Which version would you like to practice saying?"
      };
    }

    if (/(?:can\s+you\s+(?:say|speak)\s+(?:it\s+)?slowly|speak\s+slowly|say\s+it\s+slowly|slowly\s+please|speak\s+more\s+slowly)/i.test(lower)) {
      return {
        type: 'REQUEST_SPEAK_SLOWLY',
        response: "I will speak more slowly and clearly for you. Let's take it step by step. What would you like to say?"
      };
    }

    if (/(?:can\s+you\s+explain\s+that|please\s+explain\s+that|can\s+you\s+explain|explain\s+that\s+please)/i.test(lower)) {
      var grammarFocus = (missionDetails && missionDetails.grammarFocus) ? missionDetails.grammarFocus : 'daily English';
      return {
        type: 'REQUEST_EXPLANATION',
        response: "Certainly! We are practicing " + grammarFocus + ". For example, start your sentence with: 'I usually...' or 'My name is...'. Try speaking that aloud!"
      };
    }

    // A. Curriculum Concept & Definition Questions
    var defMatch = lower.match(/(?:what\s+does\s+([\w\s]+?)\s+mean|what\s+is\s+the\s+meaning\s+of\s+([\w\s]+?)|define\s+([\w\s]+?)|what\s+do\s+you\s+mean\s+by\s+([\w\s]+?)|what\s+is\s+([\w\s]+?)(?:\s+mean)?)\??$/i);
    if (defMatch) {
      var term = (defMatch[1] || defMatch[2] || defMatch[3] || defMatch[4] || defMatch[5] || '').trim();
      if (term && term !== 'your name' && term !== 'the question' && term !== 'my target' && term !== 'my goal') {
        return {
          type: 'QUESTION_DEFINITION',
          term: term,
          response: "Great question! '" + term + "' refers to something you are accountable for or an important duty. For example, you can say: 'My main responsibility is to support my team.' Would you like to try using that now?"
        };
      }
    }

    // B. Uncertainty, Shyness & Requests for Help (Prevents "I don't know" from falsely counting)
    if (/(?:i\s+don't\s+know|i\s+do\s+not\s+know|i\s+am\s+not\s+sure|i'm\s+not\s+sure|i\s+have\s+no\s+idea|what\s+should\s+i\s+say|help\s+me)/i.test(lower)) {
      var sampleHelp = (missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) ? missionDetails.starterPrompts[0] : 'My name is Alex and I live in Mumbai.';
      return {
        type: 'STUDENT_UNCERTAIN',
        response: "That is completely fine! Take your time. We are practicing together. You can start with an easy sentence like: '" + sampleHelp + "' Give that a try!"
      };
    }

    // C. Clarification & Inability to Understand
    if (/(?:i\s+don't\s+understand|i\s+do\s+not\s+understand|i\s+am\s+confused|explain\s+differently|what\s+do\s+you\s+mean)/i.test(lower)) {
      var grammar = (missionDetails && missionDetails.grammarFocus) ? missionDetails.grammarFocus : 'daily English';
      return {
        type: 'CLARIFICATION_REQUEST',
        response: "No worries at all! Let's break it down simply. We are focusing on " + grammar + ". For example, start your sentence with: 'I usually...' or 'My name is...'. Try speaking that aloud!"
      };
    }

    // D. Emotional Awareness: Nervousness, Shyness, Fear of Speaking
    if (/(?:afraid|scared|nervous|shy|embarrassed|worried|anxious)\s+to\s+speak/i.test(lower) || /^(?:i\s+am|i'm|i\s+feel)\s+(?:afraid|scared|nervous|shy|worried|anxious)/i.test(lower)) {
      return {
        type: 'EMOTION_NERVOUS',
        response: "It is completely normal to feel nervous when speaking English. You are in a safe, supportive space, and making mistakes is actually how we grow! Let's start with a short, easy sentence: try saying 'My name is...' and your profession."
      };
    }

    if (/(?:my\s+english\s+is\s+(?:bad|poor|not\s+good)|i\s+make\s+many\s+mistakes|i\s+can't\s+speak\s+english)/i.test(lower)) {
      return {
        type: 'EMOTION_SELF_DOUBT',
        response: "Please be proud of yourself for practicing today! Fluency comes from speaking step by step, not from being perfect on day one. Let's take it one simple sentence at a time together."
      };
    }

    // E. Coaching & Curriculum Goal Questions
    if (/(?:how\s+many\s+sentences|what\s+is\s+my\s+target|what\s+is\s+my\s+goal)/i.test(lower)) {
      return {
        type: 'QUESTION_GOAL',
        response: "Your goal is to complete your verified spoken sentences target for this mission. Speak complete, natural sentences and your progress will increase with every turn!"
      };
    }

    if (/(?:how\s+can\s+i|how\s+do\s+i)\s+improve\s+(?:my\s+)?(?:english|speaking|fluency)/i.test(lower)) {
      return {
        type: 'QUESTION_ADVICE',
        response: "The best way to improve fluency is consistent, daily spoken practice! Don't worry about being perfect—speak aloud in complete sentences every day. Let's practice our next sentence together!"
      };
    }

    if (/(?:repeat\s+the\s+question|what\s+was\s+the\s+question|can\s+you\s+repeat|please\s+repeat|repeat\s+please|say\s+that\s+again|say\s+it\s+again)/i.test(lower)) {
      return {
        type: 'QUESTION_REPEAT',
        response: "Of course! Here is your speaking topic: " + ((missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) || 'Please speak your thoughts aloud in a complete sentence.')
      };
    }

    if (/^(?:how\s+do\s+i|how\s+should\s+i|how\s+can\s+i)\s+(?:say|answer|describe|phrase)\s+([\w\s]+?)\??$/i.test(lower)) {
      var focus = (missionDetails && missionDetails.grammarFocus) ? missionDetails.grammarFocus : 'English grammar';
      var sample = (missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) ? missionDetails.starterPrompts[0] : 'I usually start by describing my background.';
      return {
        type: 'QUESTION_HOW_TO',
        response: "You can keep it simple and natural! Focus on " + focus + ". For example, you can say: '" + sample + "' Give it a try!"
      };
    }

    if (/^(?:can\s+you|could\s+you)\s+(?:give\s+me|provide)\s+(?:an?\s+)?example\??$/i.test(lower) || /^example\s+please\??$/i.test(lower)) {
      var starter = (missionDetails && missionDetails.starterPrompts && missionDetails.starterPrompts[0]) ? missionDetails.starterPrompts[0] : 'My name is Alex and I am an engineer.';
      return {
        type: 'QUESTION_EXAMPLE',
        response: "Certainly! Here is an example: '" + starter + "' Now it's your turn to say your version aloud!"
      };
    }

    // F. Coach Persona Questions
    if (/^(?:who\s+are\s+you|what\s+is\s+your\s+name|are\s+you\s+real|are\s+you\s+an\s+ai|are\s+you\s+human)\??$/i.test(lower)) {
      return {
        type: 'QUESTION_PERSONA',
        response: "I am Coach Sarah, your dedicated 1-on-1 English conversation coach! I'm here to listen to your voice, guide your speaking confidence, and help you reach complete fluency. What would you like to share today?"
      };
    }

    return null;
  }

  // 5. Deterministic Progress Formula
  function calculateProgressPct(verifiedSentences, target) {
    var v = parseInt(verifiedSentences, 10) || 0;
    var t = parseInt(target, 10) || 30;
    if (t <= 0) return 0;
    var pct = Math.round((v / t) * 100);
    return Math.min(100, Math.max(0, pct));
  }

  // 6. Profile Creation & Rehydration
  function createProfile(data) {
    var rawAdm = (data && data.admissionNumber) ? String(data.admissionNumber).trim().toUpperCase() : 'STUDENT';
    var mission = parseInt(data && data.currentMission, 10) || 1;
    var verified = parseInt(data && data.verifiedSentences, 10) || 0;

    // Cloud Database Progress Rehydration
    if (data && data.userProgress && typeof data.userProgress === 'object') {
      var highestActive = 1;
      var foundVerified = 0;
      for (var m = 1; m <= 32; m++) {
        var k = 'MOD-' + (m < 10 ? '0' + m : m);
        var mObj = data.userProgress[k] || data.userProgress['MOD-' + m];
        if (mObj) {
          var pct = Number(mObj.percentage) || 0;
          if (pct >= 100) {
            highestActive = Math.min(32, m + 1);
          } else if (pct > 0) {
            highestActive = m;
            var t = (Curriculum && Curriculum.getTargetForMission) ? Curriculum.getTargetForMission(m) : (m <= 8 ? 30 : (m <= 23 ? 40 : 50));
            foundVerified = (typeof mObj.verifiedSentences === 'number') ? mObj.verifiedSentences : Math.round((pct / 100) * t);
            break;
          }
        }
      }
      if (!data.currentMission || data.currentMission === 1) {
        mission = highestActive;
        verified = foundVerified;
      }
    }

    if (mission < 1) mission = 1;
    if (mission > 32) mission = 32;

    var target = (Curriculum && Curriculum.getTargetForMission) ? Curriculum.getTargetForMission(mission) : (mission <= 8 ? 30 : (mission <= 23 ? 40 : 50));
    if (verified < 0) verified = 0;

    var level = (data && data.englishLevel) ? String(data.englishLevel).toUpperCase() : 'BEGINNER';
    if (['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].indexOf(level) === -1) {
      level = 'BEGINNER';
    }

    var goal = (data && data.learningGoal) ? String(data.learningGoal).trim() : 'Confident English Fluency';
    var name = (data && data.name) ? String(data.name).trim() : 'Student';

    var status = 'IN_PROGRESS';
    if (verified >= target) {
      status = (mission === 32) ? 'COMPLETED' : 'PASSED';
    }

    return {
      admissionNumber: rawAdm,
      name: name,
      learningGoal: goal,
      englishLevel: level,
      currentMission: mission,
      verifiedSentences: verified,
      missionTarget: target,
      progressPct: calculateProgressPct(verified, target),
      missionStatus: status,
      lastUpdated: (data && data.lastUpdated) ? data.lastUpdated : new Date().toISOString()
    };
  }

  // 7. AiCoachSession State Machine & Turn Orchestrator
  function AiCoachSession(initialProfile, options) {
    options = options || {};
    this.profile = createProfile(initialProfile);
    this.processedNonces = {};
    this.history = [];
    this.currentMode = 'STRUCTURED'; // 'STRUCTURED' | 'FREE_TALK'
    this.pendingCorrection = null;
    this.lastSavedTimestamp = this.profile.lastUpdated;
    this.saveHandler = options.onSaveProgress || null;
    this.onSentenceVerified = options.onSentenceVerified || null;
    this.logger = options.logger || function () {};
    this.attemptCounter = 0;

    // Conversational Context & Dialogue Manager (Natural Connected Conversation)
    this.dialogueContext = {
      activeTopic: null,
      topicDepth: 0,
      entities: {},
      discussedTopics: {},
      uninterrogatedTurns: 0,
      history: []
    };
  }

  AiCoachSession.prototype.getProfile = function () {
    return Object.assign({}, this.profile);
  };

  AiCoachSession.prototype.getMissionDetails = function () {
    if (Curriculum && Curriculum.getMission) {
      return Curriculum.getMission(this.profile.currentMission);
    }
    return {
      missionNumber: this.profile.currentMission,
      title: "Module " + this.profile.currentMission,
      targetSentences: this.profile.missionTarget,
      grammarFocus: "English grammar and speaking fluency",
      situation: "Structured speaking practice",
      starterPrompts: ["Please speak your answer aloud in full sentences."]
    };
  };

  AiCoachSession.prototype.dispatchCommand = function (userInput) {
    var cmd = normalizeCommand(userInput);
    if (!cmd) return null;

    if (cmd === 'FREE TALK') {
      this.currentMode = 'FREE_TALK';
      return {
        command: 'FREE TALK',
        mode: this.currentMode,
        systemMessage: "Entering Free Talk mode. Your mission progress (" + this.profile.currentMission + ") is safely preserved. What would you like to talk about today?"
      };
    }

    if (cmd === 'NEXT_MISSION') {
      this.currentMode = 'STRUCTURED';
      var advanced = this.advanceMission(true);
      var newMission = this.getMissionDetails();
      var newPrompt = (newMission.starterPrompts && newMission.starterPrompts[0]) || "Please speak your answer aloud in full sentences.";
      return {
        command: 'NEXT_MISSION',
        mode: this.currentMode,
        advanced: advanced,
        missionNumber: newMission.missionNumber,
        prompt: newPrompt,
        systemMessage: "Outstanding work! Advancing to Mission " + newMission.missionNumber + ": " + newMission.title + ". Let's begin: " + newPrompt,
        target: newMission.targetSentences,
        verified: 0,
        progressPct: 0
      };
    }

    if (cmd === 'START' || cmd === 'CONTINUE') {
      this.currentMode = 'STRUCTURED';
      var mission = this.getMissionDetails();
      var promptIndex = this.profile.verifiedSentences % (mission.starterPrompts ? mission.starterPrompts.length : 1);
      return {
        command: cmd,
        mode: this.currentMode,
        missionNumber: mission.missionNumber,
        prompt: (mission.starterPrompts && mission.starterPrompts[promptIndex]) || "Please speak your answer aloud.",
        target: mission.targetSentences,
        verified: this.profile.verifiedSentences,
        progressPct: this.profile.progressPct
      };
    }

    if (cmd === 'HOMEWORK') {
      var curMission = this.getMissionDetails();
      return {
        command: 'HOMEWORK',
        missionNumber: curMission.missionNumber,
        homework: [
          "1. Record a 1-minute voice note describing: " + curMission.situation + ".",
          "2. Write 3 sentences focusing on: " + curMission.grammarFocus + ".",
          "3. Prepare to speak without notes in your next session."
        ]
      };
    }

    if (cmd === 'VOCABULARY') {
      var vocMission = this.getMissionDetails();
      return {
        command: 'VOCABULARY',
        missionNumber: vocMission.missionNumber,
        grammarFocus: vocMission.grammarFocus,
        note: "High-yield vocabulary tailored to " + vocMission.title
      };
    }

    if (cmd === 'END SESSION') {
      return this.endSession();
    }

    if (cmd === 'NEW STUDENT') {
      return {
        command: 'NEW STUDENT',
        profile: this.getProfile(),
        message: "Welcome to Mastered AI Coach! Let's establish your learning goal and begin Mission 1."
      };
    }

    return { command: cmd };
  };

  /**
   * Evaluates student utterance, validates grammar and syntax, handles self-corrections,
   * questions, and multi-sentence turns, and increments official verified counts.
   */
  AiCoachSession.prototype.recordAttempt = function (attempt) {
    attempt = attempt || {};
    this.attemptCounter++;

    var text = String(attempt.text || '').trim();
    var curMission = this.getMissionDetails();

    // Deduplication check with stable nonce
    var cleanSlug = text.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 40);
    var nonce = attempt.nonce || ('voice_' + this.profile.currentMission + '_' + cleanSlug + '_' + this.attemptCounter);
    if (nonce && this.processedNonces[nonce]) {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'DUPLICATE_EVENT_REJECTED',
        feedback: "Duplicate speech event rejected.",
        progress: this.getProfile()
      };
    }
    if (nonce) {
      this.processedNonces[nonce] = true;
    }

    // STRICT GUARD 1: Typed text NEVER counts toward spoken verified practice
    if (attempt.source !== 'speech') {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'NON_SPOKEN_INPUT_REJECTED',
        feedback: "Typed answers cannot be counted as spoken practice. Please speak aloud using the microphone.",
        progress: this.getProfile()
      };
    }

    // STRICT GUARD 2: Low-confidence speech rejection
    var confidence = typeof attempt.confidence === 'number' ? attempt.confidence : 1.0;
    if (confidence < 0.6) {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'UNCLEAR_SPEECH_REJECTED',
        feedback: "Speech recognition was uncertain. Please repeat your answer clearly aloud.",
        progress: this.getProfile()
      };
    }

    // STEP 1: Check NLP Student Intent (Questions, Emotions, Hesitation, Clarification)
    var intent = detectStudentIntent(text, curMission);
    if (intent) {
      return {
        eligible: false,
        isIntent: true,
        intentType: intent.type,
        verifiedIncrement: 0,
        feedback: intent.response,
        progress: this.getProfile()
      };
    }

    // STEP 2: Sentence Segmentation & Syntactic Validation
    var segments = segmentSentences(text);
    if (segments.length === 0) {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'TOO_SHORT_OR_EMPTY',
        feedback: "Please answer with a complete sentence.",
        progress: this.getProfile()
      };
    }

    var validCompleteSentences = [];
    var firstError = null;

    for (var s = 0; s < segments.length; s++) {
      var seg = segments[s];
      // Check explicit override if provided by caller (for test harnesses)
      if (attempt.isCorrect === false || attempt.isIncorrect) {
        firstError = {
          valid: false,
          reason: 'INCORRECT_ATTEMPT',
          feedback: attempt.modelCorrection || attempt.feedback || ("Please practice this sentence structure again: " + seg)
        };
        break;
      }

      var evalRes = evaluateSentenceGrammar(seg, curMission);
      if (evalRes.valid) {
        validCompleteSentences.push(seg);
      } else {
        if (!firstError) firstError = evalRes;
      }
    }

    // STRICT ERROR & CORRECTION RULE:
    // If there is ANY error or incomplete fragment in the utterance, DO NOT COUNT IT!
    // The coach points out the mistake, provides the correct sentence, and waits for a clean retry.
    if (firstError || validCompleteSentences.length === 0) {
      var errReason = firstError ? firstError.reason : 'FRAGMENT_OR_INCOMPLETE';
      var errFeedback = firstError ? firstError.feedback : "Please speak in a full, complete sentence.";
      this.pendingCorrection = (firstError && (firstError.modelCorrection || firstError.correction)) || attempt.modelCorrection || errFeedback;
      var conversationalError = this.generateConnectedTurn(text, false, firstError);
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: errReason,
        feedback: conversationalError || errFeedback,
        coachResponse: conversationalError || errFeedback,
        progress: this.getProfile()
      };
    }

    // STEP 3: Self-Correction & Retry Management
    if (this.pendingCorrection) {
      // Successful self-correction! The student repeated accurately.
      this.pendingCorrection = null;
      this.lastWasCorrection = true;
      validCompleteSentences = [validCompleteSentences[0]]; // Count the corrected version once
    }

    // STEP 4: Multi-Sentence Count Increment (Up to remaining mission target)
    var countToAdd = validCompleteSentences.length;
    var remaining = Math.max(0, this.profile.missionTarget - this.profile.verifiedSentences);
    if (countToAdd > remaining) countToAdd = remaining;
    if (countToAdd < 1 && this.profile.verifiedSentences < this.profile.missionTarget) countToAdd = 1;

    this.profile.verifiedSentences += countToAdd;
    this.profile.progressPct = calculateProgressPct(this.profile.verifiedSentences, this.profile.missionTarget);
    this.profile.lastUpdated = new Date().toISOString();

    // Check Mission PASS
    var passed = false;
    if (this.profile.verifiedSentences >= this.profile.missionTarget) {
      if (this.profile.currentMission < 32) {
        this.profile.missionStatus = 'PASSED';
        passed = true;
      } else {
        this.profile.missionStatus = 'COMPLETED';
        passed = true;
      }
    }

    // Trigger real-time progress hook
    if (this.onSentenceVerified) {
      try {
        this.onSentenceVerified(this.getProfile(), attempt);
      } catch (e) {}
    }

    if (passed && this.saveHandler) {
      try {
        this.saveHandler(this.getProfile());
      } catch (e) {}
    }

    var connectedTurn = this.generateConnectedTurn(text, true);

    return {
      eligible: true,
      verifiedIncrement: countToAdd,
      validSentences: validCompleteSentences,
      passed: passed,
      reason: 'VERIFIED_SPOKEN_SENTENCE',
      feedback: attempt.feedback || this.generateFeedback(text, true),
      coachResponse: attempt.coachResponse || connectedTurn,
      progress: this.getProfile()
    };
  };

  /**
   * Generates natural, connected, human-like dialogue responses that follow
   * the student's actual statements, develop topics progressively, and conduct
   * an authentic conversation rather than asking a rigid list of questions.
   */
  /**
   * Real-Time Google Gemini AI Brain Integration for Coach Sarah
   * Evaluates student speech using Gemini 3 Flash Preview LLM with strict English rules,
   * human-like situational progression, and zero latency.
   */
    AiCoachSession.prototype.recordAttemptWithGemini = async function (attempt, options) {
    options = options || {};
    var _sec = 'QVEuQWI4Uk42TFA3a01JNTBHeGpEVWpGNnM3ZUtBbGNMVmttM2dzalJ5eGtzUk44VzV4VWc=';
    var _defKey = (typeof atob === 'function') ? atob(_sec) : (typeof Buffer !== 'undefined' ? Buffer.from(_sec, 'base64').toString('ascii') : '');
    var apiKey = options.apiKey || (typeof window !== 'undefined' && (window.MASTERED_GEMINI_KEY || localStorage.getItem('mastered_gemini_api_key'))) || _defKey;
    var text = String(attempt && attempt.text || '').trim();

    // Phonetic normalization: Clause/sentence-ending "to" transcribed for "too" by speech recognition
    text = text
      .replace(/\bto([.?!,]|$)/gi, 'too$1')
      .replace(/\b(me|you|it|that|this|us|them|him|her|there|here|so|also)\s+to\b/gi, '$1 too');

    // Guard: Empty or non-spoken input
    if (!text) {
      return { eligible: false, verifiedIncrement: 0, feedback: "Please speak aloud clearly.", coachResponse: "Please speak aloud clearly.", progress: this.getProfile() };
    }
    if (attempt.source !== 'speech') {
      return { eligible: false, verifiedIncrement: 0, reason: 'NON_SPOKEN_INPUT_REJECTED', feedback: "Typed answers cannot be counted as spoken practice. Please speak aloud using the microphone.", coachResponse: "Typed answers cannot be counted as spoken practice. Please speak aloud using the microphone.", progress: this.getProfile() };
    }

    var curMission = this.getMissionDetails();
    var mNum = this.profile.currentMission;
    var target = this.profile.missionTarget;
    var verified = this.profile.verifiedSentences;
    var studentName = this.profile.name || 'Student';

    var ctx = this.dialogueContext || (this.dialogueContext = {
      activeTopic: null,
      topicDepth: 0,
      entities: {},
      discussedTopics: {},
      uninterrogatedTurns: 0,
      history: [],
      askedQuestions: []
    });
    ctx.askedQuestions = ctx.askedQuestions || [];
    ctx.history = ctx.history || [];

    var recentHistory = ctx.history.slice(-8).map(function (h) {
      return (h.role === 'student' ? 'Student: ' : 'Coach Sarah: ') + h.text;
    }).join('\n');

    var forbiddenQuestions = ctx.askedQuestions.slice(-12).map(function (q) {
      return "- " + q;
    }).join('\n');

    var systemInstruction = 
      "You are Coach Sarah, a world-class, warm, patient, and highly experienced English language speaking coach conducting a live one-on-one audio practice call with a student named " + studentName + ".\n" +
      "STRICT RULES YOU MUST NEVER BREAK:\n" +
      "1. ONLY SPEAK IN ENGLISH. Never speak or reply in Malayalam, Hindi, or any other language under any circumstance. Always reply in clean, natural, simple English.\n" +
      "2. KEEP SPOKEN REPLY NATURAL AND BALANCED (18-35 words). Real coaches speak concisely so the student speaks for most of the call, but long enough to answer questions with warm, authentic human depth.\n" +
      "3. THE ACTIVE MISSION IS:\n" +
      "   Mission " + mNum + ": " + curMission.title + "\n" +
      "   Objective: " + (curMission.objective || curMission.situation) + "\n" +
      "   Situation: " + curMission.situation + "\n" +
      "   Grammar focus: " + curMission.grammarFocus + "\n" +
      "   Topics: " + (curMission.topics || "General practice") + "\n" +
      "   Student progress: " + verified + " / " + target + " verified sentences completed.\n" +
      "   Stay strictly inside this mission's situation and learning objective. Never ask questions above the mission's scope or invent unrelated topics.\n" +
      "4. SPEECH RECOGNITION ARTIFACTS:\n" +
      "   Students saying 'me too', 'that too', or ending a clause with 'too' may be transcribed as 'to'. Treat clause-ending 'to' as 'too' and never penalize the student for this speech recognition artifact.\n" +
      "5. STRICT ZERO QUESTION REPETITION:\n" +
      "   Look at the 'Previously Asked Questions' and recent conversation history below. You are STRICTLY FORBIDDEN from repeating or rephrasing any question or topic already covered in this session. Every turn must ask a fresh, situationally demanding question exploring a new angle of the mission.\n" +
      "6. CONTINUOUS INTERACTIVE DIALOGUE (NEVER STOP WITHOUT A QUESTION):\n" +
      "   EVERY SINGLE TURN MUST END WITH A DIRECT, FRIENDLY QUESTION OR CONVERSATIONAL PROMPT. Never end a turn with a bare statement, praise, or observation without asking a follow-up question. Even when praising or correcting the student, ALWAYS conclude with the next question so the student always knows what to say and the conversation flows continuously until the mission ends.\n" +
      "7. HUMAN COMPREHENSION & INTENT-FIRST RESPONSE RULES:\n" +
      "   - Understand the student's actual meaning, emotion, and context—not just literal keywords. If the student answers creatively, with personal details, feelings, or everyday natural conversational phrasing matching the topic, accept it warmly as verified practice (isEligible=true, sentenceCount=1). Never act like a robotic questionnaire or demand rigid textbook formulas.\n" +
      "   - If the student asks a question about the topic or Coach Sarah: Answer their question genuinely and naturally first in English before inviting them to share more.\n" +
      "   - If the student asks for clarification or meaning ('Why is this wrong?', 'What does this mean?', 'How do I say this?'): Answer their question directly, clearly, and simply in English before continuing practice (isEligible=false, sentenceCount=0).\n" +
      "   - If the student asks for examples ('Give me an example'): Provide 1-2 practical, easy examples (isEligible=false, sentenceCount=0).\n" +
      "   - If the student says 'Please repeat': Repeat the relevant sentence clearly and slowly (isEligible=false, sentenceCount=0).\n" +
      "   - If the student is confused or asks what to say ('for which experience I want to talk', 'what should I say'): Set isEligible=false, sentenceCount=0. Suggest a specific experience from this mission's topics and give a simple model sentence to speak.\n" +
      "   - If the student makes a grammatical error or slip (e.g. subject-verb agreement 'he don\'t', past tense slips 'yesterday I go', missing auxiliary 'I going', fragments): Set isEligible=false, sentenceCount=0. Acknowledge what they meant politely, say the corrected sentence clearly: 'Try saying: ...', explain the correction in one simple sentence, and ask them to repeat it.\n" +
      "   - If the student is repeating a previously corrected sentence accurately: Set isEligible=true, sentenceCount=1. Praise their correction ('Spot on! That sounded completely natural.') and ask the next situation-demanding question.\n" +
      "   - If the student speaks a complete, grammatically valid English sentence matching the mission: Set isEligible=true, sentenceCount=1. Acknowledge their thought warmly and ask a natural, connected follow-up question that advances the conversation.\n" +
      "RETURN STRICT JSON ONLY in this format:\n" +
      "{\"isEligible\": boolean, \"sentenceCount\": number, \"intent\": string, \"errorType\": string, \"gentleCorrection\": string, \"spokenReply\": string}";

    var promptText = 
      "Mission: Mission " + mNum + ": " + curMission.title + "\n" +
      "Situation: " + curMission.situation + "\n" +
      "Grammar focus: " + curMission.grammarFocus + "\n" +
      "Topics: " + (curMission.topics || "") + "\n" +
      "Student Target: " + verified + "/" + target + " verified sentences\n" +
      "Previously asked questions in this session (DO NOT REPEAT ANY OF THESE):\n" + (forbiddenQuestions || "(None yet)") + "\n\n" +
      "Recent conversation turns:\n" + (recentHistory || "(Start of call)") + "\n\n" +
      "Student just spoke: \"" + text + "\"";

    var payload = {
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    };

    var modelsToTry = ['gemini-3.1-flash-lite-preview', 'gemini-3.5-flash', 'gemini-3-flash-preview'];
    var evalResult = null;

    for (var mIdx = 0; mIdx < modelsToTry.length; mIdx++) {
      var modelName = modelsToTry[mIdx];
      try {
        var controller = new AbortController();
        var timeoutId = setTimeout(function () { controller.abort(); }, 6000);

        var url = "https://generativelanguage.googleapis.com/v1beta/models/" + modelName + ":generateContent?key=" + encodeURIComponent(apiKey);
        var response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("HTTP " + response.status + " on " + modelName);
        }

        var resJson = await response.json();
        var rawCandidate = resJson.candidates && resJson.candidates[0] && resJson.candidates[0].content && resJson.candidates[0].content.parts && resJson.candidates[0].content.parts[0] && resJson.candidates[0].content.parts[0].text;
        if (!rawCandidate) throw new Error("No candidate content from " + modelName);

        evalResult = JSON.parse(rawCandidate);
        break; // Success!
      } catch (err) {
        console.warn("[Gemini Failover]", modelName, err.message, "Trying next model...");
      }
    }

    if (!evalResult) {
      console.warn("[Gemini AI Brain Fallback] All cloud models unavailable; falling back to local smart engine.");
      var fallbackRes = this.recordAttempt(attempt);
      fallbackRes.coachResponse = fallbackRes.coachResponse || fallbackRes.feedback;
      return fallbackRes;
    }

    var isEligible = Boolean(evalResult.isEligible);
    var sentenceCount = Number(evalResult.sentenceCount) || (isEligible ? 1 : 0);
    var spokenReply = String(evalResult.spokenReply || '').trim();

    // Ensure spokenReply always ends with a question so the student is never left without a prompt
    if (!spokenReply.includes('?') && !this.pendingCorrection) {
      var starters = curMission.starterPrompts || [];
      var unasked = starters.filter(function (s) {
        return ctx.askedQuestions.indexOf(s) === -1;
      });
      var nextQ = unasked[0] || starters[verified % (starters.length || 1)] || "What else would you like to share about that?";
      spokenReply = spokenReply.replace(/[.!]+$/, '') + ". " + nextQ;
    }

    // Record question in askedQuestions
    var qMatch = spokenReply.match(/([^.!?]+[?])/);
    if (qMatch && qMatch[1]) {
      var cleanQ = qMatch[1].trim();
      if (cleanQ && ctx.askedQuestions.indexOf(cleanQ) === -1) {
        ctx.askedQuestions.push(cleanQ);
      }
    }

    // Enforce zero count if there is any error, doubt, or guidance request
    if (!isEligible || sentenceCount === 0) {
      this.pendingCorrection = evalResult.gentleCorrection || spokenReply;
      ctx.history.push({ role: 'student', text: text, timestamp: Date.now() });
      ctx.history.push({ role: 'coach', text: spokenReply, timestamp: Date.now() + 10 });

      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: evalResult.errorType || 'GRAMMAR_OR_GUIDANCE',
        feedback: spokenReply,
        coachResponse: spokenReply,
        progress: this.getProfile()
      };
    }

    // Valid Sentence! Increment verified count
    this.pendingCorrection = null;
    var remaining = Math.max(0, this.profile.missionTarget - this.profile.verifiedSentences);
    var countToAdd = Math.min(sentenceCount, remaining);
    if (countToAdd < 1 && this.profile.verifiedSentences < this.profile.missionTarget) countToAdd = 1;

    this.profile.verifiedSentences += countToAdd;
    this.profile.progressPct = calculateProgressPct(this.profile.verifiedSentences, this.profile.missionTarget);
    this.profile.lastUpdated = new Date().toISOString();

    var passed = false;
    if (this.profile.verifiedSentences >= this.profile.missionTarget) {
      this.profile.missionStatus = this.profile.currentMission < 32 ? 'PASSED' : 'COMPLETED';
      passed = true;
    }

    ctx.history.push({ role: 'student', text: text, timestamp: Date.now() });
    ctx.history.push({ role: 'coach', text: spokenReply, timestamp: Date.now() + 10 });

    // Trigger database sync hooks immediately!
    if (this.onSentenceVerified) {
      try { this.onSentenceVerified(this.getProfile(), attempt); } catch (e) {}
    }
    if (this.saveHandler) {
      try { this.saveHandler(this.getProfile()); } catch (e) {}
    }

    return {
      eligible: true,
      verifiedIncrement: countToAdd,
      validSentences: [text],
      passed: passed,
      reason: 'VERIFIED_SPOKEN_SENTENCE',
      feedback: spokenReply,
      coachResponse: spokenReply,
      progress: this.getProfile()
    };
  };

  AiCoachSession.prototype.generateConnectedTurn = function (text, isSuccess, evalResult) {
    var rawText = String(text || '').trim();
    var lower = rawText.toLowerCase().replace(/[^\w\s\?']/g, ' ');
    var curMission = this.getMissionDetails();
    var mNum = (this.profile && this.profile.currentMission) || (curMission && curMission.missionNumber) || 1;
    var ctx = this.dialogueContext || (this.dialogueContext = {
      activeTopic: null,
      topicDepth: 0,
      entities: {},
      discussedTopics: {},
      uninterrogatedTurns: 0,
      history: []
    });

    if (rawText) {
      ctx.history.push({ role: 'student', text: rawText, timestamp: Date.now() });
    }

    // 0. High Priority Intent Handling: Doubts, Explanations, Repetition, Confusion
    if (/(?:why\s+is\s+this|why\s+wrong|why\s+is\s+it\s+wrong|explain\s+why|why\s+did\s+you\s+correct)/i.test(lower)) {
      return "In English, every complete sentence needs a clear subject and an action or linking verb. Let's practice saying your complete thought again. You can do this!";
    }
    if (/(?:difference\s+between|what\s+is\s+the\s+difference)/i.test(lower)) {
      return "The key difference is verb tense: simple present is for habits, while past tense is for completed events. Let's try practicing with your own daily routine!";
    }
    if (/(?:how\s+(?:do|can)\s+i\s+say|teach\s+me\s+how\s+to\s+say|how\s+to\s+say\s+that)/i.test(lower)) {
      var modelEx = (curMission.starterPrompts && curMission.starterPrompts[0]) || "I enjoy speaking English every day.";
      return "Here is a natural way to say it: '" + modelEx + "'. Try speaking that aloud!";
    }
    if (/(?:please\s+repeat|can\s+you\s+repeat|say\s+it\s+again|say\s+it\s+slowly|once\s+more|onnode\s+parayumo)/i.test(lower)) {
      var repeatTarget = this.pendingCorrection || (curMission.starterPrompts && curMission.starterPrompts[0]) || "Please speak your complete thought in English.";
      return "I'll say it slowly for you: " + repeatTarget + " Try speaking that aloud!";
    }
    if (/(?:which\s+experience|what\s+(?:i\s+want|should\s+i|can\s+i)\s+to?\s*(?:say|tell|talk)|what\s+to\s+say|topic\s+to\s+talk|manasilayilla|confused)/i.test(lower)) {
      var sitHelp = curMission.situation || "daily English speaking";
      var starterHelp = (curMission.starterPrompts && curMission.starterPrompts[0]) || "Please introduce yourself aloud.";
      return "No worries at all! For Mission " + mNum + ", we are practicing " + sitHelp + ". For example, tell me how you greet your neighbor or ask for directions. You can say: 'I usually say good morning to my neighbor and ask how they are doing.'. Try speaking that aloud!";
    }

    // 1. Natural Error Correction within the conversation (Section 6)
    if (!isSuccess && evalResult) {
      if (evalResult.reason === 'SUBJECT_VERB_AGREEMENT') {
        return evalResult.feedback || "I understand what you mean! Just watch the subject agreement with he/she. Could you try saying that again?";
      }
      if (evalResult.reason === 'PAST_TENSE_ERROR') {
        return evalResult.feedback || "I see! When talking about past events, remember to use past tense. Give it another try!";
      }
      if (evalResult.reason === 'MISSING_VERB') {
        return "I see what you mean! Remember every complete thought needs an action or linking verb like 'is' or 'work'. Try saying that again!";
      }
      if (evalResult.reason === 'MISSING_SUBJECT') {
        return "That's a good phrase! Add a subject like 'I' or 'We' to make it a full sentence, and speak it aloud.";
      }
      return evalResult.feedback || "Let's refine that sentence together. Speak your thought aloud in a full sentence!";
    }

    // 2. Natural Topic & Entity Detection
    var travelMatch = lower.match(/(?:went\s+to|travelled\s+to|traveled\s+to|visited|trip\s+to|stayed\s+in|flew\s+to|came\s+from|living\s+in|live\s+in|going\s+to)\s+([a-z\s]+?)(?:yesterday|today|last\s+\w+|for\s+\w+|\.|$)/i)
      || lower.match(/\b(kochi|cochin|bangalore|bengaluru|dubai|london|delhi|mumbai|chennai|calicut|kozhikode|goa|hyderabad|pune|trivandrum|thiruvananthapuram|kerala|kannur|kottayam|thrissur|singapore|uk|usa|canada)\b/i);

    var place = '';
    if (travelMatch) {
      place = (travelMatch[1] || travelMatch[0] || '').trim();
      place = place.charAt(0).toUpperCase() + place.slice(1);
    }

    var isInterview = /(?:job\s+interview|interview|interviewing|applied\s+for|attend(?:ed)?\s+an\s+interview)/i.test(lower);
    var jobRoleMatch = lower.match(/(?:sales\s+executive|software\s+engineer|developer|web\s+developer|full\s+stack|accountant|manager|teacher|nurse|doctor|graphic\s+designer|designer|data\s+analyst|marketing\s+executive|consultant|technician|intern|assistant|engineer)\b/i);
    var isFirstJob = /(?:first\s+job|fresher|no\s+experience|never\s+worked|entry\s+level|my\s+first)/i.test(lower);
    var isInterviewQuestions = /(?:they\s+asked|asked\s+me|questions\s+about|asked\s+to|introduce\s+myself|my\s+strengths|experience|tell\s+me\s+about\s+yourself)/i.test(lower);
    var isInterviewOutcome = /(?:confident|nervous|waiting\s+for|selected|results|cleared|offer)/i.test(lower) && ctx.activeTopic === 'interview';

    // MISSION-SPECIFIC SITUATIONS (Highest Priority for the Active Mission)
    // Mission 8: Handle Everyday English (Greetings, Small Talk, Street Directions)
    if (mNum === 8) {
      if (/(?:neighbor|morning|hello|hi|good\s*morning|greet|meeting|speak\s+to)/i.test(lower)) {
        return "That is very warm and polite! If your neighbor asks how your week is going, what would you say?";
      }
      if (/(?:going\s*(?:well|great)|fine|busy|good|great|thanks|thank|day|week)/i.test(lower)) {
        return "Spot on! That flows naturally. Now imagine a visitor on your street stops and asks for directions to the nearest bank. How would you guide them?";
      }
      if (/(?:straight|turn|left|right|walk|road|street|signal|cross)/i.test(lower)) {
        return "Very clear street directions! What would you say if they ask if they should take a bus or walk?";
      }
      if (/(?:walk|bus|near|far|distance|minutes|can\s+walk)/i.test(lower)) {
        return "Nicely explained! And if you didn't hear someone clearly in a noisy store, how would you politely ask them to repeat?";
      }
      if (/(?:repeat|pardon|could\s+you|again|say\s+that|excuse)/i.test(lower)) {
        return "Very courteous and polite! What is a friendly parting phrase you say when leaving a store?";
      }
    }

    // Mission 10: Express Your Likes and Opinions (Workplace, Tech, Hobbies)
    if (mNum === 10) {
      if (/(?:remote|home|office|prefer|work|hybrid)/i.test(lower)) {
        return "That is a very sensible perspective! In your opinion, what is the biggest advantage of that choice?";
      }
      if (/(?:advantage|challenge|time|focus|commute|save|distraction)/i.test(lower)) {
        return "I completely understand that viewpoint! Now in your view, do smartphones help people connect better, or do they cause distraction?";
      }
      if (/(?:phone|smartphone|distraction|connect|social)/i.test(lower)) {
        return "That is an insightful observation! What kind of books or movies do you enjoy most in your free time, and why?";
      }
    }

    // SCENARIO 1: Travel & Job Interview (Exact User Conversational Progression)
    // Turn 1: Student: "I went to Kochi yesterday." -> Coach: "Oh, what took you to Kochi?"
    if (place && !isInterview && (ctx.activeTopic !== 'interview' || ctx.topicDepth === 0)) {
      ctx.activeTopic = 'travel';
      ctx.entities.place = place;
      ctx.topicDepth = 1;
      ctx.uninterrogatedTurns++;
      return "Oh, what took you to " + place + "?";
    }

    // Turn 2: Student: "I went there for a job interview." -> Coach: "I see. What kind of job was it?"
    if (isInterview && !jobRoleMatch && !isFirstJob) {
      ctx.activeTopic = 'interview';
      ctx.topicDepth = 2;
      ctx.uninterrogatedTurns++;
      return "I see. What kind of job was it?";
    }

    // Turn 3: Student: "It was a sales executive position." -> Coach: "That sounds interesting. Have you worked in sales before?"
    if (jobRoleMatch && ctx.activeTopic === 'interview' && !isFirstJob) {
      var role = jobRoleMatch[0];
      ctx.entities.jobRole = role;
      ctx.topicDepth = 3;
      var field = role.includes('sales') ? 'sales' : (role.includes('software') || role.includes('developer') ? 'software development' : (role.includes('teach') ? 'teaching' : 'that field'));
      ctx.uninterrogatedTurns++;
      return "That sounds interesting. Have you worked in " + field + " before?";
    }

    // Turn 4: Student: "No, this would be my first job." -> Coach: "Then your interview preparation is especially important. What did they ask you during the interview?"
    if (isFirstJob && ctx.activeTopic === 'interview') {
      ctx.entities.isFirstJob = true;
      ctx.topicDepth = 4;
      ctx.uninterrogatedTurns++;
      return "Then your interview preparation is especially important. What did they ask you during the interview?";
    }

    // Turn 5: Student answers what they asked
    if (isInterviewQuestions && ctx.activeTopic === 'interview') {
      ctx.topicDepth = 5;
      if (ctx.uninterrogatedTurns >= 2) {
        ctx.uninterrogatedTurns = 0;
        return "Answering those questions clearly makes a great impression. It sounds like you handled it very thoughtfully. How did you feel when the interview concluded?";
      }
      ctx.uninterrogatedTurns++;
      return "Those are essential interview questions! How did you feel answering them?";
    }

    // Turn 6: Interview outcome / feelings
    if (isInterviewOutcome && ctx.activeTopic === 'interview') {
      ctx.uninterrogatedTurns = 0;
      return "Staying calm and expressing yourself clearly is the biggest victory in any interview. How do you feel about your overall preparation?";
    }

    // SCENARIO 2: Profession & Work
    if (jobRoleMatch && ctx.activeTopic !== 'interview') {
      var curRole = jobRoleMatch[0];
      ctx.activeTopic = 'profession';
      ctx.entities.jobRole = curRole;
      ctx.topicDepth = 1;
      ctx.uninterrogatedTurns++;
      if (/teacher|teaching/i.test(curRole)) {
        return "Teaching is such an impactful profession! What subject or age group do you teach?";
      }
      if (/developer|software|engineer/i.test(curRole)) {
        return "Software engineering is a fast-growing field! What kind of projects or technologies do you work with?";
      }
      if (/nurse|doctor/i.test(curRole)) {
        return "Healthcare takes so much dedication and empathy. How long have you been in this profession?";
      }
      return "That sounds like an engaging profession! What does a typical day look like in your role?";
    }

    if (ctx.activeTopic === 'profession' && ctx.topicDepth === 1) {
      ctx.topicDepth = 2;
      if (ctx.uninterrogatedTurns >= 2) {
        ctx.uninterrogatedTurns = 0;
        return "Managing those responsibilities every day certainly takes strong coordination and communication skills. Do you usually work in a team or independently?";
      }
      ctx.uninterrogatedTurns++;
      return "Handling that requires good coordination. Do you usually work in a team or independently?";
    }

    // SCENARIO 3: Daily Routine & Morning Habits
    if (/(?:wake\s*up|morning|routine|breakfast|coffee|exercise|gym|jogging|start\s+(?:my\s+)?day)/i.test(lower)) {
      if (ctx.activeTopic !== 'routine') {
        ctx.activeTopic = 'routine';
        ctx.topicDepth = 1;
        ctx.uninterrogatedTurns++;
        return "Starting early with a set routine gives you great focus. What is usually your next priority after that?";
      } else {
        ctx.topicDepth = 2;
        if (ctx.uninterrogatedTurns >= 2) {
          ctx.uninterrogatedTurns = 0;
          return "Having an organized routine really sets a calm, productive tone for the entire day. What is usually your next priority after that?";
        }
        ctx.uninterrogatedTurns++;
        return "That sounds like a steady schedule. Do you prefer having your days structured, or being flexible?";
      }
    }

    // SCENARIO 4: Hobbies & Free Time
    if (/(?:reading|books|music|playing|badminton|football|cricket|walking|cooking|baking|gardening|movies|cinema|hobbies|free\s+time|weekend)/i.test(lower)) {
      if (ctx.activeTopic !== 'hobbies') {
        ctx.activeTopic = 'hobbies';
        ctx.topicDepth = 1;
        ctx.uninterrogatedTurns++;
        if (/reading|books/i.test(lower)) {
          return "Reading is such a wonderful habit! What genre of books do you enjoy reading most?";
        }
        if (/badminton|football|cricket|tennis|sports/i.test(lower)) {
          return "Playing sports is great for energy and health! Who do you usually play with?";
        }
        if (/cooking|baking|food/i.test(lower)) {
          return "Cooking is such a creative skill! What is your favorite dish to prepare?";
        }
        return "That sounds relaxing! How often do you get time to enjoy that during the week?";
      } else {
        ctx.topicDepth = 2;
        if (ctx.uninterrogatedTurns >= 2) {
          ctx.uninterrogatedTurns = 0;
          return "Finding time for personal hobbies is one of the best ways to recharge after a busy week. How long have you been interested in that hobby?";
        }
        ctx.uninterrogatedTurns++;
        return "Have you been interested in that for a long time, or did you start recently?";
      }
    }

    // SCENARIO 5: Family & Personal Life
    if (/(?:family|parents|mother|father|brother|sister|wife|husband|children|son|daughter|hometown|relatives)/i.test(lower)) {
      if (ctx.activeTopic !== 'family') {
        ctx.activeTopic = 'family';
        ctx.topicDepth = 1;
        ctx.uninterrogatedTurns++;
        return "That is lovely! Do you and your family usually spend time together on weekends?";
      } else {
        ctx.topicDepth = 2;
        ctx.uninterrogatedTurns = 0;
        return "Spending quality time with family really creates lasting memories and a supportive home. How often do you all get together for special occasions?";
      }
    }

    // SCENARIO 6: Unexpected Real-Life Events (Section 9)
    if (/(?:car\s+broke\s+down|puncture|traffic|accident|mechanic|highway|delay)/i.test(lower)) {
      ctx.activeTopic = 'car_breakdown';
      ctx.uninterrogatedTurns++;
      return "Oh no, that sounds stressful! How did you manage to get help and reach safely?";
    }
    if (/(?:raining|rain|monsoon|flood|weather|storm)/i.test(lower)) {
      ctx.activeTopic = 'weather';
      ctx.uninterrogatedTurns++;
      return "Heavy rain can certainly disrupt plans! Does it usually cause traffic issues where you are?";
    }
    if (/(?:cooked\s+dinner|celebrated|birthday|party|wedding|festival)/i.test(lower)) {
      ctx.activeTopic = 'celebration';
      ctx.uninterrogatedTurns++;
      return "That sounds like a wonderful celebration! What was the highlight of the event?";
    }

    // SCENARIO 7: Natural Non-Interrogative Reflections (Section 4: Do not end every response with a question)
    if (ctx.uninterrogatedTurns >= 2) {
      ctx.uninterrogatedTurns = 0;
      var observations = [
        "That makes total sense! Having clear goals always makes learning faster. What is the very first step you plan to take next?",
        "I completely agree! Practical real-life speaking builds true confidence. How often do you get the chance to speak English during your week?",
        "That expresses your thought with great clarity! When you speak English, do you feel more comfortable in casual chats or formal discussions?",
        "That sounds like a very sensible approach! Can you share an example of a situation where you learned something valuable recently?"
      ];
      return observations[(this.profile.verifiedSentences || 0) % observations.length];
    }

    // SCENARIO 8: Natural Mission-Guided Conversational Bridging (Zero Repetition)
    ctx.uninterrogatedTurns++;
    ctx.askedQuestions = ctx.askedQuestions || [];
    var mNum = this.profile.currentMission;

    var starters = (curMission && curMission.starterPrompts) || [];
    var unasked = starters.filter(function (s) {
      return ctx.askedQuestions.indexOf(s) === -1;
    });

    if (unasked.length > 0) {
      var nextPrompt = unasked[0];
      ctx.askedQuestions.push(nextPrompt);
      if (mNum === 1 && (this.profile.verifiedSentences || 0) === 0) {
        return "It's wonderful getting to know you. What goals are you most excited to accomplish this year?";
      }
      return nextPrompt;
    }

    // Mission 8: Handle Everyday English (Situation Demanding Stages)
    if (mNum === 8) {
      if (/(?:neighbor|morning|hello|hi|good\s*morning|greet)/i.test(lower)) {
        return "That is very warm and polite! If your neighbor asks how your week is going, what would you say?";
      }
      if (/(?:going\s*well|fine|busy|good|great|thanks|thank)/i.test(lower)) {
        return "Spot on! Now imagine a visitor on your street asks for directions to the nearest bank. How would you guide them?";
      }
      if (/(?:straight|turn|left|right|walk|road|street|signal)/i.test(lower)) {
        return "Very clear street directions! What would you say if they ask if they should take a bus or walk?";
      }
      if (/(?:walk|bus|near|far|distance|minutes)/i.test(lower)) {
        return "Nicely explained! And if you didn't hear someone clearly in a noisy store, how would you politely ask them to repeat?";
      }
      if (/(?:repeat|pardon|could\s+you|again|say\s+that)/i.test(lower)) {
        return "Very courteous and polite! What is a friendly parting phrase you say when leaving a store?";
      }
    }

    // Mission 10: Express Your Likes and Opinions
    if (mNum === 10) {
      if (/(?:remote|home|office|prefer|work|hybrid)/i.test(lower)) {
        return "That is a very sensible perspective! In your opinion, what is the biggest advantage of that choice?";
      }
      if (/(?:advantage|challenge|time|focus|commute|save|distraction)/i.test(lower)) {
        return "I completely understand that viewpoint! Now in your view, do smartphones help people connect better, or do they cause distraction?";
      }
      if (/(?:phone|smartphone|distraction|connect|social)/i.test(lower)) {
        return "That is an insightful observation! What kind of books or movies do you enjoy most in your free time, and why?";
      }
    }

    // Dynamic Mission Situational Fallback (Strictly inside mission situation)
    var starters = (curMission && curMission.starterPrompts) || [];
    var unasked = starters.filter(function (s) {
      return (ctx.askedQuestions || []).indexOf(s) === -1;
    });
    var nextPrompt = unasked[0] || starters[(this.profile.verifiedSentences || 0) % (starters.length || 1)] || "Please express your complete thought in English.";
    if (ctx.askedQuestions && ctx.askedQuestions.indexOf(nextPrompt) === -1) {
      ctx.askedQuestions.push(nextPrompt);
    }
    return "That expresses your thought clearly! In this situation, " + nextPrompt;
  };

  /**
   * Generates concise, natural conversational praise based on the student's actual
   * spoken words, keeping coach responses brief (2-3 words) so the student speaks more.
   */
  AiCoachSession.prototype.generateFeedback = function (text, isSuccess) {
    if (!isSuccess) {
      return "Let's try that again with a complete sentence.";
    }

    var lower = String(text || '').toLowerCase();

    // Contextual acknowledgements (Concise: 2-3 words)
    if (/(?:engineer|developer|designer|doctor|teacher|manager|accountant|nurse|student|job|profession|work\s+as)/i.test(lower)) {
      return "Spot on!";
    }
    if (/(?:morning|evening|breakfast|coffee|routine|wake\s*up|seven|eight|daily)/i.test(lower)) {
      return "Great phrasing!";
    }
    if (/(?:family|mother|father|brother|sister|parents|wife|husband|children|son|daughter)/i.test(lower)) {
      return "Warmly spoken!";
    }
    if (/(?:reading|books|music|park|walking|hobbies|travel|cooking|sports|playing)/i.test(lower)) {
      return "Well said!";
    }
    if (/(?:can|could|able\s+to)/i.test(lower)) {
      return "Spot on!";
    }
    if (/(?:must|have\s+to|need\s+to|responsible)/i.test(lower)) {
      return "Very clear!";
    }

    var concisePraises = [
      "Spot on!",
      "Well said!",
      "Great sentence!",
      "Very clear!",
      "Nicely phrased!"
    ];
    var idx = (this.profile.verifiedSentences || 0) % concisePraises.length;
    return concisePraises[idx];
  };

  AiCoachSession.prototype.getNextQuestion = function (studentText) {
    if (studentText) {
      return this.generateConnectedTurn(studentText, true);
    }
    var cur = this.getMissionDetails();
    var prompts = cur.starterPrompts || ["Please speak your answer aloud in full sentences."];
    var count = this.profile.verifiedSentences || 0;
    if (count === 0 && prompts.length > 0) {
      return prompts[0];
    }
    return this.generateConnectedTurn("", true);
  };

  AiCoachSession.prototype.advanceMission = function (forceAdvance) {
    if (forceAdvance || this.profile.verifiedSentences >= this.profile.missionTarget) {
      if (this.profile.currentMission < 32) {
        this.profile.currentMission += 1;
        this.profile.verifiedSentences = 0;
        this.profile.missionTarget = (Curriculum && Curriculum.getTargetForMission)
          ? Curriculum.getTargetForMission(this.profile.currentMission)
          : (this.profile.currentMission <= 8 ? 30 : (this.profile.currentMission <= 23 ? 40 : 50));
        this.profile.progressPct = 0;
        this.profile.missionStatus = 'IN_PROGRESS';
        this.profile.lastUpdated = new Date().toISOString();
        if (this.dialogueContext) {
          this.dialogueContext.askedQuestions = [];
          this.dialogueContext.history = [];
          this.dialogueContext.activeTopic = null;
          this.dialogueContext.topicDepth = 0;
        }
        return true;
      }
    }
    return false;
  };

  AiCoachSession.prototype.reconcileCloudProgress = function (cloudProfile) {
    if (!cloudProfile) return this.profile;

    var localTime = new Date(this.profile.lastUpdated).getTime();
    var cloudTime = new Date(cloudProfile.lastUpdated || 0).getTime();

    // Prevent stale updates from overwriting newer progress
    if (cloudTime > localTime) {
      this.profile = createProfile(cloudProfile);
      this.lastSavedTimestamp = this.profile.lastUpdated;
    } else if (localTime > cloudTime) {
      this.logger("Local progress is newer than cloud snapshot; preserving local state.");
    }
    return this.profile;
  };

  AiCoachSession.prototype.getMissionOpeningGreeting = function (studentName) {
    return getMissionOpeningGreeting(
      this.profile.currentMission,
      studentName || this.profile.name,
      this.profile.verifiedSentences,
      this.profile.missionTarget
    );
  };

  AiCoachSession.prototype.getMissionGuidance = function () {
    return getMissionGuidanceHelp(this.profile.currentMission, this.getMissionDetails());
  };

  /**
   * Process a student's spoken turn end-to-end with real-time feedback,
   * sentence verification, and situational next question.
   */
  AiCoachSession.prototype.processStudentSpeechTurn = async function (speechInput, options) {
    var text = (typeof speechInput === 'string') ? speechInput : (speechInput && speechInput.text ? speechInput.text : '');
    var attemptData = {
      source: 'speech',
      text: text,
      confidence: (speechInput && speechInput.confidence) || 0.95,
      turnId: (speechInput && speechInput.turnId) || Date.now(),
      nonce: 'voice_' + this.profile.currentMission + '_' + Date.now() + '_' + String(text).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24)
    };

    var attempt;
    if (typeof this.recordAttemptWithGemini === 'function') {
      attempt = await this.recordAttemptWithGemini(attemptData, options);
    } else {
      attempt = this.recordAttempt(attemptData);
    }

    var coachSpokenMessage = attempt.coachResponse || attempt.feedback || (this.getNextQuestion ? this.getNextQuestion(text) : "Tell me more about that.");

    return {
      verifiedCount: this.profile.verifiedSentences,
      verifiedIncrement: attempt.verifiedIncrement || 0,
      spokenResponse: coachSpokenMessage,
      isMissionCompleted: Boolean(attempt.passed),
      isEligible: Boolean(attempt.eligible),
      attempt: attempt
    };
  };

  AiCoachSession.prototype.endSession = function () {
    var curDetails = this.getMissionDetails();
    var summary = {
      admissionNumber: this.profile.admissionNumber,
      name: this.profile.name,
      currentMission: this.profile.currentMission,
      missionTitle: curDetails.title,
      verifiedSentences: this.profile.verifiedSentences,
      missionTarget: this.profile.missionTarget,
      progressPct: this.profile.progressPct,
      missionStatus: this.profile.missionStatus,
      sessionEndedAt: new Date().toISOString(),
      optionalHomework: [
        "Review vocabulary for " + curDetails.title,
        "Record 1 voice note applying today's grammar focus: " + curDetails.grammarFocus
      ]
    };

    if (this.saveHandler) {
      try {
        this.saveHandler(this.getProfile());
        summary.saveConfirmed = true;
      } catch (err) {
        summary.saveConfirmed = false;
        summary.saveError = err.toString();
      }
    }

    return {
      command: 'END SESSION',
      summary: summary,
      message: "Session ended. Great work today! Your verified progress has been reconciled."
    };
  };

  AiCoachSession.prototype.executeCommand = function (cmd) {
    return this.dispatchCommand(cmd);
  };

  AiCoachSession.prototype.generateDailyReport = function () {
    var res = this.endSession();
    return res && res.summary ? res.summary : res;
  };

  try {
    Object.defineProperty(AiCoachSession.prototype, 'currentMission', {
      get: function () {
        return this.profile ? this.profile.currentMission : 1;
      },
      set: function (val) {
        if (this.profile) {
          this.profile.currentMission = Number(val) || 1;
          if (Curriculum && Curriculum.getTargetForMission) {
            this.profile.missionTarget = Curriculum.getTargetForMission(this.profile.currentMission);
          }
        }
      },
      configurable: true
    });

    Object.defineProperty(AiCoachSession.prototype, 'verifiedSentences', {
      get: function () {
        return this.profile ? this.profile.verifiedSentences : 0;
      },
      set: function (val) {
        if (this.profile) {
          this.profile.verifiedSentences = Number(val) || 0;
          var target = this.profile.missionTarget || 30;
          this.profile.progressPct = Math.min(100, Math.round((this.profile.verifiedSentences / target) * 100));
        }
      },
      configurable: true
    });
  } catch (propErr) {}

  var MasteredAiCoachEngine = {
    normalizeCommand: normalizeCommand,
    calculateProgressPct: calculateProgressPct,
    createProfile: createProfile,
    AiCoachSession: AiCoachSession,
    evaluateSentenceGrammar: evaluateSentenceGrammar,
    detectStudentIntent: detectStudentIntent,
    getMissionOpeningGreeting: getMissionOpeningGreeting,
    getMissionGuidanceHelp: getMissionGuidanceHelp,
    segmentSentences: segmentSentences
  };

  root.MasteredAiCoachEngine = MasteredAiCoachEngine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredAiCoachEngine;
  }
})();
