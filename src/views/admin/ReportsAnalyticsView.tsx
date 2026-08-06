import React from 'react';
import { Student, Module, StudentProgress } from '../../types';
import { BarChart3, Download, Award, CheckCircle2, TrendingUp } from 'lucide-react';

interface ReportsAnalyticsViewProps {
  students: Student[];
  modules: Module[];
  progress: StudentProgress[];
}

export const ReportsAnalyticsView: React.FC<ReportsAnalyticsViewProps> = ({ students, modules, progress }) => {
  const exportProgressCSV = () => {
    const headers = ["StudentID", "StudentName", "ModuleID", "Video1", "Video2", "Audio", "PDF", "Quiz", "Completion%"];
    const rows: string[][] = [];

    students.forEach(s => {
      modules.forEach(m => {
        const p = progress.find(pr => pr.studentId === s.studentId && pr.moduleId === m.moduleId);
        rows.push([
          s.studentId,
          `"${s.name}"`,
          m.moduleId,
          p?.video1Completed ? "TRUE" : "FALSE",
          p?.video2Completed ? "TRUE" : "FALSE",
          p?.audioCompleted ? "TRUE" : "FALSE",
          p?.pdfViewed ? "TRUE" : "FALSE",
          p?.quizCompleted ? "TRUE" : "FALSE",
          `${p ? p.completionPercentage : 0}%`
        ]);
      });
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mastered_Progress_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
            <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Analytics & Reports
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Progress & Quiz Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">Export detailed metrics on student module completions and mastery scores.</p>
        </div>

        <button
          onClick={exportProgressCSV}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/30 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Progress CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Module Completion Leaderboard</h3>

        <div className="space-y-3">
          {students.map(s => {
            const studentProgs = progress.filter(p => p.studentId === s.studentId);
            const doneCount = studentProgs.filter(p => p.completionPercentage >= 100).length;
            const overallPct = modules.length > 0 ? Math.round((doneCount / modules.length) * 100) : 0;

            return (
              <div key={s.studentId} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{s.name}</h4>
                  <p className="text-[11px] text-slate-500">{s.course} • {s.admissionNumber}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-blue-600">{overallPct}% Complete</p>
                    <p className="text-[10px] text-slate-400">{doneCount} of {modules.length} Modules</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-blue-600 flex items-center justify-center font-bold text-xs bg-white text-blue-900">
                    {overallPct}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
