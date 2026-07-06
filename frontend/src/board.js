/**
 * Board module - Kanban board view functionality (CHT-665)
 * Extracted from app.js for testability
 */

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr, formatPriority, debounce } from './utils.js';
import { registerActions } from './event-delegation.js';
import { viewIssue } from './issue-detail-view.js';
import { getCurrentProject, getCurrentView, subscribe, getSelectedBoardIndex, setSelectedBoardIndex, setDetailNavContext } from './state.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import { getProjects } from './projects.js';

// Board status configuration
export const BOARD_STATUSES = [
    { key: 'backlog', label: 'Backlog' },
    { key: 'todo', label: 'Todo' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'in_review', label: 'In Review' },
    { key: 'done', label: 'Done' },
];

// Module state
let boardIssues = [];
let draggingIssueId = null;
// Monotonic request id — lets loadBoard() drop a response from a superseded
// request (rapid project switches) instead of overwriting newer data with
// stale data (CHT-1211 item 7).
let loadBoardRequestId = 0;

/**
 * Get current board issues
 * @returns {Array} Current board issues
 */
export function getBoardIssues() {
    return boardIssues;
}

/**
 * Set board issues
 * @param {Array} issues - Issues to set
 */
export function setBoardIssues(issues) {
    boardIssues = issues;
}

/**
 * Get currently dragging issue ID
 * @returns {string|null} Dragging issue ID or null
 */
export function getDraggingIssueId() {
    return draggingIssueId;
}

// React to project changes when board is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'board') return;
    loadBoard();
});

/**
 * Load board issues for the current project
 */
export async function loadBoard() {
    // CHT-1215 (review finding 3): loadBoard() runs on view entry and
    // project switch, and its skeleton wipe below destroys the
    // .keyboard-selected card before renderBoard() can re-find it by id —
    // the stale index would then positionally clamp into the NEW project's
    // cards and Enter could open the wrong issue. Reset the cursor up
    // front, mirroring loadIssues()'s setSelectedIssueIndex(-1).
    setSelectedBoardIndex(-1);

    // Request-sequencing guard (CHT-1211 item 7): capture this call's id so
    // a response from an earlier, superseded loadBoard() (rapid project
    // switching) can be detected and dropped below.
    const requestId = ++loadBoardRequestId;

    const projectId = getCurrentProject();
    if (!projectId) {
        const board = document.getElementById('kanban-board');
        if (board) {
            // CHT-1226: distinguish "no project selected" from "zero
            // projects exist" the way issues-view.js already does — a
            // brand-new team otherwise gets the same generic copy as a team
            // that just hasn't picked a project yet, with no hint that
            // creating a project is the actual next step.
            board.innerHTML = getProjects().length === 0
                ? renderEmptyState({
                    icon: EMPTY_ICONS.projects,
                    heading: 'No projects yet',
                    description: 'Create a project first to add a board',
                    cta: { label: 'Create project', action: 'showCreateProjectModal' },
                })
                : renderEmptyState({
                    icon: EMPTY_ICONS.board,
                    heading: 'Select a project',
                    description: 'Choose a project to view its board',
                });
        }
        return;
    }

    const board = document.getElementById('kanban-board');
    if (board) {
        board.innerHTML = Array(4).fill(0).map(() => `
            <div class="kanban-column" style="opacity: 0.5;">
                <div class="kanban-column-header">
                    <div class="skeleton skeleton-title" style="width: 80px;"></div>
                </div>
                <div class="skeleton" style="height: 60px; border-radius: 6px; margin-bottom: 8px;"></div>
                <div class="skeleton" style="height: 60px; border-radius: 6px;"></div>
            </div>
        `).join('');
    }

    try {
        const issues = await api.getIssues({ project_id: projectId });
        if (requestId !== loadBoardRequestId) return; // a newer loadBoard() has since started — drop this stale response

        boardIssues = issues;
        // Prev/next issue-detail nav context (CHT-1211 item 2) — issues
        // opened from the Board should page through the board's own list,
        // not the Issues-view-only global issues array. The request id only
        // orders loadBoard() against itself — also require that Board is
        // still the current view at response time, or a slow response
        // landing after the user navigated to another view would clobber
        // that view's fresher context (CHT-1211 review #2).
        if (getCurrentView() === 'board') {
            setDetailNavContext(boardIssues);
        }
        renderBoard();
    } catch (e) {
        if (requestId !== loadBoardRequestId) return;
        // CHT-1224: the copy said "try again" but shipped no button — add the
        // cta the helper already supports, wired to re-run loadBoard().
        if (board) board.innerHTML = renderEmptyState({ icon: EMPTY_ICONS.issues, heading: 'Failed to load board', description: 'Check your connection and try again', cta: { label: 'Retry', action: 'retry-load-board' }, variant: 'error' });
        showApiError('load board', e);
    }
}

/**
 * Debounced loadBoard() for WS-triggered refreshes (CHT-1225). ws-handlers.js
 * calls this instead of loadBoard() directly for issue created/updated/
 * deleted events -- a batch mutation (e.g. batch_update_issues) broadcasts
 * one 'issue' event per issue, and without coalescing, N events in quick
 * succession would fire N concurrent fetches. loadBoard()'s own request-id
 * guard only discards stale RESPONSES; this coalesces the CALLS themselves.
 */
export const scheduleBoardRefresh = debounce(() => loadBoard(), 200);

/**
 * Render the kanban board
 */
export function renderBoard() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    // CHT-1215: capture the currently keyboard-selected card's id before the
    // rebuild below replaces the DOM — same fix as issue-list.js's
    // renderIssues(). Covers in-place re-renders (drag/drop reorders and
    // remote-event re-render calls); full reloads go through loadBoard(),
    // which resets the cursor instead (review finding 3).
    const selectedCardId = board.querySelector('.kanban-card.keyboard-selected')?.dataset.id;

    board.innerHTML = BOARD_STATUSES.map(status => {
        const columnIssues = boardIssues.filter(i => i.status === status.key);
        return `
            <div class="kanban-column" data-action="board-column" data-status="${status.key}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <span class="status-dot status-dot-${status.key}"></span>
                        ${status.label}
                    </div>
                    <span class="kanban-column-count">${columnIssues.length}</span>
                </div>
                <div class="kanban-column-content">
                    ${columnIssues.length === 0 ? `
                        <div class="kanban-column-empty">No issues</div>
                    ` : columnIssues.map(issue => `
                        <div class="kanban-card" draggable="true" data-action="board-card" data-id="${escapeAttr(issue.id)}" data-identifier="${escapeAttr(issue.identifier)}">
                            <div class="kanban-card-title">${escapeHtml(issue.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${issue.identifier}</span>
                                <span class="badge badge-priority-${issue.priority}" style="font-size: 10px;">${formatPriority(issue.priority)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');

    reapplyKeyboardSelection(selectedCardId);
}

/**
 * Re-apply the j/k keyboard-selection highlight after renderBoard() rebuilds
 * the board's innerHTML from scratch (CHT-1215) — see issue-list.js's
 * reapplyKeyboardSelection() for the same fix on the Issues list.
 * @param {string|undefined} selectedCardId - id of the card that had
 *   .keyboard-selected before the rebuild, if any
 */
function reapplyKeyboardSelection(selectedCardId) {
    const prevIndex = getSelectedBoardIndex();
    if (prevIndex < 0) return;

    const cards = document.querySelectorAll('#kanban-board .kanban-card');
    if (cards.length === 0) {
        setSelectedBoardIndex(-1);
        return;
    }

    let newIndex = selectedCardId
        ? Array.prototype.findIndex.call(cards, (card) => card.dataset.id === selectedCardId)
        : -1;
    if (newIndex < 0) {
        newIndex = Math.min(prevIndex, cards.length - 1);
    }

    setSelectedBoardIndex(newIndex);
    cards[newIndex].classList.add('keyboard-selected');
}

// Drag and drop handlers for Kanban
export function handleDragStart(e, target) {
    e.dataTransfer.setData('text/plain', target.dataset.id);
    draggingIssueId = target.dataset.id;
    target.classList.add('dragging');
}

export function handleDragEnd(e, target) {
    target.classList.remove('dragging');
    draggingIssueId = null;
}

// CHT-1226: intra-column drag-to-reorder was cosmetic only -- Issue has no
// persisted order/position field (no `order`-like column on
// backend/app/oxyde_models/issue.py), so a same-column drop reordered the
// in-memory boardIssues array and re-rendered (looked like it worked), but
// nothing was ever sent to the API; any reload/project-switch discarded the
// manual arrangement. Adding real persistence would mean a new model field
// + migration + service/API plumbing + a default backend sort order for
// board fetches -- disproportionate to this item next to the rest of this
// pass. Per the ticket's own escape hatch, same-column drag targets are
// disabled instead (below) so the UI stops promising an ordering it can't
// keep; cross-column drags (the persisted, real feature: status) are
// unaffected.

/**
 * True if dropping `draggingIssueId` onto something with `targetStatus`
 * would be a same-column, no-op drop (CHT-1226 — see note above).
 */
function isSameColumnDrag(targetStatus) {
    const dragged = boardIssues.find(i => i.id === draggingIssueId);
    return !!dragged && dragged.status === targetStatus;
}

export function handleDragOver(e, target) {
    e.preventDefault();
    if (isSameColumnDrag(target.dataset.status)) return;
    target.classList.add('drag-over');
}

export function handleDragLeave(e, target) {
    target.classList.remove('drag-over');
}

export function handleCardDragOver(e, target) {
    e.preventDefault();
    const targetIssue = boardIssues.find(i => i.id === target.dataset.id);
    if (targetIssue && isSameColumnDrag(targetIssue.status)) return;
    target.classList.add('drag-over');
}

export function handleCardDragLeave(e, target) {
    target.classList.remove('drag-over');
}

export async function handleDrop(e, target) {
    e.preventDefault();
    target.classList.remove('drag-over');

    const issueId = e.dataTransfer.getData('text/plain');
    const newStatus = target.dataset.status;

    // Find the issue
    const issue = boardIssues.find(i => i.id === issueId);
    if (!issue) return;

    const oldStatus = issue.status;
    // Same-column drop is a no-op (CHT-1226 — see note above): there is no
    // persisted order to write, so don't pretend to reorder.
    if (oldStatus === newStatus) return;

    issue.status = newStatus;
    renderBoard();

    // Optimistic update
    try {
        await api.updateIssue(issueId, { status: newStatus });
        showToast('Status updated', 'success');
    } catch (e) {
        // Revert on error
        issue.status = oldStatus;
        renderBoard();
        showApiError('update status', e);
    }
}

export async function handleCardDrop(e, target) {
    e.preventDefault();
    target.classList.remove('drag-over');

    const issueId = draggingIssueId || e.dataTransfer.getData('text/plain');
    const targetId = target.dataset.id;
    if (!issueId || !targetId || issueId === targetId) return;

    const column = target.closest('.kanban-column');
    const newStatus = column?.dataset.status;
    if (!newStatus) return;

    const issue = boardIssues.find(i => i.id === issueId);
    if (!issue) return;

    const oldStatus = issue.status;
    // Same-column drop-on-card is a no-op — see handleDrop above.
    if (oldStatus === newStatus) return;

    issue.status = newStatus;
    renderBoard();

    try {
        await api.updateIssue(issueId, { status: newStatus });
        showToast('Status updated', 'success');
    } catch (e) {
        issue.status = oldStatus;
        renderBoard();
        showApiError('update status', e);
    }
}

// Register delegated event handlers for board actions
registerActions({
    'board-card': (event, data, target) => {
        if (event.type === 'click') {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
                window.open(`/issue/${encodeURIComponent(data.identifier)}`, '_blank');
            } else {
                event.preventDefault();
                viewIssue(data.id);
            }
        } else if (event.type === 'dragstart') {
            handleDragStart(event, target);
        } else if (event.type === 'dragend') {
            handleDragEnd(event, target);
        } else if (event.type === 'dragover') {
            handleCardDragOver(event, target);
        } else if (event.type === 'dragleave') {
            handleCardDragLeave(event, target);
        } else if (event.type === 'drop') {
            handleCardDrop(event, target);
        }
    },
    'board-column': (event, data, target) => {
        if (event.type === 'dragover') {
            handleDragOver(event, target);
        } else if (event.type === 'dragleave') {
            handleDragLeave(event, target);
        } else if (event.type === 'drop') {
            handleDrop(event, target);
        }
    },
    'retry-load-board': () => loadBoard(),
});
