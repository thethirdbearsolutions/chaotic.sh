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
    },
}));

vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((text) => text ? String(text).replace(/[&<>"']/g, '') : ''),
    escapeJsString: vi.fn((text) => text ? String(text).replace(/'/g, "\\'") : ''),
    formatTimeAgo: vi.fn(() => '2h ago'),
}));

import { api } from './api.js';
import { showToast } from './ui.js';
import {
    getMyIssues,
    setMyIssues,
    getDashboardActivities,
    setDashboardActivities,
    loadMyIssues,
    loadDashboardActivity,
    renderMyIssues,
    renderDashboardActivity,
    showMyIssuesLoadingSkeleton,
    filterMyIssues,
    setDependencies,
} from './dashboard.js';

describe('dashboard module', () => {
    let mockCurrentUser;
    let mockCurrentTeam;
    let mockRenderIssueRow;
    let mockFormatActivityText;
    let mockFormatActivityActor;
    let mockGetActivityIcon;

    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <div id="my-issues-list"></div>
            <div id="dashboard-activity-list"></div>
            <select id="dashboard-project-filter">
                <option value="">All Projects</option>
                <option value="proj-1">Project 1</option>
            </select>
            <select id="my-issues-status-filter">
                <option value="">All</option>
                <option value="todo">Todo</option>
            </select>
        `;

        // Mock dependencies
        mockCurrentUser = { id: 'user-1', name: 'Test User' };
        mockCurrentTeam = { id: 'team-1', name: 'Test Team' };
        mockRenderIssueRow = vi.fn((issue) => `<div class="issue-row">${issue.title}</div>`);
        mockFormatActivityText = vi.fn((activity) => activity.activity_type);
        mockFormatActivityActor = vi.fn((activity) => activity.user_name || 'Unknown');
        mockGetActivityIcon = vi.fn(() => '📝');

        // Set dependencies
        setDependencies({
            getCurrentUser: () => mockCurrentUser,
            getCurrentTeam: () => mockCurrentTeam,
            renderIssueRow: mockRenderIssueRow,
            formatActivityText: mockFormatActivityText,
            formatActivityActor: mockFormatActivityActor,
            getActivityIcon: mockGetActivityIcon,
            navigateToIssueByIdentifier: vi.fn(),
            viewDocument: vi.fn(),
        });

        // Reset state
        setMyIssues([]);
        setDashboardActivities([]);

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

            expect(showToast).toHaveBeenCalledWith('Network error', 'error');
        });

        it('does nothing if no current team', async () => {
            setDependencies({
                getCurrentUser: () => mockCurrentUser,
                getCurrentTeam: () => null,
                renderIssueRow: mockRenderIssueRow,
            });

            await loadMyIssues();

            expect(api.getTeamIssues).not.toHaveBeenCalled();
        });

        it('does nothing if no current user', async () => {
            setDependencies({
                getCurrentUser: () => null,
                getCurrentTeam: () => mockCurrentTeam,
                renderIssueRow: mockRenderIssueRow,
            });

            await loadMyIssues();

            expect(api.getTeamIssues).not.toHaveBeenCalled();
        });

        it('uses getIssues with project_id when project filter is set (CHT-853)', async () => {
            document.getElementById('dashboard-project-filter').value = 'proj-1';
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
            document.getElementById('dashboard-project-filter').value = '';
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

            expect(api.getTeamActivities).toHaveBeenCalledWith('team-1', 0, 10);
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
        });

        it('does nothing if no current team', async () => {
            setDependencies({
                getCurrentUser: () => mockCurrentUser,
                getCurrentTeam: () => null,
            });

            await loadDashboardActivity();

            expect(api.getTeamActivities).not.toHaveBeenCalled();
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
            expect(mockRenderIssueRow).toHaveBeenCalledTimes(2);
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
            expect(mockGetActivityIcon).toHaveBeenCalled();
            expect(mockFormatActivityText).toHaveBeenCalled();
            expect(mockFormatActivityActor).toHaveBeenCalled();
        });

        it('renders empty state when no activities', () => {
            setDashboardActivities([]);

            renderDashboardActivity();

            const container = document.getElementById('dashboard-activity-list');
            expect(container.innerHTML).toContain('No recent activity');
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
            api.getTeamIssues.mockResolvedValue([]);

            await filterMyIssues();

            expect(api.getTeamIssues).toHaveBeenCalled();
        });
    });
});
