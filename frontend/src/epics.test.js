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

import { loadEpics, renderEpics } from './epics.js';
import { api } from './api.js';
import { navigateToEpicByIdentifier } from './router.js';

function setupDom() {
    document.body.innerHTML = '<div id="epics-list"></div>';
}

describe('loadEpics', () => {
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        window.currentTeam = { id: 'team-1' };
    });

    it('shows empty state when no epics exist', async () => {
        api.getTeamIssues.mockResolvedValue([]);

        await loadEpics();

        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('No epics found');
        expect(el.innerHTML).toContain('chaotic epic create');
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
        expect(el.innerHTML).toContain('Failed to load epics');
        expect(el.innerHTML).toContain('Network error');
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
