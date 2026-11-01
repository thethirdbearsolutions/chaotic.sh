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
  getRoster,
  resetPeople,
} from './people.js';
import { api } from './api.js';
import { showToast, showApiError, closeModal } from './ui.js';
import { navigateTo } from './router.js';
import { updateUserInfo } from './auth.js';

vi.mock('./api.js', () => ({
  api: {
    getTeamRoster: vi.fn(),
    updateMe: vi.fn(),
    updateAgent: vi.fn(),
    getTeamIssues: vi.fn(),
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

  it('goes back to the roster for someone not on it', async () => {
    await viewPerson('u-nobody');

    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('roster'), 'error');
    expect(navigateTo).toHaveBeenCalledWith('people', true);
  });
});

describe('editing a profile', () => {
  it('fills the form with the current profile', async () => {
    await loadPeople();

    showEditProfileModal('u-ada');

    expect(document.getElementById('profile-name').value).toBe('Ada');
    expect(document.getElementById('profile-bio').value).toBe('Builds **things**.');
    expect(document.getElementById('profile-tagline').maxLength).toBe(120);
  });

  it('refuses to open for someone else’s profile', async () => {
    await loadPeople();

    showEditProfileModal('u-sam');

    expect(document.getElementById('modal-content').innerHTML).toBe('');
  });

  it('sends blank fields to clear them and a blank avatar as null', () => {
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
    showEditProfileModal('u-ada');
    document.getElementById('profile-tagline').value = 'Builder';
    api.updateMe.mockResolvedValue({ id: 'u-ada', name: 'Ada', avatar_url: null, pronouns: 'she/her', tagline: 'Builder', bio: 'x' });

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(api.updateMe).toHaveBeenCalledWith(expect.objectContaining({ tagline: 'Builder' }));
    expect(getCurrentUser().tagline).toBe('Builder');
    expect(updateUserInfo).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
    expect(getRoster().find(r => r.user_id === 'u-ada').tagline).toBe('Builder');
  });

  it('saves an agent you own through its own route', async () => {
    await loadPeople();
    showEditProfileModal('a-piper');
    api.updateAgent.mockResolvedValue({ ...PIPER, id: 'a-piper', bio: 'I review.' });

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(api.updateAgent).toHaveBeenCalledWith('a-piper', expect.any(Object));
    expect(api.updateMe).not.toHaveBeenCalled();
    expect(updateUserInfo).not.toHaveBeenCalled();
  });

  it('keeps the form open when the server refuses', async () => {
    await loadPeople();
    showEditProfileModal('u-ada');
    api.updateMe.mockRejectedValue(Object.assign(new Error('That name is taken'), { status: 409 }));

    const form = document.querySelector('#modal-content form');
    await handleSaveProfile({ preventDefault: vi.fn(), target: form });

    expect(showApiError).toHaveBeenCalled();
    expect(closeModal).not.toHaveBeenCalled();
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
      assignee_id: 'u-sam', status: ['in_progress', 'in_review', 'todo'], limit: 20,
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
