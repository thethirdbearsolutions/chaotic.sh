/**
 * Issue list module - Issue list rendering functionality (CHT-664)
 * Extracted from app.js for testability
 */

// Status order for grouping
export const STATUS_ORDER = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'];
export const PRIORITY_ORDER = ['urgent', 'high', 'medium', 'low', 'no_priority'];
export const ISSUE_TYPE_ORDER = ['task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'epic'];

// Dependencies injected from app.js
let deps = {
    getIssues: () => [],  // Function to get issues array from app.js
    getAssigneeById: () => null,
    formatAssigneeName: (a) => a?.name || '',
    formatEstimate: () => '',
    getSprintCache: () => ({}),
    formatStatus: (s) => s,
    formatPriority: (p) => p,
    formatIssueType: (t) => t || 'task',
    escapeHtml: (text) => text || '',
    escapeAttr: (text) => text || '',
    escapeJsString: (text) => text || '',
    sanitizeColor: (c) => c || '#888',
    renderAvatar: () => '',
    getAssigneeOptionList: () => [],
    getGroupByValue: () => '',
};

/**
 * Set dependencies for this module
 * @param {Object} dependencies - Object containing required dependencies
 */
export function setDependencies(dependencies) {
    deps = { ...deps, ...dependencies };
}

/**
 * Sum estimates for a list of issues. Null estimates count as 0.
 */
export function sumEstimates(issues) {
    return issues.reduce((sum, i) => sum + (i.estimate || 0), 0);
}

/**
 * Render a summary bar showing issue count and total points.
 */
function renderSummaryBar(issues) {
    const total = sumEstimates(issues);
    return `<div class="issue-list-summary">${issues.length} issues · ${total}pt</div>`;
}

/**
 * Render the issues list (main entry point)
 */
export function renderIssues() {
    const list = document.getElementById('issues-list');
    if (!list) return;

    list.classList.add('issue-list-linear');

    const issues = deps.getIssues();

    if (issues.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <h3>No issues found</h3>
                <p>Create your first issue to get started</p>
            </div>
        `;
        return;
    }

    const groupBy = deps.getGroupByValue();

    if (groupBy === 'status') {
        renderGroupedByStatus(list, issues);
    } else if (groupBy === 'priority') {
        renderGroupedByPriority(list, issues);
    } else if (groupBy === 'type') {
        renderGroupedByType(list, issues);
    } else if (groupBy === 'assignee') {
        renderGroupedByAssignee(list, issues);
    } else if (groupBy === 'sprint') {
        renderGroupedBySprint(list, issues);
    } else {
        // No grouping - render flat list with summary
        list.innerHTML = renderSummaryBar(issues) + issues.map(issue => renderIssueRow(issue)).join('');
    }
}

function renderGroupedByStatus(list, issues) {
    // Group issues by status
    const groups = {};
    STATUS_ORDER.forEach(status => groups[status] = []);

    issues.forEach(issue => {
        if (groups[issue.status]) {
            groups[issue.status].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    STATUS_ORDER.forEach(status => {
        const groupIssues = groups[status];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${status}">
                <div class="issue-group-header" onclick="toggleGroup('${status}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${getStatusIcon(status)}</span>
                    <span class="group-title">${deps.formatStatus(status)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groupIssues.map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByPriority(list, issues) {
    // Group issues by priority
    const groups = {};
    PRIORITY_ORDER.forEach(priority => groups[priority] = []);

    issues.forEach(issue => {
        if (groups[issue.priority]) {
            groups[issue.priority].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    PRIORITY_ORDER.forEach(priority => {
        const groupIssues = groups[priority];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${priority}">
                <div class="issue-group-header" onclick="toggleGroup('${priority}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${getPriorityIcon(priority)}</span>
                    <span class="group-title">${deps.formatPriority(priority)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groupIssues.map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByType(list, issues) {
    const groups = {};
    ISSUE_TYPE_ORDER.forEach(issueType => groups[issueType] = []);

    issues.forEach(issue => {
        const type = issue.issue_type || 'task';
        if (groups[type]) {
            groups[type].push(issue);
        }
    });

    let html = renderSummaryBar(issues);
    ISSUE_TYPE_ORDER.forEach(issueType => {
        const groupIssues = groups[issueType];
        if (groupIssues.length === 0) return;

        html += `
            <div class="issue-group" data-group="${issueType}">
                <div class="issue-group-header" onclick="toggleGroup('${issueType}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><span class="issue-type-badge type-${issueType}">${deps.formatIssueType(issueType)}</span></span>
                    <span class="group-title">${deps.formatIssueType(issueType)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groupIssues.map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedByAssignee(list, issues) {
    // Group issues by assignee
    const groups = {};
    const unassignedKey = '__unassigned__';
    groups[unassignedKey] = [];

    // Create groups for each assignee (members + agents)
    const assigneeOptions = deps.getAssigneeOptionList();
    assigneeOptions.forEach(({ assignee }) => {
        groups[assignee.id] = [];
    });

    issues.forEach(issue => {
        if (!issue.assignee_id) {
            groups[unassignedKey].push(issue);
        } else if (groups[issue.assignee_id]) {
            groups[issue.assignee_id].push(issue);
        } else {
            // Assignee not in members list, add to unassigned
            groups[unassignedKey].push(issue);
        }
    });

    let html = renderSummaryBar(issues);

    // Render unassigned first
    if (groups[unassignedKey].length > 0) {
        html += `
            <div class="issue-group" data-group="${unassignedKey}">
                <div class="issue-group-header" onclick="toggleGroup('${unassignedKey}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg></span>
                    <span class="group-title">Unassigned</span>
                    <span class="group-count">${groups[unassignedKey].length}</span>
                    <span class="group-points">${sumEstimates(groups[unassignedKey])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groups[unassignedKey].map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    }

    // Render each assignee's group (members, then nested agents)
    assigneeOptions.forEach(({ assignee }) => {
        const groupIssues = groups[assignee.id];
        if (!groupIssues || groupIssues.length === 0) return;

        const name = deps.formatAssigneeName(assignee) || 'Unknown';
        const extra = assignee.is_agent ? (assignee.parent_user_name ? ` (${assignee.parent_user_name})` : ' (agent)') : '';
        html += `
            <div class="issue-group" data-group="${assignee.id}">
                <div class="issue-group-header" onclick="toggleGroup('${deps.escapeJsString(assignee.id)}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon">${deps.renderAvatar(assignee, 'avatar-small')}</span>
                    <span class="group-title">${deps.escapeHtml(name)}${deps.escapeHtml(extra)}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groupIssues.map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}

function renderGroupedBySprint(list, issues) {
    const noSprintKey = '__no_sprint__';
    const groups = {};
    groups[noSprintKey] = [];

    // Collect unique sprint IDs from issues and create groups
    const sprintOrder = [];
    issues.forEach(issue => {
        if (!issue.sprint_id) {
            groups[noSprintKey].push(issue);
        } else {
            if (!groups[issue.sprint_id]) {
                groups[issue.sprint_id] = [];
                sprintOrder.push(issue.sprint_id);
            }
            groups[issue.sprint_id].push(issue);
        }
    });

    // Sort sprints: active first, then planned, then completed
    const statusRank = { active: 0, planned: 1, completed: 2 };
    const cache = deps.getSprintCache();
    sprintOrder.sort((a, b) => {
        const sa = cache[a];
        const sb = cache[b];
        const rankA = sa ? (statusRank[sa.status] ?? 3) : 3;
        const rankB = sb ? (statusRank[sb.status] ?? 3) : 3;
        return rankA - rankB;
    });

    let html = renderSummaryBar(issues);

    // Render sprint groups
    sprintOrder.forEach(sprintId => {
        const groupIssues = groups[sprintId];
        if (groupIssues.length === 0) return;

        const sprint = cache[sprintId];
        const name = sprint ? sprint.name : sprintId;
        const statusLabel = sprint ? (sprint.status === 'active' ? ' (Active)' : sprint.status === 'completed' ? ' (Done)' : '') : '';
        const safeId = sprintId.replace(/[^a-zA-Z0-9_-]/g, '_');

        html += `
            <div class="issue-group" data-group="${safeId}">
                <div class="issue-group-header" onclick="toggleGroup('${safeId}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">${deps.escapeHtml(name)}${statusLabel}</span>
                    <span class="group-count">${groupIssues.length}</span>
                    <span class="group-points">${sumEstimates(groupIssues)}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groupIssues.map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    });

    // Render "No Sprint" group last
    if (groups[noSprintKey].length > 0) {
        html += `
            <div class="issue-group" data-group="${noSprintKey}">
                <div class="issue-group-header" onclick="toggleGroup('${noSprintKey}')">
                    <svg class="group-toggle-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4 6l4 4 4-4"/>
                    </svg>
                    <span class="group-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
                    <span class="group-title">No Sprint</span>
                    <span class="group-count">${groups[noSprintKey].length}</span>
                    <span class="group-points">${sumEstimates(groups[noSprintKey])}pt</span>
                </div>
                <div class="issue-group-content">
                    ${groups[noSprintKey].map(issue => renderIssueRow(issue)).join('')}
                </div>
            </div>
        `;
    }

    list.innerHTML = html;
}

/**
 * Toggle group collapse state
 * @param {string} groupId - Group identifier
 */
export function toggleGroup(groupId) {
    const group = document.querySelector(`.issue-group[data-group="${groupId}"]`);
    if (group) {
        group.classList.toggle('collapsed');
    }
}

/**
 * Render a single issue row
 * @param {Object} issue - Issue data
 * @returns {string} HTML string
 */
export function renderIssueRow(issue) {
    const assignee = issue.assignee_id ? deps.getAssigneeById(issue.assignee_id) : null;
    const assigneeName = assignee ? deps.formatAssigneeName(assignee) : null;
    const createdDate = new Date(issue.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const estimateDisplay = issue.estimate ? deps.formatEstimate(issue.estimate, issue.project_id) : '';
    const sprintInfo = issue.sprint_id ? deps.getSprintCache()[issue.sprint_id] : null;
    const sprintName = sprintInfo ? sprintInfo.name : null;

    return `
        <div class="issue-row" data-issue-id="${deps.escapeAttr(issue.id)}" data-status="${issue.status}" data-priority="${issue.priority}" data-issue-type="${issue.issue_type || 'task'}" data-project-id="${deps.escapeAttr(issue.project_id)}">
            <div class="issue-row-left">
                <button class="issue-icon-btn priority-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'priority', '${deps.escapeJsString(issue.id)}')" title="Priority: ${deps.formatPriority(issue.priority)}">
                    ${getPriorityIcon(issue.priority)}
                </button>
                <button class="issue-icon-btn status-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'status', '${deps.escapeJsString(issue.id)}')" title="Status: ${deps.formatStatus(issue.status)}">
                    ${getStatusIcon(issue.status)}
                </button>
                <span class="issue-identifier">${issue.identifier}</span>
                <span class="issue-type-badge type-${issue.issue_type || 'task'}">${deps.formatIssueType(issue.issue_type)}</span>
                <a class="issue-title" href="/issue/${encodeURIComponent(issue.identifier)}" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { event.preventDefault(); viewIssue('${deps.escapeJsString(issue.id)}'); }">${deps.escapeHtml(issue.title)}</a>
            </div>
            <div class="issue-row-right">
                ${issue.labels && issue.labels.length > 0 ? `
                    <div class="issue-labels">
                        ${issue.labels.slice(0, 2).map(label => `
                            <span class="issue-label" style="background: ${deps.sanitizeColor(label.color)}20; color: ${deps.sanitizeColor(label.color)}">${deps.escapeHtml(label.name)}</span>
                        `).join('')}
                    </div>
                ` : ''}
                <button class="issue-icon-btn sprint-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'sprint', '${deps.escapeJsString(issue.id)}')" title="Sprint: ${sprintName ? deps.escapeHtml(sprintName) : 'None'}">
                    ${sprintName ? `<span class="sprint-badge">${deps.escapeHtml(sprintName)}</span>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`}
                </button>
                <button class="issue-icon-btn estimate-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'estimate', '${deps.escapeJsString(issue.id)}')" title="Estimate: ${estimateDisplay || 'None'}">
                    ${estimateDisplay ? `<span class="estimate-badge">${estimateDisplay}</span>` : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`}
                </button>
                <span class="issue-date">${createdDate}</span>
                <button class="issue-icon-btn assignee-btn" onclick="event.stopPropagation(); showInlineDropdown(event, 'assignee', '${deps.escapeJsString(issue.id)}')" title="${deps.escapeAttr(assigneeName || 'Unassigned')}">
                    ${assigneeName ? deps.renderAvatar(assignee, 'avatar-small') : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/></svg>`}
                </button>
            </div>
        </div>
    `;
}

/**
 * Get priority icon SVG
 * @param {string} priority - Priority level
 * @returns {string} SVG markup
 */
export function getPriorityIcon(priority) {
    const icons = {
        urgent: '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-urgent"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor"/><text x="8" y="11.5" text-anchor="middle" fill="var(--bg-primary)" font-size="10" font-weight="bold">!</text></svg>',
        high: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-high"><rect x="1" y="3" width="3" height="12" rx="1"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        medium: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-medium"><rect x="1" y="6" width="3" height="9" rx="1" opacity="0.3"/><rect x="6" y="6" width="3" height="9" rx="1"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        low: '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="priority-low"><rect x="1" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="6" y="9" width="3" height="6" rx="1" opacity="0.3"/><rect x="11" y="9" width="3" height="6" rx="1"/></svg>',
        no_priority: '<svg width="16" height="16" viewBox="0 0 16 16" class="priority-none"><line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/><line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/></svg>'
    };
    return icons[priority] || icons.no_priority;
}

/**
 * Get status icon SVG
 * @param {string} status - Status value
 * @returns {string} SVG markup
 */
export function getStatusIcon(status) {
    const icons = {
        backlog: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-backlog"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/></svg>',
        todo: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-todo"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
        in_progress: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-progress"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 0 12" fill="currentColor"/></svg>',
        in_review: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-in-review"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 2a6 6 0 0 1 6 6 6 6 0 0 1-6 6" fill="currentColor"/></svg>',
        done: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-done"><circle cx="8" cy="8" r="6" fill="currentColor"/><path d="M5 8l2 2 4-4" stroke="var(--bg-primary)" stroke-width="1.5" fill="none"/></svg>',
        canceled: '<svg width="16" height="16" viewBox="0 0 16 16" class="status-canceled"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" stroke-width="1.5"/></svg>'
    };
    return icons[status] || icons.backlog;
}
