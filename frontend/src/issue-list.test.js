/**
 * Tests for issue-list.js module (CHT-664)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    STATUS_ORDER,
    PRIORITY_ORDER,
    ISSUE_TYPE_ORDER,
    setDependencies,
    renderIssues,
    renderIssueRow,
    toggleGroup,
    getPriorityIcon,
    getStatusIcon,
    sumEstimates,
} from './issue-list.js';

describe('issue-list', () => {
    let mockDeps;
    let testIssues;

    // Helper to set test issues
    const setTestIssues = (issues) => {
        testIssues = issues;
    };

    beforeEach(() => {
        // Reset test issues
        testIssues = [];

        // Mock dependencies
        mockDeps = {
            getIssues: vi.fn(() => testIssues),
            getAssigneeById: vi.fn(() => null),
            formatAssigneeName: vi.fn((a) => a?.name || ''),
            formatEstimate: vi.fn((e) => e ? `${e}pt` : ''),
            getSprintCache: vi.fn(() => ({})),
            formatStatus: vi.fn((s) => s),
            formatPriority: vi.fn((p) => p),
            formatIssueType: vi.fn((t) => t || 'task'),
            escapeHtml: vi.fn((text) => text || ''),
            escapeAttr: vi.fn((text) => text || ''),
            sanitizeColor: vi.fn((c) => c || '#888'),
            renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
            getAssigneeOptionList: vi.fn(() => []),
            getGroupByValue: vi.fn(() => ''),
        };

        setDependencies(mockDeps);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div id="issues-list" class=""></div>
        `;
    });

    describe('ORDER constants', () => {
        it('STATUS_ORDER contains expected statuses', () => {
            expect(STATUS_ORDER).toEqual([
                'backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'
            ]);
        });

        it('PRIORITY_ORDER contains expected priorities', () => {
            expect(PRIORITY_ORDER).toEqual([
                'urgent', 'high', 'medium', 'low', 'no_priority'
            ]);
        });

        it('ISSUE_TYPE_ORDER contains expected types', () => {
            expect(ISSUE_TYPE_ORDER).toEqual([
                'task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'epic'
            ]);
        });
    });

    describe('renderIssues', () => {
        it('shows empty state when no issues', () => {
            setTestIssues([]);
            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No issues found');
        });

        it('renders flat list when no grouping selected', () => {
            setTestIssues([
                { id: '1', title: 'Issue 1', status: 'todo', priority: 'medium', identifier: 'TEST-1', project_id: 'p1' },
                { id: '2', title: 'Issue 2', status: 'done', priority: 'low', identifier: 'TEST-2', project_id: 'p1' },
            ]);
            mockDeps.getGroupByValue.mockReturnValue('');

            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.querySelectorAll('.issue-row')).toHaveLength(2);
        });

        it('renders grouped by status with correct group count and content', () => {
            setTestIssues([
                { id: '1', title: 'Issue 1', status: 'todo', priority: 'medium', identifier: 'TEST-1', project_id: 'p1' },
                { id: '2', title: 'Issue 2', status: 'todo', priority: 'low', identifier: 'TEST-2', project_id: 'p1' },
                { id: '3', title: 'Issue 3', status: 'done', priority: 'high', identifier: 'TEST-3', project_id: 'p1' },
            ]);
            mockDeps.getGroupByValue.mockReturnValue('status');

            renderIssues();

            const list = document.getElementById('issues-list');
            const groups = list.querySelectorAll('.issue-group');
            expect(groups).toHaveLength(2);

            const groupKeys = Array.from(groups).map(g => g.dataset.group);
            expect(groupKeys).toContain('todo');
            expect(groupKeys).toContain('done');

            const todoGroup = list.querySelector('.issue-group[data-group="todo"]');
            expect(todoGroup.querySelectorAll('.issue-row')).toHaveLength(2);

            const doneGroup = list.querySelector('.issue-group[data-group="done"]');
            expect(doneGroup.querySelectorAll('.issue-row')).toHaveLength(1);
        });

        it('renders grouped by priority with correct groups', () => {
            setTestIssues([
                { id: '1', title: 'Issue 1', status: 'todo', priority: 'high', identifier: 'TEST-1', project_id: 'p1' },
                { id: '2', title: 'Issue 2', status: 'todo', priority: 'low', identifier: 'TEST-2', project_id: 'p1' },
                { id: '3', title: 'Issue 3', status: 'todo', priority: 'high', identifier: 'TEST-3', project_id: 'p1' },
            ]);
            mockDeps.getGroupByValue.mockReturnValue('priority');

            renderIssues();

            const list = document.getElementById('issues-list');
            const groups = list.querySelectorAll('.issue-group');
            expect(groups).toHaveLength(2);

            const highGroup = list.querySelector('.issue-group[data-group="high"]');
            expect(highGroup.querySelectorAll('.issue-row')).toHaveLength(2);

            const lowGroup = list.querySelector('.issue-group[data-group="low"]');
            expect(lowGroup.querySelectorAll('.issue-row')).toHaveLength(1);
        });
    });

    describe('renderIssueRow', () => {
        it('renders issue with all basic fields', () => {
            const issue = {
                id: 'issue-1',
                title: 'Test Issue',
                identifier: 'TEST-1',
                status: 'todo',
                priority: 'medium',
                issue_type: 'task',
                project_id: 'p1',
                created_at: '2024-01-15T10:00:00Z',
            };

            const html = renderIssueRow(issue);

            expect(html).toContain('data-issue-id="issue-1"');
            expect(html).toContain('Test Issue');
            expect(html).toContain('TEST-1');
            expect(html).toContain('data-status="todo"');
            expect(html).toContain('data-priority="medium"');
        });

        it('renders assignee avatar when assigned', () => {
            const assignee = { id: 'user-1', name: 'John Doe' };
            mockDeps.getAssigneeById.mockReturnValue(assignee);
            mockDeps.formatAssigneeName.mockReturnValue('John Doe');

            const issue = {
                id: 'issue-1',
                title: 'Test',
                identifier: 'TEST-1',
                status: 'todo',
                priority: 'medium',
                assignee_id: 'user-1',
                project_id: 'p1',
                created_at: '2024-01-15T10:00:00Z',
            };

            const _html = renderIssueRow(issue);

            expect(mockDeps.getAssigneeById).toHaveBeenCalledWith('user-1');
            expect(mockDeps.renderAvatar).toHaveBeenCalled();
        });

        it('renders labels when present', () => {
            mockDeps.sanitizeColor.mockReturnValue('#ff0000');
            mockDeps.escapeHtml.mockImplementation((t) => t);

            const issue = {
                id: 'issue-1',
                title: 'Test',
                identifier: 'TEST-1',
                status: 'todo',
                priority: 'medium',
                project_id: 'p1',
                created_at: '2024-01-15T10:00:00Z',
                labels: [
                    { id: 'l1', name: 'bug', color: '#ff0000' },
                ],
            };

            const html = renderIssueRow(issue);

            expect(html).toContain('bug');
            expect(html).toContain('issue-label');
        });

        it('renders sprint badge when assigned to sprint', () => {
            mockDeps.getSprintCache.mockReturnValue({
                'sprint-1': { id: 'sprint-1', name: 'Sprint 1', status: 'active' }
            });

            const issue = {
                id: 'issue-1',
                title: 'Test',
                identifier: 'TEST-1',
                status: 'todo',
                priority: 'medium',
                sprint_id: 'sprint-1',
                project_id: 'p1',
                created_at: '2024-01-15T10:00:00Z',
            };

            const html = renderIssueRow(issue);

            expect(html).toContain('Sprint 1');
            expect(html).toContain('sprint-badge');
        });

        it('renders estimate when present', () => {
            mockDeps.formatEstimate.mockReturnValue('3pt');

            const issue = {
                id: 'issue-1',
                title: 'Test',
                identifier: 'TEST-1',
                status: 'todo',
                priority: 'medium',
                estimate: 3,
                project_id: 'p1',
                created_at: '2024-01-15T10:00:00Z',
            };

            const html = renderIssueRow(issue);

            expect(html).toContain('3pt');
            expect(html).toContain('estimate-badge');
        });
    });

    describe('toggleGroup', () => {
        it('toggles collapsed class on group element', () => {
            document.body.innerHTML = `
                <div class="issue-group" data-group="todo"></div>
            `;

            toggleGroup('todo');
            expect(document.querySelector('.issue-group').classList.contains('collapsed')).toBe(true);

            toggleGroup('todo');
            expect(document.querySelector('.issue-group').classList.contains('collapsed')).toBe(false);
        });

        it('does nothing if group not found', () => {
            document.body.innerHTML = `
                <div class="issue-group" data-group="todo"></div>
            `;

            // Should not throw
            toggleGroup('nonexistent');
        });
    });

    describe('getPriorityIcon', () => {
        it('returns SVG for each priority level', () => {
            PRIORITY_ORDER.forEach(priority => {
                const icon = getPriorityIcon(priority);
                expect(icon).toContain('<svg');
                expect(icon).toContain(`priority-${priority === 'no_priority' ? 'none' : priority}`);
            });
        });

        it('returns no_priority icon for unknown priority', () => {
            const icon = getPriorityIcon('unknown');
            expect(icon).toContain('priority-none');
        });
    });

    describe('getStatusIcon', () => {
        it('returns SVG for each status', () => {
            STATUS_ORDER.forEach(status => {
                const icon = getStatusIcon(status);
                expect(icon).toContain('<svg');
                expect(icon).toContain(`status-${status.replace('_', '-')}`);
            });
        });

        it('returns backlog icon for unknown status', () => {
            const icon = getStatusIcon('unknown');
            expect(icon).toContain('status-backlog');
        });
    });

    describe('sumEstimates (CHT-423)', () => {
        it('sums estimates from issues', () => {
            expect(sumEstimates([
                { estimate: 3 },
                { estimate: 5 },
                { estimate: 2 },
            ])).toBe(10);
        });

        it('treats null estimates as 0', () => {
            expect(sumEstimates([
                { estimate: 3 },
                { estimate: null },
                { estimate: 5 },
            ])).toBe(8);
        });

        it('returns 0 for empty array', () => {
            expect(sumEstimates([])).toBe(0);
        });

        it('handles explicit zero estimates', () => {
            expect(sumEstimates([
                { estimate: 0 },
                { estimate: 3 },
            ])).toBe(3);
        });

        it('handles missing estimate property', () => {
            expect(sumEstimates([
                { id: '1' },
                { id: '2', estimate: 5 },
            ])).toBe(5);
        });
    });

    describe('points summary (CHT-423)', () => {
        const issuesWithEstimates = [
            { id: '1', identifier: 'T-1', title: 'A', status: 'todo', priority: 'medium', estimate: 3 },
            { id: '2', identifier: 'T-2', title: 'B', status: 'todo', priority: 'high', estimate: 5 },
            { id: '3', identifier: 'T-3', title: 'C', status: 'done', priority: 'medium', estimate: null },
        ];

        it('shows summary bar with count and points in flat list', () => {
            setTestIssues(issuesWithEstimates);
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            expect(html).toContain('issue-list-summary');
            expect(html).toContain('3 issues');
            expect(html).toContain('8pt');
        });

        it('shows summary bar when grouped by status', () => {
            setTestIssues(issuesWithEstimates);
            mockDeps.getGroupByValue.mockReturnValue('status');
            setDependencies(mockDeps);
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            expect(html).toContain('issue-list-summary');
            expect(html).toContain('3 issues');
            expect(html).toContain('8pt');
        });

        it('shows points per group in group headers', () => {
            setTestIssues(issuesWithEstimates);
            mockDeps.getGroupByValue.mockReturnValue('status');
            setDependencies(mockDeps);
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            // todo group has 2 issues (3pt + 5pt = 8pt)
            const todoGroup = html.match(/data-group="todo"[\s\S]*?<\/div>/);
            expect(todoGroup[0]).toContain('group-points');
            expect(todoGroup[0]).toContain('8pt');
        });

        it('shows points per group when grouped by priority', () => {
            setTestIssues(issuesWithEstimates);
            mockDeps.getGroupByValue.mockReturnValue('priority');
            setDependencies(mockDeps);
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            // high group has 1 issue (5pt)
            const highGroup = html.match(/data-group="high"[\s\S]*?<\/div>/);
            expect(highGroup[0]).toContain('group-points');
            expect(highGroup[0]).toContain('5pt');
        });

        it('does not show summary when no issues (empty state)', () => {
            setTestIssues([]);
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            expect(html).not.toContain('issue-list-summary');
            expect(html).toContain('No issues found');
        });
    });
});
