/**
 * URL state management helpers
 *
 * Provides functions to read/write URL parameters for persistent state
 * (e.g., project selection that survives page reloads)
 */

import { getSavedProjectId } from './projects.js';

/**
 * Get project ID from URL query param, falling back to localStorage
 * @returns {string|null} Project ID or null if not found
 */
export function getProjectFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const urlProject = params.get('project');
    if (urlProject) return urlProject;
    return getSavedProjectId();
}

/**
 * Update URL with project param, preserving other query params
 * Uses replaceState to avoid polluting browser history
 * @param {string|null} projectId - Project ID to set, or null/empty to remove
 */
export function updateUrlWithProject(projectId) {
    const params = new URLSearchParams(window.location.search);
    if (projectId) {
        params.set('project', projectId);
    } else {
        params.delete('project');
    }
    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    history.replaceState(history.state, '', newUrl);
}
