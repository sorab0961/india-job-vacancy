/**
 * IndiaJobConnect — Google Apps Script Backend
 * 
 * This script runs as a web app and handles:
 * 1. Receiving form submissions from the frontend
 * 2. Validating fields server-side
 * 3. Preventing duplicate submissions (same phone within 24h)
 * 4. Saving resume PDFs to Google Drive with structured naming
 * 5. Writing candidate data to Google Sheets
 * 
 * SETUP:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire code
 * 3. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL and paste it in your .env file
 * 
 * SHEET COLUMNS (Row 1 headers):
 * A: Timestamp
 * B: Name
 * C: Phone
 * D: Email
 * E: City
 * F: Role
 * G: Experience
 * H: Salary
 * I: Relocate
 * J: ResumeURL
 */

// ─── Config ──────────────────────────────────────────────
var DRIVE_FOLDER_NAME = 'IndiaJobConnect_Resumes';
var DUPLICATE_WINDOW_HOURS = 24;

// ─── Main POST Handler ──────────────────────────────────
function doPost(e) {
  try {
    var params = e.parameter;

    // ── 1. Extract fields ──
    var fullName     = (params.fullName || '').trim();
    var mobile       = (params.mobile || '').trim();
    var email        = (params.email || '').trim();
    var city         = (params.city || '').trim();
    var jobRole      = (params.jobRole || '').trim();
    var experience   = (params.experience || '').trim();
    var salary       = (params.expectedSalary || '').trim();
    var relocate     = (params.willingToRelocate || '').trim();
    var resumeBase64 = (params.resume || '').trim();
    var timestamp    = new Date().toISOString();

    // ── 2. Server-side validation ──
    if (!fullName || fullName.length < 2) {
      return jsonResponse('error', 'Full name is required (minimum 2 characters).');
    }
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return jsonResponse('error', 'A valid 10-digit Indian mobile number is required.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse('error', 'A valid email address is required.');
    }
    if (!city) {
      return jsonResponse('error', 'Current city is required.');
    }
    if (!jobRole) {
      return jsonResponse('error', 'Preferred job role is required.');
    }
    if (!experience) {
      return jsonResponse('error', 'Experience level is required.');
    }

    // ── 3. Duplicate prevention (same phone within 24h) ──
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data  = sheet.getDataRange().getValues();
    var now   = new Date();
    var cutoff = new Date(now.getTime() - DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000);

    for (var i = 1; i < data.length; i++) { // skip header row
      var rowPhone     = String(data[i][2]).trim();  // Column C = Phone
      var rowTimestamp  = new Date(data[i][0]);       // Column A = Timestamp

      if (rowPhone === mobile && rowTimestamp > cutoff) {
        return jsonResponse('error', 'A submission with this phone number was already received in the last 24 hours. Please try again later.');
      }
    }

    // ── 4. Handle resume upload ──
    var resumeURL = '';
    if (resumeBase64) {
      try {
        // Validate base64 is not too large (~2MB file ≈ ~2.67MB base64)
        if (resumeBase64.length > 3 * 1024 * 1024) {
          return jsonResponse('error', 'Resume file is too large. Maximum size is 2MB.');
        }

        var safeName = fullName.replace(/[^a-zA-Z0-9]/g, '_');
        var ts = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
        var fileName = safeName + '_' + mobile + '_' + ts + '.pdf';

        var decoded = Utilities.base64Decode(resumeBase64);
        var blob = Utilities.newBlob(decoded, 'application/pdf', fileName);

        var folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        resumeURL = file.getUrl();
      } catch (fileErr) {
        return jsonResponse('error', 'Failed to upload resume: ' + fileErr.toString());
      }
    }

    // ── 5. Append row to sheet ──
    sheet.appendRow([
      timestamp,   // A: Timestamp
      fullName,    // B: Name
      mobile,      // C: Phone
      email,       // D: Email
      city,        // E: City
      jobRole,     // F: Role
      experience,  // G: Experience
      salary,      // H: Salary
      relocate,    // I: Relocate
      resumeURL    // J: ResumeURL
    ]);

    return jsonResponse('success', 'Resume submitted successfully! We will contact you soon.');

  } catch (error) {
    return jsonResponse('error', 'Server error: ' + error.toString());
  }
}

// ─── GET Handler (Health Check) ──────────────────────────
function doGet() {
  return jsonResponse('ok', 'IndiaJobConnect API is running.');
}

// ─── Helpers ─────────────────────────────────────────────
function jsonResponse(status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}
