/**
 * Tests for ws-handlers.js module (CHT-1039)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getCurrentUser: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'my-issues'),
    getWebsocket: vi.fn(() => null),
    setWebsocket: vi.fn(),
    getCurrentDetailIssue: vi.fn(() => null),
    setCurrentDetailIssue: vi.fn(),
}));

// Mock dashboard.js
vi.mock('./dashboard.js', () => ({
    getMyIssues: vi.fn(() => []),
    setMyIssues: vi.fn(),
    renderMyIssues: vi.fn(),
    loadDashboardActivity: vi.fn(),
}));

// Mock issue-list.js
vi.mock('./issue-list.js', () => ({
    renderIssues: vi.fn(),
}));

// Mock board.js
vi.mock('./board.js', () => ({
    renderBoard: vi.fn(),
}));

// Mock sprints.js
vi.mock('./sprints.js', () => ({
    loadSprints: vi.fn(),
    viewSprint: vi.fn(),
    getCurrentSprintDetail: vi.fn(() => null),
}));

// Mock projects.js
vi.mock('./projects.js', () => ({
    loadProjects: vi.fn(() => Promise.resolve()),
    renderProjects: vi.fn(),
}));

// Mock issue-detail-view.js
vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

// Mock router.js
vi.mock('./router.js', () => ({
    navigateTo: vi.fn(),
}));

// Mock ui.js
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

// Mock gate-approvals.js
const mockLoadGateApprovals = vi.fn();
vi.mock('./gate-approvals.js', () => ({
    loadGateApprovals: (...args) => mockLoadGateApprovals(...args),
}));

import { getIssues, setIssues, getCurrentUser, getCurrentView, getCurrentDetailIssue } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadDashboardActivity } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { renderBoard } from './board.js';
import { loadSprints, viewSprint, getCurrentSprintDetail } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';
import { dispatch, resetWsState } from './ws.js';
import { registerWsHandlers } from './ws-handlers.js';

describe('ws-handlers.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetWsState();
        registerWsHandlers();

        getIssues.mockReturnValue([]);
        getMyIssues.mockReturnValue([]);
        getCurrentView.mockReturnValue('my-issues');
        getCurrentUser.mockReturnValue({ id: 'user-1' });
        getCurrentDetailIssue.mockReturnValue(null);
    });

    describe('issue:created', () => {
        const newIssue = { id: 'issue-1', identifier: 'CHT-1', title: 'New Issue', assignee_id: 'user-2' };

        it('adds new issue to issues list', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });

            expect(setIssues).toHaveBeenCalledWith([newIssue]);
            expect(renderIssues).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('New issue: CHT-1', 'info');
        });

        it('skips duplicate issues', () => {
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Existing' }]);
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(setIssues).not.toHaveBeenCalled();
        });

        it('replaces optimistic issue with real data', () => {
            const optimistic = { id: 'temp-1', title: 'New Issue', _isOptimistic: true };
            getIssues.mockReturnValue([optimistic]);
            getCurrentView.mockReturnValue('issues');

            dispatch({ type: 'created', entity: 'issue', data: newIssue });

            expect(setIssues).toHaveBeenCalledWith([newIssue]);
            expect(showToast).not.toHaveBeenCalled();
        });

        it('adds to myIssues if assigned to current user', () => {
            const myIssue = { ...newIssue, assignee_id: 'user-1' };
            getCurrentUser.mockReturnValue({ id: 'user-1' });

            dispatch({ type: 'created', entity: 'issue', data: myIssue });
            expect(setMyIssues).toHaveBeenCalledWith([myIssue]);
        });

        it('re-renders board on board view', () => {
            getCurrentView.mockReturnValue('board');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(renderBoard).toHaveBeenCalled();
        });

        it('reloads sprints on sprints view (list)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue(null);
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('refreshes detail if child issue created', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'parent-1' });
            const childIssue = { ...newIssue, parent_id: 'parent-1' };

            dispatch({ type: 'created', entity: 'issue', data: childIssue });
            expect(viewIssue).toHaveBeenCalledWith('parent-1', false);
        });
    });

    describe('issue:updated', () => {
        const updatedIssue = { id: 'issue-1', title: 'Updated' };

        it('updates issue in issues list', () => {
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentView.mockReturnValue('issues');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });

            expect(setIssues).toHaveBeenCalledWith([updatedIssue]);
            expect(renderIssues).toHaveBeenCalled();
        });

        it('updates issue in myIssues list', () => {
            getMyIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentView.mockReturnValue('my-issues');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });

            expect(setMyIssues).toHaveBeenCalledWith([updatedIssue]);
            expect(renderMyIssues).toHaveBeenCalled();
        });

        it('re-renders board view', () => {
            getCurrentView.mockReturnValue('board');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(renderBoard).toHaveBeenCalled();
        });

        it('reloads sprints list on sprints view', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentSprintDetail.mockReturnValue(null);
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('refreshes detail view if viewing updated issue', () => {
            getCurrentView.mockReturnValue('issue-detail');
            document.body.innerHTML = '<div id="issue-detail-content" data-issue-id="issue-1"></div>';

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewIssue).toHaveBeenCalledWith('issue-1');
        });
    });

    describe('issue:deleted', () => {
        const deletedIssue = { id: 'issue-1', identifier: 'CHT-1' };

        it('removes issue from both lists', () => {
            getIssues.mockReturnValue([{ id: 'issue-1' }, { id: 'issue-2' }]);
            getMyIssues.mockReturnValue([{ id: 'issue-1' }]);
            getCurrentView.mockReturnValue('issues');

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });

            expect(setIssues).toHaveBeenCalledWith([{ id: 'issue-2' }]);
            expect(setMyIssues).toHaveBeenCalledWith([]);
            expect(showToast).toHaveBeenCalledWith('Issue CHT-1 deleted', 'info');
        });

        it('reloads sprints list on sprints view', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            getCurrentSprintDetail.mockReturnValue(null);
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('navigates away from deleted issue detail', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });

            expect(navigateTo).toHaveBeenCalledWith('my-issues');
            expect(showToast).toHaveBeenCalledWith('Issue CHT-1 was deleted', 'warning');
        });
    });

    describe('comment', () => {
        it('loads dashboard activity on my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('refreshes issue detail if viewing the commented issue', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });

            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
        });
    });

    describe('relation', () => {
        it('refreshes detail if viewing related issue', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });

            dispatch({
                type: 'created',
                entity: 'relation',
                data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
            });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
        });
    });

    describe('project', () => {
        it('refreshes projects on created event', async () => {
            getCurrentView.mockReturnValue('projects');
            dispatch({ type: 'created', entity: 'project', data: { name: 'New Project' } });
            expect(loadProjects).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('New project: New Project', 'info');
            await vi.waitFor(() => expect(renderProjects).toHaveBeenCalled());
        });

        it('does not show toast on updated event', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'updated', entity: 'project', data: { name: 'Updated' } });
            expect(loadProjects).toHaveBeenCalled();
            expect(showToast).not.toHaveBeenCalled();
        });
    });

    describe('sprint', () => {
        it('reloads sprints list when on sprints view with no detail open', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue(null);
            dispatch({ type: 'created', entity: 'sprint', data: { id: 's1' } });
            expect(loadSprints).toHaveBeenCalled();
            expect(viewSprint).not.toHaveBeenCalled();
        });

        it('refreshes sprint detail when viewing one (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('does not reload sprints when on other view', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(loadSprints).not.toHaveBeenCalled();
            expect(viewSprint).not.toHaveBeenCalled();
        });
    });

    describe('attestation', () => {
        it('refreshes issue detail if viewing attested issue', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });

            dispatch({ type: 'created', entity: 'attestation', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
        });

        it('calls loadGateApprovals on gate-approvals view', () => {
            getCurrentView.mockReturnValue('gate-approvals');

            dispatch({ type: 'created', entity: 'attestation', data: { issue_id: 'issue-1' } });
            expect(mockLoadGateApprovals).toHaveBeenCalled();
        });
    });

    describe('activity', () => {
        it('loads dashboard activity on my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('refreshes issue detail if viewing the activity issue', () => {
            getCurrentView.mockReturnValue('issue-detail');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });

            dispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
        });
    });

    describe('unknown entity', () => {
        it('does nothing for unknown entities', () => {
            dispatch({ type: 'created', entity: 'unknown', data: {} });
            expect(setIssues).not.toHaveBeenCalled();
            expect(showToast).not.toHaveBeenCalled();
        });
    });
});
