/**
 * Tests for epic-detail-view.js module (CHT-855)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock dependencies
vi.mock('./api.js', () => ({
    api: {
        getIssue: vi.fn(),
        getIssueByIdentifier: vi.fn(),
        getEpicOverview: vi.fn(),
        getProjectEpicProgress: vi.fn(),
        getInbox: vi.fn(),
        updateIssue: vi.fn(),
    },
}));

vi.mock('./state.js', () => ({
    getCurrentView: vi.fn(() => 'epics'),
    getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
}));

vi.mock('./inbox.js', () => ({
    mountInboxSurface: vi.fn((id, entries) => {
        document.getElementById(id).innerHTML = entries.map(e => `<div class="inbox-row" data-entry-id="${e.id}"></div>`).join('');
    }),
}));

vi.mock('./documents.js', () => ({
    viewDocument: vi.fn(),
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./router.js', () => ({
    navigateTo: vi.fn(),
    saveScrollPosition: vi.fn(),
}));

vi.mock('./epics.js', () => ({
    getCurrentEpics: vi.fn(() => []),
    renderSprintStrip: vi.fn(() => '<span class="epic-sprint-strip"></span>'),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
    formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
}));

vi.mock('./assignees.js', () => ({
    getAssigneeById: vi.fn(() => null),
    formatAssigneeName: vi.fn((a) => a?.name || ''),
}));

vi.mock('./utils.js', () => ({
    formatStatus: vi.fn((s) => s || 'backlog'),
    formatPriority: vi.fn((p) => p || 'no_priority'),
    formatTimeAgo: vi.fn(() => '1h ago'),
    escapeHtml: vi.fn((text) => text || ''),
    escapeAttr: vi.fn((text) => text || ''),
    escapeJsString: vi.fn((text) => text || ''),
    sanitizeColor: vi.fn((c) => c || '#888'),
}));

vi.mock('./issue-list.js', () => ({
    getStatusIcon: vi.fn(() => '<svg></svg>'),
    getPriorityIcon: vi.fn(() => '<svg></svg>'),
    renderIssueRow: vi.fn((i) => `<div class="issue-row" data-issue-id="${i.id}" data-identifier="${i.identifier}" data-issue-type="${i.issue_type}"><a class="issue-title" data-issue-id="${i.id}">${i.title}</a></div>`),
}));

vi.mock('./inline-dropdown.js', () => ({
    setInlineEditHolder: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

const mockViewIssue = vi.fn();
vi.mock('./issue-detail-view.js', () => ({
    getActivityIcon: vi.fn(() => '📝'),
    formatActivityActor: vi.fn((a) => a.user_name || 'Unknown'),
    formatActivityText: vi.fn((a) => a.activity_type),
    renderCommentContent: vi.fn((text) => text),
    renderDescriptionContent: vi.fn((text) => text),
    viewIssue: (...args) => mockViewIssue(...args),
}));

import { api } from './api.js';
import { getCurrentView } from './state.js';
import { showApiError, showToast } from './ui.js';
import { navigateTo, saveScrollPosition } from './router.js';
import { getProjects } from './projects.js';
import { getCurrentEpics } from './epics.js';
import { mountInboxSurface } from './inbox.js';
import { viewDocument } from './documents.js';
import { registerActions } from './event-delegation.js';
import { setInlineEditHolder } from './inline-dropdown.js';
import {
    viewEpic,
    viewEpicByPath,
} from './epic-detail-view.js';

// Actions registered at module import time — capture before vi.clearAllMocks wipes them
const epicDetailActions = Object.assign({}, ...registerActions.mock.calls.map(c => c[0]));

describe('epic-detail-view (CHT-2097)', () => {
    const makeEpic = (overrides = {}) => ({
        id: 'epic-1', identifier: 'CHT-100', title: 'Test Epic', description: 'Epic description',
        status: 'in_progress', priority: 'high', issue_type: 'epic', project_id: 'proj-1',
        assignee_id: null, estimate: 13, labels: [], created_at: '2025-01-01T00:00:00Z',
        updated_at: '2025-01-02T00:00:00Z', ...overrides,
    });
    const t = (id, status, extra = {}) => ({
        id, identifier: `CHT-${id}`, title: `Ticket ${id}`, status, issue_type: 'task', estimate: null,
        assignee: null, epic_id: 'epic-1', updated_at: '2025-01-03T00:00:00Z', completed_at: null, closed_in: null, ...extra,
    });
    const overview = (overrides = {}) => ({
        tickets: [], documents: [], activities: [], more_activity: false,
        ...overrides, issues: overrides.issues ?? (overrides.tickets || []),
    });
    const content = () => document.getElementById('epic-detail-content');
    const sectionIds = () => [...content().querySelectorAll('.epic-page-section')].map(s => s.id);
    const rowIds = () => [...content().querySelectorAll('#epic-subissues .issue-row')].map(r => r.dataset.identifier);
    const chip = (k) => content().querySelector(`[data-epic-sub-filter="${k}"]`);

    beforeEach(() => {
        vi.clearAllMocks();
        api.getIssue.mockResolvedValue(makeEpic());
        api.getIssueByIdentifier.mockResolvedValue(makeEpic());
        api.getEpicOverview.mockResolvedValue(overview());
        api.getProjectEpicProgress.mockResolvedValue({ epics: [], untracked: [] });
        api.getInbox.mockResolvedValue([]);
        getCurrentView.mockReturnValue('epics');
        getProjects.mockReturnValue([{ id: 'proj-1', name: 'Test Project' }]);
        getCurrentEpics.mockReturnValue([]);
        document.body.innerHTML = `
            <div class="view" id="epics-view"></div>
            <div class="view hidden" id="epic-detail-view">
                <div id="epic-detail-content"></div>
            </div>
        `;
    });

    it('shows the title, the goal and the facts, and swaps views', async () => {
        await viewEpic('epic-1');
        expect(content().querySelector('.issue-detail-title').textContent).toBe('Test Epic');
        expect(content().querySelector('.epic-page-goal').textContent).toContain('Epic description');
        expect(content().querySelector('.epic-page-facts').textContent).toContain('Unassigned');
        expect(document.getElementById('epics-view').classList.contains('hidden')).toBe(true);
        expect(document.getElementById('epic-detail-view').classList.contains('hidden')).toBe(false);
        expect(saveScrollPosition).toHaveBeenCalled();
    });

    it('lists every sub-issue at any depth as /issues rows, open first, newest first, with status chips', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [
            t('1', 'in_progress', { updated_at: '2025-01-01T00:00:00Z' }),
            t('2', 'in_review', { updated_at: '2025-01-04T00:00:00Z' }),
            t('3', 'in_progress', { updated_at: '2025-01-05T00:00:00Z', epic_id: 'sub-1' }),
            t('4', 'todo', { updated_at: '2025-01-02T00:00:00Z' }), t('5', 'backlog', { updated_at: '2025-01-01T12:00:00Z' }), t('6', 'canceled'),
            t('7', 'done', { completed_at: '2025-01-06T00:00:00Z' }),
            { ...t('200', 'in_progress', { updated_at: '2025-01-03T12:00:00Z' }), id: 'sub-1', issue_type: 'epic' },
        ] }));
        await viewEpic('epic-1');
        expect(rowIds()).toEqual(['CHT-3', 'CHT-2', 'CHT-200', 'CHT-4', 'CHT-5', 'CHT-1']);
        expect(chip('open').getAttribute('aria-pressed')).toBe('true');
        expect(chip('open').textContent).toContain('6');
        expect(chip('done').textContent).toContain('1');
        chip('in_progress').click();
        expect(rowIds()).toEqual(['CHT-3', 'CHT-200', 'CHT-1']);
        chip('done').click();
        expect(rowIds()).toEqual(['CHT-7']);
        chip('all').click();
        expect(rowIds()).toHaveLength(8);
        chip('backlog').click();
        expect(rowIds()).toEqual(['CHT-5']);
        chip('open').click();
        // Canceled sub-issues and sub-epics count toward nothing.
        expect(content().querySelector('.epic-detail-progress-label').textContent).toContain('1 of 6 sub-issues done');
    });

    it('lets /issues inline edits land in its rows, and draws again', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [t('1', 'todo'), t('2', 'todo')] }));
        await viewEpic('epic-1');
        const holder = setInlineEditHolder.mock.calls.at(-1)[0];
        expect(holder.get('1').identifier).toBe('CHT-1');
        expect(holder.get('nope')).toBeUndefined();
        holder.set({ ...holder.get('1'), status: 'done', completed_at: '2025-01-09T00:00:00Z' });
        expect(rowIds()).toEqual(['CHT-2']);
        expect(content().querySelector('.epic-detail-progress-label').textContent).toContain('1 of 2 sub-issues done');
        // Once the page is gone the holder holds nothing.
        document.getElementById('epic-detail-view').classList.add('hidden');
        expect(holder.get('2')).toBeUndefined();
    });

    it('shows what waits on you in this tree as Inbox rows, and nothing else', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [t('1', 'in_review')] }));
        api.getInbox.mockResolvedValue([
            { id: 'in-1', kind: 'review_requested', issue_id: '1' },
            { id: 'in-2', kind: 'gate_pending', issue_id: 'epic-1' },
            { id: 'in-3', kind: 'review_requested', issue_id: 'elsewhere' },
            { id: 'in-4', kind: 'review_requested', issue_id: '1', state: 'resolved' },
        ]);
        await viewEpic('epic-1');
        expect(api.getInbox).toHaveBeenCalledWith('team-1', expect.objectContaining({ kinds: ['review_requested', 'gate_pending'] }));
        expect(mountInboxSurface).toHaveBeenCalledWith('epic-needs-you-rows', [
            expect.objectContaining({ id: 'in-1' }), expect.objectContaining({ id: 'in-2' }),
        ], expect.any(Object));
        expect(sectionIds()[0]).toBe('epic-approvals');
        expect(content().querySelectorAll('#epic-approvals .inbox-row').length).toBe(2);
    });

    it('keeps its live refresh across refreshes', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [t('1', 'in_review')] }));
        api.getInbox.mockResolvedValue([{ id: 'in-1', kind: 'review_requested', issue_id: '1' }]);
        await viewEpic('epic-1');
        const first = mountInboxSurface.mock.calls[0][2];
        first.reload();
        await vi.waitFor(() => expect(mountInboxSurface).toHaveBeenCalledTimes(2));
        expect(typeof mountInboxSurface.mock.calls[1][2].reload).toBe('function');
    });

    it('leaves Needs you out when nothing waits, and scrolls to a section on request', async () => {
        Element.prototype.scrollIntoView = vi.fn();
        await viewEpic('epic-1', true, { focus: 'epic-activity' });
        expect(sectionIds()).not.toContain('epic-approvals');
        expect(mountInboxSurface).not.toHaveBeenCalled();
        expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('lists docs linked anywhere in the tree with what they are linked to, and opens them', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ documents: [
            { id: 'd1', title: 'Sequencing plan', icon: null, linked_to: ['CHT-100', 'CHT-7'], updated_at: '2025-01-01T00:00:00Z' },
        ] }));
        await viewEpic('epic-1');
        const doc = content().querySelector('.epic-page-doc');
        expect(doc.querySelector('.epic-page-doc-title').textContent).toBe('Sequencing plan');
        expect([...doc.querySelectorAll('.epic-page-tag')].map(x => x.textContent)).toEqual(['CHT-100', 'CHT-7']);
        doc.click();
        expect(viewDocument).toHaveBeenCalledWith('d1');
    });

    it('shows activity across the tree tagged by ticket, and pages older activity in', async () => {
        api.getEpicOverview
            .mockResolvedValueOnce(overview({
                tickets: [t('1', 'todo')],
                activities: [{ id: 'a1', issue_id: '1', activity_type: 'created', created_at: '2025-01-01T00:00:00Z', user_name: 'Ada' }],
                more_activity: true,
            }))
            .mockResolvedValueOnce(overview({
                activities: [{ id: 'a2', issue_id: 'epic-1', activity_type: 'updated', created_at: '2024-01-01T00:00:00Z', user_name: 'Bob' }],
                more_activity: false,
            }));
        await viewEpic('epic-1');
        expect(content().querySelector('#epic-activity-rows .epic-page-tag').textContent).toBe('CHT-1');
        content().querySelector('[data-epic-more-activity]').click();
        await vi.waitFor(() => expect(content().querySelectorAll('#epic-activity-rows .activity-item').length).toBe(2));
        expect(api.getEpicOverview).toHaveBeenLastCalledWith('epic-1', { activitySkip: 1 });
        expect(content().querySelector('[data-epic-more-activity]')).toBeNull();
    });

    it('opens a sub-epic from its title as its epic page', async () => {
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [
            t('1', 'todo'), { ...t('200', 'todo'), id: 'sub-1', issue_type: 'epic' },
        ] }));
        await viewEpic('epic-1');
        content().querySelector('[data-identifier="CHT-200"] .issue-title').click();
        await vi.waitFor(() => expect(api.getIssue).toHaveBeenCalledWith('sub-1'));
    });

    it('says there are no tickets yet', async () => {
        await viewEpic('epic-1');
        expect(content().textContent).toContain('No sub-issues yet');
    });

    it('still renders when the progress read fails', async () => {
        api.getProjectEpicProgress.mockRejectedValue(new Error('down'));
        api.getEpicOverview.mockResolvedValue(overview({ tickets: [t('1', 'todo')] }));
        await viewEpic('epic-1');
        expect(rowIds('epic-todo')).toEqual(['CHT-1']);
        expect(showApiError).not.toHaveBeenCalled();
    });

    it('redirects a non-epic to the issue view', async () => {
        api.getIssue.mockResolvedValue(makeEpic({ issue_type: 'task' }));
        await viewEpic('epic-1');
        expect(mockViewIssue).toHaveBeenCalledWith('epic-1', true);
        expect(api.getEpicOverview).not.toHaveBeenCalled();
    });

    it('reports a load failure', async () => {
        api.getEpicOverview.mockRejectedValue(new Error('boom'));
        await viewEpic('epic-1');
        expect(showApiError).toHaveBeenCalledWith('load epic', expect.any(Error));
    });

    it('pushes /epic/<identifier> history, and not on a replay', async () => {
        const push = vi.spyOn(history, 'pushState');
        await viewEpic('epic-1');
        expect(push).toHaveBeenCalledWith(expect.any(Object), '', '/epic/CHT-100');
        push.mockClear();
        await viewEpic('epic-1', false);
        expect(push).not.toHaveBeenCalled();
    });

    it('builds prev/next from the Epics list', async () => {
        getCurrentEpics.mockReturnValue([{ id: 'e0' }, { id: 'epic-1' }, { id: 'e2' }]);
        await viewEpic('epic-1');
        expect(content().querySelector('.issue-nav-counter').textContent).toBe('2 / 3');
        expect(content().querySelector('[data-epic-id="e0"]')).toBeTruthy();
        expect(content().querySelector('[data-epic-id="e2"]')).toBeTruthy();
    });

    it('offers to follow the tickets again on a hand-set status', async () => {
        api.getIssue.mockResolvedValue(makeEpic({ status_pinned: true }));
        await viewEpic('epic-1');
        expect(content().querySelector('[data-action="epic-follow-children"]')).toBeTruthy();
    });

    it('opens the plain ticket page from "Open as ticket"', () => {
        epicDetailActions['epic-open-as-ticket']({}, { epicId: 'epic-1' });
        expect(mockViewIssue).toHaveBeenCalledWith('epic-1');
    });

    it('unpins a hand-set status', async () => {
        api.updateIssue.mockResolvedValue({});
        await epicDetailActions['epic-follow-children']({}, { epicId: 'epic-1' });
        expect(api.updateIssue).toHaveBeenCalledWith('epic-1', { status_follows_children: true });
        expect(showToast).toHaveBeenCalledWith('Status now follows its sub-issues');
    });

    describe('viewEpicByPath', () => {
        it('loads by identifier, and sends a non-epic to the issue view', async () => {
            await viewEpicByPath('CHT-100');
            expect(api.getIssueByIdentifier).toHaveBeenCalledWith('CHT-100');
            api.getIssueByIdentifier.mockResolvedValue(makeEpic({ issue_type: 'bug' }));
            await viewEpicByPath('CHT-100');
            expect(mockViewIssue).toHaveBeenCalledWith('epic-1', false);
        });

        it('goes back to Epics when the epic is missing', async () => {
            api.getIssueByIdentifier.mockRejectedValue(new Error('404'));
            await viewEpicByPath('CHT-999');
            expect(navigateTo).toHaveBeenCalledWith('epics', false);
        });
    });
});
