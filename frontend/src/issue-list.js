/**
 * Issue list module - Issue list rendering functionality (CHT-664)
 * Extracted from app.js for testability
 */

import { getIssues, getSelectedIssueIndex, setSelectedIssueIndex } from './state.js';
import { getAssigneeById, formatAssigneeName, getAssigneeOptionList } from './assignees.js';
import { formatEstimate, isOutOfScale } from './projects.js';
import { getSprintCache } from './sprints.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { getGroupByValue, getTotalFilterCount } from './issues-view.js';
import { registerActions } from './event-delegation.js';
import { showInlineDropdown } from './inline-dropdown.js';
import { viewIssue } from './issue-detail-view.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { STATUS_ORDER, PRIORITY_ORDER } from './constants.js';

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

// Rows still to append, per group: [{ groupKey, issues }]. groupKey null
// is the flat list. A new renderIssues() replaces them.
let pendingRows = [];
let firstPaintBudget = Infinity;
let chunkTimer = null;
let pendingSelectionId = null;

/**
 * The rows for one group: as many as the first-paint budget allows, the
 * rest queued for appendPendingRows().
 */
function rowsHtml(groupKey, issues) {
    const now = issues.slice(0, Math.max(0, firstPaintBudget));
    firstPaintBudget -= now.length;
    if (now.length < issues.length) {
        pendingRows.push({ groupKey, issues: issues.slice(now.length) });
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

/**
 * Append up to `limit` queued rows (all of them by default). Keyboard
 * navigation calls this before reading the rows, so G and j past the
 * painted rows see the whole list.
 */
export function appendPendingRows(limit = Infinity) {
    const list = document.getElementById('issues-list');
    if (!list) {
        pendingRows = [];
        return;
    }
    let budget = limit;
    while (pendingRows.length > 0 && budget > 0) {
        const head = pendingRows[0];
        const take = head.issues.slice(0, budget);
        const container = groupContainer(list, head.groupKey);
        container?.insertAdjacentHTML('beforeend', take.map(issue => renderIssueRow(issue)).join(''));
        budget -= take.length;
        if (take.length === head.issues.length) pendingRows.shift();
        else head.issues = head.issues.slice(take.length);
    }
    if (pendingRows.length === 0) {
        clearTimeout(chunkTimer);
        chunkTimer = null;
        if (pendingSelectionId) {
            const id = pendingSelectionId;
            pendingSelectionId = null;
            reapplyKeyboardSelection(id);
        }
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
    const selectedIssueId = list.querySelector('.issue-row.keyboard-selected')?.dataset.issueId;

    list.classList.add('issue-list-linear');

    // A new paint replaces whatever the last one still had queued.
    clearTimeout(chunkTimer);
    paintGeneration++;
    chunkTimer = null;
    pendingRows = [];
    pendingSelectionId = null;
    firstPaintBudget = FIRST_PAINT_ROWS;

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

    const items = document.querySelectorAll('#issues-list .issue-row');
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${status}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${priority}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${issueType}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${unassignedKey}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${escapeAttr(assignee.id)}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${safeId}">
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
                <div class="issue-group-header" data-action="toggle-group" data-group="${noSprintKey}">
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

/**
 * Toggle group collapse state
 * @param {string} groupId - Group identifier
 */
export function toggleGroup(groupId) {
    const group = document.querySelector(`.issue-group[data-group="${groupId}"]`);
    if (group) {
        group.classList.toggle('collapsed');
    }
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
