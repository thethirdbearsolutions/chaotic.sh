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
    setDetailNavContext,
    getSearchDebounceTimer,
    setSearchDebounceTimer,
    setSelectedIssueIndex,
    getCurrentProject,
    setCurrentProject,
    getCurrentView,
    subscribe,
} from './state.js';
import { getProjects } from './projects.js';
import { ensureSprintCacheForIssues, getCachedCurrentSprintId, setCachedCurrentSprintId } from './sprints.js';
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
    getExcludedLabels,
    getGroupByValue,
    syncFiltersToUrl,
    loadFiltersFromUrl as _loadFiltersFromUrl,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    updateExcludeLabelFilterLabel,
    populateLabelFilter,
    CLOSED_STATUSES,
} from './issues-filter.js';

import {
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    showFilterCategories,
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
    getExcludedLabels,
    getGroupByValue,
    getFilterCategoryCount,
    getTotalFilterCount,
    syncFiltersToUrl,
    FILTER_CATEGORIES,
    CLOSED_STATUSES,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    updateExcludeLabelFilterLabel,
    populateLabelFilter,
} from './issues-filter.js';

export {
    toggleMultiSelect,
    toggleFilterMenu,
    toggleDisplayMenu,
    closeAllFilterMenus,
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    showFilterCategories,
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
    // Update sprint and label filter options, then clear labels and re-filter (CHT-1162)
    Promise.all([updateSprintFilter(), populateLabelFilter()]).then(() => {
        // Clear label checkboxes after repopulation so DOM state is consistent
        const labelDropdown = document.getElementById('label-filter-dropdown');
        labelDropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
        const excludeLabelDropdown = document.getElementById('exclude-label-filter-dropdown');
        excludeLabelDropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
        updateLabelFilterLabel();
        updateExcludeLabelFilterLabel();
        filterIssues();
        updateFilterChips();
        updateFilterCountBadge();
    }).catch(e => {
        console.error('Failed to update filters on project switch:', e);
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

export function updateExcludeLabelFilter() {
    updateExcludeLabelFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearExcludeLabelFilter() {
    const dropdown = document.getElementById('exclude-label-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateExcludeLabelFilter();
}

// ========================================
// Issue Loading & Search
// ========================================

// Escape a value for interpolation inside a quoted CSS attribute selector
// (`[value="..."]`) — backslashes and double quotes are the only
// metacharacters inside a quoted string (CHT-1212 review).
function escapeSelectorValue(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Resolve label checkbox ids to their display names via the DOM (the
 * backend's label/exclude_label filters match by name, not id) — mirrors
 * the technique updateFilterChips() already uses (CHT-1212).
 */
function resolveLabelNames(labelIds, dropdownId) {
    if (labelIds.length === 0) return [];
    const dropdown = document.getElementById(dropdownId);
    return labelIds
        .map(id => dropdown?.querySelector(`input[value="${escapeSelectorValue(id)}"]`)?.closest('label')?.querySelector('.label-name')?.textContent)
        .filter(Boolean);
}

// Monotonic request id — lets loadIssues() drop a response from a
// superseded request (rapid filter/search changes) instead of overwriting
// newer data with stale data (CHT-1211 item 7).
let loadIssuesRequestId = 0;

export async function loadIssues() {
    setSelectedIssueIndex(-1);
    const requestId = ++loadIssuesRequestId;
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
                // updateSprintFilter() already resolved and cached this same
                // lookup moments earlier (and the active sprint essentially
                // never changes mid-session) — reuse it instead of
                // re-fetching sprints on every loadIssues() call, including
                // every 300ms debounced search keystroke (CHT-1212)
                const cachedId = getCachedCurrentSprintId(projectId);
                if (cachedId !== undefined) {
                    if (cachedId) params.sprint_id = cachedId;
                } else {
                    try {
                        const sprints = await api.getSprints(projectId);
                        const currentSprint = sprints.find(s => s.status === 'active');
                        setCachedCurrentSprintId(projectId, currentSprint?.id);
                        if (currentSprint) {
                            params.sprint_id = currentSprint.id;
                        }
                    } catch (e) {
                        console.error('Failed to resolve current sprint:', e);
                    }
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

    // Backend's search param only requires min_length=1 (CHT-1212) — a 1-char
    // query used to silently no-op with no visible explanation.
    if (searchQuery && searchQuery.length >= 1) {
        params.search = searchQuery;
    }

    try {
        // Label/exclude-label filters are sent to the server (which matches
        // by name, case-insensitively) instead of over-fetching a 1000-row
        // page and filtering client-side (CHT-1212) — resolve id -> name via
        // the DOM the same way updateFilterChips() already does.
        // label_match=any preserves the multi-select UI's OR semantics; the
        // server default (all) is the CLI's documented AND contract.
        const selectedLabelNames = resolveLabelNames(getSelectedLabels(), 'label-filter-dropdown');
        if (selectedLabelNames.length > 0) {
            params.label = selectedLabelNames;
            params.label_match = 'any';
        }

        const excludedLabelNames = resolveLabelNames(getExcludedLabels(), 'exclude-label-filter-dropdown');
        if (excludedLabelNames.length > 0) {
            params.exclude_label = excludedLabelNames;
        }

        let issues;
        if (projectId) {
            params.project_id = projectId;
            issues = await api.getIssues(params);
        } else if (getProjects().length > 0) {
            issues = await api.getTeamIssues(getCurrentTeam().id, params);
        }

        if (requestId !== loadIssuesRequestId) return; // a newer loadIssues() has since started — drop this stale response

        setIssues(issues);
        // Prev/next issue-detail nav context (CHT-1211 item 2) — this is the
        // Issues-view's own list, so it's the reliable source when arriving
        // at an issue detail from here. The request id above only orders
        // loadIssues() against itself — also require that Issues is still
        // the current view at response time, or a slow response landing
        // after the user navigated away would clobber the context another
        // view has since written (CHT-1211 review #2).
        if (getCurrentView() === 'issues') {
            setDetailNavContext(issues);
        }

        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);
        if (requestId !== loadIssuesRequestId) return; // guard again — a newer request may have resolved during the await above

        renderIssues();
    } catch (e) {
        if (requestId !== loadIssuesRequestId) return;
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
    closeAllFilterMenus();
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
    closeAllFilterMenus();
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
    closeAllFilterMenus();
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
    closeAllFilterMenus();
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

export function toggleExcludeLabelOption(value, event) {
    const dropdown = document.getElementById('exclude-label-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateExcludeLabelFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('exclude_labels');
}

export function clearExcludeLabelFilterNew() {
    clearExcludeLabelFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('exclude_labels');
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
    clearExcludeLabelFilter();
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
    'update-exclude-label-filter': () => updateExcludeLabelFilter(),
    'clear-exclude-label-filter': () => clearExcludeLabelFilter(),
    'show-filter-category': (_event, dataset) => {
        showFilterCategoryOptions(dataset.category);
        // CHT-1161: mobile shows one pane at a time — entering a category
        // switches the dropdown to the options pane
        document.getElementById('filter-menu-dropdown')?.classList.add('show-options');
        // CHT-1212: pane switch — move focus into the newly shown options
        // pane so keyboard/screen-reader users don't lose their place
        document.querySelector('#filter-menu-options .filter-options-back')?.focus();
    },
    'filter-menu-back': () => {
        showFilterCategories();
        // CHT-1212: pane switch — return focus to the category list
        const container = document.getElementById('filter-menu-categories');
        const target = container?.querySelector('.filter-menu-category.active') || container?.querySelector('.filter-menu-category');
        target?.focus();
    },
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
    'clear-exclude-label-filter-new': () => clearExcludeLabelFilterNew(),
    'toggle-exclude-label-option': (event, dataset) => toggleExcludeLabelOption(dataset.filterValue, event),
    'set-sort': (_event, dataset) => setSort(dataset.value),
    'set-group-by': (_event, dataset) => setGroupBy(dataset.value),
    'clear-all-filters': () => clearAllFilters(),
});
