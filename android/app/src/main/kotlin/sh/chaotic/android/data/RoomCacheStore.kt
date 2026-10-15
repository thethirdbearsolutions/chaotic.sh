package sh.chaotic.android.data

import sh.chaotic.sync.CacheSnapshot
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.PendingWrite
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteEffect
import sh.chaotic.sync.WriteRefusal

/** [CacheStore] on Room; app/src/test runs core-sync's CacheStoreContract against it. */
@Suppress("TooManyFunctions") // the CacheStore interface, one function per operation
class RoomCacheStore(private val dao: CacheDao) : CacheStore {
    override suspend fun inboxCursor(): String? = dao.syncValue(CacheDao.INBOX_CURSOR)

    override suspend fun inboxVersions(ids: Collection<String>): Map<String, Long> =
        ids.distinct().chunked(CacheDao.MAX_VARIABLES).flatMap { dao.inboxVersions(it) }
            .associate { it.id to it.updatedAtMicros }

    override suspend fun inboxEntry(id: String): InboxEntry? = dao.inboxEntry(id)?.toEntry()

    override suspend fun applyInbox(change: InboxChange) = dao.applyInbox(change)

    override suspend fun replaceTeams(teams: List<Team>) = dao.replaceTeams(teams)

    override suspend fun dropTeam(teamId: String) = dao.dropTeam(teamId)

    override suspend fun saveIssue(detail: IssueDetail) = dao.saveIssue(detail)

    override suspend fun cachedIssue(issueId: String): Issue? = dao.cachedIssue(issueId)?.toIssue()

    override suspend fun deleteIssue(issueId: String) = dao.deleteIssue(issueId)

    override suspend fun pruneIssuesOpenedBefore(millis: Long) = dao.pruneIssuesOpenedBefore(millis)

    override suspend fun replaceSprintCards(teamId: String, cards: List<SprintCard>) =
        dao.replaceSprintCards(teamId, cards)

    override suspend fun queueWrite(write: PendingWrite) = dao.queueWrite(PendingWriteEntity.of(write))

    override suspend fun pendingWrites(): List<PendingWrite> = dao.allWrites().mapNotNull { it.toWrite() }

    override suspend fun removeWrite(key: String): Boolean = dao.removeWrite(key)

    override suspend fun rescheduleWrite(key: String, attempts: Int, notBeforeMillis: Long): Boolean =
        dao.rescheduleWrite(key, attempts, notBeforeMillis) > 0

    override suspend fun completeWrite(key: String, effect: WriteEffect?) = dao.completeWrite(key, effect)

    override suspend fun refuseWrite(refusal: WriteRefusal) = dao.refuseWrite(refusal)

    override suspend fun refusals(): List<WriteRefusal> = dao.allRefusals().mapNotNull { it.toRefusal() }

    override suspend fun dismissRefusal(key: String) = dao.deleteRefusal(key)

    override suspend fun owner(): String? = dao.syncValue(CacheDao.OWNER)

    override suspend fun claim(owner: String) = dao.claim(owner)

    override suspend fun clearAll() = dao.clearAll()

    override suspend fun snapshot(): CacheSnapshot {
        val comments = dao.allComments().groupBy { it.issueId }
        val activity = dao.allActivity().groupBy { it.issueId }
        return CacheSnapshot(
            cursor = inboxCursor(),
            inbox = dao.allInbox().map { it.toEntry() },
            teams = dao.allTeams().map { it.toTeam() },
            issues = dao.allIssues().map { issue ->
                IssueDetail(
                    issue = issue.toIssue(),
                    comments = comments[issue.id].orEmpty().map { it.toComment() },
                    activity = activity[issue.id].orEmpty().map { it.toActivity() },
                )
            },
            sprintCards = dao.allSprintCards().map { it.toCard() },
            writes = pendingWrites(),
            refusals = refusals(),
        )
    }
}
