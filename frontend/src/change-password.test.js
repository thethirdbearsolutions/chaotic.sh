/**
 * Tests for change-password.js (CHT-2136)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: { changePassword: vi.fn() },
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
import { handleChangePassword } from './change-password.js';

function makeForm(current, next, confirmed) {
    document.body.innerHTML = `
        <form>
            <input id="current-password">
            <input id="new-password">
            <input id="confirm-new-password">
            <button type="submit">Change password</button>
        </form>`;
    document.getElementById('current-password').value = current;
    document.getElementById('new-password').value = next;
    document.getElementById('confirm-new-password').value = confirmed;
    return document.querySelector('form');
}

describe('handleChangePassword', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('sends the current and new password, then clears the form', async () => {
        api.changePassword.mockResolvedValue({});
        const form = makeForm('old-password', 'new-password1', 'new-password1');
        expect(await handleChangePassword(form)).toBe(true);
        expect(api.changePassword).toHaveBeenCalledWith('old-password', 'new-password1');
        expect(showToast).toHaveBeenCalledWith('Password changed', 'success');
        expect(form.querySelector('#current-password').value).toBe('');
        expect(form.querySelector('button').disabled).toBe(false);
    });

    it('refuses mismatched new passwords without calling the API', async () => {
        const form = makeForm('old-password', 'new-password1', 'new-password2');
        expect(await handleChangePassword(form)).toBe(false);
        expect(api.changePassword).not.toHaveBeenCalled();
        expect(showToast).toHaveBeenCalledWith('The new passwords do not match', 'error');
    });

    it('shows the API error and keeps the form', async () => {
        const error = new Error('The password was not changed: the current password is wrong.');
        api.changePassword.mockRejectedValue(error);
        const form = makeForm('wrong', 'new-password1', 'new-password1');
        expect(await handleChangePassword(form)).toBe(false);
        expect(showApiError).toHaveBeenCalledWith('change password', error);
        expect(form.querySelector('#current-password').value).toBe('wrong');
        expect(form.querySelector('button').disabled).toBe(false);
    });
});
