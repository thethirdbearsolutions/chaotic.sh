import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMemberHandle, isInsideCodeSpan } from './mention-autocomplete.js';

describe('getMemberHandle', () => {
    it('returns first name lowercased', () => {
        expect(getMemberHandle({ name: 'John Smith', email: 'john@example.com' })).toBe('john');
    });

    it('returns email prefix when no name', () => {
        expect(getMemberHandle({ email: 'alice.bob@example.com' })).toBe('alice.bob');
    });

    it('returns "user" fallback when no name or email', () => {
        expect(getMemberHandle({})).toBe('user');
    });

    it('returns email prefix when name is empty string', () => {
        expect(getMemberHandle({ name: '', email: 'test@example.com' })).toBe('test');
    });
});

// CHT-1272: mirrors backend/app/services/inbox_service.py's
// _strip_code_spans -- an @handle inside a ``` fence or inline `code`
// span isn't a real mention on either side.
describe('isInsideCodeSpan (CHT-1272)', () => {
    it('is false for plain text with no backticks', () => {
        const text = 'hey @bob can you take a look?';
        expect(isInsideCodeSpan(text, text.indexOf('@bob'))).toBe(false);
    });

    it('is true for a caret inside a closed fenced code block', () => {
        const text = 'before\n```\n@bob do the thing\n```\nafter';
        const pos = text.indexOf('@bob') + 2;
        expect(isInsideCodeSpan(text, pos)).toBe(true);
    });

    it('is true for a caret inside a still-open (unclosed) fence', () => {
        const text = 'before\n```\n@bob';
        expect(isInsideCodeSpan(text, text.length)).toBe(true);
    });

    it('is false for a caret after a closed fence', () => {
        const text = 'before\n```\ncode\n```\n@bob';
        expect(isInsideCodeSpan(text, text.length)).toBe(false);
    });

    it('is true for a caret inside an inline `code` span', () => {
        const text = 'run `@bob` as a literal example';
        const pos = text.indexOf('@bob') + 2;
        expect(isInsideCodeSpan(text, pos)).toBe(true);
    });

    it('is false for a caret after an unclosed single backtick', () => {
        const text = 'hello `@bob unclosed';
        expect(isInsideCodeSpan(text, text.length)).toBe(false);
    });

    // Edge cases the earlier toggle/single-line impl missed (CHT-1272 review) —
    // must stay in parity with the backend _strip_code_spans regex.
    it('is true inside a longer (4-backtick) fence quoting an inner ``` run', () => {
        const text = 'x\n````\n```\n@bob\n```\n````\ny';
        const pos = text.indexOf('@bob') + 2;
        expect(isInsideCodeSpan(text, pos)).toBe(true);
    });

    it('is true inside a double-backtick inline span', () => {
        const text = 'see ``@bob`` here';
        const pos = text.indexOf('@bob') + 2;
        expect(isInsideCodeSpan(text, pos)).toBe(true);
    });

    it('is true inside a multi-line inline span', () => {
        const text = 'a ``line1\n@bob line2`` b';
        const pos = text.indexOf('@bob') + 2;
        expect(isInsideCodeSpan(text, pos)).toBe(true);
    });
});

// CHT-1215: Escape inside the suggestion popup used to also bubble to the
// global handler, which blurs any focused textarea on Escape — losing the
// comment box's cursor position along with dismissing the popup.
describe('Escape layering (CHT-1215)', () => {
    let setupMentionAutocomplete;
    let globalEscapeBlur;

    beforeEach(async () => {
        vi.resetModules();
        vi.doMock('./teams.js', () => ({
            getMembers: vi.fn(() => [{ id: '1', name: 'Ada Lovelace', email: 'ada@example.com' }]),
        }));
        ({ setupMentionAutocomplete } = await import('./mention-autocomplete.js'));

        document.body.innerHTML = `
            <textarea id="new-comment"></textarea>
            <div id="mention-suggestions" class="hidden"></div>
        `;

        // Stand-in for keyboard.js's global handler: blurs any focused
        // textarea on Escape. Registered on document so it only runs after
        // the textarea's own (earlier, target-phase) listener.
        globalEscapeBlur = vi.fn((e) => {
            if (e.key === 'Escape' && e.target.tagName === 'TEXTAREA') e.target.blur();
        });
        document.addEventListener('keydown', globalEscapeBlur);
    });

    it('stops propagation and hides the popup when suggestions are visible', () => {
        setupMentionAutocomplete();
        const textarea = document.getElementById('new-comment');
        const container = document.getElementById('mention-suggestions');
        const blurSpy = vi.spyOn(textarea, 'blur');

        // Simulate an open suggestion popup (as `update()` would leave it)
        container.classList.remove('hidden');

        textarea.focus();
        textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

        expect(container.classList.contains('hidden')).toBe(true);
        expect(globalEscapeBlur).not.toHaveBeenCalled();
        expect(blurSpy).not.toHaveBeenCalled();
    });

    it('does not intercept Escape when the popup is already hidden', () => {
        setupMentionAutocomplete();
        const textarea = document.getElementById('new-comment');
        const container = document.getElementById('mention-suggestions');
        expect(container.classList.contains('hidden')).toBe(true);

        textarea.focus();
        textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));

        // No popup to dismiss — the global handler should still see the event
        expect(globalEscapeBlur).toHaveBeenCalled();
    });
});

// CHT-1215: the suggestion list only wired up mouse clicks — a keyboard-only
// user typing a comment had to grab the mouse to complete an @mention.
describe('Arrow-key/Enter/Tab selection (CHT-1215)', () => {
    let setupMentionAutocomplete;
    let textarea;
    let container;

    beforeEach(async () => {
        vi.resetModules();
        vi.doMock('./teams.js', () => ({
            getMembers: vi.fn(() => [
                { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' },
                { id: '2', name: 'Alan Turing', email: 'alan@example.com' },
                { id: '3', name: 'Amy Rivera', email: 'amy@example.com' },
            ]),
        }));
        ({ setupMentionAutocomplete } = await import('./mention-autocomplete.js'));

        document.body.innerHTML = `
            <textarea id="new-comment"></textarea>
            <div id="mention-suggestions" class="hidden"></div>
        `;
        textarea = document.getElementById('new-comment');
        container = document.getElementById('mention-suggestions');

        setupMentionAutocomplete();
    });

    function typeQuery(text) {
        textarea.value = text;
        textarea.selectionStart = text.length;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function keydown(key) {
        return textarea.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }

    function suggestions() {
        return Array.from(container.querySelectorAll('.mention-suggestion'));
    }

    function highlightedHandles() {
        return suggestions().filter(b => b.classList.contains('highlighted')).map(b => b.dataset.handle);
    }

    it('highlights the first suggestion by default', () => {
        typeQuery('@a');
        expect(suggestions().length).toBeGreaterThan(1);
        expect(highlightedHandles()).toEqual([suggestions()[0].dataset.handle]);
    });

    it('ArrowDown moves the highlight to the next suggestion', () => {
        typeQuery('@a');
        keydown('ArrowDown');
        expect(highlightedHandles()).toEqual([suggestions()[1].dataset.handle]);
    });

    it('ArrowDown wraps from the last suggestion back to the first', () => {
        typeQuery('@a');
        const count = suggestions().length;
        for (let i = 0; i < count; i++) keydown('ArrowDown');
        expect(highlightedHandles()).toEqual([suggestions()[0].dataset.handle]);
    });

    it('ArrowUp wraps from the first suggestion to the last', () => {
        typeQuery('@a');
        keydown('ArrowUp');
        const last = suggestions()[suggestions().length - 1];
        expect(highlightedHandles()).toEqual([last.dataset.handle]);
    });

    it('Enter accepts the highlighted suggestion and hides the popup', () => {
        typeQuery('@a');
        keydown('ArrowDown'); // highlight suggestion index 1
        const targetHandle = suggestions()[1].dataset.handle;

        const prevented = !keydown('Enter');
        expect(prevented).toBe(true); // preventDefault() was called
        expect(textarea.value).toBe(`@${targetHandle} `);
        expect(container.classList.contains('hidden')).toBe(true);
    });

    it('Tab accepts the highlighted suggestion and hides the popup', () => {
        typeQuery('@a');
        const targetHandle = suggestions()[0].dataset.handle;

        const prevented = !keydown('Tab');
        expect(prevented).toBe(true);
        expect(textarea.value).toBe(`@${targetHandle} `);
        expect(container.classList.contains('hidden')).toBe(true);
    });

    it('Enter/Tab/Arrow keys do nothing when the popup is not open', () => {
        typeQuery('no mention here');
        expect(container.classList.contains('hidden')).toBe(true);

        const enterPrevented = !keydown('Enter');
        const tabPrevented = !keydown('Tab');

        expect(enterPrevented).toBe(false);
        expect(tabPrevented).toBe(false);
        expect(textarea.value).toBe('no mention here');
    });

    it('mouseenter on a suggestion syncs the keyboard highlight', () => {
        typeQuery('@a');
        suggestions()[2].dispatchEvent(new Event('mouseenter', { bubbles: true }));
        expect(highlightedHandles()).toEqual([suggestions()[2].dataset.handle]);
    });
});

// CHT-1214: setupMentionAutocomplete() was hardcoded to #new-comment /
// #mention-suggestions, so @mentions only ever worked in the comment box —
// not the issue description editor, despite the logic being textarea-agnostic.
describe('textarea/container parameterization (CHT-1214)', () => {
    let setupMentionAutocomplete;

    beforeEach(async () => {
        vi.resetModules();
        vi.doMock('./teams.js', () => ({
            getMembers: vi.fn(() => [{ id: '1', name: 'Ada Lovelace', email: 'ada@example.com' }]),
        }));
        ({ setupMentionAutocomplete } = await import('./mention-autocomplete.js'));
    });

    it('defaults to #new-comment / #mention-suggestions when called with no args', () => {
        document.body.innerHTML = `
            <textarea id="new-comment"></textarea>
            <div id="mention-suggestions" class="hidden"></div>
        `;
        setupMentionAutocomplete();

        const textarea = document.getElementById('new-comment');
        const container = document.getElementById('mention-suggestions');
        textarea.value = '@a';
        textarea.selectionStart = 2;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        expect(container.classList.contains('hidden')).toBe(false);
    });

    it('wires up a custom textarea/container pair, e.g. the description editor', () => {
        document.body.innerHTML = `
            <textarea id="edit-description"></textarea>
            <div id="edit-description-mention-suggestions" class="hidden"></div>
            <textarea id="new-comment"></textarea>
            <div id="mention-suggestions" class="hidden"></div>
        `;
        setupMentionAutocomplete('edit-description', 'edit-description-mention-suggestions');

        const descTextarea = document.getElementById('edit-description');
        const descContainer = document.getElementById('edit-description-mention-suggestions');
        const commentContainer = document.getElementById('mention-suggestions');

        descTextarea.value = '@a';
        descTextarea.selectionStart = 2;
        descTextarea.dispatchEvent(new Event('input', { bubbles: true }));

        expect(descContainer.classList.contains('hidden')).toBe(false);
        // The untouched comment box's popup must stay closed — confirms this
        // wasn't accidentally still bound to the hardcoded default ids.
        expect(commentContainer.classList.contains('hidden')).toBe(true);
    });

    it('does nothing if the given textarea id does not exist', () => {
        document.body.innerHTML = `<div id="mention-suggestions" class="hidden"></div>`;
        expect(() => setupMentionAutocomplete('does-not-exist', 'mention-suggestions')).not.toThrow();
    });

    it('CHT-1272: suppresses suggestions when typing @handle inside a ``` fence, but still shows them outside it', async () => {
        vi.resetModules();
        vi.doMock('./teams.js', () => ({
            getMembers: vi.fn(() => [{ id: '1', name: 'Ada Lovelace', email: 'ada@example.com' }]),
        }));
        ({ setupMentionAutocomplete } = await import('./mention-autocomplete.js'));

        document.body.innerHTML = `
            <textarea id="new-comment"></textarea>
            <div id="mention-suggestions" class="hidden"></div>
        `;
        setupMentionAutocomplete();
        const textarea = document.getElementById('new-comment');
        const container = document.getElementById('mention-suggestions');

        function typeAt(text, pos) {
            textarea.value = text;
            textarea.selectionStart = pos;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Caret right after "@a" inside a fenced block -- no suggestions.
        const fenced = 'before\n```\n@a';
        typeAt(fenced, fenced.length);
        expect(container.classList.contains('hidden')).toBe(true);

        // Same "@a" query, but outside the fence -- suggestions still show.
        const outside = 'before\n```\ncode\n```\n@a';
        typeAt(outside, outside.length);
        expect(container.classList.contains('hidden')).toBe(false);
    });

    it('does not double-bind when called twice for the same textarea', () => {
        document.body.innerHTML = `
            <textarea id="edit-description"></textarea>
            <div id="edit-description-mention-suggestions" class="hidden"></div>
        `;
        setupMentionAutocomplete('edit-description', 'edit-description-mention-suggestions');
        setupMentionAutocomplete('edit-description', 'edit-description-mention-suggestions');

        const textarea = document.getElementById('edit-description');
        const container = document.getElementById('edit-description-mention-suggestions');
        textarea.value = '@a';
        textarea.selectionStart = 2;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        // A single suggestion ('Ada Lovelace' only) confirms only one 'input'
        // listener is attached — the dataset.mentionsBound guard should have
        // no-op'd the second setup call.
        expect(container.querySelectorAll('.mention-suggestion').length).toBe(1);
    });
});
