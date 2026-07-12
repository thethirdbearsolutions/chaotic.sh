/**
 * Tests for inbox.js module (CHT-1250)
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getInbox: vi.fn(() => Promise.resolve([])),
        getInboxUnreadCount: vi.fn(() => Promise.resolve({ unread_count: 0 })),
        markInboxRead: vi.fn(() => Promise.resolve({})),
        archiveInbox: vi.fn(() => Promise.resolve({})),
        markAllInboxRead: vi.fn(() => Promise.resolve({ marked_count: 0 })),
    },
}));

vi.mock('./ui.js', () => ({
    showApiError: vi.fn(),
    isModalOpen: vi.fn(() => false),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn(s => s || ''),
    escapeAttr: vi.fn(s => s || ''),
}));

vi.mock('./event-delegation.js', () => ({
    registerActions: vi.fn(),
}));

vi.mock('./issue-detail-view.js', () => ({
    viewIssue: vi.fn(),
}));

vi.mock('./documents.js', () => ({
    viewDocument: vi.fn(),
}));

vi.mock('./gate-approvals.js', () => ({
    formatRelativeTime: vi.fn(() => '2h ago'),
}));

vi.mock('./state.js', () => ({
    getCurrentTeam: vi.fn(),
    getInboxEntries: vi.fn(),
    setInboxEntries: vi.fn(),
    getInboxUnreadCount: vi.fn(),
    setInboxUnreadCount: vi.fn(),
    getSelectedInboxIndex: vi.fn(),
    setSelectedInboxIndex: vi.fn(),
}));

import { api } from './api.js';
import { showApiError, isModalOpen } from './ui.js';
import { viewIssue } from './issue-detail-view.js';
import { viewDocument } from './documents.js';
import {
    getCurrentTeam, getInboxEntries, setInboxEntries,
    getInboxUnreadCount, setInboxUnreadCount, setSelectedInboxIndex,
} from './state.js';
import {
    loadInbox, renderInbox, renderInboxBadge, refreshInboxUnreadCount,
    markAllInboxRead, toggleInboxUnreadFilter, openInboxEntryElement,
    archiveInboxEntry, focusFirstInboxRow,
} from './inbox.js';

const ENTRY = {
    id: 'entry-1',
    kind: 'gate_pending',
    title: 'Gate pending: deploy_check on PRJ-1',
    body: 'Did you deploy?',
    issue_id: 'issue-1',
    issue_identifier: 'PRJ-1',
    document_id: null,
    document_title: null,
    created_at: '2026-07-06T12:00:00Z',
    read_at: null,
};

beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
        <div id="inbox-list"></div>
        <span id="inbox-unread-badge" class="hidden">0</span>
    `;
    getCurrentTeam.mockReturnValue({ id: 'team-1' });
    getInboxEntries.mockReturnValue([]);
    getInboxUnreadCount.mockReturnValue(0);
});

describe('loadInbox', () => {
    it('returns early if no currentTeam', async () => {
        getCurrentTeam.mockReturnValue(null);
        await loadInbox();
        expect(api.getInbox).not.toHaveBeenCalled();
    });

    it('fetches entries and stores them', async () => {
        api.getInbox.mockResolvedValue([ENTRY]);
        await loadInbox();
        expect(api.getInbox).toHaveBeenCalledWith('team-1', expect.objectContaining({ unread: false }));
        expect(setInboxEntries).toHaveBeenCalledWith([ENTRY]);
    });

    it('shows a standardized error state with retry on failure', async () => {
        api.getInbox.mockRejectedValue(new Error('Network error'));
        await loadInbox();
        const container = document.getElementById('inbox-list');
        expect(container.innerHTML).toContain('Failed to load inbox');
        expect(container.innerHTML).toContain('data-action="retry-load-inbox"');
        expect(container.innerHTML).not.toContain('Network error');
        expect(showApiError).toHaveBeenCalledWith('load inbox', expect.any(Error));
    });

    it('refreshes the unread badge after loading', async () => {
        api.getInbox.mockResolvedValue([]);
        api.getInboxUnreadCount.mockResolvedValue({ unread_count: 4 });
        await loadInbox();
        expect(setInboxUnreadCount).toHaveBeenCalledWith(4);
    });

    it('drops a stale response from a superseded request', async () => {
        let resolveFirst;
        api.getInbox.mockImplementationOnce(() => new Promise(r => { resolveFirst = r; }));
        api.getInbox.mockImplementationOnce(() => Promise.resolve([ENTRY]));

        const first = loadInbox();
        const second = loadInbox();
        await second;
        resolveFirst([]);
        await first;

        // Only the second (later) call's data should have been committed.
        const setCalls = setInboxEntries.mock.calls.map(c => c[0]);
        expect(setCalls[setCalls.length - 1]).toEqual([ENTRY]);
    });
});

describe('renderInbox', () => {
    it('renders empty state when there are no entries', () => {
        getInboxEntries.mockReturnValue([]);
        renderInbox();
        expect(document.getElementById('inbox-list').innerHTML).toContain('Inbox zero');
    });

    it('renders a row per entry with kind badge and title', () => {
        getInboxEntries.mockReturnValue([ENTRY]);
        renderInbox();
        const html = document.getElementById('inbox-list').innerHTML;
        expect(html).toContain('PRJ-1');
        expect(html).toContain('Gate pending: deploy_check on PRJ-1');
        expect(html).toContain('badge-inbox-gate_pending');
        expect(html).toContain('inbox-row-unread');
    });

    it('does not mark read entries as unread', () => {
        getInboxEntries.mockReturnValue([{ ...ENTRY, read_at: '2026-07-06T13:00:00Z' }]);
        renderInbox();
        expect(document.getElementById('inbox-list').innerHTML).not.toContain('inbox-row-unread');
    });
});

describe('renderInboxBadge', () => {
    it('hides the badge when unread count is 0', () => {
        getInboxUnreadCount.mockReturnValue(0);
        renderInboxBadge();
        const badge = document.getElementById('inbox-unread-badge');
        expect(badge.classList.contains('hidden')).toBe(true);
    });

    it('shows the count when unread > 0', () => {
        getInboxUnreadCount.mockReturnValue(5);
        renderInboxBadge();
        const badge = document.getElementById('inbox-unread-badge');
        expect(badge.classList.contains('hidden')).toBe(false);
        expect(badge.textContent).toBe('5');
    });

    it('caps display at 99+', () => {
        getInboxUnreadCount.mockReturnValue(150);
        renderInboxBadge();
        expect(document.getElementById('inbox-unread-badge').textContent).toBe('99+');
    });
});

describe('refreshInboxUnreadCount', () => {
    it('does nothing without a current team', async () => {
        getCurrentTeam.mockReturnValue(null);
        await refreshInboxUnreadCount();
        expect(api.getInboxUnreadCount).not.toHaveBeenCalled();
    });

    it('fetches and stores the count', async () => {
        api.getInboxUnreadCount.mockResolvedValue({ unread_count: 7 });
        await refreshInboxUnreadCount();
        expect(setInboxUnreadCount).toHaveBeenCalledWith(7);
    });
});

describe('markAllInboxRead', () => {
    it('calls the API and clears local unread state', async () => {
        getInboxEntries.mockReturnValue([ENTRY]);
        api.markAllInboxRead.mockResolvedValue({ marked_count: 1 });
        await markAllInboxRead();
        expect(api.markAllInboxRead).toHaveBeenCalledWith('team-1');
        expect(setInboxUnreadCount).toHaveBeenCalledWith(0);
    });

    it('shows an API error toast on failure', async () => {
        api.markAllInboxRead.mockRejectedValue(new Error('boom'));
        await markAllInboxRead();
        expect(showApiError).toHaveBeenCalledWith('mark all inbox entries read', expect.any(Error));
    });
});

describe('toggleInboxUnreadFilter', () => {
    it('reloads the inbox with the unread filter toggled on', async () => {
        api.getInbox.mockResolvedValue([]);
        document.body.innerHTML += '<button id="inbox-unread-toggle"></button>';
        await toggleInboxUnreadFilter();
        expect(api.getInbox).toHaveBeenCalledWith('team-1', expect.objectContaining({ unread: true }));
        expect(document.getElementById('inbox-unread-toggle').classList.contains('active')).toBe(true);
    });
});

describe('openInboxEntryElement', () => {
    it('marks the entry read and opens the linked issue', () => {
        getInboxEntries.mockReturnValue([{ ...ENTRY }]);
        const row = document.createElement('div');
        row.dataset.entryId = 'entry-1';
        row.dataset.issueId = 'issue-1';
        openInboxEntryElement(row);
        expect(viewIssue).toHaveBeenCalledWith('issue-1');
        expect(api.markInboxRead).toHaveBeenCalledWith('entry-1');
    });

    it('opens a linked document when there is no issue', () => {
        getInboxEntries.mockReturnValue([{ ...ENTRY, id: 'entry-2', issue_id: null }]);
        const row = document.createElement('div');
        row.dataset.entryId = 'entry-2';
        row.dataset.documentId = 'doc-1';
        openInboxEntryElement(row);
        expect(viewDocument).toHaveBeenCalledWith('doc-1');
    });

    it('is a no-op for a null row', () => {
        expect(() => openInboxEntryElement(null)).not.toThrow();
    });

    it('does not re-mark an already-read entry', () => {
        getInboxEntries.mockReturnValue([{ ...ENTRY, read_at: '2026-07-06T13:00:00Z' }]);
        const row = document.createElement('div');
        row.dataset.entryId = 'entry-1';
        row.dataset.issueId = 'issue-1';
        openInboxEntryElement(row);
        expect(api.markInboxRead).not.toHaveBeenCalled();
    });
});

describe('archiveInboxEntry (CHT-1250 UX: clear from inbox in place)', () => {
    const A = { ...ENTRY, id: 'a', read_at: null };
    const B = { ...ENTRY, id: 'b', read_at: null };
    const C = { ...ENTRY, id: 'c', read_at: '2026-07-06T13:00:00Z' };

    it('removes an unread entry from the list and archives it server-side', async () => {
        getInboxEntries.mockReturnValue([A, B, C]);
        getInboxUnreadCount.mockReturnValue(2);
        await archiveInboxEntry('a');
        expect(setInboxEntries.mock.calls.at(-1)[0].map(e => e.id)).toEqual(['b', 'c']);
        expect(api.archiveInbox).toHaveBeenCalledWith('a');
        expect(setInboxUnreadCount).toHaveBeenCalledWith(1);
    });

    it('archives an already-read entry (persist) but does not touch the unread count', async () => {
        getInboxEntries.mockReturnValue([A, B, C]);
        getInboxUnreadCount.mockReturnValue(2);
        await archiveInboxEntry('c');
        expect(api.archiveInbox).toHaveBeenCalledWith('c'); // archive is its own action
        expect(setInboxEntries.mock.calls.at(-1)[0].map(e => e.id)).toEqual(['a', 'b']);
        expect(setInboxUnreadCount).not.toHaveBeenCalled();
    });

    it('no-ops for an unknown entry id', async () => {
        getInboxEntries.mockReturnValue([A]);
        await archiveInboxEntry('nope');
        expect(setInboxEntries).not.toHaveBeenCalled();
        expect(api.archiveInbox).not.toHaveBeenCalled();
    });

    it('still removes the row optimistically and swallows a failed archive POST', async () => {
        getInboxEntries.mockReturnValue([A, B]);
        getInboxUnreadCount.mockReturnValue(2);
        api.archiveInbox.mockRejectedValueOnce(new Error('network'));
        // Must not throw; the row is already gone locally (self-heals on refetch).
        await expect(archiveInboxEntry('a')).resolves.toBeUndefined();
        expect(setInboxEntries.mock.calls.at(-1)[0].map(e => e.id)).toEqual(['b']);
        expect(api.archiveInbox).toHaveBeenCalledWith('a');
    });
});

describe('loadInbox focus gating (PR #252 review finding 1)', () => {
    it('focuses the first row on an intentional entry (focusFirst) with no modal', async () => {
        api.getInbox.mockResolvedValue([ENTRY]);
        getInboxEntries.mockReturnValue([ENTRY]); // what renderInbox reads
        isModalOpen.mockReturnValue(false);
        await loadInbox({ focusFirst: true });
        expect(document.activeElement).toBe(document.querySelector('#inbox-list .inbox-row'));
    });

    it('does NOT focus on a background load (focusFirst omitted)', async () => {
        api.getInbox.mockResolvedValue([ENTRY]);
        getInboxEntries.mockReturnValue([ENTRY]);
        await loadInbox(); // ws/reconnect path
        expect(document.activeElement).not.toBe(document.querySelector('#inbox-list .inbox-row'));
    });

    it('does NOT steal focus while a modal is open, even on focusFirst', async () => {
        api.getInbox.mockResolvedValue([ENTRY]);
        getInboxEntries.mockReturnValue([ENTRY]);
        isModalOpen.mockReturnValue(true);
        await loadInbox({ focusFirst: true });
        expect(document.activeElement).not.toBe(document.querySelector('#inbox-list .inbox-row'));
    });
});

describe('focusFirstInboxRow (CHT-1250 UX: keyboard nav engages immediately)', () => {
    it('selects and focuses the first row', () => {
        getInboxEntries.mockReturnValue([ENTRY]);
        renderInbox();
        focusFirstInboxRow();
        expect(setSelectedInboxIndex).toHaveBeenCalledWith(0);
        const row = document.querySelector('#inbox-list .inbox-row');
        expect(row.classList.contains('keyboard-selected')).toBe(true);
        expect(document.activeElement).toBe(row);
    });

    it('sets index -1 when the list is empty', () => {
        getInboxEntries.mockReturnValue([]);
        renderInbox();
        focusFirstInboxRow();
        expect(setSelectedInboxIndex).toHaveBeenCalledWith(-1);
    });
});

describe('renderInboxRow archive button (CHT-1250 UX)', () => {
    it('renders a per-row archive button wired to archive-inbox-entry', () => {
        getInboxEntries.mockReturnValue([ENTRY]);
        renderInbox();
        const btn = document.querySelector('.inbox-row-archive');
        expect(btn).not.toBeNull();
        expect(btn.getAttribute('data-action')).toBe('archive-inbox-entry');
        expect(btn.getAttribute('data-entry-id')).toBe('entry-1');
    });
});
