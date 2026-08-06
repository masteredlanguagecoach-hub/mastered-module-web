import React, { useState } from 'react';
import { Module } from '../../types';
import { saveModule, deleteModule } from '../../lib/api';
import { Layers, Plus, Edit, Trash2, Copy, Eye, CheckCircle2, Video, Volume2, FileText, HelpCircle, ExternalLink } from 'lucide-react';

interface ModuleManagementViewProps {
  modules: Module[];
  onRefresh: () => void;
}

export const ModuleManagementView: React.FC<ModuleManagementViewProps> = ({ modules, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingModule, setEditingModule] = useState<Partial<Module>>({
    moduleNumber: modules.length + 1,
    title: '',
    description: '',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
    video1: '',
    video2: '',
    audio: '',
    pdf: '',
    quizId: '',
    published: true,
    order: modules.length + 1
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const mod: Module = {
      moduleId: editingModule.moduleId || `MOD-${Math.floor(100 + Math.random() * 900)}`,
      moduleNumber: Number(editingModule.moduleNumber) || 1,
      title: editingModule.title || 'Untitled Module',
      description: editingModule.description || '',
      thumbnail: editingModule.thumbnail || '',
      video1: editingModule.video1 || '',
      video2: editingModule.video2 || '',
      audio: editingModule.audio || '',
      pdf: editingModule.pdf || '',
      quizId: editingModule.quizId || '',
      published: editingModule.published ?? true,
      order: Number(editingModule.order) || 1
    };

    await saveModule(mod);
    setShowModal(false);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this module?")) {
      await deleteModule(id);
      onRefresh();
    }
  };

  const handleDuplicate = async (mod: Module) => {
    const dup: Module = {
      ...mod,
      moduleId: `MOD-${Math.floor(100 + Math.random() * 900)}`,
      moduleNumber: mod.moduleNumber + 1,
      title: `${mod.title} (Copy)`
    };
    await saveModule(dup);
    onRefresh();
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
            Curriculum Builder
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">Module & Media Management</h2>
          <p className="text-xs text-slate-500 mt-1">Add, update, or reorganize Google Drive video, audio, and PDF learning materials.</p>
        </div>

        <button
          onClick={() => {
            setEditingModule({
              moduleNumber: modules.length + 1,
              title: '',
              description: '',
              thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&auto=format&fit=crop&q=80',
              video1: '',
              video2: '',
              audio: '',
              pdf: '',
              quizId: '',
              published: true,
              order: modules.length + 1
            });
            setShowModal(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-blue-600/30 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Module</span>
        </button>
      </div>

      {/* Modules Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map(mod => (
          <div key={mod.moduleId} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-video w-full bg-slate-100">
                <img src={mod.thumbnail} alt={mod.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                  Module {mod.moduleNumber}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-slate-900">{mod.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{mod.description}</p>

                <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                  {mod.video1 && <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold flex items-center"><Video className="w-3 h-3 mr-1" /> Video 1</span>}
                  {mod.video2 && <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold flex items-center"><Video className="w-3 h-3 mr-1" /> Video 2</span>}
                  {mod.audio && <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 font-semibold flex items-center"><Volume2 className="w-3 h-3 mr-1" /> Audio</span>}
                  {mod.pdf && <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 font-semibold flex items-center"><FileText className="w-3 h-3 mr-1" /> PDF</span>}
                  {mod.quizId && <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-semibold flex items-center"><HelpCircle className="w-3 h-3 mr-1" /> Quiz</span>}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleDuplicate(mod)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition"
                title="Duplicate Module"
              >
                <Copy className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingModule(mod);
                    setShowModal(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center space-x-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(mod.moduleId)}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-100 transition"
                  title="Delete Module"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Edit Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-slate-900">
              {editingModule.moduleId ? 'Edit Course Module' : 'Create New Course Module'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Module Number</label>
                  <input
                    type="number"
                    required
                    value={editingModule.moduleNumber}
                    onChange={e => setEditingModule({ ...editingModule, moduleNumber: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Order Sequence</label>
                  <input
                    type="number"
                    required
                    value={editingModule.order}
                    onChange={e => setEditingModule({ ...editingModule, order: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Module Title</label>
                <input
                  type="text"
                  required
                  value={editingModule.title}
                  onChange={e => setEditingModule({ ...editingModule, title: e.target.value })}
                  placeholder="e.g. Executive Vocal Projection"
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingModule.description}
                  onChange={e => setEditingModule({ ...editingModule, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Thumbnail Cover URL</label>
                <input
                  type="url"
                  value={editingModule.thumbnail}
                  onChange={e => setEditingModule({ ...editingModule, thumbnail: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video 1 Google Drive Link</label>
                  <input
                    type="url"
                    value={editingModule.video1}
                    onChange={e => setEditingModule({ ...editingModule, video1: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Video 2 Google Drive Link</label>
                  <input
                    type="url"
                    value={editingModule.video2}
                    onChange={e => setEditingModule({ ...editingModule, video2: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Audio Drive Link</label>
                  <input
                    type="url"
                    value={editingModule.audio}
                    onChange={e => setEditingModule({ ...editingModule, audio: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">PDF Drive Link</label>
                  <input
                    type="url"
                    value={editingModule.pdf}
                    onChange={e => setEditingModule({ ...editingModule, pdf: e.target.value })}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full p-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                >
                  Save Module
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
