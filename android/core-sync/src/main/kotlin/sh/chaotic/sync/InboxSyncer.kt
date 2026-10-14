package sh.chaotic.sync

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** How a sync run ended. */
sealed interface SyncOutcome {
    /**
     * The cache is as current as the server lets it be. [retryAfterSeconds]
     * is the server's hint that syncing again sooner returns the same rows
     * (CHT-1622); [morePending] that the run stopped at its page cap with
     * more to fetch.
     */
    data class Synced(val pages: Int, val retryAfterSeconds: Int? = null, val morePending: Boolean = false) :
        SyncOutcome

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
) {
    private val mutex = Mutex()
    private val store get() = session.store

    suspend fun sync(): SyncOutcome = mutex.withLock {
        val ticket = session.begin() ?: return@withLock SyncOutcome.Unauthorized
        syncLocked(ticket)
    }

    @Suppress("ReturnCount") // each way a run ends is an early return
    private suspend fun syncLocked(ticket: Long): SyncOutcome {
        var cursor = store.inboxCursor()
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
            val change = merge(page, clear, cursor)
            // Signed out, or someone else signed in, while the page was on its way.
            session.write(ticket) { applyInbox(change) } ?: return SyncOutcome.Unauthorized
            if (!page.hasMore) return SyncOutcome.Synced(pages, page.retryAfterSeconds)
        }
        return SyncOutcome.Synced(pages, morePending = true)
    }

    private suspend fun merge(page: SyncPage, clear: Boolean, cursor: String?): InboxChange {
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
        return InboxChange(
            clear = clear,
            upserts = upserts.values.toList(),
            deletes = deletes,
            teamIds = page.teamIds,
            cursor = cursor,
        )
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
