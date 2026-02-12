/**
 * Integration smoke test for the full app bundle.
 *
 * Loads all source modules (as they would be in the built bundle) in a jsdom
 * environment with the actual HTML template. Verifies:
 *   - No ReferenceErrors during initialization
 *   - Key window exports exist and are functions
 *   - DOM elements referenced by modules are present
 *   - Import list matches main.js (no drift)
 *
 * This test would have caught CHT-707 (commandPaletteOpen ReferenceError).
 *
 * NOTE: Relies on Vitest's default per-file worker isolation. ES module
 * imports are cached within a single worker, so this test exercises module
 * initialization exactly once per test run.
 *
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Integration smoke test', () => {
    let errorSpy;

    beforeAll(async () => {
        // Spy on console.error to capture initialization errors (C3: auto-restored)
        errorSpy = vi.spyOn(console, 'error');

        // Mock fetch (used by api.js on load)
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true, status: 200,
            json: async () => ({}),
        }));

        // Mock WebSocket (used by app.js)
        vi.stubGlobal('WebSocket', vi.fn(() => ({
            addEventListener: vi.fn(),
            close: vi.fn(),
            send: vi.fn(),
        })));

        // Mock localStorage
        const storage = {};
        vi.stubGlobal('localStorage', {
            getItem: vi.fn((key) => storage[key] || null),
            setItem: vi.fn((key, val) => { storage[key] = val; }),
            removeItem: vi.fn((key) => { delete storage[key]; }),
        });

        // Load the HTML template to provide DOM elements
        const templatePath = path.resolve(__dirname, '..', 'templates', 'index.html');
        const html = fs.readFileSync(templatePath, 'utf-8');
        const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
        expect(bodyMatch).not.toBeNull(); // C8: fail early if template is unparseable
        document.body.innerHTML = bodyMatch[1];

        // Make marked and DOMPurify available globally (as main.js does)
        const { marked } = await import('marked');
        const DOMPurify = (await import('dompurify')).default;
        window.marked = marked;
        window.DOMPurify = DOMPurify;
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    it('import list matches main.js (no drift)', () => {
        // C5: Dynamically read main.js to detect import list drift
        const mainPath = path.resolve(__dirname, 'main.js');
        const mainSource = fs.readFileSync(mainPath, 'utf-8');

        // Extract relative imports (import './foo.js')
        const importPattern = /import\s+['"]\.\/([^'"]+)['"]/g;
        const mainImports = [];
        let match;
        while ((match = importPattern.exec(mainSource)) !== null) {
            mainImports.push(`./${match[1]}`);
        }

        // These are the modules we import below — must match main.js
        const testImports = [
            './api.js', './ui.js', './auth.js', './documents.js', './agents.js',
            './teams.js', './projects.js', './rituals.js', './gate-approvals.js',
            './api-keys.js', './command-palette.js', './dashboard.js', './app.js',
        ];

        expect(testImports).toEqual(mainImports);
    });

    it('loads all source modules without errors', async () => {
        // C10: Wrap each import individually to report all failures
        const modules = [
            './api.js', './ui.js', './auth.js', './documents.js', './agents.js',
            './teams.js', './projects.js', './rituals.js', './gate-approvals.js',
            './api-keys.js', './command-palette.js', './dashboard.js', './app.js',
        ];

        const importErrors = [];
        for (const mod of modules) {
            try {
                await import(mod);
            } catch (e) {
                importErrors.push(`${mod}: ${e.name}: ${e.message}`);
            }
        }

        expect(importErrors).toEqual([]);

        // C2: Flush async init (DOMContentLoaded fires synchronously in jsdom
        // when readyState is already 'complete', but subsequent async work like
        // initApp -> loadTeams -> api calls need microtask flushing)
        await new Promise(r => setTimeout(r, 0));
    });

    it('exports essential functions to window', () => {
        // Smoke-check a handful of critical exports.
        // For comprehensive coverage, see window-exports.test.js.
        const essentialExports = [
            'navigateTo',
            'showModal',
            'closeModal',
            'showToast',
            'showCreateIssueModal',
            'showLogin',
            'showSignup',
            'handleLogin',
            'handleSignup',
            'logout',
        ];

        const missing = essentialExports.filter(fn => typeof window[fn] !== 'function');
        expect(missing).toEqual([]);
    });

    it('exports API client to window', () => {
        expect(window.api).toBeDefined();
        expect(typeof window.api.request).toBe('function');
    });

    it('has no initialization errors', () => {
        // C4: Check all console.error calls for error objects or error-like messages
        const realErrors = errorSpy.mock.calls.filter(args => {
            return args.some(arg => {
                if (arg instanceof Error) return true;
                if (typeof arg === 'string') {
                    return /Error:|is not defined|is not a function|Cannot read prop/i.test(arg);
                }
                return false;
            });
        });

        if (realErrors.length > 0) {
            const messages = realErrors.map(args => args.join(' '));
            expect(messages).toEqual([]);
        }
    });

    it('has required DOM elements for keyboard handler', () => {
        expect(document.getElementById('modal-overlay')).not.toBeNull();
        expect(document.getElementById('team-dropdown')).not.toBeNull();
        expect(document.getElementById('user-dropdown')).not.toBeNull();
    });

    it('has required DOM elements for navigation', () => {
        expect(document.getElementById('auth-screen')).not.toBeNull();
        expect(document.getElementById('main-screen')).not.toBeNull();
    });
});
