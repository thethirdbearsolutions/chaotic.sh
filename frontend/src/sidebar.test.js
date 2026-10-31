import { describe, it, expect, beforeEach } from 'vitest';
import { toggleSidebar, closeSidebar } from './sidebar.js';

describe('sidebar ARIA dialog semantics (CHT-899)', () => {
    let sidebar;
    let mainContent;
    let hamburgerBtn;

    beforeEach(() => {
        document.body.className = '';
        document.body.innerHTML = `
            <button id="hamburger-btn"></button>
            <aside class="sidebar" aria-label="Navigation">
                <a href="/home">Home</a>
                <a href="/settings">Settings</a>
            </aside>
            <div class="sidebar-backdrop"></div>
            <div class="main-content">
                <input type="text" />
            </div>
        `;
        sidebar = document.querySelector('.sidebar');
        mainContent = document.querySelector('.main-content');
        hamburgerBtn = document.getElementById('hamburger-btn');
    });

    it('does not have role="dialog" when sidebar is closed', () => {
        expect(sidebar.hasAttribute('role')).toBe(false);
        expect(sidebar.hasAttribute('aria-modal')).toBe(false);
    });

    it('applies role="dialog" and aria-modal when sidebar opens', () => {
        toggleSidebar();
        expect(sidebar.getAttribute('role')).toBe('dialog');
        expect(sidebar.getAttribute('aria-modal')).toBe('true');
    });

    it('removes role="dialog" and aria-modal when sidebar closes', () => {
        toggleSidebar(); // open
        toggleSidebar(); // close
        expect(sidebar.hasAttribute('role')).toBe(false);
        expect(sidebar.hasAttribute('aria-modal')).toBe(false);
    });

    it('sets inert on main-content when sidebar opens', () => {
        toggleSidebar();
        expect(mainContent.hasAttribute('inert')).toBe(true);
    });

    it('removes inert from main-content when sidebar closes', () => {
        toggleSidebar(); // open
        toggleSidebar(); // close
        expect(mainContent.hasAttribute('inert')).toBe(false);
    });

    it('removes inert via closeSidebar()', () => {
        toggleSidebar(); // open
        closeSidebar();
        expect(mainContent.hasAttribute('inert')).toBe(false);
        expect(sidebar.hasAttribute('role')).toBe(false);
    });

    it('sets aria-expanded on hamburger button', () => {
        toggleSidebar();
        expect(hamburgerBtn.getAttribute('aria-expanded')).toBe('true');
        toggleSidebar();
        expect(hamburgerBtn.getAttribute('aria-expanded')).toBe('false');
    });

    it('handles missing main-content gracefully', () => {
        mainContent.remove();
        expect(() => toggleSidebar()).not.toThrow();
        expect(sidebar.getAttribute('role')).toBe('dialog');
    });

    it('handles missing sidebar gracefully', () => {
        sidebar.remove();
        expect(() => toggleSidebar()).not.toThrow();
    });
});

describe('sidebar focus skips hidden dropdown items (CHT-1929)', () => {
    beforeEach(() => {
        document.body.className = '';
        document.body.innerHTML = `
            <button id="hamburger-btn"></button>
            <aside class="sidebar">
                <div id="team-dropdown" class="dropdown hidden">
                    <button class="dropdown-item">Team A</button>
                </div>
                <a href="/home" id="first-visible">Home</a>
                <a href="/settings" id="last-visible">Settings</a>
                <div id="user-dropdown" class="dropdown hidden">
                    <button class="dropdown-item">Sign Out</button>
                </div>
            </aside>
            <div class="main-content"></div>
        `;
    });

    it('focuses the first visible control on open, not a hidden dropdown item', () => {
        toggleSidebar();
        expect(document.activeElement.id).toBe('first-visible');
    });

    it('wraps Tab from the last visible control to the first', () => {
        toggleSidebar();
        document.getElementById('last-visible').focus();
        const e = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(e);
        expect(e.defaultPrevented).toBe(true);
        expect(document.activeElement.id).toBe('first-visible');
    });

    it('wraps Shift+Tab from the first visible control to the last', () => {
        toggleSidebar();
        const e = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        document.dispatchEvent(e);
        expect(e.defaultPrevented).toBe(true);
        expect(document.activeElement.id).toBe('last-visible');
    });
});
