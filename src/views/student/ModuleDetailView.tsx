import React, { useState, useEffect } from 'react';
import { Module, Quiz, Question, StudentProgress, Student } from '../../types';
import { fetchQuiz, updateProgress } from '../../lib/api';
import { DriveVideoPlayer } from '../../components/DriveVideoPlayer';
import { DriveAudioPlayer } from '../../components/DriveAudioPlayer';
import { DrivePdfViewer } from '../../components/DrivePdfViewer';
import { QuizPlayer } from '../../components/QuizPlayer';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Video,
  Volume2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';

interface ModuleDetailViewProps {
  student: Student;
  module: Module;
  allModules: Module[];
  progress: StudentProgress | null;
  onBack: () => void;
  onSelectModule: (id: string) => void;
  onProgressUpdated: () => void;
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  student,
  module,
  allModules,
  progress: initialProgress,
  onBack,
  onSelectModule,
  onProgressUpdated,
}) => {
  const [progress, setProgress] = useState<StudentProgress | null>(initialProgress);
  const [quizData, setQuizData] = useState<{ quiz: Quiz | null; questions: Question[] }>({ quiz: null, questions: [] });
  const [activeTab, setActiveTab] = useState<'video1' | 'video2' | 'audio' | 'pdf' | 'quiz'>('video1');
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    if (module.quizId) {
      fetchQuiz(module.quizId).then(setQuizData);
    }
  }, [module.quizId]);

  const handleUpdate = async (field: Partial<StudentProgress>) => {
    const updated = await updateProgress(student.studentId, module.moduleId, field);
    setProgress(updated);
    onProgressUpdated();
  };

  const currentIndex = allModules.findIndex(m => m.moduleId === module.moduleId);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Modules</span>
        </button>

        <div className="flex items-center space-x-2">
          {prevModule && (
            <button
              onClick={() => onSelectModule(prevModule.moduleId)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-xs font-medium flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
          )}
          {nextModule && (
            <button
              onClick={() => onSelectModule(nextModule.moduleId)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-xs font-medium flex items-center space-x-1"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Module Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Module {module.moduleNumber}
            </span>
            <h1 className="text-2xl lg:text-3xl font-extrabold mt-2">{module.title}</h1>
            <p className="text-xs lg:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              {module.description}
            </p>
          </div>

          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-300">Completion</p>
              <p className="text-2xl font-extrabold text-white">{progress ? progress.completionPercentage : 0}%</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center font-bold text-xs bg-slate-900">
              {progress && progress.completionPercentage >= 100 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                `${progress ? progress.completionPercentage : 0}%`
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Section Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 overflow-x-auto pb-2">
        {module.video1 && (
          <button
            onClick={() => setActiveTab('video1')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
              activeTab === 'video1'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Lesson 1</span>
            {progress?.video1Completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        )}

        {module.video2 && (
          <button
            onClick={() => setActiveTab('video2')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
              activeTab === 'video2'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Lesson 2</span>
            {progress?.video2Completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        )}

        {module.audio && (
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
              activeTab === 'audio'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Accent Drill</span>
            {progress?.audioCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        )}

        {module.pdf && (
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
              activeTab === 'pdf'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>PDF Notes</span>
            {progress?.pdfViewed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
          </button>
        )}

        {quizData.quiz && (
          <button
            onClick={() => setShowQuizModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md flex items-center space-x-2 ml-auto"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Take Module Quiz</span>
            {progress?.quizCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
          </button>
        )}
      </div>

      {/* Active Resource Viewer */}
      <div className="mt-4">
        {activeTab === 'video1' && module.video1 && (
          <DriveVideoPlayer
            title={`${module.title} - Video Lesson 1`}
            driveUrl={module.video1}
            isCompleted={progress?.video1Completed}
            onMarkComplete={() => handleUpdate({ video1Completed: true })}
          />
        )}

        {activeTab === 'video2' && module.video2 && (
          <DriveVideoPlayer
            title={`${module.title} - Video Lesson 2`}
            driveUrl={module.video2}
            isCompleted={progress?.video2Completed}
            onMarkComplete={() => handleUpdate({ video2Completed: true })}
          />
        )}

        {activeTab === 'audio' && module.audio && (
          <DriveAudioPlayer
            title={`${module.title} - Pronunciation & Cadence Drill`}
            driveUrl={module.audio}
            isCompleted={progress?.audioCompleted}
            onMarkComplete={() => handleUpdate({ audioCompleted: true })}
          />
        )}

        {activeTab === 'pdf' && module.pdf && (
          <DrivePdfViewer
            title={`${module.title} - Executive Study Guide`}
            driveUrl={module.pdf}
            isCompleted={progress?.pdfViewed}
            onMarkComplete={() => handleUpdate({ pdfViewed: true })}
          />
        )}
      </div>

      {/* Quiz Modal */}
      {showQuizModal && quizData.quiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl">
            <QuizPlayer
              quiz={quizData.quiz}
              questions={quizData.questions}
              onComplete={(score, passed) => {
                if (passed) {
                  handleUpdate({ quizCompleted: true });
                }
              }}
              onClose={() => setShowQuizModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
