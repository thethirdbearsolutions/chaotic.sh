/**
 * Inbox expanded-row interaction through the real listener stack (CHT-1320).
 *
 * Unlike inbox.test.js (which calls the action handlers directly), this wires
 * the real event-delegation, the real inbox keyboard handler and the real
 * inbox module onto `document`, in app.js's order: the inbox keyboard handler
 * at module load, event delegation later (on DOMContentLoaded). Real DOM
 * events then show what a click or a key press actually does in the browser.
 */
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: {
        getInbox: vi.fn(() => Promise.resolve([])),
        getInboxUnreadCount: vi.fn(() => Promise.resolve({ unread_count: 0 })),
        markInboxRead: vi.fn(() => Promise.resolve({})),
        archiveInbox: vi.fn(() => Promise.resolve({})),
        markAllInboxRead: vi.fn(() => Promise.resolve({ marked_count: 0 })),
        updateIssue: vi.fn(() => Promise.resolve({})),
    },
}));
vi.mock('./ui.js', () => ({ showApiError: vi.fn(), isModalOpen: vi.fn(() => false) }));
vi.mock('./issue-detail-view.js', () => ({ viewIssue: vi.fn() }));
vi.mock('./documents.js', () => ({ viewDocument: vi.fn() }));
vi.mock('./gate-approvals.js', () => ({ formatRelativeTime: vi.fn(() => '2h ago') }));
vi.mock('./state.js', () => {
    let entries = [];
    let unread = 0;
    let selected = -1;
    return {
        getCurrentTeam: vi.fn(() => ({ id: 'team-1' })),
        getInboxEntries: vi.fn(() => entries),
        setInboxEntries: vi.fn(e => { entries = e; }),
        getInboxUnreadCount: vi.fn(() => unread),
        setInboxUnreadCount: vi.fn(n => { unread = n; }),
        getSelectedInboxIndex: vi.fn(() => selected),
        setSelectedInboxIndex: vi.fn(i => { selected = i; }),
    };
});

import { api } from './api.js';
import { setInboxEntries, getSelectedInboxIndex, setSelectedInboxIndex } from './state.js';
import { initEventDelegation } from './event-delegation.js';
import { createInboxNavigationHandler } from './keyboard.js';
import * as inboxModule from './inbox.js';
import {
    renderInbox, selectInboxRow, collapseInboxExpand,
    toggleInboxEntryElementExpand, archiveInboxEntryElement,
} from './inbox.js';

const ASSIGN = {
    id: 'assign-1',
    kind: 'assignment',
    title: 'ethan assigned you PRJ-9',
    body: 'Please pick this up',
    issue_id: 'issue-9',
    issue_identifier: 'PRJ-9',
    document_id: null,
    document_title: null,
    source_user_id: 'user-ethan',
    source_user_name: 'ethan',
    created_at: '2026-07-06T12:00:00Z',
    read_at: '2026-07-06T12:30:00Z',
};
const OTHER = { ...ASSIGN, id: 'assign-2', title: 'second' };

const row = () => document.querySelector('.inbox-row');
const isExpanded = () => !!document.querySelector('.inbox-row-expanded');

function key(target, k) {
    const event = new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    return event;
}

function click(target) {
    target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
    // app.js order: list keyboard handler at module load ...
    document.addEventListener('keydown', createInboxNavigationHandler({
        getCurrentView: () => 'inbox',
        getSelectedIndex: getSelectedInboxIndex,
        setSelectedIndex: setSelectedInboxIndex,
        toggleInboxExpand: toggleInboxEntryElementExpand,
        collapseInboxExpand,
        archiveInboxEntry: archiveInboxEntryElement,
        isInlineDropdownOpen: () => false,
        isModalOpen: () => false,
        isCommandPaletteOpen: () => false,
    }));
    // ... then delegation on DOMContentLoaded.
    initEventDelegation();
});

beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '<div id="inbox-list"></div><span id="inbox-badge"></span>';
    setInboxEntries([{ ...ASSIGN }, { ...OTHER }]);
    collapseInboxExpand();
    renderInbox();
    selectInboxRow(0);
});

afterEach(() => {
    window.getSelection()?.removeAllRanges();
});

describe('inbox.js exports (CHT-1320)', () => {
    it('no longer exports the dead keyboard-open path; Enter expands, Open navigates', () => {
        expect(inboxModule.openInboxEntryElement).toBeUndefined();
    });
});

describe('clicks on an expanded row (CHT-1320)', () => {
    beforeEach(() => {
        click(row().querySelector('.inbox-row-title'));
        expect(isExpanded()).toBe(true);
    });

    it('a click on the reading body does not collapse it', () => {
        click(document.querySelector('.inbox-expanded-body'));
        expect(isExpanded()).toBe(true);
    });

    it('a click anywhere in the expanded panel (source line, action bar gap) does not collapse it', () => {
        click(document.querySelector('.inbox-expanded-source'));
        click(document.querySelector('.inbox-action-bar'));
        expect(isExpanded()).toBe(true);
    });

    it('a click that ends a text selection does not toggle, even on the header', () => {
        const title = row().querySelector('.inbox-row-title');
        const range = document.createRange();
        range.selectNodeContents(title);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        expect(window.getSelection().toString()).toContain('PRJ-9');
        click(title);
        expect(isExpanded()).toBe(true);
    });

    it('a click on a link inside the row does not toggle', () => {
        const a = document.createElement('a');
        a.href = '#x';
        a.textContent = 'link';
        row().querySelector('.inbox-row-header').appendChild(a);
        click(a);
        expect(isExpanded()).toBe(true);
    });

    it('a click on an input inside the row does not toggle', () => {
        const input = document.createElement('input');
        row().querySelector('.inbox-row-header').appendChild(input);
        click(input);
        expect(isExpanded()).toBe(true);
    });

    it('the action buttons run their own action and never toggle', () => {
        click(document.querySelector('[data-action="open-inbox-full"]'));
        expect(isExpanded()).toBe(true);
    });

    it('a click on the header still collapses it', () => {
        click(row().querySelector('.inbox-row-header'));
        expect(isExpanded()).toBe(false);
    });

    it('a click on the collapsed row expands it', () => {
        click(row().querySelector('.inbox-row-header'));
        click(row().querySelector('.inbox-row-body') || row().querySelector('.inbox-row-title'));
        expect(isExpanded()).toBe(true);
    });
});

describe('keys on an expanded row (CHT-1320)', () => {
    it('Enter on the focused row expands it (one toggle, not two)', () => {
        key(row(), 'Enter');
        expect(isExpanded()).toBe(true);
    });

    it('Enter again on the focused row collapses it', () => {
        key(row(), 'Enter');
        key(document.querySelector('.inbox-row'), 'Enter');
        expect(isExpanded()).toBe(false);
    });

    it('Space on the focused row toggles it once', () => {
        key(row(), ' ');
        expect(isExpanded()).toBe(true);
    });

    it.each(['Enter', ' '])('%j on a focused Open button opens and does not collapse', async (k) => {
        key(row(), 'Enter');
        const { viewIssue } = await import('./issue-detail-view.js');
        const btn = document.querySelector('[data-action="open-inbox-full"]');
        btn.focus();
        key(btn, k);
        expect(viewIssue).toHaveBeenCalledWith('issue-9');
        expect(isExpanded()).toBe(true);
    });

    it.each(['Enter', ' '])('%j on a focused Reassign button reassigns, not collapses', (k) => {
        key(row(), 'Enter');
        const btn = document.querySelector('[data-action="reassign-inbox-entry"]');
        btn.focus();
        key(btn, k);
        expect(api.updateIssue).toHaveBeenCalledWith('issue-9', { assignee_id: 'user-ethan' });
        expect(isExpanded()).toBe(true);
    });

    it('Enter on a focused link inside the row is left to the link', () => {
        key(row(), 'Enter');
        const a = document.createElement('a');
        a.href = '#x';
        document.querySelector('.inbox-row-header').appendChild(a);
        a.focus();
        const event = key(a, 'Enter');
        expect(isExpanded()).toBe(true);
        expect(event.defaultPrevented).toBe(false);
    });

    it('Enter in an input inside the row does not collapse it', () => {
        key(row(), 'Enter');
        const input = document.createElement('input');
        document.querySelector('.inbox-row-header').appendChild(input);
        input.focus();
        key(input, 'Enter');
        expect(isExpanded()).toBe(true);
    });
});
