/**
 * Invitation landing page, /invite/<token> (CHT-1265).
 *
 * The invitation email links here (CHT-1251). The page reads the public
 * preview (GET /api/teams/invitations/<token>: team, role, inviter and a
 * masked address) and:
 *
 *   - signed out: shows the invitation with "Sign in" and "Create an
 *     account". Both open the normal auth screen on this same URL, with a
 *     note saying what it is for; after signing in, initApp() sees the
 *     invite path and brings the person back here;
 *   - signed in as the invited address: Accept joins the team, drops the
 *     token from the address bar and boots the app into that team;
 *   - signed in as someone else: says so, plainly, and offers to sign out.
 *     The server only lets the invited address accept (the same rule as
 *     POST /teams/invitations/<token>/accept), so Accept is not offered.
 *
 * An unknown, expired, used or revoked invitation gets one message, "This
 * invitation is no longer valid", and nothing else: the server answers
 * all of them with the same 404.
 *
 * The token is a secret. It goes only to this server's own API, never in
 * a query string, and the page's links leave no Referer elsewhere (the
 * shell is served with Referrer-Policy: same-origin).
 */

import { api } from './api.js';
import { escapeHtml } from './utils.js';

const INVITE_PREFIX = '/invite/';
const NOTICE_ID = 'invite-auth-notice';
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
 * The server's masking of an address (app.api.teams.mask_email):
 * ``alice@example.com`` -> ``a***@example.com``. An account whose own
 * address masks differently is certainly not the invited one.
 * @param {string} email
 * @returns {string}
 */
export function maskEmail(email) {
    const value = email || '';
    const at = value.indexOf('@');
    const local = at === -1 ? '' : value.slice(0, at);
    const domain = at === -1 ? '' : value.slice(at + 1);
    if (!local || !domain) return '***';
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
    accept.addEventListener('click', async () => {
        if (busy) return;
        busy = true;
        accept.disabled = true;
        try {
            const member = await api.acceptInvitation(token);
            await enterTeam(member.team_id, preview.team_name);
        } catch (e) {
            busy = false;
            accept.disabled = false;
            if (e && (e.status === 404 || e.status === 400)) {
                // Used, revoked or expired since the page loaded.
                renderGone(el);
            } else if (e && e.status === 403) {
                showError(el, `This invitation is for a different email address. Only ${preview.email_hint} can accept it.`);
            } else {
                showError(el, (e && e.message) || 'Something went wrong');
            }
        }
    });
}
