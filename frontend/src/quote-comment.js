/**
 * Quote-and-comment module (CHT-1173)
 *
 * Select text in an issue's description/comment or a document's body/comment,
 * then click the floating "Quote" tooltip (or press Cmd/Ctrl+Shift+.) to
 * insert the selected text as a markdown blockquote into the relevant
 * comment textarea. Originally scoped to issue detail only (PR #174);
 * generalized to take a container/textarea id pair so the document detail
 * view (CHT-1213) can reuse the same selection/tooltip logic instead of
 * silently no-oping there.
 */

let tooltipEl = null;
let documentListenersAttached = false;
let tooltipVisible = false;

// Which comment textarea a bare quoteSelectionIntoComment() call (the
// tooltip click, the keyboard shortcut) should target. Updated each time
// setupQuoteComment() runs for whichever detail view just mounted — only one
// detail view is visible at a time, so this always tracks the active one.
let activeTextareaId = 'new-comment';

/**
 * Create (or return cached) tooltip element.
 */
function getTooltip() {
    if (tooltipEl) return tooltipEl;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'quote-tooltip';
    tooltipEl.setAttribute('role', 'button');
    tooltipEl.setAttribute('tabindex', '0');
    tooltipEl.setAttribute('aria-label', 'Quote selection in comment');
    tooltipEl.textContent = 'Quote';
    // Keyboard activation (CHT-1175)
    tooltipEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            quoteSelectionIntoComment();
        }
    });
    tooltipEl.addEventListener('mousedown', (e) => {
        // Prevent mousedown from clearing the selection
        e.preventDefault();
        e.stopPropagation();
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
 * Show the tooltip near a given position (mouse coordinates).
 */
function showTooltip(x, y) {
    const tip = getTooltip();
    tip.style.display = 'flex';
    tooltipVisible = true;

    // Position above and slightly right of the cursor
    tip.style.left = `${x}px`;
    tip.style.top = `${y - 8}px`;
    tip.style.transform = 'translate(-50%, -100%)';

    // Ensure it stays in viewport
    requestAnimationFrame(() => {
        if (!tooltipVisible) return;
        const tipRect = tip.getBoundingClientRect();
        if (tipRect.left < 4) {
            tip.style.left = `${4 + tipRect.width / 2}px`;
        }
        if (tipRect.right > window.innerWidth - 4) {
            tip.style.left = `${window.innerWidth - 4 - tipRect.width / 2}px`;
        }
        if (tipRect.top < 4) {
            // Show below cursor instead
            tip.style.top = `${y + 8}px`;
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
    tooltipVisible = false;
}

/**
 * Check if a node is inside a quotable area (.description-content or
 * .comment-content on the issue side; .document-content — the document
 * body's markdown class, CHT-1213 — on the document side).
 * @returns {Element|null} the quotable area element, or null
 */
function isInQuotableArea(node) {
    if (!node) return null;
    const el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if (!el) return null;
    return el.closest('.description-content') || el.closest('.comment-content') || el.closest('.document-content') || null;
}

/**
 * Get the selected text if it's within a quotable area.
 * @returns {string|null}
 */
function getQuotableSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return null;

    const range = sel.getRangeAt(0);
    const startArea = isInQuotableArea(range.startContainer);
    const endArea = isInQuotableArea(range.endContainer);
    // Both ends must be in quotable areas, and in the same one
    if (!startArea || !endArea || startArea !== endArea) {
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
 * @param {string} [textareaId] - defaults to whichever detail view last
 *   called setupQuoteComment() (issue or document comment box, CHT-1213)
 * @returns {boolean} true if a quote was inserted
 */
export function quoteSelectionIntoComment(textareaId = activeTextareaId) {
    const text = getQuotableSelection();
    if (!text) return false;

    const textarea = document.getElementById(textareaId);
    if (!textarea) return false;

    const quote = formatAsBlockquote(text);
    const existing = textarea.value;
    const prefix = existing && !existing.endsWith('\n\n')
        ? (existing.endsWith('\n') ? '\n' : '\n\n')
        : '';
    textarea.value = existing + prefix + quote + '\n\n';

    // Trigger input event so whichever draft-persistence listener the caller
    // wired up on this textarea (issue comment or document comment) picks up
    // the new value — this function doesn't need to know which one it is.
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    // Clear selection and hide tooltip first
    window.getSelection().removeAllRanges();
    hideTooltip();

    // Then focus textarea so user can type immediately
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    if (textarea.scrollIntoView) {
        textarea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    return true;
}

/**
 * Show the tooltip anchored to the current selection's bounding rect.
 * Used for keyboard-made selections, where there are no mouse coordinates (CHT-1175).
 * @returns {boolean} true if the tooltip was shown
 */
function showTooltipAtSelection() {
    const text = getQuotableSelection();
    if (!text) return false;
    const range = window.getSelection().getRangeAt(0);
    // Range.getBoundingClientRect is missing in some environments (jsdom)
    const rect = range.getBoundingClientRect?.() ?? { left: 0, width: 0, top: 0 };
    showTooltip(rect.left + rect.width / 2, rect.top);
    return true;
}

/**
 * Handle mouseup to check for quotable selection and show tooltip.
 */
function handleMouseUp(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    // Small delay lets the selection finalize after mouseup
    setTimeout(() => {
        const text = getQuotableSelection();
        if (!text) {
            hideTooltip();
            return;
        }
        showTooltip(mouseX, mouseY);
    }, 10);
}

/**
 * Set up the quote-comment feature on a detail view.
 * Call after rendering the detail content.
 * @param {object} [options]
 * @param {string} [options.containerId='issue-detail-content'] - the
 *   detail-content container whose selections are quotable
 * @param {string} [options.textareaId='new-comment'] - the comment textarea
 *   a quote is inserted into (CHT-1213: 'new-doc-comment' for documents)
 * @param {AbortSignal} [options.signal] - signal to clean up the container listener
 */
export function setupQuoteComment({ containerId = 'issue-detail-content', textareaId = 'new-comment', signal } = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    activeTextareaId = textareaId;

    // Container-level mouseup — tied to the detail view lifecycle via signal
    container.addEventListener('mouseup', handleMouseUp, signal ? { signal } : undefined);

    // Document-level listeners only need to be attached once
    if (!documentListenersAttached) {
        documentListenersAttached = true;

        // Dismiss tooltip when clicking outside it (but not when clicking the tooltip itself)
        document.addEventListener('mousedown', (e) => {
            if (tooltipVisible && tooltipEl && !tooltipEl.contains(e.target)) {
                hideTooltip();
            }
        });

        // Dismiss tooltip when selection is cleared (e.g. by clicking elsewhere)
        // Use a delay to avoid racing with the mouseup handler
        document.addEventListener('selectionchange', () => {
            if (!tooltipVisible) return;
            setTimeout(() => {
                const sel = window.getSelection();
                if (!sel || sel.isCollapsed) {
                    hideTooltip();
                }
            }, 50);
        });

        // Dismiss on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && tooltipVisible) {
                hideTooltip();
            }
        });

        // Keyboard-made selections (Shift+Arrow, caret browsing) never fire
        // mouseup — show the tooltip at the selection on keyup too (CHT-1175)
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Escape') return; // don't undo the Escape dismissal
            showTooltipAtSelection();
        });
    }
}

// Exported for testing
export { getQuotableSelection, formatAsBlockquote, hideTooltip, isInQuotableArea, getTooltip };
