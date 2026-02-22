/**
 * Teams module for Chaotic frontend
 * Handles team loading, selection, members, and invitations
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { showModal, closeModal, showToast } from './ui.js';
import { getCurrentTeam, setCurrentTeam } from './state.js';
import { registerActions } from './event-delegation.js';

// Module state
let teams = [];
let members = [];
let invitations = [];
let teamAgents = [];

/**
 * Get current teams list
 * @returns {Array} Current teams
 */
export function getTeams() {
  return teams;
}

/**
 * Get current members list
 * @returns {Array} Current members
 */
export function getMembers() {
  return members;
}

/**
 * Set members list (for external updates)
 * @param {Array} newMembers - New members list
 */
export function setMembers(newMembers) {
  members = newMembers;
}

/**
 * Load teams for the current user
 */
export async function loadTeams() {
  try {
    teams = await api.getMyTeams();
    renderTeamList();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Render the team dropdown list
 */
export function renderTeamList() {
  const teamList = document.getElementById('team-list');
  if (teams.length === 0) {
    teamList.innerHTML =
      '<div class="dropdown-item" style="color: var(--text-secondary)">No teams yet</div>';
  } else {
    teamList.innerHTML = teams
      .map(
        (team) => `
            <button class="dropdown-item" data-action="select-team" data-team-json="${escapeAttr(JSON.stringify(team))}">${escapeHtml(team.name)}</button>
        `
      )
      .join('');
  }
}

/**
 * Select a team and load its data
 * @param {Object} team - Team object to select
 * @param {boolean} isInitialLoad - Whether this is the initial page load
 */
export async function selectTeam(team, isInitialLoad = false) {
  setCurrentTeam(team);
  document.getElementById('current-team-name').textContent = team.name;
  const mobileTeamName = document.getElementById('mobile-team-name');
  if (mobileTeamName) mobileTeamName.textContent = team.name;
  const teamDescription = document.getElementById('team-description-text');
  if (teamDescription) {
    teamDescription.textContent = team.description || 'No description';
  }
  // Close dropdown instead of toggle (fix for dropdown staying open)
  document.getElementById('team-dropdown').classList.add('hidden');

  // Connect to WebSocket for real-time updates
  if (window.connectWebSocket) {
    window.connectWebSocket(team.id);
  }

  // Load team data (including members for assignee dropdown)
  await Promise.all([
    window.loadProjects ? window.loadProjects() : Promise.resolve(),
    window.loadLabels ? window.loadLabels() : Promise.resolve(),
    loadTeamMembersQuiet(),
    window.loadTeamAgentsQuiet
      ? window.loadTeamAgentsQuiet()
      : Promise.resolve(),
  ]);

  // On initial load, handle the URL route; otherwise navigate to current view
  if (isInitialLoad) {
    if (window.handleRoute) {
      window.handleRoute();
    }
  } else {
    if (window.navigateTo) {
      window.navigateTo(window.currentView);
    }
  }
}

/**
 * Toggle the team dropdown visibility
 */
export function toggleTeamDropdown() {
  document.getElementById('team-dropdown').classList.toggle('hidden');
}

/**
 * Toggle the user dropdown visibility
 */
export function toggleUserDropdown() {
  document.getElementById('user-dropdown').classList.toggle('hidden');
}

/**
 * Load team members quietly (no UI feedback)
 */
export async function loadTeamMembersQuiet() {
  if (!getCurrentTeam()) return;
  try {
    members = await api.getTeamMembers(getCurrentTeam().id);
    if (window.buildAssignees) {
      window.buildAssignees();
    }
    if (window.updateAssigneeFilter) {
      window.updateAssigneeFilter();
    }
  } catch (e) {
    console.error('Failed to load team members:', e);
  }
}

/**
 * Load team members with UI feedback
 */
export async function loadTeamMembers() {
  if (!getCurrentTeam()) return;

  try {
    members = await api.getTeamMembers(getCurrentTeam().id);
    if (window.buildAssignees) {
      window.buildAssignees();
    }
    if (window.updateAssigneeFilter) {
      window.updateAssigneeFilter();
    }
    renderTeamMembers();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Render the team members list
 */
export function renderTeamMembers() {
  const list = document.getElementById('team-members-list');
  list.innerHTML = members
    .map(
      (member) => `
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar">${(member.user_name || 'U').charAt(0).toUpperCase()}</div>
                <div class="member-details">
                    <span class="member-name">${escapeHtml(member.user_name || 'Unknown')}</span>
                    <span class="member-email">${escapeHtml(member.user_email || '')}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role">${member.role}</span>
                ${
                  member.user_id !== window.currentUser.id &&
                  member.role !== 'owner'
                    ? `
                    <button class="btn btn-danger btn-small" data-action="remove-member" data-user-id="${escapeAttr(member.user_id)}">Remove</button>
                `
                    : ''
                }
            </div>
        </div>
    `
    )
    .join('');
}

/**
 * Load team invitations
 */
export async function loadTeamInvitations() {
  if (!getCurrentTeam()) return;

  try {
    invitations = await api.getTeamInvitations(getCurrentTeam().id);
    renderTeamInvitations();
  } catch {
    // User might not be admin
    document.getElementById('team-invitations-list').innerHTML = '';
  }
}

/**
 * Render the team invitations list
 */
export function renderTeamInvitations() {
  const list = document.getElementById('team-invitations-list');
  if (invitations.length === 0) {
    list.innerHTML = `<div class="empty-state" style="padding: 1rem"><p>No pending invitations</p></div>`;
    return;
  }

  list.innerHTML = invitations
    .map(
      (inv) => `
        <div class="list-item">
            <div class="list-item-content">
                <div class="list-item-title">${escapeHtml(inv.email)}</div>
                <div class="list-item-meta">
                    <span class="member-role">${escapeHtml(inv.role)}</span>
                    <span>Expires: ${new Date(inv.expires_at).toLocaleDateString()}</span>
                </div>
            </div>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${escapeAttr(inv.id)}">Cancel</button>
        </div>
    `
    )
    .join('');
}

/**
 * Load team agents with UI feedback
 */
export async function loadTeamAgents() {
  if (!getCurrentTeam()) return;

  try {
    teamAgents = await api.getTeamAgents(getCurrentTeam().id);
    renderTeamAgents();
  } catch (e) {
    showToast(e.message, 'error');
  }
}

/**
 * Render the team agents list
 */
export function renderTeamAgents() {
  const list = document.getElementById('team-agents-list');
  if (!list) return;

  if (teamAgents.length === 0) {
    list.innerHTML = `<div class="empty-state" style="padding: 1rem"><p>No agents yet. <a href="#" data-action="navigate-to" data-view="settings">Create an agent</a> to enable CLI automation with its own identity.</p></div>`;
    return;
  }

  list.innerHTML = teamAgents
    .map((agent) => {
      const safeName = escapeHtml(agent.name);
      const safeParentName = escapeHtml(agent.parent_user_name || 'Unknown');
      const avatar = agent.avatar_url || '🤖';
      return `
        <div class="list-item member-item">
            <div class="member-info">
                <div class="avatar agent-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${escapeHtml(avatar)}</div>
                <div class="member-details">
                    <span class="member-name">${safeName}</span>
                    <span class="member-email">Created by ${safeParentName} • ${agent.agent_project_id ? 'Project-scoped' : 'Team-wide'}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span class="member-role" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">Agent</span>
            </div>
        </div>
      `;
    })
    .join('');
}

/**
 * Show the invite modal
 */
export function showInviteModal() {
  document.getElementById('modal-title').textContent = 'Invite Team Member';
  document.getElementById('modal-content').innerHTML = `
        <form data-action="invite-member">
            <div class="form-group">
                <label for="invite-email">Email</label>
                <input type="email" id="invite-email" required>
            </div>
            <div class="form-group">
                <label for="invite-role">Role</label>
                <select id="invite-role">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Send Invitation</button>
        </form>
    `;
  showModal();
}

/**
 * Handle invite form submission
 * @param {Event} event - Form submit event
 */
export async function handleInvite(event) {
  event.preventDefault();
  const email = document.getElementById('invite-email').value;
  const role = document.getElementById('invite-role').value;

  try {
    await api.createInvitation(getCurrentTeam().id, email, role);
    await loadTeamInvitations();
    closeModal();
    showToast('Invitation sent!', 'success');
  } catch (e) {
    showToast(`Failed to send invitation: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Remove a member from the team
 * @param {string} userId - User ID to remove
 */
export async function removeMember(userId) {
  if (!confirm('Are you sure you want to remove this member?')) return;

  try {
    await api.removeMember(getCurrentTeam().id, userId);
    await loadTeamMembers();
    showToast('Member removed!', 'success');
  } catch (e) {
    showToast(`Failed to remove member: ${e.message}`, 'error');
  }
}

/**
 * Delete an invitation
 * @param {string} invitationId - Invitation ID to delete
 */
export async function deleteInvitation(invitationId) {
  try {
    await api.deleteInvitation(getCurrentTeam().id, invitationId);
    await loadTeamInvitations();
    showToast('Invitation canceled!', 'success');
  } catch (e) {
    showToast(`Failed to cancel invitation: ${e.message}`, 'error');
  }
}

/**
 * Show the create team modal
 */
export function showCreateTeamModal() {
  toggleTeamDropdown();
  document.getElementById('modal-title').textContent = 'Create Team';
  document.getElementById('modal-content').innerHTML = `
        <form data-action="create-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key (2-10 uppercase letters/numbers)</label>
                <input type="text" id="team-key" pattern="[A-Z0-9]{2,10}" required
                    style="text-transform: uppercase">
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Create Team</button>
        </form>
    `;
  showModal();
}

/**
 * Show the edit team modal
 */
export function showEditTeamModal() {
  if (!getCurrentTeam()) return;
  document.getElementById('modal-title').textContent = 'Edit Team';
  document.getElementById('modal-content').innerHTML = `
        <form data-action="update-team">
            <div class="form-group">
                <label for="team-name">Team Name</label>
                <input type="text" id="team-name" value="${escapeAttr(getCurrentTeam().name)}" required>
            </div>
            <div class="form-group">
                <label for="team-key">Team Key</label>
                <input type="text" id="team-key" value="${escapeAttr(getCurrentTeam().key)}" disabled class="input-disabled">
                <small class="form-hint">Team key cannot be changed</small>
            </div>
            <div class="form-group">
                <label for="team-description">Description</label>
                <textarea id="team-description">${escapeHtml(getCurrentTeam().description || '')}</textarea>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
        </form>
    `;
  showModal();
}

/**
 * Handle create team form submission
 * @param {Event} event - Form submit event
 */
export async function handleCreateTeam(event) {
  event.preventDefault();
  const data = {
    name: document.getElementById('team-name').value,
    key: document.getElementById('team-key').value.toUpperCase(),
    description: document.getElementById('team-description').value,
  };

  try {
    const team = await api.createTeam(data);
    await loadTeams();
    await selectTeam(team);
    closeModal();
    showToast('Team created!', 'success');
  } catch (e) {
    showToast(`Failed to create team: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Handle update team form submission
 * @param {Event} event - Form submit event
 */
export async function handleUpdateTeam(event) {
  event.preventDefault();
  if (!getCurrentTeam()) return false;
  const data = {
    name: document.getElementById('team-name').value,
    description: document.getElementById('team-description').value,
  };

  try {
    const updated = await api.updateTeam(getCurrentTeam().id, data);
    setCurrentTeam(updated);
    document.getElementById('current-team-name').textContent = updated.name;
    const teamDescription = document.getElementById('team-description-text');
    if (teamDescription) {
      teamDescription.textContent = updated.description || 'No description';
    }
    await loadTeams();
    closeModal();
    showToast('Team updated!', 'success');
  } catch (e) {
    showToast(`Failed to update team: ${e.message}`, 'error');
  }
  return false;
}

// Set up dropdown close handlers
document.addEventListener('click', (e) => {
  if (
    !e.target.closest('.team-selector') &&
    !e.target.closest('#team-dropdown')
  ) {
    const dropdown = document.getElementById('team-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  }
  if (!e.target.closest('.user-menu') && !e.target.closest('#user-dropdown')) {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  }
});

// ========================================
// Event Delegation Actions
// ========================================

registerActions({
  'select-team': (event, dataset) => {
    selectTeam(JSON.parse(dataset.teamJson));
  },
  'remove-member': (event, dataset) => {
    removeMember(dataset.userId);
  },
  'delete-invitation': (event, dataset) => {
    deleteInvitation(dataset.invitationId);
  },
  'invite-member': (event) => {
    handleInvite(event);
  },
  'create-team': (event) => {
    handleCreateTeam(event);
  },
  'update-team': (event) => {
    handleUpdateTeam(event);
  },
});

// Attach to window for backward compatibility with HTML handlers
Object.assign(window, {
  loadTeams,
  renderTeamList,
  selectTeam,
  toggleTeamDropdown,
  toggleUserDropdown,
  loadTeamMembersQuiet,
  loadTeamMembers,
  renderTeamMembers,
  loadTeamInvitations,
  renderTeamInvitations,
  loadTeamAgents,
  renderTeamAgents,
  showInviteModal,
  handleInvite,
  removeMember,
  deleteInvitation,
  showCreateTeamModal,
  showEditTeamModal,
  handleCreateTeam,
  handleUpdateTeam,
  getTeams,
  getMembers,
  setMembers,
});
