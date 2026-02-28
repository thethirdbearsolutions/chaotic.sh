/**
 * UI utilities for Chaotic frontend
 * Modal, toast notifications, and dropdown management
 */

let currentDropdownKeyHandler = null;

/**
 * Show the modal overlay
 */
export function showModal() {
  document.getElementById('modal-overlay').classList.remove('hidden');
  // Auto-focus first input after animation
  setTimeout(() => {
    try {
      const firstInput = document.querySelector('#modal-content input, #modal-content textarea');
      if (firstInput) firstInput.focus();
    } catch { /* DOM may be torn down in tests */ }
  }, 50);
}

/**
 * Hide the modal overlay
 */
export function closeModal() {
  closeAllDropdowns();
  document.getElementById('modal-overlay').classList.add('hidden');
  document.querySelector('.modal')?.classList.remove('modal-wide');
}

/**
 * Check if a modal is currently open
 * @returns {boolean}
 */
export function isModalOpen() {
  const overlay = document.getElementById('modal-overlay');
  return overlay ? !overlay.classList.contains('hidden') : false;
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {'success'|'error'|'info'} type - Toast type
 */
export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    // Fallback removal if animationend never fires (e.g. CSS not loaded)
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500);
  }, 3000);
}

/**
 * Extract a human-readable message from an error.
 * Handles: plain Error objects, structured API errors with .detail,
 * FastAPI validation error arrays, and nested {message: ...} objects.
 * @param {Error|Object} error
 * @returns {string}
 */
export function extractErrorMessage(error) {
    if (!error) return 'An unknown error occurred';

    // Standard Error with a string message
    if (typeof error.message === 'string' && error.message) {
        return error.message;
    }

    // Structured detail (attached by api.js)
    const detail = error.detail;
    if (detail) {
        if (typeof detail === 'string') return detail;
        if (typeof detail === 'object' && detail.message) return detail.message;
        // FastAPI validation errors: [{loc: [...], msg: "...", type: "..."}]
        if (Array.isArray(detail)) {
            return detail.map(d => d.msg || JSON.stringify(d)).join('; ');
        }
    }

    return 'An unknown error occurred';
}

/**
 * Show a toast for an API/action error with consistent formatting.
 * @param {string} context - What was being attempted (e.g. "load issues", "delete agent")
 * @param {Error|Object} error - The caught error
 */
export function showApiError(context, error) {
    const msg = extractErrorMessage(error);
    showToast(`Failed to ${context}: ${msg}`, 'error');
}

/**
 * Close all open inline dropdowns
 */
export function closeAllDropdowns() {
  document.querySelectorAll('.inline-dropdown').forEach((d) => d.remove());
  if (currentDropdownKeyHandler) {
    document.removeEventListener('keydown', currentDropdownKeyHandler);
    currentDropdownKeyHandler = null;
  }
}

/**
 * Set the current dropdown keyboard handler
 * @param {Function|null} handler - Keyboard event handler
 */
export function setDropdownKeyHandler(handler) {
  if (currentDropdownKeyHandler) {
    document.removeEventListener('keydown', currentDropdownKeyHandler);
  }
  currentDropdownKeyHandler = handler;
  if (handler) {
    document.addEventListener('keydown', handler);
  }
}

/**
 * Get the current dropdown keyboard handler
 * @returns {Function|null}
 */
export function getDropdownKeyHandler() {
  return currentDropdownKeyHandler;
}

/**
 * Register a click-outside handler for a dropdown.
 * Closes the dropdown when clicking outside of it.
 *
 * @param {HTMLElement} dropdown - The dropdown element
 * @param {Object} options - Configuration options
 * @param {boolean} options.multiSelect - If true, clicks inside the dropdown don't close it
 *                                        (for multi-select dropdowns like labels)
 * @returns {Function} Cleanup function to remove the handler
 */
export function registerDropdownClickOutside(dropdown, options = {}) {
  const { multiSelect = false } = options;

  const handler = (e) => {
    // For multi-select dropdowns, don't close when clicking inside
    if (multiSelect && dropdown.contains(e.target)) {
      return;
    }
    closeAllDropdowns();
    document.removeEventListener('click', handler, true);
  };

  // Use capture phase and setTimeout to avoid the current click triggering it.
  setTimeout(() => document.addEventListener('click', handler, true), 0);

  // Return cleanup function
  return () => document.removeEventListener('click', handler, true);
}

