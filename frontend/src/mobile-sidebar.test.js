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
