/**
 * Chaotic - Main Application
 */

import { api } from './api.js';
import { initEventDelegation, registerActions } from './event-delegation.js';
import { closeModal, isModalOpen } from './ui.js';
import { showAuthScreen, logout, initAuth } from './auth.js';
import { initApp } from './init.js';
import { loadDocuments, viewDocument, showCreateDocumentModal, showEditDocumentModal, setDocViewMode, enterSelectionMode, filterDocuments, debounceDocSearch } from './documents.js';
import { loadAgents, showCreateAgentModal } from './agents.js';
import { showCreateIssueModal } from './issue-creation.js';
import { showKeyboardShortcutsHelp } from './keyboard-help.js';
import { showEditIssueModal } from './issue-edit.js';
import {
    toggleMultiSelect,
    updateStatusFilter,
    clearStatusFilter,
    updatePriorityFilter,
    clearPriorityFilter,
    clearLabelFilter,
    updateLabelFilterLabel,
    populateLabelFilter,
    loadFiltersFromUrl,
    toggleFilterMenu,
    toggleDisplayMenu,
    initFilterBar,
    updateSprintFilter,
    loadIssues,
    debounceSearch,
    filterIssues,
    updateGroupBy,
} from './issues-view.js';
import { loadGateApprovals } from './gate-approvals.js';
import { showCreateEpicModal, loadEpics } from './epics.js';
import { viewEpicByPath, viewEpic } from './epic-detail-view.js';
import { createKeyboardHandler, createModifierKeyHandler, createListNavigationHandler, createDocListNavigationHandler } from './keyboard.js';
import {
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
    switchProjectSettingsTab,
    saveProjectSettingsGeneral,
    saveProjectSettingsRules,
    showCreateProjectRitualModal,
    setOnRitualsChanged,
} from './projects.js';
import { getProjectFromUrl } from './url-helpers.js';
import { resetOnboarding } from './onboarding.js';
import {
    loadSprints,
    viewSprint,
    viewSprintByPath,
} from './sprints.js';
import {
    loadRitualsView,
    switchRitualsTab,
} from './rituals-view.js';
import { loadApiKeys, showCreateApiKeyModal } from './api-keys.js';
import {
    setCommands as setCommandPaletteCommands,
    open as openCommandPalette,
    close as closeCommandPalette,
    isOpen as isCommandPaletteOpen,
} from './command-palette.js';
import { loadMyIssues, loadDashboardActivity, loadSprintStatus, filterMyIssues } from './dashboard.js';
import { loadBoard } from './board.js';
import { viewIssueByPath, viewIssue } from './issue-detail-view.js';
import {
    getCurrentView,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getSelectedDocIndex,
    setSelectedDocIndex,
    setCurrentUser,
    setCurrentProject,
    setCurrentDetailIssue,
    setCurrentDetailSprints,
} from './state.js';
import { initIssueTooltip, hideTooltip } from './issue-tooltip.js';
import {
    navigateTo,
    navigateToIssueByIdentifier,
    configureRouter,
    registerViews,
    initRouter,
} from './router.js';
import { registerWsHandlers } from './ws-handlers.js';
import { toggleSidebar, closeSidebar } from './sidebar.js';
import { handleQuickCreate } from './quick-create.js';
import { getTheme, setTheme } from './storage.js';

// Mobile sidebar toggle, closeSidebar, focus trap moved to sidebar.js (CHT-1046)

// Configure router (CHT-782)
configureRouter({
    beforeNavigate: () => {
        clearProjectSettingsState();
        setOnRitualsChanged(null);
        setCurrentDetailIssue(null);
        setCurrentDetailSprints(null);
        closeSidebar();
        hideTooltip();
    },
    detailRoute: (parts) => {
        if (parts[0] === 'epic' && parts[1]) {
            viewEpicByPath(parts[1]);
            return true;
        }
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
        if (state.epicId) { viewEpic(state.epicId, false); return true; }
        if (state.issueId) { viewIssue(state.issueId, false); return true; }
        if (state.identifier) { viewIssueByPath(state.identifier); return true; }
        if (state.documentId) { viewDocument(state.documentId, false); return true; }
        if (state.sprintId) { viewSprint(state.sprintId, false); return true; }
        return false;
    },
    restoreProject: () => {
        const urlProject = getProjectFromUrl();
        if (urlProject && getProjects().some(p => p.id === urlProject)) {
            setCurrentProject(urlProject);
        }
    },
    issueNavigate: (identifier) => viewIssueByPath(identifier),
    epicNavigate: (identifier) => viewEpicByPath(identifier),
});

registerViews({
    'my-issues': () => {
        loadSprintStatus();
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
    'epics': () => {
        loadEpics();
    },
    'board': () => {
        loadBoard();
    },
    'projects': () => {
        loadProjects().then(renderProjects);
    },
    'sprints': () => {
        loadSprints();
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
    },
});

/**
 * Initialize modal event listeners (CHT-1057)
 * Replaces inline onclick handlers on the modal overlay and close button.
 */
function initModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        // Close modal only when clicking outside the modal box (CHT-1117)
        // Uses closest() check instead of stopPropagation (CHT-1121)
        overlay.addEventListener('click', (e) => {
            if (!e.target.closest('.modal')) closeModal();
        });
    }
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal());
}

// initActionButtons removed (CHT-1120) — all actions now use event delegation via registerActions()

/**
 * Initialize project settings view event listeners (CHT-1057)
 * Replaces inline onclick handlers on tabs, save buttons, and ritual create buttons.
 */
function initProjectSettings() {
    const view = document.getElementById('project-settings-view');
    if (!view) return;

    // Settings tabs
    view.querySelectorAll('.settings-tab[data-tab]').forEach(tab => {
        tab.addEventListener('click', () => switchProjectSettingsTab(tab.dataset.tab));
    });

    // Save buttons
    const generalSave = view.querySelector('#project-settings-tab-general .btn-primary');
    if (generalSave) generalSave.addEventListener('click', () => saveProjectSettingsGeneral());

    const rulesSave = view.querySelector('#project-settings-tab-rules .btn-primary');
    if (rulesSave) rulesSave.addEventListener('click', () => saveProjectSettingsRules());

    // Create ritual buttons — use the tab ID to determine trigger type
    const ritualTabMap = {
        'project-settings-tab-sprint-rituals': 'every_sprint',
        'project-settings-tab-close-rituals': 'ticket_close',
        'project-settings-tab-claim-rituals': 'ticket_claim',
    };
    Object.entries(ritualTabMap).forEach(([tabId, trigger]) => {
        const btn = view.querySelector(`#${tabId} .btn-primary`);
        if (btn) btn.addEventListener('click', () => showCreateProjectRitualModal(trigger));
    });
}

/**
 * Initialize documents view event listeners (CHT-1057)
 */
function initDocumentsView() {
    const docListBtn = document.getElementById('doc-view-list');
    if (docListBtn) docListBtn.addEventListener('click', () => setDocViewMode('list'));

    const docGridBtn = document.getElementById('doc-view-grid');
    if (docGridBtn) docGridBtn.addEventListener('click', () => setDocViewMode('grid'));

    const docSelectBtn = document.getElementById('doc-select-btn');
    if (docSelectBtn) docSelectBtn.addEventListener('click', () => enterSelectionMode());

    const docSearch = document.getElementById('doc-search');
    if (docSearch) docSearch.addEventListener('input', () => debounceDocSearch());

    const docSort = document.getElementById('doc-sort');
    if (docSort) docSort.addEventListener('change', () => filterDocuments());
}

/**
 * Initialize dashboard view event listeners (CHT-1057)
 */
function initDashboardView() {
    const statusFilter = document.getElementById('my-issues-status-filter');
    if (statusFilter) statusFilter.addEventListener('change', () => filterMyIssues());
}

/**
 * Initialize issues view event listeners (CHT-1057)
 * Handles search, filter buttons, filter dropdowns, select changes, and quick-create.
 */
function initIssuesView() {
    const search = document.getElementById('issue-search');
    if (search) search.addEventListener('input', () => debounceSearch());

    // Filter & display menu buttons
    const filterMenuBtn = document.getElementById('filter-menu-btn');
    if (filterMenuBtn) filterMenuBtn.addEventListener('click', () => toggleFilterMenu());

    const displayMenuBtn = document.getElementById('display-menu-btn');
    if (displayMenuBtn) displayMenuBtn.addEventListener('click', () => toggleDisplayMenu());

    // Multi-select toggle buttons (status, priority, label)
    document.querySelectorAll('.multi-select-btn').forEach(btn => {
        const wrapper = btn.parentElement;
        if (wrapper?.querySelector('#status-filter-dropdown')) {
            btn.addEventListener('click', () => toggleMultiSelect('status-filter-dropdown'));
        } else if (wrapper?.querySelector('#priority-filter-dropdown')) {
            btn.addEventListener('click', () => toggleMultiSelect('priority-filter-dropdown'));
        } else if (wrapper?.querySelector('#label-filter-dropdown')) {
            btn.addEventListener('click', () => toggleMultiSelect('label-filter-dropdown'));
        }
    });

    // Status filter checkboxes
    const statusDropdown = document.getElementById('status-filter-dropdown');
    if (statusDropdown) {
        statusDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => updateStatusFilter());
        });
        const clearBtn = statusDropdown.querySelector('.btn-small');
        if (clearBtn) clearBtn.addEventListener('click', () => clearStatusFilter());
    }

    // Priority filter checkboxes
    const priorityDropdown = document.getElementById('priority-filter-dropdown');
    if (priorityDropdown) {
        priorityDropdown.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => updatePriorityFilter());
        });
        const clearBtn = priorityDropdown.querySelector('.btn-small');
        if (clearBtn) clearBtn.addEventListener('click', () => clearPriorityFilter());
    }

    // Label filter clear button
    const labelDropdown = document.getElementById('label-filter-dropdown');
    if (labelDropdown) {
        const clearBtn = labelDropdown.querySelector('.btn-small');
        if (clearBtn) clearBtn.addEventListener('click', () => clearLabelFilter());
    }

    // Simple select filters
    const typeFilter = document.getElementById('issue-type-filter');
    if (typeFilter) typeFilter.addEventListener('change', () => filterIssues());

    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter) assigneeFilter.addEventListener('change', () => filterIssues());

    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.addEventListener('change', () => filterIssues());

    const sortSelect = document.getElementById('sort-by-select');
    if (sortSelect) sortSelect.addEventListener('change', () => loadIssues());

    const groupSelect = document.getElementById('group-by-select');
    if (groupSelect) groupSelect.addEventListener('change', () => updateGroupBy());

    // Quick create input
    const quickCreate = document.querySelector('.quick-create-input');
    if (quickCreate) quickCreate.addEventListener('keydown', (e) => handleQuickCreate(e));
}

/**
 * Initialize rituals view event listeners (CHT-1057)
 */
function initRitualsView() {
    // Rituals tabs (use data-tab attribute)
    const ritualsView = document.getElementById('rituals-view');
    if (ritualsView) {
        ritualsView.querySelectorAll('.settings-tab[data-tab]').forEach(tab => {
            tab.addEventListener('click', () => switchRitualsTab(tab.dataset.tab));
        });
    }
}

/**
 * Initialize sidebar/nav event listeners (CHT-1057)
 * Replaces inline onclick handlers on sidebar, nav, and mobile header elements.
 */
function initSidebarNav() {
    // Team selector dropdown
    const teamSelector = document.querySelector('.team-selector');
    if (teamSelector) teamSelector.addEventListener('click', () => toggleTeamDropdown());

    // Sidebar create issue button
    const createBtn = document.querySelector('.sidebar-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => showCreateIssueModal());

    // Navigation items — use data-view attribute
    document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(item.dataset.view);
        });
    });

    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) userMenu.addEventListener('click', () => toggleUserDropdown());

    // Sidebar backdrop (close on click)
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (backdrop) backdrop.addEventListener('click', () => closeSidebar());

    // Mobile hamburger button
    const hamburger = document.getElementById('hamburger-btn');
    if (hamburger) hamburger.addEventListener('click', () => toggleSidebar());

    // Mobile FAB (create issue)
    const fab = document.querySelector('.mobile-fab');
    if (fab) fab.addEventListener('click', () => showCreateIssueModal());
}

// Register shared delegated actions (CHT-1120: migrated from initActionButtons)
registerActions({
    'navigate-to': (_event, data) => {
        navigateTo(data.view);
    },
    'set-current-project': (_event, _data, target) => {
        setCurrentProject(target.value);
    },
    'showCreateIssueModal': () => showCreateIssueModal(),
    'showCreateEpicModal': () => showCreateEpicModal(),
    'showCreateProjectModal': () => showCreateProjectModal(),
    'showCreateDocumentModal': () => showCreateDocumentModal(),
    'showCreateTeamModal': () => showCreateTeamModal(),
    'showEditTeamModal': () => showEditTeamModal(),
    'showInviteModal': () => showInviteModal(),
    'showCreateApiKeyModal': () => showCreateApiKeyModal(),
    'showCreateAgentModal': () => showCreateAgentModal(),
    'resetOnboarding': () => resetOnboarding(),
    'logout': () => logout(),
    'navigateToProjects': () => navigateTo('projects'),
});

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    initEventDelegation();
    initAuth();
    initSidebarNav();
    initModal();
    initDashboardView();
    initIssuesView();
    initRitualsView();
    initProjectSettings();
    initDocumentsView();
    initThemeToggle();
    initIssueLinkHandler();
    initIssueTooltip({ api });
    initRouter();
    registerWsHandlers();
    if (api.getToken()) {
        try {
            const user = await api.getMe();
            setCurrentUser(user);
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
    const useLight = getTheme() === 'light';
    document.body.classList.toggle('theme-light', useLight);
    toggle.checked = useLight;

    toggle.addEventListener('change', () => {
        const isLight = toggle.checked;
        document.body.classList.toggle('theme-light', isLight);
        setTheme(isLight ? 'light' : 'dark');
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

// initApp extracted to init.js (CHT-1093) to break circular deps


// viewDocumentByPath helper (used by router detail route config)
async function viewDocumentByPath(docId) {
    try {
        await viewDocument(docId, false);
    } catch {
        navigateTo('documents', false);
    }
}

// loadGateApprovals, renderGateApprovals, dismissApprovalsExplainer, renderApprovalIssue
// moved to gate-approvals.js (CHT-1040)

// getMemberHandle, setupMentionAutocomplete moved to mention-autocomplete.js (CHT-1044)


// Keyboard shortcuts (logic in keyboard.js)
document.addEventListener('keydown', createKeyboardHandler({
    closeModal,
    closeSidebar,
    navigateTo,
    showCreateIssueModal,
    showKeyboardShortcutsHelp,
    isModalOpen,
    focusSearch: () => {
        navigateTo('issues');
        setTimeout(() => document.getElementById('issue-search')?.focus(), 100);
    },
    closeDropdowns: () => {
        document.getElementById('team-dropdown').classList.add('hidden');
        document.getElementById('user-dropdown').classList.add('hidden');
    },
}));

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
// IMPROVED MODAL UX
// ============================================

// Cmd+Enter (submit forms/modals) and Cmd+K (command palette) - logic in keyboard.js
document.addEventListener('keydown', createModifierKeyHandler({
    isModalOpen,
    getModalForm: () => document.querySelector('#modal-content form'),
    getModalPrimaryBtn: () => document.querySelector('#modal-content .btn-primary'),
    isCommandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
}));


// handleQuickCreate moved to quick-create.js (CHT-1045)

// j/k/Enter/e list navigation - logic in keyboard.js
document.addEventListener('keydown', createListNavigationHandler({
    getCurrentView,
    getSelectedIndex: getSelectedIssueIndex,
    setSelectedIndex: setSelectedIssueIndex,
    viewIssue,
    showEditIssueModal,
    isModalOpen,
    isCommandPaletteOpen,
}));

// j/k/Enter/e list navigation for documents
document.addEventListener('keydown', createDocListNavigationHandler({
    getCurrentView,
    getSelectedIndex: getSelectedDocIndex,
    setSelectedIndex: setSelectedDocIndex,
    viewDocument,
    showEditDocumentModal,
    isModalOpen,
    isCommandPaletteOpen,
}));

