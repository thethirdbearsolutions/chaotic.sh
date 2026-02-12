/**
 * Tests for command-palette.js module
 * Written BEFORE extraction per the extraction strategy.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import {
    isOpen,
    open,
    close,
    filter,
    getFiltered,
    getSelectedIndex,
    selectCommand,
    executeCommand,
    handleKeydown,
    setCommands,
} from './command-palette.js';

describe('command-palette module', () => {
    let mockCommands;
    let actionSpy1, actionSpy2, actionSpy3;

    beforeEach(() => {
        // Set up DOM
        document.body.innerHTML = '';

        // Create mock commands
        actionSpy1 = vi.fn();
        actionSpy2 = vi.fn();
        actionSpy3 = vi.fn();

        mockCommands = [
            { id: 'nav-home', title: 'Home', subtitle: 'Go to home', icon: '🏠', category: 'Navigation', action: actionSpy1 },
            { id: 'create-issue', title: 'Create Issue', subtitle: 'Add a new issue', icon: '➕', category: 'Create', action: actionSpy2 },
            { id: 'search', title: 'Search', subtitle: 'Find items', icon: '🔍', category: 'Actions', action: actionSpy3 },
        ];

        setCommands(mockCommands);
    });

    afterEach(() => {
        // Clean up
        close();
        document.body.innerHTML = '';
    });

    describe('isOpen', () => {
        it('returns false initially', () => {
            expect(isOpen()).toBe(false);
        });

        it('returns true after opening', () => {
            open();
            expect(isOpen()).toBe(true);
        });

        it('returns false after closing', () => {
            open();
            close();
            expect(isOpen()).toBe(false);
        });
    });

    describe('open', () => {
        it('creates overlay element', () => {
            open();
            const overlay = document.getElementById('command-palette-overlay');
            expect(overlay).not.toBeNull();
        });

        it('renders all commands initially', () => {
            open();
            const results = document.getElementById('command-results');
            expect(results.innerHTML).toContain('Home');
            expect(results.innerHTML).toContain('Create Issue');
            expect(results.innerHTML).toContain('Search');
        });

        it('does nothing if already open', () => {
            open();
            const _overlay1 = document.getElementById('command-palette-overlay');
            open();
            const overlays = document.querySelectorAll('#command-palette-overlay');
            expect(overlays.length).toBe(1);
        });

        it('groups commands by category', () => {
            open();
            const results = document.getElementById('command-results');
            expect(results.innerHTML).toContain('Navigation');
            expect(results.innerHTML).toContain('Create');
            expect(results.innerHTML).toContain('Actions');
        });
    });

    describe('close', () => {
        it('removes overlay element', () => {
            open();
            close();
            const overlay = document.getElementById('command-palette-overlay');
            expect(overlay).toBeNull();
        });

        it('does nothing if not open', () => {
            // Should not throw
            close();
            expect(isOpen()).toBe(false);
        });
    });

    describe('filter', () => {
        beforeEach(() => {
            open();
        });

        it('filters commands by title', () => {
            filter('home');
            expect(getFiltered()).toHaveLength(1);
            expect(getFiltered()[0].id).toBe('nav-home');
        });

        it('filters commands by subtitle', () => {
            filter('new issue');
            expect(getFiltered()).toHaveLength(1);
            expect(getFiltered()[0].id).toBe('create-issue');
        });

        it('filters commands by category', () => {
            filter('navigation');
            expect(getFiltered()).toHaveLength(1);
            expect(getFiltered()[0].id).toBe('nav-home');
        });

        it('is case insensitive', () => {
            filter('HOME');
            expect(getFiltered()).toHaveLength(1);
            expect(getFiltered()[0].id).toBe('nav-home');
        });

        it('shows all commands for empty query', () => {
            filter('');
            expect(getFiltered()).toHaveLength(3);
        });

        it('resets selection to first item', () => {
            selectCommand(2);
            filter('home');
            expect(getSelectedIndex()).toBe(0);
        });

        it('updates the rendered results', () => {
            filter('home');
            const results = document.getElementById('command-results');
            expect(results.innerHTML).toContain('Home');
            expect(results.innerHTML).not.toContain('Create Issue');
        });

        it('shows empty state when no matches', () => {
            filter('xyz123');
            const results = document.getElementById('command-results');
            expect(results.innerHTML).toContain('No commands found');
        });
    });

    describe('selectCommand', () => {
        beforeEach(() => {
            open();
        });

        it('updates selected index', () => {
            selectCommand(1);
            expect(getSelectedIndex()).toBe(1);
        });

        it('updates selected class in DOM', () => {
            selectCommand(1);
            const items = document.querySelectorAll('.command-item');
            expect(items[0].classList.contains('selected')).toBe(false);
            expect(items[1].classList.contains('selected')).toBe(true);
        });
    });

    describe('executeCommand', () => {
        beforeEach(() => {
            open();
        });

        it('calls action of selected command', () => {
            executeCommand(0);
            expect(actionSpy1).toHaveBeenCalled();
        });

        it('closes palette after execution', () => {
            executeCommand(0);
            expect(isOpen()).toBe(false);
        });

        it('does nothing for invalid index', () => {
            executeCommand(99);
            expect(actionSpy1).not.toHaveBeenCalled();
            expect(actionSpy2).not.toHaveBeenCalled();
        });
    });

    describe('handleKeydown', () => {
        beforeEach(() => {
            open();
        });

        it('ArrowDown moves selection down', () => {
            const e = { key: 'ArrowDown', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(getSelectedIndex()).toBe(1);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('ArrowDown stops at last item', () => {
            selectCommand(2);
            const e = { key: 'ArrowDown', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(getSelectedIndex()).toBe(2);
        });

        it('ArrowUp moves selection up', () => {
            selectCommand(2);
            const e = { key: 'ArrowUp', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(getSelectedIndex()).toBe(1);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('ArrowUp stops at first item', () => {
            const e = { key: 'ArrowUp', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(getSelectedIndex()).toBe(0);
        });

        it('Enter executes selected command', () => {
            selectCommand(1);
            const e = { key: 'Enter', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(actionSpy2).toHaveBeenCalled();
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('Escape closes palette', () => {
            const e = { key: 'Escape', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(isOpen()).toBe(false);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('ignores other keys', () => {
            const e = { key: 'a', preventDefault: vi.fn() };
            handleKeydown(e);
            expect(e.preventDefault).not.toHaveBeenCalled();
        });
    });

    describe('overlay click', () => {
        it('closes on overlay click (not palette click)', () => {
            open();
            const overlay = document.getElementById('command-palette-overlay');

            // Simulate click on overlay (target === overlay)
            const clickEvent = new MouseEvent('click', { bubbles: true });
            Object.defineProperty(clickEvent, 'target', { value: overlay });
            overlay.onclick(clickEvent);

            expect(isOpen()).toBe(false);
        });
    });
});
