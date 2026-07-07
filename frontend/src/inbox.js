/**
 * Inbox module (CHT-1250)
 *
 * Unified 'awaiting you' surface: gate-pending rituals, review requests,
 * assignments, and @mentions. Modeled on gate-approvals.js's list-view
 * conventions (skeleton, renderEmptyState, request-id guard) and on
 * documents.js/issue-list.js's deep-link actions.
 */
import { api } from './api.js';
import { showApiError } from './ui.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { registerActions } from './event-delegation.js';
import {
    getCurrentTeam, getInboxEntries, setInboxEntries,
    getInboxUnreadCount, setInboxUnreadCount,
} from './state.js';
import { viewIssue } from './issue-detail-view.js';
import { viewDocument } from './documents.js';
import { formatRelativeTime } from './gate-approvals.js';

const KIND_LABELS = {
    gate_pending: 'Gate pending',
    mention: 'Mention',
    assignment: 'Assignment',
    review_requested: 'Review requested',
};

// Only entries of these kinds are read-only within a fixed request race
// window; see loadInboxRequestId below (same doctrine as gate-approvals.js's
// loadGateApprovalsRequestId / teams.js's loaders).
let loadInboxRequestId = 0;
let showUnreadOnly = false;

/**
 * Refresh the sidebar unread-count badge. Safe to call from any view.
 */
export async function refreshInboxUnreadCount() {
    const team = getCurrentTeam();
    if (!team) return;
    try {
        const result = await api.getInboxUnreadCount(team.id);
        setInboxUnreadCount(result.unread_count || 0);
    } catch (e) {
        console.error('Failed to refresh inbox unread count:', e);
    }
    renderInboxBadge();
}

/**
 * Paint the sidebar badge from current state (no fetch).
 */
export function renderInboxBadge() {
    const badge = document.getElementById('inbox-unread-badge');
    if (!badge) return;
    const count = getInboxUnreadCount();
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.toggle('hidden', count === 0);
}

/**
 * Load and render the inbox list view.
 */
export async function loadInbox() {
    const team = getCurrentTeam();
    if (!team) return;

    const container = document.getElementById('inbox-list');
    if (!container) return;

    const requestId = ++loadInboxRequestId;

    container.innerHTML = Array(3).fill(0).map(() => `
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                </div>
            </div>
        </div>
    `).join('');

    try {
        const entries = await api.getInbox(team.id, { unread: showUnreadOnly, limit: 100 });
        if (requestId !== loadInboxRequestId) return; // a newer loadInbox() has since started

        setInboxEntries(entries || []);
        renderInbox();
    } catch (e) {
        if (requestId !== loadInboxRequestId) return;
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.inbox,
            heading: 'Failed to load inbox',
            description: 'Check your connection and try again',
            cta: { label: 'Retry', action: 'retry-load-inbox' },
            variant: 'error',
        });
        showApiError('load inbox', e);
    }

    refreshInboxUnreadCount();
}

/**
 * Toggle the unread-only filter and reload.
 */
export function toggleInboxUnreadFilter() {
    showUnreadOnly = !showUnreadOnly;
    const btn = document.getElementById('inbox-unread-toggle');
    if (btn) btn.classList.toggle('active', showUnreadOnly);
    loadInbox();
}

function renderInboxRow(entry) {
    const isUnread = !entry.read_at;
    const kindLabel = KIND_LABELS[entry.kind] || entry.kind;
    const sourceRef = entry.issue_identifier || entry.document_title || '';
    const dataAttrs = [
        `data-entry-id="${escapeAttr(entry.id)}"`,
        entry.issue_id ? `data-issue-id="${escapeAttr(entry.issue_id)}"` : '',
        entry.document_id ? `data-document-id="${escapeAttr(entry.document_id)}"` : '',
    ].filter(Boolean).join(' ');

    return `
        <div class="inbox-row list-item${isUnread ? ' inbox-row-unread' : ''}"
             data-action="open-inbox-entry" ${dataAttrs} role="button" tabindex="0">
            <div class="inbox-row-main">
                <div class="inbox-row-header">
                    <span class="badge badge-inbox-${escapeAttr(entry.kind)}">${escapeHtml(kindLabel)}</span>
                    ${sourceRef ? `<span class="inbox-row-source">${escapeHtml(sourceRef)}</span>` : ''}
                    ${isUnread ? '<span class="inbox-row-unread-dot" title="Unread"></span>' : ''}
                </div>
                <div class="inbox-row-title">${escapeHtml(entry.title)}</div>
                ${entry.body ? `<div class="inbox-row-body">${escapeHtml(entry.body)}</div>` : ''}
            </div>
            <div class="inbox-row-meta">${escapeHtml(formatRelativeTime(entry.created_at))}</div>
        </div>
    `;
}

/**
 * Render the inbox list from current state.
 */
export function renderInbox() {
    const container = document.getElementById('inbox-list');
    if (!container) return;

    const entries = getInboxEntries();

    if (entries.length === 0) {
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.inbox,
            heading: showUnreadOnly ? 'No unread items' : 'Inbox zero',
            description: showUnreadOnly
                ? 'Nothing unread right now.'
                : 'Gates, mentions, assignments, and review requests will show up here.',
        });
        return;
    }

    container.innerHTML = entries.map(entry => renderInboxRow(entry)).join('');
}

/**
 * Mark a single entry read -- both server-side and in local state/DOM,
 * so the badge/list stay correct without a full reload.
 */
async function markEntryRead(entryId) {
    const entries = getInboxEntries();
    const entry = entries.find(e => e.id === entryId);
    if (!entry || entry.read_at) return; // already read (or unknown) -- no-op

    try {
        await api.markInboxRead(entryId);
        entry.read_at = new Date().toISOString();
        setInboxEntries([...entries]);
        setInboxUnreadCount(Math.max(0, getInboxUnreadCount() - 1));
        renderInboxBadge();
        // Only re-render the row itself when visible, to avoid clobbering
        // keyboard-selection state on a full re-render. entryId is always
        // a server-generated UUID (no quotes/brackets possible), so no
        // CSS.escape is needed for this attribute selector.
        const row = document.querySelector(`.inbox-row[data-entry-id="${entryId}"]`);
        if (row) row.classList.remove('inbox-row-unread');
    } catch (e) {
        console.error('Failed to mark inbox entry read:', e);
    }
}

/**
 * Mark every unread entry as read (explicit "mark all read" action).
 */
export async function markAllInboxRead() {
    const team = getCurrentTeam();
    if (!team) return;
    try {
        await api.markAllInboxRead(team.id);
        const now = new Date().toISOString();
        setInboxEntries(getInboxEntries().map(e => ({ ...e, read_at: e.read_at || now })));
        setInboxUnreadCount(0);
        renderInboxBadge();
        renderInbox();
    } catch (e) {
        showApiError('mark all inbox entries read', e);
    }
}

/**
 * Open an inbox row: mark it read, then deep-link to its source.
 */
function openInboxEntry(data) {
    if (data.entryId) markEntryRead(data.entryId);
    if (data.issueId) {
        viewIssue(data.issueId);
    } else if (data.documentId) {
        viewDocument(data.documentId);
    }
}

/**
 * Open an inbox entry given its rendered DOM row (keyboard Enter path --
 * see createInboxNavigationHandler in keyboard.js).
 */
export function openInboxEntryElement(rowEl) {
    if (!rowEl) return;
    const { entryId, issueId, documentId } = rowEl.dataset;
    openInboxEntry({ entryId, issueId, documentId });
}

registerActions({
    'open-inbox-entry': (event, data) => {
        event.preventDefault();
        openInboxEntry(data);
    },
    'toggle-inbox-unread-filter': () => toggleInboxUnreadFilter(),
    'mark-all-inbox-read': () => markAllInboxRead(),
    'retry-load-inbox': () => loadInbox(),
});
