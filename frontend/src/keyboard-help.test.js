import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('./ui.js', () => ({
    showModal: vi.fn(),
}));

vi.mock('./utils.js', () => ({
    escapeHtml: vi.fn((s) => s),
}));

import { showKeyboardShortcutsHelp, SHORTCUT_GROUPS } from './keyboard-help.js';
import { showModal } from './ui.js';

describe('keyboard-help', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <div id="modal-title"></div>
            <div id="modal-content"></div>
        `;
    });

    describe('SHORTCUT_GROUPS', () => {
        it('has groups for all contexts', () => {
            const titles = SHORTCUT_GROUPS.map(g => g.title);
            expect(titles).toContain('Navigation');
            expect(titles).toContain('Actions');
            expect(titles).toContain('Issue List');
            expect(titles).toContain('Issue Detail');
            expect(titles).toContain('Documents');
            expect(titles).toContain('General');
        });

        it('has non-empty shortcuts in each group', () => {
            for (const group of SHORTCUT_GROUPS) {
                expect(group.shortcuts.length).toBeGreaterThan(0);
                for (const s of group.shortcuts) {
                    expect(s.key).toBeTruthy();
                    expect(s.description).toBeTruthy();
                }
            }
        });
    });

    describe('showKeyboardShortcutsHelp', () => {
        it('sets modal title', () => {
            showKeyboardShortcutsHelp();
            expect(document.getElementById('modal-title').textContent).toBe('Keyboard Shortcuts');
        });

        it('calls showModal', () => {
            showKeyboardShortcutsHelp();
            expect(showModal).toHaveBeenCalled();
        });

        it('renders all shortcut groups', () => {
            showKeyboardShortcutsHelp();
            const content = document.getElementById('modal-content').innerHTML;
            for (const group of SHORTCUT_GROUPS) {
                expect(content).toContain(group.title);
            }
        });

        it('renders shortcuts with kbd elements', () => {
            showKeyboardShortcutsHelp();
            const kbds = document.querySelectorAll('.kbd-hint');
            expect(kbds.length).toBeGreaterThan(0);
        });

        it('renders shortcut descriptions', () => {
            showKeyboardShortcutsHelp();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('Dashboard');
            expect(content).toContain('Command palette');
            expect(content).toContain('Focus comment box');
        });

        it('uses shortcuts-help container class', () => {
            showKeyboardShortcutsHelp();
            expect(document.querySelector('.shortcuts-help')).toBeTruthy();
        });

        it('renders group titles with correct class', () => {
            showKeyboardShortcutsHelp();
            const titles = document.querySelectorAll('.shortcut-group-title');
            expect(titles.length).toBe(SHORTCUT_GROUPS.length);
        });

        it('renders shortcut rows with correct class', () => {
            showKeyboardShortcutsHelp();
            const rows = document.querySelectorAll('.shortcut-row');
            const totalShortcuts = SHORTCUT_GROUPS.reduce((sum, g) => sum + g.shortcuts.length, 0);
            expect(rows.length).toBe(totalShortcuts);
        });

        it('splits compound keys with separator', () => {
            showKeyboardShortcutsHelp();
            const separators = document.querySelectorAll('.shortcut-separator');
            // Keys like "j / k" produce separators
            expect(separators.length).toBeGreaterThan(0);
        });

        it('renders navigation shortcuts', () => {
            showKeyboardShortcutsHelp();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('All Issues');
            expect(content).toContain('Board');
            expect(content).toContain('Projects');
            expect(content).toContain('Sprints');
            expect(content).toContain('Documents');
            expect(content).toContain('Team');
        });

        it('renders issue detail shortcuts', () => {
            showKeyboardShortcutsHelp();
            const content = document.getElementById('modal-content').innerHTML;
            expect(content).toContain('Status');
            expect(content).toContain('Priority');
            expect(content).toContain('Assignee');
            expect(content).toContain('Labels');
            expect(content).toContain('Estimate');
            expect(content).toContain('Type');
        });
    });
});
