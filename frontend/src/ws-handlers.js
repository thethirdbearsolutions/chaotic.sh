/**
 * WebSocket event handlers (CHT-1039)
 *
 * Registers pub/sub handlers for each entity type.
 * Each handler is self-contained and subscribes to specific events.
 */

import { subscribe } from './ws.js';
import { getIssues, setIssues, getDetailNavContext, setDetailNavContext, getCurrentUser, getCurrentView, getCurrentDetailIssue } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadMyIssues, loadDashboardActivity, loadSprintStatus } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { loadIssues } from './issues-view.js';
import { loadBoard, scheduleBoardRefresh } from './board.js';
import { loadSprints, viewSprint, getCurrentSprintDetail, clearCachedCurrentSprintIds } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { loadEpics } from './epics.js';
import { viewIssue, noteSkippedDetailRefresh } from './issue-detail-view.js';
import { refreshDocumentsListIfActive, refreshDocumentDetailIfViewing, handleRemoteDocumentDeleted } from './documents.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';
import { loadGateApprovals } from './gate-approvals.js';

/**
 * True while the issue detail view has its inline description editor open.
 * Handlers below that would otherwise call viewIssue() to live-refresh the
 * currently-open issue suppress that destructive full re-render while this
 * is true — it would tear down the open editor (textarea, cursor position,
 * Write/Preview state) out from under the user (CHT-1214). Typed text itself
 * stays safe via the CHT-1041 draft-on-input listener.
 *
 * The refresh is deferred, not dropped: each suppressed event is recorded
 * via noteSkippedDetailRefresh() (with the fresh issue payload for
 * issue:updated), so the editor's Cancel resyncs the view from the server
 * and its Save can warn about a remote description change instead of
 * silently overwriting it (PR #209 review finding 3).
 */
function hasOpenDescriptionEditor() {
    return !!document.querySelector('.description-inline-editor');
}

/**
 * Register all WebSocket event handlers.
 * Call this once during app initialization.
 */
export function registerWsHandlers() {
    // Issue events
    subscribe('issue:created', handleIssueCreated);
    subscribe('issue:updated', handleIssueUpdated);
    subscribe('issue:deleted', handleIssueDeleted);

    // Comment events
    subscribe('comment', handleComment);

    // Relation events
    subscribe('relation', handleRelation);

    // Attestation events
    subscribe('attestation', handleAttestation);

    // Activity events
    subscribe('activity', handleActivity);

    // Project events
    subscribe('project', handleProject);

    // Sprint events
    subscribe('sprint', handleSprint);

    // Document events (CHT-1213) — documents previously broadcast nothing at
    // all on create/update/delete, so the list/detail view went stale until
    // a manual reload.
    subscribe('document', handleDocument);

    // Reconnect resync (CHT-1225 item 3) — a synthetic event ws.js's onopen
    // dispatches only on a genuine reconnect (never a deliberate team
    // switch; see handleReconnected() below for why).
    subscribe('connection:reconnected', handleReconnected);
}

function handleIssueCreated(data) {
    // Check for duplicates - by real ID OR by optimistic temp ID with matching title
    const currentIssues = getIssues();
    const existingIndex = currentIssues.findIndex(i => i.id === data.id);
    const optimisticIndex = currentIssues.findIndex(i => i._isOptimistic && i.title === data.title);

    if (existingIndex >= 0) {
        // Already have this exact issue, skip
    } else if (optimisticIndex >= 0) {
        // Replace optimistic issue with real one from WebSocket
        const updated = [...currentIssues];
        updated[optimisticIndex] = data;
        setIssues(updated);
        if (getCurrentView() === 'issues') {
            renderIssues();
        }
    } else {
        // New issue from another user/session
        setIssues([data, ...currentIssues]);
        if (getCurrentView() === 'issues') {
            renderIssues();
        }
        showToast(`New issue: ${data.identifier}`, 'info');
    }

    // Check myIssues separately (managed by dashboard.js)
    if (data.assignee_id === getCurrentUser()?.id) {
        const myIssuesArr = getMyIssues();
        const myExistingIndex = myIssuesArr.findIndex(i => i.id === data.id);
        const myOptimisticIndex = myIssuesArr.findIndex(i => i._isOptimistic && i.title === data.title);
        if (myExistingIndex === -1 && myOptimisticIndex === -1) {
            setMyIssues([data, ...myIssuesArr]);
            if (getCurrentView() === 'my-issues') {
                renderMyIssues();
            }
        } else if (myOptimisticIndex >= 0) {
            const updatedMyIssues = [...myIssuesArr];
            updatedMyIssues[myOptimisticIndex] = data;
            setMyIssues(updatedMyIssues);
            if (getCurrentView() === 'my-issues') {
                renderMyIssues();
            }
        }
    }

    // CHT-1225 item 5: dashboard activity refetch is deliberately NOT
    // triggered here -- create_issue's broadcast_activity_event fires
    // alongside broadcast_issue_event for the same mutation, and
    // handleActivity() below already refetches on my-issues. Doing it in
    // both handlers double-fetched on every single issue create/update.

    // Re-render board/sprints when issues are created. Board goes through
    // the debounced refresh (CHT-1225 item 1/6): board.js kept its own
    // private issue cache that this used to just re-render without ever
    // updating -- the board looked live but never reflected the new issue.
    if (getCurrentView() === 'board') {
        scheduleBoardRefresh();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
    } else if (getCurrentView() === 'epics') {
        // CHT-1226: a new sub-issue under a visible epic used to leave its
        // progress bar stale until the user navigated away and back.
        loadEpics();
    }

    // Refresh issue detail if a child issue was created
    if (getCurrentView() === 'issue-detail' && data.parent_id === getCurrentDetailIssue()?.id) {
        viewIssue(getCurrentDetailIssue()?.id, false);
    }
}

function handleIssueUpdated(data) {
    // Update in local arrays
    const currentIssues = getIssues();
    if (currentIssues.some(i => i.id === data.id)) {
        setIssues(currentIssues.map(i => i.id === data.id ? data : i));
    }
    const currentMyIssues = getMyIssues();
    if (currentMyIssues.some(i => i.id === data.id)) {
        setMyIssues(currentMyIssues.map(i => i.id === data.id ? data : i));
    }
    // Keep the issue-detail prev/next context live too — it's a snapshot of
    // whichever list a detail view was opened from, so without this a remote
    // update leaves stale data behind the nav arrows (CHT-1211 review #1).
    const navContext = getDetailNavContext();
    if (navContext.some(i => i.id === data.id)) {
        setDetailNavContext(navContext.map(i => i.id === data.id ? data : i));
    }
    // Re-render based on current view. Dashboard activity refetch
    // deliberately omitted here (CHT-1225 item 5) -- see the comment in
    // handleIssueCreated above; handleActivity() covers it.
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
    } else if (getCurrentView() === 'board') {
        scheduleBoardRefresh();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
    } else if (getCurrentView() === 'epics') {
        // CHT-1226: a sub-issue closing/reopening under a visible epic
        // (progress bar is done/total sub-issues) used to go stale.
        loadEpics();
    } else if (getCurrentView() === 'issue-detail') {
        // Was gated on detailContent.dataset.issueId, an attribute production
        // code never sets — remote updates to the open issue (including a
        // description change from another user) silently never refreshed
        // (CHT-1214). Match the getCurrentDetailIssue() check every other
        // handler below already uses. While the description editor is open,
        // defer instead of re-rendering (which would clobber the edit) —
        // and hand over the fresh issue payload so Save can detect a remote
        // description conflict.
        if (getCurrentDetailIssue()?.id === data.id) {
            if (hasOpenDescriptionEditor()) {
                noteSkippedDetailRefresh(data);
            } else {
                viewIssue(data.id, false);
            }
        }
    }
}

function handleIssueDeleted(data) {
    // Remove from local arrays
    setIssues(getIssues().filter(i => i.id !== data.id));
    setMyIssues(getMyIssues().filter(i => i.id !== data.id));
    // Drop from the issue-detail prev/next context too, so a deleted sibling
    // isn't reachable via Next/Prev on an open detail view (CHT-1211 review #1)
    const navContext = getDetailNavContext();
    if (navContext.some(i => i.id === data.id)) {
        setDetailNavContext(navContext.filter(i => i.id !== data.id));
    }
    // Re-render. Unlike created/updated, delete_issue's broadcast has no
    // matching 'activity' event (backend/app/api/issues.py), so this is the
    // only trigger for a delete-driven dashboard activity refresh -- not
    // the item 5 double-fetch (that's specifically created/updated).
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
        loadDashboardActivity({ showLoading: false });
    } else if (getCurrentView() === 'board') {
        scheduleBoardRefresh();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
    } else if (getCurrentView() === 'epics') {
        // CHT-1226: a sub-issue being deleted under a visible epic used to
        // leave its progress bar stale (denominator never shrank).
        loadEpics();
    }
    showToast(`Issue ${data.identifier} deleted`, 'info');

    // Navigate away if viewing the deleted issue
    if (getCurrentView() === 'issue-detail' && getCurrentDetailIssue()?.id === data.id) {
        showToast(`Issue ${data.identifier} was deleted`, 'warning');
        navigateTo('my-issues');
    }
}

/**
 * Refresh the open detail view for an event on the currently-viewed issue,
 * deferring (not dropping) the refresh while the description editor is open.
 */
function refreshOpenDetail(issueId) {
    if (hasOpenDescriptionEditor()) {
        noteSkippedDetailRefresh();
    } else {
        viewIssue(issueId, false);
    }
}

function handleComment(data) {
    if (getCurrentView() === 'my-issues') {
        loadDashboardActivity({ showLoading: false });
    }
    if (getCurrentView() === 'issue-detail' && getCurrentDetailIssue()?.id === data.issue_id) {
        refreshOpenDetail(data.issue_id);
    }
    // Document comments broadcast a `document_id` field (documents.py), but
    // were silently dropped here — this handler only ever checked issue_id
    // (CHT-1213).
    if (data.document_id) {
        refreshDocumentDetailIfViewing(data.document_id);
    }
}

/**
 * Document create/update/delete (CHT-1213) — refresh the documents list if
 * it's the active view, and the open document detail if it's the one that
 * changed. See refreshDocumentDetailIfViewing()'s own comment (documents.js)
 * for why this doesn't reuse the getCurrentView() === '<x>-detail' pattern
 * the issue-detail handlers above use — that check is dead in production.
 *
 * 'deleted' is handled separately: refreshing a just-deleted document would
 * 404 and just show a generic error toast over stale content, so it
 * navigates away instead (mirrors handleIssueDeleted below).
 */
function handleDocument(data, { type } = {}) {
    refreshDocumentsListIfActive();
    if (type === 'deleted') {
        handleRemoteDocumentDeleted(data.id, data.title);
    } else {
        refreshDocumentDetailIfViewing(data.id);
    }
}

function handleRelation(data) {
    if (getCurrentView() === 'issue-detail') {
        const currentIssueId = getCurrentDetailIssue()?.id;
        if (currentIssueId && (data.source_issue_id === currentIssueId || data.target_issue_id === currentIssueId)) {
            refreshOpenDetail(currentIssueId);
        }
    }
}

function handleAttestation(data) {
    if (getCurrentView() === 'approvals') {
        loadGateApprovals();
    }
    if (getCurrentView() === 'issue-detail' && getCurrentDetailIssue()?.id === data.issue_id) {
        refreshOpenDetail(data.issue_id);
    }
}

function handleActivity(data) {
    if (getCurrentView() === 'my-issues') {
        loadDashboardActivity({ showLoading: false });
    }
    if (getCurrentView() === 'issue-detail' && getCurrentDetailIssue()?.id === data.issue_id) {
        refreshOpenDetail(data.issue_id);
    }
}

function handleProject(data, { type }) {
    loadProjects().then(() => {
        if (getCurrentView() === 'projects') {
            renderProjects();
        }
    }).catch(e => console.error('Failed to reload projects:', e));
    if (type === 'created') {
        showToast(`New project: ${data.name}`, 'info');
    } else if (type === 'deleted') {
        showToast(`Project ${data.name} deleted`, 'info');
    }
}

/** Refresh sprint detail if viewing one, otherwise refresh the list (CHT-325). */
function refreshSprintView() {
    const detail = getCurrentSprintDetail();
    if (detail) {
        viewSprint(detail.id, false).catch(e => console.error('Failed to refresh sprint detail:', e));
    } else {
        loadSprints().catch(e => console.error('Failed to reload sprints:', e));
    }
}

function handleSprint(data, { type } = {}) {
    // Another client completing/rotating a sprint changes which sprint is
    // "current" — drop the cached ids unconditionally (cheap, safe on any
    // view) so an Issues view filtering by Current Sprint re-resolves
    // instead of silently querying the now-completed sprint (CHT-1212).
    clearCachedCurrentSprintIds();
    if (getCurrentView() === 'sprints') {
        refreshSprintView();
    } else if (getCurrentView() === 'my-issues') {
        loadSprintStatus();
    }
    // CHT-1225: issue/project lifecycle events show a toast (handleProject
    // above); sprint events showed none at all, even for 'closed' -- a
    // comparably significant lifecycle event other team members would want
    // passive notice of.
    if (type === 'created') {
        showToast(`New sprint: ${data.name}`, 'info');
    } else if (type === 'closed') {
        showToast(`Sprint ${data.name} closed`, 'info');
    }
}

/**
 * Resync on WebSocket reconnect (CHT-1225 item 3). ws.js's onopen only
 * dispatches 'connection:reconnected' when this was a genuine reconnect
 * (wsFailCount was >0 going in) -- a deliberate team switch resets
 * wsFailCount to 0 before the new socket even opens, so this never fires
 * for that case. Any mutation broadcast during the disconnect window was
 * otherwise silently dropped forever; this refetches whichever view is
 * currently open instead of replaying every missed event.
 */
function handleReconnected() {
    const view = getCurrentView();
    if (view === 'issues') {
        loadIssues().catch(e => console.error('Failed to resync issues:', e));
    } else if (view === 'my-issues') {
        loadMyIssues().catch(e => console.error('Failed to resync my issues:', e));
        loadSprintStatus().catch(e => console.error('Failed to resync sprint status:', e));
        loadDashboardActivity({ showLoading: false });
    } else if (view === 'board') {
        loadBoard();
    } else if (view === 'sprints') {
        refreshSprintView();
    } else if (view === 'epics') {
        loadEpics().catch(e => console.error('Failed to resync epics:', e));
    } else if (view === 'projects') {
        loadProjects().then(() => {
            if (getCurrentView() === 'projects') renderProjects();
        }).catch(e => console.error('Failed to resync projects:', e));
    } else if (view === 'documents') {
        refreshDocumentsListIfActive();
    } else if (view === 'approvals') {
        loadGateApprovals();
    } else if (view === 'issue-detail') {
        const issueId = getCurrentDetailIssue()?.id;
        if (issueId) refreshOpenDetail(issueId);
    }
}
