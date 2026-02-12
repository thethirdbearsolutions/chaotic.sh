/**
 * Real tests for filters.js
 *
 * These tests actually test the implementation by importing and calling
 * the exported functions from filters.js.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { applyClientSideFilters, filterByLabels } from './filters.js';

// Mock data for testing
const createMockIssue = (overrides = {}) => ({
  id: 'issue-1',
  identifier: 'TEST-1',
  title: 'Test Issue',
  description: 'Test description',
  status: 'backlog',
  priority: 'medium',
  issue_type: 'task',
  assignee_id: null,
  sprint_id: null,
  labels: [],
  project_id: 'project-1',
  ...overrides,
});

describe('filterByLabels', () => {
  it('should return all issues when no labels selected', () => {
    const issues = [
      createMockIssue({ id: '1', labels: [{ id: 'label-1', name: 'bug' }] }),
      createMockIssue({ id: '2', labels: [{ id: 'label-2', name: 'feature' }] }),
    ];

    const result = filterByLabels(issues, []);
    expect(result).toEqual(issues);
  });

  it('should filter issues by single label', () => {
    const issues = [
      createMockIssue({ id: '1', labels: [{ id: 'label-1', name: 'bug' }] }),
      createMockIssue({ id: '2', labels: [{ id: 'label-2', name: 'feature' }] }),
      createMockIssue({ id: '3', labels: [] }),
    ];

    const result = filterByLabels(issues, ['label-1']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter issues by multiple labels (OR logic)', () => {
    const issues = [
      createMockIssue({ id: '1', labels: [{ id: 'label-1', name: 'bug' }] }),
      createMockIssue({ id: '2', labels: [{ id: 'label-2', name: 'feature' }] }),
      createMockIssue({ id: '3', labels: [] }),
      createMockIssue({ id: '4', labels: [{ id: 'label-1', name: 'bug' }, { id: 'label-3', name: 'urgent' }] }),
    ];

    const result = filterByLabels(issues, ['label-1', 'label-2']);
    expect(result).toHaveLength(3);
    expect(result.map(i => i.id).sort()).toEqual(['1', '2', '4']);
  });

  it('should exclude issues with no labels', () => {
    const issues = [
      createMockIssue({ id: '1', labels: [{ id: 'label-1', name: 'bug' }] }),
      createMockIssue({ id: '2', labels: [] }),
      createMockIssue({ id: '3', labels: null }),
    ];

    const result = filterByLabels(issues, ['label-1']);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });
});

describe('applyClientSideFilters', () => {
  let mockCurrentUser;
  let mockGetSprints;

  beforeEach(() => {
    mockCurrentUser = { id: 'user-1', email: 'test@example.com' };
    mockGetSprints = vi.fn();
  });

  it('should return empty array if issuesList is not an array', async () => {
    const result = await applyClientSideFilters(null, {}, {});
    expect(result).toEqual([]);
  });

  it('should filter issues by status', async () => {
    const issues = [
      createMockIssue({ id: '1', status: 'backlog' }),
      createMockIssue({ id: '2', status: 'in_progress' }),
      createMockIssue({ id: '3', status: 'done' }),
    ];

    const result = await applyClientSideFilters(issues, {
      statuses: ['in_progress'],
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('2');
  });

  it('should filter issues by multiple statuses', async () => {
    const issues = [
      createMockIssue({ id: '1', status: 'backlog' }),
      createMockIssue({ id: '2', status: 'in_progress' }),
      createMockIssue({ id: '3', status: 'done' }),
    ];

    const result = await applyClientSideFilters(issues, {
      statuses: ['in_progress', 'done'],
    }, {});

    expect(result).toHaveLength(2);
    expect(result.map(i => i.id).sort()).toEqual(['2', '3']);
  });

  it('should filter issues by priority', async () => {
    const issues = [
      createMockIssue({ id: '1', priority: 'low' }),
      createMockIssue({ id: '2', priority: 'high' }),
      createMockIssue({ id: '3', priority: 'urgent' }),
    ];

    const result = await applyClientSideFilters(issues, {
      priorities: ['high', 'urgent'],
    }, {});

    expect(result).toHaveLength(2);
    expect(result.map(i => i.id).sort()).toEqual(['2', '3']);
  });

  it('should filter issues by assignee (specific user)', async () => {
    const issues = [
      createMockIssue({ id: '1', assignee_id: 'user-1' }),
      createMockIssue({ id: '2', assignee_id: 'user-2' }),
      createMockIssue({ id: '3', assignee_id: null }),
    ];

    const result = await applyClientSideFilters(issues, {
      assigneeFilter: 'user-1',
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter issues by assignee (me)', async () => {
    const issues = [
      createMockIssue({ id: '1', assignee_id: 'user-1' }),
      createMockIssue({ id: '2', assignee_id: 'user-2' }),
      createMockIssue({ id: '3', assignee_id: null }),
    ];

    const result = await applyClientSideFilters(issues, {
      assigneeFilter: 'me',
    }, {
      currentUser: mockCurrentUser,
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should throw error when filtering by "me" without currentUser', async () => {
    const issues = [createMockIssue({ id: '1', assignee_id: 'user-1' })];

    await expect(
      applyClientSideFilters(issues, { assigneeFilter: 'me' }, {})
    ).rejects.toThrow('Current user information is not available');
  });

  it('should filter issues by assignee (unassigned)', async () => {
    const issues = [
      createMockIssue({ id: '1', assignee_id: 'user-1' }),
      createMockIssue({ id: '2', assignee_id: null }),
      createMockIssue({ id: '3', assignee_id: null }),
    ];

    const result = await applyClientSideFilters(issues, {
      assigneeFilter: 'unassigned',
    }, {});

    expect(result).toHaveLength(2);
    expect(result.map(i => i.id).sort()).toEqual(['2', '3']);
  });

  it('should filter issues by issue type', async () => {
    const issues = [
      createMockIssue({ id: '1', issue_type: 'bug' }),
      createMockIssue({ id: '2', issue_type: 'feature' }),
      createMockIssue({ id: '3', issue_type: 'task' }),
    ];

    const result = await applyClientSideFilters(issues, {
      issueTypeFilter: 'bug',
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter issues by sprint (specific sprint)', async () => {
    const issues = [
      createMockIssue({ id: '1', sprint_id: 'sprint-1' }),
      createMockIssue({ id: '2', sprint_id: 'sprint-2' }),
      createMockIssue({ id: '3', sprint_id: null }),
    ];

    const result = await applyClientSideFilters(issues, {
      sprintFilter: 'sprint-1',
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter issues by sprint (no sprint)', async () => {
    const issues = [
      createMockIssue({ id: '1', sprint_id: 'sprint-1' }),
      createMockIssue({ id: '2', sprint_id: null }),
      createMockIssue({ id: '3', sprint_id: null }),
    ];

    const result = await applyClientSideFilters(issues, {
      sprintFilter: 'no_sprint',
    }, {});

    expect(result).toHaveLength(2);
    expect(result.map(i => i.id).sort()).toEqual(['2', '3']);
  });

  it('should filter issues by sprint (current sprint)', async () => {
    const issues = [
      createMockIssue({ id: '1', sprint_id: 'sprint-active' }),
      createMockIssue({ id: '2', sprint_id: 'sprint-planned' }),
      createMockIssue({ id: '3', sprint_id: null }),
    ];

    mockGetSprints.mockResolvedValue([
      { id: 'sprint-active', status: 'active' },
      { id: 'sprint-planned', status: 'planned' },
    ]);

    const result = await applyClientSideFilters(issues, {
      sprintFilter: 'current',
      projectId: 'project-1',
    }, {
      getSprints: mockGetSprints,
    });

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(mockGetSprints).toHaveBeenCalledWith('project-1');
  });

  it('should return empty array when current sprint filter is used but no active sprint exists', async () => {
    const issues = [
      createMockIssue({ id: '1', sprint_id: 'sprint-planned' }),
    ];

    mockGetSprints.mockResolvedValue([
      { id: 'sprint-planned', status: 'planned' },
    ]);

    const result = await applyClientSideFilters(issues, {
      sprintFilter: 'current',
      projectId: 'project-1',
    }, {
      getSprints: mockGetSprints,
    });

    expect(result).toEqual([]);
  });

  it('should throw error when filtering by current sprint without projectId', async () => {
    const issues = [createMockIssue({ id: '1' })];

    await expect(
      applyClientSideFilters(issues, { sprintFilter: 'current' }, {})
    ).rejects.toThrow('Project must be selected');
  });

  it('should throw error when filtering by current sprint without getSprints', async () => {
    const issues = [createMockIssue({ id: '1' })];

    await expect(
      applyClientSideFilters(issues, {
        sprintFilter: 'current',
        projectId: 'project-1',
      }, {})
    ).rejects.toThrow('getSprints function is required');
  });

  it('should throw error when getSprints fails', async () => {
    const issues = [createMockIssue({ id: '1' })];

    mockGetSprints.mockRejectedValue(new Error('API error'));

    await expect(
      applyClientSideFilters(issues, {
        sprintFilter: 'current',
        projectId: 'project-1',
      }, {
        getSprints: mockGetSprints,
      })
    ).rejects.toThrow('Failed to load sprint data: API error');
  });

  it('should filter issues by labels', async () => {
    const issues = [
      createMockIssue({ id: '1', labels: [{ id: 'label-1', name: 'bug' }] }),
      createMockIssue({ id: '2', labels: [{ id: 'label-2', name: 'feature' }] }),
      createMockIssue({ id: '3', labels: [] }),
    ];

    const result = await applyClientSideFilters(issues, {
      selectedLabels: ['label-1'],
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should combine multiple filters (AND logic)', async () => {
    const issues = [
      createMockIssue({ id: '1', status: 'in_progress', priority: 'high', issue_type: 'bug' }),
      createMockIssue({ id: '2', status: 'in_progress', priority: 'low', issue_type: 'bug' }),
      createMockIssue({ id: '3', status: 'done', priority: 'high', issue_type: 'bug' }),
      createMockIssue({ id: '4', status: 'in_progress', priority: 'high', issue_type: 'feature' }),
    ];

    const result = await applyClientSideFilters(issues, {
      statuses: ['in_progress'],
      priorities: ['high'],
      issueTypeFilter: 'bug',
    }, {});

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
  });

  it('should combine search results with filters', async () => {
    // Simulates the CHT-406 bug fix: search results should be filtered
    const searchResults = [
      createMockIssue({ id: '1', title: 'Search result 1', status: 'in_progress' }),
      createMockIssue({ id: '2', title: 'Search result 2', status: 'done' }),
      createMockIssue({ id: '3', title: 'Search result 3', status: 'in_progress' }),
    ];

    const result = await applyClientSideFilters(searchResults, {
      statuses: ['in_progress'],
    }, {});

    expect(result).toHaveLength(2);
    expect(result.map(i => i.id).sort()).toEqual(['1', '3']);
  });

  it('should handle empty issues array', async () => {
    const result = await applyClientSideFilters([], {
      statuses: ['in_progress'],
    }, {});

    expect(result).toEqual([]);
  });

  it('should handle no filters applied', async () => {
    const issues = [
      createMockIssue({ id: '1' }),
      createMockIssue({ id: '2' }),
    ];

    const result = await applyClientSideFilters(issues, {}, {});

    expect(result).toEqual(issues);
  });
});
