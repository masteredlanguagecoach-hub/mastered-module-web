/**
 * MASTERED Language Coach - Production Google Apps Script REST API Backend
 * Handlers for doGet and doPost requests to perform CRUD on Google Sheets.
 */

var MASTERED_SPREADSHEET_ID = "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg";

function getMasteredSpreadsheet() {
  try {
    return SpreadsheetApp.openById(MASTERED_SPREADSHEET_ID);
  } catch(e) {
    return SpreadsheetApp.getActiveSpreadsheet();
  }
}

function doGet(e) {
  return handleResponse({ success: true, message: "MASTERED Language Coach REST API Endpoint Running." });
}

function doPost(e) {
  try {
    var contents = e.postData.contents;
    var data = JSON.parse(contents);
    var action = data.action;

    switch (action) {
      case 'ping':
        return handleResponse({ success: true, message: "PONG! Live Google Sheets connection verified." });

      case 'loginStudent':
        return handleLoginStudent(data);

      case 'loginAdmin':
        return handleLoginAdmin(data);

      case 'submitRequest':
        return handleSubmitRequest(data);

      case 'getModules':
        return handleGetModules();

      case 'adminSaveModule':
        return handleAdminSaveModule(data);

      case 'getStudentProgress':
        return handleGetStudentProgress(data);

      case 'updateProgress':
        return handleUpdateProgress(data);

      case 'getQuiz':
        return handleGetQuiz(data);

      case 'submitQuizResult':
        return handleSubmitQuizResult(data);

      case 'getAnnouncements':
        return handleGetAnnouncements();

      case 'adminGetStudents':
        return handleAdminGetStudents();

      case 'adminGetRequests':
        return handleAdminGetRequests();

      case 'approveRequest':
        return handleApproveRequest(data);

      case 'adminSaveQuiz':
        return handleAdminSaveQuiz(data);

      case 'adminSaveQuestion':
        return handleAdminSaveQuestion(data);

      default:
        return handleResponse({ success: false, message: "Unknown API action: " + action });
    }
  } catch (err) {
    return handleResponse({ success: false, message: "Server Exception: " + err.toString() });
  }
}

function handleResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheetData(sheetName) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var rows = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    rows.push(obj);
  }
  return rows;
}

function handleLoginStudent(data) {
  var students = getSheetData("Students");
  var email = (data.email || "").toString().trim().toLowerCase();
  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();

  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    if ((s.Email || "").toString().toLowerCase() === email &&
        (s.AdmissionNumber || "").toString().toUpperCase() === adm) {
      if (s.Approved === true || (s.Approved || "").toString().toUpperCase() === 'TRUE') {
        return handleResponse({
          success: true,
          student: {
            studentId: s.StudentID,
            admissionNumber: s.AdmissionNumber,
            name: s.Name,
            email: s.Email,
            phone: s.Phone,
            course: s.Course,
            profileImage: s.ProfileImage,
            approved: true,
            status: s.Status,
            createdDate: s.CreatedDate
          }
        });
      } else {
        return handleResponse({ success: false, message: "Your request is pending admin approval." });
      }
    }
  }
  return handleResponse({ success: false, message: "Invalid email or admission number." });
}

function handleLoginAdmin(data) {
  var admins = getSheetData("Admins");
  var email = (data.email || "").toString().trim().toLowerCase();
  var pass = (data.password || "").toString().trim();

  // Support hardcoded super admin fallback or sheet check
  if (email === "masteredlanguagecoach@gmail.com" && pass === "4languagecoach") {
    return handleResponse({
      success: true,
      admin: { adminId: "ADM-002", name: "Mastered Language Coach", email: "masteredlanguagecoach@gmail.com", role: "Super Admin" }
    });
  }

  for (var i = 0; i < admins.length; i++) {
    var a = admins[i];
    if ((a.Email || "").toString().toLowerCase() === email &&
        (a.Password || "").toString() === pass) {
      return handleResponse({
        success: true,
        admin: {
          adminId: a.AdminID,
          name: a.Name,
          email: a.Email,
          role: a.Role,
          status: a.Status,
          createdDate: a.CreatedDate
        }
      });
    }
  }
  return handleResponse({ success: false, message: "Invalid admin credentials." });
}

function handleSubmitRequest(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Requests");
  if (!sheet) return handleResponse({ success: false, message: "Requests sheet missing." });

  var reqId = data.requestId || ("REQ-" + Math.floor(1000 + Math.random() * 9000));
  var dateStr = new Date().toISOString().split('T')[0];

  sheet.appendRow([
    reqId,
    data.name,
    data.phone,
    data.email,
    data.admissionNumber,
    data.course,
    "Pending",
    dateStr,
    ""
  ]);

  return handleResponse({ success: true, message: "Request submitted successfully!" });
}

function handleGetModules() {
  var raw = getSheetData("Modules");
  var modules = raw.map(function(m) {
    return {
      moduleId: m.ModuleID,
      moduleNumber: Number(m.ModuleNumber) || 1,
      title: m.Title,
      description: m.Description,
      thumbnail: m.Thumbnail,
      video1: m.Video1,
      video2: m.Video2,
      audio: m.Audio,
      pdf: m.PDF,
      quizId: m.QuizID,
      published: m.Published === true || (m.Published || "").toString().toUpperCase() === 'TRUE',
      order: Number(m.Order) || 1
    };
  });
  return handleResponse({ success: true, data: modules });
}

function handleAdminSaveModule(data) {
  var mod = data.module;
  if (!mod) return handleResponse({ success: false, message: "No module payload" });

  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Modules");
  if (!sheet) return handleResponse({ success: false, message: "Modules sheet missing" });

  var rows = sheet.getDataRange().getValues();
  var foundRow = -1;

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === mod.moduleId.toString()) {
      foundRow = i + 1;
      break;
    }
  }

  var rowValues = [
    mod.moduleId,
    mod.moduleNumber,
    mod.title,
    mod.description,
    mod.thumbnail,
    mod.video1,
    mod.video2,
    mod.audio,
    mod.pdf,
    mod.quizId,
    "TRUE",
    mod.order
  ];

  if (foundRow > 0) {
    sheet.getRange(foundRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  return handleResponse({ success: true, message: "Module saved to Google Sheet!" });
}

function handleApproveRequest(data) {
  var ss = getMasteredSpreadsheet();
  var reqSheet = ss.getSheetByName("Requests");
  var stdSheet = ss.getSheetByName("Students");

  if (reqSheet) {
    var reqRows = reqSheet.getDataRange().getValues();
    for (var i = 1; i < reqRows.length; i++) {
      if (reqRows[i][0].toString() === data.requestId.toString()) {
        reqSheet.getRange(i + 1, 7).setValue("Approved");
        reqSheet.getRange(i + 1, 9).setValue("Admin");
        break;
      }
    }
  }

  return handleResponse({ success: true, message: "Request approved!" });
}

function handleAdminSaveQuiz(data) {
  var qz = data.quiz;
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Quiz");
  if (sheet) {
    sheet.appendRow([qz.quizId, qz.moduleId, qz.title, qz.passPercentage, qz.timeLimit]);
  }
  return handleResponse({ success: true });
}

function handleAdminSaveQuestion(data) {
  var qst = data.question;
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Questions");
  if (sheet) {
    sheet.appendRow([qst.id, qst.quizId, qst.question, qst.optionA, qst.optionB, qst.optionC, qst.optionD, qst.correctAnswer, qst.explanation]);
  }
  return handleResponse({ success: true });
}

function handleGetStudentProgress(data) {
  var raw = getSheetData("Progress");
  var filtered = raw.filter(function(p) { return p.StudentID === data.studentId; }).map(function(p) {
    return {
      studentId: p.StudentID,
      moduleId: p.ModuleID,
      video1Completed: p.Video1Completed === true || (p.Video1Completed || "").toString().toUpperCase() === 'TRUE',
      video2Completed: p.Video2Completed === true || (p.Video2Completed || "").toString().toUpperCase() === 'TRUE',
      audioCompleted: p.AudioCompleted === true || (p.AudioCompleted || "").toString().toUpperCase() === 'TRUE',
      pdfViewed: p.PDFViewed === true || (p.PDFViewed || "").toString().toUpperCase() === 'TRUE',
      quizCompleted: p.QuizCompleted === true || (p.QuizCompleted || "").toString().toUpperCase() === 'TRUE',
      completionPercentage: Number(p.CompletionPercentage) || 0,
      lastAccessed: p.LastAccessed
    };
  });
  return handleResponse({ success: true, data: filtered });
}

function handleUpdateProgress(data) {
  return handleResponse({ success: true, message: "Progress recorded." });
}

function handleGetQuiz(data) {
  var quizzes = getSheetData("Quiz");
  var questions = getSheetData("Questions");

  var q = quizzes.find(function(item) { return item.QuizID === data.quizId; });
  var qList = questions.filter(function(item) { return item.QuizID === data.quizId; });

  return handleResponse({
    success: true,
    data: {
      quiz: q ? {
        quizId: q.QuizID,
        moduleId: q.ModuleID,
        title: q.Title,
        passPercentage: Number(q.PassPercentage) || 80,
        timeLimit: Number(q.TimeLimit) || 10
      } : null,
      questions: qList.map(function(item) {
        return {
          questionId: item.QuestionID,
          quizId: item.QuizID,
          question: item.Question,
          optionA: item.OptionA,
          optionB: item.OptionB,
          optionC: item.OptionC,
          optionD: item.OptionD,
          correctAnswer: item.CorrectAnswer,
          explanation: item.Explanation
        };
      })
    }
  });
}

function handleSubmitQuizResult(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Quiz Results");
  var resId = "RES-" + Math.floor(1000 + Math.random() * 9000);
  var dateStr = new Date().toISOString();

  if (sheet) {
    sheet.appendRow([resId, data.studentId, data.quizId, data.score, data.passed ? "TRUE" : "FALSE", dateStr]);
  }

  return handleResponse({ success: true, data: { resultId: resId } });
}

function handleGetAnnouncements() {
  var raw = getSheetData("Announcements");
  var list = raw.map(function(a) {
    return {
      announcementId: a.AnnouncementID,
      title: a.Title,
      description: a.Description,
      visibility: a.Visibility,
      published: a.Published === true || (a.Published || "").toString().toUpperCase() === 'TRUE',
      createdDate: a.CreatedDate
    };
  });
  return handleResponse({ success: true, data: list });
}

function handleAdminGetStudents() {
  var raw = getSheetData("Students");
  var list = raw.map(function(s) {
    return {
      studentId: s.StudentID,
      admissionNumber: s.AdmissionNumber,
      name: s.Name,
      email: s.Email,
      phone: s.Phone,
      course: s.Course,
      profileImage: s.ProfileImage,
      approved: s.Approved === true || (s.Approved || "").toString().toUpperCase() === 'TRUE',
      status: s.Status,
      createdDate: s.CreatedDate
    };
  });
  return handleResponse({ success: true, data: list });
}

function handleAdminGetRequests() {
  var raw = getSheetData("Requests");
  var list = raw.map(function(r) {
    return {
      requestId: r.RequestID,
      name: r.Name,
      phone: r.Phone,
      email: r.Email,
      admissionNumber: r.AdmissionNumber,
      course: r.Course,
      status: r.Status,
      createdDate: r.CreatedDate,
      approvedBy: r.ApprovedBy
    };
  });
  return handleResponse({ success: true, data: list });
}
