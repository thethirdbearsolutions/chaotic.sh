/**
 * Dashboard module (My Issues + Activity Feed)
 * Extracted from app.js for better testability and maintainability.
 */

import { api } from './api.js';
import { showToast } from './ui.js';
import { escapeHtml, escapeAttr, formatTimeAgo, formatStatus } from './utils.js';
import { getCurrentUser, getCurrentTeam, getCurrentProject, getCurrentView, subscribe } from './state.js';
import { renderIssueRow } from './issue-list.js';
import { formatActivityText, formatActivityActor, getActivityIcon } from './issue-detail-view.js';
import { navigateToIssueByIdentifier } from './router.js';
import { registerActions } from './event-delegation.js';
import { getProjects } from './projects.js';
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
// Sprint Status Section (CHT-1128)
// ========================================

/**
 * Load and render active sprint status across all projects.
 */
export async function loadSprintStatus() {
    const container = document.getElementById('dashboard-sprint-status');
    if (!container) return;

    const projects = getProjects();
    if (!projects.length) {
        container.innerHTML = '';
        return;
    }

    try {
        const sprintPromises = projects.map(async (project) => {
            try {
                const sprint = await api.getCurrentSprint(project.id);
                if (!sprint) return null;
                let statusCounts = {};
                try {
                    const issues = await api.getIssues({ sprint_id: sprint.id, project_id: project.id, limit: 500 });
                    for (const issue of issues) {
                        statusCounts[issue.status] = (statusCounts[issue.status] || 0) + 1;
                    }
                } catch { /* ignore */ }
                return { project, sprint, statusCounts };
            } catch {
                return null;
            }
        });
        const results = (await Promise.all(sprintPromises)).filter(Boolean);
        renderSprintStatus(results);
    } catch {
        container.innerHTML = '';
    }
}

/**
 * Render sprint status cards.
 * @param {Array<{project, sprint}>} sprintData
 */
export function renderSprintStatus(sprintData) {
    const container = document.getElementById('dashboard-sprint-status');
    if (!container) return;

    if (!sprintData.length) {
        container.innerHTML = '';
        return;
    }

    const STATUS_ORDER = ['done', 'in_review', 'in_progress', 'todo', 'backlog'];

    container.innerHTML = `
        <div class="section-header">
            <h3>Active Sprints</h3>
        </div>
        <div class="sprint-status-cards">
            ${sprintData.map(({ project, sprint, statusCounts }) => {
                const budget = sprint.budget || 0;
                const spent = sprint.points_spent || 0;
                const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
                const overBudget = budget > 0 && spent > budget;
                const statusClass = sprint.limbo ? 'limbo' : overBudget ? 'arrears' : '';
                const counts = statusCounts || {};
                const totalIssues = Object.values(counts).reduce((a, b) => a + b, 0);

                return `
                    <div class="sprint-status-card ${statusClass}">
                        <div class="sprint-status-header">
                            <span class="sprint-status-project">${escapeHtml(project.name)}</span>
                            ${sprint.limbo ? '<span class="sprint-status-badge limbo">Limbo</span>' : ''}
                            ${overBudget ? '<span class="sprint-status-badge arrears">Arrears</span>' : ''}
                        </div>
                        <div class="sprint-status-name">${escapeHtml(sprint.name)}</div>
                        ${budget > 0 ? `
                            <div class="sprint-status-progress">
                                <div class="sprint-progress-bar">
                                    <div class="sprint-progress-fill ${statusClass}" style="width: ${pct}%"></div>
                                </div>
                                <span class="sprint-status-points">${spent}/${budget} pts</span>
                            </div>
                        ` : `
                            <div class="sprint-status-progress">
                                <span class="sprint-status-points">${spent} pts (no budget)</span>
                            </div>
                        `}
                        ${totalIssues > 0 ? `
                            <div class="sprint-issue-breakdown">
                                <div class="sprint-stacked-bar">
                                    ${STATUS_ORDER.filter(s => counts[s]).map(s => {
                                        const widthPct = Math.round((counts[s] / totalIssues) * 100);
                                        return `<div class="sprint-stacked-segment status-${s}" style="width: ${widthPct}%" title="${formatStatus(s)}: ${counts[s]}"></div>`;
                                    }).join('')}
                                </div>
                                <div class="sprint-status-counts">
                                    ${STATUS_ORDER.filter(s => counts[s]).map(s =>
                                        `<span class="sprint-count-label status-${s}">${counts[s]} ${formatStatus(s)}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
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
