/**
 * Issues Filter State module (CHT-1137)
 *
 * Pure filter state management: getters, URL sync, label population.
 * No side-effects (doesn't call filterIssues/renderIssues/updateChips).
 */

import { api } from './api.js';
import { formatStatus, formatPriority, escapeHtml, sanitizeColor } from './utils.js';
import { getCurrentTeam, getCurrentProject, setCurrentProject } from './state.js';
import { getIssueFilters, setIssueFilters } from './storage.js';

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

export function getGroupByValue() {
    const select = document.getElementById('group-by-select');
    return select ? select.value : '';
}

// ========================================
// Constants
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

export const CLOSED_STATUSES = ['done', 'canceled'];

// ========================================
// Filter Count Functions
// ========================================

export function getFilterCategoryCount(category) {
    switch (category) {
        case 'project':
            return getCurrentProject() ? 1 : 0;
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

// ========================================
// URL Filter State Management
// ========================================

export function syncFiltersToUrl() {
    const params = new URLSearchParams();

    const statuses = getSelectedStatuses();
    const priorities = getSelectedPriorities();
    const labels = getSelectedLabels();
    const assignee = document.getElementById('assignee-filter')?.value;
    const project = getCurrentProject() || '';
    const sprint = document.getElementById('sprint-filter')?.value;
    const issueType = document.getElementById('issue-type-filter')?.value;
    const groupBy = document.getElementById('group-by-select')?.value;

    statuses.forEach(s => params.append('status', s));
    priorities.forEach(p => params.append('priority', p));
    labels.forEach(l => params.append('label', l));
    if (assignee) params.set('assignee', assignee);
    if (project) params.set('project', project);
    if (sprint) params.set('sprint', sprint);
    if (issueType) params.set('issue_type', issueType);
    if (groupBy) params.set('groupBy', groupBy);

    const queryString = params.toString();
    const newUrl = queryString ? `/issues?${queryString}` : '/issues';
    history.replaceState({ view: 'issues' }, '', newUrl);

    // Also persist for cross-session recall (CHT-1042)
    setIssueFilters(getCurrentTeam()?.id, queryString);
}

/**
 * Restore filter state from URL or localStorage.
 * @param {Function} setSuppressProjectSubscriber - callback to set the suppress flag
 */
export function loadFiltersFromUrl(setSuppressProjectSubscriber) {
    let params = new URLSearchParams(window.location.search);

    // Fall back to saved filters if URL has no issue-specific filter params (CHT-1042, CHT-1085)
    const FILTER_KEYS = ['status', 'priority', 'label', 'assignee', 'sprint', 'issue_type', 'groupBy'];
    const hasFilterParams = FILTER_KEYS.some(k => params.has(k));
    if (!hasFilterParams) {
        const saved = getIssueFilters(getCurrentTeam()?.id);
        if (saved) {
            const savedParams = new URLSearchParams(saved);
            const project = params.get('project');
            params = savedParams;
            if (project) {
                params.set('project', project);
            }
            const newUrl = `/issues?${params.toString()}`;
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

    // Apply project filter — suppress subscriber to prevent sprint clearing
    const project = params.get('project');
    if (project) {
        setSuppressProjectSubscriber(true);
        setCurrentProject(project);
        setSuppressProjectSubscriber(false);
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

// ========================================
// Filter Label Updaters (label text only, no side effects)
// ========================================

export function updateStatusFilterLabel() {
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

export function updatePriorityFilterLabel() {
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

// ========================================
// Label Filter Population
// ========================================

export async function populateLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    if (!dropdown || !getCurrentTeam()) return;

    const optionsContainer = dropdown.querySelector('.multi-select-options');
    try {
        const labels = await api.getLabels(getCurrentTeam().id);

        optionsContainer.innerHTML = '';

        if (labels.length === 0) {
            optionsContainer.innerHTML = '<div class="multi-select-empty">No labels available</div>';
        } else {
            labels.forEach(lbl => {
                const option = document.createElement('label');
                option.className = 'multi-select-option';
                option.innerHTML = `
                    <input type="checkbox" value="${lbl.id}" data-action="update-label-filter">
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
        actionsDiv.innerHTML = '<button type="button" class="btn btn-small" data-action="clear-label-filter">Clear</button>';
        optionsContainer.appendChild(actionsDiv);
    } catch (e) {
        console.error('Failed to load labels for filter:', e);
    }
}
