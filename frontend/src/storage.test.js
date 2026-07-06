import { describe, it, expect, beforeEach } from 'vitest';
import {
    getToken, setToken,
    getTheme, setTheme,
    getSavedProject, setSavedProject,
    isOnboardingComplete, setOnboardingComplete, clearOnboarding,
    getIssueFilters, setIssueFilters,
    getCommentDraft, setCommentDraft,
    getDescriptionDraft, setDescriptionDraft, getDescriptionDraftBase,
    getCreateIssueDraft, setCreateIssueDraft, clearCreateIssueDraft,
    getDocumentDraft, getDocumentDraftBase, setDocumentDraft,
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

        // CHT-1214: draft/basedOn snapshot pair, so a restored draft can be
        // compared against the current server description for staleness.
        describe('basedOn snapshot (CHT-1214)', () => {
            it('stores and retrieves the basedOn snapshot alongside the draft', () => {
                setDescriptionDraft('i1', 'new desc', 'original desc');
                expect(getDescriptionDraft('i1')).toBe('new desc');
                expect(getDescriptionDraftBase('i1')).toBe('original desc');
            });

            it('defaults basedOn to empty string when omitted', () => {
                setDescriptionDraft('i1', 'new desc');
                expect(getDescriptionDraftBase('i1')).toBe('');
            });

            it('returns null basedOn when there is no draft', () => {
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('treats a legacy plain-string draft as having no known base', () => {
                localStorage.setItem('chaotic_description_draft_i1', 'legacy plain draft');
                expect(getDescriptionDraft('i1')).toBe('legacy plain draft');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            // PR #209 review finding 5: legacy drafts whose full text happens
            // to parse as JSON must not be dropped — only the exact
            // {draft: string} object payload is the new format.
            it('preserves a legacy draft that is a JSON number', () => {
                localStorage.setItem('chaotic_description_draft_i1', '123');
                expect(getDescriptionDraft('i1')).toBe('123');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('preserves a legacy draft that is a JSON boolean', () => {
                localStorage.setItem('chaotic_description_draft_i1', 'true');
                expect(getDescriptionDraft('i1')).toBe('true');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('preserves a legacy draft that is a JSON-quoted string', () => {
                localStorage.setItem('chaotic_description_draft_i1', '"quoted text"');
                expect(getDescriptionDraft('i1')).toBe('"quoted text"');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('preserves a legacy draft that is a pasted JSON object of the wrong shape', () => {
                localStorage.setItem('chaotic_description_draft_i1', '{"config": {"port": 8080}}');
                expect(getDescriptionDraft('i1')).toBe('{"config": {"port": 8080}}');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('preserves a legacy draft that is a pasted JSON array', () => {
                localStorage.setItem('chaotic_description_draft_i1', '[1, 2, 3]');
                expect(getDescriptionDraft('i1')).toBe('[1, 2, 3]');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('still recognizes a new-format payload whose basedOn is missing', () => {
                localStorage.setItem('chaotic_description_draft_i1', JSON.stringify({ draft: 'text only' }));
                expect(getDescriptionDraft('i1')).toBe('text only');
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });

            it('clears both draft and snapshot together', () => {
                setDescriptionDraft('i1', 'new desc', 'original desc');
                setDescriptionDraft('i1', null);
                expect(getDescriptionDraft('i1')).toBeNull();
                expect(getDescriptionDraftBase('i1')).toBeNull();
            });
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

    describe('document drafts (CHT-1213)', () => {
        it('stores and retrieves a draft', () => {
            setDocumentDraft('new', { title: 'T', content: 'C', icon: '📄' });
            expect(getDocumentDraft('new')).toEqual({ title: 'T', content: 'C', icon: '📄' });
        });

        it('is keyed independently per id', () => {
            setDocumentDraft('new', { title: 'Create draft' });
            setDocumentDraft('doc-1', { title: 'Edit draft' });
            expect(getDocumentDraft('new')).toEqual({ title: 'Create draft' });
            expect(getDocumentDraft('doc-1')).toEqual({ title: 'Edit draft' });
        });

        it('removes the draft when set to null', () => {
            setDocumentDraft('new', { title: 'T' });
            setDocumentDraft('new', null);
            expect(getDocumentDraft('new')).toBeNull();
        });

        it('removes the draft when all fields are empty', () => {
            setDocumentDraft('new', { title: '', content: '', icon: '' });
            expect(getDocumentDraft('new')).toBeNull();
        });

        it('returns null when nothing stored', () => {
            expect(getDocumentDraft('missing')).toBeNull();
        });

        it('returns null for malformed JSON rather than throwing', () => {
            localStorage.setItem('chaotic_document_draft_new', 'not json{');
            expect(getDocumentDraft('new')).toBeNull();
        });

        it('returns null for valid JSON that is not the {draft, basedOn} shape', () => {
            localStorage.setItem('chaotic_document_draft_new', '"just a string"');
            expect(getDocumentDraft('new')).toBeNull();
            localStorage.setItem('chaotic_document_draft_new', '{"title": "old bare shape"}');
            expect(getDocumentDraft('new')).toBeNull();
        });

        // PR #210 review finding 1: `{draft, basedOn}` shape per storage.js's
        // DRAFT POLICY, so the edit modal can detect staleness before prefilling.
        describe('basedOn snapshot', () => {
            it('stores and retrieves the basedOn snapshot alongside the draft', () => {
                const base = { title: 'Server T', content: 'Server C', icon: '' };
                setDocumentDraft('doc-1', { title: 'T', content: 'C', icon: '' }, base);
                expect(getDocumentDraft('doc-1')).toEqual({ title: 'T', content: 'C', icon: '' });
                expect(getDocumentDraftBase('doc-1')).toEqual(base);
            });

            it('defaults basedOn to null when omitted (create-modal drafts)', () => {
                setDocumentDraft('new', { title: 'T' });
                expect(getDocumentDraftBase('new')).toBeNull();
            });

            it('returns null basedOn when there is no draft', () => {
                expect(getDocumentDraftBase('doc-1')).toBeNull();
            });

            it('clears both draft and snapshot together', () => {
                setDocumentDraft('doc-1', { title: 'T' }, { title: 'S', content: '', icon: '' });
                setDocumentDraft('doc-1', null);
                expect(getDocumentDraft('doc-1')).toBeNull();
                expect(getDocumentDraftBase('doc-1')).toBeNull();
            });
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

        it('does not throw when localStorage throws on remove', () => {
            const original = localStorage.removeItem;
            localStorage.removeItem = () => { throw new Error('fail'); };
            expect(() => setToken(null)).not.toThrow();
            localStorage.removeItem = original;
        });
    });
});
