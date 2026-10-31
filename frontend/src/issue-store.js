/**
 * Issue store (CHT-1894, epic CHT-1890).
 *
 * Keeps the issue lists the Issues view has already loaded, so going back
 * to a view, or re-applying a filter, renders the rows it had at once while
 * a background request refreshes them. VISION.md: views, Back and filtering
 * show something within 100 ms from loaded data, and the screen is never
 * blanked to refetch.
 *
 * Two maps:
 * - `entities`: issue id -> the latest row seen for it. Every cached list
 *   reads its rows from here, so a /ws update to one issue reaches every
 *   cached list that holds it.
 * - `queries`: query key -> the ordered ids that query returned (plus the
 *   closed-match count shown above a search), least recently used first.
 *
 * Which rows a query holds can drift (a remote edit can move an issue out
 * of a status filter, a remote create belongs to lists we can't know); the
 * background refresh that follows every cached render corrects that. The
 * store only ever answers "what did this query show last time".
 *
 * The current query is kept in step with the `issues` state: every writer
 * of that state (inline edits, quick create, /ws handlers) edits the
 * Issues view's list, so the subscriber below writes it back under the
 * current key. The store is dropped when the team changes.
 */

import { subscribe, getIssues } from './state.js';

export const MAX_CACHED_QUERIES = 24;

const entities = new Map();
const queries = new Map();
// The view key (team, URL filters, search text) -> the query key last
// loaded for it, so a view can render its cached rows before the sprint
// and label filter options it needs to rebuild its query have loaded.
const views = new Map();
let currentKey = null;

function normalise(value) {
    if (Array.isArray(value)) return [...value].map(String).sort();
    return value;
}

/**
 * A stable key for a set of list params: keys sorted, array values sorted,
 * empty values dropped (they are not sent either).
 */
export function queryKey(params) {
    const entries = Object.entries(params || {})
        .filter(([, v]) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0))
        .map(([k, v]) => [k, normalise(v)])
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return JSON.stringify(entries);
}

function touch(key, entry) {
    queries.delete(key);
    queries.set(key, entry);
    while (queries.size > MAX_CACHED_QUERIES) {
        const oldest = queries.keys().next().value;
        queries.delete(oldest);
    }
    pruneEntities();
}

// Drop rows no cached query holds any more, so the store stays bounded by
// MAX_CACHED_QUERIES lists rather than growing with every row ever seen.
function pruneEntities() {
    if (entities.size === 0) return;
    const held = new Set();
    queries.forEach(entry => entry.ids.forEach(id => held.add(id)));
    entities.forEach((_, id) => { if (!held.has(id)) entities.delete(id); });
}

function realRows(issues) {
    return (issues || []).filter(i => i && i.id && !i._isOptimistic);
}

/**
 * Rows the store holds for `key`, in the order the query returned them,
 * or null when it has none. Reading counts as a use for eviction.
 */
export function readQuery(key) {
    const entry = queries.get(key);
    if (!entry) return null;
    touch(key, entry);
    return entry.ids.map(id => entities.get(id)).filter(Boolean);
}

/** Extra values saved with a query (the hidden-closed count). */
export function readQueryMeta(key) {
    return queries.get(key)?.meta || {};
}

/** Save a query's result. `meta` keeps whatever it had unless given. */
export function writeQuery(key, issues, meta) {
    if (!Array.isArray(issues)) return;
    const rows = realRows(issues);
    rows.forEach(issue => entities.set(issue.id, issue));
    const previous = queries.get(key);
    touch(key, { ids: rows.map(i => i.id), meta: meta ?? previous?.meta ?? {} });
}

/** Replace a cached query's extra values, leaving its rows alone. */
export function setQueryMeta(key, meta) {
    const entry = queries.get(key);
    if (entry) entry.meta = meta;
}

/** Record a newer copy of an issue for every cached list that holds it. */
export function upsertIssue(issue) {
    if (issue?.id && entities.has(issue.id)) entities.set(issue.id, issue);
}

/** Forget a deleted issue everywhere. */
export function removeIssue(id) {
    entities.delete(id);
    queries.forEach(entry => {
        if (entry.ids.includes(id)) entry.ids = entry.ids.filter(x => x !== id);
    });
}

/** The query whose rows the `issues` state holds right now. */
export function setCurrentQueryKey(key) {
    currentKey = key;
}

export function getCurrentQueryKey() {
    return currentKey;
}

export function rememberView(viewKey, key) {
    views.delete(viewKey);
    views.set(viewKey, key);
    while (views.size > MAX_CACHED_QUERIES) views.delete(views.keys().next().value);
}

/** The query key last loaded for a view, if the store still has its rows. */
export function queryForView(viewKey) {
    const key = views.get(viewKey);
    return key && queries.has(key) ? key : null;
}

/**
 * Whether two row lists would render the same: same issues, same order,
 * none changed since. Lets a background refresh skip a re-render that
 * would only reset hover and scroll.
 */
export function sameRows(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].id !== b[i].id || a[i].updated_at !== b[i].updated_at) return false;
    }
    return true;
}

export function clearIssueStore() {
    entities.clear();
    queries.clear();
    views.clear();
    currentKey = null;
}

subscribe((key, value, oldValue) => {
    if (key === 'currentTeam') {
        if ((value?.id ?? null) !== (oldValue?.id ?? null)) clearIssueStore();
        return;
    }
    if (key !== 'issues' || currentKey === null || !queries.has(currentKey)) return;
    const entry = queries.get(currentKey);
    writeQuery(currentKey, getIssues(), entry.meta);
});
