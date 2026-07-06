import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMemberHandle } from './mention-autocomplete.js';

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
