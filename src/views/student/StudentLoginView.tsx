import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail, CreditCard, AlertCircle } from 'lucide-react';
import { loginStudent } from '../../lib/api';
import { Student } from '../../types';

interface StudentLoginProps {
  onSuccess: (student: Student) => void;
  onNavigateRequest: () => void;
  onNavigateAdmin: () => void;
}

export const StudentLoginView: React.FC<StudentLoginProps> = ({
  onSuccess,
  onNavigateRequest,
  onNavigateAdmin,
}) => {
  const [email, setEmail] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !admissionNumber) {
      setError('Please enter both your email address and admission number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await loginStudent(email, admissionNumber);
      if (res.success && res.student) {
        onSuccess(res.student);
      } else {
        setError(res.message || 'Failed to authenticate. Please check your details.');
      }
    } catch (err: any) {
      setError(err.message || 'Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('student@mastered.com');
    setAdmissionNumber('MLC-2026-001');
    setLoading(true);
    const res = await loginStudent('student@mastered.com', 'MLC-2026-001');
    if (res.success && res.student) {
      onSuccess(res.student);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20 border border-blue-500/30">
            <span className="text-white font-extrabold text-2xl tracking-wider">M</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            MASTERED <span className="text-blue-500 font-semibold text-sm uppercase block tracking-widest mt-1">Language Coach</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Speak With Confidence — Premium Learning Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Student Login</h2>
            <p className="text-xs text-slate-400">Access your purchased modules & speaking drills</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start space-x-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@mastered.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Admission Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <CreditCard className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={admissionNumber}
                  onChange={e => setAdmissionNumber(e.target.value)}
                  placeholder="MLC-2026-001"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono transition uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span className="inline-flex items-center text-xs">
                  <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-2"></span>
                  Verifying Credentials...
                </span>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Instant Demo Shortcut */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700/60 flex items-center justify-center space-x-2 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>One-Click Demo Student Access</span>
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs font-medium text-slate-400 pt-2">
            <button
              onClick={onNavigateRequest}
              className="hover:text-white transition flex items-center space-x-1"
            >
              <span>Don't have access?</span>
              <span className="text-blue-400 font-semibold underline">Request Access</span>
            </button>
            <button
              onClick={onNavigateAdmin}
              className="hover:text-white transition flex items-center space-x-1 text-slate-500"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
