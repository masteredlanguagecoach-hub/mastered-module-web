/**
 * Official Mastered AI Coach Live Speaking Room Component
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md & Live Voice Architecture
 * 
 * Features:
 * - Two distinct modes: Live Voice Coach (default) & Text Practice (fallback)
 * - Single-tap "Start Live Practice" hands-free continuous loop
 * - Real-time animated audio waveform driven by Web Audio API AnalyserNode
 * - Explicit 12-state conversation machine visualizer
 * - Barge-in interruption support (immediate SpeechSynthesis cancel)
 * - Voice controls: Pause, Resume, Repeat, Speed (0.8x, 1.0x, 1.2x), End Session
 * - Strict progress integrity: only verified spoken sentences increment progress
 */

(function (global) {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  function MasteredAiCoachSpeakingRoom(props) {
    var currentUser = props.currentUser;
    var userProgress = props.userProgress;
    var onClose = props.onClose;
    var onSaveProgress = props.onSaveProgress;
    var showToast = props.showToast;

    if (!React) return null;
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useRef = React.useRef;

    var admNum = (currentUser && currentUser.admissionNumber) ? currentUser.admissionNumber : 'MTR-7082';
    var studentName = (currentUser && currentUser.name) ? currentUser.name : 'Student';

    // Find highest active module progress
    var initialMission = 1;
    var initialVerified = 0;
    if (userProgress) {
      for (var m = 1; m <= 32; m++) {
        var k = 'MOD-' + (m < 10 ? '0' + m : m);
        if (userProgress[k] && userProgress[k].percentage > 0) {
          initialMission = m;
        }
      }
    }

    // Two distinct modes: 'VOICE' (default) | 'TEXT'
    var _useStatePracticeMode = useState('VOICE');
    var practiceMode = _useStatePracticeMode[0];
    var setPracticeMode = _useStatePracticeMode[1];

    // 12-State Machine State
    var _useStateState = useState('IDLE');
    var pipelineState = _useStateState[0];
    var setPipelineState = _useStateState[1];

    // Audio energy level for waveform (0 - 100)
    var _useStateAudioLevel = useState(0);
    var audioLevel = _useStateAudioLevel[0];
    var setAudioLevel = _useStateAudioLevel[1];

    // Live Transcripts & Feedback
    var _useStateTranscript = useState('');
    var liveTranscript = _useStateTranscript[0];
    var setLiveTranscript = _useStateTranscript[1];

    var _useStateFeedback = useState('');
    var coachFeedback = _useStateFeedback[0];
    var setCoachFeedback = _useStateFeedback[1];

    var _useStatePrompt = useState('');
    var activePrompt = _useStatePrompt[0];
    var setActivePrompt = _useStatePrompt[1];

    var _useStateProfile = useState(null);
    var profileState = _useStateProfile[0];
    var setProfileState = _useStateProfile[1];

    var _useStateSummary = useState(null);
    var sessionSummary = _useStateSummary[0];
    var setSessionSummary = _useStateSummary[1];

    var _useStateSpeed = useState(1.0);
    var speechSpeed = _useStateSpeed[0];
    var setSpeechSpeed = _useStateSpeed[1];

    var _useStateTextInput = useState('');
    var textInput = _useStateTextInput[0];
    var setTextInput = _useStateTextInput[1];

    var sessionRef = useRef(null);
    var pipelineRef = useRef(null);

    // Initialize session and live pipeline
    useEffect(function () {
      var initialProfile = {
        admissionNumber: admNum,
        name: studentName,
        currentMission: initialMission,
        verifiedSentences: initialVerified
      };

      var session = new root.MasteredAiCoachEngine.AiCoachSession(initialProfile, {
        onSaveProgress: function (p) {
          if (onSaveProgress) {
            onSaveProgress(p);
          }
        }
      });
      sessionRef.current = session;
      setProfileState(session.getProfile());

      var missionDetails = session.getMissionDetails();
      var initialP = (missionDetails.starterPrompts && missionDetails.starterPrompts[0]) || "Please introduce yourself aloud.";
      setActivePrompt(initialP);

      if (root.MasteredSpeech && root.MasteredSpeech.LiveVoicePipeline) {
        var pipeline = new root.MasteredSpeech.LiveVoicePipeline({
          speechRate: 0.95,
          onStateChange: function (st, prevSt, meta) {
            setPipelineState(st);
          },
          onAudioLevel: function (lvl) {
            setAudioLevel(lvl);
          },
          onTranscriptUpdate: function (fullText, interim) {
            setLiveTranscript(fullText);
          },
          onStudentTurnComplete: function (turnData) {
            handleStudentVoiceTurn(turnData);
          },
          onIntentDetected: function (intent, text) {
            if (intent === 'END_SESSION') {
              handleEndSession();
            } else if (intent === 'REPEAT') {
              if (pipelineRef.current) {
                pipelineRef.current.speakCoachResponse("I'll repeat the question: " + activePrompt);
              }
            } else if (intent === 'DONT_UNDERSTAND') {
              var hint = "No worries! Here is a simpler tip: Focus on " + curMission.grammarFocus + ". For example: " + (curMission.starterPrompts ? curMission.starterPrompts[0] : activePrompt);
              if (pipelineRef.current) {
                pipelineRef.current.speakCoachResponse(hint);
              }
            }
          },
          onError: function (err) {
            setCoachFeedback("Notice: " + (err.message || 'Audio notice. Please check microphone.'));
          }
        });
        pipelineRef.current = pipeline;
      }

      return function () {
        if (pipelineRef.current) {
          pipelineRef.current.endLiveSession();
        }
      };
    }, []);

    if (!profileState) return null;

    var curMission = sessionRef.current.getMissionDetails();

    // Turn Orchestration: Student speaks -> Engine evaluates -> Coach responds aloud -> Return to listening
    var handleStudentVoiceTurn = function (turnData) {
      if (!sessionRef.current) return;

      var attempt = sessionRef.current.recordAttempt({
        source: 'speech',
        text: turnData.text,
        confidence: turnData.confidence,
        turnId: turnData.turnId,
        nonce: 'turn_' + turnData.turnId + '_' + turnData.text.replace(/[^a-zA-Z0-9]/g, '').slice(0, 24)
      });

      var prof = sessionRef.current.getProfile();
      setProfileState(prof);

      var speechText = '';
      if (attempt.passed) {
        speechText = "Outstanding job! You completed all " + prof.missionTarget + " target sentences for Mission " + prof.currentMission + "! Let's advance to the next mission.";
        setActivePrompt(speechText);
      } else if (attempt.isIntent) {
        speechText = attempt.feedback;
      } else if (!attempt.eligible) {
        speechText = attempt.feedback;
      } else {
        var nextQ = sessionRef.current.getNextQuestion();
        setActivePrompt(nextQ);
        speechText = attempt.feedback + " " + nextQ;
      }

      setCoachFeedback(speechText);

      // Trigger progress sync hook if eligible
      if (attempt.eligible && attempt.verifiedIncrement > 0 && onSaveProgress) {
        onSaveProgress(prof);
      }

      if (pipelineRef.current) {
        pipelineRef.current.speakCoachResponse(speechText);
      }
    };

    var handleStartLivePractice = async function () {
      if (!pipelineRef.current) {
        alert("Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.");
        return;
      }
      setCoachFeedback('');
      setLiveTranscript('');

      if (pipelineRef.current.unlockMobileAudio) {
        pipelineRef.current.unlockMobileAudio();
      }

      var started = await pipelineRef.current.startLiveSession();
      if (started) {
        // Greet student aloud and set initial prompt
        var greeting = "Hello " + studentName + "! Welcome to Mission " + curMission.missionNumber + ": " + curMission.title + ". " + activePrompt;
        pipelineRef.current.speakCoachResponse(greeting);
      }
    };

    var handlePauseResume = function () {
      if (!pipelineRef.current) return;
      if (pipelineState === 'PAUSED') {
        pipelineRef.current.resumeListening();
      } else {
        pipelineRef.current.pauseListening();
      }
    };

    var handleInterrupt = function () {
      if (!pipelineRef.current) return;
      pipelineRef.current.handleBargeInInterruption("User tapped interrupt button");
    };

    var handleReplayVoice = function () {
      if (!pipelineRef.current) return;
      if (pipelineRef.current.unlockMobileAudio) {
        pipelineRef.current.unlockMobileAudio();
      }
      pipelineRef.current.replayLastCoachSpeech();
    };

    var handleRepeatInstruction = function () {
      if (!pipelineRef.current) return;
      pipelineRef.current.speakCoachResponse("I'll repeat the task: " + activePrompt);
    };

    var handleSpeedToggle = function () {
      if (!pipelineRef.current) return;
      var newSpeed = speechSpeed === 1.0 ? 0.8 : (speechSpeed === 0.8 ? 1.15 : 1.0);
      setSpeechSpeed(newSpeed);
      pipelineRef.current.speechRate = newSpeed;
      if (showToast) {
        showToast("Speech speed adjusted to " + newSpeed + "x");
      }
    };

    var handleEndSession = function () {
      if (pipelineRef.current) {
        pipelineRef.current.endLiveSession();
      }
      if (sessionRef.current) {
        var res = sessionRef.current.endSession();
        setSessionSummary(res.summary);
      }
    };

    // Text Practice Mode Handler (Fallback)
    var handleTextSubmit = function (e) {
      if (e) e.preventDefault();
      if (!textInput.trim() || !sessionRef.current) return;

      var attempt = sessionRef.current.recordAttempt({
        source: 'text', // Non-spoken; strictly increments 0 verified sentences
        text: textInput.trim(),
        confidence: 1.0,
        nonce: 'text_' + curMission.missionNumber + '_' + textInput.trim().replace(/[^a-zA-Z0-9]/g, '').slice(0, 24)
      });

      setCoachFeedback(attempt.feedback);
      setTextInput('');
      var nextQ = sessionRef.current.getNextQuestion();
      setActivePrompt(nextQ);
    };

    // State Color and Status Label
    var getStateMeta = function (st) {
      switch (st) {
        case 'LISTENING':
          return { label: 'Listening... Speak naturally', color: 'bg-emerald-500 text-white', pulse: true };
        case 'SPEAKING':
          return { label: 'Coach Speaking... (Tap Interrupt or speak)', color: 'bg-indigo-600 text-white', pulse: true };
        case 'PROCESSING_SPEECH':
          return { label: 'Processing speech...', color: 'bg-blue-600 text-white', pulse: false };
        case 'GENERATING_RESPONSE':
          return { label: 'Thinking...', color: 'bg-purple-600 text-white', pulse: false };
        case 'INTERRUPTED':
          return { label: 'Interrupted! Listening...', color: 'bg-amber-500 text-slate-950', pulse: true };
        case 'PAUSED':
          return { label: 'Paused', color: 'bg-slate-500 text-white', pulse: false };
        case 'REQUESTING_MICROPHONE':
          return { label: 'Requesting Mic Access...', color: 'bg-yellow-500 text-slate-950', pulse: false };
        case 'INITIALIZING':
          return { label: 'Starting Live Session...', color: 'bg-indigo-400 text-white', pulse: false };
        case 'RECOVERING':
          return { label: 'Reconnecting audio...', color: 'bg-amber-600 text-white', pulse: false };
        case 'ERROR':
          return { label: 'Microphone Error', color: 'bg-red-600 text-white', pulse: false };
        case 'ENDING':
          return { label: 'Ending Session...', color: 'bg-slate-600 text-white', pulse: false };
        default:
          return { label: 'Ready to Start', color: 'bg-slate-100 text-slate-700', pulse: false };
      }
    };

    var stateMeta = getStateMeta(pipelineState);

    return React.createElement(
      'div',
      {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md',
        onClick: onClose
      },
      React.createElement(
        'div',
        {
          className: 'bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[94vh] overflow-y-auto',
          onClick: function (e) { e.stopPropagation(); }
        },

        // Top Header
        React.createElement(
          'div',
          { className: 'flex justify-between items-start border-b pb-3.5' },
          React.createElement(
            'div',
            { className: 'flex items-center space-x-3' },
            React.createElement(
              'div',
              { className: 'w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-md' },
              '🎙️'
            ),
            React.createElement(
              'div',
              null,
              React.createElement('h3', { className: 'font-extrabold text-slate-900 text-base sm:text-lg' }, 'Mastered AI Live Speaking Coach'),
              React.createElement('p', { className: 'text-xs text-slate-500 font-medium' }, 'Hands-Free Continuous Voice Conversation • Zero Typing')
            )
          ),
          React.createElement(
            'button',
            { onClick: onClose, className: 'p-1.5 text-slate-400 hover:text-slate-700 text-lg font-bold' },
            '✕'
          )
        ),

        // Session Summary (if ended)
        sessionSummary ? React.createElement(
          'div',
          { className: 'p-5 bg-gradient-to-b from-indigo-50/60 to-white rounded-2xl border border-indigo-200 space-y-3' },
          React.createElement('span', { className: 'px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white' }, 'Daily Session Report'),
          React.createElement('h4', { className: 'font-extrabold text-lg text-slate-900' }, 'Practice Session Completed & Reconciled!'),
          React.createElement(
            'div',
            { className: 'grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1' },
            React.createElement('div', null, React.createElement('strong', null, 'Student: '), sessionSummary.name),
            React.createElement('div', null, React.createElement('strong', null, 'Admission: '), sessionSummary.admissionNumber),
            React.createElement('div', null, React.createElement('strong', null, 'Mission: '), sessionSummary.currentMission + ' (' + sessionSummary.missionTitle + ')'),
            React.createElement('div', null, React.createElement('strong', null, 'Verified Spoken: '), sessionSummary.verifiedSentences + ' / ' + sessionSummary.missionTarget + ' (' + sessionSummary.progressPct + '%)')
          ),
          React.createElement(
            'button',
            {
              onClick: onClose,
              className: 'w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition'
            },
            '✓ Close & Return to Dashboard'
          )
        ) : React.createElement(
          'div',
          { className: 'space-y-4' },

          // Mode Selector Tabs (Live Voice vs Text Practice)
          React.createElement(
            'div',
            { className: 'flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold' },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: function () { setPracticeMode('VOICE'); },
                className: 'flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center space-x-1.5 ' + (practiceMode === 'VOICE' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600')
              },
              React.createElement('span', null, '🎙️'),
              React.createElement('span', null, 'Live Voice Coach (Primary)')
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: function () { setPracticeMode('TEXT'); },
                className: 'flex-1 py-2 px-3 rounded-lg transition flex items-center justify-center space-x-1.5 ' + (practiceMode === 'TEXT' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600')
              },
              React.createElement('span', null, '⌨️'),
              React.createElement('span', null, 'Text Practice (Fallback)')
            )
          ),

          // Student Mission Status Box
          React.createElement(
            'div',
            { className: 'grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs' },
            React.createElement('div', null, React.createElement('span', { className: 'text-[10px] uppercase font-bold text-slate-400 block' }, 'Student ID'), React.createElement('span', { className: 'font-extrabold text-slate-900' }, profileState.admissionNumber)),
            React.createElement('div', null, React.createElement('span', { className: 'text-[10px] uppercase font-bold text-slate-400 block' }, 'Current Mission'), React.createElement('span', { className: 'font-extrabold text-slate-900' }, 'Mission ' + profileState.currentMission + ' of 32')),
            React.createElement('div', null, React.createElement('span', { className: 'text-[10px] uppercase font-bold text-slate-400 block' }, 'Spoken Target'), React.createElement('span', { className: 'font-extrabold text-indigo-600' }, profileState.missionTarget + ' Sentences')),
            React.createElement('div', null, React.createElement('span', { className: 'text-[10px] uppercase font-bold text-slate-400 block' }, 'Verified Progress'), React.createElement('span', { className: 'font-extrabold text-emerald-600' }, profileState.verifiedSentences + ' (' + profileState.progressPct + '%)'))
          ),

          // Progress Bar
          React.createElement(
            'div',
            { className: 'space-y-1.5' },
            React.createElement(
              'div',
              { className: 'flex justify-between items-baseline text-xs font-bold text-slate-700' },
              React.createElement('span', null, 'Mission ' + curMission.missionNumber + ': ' + curMission.title),
              React.createElement('span', { className: 'text-indigo-600 font-extrabold' }, profileState.verifiedSentences + ' / ' + profileState.missionTarget + ' Verified')
            ),
            React.createElement(
              'div',
              { className: 'w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5' },
              React.createElement('div', {
                className: 'h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300',
                style: { width: profileState.progressPct + '%' }
              })
            )
          ),

          // Speaking Prompt Card
          React.createElement(
            'div',
            { className: 'p-4 bg-slate-900 text-white rounded-2xl space-y-2.5 shadow-inner' },
            React.createElement(
              'div',
              { className: 'flex justify-between items-center text-[11px] text-slate-400 border-b border-slate-800 pb-2' },
              React.createElement('span', { className: 'font-bold uppercase tracking-wider text-indigo-400' }, 'Speaking Task'),
              React.createElement('span', { className: 'font-mono text-slate-300' }, 'Grammar: ' + curMission.grammarFocus)
            ),
            React.createElement('p', { className: 'text-sm sm:text-base font-semibold leading-relaxed text-slate-100' }, activePrompt)
          ),

          // MODE 1: LIVE VOICE COACH
          practiceMode === 'VOICE' ? React.createElement(
            'div',
            { className: 'space-y-3.5' },

            // State Indicator & Waveform Audio Visualizer
            React.createElement(
              'div',
              { className: 'p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white space-y-3 border border-slate-800 shadow-md' },
              React.createElement(
                'div',
                { className: 'flex justify-between items-center text-xs' },
                React.createElement(
                  'span',
                  { className: 'px-3 py-1 rounded-full font-bold text-[11px] ' + stateMeta.color + (stateMeta.pulse ? ' animate-pulse' : '') },
                  stateMeta.label
                ),
                React.createElement(
                  'span',
                  { className: 'text-[11px] font-mono text-slate-400' },
                  'Mic Volume: ' + audioLevel + '%'
                )
              ),

              // Animated Waveform Bars driven by AnalyserNode
              React.createElement(
                'div',
                { className: 'flex items-center justify-center space-x-1.5 h-12 py-1' },
                [0.4, 0.7, 1.0, 0.8, 0.5, 0.9, 1.2, 0.6, 0.8, 0.5].map(function (factor, idx) {
                  var barHeight = Math.max(6, Math.min(42, Math.round((audioLevel * factor * 0.45) + (pipelineState === 'SPEAKING' ? 18 : 6))));
                  return React.createElement('div', {
                    key: idx,
                    className: 'w-2 bg-gradient-to-t ' + (pipelineState === 'LISTENING' ? 'from-emerald-600 to-teal-400' : (pipelineState === 'SPEAKING' ? 'from-indigo-600 to-purple-400' : 'from-slate-700 to-slate-600')) + ' rounded-full transition-all duration-100',
                    style: { height: barHeight + 'px' }
                  });
                })
              )
            ),

            // Live Transcript
            liveTranscript ? React.createElement(
              'div',
              { className: 'p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1' },
              React.createElement('span', { className: 'text-[10px] font-bold text-slate-500 uppercase' }, 'You said:'),
              React.createElement('p', { className: 'font-semibold text-slate-800 italic text-sm' }, '"' + liveTranscript + '"')
            ) : null,

            // Coach Feedback
            coachFeedback ? React.createElement(
              'div',
              { className: 'p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium' },
              React.createElement('span', { className: 'font-extrabold text-emerald-800' }, 'Coach: '),
              coachFeedback
            ) : null,

            // Primary Start Live Practice Button (Tap Once Hands-Free)
            pipelineState === 'IDLE' ? React.createElement(
              'button',
              {
                type: 'button',
                onClick: handleStartLivePractice,
                className: 'w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition flex items-center justify-center space-x-2'
              },
              React.createElement('span', { className: 'text-xl' }, '🎙️'),
              React.createElement('span', null, 'Start Live Practice (Hands-Free Conversation)')
            ) : React.createElement(
              'div',
              { className: 'flex flex-wrap gap-2 text-xs font-bold pt-1' },
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handlePauseResume,
                  className: 'flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition'
                },
                pipelineState === 'PAUSED' ? '▶️ Resume Listening' : '⏸️ Pause Listening'
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleInterrupt,
                  disabled: pipelineState !== 'SPEAKING',
                  className: 'py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl transition disabled:opacity-40'
                },
                '✋ Interrupt Coach'
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleReplayVoice,
                  className: 'py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl transition'
                },
                '🔊 Replay Voice'
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleRepeatInstruction,
                  className: 'py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition'
                },
                '🔄 Repeat Prompt'
              ),
              React.createElement(
                'button',
                {
                  type: 'button',
                  onClick: handleSpeedToggle,
                  className: 'py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl transition'
                },
                '⚡ Speed: ' + speechSpeed + 'x'
              )
            )
          ) : React.createElement(
            // MODE 2: TEXT PRACTICE FALLBACK
            'div',
            { className: 'space-y-3' },
            React.createElement(
              'div',
              { className: 'p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed' },
              React.createElement('strong', null, 'ℹ️ Text Practice Fallback Notice: '),
              'Typed responses are evaluated for grammar and feedback, but ',
              React.createElement('strong', null, 'only verified spoken practice'),
              ' increments your official mission sentence target.'
            ),
            React.createElement(
              'form',
              { onSubmit: handleTextSubmit, className: 'space-y-2' },
              React.createElement('textarea', {
                rows: 3,
                value: textInput,
                onChange: function (e) { setTextInput(e.target.value); },
                placeholder: 'Type your English sentence here...',
                className: 'w-full p-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none'
              }),
              React.createElement(
                'button',
                {
                  type: 'submit',
                  className: 'w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition'
                },
                'Submit Written Sentence for Feedback'
              )
            ),
            coachFeedback ? React.createElement(
              'div',
              { className: 'p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium' },
              React.createElement('span', { className: 'font-extrabold text-emerald-800' }, 'Coach: '),
              coachFeedback
            ) : null
          ),

          // Bottom Toolbar
          React.createElement(
            'div',
            { className: 'pt-2 border-t border-slate-100 flex justify-between items-center text-xs' },
            React.createElement('span', { className: 'text-[11px] text-slate-400 font-medium' }, 'Say "pause", "repeat", or "speak slowly" at any time'),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: handleEndSession,
                className: 'px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg transition'
              },
              '🛑 End Session'
            )
          )
        )
      )
    );
  }

  root.MasteredAiCoachSpeakingRoom = MasteredAiCoachSpeakingRoom;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MasteredAiCoachSpeakingRoom;
  }
})(this);
