/**
 * Tests for ws-handlers.js module (CHT-1039)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getDetailNavContext: vi.fn(() => []),
    setDetailNavContext: vi.fn(),
    getCurrentUser: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'my-issues'),
    getWebsocket: vi.fn(() => null),
    setWebsocket: vi.fn(),
    getCurrentDetailIssue: vi.fn(() => null),
    setCurrentDetailIssue: vi.fn(),
    setCurrentUser: vi.fn(),
    setCurrentTeam: vi.fn(),
}));

// Mock api.js and auth.js (CHT-1603: a 4001 close ends the session)
vi.mock('./api.js', () => ({
    api: { logout: vi.fn(), getToken: vi.fn(() => 'tok') },
}));
vi.mock('./auth.js', () => ({
    showAuthScreen: vi.fn(),
}));

// Mock dashboard.js
vi.mock('./dashboard.js', () => ({
    getMyIssues: vi.fn(() => []),
    setMyIssues: vi.fn(),
    renderMyIssues: vi.fn(),
    loadMyIssues: vi.fn(() => Promise.resolve()),
    loadDashboardActivity: vi.fn(),
    loadSprintStatus: vi.fn(() => Promise.resolve()),
}));

// Mock issue-list.js
vi.mock('./issue-list.js', () => ({
    renderIssues: vi.fn(),
}));

// Mock issues-view.js (CHT-1225: reconnect resync refetches, not just re-renders)
vi.mock('./issues-view.js', () => ({
    loadIssues: vi.fn(() => Promise.resolve()),
}));

// Mock board.js
vi.mock('./board.js', () => ({
    loadBoard: vi.fn(),
    scheduleBoardRefresh: vi.fn(),
}));

// Mock sprints.js
vi.mock('./sprints.js', () => ({
    // Both return promises for real (refreshSprintView() .catch()es them) --
    // previously bare vi.fn()s, which threw "Cannot read properties of
    // undefined (reading 'catch')" whenever that branch actually ran (caught
    // silently by ws.js's per-handler dispatch try/catch, so pre-existing
    // tests never surfaced it).
    loadSprints: vi.fn(() => Promise.resolve()),
    viewSprint: vi.fn(() => Promise.resolve()),
    getCurrentSprintDetail: vi.fn(() => null),
    clearCachedCurrentSprintIds: vi.fn(),
}));

// Mock projects.js
vi.mock('./projects.js', () => ({
    loadProjects: vi.fn(() => Promise.resolve()),
    renderProjects: vi.fn(),
}));

// Mock issue-detail-view.js
vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
    noteSkippedDetailRefresh: vi.fn(),
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

// Mock documents.js (CHT-1213)
vi.mock('./documents.js', () => ({
    refreshDocumentsListIfActive: vi.fn(),
    refreshDocumentDetailIfViewing: vi.fn(),
    handleRemoteDocumentDeleted: vi.fn(),
}));

// Mock epics.js (CHT-1226)
vi.mock('./epics.js', () => ({
    loadEpics: vi.fn(() => Promise.resolve()),
}));

// Mock inbox.js (CHT-1250)
vi.mock('./inbox.js', () => ({
    loadInbox: vi.fn(),
    refreshInboxUnreadCount: vi.fn(),
    isInboxEventAlreadyApplied: vi.fn(() => false),
    recordInboxEvent: vi.fn(),
}));

import { getIssues, setIssues, getDetailNavContext, setDetailNavContext, getCurrentUser, getCurrentView, getCurrentDetailIssue } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadMyIssues, loadDashboardActivity, loadSprintStatus } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { loadIssues } from './issues-view.js';
import { loadBoard, scheduleBoardRefresh } from './board.js';
import { loadSprints, viewSprint, getCurrentSprintDetail, clearCachedCurrentSprintIds } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { viewIssue, noteSkippedDetailRefresh } from './issue-detail-view.js';
import { refreshDocumentsListIfActive, refreshDocumentDetailIfViewing, handleRemoteDocumentDeleted } from './documents.js';
import { loadEpics } from './epics.js';
import { loadInbox, refreshInboxUnreadCount, isInboxEventAlreadyApplied, recordInboxEvent } from './inbox.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';
import { api } from './api.js';
import { showAuthScreen } from './auth.js';
import { setCurrentUser, setCurrentTeam } from './state.js';
import { dispatch as rawDispatch, resetWsState } from './ws.js';
import { registerWsHandlers, resetDetailRefreshes, DETAIL_REFRESH_DELAY_MS, DETAIL_REFRESH_RETRY_MS } from './ws-handlers.js';

/**
 * Dispatch an event and run out the open-detail refresh debounce
 * (PR #318 review 2), so assertions see the coalesced viewIssue() call.
 * Tests of the coalescing itself use rawDispatch.
 */
function dispatch(event) {
    rawDispatch(event);
    vi.advanceTimersByTime(DETAIL_REFRESH_DELAY_MS);
}

/**
 * Put the issue detail on screen the way production does (CHT-1237):
 * #issue-detail-view visible and getCurrentDetailIssue() set, while
 * getCurrentView() keeps naming the list the user came from, because detail
 * routes never call navigateTo(). Tests used to mock getCurrentView() to
 * 'issue-detail', a value it never takes in the app, which is how the dead
 * gates went unnoticed.
 */
function openIssueDetail(issueId, underlyingView = 'issues') {
    getCurrentView.mockReturnValue(underlyingView);
    getCurrentDetailIssue.mockReturnValue({ id: issueId });
    document.body.innerHTML = '<div id="issue-detail-view" class="view"></div>';
}

/** Make exactly one top-level view visible (CHT-1487). */
function showView(id) {
    document.body.innerHTML = `<div id="${id}" class="view"></div>`;
}

describe('ws-handlers.js', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        resetDetailRefreshes();
        document.body.innerHTML = '';
        resetWsState();
        registerWsHandlers();

        getIssues.mockReturnValue([]);
        getMyIssues.mockReturnValue([]);
        getDetailNavContext.mockReturnValue([]);
        getCurrentView.mockReturnValue('my-issues');
        getCurrentUser.mockReturnValue({ id: 'user-1' });
        getCurrentDetailIssue.mockReturnValue(null);
    });

    afterEach(() => {
        resetDetailRefreshes();
        vi.useRealTimers();
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

        // CHT-1225 item 1: board.js kept a private issue cache renderBoard()
        // alone couldn't refresh -- must go through scheduleBoardRefresh(),
        // which actually re-fetches (debounced).
        it('schedules a board refresh on board view', () => {
            getCurrentView.mockReturnValue('board');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(scheduleBoardRefresh).toHaveBeenCalled();
        });

        // CHT-1225 item 5: the accompanying 'activity' broadcast for the
        // same mutation already triggers this via handleActivity -- doing
        // it here too would double-fetch on every single issue create.
        it('does not double-fetch dashboard activity directly (left to the activity event)', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(loadDashboardActivity).not.toHaveBeenCalled();
        });

        it('reloads sprints on sprints view (list)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue(null);
            showView('sprints-view');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        // CHT-1226: epics view had no case at all — a new sub-issue under a
        // visible epic left its progress bar stale until navigating away and back.
        it('reloads epics on epics view', () => {
            getCurrentView.mockReturnValue('epics');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(loadEpics).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprint-detail-view');
            dispatch({ type: 'created', entity: 'issue', data: newIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('refreshes detail if child issue created', () => {
            openIssueDetail('parent-1');
            const childIssue = { ...newIssue, parent_id: 'parent-1' };

            dispatch({ type: 'created', entity: 'issue', data: childIssue });
            expect(viewIssue).toHaveBeenCalledWith('parent-1', false, { refresh: true });
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

        // CHT-1225 item 5
        it('does not double-fetch dashboard activity directly (left to the activity event)', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(loadDashboardActivity).not.toHaveBeenCalled();
        });

        // CHT-1225 item 1
        it('schedules a board refresh on board view', () => {
            getCurrentView.mockReturnValue('board');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(scheduleBoardRefresh).toHaveBeenCalled();
        });

        it('reloads sprints list on sprints view', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentSprintDetail.mockReturnValue(null);
            showView('sprints-view');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        // CHT-1226: a sub-issue's status changing under a visible epic
        // used to leave its progress bar stale.
        it('reloads epics on epics view', () => {
            getCurrentView.mockReturnValue('epics');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(loadEpics).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprint-detail-view');
            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        // CHT-1214: the old guard checked detailContent.dataset.issueId, an
        // attribute production code never sets anywhere — this branch was
        // dead code. Confirmed by getCurrentDetailIssue(), which every other
        // handler in this file already uses consistently.
        it('refreshes detail view if viewing updated issue', () => {
            openIssueDetail('issue-1');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        // CHT-1237: the detail refresh used to be the last branch of the
        // view chain, unreachable because getCurrentView() is the list.
        it('refreshes the open detail and re-renders the list underneath it', () => {
            getIssues.mockReturnValue([{ id: 'issue-1', title: 'Old' }]);
            openIssueDetail('issue-1', 'issues');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(renderIssues).toHaveBeenCalled();
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        // CHT-1487: an issue opened from a sprint detail -- the sprint
        // refresh must not rebuild the sprint detail over the open issue.
        it('does not re-open the sprint detail over an issue opened from it', () => {
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            openIssueDetail('issue-1', 'sprints');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewSprint).not.toHaveBeenCalled();
            expect(loadSprints).not.toHaveBeenCalled();
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('does not refresh detail view for a different issue', () => {
            openIssueDetail('issue-2');

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });
            expect(viewIssue).not.toHaveBeenCalled();
        });

        // CHT-1214: a remote update to the open issue (e.g. someone else's
        // description edit) must not tear down an in-progress local
        // description edit — the refresh is deferred (with the fresh issue
        // payload stashed for the editor's conflict check), not dropped
        // (PR #209 review finding 3).
        it('defers instead of clobbering an in-progress description edit, stashing the fresh issue', () => {
            openIssueDetail('issue-1');
            document.getElementById('issue-detail-view').innerHTML = '<div class="description-inline-editor"><textarea id="edit-description">my in-progress edit</textarea></div>';

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });

            expect(viewIssue).not.toHaveBeenCalled();
            expect(noteSkippedDetailRefresh).toHaveBeenCalledWith(updatedIssue);
            expect(document.getElementById('edit-description').value).toBe('my in-progress edit');
            document.body.innerHTML = '';
        });

        // CHT-1211 review #1: the detail nav context is a snapshot — remote
        // updates must patch it too, or Prev/Next on an open detail view
        // keeps serving stale entries.
        it('patches the updated issue into the detail nav context', () => {
            getDetailNavContext.mockReturnValue([
                { id: 'issue-0', title: 'Before' },
                { id: 'issue-1', title: 'Old' },
                { id: 'issue-2', title: 'After' },
            ]);

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });

            expect(setDetailNavContext).toHaveBeenCalledWith([
                { id: 'issue-0', title: 'Before' },
                updatedIssue,
                { id: 'issue-2', title: 'After' },
            ]);
        });

        it('leaves the detail nav context alone when the issue is not in it', () => {
            getDetailNavContext.mockReturnValue([{ id: 'other-issue' }]);

            dispatch({ type: 'updated', entity: 'issue', data: updatedIssue });

            expect(setDetailNavContext).not.toHaveBeenCalled();
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

        // CHT-1225 item 1: same board-staleness bug as created/updated.
        it('schedules a board refresh on board view', () => {
            getCurrentView.mockReturnValue('board');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(scheduleBoardRefresh).toHaveBeenCalled();
        });

        // delete_issue has no matching 'activity' broadcast (unlike
        // created/updated), so this stays -- it's the only trigger for a
        // delete-driven dashboard activity refresh, not the item 5 double-fetch.
        it('still fetches dashboard activity on my-issues view (no matching activity event to rely on)', () => {
            getCurrentView.mockReturnValue('my-issues');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([{ id: 'issue-1' }]);
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('reloads sprints list on sprints view', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            getCurrentSprintDetail.mockReturnValue(null);
            showView('sprints-view');
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(loadSprints).toHaveBeenCalled();
        });

        // CHT-1226: a sub-issue being deleted under a visible epic used to
        // leave its progress bar's denominator stale.
        it('reloads epics on epics view', () => {
            getCurrentView.mockReturnValue('epics');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(loadEpics).toHaveBeenCalled();
        });

        it('refreshes sprint detail on sprints view (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprint-detail-view');
            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        it('does not navigate away when the deleted issue is not on screen', () => {
            getCurrentView.mockReturnValue('issues');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });
            document.body.innerHTML = '<div id="issue-detail-view" class="view hidden"></div>';

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });
            expect(navigateTo).not.toHaveBeenCalled();
        });

        it('navigates away from deleted issue detail', () => {
            openIssueDetail('issue-1');
            getIssues.mockReturnValue([{ id: 'issue-1' }]);
            getMyIssues.mockReturnValue([]);

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });

            expect(navigateTo).toHaveBeenCalledWith('my-issues');
            expect(showToast).toHaveBeenCalledWith('Issue CHT-1 was deleted', 'warning');
        });

        // CHT-1211 review #1: without this a deleted sibling remained
        // reachable via Next/Prev on an open detail view (delete-while-
        // detail-open scenario).
        it('removes the deleted issue from the detail nav context', () => {
            getDetailNavContext.mockReturnValue([
                { id: 'issue-0' },
                { id: 'issue-1' },
                { id: 'issue-2' },
            ]);

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });

            expect(setDetailNavContext).toHaveBeenCalledWith([
                { id: 'issue-0' },
                { id: 'issue-2' },
            ]);
        });

        it('leaves the detail nav context alone when the deleted issue is not in it', () => {
            getDetailNavContext.mockReturnValue([{ id: 'other-issue' }]);

            dispatch({ type: 'deleted', entity: 'issue', data: deletedIssue });

            expect(setDetailNavContext).not.toHaveBeenCalled();
        });
    });

    describe('comment', () => {
        it('loads dashboard activity on my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('refreshes issue detail if viewing the commented issue', () => {
            openIssueDetail('issue-1');

            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        // CHT-1214: a comment landing on the open issue while its description
        // is being edited must not blow the editor away — deferred, not
        // dropped (PR #209 review finding 3).
        it('defers instead of clobbering an in-progress description edit', () => {
            openIssueDetail('issue-1');
            document.getElementById('issue-detail-view').innerHTML = '<div class="description-inline-editor"></div>';

            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });

            expect(viewIssue).not.toHaveBeenCalled();
            expect(noteSkippedDetailRefresh).toHaveBeenCalled();
            document.body.innerHTML = '';
        });

        // CHT-1286: a comment posted by an agent (MCP or the API) arrives only
        // as this broadcast -- unlike a web-UI comment, nothing on this
        // client re-fetches locally. With the detail open, getCurrentView()
        // still names the list underneath (CHT-1237), which is what the old
        // gate missed.
        it('refreshes the open issue detail for a remote comment, whatever list it was opened from', () => {
            for (const underlying of ['issues', 'my-issues', 'board', 'sprints', 'epics']) {
                vi.clearAllMocks();
                resetDetailRefreshes();
                openIssueDetail('issue-1', underlying);
                dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
                expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
            }
        });

        it('does not refresh a detail the user has navigated away from', () => {
            // getCurrentDetailIssue() is never cleared on navigation, so the
            // DOM visibility check is what tells a stale value apart.
            getCurrentView.mockReturnValue('issues');
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });
            document.body.innerHTML = '<div id="issue-detail-view" class="view hidden"></div>';

            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(viewIssue).not.toHaveBeenCalled();
        });

        it('does not refresh the open detail for a comment on another issue', () => {
            openIssueDetail('issue-2');
            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(viewIssue).not.toHaveBeenCalled();
        });

        // CHT-1213: document comments broadcast a document_id field but were
        // previously silently dropped here (only issue_id was checked).
        it('refreshes the open document detail on a document comment', () => {
            dispatch({ type: 'created', entity: 'comment', data: { document_id: 'doc-1' } });
            expect(refreshDocumentDetailIfViewing).toHaveBeenCalledWith('doc-1');
        });

        it('does not call refreshDocumentDetailIfViewing for an issue comment', () => {
            dispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            expect(refreshDocumentDetailIfViewing).not.toHaveBeenCalled();
        });
    });

    // PR #318 review 2: refreshes of the open detail are coalesced per issue.
    describe('open-detail refresh coalescing', () => {
        it('turns the comment + activity pair for one comment into one trailing refresh', () => {
            openIssueDetail('issue-1');
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            rawDispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            expect(viewIssue).not.toHaveBeenCalled();

            vi.advanceTimersByTime(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('keeps at most one refresh in flight and runs exactly one more after it', async () => {
            openIssueDetail('issue-1');
            let finish;
            viewIssue.mockImplementationOnce(() => new Promise(r => { finish = r; }));
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);

            // A burst while the first is still fetching.
            for (let i = 0; i < 5; i++) {
                rawDispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            }
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_RETRY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);

            finish('rendered');
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(2);
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_RETRY_MS * 2);
            expect(viewIssue).toHaveBeenCalledTimes(2);
        });

        it('retries a refresh that transient UI held off', async () => {
            openIssueDetail('issue-1');
            viewIssue.mockResolvedValueOnce('retry').mockResolvedValueOnce('rendered');
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);

            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_RETRY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(2);
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_RETRY_MS * 2);
            expect(viewIssue).toHaveBeenCalledTimes(2);
        });

        it('stops retrying once the user leaves the detail', async () => {
            openIssueDetail('issue-1');
            viewIssue.mockResolvedValue('retry');
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);

            document.getElementById('issue-detail-view').classList.add('hidden');
            await vi.advanceTimersByTimeAsync(DETAIL_REFRESH_RETRY_MS * 3);
            expect(viewIssue).toHaveBeenCalledTimes(1);
            viewIssue.mockReset();
        });

        it('drops a scheduled refresh if the user leaves before it fires', () => {
            openIssueDetail('issue-1');
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            document.getElementById('issue-detail-view').classList.add('hidden');
            vi.advanceTimersByTime(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).not.toHaveBeenCalled();
        });

        it('coalesces per issue, not globally', () => {
            openIssueDetail('issue-1');
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-1' } });
            // The user switches issues inside the window; the new issue's
            // event gets its own refresh, the old one is dropped on fire.
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-2' });
            rawDispatch({ type: 'created', entity: 'comment', data: { issue_id: 'issue-2' } });
            vi.advanceTimersByTime(DETAIL_REFRESH_DELAY_MS);
            expect(viewIssue).toHaveBeenCalledTimes(1);
            expect(viewIssue).toHaveBeenCalledWith('issue-2', false, { refresh: true });
        });
    });

    // CHT-1213: documents previously broadcast nothing at all on
    // create/update/delete.
    describe('document', () => {
        it('refreshes the documents list and the open detail on create/update', () => {
            dispatch({ type: 'created', entity: 'document', data: { id: 'doc-1' } });
            expect(refreshDocumentsListIfActive).toHaveBeenCalled();
            expect(refreshDocumentDetailIfViewing).toHaveBeenCalledWith('doc-1');

            dispatch({ type: 'updated', entity: 'document', data: { id: 'doc-1' } });
            expect(refreshDocumentsListIfActive).toHaveBeenCalledTimes(2);
            expect(refreshDocumentDetailIfViewing).toHaveBeenCalledTimes(2);
        });

        // Refreshing a just-deleted document would 404 and show a generic
        // error toast over stale content instead of navigating away.
        it('handles delete via handleRemoteDocumentDeleted instead of refreshDocumentDetailIfViewing', () => {
            dispatch({ type: 'deleted', entity: 'document', data: { id: 'doc-1', title: 'Deleted Doc' } });
            expect(refreshDocumentsListIfActive).toHaveBeenCalled();
            expect(handleRemoteDocumentDeleted).toHaveBeenCalledWith('doc-1', 'Deleted Doc');
            expect(refreshDocumentDetailIfViewing).not.toHaveBeenCalled();
        });
    });

    describe('relation', () => {
        it('refreshes detail if viewing related issue', () => {
            openIssueDetail('issue-1');

            dispatch({
                type: 'created',
                entity: 'relation',
                data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
            });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('defers instead of clobbering an in-progress description edit', () => {
            openIssueDetail('issue-1');
            document.getElementById('issue-detail-view').innerHTML = '<div class="description-inline-editor"></div>';

            dispatch({
                type: 'created',
                entity: 'relation',
                data: { source_issue_id: 'issue-1', target_issue_id: 'issue-2' },
            });

            expect(viewIssue).not.toHaveBeenCalled();
            expect(noteSkippedDetailRefresh).toHaveBeenCalled();
            document.body.innerHTML = '';
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
            showView('sprints-view');
            dispatch({ type: 'created', entity: 'sprint', data: { id: 's1' } });
            expect(loadSprints).toHaveBeenCalled();
            expect(viewSprint).not.toHaveBeenCalled();
        });

        it('refreshes sprint detail when viewing one (CHT-325)', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprint-detail-view');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
            expect(loadSprints).not.toHaveBeenCalled();
        });

        // CHT-1487: currentSprintDetail is never cleared, so after visiting
        // a sprint and going back to the list, a sprint event used to pull
        // the user back into that stale sprint.
        it('reloads the list, not a stale sprint detail, when the list is on screen', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprints-view');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(loadSprints).toHaveBeenCalled();
            expect(viewSprint).not.toHaveBeenCalled();
        });

        it('does not reload sprints when on other view', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(loadSprints).not.toHaveBeenCalled();
            expect(viewSprint).not.toHaveBeenCalled();
        });

        // CHT-1212: a sprint completing/rotating in another client changes
        // which sprint is "current" — the cached id must be dropped even
        // when this client is NOT on the sprints view (e.g. sitting on
        // Issues with the Current Sprint filter active).
        it('clears the cached current-sprint ids even when on the issues view', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(clearCachedCurrentSprintIds).toHaveBeenCalled();
        });

        it('clears the cached current-sprint ids on the sprints view too', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue(null);
            showView('sprints-view');
            dispatch({ type: 'created', entity: 'sprint', data: { id: 's1' } });
            expect(clearCachedCurrentSprintIds).toHaveBeenCalled();
        });

        it('clears the cached current-sprint ids on the my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1' } });
            expect(clearCachedCurrentSprintIds).toHaveBeenCalled();
        });

        // CHT-1225 item 4: issue/project lifecycle events show a toast;
        // sprint events showed none at all.
        it('shows a toast on sprint created', () => {
            dispatch({ type: 'created', entity: 'sprint', data: { id: 's1', name: 'Sprint 3' } });
            expect(showToast).toHaveBeenCalledWith('New sprint: Sprint 3', 'info');
        });

        it('shows a toast on sprint closed', () => {
            dispatch({ type: 'closed', entity: 'sprint', data: { id: 's1', name: 'Sprint 2' } });
            expect(showToast).toHaveBeenCalledWith('Sprint Sprint 2 closed', 'info');
        });

        it('shows no toast on sprint updated', () => {
            dispatch({ type: 'updated', entity: 'sprint', data: { id: 's1', name: 'Sprint 2' } });
            expect(showToast).not.toHaveBeenCalled();
        });
    });

    describe('attestation', () => {
        it('refreshes issue detail if viewing attested issue', () => {
            openIssueDetail('issue-1');

            dispatch({ type: 'created', entity: 'attestation', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('calls loadGateApprovals on approvals view', () => {
            getCurrentView.mockReturnValue('approvals');

            dispatch({ type: 'created', entity: 'attestation', data: { issue_id: 'issue-1' } });
            expect(mockLoadGateApprovals).toHaveBeenCalled();
        });

        it('defers instead of clobbering an in-progress description edit', () => {
            openIssueDetail('issue-1');
            document.getElementById('issue-detail-view').innerHTML = '<div class="description-inline-editor"></div>';

            dispatch({ type: 'created', entity: 'attestation', data: { issue_id: 'issue-1' } });

            expect(viewIssue).not.toHaveBeenCalled();
            expect(noteSkippedDetailRefresh).toHaveBeenCalled();
            document.body.innerHTML = '';
        });
    });

    describe('activity', () => {
        it('loads dashboard activity on my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('refreshes issue detail if viewing the activity issue', () => {
            openIssueDetail('issue-1');

            dispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('defers instead of clobbering an in-progress description edit', () => {
            openIssueDetail('issue-1');
            document.getElementById('issue-detail-view').innerHTML = '<div class="description-inline-editor"></div>';

            dispatch({ type: 'created', entity: 'activity', data: { issue_id: 'issue-1' } });

            expect(viewIssue).not.toHaveBeenCalled();
            expect(noteSkippedDetailRefresh).toHaveBeenCalled();
            document.body.innerHTML = '';
        });
    });

    describe('inbox', () => {
        it('refreshes the unread count for the current user\'s own entry', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            dispatch({ type: 'created', entity: 'inbox', data: { recipient_user_id: 'user-1' } });
            expect(refreshInboxUnreadCount).toHaveBeenCalled();
        });

        it('ignores events for a different recipient (team-wide broadcast filter)', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            dispatch({ type: 'created', entity: 'inbox', data: { recipient_user_id: 'someone-else' } });
            expect(refreshInboxUnreadCount).not.toHaveBeenCalled();
        });

        it('reloads the inbox list when on the inbox view', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            getCurrentView.mockReturnValue('inbox');
            dispatch({ type: 'created', entity: 'inbox', data: { recipient_user_id: 'user-1' } });
            // In the background: no skeleton, the open row/cursor/focus survive (CHT-1320).
            expect(loadInbox).toHaveBeenCalledWith({ background: true });
        });

        it('skips the reload for an event this client already shows (our own read echo)', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            getCurrentView.mockReturnValue('inbox');
            isInboxEventAlreadyApplied.mockReturnValueOnce(true);
            const data = { id: 'entry-1', recipient_user_id: 'user-1' };
            dispatch({ type: 'read', entity: 'inbox', data });
            expect(isInboxEventAlreadyApplied).toHaveBeenCalledWith('read', data);
            expect(loadInbox).not.toHaveBeenCalled();
            // The badge still re-syncs from the server.
            expect(refreshInboxUnreadCount).toHaveBeenCalled();
        });

        it('records every event for this user, even a skipped echo or off the inbox (CHT-1514)', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            getCurrentView.mockReturnValue('my-issues');
            const data = { id: 'entry-1', recipient_user_id: 'user-1' };
            dispatch({ type: 'archived', entity: 'inbox', data });
            expect(recordInboxEvent).toHaveBeenCalledWith('archived', data);
            recordInboxEvent.mockClear();
            dispatch({ type: 'archived', entity: 'inbox', data: { id: 'x', recipient_user_id: 'someone-else' } });
            expect(recordInboxEvent).not.toHaveBeenCalled();
        });

        it('does not reload the inbox list on other views', () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'created', entity: 'inbox', data: { recipient_user_id: 'user-1' } });
            expect(loadInbox).not.toHaveBeenCalled();
        });
    });

    describe('unknown entity', () => {
        it('does nothing for unknown entities', () => {
            dispatch({ type: 'created', entity: 'unknown', data: {} });
            expect(setIssues).not.toHaveBeenCalled();
            expect(showToast).not.toHaveBeenCalled();
        });
    });

    // CHT-1225 item 3: resync on genuine reconnect. ws.js dispatches this
    // synthetic event (never a real server message) only when the reconnect
    // followed an actual outage, not a deliberate team switch.
    // CHT-1603 (PR #352 review, finding 2): ws.js stops reconnecting and
    // dispatches these when the server closes with 4001 / 4003.
    describe('connection:unauthorized', () => {
        it('ends the session like a REST 401: drops the token, shows sign-in', () => {
            dispatch({ type: 'unauthorized', entity: 'connection', data: { code: 4001 } });
            expect(api.logout).toHaveBeenCalled();
            expect(setCurrentUser).toHaveBeenCalledWith(null);
            expect(setCurrentTeam).toHaveBeenCalledWith(null);
            expect(showAuthScreen).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('Your session has ended. Please sign in again.', 'warning');
        });
    });

    describe('connection:forbidden', () => {
        it('says live updates stopped, and keeps the session', () => {
            dispatch({ type: 'forbidden', entity: 'connection', data: { code: 4003 } });
            expect(showToast).toHaveBeenCalledWith(
                'Live updates stopped: you no longer have access to this team.', 'error');
            expect(api.logout).not.toHaveBeenCalled();
            expect(showAuthScreen).not.toHaveBeenCalled();
        });
    });

    describe('connection:reconnected', () => {
        it('refreshes the inbox unread badge regardless of current view', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(refreshInboxUnreadCount).toHaveBeenCalled();
        });

        it('reloads the inbox list on the inbox view', () => {
            getCurrentView.mockReturnValue('inbox');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadInbox).toHaveBeenCalledWith({ background: true });
        });

        it('refetches the issues list on the issues view', () => {
            getCurrentView.mockReturnValue('issues');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadIssues).toHaveBeenCalled();
        });

        it('refetches my-issues, sprint status, and dashboard activity on the my-issues view', () => {
            getCurrentView.mockReturnValue('my-issues');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadMyIssues).toHaveBeenCalled();
            expect(loadSprintStatus).toHaveBeenCalled();
            expect(loadDashboardActivity).toHaveBeenCalled();
        });

        it('refreshes the board on the board view', () => {
            getCurrentView.mockReturnValue('board');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadBoard).toHaveBeenCalled();
        });

        it('refreshes the sprints list on the sprints view with no detail open', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue(null);
            showView('sprints-view');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadSprints).toHaveBeenCalled();
        });

        it('refreshes the open sprint detail on the sprints view', () => {
            getCurrentView.mockReturnValue('sprints');
            getCurrentSprintDetail.mockReturnValue({ id: 's1' });
            showView('sprint-detail-view');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(viewSprint).toHaveBeenCalledWith('s1', false);
        });

        it('reloads epics on the epics view', () => {
            getCurrentView.mockReturnValue('epics');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadEpics).toHaveBeenCalled();
        });

        it('refetches projects on the projects view', async () => {
            getCurrentView.mockReturnValue('projects');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadProjects).toHaveBeenCalled();
            await vi.waitFor(() => expect(renderProjects).toHaveBeenCalled());
        });

        it('refetches the documents list on the documents view', () => {
            getCurrentView.mockReturnValue('documents');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(refreshDocumentsListIfActive).toHaveBeenCalled();
        });

        it('reloads gate approvals on the approvals view', () => {
            getCurrentView.mockReturnValue('approvals');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(mockLoadGateApprovals).toHaveBeenCalled();
        });

        it('refreshes the open issue detail', () => {
            openIssueDetail('issue-1');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        // CHT-1237: the detail sits on top of the list getCurrentView()
        // names; both are refreshed.
        it('refreshes an open issue detail as well as the list underneath it', () => {
            openIssueDetail('issue-1', 'issues');
            dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            expect(loadIssues).toHaveBeenCalled();
            expect(viewIssue).toHaveBeenCalledWith('issue-1', false, { refresh: true });
        });

        it('does nothing on an unrecognized view', () => {
            getCurrentView.mockReturnValue('some-other-view');
            expect(() => dispatch({ type: 'reconnected', entity: 'connection', data: {} })).not.toThrow();
        });
    });
});
