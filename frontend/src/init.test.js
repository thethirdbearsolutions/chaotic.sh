import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./auth.js', () => ({ showMainScreen: vi.fn(), updateUserInfo: vi.fn() }));
vi.mock('./teams.js', () => ({ getTeams: vi.fn(() => []), loadTeams: vi.fn(), selectTeam: vi.fn() }));
vi.mock('./onboarding.js', () => ({ showOnboarding: vi.fn(), hasCompletedOnboarding: vi.fn(() => true) }));
vi.mock('./router.js', () => ({ initRouter: vi.fn() }));
vi.mock('./oauth-consent.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showConsent: vi.fn(),
}));

import { initApp } from './init.js';
import { showMainScreen } from './auth.js';
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
