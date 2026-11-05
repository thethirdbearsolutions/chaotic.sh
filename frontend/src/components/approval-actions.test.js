import { describe, it, expect } from 'vitest';
import { renderApprovalActions, approvalVerb } from './approval-actions.js';

function buttons(html) {
    const div = document.createElement('div');
    div.innerHTML = html.join('');
    return [...div.querySelectorAll('button')];
}

describe('renderApprovalActions', () => {
    it('approves a review and signs off a gate', () => {
        expect(approvalVerb('review')).toBe('Approve');
        expect(approvalVerb('gate')).toBe('Sign off');
        const [primary] = buttons(renderApprovalActions('gate', { approveAction: 'go' }));
        expect(primary.textContent).toBe('Sign off');
        expect(primary.className).toBe('btn btn-primary');
    });

    it('puts Send back… as a text button after the primary one', () => {
        const [primary, back] = buttons(renderApprovalActions('review', {
            approveAction: 'approve-x', sendBackAction: 'back-x', size: 'sm',
            data: { entryId: 'e"1', ritualName: '<b>r</b>' },
        }));
        expect(primary.textContent).toBe('Approve');
        expect(primary.className).toBe('btn btn-primary btn-sm');
        expect(back.textContent).toBe('Send back…');
        expect(back.className).toBe('ticket-gate-text-btn');
        expect(back.dataset.action).toBe('back-x');
        expect(primary.dataset.entryId).toBe('e"1');
        expect(back.dataset.ritualName).toBe('<b>r</b>');
    });

    it('marks the primary step busy, and omits send-back when not asked', () => {
        const out = buttons(renderApprovalActions('review', { approveAction: 'a', busy: true }));
        expect(out).toHaveLength(1);
        expect(out[0].getAttribute('aria-busy')).toBe('true');
    });

    it('takes the caller class for Send back in a row of buttons', () => {
        const [, back] = buttons(renderApprovalActions('review', {
            approveAction: 'a', sendBackAction: 'b', sendBackClass: 'inbox-action-btn',
        }));
        expect(back.className).toBe('inbox-action-btn');
    });
});
