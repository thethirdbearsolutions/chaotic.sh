import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handleQuickCreate } from './quick-create.js';

// Mock dependencies
vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => [{ id: 'proj-1', key: 'TST', name: 'Test Project' }]),
    loadProjects: vi.fn(),
}));

vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getCurrentProject: vi.fn(() => ''),
}));

vi.mock('./issue-list.js', () => ({
    renderIssues: vi.fn(),
}));

vi.mock('./api.js', () => ({
    api: {
        createIssue: vi.fn(),
    },
}));

import { showToast } from './ui.js';
import { getProjects, loadProjects } from './projects.js';
import { getIssues, setIssues, getCurrentProject } from './state.js';
import { renderIssues } from './issue-list.js';
import { api } from './api.js';

describe('handleQuickCreate', () => {
    let input;

    beforeEach(() => {
        vi.clearAllMocks();
        getIssues.mockReturnValue([]);
        getCurrentProject.mockReturnValue('proj-1');

        document.body.innerHTML = `
            <input id="quick-create-input" value="New issue" placeholder="Quick create..." />
        `;
        input = document.getElementById('quick-create-input');

        // Reset api mock
        api.createIssue.mockResolvedValue({
            id: 'real-1',
            identifier: 'TST-1',
            title: 'New issue',
            status: 'backlog',
            priority: 'no_priority',
        });
    });

    it('ignores non-Enter keys', async () => {
        const event = { key: 'a', target: input };
        await handleQuickCreate(event);
        expect(setIssues).not.toHaveBeenCalled();
    });

    it('ignores empty title', async () => {
        input.value = '   ';
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(setIssues).not.toHaveBeenCalled();
    });

    it('shows error when no project selected', async () => {
        getCurrentProject.mockReturnValue('');
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(showToast).toHaveBeenCalledWith('Please select a project first', 'error');
        expect(setIssues).not.toHaveBeenCalled();
    });

    it('creates issue with optimistic UI', async () => {
        // Track state changes so getIssues returns the optimistic issue
        const currentIssues = [];
        setIssues.mockImplementation((issues) => {
            currentIssues.length = 0;
            currentIssues.push(...issues);
        });
        getIssues.mockImplementation(() => [...currentIssues]);

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);

        // Should have called setIssues twice: once optimistic, once with real data
        expect(setIssues).toHaveBeenCalledTimes(2);

        // First call: optimistic issue at front of list
        const firstCall = setIssues.mock.calls[0][0];
        expect(firstCall).toHaveLength(1);
        expect(firstCall[0].title).toBe('New issue');
        expect(firstCall[0].identifier).toBe('TST-?');
        expect(firstCall[0]._isOptimistic).toBe(true);
        expect(firstCall[0].id).toMatch(/^temp-/);

        // Second call: real issue replaces optimistic
        const secondCall = setIssues.mock.calls[1][0];
        expect(secondCall).toHaveLength(1);
        expect(secondCall[0].id).toBe('real-1');

        // API should have been called
        expect(api.createIssue).toHaveBeenCalledWith('proj-1', {
            title: 'New issue',
            status: 'backlog',
            priority: 'no_priority',
        });

        // Success toast
        expect(showToast).toHaveBeenCalledWith('Issue created!', 'success');

        // Input cleared and re-enabled
        expect(input.value).toBe('');
        expect(input.disabled).toBe(false);
    });

    it('renders issues twice (optimistic + real)', async () => {
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(renderIssues).toHaveBeenCalledTimes(2);
    });

    it('refreshes project list after creation', async () => {
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(loadProjects).toHaveBeenCalled();
    });

    it('removes optimistic issue on API error', async () => {
        api.createIssue.mockRejectedValue(new Error('Server error'));

        // Set up getIssues to return the optimistic issue after first setIssues
        const optimisticIssues = [];
        setIssues.mockImplementation((issues) => {
            optimisticIssues.length = 0;
            optimisticIssues.push(...issues);
        });
        getIssues.mockImplementation(() => [...optimisticIssues]);

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);

        // Last setIssues call should remove the temp issue
        const lastCall = setIssues.mock.calls[setIssues.mock.calls.length - 1][0];
        expect(lastCall).toHaveLength(0);

        // Error toast
        expect(showToast).toHaveBeenCalledWith('Failed to create issue: Server error', 'error');

        // Input should be re-enabled
        expect(input.disabled).toBe(false);
    });

    it('disables input during creation', async () => {
        let inputDisabledDuringCreate = false;
        api.createIssue.mockImplementation(() => {
            inputDisabledDuringCreate = input.disabled;
            return Promise.resolve({
                id: 'real-1', identifier: 'TST-1', title: 'New issue',
                status: 'backlog', priority: 'no_priority',
            });
        });

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(inputDisabledDuringCreate).toBe(true);
        expect(input.disabled).toBe(false);
    });

    it('uses project key from projects list for optimistic identifier', async () => {
        getProjects.mockReturnValue([{ id: 'proj-1', key: 'ABC', name: 'ABC Project' }]);

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);

        const firstCall = setIssues.mock.calls[0][0];
        expect(firstCall[0].identifier).toBe('ABC-?');
    });

    it('restores placeholder on success', async () => {
        expect(input.placeholder).toBe('Quick create...');

        let placeholderDuringCreate;
        api.createIssue.mockImplementation(() => {
            placeholderDuringCreate = input.placeholder;
            return Promise.resolve({
                id: 'real-1', identifier: 'TST-1', title: 'New issue',
                status: 'backlog', priority: 'no_priority',
            });
        });

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(placeholderDuringCreate).toBe('Creating...');
        expect(input.placeholder).toBe('Quick create...');
    });

    it('restores placeholder on error', async () => {
        api.createIssue.mockRejectedValue(new Error('fail'));
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(input.placeholder).toBe('Quick create...');
    });

    it('focuses input after creation', async () => {
        const focusSpy = vi.spyOn(input, 'focus');
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(focusSpy).toHaveBeenCalled();
    });

    it('focuses input after error', async () => {
        api.createIssue.mockRejectedValue(new Error('fail'));
        const focusSpy = vi.spyOn(input, 'focus');
        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);
        expect(focusSpy).toHaveBeenCalled();
    });

    it('falls back to NEW-? when project not found', async () => {
        getProjects.mockReturnValue([]);

        const event = { key: 'Enter', target: input };
        await handleQuickCreate(event);

        const firstCall = setIssues.mock.calls[0][0];
        expect(firstCall[0].identifier).toBe('NEW-?');
    });
});
