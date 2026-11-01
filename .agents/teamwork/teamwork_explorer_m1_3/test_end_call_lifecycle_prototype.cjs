const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const assert = require('assert');

function startServer() {
  const root = path.resolve(__dirname, '..', '..', '..');
  const server = http.createServer((req, res) => {
    let filePath = path.join(root, req.url.split('?')[0]);
    if (filePath.endsWith('/') || filePath.endsWith('\\')) filePath += 'index.html';
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found: ' + filePath);
      return;
    }
    const ext = path.extname(filePath);
    let ct = 'text/html';
    if (ext === '.js') ct = 'application/javascript';
    if (ext === '.css') ct = 'text/css';
    if (ext === '.json') ct = 'application/json';
    if (ext === '.png') ct = 'image/png';
    res.writeHead(200, { 'Content-Type': ct });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

async function runEndCallLifecycleTest() {
  console.log('===============================================================');
  console.log('TEST: SPEAKING ROOM CLEAN END CALL LIFECYCLE (PUPPETEER E2E)');
  console.log('===============================================================\n');

  const server = await startServer();
  const port = server.address().port;
  console.log(`[Step 0] Local server listening dynamically on http://127.0.0.1:${port}`);

  const tmpDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-m1-endcall-'));
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required',
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      '--enable-speech-api',
      `--user-data-dir=${tmpDataDir}`
    ]
  });

  const screenshotsDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    const consoleLogs = [];
    page.on('console', msg => {
      const txt = msg.text();
      consoleLogs.push(txt);
      if (txt.includes('End Call') || txt.includes('Live voice') || txt.includes('Coach') || txt.includes('Error')) {
        console.log('   [Browser Console]:', txt);
      }
    });

    console.log('[Step 1] Loading index.html and seeding student session...');
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      const testStudent = {
        name: 'Sarah Jenkins',
        admissionNumber: 'MTR777',
        email: 'sarah.j@example.com',
        role: 'student',
        englishLevel: 'INTERMEDIATE',
        learningGoal: 'Professional Fluency',
        status: 'APPROVED'
      };
      const sessionData = {
        user: testStudent,
        role: 'student',
        tab: 'ai_coach'
      };
      localStorage.setItem('mastered_user_session', JSON.stringify(sessionData));
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2500));

    console.log('[Step 2] Finding "Start Live Practice Call (Coach Sarah)" button...');
    const startClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const startBtn = btns.find(b => b.innerText && b.innerText.includes('Start Live Practice Call'));
      if (startBtn) {
        startBtn.click();
        return true;
      }
      return false;
    });
    assert.strictEqual(startClicked, true, 'Start Live Practice Call button must exist and be clickable');
    console.log('✅ Clicked "Start Live Practice Call".');

    // Wait 2500ms for connection and greeting synthesis
    await new Promise(r => setTimeout(r, 2500));

    console.log('[Step 3] Verifying active call state and audio pipeline...');
    const inCallState = await page.evaluate(() => {
      const pipeline = window.__masteredActivePipeline;
      const synth = window.speechSynthesis;
      const btns = Array.from(document.querySelectorAll('button'));
      const endBtn = btns.find(b => b.innerText && b.innerText.includes('End Call'));
      const holdBtn = btns.find(b => b.innerText && (b.innerText.includes('Hold') || b.innerText.includes('Resume')));
      
      return {
        hasPipeline: Boolean(pipeline),
        isSessionActive: pipeline ? pipeline.isSessionActive : false,
        pipelineState: pipeline ? pipeline.state : null,
        hasEndBtn: Boolean(endBtn),
        hasHoldBtn: Boolean(holdBtn),
        synthSpeaking: synth ? synth.speaking : false,
        bodyText: document.body.innerText
      };
    });

    console.log('   Pipeline state in-call:', inCallState.pipelineState);
    console.log('   Pipeline isSessionActive:', inCallState.isSessionActive);
    console.log('   End Call button visible:', inCallState.hasEndBtn);

    assert.strictEqual(inCallState.hasPipeline, true, 'Speech pipeline must be initialized');
    assert.strictEqual(inCallState.isSessionActive, true, 'Live call must be active');
    assert.strictEqual(inCallState.hasEndBtn, true, 'End Call button must be visible');
    console.log('✅ In-call state verified.');

    const screenshot1 = path.join(screenshotsDir, 'm1_1_call_connected.png');
    await page.screenshot({ path: screenshot1 });
    console.log(`   Captured screenshot: ${screenshot1}`);

    // Wait 1500ms
    await new Promise(r => setTimeout(r, 1500));

    console.log('[Step 4] Clicking "End Call" button...');
    const endClicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const endBtn = btns.find(b => b.innerText && b.innerText.includes('End Call'));
      if (endBtn) {
        endBtn.click();
        return true;
      }
      return false;
    });
    assert.strictEqual(endClicked, true, 'End Call button must be clicked');

    // Immediate check after 400ms: All resources must be halted
    await new Promise(r => setTimeout(r, 400));

    console.log('[Step 5] Asserting immediate teardown (<500ms)...');
    const teardownState = await page.evaluate(() => {
      const pipeline = window.__masteredActivePipeline;
      const synth = window.speechSynthesis;
      const btns = Array.from(document.querySelectorAll('button'));
      const endBtn = btns.find(b => b.innerText && b.innerText.includes('End Call'));
      
      return {
        pipelineActive: pipeline ? pipeline.isSessionActive : null,
        pipelineSpeaking: pipeline ? pipeline.isSpeaking : null,
        pipelineState: pipeline ? pipeline.state : null,
        synthSpeaking: synth ? synth.speaking : false,
        synthPending: synth ? synth.pending : false,
        keepAliveActive: Boolean(pipeline && pipeline.speechKeepAliveInterval),
        speakSafetyActive: Boolean(pipeline && pipeline.speakSafetyTimer),
        restartDebounceActive: Boolean(pipeline && pipeline.restartDebounceTimer),
        hasEndBtn: Boolean(endBtn),
        bodyHasSummary: document.body.innerText.includes('Daily Session Completed!') || document.body.innerText.includes('Mission Practice Saved'),
        bodyHasStudentName: document.body.innerText.includes('Sarah Jenkins'),
        bodyHasAdmNum: document.body.innerText.includes('MTR777')
      };
    });

    console.log('   Pipeline isSessionActive after end:', teardownState.pipelineActive);
    console.log('   Pipeline state after end:', teardownState.pipelineState);
    console.log('   SpeechSynthesis speaking:', teardownState.synthSpeaking);
    console.log('   KeepAlive interval active:', teardownState.keepAliveActive);
    console.log('   Safety timer active:', teardownState.speakSafetyActive);
    console.log('   Summary card rendered:', teardownState.bodyHasSummary);

    assert.strictEqual(teardownState.pipelineActive, false, 'Speech pipeline isSessionActive must be false immediately');
    assert.strictEqual(teardownState.synthSpeaking, false, 'SpeechSynthesis must NOT be speaking');
    assert.strictEqual(teardownState.synthPending, false, 'SpeechSynthesis queue must be empty');
    assert.strictEqual(teardownState.pipelineState, 'IDLE', 'Pipeline state must transition to IDLE');
    assert.strictEqual(teardownState.hasEndBtn, false, 'End Call button must be unmounted');
    assert.strictEqual(teardownState.bodyHasSummary, true, 'Session summary card must be displayed');
    assert.strictEqual(teardownState.bodyHasStudentName, true, 'Session summary must show student name');
    assert.strictEqual(teardownState.bodyHasAdmNum, true, 'Session summary must show admission number');
    console.log('✅ Immediate teardown and session summary verified.');

    const screenshot2 = path.join(screenshotsDir, 'm1_2_summary_card.png');
    await page.screenshot({ path: screenshot2 });
    console.log(`   Captured screenshot: ${screenshot2}`);

    console.log('[Step 6] Verifying timer cessation (no creeping ticks)...');
    const timerCheck1 = await page.evaluate(() => document.body.innerText);
    await new Promise(r => setTimeout(r, 1200));
    const timerCheck2 = await page.evaluate(() => document.body.innerText);
    assert.strictEqual(timerCheck1, timerCheck2, 'DOM text must remain stable with no creeping timer increments');
    console.log('✅ Timer cessation verified.');

    console.log('[Step 7] Verifying transition back to Ready to Call or Resumption...');
    const transitionResult = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const readyBtn = btns.find(b => b.innerText && (b.innerText.includes('Practice Level Again') || b.innerText.includes('Ready')));
      const continueBtn = btns.find(b => b.innerText && b.innerText.includes('Continue Live Call'));

      if (readyBtn) {
        readyBtn.click();
        return { action: 'READY_CLICKED' };
      } else if (continueBtn) {
        // Can verify continue button works cleanly
        return { action: 'CONTINUE_FOUND' };
      }
      return { action: 'NONE' };
    });
    console.log('   Action taken on summary card:', transitionResult.action);

    await new Promise(r => setTimeout(r, 1000));
    const screenshot3 = path.join(screenshotsDir, 'm1_3_final_state.png');
    await page.screenshot({ path: screenshot3 });
    console.log(`   Captured screenshot: ${screenshot3}`);

    console.log('\n===============================================================');
    console.log('🎉 ALL CLEAN END CALL LIFECYCLE ASSERTIONS PASSED (100%)');
    console.log('===============================================================\n');

  } finally {
    await browser.close();
    server.close();
    try {
      fs.rmSync(tmpDataDir, { recursive: true, force: true });
    } catch(e) {}
  }
}

runEndCallLifecycleTest().catch(err => {
  console.error('\n❌ TEST FAILED:', err);
  process.exit(1);
});
