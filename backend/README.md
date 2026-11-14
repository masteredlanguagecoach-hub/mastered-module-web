# MASTERED Language Coach - Google Sheets & Google Apps Script Setup Guide

Follow this simple guide to deploy your secure backend using **Google Sheets** as your database and **Google Apps Script** as your API.

---

## 1. Create Google Sheet

1. Open [Google Sheets](https://sheets.google.com) and create a **Blank Spreadsheet**.
2. Name the sheet: `MASTERED Language Coach Database`.
3. Copy the **Spreadsheet ID** from your browser URL bar:
   `https://docs.google.com/spreadsheets/d/` **`1A2B3C4D5E6F7G8H9I0J`** `/edit`

---

## 2. Setup Google Apps Script Project

1. Inside your Google Sheet, click **Extensions** → **Apps Script**.
2. In the Apps Script Editor:
   - Create a file named `Code.gs` and paste the contents of `backend/Code.gs`.
   - Create a file named `Setup.gs` and paste the contents of `backend/Setup.gs`.
3. Select `setupMasteredDatabase` from the function dropdown and click **Run**.
   - Grant the required permissions when prompted.
   - This will automatically create all **12 sheets** (`Admins`, `Students`, `Requests`, `Modules`, `Quiz`, `Questions`, `Quiz Results`, `Progress`, `Announcements`, `Settings`, `Sessions`, `Logs`) with pre-populated headers and demo rows!

---

## 3. Deploy REST API Web App

1. Click **Deploy** → **New deployment**.
2. Click the gear icon ⚙️ and select **Web app**.
3. Configure the deployment settings:
   - **Description**: `MASTERED Language Coach REST API`
   - **Execute as**: `Me (your Google account)`
   - **Who has access**: `Anyone` *(Crucial for frontend fetch requests)*
4. Click **Deploy**.
5. Copy the generated **Web App URL**:
   `https://script.google.com/macros/s/AKfycb.../exec`

---

## 4. Connect Web App to Frontend

1. Log into your **MASTERED Language Coach Admin Portal** (`admin@mastered.com` / `admin123`).
2. Go to **Settings** in the Admin Sidebar.
3. Paste your **Web App URL** and click **Save Configuration** & **Test API Connection**.
4. You are now running live on your Google Sheets & Apps Script infrastructure!

---

## 5. Updating an Existing Deployment & Sanitizing Database

Whenever `backend/Code.gs` is updated with bug fixes or improvements, follow these steps:

### Step 5.1: Copy Updated Code
1. Open your Google Sheet and click **Extensions** → **Apps Script**.
2. Open `Code.gs` in the editor.
3. Replace the entire contents with the updated `backend/Code.gs` file.
4. Click **Save** (💾 or `Ctrl+S`).

### Step 5.2: Create and Deploy New Version (Required)
Google Apps Script requires publishing a **New Version** for changes to take effect on the Web App URL:
1. Click **Deploy** → **Manage deployments** (top right).
2. Click the **Edit** icon (pencil ✏️) next to the active Web App deployment.
3. In the **Version** dropdown, select **New version**.
4. Enter a description, e.g. `M4 Reliable DB Persistence, Concurrency Locks & Active updateProgress`.
5. Ensure **Execute as** is `Me` and **Who has access** is `Anyone`.
6. Click **Deploy**.
7. Your existing Web App URL remains unchanged and now runs the latest logic!

### Step 5.3: Concurrency Locks & Active Update Handlers (Milestone 4 Updates)
The updated `backend/Code.gs` introduces enterprise-grade concurrency and persistence guarantees:
- **LockService Concurrency Locks**: Every write action (`saveStudentProgress`, `updateProgress`, `submitQuizScore`) acquires a 15,000 ms script lock (`LockService.getScriptLock().waitLock(15000)`) and safely releases it in a `finally` block (`lock.releaseLock()`). This eliminates concurrent race condition corruptions when students complete missions simultaneously.
- **Active `updateProgress` Writes**: Directly updates module progress rows in the `StudentProgress` sheet for both full map payloads and discrete module updates (`{ admissionNumber, moduleNumber, percentage, verifiedSentences, status }`).
- **Non-Destructive Sanitizer**: Valid completed missions (`status === 'COMPLETED'` or `aiMissionCompleted === true`) are strictly preserved even when `verifiedSentences` is omitted or null, while legacy fake 100% cascade artifacts are safely cleaned.

### Step 5.4: Clean Existing Database Fake 100% Cascade Progress
To clean legacy fake 100% completions in existing Google Sheets database rows:
- **Option A (From Apps Script Editor):**
  1. In the function dropdown at the top, select `adminCleanAllFakeProgress`.
  2. Click **Run**.
  3. Inspect the Execution Log to view how many student records were sanitized.
- **Option B (From Admin Portal UI):**
  1. Log into the portal as Admin.
  2. Go to **Student Directory** (`activeTab === 'admin-students'`).
  3. Click **"🧹 Clean Database Fake 100%"**.
  4. The system will sanitize the Google Sheets database live and refresh real student progress.

