import React from 'react';
import { Module } from '../../types';
import { Download, FileText, ExternalLink } from 'lucide-react';

interface StudentDownloadsViewProps {
  modules: Module[];
}

export const StudentDownloadsView: React.FC<StudentDownloadsViewProps> = ({ modules }) => {
  const pdfModules = modules.filter(m => m.pdf);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <Download className="w-3.5 h-3.5 mr-1.5" /> Resource Library
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">PDF Workbooks & Reference Materials</h2>
        <p className="text-xs text-slate-500 mt-1">
          Download high-resolution cheatsheets, executive speech templates, and phonetics drill charts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pdfModules.map(mod => (
          <div key={mod.moduleId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Module {mod.moduleNumber}</span>
                <h4 className="font-bold text-sm text-slate-900 leading-tight">{mod.title} Notes</h4>
              </div>
            </div>

            <a
              href={mod.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
