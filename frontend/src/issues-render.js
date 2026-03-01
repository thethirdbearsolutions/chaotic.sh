/**
 * Issues Render module (CHT-1137)
 *
 * All DOM rendering for the issues view: filter menus, option renderers,
 * filter chips, sprint budget bar, display menu, and loading skeleton.
 */

import { api } from './api.js';
import { formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor } from './utils.js';
import { getActiveFilterCategory, setActiveFilterCategory, getCurrentProject } from './state.js';
import { getProjects } from './projects.js';
import { getMembers } from './teams.js';
import { OPEN_STATUSES } from './constants.js';
import {
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getFilterCategoryCount,
    getTotalFilterCount,
    FILTER_CATEGORIES,
    CLOSED_STATUSES,
} from './issues-filter.js';

// ========================================
// Legacy Multi-select Dropdown Functions
// ========================================

export function toggleMultiSelect(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const options = dropdown.querySelector('.multi-select-options');
    const isOpen = !options.classList.contains('hidden');

    // Close all other multi-selects
    document.querySelectorAll('.multi-select-options').forEach(el => {
        el.classList.add('hidden');
    });

    if (!isOpen) {
        options.classList.remove('hidden');
        setTimeout(() => {
            document.addEventListener('click', closeMultiSelectOnOutsideClick);
        }, 0);
    }
}

function closeMultiSelectOnOutsideClick(e) {
    if (!e.target.closest('.multi-select-dropdown')) {
        document.querySelectorAll('.multi-select-options').forEach(el => {
            el.classList.add('hidden');
        });
        document.removeEventListener('click', closeMultiSelectOnOutsideClick);
    }
}

// ========================================
// Linear-Style Filter Menu Toggles
// ========================================

export function toggleFilterMenu() {
    const dropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');

    if (!dropdown) return;

    if (displayDropdown && !displayDropdown.classList.contains('hidden')) {
        displayDropdown.classList.add('hidden');
    }

    const isOpen = !dropdown.classList.contains('hidden');

    if (isOpen) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeFilterMenuOnOutsideClick);
    } else {
        dropdown.classList.remove('hidden');
        renderFilterMenuCategories();
        showFilterCategoryOptions(getActiveFilterCategory());
        setTimeout(() => {
            document.addEventListener('click', closeFilterMenuOnOutsideClick);
        }, 0);
    }
}

export function toggleDisplayMenu() {
    const dropdown = document.getElementById('display-menu-dropdown');
    const filterDropdown = document.getElementById('filter-menu-dropdown');

    if (!dropdown) return;

    if (filterDropdown && !filterDropdown.classList.contains('hidden')) {
        filterDropdown.classList.add('hidden');
    }

    const isOpen = !dropdown.classList.contains('hidden');

    if (isOpen) {
        dropdown.classList.add('hidden');
        document.removeEventListener('click', closeFilterMenuOnOutsideClick);
    } else {
        dropdown.classList.remove('hidden');
        renderDisplayMenuOptions();
        setTimeout(() => {
            document.addEventListener('click', closeFilterMenuOnOutsideClick);
        }, 0);
    }
}

function closeFilterMenuOnOutsideClick(e) {
    const filterDropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');

    const path = e.composedPath();
    const filterContainer = document.querySelector('.filter-menu-container');
    const displayContainer = document.querySelector('.display-menu-container');
    const insideFilter = filterContainer && path.includes(filterContainer);
    const insideDisplay = displayContainer && path.includes(displayContainer);

    if (!insideFilter && !insideDisplay) {
        if (filterDropdown) filterDropdown.classList.add('hidden');
        if (displayDropdown) displayDropdown.classList.add('hidden');
        document.removeEventListener('click', closeFilterMenuOnOutsideClick);
    }
}

export function closeAllFilterMenus() {
    const filterDropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');
    if (filterDropdown) filterDropdown.classList.add('hidden');
    if (displayDropdown) displayDropdown.classList.add('hidden');
    document.removeEventListener('click', closeFilterMenuOnOutsideClick);
}

// ========================================
// Filter Menu Category Rendering
// ========================================

export function renderFilterMenuCategories() {
    const container = document.getElementById('filter-menu-categories');
    if (!container) return;

    const projectId = getCurrentProject();
    container.innerHTML = FILTER_CATEGORIES.map(cat => {
        const count = getFilterCategoryCount(cat.key);
        const isActive = getActiveFilterCategory() === cat.key;
        const isDisabled = cat.key === 'sprint' && !projectId;
        return `
            <div class="filter-menu-category ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}"
                 data-action="show-filter-category" data-category="${escapeAttr(cat.key)}">
                <span>${cat.label}</span>
                ${count > 0 ? `<span class="filter-menu-category-count">${count}</span>` : '<span class="filter-menu-category-arrow">\u2192</span>'}
            </div>
        `;
    }).join('');
}

export function showFilterCategoryOptions(category) {
    setActiveFilterCategory(category);
    renderFilterMenuCategories();

    const container = document.getElementById('filter-menu-options');
    if (!container) return;

    switch (category) {
        case 'project':
            renderProjectOptions(container);
            break;
        case 'status':
            renderStatusOptions(container);
            break;
        case 'priority':
            renderPriorityOptions(container);
            break;
        case 'type':
            renderTypeOptions(container);
            break;
        case 'assignee':
            renderAssigneeOptions(container);
            break;
        case 'sprint':
            renderSprintOptions(container);
            break;
        case 'labels':
            renderLabelOptions(container);
            break;
    }
}

// ========================================
// Filter Option Renderers
// ========================================

function renderProjectOptions(container) {
    const currentValue = getCurrentProject() || '';
    const projects = getProjects() || [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${currentValue ? '<button class="filter-options-clear" data-action="set-project-filter" data-value="">Clear</button>' : ''}
        </div>
        <label class="filter-option" data-action="set-project-filter" data-value="">
            <input type="radio" name="project-filter-radio" value="" ${!currentValue ? 'checked' : ''}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;

    projects.forEach(p => {
        html += `
            <label class="filter-option" data-action="set-project-filter" data-value="${escapeAttr(p.id)}">
                <input type="radio" name="project-filter-radio" value="${escapeAttr(p.id)}" ${currentValue === p.id ? 'checked' : ''}>
                <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${sanitizeColor(p.color)};"></span>
                <span class="filter-option-label">${escapeHtml(p.name)}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderStatusOptions(container) {
    const selected = getSelectedStatuses();
    const statuses = [
        { value: 'backlog', label: 'Backlog', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>' },
        { value: 'todo', label: 'Todo', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' },
        { value: 'in_progress', label: 'In Progress', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>' },
        { value: 'in_review', label: 'In Review', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>' },
        { value: 'done', label: 'Done', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>' },
        { value: 'canceled', label: 'Canceled', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>' },
    ];

    const isOpenPreset = OPEN_STATUSES.every(s => selected.includes(s)) && !CLOSED_STATUSES.some(s => selected.includes(s)) && selected.length === OPEN_STATUSES.length;
    const isClosedPreset = CLOSED_STATUSES.every(s => selected.includes(s)) && !OPEN_STATUSES.some(s => selected.includes(s)) && selected.length === CLOSED_STATUSES.length;

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${selected.length > 0 ? '<button class="filter-options-clear" data-action="clear-status-filter-new">Clear</button>' : ''}
        </div>
        <div class="filter-presets">
            <button class="filter-preset-btn ${isOpenPreset ? 'active' : ''}" data-action="set-status-preset" data-value="open">Open</button>
            <button class="filter-preset-btn ${isClosedPreset ? 'active' : ''}" data-action="set-status-preset" data-value="closed">Closed</button>
        </div>
    `;

    statuses.forEach(s => {
        html += `
            <label class="filter-option">
                <input type="checkbox" value="${s.value}" ${selected.includes(s.value) ? 'checked' : ''} data-action="toggle-status-option" data-filter-value="${escapeAttr(s.value)}">
                <span class="filter-option-icon">${s.icon}</span>
                <span class="filter-option-label">${s.label}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderPriorityOptions(container) {
    const selected = getSelectedPriorities();
    const priorities = [
        { value: 'urgent', label: 'Urgent', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>' },
        { value: 'high', label: 'High', icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>' },
        { value: 'medium', label: 'Medium', icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>' },
        { value: 'low', label: 'Low', icon: '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>' },
        { value: 'no_priority', label: 'No Priority', icon: '<svg width="14" height="14" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>' },
    ];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Priority</span>
            ${selected.length > 0 ? '<button class="filter-options-clear" data-action="clear-priority-filter-new">Clear</button>' : ''}
        </div>
    `;

    priorities.forEach(p => {
        html += `
            <label class="filter-option">
                <input type="checkbox" value="${p.value}" ${selected.includes(p.value) ? 'checked' : ''} data-action="toggle-priority-option" data-filter-value="${escapeAttr(p.value)}">
                <span class="filter-option-icon">${p.icon}</span>
                <span class="filter-option-label">${p.label}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderTypeOptions(container) {
    const typeFilter = document.getElementById('issue-type-filter');
    const currentValue = typeFilter?.value || '';
    const types = [
        { value: '', label: 'All Types' },
        { value: 'task', label: 'Task' },
        { value: 'bug', label: 'Bug' },
        { value: 'feature', label: 'Feature' },
        { value: 'chore', label: 'Chore' },
        { value: 'docs', label: 'Docs' },
        { value: 'tech_debt', label: 'Tech Debt' },
        { value: 'epic', label: 'Epic' },
    ];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Type</span>
            ${currentValue ? '<button class="filter-options-clear" data-action="set-type-filter" data-value="">Clear</button>' : ''}
        </div>
    `;

    types.forEach(t => {
        html += `
            <label class="filter-option" data-action="set-type-filter" data-value="${escapeAttr(t.value)}">
                <input type="radio" name="type-filter-radio" value="${t.value}" ${currentValue === t.value ? 'checked' : ''}>
                <span class="filter-option-label">${t.label}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderAssigneeOptions(container) {
    const assigneeFilter = document.getElementById('assignee-filter');
    const currentValue = assigneeFilter?.value || '';
    const members = getMembers() || [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Assignee</span>
            ${currentValue ? '<button class="filter-options-clear" data-action="set-assignee-filter" data-value="">Clear</button>' : ''}
        </div>
        <label class="filter-option" data-action="set-assignee-filter" data-value="">
            <input type="radio" name="assignee-filter-radio" value="" ${!currentValue ? 'checked' : ''}>
            <span class="filter-option-label">All Assignees</span>
        </label>
        <label class="filter-option" data-action="set-assignee-filter" data-value="me">
            <input type="radio" name="assignee-filter-radio" value="me" ${currentValue === 'me' ? 'checked' : ''}>
            <span class="filter-option-label">Assigned to me</span>
        </label>
        <label class="filter-option" data-action="set-assignee-filter" data-value="unassigned">
            <input type="radio" name="assignee-filter-radio" value="unassigned" ${currentValue === 'unassigned' ? 'checked' : ''}>
            <span class="filter-option-label">Unassigned</span>
        </label>
    `;

    members.forEach(m => {
        html += `
            <label class="filter-option" data-action="set-assignee-filter" data-value="${escapeAttr(m.user_id)}">
                <input type="radio" name="assignee-filter-radio" value="${escapeAttr(m.user_id)}" ${currentValue === m.user_id ? 'checked' : ''}>
                <span class="filter-option-label">${escapeHtml(m.name || m.email)}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderSprintOptions(container) {
    const projectId = getCurrentProject();
    if (!projectId) {
        container.innerHTML = `
            <div class="filter-options-header">
                <span class="filter-options-title">Sprint</span>
            </div>
            <div class="filter-options-empty">Select a project first</div>
        `;
        return;
    }

    const sprintFilter = document.getElementById('sprint-filter');
    const currentValue = sprintFilter?.value || '';
    const options = sprintFilter ? Array.from(sprintFilter.options) : [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${currentValue ? '<button class="filter-options-clear" data-action="set-sprint-filter" data-value="">Clear</button>' : ''}
        </div>
    `;

    options.forEach(opt => {
        html += `
            <label class="filter-option" data-action="set-sprint-filter" data-value="${escapeAttr(opt.value)}">
                <input type="radio" name="sprint-filter-radio" value="${escapeAttr(opt.value)}" ${currentValue === opt.value ? 'checked' : ''}>
                <span class="filter-option-label">${escapeHtml(opt.text)}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderLabelOptions(container) {
    const selected = getSelectedLabels();
    const labelDropdown = document.getElementById('label-filter-dropdown');
    const labelCheckboxes = labelDropdown?.querySelectorAll('.multi-select-option input[type="checkbox"]') || [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Labels</span>
            ${selected.length > 0 ? '<button class="filter-options-clear" data-action="clear-label-filter-new">Clear</button>' : ''}
        </div>
    `;

    if (labelCheckboxes.length === 0) {
        html += '<div class="filter-options-empty">No labels available</div>';
    } else {
        labelCheckboxes.forEach(cb => {
            const labelEl = cb.closest('label');
            const nameEl = labelEl?.querySelector('.label-name');
            const badgeEl = labelEl?.querySelector('.label-badge');
            const name = nameEl?.textContent || 'Label';
            const color = badgeEl?.style.background || '#6366f1';

            html += `
                <label class="filter-option">
                    <input type="checkbox" value="${escapeAttr(cb.value)}" ${selected.includes(cb.value) ? 'checked' : ''} data-action="toggle-label-option" data-filter-value="${escapeAttr(cb.value)}">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${sanitizeColor(color)};"></span>
                    <span class="filter-option-label">${escapeHtml(name)}</span>
                </label>
            `;
        });
    }

    container.innerHTML = html;
}

// ========================================
// Display Menu Rendering
// ========================================

export function renderDisplayMenuOptions() {
    const container = document.getElementById('display-menu-dropdown');
    if (!container) return;

    const sortSelect = document.getElementById('sort-by-select');
    const groupSelect = document.getElementById('group-by-select');
    const currentSort = sortSelect?.value || 'created-desc';
    const currentGroup = groupSelect?.value || '';

    const sortOptions = [
        { value: 'created-desc', label: 'Newest' },
        { value: 'created-asc', label: 'Oldest' },
        { value: 'updated-desc', label: 'Recently Updated' },
        { value: 'updated-asc', label: 'Least Recently Updated' },
        { value: 'priority-asc', label: 'Priority \u2191' },
        { value: 'priority-desc', label: 'Priority \u2193' },
        { value: 'title-asc', label: 'Title A-Z' },
        { value: 'title-desc', label: 'Title Z-A' },
        { value: 'random', label: 'Random' },
    ];

    const groupOptions = [
        { value: '', label: 'No grouping' },
        { value: 'status', label: 'Status' },
        { value: 'priority', label: 'Priority' },
        { value: 'type', label: 'Type' },
        { value: 'assignee', label: 'Assignee' },
        { value: 'sprint', label: 'Sprint' },
    ];

    let html = `
        <div class="display-section">
            <div class="display-section-title">Sort by</div>
            ${sortOptions.map(opt => `
                <div class="display-option ${currentSort === opt.value ? 'active' : ''}" data-action="set-sort" data-value="${escapeAttr(opt.value)}">
                    <span>${opt.label}</span>
                    ${currentSort === opt.value ? '<span class="display-option-check">\u2713</span>' : ''}
                </div>
            `).join('')}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${groupOptions.map(opt => `
                <div class="display-option ${currentGroup === opt.value ? 'active' : ''}" data-action="set-group-by" data-value="${escapeAttr(opt.value)}">
                    <span>${opt.label}</span>
                    ${currentGroup === opt.value ? '<span class="display-option-check">\u2713</span>' : ''}
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = html;
}

// ========================================
// Filter Chips
// ========================================

export function updateFilterChips() {
    const container = document.getElementById('filter-chips-row');
    if (!container) return;

    const chips = [];

    // Project chip
    const currentProjectId = getCurrentProject();
    if (currentProjectId) {
        const projects = getProjects() || [];
        const project = projects.find(p => p.id === currentProjectId);
        chips.push({
            category: 'project',
            label: 'Project',
            value: project?.name || 'Unknown',
            clearAction: 'clear-project-filter'
        });
    }

    // Status chips
    const statuses = getSelectedStatuses();
    if (statuses.length > 0) {
        const statusLabels = statuses.map(s => formatStatus(s)).join(', ');
        chips.push({
            category: 'status',
            label: 'Status',
            value: statusLabels,
            clearAction: 'clear-status-filter-new'
        });
    }

    // Priority chips
    const priorities = getSelectedPriorities();
    if (priorities.length > 0) {
        const priorityLabels = priorities.map(p => formatPriority(p)).join(', ');
        chips.push({
            category: 'priority',
            label: 'Priority',
            value: priorityLabels,
            clearAction: 'clear-priority-filter-new'
        });
    }

    // Type chip
    const typeFilter = document.getElementById('issue-type-filter');
    if (typeFilter?.value) {
        const selectedOption = typeFilter.options[typeFilter.selectedIndex];
        chips.push({
            category: 'type',
            label: 'Type',
            value: selectedOption ? selectedOption.text : typeFilter.value,
            clearAction: 'clear-type-filter'
        });
    }

    // Assignee chip
    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter?.value) {
        let assigneeLabel;
        if (assigneeFilter.value === 'me') {
            assigneeLabel = 'Me';
        } else if (assigneeFilter.value === 'unassigned') {
            assigneeLabel = 'Unassigned';
        } else {
            const members = getMembers() || [];
            const member = members.find(m => m.user_id === assigneeFilter.value);
            assigneeLabel = member?.name || member?.email || 'Unknown';
        }
        chips.push({
            category: 'assignee',
            label: 'Assignee',
            value: assigneeLabel,
            clearAction: 'clear-assignee-filter'
        });
    }

    // Sprint chip
    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter?.value) {
        const selectedOption = sprintFilter.options[sprintFilter.selectedIndex];
        chips.push({
            category: 'sprint',
            label: 'Sprint',
            value: selectedOption?.text || sprintFilter.value,
            clearAction: 'clear-sprint-filter'
        });
    }

    // Labels chip
    const labels = getSelectedLabels();
    if (labels.length > 0) {
        const labelDropdown = document.getElementById('label-filter-dropdown');
        const labelNames = labels.map(id => {
            const cb = labelDropdown?.querySelector(`input[value="${id}"]`);
            const nameEl = cb?.closest('label')?.querySelector('.label-name');
            return nameEl?.textContent || 'Label';
        }).join(', ');
        chips.push({
            category: 'labels',
            label: 'Labels',
            value: labelNames,
            clearAction: 'clear-label-filter-new'
        });
    }

    if (chips.length === 0) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.classList.remove('hidden');
    let html = chips.map(chip => `
        <span class="filter-chip" title="${escapeAttr(chip.label)}: ${escapeAttr(chip.value)}">
            <span class="filter-chip-label">${chip.label}:</span>
            <span class="filter-chip-value">${escapeHtml(chip.value)}</span>
            <button class="filter-chip-remove" data-action="${chip.clearAction}" title="Remove filter">×</button>
        </span>
    `).join('');

    if (chips.length > 1) {
        html += '<button class="filter-chips-clear-all" data-action="clear-all-filters">Clear all</button>';
    }

    container.innerHTML = html;
}

// ========================================
// Filter Count Badge
// ========================================

export function updateFilterCountBadge() {
    const badge = document.getElementById('filter-count-badge');
    if (!badge) return;

    const count = getTotalFilterCount();

    if (count === 0) {
        badge.classList.add('hidden');
    } else {
        badge.textContent = count;
        badge.classList.remove('hidden');
    }
}

// ========================================
// Sprint Filter & Budget Bar
// ========================================

export async function updateSprintFilter() {
    const sprintFilter = document.getElementById('sprint-filter');
    if (!sprintFilter) return;

    const projectId = getCurrentProject();
    const currentSelection = sprintFilter.value;

    if (!projectId) {
        sprintFilter.innerHTML = '<option value="">All Sprints</option>';
        sprintFilter.value = '';
        updateSprintBudgetBar(null);
        return;
    }

    let options = `
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;

    try {
        const sprints = await api.getSprints(projectId);
        const currentSprint = sprints.find(s => s.status === 'active');
        if (currentSprint) {
            options += `<option value="current">Current Sprint (${escapeHtml(currentSprint.name)})</option>`;
        }
        updateSprintBudgetBar(currentSprint || null);
        sprints.forEach(s => {
            const statusLabel = s.status === 'active' ? ' (Active)' : s.status === 'completed' ? ' (Done)' : '';
            options += `<option value="${s.id}">${escapeHtml(s.name)}${statusLabel}</option>`;
        });
    } catch (e) {
        console.error('Failed to load sprints:', e);
    }

    sprintFilter.innerHTML = options;

    if (currentSelection) {
        const optionExists = Array.from(sprintFilter.options).some(opt => opt.value === currentSelection);
        if (optionExists) {
            sprintFilter.value = currentSelection;
        }
    }
}

export function updateSprintBudgetBar(activeSprint) {
    const bar = document.getElementById('sprint-budget-bar');
    if (!bar) return;

    if (!activeSprint) {
        bar.classList.add('hidden');
        return;
    }

    const spent = activeSprint.points_spent || 0;
    const budget = activeSprint.budget;

    if (budget === null || budget === undefined) {
        bar.classList.remove('hidden', 'arrears');
        bar.innerHTML = `
            <span class="budget-label">${escapeHtml(activeSprint.name)}</span>
            <span class="budget-text">${spent} points spent (no budget)</span>
        `;
        return;
    }

    const pct = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
    const isArrears = spent > budget;
    const isWarning = pct >= 80 && !isArrears;
    const fillClass = isArrears ? 'budget-over' : isWarning ? 'budget-warning' : '';

    bar.classList.remove('hidden');
    bar.classList.toggle('arrears', isArrears);
    bar.innerHTML = `
        <span class="budget-label">${escapeHtml(activeSprint.name)}</span>
        <div class="budget-progress">
            <div class="budget-progress-fill ${fillClass}" style="width: ${pct}%"></div>
        </div>
        <span class="budget-text">${spent} / ${budget} points</span>
        ${isArrears ? '<span class="arrears-badge">In Arrears</span>' : ''}
    `;
}

// ========================================
// Loading Skeleton
// ========================================

export function showIssuesLoadingSkeleton() {
    const list = document.getElementById('issues-list');
    list.innerHTML = Array(5).fill(0).map(() => `
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join('');
}
