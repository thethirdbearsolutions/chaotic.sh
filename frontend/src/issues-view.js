/**
 * Issues View orchestrator (CHT-1137)
 *
 * Slim coordinator that ties together filter state (issues-filter.js)
 * and rendering (issues-render.js). Handles issue loading, filter triggers,
 * action handlers, and event delegation registration.
 *
 * Re-exports everything from issues-filter.js and issues-render.js
 * so downstream consumers (app.js, tests) don't need import changes.
 */

import { api } from './api.js';
import {
    getCurrentUser,
    getCurrentTeam,
    getIssues,
    setIssues,
    setDetailNavContext,
    getSearchDebounceTimer,
    setSearchDebounceTimer,
    setSelectedIssueIndex,
    getCurrentProject,
    setCurrentProject,
    getCurrentView,
    subscribe,
} from './state.js';
import { getProjects } from './projects.js';
import { ensureSprintCacheForIssues, getCachedCurrentSprintId, setCachedCurrentSprintId, getSprintCache } from './sprints.js';
import { renderIssues } from './issue-list.js';
import { withEditsInFlight } from './inline-dropdown.js';
import { showApiError } from './ui.js';
import { registerActions } from './event-delegation.js';
import { OPEN_STATUSES } from './constants.js';
import { renderEmptyState, EMPTY_ICONS } from './empty-states.js';
import {
    queryKey,
    readQuery,
    readQueryMeta,
    writeQuery,
    setQueryMeta,
    setCurrentQueryKey,
    getCurrentQueryKey,
    rememberView,
    queryForView,
    sameRows,
    dropQuery,
    deriveQuery,
} from './issue-store.js';

// Import from sub-modules
import {
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getExcludedLabels,
    getGroupByValue,
    getStatusPreset,
    syncFiltersToUrl,
    loadFiltersFromUrl as _loadFiltersFromUrl,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    updateExcludeLabelFilterLabel,
    populateLabelFilter,
    CLOSED_STATUSES,
} from './issues-filter.js';

import {
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    showFilterCategories,
    closeAllFilterMenus,
    updateFilterChips,
    updateFilterCountBadge,
    updateSprintFilter,
    showIssuesLoadingSkeleton,
} from './issues-render.js';

// Re-export everything from sub-modules for backward compatibility
export {
    getSelectedStatuses,
    getSelectedPriorities,
    getSelectedLabels,
    getExcludedLabels,
    getGroupByValue,
    getFilterCategoryCount,
    getTotalFilterCount,
    syncFiltersToUrl,
    FILTER_CATEGORIES,
    CLOSED_STATUSES,
    updateStatusFilterLabel,
    updatePriorityFilterLabel,
    updateLabelFilterLabel,
    updateExcludeLabelFilterLabel,
    populateLabelFilter,
} from './issues-filter.js';

export {
    toggleMultiSelect,
    toggleFilterMenu,
    toggleDisplayMenu,
    closeAllFilterMenus,
    renderFilterMenuCategories,
    showFilterCategoryOptions,
    showFilterCategories,
    renderDisplayMenuOptions,
    updateFilterChips,
    updateFilterCountBadge,
    updateSprintFilter,
    updateSprintBudgetBar,
    showIssuesLoadingSkeleton,
} from './issues-render.js';

// ========================================
// Module State
// ========================================

// Guard flag: when true, the subscriber skips sprint-clearing logic
// because loadFiltersFromUrl is restoring filters from URL params.
let _suppressProjectSubscriber = false;

// ========================================
// Reactive Subscriber
// ========================================

// React to project changes when issues view is active (CHT-1083)
subscribe((key) => {
    if (key !== 'currentProject') return;
    if (getCurrentView() !== 'issues') return;
    if (_suppressProjectSubscriber) return;
    // Clear sprint filter — sprints are per-project so old value is stale (CHT-1084)
    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.value = '';
    // Update sprint and label filter options, then clear labels and re-filter (CHT-1162)
    Promise.all([updateSprintFilter(), populateLabelFilter()]).then(() => {
        // Clear label checkboxes after repopulation so DOM state is consistent
        const labelDropdown = document.getElementById('label-filter-dropdown');
        labelDropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
        const excludeLabelDropdown = document.getElementById('exclude-label-filter-dropdown');
        excludeLabelDropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = false; });
        updateLabelFilterLabel();
        updateExcludeLabelFilterLabel();
        filterIssues();
        updateFilterChips();
        updateFilterCountBadge();
    }).catch(e => {
        console.error('Failed to update filters on project switch:', e);
        filterIssues();
        updateFilterChips();
        updateFilterCountBadge();
    });
});

// ========================================
// Wrapper for loadFiltersFromUrl
// ========================================

export function loadFiltersFromUrl() {
    _loadFiltersFromUrl((value) => { _suppressProjectSubscriber = value; });
}

// ========================================
// Legacy Filter Update Functions
// ========================================

export function updateStatusFilter() {
    updateStatusFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearStatusFilter() {
    const dropdown = document.getElementById('status-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateStatusFilter();
}

export function updatePriorityFilter() {
    updatePriorityFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearPriorityFilter() {
    const dropdown = document.getElementById('priority-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updatePriorityFilter();
}

export function updateLabelFilter() {
    updateLabelFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearLabelFilter() {
    const dropdown = document.getElementById('label-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateLabelFilter();
}

export function updateExcludeLabelFilter() {
    updateExcludeLabelFilterLabel();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

export function clearExcludeLabelFilter() {
    const dropdown = document.getElementById('exclude-label-filter-dropdown');
    dropdown?.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    updateExcludeLabelFilter();
}

// ========================================
// Issue Loading & Search
// ========================================

// Escape a value for interpolation inside a quoted CSS attribute selector
// (`[value="..."]`) — backslashes and double quotes are the only
// metacharacters inside a quoted string (CHT-1212 review).
function escapeSelectorValue(value) {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Resolve label checkbox ids to their display names via the DOM (the
 * backend's label/exclude_label filters match by name, not id) — mirrors
 * the technique updateFilterChips() already uses (CHT-1212).
 */
function resolveLabelNames(labelIds, dropdownId) {
    if (labelIds.length === 0) return [];
    const dropdown = document.getElementById(dropdownId);
    return labelIds
        .map(id => dropdown?.querySelector(`input[value="${escapeSelectorValue(id)}"]`)?.closest('label')?.querySelector('.label-name')?.textContent)
        .filter(Boolean);
}

// Monotonic request id — lets loadIssues() drop a response from a
// superseded request (rapid filter/search changes) instead of overwriting
// newer data with stale data (CHT-1211 item 7).
let loadIssuesRequestId = 0;

// Search under the Open default (CHT-1755 review M1): a search for a done
// or canceled issue would otherwise come back empty with no hint why. The
// list stays as filtered (the "Status: Open" chip must stay true), and a
// line above it counts the closed matches the filter hides, with a button
// that drops the status filter.
function setHiddenClosedHint(count) {
    const hint = document.getElementById('issues-hidden-closed-hint');
    if (!hint) return;
    if (!count) {
        hint.classList.add('hidden');
        hint.innerHTML = '';
        return;
    }
    hint.innerHTML = `<span>${count} closed match${count === 1 ? '' : 'es'} hidden by the Open filter</span>`
        + ' · <button type="button" class="btn-link" data-action="show-all-statuses">Show all statuses</button>';
    hint.classList.remove('hidden');
}

/**
 * What the Issues view is showing, as the user chose it: the team, the
 * filters in the URL (syncFiltersToUrl keeps them there) and the search
 * text. Readable before the filter dropdowns have their options, which is
 * what lets a view render its cached rows at once (CHT-1894).
 */
export function currentViewKey() {
    // The same inputs loadIssues() reads, except the sprint and label
    // filters: their dropdown options may not be loaded yet on view entry,
    // so those come from the URL, which syncFiltersToUrl() keeps in step.
    const url = new URLSearchParams(window.location.search);
    return JSON.stringify({
        team: getCurrentTeam()?.id || '',
        project: getCurrentProject() || '',
        status: [...getSelectedStatuses()].sort(),
        priority: [...getSelectedPriorities()].sort(),
        assignee: document.getElementById('assignee-filter')?.value || '',
        type: document.getElementById('issue-type-filter')?.value || '',
        sort: document.getElementById('sort-by-select')?.value || '',
        sprint: url.get('sprint') || '',
        label: url.getAll('label').sort(),
        excludeLabel: url.getAll('exclude_label').sort(),
        search: document.getElementById('issue-search')?.value?.trim() || '',
    });
}

// The query whose rows #issues-list shows right now, or null when it shows
// a skeleton, an error or an empty state. "Already painted" is decided by
// this, not by the issues state, which an error screen leaves behind
// (CHT-1894 review).
let paintedKey = null;

function clearKeyboardHighlight() {
    document.querySelectorAll('#issues-list .keyboard-selected')
        .forEach(el => el.classList.remove('keyboard-selected'));
}

function setListRefreshing(on) {
    document.getElementById('issues-list')?.classList.toggle('is-refreshing', !!on);
}

function showCachedRows(key, rows) {
    setListRefreshing(false);
    setCurrentQueryKey(key);
    setIssues(rows);
    if (getCurrentView() === 'issues') setDetailNavContext(rows);
    renderIssues();
    paintedKey = key;
    setHiddenClosedHint(readQueryMeta(key).hiddenClosed || 0);
}

// Rows filtered on the client from another cached query (CHT-1910). No
// current query: an edit made meanwhile must not be saved under a key
// these rows were never loaded for. The server's answer takes over.
function showDerivedRows(key, rows, { loading }) {
    setCurrentQueryKey(null);
    setIssues(rows);
    if (getCurrentView() === 'issues') setDetailNavContext(rows);
    renderIssues();
    setListRefreshing(loading);
    paintedKey = key;
    setHiddenClosedHint(0);
}

function showSkeleton() {
    setCurrentQueryKey(null);
    paintedKey = null;
    setListRefreshing(false);
    showIssuesLoadingSkeleton();
    setHiddenClosedHint(0);
}

function showLoadingState() {
    const list = document.getElementById('issues-list');
    setHiddenClosedHint(0);
    if (list?.querySelector('.issue-row')) {
        setListRefreshing(true);
    } else {
        showSkeleton();
    }
}

/**
 * Entering the Issues view: render the rows last loaded for this view at
 * once, from the store, or the skeleton when there are none. loadIssues()
 * follows and refreshes them (CHT-1894).
 */
export function showCachedIssuesOrSkeleton() {
    const key = queryForView(currentViewKey());
    const cached = key ? readQuery(key) : null;
    if (cached) {
        setSelectedIssueIndex(-1);
        showCachedRows(key, cached);
        return true;
    }
    showSkeleton();
    return false;
}

/**
 * A list response merged with what changed on screen while it was in
 * flight (CHT-1921):
 * - a row the list holds at a newer `updated_at` (an edit's answer, a /ws
 *   update) is kept over the response's older copy;
 * - a field edit still in flight keeps its value;
 * - a row added since the request went out (a quick-create, a /ws create)
 *   and not in the response stays, at the top;
 * - a row removed since then (a /ws delete) stays removed.
 * @param {Object[]} local - the list as it is now
 * @param {Object[]} server - the response
 * @param {Set<string>} idsAtRequest - the list's ids when the request went out
 */
export function keepLocalChanges(local, server, idsAtRequest) {
    if (!Array.isArray(server)) return server;
    const localById = new Map(local.map(i => [i.id, i]));
    const serverIds = new Set(server.map(i => i.id));
    const added = local.filter(i => !idsAtRequest.has(i.id) && !serverIds.has(i.id));
    const kept = [];
    for (const row of server) {
        const mine = localById.get(row.id);
        if (!mine && idsAtRequest.has(row.id)) continue; // removed meanwhile
        const newer = mine?.updated_at && row.updated_at && mine.updated_at > row.updated_at ? mine : row;
        kept.push(withEditsInFlight(newer));
    }
    return added.length ? [...added, ...kept] : kept;
}

export async function loadIssues() {
    setSelectedIssueIndex(-1);
    // The paint below may be skipped (rows already on screen), so the
    // highlight must not outlive the index it showed.
    clearKeyboardHighlight();
    const requestId = ++loadIssuesRequestId;
    if (!getCurrentTeam()) return;

    const projectId = getCurrentProject() || '';
    const statuses = getSelectedStatuses();
    const priorities = getSelectedPriorities();
    const assigneeFilter = document.getElementById('assignee-filter')?.value;
    const searchQuery = document.getElementById('issue-search')?.value?.trim();

    if (!projectId && getProjects().length === 0) {
        paintedKey = null;
        document.getElementById('issues-list').innerHTML = renderEmptyState({
            icon: EMPTY_ICONS.projects,
            heading: 'No projects yet',
            description: 'Create a project first to add issues',
            cta: { label: 'Create project', action: 'showCreateProjectModal' },
        });
        return;
    }

    // The view key is read now, before the awaits below: it names what
    // the user asked for (URL filters + search text) at call time.
    const viewKey = currentViewKey();
    const params = { limit: 1000 };

    const sortValue = document.getElementById('sort-by-select')?.value || 'created-desc';
    const [sortField, sortOrder] = sortValue.includes('-') ? sortValue.split('-') : [sortValue, null];
    params.sort_by = sortField;
    if (sortOrder) {
        params.order = sortOrder;
    }
    if (statuses.length > 0) {
        params.status = statuses;
    }
    if (priorities.length > 0) {
        params.priority = priorities;
    }
    if (assigneeFilter) {
        if (assigneeFilter === 'me') {
            params.assignee_id = getCurrentUser()?.id;
        } else {
            params.assignee_id = assigneeFilter;
        }
    }

    const sprintFilter = document.getElementById('sprint-filter')?.value;
    if (sprintFilter) {
        if (sprintFilter === 'current') {
            if (projectId) {
                // updateSprintFilter() already resolved and cached this same
                // lookup moments earlier (and the active sprint essentially
                // never changes mid-session) — reuse it instead of
                // re-fetching sprints on every loadIssues() call, including
                // every 300ms debounced search keystroke (CHT-1212)
                const cachedId = getCachedCurrentSprintId(projectId);
                if (cachedId !== undefined) {
                    if (cachedId) params.sprint_id = cachedId;
                } else {
                    try {
                        const sprints = await api.getSprints(projectId);
                        const currentSprint = sprints.find(s => s.status === 'active');
                        setCachedCurrentSprintId(projectId, currentSprint?.id);
                        if (currentSprint) {
                            params.sprint_id = currentSprint.id;
                        }
                    } catch (e) {
                        console.error('Failed to resolve current sprint:', e);
                    }
                }
            }
        } else {
            params.sprint_id = sprintFilter;
        }
    }

    const issueTypeFilter = document.getElementById('issue-type-filter')?.value;
    if (issueTypeFilter) {
        params.issue_type = issueTypeFilter;
    }

    // Backend's search param only requires min_length=1 (CHT-1212) — a 1-char
    // query used to silently no-op with no visible explanation.
    if (searchQuery && searchQuery.length >= 1) {
        params.search = searchQuery;
    } else {
        // The compact shape (CHT-1893): a list never shows the description,
        // except as a search snippet, so only a search asks for it.
        params.fields = 'list';
    }

    let showingCached = false;
    let showingDerived = false;
    let key = null;
    try {
        // Label/exclude-label filters are sent to the server (which matches
        // by name, case-insensitively) instead of over-fetching a 1000-row
        // page and filtering client-side (CHT-1212) — resolve id -> name via
        // the DOM the same way updateFilterChips() already does.
        // label_match=any preserves the multi-select UI's OR semantics; the
        // server default (all) is the CLI's documented AND contract.
        const selectedLabelNames = resolveLabelNames(getSelectedLabels(), 'label-filter-dropdown');
        if (selectedLabelNames.length > 0) {
            params.label = selectedLabelNames;
            params.label_match = 'any';
        }

        const excludedLabelNames = resolveLabelNames(getExcludedLabels(), 'exclude-label-filter-dropdown');
        if (excludedLabelNames.length > 0) {
            params.exclude_label = excludedLabelNames;
        }

        if (projectId) params.project_id = projectId;

        // Render what the store already has for this query at once, then
        // refresh in the background (CHT-1894). With nothing cached, keep
        // the rows on screen (dimmed) while the new ones load; the skeleton
        // is only for a list with nothing to show yet.
        const scope = projectId || `team:${getCurrentTeam().id}`;
        key = queryKey({ ...params, scope });
        const cached = readQuery(key);
        if (cached) {
            showingCached = true;
            // Entering the view already painted these rows
            // (showCachedIssuesOrSkeleton); painting them again would
            // double the cost of Back.
            if (!(paintedKey === key && getCurrentQueryKey() === key && sameRows(getIssues(), cached))) {
                showCachedRows(key, cached);
            }
        } else {
            // A cached query that covers this one (the unfiltered list
            // covers every status filter) gives its rows at once, filtered
            // here, while the server answers (CHT-1910). Nothing is
            // written back to the store from them, and a failed request
            // replaces them with the error.
            const derived = deriveQuery({ ...params, scope });
            // A complete source gives the whole answer, even an empty one.
            // One cut off at its limit may be missing rows: show them as
            // still loading (dimmed), never as the final list.
            if (derived && (derived.complete || derived.rows.length > 0)) {
                showingDerived = true;
                showDerivedRows(key, derived.rows, { loading: !derived.complete });
            } else {
                showLoadingState();
            }
        }

        const fetchIssues = (p) => {
            if (projectId) return api.getIssues(p);
            if (getProjects().length > 0) return api.getTeamIssues(getCurrentTeam().id, p);
            return Promise.resolve(undefined);
        };

        // Count closed matches in parallel; a failure here only loses the hint
        const closedCountPromise = (params.search && getStatusPreset(statuses) === 'open')
            ? fetchIssues({ ...params, status: CLOSED_STATUSES })
                .then(closed => (Array.isArray(closed) ? closed.length : 0))
                .catch(e => { console.error('Failed to count closed search matches:', e); return 0; })
            : Promise.resolve(0);

        // What the list held as the request went out: anything added or
        // removed after this was the user's (or /ws), not the server's.
        const idsAtRequest = new Set(getIssues().map(i => i.id));
        const issues = await fetchIssues(params);

        // Cache every response, even a superseded one: it is still that
        // query's latest result.
        writeQuery(key, issues);
        if (requestId !== loadIssuesRequestId) return; // a newer loadIssues() has since started — drop this stale response
        rememberView(viewKey, key);

        // Rows already on screen for this query may have changed while the
        // request ran: keep those changes over the older answer (CHT-1921).
        const onScreen = (showingCached || showingDerived) && paintedKey === key;
        const rows = onScreen ? keepLocalChanges(getIssues(), issues, idsAtRequest) : issues;
        const unchanged = onScreen && sameRows(getIssues(), rows);
        setCurrentQueryKey(key);
        setIssues(rows);
        // Prev/next issue-detail nav context (CHT-1211 item 2) — this is the
        // Issues-view's own list, so it's the reliable source when arriving
        // at an issue detail from here. The request id above only orders
        // loadIssues() against itself — also require that Issues is still
        // the current view at response time, or a slow response landing
        // after the user navigated away would clobber the context another
        // view has since written (CHT-1211 review #2).
        if (getCurrentView() === 'issues') {
            setDetailNavContext(rows);
        }

        const projectIds = [...new Set(rows.map(i => i.project_id).filter(Boolean))];
        const sprintsKnown = Object.keys(getSprintCache()).length;
        await ensureSprintCacheForIssues(projectIds);
        if (requestId !== loadIssuesRequestId) return; // guard again — a newer request may have resolved during the await above

        // Newly loaded sprints change the rows' sprint badges.
        const sprintsChanged = Object.keys(getSprintCache()).length !== sprintsKnown;
        if (!unchanged || sprintsChanged) renderIssues();
        paintedKey = key;
        setListRefreshing(false);

        const hiddenClosed = await closedCountPromise;
        setQueryMeta(key, { hiddenClosed });
        if (requestId !== loadIssuesRequestId) return;
        setHiddenClosedHint(hiddenClosed);
    } catch (e) {
        if (requestId !== loadIssuesRequestId) return;
        setListRefreshing(false);
        const refused = e?.status === 403 || e?.status === 404;
        if (showingCached && !refused) {
            // The cached rows stay: a failed background refresh must not
            // blank a list the user is reading.
            showApiError('refresh issues', e);
            return;
        }
        // Refused (access lost, project gone): forget the rows rather than
        // repaint them on every visit.
        if (refused && key) dropQuery(key);
        paintedKey = null;
        // CHT-1224: the skeleton from showIssuesLoadingSkeleton() above must
        // not be left on screen forever — replace it with a persistent error
        // + Retry cta (matches board.js's failed-load pattern) instead of a
        // toast-only signal that self-dismisses in 3s.
        const list = document.getElementById('issues-list');
        if (list) {
            list.innerHTML = renderEmptyState({
                icon: EMPTY_ICONS.issues,
                heading: 'Failed to load issues',
                description: 'Check your connection and try again',
                cta: { label: 'Retry', action: 'retry-load-issues' },
                variant: 'error',
            });
        }
        showApiError('load issues', e);
    }
}

export function debounceSearch() {
    clearTimeout(getSearchDebounceTimer());
    setSearchDebounceTimer(setTimeout(() => {
        loadIssues();
    }, 300));
}

export function filterIssues() {
    syncFiltersToUrl();
    loadIssues();
}

export async function updateGroupBy() {
    syncFiltersToUrl();
    if (getGroupByValue() === 'sprint') {
        const issues = getIssues();
        const projectIds = [...new Set(issues.map(i => i.project_id))];
        await ensureSprintCacheForIssues(projectIds);
    }
    renderIssues();
}

export function initFilterBar() {
    updateFilterChips();
    updateFilterCountBadge();
}

// ========================================
// Filter Option Toggle/Set Functions
// ========================================

export function setProjectFilter(value) {
    setCurrentProject(value);
    renderFilterMenuCategories();
    showFilterCategoryOptions('project');
    closeAllFilterMenus();
}

export function clearProjectFilter() {
    setProjectFilter('');
}

export function setStatusPreset(preset) {
    const statusValues = preset === 'open' ? OPEN_STATUSES
        : preset === 'closed' ? CLOSED_STATUSES
        : [];  // 'all' (CHT-1755): no status filter
    const dropdown = document.getElementById('status-filter-dropdown');
    if (!dropdown) return;

    const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.checked = statusValues.includes(cb.value);
    });

    updateStatusFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
}

export function toggleStatusOption(value, event) {
    const dropdown = document.getElementById('status-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateStatusFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
}

export function clearStatusFilterNew() {
    clearStatusFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('status');
    updateFilterChips();
    updateFilterCountBadge();
}

export function togglePriorityOption(value, event) {
    const dropdown = document.getElementById('priority-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updatePriorityFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('priority');
}

export function clearPriorityFilterNew() {
    clearPriorityFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('priority');
    updateFilterChips();
    updateFilterCountBadge();
}

export function setTypeFilter(value) {
    const filter = document.getElementById('issue-type-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('type');
    updateFilterChips();
    updateFilterCountBadge();
    closeAllFilterMenus();
}

export function clearTypeFilter() {
    setTypeFilter('');
}

export function setAssigneeFilter(value) {
    const filter = document.getElementById('assignee-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('assignee');
    updateFilterChips();
    updateFilterCountBadge();
    closeAllFilterMenus();
}

export function clearAssigneeFilter() {
    setAssigneeFilter('');
}

export function setSprintFilter(value) {
    const filter = document.getElementById('sprint-filter');
    if (filter) {
        filter.value = value;
        filterIssues();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('sprint');
    updateFilterChips();
    updateFilterCountBadge();
    closeAllFilterMenus();
}

export function clearSprintFilter() {
    setSprintFilter('');
}

export function toggleLabelOption(value, event) {
    const dropdown = document.getElementById('label-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateLabelFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('labels');
}

export function clearLabelFilterNew() {
    clearLabelFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('labels');
    updateFilterChips();
    updateFilterCountBadge();
}

export function toggleExcludeLabelOption(value, event) {
    const dropdown = document.getElementById('exclude-label-filter-dropdown');
    const hiddenCheckbox = dropdown?.querySelector(`input[value="${value}"]`);
    const newCheckbox = event?.target || document.querySelector(`#filter-menu-options input[value="${value}"]`);
    if (hiddenCheckbox && newCheckbox) {
        hiddenCheckbox.checked = newCheckbox.checked;
        updateExcludeLabelFilter();
    }
    renderFilterMenuCategories();
    showFilterCategoryOptions('exclude_labels');
}

export function clearExcludeLabelFilterNew() {
    clearExcludeLabelFilter();
    renderFilterMenuCategories();
    showFilterCategoryOptions('exclude_labels');
    updateFilterChips();
    updateFilterCountBadge();
}

export function setSort(value) {
    const sortSelect = document.getElementById('sort-by-select');
    if (sortSelect) {
        sortSelect.value = value;
        loadIssues();
    }
    closeAllFilterMenus();
}

export function setGroupBy(value) {
    const groupSelect = document.getElementById('group-by-select');
    if (groupSelect) {
        groupSelect.value = value;
        updateGroupBy();
    }
    closeAllFilterMenus();
}

export function clearAllFilters() {
    setCurrentProject(null);
    clearStatusFilter();
    clearPriorityFilter();

    const typeFilter = document.getElementById('issue-type-filter');
    if (typeFilter) typeFilter.value = '';

    const assigneeFilter = document.getElementById('assignee-filter');
    if (assigneeFilter) assigneeFilter.value = '';

    const sprintFilter = document.getElementById('sprint-filter');
    if (sprintFilter) sprintFilter.value = '';

    const searchInput = document.getElementById('issue-search');
    if (searchInput) searchInput.value = '';

    clearLabelFilter();
    clearExcludeLabelFilter();
    filterIssues();
    updateFilterChips();
    updateFilterCountBadge();
}

// ========================================
// Event Delegation Actions
// ========================================

registerActions({
    'update-label-filter': () => updateLabelFilter(),
    'clear-label-filter': () => clearLabelFilter(),
    'update-exclude-label-filter': () => updateExcludeLabelFilter(),
    'clear-exclude-label-filter': () => clearExcludeLabelFilter(),
    'show-filter-category': (_event, dataset) => {
        showFilterCategoryOptions(dataset.category);
        // CHT-1161: mobile shows one pane at a time — entering a category
        // switches the dropdown to the options pane
        document.getElementById('filter-menu-dropdown')?.classList.add('show-options');
        // CHT-1212: pane switch — move focus into the newly shown options
        // pane so keyboard/screen-reader users don't lose their place
        document.querySelector('#filter-menu-options .filter-options-back')?.focus();
    },
    'filter-menu-back': () => {
        showFilterCategories();
        // CHT-1212: pane switch — return focus to the category list
        const container = document.getElementById('filter-menu-categories');
        const target = container?.querySelector('.filter-menu-category.active') || container?.querySelector('.filter-menu-category');
        target?.focus();
    },
    'set-project-filter': (_event, dataset) => setProjectFilter(dataset.value),
    'clear-project-filter': () => clearProjectFilter(),
    'clear-status-filter-new': () => clearStatusFilterNew(),
    'set-status-preset': (_event, dataset) => setStatusPreset(dataset.value),
    'show-all-statuses': () => clearStatusFilter(),
    'toggle-status-option': (event, dataset) => toggleStatusOption(dataset.filterValue, event),
    'clear-priority-filter-new': () => clearPriorityFilterNew(),
    'toggle-priority-option': (event, dataset) => togglePriorityOption(dataset.filterValue, event),
    'set-type-filter': (_event, dataset) => setTypeFilter(dataset.value),
    'clear-type-filter': () => clearTypeFilter(),
    'set-assignee-filter': (_event, dataset) => setAssigneeFilter(dataset.value),
    'clear-assignee-filter': () => clearAssigneeFilter(),
    'set-sprint-filter': (_event, dataset) => setSprintFilter(dataset.value),
    'clear-sprint-filter': () => clearSprintFilter(),
    'clear-label-filter-new': () => clearLabelFilterNew(),
    'toggle-label-option': (event, dataset) => toggleLabelOption(dataset.filterValue, event),
    'clear-exclude-label-filter-new': () => clearExcludeLabelFilterNew(),
    'toggle-exclude-label-option': (event, dataset) => toggleExcludeLabelOption(dataset.filterValue, event),
    'set-sort': (_event, dataset) => setSort(dataset.value),
    'set-group-by': (_event, dataset) => setGroupBy(dataset.value),
    'clear-all-filters': () => clearAllFilters(),
    'retry-load-issues': () => loadIssues(),
});
