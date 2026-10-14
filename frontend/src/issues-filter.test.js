/**
 * Tests for issues-filter.js wiring (CHT-1692)
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./assignees.js', () => ({
    selectAssigneeFilter: vi.fn(),
    getPendingAssigneeFilter: vi.fn(() => null),
}));

vi.mock('./state.js', () => ({
    getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
    getCurrentProject: vi.fn(() => null),
    setCurrentProject: vi.fn(),
}));

import { selectAssigneeFilter } from './assignees.js';
import { loadFiltersFromUrl } from './issues-filter.js';

function setUrl(search) {
    Object.defineProperty(window, 'location', {
        value: { search, pathname: '/issues', href: `http://localhost/issues${search}` },
        writable: true,
        configurable: true,
    });
}

describe('loadFiltersFromUrl', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '<select id="assignee-filter"><option value="">All</option></select>';
    });

    it('applies ?assignee= through selectAssigneeFilter', () => {
        setUrl('?assignee=agent-7');
        loadFiltersFromUrl(() => {});
        expect(selectAssigneeFilter).toHaveBeenCalledTimes(1);
        expect(selectAssigneeFilter).toHaveBeenCalledWith('agent-7');
    });

    it('does not touch the assignee filter without ?assignee=', () => {
        setUrl('?status=todo');
        loadFiltersFromUrl(() => {});
        expect(selectAssigneeFilter).not.toHaveBeenCalled();
    });
});
