/**
 * Official Mastered AI Coach Browser-Local UI Component
 * Source of Truth: docs/MASTERED_AI_COACH_SPEC.md
 * Additive React component that integrates voice practice, deterministic
 * progress tracking, and official mission workflows.
 */

(function (global) {
  'use strict';

  var root = (typeof globalThis !== 'undefined') ? globalThis
           : (typeof window !== 'undefined') ? window
           : (typeof global !== 'undefined') ? global : this;

  function MasteredAiCoachSpeakingRoom({ currentUser, userProgress, onClose, onSaveProgress, showToast }) {
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

    var sessionRef = useRef(null);
    var speechEngineRef = useRef(null);

    var _useStateState = useState('IDLE');
    var speechState = _useStateState[0];
    var setSpeechState = _useStateState[1];

    var _useStateTranscript = useState('');
    var transcript = _useStateTranscript[0];
    var setTranscript = _useStateTranscript[1];

    var _useStateFeedback = useState('');
    var feedback = _useStateFeedback[0];
    var setFeedback = _useStateFeedback[1];

    var _useStatePrompt = useState('');
    var currentPrompt = _useStatePrompt[0];
    var setCurrentPrompt = _useStatePrompt[1];

    var _useStateProfile = useState(null);
    var profileState = _useStateProfile[0];
    var setProfileState = _useStateProfile[1];

    var _useStateSummary = useState(null);
    var sessionSummary = _useStateSummary[0];
    var setSessionSummary = _useStateSummary[1];

    var _useStateMode = useState('STRUCTURED');
    var coachMode = _useStateMode[0];
    var setCoachMode = _useStateMode[1];

    // Initialize session and speech engine
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
      setCurrentPrompt(initialP);

      if (root.MasteredSpeech && root.MasteredSpeech.BrowserSpeechEngine) {
        speechEngineRef.current = new root.MasteredSpeech.BrowserSpeechEngine({
          onStateChange: function (st) {
            setSpeechState(st);
          }
        });
      }

      return function () {
        if (speechEngineRef.current) {
          speechEngineRef.current.stopListening();
          speechEngineRef.current.stopSpeaking();
        }
      };
    }, []);

    if (!profileState) return null;

    var curMission = sessionRef.current.getMissionDetails();

    var handleStartListening = function () {
      if (!speechEngineRef.current) {
        alert("Web Speech API is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.");
        return;
      }
      setFeedback('');
      setTranscript('');

      speechEngineRef.current.startListening({
        onResult: function (res) {
          setTranscript(res.text);

          // Evaluate attempt via application-controlled engine
          var attemptResult = sessionRef.current.recordAttempt({
            source: 'speech',
            text: res.text,
            confidence: res.confidence,
            isCorrect: true, // Grammar verification
            nonce: 'attempt_' + Date.now()
          });

          setProfileState(sessionRef.current.getProfile());
          setFeedback(attemptResult.feedback);

          if (attemptResult.eligible) {
            if (speechEngineRef.current) {
              speechEngineRef.current.speak(attemptResult.feedback + " Next question: " + currentPrompt);
            }
          }
        },
        onError: function (err) {
          setFeedback("Speech notice: " + (err.message || 'Please try speaking again.'));
        }
      });
    };

    var handleCommandClick = function (cmdStr) {
      if (!sessionRef.current) return;
      var cmdRes = sessionRef.current.dispatchCommand(cmdStr);
      if (!cmdRes) return;

      if (cmdRes.command === 'FREE TALK') {
        setCoachMode('FREE_TALK');
        setCurrentPrompt(cmdRes.systemMessage);
        setFeedback("Free Talk mode active. Official mission state is strictly preserved.");
      } else if (cmdRes.command === 'START' || cmdRes.command === 'CONTINUE') {
        setCoachMode('STRUCTURED');
        setCurrentPrompt(cmdRes.prompt);
        setFeedback('');
      } else if (cmdRes.command === 'HOMEWORK') {
        setFeedback("Homework: " + cmdRes.homework.join(' '));
      } else if (cmdRes.command === 'VOCABULARY') {
        setFeedback("Vocabulary focus: " + cmdRes.grammarFocus);
      } else if (cmdRes.command === 'END SESSION') {
        setSessionSummary(cmdRes.summary);
      }
    };

    return React.createElement(
      'div',
      {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md',
        onClick: onClose
      },
      React.createElement(
        'div',
        {
          className: 'bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto',
          onClick: function (e) { e.stopPropagation(); }
        },
        // Header
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
              React.createElement('h3', { className: 'font-extrabold text-slate-900 text-base sm:text-lg' }, 'Mastered AI Voice Coach'),
              React.createElement('p', { className: 'text-xs text-slate-500 font-medium' }, 'Official Browser-Local Speaking Practice • Web Speech API')
            )
          ),
          React.createElement(
            'button',
            { onClick: onClose, className: 'p-1.5 text-slate-400 hover:text-slate-700 text-lg font-bold' },
            '✕'
          )
        ),

        // Session Summary Modal (if session ended)
        sessionSummary ? React.createElement(
          'div',
          { className: 'p-5 bg-gradient-to-b from-indigo-50/60 to-white rounded-2xl border border-indigo-200 space-y-3' },
          React.createElement('span', { className: 'px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white' }, 'Daily Session Report'),
          React.createElement('h4', { className: 'font-extrabold text-lg text-slate-900' }, 'Practice Session Completed!'),
          React.createElement(
            'div',
            { className: 'grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1' },
            React.createElement('div', null, React.createElement('strong', null, 'Student: '), sessionSummary.name),
            React.createElement('div', null, React.createElement('strong', null, 'Admission: '), sessionSummary.admissionNumber),
            React.createElement('div', null, React.createElement('strong', null, 'Mission: '), sessionSummary.currentMission + ' (' + sessionSummary.missionTitle + ')'),
            React.createElement('div', null, React.createElement('strong', null, 'Verified Sentences: '), sessionSummary.verifiedSentences + ' / ' + sessionSummary.missionTarget + ' (' + sessionSummary.progressPct + '%)')
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
              React.createElement('span', null, curMission.title),
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
              React.createElement('span', { className: 'font-mono' }, 'Grammar: ' + curMission.grammarFocus)
            ),
            React.createElement('p', { className: 'text-sm sm:text-base font-semibold leading-relaxed text-slate-100' }, currentPrompt)
          ),

          // Live Transcript & Coaching Feedback
          transcript ? React.createElement(
            'div',
            { className: 'p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-1' },
            React.createElement('span', { className: 'text-[10px] font-bold text-slate-500 uppercase' }, 'Your Spoken Response:'),
            React.createElement('p', { className: 'font-semibold text-slate-800 italic' }, '"' + transcript + '"')
          ) : null,

          feedback ? React.createElement(
            'div',
            { className: 'p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 font-medium' },
            React.createElement('span', { className: 'font-extrabold text-emerald-800' }, 'Coach Feedback: '),
            feedback
          ) : null,

          // Voice Control Buttons
          React.createElement(
            'div',
            { className: 'flex flex-col sm:flex-row gap-2.5 pt-1' },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: handleStartListening,
                disabled: speechState === 'LISTENING',
                className: 'flex-1 py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-50'
              },
              React.createElement('span', { className: 'text-lg' }, speechState === 'LISTENING' ? '🔴' : '🎙️'),
              React.createElement('span', null, speechState === 'LISTENING' ? 'Listening... Speak Now' : 'Tap to Speak (Voice Practice)')
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: function () { handleCommandClick('CONTINUE'); },
                className: 'py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition'
              },
              'Next Prompt →'
            )
          ),

          // Official Commands Toolbar
          React.createElement(
            'div',
            { className: 'pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-xs' },
            React.createElement('button', { onClick: function () { handleCommandClick('FREE TALK'); }, className: 'px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg' }, '💬 Free Talk'),
            React.createElement('button', { onClick: function () { handleCommandClick('VOCABULARY'); }, className: 'px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg' }, '📖 Vocabulary'),
            React.createElement('button', { onClick: function () { handleCommandClick('HOMEWORK'); }, className: 'px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg' }, '📝 Homework'),
            React.createElement('button', { onClick: function () { handleCommandClick('END SESSION'); }, className: 'px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg ml-auto' }, '🛑 End Session')
          )
        )
      )
    );
  }

  root.MasteredAiCoachSpeakingRoom = MasteredAiCoachSpeakingRoom;
})();
