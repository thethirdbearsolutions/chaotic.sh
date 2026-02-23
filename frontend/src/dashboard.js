/**
 * Dashboard module (My Issues + Activity Feed)
 * Extracted from app.js for better testability and maintainability.
 */

import { api } from './api.js';
import { showToast } from './ui.js';
import { escapeHtml, escapeAttr, formatTimeAgo } from './utils.js';
import { getCurrentUser, getCurrentTeam, getCurrentProject, getCurrentView, subscribe } from './state.js';
import { renderIssueRow } from './issue-list.js';
import { formatActivityText, formatActivityActor, getActivityIcon } from './issue-detail-view.js';
import { navigateToIssueByIdentifier } from './router.js';
import { registerActions } from './event-delegation.js';
// State
let myIssues = [];
let dashboardActivities = [];

// React to project changes when dashboard is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'my-issues') return;
    loadMyIssues();
});

/**
 * Get the current my-issues list.
 * @returns {Array}
 */
export function getMyIssues() {
    return myIssues;
}

/**
 * Set the my-issues list (primarily for testing).
 * @param {Array} issues
 */
export function setMyIssues(issues) {
    myIssues = issues;
}

/**
 * Get the current dashboard activities.
 * @returns {Array}
 */
export function getDashboardActivities() {
    return dashboardActivities;
}

/**
 * Set the dashboard activities (primarily for testing).
 * @param {Array} activities
 */
export function setDashboardActivities(activities) {
    dashboardActivities = activities;
}

/**
 * Load issues assigned to the current user.
 */
export async function loadMyIssues() {
    const currentTeam = getCurrentTeam();
    const currentUser = getCurrentUser();

    if (!currentTeam || !currentUser) return;

    const statusFilter = document.getElementById('my-issues-status-filter')?.value;
    const projectFilter = getCurrentProject();

    // Show loading skeleton
    showMyIssuesLoadingSkeleton();

    try {
        const params = {
            assignee_id: currentUser.id,
            status: statusFilter || undefined,
            limit: 1000,
        };
        let issues;
        if (projectFilter) {
            // Fetch from specific project (CHT-853)
            issues = await api.getIssues({ ...params, project_id: projectFilter });
        } else {
            issues = await api.getTeamIssues(currentTeam.id, params);
        }
        myIssues = issues;
        renderMyIssues();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

/**
 * Load recent activity for the dashboard.
 * @param {Object} [options] - Options
 * @param {boolean} [options.showLoading=true] - Whether to show loading state (skip for WS updates to avoid FOUC)
 */
export async function loadDashboardActivity({ showLoading = true } = {}) {
    const currentTeam = getCurrentTeam();

    if (!currentTeam) return;

    const container = document.getElementById('dashboard-activity-list');
    if (showLoading && container) {
        container.innerHTML = `
            <div class="activity-item">
                <div class="activity-icon">⏳</div>
                <div class="activity-content">
                    <span class="activity-text">Loading activity...</span>
                </div>
            </div>
        `;
    }

    try {
        dashboardActivities = await api.getTeamActivities(currentTeam.id, 0, 10);
        renderDashboardActivity();
    } catch {
        if (container) {
            container.innerHTML = `<div class="activity-empty">Failed to load activity</div>`;
        }
    }
}

/**
 * Render the dashboard activity feed.
 */
export function renderDashboardActivity() {
    const container = document.getElementById('dashboard-activity-list');
    if (!container) return;

    if (!dashboardActivities.length) {
        container.innerHTML = `<div class="activity-empty">No recent activity. Create or update issues to see activity here.</div>`;
        return;
    }

    container.innerHTML = dashboardActivities.map(activity => {
        // Determine the target link based on activity type
        let targetLink = '';
        if (activity.issue_identifier) {
            targetLink = ` on <a href="#" class="activity-issue-link" data-action="navigate-to-issue-by-identifier" data-identifier="${escapeAttr(activity.issue_identifier)}"><strong>${escapeHtml(activity.issue_identifier)}</strong></a>`;
        } else if (activity.document_id && activity.document_title) {
            const docIcon = activity.document_icon || '📄';
            targetLink = ` <a href="#" class="activity-doc-link" data-action="view-document" data-document-id="${escapeAttr(activity.document_id)}"><strong>${docIcon} ${escapeHtml(activity.document_title)}</strong></a>`;
        } else if (activity.document_title) {
            // Deleted document - no link, just show title
            const docIcon = activity.document_icon || '📄';
            targetLink = ` <strong>${docIcon} ${escapeHtml(activity.document_title)}</strong>`;
        }

        return `
        <div class="activity-item">
            <div class="activity-icon">${getActivityIcon(activity.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${formatActivityText(activity)}${targetLink}</span>
                <span class="activity-actor">by ${escapeHtml(formatActivityActor(activity))}</span>
                <span class="activity-time">${formatTimeAgo(activity.created_at)}</span>
            </div>
        </div>
    `}).join('');
}

/**
 * Show loading skeleton for my-issues list.
 */
export function showMyIssuesLoadingSkeleton() {
    const list = document.getElementById('my-issues-list');
    if (!list) return;
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

/**
 * Filter and reload my issues.
 */
export function filterMyIssues() {
    loadMyIssues();
}

/**
 * Render the my-issues list.
 */
export function renderMyIssues() {
    const list = document.getElementById('my-issues-list');
    if (!list) return;
    list.classList.add('issue-list-linear');

    if (myIssues.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <h3>No issues assigned to you</h3>
                <p>Issues assigned to you will appear here</p>
            </div>
        `;
        return;
    }

    list.innerHTML = myIssues.map(issue => renderIssueRow(issue)).join('');
}

// ========================================
// Event Delegation Actions
// ========================================

registerActions({
    'filter-my-issues': () => filterMyIssues(),
    'navigate-to-issue-by-identifier': (event, dataset) => {
        event.preventDefault();
        navigateToIssueByIdentifier(dataset.identifier);
    },
    // view-document action is registered in documents.js
});
