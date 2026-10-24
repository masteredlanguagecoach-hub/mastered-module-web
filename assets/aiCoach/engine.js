/**
 * Official Mastered AI Coach Engine
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md
 * Handles application-controlled assessment, deterministic progress,
 * command dispatching, deduplication, and profile workflows.
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

  // Command Matchers with natural-language equivalents
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

  function calculateProgressPct(verifiedSentences, target) {
    var v = parseInt(verifiedSentences, 10) || 0;
    var t = parseInt(target, 10) || 30;
    if (t <= 0) return 0;
    var pct = Math.round((v / t) * 100);
    return Math.min(100, Math.max(0, pct));
  }

  function createProfile(data) {
    var rawAdm = (data && data.admissionNumber) ? String(data.admissionNumber).trim().toUpperCase() : 'STUDENT';
    var mission = parseInt(data && data.currentMission, 10) || 1;
    if (mission < 1) mission = 1;
    if (mission > 32) mission = 32;

    var target = (Curriculum && Curriculum.getTargetForMission) ? Curriculum.getTargetForMission(mission) : (mission <= 8 ? 30 : (mission <= 23 ? 40 : 50));
    var verified = parseInt(data && data.verifiedSentences, 10) || 0;
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

  function AiCoachSession(initialProfile, options) {
    options = options || {};
    this.profile = createProfile(initialProfile);
    this.processedNonces = {};
    this.history = [];
    this.currentMode = 'STRUCTURED'; // 'STRUCTURED' | 'FREE_TALK'
    this.pendingCorrection = null;
    this.lastSavedTimestamp = this.profile.lastUpdated;
    this.saveHandler = options.onSaveProgress || null;
    this.logger = options.logger || function () {};
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

  AiCoachSession.prototype.recordAttempt = function (attempt) {
    attempt = attempt || {};

    // Check nonce for duplicate event prevention
    var nonce = attempt.nonce || (attempt.text ? attempt.text + '_' + Date.now() : null);
    if (nonce && this.processedNonces[nonce]) {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'DUPLICATE_EVENT_REJECTED',
        progress: this.getProfile()
      };
    }
    if (nonce) {
      this.processedNonces[nonce] = true;
    }

    // STRICT GUARD: Typed answers NEVER count as verified spoken practice
    if (attempt.source !== 'speech') {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'NON_SPOKEN_INPUT_REJECTED',
        feedback: "Typed answers cannot be counted as spoken practice. Please speak aloud using the microphone.",
        progress: this.getProfile()
      };
    }

    // Transcription reliability check
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

    var text = String(attempt.text || '').trim();
    if (!text || text.split(/\s+/).length < 2) {
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'TOO_SHORT_OR_EMPTY',
        feedback: "Please answer with a complete sentence.",
        progress: this.getProfile()
      };
    }

    // Evaluate eligibility
    var isCorrect = Boolean(attempt.isCorrect !== false && !attempt.isIncorrect);

    // Correction retry handling: if student repeats an incorrect sentence correctly, count once
    if (this.pendingCorrection) {
      if (isCorrect) {
        this.pendingCorrection = null;
        // Count the successful corrected attempt once
      } else {
        return {
          eligible: false,
          verifiedIncrement: 0,
          reason: 'RETRY_INCORRECT',
          feedback: attempt.feedback || "Not quite right yet. Try again: " + this.pendingCorrection,
          progress: this.getProfile()
        };
      }
    } else if (!isCorrect) {
      this.pendingCorrection = attempt.modelCorrection || attempt.feedback || "Please practice this sentence structure again.";
      return {
        eligible: false,
        verifiedIncrement: 0,
        reason: 'INCORRECT_ATTEMPT',
        feedback: "Correction needed: " + this.pendingCorrection,
        progress: this.getProfile()
      };
    }

    // Increment verified spoken count by exactly 1
    this.profile.verifiedSentences += 1;
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

    return {
      eligible: true,
      verifiedIncrement: 1,
      passed: passed,
      reason: 'VERIFIED_SPOKEN_SENTENCE',
      feedback: attempt.feedback || "Great job! Accurate spoken sentence verified.",
      progress: this.getProfile()
    };
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
    AiCoachSession: AiCoachSession
  };

  root.MasteredAiCoachEngine = MasteredAiCoachEngine;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredAiCoachEngine;
  }
})();
