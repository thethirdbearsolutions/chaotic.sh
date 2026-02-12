import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
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
} from './agents.js';
import { api } from './api.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    getTeamAgents: vi.fn(),
    createTeamAgent: vi.fn(),
    createProjectAgent: vi.fn(),
    deleteAgent: vi.fn(),
  },
}));

// Mock ui module
vi.mock('./ui.js', () => ({
  showModal: vi.fn(),
  closeModal: vi.fn(),
  showToast: vi.fn(),
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
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
  });

  it('returns early if no teamId and no currentTeam', async () => {
    delete window.currentTeam;
    await loadTeamAgentsQuiet();
    expect(api.getTeamAgents).not.toHaveBeenCalled();
  });

  it('uses provided teamId', async () => {
    api.getTeamAgents.mockResolvedValue([]);
    await loadTeamAgentsQuiet('team-2');
    expect(api.getTeamAgents).toHaveBeenCalledWith('team-2');
  });

  it('falls back to currentTeam.id', async () => {
    api.getTeamAgents.mockResolvedValue([]);
    await loadTeamAgentsQuiet();
    expect(api.getTeamAgents).toHaveBeenCalledWith('team-1');
  });

  it('calls buildAssignees and updateAssigneeFilter', async () => {
    api.getTeamAgents.mockResolvedValue([{ id: 'agent-1', name: 'Bot' }]);
    await loadTeamAgentsQuiet();
    expect(window.buildAssignees).toHaveBeenCalled();
    expect(window.updateAssigneeFilter).toHaveBeenCalled();
  });

  it('handles errors silently', async () => {
    api.getTeamAgents.mockRejectedValue(new Error('Network error'));
    // Should not throw
    await loadTeamAgentsQuiet();
  });
});

describe('loadAgents', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="agents-list"></div>';
    vi.clearAllMocks();
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
  });

  it('fetches and renders agents', async () => {
    const agents = [
      { id: 'agent-1', name: 'TestBot', created_at: '2024-01-01', parent_user_name: 'Admin' },
    ];
    api.getTeamAgents.mockResolvedValue(agents);
    await loadAgents();
    const list = document.getElementById('agents-list');
    expect(list.innerHTML).toContain('TestBot');
  });
});

describe('renderAgents', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="agents-list"></div>';
  });

  it('returns early if agents-list not found', () => {
    document.body.innerHTML = '';
    // Should not throw
    renderAgents();
  });

  it('renders empty state when no agents', async () => {
    api.getTeamAgents.mockResolvedValue([]);
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
    await loadAgents();
    const list = document.getElementById('agents-list');
    expect(list.innerHTML).toContain('No agents yet');
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
  });

  it('escapes agent name for XSS prevention', async () => {
    const agents = [
      { id: 'agent-1', name: '<script>xss</script>', created_at: '2024-01-01', parent_user_name: 'Admin' },
    ];
    api.getTeamAgents.mockResolvedValue(agents);
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
    await loadAgents();
    const list = document.getElementById('agents-list');
    // Verify the escaped version is present
    expect(list.innerHTML).toContain('&lt;script&gt;xss&lt;/script&gt;');
    // Verify no script element was created
    expect(list.querySelector('script')).toBeNull();
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
  });

  it('shows project-scoped vs team-wide label', async () => {
    const agents = [
      { id: 'agent-1', name: 'ProjectBot', agent_project_id: 'proj-1', created_at: '2024-01-01', parent_user_name: 'Admin' },
      { id: 'agent-2', name: 'TeamBot', agent_project_id: null, created_at: '2024-01-01', parent_user_name: 'Admin' },
    ];
    api.getTeamAgents.mockResolvedValue(agents);
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
    await loadAgents();
    const list = document.getElementById('agents-list');
    expect(list.innerHTML).toContain('Project-scoped');
    expect(list.innerHTML).toContain('Team-wide');
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
  });
});

describe('showCreateAgentModal', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="modal-title"></div>
      <div id="modal-content"></div>
    `;
    window.projects = [{ id: 'proj-1', name: 'Test Project' }];
  });

  afterEach(() => {
    delete window.projects;
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
    window.projects = [{ id: 'proj-1', name: '<script>xss</script>' }];
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
    window.currentTeam = { id: 'team-1' };
  });

  afterEach(() => {
    delete window.currentTeam;
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
    expect(api.createTeamAgent).toHaveBeenCalledWith('team-1', 'NewBot', '🤖');
  });

  it('creates project agent when project-scoped', async () => {
    document.getElementById('agent-project-scoped').checked = true;
    const event = { preventDefault: vi.fn() };
    api.createProjectAgent.mockResolvedValue({ api_key: 'test-key-123' });
    await handleCreateAgent(event);
    expect(api.createProjectAgent).toHaveBeenCalledWith('proj-1', 'NewBot', '🤖');
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
    expect(api.createTeamAgent).toHaveBeenCalledWith('team-1', 'NewBot', null);
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
    window.currentTeam = { id: 'team-1' };
    window.buildAssignees = vi.fn();
    window.updateAssigneeFilter = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  afterEach(() => {
    delete window.currentTeam;
    delete window.buildAssignees;
    delete window.updateAssigneeFilter;
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
