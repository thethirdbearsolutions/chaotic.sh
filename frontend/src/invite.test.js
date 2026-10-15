import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    inviteToken, maskEmail, showInvite, renderSignedIn, renderSignedOut, renderGone, hideInvite, GONE_MESSAGE,
    takeInviteToken, forgetInviteToken,
} from './invite.js';
import { api } from './api.js';

vi.mock('./api.js', () => ({
    api: {
        getInvitation: vi.fn(),
        acceptInvitation: vi.fn(),
        requestEmailVerification: vi.fn(),
        confirmEmailVerification: vi.fn(),
    },
}));

const TOKEN = 'Zm9vYmFyYmF6cXV4MDEyMzQ1Njc4OWFiY2RlZg_-AB';

function preview(overrides = {}) {
    return {
        team_name: 'Acme <Rockets>',
        role: 'member',
        invited_by_name: 'Wile E. <Coyote>',
        email_hint: 'r***@example.com',
        expires_at: '2026-10-22T00:00:00Z',
        ...overrides,
    };
}

const ROADRUNNER = { id: 'u1', email: 'roadrunner@example.com', name: 'Road Runner' };
const flush = () => new Promise((r) => setTimeout(r, 0));

function deps(overrides = {}) {
    return {
        user: null,
        showAuth: vi.fn(),
        enterTeam: vi.fn(),
        signOut: vi.fn(),
        ...overrides,
    };
}

function screenEl() {
    return document.getElementById('invite-screen');
}

beforeEach(() => {
    vi.resetAllMocks();
    forgetInviteToken();
    history.replaceState(null, '', '/');
    document.body.innerHTML = `
        <div id="app">
            <div id="auth-screen" class="screen hidden"><div class="auth-container"><div class="logo"></div></div></div>
            <div id="main-screen" class="screen"></div>
        </div>`;
});

describe('inviteToken', () => {
    it('extracts the token from an invite path', () => {
        expect(inviteToken(`/invite/${TOKEN}`)).toBe(TOKEN);
        expect(inviteToken(`/invite/${TOKEN}/`)).toBe(TOKEN);
    });

    it('rejects other paths and odd tokens', () => {
        expect(inviteToken('/')).toBeNull();
        expect(inviteToken('/issues')).toBeNull();
        expect(inviteToken('/invite/')).toBeNull();
        expect(inviteToken('/invite/short')).toBeNull();
        expect(inviteToken(`/invite/${TOKEN}/accept`)).toBeNull();
        expect(inviteToken('/invite/<script>alert(1)</script>xxxxxxxx')).toBeNull();
        expect(inviteToken(`/invites/${TOKEN}`)).toBeNull();
        expect(inviteToken(null)).toBeNull();
    });
});

describe('takeInviteToken (review F2)', () => {
    it('moves the token from the path into sessionStorage and out of the URL', () => {
        history.pushState(null, '', `/invite/${TOKEN}`);
        const before = history.length;

        expect(takeInviteToken()).toBe(TOKEN);

        expect(window.location.pathname).toBe('/invite');
        expect(window.location.href).not.toContain(TOKEN);
        expect(history.length).toBe(before); // replaced, not pushed
        expect(sessionStorage.getItem('chaotic.inviteToken')).toBe(TOKEN);
    });

    it('reads it back on /invite (a reload, or the return after sign-in)', () => {
        history.replaceState(null, '', `/invite/${TOKEN}`);
        takeInviteToken();

        expect(takeInviteToken()).toBe(TOKEN);
        history.replaceState(null, '', '/invite/');
        expect(takeInviteToken()).toBe(TOKEN);
    });

    it('is null elsewhere, or on /invite with nothing stored', () => {
        history.replaceState(null, '', '/issues');
        expect(takeInviteToken()).toBeNull();
        history.replaceState(null, '', '/invite');
        expect(takeInviteToken()).toBeNull();
    });

    it('ignores a tampered stored value', () => {
        sessionStorage.setItem('chaotic.inviteToken', '<script>');
        history.replaceState(null, '', '/invite');
        expect(takeInviteToken()).toBeNull();
    });

    it('still works for this page when storage is blocked', () => {
        const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
        const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
        try {
            history.replaceState(null, '', `/invite/${TOKEN}`);
            expect(takeInviteToken()).toBe(TOKEN);
            expect(window.location.pathname).toBe('/invite');
            expect(takeInviteToken()).toBe(TOKEN);
        } finally {
            setItem.mockRestore();
            getItem.mockRestore();
        }
    });

    it('forgetInviteToken clears it', () => {
        history.replaceState(null, '', `/invite/${TOKEN}`);
        takeInviteToken();
        forgetInviteToken();
        expect(takeInviteToken()).toBeNull();
    });
});

describe('maskEmail', () => {
    it('masks like the server (app.api.teams.mask_email)', () => {
        expect(maskEmail('alice@example.com')).toBe('a***@example.com');
        expect(maskEmail('a@example.com')).toBe('***@example.com');
        expect(maskEmail('ab@example.com')).toBe('a***@example.com');
        expect(maskEmail('Bob.Smith@Mail.Example.org')).toBe('B***@Mail.Example.org');
        expect(maskEmail('no-at-sign')).toBe('***');
        expect(maskEmail('@example.com')).toBe('***');
        expect(maskEmail('alice@')).toBe('***');
        expect(maskEmail('')).toBe('***');
        expect(maskEmail(undefined)).toBe('***');
    });
});

describe('rendering', () => {
    it('escapes everything the server sends', () => {
        const el = document.createElement('div');
        renderSignedOut(el, preview({ email_hint: '<b>x</b>@e.com' }));
        expect(el.innerHTML).not.toContain('<Rockets>');
        expect(el.innerHTML).not.toContain('<Coyote>');
        expect(el.innerHTML).not.toContain('<b>x</b>');
        expect(el.textContent).toContain('Acme <Rockets>');
        expect(el.textContent).toContain('Wile E. <Coyote>');
    });

    it('shows team, role and inviter', () => {
        const el = document.createElement('div');
        renderSignedOut(el, preview({ role: 'admin' }));
        expect(el.querySelector('.invite-team').textContent).toBe('Acme <Rockets>');
        expect(el.textContent).toContain('as an admin');
        expect(el.textContent).toContain('Wile E. <Coyote> invited you to join');
        expect(el.textContent).toContain('Sent to r***@example.com');
    });

    it('says when it expires, and copes with a bad date', () => {
        const el = document.createElement('div');
        renderSignedOut(el, preview({ expires_at: '2026-10-22T12:00:00Z' }));
        expect(el.textContent).toContain('expires');
        expect(el.textContent).toContain('2026');

        renderSignedOut(el, preview({ expires_at: 'not a date' }));
        expect(el.textContent).not.toContain('expires');
    });

    it('copes with an inviter who is gone', () => {
        const el = document.createElement('div');
        renderSignedOut(el, preview({ invited_by_name: null }));
        expect(el.textContent).toContain('You have been invited to join');
    });

    it('the gone page says nothing about the invitation', () => {
        const el = document.createElement('div');
        renderGone(el);
        expect(el.querySelector('h1').textContent).toBe(GONE_MESSAGE);
        expect(el.textContent).not.toContain('Acme');
    });

    it('offers accept to an account that could be the invited one', () => {
        const el = document.createElement('div');
        renderSignedIn(el, preview(), ROADRUNNER);
        expect(el.querySelector('#invite-accept')).not.toBeNull();
        expect(el.textContent).toContain('Signed in as roadrunner@example.com');
        expect(el.querySelector('.invite-warning:not(.hidden)')).toBeNull();
    });

    it('tells a different account so, and offers no accept', () => {
        const el = document.createElement('div');
        renderSignedIn(el, preview(), { ...ROADRUNNER, email: 'coyote@acme.test' });
        expect(el.querySelector('#invite-accept')).toBeNull();
        expect(el.querySelector('#invite-sign-out')).not.toBeNull();
        const warning = el.querySelector('[role="alert"]').textContent;
        expect(warning).toContain('different email address');
        expect(warning).toContain('r***@example.com');
    });

    it('ignores a case difference, like the server (CHT-1789)', () => {
        const el = document.createElement('div');
        renderSignedIn(el, preview(), { ...ROADRUNNER, email: 'roadrunner@EXAMPLE.com' });
        expect(el.querySelector('#invite-accept')).not.toBeNull();
    });
});

describe('showInvite', () => {
    it('fetches the preview with the token from the path', async () => {
        api.getInvitation.mockResolvedValue(preview());
        await showInvite(TOKEN, deps());
        expect(api.getInvitation).toHaveBeenCalledWith(TOKEN);
    });

    it('takes over the page, hiding the other screens', async () => {
        api.getInvitation.mockResolvedValue(preview());
        await showInvite(TOKEN, deps());
        expect(screenEl().classList.contains('hidden')).toBe(false);
        expect(document.getElementById('main-screen').classList.contains('hidden')).toBe(true);
    });

    it.each([
        [404, GONE_MESSAGE],
        [429, 'Too many attempts'],
    ])('a %i shows only a plain message', async (status, text) => {
        api.getInvitation.mockRejectedValue(Object.assign(new Error('This invitation is no longer valid'), { status }));
        await showInvite(TOKEN, deps());
        expect(screenEl().textContent).toContain(text);
        expect(screenEl().querySelector('button')).toBeNull();
    });

    it('a network error says so', async () => {
        api.getInvitation.mockRejectedValue(Object.assign(new Error('Network error - check your connection'), {
            isNetworkError: true,
        }));
        await showInvite(TOKEN, deps());
        expect(screenEl().textContent).toContain('Network error');
    });

    describe('signed out', () => {
        it.each([['#invite-sign-in', 'login'], ['#invite-sign-up', 'signup']])(
            '%s opens the auth screen with a note and a way back', async (button, form) => {
                api.getInvitation.mockResolvedValue(preview());
                const d = deps();
                await showInvite(TOKEN, d);

                screenEl().querySelector(button).click();

                expect(d.showAuth).toHaveBeenCalledWith(form);
                const note = document.getElementById('invite-auth-notice');
                expect(note.textContent).toContain('join Acme <Rockets>');
                expect(note.textContent).toContain('r***@example.com');
                expect(note.innerHTML).not.toContain('<Rockets>');

                note.querySelector('#invite-back').click();
                expect(document.getElementById('invite-auth-notice')).toBeNull();
                expect(screenEl().classList.contains('hidden')).toBe(false);
            },
        );

        it('never accepts', async () => {
            api.getInvitation.mockResolvedValue(preview());
            await showInvite(TOKEN, deps());
            expect(screenEl().querySelector('#invite-accept')).toBeNull();
            expect(api.acceptInvitation).not.toHaveBeenCalled();
        });

        it('coming back after sign-in clears the note', async () => {
            api.getInvitation.mockResolvedValue(preview());
            await showInvite(TOKEN, deps());
            screenEl().querySelector('#invite-sign-in').click();
            expect(document.getElementById('invite-auth-notice')).not.toBeNull();

            await showInvite(TOKEN, deps({ user: ROADRUNNER }));

            expect(document.getElementById('invite-auth-notice')).toBeNull();
        });
    });

    describe('signed in', () => {
        it('accepts and enters the team', async () => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockResolvedValue({ id: 'm1', team_id: 'team-1', role: 'member' });
            const d = deps({ user: ROADRUNNER });
            await showInvite(TOKEN, d);

            screenEl().querySelector('#invite-accept').click();
            await flush();

            expect(api.acceptInvitation).toHaveBeenCalledWith(TOKEN);
            expect(d.enterTeam).toHaveBeenCalledWith('team-1', 'Acme <Rockets>');
        });

        it('accepts once however often it is clicked', async () => {
            api.getInvitation.mockResolvedValue(preview());
            let finish;
            api.acceptInvitation.mockReturnValue(new Promise((r) => { finish = r; }));
            await showInvite(TOKEN, deps({ user: ROADRUNNER }));

            const accept = screenEl().querySelector('#invite-accept');
            accept.click();
            accept.click();
            finish({ team_id: 'team-1' });
            await flush();

            expect(api.acceptInvitation).toHaveBeenCalledTimes(1);
        });

        it.each([404, 400])('a %i on accept (used, revoked or expired meanwhile) shows the plain message', async (status) => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockRejectedValue(Object.assign(new Error('Invitation not found'), { status }));
            const d = deps({ user: ROADRUNNER });
            await showInvite(TOKEN, d);

            screenEl().querySelector('#invite-accept').click();
            await flush();

            expect(screenEl().querySelector('h1').textContent).toBe(GONE_MESSAGE);
            expect(d.enterTeam).not.toHaveBeenCalled();
        });

        it('an account whose address differs only in case may accept (CHT-1789)', async () => {
            api.getInvitation.mockResolvedValue(preview({ email_hint: 'r***@example.com' }));
            await showInvite(TOKEN, deps({ user: { ...ROADRUNNER, email: 'RoadRunner@Example.com' } }));
            expect(screenEl().querySelector('#invite-accept')).not.toBeNull();
        });

        it('a 403 on accept says the address differs', async () => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockRejectedValue(Object.assign(new Error('Invitation is for a different email'), {
                status: 403,
            }));
            await showInvite(TOKEN, deps({ user: ROADRUNNER }));

            screenEl().querySelector('#invite-accept').click();
            await flush();

            const error = screenEl().querySelector('#invite-error');
            expect(error.classList.contains('hidden')).toBe(false);
            expect(error.textContent).toContain('different email address');
            expect(screenEl().querySelector('#invite-accept').disabled).toBe(false);
        });

        it('a 403 for an unverified address shows the server message, not a mismatch', async () => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockRejectedValue(Object.assign(
                new Error('Verify your email address before accepting an invitation'),
                { status: 403, detail: { error_code: 'email_unverified', message: 'Verify your email address before accepting an invitation' } },
            ));
            await showInvite(TOKEN, deps({ user: ROADRUNNER }));

            screenEl().querySelector('#invite-accept').click();
            await flush();

            const error = screenEl().querySelector('#invite-error');
            expect(error.textContent).toContain('Verify your email address');
            expect(error.textContent).not.toContain('different email address');
        });

        it('another error is shown and accept can be retried', async () => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockRejectedValueOnce(new Error('Network error - check your connection'));
            api.acceptInvitation.mockResolvedValueOnce({ team_id: 'team-1' });
            const d = deps({ user: ROADRUNNER });
            await showInvite(TOKEN, d);

            const accept = screenEl().querySelector('#invite-accept');
            accept.click();
            await flush();
            expect(screenEl().querySelector('#invite-error').textContent).toContain('Network error');

            accept.click();
            await flush();
            expect(d.enterTeam).toHaveBeenCalledWith('team-1', 'Acme <Rockets>');
        });

        it('after joining shows a joined state, never Accept again (review F8)', async () => {
            sessionStorage.setItem('chaotic.inviteToken', TOKEN);
            api.getInvitation.mockResolvedValue(preview());
            let finish;
            api.acceptInvitation.mockResolvedValue({ team_id: 'team-1' });
            const d = deps({ user: ROADRUNNER, enterTeam: vi.fn(() => new Promise((r) => { finish = r; })) });
            await showInvite(TOKEN, d);

            screenEl().querySelector('#invite-accept').click();
            await flush();

            expect(screenEl().querySelector('#invite-accept')).toBeNull();
            expect(screenEl().querySelector('h1').textContent).toBe('You joined Acme <Rockets>');
            expect(screenEl().querySelector('a.btn').getAttribute('href')).toBe('/');
            expect(sessionStorage.getItem('chaotic.inviteToken')).toBeNull();
            finish();
        });

        it('if opening the team fails after joining, the joined state stays (review F8)', async () => {
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockResolvedValue({ team_id: 'team-1' });
            const errors = vi.spyOn(console, 'error').mockImplementation(() => {});
            const d = deps({ user: ROADRUNNER, enterTeam: vi.fn().mockRejectedValue(new Error('boom')) });
            await showInvite(TOKEN, d);
            screenEl().classList.add('hidden'); // as enterTeam's hideInvite would

            screenEl().querySelector('#invite-accept').click();
            await flush();

            expect(screenEl().classList.contains('hidden')).toBe(false);
            expect(screenEl().textContent).toContain('You joined');
            expect(screenEl().querySelector('#invite-accept')).toBeNull();
            expect(screenEl().textContent).not.toContain('boom');
            expect(api.acceptInvitation).toHaveBeenCalledTimes(1);
            errors.mockRestore();
        });

        it('a 401 on accept signs out and shows the invitation signed out (review F7)', async () => {
            sessionStorage.setItem('chaotic.inviteToken', TOKEN);
            api.getInvitation.mockResolvedValue(preview());
            api.acceptInvitation.mockRejectedValue(Object.assign(new Error('Could not validate credentials'), {
                status: 401,
            }));
            const d = deps({ user: ROADRUNNER });
            await showInvite(TOKEN, d);

            screenEl().querySelector('#invite-accept').click();
            await flush();

            expect(d.signOut).toHaveBeenCalled();
            expect(sessionStorage.getItem('chaotic.inviteToken')).toBe(TOKEN);
        });

        it('a gone invitation forgets the stored token', async () => {
            sessionStorage.setItem('chaotic.inviteToken', TOKEN);
            api.getInvitation.mockRejectedValue(Object.assign(new Error('gone'), { status: 404 }));
            await showInvite(TOKEN, deps());
            expect(sessionStorage.getItem('chaotic.inviteToken')).toBeNull();
        });

        it('a different account can sign out', async () => {
            api.getInvitation.mockResolvedValue(preview());
            const d = deps({ user: { ...ROADRUNNER, email: 'coyote@acme.test' } });
            await showInvite(TOKEN, d);

            screenEl().querySelector('#invite-sign-out').click();

            expect(d.signOut).toHaveBeenCalled();
            expect(api.acceptInvitation).not.toHaveBeenCalled();
        });
    });
});

describe('email verification on the invite page (CHT-1790)', () => {
    const MEMBER = { team_id: 'team-1' };
    const SENT = { email: 'roadrunner@example.com', expires_at: '2026-10-22T00:15:00Z' };

    function refusal(status, errorCode, message) {
        return Object.assign(new Error(message), { status, detail: { error_code: errorCode, message } });
    }

    const unverified = () => refusal(403, 'email_unverified', 'Verify your email address before accepting');

    async function openUnverified(d = deps({ user: ROADRUNNER })) {
        api.getInvitation.mockResolvedValue(preview());
        api.acceptInvitation.mockRejectedValueOnce(unverified());
        await showInvite(TOKEN, d);
        screenEl().querySelector('#invite-accept').click();
        await flush();
        return d;
    }

    const q = (sel) => screenEl().querySelector(sel);
    const visible = (sel) => !q(sel).classList.contains('hidden');

    async function submitCode(value) {
        q('#invite-code').value = value;
        q('#invite-code-form').dispatchEvent(new Event('submit', { cancelable: true }));
        await flush();
    }

    it('an unverified refusal offers Send code instead of Accept', async () => {
        await openUnverified();
        expect(visible('#invite-verify')).toBe(true);
        expect(visible('#invite-accept-actions')).toBe(false);
        expect(visible('#invite-code-form')).toBe(false);
        expect(q('#invite-error').textContent).toContain('Verify your email address');
        expect(q('#invite-error').textContent).not.toContain('different email address');
        expect(q('#invite-verify').textContent).toContain('roadrunner@example.com');
    });

    it('Send code asks for a code and shows the code box', async () => {
        await openUnverified();
        api.requestEmailVerification.mockResolvedValue(SENT);
        q('#invite-send-code').click();
        await flush();
        expect(api.requestEmailVerification).toHaveBeenCalledTimes(1);
        expect(visible('#invite-code-form')).toBe(true);
        expect(q('#invite-verify-status').textContent).toContain('We sent a code to roadrunner@example.com');
        expect(q('#invite-send-code').textContent).toBe('Send a new code');
        expect(q('#invite-send-code').disabled).toBe(false);
    });

    it('a confirmed code accepts again by itself and enters the team', async () => {
        const d = await openUnverified();
        api.requestEmailVerification.mockResolvedValue(SENT);
        api.confirmEmailVerification.mockResolvedValue({ email_verified_at: '2026-10-22T00:01:00Z' });
        api.acceptInvitation.mockResolvedValueOnce(MEMBER);
        q('#invite-send-code').click();
        await flush();
        await submitCode(' 123456 ');
        await flush();
        expect(api.confirmEmailVerification).toHaveBeenCalledWith('123456');
        expect(api.acceptInvitation).toHaveBeenCalledTimes(2);
        expect(d.enterTeam).toHaveBeenCalledWith('team-1', 'Acme <Rockets>');
        expect(screenEl().textContent).toContain('You joined');
    });

    it('a wrong code says so and leaves the box up to try again', async () => {
        await openUnverified();
        api.requestEmailVerification.mockResolvedValue(SENT);
        api.confirmEmailVerification.mockRejectedValue(
            refusal(400, 'invalid_verification_code', 'That code is wrong, has expired or has been used up.'));
        q('#invite-send-code').click();
        await flush();
        await submitCode('000000');
        expect(q('#invite-verify-status').textContent).toContain('That code is wrong');
        expect(visible('#invite-code-form')).toBe(true);
        expect(q('#invite-confirm-code').disabled).toBe(false);
        expect(api.acceptInvitation).toHaveBeenCalledTimes(1);
    });

    it('an empty code is not sent', async () => {
        await openUnverified();
        await submitCode('   ');
        expect(api.confirmEmailVerification).not.toHaveBeenCalled();
    });

    it('a 429 shows the wait and still offers the code box', async () => {
        await openUnverified();
        api.requestEmailVerification.mockRejectedValue(
            refusal(429, 'email_verification_rate_limited', 'Wait 42 s before asking for another.'));
        q('#invite-send-code').click();
        await flush();
        expect(q('#invite-verify-status').textContent).toContain('Wait 42 s');
        expect(visible('#invite-code-form')).toBe(true);
    });

    it.each([
        [409, 'email_verification_unavailable', 'Email verification is unavailable: this server has no SMTP'],
        [502, 'email_send_failed', 'The verification email could not be sent'],
    ])('a %s shows the server message and no code box', async (status, errorCode, message) => {
        await openUnverified();
        api.requestEmailVerification.mockRejectedValue(refusal(status, errorCode, message));
        q('#invite-send-code').click();
        await flush();
        expect(q('#invite-verify-status').textContent).toContain(message);
        expect(visible('#invite-code-form')).toBe(false);
    });

    it('server text is shown as text, never as markup', async () => {
        await openUnverified();
        api.requestEmailVerification.mockRejectedValue(refusal(502, 'email_send_failed', '<img src=x onerror=alert(1)>'));
        q('#invite-send-code').click();
        await flush();
        expect(q('#invite-verify-status').querySelector('img')).toBeNull();
        expect(q('#invite-verify-status').textContent).toContain('<img');
    });

    it('already verified (elsewhere) just accepts again', async () => {
        await openUnverified();
        api.requestEmailVerification.mockRejectedValue(
            refusal(409, 'email_already_verified', 'Your email address is already verified.'));
        api.acceptInvitation.mockResolvedValueOnce(MEMBER);
        q('#invite-send-code').click();
        await flush();
        await flush();
        expect(api.acceptInvitation).toHaveBeenCalledTimes(2);
        expect(screenEl().textContent).toContain('You joined');
    });

    it('already verified on confirm also accepts again', async () => {
        await openUnverified();
        api.confirmEmailVerification.mockRejectedValue(
            refusal(409, 'email_already_verified', 'Your email address is already verified.'));
        api.acceptInvitation.mockResolvedValueOnce(MEMBER);
        await submitCode('123456');
        await flush();
        expect(api.acceptInvitation).toHaveBeenCalledTimes(2);
    });

    it('an expired session signs out from either step', async () => {
        const d = await openUnverified();
        api.requestEmailVerification.mockRejectedValue(Object.assign(new Error('expired'), { status: 401 }));
        q('#invite-send-code').click();
        await flush();
        expect(d.signOut).toHaveBeenCalledTimes(1);
        api.confirmEmailVerification.mockRejectedValue(Object.assign(new Error('expired'), { status: 401 }));
        await submitCode('123456');
        expect(d.signOut).toHaveBeenCalledTimes(2);
    });

    it('a failed request without a message falls back to a generic one', async () => {
        await openUnverified();
        api.requestEmailVerification.mockRejectedValue(null);
        q('#invite-send-code').click();
        await flush();
        expect(q('#invite-verify-status').textContent).toBe('Something went wrong');
        api.confirmEmailVerification.mockRejectedValue(null);
        await submitCode('123456');
        expect(q('#invite-verify-status').textContent).toBe('Something went wrong');
    });

    it('an unparseable expiry is left out of the message', async () => {
        await openUnverified();
        api.requestEmailVerification.mockResolvedValue({ email: 'roadrunner@example.com', expires_at: 'soon' });
        q('#invite-send-code').click();
        await flush();
        expect(q('#invite-verify-status').textContent).toBe('We sent a code to roadrunner@example.com.');
    });
});

describe('hideInvite', () => {
    it('hides the page and the auth note', async () => {
        api.getInvitation.mockResolvedValue(preview());
        await showInvite(TOKEN, deps());
        screenEl().querySelector('#invite-sign-in').click();

        hideInvite();

        expect(screenEl().classList.contains('hidden')).toBe(true);
        expect(document.getElementById('invite-auth-notice')).toBeNull();
    });
});
