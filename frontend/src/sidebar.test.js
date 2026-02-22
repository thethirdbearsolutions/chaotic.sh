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
