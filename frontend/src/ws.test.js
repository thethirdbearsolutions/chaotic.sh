/**
 * Tests for ws.js module (CHT-785)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getCurrentUser: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'my-issues'),
    getWebsocket: vi.fn(() => null),
    setWebsocket: vi.fn(),
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
    showToast: vi.fn(),
}));

import { getIssues, setIssues, getCurrentUser, getCurrentView, getWebsocket, setWebsocket } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadDashboardActivity } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { renderBoard } from './board.js';
import { loadSprints } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';
import { connectWebSocket, handleWebSocketMessage, resetWsState } from './ws.js';

describe('ws.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetWsState();

        // Setup default mocks
        getIssues.mockReturnValue([]);
        getMyIssues.mockReturnValue([]);
        getCurrentView.mockReturnValue('my-issues');
        getCurrentUser.mockReturnValue({ id: 'user-1' });
        getWebsocket.mockReturnValue(null);

        // Mock window.api
        window.api = {
            getToken: vi.fn(() => 'test-token'),
        };
        window.currentTeam = { id: 'team-1' };
        window.currentDetailIssue = null;
    });

    afterEach(() => {
        delete window.api;
        delete window.currentTeam;
        delete window.currentDetailIssue;
    });

    describe('connectWebSocket', () => {
        let MockWebSocket;

        beforeEach(() => {
            MockWebSocket = vi.fn().mockImplementation(() => ({
                onopen: null,
                onmessage: null,
                onclose: null,
                onerror: null,
                close: vi.fn(),
            }));
            global.WebSocket = MockWebSocket;
        });

        afterEach(() => {
            delete global.WebSocket;
        });

        it('creates a WebSocket connection with correct URL', () => {
            connectWebSocket('team-1');
            expect(MockWebSocket).toHaveBeenCalledTimes(1);
            const url = MockWebSocket.mock.calls[0][0];
            expect(url).toContain('ws?token=test-token&team_id=team-1');
            expect(url).toMatch(/^wss?:\/\//);
        });

        it('stores the WebSocket via setWebsocket', () => {
            connectWebSocket('team-1');
            expect(setWebsocket).toHaveBeenCalled();
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];
            expect(ws).toBeTruthy();
        });

        it('closes existing WebSocket before creating new one', () => {
            const existingWs = { close: vi.fn() };
            getWebsocket.mockReturnValue(existingWs);

            connectWebSocket('team-1');

            expect(existingWs.close).toHaveBeenCalled();
            expect(setWebsocket).toHaveBeenCalledWith(null); // cleared first
        });

        it('does nothing if no token', () => {
            window.api.getToken.mockReturnValue(null);
            connectWebSocket('team-1');
            expect(MockWebSocket).not.toHaveBeenCalled();
        });

        it('shows reconnected toast after disconnect', () => {
            connectWebSocket('team-1');
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];

            // Simulate disconnect
            ws.onclose();
            expect(showToast).toHaveBeenCalledWith('Live updates disconnected. Reconnecting...', 'warning');

            // Now connect again and simulate onopen
            vi.clearAllMocks();
            connectWebSocket('team-1');
            const ws2 = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];
            ws2.onopen();
            expect(showToast).toHaveBeenCalledWith('Live updates reconnected', 'success');
        });

        it('handles WebSocket constructor errors', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            MockWebSocket.mockImplementation(() => { throw new Error('Connection refused'); });

            expect(() => connectWebSocket('team-1')).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith('Failed to connect WebSocket:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('handleWebSocketMessage', () => {
        describe('issue created', () => {
            const newIssue = { id: 'issue-1', identifier: 'CHT-1', title: 'New Issue', assignee_id: 'user-2' };

            it('adds new issue to issues list', () => {
                getCurrentView.mockReturnValue('issues');
                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });

                expect(setIssues).toHaveBeenCalledWith([newIssue]);
                expect(renderIssues).toHaveBeenCalled();
                expect(showToast).toHaveBeenCalledWith('New issue: CHT-1', 'info');
            });

            it('skips duplicate issues', () => {
                getIssues.mockReturnValue([{ id: 'issue-1', title: 'Existing' }]);
                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });

                expect(setIssues).not.toHaveBeenCalled();
            });

            it('replaces optimistic issue with real data', () => {
                const optimistic = { id: 'temp-1', title: 'New Issue', _isOptimistic: true };
                getIssues.mockReturnValue([optimistic]);
                getCurrentView.mockReturnValue('issues');

                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });

                expect(setIssues).toHaveBeenCalledWith([newIssue]);
                expect(showToast).not.toHaveBeenCalled(); // no toast for optimistic replace
            });

            it('adds to myIssues if assigned to current user', () => {
                const myIssue = { ...newIssue, assignee_id: 'user-1' };
                getCurrentUser.mockReturnValue({ id: 'user-1' });

                handleWebSocketMessage({ type: 'created', entity: 'issue', data: myIssue });

                expect(setMyIssues).toHaveBeenCalledWith([myIssue]);
            });

            it('replaces optimistic in myIssues', () => {
                const myIssue = { ...newIssue, assignee_id: 'user-1' };
                getCurrentUser.mockReturnValue({ id: 'user-1' });
                getMyIssues.mockReturnValue([{ id: 'temp-1', title: 'New Issue', _isOptimistic: true }]);

                handleWebSocketMessage({ type: 'created', entity: 'issue', data: myIssue });

                expect(setMyIssues).toHaveBeenCalledWith([myIssue]);
            });

            it('re-renders board on board view', () => {
                getCurrentView.mockReturnValue('board');
                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });
                expect(renderBoard).toHaveBeenCalled();
            });

            it('reloads sprints on sprints view', () => {
                getCurrentView.mockReturnValue('sprints');
                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });
                expect(loadSprints).toHaveBeenCalled();
            });

            it('refreshes detail if child issue created', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'parent-1' };
                const childIssue = { ...newIssue, parent_id: 'parent-1' };

                handleWebSocketMessage({ type: 'created', entity: 'issue', data: childIssue });
                expect(viewIssue).toHaveBeenCalledWith('parent-1', false);
            });

            it('loads dashboard activity on my-issues view', () => {
                getCurrentView.mockReturnValue('my-issues');
                handleWebSocketMessage({ type: 'created', entity: 'issue', data: newIssue });
                expect(loadDashboardActivity).toHaveBeenCalled();
            });
        });

        describe('issue updated', () => {
            const updatedIssue = { id: 'issue-1', title: 'Updated' };

            it('updates issue in issues list', () => {
                getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
                getCurrentView.mockReturnValue('issues');

                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });

                expect(setIssues).toHaveBeenCalledWith([updatedIssue]);
                expect(renderIssues).toHaveBeenCalled();
            });

            it('updates issue in myIssues list', () => {
                getMyIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
                getCurrentView.mockReturnValue('my-issues');

                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });

                expect(setMyIssues).toHaveBeenCalledWith([updatedIssue]);
                expect(renderMyIssues).toHaveBeenCalled();
                expect(loadDashboardActivity).toHaveBeenCalled();
            });

            it('does not update if issue not found', () => {
                getIssues.mockReturnValue([]);
                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });
                expect(setIssues).not.toHaveBeenCalled();
            });

            it('re-renders board view', () => {
                getCurrentView.mockReturnValue('board');
                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });
                expect(renderBoard).toHaveBeenCalled();
            });

            it('reloads sprints view', () => {
                getCurrentView.mockReturnValue('sprints');
                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });
                expect(loadSprints).toHaveBeenCalled();
            });

            it('refreshes detail view if viewing updated issue', () => {
                getCurrentView.mockReturnValue('issue-detail');
                document.body.innerHTML = '<div id="issue-detail-content" data-issue-id="issue-1"></div>';

                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });
                expect(viewIssue).toHaveBeenCalledWith('issue-1');
            });

            it('creates new arrays instead of mutating in place', () => {
                const originalArray = [{ id: 'issue-1', title: 'Old' }];
                getIssues.mockReturnValue(originalArray);
                getCurrentView.mockReturnValue('issues');

                handleWebSocketMessage({ type: 'updated', entity: 'issue', data: updatedIssue });

                // The new array passed to setIssues should be a different reference
                const newArray = setIssues.mock.calls[0][0];
                expect(newArray).not.toBe(originalArray);
                expect(newArray).toEqual([updatedIssue]);
            });
        });

        describe('issue deleted', () => {
            const deletedIssue = { id: 'issue-1', identifier: 'CHT-1' };

            it('removes issue from both lists', () => {
                getIssues.mockReturnValue([{ id: 'issue-1' }, { id: 'issue-2' }]);
                getMyIssues.mockReturnValue([{ id: 'issue-1' }]);
                getCurrentView.mockReturnValue('issues');

                handleWebSocketMessage({ type: 'deleted', entity: 'issue', data: deletedIssue });

                expect(setIssues).toHaveBeenCalledWith([{ id: 'issue-2' }]);
                expect(setMyIssues).toHaveBeenCalledWith([]);
                expect(showToast).toHaveBeenCalledWith('Issue CHT-1 deleted', 'info');
            });

            it('navigates away from deleted issue detail', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-1' };
                getIssues.mockReturnValue([{ id: 'issue-1' }]);
                getMyIssues.mockReturnValue([]);

                handleWebSocketMessage({ type: 'deleted', entity: 'issue', data: deletedIssue });

                expect(navigateTo).toHaveBeenCalledWith('my-issues');
                expect(showToast).toHaveBeenCalledWith('Issue CHT-1 was deleted', 'warning');
            });

            it('re-renders board on delete', () => {
                getCurrentView.mockReturnValue('board');
                handleWebSocketMessage({ type: 'deleted', entity: 'issue', data: deletedIssue });
                expect(renderBoard).toHaveBeenCalled();
            });

            it('reloads sprints on delete', () => {
                getCurrentView.mockReturnValue('sprints');
                handleWebSocketMessage({ type: 'deleted', entity: 'issue', data: deletedIssue });
                expect(loadSprints).toHaveBeenCalled();
            });
        });

        describe('comment entity', () => {
            it('loads dashboard activity on my-issues view', () => {
                getCurrentView.mockReturnValue('my-issues');
                handleWebSocketMessage({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
                expect(loadDashboardActivity).toHaveBeenCalled();
            });

            it('refreshes issue detail if viewing the commented issue', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-1' };

                handleWebSocketMessage({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
                expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
            });

            it('does not refresh detail if viewing different issue', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-2' };

                handleWebSocketMessage({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
                expect(viewIssue).not.toHaveBeenCalled();
            });
        });

        describe('relation entity', () => {
            it('refreshes detail if viewing related issue (source)', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-1' };

                handleWebSocketMessage({
                    type: 'created',
                    entity: 'relation',
                    data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
                });
                expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
            });

            it('refreshes detail if viewing related issue (target)', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-2' };

                handleWebSocketMessage({
                    type: 'created',
                    entity: 'relation',
                    data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
                });
                expect(viewIssue).toHaveBeenCalledWith('issue-2', false);
            });

            it('does not refresh if not on issue-detail view', () => {
                getCurrentView.mockReturnValue('issues');

                handleWebSocketMessage({
                    type: 'created',
                    entity: 'relation',
                    data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
                });
                expect(viewIssue).not.toHaveBeenCalled();
            });
        });

        describe('activity entity', () => {
            it('loads dashboard activity on my-issues view', () => {
                getCurrentView.mockReturnValue('my-issues');
                handleWebSocketMessage({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
                expect(loadDashboardActivity).toHaveBeenCalled();
            });

            it('refreshes detail if viewing the affected issue', () => {
                getCurrentView.mockReturnValue('issue-detail');
                window.currentDetailIssue = { id: 'issue-1' };

                handleWebSocketMessage({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
                expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
            });
        });

        describe('project entity', () => {
            it('refreshes projects on created event', async () => {
                getCurrentView.mockReturnValue('projects');
                handleWebSocketMessage({ type: 'created', entity: 'project', data: { name: 'New Project' } });
                expect(loadProjects).toHaveBeenCalled();
                expect(showToast).toHaveBeenCalledWith('New project: New Project', 'info');
                // Wait for loadProjects promise to resolve
                await vi.waitFor(() => expect(renderProjects).toHaveBeenCalled());
            });

            it('refreshes projects on deleted event', async () => {
                getCurrentView.mockReturnValue('issues');
                handleWebSocketMessage({ type: 'deleted', entity: 'project', data: { name: 'Old Project' } });
                expect(loadProjects).toHaveBeenCalled();
                expect(showToast).toHaveBeenCalledWith('Project Old Project deleted', 'info');
            });

            it('does not show toast on updated event', () => {
                getCurrentView.mockReturnValue('issues');
                handleWebSocketMessage({ type: 'updated', entity: 'project', data: { name: 'Updated' } });
                expect(loadProjects).toHaveBeenCalled();
                expect(showToast).not.toHaveBeenCalled();
            });

            it('renders projects when on projects view', async () => {
                getCurrentView.mockReturnValue('projects');
                handleWebSocketMessage({ type: 'updated', entity: 'project', data: { name: 'Updated' } });
                await vi.waitFor(() => expect(renderProjects).toHaveBeenCalled());
            });

            it('does not render projects when on other view', async () => {
                getCurrentView.mockReturnValue('issues');
                handleWebSocketMessage({ type: 'updated', entity: 'project', data: { name: 'Updated' } });
                // Wait a tick for the promise
                await new Promise(r => setTimeout(r, 10));
                expect(renderProjects).not.toHaveBeenCalled();
            });
        });

        describe('sprint entity', () => {
            it('reloads sprints when on sprints view', () => {
                getCurrentView.mockReturnValue('sprints');
                handleWebSocketMessage({ type: 'created', entity: 'sprint', data: { id: 's1' } });
                expect(loadSprints).toHaveBeenCalled();
            });

            it('does not reload sprints when on other view', () => {
                getCurrentView.mockReturnValue('issues');
                handleWebSocketMessage({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
                expect(loadSprints).not.toHaveBeenCalled();
            });
        });

        describe('unknown entity', () => {
            it('does nothing for unknown entities', () => {
                handleWebSocketMessage({ type: 'created', entity: 'unknown', data: {} });
                expect(setIssues).not.toHaveBeenCalled();
                expect(showToast).not.toHaveBeenCalled();
            });
        });
    });

    describe('resetWsState', () => {
        it('closes existing websocket', () => {
            const ws = { close: vi.fn() };
            getWebsocket.mockReturnValue(ws);

            resetWsState();

            expect(ws.close).toHaveBeenCalled();
            expect(setWebsocket).toHaveBeenCalledWith(null);
        });

        it('does nothing if no websocket', () => {
            getWebsocket.mockReturnValue(null);
            vi.clearAllMocks(); // clear calls from beforeEach
            resetWsState();
            // Should not throw, and should not call setWebsocket since no existing ws
            expect(setWebsocket).not.toHaveBeenCalled();
        });
    });
});
