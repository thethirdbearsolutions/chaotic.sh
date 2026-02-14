/**
 * Tests for gate-approvals.js module
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        completeTicketGateRitual: vi.fn(),
        approveTicketRitual: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn(s => s || ''),
    escapeJsString: vi.fn(s => s || ''),
}));

import { api } from './api.js';
import { showModal, closeModal, showToast } from './ui.js';
import {
    showGateApprovalModal,
    handleGateApproval,
    completeGateFromList,
    showReviewApprovalModal,
    handleReviewApproval,
    approveReviewFromList,
} from './gate-approvals.js';

beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
        <div id="modal-title"></div>
        <div id="modal-content"></div>
    `;
    window.navigateTo = vi.fn();
    window.viewIssue = vi.fn();
    window.loadGateApprovals = vi.fn();
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
        expect(window.loadGateApprovals).toHaveBeenCalled();
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

        expect(showToast).toHaveBeenCalledWith('fail', 'error');
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

    it('shows error toast on failure', async () => {
        api.approveTicketRitual.mockRejectedValue(new Error('unauthorized'));
        const event = { preventDefault: vi.fn() };

        await handleReviewApproval(event, 'r1', 'i1', 'Review');

        expect(showToast).toHaveBeenCalledWith('unauthorized', 'error');
    });
});

describe('approveReviewFromList', () => {
    it('delegates to showReviewApprovalModal', () => {
        approveReviewFromList('r1', 'i1', 'Review', 'prompt', 'CHT-1', 'Title', 'Bob', '2026-01-01', 'note');
        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Approve: Review');
    });
});

describe('window exports', () => {
    it('exposes completeGateFromList on window', () => {
        expect(window.completeGateFromList).toBe(completeGateFromList);
    });

    it('exposes approveReviewFromList on window', () => {
        expect(window.approveReviewFromList).toBe(approveReviewFromList);
    });
});
