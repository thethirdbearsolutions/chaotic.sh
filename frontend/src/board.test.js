/**
 * Tests for board.js module (CHT-665)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    BOARD_STATUSES,
    getBoardIssues,
    setBoardIssues,
    setDependencies,
    loadBoard,
    renderBoard,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    reorderBoardIssues,
} from './board.js';

describe('board', () => {
    let mockApi;
    let mockDeps;

    beforeEach(() => {
        // Reset board state
        setBoardIssues([]);

        // Mock API
        mockApi = {
            getIssues: vi.fn(),
            updateIssue: vi.fn(),
        };

        // Mock dependencies
        mockDeps = {
            api: mockApi,
            showToast: vi.fn(),
            getProjects: vi.fn(() => []),
            getProjectFromUrl: vi.fn(() => null),
            setGlobalProjectSelection: vi.fn(),
            updateUrlWithProject: vi.fn(),
            escapeHtml: vi.fn((text) => text),
            formatPriority: vi.fn((p) => p),
        };

        setDependencies(mockDeps);

        // Setup minimal DOM
        document.body.innerHTML = `
            <select id="board-project-filter"></select>
            <div id="kanban-board"></div>
        `;
    });

    describe('BOARD_STATUSES', () => {
        it('contains the expected statuses', () => {
            expect(BOARD_STATUSES).toHaveLength(5);
            expect(BOARD_STATUSES.map(s => s.key)).toEqual([
                'backlog', 'todo', 'in_progress', 'in_review', 'done'
            ]);
        });

        it('has label for each status', () => {
            BOARD_STATUSES.forEach(status => {
                expect(status.label).toBeDefined();
                expect(typeof status.label).toBe('string');
            });
        });
    });

    describe('getBoardIssues/setBoardIssues', () => {
        it('allows getting and setting board issues', () => {
            expect(getBoardIssues()).toEqual([]);

            const issues = [{ id: '1', title: 'Test' }];
            setBoardIssues(issues);

            expect(getBoardIssues()).toEqual(issues);
        });
    });

    describe('loadBoard', () => {
        it('loads issues from API and calls renderBoard', async () => {
            const mockIssues = [
                { id: '1', title: 'Issue 1', status: 'todo' },
                { id: '2', title: 'Issue 2', status: 'done' },
            ];
            mockApi.getIssues.mockResolvedValue(mockIssues);

            await loadBoard('project-123');

            expect(mockApi.getIssues).toHaveBeenCalledWith({ project_id: 'project-123' });
            expect(getBoardIssues()).toEqual(mockIssues);
        });

        it('shows error toast on API failure', async () => {
            mockApi.getIssues.mockRejectedValue(new Error('API Error'));

            await loadBoard('project-123');

            expect(mockDeps.showToast).toHaveBeenCalledWith('API Error', 'error');
        });
    });

    describe('renderBoard', () => {
        it('renders columns for each status', () => {
            setBoardIssues([]);
            renderBoard();

            const columns = document.querySelectorAll('.kanban-column');
            expect(columns).toHaveLength(5);
        });

        it('renders issues in correct columns', () => {
            setBoardIssues([
                { id: '1', title: 'Todo Issue', status: 'todo', identifier: 'TEST-1', priority: 'medium' },
                { id: '2', title: 'Done Issue', status: 'done', identifier: 'TEST-2', priority: 'low' },
            ]);
            renderBoard();

            const todoColumn = document.querySelector('.kanban-column[data-status="todo"]');
            const doneColumn = document.querySelector('.kanban-column[data-status="done"]');

            expect(todoColumn.querySelectorAll('.kanban-card')).toHaveLength(1);
            expect(doneColumn.querySelectorAll('.kanban-card')).toHaveLength(1);
        });

        it('shows empty state for columns without issues', () => {
            setBoardIssues([]);
            renderBoard();

            const emptyStates = document.querySelectorAll('.kanban-column-empty');
            expect(emptyStates).toHaveLength(5);
        });
    });

    describe('drag and drop', () => {
        it('handleDragStart sets dragging state', () => {
            const mockEvent = {
                dataTransfer: { setData: vi.fn() },
                target: {
                    dataset: { id: 'issue-1' },
                    classList: { add: vi.fn() },
                },
            };

            handleDragStart(mockEvent);

            expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'issue-1');
            expect(mockEvent.target.classList.add).toHaveBeenCalledWith('dragging');
        });

        it('handleDragEnd clears dragging state', () => {
            const mockEvent = {
                target: {
                    classList: { remove: vi.fn() },
                },
            };

            handleDragEnd(mockEvent);

            expect(mockEvent.target.classList.remove).toHaveBeenCalledWith('dragging');
        });
    });

    describe('reorderBoardIssues', () => {
        it('moves issue to end of column when no target', () => {
            setBoardIssues([
                { id: '1', status: 'todo' },
                { id: '2', status: 'todo' },
                { id: '3', status: 'done' },
            ]);

            // Move issue 1 to 'done' status (it was already set as done externally before calling)
            const issues = getBoardIssues();
            issues.find(i => i.id === '1').status = 'done';
            setBoardIssues(issues);

            reorderBoardIssues('done', '1');

            const doneIssues = getBoardIssues().filter(i => i.status === 'done');
            expect(doneIssues.map(i => i.id)).toEqual(['3', '1']);
        });

        it('inserts issue before target when target specified', () => {
            setBoardIssues([
                { id: '1', status: 'done' },
                { id: '2', status: 'done' },
                { id: '3', status: 'todo' },
            ]);

            // Move issue 3 to 'done' before issue 2
            const issues = getBoardIssues();
            issues.find(i => i.id === '3').status = 'done';
            setBoardIssues(issues);

            reorderBoardIssues('done', '3', '2');

            const doneIssues = getBoardIssues().filter(i => i.status === 'done');
            expect(doneIssues.map(i => i.id)).toEqual(['1', '3', '2']);
        });
    });

    describe('handleDrop', () => {
        beforeEach(() => {
            setBoardIssues([
                { id: '1', title: 'Test', status: 'todo', identifier: 'TEST-1', priority: 'medium' },
            ]);
        });

        it('updates issue status on drop', async () => {
            mockApi.updateIssue.mockResolvedValue({ id: '1', status: 'done' });

            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
                currentTarget: {
                    dataset: { status: 'done' },
                    classList: { remove: vi.fn() },
                },
            };

            await handleDrop(mockEvent);

            expect(mockApi.updateIssue).toHaveBeenCalledWith('1', { status: 'done' });
            expect(mockDeps.showToast).toHaveBeenCalledWith('Status updated', 'success');
        });

        it('reverts status on API error', async () => {
            mockApi.updateIssue.mockRejectedValue(new Error('Update failed'));

            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
                currentTarget: {
                    dataset: { status: 'done' },
                    classList: { remove: vi.fn() },
                },
            };

            await handleDrop(mockEvent);

            expect(mockDeps.showToast).toHaveBeenCalledWith('Update failed', 'error');
            // Issue should be reverted to original status
            expect(getBoardIssues().find(i => i.id === '1').status).toBe('todo');
        });

        it('does nothing when status unchanged', async () => {
            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
                currentTarget: {
                    dataset: { status: 'todo' }, // Same as current
                    classList: { remove: vi.fn() },
                },
            };

            await handleDrop(mockEvent);

            expect(mockApi.updateIssue).not.toHaveBeenCalled();
        });
    });
});
