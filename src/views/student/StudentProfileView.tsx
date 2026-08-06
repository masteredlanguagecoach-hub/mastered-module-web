import React from 'react';
import { Student } from '../../types';
import { User, Mail, Phone, BookOpen, CreditCard, Calendar, CheckCircle2 } from 'lucide-react';

interface StudentProfileViewProps {
  student: Student;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({ student }) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-blue-500/20 shrink-0 bg-slate-200">
            <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h2 className="text-2xl font-extrabold text-slate-900">{student.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                {student.status}
              </span>
            </div>
            <p className="text-xs text-blue-600 font-semibold mt-0.5">{student.course}</p>
            <p className="text-xs text-slate-400 font-mono mt-1">Admission: {student.admissionNumber}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Personal & Enrollment Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Email Address</p>
              <p className="text-xs font-bold text-slate-800">{student.email}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
            <Phone className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Phone Contact</p>
              <p className="text-xs font-bold text-slate-800">{student.phone}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Admission Code</p>
              <p className="text-xs font-mono font-bold text-slate-800">{student.admissionNumber}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">Enrollment Date</p>
              <p className="text-xs font-bold text-slate-800">{student.createdDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
