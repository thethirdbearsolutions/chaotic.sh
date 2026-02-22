/**
 * Centralized state management module (CHT-279)
 * Simple reactive store with getState/setState/subscribe pattern
 */

// Initial state
const initialState = {
    // User & auth
    currentUser: null,

    // Navigation
    currentView: 'my-issues',

    // Issues (project view)
    issues: [],

    // Team members / assignees
    assignees: [],

    // Labels
    labels: [],

    // UI state
    activeFilterCategory: 'status',
    selectedIssueIndex: -1,

    // Pending gates for ritual completion
    pendingGates: [],

    // Timers (not reactive)
    searchDebounceTimer: null,

    // WebSocket connection (not reactive)
    websocket: null,

    // Team
    currentTeam: null,

    // Issue detail view
    currentDetailIssue: null,
    currentDetailSprints: null,
};

// Current state (mutable)
let state = { ...initialState };

// Subscribers for reactive updates
const subscribers = new Set();

/**
 * Get a state value by key, or entire state if no key provided
 * @param {string} [key] - State key to retrieve
 * @returns {*} State value or entire state object (shallow copy)
 */
export function getState(key) {
    if (key === undefined) {
        return { ...state };
    }
    return state[key];
}

/**
 * Set state values
 * @param {string|Object} keyOrUpdates - State key or object with updates
 * @param {*} [value] - Value to set (if keyOrUpdates is a string)
 */
export function setState(keyOrUpdates, value) {
    if (typeof keyOrUpdates === 'string') {
        const oldValue = state[keyOrUpdates];
        state[keyOrUpdates] = value;
        notifySubscribers(keyOrUpdates, value, oldValue);
    } else if (typeof keyOrUpdates === 'object') {
        const changes = [];
        for (const [key, val] of Object.entries(keyOrUpdates)) {
            const oldValue = state[key];
            state[key] = val;
            changes.push({ key, value: val, oldValue });
        }
        changes.forEach(({ key, value, oldValue }) => {
            notifySubscribers(key, value, oldValue);
        });
    }
}

/**
 * Subscribe to state changes
 * @param {Function} listener - Callback function(key, newValue, oldValue)
 * @returns {Function} Unsubscribe function
 */
export function subscribe(listener) {
    subscribers.add(listener);
    return () => subscribers.delete(listener);
}

/**
 * Notify all subscribers of a state change
 * @param {string} key - State key that changed
 * @param {*} newValue - New value
 * @param {*} oldValue - Previous value
 */
function notifySubscribers(key, newValue, oldValue) {
    if (newValue !== oldValue) {
        subscribers.forEach(listener => {
            try {
                listener(key, newValue, oldValue);
            } catch (e) {
                console.error('State subscriber error:', e);
            }
        });
    }
}

/**
 * Reset state to initial values (useful for testing)
 */
export function resetState() {
    state = { ...initialState };
}

// Convenience getters for common state
export const getCurrentUser = () => state.currentUser;
export const setCurrentUser = (user) => setState('currentUser', user);

export const getCurrentView = () => state.currentView;
export const setCurrentView = (view) => setState('currentView', view);

export const getIssues = () => state.issues;
export const setIssues = (issues) => setState('issues', issues);

export const getAssignees = () => state.assignees;
export const setAssignees = (assignees) => setState('assignees', assignees);

export const getLabels = () => state.labels;
export const setLabels = (labels) => setState('labels', labels);

export const getActiveFilterCategory = () => state.activeFilterCategory;
export const setActiveFilterCategory = (category) => setState('activeFilterCategory', category);

export const getSelectedIssueIndex = () => state.selectedIssueIndex;
export const setSelectedIssueIndex = (index) => setState('selectedIssueIndex', index);

export const getPendingGates = () => state.pendingGates;
export const setPendingGates = (gates) => setState('pendingGates', gates);

export const getSearchDebounceTimer = () => state.searchDebounceTimer;
export const setSearchDebounceTimer = (timer) => setState('searchDebounceTimer', timer);

export const getWebsocket = () => state.websocket;
export const setWebsocket = (ws) => setState('websocket', ws);

export const getCurrentTeam = () => state.currentTeam;
export const setCurrentTeam = (team) => setState('currentTeam', team);

export const getCurrentDetailIssue = () => state.currentDetailIssue;
export const setCurrentDetailIssue = (issue) => setState('currentDetailIssue', issue);

export const getCurrentDetailSprints = () => state.currentDetailSprints;
export const setCurrentDetailSprints = (sprints) => setState('currentDetailSprints', sprints);
