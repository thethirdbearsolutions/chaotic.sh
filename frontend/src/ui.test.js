import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  showModal,
  closeModal,
  isModalOpen,
  showToast,
  closeAllDropdowns,
  setDropdownKeyHandler,
  getDropdownKeyHandler,
  registerDropdownClickOutside,
  extractErrorMessage,
  showApiError,
} from './ui.js';

describe('showModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-overlay" class="hidden"></div>';
  });

  it('removes hidden class from modal overlay', () => {
    showModal();
    expect(
      document.getElementById('modal-overlay').classList.contains('hidden')
    ).toBe(false);
  });
});

describe('isModalOpen', () => {
  it('returns false when modal is hidden', () => {
    document.body.innerHTML = '<div id="modal-overlay" class="hidden"></div>';
    expect(isModalOpen()).toBe(false);
  });

  it('returns true when modal is visible', () => {
    document.body.innerHTML = '<div id="modal-overlay"></div>';
    expect(isModalOpen()).toBe(true);
  });
});

describe('closeModal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="modal-overlay"></div>';
  });

  it('adds hidden class to modal overlay', () => {
    closeModal();
    expect(
      document.getElementById('modal-overlay').classList.contains('hidden')
    ).toBe(true);
  });
});

// CHT-1215: the primary modal (used by every create/edit flow in the app)
// had no focus trap and never returned focus to whatever opened it, unlike
// the mobile sidebar's already-shipped pattern (CHT-883). Mirrors
// mobile-sidebar.test.js's "Mobile sidebar focus management" suite.
describe('Modal focus management (CHT-1215)', () => {
  let triggerBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="open-modal-btn">Open</button>
      <div id="modal-overlay" class="modal-overlay hidden">
        <div class="modal">
          <div class="modal-header">
            <h3 id="modal-title">Modal</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div id="modal-content" class="modal-body">
            <input type="text" id="field-1" />
            <input type="text" id="field-2" />
          </div>
        </div>
      </div>
    `;
    triggerBtn = document.getElementById('open-modal-btn');
  });

  it('returns focus to whatever triggered the modal when it closes', () => {
    triggerBtn.focus();
    showModal();
    closeModal();
    expect(document.activeElement).toBe(triggerBtn);
  });

  it('does not throw if the trigger element was removed from the DOM before close', () => {
    triggerBtn.focus();
    showModal();
    triggerBtn.remove();
    expect(() => closeModal()).not.toThrow();
  });

  it('does not move focus if nothing was focused before the modal opened', () => {
    document.body.focus?.();
    showModal();
    // jsdom defaults document.activeElement to <body> — closing shouldn't error
    expect(() => closeModal()).not.toThrow();
  });

  it('redirects focus into the modal when Tab is pressed from outside it', () => {
    showModal();
    triggerBtn.focus(); // simulate focus still outside (auto-focus timer hasn't landed)

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(event);

    expect(document.activeElement).toBe(document.querySelector('.modal-close'));
    expect(event.defaultPrevented).toBe(true);
  });

  it('traps focus forward at the last focusable element in the modal', () => {
    showModal();
    document.getElementById('field-2').focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(event);

    expect(document.activeElement).toBe(document.querySelector('.modal-close'));
  });

  it('traps focus backward at the first focusable element in the modal', () => {
    showModal();
    document.querySelector('.modal-close').focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    document.dispatchEvent(event);

    expect(document.activeElement).toBe(document.getElementById('field-2'));
  });

  it('does not trap Tab when the modal is hidden', () => {
    const input = document.getElementById('field-1');
    input.focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(document.activeElement).toBe(input);
  });

  // Layering: ui.js's modal trap and sidebar.js's mobile-sidebar trap are
  // both permanent document-level Tab listeners (each guards itself with its
  // own "am I actually open" check), so only the one whose surface is
  // actually open should claim the keystroke.
  describe('composes with the mobile sidebar focus trap (both listeners live)', () => {
    let toggleSidebar;
    let closeSidebar;

    beforeEach(async () => {
      ({ toggleSidebar, closeSidebar } = await import('./sidebar.js'));
      document.body.classList.remove('sidebar-open');
      document.body.innerHTML += `
        <button id="hamburger-btn"></button>
        <aside class="sidebar"><a href="#">Nav</a></aside>
      `;
    });

    afterEach(() => {
      closeSidebar();
    });

    it('modal trap governs when only the modal is open', () => {
      showModal();
      document.getElementById('field-2').focus();

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
      document.dispatchEvent(event);

      expect(document.activeElement).toBe(document.querySelector('.modal-close'));
    });

    it('sidebar trap governs when only the sidebar is open', () => {
      toggleSidebar(); // opens, focuses first sidebar link
      const link = document.querySelector('.sidebar a');
      expect(document.activeElement).toBe(link);

      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
      document.dispatchEvent(event);

      // Only one focusable in the sidebar — Tab wraps back to it, not to
      // anything in the (hidden) modal
      expect(document.activeElement).toBe(link);
    });

    // CHT-1215 review finding 4: opening a modal from the sidebar (its
    // "New Issue" button) leaves BOTH open. The sidebar trap used to run
    // after the modal's, see focus inside the modal as "outside the
    // sidebar", and yank it back into the sidebar on every Tab — hijacking
    // Tab out of the modal entirely. The modal is the topmost layer (same
    // priority Escape encodes: modal > sidebar), so its trap must govern.
    describe('when sidebar AND modal are both open', () => {
      it('modal trap governs Tab: focus cycles within the modal, not yanked to the sidebar', () => {
        toggleSidebar(); // sidebar open, focus on sidebar link
        showModal(); // modal opens on top; sidebar stays open
        expect(document.body.classList.contains('sidebar-open')).toBe(true);

        document.getElementById('field-2').focus(); // last focusable in modal
        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        expect(document.activeElement).toBe(document.querySelector('.modal-close'));
        expect(document.querySelector('.sidebar').contains(document.activeElement)).toBe(false);
      });

      it('modal trap governs Shift+Tab too', () => {
        toggleSidebar();
        showModal();

        document.querySelector('.modal-close').focus(); // first focusable in modal
        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        expect(document.activeElement).toBe(document.getElementById('field-2'));
      });

      it('sidebar trap re-engages after the modal closes with the sidebar still open', () => {
        toggleSidebar();
        const link = document.querySelector('.sidebar a');
        showModal();
        closeModal();
        expect(document.body.classList.contains('sidebar-open')).toBe(true);

        link.focus();
        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        document.dispatchEvent(event);

        // Single focusable in the sidebar — its trap wraps back to it
        expect(document.activeElement).toBe(link);
      });
    });
  });
});

describe('showToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="toast-container"></div>';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates a toast element with message', () => {
    showToast('Test message');
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();
    expect(toast.querySelector('.toast-message').textContent).toBe('Test message');
  });

  it('applies success class by default', () => {
    showToast('Success!');
    const toast = document.querySelector('.toast');
    expect(toast.classList.contains('toast-success')).toBe(true);
  });

  it('applies error class when specified', () => {
    showToast('Error!', 'error');
    const toast = document.querySelector('.toast');
    expect(toast.classList.contains('toast-error')).toBe(true);
  });

  it('removes a short success toast after 3 seconds', () => {
    showToast('Temporary');
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();

    vi.advanceTimersByTime(3000);
    // Toast gets exit animation class, then removes on animationend
    expect(toast.classList.contains('toast-exit')).toBe(true);
    toast.dispatchEvent(new Event('animationend'));
    expect(document.querySelector('.toast')).toBeNull();
  });

  // CHT-1224: fixed 3s regardless of message length/type meant a long
  // error toast got the exact same window as a short "Saved!" success.
  describe('dismiss delay scaling (CHT-1224)', () => {
    it('does not dismiss a short success toast before 3s', () => {
      showToast('Saved!', 'success');
      const toast = document.querySelector('.toast');
      vi.advanceTimersByTime(2999);
      expect(toast.classList.contains('toast-exit')).toBe(false);
    });

    it('gives error toasts a longer minimum floor than success toasts', () => {
      showToast('x', 'error'); // 1-char message — length alone wouldn't justify 5s
      const toast = document.querySelector('.toast');
      vi.advanceTimersByTime(3000);
      expect(toast.classList.contains('toast-exit')).toBe(false);
      vi.advanceTimersByTime(2000);
      expect(toast.classList.contains('toast-exit')).toBe(true);
    });

    it('gives warning toasts the same longer floor as error toasts', () => {
      showToast('x', 'warning');
      const toast = document.querySelector('.toast');
      vi.advanceTimersByTime(3000);
      expect(toast.classList.contains('toast-exit')).toBe(false);
      vi.advanceTimersByTime(2000);
      expect(toast.classList.contains('toast-exit')).toBe(true);
    });

    it('scales the delay up for a long message', () => {
      const longMessage = 'A'.repeat(300); // long joined FastAPI validation error
      showToast(longMessage, 'error');
      const toast = document.querySelector('.toast');
      vi.advanceTimersByTime(9999);
      expect(toast.classList.contains('toast-exit')).toBe(false);
      vi.advanceTimersByTime(1);
      // Capped at 10s even for very long messages
      expect(toast.classList.contains('toast-exit')).toBe(true);
    });
  });

  // CHT-1224: no way to dismiss early or re-read a toast before it vanished.
  describe('manual dismiss (CHT-1224)', () => {
    it('renders a close button', () => {
      showToast('Test message');
      const toast = document.querySelector('.toast');
      expect(toast.querySelector('.toast-close')).not.toBeNull();
    });

    it('dismisses immediately on close-button click, without waiting for the timer', () => {
      showToast('Test message');
      const toast = document.querySelector('.toast');
      toast.querySelector('.toast-close').click();
      expect(toast.classList.contains('toast-exit')).toBe(true);
    });

    it('does not error if the auto-dismiss timer already fired before a click', () => {
      showToast('Test message');
      const toast = document.querySelector('.toast');
      vi.advanceTimersByTime(3000);
      expect(() => toast.querySelector('.toast-close').click()).not.toThrow();
    });
  });

  // CHT-1224: hovering pauses the countdown so a toast a user is actively
  // reading doesn't vanish out from under them.
  describe('pause-on-hover (CHT-1224)', () => {
    it('pauses the countdown on mouseenter', () => {
      showToast('Saved!', 'success');
      const toast = document.querySelector('.toast');

      vi.advanceTimersByTime(2000);
      toast.dispatchEvent(new Event('mouseenter'));
      vi.advanceTimersByTime(5000); // well past the original 3s window
      expect(toast.classList.contains('toast-exit')).toBe(false);
    });

    it('resumes the remaining countdown on mouseleave', () => {
      showToast('Saved!', 'success');
      const toast = document.querySelector('.toast');

      vi.advanceTimersByTime(2000); // 1s remaining of the original 3s
      toast.dispatchEvent(new Event('mouseenter'));
      vi.advanceTimersByTime(5000); // paused — nothing happens
      toast.dispatchEvent(new Event('mouseleave'));

      vi.advanceTimersByTime(999);
      expect(toast.classList.contains('toast-exit')).toBe(false);
      vi.advanceTimersByTime(2);
      expect(toast.classList.contains('toast-exit')).toBe(true);
    });
  });
});

describe('closeAllDropdowns', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="inline-dropdown">Dropdown 1</div>
      <div class="inline-dropdown">Dropdown 2</div>
      <div class="other-element">Not a dropdown</div>
    `;
  });

  it('removes all inline dropdowns', () => {
    expect(document.querySelectorAll('.inline-dropdown').length).toBe(2);
    closeAllDropdowns();
    expect(document.querySelectorAll('.inline-dropdown').length).toBe(0);
  });

  it('preserves other elements', () => {
    closeAllDropdowns();
    expect(document.querySelector('.other-element')).not.toBeNull();
  });

  it('removes keyboard handler if set', () => {
    const handler = vi.fn();
    setDropdownKeyHandler(handler);
    closeAllDropdowns();
    expect(getDropdownKeyHandler()).toBeNull();
  });
});

describe('setDropdownKeyHandler', () => {
  it('sets and gets handler', () => {
    const handler = vi.fn();
    setDropdownKeyHandler(handler);
    expect(getDropdownKeyHandler()).toBe(handler);
  });

  it('replaces previous handler', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    setDropdownKeyHandler(handler1);
    setDropdownKeyHandler(handler2);
    expect(getDropdownKeyHandler()).toBe(handler2);
  });

  it('clears handler when passed null', () => {
    const handler = vi.fn();
    setDropdownKeyHandler(handler);
    setDropdownKeyHandler(null);
    expect(getDropdownKeyHandler()).toBeNull();
  });
});

describe('registerDropdownClickOutside', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <div class="inline-dropdown" id="test-dropdown">
        <input type="text" id="dropdown-input">
        <button id="dropdown-button">Click me</button>
      </div>
      <button id="outside-button">Outside</button>
    `;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('closes dropdown when clicking outside', () => {
    const dropdown = document.getElementById('test-dropdown');
    registerDropdownClickOutside(dropdown);

    // Advance timers to register the click handler
    vi.advanceTimersByTime(0);

    // Click outside
    document.getElementById('outside-button').click();

    expect(document.querySelector('.inline-dropdown')).toBeNull();
  });

  it('closes dropdown when clicking outside with multiSelect=false', () => {
    const dropdown = document.getElementById('test-dropdown');
    registerDropdownClickOutside(dropdown, { multiSelect: false });

    vi.advanceTimersByTime(0);
    document.getElementById('outside-button').click();

    expect(document.querySelector('.inline-dropdown')).toBeNull();
  });

  it('keeps dropdown open when clicking inside with multiSelect=true', () => {
    const dropdown = document.getElementById('test-dropdown');
    registerDropdownClickOutside(dropdown, { multiSelect: true });

    vi.advanceTimersByTime(0);

    // Click inside the dropdown
    document.getElementById('dropdown-button').click();

    // Dropdown should still exist
    expect(document.querySelector('.inline-dropdown')).not.toBeNull();
  });

  it('closes dropdown when clicking outside with multiSelect=true', () => {
    const dropdown = document.getElementById('test-dropdown');
    registerDropdownClickOutside(dropdown, { multiSelect: true });

    vi.advanceTimersByTime(0);

    // Click outside
    document.getElementById('outside-button').click();

    expect(document.querySelector('.inline-dropdown')).toBeNull();
  });

  it('returns a cleanup function', () => {
    const dropdown = document.getElementById('test-dropdown');
    const cleanup = registerDropdownClickOutside(dropdown);

    expect(typeof cleanup).toBe('function');
  });

  it('cleanup function prevents handler from firing', () => {
    const dropdown = document.getElementById('test-dropdown');
    const cleanup = registerDropdownClickOutside(dropdown);

    vi.advanceTimersByTime(0);

    // Clean up before clicking
    cleanup();

    // Click outside
    document.getElementById('outside-button').click();

    // Dropdown should still exist because handler was removed
    expect(document.querySelector('.inline-dropdown')).not.toBeNull();
  });
});

describe('extractErrorMessage', () => {
  it('returns message from standard Error', () => {
    expect(extractErrorMessage(new Error('something broke'))).toBe('something broke');
  });

  it('returns message from error with string detail', () => {
    const error = new Error('msg');
    error.detail = 'detailed reason';
    // message takes priority
    expect(extractErrorMessage(error)).toBe('msg');
  });

  it('returns detail.message from structured error', () => {
    const error = { detail: { message: 'Sprint is in limbo' } };
    expect(extractErrorMessage(error)).toBe('Sprint is in limbo');
  });

  it('handles FastAPI validation error arrays', () => {
    const error = { detail: [{ loc: ['body', 'name'], msg: 'field required', type: 'value_error' }] };
    expect(extractErrorMessage(error)).toBe('field required');
  });

  it('joins multiple validation errors', () => {
    const error = {
      detail: [
        { msg: 'field required' },
        { msg: 'must be positive' },
      ],
    };
    expect(extractErrorMessage(error)).toBe('field required; must be positive');
  });

  it('returns fallback for null/undefined', () => {
    expect(extractErrorMessage(null)).toBe('An unknown error occurred');
    expect(extractErrorMessage(undefined)).toBe('An unknown error occurred');
  });

  it('returns fallback for empty error object', () => {
    expect(extractErrorMessage({})).toBe('An unknown error occurred');
  });
});

describe('showApiError', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="toast-container"></div>';
  });

  it('shows formatted toast with context and message', () => {
    showApiError('load issues', new Error('Network error'));
    const toast = document.querySelector('.toast-error');
    expect(toast).not.toBeNull();
    expect(toast.querySelector('.toast-message').textContent).toBe('Failed to load issues: Network error');
  });

  it('handles structured errors', () => {
    showApiError('update sprint', { detail: { message: 'Sprint is in limbo' } });
    const toast = document.querySelector('.toast-error');
    expect(toast.querySelector('.toast-message').textContent).toBe('Failed to update sprint: Sprint is in limbo');
  });

  // CHT-1224: api.js now flags network failures (isNetworkError, no .status)
  // distinctly from HTTP errors (.status set) — showApiError surfaces that
  // distinction instead of rendering them identically.
  it('tags a network error distinctly', () => {
    const error = new Error('Network error - check your connection');
    error.isNetworkError = true;
    showApiError('load issues', error);
    const toast = document.querySelector('.toast-error');
    expect(toast.querySelector('.toast-message').textContent).toBe('Failed to load issues: Network error - check your connection (network)');
  });

  it('tags a 5xx server error distinctly', () => {
    const error = new Error('Internal error');
    error.status = 500;
    showApiError('load issues', error);
    const toast = document.querySelector('.toast-error');
    expect(toast.querySelector('.toast-message').textContent).toBe('Failed to load issues: Internal error (server)');
  });

  it('does not tag a 4xx error', () => {
    const error = new Error('Not found');
    error.status = 404;
    showApiError('load issue', error);
    const toast = document.querySelector('.toast-error');
    expect(toast.querySelector('.toast-message').textContent).toBe('Failed to load issue: Not found');
  });
});
