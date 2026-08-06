import React, { useState } from 'react';
import { Announcement } from '../../types';
import { saveAnnouncement } from '../../lib/api';
import { Megaphone, Plus, Sparkles, Send } from 'lucide-react';

interface AnnouncementsManagementViewProps {
  announcements: Announcement[];
  onRefresh: () => void;
}

export const AnnouncementsManagementView: React.FC<AnnouncementsManagementViewProps> = ({ announcements, onRefresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('All Students');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const ann: Announcement = {
      announcementId: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title,
      description,
      visibility,
      published: true,
      createdDate: new Date().toISOString().split('T')[0]
    };

    await saveAnnouncement(ann);
    setTitle('');
    setDescription('');
    onRefresh();
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <Megaphone className="w-3.5 h-3.5 mr-1.5" /> Broadcast Center
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Manage Broadcast Announcements</h2>
        <p className="text-xs text-slate-500 mt-1">Publish news updates, Q&A masterclass invites, and course announcements.</p>
      </div>

      {/* Creation Form */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Create Announcement</h3>

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Live Q&A Masterclass this Friday"
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description / Content</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {announcements.map(ann => (
          <div key={ann.announcementId} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>{ann.visibility}</span>
              <span>{ann.createdDate}</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mt-1">{ann.title}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ann.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
