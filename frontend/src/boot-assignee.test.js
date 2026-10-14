/**
 * Boot-to-filter integration test (CHT-1697).
 *
 * A first load straight to /issues?assignee=<id> must end with that
 * assignee selected. This runs the real boot: DOMContentLoaded -> bootApp
 * -> initApp -> selectTeam -> the real loadTeamMembersQuiet /
 * loadTeamAgentsQuiet -> handleRoute -> the issues view ->
 * loadFiltersFromUrl -> selectAssigneeFilter. Only the API is mocked, so a
 * regression anywhere on that path (a loader resolving before it builds the
 * assignee list, routing before the team loads, the issues view no longer
 * reading ?assignee=) fails here.
 *
 * Each case boots a fresh copy of the app (vi.resetModules) and runs only
 * that copy's DOMContentLoaded handler.
 *
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

const TEAM = { id: 'team-1', name: 'Team One', key: 'T1' };
const PROJECT = { id: 'proj-1', team_id: 'team-1', name: 'Project One', key: 'P1' };
const ME = { id: 'user-1', name: 'Me', email: 'me@example.com' };
const MEMBERS = [
    { user_id: 'user-1', user_name: 'Me', user_email: 'me@example.com', role: 'owner' },
    { user_id: 'user-2', user_name: 'Pat', user_email: 'pat@example.com', role: 'member' },
];
const AGENT = { id: 'agent-7', name: 'Agent Seven', parent_user_id: 'user-1', parent_user_name: 'Me' };

// How long the team's members and agents take to load, set per case. Both
// resolve on later macrotasks than the rest of boot, and the one holding
// the case's assignee resolves last, so routing that does not wait for it
// is caught.
const delays = { members: 20, agents: 20 };
const later = (value, ms) => new Promise((resolve) => setTimeout(() => resolve(value), ms));

vi.mock('./api.js', () => {
    const overrides = {
        getToken: vi.fn(() => 'token'),
        getMe: vi.fn(async () => ME),
        getMyTeams: vi.fn(async () => [TEAM]),
        getProjects: vi.fn(async () => [PROJECT]),
        getTeamMembers: vi.fn(() => later(MEMBERS, delays.members)),
        getTeamAgents: vi.fn(() => later([AGENT], delays.agents)),
    };
    const fallbacks = new Map();
    const api = new Proxy(overrides, {
        get(target, prop) {
            if (prop in target) return target[prop];
            if (typeof prop !== 'string' || prop === 'then') return undefined;
            if (!fallbacks.has(prop)) fallbacks.set(prop, vi.fn(async () => []));
            return fallbacks.get(prop);
        },
    });
    return { api, ApiClient: class {} };
});

let template;

// The params of each issues-view list fetch: getIssues(params) with a
// project selected, getTeamIssues(teamId, params) without. Other boot
// fetches (sidebar counts, sprint caches) share these endpoints but do not
// sort, so `sort_by` picks out the issues view's own loadIssues.
const issueListCalls = (api) => [
    ...api.getIssues.mock.calls.map(([params]) => params),
    ...api.getTeamIssues.mock.calls.map(([, params]) => params),
].filter((params) => params && 'sort_by' in params);

/**
 * Boot a fresh copy of the app at `url` and wait for the issues view's
 * first list fetch. `duringBoot` runs while the team is still loading.
 */
async function bootAt(url, { duringBoot } = {}) {
    vi.resetModules();
    // The mocked api may outlive the reset; start its call log afresh.
    vi.clearAllMocks();
    document.body.innerHTML = template;
    history.replaceState(null, '', url);

    const { api } = await import('./api.js');
    const addListener = vi.spyOn(document, 'addEventListener');
    await import('./app.js');
    const onReady = addListener.mock.calls.find(([type]) => type === 'DOMContentLoaded')[1];
    addListener.mockRestore();

    const booting = onReady();
    if (duringBoot) {
        await new Promise((r) => setTimeout(r, 5));
        expect(api.getTeamAgents).toHaveBeenCalled();
        duringBoot();
    }
    await booting;
    await vi.waitFor(() => {
        expect(issueListCalls(api).length).toBeGreaterThan(0);
    }, { timeout: 2000 });
    return api;
}

describe('first load of /issues?assignee=<id> (CHT-1697)', () => {
    beforeAll(async () => {
        vi.stubGlobal('WebSocket', vi.fn(() => ({
            addEventListener: vi.fn(),
            close: vi.fn(),
            send: vi.fn(),
        })));
        const templatePath = path.resolve(__dirname, '..', 'templates', 'index.html');
        const html = fs.readFileSync(templatePath, 'utf-8');
        template = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

        const { marked } = await import('marked');
        window.marked = marked;
        window.DOMPurify = (await import('dompurify')).default;
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    describe.each([
        // An agent, with a Back press while the team loads: the popstate
        // listener must not route before the agents exist.
        {
            kind: 'an agent', id: 'agent-7', members: 20, agents: 40,
            duringBoot: () => window.dispatchEvent(new PopStateEvent('popstate', { state: null })),
        },
        // A member, so the members loader is covered too.
        { kind: 'a member', id: 'user-2', members: 40, agents: 20 },
    ])('for $kind', ({ id, members, agents, duringBoot }) => {
        let api;

        beforeAll(async () => {
            delays.members = members;
            delays.agents = agents;
            api = await bootAt(`/issues?assignee=${id}`, { duringBoot });
        });

        it('selects the assignee from the URL', () => {
            expect(document.getElementById('issues-view').classList.contains('hidden')).toBe(false);
            expect(document.getElementById('assignee-filter').value).toBe(id);
        });

        it('loads the issue list filtered by that assignee, never unfiltered', () => {
            const calls = issueListCalls(api);
            expect(calls.length).toBeGreaterThan(0);
            for (const params of calls) {
                expect(params.assignee_id).toBe(id);
            }
        });

        it('keeps ?assignee= in the URL', () => {
            expect(new URLSearchParams(window.location.search).get('assignee')).toBe(id);
        });
    });
});
