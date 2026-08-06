import React, { useState } from 'react';
import { StudentRequest } from '../../types';
import { approveStudentRequest, rejectStudentRequest } from '../../lib/api';
import { UserCheck, CheckCircle2, XCircle, Phone, Mail, CreditCard, BookOpen } from 'lucide-react';

interface RequestManagementViewProps {
  requests: StudentRequest[];
  onRefresh: () => void;
}

export const RequestManagementView: React.FC<RequestManagementViewProps> = ({ requests, onRefresh }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setLoadingId(id);
    await approveStudentRequest(id);
    setLoadingId(null);
    onRefresh();
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    await rejectStudentRequest(id);
    setLoadingId(null);
    onRefresh();
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 mb-2">
          <UserCheck className="w-3.5 h-3.5 mr-1.5" /> Approval Queue
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Student Access Applications</h2>
        <p className="text-xs text-slate-500 mt-1">Review pending student enrollment requests and grant course portal access.</p>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">All Applications Processed</h3>
          <p className="text-xs text-slate-500 mt-1">There are currently no pending requests awaiting review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingRequests.map(req => (
            <div key={req.requestId} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 uppercase">{req.admissionNumber}</span>
                  <span className="text-[10px] font-mono text-slate-400">{req.createdDate}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{req.name}</h3>

                <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                  <p className="flex items-center"><Mail className="w-3.5 h-3.5 text-slate-400 mr-2" /> {req.email}</p>
                  <p className="flex items-center"><Phone className="w-3.5 h-3.5 text-slate-400 mr-2" /> {req.phone}</p>
                  <p className="flex items-center font-semibold text-blue-900"><BookOpen className="w-3.5 h-3.5 text-slate-400 mr-2" /> {req.course}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleApprove(req.requestId)}
                  disabled={loadingId === req.requestId}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Student</span>
                </button>

                <button
                  onClick={() => handleReject(req.requestId)}
                  disabled={loadingId === req.requestId}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs flex items-center justify-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
