import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./auth.js', () => ({
    showMainScreen: vi.fn(), updateUserInfo: vi.fn(), showAuthScreen: vi.fn(), showLogin: vi.fn(), showSignup: vi.fn(),
}));
vi.mock('./teams.js', () => ({ getTeams: vi.fn(() => []), loadTeams: vi.fn(), selectTeam: vi.fn() }));
vi.mock('./onboarding.js', () => ({ showOnboarding: vi.fn(), hasCompletedOnboarding: vi.fn(() => true) }));
vi.mock('./router.js', () => ({ initRouter: vi.fn() }));
vi.mock('./oauth-consent.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showConsent: vi.fn(),
}));
vi.mock('./invite.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showInvite: vi.fn(),
    hideInvite: vi.fn(),
}));
vi.mock('./ui.js', () => ({ showToast: vi.fn() }));
vi.mock('./api.js', () => ({ api: { logout: vi.fn() } }));

import { initApp, openInvite, showSignedOut } from './init.js';
import { showMainScreen, showAuthScreen, showLogin, showSignup } from './auth.js';
import { showInvite, hideInvite } from './invite.js';
import { showToast } from './ui.js';
import { api } from './api.js';
import { getCurrentUser, setCurrentUser } from './state.js';
import { loadTeams, getTeams, selectTeam } from './teams.js';
import { showConsent } from './oauth-consent.js';
import { initRouter } from './router.js';
import { showOnboarding, hasCompletedOnboarding } from './onboarding.js';

describe('initApp', () => {
    beforeEach(() => {
        // Reset implementations too, not only calls, so one test's
        // mockReturnValue/mockRejectedValue cannot leak into the next.
        vi.resetAllMocks();
        getTeams.mockReturnValue([]);
        hasCompletedOnboarding.mockReturnValue(true);
        history.replaceState(null, '', '/');
    });

    it('shows only the consent page on an OAuth consent route (CHT-1519)', async () => {
        history.replaceState(null, '', '/oauth/consent/abcdefghijklmnop0123');
        await initApp();
        expect(showConsent).toHaveBeenCalledWith('abcdefghijklmnop0123');
        expect(showMainScreen).not.toHaveBeenCalled();
        expect(loadTeams).not.toHaveBeenCalled();
    });

    it('boots the app everywhere else', async () => {
        getTeams.mockReturnValue([{ id: 't1' }]);
        await initApp();
        expect(showConsent).not.toHaveBeenCalled();
        expect(showMainScreen).toHaveBeenCalled();
        expect(selectTeam).toHaveBeenCalledWith({ id: 't1' }, true);
    });

    describe('popstate listener (CHT-1697)', () => {
        it('is installed only after the team has loaded', async () => {
            getTeams.mockReturnValue([{ id: 't1' }]);
            let finishTeam;
            selectTeam.mockReturnValue(new Promise((r) => { finishTeam = r; }));

            const booting = initApp();
            await new Promise((r) => setTimeout(r, 0));
            expect(selectTeam).toHaveBeenCalled();
            expect(initRouter).not.toHaveBeenCalled();

            finishTeam();
            await booting;
            expect(initRouter).toHaveBeenCalledTimes(1);
        });

        it('is installed even if loading the team fails', async () => {
            getTeams.mockReturnValue([{ id: 't1' }]);
            selectTeam.mockRejectedValueOnce(new Error('boom'));
            await expect(initApp()).rejects.toThrow('boom');
            expect(initRouter).toHaveBeenCalledTimes(1);
        });

        it('is installed with no team once onboarding is done', async () => {
            getTeams.mockReturnValue([]);
            await initApp();
            expect(selectTeam).not.toHaveBeenCalled();
            expect(initRouter).toHaveBeenCalledTimes(1);
        });

        it('waits while onboarding, which calls initApp again', async () => {
            getTeams.mockReturnValue([]);
            hasCompletedOnboarding.mockReturnValueOnce(false);
            await initApp();
            expect(showOnboarding).toHaveBeenCalled();
            expect(initRouter).not.toHaveBeenCalled();
        });

        it('is not installed on the consent page', async () => {
            history.replaceState(null, '', '/oauth/consent/abcdefghijklmnop0123');
            await initApp();
            expect(initRouter).not.toHaveBeenCalled();
        });
    });
});

describe('invitation links (CHT-1265)', () => {
    const TOKEN = 'Zm9vYmFyYmF6cXV4MDEyMzQ1Njc4OWFiY2RlZg_-AB';

    beforeEach(() => {
        vi.resetAllMocks();
        getTeams.mockReturnValue([]);
        hasCompletedOnboarding.mockReturnValue(true);
        setCurrentUser(null);
        history.replaceState(null, '', `/invite/${TOKEN}`);
    });

    it('after sign-in, initApp brings the person back to the invitation', async () => {
        setCurrentUser({ id: 'u1', email: 'r@example.com' });
        await initApp();
        expect(showInvite).toHaveBeenCalledWith(TOKEN, expect.objectContaining({ user: getCurrentUser() }));
        expect(showMainScreen).not.toHaveBeenCalled();
        expect(loadTeams).not.toHaveBeenCalled();
        expect(initRouter).not.toHaveBeenCalled();
    });

    it('signed out, the invitation page shows instead of the sign-in form', async () => {
        await showSignedOut();
        expect(showInvite).toHaveBeenCalledWith(TOKEN, expect.objectContaining({ user: null }));
        expect(showAuthScreen).not.toHaveBeenCalled();
    });

    it('signed out anywhere else, the sign-in form shows', async () => {
        history.replaceState(null, '', '/issues');
        await showSignedOut();
        expect(showAuthScreen).toHaveBeenCalled();
        expect(showInvite).not.toHaveBeenCalled();
    });

    it('the page opens the login or signup form on the same URL', async () => {
        await openInvite(TOKEN);
        const { showAuth } = showInvite.mock.calls[0][1];

        showAuth('signup');
        expect(showAuthScreen).toHaveBeenCalled();
        expect(showSignup).toHaveBeenCalled();

        showAuth('login');
        expect(showLogin).toHaveBeenCalled();
        expect(window.location.pathname).toBe(`/invite/${TOKEN}`);
    });

    it('accepting drops the token from the URL and boots into the joined team', async () => {
        await openInvite(TOKEN);
        const { enterTeam } = showInvite.mock.calls[0][1];
        getTeams.mockReturnValue([{ id: 't1' }, { id: 'joined' }]);

        await enterTeam('joined', 'Acme');

        expect(window.location.pathname).toBe('/');
        expect(window.location.href).not.toContain(TOKEN);
        expect(hideInvite).toHaveBeenCalled();
        expect(showMainScreen).toHaveBeenCalled();
        expect(selectTeam).toHaveBeenCalledWith({ id: 'joined' }, true);
        expect(showToast).toHaveBeenCalledWith('You joined Acme', 'success');
    });

    it('signing out from a mismatched account shows the invitation again, signed out', async () => {
        setCurrentUser({ id: 'u1', email: 'coyote@acme.test' });
        await openInvite(TOKEN);
        const { signOut } = showInvite.mock.calls[0][1];

        signOut();

        expect(api.logout).toHaveBeenCalled();
        expect(getCurrentUser()).toBeNull();
        expect(showInvite).toHaveBeenLastCalledWith(TOKEN, expect.objectContaining({ user: null }));
    });

    it('initApp selects the requested team, else the first', async () => {
        history.replaceState(null, '', '/');
        getTeams.mockReturnValue([{ id: 't1' }, { id: 't2' }]);
        await initApp({ teamId: 't2' });
        expect(selectTeam).toHaveBeenCalledWith({ id: 't2' }, true);

        selectTeam.mockClear();
        await initApp({ teamId: 'not-mine' });
        expect(selectTeam).toHaveBeenCalledWith({ id: 't1' }, true);
    });
});
