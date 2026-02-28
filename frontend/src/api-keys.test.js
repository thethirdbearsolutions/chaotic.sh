/**
 * Tests for api-keys.js module
 * Written BEFORE extraction per the extraction strategy.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock the dependencies before importing the module
vi.mock('./api.js', () => ({
    api: {
        getApiKeys: vi.fn(),
        createApiKey: vi.fn(),
        revokeApiKey: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((text) => text ? String(text).replace(/[&<>"']/g, '') : ''),
    escapeAttr: vi.fn((text) => text ? String(text).replace(/[&<>"']/g, '') : ''),
    formatDate: vi.fn((_date) => 'Jan 1, 2026'),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

// Import after mocks are set up
import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import {
    getApiKeys,
    setApiKeys,
    loadApiKeys,
    renderApiKeys,
    showCreateApiKeyModal,
    handleCreateApiKey,
    copyApiKey,
    revokeApiKey,
} from './api-keys.js';

describe('api-keys module', () => {
    let container;

    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = `
            <div id="api-keys-list"></div>
            <div id="modal-title"></div>
            <div id="modal-content"></div>
            <input id="api-key-name" />
            <code id="new-api-key">ck_test123</code>
        `;
        container = document.getElementById('api-keys-list');

        // Reset mocks
        vi.clearAllMocks();

        // Reset state
        setApiKeys([]);

        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: vi.fn().mockResolvedValue(undefined),
            },
        });

        // Mock confirm
        global.confirm = vi.fn(() => true);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    describe('loadApiKeys', () => {
        it('fetches keys and renders them', async () => {
            const mockKeys = [
                { id: '1', name: 'Test Key', key_prefix: 'ck_abc', is_active: true, created_at: '2026-01-01' },
            ];
            api.getApiKeys.mockResolvedValue(mockKeys);

            await loadApiKeys();

            expect(api.getApiKeys).toHaveBeenCalled();
            expect(getApiKeys()).toEqual(mockKeys);
            expect(container.innerHTML).toContain('Test Key');
        });

        it('shows error toast on failure', async () => {
            api.getApiKeys.mockRejectedValue(new Error('Network error'));

            await loadApiKeys();

            expect(showApiError).toHaveBeenCalledWith('load API keys', expect.objectContaining({ message: 'Network error' }));
        });
    });

    describe('renderApiKeys', () => {
        it('renders empty state when no keys', () => {
            setApiKeys([]);

            renderApiKeys();

            expect(container.innerHTML).toContain('No API keys yet');
        });

        it('renders key list', () => {
            setApiKeys([
                { id: '1', name: 'CLI Key', key_prefix: 'ck_abc', is_active: true, created_at: '2026-01-01' },
                { id: '2', name: 'CI Key', key_prefix: 'ck_def', is_active: false, created_at: '2026-01-02' },
            ]);

            renderApiKeys();

            expect(container.innerHTML).toContain('CLI Key');
            expect(container.innerHTML).toContain('CI Key');
            expect(container.innerHTML).toContain('ck_abc');
            expect(container.innerHTML).toContain('Revoked');
        });

        it('shows revoke button only for active keys', () => {
            setApiKeys([
                { id: '1', name: 'Active', key_prefix: 'ck_abc', is_active: true, created_at: '2026-01-01' },
                { id: '2', name: 'Inactive', key_prefix: 'ck_def', is_active: false, created_at: '2026-01-01' },
            ]);

            renderApiKeys();

            const html = container.innerHTML;
            // Active key should have revoke button with data-action
            expect(html).toContain('data-action="revoke-api-key"');
            expect(html).toContain('data-key-id="1"');
            // Inactive key should not have revoke button
            expect(html).not.toContain('data-key-id="2"');
        });

        it('does nothing if container not found', () => {
            document.body.innerHTML = '';

            // Should not throw
            renderApiKeys();
        });

        it('shows last used date when available', () => {
            setApiKeys([
                { id: '1', name: 'Key', key_prefix: 'ck_abc', is_active: true, created_at: '2026-01-01', last_used_at: '2026-01-15' },
            ]);

            renderApiKeys();

            expect(container.innerHTML).toContain('Last used');
        });
    });

    describe('showCreateApiKeyModal', () => {
        it('shows modal with create form', () => {
            showCreateApiKeyModal();

            expect(document.getElementById('modal-title').textContent).toBe('Create API Key');
            expect(document.getElementById('modal-content').innerHTML).toContain('api-key-name');
            expect(document.getElementById('modal-content').innerHTML).toContain('data-action="create-api-key"');
            expect(showModal).toHaveBeenCalled();
        });
    });

    describe('handleCreateApiKey', () => {
        it('creates key and shows result modal', async () => {
            const mockResult = { key: 'ck_newkey123' };
            api.createApiKey.mockResolvedValue(mockResult);
            document.getElementById('api-key-name').value = 'My New Key';

            const event = { preventDefault: vi.fn() };
            await handleCreateApiKey(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(api.createApiKey).toHaveBeenCalledWith('My New Key');
            expect(closeModal).toHaveBeenCalled();
            expect(document.getElementById('modal-title').textContent).toBe('API Key Created');
            expect(document.getElementById('modal-content').innerHTML).toContain('ck_newkey123');
            expect(showModal).toHaveBeenCalled();
        });

        it('trims whitespace from name', async () => {
            api.createApiKey.mockResolvedValue({ key: 'ck_test' });
            document.getElementById('api-key-name').value = '  Trimmed Name  ';

            await handleCreateApiKey({ preventDefault: vi.fn() });

            expect(api.createApiKey).toHaveBeenCalledWith('Trimmed Name');
        });

        it('shows error toast on failure', async () => {
            api.createApiKey.mockRejectedValue(new Error('Create failed'));
            document.getElementById('api-key-name').value = 'Test';

            await handleCreateApiKey({ preventDefault: vi.fn() });

            expect(showApiError).toHaveBeenCalledWith('create API key', expect.objectContaining({ message: 'Create failed' }));
        });

        it('returns false to prevent form submission', async () => {
            api.createApiKey.mockResolvedValue({ key: 'ck_test' });
            document.getElementById('api-key-name').value = 'Test';

            const result = await handleCreateApiKey({ preventDefault: vi.fn() });

            expect(result).toBe(false);
        });
    });

    describe('copyApiKey', () => {
        it('copies key to clipboard and shows success toast', async () => {
            await copyApiKey();

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith('ck_test123');
            expect(showToast).toHaveBeenCalledWith('API key copied to clipboard', 'success');
        });

        it('shows error toast on clipboard failure', async () => {
            navigator.clipboard.writeText.mockRejectedValue(new Error('Clipboard error'));

            await copyApiKey();

            expect(showToast).toHaveBeenCalledWith('Failed to copy', 'error');
        });
    });

    describe('revokeApiKey', () => {
        it('confirms before revoking', async () => {
            api.revokeApiKey.mockResolvedValue({});
            api.getApiKeys.mockResolvedValue([]);

            await revokeApiKey('key-1', 'Test Key');

            expect(global.confirm).toHaveBeenCalledWith('Revoke API key "Test Key"? This cannot be undone.');
        });

        it('revokes key and reloads on confirm', async () => {
            global.confirm.mockReturnValue(true);
            api.revokeApiKey.mockResolvedValue({});
            api.getApiKeys.mockResolvedValue([]);

            await revokeApiKey('key-1', 'Test Key');

            expect(api.revokeApiKey).toHaveBeenCalledWith('key-1');
            expect(showToast).toHaveBeenCalledWith('API key revoked', 'success');
            expect(api.getApiKeys).toHaveBeenCalled(); // loadApiKeys called
        });

        it('does nothing if user cancels', async () => {
            global.confirm.mockReturnValue(false);

            await revokeApiKey('key-1', 'Test Key');

            expect(api.revokeApiKey).not.toHaveBeenCalled();
        });

        it('shows error toast on failure', async () => {
            global.confirm.mockReturnValue(true);
            api.revokeApiKey.mockRejectedValue(new Error('Revoke failed'));

            await revokeApiKey('key-1', 'Test Key');

            expect(showApiError).toHaveBeenCalledWith('revoke API key', expect.objectContaining({ message: 'Revoke failed' }));
        });
    });
});
