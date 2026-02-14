/**
 * Board module - Kanban board view functionality (CHT-665)
 * Extracted from app.js for testability
 */

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

// Dependencies injected from app.js
let deps = {
    api: null,
    showToast: () => {},
    getProjects: () => [],
    getProjectFromUrl: () => null,
    setGlobalProjectSelection: () => {},
    updateUrlWithProject: () => {},
    escapeHtml: (text) => text,
    escapeAttr: (text) => text,
    escapeJsString: (text) => text,
    formatPriority: (p) => p,
};

/**
 * Set dependencies for this module
 * @param {Object} dependencies - Object containing required dependencies
 */
export function setDependencies(dependencies) {
    deps = { ...deps, ...dependencies };
}

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

/**
 * Update the board project filter dropdown
 */
export function updateBoardProjectFilter() {
    const filter = document.getElementById('board-project-filter');
    if (!filter) return;

    const projects = deps.getProjects();

    // Populate project filter
    filter.innerHTML = '<option value="">Select Project</option>' +
        projects.map(p => `<option value="${p.id}">${deps.escapeHtml(p.name)}</option>`).join('');

    if (!filter.value) {
        // Read from URL first, then localStorage
        const saved = deps.getProjectFromUrl();
        if (saved && projects.some(p => p.id === saved)) {
            filter.value = saved;
        }
    }

    if (filter.value) {
        loadBoard(filter.value);
    } else {
        const board = document.getElementById('kanban-board');
        if (board) {
            board.innerHTML = `
                <div class="empty-state" style="width: 100%; padding: 3rem;">
                    <h3>Select a project</h3>
                    <p>Choose a project to view its board</p>
                </div>
            `;
        }
    }
}

/**
 * Handle board project filter change - update URL and reload
 */
export function onBoardProjectChange() {
    const projectId = document.getElementById('board-project-filter')?.value;
    if (projectId) {
        deps.setGlobalProjectSelection(projectId);
        deps.updateUrlWithProject(projectId);
    }
    loadBoard(projectId);
}

/**
 * Load board issues for a project
 * @param {string} projectIdParam - Project ID to load, or reads from filter
 */
export async function loadBoard(projectIdParam) {
    // Use passed parameter if provided, otherwise read from DOM
    const projectId = projectIdParam || document.getElementById('board-project-filter')?.value;
    if (!projectId) {
        updateBoardProjectFilter();
        return;
    }

    const board = document.getElementById('kanban-board');
    if (board) {
        board.innerHTML = '<div class="loading-spinner" style="margin: 2rem auto;"></div>';
    }

    try {
        boardIssues = await deps.api.getIssues({ project_id: projectId });
        renderBoard();
    } catch (e) {
        deps.showToast(e.message, 'error');
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
            <div class="kanban-column" data-status="${status.key}"
                 ondrop="handleDrop(event)" ondragover="handleDragOver(event)" ondragleave="handleDragLeave(event)">
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
                        <div class="kanban-card" draggable="true" data-id="${deps.escapeAttr(issue.id)}"
                             ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)"
                             ondragover="handleCardDragOver(event)" ondragleave="handleCardDragLeave(event)" ondrop="handleCardDrop(event)"
                             onclick="if (!event.metaKey && !event.ctrlKey && !event.shiftKey && event.button !== 1) { viewIssue('${deps.escapeJsString(issue.id)}'); } else { window.open('/issue/${encodeURIComponent(issue.identifier)}', '_blank'); }">
                            <div class="kanban-card-title">${deps.escapeHtml(issue.title)}</div>
                            <div class="kanban-card-meta">
                                <span class="kanban-card-identifier">${issue.identifier}</span>
                                <span class="badge badge-priority-${issue.priority}" style="font-size: 10px;">${deps.formatPriority(issue.priority)}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// Drag and drop handlers for Kanban
export function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    draggingIssueId = e.target.dataset.id;
    e.target.classList.add('dragging');
}

export function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggingIssueId = null;
}

export function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

export function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

export function handleCardDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

export function handleCardDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

export async function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const issueId = e.dataTransfer.getData('text/plain');
    const newStatus = e.currentTarget.dataset.status;

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
        await deps.api.updateIssue(issueId, { status: newStatus });
        deps.showToast('Status updated', 'success');
    } catch (e) {
        // Revert on error
        issue.status = oldStatus;
        renderBoard();
        deps.showToast(e.message, 'error');
    }
}

export async function handleCardDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');

    const issueId = draggingIssueId || e.dataTransfer.getData('text/plain');
    const targetId = e.currentTarget.dataset.id;
    if (!issueId || !targetId || issueId === targetId) return;

    const column = e.currentTarget.closest('.kanban-column');
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
        await deps.api.updateIssue(issueId, { status: newStatus });
        deps.showToast('Status updated', 'success');
    } catch (e) {
        issue.status = oldStatus;
        renderBoard();
        deps.showToast(e.message, 'error');
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
