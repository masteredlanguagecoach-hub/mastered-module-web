/**
 * Google Drive Helper Utility
 * Converts standard Google Drive links into embedded preview & streamable links.
 * Example input: https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing
 * Output embed: https://drive.google.com/file/d/1A2B3C4D5E6F/preview
 */

export function extractDriveId(url: string): string | null {
  if (!url) return null;

  // Match /file/d/ID/ or id=ID pattern
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return fileIdMatch[1];
  }

  const idQueryMatch = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (idQueryMatch && idQueryMatch[1]) {
    return idQueryMatch[1];
  }

  return null;
}

export function getDriveEmbedUrl(url: string): string {
  const fileId = extractDriveId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  // Fallback if not a Google Drive URL or already an embed link
  return url;
}

export function getDriveThumbnailUrl(url: string): string {
  const fileId = extractDriveId(url);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
  }
  return url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80';
}
