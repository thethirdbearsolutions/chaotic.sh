/**
 * Review and gate entries decided in the Inbox (CHT-2031): the open row
 * shows the attestation rather than the ritual's prompt, and offers
 * Approve / Sign off, Comment… and Send back… when the server says the
 * viewer may decide. Plus the type filter.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
        getLimboStatus: vi.fn(),
        approveAttestation: vi.fn(() => Promise.resolve({})),
        completeGateRitual: vi.fn(() => Promise.resolve({})),
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
    completeGateRitual: vi.fn(),
}));
vi.mock('./projects.js', () => ({ getProjects: vi.fn(() => []) }));
vi.mock('./sprints.js', () => ({ loadLimboStatus: vi.fn() }));
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
        getCurrentProject: vi.fn(() => null),
    };
});

import { api } from './api.js';
import { showApiError, showToast, closeModal } from './ui.js';
import { showRejectTicketRitualModal, showCompleteTicketRitualModal, completeGateRitual } from './rituals-view.js';
import { setInboxEntries, getInboxEntries, getInboxUnreadCount, getCurrentProject } from './state.js';
import { getProjects } from './projects.js';
import { loadLimboStatus } from './sprints.js';
import { registerActions } from './event-delegation.js';
import {
    renderInbox, toggleInboxEntryExpand, collapseInboxExpand, resetInboxLocalState,
    decideInboxEntry, submitInboxComment, showInboxCommentModal, setInboxKindFilter, loadInbox,
    markAllInboxRead, setInboxUnreadFilter, applyInboxKindFromUrl, archiveInboxEntryElement,
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
        expect(el.querySelector('.inbox-expanded-source').textContent).toContain('builder-bot attested');
        expect(el.querySelector('.inbox-expanded-body').textContent).toContain(NOTE);
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
        expect(row(REVIEW.id).querySelector('.inbox-expanded-body').textContent).toContain(NOTE);
    });
});

describe('one expanded layout for every kind (CHT-2081)', () => {
    const ASSIGNED = {
        id: 'e-assign', kind: 'assignment', title: 'Ada assigned you APP-3', body: 'Fix the login page',
        issue_id: 'issue-3', issue_identifier: 'APP-3', source_user_id: 'u-ada', source_user_name: 'Ada',
        created_at: '2026-11-05T09:00:00Z', read_at: null, state: 'open',
        actions: [{ kind: 'archive', path: '/x' }],
    };

    function parts(el) {
        const panel = el.querySelector('.inbox-row-expanded-panel');
        return [...panel.children].map(c => c.className.split(' ')[0]);
    }

    it('gives a review and an assignment the same parts in the same order', async () => {
        const review = await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(parts(review)).toEqual(['inbox-expanded-source', 'inbox-expanded-body', 'inbox-decision-asks', 'inbox-action-bar']);
        toggleInboxEntryExpand(REVIEW.id);

        setInboxEntries([ASSIGNED]);
        renderInbox();
        toggleInboxEntryExpand(ASSIGNED.id);
        const assigned = row(ASSIGNED.id);
        expect(parts(assigned)).toEqual(['inbox-expanded-source', 'inbox-expanded-body', 'inbox-action-bar']);
        expect(assigned.querySelector('.inbox-expanded-source').textContent).toContain('Ada assigned you this');
    });

    it('names nobody as attester on a review that was sent back', async () => {
        const sentBack = {
            ...RITUAL, attestation: null,
            last_rejection: { rejected_by_name: 'pat', note: 'Needs numbers', superseded_at: null },
        };
        const el = await openRow(REVIEW, { pending_rituals: [sentBack], completed_rituals: [] });
        expect(el.querySelector('.inbox-expanded-source')).toBeNull();
        expect(el.querySelector('.inbox-expanded-body')).toBeNull();
        expect(el.querySelector('details.inbox-decision-asks').open).toBe(false);
        expect(el.textContent).toContain('Sent back by pat');
    });

    it('names no sender while the ritual loads', async () => {
        api.getTicketRitualsStatus.mockReturnValueOnce(new Promise(() => {}));
        setInboxEntries([REVIEW]);
        renderInbox();
        toggleInboxEntryExpand(REVIEW.id);
        expect(row(REVIEW.id).querySelector('.inbox-expanded-source')).toBeNull();
    });

    it('says a gate is waiting on a sign-off', async () => {
        const el = await openRow(GATE, { pending_rituals: [GATE_RITUAL], completed_rituals: [] });
        expect(el.querySelector('.inbox-expanded-source').textContent).toBe('Waiting on a sign-off');
    });

    it('shows no meta line for a kind with no verb, or about the viewer themself', () => {
        const closed = { ...ASSIGNED, id: 'e-closed', kind: 'children_closed', title: 'Nothing left open on APP-3' };
        const device = { ...ASSIGNED, id: 'e-dev', kind: 'assignment', source_user_id: 'me', recipient_user_id: 'me' };
        for (const entry of [closed, device]) {
            setInboxEntries([entry]);
            renderInbox();
            toggleInboxEntryExpand(entry.id);
            expect(row(entry.id).querySelector('.inbox-expanded-source')).toBeNull();
        }
    });

    it('escapes the attester in the meta line', async () => {
        const evil = { ...RITUAL, attestation: { ...RITUAL.attestation, attested_by_name: '<img src=x onerror=alert(1)>' } };
        const el = await openRow(REVIEW, { pending_rituals: [evil], completed_rituals: [] });
        expect(el.querySelector('.inbox-expanded-source img')).toBeNull();
        expect(el.querySelector('.inbox-expanded-source').textContent).toContain('<img');
    });

    it('puts Send back in the row of outlined buttons, with only the decision filled', async () => {
        const el = await openRow(REVIEW, { pending_rituals: [RITUAL], completed_rituals: [] });
        const buttons = [...el.querySelectorAll('.inbox-action-bar button')];
        expect(buttons[0].classList.contains('btn-primary')).toBe(true);
        for (const b of buttons.slice(1)) {
            expect(b.classList.contains('inbox-action-btn')).toBe(true);
        }
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
        expect(el.querySelector('.inbox-expanded-body').textContent).toContain('Deployed to staging?');
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
            kinds: ['review_requested', 'gate_pending', 'sprint_ritual'],
            includeArchived: true,
        }));
        const approvals = document.querySelector('[data-kind="approvals"]');
        expect(approvals.classList.contains('active')).toBe(true);
        expect(approvals.getAttribute('aria-pressed')).toBe('true');
        expect(document.getElementById('inbox-list').textContent).toContain('Nothing to approve');

        setInboxKindFilter('all');
        await flush();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({ kinds: null, includeArchived: false }));
    });

    it('ignores an unknown filter', async () => {
        setInboxKindFilter('bogus');
        await loadInbox();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({ kinds: null }));
    });
});

describe('sprint close rituals (CHT-2032)', () => {
    const SPRINT_REVIEW = {
        id: 'sprint-1',
        kind: 'sprint_ritual',
        title: 'Review requested: retro for Sprint 4',
        body: 'Retro notes are in the doc.',
        project_id: 'proj-1',
        ritual_id: 'sr-1',
        team_id: 'team-1',
        created_at: '2026-11-05T10:00:00Z',
        read_at: null,
        state: 'open',
        actions: [{ kind: 'approve', path: '/api/rituals/sr-1/approve?project_id=proj-1' }],
    };
    const SPRINT_GATE = {
        ...SPRINT_REVIEW, id: 'sprint-2', ritual_id: 'sg-1', title: 'Sign-off needed: demo for Sprint 4',
        actions: [{ kind: 'approve', path: '/api/rituals/sg-1/complete?project_id=proj-1', note: 'optional' }],
    };
    const REVIEW_R = {
        id: 'sr-1', name: 'retro', prompt: 'Did the team hold a retro?', approval_mode: 'review',
        attestation: { attested_by_name: 'builder-bot', note: 'Retro notes are in the doc.', approved_at: null },
    };
    const GATE_R = { id: 'sg-1', name: 'demo', prompt: 'Was the demo given?', approval_mode: 'gate', attestation: null, artifact: null };

    async function openSprintRow(entry, limbo) {
        api.getLimboStatus.mockResolvedValue(limbo);
        setInboxEntries([entry]);
        renderInbox();
        toggleInboxEntryExpand(entry.id);
        await flush();
        return row(entry.id);
    }

    beforeEach(() => {
        getProjects.mockReturnValue([{ id: 'proj-1', name: 'Website' }]);
    });

    it('reads the ritual from the project limbo and names the project', async () => {
        const r = await openSprintRow(SPRINT_REVIEW, { in_limbo: true, pending_rituals: [REVIEW_R] });
        expect(api.getLimboStatus).toHaveBeenCalledWith('proj-1');
        expect(api.getTicketRitualsStatus).not.toHaveBeenCalled();
        expect(r.querySelector('.inbox-row-source').textContent).toBe('Website');
        expect(r.querySelector('.badge').className).toContain('badge-inbox-sprint_ritual');
        expect(r.textContent).toContain('builder-bot attested');
        expect(r.textContent).toContain('Retro notes are in the doc.');
    });

    it('offers Approve but no Send back or Comment: there is no ticket', async () => {
        const r = await openSprintRow(SPRINT_REVIEW, { in_limbo: true, pending_rituals: [REVIEW_R] });
        expect(r.querySelector('[data-action="approve-inbox-entry"]')).not.toBeNull();
        expect(r.querySelector('[data-action="send-back-inbox-entry"]')).toBeNull();
        expect(r.querySelector('[data-action="comment-inbox-entry"]')).toBeNull();
        expect(r.querySelector('[data-action="open-inbox-full"]')).toBeNull();
    });

    it('Approve approves on the project, refreshes its limbo banner and archives', async () => {
        getCurrentProject.mockReturnValue('proj-1');
        await openSprintRow(SPRINT_REVIEW, { in_limbo: true, pending_rituals: [REVIEW_R] });
        expect(await decideInboxEntry('sprint-1')).toBe(true);
        expect(api.approveAttestation).toHaveBeenCalledWith('sr-1', 'proj-1');
        expect(api.approveTicketRitual).not.toHaveBeenCalled();
        expect(loadLimboStatus).toHaveBeenCalled();
        expect(api.archiveInbox).toHaveBeenCalledWith('sprint-1');
        getCurrentProject.mockReturnValue(null);
    });

    it('does not reload the limbo banner of another project', async () => {
        getCurrentProject.mockReturnValue('proj-2');
        await openSprintRow(SPRINT_REVIEW, { in_limbo: true, pending_rituals: [REVIEW_R] });
        await decideInboxEntry('sprint-1');
        expect(loadLimboStatus).not.toHaveBeenCalled();
        getCurrentProject.mockReturnValue(null);
    });

    it('Sign off on a gate opens the sprint sign-off dialog, which archives on success', async () => {
        const r = await openSprintRow(SPRINT_GATE, { in_limbo: true, pending_rituals: [GATE_R] });
        expect(r.textContent).toContain('Waiting on a sign-off');
        expect(r.textContent).toContain('Was the demo given?');
        const btn = r.querySelector('[data-action="sign-off-inbox-entry"]');
        press('sign-off-inbox-entry', { ...btn.dataset });
        expect(completeGateRitual).toHaveBeenCalledWith('sg-1', 'proj-1', 'demo', '', expect.any(Function));
        await completeGateRitual.mock.calls[0][4]();
        expect(api.archiveInbox).toHaveBeenCalledWith('sprint-2');
    });

    it('says the sprint has closed when the project left limbo', async () => {
        const r = await openSprintRow(SPRINT_REVIEW, { in_limbo: false, pending_rituals: [] });
        expect(r.textContent).toContain('The sprint has closed');
        expect(r.querySelector('[data-action="approve-inbox-entry"]')).toBeNull();
    });

    it('says it is done when the ritual is no longer pending', async () => {
        const r = await openSprintRow(SPRINT_REVIEW, { in_limbo: true, pending_rituals: [GATE_R] });
        expect(r.textContent).toContain('Already done');
    });

    it('waits on an attestation for a review nobody has attested', async () => {
        const r = await openSprintRow(SPRINT_REVIEW, {
            in_limbo: true, pending_rituals: [{ ...REVIEW_R, attestation: null }],
        });
        expect(r.textContent).toContain('Waiting on an attestation.');
        expect(r.querySelector('[data-action="approve-inbox-entry"]')).toBeNull();
    });

    it('pins sprint rows in a Sprint close section above the day groups under Approvals', async () => {
        api.getInbox.mockResolvedValueOnce([REVIEW, SPRINT_REVIEW, SPRINT_GATE]);
        setInboxKindFilter('approvals');
        await flush();
        try {
            const section = document.querySelector('.inbox-sprint-close');
            expect(section.querySelector('h3').textContent).toContain('Sprint close');
            expect(section.querySelector('.section-count').textContent).toBe('2');
            expect(section.querySelector('h3').className).toBe('inbox-group-header');
            expect(section.querySelector('p.text-muted').textContent).toBe('The sprint closes when these are done.');
            expect([...section.querySelectorAll('.inbox-row')].map(r => r.dataset.entryId)).toEqual(['sprint-1', 'sprint-2']);
            // Pinned first in the list itself too, so keyboard order matches.
            expect(getInboxEntries().map(e => e.id)).toEqual(['sprint-1', 'sprint-2', 'review-1']);
            const first = document.querySelector('#inbox-list .inbox-row');
            expect(first.dataset.entryId).toBe('sprint-1');
        } finally {
            setInboxKindFilter('all');
            await flush();
        }
    });

    it('keeps them in the day groups on the unfiltered view', async () => {
        api.getInbox.mockResolvedValueOnce([REVIEW, SPRINT_REVIEW]);
        await loadInbox();
        expect(document.querySelector('.inbox-sprint-close')).toBeNull();
        expect(getInboxEntries().map(e => e.id)).toEqual(['review-1', 'sprint-1']);
    });

    it('marks an archived decision and offers no Archive for it', async () => {
        setInboxEntries([{ ...REVIEW, archived_at: '2026-11-05T11:00:00Z' }]);
        renderInbox();
        toggleInboxEntryExpand('review-1');
        api.getTicketRitualsStatus.mockResolvedValue({ pending_rituals: [RITUAL], completed_rituals: [] });
        await flush();
        const r = row('review-1');
        expect(r.querySelector('.inbox-row-archived').textContent).toBe('archived');
        expect(r.querySelector('[data-action="archive-inbox-entry"]')).toBeNull();
    });
});

describe('sprint close review fixes (PR #549)', () => {
    const SPRINT = {
        ...REVIEW, id: 'sprint-1', kind: 'sprint_ritual', issue_id: null, issue_identifier: null,
        project_id: 'proj-1', ritual_id: 'sr-1', created_at: '2026-11-05T08:00:00Z',
    };

    it('a background refresh under Unread keeps the sprint rows pinned above a kept newer row', async () => {
        const NEWER = { ...REVIEW, created_at: '2026-11-05T12:00:00Z' };
        api.getInbox.mockReset();
        api.getInbox.mockResolvedValue([SPRINT, NEWER]);
        setInboxKindFilter('approvals');
        await flush();
        setInboxUnreadFilter(true);
        await flush();
        try {
            api.getTicketRitualsStatus.mockResolvedValue({ pending_rituals: [RITUAL], completed_rituals: [] });
            toggleInboxEntryExpand(NEWER.id);
            await flush();
            expect(document.querySelector('.inbox-row-expanded').dataset.entryId).toBe('review-1');
            // Read now, so the unread fetch no longer has it; it is kept open.
            api.getInbox.mockResolvedValue([SPRINT]);
            await loadInbox({ background: true });
            await flush();
            expect(getInboxEntries().map(e => e.id)).toEqual(['sprint-1', 'review-1']);
            const pinned = document.querySelector('.inbox-sprint-close');
            expect([...pinned.querySelectorAll('.inbox-row')].map(r => r.dataset.entryId)).toEqual(['sprint-1']);
        } finally {
            api.getInbox.mockResolvedValue([]);
            setInboxUnreadFilter(false);
            setInboxKindFilter('all');
            await flush();
        }
    });

    it('e on an archived row archives nothing', () => {
        setInboxEntries([{ ...REVIEW, archived_at: '2026-11-05T11:00:00Z' }]);
        renderInbox();
        archiveInboxEntryElement(row('review-1'));
        expect(api.archiveInbox).not.toHaveBeenCalled();
        expect(row('review-1')).toBeDefined();
    });

    it('deciding an archived row drops it here without archiving it again', async () => {
        await openRow({ ...REVIEW, archived_at: '2026-11-05T11:00:00Z' }, { pending_rituals: [RITUAL], completed_rituals: [] });
        expect(await decideInboxEntry('review-1')).toBe(true);
        expect(api.approveTicketRitual).toHaveBeenCalled();
        expect(api.archiveInbox).not.toHaveBeenCalled();
        expect(row('review-1')).toBeUndefined();
    });
});

describe('the address picks the type filter (CHT-2032)', () => {
    afterEach(async () => {
        window.history.replaceState({}, '', '/');
        setInboxKindFilter('all');
        await flush();
    });

    it('?kind=approvals turns Approvals on without loading by itself', () => {
        document.body.insertAdjacentHTML('beforeend', `
            <button data-action="set-inbox-kind" data-kind="all" class="active"></button>
            <button data-action="set-inbox-kind" data-kind="approvals"></button>`);
        window.history.replaceState({}, '', '/inbox?kind=approvals');
        applyInboxKindFromUrl();
        expect(api.getInbox).not.toHaveBeenCalled();
        expect(document.querySelector('[data-kind="approvals"]').classList.contains('active')).toBe(true);
    });

    it('an unknown kind, or none, changes nothing', async () => {
        for (const url of ['/inbox?kind=bogus', '/inbox']) {
            window.history.replaceState({}, '', url);
            applyInboxKindFromUrl();
        }
        await loadInbox();
        expect(api.getInbox).toHaveBeenLastCalledWith('team-1', expect.objectContaining({ kinds: null }));
    });
});
