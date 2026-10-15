/**
 * Teams module for Chaotic frontend
 * Handles team loading, selection, members, and invitations
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { showModal, closeModal, showToast, showApiError, isModalOpen } from './ui.js';
import { getCurrentTeam, setCurrentTeam, getCurrentView, getCurrentUser, setLabels } from './state.js';
import { registerActions } from './event-delegation.js';
import { navigateTo, handleRoute } from './router.js';
import { loadProjects } from './projects.js';
import { loadTeamAgentsQuiet } from './agents.js';
import { connectWebSocket } from './ws.js';
import { buildAssignees, updateAssigneeFilter } from './assignees.js';
import { getAgents } from './agents.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { refreshInboxUnreadCount } from './inbox.js';

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
    showApiError('load teams', e);
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
  connectWebSocket(team.id);

  // Load team data (including members for assignee dropdown)
  await Promise.all([
    loadProjects(),
    loadLabels(),
    loadTeamMembersQuiet(),
    loadTeamAgentsQuiet(),
    refreshInboxUnreadCount(),
  ]);

  // On initial load, handle the URL route; otherwise navigate to current view
  if (isInitialLoad) {
    handleRoute();
  } else {
    navigateTo(getCurrentView());
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
    buildAssignees(getMembers, getAgents);
    updateAssigneeFilter();
  } catch (e) {
    // CHT-1224: console.error-only silently broke the assignee picker
    // app-wide until the next team switch, with zero user-visible signal.
    console.error('Failed to load team members:', e);
    showApiError('load team members', e);
  }
}

// CHT-1226: shared loading skeleton for the three team-management lists
// (members, agents, invitations) — none of them showed any loading state
// before (the DOM just sat at whatever it last rendered while in flight).
function memberListSkeleton() {
  return Array(3).fill(0).map(() => `
        <div class="skeleton-list-item">
            <div style="flex: 1">
                <div class="skeleton skeleton-title"></div>
            </div>
        </div>
    `).join('');
}

// Monotonic request id — lets loadTeamMembers() drop a response from a
// superseded request (double-clicked Retry, or Retry racing a team switch)
// instead of painting stale data, mirroring loadTeamInvitations() below
// (CHT-1226).
let loadTeamMembersRequestId = 0;

/**
 * Load team members with UI feedback
 */
export async function loadTeamMembers() {
  if (!getCurrentTeam()) return;

  const requestId = ++loadTeamMembersRequestId;
  const list = document.getElementById('team-members-list');
  if (list) list.innerHTML = memberListSkeleton();

  try {
    const fetched = await api.getTeamMembers(getCurrentTeam().id);
    if (requestId !== loadTeamMembersRequestId) return; // a newer loadTeamMembers() has since started — drop this stale response
    members = fetched;
    buildAssignees(getMembers, getAgents);
    updateAssigneeFilter();
    renderTeamMembers();
  } catch (e) {
    if (requestId !== loadTeamMembersRequestId) return;
    // CHT-1226: was showApiError()-only (a toast) -- the list itself was
    // left blank/stale with zero in-page indication anything went wrong.
    if (list) list.innerHTML = renderEmptyState({
      icon: EMPTY_ICONS.team,
      heading: "Couldn't load members",
      description: 'Check your connection and try again',
      cta: { label: 'Retry', action: 'retry-load-team-members' },
      variant: 'error',
    });
    // Fail closed (PR #212 review finding 2): with the fetch failed we
    // cannot confirm the viewer's role, so drop any stale members list and
    // re-run the admin gate -- otherwise a previously-visible Invite button
    // (or a demoted admin's stale role) would keep admin affordances up
    // indefinitely on error.
    members = [];
    updateInviteButtonVisibility();
    showApiError('load team members', e);
  }
}

/**
 * Whether the current viewer is an admin (or owner) of the currently-loaded
 * team's member list -- derived client-side from the same TeamMemberResponse
 * data the members list already fetched (CHT-1226). Backend gates
 * remove-member/invite-member on `is_team_admin` (admin OR owner,
 * team_service.py:197-202) -- mirrored here so the frontend can hide
 * affordances that would otherwise always 403.
 */
export function isCurrentUserAdmin() {
  const currentUserId = getCurrentUser()?.id;
  const self = members.find((m) => m.user_id === currentUserId);
  return self?.role === 'admin' || self?.role === 'owner';
}

/**
 * Show/hide the Invite Member button based on the viewer's own role. Called
 * after members load, since that's the only source of the viewer's role
 * (CHT-1226).
 */
function updateInviteButtonVisibility() {
  const inviteBtn = document.getElementById('invite-member-btn');
  if (inviteBtn) inviteBtn.classList.toggle('hidden', !isCurrentUserAdmin());
}

/**
 * Render the team members list
 */
export function renderTeamMembers() {
  const list = document.getElementById('team-members-list');
  const canManageMembers = isCurrentUserAdmin();
  updateInviteButtonVisibility();
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
                  canManageMembers &&
                  member.user_id !== getCurrentUser().id &&
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

// Monotonic request id — lets loadTeamInvitations() drop a response from a
// superseded request (double-clicked Retry, or Retry racing a team switch)
// instead of painting stale data (CHT-1224 PR #211 review finding 2).
let loadTeamInvitationsRequestId = 0;

/**
 * Load team invitations
 */
export async function loadTeamInvitations() {
  if (!getCurrentTeam()) return;

  const requestId = ++loadTeamInvitationsRequestId;
  // CHT-1226: was the only one of the three team lists with no loading
  // state at all -- the DOM just sat at whatever it last rendered.
  const list = document.getElementById('team-invitations-list');
  if (list) list.innerHTML = memberListSkeleton();

  try {
    const fetched = await api.getTeamInvitations(getCurrentTeam().id);
    if (requestId !== loadTeamInvitationsRequestId) return; // a newer loadTeamInvitations() has since started — drop this stale response
    invitations = fetched;
    renderTeamInvitations();
  } catch (e) {
    if (requestId !== loadTeamInvitationsRequestId) return;
    // CHT-1224: a 403 (not an admin) is an expected, silent no-op — but any
    // other failure (network, 500) used to collapse into the same blank
    // list, with zero indication to an actual admin that the request failed.
    if (e?.status === 403) {
      document.getElementById('team-invitations-list').innerHTML = '';
      return;
    }
    console.error('Failed to load team invitations:', e);
    // empty-state-error (CHT-1224 PR #211 review finding 3): failure states
    // must be visually distinct from informational/empty boxes.
    document.getElementById('team-invitations-list').innerHTML = `
      <div class="empty-state empty-state-error" style="padding: 1rem">
        <h3>Couldn't load invitations</h3>
        <button class="btn btn-secondary btn-small" data-action="retry-load-team-invitations">Retry</button>
      </div>
    `;
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

  // Same admin gate as Remove/Invite (PR #212 review finding 3). Today this
  // is usually masked upstream -- the invitations list endpoint itself 403s
  // for non-admins -- but the gate stops relying on that backend policy and
  // covers a demoted admin whose stale list is still on screen.
  const canManageInvitations = isCurrentUserAdmin();
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
            ${canManageInvitations ? `<button class="btn btn-secondary btn-small" data-action="issue-invitation-code" data-invitation-id="${escapeAttr(inv.id)}" title="For an invitee whose verification email never arrives">Verification code</button>
            <button class="btn btn-danger btn-small" data-action="delete-invitation" data-invitation-id="${escapeAttr(inv.id)}">Cancel</button>` : ''}
        </div>
    `
    )
    .join('');
}

// Monotonic request id — see loadTeamMembersRequestId above (CHT-1226).
let loadTeamAgentsRequestId = 0;

/**
 * Load team agents with UI feedback
 */
export async function loadTeamAgents() {
  if (!getCurrentTeam()) return;

  const requestId = ++loadTeamAgentsRequestId;
  const list = document.getElementById('team-agents-list');
  if (list) list.innerHTML = memberListSkeleton();

  try {
    const fetched = await api.getTeamAgents(getCurrentTeam().id);
    if (requestId !== loadTeamAgentsRequestId) return; // a newer loadTeamAgents() has since started — drop this stale response
    teamAgents = fetched;
    renderTeamAgents();
  } catch (e) {
    if (requestId !== loadTeamAgentsRequestId) return;
    // CHT-1226: was showApiError()-only (a toast) -- see loadTeamMembers above.
    if (list) list.innerHTML = renderEmptyState({
      icon: EMPTY_ICONS.team,
      heading: "Couldn't load agents",
      description: 'Check your connection and try again',
      cta: { label: 'Retry', action: 'retry-load-team-agents' },
      variant: 'error',
    });
    showApiError('load team agents', e);
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
    const invitation = await api.createInvitation(getCurrentTeam().id, email, role);
    await loadTeamInvitations();
    if (invitation && invitation.accept_url) {
      showInviteLink(email, inviteLinkForDisplay(invitation.accept_url), invitation.email_queued === true);
      return false;
    }
    // Only a server before CHT-1824 (with SMTP) sends no link. This page
    // is served by the server it talks to, so that should not happen;
    // if it does, do not claim the email was delivered.
    closeModal();
    showToast("Invitation created. An email was queued; delivery isn't confirmed.", 'info');
  } catch (e) {
    if (isPendingInvitationRefusal(e)) {
      showToast(`${e.message} Its Cancel button is under Pending Invitations.`, 'error');
    } else {
      showApiError('send invitation', e);
    }
  }
  return false;
}

/**
 * The 409 for an address that already has a live invitation (CHT-1824):
 * the structured one, or the plain-text one from an older server.
 * @param {Error} e - The error api.js threw
 * @returns {boolean}
 */
export function isPendingInvitationRefusal(e) {
  if (e?.status !== 409) return false;
  const detail = e.detail;
  if (detail && typeof detail === 'object') return detail.error_code === 'invitation_pending';
  return typeof detail === 'string' && detail.includes('pending invitation');
}

/**
 * Whether a URL host names only this machine (CHT-1822). That covers
 * loopback (localhost, *.localhost, 127.0.0.0/8, ::1, ::ffff:127.x.y.z)
 * and unspecified (0.0.0.0, ::). The host is read with the browser's own
 * URL parser, so 127.1, 2130706433 and 0x7f.1 count as 127.0.0.1. Keep
 * this in step with backend/app/utils/local_host.py and
 * cli/src/cli/local_host.py; all three are tested against
 * testdata/local-hosts.json.
 * @param {string} host - A URL hostname, IPv6 with or without brackets
 * @returns {boolean}
 */
export function isLocalHost(host) {
  let h = String(host ?? '').trim();
  if (!h || /[/?#@\\\s%]/.test(h)) return false;
  if (h.includes(':') && !h.startsWith('[')) h = `[${h}]`;
  let hostname;
  try {
    hostname = new URL(`http://${h}/`).hostname;
  } catch {
    return false;
  }
  hostname = hostname.replace(/\.$/, '');
  if (hostname === 'localhost' || hostname.endsWith('.localhost')) return true;
  // The URL parser has already put IPv4 and IPv6 in canonical form.
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) || hostname === '0.0.0.0') return true;
  return /^\[::(1|ffff:7f[0-9a-f]{2}:[0-9a-f]{1,4}|ffff:0:0)?\]$/.test(hostname);
}

/**
 * The accept link to show (CHT-1822). The server builds it from
 * APP_BASE_URL, which defaults to http://localhost:24267; a server that
 * never set it hands out a link no remote invitee can open. When the link
 * names a local-only host (isLocalHost) and this page was not loaded from one, rebuild it
 * on the origin the admin actually reached, keeping only the path
 * (/invite/<token>) from the server's link. Anything else is left as is.
 * @param {string} acceptUrl - accept_url from the create response
 * @param {string} [origin] - this page's origin (window.location.origin)
 * @returns {string}
 */
export function inviteLinkForDisplay(acceptUrl, origin = window.location.origin) {
  let parsed;
  let here;
  try {
    parsed = new URL(acceptUrl);
    here = new URL(origin);
  } catch {
    return acceptUrl;
  }
  if (!isLocalHost(parsed.hostname) || isLocalHost(here.hostname)) return acceptUrl;
  return here.origin + parsed.pathname;
}

/**
 * The invitation link (CHT-1794). The create answer is the only place it
 * is ever shown, so say so. With SMTP the server only queued an email,
 * so say delivery isn't confirmed and offer the link as well (CHT-1824).
 * @param {string} email - Invited address
 * @param {string} acceptUrl - The /invite/<token> link
 * @param {boolean} [emailQueued] - Whether the server queued an email too
 */
export function showInviteLink(email, acceptUrl, emailQueued = false) {
  const safeEmail = escapeHtml(email);
  const note = emailQueued
    ? `An email was queued to ${safeEmail}; delivery isn't confirmed, so you can also pass on this link. You won't be able to see it again.`
    : `This server does not send email: send this link to ${safeEmail} yourself. You won't be able to see it again.`;
  document.getElementById('modal-title').textContent = 'Invitation Created';
  document.getElementById('modal-content').innerHTML = `
        <div class="api-key-created">
            <p class="warning-text">${note}</p>
            <div class="api-key-display">
                <code id="invite-link">${escapeHtml(acceptUrl)}</code>
                <button type="button" class="btn btn-secondary" data-action="copy-invite-link">Copy link</button>
            </div>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `;
  // Replacing the invite form in place keeps the modal's opener (the
  // Invite button) as where focus returns on close; showModal() again
  // would record the submit button just removed.
  if (!isModalOpen()) showModal();
  document.querySelector('[data-action="copy-invite-link"]')?.focus();
  forgetInviteLinkOnClose();
}

/**
 * Take the link out of the DOM once the modal closes, by any path (Done,
 * Escape, the overlay): it is a credential, shown once.
 */
function forgetInviteLinkOnClose(elementId = 'invite-link') {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay || typeof MutationObserver === 'undefined') return;
  const observer = new MutationObserver(() => {
    if (!overlay.classList.contains('hidden')) return;
    observer.disconnect();
    const secret = document.getElementById(elementId);
    if (secret) document.getElementById('modal-content').innerHTML = '';
  });
  observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
}

/**
 * Copy the invitation link. Without a clipboard (insecure context,
 * denied), select it so it can be copied by hand.
 */
export async function copyInviteLink() {
  const el = document.getElementById('invite-link');
  if (!el) return;
  try {
    await navigator.clipboard.writeText(el.textContent);
    showToast('Invitation link copied', 'success');
  } catch {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    showToast('Could not copy: the link is selected, copy it by hand', 'error');
  }
}

/**
 * A verification code for the account at a pending invitation's address
 * (CHT-1828), for an invitee whose verification email never arrives.
 * The account is shown first, with the warning: anyone who saw the link
 * can sign up with the address, so the admin must check with the
 * invitee that the account is theirs before handing the code over.
 * @param {string} invitationId - Pending invitation ID
 */
export async function issueInvitationCode(invitationId) {
  let issued;
  try {
    issued = await api.issueInvitationVerificationCode(getCurrentTeam().id, invitationId);
  } catch (e) {
    showApiError('get a verification code', e);
    return;
  }
  showInvitationCode(issued);
}

/**
 * Show an issued verification code with the account it is for.
 * @param {object} issued - The server's answer: code, expires_at, account
 */
export function showInvitationCode(issued) {
  const account = issued?.account || {};
  const signedUp = account.created_at ? new Date(account.created_at).toLocaleString() : '';
  const expires = issued?.expires_at ? new Date(issued.expires_at).toLocaleTimeString() : '';
  document.getElementById('modal-title').textContent = 'Verification Code';
  document.getElementById('modal-content').innerHTML = `
        <div class="api-key-created">
            <p>For the account signed up with the invited address:</p>
            <ul class="invitation-code-account">
                <li>Name: <strong>${escapeHtml(account.name || '')}</strong></li>
                <li>Email: ${escapeHtml(account.email || '')}</li>
                <li>Signed up: ${escapeHtml(signedUp)}</li>
                <li>Already in a team: ${account.member_of_any_team ? 'yes' : 'no'}</li>
            </ul>
            <p class="warning-text">Confirm with the invitee that this account is theirs before you hand the code over. If they don't recognise it, someone else signed up with their address: don't give out the code, and cancel the invitation.</p>
            <div class="api-key-display">
                <code id="invitation-code">${escapeHtml(issued?.code || '')}</code>
            </div>
            <p class="text-muted">Expires at ${escapeHtml(expires)}. They enter it on the invitation page, or with <code>chaotic auth verify-email --code</code>, then accept. You won't be able to see it again.</p>
            <button type="button" class="btn btn-secondary" data-action="dismiss-invite-link">Done</button>
        </div>
    `;
  if (!isModalOpen()) showModal();
  forgetInviteLinkOnClose('invitation-code');
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
    showApiError('remove member', e);
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
    showApiError('cancel invitation', e);
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
    showApiError('create team', e);
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
    showApiError('update team', e);
  }
  return false;
}

/**
 * Load labels for the current team
 */
export async function loadLabels() {
    if (!getCurrentTeam()) return;
    try {
        const labels = await api.getLabels(getCurrentTeam().id);
        setLabels(labels);
    } catch (e) {
        // CHT-1224: was console.error-only — silently broke every label
        // picker app-wide (issue-creation, issues-filter, document labels)
        // until the next team switch, with zero user-visible signal.
        console.error('Failed to load labels:', e);
        showApiError('load labels', e);
    }
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
  'issue-invitation-code': (event, dataset) => {
    issueInvitationCode(dataset.invitationId);
  },
  'retry-load-team-invitations': () => {
    loadTeamInvitations();
  },
  'retry-load-team-members': () => {
    loadTeamMembers();
  },
  'retry-load-team-agents': () => {
    loadTeamAgents();
  },
  'invite-member': (event) => {
    handleInvite(event);
  },
  'copy-invite-link': () => {
    copyInviteLink();
  },
  'dismiss-invite-link': () => {
    closeModal();
  },
  'create-team': (event) => {
    handleCreateTeam(event);
  },
  'update-team': (event) => {
    handleUpdateTeam(event);
  },
});

