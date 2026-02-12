import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  showModal,
  closeModal,
  showToast,
  closeAllDropdowns,
  setDropdownKeyHandler,
  getDropdownKeyHandler,
  registerDropdownClickOutside,
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
    expect(document.querySelector('.toast')).not.toBeNull();

    vi.advanceTimersByTime(3000);
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
