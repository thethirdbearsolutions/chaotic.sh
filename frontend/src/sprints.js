/**
 * Sprints module
 *
 * Handles sprint list view, sprint detail view, CRUD operations,
 * limbo management, and sprint caching.
 */

import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getEstimateScaleHint, getProjects } from './projects.js';
import { formatTimeAgo, escapeHtml, escapeAttr } from './utils.js';
import { getCurrentTeam, getCurrentProject, getCurrentView, subscribe, setDetailNavContext, setSelectedSprintIndex } from './state.js';
import { registerActions } from './event-delegation.js';
import { navigateTo, saveScrollPosition } from './router.js';
import { OPEN_STATUSES, BOARD_STATUSES } from './constants.js';
import { renderMarkdown } from './gate-approvals.js';
import { approveRitual, completeGateRitual } from './rituals-view.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { viewIssue } from './issue-detail-view.js';
import { viewDocument, showCreateSprintDocumentModal } from './documents.js';
import { lastResult, rememberResult, resultKey, sameResult } from './last-result.js';

// State
let sprints = [];
let sprintCache = {}; // sprint_id -> sprint object
let sprintCacheLoadedProjects = new Set();
let limboStatus = null;
let currentSprintDetail = null; // For sprint detail view
let currentSprintIssues = []; // Issues in current sprint detail
let currentSprintDocuments = []; // Documents in current sprint detail
let currentSprintTransactions = []; // Budget transactions for current sprint

// Getters/setters for state access from other modules
export function getSprints() {
    return sprints;
}

export function setSprints(newSprints) {
    sprints = newSprints;
}

export function getSprintCache() {
    return sprintCache;
}

export function getCurrentSprintDetail() {
    return currentSprintDetail;
}

export function getLimboStatus() {
    return limboStatus;
}

// ============================================================================
// Sprint List View
// ============================================================================

// React to project changes when sprints view is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'sprints') return;
    loadSprints();
});

// Monotonic request id — lets loadSprints() drop a response from a
// superseded request (Retry racing the ambient project-switch subscriber
// above) instead of painting the wrong project's sprints (CHT-1224 PR #211
// review finding 2; same pattern as viewSprint below / CHT-1211 item 7).
let loadSprintsRequestId = 0;

// Resolves false when the sprints could not be fetched (the list then shows
// its own error state); anything else means the list is current or a newer
// load superseded this one. `fromMemory`: entering the view, paint what it
// showed last time for this project at once (CHT-1973); off for a reload
// after a change, which would repaint the state before it.
export async function loadSprints({ fromMemory = false } = {}) {
    // Reset the keyboard cursor before the skeleton wipe destroys the selected
    // card — a stale index would positionally clamp into the re-rendered list
    // and Enter could open the wrong sprint (CHT-1291 review; mirrors loadBoard).
    setSelectedSprintIndex(-1);
    const projectId = getCurrentProject();
    if (!projectId) {
        const list = document.getElementById('sprints-list');
        if (list) {
            list.innerHTML = `
                <div class="empty-state">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its sprints</p>
                </div>
            `;
        }
        return;
    }

    const requestId = ++loadSprintsRequestId;

    invalidateSprintCache();

    // A revisit paints the sprints shown last time for this project at
    // once, and the requests below refresh them (CHT-1973). Else the
    // loading skeleton (CHT-1160).
    const list = document.getElementById('sprints-list');
    const key = resultKey();
    const shown = fromMemory ? lastResult('sprints', key) : undefined;
    if (shown) {
        sprints = shown;
        renderSprints();
    } else if (list) {
        list.innerHTML = Array(3).fill(0).map(() => `
            <div class="skeleton-list-item">
                <div style="flex: 1">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-meta" style="margin-top: 6px;"></div>
                </div>
            </div>
        `).join('');
    }

    try {
        // GET /current creates the project's sprints when it has none; the
        // list does not. Both go out at once, and only a list without an
        // active sprint (the first visit to a new project) is asked for
        // again: in series they cost a round trip every visit (CHT-1973).
        const [, firstList] = await Promise.all([
            api.getCurrentSprint(projectId),
            api.getSprints(projectId),
        ]);
        const fetched = firstList.some(s => s.status === 'active')
            ? firstList
            : await api.getSprints(projectId);
        if (requestId !== loadSprintsRequestId) return; // a newer loadSprints() has since started — drop this stale response

        const unchanged = shown && sameResult(sprints, fetched);
        sprints = fetched;
        rememberResult('sprints', key, fetched);
        if (!unchanged) renderSprints();
        await loadLimboStatus();
    } catch (e) {
        if (requestId !== loadSprintsRequestId) return;
        // CHT-1224: the copy said "try again" but shipped no button — add the
        // cta the helper already supports, wired to re-run loadSprints().
        if (list) list.innerHTML = renderEmptyState({ icon: EMPTY_ICONS.sprints, heading: 'Failed to load sprints', description: 'Check your connection and try again', cta: { label: 'Retry', action: 'retry-load-sprints' }, variant: 'error' });
        showApiError('load sprints', e);
        return false;
    }
    return true;
}

export function renderSprints() {
    const list = document.getElementById('sprints-list');
    if (!list) return;

    const now = sprints.find(s => s.status === 'active');
    const next = sprints.find(s => s.status === 'planned');
    const completed = sprints.filter(s => s.status === 'completed');

    let html = '';

    // Now Sprint (prominent)
    if (now) {
        const budgetDisplay = now.budget
            ? `${now.points_spent || 0} / ${now.budget} points`
            : 'No budget set';
        const arrears = now.budget && (now.points_spent || 0) > now.budget;

        html += `
            <div class="sprint-card sprint-now ${now.limbo ? 'sprint-limbo' : ''} ${arrears ? 'sprint-arrears' : ''}"
                 data-action="view-sprint" data-sprint-id="${escapeAttr(now.id)}" data-sprint-url="/sprint/${escapeAttr(now.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${now.limbo ? '<span class="badge badge-limbo">IN LIMBO</span>' : ''}
                    ${arrears ? '<span class="badge badge-arrears">IN ARREARS</span>' : ''}
                </div>
                <div class="sprint-card-title">${escapeHtml(now.name)}</div>
                <div class="sprint-card-budget ${arrears ? 'budget-arrears' : ''}">
                    ${budgetDisplay}
                </div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${escapeAttr(now.id)}" data-sprint-name="${escapeAttr(now.name)}" data-budget="${now.budget || ''}" data-project-id="${escapeAttr(now.project_id)}">Edit Sprint</button>
                    ${now.limbo ? `
                        <button class="btn btn-primary btn-small" data-action="show-limbo-details-modal">View Rituals</button>
                    ` : `
                        <button class="btn btn-primary btn-small" data-action="show-close-sprint-confirmation" data-sprint-id="${escapeAttr(now.id)}">Close Sprint</button>
                    `}
                </div>
            </div>
        `;

        html += renderSprintBurndown(now);
    }

    // Next Sprint
    if (next) {
        // Whether the planned budget follows the project default or was
        // set by hand (CHT-1701); unknown on a server without the flag.
        const budgetSource = next.budget_explicit === true ? 'set by hand'
            : next.budget_explicit === false ? 'follows project default'
            : '';
        const budgetDisplay = (next.budget
            ? `${next.budget} point budget`
            : 'No budget set')
            + (budgetSource ? ` <span class="text-muted">· ${budgetSource}</span>` : '');

        html += `
            <div class="sprint-card sprint-next" data-action="view-sprint" data-sprint-id="${escapeAttr(next.id)}" data-sprint-url="/sprint/${escapeAttr(next.id)}" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${escapeHtml(next.name)}</div>
                <div class="sprint-card-budget">${budgetDisplay}</div>
                <div class="sprint-card-actions" data-action="stop-propagation">
                    <button class="btn btn-secondary btn-small" data-action="show-edit-budget-modal" data-sprint-id="${escapeAttr(next.id)}" data-sprint-name="${escapeAttr(next.name)}" data-budget="${next.budget || ''}" data-project-id="${escapeAttr(next.project_id)}">Edit Sprint</button>
                    ${next.budget_explicit === true ? `
                        <button class="btn btn-secondary btn-small" data-action="follow-default-budget" data-sprint-id="${escapeAttr(next.id)}" title="Drop the hand-set budget: this sprint takes the project default and follows later changes to it">Follow project default</button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Completed Sprints (collapsed)
    if (completed.length > 0) {
        html += `
            <details class="sprint-history">
                <summary>Completed Sprints (${completed.length})</summary>
                <div class="sprint-history-list">
                    ${completed.map(s => `
                        <div class="sprint-history-item" data-action="view-sprint" data-sprint-id="${escapeAttr(s.id)}" data-sprint-url="/sprint/${escapeAttr(s.id)}" style="cursor: pointer;">
                            <span class="sprint-history-name">${escapeHtml(s.name)}</span>
                            <span class="sprint-history-budget">${s.points_spent || 0}${s.budget ? ` / ${s.budget}` : ''} pts</span>
                        </div>
                    `).join('')}
                </div>
            </details>
        `;
    }

    list.innerHTML = html || renderEmptyState({
        icon: EMPTY_ICONS.sprints,
        heading: 'No sprints yet',
        description: 'Sprints are created automatically when you close the current one, or you can create one from the project settings.',
    });
}

// A sprint has no scheduled dates (CHT-1366): it ends when its budget is
// spent and it is closed, however long that takes. "Progress" is therefore
// points spent against budget, full stop -- there is no time axis to plot
// it against, so a burndown chart here would be a line drawn through its own
// definition. activated_at/closed_at say when that turned out to happen.
export function describeSprintSpan(sprint) {
    if (!sprint.activated_at) return '';
    const start = new Date(sprint.activated_at);
    const end = sprint.closed_at ? new Date(sprint.closed_at) : new Date();
    const days = Math.max(1, Math.round((end - start) / 86400000));
    const span = sprint.closed_at
        ? `activated ${formatDate(sprint.activated_at)}, closed ${formatDate(sprint.closed_at)} (${days} day${days === 1 ? '' : 's'})`
        : `activated ${formatDate(sprint.activated_at)}, ${days} day${days === 1 ? '' : 's'} so far`;
    return span;
}

export function renderSprintBurndown(sprint) {
    const hasBudget = sprint.budget !== null && sprint.budget !== undefined;
    if (!hasBudget) {
        return `
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Progress</h4>
                    <span class="text-muted">Set a sprint budget to see progress; a spent budget ends a sprint, not a date</span>
                </div>
            </div>
        `;
    }

    const total = sprint.budget;
    const spent = sprint.points_spent || 0;
    const remaining = Math.max(total - spent, 0);
    const pct = Math.min(Math.round((spent / total) * 100), 100);
    const stateClass = spent > total ? ' arrears' : (sprint.limbo ? ' limbo' : '');
    const stateNote = spent > total
        ? `in arrears by ${spent - total} pt${spent - total === 1 ? '' : 's'}: close the sprint to continue`
        : (sprint.limbo ? 'closed, waiting on sprint rituals' : `${remaining} of ${total} pts remaining`);

    return `
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Progress</h4>
                <div class="sprint-burndown-meta">
                    <span>${escapeHtml(describeSprintSpan(sprint)) || 'not yet activated'}</span>
                    <span>${escapeHtml(stateNote)}</span>
                </div>
            </div>
            <div class="sprint-status-progress" role="progressbar" aria-label="Sprint budget spent"
                 aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${Math.min(spent, total)}">
                <div class="sprint-progress-bar">
                    <div class="sprint-progress-fill${stateClass}" style="width: ${pct}%"></div>
                </div>
                <span class="text-muted">${spent}/${total} pts</span>
            </div>
        </div>
    `;
}

// ============================================================================
// Sprint Detail View (CHT-464)
// ============================================================================

// Monotonic request id — lets viewSprint() drop a response from a superseded
// request (rapid navigation between sprints) instead of overwriting newer
// data with stale data (CHT-1211 review #3).
let viewSprintRequestId = 0;

export async function viewSprint(sprintId, pushHistory = true) {
    try {
        // Record the list's scroll position before we replace it with detail
        // content, so Back can restore it (CHT-1211 item 1).
        if (pushHistory) saveScrollPosition();

        const requestId = ++viewSprintRequestId;
        const viewAtEntry = getCurrentView();

        // Fetch sprint details
        const sprint = await api.getSprint(sprintId);
        if (requestId !== viewSprintRequestId) return; // a newer viewSprint() has since started — drop this stale response
        if (!sprint) {
            showToast('Sprint not found', 'error');
            navigateTo('sprints');
            return;
        }

        currentSprintDetail = sprint;

        // Fetch issues, transactions, and documents for this sprint in parallel
        const teamId = getCurrentTeam()?.id;
        const [issues, transactions, documents] = await Promise.all([
            api.getIssues({ sprint_id: sprintId, limit: 500 }),
            // CHT-1224: was a bare `.catch(() => [])` — a failed fetch silently
            // degraded to "sprint has no transactions", indistinguishable from
            // the true empty case. Logging at minimum makes it debuggable.
            api.getSprintTransactions(sprintId).catch(e => { console.error('Failed to load sprint transactions:', e); return []; }),
            teamId ? api.getDocuments(teamId, sprint.project_id, null, sprintId).catch(e => { console.error('Failed to load sprint documents:', e); return []; }) : [],
        ]);
        if (requestId !== viewSprintRequestId) return; // guard again — a newer request may have started during the awaits above

        currentSprintIssues = issues;
        currentSprintTransactions = transactions;
        currentSprintDocuments = documents;
        // Prev/next issue-detail nav context (CHT-1211 item 2) — issues
        // opened from a sprint's issue list should page through this list,
        // not the Issues-view-only global issues array. The request id only
        // orders viewSprint() against itself — also require that the user
        // hasn't navigated to a different view while the fetches were in
        // flight, or this slow response would clobber the fresher context
        // that view has since written (CHT-1211 review #2).
        if (getCurrentView() === viewAtEntry) {
            setDetailNavContext(currentSprintIssues);
        }

        // Update URL and history
        if (pushHistory) {
            history.pushState({ sprintId, view: 'sprint' }, '', `/sprint/${sprintId}`);
        }

        // Show sprint detail view
        renderSprintDetail();
    } catch (e) {
        console.error('Failed to load sprint:', e);
        showToast('Failed to load sprint', 'error');
        navigateTo('sprints');
    }
}

export async function viewSprintByPath(sprintId) {
    // Validate sprint ID format (UUID)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!sprintId || !uuidPattern.test(sprintId)) {
        showToast('Invalid sprint ID', 'error');
        navigateTo('sprints', false);
        return;
    }

    try {
        await viewSprint(sprintId, false);
    } catch {
        navigateTo('sprints', false);
    }
}

function renderSprintDetail() {
    const sprint = currentSprintDetail;
    const issues = currentSprintIssues;

    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    // Show sprint detail view (create if doesn't exist)
    let view = document.getElementById('sprint-detail-view');
    if (!view) {
        view = document.createElement('div');
        view.id = 'sprint-detail-view';
        view.className = 'view';
        document.querySelector('.main-content').appendChild(view);
    }
    view.classList.remove('hidden');

    // Compute where Back should return to, the same way issue/epic detail do
    // (CHT-1211 item 3/4) — was hardcoded to 'sprints', a dead end when a
    // sprint is opened from elsewhere (e.g. a future Dashboard link).
    const backView = getCurrentView() || 'sprints';

    // Separate issues by status
    const openIssues = issues.filter(i => OPEN_STATUSES.includes(i.status));
    const closedIssues = issues.filter(i => i.status === 'done');
    const canceledIssues = issues.filter(i => i.status === 'canceled');

    // Calculate stats. A canceled issue is not work anyone will do, so it
    // is out of the sprint's scope total (CHT-1762); it also never charges
    // the budget, which only a close to done does (CLAUDE.md).
    const sumPoints = list => list.reduce((sum, i) => sum + (i.estimate || 0), 0);
    const scopePoints = sumPoints(issues.filter(i => i.status !== 'canceled'));
    const completedPoints = sumPoints(closedIssues);
    const canceledNote = canceledIssues.length > 0
        ? `<div class="stat-note">${canceledIssues.length} canceled not counted</div>`
        : '';

    // Status label
    let statusBadge = '';
    if (sprint.status === 'active') {
        statusBadge = '<span class="badge badge-status-active">Active</span>';
    } else if (sprint.status === 'planned') {
        statusBadge = '<span class="badge badge-status-planned">Planned</span>';
    } else if (sprint.status === 'completed') {
        statusBadge = '<span class="badge badge-status-completed">Completed</span>';
    }

    // Budget display
    const budgetDisplay = sprint.budget
        ? `${sprint.points_spent || 0} / ${sprint.budget} points`
        : `${sprint.points_spent || 0} points spent`;

    view.innerHTML = `
        <div class="sprint-detail-header">
            <div class="sprint-detail-nav">
                <button class="btn btn-secondary btn-small" data-action="navigate-to" data-view="${escapeAttr(backView)}">
                    \u2190 Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${escapeHtml(sprint.name)}</h2>
                ${statusBadge}
                ${sprint.limbo ? '<span class="badge badge-limbo">IN LIMBO</span>' : ''}
            </div>
            ${sprint.activated_at ? `
                <div class="sprint-detail-dates">
                    ${escapeHtml(describeSprintSpan(sprint))}
                </div>
            ` : ''}
        </div>

        <div class="sprint-detail-stats">
            <div class="stat-card">
                <div class="stat-value">${openIssues.length}</div>
                <div class="stat-label">Open Issues</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${closedIssues.length}</div>
                <div class="stat-label">Completed</div>
            </div>
            <button type="button" class="stat-card stat-card-link" data-action="scroll-to-budget-ledger"
                title="Show the budget ledger: one transaction each time an issue moved to done while this sprint was active">
                <div class="stat-value">${budgetDisplay}</div>
                <div class="stat-label">Budget spent</div>
                <div class="stat-note">See ledger \u2193</div>
            </button>
            <div class="stat-card">
                <div class="stat-value">${completedPoints} / ${scopePoints}</div>
                <div class="stat-label">Points done of scope</div>
                ${canceledNote}
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${openIssues.length})</h3>
                ${openIssues.length === 0 ? renderEmptyState({
                    icon: EMPTY_ICONS.issues,
                    heading: 'No open issues',
                    description: 'All issues in this sprint are completed',
                }) : `
                    <div class="sprint-issues-list">
                        ${openIssues.map(issue => renderSprintIssueRow(issue)).join('')}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${closedIssues.length > 0 ? 'open' : ''}>
                <summary><h3>Completed Issues (${closedIssues.length})</h3></summary>
                ${closedIssues.length === 0 ? renderEmptyState({
                    icon: EMPTY_ICONS.issues,
                    heading: 'No completed issues',
                    description: 'Issues will appear here once marked done',
                }) : `
                    <div class="sprint-issues-list">
                        ${closedIssues.map(issue => renderSprintIssueRow(issue)).join('')}
                    </div>
                `}
            </details>

            ${canceledIssues.length > 0 ? `
                <details class="sprint-detail-section">
                    <summary><h3>Canceled Issues (${canceledIssues.length})</h3></summary>
                    <div class="sprint-issues-list">
                        ${canceledIssues.map(issue => renderSprintIssueRow(issue)).join('')}
                    </div>
                </details>
            ` : ''}

            <div class="sprint-detail-section sprint-budget-section" id="sprint-budget-ledger">
                <h3>Budget Ledger</h3>
                ${renderBudgetLedger()}
            </div>

            <div class="sprint-detail-section">
                <div class="sprint-section-header">
                    <h3>Documents (${currentSprintDocuments.length})</h3>
                    <button class="btn btn-secondary btn-small" data-action="create-sprint-document"
                        data-sprint-id="${escapeAttr(sprint.id)}"
                        data-project-id="${escapeAttr(sprint.project_id)}">
                        + New Document
                    </button>
                </div>
                ${currentSprintDocuments.length > 0 ? `
                    <div class="sprint-issues-list">
                        ${currentSprintDocuments.map(doc => renderSprintDocumentRow(doc)).join('')}
                    </div>
                ` : renderEmptyState({
                    icon: EMPTY_ICONS.documents,
                    heading: 'No documents yet',
                    description: 'Create a sprint document to get started',
                })}
            </div>
        </div>
    `;
}

function renderSprintIssueRow(issue) {
    // Sanitize values for use in class names (only allow known values)
    const validPriorities = ['urgent', 'high', 'medium', 'low'];
    const safePriority = validPriorities.includes(issue.priority) ? issue.priority : '';
    const safeStatus = [...BOARD_STATUSES, 'canceled'].includes(issue.status) ? issue.status : 'backlog';

    const priorityClass = safePriority ? `badge-priority-${safePriority}` : '';
    const statusClass = `status-dot-${safeStatus}`;

    return `
        <div class="sprint-issue-row" data-action="navigate-sprint-issue" data-issue-id="${escapeAttr(issue.id)}" data-issue-url="/issue/${encodeURIComponent(issue.identifier)}">
            <span class="status-dot ${statusClass}"></span>
            <span class="sprint-issue-identifier">${escapeHtml(issue.identifier)}</span>
            <span class="sprint-issue-title">${escapeHtml(issue.title)}</span>
            <span class="sprint-issue-meta">
                ${safePriority ? `<span class="badge ${priorityClass}">${formatPriority(safePriority)}</span>` : ''}
                ${issue.estimate != null ? `<span class="badge badge-estimate">${issue.estimate}pt</span>` : ''}
            </span>
        </div>
    `;
}

function renderSprintDocumentRow(doc) {
    const icon = escapeHtml(doc.icon) || '\u{1F4C4}';
    return `
        <div class="sprint-issue-row" data-action="navigate-sprint-document" data-document-id="${escapeAttr(doc.id)}" data-document-url="/document/${escapeAttr(encodeURIComponent(doc.id))}">
            <span class="sprint-issue-identifier">${icon}</span>
            <span class="sprint-issue-title">${escapeHtml(doc.title || 'Untitled')}</span>
            <span class="sprint-issue-meta">
                <span class="text-muted">${formatTimeAgo(doc.created_at)}</span>
            </span>
        </div>
    `;
}

function renderBudgetLedger() {
    const transactions = currentSprintTransactions;

    if (!transactions || transactions.length === 0) {
        return `
            <div class="empty-state-small">
                <p>No budget transactions yet. Points are recorded when issues are marked done.</p>
            </div>
        `;
    }

    // Calculate total
    const totalPoints = transactions.reduce((sum, t) => sum + t.points, 0);

    return `
        <div class="budget-ledger">
            <div class="budget-ledger-header">
                <span class="text-muted">${transactions.length} transaction${transactions.length === 1 ? '' : 's'}</span>
                <span class="budget-ledger-total">${totalPoints} points total</span>
            </div>
            <div class="budget-ledger-list">
                ${transactions.map(t => `
                    <div class="budget-ledger-item">
                        <div class="ledger-item-info">
                            <span class="ledger-item-identifier">${escapeHtml(t.issue_identifier)}</span>
                            <span class="ledger-item-title">${escapeHtml(t.issue_title)}</span>
                        </div>
                        <div class="ledger-item-meta">
                            <span class="ledger-item-points">-${t.points} pt</span>
                            <span class="ledger-item-date">${formatDateShort(t.created_at)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function formatDateShort(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// ============================================================================
// Sprint CRUD Operations
// ============================================================================

export function showEditBudgetModal(sprintId, sprintName, currentBudget, projectId) {
    const scaleHint = projectId ? getEstimateScaleHint(projectId) : '';
    document.getElementById('modal-title').textContent = `Edit Sprint: ${sprintName}`;
    document.getElementById('modal-content').innerHTML = `
        <form data-action="handle-update-budget" data-sprint-id="${escapeAttr(sprintId)}" data-project-id="${escapeAttr(projectId)}" data-current-budget="${escapeAttr(currentBudget ?? '')}">
            <div class="form-group">
                <label for="sprint-name">Name</label>
                <input type="text" id="sprint-name" value="${escapeAttr(sprintName)}" placeholder="Sprint name">
            </div>
            <div class="form-group">
                <label for="sprint-budget">Point Budget</label>
                <input type="number" id="sprint-budget" min="1" value="${currentBudget || ''}" placeholder="Leave empty for unlimited">
                <small class="form-hint">Set a point budget to track velocity. When exceeded, sprint enters arrears.</small>
                ${scaleHint ? `<small class="form-hint">${escapeHtml(scaleHint)}</small>` : ''}
            </div>
            <div class="form-group">
                <label>Apply to:</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="this" checked>
                        This sprint only
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="planned">
                        This sprint + planned sprints
                    </label>
                    <label class="radio-label">
                        <input type="radio" name="budget-scope" value="default">
                        Also set as project default
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `;
    showModal();
}

export async function handleUpdateBudget(event, sprintId, projectId) {
    event.preventDefault();
    const nameInput = document.getElementById('sprint-name')?.value?.trim();
    const budgetInput = document.getElementById('sprint-budget').value;
    const budget = budgetInput ? parseInt(budgetInput) : null;
    const scope = document.querySelector('input[name="budget-scope"]:checked')?.value || 'this';
    // The budget the modal opened with. Sending `budget` marks a sprint's
    // budget as set by hand, which stops a planned sprint from following
    // the project default (CHT-1495), so it is sent only when it changed.
    const openedWith = document.querySelector('form[data-action="handle-update-budget"]')?.dataset.currentBudget;
    const originalBudget = openedWith ? parseInt(openedWith) : null;
    const budgetChanged = budget !== originalBudget;
    const sprint = sprints.find(s => s.id === sprintId);

    try {
        const updateData = {};
        if (nameInput) updateData.name = nameInput;
        // Setting the project default already moves every planned sprint
        // that follows it, this one included, so such a sprint is not
        // pinned to the value as well. A planned sprint whose budget was
        // already set by hand (budget_explicit) does not follow the
        // default, so it still gets the budget sent.
        const followsDefault = scope === 'default'
            && sprint?.status === 'planned'
            && sprint?.budget_explicit === false;
        if (budgetChanged && !followsDefault) updateData.budget = budget;
        if (Object.keys(updateData).length) {
            await api.updateSprint(sprintId, updateData);
        }

        if (scope === 'planned') {
            // An explicit choice to give the other planned sprints this
            // budget by hand.
            const plannedSprints = sprints.filter(s => s.status === 'planned' && s.id !== sprintId);
            for (const planned of plannedSprints) {
                await api.updateSprint(planned.id, { budget });
            }
        }

        if (scope === 'default' && projectId) {
            // The server gives the new default to every planned sprint
            // whose budget was not set by hand.
            await api.updateProject(projectId, { default_sprint_budget: budget });
        }

        await loadSprints();
        closeModal();

        const scopeMsg = scope === 'planned' ? ' (and planned sprints)' :
                         scope === 'default' ? ' (and set as project default)' : '';
        showToast(`Budget updated${scopeMsg}!`, 'success');
    } catch (e) {
        showApiError('update budget', e);
    }
    return false;
}

// Shown when following the default leaves the sprint with no budget; the
// same warning `chaotic sprint budget --default` prints (PR #391 review L1).
export const UNLIMITED_DEFAULT_WARNING = 'The project has no default sprint budget, so this sprint '
    + '(and later sprints that follow the default) will have no budget and arrears will not apply. '
    + 'Set a default in the project settings.';

/**
 * Make a planned sprint whose budget was set by hand follow the project
 * default budget again (CHT-1708), via the API's budget_follows_default.
 *
 * No modal: the change is undone by setting the budget again in Edit
 * Sprint, and the success toast names the old value for that. The one
 * consequential case, a project with no default (the sprint becomes
 * unlimited and arrears stop applying), is confirmed before sending when
 * the client knows the default is unset.
 */
export async function followDefaultBudget(sprintId, button = null) {
    const sprint = sprints.find(s => s.id === sprintId);
    const project = sprint ? getProjects().find(p => p.id === sprint.project_id) : null;
    if (project && project.default_sprint_budget === null
        && !confirm(`${UNLIMITED_DEFAULT_WARNING}\n\nFollow the project default anyway?`)) {
        return;
    }
    const describe = (budget) => (budget === null || budget === undefined ? 'unlimited' : `${budget} points`);

    if (button) button.disabled = true;
    let result;
    try {
        result = await api.updateSprint(sprintId, { budget_follows_default: true });
    } catch (e) {
        showApiError('reset budget to project default', e);
        if (button) button.disabled = false;
        // The usual failure is a sprint activated meanwhile; reload so the
        // stale NEXT card and its button go away (review on #397).
        try { await loadSprints(); } catch { /* loadSprints reports its own errors */ }
        return;
    }

    const name = result?.name || sprint?.name || 'Sprint';
    const was = sprint && 'budget' in sprint ? ` (was ${describe(sprint.budget)})` : '';
    // The PATCH succeeded, so a failed reload is still a success, with a
    // note (review on #397).
    let reloaded;
    try {
        reloaded = (await loadSprints()) !== false;
    } catch {
        reloaded = false;
    }
    showToast(
        `'${name}' follows the project default budget again: ${describe(result?.budget)}${was}.`
        + (reloaded ? '' : ' Refresh to see it.'),
        'success',
    );
    if (result?.budget === null || result?.budget === undefined) {
        showToast(UNLIMITED_DEFAULT_WARNING, 'warning');
    }
}

export async function showCloseSprintConfirmation(sprintId) {
    const sprint = sprints.find(s => s.id === sprintId);
    if (!sprint) return;

    document.getElementById('modal-title').textContent = 'Close Sprint';
    document.getElementById('modal-content').innerHTML = `
        <div style="text-align: center; padding: 12px 0;">
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Loading sprint details...</p>
        </div>
    `;
    showModal();

    const incompleteStatuses = OPEN_STATUSES;
    let incompleteCount = 0;
    let hasRituals = false;
    let loadFailed = false;

    try {
        const [sprintIssues, projectRituals] = await Promise.all([
            api.getIssues({ sprint_id: sprintId, limit: 500 }),
            api.getRituals(sprint.project_id),
        ]);
        incompleteCount = sprintIssues.filter(i => incompleteStatuses.includes(i.status)).length;
        hasRituals = projectRituals.some(r => r.is_active && r.trigger === 'every_sprint');
    } catch (e) {
        console.error('Failed to load sprint details:', e);
        loadFailed = true;
    }

    const spent = sprint.points_spent || 0;
    const budgetLine = sprint.budget !== null && sprint.budget !== undefined
        ? `<strong>${spent}</strong> / <strong>${sprint.budget}</strong> points spent`
        : `<strong>${spent}</strong> points spent (no budget)`;

    document.getElementById('modal-content').innerHTML = `
        <div class="close-sprint-confirmation">
            <div class="info-box" style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
                <p style="margin-bottom: 8px; font-size: 14px;"><strong>${escapeHtml(sprint.name)}</strong></p>
                <p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">${budgetLine}</p>
                ${loadFailed
                    ? `<p style="margin-bottom: 4px; font-size: 13px; color: var(--warning-color, #f59e0b);">Could not load issue details</p>`
                    : incompleteCount > 0
                        ? `<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);"><strong>${incompleteCount}</strong> incomplete issue${incompleteCount === 1 ? '' : 's'} will migrate to next sprint</p>`
                        : `<p style="margin-bottom: 4px; font-size: 13px; color: var(--text-secondary);">No incomplete issues</p>`
                }
                ${hasRituals
                    ? `<p style="margin-top: 8px; font-size: 13px; color: var(--accent-color);">Sprint will enter <strong>limbo</strong> until rituals are attested</p>`
                    : ''
                }
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="btn btn-secondary" data-action="close-modal">Cancel</button>
                <button class="btn btn-primary" data-action="confirm-close-sprint" data-sprint-id="${escapeAttr(sprintId)}">Close Sprint</button>
            </div>
        </div>
    `;
}

export async function completeSprint(sprintId) {
    try {
        const result = await api.closeSprint(sprintId);
        await loadSprints();
        // Completing a sprint can change which sprint is "current" for its
        // project — clear the cached current-sprint id so the next lookup
        // re-resolves instead of pointing at the now-completed sprint (CHT-1212)
        clearCachedCurrentSprintIds();

        if (result.limbo) {
            showLimboModal(result);
        } else {
            showToast('Sprint completed!', 'success');
        }
    } catch (e) {
        showApiError('complete sprint', e);
    }
}

// ============================================================================
// Limbo Management
// ============================================================================

export async function loadLimboStatus() {
    const projectId = getCurrentProject();
    if (!projectId) return;

    try {
        limboStatus = await api.getLimboStatus(projectId);
        renderLimboBanner();
    } catch (e) {
        console.error('Failed to load limbo status:', e);
    }
}

function renderLimboBanner() {
    const existing = document.getElementById('limbo-banner');
    if (existing) existing.remove();

    if (!limboStatus || !limboStatus.in_limbo) return;

    const banner = document.createElement('div');
    banner.id = 'limbo-banner';
    banner.className = 'limbo-banner';
    banner.innerHTML = `
        <div class="limbo-banner-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span><strong>Sprint in Limbo</strong> - ${limboStatus.pending_rituals.length} ritual(s) pending</span>
            <button class="btn btn-small" data-action="show-limbo-details-modal">View Details</button>
        </div>
    `;

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(banner, mainContent.firstChild);
    }
}

function showLimboModal(sprint) {
    const projectId = getCurrentProject();
    document.getElementById('modal-title').textContent = 'Sprint In Limbo';
    document.getElementById('modal-content').innerHTML = `
        <div class="limbo-modal">
            <div class="limbo-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <strong>Sprint "${escapeHtml(sprint.name)}" is now in limbo.</strong>
                    <p>Complete all pending rituals to activate the next sprint.</p>
                </div>
            </div>
            <div id="limbo-rituals-list" class="limbo-rituals">
                <p class="loading">Loading rituals...</p>
            </div>
            <button type="button" class="btn btn-primary" data-action="dismiss-limbo-modal">Got it</button>
        </div>
    `;
    showModal();
    loadLimboRituals(projectId);
}

async function loadLimboRituals(projectId) {
    try {
        const status = await api.getLimboStatus(projectId);
        const container = document.getElementById('limbo-rituals-list');
        if (!container) return;

        if (status.pending_rituals.length === 0) {
            container.innerHTML = '<p>No pending rituals.</p>';
            return;
        }

        container.innerHTML = status.pending_rituals.map(r => `
            <div class="limbo-ritual-item">
                <div class="ritual-status">
                    ${r.attestation ?
                        (r.attestation.approved_at ?
                            '<span class="ritual-done">\u2713</span>' :
                            '<span class="ritual-pending">\u23F3</span>') :
                        '<span class="ritual-todo">\u25CB</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${escapeHtml(r.name)} <span class="ritual-mode">(${escapeHtml(r.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${renderMarkdown(r.prompt)}</div>
                    ${renderAttestationNote(r.attestation)}
                </div>
            </div>
        `).join('');
    } catch (e) {
        console.error('Failed to load limbo rituals:', e);
    }
}

export function showLimboDetailsModal() {
    if (!limboStatus) return;

    const projectId = getCurrentProject();

    document.getElementById('modal-title').textContent = 'Limbo Status';
    document.querySelector('.modal')?.classList.add('modal-wide');
    document.getElementById('modal-content').innerHTML = `
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${limboStatus.pending_rituals.map(r => `
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${r.attestation ?
                                    (r.attestation.approved_at ? '\u2713' : '\u23F3') :
                                    '\u25CB'}
                            </span>
                            <strong>${escapeHtml(r.name)}</strong>
                            <span class="badge badge-ritual-${escapeAttr(r.approval_mode)}">${escapeHtml(r.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${renderMarkdown(r.prompt)}</div>
                        ${renderAttestationNote(r.attestation)}
                        ${renderRitualActions(r, projectId)}
                    </div>
                `).join('')}
            </div>
            ${limboStatus.completed_rituals?.length > 0 ? `
                <h4>Completed</h4>
                <div class="completed-rituals">
                    ${limboStatus.completed_rituals.map(r => `
                        <div class="completed-ritual">
                            <div class="completed-ritual-header">\u2713 ${escapeHtml(r.name)}</div>
                            ${renderAttestationNote(r.attestation)}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    showModal();
}

// Render attestation note inline for sprint rituals.
// Unlike ticket rituals (which surface notes in the comment stream),
// sprint rituals display notes inline because there is no sprint comment stream.
function renderAttestationNote(attestation) {
    if (!attestation || !attestation.note) return '';
    return `
        <div class="ritual-attestation-note">
            <div class="attestation-note-header">
                <span class="attestation-by">${escapeHtml(attestation.attested_by_name || 'Unknown')}</span>
                ${attestation.attested_at ? `<span class="attestation-time">${escapeHtml(formatTimeAgo(attestation.attested_at))}</span>` : ''}
            </div>
            <div class="attestation-note-content markdown-body">${renderMarkdown(attestation.note)}</div>
        </div>
    `;
}

function renderRitualActions(ritual, projectId) {
    if (ritual.attestation && ritual.attestation.approved_at) {
        return '<div class="ritual-actions"><span class="text-success">Completed</span></div>';
    }

    if (ritual.attestation && !ritual.attestation.approved_at) {
        return `
            <div class="ritual-actions">
                <span class="text-warning">Pending approval</span>
                <button class="btn btn-small btn-primary" data-action="approve-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-project-id="${escapeAttr(projectId)}">Approve</button>
            </div>
        `;
    }

    if (ritual.approval_mode === 'gate') {
        return `
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" data-action="complete-gate-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-project-id="${escapeAttr(projectId)}" data-ritual-name="${escapeAttr(ritual.name)}" data-ritual-artifact="${escapeAttr(ritual.artifact || '')}">Complete</button>
            </div>
        `;
    }

    return '<div class="ritual-actions"><span class="text-muted">Awaiting agent attestation</span></div>';
}

// ============================================================================
// Sprint Cache (for group-by-sprint in issue list)
// ============================================================================

export async function ensureSprintCacheForIssues(projectIds) {
    for (const pid of projectIds) {
        if (!sprintCacheLoadedProjects.has(pid)) {
            try {
                const projectSprints = await api.getSprints(pid);
                projectSprints.forEach(s => { sprintCache[s.id] = s; });
                sprintCacheLoadedProjects.add(pid);
            } catch (e) {
                console.error('Failed to load sprints for project', pid, e);
            }
        }
    }
}

export function invalidateSprintCache() {
    sprintCache = {};
    sprintCacheLoadedProjects = new Set();
    currentSprintIssues = [];
    currentSprintTransactions = [];
    currentSprintDocuments = [];
    currentSprintIdByProject = {};
}

export function updateSprintCacheForProject(projectId, sprintList) {
    sprintList.forEach(s => { sprintCache[s.id] = s; });
    sprintCacheLoadedProjects.add(projectId);
}

// ============================================================================
// Current (active) Sprint id cache, per project (CHT-1212)
//
// The Issues filter's "Current Sprint" option re-resolved the active sprint
// id from scratch on every loadIssues() call — including every 300ms
// debounce tick while typing in search — even though updateSprintFilter()
// (issues-render.js) already resolves this same value moments earlier and
// it essentially never changes mid-session. Cache it here, keyed by
// project, so loadIssues() can reuse it instead of re-fetching sprints.
// ============================================================================

let currentSprintIdByProject = {}; // project_id -> active sprint id, or null if none

/**
 * Returns the cached active-sprint id for a project, `null` if the project
 * was checked and has no active sprint, or `undefined` if not yet cached.
 */
export function getCachedCurrentSprintId(projectId) {
    return currentSprintIdByProject[projectId];
}

export function setCachedCurrentSprintId(projectId, sprintId) {
    currentSprintIdByProject[projectId] = sprintId ?? null;
}

/**
 * Drop all cached current-sprint ids so the next lookup re-resolves.
 * Called when any sprint changes — locally (completeSprint) or remotely
 * (ws-handlers' sprint events), since a sprint completing/rotating in
 * another client can change which sprint is "current" here too (CHT-1212).
 */
export function clearCachedCurrentSprintIds() {
    currentSprintIdByProject = {};
}

// ============================================================================
// Event delegation actions
// ============================================================================

registerActions({
    'retry-load-sprints': () => loadSprints(),
    'view-sprint': (event, data) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
            window.open(data.sprintUrl, '_blank');
            return;
        }
        viewSprint(data.sprintId);
    },
    // Exists so closest('[data-action]') finds this wrapper before the parent
    // card's view-sprint action when clicking whitespace between buttons.
    'stop-propagation': () => {},
    'show-edit-budget-modal': (_event, data) => {
        const budget = data.budget ? parseFloat(data.budget) : null;
        showEditBudgetModal(data.sprintId, data.sprintName, budget, data.projectId);
    },
    'follow-default-budget': (_event, data, target) => {
        followDefaultBudget(data.sprintId, target);
    },
    'show-limbo-details-modal': () => {
        showLimboDetailsModal();
    },
    'show-close-sprint-confirmation': (_event, data) => {
        showCloseSprintConfirmation(data.sprintId);
    },
    'handle-update-budget': (event, data) => {
        handleUpdateBudget(event, data.sprintId, data.projectId);
    },
    'close-modal': () => {
        closeModal();
    },
    'confirm-close-sprint': (_event, data, target) => {
        target.disabled = true;
        closeModal();
        completeSprint(data.sprintId);
    },
    'dismiss-limbo-modal': () => {
        closeModal();
        loadLimboStatus();
    },
    'approve-ritual': (_event, data) => {
        approveRitual(data.ritualId, data.projectId);
    },
    'complete-gate-ritual': (_event, data) => {
        completeGateRitual(data.ritualId, data.projectId, data.ritualName, data.ritualArtifact || '');
    },
    'scroll-to-budget-ledger': () => {
        document.getElementById('sprint-budget-ledger')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    'navigate-sprint-issue': (event, data) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
            window.open(data.issueUrl, '_blank');
            return;
        }
        viewIssue(data.issueId);
    },
    'create-sprint-document': async (_event, data) => {
        await showCreateSprintDocumentModal(data.sprintId, data.projectId, () => {
            // Refresh sprint detail to show the new document
            viewSprint(data.sprintId, false);
        });
    },
    'navigate-sprint-document': (event, data) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
            window.open(data.documentUrl, '_blank');
            return;
        }
        viewDocument(data.documentId);
    },
});

// ============================================================================
// Utility functions
// ============================================================================

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatPriority(priority) {
    const labels = { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' };
    return labels[priority] || priority;
}
