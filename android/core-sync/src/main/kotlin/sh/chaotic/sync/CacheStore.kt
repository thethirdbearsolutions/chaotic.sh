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

/**
 * The device cache. :app implements it on Room; [InMemoryCacheStore] is the
 * same contract in memory, for tests and previews. Every call is one
 * transaction.
 */
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

    /** Sign-out: nothing of this account may outlive it. */
    suspend fun clearAll()
}
