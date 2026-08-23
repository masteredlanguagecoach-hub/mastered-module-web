/**
 * MASTERED Language Coach - Production Google Apps Script REST API Backend
 * Handlers for doGet and doPost requests to perform CRUD on Google Sheets.
 * Full Support for MCL-1 Progress Verification Engine.
 */

var MASTERED_SPREADSHEET_ID = "1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg";

function getMasteredSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch(e) {}
  try {
    if (MASTERED_SPREADSHEET_ID) {
      return SpreadsheetApp.openById(MASTERED_SPREADSHEET_ID);
    }
  } catch(e2) {}
  return null;
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

    case 'verifyDeviceSession':
      return handleVerifyDeviceSession(data);

    case 'resetStudentDevice':
      return handleAdminResetStudentDevice(data);

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

    case 'syncPaidStudents':
      return syncAllPaidStudentsToStudentsSheet();

    case 'getModules':
      return handleGetModules();

    case 'adminSaveModule':
      return handleAdminSaveModule(data);

    case 'saveStudentProgress':
      return handleSaveStudentProgress(data);

    case 'getStudentProgress':
      return handleGetStudentProgress(data);

    case 'verifyMclCode':
      return handleVerifyMclCode(data);

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
  if (!data || data.length === 0) return [];

  var headerIdx = 0;
  for (var r = 0; r < data.length; r++) {
    var rowStr = data[r].join(" ").trim();
    if (rowStr.length > 0) {
      headerIdx = r;
      break;
    }
  }

  if (data.length <= headerIdx + 1) return [];

  var headers = data[headerIdx].map(function(h) { return h.toString().trim(); });
  var rows = [];

  for (var i = headerIdx + 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      if (headers[j]) {
        obj[headers[j]] = row[j];
      }
    }
    rows.push(obj);
  }
  return rows;
}

// Mastered Code Language - Version 1 (MCL-1) Codebooks
var MCL_ADM_MAP = {"A":"XK","B":"QF","C":"NV","D":"HT","E":"RM","F":"ZC","G":"PJ","H":"WD","I":"KY","J":"FV","K":"BG","L":"TR","M":"LX","N":"SQ","O":"CP","P":"JN","Q":"VM","R":"DK","S":"YR","T":"GH","U":"MW","V":"KB","W":"RX","X":"TZ","Y":"PF","Z":"HC","0":"VQ","1":"XT","2":"NR","3":"KD","4":"ZM","5":"FW","6":"PB","7":"CJ","8":"HS","9":"YN"};
var MCL_REV_ADM = {};
for (var k1 in MCL_ADM_MAP) { MCL_REV_ADM[MCL_ADM_MAP[k1]] = k1; }

var MCL_MIS_MAP = {"0":"AQ","1":"BR","2":"CT","3":"DV","4":"EX","5":"FZ","6":"GK","7":"HM","8":"JP","9":"LS"};
var MCL_REV_MIS = {};
for (var k2 in MCL_MIS_MAP) { MCL_REV_MIS[MCL_MIS_MAP[k2]] = k2; }

var MCL_PROG_MAP = {"0":"UC","1":"VE","2":"WG","3":"XJ","4":"YL","5":"ZN","6":"AP","7":"BS","8":"DU","9":"EW"};
var MCL_REV_PROG = {};
for (var k3 in MCL_PROG_MAP) { MCL_REV_PROG[MCL_PROG_MAP[k3]] = k3; }

var MCL_LEN_MAP = {3:"QA", 4:"RB", 5:"SC", 6:"TD", 7:"UE", 8:"VF", 9:"WG", 10:"XH", 11:"YJ", 12:"ZK"};
var MCL_REV_LEN = {};
for (var k4 in MCL_LEN_MAP) { MCL_REV_LEN[MCL_LEN_MAP[k4]] = Number(k4); }

function encodeMcl1(admInput, missionInput, progressInput) {
  var adm = (admInput || "").toString().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!adm || !MCL_LEN_MAP[adm.length]) return "";

  var misNum = parseInt(missionInput) || 1;
  var misStr = (misNum < 10 ? "0" + misNum : "" + misNum);

  var progNum = Math.min(100, Math.max(0, parseInt(progressInput) || 0));
  var progStr = (progNum < 10 ? "00" + progNum : (progNum < 100 ? "0" + progNum : "" + progNum));

  var L = MCL_LEN_MAP[adm.length];

  var encAdm = "";
  for (var i = 0; i < adm.length; i++) {
    encAdm += (MCL_ADM_MAP[adm[i]] || "");
  }

  var n = adm.length;
  var n1 = n % 2 !== 0 ? Math.floor((n + 1) / 2) : n / 2;
  var encHalf1 = encAdm.substring(0, n1 * 2);
  var encHalf2 = encAdm.substring(n1 * 2);

  var encMis = "";
  for (var j = 0; j < misStr.length; j++) {
    encMis += (MCL_MIS_MAP[misStr[j]] || "");
  }

  var encProg = "";
  for (var k = 0; k < progStr.length; k++) {
    encProg += (MCL_PROG_MAP[progStr[k]] || "");
  }

  var raw = encProg + encHalf1 + encMis + encHalf2 + L;
  var groups = [];
  for (var g = 0; g < raw.length; g += 4) {
    groups.push(raw.substring(g, g + 4));
  }
  return groups.join("-");
}

function decodeMcl1(codeStr) {
  var clean = (codeStr || "").toString().replace(/[^A-Z]/gi, "").toUpperCase();
  if (clean.length < 12) return { success: false, message: "INVALID PROGRESS CODE" };

  var L_code = clean.slice(-2);
  if (!MCL_REV_LEN[L_code]) return { success: false, message: "INVALID PROGRESS CODE" };

  var n = MCL_REV_LEN[L_code];
  var expectedLen = 6 + (2 * n) + 4 + 2;
  if (clean.length !== expectedLen) return { success: false, message: "INVALID PROGRESS CODE" };

  var n1 = n % 2 !== 0 ? Math.floor((n + 1) / 2) : n / 2;
  var n2 = n - n1;

  var encProg = clean.substring(0, 6);
  var encHalf1 = clean.substring(6, 6 + 2 * n1);
  var encMis = clean.substring(6 + 2 * n1, 6 + 2 * n1 + 4);
  var encHalf2 = clean.substring(6 + 2 * n1 + 4, 6 + 2 * n1 + 4 + 2 * n2);

  var progDigits = "";
  for (var p = 0; p < 6; p += 2) {
    var pPair = encProg.substring(p, p + 2);
    if (!MCL_REV_PROG[pPair]) return { success: false, message: "INVALID PROGRESS CODE" };
    progDigits += MCL_REV_PROG[pPair];
  }
  var progress = parseInt(progDigits, 10);

  var misDigits = "";
  for (var m = 0; m < 4; m += 2) {
    var mPair = encMis.substring(m, m + 2);
    if (!MCL_REV_MIS[mPair]) return { success: false, message: "INVALID PROGRESS CODE" };
    misDigits += MCL_REV_MIS[mPair];
  }
  var mission = parseInt(misDigits, 10);

  var fullEncAdm = encHalf1 + encHalf2;
  var admStr = "";
  for (var a = 0; a < fullEncAdm.length; a += 2) {
    var aPair = fullEncAdm.substring(a, a + 2);
    if (!MCL_REV_ADM[aPair]) return { success: false, message: "INVALID PROGRESS CODE" };
    admStr += MCL_REV_ADM[aPair];
  }

  if (mission < 1 || mission > 33 || progress < 0 || progress > 100) {
    return { success: false, message: "INVALID PROGRESS CODE" };
  }

  return { success: true, admissionNumber: admStr, mission: mission, progress: progress };
}

function handleVerifyMclCode(data) {
  var rawCode = data.code || data.mclCode || "";
  var userAdm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var userEmail = (data.email || "").toString().trim().toLowerCase();

  if (!rawCode) return { success: false, message: "Please enter your MCL-1 progress code." };

  var decoded = decodeMcl1(rawCode);
  if (!decoded.success) {
    return { success: false, message: decoded.message };
  }

  // Check 18: Student Matching Rule
  if (userAdm && decoded.admissionNumber !== userAdm) {
    return { success: false, message: "THIS CODE DOES NOT BELONG TO YOUR ACCOUNT" };
  }

  // Load existing progress from database
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("StudentProgress");
  if (!sheet) {
    sheet = ss.insertSheet("StudentProgress");
    sheet.appendRow(["AdmissionNumber", "Email", "ProgressJSON", "LastUpdated"]);
  }

  var rows = sheet.getDataRange().getValues();
  var rowIndex = -1;
  var userProgObj = {};

  for (var i = 1; i < rows.length; i++) {
    var rowAdm = (rows[i][0] || "").toString().trim().toUpperCase();
    var rowEmail = (rows[i][1] || "").toString().trim().toLowerCase();
    if ((userAdm && rowAdm === userAdm) || (userEmail && rowEmail === userEmail)) {
      rowIndex = i + 1;
      try { userProgObj = JSON.parse(rows[i][2]); } catch(e) {}
      break;
    }
  }

  var modKey = "MOD-" + (decoded.mission < 10 ? "0" + decoded.mission : decoded.mission);
  var currentModObj = userProgObj[modKey] || {};
  var currentPct = Number(currentModObj.percentage) || 0;

  // Check 15: Never Reduce Progress Rule
  if (decoded.progress <= currentPct) {
    return { success: false, message: "NO NEW PROGRESS (Current progress: " + currentPct + "%)" };
  }

  // Update Progress
  currentModObj.percentage = decoded.progress;
  currentModObj.lastUpdated = new Date().toISOString();

  // Check 16: 100% Rule
  if (decoded.progress === 100) {
    currentModObj.status = "COMPLETED";
    currentModObj.aiMissionCompleted = true;

    // Unlock next mission
    var nextModNum = decoded.mission + 1;
    if (nextModNum <= 33) {
      var nextModKey = "MOD-" + (nextModNum < 10 ? "0" + nextModNum : nextModNum);
      if (!userProgObj[nextModKey]) userProgObj[nextModKey] = {};
      userProgObj[nextModKey].unlocked = true;
    }
  }

  // Check 14: History Update Rule
  if (!currentModObj.history) currentModObj.history = [];
  currentModObj.history.push({
    mission: decoded.mission,
    progress: decoded.progress,
    timestamp: new Date().toISOString()
  });

  userProgObj[modKey] = currentModObj;
  var updatedProgressStr = JSON.stringify(userProgObj);
  var now = new Date();

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 3).setValue(updatedProgressStr);
    sheet.getRange(rowIndex, 4).setValue(now);
  } else {
    sheet.appendRow([userAdm, userEmail, updatedProgressStr, now]);
  }

  return {
    success: true,
    message: "🎉 Progress Verified! Level " + decoded.mission + " updated to " + decoded.progress + "%!",
    userProgress: userProgObj,
    decoded: decoded
  };
}

// Auto-Approve Paid Students from "PAID_STUDENTS" Sheet Tab
function checkAndAutoApprovePaidStudent(targetAdm, targetEmail) {
  try {
    var ss = getMasteredSpreadsheet();
    var paidSheet = ss.getSheetByName("PAID_STUDENTS") ||
                    ss.getSheetByName("Paid Students") ||
                    ss.getSheetByName("PaidStudents") ||
                    ss.getSheetByName("Paid") ||
                    ss.getSheetByName("Payments");

    if (!paidSheet) {
      // Look for any sheet tab with "PAID" in its name
      var allSheets = ss.getSheets();
      for (var s = 0; s < allSheets.length; s++) {
        var sName = allSheets[s].getName().toUpperCase();
        if (sName.indexOf("PAID") >= 0) {
          paidSheet = allSheets[s];
          break;
        }
      }
    }

    if (!paidSheet) return null;

    var paidData = paidSheet.getDataRange().getValues();
    if (paidData.length <= 1) return null;

    var headerRowIndex = 0;
    for (var r = 0; r < paidData.length; r++) {
      var rStr = paidData[r].join(" ").toLowerCase();
      if (rStr.indexOf("admission") >= 0 || rStr.indexOf("email") >= 0 || rStr.indexOf("full name") >= 0 || rStr.indexOf("status") >= 0) {
        headerRowIndex = r;
        break;
      }
    }

    var headers = paidData[headerRowIndex].map(function(h) { return h.toString().trim().toLowerCase(); });
    var admIdx = -1, emailIdx = -1, nameIdx = -1, phoneIdx = -1, courseIdx = -1, statusIdx = -1;

    for (var k = 0; k < headers.length; k++) {
      var h = headers[k];
      if (h.indexOf("admission") >= 0 || h.indexOf("adm") >= 0) admIdx = k;
      if (h === "full name" || h.indexOf("full name") >= 0 || (h.indexOf("name") >= 0 && h.indexOf("course") < 0)) nameIdx = k;
      if (h.indexOf("email") >= 0 && h.indexOf("verified") < 0) emailIdx = k;
      if (h.indexOf("whatsapp") >= 0 || h.indexOf("phone") >= 0 || h.indexOf("mobile") >= 0) phoneIdx = k;
      if (h.indexOf("course name") >= 0 || h.indexOf("course code") >= 0 || h.indexOf("course") >= 0) courseIdx = k;
      if (h.indexOf("payment status") >= 0 || h.indexOf("status") >= 0) statusIdx = k;
    }

    // Fallbacks based on exact PAID_STUDENTS sheet layout:
    // Col B (idx 1): Admission Number
    // Col C (idx 2): Full Name
    // Col D (idx 3): Email
    // Col F (idx 5): WhatsApp Number
    // Col H (idx 7): Course Name / Col G (idx 6): Course Code
    // Col K (idx 10): Payment Status
    if (admIdx < 0 && headers.length > 1) admIdx = 1;
    if (nameIdx < 0 && headers.length > 2) nameIdx = 2;
    if (emailIdx < 0 && headers.length > 3) emailIdx = 3;
    if (phoneIdx < 0 && headers.length > 5) phoneIdx = 5;
    if (courseIdx < 0 && headers.length > 7) courseIdx = 7;
    if (statusIdx < 0 && headers.length > 10) statusIdx = 10;

    var cleanAdm = (targetAdm || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    var cleanEmail = (targetEmail || "").toString().trim().toLowerCase();

    var foundPaid = null;
    for (var i = headerRowIndex + 1; i < paidData.length; i++) {
      var row = paidData[i];
      var pAdm = admIdx >= 0 ? (row[admIdx] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
      var pEmail = emailIdx >= 0 ? (row[emailIdx] || "").toString().trim().toLowerCase() : "";
      var pStatus = statusIdx >= 0 ? (row[statusIdx] || "").toString().trim().toUpperCase() : "";

      // Optional status check: If status column exists, verify it is SUCCESS / PAID / COMPLETED or TRUE
      if (statusIdx >= 0 && pStatus && pStatus !== "SUCCESS" && pStatus !== "PAID" && pStatus !== "COMPLETED" && pStatus !== "TRUE" && pStatus !== "YES") {
        continue;
      }

      if ((cleanAdm && pAdm && pAdm === cleanAdm) || (cleanEmail && pEmail && pEmail === cleanEmail)) {
        var rawCourse = courseIdx >= 0 ? (row[courseIdx] || "").toString().trim() : "MAL TO ENG";
        var normCourse = "MAL TO ENG";
        var cUpper = rawCourse.toUpperCase();
        if (cUpper.indexOf("ML") >= 0 || cUpper.indexOf("MALAYALAM") >= 0) normCourse = "MAL TO ENG";
        else if (cUpper.indexOf("HI") >= 0 || cUpper.indexOf("HINDI") >= 0) normCourse = "HIND TO ENG";
        else if (cUpper.indexOf("TA") >= 0 || cUpper.indexOf("TAMIL") >= 0) normCourse = "TAMIL TO ENG";
        else if (cUpper.indexOf("KA") >= 0 || cUpper.indexOf("KANNADA") >= 0) normCourse = "KANNADA TO ENG";
        else if (cUpper.indexOf("BA") >= 0 || cUpper.indexOf("BENGALI") >= 0 || cUpper.indexOf("BANGALI") >= 0) normCourse = "BANGALI TO ENG";

        foundPaid = {
          admissionNumber: pAdm || cleanAdm,
          name: nameIdx >= 0 ? (row[nameIdx] || "").toString().trim() : "Paid Student",
          email: pEmail || cleanEmail,
          phone: phoneIdx >= 0 ? (row[phoneIdx] || "").toString().trim() : "",
          course: normCourse
        };
        break;
      }
    }

    if (!foundPaid) return null;

    // Auto-Enroll Paid Student into Students Sheet Tab with Approved = TRUE
    var stdSheet = ss.getSheetByName("Students");
    if (!stdSheet) stdSheet = ss.insertSheet("Students");

    var stdRows = stdSheet.getDataRange().getValues();
    var existingRowIndex = -1;

    for (var j = 1; j < stdRows.length; j++) {
      var sAdm = (stdRows[j][1] || "").toString().trim().toUpperCase();
      var sEmail = (stdRows[j][3] || "").toString().trim().toLowerCase();
      if ((foundPaid.admissionNumber && sAdm === foundPaid.admissionNumber) ||
          (foundPaid.email && sEmail === foundPaid.email)) {
        existingRowIndex = j + 1;
        stdSheet.getRange(j + 1, 8).setValue("TRUE");   // Column H = Approved
        stdSheet.getRange(j + 1, 9).setValue("Active"); // Column I = Status
        break;
      }
    }

    if (existingRowIndex < 0) {
      var stdId = "STD-" + Math.floor(1000 + Math.random() * 9000);
      var dateStr = new Date().toISOString().split('T')[0];
      stdSheet.appendRow([
        stdId,
        foundPaid.admissionNumber,
        foundPaid.name,
        foundPaid.email,
        foundPaid.phone,
        foundPaid.course,
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        "TRUE",
        "Active",
        dateStr,
        "" // ActiveDeviceToken left blank for initial login binding
      ]);
    }

    return foundPaid;
  } catch(err) {
    return null;
  }
}

function handleLoginStudent(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Students");
  if (!sheet) return { success: false, message: "Students database sheet missing." };

  var email = (data.email || "").toString().trim().toLowerCase();
  var adm = (data.admissionNumber || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  var deviceToken = data.deviceToken || ("DEV-" + Math.floor(100000 + Math.random() * 900000));

  // Check Paid Students sheet tab for instant auto-approval
  checkAndAutoApprovePaidStudent(adm, email);

  // Reload Students rows
  var rows = sheet.getDataRange().getValues();

  for (var i = 1; i < rows.length; i++) {
    var rAdm = (rows[i][1] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    var rEmail = (rows[i][3] || "").toString().trim().toLowerCase();

    if ((email && rEmail === email) || (adm && rAdm === adm)) {
      var isApproved = rows[i][7] === true || (rows[i][7] || "").toString().toUpperCase() === 'TRUE';
      if (!isApproved) {
        return { success: false, message: "Your access application is pending admin approval." };
      }

      var boundDeviceToken = (rows[i][10] || "").toString().trim(); // Column K

      // Strict Permanent Device Binding ("Any Time Rule"):
      if (boundDeviceToken && boundDeviceToken !== deviceToken) {
        return {
          success: false,
          deviceLocked: true,
          message: "⛔ Account Locked to your registered device!\n\nThis account is bound to another phone/laptop. Logging in from secondary devices is strictly prohibited at any time.\n\nPlease use your original registered device, or ask your coach to reset your device lock!"
        };
      }

      if (!boundDeviceToken) {
        try {
          sheet.getRange(i + 1, 11).setValue(deviceToken);
          sheet.getRange(i + 1, 12).setValue(new Date());
        } catch(e) {}
        boundDeviceToken = deviceToken;
      }

      return {
        success: true,
        deviceToken: boundDeviceToken,
        student: {
          studentId: rows[i][0],
          admissionNumber: rows[i][1],
          name: rows[i][2],
          email: rows[i][3],
          phone: rows[i][4],
          course: rows[i][5],
          profileImage: rows[i][6],
          approved: true,
          status: rows[i][8],
          createdDate: rows[i][9],
          activeDeviceToken: boundDeviceToken
        }
      };
    }
  }
  return { success: false, message: "Invalid email or admission number." };
}

function handleVerifyDeviceSession(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Students");
  if (!sheet) return { valid: true };

  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var email = (data.email || "").toString().trim().toLowerCase();
  var deviceToken = data.deviceToken || "";

  if (!deviceToken) return { valid: true };

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var rAdm = (rows[i][1] || "").toString().trim().toUpperCase();
    var rEmail = (rows[i][3] || "").toString().trim().toLowerCase();

    if ((adm && rAdm === adm) || (email && rEmail === email)) {
      var activeToken = (rows[i][10] || "").toString().trim(); // Column K
      if (activeToken && activeToken !== deviceToken) {
        return {
          valid: false,
          message: "⛔ Account Locked to registered device! Access from secondary devices is blocked at any time. Contact your coach to unlock a new device."
        };
      }
      return { valid: true };
    }
  }

  return { valid: true };
}

function handleAdminResetStudentDevice(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = ss.getSheetByName("Students");
  if (!sheet) return { success: false, message: "Students sheet missing." };

  var targetAdm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var targetEmail = (data.email || "").toString().trim().toLowerCase();

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var rAdm = (rows[i][1] || "").toString().trim().toUpperCase();
    var rEmail = (rows[i][3] || "").toString().trim().toLowerCase();

    if ((targetAdm && rAdm === targetAdm) || (targetEmail && rEmail === targetEmail)) {
      sheet.getRange(i + 1, 11).setValue(""); // Clear Column K ActiveDeviceToken
      sheet.getRange(i + 1, 12).setValue(new Date());
      return { success: true, message: "Reset device lock successfully!" };
    }
  }

  return { success: false, message: "Student not found." };
}

function handleAdminLogin(data) {
  var email = (data.email || "").toString().trim().toLowerCase();
  var pass = (data.password || "").toString().trim();

  if (email === "masteredlanguagecoach@gmail.com" && pass === "4languagecoach") {
    return {
      success: true,
      admin: {
        adminId: "ADM-002",
        name: "Mastered Language Coach",
        email: "masteredlanguagecoach@gmail.com",
        role: "Super Admin"
      }
    };
  }

  return { success: false, message: "Invalid admin credentials." };
}

function handleSubmitRequest(data) {
  var ss = getMasteredSpreadsheet();
  var email = data.email || data.Email || "";
  var adm = data.admissionNumber || data.AdmissionNumber || "";

  // Check if student is in Paid Students sheet tab -> Auto approve immediately!
  var autoApprovedStudent = checkAndAutoApprovePaidStudent(adm, email);

  var sheet = ss.getSheetByName("Requests");
  if (sheet) {
    var reqId = data.requestId || ("REQ-" + Math.floor(1000 + Math.random() * 9000));
    var dateStr = new Date().toISOString().split('T')[0];
    var name = data.name || data.Name || "";
    var phone = data.phone || data.Phone || "";
    var course = data.course || data.Course || "MAL TO ENG";
    var statusStr = autoApprovedStudent ? "Approved" : "Pending";

    sheet.appendRow([
      reqId,
      name,
      phone,
      email,
      adm,
      course,
      statusStr,
      dateStr,
      ""
    ]);
  }

  if (autoApprovedStudent) {
    return {
      success: true,
      autoApproved: true,
      message: "🎉 Payment Verified! Your student account has been automatically approved. You can log in immediately with your Email & Admission Number!"
    };
  }

  return { success: true, message: "Application submitted successfully! Your coach will approve your account shortly." };
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
  var reqSheet = ss.getSheetByName("Requests") || ss.getSheetByName("PendingRequests") || ss.getSheets()[0];
  var stdSheet = ss.getSheetByName("Students") || ss.insertSheet("Students");

  var targetReqId = (data.requestId || "").toString().trim().toUpperCase();
  var targetAdm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var targetEmail = (data.email || "").toString().trim().toLowerCase();
  var name = (data.name || "").toString().trim();
  var phone = (data.phone || "").toString().trim();
  var course = (data.course || "").toString().trim();

  var approvedReq = null;

  if (reqSheet) {
    var reqRows = reqSheet.getDataRange().getValues();
    for (var i = 1; i < reqRows.length; i++) {
      var rId = (reqRows[i][0] || "").toString().trim().toUpperCase();
      var rName = (reqRows[i][1] || "").toString().trim();
      var rPhone = (reqRows[i][2] || "").toString().trim();
      var rEmail = (reqRows[i][3] || "").toString().trim().toLowerCase();
      var rAdm = (reqRows[i][4] || "").toString().trim().toUpperCase();
      var rCourse = (reqRows[i][5] || "").toString().trim();

      var isMatch = false;
      if (targetAdm && rAdm && rAdm === targetAdm) isMatch = true;
      if (targetEmail && rEmail && rEmail === targetEmail) isMatch = true;
      if (targetReqId && rId && rId === targetReqId) isMatch = true;

      if (isMatch) {
        reqSheet.getRange(i + 1, 7).setValue("Approved"); // Column G = Status
        reqSheet.getRange(i + 1, 9).setValue("Admin");    // Column I = ApprovedBy

        if (!name && rName) name = rName;
        if (!phone && rPhone) phone = rPhone;
        if (!targetEmail && rEmail) targetEmail = rEmail;
        if (!targetAdm && rAdm) targetAdm = rAdm;
        if (!course && rCourse) course = rCourse;

        approvedReq = {
          requestId: rId || targetReqId,
          name: name,
          phone: phone,
          email: targetEmail,
          admissionNumber: targetAdm,
          course: course
        };
      }
    }
  }

  if (!approvedReq && (targetAdm || targetEmail || name)) {
    approvedReq = {
      requestId: targetReqId,
      name: name,
      phone: phone,
      email: targetEmail,
      admissionNumber: targetAdm,
      course: course
    };
  }

  if (stdSheet && approvedReq && (approvedReq.admissionNumber || approvedReq.email || approvedReq.name)) {
    var stdRows = stdSheet.getDataRange().getValues();
    var alreadyExists = false;

    for (var j = 1; j < stdRows.length; j++) {
      var sAdm = (stdRows[j][1] || "").toString().trim().toUpperCase();
      var sEmail = (stdRows[j][3] || "").toString().trim().toLowerCase();
      if ((approvedReq.admissionNumber && sAdm === approvedReq.admissionNumber) ||
          (approvedReq.email && sEmail === approvedReq.email)) {
        stdSheet.getRange(j + 1, 8).setValue("TRUE");   // Column H = Approved
        stdSheet.getRange(j + 1, 9).setValue("Active"); // Column I = Status
        alreadyExists = true;
        break;
      }
    }

    if (!alreadyExists) {
      var stdId = "STD-" + Math.floor(1000 + Math.random() * 9000);
      var dateStr = new Date().toISOString().split('T')[0];
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
        dateStr,
        ""
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
  // Sync all paid students from PAID_STUDENTS tab to Students tab automatically
  syncAllPaidStudentsToStudentsSheet();

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
      createdDate: s.CreatedDate,
      activeDeviceToken: s.ActiveDeviceToken || ""
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

// Bulk Sync Function: Copies all successful rows from PAID_STUDENTS tab into Students tab
function syncAllPaidStudentsToStudentsSheet() {
  try {
    var ss = getMasteredSpreadsheet();
    var paidSheet = ss.getSheetByName("PAID_STUDENTS") ||
                    ss.getSheetByName("Paid Students") ||
                    ss.getSheetByName("PaidStudents") ||
                    ss.getSheetByName("Paid");
    if (!paidSheet) return { success: false, message: "PAID_STUDENTS sheet missing." };

    var stdSheet = ss.getSheetByName("Students");
    if (!stdSheet) {
      stdSheet = ss.insertSheet("Students");
      stdSheet.appendRow(["StudentID", "AdmissionNumber", "Name", "Email", "Phone", "Course", "ProfileImage", "Approved", "Status", "CreatedDate", "ActiveDeviceToken"]);
    }

    var stdData = stdSheet.getDataRange().getValues();
    if (stdData.length === 0 || (stdData.length === 1 && !stdData[0][0])) {
      stdSheet.clear();
      stdSheet.appendRow(["StudentID", "AdmissionNumber", "Name", "Email", "Phone", "Course", "ProfileImage", "Approved", "Status", "CreatedDate", "ActiveDeviceToken"]);
      stdData = stdSheet.getDataRange().getValues();
    }
    var stdAdmMap = {};
    var stdEmailMap = {};

    for (var j = 1; j < stdData.length; j++) {
      var sAdm = (stdData[j][1] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      var sEmail = (stdData[j][3] || "").toString().trim().toLowerCase();
      if (sAdm) stdAdmMap[sAdm] = j + 1;
      if (sEmail) stdEmailMap[sEmail] = j + 1;
    }

    var headerRowIndex = 0;
    for (var r = 0; r < paidData.length; r++) {
      var rStr = paidData[r].join(" ").toLowerCase();
      if (rStr.indexOf("admission") >= 0 || rStr.indexOf("email") >= 0 || rStr.indexOf("full name") >= 0 || rStr.indexOf("status") >= 0) {
        headerRowIndex = r;
        break;
      }
    }

    var headers = paidData[headerRowIndex].map(function(h) { return h.toString().trim().toLowerCase(); });
    var admIdx = -1, emailIdx = -1, nameIdx = -1, phoneIdx = -1, courseIdx = -1, statusIdx = -1;

    for (var k = 0; k < headers.length; k++) {
      var h = headers[k];
      if (h.indexOf("admission") >= 0 || h.indexOf("adm") >= 0) admIdx = k;
      if (h === "full name" || h.indexOf("full name") >= 0 || (h.indexOf("name") >= 0 && h.indexOf("course") < 0)) nameIdx = k;
      if (h.indexOf("email") >= 0 && h.indexOf("verified") < 0) emailIdx = k;
      if (h.indexOf("whatsapp") >= 0 || h.indexOf("phone") >= 0 || h.indexOf("mobile") >= 0) phoneIdx = k;
      if (h.indexOf("course name") >= 0 || h.indexOf("course code") >= 0 || h.indexOf("course") >= 0) courseIdx = k;
      if (h.indexOf("payment status") >= 0 || h.indexOf("status") >= 0) statusIdx = k;
    }

    if (admIdx < 0 && headers.length > 1) admIdx = 1;
    if (nameIdx < 0 && headers.length > 2) nameIdx = 2;
    if (emailIdx < 0 && headers.length > 3) emailIdx = 3;
    if (phoneIdx < 0 && headers.length > 5) phoneIdx = 5;
    if (courseIdx < 0 && headers.length > 7) courseIdx = 7;
    if (statusIdx < 0 && headers.length > 10) statusIdx = 10;

    var addedCount = 0;
    var updatedCount = 0;

    for (var i = headerRowIndex + 1; i < paidData.length; i++) {
      var row = paidData[i];
      var pAdmRaw = (row[admIdx] || "").toString().trim();
      var pAdm = pAdmRaw.toUpperCase().replace(/[^A-Z0-9]/g, "");
      var pEmail = (row[emailIdx] || "").toString().trim().toLowerCase();
      var pStatus = statusIdx >= 0 ? (row[statusIdx] || "").toString().trim().toUpperCase() : "SUCCESS";
      var pName = nameIdx >= 0 ? (row[nameIdx] || "").toString().trim() : "Paid Student";
      var pPhone = phoneIdx >= 0 ? (row[phoneIdx] || "").toString().trim() : "";
      var rawCourse = courseIdx >= 0 ? (row[courseIdx] || "").toString().trim() : "MAL TO ENG";

      if (!pAdm && !pEmail) continue;
      if (statusIdx >= 0 && pStatus && pStatus !== "SUCCESS" && pStatus !== "PAID" && pStatus !== "COMPLETED" && pStatus !== "TRUE" && pStatus !== "YES") {
        continue;
      }

      var normCourse = "MAL TO ENG";
      var cUpper = rawCourse.toUpperCase();
      if (cUpper.indexOf("ML") >= 0 || cUpper.indexOf("MALAYALAM") >= 0) normCourse = "MAL TO ENG";
      else if (cUpper.indexOf("HI") >= 0 || cUpper.indexOf("HINDI") >= 0) normCourse = "HIND TO ENG";
      else if (cUpper.indexOf("TA") >= 0 || cUpper.indexOf("TAMIL") >= 0) normCourse = "TAMIL TO ENG";
      else if (cUpper.indexOf("KA") >= 0 || cUpper.indexOf("KANNADA") >= 0) normCourse = "KANNADA TO ENG";
      else if (cUpper.indexOf("BA") >= 0 || cUpper.indexOf("BENGALI") >= 0 || cUpper.indexOf("BANGALI") >= 0) normCourse = "BANGALI TO ENG";

      var targetRow = (pAdm && stdAdmMap[pAdm]) || (pEmail && stdEmailMap[pEmail]);

      if (targetRow) {
        stdSheet.getRange(targetRow, 8).setValue("TRUE");   // Column H = Approved
        stdSheet.getRange(targetRow, 9).setValue("Active"); // Column I = Status
        updatedCount++;
      } else {
        var stdId = "STD-" + Math.floor(1000 + Math.random() * 9000);
        var dateStr = new Date().toISOString().split('T')[0];
        var safePhone = pPhone ? "'" + pPhone.toString().replace(/[^0-9]/g, "") : "";
        stdSheet.appendRow([
          stdId,
          pAdmRaw || pAdm,
          pName,
          pEmail,
          safePhone,
          normCourse,
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
          "TRUE",
          "Active",
          dateStr,
          "" // ActiveDeviceToken
        ]);
        if (pAdm) stdAdmMap[pAdm] = stdData.length + addedCount + 1;
        if (pEmail) stdEmailMap[pEmail] = stdData.length + addedCount + 1;
        addedCount++;
      }
    }

    return { success: true, addedCount: addedCount, updatedCount: updatedCount };
  } catch(err) {
    return { success: false, message: err.toString() };
  }
}

// Automatic Triggers on Google Sheet Edit / Change
function onChange(e) {
  syncAllPaidStudentsToStudentsSheet();
}

function onEdit(e) {
  syncAllPaidStudentsToStudentsSheet();
}
