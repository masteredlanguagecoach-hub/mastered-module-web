import React from 'react';
import { Quiz, Question, StudentProgress, Module } from '../../types';
import { HelpCircle, CheckCircle2, Clock, Award, Play } from 'lucide-react';

interface StudentQuizzesViewProps {
  quizzes: Quiz[];
  modules: Module[];
  progress: StudentProgress[];
  onSelectModule: (moduleId: string) => void;
}

export const StudentQuizzesView: React.FC<StudentQuizzesViewProps> = ({
  quizzes,
  modules,
  progress,
  onSelectModule,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Assessment Portal
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Module Mastery Quizzes</h2>
        <p className="text-xs text-slate-500 mt-1">
          Validate your command over executive vocabulary, diplomatic phrasing, and accent control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => {
          const mod = modules.find(m => m.moduleId === quiz.moduleId);
          const p = progress.find(pr => pr.moduleId === quiz.moduleId);
          const isPassed = p?.quizCompleted || false;

          return (
            <div key={quiz.quizId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-blue-600 uppercase font-mono">
                    Module {mod?.moduleNumber || 1}
                  </span>
                  {isPassed ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Passed
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                      Pending
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900">{quiz.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Target Score: {quiz.passPercentage}% to unlock certificate credit.</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{quiz.timeLimit || 10} Mins</span>
                </div>

                <button
                  onClick={() => mod && onSelectModule(mod.moduleId)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPassed ? 'Retake Quiz' : 'Start Assessment'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
