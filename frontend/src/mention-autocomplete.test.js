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
