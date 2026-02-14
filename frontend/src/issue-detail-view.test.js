/**
 * Tests for issue-detail-view.js module (CHT-668)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    setDependencies,
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
} from './issue-detail-view.js';

describe('issue-detail-view', () => {
    let mockApi;
    let mockDeps;

    beforeEach(() => {
        // Reset state
        setTicketRitualsCollapsed(true);

        // Mock API
        mockApi = {
            getIssue: vi.fn(),
            getIssueByIdentifier: vi.fn(),
            getComments: vi.fn().mockResolvedValue([]),
            getActivities: vi.fn().mockResolvedValue([]),
            getSubIssues: vi.fn().mockResolvedValue([]),
            getRelations: vi.fn().mockResolvedValue([]),
            getTicketRitualsStatus: vi.fn().mockResolvedValue({ pending_rituals: [], completed_rituals: [] }),
            getSprints: vi.fn().mockResolvedValue([]),
        };

        // Mock dependencies
        mockDeps = {
            api: mockApi,
            getCurrentView: vi.fn(() => 'my-issues'),
            showToast: vi.fn(),
            navigateTo: vi.fn(),
            getProjects: vi.fn(() => []),
            getAssigneeById: vi.fn(() => null),
            formatAssigneeName: vi.fn((a) => a?.name || ''),
            formatStatus: vi.fn((s) => s),
            formatPriority: vi.fn((p) => p),
            formatIssueType: vi.fn((t) => t || 'task'),
            formatEstimate: vi.fn((e) => e ? `${e}pt` : 'None'),
            formatTimeAgo: vi.fn(() => '1h ago'),
            getStatusIcon: vi.fn(() => '<svg></svg>'),
            getPriorityIcon: vi.fn(() => '<svg></svg>'),
            renderMarkdown: vi.fn((content) => content),
            renderAvatar: vi.fn(() => '<span class="avatar"></span>'),
            escapeHtml: vi.fn((text) => text || ''),
            escapeAttr: vi.fn((text) => text || ''),
            sanitizeColor: vi.fn((c) => c || '#888'),
            showDetailDropdown: vi.fn(),
            setupMentionAutocomplete: vi.fn(),
        };

        setDependencies(mockDeps);

        // Setup minimal DOM
        document.body.innerHTML = `
            <div class="view" id="my-issues-view"></div>
            <div class="view hidden" id="issue-detail-view">
                <div id="issue-detail-content"></div>
            </div>
            <div id="ticket-rituals-section" class="hidden">
                <div class="ticket-rituals-content collapsed"></div>
            </div>
        `;
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
    });

    describe('renderCommentContent', () => {
        it('returns empty string for empty content', () => {
            expect(renderCommentContent('')).toBe('');
            expect(renderCommentContent(null)).toBe('');
        });

        it('renders markdown content', () => {
            mockDeps.renderMarkdown.mockReturnValue('<p>Hello world</p>');
            const _result = renderCommentContent('Hello world');
            expect(mockDeps.renderMarkdown).toHaveBeenCalledWith('Hello world');
        });
    });

    describe('renderDescriptionContent', () => {
        it('returns empty string for empty content', () => {
            expect(renderDescriptionContent('')).toBe('');
            expect(renderDescriptionContent(null)).toBe('');
        });

        it('renders markdown for description', () => {
            mockDeps.renderMarkdown.mockReturnValue('<p>Description</p>');
            const _result = renderDescriptionContent('Description');
            expect(mockDeps.renderMarkdown).toHaveBeenCalledWith('Description');
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
            mockApi.getIssue.mockResolvedValue(mockIssue);
            mockDeps.getProjects.mockReturnValue([{ id: 'project-1', name: 'Test Project' }]);
        });

        it('fetches issue data from API', async () => {
            await viewIssue('issue-1');

            expect(mockApi.getIssue).toHaveBeenCalledWith('issue-1');
            expect(mockApi.getComments).toHaveBeenCalledWith('issue-1');
            expect(mockApi.getActivities).toHaveBeenCalledWith('issue-1');
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

        it('sets window.currentDetailIssue', async () => {
            await viewIssue('issue-1');

            expect(window.currentDetailIssue).toEqual(mockIssue);
        });

        it('shows error toast on API failure', async () => {
            mockApi.getIssue.mockRejectedValue(new Error('API Error'));

            await viewIssue('issue-1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Failed to load issue: API Error', 'error');
        });
    });

    describe('viewIssueByPath', () => {
        it('fetches issue by identifier when path contains hyphen', async () => {
            const mockIssue = { id: 'issue-1' };
            mockApi.getIssueByIdentifier.mockResolvedValue(mockIssue);
            mockApi.getIssue.mockResolvedValue(mockIssue);
            mockApi.getComments.mockResolvedValue([]);
            mockApi.getActivities.mockResolvedValue([]);
            mockApi.getSubIssues.mockResolvedValue([]);
            mockApi.getRelations.mockResolvedValue([]);
            mockDeps.getProjects.mockReturnValue([]);

            await viewIssueByPath('TEST-1');

            expect(mockApi.getIssueByIdentifier).toHaveBeenCalledWith('TEST-1');
        });

        it('navigates to my-issues on error', async () => {
            mockApi.getIssueByIdentifier.mockRejectedValue(new Error('Not found'));

            await viewIssueByPath('TEST-999');

            expect(mockDeps.navigateTo).toHaveBeenCalledWith('my-issues', false);
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
});
