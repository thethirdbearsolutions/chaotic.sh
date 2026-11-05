/**
 * Tests for ticket-body.js (CHT-2021): related work, one timeline, meta line.
 */
import { describe, it, expect, vi } from 'vitest';

vi.mock('./rich-text.js', () => ({
    renderCommentContent: vi.fn((s) => `<p>${String(s).replace(/</g, '&lt;')}</p>`),
}));
vi.mock('./issue-list.js', () => ({
    getStatusIcon: vi.fn(() => '<i class="status-icon"></i>'),
}));

import { renderRelatedWork, renderTimeline, renderMetaLine } from './ticket-body.js';

const issue = { id: 'i1', project_id: 'p1', status: 'in_progress', priority: 'high', issue_type: 'bug', estimate: 3 };
const dom = (html) => {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el;
};
const fmt = {
    formatText: (a) => `did ${a.activity_type}`,
    formatActor: (a) => a.user_name || 'Unknown',
    getAssigneeById: () => null,
};

describe('renderRelatedWork', () => {
    it('lists sub-issues and relations together, blockers first, kind on the right', () => {
        const el = dom(renderRelatedWork(issue,
            [{ id: 's1', identifier: 'CHT-2', title: 'Child', status: 'todo', estimate: 2 }],
            [
                { id: 'r1', relation_type: 'relates_to', related_issue_id: 'x1', related_issue_identifier: 'CHT-3', related_issue_title: 'Kin' },
                { id: 'r2', relation_type: 'blocks', direction: 'incoming', related_issue_id: 'x2', related_issue_identifier: 'CHT-4', related_issue_title: 'Blocker' },
                { id: 'r3', relation_type: 'blocks', direction: 'outgoing', related_issue_id: 'x3', related_issue_identifier: 'CHT-5', related_issue_title: 'Waiter' },
            ]));
        const kinds = [...el.querySelectorAll('.related-kind')].map(k => k.textContent);
        expect(kinds).toEqual(['Blocked by', 'Sub-issue · 2 pts', 'Blocks', 'Related']);
        expect(el.querySelectorAll('.related-link')[0].dataset.issueId).toBe('x2');
        // Identifier and title are one link.
        expect(el.querySelector('.related-link .related-title').textContent).toBe('Blocker');
        // Only relations can be removed here; a sub-issue is re-parented from itself.
        expect(el.querySelectorAll('[data-action="remove-relation"]').length).toBe(3);
        expect(el.querySelector('[data-action="remove-relation"]').dataset.relationId).toBe('r2');
        // One Add.
        expect(el.querySelectorAll('.related-add').length).toBe(1);
    });

    it('is a heading and an Add when there is nothing', () => {
        const el = dom(renderRelatedWork(issue, [], []));
        expect(el.querySelector('.related-list')).toBeNull();
        expect(el.querySelector('[data-action="show-create-sub-issue-modal"]').dataset.projectId).toBe('p1');
    });

    it('escapes titles and identifiers', () => {
        const el = dom(renderRelatedWork(issue, [{ id: 's', identifier: '<b>X</b>', title: '<img src=x onerror=alert(1)>', status: 'todo' }], []));
        expect(el.querySelector('img')).toBeNull();
        expect(el.querySelector('.related-id b')).toBeNull();
    });

    it('labels duplicates and uses the project\'s estimate labels', () => {
        const el = dom(renderRelatedWork(issue,
            [{ id: 's1', identifier: 'CHT-2', title: 'Child', status: 'todo', estimate: 3 }],
            [{ id: 'r1', relation_type: 'duplicates', direction: 'outgoing', related_issue_id: 'x', related_issue_identifier: 'CHT-9', related_issue_title: 'Same' }],
            { formatEstimate: (v) => (v === 3 ? 'M' : String(v)) }));
        const kinds = [...el.querySelectorAll('.related-kind')].map(k => k.textContent);
        expect(kinds).toEqual(['Sub-issue · M', 'Duplicates']);
    });
});

describe('renderTimeline', () => {
    const comment = { id: 'c1', author_name: 'Sam', content: 'Looks right', created_at: '2026-11-04T10:00:00Z' };
    const created = { activity_type: 'created', user_name: 'Sam', created_at: '2026-11-04T09:00:00Z' };
    const commented = { activity_type: 'commented', user_name: 'Sam', new_value: 'Looks right', created_at: '2026-11-04T10:00:00Z' };
    const attestedOld = { activity_type: 'ritual_attested', field_name: 'tests-pass', new_value: 'first try', user_name: 'agent', created_at: '2026-11-04T08:00:00Z' };
    const rejected = { activity_type: 'ritual_rejected', field_name: 'tests-pass', new_value: 'Paste the log', user_name: 'Sam', created_at: '2026-11-04T08:30:00Z' };
    const attestedNew = { activity_type: 'ritual_attested', field_name: 'tests-pass', new_value: 'All green', user_name: 'agent', created_at: '2026-11-04T11:00:00Z' };
    const attestedDone = { activity_type: 'ritual_attested', field_name: 'changelog', new_value: 'Added a line', user_name: 'agent', created_at: '2026-11-04T07:00:00Z' };
    const ritualStatus = {
        pending_rituals: [{ name: 'tests-pass', attestation: { approved_at: null } }],
        completed_rituals: [{ name: 'changelog', attestation: { approved_at: '2026-11-04T07:00:00Z' } }],
    };

    it('merges comments and activity in time order, without repeating comments', () => {
        const el = dom(renderTimeline({ comments: [comment], activities: [created, commented], ritualStatus: null, issueId: 'i1' }, fmt));
        const items = el.querySelectorAll('.timeline > li');
        expect(items.length).toBe(2);
        expect(items[0].classList.contains('timeline-event')).toBe(true);
        expect(items[1].classList.contains('timeline-comment')).toBe(true);
        expect(el.querySelector('h3').textContent).toBe('Activity · 1 comment');
    });

    it('links the attestation still waiting for review up to the gate instead of repeating its note', () => {
        const el = dom(renderTimeline({ comments: [], activities: [attestedNew, attestedOld, rejected, attestedDone], ritualStatus, gateRitualName: 'tests-pass', issueId: 'i1' }, fmt));
        const events = [...el.querySelectorAll('.timeline-event')];
        expect(events.map(e => e.querySelector('.timeline-text').textContent)).toEqual([
            'Attested changelog', 'Attested tests-pass', 'Sent back tests-pass', 'Attested tests-pass',
        ]);
        const [done, old, back, current] = events;
        expect(current.querySelector('[data-action="scroll-to-ticket-gate"]')).not.toBeNull();
        expect(current.textContent).not.toContain('All green');
        // Earlier and finished attestations keep their note, folded.
        expect(old.querySelector('.timeline-note summary').textContent).toBe('Note');
        expect(old.querySelector('.timeline-note').textContent).toContain('first try');
        expect(done.querySelector('.timeline-note').textContent).toContain('Added a line');
        expect(back.classList.contains('sent-back')).toBe(true);
        expect(back.querySelector('.timeline-note[open]').textContent).toContain('Paste the log');
    });

    it('keeps the note of a second ritual waiting for review that the gate does not show (review I2)', () => {
        const other = { activity_type: 'ritual_attested', field_name: 'docs-review', new_value: 'Docs updated', user_name: 'agent', created_at: '2026-11-04T11:30:00Z' };
        const status = { pending_rituals: [
            { name: 'tests-pass', attestation: { approved_at: null } },
            { name: 'docs-review', attestation: { approved_at: null } },
        ], completed_rituals: [] };
        const el = dom(renderTimeline({ activities: [other, attestedNew], ritualStatus: status, gateRitualName: 'tests-pass', issueId: 'i1' }, fmt));
        const [first, second] = el.querySelectorAll('.timeline-event');
        expect(first.querySelector('[data-action="scroll-to-ticket-gate"]')).not.toBeNull();
        expect(second.querySelector('[data-action="scroll-to-ticket-gate"]')).toBeNull();
        expect(second.textContent).toContain('waiting for review');
        expect(second.querySelector('.timeline-note').textContent).toContain('Docs updated');
    });

    it('rebuilds an attestation the activity page left out, so its note is not lost (review I1)', () => {
        const status = { pending_rituals: [], completed_rituals: [
            { name: 'changelog', attestation: { attested_by_name: 'agent', attested_at: '2026-11-01T00:00:00Z', approved_at: '2026-11-01T00:00:00Z', note: 'Old note' } },
        ] };
        const el = dom(renderTimeline({ activities: [created], ritualStatus: status, activitiesTruncated: true, issueId: 'i1' }, fmt));
        const events = el.querySelectorAll('.timeline-event');
        expect(events.length).toBe(2);
        expect(events[0].textContent).toContain('Attested changelog');
        expect(events[0].querySelector('.timeline-note').textContent).toContain('Old note');
        expect(el.querySelector('.timeline-truncated').textContent).toBe('Older activity is not shown.');
    });

    it('shows no agent chip on comments or event lines (CHT-2026)', () => {
        const el = dom(renderTimeline({
            comments: [{ ...comment, author: { is_agent: true } }],
            activities: [{ ...created, user: { is_agent: true } }],
            issueId: 'i1',
        }, fmt));
        expect(el.querySelector('.badge')).toBeNull();
        expect(el.textContent).not.toContain('agent');
    });

    it('says when comments failed to load, and when there is nothing yet', () => {
        let el = dom(renderTimeline({ comments: [], activities: [], commentsLoadFailed: true, issueId: 'i1' }, fmt));
        expect(el.querySelector('[data-action="retry-issue-comments"]').dataset.issueId).toBe('i1');
        expect(el.querySelector('.comments-empty')).toBeNull();
        el = dom(renderTimeline({ comments: [], activities: [], issueId: 'i1' }, fmt));
        expect(el.querySelector('.comments-empty').textContent).toBe('No comments yet');
    });

    it('escapes names, ritual names and send-back reasons', () => {
        const evil = '<img src=x onerror=alert(1)>';
        const el = dom(renderTimeline({
            comments: [{ ...comment, author_name: evil }],
            activities: [{ ...rejected, field_name: evil, new_value: evil, user_name: evil }],
            issueId: 'i1',
        }, fmt));
        expect(el.querySelector('img')).toBeNull();
    });
});

describe('renderMetaLine', () => {
    it('is one line of status, assignee, priority, type and points', () => {
        const el = dom(renderMetaLine(issue, 'builder-agent'));
        expect(el.querySelectorAll('.issue-meta-part').length).toBe(5);
        expect(el.textContent).toContain('builder-agent');
        expect(el.textContent).toContain('3 pts');
        expect(dom(renderMetaLine({ ...issue, estimate: null }, null)).textContent).toContain('Unassigned');
        expect(dom(renderMetaLine(issue, null, { formatEstimate: () => 'M' })).textContent).toContain('M');
    });
});
