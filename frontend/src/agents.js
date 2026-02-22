/**
 * Agents module for Chaotic frontend
 * Handles AI agent management (create, list, delete)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, formatDate } from './utils.js';
import { showModal, closeModal, showToast } from './ui.js';
import { getCurrentTeam } from './state.js';
import { registerActions } from './event-delegation.js';
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
 * Check if an avatar URL is an image (vs emoji)
 * @param {string} avatar - Avatar URL or emoji
 * @returns {boolean}
 */
function isImageAvatar(avatar) {
  return (
    typeof avatar === 'string' &&
    (avatar.startsWith('http://') ||
      avatar.startsWith('https://') ||
      avatar.startsWith('data:'))
  );
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
    agents = await api.getTeamAgents(teamId);
    buildAssignees(getMembers, getAgents);
    updateAssigneeFilter();
  } catch (e) {
    console.error('Failed to load team agents:', e);
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
    showToast(e.message, 'error');
  }
}

/**
 * Render the agents list
 */
export function renderAgents() {
  const container = document.getElementById('agents-list');
  if (!container) return;

  if (agents.length === 0) {
    container.innerHTML =
      '<p class="empty-state">No agents yet. Create an agent to enable CLI automation with its own identity.</p>';
    return;
  }

  container.innerHTML = agents
    .map((agent) => {
      const safeName = escapeHtml(agent.name);
      const safeParentName = escapeHtml(agent.parent_user_name || 'Unknown');
      return `
      <div class="agent-item">
        ${renderAgentAvatar(agent)}
        <div class="agent-info">
          <div class="agent-name">${safeName}</div>
          <div class="agent-meta">
            <span class="agent-scope">${agent.agent_project_id ? 'Project-scoped' : 'Team-wide'}</span>
            <span class="agent-date">Created by ${safeParentName} ${formatDate(agent.created_at)}</span>
          </div>
        </div>
        <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${escapeAttr(agent.id)}" data-agent-name="${escapeAttr(agent.name || 'Agent')}">Delete</button>
      </div>
    `;
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

  try {
    let result;
    if (projectScoped && projectId) {
      result = await api.createProjectAgent(projectId, name, avatar);
    } else {
      result = await api.createTeamAgent(teamId, name, avatar);
    }
    closeModal();

    // Show the API key in a new modal (only shown once)
    const safeApiKey = escapeHtml(result.api_key);
    document.getElementById('modal-title').textContent = 'Agent Created';
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
        </div>
        <button type="button" class="btn btn-primary" data-action="dismiss-agent-modal">Done</button>
      </div>
    `;
    showModal();
  } catch (e) {
    showToast(`Failed to create agent: ${e.message}`, 'error');
  }
  return false;
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
    loadAgents();
  } catch (e) {
    showToast(`Failed to delete agent: ${e.message}`, 'error');
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
    'delete-agent': (_event, data) => {
        deleteAgent(data.agentId, data.agentName);
    },
});
