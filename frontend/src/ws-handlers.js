/**
 * WebSocket event handlers (CHT-1039)
 *
 * Registers pub/sub handlers for each entity type.
 * Each handler is self-contained and subscribes to specific events.
 */

import { subscribe } from './ws.js';
import { getIssues, setIssues, getCurrentUser, getCurrentView } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadDashboardActivity } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { renderBoard } from './board.js';
import { loadSprints } from './sprints.js';
import { loadProjects, renderProjects } from './projects.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';

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
        loadSprints();
    }

    // Refresh issue detail if a child issue was created
    if (getCurrentView() === 'issue-detail' && data.parent_id === window.currentDetailIssue?.id) {
        viewIssue(window.currentDetailIssue.id, false);
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
    // Re-render based on current view
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
        loadDashboardActivity({ showLoading: false });
    } else if (getCurrentView() === 'board') {
        renderBoard();
    } else if (getCurrentView() === 'sprints') {
        loadSprints();
    } else if (getCurrentView() === 'issue-detail') {
        const detailContent = document.getElementById('issue-detail-content');
        if (detailContent && detailContent.dataset.issueId === data.id) {
            viewIssue(data.id);
        }
    }
}

function handleIssueDeleted(data) {
    // Remove from local arrays
    setIssues(getIssues().filter(i => i.id !== data.id));
    setMyIssues(getMyIssues().filter(i => i.id !== data.id));
    // Re-render
    if (getCurrentView() === 'issues') {
        renderIssues();
    } else if (getCurrentView() === 'my-issues') {
        renderMyIssues();
        loadDashboardActivity({ showLoading: false });
    } else if (getCurrentView() === 'board') {
        renderBoard();
    } else if (getCurrentView() === 'sprints') {
        loadSprints();
    }
    showToast(`Issue ${data.identifier} deleted`, 'info');

    // Navigate away if viewing the deleted issue
    if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.id) {
        showToast(`Issue ${data.identifier} was deleted`, 'warning');
        navigateTo('my-issues');
    }
}

function handleComment(data) {
    if (getCurrentView() === 'my-issues') {
        loadDashboardActivity({ showLoading: false });
    }
    if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
        viewIssue(data.issue_id, false);
    }
}

function handleRelation(data) {
    if (getCurrentView() === 'issue-detail') {
        const currentIssueId = window.currentDetailIssue?.id;
        if (currentIssueId && (data.source_issue_id === currentIssueId || data.target_issue_id === currentIssueId)) {
            viewIssue(currentIssueId, false);
        }
    }
}

function handleAttestation(data) {
    if (getCurrentView() === 'gate-approvals' && typeof window.loadGateApprovals === 'function') {
        window.loadGateApprovals();
    }
    if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
        viewIssue(data.issue_id, false);
    }
}

function handleActivity(data) {
    if (getCurrentView() === 'my-issues') {
        loadDashboardActivity({ showLoading: false });
    }
    if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
        viewIssue(data.issue_id, false);
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

function handleSprint() {
    if (getCurrentView() === 'sprints') {
        loadSprints();
    }
}
