/**
 * Boot cache (CHT-1972): what the app showed last time, kept in IndexedDB
 * so a reload paints the routed view at once and refreshes behind it.
 *
 * Without it every load waited on about five round trips in series
 * (/auth/me and /teams, then the team's projects, labels, members and
 * agents, then the view's own request) before the first row showed.
 *
 * One record, for the last signed-in user: the user, their teams, the
 * selected team's projects, labels, members and agents, and the issue
 * store's most recent lists. It is read only for the user the stored
 * token names, ignored when older than MAX_AGE_MS or written by another
 * SNAPSHOT_VERSION, and deleted on sign-out. Everything read from it is
 * revalidated by the same requests a load without it makes.
 *
 * IndexedDB, not localStorage: a list of a thousand rows is about a
 * megabyte, near localStorage's quota, and localStorage would read it on
 * the main thread before the first paint.
 */

const DB_NAME = 'chaotic-boot-cache';
const STORE = 'snapshot';
const KEY = 'last';
// Bump when a stored shape changes (a row, a team) so an old snapshot is
// dropped rather than rendered.
export const SNAPSHOT_VERSION = 1;
export const MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000;
// A boot never waits longer than this for the cache: past it, the app
// loads from the network as it would without one.
export const READ_TIMEOUT_MS = 250;

let dbPromise = null;

function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
        let request;
        try {
            request = globalThis.indexedDB?.open(DB_NAME, 1);
        } catch (e) {
            reject(e);
            return;
        }
        if (!request) {
            reject(new Error('IndexedDB unavailable'));
            return;
        }
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => {
            const db = request.result;
            // Let a newer page's upgrade through instead of blocking it.
            db.onversionchange = () => {
                db.close();
                dbPromise = null;
            };
            resolve(db);
        };
        request.onerror = () => reject(request.error);
        request.onblocked = () => reject(new Error('IndexedDB blocked'));
    });
    // A failed open is not cached, so a later call can try again.
    dbPromise.catch(() => { dbPromise = null; });
    return dbPromise;
}

function run(mode, action) {
    return openDb().then(db => new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, mode);
        const request = action(tx.objectStore(STORE));
        tx.oncomplete = () => resolve(request?.result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
    }));
}

/**
 * The user id a JWT names (its `sub`), or null for anything else.
 * @param {string|null} token
 */
export function userIdFromToken(token) {
    try {
        const part = String(token).split('.')[1];
        if (!part) return null;
        const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
        const sub = JSON.parse(json)?.sub;
        return typeof sub === 'string' && sub ? sub : null;
    } catch {
        return null;
    }
}

/**
 * The snapshot saved for `userId`, or null: none saved, another user's,
 * too old, another version, unreadable, or slower than READ_TIMEOUT_MS.
 * Never rejects.
 * @param {string|null} userId
 */
export function readSnapshot(userId) {
    if (!userId) return Promise.resolve(null);
    const read = run('readonly', store => store.get(KEY))
        .then(snapshot => {
            if (!snapshot || snapshot.version !== SNAPSHOT_VERSION) return null;
            if (snapshot.userId !== userId) return null;
            if (!(Date.now() - snapshot.savedAt < MAX_AGE_MS)) return null;
            return snapshot;
        })
        .catch(() => null);
    const timeout = new Promise(resolve => setTimeout(() => resolve(null), READ_TIMEOUT_MS));
    return Promise.race([read, timeout]);
}

/**
 * Save `data` as the snapshot for `userId`, replacing any other. Never
 * rejects: the cache is an optimisation.
 * @param {string} userId
 * @param {object} data
 */
export function writeSnapshot(userId, data) {
    if (!userId) return Promise.resolve();
    const snapshot = { ...data, version: SNAPSHOT_VERSION, userId, savedAt: Date.now() };
    return run('readwrite', store => store.put(snapshot, KEY)).then(() => {}, () => {});
}

/** Delete the snapshot (sign-out). Never rejects. */
export function clearSnapshot() {
    return run('readwrite', store => store.delete(KEY)).then(() => {}, () => {});
}

/** Test hook: forget the open database handle. */
export function resetBootCache() {
    dbPromise = null;
}
