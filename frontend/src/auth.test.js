import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getCurrentTeam, setCurrentTeam } from './state.js';

// Mock the api module
vi.mock('./api.js', () => ({
  api: {
    login: vi.fn(),
    signup: vi.fn(),
    getMe: vi.fn(),
    logout: vi.fn(),
    setToken: vi.fn(),
    getToken: vi.fn(),
  },
}));

// Mock the ui module
vi.mock('./ui.js', () => ({
  showToast: vi.fn(),
}));

// Mock the utils module
vi.mock('./utils.js', () => ({
  escapeHtml: vi.fn((str) => str),
  escapeAttr: vi.fn((str) => str),
}));

import { api } from './api.js';
import { showToast } from './ui.js';

// Set up DOM before importing auth module
document.body.innerHTML = `
  <div id="auth-screen" class="hidden"></div>
  <div id="main-screen"></div>
  <form id="login-form" class="hidden"></form>
  <form id="signup-form"></form>
  <input id="login-email" type="email">
  <input id="login-password" type="password">
  <input id="signup-name" type="text">
  <input id="signup-email" type="email">
  <input id="signup-password" type="password">
  <div id="user-name"></div>
  <div id="user-avatar"></div>
`;

import {
  showAuthScreen,
  showMainScreen,
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  logout,
  updateUserInfo,
  isImageAvatar,
} from './auth.js';

describe('DOM element caching', () => {
  it('caches DOM elements after first call to showAuthScreen', () => {
    const originalGetElementById = document.getElementById;
    let getElementByIdCallCount = 0;

    // Spy on getElementById to count calls
    document.getElementById = vi.fn((id) => {
      getElementByIdCallCount++;
      return originalGetElementById.call(document, id);
    });

    // First call should query DOM elements
    showAuthScreen();
    const firstCallCount = getElementByIdCallCount;
    expect(firstCallCount).toBeGreaterThan(0);

    // Reset counter
    getElementByIdCallCount = 0;

    // Second call should use cached elements (no new getElementById calls)
    showAuthScreen();
    expect(getElementByIdCallCount).toBe(0);

    // Restore original
    document.getElementById = originalGetElementById;
  });

  it('caches elements across different auth functions', () => {
    const originalGetElementById = document.getElementById;
    let getElementByIdCallCount = 0;

    document.getElementById = vi.fn((id) => {
      getElementByIdCallCount++;
      return originalGetElementById.call(document, id);
    });

    // First call initializes cache
    showAuthScreen();
    const _firstCallCount = getElementByIdCallCount;

    // Reset counter
    getElementByIdCallCount = 0;

    // Subsequent calls to other functions should use cache
    showMainScreen();
    showLogin();
    showSignup();
    expect(getElementByIdCallCount).toBe(0);

    // Restore original
    document.getElementById = originalGetElementById;
  });
});

describe('showAuthScreen', () => {
  beforeEach(() => {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
  });

  it('shows auth screen and hides main screen', () => {
    showAuthScreen();
    expect(
      document.getElementById('auth-screen').classList.contains('hidden')
    ).toBe(false);
    expect(
      document.getElementById('main-screen').classList.contains('hidden')
    ).toBe(true);
  });
});

describe('showMainScreen', () => {
  beforeEach(() => {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
  });

  it('shows main screen and hides auth screen', () => {
    showMainScreen();
    expect(
      document.getElementById('auth-screen').classList.contains('hidden')
    ).toBe(true);
    expect(
      document.getElementById('main-screen').classList.contains('hidden')
    ).toBe(false);
  });
});

describe('showLogin', () => {
  beforeEach(() => {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
  });

  it('shows login form and hides signup form', () => {
    showLogin();
    expect(
      document.getElementById('login-form').classList.contains('hidden')
    ).toBe(false);
    expect(
      document.getElementById('signup-form').classList.contains('hidden')
    ).toBe(true);
  });
});

describe('showSignup', () => {
  beforeEach(() => {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('signup-form').classList.add('hidden');
  });

  it('shows signup form and hides login form', () => {
    showSignup();
    expect(
      document.getElementById('login-form').classList.contains('hidden')
    ).toBe(true);
    expect(
      document.getElementById('signup-form').classList.contains('hidden')
    ).toBe(false);
  });
});

describe('handleLogin', () => {
  beforeEach(() => {
    document.getElementById('login-email').value = 'test@example.com';
    document.getElementById('login-password').value = 'password123';
    vi.clearAllMocks();
    window.currentUser = null;
    window.initApp = null;
    localStorage.clear();

    // Mock login to call setToken like the real API does
    api.login.mockImplementation(async (_email, _password) => {
      const result = { access_token: 'token123' };
      api.setToken(result.access_token);
      return result;
    });
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleLogin(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('calls api.login with email and password', async () => {
    const event = { preventDefault: vi.fn() };
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleLogin(event);
    expect(api.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('fetches current user after login', async () => {
    const event = { preventDefault: vi.fn() };
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue(mockUser);

    await handleLogin(event);
    expect(api.getMe).toHaveBeenCalled();
    expect(window.currentUser).toEqual(mockUser);
  });

  it('calls window.initApp if available', async () => {
    const event = { preventDefault: vi.fn() };
    window.initApp = vi.fn().mockResolvedValue(undefined);
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleLogin(event);
    expect(window.initApp).toHaveBeenCalled();
  });

  it('shows success toast on successful login', async () => {
    const event = { preventDefault: vi.fn() };
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleLogin(event);
    expect(showToast).toHaveBeenCalledWith('Welcome back!', 'success');
  });

  it('shows error toast on login failure', async () => {
    const event = { preventDefault: vi.fn() };
    api.login.mockRejectedValue(new Error('Invalid credentials'));

    await handleLogin(event);
    expect(showToast).toHaveBeenCalledWith('Login failed: Invalid credentials', 'error');
  });

  it('does not set currentUser on error', async () => {
    const event = { preventDefault: vi.fn() };
    api.login.mockRejectedValue(new Error('Invalid credentials'));

    await handleLogin(event);
    expect(window.currentUser).toBeNull();
  });

  it('returns false', async () => {
    const event = { preventDefault: vi.fn() };
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    const result = await handleLogin(event);
    expect(result).toBe(false);
  });

  it('calls setToken with the access token from login response', async () => {
    const event = { preventDefault: vi.fn() };
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleLogin(event);
    expect(api.setToken).toHaveBeenCalledWith('token123');
  });

  it('stores token in localStorage on successful login', async () => {
    const event = { preventDefault: vi.fn() };
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    // Mock setToken to actually store in localStorage like the real implementation
    api.setToken.mockImplementation((token) => {
      if (token) {
        localStorage.setItem('chaotic_token', token);
      }
    });

    await handleLogin(event);
    expect(localStorage.getItem('chaotic_token')).toBe('token123');
  });
});

describe('handleSignup', () => {
  beforeEach(() => {
    document.getElementById('signup-name').value = 'Test User';
    document.getElementById('signup-email').value = 'test@example.com';
    document.getElementById('signup-password').value = 'password123';
    vi.clearAllMocks();
    window.currentUser = null;
    window.initApp = null;
    localStorage.clear();

    // Mock login to call setToken like the real API does
    api.login.mockImplementation(async (_email, _password) => {
      const result = { access_token: 'token123' };
      api.setToken(result.access_token);
      return result;
    });
  });

  it('prevents default form submission', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleSignup(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('calls api.signup with name, email, and password', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleSignup(event);
    expect(api.signup).toHaveBeenCalledWith(
      'Test User',
      'test@example.com',
      'password123'
    );
  });

  it('logs in after successful signup', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleSignup(event);
    expect(api.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('fetches current user after signup and login', async () => {
    const event = { preventDefault: vi.fn() };
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue(mockUser);

    await handleSignup(event);
    expect(api.getMe).toHaveBeenCalled();
    expect(window.currentUser).toEqual(mockUser);
  });

  it('calls window.initApp if available', async () => {
    const event = { preventDefault: vi.fn() };
    window.initApp = vi.fn().mockResolvedValue(undefined);
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleSignup(event);
    expect(window.initApp).toHaveBeenCalled();
  });

  it('shows success toast on successful signup', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    await handleSignup(event);
    expect(showToast).toHaveBeenCalledWith(
      'Account created successfully!',
      'success'
    );
  });

  it('shows error toast on signup failure', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockRejectedValue(new Error('Email already exists'));

    await handleSignup(event);
    expect(showToast).toHaveBeenCalledWith('Signup failed: Email already exists', 'error');
  });

  it('does not login if signup fails', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockRejectedValue(new Error('Email already exists'));

    await handleSignup(event);
    expect(api.login).not.toHaveBeenCalled();
  });

  it('returns false', async () => {
    const event = { preventDefault: vi.fn() };
    api.signup.mockResolvedValue({ id: 1 });
    api.login.mockResolvedValue({ access_token: 'token123' });
    api.getMe.mockResolvedValue({ id: 1, name: 'Test User' });

    const result = await handleSignup(event);
    expect(result).toBe(false);
  });
});

describe('logout', () => {
  beforeEach(() => {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    vi.clearAllMocks();
    window.currentUser = { id: 1, name: 'Test User' };
    setCurrentTeam({ id: 1, name: 'Test Team' });
    localStorage.setItem('chaotic_token', 'token123');
  });

  it('calls api.logout', () => {
    logout();
    expect(api.logout).toHaveBeenCalled();
  });

  it('clears currentUser', () => {
    logout();
    expect(window.currentUser).toBeNull();
  });

  it('clears currentTeam', () => {
    logout();
    expect(getCurrentTeam()).toBeNull();
  });

  it('shows auth screen', () => {
    logout();
    expect(
      document.getElementById('auth-screen').classList.contains('hidden')
    ).toBe(false);
  });

  it('shows success toast', () => {
    logout();
    expect(showToast).toHaveBeenCalledWith('Signed out', 'success');
  });

  it('removes token from localStorage on logout', () => {
    // Mock logout to actually remove from localStorage like the real implementation
    api.logout.mockImplementation(() => {
      localStorage.removeItem('chaotic_token');
    });

    logout();
    expect(localStorage.getItem('chaotic_token')).toBeNull();
  });
});

describe('isImageAvatar', () => {
  it('returns true for http URLs', () => {
    expect(isImageAvatar('http://example.com/image.png')).toBe(true);
  });

  it('returns true for https URLs', () => {
    expect(isImageAvatar('https://example.com/image.png')).toBe(true);
  });

  it('returns true for data URLs', () => {
    expect(isImageAvatar('data:image/png;base64,iVBORw0KGgo=')).toBe(true);
  });

  it('returns false for emoji', () => {
    expect(isImageAvatar('😀')).toBe(false);
  });

  it('returns false for regular text', () => {
    expect(isImageAvatar('avatar')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isImageAvatar(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isImageAvatar(undefined)).toBe(false);
  });

  it('returns false for non-string values', () => {
    expect(isImageAvatar(123)).toBe(false);
    expect(isImageAvatar({})).toBe(false);
  });
});

describe('updateUserInfo', () => {
  beforeEach(() => {
    document.getElementById('user-name').textContent = '';
    document.getElementById('user-avatar').textContent = '';
    document.getElementById('user-avatar').className = '';
    document.getElementById('user-avatar').innerHTML = '';
    window.currentUser = null;
  });

  it('does nothing if no current user', () => {
    updateUserInfo();
    expect(document.getElementById('user-name').textContent).toBe('');
  });

  it('updates user name', () => {
    window.currentUser = { name: 'Test User', avatar_url: null };
    updateUserInfo();
    expect(document.getElementById('user-name').textContent).toBe('Test User');
  });

  it('shows first letter of name as default avatar', () => {
    window.currentUser = { name: 'Test User', avatar_url: null };
    updateUserInfo();
    const avatarEl = document.getElementById('user-avatar');
    expect(avatarEl.textContent).toBe('T');
    expect(avatarEl.className).toBe('avatar-small');
  });

  it('shows image avatar when avatar_url is an image', () => {
    window.currentUser = {
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.png',
    };
    updateUserInfo();
    const avatarEl = document.getElementById('user-avatar');
    expect(avatarEl.className).toBe('avatar-small');
    expect(avatarEl.innerHTML).toContain('<img');
    expect(avatarEl.innerHTML).toContain('src="https://example.com/avatar.png"');
    expect(avatarEl.innerHTML).toContain('alt="Test User"');
  });

  it('shows emoji avatar when avatar_url is emoji', () => {
    window.currentUser = { name: 'Test User', avatar_url: '😀' };
    updateUserInfo();
    const avatarEl = document.getElementById('user-avatar');
    expect(avatarEl.className).toBe('avatar-small avatar-emoji');
    expect(avatarEl.textContent).toBe('😀');
  });

  it('handles missing user-name element gracefully', () => {
    // Temporarily remove the element
    const nameEl = document.getElementById('user-name');
    const parent = nameEl.parentNode;
    parent.removeChild(nameEl);

    window.currentUser = { name: 'Test User', avatar_url: null };
    expect(() => updateUserInfo()).not.toThrow();

    // Restore the element
    parent.appendChild(nameEl);
  });

  it('handles missing user-avatar element gracefully', () => {
    // Temporarily remove the element
    const avatarEl = document.getElementById('user-avatar');
    const parent = avatarEl.parentNode;
    parent.removeChild(avatarEl);

    window.currentUser = { name: 'Test User', avatar_url: null };
    expect(() => updateUserInfo()).not.toThrow();

    // Restore the element
    parent.appendChild(avatarEl);
  });

  it('lowercases first letter when appropriate', () => {
    window.currentUser = { name: 'test', avatar_url: null };
    updateUserInfo();
    const avatarEl = document.getElementById('user-avatar');
    expect(avatarEl.textContent).toBe('T');
  });
});
