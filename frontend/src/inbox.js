/**
 * Inbox module (CHT-1250)
 *
 * Unified 'awaiting you' surface: gate-pending rituals, review requests,
 * assignments, and @mentions. Modeled on gate-approvals.js's list-view
 * conventions (skeleton, renderEmptyState, request-id guard) and on
 * documents.js/issue-list.js's deep-link actions.
 */
import { api } from './api.js';
import { showApiError, isModalOpen } from './ui.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { registerActions } from './event-delegation.js';
import {
    getCurrentTeam, getInboxEntries, setInboxEntries,
    getInboxUnreadCount, setInboxUnreadCount,
    setSelectedInboxIndex,
} from './state.js';
import { viewIssue } from './issue-detail-view.js';
import { viewDocument } from './documents.js';
import { formatRelativeTime } from './gate-approvals.js';

const KIND_LABELS = {
    gate_pending: 'Gate pending',
    mention: 'Mention',
    assignment: 'Assignment',
    review_requested: 'Review requested',
    agent_status: 'Agent',
    gate_rejected: 'Rejected',
    push_device_added: 'New device',
    children_closed: 'Nothing left open',
};

// Only entries of these kinds are read-only within a fixed request race
// window; see loadInboxRequestId below (same doctrine as gate-approvals.js's
// loadGateApprovalsRequestId / teams.js's loaders).
let loadInboxRequestId = 0;
let showUnreadOnly = false;
// The single currently-expanded entry id (Gmail-style one-open-at-a-time,
// CHT-1320). null = all collapsed. Expanding a second row collapses the first.
let expandedEntryId = null;
// An intentional load (view entry, filter toggle, retry) still waiting for its
// fetch. A background refresh that supersedes it inherits it, so the user's
// load still resets the view and moves focus (CHT-1320).
let pendingLoadIntent = null;
// Entries whose "Reassign back" PATCH is in flight: a second press is ignored
// rather than sending a second PATCH (and a second notification).
const reassignInFlight = new Set();

// What this client has done locally that a fetch may not show yet (CHT-1514).
// A fetch that was already in flight when the user archived or read an entry
// returns the server's state from before that, and the server's echo of the
// action is skipped as already applied, so nothing would correct it. These
// overlays are laid over every fetch result until a fetch that started after
// the server confirmed the action (by answering the request or by sending its
// event) comes back: that fetch, and every later one, is taken as the
// server's answer.
//
// id -> request id of the last load started before the server confirmed the
// action, or null while unconfirmed. A load whose request id is greater
// started after confirmation.
const archivedLocally = new Map();
// id -> { readAt, confirmedAfter } (confirmedAfter as above)
const readLocally = new Map();

function confirmArchived(entryId) {
    if (archivedLocally.get(entryId) === null) archivedLocally.set(entryId, loadInboxRequestId);
}

function confirmRead(entryId) {
    const read = readLocally.get(entryId);
    if (read && read.confirmedAfter === null) read.confirmedAfter = loadInboxRequestId;
}

/** Forget every local overlay (test isolation; module state outlives a test). */
export function resetInboxLocalState() {
    archivedLocally.clear();
    readLocally.clear();
}

/**
 * Lay local archives and reads over a fetch result (CHT-1514). With the
 * unread-only filter on, an entry read here is dropped too (the server
 * would not have returned it), unless it is the one open row.
 */
function overlayLocalState(entries) {
    return entries
        .filter(e => !archivedLocally.has(e.id))
        .map(e => {
            const read = readLocally.get(e.id);
            return (read && !e.read_at) ? { ...e, read_at: read.readAt } : e;
        })
        .filter(e => !(showUnreadOnly && readLocally.has(e.id) && e.id !== expandedEntryId));
}

/**
 * Forget overlays the fetch with this request id already reflects: it
 * started after the server confirmed them.
 */
function pruneLocalState(requestId) {
    for (const [id, confirmedAfter] of archivedLocally) {
        if (confirmedAfter !== null && requestId > confirmedAfter) archivedLocally.delete(id);
    }
    for (const [id, read] of readLocally) {
        if (read.confirmedAfter !== null && requestId > read.confirmedAfter) readLocally.delete(id);
    }
}

/**
 * Record what a websocket inbox event tells us the server has done (call it
 * for every inbox event addressed to this user, before deciding whether to
 * reload). An `archived` event confirms our own archive, and for an entry
 * archived in another tab it keeps the entry hidden even where the list
 * would otherwise hold on to it (the open row under the unread-only
 * filter). A `read` event confirms our own read (CHT-1514).
 */
export function recordInboxEvent(type, data) {
    if (!data?.id) return;
    if (type === 'archived') {
        if (!archivedLocally.has(data.id)) archivedLocally.set(data.id, null);
        confirmArchived(data.id);
    } else if (type === 'read') {
        confirmRead(data.id);
    }
}

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
    const headerCount = document.getElementById('inbox-header-count');
    if (headerCount) headerCount.textContent = count > 0 ? `${count} unread` : '';
}

/**
 * Load and render the inbox list view.
 *
 * An intentional load (the default: view entry, team switch, unread-filter
 * toggle, retry) shows the skeleton and starts collapsed. A `background`
 * refresh (websocket event, reconnect) swaps the data in under the reader
 * instead: no skeleton, and the expanded row, selection, focus and scroll
 * all survive it (CHT-1320; PR #260 review finding 1). A failed background
 * refresh leaves the current list on screen.
 */
export async function loadInbox({ focusFirst = false, background = false } = {}) {
    const team = getCurrentTeam();
    if (!team) return;

    const container = document.getElementById('inbox-list');
    if (!container) return;

    const requestId = ++loadInboxRequestId;

    if (!background) {
        pendingLoadIntent = { focusFirst: focusFirst || !!pendingLoadIntent?.focusFirst };
        // A fresh load starts collapsed -- otherwise a stale expandedEntryId
        // could re-expand a matching row with no user action (PR #260 review).
        expandedEntryId = null;
        renderInboxSkeleton(container);
    }

    try {
        const fetched = await api.getInbox(team.id, { unread: showUnreadOnly, limit: 100 });
        if (requestId !== loadInboxRequestId) return; // a newer loadInbox() has since started
        // What was archived when this fetch started, before pruning: an open
        // row archived elsewhere must not be held on to (see
        // applyBackgroundRefresh). Then drop what this fetch already
        // reflects, and lay the rest over it.
        const archivedIds = new Set(archivedLocally.keys());
        pruneLocalState(requestId);
        const entries = overlayLocalState(fetched || []);

        const intent = pendingLoadIntent;
        pendingLoadIntent = null;
        if (!intent) {
            applyBackgroundRefresh(entries, archivedIds);
        } else {
            setInboxEntries(entries);
            renderInbox();
            // CHT-1250 UX: keyboard nav "didn't kick in right away" because
            // opening the inbox from the sidebar left focus on the nav link,
            // and the list handler yields while a .sidebar-nav link is
            // focused. Move focus into the list and pre-select the first row
            // so j/k/Enter work on the very first keypress -- Gmail-style.
            //
            // ONLY on an intentional view-entry (focusFirst), and never while
            // a modal is open: stealing focus onto a background row there
            // would hijack the user's keystrokes (PR #252 review finding 1).
            if (intent.focusFirst && !isModalOpen()) focusFirstInboxRow();
        }
    } catch (e) {
        if (requestId !== loadInboxRequestId) return;
        if (!pendingLoadIntent) {
            // Background refresh: keep what's on screen; the next event or
            // reconnect tries again.
            console.error('Failed to refresh inbox:', e);
        } else {
            pendingLoadIntent = null;
            container.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.inbox,
                heading: 'Failed to load inbox',
                description: 'Check your connection and try again',
                cta: { label: 'Retry', action: 'retry-load-inbox' },
                variant: 'error',
            });
            showApiError('load inbox', e);
        }
    }

    refreshInboxUnreadCount();
}

function renderInboxSkeleton(container) {
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
}

function inboxRowById(entryId) {
    if (!entryId) return null;
    return [...document.querySelectorAll('#inbox-list .inbox-row')]
        .find(r => r.dataset.entryId === entryId) || null;
}

function rowToggle(rowEl) {
    return rowEl?.querySelector('.inbox-row-toggle') || rowEl || null;
}

/**
 * Where focus is inside the list, by entry id and control, so it can be put
 * back on the equivalent element after the rows are rebuilt.
 */
function describeListFocus() {
    const active = document.activeElement;
    const row = active?.closest?.('#inbox-list .inbox-row');
    if (!row) return null;
    return {
        entryId: row.dataset.entryId,
        inPanel: !!active.closest('.inbox-row-expanded-panel'),
        action: active.dataset?.action || null,
    };
}

function restoreListFocus(saved, fallbackRow) {
    if (!saved) return;
    const row = inboxRowById(saved.entryId);
    let target = null;
    if (row && saved.action) {
        target = [...row.querySelectorAll(`[data-action="${saved.action}"]`)]
            .find(el => !!el.closest('.inbox-row-expanded-panel') === saved.inPanel) || null;
    }
    if (!target) target = rowToggle(row || fallbackRow);
    target?.focus({ preventScroll: true });
}

/**
 * Swap freshly fetched entries in under the reader (ws event / reconnect):
 * keep the expanded row, the selection (by entry id, not index), focus and
 * scroll. The expanded entry stays even if it no longer matches the
 * unread-only filter (expanding marked it read), until the user moves on.
 */
function applyBackgroundRefresh(fresh, archivedIds) {
    const container = document.getElementById('inbox-list');
    if (!container) return;
    const old = getInboxEntries();
    const rows = [...container.querySelectorAll('.inbox-row')];
    const selectedRow = container.querySelector('.inbox-row.keyboard-selected');
    const selectedId = selectedRow?.dataset.entryId || null;
    const selectedPos = selectedRow ? rows.indexOf(selectedRow) : -1;
    const focus = describeListFocus();
    const scrollY = window.scrollY;
    const scrollTop = container.scrollTop;

    let next = fresh;
    if (expandedEntryId && !fresh.some(e => e.id === expandedEntryId)) {
        const kept = old.find(e => e.id === expandedEntryId);
        // Kept only when it merely stopped matching the filter; one archived
        // here or in another tab really is gone (CHT-1514).
        if (kept && showUnreadOnly && !archivedIds.has(expandedEntryId)) {
            next = [...fresh];
            next.splice(Math.min(old.indexOf(kept), next.length), 0, kept);
        } else {
            expandedEntryId = null; // archived elsewhere: it really is gone
        }
    }

    setInboxEntries(next);
    renderInbox();

    let selectedIdx = -1;
    if (selectedId) {
        selectedIdx = next.findIndex(e => e.id === selectedId);
        // Its entry left the list: stay at the same position.
        if (selectedIdx === -1 && next.length) selectedIdx = Math.min(selectedPos, next.length - 1);
    }
    if (selectedIdx >= 0) selectInboxRow(selectedIdx, { focus: false });
    else setSelectedInboxIndex(-1);

    const fallback = selectedIdx >= 0 ? container.querySelectorAll('.inbox-row')[selectedIdx] : null;
    restoreListFocus(focus, fallback);
    if (container.scrollTop !== scrollTop) container.scrollTop = scrollTop;
    if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
}

/**
 * True when a websocket inbox event only reports what this client already
 * shows, so a reload would change nothing: chiefly the server echoing our
 * own mark-read (it broadcasts to every connection, the sender included)
 * and our own archive (PR #260 review finding 1).
 */
export function isInboxEventAlreadyApplied(type, data) {
    if (!data?.id) return false;
    const entry = getInboxEntries().find(e => e.id === data.id);
    if (type === 'read') return !entry || !!entry.read_at;
    if (type === 'archived') return !entry;
    return false;
}

/**
 * Re-render just these rows in place (CHT-1320). Rebuilding the whole list
 * destroyed the focused element on every expand/collapse; swapping single
 * rows keeps the rest untouched, keeps the keyboard cursor, and puts focus
 * back on the equivalent control when the old row held it. Focus that was
 * in a collapsing panel lands on the row's toggle.
 */
function rerenderInboxRows(ids) {
    const entries = getInboxEntries();
    for (const id of new Set(ids)) {
        const oldRow = inboxRowById(id);
        const entry = entries.find(e => e.id === id);
        if (!oldRow || !entry) continue;
        const focus = oldRow.contains(document.activeElement) ? describeListFocus() : null;
        const tpl = document.createElement('template');
        tpl.innerHTML = renderInboxRow(entry).trim();
        const newRow = tpl.content.firstElementChild;
        if (oldRow.classList.contains('keyboard-selected')) newRow.classList.add('keyboard-selected');
        oldRow.replaceWith(newRow);
        restoreListFocus(focus, newRow);
    }
}

/**
 * Move focus into the inbox list and select its first row, so keyboard
 * navigation engages immediately (the list handler disengages while a
 * sidebar nav link holds focus). No-op when the list is empty.
 */
export function selectInboxRow(index, { focus = true } = {}) {
    const rows = document.querySelectorAll('#inbox-list .inbox-row');
    rows.forEach(r => r.classList.remove('keyboard-selected'));
    if (rows.length === 0) {
        setSelectedInboxIndex(-1);
        return;
    }
    const clamped = Math.max(0, Math.min(index, rows.length - 1));
    rows[clamped].classList.add('keyboard-selected');
    setSelectedInboxIndex(clamped);
    // focus() (not just the class) is what actually pulls focus off the
    // sidebar link so the list keydown handler stops yielding to it. Skipped
    // on a collapse-then-move (j/k), where focusing the row we're leaving
    // would strand a native focus ring one row behind the highlight while the
    // subsequent move only shifts the class (PR #260 review).
    if (focus) rowToggle(rows[clamped]).focus({ preventScroll: true });
}

export function focusFirstInboxRow() {
    selectInboxRow(0);
}

/**
 * Archive (clear) an entry from the inbox without navigating away: mark it
 * read, drop it from the working list, and advance the cursor to the item
 * that slid into its place -- Gmail's `e`. Optimistic; the server mark-read
 * is fired after the UI updates.
 */
export async function archiveInboxEntry(entryId) {
    const entries = getInboxEntries();
    const idx = entries.findIndex(e => e.id === entryId);
    if (idx === -1) return;
    const entry = entries[idx];
    const wasUnread = !entry.read_at;

    if (expandedEntryId === entryId) expandedEntryId = null; // it's leaving the list
    archivedLocally.set(entryId, null); // until the server confirms (CHT-1514)
    setInboxEntries(entries.filter(e => e.id !== entryId));
    if (wasUnread) setInboxUnreadCount(Math.max(0, getInboxUnreadCount() - 1));
    renderInbox();
    renderInboxBadge();
    selectInboxRow(idx); // idx now points at the next entry (clamped when last)

    // CHT-1316: a real archive that persists (drops out of the list + count
    // server-side), instead of the phase-1 mark-read hack that a refetch
    // would un-hide.
    try {
        await api.archiveInbox(entryId);
        confirmArchived(entryId);
    } catch (e) {
        // Not archived after all: let the next fetch show it again.
        archivedLocally.delete(entryId);
        console.error('Failed to archive inbox entry:', e);
    }
}

/**
 * Toggle the inline expansion of an entry (CHT-1320). Expanding reveals the
 * triggering content + an action bar without navigating away; only one row is
 * open at a time. Expanding also marks the entry read (you've now seen it).
 */
export function toggleInboxEntryExpand(entryId) {
    const entries = getInboxEntries();
    const idx = entries.findIndex(e => e.id === entryId);
    if (idx === -1) return;
    const previous = expandedEntryId;
    expandedEntryId = (previous === entryId) ? null : entryId;
    // Mark read optimistically BEFORE the re-render (PR #260 review): setting
    // read_at in state up front means the re-render simply omits the dot.
    if (expandedEntryId === entryId) markEntryReadOptimistic(entryId);
    // Only the rows that changed are rebuilt (PR #260 review findings 3, 9).
    rerenderInboxRows([previous, entryId]);
    selectInboxRow(idx); // the cursor follows the row the user just toggled
    if (expandedEntryId === entryId) {
        // Expanding the last visible row would otherwise open its panel
        // below the fold with no sign anything happened (finding 8).
        inboxRowById(entryId)?.scrollIntoView?.({ block: 'nearest' });
    }
}

/**
 * Optimistically mark an entry read: update local state + the badge now, fire
 * the server mark-read after (CHT-1320). If the server refuses, put the entry
 * back to unread, re-sync the badge from the server and say so (PR #260
 * review finding 5).
 */
function markEntryReadOptimistic(entryId) {
    const entries = getInboxEntries();
    const entry = entries.find(e => e.id === entryId);
    if (!entry || entry.read_at) return;
    const stamp = new Date().toISOString();
    entry.read_at = stamp;
    readLocally.set(entryId, { readAt: stamp, confirmedAfter: null }); // CHT-1514
    setInboxEntries([...entries]);
    setInboxUnreadCount(Math.max(0, getInboxUnreadCount() - 1));
    renderInboxBadge();
    api.markInboxRead(entryId).then(() => confirmRead(entryId), e => {
        if (readLocally.get(entryId)?.readAt === stamp) readLocally.delete(entryId);
        const current = getInboxEntries().find(x => x.id === entryId);
        if (current && current.read_at === stamp) {
            current.read_at = null;
            setInboxEntries([...getInboxEntries()]);
            rerenderInboxRows([entryId]);
        }
        refreshInboxUnreadCount();
        showApiError('mark inbox entry read', e);
    });
}

/**
 * Collapse any expanded row (j/k cursor moves and Escape use this). Returns
 * true if something was actually collapsed, so callers can decide whether a
 * key press was "consumed" by the collapse. Focus that was inside the row
 * (e.g. on an action-bar button) moves to the row's toggle instead of being
 * dropped to <body> (PR #260 review finding 3).
 */
export function collapseInboxExpand() {
    if (expandedEntryId === null) return false;
    const id = expandedEntryId;
    expandedEntryId = null;
    rerenderInboxRows([id]);
    return true;
}

function setReassignBusy(entryId, busy) {
    document.querySelectorAll('#inbox-list [data-action="reassign-inbox-entry"]').forEach(btn => {
        if (btn.dataset.entryId !== entryId) return;
        // aria-disabled (not disabled) so a focused button keeps focus.
        if (busy) {
            btn.setAttribute('aria-disabled', 'true');
            btn.setAttribute('aria-busy', 'true');
        } else {
            btn.removeAttribute('aria-disabled');
            btn.removeAttribute('aria-busy');
        }
    });
}

/**
 * Reassign the entry's source issue back to whoever triggered it (the
 * assigner), then archive the entry (CHT-1320). Only offered for entries that
 * carry both a source user and an issue. The PATCH goes first and the entry is
 * archived only once it succeeds. A second press while the PATCH is in flight
 * is ignored (PR #260 review finding 6).
 */
export async function reassignInboxEntry(entryId) {
    if (reassignInFlight.has(entryId)) return;
    const entry = getInboxEntries().find(e => e.id === entryId);
    if (!entry || !entry.issue_id || !entry.source_user_id) return;
    const back = entry.source_user_name || 'sender';
    reassignInFlight.add(entryId);
    setReassignBusy(entryId, true);
    // PATCH first, archive only on success (PR #260 review): archive now
    // PERSISTS server-side (CHT-1316), so an optimistic archive-then-PATCH
    // would silently orphan the entry if the reassign failed -- the issue
    // stays assigned to you but the "handle me" item is gone for good. Leave
    // the entry in place on failure so it can be retried.
    try {
        await api.updateIssue(entry.issue_id, { assignee_id: entry.source_user_id });
    } catch (e) {
        reassignInFlight.delete(entryId);
        setReassignBusy(entryId, false);
        showApiError(`reassign ${entry.issue_identifier || 'issue'} back to ${back}`, e);
        return;
    }
    reassignInFlight.delete(entryId);
    archiveInboxEntry(entryId);
}

/**
 * Toggle the unread-only filter and reload.
 */
export function toggleInboxUnreadFilter() {
    setInboxUnreadFilter(!showUnreadOnly);
}

/**
 * Show all entries or only unread ones (CHT-1962: an All / Unread
 * segmented control). Choosing the current filter again does nothing.
 */
export function setInboxUnreadFilter(unreadOnly) {
    if (unreadOnly === showUnreadOnly) return;
    showUnreadOnly = unreadOnly;
    document.querySelectorAll('[data-action="set-inbox-filter"]').forEach(btn => {
        const on = (btn.dataset.filter === 'unread') === showUnreadOnly;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    loadInbox({ focusFirst: true });
}

const CHECK_ICON = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
const ARCHIVE_ICON = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="12" height="3" rx="1"/><path d="M3 6v6.5a1 1 0 001 1h8a1 1 0 001-1V6M6.5 9h3"/></svg>';

function avatarInitial(name) {
    const ch = (name || '').trim().charAt(0);
    return ch ? ch.toUpperCase() : '•';
}

function renderInboxRow(entry) {
    const isUnread = !entry.read_at;
    const isExpanded = entry.id === expandedEntryId;
    const kindLabel = KIND_LABELS[entry.kind] || entry.kind;
    const sourceRef = entry.issue_identifier || entry.document_title || '';
    const dataAttrs = [
        `data-entry-id="${escapeAttr(entry.id)}"`,
        entry.issue_id ? `data-issue-id="${escapeAttr(entry.issue_id)}"` : '',
        entry.document_id ? `data-document-id="${escapeAttr(entry.document_id)}"` : '',
    ].filter(Boolean).join(' ');

    const panelId = `inbox-panel-${entry.id}`;

    // The toggle is a real <button> holding the header, title and (while
    // collapsed) the one-line preview. The expanded panel is its sibling
    // region, so the action-bar buttons are not nested inside another
    // interactive element (PR #260 review finding 2: axe nested-interactive).
    return `
        <div class="inbox-row${isUnread ? ' inbox-row-unread' : ''}${isExpanded ? ' inbox-row-expanded' : ''}"
             ${dataAttrs}>
            <div class="inbox-row-main">
                <button type="button" class="inbox-row-toggle" data-action="toggle-inbox-expand"
                        data-entry-id="${escapeAttr(entry.id)}"
                        aria-expanded="${isExpanded ? 'true' : 'false'}"${isExpanded ? ` aria-controls="${escapeAttr(panelId)}"` : ''}>
                    ${isUnread ? '<span class="inbox-row-unread-dot" title="Unread"></span>' : '<span class="inbox-row-dot-spacer" aria-hidden="true"></span>'}
                    <span class="inbox-row-avatar" aria-hidden="true">${escapeHtml(avatarInitial(entry.source_user_name))}</span>
                    <span class="inbox-row-header">
                        <span class="badge badge-inbox-${escapeAttr(entry.kind)}">${escapeHtml(kindLabel)}</span>
                        ${sourceRef ? `<span class="inbox-row-source">${escapeHtml(sourceRef)}</span>` : ''}
                    </span>
                    <span class="inbox-row-text">
                        <span class="inbox-row-title">${escapeHtml(entry.title)}</span>
                        ${!isExpanded && entry.body ? `<span class="inbox-row-body">${escapeHtml(entry.body)}</span>` : ''}
                    </span>
                </button>
                ${isExpanded ? renderExpandedPanel(entry, sourceRef, panelId) : ''}
            </div>
            <div class="inbox-row-meta">
                <span class="inbox-row-hover-actions">
                    ${isUnread ? `<button type="button" class="inbox-row-action" data-action="mark-inbox-read"
                        data-entry-id="${escapeAttr(entry.id)}" title="Mark read" aria-label="Mark read">${CHECK_ICON}</button>` : ''}
                    <button type="button" class="inbox-row-archive inbox-row-action" data-action="archive-inbox-entry"
                        data-entry-id="${escapeAttr(entry.id)}" title="Archive (e)" aria-label="Archive">${ARCHIVE_ICON}</button>
                </span>
                <span class="inbox-row-time">${escapeHtml(formatRelativeTime(entry.created_at))}</span>
            </div>
        </div>
    `;
}

/**
 * The inline expanded panel for a row (CHT-1320): the full triggering body,
 * who it came from, and the action bar. It sits beside the row's toggle, not
 * inside it, so clicks in it never reach the toggle-expand action.
 */
function renderExpandedPanel(entry, sourceRef, panelId) {
    const canReassign = (entry.kind === 'assignment' || entry.kind === 'review_requested')
        && entry.source_user_id && entry.issue_id;
    const canOpen = entry.issue_id || entry.document_id;
    const from = entry.source_user_name;

    const openLabel = sourceRef ? `Open ${escapeHtml(sourceRef)}` : 'Open';
    const actions = [
        canReassign
            ? `<button type="button" class="inbox-action-btn" data-action="reassign-inbox-entry"
                    data-entry-id="${escapeAttr(entry.id)}"${reassignInFlight.has(entry.id) ? ' aria-disabled="true" aria-busy="true"' : ''}>Reassign back${from ? ` to ${escapeHtml(from)}` : ''}</button>`
            : '',
        canOpen
            ? `<button type="button" class="inbox-action-btn" data-action="open-inbox-full"
                    data-entry-id="${escapeAttr(entry.id)}"
                    ${entry.issue_id ? `data-issue-id="${escapeAttr(entry.issue_id)}"` : ''}
                    ${entry.document_id ? `data-document-id="${escapeAttr(entry.document_id)}"` : ''}>${openLabel}</button>`
            : '',
        `<button type="button" class="inbox-action-btn" data-action="archive-inbox-entry"
                data-entry-id="${escapeAttr(entry.id)}">Archive</button>`,
    ].filter(Boolean).join('');

    return `
        <div class="inbox-row-expanded-panel" id="${escapeAttr(panelId)}" role="region"
             aria-label="${escapeAttr(entry.title)}">
            ${from ? `<div class="inbox-expanded-source">from ${escapeHtml(from)}</div>` : ''}
            ${entry.body ? `<div class="inbox-expanded-body">${escapeHtml(entry.body)}</div>` : ''}
            <div class="inbox-action-bar">${actions}</div>
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

    container.innerHTML = renderInboxGroups(entries);
}

/**
 * Which day bucket an entry falls in (CHT-1962): Today, Yesterday, Last 7
 * days or Older, by the reader's local calendar day.
 */
export function inboxDayGroup(iso, now = new Date()) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return 'Older';
    const dayStart = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
    const days = Math.round((dayStart(now) - dayStart(d)) / 86400000);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return 'Last 7 days';
    return 'Older';
}

/**
 * The rows under day headers (CHT-1962). Entries keep the server's order
 * (newest first), so each bucket is one contiguous run and the cursor's
 * row index still equals the entry index: headers are not `.inbox-row`s.
 * A group the reader empties by archiving hides itself in CSS (:has).
 */
function renderInboxGroups(entries) {
    const groups = [];
    for (const entry of entries) {
        const label = inboxDayGroup(entry.created_at);
        const last = groups[groups.length - 1];
        if (last && last.label === label) last.entries.push(entry);
        else groups.push({ label, entries: [entry] });
    }
    return groups.map(g => `
        <section class="inbox-group" aria-label="${escapeAttr(g.label)}">
            <h3 class="inbox-group-header">${escapeHtml(g.label)}</h3>
            ${g.entries.map(entry => renderInboxRow(entry)).join('')}
        </section>
    `).join('');
}

/**
 * Mark a single entry read -- both server-side and in local state/DOM,
 * so the badge/list stay correct without a full reload.
 */
async function markEntryRead(entryId) {
    const entry = getInboxEntries().find(e => e.id === entryId);
    if (!entry || entry.read_at) return; // already read (or unknown) -- no-op

    // Overlay first (CHT-1514 review): a fetch landing while the request is
    // in flight must not show the row unread again. The list itself is
    // updated only once the server agrees, and from whatever it holds THEN:
    // a background refresh may have replaced it during the await.
    const stamp = new Date().toISOString();
    readLocally.set(entryId, { readAt: stamp, confirmedAfter: null });
    try {
        await api.markInboxRead(entryId);
    } catch (e) {
        if (readLocally.get(entryId)?.readAt === stamp) readLocally.delete(entryId);
        // A refresh during the await may have laid the overlay on the row.
        const current = getInboxEntries().find(x => x.id === entryId);
        if (current && current.read_at === stamp) {
            current.read_at = null;
            setInboxEntries([...getInboxEntries()]);
            rerenderInboxRows([entryId]);
        }
        console.error('Failed to mark inbox entry read:', e);
        return;
    }
    confirmRead(entryId);
    const current = getInboxEntries().find(x => x.id === entryId);
    if (current && !current.read_at) {
        current.read_at = stamp;
        setInboxEntries([...getInboxEntries()]);
        setInboxUnreadCount(Math.max(0, getInboxUnreadCount() - 1));
        renderInboxBadge();
        rerenderInboxRows([entryId]);
    } else {
        // A refresh already showed it read; its badge count may predate
        // the read, so re-sync.
        refreshInboxUnreadCount();
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
        for (const e of getInboxEntries()) {
            if (!e.read_at) readLocally.set(e.id, { readAt: now, confirmedAfter: loadInboxRequestId });
        }
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
 * Archive an entry given its rendered DOM row (keyboard `e` path).
 */
export function archiveInboxEntryElement(rowEl) {
    if (rowEl?.dataset?.entryId) archiveInboxEntry(rowEl.dataset.entryId);
}

/**
 * Toggle-expand an entry given its rendered DOM row (keyboard Enter path,
 * CHT-1320 -- Enter now expands in place rather than navigating away).
 */
export function toggleInboxEntryElementExpand(rowEl) {
    if (rowEl?.dataset?.entryId) toggleInboxEntryExpand(rowEl.dataset.entryId);
}

// Controls whose own activation (click, Enter, Space) must never also toggle
// the row they sit in (CHT-1320).
const ROW_CONTROL_SELECTOR = 'a[href], button, input, textarea, select, label, summary, [contenteditable]:not([contenteditable="false"])';

/**
 * True when an event that reached a row's toggle belongs to a control or the
 * reading panel inside the row rather than to the toggle itself (CHT-1320).
 */
export function isInsideRowContent(target, toggleEl) {
    if (!target || target === toggleEl || !target.closest) return false;
    const control = target.closest(ROW_CONTROL_SELECTOR);
    if (control && control !== toggleEl && toggleEl?.contains(control)) return true;
    return !!target.closest('.inbox-row-expanded-panel');
}

/**
 * True when the user has a non-empty text selection inside this row, so the
 * click that ended it is a selection, not a toggle. Scoped to the row: a
 * leftover selection elsewhere on the page must not swallow the click (PR
 * #260 review finding 10).
 */
function hasTextSelectionIn(rowEl) {
    const sel = typeof window !== 'undefined' ? window.getSelection?.() : null;
    if (!sel || sel.isCollapsed || sel.toString() === '' || !rowEl) return false;
    return rowEl.contains(sel.anchorNode) || rowEl.contains(sel.focusNode);
}

registerActions({
    'toggle-inbox-expand': (event, data, toggleEl) => {
        // The inbox keyboard handler (registered before delegation) already
        // handled this Enter and re-rendered the row; toggling again here
        // undid it, so Enter on a focused row did nothing.
        if (event.type === 'keydown' && event.defaultPrevented) return;
        // A click that ends a text selection is a selection, not a toggle.
        if (event.type === 'click' && hasTextSelectionIn(toggleEl?.closest?.('.inbox-row'))) return;
        // Clicks/keys on a link or input inside the toggle belong to it.
        if (isInsideRowContent(event.target, toggleEl)) return;
        event.preventDefault();
        if (data.entryId) toggleInboxEntryExpand(data.entryId);
    },
    'open-inbox-full': (event, data) => {
        // The expanded action-bar "Open" button -- the old navigate-away path.
        event.preventDefault();
        openInboxEntry(data);
    },
    'reassign-inbox-entry': (event, data) => {
        // reassignInboxEntry ignores a press while its PATCH is in flight.
        event.preventDefault();
        if (data.entryId) reassignInboxEntry(data.entryId);
    },
    'archive-inbox-entry': (event, data) => {
        // event-delegation dispatches to the nearest [data-action]
        // ancestor, so a click on this button resolves to the button --
        // never the row's toggle-inbox-expand -- on its own. preventDefault
        // stops the button's native activation side effects; that's all
        // that's needed here.
        event.preventDefault();
        if (data.entryId) archiveInboxEntry(data.entryId);
    },
    'toggle-inbox-unread-filter': () => toggleInboxUnreadFilter(),
    'set-inbox-filter': (event, data) => setInboxUnreadFilter(data.filter === 'unread'),
    'mark-inbox-read': (event, data) => {
        event.preventDefault();
        if (!data.entryId) return;
        markEntryReadOptimistic(data.entryId);
        rerenderInboxRows([data.entryId]);
    },
    'mark-all-inbox-read': () => markAllInboxRead(),
    'retry-load-inbox': () => loadInbox({ focusFirst: true }),
});
