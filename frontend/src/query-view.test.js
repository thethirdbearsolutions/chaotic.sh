/**
 * Tests for the /query page (CHT-1810).
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('./api.js', () => ({
    api: { queryIssues: vi.fn() },
}));

vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
}));

vi.mock('./projects.js', () => ({
    getProjects: vi.fn(() => [
        { id: 'p1', name: 'Demo <Project>', key: 'DEM' },
        { id: 'p2', name: 'Other', key: 'OTH' },
    ]),
}));

import { api } from './api.js';
import { showToast } from './ui.js';
import { setCurrentProject, setCurrentTeam, getCurrentProject, setCurrentView } from './state.js';
import {
    PAGE_SIZE,
    DEFAULT_WHERE,
    DEFAULT_COLUMNS,
    normalizeColumns,
    parseQueryUrl,
    buildQueryUrl,
    shellQuote,
    buildCliCommand,
    formatQueryError,
    renderResultsTable,
    renderPager,
    loadQueryView,
    runWhereBox,
    setQueryScope,
    toggleQueryColumn,
    goToQueryPage,
    copyQueryAsCli,
    getQueryState,
    _resetQueryViewForTest,
} from './query-view.js';

const PAGE_HTML = `
    <div id="query-view" class="view">
        <select id="query-project-filter"></select>
        <div id="query-columns-picker">
            <button id="query-columns-btn" aria-expanded="false">Columns</button>
            <div id="query-columns-menu" class="hidden"></div>
        </div>
        <input id="query-where" type="text">
        <button id="query-run-btn">Run</button>
        <button id="query-copy-cli-btn">Copy as CLI</button>
        <code id="query-cli-preview" class="hidden"></code>
        <div id="query-notice" class="hidden"></div>
        <div id="query-error" class="hidden"></div>
        <div id="query-results"></div>
        <div id="query-pager"></div>
    </div>`;

function issue(n, extra = {}) {
    return {
        id: `id-${n}`,
        identifier: `DEM-${n}`,
        title: `Demo issue ${n}`,
        status: 'todo',
        priority: 'medium',
        issue_type: 'task',
        estimate: null,
        assignee_name: null,
        creator_name: 'Ada Example',
        project_key: 'DEM',
        sprint_name: null,
        parent_identifier: null,
        parent_id: null,
        labels: [],
        created_at: '2026-01-02T00:00:00Z',
        updated_at: '2026-01-03T00:00:00Z',
        completed_at: null,
        due_date: null,
        ...extra,
    };
}

function response({ where = 'status!=done,canceled', order = '', total = 1, skip = 0, issues = [issue(1)] } = {}) {
    return { query: { filter: null, order_by: [] }, where, order, total, skip, limit: PAGE_SIZE, issues };
}

function go(url) {
    history.replaceState(null, '', url);
}

const flush = () => new Promise((r) => setTimeout(r, 0));

beforeEach(() => {
    document.body.innerHTML = PAGE_HTML;
    _resetQueryViewForTest();
    api.queryIssues.mockReset();
    showToast.mockReset();
    setCurrentTeam({ id: 't1', name: 'Team' });
    setCurrentProject(null);
    setCurrentView('query');
    go('/query');
});

function deferred() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
}

describe('normalizeColumns', () => {
    it('drops unknown and duplicate ids and keeps identifier and title', () => {
        expect(normalizeColumns(['status', 'bogus', 'status', 'labels'])).toEqual(['identifier', 'title', 'status', 'labels']);
    });

    it('keeps the given order when the fixed columns are present', () => {
        expect(normalizeColumns(['title', 'identifier', 'due'])).toEqual(['title', 'identifier', 'due']);
    });

    it('falls back to the defaults when nothing is usable', () => {
        expect(normalizeColumns(['nope', ''])).toEqual(DEFAULT_COLUMNS);
        expect(normalizeColumns([])).toEqual(DEFAULT_COLUMNS);
    });
});

describe('parseQueryUrl / buildQueryUrl', () => {
    it('tells an absent where from an empty one', () => {
        expect(parseQueryUrl('').where).toBeNull();
        expect(parseQueryUrl('?where=').where).toBe('');
    });

    it('reads every param', () => {
        const s = parseQueryUrl('?project=p1&where=assignee%3Dme&order=-updated&cols=status,labels&group=status&view=v1&page=3');
        expect(s).toEqual({
            projectId: 'p1', teamScope: false, where: 'assignee=me', order: '-updated',
            cols: ['identifier', 'title', 'status', 'labels'], group: 'status', view: 'v1', page: 3,
        });
    });

    it('ignores a bad page number', () => {
        expect(parseQueryUrl('?page=0').page).toBe(1);
        expect(parseQueryUrl('?page=x').page).toBe(1);
        // Review finding 6: not a safe integer, so not sent as skip=1e+25.
        expect(parseQueryUrl('?page=100000000000000000000000').page).toBe(1);
        expect(parseQueryUrl('?page=12').page).toBe(12);
    });

    it('round-trips a state and omits defaults', () => {
        const state = parseQueryUrl('?scope=team&where=label%3Dbug%2Cregression&order=priority%2C-updated&cols=identifier,title,labels&group=type&view=v9&page=2');
        expect(parseQueryUrl(buildQueryUrl(state).slice('/query'.length))).toEqual(state);
        expect(buildQueryUrl({ projectId: 'p1', where: null, cols: [...DEFAULT_COLUMNS], page: 1 })).toBe('/query?project=p1');
        expect(buildQueryUrl({ teamScope: true, projectId: 'p1', where: '', cols: DEFAULT_COLUMNS })).toBe('/query?scope=team&where=');
    });
});

describe('Copy as CLI', () => {
    it('quotes single quotes for the shell', () => {
        expect(shellQuote(`title~="it's"`)).toBe(`'title~="it'\\''s"'`);
    });

    it('builds the command with sort, scope and paging', () => {
        expect(buildCliCommand({ where: 'assignee=me', order: '-updated', teamScope: true })).toEqual({
            command: "chaotic issue list --all-projects --where 'assignee=me' --sort updated --order desc --limit 100",
            warning: null,
        });
        expect(buildCliCommand({ where: 'a=1', teamScope: true, skip: 200 }).command)
            .toBe("chaotic issue list --all-projects --where 'a=1' --limit 100 --skip 200");
    });

    // Review finding 4: `issue list` has no --project, so a project query
    // is pinned with a project row instead of the CLI's current project.
    it('pins a project scope with a project row', () => {
        expect(buildCliCommand({ where: 'status=todo or assignee=me', order: '', teamScope: false, projectKey: 'DEM' })).toEqual({
            command: "chaotic issue list --all-projects --where 'project=DEM (status=todo or assignee=me)' --limit 100",
            warning: null,
        });
        expect(buildCliCommand({ where: '', teamScope: false, projectKey: 'DEM' }).command)
            .toBe("chaotic issue list --all-projects --where 'project=DEM' --limit 100");
        const unknown = buildCliCommand({ where: 'x=1', teamScope: false });
        expect(unknown.command).toBe("chaotic issue list --where 'x=1' --limit 100");
        expect(unknown.warning).toMatch(/current project/);
    });

    it('warns when the order has no exact CLI form', () => {
        const multi = buildCliCommand({ where: '', order: 'priority,-updated', teamScope: true });
        expect(multi.command).toBe("chaotic issue list --all-projects --where '' --sort priority --order asc --limit 100");
        expect(multi.warning).toMatch(/one field/);
        const unsupported = buildCliCommand({ where: 'x=1', order: 'due', teamScope: true });
        expect(unsupported.command).toBe("chaotic issue list --all-projects --where 'x=1' --limit 100");
        expect(unsupported.warning).toMatch(/cannot sort by "due"/);
    });
});

describe('formatQueryError', () => {
    it('uses the 400 message and joins 422 messages', () => {
        expect(formatQueryError(Object.assign(new Error("no label 'x' in this team"), { status: 400, detail: "no label 'x' in this team" })))
            .toBe("no label 'x' in this team");
        expect(formatQueryError({ message: 'An error occurred', detail: [{ msg: 'String should have at most 4000 characters' }] }))
            .toBe('String should have at most 4000 characters');
        expect(formatQueryError(null)).toBe('The query failed.');
    });
});

describe('renderResultsTable', () => {
    it('escapes server text in every column', () => {
        const evil = issue(7, {
            title: '<img src=x onerror=alert(1)>',
            assignee_name: '<b>Mallory</b>',
            sprint_name: '<script>s</script>',
            labels: [{ name: '<i>bug</i>', color: 'red;background:url(x)' }],
        });
        const html = renderResultsTable([evil], ['identifier', 'title', 'assignee', 'sprint', 'labels']);
        const div = document.createElement('div');
        div.innerHTML = html;
        expect(div.querySelector('img')).toBeNull();
        expect(div.querySelector('script')).toBeNull();
        expect(div.querySelector('b')).toBeNull();
        expect(div.querySelector('i')).toBeNull();
        expect(div.textContent).toContain('<img src=x onerror=alert(1)>');
        expect(div.querySelector('.issue-label').getAttribute('style')).toContain('#888888');
    });

    it('shows the chosen columns in order and links rows to the issue', () => {
        const html = renderResultsTable([issue(3, { estimate: 0, parent_identifier: 'DEM-1', parent_id: 'id-1' })], ['identifier', 'title', 'estimate', 'parent']);
        const div = document.createElement('div');
        div.innerHTML = html;
        expect([...div.querySelectorAll('th')].map((th) => th.dataset.col)).toEqual(['identifier', 'title', 'estimate', 'parent']);
        expect(div.querySelector('.query-col-estimate').textContent).toBe('0');
        expect(div.querySelector('.query-col-title a').getAttribute('href')).toBe('/issue/DEM-3');
        expect(div.querySelector('.query-col-parent a').getAttribute('href')).toBe('/issue/DEM-1');
    });
});

describe('renderPager', () => {
    it('shows the range and enables only the useful buttons', () => {
        const div = document.createElement('div');
        div.innerHTML = renderPager(250, 100, 100);
        expect(div.querySelector('.query-total').textContent).toBe('101–200 of 250 issues');
        expect(div.querySelector('[data-query-page="-1"]').disabled).toBe(false);
        expect(div.querySelector('[data-query-page="1"]').disabled).toBe(false);
        div.innerHTML = renderPager(1, 0, 1);
        expect(div.querySelector('.query-total').textContent).toBe('1–1 of 1 issue');
        expect(div.querySelector('[data-query-page="1"]').disabled).toBe(true);
        expect(renderPager(0, 0, 0)).toContain('0 issues');
        // A page past the end: no bogus range, and Previous still works.
        div.innerHTML = renderPager(7, 9800, 0);
        expect(div.querySelector('.query-total').textContent).toBe('7 issues');
        expect(div.querySelector('[data-query-page="-1"]').disabled).toBe(false);
        expect(div.querySelector('[data-query-page="1"]').disabled).toBe(true);
    });
});

describe('loadQueryView', () => {
    it('runs the default query in the current project and writes the canonical URL', async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValue(response());
        await loadQueryView();
        expect(api.queryIssues).toHaveBeenCalledWith({
            projectId: 'p1', where: DEFAULT_WHERE, order: null, skip: 0, limit: PAGE_SIZE,
        });
        expect(window.location.pathname + window.location.search).toBe('/query?project=p1&where=status%21%3Ddone%2Ccanceled');
        expect(document.getElementById('query-where').value).toBe('status!=done,canceled');
        expect(document.querySelectorAll('.query-row')).toHaveLength(1);
        expect(document.getElementById('query-project-filter').value).toBe('p1');
        // The select's option text is escaped.
        expect(document.getElementById('query-project-filter').innerHTML).toContain('Demo &lt;Project&gt;');
    });

    it('sends where and order from the URL and adopts the echoed text', async () => {
        go('/query?project=p2&where=assignee%3Dme%20%20status%3Dtodo&order=-updated&page=2');
        api.queryIssues.mockResolvedValue(response({ where: 'assignee=me status=todo', order: '-updated', total: 150, skip: 100 }));
        const before = history.length;
        await loadQueryView();
        expect(api.queryIssues).toHaveBeenCalledWith({
            projectId: 'p2', where: 'assignee=me  status=todo', order: '-updated', skip: 100, limit: PAGE_SIZE,
        });
        expect(history.length).toBe(before);
        expect(new URLSearchParams(window.location.search).get('where')).toBe('assignee=me status=todo');
        expect(document.getElementById('query-pager').textContent).toContain('101–101 of 150');
    });

    it('uses team scope for scope=team and when no project is known', async () => {
        go('/query?scope=team&where=');
        api.queryIssues.mockResolvedValue(response({ where: '' }));
        await loadQueryView();
        expect(api.queryIssues.mock.calls[0][0]).toMatchObject({ teamId: 't1', where: '' });
        expect(window.location.search).toBe('?scope=team&where=');
        expect(document.getElementById('query-project-filter').value).toBe('');

        _resetQueryViewForTest();
        go('/query?project=unknown');
        api.queryIssues.mockClear();
        await loadQueryView();
        expect(api.queryIssues.mock.calls[0][0]).toMatchObject({ teamId: 't1' });
    });

    it('shows a 400 inline, escaped, and leaves the URL alone', async () => {
        go('/query?project=p1&where=label%3Dnope');
        api.queryIssues.mockRejectedValue(Object.assign(new Error("no label '<nope>' in this team"), { status: 400 }));
        await loadQueryView();
        const box = document.getElementById('query-error');
        expect(box.classList.contains('hidden')).toBe(false);
        expect(box.querySelector('nope')).toBeNull();
        expect(box.textContent).toContain("no label '<nope>' in this team");
        expect(document.getElementById('query-results').innerHTML).toBe('');
        expect(window.location.search).toBe('?project=p1&where=label%3Dnope');
        expect(document.getElementById('query-where').value).toBe('label=nope');
    });

    it('keeps group and view in the URL for later sub-tickets', async () => {
        go('/query?project=p1&where=&group=status&view=v1');
        api.queryIssues.mockResolvedValue(response({ where: '' }));
        await loadQueryView();
        const params = new URLSearchParams(window.location.search);
        expect(params.get('group')).toBe('status');
        expect(params.get('view')).toBe('v1');
        expect(getQueryState()).toMatchObject({ group: 'status', view: 'v1' });
    });

    it('drops a stale response', async () => {
        setCurrentProject('p1');
        let resolveFirst;
        api.queryIssues
            .mockImplementationOnce(() => new Promise((r) => { resolveFirst = r; }))
            .mockResolvedValueOnce(response({ where: 'status=todo', issues: [issue(2)] }));
        const first = loadQueryView();
        document.getElementById('query-where').value = 'status=todo';
        await runWhereBox();
        resolveFirst(response({ where: 'status!=done,canceled', issues: [issue(1)] }));
        await first;
        expect(document.getElementById('query-where').value).toBe('status=todo');
        expect(document.querySelector('.query-row').dataset.issueId).toBe('id-2');
    });
});

describe('interactions', () => {
    beforeEach(async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValue(response({ total: 250, issues: Array.from({ length: 100 }, (_, n) => issue(n + 1)) }));
        await loadQueryView();
        api.queryIssues.mockClear();
    });

    it('Enter in the where box runs it as a new history entry', async () => {
        api.queryIssues.mockResolvedValue(response({ where: 'priority=high' }));
        const box = document.getElementById('query-where');
        box.value = '  priority = high ';
        const before = history.length;
        box.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await flush();
        expect(api.queryIssues).toHaveBeenCalledWith(expect.objectContaining({ where: 'priority = high', skip: 0 }));
        expect(history.length).toBe(before + 1);
        expect(new URLSearchParams(window.location.search).get('where')).toBe('priority=high');
        expect(box.value).toBe('priority=high');
    });

    it('Run with an empty box queries everything', async () => {
        api.queryIssues.mockResolvedValue(response({ where: '' }));
        document.getElementById('query-where').value = '';
        document.getElementById('query-run-btn').click();
        await flush();
        expect(api.queryIssues.mock.calls[0][0].where).toBe('');
        expect(window.location.search).toBe('?project=p1&where=');
    });

    it('pages forward and back', async () => {
        api.queryIssues.mockResolvedValue(response({ total: 250, skip: 100, issues: [issue(101)] }));
        document.querySelector('[data-query-page="1"]').click();
        await flush();
        expect(api.queryIssues.mock.calls[0][0].skip).toBe(100);
        expect(new URLSearchParams(window.location.search).get('page')).toBe('2');
        api.queryIssues.mockResolvedValue(response({ total: 250, skip: 0 }));
        await goToQueryPage(-1);
        expect(api.queryIssues.mock.calls[1][0].skip).toBe(0);
        expect(new URLSearchParams(window.location.search).has('page')).toBe(false);
        await goToQueryPage(-1);
        expect(api.queryIssues).toHaveBeenCalledTimes(2);
    });

    it('toggles columns without refetching and records them in the URL', () => {
        toggleQueryColumn('labels', true);
        toggleQueryColumn('status', false);
        toggleQueryColumn('identifier', false);
        expect(api.queryIssues).not.toHaveBeenCalled();
        expect(getQueryState().cols).toEqual(['identifier', 'title', 'priority', 'assignee', 'updated', 'labels']);
        expect(new URLSearchParams(window.location.search).get('cols')).toBe('identifier,title,priority,assignee,updated,labels');
        expect([...document.querySelectorAll('th')].map((th) => th.dataset.col)).toContain('labels');
    });

    it('the column menu checkboxes drive the columns', () => {
        document.getElementById('query-columns-btn').click();
        const menu = document.getElementById('query-columns-menu');
        expect(menu.classList.contains('hidden')).toBe(false);
        const due = menu.querySelector('input[value="due"]');
        due.checked = true;
        due.dispatchEvent(new Event('change', { bubbles: true }));
        expect(getQueryState().cols).toContain('due');
        expect(menu.querySelector('input[value="identifier"]').disabled).toBe(true);
        document.body.click();
        expect(menu.classList.contains('hidden')).toBe(true);
    });

    it('switching to all projects queries the team and pushes one entry', async () => {
        api.queryIssues.mockResolvedValue(response());
        const before = history.length;
        const select = document.getElementById('query-project-filter');
        select.value = '';
        select.dispatchEvent(new Event('change'));
        await flush();
        expect(api.queryIssues.mock.calls[0][0]).toMatchObject({ teamId: 't1' });
        expect(history.length).toBe(before + 1);
        expect(new URLSearchParams(window.location.search).get('scope')).toBe('team');
        // The global current project is left as it was.
        expect(getCurrentProject()).toBe('p1');
        await setQueryScope('p2');
        expect(getCurrentProject()).toBe('p2');
        expect(api.queryIssues.mock.calls[1][0]).toMatchObject({ projectId: 'p2' });
    });

    it('copies the CLI command', async () => {
        const writeText = vi.fn().mockResolvedValue();
        Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
        const cmd = await copyQueryAsCli();
        expect(cmd).toBe("chaotic issue list --all-projects --where 'project=DEM (status!=done,canceled)' --limit 100");
        expect(writeText).toHaveBeenCalledWith(cmd);
        expect(showToast).toHaveBeenCalledWith('Copied CLI command', 'success');
    });

    it('shows the command when the clipboard is unavailable', async () => {
        Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) }, configurable: true });
        await copyQueryAsCli();
        const preview = document.getElementById('query-cli-preview');
        expect(preview.classList.contains('hidden')).toBe(false);
        expect(preview.textContent).toBe("chaotic issue list --all-projects --where 'project=DEM (status!=done,canceled)' --limit 100");
    });
});

describe('review findings on PR #429', () => {
    it('1: a response that lands after leaving /query does not touch the URL', async () => {
        setCurrentProject('p1');
        const pending = deferred();
        api.queryIssues.mockReturnValueOnce(pending.promise);
        const run = loadQueryView();
        // The user clicks through to an issue while the query is running.
        setCurrentView('issue');
        history.pushState({ view: 'issue' }, '', '/issue/DEM-1');
        pending.resolve(response());
        await run;
        expect(window.location.pathname).toBe('/issue/DEM-1');
        expect(history.state).toEqual({ view: 'issue' });
    });

    it('1: a failure that lands after leaving /query is dropped too', async () => {
        setCurrentProject('p1');
        const pending = deferred();
        api.queryIssues.mockReturnValueOnce(pending.promise);
        const run = loadQueryView();
        setCurrentView('board');
        pending.reject(Object.assign(new Error('boom'), { status: 400 }));
        await run;
        expect(document.getElementById('query-error').classList.contains('hidden')).toBe(true);
    });

    it('2: rejected where text never reaches the URL', async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValueOnce(response());
        await loadQueryView();
        const good = window.location.search;
        api.queryIssues.mockRejectedValueOnce(Object.assign(new Error('bad'), { status: 400 }));
        document.getElementById('query-where').value = 'bogus=<x>';
        await runWhereBox();
        // A column toggle rewrites the URL from the last accepted query.
        toggleQueryColumn('labels', true);
        const params = new URLSearchParams(window.location.search);
        expect(params.get('where')).toBe('status!=done,canceled');
        expect(params.get('cols')).toContain('labels');
        expect(window.location.search).not.toContain('bogus');
        expect(good).not.toContain('bogus');
    });

    it('2: a scope change whose run is rejected keeps the old URL', async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValueOnce(response());
        await loadQueryView();
        api.queryIssues.mockRejectedValueOnce(Object.assign(new Error('bad'), { status: 400 }));
        document.getElementById('query-where').value = 'bogus=1';
        await runWhereBox();
        const before = history.length;
        api.queryIssues.mockRejectedValueOnce(Object.assign(new Error('still bad'), { status: 400 }));
        await setQueryScope('p2');
        expect(history.length).toBe(before);
        expect(window.location.search).toBe('?project=p1&where=status%21%3Ddone%2Ccanceled');
        expect(getCurrentProject()).toBe('p1');
        // Once a run is accepted the URL moves and the project follows.
        api.queryIssues.mockResolvedValueOnce(response({ where: 'status=todo' }));
        document.getElementById('query-where').value = 'status=todo';
        await setQueryScope('p2');
        expect(window.location.search).toBe('?project=p2&where=status%3Dtodo');
        expect(history.length).toBe(before + 1);
        expect(getCurrentProject()).toBe('p2');
    });

    it('3: text typed while a run is in flight is kept', async () => {
        setCurrentProject('p1');
        const pending = deferred();
        api.queryIssues.mockReturnValueOnce(pending.promise);
        const run = loadQueryView();
        document.getElementById('query-where').value = 'assignee=me';
        pending.resolve(response({ where: 'status!=done,canceled' }));
        await run;
        expect(document.getElementById('query-where').value).toBe('assignee=me');
        // The URL still records what actually ran.
        expect(new URLSearchParams(window.location.search).get('where')).toBe('status!=done,canceled');
    });

    it('5: a link to an unknown project says so', async () => {
        go('/query?project=gone');
        api.queryIssues.mockResolvedValue(response());
        await loadQueryView();
        const notice = document.getElementById('query-notice');
        expect(notice.classList.contains('hidden')).toBe(false);
        expect(notice.textContent).toMatch(/showing all projects/);

        _resetQueryViewForTest();
        setCurrentProject('p2');
        go('/query?project=gone');
        await loadQueryView();
        expect(document.getElementById('query-notice').textContent).toMatch(/current project/);
        expect(api.queryIssues.mock.calls.at(-1)[0]).toMatchObject({ projectId: 'p2' });

        _resetQueryViewForTest();
        go('/query?project=p1');
        await loadQueryView();
        expect(document.getElementById('query-notice').classList.contains('hidden')).toBe(true);
    });

    it('7: the pager is disabled while a run is in flight', async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValueOnce(response({ total: 250, issues: Array.from({ length: 100 }, (_, n) => issue(n + 1)) }));
        await loadQueryView();
        const next = () => document.querySelector('[data-query-page="1"]');
        expect(next().disabled).toBe(false);
        const pending = deferred();
        api.queryIssues.mockReturnValueOnce(pending.promise);
        document.getElementById('query-where').value = 'status=todo';
        const run = runWhereBox();
        expect(next().disabled).toBe(true);
        expect(document.querySelector('[data-query-page="-1"]').disabled).toBe(true);
        // Even called directly, paging waits for the run.
        goToQueryPage(1);
        expect(api.queryIssues).toHaveBeenCalledTimes(2);
        pending.resolve(response({ where: 'status=todo', total: 250, issues: Array.from({ length: 100 }, (_, n) => issue(n + 1)) }));
        await run;
        expect(next().disabled).toBe(false);
        expect(document.querySelector('[data-query-page="-1"]').disabled).toBe(true);
    });

    it('8: a failed page load stays on the page that was showing', async () => {
        setCurrentProject('p1');
        api.queryIssues.mockResolvedValueOnce(response({ total: 250, issues: Array.from({ length: 100 }, (_, n) => issue(n + 1)) }));
        await loadQueryView();
        api.queryIssues.mockRejectedValueOnce(new Error('Network error - check your connection'));
        await goToQueryPage(1);
        expect(getQueryState().page).toBe(1);
        expect(document.querySelectorAll('.query-row')).toHaveLength(100);
        expect(document.querySelector('[data-query-page="1"]').disabled).toBe(false);
        expect(document.getElementById('query-error').textContent).toContain('Network error');
        expect(new URLSearchParams(window.location.search).has('page')).toBe(false);
    });
});
