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
        expect(el.querySelector('.ticket-gate-kicker').textContent).toBe('Waiting on you');
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

    it('offers Sign off for an open gate, and drops Send back once it was sent back', () => {
        let el = dom(renderTicketGatePanel({ pending_rituals: [gate], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('.ticket-gate-step').textContent).toBe('Sign off on human-qa');
        expect(el.querySelector('[data-action="complete-ticket-ritual"]').textContent).toBe('Sign off');
        expect(el.querySelector('[data-action="reject-ticket-ritual"]')).not.toBeNull();

        const rejected = { ...gate, last_rejection: { rejected_by_name: 'Sam', note: 'Not yet', superseded_at: null } };
        el = dom(renderTicketGatePanel({ pending_rituals: [rejected], completed_rituals: [] }, 'i1', { canAct: true }));
        expect(el.querySelector('[data-action="reject-ticket-ritual"]')).toBeNull();
        expect(el.textContent).toContain('Sam sent it back');
    });

    it('shows waiting on the assignee, muted, with only a quiet attest link', () => {
        const el = dom(renderTicketGatePanel({ pending_rituals: [todo], completed_rituals: [done] }, 'i1', { canAct: true, assigneeName: 'builder-agent' }));
        expect(el.querySelector('.ticket-gate.waiting')).not.toBeNull();
        expect(el.querySelector('.ticket-gate-kicker').textContent).toBe('Waiting on builder-agent');
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
            .toBe('Waiting on an admin');
        expect(dom(renderTicketGatePanel({ pending_rituals: [gate], completed_rituals: [] }, 'i1')).querySelector('.ticket-gate-kicker').textContent)
            .toBe('Waiting on a person');
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
