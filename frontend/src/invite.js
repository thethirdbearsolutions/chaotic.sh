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
 * With SMTP configured on the server, accepting also needs a verified
 * address (CHT-1790): the server refuses with `email_unverified`, and the
 * page then offers "Send code" and a box for the six-digit code it mails,
 * and tries the accept again by itself once the code is confirmed.
 *
 * The token is a bearer credential: without SMTP, while the invited
 * address has no account, whoever holds it can sign up as that address
 * and join (CHT-1790). So on load it moves from the path into sessionStorage and
 * the address bar becomes /invite (no history entry, no later Referer);
 * the page is served with Referrer-Policy: no-referrer; and the token goes
 * only to this server's own API, never in a query string.
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
 * address bar is rewritten to /invite, so it leaves no history entry
 * and no later Referer (CHT-1265 review F2). On /invite it is read back
 * from there: a reload, or the return after signing in, still works.
 * Anywhere else, null.
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
    if (pathname !== INVITE_PATH && pathname !== `${INVITE_PATH}/`) return null;
    let stored = null;
    try {
        stored = sessionStorage.getItem(STORAGE_KEY);
    } catch {
        // Storage blocked: fall back to this page's copy.
    }
    const token = stored || heldToken;
    return token && /^[A-Za-z0-9_-]{16,128}$/.test(token) ? token : null;
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
    // Ignoring case, as the server compares (CHT-1789).
    const mismatch = maskEmail(user.email).toLowerCase() !== String(preview.email_hint || '').toLowerCase();
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
            <div id="invite-verify" class="invite-verify hidden">
                <p>Verify your email address to continue: we will email a six-digit code to
                    <strong>${escapeHtml(user.email)}</strong>.</p>
                <form id="invite-code-form" class="invite-code-form hidden">
                    <div class="form-group">
                        <label for="invite-code">Code from the email</label>
                        <input type="text" id="invite-code" inputmode="numeric" autocomplete="one-time-code"
                            pattern="[0-9]{6}" maxlength="6" required>
                    </div>
                    <button type="submit" id="invite-confirm-code" class="btn btn-primary">Verify</button>
                </form>
                <p id="invite-verify-status" class="invite-muted hidden" role="status"></p>
                <div class="invite-actions">
                    <button type="button" id="invite-send-code" class="btn btn-secondary">Send code</button>
                </div>
            </div>
            <div class="invite-actions" id="invite-accept-actions">
                <a class="btn btn-secondary" href="/">Not now</a>
                <button type="button" id="invite-accept" class="btn btn-primary">Accept invitation</button>
            </div>
        </div>`;
}

function clockTime(iso) {
    const when = new Date(iso);
    if (Number.isNaN(when.getTime())) return '';
    return when.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

/**
 * The email-verification step (CHT-1790): "Send code", then the code,
 * then `onVerified` (which accepts again). Every message is set with
 * textContent.
 * @param {HTMLElement} el
 * @param {object} handlers
 * @param {() => void} handlers.onVerified - the address is verified (or already was)
 * @param {() => void} handlers.signOut - the session expired
 */
function wireVerification(el, { onVerified, signOut }) {
    const box = el.querySelector('#invite-verify');
    const send = el.querySelector('#invite-send-code');
    const form = el.querySelector('#invite-code-form');
    const input = el.querySelector('#invite-code');
    const confirm = el.querySelector('#invite-confirm-code');
    const status = el.querySelector('#invite-verify-status');
    const say = (message) => {
        status.textContent = message;
        status.classList.remove('hidden');
    };
    const showForm = () => {
        form.classList.remove('hidden');
        input.focus?.();
    };

    send.addEventListener('click', async () => {
        if (send.disabled) return;
        send.disabled = true;
        try {
            const sent = await api.requestEmailVerification();
            const until = clockTime(sent.expires_at);
            say(`We sent a code to ${sent.email}${until ? `; it works until ${until}` : ''}.`);
            send.textContent = 'Send a new code';
            showForm();
        } catch (e) {
            const code = e && e.detail && e.detail.error_code;
            if (e && e.status === 401) {
                signOut();
                return;
            }
            if (code === 'email_already_verified') {
                onVerified();
                return;
            }
            say((e && e.message) || 'Something went wrong');
            // Rate limited: a code sent a moment ago may still be on its way.
            if (e && e.status === 429) showForm();
        } finally {
            send.disabled = false;
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (confirm.disabled) return;
        const value = input.value.trim();
        if (!value) return;
        confirm.disabled = true;
        try {
            await api.confirmEmailVerification(value);
        } catch (e) {
            confirm.disabled = false;
            const code = e && e.detail && e.detail.error_code;
            if (e && e.status === 401) {
                signOut();
            } else if (code === 'email_already_verified') {
                onVerified();
            } else {
                say((e && e.message) || 'Something went wrong');
                input.select?.();
            }
            return;
        }
        confirm.disabled = false;
        box.classList.add('hidden');
        onVerified();
    });
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
        } else if (e && e.status === 429) {
            renderGone(el, 'Too many attempts. Wait a minute and reload this page.');
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
    const doAccept = async () => {
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
            } else if (e && e.status === 403 && e.detail && e.detail.error_code === 'email_unverified') {
                // CHT-1790: with SMTP on, the account must verify its
                // address first. Not a mismatch: offer the code instead.
                showError(el, 'Verify your email address to continue.');
                el.querySelector('#invite-accept-actions').classList.add('hidden');
                el.querySelector('#invite-verify').classList.remove('hidden');
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
    };
    accept.addEventListener('click', doAccept);
    wireVerification(el, {
        onVerified: () => {
            el.querySelector('#invite-verify').classList.add('hidden');
            el.querySelector('#invite-error').classList.add('hidden');
            el.querySelector('#invite-accept-actions').classList.remove('hidden');
            doAccept();
        },
        signOut,
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
