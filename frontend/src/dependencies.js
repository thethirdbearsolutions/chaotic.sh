/**
 * Module dependency initialization (CHT-1043)
 *
 * Centralizes all setDependencies() calls that were cluttering app.js.
 * Each extracted module uses a DI pattern; this wires them all up.
 */

/* global api */
import { showModal, closeModal, showToast, closeAllDropdowns, setDropdownKeyHandler, registerDropdownClickOutside } from './ui.js';
import { getAssigneeById, formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList } from './assignees.js';
import { formatTimeAgo, escapeJsString, formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor, formatIssueType, renderAvatar } from './utils.js';
import { getProjects, loadProjects, setGlobalProjectSelection, getEstimateOptions, formatEstimate } from './projects.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';
import { getMembers } from './teams.js';
import { renderMarkdown } from './gate-approvals.js';
import { renderTicketRitualActions } from './rituals-view.js';
import {
    getCurrentView,
    getIssues,
    setIssues,
    getCurrentUser,
} from './state.js';
import {
    loadIssues,
    getGroupByValue,
    updateSprintBudgetBar,
} from './issues-view.js';
import {
    setDependencies as setDashboardDependencies,
    getMyIssues,
    setMyIssues,
    loadMyIssues,
} from './dashboard.js';
import {
    setDependencies as setBoardDependencies,
} from './board.js';
import {
    setDependencies as setIssueListDependencies,
    renderIssueRow,
    getPriorityIcon,
    getStatusIcon,
} from './issue-list.js';
import {
    setDependencies as setInlineDropdownDependencies,
    showDetailDropdown,
} from './inline-dropdown.js';
import {
    setDependencies as setIssueCreationDependencies,
} from './issue-creation.js';
import {
    setDependencies as setIssueEditDependencies,
} from './issue-edit.js';
import {
    setDependencies as setIssueDetailViewDependencies,
    viewIssue,
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
} from './issue-detail-view.js';
import {
    setDependencies as setEpicDetailViewDependencies,
} from './epic-detail-view.js';
import { navigateTo, navigateToIssueByIdentifier } from './router.js';
import { getSprintCache, updateSprintCacheForProject } from './sprints.js';

import { viewDocument } from './documents.js';

/**
 * Initialize all module dependencies.
 *
 * @param {Object} localState - Closures over app.js local state
 * @param {Function} localState.getLabels - () => labels
 * @param {Function} localState.setLabels - (newLabels) => void
 * @param {Function} localState.getCurrentTeam - () => window.currentTeam
 * @param {Function} localState.getCurrentDetailIssue - () => window.currentDetailIssue
 * @param {Function} localState.setCurrentDetailIssue - (issue) => void
 * @param {Function} localState.getCurrentDetailSprints - () => window.currentDetailSprints
 * @param {Function} localState.setupMentionAutocomplete - () => void
 */
export function initAllDependencies(localState) {
    const {
        getLabels,
        setLabels,
        getCurrentTeam,
        getCurrentDetailIssue,
        setCurrentDetailIssue,
        getCurrentDetailSprints,
        setupMentionAutocomplete,
    } = localState;

    // Dashboard
    setDashboardDependencies({
        getCurrentUser,
        getCurrentTeam,
        renderIssueRow,
        formatActivityText,
        formatActivityActor,
        getActivityIcon,
        navigateToIssueByIdentifier,
        viewDocument,
    });

    // Board
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

    // Issue List
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

    // Inline Dropdown
    setInlineDropdownDependencies({
        api,
        getIssues,
        setIssues,
        getMyIssues,
        setMyIssues,
        getCurrentDetailIssue,
        setCurrentDetailIssue,
        getLabels,
        setLabels,
        getCurrentTeam,
        getCurrentDetailSprints,
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

    // Issue Creation
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
        getLabels,
        setLabels,
        getCurrentTeam,
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

    // Issue Edit
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

    // Issue Detail View
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

    // Epic Detail View
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
}
