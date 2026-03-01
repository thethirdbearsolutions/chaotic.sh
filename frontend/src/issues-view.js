/**
 * Issues View orchestrator (CHT-1137)
 *
 * Slim coordinator that ties together filter state (issues-filter.js)
 * and rendering (issues-render.js). Handles issue loading, filter triggers,
 * action handlers, and event delegation registration.
 *
 * Re-exports everything from issues-filter.js and issues-render.js
 * so downstream consumers (app.js, tests) don't need import changes.
 */

import { api } from './api.js';
import {
    getCurrentUser,
    getCurrentTeam,
    getIssues,
    setIssues,
    getSearchDebounceTimer,
    setSearchDebounceTimer,
    setSelectedIssueIndex,
    getCurrentProject,
    setCurrentProject,
    getCurrentView,
    subscribe,
} from './state.js';
import { getProjects } from './projects.js';
import { ensureSprintCacheForIssues } from './sprints.js';
import { renderIssues } from './issue-list.js';
import { showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import { OPEN_STATUSES } from './constants.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

// Import from sub-modules
import {
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getGroupByValue,
    syncFiltersToUrl,
    loadFiltersFromUrl as _loadFiltersFromUrl,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    CLOSED_STATUSES,
} from './issues-filter.js';

import {
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    closeAllFilterMenus,
    updateFilterChips,
    updateFilterCountBadge,
    updateSprintFilter,
    showIssuesLoadingSkeleton,
} from './issues-render.js';

// Re-export everything from sub-modules for backward compatibility
export {
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getGroupByValue,
    getFilterCategoryCount,
    getTotalFilterCount,
    syncFiltersToUrl,
    FILTER_CATEGORIES,
    CLOSED_STATUSES,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    populateLabelFilter,
} from './issues-filter.js';

export {
    toggleMultiSelect,
    toggleFilterMenu,
    toggleDisplayMenu,
    closeAllFilterMenus,
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    renderDisplayMenuOptions,
    updateFilterChips,
    updateFilterCountBadge,
    updateSprintFilter,
    updateSprintBudgetBar,
    showIssuesLoadingSkeleton,
} from './issues-render.js';

// ========================================
// Module State
// ========================================

// Guard flag: when true, the subscriber skips sprint-clearing logic
// because loadFiltersFromUrl is restoring filters from URL params.
let _suppressProjectSubscriber = false;

// ========================================
// Reactive Subscriber
// ========================================

// React to project changes when issues view is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'issues') return;
    if (_suppressProjectSubscriber) return;
    // Clear sprint filter — sprints are per-project so old value is stale (CHT-1084)
    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.value = '';
    // Update sprint filter options, then re-filter
    updateSprintFilter().then(() => {
        filterIssues();
        updateFilterChips();
        updateFilterCountBadge();
    });
});

// ========================================
// Wrapper for loadFiltersFromUrl
// ========================================

export function loadFiltersFromUrl() {
    _loadFiltersFromUrl((value) => { _suppressProjectSubscriber = value; });
}

// ========================================
// Legacy Filter Update Functions
// ========================================

export function updateStatusFilter() {
    updateStatusFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearStatusFilter() {
    const dropdown = document.getElementById('status-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateStatusFilter();
}

export function updatePriorityFilter() {
    updatePriorityFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearPriorityFilter() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updatePriorityFilter();
}

export function updateLabelFilter() {
    updateLabelFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateLabelFilter();
}

// ========================================
// Issue Loading & Search
// ========================================

export async function loadIssues() {
    setSelectedIssueIndex(-1);
    if (!getCurrentTeam()) return;

    const projectId = getCurrentProject() || '';
    const statuses = getSelectedStatuses();
    const priorities = getSelectedPriorities();
    const assigneeFilter = document.getElementById('assignee-filter')?.value;
    const searchQuery = document.getElementById('issue-search')?.value?.trim();

    if (!projectId && getProjects().length === 0) {
        document.getElementById('issues-list').innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.projects,
            heading: 'No projects yet',
            description: 'Create a project first to add issues',
            cta: { label: 'Create project', action: 'showCreateProjectModal' },
        });
        return;
    }

    showIssuesLoadingSkeleton();

    const params = { limit: 1000 };

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
        if (assigneeFilter === 'me') {
            params.assignee_id = getCurrentUser()?.id;
        } else {
            params.assignee_id = assigneeFilter;
        }
    }

    const sprintFilter = document.getElementById('sprint-filter')?.value;
    if (sprintFilter) {
        if (sprintFilter === 'current') {
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

    if (searchQuery && searchQuery.length >= 2) {
        params.search = searchQuery;
    }

    try {
        let issues;
        if (projectId) {
            params.project_id = projectId;
            issues = await api.getIssues(params);
        } else if (getProjects().length > 0) {
            issues = await api.getTeamIssues(getCurrentTeam().id, params);
        }

        const selectedLabels = getSelectedLabels();
        if (selectedLabels.length > 0) {
            issues = issues.filter(issue => {
                if (!issue.labels || issue.labels.length === 0) return false;
                return issue.labels.some(label => selectedLabels.includes(label.id));
            });
        }

        setIssues(issues);

        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);

        renderIssues();
    } catch (e) {
        showApiError('load issues', e);
    }
}

export function debounceSearch() {
    clearTimeout(getSearchDebounceTimer());
    setSearchDebounceTimer(setTimeout(() => {
        loadIssues();
    }, 300));
}

export function filterIssues() {
    syncFiltersToUrl();
    loadIssues();
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

export function initFilterBar() {
    updateFilterChips();
    updateFilterCountBadge();
}

// ========================================
// Filter Option Toggle/Set Functions
// ========================================

export function setProjectFilter(value) {
    setCurrentProject(value);
    renderFilterMenuCategories();
    showFilterCategoryOptions('project');
}

export function clearProjectFilter() {
    setProjectFilter('');
}

export function setStatusPreset(preset) {
    const statusValues = preset === 'open' ? OPEN_STATUSES : CLOSED_STATUSES;
    const dropdown = document.getElementById('status-filter-dropdown');
    if (!dropdown) return;

    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = statusValues.includes(cb.value);
    });

    updateStatusFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
}

export function toggleStatusOption(value, event) {
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

export function clearAllFilters() {
    setCurrentProject(null);
    clearStatusFilter();
    clearPriorityFilter();

    const typeFilter = document.getElementById('issue-type-filter');
    if (typeFilter) typeFilter.value = '';

    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter) assigneeFilter.value = '';

    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.value = '';

    const searchInput = document.getElementById('issue-search');
    if (searchInput) searchInput.value = '';

    clearLabelFilter();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

// ========================================
// Event Delegation Actions
// ========================================

registerActions({
    'update-label-filter': () => updateLabelFilter(),
    'clear-label-filter': () => clearLabelFilter(),
    'show-filter-category': (_event, dataset) => showFilterCategoryOptions(dataset.category),
    'set-project-filter': (_event, dataset) => setProjectFilter(dataset.value),
    'clear-project-filter': () => clearProjectFilter(),
    'clear-status-filter-new': () => clearStatusFilterNew(),
    'set-status-preset': (_event, dataset) => setStatusPreset(dataset.value),
    'toggle-status-option': (event, dataset) => toggleStatusOption(dataset.filterValue, event),
    'clear-priority-filter-new': () => clearPriorityFilterNew(),
    'toggle-priority-option': (event, dataset) => togglePriorityOption(dataset.filterValue, event),
    'set-type-filter': (_event, dataset) => setTypeFilter(dataset.value),
    'clear-type-filter': () => clearTypeFilter(),
    'set-assignee-filter': (_event, dataset) => setAssigneeFilter(dataset.value),
    'clear-assignee-filter': () => clearAssigneeFilter(),
    'set-sprint-filter': (_event, dataset) => setSprintFilter(dataset.value),
    'clear-sprint-filter': () => clearSprintFilter(),
    'clear-label-filter-new': () => clearLabelFilterNew(),
    'toggle-label-option': (event, dataset) => toggleLabelOption(dataset.filterValue, event),
    'set-sort': (_event, dataset) => setSort(dataset.value),
    'set-group-by': (_event, dataset) => setGroupBy(dataset.value),
    'clear-all-filters': () => clearAllFilters(),
});
