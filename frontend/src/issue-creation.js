/**
 * Issue Creation module - Create issue and sub-issue modals (CHT-1034)
 *
 * Extracted from app.js to decouple issue creation logic from the main application module.
 */

import { getCreateIssueLabelIds, setCreateIssueLabelIds, updateCreateIssueLabelsLabel, renderCreateIssueLabelDropdown } from './inline-dropdown.js';
import { getCreateIssueDraft, setCreateIssueDraft, clearCreateIssueDraft } from './storage.js';
import { api } from './api.js';
import { getProjects, getEstimateOptions } from './projects.js';
import { getCurrentView, getLabels, setLabels, getCurrentTeam } from './state.js';
import { showModal, closeModal, showToast, closeAllDropdowns, registerDropdownClickOutside } from './ui.js';
import { viewIssue } from './issue-detail-view.js';
import { loadIssues } from './issues-view.js';
import { loadMyIssues } from './dashboard.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { formatStatus, formatPriority, formatIssueType, renderAvatar, escapeHtml, escapeAttr } from './utils.js';
import { formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList } from './assignees.js';
import { registerActions } from './event-delegation.js';
import { BOARD_STATUSES, PRIORITY_OPTIONS } from './constants.js';

const ISSUE_TEMPLATES = [
    {
        id: 'none',
        label: 'No template',
        title: '',
        description: '',
    },
    {
        id: 'bug',
        label: 'Bug report',
        title: 'Bug: ',
        description: `## Summary

## Steps to Reproduce
1.
2.
3.

## Expected Behavior

## Actual Behavior

## Environment
-

## Notes
`,
    },
    {
        id: 'feature',
        label: 'Feature request',
        title: 'Feature: ',
        description: `## Problem

## Proposed Solution

## Alternatives Considered

## Acceptance Criteria
-
`,
    },
    {
        id: 'task',
        label: 'Task',
        title: 'Task: ',
        description: `## Goal

## Plan
-

## Notes
`,
    },
];

export function showCreateIssueModal(preselectedProjectId = null) {
    const projectId = preselectedProjectId || document.getElementById('project-filter')?.value;
    setCreateIssueLabelIds([]);

    const projectOptions = getProjects().map(p => `
        <option value="${p.id}" ${p.id === projectId ? 'selected' : ''}>${escapeHtml(p.name)}</option>
    `).join('');

    document.getElementById('modal-title').textContent = '';
    document.getElementById('modal-content').innerHTML = `
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" data-action="update-create-project">
                    <option value="">Select project</option>
                    ${projectOptions}
                </select>
                <span class="create-issue-breadcrumb">› New issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" data-action="toggle-create-options">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-options-content">
                    <div class="create-issue-template">
                        <label for="create-issue-template">Template</label>
                        <select id="create-issue-template" data-action="apply-template">
                            ${ISSUE_TEMPLATES.map(t => `<option value="${t.id}">${t.label}</option>`).join('')}
                        </select>
                    </div>
                    <div class="create-issue-meta">
                        <label for="create-issue-due-date">Due date</label>
                        <input type="date" id="create-issue-due-date" class="create-issue-date-input">
                    </div>
                </div>
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                            ${getStatusIcon('backlog')}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${getPriorityIcon('no_priority')}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" data-action="toggle-create-dropdown" data-dropdown-type="type">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" data-action="toggle-create-dropdown" data-dropdown-type="labels">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="assignee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="estimate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="sprint">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span id="create-issue-sprint-label">Sprint</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" id="btn-create-and-new" class="btn btn-secondary" data-action="create-issue-and-new">Create & New</button>
                <button type="button" id="btn-create-issue" class="btn btn-primary" data-action="create-issue-submit">Create issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
            <input type="hidden" id="create-issue-sprint" value="">
        </div>
    `;
    showModal();
    updateCreateIssueLabelsLabel();

    // Restore draft title/description if available (CHT-1041)
    const titleInput = document.getElementById('create-issue-title');
    const descInput = document.getElementById('create-issue-description');
    const draft = getCreateIssueDraft();
    if (draft.title) titleInput.value = draft.title;
    if (draft.description) descInput.value = draft.description;
    // Save drafts on input
    titleInput.addEventListener('input', () => {
        setCreateIssueDraft(titleInput.value, descInput.value);
    });
    descInput.addEventListener('input', () => {
        setCreateIssueDraft(titleInput.value, descInput.value);
    });

    titleInput.focus();
}

export function toggleCreateIssueOptions() {
    const panel = document.getElementById('create-issue-options-panel');
    const toggle = document.getElementById('more-options-toggle');
    if (panel && toggle) {
        panel.classList.toggle('collapsed');
        toggle.classList.toggle('expanded');
    }
}

export function applyIssueTemplate(templateId) {
    const template = ISSUE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    const titleInput = document.getElementById('create-issue-title');
    const descriptionInput = document.getElementById('create-issue-description');
    if (titleInput && template.title !== undefined) {
        titleInput.value = template.title;
    }
    if (descriptionInput && template.description !== undefined) {
        descriptionInput.value = template.description;
    }
}

export function showCreateSubIssueModal(parentId, projectId) {
    const project = getProjects().find(p => p.id === projectId);
    setCreateIssueLabelIds([]);

    document.getElementById('modal-title').textContent = '';
    document.getElementById('modal-content').innerHTML = `
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <span class="project-name">${project ? escapeHtml(project.name) : 'Project'}</span>
                <span class="create-issue-breadcrumb">› New sub-issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Sub-issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" data-action="toggle-create-options">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="status">
                            ${getStatusIcon('backlog')}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="priority">
                            ${getPriorityIcon('no_priority')}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" data-action="toggle-create-dropdown" data-dropdown-type="type">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" data-action="toggle-create-dropdown" data-dropdown-type="labels">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="assignee">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" data-action="toggle-create-dropdown" data-dropdown-type="estimate">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" data-action="create-sub-issue-submit" data-parent-id="${escapeAttr(parentId)}" data-project-id="${escapeAttr(projectId)}">Create sub-issue</button>
            </div>
            <input type="hidden" id="create-issue-status" value="backlog">
            <input type="hidden" id="create-issue-priority" value="no_priority">
            <input type="hidden" id="create-issue-type" value="task">
            <input type="hidden" id="create-issue-assignee" value="">
            <input type="hidden" id="create-issue-estimate" value="">
        </div>
    `;
    showModal();
    updateCreateIssueLabelsLabel();
    document.getElementById('create-issue-title').focus();
}

export async function handleCreateSubIssue(parentId, projectId) {
    const title = document.getElementById('create-issue-title').value.trim();
    const description = document.getElementById('create-issue-description').value.trim();
    const status = document.getElementById('create-issue-status').value;
    const priority = document.getElementById('create-issue-priority').value;
    const issueType = document.getElementById('create-issue-type').value || 'task';
    const assigneeId = document.getElementById('create-issue-assignee').value || null;
    const estimateValue = document.getElementById('create-issue-estimate').value;
    const estimate = estimateValue ? parseInt(estimateValue) : null;

    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }

    try {
        const issue = await api.createIssue(projectId, {
            title,
            description: description || null,
            status,
            priority,
            issue_type: issueType,
            assignee_id: assigneeId,
            estimate,
            label_ids: getCreateIssueLabelIds(),
            parent_id: parentId
        });

        closeModal();
        showToast(`Created sub-issue ${issue.identifier}`, 'success');
        viewIssue(parentId);
    } catch (e) {
        showToast(`Failed to create sub-issue: ${e.message}`, 'error');
    }
}

export async function toggleCreateIssueDropdown(type, event, anchorEl) {
    closeAllDropdowns();

    const btn = anchorEl || event.currentTarget;
    const rect = btn.getBoundingClientRect();

    const dropdown = document.createElement('div');
    dropdown.className = 'inline-dropdown dropdown-positioning';
    dropdown.style.top = `${rect.top - 8}px`;
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.transform = 'translateY(-100%)';
    dropdown.style.animation = 'none';

    if (type === 'status') {
        const currentStatus = document.getElementById('create-issue-status').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Status</div>
            ${BOARD_STATUSES.map(status => `
                <button class="dropdown-option ${status === currentStatus ? 'selected' : ''}" data-action="set-create-field" data-field="status" data-value="${status}" data-label="${escapeAttr(formatStatus(status))}">
                    ${getStatusIcon(status)}
                    <span>${formatStatus(status)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'priority') {
        const currentPriority = document.getElementById('create-issue-priority').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Priority</div>
            ${PRIORITY_OPTIONS.map(priority => `
                <button class="dropdown-option ${priority === currentPriority ? 'selected' : ''}" data-action="set-create-field" data-field="priority" data-value="${priority}" data-label="${escapeAttr(formatPriority(priority))}">
                    ${getPriorityIcon(priority)}
                    <span>${formatPriority(priority)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'type') {
        const currentType = document.getElementById('create-issue-type').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Type</div>
            ${['task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'epic'].map(issueType => `
                <button class="dropdown-option ${issueType === currentType ? 'selected' : ''}" data-action="set-create-field" data-field="type" data-value="${issueType}" data-label="${escapeAttr(formatIssueType(issueType))}">
                    <span class="issue-type-badge type-${issueType}">${formatIssueType(issueType)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'labels') {
        if (!getCurrentTeam()) {
            dropdown.innerHTML = `<div class="dropdown-header">Select a team first</div>`;
        } else {
            let labels = getLabels();
            if (labels.length === 0) {
                try {
                    labels = await api.getLabels(getCurrentTeam().id);
                    setLabels(labels);
                } catch (e) {
                    console.error('Failed to load labels:', e);
                }
            }
            renderCreateIssueLabelDropdown(dropdown);

            document.body.appendChild(dropdown);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    dropdown.classList.remove('dropdown-positioning');
                });
            });
            registerDropdownClickOutside(dropdown, { multiSelect: true });
            return;
        }
    } else if (type === 'assignee') {
        const currentAssignee = document.getElementById('create-issue-assignee').value;
        const assigneeOptions = getAssigneeOptionList();
        dropdown.innerHTML = `
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${!currentAssignee ? 'selected' : ''}" data-action="set-create-field" data-field="assignee" data-value="" data-label="Assignee">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${assigneeOptions.length === 0 ? `
                <div class="dropdown-empty">No team members or agents found</div>
            ` : assigneeOptions.map(({ assignee, indent }) => {
                const name = formatAssigneeName(assignee) || 'User';
                return `
                <button class="dropdown-option ${assignee.id === currentAssignee ? 'selected' : ''}" data-action="set-create-field" data-field="assignee" data-value="${escapeAttr(assignee.id)}" data-label="${escapeAttr(name)}">
                    ${renderAvatar(assignee, 'avatar-small')}
                    <span>${formatAssigneeOptionLabel(assignee, indent)}</span>
                </button>
            `}).join('')}
        `;
    } else if (type === 'estimate') {
        const currentEstimate = document.getElementById('create-issue-estimate').value;
        const projectId = document.getElementById('create-issue-project')?.value;
        const estimateOptions = getEstimateOptions(projectId);
        dropdown.innerHTML = `
            <div class="dropdown-header">Estimate</div>
            ${estimateOptions.map(est => {
                const strValue = est.value === null ? '' : String(est.value);
                return `
                <button class="dropdown-option ${strValue === currentEstimate ? 'selected' : ''}" data-action="set-create-field" data-field="estimate" data-value="${escapeAttr(strValue)}" data-label="${escapeAttr(est.value ? est.label : 'Estimate')}">
                    <span>${escapeHtml(est.label)}</span>
                </button>
            `}).join('')}
        `;
    } else if (type === 'sprint') {
        const currentSprintId = document.getElementById('create-issue-sprint').value;
        const projectId = document.getElementById('create-issue-project')?.value;
        if (!projectId) {
            dropdown.innerHTML = `<div class="dropdown-header">Select a project first</div>`;
        } else {
            try {
                const projectSprints = await api.getSprints(projectId);
                const available = projectSprints.filter(s => s.status !== 'completed');
                dropdown.innerHTML = `
                    <div class="dropdown-header">Sprint</div>
                    <button class="dropdown-option ${!currentSprintId ? 'selected' : ''}" data-action="set-create-field" data-field="sprint" data-value="" data-label="Sprint">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${available.map(sprint => `
                        <button class="dropdown-option ${sprint.id === currentSprintId ? 'selected' : ''}" data-action="set-create-field" data-field="sprint" data-value="${escapeAttr(sprint.id)}" data-label="${escapeAttr(sprint.name)}">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${escapeHtml(sprint.name)}${sprint.status === 'active' ? ' (Active)' : ''}</span>
                        </button>
                    `).join('')}
                `;
            } catch {
                dropdown.innerHTML = `<div class="dropdown-header">Failed to load sprints</div>`;
            }
        }
    }

    document.body.appendChild(dropdown);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dropdown.classList.remove('dropdown-positioning');
        });
    });
    registerDropdownClickOutside(dropdown);
}

export function updateCreateIssueProject() {
    const sprintInput = document.getElementById('create-issue-sprint');
    const sprintLabel = document.getElementById('create-issue-sprint-label');
    if (sprintInput) sprintInput.value = '';
    if (sprintLabel) sprintLabel.textContent = 'Sprint';
}

export function setCreateIssueField(field, value, label) {
    document.getElementById(`create-issue-${field}`).value = value;
    document.getElementById(`create-issue-${field}-label`).textContent = label;

    const safeLabel = escapeHtml(label);
    if (field === 'status') {
        const btn = document.querySelector('.toolbar-btn:first-child');
        btn.innerHTML = `${getStatusIcon(value)}<span id="create-issue-status-label">${safeLabel}</span>`;
    } else if (field === 'priority') {
        const btn = document.querySelectorAll('.toolbar-btn')[1];
        btn.innerHTML = `${getPriorityIcon(value)}<span id="create-issue-priority-label">${safeLabel}</span>`;
    } else if (field === 'type') {
        const btn = document.getElementById('create-issue-type-btn');
        if (btn) {
            btn.innerHTML = `<span class="issue-type-badge type-${value}">${formatIssueType(value)}</span><span id="create-issue-type-label">${safeLabel}</span>`;
        }
    }

    closeAllDropdowns();
}

async function submitCreateIssue({ keepOpen = false } = {}) {
    const projectId = document.getElementById('create-issue-project').value;
    const title = document.getElementById('create-issue-title').value.trim();
    const description = document.getElementById('create-issue-description').value.trim();
    const status = document.getElementById('create-issue-status').value;
    const priority = document.getElementById('create-issue-priority').value;
    const issueType = document.getElementById('create-issue-type').value || 'task';
    const assigneeId = document.getElementById('create-issue-assignee').value || null;
    const estimateValue = document.getElementById('create-issue-estimate').value;
    const estimate = estimateValue ? parseInt(estimateValue) : null;
    const sprintId = document.getElementById('create-issue-sprint')?.value || null;
    const dueDateValue = document.getElementById('create-issue-due-date')?.value;
    const dueDate = dueDateValue ? new Date(`${dueDateValue}T00:00:00Z`).toISOString() : null;

    if (!projectId) {
        showToast('Please select a project', 'error');
        return;
    }
    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }

    const btnCreate = document.getElementById('btn-create-issue');
    const btnCreateAndNew = document.getElementById('btn-create-and-new');
    if (btnCreate) btnCreate.disabled = true;
    if (btnCreateAndNew) btnCreateAndNew.disabled = true;

    try {
        const issue = await api.createIssue(projectId, {
            title,
            description: description || null,
            status,
            priority,
            issue_type: issueType,
            assignee_id: assigneeId,
            estimate,
            sprint_id: sprintId,
            label_ids: getCreateIssueLabelIds(),
            due_date: dueDate
        });

        showToast(`Created ${issue.identifier}`, 'success');
        clearCreateIssueDraft();

        if (getCurrentView() === 'issues') {
            loadIssues();
        } else if (getCurrentView() === 'my-issues') {
            loadMyIssues();
        }

        if (keepOpen) {
            document.getElementById('create-issue-title').value = '';
            document.getElementById('create-issue-description').value = '';
            document.getElementById('create-issue-title').focus();
        } else {
            closeModal();
            viewIssue(issue.id);
        }
    } catch (e) {
        showToast(`Failed to create issue: ${e.message}`, 'error');
    } finally {
        if (btnCreate) btnCreate.disabled = false;
        if (btnCreateAndNew) btnCreateAndNew.disabled = false;
    }
}

export async function handleCreateIssueNew() {
    await submitCreateIssue({ keepOpen: false });
}

export async function handleCreateIssueAndNew() {
    await submitCreateIssue({ keepOpen: true });
}

// Register delegated event handlers
registerActions({
    'toggle-create-dropdown': (event, data, target) => {
        toggleCreateIssueDropdown(data.dropdownType, event, target);
    },
    'set-create-field': (event, data) => {
        setCreateIssueField(data.field, data.value, data.label);
    },
    'create-issue-submit': () => {
        handleCreateIssueNew();
    },
    'create-issue-and-new': () => {
        handleCreateIssueAndNew();
    },
    'update-create-project': () => {
        updateCreateIssueProject();
    },
    'apply-template': (event) => {
        applyIssueTemplate(event.target.value);
    },
    'toggle-create-options': () => {
        toggleCreateIssueOptions();
    },
    'create-sub-issue-submit': (event, data) => {
        handleCreateSubIssue(data.parentId, data.projectId);
    },
});
