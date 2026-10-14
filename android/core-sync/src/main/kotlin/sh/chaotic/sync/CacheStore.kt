package sh.chaotic.sync

/**
 * One inbox sync page's effect on the cache, applied atomically by
 * [CacheStore.applyInbox] in this order:
 *
 * 1. [clear]: drop every inbox entry (a reset, or a cursor the server no longer reads);
 * 2. delete [deletes] (tombstones);
 * 3. upsert [upserts] by id;
 * 4. drop everything cached for a team not in [teamIds] (inbox, issues, sprint cards, the team);
 * 5. store [cursor] as the inbox cursor (null clears it).
 *
 * The cursor moves in the same transaction as the rows it covers, so a
 * crash between the two cannot leave a cursor past rows that were never
 * written.
 */
data class InboxChange(
    val clear: Boolean,
    val upserts: List<InboxEntry>,
    val deletes: Set<String>,
    val teamIds: Set<String>,
    val cursor: String?,
)

/** Everything a [CacheStore] holds, for tests and diagnostics; screens observe the store's own queries. */
data class CacheSnapshot(
    val cursor: String?,
    val inbox: List<InboxEntry>,
    val teams: List<Team>,
    val issues: List<IssueDetail>,
    val sprintCards: List<SprintCard>,
    /** The write queue, in the order it is sent. */
    val writes: List<PendingWrite> = emptyList(),
    /** Refused writes not yet dismissed, oldest first. */
    val refusals: List<WriteRefusal> = emptyList(),
)

/**
 * The device cache. :app implements it on Room; [InMemoryCacheStore] is the
 * same contract in memory, for tests and previews. Every call is one
 * transaction.
 */
@Suppress("TooManyFunctions") // one transaction per operation the sync and the refreshes need
interface CacheStore {
    suspend fun inboxCursor(): String?

    /** The stored `updatedAtMicros` of those of [ids] that are cached. */
    suspend fun inboxVersions(ids: Collection<String>): Map<String, Long>

    suspend fun applyInbox(change: InboxChange)

    /** Replace the team list, and drop everything cached for a team not in it. */
    suspend fun replaceTeams(teams: List<Team>)

    /** Drop everything cached for [teamId]: the person left it, or it is gone. */
    suspend fun dropTeam(teamId: String)

    suspend fun saveIssue(detail: IssueDetail)

    suspend fun deleteIssue(issueId: String)

    /** Drop issues last opened before [millis], with their comments and activity. */
    suspend fun pruneIssuesOpenedBefore(millis: Long)

    /** Replace [teamId]'s sprint cards with [cards]. */
    suspend fun replaceSprintCards(teamId: String, cards: List<SprintCard>)

    // The write queue (CHT-1613). It lives in the cache, so it belongs to
    // the same person: a claim by someone else and a sign-out empty it
    // with everything else, and nothing queued is ever sent as anyone else.

    /** Add [write] at the end of the queue. */
    suspend fun queueWrite(write: PendingWrite)

    /** The queue, in the order the writes were queued. */
    suspend fun pendingWrites(): List<PendingWrite>

    /** Drop [key] from the queue (an undo); false when it is not there. */
    suspend fun removeWrite(key: String): Boolean

    /** The server took [key]: drop it from the queue and apply [effect], if any. */
    suspend fun completeWrite(key: String, effect: WriteEffect?)

    /** The server refused the write [refusal] names: drop it from the queue and keep the refusal to show. */
    suspend fun refuseWrite(refusal: WriteRefusal)

    /** Refusals not yet dismissed, oldest first. */
    suspend fun refusals(): List<WriteRefusal>

    suspend fun dismissRefusal(key: String)

    /** Who the cache belongs to (see [CacheSession]); null when nobody claimed it since it was last emptied. */
    suspend fun owner(): String?

    /** Make [owner] the cache's owner, first emptying everything when it belonged to someone else. */
    suspend fun claim(owner: String)

    /** Sign-out: nothing of this account may outlive it, the owner included. */
    suspend fun clearAll()

    /**
     * Inbox ordered by id, teams by id, issues by id (comments and activity
     * oldest first), cards by project id, writes and refusals in order.
     */
    suspend fun snapshot(): CacheSnapshot
}
