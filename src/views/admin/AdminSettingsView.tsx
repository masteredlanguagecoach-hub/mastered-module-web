import React, { useState } from 'react';
import { SystemSettings } from '../../types';
import { getAppsScriptUrl, setAppsScriptUrl } from '../../lib/api';
import { Settings, ShieldCheck, Database, CheckCircle2, RefreshCw, Globe } from 'lucide-react';

export const AdminSettingsView: React.FC = () => {
  const [url, setUrl] = useState(getAppsScriptUrl());
  const [spreadsheetId, setSpreadsheetId] = useState("1N5YkP6U8RaafRD_bsULTzlaDSC0Vbmfj9l_XCt1S_Rg");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setAppsScriptUrl(url);
    alert("System Integration settings saved! App will now route through the configured Google Apps Script Web App.");
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    if (!url) {
      setTestResult({ success: false, message: "No Apps Script URL entered. Currently running in Mock engine mode." });
      setTesting(false);
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action: "ping" })
      });
      const json = await res.json();
      if (json.success) {
        setTestResult({ success: true, message: "Connected successfully to Google Apps Script REST API & Google Sheets!" });
      } else {
        setTestResult({ success: false, message: json.message || "Endpoint reached but returned an error status." });
      }
    } catch (err: any) {
      setTestResult({ success: false, message: `Connection test failed: ${err.message}` });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mb-2">
          <Settings className="w-3.5 h-3.5 mr-1.5" /> Integration Hub
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Google Apps Script & Sheet Settings</h2>
        <p className="text-xs text-slate-500 mt-1">Configure your live Google Apps Script Web App URL and test live database connectivity.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleSave} className="space-y-5 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Google Apps Script Web App URL (doGet/doPost Endpoint)</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
              className="w-full p-3 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Paste the Web App URL generated after deploying <code>Code.gs</code> in Google Apps Script as "Anyone".
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1 flex items-center space-x-1">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Target Google Spreadsheet ID</span>
            </label>
            <input
              type="text"
              value={spreadsheetId}
              onChange={e => setSpreadsheetId(e.target.value)}
              placeholder="1A2B3C4D5E6F7G8H9I0J"
              className="w-full p-3 rounded-xl border border-slate-200 font-mono text-xs focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              The unique Google Sheet key found in your spreadsheet URL (between <code>/d/</code> and <code>/edit</code>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30"
            >
              Save Configuration
            </button>

            <button
              type="button"
              onClick={handleTestConnection}
              disabled={testing}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>Test API Connection</span>
            </button>
          </div>
        </form>

        {testResult && (
          <div className={`p-4 rounded-2xl border text-xs ${
            testResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <p className="font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1.5 shrink-0" />
              {testResult.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
