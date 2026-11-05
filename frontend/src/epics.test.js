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
    navigateToIssueByIdentifier: vi.fn(),
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
import { navigateToEpicByIdentifier, navigateToIssueByIdentifier } from './router.js';
import { showApiError } from './ui.js';
import { forgetResults } from './last-result.js';

// Each test starts with no remembered view results (CHT-1973).
beforeEach(() => forgetResults());

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

    it('lists asks under no epic even when there are no epics', async () => {
        api.getTeamEpicProgress.mockResolvedValue(response([], [untracked({ awaiting_human: [
            { ritual_name: 'review', approval_mode: 'review', identifier: 'CHT-5', title: 'Loose', since: ago(MIN) },
        ] })]));
        await loadEpics();
        const el = document.getElementById('epics-list');
        expect(el.innerHTML).not.toContain('No epics found');
        expect(el.querySelector('.epic-ask-row').dataset.issueIdentifier).toBe('CHT-5');
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
const sectionIds = (container, key) =>
    [...container.querySelectorAll(`.epic-section-${key} .epic-row`)].map(r => r.dataset.identifier);

describe('renderEpics (CHT-2043)', () => {
    let container;
    beforeEach(() => {
        setupDom();
        vi.clearAllMocks();
        resetEpicsViewState();
        container = document.getElementById('epics-list');
    });

    it('sorts epics into moving, quiet and shipped, each by time; prev/next follows the rows', () => {
        renderEpics(response([
            moving({ id: 'm-old', identifier: 'CHT-1', last_activity_at: ago(60 * MIN) }),
            moving({ id: 'm-new', identifier: 'CHT-2', last_activity_at: ago(MIN) }),
            epic({ id: 'q-empty', identifier: 'CHT-3', children: kids(0, 0), open_children: 0 }),
            epic({ id: 'q-old', identifier: 'CHT-4', last_shipped: ticket('Old', { completed_at: ago(9000 * MIN) }) }),
            epic({ id: 'q-new', identifier: 'CHT-5', last_shipped: ticket('New', { completed_at: ago(10 * MIN) }) }),
            epic({ id: 's-old', identifier: 'CHT-6', status: 'done', completed_at: ago(5000 * MIN) }),
            epic({ id: 's-new', identifier: 'CHT-7', status: 'canceled', completed_at: ago(MIN) }),
        ]), container);
        expect(sectionIds(container, 'moving')).toEqual(['CHT-2', 'CHT-1']);
        expect(sectionIds(container, 'quiet')).toEqual(['CHT-5', 'CHT-4', 'CHT-3']);
        expect(sectionIds(container, 'shipped')).toEqual(['CHT-7', 'CHT-6']);
        const rows = [...container.querySelectorAll('.epic-row')].map(r => r.dataset.identifier);
        expect(getCurrentEpics().map(e => e.identifier)).toEqual(rows);
        expect(container.querySelector('[data-identifier="CHT-3"]').classList.contains('epic-row-empty')).toBe(true);
        expect(container.querySelectorAll('.epic-canceled-tag').length).toBe(1);
        expect(container.querySelector('.epic-section-moving .section-count').textContent).toBe('2');
    });

    it('says who is on what and what shipped last', () => {
        renderEpics(response([moving({
            in_flight: [
                ticket('Picker', { assignee: person('ivy', { is_agent: true }) }),
                ticket('Header', { status: 'in_review' }),
                ticket('Third one', { assignee: person('Sam') }),
            ],
            in_flight_count: 4,
            last_shipped: ticket('Collapse', { status: 'done', completed_at: ago(40 * MIN) }),
        })]), container);
        const sub = container.querySelector('.epic-section-moving .list-row-sub').textContent;
        expect(sub).toBe('ivy on Picker, Unassigned on Header, +2 more · shipped Collapse 40m ago');
    });

    it('shows the epic owner after the title, and nothing when unassigned', () => {
        renderEpics(response([
            // Distinct times: two ago(MIN) calls can land a millisecond
            // apart, and the newer one would sort first.
            moving({ identifier: 'CHT-1', owner: person('Rowan'), last_activity_at: ago(MIN) }),
            moving({ id: 'e2', identifier: 'CHT-2', last_activity_at: ago(5 * MIN) }),
        ]), container);
        const owners = [...container.querySelectorAll('.epic-row')].map(r => r.querySelector('.epic-owner')?.textContent || null);
        expect(owners).toEqual(['· Rowan', null]);
    });

    it('leads each epic row with its sprint strip and ends it with the meter', () => {
        renderEpics(response([moving({ children: kids(2, 4) })]), container);
        const row = container.querySelector('.epic-row');
        expect(row.firstElementChild.classList.contains('epic-spark')).toBe(true);
        expect(row.querySelectorAll('.epic-sprint-tick').length).toBe(3);
        expect(row.querySelector('.meter-fill').style.width).toBe('50%');
        expect(row.querySelector('.meter-label').textContent).toBe('2 of 4');
        expect(row.querySelector('.meter').getAttribute('title')).toContain('50% done');
    });

    it('leaves canceled tickets out of the meter, and says when there are none', () => {
        renderEpics(response([
            epic({ identifier: 'CHT-1', children: kids(2, 4, { todo: 1, canceled: 1 }) }),
            epic({ id: 'e2', identifier: 'CHT-2', children: kids(0, 0), open_children: 0 }),
        ]), container);
        const labels = [...container.querySelectorAll('.meter-label')].map(l => l.textContent);
        expect(labels).toEqual(['2 of 3', 'No tickets']);
    });

    it('lists what waits on a person, oldest first, and opens the ticket', () => {
        renderEpics(response([
            moving({
                title: 'Redesign',
                awaiting_human: [
                    { ritual_name: 'design-review', approval_mode: 'review', identifier: 'CHT-41', title: 'Picker', since: ago(25 * MIN), requested_by_name: 'ivy' },
                ],
            }),
            epic({ id: 'e2', identifier: 'CHT-2', status: 'done', awaiting_human: [
                { ritual_name: 'stale', approval_mode: 'review', identifier: 'CHT-99', title: 'Closed epic', since: ago(1000) },
            ] }),
        ], [untracked({ awaiting_human: [
            { ritual_name: 'release', approval_mode: 'gate', identifier: 'CHT-39', title: 'Publish', since: ago(120 * MIN), requested_by_name: 'moss' },
        ] })]), container);
        const asks = [...container.querySelectorAll('.epic-ask-row')];
        expect(asks.map(a => a.querySelector('.list-row-title').textContent)).toEqual([
            'Complete release: Publish', 'Approve design-review: Picker', 'Approve stale: Closed epic',
        ]);
        expect(asks[0].querySelector('.list-row-sub').textContent).toBe('No epic · requested by moss 2h ago');
        expect(asks[1].querySelector('.list-row-sub').textContent).toBe('Redesign · attested by ivy 25m ago');
        expect(asks[1].querySelector('.list-row-action').textContent).toBe('Approve');
        expect(asks[0].querySelector('.list-row-action').textContent).toBe('Complete');
        // Not an epic row, so the keyboard cursor and prev/next skip it.
        expect(asks[0].classList.contains('epic-row')).toBe(false);
        asks[1].click();
        expect(navigateToIssueByIdentifier).toHaveBeenCalledWith('CHT-41');
        expect(navigateToEpicByIdentifier).not.toHaveBeenCalled();
    });

    it('asks about an open epic whose tickets are all done, and nowhere else', () => {
        renderEpics(response([
            epic({ identifier: 'CHT-1', children: kids(3, 3), open_children: 0, last_shipped: ticket('Last', { completed_at: ago(2 * MIN) }) }),
        ]), container);
        expect(sectionIds(container, 'waiting')).toEqual(['CHT-1']);
        expect(sectionIds(container, 'quiet')).toEqual([]);
        expect(container.querySelector('.epic-section-waiting .list-row-sub').textContent).toBe('Every ticket is done · last shipped 2m ago');
        expect(container.querySelector('.epic-section-waiting .section-count').textContent).toBe('1');
    });

    it('keeps an ask on open work under a closed epic', () => {
        renderEpics(response([epic({ status: 'done', title: 'Closed goal', awaiting_human: [
            { ritual_name: 'review', approval_mode: 'review', identifier: 'CHT-77', title: 'Still open', since: ago(MIN) },
        ] })]), container);
        expect([...container.querySelectorAll('.epic-ask-row')].map(a => a.dataset.issueIdentifier)).toEqual(['CHT-77']);
    });

    it('omits empty sections', () => {
        renderEpics(response([moving()]), container);
        expect([...container.querySelectorAll('.epic-section')].map(s => s.className)).toEqual(['epic-section epic-section-moving']);
    });

    it('shows the latest shipped epics until asked for all', () => {
        const closed = Array.from({ length: 7 }, (_, i) => epic({
            id: `s${i}`, identifier: `CHT-${i}`, status: 'done', completed_at: ago(i * MIN),
        }));
        renderEpics(response(closed), container);
        expect(sectionIds(container, 'shipped').length).toBe(5);
        // The hidden ones still follow, for the epic page's prev/next and counts.
        expect(getCurrentEpics().length).toBe(7);
        expect(container.querySelector('.epic-section-shipped .section-count').textContent).toBe('7');
        const toggle = container.querySelector('[data-epics-toggle-closed]');
        expect(toggle.textContent).toBe('Show all 7');
        setSelectedEpicIndex(0);
        toggle.click();
        expect(getSelectedEpicIndex()).toBe(-1);
        expect(sectionIds(container, 'shipped').length).toBe(7);
        expect(getCurrentEpics().length).toBe(7);
        expect(navigateToEpicByIdentifier).not.toHaveBeenCalled();
        container.querySelector('[data-epics-toggle-closed]').click();
        expect(sectionIds(container, 'shipped').length).toBe(5);
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
                title: evil, identifier: evil, project_key: evil, owner: person(evil),
                sprints: [{ ...sprints([1])[0], name: evil }],
                in_flight: [ticket(evil, { assignee: person(evil) })],
                last_shipped: ticket(evil, { completed_at: ago(MIN) }),
                awaiting_human: [{ ritual_name: evil, approval_mode: 'review', identifier: evil, title: evil, since: ago(MIN), requested_by_name: evil }],
            }), epic({ id: 'e2', project_key: 'WEB' })],
            [untracked({ project_key: evil, awaiting_human: [{ ritual_name: evil, approval_mode: 'gate', identifier: evil, title: evil, since: ago(MIN) }] })],
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
