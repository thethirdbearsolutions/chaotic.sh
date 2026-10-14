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
import { getToken as getStoredToken } from './storage.js';

let wsFailCount = 0;
// True once the server closed the socket for a credential reason
// (4001/4003, CHT-1603) and the client gave up reconnecting.
let wsStopped = false;
let reconnectTimer = null;
// Pending "the connection is up" bookkeeping for the current socket
// (CHT-1615): see WS_OPEN_SETTLE_MS.
let settleTimer = null;

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
    // CHT-1603: after the server refused the credential (4003, or a 4001
    // that did not sign this tab out) nothing reconnects, so the badge
    // says live updates have stopped rather than hiding.
    badge.classList.toggle('hidden', wsFailCount === 0 && !wsStopped);
    badge.textContent = wsStopped ? 'Stopped' : 'Offline';
    badge.title = wsStopped
        ? 'Live updates stopped — reload to try again'
        : 'Live updates disconnected — reconnecting';
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
 * How long a socket must stay open before the client counts it as up
 * (CHT-1615). The server refuses a handshake by accepting it and closing
 * it at once with the code (4001 / 4003 / 4011), since a refusal before
 * accept reaches a browser only as 1006. So onopen alone does not mean
 * the credential was good: the outage state (fail count, badge, the
 * "reconnected" toast and resync) is cleared only once the socket has
 * stayed open this long, or a message has arrived. Without it a 4011
 * refusal would reset the backoff on every attempt.
 */
export const WS_OPEN_SETTLE_MS = 1000;

function clearSettleTimer() {
    if (settleTimer) {
        clearTimeout(settleTimer);
        settleTimer = null;
    }
}

/** The subprotocol the server selects (CHT-1603). */
export const WS_SUBPROTOCOL = 'chaotic';
/** Close codes /ws sends when a credential stops being good (CHT-1603). */
export const WS_CLOSE_UNAUTHENTICATED = 4001;
export const WS_CLOSE_FORBIDDEN = 4003;
const WS_BEARER_PREFIX = 'chaotic.bearer.';

/**
 * Subprotocols to offer: 'chaotic', and the credential as a
 * 'chaotic.bearer.<token>' entry (CHT-1603).
 * @param {string} token
 * @returns {string[]}
 */
export function wsProtocols(token) {
    return [WS_SUBPROTOCOL, WS_BEARER_PREFIX + token];
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
    clearSettleTimer();

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
    if (!isReconnect && (wsFailCount > 0 || wsStopped)) {
        wsFailCount = 0;
        wsStopped = false;
        updateWsStatusIndicator();
    }

    const token = api.getToken();
    if (!token) return;

    const generation = ++wsGeneration;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // CHT-1603: the credential travels in the Sec-WebSocket-Protocol header
    // (the one header a browser WebSocket can set), never in the URL, which
    // reaches access and proxy logs. The server selects 'chaotic' and never
    // echoes the bearer entry. Read fresh on every (re)connect.
    const wsUrl = `${protocol}//${window.location.host}/ws?team_id=${encodeURIComponent(teamId)}`;

    try {
        const ws = new WebSocket(wsUrl, wsProtocols(token));
        setWebsocket(ws);

        // The socket is up: end the outage (CHT-1615: only once it has
        // stayed open WS_OPEN_SETTLE_MS, or a message arrived).
        let settled = false;
        const settle = () => {
            if (settled || generation !== wsGeneration) return; // done, or superseded
            settled = true;
            clearSettleTimer();
            // CHT-1225 item 3: wsFailCount > 0 here means this open followed
            // a genuine outage (the reconnect loop preserves it across
            // attempts) rather than a deliberate fresh connect/team switch
            // (connectWebSocket() resets it to 0 up front for those, before
            // this socket is even created) -- so this is exactly the signal
            // ws-handlers.js needs to tell "resync" apart from "new view".
            const wasReconnect = wsFailCount > 0;
            if (wasReconnect) {
                showToast('Live updates reconnected', 'success');
            }
            wsFailCount = 0;
            updateWsStatusIndicator();
            if (wasReconnect) {
                // Synthetic event (not a server message) -- mutations
                // broadcast during the outage were otherwise silently
                // dropped forever. dispatch() (not a direct import) avoids
                // a circular ws.js <-> ws-handlers.js dependency.
                dispatch({ type: 'reconnected', entity: 'connection', data: {} });
            }
        };

        ws.onopen = () => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            console.log('WebSocket connected');
            clearSettleTimer();
            settleTimer = setTimeout(settle, WS_OPEN_SETTLE_MS);
        };

        ws.onmessage = (event) => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            // A message means the server accepted the credential.
            settle();
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

        ws.onclose = (event) => {
            if (generation !== wsGeneration) return; // superseded connection — ignore
            console.log('WebSocket disconnected');
            // Closed before it settled (a refused handshake, CHT-1615):
            // the outage goes on, and the backoff keeps growing.
            clearSettleTimer();
            // CHT-1603 (PR #352 review, finding 2): the server closed it
            // because the credential stopped being good. Retrying cannot
            // help: 4001 means sign in again, 4003 means no access to this
            // team any more. ws-handlers.js acts on the synthetic event.
            const code = event?.code;
            if (code === WS_CLOSE_UNAUTHENTICATED || code === WS_CLOSE_FORBIDDEN) {
                setWebsocket(null);
                wsFailCount = 0;
                // A 4001 signs out only if storage still holds the token
                // this socket was opened with: if another tab has signed in
                // since, clearing it would sign that newer session out too
                // (PR #352 re-review). This tab just stops.
                const signOut = code === WS_CLOSE_UNAUTHENTICATED && getStoredToken() === token;
                wsStopped = !signOut;
                updateWsStatusIndicator();
                let type = 'forbidden';
                if (code === WS_CLOSE_UNAUTHENTICATED) type = signOut ? 'unauthorized' : 'superseded';
                dispatch({ type, entity: 'connection', data: { code, teamId } });
                return;
            }
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
    wsStopped = false;
    updateWsStatusIndicator();
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    clearSettleTimer();
    subscribers.clear();
    const existing = getWebsocket();
    if (existing) {
        existing.close();
        setWebsocket(null);
    }
}
