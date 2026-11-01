import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentTeam, setCurrentTeam, setCurrentUser, getLabels } from './state.js';
import {
  getTeams,
  getMembers,
  setMembers,
  loadTeams,
  selectTeam,
  toggleTeamDropdown,
  toggleUserDropdown,
  loadTeamMembersQuiet,
  loadTeamMembers,
  loadTeamAgents,
  loadTeamInvitations,
  loadLabels,
  showInviteModal,
  handleInvite,
  showInviteLink,
  copyInviteLink,
  inviteLinkForDisplay,
  isPendingInvitationRefusal,
  isLocalHost,
  removeMember,
  deleteInvitation,
  issueInvitationCode,
  signedUpRelative,
  showCreateTeamModal,
  showEditTeamModal,
  handleCreateTeam,
  handleUpdateTeam,
} from './teams.js';
import { api } from './api.js';
import { showApiError, showModal, closeModal, showToast, isModalOpen } from './ui.js';
import { registerActions } from './event-delegation.js';
import localHosts from '../../testdata/local-hosts.json';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getMyTeams: vi.fn(),
    getTeamMembers: vi.fn(),
    getTeamInvitations: vi.fn(),
    getTeamAgents: vi.fn(),
    getLabels: vi.fn(),
    createInvitation: vi.fn(),
    removeMember: vi.fn(),
    deleteInvitation: vi.fn(),
    issueInvitationVerificationCode: vi.fn(),
    createTeam: vi.fn(),
    updateTeam: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
  isModalOpen: vi.fn(() => false),
}));

vi.mock('./event-delegation.js', () => ({
  registerActions: vi.fn(),
}));

const mockNavigateTo = vi.fn();
const mockHandleRoute = vi.fn();
vi.mock('./router.js', () => ({
  navigateTo: (...args) => mockNavigateTo(...args),
  handleRoute: (...args) => mockHandleRoute(...args),
}));

const mockLoadProjects = vi.fn().mockResolvedValue();
const mockSetProjects = vi.fn();
const mockChooseCurrentProject = vi.fn();
vi.mock('./projects.js', () => ({
  loadProjects: (...args) => mockLoadProjects(...args),
  setProjects: (...args) => mockSetProjects(...args),
  updateProjectFilters: vi.fn(),
  chooseCurrentProject: (...args) => mockChooseCurrentProject(...args),
}));

const mockLoadTeamAgentsQuiet = vi.fn().mockResolvedValue();
const mockGetAgents = vi.fn(() => []);
vi.mock('./agents.js', () => ({
  loadTeamAgentsQuiet: (...args) => mockLoadTeamAgentsQuiet(...args),
  getAgents: (...args) => mockGetAgents(...args),
  setAgents: (...args) => mockSetAgents(...args),
}));
const mockSetAgents = vi.fn();
const mockImportIssueStore = vi.fn();
vi.mock('./issue-store.js', () => ({
  importIssueStore: (...args) => mockImportIssueStore(...args),
}));

const mockConnectWebSocket = vi.fn();
vi.mock('./ws.js', () => ({
  connectWebSocket: (...args) => mockConnectWebSocket(...args),
}));

const mockUpdateAssigneeFilter = vi.fn();
const mockBuildAssignees = vi.fn();
vi.mock('./assignees.js', () => ({
  updateAssigneeFilter: (...args) => mockUpdateAssigneeFilter(...args),
  buildAssignees: (...args) => mockBuildAssignees(...args),
}));

vi.mock('./inbox.js', () => ({
  refreshInboxUnreadCount: vi.fn(() => Promise.resolve()),
}));

// Actions registered at module import time — capture before vi.clearAllMocks wipes them
const teamsActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('getTeams', () => {
  it('returns empty array initially', () => {
    expect(getTeams()).toEqual([]);
  });
});

describe('getMembers / setMembers', () => {
  it('returns empty array initially', () => {
    expect(getMembers()).toEqual([]);
  });

  it('allows setting members externally', () => {
    const newMembers = [{ id: '1', user_name: 'Test' }];
    setMembers(newMembers);
    expect(getMembers()).toEqual(newMembers);
    // Reset
    setMembers([]);
  });
});

describe('loadTeams', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-list"></div>';
    vi.clearAllMocks();
  });

  it('fetches and renders teams', async () => {
    const teams = [{ id: 'team-1', name: 'Test Team' }];
    api.getMyTeams.mockResolvedValue(teams);
    await loadTeams();
    const list = document.getElementById('team-list');
    expect(list.innerHTML).toContain('Test Team');
  });

  it('uses a request already in flight instead of asking again (CHT-1971)', async () => {
    await loadTeams(Promise.resolve([{ id: 'team-2', name: 'Early Team' }]));
    expect(api.getMyTeams).not.toHaveBeenCalled();
    expect(document.getElementById('team-list').innerHTML).toContain('Early Team');
  });

  it('escapes team names for XSS prevention', async () => {
    const teams = [{ id: 'team-1', name: '<script>xss</script>' }];
    api.getMyTeams.mockResolvedValue(teams);
    await loadTeams();
    const list = document.getElementById('team-list');
    // The button text content should have the escaped HTML displayed as text
    const button = list.querySelector('button');
    expect(button.textContent).toBe('<script>xss</script>');
    // Verify no script element was created
    expect(list.querySelector('script')).toBeNull();
  });
});

describe('renderTeamList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-list"></div>';
  });

  it('shows empty state when no teams', async () => {
    api.getMyTeams.mockResolvedValue([]);
    await loadTeams();
    const list = document.getElementById('team-list');
    expect(list.innerHTML).toContain('No teams yet');
  });
});

describe('selectTeam', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <span id="current-team-name"></span>
      <div id="team-description-text"></div>
      <div id="team-dropdown"></div>
    `;
    vi.clearAllMocks();
    mockLoadProjects.mockResolvedValue();
    api.getLabels = vi.fn().mockResolvedValue([]);
    mockLoadTeamAgentsQuiet.mockResolvedValue();
    mockConnectWebSocket.mockClear();
    mockNavigateTo.mockClear();
    mockHandleRoute.mockClear();
    api.getTeamMembers.mockResolvedValue([]);
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  // CHT-1972: with a boot-cache seed the view routes on the cached team
  // data at once, and the usual requests refresh it behind the paint.
  it('routes at once on a seed, then refreshes the team data', async () => {
    let finishProjects;
    mockLoadProjects.mockReturnValue(new Promise((r) => { finishProjects = r; }));
    api.getLabels = vi.fn(() => new Promise(() => {}));
    api.getTeamMembers.mockReturnValue(new Promise(() => {}));
    const seed = {
      projects: [{ id: 'p1' }],
      labels: [{ id: 'l1', name: 'bug' }],
      members: [{ id: 'm1' }],
      agents: [{ id: 'a1' }],
      issues: { queries: [] },
    };
    await selectTeam({ id: 'team-1', name: 'T' }, true, { seed });
    expect(mockSetProjects).toHaveBeenCalledWith([{ id: 'p1' }]);
    expect(mockChooseCurrentProject).toHaveBeenCalled();
    expect(getLabels()).toEqual([{ id: 'l1', name: 'bug' }]);
    expect(getMembers()).toEqual([{ id: 'm1' }]);
    expect(mockSetAgents).toHaveBeenCalledWith([{ id: 'a1' }]);
    expect(mockImportIssueStore).toHaveBeenCalledWith(seed.issues);
    expect(mockHandleRoute).toHaveBeenCalled();
    // The refresh is in flight, not awaited.
    expect(mockLoadProjects).toHaveBeenCalled();
    expect(api.getLabels).toHaveBeenCalled();
    expect(api.getTeamMembers).toHaveBeenCalled();
    expect(mockLoadTeamAgentsQuiet).toHaveBeenCalled();
    finishProjects();
  });

  it('sets currentTeam and updates UI', async () => {
    const team = { id: 'team-1', name: 'My Team', description: 'Test desc' };
    await selectTeam(team);
    expect(getCurrentTeam()).toEqual(team);
    expect(document.getElementById('current-team-name').textContent).toBe('My Team');
    expect(document.getElementById('team-description-text').textContent).toBe('Test desc');
  });

  it('updates mobile team name when element exists (CHT-869)', async () => {
    document.body.innerHTML += '<span id="mobile-team-name">Chaotic</span>';
    const team = { id: 'team-1', name: 'My Team', description: '' };
    await selectTeam(team);
    expect(document.getElementById('mobile-team-name').textContent).toBe('My Team');
  });

  it('does not error when mobile-team-name element is missing', async () => {
    const team = { id: 'team-1', name: 'My Team', description: '' };
    await selectTeam(team);
    expect(document.getElementById('mobile-team-name')).toBeNull();
  });

  it('closes the dropdown', async () => {
    const dropdown = document.getElementById('team-dropdown');
    dropdown.classList.remove('hidden');
    await selectTeam({ id: 'team-1', name: 'Test' });
    expect(dropdown.classList.contains('hidden')).toBe(true);
  });

  it('connects to WebSocket', async () => {
    await selectTeam({ id: 'team-1', name: 'Test' });
    expect(mockConnectWebSocket).toHaveBeenCalledWith('team-1');
  });

  it('calls handleRoute on initial load', async () => {
    await selectTeam({ id: 'team-1', name: 'Test' }, true);
    expect(mockHandleRoute).toHaveBeenCalled();
    expect(mockNavigateTo).not.toHaveBeenCalled();
  });

  // A first load straight to /issues?assignee=<id> relies on this: the
  // issues view reads ?assignee= in handleRoute, and selectAssigneeFilter
  // can only select an id once members and agents are loaded (CHT-1692).
  it('waits for team members and agents before handleRoute on initial load (CHT-1692)', async () => {
    const deferred = () => {
      let resolve;
      const promise = new Promise((r) => { resolve = r; });
      return { promise, resolve };
    };
    const members = deferred();
    const agents = deferred();
    api.getTeamMembers.mockReturnValue(members.promise);
    mockLoadTeamAgentsQuiet.mockReturnValue(agents.promise);
    const flush = () => new Promise((r) => setTimeout(r, 0));

    const done = selectTeam({ id: 'team-1', name: 'Test' }, true);
    await flush();
    expect(mockHandleRoute).not.toHaveBeenCalled();

    members.resolve([]);
    await flush();
    expect(mockBuildAssignees).toHaveBeenCalled();
    expect(mockHandleRoute).not.toHaveBeenCalled();

    agents.resolve();
    await done;
    expect(mockHandleRoute).toHaveBeenCalledTimes(1);
  });

  it('waits for team members before handleRoute even when agents load first (CHT-1692)', async () => {
    let resolveMembers;
    api.getTeamMembers.mockReturnValue(new Promise((r) => { resolveMembers = r; }));
    const flush = () => new Promise((r) => setTimeout(r, 0));

    const done = selectTeam({ id: 'team-1', name: 'Test' }, true);
    await flush();
    expect(mockLoadTeamAgentsQuiet).toHaveBeenCalled();
    expect(mockHandleRoute).not.toHaveBeenCalled();

    resolveMembers([]);
    await done;
    expect(mockHandleRoute).toHaveBeenCalledTimes(1);
  });

  it('calls navigateTo on subsequent selections', async () => {
    await selectTeam({ id: 'team-1', name: 'Test' }, false);
    expect(mockNavigateTo).toHaveBeenCalledWith('my-issues');
    expect(mockHandleRoute).not.toHaveBeenCalled();
  });
});

describe('toggleTeamDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-dropdown" class="hidden"></div>';
  });

  it('toggles hidden class', () => {
    toggleTeamDropdown();
    expect(document.getElementById('team-dropdown').classList.contains('hidden')).toBe(false);
    toggleTeamDropdown();
    expect(document.getElementById('team-dropdown').classList.contains('hidden')).toBe(true);
  });
});

describe('toggleUserDropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="user-dropdown" class="hidden"></div>';
  });

  it('toggles hidden class', () => {
    toggleUserDropdown();
    expect(document.getElementById('user-dropdown').classList.contains('hidden')).toBe(false);
    toggleUserDropdown();
    expect(document.getElementById('user-dropdown').classList.contains('hidden')).toBe(true);
  });
});

describe('loadTeamMembersQuiet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no currentTeam', async () => {
    setCurrentTeam(null);
    await loadTeamMembersQuiet();
    expect(api.getTeamMembers).not.toHaveBeenCalled();
  });

  it('fetches members and updates assignees', async () => {
    const members = [{ id: 'user-1', user_name: 'Test User' }];
    api.getTeamMembers.mockResolvedValue(members);
    await loadTeamMembersQuiet();
    expect(api.getTeamMembers).toHaveBeenCalledWith('team-1');
    expect(mockBuildAssignees).toHaveBeenCalled();
    expect(mockUpdateAssigneeFilter).toHaveBeenCalled();
  });

  it('does not throw on failure', async () => {
    api.getTeamMembers.mockRejectedValue(new Error('Network error'));
    // Should not throw
    await loadTeamMembersQuiet();
  });

  // CHT-1224: was console.error-only, silently breaking the assignee picker
  // app-wide with zero user-visible signal.
  it('shows a toast on failure', async () => {
    api.getTeamMembers.mockRejectedValue(new Error('Network error'));
    await loadTeamMembersQuiet();
    expect(showApiError).toHaveBeenCalledWith('load team members', expect.objectContaining({ message: 'Network error' }));
  });
});

describe('loadTeamMembers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-members-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    setCurrentUser({ id: 'current-user' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
  });

  afterEach(() => {
    setCurrentTeam(null);
    setCurrentUser(null);
  });

  it('fetches and renders members', async () => {
    const members = [{ id: 'user-1', user_id: 'user-1', user_name: 'Test User', user_email: 'test@example.com', role: 'member' }];
    api.getTeamMembers.mockResolvedValue(members);
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).toContain('Test User');
  });

  // CHT-1226: none of the three team lists showed a loading state before —
  // the DOM just sat at whatever it last rendered while the fetch was in flight.
  it('shows a loading skeleton while fetching', async () => {
    let capturedDuringLoad = null;
    api.getTeamMembers.mockImplementation(async () => {
      capturedDuringLoad = document.getElementById('team-members-list').innerHTML;
      return [];
    });
    await loadTeamMembers();
    expect(capturedDuringLoad).toContain('skeleton-list-item');
  });

  // CHT-1226: was showApiError()-only (a toast) — the list itself was left
  // blank/stale with zero in-page indication anything went wrong.
  it('shows a standardized error state with retry on fetch failure', async () => {
    api.getTeamMembers.mockRejectedValue(new Error('network down'));
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).toContain("Couldn't load members");
    expect(list.innerHTML).toContain('empty-state-error');
    expect(list.innerHTML).toContain('data-action="retry-load-team-members"');
    expect(showApiError).toHaveBeenCalledWith('load team members', expect.any(Error));
  });

  it('wires the retry-load-team-members action to re-run loadTeamMembers()', async () => {
    api.getTeamMembers.mockRejectedValue(new Error('network down'));
    await loadTeamMembers();

    api.getTeamMembers.mockResolvedValue([]);
    await teamsActions['retry-load-team-members']();

    expect(api.getTeamMembers).toHaveBeenCalledTimes(2);
  });

  // CHT-1226 PR #212 review finding 2: the permission gate must fail
  // closed. The Invite button is hidden by default in the template and only
  // revealed on a confirmed admin role -- a members-fetch failure must
  // (re-)hide it, not leave whatever visibility state it last had.
  it('hides the Invite Member button when the members fetch fails', async () => {
    document.body.innerHTML += '<button id="invite-member-btn"></button>'; // worst case: visible
    api.getTeamMembers.mockRejectedValue(new Error('network down'));

    await loadTeamMembers();

    expect(document.getElementById('invite-member-btn').classList.contains('hidden')).toBe(true);
  });

  it('re-hides the Invite Member button if a refetch fails after a successful admin load', async () => {
    document.body.innerHTML += '<button id="invite-member-btn" class="hidden"></button>';
    api.getTeamMembers.mockResolvedValue([
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'admin' },
    ]);
    await loadTeamMembers();
    expect(document.getElementById('invite-member-btn').classList.contains('hidden')).toBe(false);

    api.getTeamMembers.mockRejectedValue(new Error('network down'));
    await loadTeamMembers();
    expect(document.getElementById('invite-member-btn').classList.contains('hidden')).toBe(true);
  });
});

describe('loadTeamAgents', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-agents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('fetches and renders agents', async () => {
    const agents = [{ id: 'agent-1', name: 'Bot', parent_user_name: 'Alice' }];
    api.getTeamAgents.mockResolvedValue(agents);
    await loadTeamAgents();
    const list = document.getElementById('team-agents-list');
    expect(list.innerHTML).toContain('Bot');
  });

  it('shows a loading skeleton while fetching', async () => {
    let capturedDuringLoad = null;
    api.getTeamAgents.mockImplementation(async () => {
      capturedDuringLoad = document.getElementById('team-agents-list').innerHTML;
      return [];
    });
    await loadTeamAgents();
    expect(capturedDuringLoad).toContain('skeleton-list-item');
  });

  it('shows a standardized error state with retry on fetch failure', async () => {
    api.getTeamAgents.mockRejectedValue(new Error('network down'));
    await loadTeamAgents();
    const list = document.getElementById('team-agents-list');
    expect(list.innerHTML).toContain("Couldn't load agents");
    expect(list.innerHTML).toContain('empty-state-error');
    expect(list.innerHTML).toContain('data-action="retry-load-team-agents"');
    expect(showApiError).toHaveBeenCalledWith('load team agents', expect.any(Error));
  });

  it('wires the retry-load-team-agents action to re-run loadTeamAgents()', async () => {
    api.getTeamAgents.mockRejectedValue(new Error('network down'));
    await loadTeamAgents();

    api.getTeamAgents.mockResolvedValue([]);
    await teamsActions['retry-load-team-agents']();

    expect(api.getTeamAgents).toHaveBeenCalledTimes(2);
  });
});

describe('renderTeamMembers', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-members-list"></div>';
    setCurrentUser({ id: 'current-user' });
  });

  afterEach(() => {
    setCurrentUser(null);
  });

  it('escapes member names for XSS prevention', async () => {
    const members = [{ id: 'user-1', user_id: 'user-1', user_name: '<script>xss</script>', role: 'member' }];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).not.toContain('<script>xss</script>');
    expect(list.innerHTML).toContain('&lt;script&gt;');
    setCurrentTeam(null);
  });

  it('shows remove button for non-owner members who are not current user, when the viewer is an admin', async () => {
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'admin' },
      { id: 'user-1', user_id: 'other-user', user_name: 'Other', role: 'member' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).toContain('Remove');
    setCurrentTeam(null);
  });

  it('does not show remove button for owner', async () => {
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'admin' },
      { id: 'user-1', user_id: 'other-user', user_name: 'Owner', role: 'owner' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).not.toContain('Remove');
    setCurrentTeam(null);
  });

  // CHT-1226: renderTeamMembers() only hid Remove for the viewer's own row
  // or an owner row -- it had no notion of the viewer's own role, so any
  // 'member'-role user saw live Remove buttons that would always 403.
  it('hides remove button for every other member when the viewer is not an admin', async () => {
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'member' },
      { id: 'user-1', user_id: 'other-user', user_name: 'Other', role: 'member' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).not.toContain('Remove');
    setCurrentTeam(null);
  });

  it('shows remove button when the viewer is the owner', async () => {
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'owner' },
      { id: 'user-1', user_id: 'other-user', user_name: 'Other', role: 'member' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    await loadTeamMembers();
    const list = document.getElementById('team-members-list');
    expect(list.innerHTML).toContain('Remove');
    setCurrentTeam(null);
  });

  it('hides the Invite Member button for non-admin viewers', async () => {
    document.body.innerHTML += '<button id="invite-member-btn"></button>';
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'member' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    await loadTeamMembers();
    expect(document.getElementById('invite-member-btn').classList.contains('hidden')).toBe(true);
    setCurrentTeam(null);
  });

  it('shows the Invite Member button for admin/owner viewers', async () => {
    document.body.innerHTML += '<button id="invite-member-btn" class="hidden"></button>';
    const members = [
      { id: 'self', user_id: 'current-user', user_name: 'Me', role: 'admin' },
    ];
    api.getTeamMembers.mockResolvedValue(members);
    setCurrentTeam({ id: 'team-1' });
    await loadTeamMembers();
    expect(document.getElementById('invite-member-btn').classList.contains('hidden')).toBe(false);
    setCurrentTeam(null);
  });
});

// CHT-1224: was console.error-only — silently broke every label picker
// app-wide (issue-creation, issues-filter, document labels) until the next
// team switch, with zero user-visible signal.
describe('loadLabels', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no currentTeam', async () => {
    setCurrentTeam(null);
    await loadLabels();
    expect(api.getLabels).not.toHaveBeenCalled();
  });

  it('does not throw on failure', async () => {
    api.getLabels.mockRejectedValue(new Error('Network error'));
    await loadLabels();
  });

  it('shows a toast on failure', async () => {
    api.getLabels.mockRejectedValue(new Error('Network error'));
    await loadLabels();
    expect(showApiError).toHaveBeenCalledWith('load labels', expect.objectContaining({ message: 'Network error' }));
  });
});

describe('loadTeamInvitations', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-invitations-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no currentTeam', async () => {
    setCurrentTeam(null);
    await loadTeamInvitations();
    expect(api.getTeamInvitations).not.toHaveBeenCalled();
  });

  it('fetches and renders invitations', async () => {
    const invitations = [{ id: 'inv-1', email: 'test@example.com', role: 'member', expires_at: '2024-12-31' }];
    api.getTeamInvitations.mockResolvedValue(invitations);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('test@example.com');
  });

  // CHT-1226 PR #212 review finding 3: Cancel gets the same admin gate as
  // Remove/Invite. Usually masked by the list endpoint 403ing non-admins,
  // but the gate must not rely on that backend policy (and covers a demoted
  // admin whose stale invitations list is still on screen).
  it('shows the Cancel button when the viewer is an admin', async () => {
    setCurrentUser({ id: 'current-user' });
    setMembers([{ id: 'self', user_id: 'current-user', role: 'admin' }]);
    api.getTeamInvitations.mockResolvedValue([
      { id: 'inv-1', email: 'test@example.com', role: 'member', expires_at: '2024-12-31' },
    ]);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('data-action="delete-invitation"');
    expect(list.innerHTML).toContain('data-action="issue-invitation-code"');
    setMembers([]);
    setCurrentUser(null);
  });

  it('hides the Cancel button when the viewer is not an admin', async () => {
    setCurrentUser({ id: 'current-user' });
    setMembers([{ id: 'self', user_id: 'current-user', role: 'member' }]);
    api.getTeamInvitations.mockResolvedValue([
      { id: 'inv-1', email: 'test@example.com', role: 'member', expires_at: '2024-12-31' },
    ]);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('test@example.com');
    expect(list.innerHTML).not.toContain('data-action="delete-invitation"');
    expect(list.innerHTML).not.toContain('data-action="issue-invitation-code"');
    setMembers([]);
    setCurrentUser(null);
  });

  it('shows empty state when no invitations', async () => {
    api.getTeamInvitations.mockResolvedValue([]);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('No pending invitations');
  });

  // CHT-1224: a legitimate 403 (not admin) is an expected, silent no-op.
  it('renders a blank list (no error message) on a 403', async () => {
    const error = new Error('Forbidden');
    error.status = 403;
    api.getTeamInvitations.mockRejectedValue(error);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toBe('');
  });

  // CHT-1224: any other failure (network, 500) used to collapse into the
  // same blank list as a 403, giving an actual admin zero indication that
  // the request failed rather than there being no invitations.
  it('renders a visible error + Retry for non-403 failures', async () => {
    api.getTeamInvitations.mockRejectedValue(new Error('network down'));
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain("Couldn't load invitations");
    expect(list.innerHTML).toContain('data-action="retry-load-team-invitations"');
  });

  it('wires the retry-load-team-invitations action to re-run loadTeamInvitations()', async () => {
    api.getTeamInvitations.mockRejectedValue(new Error('network down'));
    await loadTeamInvitations();

    api.getTeamInvitations.mockResolvedValue([]);
    await teamsActions['retry-load-team-invitations']();

    expect(api.getTeamInvitations).toHaveBeenCalledTimes(2);
  });

  // CHT-1224 PR #211 review finding 3: the failure state must be visually
  // distinct from the plain informational/empty box, not just reworded.
  it('error-tints the failure state (empty-state-error)', async () => {
    api.getTeamInvitations.mockRejectedValue(new Error('network down'));
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('empty-state-error');
  });

  // CHT-1224 PR #211 review finding 2: loadTeamInvitations() now has a
  // Retry button — a double-clicked Retry (or Retry racing a team switch)
  // must not let a stale response win by network timing.
  describe('request sequencing (out-of-order responses)', () => {
    it('drops a slow response from a superseded loadTeamInvitations()', async () => {
      let resolveFirst;
      api.getTeamInvitations.mockImplementationOnce(() => new Promise((resolve) => { resolveFirst = resolve; }));
      const firstLoad = loadTeamInvitations(); // in flight, slow

      api.getTeamInvitations.mockResolvedValue([
        { id: 'inv-2', email: 'fresh@example.com', role: 'member', expires_at: '2024-12-31' },
      ]);
      await loadTeamInvitations(); // newer request resolves first

      const list = document.getElementById('team-invitations-list');
      expect(list.innerHTML).toContain('fresh@example.com');

      // The slow first request now resolves — must be dropped
      resolveFirst([{ id: 'inv-1', email: 'stale@example.com', role: 'member', expires_at: '2024-12-31' }]);
      await firstLoad;

      expect(list.innerHTML).toContain('fresh@example.com');
      expect(list.innerHTML).not.toContain('stale@example.com');
    });

    it('a stale failure does not paint the error card over fresher data', async () => {
      let rejectFirst;
      api.getTeamInvitations.mockImplementationOnce(() => new Promise((_resolve, reject) => { rejectFirst = reject; }));
      const firstLoad = loadTeamInvitations(); // in flight, will fail late

      api.getTeamInvitations.mockResolvedValue([]);
      await loadTeamInvitations();

      const list = document.getElementById('team-invitations-list');
      expect(list.innerHTML).toContain('No pending invitations');

      rejectFirst(new Error('slow network died'));
      await firstLoad;

      expect(list.innerHTML).toContain('No pending invitations');
      expect(list.innerHTML).not.toContain("Couldn't load invitations");
    });
  });
});

describe('renderTeamInvitations', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-invitations-list"></div>';
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('escapes email for XSS prevention', async () => {
    const invitations = [{ id: 'inv-1', email: '<script>xss</script>@evil.com', role: 'member', expires_at: '2024-12-31' }];
    api.getTeamInvitations.mockResolvedValue(invitations);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).not.toContain('<script>xss</script>');
    expect(list.innerHTML).toContain('&lt;script&gt;');
  });
});

describe('showInviteModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
  });

  it('sets modal title', () => {
    showInviteModal();
    expect(document.getElementById('modal-title').textContent).toBe('Invite Team Member');
  });

  it('renders form with email and role fields', () => {
    showInviteModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('invite-email');
    expect(content.innerHTML).toContain('invite-role');
  });
});

describe('handleInvite', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="invite-email" value="new@example.com">
      <select id="invite-role"><option value="member">Member</option></select>
      <div id="team-invitations-list"></div>
    `;
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.createInvitation.mockResolvedValue({});
    api.getTeamInvitations.mockResolvedValue([]);
    await handleInvite(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends invitation with correct data', async () => {
    const event = { preventDefault: vi.fn() };
    api.createInvitation.mockResolvedValue({});
    api.getTeamInvitations.mockResolvedValue([]);
    await handleInvite(event);
    expect(api.createInvitation).toHaveBeenCalledWith('team-1', 'new@example.com', 'member');
  });

  it('does not claim delivery when an older server sends no link (accept_url null)', async () => {
    document.body.innerHTML += '<div id="modal-title"></div><div id="modal-content"></div>';
    api.createInvitation.mockResolvedValue({ id: 'inv-1', accept_url: null });
    api.getTeamInvitations.mockResolvedValue([]);
    await handleInvite({ preventDefault: vi.fn() });
    expect(closeModal).toHaveBeenCalled();
    expect(showToast).toHaveBeenCalledWith("Invitation created. An email was queued; delivery isn't confirmed.", 'info');
    expect(document.getElementById('modal-content').innerHTML).not.toContain('/invite/');
  });

  it('shows the link and says the email was only queued when SMTP is configured (CHT-1824)', async () => {
    document.body.innerHTML += '<div id="modal-title"></div><div id="modal-content"></div>';
    const url = 'https://chaotic.example.com/invite/tok_123';
    api.createInvitation.mockResolvedValue({ id: 'inv-1', accept_url: url, email_queued: true });
    api.getTeamInvitations.mockResolvedValue([]);
    await handleInvite({ preventDefault: vi.fn() });
    expect(closeModal).not.toHaveBeenCalled();
    expect(document.getElementById('invite-link').textContent).toBe(url);
    const text = document.getElementById('modal-content').textContent;
    expect(text).toContain("An email was queued to new@example.com; delivery isn't confirmed");
    expect(text).not.toContain('does not send email');
  });

  it('tells the admin how to send a new link when one is pending (CHT-1824)', async () => {
    const err = Object.assign(new Error('A pending invitation for this email already exists.'), {
      status: 409,
      detail: { error_code: 'invitation_pending', message: 'A pending invitation for this email already exists.', invitation_id: 'inv-9' },
    });
    api.createInvitation.mockRejectedValue(err);
    await handleInvite({ preventDefault: vi.fn() });
    expect(showToast).toHaveBeenCalledWith(
      'A pending invitation for this email already exists. Its Cancel button is under Pending Invitations.', 'error');
    expect(showApiError).not.toHaveBeenCalled();
  });

  it('recognises the pending-invitation refusal from an older server, and nothing else', () => {
    expect(isPendingInvitationRefusal({ status: 409, detail: 'A pending invitation for this email already exists; revoke it to send a new one' })).toBe(true);
    expect(isPendingInvitationRefusal({ status: 409, detail: { error_code: 'other' } })).toBe(false);
    expect(isPendingInvitationRefusal({ status: 400, detail: { error_code: 'invitation_pending' } })).toBe(false);
    expect(isPendingInvitationRefusal(null)).toBe(false);
  });

  it('shows other invite failures as before', async () => {
    const err = Object.assign(new Error('User is already a team member'), { status: 400, detail: 'User is already a team member' });
    api.createInvitation.mockRejectedValue(err);
    await handleInvite({ preventDefault: vi.fn() });
    expect(showApiError).toHaveBeenCalledWith('send invitation', err);
  });

  it('shows the link to hand over when the server cannot email it (CHT-1794)', async () => {
    document.body.innerHTML += '<div id="modal-title"></div><div id="modal-content"></div>';
    const url = 'https://chaotic.example.com/invite/tok_123';
    api.createInvitation.mockResolvedValue({ id: 'inv-1', accept_url: url });
    api.getTeamInvitations.mockResolvedValue([]);
    await handleInvite({ preventDefault: vi.fn() });
    expect(closeModal).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalledWith('Invitation sent!', 'success');
    expect(document.getElementById('modal-title').textContent).toBe('Invitation Created');
    expect(document.getElementById('invite-link').textContent).toBe(url);
    expect(document.getElementById('modal-content').textContent).toContain('send this link to new@example.com yourself');
    expect(document.querySelector('[data-action="copy-invite-link"]')).not.toBeNull();
    expect(showModal).toHaveBeenCalled();
  });
});

describe('inviteLinkForDisplay (CHT-1822)', () => {
  const tok = 'tok_' + 'a'.repeat(40);

  it('rebuilds a loopback link on the non-loopback origin the page was loaded from', () => {
    expect(inviteLinkForDisplay(`http://localhost:24267/invite/${tok}`, 'https://chaotic.example.com'))
      .toBe(`https://chaotic.example.com/invite/${tok}`);
    expect(inviteLinkForDisplay(`http://127.0.0.1:24267/invite/${tok}`, 'http://10.0.0.5:24267'))
      .toBe(`http://10.0.0.5:24267/invite/${tok}`);
    expect(inviteLinkForDisplay(`http://[::1]:24267/invite/${tok}`, 'https://h.example:8443'))
      .toBe(`https://h.example:8443/invite/${tok}`);
  });

  it('keeps only the path: no query, fragment or credentials from the server link', () => {
    expect(inviteLinkForDisplay(`http://user:pw@localhost:24267/invite/${tok}?next=https://evil.example#x`,
      'https://chaotic.example.com')).toBe(`https://chaotic.example.com/invite/${tok}`);
  });

  it('leaves a link alone when APP_BASE_URL was set to a real host', () => {
    const url = `https://chaotic.example.com/invite/${tok}`;
    expect(inviteLinkForDisplay(url, 'https://other.example.org')).toBe(url);
  });

  it('leaves a loopback link alone when the page is on loopback too', () => {
    const url = `http://localhost:24267/invite/${tok}`;
    expect(inviteLinkForDisplay(url, 'http://127.0.0.1:24267')).toBe(url);
    expect(inviteLinkForDisplay(url, 'http://localhost:5173')).toBe(url);
  });

  it('returns what it cannot parse unchanged', () => {
    expect(inviteLinkForDisplay('not a url', 'https://chaotic.example.com')).toBe('not a url');
    expect(inviteLinkForDisplay(`http://localhost/invite/${tok}`, 'null')).toBe(`http://localhost/invite/${tok}`);
  });

  it('defaults to this page\'s origin', () => {
    // jsdom serves the test page from a loopback origin.
    const url = `http://localhost:24267/invite/${tok}`;
    expect(isLocalHost(new URL(window.location.origin).hostname)).toBe(true);
    expect(inviteLinkForDisplay(url)).toBe(url);
  });

  it('also rewrites links on the other local-only host forms', () => {
    for (const host of ['0.0.0.0', '[::]', '127.1', '[::ffff:127.0.0.1]']) {
      expect(inviteLinkForDisplay(`http://${host}:24267/invite/${tok}`, 'https://chaotic.example.com'))
        .toBe(`https://chaotic.example.com/invite/${tok}`);
    }
  });

  // The table the backend and CLI twins are tested against too.
  it.each(localHosts.local)('isLocalHost(%j) is true', (host) => {
    expect(isLocalHost(host)).toBe(true);
  });
  it.each(localHosts.not_local)('isLocalHost(%j) is false', (host) => {
    expect(isLocalHost(host)).toBe(false);
  });
  it('is false for what is not a bare host', () => {
    for (const host of [null, undefined, 'localhost:24267', 'evil.com/x', 'u@localhost', 'fe80::1%eth0']) {
      expect(isLocalHost(host)).toBe(false);
    }
  });
});

describe('showInviteLink / copyInviteLink (CHT-1794)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-overlay"><div id="modal-title"></div><div id="modal-content"></div></div>';
    vi.clearAllMocks();
    isModalOpen.mockReturnValue(false);
  });

  it('replaces the open invite form in place, keeping its opener, and focuses Copy', () => {
    isModalOpen.mockReturnValue(true);
    showInviteLink('a@example.com', 'https://h/invite/tok');
    expect(showModal).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(document.querySelector('[data-action="copy-invite-link"]'));
  });

  it('opens the modal when none is open', () => {
    showInviteLink('a@example.com', 'https://h/invite/tok');
    expect(showModal).toHaveBeenCalled();
  });

  it('takes the link out of the DOM when the modal closes, however it closes', async () => {
    showInviteLink('a@example.com', 'https://h/invite/tok');
    expect(document.getElementById('invite-link')).not.toBeNull();
    document.getElementById('modal-overlay').classList.add('hidden');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.getElementById('invite-link')).toBeNull();
    expect(document.getElementById('modal-content').textContent).not.toContain('/invite/');
  });

  it('leaves a later modal alone once the link is gone', async () => {
    showInviteLink('a@example.com', 'https://h/invite/tok');
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.add('hidden');
    await new Promise((resolve) => setTimeout(resolve, 0));
    document.getElementById('modal-content').innerHTML = '<p id="other">other modal</p>';
    overlay.classList.remove('hidden');
    overlay.classList.add('hidden');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.getElementById('other')).not.toBeNull();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('escapes the address and the link', () => {
    showInviteLink('<b>x</b>@example.com', 'https://h/invite/a<i>b');
    const content = document.getElementById('modal-content');
    expect(content.querySelector('b')).toBeNull();
    expect(content.querySelector('i')).toBeNull();
    expect(document.getElementById('invite-link').textContent).toBe('https://h/invite/a<i>b');
  });

  it('copies the link to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    showInviteLink('a@example.com', 'https://h/invite/tok');
    await copyInviteLink();
    expect(writeText).toHaveBeenCalledWith('https://h/invite/tok');
    expect(showToast).toHaveBeenCalledWith('Invitation link copied', 'success');
  });

  it('selects the link to copy by hand when the clipboard refuses', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    showInviteLink('a@example.com', 'https://h/invite/tok');
    await copyInviteLink();
    expect(window.getSelection().toString()).toBe('https://h/invite/tok');
    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('copy it by hand'), 'error');
  });

  it('is wired to its actions', async () => {
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    showInviteLink('a@example.com', 'https://h/invite/tok');
    await teamsActions['copy-invite-link']();
    expect(writeText).toHaveBeenCalledWith('https://h/invite/tok');
    teamsActions['dismiss-invite-link']();
    expect(closeModal).toHaveBeenCalled();
  });
});

describe('removeMember', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-members-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    setCurrentUser({ id: 'current-user' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    setCurrentTeam(null);
    setCurrentUser(null);
    vi.restoreAllMocks();
  });

  it('prompts for confirmation', async () => {
    api.removeMember.mockResolvedValue({});
    api.getTeamMembers.mockResolvedValue([]);
    await removeMember('user-1');
    expect(window.confirm).toHaveBeenCalled();
  });

  it('does nothing if user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await removeMember('user-1');
    expect(api.removeMember).not.toHaveBeenCalled();
  });

  it('removes member and reloads list', async () => {
    api.removeMember.mockResolvedValue({});
    api.getTeamMembers.mockResolvedValue([]);
    await removeMember('user-1');
    expect(api.removeMember).toHaveBeenCalledWith('team-1', 'user-1');
  });
});

describe('deleteInvitation', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="team-invitations-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('deletes invitation and reloads list', async () => {
    api.deleteInvitation.mockResolvedValue({});
    api.getTeamInvitations.mockResolvedValue([]);
    await deleteInvitation('inv-1');
    expect(api.deleteInvitation).toHaveBeenCalledWith('team-1', 'inv-1');
  });
});

describe('issueInvitationCode (CHT-1828)', () => {
  const ISSUED = {
    code: '123456',
    expires_at: '2026-10-15T17:00:00Z',
    invitation_created_at: '2026-10-15T14:00:00Z',
    account: { name: 'Bob', email: 'bob@example.com', created_at: '2026-10-15T16:00:00Z', member_of_any_team: false },
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-overlay"><div id="modal-title"></div><div id="modal-content"></div></div>';
    vi.clearAllMocks();
    isModalOpen.mockReturnValue(false);
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('asks for the code and shows the account and the warning before it', async () => {
    api.issueInvitationVerificationCode.mockResolvedValue(ISSUED);
    await issueInvitationCode('inv-1');
    expect(api.issueInvitationVerificationCode).toHaveBeenCalledWith('team-1', 'inv-1');
    expect(showModal).toHaveBeenCalled();
    const text = document.getElementById('modal-content').textContent;
    expect(text).toContain('Bob');
    expect(text).toContain('bob@example.com');
    expect(text).toContain('Already in a team: no');
    expect(text.trim().startsWith('Send this code only through a channel you already trust for the invitee, never to whoever asked you for it.')).toBe(true);
    expect(text).toContain('2 h after the invitation was created');
    expect(text).toContain('A signup shortly after you sent the link fits both the invitee and someone who saw the link');
    expect(text).toContain('One that predates the invitation was not made from the link');
    expect(text.indexOf('confirm with the invitee directly')).toBeLessThan(text.indexOf('123456'));
    expect(document.getElementById('invitation-code').textContent).toBe('123456');
  });

  it('says when the account is already in a team', async () => {
    api.issueInvitationVerificationCode.mockResolvedValue({
      ...ISSUED, account: { ...ISSUED.account, member_of_any_team: true },
    });
    await issueInvitationCode('inv-1');
    expect(document.getElementById('modal-content').textContent).toContain('Already in a team: yes');
  });

  it('escapes what the server sent', async () => {
    api.issueInvitationVerificationCode.mockResolvedValue({
      ...ISSUED, account: { ...ISSUED.account, name: '<b>x</b>' },
    });
    await issueInvitationCode('inv-1');
    expect(document.getElementById('modal-content').querySelector('b')).toBeNull();
  });

  it('takes the code out of the DOM when the modal closes', async () => {
    api.issueInvitationVerificationCode.mockResolvedValue(ISSUED);
    await issueInvitationCode('inv-1');
    document.getElementById('modal-overlay').classList.add('hidden');
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(document.getElementById('invitation-code')).toBeNull();
    expect(document.getElementById('modal-content').textContent).not.toContain('123456');
  });

  it('reports a refusal and opens nothing', async () => {
    const error = new Error('No account with the invited address has asked for a verification code.');
    api.issueInvitationVerificationCode.mockRejectedValue(error);
    await issueInvitationCode('inv-1');
    expect(showApiError).toHaveBeenCalledWith('get a verification code', error);
    expect(showModal).not.toHaveBeenCalled();
  });

  it('is wired to its action', async () => {
    api.issueInvitationVerificationCode.mockResolvedValue(ISSUED);
    await teamsActions['issue-invitation-code']({}, { invitationId: 'inv-9' });
    expect(api.issueInvitationVerificationCode).toHaveBeenCalledWith('team-1', 'inv-9');
  });
});

describe('signedUpRelative (CHT-1828)', () => {
  it('says how long after or before the invitation the account signed up', () => {
    expect(signedUpRelative('2026-10-15T14:05:00Z', '2026-10-15T14:00:00Z')).toBe('5 min after the invitation was created');
    expect(signedUpRelative('2026-10-10T14:00:00Z', '2026-10-15T14:00:00Z')).toBe('5 days before the invitation was created');
    expect(signedUpRelative('2026-10-14T14:00:00Z', '2026-10-15T14:00:00Z')).toBe('24 h before the invitation was created');
  });

  it('says so when a time is missing', () => {
    expect(signedUpRelative(undefined, '2026-10-15T14:00:00Z')).toBe('invitation time unknown');
  });
});

describe('showCreateTeamModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="team-dropdown" class="hidden"></div>
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
  });

  it('toggles dropdown and sets modal title', () => {
    showCreateTeamModal();
    expect(document.getElementById('modal-title').textContent).toBe('Create Team');
  });

  it('renders form with required fields', () => {
    showCreateTeamModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('team-name');
    expect(content.innerHTML).toContain('team-key');
    expect(content.innerHTML).toContain('team-description');
  });
});

describe('showEditTeamModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    setCurrentTeam({ id: 'team-1', name: 'Test Team', key: 'TT', description: 'Test desc' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no currentTeam', () => {
    setCurrentTeam(null);
    showEditTeamModal();
    expect(document.getElementById('modal-title').textContent).toBe('');
  });

  it('sets modal title and populates form', () => {
    showEditTeamModal();
    expect(document.getElementById('modal-title').textContent).toBe('Edit Team');
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('Test Team');
    expect(content.innerHTML).toContain('TT');
  });

  it('escapes team values in form', () => {
    setCurrentTeam({ id: 'team-1', name: '<script>xss</script>', key: 'TT', description: '<img onerror=alert(1)>' });
    showEditTeamModal();
    const content = document.getElementById('modal-content');
    // Form values should be properly set as text
    const nameInput = document.getElementById('team-name');
    const descTextarea = document.getElementById('team-description');
    expect(nameInput.value).toBe('<script>xss</script>');
    expect(descTextarea.value).toBe('<img onerror=alert(1)>');
    // Verify no script or img elements were created
    expect(content.querySelector('script')).toBeNull();
    expect(content.querySelector('img')).toBeNull();
  });
});

describe('handleCreateTeam', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="team-name" value="New Team">
      <input id="team-key" value="NT">
      <textarea id="team-description">New team desc</textarea>
      <div id="team-list"></div>
      <span id="current-team-name"></span>
      <div id="team-description-text"></div>
      <div id="team-dropdown"></div>
    `;
    vi.clearAllMocks();
    mockLoadProjects.mockResolvedValue();
    api.getLabels = vi.fn().mockResolvedValue([]);
    mockLoadTeamAgentsQuiet.mockResolvedValue();
    mockConnectWebSocket.mockClear();
    mockNavigateTo.mockClear();
    api.getTeamMembers.mockResolvedValue([]);
  });

  afterEach(() => {
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeam.mockResolvedValue({ id: 'team-new', name: 'New Team' });
    api.getMyTeams.mockResolvedValue([]);
    await handleCreateTeam(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('sends correct data to API with uppercase key', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeam.mockResolvedValue({ id: 'team-new', name: 'New Team' });
    api.getMyTeams.mockResolvedValue([]);
    await handleCreateTeam(event);
    expect(api.createTeam).toHaveBeenCalledWith({
      name: 'New Team',
      key: 'NT',
      description: 'New team desc',
    });
  });
});

describe('handleUpdateTeam', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="team-name" value="Updated Team">
      <textarea id="team-description">Updated desc</textarea>
      <span id="current-team-name">Old Team</span>
      <div id="team-description-text">Old desc</div>
      <div id="team-list"></div>
    `;
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1', name: 'Old Team' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns false if no currentTeam', async () => {
    setCurrentTeam(null);
    const event = { preventDefault: vi.fn() };
    const result = await handleUpdateTeam(event);
    expect(result).toBe(false);
    expect(api.updateTeam).not.toHaveBeenCalled();
  });

  it('sends correct data to API', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateTeam.mockResolvedValue({ id: 'team-1', name: 'Updated Team', description: 'Updated desc' });
    api.getMyTeams.mockResolvedValue([]);
    await handleUpdateTeam(event);
    expect(api.updateTeam).toHaveBeenCalledWith('team-1', {
      name: 'Updated Team',
      description: 'Updated desc',
    });
  });

  it('updates UI after successful update', async () => {
    const event = { preventDefault: vi.fn() };
    api.updateTeam.mockResolvedValue({ id: 'team-1', name: 'Updated Team', description: 'Updated desc' });
    api.getMyTeams.mockResolvedValue([]);
    await handleUpdateTeam(event);
    expect(document.getElementById('current-team-name').textContent).toBe('Updated Team');
    expect(document.getElementById('team-description-text').textContent).toBe('Updated desc');
  });
});
