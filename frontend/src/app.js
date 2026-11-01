/**
 * Chaotic - Main Application
 */

import { appendPendingRows } from './issue-list.js';
import { api } from './api.js';
import { initEventDelegation, registerActions } from './event-delegation.js';
import { closeModal, isModalOpen, showToast, closeInlineDropdownsFromEscape, isModalDirty, focusModalFirstField } from './ui.js';
import { showAuthScreen, logout, initAuth, updateUserInfo } from './auth.js';
import { initApp, showSignedOut } from './init.js';
import { readSnapshot, userIdFromToken, clearSnapshot } from './boot-cache.js';
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
    clearExcludeLabelFilter,
    updateLabelFilterLabel,
    updateExcludeLabelFilterLabel,
    populateLabelFilter,
    loadFiltersFromUrl,
    toggleFilterMenu,
    toggleDisplayMenu,
    closeAllFilterMenus,
    initFilterBar,
    updateSprintFilter,
    loadIssues,
    debounceSearch,
    filterIssues,
    updateGroupBy,
    showCachedIssuesOrSkeleton,
    getSelectedLabels,
    getExcludedLabels,
} from './issues-view.js';
import { loadGateApprovals } from './gate-approvals.js';
import { loadQueryView } from './query-view.js';
import { loadInbox, toggleInboxEntryElementExpand, collapseInboxExpand, archiveInboxEntryElement } from './inbox.js';
import { showCreateEpicModal, loadEpics } from './epics.js';
import { viewEpicByPath, viewEpic } from './epic-detail-view.js';
import { createKeyboardHandler, createModifierKeyHandler, createListNavigationHandler, createDocListNavigationHandler, createBoardNavigationHandler, createInboxNavigationHandler, createSidebarNavigationHandler, createSimpleListNavigationHandler, isAnyDetailViewActive, focusMainContent } from './keyboard.js';
import { showInlineDropdown, isInlineDropdownOpen } from './inline-dropdown.js';
import { isQuoteTooltipVisible } from './quote-comment.js';
import { initSelectPickers } from './select-picker.js';
import './revisions.js';
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
import { loadConnections } from './connected-apps.js';
import { loadPushDevices } from './push-devices.js';
import {
    setCommands as setCommandPaletteCommands,
    open as openCommandPalette,
    close as closeCommandPalette,
    isOpen as isCommandPaletteOpen,
} from './command-palette.js';
import { loadMyIssues, loadDashboardActivity, loadSprintStatus, filterMyIssues, getSelectedMyIssueIndex, setSelectedMyIssueIndex } from './dashboard.js';
import { loadBoard } from './board.js';
import { viewIssueByPath, viewIssue, abandonIssueLoad } from './issue-detail-view.js';
import {
    getCurrentView,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getSelectedDocIndex,
    setSelectedDocIndex,
    getSelectedBoardIndex,
    setSelectedBoardIndex,
    getSelectedInboxIndex,
    setSelectedInboxIndex,
    getSelectedSprintIndex,
    setSelectedSprintIndex,
    getSelectedEpicIndex,
    setSelectedEpicIndex,
    setCurrentUser,
    setCurrentProject,
    setCurrentDetailIssue,
    setCurrentDetailSprints,
} from './state.js';
import { initIssueTooltip, hideTooltip } from './issue-tooltip.js';
import {
    navigateTo,
    navigateToIssueByIdentifier,
    navigateToEpicByIdentifier,
    configureRouter,
    registerViews,
    primeRoute,
} from './router.js';
import { registerWsHandlers } from './ws-handlers.js';
import { toggleSidebar, closeSidebar } from './sidebar.js';
import { handleQuickCreate } from './quick-create.js';
import { getTheme, setTheme } from './storage.js';

// Mobile sidebar toggle, closeSidebar, focus trap moved to sidebar.js (CHT-1046)

// Configure router (CHT-782)
configureRouter({
    beforeScrollRestore: appendPendingRows,
    beforeNavigate: () => {
        abandonIssueLoad();
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
        if (parts[0] === 'issues' && parts[1]) {
            // CHT-1182: alias /issues/<id> to canonical /issue/<id> — rewrite
            // the URL only once the issue actually renders, preserving the
            // query string; unknown ids keep the typed URL
            const identifier = parts[1];
            const search = window.location.search;
            Promise.resolve(viewIssueByPath(identifier)).then((ok) => {
                if (ok) history.replaceState({ view: 'issue', identifier }, '', `/issue/${identifier}${search}`);
            });
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
    'approvals': () => {
        loadGateApprovals();
    },
    'inbox': () => {
        loadInbox({ focusFirst: true });
    },
    'issues': () => {
        // Load filters from URL if present
        loadFiltersFromUrl();
        // Replace the previous project/view's rows synchronously, before the
        // async label/sprint filter population below (CHT-1211 item 8):
        // with the rows this view showed last time when the store has them,
        // so Back and switching views paint at once (CHT-1894), else the
        // skeleton. loadIssues() below refreshes them.
        showCachedIssuesOrSkeleton();
        // Initialize filter bar chips and badge
        initFilterBar();
        // The label and sprint options load beside the issues. The issues
        // wait for them only when the address filters by a label or a
        // sprint, or a sprint is already picked: the request is built from
        // those options then. Otherwise the wait was a round trip on every
        // entry to the view, boot included (CHT-1971).
        const urlParams = new URLSearchParams(window.location.search);
        const labelIds = urlParams.getAll('label');
        const excludeLabelIds = urlParams.getAll('exclude_label');
        const urlSprint = urlParams.get('sprint');
        // Checked labels count even with none in the address: Back from
        // Board keeps this view's query string, and the dropdown keeps its
        // checks until populateLabelFilter() rebuilds it (PR #506 review I1).
        const needsOptions = labelIds.length > 0 || excludeLabelIds.length > 0 || !!urlSprint
            || !!document.getElementById('sprint-filter')?.value
            || getSelectedLabels().length > 0 || getExcludedLabels().length > 0;
        if (!needsOptions) loadIssues();
        const labelsReady = populateLabelFilter().then(() => {
            // Re-apply label filter from URL after options are loaded
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
            if (excludeLabelIds.length > 0) {
                const dropdown = document.getElementById('exclude-label-filter-dropdown');
                if (dropdown) {
                    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(cb => {
                        cb.checked = excludeLabelIds.includes(cb.value);
                    });
                    updateExcludeLabelFilterLabel();
                }
            }
        });
        // Update sprint filter based on selected project
        const sprintsReady = updateSprintFilter().then(() => {
            // Re-apply sprint filter from URL after options are loaded
            if (urlSprint) {
                const sprintFilter = document.getElementById('sprint-filter');
                if (sprintFilter) sprintFilter.value = urlSprint;
            }
        });
        // A failed option load still loads the issues (review I2).
        if (needsOptions) {
            Promise.allSettled([labelsReady, sprintsReady]).then(() => loadIssues());
        } else {
            labelsReady.catch((e) => console.error('Failed to populate label filter:', e));
            sprintsReady.catch((e) => console.error('Failed to update sprint filter:', e));
        }
    },
    'query': () => {
        loadQueryView();
    },
    // Entering a view paints what it showed last time, then refreshes
    // (CHT-1973).
    'epics': () => {
        loadEpics({ fromMemory: true });
    },
    'board': () => {
        loadBoard({ fromMemory: true });
    },
    'projects': () => {
        // The team's projects are in memory from boot: paint them at once,
        // then refresh (CHT-1973).
        renderProjects();
        loadProjects().then(renderProjects);
    },
    'sprints': () => {
        loadSprints({ fromMemory: true });
    },
    'rituals': () => {
        loadRitualsView();
    },
    'documents': () => {
        loadDocuments(null, null, { fromMemory: true });
    },
    'team': () => {
        loadTeamMembers();
        loadTeamAgents();
        loadTeamInvitations();
    },
    'settings': () => {
        loadApiKeys();
        loadConnections();
        loadPushDevices();
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
        } else if (wrapper?.querySelector('#exclude-label-filter-dropdown')) {
            btn.addEventListener('click', () => toggleMultiSelect('exclude-label-filter-dropdown'));
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

    // Exclude-label filter clear button
    const excludeLabelDropdown = document.getElementById('exclude-label-filter-dropdown');
    if (excludeLabelDropdown) {
        const clearBtn = excludeLabelDropdown.querySelector('.btn-small');
        if (clearBtn) clearBtn.addEventListener('click', () => clearExcludeLabelFilter());
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

    // Navigation items — use data-view attribute (CHT-1183: real hrefs;
    // let modified clicks fall through to the browser for new-tab behavior)
    document.querySelectorAll('.sidebar-nav .nav-item[data-view]').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
            e.preventDefault();
            navigateTo(item.dataset.view);
            // Leave the sidebar so j/k drive the new view at once (CHT-1959).
            // Only for a pointer click: Enter on a focused link (detail 0)
            // keeps focus in the sidebar for arrow roving (CHT-1289); j/k
            // from there still reach the list through yieldsToSidebar.
            if (e.detail > 0) focusMainContent();
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
    'retry-load-epics': () => loadEpics(),
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

/**
 * Resolve the current user for a stored token and boot into the app, or
 * show the auth screen if there's no token / the token is invalid.
 *
 * CHT-1224: previously ANY getMe() failure — including a transient network
 * blip during page load, not just a real 401 — cleared the stored token and
 * booted the user to the login screen with zero explanation. Only a real
 * auth failure (401/403) should log the user out; a network/5xx failure
 * must retain the token and let the user retry, per api.js's isNetworkError
 * distinction.
 */
async function bootApp() {
    if (!api.getToken()) {
        // An /invite/ link opens on the invitation, not the sign-in form
        // (CHT-1265).
        await showSignedOut();
        return;
    }
    // The teams are asked for beside /auth/me, not after it: the two are
    // independent, and in series they were a round trip of every boot.
    // The routed view's shell shows at once, not the page HTML's
    // Dashboard (CHT-1971).
    primeRoute();
    const teamsRequest = api.getMyTeams();
    teamsRequest.catch(() => {}); // a 401 is reported by /auth/me below
    const meRequest = api.getMe();
    // What this user saw last time (CHT-1972), read while /auth/me and
    // /teams are in flight. With it, the app paints at once and those
    // requests confirm the session and refresh behind the paint.
    const snapshot = await readSnapshot(userIdFromToken(api.getToken()));
    if (snapshot) {
        meRequest.then((user) => {
            setCurrentUser(user);
            updateUserInfo();
        }, async (e) => {
            if (e?.status === 401 || e?.status === 403) {
                // The session ended: drop what was painted from the cache
                // and boot again, signed out.
                api.logout();
                await clearSnapshot();
                window.location.reload();
                return;
            }
            console.error('Failed to confirm the session on boot:', e);
            // What shows is the saved copy; say so (PR #517 review M3).
            showToast('Showing saved data — check your connection and reload', 'error');
        });
        setCurrentUser(snapshot.user);
        await initApp({ teamsRequest, snapshot });
        return;
    }
    try {
        const user = await meRequest;
        setCurrentUser(user);
        await initApp({ teamsRequest });
    } catch (e) {
        if (e?.status === 401 || e?.status === 403) {
            api.logout();
            await showSignedOut();
            return;
        }
        console.error('Failed to load current user on boot:', e);
        showAuthScreen();
        showToast('Failed to load your session — check your connection and retry', 'error');
    }
}

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
    initSelectPickers();
    initIssueLinkHandler();
    initIssueTooltip({ api });
    registerWsHandlers();
    await bootApp();
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


// isAnyDetailViewActive (keyboard.js): detail views hide the list via CSS
// but leave currentView and the list DOM intact, so the list/board/inbox nav
// handlers need an explicit "a detail view is overlaying me" check (CHT-1215).

// List navigation handlers registered BEFORE global shortcuts so
// stopImmediatePropagation can block conflicts (e.g. 'p' = priority, not projects)
document.addEventListener('keydown', createListNavigationHandler({
    getCurrentView,
    getSelectedIndex: getSelectedIssueIndex,
    setSelectedIndex: setSelectedIssueIndex,
    viewIssue,
    showEditIssueModal,
    showInlineDropdown,
    isInlineDropdownOpen,
    isModalOpen,
    isCommandPaletteOpen,
    isDetailViewActive: isAnyDetailViewActive,
    // The list paints its first rows at once and appends the rest in
    // chunks (CHT-1897); a key reads the whole list.
    beforeNavigate: appendPendingRows,
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
    isDetailViewActive: isAnyDetailViewActive,
}));

// j/k/Enter card navigation for the Board (CHT-1215)
document.addEventListener('keydown', createBoardNavigationHandler({
    getCurrentView,
    getSelectedIndex: getSelectedBoardIndex,
    setSelectedIndex: setSelectedBoardIndex,
    viewIssue,
    isModalOpen,
    isCommandPaletteOpen,
    isDetailViewActive: isAnyDetailViewActive,
}));

// j/k/Enter list navigation for the Inbox (CHT-1250)
document.addEventListener('keydown', createInboxNavigationHandler({
    getCurrentView,
    getSelectedIndex: getSelectedInboxIndex,
    setSelectedIndex: setSelectedInboxIndex,
    toggleInboxExpand: toggleInboxEntryElementExpand,
    collapseInboxExpand,
    archiveInboxEntry: archiveInboxEntryElement,
    isInlineDropdownOpen,
    // What the global handler's Escape closes ahead of the list (PR #260
    // review finding 4): the mobile sidebar drawer and the header dropdowns.
    isEscapeLayerAbove: () => document.body.classList.contains('sidebar-open')
        || ['team-dropdown', 'user-dropdown'].some(id => {
            const el = document.getElementById(id);
            return !!el && !el.classList.contains('hidden');
        }),
    isModalOpen,
    isCommandPaletteOpen,
    // CHT-1513: "Open" shows the issue/document detail over the inbox
    // without changing currentView; the handler must go quiet behind it.
    isDetailViewActive: isAnyDetailViewActive,
}));

// ArrowUp/Down/Home/End roving focus through the sidebar nav links (CHT-1289).
// Self-scopes to when a .nav-item is focused, so no view/modal/input guards.
document.addEventListener('keydown', createSidebarNavigationHandler());

// j/k/arrows/Enter/Escape list nav for the Sprints and Epics views (CHT-1291).
// Sprints nav covers the always-visible NOW/NEXT cards (completed sprints live
// behind a <details> disclosure and are intentionally out of the cursor).
document.addEventListener('keydown', createSimpleListNavigationHandler({
    view: 'sprints',
    selector: '#sprints-list .sprint-card',
    open: (el) => { if (el.dataset.sprintId) viewSprint(el.dataset.sprintId); },
    getCurrentView,
    getSelectedIndex: getSelectedSprintIndex,
    setSelectedIndex: setSelectedSprintIndex,
    isModalOpen,
    isCommandPaletteOpen,
    isDetailViewActive: isAnyDetailViewActive,
}));
document.addEventListener('keydown', createSimpleListNavigationHandler({
    view: 'epics',
    selector: '#epics-list .epic-row',
    // navigateToEpicByIdentifier (not viewEpicByPath) so keyboard-Enter matches
    // the row click: saves scroll + pushes /epic/<id> history (CHT-1291 review).
    open: (el) => { if (el.dataset.identifier) navigateToEpicByIdentifier(el.dataset.identifier); },
    getCurrentView,
    getSelectedIndex: getSelectedEpicIndex,
    setSelectedIndex: setSelectedEpicIndex,
    isModalOpen,
    isCommandPaletteOpen,
    isDetailViewActive: isAnyDetailViewActive,
}));
// j/k/arrows/Enter/Escape through Assigned to me on the Dashboard (CHT-1963).
// Enter opens the row the way its title link does, so the detail view's
// prev/next follows this list.
document.addEventListener('keydown', createSimpleListNavigationHandler({
    view: 'my-issues',
    selector: '#my-issues-list .issue-row',
    open: (el) => el.querySelector('.issue-title')?.click(),
    getCurrentView,
    getSelectedIndex: getSelectedMyIssueIndex,
    setSelectedIndex: setSelectedMyIssueIndex,
    isInlineDropdownOpen,
    isModalOpen,
    isCommandPaletteOpen,
    isDetailViewActive: isAnyDetailViewActive,
}));

/**
 * `/` and the palette's Search Issues: show the Issues view and focus its
 * search box in the same tick, so the keys typed right after land in it
 * (CHT-1873). The view swaps without a View Transition, whose deferred
 * callback would leave the box hidden, and so unfocusable, here.
 */
function focusIssueSearch() {
    navigateTo('issues', true, { transition: false });
    document.getElementById('issue-search')?.focus();
}

/** True while a menu Escape should close first is open (CHT-1873). */
function isAnyMenuOpen() {
    const shown = (id) => {
        const el = document.getElementById(id);
        return !!el && !el.classList.contains('hidden');
    };
    return shown('team-dropdown') || shown('user-dropdown')
        || shown('filter-menu-dropdown') || shown('display-menu-dropdown')
        || !!document.querySelector('#issue-detail-view .overflow-menu-dropdown:not(.hidden)')
        || isQuoteTooltipVisible();
}

// Keyboard shortcuts (logic in keyboard.js)
document.addEventListener('keydown', createKeyboardHandler({
    closeModal,
    closeSidebar,
    navigateTo,
    showCreateIssueModal,
    showKeyboardShortcutsHelp,
    isModalOpen,
    focusSearch: focusIssueSearch,
    // CHT-1231: an open field picker is the topmost layer for Escape, and
    // a field in a clean modal closes it instead of just blurring.
    isInlineDropdownOpen,
    closeInlineDropdowns: closeInlineDropdownsFromEscape,
    isModalDirty,
    focusModalField: focusModalFirstField,
    closeDropdowns: () => {
        document.getElementById('team-dropdown').classList.add('hidden');
        document.getElementById('user-dropdown').classList.add('hidden');
        closeAllFilterMenus();
        // The detail overflow menu, opened by click with focus left on its
        // trigger, where its own Escape listener never hears the key.
        const overflow = document.querySelector('#issue-detail-view .overflow-menu-dropdown:not(.hidden)');
        if (overflow) {
            overflow.classList.add('hidden');
            document.querySelector('#issue-detail-view .sidebar-overflow-trigger')?.setAttribute('aria-expanded', 'false');
        }
    },
    // CHT-1215: lets bare 'p'/'c' defer to the issue detail view's own
    // Priority/focus-comment-box actions instead of Projects/Create Issue.
    isDetailViewActive: () => !document.getElementById('issue-detail-view')?.classList.contains('hidden'),
    // CHT-1873: Escape on issue detail goes back, as the Back button does,
    // once no menu is left for it to close.
    isMenuOpen: isAnyMenuOpen,
    leaveDetailView: () => document.querySelector('#issue-detail-view .back-link')?.click(),
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
    { id: 'nav-epics', title: 'Go to Epics', subtitle: 'View all epics', icon: '🎯', shortcut: 'G E', action: () => navigateTo('epics'), category: 'Navigation' },
    { id: 'nav-rituals', title: 'Go to Rituals', subtitle: 'View project rituals', icon: '🔮', shortcut: 'G R', action: () => navigateTo('rituals'), category: 'Navigation' },
    { id: 'nav-approvals', title: 'Go to Approvals', subtitle: 'Review pending approvals', icon: '✅', shortcut: 'G A', action: () => navigateTo('approvals'), category: 'Navigation' },
    { id: 'nav-inbox', title: 'Go to Inbox', subtitle: 'Gates, mentions, assignments, and reviews awaiting you', icon: '📥', shortcut: 'G W', action: () => navigateTo('inbox'), category: 'Navigation' },
    { id: 'nav-team', title: 'Go to Team', subtitle: 'Manage team members', icon: '👥', shortcut: 'G T', action: () => navigateTo('team'), category: 'Navigation' },
    { id: 'nav-settings', title: 'Go to Settings', subtitle: 'Project and team settings', icon: '⚙️', shortcut: 'G ,', action: () => navigateTo('settings'), category: 'Navigation' },

    // Create
    { id: 'create-issue', title: 'Create Issue', subtitle: 'Add a new issue', icon: '➕', shortcut: 'C', action: () => { navigateTo('issues'); setTimeout(showCreateIssueModal, 100); }, category: 'Create' },
    { id: 'create-project', title: 'Create Project', subtitle: 'Start a new project', icon: '📁', action: () => { navigateTo('projects'); setTimeout(showCreateProjectModal, 100); }, category: 'Create' },
    { id: 'create-document', title: 'Create Document', subtitle: 'Write a new document', icon: '📝', action: () => { navigateTo('documents'); setTimeout(showCreateDocumentModal, 100); }, category: 'Create' },
    { id: 'create-team', title: 'Create Team', subtitle: 'Start a new team', icon: '👥', action: () => showCreateTeamModal(), category: 'Create' },

    // Actions
    { id: 'search-issues', title: 'Search Issues', subtitle: 'Find issues by title or ID', icon: '🔍', shortcut: '/', action: focusIssueSearch, category: 'Actions' },
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

