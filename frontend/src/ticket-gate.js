/**
 * Ticket gate (CHT-2020): what a ticket's rituals are waiting on, on the
 * ticket detail screen.
 *
 * One next step at a time, with one primary action: the block under the
 * title names the first ritual waiting on the viewer ("Review tests-pass"),
 * shows what it asks and what was attested, and offers Approve (or Sign
 * off) and a plain "Send back…". Whatever comes after is one muted line;
 * the full list sits behind "N of M rituals done". Waiting on someone else
 * is the same block, muted. All done is one line.
 *
 * Pure render functions over the `GET /rituals/issue/{id}/pending` payload
 * ({ pending_rituals, completed_rituals }); issue-detail-view.js owns the
 * DOM, the data and the event wiring.
 */

import { escapeHtml, escapeAttr, formatTimeAgo } from './utils.js';
import { renderMarkdown } from './gate-approvals.js';

const ICON = {
    check: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
    ring: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="8"/></svg>',
    link: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
};

/** An attested REVIEW ritual nobody has approved yet. */
export function isAwaitingApproval(r) {
    return !!(r && r.attestation && !r.attestation.approved_at);
}

/** A GATE ritual nobody has completed: only a person can pass it. */
function isOpenGate(r) {
    return !!(r && r.approval_mode === 'gate' && !r.attestation);
}

/** A rejection nobody has answered yet (CHT-1606). */
function outstandingRejection(r) {
    const rej = r && r.last_rejection;
    return rej && !rej.superseded_at ? rej : null;
}

/** An open gate that was sent back and not asked for again: it waits on
 * whoever asked for it, not on the person who sent it back. */
function isSentBackGate(r) {
    return isOpenGate(r) && !!outstandingRejection(r);
}

/**
 * Sort a ticket's rituals by who has to act.
 *
 * - `needsYou`: an attestation awaiting approval, or an open gate, when the
 *   viewer may pass it (`canAct`: a human team admin; the server refuses
 *   everyone else).
 * - `waiting`: everything else still pending: unattested rituals (the
 *   assignee's to attest), sent-back ones (gates included: they wait on a
 *   new request, CHT-1606), and approvals or gates that need
 *   someone other than the viewer.
 * - `done`: completed rituals.
 *
 * @param {{pending_rituals?: Array, completed_rituals?: Array}|null} status
 * @param {{canAct?: boolean}} opts
 */
export function classifyTicketRituals(status, { canAct = false } = {}) {
    const pending = (status && status.pending_rituals) || [];
    const done = (status && status.completed_rituals) || [];
    const needsYou = [];
    const waiting = [];
    for (const r of pending) {
        const humanStep = isAwaitingApproval(r) || (isOpenGate(r) && !isSentBackGate(r));
        (humanStep && canAct ? needsYou : waiting).push(r);
    }
    return { needsYou, waiting, done, total: pending.length + done.length };
}

function plural(n, one, many) {
    return n === 1 ? one : many;
}

/** The step a ritual is waiting for, as a verb phrase. */
function stepVerb(r) {
    if (isAwaitingApproval(r)) return 'Review';
    if (isSentBackGate(r)) return 'Ask again for';
    if (isOpenGate(r)) return 'Sign off on';
    if (outstandingRejection(r)) return 'Re-attest';
    return 'Attest';
}

/** Who a ritual nobody here can pass is waiting on. */
function waitingOn(r, assigneeName) {
    if (isAwaitingApproval(r)) return 'an admin';
    if (isOpenGate(r) && !isSentBackGate(r)) return 'a person';
    return assigneeName || 'the assignee';
}

/** Which move a ritual holds the ticket back from. */
function whenNeeded(r) {
    return r && r.trigger === 'ticket_claim' ? 'needed to start' : 'needed to close';
}

function kicker(who, r) {
    return `<div class="ticket-gate-kicker">Waiting on ${escapeHtml(who)}<span class="ticket-gate-when"> · ${whenNeeded(r)}</span></div>`;
}

export function renderArtifact(att) {
    const ref = att && att.artifact_ref;
    if (!ref || typeof ref !== 'string') return '';
    if (/^https?:\/\//i.test(ref)) {
        return `<a class="ticket-gate-artifact" href="${escapeAttr(ref)}" target="_blank" rel="noopener noreferrer">${ICON.link}${escapeHtml(ref.replace(/^https?:\/\//i, ''))}</a>`;
    }
    const url = `/document/${encodeURIComponent(ref)}`;
    return `<a class="ticket-gate-artifact" href="${escapeAttr(url)}" data-action="open-gate-document" data-document-id="${escapeAttr(ref)}">${ICON.link}Linked document</a>`;
}

export function renderAttestation(r) {
    const att = r.attestation;
    if (!att) return '';
    return `
        <div class="ticket-gate-attestation">
            <div class="ticket-gate-by">${escapeHtml(att.attested_by_name || 'Someone')} attested ${escapeHtml(formatTimeAgo(att.attested_at))}</div>
            ${att.note ? `<div class="ticket-gate-note markdown-body">${renderMarkdown(att.note)}</div>` : ''}
            ${renderArtifact(att)}
        </div>`;
}

function rejectionLine(rej) {
    const who = escapeHtml(rej.rejected_by_name || 'Someone');
    const when = rej.rejected_at ? ` ${escapeHtml(formatTimeAgo(rej.rejected_at))}` : '';
    return `${who} sent it back${when}: “${escapeHtml(rej.note || '')}”`;
}

/** A re-attested review keeps the send-back it answers, as context (CHT-1606). */
export function earlierRejection(r) {
    const rej = r && r.last_rejection;
    if (!rej || !rej.superseded_at || !isAwaitingApproval(r)) return '';
    return `<div class="ticket-gate-earlier">Sent back before: ${rejectionLine(rej)}</div>`;
}

const ritualData = (r, issueId) =>
    `data-ritual-id="${escapeAttr(r.id)}" data-issue-id="${escapeAttr(issueId)}" data-ritual-name="${escapeAttr(r.name)}"`;

/** Approve (or Sign off) and a plain "Send back…" for the step that needs you. */
function renderYourActions(r, issueId) {
    const sendBack = `<button type="button" class="ticket-gate-text-btn" data-action="reject-ticket-ritual" ${ritualData(r, issueId)}>Send back…</button>`;
    if (isAwaitingApproval(r)) {
        return `
            <button type="button" class="btn btn-primary" data-action="approve-ticket-ritual" ${ritualData(r, issueId)}>Approve</button>
            ${sendBack}`;
    }
    // An open gate that has not been sent back (a sent-back one waits on a
    // new request, so it is never the viewer's step).
    return `
        <button type="button" class="btn btn-primary" data-action="complete-ticket-ritual" ${ritualData(r, issueId)} data-ritual-artifact="${escapeAttr(r.artifact || '')}">Sign off</button>
        ${sendBack}`;
}

/** A ritual the viewer can still attest by hand from the web, quietly. */
function renderAttestLink(r, issueId, canAct) {
    if (isSentBackGate(r)) {
        // An admin may still pass a sent-back gate, but it is not their turn.
        return canAct
            ? `<button type="button" class="ticket-gate-text-btn" data-action="complete-ticket-ritual" ${ritualData(r, issueId)} data-ritual-artifact="${escapeAttr(r.artifact || '')}">Sign off anyway</button>`
            : '';
    }
    if (isAwaitingApproval(r) || isOpenGate(r)) return '';
    const modal = r.note_required || r.artifact;
    return modal
        ? `<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual-modal" ${ritualData(r, issueId)} data-ritual-prompt="${escapeAttr(r.prompt || '')}" data-ritual-artifact="${escapeAttr(r.artifact || '')}" data-ritual-note-required="${r.note_required ? '1' : ''}">Attest it yourself…</button>`
        : `<button type="button" class="ticket-gate-text-btn" data-action="attest-ticket-ritual" ${ritualData(r, issueId)}>Attest it yourself</button>`;
}

function renderThen(rest, lead) {
    if (rest.length === 0) return '';
    const [next, ...more] = rest;
    const tail = more.length ? `, and ${more.length} more` : '';
    return `<div class="ticket-gate-then">${lead}: ${escapeHtml(stepVerb(next).toLowerCase())} <b>${escapeHtml(next.name)}</b>${tail}.</div>`;
}

/** The full list, behind "N of M rituals done". */
function renderList(groups, assigneeName) {
    const { needsYou, waiting, done, total } = groups;
    const row = (icon, cls, name, who) =>
        `<li class="${cls}"><span class="ticket-gate-li-ic">${icon}</span><span class="ticket-gate-li-name">${escapeHtml(name)}</span><span class="ticket-gate-li-who">${escapeHtml(who)}</span></li>`;
    const rows = [
        ...done.map(r => row(ICON.check, 'done', r.name, r.attestation?.attested_by_name ? `by ${r.attestation.attested_by_name}` : 'done')),
        ...needsYou.map(r => row(ICON.ring, 'you', r.name, 'waiting on you')),
        ...waiting.map(r => row(ICON.ring, '', r.name, `waiting on ${waitingOn(r, assigneeName)}`)),
    ];
    return `
        <details class="ticket-gate-list">
            <summary>${done.length} of ${total} ${plural(total, 'ritual', 'rituals')} done</summary>
            <ul>${rows.join('')}</ul>
        </details>`;
}

/** The ritual the block shows in full (its prompt and attestation), if any. */
export function gateFocusRitual(status, { canAct = false } = {}) {
    const { needsYou, waiting } = classifyTicketRituals(status, { canAct });
    return needsYou[0] || waiting[0] || null;
}

/**
 * One sentence saying what the block now shows, for a screen reader's live
 * region after the viewer acts on it.
 */
export function describeTicketGate(status, { canAct = false, assigneeName = null } = {}) {
    const { needsYou, waiting, total } = classifyTicketRituals(status, { canAct });
    if (total === 0) return '';
    const r = needsYou[0] || waiting[0];
    if (!r) return `All ${total} ${plural(total, 'ritual', 'rituals')} done.`;
    const who = needsYou.length ? 'you' : waitingOn(r, assigneeName);
    return `Waiting on ${who}: ${stepVerb(r).toLowerCase()} ${r.name}.`;
}

/**
 * The block under the ticket title. Empty string when the ticket has no
 * ticket rituals at all.
 */
export function renderTicketGatePanel(status, issueId, { canAct = false, assigneeName = null } = {}) {
    const groups = classifyTicketRituals(status, { canAct });
    const { needsYou, waiting, total } = groups;
    if (total === 0) return '';

    if (needsYou.length === 0 && waiting.length === 0) {
        return `
            <section class="ticket-gate clear" aria-label="Rituals" tabindex="-1">
                <span class="ticket-gate-clear-ic">${ICON.check}</span>
                ${renderList(groups, assigneeName).replace(
                    /<summary>[^<]*<\/summary>/,
                    `<summary>All ${total} ${plural(total, 'ritual', 'rituals')} done</summary>`,
                )}
            </section>`;
    }

    if (needsYou.length > 0) {
        const r = needsYou[0];
        return `
            <section class="ticket-gate you" aria-label="Rituals" tabindex="-1" data-ritual-id="${escapeAttr(r.id)}">
                ${kicker('you', r)}
                <h2 class="ticket-gate-step">${escapeHtml(stepVerb(r))} <b>${escapeHtml(r.name)}</b></h2>
                ${r.prompt ? `<div class="ticket-gate-asks markdown-body">${renderMarkdown(r.prompt)}</div>` : ''}
                ${renderAttestation(r)}
                ${earlierRejection(r)}
                <div class="ticket-gate-actions">${renderYourActions(r, issueId)}</div>
                ${renderThen([...needsYou.slice(1), ...waiting], 'Then')}
                ${renderList(groups, assigneeName)}
            </section>`;
    }

    const r = waiting[0];
    const rej = !r.attestation ? outstandingRejection(r) : null;
    const attest = renderAttestLink(r, issueId, canAct);
    return `
        <section class="ticket-gate waiting" aria-label="Rituals" tabindex="-1" data-ritual-id="${escapeAttr(r.id)}">
            ${kicker(waitingOn(r, assigneeName), r)}
            <h2 class="ticket-gate-step">${escapeHtml(stepVerb(r))} <b>${escapeHtml(r.name)}</b></h2>
            ${rej
                ? `<div class="ticket-gate-asks">${rejectionLine(rej)}</div>`
                : (r.prompt ? `<div class="ticket-gate-asks markdown-body">${renderMarkdown(r.prompt)}</div>` : '')}
            ${renderAttestation(r)}
            ${earlierRejection(r)}
            ${attest ? `<div class="ticket-gate-actions">${attest}</div>` : ''}
            ${renderThen(waiting.slice(1), 'After that')}
            ${renderList(groups, assigneeName)}
        </section>`;
}

/**
 * The slim bar that stays at the top of the ticket while the gate block is
 * scrolled away. Empty string unless something waits on the viewer. It
 * links back up rather than offering a second Approve: approving is done
 * with the attestation in view.
 */
export function renderTicketGateStickyBar(status, { canAct = false } = {}) {
    const { needsYou } = classifyTicketRituals(status, { canAct });
    if (needsYou.length === 0) return '';
    const r = needsYou[0];
    const more = needsYou.length > 1 ? `<span class="ticket-gate-sticky-more"> and ${needsYou.length - 1} more</span>` : '';
    return `
        <span class="ticket-gate-sticky-text">Waiting on you: ${escapeHtml(stepVerb(r).toLowerCase())} <b>${escapeHtml(r.name)}</b>${more}</span>
        <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">Go to it ↑</button>`;
}
