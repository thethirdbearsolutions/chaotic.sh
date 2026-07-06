import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    createKeyboardHandler,
    createModifierKeyHandler,
    createListNavigationHandler,
    createDocListNavigationHandler,
    createBoardNavigationHandler,
    updateKeyboardSelection,
} from './keyboard.js';

function makeEvent(key, overrides = {}) {
    return {
        key,
        metaKey: false,
        ctrlKey: false,
        altKey: false,
        target: { tagName: 'DIV' },
        preventDefault: vi.fn(),
        stopImmediatePropagation: vi.fn(),
        ...overrides,
    };
}

describe('Keyboard Handler', () => {
    let actions;
    let handler;

    beforeEach(() => {
        actions = {
            closeModal: vi.fn(),
            closeSidebar: vi.fn(),
            navigateTo: vi.fn(),
            showCreateIssueModal: vi.fn(),
            showKeyboardShortcutsHelp: vi.fn(),
            isModalOpen: vi.fn().mockReturnValue(false),
            focusSearch: vi.fn(),
            closeDropdowns: vi.fn(),
            isDetailViewActive: vi.fn().mockReturnValue(false),
        };
        handler = createKeyboardHandler(actions);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    describe('modifier key bypass', () => {
        it('ignores events with metaKey', () => {
            handler(makeEvent('c', { metaKey: true }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('ignores events with ctrlKey', () => {
            handler(makeEvent('c', { ctrlKey: true }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('ignores events with altKey', () => {
            handler(makeEvent('c', { altKey: true }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });
    });

    describe('input field bypass', () => {
        it('ignores shortcuts when focused on INPUT', () => {
            handler(makeEvent('c', { target: { tagName: 'INPUT' } }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('ignores shortcuts when focused on TEXTAREA', () => {
            handler(makeEvent('c', { target: { tagName: 'TEXTAREA' } }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('ignores shortcuts when focused on SELECT', () => {
            handler(makeEvent('c', { target: { tagName: 'SELECT' } }));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('allows Escape to blur input fields', () => {
            const blur = vi.fn();
            handler(makeEvent('Escape', { target: { tagName: 'INPUT', blur } }));
            expect(blur).toHaveBeenCalled();
        });

        it('does not blur on non-Escape keys in input fields', () => {
            const blur = vi.fn();
            handler(makeEvent('a', { target: { tagName: 'INPUT', blur } }));
            expect(blur).not.toHaveBeenCalled();
        });
    });

    describe('Escape key', () => {
        it('closes modal when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            const event = makeEvent('Escape');
            handler(event);
            expect(actions.closeModal).toHaveBeenCalled();
            expect(actions.closeDropdowns).not.toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('closes dropdowns when modal is not open', () => {
            actions.isModalOpen.mockReturnValue(false);
            const event = makeEvent('Escape');
            handler(event);
            expect(actions.closeDropdowns).toHaveBeenCalled();
            expect(actions.closeModal).not.toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('closes sidebar when sidebar is open and no modal (CHT-869)', () => {
            actions.isModalOpen.mockReturnValue(false);
            document.body.classList.add('sidebar-open');
            const event = makeEvent('Escape');
            handler(event);
            expect(actions.closeSidebar).toHaveBeenCalled();
            expect(actions.closeDropdowns).not.toHaveBeenCalled();
            expect(actions.closeModal).not.toHaveBeenCalled();
            document.body.classList.remove('sidebar-open');
        });

        it('prefers modal over sidebar when both are open (CHT-869)', () => {
            actions.isModalOpen.mockReturnValue(true);
            document.body.classList.add('sidebar-open');
            const event = makeEvent('Escape');
            handler(event);
            expect(actions.closeModal).toHaveBeenCalled();
            expect(actions.closeSidebar).not.toHaveBeenCalled();
            document.body.classList.remove('sidebar-open');
        });
    });

    describe('modal suppression', () => {
        it('suppresses non-Escape shortcuts when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('c'));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
        });

        it('suppresses navigation shortcuts when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('m'));
            expect(actions.navigateTo).not.toHaveBeenCalled();
        });
    });

    describe('direct shortcuts', () => {
        it('c opens create issue modal', () => {
            const event = makeEvent('c');
            handler(event);
            expect(actions.showCreateIssueModal).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('m navigates to my-issues', () => {
            const event = makeEvent('m');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('my-issues');
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('i navigates to issues', () => {
            const event = makeEvent('i');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('issues');
        });

        it('b navigates to board', () => {
            const event = makeEvent('b');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('board');
        });

        it('p navigates to projects', () => {
            const event = makeEvent('p');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('projects');
        });

        it('? shows keyboard shortcuts help', () => {
            const event = makeEvent('?');
            handler(event);
            expect(actions.showKeyboardShortcutsHelp).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('/ focuses search', () => {
            const event = makeEvent('/');
            handler(event);
            expect(actions.focusSearch).toHaveBeenCalled();
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    // CHT-1215: layering — detail view's own hotkey listener is registered
    // dynamically per-view, always AFTER this global handler, so it can never
    // preempt bare 'p'/'c' here on its own. The global handler must no-op
    // instead so the (later-firing) detail listener sees an un-preempted key.
    describe('detail view layering for p/c (CHT-1215)', () => {
        it('does not navigate to projects on bare p when detail view is active', () => {
            actions.isDetailViewActive.mockReturnValue(true);
            const event = makeEvent('p');
            handler(event);
            expect(actions.navigateTo).not.toHaveBeenCalled();
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('does not open create issue modal on bare c when detail view is active', () => {
            actions.isDetailViewActive.mockReturnValue(true);
            const event = makeEvent('c');
            handler(event);
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('still navigates to projects on bare p when detail view is not active', () => {
            actions.isDetailViewActive.mockReturnValue(false);
            const event = makeEvent('p');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('projects');
        });

        it('still opens create issue modal on bare c when detail view is not active', () => {
            actions.isDetailViewActive.mockReturnValue(false);
            const event = makeEvent('c');
            handler(event);
            expect(actions.showCreateIssueModal).toHaveBeenCalled();
        });

        it('falls back to firing normally when isDetailViewActive is not provided', () => {
            delete actions.isDetailViewActive;
            const event = makeEvent('p');
            handler(event);
            expect(actions.navigateTo).toHaveBeenCalledWith('projects');
        });

        // CHT-1215 review finding 2: the g-prefix switch needs the same
        // policy — its targets that collide with the detail view's own
        // shortcut map must no-op while a detail view is active. The
        // double-fire trigger is startViewTransition-dependent (Chrome
        // defers the DOM swap past the synchronous listener dispatch, so the
        // detail listener still sees its view as visible), which jsdom can't
        // reproduce — these tests pin the guard itself at the unit level
        // instead. 'd' joined the colliding set with CHT-1214's
        // edit-description hotkey (PR #209 review finding 2).
        describe('g-prefix collisions', () => {
            it.each(['p', 's', 't', 'e', 'a', 'd'])('g then %s does not navigate when detail view is active', (key) => {
                actions.isDetailViewActive.mockReturnValue(true);
                handler(makeEvent('g'));
                handler(makeEvent(key));
                expect(actions.navigateTo).not.toHaveBeenCalled();
            });

            it.each([
                ['i', 'issues'],
                ['r', 'rituals'],
                [',', 'settings'],
            ])('g then %s (non-colliding) still navigates to %s when detail view is active', (key, view) => {
                actions.isDetailViewActive.mockReturnValue(true);
                handler(makeEvent('g'));
                handler(makeEvent(key));
                expect(actions.navigateTo).toHaveBeenCalledWith(view);
            });

            it.each([
                ['p', 'projects'],
                ['s', 'sprints'],
                ['t', 'team'],
                ['e', 'epics'],
                ['a', 'approvals'],
                ['d', 'documents'],
            ])('g then %s navigates to %s when detail view is not active', (key, view) => {
                actions.isDetailViewActive.mockReturnValue(false);
                handler(makeEvent('g'));
                handler(makeEvent(key));
                expect(actions.navigateTo).toHaveBeenCalledWith(view);
            });

            it('the swallowed colliding key still consumes the g prefix', () => {
                actions.isDetailViewActive.mockReturnValue(true);
                handler(makeEvent('g'));
                handler(makeEvent('p')); // swallowed, but resets waitingForNavKey
                actions.isDetailViewActive.mockReturnValue(false);
                handler(makeEvent('s')); // bare 's' has no global shortcut
                expect(actions.navigateTo).not.toHaveBeenCalled();
            });
        });
    });

    describe('g + key navigation combos', () => {
        it('g then i navigates to issues', () => {
            handler(makeEvent('g'));
            handler(makeEvent('i'));
            expect(actions.navigateTo).toHaveBeenCalledWith('issues');
        });

        it('g then p navigates to projects', () => {
            handler(makeEvent('g'));
            handler(makeEvent('p'));
            expect(actions.navigateTo).toHaveBeenCalledWith('projects');
        });

        it('g then s navigates to sprints', () => {
            handler(makeEvent('g'));
            handler(makeEvent('s'));
            expect(actions.navigateTo).toHaveBeenCalledWith('sprints');
        });

        it('g then d navigates to documents', () => {
            handler(makeEvent('g'));
            handler(makeEvent('d'));
            expect(actions.navigateTo).toHaveBeenCalledWith('documents');
        });

        it('g then t navigates to team', () => {
            handler(makeEvent('g'));
            handler(makeEvent('t'));
            expect(actions.navigateTo).toHaveBeenCalledWith('team');
        });

        // CHT-1215: help overlay/command palette advertised these but the switch
        // never implemented them
        it('g then e navigates to epics', () => {
            handler(makeEvent('g'));
            handler(makeEvent('e'));
            expect(actions.navigateTo).toHaveBeenCalledWith('epics');
        });

        it('g then r navigates to rituals', () => {
            handler(makeEvent('g'));
            handler(makeEvent('r'));
            expect(actions.navigateTo).toHaveBeenCalledWith('rituals');
        });

        it('g then a navigates to approvals', () => {
            handler(makeEvent('g'));
            handler(makeEvent('a'));
            expect(actions.navigateTo).toHaveBeenCalledWith('approvals');
        });

        it('g then , navigates to settings', () => {
            handler(makeEvent('g'));
            handler(makeEvent(','));
            expect(actions.navigateTo).toHaveBeenCalledWith('settings');
        });

        it('g then unrecognized key does nothing', () => {
            handler(makeEvent('g'));
            handler(makeEvent('z'));
            expect(actions.navigateTo).not.toHaveBeenCalled();
        });

        it('g swallows direct shortcuts like c', () => {
            handler(makeEvent('g'));
            handler(makeEvent('c'));
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
            expect(actions.navigateTo).not.toHaveBeenCalled();
        });

        it('g does not arm nav prefix when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('g'));
            actions.isModalOpen.mockReturnValue(false);
            // Use 's' which only works as g+s combo, not as direct shortcut
            handler(makeEvent('s'));
            expect(actions.navigateTo).not.toHaveBeenCalled();
        });

        it('g prefix expires after timeout', () => {
            vi.useFakeTimers();
            handler(makeEvent('g'));
            vi.advanceTimersByTime(1100);
            // Use 's' which has a g+s combo (sprints) but no direct shortcut
            handler(makeEvent('s'));
            // If g+s were still active, navigateTo('sprints') would fire.
            // Since timeout expired, bare 's' has no shortcut, so nothing fires.
            expect(actions.navigateTo).not.toHaveBeenCalled();
        });

        it('g prefix resets after use', () => {
            handler(makeEvent('g'));
            handler(makeEvent('i'));
            actions.navigateTo.mockClear();

            // Second 'i' without 'g' should trigger direct shortcut
            handler(makeEvent('i'));
            expect(actions.navigateTo).toHaveBeenCalledWith('issues');
        });
    });

    describe('no action for unrecognized keys', () => {
        it('does not call any action for unrecognized key', () => {
            handler(makeEvent('x'));
            expect(actions.navigateTo).not.toHaveBeenCalled();
            expect(actions.showCreateIssueModal).not.toHaveBeenCalled();
            expect(actions.showKeyboardShortcutsHelp).not.toHaveBeenCalled();
            expect(actions.focusSearch).not.toHaveBeenCalled();
            expect(actions.closeModal).not.toHaveBeenCalled();
            expect(actions.closeDropdowns).not.toHaveBeenCalled();
        });
    });
});

// ============================================================================
// Modifier Key Handler (Cmd+Enter, Cmd+K) - CHT-710
// ============================================================================

describe('Modifier Key Handler (Cmd+Enter, Cmd+K)', () => {
    let actions;
    let handler;

    beforeEach(() => {
        actions = {
            isModalOpen: vi.fn().mockReturnValue(false),
            getModalForm: vi.fn().mockReturnValue(null),
            getModalPrimaryBtn: vi.fn().mockReturnValue(null),
            isCommandPaletteOpen: vi.fn().mockReturnValue(false),
            openCommandPalette: vi.fn(),
            closeCommandPalette: vi.fn(),
        };
        handler = createModifierKeyHandler(actions);
    });

    describe('ignores non-modifier events', () => {
        it('does nothing without metaKey or ctrlKey', () => {
            handler(makeEvent('Enter'));
            handler(makeEvent('k'));
            expect(actions.openCommandPalette).not.toHaveBeenCalled();
        });
    });

    describe('Cmd+Enter', () => {
        it('submits modal form when modal is open and has a form', () => {
            actions.isModalOpen.mockReturnValue(true);
            const form = document.createElement('form');
            const submitSpy = vi.fn();
            form.addEventListener('submit', submitSpy);
            actions.getModalForm.mockReturnValue(form);

            const event = makeEvent('Enter', { metaKey: true });
            handler(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(submitSpy).toHaveBeenCalled();
        });

        it('clicks primary button when modal has no form', () => {
            actions.isModalOpen.mockReturnValue(true);
            actions.getModalForm.mockReturnValue(null);
            const btn = document.createElement('button');
            btn.click = vi.fn();
            actions.getModalPrimaryBtn.mockReturnValue(btn);

            const event = makeEvent('Enter', { metaKey: true });
            handler(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(btn.click).toHaveBeenCalled();
        });

        it('does not click disabled primary button', () => {
            actions.isModalOpen.mockReturnValue(true);
            actions.getModalForm.mockReturnValue(null);
            const btn = document.createElement('button');
            btn.disabled = true;
            btn.click = vi.fn();
            actions.getModalPrimaryBtn.mockReturnValue(btn);

            const event = makeEvent('Enter', { metaKey: true });
            handler(event);

            expect(btn.click).not.toHaveBeenCalled();
        });

        it('submits closest form from active element when no modal', () => {
            const form = document.createElement('form');
            const input = document.createElement('input');
            form.appendChild(input);
            document.body.appendChild(form);
            input.focus();

            const submitSpy = vi.fn();
            form.addEventListener('submit', submitSpy);

            const event = makeEvent('Enter', { ctrlKey: true });
            handler(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(submitSpy).toHaveBeenCalled();

            document.body.removeChild(form);
        });

        it('does nothing when no modal and no form in focus', () => {
            const event = makeEvent('Enter', { metaKey: true });
            handler(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
        });

        it('works with ctrlKey (Windows/Linux)', () => {
            actions.isModalOpen.mockReturnValue(true);
            const form = document.createElement('form');
            const submitSpy = vi.fn();
            form.addEventListener('submit', submitSpy);
            actions.getModalForm.mockReturnValue(form);

            const event = makeEvent('Enter', { ctrlKey: true });
            handler(event);

            expect(submitSpy).toHaveBeenCalled();
        });
    });

    describe('Cmd+K', () => {
        it('opens command palette when closed', () => {
            actions.isCommandPaletteOpen.mockReturnValue(false);
            const event = makeEvent('k', { metaKey: true });
            handler(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.openCommandPalette).toHaveBeenCalled();
            expect(actions.closeCommandPalette).not.toHaveBeenCalled();
        });

        it('closes command palette when open', () => {
            actions.isCommandPaletteOpen.mockReturnValue(true);
            const event = makeEvent('k', { metaKey: true });
            handler(event);

            expect(actions.closeCommandPalette).toHaveBeenCalled();
            expect(actions.openCommandPalette).not.toHaveBeenCalled();
        });

        it('works with ctrlKey', () => {
            const event = makeEvent('k', { ctrlKey: true });
            handler(event);
            expect(actions.openCommandPalette).toHaveBeenCalled();
        });

        it('ignores k without modifier', () => {
            const event = makeEvent('k');
            handler(event);
            expect(actions.openCommandPalette).not.toHaveBeenCalled();
        });

        // CHT-1215: layering — Cmd+K used to stack the palette on top of an
        // open modal, and Escape's modal-first priority would then close the
        // modal underneath instead of the (topmost) palette. Guard at the
        // source: don't open over a modal at all.
        it('does not open the command palette when a modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            actions.isCommandPaletteOpen.mockReturnValue(false);
            const event = makeEvent('k', { metaKey: true });
            handler(event);

            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.openCommandPalette).not.toHaveBeenCalled();
        });

        it('still allows closing an already-open command palette when a modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            actions.isCommandPaletteOpen.mockReturnValue(true);
            const event = makeEvent('k', { metaKey: true });
            handler(event);

            expect(actions.closeCommandPalette).toHaveBeenCalled();
        });
    });

    describe('other modifier combos', () => {
        it('ignores Cmd+other keys', () => {
            handler(makeEvent('a', { metaKey: true }));
            expect(actions.openCommandPalette).not.toHaveBeenCalled();
        });
    });
});

// ============================================================================
// updateKeyboardSelection - CHT-710
// ============================================================================

describe('updateKeyboardSelection', () => {
    let setIndex;

    beforeEach(() => {
        setIndex = vi.fn();
        // jsdom doesn't implement scrollIntoView
        Element.prototype.scrollIntoView = vi.fn();
        document.body.innerHTML = `
            <div id="issues-list">
                <div class="issue-row" data-issue-id="issue-1">Issue 1</div>
                <div class="issue-row" data-issue-id="issue-2">Issue 2</div>
                <div class="issue-row" data-issue-id="issue-3">Issue 3</div>
            </div>
        `;
    });

    it('selects the given index', () => {
        updateKeyboardSelection(1, setIndex);
        expect(setIndex).toHaveBeenCalledWith(1);
        const items = document.querySelectorAll('.issue-row');
        expect(items[1].classList.contains('keyboard-selected')).toBe(true);
        expect(items[0].classList.contains('keyboard-selected')).toBe(false);
    });

    it('clamps to 0 for negative index', () => {
        updateKeyboardSelection(-5, setIndex);
        expect(setIndex).toHaveBeenCalledWith(0);
        expect(document.querySelectorAll('.issue-row')[0].classList.contains('keyboard-selected')).toBe(true);
    });

    it('clamps to last index for overflow', () => {
        updateKeyboardSelection(100, setIndex);
        expect(setIndex).toHaveBeenCalledWith(2);
        expect(document.querySelectorAll('.issue-row')[2].classList.contains('keyboard-selected')).toBe(true);
    });

    it('removes previous selection', () => {
        document.querySelectorAll('.issue-row')[0].classList.add('keyboard-selected');
        updateKeyboardSelection(2, setIndex);
        expect(document.querySelectorAll('.issue-row')[0].classList.contains('keyboard-selected')).toBe(false);
        expect(document.querySelectorAll('.issue-row')[2].classList.contains('keyboard-selected')).toBe(true);
    });

    it('does nothing when no list items exist', () => {
        document.body.innerHTML = '<div id="issues-list"></div>';
        updateKeyboardSelection(0, setIndex);
        expect(setIndex).not.toHaveBeenCalled();
    });

    it('scrolls selected item into view', () => {
        const scrollSpy = vi.fn();
        document.querySelectorAll('.issue-row')[1].scrollIntoView = scrollSpy;
        updateKeyboardSelection(1, setIndex);
        expect(scrollSpy).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' });
    });

    it('supports custom selector', () => {
        document.body.innerHTML = `
            <div id="custom-list">
                <div class="custom-item">A</div>
                <div class="custom-item">B</div>
            </div>
        `;
        updateKeyboardSelection(1, setIndex, '#custom-list .custom-item');
        expect(setIndex).toHaveBeenCalledWith(1);
        expect(document.querySelectorAll('.custom-item')[1].classList.contains('keyboard-selected')).toBe(true);
    });
});

// ============================================================================
// List Navigation Handler (j/k/Enter/e) - CHT-710
// ============================================================================

describe('List Navigation Handler', () => {
    let actions;
    let handler;

    beforeEach(() => {
        actions = {
            getCurrentView: vi.fn().mockReturnValue('issues'),
            getSelectedIndex: vi.fn().mockReturnValue(0),
            setSelectedIndex: vi.fn(),
            viewIssue: vi.fn(),
            showEditIssueModal: vi.fn(),
            showInlineDropdown: vi.fn(),
            isModalOpen: vi.fn().mockReturnValue(false),
            isCommandPaletteOpen: vi.fn().mockReturnValue(false),
            isDetailViewActive: vi.fn().mockReturnValue(false),
        };
        handler = createListNavigationHandler(actions);
        Element.prototype.scrollIntoView = vi.fn();
        document.body.innerHTML = `
            <div id="issues-list">
                <div class="issue-row" data-issue-id="issue-1">
                    <button class="status-btn"></button>
                    <button class="priority-btn"></button>
                    <button class="assignee-btn"></button>
                    Issue 1
                </div>
                <div class="issue-row" data-issue-id="issue-2">
                    <button class="status-btn"></button>
                    <button class="priority-btn"></button>
                    <button class="assignee-btn"></button>
                    Issue 2
                </div>
                <div class="issue-row" data-issue-id="issue-3">
                    <button class="status-btn"></button>
                    <button class="priority-btn"></button>
                    <button class="assignee-btn"></button>
                    Issue 3
                </div>
            </div>
        `;
    });

    describe('guard conditions', () => {
        it('ignores when not in issues view', () => {
            actions.getCurrentView.mockReturnValue('projects');
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when focused on INPUT', () => {
            handler(makeEvent('j', { target: { tagName: 'INPUT' } }));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when focused on TEXTAREA', () => {
            handler(makeEvent('j', { target: { tagName: 'TEXTAREA' } }));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when focused on SELECT', () => {
            handler(makeEvent('j', { target: { tagName: 'SELECT' } }));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when command palette is open', () => {
            actions.isCommandPaletteOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when no list items', () => {
            document.body.innerHTML = '<div id="issues-list"></div>';
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        // CHT-1215 review finding 1: a detail view hides the list via CSS
        // but leaves currentView === 'issues' and the rows in the DOM — the
        // handler must disengage entirely, or its stopImmediatePropagation
        // (p/s/a) preempts the detail view's own shortcuts.
        it('disengages entirely while a detail view is active', () => {
            actions.isDetailViewActive.mockReturnValue(true);
            actions.getSelectedIndex.mockReturnValue(0);
            const p = makeEvent('p');
            handler(makeEvent('j'));
            handler(makeEvent('Enter'));
            handler(p);
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
            expect(actions.viewIssue).not.toHaveBeenCalled();
            expect(actions.showInlineDropdown).not.toHaveBeenCalled();
            expect(p.stopImmediatePropagation).not.toHaveBeenCalled();
        });
    });

    describe('j/k navigation', () => {
        it('j moves selection down', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('j');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
        });

        it('k moves selection up', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            const event = makeEvent('k');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
        });

        it('j clamps at bottom', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(2);
        });

        it('k clamps at top', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('k'));
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(0);
        });
    });

    describe('Enter to view issue', () => {
        it('opens issue when selected', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            const event = makeEvent('Enter');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.viewIssue).toHaveBeenCalledWith('issue-2');
        });

        it('does nothing when no item selected (index -1)', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('Enter'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });

        it('does nothing when selectedIndex exceeds list length', () => {
            actions.getSelectedIndex.mockReturnValue(99);
            handler(makeEvent('Enter'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });

        it('skips temp items', () => {
            document.querySelector('.issue-row').dataset.issueId = 'temp-123';
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('Enter'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });
    });

    describe('e to edit issue', () => {
        it('opens edit modal when selected', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('e');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.showEditIssueModal).toHaveBeenCalledWith('issue-1');
        });

        it('does nothing when no item selected', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('e'));
            expect(actions.showEditIssueModal).not.toHaveBeenCalled();
        });

        it('skips temp items', () => {
            document.querySelector('.issue-row').dataset.issueId = 'temp-456';
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('e'));
            expect(actions.showEditIssueModal).not.toHaveBeenCalled();
        });

        it('does nothing when selectedIndex exceeds list length', () => {
            actions.getSelectedIndex.mockReturnValue(99);
            handler(makeEvent('e'));
            expect(actions.showEditIssueModal).not.toHaveBeenCalled();
        });
    });

    describe('Escape to deselect', () => {
        it('clears selection when item is selected', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            // Add keyboard-selected class to simulate selection
            document.querySelectorAll('.issue-row')[1].classList.add('keyboard-selected');
            const event = makeEvent('Escape');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(-1);
            expect(document.querySelectorAll('.keyboard-selected')).toHaveLength(0);
        });

        it('does nothing when no item selected', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('Escape'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });
    });

    describe('quick-edit shortcuts', () => {
        it('s opens status dropdown on selected issue', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            const event = makeEvent('s');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopImmediatePropagation).toHaveBeenCalled();
            expect(actions.showInlineDropdown).toHaveBeenCalledWith(
                event, 'status', 'issue-2',
                document.querySelectorAll('.issue-row')[1].querySelector('.status-btn')
            );
        });

        it('p opens priority dropdown on selected issue', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('p');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopImmediatePropagation).toHaveBeenCalled();
            expect(actions.showInlineDropdown).toHaveBeenCalledWith(
                event, 'priority', 'issue-1',
                document.querySelectorAll('.issue-row')[0].querySelector('.priority-btn')
            );
        });

        it('a opens assignee dropdown on selected issue', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            const event = makeEvent('a');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(event.stopImmediatePropagation).toHaveBeenCalled();
            expect(actions.showInlineDropdown).toHaveBeenCalledWith(
                event, 'assignee', 'issue-3',
                document.querySelectorAll('.issue-row')[2].querySelector('.assignee-btn')
            );
        });

        it('does nothing when no item selected', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('s'));
            expect(actions.showInlineDropdown).not.toHaveBeenCalled();
        });

        it('skips temp items', () => {
            document.querySelector('.issue-row').dataset.issueId = 'temp-999';
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('s'));
            expect(actions.showInlineDropdown).not.toHaveBeenCalled();
        });
    });

    describe('unrecognized keys', () => {
        it('does not act on other keys', () => {
            handler(makeEvent('x'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
            expect(actions.showEditIssueModal).not.toHaveBeenCalled();
            expect(actions.showInlineDropdown).not.toHaveBeenCalled();
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });
    });
});

// ============================================================================
// Document List Navigation Handler (j/k/Enter/e for documents) - CHT-1096
// ============================================================================

describe('Document List Navigation Handler', () => {
    let actions;
    let handler;

    beforeEach(() => {
        actions = {
            getCurrentView: vi.fn().mockReturnValue('documents'),
            getSelectedIndex: vi.fn().mockReturnValue(0),
            setSelectedIndex: vi.fn(),
            viewDocument: vi.fn(),
            showEditDocumentModal: vi.fn(),
            isModalOpen: vi.fn().mockReturnValue(false),
            isCommandPaletteOpen: vi.fn().mockReturnValue(false),
            isDetailViewActive: vi.fn().mockReturnValue(false),
        };
        handler = createDocListNavigationHandler(actions);
        Element.prototype.scrollIntoView = vi.fn();
        document.body.innerHTML = `
            <div id="documents-list">
                <div class="list-item" data-document-id="doc-1">Doc 1</div>
                <div class="list-item" data-document-id="doc-2">Doc 2</div>
                <div class="list-item" data-document-id="doc-3">Doc 3</div>
            </div>
        `;
    });

    describe('guard conditions', () => {
        it('ignores when not in documents view', () => {
            actions.getCurrentView.mockReturnValue('issues');
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when focused on INPUT', () => {
            handler(makeEvent('j', { target: { tagName: 'INPUT' } }));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when command palette is open', () => {
            actions.isCommandPaletteOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when no list items', () => {
            document.body.innerHTML = '<div id="documents-list"></div>';
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        // CHT-1215 review finding 1: same disengage as the issues list
        it('disengages entirely while a detail view is active', () => {
            actions.isDetailViewActive.mockReturnValue(true);
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('j'));
            handler(makeEvent('Enter'));
            handler(makeEvent('e'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
            expect(actions.viewDocument).not.toHaveBeenCalled();
            expect(actions.showEditDocumentModal).not.toHaveBeenCalled();
        });
    });

    describe('j/k navigation', () => {
        it('j moves selection down', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('j');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
        });

        it('k moves selection up', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            const event = makeEvent('k');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
        });
    });

    describe('Enter to view document', () => {
        it('opens document when selected', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            const event = makeEvent('Enter');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.viewDocument).toHaveBeenCalledWith('doc-2');
        });

        it('does nothing when no item selected (index -1)', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('Enter'));
            expect(actions.viewDocument).not.toHaveBeenCalled();
        });
    });

    describe('e to edit document', () => {
        it('opens edit modal when selected', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('e');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.showEditDocumentModal).toHaveBeenCalledWith('doc-1');
        });
    });

    describe('Escape to deselect', () => {
        it('clears selection when item is selected', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            document.querySelectorAll('.list-item')[1].classList.add('keyboard-selected');
            const event = makeEvent('Escape');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(-1);
            expect(document.querySelectorAll('.keyboard-selected')).toHaveLength(0);
        });
    });

    describe('works with grid items too', () => {
        it('navigates grid-item elements', () => {
            document.body.innerHTML = `
                <div id="documents-list">
                    <div class="grid-item" data-document-id="doc-a">A</div>
                    <div class="grid-item" data-document-id="doc-b">B</div>
                </div>
            `;
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('Enter');
            handler(event);
            expect(actions.viewDocument).toHaveBeenCalledWith('doc-a');
        });
    });
});

// ============================================================================
// Board Navigation Handler (j/k/Enter/Escape for the kanban board) - CHT-1215
// ============================================================================

describe('Board Navigation Handler', () => {
    let actions;
    let handler;

    beforeEach(() => {
        actions = {
            getCurrentView: vi.fn().mockReturnValue('board'),
            getSelectedIndex: vi.fn().mockReturnValue(0),
            setSelectedIndex: vi.fn(),
            viewIssue: vi.fn(),
            isModalOpen: vi.fn().mockReturnValue(false),
            isCommandPaletteOpen: vi.fn().mockReturnValue(false),
            isDetailViewActive: vi.fn().mockReturnValue(false),
        };
        handler = createBoardNavigationHandler(actions);
        Element.prototype.scrollIntoView = vi.fn();
        // Mirrors board.js's renderBoard() markup: cards nested inside
        // per-status columns, cursor is linear across DOM order.
        document.body.innerHTML = `
            <div id="kanban-board">
                <div class="kanban-column" data-status="backlog">
                    <div class="kanban-card" data-id="issue-1" data-identifier="CHT-1">Card 1</div>
                </div>
                <div class="kanban-column" data-status="todo">
                    <div class="kanban-card" data-id="issue-2" data-identifier="CHT-2">Card 2</div>
                    <div class="kanban-card" data-id="issue-3" data-identifier="CHT-3">Card 3</div>
                </div>
            </div>
        `;
    });

    describe('guard conditions', () => {
        it('ignores when not on the board view', () => {
            actions.getCurrentView.mockReturnValue('issues');
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when focused on INPUT', () => {
            handler(makeEvent('j', { target: { tagName: 'INPUT' } }));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when modal is open', () => {
            actions.isModalOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when command palette is open', () => {
            actions.isCommandPaletteOpen.mockReturnValue(true);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        it('ignores when no cards exist', () => {
            document.body.innerHTML = '<div id="kanban-board"></div>';
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });

        // CHT-1215 review finding 1: opening a card's detail view keeps
        // currentView === 'board' and the hidden cards in the DOM — Enter
        // must not re-open the stale board selection from the detail view.
        it('disengages entirely while a detail view is active', () => {
            actions.isDetailViewActive.mockReturnValue(true);
            actions.getSelectedIndex.mockReturnValue(1);
            handler(makeEvent('j'));
            handler(makeEvent('Enter'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });
    });

    describe('j/k navigation (linear cursor across columns in DOM order)', () => {
        it('j moves the cursor to the next card, crossing into the next column', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            const event = makeEvent('j');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
            expect(document.querySelectorAll('.kanban-card')[1].classList.contains('keyboard-selected')).toBe(true);
        });

        it('k moves the cursor to the previous card', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            const event = makeEvent('k');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(1);
        });

        it('j clamps at the last card', () => {
            actions.getSelectedIndex.mockReturnValue(2);
            handler(makeEvent('j'));
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(2);
        });

        it('k clamps at the first card', () => {
            actions.getSelectedIndex.mockReturnValue(0);
            handler(makeEvent('k'));
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(0);
        });
    });

    describe('Enter to open the selected card', () => {
        it('opens the issue detail for the selected card', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            const event = makeEvent('Enter');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.viewIssue).toHaveBeenCalledWith('issue-2');
        });

        it('does nothing when no card is selected (index -1)', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('Enter'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });

        it('does nothing when selectedIndex exceeds the card count', () => {
            actions.getSelectedIndex.mockReturnValue(99);
            handler(makeEvent('Enter'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
        });
    });

    describe('Escape to deselect', () => {
        it('clears the cursor when a card is selected', () => {
            actions.getSelectedIndex.mockReturnValue(1);
            document.querySelectorAll('.kanban-card')[1].classList.add('keyboard-selected');
            const event = makeEvent('Escape');
            handler(event);
            expect(event.preventDefault).toHaveBeenCalled();
            expect(actions.setSelectedIndex).toHaveBeenCalledWith(-1);
            expect(document.querySelectorAll('.keyboard-selected')).toHaveLength(0);
        });

        it('does nothing when no card is selected', () => {
            actions.getSelectedIndex.mockReturnValue(-1);
            handler(makeEvent('Escape'));
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });
    });

    describe('unrecognized keys', () => {
        it('does not act on other keys', () => {
            handler(makeEvent('x'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });
    });
});

// ============================================================================
// Full listener-stack layering: j/k -> Enter -> p (CHT-1215 review finding 1)
// ============================================================================
//
// The earlier "detail view layering" tests exercise createKeyboardHandler in
// isolation; the review showed the real bug lived in the listener STACK:
// createListNavigationHandler registers first and its stopImmediatePropagation
// for p/s/a fired before the global guard or the detail listener ever ran.
// This suite reproduces app.js's actual registration order with real
// KeyboardEvents so stopImmediatePropagation semantics are genuinely
// exercised end-to-end.

describe('Full listener-stack layering: j/k → Enter → p (CHT-1215)', () => {
    let registered;
    let navigateTo;
    let showInlineDropdown;
    let viewIssue;
    let detailShortcut;
    let selectedIndex;

    beforeEach(() => {
        Element.prototype.scrollIntoView = vi.fn();
        document.body.innerHTML = `
            <div id="issues-list">
                <div class="issue-row" data-issue-id="issue-1"><button class="priority-btn"></button>Issue 1</div>
                <div class="issue-row" data-issue-id="issue-2"><button class="priority-btn"></button>Issue 2</div>
            </div>
            <div id="issue-detail-view" class="view hidden"></div>
        `;
        selectedIndex = -1;
        navigateTo = vi.fn();
        showInlineDropdown = vi.fn();
        detailShortcut = vi.fn();

        // Same check app.js wires in: the detail container's hidden class.
        const isDetailViewActive = () => !document.getElementById('issue-detail-view').classList.contains('hidden');

        // Mirrors what the real viewIssue() does to the DOM synchronously:
        // hide all views, reveal the detail container. Crucially it does NOT
        // reset selectedIssueIndex or change currentView — that's the exact
        // state the review flagged.
        viewIssue = vi.fn(() => {
            document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
            document.getElementById('issue-detail-view').classList.remove('hidden');
        });

        registered = [];
        const add = (fn) => {
            document.addEventListener('keydown', fn);
            registered.push(fn);
        };

        // 1. List-nav handler — registered FIRST, exactly as app.js does
        add(createListNavigationHandler({
            getCurrentView: () => 'issues', // stays 'issues' on detail open (real behavior)
            getSelectedIndex: () => selectedIndex,
            setSelectedIndex: (i) => { selectedIndex = i; },
            viewIssue,
            showEditIssueModal: vi.fn(),
            showInlineDropdown,
            isModalOpen: () => false,
            isCommandPaletteOpen: () => false,
            isDetailViewActive,
        }));

        // 2. Global shortcuts — registered second
        add(createKeyboardHandler({
            closeModal: vi.fn(),
            closeSidebar: vi.fn(),
            navigateTo,
            showCreateIssueModal: vi.fn(),
            showKeyboardShortcutsHelp: vi.fn(),
            isModalOpen: () => false,
            focusSearch: vi.fn(),
            closeDropdowns: vi.fn(),
            isDetailViewActive,
        }));

        // 3. Detail-view listener — registered LAST, standing in for
        // issue-detail-view.js's dynamically-added detailKeyHandler
        // (including CHT-1214's 'd' → edit-description branch)
        add((e) => {
            if (document.getElementById('issue-detail-view').classList.contains('hidden')) return;
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
            if (e.key === 'p') detailShortcut('priority');
            if (e.key === 'd') detailShortcut('edit-description');
        });
    });

    afterEach(() => {
        registered.forEach((fn) => document.removeEventListener('keydown', fn));
    });

    function press(key) {
        document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }

    it('p reaches the detail Priority action after j → Enter, not a stale list dropdown or Projects nav', () => {
        press('j'); // select row 0 on the list
        expect(selectedIndex).toBe(0);

        press('Enter'); // open the detail view
        expect(viewIssue).toHaveBeenCalledWith('issue-1');

        press('p');

        expect(showInlineDropdown).not.toHaveBeenCalled(); // list-nav disengaged
        expect(navigateTo).not.toHaveBeenCalled(); // global 'p' deferred
        expect(detailShortcut).toHaveBeenCalledWith('priority'); // detail wins
    });

    it('j on the detail view no longer re-arms the hidden list cursor', () => {
        press('j');
        press('Enter');
        const before = selectedIndex;

        press('j'); // detail-view j (navigate next) — must not touch the list cursor

        expect(selectedIndex).toBe(before);
        // and a follow-up p still cannot be captured by list-nav
        press('p');
        expect(showInlineDropdown).not.toHaveBeenCalled();
        expect(detailShortcut).toHaveBeenCalledWith('priority');
    });

    it('list-nav works normally again once the detail view is hidden', () => {
        press('j');
        press('Enter');
        // Simulate navigating Back to the list
        document.getElementById('issue-detail-view').classList.add('hidden');

        press('j');
        expect(selectedIndex).toBe(1);
    });

    // PR #209 review finding 2: before the guard added 'd', `g d` on an open
    // detail view double-fired — navigateTo('documents') AND the
    // edit-description branch, leaving a zombie editor in the hidden pane.
    describe('g d collision (CHT-1214, PR #209 review finding 2)', () => {
        it('g then d on an open detail view fires the detail action only — never both', () => {
            press('j');
            press('Enter'); // open the detail view

            press('g');
            press('d');

            expect(navigateTo).not.toHaveBeenCalled(); // no Documents nav
            expect(detailShortcut).toHaveBeenCalledTimes(1); // exactly one action fired
            expect(detailShortcut).toHaveBeenCalledWith('edit-description');
        });

        it('g then d on the list navigates to Documents only — the editor branch never fires', () => {
            press('g');
            press('d');

            expect(navigateTo).toHaveBeenCalledTimes(1);
            expect(navigateTo).toHaveBeenCalledWith('documents');
            expect(detailShortcut).not.toHaveBeenCalled();
        });
    });
});
