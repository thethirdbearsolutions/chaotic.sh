/**
 * Shared constants for status, priority, and issue type values.
 * Single source of truth — other modules should import from here. (CHT-1086)
 */

/** All statuses in display/grouping order */
export const STATUS_ORDER = ['backlog', 'todo', 'in_progress', 'in_review', 'done', 'canceled'];

/** Statuses considered "open" (not done/canceled) */
export const OPEN_STATUSES = ['backlog', 'todo', 'in_progress', 'in_review'];

/** All priorities in display/grouping order */
export const PRIORITY_ORDER = ['urgent', 'high', 'medium', 'low', 'no_priority'];

/** Priorities for dropdown selection (no_priority first as default) */
export const PRIORITY_OPTIONS = ['no_priority', 'urgent', 'high', 'medium', 'low'];

/** Board column statuses (excludes canceled) */
export const BOARD_STATUSES = ['backlog', 'todo', 'in_progress', 'in_review', 'done'];

// The Issues list rows j/k move over: every row except those inside a
// collapsed group (CHT-1932). Flat-list rows sit directly in the list.
export const ISSUE_NAV_ROWS = '#issues-list > .issue-row, #issues-list .issue-group:not(.collapsed) .issue-row';
