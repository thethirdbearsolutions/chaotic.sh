/**
 * Epics module - Epics list view: progress toward each goal (CHT-831, CHT-1902)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, formatTimeAgo } from './utils.js';
import { navigateToEpicByIdentifier } from './router.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getProjects } from './projects.js';
import { getCurrentTeam, getCurrentProject, getCurrentView, subscribe, setSelectedEpicIndex } from './state.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { registerViewFilter } from './view-filter.js';
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

// Which epics the list shows (CHT-2095): the chips above it, as on the
// Inbox. Per page load, like the board's filters.
export const EPIC_FILTERS = {
    open: 'Open',
    in_progress: 'In progress',
    all_done: 'All sub-issues done',
    needs_you: 'Approvals',
    shipped: 'Closed',
    all: 'All',
};
let filter = 'open';
// What the "Filter epics" box holds (CHT-2096), lower-cased.
let query = '';
// Parent epics whose sub-epics are listed under them.
let expanded = new Set();

/** Test hook: forget the chip and the expanded parents. */
export function resetEpicsViewState() {
    filter = 'open';
    query = '';
    expanded = new Set();
}

registerViewFilter('epics', 'epics-filter');

/** Whether an epic's title, key, owner or held tickets mention `q`. */
function mentions(epic, q) {
    if (!q) return true;
    const text = [epic.title, epic.identifier, epic.owner?.name, ...(epic.in_flight || []).map(t => t.title)]
        .filter(Boolean).join('\n').toLowerCase();
    return text.includes(q);
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
    // Until this load paints, the filter box has nothing current to
    // repaint: an old project's epics, or none (CHT-2096 review).
    listEl._epicProgress = null;
    wireFilterBox(listEl);

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
        currentEpics = [];
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
            + `${plural(s.closed || 0, 'issue')} closed, ${s.points || 0} pts`;
        return `<span class="epic-sprint-tick${s.status === 'active' ? ' epic-sprint-current' : ''}" title="${escapeAttr(label)}"><span class="epic-sprint-fill" style="height: ${h}%"></span></span>`;
    }).join('');
    return `<span class="epic-sprint-strip" aria-label="Points closed per sprint, oldest first">${bars}</span>`;
}

const STATUS_ORDER = [
    ['in_progress', 'in progress'],
    ['in_review', 'in review'],
    ['todo', 'todo'],
    ['backlog', 'backlog'],
];

/**
 * An epic with its sub-epics' tickets added to its own (CHT-2095).
 * Each sub-epic is itself one of its parent's tickets, so it comes off
 * the parent's count at its status before its own tickets go on.
 */
function rollUp(node) {
    const own = node.epic.children || {};
    const children = { ...own };
    let last = time(node.epic.last_activity_at);
    let asks = (node.epic.awaiting_human || []).length;
    for (const sub of node.subs) {
        const r = rollUp(sub);
        const st = sub.epic.status;
        // An open sub-epic with no tickets yet stays one open ticket of
        // its parent, so the parent never reads "all done" over it.
        if (rolledTotal(r.children) > 0 && children[st] > 0) {
            children[st] -= 1;
            children.total = (children.total || 0) - 1;
        }
        for (const k of ['total', 'backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled']) {
            children[k] = (children[k] || 0) + (r.children[k] || 0);
        }
        last = Math.max(last, r.last);
        asks += r.asks;
    }
    node.rolled = { children, last, asks };
    return node.rolled;
}

function rolledTotal(children) {
    return (children.total || 0) - (children.canceled || 0);
}

function rolledOpen(children) {
    return (children.backlog || 0) + (children.todo || 0) + (children.in_progress || 0) + (children.in_review || 0);
}

/** Every ticket done, the epic itself still open: close it? (CHT-1901) */
function allDone(node) {
    const c = node.rolled.children;
    return !CLOSED.has(node.epic.status) && rolledTotal(c) > 0 && rolledOpen(c) === 0
        && node.subs.every(s => CLOSED.has(s.epic.status));
}

const MATCHES = {
    open: n => !CLOSED.has(n.epic.status),
    in_progress: n => !CLOSED.has(n.epic.status)
        && ((n.rolled.children.in_progress || 0) + (n.rolled.children.in_review || 0)) > 0,
    all_done: allDone,
    needs_you: n => n.rolled.asks > 0,
    shipped: n => CLOSED.has(n.epic.status),
    all: () => true,
};

/** "2 in progress · 1 in review · 3 todo", zeros left out. */
function renderCounts(children) {
    const parts = STATUS_ORDER.filter(([k]) => children[k] > 0).map(([k, label]) => `${children[k]} ${label}`);
    return parts.length ? parts.join(' · ') : '';
}

/** In progress and in review tickets, by who holds them, as a tooltip. */
function whoTitle(epic) {
    return (epic.in_flight || []).map(t => `${t.assignee ? t.assignee.name : 'Unassigned'}: ${t.title}`).join('\n');
}

/** Done out of every ticket that is not canceled (CHT-2043; .meter of CHT-2040). */
function renderMeter(children) {
    const total = rolledTotal(children);
    if (total <= 0) return '<span class="meter-label">No sub-issues</span>';
    const done = children.done || 0;
    const title = `${pctLabel(done, total)} done: ${done} of ${total}`
        + (children.canceled ? `, ${children.canceled} canceled` : '');
    return `
        <div class="meter" title="${escapeAttr(title)}"><div class="meter-fill" style="width: ${Math.round((done / total) * 100)}%"></div></div>
        <span class="meter-label">${done} of ${total}</span>`;
}

function renderRow(node, { grouped, depth, shownSubs }) {
    const e = node.epic;
    const { children, last, asks } = node.rolled;
    const closed = CLOSED.has(e.status);
    const pinned = e.status_pinned && !closed
        ? ' <span class="epic-status-pinned-mark" title="Status set by hand, so it no longer follows its sub-issues">✎<span class="sr-only"> (status set by hand)</span></span>'
        : '';
    const canceled = e.status === 'canceled' ? ' <span class="epic-canceled-tag">Canceled</span>' : '';
    const key = grouped ? `<span class="epic-project-key">${escapeHtml(e.project_key)}</span> ` : '';
    const owner = e.owner ? ` <span class="epic-owner">· ${escapeHtml(e.owner.name)}</span>` : '';
    const empty = rolledTotal(children) <= 0;

    const sub = [];
    if (closed) sub.push(e.completed_at ? `Closed ${escapeHtml(when(e.completed_at))}` : 'Closed');
    else if (allDone(node)) sub.push('<span class="epic-all-done">All sub-issues done</span>');
    else {
        const counts = renderCounts(children);
        const who = whoTitle(e);
        if (counts) sub.push(who ? `<span title="${escapeAttr(who)}">${counts}</span>` : counts);
        else if (empty) sub.push('No sub-issues yet');
    }
    if (asks) sub.push(`<span class="epic-needs-you">${plural(asks, 'approval')}</span>`);
    if (shownSubs) {
        const open = expanded.has(e.id);
        sub.push(`<button type="button" class="epic-subs-toggle" data-epic-toggle-subs="${escapeAttr(e.id)}" aria-expanded="${open}">${open ? '▾' : '▸'} ${plural(shownSubs, 'sub-epic')}</button>`);
    }

    const touched = last ? `<span class="meter-label epic-touched" title="Updated">${escapeHtml(formatTimeAgo(new Date(last).toISOString()))}</span>` : '';
    return `
        <div class="list-row-2line epic-row${closed ? ' epic-row-closed' : ''}${empty ? ' epic-row-empty' : ''}${depth ? ' epic-row-sub' : ''}" data-identifier="${escapeAttr(e.identifier)}" title="${escapeAttr(e.identifier)}" style="--epic-depth: ${depth}">
            <span class="epic-spark">${renderSprintStrip(e.sprints)}</span>
            <span class="list-row-title">${key}${escapeHtml(e.title)}${owner}${pinned}${canceled}</span>
            <span class="list-row-sub">${sub.join(' · ')}</span>
            <span class="list-row-right">${renderMeter(children)}${touched}</span>
        </div>`;
}

/**
 * The Epics list (CHT-2095): every epic in one list, most recently
 * touched first, sub-epics under the goal they serve. The chips narrow
 * it and never reorder it. No time buckets and no caps: a project that
 * starts and stops reads the same as one that never sleeps.
 * Uses data attributes + event delegation instead of inline onclick to avoid XSS.
 * @param {{epics: Array, untracked: Array}} progress - GET .../epics response
 */
export function renderEpics(progress, container) {
    const all = progress?.epics || [];
    const untracked = progress?.untracked || [];
    const grouped = new Set([...all.map(e => e.project_key), ...untracked.map(u => u.project_key)]).size > 1;

    // The tree over every epic, so a parent's rollup counts all of it.
    const nodes = new Map(all.map(e => [e.id, { epic: e, subs: [], parent: null }]));
    for (const n of nodes.values()) {
        const p = n.epic.parent_epic_id && nodes.get(n.epic.parent_epic_id);
        if (p && p !== n) { n.parent = p; p.subs.push(n); }
    }
    // A cycle in old data has no root; treat its members as roots.
    for (const n of nodes.values()) if (n.parent && !reachesRoot(n)) n.parent = null;
    for (const n of nodes.values()) n.subs = [];
    for (const n of nodes.values()) if (n.parent) n.parent.subs.push(n);
    [...nodes.values()].filter(n => !n.parent).forEach(rollUp);

    const chipMatches = MATCHES[filter] || MATCHES.open;
    const matches = n => chipMatches(n) && mentions(n.epic, query);
    const order = filter === 'shipped'
        ? (a, b) => time(b.epic.completed_at || b.epic.last_activity_at) - time(a.epic.completed_at || a.epic.last_activity_at)
        : (a, b) => b.rolled.last - a.rolled.last;

    // A shown epic sits under its nearest shown ancestor, or at the top.
    const shownAncestor = (n) => {
        for (let p = n.parent; p; p = p.parent) if (matches(p)) return p;
        return null;
    };
    const shown = [...nodes.values()].filter(matches);
    const under = new Map();
    const top = [];
    for (const n of shown) {
        const p = shownAncestor(n);
        if (p) {
            if (!under.has(p)) under.set(p, []);
            under.get(p).push(n);
        } else top.push(n);
    }

    const rows = [];
    const visit = (n, depth) => {
        const subs = (under.get(n) || []).sort(order);
        rows.push(renderRow(n, { grouped, depth, shownSubs: subs.length }));
        currentEpics.push(n.epic);
        if (subs.length && expanded.has(n.epic.id)) subs.forEach(s => visit(s, depth + 1));
    };
    currentEpics = [];
    top.sort(order).forEach(n => visit(n, 0));

    const chips = Object.entries(EPIC_FILTERS).map(([k, label]) => {
        const count = [...nodes.values()].filter(n => MATCHES[k](n) && mentions(n.epic, query)).length;
        return `<button type="button" class="segmented-btn${k === filter ? ' active' : ''}" data-epics-filter="${k}" aria-pressed="${k === filter}">${label} <span class="segmented-count">${count}</span></button>`;
    }).join('');

    const loose = untracked.filter(u => u.open);
    const gap = loose.length && filter !== 'shipped'
        ? `<p class="epic-untracked-note">${loose.map(u => `${grouped ? `${escapeHtml(u.project_key)}: ` : ''}${plural(u.open, 'open issue')}`).join(', ')} in no epic.</p>`
        : '';

    container.innerHTML = `
        <div class="epic-sections">
            <div class="segmented epic-filter" role="group" aria-label="Show">${chips}</div>
            <section class="epic-section epic-section-list">
                ${rows.length
                    ? `<div class="epic-section-rows">${rows.join('')}</div>`
                    : `<p class="epic-filter-empty">${query
                        ? `No epics in ${escapeHtml(EPIC_FILTERS[filter])} match “${escapeHtml(query)}”.`
                        : `No epics in ${escapeHtml(EPIC_FILTERS[filter])}.`}</p>`}
            </section>
            ${gap}
        </div>
    `;
    container._epicProgress = progress;

    wireFilterBox(container);

    // Event delegation for row clicks — attach once per container
    if (!container._epicClickHandler) {
        container._epicClickHandler = (e) => {
            const chip = e.target.closest('[data-epics-filter]');
            if (chip) {
                if (chip.dataset.epicsFilter === filter) return;
                filter = chip.dataset.epicsFilter;
                // The rows change under the keyboard cursor, as on reload.
                setSelectedEpicIndex(-1);
                renderEpics(container._epicProgress, container);
                return;
            }
            const toggle = e.target.closest('[data-epic-toggle-subs]');
            if (toggle) {
                const id = toggle.dataset.epicToggleSubs;
                if (expanded.has(id)) expanded.delete(id); else expanded.add(id);
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
 * The filter box sits in the view header, outside the re-rendered list,
 * so typing keeps its focus (CHT-2096). Wired from the first load, so
 * what is typed before the epics arrive still counts.
 */
function wireFilterBox(container) {
    const box = document.getElementById('epics-filter');
    if (box && !box._epicFilterHandler) {
        box._epicFilterHandler = () => {
            query = box.value.trim().toLowerCase();
            // Mid-load or after a failure, the next paint applies it.
            if (!container._epicProgress) return;
            setSelectedEpicIndex(-1);
            renderEpics(container._epicProgress, container);
        };
        box.addEventListener('input', box._epicFilterHandler);
        // Enter hands the keyboard back to the list (j/k, Enter).
        box.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                box.blur();
            }
        });
    }
}

/** Whether walking up from `n` ends at a root rather than looping. */
function reachesRoot(n) {
    const seen = new Set();
    for (let p = n; p; p = p.parent) {
        if (seen.has(p)) return false;
        seen.add(p);
    }
    return true;
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
