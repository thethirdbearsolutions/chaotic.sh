/**
 * Inline dropdown module - Issue field editing dropdowns (CHT-667)
 * Extracted from app.js for testability
 */

import { handleCloseFollowups } from './epic-prompt.js';
import { api } from './api.js';
import { getIssues, setIssues, getLabels, setLabels, getCurrentTeam, getCurrentProject, getCurrentDetailIssue, setCurrentDetailIssue, getCurrentDetailSprints } from './state.js';
import { getMyIssues, setMyIssues, renderMyIssues } from './dashboard.js';
import { upsertIssue, getStoredIssue } from './issue-store.js';
import { getGroupByValue } from './issues-filter.js';
import { closeAllDropdowns, registerDropdownClickOutside, setDropdownKeyHandler, showToast, showApiError, markModalDirty } from './ui.js';
import { getStatusIcon, getPriorityIcon, renderIssueRow, renderIssues } from './issue-list.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { registerActions } from './event-delegation.js';
import { formatEstimate, getEstimateOptions } from './projects.js';
import { formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList, getAssigneeById } from './assignees.js';
import { updateSprintCacheForProject } from './sprints.js';
import { updateSprintBudgetBar } from './issues-view.js';
import { STATUS_ORDER, PRIORITY_OPTIONS } from './constants.js';

// Dropdown options — re-export from constants for backward compatibility
export const STATUS_OPTIONS = STATUS_ORDER;
export { PRIORITY_OPTIONS };
export const ISSUE_TYPE_OPTIONS = ['task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'refactor', 'epic'];

// Module state
let createIssueLabelIds = [];
let _labelToggleQueue = Promise.resolve();

// Maps an API field name -> the row trigger button's data-dropdown-type, so a
// completed inline edit can return focus to the right control (CHT-1293).
// issue_type is intentionally absent: it isn't editable from a list row (it
// renders as a static badge, no trigger button), so there's nothing to refocus.
// The Issues list's group-by choice -> the field it groups on (CHT-1915).
const GROUP_FIELD = {
    status: 'status',
    priority: 'priority',
    type: 'issue_type',
    assignee: 'assignee_id',
    sprint: 'sprint_id',
};

/**
 * The issue's row in the view on screen. Hidden views keep their rows, and
 * My Issues comes before the Issues list in the page, so the first match
 * in document order can be a row nobody sees (CHT-1915 review I1).
 */
function visibleIssueRow(issueId) {
    const rows = document.querySelectorAll(`.issue-row[data-issue-id="${issueId}"]`);
    for (const row of rows) {
        if (!row.closest('.view.hidden')) return row;
    }
    return rows[0] || null;
}

const DROPDOWN_TYPE_FOR_FIELD = {
    status: 'status',
    priority: 'priority',
    assignee_id: 'assignee',
    estimate: 'estimate',
    sprint_id: 'sprint',
};

/**
 * ArrowUp/ArrowDown/Home/End move native focus across a dropdown's actionable
 * options (CHT-1290). Options are real <button>s, so Enter/Space activate them
 * natively via event delegation — this only moves focus. Returns true if it
 * consumed the key, so the caller can `return` early.
 */
function handleDropdownArrowKeys(e, dropdown) {
    const step = { ArrowDown: 1, ArrowUp: -1, Home: 'first', End: 'last' }[e.key];
    if (step === undefined) return false;
    const opts = Array.from(dropdown.querySelectorAll('.dropdown-option[data-action]'));
    if (opts.length === 0) return false;

    e.preventDefault();
    const idx = opts.indexOf(document.activeElement);
    let target;
    if (step === 'first') target = opts[0];
    else if (step === 'last') target = opts[opts.length - 1];
    else if (step === 1) target = opts[idx < 0 ? 0 : Math.min(opts.length - 1, idx + 1)];
    else target = opts[idx < 0 ? opts.length - 1 : Math.max(0, idx - 1)];
    if (target) target.focus();
    return true;
}

/**
 * True while an inline field dropdown is open (CHT-1290). Lets the issues-list
 * keyboard handler yield arrows to the open dropdown instead of moving the list
 * cursor underneath it.
 */
export function isInlineDropdownOpen() {
    return !!document.querySelector('.inline-dropdown');
}

/**
 * Get create issue label IDs
 * @returns {Array} Current label IDs for create issue
 */
export function getCreateIssueLabelIds() {
    return createIssueLabelIds;
}

/**
 * Set create issue label IDs
 * @param {Array} ids - Label IDs to set
 */
export function setCreateIssueLabelIds(ids) {
    createIssueLabelIds = ids;
}

/**
 * Show an inline dropdown for editing issue fields
 * @param {Event} event - Click event
 * @param {string} type - Dropdown type (status, priority, type, assignee, estimate, labels, sprint)
 * @param {string} issueId - Issue ID being edited
 * @param {Element} [anchorEl] - Element to anchor dropdown to (defaults to event.currentTarget)
 */
export async function showInlineDropdown(event, type, issueId, anchorEl) {
    event.preventDefault();
    closeAllDropdowns();

    const btn = anchorEl || event.currentTarget;
    const rect = btn.getBoundingClientRect();

    const dropdown = document.createElement('div');
    dropdown.className = 'inline-dropdown';

    if (type === 'status') {
        dropdown.innerHTML = `
            <div class="dropdown-header">Change status...</div>
            ${STATUS_OPTIONS.map((status, i) => `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="status" data-value="${status}">
                    ${getStatusIcon(status)}
                    <span>${formatStatus(status)}</span>
                    <span class="dropdown-shortcut">${i + 1}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'priority') {
        dropdown.innerHTML = `
            <div class="dropdown-header">Change priority...</div>
            ${PRIORITY_OPTIONS.map((priority, i) => `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="priority" data-value="${priority}">
                    ${getPriorityIcon(priority)}
                    <span>${formatPriority(priority)}</span>
                    <span class="dropdown-shortcut">${i}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'type') {
        dropdown.innerHTML = `
            <div class="dropdown-header">Change type...</div>
            ${ISSUE_TYPE_OPTIONS.map(issueType => `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="issue_type" data-value="${issueType}">
                    <span class="issue-type-badge type-${issueType}">${formatIssueType(issueType)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'assignee') {
        // Keep the current assignee listed even when idle (CHT-1501).
        const detail = getCurrentDetailIssue();
        const issue = getIssues().find(i => i.id === issueId) || getMyIssues().find(i => i.id === issueId)
            || (detail?.id === issueId ? detail : null);
        const assigneeOptions = getAssigneeOptionList({ keepId: issue?.assignee_id || null });
        dropdown.innerHTML = `
            <div class="dropdown-header">Assign to...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="assignee_id" data-value="__null__">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${assigneeOptions.length === 0 ? `
                <div class="dropdown-empty">No team members or agents found</div>
            ` : assigneeOptions.map(({ assignee, indent }, i) => {
                return `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="assignee_id" data-value="${escapeAttr(assignee.id)}">
                    ${renderAvatar(assignee, 'avatar-small')}
                    <span>${formatAssigneeOptionLabel(assignee, indent)}</span>
                    ${i < 9 ? `<span class="dropdown-shortcut">${i + 1}</span>` : ''}
                </button>
            `}).join('')}
        `;
    } else if (type === 'estimate') {
        // Get project_id from issue row or detail view
        const issueRow = document.querySelector(`.issue-row[data-issue-id="${issueId}"]`);
        const projectId = issueRow?.dataset.projectId || getCurrentDetailIssue()?.project_id;
        const estimateOptions = getEstimateOptions(projectId);
        dropdown.innerHTML = `
            <div class="dropdown-header">Set estimate...</div>
            ${estimateOptions.map((est, i) => `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="estimate" data-value="${est.value}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    <span>${est.label}</span>
                    ${i < 9 ? `<span class="dropdown-shortcut">${i}</span>` : ''}
                </button>
            `).join('')}
        `;
    } else if (type === 'labels') {
        const issues = getIssues();
        const myIssues = getMyIssues();
        const currentDetailIssue = getCurrentDetailIssue();
        const issue = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId) || currentDetailIssue;
        const currentLabelIds = new Set((issue?.labels || []).map(l => l.id));

        dropdown.innerHTML = `<div class="dropdown-header">Loading labels...</div>`;
        dropdown.classList.add('dropdown-positioning');
        document.body.appendChild(dropdown);

        const dropdownRect = dropdown.getBoundingClientRect();
        let top = rect.bottom + 4;
        let left = rect.left;
        if (left + dropdownRect.width > window.innerWidth - 8) left = rect.right - dropdownRect.width;
        if (top + dropdownRect.height > window.innerHeight - 8) top = rect.top - dropdownRect.height - 4;
        dropdown.style.top = `${top}px`;
        dropdown.style.left = `${Math.max(8, left)}px`;

        // Multi-select: only close when clicking outside the dropdown
        registerDropdownClickOutside(dropdown, { multiSelect: true });

        let teamLabels = [];
        const currentTeam = getCurrentTeam();
        if (currentTeam) {
            try {
                teamLabels = await api.getLabels(currentTeam.id);
            } catch (e) {
                console.error('Failed to load labels:', e);
            }
        }

        if (!dropdown.parentNode) return;

        renderLabelDropdownContent(dropdown, issueId, teamLabels, currentLabelIds);

        // Reposition after content
        const finalRect = dropdown.getBoundingClientRect();
        let topFinal = rect.bottom + 4;
        let leftFinal = rect.left;
        if (leftFinal + finalRect.width > window.innerWidth - 8) leftFinal = rect.right - finalRect.width;
        if (topFinal + finalRect.height > window.innerHeight - 8) topFinal = rect.top - finalRect.height - 4;
        dropdown.style.top = `${topFinal}px`;
        dropdown.style.left = `${Math.max(8, leftFinal)}px`;
        dropdown.classList.remove('dropdown-positioning');

        return; // already appended and positioned
    } else if (type === 'sprint') {
        // Find the issue's project and current sprint
        const issues = getIssues();
        const myIssues = getMyIssues();
        const currentDetailIssue = getCurrentDetailIssue();
        const issue = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId) || currentDetailIssue;
        const projectId = issue?.project_id || document.querySelector(`.issue-row[data-issue-id="${issueId}"]`)?.dataset.projectId;

        // Show loading state, then fetch sprints
        dropdown.innerHTML = `<div class="dropdown-header">Loading sprints...</div>`;
        dropdown.classList.add('dropdown-positioning');
        document.body.appendChild(dropdown);

        const dropdownRect = dropdown.getBoundingClientRect();
        let top = rect.bottom + 4;
        let left = rect.left;
        if (left + dropdownRect.width > window.innerWidth - 8) left = rect.right - dropdownRect.width;
        if (top + dropdownRect.height > window.innerHeight - 8) top = rect.top - dropdownRect.height - 4;
        dropdown.style.top = `${top}px`;
        dropdown.style.left = `${Math.max(8, left)}px`;

        registerDropdownClickOutside(dropdown);

        let sprintList = [];
        if (projectId) {
            try {
                sprintList = await api.getSprints(projectId);
                // Populate sprint cache so row re-renders show sprint names
                updateSprintCacheForProject(projectId, sprintList);
            } catch (e) {
                console.error('Failed to load sprints:', e);
            }
        }
        // Guard: if dropdown was removed during async fetch, bail out
        if (!dropdown.parentNode) return;

        const available = sprintList.filter(s => s.status !== 'completed' || s.id === issue?.sprint_id);
        dropdown.innerHTML = `
            <div class="dropdown-header">Assign to sprint...</div>
            <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="sprint_id" data-value="__null__">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span>No Sprint</span>
                <span class="dropdown-shortcut">0</span>
            </button>
            ${available.map((sprint, i) => `
                <button class="dropdown-option" data-action="update-issue-field" data-issue-id="${escapeAttr(issueId)}" data-field="sprint_id" data-value="${escapeAttr(sprint.id)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    <span>${escapeHtml(sprint.name)}${sprint.status === 'active' ? ' (Active)' : ''}</span>
                    ${i < 9 ? `<span class="dropdown-shortcut">${i + 1}</span>` : ''}
                </button>
            `).join('')}
        `;

        // Reposition after content loaded (size may have changed)
        const finalRect = dropdown.getBoundingClientRect();
        let topFinal = rect.bottom + 4;
        let leftFinal = rect.left;
        if (leftFinal + finalRect.width > window.innerWidth - 8) leftFinal = rect.right - finalRect.width;
        if (topFinal + finalRect.height > window.innerHeight - 8) topFinal = rect.top - finalRect.height - 4;
        dropdown.style.top = `${topFinal}px`;
        dropdown.style.left = `${Math.max(8, leftFinal)}px`;
        dropdown.classList.remove('dropdown-positioning');

        // Register keyboard handler for sprint dropdown
        const sprintKeyHandler = (e) => {
            const key = e.key;
            // Escape cancels; Tab moves on — either way the popup shouldn't be
            // left open. Don't preventDefault Tab so focus still advances. (CHT-1215)
            if (key === 'Escape' || key === 'Tab') {
                closeAllDropdowns();
                document.removeEventListener('keydown', sprintKeyHandler);
                setDropdownKeyHandler(null);
                return;
            }
            // Arrow/Home/End move focus across the options (CHT-1290)
            if (handleDropdownArrowKeys(e, dropdown)) return;
            const num = parseInt(key);
            if (isNaN(num)) return;
            const sprintButtons = dropdown.querySelectorAll('.dropdown-option');
            let shouldClose = false;
            if (num === 0) {
                updateIssueField(issueId, 'sprint_id', null);
                shouldClose = true;
            } else if (num >= 1 && num < sprintButtons.length) {
                sprintButtons[num].click();
                shouldClose = true;
            }
            if (shouldClose) {
                document.removeEventListener('keydown', sprintKeyHandler);
                setDropdownKeyHandler(null);
            }
        };
        setDropdownKeyHandler(sprintKeyHandler);
        document.addEventListener('keydown', sprintKeyHandler);

        // Focus the first option so Arrow/Enter work immediately (CHT-1290)
        dropdown.querySelector('.dropdown-option[data-action]')?.focus();

        return; // already appended and positioned
    }

    // Hide dropdown during positioning to prevent visible jump (CHT-155)
    dropdown.classList.add('dropdown-positioning');
    document.body.appendChild(dropdown);

    // Position dropdown - check if it goes off-screen
    const dropdownRect = dropdown.getBoundingClientRect();
    let top = rect.bottom + 4;
    let left = rect.left;

    // If dropdown goes off right edge, align to right of button instead
    if (left + dropdownRect.width > window.innerWidth - 8) {
        left = rect.right - dropdownRect.width;
    }

    // If dropdown goes off bottom, show above button
    if (top + dropdownRect.height > window.innerHeight - 8) {
        top = rect.top - dropdownRect.height - 4;
    }

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${Math.max(8, left)}px`;

    // Show dropdown now that it's positioned
    dropdown.classList.remove('dropdown-positioning');

    // Keyboard shortcut handler
    const keyHandler = (e) => {
        const key = e.key;
        // Escape cancels; Tab moves on — either way the popup shouldn't be
        // left open. Don't preventDefault Tab so focus still advances. (CHT-1215)
        if (key === 'Escape' || key === 'Tab') {
            closeAllDropdowns();
            document.removeEventListener('keydown', keyHandler);
            return;
        }

        // Arrow/Home/End move focus across the options (CHT-1290)
        if (handleDropdownArrowKeys(e, dropdown)) return;

        const num = parseInt(key);
        if (isNaN(num)) return;

        let shouldClose = false;
        if (type === 'status' && num >= 1 && num <= 6) {
            updateIssueField(issueId, 'status', STATUS_OPTIONS[num - 1]);
            shouldClose = true;
        } else if (type === 'priority' && num >= 0 && num <= 4) {
            updateIssueField(issueId, 'priority', PRIORITY_OPTIONS[num]);
            shouldClose = true;
        } else if (type === 'estimate') {
            const issue = getCurrentDetailIssue();
            const estimateOptions = getEstimateOptions(issue?.project_id);
            if (num >= 0 && num < estimateOptions.length) {
                updateIssueField(issueId, 'estimate', estimateOptions[num].value);
                shouldClose = true;
            }
        }

        if (shouldClose) {
            document.removeEventListener('keydown', keyHandler);
            setDropdownKeyHandler(null);
        }
    };

    setDropdownKeyHandler(keyHandler);
    document.addEventListener('keydown', keyHandler);

    // Focus the first option so Arrow/Enter work immediately (CHT-1290)
    dropdown.querySelector('.dropdown-option[data-action]')?.focus();

    // Close on click outside
    registerDropdownClickOutside(dropdown);
}

/**
 * Show dropdown from detail view
 * @param {Event} event - Click event
 * @param {string} type - Dropdown type
 * @param {string} issueId - Issue ID
 * @param {Element} [anchorEl] - Element to anchor dropdown to (defaults to event.currentTarget)
 */
export function showDetailDropdown(event, type, issueId, anchorEl) {
    showInlineDropdown(event, type, issueId, anchorEl);
}

/**
 * Toggle a label on an issue (queued to prevent race conditions)
 * @param {string} issueId - Issue ID
 * @param {string} labelId - Label ID to toggle
 * @param {Element|null} buttonEl - Button element for immediate UI feedback
 */
export function toggleIssueLabel(issueId, labelId, buttonEl) {
    _labelToggleQueue = _labelToggleQueue.then(() => _doToggleIssueLabel(issueId, labelId, buttonEl));
}

async function _doToggleIssueLabel(issueId, labelId, buttonEl) {
    const issues = getIssues();
    const myIssues = getMyIssues();
    const currentDetailIssue = getCurrentDetailIssue();
    const issue = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId) || currentDetailIssue;
    if (!issue) return;

    const currentLabelIds = (issue.labels || []).map(l => l.id);
    const idx = currentLabelIds.indexOf(labelId);
    let newLabelIds;
    if (idx >= 0) {
        newLabelIds = currentLabelIds.filter(id => id !== labelId);
    } else {
        newLabelIds = [...currentLabelIds, labelId];
    }

    // Update button UI immediately
    if (buttonEl) {
        const isNowSelected = idx < 0;
        buttonEl.classList.toggle('selected', isNowSelected);
        buttonEl.querySelector('.label-check').textContent = isNowSelected ? '✓' : '';
    }

    try {
        const updated = await api.updateIssue(issueId, { label_ids: newLabelIds });

        // Update local state, as it is now: a list response may have
        // replaced it during the request. A new row, with the server's
        // updated_at, so it reads as newer than an answer computed before
        // the toggle (CHT-1921 review I2).
        const updatedLabels = updated.labels || [];
        const withLabels = (row) => ({
            ...row, labels: updatedLabels, updated_at: updated.updated_at ?? row.updated_at,
        });
        const issuesNow = getIssues();
        if (issuesNow.some(i => i.id === issueId)) {
            setIssues(issuesNow.map(i => (i.id === issueId ? withLabels(i) : i)));
        }
        const myIssuesNow = getMyIssues();
        if (myIssuesNow.some(i => i.id === issueId)) {
            setMyIssues(myIssuesNow.map(i => (i.id === issueId ? withLabels(i) : i)));
        }
        const detailNow = getCurrentDetailIssue();
        if (detailNow?.id === issueId) {
            setCurrentDetailIssue(withLabels(detailNow));
        }

        // Re-render the row if visible
        const row = visibleIssueRow(issueId);
        if (row && row.parentNode) {
            const issueData = getIssues().find(i => i.id === issueId) || getMyIssues().find(i => i.id === issueId);
            if (issueData) row.outerHTML = renderIssueRow(issueData);
        }

        // Update detail view labels display inline (don't re-render whole detail view to preserve dropdown)
        const detailLabelsBtn = document.querySelector('.property-labels-btn');
        if (detailLabelsBtn) {
            detailLabelsBtn.innerHTML = updatedLabels.length > 0
                ? updatedLabels.map(label => `
                    <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                `).join('')
                : '<span class="text-muted">No Labels</span>';
        }
    } catch (e) {
        showApiError('update labels', e);
        // Revert UI
        if (buttonEl) {
            const wasSelected = idx >= 0;
            buttonEl.classList.toggle('selected', wasSelected);
            buttonEl.querySelector('.label-check').textContent = wasSelected ? '✓' : '';
        }
    }
}

/**
 * Render label dropdown content
 * @param {Element} dropdown - Dropdown element
 * @param {string} issueId - Issue ID
 * @param {Array} teamLabels - Available labels
 * @param {Set} currentLabelIds - Currently selected label IDs
 */
export function renderLabelDropdownContent(dropdown, issueId, teamLabels, currentLabelIds) {
    dropdown.dataset.dropdownType = 'labels';
    dropdown.dataset.issueId = issueId;
    dropdown.innerHTML = `
        <div class="dropdown-header">Toggle labels...</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="label-create-key" data-issue-id="${escapeAttr(issueId)}">
            <button class="btn btn-small" data-action="create-label-from-dropdown" data-issue-id="${escapeAttr(issueId)}">Add</button>
        </div>
        ${teamLabels.length === 0 ? '<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>' : ''}
        ${teamLabels.map(label => {
            const checked = currentLabelIds.has(label.id);
            return `
                <button class="dropdown-option label-toggle ${checked ? 'selected' : ''}" data-action="toggle-issue-label" data-issue-id="${escapeAttr(issueId)}" data-label-id="${escapeAttr(label.id)}">
                    <span class="label-check">${checked ? '✓' : ''}</span>
                    <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                </button>
            `;
        }).join('')}
    `;
}

/**
 * Handle Enter key in label create input
 * @param {Event} event - Keyboard event
 * @param {string} issueId - Issue ID
 */
export function handleLabelCreateKey(event, issueId) {
    if (event.key === 'Enter') {
        event.preventDefault();
        createLabelFromDropdown(issueId);
    }
}

/**
 * Create a new label from the dropdown and add it to the issue
 * @param {string} issueId - Issue ID
 */
export async function createLabelFromDropdown(issueId) {
    const dropdown = document.querySelector(`.inline-dropdown[data-dropdown-type="labels"][data-issue-id="${issueId}"]`);
    const input = dropdown?.querySelector('.label-create-input');
    const currentTeam = getCurrentTeam();
    if (!input || !currentTeam) return;
    const name = input.value.trim();
    if (!name) return;

    input.disabled = true;
    try {
        const created = await api.createLabel(currentTeam.id, { name });
        const labels = await api.getLabels(currentTeam.id);
        setLabels(labels);
        if (created?.id) {
            await _doToggleIssueLabel(issueId, created.id, null);
        }
        const issues = getIssues();
        const myIssues = getMyIssues();
        const currentDetailIssue = getCurrentDetailIssue();
        const issue = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId) || currentDetailIssue;
        const currentLabelIds = new Set((issue?.labels || []).map(l => l.id));
        if (dropdown) {
            renderLabelDropdownContent(dropdown, issueId, labels, currentLabelIds);
        }
        input.value = '';
    } catch (e) {
        showApiError('create label', e);
    } finally {
        input.disabled = false;
        input.focus();
    }
}

/**
 * Update the labels label in create issue modal
 */
export function updateCreateIssueLabelsLabel() {
    const label = document.getElementById('create-issue-labels-label');
    if (!label) return;
    if (createIssueLabelIds.length === 0) {
        label.textContent = 'Labels';
    } else {
        label.textContent = `Labels (${createIssueLabelIds.length})`;
    }
}

/**
 * Render label dropdown for create issue modal
 * @param {Element} dropdown - Dropdown element
 */
export function renderCreateIssueLabelDropdown(dropdown, { failed = false } = {}) {
    const labels = getLabels();
    dropdown.dataset.dropdownType = 'create-labels';
    dropdown.innerHTML = `
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." data-action="create-issue-label-key">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${labels.length === 0 ? (
            // CHT-1224: a fetch failure used to fall through to this same
            // "No labels available" markup — identical to a team that has
            // genuinely never created a label. Render a distinct message,
            // error-tinted (PR #211 review finding 3) rather than just
            // differently worded.
            failed
                ? '<div class="dropdown-option dropdown-option-error" style="pointer-events: none"><span>Couldn\'t load labels</span></div>'
                : '<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>'
        ) : ''}
        ${labels.map(label => {
            const checked = createIssueLabelIds.includes(label.id);
            return `
                <button class="dropdown-option label-toggle ${checked ? 'selected' : ''}" data-action="toggle-create-issue-label" data-label-id="${escapeAttr(label.id)}">
                    <span class="label-check">${checked ? '✓' : ''}</span>
                    <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                </button>
            `;
        }).join('')}
    `;
}

/**
 * Toggle label selection in create issue modal
 * @param {string} labelId - Label ID to toggle
 */
export function toggleCreateIssueLabelSelection(labelId) {
    const idx = createIssueLabelIds.indexOf(labelId);
    if (idx >= 0) {
        createIssueLabelIds.splice(idx, 1);
    } else {
        createIssueLabelIds.push(labelId);
    }
    markModalDirty(); // labels live in module state, not the form (CHT-1231)
    updateCreateIssueLabelsLabel();
    const dropdown = document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');
    if (dropdown) {
        renderCreateIssueLabelDropdown(dropdown);
    }
}

/**
 * Handle Enter key in create issue label input
 * @param {Event} event - Keyboard event
 */
export function handleCreateIssueLabelKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        createLabelForCreateIssue();
    }
}

/**
 * Create a new label from create issue modal
 */
export async function createLabelForCreateIssue() {
    const currentTeam = getCurrentTeam();
    if (!currentTeam) return;
    const dropdown = document.querySelector('.inline-dropdown[data-dropdown-type="create-labels"]');
    const input = dropdown?.querySelector('.label-create-input');
    if (!input) return;
    const name = input.value.trim();
    if (!name) return;

    input.disabled = true;
    try {
        const created = await api.createLabel(currentTeam.id, { name });
        const labels = await api.getLabels(currentTeam.id);
        setLabels(labels);
        if (created?.id && !createIssueLabelIds.includes(created.id)) {
            createIssueLabelIds.push(created.id);
            markModalDirty();
        }
        updateCreateIssueLabelsLabel();
        if (dropdown) {
            renderCreateIssueLabelDropdown(dropdown);
        }
        input.value = '';
    } catch (e) {
        showApiError('create label', e);
    } finally {
        input.disabled = false;
        input.focus();
    }
}

/**
 * Update an issue field via API
 * @param {string} issueId - Issue ID
 * @param {string} field - Field name to update
 * @param {*} value - New value
 */
export async function updateIssueField(issueId, field, value) {
    closeAllDropdowns();

    // Optimistic (CHT-1895): show the new value at once, send the request,
    // and put the old value back if it fails. The server's row replaces the
    // guess when it answers, since one change can move others with it
    // (completed_at, a sprint's points).
    //
    // Only this field is guessed and only this field is rolled back, each
    // copy (Issues list, My Issues, open detail) from its own value, so a
    // failure can't undo another edit or a /ws update that landed during
    // the flight. A newer edit to the same field owns it: an older
    // request's answer or failure leaves it alone (CHT-1895 review I4, I5).
    const seq = beginFieldEdit(issueId, field, value);
    const previousValues = fieldValues(issueId, field);
    const previousStored = getStoredIssue(issueId)?.[field];
    const guessed = patchFieldEverywhere(issueId, field, () => value);
    if (guessed) showIssueLocally(issueId, field, { focus: true });

    try {
        const updateData = {};
        updateData[field] = value;
        // API returns the full updated issue - use it to update local state completely
        const updatedIssue = await api.updateIssue(issueId, updateData);

        // Defensive check - ensure we got a valid response
        if (!updatedIssue || !updatedIssue.id) {
            throw new Error('Invalid response from server');
        }
        // Closing the last open child of an epic asks what next (CHT-1901).
        handleCloseFollowups(updatedIssue);

        // Update local state with full issue object (not just the changed
        // field), so related fields like completed_at are updated too. A
        // field another edit still has in flight keeps that edit's value.
        if (isCurrentFieldEdit(issueId, field, seq)) {
            const merged = { ...updatedIssue, ...otherFieldsInFlight(issueId, field) };
            replaceIssueEverywhere(issueId, { issue: merged, myIssue: merged, detail: merged });
            // Even if the row has left every list since the guess.
            upsertIssue(merged);
            showIssueLocally(issueId, field, { focus: !guessed });
        }
    } catch (error) {
        showApiError('update issue', error);
        if (isCurrentFieldEdit(issueId, field, seq)) {
            patchFieldEverywhere(issueId, field, (copy, which) => (
                copy[field] === value ? previousValues[which] : copy[field]
            ));
            // The store took the guess; take it back there too, even if
            // the row has left every list since (CHT-1915 review M3).
            const stored = getStoredIssue(issueId);
            if (stored && stored[field] === value) upsertIssue({ ...stored, [field]: previousStored });
            showIssueLocally(issueId, field, { focus: false });
        }
        return;
    } finally {
        endFieldEdit(issueId, field, seq);
    }

    // The update has landed: nothing below may roll it back.
    showToast('Issue updated', 'success');

    // Refresh sprint budget bar if status changed (may affect points_spent)
    if (field === 'status') {
        try {
            const projectId = getCurrentProject();
            if (projectId) {
                const sprints = await api.getSprints(projectId);
                const activeSprint = sprints.find(s => s.status === 'active');
                updateSprintBudgetBar(activeSprint || null);
            }
        } catch { /* non-critical */ }
    }
}

// Fields the detail sidebar shows, so an edit to them updates it in place.
const DETAIL_SIDEBAR_FIELDS = new Set(['sprint_id', 'status', 'priority', 'assignee_id', 'estimate', 'issue_type']);

// issueId -> Map(field -> { seq, value }): the inline edits in flight.
const fieldEditsInFlight = new Map();

/**
 * The issue with every field edit still in flight applied: a list response
 * computed before the edit must not paint the old value (CHT-1921).
 */
export function withEditsInFlight(issue) {
    const edits = issue && fieldEditsInFlight.get(issue.id);
    if (!edits?.size) return issue;
    const out = { ...issue };
    edits.forEach((edit, field) => { out[field] = edit.value; });
    return out;
}
let fieldEditSeq = 0;

function beginFieldEdit(issueId, field, value) {
    const seq = ++fieldEditSeq;
    if (!fieldEditsInFlight.has(issueId)) fieldEditsInFlight.set(issueId, new Map());
    fieldEditsInFlight.get(issueId).set(field, { seq, value });
    return seq;
}

function isCurrentFieldEdit(issueId, field, seq) {
    return fieldEditsInFlight.get(issueId)?.get(field)?.seq === seq;
}

function endFieldEdit(issueId, field, seq) {
    const edits = fieldEditsInFlight.get(issueId);
    if (edits?.get(field)?.seq !== seq) return;
    edits.delete(field);
    if (edits.size === 0) fieldEditsInFlight.delete(issueId);
}

function otherFieldsInFlight(issueId, field) {
    const out = {};
    fieldEditsInFlight.get(issueId)?.forEach((edit, f) => { if (f !== field) out[f] = edit.value; });
    return out;
}

/** The field's value in each copy that holds the issue. */
function fieldValues(issueId, field) {
    const detail = getCurrentDetailIssue();
    return {
        issue: getIssues().find(i => i.id === issueId)?.[field],
        myIssue: getMyIssues().find(i => i.id === issueId)?.[field],
        detail: detail?.id === issueId ? detail[field] : undefined,
    };
}

/**
 * Set one field in every copy that holds the issue, each from its own row:
 * `next(copy, which)` returns the new value. Returns whether any copy held it.
 */
function patchFieldEverywhere(issueId, field, next) {
    const patch = (copy, which) => ({ ...copy, [field]: next(copy, which) });
    let found = false;
    const issues = getIssues();
    if (issues.some(i => i.id === issueId)) {
        found = true;
        setIssues(issues.map(i => (i.id === issueId ? patch(i, 'issue') : i)));
    }
    const myIssues = getMyIssues();
    if (myIssues.some(i => i.id === issueId)) {
        found = true;
        setMyIssues(myIssues.map(i => (i.id === issueId ? patch(i, 'myIssue') : i)));
    }
    const detail = getCurrentDetailIssue();
    if (detail?.id === issueId) {
        found = true;
        setCurrentDetailIssue(patch(detail, 'detail'));
    }
    return found;
}

/**
 * Put one version of an issue into the issues state, my-issues state and
 * the open detail, wherever each already holds it.
 * @param {string} issueId
 * @param {{issue?: Object|null, myIssue?: Object|null, detail?: Object|null}} versions
 */
function replaceIssueEverywhere(issueId, versions) {
    const issues = getIssues();
    if (versions.issue && issues.some(i => i.id === issueId)) {
        setIssues(issues.map(i => (i.id === issueId ? versions.issue : i)));
    }
    const myIssues = getMyIssues();
    if (versions.myIssue && myIssues.some(i => i.id === issueId)) {
        setMyIssues(myIssues.map(i => (i.id === issueId ? versions.myIssue : i)));
    }
    if (versions.detail && getCurrentDetailIssue()?.id === issueId) {
        setCurrentDetailIssue(versions.detail);
    }
}

/**
 * Whether an edit to `field` changes anything on the Issues list outside
 * the row itself: the summary's points (estimate) or the row's group.
 * Only then is the whole list re-rendered; a full render costs every
 * painted row and resets what lives only in the DOM (CHT-1915 review M1).
 */
function editChangesListLayout(field) {
    return field === 'estimate' || GROUP_FIELD[getGroupByValue()] === field;
}

function rerenderIssueRow(issueId, field, issue, { focus }) {
    const row = visibleIssueRow(issueId);
    if (!row || !row.parentNode || !issue) return;
    // The server's answer re-renders a row the optimistic paint already
    // focused: keep the focus where it was.
    const hadFocus = row.contains(document.activeElement);
    const onShownList = row.closest('#issues-list') && !row.closest('.view.hidden');
    if (onShownList && editChangesListLayout(field) && getIssues().some(i => i.id === issueId)) {
        // The summary points or the row's group follow the edit at once
        // (CHT-1915). renderIssues keeps the keyboard selection, and only
        // paints the rows on screen straight away.
        renderIssues();
    } else if (field === 'status' && row.closest('#my-issues-list')) {
        // The Dashboard groups by status: the row moves group at once
        // (CHT-1963). renderMyIssues keeps the keyboard cursor by id.
        renderMyIssues();
    } else {
        const wasSelected = row.classList.contains('keyboard-selected');
        row.outerHTML = renderIssueRow(issue);
        if (wasSelected) visibleIssueRow(issueId)?.classList.add('keyboard-selected');
    }
    if (!focus && !hadFocus) return;
    // Return focus to the field's trigger button on the fresh row
    // (CHT-1293): closeAllDropdowns + this re-render dropped the focused
    // option, stranding a keyboard user on <body>. Focus the re-rendered
    // trigger (mirrors standard menu-close focus return) so j/k and
    // re-opening keep working. A row that moved group may be far off:
    // don't scroll the page to it.
    const newRow = visibleIssueRow(issueId);
    const dropdownType = DROPDOWN_TYPE_FOR_FIELD[field];
    const trigger = dropdownType && newRow?.querySelector(`[data-dropdown-type="${dropdownType}"]`);
    if (trigger) trigger.focus({ preventScroll: true });
}

// Re-render the row and the detail sidebar from the state as it now is.
function showIssueLocally(issueId, field, { focus }) {
    const row = getIssues().find(i => i.id === issueId) || getMyIssues().find(i => i.id === issueId);
    // The store saves the Issues list only while that view is up; a guess
    // or a rollback made from elsewhere must reach it too, or the next
    // visit paints a value the server never had (CHT-1915).
    if (row) upsertIssue(row);
    rerenderIssueRow(issueId, field, row, { focus });
    const detail = getCurrentDetailIssue();
    if (detail?.id === issueId && DETAIL_SIDEBAR_FIELDS.has(field)) updateDetailViewField(field, detail);
}

/**
 * Update a specific field in the detail view sidebar
 * @param {string} field - Field name that changed
 * @param {Object} updatedIssue - Updated issue object
 */
export function updateDetailViewField(field, updatedIssue) {
    // Updates a specific field in the detail view sidebar without reloading the entire view
    const detailView = document.getElementById('issue-detail-view');
    if (!detailView || detailView.classList.contains('hidden')) return;

    const sidebar = detailView.querySelector('.detail-sidebar');
    if (!sidebar) return;

    // Find the property row for this field
    let fieldName = field;
    if (field === 'assignee_id') fieldName = 'assignee';
    if (field === 'sprint_id') fieldName = 'sprint';
    if (field === 'issue_type') fieldName = 'type';

    // Find the property row by looking for the label
    const propertyRows = sidebar.querySelectorAll('.property-row');
    let targetRow = null;
    for (const row of propertyRows) {
        const label = row.querySelector('.property-label');
        if (label && label.textContent.toLowerCase() === fieldName.toLowerCase()) {
            targetRow = row;
            break;
        }
    }

    if (!targetRow) return;

    const valueButton = targetRow.querySelector('.property-value');
    if (!valueButton) return;

    // Update the button content based on the field type
    if (field === 'status') {
        valueButton.innerHTML = `
            ${getStatusIcon(updatedIssue.status)}
            <span>${formatStatus(updatedIssue.status)}</span>
        `;
    } else if (field === 'priority') {
        valueButton.innerHTML = `
            ${getPriorityIcon(updatedIssue.priority)}
            <span>${formatPriority(updatedIssue.priority)}</span>
        `;
    } else if (field === 'issue_type') {
        valueButton.innerHTML = `
            <span class="issue-type-badge type-${updatedIssue.issue_type || 'task'}">${formatIssueType(updatedIssue.issue_type)}</span>
        `;
    } else if (field === 'assignee_id') {
        const assignee = updatedIssue.assignee_id ? getAssigneeById(updatedIssue.assignee_id) : null;
        const assigneeName = assignee ? formatAssigneeName(assignee) : null;
        valueButton.innerHTML = assigneeName
            ? `${renderAvatar(assignee, 'avatar-small')}<span>${escapeHtml(assigneeName)}</span>`
            : `<span class="text-muted">Unassigned</span>`;
    } else if (field === 'sprint_id') {
        const currentDetailSprints = getCurrentDetailSprints();
        const currentSprint = updatedIssue.sprint_id && currentDetailSprints
            ? currentDetailSprints.find(s => s.id === updatedIssue.sprint_id)
            : null;
        valueButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            <span>${currentSprint ? escapeHtml(currentSprint.name) : '<span class="text-muted">No Sprint</span>'}</span>
        `;
    } else if (field === 'estimate') {
        valueButton.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${formatEstimate(updatedIssue.estimate, updatedIssue.project_id)}</span>
        `;
    }

    // Add a subtle animation to indicate the change
    valueButton.classList.add('updated');
    setTimeout(() => valueButton.classList.remove('updated'), 500);

    // Return focus to the property row's trigger button (CHT-1297): unlike
    // the list-row path (updateIssueField, CHT-1293), the detail view keeps
    // the same DOM instead of re-rendering, but the picked-from trigger is
    // still stranded without this — closeAllDropdowns drops the focused
    // option and nothing here claims focus, leaving a keyboard user on
    // <body>. valueButton is the same trigger the row's click/data-action
    // opened the dropdown from, so just re-focus it; guard defensively in
    // case it's ever missing.
    valueButton?.focus();
}

// Register delegated event handlers (CHT-1062)
registerActions({
    'update-issue-field': (event, data) => {
        // Enter/Space on the option already ran this on keydown: stop the
        // browser's own click, which would land on the trigger the choice
        // just focused and re-open the menu (CHT-1993).
        if (event.type === 'keydown') event.preventDefault();
        const value = data.value === '__null__' ? null : data.value;
        const field = data.field;
        // estimate field needs numeric conversion
        if (field === 'estimate') {
            updateIssueField(data.issueId, field, value === 'null' ? null : Number(value));
        } else {
            updateIssueField(data.issueId, field, value);
        }
    },
    'toggle-issue-label': (event, data, target) => {
        if (event.type === 'keydown') event.preventDefault(); // CHT-1993: no second, native click
        toggleIssueLabel(data.issueId, data.labelId, target);
    },
    'create-label-from-dropdown': (event, data) => {
        createLabelFromDropdown(data.issueId);
    },
    'toggle-create-issue-label': (event, data) => {
        toggleCreateIssueLabelSelection(data.labelId);
    },
    'create-label-for-create-issue': () => {
        createLabelForCreateIssue();
    },
    'label-create-key': (event, data) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            createLabelFromDropdown(data.issueId);
        }
    },
    'create-issue-label-key': (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            createLabelForCreateIssue();
        }
    },
});
