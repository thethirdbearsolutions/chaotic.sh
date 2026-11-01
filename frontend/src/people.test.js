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
      <div id="team-view" class="view"></div>
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
});

describe('loadPeople', () => {
  it('asks for the roster without idle sessions and shows people, then agents', async () => {
    await loadPeople();

    expect(api.getTeamRoster).toHaveBeenCalledWith('team-1', { includeIdle: false });
    const cards = [...document.querySelectorAll('.person-card')].map(c => c.dataset.userId);
    expect(cards).toEqual(['u-ada', 'u-sam', 'a-piper']);
    expect(document.querySelector('.person-card').getAttribute('href')).toBe('/people/u-ada');
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

    expect(document.querySelectorAll('.person-card')).toHaveLength(1);
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

    expect(document.querySelector('.person-card img').getAttribute('src')).toBe(`/api/avatars/${SHA}`);
  });
});
