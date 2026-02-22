/**
 * Event delegation module (CHT-1062)
 *
 * Provides a central action registry so dynamically-generated HTML can use
 * data-action attributes instead of inline onclick/onchange/onsubmit handlers.
 *
 * Handler signature: (event, dataset, target)
 *   event   — the native DOM event
 *   dataset — DOMStringMap from the element with data-action
 *   target  — the element with data-action (replaces event.currentTarget)
 */

const actions = {};

/**
 * Register one or more actions.
 * @param {Object} actionMap - { 'action-name': handlerFn, ... }
 */
export function registerActions(actionMap) {
    Object.assign(actions, actionMap);
}

/**
 * Core delegation handler — finds the closest ancestor (or self) with
 * data-action and dispatches to the registered handler.
 */
function handleEvent(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const actionName = target.dataset.action;
    const handler = actions[actionName];
    if (!handler) {
        // eslint-disable-next-line no-undef
        if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
            console.warn(`[event-delegation] No handler registered for action "${actionName}"`);
        }
        return;
    }

    handler(event, target.dataset, target);
}

let initialized = false;

/**
 * Clear the action registry (for tests only).
 * Does NOT remove event listeners — call initEventDelegation once per suite.
 */
export function _resetForTest() {
    for (const key of Object.keys(actions)) {
        delete actions[key];
    }
}

/**
 * Initialise delegation listeners on document.
 * Call once at startup (e.g. inside DOMContentLoaded).
 * Safe to call multiple times — only attaches listeners once.
 */
export function initEventDelegation() {
    if (initialized) return;
    initialized = true;

    for (const type of ['click', 'change', 'input', 'keydown', 'mouseover', 'dragstart', 'dragend', 'dragover', 'dragleave', 'drop']) {
        document.addEventListener(type, handleEvent);
    }

    // Submit: the event target is the <form> itself
    document.addEventListener('submit', (event) => {
        const form = event.target;
        if (!form.dataset || !form.dataset.action) return;

        const handler = actions[form.dataset.action];
        if (!handler) return;

        event.preventDefault();
        handler(event, form.dataset, form);
    });
}
