/**
 * Tests for state.js module (CHT-279)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    getState,
    setState,
    subscribe,
    resetState,
    getCurrentUser,
    setCurrentUser,
    getCurrentView,
    setCurrentView,
    getIssues,
    setIssues,
    getAssignees,
    setAssignees,
    getLabels,
    setLabels,
    getActiveFilterCategory,
    setActiveFilterCategory,
    getSelectedIssueIndex,
    setSelectedIssueIndex,
    getPendingGates,
    setPendingGates,
} from './state.js';

describe('state', () => {
    beforeEach(() => {
        resetState();
    });

    describe('getState', () => {
        it('returns entire state when no key provided', () => {
            const state = getState();
            expect(state).toHaveProperty('currentUser');
            expect(state).toHaveProperty('currentView');
            expect(state).toHaveProperty('issues');
        });

        it('returns specific value when key provided', () => {
            expect(getState('currentView')).toBe('my-issues');
            expect(getState('issues')).toEqual([]);
        });

        it('returns shallow copy of state', () => {
            const state1 = getState();
            const state2 = getState();
            expect(state1).not.toBe(state2);
        });
    });

    describe('setState', () => {
        it('sets single value with key and value', () => {
            setState('currentView', 'board');
            expect(getState('currentView')).toBe('board');
        });

        it('sets multiple values with object', () => {
            setState({
                currentView: 'board',
                currentUser: { id: 'user-1', name: 'Test' },
            });
            expect(getState('currentView')).toBe('board');
            expect(getState('currentUser')).toEqual({ id: 'user-1', name: 'Test' });
        });

        it('notifies subscribers on change', () => {
            const listener = vi.fn();
            subscribe(listener);

            setState('currentView', 'board');

            expect(listener).toHaveBeenCalledWith('currentView', 'board', 'my-issues');
        });

        it('does not notify if value unchanged', () => {
            const listener = vi.fn();
            subscribe(listener);

            setState('currentView', 'my-issues'); // Same as initial

            expect(listener).not.toHaveBeenCalled();
        });
    });

    describe('subscribe', () => {
        it('returns unsubscribe function', () => {
            const listener = vi.fn();
            const unsubscribe = subscribe(listener);

            setState('currentView', 'board');
            expect(listener).toHaveBeenCalledTimes(1);

            unsubscribe();

            setState('currentView', 'sprints');
            expect(listener).toHaveBeenCalledTimes(1); // Not called again
        });

        it('handles subscriber errors gracefully', () => {
            const errorListener = vi.fn(() => { throw new Error('Test error'); });
            const goodListener = vi.fn();

            subscribe(errorListener);
            subscribe(goodListener);

            // Should not throw, and good listener should still be called
            expect(() => setState('currentView', 'board')).not.toThrow();
            expect(goodListener).toHaveBeenCalled();
        });
    });

    describe('resetState', () => {
        it('resets state to initial values', () => {
            setState('currentView', 'board');
            setState('currentUser', { id: 'test' });

            resetState();

            expect(getState('currentView')).toBe('my-issues');
            expect(getState('currentUser')).toBeNull();
        });
    });

    describe('convenience getters/setters', () => {
        it('getCurrentUser/setCurrentUser', () => {
            expect(getCurrentUser()).toBeNull();
            setCurrentUser({ id: 'user-1', name: 'Test' });
            expect(getCurrentUser()).toEqual({ id: 'user-1', name: 'Test' });
        });

        it('getCurrentView/setCurrentView', () => {
            expect(getCurrentView()).toBe('my-issues');
            setCurrentView('board');
            expect(getCurrentView()).toBe('board');
        });

        it('getIssues/setIssues', () => {
            expect(getIssues()).toEqual([]);
            setIssues([{ id: 'issue-1' }]);
            expect(getIssues()).toEqual([{ id: 'issue-1' }]);
        });

        it('getAssignees/setAssignees', () => {
            expect(getAssignees()).toEqual([]);
            setAssignees([{ id: 'user-1' }]);
            expect(getAssignees()).toEqual([{ id: 'user-1' }]);
        });

        it('getLabels/setLabels', () => {
            expect(getLabels()).toEqual([]);
            setLabels([{ id: 'label-1' }]);
            expect(getLabels()).toEqual([{ id: 'label-1' }]);
        });

        it('getActiveFilterCategory/setActiveFilterCategory', () => {
            expect(getActiveFilterCategory()).toBe('status');
            setActiveFilterCategory('priority');
            expect(getActiveFilterCategory()).toBe('priority');
        });

        it('getSelectedIssueIndex/setSelectedIssueIndex', () => {
            expect(getSelectedIssueIndex()).toBe(-1);
            setSelectedIssueIndex(5);
            expect(getSelectedIssueIndex()).toBe(5);
        });

        it('getPendingGates/setPendingGates', () => {
            expect(getPendingGates()).toEqual([]);
            setPendingGates([{ id: 'gate-1' }]);
            expect(getPendingGates()).toEqual([{ id: 'gate-1' }]);
        });
    });
});
