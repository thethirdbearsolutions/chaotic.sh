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

// Pub/sub event registry: Map<string, Set<Function>>
// Keys are "entity" or "entity:type" (e.g., "issue", "issue:created")
const subscribers = new Map();

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
 */
export function connectWebSocket(teamId) {
    // Clear any pending reconnect timer
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    // Close existing connection
    const existing = getWebsocket();
    if (existing) {
        existing.close();
        setWebsocket(null);
    }

    const token = api.getToken();
    if (!token) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws?token=${encodeURIComponent(token)}&team_id=${encodeURIComponent(teamId)}`;

    try {
        const ws = new WebSocket(wsUrl);
        setWebsocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
            if (wsFailCount > 0) {
                showToast('Live updates reconnected', 'success');
            }
            wsFailCount = 0;
        };

        ws.onmessage = (event) => {
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
            console.log('WebSocket disconnected');
            wsFailCount++;
            if (wsFailCount === 1) {
                showToast('Live updates disconnected. Reconnecting...', 'warning');
            }
            // CHT-1038: Exponential backoff with jitter
            const delay = getReconnectDelay(wsFailCount - 1);
            reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                if (getCurrentTeam() && getCurrentTeam().id === teamId) {
                    connectWebSocket(teamId);
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
