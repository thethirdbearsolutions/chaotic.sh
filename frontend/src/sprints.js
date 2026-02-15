/**
 * Sprints module
 *
 * Handles sprint list view, sprint detail view, CRUD operations,
 * limbo management, and sprint caching.
 */

import { api } from './api.js';
import { showModal, closeModal, showToast } from './ui.js';
import { getProjects, getEstimateScaleHint, setGlobalProjectSelection } from './projects.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';
import { formatTimeAgo, escapeJsString, escapeHtml, escapeAttr } from './utils.js';

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

export function getLimboStatus() {
    return limboStatus;
}

// ============================================================================
// Sprint List View
// ============================================================================

export function updateSprintProjectFilter() {
    const filter = document.getElementById('sprint-project-filter');
    if (!filter) return;
    if (!filter.value) {
        // Read from URL first, then localStorage
        const saved = getProjectFromUrl();
        if (saved && getProjects().some(p => p.id === saved)) {
            filter.value = saved;
        }
    }
    if (filter.value) {
        loadSprints(filter.value);
    } else {
        document.getElementById('sprints-list').innerHTML = `
            <div class="empty-state">
                <h3>Select a project</h3>
                <p>Choose a project to view its sprints</p>
            </div>
        `;
    }
}

export function onSprintProjectChange() {
    const projectId = document.getElementById('sprint-project-filter').value;
    if (projectId) {
        setGlobalProjectSelection(projectId);
        updateUrlWithProject(projectId);
    }
    loadSprints(projectId);
}

export async function loadSprints(projectIdParam) {
    const projectId = projectIdParam || document.getElementById('sprint-project-filter').value;
    if (!projectId) return;

    invalidateSprintCache();

    try {
        await api.getCurrentSprint(projectId);
        sprints = await api.getSprints(projectId);
        renderSprints();
        await loadLimboStatus();
    } catch (e) {
        showToast(e.message, 'error');
    }
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
                 onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${escapeJsString(now.id)}'); } else { window.open('/sprint/${now.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NOW</div>
                    ${now.limbo ? '<span class="badge badge-limbo">IN LIMBO</span>' : ''}
                    ${arrears ? '<span class="badge badge-arrears">IN ARREARS</span>' : ''}
                </div>
                <div class="sprint-card-title">${escapeHtml(now.name)}</div>
                <div class="sprint-card-budget ${arrears ? 'budget-arrears' : ''}">
                    ${budgetDisplay}
                </div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${escapeJsString(now.id)}', '${escapeJsString(now.name)}', ${now.budget || 'null'}, '${escapeJsString(now.project_id)}')">Edit Budget</button>
                    ${now.limbo ? `
                        <button class="btn btn-primary btn-small" onclick="showLimboDetailsModal()">View Rituals</button>
                    ` : `
                        <button class="btn btn-primary btn-small" onclick="showCloseSprintConfirmation('${escapeJsString(now.id)}')">Close Sprint</button>
                    `}
                </div>
            </div>
        `;

        html += renderSprintBurndown(now);
    }

    // Next Sprint
    if (next) {
        const budgetDisplay = next.budget
            ? `${next.budget} point budget`
            : 'No budget set';

        html += `
            <div class="sprint-card sprint-next" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${escapeJsString(next.id)}'); } else { window.open('/sprint/${next.id}', '_blank'); }" style="cursor: pointer;">
                <div class="sprint-card-header">
                    <div class="sprint-card-label">NEXT</div>
                </div>
                <div class="sprint-card-title">${escapeHtml(next.name)}</div>
                <div class="sprint-card-budget">${budgetDisplay}</div>
                <div class="sprint-card-actions" onclick="event.stopPropagation();">
                    <button class="btn btn-secondary btn-small" onclick="showEditBudgetModal('${escapeJsString(next.id)}', '${escapeJsString(next.name)}', ${next.budget || 'null'}, '${escapeJsString(next.project_id)}')">Edit Budget</button>
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
                        <div class="sprint-history-item" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewSprint('${escapeJsString(s.id)}'); } else { window.open('/sprint/${s.id}', '_blank'); }" style="cursor: pointer;">
                            <span class="sprint-history-name">${escapeHtml(s.name)}</span>
                            <span class="sprint-history-budget">${s.points_spent || 0}${s.budget ? ` / ${s.budget}` : ''} pts</span>
                        </div>
                    `).join('')}
                </div>
            </details>
        `;
    }

    list.innerHTML = html || `
        <div class="empty-state">
            <h3>No sprints yet</h3>
            <p>Sprints are created automatically when you close the current one, or you can create one from the project settings.</p>
        </div>
    `;
}

function renderSprintBurndown(sprint) {
    const hasDates = sprint.start_date && sprint.end_date;
    const hasBudget = sprint.budget !== null && sprint.budget !== undefined;
    if (!hasDates || !hasBudget) {
        return `
            <div class="sprint-burndown-card">
                <div class="sprint-burndown-header">
                    <h4>Burndown</h4>
                    <span class="text-muted">Set sprint dates and budget to see burndown</span>
                </div>
            </div>
        `;
    }

    const total = sprint.budget;
    const spent = sprint.points_spent || 0;
    const remaining = Math.max(total - spent, 0);
    const start = new Date(sprint.start_date);
    const end = new Date(sprint.end_date);
    const now = new Date();
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
    const progress = clamp((now - start) / (end - start), 0, 1);

    const width = 360;
    const height = 120;
    const pad = 16;
    const x0 = pad;
    const x1 = width - pad;
    const y0 = pad;
    const y1 = height - pad;

    const yFor = (value) => {
        if (total === 0) return y1;
        return y0 + (1 - value / total) * (y1 - y0);
    };

    const idealStartY = yFor(total);
    const idealEndY = yFor(0);
    const actualX = x0 + (x1 - x0) * progress;
    const actualY = yFor(remaining);

    return `
        <div class="sprint-burndown-card">
            <div class="sprint-burndown-header">
                <h4>Burndown</h4>
                <div class="sprint-burndown-meta">
                    <span>${formatDate(sprint.start_date)} → ${formatDate(sprint.end_date)}</span>
                    <span>${remaining} of ${total} pts remaining</span>
                </div>
            </div>
            <svg viewBox="0 0 ${width} ${height}" class="sprint-burndown-chart" role="img" aria-label="Sprint burndown chart">
                <line x1="${x0}" y1="${idealStartY}" x2="${x1}" y2="${idealEndY}" class="burndown-ideal" />
                <line x1="${x0}" y1="${idealStartY}" x2="${actualX}" y2="${actualY}" class="burndown-actual" />
                <circle cx="${actualX}" cy="${actualY}" r="4" class="burndown-actual-point" />
            </svg>
        </div>
    `;
}

// ============================================================================
// Sprint Detail View (CHT-464)
// ============================================================================

export async function viewSprint(sprintId, pushHistory = true) {
    try {
        // Fetch sprint details
        const sprint = await api.getSprint(sprintId);
        if (!sprint) {
            showToast('Sprint not found', 'error');
            window.navigateTo('sprints');
            return;
        }

        currentSprintDetail = sprint;

        // Fetch issues, transactions, and documents for this sprint in parallel
        const teamId = window.currentTeam?.id;
        const [issues, transactions, documents] = await Promise.all([
            api.getIssues({ sprint_id: sprintId, limit: 500 }),
            api.getSprintTransactions(sprintId).catch(() => []),
            teamId ? api.getDocuments(teamId, sprint.project_id, null, sprintId).catch(() => []) : [],
        ]);
        currentSprintIssues = issues;
        currentSprintTransactions = transactions;
        currentSprintDocuments = documents;

        // Update URL and history
        if (pushHistory) {
            history.pushState({ sprintId, view: 'sprint' }, '', `/sprint/${sprintId}`);
        }

        // Show sprint detail view
        renderSprintDetail();
    } catch (e) {
        console.error('Failed to load sprint:', e);
        showToast('Failed to load sprint', 'error');
        window.navigateTo('sprints');
    }
}

export async function viewSprintByPath(sprintId) {
    // Validate sprint ID format (UUID)
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!sprintId || !uuidPattern.test(sprintId)) {
        showToast('Invalid sprint ID', 'error');
        window.navigateTo('sprints', false);
        return;
    }

    try {
        await viewSprint(sprintId, false);
    } catch {
        window.navigateTo('sprints', false);
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

    // Separate issues by status
    const openStatuses = ['backlog', 'todo', 'in_progress', 'in_review'];
    const openIssues = issues.filter(i => openStatuses.includes(i.status));
    const closedIssues = issues.filter(i => i.status === 'done');

    // Calculate stats
    const totalPoints = issues.reduce((sum, i) => sum + (i.estimate || 0), 0);
    const completedPoints = closedIssues.reduce((sum, i) => sum + (i.estimate || 0), 0);

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
                <button class="btn btn-secondary btn-small" onclick="navigateTo('sprints')">
                    ← Back to Sprints
                </button>
            </div>
            <div class="sprint-detail-title-row">
                <h2>${escapeHtml(sprint.name)}</h2>
                ${statusBadge}
                ${sprint.limbo ? '<span class="badge badge-limbo">IN LIMBO</span>' : ''}
            </div>
            ${sprint.start_date && sprint.end_date ? `
                <div class="sprint-detail-dates">
                    ${formatDate(sprint.start_date)} → ${formatDate(sprint.end_date)}
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
            <div class="stat-card">
                <div class="stat-value">${budgetDisplay}</div>
                <div class="stat-label">Budget</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${completedPoints} / ${totalPoints}</div>
                <div class="stat-label">Points Done</div>
            </div>
        </div>

        <div class="sprint-detail-sections">
            <div class="sprint-detail-section">
                <h3>Open Issues (${openIssues.length})</h3>
                ${openIssues.length === 0 ? `
                    <div class="empty-state-small">No open issues in this sprint</div>
                ` : `
                    <div class="sprint-issues-list">
                        ${openIssues.map(issue => renderSprintIssueRow(issue)).join('')}
                    </div>
                `}
            </div>

            <details class="sprint-detail-section" ${closedIssues.length > 0 ? 'open' : ''}>
                <summary><h3>Completed Issues (${closedIssues.length})</h3></summary>
                ${closedIssues.length === 0 ? `
                    <div class="empty-state-small">No completed issues yet</div>
                ` : `
                    <div class="sprint-issues-list">
                        ${closedIssues.map(issue => renderSprintIssueRow(issue)).join('')}
                    </div>
                `}
            </details>

            <div class="sprint-detail-section sprint-budget-section">
                <h3>Budget Ledger</h3>
                ${renderBudgetLedger()}
            </div>

            ${currentSprintDocuments.length > 0 ? `
            <div class="sprint-detail-section">
                <h3>Documents (${currentSprintDocuments.length})</h3>
                <div class="sprint-issues-list">
                    ${currentSprintDocuments.map(doc => renderSprintDocumentRow(doc)).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

function renderSprintIssueRow(issue) {
    // Sanitize values for use in class names (only allow known values)
    const validPriorities = ['urgent', 'high', 'medium', 'low'];
    const validStatuses = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];
    const safePriority = validPriorities.includes(issue.priority) ? issue.priority : '';
    const safeStatus = validStatuses.includes(issue.status) ? issue.status : 'backlog';

    const priorityClass = safePriority ? `badge-priority-${safePriority}` : '';
    const statusClass = `status-dot-${safeStatus}`;

    return `
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${escapeJsString(issue.id)}'); } else { window.open('/issue/${encodeURIComponent(issue.identifier)}', '_blank'); }">
            <span class="status-dot ${statusClass}"></span>
            <span class="sprint-issue-identifier">${escapeHtml(issue.identifier)}</span>
            <span class="sprint-issue-title">${escapeHtml(issue.title)}</span>
            <span class="sprint-issue-meta">
                ${safePriority ? `<span class="badge ${priorityClass}">${formatPriority(safePriority)}</span>` : ''}
                ${issue.estimate ? `<span class="badge badge-estimate">${issue.estimate}pt</span>` : ''}
            </span>
        </div>
    `;
}

function renderSprintDocumentRow(doc) {
    const icon = escapeHtml(doc.icon) || '📄';
    return `
        <div class="sprint-issue-row" onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewDocument('${escapeJsString(doc.id)}'); } else { window.open('/document/${encodeURIComponent(doc.id)}', '_blank'); }">
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
        <form onsubmit="return handleUpdateBudget(event, '${escapeJsString(sprintId)}', '${escapeJsString(projectId)}')">
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
            <button type="submit" class="btn btn-primary">Save Budget</button>
        </form>
    `;
    showModal();
}

export async function handleUpdateBudget(event, sprintId, projectId) {
    event.preventDefault();
    const budgetInput = document.getElementById('sprint-budget').value;
    const budget = budgetInput ? parseInt(budgetInput) : null;
    const scope = document.querySelector('input[name="budget-scope"]:checked')?.value || 'this';

    try {
        // Always update this sprint
        await api.updateSprint(sprintId, { budget });

        // Handle cascade options
        if (scope === 'planned' || scope === 'default') {
            // Update planned sprints too
            const plannedSprints = sprints.filter(s => s.status === 'planned' && s.id !== sprintId);
            for (const sprint of plannedSprints) {
                await api.updateSprint(sprint.id, { budget });
            }
        }

        if (scope === 'default' && projectId) {
            // Also update project default
            await api.updateProject(projectId, { default_sprint_budget: budget });
        }

        await loadSprints();
        closeModal();

        const scopeMsg = scope === 'planned' ? ' (and planned sprints)' :
                         scope === 'default' ? ' (and set as project default)' : '';
        showToast(`Budget updated${scopeMsg}!`, 'success');
    } catch (e) {
        showToast(`Failed to update budget: ${e.message}`, 'error');
    }
    return false;
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

    const incompleteStatuses = ['backlog', 'todo', 'in_progress', 'in_review'];
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
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="this.disabled = true; closeModal(); completeSprint('${escapeJsString(sprintId)}')">Close Sprint</button>
            </div>
        </div>
    `;
}

export async function completeSprint(sprintId) {
    try {
        const result = await api.closeSprint(sprintId);
        await loadSprints();

        if (result.limbo) {
            showLimboModal(result);
        } else {
            showToast('Sprint completed!', 'success');
        }
    } catch (e) {
        showToast(`Failed to complete sprint: ${e.message}`, 'error');
    }
}

// ============================================================================
// Limbo Management
// ============================================================================

export async function loadLimboStatus() {
    const projectId = document.getElementById('sprint-project-filter')?.value;
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
            <button class="btn btn-small" onclick="showLimboDetailsModal()">View Details</button>
        </div>
    `;

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.insertBefore(banner, mainContent.firstChild);
    }
}

function showLimboModal(sprint) {
    const projectId = document.getElementById('sprint-project-filter').value;
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
            <button type="button" class="btn btn-primary" onclick="closeModal(); loadLimboStatus();">Got it</button>
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
                            '<span class="ritual-done">✓</span>' :
                            '<span class="ritual-pending">⏳</span>') :
                        '<span class="ritual-todo">○</span>'}
                </div>
                <div class="ritual-info">
                    <div class="ritual-name">${escapeHtml(r.name)} <span class="ritual-mode">(${escapeHtml(r.approval_mode)})</span></div>
                    <div class="ritual-prompt markdown-body">${window.renderMarkdown ? window.renderMarkdown(r.prompt) : escapeHtml(r.prompt)}</div>
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

    const projectId = document.getElementById('sprint-project-filter')?.value ||
                      document.getElementById('ritual-project-filter')?.value;

    document.getElementById('modal-title').textContent = 'Limbo Status';
    document.getElementById('modal-content').innerHTML = `
        <div class="limbo-details">
            <p>Complete all pending rituals to exit limbo and activate the next sprint.</p>
            <div class="limbo-rituals-detail">
                ${limboStatus.pending_rituals.map(r => `
                    <div class="limbo-ritual-detail-item">
                        <div class="ritual-header">
                            <span class="ritual-status-icon">
                                ${r.attestation ?
                                    (r.attestation.approved_at ? '✓' : '⏳') :
                                    '○'}
                            </span>
                            <strong>${escapeHtml(r.name)}</strong>
                            <span class="badge badge-ritual-${escapeAttr(r.approval_mode)}">${escapeHtml(r.approval_mode)}</span>
                        </div>
                        <div class="ritual-prompt markdown-body">${window.renderMarkdown ? window.renderMarkdown(r.prompt) : escapeHtml(r.prompt)}</div>
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
                            <div class="completed-ritual-header">✓ ${escapeHtml(r.name)}</div>
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
            <div class="attestation-note-content markdown-body">${window.renderMarkdown ? window.renderMarkdown(attestation.note) : escapeHtml(attestation.note)}</div>
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
                <button class="btn btn-small btn-primary" onclick="approveRitual('${escapeJsString(ritual.id)}', '${escapeJsString(projectId)}')">Approve</button>
            </div>
        `;
    }

    if (ritual.approval_mode === 'gate') {
        return `
            <div class="ritual-actions">
                <button class="btn btn-small btn-primary" onclick="completeGateRitual('${escapeJsString(ritual.id)}', '${escapeJsString(projectId)}', '${escapeJsString(ritual.name)}')">Complete</button>
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
}

export function updateSprintCacheForProject(projectId, sprintList) {
    sprintList.forEach(s => { sprintCache[s.id] = s; });
    sprintCacheLoadedProjects.add(projectId);
}

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
