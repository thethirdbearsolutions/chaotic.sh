/**
 * Chaotic - Main Application
 */

/* global api, marked, DOMPurify -- provided via window by main.js entry point */

import { showModal, closeModal, showToast, closeAllDropdowns, setDropdownKeyHandler, registerDropdownClickOutside } from './ui.js';
import { updateUserInfo, showAuthScreen, showMainScreen, handleLogin, handleSignup, showLogin, showSignup, logout } from './auth.js';
import { loadDocuments, viewDocument, showCreateDocumentModal } from './documents.js';
import { getAgents, loadAgents, showCreateAgentModal } from './agents.js';
import { formatTimeAgo, escapeJsString } from './utils.js';
import { completeGateFromList } from './gate-approvals.js';
import { createKeyboardHandler } from './keyboard.js';
import {
    getTeams,
    getMembers,
    loadTeams,
    selectTeam,
    toggleTeamDropdown,
    toggleUserDropdown,
    loadTeamMembers,
    loadTeamInvitations,
    showInviteModal,
    showCreateTeamModal,
    showEditTeamModal,
    loadTeamAgents,
} from './teams.js';
import {
    getProjects,
    loadProjects,
    renderProjects,
    viewProjectSettings,
    clearProjectSettingsState,
    showCreateProjectModal,
    getEstimateOptions,
    formatEstimate,
    setGlobalProjectSelection,
} from './projects.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';
import { showOnboarding, hasCompletedOnboarding, resetOnboarding } from './onboarding.js';
import {
    getSprintCache,
    getLimboStatus,
    updateSprintProjectFilter,
    onSprintProjectChange,
    loadSprints,
    viewSprint,
    viewSprintByPath,
    showEditBudgetModal,
    handleUpdateBudget,
    showCloseSprintConfirmation,
    completeSprint,
    loadLimboStatus,
    showLimboDetailsModal,
    ensureSprintCacheForIssues,
    updateSprintCacheForProject,
} from './sprints.js';
import {
    loadApiKeys,
    showCreateApiKeyModal,
    copyApiKey,
    revokeApiKey,
} from './api-keys.js';
import {
    setCommands as setCommandPaletteCommands,
    open as openCommandPalette,
    close as closeCommandPalette,
    isOpen as isCommandPaletteOpen,
} from './command-palette.js';
import {
    setDependencies as setDashboardDependencies,
    getMyIssues,
    setMyIssues,
    loadMyIssues,
    loadDashboardActivity,
    renderMyIssues,
    filterMyIssues,
} from './dashboard.js';
import {
    setDependencies as setBoardDependencies,
    updateBoardProjectFilter,
    onBoardProjectChange,
    loadBoard,
    renderBoard,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleCardDragOver,
    handleCardDragLeave,
    handleDrop,
    handleCardDrop,
} from './board.js';
import {
    setDependencies as setIssueListDependencies,
    renderIssues,
    renderIssueRow,
    toggleGroup,
    getPriorityIcon,
    getStatusIcon,
} from './issue-list.js';
import {
    setDependencies as setInlineDropdownDependencies,
    showInlineDropdown,
    showDetailDropdown,
    updateIssueField,
    toggleIssueLabel,
    createLabelFromDropdown,
    createLabelForCreateIssue,
    toggleCreateIssueLabelSelection,
    updateCreateIssueLabelsLabel,
    renderCreateIssueLabelDropdown,
} from './inline-dropdown.js';
import {
    setDependencies as setIssueDetailViewDependencies,
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    renderDescriptionContent,
    handleDescriptionClick,
    toggleTicketRituals,
    loadTicketRituals,
    viewIssueByPath,
    viewIssue,
} from './issue-detail-view.js';
import {
    getCurrentView,
    setCurrentView,
    getActiveFilterCategory,
    setActiveFilterCategory,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getPendingGates,
    setPendingGates,
} from './state.js';
import { initIssueTooltip } from './issue-tooltip.js';

// State - now managed by state.js module
// Local aliases for backward compatibility during migration
let currentUser = null; // Will be removed - use getCurrentUser()
// currentTeam is managed via window.currentTeam (set by teams.js)
window.currentTeam = null;
let currentView = 'my-issues'; // Will be removed - use getCurrentView()
let issues = []; // Will be removed - use getIssues()
// issue-list.js module uses getIssues() dependency to access this array
// myIssues is now managed by dashboard.js module
// boardIssues, BOARD_STATUSES, draggingIssueId are now in board.js module
// sprints state is now in sprints.js module
let assignees = []; // Will be removed - use getAssignees()
let labels = []; // Will be removed - use getLabels()
let createIssueLabelIds = [];
// dashboardActivities is now managed by dashboard.js module
// ticketRitualsCollapsed and currentTicketRituals are now in issue-detail-view.js module
// limboStatus is now in sprints.js module
let searchDebounceTimer = null; // Will be removed - use getSearchDebounceTimer()
// sprintCache and sprintCacheLoadedProjects are now in sprints.js module
let websocket = null; // Will be removed - use getWebsocket()

// Markdown rendering helper with XSS protection
function renderMarkdown(content) {
    if (!content) return '';
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        try {
            // Configure marked for GFM rendering
            marked.setOptions({
                breaks: true,  // Convert \n to <br>
                gfm: true,     // GitHub Flavored Markdown
            });
            // Parse markdown then sanitize HTML to prevent XSS
            const rawHtml = marked.parse(content);
            return DOMPurify.sanitize(rawHtml);
        } catch (e) {
            console.error('Markdown parsing error:', e);
            // Fall through to safe fallback
        }
    }
    // Fallback to plain text if marked/DOMPurify not loaded or parse error
    return content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
}

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

// Multi-select dropdown functions
function toggleMultiSelect(dropdownId) {
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

function getSelectedStatuses() {
    const dropdown = document.getElementById('status-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function updateStatusFilter() {
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

function clearStatusFilter() {
    const dropdown = document.getElementById('status-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updateStatusFilter();
}

function getSelectedPriorities() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function updatePriorityFilter() {
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

function clearPriorityFilter() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updatePriorityFilter();
}

function getSelectedLabels() {
    const dropdown = document.getElementById('label-filter-dropdown');
    if (!dropdown) return [];
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function updateLabelFilter() {
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

function clearLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    updateLabelFilter();
}

function updateLabelFilterLabel() {
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

async function populateLabelFilter() {
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

// URL Filter State Management
// Note: getProjectFromUrl and updateUrlWithProject are imported from url-helpers.js

function syncFiltersToUrl() {
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
}

function loadFiltersFromUrl() {
    const params = new URLSearchParams(window.location.search);

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

// activeFilterCategory is now in state.js module

const FILTER_CATEGORIES = [
    { key: 'project', label: 'Project' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'type', label: 'Type' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'sprint', label: 'Sprint' },
    { key: 'labels', label: 'Labels' },
];

function toggleFilterMenu(event) {
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

function toggleDisplayMenu(event) {
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

function closeAllFilterMenus() {
    const filterDropdown = document.getElementById('filter-menu-dropdown');
    const displayDropdown = document.getElementById('display-menu-dropdown');
    if (filterDropdown) filterDropdown.classList.add('hidden');
    if (displayDropdown) displayDropdown.classList.add('hidden');
    document.removeEventListener('click', closeFilterMenuOnOutsideClick);
}

function getFilterCategoryCount(category) {
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

function getTotalFilterCount() {
    let total = 0;
    FILTER_CATEGORIES.forEach(cat => {
        total += getFilterCategoryCount(cat.key);
    });
    return total;
}

function renderFilterMenuCategories() {
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

function showFilterCategoryOptions(category) {
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

// Filter option toggle functions (wire to hidden controls)
function setProjectFilter(value) {
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

function clearProjectFilter() {
    setProjectFilter('');
}

function toggleStatusOption(value, event) {
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

function clearStatusFilterNew() {
    clearStatusFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
    updateFilterChips();
    updateFilterCountBadge();
}

function togglePriorityOption(value, event) {
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

function clearPriorityFilterNew() {
    clearPriorityFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('priority');
    updateFilterChips();
    updateFilterCountBadge();
}

function setTypeFilter(value) {
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

function clearTypeFilter() {
    setTypeFilter('');
}

function setAssigneeFilter(value) {
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

function clearAssigneeFilter() {
    setAssigneeFilter('');
}

function setSprintFilter(value) {
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

function clearSprintFilter() {
    setSprintFilter('');
}

function toggleLabelOption(value, event) {
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

function clearLabelFilterNew() {
    clearLabelFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('labels');
    updateFilterChips();
    updateFilterCountBadge();
}

// Display menu functions
function renderDisplayMenuOptions() {
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

function setSort(value) {
    const sortSelect = document.getElementById('sort-by-select');
    if (sortSelect) {
        sortSelect.value = value;
        loadIssues();
    }
    closeAllFilterMenus();
}

function setGroupBy(value) {
    const groupSelect = document.getElementById('group-by-select');
    if (groupSelect) {
        groupSelect.value = value;
        updateGroupBy();
    }
    closeAllFilterMenus();
}

// Filter chips functions
function updateFilterChips() {
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
        chips.push({
            category: 'type',
            label: 'Type',
            value: typeFilter.value.charAt(0).toUpperCase() + typeFilter.value.slice(1),
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

function clearAllFilters() {
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

function updateFilterCountBadge() {
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

// Initialize filter bar on page load
function initFilterBar() {
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

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    initThemeToggle();
    initIssueLinkHandler();
    initIssueTooltip({ api });
    if (api.getToken()) {
        try {
            currentUser = await api.getMe();
            window.currentUser = currentUser;
            await initApp();
        } catch {
            api.logout();
            showAuthScreen();
        }
    } else {
        showAuthScreen();
    }
});

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    const stored = localStorage.getItem('chaotic_theme');
    const useLight = stored === 'light';
    document.body.classList.toggle('theme-light', useLight);
    toggle.checked = useLight;

    toggle.addEventListener('change', () => {
        const isLight = toggle.checked;
        document.body.classList.toggle('theme-light', isLight);
        localStorage.setItem('chaotic_theme', isLight ? 'light' : 'dark');
    });
}

function initIssueLinkHandler() {
    // Handle clicks on issue-link anchors created by convertIssueReferencesToMarkdown
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a.issue-link');
        if (target) {
            e.preventDefault();
            const href = target.getAttribute('href');
            if (href && href.startsWith('#/issue/')) {
                const identifier = href.replace('#/issue/', '');
                navigateToIssueByIdentifier(identifier);
            }
        }
    });
}

// Global keyboard shortcut: Cmd+Enter (or Ctrl+Enter) to submit forms
document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        const activeElement = document.activeElement;
        const form = activeElement?.closest('form');
        if (form) {
            event.preventDefault();
            // Trigger the form's submit event (works with onsubmit handlers)
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(submitEvent);
        }
    }
});

// Auth functions are now in auth.js and attached to window

// App initialization
async function initApp() {
    showMainScreen();
    updateUserInfo();
    await loadTeams();

    const teams = getTeams();
    if (teams.length === 0 && !hasCompletedOnboarding()) {
        showOnboarding();
        return;
    }
    if (teams.length > 0) {
        await selectTeam(teams[0], true);
    }
}

// Expose initApp to window so auth.js can call it
window.initApp = initApp;

// Export issue-detail-view functions to window for inline onclick handlers
window.viewIssue = viewIssue;
window.viewIssueByPath = viewIssueByPath;
window.handleDescriptionClick = handleDescriptionClick;
window.toggleTicketRituals = toggleTicketRituals;

// Export create issue modal functions to window for inline onclick handlers
window.toggleCreateIssueOptions = toggleCreateIssueOptions;

// Export functions called via window from other modules (agents.js, teams.js)
window.connectWebSocket = connectWebSocket;
window.buildAssignees = buildAssignees;
window.updateAssigneeFilter = updateAssigneeFilter;
window.loadLabels = loadLabels;
window.resetOnboarding = resetOnboarding;

// updateUserInfo is now imported from auth.js

// WebSocket for real-time updates
function connectWebSocket(teamId) {
    // Close existing connection
    if (websocket) {
        websocket.close();
        websocket = null;
    }

    const token = api.getToken();
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}&team_id=${encodeURIComponent(teamId)}`;

    try {
        websocket = new WebSocket(wsUrl);

        websocket.onopen = () => {
            console.log('WebSocket connected');
        };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleWebSocketMessage(message);
        };

        websocket.onclose = () => {
            console.log('WebSocket disconnected');
            // Attempt reconnect after 5 seconds
            setTimeout(() => {
                if (window.currentTeam && window.currentTeam.id === teamId) {
                    connectWebSocket(teamId);
                }
            }, 5000);
        };

        websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    } catch (e) {
        console.error('Failed to connect WebSocket:', e);
    }
}

function handleWebSocketMessage(message) {
    const { type, entity, data } = message;

    if (entity === 'issue') {
        if (type === 'created') {
            // Check for duplicates - by real ID OR by optimistic temp ID with matching title
            const existingIndex = issues.findIndex(i => i.id === data.id);
            const optimisticIndex = issues.findIndex(i => i._isOptimistic && i.title === data.title);

            if (existingIndex >= 0) {
                // Already have this exact issue, skip
            } else if (optimisticIndex >= 0) {
                // Replace optimistic issue with real one from WebSocket
                issues[optimisticIndex] = data;
                if (currentView === 'issues') {
                    renderIssues();
                }
                // Don't show toast - user already knows they created it
            } else {
                // New issue from another user/session
                issues.unshift(data);
                if (currentView === 'issues') {
                    renderIssues();
                }
                showToast(`New issue: ${data.identifier}`, 'info');
            }

            // Check myIssues separately (managed by dashboard.js)
            if (data.assignee_id === currentUser?.id) {
                const myIssuesArr = getMyIssues();
                const myExistingIndex = myIssuesArr.findIndex(i => i.id === data.id);
                const myOptimisticIndex = myIssuesArr.findIndex(i => i._isOptimistic && i.title === data.title);
                if (myExistingIndex === -1 && myOptimisticIndex === -1) {
                    setMyIssues([data, ...myIssuesArr]);
                    if (currentView === 'my-issues') {
                        renderMyIssues();
                    }
                } else if (myOptimisticIndex >= 0) {
                    myIssuesArr[myOptimisticIndex] = data;
                    setMyIssues(myIssuesArr);
                    if (currentView === 'my-issues') {
                        renderMyIssues();
                    }
                }
            }

            if (currentView === 'my-issues') {
                loadDashboardActivity();
            }

            // Re-render board/sprints when issues are created (CHT-237)
            if (currentView === 'board') {
                renderBoard();
            } else if (currentView === 'sprints') {
                loadSprints();
            }

            // Refresh issue detail if a child issue was created (CHT-71)
            if (currentView === 'issue-detail' && data.parent_id === window.currentDetailIssue?.id) {
                viewIssue(window.currentDetailIssue.id, false);
            }
        } else if (type === 'updated') {
            // Update in local arrays
            const issueIndex = issues.findIndex(i => i.id === data.id);
            if (issueIndex >= 0) {
                issues[issueIndex] = data;
            }
            const myIssuesForUpdate = getMyIssues();
            const myIndex = myIssuesForUpdate.findIndex(i => i.id === data.id);
            if (myIndex >= 0) {
                myIssuesForUpdate[myIndex] = data;
                setMyIssues(myIssuesForUpdate);
            }
            // Re-render if on issues view
            if (currentView === 'issues') {
                renderIssues();
            } else if (currentView === 'my-issues') {
                renderMyIssues();
                loadDashboardActivity();
            } else if (currentView === 'board') {
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (currentView === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                // Sprints display issue counts, so issue changes affect them
                loadSprints();
            } else if (currentView === 'issue-detail') {
                // Refresh detail view if viewing this issue
                const detailContent = document.getElementById('issue-detail-content');
                if (detailContent && detailContent.dataset.issueId === data.id) {
                    viewIssue(data.id);
                }
            }
        } else if (type === 'deleted') {
            // Remove from local arrays
            issues = issues.filter(i => i.id !== data.id);
            setMyIssues(getMyIssues().filter(i => i.id !== data.id));
            // Re-render
            if (currentView === 'issues') {
                renderIssues();
            } else if (currentView === 'my-issues') {
                renderMyIssues();
                loadDashboardActivity();
            } else if (currentView === 'board') {
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (currentView === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                loadSprints();
            }
            showToast(`Issue ${data.identifier} deleted`, 'info');
        }
        // If viewing issue detail and the deleted issue is the current one, navigate away
        if (currentView === 'issue-detail' && window.currentDetailIssue?.id === data.id) {
            showToast(`Issue ${data.identifier} was deleted`, 'warning');
            navigateTo('my-issues');
        }
    } else if (entity === 'comment') {
        if (currentView === 'my-issues') {
            loadDashboardActivity();
        }
        // Refresh issue detail if viewing the commented issue (CHT-71)
        if (currentView === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    } else if (entity === 'relation') {
        // Refresh issue detail if viewing an issue involved in the relation change (CHT-71)
        if (currentView === 'issue-detail') {
            const currentIssueId = window.currentDetailIssue?.id;
            if (currentIssueId && (data.source_issue_id === currentIssueId || data.target_issue_id === currentIssueId)) {
                viewIssue(currentIssueId, false);
            }
        }
    } else if (entity === 'activity') {
        // Activity event (CHT-359) - reload dashboard activity
        // TODO: In the future, prepend data directly instead of refetching
        if (currentView === 'my-issues') {
            loadDashboardActivity();
        }
        // Also refresh issue detail if viewing an affected issue
        if (currentView === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    }
}

// Navigation
function navigateTo(view, pushHistory = true) {
    currentView = view; // Local alias
    setCurrentView(view); // Update centralized state

    // Update URL (preserve project param across views)
    if (pushHistory) {
        let url;
        const projectId = getProjectFromUrl();
        const viewsWithProject = ['issues', 'board', 'sprints'];

        if (view === 'my-issues') {
            url = '/';
        } else if (view === 'issues' && window.location.search) {
            // Preserve existing query params when navigating to issues
            url = `/issues${window.location.search}`;
        } else if (viewsWithProject.includes(view) && projectId) {
            // Include project param for views that use project filtering
            url = `/${view}?project=${projectId}`;
        } else {
            url = `/${view}`;
        }
        history.pushState({ view }, '', url);
    }

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });

    // Clear project settings state when navigating away
    if (typeof clearProjectSettingsState === 'function') {
        clearProjectSettingsState();
    }

    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    // Show selected view
    const viewEl = document.getElementById(`${view}-view`);
    if (viewEl) {
        viewEl.classList.remove('hidden');
    }

    // Load view data
    switch (view) {
        case 'my-issues':
            loadMyIssues();
            loadDashboardActivity();
            break;
        case 'gate-approvals':
            loadGateApprovals();
            break;
        case 'issues':
            // Load filters from URL if present
            loadFiltersFromUrl();
            // Initialize filter bar chips and badge
            initFilterBar();
            // Populate label filter dropdown
            populateLabelFilter().then(() => {
                // Re-apply label filter from URL after options are loaded
                const urlParams = new URLSearchParams(window.location.search);
                const labelIds = urlParams.getAll('label');
                if (labelIds.length > 0) {
                    const dropdown = document.getElementById('label-filter-dropdown');
                    if (dropdown) {
                        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
                        checkboxes.forEach(cb => {
                            cb.checked = labelIds.includes(cb.value);
                        });
                        updateLabelFilterLabel();
                    }
                }
            });
            // Update sprint filter based on selected project, then load issues
            updateSprintFilter().then(() => {
                // Re-apply sprint filter from URL after options are loaded
                const urlParams = new URLSearchParams(window.location.search);
                const sprint = urlParams.get('sprint');
                if (sprint) {
                    const sprintFilter = document.getElementById('sprint-filter');
                    if (sprintFilter) sprintFilter.value = sprint;
                }
                loadIssues();
            });
            break;
        case 'board':
            updateBoardProjectFilter();
            break;
        case 'projects':
            loadProjects().then(renderProjects);
            break;
        case 'sprints':
            updateSprintProjectFilter();
            break;
        case 'documents':
            loadDocuments();
            break;
        case 'team':
            loadTeamMembers();
            loadTeamAgents();
            loadTeamInvitations();
            break;
        case 'settings':
            loadApiKeys();
            loadAgents();
            updateRitualProjectFilter();
            break;
    }
}

// URL Router
function handleRoute() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    // Restore project selection from URL (if present, and valid)
    const urlProject = getProjectFromUrl();
    if (urlProject && getProjects().some(p => p.id === urlProject)) {
        setGlobalProjectSelection(urlProject);
    }

    let view = 'my-issues';
    if (parts.length === 0 || parts[0] === '') {
        navigateTo('my-issues', false);
    } else if (parts[0] === 'issue' && parts[1]) {
        // /issue/WEB-5 or /issue/{id}
        viewIssueByPath(parts[1]);
        return; // viewIssueByPath handles its own state
    } else if (parts[0] === 'document' && parts[1]) {
        viewDocumentByPath(parts[1]);
        return; // viewDocumentByPath handles its own state
    } else if (parts[0] === 'sprint' && parts[1]) {
        // /sprint/:id - sprint detail view
        viewSprintByPath(parts[1]);
        return; // viewSprintByPath handles its own state
    } else if (parts[0] === 'projects' && parts[1] && parts[2] === 'settings') {
        // /projects/:id/settings
        viewProjectSettings(parts[1]);
        return; // viewProjectSettings handles its own state
    } else {
        // /issues, /projects, /board, etc.
        view = parts[0];
        const validViews = ['my-issues', 'gate-approvals', 'issues', 'board', 'projects', 'sprints', 'documents', 'team', 'settings'];
        if (validViews.includes(view)) {
            navigateTo(view, false);
        } else {
            view = 'my-issues';
            navigateTo('my-issues', false);
        }
    }

    // Ensure history state is set for this entry (handles initial page load)
    if (!history.state?.view) {
        history.replaceState({ view }, '', window.location.href);
    }
}

// viewIssueByPath is now in issue-detail-view.js module

async function viewDocumentByPath(docId) {
    try {
        await viewDocument(docId, false);
    } catch {
        navigateTo('documents', false);
    }
}

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
    // Check specific states first (issue/document/sprint have both id AND view)
    if (e.state?.issueId) {
        viewIssue(e.state.issueId, false);
    } else if (e.state?.identifier) {
        // Handle issue navigation by identifier (from navigateToIssueByIdentifier)
        viewIssueByPath(e.state.identifier);
    } else if (e.state?.documentId) {
        viewDocument(e.state.documentId, false);
    } else if (e.state?.sprintId) {
        viewSprint(e.state.sprintId, false);
    } else if (e.state?.view) {
        navigateTo(e.state.view, false);
    } else {
        handleRoute();
    }
});

function normalizeMemberAssignee(member) {
    const name = member.user_name || member.name || member.user_email || member.email || 'Unknown';
    return {
        id: member.user_id || member.id,
        name,
        email: member.user_email || member.email || null,
        is_agent: false,
        parent_user_id: null,
        parent_user_name: null,
    };
}

function normalizeAgentAssignee(agent) {
    return {
        id: agent.id,
        name: agent.name,
        email: null,
        is_agent: true,
        parent_user_id: agent.parent_user_id || null,
        parent_user_name: agent.parent_user_name || null,
        avatar_url: agent.avatar_url || null,
    };
}

function buildAssignees() {
    const memberAssignees = getMembers().map(normalizeMemberAssignee);
    const agentAssignees = getAgents().map(normalizeAgentAssignee);
    assignees = [...memberAssignees, ...agentAssignees];
}

function getAssigneeById(assigneeId) {
    if (!assigneeId) return null;
    return assignees.find(a => a.id === assigneeId) || null;
}

function formatAssigneeName(assignee) {
    if (!assignee) return null;
    if (assignee.is_agent) {
        return assignee.name || 'Agent';
    }
    return assignee.name || assignee.email || 'User';
}

function formatAssigneeOptionLabel(assignee, indentAgent = false) {
    const base = escapeHtml(assignee.name || assignee.email || 'Unknown');
    if (!assignee.is_agent) {
        return base;
    }
    const parent = assignee.parent_user_name ? ` (${escapeHtml(assignee.parent_user_name)})` : ' (agent)';
    const prefix = indentAgent ? '&nbsp;&nbsp;- ' : '';
    return `${prefix}${base}${parent}`;
}

function getAssigneeOptionList() {
    const memberAssignees = assignees.filter(a => !a.is_agent);
    const agentsByParent = new Map();
    const memberIds = new Set(memberAssignees.map(m => m.id));

    assignees.filter(a => a.is_agent).forEach(agent => {
        const parentId = agent.parent_user_id;
        if (!agentsByParent.has(parentId)) {
            agentsByParent.set(parentId, []);
        }
        agentsByParent.get(parentId).push(agent);
    });

    const options = [];
    memberAssignees.forEach(member => {
        options.push({ assignee: member, indent: false });
        const children = agentsByParent.get(member.id) || [];
        children.sort((a, b) => a.name.localeCompare(b.name));
        children.forEach(agent => options.push({ assignee: agent, indent: true }));
    });

    const orphanAgents = assignees.filter(a => a.is_agent && !memberIds.has(a.parent_user_id));
    orphanAgents.sort((a, b) => a.name.localeCompare(b.name));
    orphanAgents.forEach(agent => options.push({ assignee: agent, indent: false }));

    return options;
}

function updateAssigneeFilter() {
    const assigneeFilter = document.getElementById('assignee-filter');
    if (!assigneeFilter) return;

    const currentSelection = assigneeFilter.value;

    let options = `
        <option value="">All Assignees</option>
        <option value="me">Assigned to me</option>
        <option value="unassigned">Unassigned</option>
    `;

    // Add team members + agents
    getAssigneeOptionList().forEach(({ assignee, indent }) => {
        options += `<option value="${assignee.id}">${formatAssigneeOptionLabel(assignee, indent)}</option>`;
    });

    assigneeFilter.innerHTML = options;

    // Restore selection if valid
    if (currentSelection) {
        assigneeFilter.value = currentSelection;
    }
}

async function updateSprintFilter() {
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

function updateSprintBudgetBar(activeSprint) {
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

// Dashboard functions are now in dashboard.js module

// GATE Approvals
// pendingGates is now in state.js module

async function loadGateApprovals() {
    if (!window.currentTeam) return;

    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading pending approvals...</div>';

    try {
        // Load from all projects in the team
        const allApprovals = [];
        for (const project of getProjects()) {
            const approvals = await api.getPendingApprovals(project.id);
            allApprovals.push(...approvals);
        }
        setPendingGates(allApprovals);
        renderGateApprovals();
    } catch (e) {
        container.innerHTML = `<div class="empty-state"><h3>Error loading approvals</h3><p>${escapeHtml(e.message)}</p></div>`;
    }
}

function renderGateApprovals() {
    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    const pendingItems = getPendingGates();
    if (pendingItems.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No pending approvals</h3>
                <p>All rituals have been completed. Nice work!</p>
            </div>
        `;
        return;
    }

    // Use pending_approvals if available (new endpoint), fall back to pending_gates (old)
    const getApprovals = (item) => item.pending_approvals || item.pending_gates || [];

    // Group by type: GATE claim, GATE close, REVIEW
    const claimGates = pendingItems.filter(g => getApprovals(g).some(r => r.approval_mode === 'gate' && r.limbo_type === 'claim'));
    const closeGates = pendingItems.filter(g => getApprovals(g).some(r => r.approval_mode === 'gate' && r.limbo_type === 'close'));
    const reviewItems = pendingItems.filter(g => getApprovals(g).some(r => r.approval_mode === 'review'));

    let html = '';

    if (claimGates.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Claim</h3>
                <p class="gate-section-desc">Someone tried to claim these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${claimGates.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    if (closeGates.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Waiting to Close</h3>
                <p class="gate-section-desc">Someone tried to close these tickets but is waiting for your approval</p>
                <div class="gate-list">
                    ${closeGates.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    if (reviewItems.length > 0) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Awaiting Review Approval</h3>
                <p class="gate-section-desc">An agent attested these rituals and they need your approval</p>
                <div class="gate-list">
                    ${reviewItems.map(renderApprovalIssue).join('')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;

    // Attach click handlers for gate approve buttons (GATE mode)
    container.querySelectorAll('.gate-approve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset;
            completeGateFromList(
                d.ritualId,
                d.issueId,
                d.ritualName,
                d.ritualPrompt,
                d.issueIdentifier,
                d.issueTitle,
                d.requestedBy,
                d.requestedAt
            );
        });
    });

    // Attach click handlers for review approve buttons (REVIEW mode)
    container.querySelectorAll('.review-approve-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const d = btn.dataset;
            approveReviewFromList(
                d.ritualId,
                d.issueId,
                d.ritualName,
                d.issueIdentifier,
                d.issueTitle,
                d.requestedBy,
                d.requestedAt,
                d.attestationNote
            );
        });
    });
}

function renderApprovalIssue(approvalIssue) {
    const approvals = approvalIssue.pending_approvals || approvalIssue.pending_gates || [];
    const ritualList = approvals.map(r => {
        const isReview = r.approval_mode === 'review';
        const waitingLabel = isReview ? 'Attested by' : 'Waiting';
        const waitingInfo = r.requested_by_name
            ? `<span class="gate-waiting-info">${waitingLabel}: <strong>${escapeHtml(r.requested_by_name)}</strong>${r.requested_at ? ` (${formatRelativeTime(r.requested_at)})` : ''}</span>`
            : '';
        const attestationNote = isReview && r.attestation_note
            ? `<div class="gate-attestation-note"><em>${escapeHtml(r.attestation_note)}</em></div>`
            : '';
        const btnClass = isReview ? 'review-approve-btn' : 'gate-approve-btn';
        const btnLabel = isReview ? 'Approve' : 'Complete';
        const modeLabel = isReview
            ? '<span class="badge badge-review">review</span>'
            : '<span class="badge badge-gate">gate</span>';

        return `
            <div class="gate-ritual">
                <div class="gate-ritual-info">
                    <span class="gate-ritual-name">${escapeHtml(r.ritual_name)} ${modeLabel}</span>
                    <span class="gate-ritual-prompt">${escapeHtml(r.ritual_prompt)}</span>
                    ${waitingInfo}
                    ${attestationNote}
                </div>
                <button class="btn btn-small btn-primary ${btnClass}"
                    data-ritual-id="${escapeAttr(r.ritual_id)}"
                    data-issue-id="${escapeAttr(approvalIssue.issue_id)}"
                    data-ritual-name="${escapeAttr(r.ritual_name)}"
                    data-ritual-prompt="${escapeAttr(r.ritual_prompt)}"
                    data-issue-identifier="${escapeAttr(approvalIssue.identifier)}"
                    data-issue-title="${escapeAttr(approvalIssue.title)}"
                    data-requested-by="${escapeAttr(r.requested_by_name || '')}"
                    data-requested-at="${escapeAttr(r.requested_at || '')}"
                    data-attestation-note="${escapeAttr(r.attestation_note || '')}">${btnLabel}</button>
            </div>
        `;
    }).join('');

    return `
        <div class="gate-issue-card">
            <div class="gate-issue-header">
                <a href="/issue/${encodeURIComponent(approvalIssue.identifier)}" onclick="event.preventDefault(); viewIssue('${escapeJsString(approvalIssue.issue_id)}')" class="gate-issue-link">
                    <span class="gate-issue-id">${escapeHtml(approvalIssue.identifier)}</span>
                    <span class="gate-issue-title">${escapeHtml(approvalIssue.title)}</span>
                </a>
                <span class="badge badge-${approvalIssue.status}">${approvalIssue.status.replace('_', ' ')}</span>
            </div>
            <div class="gate-issue-project">${escapeHtml(approvalIssue.project_name)}</div>
            <div class="gate-rituals">
                ${ritualList}
            </div>
        </div>
    `;
}

// Gate approval modal moved to gate-approvals.js
// completeGateFromList is exported to window from that module

// Issues (All)
async function loadIssues() {
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
            params.assignee_id = currentUser.id;
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

        // Load sprint data for sprint badges and group-by-sprint
        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);

        renderIssues();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

// Search debouncing
function debounceSearch() {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        loadIssues();
    }, 300);
}

function showIssuesLoadingSkeleton() {
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

function filterIssues() {
    syncFiltersToUrl();
    loadIssues();
}

async function onProjectFilterChange() {
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

async function updateGroupBy() {
    syncFiltersToUrl();
    if (getGroupByValue() === 'sprint') {
        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);
    }
    renderIssues();
}

function getGroupByValue() {
    const select = document.getElementById('group-by-select');
    return select ? select.value : '';
}

// ensureSprintCacheForIssues and invalidateSprintCache are now in sprints.js
// Issue list functions (renderIssues, renderIssueRow, toggleGroup, getPriorityIcon, getStatusIcon)
// are now in issue-list.js module
// Inline dropdown functions (showInlineDropdown, updateIssueField, toggleIssueLabel, etc.)
// are now in inline-dropdown.js module

function formatStatus(status) {
    return status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatPriority(priority) {
    if (priority === 'no_priority') return 'No Priority';
    return priority.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatIssueType(issueType) {
    const labels = {
        task: 'Task',
        bug: 'Bug',
        feature: 'Feature',
        chore: 'Chore',
        docs: 'Docs',
    };
    return labels[issueType] || 'Task';
}

function isImageAvatar(avatar) {
    return typeof avatar === 'string' && (avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('data:'));
}

function renderAvatar(assignee, sizeClass = 'avatar-small') {
    const name = formatAssigneeName(assignee) || 'User';
    const avatar = assignee?.avatar_url;
    if (avatar) {
        if (isImageAvatar(avatar)) {
            return `<img class="${sizeClass} avatar-img" src="${escapeAttr(avatar)}" alt="${escapeAttr(name)}">`;
        }
        return `<div class="${sizeClass} avatar-emoji">${escapeHtml(avatar)}</div>`;
    }
    return `<div class="${sizeClass}">${name.charAt(0).toUpperCase()}</div>`;
}

// viewIssue, viewIssueByPath, getActivityIcon, formatActivityActor, formatActivityText,
// renderCommentContent, processTextNodes, addIssueLinksAndMentions are now in issue-detail-view.js module

function getMemberHandle(member) {
    if (member.name) {
        return member.name.split(' ')[0].toLowerCase();
    }
    if (member.email) {
        return member.email.split('@')[0].toLowerCase();
    }
    return 'user';
}

function setupMentionAutocomplete() {
    const textarea = document.getElementById('new-comment');
    const container = document.getElementById('mention-suggestions');
    if (!textarea || !container) return;
    if (textarea.dataset.mentionsBound === 'true') return;
    textarea.dataset.mentionsBound = 'true';

    const hide = () => {
        container.classList.add('hidden');
        container.innerHTML = '';
    };

    const update = () => {
        const caret = textarea.selectionStart || 0;
        const prefix = textarea.value.slice(0, caret);
        const match = prefix.match(/(^|\s)@([a-zA-Z0-9._-]*)$/);
        if (!match) {
            hide();
            return;
        }
        const query = match[2].toLowerCase();
        const suggestions = getMembers()
            .map(m => ({
                id: m.id,
                name: m.name || m.email || 'User',
                email: m.email || '',
                handle: getMemberHandle(m),
            }))
            .filter(m => !query || m.handle.includes(query) || m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query))
            .slice(0, 6);

        if (!suggestions.length) {
            hide();
            return;
        }

        container.innerHTML = suggestions.map(s => `
            <button type="button" class="mention-suggestion" data-handle="${escapeAttr(s.handle)}">
                <span class="mention-name">${escapeHtml(s.name)}</span>
                <span class="mention-handle">@${escapeHtml(s.handle)}</span>
            </button>
        `).join('');
        container.classList.remove('hidden');

        container.querySelectorAll('.mention-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                const handle = btn.dataset.handle;
                const before = textarea.value.slice(0, caret).replace(/@([a-zA-Z0-9._-]*)$/, `@${handle} `);
                const after = textarea.value.slice(caret);
                textarea.value = before + after;
                textarea.focus();
                hide();
            });
        });
    };

    textarea.addEventListener('input', update);
    textarea.addEventListener('click', update);
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hide();
        }
    });
    textarea.addEventListener('blur', () => {
        setTimeout(hide, 150);
    });
}

async function handleAddComment(event, issueId) {
    event.preventDefault();
    const content = document.getElementById('new-comment').value;

    try {
        await api.createComment(issueId, content);
        await viewIssue(issueId);
        showToast('Comment added!', 'success');
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// handleDescriptionClick is now in issue-detail-view.js module

// Edit description from detail view
async function editDescription(issueId) {
    const issue = window.currentDetailIssue || await api.getIssue(issueId);

    document.getElementById('modal-title').textContent = 'Edit Description';
    document.getElementById('modal-content').innerHTML = `
        <form onsubmit="return handleUpdateDescription(event, '${escapeJsString(issueId)}')">
            <div class="form-group description-editor">
                <div class="editor-tabs">
                    <button type="button" class="editor-tab active" id="edit-description-tab-write" onclick="setDescriptionEditorMode('write')">Write</button>
                    <button type="button" class="editor-tab" id="edit-description-tab-preview" onclick="setDescriptionEditorMode('preview')">Preview</button>
                </div>
                <textarea id="edit-description" rows="10" placeholder="Add a description...">${escapeHtml(issue.description || '')}</textarea>
                <div id="edit-description-preview" class="markdown-body editor-preview" style="display: none;"></div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save</button>
            </div>
        </form>
    `;
    showModal();
    const textarea = document.getElementById('edit-description');
    textarea.addEventListener('input', () => {
        const preview = document.getElementById('edit-description-preview');
        if (preview && preview.style.display !== 'none') {
            updateDescriptionPreview();
        }
    });
    textarea.focus();
}

function updateDescriptionPreview() {
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!textarea || !preview) return;
    const value = textarea.value.trim();
    preview.innerHTML = value
        ? renderDescriptionContent(value)
        : '<span class="text-muted">Nothing to preview.</span>';
}

// renderDescriptionContent, addIssueLinks are now in issue-detail-view.js module

function setDescriptionEditorMode(mode) {
    const writeTab = document.getElementById('edit-description-tab-write');
    const previewTab = document.getElementById('edit-description-tab-preview');
    const textarea = document.getElementById('edit-description');
    const preview = document.getElementById('edit-description-preview');
    if (!writeTab || !previewTab || !textarea || !preview) return;

    const isPreview = mode === 'preview';
    writeTab.classList.toggle('active', !isPreview);
    previewTab.classList.toggle('active', isPreview);
    textarea.style.display = isPreview ? 'none' : 'block';
    preview.style.display = isPreview ? 'block' : 'none';

    if (isPreview) {
        updateDescriptionPreview();
    } else {
        textarea.focus();
    }
}

async function handleUpdateDescription(event, issueId) {
    event.preventDefault();

    try {
        const descEl = document.getElementById('edit-description');
        if (!descEl) {
            throw new Error('Description field not found');
        }
        const description = descEl.value;
        await api.updateIssue(issueId, { description });
        closeModal();
        showToast('Description updated', 'success');
        // Refresh the issue detail view
        viewIssue(issueId, false);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// Linear-style create issue modal
function showCreateIssueModal(preselectedProjectId = null) {
    const projectId = preselectedProjectId || document.getElementById('project-filter')?.value;
    createIssueLabelIds = [];

    // Build project options
    const projectOptions = getProjects().map(p => `
        <option value="${p.id}" ${p.id === projectId ? 'selected' : ''}>${escapeHtml(p.name)}</option>
    `).join('');

    document.getElementById('modal-title').textContent = '';
    document.getElementById('modal-content').innerHTML = `
        <div class="create-issue-modal">
            <div class="create-issue-header">
                <select id="create-issue-project" class="project-select" onchange="updateCreateIssueProject()">
                    <option value="">Select project</option>
                    ${projectOptions}
                </select>
                <span class="create-issue-breadcrumb">› New issue</span>
            </div>
            <div class="create-issue-body">
                <input type="text" id="create-issue-title" class="create-issue-title-input" placeholder="Issue title" autofocus>
                <textarea id="create-issue-description" class="create-issue-description-input" placeholder="Add description..." rows="4"></textarea>
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-options-content">
                    <div class="create-issue-template">
                        <label for="create-issue-template">Template</label>
                        <select id="create-issue-template" onchange="applyIssueTemplate(this.value)">
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
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${getStatusIcon('backlog')}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${getPriorityIcon('no_priority')}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('sprint', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span id="create-issue-sprint-label">Sprint</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" id="btn-create-and-new" class="btn btn-secondary" onclick="handleCreateIssueAndNew()">Create & New</button>
                <button type="button" id="btn-create-issue" class="btn btn-primary" onclick="handleCreateIssueNew()">Create issue</button>
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
    document.getElementById('create-issue-title').focus();
}

// Toggle more options panel in create issue modal
function toggleCreateIssueOptions() {
    const panel = document.getElementById('create-issue-options-panel');
    const toggle = document.getElementById('more-options-toggle');
    if (panel && toggle) {
        panel.classList.toggle('collapsed');
        toggle.classList.toggle('expanded');
    }
}

function applyIssueTemplate(templateId) {
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

function showCreateSubIssueModal(parentId, projectId) {
    const project = getProjects().find(p => p.id === projectId);
    createIssueLabelIds = [];

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
                <button type="button" class="more-options-toggle" id="more-options-toggle" onclick="toggleCreateIssueOptions()">
                    <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                    More options
                </button>
            </div>
            <div class="create-issue-options collapsed" id="create-issue-options-panel">
                <div class="create-issue-toolbar">
                    <div class="toolbar-buttons">
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('status', event)">
                            ${getStatusIcon('backlog')}
                            <span id="create-issue-status-label">Backlog</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('priority', event)">
                            ${getPriorityIcon('no_priority')}
                            <span id="create-issue-priority-label">Priority</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-type-btn" onclick="toggleCreateIssueDropdown('type', event)">
                            <span class="issue-type-badge type-task">Task</span>
                            <span id="create-issue-type-label">Task</span>
                        </button>
                        <button type="button" class="toolbar-btn" id="create-issue-labels-btn" onclick="toggleCreateIssueDropdown('labels', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12.99V3h9.99l7.6 7.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                            <span id="create-issue-labels-label">Labels</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('assignee', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                            <span id="create-issue-assignee-label">Assignee</span>
                        </button>
                        <button type="button" class="toolbar-btn" onclick="toggleCreateIssueDropdown('estimate', event)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <span id="create-issue-estimate-label">Estimate</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create-issue-footer">
                <button type="button" class="btn btn-primary" onclick="handleCreateSubIssue('${escapeJsString(parentId)}', '${escapeJsString(projectId)}')">Create sub-issue</button>
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

async function handleCreateSubIssue(parentId, projectId) {
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
            label_ids: createIssueLabelIds,
            parent_id: parentId
        });

        closeModal();
        showToast(`Created sub-issue ${issue.identifier}`, 'success');

        // Refresh the parent issue detail view
        viewIssue(parentId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

function showAddRelationModal(issueId) {
    document.getElementById('modal-title').textContent = 'Add Relation';
    document.getElementById('modal-content').innerHTML = `
        <form onsubmit="return handleAddRelation(event, '${escapeJsString(issueId)}')">
            <div class="form-group">
                <label for="relation-type">Relation Type</label>
                <select id="relation-type" required>
                    <option value="blocks">Blocks</option>
                    <option value="blocked_by">Blocked by</option>
                    <option value="relates_to">Relates to</option>
                </select>
            </div>
            <div class="form-group">
                <label for="relation-issue-search">Search Issues</label>
                <input type="text" id="relation-issue-search" placeholder="Search by title or ID..." oninput="searchIssuesToRelate(this.value, '${escapeJsString(issueId)}')">
                <input type="hidden" id="selected-related-issue-id">
            </div>
            <div id="relation-search-results" class="link-results">
                <p class="empty-state-small">Enter a search term to find issues</p>
            </div>
            <div id="selected-issue-display" class="selected-issue-display" style="display: none;">
                <span class="selected-issue-label">Selected:</span>
                <span id="selected-issue-info"></span>
                <button type="button" class="btn btn-danger btn-tiny" onclick="clearSelectedRelation()">×</button>
            </div>
            <button type="submit" class="btn btn-primary" id="add-relation-btn" disabled>Add Relation</button>
        </form>
    `;
    showModal();
    document.getElementById('relation-issue-search').focus();
}

async function searchIssuesToRelate(query, currentIssueId) {
    const resultsDiv = document.getElementById('relation-search-results');
    if (!query || query.length < 2) {
        resultsDiv.innerHTML = '<p class="empty-state-small">Enter a search term to find issues</p>';
        return;
    }

    try {
        const teamId = window.currentTeam?.id;
        const issues = await api.searchIssues(teamId, query);
        // Filter out the current issue
        const filteredIssues = issues.filter(issue => issue.id !== currentIssueId);

        if (filteredIssues.length === 0) {
            resultsDiv.innerHTML = '<p class="empty-state-small">No issues found</p>';
            return;
        }

        resultsDiv.innerHTML = filteredIssues.map(issue => `
            <div class="link-result-item" onclick="selectIssueForRelation('${escapeJsString(issue.id)}', '${escapeJsString(issue.identifier)}', '${escapeJsString(issue.title)}')">
                <span class="link-result-id">${escapeHtml(issue.identifier)}</span>
                <span class="link-result-title">${escapeHtml(issue.title)}</span>
            </div>
        `).join('');
    } catch {
        resultsDiv.innerHTML = '<p class="empty-state-small error">Error searching issues</p>';
    }
}

function selectIssueForRelation(issueId, identifier, title) {
    document.getElementById('selected-related-issue-id').value = issueId;
    document.getElementById('selected-issue-info').textContent = `${identifier}: ${title}`;
    document.getElementById('selected-issue-display').style.display = 'flex';
    document.getElementById('relation-search-results').style.display = 'none';
    document.getElementById('relation-issue-search').value = identifier;
    document.getElementById('add-relation-btn').disabled = false;
}

function clearSelectedRelation() {
    document.getElementById('selected-related-issue-id').value = '';
    document.getElementById('selected-issue-display').style.display = 'none';
    document.getElementById('relation-search-results').style.display = 'block';
    document.getElementById('relation-issue-search').value = '';
    document.getElementById('add-relation-btn').disabled = true;
    document.getElementById('relation-issue-search').focus();
}

async function handleAddRelation(event, issueId) {
    event.preventDefault();
    const relationType = document.getElementById('relation-type').value;
    const relatedIssueId = document.getElementById('selected-related-issue-id').value;

    if (!relatedIssueId) {
        showToast('Please select an issue', 'error');
        return false;
    }

    try {
        // Determine which issue is the source based on relation type
        // For "blocked_by", we need to reverse the direction (create a "blocks" relation from the related issue to this issue)
        if (relationType === 'blocked_by') {
            await api.createRelation(relatedIssueId, issueId, 'blocks');
        } else {
            await api.createRelation(issueId, relatedIssueId, relationType);
        }

        closeModal();
        showToast('Relation added', 'success');
        viewIssue(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

async function deleteRelation(issueId, relationId) {
    try {
        await api.deleteRelation(issueId, relationId);
        showToast('Relation removed', 'success');
        viewIssue(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

async function toggleCreateIssueDropdown(type, event) {
    closeAllDropdowns();

    const btn = event.currentTarget;
    const rect = btn.getBoundingClientRect();

    const dropdown = document.createElement('div');
    dropdown.className = 'inline-dropdown dropdown-positioning';
    dropdown.style.top = `${rect.top - 8}px`;
    dropdown.style.left = `${rect.left}px`;
    dropdown.style.transform = 'translateY(-100%)';
    dropdown.style.animation = 'none'; // Disable animation - it overrides the transform

    if (type === 'status') {
        const currentStatus = document.getElementById('create-issue-status').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Status</div>
            ${['backlog', 'todo', 'in_progress', 'in_review', 'done'].map(status => `
                <button class="dropdown-option ${status === currentStatus ? 'selected' : ''}" onclick="setCreateIssueField('status', '${status}', '${formatStatus(status)}')">
                    ${getStatusIcon(status)}
                    <span>${formatStatus(status)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'priority') {
        const currentPriority = document.getElementById('create-issue-priority').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Priority</div>
            ${['no_priority', 'urgent', 'high', 'medium', 'low'].map(priority => `
                <button class="dropdown-option ${priority === currentPriority ? 'selected' : ''}" onclick="setCreateIssueField('priority', '${priority}', '${formatPriority(priority)}')">
                    ${getPriorityIcon(priority)}
                    <span>${formatPriority(priority)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'type') {
        const currentType = document.getElementById('create-issue-type').value;
        dropdown.innerHTML = `
            <div class="dropdown-header">Type</div>
            ${['task', 'bug', 'feature', 'chore', 'docs'].map(issueType => `
                <button class="dropdown-option ${issueType === currentType ? 'selected' : ''}" onclick="setCreateIssueField('type', '${issueType}', '${formatIssueType(issueType)}')">
                    <span class="issue-type-badge type-${issueType}">${formatIssueType(issueType)}</span>
                </button>
            `).join('')}
        `;
    } else if (type === 'labels') {
        if (!window.currentTeam) {
            dropdown.innerHTML = `<div class="dropdown-header">Select a team first</div>`;
        } else {
            if (labels.length === 0) {
                try {
                    labels = await api.getLabels(window.currentTeam.id);
                } catch (e) {
                    console.error('Failed to load labels:', e);
                }
            }
            renderCreateIssueLabelDropdown(dropdown);

            // Multi-select labels need special handling: don't close when clicking inside
            document.body.appendChild(dropdown);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    dropdown.classList.remove('dropdown-positioning');
                });
            });
            registerDropdownClickOutside(dropdown, { multiSelect: true });
            return; // Skip the default handler registration below
        }
    } else if (type === 'assignee') {
        const currentAssignee = document.getElementById('create-issue-assignee').value;
        const assigneeOptions = getAssigneeOptionList();
        dropdown.innerHTML = `
            <div class="dropdown-header">Assignee</div>
            <button class="dropdown-option ${!currentAssignee ? 'selected' : ''}" onclick="setCreateIssueField('assignee', '', 'Assignee')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>
                <span>Unassigned</span>
            </button>
            ${assigneeOptions.length === 0 ? `
                <div class="dropdown-empty">No team members or agents found</div>
            ` : assigneeOptions.map(({ assignee, indent }) => {
                const name = formatAssigneeName(assignee) || 'User';
                return `
                <button class="dropdown-option ${assignee.id === currentAssignee ? 'selected' : ''}" onclick="setCreateIssueField('assignee', '${escapeJsString(assignee.id)}', '${escapeJsString(name)}')">
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
                <button class="dropdown-option ${strValue === currentEstimate ? 'selected' : ''}" onclick="setCreateIssueField('estimate', '${strValue}', '${est.value ? est.label : 'Estimate'}')">
                    <span>${est.label}</span>
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
                    <button class="dropdown-option ${!currentSprintId ? 'selected' : ''}" onclick="setCreateIssueField('sprint', '', 'Sprint')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                        <span>No Sprint</span>
                    </button>
                    ${available.map(sprint => `
                        <button class="dropdown-option ${sprint.id === currentSprintId ? 'selected' : ''}" onclick="setCreateIssueField('sprint', '${escapeJsString(sprint.id)}', '${escapeJsString(sprint.name)}')">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                            <span>${escapeHtml(sprint.name)}${sprint.status === 'active' ? ' (Active)' : ''}</span>
                        </button>
                    `).join('')}
                `;
            } catch {
                dropdown.innerHTML = `<div class="dropdown-header">Failed to load sprints</div>`;
            }
            // Falls through to default append logic below
        }
    }

    document.body.appendChild(dropdown);
    // Double rAF ensures browser has painted before revealing (prevents position jump)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dropdown.classList.remove('dropdown-positioning');
        });
    });
    registerDropdownClickOutside(dropdown);
}

function updateCreateIssueProject() {
    // Clear sprint selection when project changes (sprints are project-specific)
    const sprintInput = document.getElementById('create-issue-sprint');
    const sprintLabel = document.getElementById('create-issue-sprint-label');
    if (sprintInput) sprintInput.value = '';
    if (sprintLabel) sprintLabel.textContent = 'Sprint';
}

function setCreateIssueField(field, value, label) {
    document.getElementById(`create-issue-${field}`).value = value;
    document.getElementById(`create-issue-${field}-label`).textContent = label;

    if (field === 'status') {
        const btn = document.querySelector('.toolbar-btn:first-child');
        btn.innerHTML = `${getStatusIcon(value)}<span id="create-issue-status-label">${label}</span>`;
    } else if (field === 'priority') {
        const btn = document.querySelectorAll('.toolbar-btn')[1];
        btn.innerHTML = `${getPriorityIcon(value)}<span id="create-issue-priority-label">${label}</span>`;
    } else if (field === 'type') {
        const btn = document.getElementById('create-issue-type-btn');
        if (btn) {
            btn.innerHTML = `<span class="issue-type-badge type-${value}">${formatIssueType(value)}</span><span id="create-issue-type-label">${label}</span>`;
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

    // Disable buttons to prevent double-submit
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
            label_ids: createIssueLabelIds,
            due_date: dueDate
        });

        showToast(`Created ${issue.identifier}`, 'success');

        // Refresh issues list in the background
        if (currentView === 'issues') {
            loadIssues();
        } else if (currentView === 'my-issues') {
            loadMyIssues();
        }

        if (keepOpen) {
            // Reset title and description for next issue; preserve all other settings
            document.getElementById('create-issue-title').value = '';
            document.getElementById('create-issue-description').value = '';
            document.getElementById('create-issue-title').focus();
        } else {
            closeModal();
            viewIssue(issue.id);
        }
    } catch (e) {
        showToast(e.message, 'error');
    } finally {
        if (btnCreate) btnCreate.disabled = false;
        if (btnCreateAndNew) btnCreateAndNew.disabled = false;
    }
}

async function handleCreateIssueNew() {
    await submitCreateIssue({ keepOpen: false });
}

async function handleCreateIssueAndNew() {
    await submitCreateIssue({ keepOpen: true });
}

async function showEditIssueModal(issueId) {
    try {
        const issue = await api.getIssue(issueId);
        const projectSprints = await api.getSprints(issue.project_id);

        // Get estimate options based on project's estimate scale
        const estimateOptions = window.getEstimateOptions ? window.getEstimateOptions(issue.project_id) : [
            { value: null, label: 'No estimate' },
            { value: 1, label: '1 point' },
            { value: 2, label: '2 points' },
            { value: 3, label: '3 points' },
            { value: 5, label: '5 points' },
            { value: 8, label: '8 points' },
            { value: 13, label: '13 points' },
            { value: 21, label: '21 points' },
        ];

        const estimateSelectOptions = estimateOptions.map(opt => `
            <option value="${opt.value === null ? '' : opt.value}" ${issue.estimate === opt.value ? 'selected' : ''}>${escapeHtml(opt.label)}</option>
        `).join('');

        document.getElementById('modal-title').textContent = 'Edit Issue';
        document.getElementById('modal-content').innerHTML = `
            <form onsubmit="return handleUpdateIssue(event, '${escapeJsString(issueId)}')">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${escapeAttr(issue.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <textarea id="edit-issue-description">${escapeHtml(issue.description || '')}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${issue.status === 'backlog' ? 'selected' : ''}>Backlog</option>
                        <option value="todo" ${issue.status === 'todo' ? 'selected' : ''}>Todo</option>
                        <option value="in_progress" ${issue.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                        <option value="in_review" ${issue.status === 'in_review' ? 'selected' : ''}>In Review</option>
                        <option value="done" ${issue.status === 'done' ? 'selected' : ''}>Done</option>
                        <option value="canceled" ${issue.status === 'canceled' ? 'selected' : ''}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${issue.priority === 'no_priority' ? 'selected' : ''}>No Priority</option>
                        <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="urgent" ${issue.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${issue.issue_type === 'task' ? 'selected' : ''}>Task</option>
                        <option value="bug" ${issue.issue_type === 'bug' ? 'selected' : ''}>Bug</option>
                        <option value="feature" ${issue.issue_type === 'feature' ? 'selected' : ''}>Feature</option>
                        <option value="chore" ${issue.issue_type === 'chore' ? 'selected' : ''}>Chore</option>
                        <option value="docs" ${issue.issue_type === 'docs' ? 'selected' : ''}>Docs</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${estimateSelectOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${projectSprints.filter(s => s.status !== 'completed').map(s => `
                            <option value="${s.id}" ${issue.sprint_id === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>
                        `).join('')}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `;
        showModal();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

async function handleUpdateIssue(event, issueId) {
    event.preventDefault();

    try {
        const titleEl = document.getElementById('edit-issue-title');
        const descEl = document.getElementById('edit-issue-description');
        const statusEl = document.getElementById('edit-issue-status');
        const priorityEl = document.getElementById('edit-issue-priority');
        const typeEl = document.getElementById('edit-issue-type');
        const estimateEl = document.getElementById('edit-issue-estimate');
        const sprintEl = document.getElementById('edit-issue-sprint');

        if (!titleEl || !statusEl || !priorityEl || !typeEl) {
            throw new Error('Required form fields not found');
        }

        const data = {
            title: titleEl.value,
            description: descEl ? descEl.value : '',
            status: statusEl.value,
            priority: priorityEl.value,
            issue_type: typeEl.value,
            estimate: estimateEl && estimateEl.value ? parseInt(estimateEl.value) : null,
            sprint_id: sprintEl && sprintEl.value ? sprintEl.value : null,
        };

        await api.updateIssue(issueId, data);
        closeModal();
        await viewIssue(issueId);
        showToast('Issue updated!', 'success');
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

async function deleteIssue(issueId) {
    if (!confirm('Are you sure you want to delete this issue?')) return;

    try {
        await api.deleteIssue(issueId);
        await loadIssues();
        await loadProjects();
        navigateTo('issues');
        showToast('Issue deleted!', 'success');
    } catch (e) {
        showToast(e.message, 'error');
    }
}

// Kanban Board functions are now in board.js module

// Sprints - core functions (updateSprintProjectFilter, loadSprints, renderSprints, etc.) are in sprints.js
// Note: Sprints are managed via cadence system (current/next) - no manual creation or start needed

// Labels
async function loadLabels() {
    if (!window.currentTeam) return;
    try {
        labels = await api.getLabels(window.currentTeam.id);
    } catch (e) {
        console.error('Failed to load labels:', e);
    }
}

// API Keys - now in api-keys.js module

// Rituals
async function updateRitualProjectFilter() {
    const filter = document.getElementById('ritual-project-filter');
    if (!filter) return;

    await loadProjects();
    filter.innerHTML = '<option value="">Select Project</option>' +
        getProjects().map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('');
}

// Limbo status functions are now in sprints.js module

async function approveRitual(ritualId, projectId) {
    try {
        await api.approveAttestation(ritualId, projectId);
        showToast('Ritual approved!', 'success');
        await loadLimboStatus();
        showLimboDetailsModal();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

async function completeGateRitual(ritualId, projectId, ritualName) {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-gate-ritual-form').addEventListener('submit', (event) => {
        handleCompleteGateRitual(event, ritualId, projectId);
    });
    showModal();
}

async function handleCompleteGateRitual(event, ritualId, projectId) {
    event.preventDefault();
    const note = document.getElementById('gate-note').value;

    try {
        await api.completeGateRitual(ritualId, projectId, note || null);
        showToast('Ritual completed!', 'success');
        await loadLimboStatus();

        const ls = getLimboStatus();
        if (ls && !ls.in_limbo) {
            closeModal();
            showToast('Limbo cleared! Next sprint is now active.', 'success');
        } else {
            showLimboDetailsModal();
        }
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// loadTicketRituals, toggleTicketRituals, renderTicketRituals are now in issue-detail-view.js module

function renderTicketRitualActions(ritual, issueId) {
    // Already attested and approved
    if (ritual.attestation && ritual.attestation.approved_at) {
        return '<span class="text-success">Completed</span>';
    }

    // Attested but awaiting approval (REVIEW mode)
    if (ritual.attestation && !ritual.attestation.approved_at) {
        return `
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" onclick="approveTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Approve</button>
        `;
    }

    // Not attested - GATE mode requires human completion
    if (ritual.approval_mode === 'gate') {
        return `<button class="btn btn-small btn-primary" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" onclick="showCompleteTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName)">Complete</button>`;
    }

    // AUTO or REVIEW mode - agent can attest
    if (ritual.note_required) {
        return `<button class="btn btn-small btn-secondary" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" data-ritual-prompt="${escapeAttr(ritual.prompt || '')}" onclick="showAttestTicketRitualModal(this.dataset.ritualId, this.dataset.issueId, this.dataset.ritualName, this.dataset.ritualPrompt)">Attest</button>`;
    }
    return `<button class="btn btn-small btn-secondary" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" onclick="attestTicketRitual(this.dataset.ritualId, this.dataset.issueId)">Attest</button>`;
}

function showAttestTicketRitualModal(ritualId, issueId, ritualName, ritualPrompt) {
    document.getElementById('modal-title').textContent = `Attest: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="attest-ticket-ritual-form">
            ${ritualPrompt ? `<p class="ritual-prompt-hint">${escapeHtml(ritualPrompt)}</p>` : ''}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `;
    document.getElementById('attest-ticket-ritual-form').addEventListener('submit', (event) => {
        handleAttestTicketRitual(event, ritualId, issueId);
    });
    showModal();
}

async function handleAttestTicketRitual(event, ritualId, issueId) {
    event.preventDefault();
    const note = document.getElementById('attest-ritual-note').value.trim();
    if (!note) {
        showToast('A note is required for this attestation.', 'error');
        return false;
    }
    try {
        await api.attestTicketRitual(ritualId, issueId, note);
        showToast('Ritual attested!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

async function attestTicketRitual(ritualId, issueId) {
    try {
        await api.attestTicketRitual(ritualId, issueId);
        showToast('Ritual attested!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

async function approveTicketRitual(ritualId, issueId) {
    try {
        await api.approveTicketRitual(ritualId, issueId);
        showToast('Ritual approved!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

function showCompleteTicketRitualModal(ritualId, issueId, ritualName) {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-ticket-ritual-form').addEventListener('submit', (event) => {
        handleCompleteTicketRitual(event, ritualId, issueId);
    });
    showModal();
}

async function handleCompleteTicketRitual(event, ritualId, issueId) {
    event.preventDefault();
    const note = document.getElementById('ticket-ritual-note').value;

    try {
        await api.completeTicketGateRitual(ritualId, issueId, note || null);
        showToast('Ritual completed!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// Keyboard shortcuts (logic in keyboard.js)
document.addEventListener('keydown', createKeyboardHandler({
    closeModal,
    navigateTo,
    showCreateIssueModal,
    showKeyboardShortcutsHelp,
    isModalOpen: () => !document.getElementById('modal-overlay').classList.contains('hidden'),
    focusSearch: () => {
        navigateTo('issues');
        setTimeout(() => document.getElementById('issue-search')?.focus(), 100);
    },
    closeDropdowns: () => {
        document.getElementById('team-dropdown').classList.add('hidden');
        document.getElementById('user-dropdown').classList.add('hidden');
    },
}));

// Keyboard shortcuts help modal
function showKeyboardShortcutsHelp() {
    document.getElementById('modal-title').textContent = 'Keyboard Shortcuts';
    document.getElementById('modal-content').innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Navigation</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Dashboard</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">m</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>All Issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">i</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Board</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">b</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Projects</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">p</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Sprints</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g s</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Documents</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g d</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Team</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">g t</kbd>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 0.75rem; color: var(--text-secondary)">Actions</h4>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Command palette</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">⌘K</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Search issues</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">/</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Create new item</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">c</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Navigate list</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">j/k</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Close modal</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">Esc</kbd>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem">
                    <span>Show shortcuts</span>
                    <kbd style="background: var(--bg-tertiary); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: monospace;">?</kbd>
                </div>
            </div>
        </div>
    `;
    showModal();
}

// ============================================
// COMMAND PALETTE (logic in command-palette.js)
// ============================================

// Initialize command palette with available commands
setCommandPaletteCommands([
    // Navigation
    { id: 'nav-my-issues', title: 'Dashboard', subtitle: 'View issues assigned to you', icon: '👤', shortcut: 'M', action: () => navigateTo('my-issues'), category: 'Navigation' },
    { id: 'nav-issues', title: 'Issues', subtitle: 'View all issues', icon: '📋', shortcut: 'I', action: () => navigateTo('issues'), category: 'Navigation' },
    { id: 'nav-board', title: 'Board', subtitle: 'View kanban board', icon: '📊', shortcut: 'B', action: () => navigateTo('board'), category: 'Navigation' },
    { id: 'nav-projects', title: 'Go to Projects', subtitle: 'View all projects', icon: '📁', shortcut: 'P', action: () => navigateTo('projects'), category: 'Navigation' },
    { id: 'nav-sprints', title: 'Go to Sprints', subtitle: 'View all sprints', icon: '🏃', shortcut: 'G S', action: () => navigateTo('sprints'), category: 'Navigation' },
    { id: 'nav-documents', title: 'Go to Documents', subtitle: 'View all documents', icon: '📄', shortcut: 'G D', action: () => navigateTo('documents'), category: 'Navigation' },
    { id: 'nav-team', title: 'Go to Team', subtitle: 'Manage team members', icon: '👥', shortcut: 'G T', action: () => navigateTo('team'), category: 'Navigation' },

    // Create
    { id: 'create-issue', title: 'Create Issue', subtitle: 'Add a new issue', icon: '➕', shortcut: 'C', action: () => { navigateTo('issues'); setTimeout(showCreateIssueModal, 100); }, category: 'Create' },
    { id: 'create-project', title: 'Create Project', subtitle: 'Start a new project', icon: '📁', action: () => { navigateTo('projects'); setTimeout(showCreateProjectModal, 100); }, category: 'Create' },
    { id: 'create-document', title: 'Create Document', subtitle: 'Write a new document', icon: '📝', action: () => { navigateTo('documents'); setTimeout(showCreateDocumentModal, 100); }, category: 'Create' },
    { id: 'create-team', title: 'Create Team', subtitle: 'Start a new team', icon: '👥', action: () => showCreateTeamModal(), category: 'Create' },

    // Actions
    { id: 'search-issues', title: 'Search Issues', subtitle: 'Find issues by title or ID', icon: '🔍', shortcut: '/', action: () => { navigateTo('issues'); setTimeout(() => document.getElementById('issue-search')?.focus(), 100); }, category: 'Actions' },
    { id: 'invite-member', title: 'Invite Team Member', subtitle: 'Send an invitation', icon: '✉️', action: () => { navigateTo('team'); setTimeout(showInviteModal, 100); }, category: 'Actions' },
    { id: 'show-shortcuts', title: 'Keyboard Shortcuts', subtitle: 'View all shortcuts', icon: '⌨️', shortcut: '?', action: () => showKeyboardShortcutsHelp(), category: 'Help' },
    { id: 'show-me-around', title: 'Show Me Around', subtitle: 'Replay the onboarding tour', icon: '🎓', action: () => resetOnboarding(), category: 'Help' },
    { id: 'logout', title: 'Sign Out', subtitle: 'Log out of your account', icon: '🚪', action: () => logout(), category: 'Account' },
]);

// ============================================
// DASHBOARD (logic in dashboard.js)
// ============================================

// Initialize dashboard module with required dependencies
setDashboardDependencies({
    getCurrentUser: () => currentUser,
    getCurrentTeam: () => window.currentTeam,
    renderIssueRow,
    formatActivityText,
    formatActivityActor,
    getActivityIcon,
    navigateToIssueByIdentifier,
    viewDocument,
});

// ============================================
// BOARD (logic in board.js)
// ============================================

// Initialize board module with required dependencies
setBoardDependencies({
    api,
    showToast,
    getProjects,
    getProjectFromUrl,
    setGlobalProjectSelection,
    updateUrlWithProject,
    escapeHtml,
    escapeAttr,
    escapeJsString,
    formatPriority,
});

// ============================================
// ISSUE LIST (logic in issue-list.js)
// ============================================

// Initialize issue-list module with required dependencies
setIssueListDependencies({
    getIssues: () => issues,
    getAssigneeById,
    formatAssigneeName,
    formatEstimate,
    getSprintCache,
    formatStatus,
    formatPriority,
    formatIssueType,
    escapeHtml,
    escapeAttr,
    escapeJsString,
    sanitizeColor,
    renderAvatar,
    getAssigneeOptionList,
    getGroupByValue,
});

// ============================================
// INLINE DROPDOWN (logic in inline-dropdown.js)
// ============================================

// Initialize inline-dropdown module with required dependencies
setInlineDropdownDependencies({
    api,
    getIssues: () => issues,
    setIssues: (newIssues) => { issues = newIssues; },
    getMyIssues,
    setMyIssues,
    getCurrentDetailIssue: () => window.currentDetailIssue,
    setCurrentDetailIssue: (issue) => { window.currentDetailIssue = issue; },
    getLabels: () => labels,
    setLabels: (newLabels) => { labels = newLabels; },
    getCurrentTeam: () => window.currentTeam,
    getCurrentDetailSprints: () => window.currentDetailSprints,
    closeAllDropdowns,
    registerDropdownClickOutside,
    setDropdownKeyHandler,
    showToast,
    getStatusIcon,
    getPriorityIcon,
    formatStatus,
    formatPriority,
    formatIssueType,
    formatEstimate,
    formatAssigneeName,
    formatAssigneeOptionLabel,
    getAssigneeOptionList,
    getAssigneeById,
    getEstimateOptions,
    renderAvatar,
    renderIssueRow,
    escapeHtml,
    escapeAttr,
    escapeJsString,
    sanitizeColor,
    updateSprintCacheForProject,
    updateSprintBudgetBar,
});

// ============================================
// ISSUE DETAIL VIEW (logic in issue-detail-view.js)
// ============================================

// Initialize issue-detail-view module with required dependencies
setIssueDetailViewDependencies({
    api,
    currentView,
    showToast,
    showModal,
    closeModal,
    navigateTo,
    getProjects,
    getMembers,
    getAssigneeById,
    formatAssigneeName,
    formatStatus,
    formatPriority,
    formatIssueType,
    formatEstimate,
    formatTimeAgo,
    getStatusIcon,
    getPriorityIcon,
    renderMarkdown,
    renderAvatar,
    escapeHtml,
    escapeAttr,
    escapeJsString,
    sanitizeColor,
    showDetailDropdown,
    setupMentionAutocomplete,
    renderTicketRitualActions,
});

// ============================================
// IMPROVED MODAL UX
// ============================================

// Auto-focus first input when modal opens
// Note: We override the global window.showModal to add auto-focus
// while keeping the imported showModal for the base functionality
const baseShowModal = showModal;
window.showModal = function() {
    baseShowModal();
    // Focus first input after animation
    setTimeout(() => {
        const firstInput = document.querySelector('#modal-content input, #modal-content textarea');
        if (firstInput) firstInput.focus();
    }, 50);
};

// Cmd+Enter to submit forms in modals
document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        const modalOpen = !document.getElementById('modal-overlay').classList.contains('hidden');
        if (modalOpen) {
            const form = document.querySelector('#modal-content form');
            if (form) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit', { cancelable: true }));
            } else {
                // Handle non-form modals (e.g., create issue modal)
                const primaryBtn = document.querySelector('#modal-content .btn-primary');
                if (primaryBtn && !primaryBtn.disabled) {
                    e.preventDefault();
                    primaryBtn.click();
                }
            }
        }
    }

    // Cmd+K to open command palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isCommandPaletteOpen()) {
            closeCommandPalette();
        } else {
            openCommandPalette();
        }
    }
});

// Helper to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Format ISO timestamp to relative time (e.g., "2 hours ago")
function formatRelativeTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    // Handle invalid dates
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffMs = now - date;
    // Handle future dates
    if (diffMs < 0) return 'just now';
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}

// Escape for use inside HTML attribute values (single or double-quoted)
function escapeAttr(text) {
    return escapeHtml(text).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}


// Sanitize color values to prevent style injection
function sanitizeColor(color) {
    if (!color) return '#6366f1';
    // Only allow valid hex colors or named colors
    const hexPattern = /^#[0-9a-fA-F]{3,8}$/;
    const namedColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'gray', 'black', 'white'];
    if (hexPattern.test(color) || namedColors.includes(color.toLowerCase())) {
        return color;
    }
    return '#6366f1'; // Default accent color
}

function navigateToIssueByIdentifier(identifier) {
    // Navigate to the issue detail view
    history.pushState({ view: 'issue', identifier }, '', `/issue/${identifier}`);
    viewIssueByPath(identifier);
}

// ============================================
// QUICK CREATE (with optimistic UI)
// ============================================

async function handleQuickCreate(event) {
    if (event.key !== 'Enter') return;

    const input = event.target;
    const title = input.value.trim();
    if (!title) return;

    const projectId = document.getElementById('project-filter').value;
    if (!projectId) {
        showToast('Please select a project first', 'error');
        return;
    }

    input.disabled = true;
    const originalPlaceholder = input.placeholder;
    input.placeholder = 'Creating...';

    // Optimistic: add to list immediately
    const tempId = 'temp-' + Date.now();
    const project = getProjects().find(p => p.id === projectId);
    const optimisticIssue = {
        id: tempId,
        title,
        identifier: `${project?.key || 'NEW'}-?`,
        status: 'backlog',
        priority: 'no_priority',
        issue_type: 'task',
        estimate: null,
        _isOptimistic: true
    };
    issues.unshift(optimisticIssue);
    renderIssues();

    // Mark new item
    const newItem = document.querySelector(`[data-id="${tempId}"]`);
    if (newItem) newItem.classList.add('new');

    try {
        const created = await api.createIssue(projectId, {
            title,
            status: 'backlog',
            priority: 'no_priority'
        });
        input.value = '';
        // Replace optimistic with real
        const idx = issues.findIndex(i => i.id === tempId);
        if (idx !== -1) {
            issues[idx] = created;
        }
        renderIssues();
        loadProjects(); // Update issue count in background
        showToast('Issue created!', 'success');
    } catch (e) {
        // Remove optimistic on error
        issues = issues.filter(i => i.id !== tempId);
        renderIssues();
        showToast(e.message, 'error');
    } finally {
        input.disabled = false;
        input.placeholder = originalPlaceholder;
        input.focus();
    }
}

// ============================================
// KEYBOARD LIST NAVIGATION (j/k like Vim)
// ============================================

// selectedIssueIndex is now in state.js module

function updateKeyboardSelection(newIndex) {
    const items = document.querySelectorAll('#issues-list .list-item');
    if (items.length === 0) return;

    // Clamp index
    newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

    // Remove old selection
    items.forEach(item => item.classList.remove('keyboard-selected'));

    // Add new selection
    setSelectedIssueIndex(newIndex);
    items[newIndex].classList.add('keyboard-selected');
    items[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// Extend keyboard shortcuts for j/k navigation
document.addEventListener('keydown', (e) => {
    // Only work in issues view and when not in input
    if (getCurrentView() !== 'issues') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (!document.getElementById('modal-overlay').classList.contains('hidden')) return;
    if (isCommandPaletteOpen()) return;

    const items = document.querySelectorAll('#issues-list .list-item');
    if (items.length === 0) return;

    const selectedIssueIndex = getSelectedIssueIndex();
    switch (e.key) {
        case 'j':
            e.preventDefault();
            updateKeyboardSelection(selectedIssueIndex + 1);
            break;
        case 'k':
            e.preventDefault();
            updateKeyboardSelection(selectedIssueIndex - 1);
            break;
        case 'Enter':
            if (selectedIssueIndex >= 0 && items[selectedIssueIndex]) {
                e.preventDefault();
                const issueId = items[selectedIssueIndex].dataset.id;
                if (issueId && !issueId.startsWith('temp-')) {
                    viewIssue(issueId);
                }
            }
            break;
        case 'e':
            if (selectedIssueIndex >= 0 && items[selectedIssueIndex]) {
                e.preventDefault();
                const issueId = items[selectedIssueIndex].dataset.id;
                if (issueId && !issueId.startsWith('temp-')) {
                    showEditIssueModal(issueId);
                }
            }
            break;
    }
});

// Reset selection when issues are reloaded
const originalLoadIssues = loadIssues;
// eslint-disable-next-line no-func-assign
loadIssues = async function() {
    setSelectedIssueIndex(-1);
    return originalLoadIssues.apply(this, arguments);
};

// ============================================================================
// Window attachments for HTML event handlers
// These functions are called from onclick, onchange, onsubmit, etc. in HTML
// ============================================================================
Object.assign(window, {
    // Utilities (used by other modules)
    escapeHtml,
    renderMarkdown,

    // Auth
    handleLogin,
    handleSignup,
    showLogin,
    showSignup,
    logout,

    // Navigation
    navigateTo,
    handleRoute,
    closeModal,

    // URL helpers (for testing)
    getProjectFromUrl,
    updateUrlWithProject,

    // Team management
    toggleTeamDropdown,
    toggleUserDropdown,
    showCreateTeamModal,
    showEditTeamModal,
    showInviteModal,
    
    // Issues - list and filtering
    showCreateIssueModal,
    loadIssues,
    filterIssues,
    filterMyIssues,
    debounceSearch,
    handleQuickCreate,
    onProjectFilterChange,
    updateGroupBy,
    toggleGroup,

    // Issue viewing and editing
    viewIssue,
    showEditIssueModal,
    editDescription,
    handleDescriptionClick,
    setDescriptionEditorMode,
    updateIssueField,
    handleUpdateDescription,
    handleUpdateIssue,
    deleteIssue,
    navigateToIssueByIdentifier,

    // Issue creation
    handleCreateIssueNew,
    handleCreateIssueAndNew,
    setCreateIssueField,
    toggleCreateIssueDropdown,
    toggleCreateIssueLabelSelection,
    createLabelForCreateIssue,
    createLabelFromDropdown,

    // Comments
    handleAddComment,

    // Sub-issues and relations
    showCreateSubIssueModal,
    handleCreateSubIssue,
    showAddRelationModal,
    handleAddRelation,
    deleteRelation,
    searchIssuesToRelate,
    selectIssueForRelation,
    clearSelectedRelation,

    // Issue detail dropdowns
    showDetailDropdown,
    showInlineDropdown,
    toggleIssueLabel,

    // Issue filters
    toggleMultiSelect,
    updateStatusFilter,
    updatePriorityFilter,
    clearStatusFilter,
    clearPriorityFilter,
    clearLabelFilter,

    // Linear-style filter bar
    toggleFilterMenu,
    toggleDisplayMenu,
    showFilterCategoryOptions,
    setProjectFilter,
    clearProjectFilter,
    toggleStatusOption,
    clearStatusFilterNew,
    togglePriorityOption,
    clearPriorityFilterNew,
    setTypeFilter,
    clearTypeFilter,
    setAssigneeFilter,
    clearAssigneeFilter,
    setSprintFilter,
    clearSprintFilter,
    toggleLabelOption,
    clearLabelFilterNew,
    setSort,
    setGroupBy,
    clearAllFilters,
    updateFilterChips,
    updateFilterCountBadge,
    
    // Board (functions in board.js)
    loadBoard,
    onBoardProjectChange,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleCardDragOver,
    handleCardDragLeave,
    handleDrop,
    handleCardDrop,

    // Sprints
    loadSprints,
    onSprintProjectChange,
    viewSprint,
    showEditBudgetModal,
    handleUpdateBudget,
    showCloseSprintConfirmation,
    completeSprint,
    loadLimboStatus,
    showLimboDetailsModal,

    // Documents
    showCreateDocumentModal,

    // Projects
    showCreateProjectModal,

    // Rituals (pending rituals approval)
    approveRitual,
    completeGateRitual,
    // completeGateFromList moved to gate-approvals.js

    // Ticket rituals
    toggleTicketRituals,
    attestTicketRitual,
    approveTicketRitual,
    showCompleteTicketRitualModal,
    showAttestTicketRitualModal,

    // Settings - API Keys
    showCreateApiKeyModal,
    copyApiKey,
    revokeApiKey,

    // Settings - Agents
    showCreateAgentModal,

    // Issue creation helpers (called from HTML onchange handlers)
    applyIssueTemplate,
    updateCreateIssueProject,
});
