/**
 * Invitation landing page, /invite/<token> (CHT-1265).
 *
 * The invitation email links here (CHT-1251). The page reads the public
 * preview (GET /api/teams/invitations/<token>: team, role, inviter and a
 * masked address) and:
 *
 *   - signed out: shows the invitation with "Sign in" and "Create an
 *     account". Both open the normal auth screen on this same URL (now
 *     /invite), with a note saying what it is for; after signing in,
 *     initApp() sees the invite path and brings the person back here;
 *   - signed in as an account that could be the invited one: Accept joins
 *     the team and boots the app into it. The page's address check is a
 *     heuristic (two addresses can mask alike); the server's 403 is the
 *     real one, and the page shows it;
 *   - signed in as someone else: says so, plainly, and offers to sign out.
 *
 * An unknown, expired, used or revoked invitation gets one message, "This
 * invitation is no longer valid", and nothing else: the server answers
 * all of them with the same 404.
 *
 * The token is a bearer credential: while the invited address has no
 * account, whoever holds it can sign up as that address and join
 * (CHT-1790). So on load it moves from the path into sessionStorage and
 * the address bar becomes /invite: this tab's back button and any later
 * Referer no longer carry it, though the browser's own history list
 * still records the /invite/<token> address it opened (CHT-1792). The
 * page is served with Referrer-Policy: no-referrer, and the token goes
 * only to this server's own API, never in a query string.
 *
 * On /invite with no token to read back (storage was blocked and the
 * page reloaded, or the address was typed), the page says to open the
 * emailed link again (CHT-1792).
 */

import { api } from './api.js';
import { escapeHtml } from './utils.js';

const INVITE_PREFIX = '/invite/';
const INVITE_PATH = '/invite';
const STORAGE_KEY = 'chaotic.inviteToken';
const NOTICE_ID = 'invite-auth-notice';

// The token, if sessionStorage is unavailable (private mode, blocked
// storage): good for this page's life, not for a reload.
let heldToken = null;
export const GONE_MESSAGE = 'This invitation is no longer valid.';

const ROLE_LABELS = { owner: 'an owner', admin: 'an admin', member: 'a member' };

/**
 * The invitation token in an /invite/<token> path, or null.
 * @param {string} pathname
 * @returns {string|null}
 */
export function inviteToken(pathname) {
    if (!pathname || !pathname.startsWith(INVITE_PREFIX)) return null;
    const token = pathname.slice(INVITE_PREFIX.length).replace(/\/$/, '');
    return /^[A-Za-z0-9_-]{16,128}$/.test(token) ? token : null;
}

/**
 * The invitation token this page is about, moving it out of the URL.
 *
 * On /invite/<token> the token is stored in sessionStorage and the
 * address bar is rewritten to /invite with replaceState (CHT-1265 review
 * F2). That keeps it out of this tab's back/forward entries and out of
 * any later Referer; it does not erase the visit from the browser's
 * global history, which still lists /invite/<token> (CHT-1792). On
 * /invite it is read back from storage: a reload, or the return after
 * signing in, still works. Anywhere else, null.
 * @returns {string|null}
 */
export function takeInviteToken() {
    const { pathname } = window.location;
    const fromPath = inviteToken(pathname);
    if (fromPath) {
        heldToken = fromPath;
        try {
            sessionStorage.setItem(STORAGE_KEY, fromPath);
        } catch {
            // Storage blocked: heldToken keeps it for this page's life.
        }
        history.replaceState(null, '', INVITE_PATH);
        return fromPath;
    }
    if (!isInvitePath(pathname)) return null;
    let stored = null;
    try {
        stored = sessionStorage.getItem(STORAGE_KEY);
    } catch {
        // Storage blocked: fall back to this page's copy.
    }
    const token = stored || heldToken;
    return token && /^[A-Za-z0-9_-]{16,128}$/.test(token) ? token : null;
}

/**
 * Whether ``pathname`` is the bare invitation page, /invite, where the
 * token is read back from storage rather than the path.
 * @param {string} pathname
 * @returns {boolean}
 */
export function isInvitePath(pathname) {
    return pathname === INVITE_PATH || pathname === `${INVITE_PATH}/`;
}

/** Forget the stored token (accepted, or no longer valid). */
export function forgetInviteToken() {
    heldToken = null;
    try {
        sessionStorage.removeItem(STORAGE_KEY);
    } catch {
        // Nothing stored.
    }
}

/**
 * The server's masking of an address (app.api.teams.mask_email):
 * ``alice@example.com`` -> ``a***@example.com``, and a one-character
 * local part entirely (``***@x.com``). An account whose own address
 * masks differently is certainly not the invited one; one that masks
 * the same may still be refused by the server, which is the real check.
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email) {
    const value = email || '';
    const at = value.indexOf('@');
    const local = at === -1 ? '' : value.slice(0, at);
    const domain = at === -1 ? '' : value.slice(at + 1);
    if (!local || !domain) return '***';
    if (local.length === 1) return `***@${domain}`;
    return `${local[0]}***@${domain}`;
}

function screen() {
    let el = document.getElementById('invite-screen');
    if (!el) {
        el = document.createElement('div');
        el.id = 'invite-screen';
        el.className = 'screen';
        (document.getElementById('app') || document.body).appendChild(el);
    }
    return el;
}

function showOnly(el) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.add('hidden'));
    el.classList.remove('hidden');
}

/** Hide the invitation page (once accepted, the app takes over). */
export function hideInvite() {
    document.getElementById('invite-screen')?.classList.add('hidden');
    clearAuthNotice();
}

/** Remove the auth-screen note an earlier sign-in prompt left. */
export function clearAuthNotice() {
    document.getElementById(NOTICE_ID)?.remove();
}

function summary(preview) {
    const inviter = preview.invited_by_name
        ? `<strong>${escapeHtml(preview.invited_by_name)}</strong> invited you to join`
        : 'You have been invited to join';
    const role = ROLE_LABELS[preview.role] || `a ${escapeHtml(preview.role)}`;
    return `
        <p class="invite-lead">${inviter}</p>
        <h1 class="invite-team">${escapeHtml(preview.team_name)}</h1>
        <p>on Chaotic, as ${role}.</p>
        <p class="invite-muted">Sent to <strong>${escapeHtml(preview.email_hint)}</strong>${expiry(preview)}</p>`;
}

function expiry(preview) {
    const when = new Date(preview.expires_at);
    if (Number.isNaN(when.getTime())) return '';
    const date = when.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    return ` · expires ${escapeHtml(date)}`;
}

/**
 * Render the "no longer valid" page: nothing about the invitation.
 * @param {HTMLElement} el
 * @param {string} [message]
 */
export function renderGone(el, message = GONE_MESSAGE) {
    el.innerHTML = `
        <div class="invite-page">
            <h1>${escapeHtml(message)}</h1>
            <p class="invite-muted">Ask whoever invited you to send a new invitation.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`;
}

/**
 * The page for /invite with no token to read back: storage was blocked
 * and the page reloaded, or the address was typed (CHT-1792). It cannot
 * know which invitation this was, so it says how to get back to it.
 * @param {HTMLElement} el
 */
export function renderMissingToken(el) {
    el.innerHTML = `
        <div class="invite-page">
            <h1>Open your invitation link again</h1>
            <p>This page no longer has the invitation it was showing. Open the link in your
                invitation email again to see it.</p>
            <p class="invite-muted">If this happens each time you reload, your browser may be blocking
                site storage for Chaotic; open the link and accept without reloading.</p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Go to Chaotic</a>
            </div>
        </div>`;
}

/**
 * Take over the page with the missing-token hint (CHT-1792).
 */
export function showMissingToken() {
    const el = screen();
    clearAuthNotice();
    showOnly(el);
    renderMissingToken(el);
}

/**
 * The signed-out page: the invitation and a way to sign in or sign up.
 * @param {HTMLElement} el
 * @param {object} preview
 */
export function renderSignedOut(el, preview) {
    el.innerHTML = `
        <div class="invite-page">
            ${summary(preview)}
            <p>Sign in with that address to accept, or create an account with it.</p>
            <div class="invite-actions">
                <button type="button" id="invite-sign-up" class="btn btn-secondary">Create an account</button>
                <button type="button" id="invite-sign-in" class="btn btn-primary">Sign in to accept</button>
            </div>
        </div>`;
}

/**
 * The signed-in page. Accept only when the account could be the invited
 * one; otherwise say which address the invitation is for.
 * @param {HTMLElement} el
 * @param {object} preview
 * @param {object} user - the signed-in user (GET /auth/me)
 */
export function renderSignedIn(el, preview, user) {
    const mismatch = maskEmail(user.email) !== preview.email_hint;
    const you = `<p class="invite-muted">Signed in as <strong>${escapeHtml(user.email)}</strong></p>`;
    if (mismatch) {
        el.innerHTML = `
            <div class="invite-page">
                ${summary(preview)}
                ${you}
                <p class="invite-warning" role="alert">This invitation is for a different email address.
                    Only <strong>${escapeHtml(preview.email_hint)}</strong> can accept it. Sign out, then sign in
                    or create an account with that address.</p>
                <div class="invite-actions">
                    <a class="btn btn-secondary" href="/">Not now</a>
                    <button type="button" id="invite-sign-out" class="btn btn-primary">Sign out</button>
                </div>
            </div>`;
        return;
    }
    el.innerHTML = `
        <div class="invite-page">
            ${summary(preview)}
            ${you}
            <p id="invite-error" class="invite-warning hidden" role="alert"></p>
            <div class="invite-actions">
                <a class="btn btn-secondary" href="/">Not now</a>
                <button type="button" id="invite-accept" class="btn btn-primary">Accept invitation</button>
            </div>
        </div>`;
}

/**
 * Put a note on the auth screen saying why the person is signing in,
 * with a way back to the invitation.
 */
function showAuthNotice(preview, back) {
    clearAuthNotice();
    const container = document.querySelector('#auth-screen .auth-container');
    if (!container) return;
    const note = document.createElement('div');
    note.id = NOTICE_ID;
    note.className = 'invite-auth-notice';
    note.innerHTML = `
        <p>Sign in or create an account to join <strong>${escapeHtml(preview.team_name)}</strong>.
            Use the address the invitation was sent to: <strong>${escapeHtml(preview.email_hint)}</strong>.</p>
        <p><a href="#" id="invite-back">Back to the invitation</a></p>`;
    container.insertBefore(note, container.firstChild);
    note.querySelector('#invite-back').addEventListener('click', (event) => {
        event.preventDefault();
        clearAuthNotice();
        back();
    });
}

function showError(el, message) {
    const box = el.querySelector('#invite-error');
    if (!box) return;
    box.textContent = message;
    box.classList.remove('hidden');
}

/**
 * Take over the page for an invitation.
 *
 * @param {string} token
 * @param {object} deps
 * @param {object|null} deps.user - the signed-in user, or null
 * @param {(form: 'login'|'signup') => void} deps.showAuth - open the auth
 *     screen on this URL with the given form
 * @param {(teamId: string, teamName: string) => Promise<void>|void} deps.enterTeam -
 *     boot the app into the joined team
 * @param {() => void} deps.signOut - sign out and show this page again
 */
export async function showInvite(token, { user = null, showAuth, enterTeam, signOut } = {}) {
    const el = screen();
    clearAuthNotice();
    showOnly(el);
    el.innerHTML = '<div class="invite-page"><p>Loading invitation…</p></div>';
    let preview;
    try {
        preview = await api.getInvitation(token);
    } catch (e) {
        if (e && e.status === 404) {
            forgetInviteToken();
            renderGone(el);
        } else {
            renderGone(el, (e && e.message) || 'Something went wrong. Reload the page to try again.');
        }
        return;
    }

    if (!user) {
        renderSignedOut(el, preview);
        const prompt = (form) => {
            showAuthNotice(preview, () => showOnly(el));
            showAuth(form);
        };
        el.querySelector('#invite-sign-in').addEventListener('click', () => prompt('login'));
        el.querySelector('#invite-sign-up').addEventListener('click', () => prompt('signup'));
        return;
    }

    renderSignedIn(el, preview, user);
    el.querySelector('#invite-sign-out')?.addEventListener('click', () => signOut());
    const accept = el.querySelector('#invite-accept');
    if (!accept) return;
    let busy = false;
    accept.addEventListener('click', async () => {
        if (busy) return;
        busy = true;
        accept.disabled = true;
        let member;
        try {
            member = await api.acceptInvitation(token);
        } catch (e) {
            busy = false;
            accept.disabled = false;
            if (e && e.status === 401) {
                // The session expired on this page (review F7): sign out
                // and show the invitation signed out, with "Sign in to
                // accept"; the token is kept.
                signOut();
            } else if (e && (e.status === 404 || e.status === 400)) {
                // Used, revoked or expired since the page loaded.
                forgetInviteToken();
                renderGone(el);
            } else if (e && e.status === 403) {
                showError(el, `This invitation is for a different email address. Only ${preview.email_hint} can accept it.`);
            } else {
                showError(el, (e && e.message) || 'Something went wrong');
            }
            return;
        }
        // Joined. Never offer Accept again (review F8): the token is spent,
        // and a retry could only answer "no longer valid".
        forgetInviteToken();
        renderJoined(el, preview);
        try {
            await enterTeam(member.team_id, preview.team_name);
        } catch (e) {
            // The app failed to load the team; the person has still joined.
            console.error('Joined the team but could not open it:', e);
            showOnly(el);
            renderJoined(el, preview);
        }
    });
}

/**
 * The page after a successful accept: no Accept button, just the way in.
 * @param {HTMLElement} el
 * @param {object} preview
 */
export function renderJoined(el, preview) {
    el.innerHTML = `
        <div class="invite-page">
            <h1>You joined <span class="invite-team">${escapeHtml(preview.team_name)}</span></h1>
            <div class="invite-actions">
                <a class="btn btn-primary" href="/">Go to ${escapeHtml(preview.team_name)}</a>
            </div>
        </div>`;
}
