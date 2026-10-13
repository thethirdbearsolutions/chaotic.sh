import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getPushDevices: vi.fn(),
        deletePushDevice: vi.fn(),
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
    getPushDevices,
    setPushDevices,
    loadPushDevices,
    renderPushDevices,
    removePushDevice,
} from './push-devices.js';

const DEVICE = {
    id: 'd-1',
    installation_id: 'inst-0001',
    transport: 'web_push',
    endpoint_host: 'ntfy.sh',
    platform: 'android',
    label: 'Pixel 9',
    created_at: '2026-10-13T12:00:00Z',
    updated_at: '2026-10-13T12:00:00Z',
    last_success_at: '2026-10-13T13:00:00Z',
    failure_count: 0,
    status: 'active',
};

describe('push-devices module', () => {
    let container;

    beforeEach(() => {
        document.body.innerHTML = '<div id="push-devices-list"></div>';
        container = document.getElementById('push-devices-list');
        vi.clearAllMocks();
        setPushDevices([]);
        global.confirm = vi.fn(() => true);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('registers the remove action, which calls removePushDevice', async () => {
        vi.resetModules();
        await import('./push-devices.js');
        const actions = registerActions.mock.calls.at(-1)[0];
        expect(actions).toEqual(expect.objectContaining({ 'remove-push-device': expect.any(Function) }));
        global.confirm = vi.fn(() => false);
        actions['remove-push-device'](null, { installationId: 'inst-0001', deviceName: 'Pixel 9' });
        expect(global.confirm).toHaveBeenCalledWith(expect.stringContaining('Pixel 9'));
    });

    it('renders an empty state', () => {
        renderPushDevices();
        expect(container.textContent).toContain('No devices');
    });

    it('does nothing without its container', () => {
        document.body.innerHTML = '';
        setPushDevices([DEVICE]);
        expect(() => renderPushDevices()).not.toThrow();
    });

    it('renders a device with its name, host and history', () => {
        setPushDevices([{ ...DEVICE, failure_count: 2 }]);
        renderPushDevices();
        expect(container.textContent).toContain('Pixel 9');
        expect(container.textContent).toContain('android');
        expect(container.textContent).toContain('via ntfy.sh');
        expect(container.textContent).toContain('Last notified');
        expect(container.textContent).toContain('2 failed deliveries');
        const button = container.querySelector('[data-action="remove-push-device"]');
        expect(button.dataset.installationId).toBe('inst-0001');
    });

    it('falls back to the platform, then a placeholder, for the name', () => {
        setPushDevices([
            { ...DEVICE, id: 'a', label: null, last_success_at: null },
            { ...DEVICE, id: 'b', label: null, platform: null, last_success_at: null },
        ]);
        renderPushDevices();
        const names = [...container.querySelectorAll('.api-key-name')].map(n => n.textContent);
        expect(names).toEqual(['android', 'Unnamed device']);
        expect(container.textContent).not.toContain('Last notified');
    });

    it('explains why a device is paused', () => {
        setPushDevices([
            { ...DEVICE, id: 'a', status: 'expired' },
            { ...DEVICE, id: 'b', status: 'needs_reregistration' },
            { ...DEVICE, id: 'c', status: 'active' },
        ]);
        renderPushDevices();
        const notes = [...container.querySelectorAll('.push-device-status')].map(n => n.textContent);
        expect(notes).toEqual([
            'Paused: its sign-in expired. Open the app to resume.',
            'Paused: the server key changed. Open the app to resume.',
        ]);
    });

    it('escapes what the app sent', () => {
        setPushDevices([{ ...DEVICE, label: '<img src=x onerror=alert(1)>' }]);
        renderPushDevices();
        expect(container.querySelector('img')).toBeNull();
    });

    it('loads devices', async () => {
        api.getPushDevices.mockResolvedValue([DEVICE]);
        await loadPushDevices();
        expect(getPushDevices()).toEqual([DEVICE]);
        expect(container.textContent).toContain('Pixel 9');
    });

    it('reports a failed load', async () => {
        api.getPushDevices.mockRejectedValue(new Error('boom'));
        await loadPushDevices();
        expect(showApiError).toHaveBeenCalledWith('load push devices', expect.any(Error));
    });

    it('removes a device after confirming', async () => {
        api.deletePushDevice.mockResolvedValue(null);
        api.getPushDevices.mockResolvedValue([]);
        await removePushDevice('inst-0001', 'Pixel 9');
        expect(api.deletePushDevice).toHaveBeenCalledWith('inst-0001');
        expect(showToast).toHaveBeenCalledWith('Device removed', 'success');
        expect(api.getPushDevices).toHaveBeenCalled();
    });

    it('does not remove without confirmation', async () => {
        global.confirm = vi.fn(() => false);
        await removePushDevice('inst-0001', 'Pixel 9');
        expect(api.deletePushDevice).not.toHaveBeenCalled();
    });

    it('reports a failed removal', async () => {
        api.deletePushDevice.mockRejectedValue(new Error('nope'));
        await removePushDevice('inst-0001', 'Pixel 9');
        expect(showApiError).toHaveBeenCalledWith('remove push device', expect.any(Error));
    });
});
