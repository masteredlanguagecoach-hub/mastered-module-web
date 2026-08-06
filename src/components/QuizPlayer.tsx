import React, { useState } from 'react';
import { Quiz, Question } from '../types';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuizPlayerProps {
  quiz: Quiz;
  questions: Question[];
  onComplete: (score: number, passed: boolean) => void;
  onClose: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({
  quiz,
  questions,
  onComplete,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [hasPassed, setHasPassed] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.questionId]: option }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.questionId] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= quiz.passPercentage;

    setFinalScore(score);
    setHasPassed(passed);
    setIsSubmitted(true);
    onComplete(score, passed);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center">
        <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-900">No Questions Available</h3>
        <p className="text-sm text-slate-500 mt-1">This quiz has no registered questions in the sheet bank yet.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
          Close Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-w-3xl mx-auto my-4 transition-all">
      {/* Quiz Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Mastery Test
          </span>
          <span className="text-xs text-slate-300">
            Pass Mark: <strong className="text-white">{quiz.passPercentage}%</strong>
          </span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">{quiz.title}</h2>
      </div>

      {!isSubmitted ? (
        <div className="p-6 md:p-8">
          {/* Question Progress Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h3 className="text-lg font-bold text-slate-900 mb-6 leading-snug">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {(['A', 'B', 'C', 'D'] as const).map(optionKey => {
              const optionText = currentQ[`option${optionKey}` as keyof Question];
              const isSelected = selectedAnswers[currentQ.questionId] === optionKey;

              return (
                <button
                  key={optionKey}
                  onClick={() => handleSelectOption(optionKey)}
                  className={`w-full text-left p-4 rounded-2xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/30 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {optionKey}
                    </span>
                    <span className="text-sm font-medium">{optionText}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40 text-xs font-semibold flex items-center space-x-1 hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                disabled={!selectedAnswers[currentQ.questionId]}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={calculateResults}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="p-6 md:p-8 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 ${
            hasPassed ? 'bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50' : 'bg-amber-100 text-amber-600 ring-8 ring-amber-50'
          }`}>
            {hasPassed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900">
            {hasPassed ? 'Congratulations! Quiz Passed' : 'Quiz Not Passed Yet'}
          </h3>
          <p className="text-slate-500 text-sm mt-1 mb-6">
            You scored <span className="font-extrabold text-slate-900 text-lg">{finalScore}%</span> (Passing score is {quiz.passPercentage}%)
          </p>

          {/* Question Breakdown with Explanations */}
          <div className="text-left space-y-4 max-h-96 overflow-y-auto pr-2 mb-8 border-t border-slate-100 pt-6">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Review & Explanations</h4>
            {questions.map((q, idx) => {
              const studentAns = selectedAnswers[q.questionId];
              const isCorrect = studentAns === q.correctAnswer;

              return (
                <div key={q.questionId} className={`p-4 rounded-2xl border ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200'}`}>
                  <div className="flex items-start space-x-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Your answer: <span className="font-semibold">{studentAns}</span> | Correct: <span className="font-bold text-emerald-700">{q.correctAnswer}</span>
                      </p>
                      {q.explanation && (
                        <p className="text-xs text-slate-600 mt-2 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 font-medium">
                          💡 <strong>Explanation:</strong> {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center space-x-3">
            {!hasPassed && (
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold"
            >
              Continue Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
