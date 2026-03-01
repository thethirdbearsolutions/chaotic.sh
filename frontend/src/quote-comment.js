/**
 * Quote-and-comment module (CHT-1173)
 *
 * Select text in an issue's description or a comment, then click the
 * floating "Quote" tooltip (or press Cmd/Ctrl+Shift+C) to insert the
 * selected text as a markdown blockquote into the comment textarea.
 */

import { setCommentDraft } from './storage.js';
import { getCurrentDetailIssue } from './state.js';

let tooltipEl = null;
let documentListenersAttached = false;

/**
 * Create (or return cached) tooltip element.
 */
function getTooltip() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'quote-tooltip';
    tooltipEl.setAttribute('role', 'button');
    tooltipEl.innerHTML = '<span class="quote-tooltip-icon">\u201C</span> Quote';
    tooltipEl.addEventListener('mousedown', (e) => {
        // Prevent mousedown from clearing the selection
        e.preventDefault();
    });
    tooltipEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        quoteSelectionIntoComment();
    });
    document.body.appendChild(tooltipEl);
    return tooltipEl;
}

/**
 * Show the tooltip near the current selection.
 */
function showTooltip(rect) {
    const tip = getTooltip();
    tip.style.display = 'flex';

    // Position above the selection end, centered horizontally
    const x = rect.right;
    const y = rect.top - 6;

    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    tip.style.transform = 'translate(-50%, -100%)';

    // Ensure it stays in viewport
    requestAnimationFrame(() => {
        const tipRect = tip.getBoundingClientRect();
        if (tipRect.left < 4) {
            tip.style.left = `${4 + tipRect.width / 2}px`;
        }
        if (tipRect.top < 4) {
            // Show below selection instead
            tip.style.top = `${rect.bottom + 6}px`;
            tip.style.transform = 'translate(-50%, 0)';
        }
    });
}

/**
 * Hide the tooltip.
 */
function hideTooltip() {
    if (tooltipEl) {
        tooltipEl.style.display = 'none';
    }
}

/**
 * Check if a node is inside a quotable area (.description-content or .comment-content).
 */
function isInQuotableArea(node) {
    const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    return el && (el.closest('.description-content') || el.closest('.comment-content'));
}

/**
 * Get the selected text if it's within a quotable area.
 * @returns {string|null}
 */
function getQuotableSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;

    const range = sel.getRangeAt(0);
    if (!isInQuotableArea(range.startContainer) || !isInQuotableArea(range.endContainer)) {
        return null;
    }

    const text = sel.toString().trim();
    return text || null;
}

/**
 * Format text as a markdown blockquote.
 */
function formatAsBlockquote(text) {
    return text.split('\n').map(line => `> ${line}`).join('\n');
}

/**
 * Insert the current selection as a blockquote into the comment textarea.
 * @returns {boolean} true if a quote was inserted
 */
export function quoteSelectionIntoComment() {
    const text = getQuotableSelection();
    if (!text) return false;

    const textarea = document.getElementById('new-comment');
    if (!textarea) return false;

    const quote = formatAsBlockquote(text);
    const existing = textarea.value;
    const prefix = existing && !existing.endsWith('\n\n')
        ? (existing.endsWith('\n') ? '\n' : '\n\n')
        : '';
    textarea.value = existing + prefix + quote + '\n\n';

    // Persist draft
    const issue = getCurrentDetailIssue();
    if (issue) {
        setCommentDraft(issue.id, textarea.value);
    }

    // Trigger input event for any other listeners
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    // Focus and scroll
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    if (textarea.scrollIntoView) {
        textarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Clear selection and hide tooltip
    window.getSelection().removeAllRanges();
    hideTooltip();

    return true;
}

/**
 * Set up the quote-comment feature on the issue detail view.
 * Call after rendering the issue detail content.
 */
export function setupQuoteComment() {
    const container = document.getElementById('issue-detail-content');
    if (!container) return;

    // Container listeners are fine to re-attach (container element is replaced on each viewIssue)
    container.addEventListener('mouseup', () => {
        // Small delay lets the selection finalize
        setTimeout(() => {
            const text = getQuotableSelection();
            if (!text) {
                hideTooltip();
                return;
            }
            const sel = window.getSelection();
            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            showTooltip(rect);
        }, 10);
    });
    container.addEventListener('scroll', () => hideTooltip(), { passive: true });

    // Document-level listeners only need to be attached once
    if (!documentListenersAttached) {
        documentListenersAttached = true;

        document.addEventListener('mousedown', (e) => {
            if (tooltipEl && !tooltipEl.contains(e.target)) {
                hideTooltip();
            }
        });

        document.addEventListener('selectionchange', () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed) {
                hideTooltip();
            }
        });
    }
}

// Exported for testing
export { getQuotableSelection, formatAsBlockquote, hideTooltip, isInQuotableArea };
