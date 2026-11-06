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
import { loadEpics, renderEpics, renderSprintStrip, getCurrentEpics, resetEpicsViewState, pctLabel } from './epics.js';
import { api } from './api.js';
import { navigateToEpicByIdentifier } from './router.js';
import { showApiError } from './ui.js';
import { forgetResults } from './last-result.js';

// Each test starts with no remembered view results (CHT-1973).
beforeEach(() => forgetResults());

function setupDom() {
    document.body.innerHTML = '<input id="epics-filter"><div id="epics-list"></div>';
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
    owner: null, in_flight: [], in_flight_count: 0, last_shipped: null,
    last_activity_at: null, completed_at: null, awaiting_human: [],
    ...overrides,
});

const untracked = (overrides = {}) => ({
    project_id: 'p1', project_key: 'CHT', open: 7,
    closed_this_sprint: 2, points_this_sprint: 2, sprints: sprints([1, 0, 2]), awaiting_human: [],
    ...overrides,
});

const response = (epics, gaps = []) => ({ epics, untracked: gaps, sprint_window: 8 });
const ago = (ms) => new Date(Date.now() - ms).toISOString();
const MIN = 60000;

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

    // CHT-1973: a revisit painted a skeleton for a round trip.
    it('paints the last epics at once on entry, then shows a failed refresh', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([epic({ title: 'Cached Epic' })]));
        await loadEpics();
        api.getTeamEpicProgress.mockRejectedValue(new Error('down'));
        const loading = loadEpics({ fromMemory: true });
        const el = document.getElementById('epics-list');
        expect(el.textContent).toContain('Cached Epic');
        expect(el.innerHTML).not.toContain('skeleton');
        await loading;
        expect(el.innerHTML).toContain('retry-load-epics');
    });

    it('paints the skeleton without fromMemory', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([epic({ title: 'Cached Epic' })]));
        await loadEpics();
        api.getTeamEpicProgress.mockReturnValue(new Promise(() => {}));
        loadEpics();
        expect(document.getElementById('epics-list').textContent).not.toContain('Cached Epic');
    });

    it('keeps the DOM when the refresh is unchanged', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([epic({ title: 'Same Epic' })]));
        await loadEpics();
        const loading = loadEpics({ fromMemory: true });
        const el = document.getElementById('epics-list');
        const first = el.firstElementChild;
        await loading;
        expect(el.firstElementChild).toBe(first);
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

const kids = (done, total, extra = {}) => ({
    total, backlog: 0, todo: total - done, in_progress: 0, in_review: 0, done, canceled: 0, ...extra,
});
const ticket = (title, extra = {}) => ({ identifier: `CHT-${title.length}`, title, status: 'in_progress', assignee: null, ...extra });
const person = (name, extra = {}) => ({ id: name, name, is_agent: false, ...extra });
const moving = (overrides = {}) => epic({
    in_flight: [ticket('Build it', { assignee: person('ivy') })], in_flight_count: 1, last_activity_at: ago(MIN), ...overrides,
});
const rowIds = (container) => [...container.querySelectorAll('.epic-row')].map(r => r.dataset.identifier);
const chip = (container, key) => container.querySelector(`[data-epics-filter="${key}"]`);
const ask = (identifier, extra = {}) => ({ ritual_name: 'review', approval_mode: 'review', identifier, title: 'T', since: ago(MIN), ...extra });

describe('renderEpics (CHT-2095)', () => {
    let container;
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        resetEpicsViewState();
        container = document.getElementById('epics-list');
    });

    it('lists open epics in one list, most recently touched first, whatever is in progress', () => {
        renderEpics(response([
            moving({ id: 'a', identifier: 'CHT-1', last_activity_at: ago(7 * 24 * 60 * MIN) }),
            epic({ id: 'b', identifier: 'CHT-2', last_activity_at: ago(24 * 60 * MIN) }),
            epic({ id: 'c', identifier: 'CHT-3', children: kids(3, 3), open_children: 0, last_activity_at: ago(30 * MIN) }),
            epic({ id: 'd', identifier: 'CHT-4', status: 'done', completed_at: ago(MIN), last_activity_at: ago(MIN) }),
        ]), container);
        expect(rowIds(container)).toEqual(['CHT-3', 'CHT-2', 'CHT-1']);
        expect(getCurrentEpics().map(e => e.identifier)).toEqual(rowIds(container));
        expect(container.querySelectorAll('.epic-section').length).toBe(1);
        // All done stays in its place and asks the question on its row.
        expect(container.querySelector('[data-identifier="CHT-3"] .list-row-sub').textContent).toBe('All done · close it?');
    });

    it('says each epic\'s tickets by status, zeros left out, who holds them on hover', () => {
        renderEpics(response([moving({
            children: { total: 9, backlog: 4, todo: 2, in_progress: 2, in_review: 1, done: 0, canceled: 0 },
            in_flight: [ticket('Picker', { assignee: person('ivy') }), ticket('Header')],
        })]), container);
        const sub = container.querySelector('.list-row-sub');
        expect(sub.textContent).toBe('2 in progress · 1 in review · 2 todo · 4 backlog');
        expect(sub.querySelector('[title]').getAttribute('title')).toBe('ivy: Picker\nUnassigned: Header');
    });

    it('chips narrow the list without reordering it, and count what each would show', () => {
        renderEpics(response([
            moving({ id: 'a', identifier: 'CHT-1', last_activity_at: ago(10 * MIN) }),
            epic({ id: 'b', identifier: 'CHT-2', children: kids(2, 2), open_children: 0, last_activity_at: ago(20 * MIN) }),
            moving({ id: 'c', identifier: 'CHT-3', last_activity_at: ago(5 * MIN), awaiting_human: [ask('CHT-30')] }),
            epic({ id: 'd', identifier: 'CHT-4', status: 'done', completed_at: ago(9 * MIN) }),
            epic({ id: 'e', identifier: 'CHT-5', status: 'canceled', completed_at: ago(MIN) }),
        ]), container);
        const counts = Object.fromEntries([...container.querySelectorAll('[data-epics-filter]')]
            .map(b => [b.dataset.epicsFilter, b.querySelector('.segmented-count').textContent]));
        expect(counts).toEqual({ open: '3', in_progress: '2', all_done: '1', needs_you: '1', shipped: '2', all: '5' });
        expect(chip(container, 'open').classList.contains('active')).toBe(true);

        setSelectedEpicIndex(0);
        chip(container, 'in_progress').click();
        expect(getSelectedEpicIndex()).toBe(-1);
        expect(rowIds(container)).toEqual(['CHT-3', 'CHT-1']);
        chip(container, 'all_done').click();
        expect(rowIds(container)).toEqual(['CHT-2']);
        chip(container, 'needs_you').click();
        expect(rowIds(container)).toEqual(['CHT-3']);
        expect(container.querySelector('.epic-needs-you').textContent).toBe('1 needs you');
        chip(container, 'shipped').click();
        expect(rowIds(container)).toEqual(['CHT-5', 'CHT-4']);
        expect(navigateToEpicByIdentifier).not.toHaveBeenCalled();
    });

    it('lists every shipped epic: no cap', () => {
        const closed = Array.from({ length: 12 }, (_, i) => epic({
            id: `s${i}`, identifier: `CHT-${i}`, status: 'done', completed_at: ago(i * MIN),
        }));
        renderEpics(response(closed), container);
        chip(container, 'shipped').click();
        expect(rowIds(container).length).toBe(12);
    });

    it('says when a chip matches nothing', () => {
        renderEpics(response([epic()]), container);
        chip(container, 'needs_you').click();
        expect(container.querySelector('.epic-filter-empty').textContent).toBe('No needs you epics.');
    });

    it('nests sub-epics under their parent, collapsed, with the parent rolled up', () => {
        renderEpics(response([
            // The parent's own tickets: 1 done, 1 todo, and the in-progress sub-epic.
            epic({ id: 'p', identifier: 'CHT-1', title: 'Polish', last_activity_at: ago(60 * MIN),
                children: { total: 3, backlog: 0, todo: 1, in_progress: 1, in_review: 0, done: 1, canceled: 0 } }),
            moving({ id: 's', identifier: 'CHT-2', title: 'Colours', parent_epic_id: 'p', last_activity_at: ago(MIN),
                children: { total: 4, backlog: 1, todo: 0, in_progress: 1, in_review: 0, done: 2, canceled: 0 },
                awaiting_human: [ask('CHT-20')] }),
            epic({ id: 'o', identifier: 'CHT-3', last_activity_at: ago(30 * MIN) }),
        ]), container);
        // The parent sorts by its newest touch anywhere under it.
        expect(rowIds(container)).toEqual(['CHT-1', 'CHT-3']);
        const parent = container.querySelector('[data-identifier="CHT-1"]');
        expect(parent.querySelector('.meter-label').textContent).toBe('3 of 6');
        expect(parent.querySelector('.list-row-sub').textContent).toBe('1 in progress · 1 todo · 1 backlog · 1 needs you · ▸ 1 sub-epic');

        parent.querySelector('[data-epic-toggle-subs]').click();
        expect(rowIds(container)).toEqual(['CHT-1', 'CHT-2', 'CHT-3']);
        const sub = container.querySelector('[data-identifier="CHT-2"]');
        expect(sub.classList.contains('epic-row-sub')).toBe(true);
        expect(sub.style.getPropertyValue('--epic-depth')).toBe('1');
        expect(getCurrentEpics().map(e => e.identifier)).toEqual(['CHT-1', 'CHT-2', 'CHT-3']);
        expect(navigateToEpicByIdentifier).not.toHaveBeenCalled();

        container.querySelector('[data-epic-toggle-subs]').click();
        expect(rowIds(container)).toEqual(['CHT-1', 'CHT-3']);
    });

    it('lifts a sub-epic to the top when its parent is filtered out', () => {
        renderEpics(response([
            epic({ id: 'p', identifier: 'CHT-1', status: 'done', completed_at: ago(MIN) }),
            moving({ id: 's', identifier: 'CHT-2', parent_epic_id: 'p' }),
        ]), container);
        expect(rowIds(container)).toEqual(['CHT-2']);
        expect(container.querySelector('.epic-row-sub')).toBeNull();
    });

    it('survives a parent cycle in old data', () => {
        renderEpics(response([
            epic({ id: 'a', identifier: 'CHT-1', parent_epic_id: 'b' }),
            epic({ id: 'b', identifier: 'CHT-2', parent_epic_id: 'a' }),
        ]), container);
        // The loop is cut once: one becomes the root, the other its sub-epic.
        container.querySelector('[data-epic-toggle-subs]').click();
        expect(rowIds(container).sort()).toEqual(['CHT-1', 'CHT-2']);
    });

    it('the filter box narrows by title, key, owner and held tickets, chips counting what matches (CHT-2096)', () => {
        renderEpics(response([
            epic({ id: 'a', identifier: 'CHT-1', title: 'Colour tokens', last_activity_at: ago(MIN) }),
            moving({ id: 'b', identifier: 'CHT-2', title: 'Inbox', last_activity_at: ago(2 * MIN),
                in_flight: [ticket('Shared colour row')] }),
            epic({ id: 'c', identifier: 'CHT-3', title: 'Other', owner: person('Ada'), last_activity_at: ago(3 * MIN) }),
        ]), container);
        const box = document.getElementById('epics-filter');
        box.value = '  COLOUR ';
        box.dispatchEvent(new Event('input'));
        expect(rowIds(container)).toEqual(['CHT-1', 'CHT-2']);
        expect(chip(container, 'all').querySelector('.segmented-count').textContent).toBe('2');
        box.value = 'cht-3';
        box.dispatchEvent(new Event('input'));
        expect(rowIds(container)).toEqual(['CHT-3']);
        box.value = 'ada';
        box.dispatchEvent(new Event('input'));
        expect(rowIds(container)).toEqual(['CHT-3']);
        box.value = 'nothing';
        box.dispatchEvent(new Event('input'));
        expect(container.querySelector('.epic-filter-empty').textContent).toBe('No open epics match “nothing”.');
        // Escaped like every other server or user text.
        box.value = '<b>x';
        box.dispatchEvent(new Event('input'));
        expect(container.querySelector('.epic-filter-empty b')).toBeNull();
    });

    it('shows the epic owner after the title, and nothing when unassigned', () => {
        renderEpics(response([
            moving({ identifier: 'CHT-1', owner: person('Rowan'), last_activity_at: ago(MIN) }),
            moving({ id: 'e2', identifier: 'CHT-2', last_activity_at: ago(5 * MIN) }),
        ]), container);
        const owners = [...container.querySelectorAll('.epic-row')].map(r => r.querySelector('.epic-owner')?.textContent || null);
        expect(owners).toEqual(['· Rowan', null]);
    });

    it('leads each epic row with its sprint strip and ends it with the meter and when it was touched', () => {
        renderEpics(response([moving({ children: kids(2, 4), last_activity_at: ago(40 * MIN) })]), container);
        const row = container.querySelector('.epic-row');
        expect(row.firstElementChild.classList.contains('epic-spark')).toBe(true);
        expect(row.querySelectorAll('.epic-sprint-tick').length).toBe(3);
        expect(row.querySelector('.meter-fill').style.width).toBe('50%');
        expect(row.querySelector('.meter-label').textContent).toBe('2 of 4');
        expect(row.querySelector('.meter').getAttribute('title')).toContain('50% done');
        expect(row.querySelector('.epic-touched').textContent).toBe('40m ago');
    });

    it('leaves canceled tickets out of the meter, and says when there are none', () => {
        renderEpics(response([
            epic({ identifier: 'CHT-1', children: kids(2, 4, { todo: 1, canceled: 1 }), last_activity_at: ago(MIN) }),
            epic({ id: 'e2', identifier: 'CHT-2', children: kids(0, 0), open_children: 0 }),
        ]), container);
        const labels = [...container.querySelectorAll('.meter-label:not(.epic-touched)')].map(l => l.textContent);
        expect(labels).toEqual(['2 of 3', 'No tickets']);
        expect(container.querySelector('[data-identifier="CHT-2"] .list-row-sub').textContent).toBe('No tickets yet');
    });

    it('lists no approvals: they are facts about an epic, on its row', () => {
        renderEpics(response([epic({ awaiting_human: [ask('CHT-41'), ask('CHT-42')] })],
            [untracked({ awaiting_human: [ask('CHT-39')] })]), container);
        expect(container.querySelector('.epic-ask-row')).toBeNull();
        expect(container.textContent).not.toContain('CHT-39');
        expect(container.querySelector('.epic-needs-you').textContent).toBe('2 need you');
    });

    it('marks a hand-set status on an open epic', () => {
        renderEpics(response([epic({ status_pinned: true })]), container);
        expect(container.querySelector('.epic-status-pinned-mark')).toBeTruthy();
    });

    it('notes work under no epic, per project team-wide, with project keys on rows', () => {
        renderEpics(response(
            [moving(), moving({ id: 'e2', identifier: 'WEB-3', project_id: 'p2', project_key: 'WEB', last_activity_at: ago(5 * MIN) })],
            [untracked(), untracked({ project_id: 'p2', project_key: 'WEB', open: 0 })],
        ), container);
        expect(container.querySelector('.epic-untracked-note').textContent).toBe('CHT: 7 open tickets under no epic.');
        expect([...container.querySelectorAll('.epic-project-key')].map(k => k.textContent)).toEqual(['CHT', 'WEB']);
    });

    it('leaves project keys off in one project', () => {
        renderEpics(response([moving()], [untracked({ open: 1 })]), container);
        expect(container.querySelector('.epic-project-key')).toBeNull();
        expect(container.querySelector('.epic-untracked-note').textContent).toBe('1 open ticket under no epic.');
    });

    it('escapes server text', () => {
        const evil = '<img src=x onerror="window.__pwned=1">';
        renderEpics(response(
            [moving({
                id: evil, title: evil, identifier: evil, project_key: evil, owner: person(evil),
                sprints: [{ ...sprints([1])[0], name: evil }],
                in_flight: [ticket(evil, { assignee: person(evil) })],
                awaiting_human: [ask(evil)],
            }), epic({ id: 'e2', project_key: 'WEB', parent_epic_id: evil })],
            [untracked({ project_key: evil })],
        ), container);
        expect(container.querySelector('img')).toBeNull();
        expect(container.textContent).toContain('<img');
    });

    it('navigates to epic on row click via event delegation', () => {
        renderEpics(response([moving()]), container);
        const row = container.querySelector('.epic-row');
        expect(row.getAttribute('onclick')).toBeNull();
        row.click();
        expect(navigateToEpicByIdentifier).toHaveBeenCalledWith('CHT-10');
    });

    it('shows a floored ticket percent that only reads 100% when done', () => {
        expect(pctLabel(199, 200)).toBe('99%');
        expect(pctLabel(200, 200)).toBe('100%');
        expect(pctLabel(0, 0)).toBe('-');
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

    it('draws an empty strip with no sprints', () => {
        document.body.innerHTML = renderSprintStrip([]);
        expect(document.querySelectorAll('.epic-sprint-tick').length).toBe(0);
        expect(document.querySelector('.epic-sprint-strip')).toBeTruthy();
    });
});
