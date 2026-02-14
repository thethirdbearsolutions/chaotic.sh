/**
 * Gate Approvals module - modal for approving GATE rituals
 */

import { api } from './api.js';
import { showModal, closeModal, showToast } from './ui.js';
import { escapeHtml, escapeJsString } from './utils.js';


/**
 * Format a timestamp as relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

/**
 * Show the gate approval modal with issue and ritual context.
 */
function showGateApprovalModal(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, requestedBy, requestedAt) {
    document.getElementById('modal-title').textContent = `Approve: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${escapeHtml(issueIdentifier)}</span>
                    <span class="gate-approval-issue-title">${escapeHtml(issueTitle)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(issueIdentifier)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${escapeJsString(issueId)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${escapeHtml(ritualPrompt)}</div>
                ${requestedBy ? `<div class="gate-approval-requested">Requested by <strong>${escapeHtml(requestedBy)}</strong>${requestedAt ? ` ${formatRelativeTime(requestedAt)}` : ''}</div>` : ''}
            </div>
            <form id="gate-approval-form">
                <div class="form-group">
                    <label for="gate-approval-note">Note (optional)</label>
                    <textarea id="gate-approval-note" placeholder="Add a note about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve</button>
            </form>
        </div>
    `;
    document.getElementById('gate-approval-form').addEventListener('submit', (event) => {
        handleGateApproval(event, ritualId, issueId, ritualName);
    });
    showModal();
}

/**
 * Handle gate approval form submission.
 */
async function handleGateApproval(event, ritualId, issueId, ritualName) {
    event.preventDefault();
    const note = document.getElementById('gate-approval-note').value;

    try {
        await api.completeTicketGateRitual(ritualId, issueId, note || null);
        showToast(`GATE ritual "${ritualName}" approved!`, 'success');
        closeModal();
        // Refresh the gate approvals list if the function exists
        if (typeof window.loadGateApprovals === 'function') {
            window.loadGateApprovals();
        }
    } catch (e) {
        showToast(`Failed to complete gate ritual: ${e.message}`, 'error');
    }
}

/**
 * Entry point called from gate approvals list button.
 * Opens the approval modal with all context.
 */
function completeGateFromList(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, requestedBy, requestedAt) {
    showGateApprovalModal(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, requestedBy, requestedAt);
}

/**
 * Show the review approval modal with attestation context.
 */
function showReviewApprovalModal(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, attestedBy, attestedAt, attestationNote) {
    document.getElementById('modal-title').textContent = `Approve: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <div class="gate-approval-modal">
            <div class="gate-approval-issue">
                <div class="gate-approval-issue-header">
                    <span class="gate-approval-issue-id">${escapeHtml(issueIdentifier)}</span>
                    <span class="gate-approval-issue-title">${escapeHtml(issueTitle)}</span>
                </div>
                <a href="/issue/${encodeURIComponent(issueIdentifier)}" class="gate-approval-view-link" onclick="event.preventDefault(); closeModal(); viewIssue('${escapeJsString(issueId)}')">View full ticket details →</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${escapeHtml(ritualPrompt)}</div>
                ${attestedBy ? `<div class="gate-approval-requested">Attested by <strong>${escapeHtml(attestedBy)}</strong>${attestedAt ? ` ${formatRelativeTime(attestedAt)}` : ''}</div>` : ''}
                ${attestationNote ? `<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${escapeHtml(attestationNote)}</div>` : ''}
            </div>
            <form id="review-approval-form">
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `;
    document.getElementById('review-approval-form').addEventListener('submit', (event) => {
        handleReviewApproval(event, ritualId, issueId, ritualName);
    });
    showModal();
}

/**
 * Handle review approval form submission.
 */
async function handleReviewApproval(event, ritualId, issueId, ritualName) {
    event.preventDefault();

    try {
        await api.approveTicketRitual(ritualId, issueId);
        showToast(`Review ritual "${ritualName}" approved!`, 'success');
        closeModal();
        if (typeof window.loadGateApprovals === 'function') {
            window.loadGateApprovals();
        }
    } catch (e) {
        showToast(`Failed to approve review ritual: ${e.message}`, 'error');
    }
}

/**
 * Entry point for review approve buttons in the approvals list.
 */
function approveReviewFromList(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, attestedBy, attestedAt, attestationNote) {
    showReviewApprovalModal(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, attestedBy, attestedAt, attestationNote);
}

// Export to window for onclick handlers
window.completeGateFromList = completeGateFromList;
window.approveReviewFromList = approveReviewFromList;

export {
    showGateApprovalModal,
    handleGateApproval,
    completeGateFromList,
    showReviewApprovalModal,
    handleReviewApproval,
    approveReviewFromList
};
