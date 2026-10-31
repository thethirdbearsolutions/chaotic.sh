/**
 * Speed budget (CHT-1898): the web UI bar in VISION.md, measured in a real
 * browser at 1440x900 against a seeded project (see seed.mjs, run.sh).
 *
 *   node speed/speed-budget.mjs http://127.0.0.1:24399 speed/.seed.json
 *
 * Each timing is the median of RUNS tries, from the user's action to the
 * first frame that shows its result. Exits 1 if any budget is missed.
 * SPEED_BUDGET_MS overrides the 100 ms budget, e.g. on a slow machine.
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const [base = 'http://127.0.0.1:24399', seedPath = 'speed/.seed.json'] = process.argv.slice(2);
const { token, projectId } = JSON.parse(readFileSync(seedPath, 'utf8'));
const BUDGET_MS = Number(process.env.SPEED_BUDGET_MS || 100);
const RUNS = 5;
const MIN_ROWS = 25;

const results = [];
function record(name, value, ok, detail) {
    results.push({ name, value, ok, detail });
}
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

// Resolves with the ms from `start` to the first frame where `done()` holds.
const untilFrame = `(done) => new Promise((resolve, reject) => {
    const start = performance.now();
    const limit = start + 10000;
    const check = () => {
        if (done()) resolve(performance.now() - start);
        else if (performance.now() > limit) reject(new Error('timed out'));
        else requestAnimationFrame(check);
    };
    check();
})`;

// Wait for real conditions, not fixed sleeps (CHT-1898 review I6): no
// request in flight, and no rows still queued for the chunked paint.
async function settle(page) {
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => !document.querySelector('#issue-detail-view:not(.hidden) .detail-from-row'));
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 50))));
}

const browser = await chromium.launch();
try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript((t) => localStorage.setItem('chaotic_token', t), token);
    await page.goto(`${base}/issues?project=${projectId}`);
    await page.waitForSelector('#issues-list .issue-row', { timeout: 30000 });
    await settle(page);
    await page.addScriptTag({ content: `window.__untilFrame = ${untilFrame};` });

    // Dense: rows fully inside the viewport
    const visible = await page.evaluate(() => [...document.querySelectorAll('#issues-list .issue-row')]
        .filter((r) => { const b = r.getBoundingClientRect(); return b.top >= 0 && b.bottom <= innerHeight; }).length);
    record('rows visible at 1440x900', visible, visible >= MIN_ROWS, `>= ${MIN_ROWS}`);

    // No dropped keystrokes: a burst of j moves the cursor once per press
    await page.mouse.move(720, 600);
    await page.evaluate(() => window.scrollTo(0, 0));
    const presses = 30;
    for (let i = 0; i < presses; i++) await page.keyboard.press('j');
    await page.waitForTimeout(300);
    const index = await page.evaluate(() => [...document.querySelectorAll('#issues-list .issue-row')]
        .findIndex((r) => r.classList.contains('keyboard-selected')));
    record(`cursor after ${presses} j presses`, index, index === presses - 1, `== ${presses - 1}`);
    for (let i = 0; i < presses; i++) await page.keyboard.press('k');

    const open = [];
    const back = [];
    for (let run = 0; run < RUNS; run++) {
        // Open an issue from the list
        open.push(await page.evaluate((n) => {
            const link = document.querySelectorAll('#issues-list .issue-row .issue-title')[n];
            const title = link.textContent.trim();
            const p = window.__untilFrame(() => {
                const h = document.querySelector('#issue-detail-view:not(.hidden) .issue-detail-title');
                return h && h.textContent.trim() === title;
            });
            link.click();
            return p;
        }, run * 2));
        await settle(page); // the full detail has landed, so Back can't race it
        await page.addScriptTag({ content: `window.__untilFrame = window.__untilFrame || ${untilFrame};` });
        // Back to the list
        back.push(await page.evaluate(() => {
            const p = window.__untilFrame(() => {
                const view = document.getElementById('issues-view');
                return view && !view.classList.contains('hidden') && !!document.querySelector('#issues-list .issue-row');
            });
            history.back();
            return p;
        }));
        await settle(page);
    }

    // Back keeps the reader's place in a long list (CHT-1897 review C1)
    await page.evaluate(() => window.scrollTo(0, 6000));
    await page.waitForTimeout(100);
    const before = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => {
        const rows = [...document.querySelectorAll('#issues-list .issue-row')];
        rows.find((r) => r.getBoundingClientRect().top > 100).querySelector('.issue-title').click();
    });
    await settle(page);
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => !document.getElementById('issues-view').classList.contains('hidden'));
    await settle(page);
    const after = await page.evaluate(() => window.scrollY);
    record('scroll position after Back (px)', after, Math.abs(after - before) <= 2, `== ${before}`);

    record('open an issue from the list (median ms)', Math.round(median(open)), median(open) <= BUDGET_MS, `<= ${BUDGET_MS}`);
    record('Back to the list (median ms)', Math.round(median(back)), median(back) <= BUDGET_MS, `<= ${BUDGET_MS}`);
} finally {
    await browser.close();
}

let failed = false;
for (const r of results) {
    console.log(`${r.ok ? 'ok  ' : 'FAIL'}  ${r.name}: ${r.value} (budget ${r.detail})`);
    if (!r.ok) failed = true;
}
process.exit(failed ? 1 : 0);
