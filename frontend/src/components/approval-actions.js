/**
 * Approval actions (CHT-2031): one vocabulary for deciding a ritual,
 * wherever it is decided.
 *
 * A REVIEW attestation is approved; a GATE is signed off. Either can be
 * sent back with a reason. The primary step is the one filled button
 * (`btn-primary`); "Send back…" is a plain text button beside it, or
 * takes the caller's button class where it sits in a row of them. Labels
 * match ticket-gate.js. Pure: it returns markup and wires nothing; the
 * caller names the delegated actions and the data each one carries.
 */
import { escapeAttr } from '../utils.js';

/** The primary step's label for a ritual's approval mode. */
export function approvalVerb(mode) {
    return mode === 'gate' ? 'Sign off' : 'Approve';
}

function dataAttrs(data) {
    return Object.entries(data || {})
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `data-${k.replace(/[A-Z]/g, c => `-${c.toLowerCase()}`)}="${escapeAttr(String(v))}"`)
        .join(' ');
}

/**
 * @param {'review'|'gate'} mode the ritual's approval mode
 * @param {object} ctx
 * @param {string} ctx.approveAction delegated action of the primary button
 * @param {string} [ctx.sendBackAction] delegated action of "Send back…"; omitted, no send-back
 * @param {object} [ctx.data] data-* attributes both buttons carry (camelCase keys)
 * @param {boolean} [ctx.busy] the primary step is in flight
 * @param {string} [ctx.size] 'sm' for a compact primary button
 * @param {string} [ctx.sendBackClass] the class of "Send back…": a plain text
 *     button by default; a row of outlined buttons (the Inbox) passes its own
 * @returns {string[]} the buttons, primary first
 */
export function renderApprovalActions(mode, {
    approveAction, sendBackAction = null, data = {}, busy = false, size = '',
    sendBackClass = 'ticket-gate-text-btn',
} = {}) {
    const attrs = dataAttrs(data);
    const state = busy ? ' aria-disabled="true" aria-busy="true"' : '';
    const cls = size === 'sm' ? 'btn btn-primary btn-sm' : 'btn btn-primary';
    const buttons = [
        `<button type="button" class="${cls}" data-action="${escapeAttr(approveAction)}" ${attrs}${state}>${approvalVerb(mode)}</button>`,
    ];
    if (sendBackAction) {
        buttons.push(`<button type="button" class="${escapeAttr(sendBackClass)}" data-action="${escapeAttr(sendBackAction)}" ${attrs}>Send back…</button>`);
    }
    return buttons;
}
