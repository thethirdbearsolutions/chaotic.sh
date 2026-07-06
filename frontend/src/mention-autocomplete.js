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

/**
 * Wire up @mention autocomplete on a textarea.
 *
 * Defaults to the comment box for backward compatibility; the issue
 * description editor also calls this with its own textarea/container ids
 * (CHT-1214) — the logic here was already textarea-agnostic, so this is a
 * mechanical parameterization.
 * @param {string} [textareaId='new-comment']
 * @param {string} [containerId='mention-suggestions']
 */
export function setupMentionAutocomplete(textareaId = 'new-comment', containerId = 'mention-suggestions') {
    const textarea = document.getElementById(textareaId);
    const container = document.getElementById(containerId);
    if (!textarea || !container) return;
    if (textarea.dataset.mentionsBound === 'true') return;
    textarea.dataset.mentionsBound = 'true';

    // CHT-1215: which suggestion ArrowUp/ArrowDown has highlighted, so
    // Enter/Tab can accept it without requiring the mouse.
    let highlightedIndex = -1;

    const hide = () => {
        container.classList.add('hidden');
        container.innerHTML = '';
        highlightedIndex = -1;
    };

    const setHighlighted = (index) => {
        const buttons = container.querySelectorAll('.mention-suggestion');
        if (buttons.length === 0) return;
        highlightedIndex = ((index % buttons.length) + buttons.length) % buttons.length;
        buttons.forEach((btn, i) => btn.classList.toggle('highlighted', i === highlightedIndex));
        buttons[highlightedIndex].scrollIntoView?.({ block: 'nearest' });
    };

    const acceptSuggestion = (handle) => {
        const caret = textarea.selectionStart || 0;
        const before = textarea.value.slice(0, caret).replace(/@([a-zA-Z0-9._-]*)$/, `@${handle} `);
        const after = textarea.value.slice(caret);
        textarea.value = before + after;
        textarea.focus();
        hide();
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

        container.querySelectorAll('.mention-suggestion').forEach((btn, i) => {
            btn.addEventListener('click', () => acceptSuggestion(btn.dataset.handle));
            // Keep keyboard highlight and mouse hover in sync (CHT-1215)
            btn.addEventListener('mouseenter', () => setHighlighted(i));
        });

        setHighlighted(0);
    };

    textarea.addEventListener('input', update);
    textarea.addEventListener('click', update);
    textarea.addEventListener('keydown', (event) => {
        const suggestionsVisible = !container.classList.contains('hidden');

        if (event.key === 'Escape' && suggestionsVisible) {
            // Only dismiss the suggestion popup — don't let the keydown bubble
            // to the global handler, which would also blur the textarea itself
            // (CHT-1215), losing the comment's cursor position.
            event.preventDefault();
            event.stopPropagation();
            hide();
            return;
        }

        if (!suggestionsVisible) return;

        // CHT-1215: arrow-key/Enter/Tab selection — previously mouse-only,
        // breaking the keyboard-only comment flow the rest of the app supports.
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlighted(highlightedIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlighted(highlightedIndex - 1);
        } else if (event.key === 'Enter' || event.key === 'Tab') {
            const buttons = container.querySelectorAll('.mention-suggestion');
            const target = buttons[highlightedIndex];
            if (target) {
                event.preventDefault();
                acceptSuggestion(target.dataset.handle);
            }
        }
    });
    textarea.addEventListener('blur', () => {
        setTimeout(hide, 150);
    });
}
