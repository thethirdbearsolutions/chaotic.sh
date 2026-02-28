import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock all dependencies before imports
vi.mock('./inline-dropdown.js', () => ({
    getCreateIssueLabelIds: vi.fn(() => []),
    setCreateIssueLabelIds: vi.fn(),
    updateCreateIssueLabelsLabel: vi.fn(),
    renderCreateIssueLabelDropdown: vi.fn(),
}));

vi.mock('./storage.js', () => ({
    getCreateIssueDraft: vi.fn(() => ({ title: '', description: '' })),
    setCreateIssueDraft: vi.fn(),
    clearCreateIssueDraft: vi.fn(),
}));

vi.mock('./api.js', () => ({
    api: {
        createIssue: vi.fn(),
        getLabels: vi.fn(),
        getSprints: vi.fn(),
    },
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => [
        { id: 'proj-1', key: 'TST', name: 'Test Project' },
        { id: 'proj-2', key: 'OTH', name: 'Other Project' },
    ]),
    getEstimateOptions: vi.fn(() => [
        { value: null, label: 'No estimate' },
        { value: 1, label: '1 point' },
        { value: 2, label: '2 points' },
    ]),
}));

vi.mock('./state.js', () => ({
    getCurrentView: vi.fn(() => 'issues'),
    getLabels: vi.fn(() => []),
    setLabels: vi.fn(),
    getCurrentTeam: vi.fn(() => ({ id: 'team-1', name: 'Team' })),
    getCurrentProject: vi.fn(() => 'proj-1'),
}));

vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
    showApiError: vi.fn(),
    closeAllDropdowns: vi.fn(),
    registerDropdownClickOutside: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

vi.mock('./issues-view.js', () => ({
    loadIssues: vi.fn(),
}));

vi.mock('./dashboard.js', () => ({
    loadMyIssues: vi.fn(),
}));

vi.mock('./issue-list.js', () => ({
    getStatusIcon: vi.fn((s) => `<span class="status-icon">${s}</span>`),
    getPriorityIcon: vi.fn((p) => `<span class="priority-icon">${p}</span>`),
}));

vi.mock('./utils.js', () => ({
    formatStatus: vi.fn((s) => s),
    formatPriority: vi.fn((p) => p),
    formatIssueType: vi.fn((t) => t),
    renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
    escapeHtml: vi.fn((s) => s),
    escapeAttr: vi.fn((s) => s),
}));

vi.mock('./assignees.js', () => ({
    formatAssigneeName: vi.fn((a) => a.name),
    formatAssigneeOptionLabel: vi.fn((a) => a.name),
    getAssigneeOptionList: vi.fn(() => []),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./constants.js', () => ({
    BOARD_STATUSES: ['backlog', 'todo', 'in_progress', 'done', 'cancelled'],
    PRIORITY_OPTIONS: ['no_priority', 'low', 'medium', 'high', 'urgent'],
}));

import {
    showCreateIssueModal,
    showCreateSubIssueModal,
    handleCreateSubIssue,
    toggleCreateIssueDropdown,
    updateCreateIssueProject,
    setCreateIssueField,
    handleCreateIssueNew,
    handleCreateIssueAndNew,
    toggleCreateIssueOptions,
    applyIssueTemplate,
} from './issue-creation.js';

import { getCreateIssueLabelIds, setCreateIssueLabelIds, updateCreateIssueLabelsLabel, renderCreateIssueLabelDropdown } from './inline-dropdown.js';
import { getCreateIssueDraft, setCreateIssueDraft, clearCreateIssueDraft } from './storage.js';
import { api } from './api.js';
import { getCurrentView, getLabels, setLabels, getCurrentTeam, getCurrentProject } from './state.js';
import { showModal, closeModal, showToast, showApiError, closeAllDropdowns, registerDropdownClickOutside } from './ui.js';
import { viewIssue } from './issue-detail-view.js';
import { loadIssues } from './issues-view.js';
import { loadMyIssues } from './dashboard.js';
import { getAssigneeOptionList } from './assignees.js';

function setupModalDOM() {
    document.body.innerHTML = `
        <div id="modal-title"></div>
        <div id="modal-content"></div>
    `;
}

describe('issue-creation', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        setupModalDOM();
        getCurrentProject.mockReturnValue('proj-1');
        getCurrentView.mockReturnValue('issues');
        getCurrentTeam.mockReturnValue({ id: 'team-1', name: 'Team' });
        getCreateIssueDraft.mockReturnValue({ title: '', description: '' });
        getCreateIssueLabelIds.mockReturnValue([]);
        getLabels.mockReturnValue([]);
        api.createIssue.mockResolvedValue({
            id: 'issue-1',
            identifier: 'TST-1',
            title: 'Test Issue',
        });
    });

    describe('showCreateIssueModal', () => {
        it('renders modal with project selector', () => {
            showCreateIssueModal();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('create-issue-project');
            expect(content).toContain('Test Project');
            expect(content).toContain('Other Project');
        });

        it('preselects given project ID', () => {
            showCreateIssueModal('proj-2');
            const select = document.getElementById('create-issue-project');
            expect(select.value).toBe('proj-2');
        });

        it('falls back to getCurrentProject when no preselected ID', () => {
            getCurrentProject.mockReturnValue('proj-2');
            showCreateIssueModal();
            const select = document.getElementById('create-issue-project');
            expect(select.value).toBe('proj-2');
        });

        it('renders title and description inputs', () => {
            showCreateIssueModal();
            expect(document.getElementById('create-issue-title')).toBeTruthy();
            expect(document.getElementById('create-issue-description')).toBeTruthy();
        });

        it('renders hidden fields with defaults', () => {
            showCreateIssueModal();
            expect(document.getElementById('create-issue-status').value).toBe('backlog');
            expect(document.getElementById('create-issue-priority').value).toBe('no_priority');
            expect(document.getElementById('create-issue-type').value).toBe('task');
            expect(document.getElementById('create-issue-assignee').value).toBe('');
            expect(document.getElementById('create-issue-estimate').value).toBe('');
            expect(document.getElementById('create-issue-sprint').value).toBe('');
        });

        it('calls showModal', () => {
            showCreateIssueModal();
            expect(showModal).toHaveBeenCalled();
        });

        it('resets label IDs', () => {
            showCreateIssueModal();
            expect(setCreateIssueLabelIds).toHaveBeenCalledWith([]);
        });

        it('updates labels label', () => {
            showCreateIssueModal();
            expect(updateCreateIssueLabelsLabel).toHaveBeenCalled();
        });

        it('restores draft title and description', () => {
            getCreateIssueDraft.mockReturnValue({ title: 'Draft Title', description: 'Draft Desc' });
            showCreateIssueModal();
            expect(document.getElementById('create-issue-title').value).toBe('Draft Title');
            expect(document.getElementById('create-issue-description').value).toBe('Draft Desc');
        });

        it('does not overwrite inputs with empty draft', () => {
            getCreateIssueDraft.mockReturnValue({ title: '', description: '' });
            showCreateIssueModal();
            expect(document.getElementById('create-issue-title').value).toBe('');
            expect(document.getElementById('create-issue-description').value).toBe('');
        });

        it('saves draft on title input', () => {
            showCreateIssueModal();
            const titleInput = document.getElementById('create-issue-title');
            titleInput.value = 'New Title';
            titleInput.dispatchEvent(new Event('input'));
            expect(setCreateIssueDraft).toHaveBeenCalledWith('New Title', '');
        });

        it('saves draft on description input', () => {
            showCreateIssueModal();
            const descInput = document.getElementById('create-issue-description');
            descInput.value = 'New Desc';
            descInput.dispatchEvent(new Event('input'));
            expect(setCreateIssueDraft).toHaveBeenCalledWith('', 'New Desc');
        });

        it('renders toolbar buttons for all field types', () => {
            showCreateIssueModal();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('data-dropdown-type="status"');
            expect(content).toContain('data-dropdown-type="priority"');
            expect(content).toContain('data-dropdown-type="type"');
            expect(content).toContain('data-dropdown-type="labels"');
            expect(content).toContain('data-dropdown-type="assignee"');
            expect(content).toContain('data-dropdown-type="estimate"');
            expect(content).toContain('data-dropdown-type="sprint"');
        });

        it('renders Create and Create & New buttons', () => {
            showCreateIssueModal();
            expect(document.getElementById('btn-create-issue')).toBeTruthy();
            expect(document.getElementById('btn-create-and-new')).toBeTruthy();
        });

        it('renders template selector in more options', () => {
            showCreateIssueModal();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('create-issue-template');
            expect(content).toContain('No template');
            expect(content).toContain('Bug report');
            expect(content).toContain('Feature request');
            expect(content).toContain('Task');
        });

        it('renders due date input in more options', () => {
            showCreateIssueModal();
            expect(document.getElementById('create-issue-due-date')).toBeTruthy();
        });
    });

    describe('showCreateSubIssueModal', () => {
        it('renders modal with project name', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('Test Project');
            expect(content).toContain('New sub-issue');
        });

        it('shows fallback when project not found', () => {
            showCreateSubIssueModal('parent-1', 'unknown-proj');
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('Project');
        });

        it('renders submit button with parent and project data attributes', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            const btn = document.querySelector('[data-action="create-sub-issue-submit"]');
            expect(btn.dataset.parentId).toBe('parent-1');
            expect(btn.dataset.projectId).toBe('proj-1');
        });

        it('calls showModal', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            expect(showModal).toHaveBeenCalled();
        });

        it('resets label IDs', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            expect(setCreateIssueLabelIds).toHaveBeenCalledWith([]);
        });

        it('renders hidden fields with defaults', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            expect(document.getElementById('create-issue-status').value).toBe('backlog');
            expect(document.getElementById('create-issue-priority').value).toBe('no_priority');
            expect(document.getElementById('create-issue-type').value).toBe('task');
        });

        it('does not render sprint or due date (sub-issue specific)', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            expect(document.getElementById('create-issue-sprint')).toBeNull();
            expect(document.getElementById('create-issue-due-date')).toBeNull();
        });

        it('does not render project selector', () => {
            showCreateSubIssueModal('parent-1', 'proj-1');
            expect(document.getElementById('create-issue-project')).toBeNull();
        });
    });

    describe('handleCreateSubIssue', () => {
        beforeEach(() => {
            showCreateSubIssueModal('parent-1', 'proj-1');
        });

        it('shows error when title is empty', async () => {
            document.getElementById('create-issue-title').value = '';
            await handleCreateSubIssue('parent-1', 'proj-1');
            expect(showToast).toHaveBeenCalledWith('Please enter a title', 'error');
            expect(api.createIssue).not.toHaveBeenCalled();
        });

        it('shows error when title is whitespace-only', async () => {
            document.getElementById('create-issue-title').value = '   ';
            await handleCreateSubIssue('parent-1', 'proj-1');
            expect(showToast).toHaveBeenCalledWith('Please enter a title', 'error');
        });

        it('creates sub-issue with correct API payload', async () => {
            document.getElementById('create-issue-title').value = 'Sub Issue';
            document.getElementById('create-issue-description').value = 'Sub desc';
            document.getElementById('create-issue-status').value = 'todo';
            document.getElementById('create-issue-priority').value = 'high';
            document.getElementById('create-issue-type').value = 'bug';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1', {
                title: 'Sub Issue',
                description: 'Sub desc',
                status: 'todo',
                priority: 'high',
                issue_type: 'bug',
                assignee_id: null,
                estimate: null,
                label_ids: [],
                parent_id: 'parent-1',
            });
        });

        it('passes label IDs from inline dropdown', async () => {
            getCreateIssueLabelIds.mockReturnValue(['label-1', 'label-2']);
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ label_ids: ['label-1', 'label-2'] })
            );
        });

        it('parses estimate as integer', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-estimate').value = '3';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ estimate: 3 })
            );
        });

        it('sends null estimate when empty', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-estimate').value = '';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ estimate: null })
            );
        });

        it('closes modal and shows success toast on success', async () => {
            api.createIssue.mockResolvedValue({ identifier: 'TST-5' });
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(closeModal).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('Created sub-issue TST-5', 'success');
        });

        it('navigates to parent issue on success', async () => {
            api.createIssue.mockResolvedValue({ identifier: 'TST-5' });
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(viewIssue).toHaveBeenCalledWith('parent-1');
        });

        it('shows API error on failure', async () => {
            api.createIssue.mockRejectedValue(new Error('Server error'));
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(showApiError).toHaveBeenCalledWith('create sub-issue', expect.objectContaining({ message: 'Server error' }));
            expect(closeModal).not.toHaveBeenCalled();
        });

        it('defaults issue_type to task when empty', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-type').value = '';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ issue_type: 'task' })
            );
        });

        it('sends assignee_id when set', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-assignee').value = 'user-42';

            await handleCreateSubIssue('parent-1', 'proj-1');

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ assignee_id: 'user-42' })
            );
        });
    });

    describe('handleCreateIssueNew (submitCreateIssue keepOpen=false)', () => {
        beforeEach(() => {
            showCreateIssueModal('proj-1');
        });

        it('shows error when no project selected', async () => {
            document.getElementById('create-issue-project').value = '';
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(showToast).toHaveBeenCalledWith('Please select a project', 'error');
            expect(api.createIssue).not.toHaveBeenCalled();
        });

        it('shows error when title is empty', async () => {
            document.getElementById('create-issue-title').value = '';

            await handleCreateIssueNew();

            expect(showToast).toHaveBeenCalledWith('Please enter a title', 'error');
            expect(api.createIssue).not.toHaveBeenCalled();
        });

        it('creates issue with full payload', async () => {
            document.getElementById('create-issue-title').value = 'My Issue';
            document.getElementById('create-issue-description').value = 'Description here';
            document.getElementById('create-issue-status').value = 'todo';
            document.getElementById('create-issue-priority').value = 'high';
            document.getElementById('create-issue-type').value = 'feature';
            document.getElementById('create-issue-assignee').value = 'user-1';
            document.getElementById('create-issue-estimate').value = '5';
            document.getElementById('create-issue-sprint').value = 'sprint-1';
            document.getElementById('create-issue-due-date').value = '2026-03-15';
            getCreateIssueLabelIds.mockReturnValue(['label-1']);

            await handleCreateIssueNew();

            expect(api.createIssue).toHaveBeenCalledWith('proj-1', {
                title: 'My Issue',
                description: 'Description here',
                status: 'todo',
                priority: 'high',
                issue_type: 'feature',
                assignee_id: 'user-1',
                estimate: 5,
                sprint_id: 'sprint-1',
                label_ids: ['label-1'],
                due_date: '2026-03-15T00:00:00.000Z',
            });
        });

        it('sends null for empty optional fields', async () => {
            document.getElementById('create-issue-title').value = 'Minimal';

            await handleCreateIssueNew();

            expect(api.createIssue).toHaveBeenCalledWith('proj-1', expect.objectContaining({
                description: null,
                assignee_id: null,
                estimate: null,
                sprint_id: null,
                due_date: null,
            }));
        });

        it('closes modal and navigates to issue on success', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(closeModal).toHaveBeenCalled();
            expect(viewIssue).toHaveBeenCalledWith('issue-1');
        });

        it('clears draft on success', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(clearCreateIssueDraft).toHaveBeenCalled();
        });

        it('shows success toast with identifier', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(showToast).toHaveBeenCalledWith('Created TST-1', 'success');
        });

        it('reloads issues when on issues view', async () => {
            getCurrentView.mockReturnValue('issues');
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(loadIssues).toHaveBeenCalled();
            expect(loadMyIssues).not.toHaveBeenCalled();
        });

        it('reloads dashboard when on my-issues view', async () => {
            getCurrentView.mockReturnValue('my-issues');
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(loadMyIssues).toHaveBeenCalled();
            expect(loadIssues).not.toHaveBeenCalled();
        });

        it('does not reload list when on other views', async () => {
            getCurrentView.mockReturnValue('board');
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(loadIssues).not.toHaveBeenCalled();
            expect(loadMyIssues).not.toHaveBeenCalled();
        });

        it('disables buttons during submission', async () => {
            let createDisabled, createAndNewDisabled;
            api.createIssue.mockImplementation(() => {
                createDisabled = document.getElementById('btn-create-issue').disabled;
                createAndNewDisabled = document.getElementById('btn-create-and-new').disabled;
                return Promise.resolve({ id: 'issue-1', identifier: 'TST-1' });
            });
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(createDisabled).toBe(true);
            expect(createAndNewDisabled).toBe(true);
        });

        it('re-enables buttons after success', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(document.getElementById('btn-create-issue').disabled).toBe(false);
            expect(document.getElementById('btn-create-and-new').disabled).toBe(false);
        });

        it('re-enables buttons after error', async () => {
            api.createIssue.mockRejectedValue(new Error('fail'));
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(document.getElementById('btn-create-issue').disabled).toBe(false);
            expect(document.getElementById('btn-create-and-new').disabled).toBe(false);
        });

        it('shows API error on failure', async () => {
            api.createIssue.mockRejectedValue(new Error('Network error'));
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(showApiError).toHaveBeenCalledWith('create issue', expect.objectContaining({ message: 'Network error' }));
            expect(closeModal).not.toHaveBeenCalled();
            expect(viewIssue).not.toHaveBeenCalled();
        });

        it('does not clear draft on error', async () => {
            api.createIssue.mockRejectedValue(new Error('fail'));
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueNew();

            expect(clearCreateIssueDraft).not.toHaveBeenCalled();
        });

        it('defaults issue_type to task when empty', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-type').value = '';

            await handleCreateIssueNew();

            expect(api.createIssue).toHaveBeenCalledWith('proj-1',
                expect.objectContaining({ issue_type: 'task' })
            );
        });
    });

    describe('handleCreateIssueAndNew (submitCreateIssue keepOpen=true)', () => {
        beforeEach(() => {
            showCreateIssueModal('proj-1');
        });

        it('clears title and description but keeps modal open', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-description').value = 'Desc';

            await handleCreateIssueAndNew();

            expect(closeModal).not.toHaveBeenCalled();
            expect(viewIssue).not.toHaveBeenCalled();
            expect(document.getElementById('create-issue-title').value).toBe('');
            expect(document.getElementById('create-issue-description').value).toBe('');
        });

        it('focuses title input after creation', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            const focusSpy = vi.spyOn(document.getElementById('create-issue-title'), 'focus');

            await handleCreateIssueAndNew();

            expect(focusSpy).toHaveBeenCalled();
        });

        it('shows success toast', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueAndNew();

            expect(showToast).toHaveBeenCalledWith('Created TST-1', 'success');
        });

        it('clears draft on success', async () => {
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueAndNew();

            expect(clearCreateIssueDraft).toHaveBeenCalled();
        });

        it('still validates project and title', async () => {
            document.getElementById('create-issue-project').value = '';
            document.getElementById('create-issue-title').value = 'Test';

            await handleCreateIssueAndNew();

            expect(showToast).toHaveBeenCalledWith('Please select a project', 'error');
        });

        it('preserves field selections (status, priority, etc.) after Create & New', async () => {
            document.getElementById('create-issue-title').value = 'Test';
            document.getElementById('create-issue-status').value = 'todo';
            document.getElementById('create-issue-priority').value = 'high';
            document.getElementById('create-issue-type').value = 'bug';

            await handleCreateIssueAndNew();

            expect(document.getElementById('create-issue-status').value).toBe('todo');
            expect(document.getElementById('create-issue-priority').value).toBe('high');
            expect(document.getElementById('create-issue-type').value).toBe('bug');
        });
    });

    describe('toggleCreateIssueOptions', () => {
        it('toggles collapsed class on options panel', () => {
            showCreateIssueModal();
            const panel = document.getElementById('create-issue-options-panel');
            const toggle = document.getElementById('more-options-toggle');
            expect(panel.classList.contains('collapsed')).toBe(true);
            expect(toggle.classList.contains('expanded')).toBe(false);

            toggleCreateIssueOptions();

            expect(panel.classList.contains('collapsed')).toBe(false);
            expect(toggle.classList.contains('expanded')).toBe(true);
        });

        it('toggles back to collapsed', () => {
            showCreateIssueModal();
            toggleCreateIssueOptions();
            toggleCreateIssueOptions();

            const panel = document.getElementById('create-issue-options-panel');
            expect(panel.classList.contains('collapsed')).toBe(true);
        });

        it('does not throw when elements missing', () => {
            document.body.innerHTML = '';
            expect(() => toggleCreateIssueOptions()).not.toThrow();
        });
    });

    describe('applyIssueTemplate', () => {
        beforeEach(() => {
            showCreateIssueModal();
        });

        it('applies bug report template', () => {
            applyIssueTemplate('bug');
            expect(document.getElementById('create-issue-title').value).toBe('Bug: ');
            expect(document.getElementById('create-issue-description').value).toContain('## Steps to Reproduce');
        });

        it('applies feature request template', () => {
            applyIssueTemplate('feature');
            expect(document.getElementById('create-issue-title').value).toBe('Feature: ');
            expect(document.getElementById('create-issue-description').value).toContain('## Proposed Solution');
        });

        it('applies task template', () => {
            applyIssueTemplate('task');
            expect(document.getElementById('create-issue-title').value).toBe('Task: ');
            expect(document.getElementById('create-issue-description').value).toContain('## Goal');
        });

        it('clears fields with "none" template', () => {
            document.getElementById('create-issue-title').value = 'Existing';
            applyIssueTemplate('none');
            expect(document.getElementById('create-issue-title').value).toBe('');
            expect(document.getElementById('create-issue-description').value).toBe('');
        });

        it('does nothing for unknown template', () => {
            document.getElementById('create-issue-title').value = 'Existing';
            applyIssueTemplate('unknown');
            expect(document.getElementById('create-issue-title').value).toBe('Existing');
        });
    });

    describe('setCreateIssueField', () => {
        beforeEach(() => {
            showCreateIssueModal();
        });

        it('updates hidden input and label for status', () => {
            setCreateIssueField('status', 'todo', 'Todo');
            expect(document.getElementById('create-issue-status').value).toBe('todo');
            expect(document.getElementById('create-issue-status-label').textContent).toBe('Todo');
        });

        it('updates hidden input and label for priority', () => {
            setCreateIssueField('priority', 'high', 'High');
            expect(document.getElementById('create-issue-priority').value).toBe('high');
            expect(document.getElementById('create-issue-priority-label').textContent).toBe('High');
        });

        it('updates type button with badge', () => {
            setCreateIssueField('type', 'bug', 'Bug');
            const btn = document.getElementById('create-issue-type-btn');
            expect(btn.innerHTML).toContain('type-bug');
            expect(document.getElementById('create-issue-type').value).toBe('bug');
        });

        it('updates assignee field', () => {
            setCreateIssueField('assignee', 'user-1', 'Alice');
            expect(document.getElementById('create-issue-assignee').value).toBe('user-1');
            expect(document.getElementById('create-issue-assignee-label').textContent).toBe('Alice');
        });

        it('updates estimate field', () => {
            setCreateIssueField('estimate', '3', '3 points');
            expect(document.getElementById('create-issue-estimate').value).toBe('3');
            expect(document.getElementById('create-issue-estimate-label').textContent).toBe('3 points');
        });

        it('updates sprint field', () => {
            setCreateIssueField('sprint', 'sprint-1', 'Sprint 79');
            expect(document.getElementById('create-issue-sprint').value).toBe('sprint-1');
            expect(document.getElementById('create-issue-sprint-label').textContent).toBe('Sprint 79');
        });

        it('closes all dropdowns after setting field', () => {
            setCreateIssueField('status', 'done', 'Done');
            expect(closeAllDropdowns).toHaveBeenCalled();
        });
    });

    describe('updateCreateIssueProject', () => {
        it('resets sprint value and label', () => {
            showCreateIssueModal();
            document.getElementById('create-issue-sprint').value = 'sprint-1';
            document.getElementById('create-issue-sprint-label').textContent = 'Sprint 1';

            updateCreateIssueProject();

            expect(document.getElementById('create-issue-sprint').value).toBe('');
            expect(document.getElementById('create-issue-sprint-label').textContent).toBe('Sprint');
        });

        it('does not throw when elements missing', () => {
            document.body.innerHTML = '';
            expect(() => updateCreateIssueProject()).not.toThrow();
        });
    });

    describe('toggleCreateIssueDropdown', () => {
        beforeEach(() => {
            showCreateIssueModal();
        });

        it('closes all existing dropdowns first', async () => {
            const btn = document.querySelector('[data-dropdown-type="status"]');
            await toggleCreateIssueDropdown('status', { currentTarget: btn });
            expect(closeAllDropdowns).toHaveBeenCalled();
        });

        it('creates status dropdown with all statuses', async () => {
            const btn = document.querySelector('[data-dropdown-type="status"]');
            await toggleCreateIssueDropdown('status', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown).toBeTruthy();
            expect(dropdown.innerHTML).toContain('Status');
            expect(dropdown.querySelectorAll('[data-field="status"]').length).toBe(5);
        });

        it('marks current status as selected', async () => {
            document.getElementById('create-issue-status').value = 'todo';
            const btn = document.querySelector('[data-dropdown-type="status"]');
            await toggleCreateIssueDropdown('status', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            const selectedOpt = dropdown.querySelector('[data-value="todo"]');
            expect(selectedOpt.classList.contains('selected')).toBe(true);
        });

        it('creates priority dropdown', async () => {
            const btn = document.querySelector('[data-dropdown-type="priority"]');
            await toggleCreateIssueDropdown('priority', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Priority');
            expect(dropdown.querySelectorAll('[data-field="priority"]').length).toBe(5);
        });

        it('creates type dropdown with all issue types', async () => {
            const btn = document.querySelector('[data-dropdown-type="type"]');
            await toggleCreateIssueDropdown('type', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Type');
            expect(dropdown.querySelectorAll('[data-field="type"]').length).toBe(7);
        });

        it('creates assignee dropdown with unassigned option', async () => {
            const btn = document.querySelector('[data-dropdown-type="assignee"]');
            await toggleCreateIssueDropdown('assignee', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Assignee');
            expect(dropdown.innerHTML).toContain('Unassigned');
        });

        it('creates assignee dropdown with team members', async () => {
            getAssigneeOptionList.mockReturnValue([
                { assignee: { id: 'user-1', name: 'Alice' }, indent: 0 },
                { assignee: { id: 'user-2', name: 'Bob' }, indent: 0 },
            ]);
            const btn = document.querySelector('[data-dropdown-type="assignee"]');
            await toggleCreateIssueDropdown('assignee', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.querySelectorAll('[data-field="assignee"]').length).toBe(3); // 2 members + unassigned
        });

        it('shows empty message when no assignees available', async () => {
            getAssigneeOptionList.mockReturnValue([]);
            const btn = document.querySelector('[data-dropdown-type="assignee"]');
            await toggleCreateIssueDropdown('assignee', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('No team members or agents found');
        });

        it('creates estimate dropdown from project options', async () => {
            const btn = document.querySelector('[data-dropdown-type="estimate"]');
            await toggleCreateIssueDropdown('estimate', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Estimate');
            expect(dropdown.querySelectorAll('[data-field="estimate"]').length).toBe(3);
        });

        it('creates sprint dropdown after loading sprints', async () => {
            api.getSprints.mockResolvedValue([
                { id: 'sprint-1', name: 'Sprint 79', status: 'active' },
                { id: 'sprint-2', name: 'Sprint 80', status: 'planned' },
                { id: 'sprint-3', name: 'Sprint 78', status: 'completed' },
            ]);
            const btn = document.querySelector('[data-dropdown-type="sprint"]');
            await toggleCreateIssueDropdown('sprint', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Sprint');
            expect(dropdown.innerHTML).toContain('No Sprint');
            expect(dropdown.innerHTML).toContain('Sprint 79');
            expect(dropdown.innerHTML).toContain('(Active)');
            expect(dropdown.innerHTML).toContain('Sprint 80');
            // Completed sprint should be filtered out
            expect(dropdown.innerHTML).not.toContain('Sprint 78');
        });

        it('shows "Select a project first" for sprint when no project', async () => {
            document.getElementById('create-issue-project').value = '';
            const btn = document.querySelector('[data-dropdown-type="sprint"]');
            await toggleCreateIssueDropdown('sprint', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Select a project first');
        });

        it('shows error message when sprint load fails', async () => {
            api.getSprints.mockRejectedValue(new Error('fail'));
            const btn = document.querySelector('[data-dropdown-type="sprint"]');
            await toggleCreateIssueDropdown('sprint', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Failed to load sprints');
        });

        it('shows "Select a team first" for labels when no team', async () => {
            getCurrentTeam.mockReturnValue(null);
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Select a team first');
        });

        it('fetches labels when empty and team exists', async () => {
            getLabels.mockReturnValue([]);
            api.getLabels.mockResolvedValue([{ id: 'l1', name: 'Bug' }]);
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            expect(api.getLabels).toHaveBeenCalledWith('team-1');
            expect(setLabels).toHaveBeenCalledWith([{ id: 'l1', name: 'Bug' }]);
        });

        it('still renders label dropdown even when fetch fails', async () => {
            getLabels.mockReturnValue([]);
            api.getLabels.mockRejectedValue(new Error('Network error'));
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            // Should still call renderCreateIssueLabelDropdown despite fetch error
            expect(renderCreateIssueLabelDropdown).toHaveBeenCalled();
        });

        it('uses cached labels when available', async () => {
            getLabels.mockReturnValue([{ id: 'l1', name: 'Bug' }]);
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            expect(api.getLabels).not.toHaveBeenCalled();
        });

        it('delegates to renderCreateIssueLabelDropdown for labels', async () => {
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            expect(renderCreateIssueLabelDropdown).toHaveBeenCalled();
        });

        it('registers multi-select click outside for labels', async () => {
            const btn = document.querySelector('[data-dropdown-type="labels"]');
            await toggleCreateIssueDropdown('labels', { currentTarget: btn });

            expect(registerDropdownClickOutside).toHaveBeenCalledWith(
                expect.any(HTMLElement),
                { multiSelect: true }
            );
        });

        it('registers single-select click outside for non-label dropdowns', async () => {
            const btn = document.querySelector('[data-dropdown-type="status"]');
            await toggleCreateIssueDropdown('status', { currentTarget: btn });

            expect(registerDropdownClickOutside).toHaveBeenCalledWith(expect.any(HTMLElement));
        });

        it('uses anchorEl when provided instead of event.currentTarget', async () => {
            const anchor = document.createElement('button');
            anchor.getBoundingClientRect = () => ({ top: 100, left: 200 });
            document.body.appendChild(anchor);

            await toggleCreateIssueDropdown('status', {}, anchor);

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.style.top).toBe('92px'); // 100 - 8
            expect(dropdown.style.left).toBe('200px');
        });
    });
});
