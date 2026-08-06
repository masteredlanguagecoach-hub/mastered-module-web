import React from 'react';
import { Module, StudentProgress } from '../../types';
import { BookOpen, CheckCircle2, Lock, ArrowRight, Play, Sparkles } from 'lucide-react';

interface StudentModulesViewProps {
  modules: Module[];
  progress: StudentProgress[];
  onSelectModule: (moduleId: string) => void;
}

export const StudentModulesView: React.FC<StudentModulesViewProps> = ({
  modules,
  progress,
  onSelectModule,
}) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Executive Curriculum
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Purchased Course Modules</h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete video lessons, listen to accent audio drills, view PDF reference guides, and master quizzes.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, idx) => {
          const p = progress.find(pr => pr.moduleId === mod.moduleId);
          const percent = p ? p.completionPercentage : 0;
          const isCompleted = percent >= 100;
          const isLocked = idx > 0 && !progress.some(pr => pr.moduleId === modules[idx - 1].moduleId && pr.completionPercentage >= 100);

          return (
            <div
              key={mod.moduleId}
              className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between ${
                isCompleted ? 'border-emerald-200' : 'border-slate-200'
              }`}
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                  <img src={mod.thumbnail} alt={mod.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                        Module {mod.moduleNumber}
                      </span>
                      {isCompleted ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Completed
                        </span>
                      ) : isLocked ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/90 text-slate-300 text-xs font-semibold">
                          <Lock className="w-3.5 h-3.5 mr-1" /> Locked
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{mod.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{mod.description}</p>
                </div>
              </div>

              {/* Progress & Trigger Footer */}
              <div className="p-6 pt-0 space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Progress</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectModule(mod.moduleId)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isCompleted ? 'Review Module' : 'Start Module'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
