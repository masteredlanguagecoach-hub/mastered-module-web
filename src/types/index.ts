export type Role = 'student' | 'admin';

export interface Admin {
  adminId: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  createdDate: string;
}

export interface Student {
  studentId: string;
  admissionNumber: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  profileImage: string;
  approved: boolean | 'TRUE' | 'FALSE';
  status: 'Active' | 'Suspended' | 'Inactive';
  createdDate: string;
}

export interface StudentRequest {
  requestId: string;
  name: string;
  phone: string;
  email: string;
  admissionNumber: string;
  course: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdDate: string;
  approvedBy?: string;
}

export interface Module {
  moduleId: string;
  moduleNumber: number;
  title: string;
  description: string;
  thumbnail: string;
  video1: string;
  video2: string;
  audio: string;
  pdf: string;
  quizId: string;
  published: boolean;
  order: number;
}

export interface Quiz {
  quizId: string;
  moduleId: string;
  title: string;
  passPercentage: number;
  timeLimit?: number; // in minutes
}

export interface Question {
  questionId: string;
  quizId: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface QuizResult {
  resultId: string;
  studentId: string;
  quizId: string;
  score: number;
  passed: boolean;
  completedDate: string;
}

export interface StudentProgress {
  studentId: string;
  moduleId: string;
  video1Completed: boolean;
  video2Completed: boolean;
  audioCompleted: boolean;
  pdfViewed: boolean;
  quizCompleted: boolean;
  completionPercentage: number;
  lastAccessed: string;
}

export interface Announcement {
  announcementId: string;
  title: string;
  description: string;
  visibility: string; // 'All Students' or specific course name
  published: boolean;
  createdDate: string;
}

export interface SystemSettings {
  brandName: string;
  logo: string;
  theme: string;
  supportEmail: string;
  appsScriptUrl?: string;
  spreadsheetId?: string;
}

export interface SystemLog {
  id: string;
  user: string;
  action: string;
  date: string;
  ip: string;
  browser: string;
}
