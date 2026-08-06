import React, { useState } from 'react';
import { Student } from '../../types';
import { Search, UserCheck, UserX, Trash2, Edit, Download, KeyRound, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

interface StudentManagementViewProps {
  students: Student[];
  onRefresh: () => void;
}

export const StudentManagementView: React.FC<StudentManagementViewProps> = ({ students, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["StudentID", "AdmissionNumber", "Name", "Email", "Phone", "Course", "Status", "Approved", "CreatedDate"];
    const rows = students.map(s => [
      s.studentId,
      s.admissionNumber,
      `"${s.name}"`,
      s.email,
      s.phone,
      `"${s.course}"`,
      s.status,
      s.approved ? "TRUE" : "FALSE",
      s.createdDate
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mastered_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
            Directory & Access Control
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Directory Management</h2>
          <p className="text-xs text-slate-500 mt-1">Search, edit, suspend, assign modules, or export CSV records.</p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-md shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Student CSV</span>
        </button>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search students by name, email, admission number, or course..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-[10px] text-slate-400">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Admission No</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Enroll Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map(student => (
                <tr key={student.studentId} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-200 shrink-0">
                        <img src={student.profileImage} alt={student.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{student.name}</p>
                        <p className="text-[11px] text-slate-400">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-700">{student.admissionNumber}</td>
                  <td className="px-6 py-4">{student.course}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      student.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{student.createdDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Student Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Manage Student Access</h3>
            <p className="text-xs text-slate-500">Student: <strong>{selectedStudent.name}</strong> ({selectedStudent.admissionNumber})</p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  alert(`Status updated to Active for ${selectedStudent.name}`);
                  setSelectedStudent(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Set Status to Active</span>
              </button>

              <button
                onClick={() => {
                  alert(`Access suspended for ${selectedStudent.name}`);
                  setSelectedStudent(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Suspend Access</span>
              </button>

              <button
                onClick={() => {
                  alert(`Password reset link generated for ${selectedStudent.email}`);
                  setSelectedStudent(null);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Reset Credentials</span>
              </button>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-900 mt-2"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
