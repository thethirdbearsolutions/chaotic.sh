/**
 * Issue store (CHT-1894): cached lists, shared rows, and the subscriber
 * that keeps the current list in step with the `issues` state.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { setIssues, setCurrentTeam, setState } from './state.js';
import {
    queryKey,
    readQuery,
    readQueryMeta,
    writeQuery,
    setQueryMeta,
    upsertIssue,
    removeIssue,
    dropQuery,
    setCurrentQueryKey,
    rememberView,
    queryForView,
    sameRows,
    clearIssueStore,
    deriveQuery,
    MAX_CACHED_QUERIES,
} from './issue-store.js';

const row = (id, extra = {}) => ({ id, updated_at: 't1', title: id, ...extra });

describe('issue-store', () => {
    beforeEach(() => {
        clearIssueStore();
        setState('currentView', 'issues');
        setIssues([]);
    });

    describe('queryKey', () => {
        it('ignores key order, array order and empty values', () => {
            expect(queryKey({ a: 1, status: ['todo', 'backlog'], search: '' }))
                .toBe(queryKey({ status: ['backlog', 'todo'], a: 1, label: [] }));
        });

        it('tells different queries apart', () => {
            expect(queryKey({ status: ['todo'] })).not.toBe(queryKey({ status: ['done'] }));
        });
    });

    it('reads back a written query in order, and nothing for an unknown one', () => {
        writeQuery('k', [row('b'), row('a')]);
        expect(readQuery('k').map(i => i.id)).toEqual(['b', 'a']);
        expect(readQuery('other')).toBeNull();
    });

    it('ignores a non-array result and leaves out optimistic rows', () => {
        writeQuery('k', undefined);
        expect(readQuery('k')).toBeNull();
        writeQuery('k', [row('a'), row('tmp', { _isOptimistic: true })]);
        expect(readQuery('k').map(i => i.id)).toEqual(['a']);
    });

    it('shares rows between queries, so one update reaches every list', () => {
        writeQuery('open', [row('a'), row('b')]);
        writeQuery('mine', [row('a')]);
        upsertIssue(row('a', { title: 'renamed', updated_at: 't2' }));
        expect(readQuery('open')[0].title).toBe('renamed');
        expect(readQuery('mine')[0].title).toBe('renamed');
    });

    it('does not start holding an issue from an update alone', () => {
        upsertIssue(row('stray'));
        writeQuery('k', []);
        expect(readQuery('k')).toEqual([]);
    });

    it('removes a deleted issue from every list', () => {
        writeQuery('open', [row('a'), row('b')]);
        writeQuery('mine', [row('a')]);
        removeIssue('a');
        expect(readQuery('open').map(i => i.id)).toEqual(['b']);
        expect(readQuery('mine')).toEqual([]);
    });

    // CHT-1894 review 6
    it('keeps a newer row when an older response arrives', () => {
        writeQuery('k', [row('a', { updated_at: '2026-01-02', title: 'new' })]);
        writeQuery('other', [row('a', { updated_at: '2026-01-01', title: 'old' })]);
        expect(readQuery('k')[0].title).toBe('new');
        upsertIssue(row('a', { updated_at: '2026-01-01', title: 'old' }));
        expect(readQuery('k')[0].title).toBe('new');
    });

    // CHT-1894 review 2
    it('keeps a search row\'s description when a compact copy of the same version arrives', () => {
        writeQuery('search', [row('a', { description: 'the body' })]);
        writeQuery('list', [row('a', { description: null })]);
        expect(readQuery('search')[0].description).toBe('the body');
        writeQuery('list', [row('a', { description: null, updated_at: 't2' })]);
        expect(readQuery('search')[0].description).toBeNull();
    });

    it('drops one query and the views that point at it', () => {
        writeQuery('k', [row('a')]);
        rememberView('view', 'k');
        dropQuery('k');
        expect(readQuery('k')).toBeNull();
        expect(queryForView('view')).toBeNull();
    });

    it('keeps meta across a rewrite unless given, and sets it alone', () => {
        writeQuery('k', [row('a')], { hiddenClosed: 3 });
        writeQuery('k', [row('a')]);
        expect(readQueryMeta('k')).toEqual({ hiddenClosed: 3 });
        setQueryMeta('k', { hiddenClosed: 0 });
        expect(readQueryMeta('k')).toEqual({ hiddenClosed: 0 });
        expect(readQueryMeta('none')).toEqual({});
    });

    it('evicts the least recently used query past the cap, and its rows', () => {
        writeQuery('first', [row('only-in-first')]);
        for (let n = 0; n < MAX_CACHED_QUERIES; n++) writeQuery(`q${n}`, [row(`r${n}`)]);
        expect(readQuery('first')).toBeNull();
        // a read counts as a use
        readQuery('q0');
        writeQuery('one-more', [row('x')]);
        expect(readQuery('q0')).not.toBeNull();
        expect(readQuery('q1')).toBeNull();
    });

    it('maps a view to its last query only while the query is cached', () => {
        writeQuery('k', [row('a')]);
        rememberView('view', 'k');
        expect(queryForView('view')).toBe('k');
        expect(queryForView('unknown')).toBeNull();
        clearIssueStore();
        expect(queryForView('view')).toBeNull();
    });

    // CHT-1910
    describe('deriveQuery', () => {
        const base = { scope: 'p', project_id: 'p', sort_by: 'created', order: 'desc', limit: 1000, fields: 'list' };
        const rows = [
            row('a', { status: 'todo', priority: 'high', assignee_id: 'u1', labels: [{ id: 'l1', name: 'Bug' }] }),
            row('b', { status: 'done', priority: 'low', assignee_id: null, labels: [] }),
            row('c', { status: 'todo', priority: 'low', assignee_id: 'u1', labels: [{ id: 'l2', name: 'ui' }] }),
        ];
        beforeEach(() => writeQuery(queryKey(base), rows));
        const ids = (r) => r && r.rows.map(i => i.id);

        it('filters the unfiltered list by status, priority, assignee and labels', () => {
            expect(ids(deriveQuery({ ...base, status: ['todo'] }))).toEqual(['a', 'c']);
            expect(ids(deriveQuery({ ...base, status: ['todo'], priority: ['low'] }))).toEqual(['c']);
            expect(ids(deriveQuery({ ...base, assignee_id: 'u1' }))).toEqual(['a', 'c']);
            expect(ids(deriveQuery({ ...base, label: ['bug'], label_match: 'any' }))).toEqual(['a']);
            expect(ids(deriveQuery({ ...base, exclude_label: ['BUG'] }))).toEqual(['b', 'c']);
        });

        it('narrows a filtered list only to a subset of its filter', () => {
            clearIssueStore();
            writeQuery(queryKey({ ...base, status: ['todo', 'backlog'] }), [rows[0], rows[2]]);
            expect(ids(deriveQuery({ ...base, status: ['todo'] }))).toEqual(['a', 'c']);
            expect(deriveQuery({ ...base, status: ['done'] })).toBeNull();
            expect(deriveQuery({ ...base })).toBeNull();
        });

        // PR #470 review I1, M2
        it('says whether the source was complete', () => {
            expect(deriveQuery({ ...base, status: ['todo'] }).complete).toBe(true);
            expect(deriveQuery({ ...base, status: ['backlog'] })).toEqual({ rows: [], complete: true });
            clearIssueStore();
            const capped = { ...base, limit: 2 };
            writeQuery(queryKey(capped), rows.slice(0, 2));
            expect(deriveQuery({ ...capped, status: ['todo'] })).toEqual({ rows: [rows[0]], complete: false });
        });

        // review M1
        it('reads unassigned and no_sprint as empty, and filters sprint and type', () => {
            expect(ids(deriveQuery({ ...base, assignee_id: 'unassigned' }))).toEqual(['b']);
            expect(ids(deriveQuery({ ...base, sprint_id: 'no_sprint' }))).toEqual(['a', 'b', 'c']);
            expect(ids(deriveQuery({ ...base, sprint_id: 's1' }))).toEqual([]);
            expect(ids(deriveQuery({ ...base, issue_type: 'bug' }))).toEqual([]);
        });

        // review I3
        it('leaves non-ASCII label names to the server', () => {
            expect(deriveQuery({ ...base, label: ['Über'], label_match: 'any' })).toBeNull();
            expect(deriveQuery({ ...base, exclude_label: ['Über'] })).toBeNull();
            expect(deriveQuery({ ...base, label: ['bug'] })).toBeNull(); // only "any of" is reproduced
        });

        it('filters the smallest covering source', () => {
            writeQuery(queryKey({ ...base, status: ['todo'] }), [rows[0]]); // stale on purpose: fewer rows
            expect(ids(deriveQuery({ ...base, status: ['todo'], priority: ['high'] }))).toEqual(['a']);
        });

        it('leaves searches, other sorts and other scopes to the server', () => {
            expect(deriveQuery({ ...base, search: 'x' })).toBeNull();
            expect(deriveQuery({ ...base, sort_by: 'priority' })).toBeNull();
            writeQuery(queryKey({ ...base, sort_by: 'random' }), rows);
            expect(deriveQuery({ ...base, sort_by: 'random', status: ['todo'] })).toBeNull();
            expect(deriveQuery({ ...base, scope: 'q', project_id: 'q' })).toBeNull();
        });

        it('honours label any-of and exclusions held by the source', () => {
            clearIssueStore();
            const labelled = { ...base, label: ['bug', 'ui'], label_match: 'any' };
            writeQuery(queryKey(labelled), [rows[0], rows[2]]);
            expect(ids(deriveQuery({ ...labelled, label: ['ui'] }))).toEqual(['c']);
            expect(deriveQuery({ ...labelled, label: ['docs'] })).toBeNull();
            clearIssueStore();
            writeQuery(queryKey({ ...base, exclude_label: ['bug'] }), [rows[1], rows[2]]);
            expect(deriveQuery({ ...base })).toBeNull();
            expect(ids(deriveQuery({ ...base, exclude_label: ['bug', 'ui'] }))).toEqual(['b']);
        });
    });

    describe('sameRows', () => {
        it('is true only for the same ids, order and versions', () => {
            expect(sameRows([row('a')], [row('a')])).toBe(true);
            expect(sameRows([row('a')], [row('a', { updated_at: 't2' })])).toBe(false);
            expect(sameRows([row('a'), row('b')], [row('b'), row('a')])).toBe(false);
            expect(sameRows([row('a')], [])).toBe(false);
            expect(sameRows(null, [])).toBe(false);
        });

        // CHT-1894 review 2 and 5: what a row shows beyond its version
        it('sees label, sprint and description changes', () => {
            const labelled = row('a', { labels: [{ id: 'l', name: 'bug', color: '#f00' }] });
            expect(sameRows([labelled], [{ ...labelled, labels: [{ id: 'l', name: 'defect', color: '#f00' }] }])).toBe(false);
            expect(sameRows([row('a')], [row('a', { sprint_id: 's' })])).toBe(false);
            expect(sameRows([row('a', { description: null })], [row('a', { description: 'x' })])).toBe(false);
        });
    });

    describe('subscriber', () => {
        it('writes edits to the issues state back under the current query', () => {
            writeQuery('k', [row('a'), row('b')]);
            setCurrentQueryKey('k');
            setIssues([row('a', { status: 'done' }), row('b')]);
            expect(readQuery('k')[0].status).toBe('done');
        });

        // CHT-1894 review 9
        it('leaves the store alone outside the Issues view', () => {
            writeQuery('k', [row('a')]);
            setCurrentQueryKey('k');
            setState('currentView', 'board');
            setIssues([row('b'), row('a')]);
            expect(readQuery('k').map(i => i.id)).toEqual(['a']);
        });

        it('leaves the store alone with no current query', () => {
            writeQuery('k', [row('a')]);
            setCurrentQueryKey(null);
            setIssues([row('z')]);
            expect(readQuery('k').map(i => i.id)).toEqual(['a']);
        });

        it('drops everything when the team changes, but not on the same team again', () => {
            setCurrentTeam({ id: 't-1' });
            writeQuery('k', [row('a')]);
            setCurrentTeam({ id: 't-1', name: 'renamed' });
            expect(readQuery('k')).not.toBeNull();
            setCurrentTeam({ id: 't-2' });
            expect(readQuery('k')).toBeNull();
        });
    });
});
