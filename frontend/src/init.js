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

import { api } from './api.js';
import { showAuthScreen, showLogin, showSignup, showMainScreen, updateUserInfo } from './auth.js';
import { getTeams, loadTeams, selectTeam } from './teams.js';
import { showOnboarding, hasCompletedOnboarding } from './onboarding.js';
import { consentRequestId, showConsent } from './oauth-consent.js';
import { hideInvite, takeInviteToken, showInvite } from './invite.js';
import { initRouter } from './router.js';
import { getCurrentUser, setCurrentUser, setCurrentTeam } from './state.js';
import { showToast } from './ui.js';

/**
 * Show the invitation page for ``token`` (CHT-1265), signed in or not.
 * Signing in from it stays on the /invite/ URL, so initApp() comes back
 * here; accepting boots the app into the joined team.
 * @param {string} token
 */
export function openInvite(token) {
    return showInvite(token, {
        user: getCurrentUser(),
        showAuth: (form) => {
            showAuthScreen();
            if (form === 'signup') showSignup();
            else showLogin();
        },
        enterTeam: async (teamId, teamName) => {
            // Out of the address bar and the history entry: the token
            // is spent, and the app routes from '/'.
            history.replaceState(null, '', '/');
            hideInvite();
            await initApp({ teamId });
            showToast(`You joined ${teamName}`, 'success');
        },
        signOut: () => {
            api.logout();
            setCurrentUser(null);
            setCurrentTeam(null);
            openInvite(token);
        },
    });
}

/**
 * What a signed-out visitor sees: the invitation page on an /invite/
 * URL, the sign-in screen everywhere else.
 */
export async function showSignedOut() {
    const token = takeInviteToken();
    if (token) {
        await openInvite(token);
        return;
    }
    showAuthScreen();
}

/**
 * Initialize the app after authentication.
 * Loads teams, selects the first team, or starts onboarding.
 * @param {object} [options]
 * @param {string} [options.teamId] - select this team if the user is in it
 */
export async function initApp({ teamId } = {}) {
    // An app asking for access (CHT-1519): after sign-in, the consent
    // page is all this tab shows; approving or denying leaves the app.
    const consentId = consentRequestId(window.location.pathname);
    if (consentId) {
        await showConsent(consentId);
        return;
    }
    // An invitation link (CHT-1265): the invitation, until it is
    // accepted or the person leaves it. The token moves out of the
    // address bar into sessionStorage, so sign-in and reload come back.
    const token = takeInviteToken();
    if (token) {
        await openInvite(token);
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
            const team = (teamId && teams.find((t) => t.id === teamId)) || teams[0];
            await selectTeam(team, true);
        }
    } finally {
        // Back/forward routes only once the team has loaded: a popstate
        // during boot would otherwise reach handleRoute() before the
        // team's members and agents exist (CHT-1697). Idempotent, since
        // initApp also runs after login and onboarding.
        initRouter();
    }
}
