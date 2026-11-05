/**
 * Agents module for Chaotic frontend
 * Handles AI agent management (create, list, delete, registrar toggle)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, formatDate, isImageAvatar } from './utils.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getCurrentTeam, getCurrentUser } from './state.js';
import { registerActions } from './event-delegation.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { getProjects } from './projects.js';
import { buildAssignees, updateAssigneeFilter } from './assignees.js';
import { getMembers } from './teams.js';

// Module state
let agents = [];

/**
 * Get current agents list
 * @returns {Array}
 */
export function getAgents() {
  return agents;
}

/**
 * Set the team's agents (the boot cache, CHT-1972).
 * @param {Array} list
 */
export function setAgents(list) {
  agents = Array.isArray(list) ? list : [];
}

/**
 * Render an agent avatar
 * @param {Object} agent - Agent object
 * @returns {string} HTML string
 */
export function renderAgentAvatar(agent) {
  const avatar = agent?.avatar_url;
  const safeName = escapeAttr(agent?.name || 'Agent');
  if (avatar) {
    if (isImageAvatar(avatar)) {
      return `
        <div class="agent-avatar agent-avatar-purple">
          <img class="avatar-img" src="${escapeAttr(avatar)}" alt="${safeName}">
        </div>
      `;
    }
    return `<div class="agent-avatar agent-avatar-purple avatar-emoji">${escapeHtml(avatar)}</div>`;
  }
  return `
    <div class="agent-avatar agent-avatar-purple">
      <span class="agent-emoji">🤖</span>
      <span class="agent-initial">${safeName.charAt(0).toUpperCase()}</span>
    </div>
  `;
}

/**
 * Load team agents quietly (no UI update except assignee filter)
 * @param {string} teamId - Team ID
 */
export async function loadTeamAgentsQuiet(teamId) {
  if (!teamId) {
    teamId = getCurrentTeam()?.id;
  }
  if (!teamId) return;

  try {
    const list = await api.getTeamAgents(teamId);
    // A response for a team switched away from is dropped.
    if (getCurrentTeam()?.id !== teamId) return;
    agents = list;
    buildAssignees(getMembers, getAgents);
    updateAssigneeFilter();
  } catch (e) {
    // CHT-1224: console.error-only silently broke the assignee picker
    // app-wide until the next team switch, with zero user-visible signal.
    console.error('Failed to load team agents:', e);
    showApiError('load team agents', e);
  }
}

/**
 * Load and render team agents
 * @param {string} teamId - Team ID
 */
export async function loadAgents(teamId) {
  if (!teamId) {
    teamId = getCurrentTeam()?.id;
  }
  if (!teamId) return;

  try {
    agents = await api.getTeamAgents(teamId);
    buildAssignees(getMembers, getAgents);
    updateAssigneeFilter();
    renderAgents();
  } catch (e) {
    showApiError('load agents', e);
  }
}

/**
 * Settings' "Your agents" (CHT-2044): the agents you own, each a link to
 * its profile, where its keys, connected apps, scope and registrar right
 * live. The whole team's agents are on People.
 */
export function renderAgents() {
  const container = document.getElementById('agents-list');
  if (!container) return;
  const me = getCurrentUser()?.id;
  const mine = agents.filter((a) => a.parent_user_id === me && a.kind !== 'session');

  if (mine.length === 0) {
    container.innerHTML = renderEmptyState({
      icon: EMPTY_ICONS.dashboard,
      heading: 'No agents yet',
      description: 'Create an agent to give CLI automation its own identity',
    });
    return;
  }

  const projects = getProjects();
  const scope = (projectId) => {
    if (!projectId) return 'Team-wide';
    const project = projects.find((p) => p.id === projectId);
    return project ? `Project ${project.key}` : 'One project';
  };
  container.innerHTML = mine
    .map((agent) => {
      const id = escapeAttr(agent.id);
      const sessions = agents.filter((a) => a.registered_by_id === agent.id).length;
      const sub = [
        scope(agent.agent_project_id),
        agent.can_register ? `Registrar · ${sessions} session${sessions === 1 ? '' : 's'}` : null,
        `Created ${formatDate(agent.created_at)}`,
      ].filter(Boolean).join(' · ');
      return `
      <a class="list-row-2line agent-link-row" href="/people/${id}" data-action="view-person" data-user-id="${id}">
        <div class="agent-link-avatar" aria-hidden="true">${renderAgentAvatar(agent)}</div>
        <div class="list-row-main">
          <div class="list-row-title">${escapeHtml(agent.name)}${agent.is_active === false ? ' <span class="badge badge-neutral">Deactivated</span>' : ''}</div>
          <div class="list-row-sub">${escapeHtml(sub)}</div>
        </div>
        <span class="list-row-right list-row-sub">Open profile</span>
      </a>`;
    })
    .join('');
}

/**
 * Show the create agent modal
 */
export function showCreateAgentModal() {
  const projects = getProjects();

  document.getElementById('modal-title').textContent = 'Create Agent';
  document.getElementById('modal-content').innerHTML = `
    <form data-action="create-agent">
      <div class="form-group">
        <label for="agent-name">Agent Name</label>
        <input type="text" id="agent-name" placeholder="e.g., claude-bot, ci-agent" required>
        <p class="form-help">A display name for this agent (shown in activity feeds).</p>
      </div>
      <div class="form-group">
        <label for="agent-avatar">Avatar (emoji)</label>
        <input type="text" id="agent-avatar" placeholder="🤖" maxlength="2">
        <p class="form-help">Optional emoji avatar (shown in issue lists and activity).</p>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="agent-project-scoped">
          Project-scoped (can only access selected project)
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="agent-registrar">
          Registrar (registers one identity per Claude Code session)
        </label>
        <p class="form-help">A registrar's key can only register session identities and read; it cannot write as itself. See docs/agents.md.</p>
      </div>
      <div class="form-group" id="agent-project-select" style="display: none;">
        <label for="agent-project">Project</label>
        <select id="agent-project">
          ${projects.map((p) => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join('')}
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Create Agent</button>
    </form>
  `;

  // Add event listener for project scope toggle
  const checkbox = document.getElementById('agent-project-scoped');
  if (checkbox) {
    checkbox.addEventListener('change', function () {
      document.getElementById('agent-project-select').style.display = this
        .checked
        ? 'block'
        : 'none';
    });
  }

  showModal();
}

/**
 * Show the one-time API key reveal modal shared by agent creation and key rotation
 * @param {string} title - Modal title
 * @param {string} apiKey - Full API key (shown only once)
 */
function showAgentKeyRevealModal(title, apiKey, registrar = false) {
  const safeApiKey = escapeHtml(apiKey);
  const registrarSteps = registrar
    ? `<p>Then give each Claude Code session its own identity:</p>
        <code>chaotic config set-session-identity auto</code>`
    : '';
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-content').innerHTML = `
    <div class="api-key-created">
      <p class="warning-text">Copy the agent's API key now. You won't be able to see it again!</p>
      <div class="api-key-display">
        <code id="new-agent-key">${safeApiKey}</code>
        <button type="button" class="btn btn-secondary" data-action="copy-agent-key">Copy</button>
      </div>
      <div class="api-key-instructions">
        <p>Configure the CLI to use this agent:</p>
        <code>chaotic auth set-key ${safeApiKey}</code>
        ${registrarSteps}
      </div>
      <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
    </div>
  `;
  showModal();
}

/**
 * Handle create agent form submission
 * @param {Event} event - Form submit event
 */
export async function handleCreateAgent(event) {
  event.preventDefault();

  const teamId = getCurrentTeam()?.id;
  if (!teamId) {
    showToast('No team selected', 'error');
    return false;
  }

  const name = document.getElementById('agent-name').value.trim();
  const avatar = document.getElementById('agent-avatar')?.value.trim() || null;
  const projectScoped = document.getElementById('agent-project-scoped').checked;
  const projectId = document.getElementById('agent-project')?.value;
  const registrar = Boolean(document.getElementById('agent-registrar')?.checked);

  try {
    let result;
    if (projectScoped && projectId) {
      result = await api.createProjectAgent(projectId, name, avatar, registrar);
    } else {
      result = await api.createTeamAgent(teamId, name, avatar, registrar);
    }
    closeModal();

    // Show the API key in a new modal (only shown once)
    showAgentKeyRevealModal('Agent Created', result.api_key, Boolean(result.can_register));
    // People lists it once the team's agents are fresh.
    await loadAgents();
    agentsChanged(result.id, { created: true });
  } catch (e) {
    showApiError('create agent', e);
  }
  return false;
}

/**
 * Mint a new API key for an existing agent and show it once
 * @param {string} agentId - Agent ID
 * @param {string} agentName - Agent name (for the confirmation prompt)
 */
export async function generateAgentKey(agentId, agentName) {
  if (
    !confirm(
      `Generate a new API key for "${agentName}"? Existing keys will keep working.`
    )
  ) {
    return;
  }

  try {
    const result = await api.createAgentKey(agentId);
    showAgentKeyRevealModal('New Agent Key', result.key);
    // Only its credentials changed: the profile refreshes those, not the page
    // behind the reveal modal.
    agentsChanged(agentId, { credentials: true });
  } catch (e) {
    showApiError('generate agent key', e);
  }
}

/**
 * Turn an agent's registrar capability on or off (CHT-1600). Allowed to
 * its creator and team admins; the server refuses anyone else and any
 * registered session identity.
 * @param {string} agentId - Agent ID
 * @param {string} agentName - Agent name (for the confirmation prompt)
 * @param {boolean} makeRegistrar - The capability wanted
 */
export async function setAgentRegistrar(agentId, agentName, makeRegistrar) {
  const prompt = makeRegistrar
    ? `Make "${agentName}" a registrar? Its keys will only be able to register session identities and read; it will no longer be able to write as itself.`
    : `Stop "${agentName}" being a registrar? It will write as itself again; the session identities it registered keep working until their keys expire, and cannot be renewed.`;
  if (!confirm(prompt)) {
    return;
  }

  try {
    await api.updateAgent(agentId, { can_register: makeRegistrar });
    showToast(makeRegistrar ? 'Agent is now a registrar' : 'Agent is no longer a registrar', 'success');
    await loadAgents();
    agentsChanged(agentId);
  } catch (e) {
    showApiError('change registrar', e);
  }
}

/**
 * Tell whatever shows this agent (its profile page, CHT-2044) that it
 * changed. An event rather than an import: the profile imports this module.
 * @param {string} agentId
 * @param {{deleted?: boolean, created?: boolean, credentials?: boolean}} [detail]
 */
function agentsChanged(agentId, { deleted = false, created = false, credentials = false } = {}) {
  window.dispatchEvent(new CustomEvent('chaotic:agent-changed', { detail: { agentId, deleted, created, credentials } }));
}

/**
 * Copy the agent API key to clipboard
 */
export function copyAgentKey() {
  const key = document.getElementById('new-agent-key').textContent;
  navigator.clipboard
    .writeText(key)
    .then(() => {
      showToast('Agent API key copied to clipboard', 'success');
    })
    .catch(() => {
      showToast('Failed to copy', 'error');
    });
}

/**
 * Delete an agent
 * @param {string} agentId - Agent ID
 * @param {string} agentName - Agent name for confirmation
 */
export async function deleteAgent(agentId, agentName) {
  if (
    !confirm(
      `Delete agent "${agentName}"? This will revoke all its API keys and cannot be undone.`
    )
  ) {
    return;
  }

  try {
    await api.deleteAgent(agentId);
    showToast('Agent deleted', 'success');
    await loadAgents();
    agentsChanged(agentId, { deleted: true });
  } catch (e) {
    showApiError('delete agent', e);
  }
}


// Register delegated event handlers
registerActions({
    'create-agent': (event) => {
        handleCreateAgent(event);
    },
    'copy-agent-key': () => {
        copyAgentKey();
    },
    'dismiss-agent-modal': () => {
        closeModal();
        loadAgents();
    },
    'delete-agent': (event, data) => {
        if (event?.type && event.type !== 'click') return; // Enter fires keydown and click
        deleteAgent(data.agentId, data.agentName);
    },
    'generate-agent-key': (event, data) => {
        if (event?.type && event.type !== 'click') return; // Enter fires keydown and click
        generateAgentKey(data.agentId, data.agentName);
    },
    'toggle-agent-registrar': (event, data) => {
        if (event?.type && event.type !== 'click') return; // Enter fires keydown and click
        setAgentRegistrar(data.agentId, data.agentName, data.canRegister !== 'true');
    },
});
