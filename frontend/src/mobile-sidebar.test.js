import { describe, it, expect, beforeEach } from 'vitest';

// Import app.js to get toggleSidebar/closeSidebar on window
import './app.js';

describe('Mobile sidebar toggle (CHT-869)', () => {
    beforeEach(() => {
        document.body.className = '';
        document.body.innerHTML = `
            <button id="hamburger-btn" aria-expanded="false"></button>
        `;
    });

    it('toggleSidebar adds sidebar-open class', () => {
        window.toggleSidebar();
        expect(document.body.classList.contains('sidebar-open')).toBe(true);
    });

    it('toggleSidebar removes sidebar-open class when already open', () => {
        document.body.classList.add('sidebar-open');
        window.toggleSidebar();
        expect(document.body.classList.contains('sidebar-open')).toBe(false);
    });

    it('closeSidebar removes sidebar-open class', () => {
        document.body.classList.add('sidebar-open');
        window.closeSidebar();
        expect(document.body.classList.contains('sidebar-open')).toBe(false);
    });

    it('closeSidebar is no-op when sidebar is already closed', () => {
        window.closeSidebar();
        expect(document.body.classList.contains('sidebar-open')).toBe(false);
    });

    it('toggleSidebar sets aria-expanded to true when opening', () => {
        window.toggleSidebar();
        expect(document.getElementById('hamburger-btn').getAttribute('aria-expanded')).toBe('true');
    });

    it('toggleSidebar sets aria-expanded to false when closing', () => {
        document.body.classList.add('sidebar-open');
        document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'true');
        window.toggleSidebar();
        expect(document.getElementById('hamburger-btn').getAttribute('aria-expanded')).toBe('false');
    });

    it('closeSidebar sets aria-expanded to false', () => {
        document.body.classList.add('sidebar-open');
        document.getElementById('hamburger-btn').setAttribute('aria-expanded', 'true');
        window.closeSidebar();
        expect(document.getElementById('hamburger-btn').getAttribute('aria-expanded')).toBe('false');
    });
});

describe('Mobile sidebar focus management (CHT-883)', () => {
    beforeEach(() => {
        document.body.className = '';
        document.body.innerHTML = `
            <button id="hamburger-btn" aria-expanded="false"></button>
            <aside class="sidebar">
                <a class="nav-item" href="#" data-view="my-issues">My Issues</a>
                <a class="nav-item" href="#" data-view="issues">Issues</a>
                <a class="nav-item" href="#" data-view="board">Board</a>
            </aside>
        `;
    });

    it('focuses first sidebar element when opening', () => {
        window.toggleSidebar();
        expect(document.activeElement).toBe(document.querySelector('.sidebar a'));
    });

    it('returns focus to hamburger button when closing via toggle', () => {
        document.body.classList.add('sidebar-open');
        window.toggleSidebar();
        expect(document.activeElement).toBe(document.getElementById('hamburger-btn'));
    });

    it('returns focus to hamburger button when closing via closeSidebar', () => {
        document.body.classList.add('sidebar-open');
        window.closeSidebar();
        expect(document.activeElement).toBe(document.getElementById('hamburger-btn'));
    });

    it('does not move focus when closeSidebar called on already-closed sidebar', () => {
        // Focus a sidebar link (not hamburger) to verify the guard actually prevents focus change
        const firstLink = document.querySelector('.sidebar a');
        firstLink.focus();
        window.closeSidebar();
        // Should not change focus since sidebar wasn't open
        expect(document.activeElement).toBe(firstLink);
    });

    it('redirects focus into sidebar when Tab pressed from outside', () => {
        document.body.classList.add('sidebar-open');
        // Focus is on hamburger (outside sidebar)
        document.getElementById('hamburger-btn').focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        // Should redirect focus to first sidebar element
        expect(document.activeElement).toBe(document.querySelector('.sidebar a'));
    });

    it('traps focus forward at last element', () => {
        document.body.classList.add('sidebar-open');
        const links = document.querySelectorAll('.sidebar a');
        links[links.length - 1].focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        expect(document.activeElement).toBe(links[0]);
    });

    it('traps focus backward at first element', () => {
        document.body.classList.add('sidebar-open');
        const links = document.querySelectorAll('.sidebar a');
        links[0].focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        expect(document.activeElement).toBe(links[links.length - 1]);
    });

    it('does not trap focus when sidebar is closed', () => {
        const links = document.querySelectorAll('.sidebar a');
        links[links.length - 1].focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        // Should not have prevented default or changed focus
        expect(event.defaultPrevented).toBe(false);
    });

});
