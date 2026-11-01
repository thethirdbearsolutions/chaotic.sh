/**
 * People: the team roster and each member's profile page (CHT-1984).
 *
 * The roster (`GET /teams/{id}/roster`, CHT-1980) lists people and agents
 * alike, each with the identity they wrote for themselves: name, avatar,
 * pronouns, tagline and a markdown bio (CHT-1979). `/people` shows it as
 * cards; `/people/{id}` is one member's page. Every member edits their own
 * profile there, and a person edits the profiles of the agents they own.
 *
 * Self-contained on purpose: the router, app.js and the page template
 * only register the view, its route and its nav item.
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, renderAvatar } from './utils.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getCurrentTeam, getCurrentUser, setCurrentUser, setCurrentView } from './state.js';
import { registerActions } from './event-delegation.js';
import { navigateTo, saveScrollPosition, setActiveNav, navigateToIssueByIdentifier } from './router.js';
import { renderDescriptionContent } from './rich-text.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { updateUserInfo } from './auth.js';

// The server's caps (app.schemas.user.PROFILE_LIMITS); the server enforces
// them, these only stop the form from sending what it would refuse.
export const PROFILE_LIMITS = { bio: 4000, pronouns: 40, tagline: 120, name: 255 };

let roster = [];
let rosterTeamId = null;
let showIdle = false;
let loadRequestId = 0;
let editingId = null;

export function getRoster() {
    return roster;
}

/** Test hook: forget the cached roster. */
export function resetPeople() {
    roster = [];
    rosterTeamId = null;
    showIdle = false;
    editingId = null;
}

async function fetchRoster() {
    const team = getCurrentTeam();
    if (!team) return null;
    const fetched = await api.getTeamRoster(team.id, { includeIdle: showIdle });
    roster = fetched;
    rosterTeamId = team.id;
    return fetched;
}

function rosterSkeleton() {
    return Array(4).fill(0).map(() => `
        <div class="person-card person-card-skeleton">
            <div class="skeleton skeleton-title"></div>
        </div>
    `).join('');
}

/** The `/people` view: load the current team's roster and show it. */
export async function loadPeople() {
    if (!getCurrentTeam()) return;
    const requestId = ++loadRequestId;
    const list = document.getElementById('people-list');
    if (list) list.innerHTML = rosterSkeleton();
    const toggle = document.getElementById('people-show-idle');
    if (toggle) toggle.checked = showIdle;
    try {
        await fetchRoster();
        if (requestId !== loadRequestId) return;
        renderPeople();
    } catch (e) {
        if (requestId !== loadRequestId) return;
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

function personCard(entry) {
    const id = escapeAttr(entry.user_id);
    const pronouns = entry.pronouns ? `<span class="person-pronouns">${escapeHtml(entry.pronouns)}</span>` : '';
    const handle = entry.mention_handle ? `<div class="person-handle">@${escapeHtml(entry.mention_handle)}</div>` : '';
    const tagline = entry.tagline ? `<div class="person-tagline">${escapeHtml(entry.tagline)}</div>` : '';
    return `
        <a class="person-card${entry.is_agent ? ' person-card-agent' : ''}${entry.idle ? ' person-card-idle' : ''}"
           href="/people/${id}" data-action="view-person" data-user-id="${id}">
            ${renderAvatar(entry, 'avatar person-avatar')}
            <div class="person-card-body">
                <div class="person-name">${escapeHtml(entry.name)}${pronouns}</div>
                ${handle}
                ${tagline}
                <div class="person-role">${escapeHtml(rosterRole(entry))}</div>
            </div>
        </a>
    `;
}

export function renderPeople() {
    const list = document.getElementById('people-list');
    if (!list) return;
    const people = roster.filter(r => !r.is_agent);
    const agents = roster.filter(r => r.is_agent);
    const me = getCurrentUser();
    const edit = me ? `<button class="btn btn-secondary btn-small" data-action="edit-profile" data-user-id="${escapeAttr(me.id)}">Edit your profile</button>` : '';
    list.innerHTML = `
        <div class="people-section-header"><h3>People</h3>${edit}</div>
        <div class="people-grid">${people.map(personCard).join('') || '<p class="people-empty">No one yet.</p>'}</div>
        <div class="people-section-header"><h3>Agents</h3></div>
        <div class="people-grid">${agents.map(personCard).join('') || '<p class="people-empty">No agents yet.</p>'}</div>
    `;
}

/** May the viewer edit this entry? Their own, or an agent they own. */
export function canEditProfile(entry, me = getCurrentUser()) {
    if (!entry || !me) return false;
    return entry.user_id === me.id || (entry.is_agent && entry.owner_id === me.id);
}

async function findEntry(userId) {
    const team = getCurrentTeam();
    let entry = rosterTeamId === team?.id ? roster.find(r => r.user_id === userId) : null;
    if (!entry) {
        // Not cached, or an idle session left out of the cached roster:
        // ask for everyone.
        const saved = showIdle;
        showIdle = true;
        try {
            await fetchRoster();
        } finally {
            showIdle = saved;
        }
        entry = roster.find(r => r.user_id === userId) || null;
    }
    return entry;
}

let viewRequestId = 0;

/** `/people/{id}`: one member's profile page. */
export async function viewPerson(userId, pushHistory = true) {
    const requestId = ++viewRequestId;
    if (pushHistory) saveScrollPosition();
    let entry;
    try {
        entry = await findEntry(userId);
    } catch (e) {
        if (requestId !== viewRequestId) return;
        showApiError('load this profile', e);
        navigateTo('people', pushHistory);
        return;
    }
    if (requestId !== viewRequestId) return;
    if (!entry) {
        showToast('Not on this team’s roster', 'error');
        // Arrived by address: leave it pointing at the roster shown.
        if (!pushHistory) history.replaceState({ view: 'people' }, '', '/people');
        navigateTo('people', pushHistory);
        return;
    }
    if (pushHistory) {
        history.pushState({ personId: userId, view: 'person' }, '', `/people/${encodeURIComponent(userId)}`);
    }
    setCurrentView('people');
    setActiveNav('people');
    renderPerson(entry);
    window.scrollTo(0, 0);
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

export function renderPerson(entry) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const view = personView();
    view.classList.remove('hidden');
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
                <h2 class="person-profile-name">${escapeHtml(entry.name)}${entry.pronouns ? `<span class="person-pronouns">${escapeHtml(entry.pronouns)}</span>` : ''}</h2>
                ${entry.mention_handle ? `<div class="person-handle">@${escapeHtml(entry.mention_handle)}</div>` : ''}
                ${entry.tagline ? `<div class="person-tagline">${escapeHtml(entry.tagline)}</div>` : ''}
                <div class="person-role">${escapeHtml(rosterRole(entry))}${joined ? ' · ' : ''}${joined}</div>
            </div>
        </div>
        ${bio}
        <section class="person-work">
            <h3>Working on</h3>
            <div id="person-issues" class="person-issues"><div class="skeleton skeleton-title"></div></div>
        </section>
    `;
    loadPersonIssues(entry.user_id);
}

// Open work assigned to them, most active first: what to ask them about.
const WORKING_STATUSES = ['in_progress', 'in_review', 'todo'];
let issuesRequestId = 0;

export async function loadPersonIssues(userId) {
    const team = getCurrentTeam();
    if (!team) return;
    const requestId = ++issuesRequestId;
    let issues;
    try {
        issues = await api.getTeamIssues(team.id, { assignee_id: userId, status: WORKING_STATUSES, limit: 20 });
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

/** The edit form, for your own profile or an agent you own. */
export function showEditProfileModal(userId) {
    const me = getCurrentUser();
    const entry = roster.find(r => r.user_id === userId)
        || (me && userId === me.id ? { user_id: me.id, ...me } : null);
    if (!entry || !canEditProfile({ ...entry, user_id: userId })) return;
    editingId = userId;
    const self = userId === me?.id;
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
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    `;
    showModal();
}

/** The form's values as the PATCH body. Blank clears; the server trims. */
export function profilePayload(form) {
    const field = (id) => form.querySelector(`#${id}`)?.value ?? '';
    const avatar = field('profile-avatar').trim();
    return {
        name: field('profile-name'),
        avatar_url: avatar || null,
        pronouns: field('profile-pronouns'),
        tagline: field('profile-tagline'),
        bio: field('profile-bio'),
    };
}

export async function handleSaveProfile(event) {
    event.preventDefault();
    const userId = editingId;
    if (!userId) return;
    const form = event.target.closest('form') || event.target;
    const payload = profilePayload(form);
    const me = getCurrentUser();
    const self = userId === me?.id;
    try {
        const saved = self ? await api.updateMe(payload) : await api.updateAgent(userId, payload);
        const fields = ['name', 'avatar_url', 'pronouns', 'tagline', 'bio'];
        const changes = Object.fromEntries(fields.map(f => [f, saved?.[f] ?? null]));
        roster = roster.map(r => (r.user_id === userId ? { ...r, ...changes } : r));
        if (self) {
            setCurrentUser({ ...me, ...changes });
            updateUserInfo();
        }
        closeModal();
        showToast('Profile saved', 'success');
        const entry = roster.find(r => r.user_id === userId);
        const detail = document.getElementById('person-detail-view');
        if (entry && detail && !detail.classList.contains('hidden')) renderPerson(entry);
        else renderPeople();
    } catch (e) {
        showApiError('save the profile', e);
    }
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
