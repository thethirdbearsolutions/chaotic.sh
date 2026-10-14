/**
 * Connected apps (CHT-1523): the OAuth connections the signed-in person
 * approved, with what each can do, and a Disconnect button. Only their
 * own; the server filters on the consenting person. A built-in app's
 * sign-in (CHT-1602) is listed once per device ("Pixel 8 · Chaotic for
 * Android"); disconnecting it signs that device out and deletes its push
 * registration.
 */

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr, formatDate } from './utils.js';
import { registerActions } from './event-delegation.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { trustBadge } from './oauth-consent.js';

let connections = [];

export function getConnections() {
    return connections;
}

export function setConnections(list) {
    connections = list;
}

export async function loadConnections() {
    try {
        connections = await api.getConnections();
        renderConnections();
    } catch (e) {
        showApiError('load connected apps', e);
    }
}

function appName(connection) {
    const client = connection.client || {};
    return client.name || client.client_id || 'Unknown app';
}

function reach(connection) {
    const team = connection.team_name || 'a team';
    if (connection.project_ids === null || connection.project_ids === undefined) {
        return `all of ${team}`;
    }
    const n = connection.project_ids.length;
    return `${n} project${n === 1 ? '' : 's'} in ${team}`;
}

export function renderConnections() {
    const container = document.getElementById('connected-apps-list');
    if (!container) return;

    if (connections.length === 0) {
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.dashboard,
            heading: 'No connected apps',
            description: 'Apps you approve over OAuth, such as an MCP connector or Chaotic for Android, appear here.',
        });
        return;
    }

    container.innerHTML = connections.map(c => c.acts_as === 'person' ? renderDevice(c) : `
        <div class="api-key-item connected-app-item">
            <div class="api-key-info">
                <div class="api-key-name">${escapeHtml(appName(c))} ${trustBadge(c.client || { trust: 'unverified' })}</div>
                <div class="api-key-meta">
                    <span>as ${escapeHtml(c.agent ? c.agent.name : 'an agent')}</span>
                    <span>${escapeHtml(reach(c))}</span>
                    <span>policy ${escapeHtml(c.policy)}</span>
                    <span class="api-key-date">Connected ${formatDate(c.created_at)}</span>
                    ${c.last_used_at ? `<span class="api-key-date">Last used ${formatDate(c.last_used_at)}</span>` : ''}
                </div>
                ${c.client && c.client.client_id !== c.client.name ? `<div class="api-key-meta"><code>${escapeHtml(c.client.client_id)}</code></div>` : ''}
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${escapeAttr(c.id)}" data-connection-name="${escapeAttr(appName(c))}">Disconnect</button>
        </div>
    `).join('');
}

/** A built-in app signed in as the person on one device (CHT-1602). */
function renderDevice(c) {
    const device = c.device_name || 'A device';
    const label = `${device} · ${appName(c)}`;
    return `
        <div class="api-key-item connected-app-item connected-app-device">
            <div class="api-key-info">
                <div class="api-key-name">${escapeHtml(label)} ${trustBadge(c.client || { trust: 'unverified' })}</div>
                <div class="api-key-meta">
                    <span>as you</span>
                    <span>started in ${escapeHtml(c.team_name || 'a team')}</span>
                    <span class="api-key-date">Signed in ${formatDate(c.created_at)}</span>
                    ${c.last_used_at ? `<span class="api-key-date">Last used ${formatDate(c.last_used_at)}</span>` : ''}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="revoke-connection" data-connection-id="${escapeAttr(c.id)}" data-connection-name="${escapeAttr(label)}">Sign out</button>
        </div>
    `;
}

export async function revokeConnection(connectionId, name) {
    if (!confirm(`Disconnect "${name}"? It stops working on its next request and has to be approved again to reconnect.`)) {
        return;
    }
    try {
        await api.revokeConnection(connectionId);
        showToast('App disconnected', 'success');
        await loadConnections();
    } catch (e) {
        showApiError('disconnect app', e);
    }
}

registerActions({
    'revoke-connection': (_event, data) => {
        revokeConnection(data.connectionId, data.connectionName);
    },
});
