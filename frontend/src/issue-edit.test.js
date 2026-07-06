/**
 * Tests for issue-edit.js module (CHT-1035)
 *
 * No test file previously existed for this module. Coverage added here
 * alongside CHT-1214 (which adds description-draft persistence to the
 * "Edit all fields" modal), plus the pre-existing showEditIssueModal /
 * handleUpdateIssue / deleteIssue behavior it wasn't touching.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getIssue: vi.fn(),
        getSprints: vi.fn().mockResolvedValue([]),
        updateIssue: vi.fn().mockResolvedValue({}),
        deleteIssue: vi.fn().mockResolvedValue({}),
    },
}));

vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
    showApiError: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((text) => text || ''),
    escapeAttr: vi.fn((text) => text || ''),
}));

vi.mock('./projects.js', () => ({
    getEstimateOptions: vi.fn(() => [
        { value: null, label: 'None' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
    ]),
    loadProjects: vi.fn().mockResolvedValue(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn().mockResolvedValue(),
}));

vi.mock('./router.js', () => ({
    navigateTo: vi.fn(),
}));

vi.mock('./issues-view.js', () => ({
    loadIssues: vi.fn().mockResolvedValue(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { loadProjects } from './projects.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { loadIssues } from './issues-view.js';
import { registerActions } from './event-delegation.js';
import { getDescriptionDraft, setDescriptionDraft } from './storage.js';
import { showEditIssueModal, handleUpdateIssue, deleteIssue } from './issue-edit.js';

const issueEditActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

const mockIssue = {
    id: 'issue-1',
    title: 'Test Issue',
    description: 'Original description',
    status: 'todo',
    priority: 'medium',
    issue_type: 'task',
    estimate: null,
    sprint_id: null,
    project_id: 'project-1',
};

describe('issue-edit', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        api.getIssue.mockResolvedValue({ ...mockIssue });
        api.getSprints.mockResolvedValue([]);
        api.updateIssue.mockResolvedValue({});
        api.deleteIssue.mockResolvedValue({});
        loadProjects.mockResolvedValue();
        loadIssues.mockResolvedValue();
        viewIssue.mockResolvedValue();
        global.confirm = vi.fn(() => true);

        document.body.innerHTML = `
            <div id="modal-title"></div>
            <div id="modal-content"></div>
        `;
    });

    describe('showEditIssueModal', () => {
        it('renders the form populated from the fetched issue', async () => {
            await showEditIssueModal('issue-1');

            expect(api.getIssue).toHaveBeenCalledWith('issue-1');
            expect(document.getElementById('modal-title').textContent).toBe('Edit Issue');
            expect(document.getElementById('edit-issue-title').value).toBe('Test Issue');
            expect(document.getElementById('edit-issue-description').value).toBe('Original description');
            expect(showModal).toHaveBeenCalled();
        });

        it('shows an error toast on API failure', async () => {
            api.getIssue.mockRejectedValue(new Error('boom'));

            await showEditIssueModal('issue-1');

            expect(showApiError).toHaveBeenCalledWith('load issue', expect.any(Error));
        });

        // CHT-1214: this modal's description field had none of the inline
        // editor's protections — no draft persistence at all, so an
        // accidental modal close (no dirty-check gate exists here) silently
        // discarded any typed changes. Restore policy per the DRAFT POLICY
        // block in storage.js: prefill only a fresh (basedOn-matching)
        // draft, never silently; stale/legacy drafts warn and stay unloaded
        // (PR #209 review finding 1).
        describe('description draft persistence (CHT-1214)', () => {
            it('loads server description when there is no draft', async () => {
                await showEditIssueModal('issue-1');

                expect(document.getElementById('edit-issue-description').value).toBe('Original description');
                expect(document.getElementById('edit-issue-description-draft-warning').classList.contains('hidden')).toBe(true);
            });

            it('restores a fresh draft (basedOn matches server) with a visible notice', async () => {
                setDescriptionDraft('issue-1', 'unsaved draft text', 'Original description');

                await showEditIssueModal('issue-1');

                expect(document.getElementById('edit-issue-description').value).toBe('unsaved draft text');
                const warnEl = document.getElementById('edit-issue-description-draft-warning');
                expect(warnEl.classList.contains('hidden')).toBe(false);
                expect(warnEl.textContent).toContain('Restored');
                setDescriptionDraft('issue-1', null);
            });

            it('does NOT prefill a stale draft (basedOn mismatch) — warns and keeps the server description', async () => {
                setDescriptionDraft('issue-1', 'week-old forgotten draft', 'Some older description');

                await showEditIssueModal('issue-1');

                expect(document.getElementById('edit-issue-description').value).toBe('Original description');
                const warnEl = document.getElementById('edit-issue-description-draft-warning');
                expect(warnEl.classList.contains('hidden')).toBe(false);
                expect(warnEl.textContent).toContain('older version');
                // The stored draft is preserved, not consumed
                expect(getDescriptionDraft('issue-1')).toBe('week-old forgotten draft');
                setDescriptionDraft('issue-1', null);
            });

            it('does NOT prefill a legacy draft with no recorded snapshot — warns and keeps the server description', async () => {
                localStorage.setItem('chaotic_description_draft_issue-1', 'legacy plain draft');

                await showEditIssueModal('issue-1');

                expect(document.getElementById('edit-issue-description').value).toBe('Original description');
                expect(document.getElementById('edit-issue-description-draft-warning').classList.contains('hidden')).toBe(false);
                localStorage.removeItem('chaotic_description_draft_issue-1');
            });

            // The concrete failure the reviewer described: user opens the
            // modal to fix the title, glances past the description, saves —
            // a stale draft must not ride along.
            it('a stale draft is NOT committed by an unrelated field edit', async () => {
                setDescriptionDraft('issue-1', 'week-old forgotten draft', 'Some older description');

                await showEditIssueModal('issue-1');
                document.getElementById('edit-issue-title').value = 'Just fixing the title';
                await handleUpdateIssue({}, 'issue-1');

                expect(api.updateIssue).toHaveBeenCalledWith('issue-1', expect.objectContaining({
                    title: 'Just fixing the title',
                    description: 'Original description',
                }));
                // And the un-loaded draft survives the save, still reviewable
                expect(getDescriptionDraft('issue-1')).toBe('week-old forgotten draft');
                setDescriptionDraft('issue-1', null);
            });

            it('persists a draft as the user types, reusing the inline editor\'s storage key', async () => {
                await showEditIssueModal('issue-1');

                const descEl = document.getElementById('edit-issue-description');
                descEl.value = 'typed in the modal';
                descEl.dispatchEvent(new Event('input'));

                expect(getDescriptionDraft('issue-1')).toBe('typed in the modal');
                setDescriptionDraft('issue-1', null);
            });

            it('clears the draft once the textarea matches the original description again', async () => {
                await showEditIssueModal('issue-1');

                const descEl = document.getElementById('edit-issue-description');
                descEl.value = 'typed then undone';
                descEl.dispatchEvent(new Event('input'));
                descEl.value = 'Original description';
                descEl.dispatchEvent(new Event('input'));

                expect(getDescriptionDraft('issue-1')).toBeNull();
            });

            it('a draft typed here is visible from the inline editor\'s own draft getter (shared key)', async () => {
                await showEditIssueModal('issue-1');

                const descEl = document.getElementById('edit-issue-description');
                descEl.value = 'cross-surface draft';
                descEl.dispatchEvent(new Event('input'));

                // Same storage.js helpers the inline editor (issue-detail-view.js)
                // uses — this is the "so at minimum text survives" behavior,
                // not a bespoke parallel draft store.
                expect(getDescriptionDraft('issue-1')).toBe('cross-surface draft');
                setDescriptionDraft('issue-1', null);
            });
        });
    });

    describe('handleUpdateIssue', () => {
        beforeEach(async () => {
            await showEditIssueModal('issue-1');
        });

        it('submits the form fields to api.updateIssue', async () => {
            document.getElementById('edit-issue-title').value = 'New Title';
            document.getElementById('edit-issue-description').value = 'New description';
            document.getElementById('edit-issue-status').value = 'in_progress';
            document.getElementById('edit-issue-priority').value = 'high';
            document.getElementById('edit-issue-type').value = 'bug';
            document.getElementById('edit-issue-estimate').value = '2';

            await handleUpdateIssue({}, 'issue-1');

            expect(api.updateIssue).toHaveBeenCalledWith('issue-1', {
                title: 'New Title',
                description: 'New description',
                status: 'in_progress',
                priority: 'high',
                issue_type: 'bug',
                estimate: 2,
                sprint_id: null,
            });
        });

        it('closes the modal, refreshes the issue, and shows a toast on success', async () => {
            await handleUpdateIssue({}, 'issue-1');

            expect(closeModal).toHaveBeenCalled();
            expect(viewIssue).toHaveBeenCalledWith('issue-1');
            expect(showToast).toHaveBeenCalledWith('Issue updated!', 'success');
        });

        it('clears the description draft on successful update (CHT-1214)', async () => {
            const descEl = document.getElementById('edit-issue-description');
            descEl.value = 'edited';
            descEl.dispatchEvent(new Event('input'));
            expect(getDescriptionDraft('issue-1')).toBe('edited');

            await handleUpdateIssue({}, 'issue-1');

            expect(getDescriptionDraft('issue-1')).toBeNull();
        });

        it('shows an error toast and leaves the draft intact on failure', async () => {
            const descEl = document.getElementById('edit-issue-description');
            descEl.value = 'edited';
            descEl.dispatchEvent(new Event('input'));
            api.updateIssue.mockRejectedValue(new Error('server error'));

            await handleUpdateIssue({}, 'issue-1');

            expect(showApiError).toHaveBeenCalledWith('update issue', expect.any(Error));
            expect(closeModal).not.toHaveBeenCalled();
            expect(getDescriptionDraft('issue-1')).toBe('edited');
            setDescriptionDraft('issue-1', null);
        });
    });

    describe('deleteIssue', () => {
        it('does nothing when the user declines the confirm', async () => {
            global.confirm = vi.fn(() => false);

            await deleteIssue('issue-1');

            expect(api.deleteIssue).not.toHaveBeenCalled();
        });

        it('deletes, reloads issues/projects, navigates, and toasts on confirm', async () => {
            await deleteIssue('issue-1');

            expect(global.confirm).toHaveBeenCalledWith('Are you sure you want to delete this issue?');
            expect(api.deleteIssue).toHaveBeenCalledWith('issue-1');
            expect(loadIssues).toHaveBeenCalled();
            expect(loadProjects).toHaveBeenCalled();
            expect(navigateTo).toHaveBeenCalledWith('issues');
            expect(showToast).toHaveBeenCalledWith('Issue deleted!', 'success');
        });

        it('shows an error toast on API failure', async () => {
            api.deleteIssue.mockRejectedValue(new Error('boom'));

            await deleteIssue('issue-1');

            expect(showApiError).toHaveBeenCalledWith('delete issue', expect.any(Error));
        });
    });

    describe('event delegation', () => {
        it('registers update-issue, which delegates to handleUpdateIssue', async () => {
            await showEditIssueModal('issue-1');
            document.getElementById('edit-issue-title').value = 'Delegated Title';

            await issueEditActions['update-issue']({}, { issueId: 'issue-1' });

            expect(api.updateIssue).toHaveBeenCalledWith('issue-1', expect.objectContaining({ title: 'Delegated Title' }));
        });
    });
});
