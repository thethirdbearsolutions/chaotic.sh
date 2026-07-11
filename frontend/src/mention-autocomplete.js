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
 * True if `pos` in `text` falls inside a fenced ``` code block or an
 * inline `code` span (CHT-1272). Mirrors
 * backend/app/services/inbox_service.py's _strip_code_spans: an @handle
 * typed as example code shouldn't offer mention autocomplete, since it
 * won't produce a real inbox notification either (rendered comments skip
 * mentions under <pre>/<code>, and the backend strips the same spans
 * before matching).
 *
 * Fence state is tracked by toggling on every ``` before `pos` -- an
 * opening fence the user hasn't closed yet (still typing inside it) also
 * counts as "inside", same as it would once submitted.
 */
export function isInsideCodeSpan(text, pos) {
    // Ask the exact question the notification path answers: "would a mention at
    // this caret be stripped as code?" Mark the caret, run the SAME strip
    // regexes as the backend (inbox_service.py _CODE_FENCE_RE / _INLINE_CODE_RE),
    // and see if the marker survived. Keeps FE/BE in parity across the edge cases
    // (unclosed fences → EOF, longer fences swallowing inner runs, 1-2-backtick +
    // multi-line inline spans; an unclosed inline run stays literal). (CHT-1272)
    const MARK = String.fromCharCode(0);  // NUL — cannot occur in user-typed text
    const marked = text.slice(0, pos) + MARK + text.slice(pos);
    const stripped = marked
        .replace(/(`{3,})[\s\S]*?(?:\1|$)/g, '')
        .replace(/(`{1,2})[\s\S]*?\1/g, '');
    return !stripped.includes(MARK);
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
        if (isInsideCodeSpan(textarea.value, caret)) {
            hide();
            return;
        }
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
