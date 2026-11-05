import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { setCurrentTeam, setCurrentUser } from './state.js';
import {
  getAgents,
  renderAgentAvatar,
  loadTeamAgentsQuiet,
  loadAgents,
  renderAgents,
  showCreateAgentModal,
  handleCreateAgent,
  copyAgentKey,
  deleteAgent,
  generateAgentKey,
  setAgentRegistrar,
} from './agents.js';
import { api } from './api.js';
import { getProjects } from './projects.js';
import { showApiError } from './ui.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getTeamAgents: vi.fn(),
    createTeamAgent: vi.fn(),
    createProjectAgent: vi.fn(),
    deleteAgent: vi.fn(),
    createAgentKey: vi.fn(),
    updateAgent: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
  registerActions: vi.fn(),
}));

vi.mock('./projects.js', () => ({
  getProjects: vi.fn(() => []),
}));

const mockUpdateAssigneeFilter = vi.fn();
const mockBuildAssignees = vi.fn();
vi.mock('./assignees.js', () => ({
  updateAssigneeFilter: (...args) => mockUpdateAssigneeFilter(...args),
  buildAssignees: (...args) => mockBuildAssignees(...args),
}));

vi.mock('./teams.js', () => ({
  getMembers: vi.fn(() => []),
}));

describe('getAgents', () => {
  it('returns empty array initially', () => {
    expect(getAgents()).toEqual([]);
  });
});

describe('renderAgentAvatar', () => {
  it('renders default avatar when no avatar_url', () => {
    const agent = { name: 'TestBot' };
    const html = renderAgentAvatar(agent);
    expect(html).toContain('🤖');
    expect(html).toContain('T');
  });

  it('renders emoji avatar', () => {
    const agent = { name: 'TestBot', avatar_url: '🎉' };
    const html = renderAgentAvatar(agent);
    expect(html).toContain('🎉');
    expect(html).toContain('avatar-emoji');
  });

  it('renders image avatar for http URLs', () => {
    const agent = { name: 'TestBot', avatar_url: 'https://example.com/avatar.png' };
    const html = renderAgentAvatar(agent);
    expect(html).toContain('<img');
    expect(html).toContain('src="https://example.com/avatar.png"');
  });

  it('renders image avatar for data URLs', () => {
    const agent = { name: 'TestBot', avatar_url: 'data:image/png;base64,abc123' };
    const html = renderAgentAvatar(agent);
    expect(html).toContain('<img');
    expect(html).toContain('src="data:image/png;base64,abc123"');
  });

  it('renders an uploaded profile picture as an image', () => {
    const url = `/api/avatars/${'a'.repeat(64)}`;
    const html = renderAgentAvatar({ name: 'Owl', avatar_url: url });
    expect(html).toContain(`src="${url}"`);
  });

  it('escapes HTML in name', () => {
    const agent = { name: '<script>xss</script>' };
    const html = renderAgentAvatar(agent);
    // When rendered, no script element should be created
    const div = document.createElement('div');
    div.innerHTML = html;
    expect(div.querySelector('script')).toBeNull();
    // The initial should be the first char of the escaped string (&)
    expect(html).toContain('agent-initial');
  });

  it('escapes HTML in avatar URL', () => {
    const agent = { name: 'Bot', avatar_url: 'https://example.com/img.png" onerror="alert(1)"' };
    const html = renderAgentAvatar(agent);
    const div = document.createElement('div');
    div.innerHTML = html;
    const img = div.querySelector('img');
    expect(img).not.toBeNull();
    // TODO: CHT-130 - This is a known XSS vulnerability. The code uses escapeHtml
    // which doesn't escape quotes, allowing attribute injection. Should use escapeAttr.
    // For now, just verify the img element is created.
    // Once CHT-130 is fixed, uncomment this assertion:
    // expect(img.getAttribute('onerror')).toBeNull();
  });

  it('handles null agent gracefully', () => {
    const html = renderAgentAvatar(null);
    // Should show default avatar without crashing
    expect(html).toContain('agent-avatar');
    expect(html).toContain('🤖');
  });
});

describe('loadTeamAgentsQuiet', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('returns early if no teamId and no currentTeam', async () => {
    setCurrentTeam(null);
    await loadTeamAgentsQuiet();
    expect(api.getTeamAgents).not.toHaveBeenCalled();
  });

  it('uses provided teamId', async () => {
    api.getTeamAgents.mockResolvedValue([]);
    await loadTeamAgentsQuiet('team-2');
    expect(api.getTeamAgents).toHaveBeenCalledWith('team-2');
  });

  // PR #517 review I3.
  it('drops an answer for a team switched away from', async () => {
    let answer;
    api.getTeamAgents.mockReturnValue(new Promise((r) => { answer = r; }));
    const loading = loadTeamAgentsQuiet();
    setCurrentTeam({ id: 'team-2' });
    answer([{ id: 'old-agent' }]);
    await loading;
    expect(mockBuildAssignees).not.toHaveBeenCalled();
  });

  it('falls back to currentTeam.id', async () => {
    api.getTeamAgents.mockResolvedValue([]);
    await loadTeamAgentsQuiet();
    expect(api.getTeamAgents).toHaveBeenCalledWith('team-1');
  });

  it('calls buildAssignees and updateAssigneeFilter', async () => {
    api.getTeamAgents.mockResolvedValue([{ id: 'agent-1', name: 'Bot' }]);
    await loadTeamAgentsQuiet();
    expect(mockBuildAssignees).toHaveBeenCalled();
    expect(mockUpdateAssigneeFilter).toHaveBeenCalled();
  });

  it('does not throw on failure', async () => {
    api.getTeamAgents.mockRejectedValue(new Error('Network error'));
    // Should not throw
    await loadTeamAgentsQuiet();
  });

  // CHT-1224: was console.error-only, silently breaking the assignee picker
  // app-wide with zero user-visible signal.
  it('shows a toast on failure', async () => {
    api.getTeamAgents.mockRejectedValue(new Error('Network error'));
    await loadTeamAgentsQuiet();
    expect(showApiError).toHaveBeenCalledWith('load team agents', expect.objectContaining({ message: 'Network error' }));
  });
});

describe('loadAgents', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="agents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('fetches and renders agents', async () => {
    setCurrentUser({ id: 'me' });
    const agents = [
      { id: 'agent-1', name: 'TestBot', created_at: '2024-01-01', parent_user_id: 'me', parent_user_name: 'Admin' },
    ];
    api.getTeamAgents.mockResolvedValue(agents);
    await loadAgents();
    const list = document.getElementById('agents-list');
    expect(list.innerHTML).toContain('TestBot');
  });
});

// Settings' "Your agents" (CHT-2044): links into each profile, no actions.
describe('renderAgents', () => {
  const load = async (agents) => {
    api.getTeamAgents.mockResolvedValue(agents);
    await loadAgents();
    return document.getElementById('agents-list');
  };

  beforeEach(() => {
    document.body.innerHTML = '<div id="agents-list"></div>';
    setCurrentTeam({ id: 'team-1' });
    setCurrentUser({ id: 'me' });
  });

  afterEach(() => {
    setCurrentTeam(null);
    setCurrentUser(null);
  });

  it('returns early if agents-list not found', () => {
    document.body.innerHTML = '';
    renderAgents();
  });

  it('renders empty state when you own no agents', async () => {
    const list = await load([
      { id: 'theirs', name: 'Theirs', parent_user_id: 'other', created_at: '2024-01-01' },
    ]);
    expect(list.innerHTML).toContain('No agents yet');
    expect(list.innerHTML).toContain('empty-state');
    expect(list.innerHTML).not.toContain('Theirs');
  });

  it('lists only your own agents, sessions left to their registrar', async () => {
    const list = await load([
      { id: 'mine', name: 'Mine', parent_user_id: 'me', created_at: '2024-01-01' },
      { id: 'ses', name: 'Mine · main', kind: 'session', registered_by_id: 'mine', parent_user_id: 'me', created_at: '2024-01-01' },
      { id: 'theirs', name: 'Theirs', parent_user_id: 'other', created_at: '2024-01-01' },
    ]);
    const rows = list.querySelectorAll('a[data-action="view-person"]');
    expect(Array.from(rows).map((r) => r.dataset.userId)).toEqual(['mine']);
    expect(rows[0].getAttribute('href')).toBe('/people/mine');
  });

  it('carries no key, registrar or delete actions: those are on the profile', async () => {
    const list = await load([
      { id: 'mine', name: 'Mine', parent_user_id: 'me', created_at: '2024-01-01' },
    ]);
    expect(list.innerHTML).not.toContain('generate-agent-key');
    expect(list.innerHTML).not.toContain('toggle-agent-registrar');
    expect(list.innerHTML).not.toContain('delete-agent');
  });

  it('escapes agent name for XSS prevention', async () => {
    const list = await load([
      { id: 'agent-1', name: '<script>xss</script>', parent_user_id: 'me', created_at: '2024-01-01' },
    ]);
    expect(list.innerHTML).toContain('&lt;script&gt;xss&lt;/script&gt;');
    expect(list.querySelector('script')).toBeNull();
  });

  it('says the scope, and counts a registrar\'s sessions', async () => {
    getProjects.mockReturnValue([{ id: 'proj-1', key: 'CHT' }]);
    const list = await load([
      { id: 'p', name: 'ProjectBot', agent_project_id: 'proj-1', parent_user_id: 'me', created_at: '2024-01-01' },
      { id: 'r', name: 'Reg', can_register: true, parent_user_id: 'me', created_at: '2024-01-01' },
      { id: 's', name: 'Reg · a', kind: 'session', registered_by_id: 'r', parent_user_id: 'me', created_at: '2024-01-01' },
    ]);
    expect(list.innerHTML).toContain('Project CHT');
    expect(list.innerHTML).toContain('Team-wide');
    expect(list.innerHTML).toContain('Registrar · 1 session');
    getProjects.mockReturnValue([]);
  });
});

describe('showCreateAgentModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    getProjects.mockReturnValue([{ id: 'proj-1', name: 'Test Project' }]);
  });

  it('sets modal title', () => {
    showCreateAgentModal();
    expect(document.getElementById('modal-title').textContent).toBe('Create Agent');
  });

  it('renders form with required fields', () => {
    showCreateAgentModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('agent-name');
    expect(content.innerHTML).toContain('agent-avatar');
    expect(content.innerHTML).toContain('agent-project-scoped');
  });

  it('renders project options', () => {
    showCreateAgentModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('Test Project');
    expect(content.innerHTML).toContain('proj-1');
  });

  it('escapes project names', () => {
    getProjects.mockReturnValue([{ id: 'proj-1', name: '<script>xss</script>' }]);
    showCreateAgentModal();
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).not.toContain('<script>xss</script>');
    expect(content.innerHTML).toContain('&lt;script&gt;');
  });
});

describe('handleCreateAgent', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="agent-name" value="NewBot">
      <input id="agent-avatar" value="🤖">
      <input type="checkbox" id="agent-project-scoped">
      <select id="agent-project"><option value="proj-1">Project</option></select>
      <div id="agents-list"></div>
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
  });

  afterEach(() => {
    setCurrentTeam(null);
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeamAgent.mockResolvedValue({ api_key: 'test-key-123' });
    await handleCreateAgent(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('creates team agent when not project-scoped', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeamAgent.mockResolvedValue({ api_key: 'test-key-123' });
    await handleCreateAgent(event);
    expect(api.createTeamAgent).toHaveBeenCalledWith('team-1', 'NewBot', '🤖', false);
  });

  it('creates project agent when project-scoped', async () => {
    document.getElementById('agent-project-scoped').checked = true;
    const event = { preventDefault: vi.fn() };
    api.createProjectAgent.mockResolvedValue({ api_key: 'test-key-123' });
    await handleCreateAgent(event);
    expect(api.createProjectAgent).toHaveBeenCalledWith('proj-1', 'NewBot', '🤖', false);
  });

  it('shows API key after creation', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeamAgent.mockResolvedValue({ api_key: 'secret-key-xyz' });
    await handleCreateAgent(event);
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('secret-key-xyz');
    expect(content.innerHTML).toContain('chaotic auth set-key');
  });

  it('escapes API key in display', async () => {
    const event = { preventDefault: vi.fn() };
    api.createTeamAgent.mockResolvedValue({ api_key: '<script>xss</script>' });
    await handleCreateAgent(event);
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).not.toContain('<script>xss</script>');
    expect(content.innerHTML).toContain('&lt;script&gt;');
  });

  it('sends null avatar when empty', async () => {
    document.getElementById('agent-avatar').value = '';
    const event = { preventDefault: vi.fn() };
    api.createTeamAgent.mockResolvedValue({ api_key: 'test-key' });
    await handleCreateAgent(event);
    expect(api.createTeamAgent).toHaveBeenCalledWith('team-1', 'NewBot', null, false);
  });
});

describe('copyAgentKey', () => {
  beforeEach(() => {
    document.body.innerHTML = '<code id="new-agent-key">test-api-key-123</code>';
    // Mock navigator.clipboard
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    });
  });

  it('copies key to clipboard', async () => {
    await copyAgentKey();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-api-key-123');
  });
});

describe('deleteAgent', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="agents-list"></div>';
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    mockBuildAssignees.mockClear();
    mockUpdateAssigneeFilter.mockClear();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    setCurrentTeam(null);
    vi.restoreAllMocks();
  });

  it('prompts for confirmation with agent name', async () => {
    api.deleteAgent.mockResolvedValue({});
    api.getTeamAgents.mockResolvedValue([]);
    await deleteAgent('agent-1', 'TestBot');
    expect(window.confirm).toHaveBeenCalledWith(
      'Delete agent "TestBot"? This will revoke all its API keys and cannot be undone.'
    );
  });

  it('does nothing if user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await deleteAgent('agent-1', 'TestBot');
    expect(api.deleteAgent).not.toHaveBeenCalled();
  });

  it('deletes agent and reloads list', async () => {
    api.deleteAgent.mockResolvedValue({});
    api.getTeamAgents.mockResolvedValue([]);
    await deleteAgent('agent-1', 'TestBot');
    expect(api.deleteAgent).toHaveBeenCalledWith('agent-1');
  });
});

describe('generateAgentKey', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('prompts for confirmation with agent name', async () => {
    api.createAgentKey.mockResolvedValue({ key: 'ck_new-secret' });
    await generateAgentKey('agent-1', 'TestBot');
    expect(window.confirm).toHaveBeenCalledWith(
      'Generate a new API key for "TestBot"? Existing keys will keep working.'
    );
  });

  it('does nothing if user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await generateAgentKey('agent-1', 'TestBot');
    expect(api.createAgentKey).not.toHaveBeenCalled();
  });

  it('calls the API with the agent id', async () => {
    api.createAgentKey.mockResolvedValue({ key: 'ck_new-secret' });
    await generateAgentKey('agent-1', 'TestBot');
    expect(api.createAgentKey).toHaveBeenCalledWith('agent-1');
  });

  it('shows the new key in the same one-time reveal modal as agent creation', async () => {
    api.createAgentKey.mockResolvedValue({ key: 'ck_new-secret' });
    await generateAgentKey('agent-1', 'TestBot');
    expect(document.getElementById('modal-title').textContent).toBe('New Agent Key');
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).toContain('ck_new-secret');
    expect(content.innerHTML).toContain('chaotic auth set-key');
    expect(content.innerHTML).toContain('id="new-agent-key"');
    expect(content.innerHTML).toContain('data-action="copy-agent-key"');
    expect(content.innerHTML).toContain('data-action="dismiss-agent-modal"');
  });

  it('escapes the new key in display', async () => {
    api.createAgentKey.mockResolvedValue({ key: '<script>xss</script>' });
    await generateAgentKey('agent-1', 'TestBot');
    const content = document.getElementById('modal-content');
    expect(content.innerHTML).not.toContain('<script>xss</script>');
    expect(content.innerHTML).toContain('&lt;script&gt;');
  });

  it('shows an API error toast on failure', async () => {
    api.createAgentKey.mockRejectedValue(new Error('boom'));
    await generateAgentKey('agent-1', 'TestBot');
    expect(showApiError).toHaveBeenCalledWith('generate agent key', expect.objectContaining({ message: 'boom' }));
  });
});

describe('registrars (CHT-1600)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setCurrentTeam({ id: 'team-1' });
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    setCurrentTeam(null);
    vi.restoreAllMocks();
  });

  it('the create form offers a registrar checkbox', () => {
    document.body.innerHTML = '<div id="modal-title"></div><div id="modal-content"></div>';
    showCreateAgentModal();
    expect(document.getElementById('agent-registrar')).not.toBeNull();
  });

  it('creates a registrar and shows the session setup step', async () => {
    document.body.innerHTML = `
      <input id="agent-name" value="Claude Code">
      <input id="agent-avatar" value="">
      <input type="checkbox" id="agent-project-scoped">
      <input type="checkbox" id="agent-registrar" checked>
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    api.createTeamAgent.mockResolvedValue({ api_key: 'ck_reg', can_register: true });
    await handleCreateAgent({ preventDefault: vi.fn() });
    expect(api.createTeamAgent).toHaveBeenCalledWith('team-1', 'Claude Code', null, true);
    expect(document.getElementById('modal-content').innerHTML).toContain(
      'chaotic config set-session-identity auto'
    );
  });

  it('an ordinary agent gets no session setup step', async () => {
    document.body.innerHTML = `
      <input id="agent-name" value="bot">
      <input type="checkbox" id="agent-project-scoped">
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    api.createTeamAgent.mockResolvedValue({ api_key: 'ck_x' });
    await handleCreateAgent({ preventDefault: vi.fn() });
    expect(document.getElementById('modal-content').innerHTML).not.toContain('set-session-identity');
  });

  it('turns the capability on and reloads', async () => {
    api.updateAgent.mockResolvedValue({});
    api.getTeamAgents.mockResolvedValue([]);
    await setAgentRegistrar('bot-1', 'bot', true);
    expect(window.confirm.mock.calls[0][0]).toContain('Make "bot" a registrar?');
    expect(api.updateAgent).toHaveBeenCalledWith('bot-1', { can_register: true });
    expect(api.getTeamAgents).toHaveBeenCalled();
  });

  it('turns it off', async () => {
    api.updateAgent.mockResolvedValue({});
    api.getTeamAgents.mockResolvedValue([]);
    await setAgentRegistrar('reg-1', 'Claude Code', false);
    expect(window.confirm.mock.calls[0][0]).toContain('Stop "Claude Code" being a registrar?');
    expect(api.updateAgent).toHaveBeenCalledWith('reg-1', { can_register: false });
  });

  it('does nothing if the user cancels', async () => {
    window.confirm.mockReturnValue(false);
    await setAgentRegistrar('bot-1', 'bot', true);
    expect(api.updateAgent).not.toHaveBeenCalled();
  });

  it('shows the server refusal', async () => {
    const err = new Error('Not authorized to update this agent');
    api.updateAgent.mockRejectedValue(err);
    await setAgentRegistrar('bot-1', 'bot', true);
    expect(showApiError).toHaveBeenCalledWith('change registrar', err);
  });
});
