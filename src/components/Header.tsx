import React from 'react';
import { LogOut, User, Bell, Sparkles, ShieldCheck } from 'lucide-react';
import { Role, Student, Admin } from '../types';

interface HeaderProps {
  user: Student | Admin | null;
  role: Role | null;
  onLogout: () => void;
  onNavigateProfile?: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ user, role, onLogout, onNavigateProfile, activeTab }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 via-blue-900 to-blue-600 flex items-center justify-center shadow-md shadow-blue-500/10">
            <span className="text-white font-extrabold text-lg tracking-wider">M</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-extrabold tracking-tight text-slate-900 text-base lg:text-lg">
                MASTERED <span className="text-blue-600 font-semibold text-xs lg:text-sm uppercase tracking-wider ml-1">Language Coach</span>
              </h1>
              {role === 'admin' && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Admin
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Speak With Confidence
            </p>
          </div>
        </div>

        {/* User profile & Actions */}
        {user && (
          <div className="flex items-center space-x-3 sm:space-x-5">
            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100/80 text-xs font-medium text-slate-600 border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{role === 'student' ? (user as Student).course : (user as Admin).role}</span>
            </div>

            <button 
              onClick={onNavigateProfile}
              className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 transition"
              title="Profile Settings"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 ring-2 ring-blue-600/20 flex items-center justify-center font-bold text-slate-700 text-xs">
                {role === 'student' && (user as Student).profileImage ? (
                  <img src={(user as Student).profileImage} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {role === 'student' ? (user as Student).admissionNumber : user.email}
                </p>
              </div>
            </button>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition flex items-center space-x-1 text-xs font-medium"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
