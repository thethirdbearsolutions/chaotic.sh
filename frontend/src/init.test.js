import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('./auth.js', () => ({
    showMainScreen: vi.fn(), updateUserInfo: vi.fn(), showAuthScreen: vi.fn(), showLogin: vi.fn(), showSignup: vi.fn(),
}));
vi.mock('./teams.js', () => ({
    getTeams: vi.fn(() => []), loadTeams: vi.fn(), selectTeam: vi.fn(), setTeams: vi.fn(), getMembers: vi.fn(() => []),
    teamDataLoadedFor: vi.fn(() => null),
}));
vi.mock('./projects.js', () => ({ getProjects: vi.fn(() => []) }));
vi.mock('./agents.js', () => ({ getAgents: vi.fn(() => []) }));
vi.mock('./issue-store.js', () => ({ exportIssueStore: vi.fn(() => ({})), onQueryWritten: vi.fn() }));
vi.mock('./boot-cache.js', () => ({
    clearSnapshot: vi.fn(() => Promise.resolve()), writeSnapshot: vi.fn(() => Promise.resolve()),
    userIdFromToken: vi.fn((t) => t),
}));
vi.mock('./storage.js', () => ({ getToken: vi.fn(() => null) }));
vi.mock('./onboarding.js', () => ({ showOnboarding: vi.fn(), hasCompletedOnboarding: vi.fn(() => true) }));
vi.mock('./router.js', () => ({ initRouter: vi.fn(), primeRoute: vi.fn() }));
vi.mock('./oauth-consent.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showConsent: vi.fn(),
}));
vi.mock('./invite.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showInvite: vi.fn(),
    hideInvite: vi.fn(),
    showMissingToken: vi.fn(),
}));
vi.mock('./ui.js', () => ({ showToast: vi.fn() }));
vi.mock('./api.js', () => ({ api: { logout: vi.fn() } }));

import { initApp, openInvite, showSignedOut, saveSnapshot, startSavingSnapshots, resetSnapshotSaving, discardSnapshot } from './init.js';
import { setTeams, getMembers, teamDataLoadedFor } from './teams.js';
import { getToken } from './storage.js';
import { userIdFromToken } from './boot-cache.js';
import { getProjects } from './projects.js';
import { getAgents } from './agents.js';
import { exportIssueStore, onQueryWritten } from './issue-store.js';
import { clearSnapshot, writeSnapshot } from './boot-cache.js';
import { setCurrentTeam, setLabels, getCurrentTeam } from './state.js';
import { showMainScreen, showAuthScreen, showLogin, showSignup } from './auth.js';
import { showInvite, hideInvite, showMissingToken, forgetInviteToken } from './invite.js';
import { showToast } from './ui.js';
import { api } from './api.js';
import { getCurrentUser, setCurrentUser, setCurrentView, getCurrentView } from './state.js';
import { loadTeams, getTeams, selectTeam } from './teams.js';
import { showConsent } from './oauth-consent.js';
import { initRouter, primeRoute } from './router.js';
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

    // CHT-1971: the routed view's shell shows before the team loads.
    it('primes the route before loading the team', async () => {
        getTeams.mockReturnValue([{ id: 't1' }]);
        await initApp();
        expect(primeRoute).toHaveBeenCalled();
        expect(primeRoute.mock.invocationCallOrder[0])
            .toBeLessThan(loadTeams.mock.invocationCallOrder.at(-1));
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

        // PR #506 review M3: nothing routes without a team, so the view
        // primeRoute() cleared must not stay null.
        it('leaves the Dashboard current with no team', async () => {
            getTeams.mockReturnValue([]);
            setCurrentView(null);
            await initApp();
            expect(getCurrentView()).toBe('my-issues');
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
        sessionStorage.clear();
        forgetInviteToken(); // and the module's in-memory copy
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

    it('signed out on /invite with nothing stored, says to reopen the emailed link (CHT-1792)', async () => {
        history.replaceState(null, '', '/invite');
        await showSignedOut();
        expect(showMissingToken).toHaveBeenCalled();
        expect(showInvite).not.toHaveBeenCalled();
        expect(showAuthScreen).not.toHaveBeenCalled();
    });

    it('signed in on /invite with nothing stored, the same hint instead of the app (CHT-1792)', async () => {
        history.replaceState(null, '', '/invite/');
        setCurrentUser({ id: 'u1', email: 'r@example.com' });
        await initApp();
        expect(showMissingToken).toHaveBeenCalled();
        expect(showInvite).not.toHaveBeenCalled();
        expect(showMainScreen).not.toHaveBeenCalled();
        expect(loadTeams).not.toHaveBeenCalled();
    });

    it.each([
        ['/invite/short'],
        [`/invite/${TOKEN.slice(0, 12)}`],
        ['/invite//'],
    ])('signed out on %s (no usable token), the same hint (review F1)', async (path) => {
        history.replaceState(null, '', path);
        await showSignedOut();
        expect(showMissingToken).toHaveBeenCalled();
        expect(showInvite).not.toHaveBeenCalled();
        expect(showAuthScreen).not.toHaveBeenCalled();
    });

    it('signed in on a truncated link, the hint instead of the app (review F1)', async () => {
        history.replaceState(null, '', `/invite/${TOKEN.slice(0, 12)}`);
        setCurrentUser({ id: 'u1', email: 'r@example.com' });
        await initApp();
        expect(showMissingToken).toHaveBeenCalled();
        expect(showMainScreen).not.toHaveBeenCalled();
    });

    it.each([['/invitations'], ['/invites/x'], ['/team/invite']])(
        'signed out on %s, the sign-in form, not the hint', async (path) => {
            history.replaceState(null, '', path);
            await showSignedOut();
            expect(showAuthScreen).toHaveBeenCalled();
            expect(showMissingToken).not.toHaveBeenCalled();
        },
    );

    it('the consent page still comes before any invitation handling (review F3)', async () => {
        history.replaceState(null, '', '/oauth/consent/abcdefghijklmnop0123');
        setCurrentUser({ id: 'u1', email: 'r@example.com' });
        await initApp();
        expect(showConsent).toHaveBeenCalled();
        expect(showMissingToken).not.toHaveBeenCalled();
        expect(showInvite).not.toHaveBeenCalled();
        expect(showMainScreen).not.toHaveBeenCalled();
    });

    it('the page opens the login or signup form on the same URL', async () => {
        await openInvite(TOKEN);
        const { showAuth } = showInvite.mock.calls[0][1];

        showAuth('signup');
        expect(showAuthScreen).toHaveBeenCalled();
        expect(showSignup).toHaveBeenCalled();

        showAuth('login');
        expect(showLogin).toHaveBeenCalled();
    });

    it('moves the token out of the address bar on load, and finds it again after sign-in', async () => {
        await showSignedOut();
        expect(window.location.pathname).toBe('/invite');
        expect(window.location.href).not.toContain(TOKEN);
        expect(sessionStorage.getItem('chaotic.inviteToken')).toBe(TOKEN);

        // Signing in runs initApp on /invite: the stored token brings the
        // person back to the same invitation.
        showInvite.mockClear();
        setCurrentUser({ id: 'u1', email: 'r@example.com' });
        await initApp();
        expect(showInvite).toHaveBeenCalledWith(TOKEN, expect.objectContaining({ user: getCurrentUser() }));
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

describe('boot cache (CHT-1972)', () => {
    const teams = [{ id: 't1' }, { id: 't2' }];
    const snapshot = { teams, teamId: 't2', projects: [] };
    let reload;

    beforeEach(() => {
        vi.resetAllMocks();
        getTeams.mockReturnValue([]);
        hasCompletedOnboarding.mockReturnValue(true);
        clearSnapshot.mockResolvedValue();
        writeSnapshot.mockResolvedValue();
        // Signed in as u1, with team t2's data loaded.
        userIdFromToken.mockImplementation((t) => t);
        getToken.mockReturnValue('u1');
        teamDataLoadedFor.mockReturnValue('t2');
        history.replaceState(null, '', '/');
        reload = vi.fn();
        vi.stubGlobal('location', { ...window.location, pathname: '/', reload });
        resetSnapshotSaving();
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        resetSnapshotSaving();
    });

    it('paints from the snapshot without waiting on the teams request', async () => {
        const teamsRequest = new Promise(() => {});
        await initApp({ teamsRequest, snapshot });
        expect(setTeams).toHaveBeenCalledWith(teams);
        expect(selectTeam).toHaveBeenCalledWith(teams[1], true, { seed: snapshot });
        expect(loadTeams).not.toHaveBeenCalled();
        expect(initRouter).toHaveBeenCalled();
    });

    it('replaces the teams when the request answers', async () => {
        const fresh = [{ id: 't2', name: 'renamed' }];
        await initApp({ teamsRequest: Promise.resolve(fresh), snapshot });
        await new Promise((r) => setTimeout(r, 0));
        expect(setTeams).toHaveBeenLastCalledWith(fresh);
        expect(clearSnapshot).not.toHaveBeenCalled();
        expect(reload).not.toHaveBeenCalled();
    });

    it('drops the snapshot and reloads when the cached team is gone', async () => {
        await initApp({ teamsRequest: Promise.resolve([{ id: 't1' }]), snapshot });
        await new Promise((r) => setTimeout(r, 0));
        expect(clearSnapshot).toHaveBeenCalled();
        expect(reload).toHaveBeenCalled();
        // The pagehide of that reload does not write it back (review I1).
        setCurrentUser({ id: 'u1' });
        setCurrentTeam({ id: 't2' });
        window.dispatchEvent(new Event('pagehide'));
        expect(writeSnapshot).not.toHaveBeenCalled();
        setCurrentTeam(null);
        setCurrentUser(null);
    });

    it('shows a renamed team under its new name', async () => {
        setCurrentTeam({ id: 't2', name: 'Old' });
        document.body.innerHTML = '<span id="current-team-name">Old</span>';
        await initApp({ teamsRequest: Promise.resolve([{ id: 't2', name: 'New' }]), snapshot });
        await new Promise((r) => setTimeout(r, 0));
        expect(getCurrentTeam()).toEqual({ id: 't2', name: 'New' });
        expect(document.getElementById('current-team-name').textContent).toBe('New');
        setCurrentTeam(null);
        document.body.innerHTML = '';
    });

    it('ignores a snapshot whose team is not in its list, and an explicit team', async () => {
        await initApp({ snapshot: { teams, teamId: 'gone' } });
        expect(loadTeams).toHaveBeenCalled();
        vi.clearAllMocks();
        await initApp({ teamId: 't1', snapshot });
        expect(loadTeams).toHaveBeenCalled();
        expect(selectTeam).not.toHaveBeenCalledWith(expect.anything(), true, expect.anything());
    });

    it('saves the user, teams and team data', async () => {
        setCurrentUser({ id: 'u1' });
        setCurrentTeam({ id: 't2' });
        setLabels([{ id: 'l1' }]);
        getTeams.mockReturnValue(teams);
        getProjects.mockReturnValue([{ id: 'p1' }]);
        getMembers.mockReturnValue([{ user_id: 'u1' }]);
        getAgents.mockReturnValue([{ id: 'a1' }]);
        exportIssueStore.mockReturnValue({ queries: [] });
        await saveSnapshot();
        expect(exportIssueStore).toHaveBeenCalledWith({ maxQueries: 3 });
        expect(writeSnapshot).toHaveBeenCalledWith('u1', {
            user: { id: 'u1' }, teams, teamId: 't2', projects: [{ id: 'p1' }],
            labels: [{ id: 'l1' }], members: [{ user_id: 'u1' }], agents: [{ id: 'a1' }],
            issues: { queries: [] },
        });
        setCurrentTeam(null);
        await saveSnapshot();
        expect(writeSnapshot).toHaveBeenCalledTimes(1);
        setCurrentUser(null);
    });

    // PR #517 review C1 and I1.
    it('saves nothing while the team data is loading, or for another signed-in user', async () => {
        setCurrentUser({ id: 'u1' });
        setCurrentTeam({ id: 't2' });
        teamDataLoadedFor.mockReturnValue(null);
        await saveSnapshot();
        teamDataLoadedFor.mockReturnValue('t2');
        getToken.mockReturnValue('u2'); // another tab signed in as someone else
        await saveSnapshot();
        getToken.mockReturnValue(null); // another tab signed out
        await saveSnapshot();
        expect(writeSnapshot).not.toHaveBeenCalled();
        getToken.mockReturnValue('u1');
        await discardSnapshot();
        expect(clearSnapshot).toHaveBeenCalled();
        await saveSnapshot();
        expect(writeSnapshot).not.toHaveBeenCalled();
        setCurrentTeam(null);
        setCurrentUser(null);
    });

    it('saves a moment after a list loads, once per burst, and on pagehide', async () => {
        vi.useFakeTimers();
        try {
            setCurrentUser({ id: 'u1' });
            setCurrentTeam({ id: 't2' });
            startSavingSnapshots();
            startSavingSnapshots();
            expect(onQueryWritten).toHaveBeenCalledTimes(1);
            const written = onQueryWritten.mock.calls[0][0];
            written();
            written();
            vi.advanceTimersByTime(1999);
            expect(writeSnapshot).not.toHaveBeenCalled();
            vi.advanceTimersByTime(1);
            expect(writeSnapshot).toHaveBeenCalledTimes(1);
            window.dispatchEvent(new Event('pagehide'));
            expect(writeSnapshot).toHaveBeenCalledTimes(2);
        } finally {
            vi.useRealTimers();
            setCurrentTeam(null);
            setCurrentUser(null);
        }
    });
});
