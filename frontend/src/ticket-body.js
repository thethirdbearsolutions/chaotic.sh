/**
 * Ticket body (CHT-2021): the parts of the ticket detail screen below the
 * ritual gate, rendered as one quiet page rather than a stack of boxed
 * sections.
 *
 * - Related work: sub-issues and relations in one list, with each row's
 *   kind on the right and a single "+ Add". When there is none it is a
 *   heading and that button, not an empty state.
 * - Timeline: comments and activity in one stream, oldest first. Comments
 *   keep their full body; everything else is one line. An attestation is
 *   an event, not a second copy of its note: the one still waiting for
 *   review links up to the gate, which already shows it, and a finished
 *   one keeps its note behind "Note".
 * - Meta line: status, assignee, priority, type and points as one line
 *   under the title, for narrow screens where the sidebar sits at the
 *   bottom of the page.
 *
 * Pure render functions; issue-detail-view.js owns the data and wiring.
 */

import { escapeHtml, escapeAttr, formatTimeAgo, formatStatus, formatPriority, formatIssueType } from './utils.js';
import { getStatusIcon } from './issue-list.js';
import { renderCommentContent } from './rich-text.js';

const ICON = {
    remove: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
};

// The identifier and title are one link, so either opens the issue.
const issueLink = (id, identifier, title) =>
    `<a href="/issue/${encodeURIComponent(identifier)}" class="related-link" data-action="navigate-issue" data-issue-id="${escapeAttr(id)}" data-identifier="${escapeAttr(identifier)}"><span class="related-id">${escapeHtml(identifier)}</span><span class="related-title">${escapeHtml(title)}</span></a>`;

/** How a relation reads from this ticket's side. */
function relationKind(rel) {
    if (rel.relation_type === 'blocked_by' || (rel.relation_type === 'blocks' && rel.direction === 'incoming')) return 'Blocked by';
    if (rel.relation_type === 'blocks') return 'Blocks';
    if (rel.relation_type === 'duplicates') return rel.direction === 'incoming' ? 'Duplicated by' : 'Duplicates';
    return 'Related';
}

const KIND_ORDER = { 'Blocked by': 0, 'Sub-issue': 1, 'Blocks': 2, 'Duplicates': 3, 'Duplicated by': 3, 'Related': 4 };

/**
 * Sub-issues and relations as one list.
 * @param {Object} issue
 * @param {Array} subIssues
 * @param {Array} relations
 */
export function renderRelatedWork(issue, subIssues = [], relations = [], { formatEstimate = null } = {}) {
    const estimate = (s) => (s.estimate == null ? ''
        : ` · ${escapeHtml(formatEstimate ? formatEstimate(s.estimate, s.project_id || issue.project_id) : `${s.estimate} pts`)}`);
    const rows = [
        ...(subIssues || []).map(s => ({
            kind: 'Sub-issue',
            html: `
                <li class="related-row">
                    <span class="related-status">${getStatusIcon(s.status)}</span>
                    ${issueLink(s.id, s.identifier, s.title)}
                    <span class="related-kind">Sub-issue${estimate(s)}</span>
                </li>`,
        })),
        ...(relations || []).map(rel => {
            const kind = relationKind(rel);
            return {
                kind,
                html: `
                <li class="related-row">
                    <span class="related-status">${getStatusIcon(rel.related_issue_status)}</span>
                    ${issueLink(rel.related_issue_id, rel.related_issue_identifier, rel.related_issue_title)}
                    <span class="related-kind${kind === 'Blocked by' ? ' blocked' : ''}">${kind}</span>
                    <button type="button" class="related-remove" data-action="remove-relation" data-issue-id="${escapeAttr(issue.id)}" data-relation-id="${escapeAttr(rel.id)}" title="Remove link" aria-label="Remove link to ${escapeAttr(rel.related_issue_identifier)}">${ICON.remove}</button>
                </li>`,
            };
        }),
    ].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);

    return `
        <section class="related-work" aria-label="Related work">
            <div class="related-head">
                <h3>Related work</h3>
                <details class="related-add">
                    <summary class="ticket-gate-text-btn">+ Add</summary>
                    <div class="related-add-menu">
                        <button type="button" data-action="show-create-sub-issue-modal" data-issue-id="${escapeAttr(issue.id)}" data-project-id="${escapeAttr(issue.project_id)}">Sub-issue</button>
                        <button type="button" data-action="show-add-relation-modal" data-issue-id="${escapeAttr(issue.id)}">Link an issue</button>
                    </div>
                </details>
            </div>
            ${rows.length ? `<ul class="related-list">${rows.map(r => r.html).join('')}</ul>` : ''}
        </section>`;
}

// No agent/session chip on the timeline: the name is enough here (CHT-2026).
function renderComment(comment) {
    const initial = escapeHtml((comment.author_name || 'U').charAt(0).toUpperCase());
    return `
        <li class="comment timeline-comment">
            <div class="comment-avatar">${initial}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author_name || 'User')}</span>
                    <span class="comment-date">${escapeHtml(formatTimeAgo(comment.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${renderCommentContent(comment.content).trim()}</div>
            </div>
        </li>`;
}

// A note or reason, folded; `comment-content` so it can be quoted like a comment.
const folded = (label, text, open = false) =>
    `<details class="timeline-note"${open ? ' open' : ''}><summary>${label}</summary><div class="markdown-body comment-content">${renderCommentContent(text).trim()}</div></details>`;

function renderEvent(activity, { formatText, formatActor, gateShowsIt, awaitingReview }) {
    let text;
    let inline = '';
    let below = '';
    if (activity.activity_type === 'ritual_attested') {
        text = `Attested <b>${escapeHtml(activity.field_name || 'a ritual')}</b>`;
        if (gateShowsIt) {
            // The gate above shows this note; link to it rather than repeat it.
            inline = ' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>';
        } else {
            if (awaitingReview) inline = ' · waiting for review';
            if (activity.new_value) below = folded('Note', activity.new_value);
        }
    } else if (activity.activity_type === 'ritual_rejected') {
        text = `Sent back <b>${escapeHtml(activity.field_name || 'a ritual')}</b>`;
        if (activity.new_value) below = folded('Reason', activity.new_value, true);
    } else {
        text = formatText(activity);
    }
    return `
        <li class="timeline-event${activity.activity_type === 'ritual_rejected' ? ' sent-back' : ''}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="timeline-text">${text}</span>${inline}
                <span class="timeline-meta">· ${escapeHtml(formatActor(activity))} · ${escapeHtml(formatTimeAgo(activity.created_at))}</span>
                ${below}
            </div>
        </li>`;
}

/**
 * An attestation the activity list does not carry (it is the newest page
 * only), rebuilt from the ritual itself so its note is never lost.
 */
function attestationsMissingFrom(activities, ritualStatus) {
    const logged = new Set((activities || [])
        .filter(a => a.activity_type === 'ritual_attested')
        .map(a => a.field_name));
    const rituals = [
        ...((ritualStatus && ritualStatus.pending_rituals) || []),
        ...((ritualStatus && ritualStatus.completed_rituals) || []),
    ];
    return rituals
        .filter(r => r.attestation && !logged.has(r.name))
        .map(r => ({
            activity_type: 'ritual_attested',
            field_name: r.name,
            new_value: r.attestation.note || null,
            user_name: r.attestation.attested_by_name || null,
            user: r.attestation.attester || null,
            created_at: r.attestation.attested_at,
        }));
}

/**
 * Comments and activity as one stream, oldest first.
 * @param {Object} data
 * @param {Array} data.comments
 * @param {Array} data.activities - newest page of the issue's activity
 * @param {Object|null} data.ritualStatus - `GET /rituals/issue/{id}/pending`
 * @param {string|null} [data.gateRitualName] - the ritual whose attestation the gate shows
 * @param {boolean} [data.activitiesTruncated] - older activity was left out
 * @param {boolean} [data.commentsLoadFailed]
 * @param {string} data.issueId
 * @param {{formatText: Function, formatActor: Function}} fmt
 */
export function renderTimeline({ comments = [], activities = [], ritualStatus = null, gateRitualName = null, activitiesTruncated = false, commentsLoadFailed = false, issueId }, fmt) {
    const awaiting = new Set(((ritualStatus && ritualStatus.pending_rituals) || [])
        .filter(r => r.attestation && !r.attestation.approved_at)
        .map(r => r.name));
    const events = [...(activities || []), ...attestationsMissingFrom(activities, ritualStatus)];
    // The newest attestation of each ritual still waiting for review (the
    // list is newest first, so the first one seen wins a tie).
    const latest = new Map();
    for (const a of events) {
        if (a.activity_type !== 'ritual_attested' || !awaiting.has(a.field_name)) continue;
        const prev = latest.get(a.field_name);
        if (!prev || new Date(a.created_at) > new Date(prev.created_at)) latest.set(a.field_name, a);
    }

    const items = [
        ...(comments || []).map(c => ({ at: c.created_at, html: renderComment(c) })),
        // A comment is already in the stream; its "Added a comment" line would repeat it.
        ...events.filter(a => a.activity_type !== 'commented').map(a => {
            const current = latest.get(a.field_name) === a;
            return {
                at: a.created_at,
                html: renderEvent(a, { ...fmt, awaitingReview: current, gateShowsIt: current && a.field_name === gateRitualName }),
            };
        }),
    ].sort((a, b) => new Date(a.at) - new Date(b.at));

    const commentCount = (comments || []).length;
    return `
        <section class="issue-detail-section ticket-timeline" id="comments-section" aria-label="Comments and activity">
            <h3>Activity${commentCount ? ` <span class="section-count">· ${commentCount} ${commentCount === 1 ? 'comment' : 'comments'}</span>` : ''}</h3>
            ${commentsLoadFailed ? `
                <div class="comments-error">
                    Comments failed to load.
                    <button type="button" class="btn btn-secondary btn-sm" data-action="retry-issue-comments" data-issue-id="${escapeAttr(issueId)}">Retry</button>
                </div>` : ''}
            ${activitiesTruncated ? '<div class="timeline-truncated">Older activity is not shown.</div>' : ''}
            ${items.length
                ? `<ol class="timeline comments-list">${items.map(i => i.html).join('')}</ol>`
                : (commentsLoadFailed ? '' : '<div class="comments-empty">No comments yet</div>')}
        </section>`;
}

/**
 * Status, assignee, priority, type and points as one line of text.
 * @param {Object} issue
 * @param {string|null} assigneeName
 * @param {{formatEstimate?: Function}} [opts] - the project's estimate labels
 */
export function renderMetaLine(issue, assigneeName, { formatEstimate = null } = {}) {
    const parts = [
        `${getStatusIcon(issue.status)}<span>${escapeHtml(formatStatus(issue.status))}</span>`,
        escapeHtml(assigneeName || 'Unassigned'),
        escapeHtml(formatPriority(issue.priority)),
        escapeHtml(formatIssueType(issue.issue_type)),
    ];
    if (issue.estimate != null) {
        parts.push(escapeHtml(formatEstimate ? formatEstimate(issue.estimate, issue.project_id) : `${issue.estimate} pts`));
    }
    return `<div class="issue-meta-line">${parts.map(p => `<span class="issue-meta-part">${p}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`;
}
