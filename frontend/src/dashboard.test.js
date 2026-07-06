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
    renderMyIssues,
    renderDashboardActivity,
    showMyIssuesLoadingSkeleton,
    filterMyIssues,
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
            <select id="dashboard-project-filter">
                <option value="">All Projects</option>
                <option value="proj-1">Project 1</option>
            </select>
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
