import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Download,
  Megaphone,
  User,
  Settings,
  Users,
  UserCheck,
  FileSpreadsheet,
  BarChart3,
  LogOut,
  Shield,
  Layers
} from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, onSelectTab, onLogout }) => {
  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Modules', icon: BookOpen },
    { id: 'quiz', label: 'Quizzes', icon: HelpCircle },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminNav = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-students', label: 'Students', icon: Users },
    { id: 'admin-requests', label: 'Requests', icon: UserCheck },
    { id: 'admin-modules', label: 'Modules', icon: Layers },
    { id: 'admin-quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'admin-announcements', label: 'Announcements', icon: Megaphone },
    { id: 'admin-reports', label: 'Reports', icon: BarChart3 },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

  const items = role === 'student' ? studentNav : adminNav;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-61px)] flex flex-col justify-between p-4 hidden lg:flex border-r border-slate-800 shadow-xl">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            {role === 'student' ? 'Student Portal' : 'Admin Operations'}
          </p>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800">
        <div className="px-3 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Database Status</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            Google Sheets Connected
          </p>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-950/40 hover:text-red-400 font-medium text-sm transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
