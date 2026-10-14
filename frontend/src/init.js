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
import { consentRequestId, showConsent } from './oauth-consent.js';
import { initRouter } from './router.js';

/**
 * Initialize the app after authentication.
 * Loads teams, selects the first team, or starts onboarding.
 */
export async function initApp() {
    // An app asking for access (CHT-1519): after sign-in, the consent
    // page is all this tab shows; approving or denying leaves the app.
    const consentId = consentRequestId(window.location.pathname);
    if (consentId) {
        await showConsent(consentId);
        return;
    }
    showMainScreen();
    updateUserInfo();
    await loadTeams();

    const teams = getTeams();
    if (teams.length === 0 && !hasCompletedOnboarding()) {
        showOnboarding();
        return;
    }
    try {
        if (teams.length > 0) {
            await selectTeam(teams[0], true);
        }
    } finally {
        // Back/forward routes only once the team has loaded: a popstate
        // during boot would otherwise reach handleRoute() before the
        // team's members and agents exist (CHT-1697). Idempotent, since
        // initApp also runs after login and onboarding.
        initRouter();
    }
}
