/**
 * WebSocket module - Real-time updates (CHT-785, CHT-1038, CHT-1039)
 *
 * Extracted from app.js to decouple WebSocket connection management
 * and message handling from the main application module.
 *
 * CHT-1038: Exponential backoff with jitter, JSON.parse safety
 * CHT-1039: Pub/sub event registry replacing monolithic handler
 */

import { api } from './api.js';
import { getWebsocket, setWebsocket, getCurrentTeam } from './state.js';
import { showToast } from './ui.js';

let wsFailCount = 0;
let reconnectTimer = null;

// Connection generation (CHT-1224 PR #211 review finding 1): incremented on
// every connectWebSocket() call so a superseded socket's late events can be
// recognized and ignored. wsFailCount is scoped to the current generation's
// outage — a deliberate fresh connect (team switch, initial load) resets it,
// while the internal reconnect loop preserves it for backoff/toast state.
let wsGeneration = 0;

// Pub/sub event registry: Map<string, Set<Function>>
// Keys are "entity" or "entity:type" (e.g., "issue", "issue:created")
const subscribers = new Map();

/**
 * Show/hide the persistent WS-outage badge (CHT-1224).
 *
 * The 'disconnected'/'reconnected' toasts only bracket an outage with two
 * transient 3s messages — a user who glances away mid-toast has no ongoing
 * way to tell the app is running stale/offline for however long the
 * reconnect backoff (up to 30s) takes. This badge stays visible for the
 * whole outage instead of auto-dismissing.
 */
function updateWsStatusIndicator() {
    const badge = document.getElementById('ws-status-badge');
    if (!badge) return;
    badge.classList.toggle('hidden', wsFailCount === 0);
}

/**
 * Subscribe to WebSocket events.
 * @param {string} pattern - Event pattern: "entity" (all types) or "entity:type" (specific type)
 * @param {Function} handler - Called with (data, { type, entity }) on matching events
 * @returns {Function} Unsubscribe function
 */
export function subscribe(pattern, handler) {
    if (!subscribers.has(pattern)) {
        subscribers.set(pattern, new Set());
    }
    subscribers.get(pattern).add(handler);
    return () => subscribers.get(pattern)?.delete(handler);
}

/**
 * Calculate reconnection delay with exponential backoff and jitter (CHT-1038).
 * @param {number} failCount - Number of consecutive failures
 * @returns {number} Delay in milliseconds
 */
export function getReconnectDelay(failCount) {
    const base = Math.min(1000 * Math.pow(2, failCount), 30000);
    // Add ±25% jitter to prevent thundering herd
    const jitter = base * 0.25 * (Math.random() * 2 - 1);
    return Math.max(500, Math.round(base + jitter));
}

/**
 * Connect to the WebSocket for real-time updates.
 * Handles reconnection with exponential backoff on disconnect (CHT-1038).
 *
 * @param {string} teamId
 * @param {object} [options]
 * @param {boolean} [options.isReconnect=false] - true only when called from
 *   the internal reconnect loop, so the outage state (wsFailCount) carries
 *   across attempts. A deliberate fresh connect (team switch, initial load)
 *   starts a clean slate instead.
 */
export function connectWebSocket(teamId, { isReconnect = false } = {}) {
    // Clear any pending reconnect timer
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    // Close existing connection. Detach its handlers first (CHT-1224 PR #211
    // review finding 1): in a real browser close() fires the socket's onclose
    // asynchronously, so an ordinary team switch used to run the OLD
    // connection's disconnect branch — flashing the "disconnected" toast and
    // sticking the Offline badge while the new team's connection was already
    // opening.
    const existing = getWebsocket();
    if (existing) {
        existing.onopen = null;
        existing.onmessage = null;
        existing.onclose = null;
        existing.onerror = null;
        existing.close();
        setWebsocket(null);
    }

    // Fresh connect = new outage scope: clear any leftover fail state from
    // the previous connection generation (e.g. switching teams mid-outage).
    if (!isReconnect && wsFailCount > 0) {
        wsFailCount = 0;
        updateWsStatusIndicator();
    }

    const token = api.getToken();
    if (!token) return;

    const generation = ++wsGeneration;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}&team_id=${encodeURIComponent(teamId)}`;

    try {
        const ws = new WebSocket(wsUrl);
        setWebsocket(ws);

        ws.onopen = () => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            console.log('WebSocket connected');
            if (wsFailCount > 0) {
                showToast('Live updates reconnected', 'success');
            }
            wsFailCount = 0;
            updateWsStatusIndicator();
        };

        ws.onmessage = (event) => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            // CHT-1038: Safe JSON parsing
            let message;
            try {
                message = JSON.parse(event.data);
            } catch (e) {
                console.error('WebSocket: malformed message', e);
                return;
            }
            dispatch(message);
        };

        ws.onclose = () => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            console.log('WebSocket disconnected');
            wsFailCount++;
            if (wsFailCount === 1) {
                showToast('Live updates disconnected. Reconnecting...', 'warning');
            }
            updateWsStatusIndicator();
            // CHT-1038: Exponential backoff with jitter
            const delay = getReconnectDelay(wsFailCount - 1);
            reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                if (getCurrentTeam() && getCurrentTeam().id === teamId) {
                    connectWebSocket(teamId, { isReconnect: true });
                }
            }, delay);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    } catch (e) {
        console.error('Failed to connect WebSocket:', e);
    }
}

/**
 * Dispatch a WebSocket message to subscribers (CHT-1039).
 * Notifies both specific ("entity:type") and wildcard ("entity") subscribers.
 */
export function dispatch(message) {
    const { type, entity, data } = message;
    if (!type || !entity) {
        console.warn('WebSocket: ignoring message with missing type/entity', message);
        return;
    }
    const context = { type, entity };

    // Notify specific subscribers (e.g., "issue:created")
    const specific = subscribers.get(`${entity}:${type}`);
    if (specific) {
        for (const handler of specific) {
            try {
                handler(data, context);
            } catch (e) {
                console.error(`WebSocket handler error (${entity}:${type}):`, e);
            }
        }
    }

    // Notify wildcard subscribers (e.g., "issue")
    const wildcard = subscribers.get(entity);
    if (wildcard) {
        for (const handler of wildcard) {
            try {
                handler(data, context);
            } catch (e) {
                console.error(`WebSocket handler error (${entity}):`, e);
            }
        }
    }

    // Notify global subscribers ("*")
    const global = subscribers.get('*');
    if (global) {
        for (const handler of global) {
            try {
                handler(data, context);
            } catch (e) {
                console.error('WebSocket handler error (*):', e);
            }
        }
    }
}

/**
 * Reset WebSocket state. Used for testing.
 */
export function resetWsState() {
    wsFailCount = 0;
    updateWsStatusIndicator();
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    subscribers.clear();
    const existing = getWebsocket();
    if (existing) {
        existing.close();
        setWebsocket(null);
    }
}
