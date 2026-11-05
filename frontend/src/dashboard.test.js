/**
 * Tests for dashboard.js module
 * Written BEFORE extraction per the extraction strategy.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dependencies
vi.mock('./api.js', () => ({
    api: {
        getTeamIssues: vi.fn(),
        getTeamActivities: vi.fn(),
        getIssues: vi.fn(),
        getCurrentSprint: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((text) => text ? String(text).replace(/[&<>"']/g, '') : ''),
    escapeAttr: vi.fn((text) => text ? String(text).replace(/[&<>"']/g, '') : ''),
    formatTimeAgo: vi.fn(() => '2h ago'),
    formatStatus: vi.fn((s) => s),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./state.js', () => ({
    getCurrentUser: vi.fn(() => null),
    getCurrentTeam: vi.fn(() => null),
    getCurrentProject: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'dashboard'),
    subscribe: vi.fn(),
    setDetailNavContext: vi.fn(),
}));

vi.mock('./issue-list.js', () => ({
    renderIssueRow: vi.fn((issue) => `<div class="issue-row">${issue.title}</div>`),
}));

vi.mock('./issue-detail-view.js', () => ({
    formatActivityText: vi.fn((activity) => activity.activity_type),
    formatActivityActor: vi.fn((activity) => activity.user_name || 'Unknown'),
    getActivityIcon: vi.fn(() => '📝'),
}));

vi.mock('./router.js', () => ({
    navigateToIssueByIdentifier: vi.fn(),
}));

vi.mock('./documents.js', () => ({
    viewDocument: vi.fn(),
}));

import { api } from './api.js';
import { showApiError } from './ui.js';
import { getCurrentUser, getCurrentTeam, getCurrentProject, getCurrentView, setDetailNavContext } from './state.js';
import { renderIssueRow } from './issue-list.js';
import { formatActivityText, formatActivityActor, getActivityIcon } from './issue-detail-view.js';
import { registerActions } from './event-delegation.js';
import { setProjects } from './projects.js';
import {
    getMyIssues,
    setMyIssues,
    getDashboardActivities,
    setDashboardActivities,
    loadMyIssues,
    loadDashboardActivity,
    loadSprintStatus,
    renderSprintStatus,
    describeSprintBudget,
    sortSprintsByAttention,
    resetSprintRowsExpanded,
    renderMyIssues,
    renderDashboardActivity,
    showMyIssuesLoadingSkeleton,
    filterMyIssues,
    groupMyIssues,
    getSelectedMyIssueIndex,
    setSelectedMyIssueIndex,
} from './dashboard.js';

// Actions registered at module import time — capture before vi.clearAllMocks wipes them
const dashboardActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('dashboard module', () => {
    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <div id="my-issues-list"></div>
            <div id="dashboard-activity-list"></div>
            <div id="dashboard-sprint-status"></div>
            <select id="my-issues-status-filter">
                <option value="">All</option>
                <option value="todo">Todo</option>
            </select>
        `;

        // Configure mocks
        getCurrentUser.mockReturnValue({ id: 'user-1', name: 'Test User' });
        getCurrentTeam.mockReturnValue({ id: 'team-1', name: 'Test Team' });

        // Reset state
        setMyIssues([]);
        setDashboardActivities([]);
        setProjects([]);
        getCurrentProject.mockReturnValue(null);

        // Reset mocks
        vi.clearAllMocks();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('loadMyIssues', () => {
        it('loads issues for current user', async () => {
            const mockIssues = [
                { id: 'issue-1', title: 'Test Issue', status: 'todo' },
            ];
            api.getTeamIssues.mockResolvedValue(mockIssues);

            await loadMyIssues();

            expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', {
                assignee_id: 'user-1',
                status: undefined,
                limit: 1000,
            });
            expect(getMyIssues()).toEqual(mockIssues);
        });

        // CHT-1211 item 2: issue-detail prev/next should page through the
        // Dashboard's own list when opened from My Issues, not the stale/
        // empty Issues-view-only global issues array.
        it('sets the detail nav context to the my-issues list', async () => {
            const mockIssues = [
                { id: 'issue-1', title: 'Test Issue', status: 'todo' },
            ];
            api.getTeamIssues.mockResolvedValue(mockIssues);
            getCurrentView.mockReturnValue('my-issues');

            await loadMyIssues();

            expect(setDetailNavContext).toHaveBeenCalledWith(mockIssues);
        });

        it('holds issues in rendered (grouped) order, so prev/next and j/k walk the list as shown', async () => {
            api.getTeamIssues.mockResolvedValue([
                { id: 'b', status: 'backlog' }, { id: 'p', status: 'in_progress' }, { id: 't', status: 'todo' },
            ]);
            getCurrentView.mockReturnValue('my-issues');
            await loadMyIssues();
            expect(getMyIssues().map(i => i.id)).toEqual(['p', 't', 'b']);
            expect(setDetailNavContext.mock.calls.at(-1)[0].map(i => i.id)).toEqual(['p', 't', 'b']);
        });

        // CHT-1211 review #2: a slow loadMyIssues() response landing after
        // the user navigated to another view must not clobber that view's
        // fresher context.
        it('does not write the detail nav context when the user has navigated away', async () => {
            api.getTeamIssues.mockResolvedValue([{ id: 'issue-1' }]);
            getCurrentView.mockReturnValue('issues'); // no longer on the Dashboard

            await loadMyIssues();

            expect(setDetailNavContext).not.toHaveBeenCalled();
            // Dashboard's own local state still updates
            expect(getMyIssues()).toEqual([{ id: 'issue-1' }]);
        });

        // CHT-1211 review #3: same monotonic-request-id protection as
        // loadIssues()/loadBoard() — a stale response from a superseded
        // loadMyIssues() call must be dropped.
        describe('request sequencing (out-of-order responses)', () => {
            it('drops a slow response from an earlier filter change', async () => {
                let resolveFirst;
                const firstRequest = new Promise((resolve) => { resolveFirst = resolve; });
                const staleIssues = [{ id: 'stale' }];
                const freshIssues = [{ id: 'fresh' }];

                api.getTeamIssues.mockImplementationOnce(() => firstRequest);
                const firstLoad = loadMyIssues(); // in flight, slow

                api.getTeamIssues.mockImplementationOnce(() => Promise.resolve(freshIssues));
                await loadMyIssues(); // resolves first (faster)

                expect(getMyIssues()).toEqual(freshIssues);

                // The slow first request now resolves — must be dropped
                resolveFirst(staleIssues);
                await firstLoad;

                expect(getMyIssues()).toEqual(freshIssues);
            });
        });

        it('applies status filter from dropdown', async () => {
            document.getElementById('my-issues-status-filter').value = 'todo';
            api.getTeamIssues.mockResolvedValue([]);

            await loadMyIssues();

            expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', {
                assignee_id: 'user-1',
                status: 'todo',
                limit: 1000,
            });
        });

        it('shows loading skeleton before loading', async () => {
            api.getTeamIssues.mockImplementation(() => new Promise(() => {})); // Never resolves

            loadMyIssues();

            const list = document.getElementById('my-issues-list');
            expect(list.innerHTML).toContain('skeleton');
        });

        it('shows toast on error', async () => {
            api.getTeamIssues.mockRejectedValue(new Error('Network error'));

            await loadMyIssues();

            expect(showApiError).toHaveBeenCalledWith('load issues', expect.objectContaining({ message: 'Network error' }));
        });

        // CHT-1224: the loading skeleton must not be left stuck on screen
        // forever when the fetch fails.
        it('replaces the stuck loading skeleton with a persistent error + Retry cta on failure', async () => {
            api.getTeamIssues.mockRejectedValue(new Error('Network error'));

            await loadMyIssues();

            const list = document.getElementById('my-issues-list');
            expect(list.innerHTML).toContain('Failed to load issues');
            expect(list.innerHTML).toContain('data-action="retry-load-my-issues"');
            // CHT-1224: error state visually distinguishable from empty state
            expect(list.innerHTML).toContain('empty-state-error');
        });

        it('wires the retry-load-my-issues action to re-run loadMyIssues()', async () => {
            api.getTeamIssues.mockRejectedValue(new Error('Network error'));
            await loadMyIssues();
            api.getTeamIssues.mockResolvedValue([]);

            await dashboardActions['retry-load-my-issues']();

            expect(api.getTeamIssues).toHaveBeenCalledTimes(2);
        });

        it('does nothing if no current team', async () => {
            getCurrentTeam.mockReturnValue(null);

            await loadMyIssues();

            expect(api.getTeamIssues).not.toHaveBeenCalled();
        });

        it('does nothing if no current user', async () => {
            getCurrentUser.mockReturnValue(null);

            await loadMyIssues();

            expect(api.getTeamIssues).not.toHaveBeenCalled();
        });

        it('uses getIssues with project_id when project filter is set (CHT-853)', async () => {
            getCurrentProject.mockReturnValue('proj-1');
            const mockIssues = [{ id: 'issue-1', title: 'Filtered' }];
            api.getIssues.mockResolvedValue(mockIssues);

            await loadMyIssues();

            expect(api.getIssues).toHaveBeenCalledWith({
                assignee_id: 'user-1',
                status: undefined,
                limit: 1000,
                project_id: 'proj-1',
            });
            expect(api.getTeamIssues).not.toHaveBeenCalled();
            expect(getMyIssues()).toEqual(mockIssues);
        });

        it('uses getTeamIssues when project filter is empty (CHT-853)', async () => {
            getCurrentProject.mockReturnValue(null);
            api.getTeamIssues.mockResolvedValue([]);

            await loadMyIssues();

            expect(api.getTeamIssues).toHaveBeenCalled();
            expect(api.getIssues).not.toHaveBeenCalled();
        });
    });

    describe('loadDashboardActivity', () => {
        it('loads recent activities for team', async () => {
            const mockActivities = [
                { id: 'act-1', activity_type: 'updated', user_name: 'User 1' },
            ];
            api.getTeamActivities.mockResolvedValue(mockActivities);

            await loadDashboardActivity();

            expect(api.getTeamActivities).toHaveBeenCalledWith('team-1', 0, 10, { projectId: null });
            expect(getDashboardActivities()).toEqual(mockActivities);
        });

        it('shows loading state while loading', async () => {
            api.getTeamActivities.mockImplementation(() => new Promise(() => {}));

            loadDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('Loading activity');
        });

        it('skips loading state when showLoading is false', async () => {
            const container = document.getElementById('dashboard-activity-list');
            container.innerHTML = '<div>Existing content</div>';
            api.getTeamActivities.mockImplementation(() => new Promise(() => {}));

            loadDashboardActivity({ showLoading: false });

            expect(container.innerHTML).toContain('Existing content');
            expect(container.innerHTML).not.toContain('Loading activity');
        });

        it('shows error message on failure', async () => {
            api.getTeamActivities.mockRejectedValue(new Error('Failed'));

            await loadDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('Failed to load activity');
            expect(container.innerHTML).toContain('Check your connection and try again');
            expect(container.innerHTML).toContain('empty-state');
            // CHT-1224: error state visually distinguishable from empty state
            expect(container.innerHTML).toContain('empty-state-error');
        });

        it('does nothing if no current team', async () => {
            getCurrentTeam.mockReturnValue(null);

            await loadDashboardActivity();

            expect(api.getTeamActivities).not.toHaveBeenCalled();
        });
    });

    // CHT-2027: one project gets a card, several get compact rows.
    describe('sprint panel layout', () => {
        const sprint = (id, extra = {}) => ({ id, name: `Sprint ${id}`, budget: 20, points_spent: 0, limbo: false, ...extra });
        const many = (n) => Array.from({ length: n }, (_, i) => ({
            project: { id: `p${i}`, name: `Project ${i}` },
            sprint: sprint(`s${i}`, { points_spent: i }),
            statusCounts: {},
        }));

        beforeEach(() => {
            resetSprintRowsExpanded();
            api.getCurrentSprint.mockReset();
            api.getIssues.mockReset();
        });

        it('uses a singular heading and says what is left for one project', () => {
            renderSprintStatus([{
                project: { id: 'p1', name: 'Project 1' },
                sprint: sprint('a', { points_spent: 15, activated_at: new Date(Date.now() - 2 * 86400000).toISOString() }),
                statusCounts: { done: 3, in_progress: 1 },
            }], { single: true });
            const html = document.getElementById('dashboard-sprint-status').innerHTML;
            expect(html).toContain('Current sprint');
            expect(html).not.toContain('Active sprints');
            expect(html).toContain('<strong>5</strong> pts left');
            expect(html).toContain('Day 3'); // two full days in: the third day
            expect(html).toContain('4 issues');
            expect(html).toContain('data-action="view-sprint"');
        });

        it('tells the reader to close an over-budget sprint', () => {
            renderSprintStatus([{ project: { id: 'p1', name: 'P' }, sprint: sprint('a', { points_spent: 23 }), statusCounts: {} }], { single: true });
            const html = document.getElementById('dashboard-sprint-status').innerHTML;
            expect(html).toContain('<strong>3</strong> pts over budget');
            expect(html).toContain('badge badge-danger');
            expect(html).toContain('meter is-over');
            expect(html).toContain('Close the sprint');
            expect(html).toContain('No issues planned');
        });

        it('caps the many-projects list and expands on Show all', () => {
            renderSprintStatus(many(8), { single: false });
            const container = document.getElementById('dashboard-sprint-status');
            expect(container.querySelectorAll('.sprint-row')).toHaveLength(5);
            expect(container.innerHTML).toContain('Show all 8');
            expect(container.querySelector('.section-count').textContent).toBe('8');
        });

        it('Show all re-renders the last load with every row', async () => {
            getCurrentProject.mockReturnValue(null);
            setProjects(Array.from({ length: 7 }, (_, i) => ({ id: `p${i}`, name: `Project ${i}` })));
            api.getCurrentSprint.mockImplementation(async (pid) => sprint(pid));
            await loadSprintStatus();
            const container = document.getElementById('dashboard-sprint-status');
            expect(container.querySelectorAll('.sprint-row')).toHaveLength(5);
            // Many projects: points only, no per-project issue fetch.
            expect(api.getIssues).not.toHaveBeenCalled();
            dashboardActions['dash-sprints-toggle']();
            expect(container.querySelectorAll('.sprint-row')).toHaveLength(7);
            const toggle = container.querySelector('[data-action="dash-sprints-toggle"]');
            expect(toggle.textContent).toBe('Show fewer');
            expect(toggle.getAttribute('aria-expanded')).toBe('true');
            expect(document.activeElement).toBe(toggle);
            dashboardActions['dash-sprints-toggle']();
            expect(container.querySelectorAll('.sprint-row')).toHaveLength(5);
        });

        it('starts collapsed again in a new team', async () => {
            getCurrentProject.mockReturnValue(null);
            setProjects(Array.from({ length: 7 }, (_, i) => ({ id: `p${i}`, name: `Project ${i}` })));
            api.getCurrentSprint.mockImplementation(async (pid) => sprint(pid));
            await loadSprintStatus();
            dashboardActions['dash-sprints-toggle']();
            getCurrentTeam.mockReturnValue({ id: 'team-2', name: 'Other' });
            await loadSprintStatus();
            expect(document.querySelectorAll('.sprint-row')).toHaveLength(5);
        });

        it('ignores Show all while a load is in flight', () => {
            renderSprintStatus(many(8), { single: false });
            resetSprintRowsExpanded(); // as a new load does: no current data
            dashboardActions['dash-sprints-toggle']();
            expect(document.querySelectorAll('.sprint-row')).toHaveLength(5);
        });

        it('shows no toggle at exactly five rows', () => {
            renderSprintStatus(many(5), { single: false });
            expect(document.querySelectorAll('.sprint-row')).toHaveLength(5);
            expect(document.querySelector('[data-action="dash-sprints-toggle"]')).toBeNull();
        });

        it('says when issue counts failed instead of claiming an empty sprint', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            getCurrentProject.mockReturnValue('proj-1');
            setProjects([{ id: 'proj-1', name: 'Project 1' }]);
            api.getCurrentSprint.mockResolvedValue(sprint('a'));
            api.getIssues.mockRejectedValue(new Error('boom'));
            await loadSprintStatus();
            const html = document.getElementById('dashboard-sprint-status').innerHTML;
            expect(html).toContain('Issue counts unavailable');
            expect(html).not.toContain('No issues planned');
            consoleErrorSpy.mockRestore();
        });

        it('explains limbo on the card and in a row', () => {
            const limbo = { project: { id: 'p', name: 'P' }, sprint: sprint('a', { limbo: true }), statusCounts: {} };
            renderSprintStatus([limbo], { single: true });
            let c = document.getElementById('dashboard-sprint-status');
            expect(c.querySelector('.sprint-focus.limbo')).not.toBeNull();
            expect(c.innerHTML).toContain('waiting on sprint rituals');
            renderSprintStatus([limbo, ...many(1)], { single: false });
            c = document.getElementById('dashboard-sprint-status');
            expect(c.querySelector('.sprint-row.limbo .sr-only').textContent).toBe(', in limbo');
        });

        it('marks a nearly spent row and an unbudgeted row', () => {
            renderSprintStatus([
                { project: { id: 'a', name: 'A' }, sprint: sprint('a', { points_spent: 17 }) },
                { project: { id: 'b', name: 'B' }, sprint: sprint('b', { budget: null, points_spent: 4 }) },
            ], { single: false });
            const rows = document.querySelectorAll('.sprint-row');
            expect(rows[0].classList.contains('near')).toBe(true);
            expect(rows[0].querySelector('.meter.is-near')).not.toBeNull();
            expect(rows[0].querySelector('.state-dot.is-near')).not.toBeNull();
            expect(rows[1].querySelector('.sprint-row-nometer')).not.toBeNull();
            expect(rows[1].querySelector('.meter-label').textContent).toContain('4 pts');
        });

        it('escapes project and sprint names in rows and the card', () => {
            const evil = '<img src=x onerror=alert(1)>';
            renderSprintStatus([
                { project: { id: 'a', name: evil }, sprint: sprint('a', { name: evil }) },
                ...many(1),
            ], { single: false });
            expect(document.querySelector('#dashboard-sprint-status img')).toBeNull();
            renderSprintStatus([{ project: { id: 'a', name: evil }, sprint: sprint('a', { name: evil }), statusCounts: {} }], { single: true });
            expect(document.querySelector('#dashboard-sprint-status img')).toBeNull();
        });

        it('keeps a button card free of block children', () => {
            renderSprintStatus([{ project: { id: 'p', name: 'P' }, sprint: sprint('a', { points_spent: 3 }), statusCounts: { todo: 2 } }], { single: true });
            expect(document.querySelector('.sprint-focus div')).toBeNull();
        });

        it('keeps ties in project order and limbo above a bigger arrears', () => {
            const row = (id, s) => ({ project: { id, name: id }, sprint: sprint(id, s) });
            const sorted = sortSprintsByAttention([
                row('first', { points_spent: 10 }),
                row('second', { points_spent: 10 }),
                row('over', { points_spent: 90 }),
                row('limbo', { limbo: true }),
            ]).map(d => d.project.id);
            expect(sorted).toEqual(['limbo', 'over', 'first', 'second']);
        });

        it('puts limbo and arrears first and counts them', () => {
            const data = many(3);
            data.push({ project: { id: 'x', name: 'Over' }, sprint: sprint('x', { points_spent: 30 }), statusCounts: {} });
            data.push({ project: { id: 'y', name: 'Stuck' }, sprint: sprint('y', { limbo: true }), statusCounts: {} });
            renderSprintStatus(data, { single: false });
            const rows = [...document.querySelectorAll('.sprint-row-project')].map(e => e.textContent);
            expect(rows.slice(0, 2)).toEqual(['Stuck', 'Over']);
            expect(document.querySelector('.sprint-attention').textContent).toBe('1 in arrears · 1 in limbo');
        });

        it('orders budgeted sprints by fill, then unbudgeted by points', () => {
            const row = (id, s) => ({ project: { id, name: id }, sprint: sprint(id, s) });
            const sorted = sortSprintsByAttention([
                row('idle', { budget: null, points_spent: 0 }),
                row('busy', { budget: null, points_spent: 50 }),
                row('half', { points_spent: 10 }),
                row('nearly', { points_spent: 18 }),
            ]).map(d => d.project.id);
            expect(sorted).toEqual(['nearly', 'half', 'busy', 'idle']);
        });

        it('treats a 0 budget as a real budget and null as unlimited', () => {
            expect(describeSprintBudget({ budget: 0, points_spent: 1 }).overBudget).toBe(true);
            expect(describeSprintBudget({ budget: null, points_spent: 99 }).hasBudget).toBe(false);
            expect(describeSprintBudget({ budget: 10, points_spent: 8 }).state).toBe('near');
        });
    });

    // CHT-1224: dashboard.js:234-256 (loadSprintStatus) — outer catch used to
    // blank the whole section with zero indication, and a per-project sprint
    // fetch failure was indistinguishable from "no active sprint".
    describe('loadSprintStatus', () => {
        beforeEach(() => {
            setProjects([{ id: 'proj-1', name: 'Project 1' }]);
        });

        it('renders sprint cards for projects with an active sprint', async () => {
            api.getCurrentSprint.mockResolvedValue({ id: 'sprint-1', name: 'Sprint 1', budget: 10, points_spent: 2 });
            api.getIssues.mockResolvedValue([{ status: 'todo' }]);

            await loadSprintStatus();

            const container = document.getElementById('dashboard-sprint-status');
            expect(container.innerHTML).toContain('Sprint 1');
        });

        it('logs and omits the project card when getCurrentSprint fails, instead of looking like "no active sprint"', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            api.getCurrentSprint.mockRejectedValue(new Error('boom'));

            await loadSprintStatus();

            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to load current sprint'), expect.any(Error));
            expect(document.getElementById('dashboard-sprint-status').innerHTML).toBe('');
            consoleErrorSpy.mockRestore();
        });

        it('logs when the per-sprint issue-count fetch fails but still renders the sprint card', async () => {
            getCurrentProject.mockReturnValue('proj-1');
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            api.getCurrentSprint.mockResolvedValue({ id: 'sprint-1', name: 'Sprint 1', budget: 10, points_spent: 2 });
            api.getIssues.mockRejectedValue(new Error('boom'));

            await loadSprintStatus();

            expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to load issue counts'), expect.any(Error));
            const container = document.getElementById('dashboard-sprint-status');
            expect(container.innerHTML).toContain('Sprint 1');
            consoleErrorSpy.mockRestore();
        });

        // Realistic per-project failures are all swallowed by the inner
        // try/catch above (by design — one bad project shouldn't blank the
        // whole widget), so the outer catch only fires on an unexpected
        // failure in the aggregation/render step itself. Force that directly
        // by making Promise.all reject, to verify the fallback rendering.
        it('renders a persistent error + Retry cta instead of blanking the section when the aggregation step itself fails', async () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const promiseAllSpy = vi.spyOn(Promise, 'all').mockRejectedValueOnce(new Error('unexpected'));
            api.getCurrentSprint.mockResolvedValue({ id: 'sprint-1', name: 'Sprint 1' });

            await loadSprintStatus();

            const container = document.getElementById('dashboard-sprint-status');
            // The utils.js mock's escapeHtml strips apostrophes, so assert on
            // the substring unaffected by that stubbing.
            expect(container.innerHTML).toContain('load sprint status');
            expect(container.innerHTML).toContain('data-action="retry-load-sprint-status"');
            // CHT-1224: error state visually distinguishable from empty state
            expect(container.innerHTML).toContain('empty-state-error');
            promiseAllSpy.mockRestore();
            consoleErrorSpy.mockRestore();
        });

        it('wires the retry-load-sprint-status action to re-run loadSprintStatus()', async () => {
            api.getCurrentSprint.mockResolvedValue(null);

            await dashboardActions['retry-load-sprint-status']();

            expect(api.getCurrentSprint).toHaveBeenCalled();
        });

        it('clears the section with no projects (not a failure state)', async () => {
            setProjects([]);
            document.getElementById('dashboard-sprint-status').innerHTML = '<div>stale</div>';

            await loadSprintStatus();

            expect(document.getElementById('dashboard-sprint-status').innerHTML).toBe('');
        });

        // CHT-1224 PR #211 review finding 2: loadSprintStatus() now has a
        // Retry button AND an ambient project-switch subscriber — a Retry
        // racing a project switch must not paint stale sprint cards.
        describe('request sequencing (out-of-order responses)', () => {
            it('drops a slow response from a superseded loadSprintStatus()', async () => {
                let resolveFirst;
                api.getCurrentSprint.mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }));
                const firstLoad = loadSprintStatus(); // in flight, slow (e.g. a clicked Retry)

                api.getCurrentSprint.mockResolvedValue({ id: 'sprint-2', name: 'Fresh Sprint' });
                api.getIssues.mockResolvedValue([]);
                await loadSprintStatus(); // newer request resolves first

                const container = document.getElementById('dashboard-sprint-status');
                expect(container.innerHTML).toContain('Fresh Sprint');

                // The slow first request now resolves — must be dropped
                resolveFirst({ id: 'sprint-1', name: 'Stale Sprint' });
                await firstLoad;

                expect(container.innerHTML).toContain('Fresh Sprint');
                expect(container.innerHTML).not.toContain('Stale Sprint');
            });

            it('a stale failure does not paint the error card over fresher data', async () => {
                const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
                let rejectFirst;
                const promiseAllSpy = vi.spyOn(Promise, 'all').mockImplementationOnce(() => new Promise((_resolve, reject) => { rejectFirst = reject; }));
                api.getCurrentSprint.mockResolvedValue({ id: 'sprint-2', name: 'Fresh Sprint' });
                api.getIssues.mockResolvedValue([]);

                const firstLoad = loadSprintStatus(); // aggregation will fail late
                await loadSprintStatus(); // newer request resolves first

                const container = document.getElementById('dashboard-sprint-status');
                expect(container.innerHTML).toContain('Fresh Sprint');

                rejectFirst(new Error('slow aggregation died'));
                await firstLoad;

                expect(container.innerHTML).toContain('Fresh Sprint');
                expect(container.innerHTML).not.toContain('load sprint status');
                promiseAllSpy.mockRestore();
                consoleErrorSpy.mockRestore();
            });
        });
    });

    describe('renderMyIssues', () => {
        it('renders issues using renderIssueRow', () => {
            setMyIssues([
                { id: 'issue-1', title: 'Issue 1' },
                { id: 'issue-2', title: 'Issue 2' },
            ]);

            renderMyIssues();

            const list = document.getElementById('my-issues-list');
            expect(list.innerHTML).toContain('Issue 1');
            expect(list.innerHTML).toContain('Issue 2');
            expect(renderIssueRow).toHaveBeenCalledTimes(2);
        });

        it('renders empty state when no issues', () => {
            setMyIssues([]);

            renderMyIssues();

            const list = document.getElementById('my-issues-list');
            expect(list.innerHTML).toContain('No issues assigned to you');
        });

        it('adds issue-list-linear class', () => {
            setMyIssues([{ id: 'issue-1', title: 'Issue 1' }]);

            renderMyIssues();

            const list = document.getElementById('my-issues-list');
            expect(list.classList.contains('issue-list-linear')).toBe(true);
        });

        it('does nothing if container not found', () => {
            document.body.innerHTML = '';

            // Should not throw
            renderMyIssues();
        });

        it('groups rows under status headers in workflow order (CHT-1963)', () => {
            setMyIssues([
                { id: 'a', title: 'A', status: 'backlog' },
                { id: 'b', title: 'B', status: 'in_progress' },
                { id: 'c', title: 'C', status: 'done' },
                { id: 'd', title: 'D', status: 'in_progress' },
            ]);
            renderMyIssues();
            const headers = [...document.querySelectorAll('.dash-group-header')].map(h => h.textContent.replace(/\s+/g, ' ').trim());
            expect(headers).toEqual(['In progress 2', 'Backlog 1', 'Done 1']);
            const sections = document.querySelectorAll('.dash-group[role="group"]');
            expect(sections[0].getAttribute('aria-labelledby')).toBe('dash-group-in_progress');
            expect(sections[0].querySelectorAll('.issue-row').length).toBe(2);
        });

        it('shows the total in the section count and resets the keyboard cursor', () => {
            document.body.insertAdjacentHTML('beforeend', '<span id="my-issues-count"></span>');
            setSelectedMyIssueIndex(3);
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }, { id: 'b', title: 'B', status: 'todo' }]);
            renderMyIssues();
            expect(document.getElementById('my-issues-count').textContent).toBe('2');
            expect(getSelectedMyIssueIndex()).toBe(-1);
            setMyIssues([]);
            renderMyIssues();
            expect(document.getElementById('my-issues-count').textContent).toBe('');
        });
    });

    describe('keyboard cursor and order across re-renders (CHT-1963 review)', () => {
        beforeEach(() => {
            renderIssueRow.mockImplementation((issue) => `<div class="issue-row" data-issue-id="${issue.id}">${issue.title}</div>`);
        });

        it('puts the cursor back on the same issue after a re-render that moved it', () => {
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }, { id: 'b', title: 'B', status: 'todo' }]);
            renderMyIssues();
            setSelectedMyIssueIndex(1); // on b
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }, { id: 'b', title: 'B', status: 'in_progress' }]);
            renderMyIssues();
            expect(getSelectedMyIssueIndex()).toBe(0);
            expect(document.querySelector('.keyboard-selected').dataset.issueId).toBe('b');
        });

        it('drops the cursor when its issue is gone, and Escape-style -1 forgets it', () => {
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }]);
            renderMyIssues();
            setSelectedMyIssueIndex(0);
            setMyIssues([{ id: 'z', title: 'Z', status: 'todo' }]);
            renderMyIssues();
            expect(getSelectedMyIssueIndex()).toBe(-1);
            setSelectedMyIssueIndex(-1);
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }]);
            renderMyIssues();
            expect(document.querySelector('.keyboard-selected')).toBeNull();
        });

        it('normalises any writer (a live prepend) to grouped order and updates the nav context', () => {
            getCurrentView.mockReturnValue('my-issues');
            setMyIssues([{ id: 'new', title: 'N', status: 'backlog' }, { id: 'p', title: 'P', status: 'in_progress' }]);
            renderMyIssues();
            expect(getMyIssues().map(i => i.id)).toEqual(['p', 'new']);
            expect(setDetailNavContext.mock.calls.at(-1)[0].map(i => i.id)).toEqual(['p', 'new']);
        });

        it('gives focus back to the same control on the rebuilt row', () => {
            renderIssueRow.mockImplementation((issue) => `<div class="issue-row" data-issue-id="${issue.id}"><button data-dropdown-type="status">s</button><a class="issue-title" href="#">${issue.title}</a></div>`);
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }, { id: 'b', title: 'B', status: 'todo' }]);
            renderMyIssues();
            document.querySelector('[data-issue-id="b"] [data-dropdown-type="status"]').focus();
            setMyIssues([{ id: 'a', title: 'A', status: 'todo' }, { id: 'b', title: 'B', status: 'done' }]);
            renderMyIssues();
            expect(document.activeElement.closest('.issue-row').dataset.issueId).toBe('b');
            expect(document.activeElement.dataset.dropdownType).toBe('status');
        });

        it('shows five Done rows with a Show all button that expands the group', () => {
            const done = Array.from({ length: 8 }, (_, i) => ({ id: `d${i}`, title: `D${i}`, status: 'done' }));
            setMyIssues(done);
            renderMyIssues();
            expect(document.querySelectorAll('.issue-row').length).toBe(5);
            const more = document.querySelector('.dash-group-more');
            expect(more.textContent).toBe('Show all 8');
            dashboardActions['dash-show-all'](new Event('click'), { status: 'done' });
            expect(document.querySelectorAll('.issue-row').length).toBe(8);
            expect(document.querySelector('.dash-group-more')).toBeNull();
        });
    });

    describe('groupMyIssues', () => {
        it('orders groups by workflow, drops empty ones, and keeps unknown statuses last', () => {
            const groups = groupMyIssues([
                { id: 1, status: 'todo' },
                { id: 2, status: 'weird' },
                { id: 3, status: 'in_review' },
                { id: 4, status: 'canceled' },
            ]);
            expect(groups.map(g => g.status)).toEqual(['in_review', 'todo', 'canceled', 'other']);
            expect(groups[3].issues.map(i => i.id)).toEqual([2]);
        });
    });

    describe('renderDashboardActivity', () => {
        it('renders activities', () => {
            setDashboardActivities([
                { id: 'act-1', activity_type: 'updated', user_name: 'User 1' },
            ]);

            renderDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('activity-item');
            expect(getActivityIcon).toHaveBeenCalled();
            expect(formatActivityText).toHaveBeenCalled();
            expect(formatActivityActor).toHaveBeenCalled();
        });

        it('renders empty state when no activities', () => {
            setDashboardActivities([]);

            renderDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('No recent activity');
            expect(container.innerHTML).toContain('Create or update issues to see activity here');
            expect(container.innerHTML).toContain('empty-state');
        });

        it('renders issue link when issue_identifier present', () => {
            setDashboardActivities([
                { id: 'act-1', activity_type: 'updated', issue_identifier: 'PROJ-1', user_name: 'User 1' },
            ]);

            renderDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('PROJ-1');
            expect(container.innerHTML).toContain('activity-issue-link');
        });

        it('renders document link when document_id present', () => {
            setDashboardActivities([
                { id: 'act-1', activity_type: 'doc_created', document_id: 'doc-1', document_title: 'My Doc', user_name: 'User 1' },
            ]);

            renderDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('My Doc');
            expect(container.innerHTML).toContain('activity-doc-link');
        });

        it('does nothing if container not found', () => {
            document.body.innerHTML = '';

            // Should not throw
            renderDashboardActivity();
        });
    });

    describe('showMyIssuesLoadingSkeleton', () => {
        it('renders skeleton items', () => {
            showMyIssuesLoadingSkeleton();

            const list = document.getElementById('my-issues-list');
            const skeletons = list.querySelectorAll('.skeleton-list-item');
            expect(skeletons.length).toBe(5);
        });

        it('does nothing if container not found', () => {
            document.body.innerHTML = '';

            // Should not throw
            showMyIssuesLoadingSkeleton();
        });
    });

    describe('filterMyIssues', () => {
        it('reloads issues with filter', async () => {
            getCurrentProject.mockReturnValue(null);
            api.getTeamIssues.mockResolvedValue([]);

            await filterMyIssues();

            expect(api.getTeamIssues).toHaveBeenCalled();
        });
    });
});
