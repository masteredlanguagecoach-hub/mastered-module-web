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
    CONTINUE: /^(continue|next(\s*question)?|keep\s*going|more\s*practice)/i,
    HOMEWORK: /^(homework|assignment|home\s*task|give\s*me\s*homework)/i,
    VOCABULARY: /^(vocabulary|vocab|words?|new\s*words?|teach\s*me\s*vocab(ulary)?)/i,
    FREE_TALK: /^(free\s*talk|free\s*conversation|casual\s*chat|let'?s\s*just\s*talk)/i,
    END_SESSION: /^(end(\s*session)?|finish(\s*for\s*today)?|goodbye|bye|exit|stop|quit|i\s*want\s*to\s*stop)/i
  };

  function normalizeCommand(input) {
    if (!input || typeof input !== 'string') return null;
    var trimmed = input.trim();
    if (COMMAND_PATTERNS.NEW_STUDENT.test(trimmed)) return 'NEW STUDENT';
    if (COMMAND_PATTERNS.START.test(trimmed)) return 'START';
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
          if (hasClauseVerb) {
            if (!CONJUNCTIONS[prevWord] && !CONJUNCTIONS[cw]) {
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

    // D. Subject & Predicate Verb Identification
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

    // E. Common Learner Grammar Diagnostics
    // 1. Subject-Verb Agreement: "he go", "she work", "it seem"
    if (words.length >= 2) {
      var sIdx = -1;
      for (var si = 0; si < words.length; si++) {
        if (words[si] === 'he' || words[si] === 'she' || words[si] === 'it') {
          sIdx = si;
          break;
        }
      }
      if (sIdx !== -1 && sIdx + 1 < words.length) {
        var nextW = words[sIdx + 1];
        if (nextW === 'go' || nextW === 'work' || nextW === 'live' || nextW === 'like' || nextW === 'want' || nextW === 'start' || nextW === 'need' || nextW === 'read' || nextW === 'play') {
          return {
            valid: false,
            reason: 'SUBJECT_VERB_AGREEMENT',
            feedback: "Notice the subject agreement: with '" + words[sIdx] + "', use third-person singular (e.g. '" + words[sIdx] + " " + nextW + "s' or past '" + (nextW === 'go' ? 'went' : nextW + 'ed') + "')."
          };
        }
      }
    }

    // 2. Past time marker with base present verb: e.g. "yesterday I go" or "he go store yesterday"
    var hasPastMarker = words.indexOf('yesterday') !== -1 || words.indexOf('ago') !== -1 || words.indexOf('last') !== -1;
    if (hasPastMarker) {
      if (words.indexOf('go') !== -1) {
        return {
          valid: false,
          reason: 'PAST_TENSE_ERROR',
          feedback: "When talking about past time (like yesterday), use the past tense 'went' instead of 'go'."
        };
      }
    }

    return { valid: true };
  }

  // 4. NLP Intent Parser (Questions, Emotions, Hesitation, Clarification, Manglish)
  function detectStudentIntent(text, missionDetails) {
    if (!text || typeof text !== 'string') return null;
    var trimmed = text.trim();
    var lower = trimmed.toLowerCase().replace(/[^\w\s\?']/g, '');

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

    // STEP 3: Self-Correction & Retry Management
    if (this.pendingCorrection) {
      if (validCompleteSentences.length > 0) {
        // Successful self-correction! Clear pending correction and count ONCE.
        this.pendingCorrection = null;
        validCompleteSentences = [validCompleteSentences[0]]; // Count the corrected version once
      } else {
        return {
          eligible: false,
          verifiedIncrement: 0,
          reason: 'RETRY_INCORRECT',
          feedback: (firstError && firstError.feedback) ? firstError.feedback : ("Not quite right yet. Try again: " + this.pendingCorrection),
          progress: this.getProfile()
        };
      }
    } else if (validCompleteSentences.length === 0) {
      // No valid sentences found; report first error and set pending correction
      var errReason = firstError ? firstError.reason : 'FRAGMENT_OR_INCOMPLETE';
      var errFeedback = firstError ? firstError.feedback : "Please speak in a full, complete sentence.";
      this.pendingCorrection = attempt.modelCorrection || errFeedback;
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: errReason,
        feedback: errFeedback,
        progress: this.getProfile()
      };
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

    return {
      eligible: true,
      verifiedIncrement: countToAdd,
      validSentences: validCompleteSentences,
      passed: passed,
      reason: 'VERIFIED_SPOKEN_SENTENCE',
      feedback: attempt.feedback || this.generateFeedback(text, true),
      progress: this.getProfile()
    };
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

  AiCoachSession.prototype.getNextQuestion = function () {
    var cur = this.getMissionDetails();
    var prompts = cur.starterPrompts || ["Please speak your answer aloud in full sentences."];
    var count = this.profile.verifiedSentences || 0;
    if (count < prompts.length) {
      return prompts[count];
    }
    var followUps = cur.followUpPrompts || [
      "Can you give another detailed example related to " + cur.situation + "?",
      "Using " + cur.grammarFocus + ", describe a specific personal experience you have had.",
      "How would you explain this situation to a colleague or friend in English?",
      "What are the most interesting advantages or challenges you notice here?",
      "Can you summarize your thoughts on this topic in two strong, fluent sentences?"
    ];
    var idx = (count - prompts.length) % followUps.length;
    return followUps[idx];
  };

  AiCoachSession.prototype.advanceMission = function () {
    if (this.profile.verifiedSentences >= this.profile.missionTarget) {
      if (this.profile.currentMission < 32) {
        this.profile.currentMission += 1;
        this.profile.verifiedSentences = 0;
        this.profile.missionTarget = (Curriculum && Curriculum.getTargetForMission)
          ? Curriculum.getTargetForMission(this.profile.currentMission)
          : (this.profile.currentMission <= 8 ? 30 : (this.profile.currentMission <= 23 ? 40 : 50));
        this.profile.progressPct = 0;
        this.profile.missionStatus = 'IN_PROGRESS';
        this.profile.lastUpdated = new Date().toISOString();
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

  var MasteredAiCoachEngine = {
    normalizeCommand: normalizeCommand,
    calculateProgressPct: calculateProgressPct,
    createProfile: createProfile,
    AiCoachSession: AiCoachSession,
    evaluateSentenceGrammar: evaluateSentenceGrammar,
    detectStudentIntent: detectStudentIntent,
    segmentSentences: segmentSentences
  };

  root.MasteredAiCoachEngine = MasteredAiCoachEngine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredAiCoachEngine;
  }
})();
