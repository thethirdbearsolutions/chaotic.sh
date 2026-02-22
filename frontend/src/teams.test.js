import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentTeam, setCurrentTeam, setCurrentUser } from './state.js';
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
  loadTeamInvitations,
  showInviteModal,
  handleInvite,
  removeMember,
  deleteInvitation,
  showCreateTeamModal,
  showEditTeamModal,
  handleCreateTeam,
  handleUpdateTeam,
} from './teams.js';
import { api } from './api.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getMyTeams: vi.fn(),
    getTeamMembers: vi.fn(),
    getTeamInvitations: vi.fn(),
    getTeamAgents: vi.fn(),
    createInvitation: vi.fn(),
    removeMember: vi.fn(),
    deleteInvitation: vi.fn(),
    createTeam: vi.fn(),
    updateTeam: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
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
vi.mock('./projects.js', () => ({
  loadProjects: (...args) => mockLoadProjects(...args),
}));

const mockLoadTeamAgentsQuiet = vi.fn().mockResolvedValue();
const mockGetAgents = vi.fn(() => []);
vi.mock('./agents.js', () => ({
  loadTeamAgentsQuiet: (...args) => mockLoadTeamAgentsQuiet(...args),
  getAgents: (...args) => mockGetAgents(...args),
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

  it('handles errors silently', async () => {
    api.getTeamMembers.mockRejectedValue(new Error('Network error'));
    // Should not throw
    await loadTeamMembersQuiet();
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

  it('shows remove button for non-owner members who are not current user', async () => {
    const members = [
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

  it('shows empty state when no invitations', async () => {
    api.getTeamInvitations.mockResolvedValue([]);
    await loadTeamInvitations();
    const list = document.getElementById('team-invitations-list');
    expect(list.innerHTML).toContain('No pending invitations');
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
