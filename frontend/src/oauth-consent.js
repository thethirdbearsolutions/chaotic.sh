/**
 * OAuth consent page (CHT-1519; design doc "MCP OAuth and token service"
 * §2.3).
 *
 * /oauth/authorize validates an app's request and sends the browser to
 * /oauth/consent/<id>. This module takes over that route: once the person
 * is signed in (the normal login screen runs first if they aren't), it
 * reads the request, which binds it to them, and shows:
 *
 *   - the app, badged recognized / metadata-document host / unverified;
 *   - where the approval will be sent (the redirect host, large), with a
 *     warning when that is this machine (loopback);
 *   - who the connection acts as: a new agent (default) or an agent they
 *     manage, the last one used for this app pre-selected;
 *   - where: a team, optionally narrowed to projects;
 *   - the policy (only write until RBAC policies exist);
 *   - how long it stays connected when the app asked for offline access.
 *
 * A built-in first-party app (``acts_as: "person"``, CHT-1602: Chaotic
 * for Android) gets a different page: "Sign in to Chaotic for Android as
 * you", a team picker and nothing else. No "Acts as", no projects: the
 * app acts as the person, in every team they belong to.
 *
 * Approve and Deny POST with the login in the Authorization header (never
 * a cookie, so a cross-site form can't forge them) and then navigate to
 * the redirect the server returns, but only to an https, http or
 * reverse-domain native-app URL: never javascript:, data: or the like,
 * whatever the server said (defence in depth; review B1).
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr } from './utils.js';

const CONSENT_PREFIX = '/oauth/consent/';

/**
 * The authorization request id in a consent URL, or null.
 * @param {string} pathname
 * @returns {string|null}
 */
export function consentRequestId(pathname) {
    if (!pathname || !pathname.startsWith(CONSENT_PREFIX)) return null;
    const id = pathname.slice(CONSENT_PREFIX.length);
    return /^[A-Za-z0-9_-]{16,64}$/.test(id) ? id : null;
}

/**
 * May the browser be sent to ``url`` as an OAuth redirect? https, http
 * (the server allows it only for loopback hosts) and RFC 8252 private-use
 * schemes, which are reverse domain names and so contain a period; all in
 * lower case, the server's rule.
 * Everything else, javascript:, data:, vbscript:, file:, blob: in any
 * case among them, is refused.
 * @param {string} url
 * @returns {boolean}
 */
export function isSafeRedirect(url) {
    let protocol;
    try {
        protocol = new URL(url).protocol;
    } catch {
        return false;
    }
    // new URL() lower-cases the scheme; the server accepts only a
    // lower-case one, so the raw text must already be what was parsed.
    if (!url.startsWith(protocol)) return false;
    if (protocol === 'https:' || protocol === 'http:') return true;
    return /^[a-z][a-z0-9+-]*(\.[a-z0-9+-]+)+:$/.test(protocol);
}

function screen() {
    let el = document.getElementById('oauth-consent-screen');
    if (!el) {
        el = document.createElement('div');
        el.id = 'oauth-consent-screen';
        el.className = 'screen';
        (document.getElementById('app') || document.body).appendChild(el);
    }
    return el;
}

function showOnly(el) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.add('hidden'));
    el.classList.remove('hidden');
}

const TRUST_LABELS = {
    builtin: 'Official Chaotic app',
    recognized: 'Recognized app',
    cimd: 'Identified by its website',
    unverified: 'Unverified app (registered itself)',
};

/**
 * The app's trust badge, as consent shows it. Also used by Connected apps
 * (CHT-1523), so a connection is listed exactly as it was approved.
 */
export function trustBadge(clientInfo) {
    const label = TRUST_LABELS[clientInfo.trust] || TRUST_LABELS.unverified;
    const host = clientInfo.host ? ` · ${escapeHtml(clientInfo.host)}` : '';
    return `<span class="oauth-badge oauth-badge-${escapeAttr(clientInfo.trust)}">${escapeHtml(label)}${host}</span>`;
}

function teamOptions(request, selected) {
    return request.teams.map((t) =>
        `<option value="${escapeAttr(t.id)}"${t.id === selected ? ' selected' : ''}>${escapeHtml(t.name)}</option>`,
    ).join('');
}

function agentInfo(team, agentId) {
    const agent = team && agentId ? team.agents.find((a) => a.id === agentId) : null;
    if (!agent) return '';
    const owner = agent.owned_by_viewer ? 'Your agent' : `${escapeHtml(agent.owner_name || 'Another member')}'s agent`;
    const keys = agent.active_api_keys
        ? ` It also has ${agent.active_api_keys} active API key${agent.active_api_keys === 1 ? '' : 's'}:
             disconnecting this app won't revoke them, and revoking them won't disconnect the app.`
        : '';
    return `${owner}.${keys}`;
}

function agentOptions(team, selectedAgentId) {
    const options = ['<option value="">Create a new agent</option>'];
    for (const agent of (team ? team.agents : [])) {
        const sel = agent.id === selectedAgentId ? ' selected' : '';
        const owner = agent.owned_by_viewer || !agent.owner_name ? '' : ` (${agent.owner_name}'s)`;
        options.push(`<option value="${escapeAttr(agent.id)}"${sel}>${escapeHtml(agent.name + owner)}</option>`);
    }
    return options.join('');
}

function projectChecks(team) {
    if (!team || team.projects.length === 0) return '<p class="oauth-muted">This team has no projects yet.</p>';
    return team.projects.map((p) => `
        <label class="oauth-check">
            <input type="checkbox" name="oauth-project" value="${escapeAttr(p.id)}">
            ${escapeHtml(p.name)} <span class="oauth-muted">${escapeHtml(p.key)}</span>
        </label>`).join('');
}

function policyRadios(request) {
    return request.policies.map((p) => {
        const enabled = p.available && p.requested;
        const why = !p.available ? ' (coming soon)' : (!p.requested ? ' (not requested by the app)' : '');
        return `
        <label class="oauth-check${enabled ? '' : ' oauth-disabled'}">
            <input type="radio" name="oauth-policy" value="${escapeAttr(p.name)}"
                ${enabled ? '' : 'disabled'} ${p.name === 'write' && enabled ? 'checked' : ''}>
            ${escapeHtml(p.name)}${escapeHtml(why)}
        </label>`;
    }).join('');
}

/**
 * The sign-in page of a built-in first-party app (CHT-1602): it acts as
 * the person, so they pick a team and nothing else.
 * @param {HTMLElement} el
 * @param {object} request - GET /api/oauth/requests/{id}, acts_as "person"
 */
export function renderAppSignIn(el, request) {
    const teamId = request.suggested_team_id || (request.teams[0] && request.teams[0].id) || '';
    const app = escapeHtml(request.client.name);
    const noTeams = request.teams.length === 0;
    const offline = request.offline_access
        ? `<p class="oauth-note">You stay signed in on this device while you use the app at least once every
             ${request.refresh_idle_days} days, for at most ${request.refresh_absolute_days} days. You can sign
             the device out at any time from Connected apps.</p>`
        : '';
    el.innerHTML = `
        <div class="oauth-consent oauth-app-sign-in">
            <h1>Sign in to <span class="oauth-app">${app}</span> as you?</h1>
            <p>${trustBadge(request.client)}</p>
            <p>The app will act as <strong>you</strong>: it can read your inbox and do what you can do in
                every team you belong to, such as approving gates, commenting and changing status.
                It can't create API keys or change your account.</p>
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Start in team</legend>
                    <select id="oauth-team" ${noTeams ? 'disabled' : ''}>${teamOptions(request, teamId)}</select>
                    ${noTeams ? '<p class="oauth-warning">You need to belong to a team first.</p>' : ''}
                    <p class="oauth-muted">Leaving this team signs the device out.</p>
                </fieldset>
                ${offline}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Cancel</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${noTeams ? 'disabled' : ''}>
                        Sign in</button>
                </div>
            </form>
        </div>`;
}

/**
 * Render the consent form for an authorization request.
 * @param {HTMLElement} el
 * @param {object} request - GET /api/oauth/requests/{id}
 */
export function renderConsent(el, request) {
    if (request.acts_as === 'person') {
        renderAppSignIn(el, request);
        return;
    }
    const teamId = request.suggested_team_id || (request.teams[0] && request.teams[0].id) || '';
    const team = request.teams.find((t) => t.id === teamId);
    const app = escapeHtml(request.client.name);
    const offline = request.offline_access
        ? `<p class="oauth-note">The app asked to stay connected while you're away. It stays connected while it
             is used at least once every ${request.refresh_idle_days} days, for at most
             ${request.refresh_absolute_days} days. You can disconnect it at any time.</p>`
        : '';
    const loopback = request.loopback_redirect
        ? `<p class="oauth-warning">The approval goes to a program on <strong>this computer</strong>
             (${escapeHtml(request.redirect_host)}). Approve only if you just started connecting an app here.</p>`
        : '';
    const noTeams = request.teams.length === 0;
    el.innerHTML = `
        <div class="oauth-consent">
            <h1>Connect <span class="oauth-app">${app}</span> to Chaotic?</h1>
            <p>${trustBadge(request.client)}</p>
            <p class="oauth-redirect">Approving sends access to
                <strong class="oauth-redirect-host">${escapeHtml(request.redirect_host)}</strong></p>
            ${loopback}
            <form id="oauth-consent-form">
                <fieldset>
                    <legend>Team</legend>
                    <select id="oauth-team" ${noTeams ? 'disabled' : ''}>${teamOptions(request, teamId)}</select>
                    ${noTeams ? '<p class="oauth-warning">You need to belong to a team first.</p>' : ''}
                </fieldset>
                <fieldset>
                    <legend>Acts as</legend>
                    <select id="oauth-agent">${agentOptions(team, request.suggested_agent_id)}</select>
                    <input id="oauth-agent-name" type="text" maxlength="255"
                        value="${escapeAttr(request.default_agent_name)}" aria-label="New agent name">
                    <p id="oauth-agent-info" class="oauth-note hidden"></p>
                    <p class="oauth-muted">The app works as this agent, not as you. A new agent is yours
                        and can be disconnected on its own.</p>
                </fieldset>
                <fieldset>
                    <legend>Projects</legend>
                    <p class="oauth-muted">Leave all unchecked to allow every project in the team.</p>
                    <div id="oauth-projects">${projectChecks(team)}</div>
                </fieldset>
                <fieldset>
                    <legend>Access</legend>
                    ${policyRadios(request)}
                </fieldset>
                ${offline}
                <p id="oauth-error" class="oauth-warning hidden" role="alert"></p>
                <div class="oauth-actions">
                    <button type="button" id="oauth-deny" class="btn btn-secondary">Deny</button>
                    <button type="submit" id="oauth-approve" class="btn btn-primary" ${noTeams ? 'disabled' : ''}>
                        Approve</button>
                </div>
            </form>
        </div>`;
    syncAgentName(el, request);
}

function syncAgentName(el, request) {
    const agent = el.querySelector('#oauth-agent');
    const name = el.querySelector('#oauth-agent-name');
    if (agent && name) name.classList.toggle('hidden', agent.value !== '');
    const info = el.querySelector('#oauth-agent-info');
    if (info && agent && request) {
        const teamId = el.querySelector('#oauth-team')?.value;
        const html = agentInfo(request.teams.find((t) => t.id === teamId), agent.value);
        info.innerHTML = html;
        info.classList.toggle('hidden', html === '');
    }
}

/**
 * The approval body from the form's current state.
 * @param {HTMLElement} el
 */
export function readChoice(el) {
    const agentSelect = el.querySelector('#oauth-agent');
    if (!agentSelect) {
        // A built-in app's sign-in (CHT-1602): a team, as the person.
        return { team_id: el.querySelector('#oauth-team').value, policy: 'write' };
    }
    const agentId = agentSelect.value || null;
    const projectIds = [...el.querySelectorAll('input[name="oauth-project"]:checked')].map((c) => c.value);
    const policy = el.querySelector('input[name="oauth-policy"]:checked');
    const choice = {
        team_id: el.querySelector('#oauth-team').value,
        agent_id: agentId,
        project_ids: projectIds.length ? projectIds : null,
        policy: policy ? policy.value : 'write',
    };
    if (!agentId) {
        const name = el.querySelector('#oauth-agent-name').value.trim();
        if (name) choice.agent_name = name;
    }
    return choice;
}

function showError(el, message) {
    const box = el.querySelector('#oauth-error');
    if (!box) return;
    box.textContent = message;
    box.classList.remove('hidden');
}

function renderGone(el, message) {
    el.innerHTML = `
        <div class="oauth-consent">
            <h1>This connection request can't be used</h1>
            <p>${escapeHtml(message)}</p>
            <p>Start connecting the app again from the app itself.</p>
        </div>`;
}

/**
 * The stored login predates the web-login marker (or came from the CLI):
 * sign out and back in on this same consent URL.
 */
function renderSignInAgain(el, reload) {
    el.innerHTML = `
        <div class="oauth-consent">
            <h1>Sign in again to continue</h1>
            <p>To approve an app, sign in to Chaotic in this browser. A login made by the command-line tool
                can't approve apps.</p>
            <div class="oauth-actions">
                <button type="button" id="oauth-sign-in-again" class="btn btn-primary">Sign in again</button>
            </div>
        </div>`;
    el.querySelector('#oauth-sign-in-again').addEventListener('click', () => {
        api.logout();
        reload();
    });
}

function wire(el, requestId, request, navigate) {
    const teamSelect = el.querySelector('#oauth-team');
    teamSelect?.addEventListener('change', () => {
        if (!el.querySelector('#oauth-agent')) return; // a built-in app's sign-in
        const team = request.teams.find((t) => t.id === teamSelect.value);
        el.querySelector('#oauth-agent').innerHTML = agentOptions(team, null);
        el.querySelector('#oauth-projects').innerHTML = projectChecks(team);
        syncAgentName(el, request);
    });
    el.querySelector('#oauth-agent')?.addEventListener('change', () => syncAgentName(el, request));

    let busy = false;
    const decide = async (approve) => {
        if (busy) return;
        busy = true;
        try {
            const result = approve
                ? await api.approveOAuthRequest(requestId, readChoice(el))
                : await api.denyOAuthRequest(requestId);
            if (!isSafeRedirect(result.redirect)) {
                renderGone(el, "The app's return address isn't one a browser should be sent to.");
                return;
            }
            navigate(result.redirect);
        } catch (e) {
            busy = false;
            if (e && e.status === 404) {
                renderGone(el, 'It has expired, was already answered, or belongs to someone else.');
                return;
            }
            showError(el, (e && e.message) || 'Something went wrong');
        }
    };
    el.querySelector('#oauth-consent-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        decide(true);
    });
    el.querySelector('#oauth-deny')?.addEventListener('click', () => decide(false));
}

/**
 * Take over the page for a consent request. Call only when signed in.
 * @param {string} requestId
 * @param {(url: string) => void} [navigate] - where to send the browser
 * @param {() => void} [reload] - reloads the page (after signing out)
 */
export async function showConsent(
    requestId,
    navigate = (url) => window.location.assign(url),
    reload = () => window.location.reload(),
) {
    const el = screen();
    showOnly(el);
    el.innerHTML = '<div class="oauth-consent"><p>Loading…</p></div>';
    let request;
    try {
        request = await api.getOAuthRequest(requestId);
    } catch (e) {
        if (e && e.status === 404) {
            renderGone(el, 'It has expired, was already answered, or belongs to someone else.');
        } else if (e && e.status === 403 && e.detail && e.detail.error_code === 'web_login_required') {
            renderSignInAgain(el, reload);
        } else if (e && e.status === 403) {
            renderGone(el, 'Only a person signed in to Chaotic can approve an app.');
        } else {
            renderGone(el, (e && e.message) || 'Something went wrong');
        }
        return;
    }
    renderConsent(el, request);
    wire(el, requestId, request, navigate);
}
