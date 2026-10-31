/**
 * Quick create module (CHT-1045)
 *
 * Handles inline issue creation with optimistic UI from the issues list header.
 * Extracted from app.js.
 */

import { api } from './api.js';
import { showToast, showApiError } from './ui.js';
import { getProjects, loadProjects } from './projects.js';
import { getIssues, setIssues, getCurrentProject } from './state.js';
import { renderIssues } from './issue-list.js';

export async function handleQuickCreate(event) {
    if (event.key !== 'Enter') return;

    const input = event.target;
    const title = input.value.trim();
    if (!title) return;

    const projectId = getCurrentProject();
    if (!projectId) {
        showToast('Please select a project first', 'error');
        return;
    }

    input.disabled = true;
    const originalPlaceholder = input.placeholder;
    input.placeholder = 'Creating...';

    // Optimistic: add to list immediately
    const tempId = 'temp-' + Date.now();
    const project = getProjects().find(p => p.id === projectId);
    const optimisticIssue = {
        id: tempId,
        title,
        identifier: `${project?.key || 'NEW'}-?`,
        status: 'backlog',
        priority: 'no_priority',
        issue_type: 'task',
        estimate: null,
        _isOptimistic: true
    };
    setIssues([optimisticIssue, ...getIssues()]);
    renderIssues();

    // Mark new item
    const newItem = document.querySelector(`[data-id="${tempId}"]`);
    if (newItem) newItem.classList.add('new');

    try {
        const created = await api.createIssue(projectId, {
            title,
            status: 'backlog',
            priority: 'no_priority'
        });
        input.value = '';
        // Replace optimistic with real
        // A new array: state only notifies (and the issue store only
        // records the created row, CHT-1894) on a new reference.
        const issuesAfterCreate = getIssues();
        if (issuesAfterCreate.some(i => i.id === tempId)) {
            setIssues(issuesAfterCreate.map(i => (i.id === tempId ? created : i)));
        }
        renderIssues();
        loadProjects(); // Update issue count in background
        showToast('Issue created!', 'success');
    } catch (e) {
        // Remove optimistic on error
        setIssues(getIssues().filter(i => i.id !== tempId));
        renderIssues();
        showApiError('create issue', e);
    } finally {
        input.disabled = false;
        input.placeholder = originalPlaceholder;
        input.focus();
    }
}
