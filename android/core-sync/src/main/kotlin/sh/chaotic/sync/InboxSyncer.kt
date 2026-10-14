package sh.chaotic.sync

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** How a sync run ended. */
sealed interface SyncOutcome {
    /**
     * The cache is as current as the server lets it be. [retryAfterSeconds]
     * is the server's hint that syncing again sooner returns the same rows
     * (CHT-1622); [morePending] that the run stopped at its page cap with
     * more to fetch. [added] are the open entries this run brought in that
     * the cache did not have before, for the poll fallback's notifications
     * (CHT-1612); always empty for a run that started without a cursor or
     * was reset, where everything is new to the cache but not to the person.
     */
    data class Synced(
        val pages: Int,
        val retryAfterSeconds: Int? = null,
        val morePending: Boolean = false,
        val added: List<InboxEntry> = emptyList(),
    ) : SyncOutcome

    /**
     * Nobody is signed in any more: the credential was refused even after
     * the session's refresh, or the person signed out (or another signed
     * in) during the run, whose late pages were then dropped.
     */
    data object Unauthorized : SyncOutcome

    /** Nothing changed in the cache; try again later. [retryAfterMillis] is the server's Retry-After, if any. */
    data class Failed(val reason: Reason, val status: Int? = null, val retryAfterMillis: Long = 0) : SyncOutcome

    enum class Reason { UNREACHABLE, UNREADABLE, SERVER }
}

/**
 * The inbox half of the cache, kept current from GET /api/inbox/sync
 * (CHT-1607) by the contract on the server's InboxSyncResponse:
 *
 * - The cursor is opaque: stored as received, sent back as `since`.
 * - Pages are fetched while `has_more`, up to [maxPages] in one run.
 * - Entries are upserted by id, and only when at least as new as what is
 *   cached: the cursor trails the newest change by the server's safety
 *   lag, so the same entry comes again, and an older copy must not
 *   overwrite a newer one.
 * - A tombstone (any state other than open) deletes.
 * - `reset` clears the inbox before the page is applied; so does a 400
 *   `invalid_cursor`, after which the run starts over without a cursor.
 * - Anything cached for a team not in `team_ids` is dropped (a team left
 *   or deleted sends no tombstones).
 *
 * Runs are single-flight: a pull to refresh during a poll waits for it
 * rather than racing it with the same cursor. Every page is written
 * through [session], so a page that arrives after a sign-out or an
 * account switch is dropped rather than written into the next person's
 * cache (the run then ends as [SyncOutcome.Unauthorized]).
 */
class InboxSyncer(
    private val remote: ChaoticRemote,
    private val session: CacheSession,
    private val pageSize: Int = DEFAULT_PAGE_SIZE,
    private val maxPages: Int = DEFAULT_MAX_PAGES,
    private val nowMillis: () -> Long = System::currentTimeMillis,
) {
    private val mutex = Mutex()
    private val store get() = session.store
    private val synced = MutableStateFlow<Long?>(null)

    /**
     * When a run last brought the cache fully up to date (in this process):
     * the notifications use it to tell an entry that is gone from one the
     * cache has not caught up with (CHT-1612). Null before the first such
     * run, and from the moment a page clears the cache (a reset, or the
     * restart after a refused cursor) until a run completes again: while a
     * reset spans pages, the cache is missing entries that are still open.
     */
    val lastSyncedAtMillis: StateFlow<Long?> = synced.asStateFlow()

    suspend fun sync(): SyncOutcome = mutex.withLock {
        val ticket = session.begin() ?: return@withLock SyncOutcome.Unauthorized
        syncLocked(ticket).also { if (it is SyncOutcome.Synced && !it.morePending) synced.value = nowMillis() }
    }

    @Suppress("ReturnCount") // each way a run ends is an early return
    private suspend fun syncLocked(ticket: Long): SyncOutcome {
        var cursor = store.inboxCursor()
        // A first sync (or one after a sign-in) brings in the whole inbox: none of it is news.
        val added = NewEntries(news = cursor != null)
        var restartedForBadCursor = false
        var clearNext = false
        var pages = 0
        while (pages < maxPages) {
            val result = remote.syncInbox(cursor, pageSize)
            if (result.isInvalidCursor() && cursor != null && !restartedForBadCursor) {
                // The server cannot read this cursor any more (a new server
                // version, a restored database): start over from nothing.
                restartedForBadCursor = true
                clearNext = true
                cursor = null
                continue
            }
            val page = (result as? Remote.Ok)?.value ?: return failure(result as Remote.Failure)
            pages++
            val clear = clearNext || page.reset
            clearNext = false
            cursor = page.nextCursor ?: if (clear) null else cursor
            val (change, new) = merge(page, clear, cursor)
            // Before the write, so nothing that sees the cleared cache takes it for complete.
            if (clear) synced.value = null
            // Signed out, or someone else signed in, while the page was on its way.
            session.write(ticket) { applyInbox(change) } ?: return SyncOutcome.Unauthorized
            added.record(change, new)
            if (!page.hasMore) return SyncOutcome.Synced(pages, page.retryAfterSeconds, added = added.list())
        }
        return SyncOutcome.Synced(pages, morePending = true, added = added.list())
    }

    /** What [SyncOutcome.Synced.added] reports for a run: nothing once a page cleared the inbox. */
    private class NewEntries(private var news: Boolean) {
        private val entries = linkedMapOf<String, InboxEntry>()

        fun record(change: InboxChange, new: List<InboxEntry>) {
            if (change.clear) news = false
            change.deletes.forEach { entries.remove(it) }
            // A later page's newer copy of an entry an earlier page brought in.
            change.upserts.filter { it.id in entries }.forEach { entries[it.id] = it }
            new.forEach { entries[it.id] = it }
        }

        fun list(): List<InboxEntry> = if (news) entries.values.toList() else emptyList()
    }

    /** The page as a change to the cache, and the open entries in it the cache did not hold at all. */
    private suspend fun merge(page: SyncPage, clear: Boolean, cursor: String?): Pair<InboxChange, List<InboxEntry>> {
        val cached = if (clear) emptyMap() else store.inboxVersions(page.entries.map { it.entry.id })
        val upserts = linkedMapOf<String, InboxEntry>()
        val deletes = mutableSetOf<String>()
        for (synced in page.entries) {
            val entry = synced.entry
            val held = upserts[entry.id]?.updatedAtMicros ?: cached[entry.id]
            if (held != null && entry.updatedAtMicros < held) continue
            if (synced.open) {
                upserts[entry.id] = entry
                deletes -= entry.id
            } else {
                upserts -= entry.id
                deletes += entry.id
            }
        }
        val change = InboxChange(
            clear = clear,
            upserts = upserts.values.toList(),
            deletes = deletes,
            teamIds = page.teamIds,
            cursor = cursor,
        )
        return change to change.upserts.filter { it.id !in cached && it.teamId in page.teamIds }
    }

    private fun failure(error: Remote.Failure): SyncOutcome = when (error) {
        is Remote.HttpError -> if (error.status == HTTP_UNAUTHORIZED) {
            SyncOutcome.Unauthorized
        } else {
            SyncOutcome.Failed(SyncOutcome.Reason.SERVER, error.status, error.retryAfterMillis)
        }

        is Remote.Unreachable -> SyncOutcome.Failed(SyncOutcome.Reason.UNREACHABLE)

        is Remote.Unreadable -> SyncOutcome.Failed(SyncOutcome.Reason.UNREADABLE)
    }

    companion object {
        const val DEFAULT_PAGE_SIZE = 200

        /** 50 pages of 200: more than any inbox, and a bound if a server keeps saying has_more. */
        const val DEFAULT_MAX_PAGES = 50

        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_BAD_REQUEST = 400

        private fun Remote<*>.isInvalidCursor() =
            this is Remote.HttpError && status == HTTP_BAD_REQUEST && errorCode == "invalid_cursor"
    }
}
