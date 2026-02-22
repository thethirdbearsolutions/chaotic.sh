/**
 * Authentication module for Chaotic frontend
 * Handles login, signup, logout, and user display
 */

import { api } from './api.js';
import { showToast } from './ui.js';
import { escapeAttr } from './utils.js';
import { setCurrentTeam } from './state.js';

// DOM element references (cached on first use)
let authScreen = null;
let mainScreen = null;
let loginForm = null;
let signupForm = null;

/**
 * Initialize DOM element references
 */
function initElements() {
  if (!authScreen) {
    authScreen = document.getElementById('auth-screen');
    mainScreen = document.getElementById('main-screen');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
  }
}

/**
 * Show the authentication screen
 */
export function showAuthScreen() {
  initElements();
  if (authScreen) authScreen.classList.remove('hidden');
  if (mainScreen) mainScreen.classList.add('hidden');
}

/**
 * Show the main application screen
 */
export function showMainScreen() {
  initElements();
  if (authScreen) authScreen.classList.add('hidden');
  if (mainScreen) mainScreen.classList.remove('hidden');
}

/**
 * Show the login form
 */
export function showLogin() {
  initElements();
  if (loginForm) loginForm.classList.remove('hidden');
  if (signupForm) signupForm.classList.add('hidden');
}

/**
 * Show the signup form
 */
export function showSignup() {
  initElements();
  if (loginForm) loginForm.classList.add('hidden');
  if (signupForm) signupForm.classList.remove('hidden');
}

/**
 * Handle login form submission
 * @param {Event} event - Form submit event
 */
export async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    await api.login(email, password);
    window.currentUser = await api.getMe();
    // Call app's initApp for full initialization
    if (window.initApp) {
      await window.initApp();
    }
    showToast('Welcome back!', 'success');
  } catch (e) {
    showToast(`Login failed: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Handle signup form submission
 * @param {Event} event - Form submit event
 */
export async function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    await api.signup(name, email, password);
    await api.login(email, password);
    window.currentUser = await api.getMe();
    // Call app's initApp for full initialization
    if (window.initApp) {
      await window.initApp();
    }
    showToast('Account created successfully!', 'success');
  } catch (e) {
    showToast(`Signup failed: ${e.message}`, 'error');
  }
  return false;
}

/**
 * Log out the current user
 */
export function logout() {
  api.logout();
  window.currentUser = null;
  setCurrentTeam(null);
  showAuthScreen();
  showToast('Signed out', 'success');
}

/**
 * Check if an avatar URL is an image (vs emoji)
 * @param {string} avatar - Avatar URL or emoji
 * @returns {boolean}
 */
export function isImageAvatar(avatar) {
  return (
    typeof avatar === 'string' &&
    (avatar.startsWith('http://') ||
      avatar.startsWith('https://') ||
      avatar.startsWith('data:'))
  );
}

/**
 * Update the user info display in the header
 */
export function updateUserInfo() {
  const user = window.currentUser;
  if (!user) return;

  const nameEl = document.getElementById('user-name');
  if (nameEl) {
    nameEl.textContent = user.name;
  }

  const avatarEl = document.getElementById('user-avatar');
  if (avatarEl) {
    const avatar = user.avatar_url;
    if (avatar) {
      if (isImageAvatar(avatar)) {
        avatarEl.className = 'avatar-small';
        avatarEl.innerHTML = `<img class="avatar-img" src="${escapeAttr(avatar)}" alt="${escapeAttr(user.name)}">`;
      } else {
        avatarEl.className = 'avatar-small avatar-emoji';
        avatarEl.textContent = avatar;
      }
    } else {
      // Default: first letter of name
      avatarEl.className = 'avatar-small';
      avatarEl.textContent = user.name.charAt(0).toUpperCase();
    }
  }
}

/**
 * Initialize auth event listeners (CHT-1057)
 * Replaces inline onclick/onsubmit handlers in the HTML template.
 */
export function initAuth() {
  initElements();

  const loginFormEl = loginForm?.querySelector('form');
  if (loginFormEl) {
    loginFormEl.addEventListener('submit', (e) => handleLogin(e));
  }

  const signupFormEl = signupForm?.querySelector('form');
  if (signupFormEl) {
    signupFormEl.addEventListener('submit', (e) => handleSignup(e));
  }

  // "Sign up" / "Sign in" toggle links
  const signupLink = loginForm?.querySelector('.auth-switch a');
  if (signupLink) {
    signupLink.addEventListener('click', (e) => {
      e.preventDefault();
      showSignup();
    });
  }

  const loginLink = signupForm?.querySelector('.auth-switch a');
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();
      showLogin();
    });
  }
}

// Attach to window for backward compatibility with HTML handlers
Object.assign(window, {
  showAuthScreen,
  showMainScreen,
  showLogin,
  showSignup,
  handleLogin,
  handleSignup,
  logout,
  updateUserInfo,
  isImageAvatar,
});
