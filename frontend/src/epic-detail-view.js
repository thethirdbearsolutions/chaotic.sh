/**
 * Epic detail view module - Epic-optimized detail layout (CHT-855)
 * Shows progress bar, sub-issues list, activity timeline, and sidebar properties.
 */

import {
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    renderDescriptionContent,
} from './issue-detail-view.js';

// Dependencies injected from app.js
let deps = {
    api: null,
    getCurrentView: () => 'epics',
    showToast: () => {},
    navigateTo: () => {},
    getProjects: () => [],
    getAssigneeById: () => null,
    formatAssigneeName: (a) => a?.name || '',
    formatStatus: (s) => s,
    formatPriority: (p) => p,
    formatEstimate: (e) => e || 'None',
    formatTimeAgo: () => '',
    getStatusIcon: () => '',
    getPriorityIcon: () => '',
    escapeHtml: (text) => text,
    escapeAttr: (text) => text,
    escapeJsString: (text) => text,
    sanitizeColor: (c) => c || '#888',
};

/**
 * Set dependencies for this module
 * @param {Object} dependencies - Object containing required dependencies
 */
export function setDependencies(dependencies) {
    deps = { ...deps, ...dependencies };
}

/**
 * View epic by path (identifier or ID)
 * @param {string} identifier - Epic identifier or ID
 */
export async function viewEpicByPath(identifier) {
    try {
        let issue;
        if (identifier.includes('-')) {
            issue = await deps.api.getIssueByIdentifier(identifier);
        } else {
            issue = await deps.api.getIssue(identifier);
        }
        if (issue) {
            if (issue.issue_type !== 'epic') {
                // Not an epic — redirect to issue detail view
                if (window.viewIssue) {
                    window.viewIssue(issue.id, false);
                } else {
                    deps.navigateTo('epics', false);
                }
                return;
            }
            await viewEpic(issue.id, false);
        } else {
            deps.navigateTo('epics', false);
        }
    } catch {
        deps.navigateTo('epics', false);
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
            deps.api.getIssue(epicId),
            deps.api.getSubIssues(epicId),
            deps.api.getActivities(epicId),
            deps.api.getComments(epicId),
        ]);

        // Validate this is actually an epic
        if (epic.issue_type !== 'epic') {
            if (window.viewIssue) {
                window.viewIssue(epicId, pushHistory);
            } else {
                deps.navigateTo('epics', false);
            }
            return;
        }

        // Update URL
        if (pushHistory) {
            history.pushState({ epicId, view: deps.getCurrentView() }, '', `/epic/${epic.identifier}`);
        }

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const detailView = document.getElementById('epic-detail-view');
        detailView.classList.remove('hidden');

        const backView = deps.getCurrentView() || 'epics';
        const project = deps.getProjects().find(p => p.id === epic.project_id);
        const assignee = epic.assignee_id ? deps.getAssigneeById(epic.assignee_id) : null;
        const assigneeName = assignee ? deps.formatAssigneeName(assignee) : null;

        // Calculate progress
        const total = subIssues.length;
        const done = subIssues.filter(s => s.status === 'done' || s.status === 'canceled').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        detailView.querySelector('#epic-detail-content').innerHTML = `
            <div class="issue-detail-layout">
                <div class="issue-detail-main">
                    <div class="issue-detail-nav">
                        <button class="back-link" onclick="navigateTo('${backView}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                            Back
                        </button>
                        <span class="issue-detail-breadcrumb">${project ? deps.escapeHtml(project.name) : 'Project'} › ${deps.escapeHtml(epic.identifier)}</span>
                    </div>

                    <h1 class="issue-detail-title">${deps.escapeHtml(epic.title)}</h1>

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
                            ${subIssues.length === 0 ? `
                                <div class="sub-issues-empty">No sub-issues</div>
                            ` : subIssues.map(subIssue => {
                                const subAssignee = subIssue.assignee_id ? deps.getAssigneeById(subIssue.assignee_id) : null;
                                const subAssigneeName = subAssignee ? deps.formatAssigneeName(subAssignee) : null;
                                return `
                                <div class="sub-issue-item" data-issue-id="${deps.escapeAttr(subIssue.id)}" data-identifier="${deps.escapeAttr(subIssue.identifier)}">
                                    <span class="sub-issue-status">${deps.getStatusIcon(subIssue.status)}</span>
                                    <span class="sub-issue-id">${deps.escapeHtml(subIssue.identifier)}</span>
                                    <span class="sub-issue-title">${deps.escapeHtml(subIssue.title)}</span>
                                    <span class="sub-issue-status-badge status-badge status-${(subIssue.status || 'backlog').replace(/_/g, '-')}">${deps.formatStatus(subIssue.status)}</span>
                                    ${subAssigneeName ? `<span class="sub-issue-assignee">${deps.escapeHtml(subAssigneeName)}</span>` : ''}
                                </div>
                            `}).join('')}
                        </div>
                    </div>

                    <div class="issue-detail-section" id="epic-activity-section">
                        <h3>Activity</h3>
                        <div class="activity-list">
                            ${activities.length === 0 ? `
                                <div class="activity-empty">No activity yet</div>
                            ` : activities.map(activity => `
                                <div class="activity-item">
                                    <div class="activity-icon">${getActivityIcon(activity.activity_type)}</div>
                                    <div class="activity-content">
                                        <span class="activity-text">${formatActivityText(activity)}</span>
                                        <span class="activity-actor">by ${deps.escapeHtml(formatActivityActor(activity))}</span>
                                        <span class="activity-time">${deps.formatTimeAgo(activity.created_at)}</span>
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
                                            <span class="comment-author">${deps.escapeHtml(comment.author_name || 'User')}</span>
                                            <span class="comment-date">${deps.formatTimeAgo(comment.created_at)}</span>
                                        </div>
                                        <div class="comment-content markdown-body">${deps.escapeHtml(comment.content || '')}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <aside class="issue-detail-sidebar">
                    <div class="sidebar-section">
                        <h4>Properties</h4>

                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <span class="property-value-static">
                                ${deps.getStatusIcon(epic.status)}
                                ${deps.formatStatus(epic.status)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <span class="property-value-static">
                                ${deps.getPriorityIcon(epic.priority)}
                                ${deps.formatPriority(epic.priority)}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Assignee</span>
                            <span class="property-value-static">
                                ${assigneeName ? deps.escapeHtml(assigneeName) : '<span class="text-muted">Unassigned</span>'}
                            </span>
                        </div>

                        <div class="property-row">
                            <span class="property-label">Estimate</span>
                            <span class="property-value-static">
                                ${deps.formatEstimate(epic.estimate, epic.project_id)}
                            </span>
                        </div>

                        ${epic.labels && epic.labels.length > 0 ? `
                        <div class="property-row">
                            <span class="property-label">Labels</span>
                            <span class="property-value-static property-labels-btn">
                                ${epic.labels.map(label => `
                                    <span class="issue-label" style="background: ${deps.sanitizeColor(label.color)}20; color: ${deps.sanitizeColor(label.color)}">${deps.escapeHtml(label.name)}</span>
                                `).join('')}
                            </span>
                        </div>
                        ` : ''}

                        ${project ? `
                        <div class="property-row">
                            <span class="property-label">Project</span>
                            <span class="property-value-static">${deps.escapeHtml(project.name)}</span>
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
                    if (window.viewIssue) {
                        window.viewIssue(row.dataset.issueId);
                    }
                }
            });
        }
    } catch (e) {
        deps.showToast(`Failed to load epic: ${e.message}`, 'error');
    }
}
