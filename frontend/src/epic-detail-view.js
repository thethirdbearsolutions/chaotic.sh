/**
 * Epic detail view module - Epic-optimized detail layout (CHT-855)
 * Shows progress bar, sub-issues list, activity timeline, and sidebar properties.
 */

import {
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    renderDescriptionContent,
    viewIssue,
} from './issue-detail-view.js';
import { api } from './api.js';
import { getCurrentView } from './state.js';
import { showApiError } from './ui.js';
import { navigateTo } from './router.js';
import { getProjects, formatEstimate } from './projects.js';
import { getAssigneeById, formatAssigneeName } from './assignees.js';
import { formatStatus, formatPriority, formatTimeAgo, escapeHtml, escapeAttr, sanitizeColor } from './utils.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

/**
 * View epic by path (identifier or ID)
 * @param {string} identifier - Epic identifier or ID
 */
export async function viewEpicByPath(identifier) {
    try {
        let issue;
        if (identifier.includes('-')) {
            issue = await api.getIssueByIdentifier(identifier);
        } else {
            issue = await api.getIssue(identifier);
        }
        if (issue) {
            if (issue.issue_type !== 'epic') {
                // Not an epic — redirect to issue detail view
                viewIssue(issue.id, false);
                return;
            }
            await viewEpic(issue.id, false);
        } else {
            navigateTo('epics', false);
        }
    } catch {
        navigateTo('epics', false);
    }
}

/**
 * View epic detail
 * @param {string} epicId - Epic ID
 * @param {boolean} pushHistory - Whether to push to browser history
 */
export async function viewEpic(epicId, pushHistory = true) {
    try {
        const [epic, subIssues, activities, comments] = await Promise.all([
            api.getIssue(epicId),
            api.getSubIssues(epicId),
            api.getActivities(epicId),
            api.getComments(epicId),
        ]);

        // Validate this is actually an epic
        if (epic.issue_type !== 'epic') {
            viewIssue(epicId, pushHistory);
            return;
        }

        // Update URL
        if (pushHistory) {
            history.pushState({ epicId, view: getCurrentView() }, '', `/epic/${epic.identifier}`);
        }

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const detailView = document.getElementById('epic-detail-view');
        detailView.classList.remove('hidden');

        const backView = getCurrentView() || 'epics';
        const project = getProjects().find(p => p.id === epic.project_id);
        const assignee = epic.assignee_id ? getAssigneeById(epic.assignee_id) : null;
        const assigneeName = assignee ? formatAssigneeName(assignee) : null;

        // Calculate progress
        const total = subIssues.length;
        const done = subIssues.filter(s => s.status === 'done' || s.status === 'canceled').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        detailView.querySelector('#epic-detail-content').innerHTML = `
            <div class="detail-layout">
                <div class="detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" data-action="navigate-to" data-view="${escapeAttr(backView)}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${project ? escapeHtml(project.name) : 'Project'} › ${escapeHtml(epic.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${escapeHtml(epic.title)}</h1>

                    ${epic.description ? `
                    <div class="issue-detail-description">
                        <h3>Description</h3>
                        <div class="description-content markdown-body">
                            ${renderDescriptionContent(epic.description)}
                        </div>
                    </div>
                    ` : ''}

                    <div class="issue-detail-section epic-progress-section">
                        <h3>Progress</h3>
                        <div class="epic-detail-progress">
                            <div class="epic-detail-progress-bar">
                                <div class="epic-detail-progress-fill${pct === 100 ? ' epic-progress-complete' : ''}" style="width: ${pct}%"></div>
                            </div>
                            <div class="epic-detail-progress-label">
                                <span>${done} of ${total} done</span>
                                <span>${pct}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="issue-detail-section sub-issues-section">
                        <h3>Sub-issues</h3>
                        <div class="sub-issues-list">
                            ${subIssues.length === 0 ? renderEmptyState({ icon: EMPTY_ICONS.issues, heading: 'No sub-issues', description: 'Break this epic down by creating sub-issues' }) : subIssues.map(subIssue => {
                                const subAssignee = subIssue.assignee_id ? getAssigneeById(subIssue.assignee_id) : null;
                                const subAssigneeName = subAssignee ? formatAssigneeName(subAssignee) : null;
                                return `
                                <div class="sub-issue-item" data-issue-id="${escapeAttr(subIssue.id)}" data-identifier="${escapeAttr(subIssue.identifier)}">
                                    <span class="sub-issue-status">${getStatusIcon(subIssue.status)}</span>
                                    <span class="sub-issue-id">${escapeHtml(subIssue.identifier)}</span>
                                    <span class="sub-issue-title">${escapeHtml(subIssue.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(subIssue.status || 'backlog').replace(/_/g, '-')}">${formatStatus(subIssue.status)}</span>
                                    ${subAssigneeName ? `<span class="sub-issue-assignee">${escapeHtml(subAssigneeName)}</span>` : ''}
                                </div>
                            `}).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${activities.length === 0 ? renderEmptyState({ icon: EMPTY_ICONS.activity, heading: 'No activity yet', description: 'Activity will appear here as the epic is updated' }) : activities.map(activity => `
                                <div class="activity-item">
                                    <div class="activity-icon">${getActivityIcon(activity.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${formatActivityText(activity)}</span>
                                        <span class="activity-actor">by ${escapeHtml(formatActivityActor(activity))}</span>
                                        <span class="activity-time">${formatTimeAgo(activity.created_at)}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${comments.length > 0 ? `
                    <div class="issue-detail-section" id="epic-comments-section">
                        <h3>Comments</h3>
                        <div class="comments-list">
                            ${comments.map(comment => `
                                <div class="comment">
                                    <div class="comment-avatar">${(comment.author_name || 'U').charAt(0).toUpperCase()}</div>
                                    <div class="comment-body">
                                        <div class="comment-header">
                                            <span class="comment-author">${escapeHtml(comment.author_name || 'User')}</span>
                                            <span class="comment-date">${formatTimeAgo(comment.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${escapeHtml(comment.content || '')}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <aside class="detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <span class="property-value-static">
                                ${getStatusIcon(epic.status)}
                                ${formatStatus(epic.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${getPriorityIcon(epic.priority)}
                                ${formatPriority(epic.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${assigneeName ? escapeHtml(assigneeName) : '<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${formatEstimate(epic.estimate, epic.project_id)}
                            </span>
                        </div>

                        ${epic.labels && epic.labels.length > 0 ? `
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${epic.labels.map(label => `
                                    <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                                `).join('')}
                            </span>
                        </div>
                        ` : ''}

                        ${project ? `
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${escapeHtml(project.name)}</span>
                        </div>
                        ` : ''}

                        <div class="property-row">
                            <span class="property-label">Created</span>
                            <span class="property-value-static">${new Date(epic.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </aside>
            </div>
        `;

        // Attach click handlers for sub-issue rows via event delegation
        const subIssuesList = detailView.querySelector('.sub-issues-list');
        if (subIssuesList) {
            subIssuesList.addEventListener('click', (e) => {
                const row = e.target.closest('.sub-issue-item');
                if (row && row.dataset.issueId) {
                    viewIssue(row.dataset.issueId);
                }
            });
        }
    } catch (e) {
        showApiError('load epic', e);
    }
}

// navigate-to action is registered centrally in app.js
