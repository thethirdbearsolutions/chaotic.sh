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
 * Runs in its own file: app.js boots once per module instance.
 *
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

const TEAM = { id: 'team-1', name: 'Team One', key: 'T1' };
const PROJECT = { id: 'proj-1', team_id: 'team-1', name: 'Project One', key: 'P1' };
const ME = { id: 'user-1', name: 'Me', email: 'me@example.com' };
const MEMBER = { user_id: 'user-1', user_name: 'Me', user_email: 'me@example.com', role: 'owner' };
const AGENT = { id: 'agent-7', name: 'Agent Seven', parent_user_id: 'user-1', parent_user_name: 'Me' };

// Resolve the team's members and agents on a later macrotask than the rest
// of boot, so routing that does not wait for them is caught.
const later = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 20));

vi.mock('./api.js', () => {
    const overrides = {
        getToken: vi.fn(() => 'token'),
        getMe: vi.fn(async () => ME),
        getMyTeams: vi.fn(async () => [TEAM]),
        getProjects: vi.fn(async () => [PROJECT]),
        getTeamMembers: vi.fn(() => later([MEMBER])),
        getTeamAgents: vi.fn(() => later([AGENT])),
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

import { api } from './api.js';

// The params of each issues-view list fetch: getIssues(params) with a
// project selected, getTeamIssues(teamId, params) without. Other boot
// fetches (sidebar counts, sprint caches) share these endpoints but do not
// sort, so `sort_by` picks out the issues view's own loadIssues.
const issueListCalls = () => [
    ...api.getIssues.mock.calls.map(([params]) => params),
    ...api.getTeamIssues.mock.calls.map(([, params]) => params),
].filter((params) => params && 'sort_by' in params);

describe('first load of /issues?assignee=<id> (CHT-1697)', () => {
    beforeAll(async () => {
        vi.stubGlobal('WebSocket', vi.fn(() => ({
            addEventListener: vi.fn(),
            close: vi.fn(),
            send: vi.fn(),
        })));

        const templatePath = path.resolve(__dirname, '..', 'templates', 'index.html');
        const html = fs.readFileSync(templatePath, 'utf-8');
        document.body.innerHTML = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

        const { marked } = await import('marked');
        window.marked = marked;
        window.DOMPurify = (await import('dompurify')).default;

        history.replaceState(null, '', '/issues?assignee=agent-7');

        await import('./app.js');
        document.dispatchEvent(new Event('DOMContentLoaded'));

        await vi.waitFor(() => {
            expect(issueListCalls().length).toBeGreaterThan(0);
        }, { timeout: 2000 });
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    it('selects the assignee from the URL', () => {
        expect(document.getElementById('issues-view').classList.contains('hidden')).toBe(false);
        expect(document.getElementById('assignee-filter').value).toBe('agent-7');
    });

    it('loads the issue list filtered by that assignee', () => {
        const calls = issueListCalls();
        expect(calls.length).toBeGreaterThan(0);
        for (const params of calls) {
            expect(params.assignee_id).toBe('agent-7');
        }
    });

    it('keeps ?assignee= in the URL', () => {
        expect(new URLSearchParams(window.location.search).get('assignee')).toBe('agent-7');
    });
});
