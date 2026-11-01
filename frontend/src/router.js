/**
 * Router module - View routing and navigation (CHT-782)
 *
 * Extracted from app.js to decouple routing logic from view implementations.
 * Uses a registration pattern so the router has zero knowledge of specific views.
 */

import { getCurrentView, setCurrentView } from './state.js';
import { getProjectFromUrl } from './url-helpers.js';

// View handler registry: { viewName: loadFunction }
const viewHandlers = {};

// Scroll position cache: { url: scrollY }
const scrollPositions = new Map();

// Configuration callbacks
let onBeforeNavigate = null;
let onDetailRoute = null;
let onDetailPopstate = null;
let onRestoreProject = null;
let onIssueNavigate = null;
let onEpicNavigate = null;
let onBeforeScrollRestore = null;
let initialized = false;

/**
 * Reset all router state. Used by tests for isolation.
 */
export function resetRouter() {
    for (const key of Object.keys(viewHandlers)) {
        delete viewHandlers[key];
    }
    scrollPositions.clear();
    onBeforeNavigate = null;
    onDetailRoute = null;
    onDetailPopstate = null;
    onRestoreProject = null;
    onIssueNavigate = null;
    onEpicNavigate = null;
    onBeforeScrollRestore = null;
    initialized = false;
}

/**
 * Register view load handlers for the navigateTo switch.
 * @param {Object<string, Function>} handlers - Map of view name to load function
 */
export function registerViews(handlers) {
    Object.assign(viewHandlers, handlers);
}

/**
 * Configure router callbacks for detail routes, cleanup, etc.
 * @param {Object} opts
 * @param {Function} [opts.beforeNavigate] - Called before each navigation (cleanup)
 * @param {Function} [opts.detailRoute] - (parts) => bool, handles detail URL routes
 * @param {Function} [opts.detailPopstate] - (state) => bool, handles detail popstate
 * @param {Function} [opts.restoreProject] - Restores project selection from URL
 * @param {Function} [opts.issueNavigate] - (identifier) => void, navigates to issue
 * @param {Function} [opts.beforeScrollRestore] - Called just before Back
 *   restores a scroll position, to finish painting anything still queued
 *   so the position isn't clamped by a half-painted page (CHT-1897)
 */
export function configureRouter({ beforeNavigate, detailRoute, detailPopstate, restoreProject, issueNavigate, epicNavigate, beforeScrollRestore } = {}) {
    if (beforeNavigate) onBeforeNavigate = beforeNavigate;
    if (detailRoute) onDetailRoute = detailRoute;
    if (detailPopstate) onDetailPopstate = detailPopstate;
    if (restoreProject) onRestoreProject = restoreProject;
    if (issueNavigate) onIssueNavigate = issueNavigate;
    if (epicNavigate) onEpicNavigate = epicNavigate;
    if (beforeScrollRestore) onBeforeScrollRestore = beforeScrollRestore;
}

/**
 * Returns the list of valid view names (derived from registered handlers).
 */
export function getValidViews() {
    return Object.keys(viewHandlers);
}

// Views that read getCurrentProject()/getCurrentView() to scope their data
// and so should round-trip ?project= in the URL (CHT-1211 item 5). Hand-
// maintained rather than derived from the DOM's `${view}-project-filter`
// elements because the ids aren't consistently named (`project-filter`,
// `sprint-project-filter`, `doc-project-filter`, ...).
const viewsWithProject = ['issues', 'query', 'board', 'sprints', 'epics', 'documents', 'rituals', 'approvals', 'my-issues'];

// The sidebar section each detail route belongs to, keyed by the first URL
// segment (CHT-1752). Used only when a detail page is the first page loaded:
// in-app navigation keeps the section the user came from highlighted.
const detailRouteSection = {
    issue: 'issues',
    issues: 'issues',
    epic: 'epics',
    sprint: 'sprints',
    document: 'documents',
    projects: 'projects',
    people: 'people',
};

/**
 * Mark the sidebar nav item for `view` active and clear the others.
 */
export function setActiveNav(view) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });
}

/**
 * Navigate to a view by name.
 * Updates URL, highlights nav item, hides/shows view containers, calls load handler.
 *
 * The view swaps synchronously. `options.transition: true` swaps it
 * through a View Transition (a 120 ms crossfade) instead, whose callback
 * runs after this call returns. It is off by default: the crossfade and
 * its snapshot held every view switch, Back included, past VISION.md's
 * 100 ms bar (CHT-1898, about 80 ms of a 100 ms Back), and a caller that
 * focuses something in the new view right away needs it shown first
 * (CHT-1873).
 */
export function navigateTo(view, pushHistory = true, { transition = false } = {}) {
    // Save scroll position of the current page before navigating away
    if (pushHistory) {
        saveScrollPosition();
    }

    setCurrentView(view);

    // Update URL (preserve project param across views)
    if (pushHistory) {
        let url;
        const projectId = getProjectFromUrl();

        if (view === 'my-issues') {
            // my-issues (Dashboard) is served at '/' — still round-trip
            // ?project= for it like the other project-scoped views (CHT-1211)
            url = (projectId) ? `/?project=${projectId}` : '/';
        } else if (view === 'issues' && window.location.search) {
            // Preserve existing query params when navigating to issues
            url = `/issues${window.location.search}`;
        } else if (viewsWithProject.includes(view) && projectId) {
            // Include project param for views that use project filtering
            url = `/${view}?project=${projectId}`;
        } else {
            url = `/${view}`;
        }
        history.pushState({ view }, '', url);
    }

    setActiveNav(view);

    // Run cleanup callbacks
    if (onBeforeNavigate) onBeforeNavigate();

    const switchView = () => {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

        // Show selected view
        const viewEl = document.getElementById(`${view}-view`);
        if (viewEl) {
            viewEl.classList.remove('hidden');
        }
    };

    // Use View Transitions API for smooth crossfade (progressive enhancement)
    if (transition && document.startViewTransition) {
        document.startViewTransition(switchView);
    } else {
        switchView();
    }

    // Load view data
    const handler = viewHandlers[view];
    if (handler) handler();

    // Scroll to top on forward navigation; popstate restores saved position
    if (pushHistory) {
        window.scrollTo(0, 0);
    }
}

/**
 * Boot (CHT-1971): before the team's data loads, show the shell of the
 * view the address routes to, and leave no view current. The page HTML
 * shows the Dashboard, and `currentView` starts as 'my-issues', so a
 * reload of /issues used to show the Dashboard until the team loaded and
 * run the Dashboard's project subscriber, three requests for a view
 * nobody asked for. With no view current, no view's project subscriber
 * runs while the team loads; handleRoute() then loads the routed one.
 */
export function primeRoute() {
    setCurrentView(null);
    const parts = window.location.pathname.split('/').filter(Boolean);
    const routeAliases = { 'gate-approvals': 'approvals' };
    const first = parts.length === 0 ? 'my-issues' : (routeAliases[parts[0]] || parts[0]);
    const isStandard = parts.length <= 1 && getValidViews().includes(first);
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    if (isStandard) {
        document.getElementById(`${first}-view`)?.classList.remove('hidden');
        setActiveNav(first);
    } else {
        // A detail route paints its own view once its row loads; until
        // then, no view rather than the wrong one.
        setActiveNav(detailRouteSection[parts[0]] || null);
    }
}

/**
 * Route based on the current URL path.
 * Handles detail routes (/issue/:id, /document/:id, etc.) and standard views.
 */
export function handleRoute() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    // Restore project selection from URL
    if (onRestoreProject) onRestoreProject();

    // primeRoute() left no view current while the team loaded. Restore
    // the old default before routing: a detail route keeps it, so its
    // Back still falls back to the Dashboard (CHT-1971).
    if (!getCurrentView()) setCurrentView('my-issues');

    let view = 'my-issues';
    if (parts.length === 0 || parts[0] === '') {
        navigateTo('my-issues', false);
    } else if (onDetailRoute && onDetailRoute(parts)) {
        // Detail route handled. The page HTML marks Dashboard active, so on a
        // direct load or reload point the sidebar at the page's own section.
        const section = detailRouteSection[parts[0]];
        if (section) setActiveNav(section);
        return;
    } else {
        // Standard view routing
        view = parts[0];
        // Backward-compat aliases for renamed routes
        const routeAliases = { 'gate-approvals': 'approvals' };
        if (routeAliases[view]) view = routeAliases[view];
        const validViews = getValidViews();
        if (validViews.includes(view)) {
            navigateTo(view, false);
        } else {
            view = 'my-issues';
            navigateTo('my-issues', false);
        }
    }

    // Ensure history state is set for this entry (handles initial page load)
    if (!history.state?.view) {
        history.replaceState({ view }, '', window.location.href);
    }
}

/**
 * Record the current URL's scroll offset so it can be restored on Back
 * (CHT-1211). Every detail-view entry point (viewIssue/viewEpic/viewSprint/
 * viewDocument) calls this before replacing the page with detail content.
 */
export function saveScrollPosition() {
    scrollPositions.set(window.location.href, window.scrollY);
}

/**
 * Navigate to an issue by its identifier (e.g., "CHT-123").
 */
export function navigateToIssueByIdentifier(identifier) {
    saveScrollPosition();
    history.pushState({ view: 'issue', identifier }, '', `/issue/${identifier}`);
    if (onIssueNavigate) onIssueNavigate(identifier);
}

/**
 * Navigate to an epic by its identifier (e.g., "CHT-123").
 */
export function navigateToEpicByIdentifier(identifier) {
    saveScrollPosition();
    history.pushState({ view: 'epic', identifier }, '', `/epic/${identifier}`);
    if (onEpicNavigate) onEpicNavigate(identifier);
}

/**
 * Restore saved scroll position for the current URL after a brief delay
 * to allow the DOM to render.
 */
function restoreScrollPosition() {
    const savedY = scrollPositions.get(window.location.href);
    if (savedY !== undefined) {
        requestAnimationFrame(() => {
            if (onBeforeScrollRestore) onBeforeScrollRestore();
            window.scrollTo(0, savedY);
        });
    }
}

/**
 * Initialize the router: sets up the popstate listener for browser back/forward.
 * Call this once during app startup.
 */
export function initRouter() {
    if (initialized) return;
    initialized = true;
    window.addEventListener('popstate', (e) => {

        // Try detail popstate handler first (issues, documents, sprints)
        if (e.state && onDetailPopstate && onDetailPopstate(e.state)) {
            restoreScrollPosition();
            return;
        }
        // Standard view navigation
        if (e.state?.view) {
            navigateTo(e.state.view, false);
        } else {
            handleRoute();
        }
        restoreScrollPosition();
    });
}
