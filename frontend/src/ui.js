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

  // Use capture phase so clicks inside modals (which stopPropagation on bubble)
  // are still detected. Use setTimeout to avoid the current click triggering it.
  setTimeout(() => document.addEventListener('click', handler, true), 0);

  // Return cleanup function
  return () => document.removeEventListener('click', handler, true);
}

