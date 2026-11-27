/**
 * Change your own password from Settings (CHT-2136).
 */

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';

/**
 * Submit the change-password form.
 * @param {HTMLFormElement} form
 * @returns {Promise<boolean>} whether the password was changed
 */
export async function handleChangePassword(form) {
    const current = form.querySelector('#current-password').value;
    const next = form.querySelector('#new-password').value;
    const confirmed = form.querySelector('#confirm-new-password').value;
    if (next !== confirmed) {
        showToast('The new passwords do not match', 'error');
        return false;
    }
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
        await api.changePassword(current, next);
        form.reset();
        showToast('Password changed', 'success');
        return true;
    } catch (e) {
        showApiError('change password', e);
        return false;
    } finally {
        if (button) button.disabled = false;
    }
}

registerActions({
    'change-password': (_event, _data, form) => {
        handleChangePassword(form);
    },
});
