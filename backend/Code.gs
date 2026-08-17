/**
 * MASTERED Language Coach - Production Google Apps Script REST API Backend
 * Handlers for doGet and doPost requests to perform CRUD on Google Sheets.
 * Full JSONP & CORS support enabled to guarantee cross-domain sync across mobile & desktop.
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
  try {
    var params = (e && e.parameter) ? e.parameter : {};
    var action = params.action || 'getModules';
    var callback = params.callback;

    var data = params;
    if (params.payload) {
      try {
        var parsed = JSON.parse(params.payload);
        for (var k in parsed) {
          data[k] = parsed[k];
        }
      } catch(err) {}
    }

    var result = routeActionObj(action, data);
    return handleResponse(result, callback);
  } catch(err) {
    return handleResponse({ success: false, message: "GET Exception: " + err.toString() }, e && e.parameter ? e.parameter.callback : null);
  }
}

function doPost(e) {
  try {
    var contents = e.postData.contents;
    var data = JSON.parse(contents || "{}");
    var action = data.action || (e && e.parameter ? e.parameter.action : "");

    // Merge nested payload if passed
    if (data.payload && typeof data.payload === 'object') {
      for (var key in data.payload) {
        if (data[key] === undefined) {
          data[key] = data.payload[key];
        }
      }
    }

    var result = routeActionObj(action, data);
    return handleResponse(result, null);
  } catch (err) {
    return handleResponse({ success: false, message: "POST Exception: " + err.toString() }, null);
  }
}

function routeActionObj(action, data) {
  switch (action) {
    case 'ping':
      return { success: true, message: "PONG! Live Google Sheets connection verified." };

    case 'loginStudent':
      return handleLoginStudent(data);

    case 'loginAdmin':
      return handleLoginAdmin(data);

    case 'submitRequest':
      return handleSubmitRequest(data);

    case 'getRequests':
    case 'adminGetRequests':
      return handleAdminGetRequests();

    case 'getStudents':
    case 'adminGetStudents':
      return handleAdminGetStudents();

    case 'getModules':
      return handleGetModules();

    case 'adminSaveModule':
      return handleAdminSaveModule(data);

    case 'saveStudentProgress':
      return handleSaveStudentProgress(data);

    case 'getStudentProgress':
      return handleGetStudentProgress(data);

    case 'updateProgress':
      return handleUpdateProgress(data);

    case 'approveRequest':
      return handleApproveRequest(data);

    default:
      return handleGetModules();
  }
}

function handleResponse(obj, callback) {
  if (callback) {
    var jsonpStr = callback + "(" + JSON.stringify(obj) + ");";
    return ContentService.createTextOutput(jsonpStr)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
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
        return {
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
        };
      } else {
        return { success: false, message: "Your request is pending admin approval." };
      }
    }
  }
  return { success: false, message: "Invalid email or admission number." };
}

function handleLoginAdmin(data) {
  var email = (data.email || "").toString().trim().toLowerCase();
  var pass = (data.password || "").toString().trim();

  if (email === "masteredlanguagecoach@gmail.com" && pass === "4languagecoach") {
    return {
      success: true,
      admin: { adminId: "ADM-002", name: "Mastered Language Coach", email: "masteredlanguagecoach@gmail.com", role: "Super Admin" }
    };
  }

  return { success: false, message: "Invalid admin credentials." };
}

function handleSubmitRequest(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Requests");
  if (!sheet) return { success: false, message: "Requests sheet missing." };

  var reqId = data.requestId || ("REQ-" + Math.floor(1000 + Math.random() * 9000));
  var dateStr = new Date().toISOString().split('T')[0];

  var name = data.name || data.Name || "";
  var phone = data.phone || data.Phone || "";
  var email = data.email || data.Email || "";
  var adm = data.admissionNumber || data.AdmissionNumber || "";
  var course = data.course || data.Course || "";

  sheet.appendRow([
    reqId,
    name,
    phone,
    email,
    adm,
    course,
    "Pending",
    dateStr,
    ""
  ]);

  return { success: true, message: "Request submitted successfully!" };
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
  return { success: true, data: modules };
}

function handleAdminSaveModule(data) {
  var mod = data.module || data;
  if (!mod || !mod.title) return { success: false, message: "No module payload" };

  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Modules");
  if (!sheet) return { success: false, message: "Modules sheet missing" };

  var rows = sheet.getDataRange().getValues();
  var foundRow = -1;

  for (var i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === (mod.moduleId || "").toString()) {
      foundRow = i + 1;
      break;
    }
  }

  var rowValues = [
    mod.moduleId || ("MOD-" + Math.floor(100 + Math.random() * 900)),
    mod.moduleNumber || 1,
    mod.title || "",
    mod.description || "",
    mod.thumbnail || "",
    mod.video1 || "",
    mod.video2 || "",
    mod.audio || "",
    mod.pdf || "",
    mod.quizId || "",
    "TRUE",
    mod.order || 1
  ];

  if (foundRow > 0) {
    sheet.getRange(foundRow, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  return { success: true, message: "Module saved to Google Sheet!" };
}

function handleApproveRequest(data) {
  var ss = getMasteredSpreadsheet();
  var reqSheet = ss.getSheetByName("Requests");
  var stdSheet = ss.getSheetByName("Students");
  var approvedReq = null;

  var targetReqId = (data.requestId || "").toString().trim();
  var targetAdm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var targetEmail = (data.email || "").toString().trim().toLowerCase();

  if (reqSheet) {
    var reqRows = reqSheet.getDataRange().getValues();
    for (var i = 1; i < reqRows.length; i++) {
      var rId = (reqRows[i][0] || "").toString().trim();
      var rAdm = (reqRows[i][4] || "").toString().trim().toUpperCase();
      var rEmail = (reqRows[i][3] || "").toString().trim().toLowerCase();

      if ((targetReqId && rId === targetReqId) || (targetAdm && rAdm === targetAdm) || (targetEmail && rEmail === targetEmail)) {
        reqSheet.getRange(i + 1, 7).setValue("Approved");
        reqSheet.getRange(i + 1, 9).setValue("Admin");
        approvedReq = {
          requestId: reqRows[i][0] || targetReqId,
          name: reqRows[i][1] || data.name || "",
          phone: reqRows[i][2] || data.phone || "",
          email: reqRows[i][3] || data.email || "",
          admissionNumber: reqRows[i][4] || data.admissionNumber || "",
          course: reqRows[i][5] || data.course || ""
        };
        break;
      }
    }
  }

  if (!approvedReq && (data.name || data.admissionNumber || data.email)) {
    approvedReq = {
      requestId: targetReqId,
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      admissionNumber: data.admissionNumber || "",
      course: data.course || ""
    };
  }

  if (stdSheet && approvedReq) {
    var stdId = "STD-" + Math.floor(1000 + Math.random() * 9000);
    var dateStr = new Date().toISOString().split('T')[0];

    var stdRows = stdSheet.getDataRange().getValues();
    var alreadyExists = false;

    for (var j = 1; j < stdRows.length; j++) {
      var sAdm = (stdRows[j][1] || "").toString().trim().toUpperCase();
      var sEmail = (stdRows[j][3] || "").toString().trim().toLowerCase();
      if ((approvedReq.admissionNumber && sAdm === approvedReq.admissionNumber.toString().toUpperCase()) ||
          (approvedReq.email && sEmail === approvedReq.email.toString().toLowerCase())) {
        stdSheet.getRange(j + 1, 8).setValue("TRUE");
        stdSheet.getRange(j + 1, 9).setValue("Active");
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      stdSheet.appendRow([
        stdId,
        approvedReq.admissionNumber,
        approvedReq.name,
        approvedReq.email,
        approvedReq.phone,
        approvedReq.course,
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        "TRUE",
        "Active",
        dateStr
      ]);
    }
  }

  return { success: true, message: "Request approved and student enrolled!" };
}

function handleSaveStudentProgress(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("StudentProgress");
  if (!sheet) {
    sheet = ss.insertSheet("StudentProgress");
    sheet.appendRow(["AdmissionNumber", "Email", "ProgressJSON", "LastUpdated"]);
  }

  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var email = (data.email || "").toString().trim().toLowerCase();
  var progressStr = JSON.stringify(data.userProgress || {});
  var now = new Date();

  var rows = sheet.getDataRange().getValues();
  var found = false;

  for (var i = 1; i < rows.length; i++) {
    var rowAdm = (rows[i][0] || "").toString().trim().toUpperCase();
    var rowEmail = (rows[i][1] || "").toString().trim().toLowerCase();
    if ((adm && rowAdm === adm) || (email && rowEmail === email)) {
      sheet.getRange(i + 1, 3).setValue(progressStr);
      sheet.getRange(i + 1, 4).setValue(now);
      found = true;
      break;
    }
  }

  if (!found) sheet.appendRow([adm, email, progressStr, now]);
  return { success: true, userProgress: data.userProgress };
}

function handleGetStudentProgress(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("StudentProgress");
  if (!sheet) return { success: true, userProgress: {} };

  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var email = (data.email || "").toString().trim().toLowerCase();
  var rows = sheet.getDataRange().getValues();

  var progObj = {};
  for (var i = 1; i < rows.length; i++) {
    var rowAdm = (rows[i][0] || "").toString().trim().toUpperCase();
    var rowEmail = (rows[i][1] || "").toString().trim().toLowerCase();
    if ((adm && rowAdm === adm) || (email && rowEmail === email)) {
      try { progObj = JSON.parse(rows[i][2]); } catch(e) {}
      break;
    }
  }

  return { success: true, userProgress: progObj };
}

function handleUpdateProgress(data) {
  return { success: true, message: "Progress recorded." };
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
  return { success: true, data: list };
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
  return { success: true, data: list };
}
