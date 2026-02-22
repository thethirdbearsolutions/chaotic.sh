/**
 * Rituals View module - Rituals management and ticket ritual actions (CHT-784)
 *
 * Extracted from app.js. Handles the top-level rituals view (listing/managing
 * project rituals) and ticket-level ritual actions (attest, approve, complete).
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { showModal, closeModal, showToast } from './ui.js';
import { registerActions } from './event-delegation.js';
import {
    getProjects,
    loadProjects,
    getSavedProjectId,
    getProjectRituals,
    loadProjectSettingsRituals,
    renderRitualList,
    setCurrentSettingsProjectId,
} from './projects.js';
import { getProjectFromUrl } from './url-helpers.js';
import { loadLimboStatus, getLimboStatus, showLimboDetailsModal } from './sprints.js';
import { loadTicketRituals } from './issue-detail-view.js';

// ========================================
// Rituals top-level view
// ========================================

/**
 * Update the ritual project filter dropdown in settings view.
 */
export async function updateRitualProjectFilter() {
    const filter = document.getElementById('ritual-project-filter');
    if (!filter) return;

    await loadProjects();
    filter.innerHTML = '<option value="">Select Project</option>' +
        getProjects().map(p => `<option value="${escapeAttr(p.id)}">${escapeHtml(p.name)}</option>`).join('');
}

/**
 * Load the top-level rituals view. Sets up project filter and
 * registers the _onRitualsChanged callback for CRUD refresh.
 */
export async function loadRitualsView() {
    const filter = document.getElementById('rituals-project-filter');
    if (!filter) return;

    // Set callback so CRUD operations refresh the rituals view
    window._onRitualsChanged = renderRitualsView;

    await loadProjects();
    filter.innerHTML = '<option value="">Select a project</option>' +
        getProjects().map(p => `<option value="${escapeAttr(p.id)}">${escapeHtml(p.name)}</option>`).join('');

    // Auto-select saved project
    const savedProject = getProjectFromUrl() || getSavedProjectId();
    if (savedProject && getProjects().some(p => p.id === savedProject)) {
        filter.value = savedProject;
        onRitualsProjectChange();
    } else {
        document.getElementById('rituals-content').innerHTML =
            '<div class="empty-state">Select a project to view and manage rituals.</div>';
    }
}

/**
 * Handle project filter change in the rituals view.
 */
export async function onRitualsProjectChange() {
    const projectId = document.getElementById('rituals-project-filter').value;
    const container = document.getElementById('rituals-content');

    if (!projectId) {
        document.getElementById('rituals-tabs').classList.add('hidden');
        container.innerHTML = '<div class="empty-state">Select a project to view and manage rituals.</div>';
        return;
    }

    // Set the project context so create/edit/delete functions work
    setCurrentSettingsProjectId(projectId);

    container.innerHTML = '<div class="loading">Loading rituals...</div>';

    try {
        await loadProjectSettingsRituals();
        // renderRitualsView() is called via the _onRitualsChanged callback
    } catch (e) {
        container.innerHTML = `<div class="empty-state">Error loading rituals: ${escapeHtml(e.message)}</div>`;
    }
}

/**
 * Render the rituals view with tabbed sprint, close, and claim ritual sections.
 */
export function renderRitualsView() {
    const container = document.getElementById('rituals-content');
    const rituals = getProjectRituals();

    const sprintRituals = rituals.filter(r => !r.trigger || r.trigger === 'every_sprint');
    const closeRituals = rituals.filter(r => r.trigger === 'ticket_close');
    const claimRituals = rituals.filter(r => r.trigger === 'ticket_claim');

    // Show the tabs bar
    document.getElementById('rituals-tabs').classList.remove('hidden');

    container.innerHTML = `
        <div id="rituals-tab-sprint" class="settings-tab-content">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a sprint</p>
                <button class="btn btn-primary" data-action="create-project-ritual" data-trigger="every_sprint">+ Create Ritual</button>
            </div>
            <div id="rv-sprint-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-close" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when closing a ticket</p>
                <button class="btn btn-primary" data-action="create-project-ritual" data-trigger="ticket_close">+ Create Ritual</button>
            </div>
            <div id="rv-close-rituals-list" class="rituals-list"></div>
        </div>
        <div id="rituals-tab-claim" class="settings-tab-content hidden">
            <div class="settings-section-header">
                <p class="settings-description">Required when claiming a ticket (moving to in_progress)</p>
                <button class="btn btn-primary" data-action="create-project-ritual" data-trigger="ticket_claim">+ Create Ritual</button>
            </div>
            <div id="rv-claim-rituals-list" class="rituals-list"></div>
        </div>
    `;

    // Render ritual lists into the view-specific containers
    renderRitualList('rv-sprint-rituals-list', sprintRituals, 'sprint');
    renderRitualList('rv-close-rituals-list', closeRituals, 'close');
    renderRitualList('rv-claim-rituals-list', claimRituals, 'claim');
}

/**
 * Switch between ritual tabs (sprint, close, claim).
 */
export function switchRitualsTab(tabName) {
    const tabs = document.getElementById('rituals-tabs');
    tabs.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
    tabs.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    document.querySelectorAll('#rituals-content > .settings-tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(`rituals-tab-${tabName}`).classList.remove('hidden');
}

// ========================================
// Sprint ritual approval (limbo)
// ========================================

export async function approveRitual(ritualId, projectId) {
    try {
        await api.approveAttestation(ritualId, projectId);
        showToast('Ritual approved!', 'success');
        await loadLimboStatus();
        showLimboDetailsModal();
    } catch (e) {
        showToast(e.message, 'error');
    }
}

export async function completeGateRitual(ritualId, projectId, ritualName) {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-gate-ritual-form').addEventListener('submit', (event) => {
        handleCompleteGateRitual(event, ritualId, projectId);
    });
    showModal();
}

async function handleCompleteGateRitual(event, ritualId, projectId) {
    event.preventDefault();
    const note = document.getElementById('gate-note').value;

    try {
        await api.completeGateRitual(ritualId, projectId, note || null);
        showToast('Ritual completed!', 'success');
        await loadLimboStatus();

        const ls = getLimboStatus();
        if (ls && !ls.in_limbo) {
            closeModal();
            showToast('Limbo cleared! Next sprint is now active.', 'success');
        } else {
            showLimboDetailsModal();
        }
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// ========================================
// Ticket-level ritual actions
// ========================================

/**
 * Render the action buttons for a ticket ritual based on its state.
 */
export function renderTicketRitualActions(ritual, issueId) {
    // Already attested and approved
    if (ritual.attestation && ritual.attestation.approved_at) {
        return '<span class="text-success">Completed</span>';
    }

    // Attested but awaiting approval (REVIEW mode)
    if (ritual.attestation && !ritual.attestation.approved_at) {
        return `
            <span class="text-warning">Awaiting approval</span>
            <button class="btn btn-small btn-primary" data-action="approve-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}">Approve</button>
        `;
    }

    // Not attested - GATE mode requires human completion
    if (ritual.approval_mode === 'gate') {
        return `<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}">Complete</button>`;
    }

    // AUTO or REVIEW mode - agent can attest
    if (ritual.note_required) {
        return `<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" data-ritual-prompt="${escapeAttr(ritual.prompt || '')}">Attest</button>`;
    }
    return `<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}">Attest</button>`;
}

export function showAttestTicketRitualModal(ritualId, issueId, ritualName, ritualPrompt) {
    document.getElementById('modal-title').textContent = `Attest: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="attest-ticket-ritual-form">
            ${ritualPrompt ? `<p class="ritual-prompt-hint">${escapeHtml(ritualPrompt)}</p>` : ''}
            <div class="form-group">
                <label for="attest-ritual-note">Note (required)</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `;
    document.getElementById('attest-ticket-ritual-form').addEventListener('submit', (event) => {
        handleAttestTicketRitual(event, ritualId, issueId);
    });
    showModal();
}

async function handleAttestTicketRitual(event, ritualId, issueId) {
    event.preventDefault();
    const note = document.getElementById('attest-ritual-note').value.trim();
    if (!note) {
        showToast('A note is required for this attestation.', 'error');
        return false;
    }
    try {
        await api.attestTicketRitual(ritualId, issueId, note);
        showToast('Ritual attested!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

export async function attestTicketRitual(ritualId, issueId) {
    try {
        await api.attestTicketRitual(ritualId, issueId);
        showToast('Ritual attested!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

export async function approveTicketRitual(ritualId, issueId) {
    try {
        await api.approveTicketRitual(ritualId, issueId);
        showToast('Ritual approved!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
}

export function showCompleteTicketRitualModal(ritualId, issueId, ritualName) {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-ticket-ritual-form').addEventListener('submit', (event) => {
        handleCompleteTicketRitual(event, ritualId, issueId);
    });
    showModal();
}

async function handleCompleteTicketRitual(event, ritualId, issueId) {
    event.preventDefault();
    const note = document.getElementById('ticket-ritual-note').value;

    try {
        await api.completeTicketGateRitual(ritualId, issueId, note || null);
        showToast('Ritual completed!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showToast(e.message, 'error');
    }
    return false;
}

// Register delegated event handlers
registerActions({
    'create-project-ritual': (_event, data) => {
        if (window.showCreateProjectRitualModal) {
            window.showCreateProjectRitualModal(data.trigger);
        }
    },
    'approve-ticket-ritual': (_event, data) => {
        approveTicketRitual(data.ritualId, data.issueId);
    },
    'complete-ticket-ritual': (_event, data) => {
        showCompleteTicketRitualModal(data.ritualId, data.issueId, data.ritualName);
    },
    'attest-ticket-ritual-modal': (_event, data) => {
        showAttestTicketRitualModal(data.ritualId, data.issueId, data.ritualName, data.ritualPrompt);
    },
    'attest-ticket-ritual': (_event, data) => {
        attestTicketRitual(data.ritualId, data.issueId);
    },
});
