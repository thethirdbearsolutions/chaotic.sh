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
    expect(toast.textContent).toBe('Test message');
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

  it('removes toast after 3 seconds', () => {
    showToast('Temporary');
    const toast = document.querySelector('.toast');
    expect(toast).not.toBeNull();

    vi.advanceTimersByTime(3000);
    // Toast gets exit animation class, then removes on animationend
    expect(toast.classList.contains('toast-exit')).toBe(true);
    toast.dispatchEvent(new Event('animationend'));
    expect(document.querySelector('.toast')).toBeNull();
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
    expect(toast.textContent).toBe('Failed to load issues: Network error');
  });

  it('handles structured errors', () => {
    showApiError('update sprint', { detail: { message: 'Sprint is in limbo' } });
    const toast = document.querySelector('.toast-error');
    expect(toast.textContent).toBe('Failed to update sprint: Sprint is in limbo');
  });
});
