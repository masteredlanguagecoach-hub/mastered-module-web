import React from 'react';
import { Settings, Bell, Shield, Moon } from 'lucide-react';

export const StudentSettingsView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <Settings className="w-3.5 h-3.5 mr-1.5" /> Portal Preferences
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Student Account Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Manage notification preferences, media playback quality, and portal theme.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Broadcast Email Alerts</h4>
            <p className="text-xs text-slate-500">Receive notifications when new modules or announcements are posted.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
        </div>

        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Auto-Resume Video Lessons</h4>
            <p className="text-xs text-slate-500">Automatically remember timestamps on Google Drive video players.</p>
          </div>
          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
        </div>
      </div>
    </div>
  );
};
