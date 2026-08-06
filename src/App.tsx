import React, { useState, useEffect } from 'react';
import { Student, Admin, Module, StudentProgress, Announcement, StudentRequest, SystemLog } from './types';
import {
  fetchAllStudents,
  fetchAllRequests,
  fetchModules,
  fetchStudentProgress,
  fetchAnnouncements,
  fetchSystemLogs
} from './lib/api';

// Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CertificateModal } from './components/CertificateModal';

// Views
import { StudentLoginView } from './views/student/StudentLoginView';
import { StudentRequestView } from './views/student/StudentRequestView';
import { StudentDashboardView } from './views/student/StudentDashboardView';
import { StudentModulesView } from './views/student/StudentModulesView';
import { ModuleDetailView } from './views/student/ModuleDetailView';
import { StudentQuizzesView } from './views/student/StudentQuizzesView';
import { StudentDownloadsView } from './views/student/StudentDownloadsView';
import { StudentAnnouncementsView } from './views/student/StudentAnnouncementsView';
import { StudentProfileView } from './views/student/StudentProfileView';
import { StudentSettingsView } from './views/student/StudentSettingsView';

// Admin Views
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { StudentManagementView } from './views/admin/StudentManagementView';
import { RequestManagementView } from './views/admin/RequestManagementView';
import { ModuleManagementView } from './views/admin/ModuleManagementView';
import { QuizManagementView } from './views/admin/QuizManagementView';
import { AnnouncementsManagementView } from './views/admin/AnnouncementsManagementView';
import { ReportsAnalyticsView } from './views/admin/ReportsAnalyticsView';
import { AdminSettingsView } from './views/admin/AdminSettingsView';

export function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<Student | Admin | null>(null);
  const [role, setRole] = useState<'student' | 'admin' | null>(null);
  const [authScreen, setAuthScreen] = useState<'login' | 'request' | 'admin-login'>('login');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Data Stores
  const [students, setStudents] = useState<Student[]>([]);
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);

  // Load Data
  const loadData = async () => {
    const [st, req, mod, ann, lg] = await Promise.all([
      fetchAllStudents(),
      fetchAllRequests(),
      fetchModules(),
      fetchAnnouncements(),
      fetchSystemLogs()
    ]);
    setStudents(st);
    setRequests(req);
    setModules(mod);
    setAnnouncements(ann);
    setLogs(lg);

    if (currentUser && role === 'student') {
      const pr = await fetchStudentProgress((currentUser as Student).studentId);
      setProgress(pr);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser, role]);

  const handleStudentLoginSuccess = (student: Student) => {
    setCurrentUser(student);
    setRole('student');
    setActiveTab('dashboard');
  };

  const handleAdminLoginSuccess = (admin: Admin) => {
    setCurrentUser(admin);
    setRole('admin');
    setActiveTab('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRole(null);
    setAuthScreen('login');
    setSelectedModuleId(null);
  };

  // Render Auth Views if not logged in
  if (!currentUser) {
    if (authScreen === 'request') {
      return <StudentRequestView onBackToLogin={() => setAuthScreen('login')} />;
    }
    if (authScreen === 'admin-login') {
      return (
        <AdminLoginView
          onSuccess={handleAdminLoginSuccess}
          onBackToStudentLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <StudentLoginView
        onSuccess={handleStudentLoginSuccess}
        onNavigateRequest={() => setAuthScreen('request')}
        onNavigateAdmin={() => setAuthScreen('admin-login')}
      />
    );
  }

  // Find active module detail if selected
  const activeModule = selectedModuleId ? modules.find(m => m.moduleId === selectedModuleId) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header
        user={currentUser}
        role={role}
        onLogout={handleLogout}
        onNavigateProfile={() => setActiveTab(role === 'student' ? 'profile' : 'admin-settings')}
        activeTab={activeTab}
      />

      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar
          role={role!}
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setSelectedModuleId(null);
            setActiveTab(tab);
          }}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {/* STUDENT VIEWS */}
          {role === 'student' && (
            <>
              {selectedModuleId && activeModule ? (
                <ModuleDetailView
                  student={currentUser as Student}
                  module={activeModule}
                  allModules={modules}
                  progress={progress.find(p => p.moduleId === activeModule.moduleId) || null}
                  onBack={() => setSelectedModuleId(null)}
                  onSelectModule={(id) => setSelectedModuleId(id)}
                  onProgressUpdated={loadData}
                />
              ) : (
                <>
                  {activeTab === 'dashboard' && (
                    <StudentDashboardView
                      student={currentUser as Student}
                      modules={modules}
                      progress={progress}
                      announcements={announcements}
                      onSelectModule={(id) => setSelectedModuleId(id)}
                      onOpenCertificate={() => setShowCertificate(true)}
                    />
                  )}
                  {activeTab === 'modules' && (
                    <StudentModulesView
                      modules={modules}
                      progress={progress}
                      onSelectModule={(id) => setSelectedModuleId(id)}
                    />
                  )}
                  {activeTab === 'quiz' && (
                    <StudentQuizzesView
                      quizzes={[]}
                      modules={modules}
                      progress={progress}
                      onSelectModule={(id) => setSelectedModuleId(id)}
                    />
                  )}
                  {activeTab === 'downloads' && <StudentDownloadsView modules={modules} />}
                  {activeTab === 'announcements' && <StudentAnnouncementsView announcements={announcements} />}
                  {activeTab === 'profile' && <StudentProfileView student={currentUser as Student} />}
                  {activeTab === 'settings' && <StudentSettingsView />}
                </>
              )}
            </>
          )}

          {/* ADMIN VIEWS */}
          {role === 'admin' && (
            <>
              {activeTab === 'admin-dashboard' && (
                <AdminDashboardView
                  students={students}
                  requests={requests}
                  modules={modules}
                  logs={logs}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )}
              {activeTab === 'admin-students' && (
                <StudentManagementView students={students} onRefresh={loadData} />
              )}
              {activeTab === 'admin-requests' && (
                <RequestManagementView requests={requests} onRefresh={loadData} />
              )}
              {activeTab === 'admin-modules' && (
                <ModuleManagementView modules={modules} onRefresh={loadData} />
              )}
              {activeTab === 'admin-quizzes' && (
                <QuizManagementView quizzes={[]} questions={[]} modules={modules} onRefresh={loadData} />
              )}
              {activeTab === 'admin-announcements' && (
                <AnnouncementsManagementView announcements={announcements} onRefresh={loadData} />
              )}
              {activeTab === 'admin-reports' && (
                <ReportsAnalyticsView students={students} modules={modules} progress={progress} />
              )}
              {activeTab === 'admin-settings' && <AdminSettingsView />}
            </>
          )}
        </main>
      </div>

      {/* Certificate Modal */}
      {showCertificate && role === 'student' && (
        <CertificateModal
          student={currentUser as Student}
          courseTitle={(currentUser as Student).course}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}
