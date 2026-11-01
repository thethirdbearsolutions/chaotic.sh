/**
 * Tests for epics module (CHT-831, CHT-1902)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the api module
vi.mock('./api.js', () => ({
    api: {
        getTeamEpicProgress: vi.fn(),
        getProjectEpicProgress: vi.fn(),
    },
}));

// Mock the router module
vi.mock('./router.js', () => ({
    navigateToEpicByIdentifier: vi.fn(),
}));

// utils.js is real, so the escaping test below exercises the real escapers.

// CHT-1226: loadEpics()'s catch block now calls showApiError(); without
// this mock it hits the real showToast(), which throws on the missing
// #toast-container in this file's minimal test DOM.
vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
    showApiError: vi.fn(),
}));

import { setCurrentTeam, setCurrentProject, getSelectedEpicIndex, setSelectedEpicIndex } from './state.js';
import { loadEpics, renderEpics, renderSprintStrip, getCurrentEpics, resetEpicsViewState, renderSummary, pctLabel } from './epics.js';
import { api } from './api.js';
import { navigateToEpicByIdentifier } from './router.js';
import { showApiError } from './ui.js';

function setupDom() {
    document.body.innerHTML = '<div id="epics-list"></div>';
}

const sprints = (pointsList) => pointsList.map((p, i) => ({
    sprint_id: `s${i}`, name: `Sprint ${i + 1}`,
    status: i === pointsList.length - 1 ? 'active' : 'completed',
    closed: p ? 1 : 0, points: p,
}));

const epic = (overrides = {}) => ({
    id: 'e1', identifier: 'CHT-10', title: 'Auth Epic', status: 'in_progress',
    status_pinned: false, priority: 'high', estimate: null,
    project_id: 'p1', project_key: 'CHT',
    children: { total: 4, backlog: 0, todo: 1, in_progress: 1, in_review: 0, done: 2, canceled: 0 },
    open_children: 2, points_total: 8, points_done: 5,
    closed_this_sprint: 1, points_this_sprint: 3,
    sprints: sprints([0, 2, 3]),
    ...overrides,
});

const untracked = (overrides = {}) => ({
    project_id: 'p1', project_key: 'CHT', open: 7,
    closed_this_sprint: 2, points_this_sprint: 2, sprints: sprints([1, 0, 2]),
    ...overrides,
});

const response = (epics, gaps = []) => ({ epics, untracked: gaps, sprint_window: 8 });

describe('loadEpics', () => {
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        setCurrentTeam({ id: 'team-1' });
        setCurrentProject(null);
    });

    it('resets the keyboard cursor on (re)load (CHT-1291 review)', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([]));
        setSelectedEpicIndex(5);
        await loadEpics();
        expect(getSelectedEpicIndex()).toBe(-1);
    });

    it('shows empty state when no epics exist', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([], [untracked()]));
        await loadEpics();
        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('No epics found');
        expect(el.innerHTML).toContain('Create epic');
    });

    it('reads the team-wide endpoint once, with no per-epic fetches', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([epic(), epic({ id: 'e2', identifier: 'CHT-20', title: 'Search Epic' })]));
        await loadEpics();
        const el = document.getElementById('epics-list');
        expect(api.getTeamEpicProgress).toHaveBeenCalledTimes(1);
        expect(api.getTeamEpicProgress).toHaveBeenCalledWith('team-1');
        expect(el.innerHTML).toContain('Auth Epic');
        expect(el.innerHTML).toContain('Search Epic');
    });

    it('reads the project endpoint when a project is selected', async () => {
        setCurrentProject('p1');
        api.getProjectEpicProgress.mockResolvedValue(response([epic()]));
        await loadEpics();
        expect(api.getProjectEpicProgress).toHaveBeenCalledWith('p1');
        expect(api.getTeamEpicProgress).not.toHaveBeenCalled();
    });

    it('handles API failure loading epics', async () => {
        api.getTeamEpicProgress.mockRejectedValue(new Error('Network error'));
        await loadEpics();
        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('Failed to load epics');
        expect(el.innerHTML).toContain('empty-state-icon');
        expect(el.innerHTML).not.toContain('Network error');
        expect(el.innerHTML).toContain('data-action="retry-load-epics"');
        expect(showApiError).toHaveBeenCalledWith('load epics', expect.any(Error));
    });

    it('shows a standardized empty state when no team is selected', async () => {
        setCurrentTeam(null);
        await loadEpics();
        const el = document.getElementById('epics-list');
        expect(el.innerHTML).toContain('Select a team');
        expect(el.innerHTML).toContain('empty-state-icon');
    });

    // CHT-1211 review #3: a stale response from a superseded call is dropped.
    it('drops a slow response from an earlier project switch', async () => {
        let resolveFirst;
        api.getTeamEpicProgress.mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }));
        const firstLoad = loadEpics();
        api.getTeamEpicProgress.mockImplementationOnce(() => Promise.resolve(response([epic({ id: 'fresh', title: 'Fresh Epic' })])));
        await loadEpics();
        expect(getCurrentEpics().map(e => e.id)).toEqual(['fresh']);

        resolveFirst(response([epic({ id: 'stale', title: 'Stale Epic' })]));
        await firstLoad;
        expect(getCurrentEpics().map(e => e.id)).toEqual(['fresh']);
        expect(document.getElementById('epics-list').innerHTML).not.toContain('Stale Epic');
    });

    it('clears getCurrentEpics when the list is empty', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([epic()]));
        await loadEpics();
        expect(getCurrentEpics().length).toBe(1);
        api.getTeamEpicProgress.mockResolvedValue(response([]));
        await loadEpics();
        expect(getCurrentEpics()).toEqual([]);
    });
});

describe('renderEpics', () => {
    let container;
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        resetEpicsViewState();
        container = document.getElementById('epics-list');
    });

    it('renders the progress table', () => {
        renderEpics(response([epic()]), container);
        expect(container.querySelectorAll('thead th').length).toBe(6);
        const row = container.querySelector('.epic-row');
        expect(row.querySelector('.epic-progress-text').textContent).toBe('2/4');
        expect(row.querySelector('.epic-progress-fill').style.width).toBe('50%');
        expect(row.querySelector('.epic-progress-active').style.width).toBe('25%');
        expect(row.querySelector('.epic-points').textContent).toBe('5/8 pts');
        expect(row.querySelector('.epic-sprint').textContent).toContain('+1');
        expect(row.querySelector('.epic-sprint').textContent).toContain('3 pts');
    });

    it('leaves canceled tickets out of the progress total', () => {
        renderEpics(response([epic({
            children: { total: 3, backlog: 0, todo: 0, in_progress: 0, in_review: 0, done: 2, canceled: 1 },
        })]), container);
        const fill = container.querySelector('.epic-progress-fill');
        expect(container.querySelector('.epic-progress-text').textContent).toBe('2/2');
        expect(fill.classList.contains('epic-progress-complete')).toBe(true);
    });

    it('says so when an epic has no tickets', () => {
        renderEpics(response([epic({
            children: { total: 0, backlog: 0, todo: 0, in_progress: 0, in_review: 0, done: 0, canceled: 0 },
            points_total: 0, points_done: 0, closed_this_sprint: 0,
        })]), container);
        expect(container.querySelector('.epic-progress-text').textContent).toBe('No tickets');
        expect(container.querySelector('.epic-points').textContent).toBe('-');
        expect(container.querySelector('.epic-sprint').textContent).toBe('-');
    });

    it('marks a hand-set status on an open epic', () => {
        renderEpics(response([epic({ status_pinned: true })]), container);
        expect(container.querySelector('.epic-status-pinned-mark')).toBeTruthy();
    });

    it('shows the untracked row, which the keyboard cursor skips', () => {
        renderEpics(response([epic()], [untracked()]), container);
        const gap = container.querySelector('.epic-untracked-row');
        expect(gap.textContent).toContain('No epic');
        expect(gap.textContent).toContain('7 open tickets');
        expect(gap.classList.contains('epic-row')).toBe(false);
    });

    it('omits an untracked row with nothing in it', () => {
        renderEpics(response([epic()], [untracked({ open: 0, closed_this_sprint: 0, sprints: sprints([0, 0]) })]), container);
        expect(container.querySelector('.epic-untracked-row')).toBeNull();
    });

    it('groups by project team-wide', () => {
        renderEpics(response(
            [epic(), epic({ id: 'e2', identifier: 'WEB-3', project_id: 'p2', project_key: 'WEB' })],
            [untracked(), untracked({ project_id: 'p2', project_key: 'WEB' })],
        ), container);
        const groups = [...container.querySelectorAll('.epic-group-row')].map(r => r.textContent.trim());
        expect(groups).toEqual(['CHT', 'WEB']);
        expect(container.querySelectorAll('.epic-untracked-row').length).toBe(2);
    });

    it('hides closed epics until asked, and prev/next follows what is shown', () => {
        renderEpics(response([epic(), epic({ id: 'e2', identifier: 'CHT-9', status: 'done' })]), container);
        expect(container.querySelectorAll('.epic-row').length).toBe(1);
        expect(getCurrentEpics().map(e => e.id)).toEqual(['e1']);

        const toggle = container.querySelector('[data-epics-toggle-closed]');
        expect(toggle.textContent).toContain('Show 1 closed epic');
        toggle.click();
        expect(container.querySelectorAll('.epic-row').length).toBe(2);
        expect(getCurrentEpics().map(e => e.id)).toEqual(['e1', 'e2']);
        expect(navigateToEpicByIdentifier).not.toHaveBeenCalled();

        container.querySelector('[data-epics-toggle-closed]').click();
        expect(container.querySelectorAll('.epic-row').length).toBe(1);
    });

    it('resets the keyboard cursor when the closed toggle re-renders', () => {
        renderEpics(response([epic(), epic({ id: 'e2', identifier: 'CHT-9', status: 'done' })]), container);
        setSelectedEpicIndex(0);
        container.querySelector('[data-epics-toggle-closed]').click();
        expect(getSelectedEpicIndex()).toBe(-1);
    });

    it('says so when every epic is closed', () => {
        renderEpics(response([epic({ status: 'canceled' })]), container);
        expect(container.querySelectorAll('.epic-row').length).toBe(0);
        expect(container.textContent).toContain('Every epic here is closed');
    });

    it('escapes server text', () => {
        const evil = '<img src=x onerror="window.__pwned=1">';
        renderEpics(response(
            [epic({ title: evil, identifier: evil, project_key: evil, sprints: [{ ...sprints([1])[0], name: evil }] })],
            [untracked({ project_key: evil })],
        ), container);
        expect(container.querySelector('img')).toBeNull();
        expect(container.textContent).toContain('<img');
    });

    it('navigates to epic on row click via event delegation', () => {
        renderEpics(response([epic()]), container);
        const row = container.querySelector('.epic-row');
        expect(row.getAttribute('onclick')).toBeNull();
        row.click();
        expect(navigateToEpicByIdentifier).toHaveBeenCalledWith('CHT-10');
    });
});

describe('Epics progress readout (CHT-1964)', () => {
    let container;
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        resetEpicsViewState();
        container = document.getElementById('epics-list');
    });
    const kids = (done, total, extra = {}) => ({
        total, backlog: 0, todo: total - done, in_progress: 0, in_review: 0, done, canceled: 0, ...extra,
    });

    it('groups by state in reading order, in_review with In progress', () => {
        renderEpics(response([
            epic({ id: 'b', identifier: 'CHT-2', status: 'backlog', children: kids(0, 2) }),
            epic({ id: 'r', identifier: 'CHT-3', status: 'in_review' }),
            epic({ id: 't', identifier: 'CHT-4', status: 'todo', children: kids(0, 1) }),
        ]), container);
        const headers = [...container.querySelectorAll('.epic-state-row th')].map(th => th.childNodes[1].textContent);
        expect(headers).toEqual(['In progress', 'Todo', 'Backlog']);
        expect(container.querySelector('.epic-state-row th').getAttribute('scope')).toBe('colgroup');
    });

    it('sorts by movement this sprint, then percent, empty epics last; prev/next follows the rows', () => {
        renderEpics(response([
            epic({ id: 'empty', identifier: 'CHT-5', children: kids(0, 0), points_this_sprint: 9, closed_this_sprint: 1 }),
            epic({ id: 'slow', identifier: 'CHT-6', children: kids(1, 4), points_this_sprint: 0, closed_this_sprint: 0 }),
            epic({ id: 'far', identifier: 'CHT-7', children: kids(3, 4), points_this_sprint: 0, closed_this_sprint: 0 }),
            epic({ id: 'moved', identifier: 'CHT-8', children: kids(1, 4), points_this_sprint: 5, closed_this_sprint: 2 }),
        ]), container);
        const rows = [...container.querySelectorAll('.epic-row')].map(r => r.dataset.identifier);
        expect(rows).toEqual(['CHT-8', 'CHT-7', 'CHT-6', 'CHT-5']);
        expect(getCurrentEpics().map(e => e.identifier)).toEqual(rows);
        expect(container.querySelector('[data-identifier="CHT-5"]').classList.contains('epic-row-empty')).toBe(true);
    });

    it('keeps prev/next in row order across projects', () => {
        renderEpics(response([
            epic({ id: 'w', identifier: 'WEB-1', project_id: 'p2', project_key: 'WEB' }),
            epic({ id: 'c', identifier: 'CHT-1', status: 'backlog', children: kids(0, 1) }),
            epic({ id: 'c2', identifier: 'CHT-2' }),
        ]), container);
        const rows = [...container.querySelectorAll('.epic-row')].map(r => r.dataset.identifier);
        expect(getCurrentEpics().map(e => e.identifier)).toEqual(rows);
    });

    it('shows a floored ticket percent that only reads 100% when done', () => {
        expect(pctLabel(199, 200)).toBe('99%');
        expect(pctLabel(200, 200)).toBe('100%');
        expect(pctLabel(0, 0)).toBe('-');
        renderEpics(response([epic()]), container);
        expect(container.querySelector('.epic-progress-pct').textContent).toBe('50%');
    });

    it('summarises open epics by tickets and counts untracked closes this sprint', () => {
        const html = renderSummary(
            [
                epic({ children: kids(2, 4), closed_this_sprint: 1, points_this_sprint: 3 }),
                epic({ id: 'e2', children: kids(0, 4), closed_this_sprint: 0, points_this_sprint: 0 }),
                epic({ id: 'e3', status: 'done', children: kids(5, 5), closed_this_sprint: 1, points_this_sprint: 2 }),
            ],
            [untracked({ open: 3, closed_this_sprint: 2, points_this_sprint: 2 })],
        );
        const el = document.createElement('div');
        el.innerHTML = html;
        const stats = [...el.querySelectorAll('.epic-stat')].map(s => s.textContent.replace(/\s+/g, ' ').trim());
        expect(stats[0]).toBe('1 / 2 open epics moved this sprint');
        expect(stats[1]).toBe('25% of their tickets done (2/8)');
        expect(stats[2]).toBe('+4 tickets closed this sprint (7 pts)');
        expect(stats[3]).toBe('3 open tickets under no epic');
    });

    it('keeps sprint movement in the summary when every epic is closed', () => {
        const html = renderSummary([epic({ status: 'done', closed_this_sprint: 1, points_this_sprint: 1 })], []);
        expect(html).toContain('ticket closed this sprint');
        expect(html).not.toContain('open epics');
        expect(renderSummary([epic({ status: 'done', closed_this_sprint: 0 })], [])).toBe('');
    });

    it('marks a canceled epic apart from a done one', () => {
        renderEpics(response([epic({ id: 'x', status: 'canceled' }), epic({ id: 'y', identifier: 'CHT-11', status: 'done' })]), container);
        container.querySelector('[data-epics-toggle-closed]').click();
        expect(container.querySelectorAll('.epic-canceled-tag').length).toBe(1);
    });
});

describe('renderSprintStrip', () => {
    it('draws one bar per sprint, scaled to the largest, current last', () => {
        document.body.innerHTML = renderSprintStrip(sprints([0, 2, 4]));
        const ticks = document.querySelectorAll('.epic-sprint-tick');
        expect(ticks.length).toBe(3);
        const heights = [...document.querySelectorAll('.epic-sprint-fill')].map(f => f.style.height);
        expect(heights).toEqual(['0%', '50%', '100%']);
        expect(ticks[2].classList.contains('epic-sprint-current')).toBe(true);
        expect(ticks[2].getAttribute('title')).toBe('Sprint 3 (current): 1 ticket closed, 4 pts');
    });

    it('shows a dash with no sprints', () => {
        expect(renderSprintStrip([])).toContain('-');
    });
});
