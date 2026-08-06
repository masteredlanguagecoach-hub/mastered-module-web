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
