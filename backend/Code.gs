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

    case 'debugSheets':
      var debugSs = getMasteredSpreadsheet();
      var debugList = debugSs ? debugSs.getSheets().map(function(s) { return { name: s.getName(), lastRow: s.getLastRow() }; }) : [];
      return { success: true, spreadsheetId: debugSs ? debugSs.getId() : null, sheets: debugList };

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
    case 'forceApproveAll':
      return forceApproveAllPaidRequests();

    case 'getModules':
      return handleGetModules();

    case 'adminSaveModule':
      return handleAdminSaveModule(data);

    case 'saveStudentProgress':
      return handleSaveStudentProgress(data);

    case 'submitQuizScore':
      return handleSubmitQuizScore(data);

    case 'getStudentProgress':
      return handleGetStudentProgress(data);

    case 'getAllStudentProgress':
    case 'adminGetAllStudentProgress':
      return handleAdminGetAllStudentProgress();

    case 'verifyMclCode':
      return handleVerifyMclCode(data);

    case 'updateProgress':
      return handleUpdateProgress(data);

    case 'approveRequest':
      return handleApproveRequest(data);

    case 'cleanAllFakeProgress':
    case 'adminCleanAllFakeProgress':
    case 'repairFakeProgress':
      return handleAdminCleanAllFakeProgress();

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

function getFlexibleSheet(ss, sheetName) {
  if (!ss) return null;
  var sheet = ss.getSheetByName(sheetName);
  if (sheet) return sheet;

  var targetClean = sheetName.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  var allSheets = ss.getSheets();
  for (var s = 0; s < allSheets.length; s++) {
    var sNameClean = allSheets[s].getName().toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (sNameClean === targetClean) {
      return allSheets[s];
    }
  }
  return null;
}

function getSheetData(sheetName) {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (!data || data.length === 0) return [];

  var headerIdx = 0;
  for (var r = 0; r < Math.min(data.length, 10); r++) {
    var rowStr = "";
    try {
      rowStr = data[r].map(function(c) { return (c || "").toString(); }).join(" ").trim();
    } catch(eStr) {}
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
    var emptyRow = true;
    for (var j = 0; j < headers.length; j++) {
      if (headers[j]) {
        var val = row[j];
        if (val !== "" && val !== null && val !== undefined) emptyRow = false;
        obj[headers[j]] = val;
      }
    }
    if (!emptyRow) rows.push(obj);
  }
  return rows;
}

// Mastered Code Language - Version 1 (MCL-1) Codebooks
var MCL_ADM_MAP = {"A":"XK","B":"QF","C":"NV","D":"HT","E":"RM","F":"ZC","G":"PJ","H":"WD","I":"KY","J":"FV","K":"BG","L":"TR","M":"LX","N":"SQ","O":"CP","P":"JN","Q":"VM","R":"DK","S":"YR","T":"GH","U":"MW","V":"KB","W":"RX","X":"TZ","Y":"PF","Z":"HC","0":"VQ","1":"XT","2":"NR","3":"KD","4":"ZM","5":"FW","6":"PB","7":"CJ","8":"HS","9":"YN"};
var MCL_REV_ADM = {};
Object.keys(MCL_ADM_MAP).forEach(function(k) { MCL_REV_ADM[MCL_ADM_MAP[k]] = k; });

var MCL_MIS_MAP = {"0":"AQ","1":"BR","2":"CT","3":"DV","4":"EX","5":"FZ","6":"GK","7":"HM","8":"JP","9":"LS"};
var MCL_REV_MIS = {};
Object.keys(MCL_MIS_MAP).forEach(function(k) { MCL_REV_MIS[MCL_MIS_MAP[k]] = k; });

var MCL_PROG_MAP = {"0":"UC","1":"VE","2":"WG","3":"XJ","4":"YL","5":"ZN","6":"AP","7":"BS","8":"DU","9":"EW"};
var MCL_REV_PROG = {};
Object.keys(MCL_PROG_MAP).forEach(function(k) { MCL_REV_PROG[MCL_PROG_MAP[k]] = k; });

var MCL_LEN_MAP = {3:"QA", 4:"RB", 5:"SC", 6:"TD", 7:"UE", 8:"VF", 9:"WG", 10:"XH", 11:"YJ", 12:"ZK"};
var MCL_REV_LEN = {};
Object.keys(MCL_LEN_MAP).forEach(function(k) { MCL_REV_LEN[MCL_LEN_MAP[k]] = Number(k); });

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

function findColumnIndex(headers, keywords) {
  if (!headers || !Array.isArray(headers)) return -1;
  for (var i = 0; i < headers.length; i++) {
    var h = (headers[i] || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    for (var j = 0; j < keywords.length; j++) {
      var kw = keywords[j].toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (h === kw || h.indexOf(kw) >= 0) return i;
    }
  }
  return -1;
}

function ensureStudentProgressHeaders(sheet) {
  if (!sheet) return;
  var data = sheet.getDataRange().getValues();
  if (data.length === 0) {
    sheet.appendRow(["AdmissionNumber", "Email", "LatestMclCode", "LatestMissionLevel", "LatestCodeProgress", "ProgressJSON", "LastUpdated"]);
    return;
  }
  
  var headers = data[0].map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
  var hasLatestCode = headers.some(function(h) { return h.indexOf("mcl") >= 0 || h.indexOf("code") >= 0; });
  
  if (!hasLatestCode && sheet.getLastColumn() <= 4) {
    sheet.insertColumnsAfter(2, 3);
    sheet.getRange(1, 3, 1, 3).setValues([["LatestMclCode", "LatestMissionLevel", "LatestCodeProgress"]]);
  }
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

  if (!userAdm) {
    userAdm = (decoded.admissionNumber || "").toString().trim().toUpperCase();
  }

  // Student Matching Rule (flexible clean alphanumeric match)
  var cleanDecodedAdm = (decoded.admissionNumber || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  var cleanUserAdm = userAdm.replace(/[^A-Z0-9]/g, "");
  if (cleanUserAdm && cleanDecodedAdm && cleanUserAdm !== cleanDecodedAdm && cleanUserAdm.indexOf(cleanDecodedAdm) < 0 && cleanDecodedAdm.indexOf(cleanUserAdm) < 0) {
    return { success: false, message: "THIS CODE DOES NOT BELONG TO YOUR ACCOUNT" };
  }

  // Load existing progress from database
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "StudentProgress");
  if (!sheet) {
    sheet = ss.insertSheet("StudentProgress");
    sheet.appendRow(["AdmissionNumber", "Email", "LatestMclCode", "LatestMissionLevel", "LatestCodeProgress", "ProgressJSON", "LastUpdated"]);
  }

  ensureStudentProgressHeaders(sheet);

  var rows = sheet.getDataRange().getValues();
  var headers = rows[0].map(function(h) { return (h || "").toString().trim().toLowerCase(); });
  var admCol = headers.indexOf("admissionnumber") >= 0 ? headers.indexOf("admissionnumber") : 0;
  var emailCol = headers.indexOf("email") >= 0 ? headers.indexOf("email") : 1;
  var codeCol = headers.indexOf("latestmclcode") >= 0 ? headers.indexOf("latestmclcode") : 2;
  var jsonCol = headers.indexOf("progressjson") >= 0 ? headers.indexOf("progressjson") : 5;
  var rowIndex = -1;
  var userProgObj = {};

  for (var i = 1; i < rows.length; i++) {
    var rowAdm = (rows[i][admCol] || "").toString().trim().toUpperCase();
    var rowEmail = (rows[i][emailCol] || "").toString().trim().toLowerCase();
    var rowAdmClean = rowAdm.replace(/[^A-Z0-9]/g, "");

    var isAdmMatch = cleanUserAdm && rowAdmClean && (cleanUserAdm === rowAdmClean);
    var isDecodedMatch = cleanDecodedAdm && rowAdmClean && (cleanDecodedAdm === rowAdmClean);
    var isEmailMatch = userEmail && rowEmail && (userEmail === rowEmail);

    if (isAdmMatch || isDecodedMatch || isEmailMatch) {
      rowIndex = i + 1;
      var rawJson = jsonCol >= 0 ? (rows[i][jsonCol] || "").toString().trim() : "";
      var rawCol2 = codeCol >= 0 ? (rows[i][codeCol] || "").toString().trim() : "";
      if (rawJson && rawJson.indexOf("{") >= 0) {
        try { userProgObj = JSON.parse(rawJson); } catch(e) {}
      } else if (rawCol2 && rawCol2.indexOf("{") >= 0) {
        try { userProgObj = JSON.parse(rawCol2); } catch(e) {}
      }
      break;
    }
  }

  var kPad = decoded.mission < 10 ? "0" + decoded.mission : "" + decoded.mission;
  var modKey = "MOD-" + kPad;
  var modKeyShort = "MOD-" + decoded.mission;
  var hindKey = "HIND-MOD-" + kPad;
  var hindKeyShort = "HIND-MOD-" + decoded.mission;
  var currentModObj = userProgObj[modKey] || userProgObj[modKeyShort] || userProgObj[hindKey] || userProgObj[hindKeyShort] || {};
  var currentPct = Number(currentModObj.percentage) || 0;

  // Check 15: Never Reduce Progress Rule
  if (decoded.progress <= currentPct) {
    return { success: false, message: "NO NEW PROGRESS (Current progress: " + currentPct + "%)" };
  }

  // Detect course boundary (30 for Hindi, 32 for Malayalam)
  var maxCourseModules = 32;
  for (var k in userProgObj) {
    if (k && k.indexOf("HIND-MOD-") === 0) {
      maxCourseModules = 30;
      break;
    }
  }

  // Update Progress
  currentModObj.percentage = decoded.progress;
  currentModObj.lastUpdated = new Date().toISOString();
  currentModObj.aiMissionCompleted = (decoded.progress >= 100);
  if (decoded.progress >= 100) {
    currentModObj.status = "COMPLETED";
    // Unlock next mission if within course bounds
    var nextModNum = decoded.mission + 1;
    if (nextModNum <= maxCourseModules) {
      var nextModPad = nextModNum < 10 ? "0" + nextModNum : "" + nextModNum;
      var nextModKey = "MOD-" + nextModPad;
      if (!userProgObj[nextModKey]) userProgObj[nextModKey] = {};
      userProgObj[nextModKey].unlocked = true;
    }
  } else {
    currentModObj.status = "IN_PROGRESS";
  }

  // Strict: NEVER synthesize fake 100% for prior missions. Each mission must be earned!

  if (!currentModObj.history) currentModObj.history = [];
  currentModObj.history.push({
    mission: decoded.mission,
    progress: decoded.progress,
    timestamp: new Date().toISOString()
  });

  userProgObj[modKey] = currentModObj;
  userProgObj[modKeyShort] = currentModObj;
  userProgObj[hindKey] = currentModObj;
  userProgObj[hindKeyShort] = currentModObj;
  userProgObj.latestMissionLevel = decoded.mission;
  userProgObj.latestProgress = decoded.progress;

  var updatedProgressStr = JSON.stringify(userProgObj);
  var now = new Date();
  var targetAdm = userAdm || decoded.admissionNumber;

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, 7).setValues([[targetAdm, userEmail, rawCode, decoded.mission, decoded.progress, updatedProgressStr, now]]);
  } else {
    sheet.appendRow([targetAdm, userEmail, rawCode, decoded.mission, decoded.progress, updatedProgressStr, now]);
  }

  return {
    success: true,
    message: "🎉 Progress Verified! Level " + decoded.mission + " updated to " + decoded.progress + "%!",
    latestCode: rawCode,
    latestLevel: decoded.mission,
    latestProgress: decoded.progress,
    userProgress: userProgObj,
    decoded: decoded
  };
}

// Auto-Approve Paid Students from "PAID_STUDENTS" Sheet Tab
function checkAndAutoApprovePaidStudent(targetAdm, targetEmail) {
  try {
    var ss = getMasteredSpreadsheet();
    var paidSheet = getFlexibleSheet(ss, "PAID_STUDENTS");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid Students");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid");
    if (!paidSheet) {
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
    for (var r = 0; r < Math.min(paidData.length, 10); r++) {
      var rStr = "";
      try {
        rStr = paidData[r].map(function(c) { return (c || "").toString(); }).join(" ").toLowerCase();
      } catch(eStr) {}
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
    var rawDigits = (targetAdm || targetEmail || "").toString().replace(/[^0-9]/g, "");
    var targetPhone10 = rawDigits.length >= 10 ? rawDigits.slice(-10) : "";

    var foundPaid = null;
    for (var i = headerRowIndex + 1; i < paidData.length; i++) {
      var row = paidData[i];
      var pAdm = admIdx >= 0 ? (row[admIdx] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
      var pEmail = emailIdx >= 0 ? (row[emailIdx] || "").toString().trim().toLowerCase() : "";
      var pPhoneRaw = phoneIdx >= 0 ? (row[phoneIdx] || "").toString().replace(/[^0-9]/g, "") : "";
      var pPhone10 = pPhoneRaw.length >= 10 ? pPhoneRaw.slice(-10) : "";

      var isExactAdm = cleanAdm && pAdm && (cleanAdm === pAdm);
      var isExactEmail = cleanEmail && pEmail && (cleanEmail === pEmail);
      var isExactPhone = targetPhone10 && pPhone10 && (targetPhone10 === pPhone10);

      // SECURITY FIX: NEVER use loose digit matching (e.g. admDigits === pAdmDigits)
      // which previously collided unrelated students sharing digits (e.g. "01" or "25").
      // When both email and admission # are provided, they must match the same record.
      var isMatch = false;
      if (cleanAdm && cleanEmail) {
        if (isExactAdm && isExactEmail) isMatch = true;
        else if (isExactAdm && !pEmail) isMatch = true;
        else if (isExactEmail && !pAdm) isMatch = true;
      } else if (cleanAdm) {
        isMatch = isExactAdm || isExactPhone;
      } else if (cleanEmail) {
        isMatch = isExactEmail;
      }

      if (isMatch) {
        var rawCourse = courseIdx >= 0 ? (row[courseIdx] || "").toString().trim() : "MAL TO ENG";
        var normCourse = "MAL TO ENG";
        var cUpper = rawCourse.toUpperCase();
        if (cUpper.indexOf("HI") >= 0 || cUpper.indexOf("HINDI") >= 0) normCourse = "HIND TO ENG";
        else if (cUpper.indexOf("TA") >= 0 || cUpper.indexOf("TAMIL") >= 0) normCourse = "TAMIL TO ENG";
        else if (cUpper.indexOf("KA") >= 0 || cUpper.indexOf("KANNADA") >= 0) normCourse = "KANNADA TO ENG";
        else if (cUpper.indexOf("BA") >= 0 || cUpper.indexOf("BENGALI") >= 0 || cUpper.indexOf("BANGALI") >= 0) normCourse = "BANGALI TO ENG";
        else normCourse = "MAL TO ENG";

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
    var stdSheet = getFlexibleSheet(ss, "Students");
    if (!stdSheet) stdSheet = ss.insertSheet("Students");

    var stdRows = stdSheet.getDataRange().getValues();
    var existingRowIndex = -1;

    var sHeaders = (stdRows[0] || []).map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
    var sAdmCol = findColumnIndex(sHeaders, ["admissionnumber", "admission", "adm"]);
    var sEmailCol = findColumnIndex(sHeaders, ["email"]);
    var sAppCol = findColumnIndex(sHeaders, ["approved"]);
    var sStatCol = findColumnIndex(sHeaders, ["status"]);
    if (sAdmCol < 0) sAdmCol = 1;
    if (sEmailCol < 0) sEmailCol = 3;
    if (sAppCol < 0) sAppCol = 7;
    if (sStatCol < 0) sStatCol = 8;

    for (var j = 1; j < stdRows.length; j++) {
      var sAdm = (stdRows[j][sAdmCol] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      var sEmail = (stdRows[j][sEmailCol] || "").toString().trim().toLowerCase();
      if ((foundPaid.admissionNumber && sAdm === foundPaid.admissionNumber) ||
          (foundPaid.email && sEmail === foundPaid.email)) {
        existingRowIndex = j + 1;
        stdSheet.getRange(j + 1, sAppCol + 1).setValue("TRUE");   // Approved
        stdSheet.getRange(j + 1, sStatCol + 1).setValue("Active"); // Status
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

    // Also update any existing pending rows in Requests sheet tab to Approved
    var reqSheet = getFlexibleSheet(ss, "Requests");
    if (reqSheet) {
      var reqRows = reqSheet.getDataRange().getValues();
      for (var r = 1; r < reqRows.length; r++) {
        var rEmail = (reqRows[r][3] || "").toString().trim().toLowerCase();
        var rAdm = (reqRows[r][4] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        if ((foundPaid.admissionNumber && rAdm === foundPaid.admissionNumber) ||
            (foundPaid.email && rEmail === foundPaid.email)) {
          reqSheet.getRange(r + 1, 7).setValue("Approved"); // Column G = Status
        }
      }
    }

    return foundPaid;
  } catch(err) {
    return null;
  }
}

function handleLoginStudent(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "Students");
  if (!sheet) return { success: false, message: "Students database sheet missing." };

  var email = (data.email || "").toString().trim().toLowerCase();
  var adm = (data.admissionNumber || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  var deviceToken = data.deviceToken || ("DEV-" + Math.floor(100000 + Math.random() * 900000));

  var rawTargetDigits = (data.admissionNumber || data.email || "").toString().replace(/[^0-9]/g, "");
  var targetPhone10 = rawTargetDigits.length >= 10 ? rawTargetDigits.slice(-10) : "";

  var rows = sheet.getDataRange().getValues();
  if (!rows || rows.length <= 1) return { success: false, message: "No registered students found." };

  // DYNAMIC HEADER LOOKUP — NEVER HARDCODE COLUMN INDICES!
  var headers = (rows[0] || []).map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
  var idCol = findColumnIndex(headers, ["studentid", "id"]);
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var nameCol = findColumnIndex(headers, ["name", "fullname"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  var phoneCol = findColumnIndex(headers, ["phone", "whatsappnumber", "whatsapp", "mobile"]);
  var courseCol = findColumnIndex(headers, ["course", "coursename", "coursecode"]);
  var imgCol = findColumnIndex(headers, ["profileimage", "image"]);
  var appCol = findColumnIndex(headers, ["approved"]);
  var statusCol = findColumnIndex(headers, ["status"]);
  var dateCol = findColumnIndex(headers, ["createddate", "date", "timestamp"]);
  var tokenCol = findColumnIndex(headers, ["activedevicetoken", "devicetoken"]);

  if (admCol < 0) admCol = 1;
  if (nameCol < 0) nameCol = 2;
  if (emailCol < 0) emailCol = 3;
  if (phoneCol < 0) phoneCol = 4;
  if (courseCol < 0) courseCol = 5;
  if (imgCol < 0) imgCol = 6;
  if (appCol < 0) appCol = 7;
  if (statusCol < 0) statusCol = 8;
  if (dateCol < 0) dateCol = 9;

  for (var i = 1; i < rows.length; i++) {
    var rRow = rows[i];
    var rAdm = admCol >= 0 ? (rRow[admCol] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
    var rEmail = emailCol >= 0 ? (rRow[emailCol] || "").toString().trim().toLowerCase() : "";
    var rPhoneRaw = phoneCol >= 0 ? (rRow[phoneCol] || "").toString().replace(/[^0-9]/g, "") : "";
    var rPhone10 = rPhoneRaw.length >= 10 ? rPhoneRaw.slice(-10) : "";

    var matchAdm = adm && rAdm && (adm === rAdm);
    var matchEmail = email && rEmail && (email === rEmail);
    var matchPhone = targetPhone10 && rPhone10 && (targetPhone10 === rPhone10);

    // SECURITY: If student provided BOTH email and admission #, both must match the SAME student record!
    // Never allow Student A's email + Student B's admission # to log into Student B's account!
    var isMatch = false;
    if (email && adm) {
      if (matchEmail && matchAdm) isMatch = true;
      else if (matchEmail && !rAdm) isMatch = true;
      else if (matchAdm && !rEmail) isMatch = true;
    } else if (email) {
      isMatch = matchEmail;
    } else if (adm) {
      isMatch = matchAdm || matchPhone;
    }

    if (isMatch) {
      var sAppRaw = appCol >= 0 ? rRow[appCol] : true;
      var isApproved = sAppRaw === true || (sAppRaw || "").toString().toUpperCase() === 'TRUE';
      if (!isApproved) {
        return { success: false, message: "Your access application is pending admin approval." };
      }

      var rawPhone = phoneCol >= 0 ? (rRow[phoneCol] || "").toString().trim() : "";
      var cleanPhone = (rawPhone.indexOf("#") >= 0 || rawPhone.toUpperCase().indexOf("ERROR") >= 0 || rawPhone.toUpperCase().indexOf("REF") >= 0) ? "" : rawPhone;

      return {
        success: true,
        deviceToken: deviceToken,
        student: {
          studentId: idCol >= 0 ? rRow[idCol] : ("STD-" + i),
          admissionNumber: (admCol >= 0 && rRow[admCol]) ? rRow[admCol] : (rAdm || adm),
          name: (nameCol >= 0 && rRow[nameCol]) ? rRow[nameCol] : "Student",
          email: (emailCol >= 0 && rRow[emailCol]) ? rRow[emailCol] : (rEmail || email),
          phone: cleanPhone,
          course: (courseCol >= 0 && rRow[courseCol]) ? rRow[courseCol] : "MAL TO ENG",
          profileImage: (imgCol >= 0 && rRow[imgCol]) ? rRow[imgCol] : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
          approved: true,
          status: (statusCol >= 0 && rRow[statusCol]) ? rRow[statusCol] : "Active",
          createdDate: (dateCol >= 0 && rRow[dateCol]) ? rRow[dateCol] : new Date().toISOString().split('T')[0],
          activeDeviceToken: deviceToken
        }
      };
    }
  }

  // Auto-approve paid student fallback check on login attempt (strict exact matching)
  var paidStudent = checkAndAutoApprovePaidStudent(adm, email);
  if (paidStudent) {
    var rawPaidPhone = (paidStudent.phone || "").toString().trim();
    var cleanPaidPhone = (rawPaidPhone.indexOf("#") >= 0 || rawPaidPhone.toUpperCase().indexOf("ERROR") >= 0 || rawPaidPhone.toUpperCase().indexOf("REF") >= 0) ? "" : rawPaidPhone;

    return {
      success: true,
      deviceToken: deviceToken,
      student: {
        studentId: "STD-" + Math.floor(1000 + Math.random() * 9000),
        admissionNumber: paidStudent.admissionNumber,
        name: paidStudent.name,
        email: paidStudent.email,
        phone: cleanPaidPhone,
        course: paidStudent.course,
        profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        approved: true,
        status: "Active",
        createdDate: new Date().toISOString().split('T')[0],
        activeDeviceToken: deviceToken
      }
    };
  }

  return { success: false, message: "Invalid email or admission number. Please check your credentials or request access below." };
}

function handleLoginAdmin(data) {
  var email = (data.email || "").toString().trim().toLowerCase();
  var pass = (data.password || "").toString().trim();
  if ((email === "masteredlanguagecoach@gmail.com" || email === "admin@mastered.com") && (pass === "4languagecoach" || pass === "MLC@2026")) {
    return {
      success: true,
      admin: {
        adminId: "ADM-002",
        name: "Mastered Language Coach",
        email: email,
        role: "Super Admin"
      }
    };
  }
  return { success: false, message: "Invalid admin email or password." };
}

function handleVerifyDeviceSession(data) {
  return { valid: true };
}

function handleAdminResetStudentDevice(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "Students");
  if (!sheet) return { success: false, message: "Students sheet missing." };

  var targetAdm = (data.admissionNumber || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  var targetEmail = (data.email || "").toString().trim().toLowerCase();

  var rows = sheet.getDataRange().getValues();
  if (!rows || rows.length <= 1) return { success: false, message: "Student not found." };

  var headers = (rows[0] || []).map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  var tokenCol = findColumnIndex(headers, ["activedevicetoken", "devicetoken"]);

  if (admCol < 0) admCol = 1;
  if (emailCol < 0) emailCol = 3;
  if (tokenCol < 0) tokenCol = 10;

  for (var i = 1; i < rows.length; i++) {
    var rAdm = admCol >= 0 ? (rows[i][admCol] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
    var rEmail = emailCol >= 0 ? (rows[i][emailCol] || "").toString().trim().toLowerCase() : "";

    if ((targetAdm && rAdm === targetAdm) || (targetEmail && rEmail === targetEmail)) {
      sheet.getRange(i + 1, tokenCol + 1).setValue(""); // Clear ActiveDeviceToken
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
  var sheet = getFlexibleSheet(ss, "Requests");
  if (!sheet) {
    sheet = ss.insertSheet("Requests");
    sheet.appendRow(["RequestID", "Name", "Phone", "Email", "AdmissionNumber", "Course", "Status", "CreatedDate", "ApprovedBy"]);
  }

  var email = data.email || data.Email || "";
  var adm = data.admissionNumber || data.AdmissionNumber || "";
  var name = data.name || data.Name || "";
  var phone = data.phone || data.Phone || "";
  var course = data.course || data.Course || "MAL TO ENG";
  var reqId = data.requestId || ("REQ-" + Math.floor(1000 + Math.random() * 9000));
  var dateStr = new Date().toISOString().split('T')[0];

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

  return {
    success: true,
    message: "Your request submitted and will approve within one hour"
  };
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
  var sheet = getFlexibleSheet(ss, "Modules");
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
  var reqSheet = getFlexibleSheet(ss, "Requests") || ss.getSheets()[0];
  var stdSheet = getFlexibleSheet(ss, "Students") || ss.insertSheet("Students");

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
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (e) {
    return { success: false, message: "Could not obtain script lock: " + e.message };
  }

  try {
    return handleSaveStudentProgressCore(data);
  } finally {
    try {
      lock.releaseLock();
    } catch(e) {}
  }
}

function handleSaveStudentProgressCore(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "StudentProgress");
  if (!sheet) {
    sheet = ss.insertSheet("StudentProgress");
    sheet.appendRow(["AdmissionNumber", "Email", "LatestMclCode", "LatestMissionLevel", "LatestCodeProgress", "ProgressJSON", "LastUpdated"]);
  }

  ensureStudentProgressHeaders(sheet);

  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var email = (data.email || "").toString().trim().toLowerCase();
  var admClean = adm.replace(/[^A-Z0-9]/g, "");
  var incomingObj = data.userProgress || {};
  var now = new Date();

  // Feature F19: Activate single-module progress updates if userProgress map omitted
  if ((!data.userProgress || Object.keys(data.userProgress).length === 0) && (data.moduleNumber || data.module || data.modNum)) {
    var rawMNum = parseInt(data.moduleNumber || data.module || data.modNum, 10);
    if (!isNaN(rawMNum) && rawMNum >= 1 && rawMNum <= 32) {
      var kP = rawMNum < 10 ? "0" + rawMNum : "" + rawMNum;
      var isCompleted = (Number(data.percentage) >= 100) || (data.status === 'COMPLETED');
      var singleMod = {
        percentage: Number(data.percentage) || 0,
        verifiedSentences: (data.verifiedSentences !== undefined && data.verifiedSentences !== null) ? Number(data.verifiedSentences) : 0,
        status: isCompleted ? 'COMPLETED' : (data.status || 'IN_PROGRESS'),
        aiMissionCompleted: isCompleted,
        lastUpdated: (data.timestamp || now.toISOString())
      };
      incomingObj = {
        ["MOD-" + kP]: singleMod,
        ["MOD-" + rawMNum]: singleMod,
        latestMissionLevel: rawMNum,
        latestProgress: Number(data.percentage) || 0
      };
    }
  }

  var rows = sheet.getDataRange().getValues();
  var headers = rows[0] || [];
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  var jsonCol = findColumnIndex(headers, ["progressjson", "json"]);
  var dateCol = findColumnIndex(headers, ["lastupdated", "updated", "date"]);
  var levelCol = findColumnIndex(headers, ["latestmissionlevel", "missionlevel", "level"]);
  var progCol = findColumnIndex(headers, ["latestcodeprogress", "codeprogress", "progress"]);
  var codeCol = findColumnIndex(headers, ["latestmclcode", "mclcode", "code"]);

  if (admCol < 0) admCol = 0;
  if (emailCol < 0) emailCol = 1;
  if (jsonCol < 0) jsonCol = (headers.length >= 6 ? 5 : 2);
  if (dateCol < 0) dateCol = (headers.length >= 7 ? 6 : 3);

  var foundRow = -1;
  var existingObj = {};
  var rowExistingLvl = 0;
  var rowExistingProg = 0;

  for (var i = 1; i < rows.length; i++) {
    var rowAdm = (rows[i][admCol] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    var rowEmail = (rows[i][emailCol] || "").toString().trim().toLowerCase();
    if ((admClean && rowAdm === admClean) || (email && rowEmail === email)) {
      foundRow = i + 1;
      if (levelCol >= 0 && !isNaN(rows[i][levelCol])) {
        var pLvl = parseInt(rows[i][levelCol], 10);
        if (pLvl >= 1 && pLvl <= 32) rowExistingLvl = pLvl;
      }
      if (progCol >= 0 && !isNaN(rows[i][progCol])) {
        rowExistingProg = Math.min(Math.max(parseInt(rows[i][progCol], 10) || 0, 0), 100);
      }
      var rawJson = (rows[i][jsonCol] || "").toString().trim();
      if (rawJson && rawJson.indexOf("{") >= 0) {
        try { existingObj = JSON.parse(rawJson); } catch(e) {}
      }
      break;
    }
  }

  // Sanitize incoming and existing progress to prevent persisting fake cascade completions
  incomingObj = sanitizeStudentProgressMap(incomingObj);
  existingObj = sanitizeStudentProgressMap(existingObj);

  // Monotonic deep merge: Always preserve the highest scores and achievements
  for (var mKey in incomingObj) {
    if (!existingObj[mKey]) {
      existingObj[mKey] = incomingObj[mKey];
    } else {
      var exVal = existingObj[mKey];
      var inVal = incomingObj[mKey];
      if (typeof exVal === 'object' && typeof inVal === 'object') {
        var mergedMod = Object.assign({}, exVal, inVal);
        mergedMod.percentage = Math.max(Number(exVal.percentage) || 0, Number(inVal.percentage) || 0);
        mergedMod.verifiedSentences = Math.max(Number(exVal.verifiedSentences) || 0, Number(inVal.verifiedSentences) || 0);
        // Strict integrity: aiMissionCompleted is ONLY true if percentage is >= 100
        mergedMod.aiMissionCompleted = (Number(mergedMod.percentage) >= 100);
        mergedMod.aiMissionProof = inVal.aiMissionProof || exVal.aiMissionProof || null;
        if (mergedMod.percentage >= 100) {
          mergedMod.status = "COMPLETED";
        }

        var mergedQuizzes = Object.assign({}, exVal.quizScores || {});
        var inQuizzes = inVal.quizScores || {};
        for (var qNum in inQuizzes) {
          var exQ = mergedQuizzes[qNum] || {};
          var inQ = inQuizzes[qNum] || {};
          var maxPct = Math.max(Number(exQ.percentage) || 0, Number(inQ.percentage) || 0);
          mergedQuizzes[qNum] = (maxPct === (Number(inQ.percentage) || 0)) ? inQ : exQ;
          mergedQuizzes[qNum].percentage = maxPct;
        }
        mergedMod.quizScores = mergedQuizzes;
        existingObj[mKey] = mergedMod;
      } else {
        existingObj[mKey] = inVal;
      }
    }
  }

  var maxCourseModules = 32;
  for (var k in existingObj) {
    if (k && k.indexOf("HIND-MOD-") === 0) {
      maxCourseModules = 30;
      break;
    }
  }

  var highestLvl = 1;
  var highestProg = 0;
  for (var m = 1; m <= maxCourseModules; m++) {
    var kPad = m < 10 ? "0" + m : "" + m;
    var mObj = existingObj["MOD-" + kPad] || existingObj["MOD-" + m] || existingObj["HIND-MOD-" + kPad] || existingObj["HIND-MOD-" + m];
    if (mObj) {
      var pct = Number(mObj.percentage) || 0;
      if (pct >= 100 && m < maxCourseModules) {
        if (m + 1 > highestLvl) {
          highestLvl = m + 1;
          highestProg = 0;
        }
      } else if (pct >= 100 && m >= maxCourseModules) {
        highestLvl = maxCourseModules;
        highestProg = pct;
      } else if (pct > 0 && m >= highestLvl) {
        highestLvl = m;
        highestProg = pct;
      }
    }
  }

  // Preserve recorded level from incoming data, existing progress object, or sheet row
  var directLvl = Number(data.latestLevel || data.latestMissionLevel || (data.userProgress && data.userProgress.latestMissionLevel) || existingObj.latestMissionLevel || rowExistingLvl) || 0;
  var directProg = Number(data.latestProgress !== undefined ? data.latestProgress : ((data.userProgress && data.userProgress.latestProgress !== undefined) ? data.userProgress.latestProgress : (existingObj.latestProgress !== undefined ? existingObj.latestProgress : rowExistingProg))) || 0;
  if (directLvl > highestLvl) {
    highestLvl = directLvl;
    highestProg = directProg;
  } else if (directLvl === highestLvl) {
    highestProg = Math.max(highestProg, directProg);
  }

  existingObj.latestMissionLevel = highestLvl;
  existingObj.latestProgress = highestProg;

  var finalProgressStr = JSON.stringify(existingObj);

  if (foundRow > 0) {
    sheet.getRange(foundRow, jsonCol + 1).setValue(finalProgressStr);
    sheet.getRange(foundRow, dateCol + 1).setValue(now);
    if (levelCol >= 0) sheet.getRange(foundRow, levelCol + 1).setValue(highestLvl);
    if (progCol >= 0) sheet.getRange(foundRow, progCol + 1).setValue(highestProg);
  } else {
    sheet.appendRow([adm, email, "", highestLvl, highestProg, finalProgressStr, now]);
  }
  return { success: true, userProgress: existingObj, latestLevel: highestLvl, latestMissionLevel: highestLvl, latestProgress: highestProg };
}

function sanitizeStudentProgressMap(progObj) {
  if (!progObj || typeof progObj !== "object") return {};
  var cleaned = Object.assign({}, progObj);
  var activeRecordedLevel = Number(cleaned.latestMissionLevel || cleaned.missionLevel || cleaned.level || cleaned.latestLevel) || 0;
  var activeRecordedProg = Number(cleaned.latestProgress !== undefined ? cleaned.latestProgress : (cleaned.codeProgress !== undefined ? cleaned.codeProgress : (cleaned.latestCodeProgress !== undefined ? cleaned.latestCodeProgress : (cleaned.progress !== undefined ? cleaned.progress : 0)))) || 0;

  for (var m = 1; m <= 32; m++) {
    var kPad = m < 10 ? "0" + m : "" + m;
    var keys = ["MOD-" + kPad, "MOD-" + m, "HIND-MOD-" + kPad, "HIND-MOD-" + m];
    for (var ki = 0; ki < keys.length; ki++) {
      var k = keys[ki];
      var mObj = cleaned[k];
      if (mObj && typeof mObj === "object") {
        var copyObj = Object.assign({}, mObj);
        var pct = Number(copyObj.percentage) || 0;
        var hasQuiz = (copyObj.quizScores && typeof copyObj.quizScores === "object" && Object.keys(copyObj.quizScores).length > 0);
        var hasProof = Boolean(copyObj.aiMissionProof);
        var hasPractice = (Number(copyObj.verifiedSentences) > 0);
        var isRecordedActive = (m === activeRecordedLevel && activeRecordedProg >= 100);
        // Non-destructive protection: never reset valid completed modules to 0% just because verifiedSentences was omitted or null
        var isOmittedOrNullVerified = (copyObj.verifiedSentences === undefined || copyObj.verifiedSentences === null);
        var isExplicitlyCompleted = (copyObj.status === "COMPLETED" || copyObj.aiMissionCompleted === true || copyObj.completed === true);
        // Preserves valid completed modules within recorded level; modules outside recorded level or without completion remain unverified (!isOmittedOrNullVerified && !isExplicitlyCompleted)
        var isPreservedWithoutVerified = isExplicitlyCompleted && (isOmittedOrNullVerified || copyObj.verifiedSentences === 0) && (activeRecordedLevel === 0 || m <= activeRecordedLevel);

        if (pct >= 100 && !hasQuiz && !hasProof && !hasPractice && !isRecordedActive && !isPreservedWithoutVerified) {
          copyObj.percentage = 0;
          copyObj.aiMissionCompleted = false;
          copyObj.status = "NOT_STARTED";
          copyObj.verifiedSentences = 0;
        } else {
          copyObj.percentage = pct;
          copyObj.aiMissionCompleted = (pct >= 100);
          if (pct >= 100) {
            copyObj.status = "COMPLETED";
          } else if (pct > 0) {
            copyObj.status = "IN_PROGRESS";
          } else {
            copyObj.status = "NOT_STARTED";
          }
        }
        cleaned[k] = copyObj;
      }
    }
  }
  return cleaned;
}

function extractStudentProgressFromRow(row, headers, stripProofs) {
  var progObj = {};
  if (!row || !Array.isArray(row)) return progObj;

  var hClean = (headers || []).map(function(h) {
    return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  });

  var jsonCol = -1, codeCol = -1, levelCol = -1, progCol = -1;
  for (var i = 0; i < hClean.length; i++) {
    var k = hClean[i];
    if (k.indexOf("progressjson") >= 0 || k === "json") jsonCol = i;
    else if (k.indexOf("mclcode") >= 0 || k === "code" || k.indexOf("mcl") >= 0) codeCol = i;
    else if (k.indexOf("missionlevel") >= 0 || k === "level") levelCol = i;
    else if (k.indexOf("codeprogress") >= 0 || k === "progress") progCol = i;
  }

  var foundJsonStr = "";
  var foundMclCode = "";
  var foundLevel = 0;
  var foundProgress = null;

  // 1. Inspect explicit columns if present
  if (jsonCol >= 0 && row[jsonCol]) {
    var rawJ = (row[jsonCol] || "").toString().trim();
    if (rawJ.indexOf("{") >= 0) foundJsonStr = rawJ;
    else if (rawJ.length >= 10) foundMclCode = rawJ;
  }

  if (codeCol >= 0 && row[codeCol]) {
    var rawC = (row[codeCol] || "").toString().trim();
    if (rawC.indexOf("{") >= 0 && !foundJsonStr) foundJsonStr = rawC;
    else if (rawC.length >= 10 && !foundMclCode) foundMclCode = rawC;
  }

  if (levelCol >= 0 && !isNaN(row[levelCol])) {
    var parsedLvl = parseInt(row[levelCol], 10);
    if (parsedLvl >= 1 && parsedLvl <= 32) foundLevel = parsedLvl;
  }
  if (progCol >= 0 && row[progCol] !== "" && row[progCol] !== null && row[progCol] !== undefined && !isNaN(row[progCol])) {
    var parsedProg = parseInt(row[progCol], 10);
    if (!isNaN(parsedProg) && parsedProg >= 0 && parsedProg <= 100) foundProgress = parsedProg;
  }

  // 2. Comprehensive scan across all cells in the row to catch legacy/4-column sheets
  for (var c = 0; c < row.length; c++) {
    var cellVal = (row[c] || "").toString().trim();
    if (!cellVal) continue;

    if (!foundJsonStr && cellVal.indexOf("{") >= 0 && cellVal.indexOf("}") >= 0) {
      foundJsonStr = cellVal;
    } else if (!foundMclCode && cellVal.replace(/[^A-Z0-9]/gi, "").length >= 10 && cellVal.indexOf("{") < 0) {
      foundMclCode = cellVal;
    }
  }

  // 3. Parse JSON object if found
  if (foundJsonStr) {
    try {
      var p = JSON.parse(foundJsonStr);
      if (p && typeof p === "object") {
        progObj = p;
      }
    } catch(e) {}
  }

  // 4. Decode MCL-1 encrypted code or simple MCL pattern if present (strictly capped 1..32)
  if (foundMclCode) {
    var decoded = decodeMcl1(foundMclCode);
    if (decoded && decoded.success && decoded.mission >= 1 && decoded.mission <= 32) {
      if (decoded.mission > foundLevel) {
        foundLevel = decoded.mission;
        foundProgress = Math.min(Math.max(decoded.progress || 0, 0), 100);
      }
    } else {
      var mMatch = foundMclCode.match(/(?:MCL|LEVEL|MOD)[-_\s]*0*(\d{1,2})(?:[-_\s]+0*(\d{1,3}))?/i);
      if (mMatch) {
        var rLvl = parseInt(mMatch[1], 10);
        var rProg = mMatch[2] ? parseInt(mMatch[2], 10) : undefined;
        if (rLvl >= 1 && rLvl <= 32 && rLvl >= foundLevel) {
          foundLevel = rLvl;
          var rawProgVal = (rProg !== undefined && rProg !== null && !isNaN(rProg)) ? Number(rProg) : 0;
          foundProgress = Math.min(Math.max(rawProgVal, 0), 100);
        }
      }
    }
  }

  // 5. If progObj has no modules yet and foundLevel is recorded, populate THAT SINGLE level only. NEVER synthesize fake 100% for other modules!
  var hasModules = false;
  for (var k in progObj) {
    if (k && (k.indexOf("MOD-") === 0 || k.indexOf("HIND-MOD-") === 0)) {
      hasModules = true;
      break;
    }
  }

  if (foundLevel >= 1 && foundLevel <= 32) {
    var p = (foundProgress !== null && foundProgress !== undefined) ? foundProgress : 0;
    if (!hasModules) {
      var singleKey = "MOD-" + (foundLevel < 10 ? "0" + foundLevel : foundLevel);
      var singleKeyShort = "MOD-" + foundLevel;
      var singleObj = {
        percentage: p,
        aiMissionCompleted: (p >= 100),
        status: (p >= 100 ? "COMPLETED" : (p > 0 ? "IN_PROGRESS" : "NOT_STARTED"))
      };
      progObj[singleKey] = singleObj;
      progObj[singleKeyShort] = singleObj;
    }
    progObj.latestMissionLevel = foundLevel;
    progObj.latestProgress = p;
  }

  // Strict sanitization: Eliminate any fake cascade 100% completions where module has no quiz, no proof, and no verifiedSentences
  progObj = sanitizeStudentProgressMap(progObj);

  // Strict integrity check on all modules in progObj:
  // aiMissionCompleted is ONLY true if percentage is >= 100
  for (var modKey in progObj) {
    if (progObj[modKey] && typeof progObj[modKey] === "object") {
      var modPct = Number(progObj[modKey].percentage) || 0;
      progObj[modKey].percentage = modPct;
      progObj[modKey].aiMissionCompleted = (modPct >= 100);
      if (modPct >= 100) {
        progObj[modKey].status = "COMPLETED";
      }
    }
  }

  // If stripProofs requested, remove large base64 screenshot strings to keep payload lightweight and prevent memory errors
  if (stripProofs) {
    for (var mKey in progObj) {
      if (progObj[mKey] && typeof progObj[mKey] === "object") {
        if (progObj[mKey].aiMissionProof) {
          delete progObj[mKey].aiMissionProof;
        }
      }
    }
  }

  return progObj;
}

function handleGetStudentProgress(data) {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "StudentProgress");
  if (!sheet) return { success: true, userProgress: {} };

  ensureStudentProgressHeaders(sheet);

  var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
  var email = (data.email || "").toString().trim().toLowerCase();
  var admClean = adm.replace(/[^A-Z0-9]/g, "");

  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { success: true, userProgress: {} };

  var headers = rows[0] || [];
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  if (admCol < 0) admCol = 0;
  if (emailCol < 0) emailCol = 1;

  var progObj = {};

  var foundRowLevel = 0;
  var foundRowProg = 0;
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var rowAdm = (row[admCol] || "").toString().trim().toUpperCase();
    var rowEmail = (row[emailCol] || "").toString().trim().toLowerCase();
    var rowAdmClean = rowAdm.replace(/[^A-Z0-9]/g, "");

    var isAdmMatch = admClean && rowAdmClean && (admClean === rowAdmClean);
    var isEmailMatch = email && rowEmail && (email === rowEmail);

    if (isAdmMatch || isEmailMatch) {
      var levelCol = findColumnIndex(headers, ["latestmissionlevel", "missionlevel", "level"]);
      if (levelCol >= 0 && !isNaN(row[levelCol])) {
        var parsedL = parseInt(row[levelCol], 10);
        if (parsedL >= 1 && parsedL <= 32) foundRowLevel = parsedL;
      }
      var progCol = findColumnIndex(headers, ["latestcodeprogress", "codeprogress", "progress"]);
      if (progCol >= 0 && !isNaN(row[progCol])) {
        var parsedP = parseInt(row[progCol], 10);
        if (parsedP >= 0 && parsedP <= 100) foundRowProg = parsedP;
      }
      progObj = extractStudentProgressFromRow(row, headers, false); // Single student gets full proof
      break;
    }
  }

  var maxCourseModules = 32;
  for (var k in progObj) {
    if (k && k.indexOf("HIND-MOD-") === 0) {
      maxCourseModules = 30;
      break;
    }
  }

  var highestLvl = 0;
  var highestProg = 0;
  for (var m = 1; m <= maxCourseModules; m++) {
    var kPad = m < 10 ? "0" + m : "" + m;
    var mObj = progObj["MOD-" + kPad] || progObj["MOD-" + m] || progObj["HIND-MOD-" + kPad] || progObj["HIND-MOD-" + m];
    if (mObj) {
      var pct = Number(mObj.percentage) || 0;
      if (pct >= 100 && m < maxCourseModules) {
        if (m + 1 > highestLvl) highestLvl = m + 1;
      } else if (pct >= 100 && m >= maxCourseModules) {
        highestLvl = maxCourseModules;
        highestProg = pct;
      } else if (pct > 0 && m >= highestLvl) {
        highestLvl = m;
        highestProg = pct;
      }
    }
  }

  var effectiveLvl = Math.max(highestLvl || 1, foundRowLevel || 1);
  var effectiveProg = highestProg;
  if (foundRowLevel > highestLvl) {
    effectiveProg = foundRowProg;
  } else if (foundRowLevel === highestLvl) {
    effectiveProg = Math.max(highestProg, foundRowProg);
  }

  progObj.latestMissionLevel = effectiveLvl;
  progObj.latestProgress = effectiveProg;

  return {
    success: true,
    userProgress: progObj,
    latestLevel: effectiveLvl,
    latestProgress: effectiveProg
  };
}

function handleAdminGetAllStudentProgress() {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "StudentProgress");
  if (!sheet) return { success: true, userProgress: {} };

  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return { success: true, userProgress: {} };

  var headers = rows[0] || [];
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  if (admCol < 0) admCol = 0;
  if (emailCol < 0) emailCol = 1;

  var allProgMap = {};

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var rawAdm = (row[admCol] || "").toString().trim().toUpperCase();
    var rawEmail = (row[emailCol] || "").toString().trim().toLowerCase();
    var cleanAdm = rawAdm.replace(/[^A-Z0-9]/g, "");

    if (!rawAdm && !cleanAdm && !rawEmail) continue;

    var progObj = extractStudentProgressFromRow(row, headers, true); // Strip base64 for bulk transfer

    if (rawAdm) allProgMap[rawAdm] = progObj;
    if (cleanAdm && cleanAdm !== rawAdm) allProgMap[cleanAdm] = progObj;
    if (rawEmail) allProgMap[rawEmail] = progObj;
  }

  return { success: true, userProgress: allProgMap };
}

/**
 * Clean & Sanitize Fake 100% Progress from Database
 * Can be run directly from Google Apps Script Editor ("Run" -> adminCleanAllFakeProgress)
 * or via API action: 'cleanAllFakeProgress'
 */
function adminCleanAllFakeProgress() {
  return handleAdminCleanAllFakeProgress();
}

function handleAdminCleanAllFakeProgress() {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "StudentProgress");
  if (!sheet) {
    return { success: false, message: "StudentProgress sheet not found in spreadsheet." };
  }

  ensureStudentProgressHeaders(sheet);
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return { success: true, message: "No student records found to sanitize.", cleanedStudents: 0 };
  }

  var headers = rows[0] || [];
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var jsonCol = findColumnIndex(headers, ["progressjson", "json"]);
  var levelCol = findColumnIndex(headers, ["latestmissionlevel", "missionlevel", "level"]);
  var progCol = findColumnIndex(headers, ["latestcodeprogress", "codeprogress", "progress"]);
  var codeCol = findColumnIndex(headers, ["latestmclcode", "mclcode", "code"]);
  var dateCol = findColumnIndex(headers, ["lastupdated", "updated", "date"]);

  if (admCol < 0) admCol = 0;
  if (jsonCol < 0) jsonCol = (headers.length >= 6 ? 5 : 2);
  if (levelCol < 0) levelCol = (headers.length >= 6 ? 3 : -1);
  if (progCol < 0) progCol = (headers.length >= 6 ? 4 : -1);

  var cleanedCount = 0;
  var totalRowsChecked = 0;

  for (var i = 1; i < rows.length; i++) {
    totalRowsChecked++;
    var rawJson = (rows[i][jsonCol] || "").toString().trim();
    if (!rawJson || rawJson.indexOf("{") < 0) continue;

    var progObj = null;
    try {
      progObj = JSON.parse(rawJson);
    } catch(e) {
      continue;
    }
    if (!progObj || typeof progObj !== "object") continue;

    var changed = false;
    var rowMclCode = (codeCol >= 0 && rows[i][codeCol]) ? rows[i][codeCol].toString().trim() : "";
    var decoded = decodeMcl1(rowMclCode);
    var validMclMission = (decoded && decoded.success && decoded.mission >= 1 && decoded.mission <= 32) ? decoded.mission : 0;
    var validMclProgress = (decoded && decoded.success) ? Math.min(Math.max(decoded.progress || 0, 0), 100) : 0;

    if (!validMclMission && rowMclCode) {
      var mMatch = rowMclCode.match(/(?:MCL|LEVEL|MOD)[-_\s]*0*(\d{1,2})(?:[-_\s]+0*(\d{1,3}))?/i);
      if (mMatch) {
        var rLvl = parseInt(mMatch[1], 10);
        var rProg = mMatch[2] ? parseInt(mMatch[2], 10) : 0;
        if (rLvl >= 1 && rLvl <= 32) {
          validMclMission = rLvl;
          validMclProgress = Math.min(Math.max(rProg, 0), 100);
        }
      }
    }
    if (!validMclMission && levelCol >= 0 && !isNaN(rows[i][levelCol])) {
      var pLvl = parseInt(rows[i][levelCol], 10);
      if (pLvl >= 1 && pLvl <= 32) {
        validMclMission = pLvl;
        if (progCol >= 0 && !isNaN(rows[i][progCol])) {
          validMclProgress = Math.min(Math.max(parseInt(rows[i][progCol], 10) || 0, 0), 100);
        }
      }
    }

    // First scan: Detect if student was infected by fake 100% cascade (inspect each module once, avoiding alias multi-count)
    var fake100Count = 0;
    var total100Count = 0;
    for (var m = 1; m <= 32; m++) {
      var kPad = m < 10 ? "0" + m : "" + m;
      var mCheckObj = progObj["MOD-" + kPad] || progObj["MOD-" + m] || progObj["HIND-MOD-" + kPad] || progObj["HIND-MOD-" + m];
      if (mCheckObj && typeof mCheckObj === "object") {
        var pct = Number(mCheckObj.percentage) || 0;
        var hasQuiz = (mCheckObj.quizScores && typeof mCheckObj.quizScores === "object" && Object.keys(mCheckObj.quizScores).length > 0);
        var hasProof = Boolean(mCheckObj.aiMissionProof);
        var hasPractice = (Number(mCheckObj.verifiedSentences) > 0);
        var isMclActive = (m === validMclMission && validMclProgress >= 100);
        if (pct >= 100) {
          total100Count++;
          if (!hasQuiz && !hasProof && !hasPractice && !isMclActive) {
            fake100Count++;
          }
        }
      }
    }

    for (var m = 1; m <= 32; m++) {
      var kPad = m < 10 ? "0" + m : "" + m;
      var modKeys = ["MOD-" + kPad, "MOD-" + m, "HIND-MOD-" + kPad, "HIND-MOD-" + m];
      for (var mki = 0; mki < modKeys.length; mki++) {
        var k = modKeys[mki];
        var mObj = progObj[k];
        if (!mObj || typeof mObj !== "object") continue;

        var pct = Number(mObj.percentage) || 0;
        var hasQuiz = (mObj.quizScores && typeof mObj.quizScores === "object" && Object.keys(mObj.quizScores).length > 0);
        var hasProof = Boolean(mObj.aiMissionProof);
        var isMclActive = (m === validMclMission && validMclProgress >= 100);
        var hasPractice = (Number(mObj.verifiedSentences) > 0);

        // Clean fake 100% completions strictly; NEVER wipe legitimate partial progress (< 100%)
        if (pct >= 100 && !hasQuiz && !hasProof && !isMclActive && !hasPractice) {
          if (pct > 0 || mObj.aiMissionCompleted || mObj.status === "COMPLETED") {
            mObj.percentage = 0;
            mObj.aiMissionCompleted = false;
            mObj.status = "NOT_STARTED";
            mObj.verifiedSentences = 0;
            changed = true;
          }
        } else {
          // Enforce strict rule: aiMissionCompleted is ONLY true if pct >= 100
          var shouldBeCompleted = (pct >= 100);
          if (mObj.aiMissionCompleted !== shouldBeCompleted) {
            mObj.aiMissionCompleted = shouldBeCompleted;
            changed = true;
          }
          if (pct >= 100) {
            if (mObj.status !== "COMPLETED") {
              mObj.status = "COMPLETED";
              changed = true;
            }
          } else if (pct > 0) {
            if (mObj.status !== "IN_PROGRESS") {
              mObj.status = "IN_PROGRESS";
              changed = true;
            }
          } else {
            if (mObj.status !== "NOT_STARTED") {
              mObj.status = "NOT_STARTED";
              changed = true;
            }
          }
        }
        progObj[k] = mObj;
      }
    }

    // Recompute real highest level and progress respecting course boundary
    var maxCourseModules = 32;
    for (var k in progObj) {
      if (k && k.indexOf("HIND-MOD-") === 0) {
        maxCourseModules = 30;
        break;
      }
    }

    var trueHighestLvl = 1;
    var trueHighestProg = 0;
    for (var m = 1; m <= maxCourseModules; m++) {
      var kPad = m < 10 ? "0" + m : "" + m;
      var mObj = progObj["MOD-" + kPad] || progObj["MOD-" + m] || progObj["HIND-MOD-" + kPad] || progObj["HIND-MOD-" + m];
      if (mObj) {
        var p = Number(mObj.percentage) || 0;
        if (p >= 100 && m < maxCourseModules) {
          if (m + 1 > trueHighestLvl) trueHighestLvl = m + 1;
        } else if (p >= 100 && m >= maxCourseModules) {
          trueHighestLvl = maxCourseModules;
          trueHighestProg = p;
        } else if (p > 0 && m >= trueHighestLvl) {
          trueHighestLvl = m;
          trueHighestProg = p;
        }
      }
    }

    if (validMclMission > 0) {
      if (validMclMission > trueHighestLvl) {
        trueHighestLvl = validMclMission;
        trueHighestProg = validMclProgress;
      } else if (validMclMission === trueHighestLvl) {
        trueHighestProg = Math.max(trueHighestProg, validMclProgress);
      }
    }

    progObj.latestMissionLevel = trueHighestLvl;
    progObj.latestProgress = trueHighestProg;

    if (changed) {
      var cleanJsonStr = JSON.stringify(progObj);
      sheet.getRange(i + 1, jsonCol + 1).setValue(cleanJsonStr);
      if (levelCol >= 0) sheet.getRange(i + 1, levelCol + 1).setValue(trueHighestLvl);
      if (progCol >= 0) sheet.getRange(i + 1, progCol + 1).setValue(trueHighestProg);
      if (dateCol >= 0) sheet.getRange(i + 1, dateCol + 1).setValue(new Date());
      cleanedCount++;
    }
  }

  Logger.log("adminCleanAllFakeProgress finished. Total rows checked: " + totalRowsChecked + ", Fake 100% rows cleaned: " + cleanedCount);
  return {
    success: true,
    message: "Sanitization complete! Cleaned " + cleanedCount + " student records with fake 100% progress.",
    cleanedStudents: cleanedCount,
    totalChecked: totalRowsChecked
  };
}

function handleUpdateProgress(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (e) {
    return { success: false, message: "Could not obtain script lock: " + e.message };
  }

  try {
    return handleSaveStudentProgressCore(data);
  } finally {
    try {
      lock.releaseLock();
    } catch(e) {}
  }
}

function getItemVal(obj, keys) {
  if (!obj) return "";
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
    for (var prop in obj) {
      var pClean = prop.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      var kClean = k.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
      if (pClean === kClean) {
        if (obj[prop] !== undefined && obj[prop] !== null && obj[prop] !== "") return obj[prop];
      }
    }
  }
  return "";
}

function handleSubmitQuizScore(data) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
  } catch (e) {
    return { success: false, message: "Could not obtain script lock: " + e.message };
  }

  try {
    var ss = getMasteredSpreadsheet();
    var sheet = getFlexibleSheet(ss, "QuizResults");
    if (!sheet) {
      sheet = ss.insertSheet("QuizResults");
      sheet.appendRow(["Timestamp", "AdmissionNumber", "StudentName", "ModuleNumber", "Score", "Total", "Percentage", "Passed"]);
    }

    var adm = (data.admissionNumber || "").toString().trim().toUpperCase();
    var name = (data.studentName || data.name || "").toString().trim();
    var modNum = parseInt(data.moduleNumber) || 1;
    var score = parseInt(data.score) || 0;
    var total = parseInt(data.total) || 0;
    var pct = parseInt(data.percentage) || Math.round((score / (total || 1)) * 100);
    var passed = pct >= 70 ? "YES" : "NO";
    var now = new Date();

    sheet.appendRow([now, adm, name, modNum, score, total, pct, passed]);

    // Update StudentProgress map as well
    var progSheet = getFlexibleSheet(ss, "StudentProgress");
    if (!progSheet) {
      progSheet = ss.insertSheet("StudentProgress");
    }
    ensureStudentProgressHeaders(progSheet);

    if (adm) {
      var pRows = progSheet.getDataRange().getValues();
      var pHeaders = pRows[0] || [];
      var admCol = findColumnIndex(pHeaders, ["admissionnumber", "admission", "adm"]);
      var jsonCol = findColumnIndex(pHeaders, ["progressjson", "progress", "json"]);
      var dateCol = findColumnIndex(pHeaders, ["lastupdated", "updated", "date", "timestamp"]);
      if (admCol < 0) admCol = 0;
      if (jsonCol < 0) jsonCol = (pHeaders.length > 2 ? pHeaders.length - 2 : 2);
      if (dateCol < 0) dateCol = (pHeaders.length > 3 ? pHeaders.length - 1 : 3);

      var foundIdx = -1;
      var currentProgObj = {};
      var admClean = adm.replace(/[^A-Z0-9]/g, "");

      for (var i = 1; i < pRows.length; i++) {
        var rAdm = (pRows[i][admCol] || "").toString().trim().toUpperCase();
        var rAdmClean = rAdm.replace(/[^A-Z0-9]/g, "");
        if (rAdm === adm || (admClean && rAdmClean === admClean)) {
          foundIdx = i + 1;
          currentProgObj = extractStudentProgressFromRow(pRows[i], pHeaders);
          break;
        }
      }

      var kPad = modNum < 10 ? "0" + modNum : "" + modNum;
      var modKey = "MOD-" + kPad;
      var modKeyShort = "MOD-" + modNum;
      var hindKey = "HIND-MOD-" + kPad;
      var hindKeyShort = "HIND-MOD-" + modNum;

      var existingMod = currentProgObj[modKey] || currentProgObj[modKeyShort] || currentProgObj[hindKey] || currentProgObj[hindKeyShort] || { percentage: 0 };
      if (!existingMod.quizScores) existingMod.quizScores = {};

      var existingQ = existingMod.quizScores[modNum] || {};
      var existingPct = Number(existingQ.percentage) || 0;
      var finalPct = Math.max(existingPct, pct);
      var finalScore = (finalPct === pct) ? score : (existingQ.score !== undefined ? existingQ.score : score);
      var finalTotal = (finalPct === pct) ? total : (existingQ.total !== undefined ? existingQ.total : total);

      var quizScoreObj = {
        score: finalScore,
        total: finalTotal,
        percentage: finalPct,
        passed: finalPct >= 70,
        date: now.toISOString()
      };
      existingMod.quizScores[modNum] = quizScoreObj;

      currentProgObj[modKey] = existingMod;
      currentProgObj[modKeyShort] = existingMod;
      currentProgObj[hindKey] = existingMod;
      currentProgObj[hindKeyShort] = existingMod;

      var progJson = JSON.stringify(currentProgObj);

      if (foundIdx > 0) {
        progSheet.getRange(foundIdx, jsonCol + 1).setValue(progJson);
        progSheet.getRange(foundIdx, dateCol + 1).setValue(now);
      } else {
        var newRow = [];
        for (var c = 0; c < pHeaders.length; c++) newRow.push("");
        newRow[admCol] = adm;
        newRow[jsonCol] = progJson;
        newRow[dateCol] = now;
        progSheet.appendRow(newRow);
      }
    }

    return { success: true, message: "Quiz score recorded live in database!" };
  } finally {
    try {
      lock.releaseLock();
    } catch(e) {}
  }
}

function handleAdminGetStudents() {
  var ss = getMasteredSpreadsheet();
  var progSheet = getFlexibleSheet(ss, "StudentProgress");
  var progMap = {};
  if (progSheet) {
    var pRows = progSheet.getDataRange().getValues();
    if (pRows.length > 1) {
      var pHeaders = pRows[0] || [];
      var pAdmCol = findColumnIndex(pHeaders, ["admissionnumber", "admission", "adm"]);
      var pEmailCol = findColumnIndex(pHeaders, ["email"]);
      if (pAdmCol < 0) pAdmCol = 0;
      if (pEmailCol < 0) pEmailCol = 1;

      for (var p = 1; p < pRows.length; p++) {
        var pRow = pRows[p];
        var pAdm = (pRow[pAdmCol] || "").toString().trim().toUpperCase();
        var pEmail = (pRow[pEmailCol] || "").toString().trim().toLowerCase();
        var pCleanAdm = pAdm.replace(/[^A-Z0-9]/g, "");

        if (!pAdm && !pCleanAdm && !pEmail) continue;

        var pObj = extractStudentProgressFromRow(pRow, pHeaders, true); // Strip base64 for fast student directory listing

        if (pAdm) progMap[pAdm] = pObj;
        if (pCleanAdm && pCleanAdm !== pAdm) progMap[pCleanAdm] = pObj;
        if (pEmail) progMap[pEmail] = pObj;
      }
    }
  }

  var sheet = getFlexibleSheet(ss, "Students");
  if (!sheet) return { success: true, data: [] };

  var data = sheet.getDataRange().getValues();
  if (!data || data.length <= 1) return { success: true, data: [] };

  var headers = data[0].map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
  var idCol = findColumnIndex(headers, ["studentid", "id"]);
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var nameCol = findColumnIndex(headers, ["name", "fullname"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  var phoneCol = findColumnIndex(headers, ["phone", "whatsappnumber", "whatsapp", "mobile"]);
  var courseCol = findColumnIndex(headers, ["course", "coursename", "coursecode"]);
  var imgCol = findColumnIndex(headers, ["profileimage", "image"]);
  var appCol = findColumnIndex(headers, ["approved"]);
  var statusCol = findColumnIndex(headers, ["status"]);
  var dateCol = findColumnIndex(headers, ["createddate", "date", "timestamp"]);
  var tokenCol = findColumnIndex(headers, ["activedevicetoken", "devicetoken"]);

  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var stdId = idCol >= 0 ? row[idCol] : ("STD-" + i);
    var adm = admCol >= 0 ? (row[admCol] || "").toString().trim() : "";
    var sName = nameCol >= 0 ? (row[nameCol] || "").toString().trim() : "";
    var sEmail = emailCol >= 0 ? (row[emailCol] || "").toString().trim() : "";
    var sPhoneRaw = phoneCol >= 0 ? (row[phoneCol] || "").toString().trim() : "";
    var sPhone = (sPhoneRaw.indexOf("#") >= 0 || sPhoneRaw.toUpperCase().indexOf("ERROR") >= 0 || sPhoneRaw.toUpperCase().indexOf("REF") >= 0) ? "" : sPhoneRaw;
    var sCourse = courseCol >= 0 ? (row[courseCol] || "").toString().trim() : "MAL TO ENG";
    var sImg = (imgCol >= 0 && row[imgCol]) ? row[imgCol] : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80";
    var sAppRaw = appCol >= 0 ? row[appCol] : true;
    var isApp = sAppRaw === true || (sAppRaw || "").toString().toUpperCase() === 'TRUE';
    var sStatus = statusCol >= 0 ? (row[statusCol] || "Active") : "Active";
    var sDate = dateCol >= 0 ? row[dateCol] : "";
    var sToken = tokenCol >= 0 ? row[tokenCol] : "";

    if (!adm && !sEmail && !sName) continue;

    var cleanAdmKey = adm.toUpperCase().replace(/[^A-Z0-9]/g, "");
    var cleanEmailKey = sEmail.toLowerCase();
    var stdProg = progMap[cleanAdmKey] || progMap[cleanEmailKey] || progMap[adm.toUpperCase()] || {};
    var sLvl = Number(stdProg.latestMissionLevel || stdProg.level || stdProg.missionLevel) || 0;
    var sProg = Number(stdProg.latestProgress || stdProg.progress || stdProg.latestCodeProgress) || 0;

    list.push({
      studentId: stdId,
      admissionNumber: adm,
      name: sName,
      email: sEmail,
      phone: sPhone,
      course: sCourse,
      profileImage: sImg,
      approved: isApp,
      status: sStatus,
      createdDate: sDate,
      activeDeviceToken: sToken,
      userProgress: stdProg,
      latestMissionLevel: sLvl,
      latestProgress: sProg
    });
  }

  return { success: true, data: list };
}

function handleAdminGetRequests() {
  var ss = getMasteredSpreadsheet();
  var sheet = getFlexibleSheet(ss, "Requests");
  if (!sheet) return { success: true, data: [] };

  var data = sheet.getDataRange().getValues();
  if (!data || data.length <= 1) return { success: true, data: [] };

  var headers = data[0].map(function(h) { return (h || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, ""); });
  var idCol = findColumnIndex(headers, ["requestid", "id"]);
  var nameCol = findColumnIndex(headers, ["name", "fullname"]);
  var phoneCol = findColumnIndex(headers, ["phone", "whatsappnumber", "whatsapp", "mobile"]);
  var emailCol = findColumnIndex(headers, ["email"]);
  var admCol = findColumnIndex(headers, ["admissionnumber", "admission", "adm"]);
  var courseCol = findColumnIndex(headers, ["course", "coursename"]);
  var statusCol = findColumnIndex(headers, ["status"]);
  var dateCol = findColumnIndex(headers, ["createddate", "date", "timestamp"]);
  var byCol = findColumnIndex(headers, ["approvedby", "by"]);

  var list = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var reqId = idCol >= 0 ? row[idCol] : ("REQ-" + i);
    var rName = nameCol >= 0 ? row[nameCol] : "";
    var rPhoneRaw = phoneCol >= 0 ? (row[phoneCol] || "").toString().trim() : "";
    var rPhone = (rPhoneRaw.indexOf("#") >= 0 || rPhoneRaw.toUpperCase().indexOf("ERROR") >= 0 || rPhoneRaw.toUpperCase().indexOf("REF") >= 0) ? "" : rPhoneRaw;
    var rEmail = emailCol >= 0 ? (row[emailCol] || "").toString().trim() : "";
    var rAdm = admCol >= 0 ? (row[admCol] || "").toString().trim() : "";
    var rCourse = courseCol >= 0 ? (row[courseCol] || "").toString().trim() : "";
    var rStatus = statusCol >= 0 ? (row[statusCol] || "Pending").toString().trim() : "Pending";
    var rDate = dateCol >= 0 ? row[dateCol] : "";
    var rBy = byCol >= 0 ? row[byCol] : "";

    if (!rName && !rAdm && !rEmail) continue;

    list.push({
      requestId: reqId,
      name: rName,
      phone: rPhone,
      email: rEmail,
      admissionNumber: rAdm,
      course: rCourse,
      status: rStatus,
      createdDate: rDate,
      approvedBy: rBy
    });
  }

  return { success: true, data: list };
}

function forceApproveAllPaidRequests() {
  try {
    var ss = getMasteredSpreadsheet();
    var paidSheet = getFlexibleSheet(ss, "PAID_STUDENTS");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid Students");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid");

    var reqSheet = getFlexibleSheet(ss, "Requests");
    if (!paidSheet || !reqSheet) return { success: false, message: "Sheets missing" };

    var paidData = paidSheet.getDataRange().getValues();
    var reqData = reqSheet.getDataRange().getValues();

    var headerRowIndex = 0;
    for (var r = 0; r < Math.min(paidData.length, 10); r++) {
      var rStr = "";
      try {
        rStr = paidData[r].map(function(c) { return (c || "").toString(); }).join(" ").toLowerCase();
      } catch(eStr) {}
      if (rStr.indexOf("admission") >= 0 || rStr.indexOf("email") >= 0 || rStr.indexOf("full name") >= 0 || rStr.indexOf("status") >= 0) {
        headerRowIndex = r;
        break;
      }
    }

    var headers = paidData[headerRowIndex].map(function(h) { return h.toString().trim().toLowerCase(); });
    var pAdmIdx = -1, pEmailIdx = -1;
    for (var k = 0; k < headers.length; k++) {
      var h = headers[k];
      if (h.indexOf("admission") >= 0 || h.indexOf("adm") >= 0) pAdmIdx = k;
      if (h.indexOf("email") >= 0 && h.indexOf("verified") < 0) pEmailIdx = k;
    }
    if (pAdmIdx < 0 && headers.length > 1) pAdmIdx = 1;
    if (pEmailIdx < 0 && headers.length > 3) pEmailIdx = 3;

    var approvedCount = 0;

    for (var reqIdx = 1; reqIdx < reqData.length; reqIdx++) {
      var rEmail = (reqData[reqIdx][3] || "").toString().trim().toLowerCase();
      var rAdm = (reqData[reqIdx][4] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
      var rAdmDigits = rAdm.replace(/[^0-9]/g, "");

      if (!rEmail && !rAdm) continue;

      for (var p = headerRowIndex + 1; p < paidData.length; p++) {
        var pRow = paidData[p];
        var pAdm = pAdmIdx >= 0 ? (pRow[pAdmIdx] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
        var pEmail = pEmailIdx >= 0 ? (pRow[pEmailIdx] || "").toString().trim().toLowerCase() : "";
        var pAdmDigits = pAdm.replace(/[^0-9]/g, "");

        var isExactAdm = rAdm && pAdm && (rAdm === pAdm);
        var isExactEmail = rEmail && pEmail && (rEmail === pEmail);

        var isMatch = false;
        if (rAdm && rEmail) {
          isMatch = (isExactAdm && isExactEmail) || (isExactAdm && !pEmail) || (isExactEmail && !pAdm);
        } else if (rAdm) {
          isMatch = isExactAdm;
        } else if (rEmail) {
          isMatch = isExactEmail;
        }

        if (isMatch) {
          reqSheet.getRange(reqIdx + 1, 7).setValue("Approved"); // Column G = Status
          approvedCount++;
          break;
        }
      }
    }

    syncAllPaidStudentsToStudentsSheet();
    return { success: true, approvedCount: approvedCount };
  } catch(err) {
    return { success: false, message: err.toString() };
  }
}

// Bulk Sync Function: Copies all successful rows from PAID_STUDENTS tab into Students tab
function syncAllPaidStudentsToStudentsSheet() {
  try {
    var ss = getMasteredSpreadsheet();
    var paidSheet = getFlexibleSheet(ss, "PAID_STUDENTS");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid Students");
    if (!paidSheet) paidSheet = getFlexibleSheet(ss, "Paid");
    if (!paidSheet) return { success: false, message: "PAID_STUDENTS sheet missing." };

    var paidData = paidSheet.getDataRange().getValues();
    if (!paidData || paidData.length === 0) return { success: false, message: "PAID_STUDENTS tab empty." };

    var stdSheet = getFlexibleSheet(ss, "Students");
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
    for (var r = 0; r < Math.min(paidData.length, 10); r++) {
      var rStr = "";
      try {
        rStr = paidData[r].map(function(c) { return (c || "").toString(); }).join(" ").toLowerCase();
      } catch(eStr) {}
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
      
      // Allow any valid payment status (SUCCESS, PAID, COMPLETED, TRUE, YES, CAPTURED, AUTHORIZED, APPROVED, ACTIVE, ENROLLED, or empty)
      if (statusIdx >= 0 && pStatus) {
        var isInvalidStatus = pStatus === "FAILED" || pStatus === "REFUNDED" || pStatus === "CANCELLED" || pStatus === "REJECTED" || pStatus === "FALSE" || pStatus === "NO";
        if (isInvalidStatus) continue;
      }

      var normCourse = "MAL TO ENG";
      var cUpper = rawCourse.toUpperCase();
      if (cUpper.indexOf("HI") >= 0 || cUpper.indexOf("HINDI") >= 0) normCourse = "HIND TO ENG";
      else if (cUpper.indexOf("TA") >= 0 || cUpper.indexOf("TAMIL") >= 0) normCourse = "TAMIL TO ENG";
      else if (cUpper.indexOf("KA") >= 0 || cUpper.indexOf("KANNADA") >= 0) normCourse = "KANNADA TO ENG";
      else if (cUpper.indexOf("BA") >= 0 || cUpper.indexOf("BENGALI") >= 0 || cUpper.indexOf("BANGALI") >= 0) normCourse = "BANGALI TO ENG";
      else normCourse = "MAL TO ENG";

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

    // Also update any matching pending rows in Requests sheet tab to Approved
    var reqSheet = getFlexibleSheet(ss, "Requests");
    if (reqSheet) {
      var reqRows = reqSheet.getDataRange().getValues();
      for (var r = 1; r < reqRows.length; r++) {
        var rEmail = (reqRows[r][3] || "").toString().trim().toLowerCase();
        var rAdm = (reqRows[r][4] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
        for (var i = headerRowIndex + 1; i < paidData.length; i++) {
          var pRow = paidData[i];
          var pAdm = admIdx >= 0 ? (pRow[admIdx] || "").toString().trim().toUpperCase().replace(/[^A-Z0-9]/g, "") : "";
          var pEmail = emailIdx >= 0 ? (pRow[emailIdx] || "").toString().trim().toLowerCase() : "";
          if ((pAdm && rAdm === pAdm) || (pEmail && rEmail === pEmail)) {
            reqSheet.getRange(r + 1, 7).setValue("Approved"); // Column G = Status
            break;
          }
        }
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
