import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createKeyboardHandler } from './keyboard.js';

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
