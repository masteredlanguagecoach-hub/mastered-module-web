import { Student, Admin, StudentRequest, Module, Quiz, Question, StudentProgress, Announcement, SystemSettings, SystemLog } from '../types';

export const INITIAL_SETTINGS: SystemSettings = {
  brandName: "MASTERED Language Coach",
  logo: "MASTERED",
  theme: "Modern Dark/Slate",
  supportEmail: "support@masteredlanguagecoach.com",
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxbqPvlxmAFOgtXn-VJ9b9fuvjOL3hsy18wSCu4xYhfVIcnLMVWGVbeD6XsLxv1ZG_2/exec",
  spreadsheetId: "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg"
};

export const MOCK_ADMINS: Admin[] = [
  {
    adminId: "ADM-001",
    name: "Head Coach Sarah Jenkins",
    email: "admin@mastered.com",
    role: "Super Admin",
    status: "Active",
    createdDate: "2026-01-15"
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    studentId: "STD-1001",
    admissionNumber: "MLC-2026-001",
    name: "Alex Morgan",
    email: "student@mastered.com",
    phone: "+1 (555) 234-5678",
    course: "Executive English Fluency",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    approved: true,
    status: "Active",
    createdDate: "2026-02-01"
  },
  {
    studentId: "STD-1002",
    admissionNumber: "MLC-2026-002",
    name: "David Chen",
    email: "david.chen@example.com",
    phone: "+1 (555) 876-5432",
    course: "Business Communication & Speaking",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    approved: true,
    status: "Active",
    createdDate: "2026-02-10"
  },
  {
    studentId: "STD-1003",
    admissionNumber: "MLC-2026-003",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+1 (555) 345-6789",
    course: "Advanced Pronunciation Masterclass",
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    approved: true,
    status: "Active",
    createdDate: "2026-02-15"
  }
];

export const MOCK_REQUESTS: StudentRequest[] = [
  {
    requestId: "REQ-501",
    name: "Marcus Vance",
    phone: "+1 (555) 998-1122",
    email: "marcus.v@example.com",
    admissionNumber: "MLC-2026-044",
    course: "Executive English Fluency",
    status: "Pending",
    createdDate: "2026-08-04"
  },
  {
    requestId: "REQ-502",
    name: "Sophia Martinez",
    phone: "+1 (555) 443-2211",
    email: "sophia.m@example.com",
    admissionNumber: "MLC-2026-045",
    course: "Business Communication & Speaking",
    status: "Pending",
    createdDate: "2026-08-05"
  }
];

export const MOCK_MODULES: Module[] = [
  {
    moduleId: "MOD-101",
    moduleNumber: 1,
    title: "Foundations of Confident Executive Speaking",
    description: "Master vocal projection, posture, tone resonance, and high-impact introductory techniques for global business meetings.",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
    video1: "https://drive.google.com/file/d/1v1-sample-drive-video1/view",
    video2: "https://drive.google.com/file/d/1v2-sample-drive-video2/view",
    audio: "https://drive.google.com/file/d/1audio-sample-drive/view",
    pdf: "https://drive.google.com/file/d/1pdf-sample-drive/view",
    quizId: "QUIZ-101",
    published: true,
    order: 1
  },
  {
    moduleId: "MOD-102",
    moduleNumber: 2,
    title: "High-Stakes Negotiations & Persuasive Idioms",
    description: "Learn core psychological framing, diplomatic phrasing, and advanced business idioms used by senior leaders during boardroom discussions.",
    thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
    video1: "https://drive.google.com/file/d/2v1-sample-drive-video1/view",
    video2: "https://drive.google.com/file/d/2v2-sample-drive-video2/view",
    audio: "https://drive.google.com/file/d/2audio-sample-drive/view",
    pdf: "https://drive.google.com/file/d/2pdf-sample-drive/view",
    quizId: "QUIZ-102",
    published: true,
    order: 2
  },
  {
    moduleId: "MOD-103",
    moduleNumber: 3,
    title: "Mastering Accent Softening & Intonation Patterns",
    description: "Deconstruct complex pitch accents, cadence control, and vowel elongation patterns to deliver effortless clarity.",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    video1: "https://drive.google.com/file/d/3v1-sample-drive-video1/view",
    video2: "",
    audio: "https://drive.google.com/file/d/3audio-sample-drive/view",
    pdf: "https://drive.google.com/file/d/3pdf-sample-drive/view",
    quizId: "QUIZ-103",
    published: true,
    order: 3
  },
  {
    moduleId: "MOD-104",
    moduleNumber: 4,
    title: "Public Speaking & Keynote Delivery Excellence",
    description: "Conquer audience anxiety, structure powerful storytelling arcs, and command stage presence during live presentations.",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    video1: "https://drive.google.com/file/d/4v1-sample-drive-video1/view",
    video2: "",
    audio: "",
    pdf: "https://drive.google.com/file/d/4pdf-sample-drive/view",
    quizId: "QUIZ-104",
    published: true,
    order: 4
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    quizId: "QUIZ-101",
    moduleId: "MOD-101",
    title: "Module 1 Mastery Check: Executive Vocal Projection",
    passPercentage: 80,
    timeLimit: 10
  },
  {
    quizId: "QUIZ-102",
    moduleId: "MOD-102",
    title: "Module 2 Mastery Check: Diplomatic Phrasing",
    passPercentage: 75,
    timeLimit: 12
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    questionId: "Q-101-1",
    quizId: "QUIZ-101",
    question: "When delivering an executive pitch, what vocal register creates maximum perceived authority?",
    optionA: "High pitch with rapid inflection",
    optionB: "Resonant chest voice with measured pacing",
    optionC: "Soft whisper with frequent pauses",
    optionD: "Monotone flat delivery",
    correctAnswer: "B",
    explanation: "A resonant chest voice combined with deliberate, measured pacing engages listeners and conveys calm confidence and executive presence."
  },
  {
    questionId: "Q-101-2",
    quizId: "QUIZ-101",
    question: "What is the primary function of the 'strategic pause' in public speaking?",
    optionA: "To remember forgotten presentation slides",
    optionB: "To allow the audience to digest crucial points and build tension",
    optionC: "To increase total presentation duration",
    optionD: "To wait for audience applause after every sentence",
    correctAnswer: "B",
    explanation: "Strategic pauses create emphasis, allow key insights to settle, and give speakers full command over the audience's attention."
  },
  {
    questionId: "Q-101-3",
    quizId: "QUIZ-101",
    question: "Which posture adjustment enhances diaphragmatic breathing during live talks?",
    optionA: "Slouching shoulder forward",
    optionB: "Upright spine with opened collarbones and grounded stance",
    optionC: "Crossing arms tightly over chest",
    optionD: "Leaning heavily against the podium",
    correctAnswer: "B",
    explanation: "An upright spine with open chest allows full lung expansion and smooth diaphragmatic air delivery."
  }
];

export const MOCK_PROGRESS: StudentProgress[] = [
  {
    studentId: "STD-1001",
    moduleId: "MOD-101",
    video1Completed: true,
    video2Completed: true,
    audioCompleted: true,
    pdfViewed: true,
    quizCompleted: true,
    completionPercentage: 100,
    lastAccessed: "2026-08-04T14:30:00Z"
  },
  {
    studentId: "STD-1001",
    moduleId: "MOD-102",
    video1Completed: true,
    video2Completed: false,
    audioCompleted: true,
    pdfViewed: true,
    quizCompleted: false,
    completionPercentage: 60,
    lastAccessed: "2026-08-05T09:15:00Z"
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    announcementId: "ANN-301",
    title: "🎉 Live Masterclass: Advanced Negotiation Tactics with Coach Sarah",
    description: "Join us this Friday at 6:00 PM EST for an exclusive live Q&A session. Bring your toughest speaking scenarios!",
    visibility: "All Students",
    published: true,
    createdDate: "2026-08-03"
  },
  {
    announcementId: "ANN-302",
    title: "📚 New Audio Workout Module Added to Portal",
    description: "Module 3 audio drills are now updated with high-definition audio tracks for daily 10-minute accent refinement.",
    visibility: "All Students",
    published: true,
    createdDate: "2026-08-01"
  }
];

export const MOCK_LOGS: SystemLog[] = [
  {
    id: "LOG-901",
    user: "STD-1001 (Alex Morgan)",
    action: "Completed Module 1 Quiz (Score: 100%)",
    date: "2026-08-04 14:32:10",
    ip: "192.168.1.45",
    browser: "Chrome 122.0 / Windows"
  },
  {
    id: "LOG-902",
    user: "ADM-001 (Coach Sarah)",
    action: "Approved Student Request REQ-499",
    date: "2026-08-04 11:15:00",
    ip: "10.0.0.12",
    browser: "Safari 17.2 / macOS"
  }
];
