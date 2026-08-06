/**
 * MASTERED Language Coach - 1-Click Database Setup Script
 * Run `setupMasteredDatabase()` inside Google Apps Script editor.
 * Automatically creates all 12 sheets with headers and demo data!
 */

function setupMasteredDatabase() {
  var spreadsheetId = "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg";
  var ss;
  try {
    ss = SpreadsheetApp.openById(spreadsheetId);
  } catch(e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  var sheetsConfig = {
    "Admins": [
      ["AdminID", "Name", "Email", "Password", "Role", "Status", "CreatedDate"],
      ["ADM-001", "Head Coach Sarah Jenkins", "admin@mastered.com", "admin123", "Super Admin", "Active", "2026-01-15"],
      ["ADM-002", "Mastered Language Coach", "masteredlanguagecoach@gmail.com", "4languagecoach", "Super Admin", "Active", "2026-08-06"]
    ],
    "Students": [
      ["StudentID", "AdmissionNumber", "Name", "Email", "Phone", "Course", "ProfileImage", "Approved", "Status", "CreatedDate"],
      ["STD-1001", "MLC-2026-001", "Alex Morgan", "student@mastered.com", "+1 (555) 234-5678", "Executive English Fluency", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", "TRUE", "Active", "2026-02-01"],
      ["STD-1002", "MLC-2026-002", "David Chen", "david.chen@example.com", "+1 (555) 876-5432", "Business Communication & Speaking", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80", "TRUE", "Active", "2026-02-10"]
    ],
    "Requests": [
      ["RequestID", "Name", "Phone", "Email", "AdmissionNumber", "Course", "Status", "CreatedDate", "ApprovedBy"],
      ["REQ-501", "Marcus Vance", "+1 (555) 998-1122", "marcus.v@example.com", "MLC-2026-044", "Executive English Fluency", "Pending", "2026-08-04", ""]
    ],
    "Modules": [
      ["ModuleID", "ModuleNumber", "Title", "Description", "Thumbnail", "Video1", "Video2", "Audio", "PDF", "QuizID", "Published", "Order"],
      ["MOD-101", 1, "Foundations of Confident Executive Speaking", "Master vocal projection, posture, tone resonance, and high-impact introductory techniques for global business meetings.", "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80", "https://drive.google.com/file/d/1v1-sample-drive-video1/view", "https://drive.google.com/file/d/1v2-sample-drive-video2/view", "https://drive.google.com/file/d/1audio-sample-drive/view", "https://drive.google.com/file/d/1pdf-sample-drive/view", "QUIZ-101", "TRUE", 1],
      ["MOD-102", 2, "High-Stakes Negotiations & Persuasive Idioms", "Learn core psychological framing, diplomatic phrasing, and advanced business idioms used by senior leaders.", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80", "https://drive.google.com/file/d/2v1-sample-drive-video1/view", "", "https://drive.google.com/file/d/2audio-sample-drive/view", "https://drive.google.com/file/d/2pdf-sample-drive/view", "QUIZ-102", "TRUE", 2]
    ],
    "Quiz": [
      ["QuizID", "ModuleID", "Title", "PassPercentage", "TimeLimit"],
      ["QUIZ-101", "MOD-101", "Module 1 Mastery Check: Executive Vocal Projection", 80, 10],
      ["QUIZ-102", "MOD-102", "Module 2 Mastery Check: Diplomatic Phrasing", 75, 12]
    ],
    "Questions": [
      ["QuestionID", "QuizID", "Question", "OptionA", "OptionB", "OptionC", "OptionD", "CorrectAnswer", "Explanation"],
      ["Q-101-1", "QUIZ-101", "When delivering an executive pitch, what vocal register creates maximum perceived authority?", "High pitch with rapid inflection", "Resonant chest voice with measured pacing", "Soft whisper with frequent pauses", "Monotone flat delivery", "B", "A resonant chest voice combined with deliberate, measured pacing engages listeners."],
      ["Q-101-2", "QUIZ-101", "What is the primary function of the 'strategic pause' in public speaking?", "To remember slides", "To allow the audience to digest crucial points and build tension", "To increase duration", "To wait for applause", "B", "Strategic pauses create emphasis and allow key insights to settle."]
    ],
    "Quiz Results": [
      ["ResultID", "StudentID", "QuizID", "Score", "Passed", "CompletedDate"],
      ["RES-9001", "STD-1001", "QUIZ-101", 100, "TRUE", "2026-08-04T14:30:00Z"]
    ],
    "Progress": [
      ["StudentID", "ModuleID", "Video1Completed", "Video2Completed", "AudioCompleted", "PDFViewed", "QuizCompleted", "CompletionPercentage", "LastAccessed"],
      ["STD-1001", "MOD-101", "TRUE", "TRUE", "TRUE", "TRUE", "TRUE", 100, "2026-08-04T14:30:00Z"]
    ],
    "Announcements": [
      ["AnnouncementID", "Title", "Description", "Visibility", "Published", "CreatedDate"],
      ["ANN-301", "Live Masterclass: Advanced Negotiation Tactics", "Join us this Friday at 6:00 PM EST for an exclusive live Q&A session.", "All Students", "TRUE", "2026-08-03"]
    ],
    "Settings": [
      ["BrandName", "Logo", "Theme", "SupportEmail"],
      ["MASTERED Language Coach", "MASTERED", "Modern Slate", "support@masteredlanguagecoach.com"]
    ],
    "Sessions": [
      ["SessionID", "StudentID", "Token", "LoginTime", "Expiry"]
    ],
    "Logs": [
      ["User", "Action", "Date", "IP", "Browser"],
      ["STD-1001 (Alex Morgan)", "Completed Module 1 Quiz (Score: 100%)", "2026-08-04 14:32:10", "192.168.1.45", "Chrome"]
    ]
  };

  for (var sheetName in sheetsConfig) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    } else {
      sheet.clear();
    }

    var rows = sheetsConfig[sheetName];
    if (rows.length > 0) {
      sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
      sheet.getRange(1, 1, 1, rows[0].length).setFontWeight("bold").setBackground("#0F172A").setFontColor("#FFFFFF");
    }
  }

  Logger.log("All 12 sheets initialized successfully for MASTERED Language Coach!");
}
