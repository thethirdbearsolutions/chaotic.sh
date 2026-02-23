/**
 * Tests for board.js module (CHT-665)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getIssues: vi.fn(),
        updateIssue: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
}));

vi.mock('./url-helpers.js', () => ({
    getProjectFromUrl: vi.fn(() => null),
    updateUrlWithProject: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((text) => text),
    escapeAttr: vi.fn((text) => text),
    formatPriority: vi.fn((p) => p),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

import { setState } from './state.js';
import { api } from './api.js';
import { showToast } from './ui.js';
import {
    BOARD_STATUSES,
    getBoardIssues,
    setBoardIssues,
    loadBoard,
    renderBoard,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    reorderBoardIssues,
} from './board.js';

describe('board', () => {
    beforeEach(() => {
        // Reset board state
        setBoardIssues([]);
        vi.clearAllMocks();

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
            api.getIssues.mockResolvedValue(mockIssues);
            setState('currentProject', 'project-123');

            await loadBoard();

            expect(api.getIssues).toHaveBeenCalledWith({ project_id: 'project-123' });
            expect(getBoardIssues()).toEqual(mockIssues);
        });

        it('shows error toast on API failure', async () => {
            api.getIssues.mockRejectedValue(new Error('API Error'));
            setState('currentProject', 'project-123');

            await loadBoard();

            expect(showToast).toHaveBeenCalledWith('Failed to load board: API Error', 'error');
        });
    });

    describe('renderBoard', () => {
        it('renders columns for each status with correct headers', () => {
            setBoardIssues([]);
            renderBoard();

            const columns = document.querySelectorAll('.kanban-column');
            expect(columns).toHaveLength(5);

            const columnStatuses = Array.from(columns).map(c => c.dataset.status);
            expect(columnStatuses).toEqual(['backlog', 'todo', 'in_progress', 'in_review', 'done']);
        });

        it('renders issues in correct columns with card content', () => {
            setBoardIssues([
                { id: '1', title: 'Todo Issue', status: 'todo', identifier: 'TEST-1', priority: 'medium' },
                { id: '2', title: 'Done Issue', status: 'done', identifier: 'TEST-2', priority: 'low' },
            ]);
            renderBoard();

            const todoColumn = document.querySelector('.kanban-column[data-status="todo"]');
            const doneColumn = document.querySelector('.kanban-column[data-status="done"]');
            const backlogColumn = document.querySelector('.kanban-column[data-status="backlog"]');

            expect(todoColumn.querySelectorAll('.kanban-card')).toHaveLength(1);
            expect(doneColumn.querySelectorAll('.kanban-card')).toHaveLength(1);
            expect(backlogColumn.querySelectorAll('.kanban-card')).toHaveLength(0);

            const todoCard = todoColumn.querySelector('.kanban-card');
            expect(todoCard.textContent).toContain('Todo Issue');
            expect(todoCard.textContent).toContain('TEST-1');
            expect(todoCard.dataset.id).toBe('1');

            const doneCard = doneColumn.querySelector('.kanban-card');
            expect(doneCard.textContent).toContain('Done Issue');
            expect(doneCard.textContent).toContain('TEST-2');
        });

        it('shows empty state for columns without issues', () => {
            setBoardIssues([]);
            renderBoard();

            const emptyStates = document.querySelectorAll('.kanban-column-empty');
            expect(emptyStates).toHaveLength(5);
        });

        it('renders multiple issues in same column in order', () => {
            setBoardIssues([
                { id: '1', title: 'First', status: 'todo', identifier: 'TEST-1', priority: 'high' },
                { id: '2', title: 'Second', status: 'todo', identifier: 'TEST-2', priority: 'low' },
                { id: '3', title: 'Third', status: 'todo', identifier: 'TEST-3', priority: 'medium' },
            ]);
            renderBoard();

            const todoColumn = document.querySelector('.kanban-column[data-status="todo"]');
            const cards = todoColumn.querySelectorAll('.kanban-card');
            expect(cards).toHaveLength(3);
            expect(cards[0].textContent).toContain('First');
            expect(cards[1].textContent).toContain('Second');
            expect(cards[2].textContent).toContain('Third');
        });
    });

    describe('drag and drop', () => {
        it('handleDragStart sets dragging state', () => {
            const mockTarget = {
                dataset: { id: 'issue-1' },
                classList: { add: vi.fn() },
            };
            const mockEvent = {
                dataTransfer: { setData: vi.fn() },
            };

            handleDragStart(mockEvent, mockTarget);

            expect(mockEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'issue-1');
            expect(mockTarget.classList.add).toHaveBeenCalledWith('dragging');
        });

        it('handleDragEnd clears dragging state', () => {
            const mockTarget = {
                classList: { remove: vi.fn() },
            };
            const mockEvent = {};

            handleDragEnd(mockEvent, mockTarget);

            expect(mockTarget.classList.remove).toHaveBeenCalledWith('dragging');
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
            api.updateIssue.mockResolvedValue({ id: '1', status: 'done' });

            const mockTarget = {
                dataset: { status: 'done' },
                classList: { remove: vi.fn() },
            };
            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
            };

            await handleDrop(mockEvent, mockTarget);

            expect(api.updateIssue).toHaveBeenCalledWith('1', { status: 'done' });
            expect(showToast).toHaveBeenCalledWith('Status updated', 'success');
        });

        it('reverts status on API error', async () => {
            api.updateIssue.mockRejectedValue(new Error('Update failed'));

            const mockTarget = {
                dataset: { status: 'done' },
                classList: { remove: vi.fn() },
            };
            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
            };

            await handleDrop(mockEvent, mockTarget);

            expect(showToast).toHaveBeenCalledWith('Failed to update status: Update failed', 'error');
            // Issue should be reverted to original status
            expect(getBoardIssues().find(i => i.id === '1').status).toBe('todo');
        });

        it('does nothing when status unchanged', async () => {
            const mockTarget = {
                dataset: { status: 'todo' }, // Same as current
                classList: { remove: vi.fn() },
            };
            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
            };

            await handleDrop(mockEvent, mockTarget);

            expect(api.updateIssue).not.toHaveBeenCalled();
        });
    });
});
