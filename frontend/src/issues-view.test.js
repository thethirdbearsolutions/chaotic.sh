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
}));

// Mock projects.js
vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
    setGlobalProjectSelection: vi.fn(),
}));

// Mock teams.js
vi.mock('./teams.js', () => ({
    getMembers: vi.fn(() => []),
}));

// Mock sprints.js
vi.mock('./sprints.js', () => ({
    ensureSprintCacheForIssues: vi.fn(),
    updateSprintProjectFilter: vi.fn(),
}));

// Mock board.js
vi.mock('./board.js', () => ({
    updateBoardProjectFilter: vi.fn(),
}));

// Mock issue-list.js
vi.mock('./issue-list.js', () => ({
    renderIssues: vi.fn(),
}));

// Mock ui.js
vi.mock('./ui.js', () => ({
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
import { getActiveFilterCategory, setActiveFilterCategory, getCurrentUser, setIssues, setSelectedIssueIndex, setSearchDebounceTimer, getCurrentTeam } from './state.js';
import { getProjects, setGlobalProjectSelection } from './projects.js';
import { getMembers } from './teams.js';
import { updateSprintProjectFilter } from './sprints.js';
import { updateBoardProjectFilter } from './board.js';
import { renderIssues } from './issue-list.js';
import { showToast } from './ui.js';

import {
    toggleMultiSelect,
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
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
    onProjectFilterChange,
    getGroupByValue,
    showIssuesLoadingSkeleton,
    renderDisplayMenuOptions,
} from './issues-view.js';

describe('issues-view', () => {
    let replaceStateSpy;

    beforeEach(() => {
        vi.clearAllMocks();
        replaceStateSpy = vi.spyOn(history, 'replaceState').mockImplementation(() => {});

        getCurrentTeam.mockReturnValue({ id: 'team-1' });

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

    // ========================================
    // FILTER_CATEGORIES
    // ========================================

    describe('FILTER_CATEGORIES', () => {
        it('has 7 categories', () => {
            expect(FILTER_CATEGORIES).toHaveLength(7);
        });

        it('includes project, status, priority, type, assignee, sprint, labels', () => {
            const keys = FILTER_CATEGORIES.map(c => c.key);
            expect(keys).toEqual(['project', 'status', 'priority', 'type', 'assignee', 'sprint', 'labels']);
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
            document.getElementById('project-filter').value = 'proj-1';
            expect(getFilterCategoryCount('project')).toBe(1);
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
            document.getElementById('project-filter').value = 'proj-1';
            document.querySelector('#status-filter-dropdown input[value="backlog"]').checked = true;
            expect(getTotalFilterCount()).toBe(2);
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
            document.getElementById('project-filter').value = 'proj-1';
            showFilterCategoryOptions('sprint');
            const container = document.getElementById('filter-menu-options');
            expect(container.innerHTML).toContain('All Sprints');
            expect(container.innerHTML).toContain('No Sprint');
        });

        it('shows empty message for sprint when no project selected (CHT-1084)', () => {
            document.getElementById('project-filter').value = '';
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
        it('renders all 7 categories', () => {
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.querySelectorAll('.filter-menu-category')).toHaveLength(7);
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
            document.getElementById('project-filter').value = 'proj-1';
            renderFilterMenuCategories();
            const container = document.getElementById('filter-menu-categories');
            expect(container.innerHTML).toContain('filter-menu-category-count');
        });
    });

    // ========================================
    // syncFiltersToUrl
    // ========================================

    describe('syncFiltersToUrl', () => {
        it('calls replaceState with filter params', () => {
            document.getElementById('project-filter').value = 'proj-1';
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
            document.getElementById('project-filter').value = 'proj-1';
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
            document.getElementById('project-filter').value = 'proj-1';
            syncFiltersToUrl();
            expect(localStorage.getItem('chaotic_issues_filters_null')).toBeNull();
            getCurrentTeam.mockReturnValue({ id: 'team-1' });
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

            expect(document.getElementById('project-filter').value).toBe('proj-1');
        });

        it('falls back to team-scoped localStorage when URL has no params (CHT-1042)', () => {
            Object.defineProperty(window, 'location', {
                value: { search: '', pathname: '/issues', href: 'http://localhost/issues' },
                writable: true,
                configurable: true,
            });
            localStorage.setItem('chaotic_issues_filters_team-1', 'project=proj-1');

            loadFiltersFromUrl();

            expect(document.getElementById('project-filter').value).toBe('proj-1');
            expect(replaceStateSpy).toHaveBeenCalledWith(
                { view: 'issues' },
                '',
                '/issues?project=proj-1'
            );
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
            document.getElementById('project-filter').innerHTML = '<option value="proj-1">Project Alpha</option>';
            document.getElementById('project-filter').value = 'proj-1';
            getProjects.mockReturnValue([{ id: 'proj-1', name: 'Project Alpha' }]);

            updateFilterChips();

            const container = document.getElementById('filter-chips-row');
            expect(container.classList.contains('hidden')).toBe(false);
            expect(container.innerHTML).toContain('Project');
            expect(container.innerHTML).toContain('Project Alpha');
        });

        it('shows clear all button when multiple filters', () => {
            document.getElementById('project-filter').value = 'proj-1';
            document.querySelector('#status-filter-dropdown input[value="todo"]').checked = true;
            getProjects.mockReturnValue([{ id: 'proj-1', name: 'Test' }]);

            updateFilterChips();

            const container = document.getElementById('filter-chips-row');
            expect(container.innerHTML).toContain('Clear all');
        });
    });

    describe('updateFilterCountBadge', () => {
        it('hides badge when no filters', () => {
            updateFilterCountBadge();
            const badge = document.getElementById('filter-count-badge');
            expect(badge.classList.contains('hidden')).toBe(true);
        });

        it('shows badge with count when filters active', () => {
            document.getElementById('project-filter').value = 'proj-1';
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
        it('calls updateFilterChips and updateFilterCountBadge', () => {
            initFilterBar();
            // Should not throw and should set up click handlers
            const filterDropdown = document.getElementById('filter-menu-dropdown');
            expect(filterDropdown._clickHandlerAdded).toBe(true);
        });

        it('does not add duplicate click handlers', () => {
            initFilterBar();
            initFilterBar();
            const filterDropdown = document.getElementById('filter-menu-dropdown');
            expect(filterDropdown._clickHandlerAdded).toBe(true);
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
            document.getElementById('project-filter').innerHTML = '<option value="p-1">Test</option>';
            document.getElementById('project-filter').value = 'p-1';
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
            document.getElementById('project-filter').value = '';
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
            expect(showToast).toHaveBeenCalledWith('Network error', 'error');
        });

        it('loads team issues when no project selected', async () => {
            document.getElementById('project-filter').value = '';
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
    // onProjectFilterChange
    // ========================================

    describe('onProjectFilterChange', () => {
        it('saves project selection when project selected', async () => {
            document.getElementById('project-filter').value = 'proj-1';
            getProjects.mockReturnValue([{ id: 'proj-1' }]);
            api.getIssues.mockResolvedValue([]);
            await onProjectFilterChange();
            expect(setGlobalProjectSelection).toHaveBeenCalledWith('proj-1');
        });

        it('updates board and sprint project filters', async () => {
            document.getElementById('project-filter').value = 'proj-1';
            getProjects.mockReturnValue([{ id: 'proj-1' }]);
            api.getIssues.mockResolvedValue([]);
            await onProjectFilterChange();
            expect(updateBoardProjectFilter).toHaveBeenCalled();
            expect(updateSprintProjectFilter).toHaveBeenCalled();
        });

        it('clears sprint filter when project changes (CHT-1084)', async () => {
            // Set up a sprint filter value as if user had filtered by sprint
            document.getElementById('sprint-filter').value = 'old-sprint-id';
            document.getElementById('project-filter').value = 'proj-2';
            getProjects.mockReturnValue([{ id: 'proj-2' }]);
            api.getIssues.mockResolvedValue([]);
            api.getSprints.mockResolvedValue([]);
            await onProjectFilterChange();
            expect(document.getElementById('sprint-filter').value).toBe('');
        });
    });

    // ========================================
    // clearAllFilters
    // ========================================

    describe('clearAllFilters', () => {
        it('clears project filter', () => {
            document.getElementById('project-filter').value = 'proj-1';
            getProjects.mockReturnValue([{ id: 'proj-1' }]);
            api.getTeamIssues.mockResolvedValue([]);
            clearAllFilters();
            expect(document.getElementById('project-filter').value).toBe('');
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
            document.getElementById('project-filter').value = '';
            await updateSprintFilter();
            const sprintFilter = document.getElementById('sprint-filter');
            expect(sprintFilter.innerHTML).toContain('All Sprints');
            expect(sprintFilter.innerHTML).not.toContain('No Sprint');
            expect(sprintFilter.value).toBe('');
        });

        it('loads sprints for selected project', async () => {
            document.getElementById('project-filter').value = 'proj-1';
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
