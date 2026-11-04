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

import { escapeHtml, escapeAttr, formatTimeAgo, formatStatus, formatPriority, formatIssueType, renderAgentBadge, renderPrincipalBadge } from './utils.js';
import { getStatusIcon } from './issue-list.js';
import { renderCommentContent } from './rich-text.js';

const ICON = {
    remove: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
};

const issueLink = (id, identifier) =>
    `<a href="/issue/${encodeURIComponent(identifier)}" class="related-id" data-action="navigate-issue" data-issue-id="${escapeAttr(id)}" data-identifier="${escapeAttr(identifier)}">${escapeHtml(identifier)}</a>`;

/** How a relation reads from this ticket's side. */
function relationKind(rel) {
    if (rel.relation_type === 'blocked_by' || (rel.relation_type === 'blocks' && rel.direction === 'incoming')) return 'Blocked by';
    if (rel.relation_type === 'blocks') return 'Blocks';
    return 'Related';
}

const KIND_ORDER = { 'Blocked by': 0, 'Sub-issue': 1, 'Blocks': 2, 'Related': 3 };

/**
 * Sub-issues and relations as one list.
 * @param {Object} issue
 * @param {Array} subIssues
 * @param {Array} relations
 */
export function renderRelatedWork(issue, subIssues = [], relations = []) {
    const rows = [
        ...(subIssues || []).map(s => ({
            kind: 'Sub-issue',
            html: `
                <li class="related-row sub-issue-item">
                    <span class="related-status">${getStatusIcon(s.status)}</span>
                    ${issueLink(s.id, s.identifier)}
                    <span class="related-title">${escapeHtml(s.title)}</span>
                    <span class="related-kind">Sub-issue${s.estimate != null ? ` · ${escapeHtml(String(s.estimate))} ${s.estimate === 1 ? 'pt' : 'pts'}` : ''}</span>
                </li>`,
        })),
        ...(relations || []).map(rel => {
            const kind = relationKind(rel);
            return {
                kind,
                html: `
                <li class="related-row relation-item">
                    <span class="related-status">${getStatusIcon(rel.related_issue_status)}</span>
                    ${issueLink(rel.related_issue_id, rel.related_issue_identifier)}
                    <span class="related-title">${escapeHtml(rel.related_issue_title)}</span>
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
                    <div class="related-add-menu" role="menu">
                        <button type="button" role="menuitem" data-action="show-create-sub-issue-modal" data-issue-id="${escapeAttr(issue.id)}" data-project-id="${escapeAttr(issue.project_id)}">Sub-issue</button>
                        <button type="button" role="menuitem" data-action="show-add-relation-modal" data-issue-id="${escapeAttr(issue.id)}">Link an issue</button>
                    </div>
                </details>
            </div>
            ${rows.length ? `<ul class="related-list">${rows.map(r => r.html).join('')}</ul>` : ''}
        </section>`;
}

/**
 * The ritual whose latest attestation still waits for review, by name: its
 * timeline line links up to the gate instead of repeating the note.
 */
function awaitingReviewNames(ritualStatus) {
    const names = new Set();
    for (const r of (ritualStatus && ritualStatus.pending_rituals) || []) {
        if (r.attestation && !r.attestation.approved_at) names.add(r.name);
    }
    return names;
}

function renderComment(comment, getAssigneeById) {
    const initial = escapeHtml((comment.author_name || 'U').charAt(0).toUpperCase());
    const badge = comment.author
        ? renderPrincipalBadge(comment.author)
        : renderAgentBadge(getAssigneeById ? getAssigneeById(comment.author_id)?.is_agent : false);
    return `
        <li class="comment timeline-comment">
            <div class="comment-avatar">${initial}</div>
            <div class="comment-body">
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.author_name || 'User')}</span>
                    ${badge}
                    <span class="comment-date">${escapeHtml(formatTimeAgo(comment.created_at))}</span>
                </div>
                <div class="comment-content markdown-body">${renderCommentContent(comment.content)}</div>
            </div>
        </li>`;
}

function renderEvent(activity, { formatText, formatActor, waitingLine }) {
    let text;
    let extra = '';
    if (activity.activity_type === 'ritual_attested') {
        text = `Attested <b>${escapeHtml(activity.field_name || 'a ritual')}</b>`;
        if (waitingLine) {
            extra = ' · <button type="button" class="ticket-gate-text-btn accent" data-action="scroll-to-ticket-gate">waiting for review ↑</button>';
        } else if (activity.new_value) {
            extra = `<details class="timeline-note"><summary>Note</summary><div class="markdown-body">${renderCommentContent(activity.new_value)}</div></details>`;
        }
    } else if (activity.activity_type === 'ritual_rejected') {
        text = `Sent back <b>${escapeHtml(activity.field_name || 'a ritual')}</b>`;
        if (activity.new_value) extra = `: “${escapeHtml(activity.new_value)}”`;
    } else {
        text = formatText(activity);
    }
    return `
        <li class="timeline-event activity-item${activity.activity_type === 'ritual_rejected' ? ' sent-back' : ''}">
            <span class="timeline-dot" aria-hidden="true"></span>
            <div class="timeline-event-body">
                <span class="activity-text">${text}</span>${activity.activity_type === 'ritual_attested' ? '' : extra}
                <span class="timeline-meta">· ${escapeHtml(formatActor(activity))} · ${escapeHtml(formatTimeAgo(activity.created_at))}</span>
                ${activity.activity_type === 'ritual_attested' ? extra : ''}
            </div>
        </li>`;
}

/**
 * Comments and activity as one stream, oldest first.
 * @param {{comments: Array, activities: Array, ritualStatus: Object, commentsLoadFailed?: boolean, issueId: string}} data
 * @param {{formatText: Function, formatActor: Function, getAssigneeById?: Function}} fmt
 */
export function renderTimeline({ comments = [], activities = [], ritualStatus = null, commentsLoadFailed = false, issueId }, fmt) {
    const waitingNames = awaitingReviewNames(ritualStatus);
    // The newest attestation of each ritual still waiting for review.
    const latestWaiting = new Map();
    for (const a of activities || []) {
        if (a.activity_type === 'ritual_attested' && waitingNames.has(a.field_name)) {
            const prev = latestWaiting.get(a.field_name);
            if (!prev || new Date(a.created_at) >= new Date(prev.created_at)) latestWaiting.set(a.field_name, a);
        }
    }

    const items = [
        ...(comments || []).map(c => ({ at: c.created_at, html: renderComment(c, fmt.getAssigneeById) })),
        // A comment is already in the stream; its "Added a comment" line would repeat it.
        ...(activities || []).filter(a => a.activity_type !== 'commented').map(a => ({
            at: a.created_at,
            html: renderEvent(a, { ...fmt, waitingLine: latestWaiting.get(a.field_name) === a }),
        })),
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
            ${items.length
                ? `<ol class="timeline comments-list">${items.map(i => i.html).join('')}</ol>`
                : (commentsLoadFailed ? '' : '<div class="comments-empty">No comments yet</div>')}
        </section>`;
}

/**
 * Status, assignee, priority, type and points as one line of text.
 * @param {Object} issue
 * @param {string|null} assigneeName
 */
export function renderMetaLine(issue, assigneeName) {
    const parts = [
        `${getStatusIcon(issue.status)}<span>${escapeHtml(formatStatus(issue.status))}</span>`,
        escapeHtml(assigneeName || 'Unassigned'),
        escapeHtml(formatPriority(issue.priority)),
        escapeHtml(formatIssueType(issue.issue_type)),
    ];
    if (issue.estimate != null) parts.push(`${escapeHtml(String(issue.estimate))} ${issue.estimate === 1 ? 'pt' : 'pts'}`);
    return `<div class="issue-meta-line">${parts.map(p => `<span class="issue-meta-part">${p}</span>`).join('<span class="issue-meta-sep" aria-hidden="true">·</span>')}</div>`;
}
