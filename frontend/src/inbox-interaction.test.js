/**
 * Inbox expanded-row interaction through the real listener stack (CHT-1320).
 *
 * Unlike inbox.test.js (which calls the action handlers directly), this wires
 * the real event-delegation, the real inbox keyboard handler and the real
 * inbox module onto `document`, in app.js's order: the inbox keyboard handler
 * at module load, event delegation later (on DOMContentLoaded). Real DOM
 * events then show what a click or a key press actually does in the browser.
 */
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach, onTestFinished } from 'vitest';

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
vi.mock('./ui.js', () => ({ showApiError: vi.fn(), isModalOpen: vi.fn(() => false), showToast: vi.fn() }));
vi.mock('./issue-detail-view.js', () => ({ viewIssue: vi.fn(), noteSkippedDetailRefresh: vi.fn() }));
vi.mock('./documents.js', () => ({
    viewDocument: vi.fn(),
    refreshDocumentsListIfActive: vi.fn(),
    refreshDocumentDetailIfViewing: vi.fn(),
    handleRemoteDocumentDeleted: vi.fn(),
}));
vi.mock('./gate-approvals.js', () => ({ formatRelativeTime: vi.fn(() => '2h ago'), loadGateApprovals: vi.fn() }));
// ws-handlers.js's other views: never reached by inbox events.
vi.mock('./dashboard.js', () => ({
    getMyIssues: vi.fn(() => []), setMyIssues: vi.fn(), renderMyIssues: vi.fn(),
    loadMyIssues: vi.fn(), loadDashboardActivity: vi.fn(), loadSprintStatus: vi.fn(),
}));
vi.mock('./issue-list.js', () => ({ renderIssues: vi.fn() }));
vi.mock('./issues-view.js', () => ({ loadIssues: vi.fn() }));
vi.mock('./board.js', () => ({ loadBoard: vi.fn(), scheduleBoardRefresh: vi.fn() }));
vi.mock('./sprints.js', () => ({
    loadSprints: vi.fn(), viewSprint: vi.fn(), getCurrentSprintDetail: vi.fn(), clearCachedCurrentSprintIds: vi.fn(),
}));
vi.mock('./projects.js', () => ({ loadProjects: vi.fn(), renderProjects: vi.fn() }));
vi.mock('./epics.js', () => ({ loadEpics: vi.fn() }));
vi.mock('./router.js', () => ({ navigateTo: vi.fn() }));
vi.mock('./issue-store.js', () => ({
    upsertIssue: vi.fn(),
    removeIssue: vi.fn(),
}));
vi.mock('./state.js', () => {
    let entries = [];
    let unread = 0;
    let selected = -1;
    return {
        getCurrentUser: vi.fn(() => ({ id: 'me' })),
        getCurrentView: vi.fn(() => 'inbox'),
        getCurrentDetailIssue: vi.fn(() => null),
        getIssues: vi.fn(() => []), setIssues: vi.fn(),
        getDetailNavContext: vi.fn(() => []), setDetailNavContext: vi.fn(),
        getWebsocket: vi.fn(() => null), setWebsocket: vi.fn(),
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
import { showApiError } from './ui.js';
import {
    setInboxEntries, getInboxEntries, getSelectedInboxIndex, setSelectedInboxIndex,
    getInboxUnreadCount, setInboxUnreadCount,
} from './state.js';
import { dispatch, resetWsState } from './ws.js';
import { registerWsHandlers } from './ws-handlers.js';
import { initEventDelegation } from './event-delegation.js';
import { createInboxNavigationHandler, isAnyDetailViewActive } from './keyboard.js';
import * as inboxModule from './inbox.js';
import {
    renderInbox, selectInboxRow, collapseInboxExpand, loadInbox, toggleInboxUnreadFilter,
    toggleInboxEntryElementExpand, archiveInboxEntryElement, resetInboxLocalState,
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
        isDetailViewActive: isAnyDetailViewActive,
    }));
    // ... then delegation on DOMContentLoaded.
    initEventDelegation();
    resetWsState();
    registerWsHandlers();
});

beforeEach(() => {
    vi.clearAllMocks();
    resetInboxLocalState();
    document.body.innerHTML = `
        <div id="inbox-view" class="view"><div id="inbox-list"></div></div>
        <div id="issue-detail-view" class="view hidden"></div>
        <div id="document-detail-view" class="view hidden"></div>
        <span id="inbox-badge"></span>`;
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

    it.each(['Enter', ' '])('%j on the focused row toggle toggles it once', (k) => {
        const toggle = row().querySelector('.inbox-row-toggle');
        expect(document.activeElement).toBe(toggle);
        key(toggle, k);
        expect(isExpanded()).toBe(true);
        key(document.activeElement, k);
        expect(isExpanded()).toBe(false);
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

// ============================================================================
// PR #260 independent review
// ============================================================================

const flush = () => new Promise(r => setTimeout(r, 0));
const toggleOf = (r) => r.querySelector('.inbox-row-toggle');
const rowById = (id) => [...document.querySelectorAll('.inbox-row')].find(r => r.dataset.entryId === id);

describe('finding 1: background refreshes keep the open row (blocking)', () => {
    const UNREAD = { ...ASSIGN, read_at: null };

    beforeEach(() => {
        setInboxEntries([{ ...UNREAD }, { ...OTHER }]);
        setInboxUnreadCount(1);
        renderInbox();
        selectInboxRow(0);
    });

    it("our own mark-read echo leaves the row expanded and focused, with no reload", async () => {
        key(toggleOf(row()), 'Enter');
        expect(isExpanded()).toBe(true);
        expect(api.markInboxRead).toHaveBeenCalledWith('assign-1');
        await flush();

        // The server broadcasts the read back to every connection, ours too.
        dispatch({ type: 'read', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
        await flush();

        expect(api.getInbox).not.toHaveBeenCalled();
        expect(isExpanded()).toBe(true);
        expect(document.activeElement).toBe(toggleOf(rowById('assign-1')));
        expect(rowById('assign-1').classList.contains('keyboard-selected')).toBe(true);
    });

    it('any other inbox event refreshes in the background: still expanded, selected and focused', async () => {
        key(toggleOf(row()), 'Enter');
        const NEW = { ...OTHER, id: 'new-1', title: 'new mention' };
        api.getInbox.mockResolvedValueOnce([NEW, { ...UNREAD, read_at: 'x' }, { ...OTHER }]);

        dispatch({ type: 'created', entity: 'inbox', data: { id: 'new-1', recipient_user_id: 'me' } });
        expect(document.querySelector('.skeleton-list-item')).toBeNull(); // no skeleton flash
        await flush();

        expect(api.getInbox).toHaveBeenCalled();
        expect(rowById('new-1')).toBeTruthy();
        expect(rowById('assign-1').classList.contains('inbox-row-expanded')).toBe(true);
        // Selection follows the entry (now index 1), not the old index.
        expect(rowById('assign-1').classList.contains('keyboard-selected')).toBe(true);
        expect(getSelectedInboxIndex()).toBe(1);
        expect(document.activeElement).toBe(toggleOf(rowById('assign-1')));
    });

    it('focus on an action-bar button survives a background refresh', async () => {
        key(toggleOf(row()), 'Enter');
        const btn = document.querySelector('.inbox-row-expanded-panel [data-action="open-inbox-full"]');
        btn.focus();
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD, read_at: 'x' }, { ...OTHER }]);
        dispatch({ type: 'reconnected', entity: 'connection', data: {} });
        await flush();
        expect(isExpanded()).toBe(true);
        expect(document.activeElement.dataset.action).toBe('open-inbox-full');
        expect(document.activeElement.closest('.inbox-row-expanded-panel')).not.toBeNull();
    });

    it('with the unread-only filter on, the open (now read) entry stays until the user moves on', async () => {
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...OTHER, read_at: null }]);
        toggleInboxUnreadFilter(); // intentional load
        try {
            await flush();
            await flush();
            selectInboxRow(0);
            key(toggleOf(row()), 'Enter');
            expect(isExpanded()).toBe(true);

            // The server no longer returns it: it is read now.
            api.getInbox.mockResolvedValueOnce([{ ...OTHER, read_at: null }]);
            dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
            await flush();

            expect(rowById('assign-1')).toBeTruthy();
            expect(rowById('assign-1').classList.contains('inbox-row-expanded')).toBe(true);
            expect(document.activeElement).toBe(toggleOf(rowById('assign-1')));
        } finally {
            api.getInbox.mockResolvedValue([]);
            toggleInboxUnreadFilter();
            await flush();
        }
    });

    it('a failed background refresh keeps the list on screen', async () => {
        key(toggleOf(row()), 'Enter');
        api.getInbox.mockRejectedValueOnce(new Error('offline'));
        dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
        await flush();
        expect(isExpanded()).toBe(true);
        expect(document.querySelector('.inbox-row')).not.toBeNull();
        expect(showApiError).not.toHaveBeenCalled();
    });

    it('an intentional load still resets: collapsed, first row focused', async () => {
        key(toggleOf(row()), 'Enter');
        api.getInbox.mockResolvedValueOnce([{ ...OTHER }, { ...UNREAD, read_at: 'x' }]);
        await loadInbox({ focusFirst: true });
        expect(isExpanded()).toBe(false);
        expect(document.activeElement).toBe(toggleOf(row()));
    });
});

describe('finding 3: Escape and j/k from an action button keep focus in the list', () => {
    beforeEach(() => {
        key(toggleOf(row()), 'Enter');
        document.querySelector('.inbox-row-expanded-panel [data-action="archive-inbox-entry"]').focus();
    });

    it('Escape collapses and focuses the row toggle', () => {
        key(document.activeElement, 'Escape');
        expect(isExpanded()).toBe(false);
        expect(document.activeElement).toBe(toggleOf(rowById('assign-1')));
    });

    it('j collapses and focus follows the cursor to the next row', () => {
        key(document.activeElement, 'j');
        expect(isExpanded()).toBe(false);
        expect(rowById('assign-2').classList.contains('keyboard-selected')).toBe(true);
        expect(document.activeElement).toBe(toggleOf(rowById('assign-2')));
    });
});

describe('finding 5: a failed mark-read rolls back', () => {
    it('restores the unread state, re-syncs the badge and tells the user', async () => {
        setInboxEntries([{ ...ASSIGN, read_at: null }, { ...OTHER }]);
        setInboxUnreadCount(1);
        renderInbox();
        selectInboxRow(0);
        api.markInboxRead.mockRejectedValueOnce(new Error('404'));
        api.getInboxUnreadCount.mockResolvedValueOnce({ unread_count: 1 });

        key(toggleOf(row()), 'Enter');
        expect(getInboxUnreadCount()).toBe(0); // optimistic
        await flush();
        await flush();

        expect(getInboxEntries().find(e => e.id === 'assign-1').read_at).toBeNull();
        expect(rowById('assign-1').querySelector('.inbox-row-unread-dot')).not.toBeNull();
        expect(getInboxUnreadCount()).toBe(1);
        expect(showApiError).toHaveBeenCalledWith('mark inbox entry read', expect.any(Error));
        // The row stays open and focused through the rollback.
        expect(isExpanded()).toBe(true);
        expect(document.activeElement).toBe(toggleOf(rowById('assign-1')));
    });
});

describe('finding 6: Reassign back is guarded while in flight', () => {
    it('a double press sends one PATCH and marks the button busy', async () => {
        let resolve;
        api.updateIssue.mockImplementationOnce(() => new Promise(r => { resolve = r; }));
        key(toggleOf(row()), 'Enter');
        const btn = () => document.querySelector('[data-action="reassign-inbox-entry"]');
        click(btn());
        click(btn());
        expect(api.updateIssue).toHaveBeenCalledTimes(1);
        expect(btn().getAttribute('aria-disabled')).toBe('true');
        resolve({});
        await flush();
        expect(api.archiveInbox).toHaveBeenCalledTimes(1);
    });

    it('re-enables the button after a failed PATCH so it can be retried', async () => {
        api.updateIssue.mockRejectedValueOnce(new Error('nope'));
        key(toggleOf(row()), 'Enter');
        const btn = () => document.querySelector('[data-action="reassign-inbox-entry"]');
        click(btn());
        await flush();
        expect(btn().hasAttribute('aria-disabled')).toBe(false);
        click(btn());
        expect(api.updateIssue).toHaveBeenCalledTimes(2);
    });
});

describe('finding 7: the expanded panel escapes user content (real utils.js)', () => {
    it('renders hostile names, bodies and titles as text', () => {
        const evil = '<img src=x onerror="window.__xss=1">';
        setInboxEntries([{
            ...ASSIGN,
            title: `t ${evil}`,
            body: `<script>window.__xss=1</script>${evil}`,
            source_user_name: evil,
            issue_identifier: `"><img src=x onerror=1>`,
        }]);
        renderInbox();
        selectInboxRow(0);
        key(toggleOf(row()), 'Enter');
        const list = document.getElementById('inbox-list');
        expect(isExpanded()).toBe(true);
        expect(list.querySelector('img, script')).toBeNull();
        expect(list.querySelector('[onerror]')).toBeNull();
        expect(document.querySelector('.inbox-expanded-source').textContent).toContain(evil);
        expect(document.querySelector('.inbox-expanded-body').textContent).toContain('<script>');
        expect(document.querySelector('[data-action="reassign-inbox-entry"]').textContent).toContain(evil);
        expect(document.querySelector('.inbox-row-expanded-panel').getAttribute('aria-label')).toBe(`t ${evil}`);
        expect(window.__xss).toBeUndefined();
    });
});

describe('finding 8 and 10: scroll into view, row-scoped selection check', () => {
    it('expanding scrolls the row into view (nearest)', () => {
        Element.prototype.scrollIntoView.mockClear();
        key(toggleOf(row()), 'Enter');
        expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
    });

    it('a selection elsewhere on the page does not swallow a toggle click', () => {
        const other = document.createElement('p');
        other.textContent = 'elsewhere';
        document.body.appendChild(other);
        const range = document.createRange();
        range.selectNodeContents(other);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        click(row().querySelector('.inbox-row-title'));
        expect(isExpanded()).toBe(true);
    });
});

// The real router hides every .view and shows the one it switches to; the
// detail views do the same when they open over a list (CHT-1513).
function showView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

describe('CHT-1513: the inbox keys go quiet behind a detail view opened from it', () => {
    let viewIssue;
    let viewDocument;
    const DOC = {
        ...OTHER, id: 'doc-1', kind: 'mention', issue_id: null, issue_identifier: null,
        document_id: 'doc-9', document_title: 'Spec',
    };

    beforeAll(async () => {
        ({ viewIssue } = await import('./issue-detail-view.js'));
        ({ viewDocument } = await import('./documents.js'));
    });

    beforeEach(() => {
        viewIssue.mockImplementation(() => showView('issue-detail-view'));
        viewDocument.mockImplementation(() => showView('document-detail-view'));
        setInboxEntries([{ ...ASSIGN }, { ...OTHER }, { ...DOC }]);
        renderInbox();
        selectInboxRow(0);
    });

    afterEach(() => {
        viewIssue.mockReset();
        viewDocument.mockReset();
    });

    function openFromRow(entryId) {
        const r = rowById(entryId);
        selectInboxRow([...document.querySelectorAll('.inbox-row')].indexOf(r));
        key(toggleOf(r), 'Enter');
        click(document.querySelector('.inbox-row-expanded-panel [data-action="open-inbox-full"]'));
    }

    for (const [label, entryId, detailId] of [
        ['issue', 'assign-1', 'issue-detail-view'],
        ['document', 'doc-1', 'document-detail-view'],
    ]) {
        it(`after Open (${label}), e and j/k on the detail page leave the inbox alone`, () => {
            openFromRow(entryId);
            expect(document.getElementById(detailId).classList.contains('hidden')).toBe(false);
            const selectedBefore = getSelectedInboxIndex();

            // Keys land wherever focus is: the hidden Open button can still
            // hold it in some browsers, so press on it as well as on body.
            for (const target of [document.activeElement, document.body]) {
                const e = key(target, 'e');
                // Left for the detail view's own `e` (estimate).
                expect(e.defaultPrevented).toBe(false);
                key(target, 'j');
                key(target, 'k');
                key(target, 'Escape');
            }

            expect(api.archiveInbox).not.toHaveBeenCalled();
            expect(getInboxEntries().map(x => x.id)).toEqual(['assign-1', 'assign-2', 'doc-1']);
            expect(getSelectedInboxIndex()).toBe(selectedBefore);
            expect(isExpanded()).toBe(true);
        });
    }

    it('back on the inbox, the keys work again', () => {
        openFromRow('assign-1');
        showView('inbox-view'); // Back / sidebar / browser back all route here
        key(document.body, 'j');
        expect(getSelectedInboxIndex()).toBe(1);
        expect(isExpanded()).toBe(false);
        const e = key(document.body, 'e');
        expect(e.defaultPrevented).toBe(true);
        expect(api.archiveInbox).toHaveBeenCalledWith('assign-2');
    });
});

describe('CHT-1514: a fetch already in flight cannot undo a local archive or read', () => {
    const UNREAD = { ...ASSIGN, read_at: null };
    const UNREAD2 = { ...OTHER, read_at: null };
    let release;

    // A background refresh (some other inbox event) whose fetch the test
    // completes later, with what the server held when it started.
    function startStaleRefresh() {
        api.getInbox.mockImplementationOnce(() => new Promise(r => { release = r; }));
        dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
        expect(api.getInbox).toHaveBeenCalledTimes(1);
    }

    beforeEach(() => {
        api.getInbox.mockResolvedValue([]);
        setInboxEntries([{ ...UNREAD }, { ...UNREAD2 }]);
        setInboxUnreadCount(2);
        renderInbox();
        selectInboxRow(0);
    });

    it('an archived row stays gone when the stale fetch lands after our skipped echo', async () => {
        startStaleRefresh();
        key(toggleOf(row()), 'e');
        await flush();
        expect(rowById('assign-1')).toBeUndefined();
        // Our own echo: skipped as already applied, no reload.
        dispatch({ type: 'archived', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
        expect(api.getInbox).toHaveBeenCalledTimes(1);

        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(rowById('assign-1')).toBeUndefined();
        expect(getInboxEntries().map(x => x.id)).toEqual(['assign-2']);
    });

    it('an archived row stays gone when the stale fetch lands before the echo', async () => {
        startStaleRefresh();
        let archived;
        api.archiveInbox.mockImplementationOnce(() => new Promise(r => { archived = r; }));
        key(toggleOf(row()), 'e');
        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(rowById('assign-1')).toBeUndefined();
        archived({});
        await flush();
        // Confirmed now, but still hidden on screen.
        expect(rowById('assign-1')).toBeUndefined();
        // Our echo, late: skipped, nothing reloads.
        dispatch({ type: 'archived', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
        expect(api.getInbox).toHaveBeenCalledTimes(1);
        // The first fetch started after confirmation is the server's answer
        // and retires the tombstone: a later stale-looking result shows it.
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
        await flush();
        expect(rowById('assign-1')).toBeTruthy();
    });

    it('a row read here keeps its read state and the badge is not lowered twice', async () => {
        api.getInboxUnreadCount.mockResolvedValue({ unread_count: 1 }); // the server after our read
        onTestFinished(() => api.getInboxUnreadCount.mockResolvedValue({ unread_count: 0 }));
        startStaleRefresh();
        key(toggleOf(row()), 'Enter'); // expand: marks read
        expect(api.markInboxRead).toHaveBeenCalledTimes(1);
        await flush();
        dispatch({ type: 'read', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
        expect(api.getInbox).toHaveBeenCalledTimes(1);

        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(rowById('assign-1').querySelector('.inbox-row-unread-dot')).toBeNull();
        expect(getInboxEntries().find(x => x.id === 'assign-1').read_at).not.toBeNull();

        const count = getInboxUnreadCount();
        expect(count).toBe(1);
        key(document.activeElement, 'Escape'); // collapse
        key(toggleOf(rowById('assign-1')), 'Enter'); // and open it again
        expect(isExpanded()).toBe(true);
        expect(getInboxUnreadCount()).toBe(count);
        expect(api.markInboxRead).toHaveBeenCalledTimes(1);
    });

    it('once a fetch started after the server confirmed, the server is trusted again', async () => {
        key(toggleOf(row()), 'e');
        await flush(); // archive confirmed
        // The very first fetch started after confirmation is authoritative:
        // if (for whatever reason) it has the entry, the entry shows.
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
        await flush();
        expect(rowById('assign-1')).toBeTruthy();
    });

    it('a failed archive lets the next fetch show the entry again', async () => {
        api.archiveInbox.mockRejectedValueOnce(new Error('offline'));
        const err = vi.spyOn(console, 'error').mockImplementation(() => {});
        key(toggleOf(row()), 'e');
        await flush();
        err.mockRestore();
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
        await flush();
        expect(rowById('assign-1')).toBeTruthy();
    });

    it('unread-only: the open row archived in another tab leaves the list', async () => {
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        toggleInboxUnreadFilter();
        try {
            await flush();
            await flush();
            selectInboxRow(0);
            key(toggleOf(row()), 'Enter');
            expect(isExpanded()).toBe(true);

            // Another tab archives it; the unread-only fetch no longer has it.
            api.getInbox.mockResolvedValueOnce([{ ...UNREAD2 }]);
            dispatch({ type: 'archived', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
            await flush();

            expect(rowById('assign-1')).toBeUndefined();
            expect(isExpanded()).toBe(false);
        } finally {
            api.getInbox.mockResolvedValue([]);
            toggleInboxUnreadFilter();
            await flush();
        }
    });
});

describe('CHT-1514 review: the other read paths keep the overlay too', () => {
    const UNREAD = { ...ASSIGN, read_at: null };
    const UNREAD2 = { ...OTHER, read_at: null };
    const created = () => dispatch({ type: 'created', entity: 'inbox', data: { id: 'z', recipient_user_id: 'me' } });
    let release;
    function startStaleRefresh() {
        api.getInbox.mockImplementationOnce(() => new Promise(r => { release = r; }));
        created();
    }
    const dot = (id) => rowById(id)?.querySelector('.inbox-row-unread-dot') ?? null;

    beforeEach(() => {
        api.getInbox.mockResolvedValue([]);
        setInboxEntries([{ ...UNREAD }, { ...UNREAD2 }]);
        setInboxUnreadCount(2);
        renderInbox();
        selectInboxRow(0);
    });

    // markInboxRead answers only when the test says so.
    function holdRead() {
        const answer = {};
        api.markInboxRead.mockImplementationOnce(() => new Promise((ok, fail) => {
            answer.ok = ok;
            answer.fail = fail;
        }));
        return answer;
    }

    // "Open" (markEntryRead) on a row that is still unread. Expanding a row
    // marks it read on its own, so press an Open button for the unread
    // entry the way the action bar renders it.
    function clickOpen(entryId) {
        const btn = document.createElement('button');
        btn.dataset.action = 'open-inbox-full';
        btn.dataset.entryId = entryId;
        btn.dataset.issueId = 'issue-9';
        document.getElementById('inbox-list').appendChild(btn);
        click(btn);
        expect(api.markInboxRead).toHaveBeenCalledWith(entryId);
    }

    it('Open: a stale fetch landing during the request does not show the row unread', async () => {
        const answer = holdRead();
        clickOpen('assign-2');

        startStaleRefresh();
        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(getInboxEntries().find(e => e.id === 'assign-2').read_at).not.toBeNull();
        expect(dot('assign-2')).toBeNull();

        answer.ok({});
        await flush();
        expect(getInboxEntries().find(e => e.id === 'assign-2').read_at).not.toBeNull();
    });

    it('Open: a refresh during the request is not overwritten by the list from before it', async () => {
        const answer = holdRead();
        clickOpen('assign-2');

        // Another tab archives assign-1 meanwhile; the refresh drops it.
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD2 }]);
        dispatch({ type: 'archived', entity: 'inbox', data: { id: 'assign-1', recipient_user_id: 'me' } });
        await flush();
        expect(getInboxEntries().map(e => e.id)).toEqual(['assign-2']);

        answer.ok({});
        await flush();
        expect(getInboxEntries().map(e => e.id)).toEqual(['assign-2']);
        expect(rowById('assign-1')).toBeUndefined();
    });

    it('Open: a failed request lets the next fetch show the row unread again', async () => {
        api.markInboxRead.mockRejectedValueOnce(new Error('nope'));
        const err = vi.spyOn(console, 'error').mockImplementation(() => {});
        clickOpen('assign-2');
        await flush();
        err.mockRestore();
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        created();
        await flush();
        expect(dot('assign-2')).not.toBeNull();
    });

    it('expand: a failed optimistic read lets the next fetch show the row unread again', async () => {
        const answer = holdRead();
        key(toggleOf(row()), 'Enter'); // expand: optimistic read
        startStaleRefresh();
        answer.fail(new Error('404'));
        await flush();
        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(getInboxEntries().find(e => e.id === 'assign-1').read_at).toBeNull();
        expect(dot('assign-1')).not.toBeNull();
    });

    it('mark all read: a stale fetch does not bring the unread dots back', async () => {
        startStaleRefresh();
        const btn = document.createElement('button');
        btn.dataset.action = 'mark-all-inbox-read';
        document.body.appendChild(btn);
        click(btn);
        await flush();
        expect(api.markAllInboxRead).toHaveBeenCalledWith('team-1');
        release([{ ...UNREAD }, { ...UNREAD2 }]);
        await flush();
        expect(dot('assign-1')).toBeNull();
        expect(dot('assign-2')).toBeNull();
    });

    it('unread-only: a row read here and collapsed leaves on the next refresh, even a stale one', async () => {
        api.getInbox.mockResolvedValueOnce([{ ...UNREAD }, { ...UNREAD2 }]);
        toggleInboxUnreadFilter();
        try {
            await flush();
            await flush();
            selectInboxRow(0);
            key(toggleOf(row()), 'Enter'); // read
            key(document.activeElement, 'Escape'); // collapse
            expect(isExpanded()).toBe(false);
            expect(rowById('assign-1')).toBeTruthy();

            startStaleRefresh();
            release([{ ...UNREAD }, { ...UNREAD2 }]); // still lists it as unread
            await flush();
            expect(rowById('assign-1')).toBeUndefined();
            expect(rowById('assign-2')).toBeTruthy();
        } finally {
            api.getInbox.mockResolvedValue([]);
            toggleInboxUnreadFilter();
            await flush();
        }
    });
});
