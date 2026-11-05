/**
 * People: the team roster and each member's profile page (CHT-1984).
 *
 * The roster (`GET /teams/{id}/roster`, CHT-1980) lists people and agents
 * alike, each with the identity they wrote for themselves: name, avatar,
 * pronouns, tagline and a markdown bio (CHT-1979). `/people` shows it as
 * rows; `/people/{id}` is one member's page. Every member edits their own
 * profile there, and a person edits the profiles of the agents they own.
 *
 * Since CHT-2044 this is the one home for people and agents: the Team view
 * folded in here (invitations, Edit team, Invite), and an agent's page
 * carries its access, credentials and owner actions (agent-profile.js).
 *
 * Self-contained on purpose: the router, app.js and the page template
 * only register the view, its route and its nav item.
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, renderAvatar, UPLOADED_AVATAR_RE } from './utils.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getCurrentTeam, getCurrentUser, setCurrentUser, setCurrentView } from './state.js';
import { registerActions } from './event-delegation.js';
import { navigateTo, saveScrollPosition, setActiveNav, navigateToIssueByIdentifier, runNavigationCleanup } from './router.js';
import { renderDescriptionContent } from './rich-text.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { updateUserInfo } from './auth.js';
import { isCurrentUserAdmin, getMembers, loadTeamInvitations, loadTeamMembers, clearTeamInvitations } from './teams.js';
import { renderAgentSections, loadAgentCredentials, revokeAgentKey, canManageAgent, agentScope, agentFor, isRegistrar } from './agent-profile.js';
import { getAgents } from './agents.js';
import { revokeConnection } from './connected-apps.js';

// The server's caps (app.schemas.user.PROFILE_LIMITS); the server enforces
// them, these only stop the form from sending what it would refuse.
export const PROFILE_LIMITS = { bio: 4000, pronouns: 40, tagline: 120, name: 255 };

let roster = [];
let rosterTeamId = null;
// user id -> their in-progress issues, for the roster's "working on" line.
let working = new Map();
let showIdle = false;
let loadRequestId = 0;
let editingId = null;
// The values the edit form opened with: a save sends only what differs,
// so it never resends a field someone else changed meanwhile.
let editingInitial = null;
let editingEntry = null;
let saving = false;
// Bumped each time the form opens: a save finishing after its form was
// closed (and perhaps another opened) must leave the new one alone.
let formToken = 0;
// Your role in a team, as its newest roster fetch said (CHT-2045): what
// decides whether you may edit any of its agents, fresher than a cached
// roster or another page's member list.
let viewerRole = { teamId: null, role: null };

export function getRoster() {
    return roster;
}

/** Test hook: forget the cached roster. */
export function resetPeople() {
    roster = [];
    rosterTeamId = null;
    working = new Map();
    showIdle = false;
    editingId = null;
    editingInitial = null;
    editingEntry = null;
    saving = false;
    shownEntry = null;
    photoBusy = false;
    viewerRole = { teamId: null, role: null };
}

/**
 * Fetch a team's roster. Returns it and leaves the cache alone: a caller
 * stores it only once it knows its request is still the current one.
 */
async function fetchRoster(teamId, includeIdle) {
    const fetched = await api.getTeamRoster(teamId, { includeIdle });
    const me = getCurrentUser();
    const mine = Array.isArray(fetched) ? fetched.find(r => r.user_id === me?.id) : null;
    viewerRole = { teamId, role: mine?.role ?? null };
    return fetched;
}

/** Replace one entry in the cached roster, if it is cached there. */
function refreshCached(teamId, entry) {
    if (!entry || rosterTeamId !== teamId) return;
    roster = roster.map(r => (r.user_id === entry.user_id ? entry : r));
}

function rosterSkeleton() {
    return Array(4).fill(0).map(() => `
        <div class="list-row-2line person-row-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join('');
}

/**
 * What each teammate is working on: one request for the team's
 * in-progress issues, grouped by assignee. A failure leaves the lines out.
 */
async function fetchWorking(teamId) {
    try {
        const issues = await api.getTeamIssues(teamId, { status: ['in_progress'], sort_by: 'updated', order: 'desc', limit: 200 });
        const byAssignee = new Map();
        for (const issue of issues || []) {
            if (!issue.assignee_id) continue;
            if (!byAssignee.has(issue.assignee_id)) byAssignee.set(issue.assignee_id, []);
            byAssignee.get(issue.assignee_id).push(issue);
        }
        return byAssignee;
    } catch (e) {
        console.error('Failed to load what the team is working on:', e);
        return new Map();
    }
}

/** The `/people` view: load the current team's roster and show it. */
export async function loadPeople() {
    const team = getCurrentTeam();
    if (!team) return;
    const requestId = ++loadRequestId;
    const includeIdle = showIdle;
    const list = document.getElementById('people-list');
    if (list) {
        list.innerHTML = rosterSkeleton();
        list.setAttribute('aria-busy', 'true');
    }
    const toggle = document.getElementById('people-show-idle');
    if (toggle) toggle.checked = showIdle;
    // The viewer's role gates Invite, Edit team and the invitations list.
    loadTeamMembers().then(() => {
        if (requestId !== loadRequestId) return;
        if (isCurrentUserAdmin()) loadTeamInvitations();
        else clearTeamInvitations();
        // The admin-only "not on the roster" rows depend on the members.
        if (rosterTeamId === team.id) renderPeople();
    });
    try {
        const [fetched, work] = await Promise.all([fetchRoster(team.id, includeIdle), fetchWorking(team.id)]);
        if (requestId !== loadRequestId) return;
        roster = fetched;
        rosterTeamId = team.id;
        working = work;
        renderPeople();
    } catch (e) {
        if (requestId !== loadRequestId) return;
        list?.removeAttribute('aria-busy');
        if (list) list.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.team,
            heading: "Couldn't load the roster",
            description: 'Check your connection and try again',
            cta: { label: 'Retry', action: 'retry-load-people' },
            variant: 'error',
        });
        showApiError('load the roster', e);
    }
}

/** One line under the name: a person's role, or what kind of agent. */
export function rosterRole(entry) {
    if (!entry.is_agent) {
        const role = entry.role || 'member';
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
    const kind = entry.kind === 'session' ? 'Session' : entry.kind === 'service' ? 'Registrar' : 'Agent';
    const parts = [kind];
    if (entry.owner_name) parts.push(`of ${entry.owner_name}`);
    if (entry.idle) parts.push('· idle');
    return parts.join(' ');
}

/** The muted line under a roster name: what they're on, else who they are. */
function rowSub(entry) {
    const issues = working.get(entry.user_id) || [];
    if (issues.length) {
        const [first] = issues;
        const more = issues.length > 1 ? ` and ${issues.length - 1} more` : '';
        return `<span class="status-dot status-dot-in_progress" aria-hidden="true"></span>Working on ${escapeHtml(first.identifier)} ${escapeHtml(first.title)}${more}`;
    }
    if (entry.is_agent) {
        const owner = entry.owner_name ? `Agent of ${escapeHtml(entry.owner_name)}` : 'Agent';
        return `${owner}${entry.idle ? ' · idle' : ''}`;
    }
    return entry.tagline ? escapeHtml(entry.tagline) : escapeHtml(rosterRole(entry));
}

function rosterRow(entry) {
    const id = escapeAttr(entry.user_id);
    const handle = entry.mention_handle ? ` <span class="person-row-handle">@${escapeHtml(entry.mention_handle)}</span>` : '';
    const badges = [];
    if (entry.is_agent) {
        badges.push(`<span class="badge badge-neutral">${escapeHtml(agentScope(entry.project_id))}</span>`);
        if (isRegistrar(entry)) badges.push('<span class="badge badge-accent">Registrar</span>');
        else if (entry.kind === 'session') badges.push('<span class="badge badge-neutral">Session</span>');
    } else if (entry.role && entry.role !== 'member') {
        badges.push(`<span class="badge badge-neutral">${escapeHtml(rosterRole(entry))}</span>`);
    }
    return `
        <a class="list-row-2line person-row${entry.idle ? ' person-row-idle' : ''}"
           href="/people/${id}" data-action="view-person" data-user-id="${id}">
            <span class="person-row-avatar" aria-hidden="true">${renderAvatar(entry, `avatar person-avatar${entry.is_agent ? ' person-avatar-agent' : ''}`)}</span>
            <span class="list-row-main">
                <span class="list-row-title">${escapeHtml(entry.name)}${handle}</span>
                <span class="list-row-sub">${rowSub(entry)}</span>
            </span>
            <span class="list-row-right">${badges.join('')}</span>
        </a>
    `;
}

function rosterSection(label, entries, empty, extra = '') {
    return `
        <div class="section-header people-section-header">
            <h3>${label} <span class="section-count">${entries.length}</span></h3>${extra}
        </div>
        <div class="people-rows">${entries.map(rosterRow).join('') || `<p class="people-empty">${empty}</p>`}</div>
    `;
}

export function renderPeople() {
    const list = document.getElementById('people-list');
    if (!list) return;
    list.removeAttribute('aria-busy');
    const people = roster.filter(r => !r.is_agent);
    const agents = roster.filter(r => r.is_agent);
    const me = getCurrentUser();
    const edit = me ? `<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${escapeAttr(me.id)}">Edit your profile</button>` : '';
    list.innerHTML = rosterSection('Humans', people, 'No one yet.', edit)
        + rosterSection('Agents', agents, 'No agents yet.')
        + offRosterSection();
}

/**
 * Members the roster leaves out (a deactivated account), for team admins:
 * the Team view listed every membership, and Remove must stay reachable.
 */
function offRosterSection() {
    if (!isCurrentUserAdmin()) return '';
    const shown = new Set(roster.map(r => r.user_id));
    const agentIds = new Set(getAgents().map(a => a.id));
    const me = getCurrentUser()?.id;
    const missing = getMembers().filter(m => !shown.has(m.user_id) && !agentIds.has(m.user_id));
    if (!missing.length) return '';
    return `
        <div class="section-header people-section-header">
            <h3>Not on the roster <span class="section-count">${missing.length}</span></h3>
        </div>
        <div class="people-rows">${missing.map(m => `
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">${escapeHtml(m.user_name || 'Unknown')}</div>
                    <div class="list-row-sub">${escapeHtml(m.user_email || '')}${m.user_email ? ' · ' : ''}deactivated account, ${escapeHtml(m.role || 'member')}</div>
                </div>
                ${m.user_id !== me && m.role !== 'owner' ? `<div class="list-row-right"><button class="btn btn-danger-outline btn-small" data-action="remove-member" data-user-id="${escapeAttr(m.user_id)}">Remove from team</button></div>` : ''}
            </div>`).join('')}
        </div>
    `;
}

/**
 * A profile for one of the team's agents the roster leaves out (a
 * deactivated one), from the team's agent list, so its owner can still
 * open it and delete it.
 */
function entryFromAgent(agent) {
    return {
        user_id: agent.id, name: agent.name, avatar_url: agent.avatar_url,
        pronouns: agent.pronouns, tagline: agent.tagline, bio: agent.bio,
        mention_handle: null, is_agent: true, role: null, kind: agent.kind,
        owner_id: agent.parent_user_id, owner_name: agent.parent_user_name,
        project_id: agent.agent_project_id, idle: !!agent.idle, joined_at: agent.created_at,
    };
}

/** Is `me` an admin or owner of the current team, by the newest roster
 * fetched for it? The edit form fetches one as it opens, so the form
 * itself is always decided fresh; PATCH /agents/{id} lets those admins
 * edit every field of any agent of the team, as this form does. */
function viewerIsTeamAdmin(me) {
    const teamId = getCurrentTeam()?.id;
    if (!teamId || !me) return false;
    let role = null;
    if (me.id === getCurrentUser()?.id && viewerRole.teamId === teamId) role = viewerRole.role;
    else if (rosterTeamId === teamId) role = roster.find(r => r.user_id === me.id)?.role ?? null;
    return role === 'admin' || role === 'owner';
}

/** May the viewer edit this entry? Their own, an agent they own, or
 * (as the server allows) any agent of a team they administer. */
export function canEditProfile(entry, me = getCurrentUser()) {
    if (!entry || !me) return false;
    if (entry.user_id === me.id) return true;
    return !!entry.is_agent && (entry.owner_id === me.id || viewerIsTeamAdmin(me));
}

/**
 * One member's roster entry. The cached roster serves it unless `fresh`;
 * otherwise, or when it is not there (an idle session the cached roster
 * leaves out), the whole team is asked for, idle sessions included.
 */
async function findEntry(teamId, userId, { fresh = false } = {}) {
    if (!fresh && rosterTeamId === teamId) {
        const cached = roster.find(r => r.user_id === userId);
        if (cached) return cached;
    }
    const fetched = await fetchRoster(teamId, true);
    const entry = fetched.find(r => r.user_id === userId) || null;
    refreshCached(teamId, entry);
    return entry;
}

let viewRequestId = 0;
// The entry the profile page shows, to redraw it with a change.
let shownEntry = null;

/** `/people/{id}`: one member's profile page. */
export async function viewPerson(userId, pushHistory = true) {
    if (pushHistory) saveScrollPosition();
    // What navigateTo does on the way to any view: close the mobile
    // drawer, drop the previous detail page's pending loads.
    runNavigationCleanup();
    const requestId = ++viewRequestId;
    const team = getCurrentTeam();
    if (!team) return;
    // Anything that navigates meanwhile changes the address or the team;
    // a late answer must not paint over where the user went.
    const startPath = window.location.pathname;
    const stale = () => requestId !== viewRequestId
        || getCurrentTeam()?.id !== team.id
        || window.location.pathname !== startPath;
    let entry;
    try {
        entry = await findEntry(team.id, userId);
    } catch (e) {
        if (stale()) return;
        showApiError('load this profile', e);
        // Arrived by address: leave it pointing at the roster shown.
        if (!pushHistory) history.replaceState({ view: 'people' }, '', '/people');
        navigateTo('people', pushHistory);
        return;
    }
    if (stale()) return;
    if (!entry) {
        const agent = getAgents().find(a => a.id === userId);
        if (agent) entry = entryFromAgent(agent);
    }
    if (!entry) {
        showToast('Not on this team’s roster', 'error');
        // Arrived by address: leave it pointing at the roster shown.
        if (!pushHistory) history.replaceState({ view: 'people' }, '', '/people');
        navigateTo('people', pushHistory);
        return;
    }
    if (pushHistory) {
        history.pushState({ personId: userId, view: 'people' }, '', `/people/${encodeURIComponent(userId)}`);
    }
    setCurrentView('people');
    setActiveNav('people');
    renderPerson(entry);
    window.scrollTo(0, 0);
    // The card or menu item that was clicked is gone: put focus on the page.
    document.querySelector('#person-detail-view .person-profile-name')?.focus({ preventScroll: true });
}


function personView() {
    let view = document.getElementById('person-detail-view');
    if (!view) {
        view = document.createElement('div');
        view.id = 'person-detail-view';
        view.className = 'view';
        document.querySelector('.main-content').appendChild(view);
    }
    return view;
}

export function renderPerson(entry, { withIssues = true } = {}) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const view = personView();
    view.classList.remove('hidden');
    view.dataset.userId = entry.user_id;
    shownEntry = entry;
    const id = escapeAttr(entry.user_id);
    const editable = canEditProfile(entry);
    const self = entry.user_id === getCurrentUser()?.id;
    const bio = entry.bio
        ? `<div class="person-bio markdown-body">${renderDescriptionContent(entry.bio)}</div>`
        : `<p class="person-bio-empty">${self ? 'You haven’t written a bio yet.' : 'No bio yet.'}</p>`;
    const joined = entry.joined_at ? `<span>Joined ${escapeHtml(new Date(entry.joined_at).toLocaleDateString())}</span>` : '';
    view.innerHTML = `
        <div class="view-header">
            <a href="/people" class="person-back" data-action="back-to-roster">← Roster</a>
            <div class="view-actions">
                ${editable ? `<button class="btn btn-primary" data-action="edit-profile" data-user-id="${id}">${self ? 'Edit your profile' : 'Edit profile'}</button>` : ''}
            </div>
        </div>
        <div class="person-profile">
            ${renderAvatar(entry, 'avatar person-avatar-large')}
            <div class="person-profile-body">
                <h2 class="person-profile-name" tabindex="-1">${escapeHtml(entry.name)}${entry.pronouns ? `<span class="person-pronouns">${escapeHtml(entry.pronouns)}</span>` : ''}</h2>
                ${entry.mention_handle ? `<div class="person-handle">@${escapeHtml(entry.mention_handle)}</div>` : ''}
                ${entry.tagline ? `<div class="person-tagline">${escapeHtml(entry.tagline)}</div>` : ''}
                <div class="person-role">${escapeHtml(rosterRole(entry))}${joined ? ' · ' : ''}${joined}</div>
            </div>
        </div>
        ${bio}
        <div class="person-sections">
            <section class="person-work">
                <div class="section-header"><h3>Working on</h3></div>
                <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
            </section>
            ${entry.is_agent ? renderAgentSections(entry, roster) : ''}
            ${!entry.is_agent || !agentFor(entry) ? memberSection(entry) : ''}
        </div>
    `;
    if (withIssues) loadPersonIssues(entry.user_id);
    if (canManageAgent(entry)) loadAgentCredentials(entry.user_id);
}

/**
 * A person's membership, for team admins: their address and Remove (what
 * the Team view's member list offered, CHT-2044). Owners are not removable.
 */
function memberSection(entry) {
    if (!isCurrentUserAdmin()) return '';
    const member = getMembers().find(m => m.user_id === entry.user_id);
    if (!member) return '';
    const removable = entry.user_id !== getCurrentUser()?.id && member.role !== 'owner';
    return `
        <section class="agent-profile-section">
            <div class="section-header"><h3>Membership</h3></div>
            <dl class="agent-access">
                <dt>Role</dt><dd>${escapeHtml(rosterRole(entry))}</dd>
                ${member.user_email ? `<dt>Email</dt><dd>${escapeHtml(member.user_email)}</dd>` : ''}
            </dl>
            ${removable ? `<div class="agent-profile-actions"><button class="btn btn-danger-outline" data-action="remove-member" data-user-id="${escapeAttr(entry.user_id)}">Remove from team</button></div>` : ''}
        </section>
    `;
}

/** Redraw the profile shown, if it is this member's, after it changed. */
function showingRoster() {
    const view = document.getElementById('people-view');
    return !!view && !view.classList.contains('hidden');
}

function onAgentChanged(event) {
    const { agentId, deleted, created, credentials } = event.detail || {};
    if (credentials) {
        loadAgentCredentials(agentId);
        return;
    }
    if (deleted) {
        roster = roster.filter(r => r.user_id !== agentId);
        if (showingProfileOf(agentId)) navigateTo('people');
        else if (showingRoster()) renderPeople();
        return;
    }
    if (created) {
        if (showingRoster()) loadPeople();
        return;
    }
    if (showingProfileOf(agentId) && shownEntry) renderPerson(shownEntry);
    else if (showingRoster()) renderPeople();
}

function onMemberRemoved(event) {
    const { userId } = event.detail || {};
    roster = roster.filter(r => r.user_id !== userId);
    if (showingProfileOf(userId)) navigateTo('people');
    else if (showingRoster()) renderPeople();
}

if (typeof window !== 'undefined') {
    window.addEventListener('chaotic:agent-changed', onAgentChanged);
    window.addEventListener('chaotic:member-removed', onMemberRemoved);
}

// Open work assigned to them, most active first: what to ask them about.
// The server sorts by status so the limit cuts the least active, never
// what they are in the middle of.
const WORKING_STATUSES = ['in_progress', 'in_review', 'todo'];
let issuesRequestId = 0;

export async function loadPersonIssues(userId) {
    const team = getCurrentTeam();
    if (!team) return;
    const requestId = ++issuesRequestId;
    let issues;
    try {
        issues = await api.getTeamIssues(team.id, {
            assignee_id: userId, status: WORKING_STATUSES, sort_by: 'status', order: 'asc', limit: 20,
        });
    } catch (e) {
        issues = null;
        console.error('Failed to load their issues:', e);
    }
    if (requestId !== issuesRequestId) return;
    const box = document.getElementById('person-issues');
    if (!box) return;
    if (issues === null) {
        box.innerHTML = '<p class="person-bio-empty">Couldn’t load their issues.</p>';
        return;
    }
    if (!issues.length) {
        box.innerHTML = '<p class="person-bio-empty">Nothing open assigned.</p>';
        return;
    }
    const rank = (i) => WORKING_STATUSES.indexOf(i.status);
    box.innerHTML = [...issues].sort((a, b) => rank(a) - rank(b)).map(i => `
        <a class="person-issue" href="/issue/${encodeURIComponent(i.identifier)}" data-action="person-open-issue" data-identifier="${escapeAttr(i.identifier)}">
            <span class="person-issue-id">${escapeHtml(i.identifier)}</span>
            <span class="person-issue-title">${escapeHtml(i.title)}</span>
            <span class="person-issue-status">${escapeHtml(String(i.status).replace('_', ' '))}</span>
        </a>
    `).join('');
}

const PROFILE_FIELDS = ['name', 'avatar_url', 'pronouns', 'tagline', 'bio'];

/**
 * A profile's editable fields as the form will read back: blank, never
 * null, and a textarea's newlines (it turns CRLF into LF and drops one
 * leading newline), so an untouched field never compares as changed.
 */
function formValues(entry) {
    const asShown = (f, v) => {
        const text = String(v ?? '').replace(/\r\n?/g, '\n');
        return f === 'bio' && text.startsWith('\n') ? text.slice(1) : text;
    };
    return Object.fromEntries(PROFILE_FIELDS.map(f => [f, asShown(f, entry?.[f])]));
}

let editRequestId = 0;

/**
 * The edit form, for your own profile or an agent you own. It opens on
 * a fresh copy of the profile, not the cached roster, which may predate
 * an edit the member made elsewhere (an agent through MCP, say).
 */
export async function showEditProfileModal(userId) {
    const me = getCurrentUser();
    const team = getCurrentTeam();
    if (!me || !team) return;
    const requestId = ++editRequestId;
    const startPath = window.location.pathname;
    let entry;
    try {
        entry = await findEntry(team.id, userId, { fresh: true });
    } catch (e) {
        if (requestId === editRequestId) showApiError('load this profile', e);
        return;
    }
    // Navigated or switched team meanwhile: the form belongs to a page
    // that is gone.
    if (requestId !== editRequestId || window.location.pathname !== startPath
        || getCurrentTeam()?.id !== team.id) return;
    if (!entry && userId === me.id) entry = { ...me, user_id: me.id };
    if (!entry || !canEditProfile(entry, me)) return;
    editingId = userId;
    editingEntry = entry;
    editingInitial = formValues(entry);
    formToken++;
    const self = userId === me.id;
    const value = (v) => escapeAttr(v || '');
    document.getElementById('modal-title').textContent = self ? 'Edit your profile' : `Edit ${entry.name}`;
    document.getElementById('modal-content').innerHTML = `
        <form data-action="save-profile">
            <div class="form-group">
                <label for="profile-name">Name</label>
                <input type="text" id="profile-name" value="${value(entry.name)}" maxlength="${PROFILE_LIMITS.name}" required>
            </div>
            <div class="form-group">
                <label for="profile-avatar">Avatar</label>
                <input type="text" id="profile-avatar" value="${value(entry.avatar_url)}" placeholder="An emoji, or an image URL">
            </div>
            <div class="form-group">
                <label for="profile-photo">Photo</label>
                <div class="profile-photo-row">
                    <input type="file" id="profile-photo" accept="image/png,image/jpeg,image/webp,image/gif" data-action="pick-profile-photo"${photoBusy ? ' disabled' : ''}>
                    <button type="button" class="btn btn-secondary btn-small${UPLOADED_AVATAR_RE.test(entry.avatar_url || '') ? '' : ' hidden'}" id="profile-photo-remove" data-action="remove-profile-photo"${photoBusy ? ' disabled' : ''}>Remove photo</button>
                </div>
                <p class="form-help">Uploads at once, cropped square and resized to ${PHOTO_SIZE}px.</p>
            </div>
            <div class="form-group">
                <label for="profile-pronouns">Pronouns</label>
                <input type="text" id="profile-pronouns" value="${value(entry.pronouns)}" maxlength="${PROFILE_LIMITS.pronouns}" placeholder="e.g. they/them">
            </div>
            <div class="form-group">
                <label for="profile-tagline">Tagline</label>
                <input type="text" id="profile-tagline" value="${value(entry.tagline)}" maxlength="${PROFILE_LIMITS.tagline}" placeholder="One line under your name">
            </div>
            <div class="form-group">
                <label for="profile-bio">Bio</label>
                <textarea id="profile-bio" rows="8" maxlength="${PROFILE_LIMITS.bio}" placeholder="Markdown: who you are, what you work on, how to work with you">${escapeHtml(entry.bio || '')}</textarea>
                <p class="form-help">Leave a field blank to clear it.</p>
            </div>
            <button type="submit" class="btn btn-primary"${saving ? ' disabled' : ''}>Save</button>
        </form>
    `;
    showModal();
}

/**
 * The PATCH body: only the fields that differ from `initial`, the values
 * the form opened with, so a save never resends what it did not change.
 * Blank clears a field (a blank avatar is sent as null); the server trims.
 * Without `initial`, every field.
 */
export function profilePayload(form, initial = null) {
    const field = (id) => form.querySelector(`#${id}`)?.value ?? '';
    const values = {
        name: field('profile-name'),
        avatar_url: field('profile-avatar').trim(),
        pronouns: field('profile-pronouns'),
        tagline: field('profile-tagline'),
        bio: field('profile-bio'),
    };
    const payload = {};
    for (const key of PROFILE_FIELDS) {
        const before = initial ? String(initial[key] ?? '') : null;
        const unchanged = key === 'avatar_url' ? values[key] === before?.trim() : values[key] === before;
        if (!unchanged) payload[key] = key === 'avatar_url' ? (values[key] || null) : values[key];
    }
    return payload;
}

/** Re-render the profile on screen with new fields; keep its issues and scroll. */
function rerenderProfile(entry) {
    const scroll = window.scrollY;
    const issues = document.getElementById('person-issues');
    renderPerson(entry, { withIssues: false });
    if (issues) document.getElementById('person-issues')?.replaceWith(issues);
    window.scrollTo(0, scroll);
}

/** Is the profile page on screen, and showing this member? */
function showingProfileOf(userId) {
    const detail = document.getElementById('person-detail-view');
    return !!detail && !detail.classList.contains('hidden') && detail.dataset.userId === userId;
}

function closeProfileForm() {
    editingId = null;
    editingInitial = null;
    editingEntry = null;
    closeModal();
}

export async function handleSaveProfile(event) {
    event.preventDefault();
    const userId = editingId;
    if (!userId || saving) return;
    const form = event.target.closest('form') || event.target;
    const payload = profilePayload(form, editingInitial);
    if (!Object.keys(payload).length) {
        closeProfileForm();
        return;
    }
    const me = getCurrentUser();
    const self = userId === me?.id;
    const opened = editingEntry;
    const token = formToken;
    const submit = form.querySelector('button[type="submit"]');
    saving = true;
    if (submit) submit.disabled = true;
    try {
        const saved = self ? await api.updateMe(payload) : await api.updateAgent(userId, payload);
        const changes = Object.fromEntries(PROFILE_FIELDS.map(f => [f, saved?.[f] ?? null]));
        roster = roster.map(r => (r.user_id === userId ? { ...r, ...changes } : r));
        if (self) {
            setCurrentUser({ ...me, ...changes });
            updateUserInfo();
        }
        if (token === formToken) closeProfileForm();
        showToast('Profile saved', 'success');
        // Same page, same person: keep their issue list and the scroll.
        if (showingProfileOf(userId)) rerenderProfile({ ...opened, ...changes });
        else renderPeople();
    } catch (e) {
        showApiError('save the profile', e);
    } finally {
        saving = false;
        // This form's button, or the one of a form opened meanwhile.
        if (submit) submit.disabled = false;
        const current = document.querySelector('#modal-content form[data-action="save-profile"] button[type="submit"]');
        if (current) current.disabled = false;
    }
}

// The side of the square a photo is resized to before upload; the
// server takes up to 256 KB, which a 256px WebP or JPEG stays well under.
export const PHOTO_SIZE = 256;

/** Crop `file` to its centre square and scale it to PHOTO_SIZE, as a
 * WebP (or a JPEG on white where the browser can't encode WebP). */
export async function resizePhoto(file, size = PHOTO_SIZE) {
    const bitmap = await createImageBitmap(file);
    const side = Math.min(bitmap.width, bitmap.height);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    canvas.getContext('2d').drawImage(
        bitmap, (bitmap.width - side) / 2, (bitmap.height - side) / 2, side, side, 0, 0, size, size,
    );
    bitmap.close?.();
    const encode = (type) => new Promise(resolve => canvas.toBlob(resolve, type, 0.9));
    // WebP where the browser can encode it; else JPEG, which stays well
    // under the server's cap where a PNG of a photo may not (Safari).
    const webp = await encode('image/webp');
    let blob = webp && webp.type === 'image/webp' ? webp : null;
    if (!blob) {
        // JPEG has no transparency: put the picture on white, not black.
        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, size, size);
        blob = await encode('image/jpeg');
    }
    if (!blob) throw new Error('This browser could not convert the picture. Try a PNG or JPEG file.');
    return blob;
}

// An upload or removal in flight: the other waits, so the last answer
// is never an older request's.
let photoBusy = false;

function setPhotoControlsDisabled(disabled) {
    for (const id of ['profile-photo', 'profile-photo-remove']) {
        const el = document.getElementById(id);
        if (el) el.disabled = disabled;
    }
}

/**
 * A member's profile picture changed (yours, or an agent's you manage):
 * the roster, the header if it is yours, their profile page if it is on
 * screen, and their edit form if one is open; a form opened since for
 * someone else is left alone.
 */
function applyAvatar(userId, saved) {
    if (!userId || !saved || (saved.id && saved.id !== userId)) return;
    const avatar = saved.avatar_url ?? null;
    roster = roster.map(r => (r.user_id === userId ? { ...r, avatar_url: avatar } : r));
    const me = getCurrentUser();
    if (me && me.id === userId) {
        setCurrentUser({ ...me, avatar_url: avatar });
        updateUserInfo();
    }
    if (editingId === userId && editingInitial) {
        const field = document.getElementById('profile-avatar');
        if (field) field.value = avatar || '';
        // The upload is saved already: Save sends the avatar only if it
        // is edited again after this.
        editingInitial = { ...editingInitial, avatar_url: avatar || '' };
        editingEntry = { ...editingEntry, avatar_url: avatar };
        document.getElementById('profile-photo-remove')?.classList.toggle('hidden', !UPLOADED_AVATAR_RE.test(avatar || ''));
    }
    if (shownEntry && showingProfileOf(userId)) rerenderProfile({ ...shownEntry, avatar_url: avatar });
}

/** Whose picture the photo controls change: the member the open form
 * edits (you, or an agent you manage); with no form open, you. */
function photoTarget() {
    const me = getCurrentUser();
    const userId = editingId || me?.id;
    return userId ? { userId, self: userId === me?.id } : null;
}

async function changePhoto(target, request, done, failed) {
    if (photoBusy || !target) return;
    photoBusy = true;
    setPhotoControlsDisabled(true);
    try {
        applyAvatar(target.userId, await request());
        showToast(done, 'success');
    } catch (e) {
        showApiError(failed, e);
    } finally {
        photoBusy = false;
        setPhotoControlsDisabled(false);
    }
}

export async function handlePickPhoto(input, resize = resizePhoto) {
    const file = input.files?.[0];
    if (!file) return;
    const target = photoTarget();
    try {
        await changePhoto(target, async () => {
            const blob = await resize(file);
            return target.self ? api.uploadAvatar(blob) : api.uploadAgentAvatar(target.userId, blob);
        }, 'Photo uploaded', 'upload the photo');
    } finally {
        input.value = '';
    }
}

export function handleRemovePhoto() {
    const target = photoTarget();
    return changePhoto(
        target, () => (target.self ? api.deleteAvatar() : api.deleteAgentAvatar(target.userId)),
        'Photo removed', 'remove the photo',
    );
}

function opensInNewTab(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1;
}

registerActions({
    // Links and buttons: act on click only. Enter on one clicks it too,
    // so acting on keydown as well would act twice.
    'view-person': (event, data) => {
        if (event.type !== 'click' || opensInNewTab(event)) return;
        event.preventDefault();
        viewPerson(data.userId);
    },
    'edit-profile': (event, data) => {
        if (event.type !== 'click') return;
        event.preventDefault();
        showEditProfileModal(data.userId);
    },
    'view-my-profile': (event) => {
        if (event.type !== 'click') return;
        event.preventDefault();
        document.getElementById('user-dropdown')?.classList.add('hidden');
        const me = getCurrentUser();
        if (me) viewPerson(me.id);
    },
    'pick-profile-photo': (event, _data, target) => {
        if (event.type !== 'change') return;
        handlePickPhoto(target);
    },
    'remove-profile-photo': (event) => {
        if (event.type !== 'click') return;
        handleRemovePhoto();
    },
    'save-profile': (event) => {
        handleSaveProfile(event);
    },
    'retry-load-people': (event) => {
        if (event.type !== 'click') return;
        loadPeople();
    },
    'person-open-issue': (event, data) => {
        if (event.type !== 'click' || opensInNewTab(event)) return;
        event.preventDefault();
        navigateToIssueByIdentifier(data.identifier);
    },
    'revoke-agent-key': (event, data) => {
        if (event.type !== 'click') return;
        revokeAgentKey(data.keyId, data.agentId);
    },
    'revoke-agent-connection': async (event, data) => {
        if (event.type !== 'click') return;
        await revokeConnection(data.connectionId, data.connectionName);
        loadAgentCredentials(data.agentId);
    },
    'back-to-roster': (event) => {
        if (event.type !== 'click' || opensInNewTab(event)) return;
        event.preventDefault();
        navigateTo('people');
    },
    'toggle-people-idle': (event, _data, target) => {
        // A checkbox fires click and change; act once.
        if (event.type !== 'change') return;
        showIdle = !!target.checked;
        loadPeople();
    },
});
