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
          <img 
            src="assets/logo.png" 
            alt="MASTERED Language Coach" 
            className="h-10 sm:h-12 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src = "https://raw.githubusercontent.com/masteredlanguagecoach-hub/mastered-module-web/main/assets/logo.png";
            }}
          />
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
