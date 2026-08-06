import React from 'react';
import { Student, StudentRequest, Module, SystemLog } from '../../types';
import {
  Users,
  UserCheck,
  Layers,
  HelpCircle,
  TrendingUp,
  Activity,
  UserPlus,
  PlusCircle,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface AdminDashboardViewProps {
  students: Student[];
  requests: StudentRequest[];
  modules: Module[];
  logs: SystemLog[];
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  students,
  requests,
  modules,
  logs,
  onNavigateTab,
}) => {
  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;
  const activeStudentsCount = students.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              System Dashboard
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold mt-2">Executive Admin Command Center</h1>
            <p className="text-xs text-slate-300 mt-1">Live monitoring for students, course modules, requests, and Google Sheets state.</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigateTab('admin-requests')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center space-x-2 transition"
            >
              <UserCheck className="w-4 h-4" />
              <span>Review Requests ({pendingRequestsCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Total Students</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{students.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Pending Requests</p>
          <h3 className="text-2xl font-extrabold text-amber-600 mt-0.5">{pendingRequestsCount}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Active Modules</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">{modules.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Active Students</p>
          <h3 className="text-2xl font-extrabold text-emerald-600 mt-0.5">{activeStudentsCount}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Quiz Attempts</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">142</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Activity className="w-5 h-5" />
          </div>
          <p className="text-[11px] font-semibold text-slate-500 uppercase">Today's Logins</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">28</h3>
        </div>
      </div>

      {/* Main Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Quick Action Cards & Recent Activity) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">Quick Administrative Actions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => onNavigateTab('admin-students')}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left transition group"
              >
                <Users className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h4 className="font-bold text-xs text-slate-900">Manage Students</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Approve, edit, or reset credentials</p>
              </button>

              <button
                onClick={() => onNavigateTab('admin-modules')}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left transition group"
              >
                <PlusCircle className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h4 className="font-bold text-xs text-slate-900">Add New Module</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Embed Google Drive media</p>
              </button>

              <button
                onClick={() => onNavigateTab('admin-reports')}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 text-left transition group"
              >
                <FileSpreadsheet className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition" />
                <h4 className="font-bold text-xs text-slate-900">Export CSV Reports</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Student scores & progress</p>
              </button>
            </div>
          </div>

          {/* Audit Logs Feed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Recent Audit Logs</h3>
              <span className="text-xs text-slate-400 font-mono">Live Activity Stream</span>
            </div>

            <div className="space-y-3">
              {logs.map(log => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-slate-900">{log.user}</span>
                    <p className="text-xs text-slate-600 mt-0.5">{log.action}</p>
                  </div>
                  <div className="text-right text-[10px] text-slate-400 font-mono">
                    <p>{log.date}</p>
                    <p>{log.ip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Pending Requests Queue) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Pending Requests Queue</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {pendingRequestsCount} Pending
              </span>
            </div>

            {pendingRequestsCount === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                No pending requests. All caught up!
              </div>
            ) : (
              <div className="space-y-3">
                {requests.filter(r => r.status === 'Pending').map(req => (
                  <div key={req.requestId} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{req.name}</span>
                      <span className="font-mono text-slate-500">{req.admissionNumber}</span>
                    </div>
                    <p className="text-slate-500">{req.course}</p>
                    <button
                      onClick={() => onNavigateTab('admin-requests')}
                      className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                    >
                      Review & Approve
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
