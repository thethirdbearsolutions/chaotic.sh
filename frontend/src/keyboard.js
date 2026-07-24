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
 * @param {Function} [actions.isDetailViewActive] - Returns true if the issue
 *   detail view is currently showing. Detail view's own hotkey listener is
 *   registered dynamically per-view (always AFTER this global one), so bare
 *   'p'/'c' here would otherwise fire first and preempt the documented
 *   detail-view actions (Priority, focus comment box) with Projects/Create.
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
            // CHT-1215 (review finding 2): 6 of the g-prefix targets collide
            // with the issue detail view's own s/p/a/e/t/d shortcut map (its
            // listener is registered later and would double-fire against the
            // page being navigated away — startViewTransition defers the DOM
            // swap past this synchronous dispatch). Same policy as the bare
            // 'p'/'c' cases below: no-op here so the detail listener wins.
            // 'd' joined the list with CHT-1214's edit-description hotkey
            // (PR #209 review finding 2) — without the guard, `g d` on a
            // detail view navigated to Documents AND left a zombie
            // description editor open in the hidden detail pane.
            if (actions.isDetailViewActive?.() && ['p', 's', 't', 'e', 'a', 'd'].includes(e.key)) {
                return;
            }
            switch (e.key) {
                case 'i': actions.navigateTo('issues'); break;
                case 'p': actions.navigateTo('projects'); break;
                case 's': actions.navigateTo('sprints'); break;
                case 'd': actions.navigateTo('documents'); break;
                case 't': actions.navigateTo('team'); break;
                case 'e': actions.navigateTo('epics'); break;
                case 'r': actions.navigateTo('rituals'); break;
                case 'a': actions.navigateTo('approvals'); break;
                case 'w': actions.navigateTo('inbox'); break; // 'w' = awaiting you (CHT-1250)
                case ',': actions.navigateTo('settings'); break;
            }
            return;
        }

        // Direct shortcuts
        switch (e.key) {
            case 'c':
                // CHT-1215: detail view's own 'c' (focus comment box) can never
                // preempt this via registration order — no-op here instead so
                // its listener (which runs after this one) gets the keystroke.
                if (actions.isDetailViewActive?.()) break;
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
                // CHT-1215: same as 'c' above — detail view's 'p' (Priority)
                // takes precedence over the global Projects shortcut.
                if (actions.isDetailViewActive?.()) break;
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
            } else if (!actions.isModalOpen()) {
                // CHT-1215: don't stack the palette on top of an open modal —
                // Escape's priority (modal > sidebar > dropdowns) would then
                // close the modal underneath instead of the topmost palette.
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
export function updateKeyboardSelection(newIndex, setSelectedIndex, selector = '#issues-list .issue-row') {
    const items = document.querySelectorAll(selector);
    if (items.length === 0) return;

    newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

    items.forEach(item => item.classList.remove('keyboard-selected'));

    setSelectedIndex(newIndex);
    items[newIndex].classList.add('keyboard-selected');
    items[newIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/**
 * Creates a handler for j/k (or arrow keys)/Enter/e list navigation in the issues view.
 *
 * @param {Object} actions
 * @param {Function} actions.getCurrentView - Returns the current view name
 * @param {Function} actions.getSelectedIndex - Returns the currently selected index
 * @param {Function} actions.setSelectedIndex - Sets the selected index
 * @param {Function} actions.viewIssue - Opens an issue by ID
 * @param {Function} actions.showEditIssueModal - Opens edit modal for an issue
 * @param {Function} actions.showInlineDropdown - Opens an inline dropdown for a field
 * @param {Function} actions.isModalOpen - Returns true if a modal is open
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @param {Function} [actions.isDetailViewActive] - Returns true if a detail
 *   view is overlaying this handler's list; the handler disengages entirely
 *   while one is up (CHT-1215 review finding 1)
 * @returns {Function} The keydown event handler
 */
export function createListNavigationHandler(actions) {
    const selector = '#issues-list .issue-row';

    function getSelectedItem(selectedIndex) {
        if (selectedIndex < 0) return null;
        const items = document.querySelectorAll(selector);
        return items[selectedIndex] || null;
    }

    function triggerInlineDropdown(e, selectedIndex, dropdownType, btnClass) {
        const item = getSelectedItem(selectedIndex);
        if (!item) return;
        const issueId = item.dataset.issueId;
        if (!issueId || issueId.startsWith('temp-')) return;
        e.preventDefault();
        e.stopImmediatePropagation(); // Prevent global shortcuts (e.g. 'p' → projects)
        const btn = item.querySelector(`.${btnClass}`);
        if (btn && actions.showInlineDropdown) {
            actions.showInlineDropdown(e, dropdownType, issueId, btn);
        }
    }

    return function handleListNavigation(e) {
        if (actions.getCurrentView() !== 'issues') return;
        // CHT-1215 (review finding 1): opening a detail view hides the list
        // via CSS but leaves currentView === 'issues' and the .issue-row
        // elements in the DOM, so without this guard the handler stays live
        // against the hidden list — its stopImmediatePropagation for
        // p/s/a fires before the detail view's own listener (registered
        // later) ever sees the key, killing the documented detail shortcuts.
        if (actions.isDetailViewActive?.()) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        // Yield to the sidebar's own roving-focus handler while a nav link is
        // focused — these list handlers register earlier and would otherwise
        // ALSO move the list cursor on the same arrow press (CHT-1289 review).
        if (e.target.closest?.('.sidebar-nav')) return;
        if (actions.isModalOpen()) return;
        if (actions.isCommandPaletteOpen()) return;
        // Once an inline field dropdown (opened here via s/p/a) is up, its own
        // handler owns Arrow/Enter — yield so we don't move the list cursor
        // underneath it (CHT-1290).
        if (actions.isInlineDropdownOpen?.()) return;

        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const selectedIndex = actions.getSelectedIndex();
        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex + 1, actions.setSelectedIndex, selector);
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex - 1, actions.setSelectedIndex, selector);
                break;
            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const issueId = items[selectedIndex].dataset.issueId;
                    if (issueId && !issueId.startsWith('temp-')) {
                        actions.viewIssue(issueId);
                    }
                }
                break;
            case 'e':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const issueId = items[selectedIndex].dataset.issueId;
                    if (issueId && !issueId.startsWith('temp-')) {
                        actions.showEditIssueModal(issueId);
                    }
                }
                break;
            case 's':
                triggerInlineDropdown(e, selectedIndex, 'status', 'status-btn');
                break;
            case 'p':
                triggerInlineDropdown(e, selectedIndex, 'priority', 'priority-btn');
                break;
            case 'a':
                triggerInlineDropdown(e, selectedIndex, 'assignee', 'assignee-btn');
                break;
            case 'Escape':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('keyboard-selected'));
                    actions.setSelectedIndex(-1);
                }
                break;
        }
    };
}

/**
 * Creates a handler for j/k (or arrow keys)/Enter/Escape list navigation in the documents view.
 *
 * @param {Object} actions
 * @param {Function} actions.getCurrentView - Returns the current view name
 * @param {Function} actions.getSelectedIndex - Returns the currently selected index
 * @param {Function} actions.setSelectedIndex - Sets the selected index
 * @param {Function} actions.viewDocument - Opens a document by ID
 * @param {Function} actions.showEditDocumentModal - Opens edit modal for a document
 * @param {Function} actions.isModalOpen - Returns true if a modal is open
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @param {Function} [actions.isDetailViewActive] - Returns true if a detail
 *   view is overlaying this handler's list; the handler disengages entirely
 *   while one is up (CHT-1215 review finding 1)
 * @returns {Function} The keydown event handler
 */
export function createDocListNavigationHandler(actions) {
    const selector = '#documents-list .list-item, #documents-list .grid-item';
    return function handleDocListNavigation(e) {
        if (actions.getCurrentView() !== 'documents') return;
        // CHT-1215 (review finding 1): same disengage as the issues list —
        // document detail leaves currentView === 'documents' and the hidden
        // .list-item elements in the DOM.
        if (actions.isDetailViewActive?.()) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        // Yield to the sidebar's own roving-focus handler while a nav link is
        // focused — these list handlers register earlier and would otherwise
        // ALSO move the list cursor on the same arrow press (CHT-1289 review).
        if (e.target.closest?.('.sidebar-nav')) return;
        if (actions.isModalOpen()) return;
        if (actions.isCommandPaletteOpen()) return;

        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const selectedIndex = actions.getSelectedIndex();
        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex + 1, actions.setSelectedIndex, selector);
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex - 1, actions.setSelectedIndex, selector);
                break;
            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const docId = items[selectedIndex].dataset.documentId;
                    if (docId) actions.viewDocument(docId);
                }
                break;
            case 'e':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const docId = items[selectedIndex].dataset.documentId;
                    if (docId && actions.showEditDocumentModal) actions.showEditDocumentModal(docId);
                }
                break;
            case 'Escape':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('keyboard-selected'));
                    actions.setSelectedIndex(-1);
                }
                break;
        }
    };
}

/**
 * Creates a handler for j/k (or arrow keys)/Enter/Escape list navigation in the inbox view
 * (CHT-1250). Same shape as createDocListNavigationHandler -- Enter opens
 * the selected entry (marks it read + deep-links), no separate 'e' action.
 *
 * @param {Object} actions
 * @param {Function} actions.getCurrentView - Returns the current view name
 * @param {Function} actions.getSelectedIndex - Returns the currently selected index
 * @param {Function} actions.setSelectedIndex - Sets the selected index
 * @param {Function} actions.openInboxEntry - Opens the entry at a given DOM row (element)
 * @param {Function} actions.isModalOpen - Returns true if a modal is open
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @returns {Function} The keydown event handler
 */
export function createInboxNavigationHandler(actions) {
    const selector = '#inbox-list .inbox-row';
    return function handleInboxNavigation(e) {
        if (actions.getCurrentView() !== 'inbox') return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        // Yield to the sidebar's own roving-focus handler while a nav link is
        // focused — these list handlers register earlier and would otherwise
        // ALSO move the list cursor on the same arrow press (CHT-1289 review).
        if (e.target.closest?.('.sidebar-nav')) return;
        if (actions.isModalOpen()) return;
        if (actions.isCommandPaletteOpen()) return;

        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const selectedIndex = actions.getSelectedIndex();
        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                actions.collapseInboxExpand?.(); // moving the cursor closes any open row (CHT-1320)
                updateKeyboardSelection(selectedIndex + 1, actions.setSelectedIndex, selector);
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                actions.collapseInboxExpand?.();
                updateKeyboardSelection(selectedIndex - 1, actions.setSelectedIndex, selector);
                break;
            case 'Enter':
                // CHT-1320: Enter now expands the row in place (triggering
                // content + action bar) rather than navigating away. "Open"
                // in the action bar is the deliberate navigate path.
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    actions.toggleInboxExpand(items[selectedIndex]);
                }
                break;
            case 'e':
                // Archive/clear the selected entry in place (Gmail's `e`),
                // keeping focus in the inbox on the next item.
                if (selectedIndex >= 0 && items[selectedIndex] && actions.archiveInboxEntry) {
                    e.preventDefault();
                    actions.archiveInboxEntry(items[selectedIndex]);
                }
                break;
            case 'Escape':
                // Escape closes an open row first (keeping the cursor there);
                // only a second Escape clears the selection (CHT-1320).
                if (actions.collapseInboxExpand?.()) {
                    e.preventDefault();
                    break;
                }
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('keyboard-selected'));
                    actions.setSelectedIndex(-1);
                }
                break;
        }
    };
}

/**
 * Creates a handler for j/k (or arrow keys)/Enter/Escape card navigation on the Board (kanban)
 * view (CHT-1215). The Board had zero keyboard support despite being one of
 * the core triage surfaces alongside Issues/Documents, which both already
 * have this grammar.
 *
 * This is a linear cursor over cards in DOM order (column 1 top-to-bottom,
 * then column 2, ...) — not column-aware left/right movement between
 * statuses. That's a materially bigger lift (2D grid navigation is new logic,
 * not a wiring fix); this ships the coverage gap's cursor + Enter-to-open
 * core first.
 *
 * @param {Object} actions
 * @param {Function} actions.getCurrentView - Returns the current view name
 * @param {Function} actions.getSelectedIndex - Returns the currently selected index
 * @param {Function} actions.setSelectedIndex - Sets the selected index
 * @param {Function} actions.viewIssue - Opens an issue by ID
 * @param {Function} actions.isModalOpen - Returns true if a modal is open
 * @param {Function} actions.isCommandPaletteOpen - Returns true if command palette is open
 * @param {Function} [actions.isDetailViewActive] - Returns true if a detail
 *   view is overlaying this handler's list; the handler disengages entirely
 *   while one is up (CHT-1215 review finding 1)
 * @returns {Function} The keydown event handler
 */
export function createBoardNavigationHandler(actions) {
    const selector = '#kanban-board .kanban-card';
    return function handleBoardNavigation(e) {
        if (actions.getCurrentView() !== 'board') return;
        // CHT-1215 (review finding 1): same disengage as the issues list —
        // opening a card's issue detail leaves currentView === 'board' and
        // the hidden .kanban-card elements in the DOM; without this, Enter
        // on the detail view would re-open the stale board selection.
        if (actions.isDetailViewActive?.()) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        // Yield to the sidebar's own roving-focus handler while a nav link is
        // focused — these list handlers register earlier and would otherwise
        // ALSO move the list cursor on the same arrow press (CHT-1289 review).
        if (e.target.closest?.('.sidebar-nav')) return;
        if (actions.isModalOpen()) return;
        if (actions.isCommandPaletteOpen()) return;

        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const selectedIndex = actions.getSelectedIndex();
        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex + 1, actions.setSelectedIndex, selector);
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex - 1, actions.setSelectedIndex, selector);
                break;
            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    const issueId = items[selectedIndex].dataset.id;
                    if (issueId) actions.viewIssue(issueId);
                }
                break;
            case 'Escape':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('keyboard-selected'));
                    actions.setSelectedIndex(-1);
                }
                break;
        }
    };
}

/**
 * Creates a handler for ArrowUp/ArrowDown/Home/End roving focus through the
 * sidebar nav items (CHT-1289). Unlike the list handlers above — which drive a
 * `.keyboard-selected` cursor over non-focusable rows — the sidebar entries are
 * real `<a href>` links, so this moves NATIVE focus between them (correct
 * semantics + Enter activates the link natively via the SPA click handler, no
 * interception needed here).
 *
 * Self-scoping: it only acts when a `.nav-item` is already focused (entered via
 * Tab or click), so it never competes for arrows anywhere else — no view guard,
 * modal guard, or input guard is needed. The `g`-prefix jumps (createKeyboardHandler)
 * remain the fast path; this is the discoverable, keyboard-accessible complement.
 *
 * Movement clamps at the ends (consistent with the list handlers' clamp), rather
 * than wrapping.
 */
export function createSidebarNavigationHandler() {
    const selector = '.sidebar-nav .nav-item';
    return function handleSidebarNavigation(e) {
        const active = document.activeElement;
        if (!active || !active.classList.contains('nav-item')) return;

        const items = Array.from(document.querySelectorAll(selector));
        const idx = items.indexOf(active);
        if (idx === -1) return;

        let target;
        switch (e.key) {
            case 'ArrowDown':
                target = items[Math.min(items.length - 1, idx + 1)];
                break;
            case 'ArrowUp':
                target = items[Math.max(0, idx - 1)];
                break;
            case 'Home':
                target = items[0];
                break;
            case 'End':
                target = items[items.length - 1];
                break;
            default:
                return;
        }

        if (target) {
            e.preventDefault();
            target.focus();
        }
    };
}

/**
 * Factory for a "simple" list-nav handler (CHT-1291): a linear keyboard cursor
 * over rows/cards with j/k or arrows, Enter to open, Escape to deselect — the
 * exact grammar the issues/documents/board/inbox handlers already share, minus
 * their per-view extras (field-edit keys, inline-dropdown yielding). Used to
 * wire the sprints and epics views, which had no keyboard nav at all.
 *
 * The issues/documents handlers stay bespoke (they carry `e`/`s`/`p`/`a` and
 * the inline-dropdown guard); Board and Inbox predate this factory and could
 * migrate onto it later. Same guard order and `.keyboard-selected` /
 * `updateKeyboardSelection` primitive as every other handler.
 *
 * @param {Object} config
 * @param {string} config.view - view name this handler is active in
 * @param {string} config.selector - CSS selector for the navigable rows
 * @param {Function} config.open - called with the selected element on Enter
 * @param {Function} config.getCurrentView
 * @param {Function} config.getSelectedIndex
 * @param {Function} config.setSelectedIndex
 * @param {Function} config.isModalOpen
 * @param {Function} config.isCommandPaletteOpen
 * @param {Function} [config.isDetailViewActive]
 * @returns {Function} The keydown event handler
 */
export function createSimpleListNavigationHandler(config) {
    const { view, selector, open } = config;
    return function handleSimpleListNavigation(e) {
        if (config.getCurrentView() !== view) return;
        if (config.isDetailViewActive?.()) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
        if (e.target.closest?.('.sidebar-nav')) return;
        if (config.isModalOpen()) return;
        if (config.isCommandPaletteOpen()) return;

        const items = document.querySelectorAll(selector);
        if (items.length === 0) return;

        const selectedIndex = config.getSelectedIndex();
        switch (e.key) {
            case 'j':
            case 'ArrowDown':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex + 1, config.setSelectedIndex, selector);
                break;
            case 'k':
            case 'ArrowUp':
                e.preventDefault();
                updateKeyboardSelection(selectedIndex - 1, config.setSelectedIndex, selector);
                break;
            case 'Enter':
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    e.preventDefault();
                    open(items[selectedIndex]);
                }
                break;
            case 'Escape':
                if (selectedIndex >= 0) {
                    e.preventDefault();
                    items.forEach(item => item.classList.remove('keyboard-selected'));
                    config.setSelectedIndex(-1);
                }
                break;
        }
    };
}
