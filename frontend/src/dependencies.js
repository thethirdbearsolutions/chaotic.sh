/**
 * Module dependency initialization (CHT-1043)
 *
 * Centralizes all setDependencies() calls that were cluttering app.js.
 * Each extracted module uses a DI pattern; this wires them all up.
 */

/* global api */
import { showModal, closeModal, showToast, closeAllDropdowns, setDropdownKeyHandler, registerDropdownClickOutside } from './ui.js';
import { getAssigneeById, formatAssigneeName, formatAssigneeOptionLabel, getAssigneeOptionList } from './assignees.js';
import { escapeJsString, formatStatus, formatPriority, escapeHtml, escapeAttr, sanitizeColor, formatIssueType, renderAvatar } from './utils.js';
import { getProjects, getEstimateOptions, formatEstimate } from './projects.js';
import {
    getCurrentView,
    getIssues,
    setIssues,
} from './state.js';
import {
    loadIssues,
    updateSprintBudgetBar,
} from './issues-view.js';
import {
    getMyIssues,
    setMyIssues,
    loadMyIssues,
} from './dashboard.js';
import {
    renderIssueRow,
    getPriorityIcon,
    getStatusIcon,
} from './issue-list.js';
import {
    setDependencies as setInlineDropdownDependencies,
} from './inline-dropdown.js';
import {
    setDependencies as setIssueCreationDependencies,
} from './issue-creation.js';
import { viewIssue } from './issue-detail-view.js';
import { updateSprintCacheForProject } from './sprints.js';

/**
 * Initialize all module dependencies.
 *
 * @param {Object} localState - Closures over app.js local state
 * @param {Function} localState.getLabels - () => labels
 * @param {Function} localState.setLabels - (newLabels) => void
 * @param {Function} localState.getCurrentTeam - () => currentTeam (from state.js)
 * @param {Function} localState.getCurrentDetailIssue - () => currentDetailIssue (from state.js)
 * @param {Function} localState.setCurrentDetailIssue - (issue) => void (from state.js)
 * @param {Function} localState.getCurrentDetailSprints - () => currentDetailSprints (from state.js)
 */
export function initAllDependencies(localState) {
    const {
        getLabels,
        setLabels,
        getCurrentTeam,
        getCurrentDetailIssue,
        setCurrentDetailIssue,
        getCurrentDetailSprints,
    } = localState;

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

}
