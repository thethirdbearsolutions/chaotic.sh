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

        it('indents a session identity a level deeper', () => {
            const label = formatAssigneeOptionLabel({ name: 'S', is_agent: true, parent_user_name: 'Alice' }, 2);
            expect(label).toBe('&nbsp;&nbsp;&nbsp;&nbsp;- S (Alice)');
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

        // CHT-1501: session identities sit under their registrar, idle
        // ones are hidden from pickers but still resolve for display.
        const sessionAgents = [
            { id: 'r1', name: 'Registrar', parent_user_id: 'u1', kind: 'service' },
            { id: 's2', name: 'Session B', parent_user_id: 'u1', kind: 'session', registered_by_id: 'r1' },
            { id: 's1', name: 'Session A', parent_user_id: 'u1', kind: 'session', registered_by_id: 'r1' },
            { id: 's3', name: 'Idle Session', parent_user_id: 'u1', kind: 'session', registered_by_id: 'r1', idle: true },
            { id: 's4', name: 'Stray Session', parent_user_id: 'u1', kind: 'session', registered_by_id: 'gone' },
        ];
        const names = options => options.map(o => `${o.assignee.name}:${o.indent}`);

        it('nests session identities under their registrar and hides idle ones', () => {
            buildAssignees(() => mockMembers.slice(0, 1), () => sessionAgents);
            expect(names(getAssigneeOptionList())).toEqual([
                'Alice:false', 'Registrar:true', 'Session A:2', 'Session B:2', 'Stray Session:true',
            ]);
            expect(getAssigneeById('s3').name).toBe('Idle Session');
        });

        it('shows an idle identity when asked, or when it is the selection', () => {
            buildAssignees(() => mockMembers.slice(0, 1), () => sessionAgents);
            expect(names(getAssigneeOptionList({ includeIdle: true }))).toContain('Idle Session:2');
            expect(names(getAssigneeOptionList({ keepId: 's3' }))).toContain('Idle Session:2');
        });

        it('nests under a registrar that has no member holder', () => {
            buildAssignees(() => [], () => [
                { id: 'r1', name: 'Registrar', parent_user_id: 'u9' },
                { id: 's1', name: 'Session', parent_user_id: 'u9', kind: 'session', registered_by_id: 'r1' },
            ]);
            expect(names(getAssigneeOptionList())).toEqual(['Registrar:false', 'Session:2']);
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
