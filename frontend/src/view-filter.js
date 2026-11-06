/**
 * "Filter this screen" boxes (CHT-2096). A view that can filter its own
 * rows registers the input that does it; `/` focuses that input while
 * the view is showing, and falls back to issue search where there is
 * none.
 */

const filters = new Map();

/**
 * @param {string} view - the view name, as getCurrentView() reports it
 * @param {string} inputId - id of the view's filter input
 */
export function registerViewFilter(view, inputId) {
    filters.set(view, inputId);
}

/**
 * Focus the current view's filter box.
 * @returns {boolean} whether there was one to focus
 */
export function focusViewFilter(view) {
    const el = filters.has(view) && document.getElementById(filters.get(view));
    if (!el) return false;
    el.focus();
    el.select?.();
    return true;
}
