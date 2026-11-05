import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setCurrentTeam, setCurrentUser, getCurrentUser } from './state.js';
import {
  loadPeople,
  renderPeople,
  viewPerson,
  renderPerson,
  rosterRole,
  canEditProfile,
  showEditProfileModal,
  profilePayload,
  handleSaveProfile,
  handlePickPhoto,
  handleRemovePhoto,
  resizePhoto,
  getRoster,
  resetPeople,
} from './people.js';
import { api } from './api.js';
import { showToast, showApiError, closeModal } from './ui.js';
import { navigateTo, runNavigationCleanup } from './router.js';
import { updateUserInfo } from './auth.js';

vi.mock('./api.js', () => ({
  api: {
    getTeamRoster: vi.fn(),
    updateMe: vi.fn(),
    updateAgent: vi.fn(),
    getTeamIssues: vi.fn(),
    getAgentKeys: vi.fn(),
    getConnections: vi.fn(),
    revokeApiKey: vi.fn(),
    uploadAvatar: vi.fn(),
    deleteAvatar: vi.fn(),
  },
}));

vi.mock('./ui.js', () => ({
  showApiError: vi.fn(),
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({ registerActions: vi.fn() }));

vi.mock('./router.js', () => ({
  navigateTo: vi.fn(),
  navigateToIssueByIdentifier: vi.fn(),
  saveScrollPosition: vi.fn(),
  setActiveNav: vi.fn(),
  runNavigationCleanup: vi.fn(),
}));

vi.mock('./auth.js', () => ({ updateUserInfo: vi.fn() }));

const mockIsAdmin = vi.fn(() => false);
const mockMembers = vi.fn(() => []);
vi.mock('./teams.js', () => ({
  isCurrentUserAdmin: (...a) => mockIsAdmin(...a),
  getMembers: (...a) => mockMembers(...a),
  loadTeamMembers: vi.fn(() => Promise.resolve()),
  loadTeamInvitations: vi.fn(() => Promise.resolve()),
}));
const mockAgents = vi.fn(() => []);
vi.mock('./agents.js', () => ({ getAgents: (...a) => mockAgents(...a) }));
vi.mock('./projects.js', () => ({ getProjects: vi.fn(() => [{ id: 'p-1', key: 'CHT' }]) }));
vi.mock('./connected-apps.js', () => ({ revokeConnection: vi.fn(() => Promise.resolve()) }));

const ADA = {
  user_id: 'u-ada', name: 'Ada', avatar_url: null, pronouns: 'she/her', tagline: 'Founder',
  bio: 'Builds **things**.', mention_handle: 'ada', is_agent: false, role: 'owner',
  kind: null, owner_id: null, owner_name: null, project_id: null, idle: false,
  joined_at: '2026-01-02T00:00:00Z',
};
const PIPER = {
  user_id: 'a-piper', name: 'Piper', avatar_url: '🦉', pronouns: null, tagline: 'Reviews PRs',
  bio: null, mention_handle: 'piper', is_agent: true, role: null, kind: 'assistant',
  owner_id: 'u-ada', owner_name: 'Ada', project_id: null, idle: false, joined_at: null,
};
const SAM = {
  ...ADA, user_id: 'u-sam', name: 'Sam', role: 'member', mention_handle: 'sam',
  tagline: '<img src=x onerror=alert(1)>', bio: '<script>alert(1)</script>Hi',
};

function setupDom() {
  document.body.innerHTML = `
    <main class="main-content">
      <div id="people-view" class="view">
        <input type="checkbox" id="people-show-idle">
        <div id="people-list"></div>
      </div>
      <div id="settings-view" class="view"></div>
    </main>
    <div id="modal-title"></div>
    <div id="modal-content"></div>
  `;
}

beforeEach(() => {
  vi.clearAllMocks();
  window.scrollTo = vi.fn();
  resetPeople();
  setupDom();
  setCurrentTeam({ id: 'team-1', name: 'Team' });
  setCurrentUser({ id: 'u-ada', name: 'Ada', avatar_url: null });
  api.getTeamRoster.mockResolvedValue([ADA, SAM, PIPER]);
  api.getTeamIssues.mockResolvedValue([]);
  api.getAgentKeys.mockResolvedValue([]);
  api.getConnections.mockResolvedValue([]);
  mockIsAdmin.mockReturnValue(false);
  mockMembers.mockReturnValue([]);
  mockAgents.mockReturnValue([]);
});

describe('loadPeople', () => {
  it('asks for the roster without idle sessions and shows people, then agents', async () => {
    await loadPeople();

    expect(api.getTeamRoster).toHaveBeenCalledWith('team-1', { includeIdle: false });
    const cards = [...document.querySelectorAll('.person-row')].map(c => c.dataset.userId);
    expect(cards).toEqual(['u-ada', 'u-sam', 'a-piper']);
    expect(document.querySelector('.person-row').getAttribute('href')).toBe('/people/u-ada');
  });

  it('never renders a teammate’s text as HTML', async () => {
    await loadPeople();

    const list = document.getElementById('people-list');
    expect(list.querySelector('img[src="x"]')).toBeNull();
    expect(list.textContent).toContain('<img src=x onerror=alert(1)>');
  });

  it('shows a retry when the roster fails to load', async () => {
    api.getTeamRoster.mockRejectedValue(new Error('down'));

    await loadPeople();

    expect(document.getElementById('people-list').textContent).toContain("Couldn't load the roster");
    expect(showApiError).toHaveBeenCalled();
  });

  it('keeps the cache to the response on screen, not a late superseded one', async () => {
    let resolveFirst;
    api.getTeamRoster
      .mockImplementationOnce(() => new Promise(r => { resolveFirst = r; }))
      .mockResolvedValueOnce([ADA]);

    const first = loadPeople();
    await loadPeople();
    resolveFirst([ADA, SAM, PIPER]);
    await first;

    expect(getRoster()).toEqual([ADA]);
  });

  it('leaves the idle toggle alone while a profile looks up an idle session', async () => {
    await loadPeople();
    let resolve;
    api.getTeamRoster.mockImplementationOnce(() => new Promise(r => { resolve = r; }));

    const pending = viewPerson('a-gone');
    resolve([ADA]);
    await pending;
    await loadPeople();

    expect(api.getTeamRoster).toHaveBeenLastCalledWith('team-1', { includeIdle: false });
  });

  it('drops a response a newer load has superseded', async () => {
    let resolveFirst;
    api.getTeamRoster
      .mockImplementationOnce(() => new Promise(r => { resolveFirst = r; }))
      .mockResolvedValueOnce([ADA]);

    const first = loadPeople();
    await loadPeople();
    resolveFirst([ADA, SAM, PIPER]);
    await first;

    expect(document.querySelectorAll('.person-row')).toHaveLength(1);
  });
});

describe('rosterRole', () => {
  it('names a person’s role and an agent’s kind, owner and idleness', () => {
    expect(rosterRole(ADA)).toBe('Owner');
    expect(rosterRole(PIPER)).toBe('Agent of Ada');
    expect(rosterRole({ ...PIPER, kind: 'session', idle: true })).toBe('Session of Ada · idle');
  });
});

describe('canEditProfile', () => {
  it('lets you edit your own and your agents’, nobody else’s', () => {
    const me = { id: 'u-ada' };
    expect(canEditProfile(ADA, me)).toBe(true);
    expect(canEditProfile(PIPER, me)).toBe(true);
    expect(canEditProfile(SAM, me)).toBe(false);
    expect(canEditProfile({ ...PIPER, owner_id: 'u-sam' }, me)).toBe(false);
  });
});

describe('viewPerson', () => {
  it('shows the profile with the bio rendered and sanitised', async () => {
    await viewPerson('u-sam');

    const view = document.getElementById('person-detail-view');
    expect(view.classList.contains('hidden')).toBe(false);
    expect(document.getElementById('people-view').classList.contains('hidden')).toBe(true);
    expect(view.querySelector('script')).toBeNull();
    expect(view.querySelector('.person-bio').textContent).toContain('Hi');
    expect(view.querySelector('[data-action="edit-profile"]')).toBeNull();
    expect(window.location.pathname).toBe('/people/u-sam');
  });

  it('offers to edit your own profile', async () => {
    await viewPerson('u-ada');

    const edit = document.querySelector('#person-detail-view [data-action="edit-profile"]');
    expect(edit.textContent).toBe('Edit your profile');
    expect(document.querySelector('.person-bio strong').textContent).toBe('things');
  });

  it('asks for idle sessions too when the profile is not in the cached roster', async () => {
    api.getTeamRoster
      .mockResolvedValueOnce([ADA])
      .mockResolvedValueOnce([ADA, { ...PIPER, idle: true }]);
    await loadPeople();

    await viewPerson('a-piper');

    expect(api.getTeamRoster).toHaveBeenLastCalledWith('team-1', { includeIdle: true });
    expect(document.querySelector('.person-profile-name').textContent).toContain('Piper');
  });

  it('runs the navigation cleanup (closes the mobile drawer) first', async () => {
    await viewPerson('u-sam');

    expect(runNavigationCleanup).toHaveBeenCalled();
  });

  it('does not take over the page when the user navigates away while it loads', async () => {
    let resolve;
    api.getTeamRoster.mockImplementationOnce(() => new Promise(r => { resolve = r; }));
    history.replaceState({}, '', '/people');

    const pending = viewPerson('u-sam');
    history.pushState({ view: 'issues' }, '', '/issues');
    resolve([ADA, SAM]);
    await pending;

    expect(document.getElementById('person-detail-view')).toBeNull();
    expect(window.location.pathname).toBe('/issues');
  });

  it('drops a profile from a team the user has switched away from', async () => {
    let resolve;
    api.getTeamRoster.mockImplementationOnce(() => new Promise(r => { resolve = r; }));

    const pending = viewPerson('u-sam');
    setCurrentTeam({ id: 'team-2', name: 'Other' });
    resolve([ADA, SAM]);
    await pending;

    expect(document.getElementById('person-detail-view')).toBeNull();
    expect(getRoster()).toEqual([]);
  });

  it('points the address at the roster when a profile reached by address fails to load', async () => {
    history.replaceState({}, '', '/people/u-sam');
    api.getTeamRoster.mockRejectedValueOnce(new Error('down'));

    await viewPerson('u-sam', false);

    expect(window.location.pathname).toBe('/people');
    expect(navigateTo).toHaveBeenCalledWith('people', false);
  });

  it('goes back to the roster for someone not on it', async () => {
    await viewPerson('u-nobody');

    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('roster'), 'error');
    expect(navigateTo).toHaveBeenCalledWith('people', true);
  });
});

describe('editing a profile', () => {
  it('fills the form with the current profile', async () => {
    await loadPeople();

    await showEditProfileModal('u-ada');

    expect(document.getElementById('profile-name').value).toBe('Ada');
    expect(document.getElementById('profile-bio').value).toBe('Builds **things**.');
    expect(document.getElementById('profile-tagline').maxLength).toBe(120);
  });

  it('refuses to open for someone else’s profile', async () => {
    await loadPeople();

    await showEditProfileModal('u-sam');

    expect(document.getElementById('modal-content').innerHTML).toBe('');
  });

  it('without a starting point, sends every field: blank clears, a blank avatar is null', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input id="profile-name" value="Ada">
      <input id="profile-avatar" value="  ">
      <input id="profile-pronouns" value="">
      <input id="profile-tagline" value="New">
      <textarea id="profile-bio"></textarea>`;

    expect(profilePayload(form)).toEqual({
      name: 'Ada', avatar_url: null, pronouns: '', tagline: 'New', bio: '',
    });
  });

  it('saves your own through /users/me and updates the header', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    document.getElementById('profile-tagline').value = 'Builder';
    api.updateMe.mockResolvedValue({ id: 'u-ada', name: 'Ada', avatar_url: null, pronouns: 'she/her', tagline: 'Builder', bio: 'x' });

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(api.updateMe).toHaveBeenCalledWith({ tagline: 'Builder' });
    expect(getCurrentUser().tagline).toBe('Builder');
    expect(updateUserInfo).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
    expect(getRoster().find(r => r.user_id === 'u-ada').tagline).toBe('Builder');
  });

  it('saves an agent you own through its own route', async () => {
    await loadPeople();
    await showEditProfileModal('a-piper');
    document.getElementById('profile-bio').value = 'I review.';
    api.updateAgent.mockResolvedValue({ ...PIPER, id: 'a-piper', bio: 'I review.' });

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(api.updateAgent).toHaveBeenCalledWith('a-piper', { bio: 'I review.' });
    expect(api.updateMe).not.toHaveBeenCalled();
    expect(updateUserInfo).not.toHaveBeenCalled();
  });

  it('keeps the form open when the server refuses', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    document.getElementById('profile-pronouns').value = 'they/them';
    api.updateMe.mockRejectedValue(Object.assign(new Error('That name is taken'), { status: 409 }));

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(showApiError).toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('sends only what changed, so it never reverts an edit made elsewhere', () => {
    const form = document.createElement('form');
    form.innerHTML = `
      <input id="profile-name" value="Ada">
      <input id="profile-avatar" value="🦊 ">
      <input id="profile-pronouns" value="">
      <input id="profile-tagline" value="Founder">
      <textarea id="profile-bio">Builds.</textarea>`;
    const initial = { name: 'Ada', avatar_url: '', pronouns: 'she/her', tagline: 'Founder', bio: 'Builds.' };

    expect(profilePayload(form, initial)).toEqual({ avatar_url: '🦊', pronouns: '' });
    expect(profilePayload(form, { ...initial, avatar_url: '🦊', pronouns: '' })).toEqual({});
  });

  it('opens on a fresh copy of the profile, not the cached roster', async () => {
    await loadPeople();
    api.getTeamRoster.mockResolvedValueOnce([ADA, SAM, { ...PIPER, bio: 'Rewritten by Piper.' }]);

    await showEditProfileModal('a-piper');

    expect(api.getTeamRoster).toHaveBeenLastCalledWith('team-1', { includeIdle: true });
    expect(document.getElementById('profile-bio').value).toBe('Rewritten by Piper.');
    expect(getRoster().find(r => r.user_id === 'a-piper').bio).toBe('Rewritten by Piper.');
  });

  it('closes without a request when nothing changed', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');

    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    expect(api.updateMe).not.toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });

  it('sends one request for a double submit', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    document.getElementById('profile-tagline').value = 'Builder';
    let finish;
    api.updateMe.mockImplementation(() => new Promise(r => { finish = r; }));
    const form = document.querySelector('#modal-content form');

    const first = handleSaveProfile({ preventDefault: vi.fn(), target: form });
    expect(form.querySelector('button[type="submit"]').disabled).toBe(true);
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });
    finish({ id: 'u-ada', name: 'Ada', tagline: 'Builder' });
    await first;

    expect(api.updateMe).toHaveBeenCalledTimes(1);
  });

  it('never redraws another member’s page with the saved profile', async () => {
    await viewPerson('u-sam');
    await showEditProfileModal('a-piper');
    document.getElementById('profile-tagline').value = 'Reviews everything';
    api.updateAgent.mockResolvedValue({ ...PIPER, id: 'a-piper', tagline: 'Reviews everything' });

    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    expect(document.querySelector('.person-profile-name').textContent).toContain('Sam');
  });

  it('drops a form whose page was left while it loaded', async () => {
    await loadPeople();
    let resolve;
    api.getTeamRoster.mockImplementationOnce(() => new Promise(r => { resolve = r; }));
    history.replaceState({}, '', '/people/a-piper');

    const pending = showEditProfileModal('a-piper');
    history.pushState({}, '', '/people/u-ada');
    resolve([ADA, SAM, PIPER]);
    await pending;

    expect(document.getElementById('modal-content').innerHTML).toBe('');
  });

  it('a slow save leaves a form opened after it alone', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    document.getElementById('profile-tagline').value = 'Builder';
    let finish;
    api.updateMe.mockImplementationOnce(() => new Promise(r => { finish = r; }));
    const first = handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    await showEditProfileModal('u-ada');
    expect(document.querySelector('#modal-content button[type="submit"]').disabled).toBe(true);
    closeModal.mockClear();
    finish({ id: 'u-ada', name: 'Ada', tagline: 'Builder' });
    await first;

    expect(closeModal).not.toHaveBeenCalled();
    expect(document.querySelector('#modal-content button[type="submit"]').disabled).toBe(false);
  });

  it('does not count a CRLF or leading-newline bio as changed', async () => {
    api.getTeamRoster.mockResolvedValue([{ ...ADA, bio: '\nLine one\r\nLine two' }, SAM, PIPER]);
    await loadPeople();
    await showEditProfileModal('u-ada');

    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    expect(api.updateMe).not.toHaveBeenCalled();
  });

  it('keeps the issue list when saving on the profile page', async () => {
    api.getTeamIssues.mockResolvedValue([{ identifier: 'CHT-1', title: 'Now', status: 'in_progress' }]);
    await viewPerson('u-ada');
    await new Promise(r => setTimeout(r, 0));
    api.getTeamIssues.mockClear();
    await showEditProfileModal('u-ada');
    document.getElementById('profile-tagline').value = 'Builder';
    api.updateMe.mockResolvedValue({ id: 'u-ada', name: 'Ada', tagline: 'Builder' });

    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    expect(document.querySelector('.person-tagline').textContent).toBe('Builder');
    expect(document.querySelectorAll('.person-issue')).toHaveLength(1);
    expect(api.getTeamIssues).not.toHaveBeenCalled();
  });
});

describe('renderPerson', () => {
  it('shows a prompt for your own empty bio', () => {
    renderPerson({ ...ADA, bio: null });

    expect(document.querySelector('.person-bio-empty').textContent).toContain('You haven’t written a bio yet.');
  });

  it('renderPeople with an empty roster says so', () => {
    renderPeople();

    expect(document.getElementById('people-list').textContent).toContain('No one yet.');
  });
});

describe('loadPersonIssues', () => {
  it('lists their open work, in progress first, as escaped links', async () => {
    api.getTeamIssues.mockResolvedValue([
      { identifier: 'CHT-2', title: 'Later', status: 'todo' },
      { identifier: 'CHT-1', title: '<b>Now</b>', status: 'in_progress' },
    ]);

    await viewPerson('u-sam');
    await new Promise(r => setTimeout(r, 0));

    expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', {
      assignee_id: 'u-sam', status: ['in_progress', 'in_review', 'todo'], sort_by: 'status', order: 'asc', limit: 20,
    });
    const rows = [...document.querySelectorAll('.person-issue')];
    expect(rows.map(r => r.dataset.identifier)).toEqual(['CHT-1', 'CHT-2']);
    expect(rows[0].querySelector('b')).toBeNull();
    expect(rows[0].getAttribute('href')).toBe('/issue/CHT-1');
  });

  it('says when nothing is assigned, and when loading failed', async () => {
    await viewPerson('u-sam');
    await new Promise(r => setTimeout(r, 0));
    expect(document.getElementById('person-issues').textContent).toContain('Nothing open assigned.');

    api.getTeamIssues.mockRejectedValue(new Error('down'));
    await viewPerson('u-sam');
    await new Promise(r => setTimeout(r, 0));
    expect(document.getElementById('person-issues').textContent).toContain('Couldn’t load');
  });
});

describe('profile photos', () => {
  const SHA = 'a'.repeat(64);

  it('offers photo controls on your own form only', async () => {
    await loadPeople();

    await showEditProfileModal('a-piper');
    expect(document.getElementById('profile-photo')).toBeNull();

    await showEditProfileModal('u-ada');
    expect(document.getElementById('profile-photo')).not.toBeNull();
    expect(document.getElementById('profile-photo-remove').classList.contains('hidden')).toBe(true);
  });

  it('uploads the resized picture and shows it everywhere', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    const file = new File(['x'], 'me.png', { type: 'image/png' });
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    const resized = new Blob(['y'], { type: 'image/webp' });
    const resize = vi.fn().mockResolvedValue(resized);
    api.uploadAvatar.mockResolvedValue({ id: 'u-ada', avatar_url: `/api/avatars/${SHA}` });

    await handlePickPhoto(input, resize);

    expect(resize).toHaveBeenCalledWith(file);
    expect(api.uploadAvatar).toHaveBeenCalledWith(resized);
    expect(getCurrentUser().avatar_url).toBe(`/api/avatars/${SHA}`);
    expect(updateUserInfo).toHaveBeenCalled();
    expect(document.getElementById('profile-avatar').value).toBe(`/api/avatars/${SHA}`);
    expect(document.getElementById('profile-photo-remove').classList.contains('hidden')).toBe(false);
    expect(getRoster().find(r => r.user_id === 'u-ada').avatar_url).toBe(`/api/avatars/${SHA}`);
  });

  it('does not resend the uploaded picture when the form is saved after', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'me.png')], configurable: true });
    api.uploadAvatar.mockResolvedValue({ id: 'u-ada', avatar_url: `/api/avatars/${SHA}` });
    await handlePickPhoto(input, vi.fn().mockResolvedValue(new Blob(['y'])));
    document.getElementById('profile-tagline').value = 'Builder';
    api.updateMe.mockResolvedValue({ id: 'u-ada', name: 'Ada', avatar_url: `/api/avatars/${SHA}`, tagline: 'Builder' });

    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });

    expect(api.updateMe).toHaveBeenCalledWith({ tagline: 'Builder' });
  });

  it('reports a refused upload and keeps the old avatar', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'big.png')], configurable: true });
    api.uploadAvatar.mockRejectedValue(Object.assign(new Error('Too large'), { status: 413 }));

    await handlePickPhoto(input, vi.fn().mockResolvedValue(new Blob(['y'])));

    expect(showApiError).toHaveBeenCalled();
    expect(getCurrentUser().avatar_url).toBeNull();
    expect(input.disabled).toBe(false);
  });

  it('leaves a form opened during the upload alone, and still updates you', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'me.png')], configurable: true });
    let finish;
    api.uploadAvatar.mockImplementationOnce(() => new Promise(r => { finish = r; }));
    const pending = handlePickPhoto(input, vi.fn().mockResolvedValue(new Blob(['y'])));
    await new Promise(r => setTimeout(r, 0));

    await showEditProfileModal('a-piper');
    finish({ id: 'u-ada', avatar_url: `/api/avatars/${SHA}` });
    await pending;

    expect(document.getElementById('profile-avatar').value).toBe('🦉');
    expect(getCurrentUser().avatar_url).toBe(`/api/avatars/${SHA}`);
    await handleSaveProfile({ preventDefault: vi.fn(), target: document.querySelector('#modal-content form') });
    expect(api.updateAgent).not.toHaveBeenCalled();
  });

  it('your own form opened during an upload waits for it, then shows it', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'me.png')], configurable: true });
    let finish;
    api.uploadAvatar.mockImplementationOnce(() => new Promise(r => { finish = r; }));
    const pending = handlePickPhoto(input, vi.fn().mockResolvedValue(new Blob(['y'])));
    await new Promise(r => setTimeout(r, 0));

    await showEditProfileModal('u-ada');
    expect(document.getElementById('profile-photo-remove').disabled).toBe(true);
    finish({ id: 'u-ada', avatar_url: `/api/avatars/${SHA}` });
    await pending;

    expect(document.getElementById('profile-avatar').value).toBe(`/api/avatars/${SHA}`);
    expect(document.getElementById('profile-photo-remove').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('profile-photo-remove').disabled).toBe(false);
  });

  it('redraws your profile page with the new picture though the roster is not cached', async () => {
    await viewPerson('u-ada');
    api.uploadAvatar.mockResolvedValue({ id: 'u-ada', avatar_url: `/api/avatars/${SHA}` });
    await showEditProfileModal('u-ada');
    const input = document.getElementById('profile-photo');
    Object.defineProperty(input, 'files', { value: [new File(['x'], 'me.png')], configurable: true });

    await handlePickPhoto(input, vi.fn().mockResolvedValue(new Blob(['y'])));

    expect(document.querySelector('.person-profile img').getAttribute('src')).toBe(`/api/avatars/${SHA}`);
  });

  it('runs one photo change at a time', async () => {
    await loadPeople();
    await showEditProfileModal('u-ada');
    let finish;
    api.deleteAvatar.mockImplementationOnce(() => new Promise(r => { finish = r; }));

    const first = handleRemovePhoto();
    await handleRemovePhoto();
    finish({ id: 'u-ada', avatar_url: null });
    await first;

    expect(api.deleteAvatar).toHaveBeenCalledTimes(1);
  });

  it('removes the photo', async () => {
    setCurrentUser({ id: 'u-ada', name: 'Ada', avatar_url: `/api/avatars/${SHA}` });
    api.getTeamRoster.mockResolvedValue([{ ...ADA, avatar_url: `/api/avatars/${SHA}` }]);
    await loadPeople();
    await showEditProfileModal('u-ada');
    expect(document.getElementById('profile-photo-remove').classList.contains('hidden')).toBe(false);
    api.deleteAvatar.mockResolvedValue({ id: 'u-ada', avatar_url: null });

    await handleRemovePhoto();

    expect(getCurrentUser().avatar_url).toBeNull();
    expect(document.getElementById('profile-photo-remove').classList.contains('hidden')).toBe(true);
  });

  it('renders an uploaded picture as an image', async () => {
    api.getTeamRoster.mockResolvedValue([{ ...ADA, avatar_url: `/api/avatars/${SHA}` }]);

    await loadPeople();

    expect(document.querySelector('.person-row img').getAttribute('src')).toBe(`/api/avatars/${SHA}`);
  });
});

describe('resizePhoto', () => {
  function fakeCanvas(types) {
    const ctx = { drawImage: vi.fn(), fillRect: vi.fn() };
    return {
      width: 0, height: 0,
      getContext: () => ctx,
      toBlob: (cb, type) => cb(types.includes(type) ? new Blob(['z'], { type }) : (types.includes('png') ? new Blob(['p'], { type: 'image/png' }) : null)),
      ctx,
    };
  }

  beforeEach(() => {
    globalThis.createImageBitmap = vi.fn().mockResolvedValue({ width: 400, height: 300, close: vi.fn() });
  });

  it('centre-crops to a square and prefers WebP', async () => {
    const canvas = fakeCanvas(['image/webp']);
    vi.spyOn(document, 'createElement').mockReturnValueOnce(canvas);

    const blob = await resizePhoto(new File(['x'], 'me.png'));

    expect(blob.type).toBe('image/webp');
    expect(canvas.ctx.drawImage).toHaveBeenCalledWith(expect.anything(), 50, 0, 300, 300, 0, 0, 256, 256);
  });

  it('falls back to JPEG on white where WebP is not encoded (it answers PNG)', async () => {
    const canvas = fakeCanvas(['image/jpeg', 'png']);
    vi.spyOn(document, 'createElement').mockReturnValueOnce(canvas);

    expect((await resizePhoto(new File(['x'], 'me.png'))).type).toBe('image/jpeg');
    expect(canvas.ctx.fillStyle).toBe('#fff');
    expect(canvas.ctx.globalCompositeOperation).toBe('destination-over');
    expect(canvas.ctx.fillRect).toHaveBeenCalledWith(0, 0, 256, 256);
  });

  it('keeps WebP transparent: no fill', async () => {
    const canvas = fakeCanvas(['image/webp']);
    vi.spyOn(document, 'createElement').mockReturnValueOnce(canvas);

    await resizePhoto(new File(['x'], 'me.png'));

    expect(canvas.ctx.fillRect).not.toHaveBeenCalled();
  });

  it('says so when the browser cannot encode at all', async () => {
    vi.spyOn(document, 'createElement').mockReturnValueOnce(fakeCanvas([]));

    await expect(resizePhoto(new File(['x'], 'me.png'))).rejects.toThrow('could not convert');
  });
});

// One home per agent (CHT-2044).
describe('the roster as one home', () => {
  it('shows what each teammate is working on, from one request', async () => {
    api.getTeamIssues.mockResolvedValue([
      { identifier: 'CHT-1', title: 'Ship it', assignee_id: 'a-piper', status: 'in_progress' },
      { identifier: 'CHT-2', title: 'And this', assignee_id: 'a-piper', status: 'in_progress' },
    ]);
    await loadPeople();
    expect(api.getTeamIssues).toHaveBeenCalledTimes(1);
    expect(api.getTeamIssues).toHaveBeenCalledWith('team-1', expect.objectContaining({ status: ['in_progress'] }));
    const piper = document.querySelector('.person-row[data-user-id="a-piper"]');
    expect(piper.textContent).toContain('Working on CHT-1 Ship it and 1 more');
  });

  it('still shows the roster when the working-on request fails', async () => {
    api.getTeamIssues.mockRejectedValue(new Error('down'));
    await loadPeople();
    expect(document.querySelectorAll('.person-row')).toHaveLength(3);
  });

  it('labels agents with their scope and a registrar as one', async () => {
    mockAgents.mockReturnValue([{ id: 'a-piper', can_register: true }]);
    api.getTeamRoster.mockResolvedValue([ADA, { ...PIPER, project_id: 'p-1' }]);
    await loadPeople();
    const piper = document.querySelector('.person-row[data-user-id="a-piper"]');
    expect(piper.textContent).toContain('Project CHT');
    expect(piper.textContent).toContain('Registrar');
  });

  it('heads the sections Humans and Agents with counts', async () => {
    await loadPeople();
    const heads = [...document.querySelectorAll('#people-list .section-header h3')].map(h => h.textContent.replace(/\s+/g, ' ').trim());
    expect(heads).toEqual(['Humans 2', 'Agents 1']);
  });
});

describe('an agent profile holds access, credentials and owner actions', () => {
  const show = async (entry, roster = [ADA, entry]) => {
    api.getTeamRoster.mockResolvedValue(roster);
    await loadPeople();
    renderPerson(entry, { withIssues: false });
    await new Promise(r => setTimeout(r, 0));
    return document.getElementById('person-detail-view');
  };

  it('shows scope and owner to everyone, credentials and actions only to a manager', async () => {
    setCurrentUser({ id: 'u-sam', name: 'Sam' });
    const view = await show(PIPER);
    expect(view.querySelector('.agent-access').textContent).toContain('Team-wide');
    expect(view.querySelector('.agent-access').textContent).toContain('Ada');
    expect(view.querySelector('#agent-credentials')).toBeNull();
    expect(view.querySelector('[data-action="delete-agent"]')).toBeNull();
    expect(api.getAgentKeys).not.toHaveBeenCalled();
  });

  it('gives its owner the keys, its connected apps and the actions', async () => {
    mockAgents.mockReturnValue([{ id: 'a-piper', is_active: true, can_register: false }]);
    api.getAgentKeys.mockResolvedValue([
      { id: 'k1', key_prefix: 'ck_ab', is_active: true, created_at: '2026-01-01T00:00:00Z', last_used_at: null },
      { id: 'k0', key_prefix: 'ck_old', is_active: false, created_at: '2025-01-01T00:00:00Z' },
    ]);
    api.getConnections.mockResolvedValue([
      { id: 'c1', acts_as: 'agent', agent: { id: 'a-piper' }, client: { name: 'An MCP app' }, created_at: '2026-01-01T00:00:00Z' },
      { id: 'c2', acts_as: 'agent', agent: { id: 'someone-else' }, client: { name: 'Other' }, created_at: '2026-01-01T00:00:00Z' },
    ]);
    const view = await show(PIPER);
    expect(api.getAgentKeys).toHaveBeenCalledWith('a-piper');
    const creds = view.querySelector('#agent-credentials');
    expect(creds.textContent).toContain('ck_ab');
    expect(creds.textContent).not.toContain('ck_old');
    expect(creds.textContent).toContain('An MCP app');
    expect(creds.textContent).not.toContain('Other');
    expect(creds.querySelector('[data-action="revoke-agent-key"]').dataset.keyId).toBe('k1');
    expect(view.querySelector('[data-action="toggle-agent-registrar"]').textContent).toBe('Make registrar');
    expect(view.querySelector('[data-action="delete-agent"]')).not.toBeNull();
    expect(view.querySelector('[data-action="generate-agent-key"]')).not.toBeNull();
  });

  it('gives a team admin the actions on someone else\'s agent', async () => {
    setCurrentUser({ id: 'u-sam', name: 'Sam' });
    mockIsAdmin.mockReturnValue(true);
    const view = await show(PIPER);
    expect(view.querySelector('[data-action="delete-agent"]')).not.toBeNull();
  });

  it('offers no registrar toggle on a session identity, and says who registered it', async () => {
    const reg = { ...PIPER, user_id: 'a-reg', name: 'Reg', kind: 'service' };
    const ses = { ...PIPER, user_id: 'a-ses', name: 'Reg · main', kind: 'session' };
    mockAgents.mockReturnValue([{ id: 'a-reg', can_register: true }, { id: 'a-ses', registered_by_id: 'a-reg' }]);
    const view = await show(ses, [ADA, reg, ses]);
    expect(view.querySelector('[data-action="toggle-agent-registrar"]')).toBeNull();
    expect(view.querySelector('.agent-access').textContent).toContain('Registered by');
    expect(view.querySelector('.agent-access').textContent).toContain('Reg');
  });

  it('lists the sessions a registrar registered', async () => {
    const reg = { ...PIPER, user_id: 'a-reg', name: 'Reg', kind: 'service' };
    const ses = { ...PIPER, user_id: 'a-ses', name: 'Reg · main', kind: 'session' };
    mockAgents.mockReturnValue([{ id: 'a-reg', can_register: true }, { id: 'a-ses', registered_by_id: 'a-reg' }]);
    const view = await show(reg, [ADA, reg, ses]);
    expect(view.querySelector('.agent-access').textContent).toContain('Reg · main');
    expect(view.querySelector('[data-action="toggle-agent-registrar"]').textContent).toBe('Stop being a registrar');
  });

  it('says so when the keys cannot be loaded', async () => {
    api.getAgentKeys.mockRejectedValue(new Error('down'));
    const view = await show(PIPER);
    expect(view.querySelector('#agent-credentials').textContent).toContain('Couldn’t load its keys');
  });

  it('leaves the roster when the agent shown is deleted', async () => {
    await show(PIPER);
    window.dispatchEvent(new CustomEvent('chaotic:agent-changed', { detail: { agentId: 'a-piper', deleted: true } }));
    expect(navigateTo).toHaveBeenCalledWith('people');
    expect(getRoster().some(r => r.user_id === 'a-piper')).toBe(false);
  });

  it('redraws when the agent shown changes', async () => {
    const view = await show(PIPER);
    mockAgents.mockReturnValue([{ id: 'a-piper', can_register: true, is_active: true }]);
    window.dispatchEvent(new CustomEvent('chaotic:agent-changed', { detail: { agentId: 'a-piper' } }));
    expect(view.querySelector('[data-action="toggle-agent-registrar"]').textContent).toBe('Stop being a registrar');
  });
});

describe('a person\'s membership, for admins', () => {
  it('shows a team admin the address and Remove, never for an owner or yourself', async () => {
    mockIsAdmin.mockReturnValue(true);
    mockMembers.mockReturnValue([
      { user_id: 'u-sam', role: 'member', user_email: 'sam@example.com' },
      { user_id: 'u-ada', role: 'owner', user_email: 'ada@example.com' },
    ]);
    renderPerson(SAM, { withIssues: false });
    let view = document.getElementById('person-detail-view');
    expect(view.textContent).toContain('sam@example.com');
    expect(view.querySelector('[data-action="remove-member"]').dataset.userId).toBe('u-sam');
    renderPerson(ADA, { withIssues: false });
    view = document.getElementById('person-detail-view');
    expect(view.querySelector('[data-action="remove-member"]')).toBeNull();
  });

  it('shows a member no one\'s address', () => {
    mockMembers.mockReturnValue([{ user_id: 'u-sam', role: 'member', user_email: 'sam@example.com' }]);
    renderPerson(SAM, { withIssues: false });
    expect(document.getElementById('person-detail-view').textContent).not.toContain('sam@example.com');
  });

  it('leaves a removed member\'s page', async () => {
    await loadPeople();
    renderPerson(SAM, { withIssues: false });
    window.dispatchEvent(new CustomEvent('chaotic:member-removed', { detail: { userId: 'u-sam' } }));
    expect(navigateTo).toHaveBeenCalledWith('people');
  });
});
