/**
 * Tests for epic-detail-view.js module (CHT-855)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    setDependencies,
    viewEpic,
    viewEpicByPath,
} from './epic-detail-view.js';

describe('epic-detail-view', () => {
    let mockApi;
    let mockDeps;

    const makeEpic = (overrides = {}) => ({
        id: 'epic-1',
        identifier: 'CHT-100',
        title: 'Test Epic',
        description: 'Epic description',
        status: 'in_progress',
        priority: 'high',
        issue_type: 'epic',
        project_id: 'proj-1',
        assignee_id: null,
        estimate: 13,
        labels: [],
        created_at: '2025-01-01T00:00:00Z',
        ...overrides,
    });

    const makeSubIssue = (overrides = {}) => ({
        id: 'sub-1',
        identifier: 'CHT-101',
        title: 'Sub issue 1',
        status: 'todo',
        assignee_id: null,
        ...overrides,
    });

    beforeEach(() => {
        mockApi = {
            getIssue: vi.fn().mockResolvedValue(makeEpic()),
            getIssueByIdentifier: vi.fn().mockResolvedValue(makeEpic()),
            getSubIssues: vi.fn().mockResolvedValue([]),
            getActivities: vi.fn().mockResolvedValue([]),
            getComments: vi.fn().mockResolvedValue([]),
        };

        mockDeps = {
            api: mockApi,
            getCurrentView: vi.fn(() => 'epics'),
            showToast: vi.fn(),
            navigateTo: vi.fn(),
            getProjects: vi.fn(() => [{ id: 'proj-1', name: 'Test Project' }]),
            getAssigneeById: vi.fn(() => null),
            formatAssigneeName: vi.fn((a) => a?.name || ''),
            formatStatus: vi.fn((s) => s || 'backlog'),
            formatPriority: vi.fn((p) => p || 'no_priority'),
            formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
            formatTimeAgo: vi.fn(() => '1h ago'),
            getStatusIcon: vi.fn(() => '<svg></svg>'),
            getPriorityIcon: vi.fn(() => '<svg></svg>'),
            escapeHtml: vi.fn((text) => text || ''),
            escapeAttr: vi.fn((text) => text || ''),
            escapeJsString: vi.fn((text) => text || ''),
            sanitizeColor: vi.fn((c) => c || '#888'),
        };

        setDependencies(mockDeps);

        document.body.innerHTML = `
            <div class="view" id="epics-view"></div>
            <div class="view hidden" id="epic-detail-view">
                <div id="epic-detail-content"></div>
            </div>
        `;
    });

    describe('viewEpic', () => {
        it('renders epic title and description', async () => {
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('Test Epic');
            expect(content).toContain('Epic description');
        });

        it('shows the epic detail view and hides others', async () => {
            await viewEpic('epic-1');

            expect(document.getElementById('epic-detail-view').classList.contains('hidden')).toBe(false);
            expect(document.getElementById('epics-view').classList.contains('hidden')).toBe(true);
        });

        it('renders progress bar with 0 sub-issues', async () => {
            mockApi.getSubIssues.mockResolvedValue([]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('0 of 0 done');
            expect(content).toContain('0%');
        });

        it('renders progress bar with partial completion', async () => {
            mockApi.getSubIssues.mockResolvedValue([
                makeSubIssue({ id: 's1', status: 'done' }),
                makeSubIssue({ id: 's2', status: 'in_progress' }),
                makeSubIssue({ id: 's3', status: 'todo' }),
                makeSubIssue({ id: 's4', status: 'backlog' }),
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('1 of 4 done');
            expect(content).toContain('25%');
        });

        it('counts canceled as done for progress', async () => {
            mockApi.getSubIssues.mockResolvedValue([
                makeSubIssue({ id: 's1', status: 'done' }),
                makeSubIssue({ id: 's2', status: 'canceled' }),
                makeSubIssue({ id: 's3', status: 'todo' }),
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('2 of 3 done');
            expect(content).toContain('67%');
        });

        it('renders 100% progress with complete class', async () => {
            mockApi.getSubIssues.mockResolvedValue([
                makeSubIssue({ id: 's1', status: 'done' }),
                makeSubIssue({ id: 's2', status: 'done' }),
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('2 of 2 done');
            expect(content).toContain('100%');
            expect(content).toContain('epic-progress-complete');
        });

        it('renders sub-issues list with status and identifier', async () => {
            const subIssues = [
                makeSubIssue({ id: 's1', identifier: 'CHT-101', title: 'First task', status: 'done' }),
                makeSubIssue({ id: 's2', identifier: 'CHT-102', title: 'Second task', status: 'in_progress' }),
            ];
            mockApi.getSubIssues.mockResolvedValue(subIssues);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('CHT-101');
            expect(content).toContain('First task');
            expect(content).toContain('CHT-102');
            expect(content).toContain('Second task');
        });

        it('renders sub-issue assignee when present', async () => {
            mockDeps.getAssigneeById.mockReturnValue({ id: 'user-1', name: 'Alice' });
            mockDeps.formatAssigneeName.mockReturnValue('Alice');
            mockApi.getSubIssues.mockResolvedValue([
                makeSubIssue({ id: 's1', assignee_id: 'user-1' }),
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('Alice');
        });

        it('renders activity timeline', async () => {
            mockApi.getActivities.mockResolvedValue([
                { activity_type: 'created', user_name: 'Bob', created_at: '2025-01-01T00:00:00Z' },
                { activity_type: 'status_changed', user_name: 'Alice', old_value: 'backlog', new_value: 'in_progress', created_at: '2025-01-02T00:00:00Z' },
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('activity-item');
            expect(content).toContain('Bob');
        });

        it('renders empty activity state', async () => {
            mockApi.getActivities.mockResolvedValue([]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('No activity yet');
        });

        it('renders sidebar properties', async () => {
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('Status');
            expect(content).toContain('Priority');
            expect(content).toContain('Assignee');
            expect(content).toContain('Estimate');
            expect(content).toContain('Test Project');
        });

        it('renders labels when present', async () => {
            mockApi.getIssue.mockResolvedValue(makeEpic({
                labels: [{ name: 'frontend', color: '#ff0000' }],
            }));
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('frontend');
        });

        it('pushes history state when pushHistory is true', async () => {
            const pushSpy = vi.spyOn(history, 'pushState');
            await viewEpic('epic-1', true);

            expect(pushSpy).toHaveBeenCalledWith(
                { epicId: 'epic-1', view: 'epics' },
                '',
                '/epic/CHT-100'
            );
            pushSpy.mockRestore();
        });

        it('does not push history when pushHistory is false', async () => {
            const pushSpy = vi.spyOn(history, 'pushState');
            await viewEpic('epic-1', false);

            expect(pushSpy).not.toHaveBeenCalled();
            pushSpy.mockRestore();
        });

        it('redirects to issue detail view if not an epic', async () => {
            window.viewIssue = vi.fn();
            mockApi.getIssue.mockResolvedValue(makeEpic({ issue_type: 'task' }));
            await viewEpic('issue-1');

            expect(window.viewIssue).toHaveBeenCalledWith('issue-1', true);
            // Should not render epic content
            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).not.toContain('Progress');
            delete window.viewIssue;
        });

        it('falls back to epics navigation if not epic and no viewIssue', async () => {
            delete window.viewIssue;
            mockApi.getIssue.mockResolvedValue(makeEpic({ issue_type: 'bug' }));
            await viewEpic('issue-1');

            expect(mockDeps.navigateTo).toHaveBeenCalledWith('epics', false);
        });

        it('shows toast on error', async () => {
            mockApi.getIssue.mockRejectedValue(new Error('Not found'));
            await viewEpic('epic-1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Failed to load epic: Not found', 'error');
        });

        it('sub-issue row click navigates to issue detail', async () => {
            window.viewIssue = vi.fn();
            mockApi.getSubIssues.mockResolvedValue([
                makeSubIssue({ id: 'sub-1', identifier: 'CHT-101' }),
            ]);
            await viewEpic('epic-1');

            const row = document.querySelector('.sub-issue-item');
            expect(row).not.toBeNull();
            row.click();

            expect(window.viewIssue).toHaveBeenCalledWith('sub-1');
            delete window.viewIssue;
        });

        it('renders comments section when comments exist', async () => {
            mockApi.getComments.mockResolvedValue([
                { id: 'c1', author_name: 'Alice', content: 'Looks good', created_at: '2025-01-01T00:00:00Z' },
            ]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('Comments');
            expect(content).toContain('Alice');
            expect(content).toContain('Looks good');
        });

        it('does not render comments section when no comments', async () => {
            mockApi.getComments.mockResolvedValue([]);
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).not.toContain('epic-comments-section');
        });

        it('renders breadcrumb with project name and identifier', async () => {
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).toContain('Test Project');
            expect(content).toContain('CHT-100');
        });

        it('omits description section when no description', async () => {
            mockApi.getIssue.mockResolvedValue(makeEpic({ description: null }));
            await viewEpic('epic-1');

            const content = document.getElementById('epic-detail-content').innerHTML;
            expect(content).not.toContain('issue-detail-description');
        });
    });

    describe('viewEpicByPath', () => {
        it('resolves identifier and calls viewEpic', async () => {
            mockApi.getIssueByIdentifier.mockResolvedValue(makeEpic());
            await viewEpicByPath('CHT-100');

            expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('CHT-100');
            expect(mockApi.getIssue).toHaveBeenCalledWith('epic-1');
        });

        it('resolves by ID when no dash in identifier', async () => {
            mockApi.getIssue.mockResolvedValue(makeEpic());
            await viewEpicByPath('epic-uuid-123');

            // Has a dash, so treated as identifier
            expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('epic-uuid-123');
        });

        it('redirects to issue detail if not an epic', async () => {
            window.viewIssue = vi.fn();
            mockApi.getIssueByIdentifier.mockResolvedValue(makeEpic({ issue_type: 'task' }));
            await viewEpicByPath('CHT-101');

            expect(window.viewIssue).toHaveBeenCalledWith('epic-1', false);
            delete window.viewIssue;
        });

        it('navigates to epics on not found', async () => {
            mockApi.getIssueByIdentifier.mockResolvedValue(null);
            await viewEpicByPath('CHT-999');

            expect(mockDeps.navigateTo).toHaveBeenCalledWith('epics', false);
        });

        it('navigates to epics on error', async () => {
            mockApi.getIssueByIdentifier.mockRejectedValue(new Error('fail'));
            await viewEpicByPath('CHT-999');

            expect(mockDeps.navigateTo).toHaveBeenCalledWith('epics', false);
        });
    });
});
