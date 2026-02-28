/**
 * Tests for sprints.js module
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getCurrentSprint: vi.fn(),
        getSprints: vi.fn(),
        getSprint: vi.fn(),
        getIssues: vi.fn(),
        getSprintTransactions: vi.fn(),
        closeSprint: vi.fn(),
        updateSprint: vi.fn(),
        updateProject: vi.fn(),
        getLimboStatus: vi.fn(),
        getRituals: vi.fn(),
        getDocuments: vi.fn(),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    showModal: vi.fn(),
    closeModal: vi.fn(),
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => []),
    getEstimateScaleHint: vi.fn(() => ''),
}));

vi.mock('./url-helpers.js', () => ({
    getProjectFromUrl: vi.fn(() => null),
    updateUrlWithProject: vi.fn(),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

const mockNavigateTo = vi.fn();
vi.mock('./router.js', () => ({
    navigateTo: (...args) => mockNavigateTo(...args),
}));

vi.mock('./gate-approvals.js', () => ({
    renderMarkdown: vi.fn(s => s || ''),
}));

vi.mock('./rituals-view.js', () => ({
    approveRitual: vi.fn(),
    completeGateRitual: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

vi.mock('./documents.js', () => ({
    viewDocument: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    formatTimeAgo: vi.fn(s => s || ''),
    escapeHtml: vi.fn(s => s || ''),
    escapeAttr: vi.fn(s => s || ''),
}));

import { setCurrentTeam, setState } from './state.js';
import { api } from './api.js';
import { showModal, closeModal, showToast, showApiError } from './ui.js';
import {
    getSprints,
    setSprints,
    getSprintCache,
    getLimboStatus,
    loadSprints,
    renderSprints,
    viewSprint,
    viewSprintByPath,
    showEditBudgetModal,
    handleUpdateBudget,
    completeSprint,
    loadLimboStatus,
    showLimboDetailsModal,
    ensureSprintCacheForIssues,
    invalidateSprintCache,
    updateSprintCacheForProject,
} from './sprints.js';

beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
        <div id="modal-title"></div>
        <div id="modal-content"></div>
        <select id="sprint-project-filter">
            <option value="">Select</option>
            <option value="p1">Project 1</option>
        </select>
        <div id="sprints-list"></div>
        <div class="main-content"></div>
    `;
    window.navigateTo = vi.fn();
    window.viewIssue = vi.fn();
    window.viewDocument = vi.fn();
    window.renderMarkdown = vi.fn(s => s);
    setCurrentTeam({ id: 'team-1', name: 'Test Team' });
    // Reset module state
    setSprints([]);
    invalidateSprintCache();
});

describe('state getters/setters', () => {
    it('getSprints returns current sprints', () => {
        expect(getSprints()).toEqual([]);
        setSprints([{ id: 's1', name: 'Sprint 1' }]);
        expect(getSprints()).toEqual([{ id: 's1', name: 'Sprint 1' }]);
    });

    it('getSprintCache returns empty after invalidation', () => {
        invalidateSprintCache();
        expect(getSprintCache()).toEqual({});
    });

    it('getLimboStatus returns null initially', () => {
        expect(getLimboStatus()).toBeNull();
    });
});

describe('sprint cache', () => {
    it('updateSprintCacheForProject populates cache', () => {
        updateSprintCacheForProject('p1', [
            { id: 's1', name: 'Sprint 1' },
            { id: 's2', name: 'Sprint 2' },
        ]);
        const cache = getSprintCache();
        expect(cache['s1'].name).toBe('Sprint 1');
        expect(cache['s2'].name).toBe('Sprint 2');
    });

    it('ensureSprintCacheForIssues loads sprints for uncached projects', async () => {
        api.getSprints.mockResolvedValue([
            { id: 's1', name: 'Sprint 1' },
        ]);

        await ensureSprintCacheForIssues(['p1']);

        expect(api.getSprints).toHaveBeenCalledWith('p1');
        expect(getSprintCache()['s1'].name).toBe('Sprint 1');
    });

    it('ensureSprintCacheForIssues skips already loaded projects', async () => {
        updateSprintCacheForProject('p1', [{ id: 's1', name: 'Sprint 1' }]);

        await ensureSprintCacheForIssues(['p1']);

        expect(api.getSprints).not.toHaveBeenCalled();
    });

    it('invalidateSprintCache clears all cached data', () => {
        updateSprintCacheForProject('p1', [{ id: 's1' }]);
        invalidateSprintCache();
        expect(getSprintCache()).toEqual({});
    });
});

describe('loadSprints', () => {
    it('loads sprints from API and renders', async () => {
        api.getCurrentSprint.mockResolvedValue({ id: 's1' });
        api.getSprints.mockResolvedValue([
            { id: 's1', name: 'Sprint 1', status: 'active' },
        ]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        setState('currentProject', 'p1');
        await loadSprints();

        expect(api.getCurrentSprint).toHaveBeenCalledWith('p1');
        expect(api.getSprints).toHaveBeenCalledWith('p1');
        expect(getSprints()).toHaveLength(1);
    });

    it('does nothing without project ID', async () => {
        setState('currentProject', null);
        await loadSprints();
        expect(api.getSprints).not.toHaveBeenCalled();
    });

    it('shows error toast on failure', async () => {
        api.getCurrentSprint.mockRejectedValue(new Error('network'));

        setState('currentProject', 'p1');
        await loadSprints();

        expect(showApiError).toHaveBeenCalledWith('load sprints', expect.objectContaining({ message: 'network' }));
    });
});

describe('renderSprints', () => {
    it('renders active sprint with NOW label', () => {
        setSprints([
            { id: 's1', name: 'Current Sprint', status: 'active', budget: 20, points_spent: 10, project_id: 'p1' },
        ]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('NOW');
        expect(html).toContain('Current Sprint');
        expect(html).toContain('10 / 20 points');
    });

    it('renders planned sprint with NEXT label', () => {
        setSprints([
            { id: 's2', name: 'Next Sprint', status: 'planned', budget: 15, project_id: 'p1' },
        ]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('NEXT');
        expect(html).toContain('Next Sprint');
    });

    it('renders completed sprints in collapsed section', () => {
        setSprints([
            { id: 's3', name: 'Old Sprint', status: 'completed', points_spent: 18, budget: 20 },
        ]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('Completed Sprints (1)');
        expect(html).toContain('Old Sprint');
    });

    it('shows limbo badge when sprint is in limbo', () => {
        setSprints([
            { id: 's1', name: 'Limbo Sprint', status: 'active', limbo: true, budget: 20, points_spent: 5, project_id: 'p1' },
        ]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('IN LIMBO');
        expect(html).toContain('sprint-limbo');
    });

    it('shows arrears badge when budget exceeded', () => {
        setSprints([
            { id: 's1', name: 'Over Budget', status: 'active', budget: 10, points_spent: 15, project_id: 'p1' },
        ]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('IN ARREARS');
        expect(html).toContain('sprint-arrears');
    });

    it('shows empty state when no sprints', () => {
        setSprints([]);
        renderSprints();

        const html = document.getElementById('sprints-list').innerHTML;
        expect(html).toContain('No sprints yet');
    });
});


describe('viewSprint', () => {
    it('loads sprint details and renders detail view', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([
            { id: 'i1', identifier: 'CHT-1', title: 'Issue 1', status: 'todo', estimate: 3 },
        ]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([]);

        await viewSprint('s1');

        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView).toBeTruthy();
        expect(detailView.innerHTML).toContain('Sprint 1');
        expect(detailView.innerHTML).toContain('CHT-1');
    });

    it('shows error on sprint not found', async () => {
        api.getSprint.mockResolvedValue(null);

        await viewSprint('bad-id');

        expect(showToast).toHaveBeenCalledWith('Sprint not found', 'error');
        expect(mockNavigateTo).toHaveBeenCalledWith('sprints');
    });

    it('handles API error gracefully', async () => {
        api.getSprint.mockRejectedValue(new Error('fail'));

        await viewSprint('s1');

        expect(showToast).toHaveBeenCalledWith('Failed to load sprint', 'error');
    });

    it('renders documents section when documents exist', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([
            { id: 'doc-1', title: 'Sprint Report', icon: '📝', created_at: '2026-01-01' },
            { id: 'doc-2', title: 'Retrospective', icon: '📄', created_at: '2026-01-02' },
        ]);

        await viewSprint('s1');

        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView.innerHTML).toContain('Documents (2)');
        expect(detailView.innerHTML).toContain('Sprint Report');
        expect(detailView.innerHTML).toContain('Retrospective');
    });

    it('hides documents section when no documents', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([]);

        await viewSprint('s1');

        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView.innerHTML).not.toContain('Documents (');
    });

    it('fetches documents with team and project context', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([]);

        await viewSprint('s1');

        expect(api.getDocuments).toHaveBeenCalledWith('team-1', 'p1', null, 's1');
    });

    it('handles document fetch failure gracefully', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockRejectedValue(new Error('forbidden'));

        await viewSprint('s1');

        // Should still render without documents
        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView).toBeTruthy();
        expect(detailView.innerHTML).toContain('Sprint 1');
        expect(detailView.innerHTML).not.toContain('Documents (');
    });

    it('renders document icon from document data', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([
            { id: 'doc-1', title: 'My Doc', icon: '🎯', created_at: '2026-01-01' },
        ]);

        await viewSprint('s1');

        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView.innerHTML).toContain('🎯');
    });

    it('uses default icon when document has no icon', async () => {
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([
            { id: 'doc-1', title: 'No Icon Doc', created_at: '2026-01-01' },
        ]);

        await viewSprint('s1');

        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView.innerHTML).toContain('📄');
    });

    it('skips document fetch when currentTeam is null', async () => {
        setCurrentTeam(null);
        api.getSprint.mockResolvedValue({
            id: 's1', name: 'Sprint 1', status: 'active',
            budget: 20, points_spent: 5, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);

        await viewSprint('s1');

        expect(api.getDocuments).not.toHaveBeenCalled();
        const detailView = document.getElementById('sprint-detail-view');
        expect(detailView).toBeTruthy();
    });
});

describe('viewSprintByPath', () => {
    it('rejects invalid UUID format', async () => {
        await viewSprintByPath('not-a-uuid');

        expect(showToast).toHaveBeenCalledWith('Invalid sprint ID', 'error');
        expect(mockNavigateTo).toHaveBeenCalledWith('sprints', false);
    });

    it('accepts valid UUID', async () => {
        api.getSprint.mockResolvedValue({
            id: '12345678-1234-1234-1234-123456789abc', name: 'Sprint',
            status: 'active', budget: 20, points_spent: 0, project_id: 'p1',
        });
        api.getIssues.mockResolvedValue([]);
        api.getSprintTransactions.mockResolvedValue([]);
        api.getDocuments.mockResolvedValue([]);

        await viewSprintByPath('12345678-1234-1234-1234-123456789abc');

        expect(api.getSprint).toHaveBeenCalledWith('12345678-1234-1234-1234-123456789abc');
    });
});

describe('showEditBudgetModal', () => {
    it('shows budget edit form', () => {
        showEditBudgetModal('s1', 'Sprint 1', 20, 'p1');

        expect(document.getElementById('modal-title').textContent).toBe('Edit Sprint: Sprint 1');
        expect(document.getElementById('sprint-budget')).toBeTruthy();
        expect(document.getElementById('sprint-budget').value).toBe('20');
        expect(showModal).toHaveBeenCalled();
    });

    it('handles null budget', () => {
        showEditBudgetModal('s1', 'Sprint 1', null, 'p1');

        expect(document.getElementById('sprint-budget').value).toBe('');
    });
});

describe('handleUpdateBudget', () => {
    beforeEach(() => {
        showEditBudgetModal('s1', 'Sprint 1', 20, 'p1');
    });

    it('updates budget for this sprint only', async () => {
        api.updateSprint.mockResolvedValue({});
        api.getCurrentSprint.mockResolvedValue({});
        api.getSprints.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        document.getElementById('sprint-budget').value = '25';
        setState('currentProject', 'p1');

        const event = { preventDefault: vi.fn() };
        await handleUpdateBudget(event, 's1', 'p1');

        expect(api.updateSprint).toHaveBeenCalledWith('s1', { budget: 25, name: 'Sprint 1' });
        expect(closeModal).toHaveBeenCalled();
        expect(showToast).toHaveBeenCalledWith('Budget updated!', 'success');
    });

    it('passes null when budget is empty', async () => {
        api.updateSprint.mockResolvedValue({});
        api.getCurrentSprint.mockResolvedValue({});
        api.getSprints.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        document.getElementById('sprint-budget').value = '';
        setState('currentProject', 'p1');

        const event = { preventDefault: vi.fn() };
        await handleUpdateBudget(event, 's1', 'p1');

        expect(api.updateSprint).toHaveBeenCalledWith('s1', { budget: null, name: 'Sprint 1' });
    });

    it('shows error toast on failure', async () => {
        api.updateSprint.mockRejectedValue(new Error('forbidden'));

        document.getElementById('sprint-budget').value = '10';

        const event = { preventDefault: vi.fn() };
        await handleUpdateBudget(event, 's1', 'p1');

        expect(showApiError).toHaveBeenCalledWith('update budget', expect.objectContaining({ message: 'forbidden' }));
    });
});

describe('completeSprint', () => {
    beforeEach(() => {
        setState('currentProject', 'p1');
    });

    it('closes sprint and reloads', async () => {
        api.closeSprint.mockResolvedValue({ limbo: false });
        api.getCurrentSprint.mockResolvedValue({});
        api.getSprints.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: false });

        await completeSprint('s1');

        expect(api.closeSprint).toHaveBeenCalledWith('s1');
        expect(showToast).toHaveBeenCalledWith('Sprint completed!', 'success');
    });

    it('shows limbo modal when sprint enters limbo', async () => {
        api.closeSprint.mockResolvedValue({ limbo: true, name: 'Sprint 1' });
        api.getCurrentSprint.mockResolvedValue({});
        api.getSprints.mockResolvedValue([]);
        api.getLimboStatus.mockResolvedValue({ in_limbo: true, pending_rituals: [] });

        await completeSprint('s1');

        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Sprint In Limbo');
    });

    it('shows error toast on failure', async () => {
        api.closeSprint.mockRejectedValue(new Error('cannot close'));

        await completeSprint('s1');

        expect(showApiError).toHaveBeenCalledWith('complete sprint', expect.objectContaining({ message: 'cannot close' }));
    });
});

describe('loadLimboStatus', () => {
    it('loads limbo status and renders banner', async () => {
        setState('currentProject', 'p1');
        api.getLimboStatus.mockResolvedValue({
            in_limbo: true,
            pending_rituals: [{ id: 'r1', name: 'test' }],
        });

        await loadLimboStatus();

        expect(api.getLimboStatus).toHaveBeenCalledWith('p1');
        expect(getLimboStatus()).toBeTruthy();
        expect(getLimboStatus().in_limbo).toBe(true);
    });

    it('does nothing without project filter', async () => {
        setState('currentProject', null);

        await loadLimboStatus();

        expect(api.getLimboStatus).not.toHaveBeenCalled();
    });
});

describe('showLimboDetailsModal', () => {
    it('does nothing when no limbo status', async () => {
        // Reset limbo state by loading null status
        setState('currentProject', 'p1');
        api.getLimboStatus.mockResolvedValue(null);
        await loadLimboStatus();
        vi.clearAllMocks();

        showLimboDetailsModal();
        expect(showModal).not.toHaveBeenCalled();
    });

    it('shows modal when limbo status exists', async () => {
        setState('currentProject', 'p1');
        api.getLimboStatus.mockResolvedValue({
            in_limbo: true,
            pending_rituals: [
                { id: 'r1', name: 'run-tests', prompt: 'Run tests', approval_mode: 'auto' },
            ],
            completed_rituals: [],
        });

        await loadLimboStatus();
        showLimboDetailsModal();

        expect(showModal).toHaveBeenCalled();
        expect(document.getElementById('modal-title').textContent).toBe('Limbo Status');
        expect(document.getElementById('modal-content').innerHTML).toContain('run-tests');
    });
});
