/**
 * Review and gate entries decided in the Inbox (CHT-2031): the open row
 * shows the attestation rather than the ritual's prompt, and offers
 * Approve / Sign off, Comment… and Send back… when the server says the
 * viewer may decide. Plus the type filter.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getInbox: vi.fn(() => Promise.resolve([])),
        getInboxUnreadCount: vi.fn(() => Promise.resolve({ unread_count: 0 })),
        markInboxRead: vi.fn(() => Promise.resolve({})),
        archiveInbox: vi.fn(() => Promise.resolve({})),
        getTicketRitualsStatus: vi.fn(),
        approveTicketRitual: vi.fn(() => Promise.resolve({})),
        completeTicketGateRitual: vi.fn(() => Promise.resolve({})),
        createComment: vi.fn(() => Promise.resolve({ id: 'c1' })),
        markAllInboxRead: vi.fn(() => Promise.resolve({ marked_count: 0 })),
    },
}));
vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    isModalOpen: vi.fn(() => false),
    showToast: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showMentionWarnings: vi.fn(),
}));
vi.mock('./event-delegation.js', () => ({ registerActions: vi.fn() }));
vi.mock('./issue-detail-view.js', () => ({ viewIssue: vi.fn() }));
vi.mock('./documents.js', () => ({ viewDocument: vi.fn() }));
vi.mock('./gate-approvals.js', () => ({
    formatRelativeTime: vi.fn(() => '2h ago'),
    renderMarkdown: vi.fn(s => `<p>${s}</p>`),
}));
vi.mock('./rituals-view.js', () => ({
    showRejectTicketRitualModal: vi.fn(),
    showCompleteTicketRitualModal: vi.fn(),
}));
vi.mock('./state.js', () => {
    let entries = [];
    let unread = 0;
    return {
        getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
        getInboxEntries: vi.fn(() => entries),
        setInboxEntries: vi.fn(e => { entries = e; }),
        getInboxUnreadCount: vi.fn(() => unread),
        setInboxUnreadCount: vi.fn(n => { unread = n; }),
        setSelectedInboxIndex: vi.fn(),
    };
});

import { api } from './api.js';
import { showApiError, showToast, closeModal } from './ui.js';
import { showRejectTicketRitualModal, showCompleteTicketRitualModal } from './rituals-view.js';
import { setInboxEntries, getInboxEntries, getInboxUnreadCount } from './state.js';
import { registerActions } from './event-delegation.js';
import {
    renderInbox, toggleInboxEntryExpand, collapseInboxExpand, resetInboxLocalState,
    decideInboxEntry, submitInboxComment, showInboxCommentModal, setInboxKindFilter, loadInbox,
    markAllInboxRead, setInboxUnreadFilter,
} from './inbox.js';

const actions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));
const press = (name, data) => actions[name]({ preventDefault: vi.fn() }, data);
const flush = () => new Promise(r => setTimeout(r, 0));

const PROMPT = 'Does this ticket have clear acceptance criteria?';
const NOTE = 'Spec linked in the description; criteria are the three bullets.';

const REVIEW = {
    id: 'review-1',
    kind: 'review_requested',
    title: 'Review requested: design-review on PRJ-7',
    body: NOTE,
    issue_id: 'issue-7',
    issue_identifier: 'PRJ-7',
    ritual_id: 'rit-1',
    team_id: 'team-1',
    created_at: '2026-11-05T10:00:00Z',
    read_at: null,
    state: 'open',
    actions: [
        { kind: 'approve', path: '/api/rituals/rit-1/approve-issue/issue-7' },
        { kind: 'reject', path: '/api/rituals/rit-1/reject-issue/issue-7', note: 'required' },
        { kind: 'archive', path: '/api/inbox/review-1/archive' },
    ],
};

const RITUAL = {
    id: 'rit-1',
    name: 'design-review',
    prompt: PROMPT,
    approval_mode: 'review',
    trigger: 'ticket_claim',
    attestation: {
        attested_by_name: 'builder-bot',
        attested_at: '2026-11-05T09:58:00Z',
        note: NOTE,
        approved_at: null,
    },
};

const GATE = {
    ...REVIEW,
    id: 'gate-1',
    kind: 'gate_pending',
    title: 'Gate pending: deploy-check on PRJ-7',
    body: 'Deployed to staging?',
    ritual_id: 'gate-r',
    actions: [
        { kind: 'approve', path: '/api/rituals/gate-r/complete-issue/issue-7', note: 'optional' },
        { kind: 'reject', path: '/api/rituals/gate-r/reject-issue/issue-7', note: 'required' },
    ],
};
const GATE_RITUAL = {
    id: 'gate-r', name: 'deploy-check', prompt: 'Deployed to staging?', approval_mode: 'gate',
    trigger: 'ticket_close', attestation: null, artifact: null,
};

function row(id) {
    return [...document.querySelectorAll('#inbox-list .inbox-row')].find(r => r.dataset.entryId === id);
}

async function openRow(entry, status) {
    api.getTicketRitualsStatus.mockResolvedValue(status);
    setInboxEntries([entry]);
    renderInbox();
    toggleInboxEntryExpand(entry.id);
    await flush();
    return row(entry.id);
}

beforeEach(() => {
    vi.clearAllMocks();
    collapseInboxExpand();
    resetInboxLocalState();
    document.body.innerHTML = `
        <div id="inbox-list"></div>
        <span id="inbox-unread-badge" class="hidden">0</span>
        <div id="modal-title"></div><div id="modal-content"></div>
    `;
});

describe('an open review row', () => {
    it('shows the attestation, with the prompt behind a disclosure', async () => {
        const el = await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(api.getTicketRitualsStatus).toHaveBeenCalledWith('issue-7');
        const att = el.querySelector('.ticket-gate-attestation');
        expect(att.textContent).toContain('builder-bot attested');
        expect(att.textContent).toContain(NOTE);
        const asks = el.querySelector('details.inbox-decision-asks');
        expect(asks).not.toBeNull();
        expect(asks.open).toBe(false);
        expect(asks.textContent).toContain(PROMPT);
    });

    it('offers Approve first, then Send back and Comment', async () => {
        const el = await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        const labels = [...el.querySelectorAll('.inbox-action-bar button')].map(b => b.textContent.trim());
        expect(labels.slice(0, 3)).toEqual(['Approve', 'Send back…', 'Comment…']);
        expect(labels).toContain('Archive');
    });

    it('offers only Comment when the server gives no approve action', async () => {
        const viewOnly = { ...REVIEW, actions: [{ kind: 'archive', path: '/x' }] };
        const el = await openRow(viewOnly, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(el.querySelector('[data-action="approve-inbox-entry"]')).toBeNull();
        expect(el.querySelector('[data-action="send-back-inbox-entry"]')).toBeNull();
        expect(el.querySelector('[data-action="comment-inbox-entry"]')).not.toBeNull();
    });

    it('says when it was already decided', async () => {
        const done = { ...RITUAL, attestation: { ...RITUAL.attestation, approved_at: 'x', approved_by_name: 'pat' } };
        const el = await openRow(REVIEW, { pending_rituals: [], completed_rituals: [done] });
        expect(el.textContent).toContain('Already decided by pat');
        expect(el.querySelector('[data-action="approve-inbox-entry"]')).toBeNull();
    });

    it('offers a retry when the ritual fails to load', async () => {
        api.getTicketRitualsStatus.mockRejectedValueOnce(new Error('down'));
        setInboxEntries([REVIEW]);
        renderInbox();
        toggleInboxEntryExpand(REVIEW.id);
        await flush();
        expect(row(REVIEW.id).querySelector('[data-action="retry-inbox-decision"]')).not.toBeNull();
        api.getTicketRitualsStatus.mockResolvedValue({ pending_rituals: [RITUAL], completed_rituals: [] });
        press('retry-inbox-decision', { entryId: REVIEW.id });
        await flush();
        expect(row(REVIEW.id).querySelector('.ticket-gate-attestation')).not.toBeNull();
    });
});

describe('review fixes (PR #532)', () => {
    it('refetches the ritual every time the row is opened', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        toggleInboxEntryExpand(REVIEW.id); // collapse
        // Someone else approved it meanwhile.
        const done = { ...RITUAL, attestation: { ...RITUAL.attestation, approved_at: 'x', approved_by_name: 'pat' } };
        api.getTicketRitualsStatus.mockResolvedValue({ pending_rituals: [], completed_rituals: [done] });
        toggleInboxEntryExpand(REVIEW.id);
        await flush();
        expect(api.getTicketRitualsStatus).toHaveBeenCalledTimes(2);
        expect(row(REVIEW.id).textContent).toContain('Already decided by pat');
    });

    it('does not claim a decision when the ritual simply no longer applies', async () => {
        const el = await openRow(REVIEW, { pending_rituals: [], completed_rituals: [] });
        expect(el.textContent).not.toContain('Already decided');
        expect(el.textContent).toContain('no longer applies');
    });

    it('offers no Comment to a credential that cannot write', async () => {
        const readOnly = { ...REVIEW, actions: [] };
        const el = await openRow(readOnly, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(el.querySelector('[data-action="comment-inbox-entry"]')).toBeNull();
    });

    it('does not fetch for a resolved entry', async () => {
        const el = await openRow({ ...REVIEW, state: 'resolved' }, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(api.getTicketRitualsStatus).not.toHaveBeenCalled();
        expect(el.textContent).toContain('Already decided');
    });

    it('says so when a decision is no longer possible', async () => {
        const viewOnly = { ...REVIEW, actions: [{ kind: 'archive', path: '/x' }] };
        await openRow(viewOnly, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(await decideInboxEntry(REVIEW.id)).toBe(false);
        expect(showToast).toHaveBeenCalledWith('This is no longer waiting on a decision from you.', 'error');
    });

    it('a plain Comment after a failed Comment and approve does not post again', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        api.approveTicketRitual.mockRejectedValueOnce(new Error('409'));
        await submitInboxComment(REVIEW.id, 'LGTM', { decide: true });
        await flush();
        expect(await submitInboxComment(REVIEW.id, 'LGTM')).toBe(true);
        expect(api.createComment).toHaveBeenCalledTimes(1);
    });

    it('marks every decision button busy while approving, and ignores send back meanwhile', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        let release;
        api.approveTicketRitual.mockReturnValueOnce(new Promise(r => { release = r; }));
        const pending = decideInboxEntry(REVIEW.id);
        const el = row(REVIEW.id);
        for (const a of ['approve-inbox-entry', 'send-back-inbox-entry', 'comment-inbox-entry']) {
            expect(el.querySelector(`[data-action="${a}"]`).getAttribute('aria-busy')).toBe('true');
        }
        press('send-back-inbox-entry', { entryId: REVIEW.id, ritualId: 'rit-1', issueId: 'issue-7', ritualName: 'x' });
        expect(showRejectTicketRitualModal).not.toHaveBeenCalled();
        release({});
        await pending;
    });

    it('keeps the "What it asks" disclosure open across a re-render', async () => {
        const el = await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        const details = el.querySelector('details.inbox-decision-asks');
        details.open = true;
        details.dispatchEvent(new Event('toggle'));
        renderInbox();
        expect(row(REVIEW.id).querySelector('details.inbox-decision-asks').open).toBe(true);
    });
});

describe('deciding from the Inbox', () => {
    it('Approve approves the ritual and archives the row', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        press('approve-inbox-entry', { entryId: REVIEW.id });
        await flush();
        expect(api.approveTicketRitual).toHaveBeenCalledWith('rit-1', 'issue-7');
        expect(api.archiveInbox).toHaveBeenCalledWith(REVIEW.id);
        expect(getInboxEntries()).toEqual([]);
        expect(showToast).toHaveBeenCalledWith('Approved design-review on PRJ-7.', 'success');
    });

    it('a failed approve keeps the row and reloads the ritual', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        api.approveTicketRitual.mockRejectedValueOnce(new Error('409'));
        expect(await decideInboxEntry(REVIEW.id)).toBe(false);
        expect(showApiError).toHaveBeenCalled();
        expect(api.archiveInbox).not.toHaveBeenCalled();
        expect(api.getTicketRitualsStatus).toHaveBeenCalledTimes(2);
        expect(getInboxEntries()).toHaveLength(1);
    });

    it('a second press while approving is ignored', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        let release;
        api.approveTicketRitual.mockReturnValueOnce(new Promise(r => { release = r; }));
        const first = decideInboxEntry(REVIEW.id);
        expect(await decideInboxEntry(REVIEW.id)).toBe(false);
        release({});
        await first;
        expect(api.approveTicketRitual).toHaveBeenCalledTimes(1);
    });

    it('Send back opens the reason dialog and archives once sent', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        press('send-back-inbox-entry', {
            entryId: REVIEW.id, ritualId: 'rit-1', issueId: 'issue-7', ritualName: 'design-review',
        });
        const [ritualId, issueId, name, onRejected] = showRejectTicketRitualModal.mock.calls[0];
        expect([ritualId, issueId, name]).toEqual(['rit-1', 'issue-7', 'design-review']);
        await onRejected();
        expect(api.archiveInbox).toHaveBeenCalledWith(REVIEW.id);
    });

    it('Comment posts on the ticket and leaves the row', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(await submitInboxComment(REVIEW.id, '  Which spec?  ')).toBe(true);
        expect(api.createComment).toHaveBeenCalledWith('issue-7', 'Which spec?');
        expect(api.approveTicketRitual).not.toHaveBeenCalled();
        expect(getInboxEntries()).toHaveLength(1);
    });

    it('Comment and approve posts, then approves; a retry does not post twice', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        api.approveTicketRitual.mockRejectedValueOnce(new Error('flaky'));
        expect(await submitInboxComment(REVIEW.id, 'LGTM', { decide: true })).toBe(false);
        await flush();
        expect(await submitInboxComment(REVIEW.id, 'LGTM', { decide: true })).toBe(true);
        expect(api.createComment).toHaveBeenCalledTimes(1);
        expect(api.approveTicketRitual).toHaveBeenCalledTimes(2);
    });

    it('the comment dialog requires text and offers Comment and approve', async () => {
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        showInboxCommentModal(REVIEW.id);
        const form = document.getElementById('inbox-comment-form');
        const labels = [...form.querySelectorAll('button')].map(b => b.textContent.trim());
        expect(labels).toEqual(['Cancel', 'Comment', 'Comment and approve']);
        form.dispatchEvent(new Event('submit', { cancelable: true }));
        await flush();
        expect(document.getElementById('inbox-comment-error').classList.contains('hidden')).toBe(false);
        expect(api.createComment).not.toHaveBeenCalled();
        expect(closeModal).not.toHaveBeenCalled();
    });
});

describe('an open gate row', () => {
    it('shows what it asks in full and offers Sign off', async () => {
        const el = await openRow(GATE, { pending_rituals: [GATE_RITUAL], completed_rituals: [] });
        expect(el.querySelector('details.inbox-decision-asks')).toBeNull();
        expect(el.querySelector('.ticket-gate-asks').textContent).toContain('Deployed to staging?');
        press('sign-off-inbox-entry', {
            entryId: GATE.id, ritualId: 'gate-r', issueId: 'issue-7', ritualName: 'deploy-check', ritualArtifact: '',
        });
        await flush();
        expect(api.completeTicketGateRitual).toHaveBeenCalledWith('gate-r', 'issue-7', null);
        expect(api.archiveInbox).toHaveBeenCalledWith(GATE.id);
    });

    it('a gate that needs an artifact opens its sign-off dialog', async () => {
        const withArtifact = { ...GATE_RITUAL, artifact: 'url' };
        await openRow(GATE, { pending_rituals: [withArtifact], completed_rituals: [] });
        press('sign-off-inbox-entry', {
            entryId: GATE.id, ritualId: 'gate-r', issueId: 'issue-7', ritualName: 'deploy-check', ritualArtifact: 'url',
        });
        const [rid, iid, name, artifact, onCompleted] = showCompleteTicketRitualModal.mock.calls[0];
        expect([rid, iid, name, artifact]).toEqual(['gate-r', 'issue-7', 'deploy-check', 'url']);
        expect(api.completeTicketGateRitual).not.toHaveBeenCalled();
        // Completing it archives the row instead of reloading ticket state.
        await onCompleted();
        expect(api.archiveInbox).toHaveBeenCalledWith(GATE.id);
    });
});

describe('a background refresh under Unread', () => {
    it('rechecks an open decision row the server stopped listing', async () => {
        setInboxUnreadFilter(true);
        await flush();
        await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        const done = { ...RITUAL, attestation: { ...RITUAL.attestation, approved_at: 'x', approved_by_name: 'pat' } };
        api.getTicketRitualsStatus.mockResolvedValue({ pending_rituals: [], completed_rituals: [done] });
        api.getInbox.mockResolvedValueOnce([]); // approved elsewhere: resolved, so not listed
        await loadInbox({ background: true });
        await flush();
        expect(row(REVIEW.id).textContent).toContain('Already decided by pat');
        expect(row(REVIEW.id).querySelector('[data-action="approve-inbox-entry"]')).toBeNull();
        setInboxUnreadFilter(false);
        await flush();
    });
});

describe('the type filter', () => {
    it('turns Mark all read off and hides the team-wide count while filtered', async () => {
        document.body.insertAdjacentHTML('beforeend', `
            <button data-action="mark-all-inbox-read"></button>
            <span id="inbox-header-count"></span>`);
        getInboxUnreadCount.mockReturnValue(3);
        setInboxKindFilter('mentions');
        await flush();
        const btn = document.querySelector('[data-action="mark-all-inbox-read"]');
        expect(btn.disabled).toBe(true);
        expect(document.getElementById('inbox-header-count').textContent).toBe('');
        await markAllInboxRead();
        expect(api.markAllInboxRead).not.toHaveBeenCalled();
        setInboxKindFilter('all');
        await flush();
        expect(btn.disabled).toBe(false);
        expect(document.getElementById('inbox-header-count').textContent).toBe('3 unread');
    });

    it('asks the server for the chosen kinds', async () => {
        document.body.insertAdjacentHTML('beforeend', `
            <button data-action="set-inbox-kind" data-kind="all" class="active"></button>
            <button data-action="set-inbox-kind" data-kind="approvals"></button>`);
        setInboxKindFilter('approvals');
        await flush();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({
            kinds: ['review_requested', 'gate_pending'],
        }));
        const approvals = document.querySelector('[data-kind="approvals"]');
        expect(approvals.classList.contains('active')).toBe(true);
        expect(approvals.getAttribute('aria-pressed')).toBe('true');
        expect(document.getElementById('inbox-list').textContent).toContain('Nothing to approve');

        setInboxKindFilter('all');
        await flush();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({ kinds: null }));
    });

    it('ignores an unknown filter', async () => {
        setInboxKindFilter('bogus');
        await loadInbox();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({ kinds: null }));
    });
});
