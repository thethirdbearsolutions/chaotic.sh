/**
 * Inline dropdown module - Issue field editing dropdowns (CHT-667)
 * Extracted from app.js for testability
 */

import { api } from './api.js';
import { getIssues, setIssues, getLabels, setLabels, getCurrentTeam, getCurrentDetailIssue, setCurrentDetailIssue, getCurrentDetailSprints } from './state.js';
import { getMyIssues, setMyIssues } from './dashboard.js';
import { closeAllDropdowns, registerDropdownClickOutside, setDropdownKeyHandler, showToast } from './ui.js';
import { getStatusIcon, getPriorityIcon, renderIssueRow } from './issue-list.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeJsString, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { registerActions } from './event-delegation.js';
import { formatEstimate, getEstimateOptions } from './projects.js';
import { formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList, getAssigneeById } from './assignees.js';
import { updateSprintCacheForProject } from './sprints.js';
import { updateSprintBudgetBar } from './issues-view.js';

// Dropdown options
export const STATUS_OPTIONS = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'];
export const PRIORITY_OPTIONS = ['no_priority', 'urgent', 'high', 'medium', 'low'];
export const ISSUE_TYPE_OPTIONS = ['task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'epic'];

// Module state
let createIssueLabelIds = [];
let _labelToggleQueue = Promise.resolve();

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
        const assigneeOptions = getAssigneeOptionList();
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
            if (key === 'Escape') {
                closeAllDropdowns();
                document.removeEventListener('keydown', sprintKeyHandler);
                setDropdownKeyHandler(null);
                return;
            }
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
        if (key === 'Escape') {
            closeAllDropdowns();
            document.removeEventListener('keydown', keyHandler);
            return;
        }

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

    // Close on click outside
    registerDropdownClickOutside(dropdown);
}

/**
 * Show dropdown from detail view (with stopPropagation)
 * @param {Event} event - Click event
 * @param {string} type - Dropdown type
 * @param {string} issueId - Issue ID
 * @param {Element} [anchorEl] - Element to anchor dropdown to (defaults to event.currentTarget)
 */
export function showDetailDropdown(event, type, issueId, anchorEl) {
    event.stopPropagation();
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

        // Update local state
        const updatedLabels = updated.labels || [];
        const issueIndex = issues.findIndex(i => i.id === issueId);
        if (issueIndex !== -1) {
            issues[issueIndex].labels = updatedLabels;
            setIssues([...issues]);
        }
        const myIssueIndex = myIssues.findIndex(i => i.id === issueId);
        if (myIssueIndex !== -1) {
            myIssues[myIssueIndex].labels = updatedLabels;
            setMyIssues([...myIssues]);
        }
        if (currentDetailIssue?.id === issueId) {
            setCurrentDetailIssue({ ...currentDetailIssue, labels: updatedLabels });
        }

        // Re-render the row if visible
        const row = document.querySelector(`.issue-row[data-issue-id="${issueId}"]`);
        if (row && row.parentNode) {
            const issueData = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId);
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
    } catch {
        showToast('Failed to update labels', 'error');
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
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleLabelCreateKey(event, '${escapeJsString(issueId)}')">
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
        showToast(e.message || 'Failed to create label', 'error');
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
export function renderCreateIssueLabelDropdown(dropdown) {
    const labels = getLabels();
    dropdown.dataset.dropdownType = 'create-labels';
    dropdown.innerHTML = `
        <div class="dropdown-header">Labels</div>
        <div class="label-create-row">
            <input type="text" class="label-create-input" placeholder="New label..." onkeydown="handleCreateIssueLabelKey(event)">
            <button class="btn btn-small" data-action="create-label-for-create-issue">Add</button>
        </div>
        ${labels.length === 0 ? '<div class="dropdown-option" style="opacity: 0.5; pointer-events: none"><span>No labels available</span></div>' : ''}
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
        }
        updateCreateIssueLabelsLabel();
        if (dropdown) {
            renderCreateIssueLabelDropdown(dropdown);
        }
        input.value = '';
    } catch (e) {
        showToast(e.message || 'Failed to create label', 'error');
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

    const row = document.querySelector(`.issue-row[data-issue-id="${issueId}"]`);
    if (row) row.classList.add('updating');

    try {
        const updateData = {};
        updateData[field] = value;
        // API returns the full updated issue - use it to update local state completely
        const updatedIssue = await api.updateIssue(issueId, updateData);

        // Defensive check - ensure we got a valid response
        if (!updatedIssue || !updatedIssue.id) {
            throw new Error('Invalid response from server');
        }

        // Update local state with full issue object (not just the changed field)
        // This ensures related fields like completed_at are also updated
        const issues = getIssues();
        const issueIndex = issues.findIndex(i => i.id === issueId);
        if (issueIndex !== -1) {
            issues[issueIndex] = updatedIssue;
            setIssues([...issues]);
        }
        const myIssues = getMyIssues();
        const myIssueIndex = myIssues.findIndex(i => i.id === issueId);
        if (myIssueIndex !== -1) {
            myIssues[myIssueIndex] = updatedIssue;
            setMyIssues([...myIssues]);
        }
        // Update detail view state if this issue is currently being viewed
        const currentDetailIssue = getCurrentDetailIssue();
        if (currentDetailIssue?.id === issueId) {
            setCurrentDetailIssue(updatedIssue);
        }

        // Re-render the specific row
        if (row && row.parentNode) {
            const issue = issues.find(i => i.id === issueId) || myIssues.find(i => i.id === issueId) || updatedIssue;
            if (issue) {
                row.outerHTML = renderIssueRow(issue);
                const newRow = document.querySelector(`.issue-row[data-issue-id="${issueId}"]`);
                if (newRow) {
                    newRow.classList.add('updated');
                    setTimeout(() => newRow.classList.remove('updated'), 500);
                }
            }
        }

        showToast('Issue updated', 'success');

        // Refresh sprint budget bar if status changed (may affect points_spent)
        if (field === 'status') {
            const projectId = document.getElementById('project-filter')?.value;
            if (projectId) {
                try {
                    const sprints = await api.getSprints(projectId);
                    const activeSprint = sprints.find(s => s.status === 'active');
                    updateSprintBudgetBar(activeSprint || null);
                } catch { /* non-critical */ }
            }
        }

        // Refresh detail view if open and a sidebar-displayed field changed
        if (field === 'sprint_id' || field === 'status' || field === 'priority' || field === 'assignee_id' || field === 'estimate' || field === 'issue_type') {
            const detailView = document.getElementById('issue-detail-view');
            if (detailView && !detailView.classList.contains('hidden')) {
                // Update the detail view dynamically instead of reloading
                updateDetailViewField(field, updatedIssue);
            }
        }
    } catch (error) {
        showToast(error.message || 'Failed to update issue', 'error');
        if (row) row.classList.remove('updating');
    }
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

    const sidebar = detailView.querySelector('.issue-detail-sidebar');
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
}

// Register delegated event handlers (CHT-1062)
registerActions({
    'update-issue-field': (event, data) => {
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
});
