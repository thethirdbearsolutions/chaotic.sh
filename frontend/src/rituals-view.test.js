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
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
    loadProjects: vi.fn(),
    getSavedProjectId: vi.fn(() => null),
    getProjectRituals: vi.fn(() => []),
    loadProjectSettingsRituals: vi.fn(),
    renderRitualList: vi.fn(),
    setCurrentSettingsProjectId: vi.fn(),
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
    },
}));

import {
    updateRitualProjectFilter,
    loadRitualsView,
    onRitualsProjectChange,
    renderRitualsView,
    approveRitual,
    completeGateRitual,
    renderTicketRitualActions,
    showAttestTicketRitualModal,
    attestTicketRitual,
    approveTicketRitual,
    showCompleteTicketRitualModal,
} from './rituals-view.js';

import { showModal, closeModal, showToast } from './ui.js';
import { getProjects, loadProjects, getSavedProjectId, getProjectRituals, loadProjectSettingsRituals, renderRitualList, setCurrentSettingsProjectId } from './projects.js';
import { getProjectFromUrl } from './url-helpers.js';
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
    // updateRitualProjectFilter
    // ========================================
    describe('updateRitualProjectFilter', () => {
        it('returns early if no filter element', async () => {
            await updateRitualProjectFilter();
            expect(loadProjects).not.toHaveBeenCalled();
        });

        it('populates project dropdown', async () => {
            document.body.innerHTML = '<select id="ritual-project-filter"></select>';
            getProjects.mockReturnValue([
                { id: 'p1', name: 'Project One' },
                { id: 'p2', name: 'Project Two' },
            ]);

            await updateRitualProjectFilter();

            expect(loadProjects).toHaveBeenCalled();
            const filter = document.getElementById('ritual-project-filter');
            expect(filter.innerHTML).toContain('Select Project');
            expect(filter.innerHTML).toContain('Project One');
            expect(filter.innerHTML).toContain('Project Two');
        });
    });

    // ========================================
    // loadRitualsView
    // ========================================
    describe('loadRitualsView', () => {
        it('returns early if no filter element', async () => {
            await loadRitualsView();
            expect(loadProjects).not.toHaveBeenCalled();
        });

        it('sets _onRitualsChanged callback', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"></select>
                <div id="rituals-content"></div>
            `;
            getProjects.mockReturnValue([]);

            await loadRitualsView();

            expect(window._onRitualsChanged).toBe(renderRitualsView);
        });

        it('auto-selects saved project from URL', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"></select>
                <div id="rituals-content"></div>
            `;
            getProjects.mockReturnValue([{ id: 'p1', name: 'Project One' }]);
            getProjectFromUrl.mockReturnValue('p1');
            // loadProjectSettingsRituals is called by onRitualsProjectChange
            // which needs the filter value to be set

            await loadRitualsView();

            const filter = document.getElementById('rituals-project-filter');
            expect(filter.value).toBe('p1');
            expect(setCurrentSettingsProjectId).toHaveBeenCalledWith('p1');
        });

        it('shows empty state when no saved project', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"></select>
                <div id="rituals-content"></div>
            `;
            getProjects.mockReturnValue([{ id: 'p1', name: 'Test' }]);
            getProjectFromUrl.mockReturnValue(null);
            getSavedProjectId.mockReturnValue(null);

            await loadRitualsView();

            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('Select a project');
        });
    });

    // ========================================
    // onRitualsProjectChange
    // ========================================
    describe('onRitualsProjectChange', () => {
        it('shows empty state when no project selected', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"><option value="">Select</option></select>
                <div id="rituals-tabs" class="settings-tabs hidden"></div>
                <div id="rituals-content"></div>
            `;

            await onRitualsProjectChange();

            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('Select a project');
            expect(setCurrentSettingsProjectId).not.toHaveBeenCalled();
        });

        it('loads rituals for selected project', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"><option value="p1">Project</option></select>
                <div id="rituals-content"></div>
            `;
            document.getElementById('rituals-project-filter').value = 'p1';

            await onRitualsProjectChange();

            expect(setCurrentSettingsProjectId).toHaveBeenCalledWith('p1');
            expect(loadProjectSettingsRituals).toHaveBeenCalled();
        });

        it('shows error on failure', async () => {
            document.body.innerHTML = `
                <select id="rituals-project-filter"><option value="p1">Project</option></select>
                <div id="rituals-content"></div>
            `;
            document.getElementById('rituals-project-filter').value = 'p1';
            loadProjectSettingsRituals.mockRejectedValue(new Error('Network fail'));

            await onRitualsProjectChange();

            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('Error loading rituals');
            expect(content.innerHTML).toContain('Network fail');
        });
    });

    // ========================================
    // renderRitualsView
    // ========================================
    describe('renderRitualsView', () => {
        it('renders sprint, close, and claim sections', () => {
            document.body.innerHTML = '<div id="rituals-tabs" class="settings-tabs hidden"></div><div id="rituals-content"></div>';
            getProjectRituals.mockReturnValue([
                { id: 'r1', trigger: 'every_sprint', name: 'Sprint Review' },
                { id: 'r2', trigger: 'ticket_close', name: 'QA Check' },
                { id: 'r3', trigger: 'ticket_claim', name: 'Capacity Check' },
            ]);

            renderRitualsView();

            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('closing a sprint');
            expect(content.innerHTML).toContain('closing a ticket');
            expect(content.innerHTML).toContain('claiming a ticket');
            expect(renderRitualList).toHaveBeenCalledTimes(3);
            // Tabs should be visible
            expect(document.getElementById('rituals-tabs').classList.contains('hidden')).toBe(false);
        });

        it('handles rituals with no trigger as sprint rituals', () => {
            document.body.innerHTML = '<div id="rituals-tabs" class="settings-tabs hidden"></div><div id="rituals-content"></div>';
            getProjectRituals.mockReturnValue([
                { id: 'r1', name: 'No Trigger Ritual' },
            ]);

            renderRitualsView();

            // First call is sprint rituals
            expect(renderRitualList).toHaveBeenCalledWith(
                'rv-sprint-rituals-list',
                [{ id: 'r1', name: 'No Trigger Ritual' }],
                'sprint'
            );
        });

        it('renders sections with empty rituals', () => {
            document.body.innerHTML = '<div id="rituals-tabs" class="settings-tabs hidden"></div><div id="rituals-content"></div>';
            getProjectRituals.mockReturnValue([]);

            renderRitualsView();

            const content = document.getElementById('rituals-content');
            expect(content.innerHTML).toContain('closing a sprint');
            expect(content.innerHTML).toContain('closing a ticket');
            expect(content.innerHTML).toContain('claiming a ticket');
            expect(renderRitualList).toHaveBeenCalledWith('rv-sprint-rituals-list', [], 'sprint');
            expect(renderRitualList).toHaveBeenCalledWith('rv-close-rituals-list', [], 'close');
            expect(renderRitualList).toHaveBeenCalledWith('rv-claim-rituals-list', [], 'claim');
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

            expect(showToast).toHaveBeenCalledWith('Denied', 'error');
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

            expect(document.getElementById('modal-title').textContent).toBe('Complete: Deploy Check');
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
                expect(api.completeGateRitual).toHaveBeenCalledWith('r1', 'p1', 'All good');
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
                expect(showToast).toHaveBeenCalledWith('Server error', 'error');
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

            expect(showToast).toHaveBeenCalledWith('Failed', 'error');
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

            expect(showToast).toHaveBeenCalledWith('Nope', 'error');
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

            expect(api.attestTicketRitual).toHaveBeenCalledWith('r1', 'issue-1', 'All good');
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

            expect(document.getElementById('modal-title').textContent).toBe('Complete: Deploy Gate');
            expect(document.getElementById('modal-content').innerHTML).toContain('ticket-ritual-note');
            expect(showModal).toHaveBeenCalled();
        });

        it('submits completion with note', async () => {
            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            document.getElementById('ticket-ritual-note').value = 'Deployed';
            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'issue-1', 'Deployed');
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
                expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'issue-1', null);
            });
        });

        it('shows error on API failure', async () => {
            api.completeTicketGateRitual.mockRejectedValue(new Error('Deploy blocked'));

            showCompleteTicketRitualModal('r1', 'issue-1', 'Deploy Gate');

            const form = document.getElementById('complete-ticket-ritual-form');
            form.dispatchEvent(new Event('submit', { cancelable: true }));

            await vi.waitFor(() => {
                expect(showToast).toHaveBeenCalledWith('Deploy blocked', 'error');
            });
        });
    });
});
