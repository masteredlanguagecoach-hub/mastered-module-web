import React from 'react';
import { Award, ShieldCheck, Download, X } from 'lucide-react';
import { Student } from '../types';

interface CertificateModalProps {
  student: Student;
  courseTitle: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ student, courseTitle, onClose }) => {
  const issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative Certificate Viewport */}
        <div className="p-8 md:p-12 text-center bg-gradient-to-b from-slate-50 to-white relative border-8 border-slate-100 m-3 rounded-2xl">
          {/* Certificate Watermark */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-blue-600 flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-500/20">
            <Award className="w-8 h-8" />
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Certificate of Completion</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">MASTERED LANGUAGE COACH</h2>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Executive Fluency & Leadership Program</p>

          <div className="my-8">
            <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 font-serif text-blue-900">
              {student.name}
            </h3>
            <p className="text-xs font-mono text-slate-500 mt-1">Admission No: {student.admissionNumber}</p>
          </div>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            For successfully mastering all modules, practical audio drills, and speech evaluations in <strong className="text-slate-900">{courseTitle || student.course}</strong>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-left text-xs">
            <div>
              <p className="font-bold text-slate-900">Sarah Jenkins</p>
              <p className="text-[11px] text-slate-500">Lead Language Coach</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center text-emerald-600 font-bold">
                <ShieldCheck className="w-4 h-4 mr-1" /> VERIFIED
              </div>
              <p className="text-[10px] text-slate-400">{issueDate}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end space-x-3">
          <button
            onClick={() => window.print()}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
