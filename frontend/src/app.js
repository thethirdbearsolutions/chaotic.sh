/**
 * Chaotic - Main Application
 */

/* global api -- provided via window by main.js entry point */
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import { showModal, closeModal, isModalOpen, showToast, closeAllDropdowns, setDropdownKeyHandler, registerDropdownClickOutside } from './ui.js';
import { updateUserInfo, showAuthScreen, showMainScreen, handleLogin, handleSignup, showLogin, showSignup, logout } from './auth.js';
import { loadDocuments, viewDocument, showCreateDocumentModal } from './documents.js';
import { getAgents, loadAgents, showCreateAgentModal } from './agents.js';
import { buildAssignees, getAssigneeById, formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList, updateAssigneeFilter } from './assignees.js';
import {
    setDependencies as setIssueCreationDependencies,
    showCreateIssueModal,
    toggleCreateIssueOptions,
    applyIssueTemplate,
    showCreateSubIssueModal,
    handleCreateSubIssue,
    toggleCreateIssueDropdown,
    updateCreateIssueProject,
    setCreateIssueField,
    handleCreateIssueNew,
    handleCreateIssueAndNew,
} from './issue-creation.js';
import {
    setDependencies as setIssueEditDependencies,
    showEditIssueModal,
    handleUpdateIssue,
    deleteIssue,
} from './issue-edit.js';
import { formatTimeAgo, escapeJsString, formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor, formatIssueType, renderAvatar } from './utils.js';
import {
    toggleMultiSelect,
    updateStatusFilter,
    clearStatusFilter,
    updatePriorityFilter,
    clearPriorityFilter,
    updateLabelFilter,
    clearLabelFilter,
    updateLabelFilterLabel,
    populateLabelFilter,
    loadFiltersFromUrl,
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
import { completeGateFromList, approveReviewFromList } from './gate-approvals.js';
import { updateEpicsProjectFilter, onEpicsProjectChange, showCreateEpicModal } from './epics.js';
import {
    setDependencies as setEpicDetailViewDependencies,
    viewEpicByPath,
    viewEpic,
} from './epic-detail-view.js';
import { createKeyboardHandler, createModifierKeyHandler, createListNavigationHandler } from './keyboard.js';
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
    toggleRitualConditions,
} from './projects.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';
import { showOnboarding, hasCompletedOnboarding, resetOnboarding } from './onboarding.js';
import {
    getSprintCache,
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
    updateSprintCacheForProject,
} from './sprints.js';
import {
    updateRitualProjectFilter,
    loadRitualsView,
    onRitualsProjectChange,
    switchRitualsTab,
    approveRitual,
    completeGateRitual,
    renderTicketRitualActions,
    showAttestTicketRitualModal,
    attestTicketRitual,
    approveTicketRitual,
    showCompleteTicketRitualModal,
} from './rituals-view.js';
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
    filterMyIssues,
} from './dashboard.js';
import {
    setDependencies as setBoardDependencies,
    updateBoardProjectFilter,
    onBoardProjectChange,
    loadBoard,
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
    handleLabelCreateKey,
    handleCreateIssueLabelKey,
} from './inline-dropdown.js';
import {
    setDependencies as setIssueDetailViewDependencies,
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    toggleSection,
    toggleTicketRituals,
    viewIssueByPath,
    viewIssue,
    handleAddComment,
    editDescription,
    setDescriptionEditorMode,
    showAddRelationModal,
    searchIssuesToRelate,
    selectIssueForRelation,
    clearSelectedRelation,
    handleAddRelation,
    deleteRelation,
} from './issue-detail-view.js';
import {
    getCurrentView,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getPendingGates,
    setPendingGates,
    getIssues,
    setIssues,
    getCurrentUser,
    setCurrentUser,
} from './state.js';
import { initIssueTooltip, hideTooltip } from './issue-tooltip.js';
import {
    navigateTo,
    handleRoute,
    navigateToIssueByIdentifier,
    configureRouter,
    registerViews,
    initRouter,
} from './router.js';
import { connectWebSocket } from './ws.js';

window.currentTeam = null;
let labels = [];

// Mobile sidebar toggle (CHT-869)
function updateSidebarAria() {
    const btn = document.getElementById('hamburger-btn');
    if (btn) btn.setAttribute('aria-expanded', String(document.body.classList.contains('sidebar-open')));
}

function toggleSidebar() {
    const wasOpen = document.body.classList.contains('sidebar-open');
    document.body.classList.toggle('sidebar-open');
    updateSidebarAria();
    if (wasOpen) {
        // Closing: return focus to hamburger button
        const btn = document.getElementById('hamburger-btn');
        if (btn) btn.focus();
    } else {
        // Opening: focus first focusable element in sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const firstFocusable = sidebar.querySelector(FOCUSABLE_SELECTOR);
            if (firstFocusable) firstFocusable.focus();
        }
    }
}

function closeSidebar() {
    const wasOpen = document.body.classList.contains('sidebar-open');
    document.body.classList.remove('sidebar-open');
    updateSidebarAria();
    if (wasOpen) {
        const btn = document.getElementById('hamburger-btn');
        if (btn) btn.focus();
    }
}

// Shared focusable-element selector for sidebar focus trap (CHT-883)
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Focus trap for mobile sidebar (CHT-883)
// Escape is handled by keyboard.js which already calls closeSidebar()
document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('sidebar-open')) return;
    if (e.key !== 'Tab') return;

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const focusable = sidebar.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // If focus is outside the sidebar, redirect into it
    if (!sidebar.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
    }

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
});

// Clean up sidebar-open class when resizing past mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
    }
});

// Markdown rendering helper with XSS protection
function renderMarkdown(content) {
    if (!content) return '';
    try {
        marked.setOptions({ breaks: true, gfm: true });
        const rawHtml = marked.parse(content);
        // Escape raw-text HTML elements (title, style, textarea, xmp) whose
        // content gets silently destroyed by DOMPurify since it treats their
        // children as raw text, not DOM nodes (CHT-829)
        const safeHtml = rawHtml.replace(/<(\/?)(?:title|style|textarea|xmp)\b[^>]*>/gi,
            (match) => match.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        return DOMPurify.sanitize(safeHtml, { FORCE_BODY: true });
    } catch (e) {
        console.error('Markdown parsing error:', e);
        return content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
    }
}

// Configure router (CHT-782)
configureRouter({
    beforeNavigate: () => {
        clearProjectSettingsState();
        window._onRitualsChanged = null;
        window.currentDetailIssue = null;
        window.currentDetailSprints = null;
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
            setGlobalProjectSelection(urlProject);
        }
    },
    issueNavigate: (identifier) => viewIssueByPath(identifier),
    epicNavigate: (identifier) => viewEpicByPath(identifier),
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
    'epics': () => {
        updateEpicsProjectFilter();
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
window.viewEpic = viewEpic;
window.viewEpicByPath = viewEpicByPath;
window.toggleTicketRituals = toggleTicketRituals;
window.toggleSection = toggleSection;

// Export functions called via window from other modules (agents.js, teams.js)
window.connectWebSocket = connectWebSocket;
window.buildAssignees = () => buildAssignees(getMembers, getAgents);
window.updateAssigneeFilter = updateAssigneeFilter;
window.loadLabels = loadLabels;
window.resetOnboarding = resetOnboarding;

window.viewDocument = viewDocument;

// viewDocumentByPath helper (used by router detail route config)
async function viewDocumentByPath(docId) {
    try {
        await viewDocument(docId, false);
    } catch {
        navigateTo('documents', false);
    }
}

// Sprint limbo rituals shown in the approvals view (CHT-905)
let sprintLimboApprovals = [];

async function loadGateApprovals() {
    if (!window.currentTeam) return;

    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading pending approvals...</div>';

    try {
        // Load from all projects in parallel
        const results = await Promise.all(getProjects().map(async project => {
            const [approvals, limbo] = await Promise.all([
                api.getPendingApprovals(project.id),
                api.getLimboStatus(project.id),
            ]);
            return { project, approvals, limbo };
        }));

        const allApprovals = [];
        const allLimbo = [];
        for (const { project, approvals, limbo } of results) {
            allApprovals.push(...approvals);
            if (limbo && limbo.in_limbo) {
                // Collect pending sprint rituals that need human action:
                // gate-mode rituals awaiting completion, or attested rituals awaiting approval
                const actionable = (limbo.pending_rituals || []).filter(r => {
                    if (r.attestation?.approved_at) return false;
                    return r.approval_mode === 'gate' || !!r.attestation;
                });
                if (actionable.length > 0) {
                    allLimbo.push({ project, rituals: actionable });
                }
            }
        }
        setPendingGates(allApprovals);
        sprintLimboApprovals = allLimbo;
        renderGateApprovals();
    } catch (e) {
        container.innerHTML = `<div class="empty-state"><h3>Error loading approvals</h3><p>${escapeHtml(e.message)}</p></div>`;
    }
}

function renderGateApprovals() {
    const container = document.getElementById('gate-approvals-list');
    if (!container) return;

    const pendingItems = getPendingGates();
    const hasSprintLimbo = sprintLimboApprovals.length > 0;

    // First-use explainer (CHT-766) — shown once, dismissed via localStorage
    const explainerKey = 'chaotic_approvals_explainer_dismissed';
    const showExplainer = !localStorage.getItem(explainerKey);

    if (pendingItems.length === 0 && !hasSprintLimbo) {
        if (showExplainer) {
            container.innerHTML = `
                <div class="empty-state approvals-explainer">
                    <h3>Welcome to Approvals</h3>
                    <p>This is where you'll review and approve ritual attestations from your team.</p>
                    <div class="explainer-details">
                        <p><strong>What are rituals?</strong> Rituals are configurable checks that run when sprints close, tickets are claimed, or tickets are closed. They ensure your team follows processes like running tests, updating docs, or getting code reviewed.</p>
                        <p><strong>How approvals work:</strong></p>
                        <ul>
                            <li><strong>Gate</strong> rituals require a human to complete them directly — agents cannot attest.</li>
                            <li><strong>Review</strong> rituals are attested by agents but need human approval before they count.</li>
                            <li><strong>Auto</strong> rituals are cleared immediately by agents (they won't appear here).</li>
                        </ul>
                        <p>To set up rituals, go to a project's settings and configure them under the ritual tabs.</p>
                    </div>
                    <button class="btn btn-secondary" onclick="dismissApprovalsExplainer()">Got it!</button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No pending approvals</h3>
                    <p>All rituals have been completed. Nice work!</p>
                </div>
            `;
        }
        return;
    }

    let html = '';

    // Sprint limbo section (CHT-905)
    if (hasSprintLimbo) {
        html += `
            <div class="gate-section">
                <h3 class="gate-section-title">Sprint Rituals</h3>
                <p class="gate-section-desc">Sprint is in limbo — complete these rituals to activate the next sprint</p>
                <div class="gate-list">
                    ${sprintLimboApprovals.map(({ project, rituals }) => `
                        <div class="gate-issue-card">
                            <div class="gate-issue-header">
                                <span class="gate-issue-id">${escapeHtml(project.name)}</span>
                                <span class="badge badge-in_progress">in limbo</span>
                            </div>
                            <div class="gate-rituals">
                                ${rituals.map(r => {
                                    const hasAttestation = r.attestation && !r.attestation.approved_at;
                                    const statusIcon = hasAttestation ? '⏳' : '○';
                                    const statusText = hasAttestation
                                        ? `<span class="gate-waiting-info">Attested by <strong>${escapeHtml(r.attestation.attested_by_name || 'Unknown')}</strong></span>`
                                        : (r.approval_mode === 'gate'
                                            ? ''
                                            : '<span class="text-muted">Awaiting agent attestation</span>');
                                    const actionBtn = hasAttestation
                                        ? `<button class="btn btn-small btn-primary sprint-approve-btn"
                                            data-ritual-id="${escapeAttr(r.id)}"
                                            data-project-id="${escapeAttr(project.id)}">Approve</button>`
                                        : (r.approval_mode === 'gate'
                                            ? `<button class="btn btn-small btn-primary sprint-complete-btn"
                                                data-ritual-id="${escapeAttr(r.id)}"
                                                data-project-id="${escapeAttr(project.id)}"
                                                data-ritual-name="${escapeAttr(r.name)}">Complete</button>`
                                            : '');

                                    return `
                                        <div class="gate-ritual">
                                            <div class="gate-ritual-info">
                                                <span class="gate-ritual-name">${statusIcon} ${escapeHtml(r.name)}
                                                    <span class="badge badge-ritual-${escapeAttr(r.approval_mode)}">${escapeHtml(r.approval_mode)}</span>
                                                </span>
                                                <span class="gate-ritual-prompt">${escapeHtml(r.prompt)}</span>
                                                ${statusText}
                                            </div>
                                            ${actionBtn}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
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

    // Attach click handlers for sprint ritual buttons (CHT-905)
    container.querySelectorAll('.sprint-approve-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            btn.disabled = true;
            try {
                await api.approveAttestation(btn.dataset.ritualId, btn.dataset.projectId);
                showToast('Sprint ritual approved!', 'success');
                await loadGateApprovals();
            } catch (e) {
                btn.disabled = false;
                showToast(e.message, 'error');
            }
        });
    });
    container.querySelectorAll('.sprint-complete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            completeGateRitual(btn.dataset.ritualId, btn.dataset.projectId, btn.dataset.ritualName);
        });
    });
}

/**
 * Dismiss the approvals first-use explainer (CHT-766).
 */
function dismissApprovalsExplainer() {
    localStorage.setItem('chaotic_approvals_explainer_dismissed', '1');
    renderGateApprovals();
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
            ? `<div class="gate-attestation-note">${renderMarkdown(r.attestation_note)}</div>`
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


// Labels
async function loadLabels() {
    if (!window.currentTeam) return;
    try {
        labels = await api.getLabels(window.currentTeam.id);
    } catch (e) {
        console.error('Failed to load labels:', e);
    }
}

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
// ISSUE CREATION (logic in issue-creation.js)
// ============================================

setIssueCreationDependencies({
    api,
    getProjects,
    getEstimateOptions,
    getCurrentView,
    showModal,
    closeModal,
    showToast,
    viewIssue,
    loadIssues,
    loadMyIssues,
    closeAllDropdowns,
    registerDropdownClickOutside,
    getLabels: () => labels,
    setLabels: (newLabels) => { labels = newLabels; },
    getCurrentTeam: () => window.currentTeam,
    getStatusIcon,
    getPriorityIcon,
    formatStatus,
    formatPriority,
    formatIssueType,
    formatAssigneeName,
    formatAssigneeOptionLabel,
    getAssigneeOptionList,
    renderAvatar,
    escapeHtml,
    escapeAttr,
    escapeJsString,
});

// ============================================
// ISSUE EDIT (logic in issue-edit.js)
// ============================================

setIssueEditDependencies({
    api,
    showModal,
    closeModal,
    showToast,
    viewIssue,
    navigateTo,
    loadIssues,
    loadProjects,
    getEstimateOptions,
    escapeHtml,
    escapeAttr,
    escapeJsString,
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
    getIssues,
});

// ============================================
// EPIC DETAIL VIEW (logic in epic-detail-view.js)
// ============================================

setEpicDetailViewDependencies({
    api,
    getCurrentView,
    showToast,
    navigateTo,
    getProjects,
    getAssigneeById,
    formatAssigneeName,
    formatStatus,
    formatPriority,
    formatEstimate,
    formatTimeAgo,
    getStatusIcon,
    getPriorityIcon,
    escapeHtml,
    escapeAttr,
    escapeJsString,
    sanitizeColor,
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

// Cmd+Enter (submit forms/modals) and Cmd+K (command palette) - logic in keyboard.js
document.addEventListener('keydown', createModifierKeyHandler({
    isModalOpen,
    getModalForm: () => document.querySelector('#modal-content form'),
    getModalPrimaryBtn: () => document.querySelector('#modal-content .btn-primary'),
    isCommandPaletteOpen,
    openCommandPalette,
    closeCommandPalette,
}));

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
        showToast(`Failed to create issue: ${e.message}`, 'error');
    } finally {
        input.disabled = false;
        input.placeholder = originalPlaceholder;
        input.focus();
    }
}

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
    toggleSidebar,
    closeSidebar,

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
    setDescriptionEditorMode,
    updateIssueField,
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
    updateLabelFilter,
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

    // Epics
    onEpicsProjectChange,
    showCreateEpicModal,

    // Approvals
    dismissApprovalsExplainer,
    loadGateApprovals,

    // Rituals top-level view
    loadRitualsView,
    onRitualsProjectChange,
    switchRitualsTab,
    toggleRitualConditions,

    // Rituals (pending rituals approval)
    approveRitual,
    completeGateRitual,
    // completeGateFromList moved to gate-approvals.js

    // Ticket rituals
    toggleSection,
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
    toggleCreateIssueOptions,
    applyIssueTemplate,
    updateCreateIssueProject,

    // Inline dropdown key handlers (CHT-717)
    handleLabelCreateKey,
    handleCreateIssueLabelKey,
});
