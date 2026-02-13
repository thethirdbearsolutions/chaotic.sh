/**
 * Router module - View routing and navigation (CHT-782)
 *
 * Extracted from app.js to decouple routing logic from view implementations.
 * Uses a registration pattern so the router has zero knowledge of specific views.
 */

import { setCurrentView } from './state.js';
import { getProjectFromUrl } from './url-helpers.js';

// View handler registry: { viewName: loadFunction }
const viewHandlers = {};

// Configuration callbacks
let onBeforeNavigate = null;
let onDetailRoute = null;
let onDetailPopstate = null;
let onRestoreProject = null;
let onIssueNavigate = null;

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
 */
export function configureRouter({ beforeNavigate, detailRoute, detailPopstate, restoreProject, issueNavigate } = {}) {
    if (beforeNavigate) onBeforeNavigate = beforeNavigate;
    if (detailRoute) onDetailRoute = detailRoute;
    if (detailPopstate) onDetailPopstate = detailPopstate;
    if (restoreProject) onRestoreProject = restoreProject;
    if (issueNavigate) onIssueNavigate = issueNavigate;
}

/**
 * Returns the list of valid view names (derived from registered handlers).
 */
export function getValidViews() {
    return Object.keys(viewHandlers);
}

/**
 * Navigate to a view by name.
 * Updates URL, highlights nav item, hides/shows view containers, calls load handler.
 */
export function navigateTo(view, pushHistory = true) {
    setCurrentView(view);

    // Update URL (preserve project param across views)
    if (pushHistory) {
        let url;
        const projectId = getProjectFromUrl();
        const viewsWithProject = ['issues', 'board', 'sprints'];

        if (view === 'my-issues') {
            url = '/';
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

    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });

    // Run cleanup callbacks
    if (onBeforeNavigate) onBeforeNavigate();

    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    // Show selected view
    const viewEl = document.getElementById(`${view}-view`);
    if (viewEl) {
        viewEl.classList.remove('hidden');
    }

    // Load view data
    const handler = viewHandlers[view];
    if (handler) handler();
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

    let view = 'my-issues';
    if (parts.length === 0 || parts[0] === '') {
        navigateTo('my-issues', false);
    } else if (onDetailRoute && onDetailRoute(parts)) {
        return; // Detail route handled
    } else {
        // Standard view routing
        view = parts[0];
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
 * Navigate to an issue by its identifier (e.g., "CHT-123").
 */
export function navigateToIssueByIdentifier(identifier) {
    history.pushState({ view: 'issue', identifier }, '', `/issue/${identifier}`);
    if (onIssueNavigate) onIssueNavigate(identifier);
}

/**
 * Initialize the router: sets up the popstate listener for browser back/forward.
 * Call this once during app startup.
 */
export function initRouter() {
    window.addEventListener('popstate', (e) => {
        // Try detail popstate handler first (issues, documents, sprints)
        if (e.state && onDetailPopstate && onDetailPopstate(e.state)) {
            return;
        }
        // Standard view navigation
        if (e.state?.view) {
            navigateTo(e.state.view, false);
        } else {
            handleRoute();
        }
    });
}
