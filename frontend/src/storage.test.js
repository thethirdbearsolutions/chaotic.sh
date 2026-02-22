import { describe, it, expect, beforeEach } from 'vitest';
import {
    getToken, setToken,
    getTheme, setTheme,
    getSavedProject, setSavedProject,
    isOnboardingComplete, setOnboardingComplete, clearOnboarding,
    getIssueFilters, setIssueFilters,
    getCommentDraft, setCommentDraft,
    getDescriptionDraft, setDescriptionDraft,
    getCreateIssueDraft, setCreateIssueDraft, clearCreateIssueDraft,
    getDocViewMode, setDocViewMode,
    isApprovalsExplainerDismissed, dismissApprovalsExplainer,
} from './storage.js';

describe('storage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('token', () => {
        it('returns null when no token stored', () => {
            expect(getToken()).toBeNull();
        });

        it('stores and retrieves token', () => {
            setToken('abc123');
            expect(getToken()).toBe('abc123');
        });

        it('removes token when set to falsy', () => {
            setToken('abc123');
            setToken(null);
            expect(getToken()).toBeNull();
        });
    });

    describe('theme', () => {
        it('stores and retrieves theme', () => {
            setTheme('light');
            expect(getTheme()).toBe('light');
        });
    });

    describe('saved project', () => {
        it('stores and retrieves project ID', () => {
            setSavedProject('proj-1');
            expect(getSavedProject()).toBe('proj-1');
        });
    });

    describe('onboarding', () => {
        it('returns false when not complete', () => {
            expect(isOnboardingComplete()).toBe(false);
        });

        it('returns true after marking complete', () => {
            setOnboardingComplete();
            expect(isOnboardingComplete()).toBe(true);
        });

        it('clears onboarding state', () => {
            setOnboardingComplete();
            clearOnboarding();
            expect(isOnboardingComplete()).toBe(false);
        });
    });

    describe('issue filters', () => {
        it('returns null for no team', () => {
            expect(getIssueFilters(null)).toBeNull();
        });

        it('stores team-scoped filters', () => {
            setIssueFilters('team-1', 'status=open');
            expect(getIssueFilters('team-1')).toBe('status=open');
            expect(getIssueFilters('team-2')).toBeNull();
        });

        it('removes filters when empty', () => {
            setIssueFilters('team-1', 'status=open');
            setIssueFilters('team-1', '');
            expect(getIssueFilters('team-1')).toBeNull();
        });

        it('ignores set for no team', () => {
            setIssueFilters(null, 'status=open');
            // Should not throw
        });
    });

    describe('comment drafts', () => {
        it('stores and retrieves draft', () => {
            setCommentDraft('i1', 'my comment');
            expect(getCommentDraft('i1')).toBe('my comment');
        });

        it('removes draft when empty', () => {
            setCommentDraft('i1', 'my comment');
            setCommentDraft('i1', '');
            expect(getCommentDraft('i1')).toBeNull();
        });
    });

    describe('description drafts', () => {
        it('stores and retrieves draft', () => {
            setDescriptionDraft('i1', 'new desc');
            expect(getDescriptionDraft('i1')).toBe('new desc');
        });

        it('removes draft when null', () => {
            setDescriptionDraft('i1', 'new desc');
            setDescriptionDraft('i1', null);
            expect(getDescriptionDraft('i1')).toBeNull();
        });
    });

    describe('create issue drafts', () => {
        it('stores and retrieves title and description', () => {
            setCreateIssueDraft('My Title', 'My Description');
            const draft = getCreateIssueDraft();
            expect(draft.title).toBe('My Title');
            expect(draft.description).toBe('My Description');
        });

        it('clears drafts', () => {
            setCreateIssueDraft('Title', 'Desc');
            clearCreateIssueDraft();
            const draft = getCreateIssueDraft();
            expect(draft.title).toBeNull();
            expect(draft.description).toBeNull();
        });
    });

    describe('doc view mode', () => {
        it('stores and retrieves mode', () => {
            setDocViewMode('grid');
            expect(getDocViewMode()).toBe('grid');
        });
    });

    describe('approvals explainer', () => {
        it('returns false when not dismissed', () => {
            expect(isApprovalsExplainerDismissed()).toBe(false);
        });

        it('returns true after dismissing', () => {
            dismissApprovalsExplainer();
            expect(isApprovalsExplainerDismissed()).toBe(true);
        });
    });

    describe('error handling', () => {
        it('returns null when localStorage throws on get', () => {
            const original = localStorage.getItem;
            localStorage.getItem = () => { throw new Error('fail'); };
            expect(getToken()).toBeNull();
            localStorage.getItem = original;
        });

        it('does not throw when localStorage throws on set', () => {
            const original = localStorage.setItem;
            localStorage.setItem = () => { throw new Error('fail'); };
            expect(() => setToken('abc')).not.toThrow();
            localStorage.setItem = original;
        });
    });
});
