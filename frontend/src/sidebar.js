/**
 * Mobile sidebar management module (CHT-1046)
 *
 * Handles sidebar toggle, close, ARIA updates, focus trap, and resize cleanup.
 * Extracted from app.js.
 */

// Shared focusable-element selector for sidebar focus trap (CHT-883)
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function updateSidebarAria() {
    const isOpen = document.body.classList.contains('sidebar-open');
    const btn = document.getElementById('hamburger-btn');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));

    // Prevent screen readers from accessing background content when sidebar is open (CHT-899)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        if (isOpen) {
            mainContent.setAttribute('inert', '');
        } else {
            mainContent.removeAttribute('inert');
        }
    }
}

export function toggleSidebar() {
    const wasOpen = document.body.classList.contains('sidebar-open');
    document.body.classList.toggle('sidebar-open');
    updateSidebarAria();
    if (wasOpen) {
        // Closing: return focus to hamburger button
        const btn = document.getElementById('hamburger-btn');
        if (btn) btn.focus();
    } else {
        // Opening: focus first focusable element in sidebar
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            const firstFocusable = sidebar.querySelector(FOCUSABLE_SELECTOR);
            if (firstFocusable) firstFocusable.focus();
        }
    }
}

export function closeSidebar() {
    const wasOpen = document.body.classList.contains('sidebar-open');
    document.body.classList.remove('sidebar-open');
    updateSidebarAria();
    if (wasOpen) {
        const btn = document.getElementById('hamburger-btn');
        if (btn) btn.focus();
    }
}

// Focus trap for mobile sidebar (CHT-883)
// Escape is handled by keyboard.js which already calls closeSidebar()
document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('sidebar-open')) return;
    if (e.key !== 'Tab') return;

    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const focusable = sidebar.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // If focus is outside the sidebar, redirect into it
    if (!sidebar.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
    }

    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
    }
});

// Clean up sidebar-open class when resizing past mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('sidebar-open')) {
        closeSidebar();
    }
});
