/**
 * Query page (/query) - CHT-1810, sub-ticket B of CHT-1746.
 *
 * Runs the general issue query (CHT-1718, docs/issue-query.md) through
 * GET /projects/{id}/issues/query or GET /teams/{id}/issues/query and shows
 * the results as a table with selectable columns and paging.
 *
 * The URL is the page's state; nothing goes to localStorage. Params:
 *   project=<id>   project scope (absent with scope=team)
 *   scope=team     every project of the current team ("All projects")
 *   where=<text>   the server's canonical where text. Absent means the
 *                  default (open issues); present but empty means everything.
 *   order=<text>   the server's canonical order text (absent: server default)
 *   cols=a,b,c     client-only: the table's columns, in order
 *   group=<field>  client-only: kept for the grouping controls (CHT-1812)
 *   view=<id>      kept for saved views (CHT-1814)
 *   page=<n>       1-based page of PAGE_SIZE results
 *
 * After every successful run the page writes the server's echoed where and
 * order back into the URL and the where box, so what is shared or
 * bookmarked is always the canonical text the CLI and MCP also take.
 */

import { api } from './api.js';
import { escapeHtml, escapeAttr, sanitizeColor, formatStatus, formatPriority, formatIssueType, formatDate } from './utils.js';
import { showToast } from './ui.js';
import { getCurrentProject, setCurrentProject, getCurrentTeam, getCurrentView } from './state.js';
import { getProjects } from './projects.js';

export const PAGE_SIZE = 100;
export const DEFAULT_WHERE = 'status!=done,canceled';

// The fields `chaotic issue list --sort` accepts (cli issue list). Any other
// order cannot be expressed on the command line as one --sort/--order pair.
const CLI_SORT_FIELDS = ['created', 'updated', 'priority', 'status', 'title', 'estimate'];

// Text that may come from users or the server goes through escapeHtml; this
// also prints numbers such as an estimate of 0, which escapeHtml drops.
function esc(value) {
    if (value === null || value === undefined) return '';
    return escapeHtml(String(value));
}

function issueLink(identifier, issueId, text) {
    return `<a href="/issue/${encodeURIComponent(identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(issueId)}">${esc(text)}</a>`;
}

function principalName(issue, key) {
    return issue[`${key}_name`] || issue[key]?.name || '';
}

/**
 * Every column the table can show, in the order the column picker lists them.
 * `fixed` columns are always shown.
 */
export const QUERY_COLUMNS = [
    { id: 'identifier', label: 'ID', fixed: true, render: (i) => issueLink(i.identifier, i.id, i.identifier) },
    { id: 'title', label: 'Title', fixed: true, render: (i) => issueLink(i.identifier, i.id, i.title) },
    { id: 'status', label: 'Status', render: (i) => esc(formatStatus(i.status)) },
    { id: 'priority', label: 'Priority', render: (i) => esc(formatPriority(i.priority)) },
    { id: 'type', label: 'Type', render: (i) => esc(formatIssueType(i.issue_type)) },
    { id: 'assignee', label: 'Assignee', render: (i) => esc(principalName(i, 'assignee')) },
    { id: 'creator', label: 'Creator', render: (i) => esc(principalName(i, 'creator')) },
    { id: 'project', label: 'Project', render: (i) => esc(i.project_key) },
    { id: 'sprint', label: 'Sprint', render: (i) => esc(i.sprint_name) },
    {
        id: 'labels', label: 'Labels', render: (i) => (i.labels || []).map((l) => {
            const color = sanitizeColor(l.color);
            return `<span class="issue-label" style="background: ${color}20; color: ${color}">${esc(l.name)}</span>`;
        }).join(' '),
    },
    { id: 'estimate', label: 'Estimate', render: (i) => esc(i.estimate) },
    {
        id: 'parent', label: 'Parent', render: (i) => (i.parent_identifier
            ? `<a href="/issue/${encodeURIComponent(i.parent_identifier)}" data-action="navigate-issue" data-issue-id="${escapeAttr(i.parent_id)}">${esc(i.parent_identifier)}</a>`
            : ''),
    },
    { id: 'created', label: 'Created', render: (i) => esc(formatDate(i.created_at)) },
    { id: 'updated', label: 'Updated', render: (i) => esc(formatDate(i.updated_at)) },
    { id: 'completed', label: 'Completed', render: (i) => esc(formatDate(i.completed_at)) },
    { id: 'due', label: 'Due', render: (i) => esc(formatDate(i.due_date)) },
];

const COLUMN_BY_ID = Object.fromEntries(QUERY_COLUMNS.map((c) => [c.id, c]));
const FIXED_COLUMNS = QUERY_COLUMNS.filter((c) => c.fixed).map((c) => c.id);
export const DEFAULT_COLUMNS = ['identifier', 'title', 'status', 'priority', 'assignee', 'updated'];

/**
 * Keep known column ids, drop duplicates, and put any missing fixed column
 * (identifier, title) first. An empty result means the defaults.
 */
export function normalizeColumns(ids) {
    const seen = new Set();
    const kept = [];
    for (const raw of ids || []) {
        const id = String(raw).trim();
        if (!COLUMN_BY_ID[id] || seen.has(id)) continue;
        seen.add(id);
        kept.push(id);
    }
    if (kept.length === 0) return [...DEFAULT_COLUMNS];
    const missing = FIXED_COLUMNS.filter((id) => !seen.has(id));
    return [...missing, ...kept];
}

function sameColumns(a, b) {
    return a.length === b.length && a.every((id, n) => id === b[n]);
}

/**
 * Read the page state from a location.search string.
 */
export function parseQueryUrl(search) {
    const params = new URLSearchParams(search || '');
    const page = parseInt(params.get('page') || '1', 10);
    return {
        projectId: params.get('project') || null,
        teamScope: params.get('scope') === 'team',
        // null (absent) and '' (present, empty) mean different things.
        where: params.has('where') ? params.get('where') : null,
        order: params.get('order') || null,
        cols: params.has('cols') ? normalizeColumns(params.get('cols').split(',')) : [...DEFAULT_COLUMNS],
        group: params.get('group') || null,
        view: params.get('view') || null,
        // Only a safe integer: a huge page= would send skip as 1e+25 (a 422).
        page: Number.isSafeInteger(page) && page >= 1 ? page : 1,
    };
}

/**
 * Build the /query URL for a page state. Default columns and page 1 are
 * left out so a plain query gives a short link.
 */
export function buildQueryUrl(state) {
    const params = new URLSearchParams();
    if (state.teamScope) {
        params.set('scope', 'team');
    } else if (state.projectId) {
        params.set('project', state.projectId);
    }
    if (state.where !== null && state.where !== undefined) params.set('where', state.where);
    if (state.order) params.set('order', state.order);
    if (state.cols && !sameColumns(state.cols, DEFAULT_COLUMNS)) params.set('cols', state.cols.join(','));
    if (state.group) params.set('group', state.group);
    if (state.view) params.set('view', state.view);
    if (state.page && state.page > 1) params.set('page', String(state.page));
    const qs = params.toString();
    return qs ? `/query?${qs}` : '/query';
}

/**
 * Quote a string for a POSIX shell: single quotes, with each embedded
 * single quote closed, escaped and reopened.
 */
export function shellQuote(text) {
    return `'${String(text).replace(/'/g, `'\\''`)}'`;
}

/**
 * The `chaotic issue list` command for a query. Returns {command, warning}.
 *
 * `issue list` has no --project option: without --all-projects it runs in
 * the CLI's current project, whatever that is. So a project-scoped query is
 * copied as a team query with a `project=KEY` row ANDed in front, which
 * selects the same issues wherever it is run. `limit`/`skip` carry the
 * page's paging (the CLI's own default limit is 50).
 *
 * warning is set when the order has no exact --sort/--order equivalent, in
 * which case only the first term (if the CLI can sort by it) is copied.
 */
export function buildCliCommand({ where, order, teamScope, projectKey = null, limit = PAGE_SIZE, skip = 0 }) {
    const parts = ['chaotic', 'issue', 'list'];
    let text = where || '';
    let warning = null;
    if (teamScope || projectKey) {
        parts.push('--all-projects');
        if (!teamScope) text = text ? `project=${projectKey} (${text})` : `project=${projectKey}`;
    } else {
        // Only when the project's key is unknown.
        warning = "Runs in your CLI's current project.";
    }
    parts.push('--where', shellQuote(text));
    const terms = (order || '').split(',').map((t) => t.trim()).filter(Boolean);
    if (terms.length > 0) {
        const first = terms[0];
        const desc = first.startsWith('-');
        const field = first.replace(/^[-+]/, '');
        let orderWarning = null;
        if (CLI_SORT_FIELDS.includes(field)) {
            parts.push('--sort', field, '--order', desc ? 'desc' : 'asc');
            if (terms.length > 1) orderWarning = `The CLI sorts by one field; only "${first}" was copied.`;
        } else {
            orderWarning = `The CLI cannot sort by "${field}"; the order was not copied.`;
        }
        if (orderWarning) warning = warning ? `${warning} ${orderWarning}` : orderWarning;
    }
    parts.push('--limit', String(limit));
    if (skip > 0) parts.push('--skip', String(skip));
    return { command: parts.join(' '), warning };
}

/**
 * The message to show for a failed query. A 400 carries the server's own
 * explanation as a string; a 422 (e.g. where text over the length cap)
 * carries pydantic's list of errors.
 */
export function formatQueryError(error) {
    if (!error) return 'The query failed.';
    if (Array.isArray(error.detail)) {
        const msgs = error.detail.map((d) => (d && typeof d.msg === 'string' ? d.msg : '')).filter(Boolean);
        if (msgs.length) return msgs.join('; ');
    }
    return error.message || 'The query failed.';
}

/**
 * The results table for a page of issues and a column list. Every value is
 * escaped; label colors go through sanitizeColor.
 */
export function renderResultsTable(issues, cols) {
    const columns = normalizeColumns(cols).map((id) => COLUMN_BY_ID[id]);
    const head = columns.map((c) => `<th data-col="${escapeAttr(c.id)}">${esc(c.label)}</th>`).join('');
    const body = issues.map((issue) => `<tr class="query-row" data-issue-id="${escapeAttr(issue.id)}">${
        columns.map((c) => `<td class="query-col-${escapeAttr(c.id)}">${c.render(issue)}</td>`).join('')
    }</tr>`).join('');
    return `<table class="query-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

/**
 * "1-100 of 342" and the Prev/Next buttons for the current page.
 */
export function renderPager(total, skip, count) {
    const noun = total === 1 ? 'issue' : 'issues';
    if (total === 0) return `<span class="query-total">0 issues</span>`;
    const hasPrev = skip > 0;
    const hasNext = skip + count < total;
    // A page past the end (e.g. a stale page= in the URL) has no range.
    const range = count === 0 ? `${total} ${noun}` : `${skip + 1}–${skip + count} of ${total} ${noun}`;
    return `<span class="query-total">${range}</span>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="-1"${hasPrev ? '' : ' disabled'}>Previous</button>
        <button type="button" class="btn btn-secondary btn-small" data-query-page="1"${hasNext ? '' : ' disabled'}>Next</button>`;
}

// ----------------------------------------------------------------------
// Page state and DOM wiring
// ----------------------------------------------------------------------

// `state` is what the page is showing or about to run: scope, the where
// and order to send, the page, and the client-only cols/group/view.
// `accepted` is the scope/where/order/page of the last run the server
// accepted (or, before the first run, what the URL held). The URL is only
// ever built from `accepted`, so text the server rejected never reaches it.
let state = null;
let accepted = null;
let lastResult = null;
let requestId = 0;
let running = false;
let initialized = false;

/** Test hook: forget the page state and listeners' guard. */
export function _resetQueryViewForTest() {
    state = null;
    accepted = null;
    lastResult = null;
    requestId = 0;
    running = false;
    initialized = false;
}

/** The page state (read-only use; tests and later sub-tickets). */
export function getQueryState() {
    return state;
}

function el(id) {
    return document.getElementById(id);
}

function snapshot(s) {
    return { projectId: s.projectId, teamScope: s.teamScope, where: s.where, order: s.order, page: s.page };
}

function writeUrl(mode) {
    const url = buildQueryUrl({ ...accepted, cols: state.cols, group: state.group, view: state.view });
    const current = window.location.pathname + window.location.search;
    if (mode === 'push' && url !== current) {
        history.pushState({ view: 'query' }, '', url);
    } else {
        history.replaceState({ view: 'query' }, '', url);
    }
}

function populateProjectSelect() {
    const select = el('query-project-filter');
    if (!select) return;
    const options = ['<option value="">All projects</option>']
        .concat(getProjects().map((p) => `<option value="${escapeAttr(p.id)}">${esc(p.name)}</option>`));
    select.innerHTML = options.join('');
    select.value = state.teamScope ? '' : (state.projectId || '');
}

function renderColumnPicker() {
    const menu = el('query-columns-menu');
    if (!menu) return;
    menu.innerHTML = QUERY_COLUMNS.map((c) => `
        <label class="query-column-option">
            <input type="checkbox" value="${escapeAttr(c.id)}"${state.cols.includes(c.id) ? ' checked' : ''}${c.fixed ? ' disabled' : ''}>
            ${esc(c.label)}
        </label>`).join('');
}

function showError(message) {
    const box = el('query-error');
    if (!box) return;
    if (message) {
        box.innerHTML = `<strong>Query error:</strong> ${esc(message)}`;
        box.classList.remove('hidden');
    } else {
        box.innerHTML = '';
        box.classList.add('hidden');
    }
}

function showNotice(message) {
    const box = el('query-notice');
    if (!box) return;
    box.textContent = message || '';
    box.classList.toggle('hidden', !message);
}

function setPagerDisabled(disabled) {
    el('query-pager')?.querySelectorAll('button[data-query-page]').forEach((btn) => {
        if (disabled) {
            btn.disabled = true;
        } else if (btn.dataset.enabled === 'true') {
            btn.disabled = false;
        }
    });
}

function renderResults() {
    const results = el('query-results');
    const pager = el('query-pager');
    if (!results) return;
    if (!lastResult) {
        results.innerHTML = '';
        if (pager) pager.innerHTML = '';
        return;
    }
    const { issues, total, skip } = lastResult;
    if (issues.length === 0) {
        results.innerHTML = `<div class="empty-state">${total > 0 ? 'No issues on this page.' : 'No issues match this query.'}</div>`;
    } else {
        results.innerHTML = renderResultsTable(issues, state.cols);
    }
    if (pager) {
        pager.innerHTML = renderPager(total, skip, issues.length);
        // Remember which buttons this page allows, so a run can disable
        // them all and its end restore exactly these.
        pager.querySelectorAll('button[data-query-page]').forEach((btn) => {
            btn.dataset.enabled = String(!btn.disabled);
        });
        if (running) setPagerDisabled(true);
    }
}

/**
 * Run the current state's query. `historyMode` is 'replace' for a page load
 * and 'push' for an explicit run (Enter, Run, paging, scope change), so Back
 * steps through queries. Options:
 *   onSuccess   called after the URL is written (setQueryScope uses it)
 *   onFailure   called instead of clearing the results (paging uses it)
 */
export async function runQuery(historyMode = 'replace', { onSuccess = null, onFailure = null } = {}) {
    if (!state) return;
    const team = getCurrentTeam();
    const scope = state.teamScope ? { teamId: team?.id } : { projectId: state.projectId };
    if (!scope.teamId && !scope.projectId) {
        lastResult = null;
        renderResults();
        showError(state.teamScope ? 'Select a team first.' : 'Select a project.');
        return;
    }
    const id = ++requestId;
    const sentWhere = state.where === null ? DEFAULT_WHERE : state.where;
    const results = el('query-results');
    running = true;
    if (results) results.classList.add('loading');
    setPagerDisabled(true);
    // A response is only for this page if no newer run started and the user
    // has not left it: otherwise writeUrl would rewrite another page's entry.
    const current = () => id === requestId && getCurrentView() === 'query';
    try {
        const res = await api.queryIssues({
            ...scope,
            where: sentWhere,
            order: state.order,
            skip: (state.page - 1) * PAGE_SIZE,
            limit: PAGE_SIZE,
        });
        if (!current()) return;
        // Adopt the server's canonical text, in the URL and in the box.
        state.where = res.where;
        state.order = res.order || null;
        accepted = snapshot(state);
        lastResult = { issues: res.issues || [], total: res.total, skip: res.skip };
        const box = el('query-where');
        // Leave the box alone if the user typed while this ran.
        if (box && box.value.trim() === sentWhere.trim()) box.value = res.where;
        showError(null);
        running = false;
        renderResults();
        writeUrl(historyMode);
        if (onSuccess) onSuccess();
    } catch (error) {
        if (!current()) return;
        running = false;
        if (onFailure) {
            onFailure();
        } else {
            lastResult = null;
        }
        renderResults();
        showError(formatQueryError(error));
    } finally {
        if (id === requestId) {
            running = false;
            if (results) results.classList.remove('loading');
            setPagerDisabled(false);
        }
    }
}

/** Run what is in the where box, as a new history entry. */
export function runWhereBox() {
    if (!state) return;
    const box = el('query-where');
    state.where = box ? box.value.trim() : '';
    state.page = 1;
    return runQuery('push');
}

/** Change the scope: a project id, or '' for every project of the team. */
export function setQueryScope(projectId) {
    if (!state) return;
    state.teamScope = !projectId;
    if (projectId) state.projectId = projectId;
    state.page = 1;
    showNotice(null);
    // setCurrentProject syncs ?project= with a replaceState, so it runs after
    // the new entry is pushed, not on the entry Back returns to.
    return runQuery('push', { onSuccess: () => { if (projectId) setCurrentProject(projectId); } });
}

/** Show or hide a column; identifier and title cannot be hidden. */
export function toggleQueryColumn(colId, on) {
    if (!state || !COLUMN_BY_ID[colId] || COLUMN_BY_ID[colId].fixed) return;
    const without = state.cols.filter((c) => c !== colId);
    state.cols = normalizeColumns(on ? [...without, colId] : without);
    renderResults();
    writeUrl('replace');
}

/** Move to another page of results. */
export function goToQueryPage(delta) {
    if (!state || !lastResult || running) return;
    const next = state.page + delta;
    if (next < 1) return;
    if (delta > 0 && lastResult.skip + lastResult.issues.length >= lastResult.total) return;
    const previous = { page: state.page, result: lastResult };
    state.page = next;
    // On failure stay on the page that was showing, pager and all.
    return runQuery('push', {
        onFailure: () => {
            state.page = previous.page;
            lastResult = previous.result;
        },
    });
}

/** Copy the query as a `chaotic issue list --where ...` command. */
export async function copyQueryAsCli() {
    if (!state) return null;
    const box = el('query-where');
    // Copy what the user sees: the box, which after a run is canonical.
    const where = box ? box.value.trim() : (state.where ?? DEFAULT_WHERE);
    const project = state.teamScope ? null : getProjects().find((p) => p.id === state.projectId);
    const { command, warning } = buildCliCommand({
        where,
        order: state.order,
        teamScope: state.teamScope,
        projectKey: project?.key || null,
        limit: PAGE_SIZE,
        skip: lastResult ? lastResult.skip : 0,
    });
    const preview = el('query-cli-preview');
    try {
        await navigator.clipboard.writeText(command);
        showToast(warning ? `Copied. ${warning}` : 'Copied CLI command', warning ? 'warning' : 'success');
        if (preview) preview.classList.add('hidden');
    } catch {
        // No clipboard (insecure context, denied): show it to copy by hand.
        if (preview) {
            preview.textContent = command;
            preview.classList.remove('hidden');
        }
        showToast('Could not copy; the command is shown below the box', 'warning');
    }
    return command;
}

function initListeners() {
    if (initialized) return;
    initialized = true;
    el('query-where')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
            e.preventDefault();
            runWhereBox();
        }
    });
    el('query-run-btn')?.addEventListener('click', () => runWhereBox());
    el('query-copy-cli-btn')?.addEventListener('click', () => copyQueryAsCli());
    el('query-project-filter')?.addEventListener('change', (e) => setQueryScope(e.target.value));
    el('query-columns-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = el('query-columns-menu');
        if (!menu) return;
        const open = menu.classList.toggle('hidden') === false;
        e.currentTarget.setAttribute('aria-expanded', String(open));
    });
    el('query-columns-menu')?.addEventListener('change', (e) => {
        if (e.target.matches('input[type="checkbox"]')) toggleQueryColumn(e.target.value, e.target.checked);
    });
    el('query-pager')?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-query-page]');
        if (!btn || btn.disabled) return;
        goToQueryPage(Number(btn.dataset.queryPage));
    });
    document.addEventListener('click', (e) => {
        const menu = el('query-columns-menu');
        if (menu && !menu.classList.contains('hidden') && !e.target.closest('#query-columns-picker')) {
            menu.classList.add('hidden');
            el('query-columns-btn')?.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Router entry: read the URL, fill the controls and run the query. Called
 * on navigation, on a direct load and on Back/Forward.
 */
export function loadQueryView() {
    initListeners();
    const parsed = parseQueryUrl(window.location.search);
    const projects = getProjects();
    let notice = null;
    if (!parsed.teamScope) {
        const known = (id) => id && projects.some((p) => p.id === id);
        if (!known(parsed.projectId)) {
            const linked = parsed.projectId;
            parsed.projectId = known(getCurrentProject()) ? getCurrentProject() : null;
            // A link to a project this viewer cannot see (or that is gone):
            // say so rather than silently changing what the link means.
            if (linked) {
                notice = parsed.projectId
                    ? 'The project in this link is not available to you; showing your current project.'
                    : 'The project in this link is not available to you; showing all projects.';
            }
        }
        // No project to scope to: query the whole team.
        if (!parsed.projectId) parsed.teamScope = true;
    }
    state = parsed;
    accepted = snapshot(state);
    lastResult = null;
    const box = el('query-where');
    if (box) box.value = state.where === null ? DEFAULT_WHERE : state.where;
    el('query-cli-preview')?.classList.add('hidden');
    el('query-columns-menu')?.classList.add('hidden');
    populateProjectSelect();
    renderColumnPicker();
    showError(null);
    showNotice(notice);
    renderResults();
    return runQuery('replace');
}
