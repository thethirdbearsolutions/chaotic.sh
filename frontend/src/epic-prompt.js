/**
 * What closing a ticket leaves open (CHT-1901, CHT-1884).
 *
 * Epics never close themselves. When an update closes the last open child
 * of an open parent, the PATCH response carries `parent_prompt`, and the
 * person who closed it is asked: close the parent, or add more? When the
 * closed ticket still has open children, the response carries
 * `open_children`, shown as a warning.
 */

import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { registerActions } from './event-delegation.js';
import { showCreateSubIssueModal } from './issue-creation.js';

/**
 * Act on a PATCH /issues/{id} response. Safe to call with any value.
 * @param {object|null|undefined} response
 * @returns {boolean} true when a prompt or warning was shown
 */
export function handleCloseFollowups(response) {
    if (!response || typeof response !== 'object') return false;
    let shown = false;
    if (response.open_children && response.open_children.message) {
        showToast(response.open_children.message, 'warning');
        shown = true;
    }
    const prompt = response.parent_prompt;
    if (prompt && prompt.id) {
        showParentPrompt(prompt, response.project_id);
        shown = true;
    }
    return shown;
}

function showParentPrompt(prompt, projectId) {
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    if (!title || !content) return;
    title.textContent = `Close ${prompt.identifier}?`;
    content.innerHTML = `
        <div class="parent-prompt">
            <p>${escapeHtml(prompt.message)}</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-dismiss">Not now</button>
                <button type="button" class="btn btn-secondary" data-action="parent-prompt-add"
                    data-parent-id="${escapeAttr(prompt.id)}" data-project-id="${escapeAttr(projectId || '')}">Add more</button>
                <button type="button" class="btn btn-primary" data-action="parent-prompt-close"
                    data-parent-id="${escapeAttr(prompt.id)}" data-identifier="${escapeAttr(prompt.identifier)}">Close ${escapeHtml(prompt.identifier)}</button>
            </div>
        </div>
    `;
    showModal();
}

export async function closeParentFromPrompt(parentId, identifier) {
    try {
        const updated = await api.updateIssue(parentId, { status: 'done' });
        closeModal();
        showToast(`${identifier} closed`, 'success');
        // Closing the parent can itself finish its own parent.
        handleCloseFollowups(updated);
    } catch (e) {
        showApiError(`close ${identifier}`, e);
    }
}

registerActions({
    'parent-prompt-dismiss': () => closeModal(),
    'parent-prompt-close': (_event, data) => closeParentFromPrompt(data.parentId, data.identifier),
    'parent-prompt-add': (_event, data) => {
        closeModal();
        showCreateSubIssueModal(data.parentId, data.projectId);
    },
});
