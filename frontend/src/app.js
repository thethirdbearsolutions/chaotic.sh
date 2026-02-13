/**
 * Chaotic - Main Application
 */

/* global api, marked, DOMPurify -- provided via window by main.js entry point */

import { showModal, closeModal, showToast, closeAllDropdowns, setDropdownKeyHandler, registerDropdownClickOutside } from './ui.js';
import { updateUserInfo, showAuthScreen, showMainScreen, handleLogin, handleSignup, showLogin, showSignup, logout } from './auth.js';
import { loadDocuments, viewDocument, showCreateDocumentModal } from './documents.js';
import { getAgents, loadAgents, showCreateAgentModal } from './agents.js';
import { formatTimeAgo, escapeJsString, formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor } from './utils.js';
import {
    toggleMultiSelect,
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    updateStatusFilter,
    clearStatusFilter,
    updatePriorityFilter,
    clearPriorityFilter,
    updateLabelFilter,
    clearLabelFilter,
    updateLabelFilterLabel,
    populateLabelFilter,
    syncFiltersToUrl,
    loadFiltersFromUrl,
    toggleFilterMenu,
    toggleDisplayMenu,
    closeAllFilterMenus,
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
    updateGroupBy,
    getGroupByValue,
} from './issues-view.js';
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
    setCurrentSettingsProjectId,
    getProjectRituals,
    loadProjectSettingsRituals,
    renderRitualList,
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
    getActiveFilterCategory,
    setActiveFilterCategory,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getPendingGates,
    setPendingGates,
    getIssues,
    setIssues,
    getCurrentUser,
    setCurrentUser,
} from './state.js';
import { initIssueTooltip } from './issue-tooltip.js';
import {
    navigateTo,
    handleRoute,
    navigateToIssueByIdentifier,
    configureRouter,
    registerViews,
    initRouter,
} from './router.js';

// State - now managed by state.js module
// Local aliases for backward compatibility during migration
// currentUser is now managed by state.js (getCurrentUser/setCurrentUser)
// currentTeam is managed via window.currentTeam (set by teams.js)
window.currentTeam = null;
// currentView local alias removed — use getCurrentView() from state.js
// issues is now managed by state.js (getIssues/setIssues)
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
// searchDebounceTimer is now managed by state.js (getSearchDebounceTimer/setSearchDebounceTimer)
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

// Issues view functions (filter bar, filter state, issue loading) are now in issues-view.js module

// Configure router (CHT-782)
configureRouter({
    beforeNavigate: () => {
        clearProjectSettingsState();
        window._onRitualsChanged = null;
    },
    detailRoute: (parts) => {
        if (parts[0] === 'issue' && parts[1]) {
            viewIssueByPath(parts[1]);
            return true;
        }
        if (parts[0] === 'document' && parts[1]) {
            viewDocumentByPath(parts[1]);
            return true;
        }
        if (parts[0] === 'sprint' && parts[1]) {
            viewSprintByPath(parts[1]);
            return true;
        }
        if (parts[0] === 'projects' && parts[1] && parts[2] === 'settings') {
            viewProjectSettings(parts[1]);
            return true;
        }
        return false;
    },
    detailPopstate: (state) => {
        if (state.issueId) { viewIssue(state.issueId, false); return true; }
        if (state.identifier) { viewIssueByPath(state.identifier); return true; }
        if (state.documentId) { viewDocument(state.documentId, false); return true; }
        if (state.sprintId) { viewSprint(state.sprintId, false); return true; }
        return false;
    },
    restoreProject: () => {
        const urlProject = getProjectFromUrl();
        if (urlProject && getProjects().some(p => p.id === urlProject)) {
            setGlobalProjectSelection(urlProject);
        }
    },
    issueNavigate: (identifier) => viewIssueByPath(identifier),
});

registerViews({
    'my-issues': () => {
        loadMyIssues();
        loadDashboardActivity();
    },
    'gate-approvals': () => {
        loadGateApprovals();
    },
    'issues': () => {
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
    },
    'board': () => {
        updateBoardProjectFilter();
    },
    'projects': () => {
        loadProjects().then(renderProjects);
    },
    'sprints': () => {
        updateSprintProjectFilter();
    },
    'rituals': () => {
        loadRitualsView();
    },
    'documents': () => {
        loadDocuments();
    },
    'team': () => {
        loadTeamMembers();
        loadTeamAgents();
        loadTeamInvitations();
    },
    'settings': () => {
        loadApiKeys();
        loadAgents();
        updateRitualProjectFilter();
    },
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    initThemeToggle();
    initIssueLinkHandler();
    initIssueTooltip({ api });
    initRouter();
    if (api.getToken()) {
        try {
            const user = await api.getMe();
            setCurrentUser(user);
            window.currentUser = user;
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
let wsFailCount = 0;

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
            if (wsFailCount > 0) {
                showToast('Live updates reconnected', 'success');
            }
            wsFailCount = 0;
        };

        websocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            handleWebSocketMessage(message);
        };

        websocket.onclose = () => {
            console.log('WebSocket disconnected');
            wsFailCount++;
            // Show toast on first disconnect and periodically after
            if (wsFailCount === 1) {
                showToast('Live updates disconnected. Reconnecting...', 'warning');
            }
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
            const currentIssues = getIssues();
            const existingIndex = currentIssues.findIndex(i => i.id === data.id);
            const optimisticIndex = currentIssues.findIndex(i => i._isOptimistic && i.title === data.title);

            if (existingIndex >= 0) {
                // Already have this exact issue, skip
            } else if (optimisticIndex >= 0) {
                // Replace optimistic issue with real one from WebSocket
                currentIssues[optimisticIndex] = data;
                setIssues(currentIssues);
                if (getCurrentView() === 'issues') {
                    renderIssues();
                }
                // Don't show toast - user already knows they created it
            } else {
                // New issue from another user/session
                setIssues([data, ...currentIssues]);
                if (getCurrentView() === 'issues') {
                    renderIssues();
                }
                showToast(`New issue: ${data.identifier}`, 'info');
            }

            // Check myIssues separately (managed by dashboard.js)
            if (data.assignee_id === getCurrentUser()?.id) {
                const myIssuesArr = getMyIssues();
                const myExistingIndex = myIssuesArr.findIndex(i => i.id === data.id);
                const myOptimisticIndex = myIssuesArr.findIndex(i => i._isOptimistic && i.title === data.title);
                if (myExistingIndex === -1 && myOptimisticIndex === -1) {
                    setMyIssues([data, ...myIssuesArr]);
                    if (getCurrentView() === 'my-issues') {
                        renderMyIssues();
                    }
                } else if (myOptimisticIndex >= 0) {
                    myIssuesArr[myOptimisticIndex] = data;
                    setMyIssues(myIssuesArr);
                    if (getCurrentView() === 'my-issues') {
                        renderMyIssues();
                    }
                }
            }

            if (getCurrentView() === 'my-issues') {
                loadDashboardActivity();
            }

            // Re-render board/sprints when issues are created (CHT-237)
            if (getCurrentView() === 'board') {
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                loadSprints();
            }

            // Refresh issue detail if a child issue was created (CHT-71)
            if (getCurrentView() === 'issue-detail' && data.parent_id === window.currentDetailIssue?.id) {
                viewIssue(window.currentDetailIssue.id, false);
            }
        } else if (type === 'updated') {
            // Update in local arrays
            const issuesForUpdate = getIssues();
            const issueIndex = issuesForUpdate.findIndex(i => i.id === data.id);
            if (issueIndex >= 0) {
                issuesForUpdate[issueIndex] = data;
                setIssues(issuesForUpdate);
            }
            const myIssuesForUpdate = getMyIssues();
            const myIndex = myIssuesForUpdate.findIndex(i => i.id === data.id);
            if (myIndex >= 0) {
                myIssuesForUpdate[myIndex] = data;
                setMyIssues(myIssuesForUpdate);
            }
            // Re-render if on issues view
            if (getCurrentView() === 'issues') {
                renderIssues();
            } else if (getCurrentView() === 'my-issues') {
                renderMyIssues();
                loadDashboardActivity();
            } else if (getCurrentView() === 'board') {
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                // Sprints display issue counts, so issue changes affect them
                loadSprints();
            } else if (getCurrentView() === 'issue-detail') {
                // Refresh detail view if viewing this issue
                const detailContent = document.getElementById('issue-detail-content');
                if (detailContent && detailContent.dataset.issueId === data.id) {
                    viewIssue(data.id);
                }
            }
        } else if (type === 'deleted') {
            // Remove from local arrays
            setIssues(getIssues().filter(i => i.id !== data.id));
            setMyIssues(getMyIssues().filter(i => i.id !== data.id));
            // Re-render
            if (getCurrentView() === 'issues') {
                renderIssues();
            } else if (getCurrentView() === 'my-issues') {
                renderMyIssues();
                loadDashboardActivity();
            } else if (getCurrentView() === 'board') {
                // Re-render board when issues change (CHT-237)
                renderBoard();
            } else if (getCurrentView() === 'sprints') {
                // Re-render sprints when issues change (CHT-237)
                loadSprints();
            }
            showToast(`Issue ${data.identifier} deleted`, 'info');
        }
        // If viewing issue detail and the deleted issue is the current one, navigate away
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.id) {
            showToast(`Issue ${data.identifier} was deleted`, 'warning');
            navigateTo('my-issues');
        }
    } else if (entity === 'comment') {
        if (getCurrentView() === 'my-issues') {
            loadDashboardActivity();
        }
        // Refresh issue detail if viewing the commented issue (CHT-71)
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    } else if (entity === 'relation') {
        // Refresh issue detail if viewing an issue involved in the relation change (CHT-71)
        if (getCurrentView() === 'issue-detail') {
            const currentIssueId = window.currentDetailIssue?.id;
            if (currentIssueId && (data.source_issue_id === currentIssueId || data.target_issue_id === currentIssueId)) {
                viewIssue(currentIssueId, false);
            }
        }
    } else if (entity === 'activity') {
        // Activity event (CHT-359) - reload dashboard activity
        // TODO: In the future, prepend data directly instead of refetching
        if (getCurrentView() === 'my-issues') {
            loadDashboardActivity();
        }
        // Also refresh issue detail if viewing an affected issue
        if (getCurrentView() === 'issue-detail' && window.currentDetailIssue?.id === data.issue_id) {
            viewIssue(data.issue_id, false);
        }
    }
}

// viewDocumentByPath helper (used by router detail route config)
async function viewDocumentByPath(docId) {
    try {
        await viewDocument(docId, false);
    } catch {
        navigateTo('documents', false);
    }
}

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

// updateSprintFilter and updateSprintBudgetBar are now in issues-view.js module

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

    // Filter helper: returns only the approvals matching a predicate
    const getApprovals = (item) => item.pending_approvals || [];
    const filterPred = (pred) => (item) => {
        const filtered = getApprovals(item).filter(pred);
        return filtered.length > 0 ? { ...item, _filteredApprovals: filtered } : null;
    };

    // Group by type: GATE claim, GATE close, REVIEW (each issue only shows matching rituals per section)
    const claimGates = pendingItems.map(filterPred(r => r.approval_mode === 'gate' && r.limbo_type === 'claim')).filter(Boolean);
    const closeGates = pendingItems.map(filterPred(r => r.approval_mode === 'gate' && r.limbo_type === 'close')).filter(Boolean);
    const reviewItems = pendingItems.map(filterPred(r => r.approval_mode === 'review')).filter(Boolean);

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
                d.ritualPrompt,
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
    const approvals = approvalIssue._filteredApprovals || approvalIssue.pending_approvals || [];
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

// loadIssues, debounceSearch, filterIssues, onProjectFilterChange, updateGroupBy, getGroupByValue
// are now in issues-view.js module

// ensureSprintCacheForIssues and invalidateSprintCache are now in sprints.js
// Issue list functions (renderIssues, renderIssueRow, toggleGroup, getPriorityIcon, getStatusIcon)
// are now in issue-list.js module
// Inline dropdown functions (showInlineDropdown, updateIssueField, toggleIssueLabel, etc.)
// are now in inline-dropdown.js module

// formatStatus and formatPriority are now imported from utils.js

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
        if (getCurrentView() === 'issues') {
            loadIssues();
        } else if (getCurrentView() === 'my-issues') {
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

// Rituals top-level view
async function loadRitualsView() {
    const filter = document.getElementById('rituals-project-filter');
    if (!filter) return;

    // Set callback so CRUD operations refresh the rituals view
    window._onRitualsChanged = renderRitualsView;

    await loadProjects();
    filter.innerHTML = '<option value="">Select a project</option>' +
        getProjects().map(p => `<option value="${escapeAttr(p.id)}">${escapeHtml(p.name)}</option>`).join('');

    // Auto-select saved project
    const savedProject = getProjectFromUrl() || getSavedProjectId();
    if (savedProject && getProjects().some(p => p.id === savedProject)) {
        filter.value = savedProject;
        onRitualsProjectChange();
    } else {
        document.getElementById('rituals-content').innerHTML =
            '<div class="empty-state">Select a project to view and manage rituals.</div>';
    }
}

async function onRitualsProjectChange() {
    const projectId = document.getElementById('rituals-project-filter').value;
    const container = document.getElementById('rituals-content');

    if (!projectId) {
        container.innerHTML = '<div class="empty-state">Select a project to view and manage rituals.</div>';
        return;
    }

    // Set the project context so create/edit/delete functions work
    setCurrentSettingsProjectId(projectId);

    container.innerHTML = '<div class="loading">Loading rituals...</div>';

    try {
        await loadProjectSettingsRituals();
        // renderRitualsView() is called via the _onRitualsChanged callback
    } catch (e) {
        container.innerHTML = `<div class="empty-state">Error loading rituals: ${escapeHtml(e.message)}</div>`;
    }
}

function renderRitualsView() {
    const container = document.getElementById('rituals-content');
    const rituals = getProjectRituals();

    const sprintRituals = rituals.filter(r => !r.trigger || r.trigger === 'every_sprint');
    const closeRituals = rituals.filter(r => r.trigger === 'ticket_close');
    const claimRituals = rituals.filter(r => r.trigger === 'ticket_claim');

    container.innerHTML = `
        <div class="rituals-view-sections">
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Sprint Rituals</h3>
                        <p class="settings-description">Required when closing a sprint</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('every_sprint')">+ Create Ritual</button>
                </div>
                <div id="rv-sprint-rituals-list" class="rituals-list"></div>
            </section>
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Ticket Close Rituals</h3>
                        <p class="settings-description">Required when closing a ticket</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_close')">+ Create Ritual</button>
                </div>
                <div id="rv-close-rituals-list" class="rituals-list"></div>
            </section>
            <section class="settings-section">
                <div class="settings-section-header">
                    <div>
                        <h3>Ticket Claim Rituals</h3>
                        <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                    </div>
                    <button class="btn btn-primary" onclick="showCreateProjectRitualModal('ticket_claim')">+ Create Ritual</button>
                </div>
                <div id="rv-claim-rituals-list" class="rituals-list"></div>
            </section>
        </div>
    `;

    // Render ritual lists into the view-specific containers
    renderRitualList('rv-sprint-rituals-list', sprintRituals, 'sprint');
    renderRitualList('rv-close-rituals-list', closeRituals, 'close');
    renderRitualList('rv-claim-rituals-list', claimRituals, 'claim');
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
    getCurrentUser,
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
    getIssues,
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
    getIssues,
    setIssues,
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
    getCurrentView,
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

// escapeHtml is now imported from utils.js

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

// escapeAttr and sanitizeColor are now imported from utils.js

// navigateToIssueByIdentifier is now in router.js

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
    setIssues([optimisticIssue, ...getIssues()]);
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
        const issuesAfterCreate = getIssues();
        const idx = issuesAfterCreate.findIndex(i => i.id === tempId);
        if (idx !== -1) {
            issuesAfterCreate[idx] = created;
            setIssues(issuesAfterCreate);
        }
        renderIssues();
        loadProjects(); // Update issue count in background
        showToast('Issue created!', 'success');
    } catch (e) {
        // Remove optimistic on error
        setIssues(getIssues().filter(i => i.id !== tempId));
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

// Selection reset on issue reload is now handled inside issues-view.js loadIssues()

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

    // Rituals top-level view
    loadRitualsView,
    onRitualsProjectChange,

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
