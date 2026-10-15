package sh.chaotic.sync

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import sh.chaotic.auth.SessionManager
import java.util.concurrent.ConcurrentHashMap

/**
 * Whose cache this is, and the one gate every write to it goes through.
 *
 * The cache belongs to one person on one server ([currentOwner], null when
 * signed out), and nothing of theirs may show up for the next person. A
 * sign-out cannot simply empty the store: a sync page or an issue already
 * in flight would land after the clear, carrying the old person's rows and
 * cursor into the next session. And the cursor alone cannot catch it,
 * because it holds a team digest and no person, so a second person in the
 * same teams would never be sent `reset`.
 *
 * So the cache is fenced twice:
 *
 * - **A generation.** Work that will write starts with [begin], which
 *   returns the current generation, and writes with [write], which
 *   applies only when the generation is unchanged and the same person is
 *   still signed in. [end] (sign-out) moves the generation on under the
 *   same lock, so a write that arrives afterwards is dropped, not applied
 *   to an emptied cache.
 * - **A stored owner.** The store keeps who it belongs to, beside the
 *   cursor. [begin] claims it for the person signed in now, and a store
 *   that belongs to anyone else is emptied first. That also covers a
 *   sign-out whose [end] never ran (the process died first).
 *
 * The lock is held only around store calls, never across a network call.
 *
 * It also counts the writes to each issue the server has taken
 * ([issueWrites]), so a refresh of an issue that began before one of them
 * can tell that what it fetched is older than the cache (CHT-1668).
 */
class CacheSession(val store: CacheStore, private val currentOwner: () -> String?) {
    private val lock = Mutex()
    private var generation = 0L
    private var owner: String? = null
    private val issueWritesTaken = ConcurrentHashMap<String, Long>()

    /**
     * How many writes to [issueId] the server has taken while this process
     * ran. A refresh reads it before it fetches, and again in the [write]
     * that would save what it fetched: if it moved, a write landed in
     * between and the fetch may predate it.
     */
    fun issueWrites(issueId: String): Long = issueWritesTaken[issueId] ?: 0L
    // Never cleared, not even by [end], and keyed by the bare id across
    // people and servers, on purpose: a count only ever goes up, and all a
    // refresh reads from it is whether it moved while the refresh was out.
    // A count shared with another session's issue costs at most a fetch.

    /** The server took a write to [issueId]: call it in the [write] that records that. */
    fun issueWritten(issueId: String) {
        issueWritesTaken.merge(issueId, 1L, Long::plus)
    }

    /** The generation to [write] under, or null when nobody is signed in. Claims the store first. */
    suspend fun begin(): Long? = lock.withLock {
        val now = currentOwner() ?: return@withLock null
        if (now != owner) {
            store.claim(now)
            owner = now
            generation++
        }
        generation
    }

    /**
     * Run [block] on the store, unless the session changed since [ticket]
     * was handed out by [begin]: then nothing is written and the result is
     * null.
     */
    suspend fun <T : Any> write(ticket: Long, block: suspend CacheStore.() -> T): T? = lock.withLock {
        val current = owner
        if (ticket != generation || current == null || currentOwner() != current) null else store.block()
    }

    /**
     * Who [ticket] was handed out to, while it is still good: the owner key
     * a request made under it may go out as. Null once the session changed.
     */
    suspend fun ownerOf(ticket: Long): String? = lock.withLock {
        val current = owner
        if (ticket != generation || current == null || currentOwner() != current) null else current
    }

    /** Sign-out: empty the cache and refuse every write begun before it. */
    suspend fun end() = lock.withLock {
        generation++
        owner = null
        store.clearAll()
    }

    companion object {
        /** The owner key of [personId] on the server at [baseUrl]: an id is unique only on its own server. */
        fun ownerKey(baseUrl: String, personId: String) = SessionManager.ownerKey(baseUrl, personId)
    }
}
