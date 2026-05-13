// ============================================================
// Modesty Designs & Prints — Google Apps Script API
// Paste this entire file into Google Apps Script and deploy
// as a Web App with access: "Anyone, even anonymous"
// ============================================================

function doGet(e) {
  try {
    var sheetName = e.parameter.sheet;
    if (!sheetName) {
      return buildResponse({ success: false, error: 'Missing ?sheet= parameter' });
    }
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return buildResponse({ success: false, error: 'Sheet "' + sheetName + '" not found' });
    }
    var data = getSheetData(sheet);
    return buildResponse({ success: true, data: data });
  } catch (err) {
    return buildResponse({ success: false, error: err.toString() });
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var sheetName = body.sheet;
    var action = body.action;
    var data = body.data;
    var rowIndex = body.rowIndex;

    if (!sheetName || !action) {
      return buildResponse({ success: false, error: 'Missing sheet or action' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      return buildResponse({ success: false, error: 'Sheet "' + sheetName + '" not found' });
    }

    var lastCol = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

    if (action === 'add') {
      var newRow = headers.map(function(h) { return data[h] !== undefined ? data[h] : ''; });
      sheet.appendRow(newRow);
      return buildResponse({ success: true });
    }

    if (action === 'update') {
      if (!rowIndex) return buildResponse({ success: false, error: 'Missing rowIndex for update' });
      var updateRow = headers.map(function(h) { return data[h] !== undefined ? data[h] : ''; });
      sheet.getRange(rowIndex, 1, 1, headers.length).setValues([updateRow]);
      return buildResponse({ success: true });
    }

    if (action === 'delete') {
      if (!rowIndex) return buildResponse({ success: false, error: 'Missing rowIndex for delete' });
      sheet.deleteRow(rowIndex);
      return buildResponse({ success: true });
    }

    return buildResponse({ success: false, error: 'Unknown action: ' + action });
  } catch (err) {
    return buildResponse({ success: false, error: err.toString() });
  }
}

function getSheetData(sheet) {
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 2 || lastCol < 1) return [];

  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];
  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var obj = { _rowIndex: i + 1 };
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j] !== null && row[j] !== undefined ? String(row[j]) : '';
    }
    rows.push(obj);
  }
  return rows;
}

function buildResponse(data) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ============================================================
// RUN THIS ONCE to set up the sheet structure automatically
// Go to Apps Script editor > Run > setupSheets
// ============================================================
function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  function ensureSheet(name, headers) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    return sheet;
  }

  var aboutSheet = ensureSheet('about', ['Field', 'Value']);
  if (aboutSheet.getLastRow() <= 1) {
    aboutSheet.appendRow(['bio_paragraph_1', 'I am Modesty Oluwagbemileke, a passionate creative designer and brand consultant.']);
    aboutSheet.appendRow(['bio_paragraph_2', 'I specialize in brand identity design, event branding, and visual storytelling.']);
    aboutSheet.appendRow(['bio_paragraph_3', 'Beyond design, I am the proud founder of the African Creative Visionary Awards.']);
    aboutSheet.appendRow(['bio_paragraph_4', 'My goal is to consistently deliver creative work that speaks, resonates, and converts.']);
    aboutSheet.appendRow(['photo_url', '']);
  }

  ensureSheet('why_me', ['id', 'headline', 'description']);
  ensureSheet('tools', ['id', 'tool_name']);
  ensureSheet('projects', ['id', 'category', 'image_url', 'title', 'order']);
  ensureSheet('reviews', ['id', 'review_text', 'reviewer_name', 'timestamp', 'visible']);
  ensureSheet('contact', ['platform', 'handle_or_value']);

  var contactSheet = ss.getSheetByName('contact');
  if (contactSheet.getLastRow() <= 1) {
    contactSheet.appendRow(['whatsapp', '+2349121218751']);
    contactSheet.appendRow(['linkedin', 'modesty oluwagbemileke']);
    contactSheet.appendRow(['facebook', 'modesty oluwagbemileke']);
    contactSheet.appendRow(['tiktok', 'modesty oluwagbemileke']);
    contactSheet.appendRow(['email', 'modestyart23@gmail.com']);
  }

  Logger.log('Setup complete. All sheets created.');
}
