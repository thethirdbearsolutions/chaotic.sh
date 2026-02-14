/**
 * Epics module - Epics list view with progress bars (CHT-831)
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { navigateToIssueByIdentifier } from './router.js';
import { getProjects, loadProjects, getSavedProjectId, setGlobalProjectSelection } from './projects.js';
import { getProjectFromUrl, updateUrlWithProject } from './url-helpers.js';

/**
 * Populate the epics project filter dropdown and auto-select saved project.
 */
export async function updateEpicsProjectFilter() {
    const filter = document.getElementById('epics-project-filter');
    if (!filter) return;

    await loadProjects();
    filter.innerHTML = '<option value="">All Projects</option>' +
        getProjects().map(p => `<option value="${escapeAttr(p.id)}">${escapeHtml(p.name)}</option>`).join('');

    const saved = getProjectFromUrl() || getSavedProjectId();
    if (saved && getProjects().some(p => p.id === saved)) {
        filter.value = saved;
    }
    loadEpics();
}

/**
 * Handle project filter change in the epics view.
 */
export function onEpicsProjectChange() {
    const projectId = document.getElementById('epics-project-filter')?.value;
    if (projectId) {
        setGlobalProjectSelection(projectId);
        updateUrlWithProject(projectId);
    }
    loadEpics();
}

/**
 * Load and render the epics list view.
 */
export async function loadEpics() {
    const listEl = document.getElementById('epics-list');
    if (!listEl) return;

    listEl.innerHTML = '<div class="loading">Loading epics...</div>';

    try {
        if (!window.currentTeam?.id) {
            listEl.innerHTML = '<div class="empty-state">Select a team to view epics.</div>';
            return;
        }

        const projectId = document.getElementById('epics-project-filter')?.value;
        let epics;
        if (projectId) {
            epics = await api.getIssues({ project_id: projectId, issue_type: 'epic' });
        } else {
            epics = await api.getTeamIssues(window.currentTeam.id, { issue_type: 'epic' });
        }

        if (!epics || epics.length === 0) {
            listEl.innerHTML = `
                <div class="empty-state">
                    <p>No epics found.</p>
                    <p class="empty-state-hint">Create one from the CLI: <code>chaotic epic create "Epic title"</code></p>
                </div>
            `;
            return;
        }

        // Fetch sub-issues for each epic to compute progress.
        // N+1 queries by design — no batch endpoint exists (same as CLI epic list).
        const epicsWithProgress = await Promise.all(
            epics.map(async (epic) => {
                let subIssues = [];
                try {
                    subIssues = await api.getSubIssues(epic.id);
                } catch {
                    // Sub-issues API failure - show "-" for progress
                }
                return { ...epic, subIssues };
            })
        );

        renderEpics(epicsWithProgress, listEl);
    } catch (e) {
        listEl.innerHTML = `<div class="empty-state">Failed to load epics: ${escapeHtml(e.message || String(e))}</div>`;
    }
}

/**
 * Render the epics table with progress bars.
 * Uses data attributes + event delegation instead of inline onclick to avoid XSS.
 */
export function renderEpics(epics, container) {
    const rows = epics.map(epic => {
        const total = epic.subIssues ? epic.subIssues.length : 0;
        const done = epic.subIssues
            ? epic.subIssues.filter(s => s.status === 'done' || s.status === 'canceled').length
            : 0;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const progressText = total > 0 ? `${done}/${total}` : '-';

        const statusClass = `status-${(epic.status || 'backlog').replace(/_/g, '-')}`;
        const statusLabel = (epic.status || 'backlog').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        const estimate = epic.estimate != null ? `${epic.estimate}pts` : '-';

        return `
            <tr class="epic-row" data-identifier="${escapeAttr(epic.identifier)}" style="cursor: pointer;">
                <td class="epic-identifier">${escapeHtml(epic.identifier)}</td>
                <td class="epic-title">${escapeHtml(epic.title)}</td>
                <td class="epic-progress">
                    <div class="epic-progress-bar-container">
                        <div class="epic-progress-bar">
                            <div class="epic-progress-fill${pct === 100 ? ' epic-progress-complete' : ''}" style="width: ${pct}%"></div>
                        </div>
                        <span class="epic-progress-text">${progressText}</span>
                    </div>
                </td>
                <td class="epic-estimate">${estimate}</td>
                <td class="epic-status"><span class="status-badge ${statusClass}">${statusLabel}</span></td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <table class="epic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Progress</th>
                    <th>Estimate</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    // Event delegation for row clicks
    container.addEventListener('click', (e) => {
        const row = e.target.closest('.epic-row');
        if (row && row.dataset.identifier) {
            navigateToIssueByIdentifier(row.dataset.identifier);
        }
    });
}
