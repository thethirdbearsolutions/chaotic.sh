/**
 * Epic detail view module: the epic-wide picture (CHT-855, CHT-2097).
 */

import {
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    renderDescriptionContent,
    viewIssue,
} from './issue-detail-view.js';
import { api } from './api.js';
import { getCurrentView, getCurrentTeam } from './state.js';
import { showApiError, showToast } from './ui.js';
import { navigateTo, saveScrollPosition } from './router.js';
import { getProjects, formatEstimate } from './projects.js';
import { getAssigneeById, formatAssigneeName } from './assignees.js';
import { formatStatus, formatPriority, formatTimeAgo, escapeHtml, escapeAttr, sanitizeColor } from './utils.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { registerActions } from './event-delegation.js';
import { getCurrentEpics, renderSprintStrip } from './epics.js';
import { mountInboxSurface } from './inbox.js';
import { viewDocument } from './documents.js';

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
 * View epic detail: the epic-wide picture (CHT-2097). What waits on you
 * (as Inbox rows), the docs across the tree, its tickets by status at
 * any depth, sub-epics, what closed in each sprint, and activity across
 * all of it. Editing the epic's own fields and comments is the ticket
 * page ("Open as ticket").
 * @param {string} epicId - Epic ID
 * @param {boolean} pushHistory - Whether to push to browser history
 */
export async function viewEpic(epicId, pushHistory = true, { focus = null } = {}) {
    try {
        // Record the list's scroll position synchronously, before any await,
        // so a slow fetch can't capture a position the user has since
        // scrolled away from (CHT-1211 item 1; ordering standardized across
        // all four detail entry points per review #4).
        if (pushHistory) saveScrollPosition();

        const epic = await api.getIssue(epicId);
        // Validate this is actually an epic
        if (epic.issue_type !== 'epic') {
            viewIssue(epicId, pushHistory);
            return;
        }
        const teamId = getCurrentTeam()?.id;
        const [overview, progress, inbox] = await Promise.all([
            api.getEpicOverview(epicId),
            api.getProjectEpicProgress(epic.project_id).catch(() => null),
            teamId
                ? api.getInbox(teamId, { kinds: TICKET_DECISION_KINDS, includeArchived: true, limit: 200 }).catch(() => [])
                : Promise.resolve([]),
        ]);

        // Update URL
        if (pushHistory) {
            history.pushState({ epicId, view: getCurrentView() }, '', `/epic/${epic.identifier}`);
        }

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        const detailView = document.getElementById('epic-detail-view');
        detailView.classList.remove('hidden');

        const state = { epic, overview, progress, inbox: inbox || [] };
        detailView.querySelector('#epic-detail-content').innerHTML = renderEpicPage(state);
        detailView._epicState = state;
        mountNeedsYou(state);
        wireEpicPage(detailView);
        if (focus) document.getElementById(focus)?.scrollIntoView({ block: 'start' });
    } catch (e) {
        showApiError('load epic', e);
    }
}

// The Inbox kinds that are a decision on a ticket.
const TICKET_DECISION_KINDS = ['review_requested', 'gate_pending'];
const CLOSED = new Set(['done', 'canceled']);


function time(raw) {
    const t = raw ? new Date(raw).getTime() : NaN;
    return Number.isNaN(t) ? 0 : t;
}

/** The tree's issues by id: the epic and every ticket under it. */
function treeIds(state) {
    return new Set([state.epic.id, ...state.overview.tickets.map(t => t.id)]);
}

/** Inbox decisions on this epic or a ticket under it, still waiting. */
function needsYouEntries(state) {
    const ids = treeIds(state);
    return state.inbox.filter(e => e.issue_id && ids.has(e.issue_id) && e.state !== 'resolved');
}

const NEEDS_YOU_EMPTY = '<p class="epic-page-empty">Nothing waits on you here any more.</p>';

function mountNeedsYou(state) {
    if (!needsYouEntries(state).length) return;
    const mount = () => mountInboxSurface('epic-needs-you-rows', needsYouEntries(state), {
        empty: NEEDS_YOU_EMPTY,
        // A live update refetches and draws again, keeping this reload
        // for the next one (CHT-2097 review).
        reload: () => {
            const teamId = getCurrentTeam()?.id;
            if (!teamId) return;
            api.getInbox(teamId, { kinds: TICKET_DECISION_KINDS, includeArchived: true, limit: 200 })
                .then(rows => {
                    state.inbox = rows || [];
                    if (document.getElementById('epic-needs-you-rows')) mount();
                })
                .catch(() => {});
        },
    });
    mount();
}

function section(id, title, count, body, { open = true, collapsible = false } = {}) {
    const heading = `${escapeHtml(title)}${count == null ? '' : ` <span class="section-count">${count}</span>`}`;
    if (collapsible) {
        return `
            <details class="issue-detail-section epic-page-section" id="${id}"${open ? ' open' : ''}>
                <summary><h3>${heading}</h3></summary>
                ${body}
            </details>`;
    }
    return `
        <section class="issue-detail-section epic-page-section" id="${id}">
            <h3>${heading}</h3>
            ${body}
        </section>`;
}

/** One ticket, as the sub-issue rows have always looked. */
function ticketRow(t, epicsById, epicId) {
    const sub = t.epic_id !== epicId ? epicsById.get(t.epic_id) : null;
    const when = t.status === 'done' ? t.completed_at : t.updated_at;
    return `
        <div class="sub-issue-item" data-issue-id="${escapeAttr(t.id)}" data-identifier="${escapeAttr(t.identifier)}">
            <span class="sub-issue-status">${getStatusIcon(t.status)}</span>
            <span class="sub-issue-id">${escapeHtml(t.identifier)}</span>
            <span class="sub-issue-title">${escapeHtml(t.title)}${sub ? ` <span class="epic-page-under">in ${escapeHtml(sub.title)}</span>` : ''}</span>
            ${t.assignee ? `<span class="sub-issue-assignee">${escapeHtml(t.assignee.name)}</span>` : ''}
            ${when ? `<span class="epic-page-when">${escapeHtml(formatTimeAgo(when))}</span>` : ''}
        </div>`;
}

function ticketList(tickets, epicsById, epicId) {
    return `<div class="sub-issues-list">${tickets.map(t => ticketRow(t, epicsById, epicId)).join('')}</div>`;
}

/** Done tickets, newest first, under the sprint each closed in. */
function doneBySprint(done, epicsById, epicId) {
    const groups = new Map();
    for (const t of [...done].sort((a, b) => time(b.completed_at) - time(a.completed_at))) {
        const key = t.closed_in?.id || '';
        if (!groups.has(key)) groups.set(key, { name: t.closed_in?.name || 'No sprint', tickets: [] });
        groups.get(key).tickets.push(t);
    }
    return [...groups.values()].map(g => `
        <div class="epic-page-sprint-group">
            <h4>${escapeHtml(g.name)} <span class="section-count">${g.tickets.length}</span></h4>
            ${ticketList(g.tickets, epicsById, epicId)}
        </div>`).join('');
}

function docRows(docs) {
    return `<div class="epic-page-docs">${docs.map(d => `
        <div class="epic-page-doc" data-document-id="${escapeAttr(d.id)}" role="link" tabindex="0">
            <span class="epic-page-doc-icon" aria-hidden="true">${escapeHtml(d.icon || '📄')}</span>
            <span class="epic-page-doc-title">${escapeHtml(d.title)}</span>
            <span class="epic-page-doc-links">${(d.linked_to || []).map(id => `<span class="epic-page-tag">${escapeHtml(id)}</span>`).join('')}</span>
            ${d.updated_at ? `<span class="epic-page-when">${escapeHtml(formatTimeAgo(d.updated_at))}</span>` : ''}
        </div>`).join('')}</div>`;
}

function subEpicRows(subs) {
    return `<div class="sub-issues-list">${subs.map(e => {
        const c = e.children || {};
        const total = (c.total || 0) - (c.canceled || 0);
        const done = c.done || 0;
        return `
        <div class="sub-issue-item epic-page-subepic" data-epic-id="${escapeAttr(e.id)}" data-identifier="${escapeAttr(e.identifier)}">
            <span class="sub-issue-status">${getStatusIcon(e.status)}</span>
            <span class="sub-issue-id">${escapeHtml(e.identifier)}</span>
            <span class="sub-issue-title">${escapeHtml(e.title)}</span>
            <span class="epic-page-subepic-meter">${total > 0
                ? `<div class="meter"><div class="meter-fill" style="width: ${Math.round((done / total) * 100)}%"></div></div><span class="meter-label">${done} of ${total}</span>`
                : '<span class="meter-label">No tickets</span>'}</span>
            ${e.last_activity_at ? `<span class="epic-page-when">${escapeHtml(formatTimeAgo(e.last_activity_at))}</span>` : ''}
        </div>`;
    }).join('')}</div>`;
}

function activityRows(activities, identifiers) {
    return activities.map(a => `
        <div class="activity-item">
            <div class="activity-icon">${getActivityIcon(a.activity_type)}</div>
            <div class="activity-content">
                ${identifiers.get(a.issue_id) ? `<span class="epic-page-tag">${escapeHtml(identifiers.get(a.issue_id))}</span>` : ''}
                <span class="activity-text">${formatActivityText(a)}</span>
                <span class="activity-actor">by ${escapeHtml(formatActivityActor(a))}</span>
                <span class="activity-time">${formatTimeAgo(a.created_at)}</span>
            </div>
        </div>`).join('');
}

function renderEpicPage(state) {
    const { epic, overview, progress } = state;
    const backView = getCurrentView() || 'epics';
    const project = getProjects().find(p => p.id === epic.project_id);
    const owner = epic.assignee_id ? getAssigneeById(epic.assignee_id) : null;
    const ownerName = owner ? formatAssigneeName(owner) : null;

    const epicRows = progress?.epics || [];
    const epicsById = new Map(epicRows.map(e => [e.id, e]));
    const self = epicsById.get(epic.id);
    const tickets = overview.tickets.filter(t => t.issue_type !== 'epic');
    const by = (status) => tickets.filter(t => t.status === status)
        .sort((a, b) => time(b.updated_at) - time(a.updated_at));
    const inProgress = [...by('in_progress'), ...by('in_review')];
    const todo = by('todo');
    const backlog = by('backlog');
    const done = tickets.filter(t => t.status === 'done');
    const counted = tickets.filter(t => t.status !== 'canceled');
    const points = (list) => list.reduce((n, t) => n + (t.estimate ?? 1), 0);
    const pct = counted.length ? Math.round((done.length / counted.length) * 100) : 0;
    const subs = epicRows.filter(e => e.parent_epic_id === epic.id)
        .sort((a, b) => time(b.last_activity_at) - time(a.last_activity_at));
    const lastTouched = Math.max(time(epic.updated_at), ...overview.tickets.map(t => time(t.updated_at)));

    // Prev/next navigation from the Epics list's last-loaded contents,
    // matching the Issue detail parity gap called out in CHT-1211 item 6.
    const epicList = getCurrentEpics();
    const currentIndex = epicList.findIndex(e => e.id === epic.id);
    const prevEpic = currentIndex > 0 ? epicList[currentIndex - 1] : null;
    const nextEpic = currentIndex >= 0 && currentIndex < epicList.length - 1 ? epicList[currentIndex + 1] : null;
    const inList = currentIndex >= 0;

    const identifiers = new Map([[epic.id, epic.identifier], ...overview.tickets.map(t => [t.id, t.identifier])]);
    const asks = needsYouEntries(state);

    const facts = [
        `${getStatusIcon(epic.status)} ${escapeHtml(formatStatus(epic.status))}`,
        ownerName ? escapeHtml(ownerName) : '<span class="text-muted">No owner</span>',
        lastTouched ? `Last touched ${escapeHtml(formatTimeAgo(new Date(lastTouched).toISOString()))}` : '',
    ].filter(Boolean).join(' <span class="epic-page-dot">·</span> ');

    return `
        <div class="detail-layout epic-page">
            <div class="detail-main">
                <div class="issue-detail-nav">
                    <button class="back-link" data-action="navigate-to" data-view="${escapeAttr(backView)}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Back
                    </button>
                    ${inList ? `
                    <div class="issue-nav-arrows">
                        <button class="issue-nav-btn" ${prevEpic ? `data-action="navigate-epic" data-epic-id="${escapeAttr(prevEpic.id)}"` : 'disabled'} title="Previous epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
                        </button>
                        <span class="issue-nav-counter">${currentIndex + 1} / ${epicList.length}</span>
                        <button class="issue-nav-btn" ${nextEpic ? `data-action="navigate-epic" data-epic-id="${escapeAttr(nextEpic.id)}"` : 'disabled'} title="Next epic">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                        </button>
                    </div>
                    ` : ''}
                    <span class="issue-detail-breadcrumb">${project ? escapeHtml(project.name) : 'Project'} › ${escapeHtml(epic.identifier)}</span>
                    <button class="btn btn-secondary btn-small epic-page-open-ticket" data-action="epic-open-as-ticket" data-epic-id="${escapeAttr(epic.id)}">Open as ticket</button>
                </div>

                <h1 class="issue-detail-title">${escapeHtml(epic.title)}</h1>
                <div class="epic-page-facts">${facts}</div>
                ${epic.status_pinned && !CLOSED.has(epic.status) ? `
                <div class="epic-page-pinned text-muted">Status set by hand, so it no longer follows its tickets.
                    <button class="btn btn-secondary btn-small" data-action="epic-follow-children" data-epic-id="${escapeAttr(epic.id)}">Follow tickets</button>
                </div>` : ''}

                <div class="epic-page-progress">
                    <div class="epic-detail-progress">
                        <div class="epic-detail-progress-bar">
                            <div class="epic-detail-progress-fill${pct === 100 ? ' epic-progress-complete' : ''}" style="width: ${pct}%"></div>
                        </div>
                        <div class="epic-detail-progress-label">
                            <span>${done.length} of ${counted.length} tickets done · ${points(done)} of ${points(counted)} points</span>
                            <span>${counted.length ? `${pct}%` : 'No tickets yet'}</span>
                        </div>
                    </div>
                    ${self?.sprints?.length ? `
                    <div class="epic-page-sprints" title="Points closed toward this goal in each recent sprint, oldest first">
                        ${renderSprintStrip(self.sprints)}
                        <span class="epic-page-sprints-label">${self.sprints.map(s => `${escapeHtml(s.name)}: ${s.points || 0}`).slice(-3).join(' · ')}</span>
                    </div>` : ''}
                </div>

                ${asks.length ? section('epic-needs-you', 'Needs you', asks.length,
                    '<div id="epic-needs-you-rows" class="inbox-list epic-page-inbox"></div>') : ''}

                ${overview.documents.length ? section('epic-docs', 'Docs', overview.documents.length, docRows(overview.documents)) : ''}

                ${inProgress.length ? section('epic-in-progress', 'In progress and in review', inProgress.length, ticketList(inProgress, epicsById, epic.id)) : ''}

                ${todo.length ? section('epic-up-next', 'Up next', todo.length, ticketList(todo, epicsById, epic.id)) : ''}

                ${subs.length ? section('epic-sub-epics', 'Sub-epics', subs.length, subEpicRows(subs)) : ''}

                ${done.length ? section('epic-done', 'Done', done.length, doneBySprint(done, epicsById, epic.id)) : ''}

                ${backlog.length ? section('epic-backlog', 'Backlog', backlog.length, ticketList(backlog, epicsById, epic.id), { open: false, collapsible: true }) : ''}

                ${!tickets.length ? renderEmptyState({
                    icon: EMPTY_ICONS.issues,
                    heading: 'No tickets yet',
                    description: 'Break this epic down by creating sub-issues',
                }) : ''}

                ${section('epic-activity', 'Activity across the epic', null, `
                    <div class="activity-list" id="epic-activity-rows">
                        ${overview.activities.length ? activityRows(overview.activities, identifiers) : '<p class="epic-page-empty">No activity yet.</p>'}
                    </div>
                    ${overview.more_activity ? `<button class="btn btn-secondary btn-small" data-epic-more-activity data-epic-id="${escapeAttr(epic.id)}" data-skip="${overview.activities.length}">Show older activity</button>` : ''}`)}
            </div>

            <aside class="detail-sidebar">
                <div class="sidebar-section epic-page-goal">
                    <details open>
                        <summary><h4>Goal</h4></summary>
                        ${epic.description
                            ? `<div class="description-content markdown-body">${renderDescriptionContent(epic.description)}</div>`
                            : '<p class="text-muted">No description.</p>'}
                    </details>
                </div>
                <div class="sidebar-section">
                    <h4>Properties</h4>
                    <div class="property-row">
                        <span class="property-label">Priority</span>
                        <span class="property-value-static">${getPriorityIcon(epic.priority)} ${formatPriority(epic.priority)}</span>
                    </div>
                    <div class="property-row">
                        <span class="property-label">Estimate</span>
                        <span class="property-value-static">${formatEstimate(epic.estimate, epic.project_id)}</span>
                    </div>
                    ${epic.labels && epic.labels.length > 0 ? `
                    <div class="property-row">
                        <span class="property-label">Labels</span>
                        <span class="property-value-static property-labels-btn">
                            ${epic.labels.map(label => `
                                <span class="issue-label" style="background: ${sanitizeColor(label.color)}20; color: ${sanitizeColor(label.color)}">${escapeHtml(label.name)}</span>
                            `).join('')}
                        </span>
                    </div>` : ''}
                    ${project ? `
                    <div class="property-row">
                        <span class="property-label">Project</span>
                        <span class="property-value-static">${escapeHtml(project.name)}</span>
                    </div>` : ''}
                    <div class="property-row">
                        <span class="property-label">Created</span>
                        <span class="property-value-static">${new Date(epic.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </aside>
        </div>
    `;
}

/** Row clicks and "Show older activity", attached once per view element. */
function wireEpicPage(detailView) {
    if (detailView._epicPageHandler) return;
    detailView._epicPageHandler = async (e) => {
        const state = detailView._epicState;
        const more = e.target.closest('[data-epic-more-activity]');
        if (more && state) {
            more.disabled = true;
            try {
                const page = await api.getEpicOverview(state.epic.id, { activitySkip: Number(more.dataset.skip) || 0 });
                const identifiers = new Map([[state.epic.id, state.epic.identifier], ...state.overview.tickets.map(t => [t.id, t.identifier])]);
                detailView.querySelector('#epic-activity-rows')?.insertAdjacentHTML('beforeend', activityRows(page.activities, identifiers));
                if (page.more_activity) {
                    more.dataset.skip = String((Number(more.dataset.skip) || 0) + page.activities.length);
                    more.disabled = false;
                } else more.remove();
            } catch (err) {
                more.disabled = false;
                showApiError('load activity', err);
            }
            return;
        }
        // Inbox rows handle their own clicks.
        if (e.target.closest('#epic-needs-you-rows')) return;
        const doc = e.target.closest('.epic-page-doc');
        if (doc) {
            viewDocument(doc.dataset.documentId);
            return;
        }
        const sub = e.target.closest('.epic-page-subepic');
        if (sub) {
            viewEpic(sub.dataset.epicId);
            return;
        }
        const row = e.target.closest('.sub-issue-item');
        if (row && row.dataset.issueId) viewIssue(row.dataset.issueId);
    };
    detailView.addEventListener('click', detailView._epicPageHandler);
    detailView.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const doc = e.target.closest?.('.epic-page-doc');
        if (doc) viewDocument(doc.dataset.documentId);
    });
}

// navigate-to action is registered centrally in app.js

// Prev/next epic nav arrows (CHT-1211 item 6)
registerActions({
    'navigate-epic': (_event, data) => {
        viewEpic(data.epicId);
    },
    // The plain ticket page, for editing the epic's own fields and
    // commenting on it (CHT-2097).
    'epic-open-as-ticket': (_event, data) => {
        viewIssue(data.epicId);
    },
    // Unpin a hand-set epic status so it is derived from its children
    // again (CHT-1901).
    'epic-follow-children': async (_event, data) => {
        try {
            await api.updateIssue(data.epicId, { status_follows_children: true });
            showToast('Status now follows its tickets');
            await viewEpic(data.epicId, false);
        } catch (e) {
            showApiError('update epic', e);
        }
    },
});
