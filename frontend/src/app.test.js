/**
 * Tests for app.js — the main application orchestrator (CHT-1138).
 *
 * app.js runs side effects on import: configureRouter, registerViews,
 * registerActions, setCommandPaletteCommands, and wires up keyboard handlers.
 * We test those registrations by capturing what was passed to the mock functions.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Track what was registered via captured mock call args
let registeredViews = {};
let registeredActions = {};
let routerConfig = {};
let commandPaletteCommands = [];
let domReadyCallback = null;

// Capture DOMContentLoaded handler
const originalAddEventListener = document.addEventListener.bind(document);
vi.spyOn(document, 'addEventListener').mockImplementation((event, handler, options) => {
    if (event === 'DOMContentLoaded') {
        domReadyCallback = handler;
    }
    if (event === 'keydown') {
        originalAddEventListener(event, handler, options);
    }
});

// ─── Mock all imports ──────────────────────────────────────
vi.mock('./api.js', () => ({
    api: {
        getToken: vi.fn().mockReturnValue(null),
        getMe: vi.fn(),
        logout: vi.fn(),
    },
}));
vi.mock('./event-delegation.js', () => ({
    initEventDelegation: vi.fn(),
    registerActions: vi.fn((actions) => { Object.assign(registeredActions, actions); }),
}));
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    isModalOpen: vi.fn().mockReturnValue(false),
    showToast: vi.fn(),
}));
vi.mock('./auth.js', () => ({
    showAuthScreen: vi.fn(),
    logout: vi.fn(),
    initAuth: vi.fn(),
}));
vi.mock('./init.js', () => ({ initApp: vi.fn() }));
vi.mock('./documents.js', () => ({
    loadDocuments: vi.fn(),
    viewDocument: vi.fn(),
    showCreateDocumentModal: vi.fn(),
    showEditDocumentModal: vi.fn(),
    setDocViewMode: vi.fn(),
    enterSelectionMode: vi.fn(),
    filterDocuments: vi.fn(),
    debounceDocSearch: vi.fn(),
}));
vi.mock('./agents.js', () => ({
    loadAgents: vi.fn(),
    showCreateAgentModal: vi.fn(),
}));
vi.mock('./issue-creation.js', () => ({ showCreateIssueModal: vi.fn() }));
vi.mock('./issue-edit.js', () => ({ showEditIssueModal: vi.fn() }));
vi.mock('./issues-view.js', () => ({
    toggleMultiSelect: vi.fn(),
    updateStatusFilter: vi.fn(),
    clearStatusFilter: vi.fn(),
    updatePriorityFilter: vi.fn(),
    clearPriorityFilter: vi.fn(),
    clearLabelFilter: vi.fn(),
    updateLabelFilterLabel: vi.fn(),
    populateLabelFilter: vi.fn().mockResolvedValue(),
    loadFiltersFromUrl: vi.fn(),
    toggleFilterMenu: vi.fn(),
    toggleDisplayMenu: vi.fn(),
    initFilterBar: vi.fn(),
    updateSprintFilter: vi.fn().mockResolvedValue(),
    loadIssues: vi.fn(),
    debounceSearch: vi.fn(),
    filterIssues: vi.fn(),
    updateGroupBy: vi.fn(),
}));
vi.mock('./gate-approvals.js', () => ({ loadGateApprovals: vi.fn() }));
vi.mock('./epics.js', () => ({ showCreateEpicModal: vi.fn(), loadEpics: vi.fn() }));
vi.mock('./epic-detail-view.js', () => ({ viewEpicByPath: vi.fn(), viewEpic: vi.fn() }));
vi.mock('./keyboard.js', () => ({
    createKeyboardHandler: vi.fn().mockReturnValue(vi.fn()),
    createModifierKeyHandler: vi.fn().mockReturnValue(vi.fn()),
    createListNavigationHandler: vi.fn().mockReturnValue(vi.fn()),
    createDocListNavigationHandler: vi.fn().mockReturnValue(vi.fn()),
    updateKeyboardSelection: vi.fn(),
}));
vi.mock('./teams.js', () => ({
    toggleTeamDropdown: vi.fn(),
    toggleUserDropdown: vi.fn(),
    loadTeamMembers: vi.fn(),
    loadTeamInvitations: vi.fn(),
    showInviteModal: vi.fn(),
    showCreateTeamModal: vi.fn(),
    showEditTeamModal: vi.fn(),
    loadTeamAgents: vi.fn(),
}));
vi.mock('./projects.js', () => ({
    getProjects: vi.fn().mockReturnValue([]),
    loadProjects: vi.fn().mockResolvedValue(),
    renderProjects: vi.fn(),
    viewProjectSettings: vi.fn(),
    clearProjectSettingsState: vi.fn(),
    showCreateProjectModal: vi.fn(),
    switchProjectSettingsTab: vi.fn(),
    saveProjectSettingsGeneral: vi.fn(),
    saveProjectSettingsRules: vi.fn(),
    showCreateProjectRitualModal: vi.fn(),
    setOnRitualsChanged: vi.fn(),
}));
vi.mock('./url-helpers.js', () => ({ getProjectFromUrl: vi.fn() }));
vi.mock('./onboarding.js', () => ({ resetOnboarding: vi.fn() }));
vi.mock('./sprints.js', () => ({
    loadSprints: vi.fn(),
    viewSprint: vi.fn(),
    viewSprintByPath: vi.fn(),
}));
vi.mock('./rituals-view.js', () => ({
    loadRitualsView: vi.fn(),
    switchRitualsTab: vi.fn(),
}));
vi.mock('./api-keys.js', () => ({
    loadApiKeys: vi.fn(),
    showCreateApiKeyModal: vi.fn(),
}));
vi.mock('./command-palette.js', () => ({
    setCommands: vi.fn((cmds) => { commandPaletteCommands = cmds; }),
    open: vi.fn(),
    close: vi.fn(),
    isOpen: vi.fn().mockReturnValue(false),
}));
vi.mock('./dashboard.js', () => ({
    loadMyIssues: vi.fn(),
    loadDashboardActivity: vi.fn(),
    loadSprintStatus: vi.fn(),
    filterMyIssues: vi.fn(),
}));
vi.mock('./board.js', () => ({ loadBoard: vi.fn() }));
vi.mock('./issue-detail-view.js', () => ({
    viewIssueByPath: vi.fn(),
    viewIssue: vi.fn(),
}));
vi.mock('./state.js', () => ({
    getCurrentView: vi.fn(),
    getSelectedIssueIndex: vi.fn(),
    setSelectedIssueIndex: vi.fn(),
    getSelectedDocIndex: vi.fn(),
    setSelectedDocIndex: vi.fn(),
    setCurrentUser: vi.fn(),
    setCurrentProject: vi.fn(),
    setCurrentDetailIssue: vi.fn(),
    setCurrentDetailSprints: vi.fn(),
}));
vi.mock('./issue-tooltip.js', () => ({
    initIssueTooltip: vi.fn(),
    hideTooltip: vi.fn(),
}));
vi.mock('./router.js', () => ({
    navigateTo: vi.fn(),
    navigateToIssueByIdentifier: vi.fn(),
    configureRouter: vi.fn((cfg) => { routerConfig = cfg; }),
    registerViews: vi.fn((views) => { registeredViews = views; }),
    initRouter: vi.fn(),
}));
vi.mock('./ws-handlers.js', () => ({ registerWsHandlers: vi.fn() }));
vi.mock('./sidebar.js', () => ({ toggleSidebar: vi.fn(), closeSidebar: vi.fn() }));
vi.mock('./quick-create.js', () => ({ handleQuickCreate: vi.fn() }));
vi.mock('./storage.js', () => ({
    getTheme: vi.fn().mockReturnValue('dark'),
    setTheme: vi.fn(),
}));
vi.mock('./issue-list.js', () => ({ renderIssueRow: vi.fn() }));
vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn(s => s),
    escapeAttr: vi.fn(s => s),
    formatTimeAgo: vi.fn(),
    formatStatus: vi.fn(),
}));

// Import mocked modules so we can assert on them
import { loadMyIssues, loadDashboardActivity, loadSprintStatus } from './dashboard.js';
import { initFilterBar, loadIssues, loadFiltersFromUrl } from './issues-view.js';
import { loadTeamMembers, loadTeamAgents, loadTeamInvitations } from './teams.js';
import { loadApiKeys } from './api-keys.js';
import { loadAgents } from './agents.js';
import { viewIssueByPath, viewIssue } from './issue-detail-view.js';
import { viewEpicByPath, viewEpic } from './epic-detail-view.js';
import { viewDocument } from './documents.js';
import { viewSprintByPath, viewSprint } from './sprints.js';
import { viewProjectSettings, clearProjectSettingsState, setOnRitualsChanged } from './projects.js';
import { setCurrentUser, setCurrentDetailIssue, setCurrentDetailSprints, setCurrentProject } from './state.js';
import { loadGateApprovals } from './gate-approvals.js';
import { loadEpics } from './epics.js';
import { loadBoard } from './board.js';
import { loadSprints } from './sprints.js';
import { loadRitualsView } from './rituals-view.js';
import { loadDocuments } from './documents.js';
import { initApp } from './init.js';
import { initIssueTooltip } from './issue-tooltip.js';
import { closeSidebar } from './sidebar.js';
import { hideTooltip } from './issue-tooltip.js';
import { navigateTo } from './router.js';
import { createKeyboardHandler, createModifierKeyHandler, createListNavigationHandler, createDocListNavigationHandler } from './keyboard.js';
import { initEventDelegation } from './event-delegation.js';
import { initAuth } from './auth.js';
import { showAuthScreen } from './auth.js';
import { initRouter } from './router.js';
import { registerWsHandlers } from './ws-handlers.js';
import { api } from './api.js';

// Import app.js — side effects run on import
await import('./app.js');

// Capture import-time call args before clearing mocks
const keyboardHandlerConfig = createKeyboardHandler.mock.calls[0]?.[0];
const modifierHandlerConfig = createModifierKeyHandler.mock.calls[0]?.[0];
const listNavCallCount = createListNavigationHandler.mock.calls.length;
const docListNavCallCount = createDocListNavigationHandler.mock.calls.length;

// Clear mock call counts after import-time side effects so each test
// starts fresh and assertions aren't cumulative.
beforeEach(() => {
    vi.clearAllMocks();
});

describe('app.js view registrations', () => {
    it('registers all expected views', () => {
        const expectedViews = [
            'my-issues', 'gate-approvals', 'issues', 'epics', 'board',
            'projects', 'sprints', 'rituals', 'documents', 'team', 'settings',
        ];
        for (const view of expectedViews) {
            expect(registeredViews[view], `missing view: ${view}`).toBeDefined();
            expect(typeof registeredViews[view]).toBe('function');
        }
    });

    it('my-issues view loads sprint status, issues, and activity', () => {
        registeredViews['my-issues']();
        expect(loadSprintStatus).toHaveBeenCalled();
        expect(loadMyIssues).toHaveBeenCalled();
        expect(loadDashboardActivity).toHaveBeenCalled();
    });

    it('issues view initializes filter bar and loads issues', async () => {
        registeredViews['issues']();
        expect(loadFiltersFromUrl).toHaveBeenCalled();
        expect(initFilterBar).toHaveBeenCalled();
        await vi.waitFor(() => expect(loadIssues).toHaveBeenCalled());
    });

    it('team view loads members, agents, and invitations', () => {
        registeredViews['team']();
        expect(loadTeamMembers).toHaveBeenCalled();
        expect(loadTeamAgents).toHaveBeenCalled();
        expect(loadTeamInvitations).toHaveBeenCalled();
    });

    it('settings view loads API keys and agents', () => {
        registeredViews['settings']();
        expect(loadApiKeys).toHaveBeenCalled();
        expect(loadAgents).toHaveBeenCalled();
    });

    it('gate-approvals view loads approvals', () => {
        registeredViews['gate-approvals']();
        expect(loadGateApprovals).toHaveBeenCalled();
    });

    it('epics view loads epics', () => {
        registeredViews['epics']();
        expect(loadEpics).toHaveBeenCalled();
    });

    it('board view loads board', () => {
        registeredViews['board']();
        expect(loadBoard).toHaveBeenCalled();
    });

    it('sprints view loads sprints', () => {
        registeredViews['sprints']();
        expect(loadSprints).toHaveBeenCalled();
    });

    it('rituals view loads rituals', () => {
        registeredViews['rituals']();
        expect(loadRitualsView).toHaveBeenCalled();
    });

    it('documents view loads documents', () => {
        registeredViews['documents']();
        expect(loadDocuments).toHaveBeenCalled();
    });
});

describe('app.js router configuration', () => {
    it('configures detailRoute for issue paths', () => {
        const result = routerConfig.detailRoute(['issue', 'CHT-123']);
        expect(result).toBe(true);
        expect(viewIssueByPath).toHaveBeenCalledWith('CHT-123');
    });

    it('configures detailRoute for epic paths', () => {
        const result = routerConfig.detailRoute(['epic', 'epic-1']);
        expect(result).toBe(true);
        expect(viewEpicByPath).toHaveBeenCalledWith('epic-1');
    });

    it('configures detailRoute for sprint paths', () => {
        const result = routerConfig.detailRoute(['sprint', 'sprint-1']);
        expect(result).toBe(true);
        expect(viewSprintByPath).toHaveBeenCalledWith('sprint-1');
    });

    it('configures detailRoute for document paths', () => {
        // viewDocumentByPath is internal to app.js; it calls viewDocument
        const result = routerConfig.detailRoute(['document', 'doc-1']);
        expect(result).toBe(true);
        expect(viewDocument).toHaveBeenCalledWith('doc-1', false);
    });

    it('configures detailRoute for project settings paths', () => {
        const result = routerConfig.detailRoute(['projects', 'proj-1', 'settings']);
        expect(result).toBe(true);
        expect(viewProjectSettings).toHaveBeenCalledWith('proj-1');
    });

    it('detailRoute returns false for unknown paths', () => {
        const result = routerConfig.detailRoute(['unknown', '123']);
        expect(result).toBe(false);
    });

    it('configures detailPopstate for issue state', () => {
        const result = routerConfig.detailPopstate({ issueId: 'issue-1' });
        expect(result).toBe(true);
        expect(viewIssue).toHaveBeenCalledWith('issue-1', false);
    });

    it('configures detailPopstate for identifier state', () => {
        const result = routerConfig.detailPopstate({ identifier: 'CHT-456' });
        expect(result).toBe(true);
        expect(viewIssueByPath).toHaveBeenCalledWith('CHT-456');
    });

    it('configures detailPopstate for epic state', () => {
        const result = routerConfig.detailPopstate({ epicId: 'epic-1' });
        expect(result).toBe(true);
        expect(viewEpic).toHaveBeenCalledWith('epic-1', false);
    });

    it('configures detailPopstate for document state', () => {
        const result = routerConfig.detailPopstate({ documentId: 'doc-1' });
        expect(result).toBe(true);
        expect(viewDocument).toHaveBeenCalledWith('doc-1', false);
    });

    it('configures detailPopstate for sprint state', () => {
        const result = routerConfig.detailPopstate({ sprintId: 'sprint-1' });
        expect(result).toBe(true);
        expect(viewSprint).toHaveBeenCalledWith('sprint-1', false);
    });

    it('beforeNavigate clears detail state and closes sidebar', () => {
        routerConfig.beforeNavigate();
        expect(clearProjectSettingsState).toHaveBeenCalled();
        expect(setOnRitualsChanged).toHaveBeenCalledWith(null);
        expect(setCurrentDetailIssue).toHaveBeenCalledWith(null);
        expect(setCurrentDetailSprints).toHaveBeenCalledWith(null);
        expect(closeSidebar).toHaveBeenCalled();
        expect(hideTooltip).toHaveBeenCalled();
    });
});

describe('app.js action registrations', () => {
    it('registers all expected actions', () => {
        const expectedActions = [
            'navigate-to', 'set-current-project',
            'showCreateIssueModal', 'showCreateEpicModal', 'showCreateProjectModal',
            'showCreateDocumentModal', 'showCreateTeamModal', 'showEditTeamModal',
            'showInviteModal', 'showCreateApiKeyModal', 'showCreateAgentModal',
            'resetOnboarding', 'logout', 'navigateToProjects',
        ];
        for (const action of expectedActions) {
            expect(registeredActions[action], `missing action: ${action}`).toBeDefined();
        }
    });

    it('navigate-to action calls navigateTo with view', () => {
        registeredActions['navigate-to']({}, { view: 'issues' });
        expect(navigateTo).toHaveBeenCalledWith('issues');
    });

    it('set-current-project action reads target value', () => {
        registeredActions['set-current-project']({}, {}, { value: 'proj-123' });
        expect(setCurrentProject).toHaveBeenCalledWith('proj-123');
    });
});

describe('app.js command palette registration', () => {
    it('registers navigation commands', () => {
        const navCommands = commandPaletteCommands.filter(c => c.category === 'Navigation');
        expect(navCommands.length).toBeGreaterThanOrEqual(7);
        expect(navCommands.map(c => c.id)).toContain('nav-issues');
        expect(navCommands.map(c => c.id)).toContain('nav-my-issues');
    });

    it('registers create commands', () => {
        const createCommands = commandPaletteCommands.filter(c => c.category === 'Create');
        expect(createCommands.length).toBeGreaterThanOrEqual(3);
        expect(createCommands.map(c => c.id)).toContain('create-issue');
    });

    it('registers keyboard shortcuts help command', () => {
        const help = commandPaletteCommands.find(c => c.id === 'show-shortcuts');
        expect(help).toBeDefined();
        expect(help.shortcut).toBe('?');
    });

    it('every command has an action function', () => {
        for (const cmd of commandPaletteCommands) {
            expect(typeof cmd.action, `command ${cmd.id} missing action`).toBe('function');
        }
    });
});

describe('app.js keyboard handler wiring', () => {
    it('creates keyboard handler with correct action callbacks', () => {
        expect(keyboardHandlerConfig).toBeDefined();
        expect(keyboardHandlerConfig).toHaveProperty('closeModal');
        expect(keyboardHandlerConfig).toHaveProperty('navigateTo');
        expect(keyboardHandlerConfig).toHaveProperty('showCreateIssueModal');
        expect(keyboardHandlerConfig).toHaveProperty('isModalOpen');
        expect(keyboardHandlerConfig).toHaveProperty('focusSearch');
        expect(keyboardHandlerConfig).toHaveProperty('closeDropdowns');
    });

    it('creates modifier key handler', () => {
        expect(modifierHandlerConfig).toBeDefined();
        expect(modifierHandlerConfig).toHaveProperty('isModalOpen');
        expect(modifierHandlerConfig).toHaveProperty('isCommandPaletteOpen');
    });

    it('creates list navigation handlers for issues and documents', () => {
        expect(listNavCallCount).toBe(1);
        expect(docListNavCallCount).toBe(1);
    });
});

describe('app.js DOMContentLoaded initialization', () => {
    it('registers a DOMContentLoaded handler', () => {
        expect(domReadyCallback).toBeDefined();
        expect(typeof domReadyCallback).toBe('function');
    });

    it('init sequence calls core initialization functions', async () => {
        api.getToken.mockReturnValue(null);
        await domReadyCallback();
        expect(initEventDelegation).toHaveBeenCalled();
        expect(initAuth).toHaveBeenCalled();
        expect(initRouter).toHaveBeenCalled();
        expect(registerWsHandlers).toHaveBeenCalled();
        expect(initIssueTooltip).toHaveBeenCalled();
    });

    it('shows auth screen when no token', async () => {
        api.getToken.mockReturnValue(null);
        await domReadyCallback();
        expect(showAuthScreen).toHaveBeenCalled();
        expect(initApp).not.toHaveBeenCalled();
    });

    it('loads user and calls initApp when token present', async () => {
        const fakeUser = { id: 'user-1', name: 'Alice' };
        api.getToken.mockReturnValue('valid-token');
        api.getMe.mockResolvedValue(fakeUser);
        await domReadyCallback();
        expect(api.getMe).toHaveBeenCalled();
        expect(setCurrentUser).toHaveBeenCalledWith(fakeUser);
        expect(initApp).toHaveBeenCalled();
        expect(showAuthScreen).not.toHaveBeenCalled();
    });

    it('falls back to auth screen when getMe fails', async () => {
        api.getToken.mockReturnValue('expired-token');
        api.getMe.mockRejectedValue(new Error('Unauthorized'));
        await domReadyCallback();
        expect(api.logout).toHaveBeenCalled();
        expect(showAuthScreen).toHaveBeenCalled();
    });
});
