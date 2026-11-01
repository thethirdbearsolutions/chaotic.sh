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
import { getTeams, getMembers, loadTeams, selectTeam, setTeams } from './teams.js';
import { getProjects } from './projects.js';
import { getAgents } from './agents.js';
import { exportIssueStore, onQueryWritten } from './issue-store.js';
import { clearSnapshot, writeSnapshot } from './boot-cache.js';
import { showOnboarding, hasCompletedOnboarding } from './onboarding.js';
import { consentRequestId, showConsent } from './oauth-consent.js';
import { hideInvite, isInviteAddress, showInvite, showMissingToken, takeInviteToken } from './invite.js';
import { initRouter, primeRoute } from './router.js';
import { getCurrentUser, setCurrentUser, getCurrentTeam, setCurrentTeam, setCurrentView, getLabels } from './state.js';
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
    if (isInviteAddress(window.location.pathname)) {
        // An invitation address with no usable token (CHT-1792).
        showMissingToken();
        return;
    }
    showAuthScreen();
}

/**
 * Initialize the app after authentication.
 * Loads teams, selects the first team, or starts onboarding.
 * @param {object} [options]
 * @param {string} [options.teamId] - select this team if the user is in it
 * @param {Promise} [options.teamsRequest] - a GET /teams already in flight
 * @param {Object} [options.snapshot] - the boot cache (CHT-1972): paint
 *   from its teams and team data at once, and refresh behind it
 */
export async function initApp({ teamId, teamsRequest = null, snapshot = null } = {}) {
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
    if (isInviteAddress(window.location.pathname)) {
        // An invitation address with no usable token: storage was blocked
        // and the page reloaded, or the link was cut short (CHT-1792).
        // Say to reopen the emailed link.
        showMissingToken();
        return;
    }
    showMainScreen();
    primeRoute();
    updateUserInfo();
    startSavingSnapshots();

    const cachedTeam = !teamId && snapshot?.teams?.find?.((t) => t.id === snapshot.teamId);
    if (cachedTeam) {
        await bootFromSnapshot(snapshot, cachedTeam, teamsRequest);
        return;
    }
    await loadTeams(teamsRequest);

    const teams = getTeams();
    if (teams.length === 0 && !hasCompletedOnboarding()) {
        showOnboarding();
        return;
    }
    // primeRoute() left no view current; with no team to load, nothing
    // routes, so restore the old default (PR #506 review M3).
    if (teams.length === 0) setCurrentView('my-issues');
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

/**
 * Boot on the boot cache (CHT-1972): the cached teams and the selected
 * team's data paint the routed view at once. The teams request then
 * replaces the list, and if the cached team is gone the snapshot is
 * dropped and the page reloads from the network.
 */
async function bootFromSnapshot(snapshot, team, teamsRequest) {
    setTeams(snapshot.teams);
    try {
        await selectTeam(team, true, { seed: snapshot });
    } finally {
        initRouter();
    }
    Promise.resolve(teamsRequest || loadTeams().then(getTeams)).then(async (teams) => {
        if (!Array.isArray(teams)) return;
        setTeams(teams);
        if (!teams.some((t) => t.id === team.id)) {
            await clearSnapshot();
            window.location.reload();
        }
    }, (e) => console.error('Failed to refresh teams:', e));
}

const SAVE_DELAY_MS = 2000;
let saveTimer = null;
let savingStarted = false;

/** Save what the app shows now, for the next load (CHT-1972). */
export function saveSnapshot() {
    clearTimeout(saveTimer);
    saveTimer = null;
    const user = getCurrentUser();
    const team = getCurrentTeam();
    if (!user?.id || !team?.id) return Promise.resolve();
    return writeSnapshot(user.id, {
        user,
        teams: getTeams(),
        teamId: team.id,
        projects: getProjects(),
        labels: getLabels(),
        members: getMembers(),
        agents: getAgents(),
        issues: exportIssueStore({ maxQueries: 3 }),
    });
}

function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveSnapshot, SAVE_DELAY_MS);
}

/**
 * Save a snapshot a moment after each issue list loads, and when the
 * page is hidden or left. Idempotent.
 */
export function startSavingSnapshots() {
    if (savingStarted) return;
    savingStarted = true;
    onQueryWritten(scheduleSave);
    // Named functions: adding the same listener twice is a no-op.
    document.addEventListener('visibilitychange', saveWhenHidden);
    window.addEventListener('pagehide', saveOnPagehide);
}

function saveWhenHidden() {
    if (document.visibilityState === 'hidden') saveSnapshot();
}

function saveOnPagehide() {
    saveSnapshot();
}

/** Test hook. */
export function resetSnapshotSaving() {
    clearTimeout(saveTimer);
    saveTimer = null;
    savingStarted = false;
}
