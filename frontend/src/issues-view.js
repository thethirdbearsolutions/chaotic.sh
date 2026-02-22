/**
 * Issues View module - Filter bar, filter state, issue loading (CHT-783)
 *
 * Extracted from app.js to decouple issues-list filtering/loading
 * from the main application module.
 */

/* global api */
import { formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor, escapeJsString } from './utils.js';
import {
    getActiveFilterCategory,
    setActiveFilterCategory,
    getCurrentUser,
    getIssues,
    setIssues,
    getSearchDebounceTimer,
    setSearchDebounceTimer,
    setSelectedIssueIndex,
} from './state.js';
import { getProjects, setGlobalProjectSelection } from './projects.js';
import { getMembers } from './teams.js';
import { ensureSprintCacheForIssues, updateSprintProjectFilter } from './sprints.js';
import { updateBoardProjectFilter } from './board.js';
import { renderIssues } from './issue-list.js';
import { showToast } from './ui.js';

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
        // Close on outside click
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
// Filter Getter Functions
// ========================================

export function getSelectedStatuses() {
    const dropdown = document.getElementById('status-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

export function getSelectedPriorities() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

export function getSelectedLabels() {
    const dropdown = document.getElementById('label-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

// ========================================
// Legacy Filter Update Functions
// ========================================

export function updateStatusFilter() {
    const selectedStatuses = getSelectedStatuses();
    const dropdown = document.getElementById('status-filter-dropdown');
    const label = dropdown.querySelector('.multi-select-label');

    if (selectedStatuses.length === 0) {
        label.textContent = 'All Statuses';
    } else if (selectedStatuses.length === 1) {
        label.textContent = formatStatus(selectedStatuses[0]);
    } else {
        label.innerHTML = `${selectedStatuses.length} statuses<span class="multi-select-badge">${selectedStatuses.length}</span>`;
    }

    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearStatusFilter() {
    const dropdown = document.getElementById('status-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updateStatusFilter();
}

export function updatePriorityFilter() {
    const selectedPriorities = getSelectedPriorities();
    const dropdown = document.getElementById('priority-filter-dropdown');
    const label = dropdown.querySelector('.multi-select-label');

    if (selectedPriorities.length === 0) {
        label.textContent = 'All Priorities';
    } else if (selectedPriorities.length === 1) {
        label.textContent = formatPriority(selectedPriorities[0]);
    } else {
        label.innerHTML = `${selectedPriorities.length} priorities<span class="multi-select-badge">${selectedPriorities.length}</span>`;
    }

    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearPriorityFilter() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updatePriorityFilter();
}

export function updateLabelFilter() {
    const selectedLabels = getSelectedLabels();
    const dropdown = document.getElementById('label-filter-dropdown');
    const label = dropdown.querySelector('.multi-select-label');

    if (selectedLabels.length === 0) {
        label.textContent = 'All Labels';
    } else if (selectedLabels.length === 1) {
        // Find the label name by ID
        const checkbox = dropdown.querySelector(`input[value="${selectedLabels[0]}"]`);
        const labelName = checkbox?.closest('label')?.querySelector('.label-name')?.textContent || '1 Label';
        label.textContent = labelName;
    } else {
        label.textContent = `${selectedLabels.length} Labels`;
    }

    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updateLabelFilter();
}

export function updateLabelFilterLabel() {
    const selectedLabels = getSelectedLabels();
    const dropdown = document.getElementById('label-filter-dropdown');
    const label = dropdown?.querySelector('.multi-select-label');
    if (!label) return;

    if (selectedLabels.length === 0) {
        label.textContent = 'All Labels';
    } else if (selectedLabels.length === 1) {
        const checkbox = dropdown.querySelector(`input[value="${selectedLabels[0]}"]`);
        const labelName = checkbox?.closest('label')?.querySelector('.label-name')?.textContent || '1 Label';
        label.textContent = labelName;
    } else {
        label.textContent = `${selectedLabels.length} Labels`;
    }
}

export async function populateLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    if (!dropdown || !window.currentTeam) return;

    const optionsContainer = dropdown.querySelector('.multi-select-options');
    try {
        const labels = await api.getLabels(window.currentTeam.id);

        // Clear existing options except the clear button
        optionsContainer.innerHTML = '';

        if (labels.length === 0) {
            optionsContainer.innerHTML = '<div class="multi-select-empty">No labels available</div>';
        } else {
            labels.forEach(lbl => {
                const option = document.createElement('label');
                option.className = 'multi-select-option';
                option.innerHTML = `
                    <input type="checkbox" value="${lbl.id}" onchange="updateLabelFilter()">
                    <span class="label-badge" style="background: ${sanitizeColor(lbl.color)}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">
                        <span class="label-name">${escapeHtml(lbl.name)}</span>
                    </span>
                `;
                optionsContainer.appendChild(option);
            });
        }

        // Add clear button back
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'multi-select-actions';
        actionsDiv.innerHTML = '<button type="button" class="btn btn-small" onclick="clearLabelFilter()">Clear</button>';
        optionsContainer.appendChild(actionsDiv);
    } catch (e) {
        console.error('Failed to load labels for filter:', e);
    }
}

// ========================================
// URL Filter State Management
// ========================================

export function syncFiltersToUrl() {
    const params = new URLSearchParams();

    // Get current filter values
    const statuses = getSelectedStatuses();
    const priorities = getSelectedPriorities();
    const labels = getSelectedLabels();
    const assignee = document.getElementById('assignee-filter')?.value;
    const project = document.getElementById('project-filter')?.value;
    const sprint = document.getElementById('sprint-filter')?.value;
    const issueType = document.getElementById('issue-type-filter')?.value;
    const groupBy = document.getElementById('group-by-select')?.value;

    // Add to params
    statuses.forEach(s => params.append('status', s));
    priorities.forEach(p => params.append('priority', p));
    labels.forEach(l => params.append('label', l));
    if (assignee) params.set('assignee', assignee);
    if (project) params.set('project', project);
    if (sprint) params.set('sprint', sprint);
    if (issueType) params.set('issue_type', issueType);
    if (groupBy) params.set('groupBy', groupBy);

    // Update URL without triggering navigation
    const queryString = params.toString();
    const newUrl = queryString ? `/issues?${queryString}` : '/issues';
    history.replaceState({ view: 'issues' }, '', newUrl);

    // Also persist to localStorage for cross-session recall (CHT-1042)
    if (queryString) {
        localStorage.setItem('chaotic_issues_filters', queryString);
    } else {
        localStorage.removeItem('chaotic_issues_filters');
    }
}

export function loadFiltersFromUrl() {
    let params = new URLSearchParams(window.location.search);

    // Fall back to localStorage if URL has no filter params (CHT-1042)
    if (params.toString() === '') {
        const saved = localStorage.getItem('chaotic_issues_filters');
        if (saved) {
            params = new URLSearchParams(saved);
            // Update URL to reflect restored filters
            const newUrl = `/issues?${saved}`;
            history.replaceState({ view: 'issues' }, '', newUrl);
        }
    }

    // Apply status filters
    const statuses = params.getAll('status');
    if (statuses.length > 0) {
        const dropdown = document.getElementById('status-filter-dropdown');
        if (dropdown) {
            const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = statuses.includes(cb.value);
            });
            updateStatusFilterLabel();
        }
    }

    // Apply priority filters
    const priorities = params.getAll('priority');
    if (priorities.length > 0) {
        const dropdown = document.getElementById('priority-filter-dropdown');
        if (dropdown) {
            const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = priorities.includes(cb.value);
            });
            updatePriorityFilterLabel();
        }
    }

    // Apply assignee filter
    const assignee = params.get('assignee');
    if (assignee) {
        const assigneeFilter = document.getElementById('assignee-filter');
        if (assigneeFilter) assigneeFilter.value = assignee;
    }

    // Apply project filter
    const project = params.get('project');
    if (project) {
        const projectFilter = document.getElementById('project-filter');
        if (projectFilter) projectFilter.value = project;
    }

    // Apply sprint filter
    const sprint = params.get('sprint');
    if (sprint) {
        const sprintFilter = document.getElementById('sprint-filter');
        if (sprintFilter) sprintFilter.value = sprint;
    }

    // Apply issue type filter
    const issueType = params.get('issue_type');
    if (issueType) {
        const issueTypeFilter = document.getElementById('issue-type-filter');
        if (issueTypeFilter) issueTypeFilter.value = issueType;
    }

    // Apply label filters
    const labels = params.getAll('label');
    if (labels.length > 0) {
        const dropdown = document.getElementById('label-filter-dropdown');
        if (dropdown) {
            const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = labels.includes(cb.value);
            });
            updateLabelFilterLabel();
        }
    }

    // Apply group-by
    const groupBy = params.get('groupBy');
    if (groupBy) {
        const groupBySelect = document.getElementById('group-by-select');
        if (groupBySelect) groupBySelect.value = groupBy;
    }
}

function updateStatusFilterLabel() {
    const selectedStatuses = getSelectedStatuses();
    const dropdown = document.getElementById('status-filter-dropdown');
    const label = dropdown?.querySelector('.multi-select-label');
    if (!label) return;

    if (selectedStatuses.length === 0) {
        label.textContent = 'All Statuses';
    } else if (selectedStatuses.length === 1) {
        label.textContent = formatStatus(selectedStatuses[0]);
    } else {
        label.innerHTML = `${selectedStatuses.length} statuses<span class="multi-select-badge">${selectedStatuses.length}</span>`;
    }
}

function updatePriorityFilterLabel() {
    const selectedPriorities = getSelectedPriorities();
    const dropdown = document.getElementById('priority-filter-dropdown');
    const label = dropdown?.querySelector('.multi-select-label');
    if (!label) return;

    if (selectedPriorities.length === 0) {
        label.textContent = 'All Priorities';
    } else if (selectedPriorities.length === 1) {
        label.textContent = formatPriority(selectedPriorities[0]);
    } else {
        label.innerHTML = `${selectedPriorities.length} priorities<span class="multi-select-badge">${selectedPriorities.length}</span>`;
    }
}

// ========================================
// Linear-Style Filter Bar Functions
// ========================================

export const FILTER_CATEGORIES = [
    { key: 'project', label: 'Project' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'type', label: 'Type' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'sprint', label: 'Sprint' },
    { key: 'labels', label: 'Labels' },
];

export function toggleFilterMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');

    if (!dropdown) return;

    // Close display menu if open
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

export function toggleDisplayMenu(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('display-menu-dropdown');
    const filterDropdown = document.getElementById('filter-menu-dropdown');

    if (!dropdown) return;

    // Close filter menu if open
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

    if (!e.target.closest('.filter-menu-container') && !e.target.closest('.display-menu-container')) {
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

export function getFilterCategoryCount(category) {
    switch (category) {
        case 'project':
            return document.getElementById('project-filter')?.value ? 1 : 0;
        case 'status':
            return getSelectedStatuses().length;
        case 'priority':
            return getSelectedPriorities().length;
        case 'type':
            return document.getElementById('issue-type-filter')?.value ? 1 : 0;
        case 'assignee':
            return document.getElementById('assignee-filter')?.value ? 1 : 0;
        case 'sprint':
            return document.getElementById('sprint-filter')?.value ? 1 : 0;
        case 'labels':
            return getSelectedLabels().length;
        default:
            return 0;
    }
}

export function getTotalFilterCount() {
    let total = 0;
    FILTER_CATEGORIES.forEach(cat => {
        total += getFilterCategoryCount(cat.key);
    });
    return total;
}

export function renderFilterMenuCategories() {
    const container = document.getElementById('filter-menu-categories');
    if (!container) return;

    container.innerHTML = FILTER_CATEGORIES.map(cat => {
        const count = getFilterCategoryCount(cat.key);
        const isActive = getActiveFilterCategory() === cat.key;
        return `
            <div class="filter-menu-category ${isActive ? 'active' : ''}"
                 onclick="showFilterCategoryOptions('${cat.key}')">
                <span>${cat.label}</span>
                ${count > 0 ? `<span class="filter-menu-category-count">${count}</span>` : '<span class="filter-menu-category-arrow">→</span>'}
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
    const projectFilter = document.getElementById('project-filter');
    const currentValue = projectFilter?.value || '';
    const projects = getProjects() || [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Project</span>
            ${currentValue ? '<button class="filter-options-clear" onclick="clearProjectFilter()">Clear</button>' : ''}
        </div>
        <label class="filter-option" onclick="setProjectFilter('')">
            <input type="radio" name="project-filter-radio" value="" ${!currentValue ? 'checked' : ''}>
            <span class="filter-option-label">All Projects</span>
        </label>
    `;

    projects.forEach(p => {
        html += `
            <label class="filter-option" onclick="setProjectFilter('${escapeJsString(p.id)}')">
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

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Status</span>
            ${selected.length > 0 ? '<button class="filter-options-clear" onclick="clearStatusFilterNew()">Clear</button>' : ''}
        </div>
    `;

    statuses.forEach(s => {
        html += `
            <label class="filter-option">
                <input type="checkbox" value="${s.value}" ${selected.includes(s.value) ? 'checked' : ''} onchange="toggleStatusOption('${s.value}', event)">
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
            ${selected.length > 0 ? '<button class="filter-options-clear" onclick="clearPriorityFilterNew()">Clear</button>' : ''}
        </div>
    `;

    priorities.forEach(p => {
        html += `
            <label class="filter-option">
                <input type="checkbox" value="${p.value}" ${selected.includes(p.value) ? 'checked' : ''} onchange="togglePriorityOption('${p.value}', event)">
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
            ${currentValue ? '<button class="filter-options-clear" onclick="clearTypeFilter()">Clear</button>' : ''}
        </div>
    `;

    types.forEach(t => {
        html += `
            <label class="filter-option" onclick="setTypeFilter('${t.value}')">
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
            ${currentValue ? '<button class="filter-options-clear" onclick="clearAssigneeFilter()">Clear</button>' : ''}
        </div>
        <label class="filter-option" onclick="setAssigneeFilter('')">
            <input type="radio" name="assignee-filter-radio" value="" ${!currentValue ? 'checked' : ''}>
            <span class="filter-option-label">All Assignees</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('me')">
            <input type="radio" name="assignee-filter-radio" value="me" ${currentValue === 'me' ? 'checked' : ''}>
            <span class="filter-option-label">Assigned to me</span>
        </label>
        <label class="filter-option" onclick="setAssigneeFilter('unassigned')">
            <input type="radio" name="assignee-filter-radio" value="unassigned" ${currentValue === 'unassigned' ? 'checked' : ''}>
            <span class="filter-option-label">Unassigned</span>
        </label>
    `;

    members.forEach(m => {
        html += `
            <label class="filter-option" onclick="setAssigneeFilter('${escapeJsString(m.user_id)}')">
                <input type="radio" name="assignee-filter-radio" value="${escapeAttr(m.user_id)}" ${currentValue === m.user_id ? 'checked' : ''}>
                <span class="filter-option-label">${escapeHtml(m.name || m.email)}</span>
            </label>
        `;
    });

    container.innerHTML = html;
}

function renderSprintOptions(container) {
    const sprintFilter = document.getElementById('sprint-filter');
    const currentValue = sprintFilter?.value || '';
    const options = sprintFilter ? Array.from(sprintFilter.options) : [];

    let html = `
        <div class="filter-options-header">
            <span class="filter-options-title">Sprint</span>
            ${currentValue ? '<button class="filter-options-clear" onclick="clearSprintFilter()">Clear</button>' : ''}
        </div>
    `;

    options.forEach(opt => {
        html += `
            <label class="filter-option" onclick="setSprintFilter('${escapeJsString(opt.value)}')">
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
            ${selected.length > 0 ? '<button class="filter-options-clear" onclick="clearLabelFilterNew()">Clear</button>' : ''}
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
                    <input type="checkbox" value="${escapeAttr(cb.value)}" ${selected.includes(cb.value) ? 'checked' : ''} onchange="toggleLabelOption('${escapeJsString(cb.value)}', event)">
                    <span class="filter-option-icon" style="width: 12px; height: 12px; border-radius: 3px; background: ${sanitizeColor(color)};"></span>
                    <span class="filter-option-label">${escapeHtml(name)}</span>
                </label>
            `;
        });
    }

    container.innerHTML = html;
}

// ========================================
// Filter Option Toggle/Set Functions
// ========================================

export function setProjectFilter(value) {
    const filter = document.getElementById('project-filter');
    if (filter) {
        filter.value = value;
        onProjectFilterChange();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('project');
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearProjectFilter() {
    setProjectFilter('');
}

export function toggleStatusOption(value, event) {
    // Sync the hidden dropdown checkbox to match the new menu checkbox
    const dropdown = document.getElementById('status-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateStatusFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
}

export function clearStatusFilterNew() {
    clearStatusFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
    updateFilterChips();
    updateFilterCountBadge();
}

export function togglePriorityOption(value, event) {
    // Sync the hidden dropdown checkbox to match the new menu checkbox
    const dropdown = document.getElementById('priority-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updatePriorityFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('priority');
}

export function clearPriorityFilterNew() {
    clearPriorityFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('priority');
    updateFilterChips();
    updateFilterCountBadge();
}

export function setTypeFilter(value) {
    const filter = document.getElementById('issue-type-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('type');
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearTypeFilter() {
    setTypeFilter('');
}

export function setAssigneeFilter(value) {
    const filter = document.getElementById('assignee-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('assignee');
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearAssigneeFilter() {
    setAssigneeFilter('');
}

export function setSprintFilter(value) {
    const filter = document.getElementById('sprint-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('sprint');
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearSprintFilter() {
    setSprintFilter('');
}

export function toggleLabelOption(value, event) {
    // Sync the hidden dropdown checkbox to match the new menu checkbox
    const dropdown = document.getElementById('label-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateLabelFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('labels');
}

export function clearLabelFilterNew() {
    clearLabelFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('labels');
    updateFilterChips();
    updateFilterCountBadge();
}

// ========================================
// Display Menu Functions
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
        { value: 'priority-asc', label: 'Priority ↑' },
        { value: 'priority-desc', label: 'Priority ↓' },
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
                <div class="display-option ${currentSort === opt.value ? 'active' : ''}" onclick="setSort('${opt.value}')">
                    <span>${opt.label}</span>
                    ${currentSort === opt.value ? '<span class="display-option-check">✓</span>' : ''}
                </div>
            `).join('')}
        </div>
        <div class="display-section">
            <div class="display-section-title">Group by</div>
            ${groupOptions.map(opt => `
                <div class="display-option ${currentGroup === opt.value ? 'active' : ''}" onclick="setGroupBy('${opt.value}')">
                    <span>${opt.label}</span>
                    ${currentGroup === opt.value ? '<span class="display-option-check">✓</span>' : ''}
                </div>
            `).join('')}
        </div>
    `;

    container.innerHTML = html;
}

export function setSort(value) {
    const sortSelect = document.getElementById('sort-by-select');
    if (sortSelect) {
        sortSelect.value = value;
        loadIssues();
    }
    closeAllFilterMenus();
}

export function setGroupBy(value) {
    const groupSelect = document.getElementById('group-by-select');
    if (groupSelect) {
        groupSelect.value = value;
        updateGroupBy();
    }
    closeAllFilterMenus();
}

// ========================================
// Filter Chips Functions
// ========================================

export function updateFilterChips() {
    const container = document.getElementById('filter-chips-row');
    if (!container) return;

    const chips = [];

    // Project chip
    const projectFilter = document.getElementById('project-filter');
    if (projectFilter?.value) {
        const projects = getProjects() || [];
        const project = projects.find(p => p.id === projectFilter.value);
        chips.push({
            category: 'project',
            label: 'Project',
            value: project?.name || 'Unknown',
            clearFn: 'clearProjectFilter()'
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
            clearFn: 'clearStatusFilterNew()'
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
            clearFn: 'clearPriorityFilterNew()'
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
            clearFn: 'clearTypeFilter()'
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
            clearFn: 'clearAssigneeFilter()'
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
            clearFn: 'clearSprintFilter()'
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
            clearFn: 'clearLabelFilterNew()'
        });
    }

    if (chips.length === 0) {
        container.classList.add('hidden');
        container.innerHTML = '';
        return;
    }

    container.classList.remove('hidden');
    let html = chips.map(chip => `
        <span class="filter-chip">
            <span class="filter-chip-label">${chip.label}:</span>
            <span class="filter-chip-value">${escapeHtml(chip.value)}</span>
            <button class="filter-chip-remove" onclick="${chip.clearFn}" title="Remove filter">×</button>
        </span>
    `).join('');

    if (chips.length > 1) {
        html += '<button class="filter-chips-clear-all" onclick="clearAllFilters()">Clear all</button>';
    }

    container.innerHTML = html;
}

export function clearAllFilters() {
    // Clear all hidden controls
    const projectFilter = document.getElementById('project-filter');
    if (projectFilter) projectFilter.value = '';

    clearStatusFilter();
    clearPriorityFilter();

    const typeFilter = document.getElementById('issue-type-filter');
    if (typeFilter) typeFilter.value = '';

    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter) assigneeFilter.value = '';

    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.value = '';

    clearLabelFilter();

    // Refresh issues
    filterIssues();

    // Update UI
    updateFilterChips();
    updateFilterCountBadge();
}

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

export function initFilterBar() {
    updateFilterChips();
    updateFilterCountBadge();

    // Prevent clicks inside filter dropdowns from bubbling to document
    // (which would trigger closeFilterMenuOnOutsideClick)
    const filterDropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');

    if (filterDropdown && !filterDropdown._clickHandlerAdded) {
        filterDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        filterDropdown._clickHandlerAdded = true;
    }

    if (displayDropdown && !displayDropdown._clickHandlerAdded) {
        displayDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        displayDropdown._clickHandlerAdded = true;
    }
}

// ========================================
// Sprint Filter & Budget Bar
// ========================================

export async function updateSprintFilter() {
    const sprintFilter = document.getElementById('sprint-filter');
    if (!sprintFilter) return;

    const projectId = document.getElementById('project-filter')?.value;
    const currentSelection = sprintFilter.value;

    // Base options always available
    let options = `
        <option value="">All Sprints</option>
        <option value="no_sprint">No Sprint</option>
    `;

    // If no project selected, hide budget bar and skip sprint loading
    if (!projectId) {
        updateSprintBudgetBar(null);
    }

    // If a project is selected, load its sprints
    if (projectId) {
        try {
            const sprints = await api.getSprints(projectId);
            // Find current sprint (active)
            const currentSprint = sprints.find(s => s.status === 'active');
            if (currentSprint) {
                options += `<option value="current">Current Sprint (${escapeHtml(currentSprint.name)})</option>`;
            }
            // Update budget bar with active sprint data
            updateSprintBudgetBar(currentSprint || null);
            // Add all sprints
            sprints.forEach(s => {
                const statusLabel = s.status === 'active' ? ' (Active)' : s.status === 'completed' ? ' (Done)' : '';
                options += `<option value="${s.id}">${escapeHtml(s.name)}${statusLabel}</option>`;
            });
        } catch (e) {
            console.error('Failed to load sprints:', e);
        }
    }

    sprintFilter.innerHTML = options;

    // Restore selection if valid (check if option exists)
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
        // Unlimited budget - show spent only
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
// Issue Loading & Search
// ========================================

export async function loadIssues() {
    // Reset keyboard selection when issues are reloaded
    setSelectedIssueIndex(-1);
    if (!window.currentTeam) return;

    const projectId = document.getElementById('project-filter').value;
    const statuses = getSelectedStatuses();
    const priorities = getSelectedPriorities();
    const assigneeFilter = document.getElementById('assignee-filter')?.value;
    const searchQuery = document.getElementById('issue-search')?.value?.trim();

    if (!projectId && getProjects().length === 0) {
        document.getElementById('issues-list').innerHTML = `
            <div class="empty-state">
                <h3>No projects yet</h3>
                <p>Create a project first to add issues</p>
            </div>
        `;
        return;
    }

    // Show loading skeleton
    showIssuesLoadingSkeleton();

    // Build params - only include filters if there are selected values
    const params = {
        limit: 1000,
    };

    // Sort params
    const sortValue = document.getElementById('sort-by-select')?.value || 'created-desc';
    const [sortField, sortOrder] = sortValue.includes('-') ? sortValue.split('-') : [sortValue, null];
    params.sort_by = sortField;
    if (sortOrder) {
        params.order = sortOrder;
    }
    if (statuses.length > 0) {
        params.status = statuses;
    }
    if (priorities.length > 0) {
        params.priority = priorities;
    }
    if (assigneeFilter) {
        // Handle "me" special value
        if (assigneeFilter === 'me') {
            params.assignee_id = getCurrentUser()?.id;
        } else {
            params.assignee_id = assigneeFilter;
        }
    }

    // Handle sprint filter
    const sprintFilter = document.getElementById('sprint-filter')?.value;
    if (sprintFilter) {
        if (sprintFilter === 'current') {
            // Find the current (active) sprint for this project
            if (projectId) {
                try {
                    const sprints = await api.getSprints(projectId);
                    const currentSprint = sprints.find(s => s.status === 'active');
                    if (currentSprint) {
                        params.sprint_id = currentSprint.id;
                    }
                } catch (e) {
                    console.error('Failed to resolve current sprint:', e);
                }
            }
        } else {
            params.sprint_id = sprintFilter;
        }
    }

    const issueTypeFilter = document.getElementById('issue-type-filter')?.value;
    if (issueTypeFilter) {
        params.issue_type = issueTypeFilter;
    }

    // Add search query - server-side search combined with filters
    if (searchQuery && searchQuery.length >= 2) {
        params.search = searchQuery;
    }

    try {
        let issues;
        if (projectId) {
            params.project_id = projectId;
            issues = await api.getIssues(params);
        } else if (getProjects().length > 0) {
            // Load all issues from the team (across all projects)
            issues = await api.getTeamIssues(window.currentTeam.id, params);
        }

        // Client-side label filtering (backend doesn't support label filter params)
        const selectedLabels = getSelectedLabels();
        if (selectedLabels.length > 0) {
            issues = issues.filter(issue => {
                if (!issue.labels || issue.labels.length === 0) return false;
                // Issue must have at least one of the selected labels
                return issue.labels.some(label => selectedLabels.includes(label.id));
            });
        }

        // Store in centralized state
        setIssues(issues);

        // Load sprint data for sprint badges and group-by-sprint
        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);

        renderIssues();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

export function debounceSearch() {
    clearTimeout(getSearchDebounceTimer());
    setSearchDebounceTimer(setTimeout(() => {
        loadIssues();
    }, 300));
}

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

export function filterIssues() {
    syncFiltersToUrl();
    loadIssues();
}

export async function onProjectFilterChange() {
    // Save selection to localStorage
    const projectId = document.getElementById('project-filter')?.value;
    if (projectId) {
        setGlobalProjectSelection(projectId);
    }
    // Update sprint filter options for new project
    await updateSprintFilter();
    updateBoardProjectFilter();
    updateSprintProjectFilter();
    // Then filter issues
    filterIssues();
}

export async function updateGroupBy() {
    syncFiltersToUrl();
    if (getGroupByValue() === 'sprint') {
        const issues = getIssues();
        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);
    }
    renderIssues();
}

export function getGroupByValue() {
    const select = document.getElementById('group-by-select');
    return select ? select.value : '';
}
