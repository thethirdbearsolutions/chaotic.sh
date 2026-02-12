/**
 * Client-side filtering utilities for issues
 *
 * This module provides functions to filter issues based on various criteria.
 * Extracted from app.js for better testability and maintainability.
 */

/**
 * Filter issues by labels
 * @param {Array} issues - Array of issues to filter
 * @param {Array} selectedLabelIds - Array of label IDs to filter by
 * @returns {Array} Filtered issues
 */
export function filterByLabels(issues, selectedLabelIds) {
    if (!selectedLabelIds || selectedLabelIds.length === 0) {
        return issues;
    }

    return issues.filter(issue => {
        if (!issue.labels || issue.labels.length === 0) return false;
        // Issue must have at least one of the selected labels
        return issue.labels.some(label => selectedLabelIds.includes(label.id));
    });
}

/**
 * Apply client-side filters to a list of issues
 *
 * @param {Array} issuesList - Array of issues to filter
 * @param {Object} filters - Filter criteria
 * @param {Array} filters.statuses - Array of status values to filter by
 * @param {Array} filters.priorities - Array of priority values to filter by
 * @param {string} filters.assigneeFilter - Assignee filter ('me', 'unassigned', or user ID)
 * @param {string} filters.issueTypeFilter - Issue type to filter by
 * @param {string} filters.sprintFilter - Sprint filter ('no_sprint', 'current', or sprint ID)
 * @param {string} filters.projectId - Project ID (required for 'current' sprint filter)
 * @param {Array} filters.selectedLabels - Array of label IDs to filter by
 * @param {Object} dependencies - External dependencies
 * @param {Object} dependencies.currentUser - Current user object (required for 'me' assignee filter)
 * @param {Function} dependencies.getSprints - Function to fetch sprints (async)
 * @returns {Promise<Array>} Filtered issues
 * @throws {Error} If required dependencies are missing or API calls fail
 */
export async function applyClientSideFilters(issuesList, filters, dependencies = {}) {
    // Validate inputs
    if (!Array.isArray(issuesList)) {
        console.error('applyClientSideFilters: issuesList is not an array', issuesList);
        return [];
    }

    const {
        statuses,
        priorities,
        assigneeFilter,
        issueTypeFilter,
        sprintFilter,
        projectId,
        selectedLabels
    } = filters;

    const { currentUser, getSprints } = dependencies;

    let filtered = issuesList;

    // Filter by status
    if (statuses && statuses.length > 0) {
        filtered = filtered.filter(issue => statuses.includes(issue.status));
    }

    // Filter by priority
    if (priorities && priorities.length > 0) {
        filtered = filtered.filter(issue => priorities.includes(issue.priority));
    }

    // Filter by assignee
    if (assigneeFilter) {
        if (assigneeFilter === 'me') {
            if (!currentUser || !currentUser.id) {
                throw new Error('Current user information is not available. Please refresh the page.');
            }
            filtered = filtered.filter(issue => issue.assignee_id === currentUser.id);
        } else if (assigneeFilter === 'unassigned') {
            filtered = filtered.filter(issue => !issue.assignee_id);
        } else {
            filtered = filtered.filter(issue => issue.assignee_id === assigneeFilter);
        }
    }

    // Filter by issue type
    if (issueTypeFilter) {
        filtered = filtered.filter(issue => issue.issue_type === issueTypeFilter);
    }

    // Filter by sprint - resolve sprint data before filtering
    if (sprintFilter) {
        if (sprintFilter === 'no_sprint') {
            filtered = filtered.filter(issue => !issue.sprint_id);
        } else if (sprintFilter === 'current') {
            // Find the current (active) sprint for this project
            if (!projectId) {
                throw new Error('Project must be selected to filter by current sprint.');
            }

            if (!getSprints || typeof getSprints !== 'function') {
                throw new Error('getSprints function is required for current sprint filter.');
            }

            try {
                const sprints = await getSprints(projectId);
                const currentSprint = sprints.find(s => s.status === 'active');
                if (currentSprint) {
                    filtered = filtered.filter(issue => issue.sprint_id === currentSprint.id);
                } else {
                    // No active sprint found - show empty results with a message
                    filtered = [];
                }
            } catch (e) {
                console.error('Failed to resolve current sprint:', e);
                throw new Error(`Failed to load sprint data: ${e.message}`, { cause: e });
            }
        } else {
            filtered = filtered.filter(issue => issue.sprint_id === sprintFilter);
        }
    }

    // Filter by labels - use shared function
    filtered = filterByLabels(filtered, selectedLabels);

    return filtered;
}
