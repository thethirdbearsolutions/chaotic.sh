/**
 * Keyboard shortcuts module
 *
 * Extracts keyboard handler logic from app.js into a testable module.
 * The handler is registered as a document keydown listener.
 */

/**
 * Creates a keyboard handler with the given action callbacks.
 *
 * @param {Object} actions - Callback functions for keyboard actions
 * @param {Function} actions.closeModal - Close the current modal
 * @param {Function} actions.navigateTo - Navigate to a view (e.g., 'issues')
 * @param {Function} actions.showCreateIssueModal - Open the create issue modal
 * @param {Function} actions.showKeyboardShortcutsHelp - Show the shortcuts help modal
 * @param {Function} actions.isModalOpen - Returns true if a modal is currently open
 * @param {Function} actions.focusSearch - Focus the issue search input
 * @param {Function} actions.closeDropdowns - Close any open dropdown menus
 * @returns {Function} The keydown event handler
 */
export function createKeyboardHandler(actions) {
    let waitingForNavKey = false;
    let navKeyTimeout = null;

    return function handleKeydown(e) {
        // Don't intercept system shortcuts (Cmd+C, Ctrl+V, etc.)
        if (e.metaKey || e.ctrlKey || e.altKey) {
            return;
        }

        // Don't trigger shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            // Allow Escape to blur input fields
            if (e.key === 'Escape') {
                e.target.blur();
            }
            return;
        }

        const modalOpen = actions.isModalOpen();

        if (e.key === 'Escape') {
            e.preventDefault();
            if (modalOpen) {
                actions.closeModal();
            } else if (document.body.classList.contains('sidebar-open') && actions.closeSidebar) {
                actions.closeSidebar();
            } else {
                actions.closeDropdowns();
            }
            return;
        }

        if (modalOpen) return;

        // Navigation shortcuts (g + key for "go to")
        if (e.key === 'g') {
            waitingForNavKey = true;
            clearTimeout(navKeyTimeout);
            navKeyTimeout = setTimeout(() => { waitingForNavKey = false; }, 1000);
            return;
        }

        if (waitingForNavKey) {
            waitingForNavKey = false;
            clearTimeout(navKeyTimeout);
            switch (e.key) {
                case 'i': actions.navigateTo('issues'); break;
                case 'p': actions.navigateTo('projects'); break;
                case 's': actions.navigateTo('sprints'); break;
                case 'd': actions.navigateTo('documents'); break;
                case 't': actions.navigateTo('team'); break;
            }
            return;
        }

        // Direct shortcuts
        switch (e.key) {
            case 'c':
                e.preventDefault();
                actions.showCreateIssueModal();
                break;
            case 'm':
                e.preventDefault();
                actions.navigateTo('my-issues');
                break;
            case 'i':
                e.preventDefault();
                actions.navigateTo('issues');
                break;
            case 'b':
                e.preventDefault();
                actions.navigateTo('board');
                break;
            case 'p':
                e.preventDefault();
                actions.navigateTo('projects');
                break;
            case '?':
                e.preventDefault();
                actions.showKeyboardShortcutsHelp();
                break;
            case '/':
                e.preventDefault();
                actions.focusSearch();
                break;
        }
    };
}
