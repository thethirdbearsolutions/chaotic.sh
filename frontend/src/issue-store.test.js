/**
 * Issue store (CHT-1894): cached lists, shared rows, and the subscriber
 * that keeps the current list in step with the `issues` state.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { setIssues, setCurrentTeam } from './state.js';
import {
    queryKey,
    readQuery,
    readQueryMeta,
    writeQuery,
    setQueryMeta,
    upsertIssue,
    removeIssue,
    setCurrentQueryKey,
    rememberView,
    queryForView,
    sameRows,
    clearIssueStore,
    MAX_CACHED_QUERIES,
} from './issue-store.js';

const row = (id, extra = {}) => ({ id, updated_at: 't1', title: id, ...extra });

describe('issue-store', () => {
    beforeEach(() => {
        clearIssueStore();
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

    describe('sameRows', () => {
        it('is true only for the same ids, order and versions', () => {
            expect(sameRows([row('a')], [row('a')])).toBe(true);
            expect(sameRows([row('a')], [row('a', { updated_at: 't2' })])).toBe(false);
            expect(sameRows([row('a'), row('b')], [row('b'), row('a')])).toBe(false);
            expect(sameRows([row('a')], [])).toBe(false);
            expect(sameRows(null, [])).toBe(false);
        });
    });

    describe('subscriber', () => {
        it('writes edits to the issues state back under the current query', () => {
            writeQuery('k', [row('a'), row('b')]);
            setCurrentQueryKey('k');
            setIssues([row('a', { status: 'done' }), row('b')]);
            expect(readQuery('k')[0].status).toBe('done');
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
