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
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
}));

vi.mock('./url-helpers.js', () => ({
    getProjectFromUrl: vi.fn(() => null),
    updateUrlWithProject: vi.fn(),
}));

// Real debounce() is kept (via importOriginal) so scheduleBoardRefresh's
// coalescing behavior (CHT-1225) can actually be exercised below.
vi.mock('./utils.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        escapeHtml: vi.fn((text) => text),
        escapeAttr: vi.fn((text) => text),
        formatPriority: vi.fn((p) => p),
    };
});

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

import { setState, getSelectedBoardIndex, setSelectedBoardIndex, getDetailNavContext } from './state.js';
import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import { getProjects } from './projects.js';
import {
    BOARD_STATUSES,
    getBoardIssues,
    setBoardIssues,
    loadBoard,
    renderBoard,
    scheduleBoardRefresh,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleCardDrop,
    handleDragOver,
    handleCardDragOver,
} from './board.js';

// Actions registered at module import time — capture before vi.clearAllMocks wipes them
const boardActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('board', () => {
    beforeEach(() => {
        // Reset board state
        setBoardIssues([]);
        vi.clearAllMocks();

        // Reset shared state the CHT-1211 nav-context tests touch
        setState('currentView', 'board');
        setState('detailNavContext', []);

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

            expect(showApiError).toHaveBeenCalledWith('load board', expect.objectContaining({ message: 'API Error' }));
        });

        // CHT-1224: the error copy said "try again" but shipped no button.
        it('renders a Retry cta on failure and wires it to reload the board', async () => {
            api.getIssues.mockRejectedValue(new Error('API Error'));
            setState('currentProject', 'project-123');

            await loadBoard();

            const board = document.getElementById('kanban-board');
            expect(board.innerHTML).toContain('data-action="retry-load-board"');
            // CHT-1224: error state visually distinguishable from empty state
            expect(board.innerHTML).toContain('empty-state-error');

            api.getIssues.mockResolvedValue([]);
            await boardActions['retry-load-board']();
            expect(api.getIssues).toHaveBeenCalledTimes(2);
        });

        // CHT-1226: board.js didn't distinguish "no project selected" from
        // "zero projects exist" the way issues-view.js does.
        it('shows a "no projects yet" CTA when no project is selected and the team has zero projects', async () => {
            setState('currentProject', null);
            getProjects.mockReturnValueOnce([]);

            await loadBoard();

            const board = document.getElementById('kanban-board');
            expect(board.innerHTML).toContain('No projects yet');
            expect(board.innerHTML).toContain('data-action="showCreateProjectModal"');
        });

        it('shows the generic "select a project" state when projects exist but none is selected', async () => {
            setState('currentProject', null);
            getProjects.mockReturnValueOnce([{ id: 'p1' }, { id: 'p2' }]);

            await loadBoard();

            const board = document.getElementById('kanban-board');
            expect(board.innerHTML).toContain('Select a project');
            expect(board.innerHTML).not.toContain('No projects yet');
        });

        // CHT-1211 item 2: issue-detail prev/next should page through the
        // Board's own list when opened from Board, not the stale/empty
        // Issues-view-only global issues array.
        it('sets the detail nav context to the board issue list', async () => {
            const mockIssues = [
                { id: '1', title: 'Issue 1', status: 'todo' },
                { id: '2', title: 'Issue 2', status: 'done' },
            ];
            api.getIssues.mockResolvedValue(mockIssues);
            setState('currentProject', 'project-123');
            setState('currentView', 'board');

            await loadBoard();

            expect(getDetailNavContext()).toEqual(mockIssues);
        });

        // CHT-1211 review #2: the request id only orders loadBoard() against
        // itself — the context write must also require Board to still be the
        // current view when the response arrives.
        it('does not write the detail nav context when the user has navigated away', async () => {
            const boardIssuesList = [{ id: 'b1', title: 'B1', status: 'todo' }];
            api.getIssues.mockResolvedValue(boardIssuesList);
            setState('currentProject', 'project-123');
            setState('currentView', 'issues'); // user is no longer on Board

            await loadBoard();

            expect(getDetailNavContext()).toEqual([]);
            // Board's own local state still updates
            expect(getBoardIssues()).toEqual(boardIssuesList);
        });

        // CHT-1211 item 7: a stale response from a superseded loadBoard()
        // call (rapid project switching) must not overwrite newer data.
        describe('request sequencing (out-of-order responses)', () => {
            it('drops a slow response from an earlier project switch', async () => {
                let resolveFirst;
                const firstRequest = new Promise((resolve) => { resolveFirst = resolve; });
                const projectAIssues = [{ id: 'a1', title: 'A1', status: 'todo' }];
                const projectBIssues = [{ id: 'b1', title: 'B1', status: 'todo' }];

                api.getIssues.mockImplementationOnce(() => firstRequest);
                setState('currentProject', 'project-A');
                const firstLoad = loadBoard(); // in flight, slow

                api.getIssues.mockImplementationOnce(() => Promise.resolve(projectBIssues));
                setState('currentProject', 'project-B');
                await loadBoard(); // resolves first (faster)

                expect(getBoardIssues()).toEqual(projectBIssues);

                // The slow first request now resolves — must be dropped, not
                // overwrite the already-current Project B data.
                resolveFirst(projectAIssues);
                await firstLoad;

                expect(getBoardIssues()).toEqual(projectBIssues);
            });

            // CHT-1211 review #2: the board→issues cross-view race. A slow
            // loadBoard() response passes its own request-id check (nobody
            // called loadBoard() again) but must NOT clobber the fresher
            // context the Issues view wrote in the meantime.
            it('does not clobber another view\'s context with a slow cross-view response', async () => {
                let resolveBoard;
                const slowBoardRequest = new Promise((resolve) => { resolveBoard = resolve; });
                const boardIssuesList = [{ id: 'b1', title: 'Board 1', status: 'todo' }];
                const issuesList = [{ id: 'i1', title: 'Issue 1', status: 'todo' }];

                // User on Board, project switch fires a slow loadBoard()
                setState('currentView', 'board');
                setState('currentProject', 'project-A');
                api.getIssues.mockImplementationOnce(() => slowBoardRequest);
                const boardLoad = loadBoard();

                // User navigates to Issues; its loader resolves fast and
                // writes the correct context (simulated directly here)
                setState('currentView', 'issues');
                setState('detailNavContext', issuesList);

                // Board's stale response finally arrives — request id still
                // matches (no newer loadBoard()), but the view has changed
                resolveBoard(boardIssuesList);
                await boardLoad;

                expect(getDetailNavContext()).toEqual(issuesList);
            });
        });

        // CHT-1215 review finding 3: the skeleton wipe destroys the
        // .keyboard-selected card before renderBoard() can re-find it by id,
        // so the stale index would positionally clamp into the NEW project's
        // cards — Enter could then open the wrong issue.
        describe('keyboard cursor reset (project/view switch)', () => {
            it('resets the board cursor before loading a new project', async () => {
                // Project A: select card index 2 (id '3')
                setBoardIssues([
                    { id: '1', title: 'A1', status: 'todo', identifier: 'A-1', priority: 'low' },
                    { id: '2', title: 'A2', status: 'todo', identifier: 'A-2', priority: 'low' },
                    { id: '3', title: 'A3', status: 'done', identifier: 'A-3', priority: 'low' },
                ]);
                renderBoard();
                setSelectedBoardIndex(2);
                document.querySelector('.kanban-card[data-id="3"]').classList.add('keyboard-selected');

                // Switch to Project B with different cards
                api.getIssues.mockResolvedValue([
                    { id: 'b1', title: 'B1', status: 'todo', identifier: 'B-1', priority: 'low' },
                    { id: 'b2', title: 'B2', status: 'todo', identifier: 'B-2', priority: 'low' },
                    { id: 'b3', title: 'B3', status: 'todo', identifier: 'B-3', priority: 'low' },
                ]);
                setState('currentProject', 'project-B');
                await loadBoard();

                // No card in Project B inherits Project A's positional cursor
                expect(document.querySelectorAll('.kanban-card.keyboard-selected')).toHaveLength(0);
                expect(getSelectedBoardIndex()).toBe(-1);
            });

            it('resets the cursor even when the new project has no board element content', async () => {
                setSelectedBoardIndex(1);
                setState('currentProject', null);

                await loadBoard();

                expect(getSelectedBoardIndex()).toBe(-1);
            });
        });
    });

    // CHT-1225 items 1/6: ws-handlers.js calls scheduleBoardRefresh() (not
    // loadBoard() directly) for issue created/updated/deleted so a batch
    // mutation broadcasting one event per issue doesn't fire one concurrent
    // fetch per event.
    describe('scheduleBoardRefresh', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('coalesces rapid calls into a single loadBoard()', async () => {
            api.getIssues.mockResolvedValue([]);
            // Set currentProject while NOT on the board view, then switch to
            // board -- avoids the pre-existing CHT-1083 reactive subscriber
            // (board.js's own `subscribe((key) => ... loadBoard())`) firing
            // an unrelated immediate loadBoard() on the currentProject write
            // itself, which would confound this debounce assertion.
            setState('currentView', 'issues');
            setState('currentProject', 'project-123');
            setState('currentView', 'board');
            api.getIssues.mockClear();

            scheduleBoardRefresh();
            scheduleBoardRefresh();
            scheduleBoardRefresh();

            expect(api.getIssues).not.toHaveBeenCalled();

            await vi.advanceTimersByTimeAsync(200);

            expect(api.getIssues).toHaveBeenCalledTimes(1);
        });

        it('eventually calls loadBoard()', async () => {
            const mockIssues = [{ id: '1', title: 'Issue 1', status: 'todo' }];
            api.getIssues.mockResolvedValue(mockIssues);
            setState('currentView', 'issues');
            setState('currentProject', 'project-123');
            setState('currentView', 'board');

            scheduleBoardRefresh();
            await vi.advanceTimersByTimeAsync(200);

            expect(getBoardIssues()).toEqual(mockIssues);
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

        // CHT-1215: renderBoard() rebuilds #kanban-board innerHTML from
        // scratch on every call (drag/drop, websocket updates) — same
        // staleness bug as issue-list.js's renderIssues() had for the j/k
        // cursor, fixed here proactively alongside adding the new cursor.
        describe('keyboard selection survives a re-render', () => {
            const issues = [
                { id: '1', title: 'First', status: 'todo', identifier: 'TEST-1', priority: 'high' },
                { id: '2', title: 'Second', status: 'todo', identifier: 'TEST-2', priority: 'low' },
                { id: '3', title: 'Third', status: 'done', identifier: 'TEST-3', priority: 'medium' },
            ];

            beforeEach(() => {
                setSelectedBoardIndex(-1);
            });

            function selectCardById(id, index) {
                setSelectedBoardIndex(index);
                document.querySelector(`.kanban-card[data-id="${id}"]`)?.classList.add('keyboard-selected');
            }

            it('does nothing when no card was previously selected', () => {
                setBoardIssues(issues);
                renderBoard();

                expect(document.querySelectorAll('.kanban-card.keyboard-selected')).toHaveLength(0);
                expect(getSelectedBoardIndex()).toBe(-1);
            });

            it('re-applies the highlight at the same card after an in-place re-render', () => {
                setBoardIssues(issues);
                renderBoard();
                selectCardById('2', 1);

                renderBoard(); // e.g. a websocket-triggered re-render, same issues

                const selected = document.querySelectorAll('.kanban-card.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.id).toBe('2');
                expect(getSelectedBoardIndex()).toBe(1);
            });

            it('follows the selected card by id across a column move', () => {
                setBoardIssues(issues);
                renderBoard();
                selectCardById('2', 1);

                // Card 2 moves from todo -> done (e.g. drag/drop or remote update)
                const moved = issues.map(i => i.id === '2' ? { ...i, status: 'done' } : i);
                setBoardIssues(moved);
                renderBoard();

                const selected = document.querySelectorAll('.kanban-card.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.id).toBe('2');
            });

            it('clamps to the new last card when the selected card is removed', () => {
                setBoardIssues(issues);
                renderBoard();
                selectCardById('3', 2);

                setBoardIssues([issues[0], issues[1]]);
                renderBoard();

                const selected = document.querySelectorAll('.kanban-card.keyboard-selected');
                expect(selected).toHaveLength(1);
                expect(selected[0].dataset.id).toBe('2');
                expect(getSelectedBoardIndex()).toBe(1);
            });

            it('resets to -1 when the re-render leaves no cards', () => {
                setBoardIssues(issues);
                renderBoard();
                selectCardById('1', 0);

                setBoardIssues([]);
                renderBoard();

                expect(document.querySelectorAll('.kanban-card.keyboard-selected')).toHaveLength(0);
                expect(getSelectedBoardIndex()).toBe(-1);
            });
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

    // CHT-1226: intra-column drag-to-reorder was cosmetic only (no
    // persisted order field on Issue) -- same-column drops are now
    // disabled/no-ops instead of pretending to reorder. reorderBoardIssues()
    // itself was removed along with the affordance.
    describe('same-column drag is disabled (CHT-1226)', () => {
        beforeEach(() => {
            setBoardIssues([
                { id: '1', title: 'Test', status: 'todo', identifier: 'TEST-1', priority: 'medium' },
                { id: '2', title: 'Other', status: 'todo', identifier: 'TEST-2', priority: 'medium' },
            ]);
        });

        it('handleDrop is a no-op when dropped on its own column', async () => {
            const mockTarget = {
                dataset: { status: 'todo' },
                classList: { remove: vi.fn() },
            };
            const mockEvent = {
                preventDefault: vi.fn(),
                dataTransfer: { getData: vi.fn(() => '1') },
            };

            await handleDrop(mockEvent, mockTarget);

            expect(api.updateIssue).not.toHaveBeenCalled();
        });

        it('handleCardDrop is a no-op when dropped on a card in the same column', async () => {
            handleDragStart({ dataTransfer: { setData: vi.fn() } }, { dataset: { id: '1' }, classList: { add: vi.fn() } });
            const mockTarget = {
                dataset: { id: '2' },
                classList: { remove: vi.fn() },
                closest: () => ({ dataset: { status: 'todo' } }),
            };
            const mockEvent = { preventDefault: vi.fn(), dataTransfer: { getData: vi.fn(() => '1') } };

            await handleCardDrop(mockEvent, mockTarget);

            expect(api.updateIssue).not.toHaveBeenCalled();
        });

        it('handleCardDrop still persists a cross-column drop-on-card', async () => {
            api.updateIssue.mockResolvedValue({ id: '1', status: 'done' });
            handleDragStart({ dataTransfer: { setData: vi.fn() } }, { dataset: { id: '1' }, classList: { add: vi.fn() } });
            const mockTarget = {
                dataset: { id: '2' },
                classList: { remove: vi.fn() },
                closest: () => ({ dataset: { status: 'done' } }),
            };
            const mockEvent = { preventDefault: vi.fn(), dataTransfer: { getData: vi.fn(() => '1') } };

            await handleCardDrop(mockEvent, mockTarget);

            expect(api.updateIssue).toHaveBeenCalledWith('1', { status: 'done' });
        });

        it('handleDragOver withholds the drag-over affordance for a same-column target', () => {
            handleDragStart({ dataTransfer: { setData: vi.fn() } }, { dataset: { id: '1' }, classList: { add: vi.fn() } });
            const mockTarget = { dataset: { status: 'todo' }, classList: { add: vi.fn() } };

            handleDragOver({ preventDefault: vi.fn() }, mockTarget);

            expect(mockTarget.classList.add).not.toHaveBeenCalledWith('drag-over');
        });

        it('handleDragOver shows the drag-over affordance for a different column', () => {
            handleDragStart({ dataTransfer: { setData: vi.fn() } }, { dataset: { id: '1' }, classList: { add: vi.fn() } });
            const mockTarget = { dataset: { status: 'done' }, classList: { add: vi.fn() } };

            handleDragOver({ preventDefault: vi.fn() }, mockTarget);

            expect(mockTarget.classList.add).toHaveBeenCalledWith('drag-over');
        });

        it('handleCardDragOver withholds the drag-over affordance for a card in the same column', () => {
            handleDragStart({ dataTransfer: { setData: vi.fn() } }, { dataset: { id: '1' }, classList: { add: vi.fn() } });
            const mockTarget = { dataset: { id: '2' }, classList: { add: vi.fn() } };

            handleCardDragOver({ preventDefault: vi.fn() }, mockTarget);

            expect(mockTarget.classList.add).not.toHaveBeenCalledWith('drag-over');
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

            expect(showApiError).toHaveBeenCalledWith('update status', expect.objectContaining({ message: 'Update failed' }));
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
