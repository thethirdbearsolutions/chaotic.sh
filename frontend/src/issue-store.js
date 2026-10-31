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

import { subscribe, getIssues, getCurrentView } from './state.js';

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

/** The latest row the store holds for an issue, or undefined. */
export function getStoredIssue(id) {
    return entities.get(id);
}

/** Extra values saved with a query (the hidden-closed count). */
export function readQueryMeta(key) {
    return queries.get(key)?.meta || {};
}

/**
 * Store a row, unless the store already has a newer copy (a superseded
 * response must not undo a /ws update). A compact row (no description,
 * CHT-1893) of the same version keeps the description a search row
 * brought, so a cached search still shows its snippets.
 */
function putEntity(issue) {
    const prev = entities.get(issue.id);
    if (prev?.updated_at && issue.updated_at && issue.updated_at < prev.updated_at) return;
    if (issue.description == null && prev?.description != null && prev.updated_at === issue.updated_at) {
        entities.set(issue.id, { ...issue, description: prev.description });
        return;
    }
    entities.set(issue.id, issue);
}

/** Save a query's result. `meta` keeps whatever it had unless given. */
export function writeQuery(key, issues, meta) {
    if (!Array.isArray(issues)) return;
    const rows = realRows(issues);
    rows.forEach(putEntity);
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
    if (issue?.id && entities.has(issue.id)) putEntity(issue);
}

/** Forget one query, e.g. after the server refused it (403/404). */
export function dropQuery(key) {
    queries.delete(key);
    views.forEach((k, viewKey) => { if (k === key) views.delete(viewKey); });
    if (currentKey === key) currentKey = null;
    pruneEntities();
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

// What a row shows beyond its own version: labels (a rename edits only
// the label), the sprint, and whether the description (the search
// snippet's source) is present.
function rowSignature(issue) {
    const labels = (issue.labels || []).map(l => `${l.id}:${l.name}:${l.color}`).join(',');
    return `${issue.id}|${issue.updated_at}|${issue.sprint_id ?? ''}|${labels}|${issue.description == null ? 0 : 1}`;
}

/**
 * Whether two row lists would render the same: same issues, same order,
 * nothing they show changed. Lets a background refresh skip a re-render
 * that would only reset hover and scroll.
 */
export function sameRows(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (rowSignature(a[i]) !== rowSignature(b[i])) return false;
    }
    return true;
}

// ========================================
// Derived rows (CHT-1910)
// ========================================

// Filters a cached query can be narrowed by on the client.
const ARRAY_FILTERS = ['status', 'priority'];
const SCALAR_FILTERS = ['assignee_id', 'sprint_id', 'issue_type'];
// Must match exactly: they change which rows come back, or their order,
// in ways the client can't reproduce.
const SAME = ['scope', 'project_id', 'sort_by', 'order', 'limit', 'label_match'];

const lower = (names) => (names || []).map(n => String(n).toLowerCase());

// Whether every row `target` asks for is among the rows `source` returned
// (given `source` was complete), so filtering `source` gives `target`.
function covers(source, target) {
    if (source.search || target.search) return false;
    if (SAME.some(k => (source[k] ?? null) !== (target[k] ?? null))) return false;
    for (const k of ARRAY_FILTERS) {
        if (source[k] === undefined) continue;
        if (target[k] === undefined || !target[k].every(v => source[k].includes(v))) return false;
    }
    for (const k of SCALAR_FILTERS) {
        if (source[k] !== undefined && source[k] !== target[k]) return false;
    }
    // label is "any of": a narrower set selects fewer rows.
    if (source.label !== undefined) {
        if (target.label === undefined) return false;
        const allowed = lower(source.label);
        if (!lower(target.label).every(n => allowed.includes(n))) return false;
    }
    // exclude_label: the target must exclude at least what the source did.
    if (source.exclude_label !== undefined) {
        const excluded = lower(target.exclude_label);
        if (!lower(source.exclude_label).every(n => excluded.includes(n))) return false;
    }
    return true;
}

function matches(issue, target) {
    for (const k of ARRAY_FILTERS) {
        if (target[k] !== undefined && !target[k].includes(issue[k])) return false;
    }
    for (const k of SCALAR_FILTERS) {
        if (target[k] !== undefined && (issue[k] ?? null) !== target[k]) return false;
    }
    const names = lower((issue.labels || []).map(l => l.name));
    if (target.label !== undefined && !lower(target.label).some(n => names.includes(n))) return false;
    if (target.exclude_label !== undefined && lower(target.exclude_label).some(n => names.includes(n))) return false;
    return true;
}

/**
 * Rows for a query the store has not loaded, filtered on the client from
 * a cached query that covers it (e.g. Open priorities from the unfiltered
 * list), in that query's order. Null when no cached query covers it, or
 * when the target is a search (matching is the server's). The caller
 * shows them while the real request runs and replaces them with its
 * answer (VISION.md: filtering shows something within 100 ms).
 */
export function deriveQuery(params) {
    const target = Object.fromEntries(JSON.parse(queryKey(params)));
    let best = null;
    queries.forEach((entry, key) => {
        if (best && entry.ids.length >= best.ids.length) return;
        let source;
        try { source = Object.fromEntries(JSON.parse(key)); } catch { return; }
        if (covers(source, target)) best = entry;
    });
    if (!best) return null;
    return best.ids.map(id => entities.get(id)).filter(issue => issue && matches(issue, target));
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
    // Outside the Issues view the issues state is not that query's list
    // any more (a /ws create is prepended whatever the view).
    if (getCurrentView() !== 'issues') return;
    const entry = queries.get(currentKey);
    writeQuery(currentKey, getIssues(), entry.meta);
});
