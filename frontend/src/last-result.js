/**
 * The last result each view showed, kept so a revisit paints it at once
 * and refreshes behind it (CHT-1973).
 *
 * Board, Sprints, Epics and Documents used to wipe to a skeleton on every
 * entry and stay blank for a round trip plus server time, the second visit
 * as well as the first. Each now remembers what it last rendered, keyed by
 * the team and project it was loaded for, and a load for the same key
 * renders that first. One entry per view: the point is a revisit, not an
 * offline copy. A team switch or sign-out forgets them all.
 */
import { getCurrentProject, getCurrentTeam, subscribe } from './state.js';

const results = new Map();

/** What a view's result depends on: the current team and project. */
export function resultKey() {
    return `${getCurrentTeam()?.id ?? ''}|${getCurrentProject() ?? ''}`;
}

/**
 * Remember `value` as what `view` shows for `key`.
 * @param {string} view
 * @param {string} key - from resultKey(), taken when the load started
 * @param {*} value
 */
export function rememberResult(view, key, value) {
    results.set(view, { key, value });
}

/**
 * What `view` last showed for `key`, or undefined.
 * @param {string} view
 * @param {string} key
 */
export function lastResult(view, key) {
    const entry = results.get(view);
    return entry && entry.key === key ? entry.value : undefined;
}

/**
 * Forget what each of `views` showed, unless it is the view on screen
 * (which refreshes itself). A change made while a view is closed (an
 * issue moved from its detail page, a document deleted) would otherwise
 * show its old state for a round trip on the next visit.
 * @param {string|null} openView - getCurrentView()
 * @param {...string} views
 */
export function forgetResultsUnlessOpen(openView, ...views) {
    for (const view of views) {
        if (view !== openView) results.delete(view);
    }
}

/** Forget every view's result. */
export function forgetResults() {
    results.clear();
}

/**
 * True when a fetched result is the one already painted, so the refresh
 * can skip a re-render (which would reset scroll-anchored state and the
 * keyboard cursor for nothing).
 */
export function sameResult(a, b) {
    if (a === b) return true;
    try {
        return JSON.stringify(a) === JSON.stringify(b);
    } catch {
        return false;
    }
}

subscribe((key, value, oldValue) => {
    if (key === 'currentTeam' && (value?.id ?? null) !== (oldValue?.id ?? null)) forgetResults();
    if (key === 'currentUser' && (value?.id ?? null) !== (oldValue?.id ?? null)) forgetResults();
});
