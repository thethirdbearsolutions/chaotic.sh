/**
 * Issue detail view module - Issue detail rendering (CHT-668)
 * Extracted from app.js for testability
 */

import { getCommentDraft, setCommentDraft, getDescriptionDraft, setDescriptionDraft, getDescriptionDraftBase } from './storage.js';
import { getCurrentTeam, getCurrentDetailIssue, setCurrentDetailIssue, setCurrentDetailSprints, getCurrentView, getDetailNavContext, subscribe } from './state.js';
import { api } from './api.js';
import { showToast, showModal, closeModal, showApiError } from './ui.js';
import { navigateTo, saveScrollPosition } from './router.js';
import { getProjects, formatEstimate, isOutOfScale } from './projects.js';
import { getAssigneeById, formatAssigneeName } from './assignees.js';
import { formatStatus, formatPriority, formatIssueType, formatTimeAgo, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { renderMarkdown } from './gate-approvals.js';
import { setupMentionAutocomplete } from './mention-autocomplete.js';
import { renderTicketRitualActions } from './rituals-view.js';
import { showDetailDropdown } from './inline-dropdown.js';
import { registerActions } from './event-delegation.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { showCreateSubIssueModal } from './issue-creation.js';
import { showEditIssueModal, deleteIssue } from './issue-edit.js';
import { setupQuoteComment, quoteSelectionIntoComment } from './quote-comment.js';
// Markdown post-processing (issue-link/mention rendering) lives in rich-text.js
// (CHT-1213) so documents.js can share it without depending on this module.
// Re-exported here too so existing imports of these from issue-detail-view.js
// (this module's own test file, epic-detail-view.js) keep working unchanged.
import { processTextNodes, addIssueLinks, addIssueLinksAndMentions, renderCommentContent, renderDescriptionContent } from './rich-text.js';
export { processTextNodes, addIssueLinks, addIssueLinksAndMentions, renderCommentContent, renderDescriptionContent };

// Module state
let commentSubmitting = false;
let descriptionSubmitting = false;
let ticketRitualsCollapsed = true;
let currentTicketRituals = null;
let detailNavPrevId = null;
let detailNavNextId = null;
let detailAbortController = null;

// Remote activity that arrived while the description editor was open
// (CHT-1214, PR #209 review finding 3). ws-handlers.js suppresses the
// destructive viewIssue() re-render while the editor is up, but records it
// here instead of dropping it: Cancel resyncs the view from the server, and
// Save checks the stashed fresh issue for a remote description change so it
// can warn instead of silently last-write-winning over someone else's edit.
let pendingRemoteRefresh = false;
let remoteIssueDuringEdit = null;

/**
 * Called by ws-handlers.js when a websocket event for the currently-open
 * issue was NOT allowed to re-render the detail view because the inline
 * description editor is open.
 * @param {Object|null} freshIssue - the full issue payload for issue:updated
 *   events (null for comment/relation/attestation/activity events, which
 *   carry no issue body)
 */
export function noteSkippedDetailRefresh(freshIssue = null) {
    pendingRemoteRefresh = true;
    if (freshIssue) remoteIssueDuringEdit = freshIssue;
}

/**
 * Get ticketRitualsCollapsed state
 * @returns {boolean}
 */
export function getTicketRitualsCollapsed() {
    return ticketRitualsCollapsed;
}

/**
 * Set ticketRitualsCollapsed state
 * @param {boolean} collapsed
 */
export function setTicketRitualsCollapsed(collapsed) {
    ticketRitualsCollapsed = collapsed;
}

/**
 * Get current ticket rituals
 * @returns {Object|null}
 */
export function getCurrentTicketRituals() {
    return currentTicketRituals;
}

/**
 * Set current ticket rituals
 * @param {Object|null} rituals
 */
export function setCurrentTicketRituals(rituals) {
    currentTicketRituals = rituals;
}

/**
 * Get activity icon for activity type
 * @param {string} type - Activity type
 * @returns {string} Emoji icon
 */
export function getActivityIcon(type) {
    const icons = {
        'created': '✨',
        'updated': '✏️',
        'status_changed': '🔄',
        'priority_changed': '⚡',
        'assigned': '👤',
        'unassigned': '👤',
        'commented': '💬',
        'labeled': '🏷️',
        'unlabeled': '🏷️',
        'moved_to_sprint': '🏃',
        'removed_from_sprint': '🏃',
        // Document activities (CHT-639)
        'doc_created': '📄',
        'doc_updated': '📝',
        'doc_deleted': '🗑️',
        'doc_commented': '💬',
        // Ritual activities (CHT-673)
        'ritual_attested': '✅',
    };
    return icons[type] || '•';
}

/**
 * Format activity actor name
 * @param {Object} activity - Activity object
 * @returns {string} Actor name
 */
export function formatActivityActor(activity) {
    return activity.user_name || activity.user_email || 'Unknown';
}

/**
 * Format activity text for display
 * @param {Object} activity - Activity object
 * @returns {string} Formatted HTML text
 */
export function formatActivityText(activity) {
    // Strip enum prefixes like "IssueStatus." or "IssuePriority."
    const cleanValue = (val) => {
        if (!val) return '';
        return val.replace(/^(IssueStatus\.|IssuePriority\.)/, '').toLowerCase();
    };

    const fieldLabels = {
        'status': 'status',
        'priority': 'priority',
        'assignee_id': 'assignee',
        'sprint_id': 'sprint',
        'title': 'title',
        'description': 'description',
        'estimate': 'estimate',
    };

    switch (activity.activity_type) {
        case 'created':
            return 'Created issue';
        case 'commented': {
            const preview = activity.new_value
                ? escapeHtml(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            const attrPreview = activity.new_value
                ? escapeAttr(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            return preview
                ? `<a href="#comments-section" class="activity-comment-link" title="${attrPreview}" data-action="scroll-to-comments">Added a comment</a>`
                : 'Added a comment';
        }
        case 'status_changed':
            return `Changed status from <strong>${escapeHtml(formatStatus(cleanValue(activity.old_value)))}</strong> to <strong>${escapeHtml(formatStatus(cleanValue(activity.new_value)))}</strong>`;
        case 'priority_changed':
            return `Changed priority from <strong>${escapeHtml(formatPriority(cleanValue(activity.old_value)))}</strong> to <strong>${escapeHtml(formatPriority(cleanValue(activity.new_value)))}</strong>`;
        case 'assigned':
            return `Assigned to someone`;
        case 'unassigned':
            return `Removed assignee`;
        case 'moved_to_sprint':
            if (activity.sprint_name) {
                return `Moved to sprint <strong>${escapeHtml(activity.sprint_name)}</strong>`;
            }
            return `Moved to sprint`;
        case 'removed_from_sprint':
            if (activity.sprint_name) {
                return `Removed from sprint <strong>${escapeHtml(activity.sprint_name)}</strong>`;
            }
            return `Removed from sprint`;
        // Document activities (CHT-639)
        case 'doc_created':
            return 'Created document';
        case 'doc_updated':
            return 'Updated document';
        case 'doc_deleted':
            return 'Deleted document';
        case 'doc_commented':
            return 'Commented on document';
        // Ritual activities (CHT-673)
        case 'ritual_attested': {
            const ritualName = escapeHtml(activity.field_name || 'ritual');
            const notePreview = activity.new_value
                ? escapeAttr(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            return notePreview
                ? `<span class="activity-attestation-link" title="${notePreview}">Attested to <strong>${ritualName}</strong></span>`
                : `Attested to <strong>${ritualName}</strong>`;
        }
        case 'updated':
            // Generic update - show field if available
            if (activity.field_name) {
                const field = fieldLabels[activity.field_name] || escapeHtml(activity.field_name);
                return `Updated ${field}`;
            }
            return 'Updated issue';
        default:
            // Fallback for unknown activity types
            if (activity.field_name) {
                const field = fieldLabels[activity.field_name] || escapeHtml(activity.field_name);
                return `Updated ${field}`;
            }
            return 'Updated issue';
    }
}

/**
 * Handle click on description content
 * @param {Event} event - Click event
 * @param {string} issueId - Issue ID
 */
/**
 * Toggle a collapsible section (activity, comments)
 * @param {string} sectionName - 'activity' or 'comments'
 */
export function toggleSection(sectionName) {
    const section = document.getElementById(`${sectionName}-section`);
    if (!section) return;
    const content = section.querySelector('.section-collapsible-content');
    const toggleIcon = section.querySelector('.section-toggle-icon');
    if (content) {
        content.classList.toggle('collapsed');
    }
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated');
    }
}

/**
 * Toggle ticket rituals section collapsed state
 */
export function toggleTicketRituals() {
    ticketRitualsCollapsed = !ticketRitualsCollapsed;
    const container = document.getElementById('ticket-rituals-section');
    if (!container) return;
    const content = container.querySelector('.ticket-rituals-content');
    const toggleIcon = container.querySelector('.section-toggle-icon');
    if (content) {
        content.classList.toggle('collapsed', ticketRitualsCollapsed);
    }
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated', ticketRitualsCollapsed);
    }
}

/**
 * Load ticket rituals for an issue
 * @param {string} issueId - Issue ID
 */
export async function loadTicketRituals(issueId) {
    try {
        currentTicketRituals = await api.getTicketRitualsStatus(issueId);
        renderTicketRituals(issueId);
    } catch (e) {
        console.error('Failed to load ticket rituals:', e);
        currentTicketRituals = null;
    }
}

/**
 * Render ticket rituals section
 * @param {string} issueId - Issue ID
 */
export function renderTicketRituals(issueId) {
    const container = document.getElementById('ticket-rituals-section');
    if (!container) return;

    if (!currentTicketRituals) {
        container.classList.add('hidden');
        return;
    }

    const { pending_rituals, completed_rituals } = currentTicketRituals;

    // Hide section if no ticket-level rituals configured
    if (pending_rituals.length === 0 && completed_rituals.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');

    // Auto-expand if there are pending gate rituals - they require immediate attention
    const hasPendingGateRituals = pending_rituals.some(r => r.approval_mode === 'gate');
    if (hasPendingGateRituals) {
        ticketRitualsCollapsed = false;
    }

    const content = container.querySelector('.ticket-rituals-content');
    if (!content) return;

    content.classList.toggle('collapsed', ticketRitualsCollapsed);
    const toggleIcon = container.querySelector('.section-toggle-icon');
    if (toggleIcon) {
        toggleIcon.classList.toggle('rotated', ticketRitualsCollapsed);
    }

    // Determine the right warning message based on ritual triggers
    const hasCloseRituals = pending_rituals.some(r => r.trigger === 'ticket_close');
    const hasClaimRituals = pending_rituals.some(r => r.trigger === 'ticket_claim');
    let warningMessage = '⚠️ Complete these rituals:';
    if (hasCloseRituals && hasClaimRituals) {
        warningMessage = '⚠️ Pending rituals (claim before starting, close before completing):';
    } else if (hasClaimRituals) {
        warningMessage = '⚠️ Complete these rituals before claiming this ticket:';
    } else if (hasCloseRituals) {
        warningMessage = '⚠️ Complete these rituals before closing this ticket:';
    }

    content.innerHTML = `
        ${pending_rituals.length > 0 ? `
            <div class="ticket-rituals-pending">
                <p class="ticket-rituals-warning">${warningMessage}</p>
                ${pending_rituals.map(r => `
                    <div class="ticket-ritual-item pending${r.attestation ? ' attested' : ''}">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">${r.attestation ? '⏳' : '○'}</span>
                            <span class="ticket-ritual-name">${escapeHtml(r.name)}</span>
                            <span class="badge badge-trigger-${r.trigger || 'ticket_close'}">${r.trigger === 'ticket_claim' ? 'claim' : 'close'}</span>
                            <span class="badge badge-ritual-${r.approval_mode || 'auto'}">${r.approval_mode || 'auto'}</span>
                        </div>
                        <div class="ticket-ritual-prompt markdown-body">${r.prompt ? renderMarkdown(r.prompt) : ''}</div>
                        ${r.attestation ? `
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${escapeHtml(r.attestation.attested_by_name || 'Unknown')}</span>
                                <span class="attestation-time">${formatTimeAgo(r.attestation.attested_at)}</span>
                                ${r.attestation.note ? `<div class="attestation-note markdown-body">${renderMarkdown(r.attestation.note)}</div>` : ''}
                            </div>
                        ` : ''}
                        <div class="ticket-ritual-actions">
                            ${renderTicketRitualActions(r, issueId)}
                        </div>
                    </div>
                `).join('')}
            </div>
        ` : ''}
        ${completed_rituals.length > 0 ? `
            <div class="ticket-rituals-completed">
                ${completed_rituals.map(r => `
                    <div class="ticket-ritual-item completed">
                        <div class="ticket-ritual-info">
                            <span class="ticket-ritual-status">✓</span>
                            <span class="ticket-ritual-name">${escapeHtml(r.name)}</span>
                        </div>
                        ${r.attestation ? `
                            <div class="ticket-ritual-attestation">
                                <span class="attestation-by">Attested by ${escapeHtml(r.attestation.attested_by_name || 'Unknown')}</span>
                                <span class="attestation-time">${formatTimeAgo(r.attestation.attested_at)}</span>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

/**
 * View issue by path (identifier or ID)
 * @param {string} identifier - Issue identifier or ID
 * @returns {Promise<boolean>} true if the issue was found and rendered
 */
export async function viewIssueByPath(identifier) {
    try {
        // Try to fetch by identifier first, then by ID
        let issue;
        if (identifier.includes('-')) {
            issue = await api.getIssueByIdentifier(identifier);
        } else {
            issue = await api.getIssue(identifier);
        }
        if (issue) {
            await viewIssue(issue.id, false);
            return true;
        }
        navigateTo('my-issues', false);
        return false;
    } catch {
        navigateTo('my-issues', false);
        return false;
    }
}

/**
 * Compute prev/next navigation for an issue from the detail nav context.
 * @param {string} issueId - Issue ID
 * @returns {{issueList: Array, currentIndex: number, prevIssue: Object|null, nextIssue: Object|null, inList: boolean}}
 */
function computeDetailNav(issueId) {
    const issueList = getDetailNavContext();
    const currentIndex = issueList.findIndex(i => i.id === issueId);
    return {
        issueList,
        currentIndex,
        prevIssue: currentIndex > 0 ? issueList[currentIndex - 1] : null,
        nextIssue: currentIndex >= 0 && currentIndex < issueList.length - 1 ? issueList[currentIndex + 1] : null,
        inList: currentIndex >= 0,
    };
}

/**
 * Render the prev/next arrows + counter strip, or '' when the issue isn't in
 * the nav context list.
 */
function renderDetailNavArrows({ issueList, currentIndex, prevIssue, nextIssue, inList }) {
    if (!inList) return '';
    return `
                        <div class="issue-nav-arrows">
                            <button class="issue-nav-btn" ${prevIssue ? `data-action="navigate-issue" data-issue-id="${escapeAttr(prevIssue.id)}" data-identifier="${escapeAttr(prevIssue.identifier)}"` : 'disabled'} title="Previous issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                            </button>
                            <span class="issue-nav-counter">${currentIndex + 1} / ${issueList.length}</span>
                            <button class="issue-nav-btn" ${nextIssue ? `data-action="navigate-issue" data-issue-id="${escapeAttr(nextIssue.id)}" data-identifier="${escapeAttr(nextIssue.identifier)}"` : 'disabled'} title="Next issue">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                            </button>
                        </div>`;
}

/**
 * Re-sync the prev/next strip after the detail nav context changes under an
 * open detail view — ws-handlers.js patches the context on remote
 * issue:updated/issue:deleted events, and without this the arrows keep
 * pointing at (possibly deleted) snapshot entries (CHT-1211 review #1).
 */
function refreshDetailNavArrows() {
    const detailView = document.getElementById('issue-detail-view');
    if (!detailView || detailView.classList.contains('hidden')) return;
    const issue = getCurrentDetailIssue();
    if (!issue) return;

    const nav = computeDetailNav(issue.id);
    detailNavPrevId = nav.prevIssue ? nav.prevIssue.id : null;
    detailNavNextId = nav.nextIssue ? nav.nextIssue.id : null;

    const navContainer = detailView.querySelector('.issue-detail-nav');
    if (!navContainer) return;
    const existing = navContainer.querySelector('.issue-nav-arrows');
    const html = renderDetailNavArrows(nav);
    if (existing) {
        if (html) {
            existing.outerHTML = html;
        } else {
            existing.remove();
        }
    } else if (html) {
        navContainer.querySelector('.back-link')?.insertAdjacentHTML('afterend', html);
    }
}

subscribe((key) => {
    if (key !== 'detailNavContext') return;
    refreshDetailNavArrows();
});

/**
 * View issue detail
 * @param {string} issueId - Issue ID
 * @param {boolean} pushHistory - Whether to push to browser history
 */
export async function viewIssue(issueId, pushHistory = true) {
    try {
        // Record the list's scroll position before we replace it with detail
        // content, so Back can restore it (CHT-1211 item 1).
        if (pushHistory) saveScrollPosition();

        ticketRitualsCollapsed = true;
        // CHT-1224: comments used to be the one fetch in this Promise.all with
        // no per-call .catch (unlike ritual status/sprints below), so a single
        // comments-endpoint failure discarded 4 successful fetches and failed
        // the whole detail view. Isolate it like documents.js's viewDocument()
        // does, and surface a small notice in the comments section instead.
        let commentsLoadFailed = false;
        const [issue, comments, activities, subIssues, relations, ritualStatus] = await Promise.all([
            api.getIssue(issueId),
            api.getComments(issueId).catch(e => { console.error('Failed to load comments:', e); commentsLoadFailed = true; return []; }),
            api.getActivities(issueId),
            api.getSubIssues(issueId),
            api.getRelations(issueId),
            api.getTicketRitualsStatus(issueId).catch(() => ({ pending_rituals: [], completed_rituals: [] })),
        ]);

        // Extract attestation notes from ALL rituals (pending + completed) and merge with comments
        const allRituals = [
            ...(ritualStatus.pending_rituals || []),
            ...(ritualStatus.completed_rituals || []),
        ];
        const attestationNotes = allRituals
            .filter(r => r.attestation && r.attestation.note)
            .map(r => ({
                id: `attestation-${r.attestation.id}`,
                author_name: r.attestation.attested_by_name || 'Unknown',
                content: r.attestation.note,
                created_at: r.attestation.attested_at,
                is_attestation: true,
                ritual_name: r.name,
                is_pending: !r.attestation.approved_at,
            }));

        // Store ritual status for renderTicketRituals (avoids duplicate API call)
        currentTicketRituals = ritualStatus;

        // Combine and sort chronologically
        const allComments = [...comments, ...attestationNotes].sort((a, b) =>
            new Date(a.created_at) - new Date(b.created_at)
        );

        // Fetch parent issue and sprints in parallel (both depend on issue data)
        const secondaryFetches = [
            issue.parent_id ? api.getIssue(issue.parent_id) : Promise.resolve(null),
            api.getSprints(issue.project_id).catch(e => { console.error('Failed to load sprints:', e); return []; }),
        ];
        const [parentIssue, projectSprints] = await Promise.all(secondaryFetches);

        // Separate relations by type
        const blockingIssues = relations.filter(r => r.relation_type === 'blocks' && r.direction === 'outgoing');
        const blockedByIssues = relations.filter(r => r.relation_type === 'blocked_by' || (r.relation_type === 'blocks' && r.direction === 'incoming'));
        const relatedIssues = relations.filter(r => r.relation_type === 'relates_to');

        // Update URL
        if (pushHistory) {
            history.pushState({ issueId, view: getCurrentView() }, '', `/issue/${issue.identifier}`);
        }

        // Store current issue for inline editing
        setCurrentDetailIssue(issue);
        setCurrentDetailSprints(projectSprints);

        // A full render is by definition up to date — clear any remote
        // activity stashed while an editor was open (CHT-1214).
        pendingRemoteRefresh = false;
        remoteIssueDuringEdit = null;

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const detailView = document.getElementById('issue-detail-view');
        detailView.classList.remove('hidden');

        const backView = getCurrentView() || 'my-issues';
        const project = getProjects().find(p => p.id === issue.project_id);
        const assignee = issue.assignee_id ? getAssigneeById(issue.assignee_id) : null;
        const assigneeName = assignee ? formatAssigneeName(assignee) : null;
        const currentSprint = issue.sprint_id ? projectSprints.find(s => s.id === issue.sprint_id) : null;

        // Compute prev/next navigation from the list the user actually
        // navigated from (Issues/Board/Dashboard/Sprint each set this before
        // routing into an issue) rather than the Issues-view-only global
        // issues array, which was stale or empty when arriving from Board,
        // Dashboard, or a Sprint (CHT-1211 item 2).
        const nav = computeDetailNav(issue.id);
        const { prevIssue, nextIssue } = nav;

        detailView.querySelector('#issue-detail-content').innerHTML = `
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${escapeAttr(backView)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        ${renderDetailNavArrows(nav)}
                        <span class="issue-detail-breadcrumb">${project ? escapeHtml(project.name) : 'Project'} › ${escapeHtml(issue.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${escapeHtml(issue.title)}</h1>

                    ${parentIssue ? `
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(parentIssue.identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(parentIssue.id)}" data-identifier="${escapeAttr(parentIssue.identifier)}">${parentIssue.identifier}: ${escapeHtml(parentIssue.title)}</a>
                    </div>
                    ` : ''}

                    <div class="issue-detail-description">
                        <div class="section-header">
                            <h3>Description</h3>
                            <button class="btn btn-secondary btn-sm" data-action="edit-description" data-issue-id="${escapeAttr(issue.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Edit
                                ${getDescriptionDraft(issue.id) ? '<span class="draft-indicator" title="Unsaved draft">Draft</span>' : ''}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${!issue.description ? 'empty' : ''}" data-action="edit-description" data-issue-id="${escapeAttr(issue.id)}">
                            ${issue.description ? renderDescriptionContent(issue.description) : '<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <div class="section-header">
                            <h3>Sub-issues</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-create-sub-issue-modal" data-issue-id="${escapeAttr(issue.id)}" data-project-id="${escapeAttr(issue.project_id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="sub-issues-list">
                            ${subIssues.length === 0 ? renderEmptyState({
                                icon: EMPTY_ICONS.issues,
                                heading: 'No sub-issues',
                                description: 'Break this issue down by creating sub-issues',
                            }) : subIssues.map(subIssue => `
                                <a href="/issue/${encodeURIComponent(subIssue.identifier)}" class="sub-issue-item" data-action="navigate-issue" data-issue-id="${escapeAttr(subIssue.id)}" data-identifier="${escapeAttr(subIssue.identifier)}">
                                    <span class="sub-issue-status">${getStatusIcon(subIssue.status)}</span>
                                    <span class="sub-issue-id">${subIssue.identifier}</span>
                                    <span class="sub-issue-title">${escapeHtml(subIssue.title)}</span>
                                    ${subIssue.estimate ? `<span class="sub-issue-estimate">${subIssue.estimate}pts</span>` : ''}
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section relations-section">
                        <div class="section-header">
                            <h3>Relations</h3>
                            <button class="btn btn-secondary btn-sm" data-action="show-add-relation-modal" data-issue-id="${escapeAttr(issue.id)}">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                        <div class="relations-list">
                            ${blockingIssues.length === 0 && blockedByIssues.length === 0 && relatedIssues.length === 0 ? `
                                <div class="relations-empty">No relations</div>
                            ` : ''}
                            ${blockedByIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocked by</div>
                                    ${blockedByIssues.map(rel => `
                                        <div class="relation-item blocked-by">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(rel.related_issue_id)}" data-identifier="${escapeAttr(rel.related_issue_identifier)}" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${escapeAttr(issue.id)}" data-relation-id="${escapeAttr(rel.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${blockingIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Blocks</div>
                                    ${blockingIssues.map(rel => `
                                        <div class="relation-item blocks">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                            <span class="relation-status">${getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(rel.related_issue_id)}" data-identifier="${escapeAttr(rel.related_issue_identifier)}" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${escapeAttr(issue.id)}" data-relation-id="${escapeAttr(rel.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                            ${relatedIssues.length > 0 ? `
                                <div class="relation-group">
                                    <div class="relation-group-label">Related to</div>
                                    ${relatedIssues.map(rel => `
                                        <div class="relation-item relates-to">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                            <span class="relation-status">${getStatusIcon(rel.related_issue_status)}</span>
                                            <a href="/issue/${encodeURIComponent(rel.related_issue_identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(rel.related_issue_id)}" data-identifier="${escapeAttr(rel.related_issue_identifier)}" class="relation-link">${rel.related_issue_identifier}</a>
                                            <span class="relation-title">${escapeHtml(rel.related_issue_title)}</span>
                                            <button class="relation-delete" data-action="remove-relation" data-issue-id="${escapeAttr(issue.id)}" data-relation-id="${escapeAttr(rel.id)}" title="Remove relation">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                            </button>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <div id="ticket-rituals-section" class="issue-detail-section hidden">
                        <div class="section-header section-header-collapsible" data-action="toggle-ticket-rituals">
                            <h3>Ticket Rituals</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle ticket rituals">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="ticket-rituals-content collapsed">
                            <!-- Populated by loadTicketRituals -->
                        </div>
                    </div>

                    <div class="issue-detail-section" id="comments-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="comments">
                            <h3>Comments${allComments.length > 0 ? ` <span class="section-count">(${allComments.length})</span>` : ''}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle comments">
                                <svg class="section-toggle-icon rotated" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="comments-list section-collapsible-content">
                            ${commentsLoadFailed ? `
                                <div class="comments-error">
                                    Comments failed to load.
                                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${escapeAttr(issue.id)}">Retry</button>
                                </div>
                            ` : ''}
                            ${allComments.length === 0 ? (commentsLoadFailed ? '' : `
                                <div class="comments-empty">No comments yet</div>
                            `) : allComments.map(comment => `
                                <div class="comment ${comment.is_attestation ? 'comment-attestation' : ''} ${comment.is_pending ? 'comment-attestation-pending' : ''}">
                                    <div class="comment-avatar ${comment.is_attestation ? 'avatar-attestation' : ''}">${comment.is_attestation ? (comment.is_pending ? '⏳' : '✓') : (comment.author_name || 'U').charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${escapeHtml(comment.author_name || 'User')}</span>
                                            ${comment.is_attestation ? `<span class="comment-ritual-badge">${comment.is_pending ? 'Pending approval — ' : ''}Ritual: ${escapeHtml(comment.ritual_name)}</span>` : ''}
                                            <span class="comment-date">${formatTimeAgo(comment.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${renderCommentContent(comment.content)}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="activity-section">
                        <div class="section-header section-header-collapsible" data-action="toggle-section" data-section="activity">
                            <h3>Activity${activities.length > 0 ? ` <span class="section-count">(${activities.length})</span>` : ''}</h3>
                            <button type="button" class="section-toggle" aria-label="Toggle activity">
                                <svg class="section-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M4 6l4 4 4-4"/>
                                </svg>
                            </button>
                        </div>
                        <div class="activity-list section-collapsible-content collapsed">
                            ${activities.length === 0 ? renderEmptyState({
                                icon: EMPTY_ICONS.activity,
                                heading: 'No activity yet',
                                description: 'Activity will appear here as the issue is updated',
                            }) : activities.map(activity => `
                                <div class="activity-item">
                                    <div class="activity-icon">${getActivityIcon(activity.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${formatActivityText(activity)}</span>
                                        <span class="activity-actor">by ${escapeHtml(formatActivityActor(activity))}</span>
                                        <span class="activity-time">${formatTimeAgo(activity.created_at)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${escapeAttr(issue.id)}">
                        <textarea id="new-comment" placeholder="Write a comment... (${/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘' : 'Ctrl'}+Enter to submit)" rows="1"></textarea>
                        <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                        <button type="submit" class="btn btn-primary btn-sm comment-submit-btn">Comment</button>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Status</span>
                            <button class="property-value">
                                ${getStatusIcon(issue.status)}
                                <span>${formatStatus(issue.status)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Priority</span>
                            <button class="property-value">
                                ${getPriorityIcon(issue.priority)}
                                <span>${formatPriority(issue.priority)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${issue.issue_type || 'task'}">${formatIssueType(issue.issue_type)}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Assignee</span>
                            <button class="property-value">
                                ${assigneeName ? `${renderAvatar(assignee, 'avatar-small')}<span>${escapeHtml(assigneeName)}</span>` : `<span class="text-muted">Unassigned</span>`}
                            </button>
                        </div>

                        <div class="property-row" data-field="sprint" data-action="show-detail-dropdown" data-dropdown-type="sprint" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Sprint</span>
                            <button class="property-value">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                                <span>${currentSprint ? escapeHtml(currentSprint.name) : '<span class="text-muted">No Sprint</span>'}</span>
                            </button>
                        </div>

                        <div class="property-row" data-field="labels" data-action="show-detail-dropdown" data-dropdown-type="labels" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Labels</span>
                            <button class="property-value property-labels-btn">
                                ${issue.labels && issue.labels.length > 0
                                    ? issue.labels.map(label => `
                                        <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                                    `).join('')
                                    : '<span class="text-muted">No Labels</span>'
                                }
                            </button>
                        </div>

                        ${project ? `
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${escapeHtml(project.name)}</span>
                        </div>
                        ` : ''}

                        <div class="property-row" data-field="estimate" data-action="show-detail-dropdown" data-dropdown-type="estimate" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Estimate</span>
                            <button class="property-value${isOutOfScale(issue.estimate, issue.project_id) ? ' out-of-scale' : ''}" ${isOutOfScale(issue.estimate, issue.project_id) ? 'title="Estimate outside current scale"' : ''}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                <span>${formatEstimate(issue.estimate, issue.project_id)}</span>
                            </button>
                        </div>

                        ${issue.due_date ? `
                        <div class="property-row">
                            <span class="property-label">Due date</span>
                            <span class="property-value-static">${new Date(issue.due_date).toLocaleDateString()}</span>
                        </div>
                        ` : ''}

                        <div class="property-row">
                            <span class="property-label">Created by</span>
                            <span class="property-value-static">${escapeHtml(issue.creator_name || 'Unknown')}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions">
                        <div class="sidebar-overflow-menu">
                            <button class="btn btn-secondary btn-sm sidebar-overflow-trigger" aria-label="More actions" aria-haspopup="true" aria-expanded="false">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                            <div class="overflow-menu-dropdown hidden">
                                <button class="overflow-menu-item" data-action="edit" data-issue-id="${escapeAttr(issue.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                    Edit all fields
                                </button>
                                <button class="overflow-menu-item" data-action="show-issue-description-revisions" data-issue-id="${escapeAttr(issue.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    Description history
                                </button>
                                <button class="overflow-menu-item overflow-menu-danger" data-action="delete" data-issue-id="${escapeAttr(issue.id)}">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    Delete issue
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        `;

        // Clean up previous detail view listeners (CHT-1102)
        if (detailAbortController) detailAbortController.abort();
        detailAbortController = new AbortController();
        const { signal: detailSignal } = detailAbortController;

        // Set up overflow menu (click-outside, Escape, action handlers)
        const overflowTrigger = document.querySelector('.sidebar-overflow-trigger');
        const overflowDropdown = document.querySelector('.overflow-menu-dropdown');
        if (overflowTrigger && overflowDropdown) {
            const closeOverflow = () => {
                overflowDropdown.classList.add('hidden');
                overflowTrigger.setAttribute('aria-expanded', 'false');
            };
            const toggleOverflow = () => {
                const isHidden = overflowDropdown.classList.toggle('hidden');
                overflowTrigger.setAttribute('aria-expanded', String(!isHidden));
            };
            overflowTrigger.addEventListener('click', toggleOverflow, { signal: detailSignal });
            // Click outside to close
            document.addEventListener('click', (e) => {
                if (!overflowTrigger.contains(e.target) && !overflowDropdown.contains(e.target)) {
                    closeOverflow();
                }
            }, { signal: detailSignal });
            // Escape to close
            overflowDropdown.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeOverflow();
                    overflowTrigger.focus();
                }
            }, { signal: detailSignal });
            // Edit/delete actions handled via event delegation (CHT-1119)
        }

        // Render ticket rituals (data already fetched in Promise.all above)
        renderTicketRituals(issue.id);
        setupMentionAutocomplete();
        setupQuoteComment({ signal: detailSignal });

        // Cmd/Ctrl+Enter to submit comment + draft persistence (CHT-1041)
        const commentTextarea = document.getElementById('new-comment');
        if (commentTextarea) {
            // Restore draft comment if available
            const savedDraft = getCommentDraft(issue.id);
            if (savedDraft) {
                commentTextarea.value = savedDraft;
            }
            // Save draft on input
            commentTextarea.addEventListener('input', () => {
                setCommentDraft(issue.id, commentTextarea.value);
            });
            commentTextarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    commentTextarea.closest('form')?.requestSubmit();
                }
            });
        }

        // Set up prev/next keyboard navigation
        detailNavPrevId = prevIssue ? prevIssue.id : null;
        detailNavNextId = nextIssue ? nextIssue.id : null;
        const detailKeyHandler = (e) => {
            // Quote selected text into comment (CHT-1173)
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '>' || e.key === '.' || e.code === 'Period')) {
                if (quoteSelectionIntoComment()) {
                    e.preventDefault();
                    return;
                }
            }
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (document.getElementById('issue-detail-view').classList.contains('hidden')) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.isContentEditable) return;
            if (document.querySelector('.modal-overlay:not(.hidden)')) return;
            if (document.querySelector('.description-inline-editor')) return;
            if (e.key === 'ArrowLeft' && detailNavPrevId) {
                e.preventDefault();
                viewIssue(detailNavPrevId);
            } else if (e.key === 'ArrowRight' && detailNavNextId) {
                e.preventDefault();
                viewIssue(detailNavNextId);
            } else if (e.key === 'c') {
                e.preventDefault();
                e.stopImmediatePropagation();
                const textarea = document.getElementById('new-comment');
                if (textarea) {
                    textarea.focus();
                    textarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } else if (e.key === 'j') {
                e.preventDefault();
                e.stopImmediatePropagation();
                navigateAdjacentIssue(1);
            } else if (e.key === 'k') {
                e.preventDefault();
                e.stopImmediatePropagation();
                navigateAdjacentIssue(-1);
            } else if (e.key === 'd') {
                // Keyboard path into description editing (CHT-1214). 'e' is
                // deliberately left alone here — it's parked as a product
                // decision (CHT-1215) since it already means Estimate on this
                // view vs. Edit Issue on the list. This reuses the existing
                // edit-description click wiring rather than inventing a new
                // entry point.
                e.preventDefault();
                document.querySelector('[data-action="edit-description"]')?.click();
            }

            // Metadata keyboard shortcuts — click the property row to open its dropdown
            const shortcuts = { s: 'status', p: 'priority', a: 'assignee', l: 'labels', e: 'estimate', t: 'type' };
            const field = shortcuts[e.key];
            if (field) {
                const row = document.querySelector(`.property-row[data-field="${field}"]`);
                if (row) {
                    e.preventDefault();
                    row.click();
                }
            }
        };
        document.addEventListener('keydown', detailKeyHandler, { signal: detailSignal });
    } catch (e) {
        showApiError('load issue', e);
    }
}


// ============================================================================
// Issue Detail Actions (CHT-666)
// Extracted from app.js: comments, description editing, relations
// ============================================================================

/**
 * Add a comment to an issue.
 */
export async function handleAddComment(event, issueId) {
    event.preventDefault();
    if (commentSubmitting) return false;

    const content = document.getElementById('new-comment').value;

    // Clear draft early to avoid stale restore on re-render (CHT-1041)
    setCommentDraft(issueId, null);
    commentSubmitting = true;
    try {
        await api.createComment(issueId, content);
        await viewIssue(issueId);
        showToast('Comment added!', 'success');
    } catch (e) {
        // Restore draft on failure so user doesn't lose their comment
        setCommentDraft(issueId, content);
        showApiError('add comment', e);
    } finally {
        commentSubmitting = false;
    }
    return false;
}

/**
 * Inline description editing — replaces description content in-place.
 */
export async function editDescription(issueId) {
    const issue = getCurrentDetailIssue() || await api.getIssue(issueId);
    const section = document.querySelector('.issue-detail-description');
    if (!section) return;
    // Prevent double-click from creating duplicate editors
    if (section.querySelector('.description-inline-editor')) return;

    // Hide the section header (Edit button) while editing
    const header = section.querySelector('.section-header');
    if (header) header.style.display = 'none';

    const contentDiv = section.querySelector('.description-content');
    if (!contentDiv) return;

    // Replace content with inline editor
    contentDiv.innerHTML = `
        <div class="description-inline-editor">
            <div class="editor-tabs">
                <button type="button" class="editor-tab active" id="edit-description-tab-write" data-action="set-description-editor-mode" data-mode="write">Write</button>
                <button type="button" class="editor-tab" id="edit-description-tab-preview" data-action="set-description-editor-mode" data-mode="preview">Preview</button>
            </div>
            <div id="description-draft-warning" class="description-draft-warning hidden"></div>
            <textarea id="edit-description" rows="8" placeholder="Add a description...">${escapeHtml(issue.description || '')}</textarea>
            <div id="edit-description-mention-suggestions" class="mention-suggestions hidden"></div>
            <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            <div class="description-inline-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="cancel-description-edit">Cancel</button>
                <button type="button" class="btn btn-primary btn-sm" id="save-description-edit">Save</button>
            </div>
        </div>
    `;
    contentDiv.classList.remove('empty');

    const textarea = document.getElementById('edit-description');
    // Restore description draft if available (CHT-1041). If the draft was
    // captured against a description the server no longer has (someone else
    // saved changes since, or this draft is from a previous session), warn
    // instead of silently loading it over the current content (CHT-1214) —
    // a legacy draft with no recorded snapshot (basedOn === null) is treated
    // the same conservative way, since we can't rule out staleness.
    const savedDescDraft = getDescriptionDraft(issueId);
    const draftWarning = document.getElementById('description-draft-warning');
    if (savedDescDraft) {
        textarea.value = savedDescDraft;
        const draftBase = getDescriptionDraftBase(issueId);
        if (draftWarning && (draftBase === null || draftBase !== (issue.description || ''))) {
            draftWarning.textContent = 'This description has changed since your draft — review before saving.';
            draftWarning.classList.remove('hidden');
        }
    }
    setupMentionAutocomplete('edit-description', 'edit-description-mention-suggestions');
    textarea.addEventListener('input', () => {
        // Save description draft, snapshotted against the description as of
        // when this edit session opened (CHT-1214).
        const val = textarea.value;
        if (val !== (issue.description || '')) {
            setDescriptionDraft(issueId, val, issue.description || '');
        } else {
            setDescriptionDraft(issueId, null);
        }
        const preview = document.getElementById('edit-description-preview');
        if (preview && preview.style.display !== 'none') {
            updateDescriptionPreview();
        }
    });
    // Cmd/Ctrl+Enter to save
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            document.getElementById('save-description-edit')?.click();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            // Don't let the keydown continue to keyboard.js's document-level
            // handler, whose input-field branch blurs the textarea on Escape
            // — after a declined discard-confirm ("keep editing") that blur
            // would leave an open editor with no focus (PR #209 review
            // finding 4).
            e.stopPropagation();
            document.getElementById('cancel-description-edit')?.click();
        }
    });
    textarea.focus();

    // Cancel — restore the read-only view, but only silently discard when
    // there's nothing to lose. If the textarea differs from the saved
    // description, confirm before wiping it (and the recovery draft) —
    // mirroring the confirm() gate deleteIssue already uses for destructive
    // actions. Escape routes through this same handler (CHT-1214).
    document.getElementById('cancel-description-edit').addEventListener('click', () => {
        const currentValue = document.getElementById('edit-description')?.value ?? '';
        const isDirty = currentValue !== (issue.description || '');
        if (isDirty && !confirm('Discard your unsaved description changes?')) {
            return;
        }
        setDescriptionDraft(issueId, null);
        // Remote activity (comments, attestations, an issue:updated) may
        // have been suppressed while this editor was open — resync the whole
        // view from the server instead of restoring the pre-edit snapshot,
        // which would leave that activity invisible indefinitely (PR #209
        // review finding 3).
        if (pendingRemoteRefresh) {
            viewIssue(issueId, false);
            return;
        }
        if (header) header.style.display = '';
        contentDiv.className = `description-content markdown-body ${!issue.description ? 'empty' : ''}`;
        contentDiv.setAttribute('data-action', 'edit-description');
        contentDiv.setAttribute('data-issue-id', issue.id);
        contentDiv.innerHTML = issue.description
            ? renderDescriptionContent(issue.description)
            : '<span class="add-description-link">Add description...</span>';
        // Restore focus to something sensible instead of leaving it on the
        // removed textarea/button (CHT-1214) — no full re-render happens on
        // Cancel, so scroll position is untouched.
        section.querySelector('[data-action="edit-description"]')?.focus();
    });

    // Save — guarded against double-submit (CHT-1214; CHT-1101 only covered
    // the comment form). Scroll position and focus are restored after
    // viewIssue()'s full re-render, which would otherwise drop both.
    //
    // If a remote issue:updated arrived while this editor was open and it
    // changed the description, the first Save is intercepted with the same
    // conflict warning the stale-draft path uses — this is the live-session
    // variant of exactly that scenario, which would otherwise silently
    // last-write-win over the other person's edit (PR #209 review finding 3).
    // Saving again proceeds as an explicit overwrite.
    let remoteConflictAcknowledged = false;
    document.getElementById('save-description-edit').addEventListener('click', async () => {
        if (descriptionSubmitting) return;
        const description = document.getElementById('edit-description')?.value;
        if (description === undefined) return;
        const remoteDescription = remoteIssueDuringEdit ? (remoteIssueDuringEdit.description || '') : null;
        if (remoteDescription !== null && remoteDescription !== (issue.description || '') && !remoteConflictAcknowledged) {
            remoteConflictAcknowledged = true;
            const warnEl = document.getElementById('description-draft-warning');
            if (warnEl) {
                warnEl.textContent = 'This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version.';
                warnEl.classList.remove('hidden');
            }
            return;
        }
        const saveBtn = document.getElementById('save-description-edit');
        descriptionSubmitting = true;
        if (saveBtn) saveBtn.disabled = true;
        const scrollY = window.scrollY;
        try {
            await api.updateIssue(issueId, { description });
            setDescriptionDraft(issueId, null);
            showToast('Description updated', 'success');
            await viewIssue(issueId, false);
            window.scrollTo(0, scrollY);
            document.querySelector('.issue-detail-description [data-action="edit-description"]')?.focus();
        } catch (e) {
            showApiError('update description', e);
        } finally {
            descriptionSubmitting = false;
            // On success this button no longer exists (viewIssue replaced
            // it); on failure the editor stays open with this same button,
            // and it must not be left permanently disabled after a retry-able
            // failure.
            if (saveBtn) saveBtn.disabled = false;
        }
    });
}

function updateDescriptionPreview() {
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!textarea || !preview) return;
    const value = textarea.value.trim();
    preview.innerHTML = value
        ? renderDescriptionContent(value)
        : '<span class="text-muted">Nothing to preview.</span>';
}

/**
 * Switch description editor between write and preview modes.
 */
export function setDescriptionEditorMode(mode) {
    const writeTab = document.getElementById('edit-description-tab-write');
    const previewTab = document.getElementById('edit-description-tab-preview');
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!writeTab || !previewTab || !textarea || !preview) return;

    const isPreview = mode === 'preview';
    writeTab.classList.toggle('active', !isPreview);
    previewTab.classList.toggle('active', isPreview);
    textarea.style.display = isPreview ? 'none' : 'block';
    preview.style.display = isPreview ? 'block' : 'none';

    if (isPreview) {
        updateDescriptionPreview();
    } else {
        textarea.focus();
    }
}

/**
 * Show modal to add a relation to an issue.
 */
export function showAddRelationModal(issueId) {
    document.getElementById('modal-title').textContent = 'Add Relation';
    document.getElementById('modal-content').innerHTML = `
        <form data-action="handle-add-relation" data-issue-id="${escapeAttr(issueId)}">
            <div class="form-group">
                <label for="relation-type">Relation Type</label>
                <select id="relation-type" required>
                    <option value="blocks">Blocks</option>
                    <option value="blocked_by">Blocked by</option>
                    <option value="relates_to">Relates to</option>
                </select>
            </div>
            <div class="form-group">
                <label for="relation-issue-search">Search Issues</label>
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." data-action="search-issues-to-relate" data-issue-id="${escapeAttr(issueId)}">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" data-action="clear-selected-relation">&#215;</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `;
    showModal();
    document.getElementById('relation-issue-search').focus();
}

/**
 * Search for issues to add as a relation.
 */
export async function searchIssuesToRelate(query, currentIssueId) {
    const resultsDiv = document.getElementById('relation-search-results');
    if (!query || query.length < 2) {
        resultsDiv.innerHTML = '<p class="empty-state-small">Enter a search term to find issues</p>';
        return;
    }

    try {
        const teamId = getCurrentTeam()?.id;
        const issues = await api.searchIssues(teamId, query);
        const filteredIssues = issues.filter(issue => issue.id !== currentIssueId);

        if (filteredIssues.length === 0) {
            resultsDiv.innerHTML = '<p class="empty-state-small">No issues found</p>';
            return;
        }

        resultsDiv.innerHTML = filteredIssues.map(issue => `
            <div class="link-result-item" data-action="select-issue-for-relation" data-issue-id="${escapeAttr(issue.id)}" data-identifier="${escapeAttr(issue.identifier)}" data-title="${escapeAttr(issue.title)}">
                <span class="link-result-id">${escapeHtml(issue.identifier)}</span>
                <span class="link-result-title">${escapeHtml(issue.title)}</span>
            </div>
        `).join('');
    } catch {
        resultsDiv.innerHTML = '<p class="empty-state-small error">Error searching issues</p>';
    }
}

/**
 * Select an issue from relation search results.
 */
export function selectIssueForRelation(issueId, identifier, title) {
    document.getElementById('selected-related-issue-id').value = issueId;
    document.getElementById('selected-issue-info').textContent = `${identifier}: ${title}`;
    document.getElementById('selected-issue-display').style.display = 'flex';
    document.getElementById('relation-search-results').style.display = 'none';
    document.getElementById('relation-issue-search').value = identifier;
    document.getElementById('add-relation-btn').disabled = false;
}

/**
 * Clear the selected relation issue.
 */
export function clearSelectedRelation() {
    document.getElementById('selected-related-issue-id').value = '';
    document.getElementById('selected-issue-display').style.display = 'none';
    document.getElementById('relation-search-results').style.display = 'block';
    document.getElementById('relation-issue-search').value = '';
    document.getElementById('add-relation-btn').disabled = true;
    document.getElementById('relation-issue-search').focus();
}

/**
 * Add a relation between two issues.
 */
export async function handleAddRelation(event, issueId) {
    event.preventDefault();
    const relationType = document.getElementById('relation-type').value;
    const relatedIssueId = document.getElementById('selected-related-issue-id').value;

    if (!relatedIssueId) {
        showToast('Please select an issue', 'error');
        return false;
    }

    try {
        if (relationType === 'blocked_by') {
            await api.createRelation(relatedIssueId, issueId, 'blocks');
        } else {
            await api.createRelation(issueId, relatedIssueId, relationType);
        }

        closeModal();
        showToast('Relation added', 'success');
        viewIssue(issueId);
    } catch (e) {
        showApiError('add relation', e);
    }
    return false;
}

/**
 * Delete a relation from an issue.
 */
export async function deleteRelation(issueId, relationId) {
    try {
        await api.deleteRelation(issueId, relationId);
        showToast('Relation removed', 'success');
        viewIssue(issueId);
    } catch (e) {
        showApiError('remove relation', e);
    }
}

// ============================================================================
// Issue detail hotkeys (CHT-1087)
// ============================================================================

/**
 * Navigate to the next or previous issue in the current list.
 * @param {number} direction - 1 for next, -1 for previous
 */
function navigateAdjacentIssue(direction) {
    const currentIssue = getCurrentDetailIssue();
    if (!currentIssue) return;

    // Navigate within the list the user actually arrived from (CHT-1211 item 2)
    const issues = getDetailNavContext();
    if (!issues || issues.length === 0) return;

    const currentIndex = issues.findIndex(i => i.id === currentIssue.id);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= issues.length) return;

    viewIssue(issues[nextIndex].id);
}


// ============================================================================
// Event delegation actions
// ============================================================================

registerActions({
    'retry-issue-comments': (_event, data) => {
        // Simplest correct fix (CHT-1224, mirrors documents.js's
        // retry-document-comments): re-run the whole detail-view load rather
        // than surgically re-fetching just comments and re-wiring whatever
        // that section's own listeners would need.
        viewIssue(data.issueId, false);
    },
    'show-detail-dropdown': (event, data, target) => {
        showDetailDropdown(event, data.dropdownType, data.issueId, target);
    },
    'edit-description': (event, data) => {
        // The click-to-edit affordance now covers the populated-description
        // case too (CHT-1214), not just the empty state — guard against two
        // things that would otherwise misfire as "open the editor":
        // (1) clicking an issue-ref <a> inside the rendered markdown, which
        // should navigate instead, and (2) the click that ends a text
        // selection (e.g. before using the quote-comment tooltip), which
        // would otherwise destroy the very selection the user just made.
        if (event.target.closest('a')) return;
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.toString().trim()) return;
        editDescription(data.issueId);
    },
    'toggle-section': (_event, data) => {
        toggleSection(data.section);
    },
    'toggle-ticket-rituals': () => {
        toggleTicketRituals();
    },
    'save-comment': (event, data) => {
        handleAddComment(event, data.issueId);
    },
    'show-add-relation-modal': (_event, data) => {
        showAddRelationModal(data.issueId);
    },
    'remove-relation': (_event, data) => {
        deleteRelation(data.issueId, data.relationId);
    },
    'show-create-sub-issue-modal': (_event, data) => {
        showCreateSubIssueModal(data.issueId, data.projectId);
    },
    'handle-add-relation': (event, data) => {
        handleAddRelation(event, data.issueId);
    },
    'search-issues-to-relate': (_event, data, target) => {
        searchIssuesToRelate(target.value, data.issueId);
    },
    'select-issue-for-relation': (_event, data) => {
        selectIssueForRelation(data.issueId, data.identifier, data.title);
    },
    'clear-selected-relation': () => {
        clearSelectedRelation();
    },
    'set-description-editor-mode': (_event, data) => {
        setDescriptionEditorMode(data.mode);
    },
    'scroll-to-comments': (event) => {
        event.preventDefault();
        document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
    },
    'navigate-prev-issue': () => navigateAdjacentIssue(-1),
    'navigate-next-issue': () => navigateAdjacentIssue(1),
    'edit': (_event, data) => {
        // Close overflow menu before showing edit modal (CHT-1119)
        const dropdown = document.querySelector('.overflow-menu-dropdown:not(.hidden)');
        if (dropdown) dropdown.classList.add('hidden');
        showEditIssueModal(data.issueId);
    },
    'delete': (_event, data) => {
        // Close overflow menu before showing delete confirmation (CHT-1119)
        const dropdown = document.querySelector('.overflow-menu-dropdown:not(.hidden)');
        if (dropdown) dropdown.classList.add('hidden');
        deleteIssue(data.issueId);
    },
});
