/**
 * An agent's profile page holds everything about it (CHT-2044): who it is
 * (people.js renders that), what it may reach, how it signs in, and what
 * its owner can do to it. Before this the same agent was described three
 * ways: Team listed its scope, People its kind and owner, Settings its
 * keys and actions, and Connected Apps the OAuth grants acting as it.
 *
 * The access facts come from the team's agent list (cached at boot); keys
 * and connected apps are fetched when a manager opens the page, since only
 * a manager may read them.
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, formatDate } from './utils.js';
import { showApiError } from './ui.js';
import { getCurrentUser } from './state.js';
import { getAgents } from './agents.js';
import { isCurrentUserAdmin } from './teams.js';
import { getProjects } from './projects.js';

/** The team's agent record behind a roster entry, if it is cached. */
export function agentFor(entry) {
    return getAgents().find(a => a.id === entry?.user_id) || null;
}

/** "Team-wide", or the project the agent is confined to. */
export function agentScope(projectId) {
    if (!projectId) return 'Team-wide';
    const project = getProjects().find(p => p.id === projectId);
    return project ? `Project ${project.key}` : 'One project';
}

/**
 * May the viewer manage this agent: its owner or a team admin, the same
 * rule the server applies (can_manage_agent). The server still decides;
 * this only hides buttons that would be refused.
 */
export function canManageAgent(entry, me = getCurrentUser()) {
    if (!entry?.is_agent || !me) return false;
    return entry.owner_id === me.id || isCurrentUserAdmin();
}

function row(label, value) {
    return `<dt>${escapeHtml(label)}</dt><dd>${value}</dd>`;
}

function personLink(id, name) {
    if (!id) return escapeHtml(name || 'Unknown');
    return `<a href="/people/${escapeAttr(id)}" data-action="view-person" data-user-id="${escapeAttr(id)}">${escapeHtml(name || 'Unknown')}</a>`;
}

/**
 * The Access and Credentials sections and owner actions for an agent's
 * profile. `roster` names the people it links to.
 */
export function renderAgentSections(entry, roster = []) {
    if (!entry?.is_agent) return '';
    const agent = agentFor(entry);
    const nameOf = (id) => roster.find(r => r.user_id === id)?.name;
    const isSession = entry.kind === 'session';
    const registrar = agent?.can_register || entry.kind === 'service';
    const rows = [
        row('Scope', escapeHtml(agentScope(entry.project_id ?? agent?.agent_project_id))),
        row('Owner', personLink(entry.owner_id, entry.owner_name)),
    ];
    if (isSession) {
        const by = agent?.registered_by_id;
        rows.push(row('Registered by', by ? personLink(by, nameOf(by)) : 'A registrar'));
        rows.push(row('Last used', agent?.last_used_at ? escapeHtml(formatDate(agent.last_used_at)) : 'Never'));
    } else {
        rows.push(row('Registrar', registrar
            ? 'Yes: registers one identity per session and cannot write as itself'
            : 'No'));
    }
    if (registrar) {
        const registered = roster.filter(r => r.is_agent && agentFor(r)?.registered_by_id === entry.user_id);
        rows.push(row('Sessions registered', registered.length
            ? registered.map(r => personLink(r.user_id, r.name)).join(', ')
            : 'None active'));
    }

    const manage = canManageAgent(entry);
    const id = escapeAttr(entry.user_id);
    const name = escapeAttr(entry.name || 'Agent');
    const active = agent?.is_active !== false;
    const actions = !manage ? '' : `
        <section class="agent-profile-section">
            <div class="section-header"><h3>Owner actions</h3></div>
            <div class="agent-profile-actions">
                ${active && !isSession ? `<button class="btn btn-secondary" data-action="toggle-agent-registrar" data-agent-id="${id}" data-agent-name="${name}" data-can-register="${registrar ? 'true' : 'false'}">${registrar ? 'Stop being a registrar' : 'Make registrar'}</button>` : ''}
                <button class="btn btn-danger-outline" data-action="delete-agent" data-agent-id="${id}" data-agent-name="${name}">Delete agent</button>
            </div>
        </section>`;
    const credentials = !manage ? '' : `
        <section class="agent-profile-section">
            <div class="section-header agent-profile-section-head">
                <h3>Credentials</h3>
                ${active ? `<button class="btn btn-secondary btn-small" data-action="generate-agent-key" data-agent-id="${id}" data-agent-name="${name}">Generate key</button>` : ''}
            </div>
            <div id="agent-credentials" class="agent-credentials" aria-busy="true"><div class="skeleton skeleton-title"></div></div>
        </section>`;
    return `
        <section class="agent-profile-section">
            <div class="section-header"><h3>Access</h3></div>
            <dl class="agent-access">${rows.join('')}</dl>
        </section>
        ${credentials}
        ${actions}
    `;
}

let credentialsRequestId = 0;

/**
 * Fill the Credentials section: the agent's API keys, and the viewer's
 * own connected apps acting as it (the connections list is per person).
 */
export async function loadAgentCredentials(agentId) {
    const requestId = ++credentialsRequestId;
    let keys;
    let connections;
    try {
        [keys, connections] = await Promise.all([
            api.getAgentKeys(agentId),
            api.getConnections().catch(() => []),
        ]);
    } catch (e) {
        keys = null;
        console.error('Failed to load agent credentials:', e);
    }
    if (requestId !== credentialsRequestId) return;
    const box = document.getElementById('agent-credentials');
    if (!box) return;
    box.removeAttribute('aria-busy');
    if (keys === null) {
        box.innerHTML = '<p class="person-bio-empty">Couldn’t load its keys.</p>';
        return;
    }
    const apps = (connections || []).filter(c => c.acts_as !== 'person' && c.agent?.id === agentId);
    const active = keys.filter(k => k.is_active);
    if (!active.length && !apps.length) {
        box.innerHTML = '<p class="person-bio-empty">No active keys or connected apps.</p>';
        return;
    }
    box.innerHTML = [
        ...active.map(k => `
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">API key <code>${escapeHtml(k.key_prefix || '')}…</code>${k.name ? ` · ${escapeHtml(k.name)}` : ''}</div>
                    <div class="list-row-sub">Created ${escapeHtml(formatDate(k.created_at))}${k.owner_name ? ` by ${escapeHtml(k.owner_name)}` : ''} · ${k.last_used_at ? `last used ${escapeHtml(formatDate(k.last_used_at))}` : 'never used'}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-key" data-key-id="${escapeAttr(k.id)}" data-agent-id="${escapeAttr(agentId)}">Revoke</button>
                </div>
            </div>`),
        ...apps.map(c => {
            const app = c.client?.name || 'An app';
            return `
            <div class="list-row-2line">
                <div class="list-row-main">
                    <div class="list-row-title">Connected app: ${escapeHtml(app)}</div>
                    <div class="list-row-sub">Acts as this agent · connected ${escapeHtml(formatDate(c.created_at))}${c.last_used_at ? ` · last used ${escapeHtml(formatDate(c.last_used_at))}` : ''}</div>
                </div>
                <div class="list-row-right">
                    <button class="btn btn-danger-outline btn-small" data-action="revoke-agent-connection" data-connection-id="${escapeAttr(c.id)}" data-connection-name="${escapeAttr(app)}" data-agent-id="${escapeAttr(agentId)}">Disconnect</button>
                </div>
            </div>`;
        }),
    ].join('');
}

/** Revoke one of an agent's keys, then redraw its credentials. */
export async function revokeAgentKey(keyId, agentId) {
    if (!confirm('Revoke this key? Anything signing in with it stops working at once.')) return;
    try {
        await api.revokeApiKey(keyId);
        loadAgentCredentials(agentId);
    } catch (e) {
        showApiError('revoke the key', e);
    }
}
