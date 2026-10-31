/**
 * Issue list module - Issue list rendering functionality (CHT-664)
 * Extracted from app.js for testability
 */

import { getIssues, getSelectedIssueIndex, setSelectedIssueIndex, getCurrentUser } from './state.js';
import { getAssigneeById, formatAssigneeName, getAssigneeOptionList } from './assignees.js';
import { formatEstimate, isOutOfScale } from './projects.js';
import { getSprintCache } from './sprints.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { getGroupByValue, getTotalFilterCount } from './issues-view.js';
import { registerActions } from './event-delegation.js';
import { showInlineDropdown } from './inline-dropdown.js';
import { viewIssue } from './issue-detail-view.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { STATUS_ORDER, PRIORITY_ORDER, ISSUE_NAV_ROWS } from './constants.js';

// Re-export for backward compatibility
export { STATUS_ORDER, PRIORITY_ORDER };
export const ISSUE_TYPE_ORDER = ['task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'refactor', 'epic'];

/**
 * Sum estimates for a list of issues. Null estimates count as 0.
 */
export function sumEstimates(issues) {
    return issues.reduce((sum, i) => sum + (i.estimate || 0), 0);
}

/**
 * Render a summary bar showing issue count and total points.
 */
function renderSummaryBar(issues) {
    const total = sumEstimates(issues);
    return `<div class="issue-list-summary">${issues.length} issues · ${total}pt</div>`;
}

// ========================================
// Chunked paint (CHT-1897)
// ========================================

// Rows painted with the list itself; the rest follow in chunks, so the
// first screen of a 1,000-row list appears without parsing every row
// first. Enough to fill a tall screen at --row-height.
export const FIRST_PAINT_ROWS = 60;
const CHUNK_ROWS = 150;

// Rows still to append, per group: [{ groupKey, ids }]. groupKey null is
// the flat list. Ids, not rows: each row is read from the issues state
// when it is appended, so an edit made while it waited is not lost. A new
// renderIssues() replaces them.
let pendingRows = [];
let firstPaintBudget = Infinity;
let chunkTimer = null;
let pendingSelectionId = null;
// The first element of the paint the queue belongs to. Anything else that
// rewrites #issues-list (skeleton, error, empty state) disconnects it, and
// the queue is dropped instead of landing in that state.
let paintAnchor = null;

// Groups the user collapsed, so a re-render (an edit, a /ws update)
// doesn't open them again (CHT-1923). Kept per user and group-by choice,
// across projects: "Done is collapsed" means the same thing in each.
const collapsedGroups = new Map();
// The current render's collapsed group keys, and its rows held back for
// them: a hidden group takes none of the first-paint budget and is
// painted last, or at once when it is expanded.
let collapsedNow = null;
let collapsedQueue = [];
// A focused control whose row is still queued, focused once it lands.
let pendingFocus = null;

const collapseKey = (groupBy) => `${getCurrentUser()?.id ?? ''}|${groupBy}`;

// Rows a re-paint must render at once: everything down to the bottom of
// the viewport and a screen beyond, so the document keeps its height and
// the scroll position survives (a /ws event re-renders while the user is
// reading row 500). Counted at a row height under any real one.
const MIN_ROW_PX = 24;
function firstPaintRowsFor() {
    const scrollY = typeof window.scrollY === 'number' ? window.scrollY : 0;
    const viewport = window.innerHeight || 0;
    return Math.max(FIRST_PAINT_ROWS, Math.ceil((scrollY + 2 * viewport) / MIN_ROW_PX));
}

/**
 * The rows for one group: as many as the first-paint budget allows, the
 * rest queued for appendPendingRows().
 */
function rowsHtml(groupKey, issues) {
    if (groupKey !== null && collapsedNow?.has(String(groupKey))) {
        collapsedQueue.push({ groupKey, ids: issues.map(i => i.id) });
        return '';
    }
    const now = issues.slice(0, Math.max(0, firstPaintBudget));
    firstPaintBudget -= now.length;
    if (now.length < issues.length) {
        pendingRows.push({ groupKey, ids: issues.slice(now.length).map(i => i.id) });
    }
    return now.map(issue => renderIssueRow(issue)).join('');
}

function groupContainer(list, groupKey) {
    if (groupKey === null) return list;
    const group = Array.prototype.find.call(
        list.querySelectorAll('.issue-group'),
        (el) => el.dataset.group === String(groupKey),
    );
    return group?.querySelector('.issue-group-content') || null;
}

/** Drop any queued rows (the list is being replaced by something else). */
export function cancelPendingRows() {
    clearTimeout(chunkTimer);
    chunkTimer = null;
    paintGeneration++;
    pendingRows = [];
    pendingSelectionId = null;
    pendingFocus = null;
    paintAnchor = null;
}

/**
 * Append up to `limit` queued rows (all of them by default). Keyboard
 * navigation calls this before moving the cursor, and the router before
 * restoring a scroll position, so both see the whole list.
 */
export function appendPendingRows(limit = Infinity) {
    if (pendingRows.length === 0) return;
    const list = document.getElementById('issues-list');
    if (!list || !paintAnchor?.isConnected) {
        cancelPendingRows();
        return;
    }
    const byId = new Map(getIssues().map(issue => [issue.id, issue]));
    let budget = limit;
    while (pendingRows.length > 0 && budget > 0) {
        const head = pendingRows[0];
        const take = head.ids.slice(0, budget);
        const container = groupContainer(list, head.groupKey);
        const html = take.map(id => byId.get(id)).filter(Boolean).map(issue => renderIssueRow(issue)).join('');
        container?.insertAdjacentHTML('beforeend', html);
        budget -= take.length;
        if (take.length === head.ids.length) pendingRows.shift();
        else head.ids = head.ids.slice(take.length);
    }
    if (pendingFocus) {
        const focus = pendingFocus;
        if (findRow(list, focus.issueId)) {
            pendingFocus = null;
            restoreFocus(list, focus);
        }
    }
    if (pendingRows.length === 0) {
        clearTimeout(chunkTimer);
        chunkTimer = null;
        const id = pendingSelectionId;
        pendingSelectionId = null;
        // Only if nothing was selected meanwhile (a click, or j on a
        // painted row).
        if (id && !list.querySelector('.issue-row.keyboard-selected')) reapplyKeyboardSelection(id);
    }
}

export function hasPendingRows() {
    return pendingRows.length > 0;
}

// The first chunk waits for a frame, so the rows painted with the list
// reach the screen before any more are parsed (a zero timeout would run
// first and delay that frame).
const afterNextFrame = (cb) => (typeof requestAnimationFrame === 'function'
    ? requestAnimationFrame(() => { chunkTimer = setTimeout(cb, 0); })
    : (chunkTimer = setTimeout(cb, 16)));
let paintGeneration = 0;

function schedulePendingRows() {
    clearTimeout(chunkTimer);
    if (pendingRows.length === 0) return;
    const generation = ++paintGeneration;
    afterNextFrame(function step() {
        if (generation !== paintGeneration) return; // a newer paint took over
        appendPendingRows(CHUNK_ROWS);
        if (pendingRows.length > 0) chunkTimer = setTimeout(step, 0);
    });
}

/**
 * Render the issues list (main entry point)
 */
export function renderIssues() {
    const list = document.getElementById('issues-list');
    if (!list) return;

    // CHT-1215: capture the currently keyboard-selected issue's id before the
    // rebuild below replaces the DOM — the highlight and selectedIssueIndex
    // otherwise survive independently of each other across a re-render (e.g.
    // an incoming websocket event, or an inline field edit), so the visible
    // cursor silently drifts from the tracked index.
    const selectedRow = list.querySelector('.issue-row.keyboard-selected');
    const selectedIssueId = selectedRow?.dataset.issueId;
    // The rebuild also drops focus from whatever control in the list had
    // it; put it back on the same control of the same issue (CHT-1923).
    const focused = focusedControl(list);
    // The group each of those rows is in now, to tell a row that moved
    // into a collapsed group from one whose group the user collapsed.
    const groupOf = (row) => row?.closest('.issue-group')?.dataset.group ?? null;
    const wasIn = [
        [selectedIssueId, groupOf(selectedRow)],
        [focused?.issueId, groupOf(focused?.row)],
    ];

    list.classList.add('issue-list-linear');

    // A new paint replaces whatever the last one still had queued.
    cancelPendingRows();
    firstPaintBudget = firstPaintRowsFor();

    const issues = getIssues();

    if (issues.length === 0) {
        const searchQuery = document.getElementById('issue-search')?.value?.trim();
        const hasFilters = getTotalFilterCount() > 0;
        const hasSearch = searchQuery && searchQuery.length >= 2;

        if (hasFilters || hasSearch) {
            const filterCount = getTotalFilterCount();
            const parts = [];
            if (hasSearch) parts.push(`search "${searchQuery}"`);
            if (hasFilters) parts.push(`${filterCount} active filter${filterCount > 1 ? 's' : ''}`);
            list.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.issues,
                heading: 'No matching issues',
                description: `No issues match your ${parts.join(' and ')}`,
                cta: { label: 'Clear all', action: 'clear-all-filters' },
            });
        } else {
            list.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.issues,
                heading: 'No issues found',
                description: 'Create your first issue to get started',
                cta: { label: 'Create issue', action: 'showCreateIssueModal' },
            });
        }
        setSelectedIssueIndex(-1);
        firstPaintBudget = Infinity;
        return;
    }

    const groupBy = getGroupByValue();
    collapsedNow = collapsedGroups.get(collapseKey(groupBy)) || null;
    collapsedQueue = [];

    if (groupBy === 'status') {
        renderGroupedByStatus(list, issues);
    } else if (groupBy === 'priority') {
        renderGroupedByPriority(list, issues);
    } else if (groupBy === 'type') {
        renderGroupedByType(list, issues);
    } else if (groupBy === 'assignee') {
        renderGroupedByAssignee(list, issues);
    } else if (groupBy === 'sprint') {
        renderGroupedBySprint(list, issues);
    } else {
        // No grouping - render flat list with summary
        list.innerHTML = renderSummaryBar(issues) + rowsHtml(null, issues);
    }

    firstPaintBudget = Infinity;
    paintAnchor = list.firstElementChild;
    pendingRows.push(...collapsedQueue);
    collapsedQueue = [];
    const collapsed = collapsedNow;
    collapsedNow = null;
    if (collapsed?.size) {
        list.querySelectorAll('.issue-group').forEach((group) => {
            if (collapsed.has(group.dataset.group)) markCollapsed(group, true);
        });
        // The row the user is on (selected or focused) stays in sight: a
        // collapsed group it has just moved into (an edit) opens again.
        wasIn.forEach(([id, group]) => { if (id) revealIssueGroup(id, list, group); });
    }
    if (focused) {
        if (findRow(list, focused.issueId)) restoreFocus(list, focused);
        else if (pendingRows.length > 0) pendingFocus = focused;
    }
    // A selected row that is still queued is selected once it lands.
    const selectedPainted = !!selectedIssueId && Array.prototype.some.call(
        list.querySelectorAll('.issue-row'), (row) => row.dataset.issueId === selectedIssueId,
    );
    if (selectedIssueId && pendingRows.length > 0 && !selectedPainted) {
        pendingSelectionId = selectedIssueId;
    } else {
        reapplyKeyboardSelection(selectedIssueId);
    }
    schedulePendingRows();
}

/**
 * Re-apply the j/k keyboard-selection highlight after renderIssues() rebuilds
 * the list's innerHTML from scratch (CHT-1215). Without this, the DOM
 * highlight disappears on every re-render (websocket events, inline field
 * edits, filter changes) while the tracked selectedIssueIndex silently drifts
 * out of sync with what's visible.
 * @param {string|undefined} selectedIssueId - id of the row that had
 *   .keyboard-selected before the rebuild, if any
 */
function reapplyKeyboardSelection(selectedIssueId) {
    const prevIndex = getSelectedIssueIndex();
    if (prevIndex < 0) return;

    const items = document.querySelectorAll(ISSUE_NAV_ROWS);
    if (items.length === 0) {
        setSelectedIssueIndex(-1);
        return;
    }

    // Prefer re-finding the same issue by id (handles reordering/regrouping);
    // fall back to clamping the old index if that issue is no longer present.
    let newIndex = selectedIssueId
        ? Array.prototype.findIndex.call(items, (item) => item.dataset.issueId === selectedIssueId)
        : -1;
    if (newIndex < 0) {
        newIndex = Math.min(prevIndex, items.length - 1);
    }

    setSelectedIssueIndex(newIndex);
    items[newIndex].classList.add('keyboard-selected');
}

function renderGroupedByStatus(list, issues) {
    // Group issues by status
    const groups = {};
    STATUS_ORDER.forEach(status => groups[status] = []);

    issues.forEach(issue => {
        if (groups[issue.status]) {
            groups[issue.status].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    STATUS_ORDER.forEach(status => {
        const groupIssues = groups[status];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${status}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${status}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${getStatusIcon(status)}</span>
                    <span class="group-title">${formatStatus(status)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(status, groupIssues)}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByPriority(list, issues) {
    // Group issues by priority
    const groups = {};
    PRIORITY_ORDER.forEach(priority => groups[priority] = []);

    issues.forEach(issue => {
        if (groups[issue.priority]) {
            groups[issue.priority].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    PRIORITY_ORDER.forEach(priority => {
        const groupIssues = groups[priority];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${priority}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${priority}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${getPriorityIcon(priority)}</span>
                    <span class="group-title">${formatPriority(priority)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(priority, groupIssues)}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByType(list, issues) {
    const groups = {};
    ISSUE_TYPE_ORDER.forEach(issueType => groups[issueType] = []);

    issues.forEach(issue => {
        const type = issue.issue_type || 'task';
        if (groups[type]) {
            groups[type].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    ISSUE_TYPE_ORDER.forEach(issueType => {
        const groupIssues = groups[issueType];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${issueType}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${issueType}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${issueType}">${formatIssueType(issueType)}</span></span>
                    <span class="group-title">${formatIssueType(issueType)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(issueType, groupIssues)}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByAssignee(list, issues) {
    // Group issues by assignee
    const groups = {};
    const unassignedKey = '__unassigned__';
    groups[unassignedKey] = [];

    // Create groups for each assignee (members + agents), idle session
    // identities included: their issues are not unassigned (CHT-1501).
    const assigneeOptions = getAssigneeOptionList({ includeIdle: true });
    assigneeOptions.forEach(({ assignee }) => {
        groups[assignee.id] = [];
    });

    issues.forEach(issue => {
        if (!issue.assignee_id) {
            groups[unassignedKey].push(issue);
        } else if (groups[issue.assignee_id]) {
            groups[issue.assignee_id].push(issue);
        } else {
            // Assignee not in members list, add to unassigned
            groups[unassignedKey].push(issue);
        }
    });

    let html = renderSummaryBar(issues);

    // Render unassigned first
    if (groups[unassignedKey].length > 0) {
        html += `
            <div class="issue-group" data-group="${unassignedKey}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${unassignedKey}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${groups[unassignedKey].length}</span>
                    <span class="group-points">${sumEstimates(groups[unassignedKey])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(unassignedKey, groups[unassignedKey])}
                </div>
            </div>
        `;
    }

    // Render each assignee's group (members, then nested agents)
    assigneeOptions.forEach(({ assignee }) => {
        const groupIssues = groups[assignee.id];
        if (!groupIssues || groupIssues.length === 0) return;

        const name = formatAssigneeName(assignee) || 'Unknown';
        const extra = assignee.is_agent ? (assignee.parent_user_name ? ` (${assignee.parent_user_name})` : ' (agent)') : '';
        html += `
            <div class="issue-group" data-group="${escapeAttr(assignee.id)}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${escapeAttr(assignee.id)}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${renderAvatar(assignee, 'avatar-small')}</span>
                    <span class="group-title">${escapeHtml(name)}${escapeHtml(extra)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(assignee.id, groupIssues)}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedBySprint(list, issues) {
    const noSprintKey = '__no_sprint__';
    const groups = {};
    groups[noSprintKey] = [];

    // Collect unique sprint IDs from issues and create groups
    const sprintOrder = [];
    issues.forEach(issue => {
        if (!issue.sprint_id) {
            groups[noSprintKey].push(issue);
        } else {
            if (!groups[issue.sprint_id]) {
                groups[issue.sprint_id] = [];
                sprintOrder.push(issue.sprint_id);
            }
            groups[issue.sprint_id].push(issue);
        }
    });

    // Sort sprints: active first, then planned, then completed
    const statusRank = { active: 0, planned: 1, completed: 2 };
    const cache = getSprintCache();
    sprintOrder.sort((a, b) => {
        const sa = cache[a];
        const sb = cache[b];
        const rankA = sa ? (statusRank[sa.status] ?? 3) : 3;
        const rankB = sb ? (statusRank[sb.status] ?? 3) : 3;
        return rankA - rankB;
    });

    let html = renderSummaryBar(issues);

    // Render sprint groups
    sprintOrder.forEach(sprintId => {
        const groupIssues = groups[sprintId];
        if (groupIssues.length === 0) return;

        const sprint = cache[sprintId];
        const name = sprint ? sprint.name : sprintId;
        const statusLabel = sprint ? (sprint.status === 'active' ? ' (Active)' : sprint.status === 'completed' ? ' (Done)' : '') : '';
        const safeId = sprintId.replace(/[^a-zA-Z0-9_-]/g, '_');

        html += `
            <div class="issue-group" data-group="${safeId}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${safeId}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${escapeHtml(name)}${statusLabel}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(safeId, groupIssues)}
                </div>
            </div>
        `;
    });

    // Render "No Sprint" group last
    if (groups[noSprintKey].length > 0) {
        html += `
            <div class="issue-group" data-group="${noSprintKey}">
                <div class="issue-group-header" role="button" tabindex="0" aria-expanded="true" data-action="toggle-group" data-group="${noSprintKey}">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${groups[noSprintKey].length}</span>
                    <span class="group-points">${sumEstimates(groups[noSprintKey])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${rowsHtml(noSprintKey, groups[noSprintKey])}
                </div>
            </div>
        `;
    }

    list.innerHTML = html;
}

function findGroup(list, groupKey) {
    return Array.prototype.find.call(
        list.querySelectorAll('.issue-group'), (el) => el.dataset.group === String(groupKey),
    ) || null;
}

function findRow(list, issueId) {
    return Array.prototype.find.call(
        list.querySelectorAll('.issue-row'), (r) => r.dataset.issueId === issueId,
    ) || null;
}

/** Paint a group's queued rows now (it was just expanded). */
function paintGroupNow(list, groupKey) {
    const container = groupContainer(list, groupKey);
    if (!container) return;
    const byId = new Map(getIssues().map(issue => [issue.id, issue]));
    pendingRows = pendingRows.filter((entry) => {
        if (String(entry.groupKey) !== String(groupKey)) return true;
        const html = entry.ids.map(id => byId.get(id)).filter(Boolean).map(issue => renderIssueRow(issue)).join('');
        container.insertAdjacentHTML('beforeend', html);
        return false;
    });
}

function markCollapsed(group, isCollapsed) {
    group.classList.toggle('collapsed', isCollapsed);
    group.querySelector('.issue-group-header')?.setAttribute('aria-expanded', String(!isCollapsed));
}

/**
 * Keep the j/k cursor on a row the user can see after a group opens or
 * closes (CHT-1932): the selected row by id if it is still navigable,
 * else the first visible row after the group that hid it, else the last.
 */
function resyncSelection(list, group) {
    const items = Array.from(document.querySelectorAll(ISSUE_NAV_ROWS));
    const selected = list.querySelector('.issue-row.keyboard-selected');
    if (!selected) {
        if (getSelectedIssueIndex() >= 0) setSelectedIssueIndex(-1);
        return;
    }
    let index = items.indexOf(selected);
    if (index < 0) {
        selected.classList.remove('keyboard-selected');
        index = items.findIndex(row => group.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_FOLLOWING
            && !group.contains(row));
        if (index < 0) index = items.length - 1;
        if (index >= 0) items[index].classList.add('keyboard-selected');
    }
    setSelectedIssueIndex(index);
}

function setGroupCollapsed(list, group, isCollapsed) {
    markCollapsed(group, isCollapsed);
    const key = collapseKey(getGroupByValue());
    if (!collapsedGroups.has(key)) collapsedGroups.set(key, new Set());
    const collapsed = collapsedGroups.get(key);
    if (isCollapsed) {
        collapsed.add(group.dataset.group);
    } else {
        collapsed.delete(group.dataset.group);
        paintGroupNow(list, group.dataset.group);
    }
    resyncSelection(list, group);
}

/**
 * Toggle group collapse state
 * @param {string} groupId - Group identifier
 */
export function toggleGroup(groupId) {
    const list = document.getElementById('issues-list');
    const group = list && findGroup(list, groupId);
    if (!group) return;
    setGroupCollapsed(list, group, !group.classList.contains('collapsed'));
}

/**
 * Open the collapsed group an issue's row is in, if any, so the row the
 * user just edited or is on stays visible (CHT-1923 review I3).
 */
export function revealIssueGroup(issueId, list = document.getElementById('issues-list'), unlessIn = undefined) {
    if (!issueId || !list) return;
    const pending = pendingRows.find(entry => entry.ids.includes(issueId));
    const group = pending
        ? (pending.groupKey === null ? null : findGroup(list, pending.groupKey))
        : findRow(list, issueId)?.closest('.issue-group');
    if (!group?.classList.contains('collapsed')) return;
    if (unlessIn !== undefined && group.dataset.group === unlessIn) return; // it was already there
    setGroupCollapsed(list, group, false);
}

/** Forget collapsed groups (tests). */
export function clearCollapsedGroups() {
    collapsedGroups.clear();
}

/**
 * The control in the list that has focus, as something that survives a
 * rebuild: its row's issue id and which control of the row it was.
 */
function focusedControl(list) {
    const active = document.activeElement;
    if (!active || active === list || !list.contains(active)) return null;
    const row = active.closest('.issue-row');
    if (!row?.dataset.issueId) return null;
    return {
        issueId: row.dataset.issueId,
        row,
        dropdownType: active.dataset?.dropdownType || null,
        isTitle: active.classList.contains('issue-title'),
    };
}

function restoreFocus(list, { issueId, dropdownType, isTitle }) {
    if (list.contains(document.activeElement)) return;
    const row = findRow(list, issueId);
    if (!row) return;
    const target = dropdownType ? row.querySelector(`[data-dropdown-type="${dropdownType}"]`)
        : isTitle ? row.querySelector('.issue-title')
            : row.querySelector('a[href], button');
    target?.focus({ preventScroll: true });
}

/**
 * Render a single issue row
 * @param {Object} issue - Issue data
 * @returns {string} HTML string
 */
/**
 * Wrap the first case-insensitive match of `query` in `text` with a
 * <mark>, HTML-escaping the surrounding text. Falls back to plain escaped
 * text when there's no query or no match (CHT-1212).
 */
export function highlightSearchMatch(text, query) {
    if (!text) return '';
    if (!query) return escapeHtml(text);
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + query.length);
    const after = text.slice(idx + query.length);
    return `${escapeHtml(before)}<mark class="search-match">${escapeHtml(match)}</mark>${escapeHtml(after)}`;
}

/**
 * Build a highlighted excerpt of `description` centered on the first match
 * of `query`, with ellipses where the excerpt was truncated. Returns null
 * when there's no match (CHT-1212).
 */
export function getDescriptionSnippet(description, query, contextChars = 40) {
    if (!description || !query) return null;
    const idx = description.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return null;
    const start = Math.max(0, idx - contextChars);
    const end = Math.min(description.length, idx + query.length + contextChars);
    const excerpt = description.slice(start, end);
    const highlighted = highlightSearchMatch(excerpt, query);
    return `${start > 0 ? '…' : ''}${highlighted}${end < description.length ? '…' : ''}`;
}

// One formatter for every row: toLocaleDateString() with options builds a
// new Intl formatter per call, which was a third of a 1,000-row render's
// script time (CHT-1894).
const SHORT_DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

export function renderIssueRow(issue) {
    const assignee = issue.assignee_id ? getAssigneeById(issue.assignee_id) : null;
    const assigneeName = assignee ? formatAssigneeName(assignee) : null;
    const created = new Date(issue.created_at);
    const createdDate = Number.isNaN(created.getTime()) ? '' : SHORT_DATE.format(created);
    const estimateDisplay = issue.estimate != null ? formatEstimate(issue.estimate, issue.project_id) : '';
    const outOfScale = isOutOfScale(issue.estimate, issue.project_id);
    const sprintInfo = issue.sprint_id ? getSprintCache()[issue.sprint_id] : null;
    const sprintName = sprintInfo ? sprintInfo.name : null;

    // CHT-1212: search matches title, description, or identifier server-side,
    // but a row that only matched on the (hidden) description looked
    // unrelated to the query with no visible explanation. Highlight the
    // title match when present; otherwise show a snippet of the description
    // match so it's clear why the row is in the results.
    const searchQuery = document.getElementById('issue-search')?.value?.trim();
    const titleMatches = !!searchQuery && issue.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionSnippet = (searchQuery && !titleMatches)
        ? getDescriptionSnippet(issue.description, searchQuery)
        : null;

    return `
        <div class="issue-row" data-issue-id="${escapeAttr(issue.id)}" data-status="${issue.status}" data-priority="${issue.priority}" data-issue-type="${issue.issue_type || 'task'}" data-project-id="${escapeAttr(issue.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" data-action="show-inline-dropdown" data-dropdown-type="priority" data-issue-id="${escapeAttr(issue.id)}" title="Priority: ${formatPriority(issue.priority)}">
                    ${getPriorityIcon(issue.priority)}
                </button>
                <button class="issue-icon-btn status-btn" data-action="show-inline-dropdown" data-dropdown-type="status" data-issue-id="${escapeAttr(issue.id)}" title="Status: ${formatStatus(issue.status)}">
                    ${getStatusIcon(issue.status)}
                </button>
                <span class="issue-identifier">${issue.identifier}</span>
                <span class="issue-type-badge type-${issue.issue_type || 'task'}">${formatIssueType(issue.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(issue.identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(issue.id)}">${highlightSearchMatch(issue.title, searchQuery)}${descriptionSnippet ? ` <span class="issue-search-snippet" title="Matched in description">— ${descriptionSnippet}</span>` : ''}</a>
            </div>
            <div class="issue-row-right">
                ${issue.labels && issue.labels.length > 0 ? `
                    <div class="issue-labels">
                        ${issue.labels.slice(0, 2).map(label => `
                            <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                        `).join('')}
                    </div>
                ` : ''}
                <button class="issue-icon-btn sprint-btn" data-action="show-inline-dropdown" data-dropdown-type="sprint" data-issue-id="${escapeAttr(issue.id)}" title="Sprint: ${sprintName ? escapeHtml(sprintName) : 'None'}">
                    ${sprintName ? `<span class="sprint-badge">${escapeHtml(sprintName)}</span>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`}
                </button>
                <button class="issue-icon-btn estimate-btn" data-action="show-inline-dropdown" data-dropdown-type="estimate" data-issue-id="${escapeAttr(issue.id)}" title="${outOfScale ? 'Estimate outside current scale' : `Estimate: ${estimateDisplay || 'None'}`}">
                    ${estimateDisplay ? `<span class="estimate-badge${outOfScale ? ' out-of-scale' : ''}">${estimateDisplay}</span>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`}
                </button>
                <span class="issue-date">${createdDate}</span>
                <button class="issue-icon-btn assignee-btn" data-action="show-inline-dropdown" data-dropdown-type="assignee" data-issue-id="${escapeAttr(issue.id)}" title="${escapeAttr(assigneeName || 'Unassigned')}">
                    ${assigneeName ? renderAvatar(assignee, 'avatar-small') : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`}
                </button>
            </div>
        </div>
    `;
}

/**
 * Get priority icon SVG
 * @param {string} priority - Priority level
 * @returns {string} SVG markup
 */
export function getPriorityIcon(priority) {
    const icons = {
        urgent: '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',
        high: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        medium: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        low: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        no_priority: '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'
    };
    return icons[priority] || icons.no_priority;
}

/**
 * Get status icon SVG
 * @param {string} status - Status value
 * @returns {string} SVG markup
 */
export function getStatusIcon(status) {
    const icons = {
        backlog: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',
        todo: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
        in_progress: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',
        in_review: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',
        done: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',
        canceled: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'
    };
    return icons[status] || icons.backlog;
}

// A group header is a button to the keyboard too: Enter or Space opens
// or closes the group (CHT-1932).
if (typeof document !== 'undefined') {
    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const header = event.target?.closest?.('#issues-list .issue-group-header');
        if (!header) return;
        event.preventDefault();
        toggleGroup(header.dataset.group);
    });
}

// Register delegated event handlers (CHT-1062)
registerActions({
    'toggle-group': (event, data) => {
        toggleGroup(data.group);
    },
    'show-inline-dropdown': (event, data, target) => {
        showInlineDropdown(event, data.dropdownType, data.issueId, target);
    },
    'navigate-issue': (event, data) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
        event.preventDefault();
        viewIssue(data.issueId);
    },
});
