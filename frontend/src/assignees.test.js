/**
 * Tests for assignees.js module (CHT-1033)
 */
import { describe, it, expect, beforeEach } from 'vitest';
import {
    buildAssignees,
    getAssigneeById,
    formatAssigneeName,
    formatAssigneeOptionLabel,
    getAssigneeOptionList,
    updateAssigneeFilter,
    resetAssignees,
} from './assignees.js';

describe('assignees', () => {
    beforeEach(() => {
        resetAssignees();
    });

    const mockMembers = [
        { user_id: 'u1', user_name: 'Alice', user_email: 'alice@test.com' },
        { user_id: 'u2', user_name: 'Bob', user_email: 'bob@test.com' },
    ];

    const mockAgents = [
        { id: 'a1', name: 'Bot One', parent_user_id: 'u1', parent_user_name: 'Alice' },
        { id: 'a2', name: 'Orphan Bot', parent_user_id: 'u99', parent_user_name: null },
    ];

    describe('buildAssignees', () => {
        it('builds from members and agents', () => {
            buildAssignees(() => mockMembers, () => mockAgents);
            expect(getAssigneeById('u1')).toBeTruthy();
            expect(getAssigneeById('u1').name).toBe('Alice');
            expect(getAssigneeById('a1')).toBeTruthy();
            expect(getAssigneeById('a1').is_agent).toBe(true);
        });
    });

    describe('getAssigneeById', () => {
        it('returns null for missing id', () => {
            expect(getAssigneeById(null)).toBeNull();
            expect(getAssigneeById('nonexistent')).toBeNull();
        });

        it('finds assignee by id', () => {
            buildAssignees(() => mockMembers, () => []);
            expect(getAssigneeById('u1').name).toBe('Alice');
        });
    });

    describe('formatAssigneeName', () => {
        it('returns null for null assignee', () => {
            expect(formatAssigneeName(null)).toBeNull();
        });

        it('returns name for member', () => {
            expect(formatAssigneeName({ name: 'Alice', is_agent: false })).toBe('Alice');
        });

        it('returns name for agent', () => {
            expect(formatAssigneeName({ name: 'Bot', is_agent: true })).toBe('Bot');
        });

        it('falls back to email for member', () => {
            expect(formatAssigneeName({ email: 'a@b.com', is_agent: false })).toBe('a@b.com');
        });
    });

    describe('formatAssigneeOptionLabel', () => {
        it('returns plain name for member', () => {
            expect(formatAssigneeOptionLabel({ name: 'Alice', is_agent: false })).toBe('Alice');
        });

        it('returns name with parent for agent', () => {
            const label = formatAssigneeOptionLabel({ name: 'Bot', is_agent: true, parent_user_name: 'Alice' });
            expect(label).toContain('Bot');
            expect(label).toContain('Alice');
        });

        it('indents agent when requested', () => {
            const label = formatAssigneeOptionLabel({ name: 'Bot', is_agent: true, parent_user_name: 'Alice' }, true);
            expect(label).toContain('&nbsp;&nbsp;-');
        });
    });

    describe('getAssigneeOptionList', () => {
        it('groups agents under their parent members', () => {
            buildAssignees(() => mockMembers, () => mockAgents);
            const options = getAssigneeOptionList();

            // Alice, then Bot One (child), then Bob, then Orphan Bot
            expect(options.length).toBe(4);
            expect(options[0].assignee.name).toBe('Alice');
            expect(options[0].indent).toBe(false);
            expect(options[1].assignee.name).toBe('Bot One');
            expect(options[1].indent).toBe(true);
            expect(options[2].assignee.name).toBe('Bob');
            expect(options[2].indent).toBe(false);
            expect(options[3].assignee.name).toBe('Orphan Bot');
            expect(options[3].indent).toBe(false);
        });
    });

    describe('updateAssigneeFilter', () => {
        it('does nothing if no filter element', () => {
            updateAssigneeFilter();
            // Should not throw
        });

        it('populates filter select element', () => {
            document.body.innerHTML = '<select id="assignee-filter"></select>';
            buildAssignees(() => mockMembers, () => []);
            updateAssigneeFilter();
            const select = document.getElementById('assignee-filter');
            expect(select.options.length).toBeGreaterThan(3); // All, me, unassigned + members
        });
    });
});
