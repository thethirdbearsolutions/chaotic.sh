/**
 * Tests for rituals-view.js module (CHT-784)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock all dependencies
vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn(s => s),
    escapeAttr: vi.fn(s => s),
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    viewProjectSettings: vi.fn(),
}));

vi.mock('./url-helpers.js', () => ({
    getProjectFromUrl: vi.fn(() => null),
}));

vi.mock('./sprints.js', () => ({
    loadLimboStatus: vi.fn(),
    getLimboStatus: vi.fn(() => null),
    showLimboDetailsModal: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    loadTicketRituals: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./api.js', () => ({
    api: {
        approveAttestation: vi.fn(),
        completeGateRitual: vi.fn(),
        attestTicketRitual: vi.fn(),
        approveTicketRitual: vi.fn(),
        completeTicketGateRitual: vi.fn(),
        rejectTicketRitual: vi.fn(),
    },
}));

import {
    loadRitualsView,
    approveRitual,
    completeGateRitual,
    renderArtifactField,
    readArtifactField,
    renderTicketRitualActions,
    showAttestTicketRitualModal,
    attestTicketRitual,
    approveTicketRitual,
    showCompleteTicketRitualModal,
    showRejectTicketRitualModal,
    renderOutstandingRejection,
} from './rituals-view.js';

import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { viewProjectSettings } from './projects.js';
import { loadLimboStatus, getLimboStatus, showLimboDetailsModal } from './sprints.js';
import { loadTicketRituals } from './issue-detail-view.js';
import { api } from './api.js';

describe('rituals-view', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset mock implementations (clearAllMocks doesn't clear mockRejectedValue)
        Object.values(api).forEach(fn => fn.mockReset());
        document.body.innerHTML = '';
    });

    // ========================================
    // loadRitualsView: the rituals route opens Project settings (CHT-2076)
    // ========================================
    describe('loadRitualsView', () => {
        it('opens the current project\'s settings on the sprint rituals tab, replacing the entry', async () => {
            const { setState } = await import('./state.js');
            setState('currentProject', 'p1');
            document.body.innerHTML = '<div id="rituals-content"></div>';

            await loadRitualsView();

            expect(viewProjectSettings).toHaveBeenCalledWith('p1', { tab: 'sprint-rituals', replace: true, onlyIfView: 'projects' });
            expect(document.getElementById('rituals-content').innerHTML).toBe('');
            setState('currentProject', null);
        });

        it('asks for a project with All projects, and opens nothing', async () => {
            const { setState } = await import('./state.js');
            setState('currentProject', null);
            document.body.innerHTML = '<div id="rituals-content"></div>';

            await loadRitualsView();

            expect(viewProjectSettings).not.toHaveBeenCalled();
            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('Select a project');
            expect(content.innerHTML).toContain('settings');
        });

        it('finishes the trip when a project is picked on the rituals route', async () => {
            const { setState } = await import('./state.js');
            setState('currentView', 'rituals');
            setState('currentProject', null);
            document.body.innerHTML = '<div id="rituals-content"></div>';
            viewProjectSettings.mockClear();

            setState('currentProject', 'p2');
            await Promise.resolve();

            expect(viewProjectSettings).toHaveBeenCalledWith('p2', { tab: 'sprint-rituals', replace: true, onlyIfView: 'projects' });
            setState('currentProject', null);
            setState('currentView', null);
        });

        // PR #546 review I2: once redirected, the page is Project settings
        // as reached from Projects, and the switcher no longer drives it.
        it('leaves the rituals route behind once redirected', async () => {
            const { setState, getCurrentView } = await import('./state.js');
            setState('currentView', 'rituals');
            setState('currentProject', 'p1');
            await Promise.resolve();
            expect(getCurrentView()).toBe('projects');
            viewProjectSettings.mockClear();

            setState('currentProject', 'p2');
            await Promise.resolve();

            expect(viewProjectSettings).not.toHaveBeenCalled();
            setState('currentProject', null);
            setState('currentView', null);
        });

        it('ignores a project change on any other view', async () => {
            const { setState } = await import('./state.js');
            setState('currentView', 'issues');
            viewProjectSettings.mockClear();

            setState('currentProject', 'p3');
            await Promise.resolve();

            expect(viewProjectSettings).not.toHaveBeenCalled();
            setState('currentProject', null);
            setState('currentView', null);
        });
    });

    // ========================================
    // approveRitual (sprint/limbo)
    // ========================================
    describe('approveRitual', () => {
        it('calls API and refreshes limbo status', async () => {
            await approveRitual('ritual-1', 'proj-1');

            expect(api.approveAttestation).toHaveBeenCalledWith('ritual-1', 'proj-1');
            expect(showToast).toHaveBeenCalledWith('Ritual approved!', 'success');
            expect(loadLimboStatus).toHaveBeenCalled();
            expect(showLimboDetailsModal).toHaveBeenCalled();
        });

        it('shows error toast on failure', async () => {
            api.approveAttestation.mockRejectedValue(new Error('Denied'));

            await approveRitual('ritual-1', 'proj-1');

            expect(showApiError).toHaveBeenCalledWith('approve ritual', expect.objectContaining({ message: 'Denied' }));
        });
    });

    // ========================================
    // completeGateRitual (sprint/limbo)
    // ========================================
    describe('completeGateRitual', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="modal-title"></div>
                <div id="modal-content"></div>
            `;
        });

        it('renders completion form and shows modal', async () => {
            await completeGateRitual('r1', 'p1', 'Deploy Check');

            expect(document.getElementById('modal-title').textContent).toBe('Sign off: Deploy Check');
            expect(document.getElementById('modal-content').innerHTML).toContain('gate-note');
            expect(showModal).toHaveBeenCalled();
        });

        it('submits completion and clears limbo', async () => {
            getLimboStatus.mockReturnValue({ in_limbo: false });

            await completeGateRitual('r1', 'p1', 'Deploy Check');

            const form = document.getElementById('complete-gate-ritual-form');
            document.getElementById('gate-note').value = 'All good';
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            // Wait for async handler
            await vi.waitFor(() => {
                expect(api.completeGateRitual).toHaveBeenCalledWith('r1', 'p1', 'All good', null);
                expect(closeModal).toHaveBeenCalled();
                expect(showToast).toHaveBeenCalledWith('Limbo cleared! Next sprint is now active.', 'success');
            });
        });

        it('shows limbo details if still in limbo', async () => {
            getLimboStatus.mockReturnValue({ in_limbo: true });

            await completeGateRitual('r1', 'p1', 'Deploy Check');

            const form = document.getElementById('complete-gate-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(showLimboDetailsModal).toHaveBeenCalled();
            });
        });

        it('shows error on API failure', async () => {
            api.completeGateRitual.mockRejectedValue(new Error('Server error'));

            await completeGateRitual('r1', 'p1', 'Deploy Check');

            const form = document.getElementById('complete-gate-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(showApiError).toHaveBeenCalledWith('complete gate ritual', expect.objectContaining({ message: 'Server error' }));
            });
        });
    });

    // ========================================
    // renderTicketRitualActions
    // ========================================
    describe('renderTicketRitualActions', () => {
        it('shows Completed for approved attestation', () => {
            const ritual = { id: 'r1', attestation: { approved_at: '2025-01-01' } };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('Completed');
        });

        it('shows Awaiting approval with Approve button for unapproved attestation', () => {
            const ritual = { id: 'r1', attestation: { approved_at: null } };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('Awaiting approval');
            expect(html).toContain('Approve');
        });

        it('offers Reject beside Approve for an attestation awaiting review (CHT-1606)', () => {
            const ritual = { id: 'r1', name: 'Code review', attestation: { approved_at: null } };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('data-action="reject-ticket-ritual"');
            expect(html).toContain('data-ritual-name="Code review"');
        });

        it('shows Complete button for gate mode without attestation', () => {
            const ritual = { id: 'r1', approval_mode: 'gate' };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('Complete');
            expect(html).toContain('btn-primary');
        });

        it('shows Attest button with modal for note_required', () => {
            const ritual = { id: 'r1', approval_mode: 'review', note_required: true, name: 'QA', prompt: 'Check it' };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('data-action="attest-ticket-ritual-modal"');
            expect(html).toContain('Attest');
        });

        it('shows simple Attest button for auto mode without note_required', () => {
            const ritual = { id: 'r1', approval_mode: 'auto' };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('data-action="attest-ticket-ritual"');
            expect(html).toContain('Attest');
            expect(html).not.toContain('attest-ticket-ritual-modal');
        });

        it('routes a ritual with an artifact to the modal even without a note (CHT-1359)', () => {
            const ritual = { id: 'r1', approval_mode: 'auto', name: 'Retro', artifact: 'document' };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('data-action="attest-ticket-ritual-modal"');
            expect(html).toContain('data-ritual-artifact="document"');
            expect(html).toContain('data-ritual-note-required=""');
        });

        it('offers Reject beside Complete on a gate (PR #353 review finding 6)', () => {
            const ritual = { id: 'r1', approval_mode: 'gate', name: 'Deploy' };
            const html = renderTicketRitualActions(ritual, 'issue-1');
            expect(html).toContain('data-action="complete-ticket-ritual"');
            expect(html).toContain('data-action="reject-ticket-ritual"');
            expect(html).toContain('data-ritual-name="Deploy"');
        });

        it('offers no Reject on a gate already rejected and not asked again', () => {
            const rejected = { id: 'r1', approval_mode: 'gate', last_rejection: { note: 'no', superseded_at: null } };
            expect(renderTicketRitualActions(rejected, 'issue-1')).not.toContain('reject-ticket-ritual');
            const askedAgain = { id: 'r1', approval_mode: 'gate', last_rejection: { note: 'no', superseded_at: '2026-10-13' } };
            expect(renderTicketRitualActions(askedAgain, 'issue-1')).toContain('reject-ticket-ritual');
        });

        it('carries the artifact on the gate Complete button', () => {
            const ritual = { id: 'r1', approval_mode: 'gate', name: 'Review', artifact: 'url' };
            expect(renderTicketRitualActions(ritual, 'issue-1')).toContain('data-ritual-artifact="url"');
        });
    });

    // ========================================
    // Artifact binding (CHT-1359)
    // ========================================
    describe('artifact field', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="modal-title"></div>
                <div id="modal-content"></div>
            `;
        });

        it('renders nothing for a ritual without an artifact', () => {
            expect(renderArtifactField('')).toBe('');
            expect(readArtifactField('')).toBeNull();
        });

        it('requires the document id and sends it as document_id', async () => {
            showAttestTicketRitualModal('r1', 'issue-1', 'Retro', 'Write it', 'document', false);
            expect(document.getElementById('modal-content').innerHTML).toContain('Note (optional)');
            expect(document.getElementById('ritual-artifact-document')).not.toBeNull();

            const form = document.getElementById('attest-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));
            await new Promise(r => setTimeout(r, 50));
            expect(showToast).toHaveBeenCalledWith('This ritual requires the document you wrote for it.', 'error');
            expect(api.attestTicketRitual).not.toHaveBeenCalled();

            document.getElementById('ritual-artifact-document').value = ' doc-42 ';
            form.dispatchEvent(new Event('submit', { cancelable: true }));
            await new Promise(r => setTimeout(r, 50));
            expect(api.attestTicketRitual).toHaveBeenCalledWith('r1', 'issue-1', null, { document_id: 'doc-42' });
        });

        it('requires the link for a url artifact on gate completion', async () => {
            showCompleteTicketRitualModal('r1', 'issue-1', 'Review', 'url');
            document.getElementById('ritual-artifact-url').value = 'https://example.com/pr/1#c';
            document.getElementById('ticket-ritual-note').value = 'ok';
            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));
            await new Promise(r => setTimeout(r, 50));
            expect(api.completeTicketGateRitual).toHaveBeenCalledWith(
                'r1', 'issue-1', 'ok', { url: 'https://example.com/pr/1#c' },
            );
        });

        it('binds the sprint gate completion the same way', async () => {
            api.completeGateRitual.mockResolvedValue({});
            await completeGateRitual('r1', 'p1', 'Retro', 'document');
            document.getElementById('ritual-artifact-document').value = 'doc-7';
            const form = document.getElementById('complete-gate-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));
            await new Promise(r => setTimeout(r, 50));
            expect(api.completeGateRitual).toHaveBeenCalledWith('r1', 'p1', null, { document_id: 'doc-7' });
        });
    });

    // ========================================
    // attestTicketRitual
    // ========================================
    describe('attestTicketRitual', () => {
        it('calls API and reloads ticket rituals', async () => {
            await attestTicketRitual('r1', 'issue-1');

            expect(api.attestTicketRitual).toHaveBeenCalledWith('r1', 'issue-1');
            expect(showToast).toHaveBeenCalledWith('Ritual attested!', 'success');
            expect(loadTicketRituals).toHaveBeenCalledWith('issue-1');
        });

        it('shows error on failure', async () => {
            api.attestTicketRitual.mockRejectedValue(new Error('Failed'));

            await attestTicketRitual('r1', 'issue-1');

            expect(showApiError).toHaveBeenCalledWith('attest ticket ritual', expect.objectContaining({ message: 'Failed' }));
        });
    });

    // ========================================
    // approveTicketRitual
    // ========================================
    describe('approveTicketRitual', () => {
        it('calls API and reloads ticket rituals', async () => {
            await approveTicketRitual('r1', 'issue-1');

            expect(api.approveTicketRitual).toHaveBeenCalledWith('r1', 'issue-1');
            expect(showToast).toHaveBeenCalledWith('Ritual approved!', 'success');
            expect(loadTicketRituals).toHaveBeenCalledWith('issue-1');
        });

        it('shows error on failure', async () => {
            api.approveTicketRitual.mockRejectedValue(new Error('Nope'));

            await approveTicketRitual('r1', 'issue-1');

            expect(showApiError).toHaveBeenCalledWith('approve ticket ritual', expect.objectContaining({ message: 'Nope' }));
        });
    });

    // ========================================
    // showAttestTicketRitualModal
    // ========================================
    describe('showAttestTicketRitualModal', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="modal-title"></div>
                <div id="modal-content"></div>
            `;
        });

        it('renders attest form with prompt hint', () => {
            showAttestTicketRitualModal('r1', 'issue-1', 'QA Check', 'Check all tests pass');

            expect(document.getElementById('modal-title').textContent).toBe('Attest: QA Check');
            expect(document.getElementById('modal-content').innerHTML).toContain('Check all tests pass');
            expect(showModal).toHaveBeenCalled();
        });

        it('renders form without prompt hint when empty', () => {
            showAttestTicketRitualModal('r1', 'issue-1', 'QA Check', '');

            expect(document.getElementById('modal-content').innerHTML).not.toContain('ritual-prompt-hint');
        });

        it('submits attestation with note', async () => {
            showAttestTicketRitualModal('r1', 'issue-1', 'QA Check', '');

            document.getElementById('attest-ritual-note').value = 'All good';
            const form = document.getElementById('attest-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            // Flush microtasks from the async handler
            await new Promise(r => setTimeout(r, 50));

            expect(api.attestTicketRitual).toHaveBeenCalledWith('r1', 'issue-1', 'All good', null);
            expect(showToast).toHaveBeenCalledWith('Ritual attested!', 'success');
            expect(closeModal).toHaveBeenCalled();
            expect(loadTicketRituals).toHaveBeenCalledWith('issue-1');
        });

        it('shows error when note is empty', async () => {
            showAttestTicketRitualModal('r1', 'issue-1', 'QA Check', '');

            document.getElementById('attest-ritual-note').value = '   ';
            const form = document.getElementById('attest-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(showToast).toHaveBeenCalledWith('A note is required for this attestation.', 'error');
            });
            expect(api.attestTicketRitual).not.toHaveBeenCalled();
        });
    });

    // ========================================
    // showCompleteTicketRitualModal
    // ========================================
    describe('showCompleteTicketRitualModal', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="modal-title"></div>
                <div id="modal-content"></div>
            `;
        });

        it('renders completion form and shows modal', () => {
            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            expect(document.getElementById('modal-title').textContent).toBe('Sign off: Deploy Gate');
            expect(document.getElementById('modal-content').innerHTML).toContain('ticket-ritual-note');
            expect(showModal).toHaveBeenCalled();
        });

        it('submits completion with note', async () => {
            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            document.getElementById('ticket-ritual-note').value = 'Deployed';
            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'issue-1', 'Deployed', null);
            });
            expect(closeModal).toHaveBeenCalled();
            expect(loadTicketRituals).toHaveBeenCalledWith('issue-1');
        });

        it('submits null when note is empty', async () => {
            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            document.getElementById('ticket-ritual-note').value = '';
            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'issue-1', null, null);
            });
        });

        it('shows error on API failure', async () => {
            api.completeTicketGateRitual.mockRejectedValue(new Error('Deploy blocked'));

            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(showApiError).toHaveBeenCalledWith('complete ticket ritual', expect.objectContaining({ message: 'Deploy blocked' }));
            });
        });
    });

    // ========================================
    // Reject (CHT-1606)
    // ========================================
    describe('renderOutstandingRejection', () => {
        it('shows who rejected and why', () => {
            const html = renderOutstandingRejection({ note: 'No tests', rejected_by_name: 'Ethan', superseded_at: null });
            expect(html).toContain('Rejected by Ethan');
            expect(html).toContain('No tests');
        });

        it('is empty once answered, or with no rejection', () => {
            expect(renderOutstandingRejection({ note: 'x', superseded_at: '2026-10-13' })).toBe('');
            expect(renderOutstandingRejection(null)).toBe('');
        });
    });

    describe('showRejectTicketRitualModal', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="modal-title"></div>
                <div id="modal-content"></div>
            `;
        });

        const submit = () => document.getElementById('reject-ticket-ritual-form')
            .dispatchEvent(new Event('submit', { cancelable: true }));

        it('renders a required reason and shows the modal', () => {
            showRejectTicketRitualModal('r1', 'issue-1', 'Deploy Gate');
            expect(document.getElementById('modal-title').textContent).toBe('Reject: Deploy Gate');
            expect(document.getElementById('reject-ritual-note').required).toBe(true);
            expect(showModal).toHaveBeenCalled();
        });

        it('refuses a blank reason without calling the API', async () => {
            showRejectTicketRitualModal('r1', 'issue-1', 'Deploy Gate');
            document.getElementById('reject-ritual-note').value = '   ';
            submit();
            await vi.waitFor(() => {
                expect(showToast).toHaveBeenCalledWith('A rejection needs a reason.', 'error');
            });
            expect(api.rejectTicketRitual).not.toHaveBeenCalled();
        });

        it('sends the trimmed reason, closes and reloads', async () => {
            const onRejected = vi.fn();
            showRejectTicketRitualModal('r1', 'issue-1', 'Deploy Gate', onRejected);
            document.getElementById('reject-ritual-note').value = '  Not yet  ';
            submit();
            await vi.waitFor(() => {
                expect(onRejected).toHaveBeenCalled();
            });
            expect(api.rejectTicketRitual).toHaveBeenCalledWith('r1', 'issue-1', 'Not yet');
            expect(closeModal).toHaveBeenCalled();
        });

        it('shows the API error and keeps the modal open', async () => {
            api.rejectTicketRitual.mockRejectedValue(new Error('Already rejected'));
            showRejectTicketRitualModal('r1', 'issue-1', 'Deploy Gate');
            document.getElementById('reject-ritual-note').value = 'why';
            submit();
            await vi.waitFor(() => {
                expect(showApiError).toHaveBeenCalledWith('reject ritual', expect.objectContaining({ message: 'Already rejected' }));
            });
            expect(closeModal).not.toHaveBeenCalled();
        });
    });
});
