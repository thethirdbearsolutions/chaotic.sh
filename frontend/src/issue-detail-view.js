/**
 * Issue detail view module - Issue detail rendering (CHT-668)
 * Extracted from app.js for testability
 */

import { getCommentDraft, setCommentDraft, getDescriptionDraft, setDescriptionDraft, getDescriptionDraftBase } from './storage.js';
import { getCurrentUser, getCurrentTeam, getCurrentDetailIssue, setCurrentDetailIssue, setCurrentDetailSprints, getCurrentView, getDetailNavContext, getIssues, subscribe } from './state.js';
import { getStoredIssue } from './issue-store.js';
import { api } from './api.js';
import { showToast, showModal, closeModal, showApiError, showMentionWarnings } from './ui.js';
import { navigateTo, saveScrollPosition } from './router.js';
import { getProjects, formatEstimate, isOutOfScale } from './projects.js';
import { getAssigneeById, formatAssigneeName } from './assignees.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeAttr, sanitizeColor, renderAvatar, renderPrincipalBadge } from './utils.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { setupMentionAutocomplete } from './mention-autocomplete.js';
import { showDetailDropdown, isInlineDropdownOpen } from './inline-dropdown.js';
import { registerActions } from './event-delegation.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { showCreateSubIssueModal } from './issue-creation.js';
import { getMembers } from './teams.js';
import { renderAttachmentsSection, setupAttachmentDrop, hydrateAttachments } from './attachments.js';
import { renderTicketGatePanel, renderTicketGateStickyBar, describeTicketGate, gateFocusRitual, isAwaitingApproval } from './ticket-gate.js';
import { viewDocument } from './documents.js';
import { renderRelatedWork, renderTimeline } from './ticket-body.js';
import { showEditIssueModal, deleteIssue } from './issue-edit.js';
import { setupQuoteComment, quoteSelectionIntoComment } from './quote-comment.js';
import { attachRichComposer, focusComposer, isRichComposerBusy, captureComposerFocus } from './rich-composer.js';
// Markdown post-processing (issue-link/mention rendering) lives in rich-text.js
// (CHT-1213) so documents.js can share it without depending on this module.
// Re-exported here too so existing imports of these from issue-detail-view.js
// (this module's own test file, epic-detail-view.js) keep working unchanged.
import { processTextNodes, addIssueLinks, addIssueLinksAndMentions, renderCommentContent, renderDescriptionContent } from './rich-text.js';
export { processTextNodes, addIssueLinks, addIssueLinksAndMentions, renderCommentContent, renderDescriptionContent };

// Module state
let commentSubmitting = false;
let descriptionSubmitting = false;
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
        'ritual_rejected': '⛔',
        'ritual_approved': '✅',
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

// A limbo's type, as the move it held back.
const intentVerb = (v) => (String(v || '').toLowerCase() === 'claim' ? 'start' : 'close');

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
        case 'ritual_rejected': {
            // CHT-1606: the ritual in field_name, the reason in new_value.
            const ritualName = escapeHtml(activity.field_name || 'ritual');
            const reason = activity.new_value
                ? escapeAttr(activity.new_value.substring(0, 200)) + (activity.new_value.length > 200 ? '...' : '')
                : '';
            return reason
                ? `<span class="activity-attestation-link" title="${reason}">Rejected <strong>${ritualName}</strong></span>`
                : `Rejected <strong>${ritualName}</strong>`;
        }
        case 'ritual_approved':
            // The ritual's name is in new_value (ritual_service approve).
            return `Approved <strong>${escapeHtml(activity.new_value || 'a ritual')}</strong>`;
        // Ticket limbo (a claim or close waiting on rituals): new_value is the limbo type.
        case 'intent_opened':
            return `Tried to ${intentVerb(activity.new_value)} it; waiting on rituals`;
        case 'intent_cleared':
            return `No longer waiting on rituals to ${intentVerb(activity.new_value)}`;
        case 'intent_canceled':
            return `Canceled the pending ${intentVerb(activity.new_value)}`;
        case 'lease_expired':
            return 'Claim expired; moved back to <strong>Todo</strong>';
        case 'email_delivery_failed':
            return escapeHtml(activity.new_value || 'An email could not be delivered');
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
 * Load ticket rituals for an issue
 * @param {string} issueId - Issue ID
 */
export async function loadTicketRituals(issueId) {
    // A reload (after approve/reject) that lands once another ticket is
    // open must not paint this ticket's rituals onto it (CHT-2018 review).
    const stillShowing = () => {
        const shown = getCurrentDetailIssue()?.id;
        return !shown || shown === issueId;
    };
    try {
        const status = await api.getTicketRitualsStatus(issueId);
        if (!stillShowing()) return;
        currentTicketRituals = status;
        renderTicketRituals(issueId);
    } catch (e) {
        console.error('Failed to load ticket rituals:', e);
        if (!stillShowing()) return;
        currentTicketRituals = null;
        renderTicketRituals(issueId);
    }
}

/**
 * Pending ticket rituals whose attestation is waiting on a human's approval
 * (CHT-2018): someone attested a REVIEW ritual and nobody approved it yet,
 * so the ticket cannot move until a human does.
 * @param {Array} pendingRituals
 * @returns {Array}
 */
export function ritualsAwaitingApproval(pendingRituals) {
    return (pendingRituals || []).filter(isAwaitingApproval);
}

/**
 * Whether the viewer can pass a human step (approve an attestation, complete
 * a gate): a human team admin (the server refuses agents and non-admins).
 * When the member list is not loaded yet we cannot tell, and show the step
 * rather than bury it again.
 * @returns {boolean}
 */
function canApproveAttestations() {
    const user = getCurrentUser();
    if (!user || user.is_agent) return false;
    const members = getMembers();
    if (!members || members.length === 0) return true;
    const self = members.find(m => m.user_id === user.id);
    // Loaded and not on the list: not a member here, so not an admin.
    return !!self && (self.role === 'admin' || self.role === 'owner');
}

/**
 * Who is looking, for the Attachments strip: an attachment's uploader or
 * a team admin may delete it (the server decides; this only hides the
 * button from everyone else).
 */
export function attachmentViewer(issue) {
    const user = getCurrentUser();
    const project = getProjects().find(p => p.id === issue?.project_id);
    const team = getCurrentTeam();
    const members = getMembers() || [];
    // The server checks the issue's team. Only the loaded members of that
    // same team can answer here; otherwise null (unknown): Delete is
    // offered and a 403 explains.
    if (!project || !team || project.team_id !== team.id || members.length === 0) {
        return { userId: user?.id || null, isAdmin: null };
    }
    const self = members.find(m => m.user_id === user?.id);
    return { userId: user?.id || null, isAdmin: !!self && (self.role === 'admin' || self.role === 'owner') };
}

// Watches the gate panel so the sticky bar shows only once it has scrolled
// out of view (CHT-2020).
let gateObserver = null;
let gatePanelVisible = true;

function updateGateStickyVisibility() {
    const bar = document.getElementById('ticket-gate-sticky');
    if (!bar) return;
    const hasContent = bar.innerHTML.trim() !== '';
    const show = hasContent && !gatePanelVisible;
    bar.classList.toggle('hidden', !show);
    // Sticky section headers sit under the bar, not behind it.
    const view = document.getElementById('issue-detail-view');
    const height = show ? (bar.firstElementChild?.offsetHeight || 0) : 0;
    if (view) view.style.setProperty('--gate-bar-h', `${height}px`);
}

/** Stop watching the gate panel: the ticket it belonged to is going away. */
function disconnectGatePanel() {
    if (gateObserver) { gateObserver.disconnect(); gateObserver = null; }
    gatePanelVisible = true;
    updateGateStickyVisibility();
}

// The bar only sticks where :has() lets the detail view drop its
// non-scrolling scroll containers (style.css); elsewhere it stays hidden.
const canStick = () => typeof CSS === 'undefined' || typeof CSS.supports !== 'function'
    || CSS.supports('selector(:has(*))');

function observeGatePanel() {
    disconnectGatePanel();
    const panel = document.getElementById('ticket-gate');
    if (!panel || typeof IntersectionObserver === 'undefined' || !canStick()) return;
    gateObserver = new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1];
        gatePanelVisible = entry.isIntersecting;
        updateGateStickyVisibility();
    });
    gateObserver.observe(panel);
}

/** Bring the gate panel into view (the sticky bar's and sidebar's links). */
export function scrollToTicketGate() {
    const panel = document.getElementById('ticket-gate');
    if (!panel || panel.classList.contains('hidden')) return;
    panel.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
    const first = panel.querySelector('.ticket-gate-actions .btn-primary');
    first?.focus?.({ preventScroll: true });
}

/**
 * Render what this ticket's rituals are waiting on (CHT-2020): the gate
 * block under the title and the sticky "waiting on you" bar. Replaces the
 * collapsed Ticket Rituals section and the CHT-2018 approval banner.
 * @param {string} issueId - Issue ID
 */
// The ticket whose gate is painted now, so a re-render after the viewer
// acts (approve, sign off, send back) can be told from a first paint.
let paintedGateIssueId = null;

export function renderTicketRituals(issueId) {
    const panel = document.getElementById('ticket-gate');
    const bar = document.getElementById('ticket-gate-sticky');
    const repaint = !!panel && panel.dataset.issueId === issueId && paintedGateIssueId === issueId;
    const active = document.activeElement;
    const focusWasHere = !!panel && !!active && (panel.contains(active) || active === document.body);
    const status = currentTicketRituals;
    const canAct = canApproveAttestations();
    const issue = getCurrentDetailIssue();
    const shown = issue && issue.id === issueId ? issue : null;
    const assignee = shown?.assignee_id ? getAssigneeById(shown.assignee_id) : null;
    const assigneeName = assignee ? formatAssigneeName(assignee) : (shown?.assignee_name || null);

    const fill = (el, html) => {
        if (!el) return;
        el.innerHTML = html;
        el.classList.toggle('hidden', html.trim() === '');
    };
    fill(panel, status ? renderTicketGatePanel(status, issueId, { canAct, assigneeName }) : '');
    if (panel) panel.dataset.issueId = issueId;
    paintedGateIssueId = issueId;
    if (bar) {
        const html = status ? renderTicketGateStickyBar(status, { canAct }) : '';
        bar.innerHTML = html ? `<div class="ticket-gate-sticky-bar">${html}</div>` : '';
        updateGateStickyVisibility();
    }
    if (repaint) {
        // The step the viewer acted on was replaced: say what is next, and
        // put focus back on the block rather than leaving it on <body>.
        const live = document.getElementById('ticket-gate-live');
        if (live) live.textContent = status ? describeTicketGate(status, { canAct, assigneeName }) : '';
        if (focusWasHere && panel && !panel.classList.contains('hidden')) {
            const target = panel.querySelector('.ticket-gate-actions .btn-primary') || panel.querySelector('.ticket-gate');
            target?.focus?.({ preventScroll: true });
        }
    }
}

/** Close the Related work "+ Add" menu, if open. Returns whether it was. */
function closeRelatedAddMenu({ focus = false } = {}) {
    const menu = document.querySelector('#issue-detail-view details.related-add[open]');
    if (!menu) return false;
    menu.open = false;
    if (focus) menu.querySelector('summary')?.focus();
    return true;
}

/**
 * The "+ Add" menu is a <details>: close it on Escape (before the global
 * handler would leave the ticket), on a click outside it, and once a
 * choice is made (PR #527 review I5).
 */
function setupRelatedAddMenu(signal) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && closeRelatedAddMenu({ focus: true })) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, { capture: true, signal });
    document.addEventListener('click', (e) => {
        if (!e.target.closest?.('details.related-add')) closeRelatedAddMenu();
    }, { signal });
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
// Bumped by every navigating viewIssue() call -- not by background
// refreshes (see `refresh` below).
let viewIssueNavigationId = 0;
// How much of an issue's activity the timeline loads (newest first). The
// endpoint defaults to 50, which dropped older events once comments and
// attestations went into one stream (PR #527 review I1).
const ACTIVITY_PAGE = 500;

/**
 * Leaving the detail (the router calls this before every view change)
 * drops any load still in flight, so it can't paint the issue back over
 * the view the user went to (CHT-1899 review I3: Back is pressable while
 * the detail loads, since its history entry is pushed at once).
 */
export function abandonIssueLoad() {
    viewIssueNavigationId++;
}
// Bumped by every viewIssue() call, refresh or navigation: a refresh renders
// only if no later call of either kind started while it was fetching, so two
// overlapping refreshes can never land oldest-last (PR #318 review 1).
let viewIssueRefreshSeq = 0;
// True between compositionstart and compositionend on #new-comment: replacing
// the textarea mid-composition aborts the IME input (PR #318 review 5).
let commentComposing = false;

/**
 * Why a background refresh of the open issue must wait right now, or null.
 *  - 'editor': the inline description editor is open. The refresh is noted
 *    and resolved by the editor's Cancel/Save (CHT-1214); nothing retries.
 *  - 'transient': an inline field dropdown, the related-work menu, an
 *    opened "N updates" run, or the
 *    @mention list is open, or an IME composition is in progress in the
 *    comment box. A re-render would orphan the dropdown on a replaced row
 *    (the CHT-1290 bug class), wipe the mention list, or abort the IME
 *    input. These close on their own, so the caller retries shortly.
 * @returns {'editor'|'transient'|null}
 */
export function detailRefreshBlocker() {
    if (document.querySelector('.description-inline-editor')) return 'editor';
    if (isInlineDropdownOpen()) return 'transient';
    const detailView = document.getElementById('issue-detail-view');
    if (detailView?.querySelector('details.related-add[open]')) return 'transient';
    // An opened "N updates" run would re-render closed (CHT-2093).
    if (detailView?.querySelector('.timeline-run details[open]')) return 'transient';
    const mentions = document.getElementById('mention-suggestions');
    if (mentions && !mentions.classList.contains('hidden')) return 'transient';
    if (commentComposing) return 'transient';
    if (isRichComposerBusy()) return 'transient';
    return null;
}

function deferRefresh(blocker) {
    noteSkippedDetailRefresh();
    return blocker === 'editor' ? 'deferred' : 'retry';
}

/**
 * True while issueId's detail is the one on screen.
 * @param {string} issueId
 */
function isShowingIssueDetail(issueId) {
    const el = document.getElementById('issue-detail-view');
    return !!el && !el.classList.contains('hidden') && getCurrentDetailIssue()?.id === issueId;
}

/**
 * The row a list already loaded for this issue, if any, newest source
 * first: the Issues view's list (it carries in-flight edits), the issue
 * store (kept current by /ws), then the list the user opened it from,
 * which is a snapshot (CHT-1899).
 */
function findLoadedIssue(issueId) {
    return getIssues().find(i => i.id === issueId)
        || getStoredIssue(issueId)
        || getDetailNavContext().find(i => i.id === issueId)
        || null;
}

/**
 * Paint the issue from the row a list already loaded, at once, while the
 * full detail (description, comments, activity) loads (CHT-1899). VISION.md:
 * opening an issue from a list shows something within 100 ms.
 *
 * Deliberately inert: its property rows have no data-field or action and
 * there are no editors, so no shortcut or dropdown can act on a partial
 * row. It does become the current detail issue, so j/k and
 * the arrows move on from this issue rather than the one before it.
 */
function paintDetailFromRow(row) {
    const detailView = document.getElementById('issue-detail-view');
    const content = detailView?.querySelector('#issue-detail-content');
    if (!content) return;
    disconnectGatePanel();
    paintedGateIssueId = null;
    setCurrentDetailIssue(row);
    const nav = computeDetailNav(row.id);
    detailNavPrevId = nav.prevIssue ? nav.prevIssue.id : null;
    detailNavNextId = nav.nextIssue ? nav.nextIssue.id : null;
    const project = getProjects().find(p => p.id === row.project_id);
    const assignee = row.assignee_id ? getAssigneeById(row.assignee_id) : null;
    const backView = getCurrentView() || 'my-issues';

    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    detailView.classList.remove('hidden');
    content.innerHTML = `
            <div class="detail-layout detail-from-row" aria-busy="true">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${escapeAttr(backView)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${renderDetailNavArrows(nav)}
                        <span class="issue-detail-breadcrumb">${project ? escapeHtml(project.name) : 'Project'} › ${escapeHtml(row.identifier)}</span>
                    </div>
                    <h1 class="issue-detail-title">${escapeHtml(row.title)}</h1>
                    <div class="issue-detail-description">
                        <div class="skeleton skeleton-title"></div>
                        <div class="skeleton skeleton-title" style="width: 70%"></div>
                    </div>
                </div>
                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>
                        <div class="property-row"><span class="property-label">Status</span><span class="property-value">${getStatusIcon(row.status)}<span>${formatStatus(row.status)}</span></span></div>
                        <div class="property-row"><span class="property-label">Priority</span><span class="property-value">${getPriorityIcon(row.priority)}<span>${formatPriority(row.priority)}</span></span></div>
                        <div class="property-row"><span class="property-label">Assignee</span><span class="property-value">${assignee ? escapeHtml(formatAssigneeName(assignee)) : 'Unassigned'}</span></div>
                    </div>
                </aside>
            </div>`;
}

/**
 * @param {string} issueId
 * @param {boolean} [pushHistory=true]
 * @param {{refresh?: boolean}} [options] refresh: a background re-render of
 *   the issue already on screen, triggered by a websocket event
 *   (ws-handlers.js). Remote refreshes became live with CHT-1237, which
 *   exposed two things this guards against:
 *   - Stale responses. Only navigating calls bump viewIssueNavigationId, so
 *     a refresh never cancels a navigation the user already started, and a
 *     refresh whose fetch resolves after a newer navigation, or after the
 *     user left the detail, or after they opened the description editor,
 *     renders nothing instead of yanking them back to this issue.
 *   - Focus loss. Typing a comment while a teammate or agent comments
 *     would otherwise lose the caret mid-word: the text survives via the
 *     CHT-1041 draft, but the textarea is replaced. Focus, selection and
 *     the page scroll position are restored after the re-render.
 *   - Transient UI. See detailRefreshBlocker(); checked before fetching and
 *     again before rendering.
 * @returns {Promise<'rendered'|'dropped'|'deferred'|'retry'|'failed'>} what
 *   happened; ws-handlers.js retries a refresh that returns 'retry'.
 */
export async function viewIssue(issueId, pushHistory = true, { refresh = false } = {}) {
    const navigationId = refresh ? viewIssueNavigationId : ++viewIssueNavigationId;
    const refreshSeq = ++viewIssueRefreshSeq;
    if (refresh) {
        const blocker = detailRefreshBlocker();
        if (blocker) return deferRefresh(blocker);
    }
    try {
        // Record the list's scroll position before we replace it with detail
        // content, so Back can restore it (CHT-1211 item 1).
        if (pushHistory) saveScrollPosition();

        // Paint what a list already loaded at once (CHT-1899), and take the
        // history entry now, so Back works while the rest loads.
        let historyPushed = false;
        if (!refresh) {
            const row = findLoadedIssue(issueId);
            if (row) {
                paintDetailFromRow(row);
                if (pushHistory) {
                    history.pushState({ issueId, view: getCurrentView() }, '', `/issue/${row.identifier}`);
                    historyPushed = true;
                }
            }
        }
        // CHT-1224: comments used to be the one fetch in this Promise.all with
        // no per-call .catch (unlike ritual status/sprints below), so a single
        // comments-endpoint failure discarded 4 successful fetches and failed
        // the whole detail view. Isolate it like documents.js's viewDocument()
        // does, and surface a small notice in the comments section instead.
        let commentsLoadFailed = false;
        const [issue, comments, activities, subIssues, relations, ritualStatus, attachments, linkedDocuments] = await Promise.all([
            api.getIssue(issueId),
            api.getComments(issueId).catch(e => { console.error('Failed to load comments:', e); commentsLoadFailed = true; return []; }),
            api.getActivities(issueId, 0, ACTIVITY_PAGE),
            api.getSubIssues(issueId),
            api.getRelations(issueId),
            api.getTicketRitualsStatus(issueId).catch(() => ({ pending_rituals: [], completed_rituals: [] })),
            // A failed list shows a notice in its section, not a failed page.
            api.getAttachments(issueId).catch(e => { console.error('Failed to load attachments:', e); return null; }),
            // Linked documents (CHT-2121). A failure shows a note under
            // Related work rather than failing the page.
            api.getIssueDocuments(issueId).catch(e => { console.error('Failed to load linked documents:', e); return null; }),
        ]);

        // Comments in time order. Attestations reach the timeline as
        // activity events (CHT-2021), so their notes are not merged in here.
        const allComments = [...comments].sort((a, b) =>
            new Date(a.created_at) - new Date(b.created_at)
        );

        // Fetch parent issue and sprints in parallel (both depend on issue data)
        const secondaryFetches = [
            issue.parent_id ? api.getIssue(issue.parent_id) : Promise.resolve(null),
            api.getSprints(issue.project_id).catch(e => { console.error('Failed to load sprints:', e); return []; }),
        ];
        const [parentIssue, projectSprints] = await Promise.all(secondaryFetches);

        // Last await above: from here to the end of the try, rendering is
        // synchronous, so these checks cannot go stale before it finishes.
        if (navigationId !== viewIssueNavigationId) return 'dropped';
        let restoreFocus = null;
        // The rich editor has no id; where its caret was (CHT-2028).
        let restoreComposer = null;
        let restoreScrollY = null;
        if (refresh) {
            if (refreshSeq !== viewIssueRefreshSeq) return 'dropped';
            if (!isShowingIssueDetail(issueId)) return 'dropped';
            const blocker = detailRefreshBlocker();
            if (blocker) return deferRefresh(blocker);
            restoreScrollY = window.scrollY;
            const active = document.activeElement;
            restoreComposer = captureComposerFocus('new-comment');
            if (active?.id && document.getElementById('issue-detail-view').contains(active)) {
                restoreFocus = {
                    id: active.id,
                    start: active.selectionStart,
                    end: active.selectionEnd,
                };
            }
        }

        // Store ritual status for renderTicketRituals (avoids duplicate API call)
        currentTicketRituals = ritualStatus;

        // Update URL
        if (pushHistory && !historyPushed) {
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
                    <div id="ticket-gate-sticky" class="ticket-gate-sticky hidden" role="region" aria-label="Rituals waiting on you"></div>
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${escapeAttr(backView)}" title="Back" aria-label="Back">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        </button>
                        ${renderDetailNavArrows(nav)}
                        <span class="issue-detail-breadcrumb">${project ? escapeHtml(project.name) : 'Project'} › ${escapeHtml(issue.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${escapeHtml(issue.title)}</h1>
                    <div class="issue-state" role="group" aria-label="Status, assignee and priority">
                    <div class="property-row" data-field="status" data-action="show-detail-dropdown" data-dropdown-type="status" data-issue-id="${escapeAttr(issue.id)}">
                        <span class="property-label sr-only" id="issue-state-status-label">Status</span>
                        <button class="property-value" id="issue-state-status" aria-labelledby="issue-state-status-label issue-state-status">
                            ${getStatusIcon(issue.status)}
                            <span>${formatStatus(issue.status)}</span>
                        </button>
                    </div>
                    <div class="property-row" data-field="assignee" data-action="show-detail-dropdown" data-dropdown-type="assignee" data-issue-id="${escapeAttr(issue.id)}">
                        <span class="property-label sr-only" id="issue-state-assignee-label">Assignee</span>
                        <button class="property-value" id="issue-state-assignee" aria-labelledby="issue-state-assignee-label issue-state-assignee">
                            ${assigneeName ? `${renderAvatar(assignee, 'avatar-small')}<span>${escapeHtml(assigneeName)}</span>` : `<span class="text-muted">Unassigned</span>`}
                        </button>
                    </div>
                    <div class="property-row" data-field="priority" data-action="show-detail-dropdown" data-dropdown-type="priority" data-issue-id="${escapeAttr(issue.id)}">
                        <span class="property-label sr-only" id="issue-state-priority-label">Priority</span>
                        <button class="property-value" id="issue-state-priority" aria-labelledby="issue-state-priority-label issue-state-priority">
                            ${getPriorityIcon(issue.priority)}
                            <span>${formatPriority(issue.priority)}</span>
                        </button>
                    </div>
                    </div>

                    ${parentIssue ? `
                    <div class="parent-issue-link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        Sub-issue of <a href="/issue/${encodeURIComponent(parentIssue.identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(parentIssue.id)}" data-identifier="${escapeAttr(parentIssue.identifier)}">${parentIssue.identifier}: ${escapeHtml(parentIssue.title)}</a>
                    </div>
                    ` : ''}

                    <div id="ticket-gate" class="ticket-gate-slot hidden"></div>
                    <div id="ticket-gate-live" class="sr-only" role="status" aria-live="polite"></div>

                    <div class="issue-detail-description">
                        <div class="section-header description-edit-row">
                            <button type="button" class="description-edit-btn${getDescriptionDraft(issue.id) ? ' has-draft' : ''}" data-action="edit-description" data-issue-id="${escapeAttr(issue.id)}">
                                ${getDescriptionDraft(issue.id)
                                    ? '<span class="draft-indicator" title="Unsaved draft">Draft</span><span class="sr-only">: edit description (unsaved draft)</span>'
                                    : 'Edit<span class="sr-only"> description</span>'}
                            </button>
                        </div>
                        <div class="description-content markdown-body ${!issue.description ? 'empty' : ''}" data-action="edit-description" data-issue-id="${escapeAttr(issue.id)}">
                            ${issue.description ? renderDescriptionContent(issue.description) : '<span class="add-description-link">Add description...</span>'}
                        </div>
                    </div>

                    ${renderAttachmentsSection(issue.id, attachments, attachmentViewer(issue))}

                    ${renderRelatedWork(issue, subIssues, relations, { formatEstimate, documents: linkedDocuments })}

                    ${renderTimeline({
                        comments: allComments, activities, ritualStatus, commentsLoadFailed, issueId: issue.id,
                        gateRitualName: gateFocusRitual(ritualStatus, { canAct: canApproveAttestations() })?.name || null,
                        activitiesTruncated: activities.length >= ACTIVITY_PAGE,
                    }, {
                        formatText: formatActivityText,
                        formatActor: formatActivityActor,
                    })}

                    <form class="comment-form comment-form-sticky" data-action="save-comment" data-issue-id="${escapeAttr(issue.id)}">
                        <div class="comment-box">
                            <textarea id="new-comment" placeholder="Add a comment…" aria-label="Add a comment" rows="1"></textarea>
                            <div id="mention-suggestions" class="mention-suggestions hidden"></div>
                            <div class="comment-box-foot">
                                <span class="toolbar-spacer"></span>
                                <button type="submit" class="icon-btn comment-submit-btn" aria-label="Comment" title="Comment (${/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘' : 'Ctrl'}+Enter)">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <aside class="detail-sidebar">
                    <div class="detail-sidebar-inner">
                    <div class="sidebar-section">
                        <h4>Details</h4>

                        <div class="property-row" data-field="type" data-action="show-detail-dropdown" data-dropdown-type="type" data-issue-id="${escapeAttr(issue.id)}">
                            <span class="property-label">Type</span>
                            <button class="property-value">
                                <span class="issue-type-badge type-${issue.issue_type || 'task'}">${formatIssueType(issue.issue_type)}</span>
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
                            <span class="property-value-static">${issue.creator ? renderAvatar(issue.creator, 'avatar-small') : ''}<span>${escapeHtml(issue.creator_name || 'Unknown')}</span> ${renderPrincipalBadge(issue.creator)}</span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(issue.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div class="sidebar-section sidebar-actions toolbar" aria-label="Issue actions">
                        <button class="icon-btn" data-action="edit" data-issue-id="${escapeAttr(issue.id)}" title="Edit all fields" aria-label="Edit all fields">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        </button>
                        <label class="icon-btn" title="Attach files">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                            <input type="file" multiple class="sr-only" data-action="pick-attachments" data-issue-id="${escapeAttr(issue.id)}" aria-label="Attach files">
                        </label>
                        <button class="icon-btn" data-action="show-issue-description-revisions" data-issue-id="${escapeAttr(issue.id)}" title="Description history" aria-label="Description history">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </button>
                        <button class="icon-btn icon-btn-danger" data-action="delete" data-issue-id="${escapeAttr(issue.id)}" title="Delete issue" aria-label="Delete issue">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                    </div>
                </aside>
            </div>
        `;

        // Clean up previous detail view listeners (CHT-1102)
        if (detailAbortController) detailAbortController.abort();
        detailAbortController = new AbortController();
        const { signal: detailSignal } = detailAbortController;

        // Render ticket rituals (data already fetched in Promise.all above)
        // Watch first, so the previous ticket's scroll state can't show
        // this ticket's bar over its own panel.
        observeGatePanel();
        renderTicketRituals(issue.id);
        setupMentionAutocomplete('new-comment', 'mention-suggestions', { projectId: issue.project_id });
        setupQuoteComment({ signal: detailSignal });
        setupRelatedAddMenu(detailSignal);
        setupAttachmentDrop(detailView.querySelector('.detail-main'), issue.id, detailSignal);
        hydrateAttachments(detailView);

        // Cmd/Ctrl+Enter to submit comment + draft persistence (CHT-1041)
        const commentTextarea = document.getElementById('new-comment');
        commentComposing = false;
        if (commentTextarea) {
            commentTextarea.addEventListener('compositionstart', () => { commentComposing = true; }, { signal: detailSignal });
            commentTextarea.addEventListener('compositionend', () => { commentComposing = false; }, { signal: detailSignal });
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
            // The rich editor over the textarea (CHT-2028), after the draft
            // is restored so it opens with it.
            attachRichComposer('new-comment', {
                signal: detailSignal,
                mentionContext: { projectId: issue.project_id },
                placeholder: 'Add a comment…',
                restore: restoreComposer,
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
            // An open inline field dropdown (opened here via s/p/a/l/e/t) owns
            // the keyboard — yield so prev/next nav or a metadata shortcut can't
            // fire underneath it and leave the dropdown floating over a
            // different issue, whose baked-in issue-id a later Enter would then
            // wrongly update (CHT-1290 review finding 1).
            if (isInlineDropdownOpen()) return;
            if (e.key === 'ArrowLeft' && detailNavPrevId) {
                e.preventDefault();
                viewIssue(detailNavPrevId);
            } else if (e.key === 'ArrowRight' && detailNavNextId) {
                e.preventDefault();
                viewIssue(detailNavNextId);
            } else if (e.key === 'c') {
                e.preventDefault();
                e.stopImmediatePropagation();
                focusComposer('new-comment');
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

        if (restoreFocus) {
            const el = document.getElementById(restoreFocus.id);
            if (el) {
                el.focus({ preventScroll: true });
                if (typeof restoreFocus.start === 'number' && typeof el.setSelectionRange === 'function') {
                    try {
                        el.setSelectionRange(restoreFocus.start, restoreFocus.end);
                    } catch {
                        // Input types without selection support (e.g. checkbox).
                    }
                }
            }
        }
        // The innerHTML swap can collapse and regrow the page; put the
        // reader back where they were.
        if (restoreScrollY !== null) {
            window.scrollTo(0, restoreScrollY);
        }
        return 'rendered';
    } catch (e) {
        if (refresh) {
            // A failed background refresh leaves the current render in
            // place; an error toast for an action the user never took is
            // noise (and an issue:deleted handler covers the 404 case).
            console.error('Failed to refresh issue detail:', e);
        } else {
            // A load the user already left (opened another issue, went Back)
            // says nothing (CHT-1899 review M4).
            if (navigationId !== viewIssueNavigationId) return 'dropped';
            showApiError('load issue', e);
            // The row painted at once must not sit there loading forever.
            const fromRow = document.querySelector('#issue-detail-content .detail-from-row .issue-detail-description');
            if (fromRow) {
                const gone = e?.status === 403 || e?.status === 404;
                fromRow.innerHTML = renderEmptyState(gone ? {
                    icon: EMPTY_ICONS.issues,
                    heading: 'Issue not found',
                    description: 'It may have been deleted, or you no longer have access to it',
                    variant: 'error',
                } : {
                    icon: EMPTY_ICONS.issues,
                    heading: 'Failed to load issue',
                    description: 'Check your connection and try again',
                    cta: { label: 'Retry', action: 'retry-issue-comments', data: { 'issue-id': issueId } },
                    variant: 'error',
                });
            }
        }
        return 'failed';
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
        const created = await api.createComment(issueId, content);
        // Toasts before the refresh, as on documents, so a slow refresh
        // does not hold back the @mention warnings (CHT-1743).
        showToast('Comment added!', 'success');
        // @handles that reached nobody (CHT-1743)
        showMentionWarnings(created);
        await viewIssue(issueId);
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
            draftWarning.textContent = 'This description has changed since your draft — review before saving. If you overwrite it, the current version stays recoverable via Description history.';
            draftWarning.classList.remove('hidden');
        }
    }
    setupMentionAutocomplete('edit-description', 'edit-description-mention-suggestions', { projectId: issue.project_id });
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
    // Saving again proceeds as an explicit overwrite — safe because every
    // description edit is snapshotted into the revision history (CHT-1243),
    // so the overwritten version stays recoverable via Description history.
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
                warnEl.textContent = 'This description was changed by someone else while you were editing — review your text, then Save again to overwrite their version. It will stay recoverable via Description history.';
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

/**
 * A plain click opens the document in the app; a modified click keeps the
 * link's own new-tab behaviour.
 */
function openDocumentLink(event, documentId) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button === 1) return;
    event.preventDefault();
    viewDocument(documentId);
}

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
    'open-gate-document': (event, data) => openDocumentLink(event, data.documentId),
    'open-linked-document': (event, data) => openDocumentLink(event, data.documentId),
    'scroll-to-ticket-gate': () => {
        scrollToTicketGate();
    },
    'save-comment': (event, data) => {
        handleAddComment(event, data.issueId);
    },
    'show-add-relation-modal': (_event, data) => {
        closeRelatedAddMenu();
        showAddRelationModal(data.issueId);
    },
    'remove-relation': (_event, data) => {
        deleteRelation(data.issueId, data.relationId);
    },
    'show-create-sub-issue-modal': (_event, data) => {
        closeRelatedAddMenu();
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
    'edit': (_event, data) => showEditIssueModal(data.issueId),
    'delete': (_event, data) => deleteIssue(data.issueId),
});
