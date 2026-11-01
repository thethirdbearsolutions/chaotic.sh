/**
 * Epics module - Epics list view: progress toward each goal (CHT-831, CHT-1902)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { navigateToEpicByIdentifier } from './router.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getProjects } from './projects.js';
import { getCurrentTeam, getCurrentProject, getCurrentView, subscribe, setSelectedEpicIndex } from './state.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

// Last-loaded epics list, exposed so epic-detail-view.js can build prev/next
// navigation the same way issue-detail-view.js does for issues (CHT-1211 item 6).
let currentEpics = [];

/**
 * Get the epics list from the most recent loadEpics() call.
 * @returns {Array}
 */
export function getCurrentEpics() {
    return currentEpics;
}

// React to project changes when epics view is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'epics') return;
    loadEpics();
});

// Monotonic request id — lets loadEpics() drop a response from a superseded
// request (rapid project switching) instead of overwriting newer data with
// stale data (CHT-1211 review #3).
let loadEpicsRequestId = 0;

const CLOSED = new Set(['done', 'canceled']);

// Whether closed epics are listed; per page load, like the board's filters.
let showClosed = false;

/** Test hook: forget the closed-epics toggle. */
export function resetEpicsViewState() {
    showClosed = false;
}

/**
 * Load and render the epics list view.
 */
export async function loadEpics() {
    // Reset the keyboard cursor before the skeleton wipe destroys the selected
    // row — a stale index would positionally clamp into the re-rendered list
    // and Enter could open the wrong epic (CHT-1291 review; mirrors loadBoard).
    setSelectedEpicIndex(-1);
    const listEl = document.getElementById('epics-list');
    if (!listEl) return;

    const requestId = ++loadEpicsRequestId;

    // Show loading skeleton (CHT-1047)
    listEl.innerHTML = Array(4).fill(0).map(() => `
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
                <div style="display: flex; gap: 8px; margin-top: 4px;">
                    <div class="skeleton skeleton-badge"></div>
                    <div class="skeleton skeleton-badge" style="width: 100px"></div>
                    <div class="skeleton skeleton-badge"></div>
                </div>
            </div>
        </div>
    `).join('');

    try {
        if (!getCurrentTeam()?.id) {
            currentEpics = [];
            listEl.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.projects,
                heading: 'Select a team',
                description: 'Choose a team to view its epics',
            });
            return;
        }

        // One read for every epic's progress (CHT-1902); this view used to
        // fetch each epic's sub-issues separately.
        const projectId = getCurrentProject();
        const progress = projectId
            ? await api.getProjectEpicProgress(projectId)
            : await api.getTeamEpicProgress(getCurrentTeam().id);
        if (requestId !== loadEpicsRequestId) return; // a newer loadEpics() has since started — drop this stale response

        if (!progress?.epics?.length) {
            currentEpics = [];
            listEl.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.epics,
                heading: 'No epics found',
                description: 'Epics help you organize related issues into larger goals',
                cta: { label: 'Create epic', action: 'showCreateEpicModal' },
            });
            return;
        }

        renderEpics(progress, listEl);
    } catch (e) {
        if (requestId !== loadEpicsRequestId) return;
        listEl.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.epics,
            heading: 'Failed to load epics',
            description: 'Check your connection and try again',
            cta: { label: 'Retry', action: 'retry-load-epics' },
            variant: 'error',
        });
        showApiError('load epics', e);
    }
}

function plural(n, word) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
}

/**
 * Progress bar: done, then in progress or review, out of every ticket
 * that is not canceled.
 */
function renderProgress(epic) {
    const c = epic.children || {};
    const total = (c.total || 0) - (c.canceled || 0);
    if (total <= 0) {
        return '<span class="epic-progress-text">No tickets</span>';
    }
    const donePct = Math.round(((c.done || 0) / total) * 100);
    const activePct = Math.round((((c.in_progress || 0) + (c.in_review || 0)) / total) * 100);
    const complete = c.done === total;
    const title = `${c.done || 0} done, ${(c.in_progress || 0) + (c.in_review || 0)} in progress, `
        + `${(c.todo || 0) + (c.backlog || 0)} not started`
        + (c.canceled ? `, ${c.canceled} canceled` : '');
    return `
        <div class="epic-progress-bar-container" title="${escapeAttr(title)}">
            <div class="epic-progress-bar">
                <div class="epic-progress-fill${complete ? ' epic-progress-complete' : ''}" style="width: ${donePct}%"></div>
                <div class="epic-progress-active" style="width: ${Math.min(activePct, 100 - donePct)}%"></div>
            </div>
            <span class="epic-progress-pct">${Math.round(((c.done || 0) / total) * 100)}%</span>
            <span class="epic-progress-text">${c.done || 0}/${total}</span>
        </div>
    `;
}

/**
 * One bar per recent sprint, oldest first, the active sprint last: the
 * points each sprint moved toward this goal. Sprints are the clock.
 */
export function renderSprintStrip(sprints) {
    if (!sprints || sprints.length === 0) {
        return '<span class="text-muted">-</span>';
    }
    const max = Math.max(1, ...sprints.map(s => s.points || 0));
    const bars = sprints.map(s => {
        const h = s.points ? Math.max(15, Math.round((s.points / max) * 100)) : 0;
        const label = `${s.name}${s.status === 'active' ? ' (current)' : ''}: `
            + `${plural(s.closed || 0, 'ticket')} closed, ${s.points || 0} pts`;
        return `<span class="epic-sprint-tick${s.status === 'active' ? ' epic-sprint-current' : ''}" title="${escapeAttr(label)}"><span class="epic-sprint-fill" style="height: ${h}%"></span></span>`;
    }).join('');
    return `<span class="epic-sprint-strip" aria-label="Points closed per sprint">${bars}</span>`;
}

function renderThisSprint(closed, points) {
    if (!closed) return '<span class="text-muted">-</span>';
    return `<span class="epic-this-sprint">+${closed} <span class="text-muted">(${points} pts)</span></span>`;
}

function renderEpicRow(epic) {
    const pinned = epic.status_pinned && !CLOSED.has(epic.status)
        ? ' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎</span>'
        : '';
    const points = (epic.points_total || 0) > 0
        ? `${epic.points_done || 0}/${epic.points_total} pts`
        : '-';
    const empty = ticketTotal(epic) <= 0;
    return `
        <tr class="epic-row${CLOSED.has(epic.status) ? ' epic-row-closed' : ''}${empty ? ' epic-row-empty' : ''}" data-identifier="${escapeAttr(epic.identifier)}">
            <td class="epic-identifier">${escapeHtml(epic.identifier)}</td>
            <td class="epic-title">${escapeHtml(epic.title)}${pinned}</td>
            <td class="epic-progress">${renderProgress(epic)}</td>
            <td class="epic-points">${points}</td>
            <td class="epic-sprint">${renderThisSprint(epic.closed_this_sprint, epic.points_this_sprint)}</td>
            <td class="epic-sprints">${renderSprintStrip(epic.sprints)}</td>
        </tr>
    `;
}

// Work under no epic: the gap a default epic and require_epic_on_close
// close (CHT-1900). Not an .epic-row, so the keyboard cursor skips it.
function renderUntrackedRow(u) {
    if (!u || (!u.open && !u.closed_this_sprint && !(u.sprints || []).some(s => s.closed))) return '';
    return `
        <tr class="epic-untracked-row">
            <td class="epic-identifier">${escapeHtml(u.project_key)}</td>
            <td class="epic-title text-muted">No epic</td>
            <td class="epic-progress"><span class="epic-progress-text">${plural(u.open || 0, 'open ticket')}</span></td>
            <td class="epic-points"></td>
            <td class="epic-sprint">${renderThisSprint(u.closed_this_sprint, u.points_this_sprint)}</td>
            <td class="epic-sprints">${renderSprintStrip(u.sprints)}</td>
        </tr>
    `;
}

function ticketTotal(epic) {
    const c = epic.children || {};
    return (c.total || 0) - (c.canceled || 0);
}

function donePct(epic) {
    const total = ticketTotal(epic);
    return total > 0 ? (epic.children?.done || 0) / total : 0;
}

// The state groups, in reading order (CHT-1964). An epic's status is
// derived from its tickets (CHT-1901), so these read as "moving",
// "queued", "not started" and "finished".
const STATUS_GROUPS = [
    { key: 'active', label: 'In progress', statuses: ['in_progress', 'in_review'] },
    { key: 'todo', label: 'Todo', statuses: ['todo'] },
    { key: 'backlog', label: 'Backlog', statuses: ['backlog'] },
    { key: 'closed', label: 'Closed', statuses: ['done', 'canceled'] },
];

function statusGroupOf(epic) {
    const status = epic.status || 'backlog';
    return STATUS_GROUPS.find(g => g.statuses.includes(status)) || STATUS_GROUPS[2];
}

/**
 * Order inside a state group: what moved this sprint first, then the
 * furthest along; epics with no tickets last.
 */
function compareEpics(a, b) {
    const emptyA = ticketTotal(a) <= 0;
    const emptyB = ticketTotal(b) <= 0;
    if (emptyA !== emptyB) return emptyA ? 1 : -1;
    const moved = (b.points_this_sprint || 0) - (a.points_this_sprint || 0);
    if (moved) return moved;
    const closed = (b.closed_this_sprint || 0) - (a.closed_this_sprint || 0);
    if (closed) return closed;
    return donePct(b) - donePct(a);
}

/**
 * Epics of one project (or of everything, in a single-project view) in
 * state groups, each sorted by compareEpics. Returns [{group, epics}].
 */
function groupByState(epics) {
    return STATUS_GROUPS
        .map(group => ({ group, epics: epics.filter(e => statusGroupOf(e) === group).sort(compareEpics) }))
        .filter(g => g.epics.length);
}

/**
 * The readout above the table: how the open goals stand and what this
 * sprint moved (CHT-1964). Counts open epics only.
 */
function renderSummary(all, untracked) {
    const open = all.filter(e => !CLOSED.has(e.status));
    if (!open.length) return '';
    const moving = open.filter(e => statusGroupOf(e).key === 'active').length;
    const ptsTotal = open.reduce((n, e) => n + (e.points_total || 0), 0);
    const ptsDone = open.reduce((n, e) => n + (e.points_done || 0), 0);
    const pct = ptsTotal ? Math.round((ptsDone / ptsTotal) * 100) : 0;
    const sprintClosed = all.reduce((n, e) => n + (e.closed_this_sprint || 0), 0);
    const sprintPts = all.reduce((n, e) => n + (e.points_this_sprint || 0), 0);
    const loose = untracked.reduce((n, u) => n + (u.open || 0), 0);
    const stat = (value, label, extra = '') => `
        <div class="epic-stat${extra}">
            <div class="epic-stat-value">${value}</div>
            <div class="epic-stat-label">${label}</div>
        </div>`;
    return `
        <div class="epic-summary" role="group" aria-label="Progress summary">
            ${stat(`${moving}<span class="epic-stat-of"> / ${open.length}</span>`, 'open epics moving')}
            ${stat(ptsTotal ? `${pct}%` : '-', ptsTotal ? `of points done (${ptsDone}/${ptsTotal})` : 'no estimated tickets')}
            ${stat(sprintClosed ? `+${sprintClosed}` : '0', `closed this sprint (${sprintPts} pts)`, sprintClosed ? ' epic-stat-up' : '')}
            ${loose ? stat(String(loose), plural(loose, 'open ticket').replace(/^\d+ /, '') + ' under no epic', ' epic-stat-warn') : ''}
        </div>`;
}

const COLS = 6;

/**
 * Render the epics readout: a summary, then each project's epics grouped
 * by state with progress, points and sprint movement (CHT-1902, CHT-1964).
 * Uses data attributes + event delegation instead of inline onclick to avoid XSS.
 * @param {{epics: Array, untracked: Array}} progress - GET .../epics response
 */
export function renderEpics(progress, container) {
    const all = progress?.epics || [];
    const untracked = progress?.untracked || [];
    const closedCount = all.filter(e => CLOSED.has(e.status)).length;
    const shown = showClosed ? all : all.filter(e => !CLOSED.has(e.status));

    const projectKeys = [...new Set([...all.map(e => e.project_key), ...untracked.map(u => u.project_key)])];
    const grouped = projectKeys.length > 1;
    const ordered = [];
    const body = projectKeys.map(key => {
        const groups = groupByState(shown.filter(e => e.project_key === key));
        const rows = groups.map(({ group, epics }) => {
            ordered.push(...epics);
            return `<tr class="epic-state-row epic-state-${group.key}"><th colspan="${COLS}">`
                + `<span class="epic-state-dot" aria-hidden="true"></span>${group.label}`
                + `<span class="epic-state-count">${epics.length}</span></th></tr>`
                + epics.map(renderEpicRow).join('');
        }).join('');
        const gap = renderUntrackedRow(untracked.find(u => u.project_key === key));
        if (!rows && !gap) return '';
        const header = grouped
            ? `<tr class="epic-group-row"><th colspan="${COLS}">${escapeHtml(key)}</th></tr>`
            : '';
        return header + rows + gap;
    }).join('');
    // Prev/next on the epic page walks the rows as shown.
    currentEpics = ordered;

    const emptyNote = !body.trim() && closedCount > 0
        ? `<tr class="epic-empty-row"><td colspan="${COLS}" class="text-muted">Every epic here is closed.</td></tr>`
        : '';

    const toggle = closedCount > 0
        ? `<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${showClosed ? 'Hide' : 'Show'} ${plural(closedCount, 'closed epic')}</button>`
        : '';

    container.innerHTML = `
        ${renderSummary(all, untracked)}
        <table class="epic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Points</th>
                    <th title="Closed while the current sprint is active">This sprint</th>
                    <th title="Points closed in each recent sprint, oldest first">Sprints</th>
                </tr>
            </thead>
            <tbody>
                ${body}${emptyNote}
            </tbody>
        </table>
        ${toggle ? `<div class="epic-table-footer">${toggle}</div>` : ''}
    `;
    container._epicProgress = progress;

    // Event delegation for row clicks — attach once per container
    if (!container._epicClickHandler) {
        container._epicClickHandler = (e) => {
            if (e.target.closest('[data-epics-toggle-closed]')) {
                showClosed = !showClosed;
                // The rows change under the keyboard cursor, as on reload.
                setSelectedEpicIndex(-1);
                renderEpics(container._epicProgress, container);
                return;
            }
            const row = e.target.closest('.epic-row');
            if (row && row.dataset.identifier) {
                navigateToEpicByIdentifier(row.dataset.identifier);
            }
        };
        container.addEventListener('click', container._epicClickHandler);
    }
}

/**
 * Show the create epic modal (CHT-833).
 * A simplified issue creation form with type preset to "epic".
 */
export function showCreateEpicModal() {
    const projectId = getCurrentProject();

    // Build project options
    const projectOptions = getProjects().map(p => `
        <option value="${escapeAttr(p.id)}" ${p.id === projectId ? 'selected' : ''}>${escapeHtml(p.name)}</option>
    `).join('');

    document.getElementById('modal-title').textContent = 'Create Epic';
    document.getElementById('modal-content').innerHTML = `
        <form id="create-epic-form">
            <div class="form-group">
                <label for="create-epic-project">Project</label>
                <select id="create-epic-project" required>
                    <option value="">Select project</option>
                    ${projectOptions}
                </select>
            </div>
            <div class="form-group">
                <label for="create-epic-title">Title</label>
                <input type="text" id="create-epic-title" placeholder="Epic title" required autofocus>
            </div>
            <div class="form-group">
                <label for="create-epic-description">Description</label>
                <textarea id="create-epic-description" placeholder="Add description..." rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Epic</button>
        </form>
    `;
    showModal();

    document.getElementById('create-epic-form').addEventListener('submit', handleCreateEpic);
    document.getElementById('create-epic-title').focus();
}

/**
 * Handle epic creation form submission.
 */
async function handleCreateEpic(event) {
    event.preventDefault();

    const projectId = document.getElementById('create-epic-project').value;
    const title = document.getElementById('create-epic-title').value.trim();
    const description = document.getElementById('create-epic-description').value.trim();

    if (!projectId) {
        showToast('Please select a project', 'error');
        return;
    }
    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }

    try {
        const issue = await api.createIssue(projectId, {
            title,
            description: description || null,
            issue_type: 'epic',
        });
        closeModal();
        showToast(`Created epic ${issue.identifier}`, 'success');
        loadEpics();
    } catch (e) {
        showApiError('create epic', e);
    }
}
