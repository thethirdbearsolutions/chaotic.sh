/**
 * Dashboard module (My Issues + Activity Feed)
 * Extracted from app.js for better testability and maintainability.
 */

import { api } from './api.js';
import { showApiError } from './ui.js';
import { escapeHtml, escapeAttr, formatTimeAgo, formatStatus } from './utils.js';
import { getCurrentUser, getCurrentTeam, getCurrentProject, getCurrentView, subscribe, setDetailNavContext } from './state.js';
import { renderIssueRow } from './issue-list.js';
import { formatActivityText, formatActivityActor, getActivityIcon } from './issue-detail-view.js';
import { navigateToIssueByIdentifier } from './router.js';
import { registerActions } from './event-delegation.js';
import { getProjects } from './projects.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
// State
let myIssues = [];
let dashboardActivities = [];
let selectedMyIssueIndex = -1;
// The cursor is kept by issue id, so a re-render (a remote update, a status
// change moving the row to another group, coming back from the detail
// view) puts it back on the same issue rather than dropping it.
let selectedMyIssueId = null;
// Done and Canceled can hold years of work: they show DONE_PREVIEW rows
// until expanded, so the rest of the page stays reachable on a phone.
const DONE_PREVIEW = 5;
const COLLAPSIBLE = new Set(['done', 'canceled']);
const expandedGroups = new Set();

/** Keyboard cursor index in the Assigned to me list (CHT-1963). */
export function getSelectedMyIssueIndex() {
    return selectedMyIssueIndex;
}

export function setSelectedMyIssueIndex(i) {
    selectedMyIssueIndex = i;
    const row = i >= 0 ? document.querySelectorAll('#my-issues-list .issue-row')[i] : null;
    selectedMyIssueId = row?.dataset.issueId ?? null;
}

// Assigned-to-me groups, in the order work moves through them (CHT-1963).
const MY_ISSUE_GROUPS = [
    { status: 'in_progress', label: 'In progress' },
    { status: 'in_review', label: 'In review' },
    { status: 'todo', label: 'Todo' },
    { status: 'backlog', label: 'Backlog' },
    { status: 'done', label: 'Done' },
    { status: 'canceled', label: 'Canceled' },
];

/**
 * Group issues by status in workflow order, dropping empty groups.
 * Unknown statuses go last, under their formatted name.
 * @param {Array} issues
 * @returns {Array<{status: string, label: string, issues: Array}>}
 */
export function groupMyIssues(issues) {
    const known = new Set(MY_ISSUE_GROUPS.map(g => g.status));
    const groups = MY_ISSUE_GROUPS.map(g => ({ ...g, issues: issues.filter(i => i.status === g.status) }));
    const other = issues.filter(i => !known.has(i.status));
    if (other.length) groups.push({ status: 'other', label: 'Other', issues: other });
    return groups.filter(g => g.issues.length);
}

// React to project changes when dashboard is active (CHT-1083, CHT-1165)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'my-issues') return;
    loadMyIssues();
    loadSprintStatus();
    loadDashboardActivity();
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

// Monotonic request id — lets loadMyIssues() drop a response from a
// superseded request (rapid project/status-filter switching) instead of
// overwriting newer data with stale data (CHT-1211 review #3).
let loadMyIssuesRequestId = 0;

/**
 * Load issues assigned to the current user.
 */
export async function loadMyIssues() {
    const currentTeam = getCurrentTeam();
    const currentUser = getCurrentUser();

    if (!currentTeam || !currentUser) return;

    const requestId = ++loadMyIssuesRequestId;
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
        if (requestId !== loadMyIssuesRequestId) return; // a newer loadMyIssues() has since started — drop this stale response

        // Hold them in the order they render (grouped by status), so the
        // keyboard cursor and detail prev/next walk the list as it is shown.
        myIssues = groupMyIssues(issues).flatMap(g => g.issues);
        // Prev/next issue-detail nav context (CHT-1211 item 2) — issues
        // opened from the Dashboard should page through this list, not the
        // Issues-view-only global issues array. The request id only orders
        // loadMyIssues() against itself — also require that the Dashboard is
        // still the current view at response time, or a slow response
        // landing after the user navigated to another view would clobber
        // that view's fresher context (CHT-1211 review #2).
        if (getCurrentView() === 'my-issues') {
            setDetailNavContext(myIssues);
        }
        renderMyIssues();
    } catch (e) {
        if (requestId !== loadMyIssuesRequestId) return;
        // CHT-1224: showMyIssuesLoadingSkeleton() above must not be left on
        // screen forever on failure — same stuck-skeleton bug as issues-view.js's
        // loadIssues(), fixed the same way (persistent error + Retry cta).
        const list = document.getElementById('my-issues-list');
        if (list) {
            list.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.dashboard,
                heading: 'Failed to load issues',
                description: 'Check your connection and try again',
                cta: { label: 'Retry', action: 'retry-load-my-issues' },
                variant: 'error',
            });
        }
        showApiError('load issues', e);
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
        const projectId = getCurrentProject();
        dashboardActivities = await api.getTeamActivities(currentTeam.id, 0, 10, { projectId });
        renderDashboardActivity();
    } catch {
        if (container) {
            container.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.activity,
                heading: 'Failed to load activity',
                description: 'Check your connection and try again',
                variant: 'error',
            });
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
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.activity,
            heading: 'No recent activity',
            description: 'Create or update issues to see activity here',
        });
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

        const actor = formatActivityActor(activity);
        return `
        <div class="activity-item">
            <div class="activity-icon" aria-hidden="true">${getActivityIcon(activity.activity_type)}</div>
            <div class="activity-content">
                <span class="activity-text">${formatActivityText(activity)}${targetLink}</span>
                <span class="activity-actor">by ${escapeHtml(actor)}</span>
                <time class="activity-time" datetime="${escapeAttr(activity.created_at || '')}">${formatTimeAgo(activity.created_at)}</time>
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
    // Every writer (load, inline edits, live updates) lands here: hold the
    // issues in the order they render, so detail prev/next matches.
    const groups = groupMyIssues(myIssues);
    myIssues = groups.flatMap(g => g.issues);
    if (getCurrentView() === 'my-issues') setDetailNavContext(myIssues);
    selectedMyIssueIndex = -1;
    const count = document.getElementById('my-issues-count');
    if (count) count.textContent = myIssues.length ? String(myIssues.length) : '';

    if (myIssues.length === 0) {
        list.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.dashboard,
            heading: 'No issues assigned to you',
            description: 'Issues assigned to you will appear here',
        });
        return;
    }

    // A live update must not strand the keyboard user: note which row
    // control had focus and give it back after the rebuild (CHT-1293).
    const active = document.activeElement;
    const focusRowId = list.contains(active) ? active.closest('.issue-row')?.dataset.issueId : null;
    const focusType = focusRowId ? active.dataset?.dropdownType : null;

    list.innerHTML = groups.map(g => {
        const capped = COLLAPSIBLE.has(g.status) && !expandedGroups.has(g.status) && g.issues.length > DONE_PREVIEW;
        const shown = capped ? g.issues.slice(0, DONE_PREVIEW) : g.issues;
        return `
        <div class="dash-group" role="group" aria-labelledby="dash-group-${g.status}">
            <h4 class="dash-group-header" id="dash-group-${g.status}">
                <span class="dash-group-dot status-${g.status}" aria-hidden="true"></span>
                ${escapeHtml(g.label)} <span class="dash-group-count">${g.issues.length}</span>
            </h4>
            ${shown.map(issue => renderIssueRow(issue)).join('')}
            ${capped ? `<button type="button" class="dash-group-more" data-action="dash-show-all" data-status="${g.status}">Show all ${g.issues.length}</button>` : ''}
        </div>`;
    }).join('');

    if (focusRowId) {
        const row = [...list.querySelectorAll('.issue-row')].find(r => r.dataset.issueId === focusRowId);
        const el = row && (focusType ? row.querySelector(`[data-dropdown-type="${focusType}"]`) : row.querySelector('.issue-title'));
        el?.focus({ preventScroll: true });
    }

    // Put the keyboard cursor back on the issue it was on.
    if (selectedMyIssueId) {
        const rows = [...list.querySelectorAll('.issue-row')];
        const i = rows.findIndex(r => r.dataset.issueId === selectedMyIssueId);
        if (i !== -1) {
            rows[i].classList.add('keyboard-selected');
            selectedMyIssueIndex = i;
        }
    }
}

// ========================================
// Sprint Status Section (CHT-1128)
// ========================================

/**
 * Load and render active sprint status across all projects.
 */
// Monotonic request id — lets loadSprintStatus() drop a response from a
// superseded request (Retry racing the ambient project-switch subscriber
// above) instead of painting stale sprint cards (CHT-1224 PR #211 review
// finding 2; same pattern as loadMyIssues above / CHT-1211 review #3).
let loadSprintStatusRequestId = 0;
// The last load's results, so Show all / Show fewer re-renders without a refetch.
let lastSprintData = [];
// Which team/project the expanded state belongs to: a new scope starts collapsed.
let lastSprintScope = null;

export async function loadSprintStatus() {
    const container = document.getElementById('dashboard-sprint-status');
    if (!container) return;

    const requestId = ++loadSprintStatusRequestId;

    const currentProjectId = getCurrentProject();
    const scope = `${getCurrentTeam()?.id ?? ''}:${currentProjectId ?? ''}`;
    if (scope !== lastSprintScope) {
        lastSprintScope = scope;
        sprintRowsExpanded = false;
    }
    // Until this load lands, Show all has nothing current to re-render.
    lastSprintData = [];
    const allProjects = getProjects();
    const projects = currentProjectId
        ? allProjects.filter(p => p.id === currentProjectId)
        : allProjects;
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
                let countsFailed = false;
                // The many-projects list shows points only, so skip a
                // second request per project there (CHT-2027).
                if (!currentProjectId) return { project, sprint, statusCounts };
                try {
                    const issues = await api.getIssues({ sprint_id: sprint.id, project_id: project.id, limit: 500 });
                    for (const issue of issues) {
                        statusCounts[issue.status] = (statusCounts[issue.status] || 0) + 1;
                    }
                } catch (e) {
                    // CHT-1224: was a bare-empty ignore — a per-project issue-count
                    // fetch failure silently rendered the card with no status
                    // breakdown at all, indistinguishable from a sprint with no
                    // issues. Log it; the sprint card itself still renders below.
                    console.error(`Failed to load issue counts for sprint ${sprint.id}:`, e);
                    countsFailed = true;
                }
                return { project, sprint, statusCounts, countsFailed };
            } catch (e) {
                // CHT-1224: was a bare `catch { return null }` — a project whose
                // sprint fetch 500s looked identical to a project with no active
                // sprint. Logging at least makes the failure debuggable; the
                // project's card is still omitted (no sprint data to show).
                console.error(`Failed to load current sprint for project ${project.id}:`, e);
                return null;
            }
        });
        const results = (await Promise.all(sprintPromises)).filter(Boolean);
        if (requestId !== loadSprintStatusRequestId) return; // a newer loadSprintStatus() has since started — drop this stale response
        lastSprintData = results;
        renderSprintStatus(results, { single: !!currentProjectId });
    } catch (e) {
        if (requestId !== loadSprintStatusRequestId) return;
        // CHT-1224: was `container.innerHTML = ''` with zero indication — the
        // whole Sprint Status section just disappeared on failure. Render a
        // persistent error + Retry cta instead.
        console.error('Failed to load sprint status:', e);
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.dashboard,
            heading: "Couldn't load sprint status",
            description: 'Check your connection and try again',
            cta: { label: 'Retry', action: 'retry-load-sprint-status' },
            variant: 'error',
        });
    }
}

// How many rows the many-projects list shows before "Show all" (CHT-2027).
// Enough to see what needs attention; the rest of the rail stays in reach.
const SPRINT_ROWS_PREVIEW = 5;
let sprintRowsExpanded = false;

const SPRINT_STATUS_ORDER = ['done', 'in_review', 'in_progress', 'todo', 'backlog'];

/**
 * Budget facts for one sprint. A null budget is unlimited; 0 is a real
 * budget (any spend is arrears), matching Sprint.in_arrears on the server.
 */
export function describeSprintBudget(sprint) {
    const spent = sprint.points_spent || 0;
    const hasBudget = sprint.budget !== null && sprint.budget !== undefined;
    const budget = hasBudget ? sprint.budget : null;
    const overBudget = hasBudget && spent > budget;
    const pct = hasBudget ? (budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : (spent > 0 ? 100 : 0)) : null;
    const state = sprint.limbo ? 'limbo' : overBudget ? 'arrears' : (hasBudget && pct >= 80) ? 'near' : '';
    return { spent, budget, hasBudget, overBudget, pct, state };
}

/**
 * Order sprints by how much they need someone: limbo, then arrears, then
 * by how much of the budget is spent; unbudgeted sprints after, busiest
 * first. Ties keep the incoming (project) order.
 */
export function sortSprintsByAttention(sprintData) {
    const rank = ({ sprint }) => {
        const b = describeSprintBudget(sprint);
        if (sprint.limbo) return [0, 0];
        if (b.overBudget) return [1, -(b.spent - b.budget)];
        if (b.hasBudget) return [2, -b.pct];
        return [3, -b.spent];
    };
    return sprintData
        .map((d, i) => ({ d, r: rank(d), i }))
        .sort((a, b) => a.r[0] - b.r[0] || a.r[1] - b.r[1] || a.i - b.i)
        .map(x => x.d);
}

function sprintDaysRunning(sprint) {
    if (!sprint.activated_at) return null;
    const elapsed = Date.now() - new Date(sprint.activated_at);
    return Number.isFinite(elapsed) ? Math.max(0, Math.floor(elapsed / 86400000)) + 1 : null;
}

function sprintBudgetHeadline(b) {
    if (!b.hasBudget) return `<strong>${b.spent}</strong> pts spent <span class="sprint-focus-muted">· no budget</span>`;
    if (b.overBudget) return `<strong>${b.spent - b.budget}</strong> pts over budget <span class="sprint-focus-muted">· ${b.spent}/${b.budget}</span>`;
    return `<strong>${b.budget - b.spent}</strong> pts left <span class="sprint-focus-muted">· ${b.spent}/${b.budget}</span>`;
}

function sprintStateBadge(sprint, b) {
    if (sprint.limbo) return '<span class="sprint-status-badge limbo" title="Closed, waiting on sprint rituals">Limbo</span>';
    if (b.overBudget) return '<span class="sprint-status-badge arrears" title="Over budget: close the sprint to keep working">Arrears</span>';
    return '';
}

function sprintStateText(sprint, b) {
    if (sprint.limbo) return 'in limbo';
    if (b.overBudget) return 'in arrears';
    if (b.state === 'near') return 'nearly spent';
    return '';
}

function sprintActionAttrs(sprint) {
    return `data-action="view-sprint" data-sprint-id="${escapeAttr(sprint.id)}" data-sprint-url="/sprint/${escapeAttr(sprint.id)}"`;
}

/** One project's sprint, with room to say something (CHT-2027). */
function renderSprintFocus({ sprint, statusCounts, countsFailed }) {
    const b = describeSprintBudget(sprint);
    const counts = statusCounts || {};
    const total = Object.values(counts).reduce((a, n) => a + n, 0);
    const days = sprintDaysRunning(sprint);
    const issuesText = countsFailed ? 'Issue counts unavailable'
        : total ? `${total} issue${total === 1 ? '' : 's'}` : 'No issues planned';
    const meta = [days ? `Day ${days}` : '', issuesText].filter(Boolean).join(' · ');
    let note = '';
    if (sprint.limbo) note = 'Closed and waiting on sprint rituals before the next sprint starts.';
    else if (b.overBudget) note = 'Over budget. Close the sprint to keep moving tickets.';
    // Inner pieces are spans: a <button> may hold only phrasing content.
    return `
        <button type="button" class="sprint-focus ${b.state}" ${sprintActionAttrs(sprint)}>
            <span class="sprint-focus-top">
                <span class="sprint-focus-name">${escapeHtml(sprint.name)}</span>
                ${sprintStateBadge(sprint, b)}
                <span class="sprint-focus-meta">${escapeHtml(meta)}</span>
            </span>
            <span class="sprint-focus-headline">${sprintBudgetHeadline(b)}</span>
            ${b.hasBudget ? `
                <span class="sprint-progress-bar" aria-hidden="true"><span class="sprint-progress-fill ${b.state}" style="width: ${b.pct}%"></span></span>
            ` : ''}
            ${total ? `
                <span class="sprint-issue-breakdown">
                    <span class="sprint-stacked-bar" aria-hidden="true">
                        ${SPRINT_STATUS_ORDER.filter(s => counts[s]).map(s =>
                            `<span class="sprint-stacked-segment status-${s}" style="width: ${(counts[s] / total) * 100}%"></span>`
                        ).join('')}
                    </span>
                    <span class="sprint-status-counts">
                        ${SPRINT_STATUS_ORDER.filter(s => counts[s]).map(s =>
                            `<span class="sprint-count-label status-${s}">${counts[s]} ${formatStatus(s)}</span>`
                        ).join('')}
                    </span>
                </span>
            ` : ''}
            ${note ? `<span class="sprint-focus-note ${b.state}">${note}</span>` : ''}
        </button>
    `;
}

/** One line per project, so many projects fit in the rail (CHT-2027). */
function renderSprintRow({ project, sprint }) {
    const b = describeSprintBudget(sprint);
    const points = b.hasBudget ? `${b.spent}/${b.budget}` : `${b.spent}`;
    const stateText = sprintStateText(sprint, b);
    const title = `${project.name}: ${sprint.name}, ${b.hasBudget ? `${b.spent} of ${b.budget} pts` : `${b.spent} pts, no budget`}${stateText ? `, ${stateText}` : ''}`;
    return `
        <li>
            <button type="button" class="sprint-row ${b.state}" ${sprintActionAttrs(sprint)} title="${escapeAttr(title)}">
                <span class="sprint-row-dot ${b.state}" aria-hidden="true"></span>
                <span class="sprint-row-project">${escapeHtml(project.name)}</span>
                <span class="sprint-row-sprint">${escapeHtml(sprint.name)}</span>
                <span class="sprint-row-bar ${b.hasBudget ? '' : 'none'}" aria-hidden="true">${b.hasBudget ? `<span class="sprint-progress-fill ${b.state}" style="width: ${b.pct}%"></span>` : ''}</span>
                <span class="sprint-row-points">${points}<span class="sprint-row-unit"> pts</span>${b.hasBudget ? '' : '<span class="sr-only">, no budget</span>'}</span>
                ${stateText ? `<span class="sr-only">, ${stateText}</span>` : ''}
            </button>
        </li>
    `;
}

/**
 * Render the rail's sprint panel. One project gets a single card that says
 * what's left and what's in flight; several projects get one compact row
 * each, most in need of attention first, capped until expanded (CHT-2027).
 * @param {Array<{project, sprint, statusCounts}>} sprintData
 * @param {{single?: boolean}} [opts] single: one project is selected
 */
export function renderSprintStatus(sprintData, { single = sprintData.length === 1 && !!getCurrentProject() } = {}) {
    const container = document.getElementById('dashboard-sprint-status');
    if (!container) return;

    if (!sprintData.length) {
        container.innerHTML = '';
        return;
    }

    if (single) {
        container.innerHTML = `
            <div class="section-header">
                <h3>Current sprint</h3>
            </div>
            ${renderSprintFocus(sprintData[0])}
        `;
        return;
    }

    const sorted = sortSprintsByAttention(sprintData);
    const inLimbo = sorted.filter(({ sprint }) => sprint.limbo).length;
    const inArrears = sorted.filter(({ sprint }) => !sprint.limbo && describeSprintBudget(sprint).overBudget).length;
    const attention = [inArrears ? `${inArrears} in arrears` : '', inLimbo ? `${inLimbo} in limbo` : ''].filter(Boolean).join(' · ');
    const collapsible = sorted.length > SPRINT_ROWS_PREVIEW;
    const shown = sprintRowsExpanded ? sorted : sorted.slice(0, SPRINT_ROWS_PREVIEW);
    const hidden = sorted.length - shown.length;

    container.innerHTML = `
        <div class="section-header">
            <h3>Active sprints</h3>
            <span class="section-count">${sorted.length}</span>
            ${attention ? `<span class="sprint-attention">${attention}</span>` : ''}
        </div>
        <ul class="sprint-rows" id="dashboard-sprint-rows">
            ${shown.map(renderSprintRow).join('')}
        </ul>
        ${collapsible ? `<button type="button" class="dash-group-more sprint-rows-more" data-action="dash-sprints-toggle" aria-expanded="${sprintRowsExpanded}" aria-controls="dashboard-sprint-rows">${hidden > 0 ? `Show all ${sorted.length}` : 'Show fewer'}</button>` : ''}
    `;
}

/** For tests: reset the many-projects list to collapsed. */
export function resetSprintRowsExpanded() {
    sprintRowsExpanded = false;
    lastSprintData = [];
    lastSprintScope = null;
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
    'retry-load-my-issues': () => loadMyIssues(),
    'dash-show-all': (event, dataset) => {
        expandedGroups.add(dataset.status);
        renderMyIssues();
    },
    'retry-load-sprint-status': () => loadSprintStatus(),
    'dash-sprints-toggle': () => {
        if (!lastSprintData.length) return; // a load is in flight; its render will settle the list
        sprintRowsExpanded = !sprintRowsExpanded;
        renderSprintStatus(lastSprintData, { single: false });
        // The re-render replaced the button: keep keyboard focus on it.
        document.querySelector('#dashboard-sprint-status [data-action="dash-sprints-toggle"]')?.focus();
    },
    // view-document action is registered in documents.js
});
