/**
 * Mention autocomplete module (CHT-1044)
 *
 * Provides @mention suggestions in comment textareas.
 * Extracted from app.js.
 */

import { escapeHtml, escapeAttr } from './utils.js';
import { getMembers } from './teams.js';

export function getMemberHandle(member) {
    if (member.name) {
        return member.name.split(' ')[0].toLowerCase();
    }
    if (member.email) {
        return member.email.split('@')[0].toLowerCase();
    }
    return 'user';
}

export function setupMentionAutocomplete() {
    const textarea = document.getElementById('new-comment');
    const container = document.getElementById('mention-suggestions');
    if (!textarea || !container) return;
    if (textarea.dataset.mentionsBound === 'true') return;
    textarea.dataset.mentionsBound = 'true';

    const hide = () => {
        container.classList.add('hidden');
        container.innerHTML = '';
    };

    const update = () => {
        const caret = textarea.selectionStart || 0;
        const prefix = textarea.value.slice(0, caret);
        const match = prefix.match(/(^|\s)@([a-zA-Z0-9._-]*)$/);
        if (!match) {
            hide();
            return;
        }
        const query = match[2].toLowerCase();
        const suggestions = getMembers()
            .map(m => ({
                id: m.id,
                name: m.name || m.email || 'User',
                email: m.email || '',
                handle: getMemberHandle(m),
            }))
            .filter(m => !query || m.handle.includes(query) || m.name.toLowerCase().includes(query) || m.email.toLowerCase().includes(query))
            .slice(0, 6);

        if (!suggestions.length) {
            hide();
            return;
        }

        container.innerHTML = suggestions.map(s => `
            <button type="button" class="mention-suggestion" data-handle="${escapeAttr(s.handle)}">
                <span class="mention-name">${escapeHtml(s.name)}</span>
                <span class="mention-handle">@${escapeHtml(s.handle)}</span>
            </button>
        `).join('');
        container.classList.remove('hidden');

        container.querySelectorAll('.mention-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                const handle = btn.dataset.handle;
                const before = textarea.value.slice(0, caret).replace(/@([a-zA-Z0-9._-]*)$/, `@${handle} `);
                const after = textarea.value.slice(caret);
                textarea.value = before + after;
                textarea.focus();
                hide();
            });
        });
    };

    textarea.addEventListener('input', update);
    textarea.addEventListener('click', update);
    textarea.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hide();
        }
    });
    textarea.addEventListener('blur', () => {
        setTimeout(hide, 150);
    });
}
