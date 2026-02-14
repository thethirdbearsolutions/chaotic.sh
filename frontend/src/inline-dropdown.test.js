/**
 * Tests for inline-dropdown.js module (CHT-667)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    STATUS_OPTIONS,
    PRIORITY_OPTIONS,
    ISSUE_TYPE_OPTIONS,
    setDependencies,
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
    let mockApi;
    let mockDeps;

    beforeEach(() => {
        // Reset label ids
        setCreateIssueLabelIds([]);

        // Mock API
        mockApi = {
            updateIssue: vi.fn(),
            getLabels: vi.fn().mockResolvedValue([]),
            createLabel: vi.fn(),
            getSprints: vi.fn().mockResolvedValue([]),
        };

        // Mock dependencies
        mockDeps = {
            api: mockApi,
            getIssues: vi.fn(() => []),
            setIssues: vi.fn(),
            getMyIssues: vi.fn(() => []),
            setMyIssues: vi.fn(),
            getCurrentDetailIssue: vi.fn(() => null),
            setCurrentDetailIssue: vi.fn(),
            getLabels: vi.fn(() => []),
            setLabels: vi.fn(),
            getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
            getCurrentDetailSprints: vi.fn(() => []),
            closeAllDropdowns: vi.fn(),
            registerDropdownClickOutside: vi.fn(),
            setDropdownKeyHandler: vi.fn(),
            showToast: vi.fn(),
            getStatusIcon: vi.fn(() => '<svg></svg>'),
            getPriorityIcon: vi.fn(() => '<svg></svg>'),
            formatStatus: vi.fn((s) => s),
            formatPriority: vi.fn((p) => p),
            formatIssueType: vi.fn((t) => t || 'task'),
            formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
            formatAssigneeName: vi.fn((a) => a?.name || ''),
            formatAssigneeOptionLabel: vi.fn((a) => a?.name || ''),
            getAssigneeOptionList: vi.fn(() => []),
            getAssigneeById: vi.fn(() => null),
            getEstimateOptions: vi.fn(() => [{ value: null, label: 'None' }, { value: 1, label: '1' }]),
            renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
            renderIssueRow: vi.fn(() => '<div class="issue-row"></div>'),
            escapeHtml: vi.fn((text) => text || ''),
            escapeAttr: vi.fn((text) => text || ''),
            sanitizeColor: vi.fn((c) => c || '#888'),
            updateSprintCacheForProject: vi.fn(),
            updateSprintBudgetBar: vi.fn(),
        };

        setDependencies(mockDeps);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div id="issues-list"></div>
            <div id="issue-detail-view" class="hidden">
                <div class="issue-detail-sidebar"></div>
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

            expect(mockDeps.closeAllDropdowns).toHaveBeenCalled();
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
            mockDeps.getAssigneeOptionList.mockReturnValue([
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
            mockDeps.getEstimateOptions.mockReturnValue([
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
            mockApi.updateIssue.mockResolvedValue({ id: 'issue-1', status: 'done' });
            mockDeps.getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(mockApi.updateIssue).toHaveBeenCalledWith('issue-1', { status: 'done' });
        });

        it('updates local issues state on success', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            mockApi.updateIssue.mockResolvedValue(updatedIssue);
            const issues = [{ id: 'issue-1', status: 'todo' }];
            mockDeps.getIssues.mockReturnValue(issues);

            await updateIssueField('issue-1', 'status', 'done');

            expect(mockDeps.setIssues).toHaveBeenCalled();
            expect(mockDeps.showToast).toHaveBeenCalledWith('Issue updated', 'success');
        });

        it('shows error toast on API failure', async () => {
            mockApi.updateIssue.mockRejectedValue(new Error('Update failed'));
            mockDeps.getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Update failed', 'error');
        });

        it('updates myIssues state if issue exists there', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            mockApi.updateIssue.mockResolvedValue(updatedIssue);
            mockDeps.getIssues.mockReturnValue([]);
            mockDeps.getMyIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);

            await updateIssueField('issue-1', 'status', 'done');

            expect(mockDeps.setMyIssues).toHaveBeenCalled();
        });

        it('updates currentDetailIssue if viewing that issue', async () => {
            const updatedIssue = { id: 'issue-1', status: 'done' };
            mockApi.updateIssue.mockResolvedValue(updatedIssue);
            mockDeps.getIssues.mockReturnValue([{ id: 'issue-1', status: 'todo' }]);
            mockDeps.getCurrentDetailIssue.mockReturnValue({ id: 'issue-1', status: 'todo' });

            await updateIssueField('issue-1', 'status', 'done');

            expect(mockDeps.setCurrentDetailIssue).toHaveBeenCalledWith(updatedIssue);
        });
    });

    describe('updateDetailViewField', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="issue-detail-view">
                    <div class="issue-detail-sidebar">
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
            mockDeps.getIssues.mockReturnValue([issue]);
            mockApi.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [{ id: 'label-1' }] });

            await toggleIssueLabel('issue-1', 'label-1', null);

            expect(mockApi.updateIssue).toHaveBeenCalledWith('issue-1', { label_ids: ['label-1'] });
        });

        it('removes label if currently on issue', async () => {
            const issue = { id: 'issue-1', labels: [{ id: 'label-1' }] };
            mockDeps.getIssues.mockReturnValue([issue]);
            mockApi.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [] });

            await toggleIssueLabel('issue-1', 'label-1', null);

            expect(mockApi.updateIssue).toHaveBeenCalledWith('issue-1', { label_ids: [] });
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
            mockApi.createLabel.mockResolvedValue({ id: 'new-label', name: 'New Label' });
            mockApi.getLabels.mockResolvedValue([{ id: 'new-label', name: 'New Label' }]);
            mockDeps.getIssues.mockReturnValue([{ id: 'issue-1', labels: [] }]);
            mockApi.updateIssue.mockResolvedValue({ id: 'issue-1', labels: [{ id: 'new-label' }] });

            await createLabelFromDropdown('issue-1');

            expect(mockApi.createLabel).toHaveBeenCalledWith('team-1', { name: 'New Label' });
        });

        it('does nothing if no team', async () => {
            mockDeps.getCurrentTeam.mockReturnValue(null);

            await createLabelFromDropdown('issue-1');

            expect(mockApi.createLabel).not.toHaveBeenCalled();
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
            mockApi.createLabel.mockResolvedValue({ id: 'new-label', name: 'Feature' });
            mockApi.getLabels.mockResolvedValue([{ id: 'new-label', name: 'Feature' }]);
            setCreateIssueLabelIds([]);

            await createLabelForCreateIssue();

            expect(mockApi.createLabel).toHaveBeenCalledWith('team-1', { name: 'Feature' });
            expect(getCreateIssueLabelIds()).toContain('new-label');
        });
    });
});
