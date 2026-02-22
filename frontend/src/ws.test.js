/**
 * Tests for ws.js module (CHT-785, CHT-1038, CHT-1039)
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock state.js
vi.mock('./state.js', () => ({
    getIssues: vi.fn(() => []),
    setIssues: vi.fn(),
    getCurrentUser: vi.fn(() => null),
    getCurrentView: vi.fn(() => 'my-issues'),
    getWebsocket: vi.fn(() => null),
    setWebsocket: vi.fn(),
}));

// Mock ui.js
vi.mock('./ui.js', () => ({
    showToast: vi.fn(),
}));

import { getWebsocket, setWebsocket } from './state.js';
import { showToast } from './ui.js';
import { connectWebSocket, dispatch, subscribe, getReconnectDelay, resetWsState } from './ws.js';

describe('ws.js', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        resetWsState();

        // Mock window.api
        window.api = {
            getToken: vi.fn(() => 'test-token'),
        };
        window.currentTeam = { id: 'team-1' };
    });

    afterEach(() => {
        delete window.api;
        delete window.currentTeam;
    });

    describe('connectWebSocket', () => {
        let MockWebSocket;

        beforeEach(() => {
            MockWebSocket = vi.fn().mockImplementation(() => ({
                onopen: null,
                onmessage: null,
                onclose: null,
                onerror: null,
                close: vi.fn(),
            }));
            global.WebSocket = MockWebSocket;
        });

        afterEach(() => {
            delete global.WebSocket;
        });

        it('creates a WebSocket connection with correct URL', () => {
            connectWebSocket('team-1');
            expect(MockWebSocket).toHaveBeenCalledTimes(1);
            const url = MockWebSocket.mock.calls[0][0];
            expect(url).toContain('ws?token=test-token&team_id=team-1');
            expect(url).toMatch(/^wss?:\/\//);
        });

        it('stores the WebSocket via setWebsocket', () => {
            connectWebSocket('team-1');
            expect(setWebsocket).toHaveBeenCalled();
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];
            expect(ws).toBeTruthy();
        });

        it('closes existing WebSocket before creating new one', () => {
            const existingWs = { close: vi.fn() };
            getWebsocket.mockReturnValue(existingWs);

            connectWebSocket('team-1');

            expect(existingWs.close).toHaveBeenCalled();
            expect(setWebsocket).toHaveBeenCalledWith(null);
        });

        it('does nothing if no token', () => {
            window.api.getToken.mockReturnValue(null);
            connectWebSocket('team-1');
            expect(MockWebSocket).not.toHaveBeenCalled();
        });

        it('shows reconnected toast after disconnect', () => {
            connectWebSocket('team-1');
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];

            // Simulate disconnect
            ws.onclose();
            expect(showToast).toHaveBeenCalledWith('Live updates disconnected. Reconnecting...', 'warning');

            // Now connect again and simulate onopen
            vi.clearAllMocks();
            connectWebSocket('team-1');
            const ws2 = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];
            ws2.onopen();
            expect(showToast).toHaveBeenCalledWith('Live updates reconnected', 'success');
        });

        it('handles WebSocket constructor errors', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            MockWebSocket.mockImplementation(() => { throw new Error('Connection refused'); });

            expect(() => connectWebSocket('team-1')).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith('Failed to connect WebSocket:', expect.any(Error));
            consoleSpy.mockRestore();
        });

        it('parses JSON safely on message (CHT-1038)', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            connectWebSocket('team-1');
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];

            // Malformed JSON should not throw
            ws.onmessage({ data: 'not json{{{' });
            expect(consoleSpy).toHaveBeenCalledWith('WebSocket: malformed message', expect.any(SyntaxError));
            consoleSpy.mockRestore();
        });

        it('dispatches valid JSON messages', () => {
            const handler = vi.fn();
            subscribe('test', handler);

            connectWebSocket('team-1');
            const ws = setWebsocket.mock.calls[setWebsocket.mock.calls.length - 1][0];

            ws.onmessage({ data: JSON.stringify({ type: 'created', entity: 'test', data: { id: '1' } }) });
            expect(handler).toHaveBeenCalledWith({ id: '1' }, { type: 'created', entity: 'test' });
        });
    });

    describe('getReconnectDelay (CHT-1038)', () => {
        it('returns delay >= 500ms', () => {
            for (let i = 0; i < 20; i++) {
                expect(getReconnectDelay(0)).toBeGreaterThanOrEqual(500);
            }
        });

        it('increases with fail count', () => {
            // With jitter, we need to check the median range
            const delays0 = Array.from({ length: 50 }, () => getReconnectDelay(0));
            const delays3 = Array.from({ length: 50 }, () => getReconnectDelay(3));
            const avg0 = delays0.reduce((a, b) => a + b) / delays0.length;
            const avg3 = delays3.reduce((a, b) => a + b) / delays3.length;
            expect(avg3).toBeGreaterThan(avg0);
        });

        it('caps base at 30 seconds (37.5s with jitter)', () => {
            for (let i = 0; i < 20; i++) {
                const delay = getReconnectDelay(100);
                expect(delay).toBeLessThanOrEqual(37500); // 30000 + 25% jitter
            }
        });
    });

    describe('subscribe and dispatch (CHT-1039)', () => {
        it('notifies specific subscribers (entity:type)', () => {
            const handler = vi.fn();
            subscribe('issue:created', handler);

            dispatch({ type: 'created', entity: 'issue', data: { id: '1' } });
            expect(handler).toHaveBeenCalledWith({ id: '1' }, { type: 'created', entity: 'issue' });
        });

        it('notifies wildcard subscribers (entity)', () => {
            const handler = vi.fn();
            subscribe('issue', handler);

            dispatch({ type: 'updated', entity: 'issue', data: { id: '1' } });
            expect(handler).toHaveBeenCalledWith({ id: '1' }, { type: 'updated', entity: 'issue' });
        });

        it('notifies global subscribers (*)', () => {
            const handler = vi.fn();
            subscribe('*', handler);

            dispatch({ type: 'created', entity: 'project', data: { id: '1' } });
            expect(handler).toHaveBeenCalledWith({ id: '1' }, expect.objectContaining({ type: 'created', entity: 'project' }));
        });

        it('does not notify non-matching subscribers', () => {
            const handler = vi.fn();
            subscribe('issue:created', handler);

            dispatch({ type: 'updated', entity: 'issue', data: { id: '1' } });
            expect(handler).not.toHaveBeenCalled();
        });

        it('returns unsubscribe function', () => {
            const handler = vi.fn();
            const unsubscribe = subscribe('issue', handler);

            dispatch({ type: 'created', entity: 'issue', data: { id: '1' } });
            expect(handler).toHaveBeenCalledTimes(1);

            unsubscribe();
            dispatch({ type: 'updated', entity: 'issue', data: { id: '2' } });
            expect(handler).toHaveBeenCalledTimes(1); // still 1
        });

        it('handles errors in subscribers without stopping dispatch', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const badHandler = vi.fn(() => { throw new Error('oops'); });
            const goodHandler = vi.fn();

            subscribe('issue:created', badHandler);
            subscribe('issue:created', goodHandler);

            dispatch({ type: 'created', entity: 'issue', data: { id: '1' } });

            expect(badHandler).toHaveBeenCalled();
            expect(goodHandler).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('issue:created'), expect.any(Error));
            consoleSpy.mockRestore();
        });

        it('ignores messages with missing type or entity', () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const handler = vi.fn();
            subscribe('*', handler);

            dispatch({ data: { id: '1' } });
            dispatch({ type: 'created', data: { id: '2' } });
            dispatch({ entity: 'issue', data: { id: '3' } });

            expect(handler).not.toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalledTimes(3);
            consoleSpy.mockRestore();
        });

        it('notifies both specific and wildcard for same event', () => {
            const specific = vi.fn();
            const wildcard = vi.fn();
            subscribe('issue:created', specific);
            subscribe('issue', wildcard);

            dispatch({ type: 'created', entity: 'issue', data: { id: '1' } });
            expect(specific).toHaveBeenCalledTimes(1);
            expect(wildcard).toHaveBeenCalledTimes(1);
        });
    });

    describe('resetWsState', () => {
        it('closes existing websocket', () => {
            const ws = { close: vi.fn() };
            getWebsocket.mockReturnValue(ws);

            resetWsState();

            expect(ws.close).toHaveBeenCalled();
            expect(setWebsocket).toHaveBeenCalledWith(null);
        });

        it('does nothing if no websocket', () => {
            getWebsocket.mockReturnValue(null);
            vi.clearAllMocks();
            resetWsState();
            expect(setWebsocket).not.toHaveBeenCalled();
        });

        it('clears all subscribers', () => {
            const handler = vi.fn();
            subscribe('issue', handler);

            resetWsState();

            dispatch({ type: 'created', entity: 'issue', data: { id: '1' } });
            expect(handler).not.toHaveBeenCalled();
        });
    });
});
