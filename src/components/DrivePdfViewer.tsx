import React from 'react';
import { FileText, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { getDriveEmbedUrl } from '../lib/drive';

interface DrivePdfViewerProps {
  title: string;
  driveUrl: string;
  isCompleted?: boolean;
  onMarkComplete?: () => void;
}

export const DrivePdfViewer: React.FC<DrivePdfViewerProps> = ({
  title,
  driveUrl,
  isCompleted = false,
  onMarkComplete,
}) => {
  const embedUrl = getDriveEmbedUrl(driveUrl);

  if (!driveUrl) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
      {/* PDF Header */}
      <div className="bg-slate-50 px-5 py-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
            <p className="text-xs text-slate-500">Official Course PDF & Notes</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isCompleted ? (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 mr-1" /> PDF Read
            </span>
          ) : (
            onMarkComplete && (
              <button
                onClick={onMarkComplete}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition text-xs flex items-center space-x-1"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Mark PDF Read</span>
              </button>
            )
          )}
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition"
            title="Download / Open PDF"
          >
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Embedded PDF Viewport */}
      <div className="w-full h-[550px] bg-slate-100 relative">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </div>
  );
};
