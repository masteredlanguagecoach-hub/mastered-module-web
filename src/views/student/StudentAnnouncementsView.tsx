import React from 'react';
import { Announcement } from '../../types';
import { Megaphone, Calendar, Sparkles } from 'lucide-react';

interface StudentAnnouncementsViewProps {
  announcements: Announcement[];
}

export const StudentAnnouncementsView: React.FC<StudentAnnouncementsViewProps> = ({ announcements }) => {
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <Megaphone className="w-3.5 h-3.5 mr-1.5" /> Broadcast Center
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Student Announcements</h2>
        <p className="text-xs text-slate-500 mt-1">
          Stay updated on live coach masterclasses, curriculum updates, and weekly speaking challenges.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map(ann => (
          <div key={ann.announcementId} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                <Sparkles className="w-3 h-3 mr-1" /> {ann.visibility}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {ann.createdDate}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{ann.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{ann.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
