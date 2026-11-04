/**
 * Tests for ticket-gate.js (CHT-2020): one next step, one primary action.
 */
import { describe, it, expect, vi } from 'vitest';

vi.mock('./gate-approvals.js', () => ({
    renderMarkdown: vi.fn((s) => `<p>${String(s).replace(/</g, '&lt;')}</p>`),
}));

import {
    classifyTicketRituals,
    isAwaitingApproval,
    renderTicketGatePanel,
    renderTicketGateStickyBar,
    describeTicketGate,
} from './ticket-gate.js';

const review = {
    id: 'r-review', name: 'tests-pass', prompt: 'Paste the summary.', trigger: 'ticket_close',
    approval_mode: 'review', note_required: true,
    attestation: { id: 'a1', attested_by_name: 'builder-agent', attested_at: '2026-11-04T20:00:00Z', note: 'All green', approved_at: null, artifact_ref: 'https://example.com/pr/1' },
};
const gate = { id: 'r-gate', name: 'human-qa', prompt: 'Try it.', trigger: 'ticket_close', approval_mode: 'gate', note_required: false, attestation: null };
const todo = { id: 'r-auto', name: 'changelog', prompt: 'Add a line.', trigger: 'ticket_close', approval_mode: 'auto', note_required: false, attestation: null };
const done = { id: 'r-done', name: 'read-the-spec', trigger: 'ticket_claim', approval_mode: 'auto', attestation: { attested_by_name: 'builder-agent', attested_at: '2026-11-04T18:00:00Z', approved_at: '2026-11-04T18:00:00Z' } };

const dom = (html) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el;
};

describe('classifyTicketRituals', () => {
    it('puts human steps on the viewer only when they can act', () => {
        const status = { pending_rituals: [review, gate, todo], completed_rituals: [done] };
        const admin = classifyTicketRituals(status, { canAct: true });
        expect(admin.needsYou.map(r => r.id)).toEqual(['r-review', 'r-gate']);
        expect(admin.waiting.map(r => r.id)).toEqual(['r-auto']);
        expect(admin.done.map(r => r.id)).toEqual(['r-done']);
        expect(admin.total).toBe(4);

        const other = classifyTicketRituals(status, { canAct: false });
        expect(other.needsYou).toEqual([]);
        expect(other.waiting.map(r => r.id)).toEqual(['r-review', 'r-gate', 'r-auto']);
    });

    it('treats a missing payload as no rituals', () => {
        expect(classifyTicketRituals(null).total).toBe(0);
        expect(renderTicketGatePanel(null, 'i1')).toBe('');
        expect(renderTicketGatePanel({ pending_rituals: [], completed_rituals: [] }, 'i1')).toBe('');
    });

    it('knows an approved attestation is not awaiting approval', () => {
        expect(isAwaitingApproval(review)).toBe(true);
        expect(isAwaitingApproval(done)).toBe(false);
        expect(isAwaitingApproval(todo)).toBe(false);
    });
});

describe('renderTicketGatePanel', () => {
    it('shows the first step waiting on you, with one primary button', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [review, gate], completed_rituals: [done] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate.you')).not.toBeNull();
        expect(el.querySelector('.ticket-gate-kicker').textContent).toBe('Waiting on you · needed to close');
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Review tests-pass');
        expect(el.querySelectorAll('.btn-primary').length).toBe(1);
        const approve = el.querySelector('[data-action="approve-ticket-ritual"]');
        expect(approve.dataset.ritualId).toBe('r-review');
        expect(approve.dataset.issueId).toBe('i1');
        expect(el.querySelector('[data-action="reject-ticket-ritual"]').textContent).toContain('Send back');
        expect(el.querySelector('.ticket-gate-note').textContent).toContain('All green');
        expect(el.querySelector('.ticket-gate-then').textContent).toBe('Then: sign off on human-qa.');
        expect(el.querySelector('.ticket-gate-list summary').textContent).toBe('1 of 3 rituals done');
    });

    it('offers Sign off for an open gate', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [gate], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Sign off on human-qa');
        expect(el.querySelector('[data-action="complete-ticket-ritual"]').textContent).toBe('Sign off');
        expect(el.querySelector('[data-action="reject-ticket-ritual"]')).not.toBeNull();
    });

    it('a sent-back gate waits on whoever asked for it, not on the admin', () => {
        const rejected = { ...gate, last_rejection: { rejected_by_name: 'Sam', note: 'Not yet', superseded_at: null } };
        const status = { pending_rituals: [rejected], completed_rituals: [] };
        expect(classifyTicketRituals(status, { canAct: true }).needsYou).toEqual([]);
        const el = dom(renderTicketGatePanel(status, 'i1', { canAct: true, assigneeName: 'builder-agent' }));
        expect(el.querySelector('.ticket-gate.waiting')).not.toBeNull();
        expect(el.querySelector('.ticket-gate-kicker').textContent).toBe('Waiting on builder-agent · needed to close');
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Ask again for human-qa');
        expect(el.textContent).toContain('Sam sent it back');
        expect(el.querySelector('.btn-primary')).toBeNull();
        expect(el.querySelector('[data-action="reject-ticket-ritual"]')).toBeNull();
        // An admin can still pass it, quietly.
        expect(el.querySelector('[data-action="complete-ticket-ritual"]').textContent).toBe('Sign off anyway');
        // Someone who cannot pass it gets no button at all.
        const other = dom(renderTicketGatePanel(status, 'i1', { canAct: false, assigneeName: 'builder-agent' }));
        expect(other.querySelector('[data-action="complete-ticket-ritual"]')).toBeNull();
        expect(renderTicketGateStickyBar(status, { canAct: true })).toBe('');
    });

    it('says whether a ritual holds back starting or closing', () => {
        const claim = { ...review, trigger: 'ticket_claim' };
        const el = dom(renderTicketGatePanel({ pending_rituals: [claim], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-when').textContent).toBe(' · needed to start');
    });

    it('shows the earlier send-back a re-attested review answers', () => {
        const again = { ...review, last_rejection: { rejected_by_name: 'Sam', note: 'Paste the log', superseded_at: '2026-11-04T19:00:00Z' } };
        const el = dom(renderTicketGatePanel({ pending_rituals: [again], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-earlier').textContent).toContain('Sent back before: Sam sent it back');
        expect(el.querySelector('.ticket-gate-earlier').textContent).toContain('Paste the log');
        // Not shown when nothing was sent back.
        expect(dom(renderTicketGatePanel({ pending_rituals: [review], completed_rituals: [] }, 'i1', { canAct: true })).querySelector('.ticket-gate-earlier')).toBeNull();
    });

    it('copes with missing names and times', () => {
        const bare = { ...review, attestation: { id: 'a2', attested_by_name: null, attested_at: null, note: null, approved_at: null } };
        const el = dom(renderTicketGatePanel({ pending_rituals: [bare], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-by').textContent).toContain('Someone attested');
        expect(el.querySelector('.ticket-gate-note')).toBeNull();
        expect(el.querySelector('.ticket-gate-artifact')).toBeNull();
    });

    it('shows waiting on the assignee, muted, with only a quiet attest link', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [todo], completed_rituals: [done] }, 'i1', { canAct: true, assigneeName: 'builder-agent' }));
        expect(el.querySelector('.ticket-gate.waiting')).not.toBeNull();
        expect(el.querySelector('.ticket-gate-kicker').textContent).toBe('Waiting on builder-agent · needed to close');
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Attest changelog');
        expect(el.querySelector('.btn-primary')).toBeNull();
        expect(el.querySelector('[data-action="attest-ticket-ritual"]')).not.toBeNull();
    });

    it('uses the attest modal when a note or artifact is required', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [{ ...todo, note_required: true }], completed_rituals: [] }, 'i1'));
        const link = el.querySelector('[data-action="attest-ticket-ritual-modal"]');
        expect(link.dataset.ritualNoteRequired).toBe('1');
    });

    it('says why a sent-back ritual is waiting', () => {
        const sentBack = { ...todo, last_rejection: { rejected_by_name: 'Sam', note: 'Paste the webkit run too.', superseded_at: null } };
        const el = dom(renderTicketGatePanel({ pending_rituals: [sentBack], completed_rituals: [] }, 'i1', { assigneeName: 'builder-agent' }));
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Re-attest changelog');
        expect(el.querySelector('.ticket-gate-asks').textContent).toContain('Sam sent it back');
        expect(el.querySelector('.ticket-gate-asks').textContent).toContain('Paste the webkit run too.');
    });

    it('waits on an admin or a person when the viewer cannot pass the step', () => {
        expect(dom(renderTicketGatePanel({ pending_rituals: [review], completed_rituals: [] }, 'i1')).querySelector('.ticket-gate-kicker').textContent)
            .toBe('Waiting on an admin · needed to close');
        expect(dom(renderTicketGatePanel({ pending_rituals: [gate], completed_rituals: [] }, 'i1')).querySelector('.ticket-gate-kicker').textContent)
            .toBe('Waiting on a person · needed to close');
    });

    it('is one line when everything is done', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [], completed_rituals: [done] }, 'i1'));
        expect(el.querySelector('.ticket-gate.clear')).not.toBeNull();
        expect(el.querySelector('summary').textContent).toBe('All 1 ritual done');
        expect(el.querySelector('.btn')).toBeNull();
    });

    it('links an http(s) artifact, routes a document id, and ignores anything else', () => {
        let el = dom(renderTicketGatePanel({ pending_rituals: [review], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-artifact').getAttribute('href')).toBe('https://example.com/pr/1');

        const doc = { ...review, attestation: { ...review.attestation, artifact_ref: 'doc-123' } };
        el = dom(renderTicketGatePanel({ pending_rituals: [doc], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-artifact').getAttribute('href')).toBe('/document/doc-123');
        expect(el.querySelector('.ticket-gate-artifact').dataset.action).toBe('open-gate-document');
        expect(el.querySelector('.ticket-gate-artifact').dataset.documentId).toBe('doc-123');

        const js = { ...review, attestation: { ...review.attestation, artifact_ref: 'javascript:alert(1)' } };
        el = dom(renderTicketGatePanel({ pending_rituals: [js], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-artifact').getAttribute('href')).toBe('/document/javascript%3Aalert(1)');
    });

    it('escapes ritual names and attester names', () => {
        const evil = { ...review, name: '<img src=x onerror=alert(1)>', attestation: { ...review.attestation, attested_by_name: '<b>x</b>' } };
        const el = dom(renderTicketGatePanel({ pending_rituals: [evil], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('img')).toBeNull();
        expect(el.querySelector('.ticket-gate-by b')).toBeNull();
    });
});

describe('describeTicketGate', () => {
    it('says the next step in one sentence', () => {
        expect(describeTicketGate({ pending_rituals: [review, gate], completed_rituals: [] }, { canAct: true }))
            .toBe('Waiting on you: review tests-pass.');
        expect(describeTicketGate({ pending_rituals: [todo], completed_rituals: [] }, { assigneeName: 'builder-agent' }))
            .toBe('Waiting on builder-agent: attest changelog.');
        expect(describeTicketGate({ pending_rituals: [], completed_rituals: [done] })).toBe('All 1 ritual done.');
        expect(describeTicketGate(null)).toBe('');
    });
});

describe('renderTicketGateStickyBar', () => {
    it('is empty unless something waits on the viewer', () => {
        expect(renderTicketGateStickyBar({ pending_rituals: [todo], completed_rituals: [] }, { canAct: true })).toBe('');
        expect(renderTicketGateStickyBar({ pending_rituals: [review], completed_rituals: [] }, { canAct: false })).toBe('');
    });

    it('names the step and links back up, with no second Approve', () => {
        const el = dom(renderTicketGateStickyBar({ pending_rituals: [review, gate], completed_rituals: [] }, { canAct: true }));
        expect(el.textContent).toContain('Waiting on you: review tests-pass and 1 more');
        expect(el.querySelector('[data-action="scroll-to-ticket-gate"]')).not.toBeNull();
        expect(el.querySelector('[data-action="approve-ticket-ritual"]')).toBeNull();
    });
});
