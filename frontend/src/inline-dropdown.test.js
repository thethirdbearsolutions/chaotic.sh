/**
 * Tests for inline-dropdown.js module (CHT-667)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock all dependencies before importing the module under test
vi.mock('./api.js', () => ({
    api: {
        updateIssue: vi.fn(),
        getLabels: vi.fn().mockResolvedValue([]),
        createLabel: vi.fn(),
        getSprints: vi.fn().mockResolvedValue([]),
    },
}));

vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getLabels: vi.fn(() => []),
    setLabels: vi.fn(),
    getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
    getCurrentDetailIssue: vi.fn(() => null),
    setCurrentDetailIssue: vi.fn(),
    getCurrentDetailSprints: vi.fn(() => []),
}));

vi.mock('./dashboard.js', () => ({
    getMyIssues: vi.fn(() => []),
    setMyIssues: vi.fn(),
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    closeAllDropdowns: vi.fn(),
    registerDropdownClickOutside: vi.fn(),
    setDropdownKeyHandler: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./issue-list.js', () => ({
    getStatusIcon: vi.fn(() => '<svg></svg>'),
    getPriorityIcon: vi.fn(() => '<svg></svg>'),
    renderIssueRow: vi.fn(() => '<div class="issue-row"></div>'),
}));

vi.mock('./utils.js', () => ({
    formatStatus: vi.fn((s) => s),
    formatPriority: vi.fn((p) => p),
    formatIssueType: vi.fn((t) => t || 'task'),
    escapeHtml: vi.fn((text) => text || ''),
    escapeAttr: vi.fn((text) => text || ''),
    escapeJsString: vi.fn((text) => text || ''),
    sanitizeColor: vi.fn((c) => c || '#888'),
    renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
}));

vi.mock('./projects.js', () => ({
    formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
    getEstimateOptions: vi.fn(() => [{ value: null, label: 'None' }, { value: 1, label: '1' }]),
}));

vi.mock('./assignees.js', () => ({
    formatAssigneeName: vi.fn((a) => a?.name || ''),
    formatAssigneeOptionLabel: vi.fn((a) => a?.name || ''),
    getAssigneeOptionList: vi.fn(() => []),
    getAssigneeById: vi.fn(() => null),
}));

vi.mock('./sprints.js', () => ({
    updateSprintCacheForProject: vi.fn(),
}));

vi.mock('./issues-view.js', () => ({
    updateSprintBudgetBar: vi.fn(),
}));

// Import mocked modules to get references to mock functions
import { api } from './api.js';
import { getIssues, setIssues, getCurrentTeam, getCurrentDetailIssue, setCurrentDetailIssue } from './state.js';
import { getMyIssues, setMyIssues } from './dashboard.js';
import { closeAllDropdowns, showToast } from './ui.js';
import { getAssigneeOptionList } from './assignees.js';
import { getEstimateOptions } from './projects.js';

import {
    STATUS_OPTIONS,
    PRIORITY_OPTIONS,
    ISSUE_TYPE_OPTIONS,
    showInlineDropdown,
    showDetailDropdown,
    updateIssueField,
    updateDetailViewField,
    toggleIssueLabel,
    createLabelFromDropdown,
    createLabelForCreateIssue,
    toggleCreateIssueLabelSelection,
    getCreateIssueLabelIds,
    setCreateIssueLabelIds,
} from './inline-dropdown.js';

describe('inline-dropdown', () => {
    beforeEach(() => {
        // Reset label ids
        setCreateIssueLabelIds([]);

        // Reset all mocks
        vi.clearAllMocks();

        // Restore default return values after clearAllMocks
        api.updateIssue.mockReset();
        api.getLabels.mockResolvedValue([]);
        api.createLabel.mockReset();
        api.getSprints.mockResolvedValue([]);

        getIssues.mockReturnValue([]);
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        getCurrentDetailIssue.mockReturnValue(null);

        getMyIssues.mockReturnValue([]);

        getEstimateOptions.mockReturnValue([{ value: null, label: 'None' }, { value: 1, label: '1' }]);
        getAssigneeOptionList.mockReturnValue([]);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div id="issues-list"></div>
            <div id="issue-detail-view" class="hidden">
                <div class="detail-sidebar"></div>
            </div>
        `;
    });

    describe('constants', () => {
        it('STATUS_OPTIONS contains expected statuses', () => {
            expect(STATUS_OPTIONS).toEqual([
                'backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'
            ]);
        });

        it('PRIORITY_OPTIONS contains expected priorities', () => {
            expect(PRIORITY_OPTIONS).toEqual([
                'no_priority', 'urgent', 'high', 'medium', 'low'
            ]);
        });

        it('ISSUE_TYPE_OPTIONS contains expected types', () => {
            expect(ISSUE_TYPE_OPTIONS).toEqual([
                'task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'epic'
            ]);
        });
    });

    describe('showInlineDropdown', () => {
        it('creates dropdown element in DOM', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'status', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown).not.toBeNull();
        });

        it('calls closeAllDropdowns before showing new dropdown', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'status', 'issue-1');

            expect(closeAllDropdowns).toHaveBeenCalled();
        });

        it('renders status options for status type', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'status', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Change status');
            expect(dropdown.querySelectorAll('.dropdown-option')).toHaveLength(6);
        });

        it('renders priority options for priority type', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'priority', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Change priority');
            expect(dropdown.querySelectorAll('.dropdown-option')).toHaveLength(5);
        });

        it('renders issue type options for type dropdown', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'type', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Change type');
            expect(dropdown.querySelectorAll('.dropdown-option')).toHaveLength(7);
        });

        it('renders assignee options including unassigned', async () => {
            getAssigneeOptionList.mockReturnValue([
                { assignee: { id: 'user-1', name: 'John' }, indent: false },
            ]);

            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'assignee', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Assign to');
            expect(dropdown.innerHTML).toContain('Unassigned');
        });

        it('renders estimate options', async () => {
            getEstimateOptions.mockReturnValue([
                { value: null, label: 'None' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
            ]);

            const mockEvent = {
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showInlineDropdown(mockEvent, 'estimate', 'issue-1');

            const dropdown = document.querySelector('.inline-dropdown');
            expect(dropdown.innerHTML).toContain('Set estimate');
        });
    });

    describe('showDetailDropdown', () => {
        it('calls showInlineDropdown with stopPropagation', async () => {
            const mockEvent = {
                stopPropagation: vi.fn(),
                preventDefault: vi.fn(),
                currentTarget: {
                    getBoundingClientRect: () => ({ left: 100, right: 200, top: 50, bottom: 70 }),
                },
            };

            await showDetailDropdown(mockEvent, 'status', 'issue-1');

            expect(mockEvent.stopPropagation).toHaveBeenCalled();
        });
    });

    describe('updateIssueField', () => {
        it('calls API to update issue', async () => {
            api.updateIssue.mockResolvedValue({ id: 'issue-1', status: 'done' });
            getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(api.updateIssue).toHaveBeenCalledWith('issue-1', { status: 'done' });
        });

        it('updates local issues state on success', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            api.updateIssue.mockResolvedValue(updatedIssue);
            const issues = [{ id: 'issue-1', status: 'todo' }];
            getIssues.mockReturnValue(issues);

            await updateIssueField('issue-1', 'status', 'done');

            expect(setIssues).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('Issue updated', 'success');
        });

        it('shows error toast on API failure', async () => {
            api.updateIssue.mockRejectedValue(new Error('Update failed'));
            getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(showToast).toHaveBeenCalledWith('Update failed', 'error');
        });

        it('updates myIssues state if issue exists there', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            api.updateIssue.mockResolvedValue(updatedIssue);
            getIssues.mockReturnValue([]);
            getMyIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(setMyIssues).toHaveBeenCalled();
        });

        it('updates currentDetailIssue if viewing that issue', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            api.updateIssue.mockResolvedValue(updatedIssue);
            getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);
            getCurrentDetailIssue.mockReturnValue({ id: 'issue-1', status: 'todo' });

            await updateIssueField('issue-1', 'status', 'done');

            expect(setCurrentDetailIssue).toHaveBeenCalledWith(updatedIssue);
        });
    });

    describe('updateDetailViewField', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="issue-detail-view">
                    <div class="detail-sidebar">
                        <div class="property-row">
                            <span class="property-label">Status</span>
                            <button class="property-value"></button>
                        </div>
                        <div class="property-row">
                            <span class="property-label">Priority</span>
                            <button class="property-value"></button>
                        </div>
                    </div>
                </div>
            `;
        });

        it('updates status field in detail view', () => {
            updateDetailViewField('status', { status: 'done' });

            const valueButton = document.querySelector('.property-row:first-child .property-value');
            expect(valueButton.innerHTML).toContain('done');
        });

        it('updates priority field in detail view', () => {
            updateDetailViewField('priority', { priority: 'high' });

            const rows = document.querySelectorAll('.property-row');
            const priorityRow = Array.from(rows).find(r =>
                r.querySelector('.property-label').textContent === 'Priority'
            );
            expect(priorityRow.querySelector('.property-value').innerHTML).toContain('high');
        });

        it('does nothing if detail view is hidden', () => {
            document.getElementById('issue-detail-view').classList.add('hidden');

            updateDetailViewField('status', { status: 'done' });

            // Should not throw, just return early
        });
    });

    describe('toggleIssueLabel', () => {
        it('adds label if not currently on issue', async () => {
            const issue = { id: 'issue-1', labels: [] };
            getIssues.mockReturnValue([issue]);
            api.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [{ id: 'label-1' }] });

            await toggleIssueLabel('issue-1', 'label-1', null);

            expect(api.updateIssue).toHaveBeenCalledWith('issue-1', { label_ids: ['label-1'] });
        });

        it('removes label if currently on issue', async () => {
            const issue = { id: 'issue-1', labels: [{ id: 'label-1' }] };
            getIssues.mockReturnValue([issue]);
            api.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [] });

            await toggleIssueLabel('issue-1', 'label-1', null);

            expect(api.updateIssue).toHaveBeenCalledWith('issue-1', { label_ids: [] });
        });
    });

    describe('createLabelFromDropdown', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="inline-dropdown" data-dropdown-type="labels" data-issue-id="issue-1">
                    <input class="label-create-input" value="New Label">
                </div>
            `;
        });

        it('creates label via API', async () => {
            api.createLabel.mockResolvedValue({ id: 'new-label', name: 'New Label' });
            api.getLabels.mockResolvedValue([{ id: 'new-label', name: 'New Label' }]);
            getIssues.mockReturnValue([{ id: 'issue-1', labels: [] }]);
            api.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [{ id: 'new-label' }] });

            await createLabelFromDropdown('issue-1');

            expect(api.createLabel).toHaveBeenCalledWith('team-1', { name: 'New Label' });
        });

        it('does nothing if no team', async () => {
            getCurrentTeam.mockReturnValue(null);

            await createLabelFromDropdown('issue-1');

            expect(api.createLabel).not.toHaveBeenCalled();
        });
    });

    describe('createIssueLabelIds state', () => {
        it('getCreateIssueLabelIds returns current state', () => {
            setCreateIssueLabelIds(['label-1', 'label-2']);
            expect(getCreateIssueLabelIds()).toEqual(['label-1', 'label-2']);
        });

        it('toggleCreateIssueLabelSelection adds label if not present', () => {
            setCreateIssueLabelIds([]);
            toggleCreateIssueLabelSelection('label-1');
            expect(getCreateIssueLabelIds()).toContain('label-1');
        });

        it('toggleCreateIssueLabelSelection removes label if present', () => {
            setCreateIssueLabelIds(['label-1']);
            toggleCreateIssueLabelSelection('label-1');
            expect(getCreateIssueLabelIds()).not.toContain('label-1');
        });
    });

    describe('createLabelForCreateIssue', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div class="inline-dropdown" data-dropdown-type="create-labels">
                    <input class="label-create-input" value="Feature">
                </div>
                <span id="create-issue-labels-label">Labels</span>
            `;
        });

        it('creates label and adds to selection', async () => {
            api.createLabel.mockResolvedValue({ id: 'new-label', name: 'Feature' });
            api.getLabels.mockResolvedValue([{ id: 'new-label', name: 'Feature' }]);
            setCreateIssueLabelIds([]);

            await createLabelForCreateIssue();

            expect(api.createLabel).toHaveBeenCalledWith('team-1', { name: 'Feature' });
            expect(getCreateIssueLabelIds()).toContain('new-label');
        });
    });
});
