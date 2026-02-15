import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    createKeyboardHandler,
    createModifierKeyHandler,
    createListNavigationHandler,
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
                <div class="list-item" data-id="issue-1">Issue 1</div>
                <div class="list-item" data-id="issue-2">Issue 2</div>
                <div class="list-item" data-id="issue-3">Issue 3</div>
            </div>
        `;
    });

    it('selects the given index', () => {
        updateKeyboardSelection(1, setIndex);
        expect(setIndex).toHaveBeenCalledWith(1);
        const items = document.querySelectorAll('.list-item');
        expect(items[1].classList.contains('keyboard-selected')).toBe(true);
        expect(items[0].classList.contains('keyboard-selected')).toBe(false);
    });

    it('clamps to 0 for negative index', () => {
        updateKeyboardSelection(-5, setIndex);
        expect(setIndex).toHaveBeenCalledWith(0);
        expect(document.querySelectorAll('.list-item')[0].classList.contains('keyboard-selected')).toBe(true);
    });

    it('clamps to last index for overflow', () => {
        updateKeyboardSelection(100, setIndex);
        expect(setIndex).toHaveBeenCalledWith(2);
        expect(document.querySelectorAll('.list-item')[2].classList.contains('keyboard-selected')).toBe(true);
    });

    it('removes previous selection', () => {
        document.querySelectorAll('.list-item')[0].classList.add('keyboard-selected');
        updateKeyboardSelection(2, setIndex);
        expect(document.querySelectorAll('.list-item')[0].classList.contains('keyboard-selected')).toBe(false);
        expect(document.querySelectorAll('.list-item')[2].classList.contains('keyboard-selected')).toBe(true);
    });

    it('does nothing when no list items exist', () => {
        document.body.innerHTML = '<div id="issues-list"></div>';
        updateKeyboardSelection(0, setIndex);
        expect(setIndex).not.toHaveBeenCalled();
    });

    it('scrolls selected item into view', () => {
        const scrollSpy = vi.fn();
        document.querySelectorAll('.list-item')[1].scrollIntoView = scrollSpy;
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
            isModalOpen: vi.fn().mockReturnValue(false),
            isCommandPaletteOpen: vi.fn().mockReturnValue(false),
        };
        handler = createListNavigationHandler(actions);
        Element.prototype.scrollIntoView = vi.fn();
        document.body.innerHTML = `
            <div id="issues-list">
                <div class="list-item" data-id="issue-1">Issue 1</div>
                <div class="list-item" data-id="issue-2">Issue 2</div>
                <div class="list-item" data-id="issue-3">Issue 3</div>
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
            document.querySelector('.list-item').dataset.id = 'temp-123';
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
            document.querySelector('.list-item').dataset.id = 'temp-456';
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

    describe('unrecognized keys', () => {
        it('does not act on other keys', () => {
            handler(makeEvent('x'));
            expect(actions.viewIssue).not.toHaveBeenCalled();
            expect(actions.showEditIssueModal).not.toHaveBeenCalled();
            expect(actions.setSelectedIndex).not.toHaveBeenCalled();
        });
    });
});
