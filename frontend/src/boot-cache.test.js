import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    readSnapshot, writeSnapshot, clearSnapshot, userIdFromToken, resetBootCache,
    SNAPSHOT_VERSION, MAX_AGE_MS, READ_TIMEOUT_MS,
} from './boot-cache.js';

// A minimal IndexedDB: one database, object stores as Maps, every request
// answered on a later task, as the real one does.
function fakeIndexedDB({ hang = false } = {}) {
    const stores = new Map();
    const later = (fn) => setTimeout(fn, 0);
    const db = {
        createObjectStore: (name) => stores.set(name, new Map()),
        transaction: (name) => {
            const tx = {};
            const store = stores.get(name);
            const op = (fn) => {
                const request = {};
                later(() => {
                    request.result = fn();
                    later(() => tx.oncomplete?.());
                });
                return request;
            };
            tx.objectStore = () => ({
                get: (key) => op(() => structuredClone(store.get(key))),
                put: (value, key) => op(() => { store.set(key, structuredClone(value)); }),
                delete: (key) => op(() => { store.delete(key); }),
            });
            return tx;
        },
    };
    return {
        open: () => {
            const request = {};
            if (!hang) {
                later(() => {
                    request.result = db;
                    if (!stores.size) request.onupgradeneeded?.();
                    request.onsuccess?.();
                });
            }
            return request;
        },
        stores,
    };
}

const token = (sub) => `x.${btoa(JSON.stringify({ sub })).replace(/=+$/, '')}.y`;

describe('boot cache (CHT-1972)', () => {
    let original;
    beforeEach(() => {
        original = globalThis.indexedDB;
        globalThis.indexedDB = fakeIndexedDB();
        resetBootCache();
    });
    afterEach(() => {
        globalThis.indexedDB = original;
        resetBootCache();
        vi.useRealTimers();
    });

    it('reads the user id from a JWT', () => {
        expect(userIdFromToken(token('u1'))).toBe('u1');
        expect(userIdFromToken('not-a-jwt')).toBeNull();
        expect(userIdFromToken(null)).toBeNull();
        expect(userIdFromToken(token(42))).toBeNull();
    });

    it('reads back what it wrote, for the same user', async () => {
        await writeSnapshot('u1', { teams: [{ id: 't1' }] });
        const snapshot = await readSnapshot('u1');
        expect(snapshot.teams).toEqual([{ id: 't1' }]);
        expect(snapshot.version).toBe(SNAPSHOT_VERSION);
    });

    it("never hands one user another's snapshot", async () => {
        await writeSnapshot('u1', { teams: [] });
        expect(await readSnapshot('u2')).toBeNull();
        expect(await readSnapshot(null)).toBeNull();
    });

    it('drops an old snapshot or another version', async () => {
        await writeSnapshot('u1', { teams: [] });
        const now = Date.now();
        vi.spyOn(Date, 'now').mockReturnValue(now + MAX_AGE_MS + 1);
        expect(await readSnapshot('u1')).toBeNull();
        Date.now.mockRestore();

        const store = globalThis.indexedDB.stores.get('snapshot');
        store.set('last', { ...store.get('last'), version: SNAPSHOT_VERSION + 1 });
        expect(await readSnapshot('u1')).toBeNull();
    });

    it('clears the snapshot (sign-out)', async () => {
        await writeSnapshot('u1', { teams: [] });
        await clearSnapshot();
        expect(await readSnapshot('u1')).toBeNull();
    });

    it('works without IndexedDB, never rejecting', async () => {
        globalThis.indexedDB = undefined;
        await expect(writeSnapshot('u1', {})).resolves.toBeUndefined();
        await expect(readSnapshot('u1')).resolves.toBeNull();
        await expect(clearSnapshot()).resolves.toBeUndefined();
    });

    it('gives up after READ_TIMEOUT_MS rather than hold the boot', async () => {
        vi.useFakeTimers();
        globalThis.indexedDB = fakeIndexedDB({ hang: true });
        const read = readSnapshot('u1');
        vi.advanceTimersByTime(READ_TIMEOUT_MS);
        await expect(read).resolves.toBeNull();
    });
});
