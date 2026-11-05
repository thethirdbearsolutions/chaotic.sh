/**
 * Epics module - Epics list view: progress toward each goal (CHT-831, CHT-1902)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, formatTimeAgo } from './utils.js';
import { navigateToEpicByIdentifier, navigateToIssueByIdentifier } from './router.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getProjects } from './projects.js';
import { getCurrentTeam, getCurrentProject, getCurrentView, subscribe, setSelectedEpicIndex } from './state.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { lastResult, rememberResult, resultKey, sameResult } from './last-result.js';

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

// Whether every shipped epic is listed, or the latest few; per page
// load, like the board's filters.
let showClosed = false;

/** Test hook: forget the closed-epics toggle. */
export function resetEpicsViewState() {
    showClosed = false;
}

/**
 * Load and render the epics list view.
 * @param {Object} [options]
 * @param {boolean} [options.fromMemory] - entering the view: paint what it
 *   showed last time for this team and project at once (CHT-1973). Off for
 *   a reload after a change, which would repaint the state before it.
 */
export async function loadEpics({ fromMemory = false } = {}) {
    // Reset the keyboard cursor before the skeleton wipe destroys the selected
    // row — a stale index would positionally clamp into the re-rendered list
    // and Enter could open the wrong epic (CHT-1291 review; mirrors loadBoard).
    setSelectedEpicIndex(-1);
    const listEl = document.getElementById('epics-list');
    if (!listEl) return;

    const requestId = ++loadEpicsRequestId;

    // A revisit paints the epics shown last time for this team and
    // project at once, and the request below refreshes them (CHT-1973).
    // Else the loading skeleton (CHT-1047).
    const key = resultKey();
    const shown = fromMemory ? lastResult('epics', key) : undefined;
    if (shown) {
        paintEpics(shown, listEl);
    } else {
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
    }

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

        rememberResult('epics', key, progress);
        // Unchanged since the paint above: skip a second render.
        if (shown && sameResult(shown, progress)) return;
        paintEpics(progress, listEl);
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

/** The epics list for `progress`, or its empty state. */
function paintEpics(progress, listEl) {
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
}

function plural(n, word) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
}

/** Whole percent, never 100% until everything is done. */
export function pctLabel(done, total) {
    if (total <= 0) return '-';
    if (done >= total) return '100%';
    return `${Math.floor((done / total) * 100)}%`;
}

function ticketTotal(epic) {
    const c = epic.children || {};
    return (c.total || 0) - (c.canceled || 0);
}

function time(raw) {
    const t = raw ? new Date(raw).getTime() : NaN;
    return Number.isNaN(t) ? 0 : t;
}

/** "3h ago", or "on 10/2/2026" once formatTimeAgo gives a date. */
function when(raw) {
    const s = formatTimeAgo(raw);
    if (!s) return '';
    return /ago$|^just now$|future/.test(s) ? s : `on ${s}`;
}

/**
 * Done tickets out of every ticket that is not canceled, as a neutral
 * meter with its count (CHT-2043; the shared .meter of CHT-2040).
 */
function renderMeter(epic) {
    const c = epic.children || {};
    const total = ticketTotal(epic);
    if (total <= 0) return '<span class="meter-label">No tickets</span>';
    const done = c.done || 0;
    const title = `${pctLabel(done, total)} done: ${done} done, ${(c.in_progress || 0) + (c.in_review || 0)} in progress, `
        + `${(c.todo || 0) + (c.backlog || 0)} not started`
        + (c.canceled ? `, ${c.canceled} canceled` : '');
    return `
        <div class="meter" title="${escapeAttr(title)}"><div class="meter-fill" style="width: ${Math.round((done / total) * 100)}%"></div></div>
        <span class="meter-label">${done} of ${total}</span>`;
}

/**
 * One bar per recent sprint, oldest first, the active sprint last: the
 * points each sprint moved toward this goal. Sprints are the clock, and
 * the strip reads as healthy, slowing or abandoned at a glance.
 */
export function renderSprintStrip(sprints) {
    if (!sprints || sprints.length === 0) {
        return '<span class="epic-sprint-strip" aria-hidden="true"></span>';
    }
    const max = Math.max(1, ...sprints.map(s => s.points || 0));
    const bars = sprints.map(s => {
        const h = s.points ? Math.max(15, Math.round((s.points / max) * 100)) : 0;
        const label = `${s.name}${s.status === 'active' ? ' (current)' : ''}: `
            + `${plural(s.closed || 0, 'ticket')} closed, ${s.points || 0} pts`;
        return `<span class="epic-sprint-tick${s.status === 'active' ? ' epic-sprint-current' : ''}" title="${escapeAttr(label)}"><span class="epic-sprint-fill" style="height: ${h}%"></span></span>`;
    }).join('');
    return `<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${bars}</span>`;
}

/** "ivy on Inline label picker, ash on Sticky header, +2 more". */
function renderWho(epic) {
    const flight = epic.in_flight || [];
    const shown = flight.slice(0, 2).map(t => {
        const name = t.assignee ? `<b>${escapeHtml(t.assignee.name)}</b>` : 'Unassigned';
        return `${name} on ${escapeHtml(t.title)}`;
    });
    const more = (epic.in_flight_count || flight.length) - shown.length;
    if (more > 0) shown.push(`+${more} more`);
    return shown.join(', ');
}

function renderShipped(epic, lead = 'shipped') {
    const s = epic.last_shipped;
    if (!s) return '';
    return `${lead} ${escapeHtml(s.title)} ${escapeHtml(when(s.completed_at))}`;
}

function renderRow(epic, { sub, right, grouped }) {
    const pinned = epic.status_pinned && !CLOSED.has(epic.status)
        ? ' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its tickets">✎<span class="sr-only"> (status set by hand)</span></span>'
        : '';
    const canceled = epic.status === 'canceled' ? ' <span class="epic-canceled-tag">Canceled</span>' : '';
    const key = grouped ? `<span class="epic-project-key">${escapeHtml(epic.project_key)}</span> ` : '';
    const owner = epic.owner ? ` <span class="epic-owner">· ${escapeHtml(epic.owner.name)}</span>` : '';
    const empty = ticketTotal(epic) <= 0;
    return `
        <div class="list-row-2line epic-row${CLOSED.has(epic.status) ? ' epic-row-closed' : ''}${empty ? ' epic-row-empty' : ''}" data-identifier="${escapeAttr(epic.identifier)}" title="${escapeAttr(epic.identifier)}">
            <span class="epic-spark">${renderSprintStrip(epic.sprints)}</span>
            <span class="list-row-title">${key}${escapeHtml(epic.title)}${owner}${pinned}${canceled}</span>
            <span class="list-row-sub">${sub}</span>
            <span class="list-row-right">${right}</span>
        </div>`;
}

function renderSection(key, label, count, rows, extra = '') {
    if (!rows) return '';
    return `
        <section class="epic-section epic-section-${key}">
            <div class="section-header"><h3>${label} <span class="section-count">${count}</span></h3></div>
            <div class="epic-section-rows">${rows}</div>
            ${extra}
        </section>`;
}

/** Every ticket is done, but an epic never closes itself (CHT-1901). */
function isFinished(epic) {
    return !CLOSED.has(epic.status) && ticketTotal(epic) > 0 && (epic.open_children || 0) === 0;
}

// Shipped epics listed before "Show all".
const SHIPPED_SHOWN = 5;

/**
 * The Epics list (CHT-2043): what is waiting on a person, what is
 * moving now and who holds it, open epics with nothing in flight, and
 * what shipped. Each section is ordered by time.
 * Uses data attributes + event delegation instead of inline onclick to avoid XSS.
 * @param {{epics: Array, untracked: Array}} progress - GET .../epics response
 */
export function renderEpics(progress, container) {
    const all = progress?.epics || [];
    const untracked = progress?.untracked || [];
    const grouped = new Set([...all.map(e => e.project_key), ...untracked.map(u => u.project_key)]).size > 1;
    const keyed = (key, text) => (grouped ? `${escapeHtml(key)} · ${text}` : text);

    const open = all.filter(e => !CLOSED.has(e.status));
    const finished = open.filter(isFinished);
    const moving = open.filter(e => !isFinished(e) && (e.in_flight_count || 0) > 0)
        .sort((a, b) => time(b.last_activity_at) - time(a.last_activity_at));
    const quiet = open.filter(e => !isFinished(e) && !(e.in_flight_count || 0))
        .sort((a, b) => (ticketTotal(a) <= 0) - (ticketTotal(b) <= 0)
            || time(b.last_shipped?.completed_at) - time(a.last_shipped?.completed_at)
            || time(b.last_activity_at) - time(a.last_activity_at));
    const shipped = all.filter(e => CLOSED.has(e.status))
        .sort((a, b) => time(b.completed_at || b.last_activity_at) - time(a.completed_at || a.last_activity_at));
    const shippedShown = showClosed ? shipped : shipped.slice(0, SHIPPED_SHOWN);

    // Waiting on you: rituals only a person can clear, oldest first, then
    // finished epics to close.
    const asks = [
        ...all.filter(e => !CLOSED.has(e.status)).flatMap(e => (e.awaiting_human || []).map(a => ({ a, where: keyed(e.project_key, escapeHtml(e.title)) }))),
        ...untracked.flatMap(u => (u.awaiting_human || []).map(a => ({ a, where: keyed(u.project_key, 'No epic') }))),
    ].sort((x, y) => time(x.a.since) - time(y.a.since));
    const askRows = asks.map(({ a, where }) => {
        const review = a.approval_mode === 'review';
        const by = a.requested_by_name ? ` by ${escapeHtml(a.requested_by_name)}` : '';
        return `
        <div class="list-row-2line epic-ask-row" data-issue-identifier="${escapeAttr(a.identifier)}" title="${escapeAttr(a.identifier)}">
            <span class="epic-spark" aria-hidden="true"></span>
            <span class="list-row-title">${review ? 'Approve' : 'Complete'} ${escapeHtml(a.ritual_name)}: ${escapeHtml(a.title)}</span>
            <span class="list-row-sub">${where} · ${review ? 'attested' : 'requested'}${by} ${escapeHtml(when(a.since))}</span>
            <span class="list-row-right"><span class="list-row-action">${review ? 'Approve' : 'Complete'}</span></span>
        </div>`;
    }).join('');
    const finishedRows = finished.map(e => renderRow(e, {
        grouped,
        sub: `Every ticket is done${e.last_shipped ? ` · last shipped ${escapeHtml(when(e.last_shipped.completed_at))}` : ''}`,
        right: '<span class="list-row-action">Open epic</span>',
    })).join('');

    const movingRows = moving.map(e => renderRow(e, {
        grouped,
        sub: [renderWho(e), renderShipped(e)].filter(Boolean).join(' · '),
        right: renderMeter(e),
    })).join('');

    const quietRows = quiet.map(e => {
        const c = e.children || {};
        const next = c.todo ? `${c.todo} ready to start` : (c.backlog ? `${c.backlog} in backlog` : '');
        const last = e.last_shipped ? renderShipped(e, 'Last shipped') : 'Nothing shipped yet';
        return renderRow(e, { grouped, sub: [last, next].filter(Boolean).join(' · '), right: renderMeter(e) });
    }).join('');

    const shippedRows = shippedShown.map(e => renderRow(e, {
        grouped,
        sub: e.completed_at ? `Closed ${escapeHtml(when(e.completed_at))}` : 'Closed',
        right: `<span class="meter-label">${plural(e.children?.done || 0, 'ticket')}</span>`,
    })).join('');
    const toggle = shipped.length > SHIPPED_SHOWN
        ? `<button class="btn btn-secondary btn-small epic-closed-toggle" data-epics-toggle-closed>${showClosed ? `Show the latest ${SHIPPED_SHOWN}` : `Show all ${shipped.length}`}</button>`
        : '';

    const loose = untracked.filter(u => u.open);
    const gap = loose.length
        ? `<p class="epic-untracked-note">${loose.map(u => `${grouped ? `${escapeHtml(u.project_key)}: ` : ''}${plural(u.open, 'open ticket')}`).join(', ')} under no epic.</p>`
        : '';

    // Prev/next on the epic page, and the keyboard cursor, walk the rows
    // as shown.
    currentEpics = [...finished, ...moving, ...quiet, ...shippedShown];

    container.innerHTML = `
        <div class="epic-sections">
            ${renderSection('waiting', 'Waiting on you', asks.length + finished.length, askRows + finishedRows)}
            ${renderSection('moving', 'Moving now', moving.length, movingRows)}
            ${renderSection('quiet', 'Nothing in flight', quiet.length, quietRows)}
            ${renderSection('shipped', 'Shipped', shipped.length, shippedRows, toggle ? `<div class="epic-table-footer">${toggle}</div>` : '')}
            ${gap}
        </div>
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
            const ask = e.target.closest('.epic-ask-row');
            if (ask && ask.dataset.issueIdentifier) {
                navigateToIssueByIdentifier(ask.dataset.issueIdentifier);
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
