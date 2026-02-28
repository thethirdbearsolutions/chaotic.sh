/**
 * Tests for issue-detail-view.js module (CHT-668)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock dependencies
vi.mock('./api.js', () => ({
    api: {
        getIssue: vi.fn(),
        getIssueByIdentifier: vi.fn(),
        getComments: vi.fn().mockResolvedValue([]),
        getActivities: vi.fn().mockResolvedValue([]),
        getSubIssues: vi.fn().mockResolvedValue([]),
        getRelations: vi.fn().mockResolvedValue([]),
        getTicketRitualsStatus: vi.fn().mockResolvedValue({ pending_rituals: [], completed_rituals: [] }),
        getSprints: vi.fn().mockResolvedValue([]),
        createComment: vi.fn().mockResolvedValue({}),
        updateIssue: vi.fn().mockResolvedValue({}),
        searchIssues: vi.fn().mockResolvedValue([]),
        createRelation: vi.fn().mockResolvedValue({}),
        deleteRelation: vi.fn().mockResolvedValue({}),
    },
}));

vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
}));

vi.mock('./router.js', () => ({
    navigateTo: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
    formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
    isOutOfScale: vi.fn(() => false),
}));

vi.mock('./teams.js', () => ({
    getMembers: vi.fn(() => []),
}));

vi.mock('./assignees.js', () => ({
    getAssigneeById: vi.fn(() => null),
    formatAssigneeName: vi.fn((a) => a?.name || ''),
}));

vi.mock('./utils.js', () => ({
    formatStatus: vi.fn((s) => s),
    formatPriority: vi.fn((p) => p),
    formatIssueType: vi.fn((t) => t || 'task'),
    formatTimeAgo: vi.fn(() => '1h ago'),
    escapeHtml: vi.fn((text) => text || ''),
    escapeAttr: vi.fn((text) => text || ''),
    sanitizeColor: vi.fn((c) => c || '#888'),
    renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
}));

vi.mock('./issue-list.js', () => ({
    getStatusIcon: vi.fn(() => '<svg></svg>'),
    getPriorityIcon: vi.fn(() => '<svg></svg>'),
}));

vi.mock('./gate-approvals.js', () => ({
    renderMarkdown: vi.fn((content) => content),
}));

vi.mock('./inline-dropdown.js', () => ({
    showDetailDropdown: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./issue-creation.js', () => ({
    showCreateSubIssueModal: vi.fn(),
}));

vi.mock('./mention-autocomplete.js', () => ({
    setupMentionAutocomplete: vi.fn(),
}));

vi.mock('./rituals-view.js', () => ({
    renderTicketRitualActions: vi.fn(() => ''),
}));

vi.mock('./state.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getCurrentView: vi.fn(() => 'my-issues'),
        getIssues: vi.fn(() => []),
    };
});

import { setCurrentTeam, setCurrentDetailIssue, getCurrentDetailIssue, getCurrentView, getIssues } from './state.js';
import { api } from './api.js';
import { showToast, showModal, closeModal } from './ui.js';
import { navigateTo } from './router.js';
import { getProjects, formatEstimate } from './projects.js';
import { getAssigneeById, formatAssigneeName } from './assignees.js';
import { formatStatus, formatPriority, formatIssueType, formatTimeAgo, escapeHtml, escapeAttr, sanitizeColor, renderAvatar } from './utils.js';
import { getStatusIcon, getPriorityIcon } from './issue-list.js';
import { renderMarkdown } from './gate-approvals.js';
import { showDetailDropdown } from './inline-dropdown.js';
import { setupMentionAutocomplete } from './mention-autocomplete.js';
import { renderTicketRitualActions } from './rituals-view.js';
import {
    getActivityIcon,
    formatActivityActor,
    formatActivityText,
    renderCommentContent,
    renderDescriptionContent,
    viewIssue,
    viewIssueByPath,
    toggleTicketRituals,
    getTicketRitualsCollapsed,
    setTicketRitualsCollapsed,
    handleAddComment,
    editDescription,
    setDescriptionEditorMode,
    showAddRelationModal,
    searchIssuesToRelate,
    selectIssueForRelation,
    clearSelectedRelation,
    handleAddRelation,
    deleteRelation,
    loadTicketRituals,
} from './issue-detail-view.js';

describe('issue-detail-view', () => {
    beforeEach(() => {
        // Reset state
        setTicketRitualsCollapsed(true);

        // Reset mocks to defaults
        api.getIssue.mockReset();
        api.getIssueByIdentifier.mockReset();
        api.getComments.mockReset().mockResolvedValue([]);
        api.getActivities.mockReset().mockResolvedValue([]);
        api.getSubIssues.mockReset().mockResolvedValue([]);
        api.getRelations.mockReset().mockResolvedValue([]);
        api.getTicketRitualsStatus.mockReset().mockResolvedValue({ pending_rituals: [], completed_rituals: [] });
        api.getSprints.mockReset().mockResolvedValue([]);
        api.createComment.mockReset().mockResolvedValue({});
        api.updateIssue.mockReset().mockResolvedValue({});
        api.searchIssues.mockReset().mockResolvedValue([]);
        api.createRelation.mockReset().mockResolvedValue({});
        api.deleteRelation.mockReset().mockResolvedValue({});

        showToast.mockClear();
        showModal.mockClear();
        closeModal.mockClear();
        navigateTo.mockClear();
        getProjects.mockReset().mockReturnValue([]);
        formatEstimate.mockReset().mockImplementation((e) => e ? `${e}pt` : 'None');
        getAssigneeById.mockReset().mockReturnValue(null);
        formatAssigneeName.mockReset().mockImplementation((a) => a?.name || '');
        formatStatus.mockReset().mockImplementation((s) => s);
        formatPriority.mockReset().mockImplementation((p) => p);
        formatIssueType.mockReset().mockImplementation((t) => t || 'task');
        formatTimeAgo.mockReset().mockReturnValue('1h ago');
        escapeHtml.mockReset().mockImplementation((text) => text || '');
        escapeAttr.mockReset().mockImplementation((text) => text || '');

        sanitizeColor.mockReset().mockImplementation((c) => c || '#888');
        renderAvatar.mockReset().mockReturnValue('<span class="avatar"></span>');
        getStatusIcon.mockReset().mockReturnValue('<svg></svg>');
        getPriorityIcon.mockReset().mockReturnValue('<svg></svg>');
        renderMarkdown.mockReset().mockImplementation((content) => content);
        showDetailDropdown.mockClear();
        setupMentionAutocomplete.mockClear();
        renderTicketRitualActions.mockReset().mockReturnValue('');
        getCurrentView.mockReset().mockReturnValue('my-issues');
        getIssues.mockReset().mockReturnValue([]);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div class="view" id="my-issues-view"></div>
            <div class="view hidden" id="issue-detail-view">
                <div id="issue-detail-content"></div>
            </div>
            <div id="ticket-rituals-section" class="hidden">
                <div class="ticket-rituals-content collapsed"></div>
            </div>
            <div id="modal-title"></div>
            <div id="modal-content"></div>
            <textarea id="new-comment"></textarea>
        `;
        setCurrentTeam({ id: 'team-1' });
    });

    afterEach(() => {
        setCurrentTeam(null);
        setCurrentDetailIssue(null);
    });

    describe('getActivityIcon', () => {
        it('returns emoji for known activity types', () => {
            expect(getActivityIcon('created')).toBe('✨');
            expect(getActivityIcon('commented')).toBe('💬');
            expect(getActivityIcon('status_changed')).toBe('🔄');
            expect(getActivityIcon('priority_changed')).toBe('⚡');
            expect(getActivityIcon('assigned')).toBe('👤');
        });

        it('returns bullet for unknown activity types', () => {
            expect(getActivityIcon('unknown')).toBe('•');
        });

        it('returns correct icons for document activities', () => {
            expect(getActivityIcon('doc_created')).toBe('📄');
            expect(getActivityIcon('doc_updated')).toBe('📝');
            expect(getActivityIcon('doc_deleted')).toBe('🗑️');
        });
    });

    describe('formatActivityActor', () => {
        it('returns user_name if available', () => {
            const activity = { user_name: 'John Doe', user_email: 'john@example.com' };
            expect(formatActivityActor(activity)).toBe('John Doe');
        });

        it('falls back to user_email if no name', () => {
            const activity = { user_email: 'john@example.com' };
            expect(formatActivityActor(activity)).toBe('john@example.com');
        });

        it('returns Unknown if no user info', () => {
            const activity = {};
            expect(formatActivityActor(activity)).toBe('Unknown');
        });
    });

    describe('formatActivityText', () => {
        it('formats created activity', () => {
            const activity = { activity_type: 'created' };
            expect(formatActivityText(activity)).toBe('Created issue');
        });

        it('formats commented activity', () => {
            const activity = { activity_type: 'commented' };
            expect(formatActivityText(activity)).toBe('Added a comment');
        });

        it('formats status_changed activity with values', () => {
            const activity = { activity_type: 'status_changed', old_value: 'todo', new_value: 'done' };
            const result = formatActivityText(activity);
            expect(result).toContain('Changed status');
            expect(result).toContain('todo');
            expect(result).toContain('done');
        });

        it('formats moved_to_sprint with sprint name', () => {
            const activity = { activity_type: 'moved_to_sprint', sprint_name: 'Sprint 1' };
            const result = formatActivityText(activity);
            expect(result).toContain('Moved to sprint');
            expect(result).toContain('Sprint 1');
        });

        it('formats generic update with field name', () => {
            const activity = { activity_type: 'updated', field_name: 'title' };
            expect(formatActivityText(activity)).toContain('Updated title');
        });

        it('escapes sprint_name in moved_to_sprint (XSS)', () => {
            const xss = '<img src=x onerror=alert(1)>';
            escapeHtml.mockImplementation((text) => text === xss ? '&lt;img&gt;' : (text || ''));
            const activity = { activity_type: 'moved_to_sprint', sprint_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;img&gt;');
            expect(result).not.toContain(xss);
        });

        it('escapes sprint_name in removed_from_sprint (XSS)', () => {
            const xss = '<script>alert(1)</script>';
            escapeHtml.mockImplementation((text) => text === xss ? '&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'removed_from_sprint', sprint_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;script&gt;');
            expect(result).not.toContain(xss);
        });

        it('escapes field_name in ritual_attested (XSS)', () => {
            const xss = '<img src=x onerror=alert(1)>';
            escapeHtml.mockImplementation((text) => {
                if (text === xss) return '&lt;img&gt;';
                return text || '';
            });
            const activity = { activity_type: 'ritual_attested', field_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;img&gt;');
            expect(result).not.toContain(xss);
        });

        it('escapes unknown field_name in updated activity (XSS)', () => {
            const xss = '<script>evil()</script>';
            escapeHtml.mockImplementation((text) => text === xss ? '&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'updated', field_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;script&gt;');
            expect(result).not.toContain(xss);
        });

        it('does not escape known field_name in updated activity', () => {
            const activity = { activity_type: 'updated', field_name: 'status' };
            const result = formatActivityText(activity);
            expect(result).toBe('Updated status');
            // escapeHtml should not have been called with 'status' since it's in fieldLabels
        });

        it('escapes unknown field_name in default/unknown activity type (XSS)', () => {
            const xss = '"><script>alert(1)</script>';
            escapeHtml.mockImplementation((text) => text === xss ? '&quot;&gt;&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'some_future_type', field_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&quot;&gt;&lt;script&gt;');
            expect(result).not.toContain(xss);
        });

        it('uses escapeAttr for comment preview title attribute (CHT-894)', () => {
            const xss = '" onmouseover="alert(1)';
            escapeAttr.mockImplementation((text) => text.startsWith(xss) ? '&quot; onmouseover=&quot;alert(1)' : (text || ''));
            const activity = { activity_type: 'commented', new_value: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('title="&quot; onmouseover=&quot;alert(1)');
            expect(escapeAttr).toHaveBeenCalled();
        });

        it('uses escapeAttr for ritual_attested note preview title (CHT-894)', () => {
            const xss = '" onclick="alert(1)';
            escapeAttr.mockImplementation((text) => text.startsWith(xss) ? '&quot; onclick=&quot;alert(1)' : (text || ''));
            escapeHtml.mockImplementation((text) => text || '');
            const activity = { activity_type: 'ritual_attested', field_name: 'test-ritual', new_value: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('title="&quot; onclick=&quot;alert(1)');
            expect(escapeAttr).toHaveBeenCalled();
        });

        it('escapes formatStatus output in status_changed (CHT-895)', () => {
            formatStatus.mockImplementation(() => '<img src=x>');
            escapeHtml.mockImplementation((text) => text === '<img src=x>' ? '&lt;img src=x&gt;' : (text || ''));
            const activity = { activity_type: 'status_changed', old_value: 'todo', new_value: 'done' };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;img src=x&gt;');
            expect(result).not.toContain('<img src=x>');
        });

        it('escapes formatPriority output in priority_changed (CHT-895)', () => {
            formatPriority.mockImplementation(() => '<script>x</script>');
            escapeHtml.mockImplementation((text) => text === '<script>x</script>' ? '&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'priority_changed', old_value: 'low', new_value: 'high' };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;script&gt;');
            expect(result).not.toContain('<script>x</script>');
        });
    });

    describe('renderCommentContent', () => {
        it('returns empty string for empty content', () => {
            expect(renderCommentContent('')).toBe('');
            expect(renderCommentContent(null)).toBe('');
        });

        it('renders markdown content', () => {
            renderMarkdown.mockReturnValue('<p>Hello world</p>');
            const _result = renderCommentContent('Hello world');
            expect(renderMarkdown).toHaveBeenCalledWith('Hello world');
        });
    });

    describe('renderDescriptionContent', () => {
        it('returns empty string for empty content', () => {
            expect(renderDescriptionContent('')).toBe('');
            expect(renderDescriptionContent(null)).toBe('');
        });

        it('renders markdown for description', () => {
            renderMarkdown.mockReturnValue('<p>Description</p>');
            const _result = renderDescriptionContent('Description');
            expect(renderMarkdown).toHaveBeenCalledWith('Description');
        });
    });

    describe('viewIssue', () => {
        const mockIssue = {
            id: 'issue-1',
            identifier: 'TEST-1',
            title: 'Test Issue',
            description: 'Test description',
            status: 'todo',
            priority: 'medium',
            issue_type: 'task',
            project_id: 'project-1',
            created_at: '2024-01-15T10:00:00Z',
        };

        beforeEach(() => {
            api.getIssue.mockResolvedValue(mockIssue);
            getProjects.mockReturnValue([{ id: 'project-1', name: 'Test Project' }]);
        });

        it('fetches issue data from API', async () => {
            await viewIssue('issue-1');

            expect(api.getIssue).toHaveBeenCalledWith('issue-1');
            expect(api.getComments).toHaveBeenCalledWith('issue-1');
            expect(api.getActivities).toHaveBeenCalledWith('issue-1');
        });

        it('shows detail view and hides other views', async () => {
            await viewIssue('issue-1');

            const detailView = document.getElementById('issue-detail-view');
            expect(detailView.classList.contains('hidden')).toBe(false);
        });

        it('updates browser history by default', async () => {
            const pushStateSpy = vi.spyOn(history, 'pushState');

            await viewIssue('issue-1');

            expect(pushStateSpy).toHaveBeenCalled();
        });

        it('does not update history when pushHistory=false', async () => {
            const pushStateSpy = vi.spyOn(history, 'pushState');

            await viewIssue('issue-1', false);

            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('sets currentDetailIssue in state', async () => {
            await viewIssue('issue-1');

            expect(getCurrentDetailIssue()).toEqual(mockIssue);
        });

        it('shows error toast on API failure', async () => {
            api.getIssue.mockRejectedValue(new Error('API Error'));

            await viewIssue('issue-1');

            expect(showToast).toHaveBeenCalledWith('Failed to load issue: API Error', 'error');
        });

        it('renders attestation info for pending rituals (CHT-901)', async () => {
            api.getTicketRitualsStatus.mockResolvedValue({
                pending_rituals: [{
                    id: 'r1',
                    name: 'Code Review',
                    prompt: 'Review the code',
                    trigger: 'ticket_close',
                    approval_mode: 'review',
                    attestation: {
                        id: 'att-1',
                        attested_by_name: 'Alice',
                        attested_at: '2026-02-15T10:00:00Z',
                        note: 'All files reviewed',
                    },
                }],
                completed_rituals: [],
            });

            await viewIssue('issue-1');
            // loadTicketRituals is fire-and-forget in viewIssue, call directly
            await loadTicketRituals('issue-1');

            // Rituals render into the first ticket-rituals-section found by getElementById
            const ritualsHtml = document.getElementById('ticket-rituals-section').innerHTML;
            expect(ritualsHtml).toContain('Attested by');
            expect(ritualsHtml).toContain('Alice');
            expect(ritualsHtml).toContain('All files reviewed');
            // Pending ritual with attestation shows hourglass icon
            expect(ritualsHtml).toContain('⏳');
        });

        it('renders pending rituals without attestation (CHT-901)', async () => {
            api.getTicketRitualsStatus.mockResolvedValue({
                pending_rituals: [{
                    id: 'r1',
                    name: 'Run Tests',
                    prompt: 'Run the test suite',
                    trigger: 'ticket_close',
                    approval_mode: 'gate',
                }],
                completed_rituals: [],
            });

            await viewIssue('issue-1');
            await loadTicketRituals('issue-1');

            const ritualsHtml = document.getElementById('ticket-rituals-section').innerHTML;
            expect(ritualsHtml).toContain('Run Tests');
            expect(ritualsHtml).not.toContain('Attested by');
            // Non-attested pending ritual shows circle icon
            expect(ritualsHtml).toContain('○');
        });

        describe('prev/next navigation (CHT-553)', () => {
            const issueList = [
                { id: 'issue-a', identifier: 'TEST-1', title: 'First' },
                { id: 'issue-1', identifier: 'TEST-2', title: 'Middle' },
                { id: 'issue-c', identifier: 'TEST-3', title: 'Last' },
            ];

            it('renders prev/next buttons when issue is in list', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('issue-nav-arrows');
                expect(html).toContain('2 / 3');
            });

            it('prev button links to previous issue', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('Previous issue');
                expect(html).toContain('issue-a');
            });

            it('next button links to next issue', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('Next issue');
                expect(html).toContain('issue-c');
            });

            it('disables prev button on first issue', async () => {
                getIssues.mockReturnValue(issueList);
                api.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-a',
                });

                await viewIssue('issue-a');

                const html = document.getElementById('issue-detail-content').innerHTML;
                const prevMatch = html.match(/<button[^>]*title="Previous issue"[^>]*>/);
                expect(prevMatch[0]).toContain('disabled');
            });

            it('disables next button on last issue', async () => {
                getIssues.mockReturnValue(issueList);
                api.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-c',
                });

                await viewIssue('issue-c');

                const html = document.getElementById('issue-detail-content').innerHTML;
                const nextMatch = html.match(/<button[^>]*title="Next issue"[^>]*>/);
                expect(nextMatch[0]).toContain('disabled');
            });

            it('hides nav arrows when issue not in list', async () => {
                getIssues.mockReturnValue([]);

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).not.toContain('issue-nav-arrows');
            });

            it('handles keyboard ArrowRight to navigate next', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');
                api.getIssue.mockClear();
                api.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-c',
                });

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                await new Promise(r => setTimeout(r, 10));

                expect(api.getIssue).toHaveBeenCalledWith('issue-c');
            });

            it('handles keyboard ArrowLeft to navigate prev', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');
                api.getIssue.mockClear();
                api.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-a',
                });

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
                await new Promise(r => setTimeout(r, 10));

                expect(api.getIssue).toHaveBeenCalledWith('issue-a');
            });

            it('ignores keyboard nav when detail view is hidden', async () => {
                getIssues.mockReturnValue(issueList);

                await viewIssue('issue-1');
                api.getIssue.mockClear();

                // Simulate navigating away from detail view
                document.getElementById('issue-detail-view').classList.add('hidden');

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                await new Promise(r => setTimeout(r, 10));

                expect(api.getIssue).not.toHaveBeenCalled();
            });
        });
    });

    describe('viewIssueByPath', () => {
        it('fetches issue by identifier when path contains hyphen', async () => {
            const mockIssue = { id: 'issue-1' };
            api.getIssueByIdentifier.mockResolvedValue(mockIssue);
            api.getIssue.mockResolvedValue(mockIssue);
            api.getComments.mockResolvedValue([]);
            api.getActivities.mockResolvedValue([]);
            api.getSubIssues.mockResolvedValue([]);
            api.getRelations.mockResolvedValue([]);
            getProjects.mockReturnValue([]);

            await viewIssueByPath('TEST-1');

            expect(api.getIssueByIdentifier).toHaveBeenCalledWith('TEST-1');
        });

        it('navigates to my-issues on error', async () => {
            api.getIssueByIdentifier.mockRejectedValue(new Error('Not found'));

            await viewIssueByPath('TEST-999');

            expect(navigateTo).toHaveBeenCalledWith('my-issues', false);
        });
    });

    describe('ticketRitualsCollapsed state', () => {
        it('getTicketRitualsCollapsed returns current state', () => {
            setTicketRitualsCollapsed(true);
            expect(getTicketRitualsCollapsed()).toBe(true);

            setTicketRitualsCollapsed(false);
            expect(getTicketRitualsCollapsed()).toBe(false);
        });
    });

    describe('toggleTicketRituals', () => {
        beforeEach(() => {
            document.body.innerHTML = `
                <div id="ticket-rituals-section">
                    <div class="section-toggle-icon"></div>
                    <div class="ticket-rituals-content collapsed"></div>
                </div>
            `;
        });

        it('toggles collapsed state', () => {
            setTicketRitualsCollapsed(true);

            toggleTicketRituals();

            expect(getTicketRitualsCollapsed()).toBe(false);
        });

        it('toggles collapsed class on content element', () => {
            setTicketRitualsCollapsed(true);
            const content = document.querySelector('.ticket-rituals-content');

            toggleTicketRituals();

            expect(content.classList.contains('collapsed')).toBe(false);
        });
    });

    // ========================================================================
    // Extracted functions (CHT-666)
    // ========================================================================

    describe('handleAddComment', () => {
        it('creates comment and refreshes issue', async () => {
            const mockIssue = { id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' };
            api.getIssue.mockResolvedValue(mockIssue);
            api.createComment.mockResolvedValue({});
            document.getElementById('new-comment').value = 'Hello world';

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(api.createComment).toHaveBeenCalledWith('i1', 'Hello world');
            expect(showToast).toHaveBeenCalledWith('Comment added!', 'success');
        });

        it('shows error toast on failure', async () => {
            api.createComment.mockRejectedValue(new Error('forbidden'));

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(showToast).toHaveBeenCalledWith('Failed to add comment: forbidden', 'error');
        });

        it('clears comment draft on successful submit (CHT-1041)', async () => {
            api.createComment.mockResolvedValue({});
            api.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });
            localStorage.setItem('chaotic_comment_draft_i1', 'draft text');
            document.getElementById('new-comment').value = 'Hello';

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(localStorage.getItem('chaotic_comment_draft_i1')).toBeNull();
        });

        it('restores comment draft on failure (CHT-1041)', async () => {
            api.createComment.mockRejectedValue(new Error('fail'));
            document.getElementById('new-comment').value = 'My comment';

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(localStorage.getItem('chaotic_comment_draft_i1')).toBe('My comment');
            localStorage.removeItem('chaotic_comment_draft_i1');
        });
    });

    describe('editDescription', () => {
        beforeEach(() => {
            document.body.innerHTML += `
                <div class="issue-detail-description">
                    <div class="section-header"><h3>Description</h3></div>
                    <div class="description-content markdown-body">Current desc</div>
                </div>
            `;
        });

        it('opens inline description editor', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Current desc' });

            await editDescription('i1');

            const textarea = document.getElementById('edit-description');
            expect(textarea).toBeTruthy();
            expect(textarea.value).toBe('Current desc');
        });

        it('falls back to API when no cached issue', async () => {
            setCurrentDetailIssue(null);
            api.getIssue.mockResolvedValue({ id: 'i1', description: 'API desc' });

            await editDescription('i1');

            expect(api.getIssue).toHaveBeenCalledWith('i1');
            expect(document.getElementById('edit-description').value).toBe('API desc');
        });

        it('restores description draft from localStorage (CHT-1041)', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Original' });
            localStorage.setItem('chaotic_description_draft_i1', 'Draft content');

            await editDescription('i1');

            expect(document.getElementById('edit-description').value).toBe('Draft content');
            localStorage.removeItem('chaotic_description_draft_i1');
        });

        it('clears description draft on cancel (CHT-1041)', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Original' });
            localStorage.setItem('chaotic_description_draft_i1', 'Draft');

            await editDescription('i1');
            document.getElementById('cancel-description-edit').click();

            expect(localStorage.getItem('chaotic_description_draft_i1')).toBeNull();
        });
    });

    describe('setDescriptionEditorMode', () => {
        beforeEach(async () => {
            document.body.innerHTML += `
                <div class="issue-detail-description">
                    <div class="section-header"><h3>Description</h3></div>
                    <div class="description-content markdown-body">Test</div>
                </div>
            `;
            setCurrentDetailIssue({ id: 'i1', description: 'Test' });
            await editDescription('i1');
        });

        it('switches to preview mode', () => {
            setDescriptionEditorMode('preview');

            const textarea = document.getElementById('edit-description');
            const preview = document.getElementById('edit-description-preview');
            expect(textarea.style.display).toBe('none');
            expect(preview.style.display).toBe('block');
        });

        it('switches back to write mode', () => {
            setDescriptionEditorMode('preview');
            setDescriptionEditorMode('write');

            const textarea = document.getElementById('edit-description');
            const preview = document.getElementById('edit-description-preview');
            expect(textarea.style.display).toBe('block');
            expect(preview.style.display).toBe('none');
        });
    });

    describe('editDescription inline', () => {
        it('replaces description content with inline editor', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Old desc' });
            // Set up the description section in DOM
            document.body.innerHTML += `
                <div class="issue-detail-description">
                    <div class="section-header"><h3>Description</h3></div>
                    <div class="description-content markdown-body">Old desc</div>
                </div>
            `;

            await editDescription('i1');

            expect(document.getElementById('edit-description')).toBeTruthy();
            expect(document.getElementById('edit-description').value).toBe('Old desc');
            expect(document.getElementById('save-description-edit')).toBeTruthy();
            expect(document.getElementById('cancel-description-edit')).toBeTruthy();
            // Section header should be hidden
            expect(document.querySelector('.issue-detail-description .section-header').style.display).toBe('none');
        });

        it('cancel restores original content', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Original' });
            document.body.innerHTML += `
                <div class="issue-detail-description">
                    <div class="section-header"><h3>Description</h3></div>
                    <div class="description-content markdown-body">Original</div>
                </div>
            `;

            await editDescription('i1');
            document.getElementById('cancel-description-edit').click();

            expect(document.getElementById('edit-description')).toBeFalsy();
            expect(document.querySelector('.issue-detail-description .section-header').style.display).toBe('');
        });

        it('save calls updateIssue and shows toast', async () => {
            setCurrentDetailIssue({ id: 'i1', description: 'Old' });
            document.body.innerHTML += `
                <div class="issue-detail-description">
                    <div class="section-header"><h3>Description</h3></div>
                    <div class="description-content markdown-body">Old</div>
                </div>
            `;
            api.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium', description: 'New' });

            await editDescription('i1');
            document.getElementById('edit-description').value = 'New';
            document.getElementById('save-description-edit').click();

            // Wait for async save
            await new Promise(r => setTimeout(r, 0));

            expect(api.updateIssue).toHaveBeenCalledWith('i1', { description: 'New' });
            expect(showToast).toHaveBeenCalledWith('Description updated', 'success');
        });
    });

    describe('showAddRelationModal', () => {
        it('opens relation modal with search', () => {
            showAddRelationModal('i1');

            expect(showModal).toHaveBeenCalled();
            expect(document.getElementById('modal-title').textContent).toBe('Add Relation');
            expect(document.getElementById('relation-type')).toBeTruthy();
            expect(document.getElementById('relation-issue-search')).toBeTruthy();
        });
    });

    describe('searchIssuesToRelate', () => {
        it('searches and renders results', async () => {
            api.searchIssues.mockResolvedValue([
                { id: 'i2', identifier: 'CHT-2', title: 'Other Issue' },
            ]);
            showAddRelationModal('i1');

            await searchIssuesToRelate('other', 'i1');

            const results = document.getElementById('relation-search-results');
            expect(results.innerHTML).toContain('CHT-2');
            expect(results.innerHTML).toContain('Other Issue');
        });

        it('filters out current issue from results', async () => {
            api.searchIssues.mockResolvedValue([
                { id: 'i1', identifier: 'CHT-1', title: 'Self' },
                { id: 'i2', identifier: 'CHT-2', title: 'Other' },
            ]);
            showAddRelationModal('i1');

            await searchIssuesToRelate('test', 'i1');

            const results = document.getElementById('relation-search-results');
            expect(results.innerHTML).not.toContain('CHT-1');
            expect(results.innerHTML).toContain('CHT-2');
        });

        it('shows empty state for short queries', async () => {
            showAddRelationModal('i1');

            await searchIssuesToRelate('a', 'i1');

            const results = document.getElementById('relation-search-results');
            expect(results.innerHTML).toContain('Enter a search term');
        });
    });

    describe('selectIssueForRelation / clearSelectedRelation', () => {
        beforeEach(() => {
            showAddRelationModal('i1');
        });

        it('selects an issue and enables submit', () => {
            selectIssueForRelation('i2', 'CHT-2', 'Selected Issue');

            expect(document.getElementById('selected-related-issue-id').value).toBe('i2');
            expect(document.getElementById('add-relation-btn').disabled).toBe(false);
        });

        it('clears selection and disables submit', () => {
            selectIssueForRelation('i2', 'CHT-2', 'Selected Issue');
            clearSelectedRelation();

            expect(document.getElementById('selected-related-issue-id').value).toBe('');
            expect(document.getElementById('add-relation-btn').disabled).toBe(true);
        });
    });

    describe('handleAddRelation', () => {
        it('creates relation and shows success', async () => {
            showAddRelationModal('i1');
            selectIssueForRelation('i2', 'CHT-2', 'Other');
            api.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(api.createRelation).toHaveBeenCalledWith('i1', 'i2', 'blocks');
            expect(closeModal).toHaveBeenCalled();
            expect(showToast).toHaveBeenCalledWith('Relation added', 'success');
        });

        it('reverses direction for blocked_by', async () => {
            showAddRelationModal('i1');
            document.getElementById('relation-type').value = 'blocked_by';
            selectIssueForRelation('i2', 'CHT-2', 'Other');
            api.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(api.createRelation).toHaveBeenCalledWith('i2', 'i1', 'blocks');
        });

        it('shows error when no issue selected', async () => {
            showAddRelationModal('i1');

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(showToast).toHaveBeenCalledWith('Please select an issue', 'error');
        });
    });

    describe('deleteRelation', () => {
        it('deletes relation and refreshes', async () => {
            api.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await deleteRelation('i1', 'r1');

            expect(api.deleteRelation).toHaveBeenCalledWith('i1', 'r1');
            expect(showToast).toHaveBeenCalledWith('Relation removed', 'success');
        });

        it('shows error on failure', async () => {
            api.deleteRelation.mockRejectedValue(new Error('not found'));

            await deleteRelation('i1', 'r1');

            expect(showToast).toHaveBeenCalledWith('Failed to remove relation: not found', 'error');
        });
    });
});
