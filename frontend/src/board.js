/**
 * Board module - Kanban board view functionality (CHT-665)
 * Extracted from app.js for testability
 */

import { api } from './api.js';
import { showToast } from './ui.js';
import { escapeHtml, escapeAttr, formatPriority } from './utils.js';
import { registerActions } from './event-delegation.js';
import { viewIssue } from './issue-detail-view.js';
import { getCurrentProject, getCurrentView, subscribe } from './state.js';

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
    const projectId = getCurrentProject();
    if (!projectId) {
        const board = document.getElementById('kanban-board');
        if (board) {
            board.innerHTML = `
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `;
        }
        return;
    }

    const board = document.getElementById('kanban-board');
    if (board) {
        board.innerHTML = '<div class="loading-spinner" style="margin: 2rem auto;"></div>';
    }

    try {
        boardIssues = await api.getIssues({ project_id: projectId });
        renderBoard();
    } catch (e) {
        showToast(`Failed to load board: ${e.message}`, 'error');
    }
}

/**
 * Render the kanban board
 */
export function renderBoard() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

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

export function handleDragOver(e, target) {
    e.preventDefault();
    target.classList.add('drag-over');
}

export function handleDragLeave(e, target) {
    target.classList.remove('drag-over');
}

export function handleCardDragOver(e, target) {
    e.preventDefault();
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
    issue.status = newStatus;
    reorderBoardIssues(newStatus, issueId);
    renderBoard();

    if (oldStatus === newStatus) return;

    // Optimistic update
    try {
        await api.updateIssue(issueId, { status: newStatus });
        showToast('Status updated', 'success');
    } catch (e) {
        // Revert on error
        issue.status = oldStatus;
        renderBoard();
        showToast(`Failed to update status: ${e.message}`, 'error');
    }
}

export async function handleCardDrop(e, target) {
    e.preventDefault();
    e.stopPropagation();
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
    issue.status = newStatus;
    reorderBoardIssues(newStatus, issueId, targetId);
    renderBoard();

    if (oldStatus === newStatus) return;
    try {
        await api.updateIssue(issueId, { status: newStatus });
        showToast('Status updated', 'success');
    } catch (e) {
        issue.status = oldStatus;
        renderBoard();
        showToast(`Failed to update status: ${e.message}`, 'error');
    }
}

export function reorderBoardIssues(status, issueId, targetId = null) {
    const statusIssues = boardIssues.filter(i => i.status === status && i.id !== issueId);
    const dragged = boardIssues.find(i => i.id === issueId);
    if (!dragged) return;

    if (targetId) {
        const targetIndex = statusIssues.findIndex(i => i.id === targetId);
        if (targetIndex >= 0) {
            statusIssues.splice(targetIndex, 0, dragged);
        } else {
            statusIssues.push(dragged);
        }
    } else {
        statusIssues.push(dragged);
    }

    const reordered = [];
    BOARD_STATUSES.forEach(s => {
        if (s.key === status) {
            reordered.push(...statusIssues);
        } else {
            reordered.push(...boardIssues.filter(i => i.status === s.key));
        }
    });
    boardIssues = reordered;
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
});
