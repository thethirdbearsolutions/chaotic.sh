import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./api.js', () => ({ api: { updateIssue: vi.fn() } }));
vi.mock('./ui.js', () => ({
    showModal: vi.fn(), closeModal: vi.fn(), showToast: vi.fn(), showApiError: vi.fn(),
}));
vi.mock('./issue-creation.js', () => ({ showCreateSubIssueModal: vi.fn() }));
vi.mock('./event-delegation.js', () => ({ registerActions: vi.fn() }));

import { handleCloseFollowups, closeParentFromPrompt } from './epic-prompt.js';
import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import { showCreateSubIssueModal } from './issue-creation.js';

const prompt = {
    id: 'epic-1', identifier: 'CHT-9', title: 'Goal <b>', issue_type: 'epic',
    message: 'That was the last open ticket under CHT-9 (Goal <b>). Close CHT-9, or add more?',
};

describe('handleCloseFollowups (CHT-1901, CHT-1884)', () => {
    const actions = registerActions.mock.calls[0][0];

    beforeEach(() => {
        document.body.innerHTML = '<div id="modal-title"></div><div id="modal-content"></div>';
        vi.clearAllMocks();
    });

    it('ignores ordinary responses', () => {
        expect(handleCloseFollowups(undefined)).toBe(false);
        expect(handleCloseFollowups({ id: 'x', parent_prompt: null, open_children: null })).toBe(false);
        expect(showModal).not.toHaveBeenCalled();
        expect(showToast).not.toHaveBeenCalled();
    });

    it('asks to close the parent or add more, escaping text', () => {
        expect(handleCloseFollowups({ id: 'x', project_id: 'p1', parent_prompt: prompt })).toBe(true);
        expect(showModal).toHaveBeenCalled();
        const html = document.getElementById('modal-content').innerHTML;
        expect(html).toContain('last open ticket under CHT-9');
        expect(html).not.toContain('<b>');
        expect(html).toContain('data-action="parent-prompt-close"');
        expect(html).toContain('data-project-id="p1"');
        expect(document.getElementById('modal-title').textContent).toBe('Close CHT-9?');
    });

    it('warns about open children', () => {
        handleCloseFollowups({ id: 'x', open_children: { count: 2, identifiers: [], message: 'still has 2 open' } });
        expect(showToast).toHaveBeenCalledWith('still has 2 open', 'warning');
    });

    it('closes the parent and chains to its own parent', async () => {
        api.updateIssue.mockResolvedValue({ id: 'epic-1', parent_prompt: { ...prompt, id: 'top', identifier: 'CHT-1' } });
        await closeParentFromPrompt('epic-1', 'CHT-9');
        expect(api.updateIssue).toHaveBeenCalledWith('epic-1', { status: 'done' });
        expect(closeModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Close CHT-1?');
    });

    it('reports a refused close', async () => {
        api.updateIssue.mockRejectedValue(new Error('arrears'));
        await closeParentFromPrompt('epic-1', 'CHT-9');
        expect(showApiError).toHaveBeenCalled();
    });

    it('registers the three actions', () => {
        actions['parent-prompt-add'](null, { parentId: 'epic-1', projectId: 'p1' });
        expect(showCreateSubIssueModal).toHaveBeenCalledWith('epic-1', 'p1');
        actions['parent-prompt-dismiss']();
        expect(closeModal).toHaveBeenCalled();
    });
});
