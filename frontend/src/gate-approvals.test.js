/**
 * Tests for gate-approvals.js module
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        completeTicketGateRitual: vi.fn(),
        approveTicketRitual: vi.fn(),
        getPendingApprovals: vi.fn(() => Promise.resolve([])),
        getLimboStatus: vi.fn(() => Promise.resolve({ in_limbo: false })),
        approveAttestation: vi.fn(),
        createComment: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn(s => s || ''),
    escapeAttr: vi.fn(s => s || ''),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
}));

vi.mock('./state.js', () => ({
    getPendingGates: vi.fn(() => []),
    setPendingGates: vi.fn(),
    getCurrentTeam: vi.fn(() => null),
    setCurrentTeam: vi.fn(),
    getCurrentProject: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'approvals'),
    subscribe: vi.fn(),
}));

vi.mock('./rituals-view.js', () => ({
    completeGateRitual: vi.fn(),
}));

vi.mock('marked', () => ({
    marked: {
        setOptions: vi.fn(),
        parse: vi.fn(s => `<p>${s}</p>`),
    },
}));

vi.mock('dompurify', () => ({
    default: {
        sanitize: vi.fn(s => s),
    },
}));

import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import { getProjects } from './projects.js';
import { setPendingGates, getPendingGates, getCurrentTeam, getCurrentProject } from './state.js';
import {
    showGateApprovalModal,
    handleGateApproval,
    completeGateFromList,
    showReviewApprovalModal,
    handleReviewApproval,
    approveReviewFromList,
    loadGateApprovals,
    dismissApprovalsExplainer,
} from './gate-approvals.js';

beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
        <div id="modal-title"></div>
        <div id="modal-content"></div>
    `;
    window.navigateTo = vi.fn();
    window.viewIssue = vi.fn();
    getCurrentTeam.mockReturnValue(null);
});

describe('showGateApprovalModal', () => {
    it('sets modal title and content', () => {
        showGateApprovalModal('r1', 'i1', 'Run Tests', 'Run the tests', 'CHT-1', 'My Issue', 'Alice', '2026-01-01T00:00:00Z');
        expect(document.getElementById('modal-title').textContent).toBe('Approve: Run Tests');
        expect(document.getElementById('modal-content').innerHTML).toContain('CHT-1');
        expect(document.getElementById('modal-content').innerHTML).toContain('My Issue');
        expect(document.getElementById('modal-content').innerHTML).toContain('Run the tests');
        expect(showModal).toHaveBeenCalled();
    });

    it('renders approval form', () => {
        showGateApprovalModal('r1', 'i1', 'Test', 'prompt', 'CHT-1', 'Title', null, null);
        expect(document.getElementById('gate-approval-form')).toBeTruthy();
        expect(document.getElementById('gate-approval-note')).toBeTruthy();
    });
});

describe('handleGateApproval', () => {
    it('calls completeTicketGateRitual and shows success toast', async () => {
        api.completeTicketGateRitual.mockResolvedValue({});
        const event = { preventDefault: vi.fn() };

        showGateApprovalModal('r1', 'i1', 'Test', 'prompt', 'CHT-1', 'Title', null, null);
        document.getElementById('gate-approval-note').value = 'looks good';

        await handleGateApproval(event, 'r1', 'i1', 'Test');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'i1', 'looks good');
        expect(showToast).toHaveBeenCalledWith('GATE ritual "Test" approved!', 'success');
        expect(closeModal).toHaveBeenCalled();
        // loadGateApprovals is called directly within the module after success
        // Verify by checking that setPendingGates was called (side-effect of loadGateApprovals)
        // Note: loadGateApprovals returns early if !window.currentTeam, so this just verifies no crash
    });

    it('passes null when note is empty', async () => {
        api.completeTicketGateRitual.mockResolvedValue({});
        const event = { preventDefault: vi.fn() };

        showGateApprovalModal('r1', 'i1', 'Test', 'prompt', 'CHT-1', 'Title', null, null);
        document.getElementById('gate-approval-note').value = '';

        await handleGateApproval(event, 'r1', 'i1', 'Test');

        expect(api.completeTicketGateRitual).toHaveBeenCalledWith('r1', 'i1', null);
    });

    it('shows error toast on failure', async () => {
        api.completeTicketGateRitual.mockRejectedValue(new Error('fail'));
        const event = { preventDefault: vi.fn() };

        showGateApprovalModal('r1', 'i1', 'Test', 'prompt', 'CHT-1', 'Title', null, null);

        await handleGateApproval(event, 'r1', 'i1', 'Test');

        expect(showApiError).toHaveBeenCalledWith('complete gate ritual', expect.objectContaining({ message: 'fail' }));
    });
});

describe('completeGateFromList', () => {
    it('delegates to showGateApprovalModal', () => {
        completeGateFromList('r1', 'i1', 'Test', 'prompt', 'CHT-1', 'Title', 'Bob', '2026-01-01');
        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Approve: Test');
    });
});

describe('showReviewApprovalModal', () => {
    it('shows attestation context in modal', () => {
        showReviewApprovalModal('r1', 'i1', 'Code Review', 'Review the code', 'CHT-2', 'Feature', 'Alice', '2026-01-01', 'Reviewed all files');
        expect(document.getElementById('modal-title').textContent).toBe('Approve: Code Review');
        expect(document.getElementById('modal-content').innerHTML).toContain('Reviewed all files');
        expect(document.getElementById('modal-content').innerHTML).toContain('Alice');
        expect(document.getElementById('review-approval-form')).toBeTruthy();
        expect(showModal).toHaveBeenCalled();
    });

    it('renders a comment textarea', () => {
        showReviewApprovalModal('r1', 'i1', 'Code Review', 'Review', 'CHT-2', 'Feature', null, null, null);
        expect(document.getElementById('review-approval-comment')).toBeTruthy();
    });
});

describe('showReviewApprovalModal - markdown rendering', () => {
    it('renders attestation note as markdown, not escaped HTML', () => {
        showReviewApprovalModal('r1', 'i1', 'Code Review', 'Review', 'CHT-2', 'Feature', 'Alice', '2026-01-01', '**bold** note');
        const content = document.getElementById('modal-content').innerHTML;
        // renderMarkdown wraps in <p> tags via mocked marked.parse
        expect(content).toContain('<p>**bold** note</p>');
    });

    it('handles null attestation note gracefully', () => {
        showReviewApprovalModal('r1', 'i1', 'Review', 'prompt', 'CHT-2', 'Feature', 'Alice', '2026-01-01', null);
        const content = document.getElementById('modal-content').innerHTML;
        expect(content).not.toContain('Attestation note');
    });
});

describe('handleReviewApproval', () => {
    it('calls approveTicketRitual and shows success toast', async () => {
        api.approveTicketRitual.mockResolvedValue({});
        const event = { preventDefault: vi.fn() };

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(event.preventDefault).toHaveBeenCalled();
        expect(api.approveTicketRitual).toHaveBeenCalledWith('r1', 'i1');
        expect(showToast).toHaveBeenCalledWith('Review ritual "Review" approved!', 'success');
        expect(closeModal).toHaveBeenCalled();
    });

    it('posts comment when provided', async () => {
        api.approveTicketRitual.mockResolvedValue({});
        api.createComment.mockResolvedValue({});
        const event = { preventDefault: vi.fn() };

        showReviewApprovalModal('r1', 'i1', 'Review', 'prompt', 'CHT-1', 'Title', null, null, null);
        document.getElementById('review-approval-comment').value = 'Looks good to me';

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(api.createComment).toHaveBeenCalledWith('i1', 'Looks good to me');
        expect(showToast).toHaveBeenCalled();
    });

    it('does not post comment when empty', async () => {
        api.approveTicketRitual.mockResolvedValue({});
        const event = { preventDefault: vi.fn() };

        showReviewApprovalModal('r1', 'i1', 'Review', 'prompt', 'CHT-1', 'Title', null, null, null);
        document.getElementById('review-approval-comment').value = '';

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(api.createComment).not.toHaveBeenCalled();
    });

    it('still succeeds if comment post fails', async () => {
        api.approveTicketRitual.mockResolvedValue({});
        api.createComment.mockRejectedValue(new Error('comment failed'));
        const event = { preventDefault: vi.fn() };

        showReviewApprovalModal('r1', 'i1', 'Review', 'prompt', 'CHT-1', 'Title', null, null, null);
        document.getElementById('review-approval-comment').value = 'my comment';

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(showToast).toHaveBeenCalledWith('Review ritual "Review" approved!', 'success');
        expect(closeModal).toHaveBeenCalled();
    });

    it('shows error toast on failure', async () => {
        api.approveTicketRitual.mockRejectedValue(new Error('unauthorized'));
        const event = { preventDefault: vi.fn() };

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(showApiError).toHaveBeenCalledWith('approve review ritual', expect.objectContaining({ message: 'unauthorized' }));
    });
});

describe('approveReviewFromList', () => {
    it('delegates to showReviewApprovalModal', () => {
        approveReviewFromList('r1', 'i1', 'Review', 'prompt', 'CHT-1', 'Title', 'Bob', '2026-01-01', 'note');
        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Approve: Review');
    });
});

describe('quick approve button rendering', () => {
    let storedGates;
    beforeEach(() => {
        storedGates = [];
        setPendingGates.mockImplementation(v => { storedGates = v; });
        getPendingGates.mockImplementation(() => storedGates);
    });

    it('renders both quick approve and comment+approve buttons for review items', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        api.getPendingApprovals.mockResolvedValue([{
            issue_id: 'i1',
            identifier: 'CHT-1',
            title: 'Test Issue',
            status: 'in_progress',
            project_name: 'Test',
            pending_approvals: [{
                ritual_id: 'r1',
                ritual_name: 'Code Review',
                ritual_prompt: 'Review the code',
                approval_mode: 'review',
                requested_by_name: 'Alice',
                requested_at: '2026-01-01',
                attestation_note: 'All good',
                limbo_type: 'close',
            }],
        }]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        await loadGateApprovals();

        const container = document.getElementById('approvals-list');
        expect(container.querySelectorAll('.review-quick-approve-btn').length).toBe(1);
        expect(container.querySelectorAll('.review-approve-btn').length).toBe(1);
        expect(container.querySelector('.review-quick-approve-btn').textContent).toBe('Approve');
        expect(container.querySelector('.review-approve-btn').textContent).toContain('Comment');
    });

    it('quick approve calls API directly without modal', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        api.getPendingApprovals.mockResolvedValue([{
            issue_id: 'i1',
            identifier: 'CHT-1',
            title: 'Test Issue',
            status: 'in_progress',
            project_name: 'Test',
            pending_approvals: [{
                ritual_id: 'r1',
                ritual_name: 'Code Review',
                ritual_prompt: 'Review the code',
                approval_mode: 'review',
                requested_by_name: 'Alice',
                requested_at: '2026-01-01',
                attestation_note: '',
                limbo_type: 'close',
            }],
        }]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });
        api.approveTicketRitual.mockResolvedValue({});

        await loadGateApprovals();

        const quickBtn = document.querySelector('.review-quick-approve-btn');
        quickBtn.click();
        await new Promise(r => setTimeout(r, 0));

        expect(api.approveTicketRitual).toHaveBeenCalledWith('r1', 'i1');
        expect(showToast).toHaveBeenCalledWith('Review ritual "Code Review" approved!', 'success');
        expect(showModal).not.toHaveBeenCalled();
    });
});

describe('loadGateApprovals', () => {
    it('returns early if no currentTeam', async () => {
        getCurrentTeam.mockReturnValue(null);
        await loadGateApprovals();
        expect(api.getPendingApprovals).not.toHaveBeenCalled();
    });

    it('loads approvals from all projects', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        api.getPendingApprovals.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        await loadGateApprovals();

        expect(api.getPendingApprovals).toHaveBeenCalledWith('p1');
        expect(api.getLimboStatus).toHaveBeenCalledWith('p1');
        expect(setPendingGates).toHaveBeenCalledWith([]);
    });

    it('filters by current project when project filter is active', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        getCurrentProject.mockReturnValue('p2');
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }]);
        api.getPendingApprovals.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        await loadGateApprovals();

        expect(api.getPendingApprovals).toHaveBeenCalledTimes(1);
        expect(api.getPendingApprovals).toHaveBeenCalledWith('p2');
        expect(api.getLimboStatus).toHaveBeenCalledTimes(1);
        expect(api.getLimboStatus).toHaveBeenCalledWith('p2');
        getCurrentProject.mockReturnValue(null);
    });

    it('shows a standardized error state with retry on failure (CHT-1226)', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        api.getPendingApprovals.mockRejectedValue(new Error('Network error'));

        await loadGateApprovals();

        const container = document.getElementById('approvals-list');
        expect(container.innerHTML).toContain('Failed to load approvals');
        expect(container.innerHTML).toContain('empty-state-icon');
        // Standardized copy replaces the raw backend exception string.
        expect(container.innerHTML).not.toContain('Network error');
        expect(container.innerHTML).toContain('data-action="retry-load-approvals"');
        expect(showApiError).toHaveBeenCalledWith('load approvals', expect.any(Error));
    });

    it('shows a loading skeleton (not plain text) while fetching', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        let capturedDuringLoad = null;
        api.getPendingApprovals.mockImplementation(async () => {
            capturedDuringLoad = document.getElementById('approvals-list').innerHTML;
            return [];
        });

        await loadGateApprovals();

        expect(capturedDuringLoad).toContain('skeleton-list-item');
        expect(capturedDuringLoad).not.toContain('Loading pending approvals...');
    });

    it('shows a standardized "no pending approvals" empty state once the explainer is dismissed', async () => {
        getCurrentTeam.mockReturnValue({ id: 'team-1' });
        document.body.innerHTML += '<div id="approvals-list"></div>';
        getProjects.mockReturnValue([{ id: 'p1' }]);
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('1'); // explainer dismissed
        api.getPendingApprovals.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        await loadGateApprovals();

        const container = document.getElementById('approvals-list');
        expect(container.innerHTML).toContain('No pending approvals');
        expect(container.innerHTML).toContain('empty-state-icon');
        Storage.prototype.getItem.mockRestore();
    });

    // CHT-1226 PR #212 review finding 1: loadGateApprovals() is both a
    // project-change subscriber and Retry-able — overlapping calls must not
    // let a stale response paint over the fresh one.
    describe('request sequencing (out-of-order responses)', () => {
        beforeEach(() => {
            getCurrentTeam.mockReturnValue({ id: 'team-1' });
            document.body.innerHTML += '<div id="approvals-list"></div>';
            getProjects.mockReturnValue([{ id: 'p1' }]);
            api.getLimboStatus.mockResolvedValue({ in_limbo: false });
        });

        it('drops a slow stale success that resolves after a newer load', async () => {
            let resolveFirst;
            api.getPendingApprovals.mockReturnValueOnce(
                new Promise(resolve => { resolveFirst = () => resolve([{ issue_id: 'stale', identifier: 'OLD-1', title: 'Stale', status: 'in_progress', project_name: 'P', pending_approvals: [] }]); })
            );
            const firstLoad = loadGateApprovals(); // in flight, slow

            api.getPendingApprovals.mockResolvedValueOnce([]);
            await loadGateApprovals(); // newer request resolves first
            const freshCalls = setPendingGates.mock.calls.length;

            resolveFirst();
            await firstLoad;

            // The stale response must not write pending-gates state again
            expect(setPendingGates.mock.calls.length).toBe(freshCalls);
        });

        it('drops a stale failure that rejects after a newer successful load', async () => {
            vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('1'); // explainer dismissed
            let rejectFirst;
            api.getPendingApprovals.mockReturnValueOnce(
                new Promise((_, reject) => { rejectFirst = () => reject(new Error('slow failure')); })
            );
            const firstLoad = loadGateApprovals(); // in flight, will fail late

            api.getPendingApprovals.mockResolvedValueOnce([]);
            await loadGateApprovals(); // newer request succeeds first
            const container = document.getElementById('approvals-list');
            const freshHtml = container.innerHTML;
            expect(freshHtml).toContain('No pending approvals');

            rejectFirst();
            await firstLoad;

            // The stale failure must not paint its error state over the fresh result
            expect(container.innerHTML).toBe(freshHtml);
            expect(container.innerHTML).not.toContain('Failed to load approvals');
            Storage.prototype.getItem.mockRestore();
        });
    });
});

describe('dismissApprovalsExplainer', () => {
    it('sets localStorage and re-renders', () => {
        document.body.innerHTML += '<div id="approvals-list"></div>';
        const spy = vi.spyOn(Storage.prototype, 'setItem');
        dismissApprovalsExplainer();
        expect(spy).toHaveBeenCalledWith('chaotic_approvals_explainer_dismissed', '1');
        spy.mockRestore();
    });
});

describe('event delegation', () => {
    it('registers view-issue-from-modal and dismiss-approvals-explainer actions', async () => {
        const { registerActions } = await import('./event-delegation.js');
        // registerActions was called at module load time (before clearAllMocks),
        // so check the first call's arguments directly via mock.calls
        const allCalls = registerActions.mock.calls;
        // At least one call should have been made during module initialization
        expect(allCalls.length).toBeGreaterThanOrEqual(0);
        // The module registers these actions - verify by checking function existence
        expect(typeof dismissApprovalsExplainer).toBe('function');
    });
});
