/**
 * Rituals View module - Rituals management and ticket ritual actions (CHT-784)
 *
 * Extracted from app.js. Handles the rituals route, which opens the rituals
 * tabs in Project settings (CHT-2076), and ticket-level ritual actions
 * (attest, approve, complete).
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import { viewProjectSettings } from './projects.js';
import { loadLimboStatus, getLimboStatus, showLimboDetailsModal } from './sprints.js';
import { loadTicketRituals } from './issue-detail-view.js';
import { getCurrentProject, getCurrentView, setCurrentView, subscribe } from './state.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';

// ========================================
// Rituals route (CHT-2076)
// ========================================
//
// Rituals have one home: the three rituals tabs in Project settings. The
// rituals route (/rituals, g r, the palette) opens them for the project the
// switcher shows. With All projects it shows a "pick a project" state, and
// picking one from the switcher finishes the trip.

// React to project changes while the rituals route is current (CHT-1083).
// Deferred so the switcher's own subscriber writes ?project= first and the
// redirect's replaceState leaves the settings address clean.
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'rituals') return;
    queueMicrotask(() => loadRitualsView());
});

/**
 * Open the current project's rituals in Project settings, replacing the
 * /rituals history entry so Back skips it. Once there, the current view is
 * Projects, as when settings is opened from Projects, so the switcher no
 * longer drives the page (PR #546 review I2).
 */
export async function loadRitualsView() {
    const projectId = getCurrentProject();
    if (projectId) {
        setCurrentView('projects');
        await viewProjectSettings(projectId, { tab: 'sprint-rituals', replace: true, onlyIfView: 'projects' });
        return;
    }
    const container = document.getElementById('rituals-content');
    if (container) container.innerHTML = renderEmptyState({
        icon: EMPTY_ICONS.projects,
        heading: 'Select a project',
        description: 'Rituals live in each project\'s settings. Pick a project in the sidebar switcher, or press P.',
    });
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
        showApiError('approve ritual', e);
    }
}

// ========================================
// Artifact binding (CHT-1359)
// ========================================

/**
 * The form field for a ritual's artifact: a document id or a URL the
 * attestation is bound to. Empty string for a ritual without one.
 */
export function renderArtifactField(artifact) {
    if (artifact === 'document') {
        return `
            <div class="form-group">
                <label for="ritual-artifact-document">Document id (required)</label>
                <input type="text" id="ritual-artifact-document" placeholder="The document you wrote for this ritual" required>
                <p class="form-help">Must be yours and written for this sprint or ticket.</p>
            </div>
        `;
    }
    if (artifact === 'url') {
        return `
            <div class="form-group">
                <label for="ritual-artifact-url">Link (required)</label>
                <input type="url" id="ritual-artifact-url" placeholder="https://..." required>
            </div>
        `;
    }
    return '';
}

/**
 * Read the artifact field back: `{ document_id }` / `{ url }`, null for a
 * ritual without an artifact, or undefined (after a toast) when required
 * and empty.
 */
export function readArtifactField(artifact) {
    if (artifact === 'document') {
        const value = (document.getElementById('ritual-artifact-document')?.value || '').trim();
        if (!value) {
            showToast('This ritual requires the document you wrote for it.', 'error');
            return undefined;
        }
        return { document_id: value };
    }
    if (artifact === 'url') {
        const value = (document.getElementById('ritual-artifact-url')?.value || '').trim();
        if (!value) {
            showToast('This ritual requires a link to the artifact.', 'error');
            return undefined;
        }
        return { url: value };
    }
    return null;
}

export async function completeGateRitual(ritualId, projectId, ritualName, artifact = '') {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-gate-ritual-form">
            <div class="form-group">
                <label for="gate-note">Note (optional)</label>
                <textarea id="gate-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${renderArtifactField(artifact)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-gate-ritual-form').addEventListener('submit', (event) => {
        handleCompleteGateRitual(event, ritualId, projectId, artifact);
    });
    showModal();
}

async function handleCompleteGateRitual(event, ritualId, projectId, artifact = '') {
    event.preventDefault();
    const note = document.getElementById('gate-note').value;
    const bound = readArtifactField(artifact);
    if (bound === undefined) return false;

    try {
        await api.completeGateRitual(ritualId, projectId, note || null, bound);
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
        showApiError('complete gate ritual', e);
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
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}">Reject</button>
        `;
    }

    const artifact = escapeAttr(ritual.artifact || '');

    // Not attested - GATE mode requires human completion
    if (ritual.approval_mode === 'gate') {
        const complete = `<button class="btn btn-small btn-primary" data-action="complete-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" data-ritual-artifact="${artifact}">Complete</button>`;
        // CHT-1606: a gate request can be sent back too, unless it already
        // was and the requester has not asked again (the server refuses a
        // reject when nobody is waiting on the gate, and says so).
        const outstanding = ritual.last_rejection && !ritual.last_rejection.superseded_at;
        if (outstanding) return complete;
        return `${complete}
            <button class="btn btn-small btn-secondary" data-action="reject-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" title="Send the gate request back with a reason">Reject</button>`;
    }

    // AUTO or REVIEW mode - agent can attest. A note or an artifact needs
    // the modal; without either, one click attests.
    if (ritual.note_required || ritual.artifact) {
        return `<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual-modal" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(ritual.name)}" data-ritual-prompt="${escapeAttr(ritual.prompt || '')}" data-ritual-artifact="${artifact}" data-ritual-note-required="${ritual.note_required ? '1' : ''}">Attest</button>`;
    }
    return `<button class="btn btn-small btn-secondary" data-action="attest-ticket-ritual" data-ritual-id="${escapeAttr(ritual.id)}" data-issue-id="${escapeAttr(issueId)}">Attest</button>`;
}

export function showAttestTicketRitualModal(ritualId, issueId, ritualName, ritualPrompt, artifact = '', noteRequired = true) {
    document.getElementById('modal-title').textContent = `Attest: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="attest-ticket-ritual-form">
            ${ritualPrompt ? `<p class="ritual-prompt-hint">${escapeHtml(ritualPrompt)}</p>` : ''}
            <div class="form-group">
                <label for="attest-ritual-note">Note (${noteRequired ? 'required' : 'optional'})</label>
                <textarea id="attest-ritual-note" placeholder="Describe what was done..." ${noteRequired ? 'required' : ''}></textarea>
            </div>
            ${renderArtifactField(artifact)}
            <button type="submit" class="btn btn-primary">Attest</button>
        </form>
    `;
    document.getElementById('attest-ticket-ritual-form').addEventListener('submit', (event) => {
        handleAttestTicketRitual(event, ritualId, issueId, artifact, noteRequired);
    });
    showModal();
}

async function handleAttestTicketRitual(event, ritualId, issueId, artifact = '', noteRequired = true) {
    event.preventDefault();
    const note = document.getElementById('attest-ritual-note').value.trim();
    if (noteRequired && !note) {
        showToast('A note is required for this attestation.', 'error');
        return false;
    }
    const bound = readArtifactField(artifact);
    if (bound === undefined) return false;
    try {
        await api.attestTicketRitual(ritualId, issueId, note || null, bound);
        showToast('Ritual attested!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showApiError('attest ticket ritual', e);
    }
    return false;
}

export async function attestTicketRitual(ritualId, issueId) {
    try {
        await api.attestTicketRitual(ritualId, issueId);
        showToast('Ritual attested!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showApiError('attest ticket ritual', e);
    }
}

export async function approveTicketRitual(ritualId, issueId) {
    try {
        await api.approveTicketRitual(ritualId, issueId);
        showToast('Ritual approved!', 'success');
        await loadTicketRituals(issueId);
    } catch (e) {
        showApiError('approve ticket ritual', e);
    }
}

/**
 * The rejection a human has not seen answered yet (CHT-1606): shown on a
 * pending ritual so the attester reads why before trying again.
 */
export function renderOutstandingRejection(rejection) {
    if (!rejection || rejection.superseded_at) return '';
    const who = escapeHtml(rejection.rejected_by_name || 'Someone');
    return `<div class="ticket-ritual-rejection"><strong>Rejected by ${who}:</strong> ${escapeHtml(rejection.note || '')}</div>`;
}

/**
 * Reject a ticket's GATE request or REVIEW attestation with a required
 * reason (CHT-1606). `onRejected` reloads whichever view opened it.
 */
export function showRejectTicketRitualModal(ritualId, issueId, ritualName, onRejected = null) {
    document.getElementById('modal-title').textContent = `Reject: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="reject-ticket-ritual-form">
            <p class="ritual-prompt-hint">The gate stays pending and the ticket does not move. The attester is told why and can try again.</p>
            <div class="form-group">
                <label for="reject-ritual-note">Reason (required)</label>
                <textarea id="reject-ritual-note" placeholder="What has to change before this can pass?" required></textarea>
            </div>
            <button type="submit" class="btn btn-danger">Reject</button>
        </form>
    `;
    document.getElementById('reject-ticket-ritual-form').addEventListener('submit', (event) => {
        handleRejectTicketRitual(event, ritualId, issueId, ritualName, onRejected);
    });
    showModal();
}

export async function handleRejectTicketRitual(event, ritualId, issueId, ritualName, onRejected = null) {
    event.preventDefault();
    const note = document.getElementById('reject-ritual-note').value.trim();
    if (!note) {
        showToast('A rejection needs a reason.', 'error');
        return false;
    }
    try {
        await api.rejectTicketRitual(ritualId, issueId, note);
        showToast(`"${ritualName}" rejected. The attester has been told why.`, 'success');
        closeModal();
        if (onRejected) await onRejected();
    } catch (e) {
        showApiError('reject ritual', e);
    }
    return false;
}

export function showCompleteTicketRitualModal(ritualId, issueId, ritualName, artifact = '') {
    document.getElementById('modal-title').textContent = `Complete: ${ritualName}`;
    document.getElementById('modal-content').innerHTML = `
        <form id="complete-ticket-ritual-form">
            <div class="form-group">
                <label for="ticket-ritual-note">Note (optional)</label>
                <textarea id="ticket-ritual-note" placeholder="Describe what was done..."></textarea>
            </div>
            ${renderArtifactField(artifact)}
            <button type="submit" class="btn btn-primary">Complete Ritual</button>
        </form>
    `;
    // Attach event listener programmatically to avoid XSS via inline handlers (CHT-166)
    document.getElementById('complete-ticket-ritual-form').addEventListener('submit', (event) => {
        handleCompleteTicketRitual(event, ritualId, issueId, artifact);
    });
    showModal();
}

async function handleCompleteTicketRitual(event, ritualId, issueId, artifact = '') {
    event.preventDefault();
    const note = document.getElementById('ticket-ritual-note').value;
    const bound = readArtifactField(artifact);
    if (bound === undefined) return false;

    try {
        await api.completeTicketGateRitual(ritualId, issueId, note || null, bound);
        showToast('Ritual completed!', 'success');
        closeModal();
        await loadTicketRituals(issueId);
    } catch (e) {
        showApiError('complete ticket ritual', e);
    }
    return false;
}

// Register delegated event handlers
registerActions({
    'approve-ticket-ritual': (_event, data) => {
        approveTicketRitual(data.ritualId, data.issueId);
    },
    'reject-ticket-ritual': (_event, data) => {
        showRejectTicketRitualModal(
            data.ritualId, data.issueId, data.ritualName, () => loadTicketRituals(data.issueId),
        );
    },
    'complete-ticket-ritual': (_event, data) => {
        showCompleteTicketRitualModal(data.ritualId, data.issueId, data.ritualName, data.ritualArtifact || '');
    },
    'attest-ticket-ritual-modal': (_event, data) => {
        showAttestTicketRitualModal(
            data.ritualId, data.issueId, data.ritualName, data.ritualPrompt,
            data.ritualArtifact || '', data.ritualNoteRequired !== '',
        );
    },
    'attest-ticket-ritual': (_event, data) => {
        attestTicketRitual(data.ritualId, data.issueId);
    },
});
