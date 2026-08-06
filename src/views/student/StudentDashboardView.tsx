import React from 'react';
import {
  Student,
  Module,
  StudentProgress,
  Announcement,
  QuizResult
} from '../../types';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  Megaphone,
  Sparkles,
  Play,
  Quote,
  TrendingUp,
  FileCheck
} from 'lucide-react';

interface StudentDashboardViewProps {
  student: Student;
  modules: Module[];
  progress: StudentProgress[];
  announcements: Announcement[];
  onSelectModule: (moduleId: string) => void;
  onOpenCertificate: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  student,
  modules,
  progress,
  announcements,
  onSelectModule,
  onOpenCertificate,
}) => {
  // Calculate overall stats
  const totalModules = modules.length;
  const completedModulesCount = progress.filter(p => p.completionPercentage >= 100).length;
  const overallPercentage = totalModules > 0 ? Math.round((completedModulesCount / totalModules) * 100) : 0;

  // Next module to continue
  const nextModule = modules.find(m => {
    const p = progress.find(pr => pr.moduleId === m.moduleId);
    return !p || p.completionPercentage < 100;
  }) || modules[0];

  const quotes = [
    "“The speed of your speech determines your confidence; control your tempo to command the room.”",
    "“Fluency is not about perfection—it is about clarity, resonance, and emotional connection.”",
    "“Great speakers are not born; they are built through consistent 10-minute daily drills.”"
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-blue-500/30 shrink-0 bg-slate-800">
              <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {student.admissionNumber}
                </span>
                <span className="text-xs text-slate-400">Student Portal</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-extrabold mt-1">Welcome back, {student.name}!</h2>
              <p className="text-xs lg:text-sm text-slate-300 mt-0.5">{student.course}</p>
            </div>
          </div>

          {/* Quick Certificate or Status Badge */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              {overallPercentage}%
            </div>
            <div>
              <p className="text-xs font-bold text-white">Overall Mastery</p>
              <p className="text-[11px] text-slate-300">{completedModulesCount} of {totalModules} Modules Complete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Modules</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{totalModules}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Completed</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{completedModulesCount}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Study Time</p>
            <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">4.5 Hours</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Certificates</p>
            <button
              onClick={onOpenCertificate}
              className="text-xs font-bold text-blue-600 hover:underline mt-0.5 block"
            >
              View Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Continue Learning & Modules Preview) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Continue Learning Spotlight */}
          {nextModule && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  <Sparkles className="w-3.5 h-3.5 mr-1" /> Continue Learning
                </span>
                <span className="text-xs font-mono text-slate-400">Module {nextModule.moduleNumber}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0 relative group">
                  <img src={nextModule.thumbnail} alt={nextModule.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{nextModule.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{nextModule.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      onClick={() => onSelectModule(nextModule.moduleId)}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center space-x-2 transition"
                    >
                      <span>Resume Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Motivational Quote Card */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl relative overflow-hidden shadow-lg">
            <Quote className="w-12 h-12 text-slate-700/40 absolute -right-2 -bottom-2" />
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Coach's Daily Insight</p>
            <p className="text-sm md:text-base font-serif italic text-slate-200 leading-relaxed">
              {quote}
            </p>
            <p className="text-xs text-slate-400 mt-3 font-medium">— Head Coach Sarah Jenkins</p>
          </div>
        </div>

        {/* Right Column (Announcements & Quick Actions) */}
        <div className="space-y-6">
          {/* Announcements Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm mb-4">
              <Megaphone className="w-4 h-4 text-blue-600" />
              <span>Broadcast Announcements</span>
            </div>

            <div className="space-y-3">
              {announcements.map(ann => (
                <div key={ann.announcementId} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-blue-600 uppercase">{ann.createdDate}</span>
                  <h4 className="font-bold text-xs text-slate-900 mt-0.5">{ann.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal line-clamp-2">{ann.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-2">Quick Actions</h4>
            <button
              onClick={onOpenCertificate}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold text-xs transition border border-slate-200/60"
            >
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-blue-600" />
                <span>Download Course Certificate</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
