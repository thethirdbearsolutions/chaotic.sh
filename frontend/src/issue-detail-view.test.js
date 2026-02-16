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
    handleAddComment,
    editDescription,
    setDescriptionEditorMode,
    handleUpdateDescription,
    showAddRelationModal,
    searchIssuesToRelate,
    selectIssueForRelation,
    clearSelectedRelation,
    handleAddRelation,
    deleteRelation,
    loadTicketRituals,
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
            createComment: vi.fn().mockResolvedValue({}),
            updateIssue: vi.fn().mockResolvedValue({}),
            searchIssues: vi.fn().mockResolvedValue([]),
            createRelation: vi.fn().mockResolvedValue({}),
            deleteRelation: vi.fn().mockResolvedValue({}),
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
            showModal: vi.fn(),
            closeModal: vi.fn(),
            escapeJsString: vi.fn((text) => text || ''),
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
            <div id="modal-title"></div>
            <div id="modal-content"></div>
            <textarea id="new-comment"></textarea>
        `;
        window.currentTeam = { id: 'team-1' };
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
            mockDeps.escapeHtml.mockImplementation((text) => text === xss ? '&lt;img&gt;' : (text || ''));
            const activity = { activity_type: 'moved_to_sprint', sprint_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;img&gt;');
            expect(result).not.toContain(xss);
        });

        it('escapes sprint_name in removed_from_sprint (XSS)', () => {
            const xss = '<script>alert(1)</script>';
            mockDeps.escapeHtml.mockImplementation((text) => text === xss ? '&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'removed_from_sprint', sprint_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;script&gt;');
            expect(result).not.toContain(xss);
        });

        it('escapes field_name in ritual_attested (XSS)', () => {
            const xss = '<img src=x onerror=alert(1)>';
            mockDeps.escapeHtml.mockImplementation((text) => {
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
            mockDeps.escapeHtml.mockImplementation((text) => text === xss ? '&lt;script&gt;' : (text || ''));
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
            mockDeps.escapeHtml.mockImplementation((text) => text === xss ? '&quot;&gt;&lt;script&gt;' : (text || ''));
            const activity = { activity_type: 'some_future_type', field_name: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('&quot;&gt;&lt;script&gt;');
            expect(result).not.toContain(xss);
        });

        it('uses escapeAttr for comment preview title attribute (CHT-894)', () => {
            const xss = '" onmouseover="alert(1)';
            mockDeps.escapeAttr.mockImplementation((text) => text.startsWith(xss) ? '&quot; onmouseover=&quot;alert(1)' : (text || ''));
            const activity = { activity_type: 'commented', new_value: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('title="&quot; onmouseover=&quot;alert(1)');
            expect(mockDeps.escapeAttr).toHaveBeenCalled();
        });

        it('uses escapeAttr for ritual_attested note preview title (CHT-894)', () => {
            const xss = '" onclick="alert(1)';
            mockDeps.escapeAttr.mockImplementation((text) => text.startsWith(xss) ? '&quot; onclick=&quot;alert(1)' : (text || ''));
            mockDeps.escapeHtml.mockImplementation((text) => text || '');
            const activity = { activity_type: 'ritual_attested', field_name: 'test-ritual', new_value: xss };
            const result = formatActivityText(activity);
            expect(result).toContain('title="&quot; onclick=&quot;alert(1)');
            expect(mockDeps.escapeAttr).toHaveBeenCalled();
        });

        it('escapes formatStatus output in status_changed (CHT-895)', () => {
            mockDeps.formatStatus.mockImplementation(() => '<img src=x>');
            mockDeps.escapeHtml.mockImplementation((text) => text === '<img src=x>' ? '&lt;img src=x&gt;' : (text || ''));
            const activity = { activity_type: 'status_changed', old_value: 'todo', new_value: 'done' };
            const result = formatActivityText(activity);
            expect(result).toContain('&lt;img src=x&gt;');
            expect(result).not.toContain('<img src=x>');
        });

        it('escapes formatPriority output in priority_changed (CHT-895)', () => {
            mockDeps.formatPriority.mockImplementation(() => '<script>x</script>');
            mockDeps.escapeHtml.mockImplementation((text) => text === '<script>x</script>' ? '&lt;script&gt;' : (text || ''));
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

        it('renders attestation info for pending rituals (CHT-901)', async () => {
            mockApi.getTicketRitualsStatus.mockResolvedValue({
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
            mockApi.getTicketRitualsStatus.mockResolvedValue({
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
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('issue-nav-arrows');
                expect(html).toContain('2 / 3');
            });

            it('prev button links to previous issue', async () => {
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('Previous issue');
                expect(html).toContain('issue-a');
            });

            it('next button links to next issue', async () => {
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).toContain('Next issue');
                expect(html).toContain('issue-c');
            });

            it('disables prev button on first issue', async () => {
                setDependencies({ getIssues: () => issueList });
                mockApi.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-a',
                });

                await viewIssue('issue-a');

                const html = document.getElementById('issue-detail-content').innerHTML;
                const prevMatch = html.match(/<button[^>]*title="Previous issue"[^>]*>/);
                expect(prevMatch[0]).toContain('disabled');
            });

            it('disables next button on last issue', async () => {
                setDependencies({ getIssues: () => issueList });
                mockApi.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-c',
                });

                await viewIssue('issue-c');

                const html = document.getElementById('issue-detail-content').innerHTML;
                const nextMatch = html.match(/<button[^>]*title="Next issue"[^>]*>/);
                expect(nextMatch[0]).toContain('disabled');
            });

            it('hides nav arrows when issue not in list', async () => {
                setDependencies({ getIssues: () => [] });

                await viewIssue('issue-1');

                const html = document.getElementById('issue-detail-content').innerHTML;
                expect(html).not.toContain('issue-nav-arrows');
            });

            it('handles keyboard ArrowRight to navigate next', async () => {
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');
                mockApi.getIssue.mockClear();
                mockApi.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-c',
                });

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                await new Promise(r => setTimeout(r, 10));

                expect(mockApi.getIssue).toHaveBeenCalledWith('issue-c');
            });

            it('handles keyboard ArrowLeft to navigate prev', async () => {
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');
                mockApi.getIssue.mockClear();
                mockApi.getIssue.mockResolvedValue({
                    ...mockIssue,
                    id: 'issue-a',
                });

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
                await new Promise(r => setTimeout(r, 10));

                expect(mockApi.getIssue).toHaveBeenCalledWith('issue-a');
            });

            it('ignores keyboard nav when detail view is hidden', async () => {
                setDependencies({ getIssues: () => issueList });

                await viewIssue('issue-1');
                mockApi.getIssue.mockClear();

                // Simulate navigating away from detail view
                document.getElementById('issue-detail-view').classList.add('hidden');

                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                await new Promise(r => setTimeout(r, 10));

                expect(mockApi.getIssue).not.toHaveBeenCalled();
            });
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

    // ========================================================================
    // Extracted functions (CHT-666)
    // ========================================================================

    describe('handleAddComment', () => {
        it('creates comment and refreshes issue', async () => {
            const mockIssue = { id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' };
            mockApi.getIssue.mockResolvedValue(mockIssue);
            mockApi.createComment.mockResolvedValue({});
            document.getElementById('new-comment').value = 'Hello world';

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(mockApi.createComment).toHaveBeenCalledWith('i1', 'Hello world');
            expect(mockDeps.showToast).toHaveBeenCalledWith('Comment added!', 'success');
        });

        it('shows error toast on failure', async () => {
            mockApi.createComment.mockRejectedValue(new Error('forbidden'));

            await handleAddComment({ preventDefault: vi.fn() }, 'i1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Failed to add comment: forbidden', 'error');
        });
    });

    describe('editDescription', () => {
        it('opens description edit modal', async () => {
            window.currentDetailIssue = { id: 'i1', description: 'Current desc' };

            await editDescription('i1');

            expect(mockDeps.showModal).toHaveBeenCalled();
            expect(document.getElementById('modal-title').textContent).toBe('Edit Description');
            const textarea = document.getElementById('edit-description');
            expect(textarea).toBeTruthy();
            expect(textarea.value).toBe('Current desc');
        });

        it('falls back to API when no cached issue', async () => {
            window.currentDetailIssue = null;
            mockApi.getIssue.mockResolvedValue({ id: 'i1', description: 'API desc' });

            await editDescription('i1');

            expect(mockApi.getIssue).toHaveBeenCalledWith('i1');
            expect(document.getElementById('edit-description').value).toBe('API desc');
        });
    });

    describe('setDescriptionEditorMode', () => {
        beforeEach(async () => {
            window.currentDetailIssue = { id: 'i1', description: 'Test' };
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

    describe('handleUpdateDescription', () => {
        it('updates description and closes modal', async () => {
            // Set up the description edit modal
            window.currentDetailIssue = { id: 'i1', description: 'Old' };
            await editDescription('i1');
            document.getElementById('edit-description').value = 'New description';

            // Mock viewIssue to prevent full render
            mockApi.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium', description: 'New description' });

            await handleUpdateDescription({ preventDefault: vi.fn() }, 'i1');

            expect(mockApi.updateIssue).toHaveBeenCalledWith('i1', { description: 'New description' });
            expect(mockDeps.closeModal).toHaveBeenCalled();
            expect(mockDeps.showToast).toHaveBeenCalledWith('Description updated', 'success');
        });

        it('shows error on failure', async () => {
            window.currentDetailIssue = { id: 'i1', description: 'Old' };
            await editDescription('i1');
            mockApi.updateIssue.mockRejectedValue(new Error('failed'));

            await handleUpdateDescription({ preventDefault: vi.fn() }, 'i1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Failed to update description: failed', 'error');
        });
    });

    describe('showAddRelationModal', () => {
        it('opens relation modal with search', () => {
            showAddRelationModal('i1');

            expect(mockDeps.showModal).toHaveBeenCalled();
            expect(document.getElementById('modal-title').textContent).toBe('Add Relation');
            expect(document.getElementById('relation-type')).toBeTruthy();
            expect(document.getElementById('relation-issue-search')).toBeTruthy();
        });
    });

    describe('searchIssuesToRelate', () => {
        it('searches and renders results', async () => {
            mockApi.searchIssues.mockResolvedValue([
                { id: 'i2', identifier: 'CHT-2', title: 'Other Issue' },
            ]);
            showAddRelationModal('i1');

            await searchIssuesToRelate('other', 'i1');

            const results = document.getElementById('relation-search-results');
            expect(results.innerHTML).toContain('CHT-2');
            expect(results.innerHTML).toContain('Other Issue');
        });

        it('filters out current issue from results', async () => {
            mockApi.searchIssues.mockResolvedValue([
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
            mockApi.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(mockApi.createRelation).toHaveBeenCalledWith('i1', 'i2', 'blocks');
            expect(mockDeps.closeModal).toHaveBeenCalled();
            expect(mockDeps.showToast).toHaveBeenCalledWith('Relation added', 'success');
        });

        it('reverses direction for blocked_by', async () => {
            showAddRelationModal('i1');
            document.getElementById('relation-type').value = 'blocked_by';
            selectIssueForRelation('i2', 'CHT-2', 'Other');
            mockApi.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(mockApi.createRelation).toHaveBeenCalledWith('i2', 'i1', 'blocks');
        });

        it('shows error when no issue selected', async () => {
            showAddRelationModal('i1');

            await handleAddRelation({ preventDefault: vi.fn() }, 'i1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Please select an issue', 'error');
        });
    });

    describe('deleteRelation', () => {
        it('deletes relation and refreshes', async () => {
            mockApi.getIssue.mockResolvedValue({ id: 'i1', title: 'Test', project_id: 'p1', status: 'todo', priority: 'medium' });

            await deleteRelation('i1', 'r1');

            expect(mockApi.deleteRelation).toHaveBeenCalledWith('i1', 'r1');
            expect(mockDeps.showToast).toHaveBeenCalledWith('Relation removed', 'success');
        });

        it('shows error on failure', async () => {
            mockApi.deleteRelation.mockRejectedValue(new Error('not found'));

            await deleteRelation('i1', 'r1');

            expect(mockDeps.showToast).toHaveBeenCalledWith('Failed to remove relation: not found', 'error');
        });
    });
});
