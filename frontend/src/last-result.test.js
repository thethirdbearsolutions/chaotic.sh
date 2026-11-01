import { describe, it, expect, beforeEach } from 'vitest';
import { lastResult, rememberResult, resultKey, forgetResults, sameResult } from './last-result.js';
import { setCurrentTeam, setCurrentProject, setCurrentUser } from './state.js';

describe('last-result (CHT-1973)', () => {
    beforeEach(() => {
        forgetResults();
        setCurrentTeam({ id: 't1' });
        setCurrentProject('p1');
    });

    it('keys a result by team and project', () => {
        expect(resultKey()).toBe('t1|p1');
        rememberResult('board', resultKey(), [1]);
        expect(lastResult('board', 't1|p1')).toEqual([1]);
        expect(lastResult('board', 't1|p2')).toBeUndefined();
        expect(lastResult('sprints', 't1|p1')).toBeUndefined();
    });

    it('keeps one result per view', () => {
        rememberResult('board', 't1|p1', [1]);
        rememberResult('board', 't1|p2', [2]);
        expect(lastResult('board', 't1|p1')).toBeUndefined();
        expect(lastResult('board', 't1|p2')).toEqual([2]);
    });

    it('forgets everything on a team switch', () => {
        rememberResult('board', 't1|p1', [1]);
        setCurrentTeam({ id: 't2' });
        expect(lastResult('board', 't1|p1')).toBeUndefined();
    });

    it('forgets everything when the user changes (sign-out)', () => {
        setCurrentUser({ id: 'u1' });
        rememberResult('board', 't1|p1', [1]);
        setCurrentUser(null);
        expect(lastResult('board', 't1|p1')).toBeUndefined();
    });

    it('compares results by value', () => {
        expect(sameResult([{ a: 1 }], [{ a: 1 }])).toBe(true);
        expect(sameResult([{ a: 1 }], [{ a: 2 }])).toBe(false);
    });
});
