import { describe, it, expect, beforeEach, vi } from 'vitest';
import { consentRequestId, renderConsent, readChoice, showConsent } from './oauth-consent.js';
import { api } from './api.js';

vi.mock('./api.js', () => ({
    api: {
        getOAuthRequest: vi.fn(),
        approveOAuthRequest: vi.fn(),
        denyOAuthRequest: vi.fn(),
    },
}));

function request(overrides = {}) {
    return {
        id: 'req_0123456789abcdef',
        client: { client_id: 'dcr_x', name: 'Test <App>', trust: 'unverified', host: null, registration: 'dcr' },
        redirect_uri: 'https://app.example/cb',
        redirect_host: 'app.example',
        loopback_redirect: false,
        requested_scopes: ['chaotic:write', 'offline_access'],
        policies: [
            { name: 'write', requested: true, available: true },
            { name: 'read', requested: false, available: false },
        ],
        offline_access: true,
        refresh_idle_days: 30,
        refresh_absolute_days: 90,
        teams: [
            {
                id: 't1', name: 'Team One', key: 'ONE',
                projects: [{ id: 'p1', name: 'Proj', key: 'PR' }],
                agents: [{ id: 'a1', name: 'Helper', agent_project_id: null }],
            },
            { id: 't2', name: 'Team Two', key: 'TWO', projects: [], agents: [] },
        ],
        default_agent_name: 'Test <App> (Me)',
        suggested_team_id: null,
        suggested_agent_id: null,
        ...overrides,
    };
}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('consentRequestId', () => {
    it('extracts the id from a consent path', () => {
        expect(consentRequestId('/oauth/consent/AbC_-0123456789xyz')).toBe('AbC_-0123456789xyz');
    });
    it('rejects other paths and odd ids', () => {
        expect(consentRequestId('/issues')).toBeNull();
        expect(consentRequestId('/oauth/consent/')).toBeNull();
        expect(consentRequestId('/oauth/consent/short')).toBeNull();
        expect(consentRequestId('/oauth/consent/abcdefghijklmnop/x')).toBeNull();
        expect(consentRequestId('/oauth/consent/<script>alert(1)</script>')).toBeNull();
        expect(consentRequestId(null)).toBeNull();
    });
});

describe('renderConsent', () => {
    let el;
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"></div>';
        el = document.createElement('div');
        document.body.appendChild(el);
    });

    it('escapes the app name and shows the redirect host and badge', () => {
        renderConsent(el, request());
        expect(el.querySelector('app')).toBeNull();
        expect(el.querySelector('.oauth-app').textContent).toBe('Test <App>');
        expect(el.querySelector('.oauth-redirect-host').textContent).toBe('app.example');
        expect(el.querySelector('.oauth-badge-unverified')).not.toBeNull();
        expect(el.textContent).toContain('30 days');
    });

    it('warns about loopback redirects', () => {
        renderConsent(el, request({ loopback_redirect: true, redirect_host: '127.0.0.1' }));
        expect(el.textContent).toContain('this computer');
    });

    it('labels recognized and metadata-document clients', () => {
        renderConsent(el, request({ client: { name: 'Claude Code', trust: 'recognized', host: 'claude.ai' } }));
        expect(el.querySelector('.oauth-badge-recognized').textContent).toContain('claude.ai');
        renderConsent(el, request({ client: { name: 'X', trust: 'cimd', host: 'x.example' } }));
        expect(el.querySelector('.oauth-badge-cimd')).not.toBeNull();
    });

    it('defaults to a new agent and only allows available, requested policies', () => {
        renderConsent(el, request());
        expect(el.querySelector('#oauth-agent').value).toBe('');
        expect(el.querySelector('#oauth-agent-name').classList.contains('hidden')).toBe(false);
        const radios = el.querySelectorAll('input[name="oauth-policy"]');
        expect([...radios].map((r) => r.disabled)).toEqual([false, true]);
        expect(readChoice(el)).toEqual({
            team_id: 't1', agent_id: null, project_ids: null, policy: 'write', agent_name: 'Test <App> (Me)',
        });
    });

    it('pre-selects the suggested team and agent', () => {
        renderConsent(el, request({ suggested_team_id: 't1', suggested_agent_id: 'a1' }));
        expect(el.querySelector('#oauth-agent').value).toBe('a1');
        expect(el.querySelector('#oauth-agent-name').classList.contains('hidden')).toBe(true);
        el.querySelector('input[name="oauth-project"]').checked = true;
        expect(readChoice(el)).toEqual({ team_id: 't1', agent_id: 'a1', project_ids: ['p1'], policy: 'write' });
    });

    it('disables approval without a team', () => {
        renderConsent(el, request({ teams: [] }));
        expect(el.querySelector('#oauth-approve').disabled).toBe(true);
    });
});

describe('showConsent', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="app"><div id="main-screen" class="screen"></div></div>';
        vi.clearAllMocks();
    });

    it('approves and navigates to the returned redirect', async () => {
        api.getOAuthRequest.mockResolvedValue(request());
        api.approveOAuthRequest.mockResolvedValue({ redirect: 'https://app.example/cb?code=cac_x' });
        const navigate = vi.fn();
        await showConsent('req_0123456789abcdef', navigate);
        expect(document.getElementById('main-screen').classList.contains('hidden')).toBe(true);
        document.getElementById('oauth-consent-form').dispatchEvent(new Event('submit', { cancelable: true }));
        await flush();
        expect(api.approveOAuthRequest).toHaveBeenCalledWith('req_0123456789abcdef', expect.objectContaining({ team_id: 't1' }));
        expect(navigate).toHaveBeenCalledWith('https://app.example/cb?code=cac_x');
    });

    it('denies', async () => {
        api.getOAuthRequest.mockResolvedValue(request());
        api.denyOAuthRequest.mockResolvedValue({ redirect: 'https://app.example/cb?error=access_denied' });
        const navigate = vi.fn();
        await showConsent('req_0123456789abcdef', navigate);
        document.getElementById('oauth-deny').click();
        await flush();
        expect(navigate).toHaveBeenCalledWith('https://app.example/cb?error=access_denied');
    });

    it('switching team refreshes agents and projects', async () => {
        api.getOAuthRequest.mockResolvedValue(request());
        await showConsent('req_0123456789abcdef', vi.fn());
        const team = document.getElementById('oauth-team');
        team.value = 't2';
        team.dispatchEvent(new Event('change'));
        expect(document.getElementById('oauth-agent').options.length).toBe(1);
        expect(document.getElementById('oauth-projects').textContent).toContain('no projects');
        const agent = document.getElementById('oauth-agent');
        agent.dispatchEvent(new Event('change'));
    });

    it('shows a validation error and stays', async () => {
        api.getOAuthRequest.mockResolvedValue(request());
        api.approveOAuthRequest.mockRejectedValue(Object.assign(new Error('Pick another name'), { status: 422 }));
        const navigate = vi.fn();
        await showConsent('req_0123456789abcdef', navigate);
        document.getElementById('oauth-consent-form').dispatchEvent(new Event('submit', { cancelable: true }));
        await flush();
        expect(navigate).not.toHaveBeenCalled();
        expect(document.getElementById('oauth-error').textContent).toBe('Pick another name');
    });

    it('a used request on approve shows the gone page', async () => {
        api.getOAuthRequest.mockResolvedValue(request());
        api.approveOAuthRequest.mockRejectedValue(Object.assign(new Error('gone'), { status: 404 }));
        await showConsent('req_0123456789abcdef', vi.fn());
        document.getElementById('oauth-consent-form').dispatchEvent(new Event('submit', { cancelable: true }));
        await flush();
        expect(document.body.textContent).toContain("can't be used");
    });

    it.each([
        [404, 'expired'],
        [403, 'signed in'],
        [500, 'boom'],
    ])('a %s on load shows why', async (statusCode, text) => {
        api.getOAuthRequest.mockRejectedValue(Object.assign(new Error('boom'), { status: statusCode }));
        await showConsent('req_0123456789abcdef', vi.fn());
        expect(document.body.textContent).toContain(text);
    });

    it('creates its own screen when the template has none', async () => {
        document.body.innerHTML = '';
        api.getOAuthRequest.mockResolvedValue(request());
        await showConsent('req_0123456789abcdef', vi.fn());
        expect(document.getElementById('oauth-consent-screen')).not.toBeNull();
    });
});
