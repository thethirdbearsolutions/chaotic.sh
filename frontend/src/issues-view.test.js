/**
 * Tests for issues-view.js module (CHT-783)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    getActiveFilterCategory: vi.fn(() => 'status'),
    setActiveFilterCategory: vi.fn(),
    getCurrentUser: vi.fn(() => ({ id: 'user-1', name: 'Test User' })),
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getSearchDebounceTimer: vi.fn(() => null),
    setSearchDebounceTimer: vi.fn(),
    setSelectedIssueIndex: vi.fn(),
    getCurrentTeam: vi.fn(() => null),
    setCurrentTeam: vi.fn(),
    getCurrentProject: vi.fn(() => null),
    setCurrentProject: vi.fn(),
    getCurrentView: vi.fn(() => 'issues'),
    subscribe: vi.fn(),
}));

// Mock projects.js
vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
}));

// Mock teams.js
vi.mock('./teams.js', () => ({
    getMembers: vi.fn(() => []),
}));

// Mock sprints.js
vi.mock('./sprints.js', () => ({
    ensureSprintCacheForIssues: vi.fn(),
}));

// Mock issue-list.js
vi.mock('./issue-list.js', () => ({
    renderIssues: vi.fn(),
}));

// Mock ui.js
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

// Mock event-delegation.js
vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

// Mock api.js
vi.mock('./api.js', () => ({
    api: {
        getIssues: vi.fn().mockResolvedValue([]),
        getTeamIssues: vi.fn().mockResolvedValue([]),
        getLabels: vi.fn().mockResolvedValue([]),
        getSprints: vi.fn().mockResolvedValue([]),
    },
}));

import { api } from './api.js';
import { getActiveFilterCategory, setActiveFilterCategory, getCurrentUser, setIssues, setSelectedIssueIndex, setSearchDebounceTimer, getCurrentTeam, getCurrentProject, setCurrentProject } from './state.js';
import { getProjects } from './projects.js';
import { getMembers } from './teams.js';
import { renderIssues } from './issue-list.js';
import { showApiError } from './ui.js';

import { registerActions } from './event-delegation.js';

import {
    toggleMultiSelect,
    toggleFilterMenu,
    showFilterCategories,
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getExcludedLabels,
    populateLabelFilter,
    syncFiltersToUrl,
    loadFiltersFromUrl,
    FILTER_CATEGORIES,
    closeAllFilterMenus,
    getFilterCategoryCount,
    getTotalFilterCount,
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    setSort,
    setGroupBy,
    updateFilterChips,
    clearAllFilters,
    updateFilterCountBadge,
    initFilterBar,
    updateSprintFilter,
    updateSprintBudgetBar,
    loadIssues,
    debounceSearch,
    filterIssues,
    getGroupByValue,
    showIssuesLoadingSkeleton,
    renderDisplayMenuOptions,
    setProjectFilter,
    setTypeFilter,
    setAssigneeFilter,
    setSprintFilter,
} from './issues-view.js';

// Actions registered at module import time — capture before vi.clearAllMocks wipes them
const issuesViewActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('issues-view', () => {
    let replaceStateSpy;

    beforeEach(() => {
        vi.clearAllMocks();
        replaceStateSpy = vi.spyOn(history, 'replaceState').mockImplementation(() => {});

        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        getCurrentProject.mockReturnValue(null);

        // Set up minimal DOM for filter elements
        document.body.innerHTML = `
            <div id="status-filter-dropdown" class="multi-select-dropdown">
                <span class="multi-select-label">All Statuses</span>
                <div class="multi-select-options hidden">
                    <label class="multi-select-option"><input type="checkbox" value="backlog"></label>
                    <label class="multi-select-option"><input type="checkbox" value="todo"></label>
                    <label class="multi-select-option"><input type="checkbox" value="in_progress"></label>
                    <label class="multi-select-option"><input type="checkbox" value="done"></label>
                </div>
            </div>
            <div id="priority-filter-dropdown" class="multi-select-dropdown">
                <span class="multi-select-label">All Priorities</span>
                <div class="multi-select-options hidden">
                    <label class="multi-select-option"><input type="checkbox" value="urgent"></label>
                    <label class="multi-select-option"><input type="checkbox" value="high"></label>
                    <label class="multi-select-option"><input type="checkbox" value="medium"></label>
                    <label class="multi-select-option"><input type="checkbox" value="low"></label>
                </div>
            </div>
            <div id="label-filter-dropdown" class="multi-select-dropdown">
                <span class="multi-select-label">All Labels</span>
                <div class="multi-select-options hidden"></div>
            </div>
            <div id="exclude-label-filter-dropdown" class="multi-select-dropdown">
                <span class="multi-select-label">Exclude Labels</span>
                <div class="multi-select-options hidden"></div>
            </div>
            <select id="project-filter">
                <option value="">All</option>
                <option value="proj-1">Project One</option>
                <option value="p-1">Test</option>
            </select>
            <select id="assignee-filter">
                <option value="">All</option>
                <option value="me">Me</option>
                <option value="unassigned">Unassigned</option>
                <option value="user-1">User 1</option>
            </select>
            <select id="sprint-filter">
                <option value="">All Sprints</option>
                <option value="no_sprint">No Sprint</option>
            </select>
            <select id="issue-type-filter">
                <option value="">All Types</option>
                <option value="bug">Bug</option>
            </select>
            <select id="sort-by-select">
                <option value="created-desc">Newest</option>
                <option value="created-asc">Oldest</option>
                <option value="priority-asc">Priority ↑</option>
                <option value="priority-desc">Priority ↓</option>
            </select>
            <select id="group-by-select">
                <option value="">No grouping</option>
                <option value="status">Status</option>
                <option value="priority">Priority</option>
            </select>
            <div id="issues-list"></div>
            <input id="issue-search" type="text" value="">
            <div id="filter-chips-row" class="hidden"></div>
            <div id="filter-count-badge" class="hidden"></div>
            <div id="filter-menu-dropdown" class="hidden">
                <div id="filter-menu-categories"></div>
                <div id="filter-menu-options"></div>
            </div>
            <div id="display-menu-dropdown" class="hidden"></div>
            <div id="sprint-budget-bar" class="hidden"></div>
        `;
    });

    afterEach(() => {
        replaceStateSpy.mockRestore();
        document.body.innerHTML = '';
        getCurrentTeam.mockReturnValue(null);
    });

    // ========================================
    // Filter Getters
    // ========================================

    describe('getSelectedStatuses', () => {
        it('returns empty array when no statuses checked', () => {
            expect(getSelectedStatuses()).toEqual([]);
        });

        it('returns checked status values', () => {
            const backlog = document.querySelector('#status-filter-dropdown input[value="backlog"]');
            const done = document.querySelector('#status-filter-dropdown input[value="done"]');
            backlog.checked = true;
            done.checked = true;
            expect(getSelectedStatuses()).toEqual(['backlog', 'done']);
        });

        it('returns empty array when dropdown does not exist', () => {
            document.getElementById('status-filter-dropdown').remove();
            expect(getSelectedStatuses()).toEqual([]);
        });
    });

    describe('getSelectedPriorities', () => {
        it('returns empty array when no priorities checked', () => {
            expect(getSelectedPriorities()).toEqual([]);
        });

        it('returns checked priority values', () => {
            const urgent = document.querySelector('#priority-filter-dropdown input[value="urgent"]');
            urgent.checked = true;
            expect(getSelectedPriorities()).toEqual(['urgent']);
        });
    });

    describe('getSelectedLabels', () => {
        it('returns empty array when no labels checked', () => {
            expect(getSelectedLabels()).toEqual([]);
        });
    });

    describe('getExcludedLabels', () => {
        it('returns empty array when no labels checked', () => {
            expect(getExcludedLabels()).toEqual([]);
        });

        it('returns checked label IDs from the exclude dropdown', () => {
            const dropdown = document.getElementById('exclude-label-filter-dropdown');
            dropdown.querySelector('.multi-select-options').innerHTML = `
                <label class="multi-select-option"><input type="checkbox" value="lbl-a" checked></label>
                <label class="multi-select-option"><input type="checkbox" value="lbl-b"></label>
                <label class="multi-select-option"><input type="checkbox" value="lbl-c" checked></label>
            `;
            expect(getExcludedLabels().sort()).toEqual(['lbl-a', 'lbl-c']);
        });

        it('is independent from include labels', () => {
            // Check an include label
            document.getElementById('label-filter-dropdown')
                .querySelector('.multi-select-options').innerHTML =
                '<label class="multi-select-option"><input type="checkbox" value="lbl-a" checked></label>';
            // Excludes empty
            expect(getSelectedLabels()).toEqual(['lbl-a']);
            expect(getExcludedLabels()).toEqual([]);
        });
    });

    // ========================================
    // FILTER_CATEGORIES
    // ========================================

    describe('FILTER_CATEGORIES', () => {
        it('has 8 categories', () => {
            expect(FILTER_CATEGORIES).toHaveLength(8);
        });

        it('includes project, status, priority, type, assignee, sprint, labels, exclude_labels', () => {
            const keys = FILTER_CATEGORIES.map(c => c.key);
            expect(keys).toEqual(['project', 'status', 'priority', 'type', 'assignee', 'sprint', 'labels', 'exclude_labels']);
        });
    });

    // ========================================
    // getFilterCategoryCount / getTotalFilterCount
    // ========================================

    describe('getFilterCategoryCount', () => {
        it('returns 0 for project when no project selected', () => {
            expect(getFilterCategoryCount('project')).toBe(0);
        });

        it('returns 1 for project when a project is selected', () => {
            getCurrentProject.mockReturnValue('proj-1');
            expect(getFilterCategoryCount('project')).toBe(1);
            getCurrentProject.mockReturnValue(null);
        });

        it('returns number of selected statuses', () => {
            document.querySelector('#status-filter-dropdown input[value="backlog"]').checked = true;
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;
            expect(getFilterCategoryCount('status')).toBe(2);
        });

        it('returns 0 for unknown category', () => {
            expect(getFilterCategoryCount('unknown')).toBe(0);
        });
    });

    describe('getTotalFilterCount', () => {
        it('returns 0 when no filters selected', () => {
            expect(getTotalFilterCount()).toBe(0);
        });

        it('sums counts across all categories', () => {
            getCurrentProject.mockReturnValue('proj-1');
            document.querySelector('#status-filter-dropdown input[value="backlog"]').checked = true;
            expect(getTotalFilterCount()).toBe(2);
            getCurrentProject.mockReturnValue(null);
        });
    });

    // ========================================
    // closeAllFilterMenus
    // ========================================

    describe('closeAllFilterMenus', () => {
        it('hides filter and display dropdowns', () => {
            document.getElementById('filter-menu-dropdown').classList.remove('hidden');
            document.getElementById('display-menu-dropdown').classList.remove('hidden');

            closeAllFilterMenus();

            expect(document.getElementById('filter-menu-dropdown').classList.contains('hidden')).toBe(true);
            expect(document.getElementById('display-menu-dropdown').classList.contains('hidden')).toBe(true);
        });
    });

    // ========================================
    // showFilterCategoryOptions
    // ========================================

    describe('showFilterCategoryOptions', () => {
        it('calls setActiveFilterCategory', () => {
            showFilterCategoryOptions('priority');
            expect(setActiveFilterCategory).toHaveBeenCalledWith('priority');
        });

        it('renders status options', () => {
            showFilterCategoryOptions('status');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Backlog');
            expect(container.innerHTML).toContain('Todo');
            expect(container.innerHTML).toContain('In Progress');
        });

        it('renders priority options', () => {
            showFilterCategoryOptions('priority');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Urgent');
            expect(container.innerHTML).toContain('High');
        });

        it('renders type options', () => {
            showFilterCategoryOptions('type');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Task');
            expect(container.innerHTML).toContain('Bug');
            expect(container.innerHTML).toContain('Feature');
            expect(container.innerHTML).toContain('Tech Debt');
            expect(container.innerHTML).toContain('Epic');
        });

        it('renders assignee options with team members', () => {
            getMembers.mockReturnValue([
                { user_id: 'u-1', name: 'Alice', email: 'alice@example.com' },
                { user_id: 'u-2', name: 'Bob', email: 'bob@example.com' },
            ]);
            showFilterCategoryOptions('assignee');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Alice');
            expect(container.innerHTML).toContain('Bob');
            expect(container.innerHTML).toContain('Assigned to me');
            expect(container.innerHTML).toContain('Unassigned');
        });

        it('renders project options', () => {
            getProjects.mockReturnValue([
                { id: 'p-1', name: 'Project Alpha', color: '#ff0000' },
            ]);
            showFilterCategoryOptions('project');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Project Alpha');
            expect(container.innerHTML).toContain('All Projects');
        });

        it('renders sprint options from select element', () => {
            getCurrentProject.mockReturnValue('proj-1');
            showFilterCategoryOptions('sprint');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('All Sprints');
            expect(container.innerHTML).toContain('No Sprint');
        });

        it('shows empty message for sprint when no project selected (CHT-1084)', () => {
            getCurrentProject.mockReturnValue(null);
            showFilterCategoryOptions('sprint');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('Select a project first');
            expect(container.innerHTML).not.toContain('No Sprint');
        });
    });

    // ========================================
    // renderFilterMenuCategories
    // ========================================

    describe('renderFilterMenuCategories', () => {
        it('renders all 8 categories', () => {
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.querySelectorAll('.filter-menu-category')).toHaveLength(8);
        });

        it('marks active category', () => {
            getActiveFilterCategory.mockReturnValue('priority');
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            const active = container.querySelector('.filter-menu-category.active');
            expect(active).not.toBeNull();
            expect(active.textContent).toContain('Priority');
        });

        it('shows count badge for filtered categories', () => {
            getCurrentProject.mockReturnValue('proj-1');
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.innerHTML).toContain('filter-menu-category-count');
        });

        // CHT-1161: arrows are a persistent affordance, not conditional on filter state
        it('shows arrow indicator on every category even with no filters', () => {
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.querySelectorAll('.filter-menu-category-arrow')).toHaveLength(8);
        });

        it('shows arrow indicator alongside count badge when filters are applied', () => {
            getCurrentProject.mockReturnValue('proj-1');
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            const projectCat = container.querySelector('[data-category="project"]');
            expect(projectCat.querySelector('.filter-menu-category-count')).not.toBeNull();
            expect(projectCat.querySelector('.filter-menu-category-arrow')).not.toBeNull();
            expect(container.querySelectorAll('.filter-menu-category-arrow')).toHaveLength(8);
        });
    });

    // ========================================
    // Filter menu back navigation (CHT-1161)
    // ========================================

    describe('filter menu back navigation (CHT-1161)', () => {
        it('showFilterCategoryOptions injects a back button into the options header', () => {
            showFilterCategoryOptions('status');
            const back = document.querySelector('#filter-menu-options .filter-options-header .filter-options-back');
            expect(back).not.toBeNull();
            expect(back.tagName).toBe('BUTTON');
            expect(back.dataset.action).toBe('filter-menu-back');
            expect(back.getAttribute('aria-label')).toBe('Back to filter categories');
        });

        it('injects a back button for every category', () => {
            for (const cat of FILTER_CATEGORIES) {
                showFilterCategoryOptions(cat.key);
                const back = document.querySelector('#filter-menu-options .filter-options-back');
                expect(back, `back button missing for ${cat.key}`).not.toBeNull();
            }
        });

        it('show-filter-category action switches the dropdown to the options pane', () => {
            const dropdown = document.getElementById('filter-menu-dropdown');
            issuesViewActions['show-filter-category'](null, { category: 'status' });
            expect(dropdown.classList.contains('show-options')).toBe(true);
        });

        it('filter-menu-back action returns to the category pane', () => {
            const dropdown = document.getElementById('filter-menu-dropdown');
            dropdown.classList.add('show-options');
            issuesViewActions['filter-menu-back']();
            expect(dropdown.classList.contains('show-options')).toBe(false);
        });

        // CHT-1212: pane switches dropped keyboard focus into the void
        describe('focus management on pane switch (CHT-1212)', () => {
            it('show-filter-category focuses the back button in the newly rendered options pane', () => {
                issuesViewActions['show-filter-category'](null, { category: 'status' });
                const back = document.querySelector('#filter-menu-options .filter-options-back');
                expect(document.activeElement).toBe(back);
            });

            it('filter-menu-back focuses the active category row', () => {
                getActiveFilterCategory.mockReturnValue('priority');
                issuesViewActions['show-filter-category'](null, { category: 'priority' });
                issuesViewActions['filter-menu-back']();
                const active = document.querySelector('#filter-menu-categories .filter-menu-category.active');
                expect(document.activeElement).toBe(active);
                expect(active.textContent).toContain('Priority');
            });

            it('filter-menu-back falls back to the first category row when none is active', () => {
                getActiveFilterCategory.mockReturnValue(undefined);
                issuesViewActions['filter-menu-back']();
                const first = document.querySelector('#filter-menu-categories .filter-menu-category');
                expect(document.activeElement).toBe(first);
            });
        });

        it('showFilterCategories re-renders the category list', () => {
            document.getElementById('filter-menu-categories').innerHTML = '';
            showFilterCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.querySelectorAll('.filter-menu-category')).toHaveLength(8);
        });

        it('toggleFilterMenu opens on the category pane, not a stale options pane', () => {
            const dropdown = document.getElementById('filter-menu-dropdown');
            dropdown.classList.add('show-options');
            toggleFilterMenu();
            expect(dropdown.classList.contains('hidden')).toBe(false);
            expect(dropdown.classList.contains('show-options')).toBe(false);
        });
    });

    // ========================================
    // syncFiltersToUrl
    // ========================================

    describe('syncFiltersToUrl', () => {
        it('calls replaceState with filter params', () => {
            getCurrentProject.mockReturnValue('proj-1');
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;

            syncFiltersToUrl();

            expect(replaceStateSpy).toHaveBeenCalled();
            const url = replaceStateSpy.mock.calls[0][2];
            expect(url).toContain('project=proj-1');
            expect(url).toContain('status=todo');
        });

        it('generates clean URL with no filters', () => {
            syncFiltersToUrl();

            expect(replaceStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                '/issues'
            );
        });

        it('saves filters to localStorage scoped by team (CHT-1042)', () => {
            getCurrentProject.mockReturnValue('proj-1');
            syncFiltersToUrl();
            expect(localStorage.getItem('chaotic_issues_filters_team-1')).toContain('project=proj-1');
        });

        it('clears localStorage when no filters (CHT-1042)', () => {
            localStorage.setItem('chaotic_issues_filters_team-1', 'project=proj-1');
            syncFiltersToUrl();
            expect(localStorage.getItem('chaotic_issues_filters_team-1')).toBeNull();
        });

        it('does not save to localStorage when no team (CHT-1042)', () => {
            getCurrentTeam.mockReturnValue(null);
            getCurrentProject.mockReturnValue('proj-1');
            syncFiltersToUrl();
            expect(localStorage.getItem('chaotic_issues_filters_null')).toBeNull();
            getCurrentTeam.mockReturnValue({ id: 'team-1' });
        });

        it('serializes excluded labels as exclude_label= params', () => {
            document.getElementById('exclude-label-filter-dropdown')
                .querySelector('.multi-select-options').innerHTML = `
                    <label class="multi-select-option"><input type="checkbox" value="lbl-x" checked></label>
                    <label class="multi-select-option"><input type="checkbox" value="lbl-y" checked></label>
                `;
            syncFiltersToUrl();
            const url = replaceStateSpy.mock.calls[0][2];
            expect(url).toContain('exclude_label=lbl-x');
            expect(url).toContain('exclude_label=lbl-y');
        });

        // CHT-1212: Sort wasn't part of shareable/persisted filter state, unlike Group-by
        it('persists a non-default sort choice as sort=', () => {
            document.getElementById('sort-by-select').value = 'priority-desc';
            syncFiltersToUrl();
            const url = replaceStateSpy.mock.calls[0][2];
            expect(url).toContain('sort=priority-desc');
        });

        it('omits sort= when the default (created-desc) is selected', () => {
            document.getElementById('sort-by-select').value = 'created-desc';
            syncFiltersToUrl();
            const url = replaceStateSpy.mock.calls[0][2];
            expect(url).not.toContain('sort=');
        });

        it('persists sort alongside groupBy', () => {
            document.getElementById('sort-by-select').value = 'priority-asc';
            document.getElementById('group-by-select').value = 'priority';
            syncFiltersToUrl();
            const url = replaceStateSpy.mock.calls[0][2];
            expect(url).toContain('sort=priority-asc');
            expect(url).toContain('groupBy=priority');
        });
    });

    // ========================================
    // loadFiltersFromUrl
    // ========================================

    describe('loadFiltersFromUrl', () => {
        it('applies status filters from URL', () => {
            // Simulate URL with status params
            Object.defineProperty(window, 'location', {
                value: { search: '?status=todo&status=done', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });

            loadFiltersFromUrl();

            const todoCheckbox = document.querySelector('#status-filter-dropdown input[value="todo"]');
            const doneCheckbox = document.querySelector('#status-filter-dropdown input[value="done"]');
            expect(todoCheckbox.checked).toBe(true);
            expect(doneCheckbox.checked).toBe(true);
        });

        it('applies project filter from URL', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '?project=proj-1', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });

            loadFiltersFromUrl();

            expect(setCurrentProject).toHaveBeenCalledWith('proj-1');
        });

        it('applies exclude_label filters from URL', () => {
            // Pre-populate the exclude dropdown with the relevant options so
            // loadFiltersFromUrl can flip the checkboxes on.
            document.getElementById('exclude-label-filter-dropdown')
                .querySelector('.multi-select-options').innerHTML = `
                    <label class="multi-select-option"><input type="checkbox" value="lbl-x"></label>
                    <label class="multi-select-option"><input type="checkbox" value="lbl-y"></label>
                    <label class="multi-select-option"><input type="checkbox" value="lbl-z"></label>
                `;

            Object.defineProperty(window, 'location', {
                value: { search: '?exclude_label=lbl-x&exclude_label=lbl-z', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });

            loadFiltersFromUrl();

            expect(document.querySelector('#exclude-label-filter-dropdown input[value="lbl-x"]').checked).toBe(true);
            expect(document.querySelector('#exclude-label-filter-dropdown input[value="lbl-y"]').checked).toBe(false);
            expect(document.querySelector('#exclude-label-filter-dropdown input[value="lbl-z"]').checked).toBe(true);
        });

        it('falls back to team-scoped localStorage when URL has no params (CHT-1042)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'project=proj-1');

            loadFiltersFromUrl();

            expect(setCurrentProject).toHaveBeenCalledWith('proj-1');
            expect(replaceStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                '/issues?project=proj-1'
            );
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });

        it('does not restore localStorage filters when URL has project param (CHT-1156)', () => {
            // Navigating to /issues?project=proj-1 should show all issues for that project
            // without mixing in stale filters from localStorage
            Object.defineProperty(window, 'location', {
                value: { search: '?project=proj-1', pathname: '/issues', href: 'http://localhost/issues?project=proj-1' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'status=todo&status=in_progress&project=proj-1');

            loadFiltersFromUrl();

            // Should apply project from URL
            expect(setCurrentProject).toHaveBeenCalledWith('proj-1');
            // Should NOT restore stale status filters from localStorage
            const todoCheckbox = document.querySelector('#status-filter-dropdown input[value="todo"]');
            expect(todoCheckbox.checked).toBe(false);
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });

        it('URL project param prevents localStorage fallback (CHT-1156)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '?project=proj-1', pathname: '/issues', href: 'http://localhost/issues?project=proj-1' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'status=todo&project=p-1');

            loadFiltersFromUrl();

            // URL project should be applied
            expect(setCurrentProject).toHaveBeenCalledWith('proj-1');
            // Stale status filter from localStorage should NOT be restored
            const todoCheckbox = document.querySelector('#status-filter-dropdown input[value="todo"]');
            expect(todoCheckbox.checked).toBe(false);
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });

        it('does not fall back when URL has filter params (CHT-1085)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '?project=proj-1&status=done', pathname: '/issues', href: 'http://localhost/issues?project=proj-1&status=done' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'status=todo&project=proj-2');

            loadFiltersFromUrl();

            // Should apply URL filters, NOT localStorage
            expect(setCurrentProject).toHaveBeenCalledWith('proj-1');
            const doneCheckbox = document.querySelector('#status-filter-dropdown input[value="done"]');
            expect(doneCheckbox.checked).toBe(true);
            // 'todo' from localStorage should NOT be applied
            const todoCheckbox = document.querySelector('#status-filter-dropdown input[value="todo"]');
            expect(todoCheckbox.checked).toBe(false);
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });

        it('applies sort filter from URL (CHT-1212)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '?sort=priority-asc', pathname: '/issues', href: 'http://localhost/issues?sort=priority-asc' },
                writable: true,
                configurable: true,
            });

            loadFiltersFromUrl();

            expect(document.getElementById('sort-by-select').value).toBe('priority-asc');
        });

        it('a bare sort= param alone still counts as a filter param, skipping localStorage fallback (CHT-1212)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '?sort=title-desc', pathname: '/issues', href: 'http://localhost/issues?sort=title-desc' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'project=proj-9');

            loadFiltersFromUrl();

            expect(setCurrentProject).not.toHaveBeenCalledWith('proj-9');
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });

        it('does not fall back to localStorage when no team (CHT-1042)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });
            getCurrentTeam.mockReturnValue(null);
            localStorage.setItem('chaotic_issues_filters_team-1', 'project=proj-1');

            loadFiltersFromUrl();

            // Should not apply the saved filter
            expect(document.getElementById('project-filter').value).toBe('');
            getCurrentTeam.mockReturnValue({ id: 'team-1' });
            localStorage.removeItem('chaotic_issues_filters_team-1');
        });
    });

    // ========================================
    // Filter Chips
    // ========================================

    describe('updateFilterChips', () => {
        it('hides chip container when no filters', () => {
            updateFilterChips();
            const container = document.getElementById('filter-chips-row');
            expect(container.classList.contains('hidden')).toBe(true);
        });

        it('shows chips when filters are active', () => {
            getCurrentProject.mockReturnValue('proj-1');
            getProjects.mockReturnValue([{ id: 'proj-1', name: 'Project Alpha' }]);

            updateFilterChips();

            const container = document.getElementById('filter-chips-row');
            expect(container.classList.contains('hidden')).toBe(false);
            expect(container.innerHTML).toContain('Project');
            expect(container.innerHTML).toContain('Project Alpha');
        });

        it('shows clear all button when multiple filters', () => {
            getCurrentProject.mockReturnValue('proj-1');
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;
            getProjects.mockReturnValue([{ id: 'proj-1', name: 'Test' }]);

            updateFilterChips();

            const container = document.getElementById('filter-chips-row');
            expect(container.innerHTML).toContain('Clear all');
        });

        // CHT-1212: Excluded Labels chip was wired inconsistently with its
        // sibling Labels chip (different clearAction, inconsistent casing)
        describe('Excluded Labels chip (CHT-1212)', () => {
            beforeEach(() => {
                document.getElementById('exclude-label-filter-dropdown')
                    .querySelector('.multi-select-options').innerHTML = `
                        <label class="multi-select-option">
                            <input type="checkbox" value="lbl-x" checked>
                            <span class="label-badge"><span class="label-name">Wontfix</span></span>
                        </label>
                    `;
            });

            it('renders "Excluded Labels" in Title Case, matching the Labels chip', () => {
                updateFilterChips();
                const container = document.getElementById('filter-chips-row');
                expect(container.innerHTML).toContain('Excluded Labels');
                expect(container.innerHTML).not.toContain('Excluded labels');
            });

            it('wires the × to clear-exclude-label-filter-new, matching the Labels chip pattern', () => {
                updateFilterChips();
                const container = document.getElementById('filter-chips-row');
                const removeBtn = Array.from(container.querySelectorAll('.filter-chip-remove'))
                    .find(btn => btn.closest('.filter-chip').textContent.includes('Excluded Labels'));
                expect(removeBtn.dataset.action).toBe('clear-exclude-label-filter-new');
            });
        });
    });

    describe('updateFilterCountBadge', () => {
        it('hides badge when no filters', () => {
            updateFilterCountBadge();
            const badge = document.getElementById('filter-count-badge');
            expect(badge.classList.contains('hidden')).toBe(true);
        });

        it('shows badge with count when filters active', () => {
            getCurrentProject.mockReturnValue('proj-1');
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;

            updateFilterCountBadge();

            const badge = document.getElementById('filter-count-badge');
            expect(badge.classList.contains('hidden')).toBe(false);
            expect(badge.textContent).toBe('2');
        });
    });

    // ========================================
    // initFilterBar
    // ========================================

    describe('initFilterBar', () => {
        it('calls updateFilterChips and updateFilterCountBadge without error', () => {
            initFilterBar();
            // Should not throw
            expect(true).toBe(true);
        });

        it('can be called multiple times safely', () => {
            initFilterBar();
            initFilterBar();
            // Should not throw
            expect(true).toBe(true);
        });
    });

    // ========================================
    // Sprint Budget Bar
    // ========================================

    describe('updateSprintBudgetBar', () => {
        it('hides bar when no active sprint', () => {
            updateSprintBudgetBar(null);
            const bar = document.getElementById('sprint-budget-bar');
            expect(bar.classList.contains('hidden')).toBe(true);
        });

        it('shows budget progress when sprint has budget', () => {
            updateSprintBudgetBar({
                name: 'Sprint 1',
                points_spent: 5,
                budget: 10,
            });
            const bar = document.getElementById('sprint-budget-bar');
            expect(bar.classList.contains('hidden')).toBe(false);
            expect(bar.innerHTML).toContain('Sprint 1');
            expect(bar.innerHTML).toContain('5 / 10 points');
        });

        it('shows arrears badge when over budget', () => {
            updateSprintBudgetBar({
                name: 'Sprint 2',
                points_spent: 15,
                budget: 10,
            });
            const bar = document.getElementById('sprint-budget-bar');
            expect(bar.innerHTML).toContain('In Arrears');
            expect(bar.classList.contains('arrears')).toBe(true);
        });

        it('shows no budget message for unlimited budget', () => {
            updateSprintBudgetBar({
                name: 'Sprint 3',
                points_spent: 5,
                budget: null,
            });
            const bar = document.getElementById('sprint-budget-bar');
            expect(bar.innerHTML).toContain('no budget');
        });

        it('shows warning class at 80%+ usage', () => {
            updateSprintBudgetBar({
                name: 'Sprint 4',
                points_spent: 8,
                budget: 10,
            });
            const bar = document.getElementById('sprint-budget-bar');
            expect(bar.innerHTML).toContain('budget-warning');
        });
    });

    // ========================================
    // loadIssues
    // ========================================

    describe('loadIssues', () => {
        beforeEach(() => {
            getProjects.mockReturnValue([{ id: 'p-1', name: 'Test' }]);
            getCurrentProject.mockReturnValue('p-1');
        });

        it('resets selected issue index', async () => {
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(setSelectedIssueIndex).toHaveBeenCalledWith(-1);
        });

        it('calls api.getIssues with project ID', async () => {
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ project_id: 'p-1' })
            );
        });

        it('stores issues in centralized state', async () => {
            const mockIssues = [{ id: 'i-1', project_id: 'p-1' }];
            api.getIssues.mockResolvedValue(mockIssues);
            await loadIssues();
            expect(setIssues).toHaveBeenCalledWith(mockIssues);
        });

        it('calls renderIssues after loading', async () => {
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(renderIssues).toHaveBeenCalled();
        });

        it('includes status filters in params', async () => {
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ status: ['todo'] })
            );
        });

        it('includes priority filters in params', async () => {
            document.querySelector('#priority-filter-dropdown input[value="urgent"]').checked = true;
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ priority: ['urgent'] })
            );
        });

        it('handles "me" assignee filter', async () => {
            getCurrentUser.mockReturnValue({ id: 'user-1' });
            document.getElementById('assignee-filter').innerHTML = '<option value="me">Me</option>';
            document.getElementById('assignee-filter').value = 'me';
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ assignee_id: 'user-1' })
            );
        });

        it('shows empty state when no projects', async () => {
            getCurrentProject.mockReturnValue(null);
            getProjects.mockReturnValue([]);
            await loadIssues();
            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No projects yet');
        });

        it('returns early when no currentTeam', async () => {
            getCurrentTeam.mockReturnValue(null);
            await loadIssues();
            expect(api.getIssues).not.toHaveBeenCalled();
        });

        it('filters issues by labels client-side', async () => {
            // Set up label checkboxes
            const labelDropdown = document.getElementById('label-filter-dropdown');
            labelDropdown.querySelector('.multi-select-options').innerHTML = `
                <label class="multi-select-option"><input type="checkbox" value="label-1" checked></label>
            `;

            const mockIssues = [
                { id: 'i-1', project_id: 'p-1', labels: [{ id: 'label-1' }] },
                { id: 'i-2', project_id: 'p-1', labels: [{ id: 'label-2' }] },
                { id: 'i-3', project_id: 'p-1', labels: [] },
            ];
            api.getIssues.mockResolvedValue(mockIssues);
            await loadIssues();

            // Only issue with label-1 should be stored
            expect(setIssues).toHaveBeenCalledWith([mockIssues[0]]);
        });

        it('shows error toast on API failure', async () => {
            api.getIssues.mockRejectedValue(new Error('Network error'));
            await loadIssues();
            expect(showApiError).toHaveBeenCalledWith('load issues', expect.objectContaining({ message: 'Network error' }));
        });

        // CHT-1212: sub-2-char search used to silently no-op even though the
        // backend only requires min_length=1
        it('includes a 1-character search query in params', async () => {
            document.getElementById('issue-search').value = 'b';
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ search: 'b' })
            );
        });

        it('includes a 2+ character search query in params', async () => {
            document.getElementById('issue-search').value = 'bug';
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.objectContaining({ search: 'bug' })
            );
        });

        it('omits search from params when the query is empty', async () => {
            document.getElementById('issue-search').value = '';
            api.getIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getIssues).toHaveBeenCalledWith(
                expect.not.objectContaining({ search: expect.anything() })
            );
        });

        it('loads team issues when no project selected', async () => {
            getCurrentProject.mockReturnValue(null);
            getProjects.mockReturnValue([{ id: 'p-1' }]);
            api.getTeamIssues.mockResolvedValue([]);
            await loadIssues();
            expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', expect.any(Object));
        });
    });

    // ========================================
    // debounceSearch
    // ========================================

    describe('debounceSearch', () => {
        it('calls setSearchDebounceTimer with a timeout', () => {
            debounceSearch();
            expect(setSearchDebounceTimer).toHaveBeenCalled();
        });
    });

    // ========================================
    // showIssuesLoadingSkeleton
    // ========================================

    describe('showIssuesLoadingSkeleton', () => {
        it('renders skeleton items', () => {
            showIssuesLoadingSkeleton();
            const list = document.getElementById('issues-list');
            expect(list.querySelectorAll('.skeleton-list-item')).toHaveLength(5);
        });
    });

    // ========================================
    // getGroupByValue
    // ========================================

    describe('getGroupByValue', () => {
        it('returns current group-by value', () => {
            document.getElementById('group-by-select').value = 'status';
            expect(getGroupByValue()).toBe('status');
        });

        it('returns empty string by default', () => {
            expect(getGroupByValue()).toBe('');
        });
    });

    // ========================================
    // clearAllFilters
    // ========================================

    describe('clearAllFilters', () => {
        it('clears project filter', () => {
            getCurrentProject.mockReturnValue('proj-1');
            getProjects.mockReturnValue([{ id: 'proj-1' }]);
            api.getTeamIssues.mockResolvedValue([]);
            clearAllFilters();
            expect(setCurrentProject).toHaveBeenCalledWith(null);
        });

        it('clears type filter', () => {
            document.getElementById('issue-type-filter').value = 'bug';
            getProjects.mockReturnValue([]);
            clearAllFilters();
            expect(document.getElementById('issue-type-filter').value).toBe('');
        });

        it('clears assignee filter', () => {
            document.getElementById('assignee-filter').value = 'user-1';
            getProjects.mockReturnValue([]);
            clearAllFilters();
            expect(document.getElementById('assignee-filter').value).toBe('');
        });
    });

    // ========================================
    // setSort / setGroupBy
    // ========================================

    describe('setSort', () => {
        it('updates sort select value', () => {
            getProjects.mockReturnValue([]);
            setSort('priority-asc');
            expect(document.getElementById('sort-by-select').value).toBe('priority-asc');
        });
    });

    describe('setGroupBy', () => {
        it('updates group-by select value', () => {
            setGroupBy('status');
            expect(document.getElementById('group-by-select').value).toBe('status');
        });
    });

    // ========================================
    // Single-select filter categories auto-close the popover (CHT-1212)
    // ========================================

    describe('single-select filter auto-close (CHT-1212)', () => {
        beforeEach(() => {
            getProjects.mockReturnValue([]);
            document.getElementById('filter-menu-dropdown').classList.remove('hidden');
            document.getElementById('display-menu-dropdown').classList.remove('hidden');
        });

        it('setProjectFilter closes the filter menu, matching Display-menu behavior', () => {
            setProjectFilter('proj-1');
            expect(document.getElementById('filter-menu-dropdown').classList.contains('hidden')).toBe(true);
        });

        it('setTypeFilter closes the filter menu', () => {
            setTypeFilter('bug');
            expect(document.getElementById('filter-menu-dropdown').classList.contains('hidden')).toBe(true);
        });

        it('setAssigneeFilter closes the filter menu', () => {
            setAssigneeFilter('me');
            expect(document.getElementById('filter-menu-dropdown').classList.contains('hidden')).toBe(true);
        });

        it('setSprintFilter closes the filter menu', () => {
            setSprintFilter('sprint-1');
            expect(document.getElementById('filter-menu-dropdown').classList.contains('hidden')).toBe(true);
        });
    });

    // ========================================
    // toggleMultiSelect
    // ========================================

    describe('toggleMultiSelect', () => {
        it('opens multi-select options when closed', () => {
            toggleMultiSelect('status-filter-dropdown');
            const options = document.querySelector('#status-filter-dropdown .multi-select-options');
            expect(options.classList.contains('hidden')).toBe(false);
        });

        it('closes all multi-selects first', () => {
            // Open one first
            toggleMultiSelect('status-filter-dropdown');
            // Open another
            toggleMultiSelect('priority-filter-dropdown');
            const statusOptions = document.querySelector('#status-filter-dropdown .multi-select-options');
            expect(statusOptions.classList.contains('hidden')).toBe(true);
        });
    });

    // ========================================
    // populateLabelFilter
    // ========================================

    describe('populateLabelFilter', () => {
        it('populates label options from API', async () => {
            api.getLabels.mockResolvedValue([
                { id: 'lbl-1', name: 'Bug', color: '#ff0000' },
                { id: 'lbl-2', name: 'Feature', color: '#00ff00' },
            ]);
            await populateLabelFilter();
            const options = document.querySelectorAll('#label-filter-dropdown .multi-select-option');
            expect(options).toHaveLength(2);
        });

        it('shows empty message when no labels', async () => {
            api.getLabels.mockResolvedValue([]);
            await populateLabelFilter();
            const empty = document.querySelector('#label-filter-dropdown .multi-select-empty');
            expect(empty).not.toBeNull();
            expect(empty.textContent).toContain('No labels available');
        });

        it('does nothing when no team', async () => {
            getCurrentTeam.mockReturnValue(null);
            await populateLabelFilter();
            expect(api.getLabels).not.toHaveBeenCalled();
        });
    });

    // ========================================
    // renderDisplayMenuOptions
    // ========================================

    describe('renderDisplayMenuOptions', () => {
        it('renders sort and group options', () => {
            renderDisplayMenuOptions();
            const container = document.getElementById('display-menu-dropdown');
            expect(container.innerHTML).toContain('Sort by');
            expect(container.innerHTML).toContain('Group by');
            expect(container.innerHTML).toContain('Newest');
            expect(container.innerHTML).toContain('Random');
            expect(container.innerHTML).toContain('No grouping');
            expect(container.innerHTML).toContain('Assignee');
        });

        it('marks current sort as active', () => {
            document.getElementById('sort-by-select').value = 'created-desc';
            renderDisplayMenuOptions();
            const container = document.getElementById('display-menu-dropdown');
            // The 'Newest' option should be active
            expect(container.innerHTML).toContain('active');
        });
    });

    // ========================================
    // updateSprintFilter
    // ========================================

    describe('updateSprintFilter', () => {
        it('shows only All Sprints without project (CHT-1084)', async () => {
            getCurrentProject.mockReturnValue(null);
            await updateSprintFilter();
            const sprintFilter = document.getElementById('sprint-filter');
            expect(sprintFilter.innerHTML).toContain('All Sprints');
            expect(sprintFilter.innerHTML).not.toContain('No Sprint');
            expect(sprintFilter.value).toBe('');
        });

        it('loads sprints for selected project', async () => {
            getCurrentProject.mockReturnValue('proj-1');
            api.getSprints.mockResolvedValue([
                { id: 's-1', name: 'Sprint 1', status: 'active' },
                { id: 's-2', name: 'Sprint 2', status: 'completed' },
            ]);
            await updateSprintFilter();
            const sprintFilter = document.getElementById('sprint-filter');
            expect(sprintFilter.innerHTML).toContain('Sprint 1');
            expect(sprintFilter.innerHTML).toContain('Sprint 2');
            expect(sprintFilter.innerHTML).toContain('Current Sprint');
        });
    });

    // ========================================
    // filterIssues
    // ========================================

    describe('filterIssues', () => {
        it('calls syncFiltersToUrl and loadIssues', async () => {
            getProjects.mockReturnValue([]);
            filterIssues();
            // filterIssues calls syncFiltersToUrl which calls replaceState
            expect(replaceStateSpy).toHaveBeenCalled();
        });
    });
});
