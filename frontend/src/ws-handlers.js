/**
 * WebSocket event handlers (CHT-1039)
 *
 * Registers pub/sub handlers for each entity type.
 * Each handler is self-contained and subscribes to specific events.
 */

import { subscribe } from './ws.js';
import { getIssues, setIssues, getDetailNavContext, setDetailNavContext, getCurrentUser, getCurrentView, getCurrentDetailIssue } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadDashboardActivity, loadSprintStatus } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { renderBoard } from './board.js';
import { loadSprints, viewSprint, getCurrentSprintDetail, clearCachedCurrentSprintIds } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { viewIssue, noteSkippedDetailRefresh } from './issue-detail-view.js';
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

    if (getCurrentView() === 'my-issues') {
        loadDashboardActivity({ showLoading: false });
    }

    // Re-render board/sprints when issues are created
    if (getCurrentView() === 'board') {
        renderBoard();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
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
    // Re-render based on current view
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
        loadDashboardActivity({ showLoading: false });
    } else if (getCurrentView() === 'board') {
        renderBoard();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
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
    // Re-render
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
        loadDashboardActivity({ showLoading: false });
    } else if (getCurrentView() === 'board') {
        renderBoard();
    } else if (getCurrentView() === 'sprints') {
        refreshSprintView();
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

function handleSprint() {
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
}
