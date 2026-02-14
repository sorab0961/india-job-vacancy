# IndiaJobConnect 🇮🇳

A modern, premium recruitment platform that connects job seekers with verified recruiters across India. Submit your resume for free and get hired.

## Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- **Google Sheets** (via Apps Script) for data collection
- **Google Drive** (via Apps Script) for resume storage

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Google Sheets Backend

Follow these steps to create the Google Sheets backend:

#### a. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it **IndiaJobConnect Submissions**
3. Add these headers in Row 1:
   | A | B | C | D | E | F | G | H | I | J |
   |---|---|---|---|---|---|---|---|---|---|
   | Timestamp | Full Name | Mobile | Email | City | Job Role | Experience | Expected Salary | Willing to Relocate | Resume Link |

#### b. Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete the default code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    var fullName = e.parameter.fullName || '';
    var mobile = e.parameter.mobile || '';
    var email = e.parameter.email || '';
    var city = e.parameter.city || '';
    var jobRole = e.parameter.jobRole || '';
    var experience = e.parameter.experience || '';
    var salary = e.parameter.expectedSalary || '';
    var relocate = e.parameter.willingToRelocate || '';
    var timestamp = e.parameter.submittedAt || new Date().toISOString();
    
    // Handle file upload
    var resumeLink = '';
    if (e.parameter.resume) {
      var fileBlob = Utilities.newBlob(
        Utilities.base64Decode(e.parameter.resume),
        'application/pdf',
        fullName.replace(/\s+/g, '_') + '_Resume.pdf'
      );
      var folder = getOrCreateFolder('IndiaJobConnect_Resumes');
      var file = folder.createFile(fileBlob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      resumeLink = file.getUrl();
    }
    
    sheet.appendRow([
      timestamp,
      fullName,
      mobile,
      email,
      city,
      jobRole,
      experience,
      salary,
      relocate,
      resumeLink
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Resume submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'IndiaJobConnect API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment**
4. Select type: **Web app**
5. Set **Execute as**: Me
6. Set **Who has access**: Anyone
7. Click **Deploy** and copy the Web App URL

#### c. Configure Environment Variable

1. Copy `.env.example` to `.env` (already done)
2. Paste your Web App URL:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the `dist` folder to Netlify
```

Or connect your GitHub repo to Vercel/Netlify for automatic deployments.

## Folder Structure

```
india_vacancy/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable primitives
│   │   │   ├── Alert.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Spinner.jsx
│   │   │   └── Toggle.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── ResumeForm.jsx
│   │   ├── TrustSection.jsx
│   │   └── WhyChooseUs.jsx
│   ├── services/
│   │   └── submitResume.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

## License

© 2026 IndiaJobConnect. All rights reserved.
