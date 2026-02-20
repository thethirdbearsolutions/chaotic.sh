/**
 * WebSocket module - Real-time updates (CHT-785)
 *
 * Extracted from app.js to decouple WebSocket connection management
 * and message handling from the main application module.
 */

/* global api -- provided via window by main.js entry point */

import { getIssues, setIssues, getCurrentUser, getCurrentView, getWebsocket, setWebsocket } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues, loadDashboardActivity } from './dashboard.js';
import { renderIssues } from './issue-list.js';
import { renderBoard } from './board.js';
import { loadSprints } from './sprints.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { showToast } from './ui.js';

let wsFailCount = 0;

/**
 * Connect to the WebSocket for real-time updates.
 * Handles reconnection with fixed-interval retry on disconnect.
 */
export function connectWebSocket(teamId) {
    // Close existing connection
    const existing = getWebsocket();
    if (existing) {
        existing.close();
        setWebsocket(null);
    }

    const token = api.getToken();
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}&team_id=${encodeURIComponent(teamId)}`;

    try {
        const ws = new WebSocket(wsUrl);
        setWebsocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
            if (wsFailCount > 0) {
                showToast('Live updates reconnected', 'success');
            }
            wsFailCount = 0;
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleWebSocketMessage(message);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
            wsFailCount++;
            // Show toast on first disconnect and periodically after
            if (wsFailCount === 1) {
                showToast('Live updates disconnected. Reconnecting...', 'warning');
            }
            // Attempt reconnect after 5 seconds
            setTimeout(() => {
                if (window.currentTeam && window.currentTeam.id === teamId) {
                    connectWebSocket(teamId);
                }
            }, 5000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    } catch (e) {
        console.error('Failed to connect WebSocket:', e);
    }
}

/**
 * Handle an incoming WebSocket message.
 * Dispatches updates to the appropriate view based on entity type.
 */
export function handleWebSocketMessage(message) {
    const { type, entity, data } = message;

    if (entity === 'issue') {
        if (type === 'created') {
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
                // Don't show toast - user already knows they created it
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

            // Re-render board/sprints when issues are created (CHT-237)
            if (getCurrentView() === 'board') {
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                loadSprints();
            }

            // Refresh issue detail if a child issue was created (CHT-71)
            if (getCurrentView() === 'issue-detail' && data.parent_id === window.currentDetailIssue?.id) {
                viewIssue(window.currentDetailIssue.id, false);
            }
        } else if (type === 'updated') {
            // Update in local arrays
            const issuesForUpdate = getIssues();
            const issueIndex = issuesForUpdate.findIndex(i => i.id === data.id);
            if (issueIndex >= 0) {
                const updatedIssues = [...issuesForUpdate];
                updatedIssues[issueIndex] = data;
                setIssues(updatedIssues);
            }
            const myIssuesForUpdate = getMyIssues();
            const myIndex = myIssuesForUpdate.findIndex(i => i.id === data.id);
            if (myIndex >= 0) {
                const updatedMyIssues = [...myIssuesForUpdate];
                updatedMyIssues[myIndex] = data;
                setMyIssues(updatedMyIssues);
            }
            // Re-render if on issues view
            if (getCurrentView() === 'issues') {
                renderIssues();
            } else if (getCurrentView() === 'my-issues') {
                renderMyIssues();
                loadDashboardActivity({ showLoading: false });
            } else if (getCurrentView() === 'board') {
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                // Sprints display issue counts, so issue changes affect them
                loadSprints();
            } else if (getCurrentView() === 'issue-detail') {
                // Refresh detail view if viewing this issue
                const detailContent = document.getElementById('issue-detail-content');
                if (detailContent && detailContent.dataset.issueId === data.id) {
                    viewIssue(data.id);
                }
            }
        } else if (type === 'deleted') {
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
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                loadSprints();
            }
            showToast(`Issue ${data.identifier} deleted`, 'info');
        }
        // If viewing issue detail and the deleted issue is the current one, navigate away
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.id) {
            showToast(`Issue ${data.identifier} was deleted`, 'warning');
            navigateTo('my-issues');
        }
    } else if (entity === 'comment') {
        if (getCurrentView() === 'my-issues') {
            loadDashboardActivity({ showLoading: false });
        }
        // Refresh issue detail if viewing the commented issue (CHT-71)
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    } else if (entity === 'relation') {
        // Refresh issue detail if viewing an issue involved in the relation change (CHT-71)
        if (getCurrentView() === 'issue-detail') {
            const currentIssueId = window.currentDetailIssue?.id;
            if (currentIssueId && (data.source_issue_id === currentIssueId || data.target_issue_id === currentIssueId)) {
                viewIssue(currentIssueId, false);
            }
        }
    } else if (entity === 'attestation') {
        // Attestation completed/approved (CHT-881) - refresh gate approvals
        if (getCurrentView() === 'gate-approvals' && typeof window.loadGateApprovals === 'function') {
            window.loadGateApprovals();
        }
        // Also refresh issue detail if viewing the affected issue
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    } else if (entity === 'activity') {
        // Activity event (CHT-359) - reload dashboard activity
        // TODO: In the future, prepend data directly instead of refetching
        if (getCurrentView() === 'my-issues') {
            loadDashboardActivity({ showLoading: false });
        }
        // Also refresh issue detail if viewing an affected issue
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    }
}

/**
 * Reset WebSocket state. Used for testing.
 */
export function resetWsState() {
    wsFailCount = 0;
    const existing = getWebsocket();
    if (existing) {
        existing.close();
        setWebsocket(null);
    }
}
