import {
  MOCK_ADMINS,
  MOCK_ANNOUNCEMENTS,
  MOCK_LOGS,
  MOCK_MODULES,
  MOCK_PROGRESS,
  MOCK_QUESTIONS,
  MOCK_QUIZZES,
  MOCK_REQUESTS,
  MOCK_STUDENTS,
  INITIAL_SETTINGS
} from '../data/mockData';
import {
  Admin,
  Announcement,
  Module,
  Question,
  Quiz,
  QuizResult,
  Student,
  StudentProgress,
  StudentRequest,
  SystemLog,
  SystemSettings
} from '../types';

// In-Memory state store for mock interactions
let memoryStudents = [...MOCK_STUDENTS];
let memoryRequests = [...MOCK_REQUESTS];
let memoryModules = [...MOCK_MODULES];
let memoryQuizzes = [...MOCK_QUIZZES];
let memoryQuestions = [...MOCK_QUESTIONS];
let memoryProgress = [...MOCK_PROGRESS];
let memoryAnnouncements = [...MOCK_ANNOUNCEMENTS];
let memorySettings = { ...INITIAL_SETTINGS };
let memoryLogs = [...MOCK_LOGS];

export function setAppsScriptUrl(url: string) {
  memorySettings.appsScriptUrl = url;
}

export function getAppsScriptUrl(): string {
  return memorySettings.appsScriptUrl || "https://script.google.com/macros/s/AKfycbxbqPvlxmAFOgtXn-VJ9b9fuvjOL3hsy18wSCu4xYhfVIcnLMVWGVbeD6XsLxv1ZG_2/exec";
}

/**
 * Universal GAS REST API Invoker
 */
async function callAppsScriptApi<T>(action: string, payload: any = {}): Promise<{ success: boolean; data?: T; message?: string }> {
  const url = getAppsScriptUrl();

  if (!url) {
    // Return false to fallback to mock memory
    return { success: false, message: "Apps Script URL not set. Using local mock engine." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({ action, ...payload }),
    });

    const json = await response.json();
    return json;
  } catch (err: any) {
    console.warn("GAS API Request Failed, switching to fallback:", err);
    return { success: false, message: err.message || "Network error" };
  }
}

// -------------------------------------------------------------
// AUTHENTICATION APIs
// -------------------------------------------------------------

export async function loginStudent(email: string, admissionNumber: string): Promise<{ success: boolean; student?: Student; message?: string }> {
  // Try Live GAS API
  const live = await callAppsScriptApi<{ student: Student }>('loginStudent', { email, admissionNumber });
  if (live.success && live.data?.student) {
    return { success: true, student: live.data.student };
  }

  // Mock Fallback
  const cleanEmail = email.trim().toLowerCase();
  const cleanAdm = admissionNumber.trim().toUpperCase();

  const found = memoryStudents.find(
    s => s.email.toLowerCase() === cleanEmail && s.admissionNumber.toUpperCase() === cleanAdm
  );

  if (!found) {
    return { success: false, message: "Invalid email or admission number." };
  }

  if (!found.approved || found.approved === 'FALSE') {
    return { success: false, message: "Your account request is pending admin approval." };
  }

  if (found.status === 'Suspended') {
    return { success: false, message: "Your access has been suspended. Please contact support." };
  }

  // Log action
  logActivity(found.name, "Student Logged In");

  return { success: true, student: found };
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; admin?: Admin; message?: string }> {
  const live = await callAppsScriptApi<{ admin: Admin }>('loginAdmin', { email, password });
  if (live.success && live.data?.admin) {
    return { success: true, admin: live.data.admin };
  }

  const cleanEmail = email.trim().toLowerCase();
  const admin = MOCK_ADMINS.find(a => a.email.toLowerCase() === cleanEmail);

  if (admin && (password === "admin123" || password === "password" || password === "4languagecoach")) {
    logActivity(admin.name, "Admin Logged In");
    return { success: true, admin };
  }

  if (cleanEmail === "masteredlanguagecoach@gmail.com" && password === "4languagecoach") {
    const newAdmin: Admin = {
      adminId: "ADM-002",
      name: "Mastered Language Coach",
      email: "masteredlanguagecoach@gmail.com",
      role: "Super Admin",
      status: "Active",
      createdDate: "2026-08-06"
    };
    logActivity(newAdmin.name, "Admin Logged In");
    return { success: true, admin: newAdmin };
  }

  return { success: false, message: "Invalid admin credentials." };
}

export async function submitStudentRequest(data: { name: string; phone: string; email: string; admissionNumber: string; course: string }): Promise<{ success: boolean; message: string }> {
  const live = await callAppsScriptApi('submitRequest', data);
  if (live.success) return { success: true, message: live.message || "Request submitted successfully!" };

  const newReq: StudentRequest = {
    requestId: `REQ-${Math.floor(100 + Math.random() * 900)}`,
    ...data,
    status: 'Pending',
    createdDate: new Date().toISOString().split('T')[0]
  };

  memoryRequests = [newReq, ...memoryRequests];
  logActivity(data.name, `Submitted access request for ${data.course}`);

  return { success: true, message: "Your request has been sent successfully. Please wait for admin approval." };
}

// -------------------------------------------------------------
// MODULES & LEARNING APIs
// -------------------------------------------------------------

export async function fetchModules(): Promise<Module[]> {
  const live = await callAppsScriptApi<Module[]>('getModules');
  if (live.success && Array.isArray(live.data)) {
    return live.data;
  }
  return memoryModules.sort((a, b) => a.order - b.order);
}

export async function fetchModuleById(id: string): Promise<Module | null> {
  const modules = await fetchModules();
  return modules.find(m => m.moduleId === id) || null;
}

export async function fetchStudentProgress(studentId: string): Promise<StudentProgress[]> {
  const live = await callAppsScriptApi<StudentProgress[]>('getStudentProgress', { studentId });
  if (live.success && Array.isArray(live.data)) {
    return live.data;
  }
  return memoryProgress.filter(p => p.studentId === studentId);
}

export async function updateProgress(
  studentId: string,
  moduleId: string,
  updates: Partial<StudentProgress>
): Promise<StudentProgress> {
  const live = await callAppsScriptApi<StudentProgress>('updateProgress', { studentId, moduleId, updates });
  if (live.success && live.data) {
    return live.data;
  }

  let existing = memoryProgress.find(p => p.studentId === studentId && p.moduleId === moduleId);
  if (!existing) {
    existing = {
      studentId,
      moduleId,
      video1Completed: false,
      video2Completed: false,
      audioCompleted: false,
      pdfViewed: false,
      quizCompleted: false,
      completionPercentage: 0,
      lastAccessed: new Date().toISOString()
    };
    memoryProgress.push(existing);
  }

  Object.assign(existing, updates, { lastAccessed: new Date().toISOString() });

  // Recalculate percentage
  let parts = 0;
  let done = 0;
  parts++; if (existing.video1Completed) done++;
  parts++; if (existing.video2Completed) done++;
  parts++; if (existing.audioCompleted) done++;
  parts++; if (existing.pdfViewed) done++;
  parts++; if (existing.quizCompleted) done++;

  existing.completionPercentage = Math.round((done / parts) * 100);

  return existing;
}

// -------------------------------------------------------------
// QUIZ APIs
// -------------------------------------------------------------

export async function fetchQuiz(quizId: string): Promise<{ quiz: Quiz | null; questions: Question[] }> {
  const live = await callAppsScriptApi<{ quiz: Quiz; questions: Question[] }>('getQuiz', { quizId });
  if (live.success && live.data) {
    return live.data;
  }

  const quiz = memoryQuizzes.find(q => q.quizId === quizId) || null;
  const questions = memoryQuestions.filter(q => q.quizId === quizId);
  return { quiz, questions };
}

export async function submitQuizResult(
  studentId: string,
  quizId: string,
  score: number,
  passed: boolean
): Promise<{ success: boolean; resultId: string }> {
  const live = await callAppsScriptApi<{ resultId: string }>('submitQuizResult', { studentId, quizId, score, passed });
  if (live.success && live.data) {
    return { success: true, resultId: live.data.resultId };
  }

  const resultId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

  // Find module related to quiz
  const quiz = memoryQuizzes.find(q => q.quizId === quizId);
  if (quiz) {
    await updateProgress(studentId, quiz.moduleId, { quizCompleted: passed });
  }

  logActivity(`Student ${studentId}`, `Submitted Quiz ${quizId} - Score: ${score}% (Passed: ${passed})`);

  return { success: true, resultId };
}

// -------------------------------------------------------------
// ANNOUNCEMENTS
// -------------------------------------------------------------

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const live = await callAppsScriptApi<Announcement[]>('getAnnouncements');
  if (live.success && Array.isArray(live.data)) {
    return live.data;
  }
  return memoryAnnouncements.filter(a => a.published);
}

// -------------------------------------------------------------
// ADMIN MANAGEMENTS
// -------------------------------------------------------------

export async function fetchAllStudents(): Promise<Student[]> {
  const live = await callAppsScriptApi<Student[]>('adminGetStudents');
  if (live.success && Array.isArray(live.data)) {
    return live.data;
  }
  return memoryStudents;
}

export async function fetchAllRequests(): Promise<StudentRequest[]> {
  const live = await callAppsScriptApi<StudentRequest[]>('adminGetRequests');
  if (live.success && Array.isArray(live.data)) {
    return live.data;
  }
  return memoryRequests;
}

export async function approveStudentRequest(requestId: string): Promise<boolean> {
  const req = memoryRequests.find(r => r.requestId === requestId);
  if (!req) return false;

  req.status = 'Approved';
  req.approvedBy = 'Admin';

  const newStudent: Student = {
    studentId: `STD-${Math.floor(1000 + Math.random() * 9000)}`,
    admissionNumber: req.admissionNumber,
    name: req.name,
    email: req.email,
    phone: req.phone,
    course: req.course,
    profileImage: `https://images.unsplash.com/photo-${1530000000000 + Math.floor(Math.random() * 100000)}?w=300&auto=format&fit=crop&q=80`,
    approved: true,
    status: 'Active',
    createdDate: new Date().toISOString().split('T')[0]
  };

  memoryStudents = [newStudent, ...memoryStudents];
  logActivity("Admin", `Approved request ${requestId} for ${req.name}`);

  return true;
}

export async function rejectStudentRequest(requestId: string): Promise<boolean> {
  const req = memoryRequests.find(r => r.requestId === requestId);
  if (req) {
    req.status = 'Rejected';
    logActivity("Admin", `Rejected request ${requestId}`);
    return true;
  }
  return false;
}

export async function saveModule(mod: Module): Promise<boolean> {
  const idx = memoryModules.findIndex(m => m.moduleId === mod.moduleId);
  if (idx >= 0) {
    memoryModules[idx] = mod;
  } else {
    memoryModules.push(mod);
  }
  logActivity("Admin", `Saved module: ${mod.title}`);
  return true;
}

export async function deleteModule(moduleId: string): Promise<boolean> {
  memoryModules = memoryModules.filter(m => m.moduleId !== moduleId);
  logActivity("Admin", `Deleted module ${moduleId}`);
  return true;
}

export async function saveAnnouncement(ann: Announcement): Promise<boolean> {
  const idx = memoryAnnouncements.findIndex(a => a.announcementId === ann.announcementId);
  if (idx >= 0) {
    memoryAnnouncements[idx] = ann;
  } else {
    memoryAnnouncements.unshift(ann);
  }
  logActivity("Admin", `Saved announcement: ${ann.title}`);
  return true;
}

export async function fetchSystemLogs(): Promise<SystemLog[]> {
  return memoryLogs;
}

export async function logActivity(user: string, action: string) {
  const newLog: SystemLog = {
    id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
    user,
    action,
    date: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ip: "127.0.0.1",
    browser: navigator.userAgent.split(" ")[0] || "Browser"
  };
  memoryLogs = [newLog, ...memoryLogs];
}
