/**
 * Tests for quote-comment.js module (CHT-1173)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./storage.js', () => ({
    setCommentDraft: vi.fn(),
    getCommentDraft: vi.fn(),
}));

vi.mock('./state.js', () => ({
    getCurrentDetailIssue: vi.fn(() => ({ id: 'issue-1' })),
    getCurrentTeam: vi.fn(),
    getCurrentProject: vi.fn(),
    getCurrentView: vi.fn(),
    subscribe: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

import { setCommentDraft } from './storage.js';
import { getCurrentDetailIssue } from './state.js';
import {
    quoteSelectionIntoComment,
    setupQuoteComment,
    formatAsBlockquote,
    getQuotableSelection,
    hideTooltip,
} from './quote-comment.js';

describe('quote-comment module', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="issue-detail-content">
                <div class="description-content">Some description text here</div>
                <div class="comment-content">A comment body</div>
            </div>
            <textarea id="new-comment"></textarea>
        `;
        vi.clearAllMocks();
        getCurrentDetailIssue.mockReturnValue({ id: 'issue-1' });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        hideTooltip();
    });

    describe('formatAsBlockquote', () => {
        it('prefixes single line with >', () => {
            expect(formatAsBlockquote('hello')).toBe('> hello');
        });

        it('prefixes each line of multiline text', () => {
            expect(formatAsBlockquote('line 1\nline 2\nline 3')).toBe(
                '> line 1\n> line 2\n> line 3'
            );
        });

        it('handles empty string', () => {
            expect(formatAsBlockquote('')).toBe('> ');
        });
    });

    describe('quoteSelectionIntoComment', () => {
        function mockSelection(text, container) {
            const range = document.createRange();
            const textNode = container.firstChild;
            range.setStart(textNode, 0);
            range.setEnd(textNode, Math.min(text.length, textNode.textContent.length));

            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }

        it('inserts quoted text into empty textarea', () => {
            const desc = document.querySelector('.description-content');
            mockSelection('Some description', desc);

            const result = quoteSelectionIntoComment();

            expect(result).toBe(true);
            const textarea = document.getElementById('new-comment');
            expect(textarea.value).toContain('> Some description');
            expect(textarea.value.endsWith('\n\n')).toBe(true);
        });

        it('appends quoted text to existing content', () => {
            const textarea = document.getElementById('new-comment');
            textarea.value = 'existing comment';

            const desc = document.querySelector('.description-content');
            mockSelection('Some description', desc);

            quoteSelectionIntoComment();

            expect(textarea.value).toContain('existing comment');
            expect(textarea.value).toContain('> Some description');
        });

        it('persists draft via setCommentDraft', () => {
            const desc = document.querySelector('.description-content');
            mockSelection('Some description', desc);

            quoteSelectionIntoComment();

            expect(setCommentDraft).toHaveBeenCalledWith('issue-1', expect.stringContaining('> Some description'));
        });

        it('returns false when no quotable selection', () => {
            // No selection
            window.getSelection().removeAllRanges();

            const result = quoteSelectionIntoComment();
            expect(result).toBe(false);
        });

        it('returns false when textarea not found', () => {
            document.getElementById('new-comment').remove();

            const desc = document.querySelector('.description-content');
            const range = document.createRange();
            range.setStart(desc.firstChild, 0);
            range.setEnd(desc.firstChild, 4);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            const result = quoteSelectionIntoComment();
            expect(result).toBe(false);
        });

        it('works with comment-content selections', () => {
            const comment = document.querySelector('.comment-content');
            mockSelection('A comment', comment);

            const result = quoteSelectionIntoComment();
            expect(result).toBe(true);
            expect(document.getElementById('new-comment').value).toContain('> A comment');
        });

        it('clears selection after quoting', () => {
            const desc = document.querySelector('.description-content');
            mockSelection('Some description', desc);

            quoteSelectionIntoComment();

            const sel = window.getSelection();
            expect(sel.isCollapsed || sel.rangeCount === 0).toBe(true);
        });
    });

    describe('setupQuoteComment', () => {
        it('does nothing when container is missing', () => {
            document.body.innerHTML = '';
            // Should not throw
            setupQuoteComment();
        });

        it('attaches mouseup listener to container', () => {
            const container = document.getElementById('issue-detail-content');
            const spy = vi.spyOn(container, 'addEventListener');

            setupQuoteComment();

            const mouseupCall = spy.mock.calls.find(([event]) => event === 'mouseup');
            expect(mouseupCall).toBeTruthy();
        });
    });

    describe('getQuotableSelection', () => {
        it('returns null when no selection', () => {
            window.getSelection().removeAllRanges();
            expect(getQuotableSelection()).toBeNull();
        });

        it('returns null when selection is outside quotable area', () => {
            document.body.innerHTML = '<div id="other">other text</div><textarea id="new-comment"></textarea>';
            const other = document.getElementById('other');
            const range = document.createRange();
            range.setStart(other.firstChild, 0);
            range.setEnd(other.firstChild, 5);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            expect(getQuotableSelection()).toBeNull();
        });
    });
});
