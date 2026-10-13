import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./auth.js', () => ({ showMainScreen: vi.fn(), updateUserInfo: vi.fn() }));
vi.mock('./teams.js', () => ({ getTeams: vi.fn(() => []), loadTeams: vi.fn(), selectTeam: vi.fn() }));
vi.mock('./onboarding.js', () => ({ showOnboarding: vi.fn(), hasCompletedOnboarding: vi.fn(() => true) }));
vi.mock('./oauth-consent.js', async (importOriginal) => ({
    ...(await importOriginal()),
    showConsent: vi.fn(),
}));

import { initApp } from './init.js';
import { showMainScreen } from './auth.js';
import { loadTeams, getTeams, selectTeam } from './teams.js';
import { showConsent } from './oauth-consent.js';

describe('initApp', () => {
    beforeEach(() => {
        vi.clearAllMocks();
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
});
