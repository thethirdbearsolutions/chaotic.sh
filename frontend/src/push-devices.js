/**
 * Push devices (CHT-1604): the phones the signed-in person registered for
 * push notifications, listed in Settings with a Remove button. Only their
 * own; the server filters on the caller. The app registers a device; this
 * page only shows and removes them.
 */

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr, formatDate } from './utils.js';
import { registerActions } from './event-delegation.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

let devices = [];

export function getPushDevices() {
    return devices;
}

export function setPushDevices(list) {
    devices = list;
}

export async function loadPushDevices() {
    try {
        devices = await api.getPushDevices();
        renderPushDevices();
    } catch (e) {
        showApiError('load push devices', e);
    }
}

// Why a device gets no notifications (CHT-1604); an active one needs no note.
const STATUS_NOTES = {
    expired: 'Paused: its sign-in expired. Open the app to resume.',
    needs_reregistration: 'Paused: the server key changed. Open the app to resume.',
};

function deviceName(device) {
    return device.label || device.platform || 'Unnamed device';
}

export function renderPushDevices() {
    const container = document.getElementById('push-devices-list');
    if (!container) return;

    if (devices.length === 0) {
        container.innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.dashboard,
            heading: 'No devices',
            description: 'Phones you turn on notifications for in the Chaotic app appear here.',
        });
        return;
    }

    container.innerHTML = devices.map(d => `
        <div class="api-key-item push-device-item">
            <div class="api-key-info">
                <div class="api-key-name">${escapeHtml(deviceName(d))}</div>
                <div class="api-key-meta">
                    ${d.platform && d.label ? `<span>${escapeHtml(d.platform)}</span>` : ''}
                    <span>via ${escapeHtml(d.endpoint_host)}</span>
                    <span class="api-key-date">Added ${formatDate(d.created_at)}</span>
                    ${d.last_success_at ? `<span class="api-key-date">Last notified ${formatDate(d.last_success_at)}</span>` : ''}
                    ${d.failure_count ? `<span>${escapeHtml(String(d.failure_count))} failed deliveries</span>` : ''}
                    ${STATUS_NOTES[d.status] ? `<span class="push-device-status">${escapeHtml(STATUS_NOTES[d.status])}</span>` : ''}
                </div>
            </div>
            <button class="btn btn-danger-outline" data-action="remove-push-device" data-installation-id="${escapeAttr(d.installation_id)}" data-device-name="${escapeAttr(deviceName(d))}">Remove</button>
        </div>
    `).join('');
}

export async function removePushDevice(installationId, name) {
    if (!confirm(`Stop sending notifications to "${name}"? The app registers again the next time it starts while signed in.`)) {
        return;
    }
    try {
        await api.deletePushDevice(installationId);
        showToast('Device removed', 'success');
        await loadPushDevices();
    } catch (e) {
        showApiError('remove push device', e);
    }
}

registerActions({
    'remove-push-device': (_event, data) => {
        removePushDevice(data.installationId, data.deviceName);
    },
});
