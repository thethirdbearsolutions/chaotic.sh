package sh.chaotic.android.data

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Transaction
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteEffect
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.WriteRefusal

/**
 * Every query of the offline cache. The multi-table operations are
 * @Transaction methods here, so each [sh.chaotic.sync.CacheStore] call is
 * one transaction, as the contract requires.
 */
@Dao
@Suppress("TooManyFunctions") // one DAO for one small cache keeps the transactions in one place
abstract class CacheDao {
    // Screens observe these.

    @Query("SELECT * FROM inbox_entry")
    abstract fun observeInbox(): Flow<List<InboxEntryEntity>>

    @Query("SELECT * FROM team ORDER BY name COLLATE NOCASE, id")
    abstract fun observeTeams(): Flow<List<TeamEntity>>

    @Query("SELECT * FROM issue WHERE id = :issueId")
    abstract fun observeIssue(issueId: String): Flow<IssueEntity?>

    @Query("SELECT * FROM comment WHERE issueId = :issueId ORDER BY createdAtMillis, id")
    abstract fun observeComments(issueId: String): Flow<List<CommentEntity>>

    @Query("SELECT * FROM activity WHERE issueId = :issueId ORDER BY createdAtMillis, id")
    abstract fun observeActivity(issueId: String): Flow<List<ActivityEntity>>

    @Query("SELECT * FROM sprint_card")
    abstract fun observeAllSprintCards(): Flow<List<SprintCardEntity>>

    @Query("SELECT * FROM pending_write ORDER BY seq")
    abstract fun observeWrites(): Flow<List<PendingWriteEntity>>

    @Query("SELECT * FROM write_refusal ORDER BY seq")
    abstract fun observeRefusals(): Flow<List<WriteRefusalEntity>>

    // Reads for the store.

    @Query("SELECT value FROM sync_state WHERE `key` = :key")
    abstract suspend fun syncValue(key: String): String?

    @Query("SELECT id, updatedAtMicros FROM inbox_entry WHERE id IN (:ids)")
    abstract suspend fun inboxVersions(ids: List<String>): List<InboxVersion>

    @Query("SELECT * FROM inbox_entry ORDER BY id")
    abstract suspend fun allInbox(): List<InboxEntryEntity>

    @Query("SELECT * FROM inbox_entry WHERE id = :id")
    abstract suspend fun inboxEntry(id: String): InboxEntryEntity?

    @Query("SELECT * FROM team ORDER BY id")
    abstract suspend fun allTeams(): List<TeamEntity>

    @Query("SELECT * FROM issue ORDER BY id")
    abstract suspend fun allIssues(): List<IssueEntity>

    @Query("SELECT * FROM issue WHERE id = :issueId")
    abstract suspend fun cachedIssue(issueId: String): IssueEntity?

    @Query("SELECT * FROM comment ORDER BY createdAtMillis, id")
    abstract suspend fun allComments(): List<CommentEntity>

    @Query("SELECT * FROM activity ORDER BY createdAtMillis, id")
    abstract suspend fun allActivity(): List<ActivityEntity>

    @Query("SELECT * FROM sprint_card ORDER BY projectId")
    abstract suspend fun allSprintCards(): List<SprintCardEntity>

    @Query("SELECT * FROM pending_write ORDER BY seq")
    abstract suspend fun allWrites(): List<PendingWriteEntity>

    @Query("SELECT * FROM write_refusal ORDER BY seq")
    abstract suspend fun allRefusals(): List<WriteRefusalEntity>

    @Query("SELECT * FROM issue WHERE id = :issueId")
    protected abstract suspend fun issueRow(issueId: String): IssueEntity?

    // Writes.

    @Upsert
    protected abstract suspend fun putSyncValue(value: SyncStateEntity)

    @Query("DELETE FROM sync_state WHERE `key` = :key")
    protected abstract suspend fun deleteSyncValue(key: String)

    @Upsert
    protected abstract suspend fun upsertInbox(entries: List<InboxEntryEntity>)

    @Query("DELETE FROM inbox_entry WHERE id IN (:ids)")
    protected abstract suspend fun deleteInbox(ids: List<String>)

    @Query("DELETE FROM inbox_entry")
    protected abstract suspend fun deleteAllInbox()

    @Upsert
    protected abstract suspend fun upsertTeams(teams: List<TeamEntity>)

    @Upsert
    protected abstract suspend fun upsertIssue(issue: IssueEntity)

    @Upsert
    protected abstract suspend fun upsertComments(comments: List<CommentEntity>)

    @Upsert
    protected abstract suspend fun upsertActivity(activity: List<ActivityEntity>)

    @Upsert
    protected abstract suspend fun upsertSprintCards(cards: List<SprintCardEntity>)

    @Query("DELETE FROM issue WHERE id = :issueId")
    protected abstract suspend fun deleteIssueRow(issueId: String)

    @Query("DELETE FROM comment WHERE issueId = :issueId")
    protected abstract suspend fun deleteComments(issueId: String)

    @Query("DELETE FROM activity WHERE issueId = :issueId")
    protected abstract suspend fun deleteActivity(issueId: String)

    @Query("DELETE FROM issue WHERE openedAtMillis < :millis")
    protected abstract suspend fun deleteIssuesOpenedBefore(millis: Long)

    @Query("DELETE FROM sprint_card WHERE teamId = :teamId")
    protected abstract suspend fun deleteSprintCards(teamId: String)

    // Every table's rows of teams not in the list; the team-less rows (comments,
    // activity) go with their issue in deleteOrphans.

    @Query("DELETE FROM inbox_entry WHERE teamId NOT IN (:teamIds)")
    protected abstract suspend fun deleteInboxNotIn(teamIds: List<String>)

    @Query("DELETE FROM team WHERE id NOT IN (:teamIds)")
    protected abstract suspend fun deleteTeamsNotIn(teamIds: List<String>)

    @Query("DELETE FROM issue WHERE teamId NOT IN (:teamIds)")
    protected abstract suspend fun deleteIssuesNotIn(teamIds: List<String>)

    @Query("DELETE FROM sprint_card WHERE teamId NOT IN (:teamIds)")
    protected abstract suspend fun deleteSprintCardsNotIn(teamIds: List<String>)

    @Query("DELETE FROM inbox_entry WHERE teamId = :teamId")
    protected abstract suspend fun deleteInboxOf(teamId: String)

    @Query("DELETE FROM team WHERE id = :teamId")
    protected abstract suspend fun deleteTeam(teamId: String)

    @Query("DELETE FROM issue WHERE teamId = :teamId")
    protected abstract suspend fun deleteIssuesOf(teamId: String)

    @Query("DELETE FROM comment WHERE issueId NOT IN (SELECT id FROM issue)")
    protected abstract suspend fun deleteOrphanComments()

    @Query("DELETE FROM activity WHERE issueId NOT IN (SELECT id FROM issue)")
    protected abstract suspend fun deleteOrphanActivity()

    @Query("DELETE FROM team")
    protected abstract suspend fun deleteAllTeams()

    @Query("DELETE FROM issue")
    protected abstract suspend fun deleteAllIssues()

    @Query("DELETE FROM sprint_card")
    protected abstract suspend fun deleteAllSprintCards()

    @Query("DELETE FROM sync_state")
    protected abstract suspend fun deleteAllSyncState()

    @Insert
    protected abstract suspend fun insertWrite(write: PendingWriteEntity)

    @Query("DELETE FROM pending_write WHERE `key` = :key")
    protected abstract suspend fun deleteWrite(key: String): Int

    @Query("DELETE FROM pending_write")
    protected abstract suspend fun deleteAllWrites()

    @Insert
    protected abstract suspend fun insertRefusal(refusal: WriteRefusalEntity)

    @Query("DELETE FROM write_refusal WHERE `key` = :key")
    abstract suspend fun deleteRefusal(key: String)

    @Query("DELETE FROM write_refusal WHERE seq NOT IN (SELECT seq FROM write_refusal ORDER BY seq DESC LIMIT :keep)")
    protected abstract suspend fun trimRefusals(keep: Int)

    @Query("DELETE FROM write_refusal")
    protected abstract suspend fun deleteAllRefusals()

    @Query("UPDATE inbox_entry SET read = 1 WHERE id = :entryId")
    protected abstract suspend fun markRead(entryId: String)

    @Transaction
    open suspend fun applyInbox(change: InboxChange) {
        if (change.clear) deleteAllInbox()
        change.deletes.chunked(MAX_VARIABLES).forEach { deleteInbox(it) }
        upsertInbox(change.upserts.map(InboxEntryEntity::of))
        retainTeams(change.teamIds.toList())
        val cursor = change.cursor
        if (cursor == null) deleteSyncValue(INBOX_CURSOR) else putSyncValue(SyncStateEntity(INBOX_CURSOR, cursor))
    }

    @Transaction
    open suspend fun replaceTeams(teams: List<Team>) {
        deleteAllTeams()
        upsertTeams(teams.map(TeamEntity::of))
        retainTeams(teams.map { it.id })
    }

    @Transaction
    open suspend fun dropTeam(teamId: String) {
        deleteInboxOf(teamId)
        deleteTeam(teamId)
        deleteIssuesOf(teamId)
        deleteSprintCards(teamId)
        deleteOrphans()
    }

    @Transaction
    open suspend fun saveIssue(detail: IssueDetail) {
        val issueId = detail.issue.id
        upsertIssue(IssueEntity.of(detail.issue))
        deleteComments(issueId)
        deleteActivity(issueId)
        upsertComments(detail.comments.map(CommentEntity::of))
        upsertActivity(detail.activity.map(ActivityEntity::of))
    }

    @Transaction
    open suspend fun deleteIssue(issueId: String) {
        deleteIssueRow(issueId)
        deleteOrphans()
    }

    @Transaction
    open suspend fun pruneIssuesOpenedBefore(millis: Long) {
        deleteIssuesOpenedBefore(millis)
        deleteOrphans()
    }

    @Transaction
    open suspend fun replaceSprintCards(teamId: String, cards: List<SprintCard>) {
        deleteSprintCards(teamId)
        upsertSprintCards(cards.map(SprintCardEntity::of))
    }

    /** Queued last; a write already queued under the same key moves to the end. */
    @Transaction
    open suspend fun queueWrite(write: PendingWriteEntity) {
        deleteWrite(write.key)
        insertWrite(write)
    }

    /** Whether [key] was queued; it no longer is. */
    open suspend fun removeWrite(key: String): Boolean = deleteWrite(key) > 0

    /** How many rows were [key]'s (0 or 1); it keeps its place in the queue, which is its [PendingWriteEntity.seq]. */
    @Query("UPDATE pending_write SET attempts = :attempts, notBeforeMillis = :notBeforeMillis WHERE `key` = :key")
    abstract suspend fun rescheduleWrite(key: String, attempts: Int, notBeforeMillis: Long): Int

    @Transaction
    open suspend fun completeWrite(key: String, effect: WriteEffect?) {
        deleteWrite(key)
        when (effect) {
            null -> Unit

            is WriteEffect.DropEntry -> deleteInbox(listOf(effect.entryId))

            is WriteEffect.MarkRead -> markRead(effect.entryId)

            is WriteEffect.AddComment -> if (issueRow(effect.comment.issueId) != null) {
                upsertComments(listOf(CommentEntity.of(effect.comment)))
            }

            is WriteEffect.UpdateIssue -> issueRow(effect.issue.id)?.let { row ->
                // Known in the team it was opened in, and still opened when it was.
                upsertIssue(IssueEntity.of(effect.issue.copy(teamId = row.teamId, openedAtMillis = row.openedAtMillis)))
            }
        }
    }

    @Transaction
    open suspend fun refuseWrite(refusal: WriteRefusal) {
        deleteWrite(refusal.key)
        deleteRefusal(refusal.key)
        insertRefusal(WriteRefusalEntity.of(refusal))
        trimRefusals(WriteQueue.MAX_REFUSALS)
    }

    /** Make [owner] the owner, first emptying everything when it belonged to anyone else (or nobody). */
    @Transaction
    open suspend fun claim(owner: String) {
        if (syncValue(OWNER) == owner) return
        clearAll()
        putSyncValue(SyncStateEntity(OWNER, owner))
    }

    @Transaction
    open suspend fun clearAll() {
        deleteAllInbox()
        deleteAllTeams()
        deleteAllIssues()
        deleteOrphans()
        deleteAllSprintCards()
        deleteAllSyncState()
        deleteAllWrites()
        deleteAllRefusals()
    }

    private suspend fun retainTeams(teamIds: List<String>) {
        // A person is in a handful of teams, far under SQLite's variable limit.
        deleteInboxNotIn(teamIds)
        deleteTeamsNotIn(teamIds)
        deleteIssuesNotIn(teamIds)
        deleteSprintCardsNotIn(teamIds)
        deleteOrphans()
    }

    private suspend fun deleteOrphans() {
        deleteOrphanComments()
        deleteOrphanActivity()
    }

    companion object {
        const val INBOX_CURSOR = "inbox_cursor"

        /** Whose cache this is: core-sync's CacheSession owner key. */
        const val OWNER = "owner"

        /** SQLite's bound on query variables on the oldest Android this app runs on (API 29). */
        const val MAX_VARIABLES = 999
    }
}
