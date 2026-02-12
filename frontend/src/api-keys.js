/**
 * API Keys management module
 * Extracted from app.js for better testability and maintainability.
 */

import { api } from './api.js';
import { showModal, closeModal, showToast } from './ui.js';
import { escapeHtml, escapeJsString, formatDate } from './utils.js';

// State
let apiKeys = [];

/**
 * Get the current list of API keys.
 * @returns {Array} The list of API keys
 */
export function getApiKeys() {
    return apiKeys;
}

/**
 * Set the API keys list (primarily for testing).
 * @param {Array} keys - The keys to set
 */
export function setApiKeys(keys) {
    apiKeys = keys;
}

/**
 * Load API keys from the server and render them.
 */
export async function loadApiKeys() {
    try {
        apiKeys = await api.getApiKeys();
        renderApiKeys();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

/**
 * Render the API keys list to the DOM.
 */
export function renderApiKeys() {
    const container = document.getElementById('api-keys-list');
    if (!container) return;

    if (apiKeys.length === 0) {
        container.innerHTML = '<p class="empty-state">No API keys yet. Create one to get started.</p>';
        return;
    }

    container.innerHTML = apiKeys.map(key => `
        <div class="api-key-item ${!key.is_active ? 'revoked' : ''}">
            <div class="api-key-info">
                <div class="api-key-name">${escapeHtml(key.name)}</div>
                <div class="api-key-meta">
                    <code class="api-key-prefix">${escapeHtml(key.key_prefix)}...</code>
                    <span class="api-key-date">Created ${formatDate(key.created_at)}</span>
                    ${key.last_used_at ? `<span class="api-key-date">Last used ${formatDate(key.last_used_at)}</span>` : ''}
                    ${!key.is_active ? '<span class="api-key-revoked">Revoked</span>' : ''}
                </div>
            </div>
            ${key.is_active ? `
                <button class="btn btn-danger-outline" onclick="revokeApiKey('${escapeJsString(key.id)}', '${escapeJsString(key.name)}')">Revoke</button>
            ` : ''}
        </div>
    `).join('');
}

/**
 * Show the modal to create a new API key.
 */
export function showCreateApiKeyModal() {
    document.getElementById('modal-title').textContent = 'Create API Key';
    document.getElementById('modal-content').innerHTML = `
        <form onsubmit="return handleCreateApiKey(event)">
            <div class="form-group">
                <label for="api-key-name">Key Name</label>
                <input type="text" id="api-key-name" placeholder="e.g., CLI, CI/CD, Personal" required>
                <p class="form-help">A descriptive name to identify this key.</p>
            </div>
            <button type="submit" class="btn btn-primary">Create Key</button>
        </form>
    `;
    showModal();
}

/**
 * Handle the create API key form submission.
 * @param {Event} event - The form submit event
 * @returns {boolean} false to prevent form submission
 */
export async function handleCreateApiKey(event) {
    event.preventDefault();
    const name = document.getElementById('api-key-name').value.trim();

    try {
        const result = await api.createApiKey(name);
        closeModal();

        // Show the key in a new modal (only shown once)
        document.getElementById('modal-title').textContent = 'API Key Created';
        document.getElementById('modal-content').innerHTML = `
            <div class="api-key-created">
                <p class="warning-text">Copy your API key now. You won't be able to see it again!</p>
                <div class="api-key-display">
                    <code id="new-api-key">${result.key}</code>
                    <button type="button" class="btn btn-secondary" onclick="copyApiKey()">Copy</button>
                </div>
                <div class="api-key-instructions">
                    <p>Use this key in the CLI:</p>
                    <code>chaotic auth set-key ${result.key}</code>
                </div>
                <button type="button" class="btn btn-secondary" onclick="closeModal(); loadApiKeys();">Done</button>
            </div>
        `;
        showModal();
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

/**
 * Copy the newly created API key to clipboard.
 */
export async function copyApiKey() {
    const key = document.getElementById('new-api-key').textContent;
    try {
        await navigator.clipboard.writeText(key);
        showToast('API key copied to clipboard', 'success');
    } catch {
        showToast('Failed to copy', 'error');
    }
}

/**
 * Revoke an API key after confirmation.
 * @param {string} keyId - The ID of the key to revoke
 * @param {string} keyName - The name of the key (for confirmation message)
 */
export async function revokeApiKey(keyId, keyName) {
    if (!confirm(`Revoke API key "${keyName}"? This cannot be undone.`)) {
        return;
    }

    try {
        await api.revokeApiKey(keyId);
        showToast('API key revoked', 'success');
        await loadApiKeys();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

// Window exports for onclick handlers
window.loadApiKeys = loadApiKeys;
window.showCreateApiKeyModal = showCreateApiKeyModal;
window.handleCreateApiKey = handleCreateApiKey;
window.copyApiKey = copyApiKey;
window.revokeApiKey = revokeApiKey;
