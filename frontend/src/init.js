/**
 * App initialization module (CHT-1093)
 *
 * Extracted from app.js to break circular dependencies:
 *   auth.js -> app.js -> auth.js
 *   onboarding.js -> app.js -> onboarding.js
 *
 * Both auth.js and onboarding.js need to call initApp() after
 * login/onboarding completes. By moving initApp here, neither
 * needs to import from app.js.
 */

import { showMainScreen, updateUserInfo } from './auth.js';
import { getTeams, loadTeams, selectTeam } from './teams.js';
import { showOnboarding, hasCompletedOnboarding } from './onboarding.js';

/**
 * Initialize the app after authentication.
 * Loads teams, selects the first team, or starts onboarding.
 */
export async function initApp() {
    showMainScreen();
    updateUserInfo();
    await loadTeams();

    const teams = getTeams();
    if (teams.length === 0 && !hasCompletedOnboarding()) {
        showOnboarding();
        return;
    }
    if (teams.length > 0) {
        await selectTeam(teams[0], true);
    }
}
