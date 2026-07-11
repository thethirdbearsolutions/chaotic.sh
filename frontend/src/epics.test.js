/**
 * Tests for epics module (CHT-831)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the api module
vi.mock('./api.js', () => ({
    api: {
        getTeamIssues: vi.fn(),
        getSubIssues: vi.fn(),
    },
}));

// Mock the router module
vi.mock('./router.js', () => ({
    navigateToEpicByIdentifier: vi.fn(),
}));

// Mock the utils module
vi.mock('./utils.js', () => ({
    escapeHtml: (s) => s != null ? String(s) : '',
    escapeAttr: (s) => s != null ? String(s) : '',
}));

// CHT-1226: loadEpics()'s catch block now calls showApiError(); without
// this mock it hits the real showToast(), which throws on the missing
// #toast-container in this file's minimal test DOM.
vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
    showApiError: vi.fn(),
}));

import { setCurrentTeam, getSelectedEpicIndex, setSelectedEpicIndex } from './state.js';
import { loadEpics, renderEpics, getCurrentEpics } from './epics.js';
import { api } from './api.js';
import { navigateToEpicByIdentifier } from './router.js';
import { showApiError } from './ui.js';

function setupDom() {
    document.body.innerHTML = '<div id="epics-list"></div>';
}

describe('loadEpics', () => {
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        setCurrentTeam({ id: 'team-1' });
    });

    it('resets the keyboard cursor on (re)load (CHT-1291 review)', async () => {
        api.getTeamIssues.mockResolvedValue([]);
        setSelectedEpicIndex(5);
        await loadEpics();
        expect(getSelectedEpicIndex()).toBe(-1);
    });

    it('shows empty state when no epics exist', async () => {
        api.getTeamIssues.mockResolvedValue([]);

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('No epics found');
        expect(el.innerHTML).toContain('Create epic');
    });

    it('renders epics with progress bars', async () => {
        const epics = [
            { id: 'e1', identifier: 'CHT-10', title: 'Auth Epic', status: 'in_progress', estimate: 8 },
            { id: 'e2', identifier: 'CHT-20', title: 'Search Epic', status: 'todo', estimate: 5 },
        ];
        api.getTeamIssues.mockResolvedValue(epics);
        api.getSubIssues.mockImplementation((id) => {
            if (id === 'e1') {
                return Promise.resolve([
                    { id: 's1', status: 'done' },
                    { id: 's2', status: 'in_progress' },
                    { id: 's3', status: 'done' },
                ]);
            }
            return Promise.resolve([]);
        });

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('CHT-10');
        expect(el.innerHTML).toContain('Auth Epic');
        expect(el.innerHTML).toContain('2/3');
        expect(el.innerHTML).toContain('CHT-20');
        expect(el.innerHTML).toContain('Search Epic');
        // Verify team_id + issue_type=epic was passed
        expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', { issue_type: 'epic' });
    });

    it('shows dash for progress when no sub-issues', async () => {
        api.getTeamIssues.mockResolvedValue([
            { id: 'e1', identifier: 'CHT-10', title: 'Empty Epic', status: 'backlog', estimate: null },
        ]);
        api.getSubIssues.mockResolvedValue([]);

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('CHT-10');
        // Progress text should show dash
        const progressTexts = el.querySelectorAll('.epic-progress-text');
        expect(progressTexts[0].textContent).toBe('-');
    });

    it('handles sub-issues API failure gracefully', async () => {
        api.getTeamIssues.mockResolvedValue([
            { id: 'e1', identifier: 'CHT-10', title: 'Failing Epic', status: 'in_progress', estimate: 3 },
        ]);
        api.getSubIssues.mockRejectedValue(new Error('Not supported'));

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('CHT-10');
        // Should render with dash progress, not crash
        const progressTexts = el.querySelectorAll('.epic-progress-text');
        expect(progressTexts[0].textContent).toBe('-');
    });

    it('handles API failure loading epics', async () => {
        api.getTeamIssues.mockRejectedValue(new Error('Network error'));

        await loadEpics();

        const el = document.getElementById('epics-list');
        // CHT-1226: standardized on renderEmptyState(); the raw exception
        // message no longer leaks into the DOM (showApiError, mocked
        // above, is the toast surface for that instead).
        expect(el.innerHTML).toContain('Failed to load epics');
        expect(el.innerHTML).toContain('empty-state-icon');
        expect(el.innerHTML).not.toContain('Network error');
        expect(el.innerHTML).toContain('data-action="retry-load-epics"');
        expect(showApiError).toHaveBeenCalledWith('load epics', expect.any(Error));
    });

    it('shows a standardized empty state (no raw div) when no team is selected', async () => {
        setCurrentTeam(null);

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('Select a team');
        expect(el.innerHTML).toContain('empty-state-icon');
    });

    it('shows complete progress bar style when all done', async () => {
        api.getTeamIssues.mockResolvedValue([
            { id: 'e1', identifier: 'CHT-10', title: 'Done Epic', status: 'done', estimate: 5 },
        ]);
        api.getSubIssues.mockResolvedValue([
            { id: 's1', status: 'done' },
            { id: 's2', status: 'done' },
        ]);

        await loadEpics();

        const el = document.getElementById('epics-list');
        const fill = el.querySelector('.epic-progress-fill');
        expect(fill.classList.contains('epic-progress-complete')).toBe(true);
        expect(fill.style.width).toBe('100%');
    });

    it('counts canceled as done for progress', async () => {
        api.getTeamIssues.mockResolvedValue([
            { id: 'e1', identifier: 'CHT-10', title: 'Mixed Epic', status: 'in_progress', estimate: 5 },
        ]);
        api.getSubIssues.mockResolvedValue([
            { id: 's1', status: 'done' },
            { id: 's2', status: 'canceled' },
            { id: 's3', status: 'todo' },
        ]);

        await loadEpics();

        const el = document.getElementById('epics-list');
        const progressTexts = el.querySelectorAll('.epic-progress-text');
        expect(progressTexts[0].textContent).toBe('2/3');
    });

    // CHT-1211 review #3: same monotonic-request-id protection as the other
    // list loaders — a stale response from a superseded loadEpics() call
    // (rapid project switching) must not overwrite newer data.
    describe('request sequencing (out-of-order responses)', () => {
        it('drops a slow response from an earlier project switch', async () => {
            let resolveFirst;
            const staleEpics = [{ id: 'stale', identifier: 'CHT-1', title: 'Stale Epic', status: 'todo' }];
            const freshEpics = [{ id: 'fresh', identifier: 'CHT-2', title: 'Fresh Epic', status: 'todo' }];
            api.getSubIssues.mockResolvedValue([]);

            api.getTeamIssues.mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }));
            const firstLoad = loadEpics(); // in flight, slow

            api.getTeamIssues.mockImplementationOnce(() => Promise.resolve(freshEpics));
            await loadEpics(); // resolves first (faster)

            expect(getCurrentEpics().map(e => e.id)).toEqual(['fresh']);

            // The slow first request now resolves — must be dropped
            resolveFirst(staleEpics);
            await firstLoad;

            expect(getCurrentEpics().map(e => e.id)).toEqual(['fresh']);
            expect(document.getElementById('epics-list').innerHTML).toContain('Fresh Epic');
            expect(document.getElementById('epics-list').innerHTML).not.toContain('Stale Epic');
        });
    });

    // CHT-1211 item 6: epic-detail-view.js's prev/next reads this list
    describe('getCurrentEpics', () => {
        it('exposes the last-loaded epics list', async () => {
            api.getTeamIssues.mockResolvedValue([
                { id: 'e1', identifier: 'CHT-10', title: 'Auth Epic', status: 'todo', estimate: 3 },
            ]);
            api.getSubIssues.mockResolvedValue([]);

            await loadEpics();

            expect(getCurrentEpics().map(e => e.id)).toEqual(['e1']);
        });

        it('clears to empty array when the list is empty', async () => {
            api.getTeamIssues.mockResolvedValue([
                { id: 'e1', identifier: 'CHT-10', title: 'Auth Epic', status: 'todo', estimate: 3 },
            ]);
            api.getSubIssues.mockResolvedValue([]);
            await loadEpics();
            expect(getCurrentEpics().length).toBe(1);

            api.getTeamIssues.mockResolvedValue([]);
            await loadEpics();

            expect(getCurrentEpics()).toEqual([]);
        });
    });
});

describe('renderEpics', () => {
    beforeEach(() => {
        setupDom();
    });

    it('renders table with correct structure', () => {
        const container = document.getElementById('epics-list');
        const epics = [
            {
                id: 'e1',
                identifier: 'CHT-10',
                title: 'Test Epic',
                status: 'in_progress',
                estimate: 8,
                subIssues: [{ status: 'done' }, { status: 'todo' }],
            },
        ];

        renderEpics(epics, container);

        expect(container.querySelector('table')).toBeTruthy();
        expect(container.querySelector('thead')).toBeTruthy();
        expect(container.querySelector('tbody')).toBeTruthy();
        expect(container.querySelectorAll('th').length).toBe(5);
        expect(container.querySelector('.epic-row')).toBeTruthy();
    });

    it('shows estimate as pts when present', () => {
        const container = document.getElementById('epics-list');
        renderEpics([{
            id: 'e1', identifier: 'CHT-1', title: 'E', status: 'todo', estimate: 13,
            subIssues: [],
        }], container);

        expect(container.querySelector('.epic-estimate').textContent).toBe('13pts');
    });

    it('shows dash for estimate when null', () => {
        const container = document.getElementById('epics-list');
        renderEpics([{
            id: 'e1', identifier: 'CHT-1', title: 'E', status: 'todo', estimate: null,
            subIssues: [],
        }], container);

        expect(container.querySelector('.epic-estimate').textContent).toBe('-');
    });

    it('navigates to epic on row click via event delegation', () => {
        const container = document.getElementById('epics-list');
        renderEpics([{
            id: 'e1', identifier: 'CHT-10', title: 'Clickable Epic', status: 'todo', estimate: 5,
            subIssues: [],
        }], container);

        const row = container.querySelector('.epic-row');
        expect(row.dataset.identifier).toBe('CHT-10');
        row.click();
        expect(navigateToEpicByIdentifier).toHaveBeenCalledWith('CHT-10');
    });

    it('uses data-identifier attribute instead of inline onclick', () => {
        const container = document.getElementById('epics-list');
        renderEpics([{
            id: 'e1', identifier: 'CHT-10', title: 'Safe Epic', status: 'todo', estimate: 5,
            subIssues: [],
        }], container);

        const row = container.querySelector('.epic-row');
        // No inline onclick — uses data attribute + event delegation
        expect(row.getAttribute('onclick')).toBeNull();
        expect(row.dataset.identifier).toBe('CHT-10');
    });
});
