/**
 * Tests for issue-list.js module (CHT-664)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock all dependency modules before importing issue-list
vi.mock('./state.js', () => {
    // Stateful stand-in so setSelectedIssueIndex() calls are observable via
    // getSelectedIssueIndex(), same as the real module (CHT-1215).
    let _selectedIndex = -1;
    return {
        getIssues: vi.fn(() => []),
        getCurrentUser: vi.fn(() => ({ id: 'u-1' })),
        getSelectedIssueIndex: vi.fn(() => _selectedIndex),
        setSelectedIssueIndex: vi.fn((i) => { _selectedIndex = i; }),
    };
});

vi.mock('./assignees.js', () => ({
    getAssigneeById: vi.fn(() => null),
    formatAssigneeName: vi.fn((a) => a?.name || ''),
    getAssigneeOptionList: vi.fn(() => []),
}));

vi.mock('./projects.js', () => ({
    formatEstimate: vi.fn((e) => e ? `${e}pt` : ''),
    isOutOfScale: vi.fn(() => false),
}));

vi.mock('./sprints.js', () => ({
    getSprintCache: vi.fn(() => ({})),
}));

vi.mock('./utils.js', () => ({
    formatStatus: vi.fn((s) => s),
    formatPriority: vi.fn((p) => p),
    formatIssueType: vi.fn((t) => t || 'task'),
    escapeHtml: vi.fn((text) => text || ''),
    escapeAttr: vi.fn((text) => text || ''),
    sanitizeColor: vi.fn((c) => c || '#888'),
    renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
}));

vi.mock('./issues-view.js', () => ({
    getGroupByValue: vi.fn(() => ''),
    getTotalFilterCount: vi.fn(() => 0),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./inline-dropdown.js', () => ({
    showInlineDropdown: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

import {
    STATUS_ORDER,
    PRIORITY_ORDER,
    ISSUE_TYPE_ORDER,
    renderIssues,
    renderIssueRow,
    toggleGroup,
    clearCollapsedGroups,
    getPriorityIcon,
    getStatusIcon,
    sumEstimates,
    highlightSearchMatch,
    getDescriptionSnippet,
    appendPendingRows,
    cancelPendingRows,
    hasPendingRows,
    FIRST_PAINT_ROWS,
} from './issue-list.js';

import { getIssues, getSelectedIssueIndex, setSelectedIssueIndex } from './state.js';
import { getAssigneeById, formatAssigneeName, getAssigneeOptionList } from './assignees.js';
import { formatEstimate } from './projects.js';
import { getSprintCache } from './sprints.js';
import { formatStatus, formatPriority, formatIssueType, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { getGroupByValue, getTotalFilterCount } from './issues-view.js';

describe('issue-list', () => {
    let testIssues;

    // Helper to set test issues
    const setTestIssues = (issues) => {
        testIssues = issues;
        getIssues.mockReturnValue(testIssues);
    };

    beforeEach(() => {
        // Reset test issues
        testIssues = [];

        // Reset all mocks to defaults
        getIssues.mockReturnValue([]);
        getAssigneeById.mockReturnValue(null);
        formatAssigneeName.mockImplementation((a) => a?.name || '');
        formatEstimate.mockImplementation((e) => e ? `${e}pt` : '');
        getSprintCache.mockReturnValue({});
        formatStatus.mockImplementation((s) => s);
        formatPriority.mockImplementation((p) => p);
        formatIssueType.mockImplementation((t) => t || 'task');
        escapeHtml.mockImplementation((text) => text || '');
        escapeAttr.mockImplementation((text) => text || '');
        sanitizeColor.mockImplementation((c) => c || '#888');
        renderAvatar.mockReturnValue('<span class="avatar"></span>');
        getAssigneeOptionList.mockReturnValue([]);
        getGroupByValue.mockReturnValue('');
        getTotalFilterCount.mockReturnValue(0);
        setSelectedIssueIndex(-1);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div id="issues-list" class=""></div>
            <input id="issue-search" value="" />
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
                'task', 'bug', 'feature', 'chore', 'docs', 'tech_debt', 'refactor', 'epic'
            ]);
        });
    });

    // CHT-1897: the first rows paint with the list, the rest follow in chunks
    describe('chunked paint', () => {
        const many = (n, extra = {}) => Array.from({ length: n }, (_, i) => ({
            id: `i-${i}`, identifier: `T-${i}`, title: `Issue ${i}`, status: 'todo',
            priority: 'medium', project_id: 'p', created_at: '2026-01-01T00:00:00Z', ...extra,
        }));
        const rowCount = () => document.querySelectorAll('#issues-list .issue-row').length;
        const setWindow = (scrollY, innerHeight) => {
            Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
            Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true });
        };
        beforeEach(() => setWindow(0, 0));
        afterEach(() => setWindow(0, 768));

        it('paints a short list in one go', () => {
            setTestIssues(many(10));
            renderIssues();
            expect(rowCount()).toBe(10);
            expect(hasPendingRows()).toBe(false);
        });

        // Fake timers and frames, so the chunk sequence itself is checked and
        // no machine is too slow for it (CHT-1917).
        const drainFrames = () => {
            const counts = [rowCount()];
            while (vi.getTimerCount() > 0) {
                vi.advanceTimersToNextTimer();
                if (rowCount() !== counts[counts.length - 1]) counts.push(rowCount());
            }
            return counts;
        };
        const useFakeFrames = () => vi.useFakeTimers({
            toFake: ['setTimeout', 'clearTimeout', 'requestAnimationFrame', 'cancelAnimationFrame'],
        });
        afterEach(() => {
            cancelPendingRows();
            vi.useRealTimers();
        });

        it('paints the first rows at once and the rest in chunks on later ticks', () => {
            useFakeFrames();
            setTestIssues(many(400));
            renderIssues();
            expect(hasPendingRows()).toBe(true);
            expect(drainFrames()).toEqual([FIRST_PAINT_ROWS, 210, 360, 400]);
            const ids = [...document.querySelectorAll('#issues-list .issue-row')].map(r => r.dataset.issueId);
            expect(ids).toEqual(many(400).map(i => i.id));
        });

        it('appends everything at once on demand, for keyboard navigation', () => {
            setTestIssues(many(400));
            renderIssues();
            appendPendingRows();
            expect(rowCount()).toBe(400);
            expect(hasPendingRows()).toBe(false);
        });

        it('drops the queued rows of a superseded paint', () => {
            useFakeFrames();
            setTestIssues(many(400));
            renderIssues();
            // Same ids again, so rows left over from the first queue would
            // show up as duplicates.
            setTestIssues(many(400, { title: 'Second paint' }));
            renderIssues();
            drainFrames();
            const ids = [...document.querySelectorAll('#issues-list .issue-row')].map(r => r.dataset.issueId);
            expect(ids).toEqual(many(400).map(i => i.id));
        });

        it('appends queued rows into their own group', () => {
            getGroupByValue.mockReturnValue('status');
            const issues = [...many(50, { status: 'todo' }), ...many(50, { status: 'done' }).map(i => ({ ...i, id: `d-${i.id}` }))];
            setTestIssues(issues);
            renderIssues();
            appendPendingRows();
            const inGroup = (g) => document.querySelectorAll(`.issue-group[data-group="${g}"] .issue-row`).length;
            expect(inGroup('todo')).toBe(50);
            expect(inGroup('done')).toBe(50);
        });

        // CHT-1897 review C1: a re-paint keeps the rows down to the viewport,
        // so the document keeps its height and the scroll position holds.
        it('renders through the viewport at once when scrolled down', () => {
            setTestIssues(many(1000));
            setWindow(3000, 900);
            renderIssues();
            expect(rowCount()).toBe(Math.ceil((3000 + 1800) / 24));
            expect(hasPendingRows()).toBe(true);
        });

        // review I1
        it('drops the queue when something else replaces the list', async () => {
            setTestIssues(many(400));
            renderIssues();
            document.getElementById('issues-list').innerHTML = '<div class="skeleton"></div>';
            appendPendingRows();
            expect(rowCount()).toBe(0);
            expect(hasPendingRows()).toBe(false);
        });

        // review I2
        it('appends a queued row as it is now, not as it was when queued', () => {
            const issues = many(200);
            setTestIssues(issues);
            renderIssues();
            setTestIssues(issues.map(i => (i.id === 'i-150' ? { ...i, title: 'Renamed meanwhile' } : i)));
            appendPendingRows();
            const row = document.querySelector('#issues-list .issue-row[data-issue-id="i-150"]');
            expect(row.textContent).toContain('Renamed meanwhile');
        });

        // review M1
        it('does not move a selection made while the rows were queued', () => {
            setTestIssues(many(200));
            renderIssues();
            appendPendingRows();
            document.querySelectorAll('#issues-list .issue-row')[150].classList.add('keyboard-selected');
            setSelectedIssueIndex(150);
            renderIssues();
            const rows = document.querySelectorAll('#issues-list .issue-row');
            rows[3].classList.add('keyboard-selected');
            setSelectedIssueIndex(3);
            appendPendingRows();
            expect([...document.querySelectorAll('#issues-list .keyboard-selected')].map(r => r.dataset.issueId)).toEqual(['i-3']);
            expect(getSelectedIssueIndex()).toBe(3);
        });

        it('re-selects a queued row once it lands', () => {
            const issues = many(200);
            setTestIssues(issues);
            renderIssues();
            appendPendingRows();
            const rows = document.querySelectorAll('#issues-list .issue-row');
            rows[150].classList.add('keyboard-selected');
            setSelectedIssueIndex(150);
            renderIssues();
            expect(document.querySelector('.keyboard-selected')).toBeNull();
            appendPendingRows();
            const selected = document.querySelector('#issues-list .keyboard-selected');
            expect(selected?.dataset.issueId).toBe('i-150');
            expect(getSelectedIssueIndex()).toBe(150);
        });
    });

    describe('renderIssues', () => {
        it('shows empty state when no issues and no filters', () => {
            setTestIssues([]);
            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No issues found');
            expect(list.innerHTML).toContain('Create issue');
            expect(list.innerHTML).toContain('showCreateIssueModal');
        });

        it('shows filter-aware empty state when filters active', () => {
            setTestIssues([]);
            getTotalFilterCount.mockReturnValue(2);
            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No matching issues');
            expect(list.innerHTML).toContain('2 active filters');
            expect(list.innerHTML).toContain('Clear all');
            expect(list.innerHTML).toContain('clear-all-filters');
        });

        it('shows search-aware empty state when search active', () => {
            setTestIssues([]);
            document.getElementById('issue-search').value = 'nonexistent';
            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No matching issues');
            expect(list.innerHTML).toContain('search');
            expect(list.innerHTML).toContain('nonexistent');
            expect(list.innerHTML).toContain('Clear all');
        });

        it('shows combined empty state when both filters and search active', () => {
            setTestIssues([]);
            getTotalFilterCount.mockReturnValue(1);
            document.getElementById('issue-search').value = 'test query';
            renderIssues();

            const list = document.getElementById('issues-list');
            expect(list.innerHTML).toContain('No matching issues');
            expect(list.innerHTML).toContain('search');
            expect(list.innerHTML).toContain('1 active filter');
        });

        it('renders flat list when no grouping selected', () => {
            setTestIssues([
                { id: '1', title: 'Issue 1', status: 'todo', priority: 'medium', identifier: 'TEST-1', project_id: 'p1' },
                { id: '2', title: 'Issue 2', status: 'done', priority: 'low', identifier: 'TEST-2', project_id: 'p1' },
            ]);
            getGroupByValue.mockReturnValue('');

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
            getGroupByValue.mockReturnValue('status');

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
            getGroupByValue.mockReturnValue('priority');

            renderIssues();

            const list = document.getElementById('issues-list');
            const groups = list.querySelectorAll('.issue-group');
            expect(groups).toHaveLength(2);

            const highGroup = list.querySelector('.issue-group[data-group="high"]');
            expect(highGroup.querySelectorAll('.issue-row')).toHaveLength(2);

            const lowGroup = list.querySelector('.issue-group[data-group="low"]');
            expect(lowGroup.querySelectorAll('.issue-row')).toHaveLength(1);
        });

        // CHT-1215: renderIssues() rebuilds #issues-list innerHTML from
        // scratch on every call (websocket events, inline field edits,
        // filter changes) — the j/k keyboard-selection highlight and the
        // tracked selectedIssueIndex used to silently drift apart across
        // that rebuild.
        describe('keyboard selection survives a re-render', () => {
            const issues = [
                { id: '1', title: 'Issue 1', status: 'todo', priority: 'medium', identifier: 'TEST-1', project_id: 'p1' },
                { id: '2', title: 'Issue 2', status: 'todo', priority: 'medium', identifier: 'TEST-2', project_id: 'p1' },
                { id: '3', title: 'Issue 3', status: 'todo', priority: 'medium', identifier: 'TEST-3', project_id: 'p1' },
            ];

            function selectRowByIssueId(issueId, index) {
                setSelectedIssueIndex(index);
                document.querySelector(`.issue-row[data-issue-id="${issueId}"]`)?.classList.add('keyboard-selected');
            }

            it('does nothing when no row was previously selected', () => {
                setTestIssues(issues);
                renderIssues();

                expect(document.querySelectorAll('.issue-row.keyboard-selected')).toHaveLength(0);
                expect(getSelectedIssueIndex()).toBe(-1);
            });

            it('re-applies the highlight at the same index after an in-place re-render', () => {
                setTestIssues(issues);
                renderIssues();
                selectRowByIssueId('2', 1);

                // Simulate a websocket-triggered re-render with the same issues
                renderIssues();

                const selected = document.querySelectorAll('.issue-row.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.issueId).toBe('2');
                expect(getSelectedIssueIndex()).toBe(1);
            });

            it('follows the selected issue by id when the list is reordered', () => {
                setTestIssues(issues);
                renderIssues();
                selectRowByIssueId('2', 1);

                // Issue 2 moves to the front (e.g. re-sorted after an update)
                setTestIssues([issues[1], issues[0], issues[2]]);
                renderIssues();

                const selected = document.querySelectorAll('.issue-row.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.issueId).toBe('2');
                expect(getSelectedIssueIndex()).toBe(0);
            });

            it('clamps to the new last row when the selected issue is removed', () => {
                setTestIssues(issues);
                renderIssues();
                selectRowByIssueId('3', 2);

                // Issue 3 (last, selected) is removed by a filter change
                setTestIssues([issues[0], issues[1]]);
                renderIssues();

                const selected = document.querySelectorAll('.issue-row.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.issueId).toBe('2');
                expect(getSelectedIssueIndex()).toBe(1);
            });

            it('resets to -1 when the re-render leaves an empty list', () => {
                setTestIssues(issues);
                renderIssues();
                selectRowByIssueId('1', 0);

                setTestIssues([]);
                renderIssues();

                expect(document.querySelectorAll('.issue-row.keyboard-selected')).toHaveLength(0);
                expect(getSelectedIssueIndex()).toBe(-1);
            });
        });
    });

    describe('renderIssueRow', () => {
        it('renders a zero-point estimate instead of hiding it (CHT-1406)', () => {
            const issue = {
                id: 'issue-0', title: 'Zero', identifier: 'TEST-0', status: 'todo', priority: 'medium',
                issue_type: 'task', project_id: 'p1', created_at: '2024-01-15T10:00:00Z', estimate: 0,
            };
            formatEstimate.mockImplementation((e) => (e === null || e === undefined ? '' : `${e} points`));
            expect(formatEstimate).not.toHaveBeenCalled();
            expect(renderIssueRow(issue)).toContain('0 points');
            expect(formatEstimate).toHaveBeenCalledWith(0, 'p1');
            formatEstimate.mockClear();
            expect(renderIssueRow({ ...issue, estimate: null })).not.toContain('0 points');
            expect(formatEstimate).not.toHaveBeenCalled();
        });

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
            getAssigneeById.mockReturnValue(assignee);
            formatAssigneeName.mockReturnValue('John Doe');

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

            expect(getAssigneeById).toHaveBeenCalledWith('user-1');
            expect(renderAvatar).toHaveBeenCalled();
        });

        it('renders labels when present', () => {
            sanitizeColor.mockReturnValue('#ff0000');
            escapeHtml.mockImplementation((t) => t);

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
            getSprintCache.mockReturnValue({
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
            formatEstimate.mockReturnValue('3pt');

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

        // CHT-1212: search results gave no indication when the match was
        // only in the (hidden) description
        describe('search match indication (CHT-1212)', () => {
            it('renders plain escaped title when there is no search query', () => {
                document.getElementById('issue-search').value = '';
                const issue = {
                    id: 'i-1', title: 'Fix login bug', identifier: 'TEST-1',
                    status: 'todo', priority: 'medium', project_id: 'p1',
                    created_at: '2024-01-15T10:00:00Z',
                };
                const html = renderIssueRow(issue);
                expect(html).not.toContain('search-match');
                expect(html).toContain('Fix login bug');
            });

            it('highlights the matched substring in the title', () => {
                document.getElementById('issue-search').value = 'login';
                const issue = {
                    id: 'i-1', title: 'Fix login bug', identifier: 'TEST-1',
                    status: 'todo', priority: 'medium', project_id: 'p1',
                    created_at: '2024-01-15T10:00:00Z',
                };
                const html = renderIssueRow(issue);
                expect(html).toContain('<mark class="search-match">login</mark>');
            });

            it('shows a description snippet when the title does not match but the description does', () => {
                document.getElementById('issue-search').value = 'oauth';
                const issue = {
                    id: 'i-1', title: 'Fix login bug', identifier: 'TEST-1',
                    description: 'Turns out the OAuth callback drops the state param.',
                    status: 'todo', priority: 'medium', project_id: 'p1',
                    created_at: '2024-01-15T10:00:00Z',
                };
                const html = renderIssueRow(issue);
                expect(html).toContain('issue-search-snippet');
                expect(html).toContain('<mark class="search-match">OAuth</mark>');
            });

            it('does not show a description snippet when the title already matches', () => {
                document.getElementById('issue-search').value = 'login';
                const issue = {
                    id: 'i-1', title: 'Fix login bug', identifier: 'TEST-1',
                    description: 'Some unrelated description mentioning login too.',
                    status: 'todo', priority: 'medium', project_id: 'p1',
                    created_at: '2024-01-15T10:00:00Z',
                };
                const html = renderIssueRow(issue);
                expect(html).not.toContain('issue-search-snippet');
            });

            it('does not show a snippet when neither title nor description match (e.g. identifier-only match)', () => {
                document.getElementById('issue-search').value = 'test-1';
                const issue = {
                    id: 'i-1', title: 'Fix login bug', identifier: 'TEST-1',
                    description: 'Nothing relevant here.',
                    status: 'todo', priority: 'medium', project_id: 'p1',
                    created_at: '2024-01-15T10:00:00Z',
                };
                const html = renderIssueRow(issue);
                expect(html).not.toContain('issue-search-snippet');
            });
        });
    });

    describe('highlightSearchMatch', () => {
        it('returns escaped text unchanged when there is no query', () => {
            expect(highlightSearchMatch('Fix login bug', '')).toBe('Fix login bug');
        });

        it('returns empty string for falsy text', () => {
            expect(highlightSearchMatch('', 'login')).toBe('');
            expect(highlightSearchMatch(null, 'login')).toBe('');
        });

        it('wraps the first case-insensitive match in <mark>', () => {
            expect(highlightSearchMatch('Fix Login bug', 'login'))
                .toBe('Fix <mark class="search-match">Login</mark> bug');
        });

        it('returns escaped text unchanged when there is no match', () => {
            expect(highlightSearchMatch('Fix login bug', 'zzz')).toBe('Fix login bug');
        });
    });

    describe('getDescriptionSnippet', () => {
        it('returns null when there is no match', () => {
            expect(getDescriptionSnippet('Nothing relevant here.', 'zzz')).toBeNull();
        });

        it('returns null for missing description or query', () => {
            expect(getDescriptionSnippet('', 'login')).toBeNull();
            expect(getDescriptionSnippet('Some text', '')).toBeNull();
        });

        it('highlights the match within the excerpt', () => {
            const snippet = getDescriptionSnippet('Turns out the OAuth callback drops the state param.', 'oauth');
            expect(snippet).toContain('<mark class="search-match">OAuth</mark>');
        });

        it('prefixes with an ellipsis when the match is not at the start', () => {
            const description = 'x'.repeat(60) + 'oauth' + 'y'.repeat(60);
            const snippet = getDescriptionSnippet(description, 'oauth', 10);
            expect(snippet.startsWith('…')).toBe(true);
            expect(snippet.endsWith('…')).toBe(true);
        });

        it('does not prefix with an ellipsis when the match is near the start', () => {
            const snippet = getDescriptionSnippet('oauth callback drops state', 'oauth', 10);
            expect(snippet.startsWith('…')).toBe(false);
        });
    });

    describe('toggleGroup', () => {
        it('toggles collapsed class on group element', () => {
            document.body.innerHTML = `
                <div id="issues-list"><div class="issue-group" data-group="todo"></div></div>
            `;

            toggleGroup('todo');
            expect(document.querySelector('.issue-group').classList.contains('collapsed')).toBe(true);

            toggleGroup('todo');
            expect(document.querySelector('.issue-group').classList.contains('collapsed')).toBe(false);
        });

        describe('across a re-render (CHT-1923)', () => {
            const grouped = [
                { id: 'i1', identifier: 'T-1', title: 'One', status: 'todo', priority: 'high' },
                { id: 'i2', identifier: 'T-2', title: 'Two', status: 'done', priority: 'low' },
            ];
            beforeEach(() => {
                clearCollapsedGroups();
                document.body.innerHTML = '<div id="issues-list"></div>';
                setTestIssues(grouped);
                getGroupByValue.mockReturnValue('status');
            });
            afterEach(() => {
                clearCollapsedGroups();
                getGroupByValue.mockReturnValue('');
            });
            const isCollapsed = (key) => document.querySelector(`.issue-group[data-group="${key}"]`).classList.contains('collapsed');

            it('keeps a collapsed group collapsed', () => {
                renderIssues();
                toggleGroup('done');
                renderIssues();
                expect(isCollapsed('done')).toBe(true);
                expect(isCollapsed('todo')).toBe(false);
            });

            it('opens it again once expanded', () => {
                renderIssues();
                toggleGroup('done');
                toggleGroup('done');
                renderIssues();
                expect(isCollapsed('done')).toBe(false);
            });

            it('gives a collapsed group none of the first paint, and paints it on expand (review I1)', () => {
                const many = Array.from({ length: 100 }, (_, n) => (
                    { id: `b${n}`, identifier: `T-${n}`, title: `B${n}`, status: 'backlog', priority: 'low' }));
                setTestIssues([...many, ...grouped]);
                renderIssues();
                toggleGroup('backlog');
                renderIssues();
                const painted = (key) => document.querySelectorAll(
                    `.issue-group[data-group="${key}"] .issue-row`).length;
                expect(painted('todo')).toBe(1);
                expect(painted('done')).toBe(1);
                expect(painted('backlog')).toBe(0);
                toggleGroup('backlog');
                expect(painted('backlog')).toBe(100);
            });

            it('opens a collapsed group the selected row has just moved into (review I3)', () => {
                renderIssues();
                toggleGroup('done');
                document.querySelector('.issue-row[data-issue-id="i1"]').classList.add('keyboard-selected');
                setTestIssues([{ ...grouped[0], status: 'done' }, grouped[1]]);
                renderIssues();
                expect(isCollapsed('done')).toBe(false);
            });

            it('keeps a group collapsed that already held the selected row', () => {
                renderIssues();
                document.querySelector('.issue-row[data-issue-id="i2"]').classList.add('keyboard-selected');
                toggleGroup('done');
                renderIssues();
                expect(isCollapsed('done')).toBe(true);
            });

            it('remembers collapsed groups per group-by choice', () => {
                renderIssues();
                toggleGroup('done');
                getGroupByValue.mockReturnValue('priority');
                renderIssues();
                expect(document.querySelectorAll('.issue-group.collapsed')).toHaveLength(0);
                getGroupByValue.mockReturnValue('status');
                renderIssues();
                expect(isCollapsed('done')).toBe(true);
            });
        });

        it('does nothing if group not found', () => {
            document.body.innerHTML = `
                <div class="issue-group" data-group="todo"></div>
            `;

            // Should not throw
            toggleGroup('nonexistent');
        });
    });

    describe('focus across a re-render (CHT-1923)', () => {
        beforeEach(() => {
            document.body.innerHTML = '<div id="issues-list"></div>';
            setTestIssues([
                { id: 'i1', identifier: 'T-1', title: 'One', status: 'todo', priority: 'high' },
                { id: 'i2', identifier: 'T-2', title: 'Two', status: 'todo', priority: 'low' },
            ]);
            getGroupByValue.mockReturnValue('');
        });
        const rowOf = (id) => document.querySelector(`#issues-list .issue-row[data-issue-id="${id}"]`);

        it('puts focus back on the same trigger of the same issue', () => {
            renderIssues();
            const trigger = rowOf('i2').querySelector('[data-dropdown-type="priority"]');
            expect(trigger).not.toBeNull();
            trigger.focus();
            renderIssues();
            expect(document.activeElement).not.toBe(trigger); // a new element
            expect(document.activeElement).toBe(rowOf('i2').querySelector('[data-dropdown-type="priority"]'));
        });

        it('puts focus back on the title link, not the first button (review I2)', () => {
            renderIssues();
            const title = rowOf('i2').querySelector('.issue-title');
            title.focus();
            renderIssues();
            expect(document.activeElement).toBe(rowOf('i2').querySelector('.issue-title'));
        });

        it('focuses a row that was still queued once it lands (review M5)', () => {
            renderIssues();
            rowOf('i2').querySelector('.issue-title').focus();
            const many = Array.from({ length: 200 }, (_, n) => (
                { id: `x${n}`, identifier: `X-${n}`, title: `X${n}`, status: 'todo', priority: 'low' }));
            setTestIssues([...many, { id: 'i2', identifier: 'T-2', title: 'Two', status: 'todo', priority: 'low' }]);
            renderIssues();
            expect(rowOf('i2')).toBeNull();
            appendPendingRows();
            expect(document.activeElement).toBe(rowOf('i2').querySelector('.issue-title'));
        });

        it('leaves focus alone when nothing in the list had it', () => {
            const outside = document.createElement('input');
            document.body.appendChild(outside);
            outside.focus();
            renderIssues();
            renderIssues();
            expect(document.activeElement).toBe(outside);
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
            getGroupByValue.mockReturnValue('status');
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            expect(html).toContain('issue-list-summary');
            expect(html).toContain('3 issues');
            expect(html).toContain('8pt');
        });

        it('shows points per group in group headers', () => {
            setTestIssues(issuesWithEstimates);
            getGroupByValue.mockReturnValue('status');
            renderIssues();

            const html = document.getElementById('issues-list').innerHTML;
            // todo group has 2 issues (3pt + 5pt = 8pt)
            const todoGroup = html.match(/data-group="todo"[\s\S]*?<\/div>/);
            expect(todoGroup[0]).toContain('group-points');
            expect(todoGroup[0]).toContain('8pt');
        });

        it('shows points per group when grouped by priority', () => {
            setTestIssues(issuesWithEstimates);
            getGroupByValue.mockReturnValue('priority');
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
