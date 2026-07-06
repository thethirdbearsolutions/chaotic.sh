/**
 * Tests for quote-comment.js module (CHT-1173)
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

import {
    quoteSelectionIntoComment,
    setupQuoteComment,
    formatAsBlockquote,
    getQuotableSelection,
    hideTooltip,
    getTooltip,
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

        it('dispatches an input event so the caller\'s own draft-persistence listener fires (CHT-1213)', () => {
            // quote-comment.js doesn't know or care whether it's quoting into
            // an issue or document comment box — draft persistence is the
            // caller's responsibility via its own 'input' listener on the
            // textarea (issue-detail-view.js / documents.js each wire one up).
            const textarea = document.getElementById('new-comment');
            const inputHandler = vi.fn();
            textarea.addEventListener('input', inputHandler);

            const desc = document.querySelector('.description-content');
            mockSelection('Some description', desc);

            quoteSelectionIntoComment();

            expect(inputHandler).toHaveBeenCalledTimes(1);
            expect(textarea.value).toContain('> Some description');
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

    // CHT-1175: keyboard accessibility
    describe('tooltip keyboard accessibility', () => {
        function selectDescriptionText() {
            const container = document.querySelector('.description-content');
            const range = document.createRange();
            range.setStart(container.firstChild, 0);
            range.setEnd(container.firstChild, 4);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }

        it('tooltip is focusable via tabindex', () => {
            const tip = getTooltip();
            expect(tip.getAttribute('tabindex')).toBe('0');
        });

        it('tooltip has role=button and an aria-label', () => {
            const tip = getTooltip();
            expect(tip.getAttribute('role')).toBe('button');
            expect(tip.getAttribute('aria-label')).toBe('Quote selection in comment');
        });

        it('Enter on tooltip inserts the quote', () => {
            selectDescriptionText();
            const tip = getTooltip();
            tip.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));

            const textarea = document.getElementById('new-comment');
            expect(textarea.value).toBe('> Some\n\n');
        });

        it('Space on tooltip inserts the quote', () => {
            selectDescriptionText();
            const tip = getTooltip();
            tip.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }));

            const textarea = document.getElementById('new-comment');
            expect(textarea.value).toBe('> Some\n\n');
        });

        it('Enter prevents default so the page does not scroll or submit', () => {
            selectDescriptionText();
            const tip = getTooltip();
            const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
            tip.dispatchEvent(event);
            expect(event.defaultPrevented).toBe(true);
        });

        it('other keys on tooltip do not insert a quote', () => {
            selectDescriptionText();
            const tip = getTooltip();
            tip.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true }));

            const textarea = document.getElementById('new-comment');
            expect(textarea.value).toBe('');
        });

        // Keyboard-made selections summon the tooltip without a mouse (PR #198 review M3)
        it('keyup with a quotable selection shows the tooltip', () => {
            setupQuoteComment();
            hideTooltip();
            selectDescriptionText();
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
            expect(getTooltip().style.display).toBe('flex');
        });

        it('keyup without a selection does not show the tooltip', () => {
            setupQuoteComment();
            hideTooltip();
            window.getSelection().removeAllRanges();
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
            expect(getTooltip().style.display).toBe('none');
        });

        it('keyup with a non-quotable selection does not show the tooltip', () => {
            setupQuoteComment();
            hideTooltip();
            document.body.insertAdjacentHTML('beforeend', '<div id="outside">outside text</div>');
            const outside = document.getElementById('outside');
            const range = document.createRange();
            range.setStart(outside.firstChild, 0);
            range.setEnd(outside.firstChild, 5);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
            expect(getTooltip().style.display).toBe('none');
        });

        it('Escape keyup does not re-show the tooltip after Escape dismisses it', () => {
            setupQuoteComment();
            selectDescriptionText();
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', shiftKey: true, bubbles: true }));
            expect(getTooltip().style.display).toBe('flex');

            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            expect(getTooltip().style.display).toBe('none');
            document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', bubbles: true }));
            expect(getTooltip().style.display).toBe('none');
        });
    });

    // CHT-1213: generalized to a container/textarea id pair so the document
    // detail view can reuse this instead of it being issue-only (PR #174
    // scoped it to "issue detail view" specifically). Placed last in the file
    // since setupQuoteComment() calls here retarget the module's shared
    // "active textarea" default — later tests in this file would otherwise
    // see it pointed at #new-doc-comment instead of #new-comment.
    describe('setupQuoteComment with custom container/textarea ids', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="document-detail-content">
                    <div class="document-content">Some document body text</div>
                </div>
                <textarea id="new-doc-comment"></textarea>
            `;
        });

        it('attaches mouseup listener to the given container', () => {
            const container = document.getElementById('document-detail-content');
            const spy = vi.spyOn(container, 'addEventListener');

            setupQuoteComment({ containerId: 'document-detail-content', textareaId: 'new-doc-comment' });

            const mouseupCall = spy.mock.calls.find(([event]) => event === 'mouseup');
            expect(mouseupCall).toBeTruthy();
        });

        it('quoteSelectionIntoComment targets the configured textarea', () => {
            setupQuoteComment({ containerId: 'document-detail-content', textareaId: 'new-doc-comment' });

            const body = document.querySelector('.document-content');
            const range = document.createRange();
            range.setStart(body.firstChild, 0);
            range.setEnd(body.firstChild, 4);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            const result = quoteSelectionIntoComment();

            expect(result).toBe(true);
            expect(document.getElementById('new-doc-comment').value).toContain('> Some');
        });

        it('recognizes selections inside .document-content as quotable', () => {
            const body = document.querySelector('.document-content');
            const range = document.createRange();
            range.setStart(body.firstChild, 0);
            range.setEnd(body.firstChild, 4);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);

            expect(getQuotableSelection()).toBe('Some');
        });
    });
});
