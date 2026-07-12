/**
 * Issue Edit module - Edit issue modal and delete (CHT-1035)
 *
 * Extracted from app.js to decouple issue editing logic from the main application module.
 */

import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { getEstimateOptions, loadProjects } from './projects.js';
import { viewIssue } from './issue-detail-view.js';
import { navigateTo } from './router.js';
import { loadIssues } from './issues-view.js';
import { registerActions } from './event-delegation.js';
import { getDescriptionDraft, setDescriptionDraft, getDescriptionDraftBase } from './storage.js';

export async function showEditIssueModal(issueId) {
    try {
        const issue = await api.getIssue(issueId);
        const projectSprints = await api.getSprints(issue.project_id);

        const estimateOptions = getEstimateOptions(issue.project_id);

        const estimateSelectOptions = estimateOptions.map(opt => `
            <option value="${opt.value === null ? '' : opt.value}" ${issue.estimate === opt.value ? 'selected' : ''}>${escapeHtml(opt.label)}</option>
        `).join('');

        document.getElementById('modal-title').textContent = 'Edit Issue';
        document.getElementById('modal-content').innerHTML = `
            <form data-action="update-issue" data-issue-id="${escapeAttr(issueId)}">
                <div class="form-group">
                    <label for="edit-issue-title">Title</label>
                    <input type="text" id="edit-issue-title" value="${escapeAttr(issue.title)}" required>
                </div>
                <div class="form-group">
                    <label for="edit-issue-description">Description</label>
                    <div id="edit-issue-description-draft-warning" class="description-draft-warning hidden"></div>
                    <textarea id="edit-issue-description">${escapeHtml(issue.description || '')}</textarea>
                </div>
                <div class="form-group">
                    <label for="edit-issue-status">Status</label>
                    <select id="edit-issue-status">
                        <option value="backlog" ${issue.status === 'backlog' ? 'selected' : ''}>Backlog</option>
                        <option value="todo" ${issue.status === 'todo' ? 'selected' : ''}>Todo</option>
                        <option value="in_progress" ${issue.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                        <option value="in_review" ${issue.status === 'in_review' ? 'selected' : ''}>In Review</option>
                        <option value="done" ${issue.status === 'done' ? 'selected' : ''}>Done</option>
                        <option value="canceled" ${issue.status === 'canceled' ? 'selected' : ''}>Canceled</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-priority">Priority</label>
                    <select id="edit-issue-priority">
                        <option value="no_priority" ${issue.priority === 'no_priority' ? 'selected' : ''}>No Priority</option>
                        <option value="low" ${issue.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${issue.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${issue.priority === 'high' ? 'selected' : ''}>High</option>
                        <option value="urgent" ${issue.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-type">Type</label>
                    <select id="edit-issue-type">
                        <option value="task" ${issue.issue_type === 'task' ? 'selected' : ''}>Task</option>
                        <option value="bug" ${issue.issue_type === 'bug' ? 'selected' : ''}>Bug</option>
                        <option value="feature" ${issue.issue_type === 'feature' ? 'selected' : ''}>Feature</option>
                        <option value="chore" ${issue.issue_type === 'chore' ? 'selected' : ''}>Chore</option>
                        <option value="docs" ${issue.issue_type === 'docs' ? 'selected' : ''}>Docs</option>
                        <option value="tech_debt" ${issue.issue_type === 'tech_debt' ? 'selected' : ''}>Tech Debt</option>
                        <option value="refactor" ${issue.issue_type === 'refactor' ? 'selected' : ''}>Refactor</option>
                        <option value="epic" ${issue.issue_type === 'epic' ? 'selected' : ''}>Epic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-estimate">Estimate</label>
                    <select id="edit-issue-estimate">
                        ${estimateSelectOptions}
                    </select>
                </div>
                <div class="form-group">
                    <label for="edit-issue-sprint">Sprint</label>
                    <select id="edit-issue-sprint">
                        <option value="">No Sprint</option>
                        ${projectSprints.filter(s => s.status !== 'completed').map(s => `
                            <option value="${s.id}" ${issue.sprint_id === s.id ? 'selected' : ''}>${escapeHtml(s.name)}</option>
                        `).join('')}
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Update Issue</button>
            </form>
        `;
        showModal();

        // Draft persistence for the description field only (CHT-1214),
        // sharing the inline editor's storage slot. Restore policy differs
        // from the inline editor on purpose — see the DRAFT POLICY block in
        // storage.js (the single source of truth): the modal only prefills a
        // draft whose basedOn matches the live server description, and never
        // silently. A stale/legacy draft is NOT loaded here, because a user
        // opening this modal to edit an unrelated field (title, status)
        // would otherwise commit a forgotten week-old draft with zero signal
        // (PR #209 review finding 1). The stored draft is left untouched.
        const descEl = document.getElementById('edit-issue-description');
        if (descEl) {
            const draft = getDescriptionDraft(issueId);
            if (draft) {
                const base = getDescriptionDraftBase(issueId);
                const warnEl = document.getElementById('edit-issue-description-draft-warning');
                if (base !== null && base === (issue.description || '')) {
                    descEl.value = draft;
                    if (warnEl) {
                        warnEl.textContent = 'Restored your unsaved description draft.';
                        warnEl.classList.remove('hidden');
                    }
                } else if (warnEl) {
                    warnEl.textContent = 'You have an unsaved description draft from an older version of this description — it was not loaded here. Open the description editor on the issue page to review it.';
                    warnEl.classList.remove('hidden');
                }
            }
            descEl.addEventListener('input', () => {
                const val = descEl.value;
                if (val !== (issue.description || '')) {
                    setDescriptionDraft(issueId, val, issue.description || '');
                } else {
                    setDescriptionDraft(issueId, null);
                }
            });
        }
    } catch (e) {
        showApiError('load issue', e);
    }
}

export async function handleUpdateIssue(event, issueId) {
    try {
        const titleEl = document.getElementById('edit-issue-title');
        const descEl = document.getElementById('edit-issue-description');
        const statusEl = document.getElementById('edit-issue-status');
        const priorityEl = document.getElementById('edit-issue-priority');
        const typeEl = document.getElementById('edit-issue-type');
        const estimateEl = document.getElementById('edit-issue-estimate');
        const sprintEl = document.getElementById('edit-issue-sprint');

        if (!titleEl || !statusEl || !priorityEl || !typeEl) {
            throw new Error('Required form fields not found');
        }

        const data = {
            title: titleEl.value,
            description: descEl ? descEl.value : '',
            status: statusEl.value,
            priority: priorityEl.value,
            issue_type: typeEl.value,
            estimate: estimateEl && estimateEl.value ? parseInt(estimateEl.value) : null,
            sprint_id: sprintEl && sprintEl.value ? sprintEl.value : null,
        };

        await api.updateIssue(issueId, data);
        // Clear the draft only when this save actually committed it — a save
        // that never loaded a stale draft (finding 1's no-prefill path) must
        // not delete the draft the warning just told the user to review.
        if (getDescriptionDraft(issueId) === data.description) {
            setDescriptionDraft(issueId, null);
        }
        closeModal();
        await viewIssue(issueId);
        showToast('Issue updated!', 'success');
    } catch (e) {
        showApiError('update issue', e);
    }
}

export async function deleteIssue(issueId) {
    if (!confirm('Are you sure you want to delete this issue?')) return;

    try {
        await api.deleteIssue(issueId);
        await loadIssues();
        await loadProjects();
        navigateTo('issues');
        showToast('Issue deleted!', 'success');
    } catch (e) {
        showApiError('delete issue', e);
    }
}

// Register delegated event handlers
registerActions({
    'update-issue': (event, data) => {
        handleUpdateIssue(event, data.issueId);
    },
});
