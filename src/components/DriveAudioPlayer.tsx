import React from 'react';
import { Volume2, CheckCircle, ExternalLink, Music } from 'lucide-react';
import { getDriveEmbedUrl } from '../lib/drive';

interface DriveAudioPlayerProps {
  title: string;
  driveUrl: string;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export const DriveAudioPlayer: React.FC<DriveAudioPlayerProps> = ({
  title,
  driveUrl,
  isCompleted = false,
  onMarkComplete,
}) => {
  const embedUrl = getDriveEmbedUrl(driveUrl);

  if (!driveUrl) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 shadow-lg border border-slate-700/60 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-100">{title}</h4>
            <p className="text-xs text-slate-400">Audio Accent & Pronunciation Drill</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isCompleted ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Completed
            </span>
          ) : (
            onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition text-xs flex items-center space-x-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark Audio Listened</span>
              </button>
            )
          )}
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition"
            title="Open in Drive"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="w-full bg-slate-950/80 rounded-xl overflow-hidden p-2 border border-slate-800">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-16 border-0"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};
