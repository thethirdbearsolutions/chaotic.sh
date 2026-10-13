import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getConnections: vi.fn(),
        revokeConnection: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import {
    getConnections,
    setConnections,
    loadConnections,
    renderConnections,
    revokeConnection,
} from './connected-apps.js';

const CONNECTION = {
    id: 'hs-1',
    client: {
        client_id: 'https://claude.ai/oauth/claude-client-metadata',
        name: 'Claude',
        trust: 'recognized',
        host: 'claude.ai',
        registration: 'cimd',
    },
    agent: { id: 'a-1', name: 'Claude (Ethan)', kind: null },
    team_id: 't-1',
    team_name: 'Chaotic',
    project_ids: null,
    policy: 'write',
    scopes: ['chaotic:write'],
    created_at: '2026-10-13T12:00:00Z',
    last_used_at: '2026-10-13T13:00:00Z',
};

describe('connected-apps module', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div id="connected-apps-list"></div>';
        container = document.getElementById('connected-apps-list');
        vi.clearAllMocks();
        setConnections([]);
        global.confirm = vi.fn(() => true);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('registers the disconnect action', async () => {
        vi.resetModules();
        await import('./connected-apps.js');
        expect(registerActions).toHaveBeenCalledWith(expect.objectContaining({
            'revoke-connection': expect.any(Function),
        }));
    });

    it('renders an empty state', () => {
        renderConnections();
        expect(container.textContent).toContain('No connected apps');
    });

    it('labels a connection whose client is gone as unverified', () => {
        setConnections([{ ...CONNECTION, client: null }]);
        renderConnections();
        expect(container.textContent).toContain('Unknown app');
        expect(container.textContent).toContain('Unverified app');
    });

    it('does nothing without its container', () => {
        document.body.innerHTML = '';
        expect(() => renderConnections()).not.toThrow();
    });

    it('renders each connection with what it can do', () => {
        setConnections([
            CONNECTION,
            {
                ...CONNECTION, id: 'hs-2', project_ids: ['p-1'], agent: null, last_used_at: null,
                client: { client_id: 'dcr_x', name: 'Claude', trust: 'unverified', host: null, registration: 'dcr' },
            },
        ]);
        renderConnections();
        const items = container.querySelectorAll('.connected-app-item');
        expect(items).toHaveLength(2);
        expect(items[0].textContent).toContain('Claude');
        expect(items[0].textContent).toContain('as Claude (Ethan)');
        expect(items[0].textContent).toContain('all of Chaotic');
        expect(items[0].textContent).toContain('policy write');
        expect(items[0].textContent).toContain('Last used');
        expect(items[0].textContent).toContain('Recognized app');
        expect(items[0].textContent).toContain('claude.ai');
        expect(items[0].textContent).toContain(CONNECTION.client.client_id);
        // An unverified app that calls itself "Claude" says so.
        expect(items[1].textContent).toContain('Unverified app');
        expect(items[1].textContent).toContain('dcr_x');
        expect(items[1].textContent).toContain('1 project in Chaotic');
        expect(items[1].textContent).not.toContain('Last used');
        const button = items[0].querySelector('[data-action="revoke-connection"]');
        expect(button.dataset.connectionId).toBe('hs-1');
        expect(button.dataset.connectionName).toBe('Claude');
    });

    it('escapes what an app says about itself', () => {
        setConnections([{ ...CONNECTION, client: { ...CONNECTION.client, name: '<img src=x onerror=alert(1)>' } }]);
        renderConnections();
        expect(container.querySelector('img')).toBeNull();
    });

    it('loads from the API', async () => {
        api.getConnections.mockResolvedValue([CONNECTION]);
        await loadConnections();
        expect(getConnections()).toEqual([CONNECTION]);
        expect(container.querySelectorAll('.connected-app-item')).toHaveLength(1);
    });

    it('reports a load failure', async () => {
        const error = new Error('boom');
        api.getConnections.mockRejectedValue(error);
        await loadConnections();
        expect(showApiError).toHaveBeenCalledWith('load connected apps', error);
    });

    it('disconnects after confirmation and reloads', async () => {
        api.revokeConnection.mockResolvedValue(null);
        api.getConnections.mockResolvedValue([]);
        await revokeConnection('hs-1', 'Claude');
        expect(api.revokeConnection).toHaveBeenCalledWith('hs-1');
        expect(showToast).toHaveBeenCalledWith('App disconnected', 'success');
        expect(api.getConnections).toHaveBeenCalled();
    });

    it('does nothing when not confirmed', async () => {
        global.confirm = vi.fn(() => false);
        await revokeConnection('hs-1', 'Claude');
        expect(api.revokeConnection).not.toHaveBeenCalled();
    });

    it('reports a disconnect failure', async () => {
        const error = new Error('nope');
        api.revokeConnection.mockRejectedValue(error);
        await revokeConnection('hs-1', 'Claude');
        expect(showApiError).toHaveBeenCalledWith('disconnect app', error);
    });
});
