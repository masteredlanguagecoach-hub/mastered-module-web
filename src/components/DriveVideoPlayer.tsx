import React, { useState } from 'react';
import { Play, CheckCircle, Maximize2, ExternalLink } from 'lucide-react';
import { getDriveEmbedUrl } from '../lib/drive';

interface DriveVideoPlayerProps {
  title: string;
  driveUrl: string;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export const DriveVideoPlayer: React.FC<DriveVideoPlayerProps> = ({
  title,
  driveUrl,
  isCompleted = false,
  onMarkComplete,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const embedUrl = getDriveEmbedUrl(driveUrl);

  if (!driveUrl) return null;

  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800 transition-all">
      {/* Top Control Bar */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
          <span className="text-xs font-semibold text-slate-300 ml-2 truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          {isCompleted ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Watched
            </span>
          ) : (
            onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition text-xs flex items-center space-x-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark Watched</span>
              </button>
            )
          )}
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white p-1 transition"
            title="Open in Drive tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Video Viewport Container */}
      <div className="relative aspect-video w-full bg-black">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-slate-950/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center space-x-1">
          <Play className="w-3 h-3 text-blue-400" />
          <span>Embedded Google Drive Stream</span>
        </span>
        <span>Original HD Stream</span>
      </div>
    </div>
  );
};
