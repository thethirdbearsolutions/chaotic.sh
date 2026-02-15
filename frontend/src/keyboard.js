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

/**
 * Creates a handler for Cmd+Enter (submit forms/modals) and Cmd+K (command palette).
 *
 * @param {Object} actions
 * @param {Function} actions.isModalOpen - Returns true if a modal is currently open
 * @param {Function} actions.getModalForm - Returns the form element inside the modal, or null
 * @param {Function} actions.getModalPrimaryBtn - Returns the primary button in the modal, or null
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @param {Function} actions.openCommandPalette - Opens the command palette
 * @param {Function} actions.closeCommandPalette - Closes the command palette
 * @returns {Function} The keydown event handler
 */
export function createModifierKeyHandler(actions) {
    return function handleModifierKeydown(e) {
        if (!(e.metaKey || e.ctrlKey)) return;

        if (e.key === 'Enter') {
            // Consolidates two old handlers: modal-specific submit and global form
            // submit. The old code had both fire on Cmd+Enter, causing double-submit
            // in modals. Now we route to exactly one path.
            if (actions.isModalOpen()) {
                const form = actions.getModalForm();
                if (form) {
                    e.preventDefault();
                    // Modal forms don't need bubbles (dispatched directly on the form)
                    form.dispatchEvent(new Event('submit', { cancelable: true }));
                } else {
                    const primaryBtn = actions.getModalPrimaryBtn();
                    if (primaryBtn && !primaryBtn.disabled) {
                        e.preventDefault();
                        primaryBtn.click();
                    }
                }
            } else {
                // Global form submit: find the closest form from the active element.
                // Uses bubbles:true so parent handlers can observe the event.
                const form = document.activeElement?.closest('form');
                if (form) {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
                }
            }
            return;
        }

        if (e.key === 'k') {
            e.preventDefault();
            if (actions.isCommandPaletteOpen()) {
                actions.closeCommandPalette();
            } else {
                actions.openCommandPalette();
            }
        }
    };
}

/**
 * Updates keyboard selection highlight for list navigation.
 *
 * @param {number} newIndex - The index to select
 * @param {Function} setSelectedIndex - Setter for the selected index state
 * @param {string} [selector='#issues-list .list-item'] - CSS selector for list items
 */
export function updateKeyboardSelection(newIndex, setSelectedIndex, selector = '#issues-list .list-item') {
    const items = document.querySelectorAll(selector);
    if (items.length === 0) return;

    newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

    items.forEach(item => item.classList.remove('keyboard-selected'));

    setSelectedIndex(newIndex);
    items[newIndex].classList.add('keyboard-selected');
    items[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/**
 * Creates a handler for j/k/Enter/e list navigation in the issues view.
 *
 * @param {Object} actions
 * @param {Function} actions.getCurrentView - Returns the current view name
 * @param {Function} actions.getSelectedIndex - Returns the currently selected index
 * @param {Function} actions.setSelectedIndex - Sets the selected index
 * @param {Function} actions.viewIssue - Opens an issue by ID
 * @param {Function} actions.showEditIssueModal - Opens edit modal for an issue
 * @param {Function} actions.isModalOpen - Returns true if a modal is open
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @returns {Function} The keydown event handler
 */
export function createListNavigationHandler(actions) {
    return function handleListNavigation(e) {
        if (actions.getCurrentView() !== 'issues') return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        if (actions.isModalOpen()) return;
        if (actions.isCommandPaletteOpen()) return;

        const items = document.querySelectorAll('#issues-list .list-item');
        if (items.length === 0) return;

        const selectedIndex = actions.getSelectedIndex();
        switch (e.key) {
            case 'j':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex + 1, actions.setSelectedIndex);
                break;
            case 'k':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex - 1, actions.setSelectedIndex);
                break;
            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const issueId = items[selectedIndex].dataset.id;
                    if (issueId && !issueId.startsWith('temp-')) {
                        actions.viewIssue(issueId);
                    }
                }
                break;
            case 'e':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const issueId = items[selectedIndex].dataset.id;
                    if (issueId && !issueId.startsWith('temp-')) {
                        actions.showEditIssueModal(issueId);
                    }
                }
                break;
        }
    };
}
