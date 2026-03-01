/**
 * Gate Approvals module (CHT-1040)
 *
 * Consolidates all gate-approval and pending-approval code:
 * - Modal dialogs for approving GATE and REVIEW rituals
 * - loadGateApprovals / renderGateApprovals list view
 * - Sprint limbo approval rendering
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { registerActions } from './event-delegation.js';
import { getProjects } from './projects.js';
import { getPendingGates, setPendingGates, getCurrentTeam } from './state.js';
import { completeGateRitual } from './rituals-view.js';
import { isApprovalsExplainerDismissed, dismissApprovalsExplainer as persistDismissExplainer } from './storage.js';
import { viewIssue } from './issue-detail-view.js';


/**
 * Render markdown content safely using marked + DOMPurify.
 */
export function renderMarkdown(content) {
    if (!content) return '';
    try {
        marked.setOptions({ breaks: true, gfm: true });
        const rawHtml = marked.parse(content);
        // Escape raw-text HTML elements (title, style, textarea, xmp) whose
        // content gets silently destroyed by DOMPurify since it treats their
        // children as raw text, not DOM nodes (CHT-829)
        const safeHtml = rawHtml.replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,
            (match) => match.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        return DOMPurify.sanitize(safeHtml, { FORCE_BODY: true });
    } catch (e) {
        console.error('Markdown parsing error:', e);
        return content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    }
}


/**
 * Format ISO timestamp to relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffMs = now - date;
    if (diffMs < 0) return 'just now';
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}


// ============================================================================
// Gate approval modals (existing code)
// ============================================================================

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
                <a href="/issue/${encodeURIComponent(issueIdentifier)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${escapeAttr(issueId)}">View full ticket details &rarr;</a>
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
    document.querySelector('.modal')?.classList.add('modal-wide');
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
        loadGateApprovals();
    } catch (e) {
        showApiError('complete gate ritual', e);
    }
}

/**
 * Entry point called from gate approvals list button.
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
                <a href="/issue/${encodeURIComponent(issueIdentifier)}" class="gate-approval-view-link" data-action="view-issue-from-modal" data-issue-id="${escapeAttr(issueId)}">View full ticket details &rarr;</a>
            </div>
            <div class="gate-approval-ritual">
                <div class="gate-approval-prompt">${escapeHtml(ritualPrompt)}</div>
                ${attestedBy ? `<div class="gate-approval-requested">Attested by <strong>${escapeHtml(attestedBy)}</strong>${attestedAt ? ` ${formatRelativeTime(attestedAt)}` : ''}</div>` : ''}
                ${attestationNote ? `<div class="gate-approval-attestation-note"><strong>Attestation note:</strong><br>${renderMarkdown(attestationNote)}</div>` : ''}
            </div>
            <form id="review-approval-form">
                <div class="form-group">
                    <label for="review-approval-comment">Comment (optional)</label>
                    <textarea id="review-approval-comment" placeholder="Add a comment about your approval..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Approve Attestation</button>
            </form>
        </div>
    `;
    document.getElementById('review-approval-form').addEventListener('submit', (event) => {
        handleReviewApproval(event, ritualId, issueId, ritualName);
    });
    showModal();
    document.querySelector('.modal')?.classList.add('modal-wide');
}

/**
 * Handle review approval form submission.
 */
async function handleReviewApproval(event, ritualId, issueId, ritualName) {
    event.preventDefault();
    const comment = document.getElementById('review-approval-comment')?.value?.trim();

    try {
        await api.approveTicketRitual(ritualId, issueId);
        if (comment) {
            try {
                await api.createComment(issueId, comment);
            } catch (commentErr) {
                console.error('Failed to post approval comment:', commentErr);
            }
        }
        showToast(`Review ritual "${ritualName}" approved!`, 'success');
        closeModal();
        loadGateApprovals();
    } catch (e) {
        showApiError('approve review ritual', e);
    }
}

/**
 * Entry point for review approve buttons in the approvals list.
 */
function approveReviewFromList(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, attestedBy, attestedAt, attestationNote) {
    showReviewApprovalModal(ritualId, issueId, ritualName, ritualPrompt, issueIdentifier, issueTitle, attestedBy, attestedAt, attestationNote);
}


// ============================================================================
// Approvals list view (consolidated from app.js, CHT-1040)
// ============================================================================

// Sprint limbo rituals shown in the approvals view (CHT-905)
let sprintLimboApprovals = [];

/**
 * Load all pending gate approvals across projects.
 */
export async function loadGateApprovals() {
    if (!getCurrentTeam()) return;

    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading pending approvals...</div>';

    try {
        const results = await Promise.all(getProjects().map(async project => {
            const [approvals, limbo] = await Promise.all([
                api.getPendingApprovals(project.id),
                api.getLimboStatus(project.id),
            ]);
            return { project, approvals, limbo };
        }));

        const allApprovals = [];
        const allLimbo = [];
        for (const { project, approvals, limbo } of results) {
            allApprovals.push(...approvals);
            if (limbo && limbo.in_limbo) {
                const actionable = (limbo.pending_rituals || []).filter(r => {
                    if (r.attestation?.approved_at) return false;
                    return r.approval_mode === 'gate' || !!r.attestation;
                });
                if (actionable.length > 0) {
                    allLimbo.push({ project, rituals: actionable });
                }
            }
        }
        setPendingGates(allApprovals);
        sprintLimboApprovals = allLimbo;
        renderGateApprovals();
    } catch (e) {
        container.innerHTML = `<div class="empty-state"><h3>Error loading approvals</h3><p>${escapeHtml(e.message)}</p></div>`;
    }
}

/**
 * Render the gate approvals list view.
 */
function renderGateApprovals() {
    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    const pendingItems = getPendingGates();
    const hasSprintLimbo = sprintLimboApprovals.length > 0;

    // First-use explainer (CHT-766)
    const showExplainer = !isApprovalsExplainerDismissed();

    if (pendingItems.length === 0 && !hasSprintLimbo) {
        if (showExplainer) {
            container.innerHTML = `
                <div class="empty-state approvals-explainer">
                    <h3>Welcome to Approvals</h3>
                    <p>This is where you'll review and approve ritual attestations from your team.</p>
                    <div class="explainer-details">
                        <p><strong>What are rituals?</strong> Rituals are configurable checks that run when sprints close, tickets are claimed, or tickets are closed. They ensure your team follows processes like running tests, updating docs, or getting code reviewed.</p>
                        <p><strong>How approvals work:</strong></p>
                        <ul>
                            <li><strong>Gate</strong> rituals require a human to complete them directly — agents cannot attest.</li>
                            <li><strong>Review</strong> rituals are attested by agents but need human approval before they count.</li>
                            <li><strong>Auto</strong> rituals are cleared immediately by agents (they won't appear here).</li>
                        </ul>
                        <p>To set up rituals, go to a project's settings and configure them under the ritual tabs.</p>
                    </div>
                    <button class="btn btn-secondary" data-action="dismiss-approvals-explainer">Got it!</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No pending approvals</h3>
                    <p>All rituals have been completed. Nice work!</p>
                </div>
            `;
        }
        return;
    }

    let html = '';

    // Sprint limbo section (CHT-905)
    if (hasSprintLimbo) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${sprintLimboApprovals.map(({ project, rituals }) => `
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${escapeHtml(project.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${rituals.map(r => {
                                    const hasAttestation = r.attestation && !r.attestation.approved_at;
                                    const statusIcon = hasAttestation ? '⏳' : '○';
                                    const statusText = hasAttestation
                                        ? `<span class="gate-waiting-info">Attested by <strong>${escapeHtml(r.attestation.attested_by_name || 'Unknown')}</strong></span>`
                                        : (r.approval_mode === 'gate'
                                            ? ''
                                            : '<span class="text-muted">Awaiting agent attestation</span>');
                                    const actionBtn = hasAttestation
                                        ? `<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${escapeAttr(r.id)}"
                                            data-project-id="${escapeAttr(project.id)}">Approve</button>`
                                        : (r.approval_mode === 'gate'
                                            ? `<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${escapeAttr(r.id)}"
                                                data-project-id="${escapeAttr(project.id)}"
                                                data-ritual-name="${escapeAttr(r.name)}">Complete</button>`
                                            : '');

                                    return `
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${statusIcon} ${escapeHtml(r.name)}
                                                    <span class="badge badge-ritual-${escapeAttr(r.approval_mode)}">${escapeHtml(r.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${escapeHtml(r.prompt)}</span>
                                                ${statusText}
                                            </div>
                                            ${actionBtn}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Filter helper
    const getApprovals = (item) => item.pending_approvals || [];
    const filterPred = (pred) => (item) => {
        const filtered = getApprovals(item).filter(pred);
        return filtered.length > 0 ? { ...item, _filteredApprovals: filtered } : null;
    };

    // Group by type
    const claimGates = pendingItems.map(filterPred(r => r.approval_mode === 'gate' && r.limbo_type === 'claim')).filter(Boolean);
    const closeGates = pendingItems.map(filterPred(r => r.approval_mode === 'gate' && r.limbo_type === 'close')).filter(Boolean);
    const reviewItems = pendingItems.map(filterPred(r => r.approval_mode === 'review')).filter(Boolean);

    if (claimGates.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${claimGates.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    if (closeGates.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${closeGates.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    if (reviewItems.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${reviewItems.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Attach click handlers for gate approve buttons (GATE mode)
    container.querySelectorAll('.gate-approve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset;
            completeGateFromList(
                d.ritualId,
                d.issueId,
                d.ritualName,
                d.ritualPrompt,
                d.issueIdentifier,
                d.issueTitle,
                d.requestedBy,
                d.requestedAt
            );
        });
    });

    // Attach click handlers for review quick-approve buttons (inline, no modal)
    container.querySelectorAll('.review-quick-approve-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            // Disable sibling "Comment & Approve" button to prevent modal during in-flight approval
            const siblingBtn = btn.closest('.gate-ritual-actions')?.querySelector('.review-approve-btn');
            if (siblingBtn) siblingBtn.disabled = true;
            const d = btn.dataset;
            try {
                await api.approveTicketRitual(d.ritualId, d.issueId);
                showToast(`Review ritual "${d.ritualName}" approved!`, 'success');
                await loadGateApprovals();
            } catch (e) {
                btn.disabled = false;
                if (siblingBtn) siblingBtn.disabled = false;
                showApiError('approve review ritual', e);
            }
        });
    });

    // Attach click handlers for review comment+approve buttons (opens modal)
    container.querySelectorAll('.review-approve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset;
            approveReviewFromList(
                d.ritualId,
                d.issueId,
                d.ritualName,
                d.ritualPrompt,
                d.issueIdentifier,
                d.issueTitle,
                d.requestedBy,
                d.requestedAt,
                d.attestationNote
            );
        });
    });

    // Attach click handlers for sprint ritual buttons (CHT-905)
    container.querySelectorAll('.sprint-approve-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            try {
                await api.approveAttestation(btn.dataset.ritualId, btn.dataset.projectId);
                showToast('Sprint ritual approved!', 'success');
                await loadGateApprovals();
            } catch (e) {
                btn.disabled = false;
                showApiError('approve sprint ritual', e);
            }
        });
    });
    container.querySelectorAll('.sprint-complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            completeGateRitual(btn.dataset.ritualId, btn.dataset.projectId, btn.dataset.ritualName);
        });
    });
}

/**
 * Dismiss the approvals first-use explainer (CHT-766).
 */
export function dismissApprovalsExplainer() {
    persistDismissExplainer();
    renderGateApprovals();
}

/**
 * Render a single approval issue card.
 */
function renderApprovalIssue(approvalIssue) {
    const approvals = approvalIssue._filteredApprovals || approvalIssue.pending_approvals || [];
    const ritualList = approvals.map(r => {
        const isReview = r.approval_mode === 'review';
        const waitingLabel = isReview ? 'Attested by' : 'Waiting';
        const waitingInfo = r.requested_by_name
            ? `<span class="gate-waiting-info">${waitingLabel}: <strong>${escapeHtml(r.requested_by_name)}</strong>${r.requested_at ? ` (${formatRelativeTime(r.requested_at)})` : ''}</span>`
            : '';
        const attestationNote = isReview && r.attestation_note
            ? `<div class="gate-attestation-note">${renderMarkdown(r.attestation_note)}</div>`
            : '';
        const modeLabel = isReview
            ? '<span class="badge badge-review">review</span>'
            : '<span class="badge badge-gate">gate</span>';

        const actionButtons = isReview
            ? `<div class="gate-ritual-actions">
                    <button class="btn btn-small btn-primary review-quick-approve-btn"
                        data-ritual-id="${escapeAttr(r.ritual_id)}"
                        data-issue-id="${escapeAttr(approvalIssue.issue_id)}"
                        data-ritual-name="${escapeAttr(r.ritual_name)}">Approve</button>
                    <button class="btn btn-small btn-secondary review-approve-btn"
                        data-ritual-id="${escapeAttr(r.ritual_id)}"
                        data-issue-id="${escapeAttr(approvalIssue.issue_id)}"
                        data-ritual-name="${escapeAttr(r.ritual_name)}"
                        data-ritual-prompt="${escapeAttr(r.ritual_prompt)}"
                        data-issue-identifier="${escapeAttr(approvalIssue.identifier)}"
                        data-issue-title="${escapeAttr(approvalIssue.title)}"
                        data-requested-by="${escapeAttr(r.requested_by_name || '')}"
                        data-requested-at="${escapeAttr(r.requested_at || '')}"
                        data-attestation-note="${escapeAttr(r.attestation_note || '')}">Comment &amp; Approve</button>
                </div>`
            : `<button class="btn btn-small btn-primary gate-approve-btn"
                    data-ritual-id="${escapeAttr(r.ritual_id)}"
                    data-issue-id="${escapeAttr(approvalIssue.issue_id)}"
                    data-ritual-name="${escapeAttr(r.ritual_name)}"
                    data-ritual-prompt="${escapeAttr(r.ritual_prompt)}"
                    data-issue-identifier="${escapeAttr(approvalIssue.identifier)}"
                    data-issue-title="${escapeAttr(approvalIssue.title)}"
                    data-requested-by="${escapeAttr(r.requested_by_name || '')}"
                    data-requested-at="${escapeAttr(r.requested_at || '')}">Complete</button>`;

        return `
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${escapeHtml(r.ritual_name)} ${modeLabel}</span>
                    <span class="gate-ritual-prompt">${escapeHtml(r.ritual_prompt)}</span>
                    ${waitingInfo}
                    ${attestationNote}
                </div>
                ${actionButtons}
            </div>
        `;
    }).join('');

    return `
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(approvalIssue.identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(approvalIssue.issue_id)}" class="gate-issue-link">
                    <span class="gate-issue-id">${escapeHtml(approvalIssue.identifier)}</span>
                    <span class="gate-issue-title">${escapeHtml(approvalIssue.title)}</span>
                </a>
                <span class="badge badge-${approvalIssue.status}">${approvalIssue.status.replace('_', ' ')}</span>
            </div>
            <div class="gate-issue-project">${escapeHtml(approvalIssue.project_name)}</div>
            <div class="gate-rituals">
                ${ritualList}
            </div>
        </div>
    `;
}


// Register delegated event handlers
registerActions({
    'view-issue-from-modal': (event, data) => {
        event.preventDefault();
        closeModal();
        viewIssue(data.issueId);
    },
    'dismiss-approvals-explainer': () => {
        dismissApprovalsExplainer();
    },
});

export {
    showGateApprovalModal,
    handleGateApproval,
    completeGateFromList,
    showReviewApprovalModal,
    handleReviewApproval,
    approveReviewFromList
};
