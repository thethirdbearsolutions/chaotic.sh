package sh.chaotic.android.data

import sh.chaotic.sync.CacheSnapshot
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team

/** [CacheStore] on Room; app/src/test runs core-sync's CacheStoreContract against it. */
class RoomCacheStore(private val dao: CacheDao) : CacheStore {
    override suspend fun inboxCursor(): String? = dao.syncValue(CacheDao.INBOX_CURSOR)

    override suspend fun inboxVersions(ids: Collection<String>): Map<String, Long> =
        ids.distinct().chunked(CacheDao.MAX_VARIABLES).flatMap { dao.inboxVersions(it) }
            .associate { it.id to it.updatedAtMicros }

    override suspend fun applyInbox(change: InboxChange) = dao.applyInbox(change)

    override suspend fun replaceTeams(teams: List<Team>) = dao.replaceTeams(teams)

    override suspend fun dropTeam(teamId: String) = dao.dropTeam(teamId)

    override suspend fun saveIssue(detail: IssueDetail) = dao.saveIssue(detail)

    override suspend fun deleteIssue(issueId: String) = dao.deleteIssue(issueId)

    override suspend fun pruneIssuesOpenedBefore(millis: Long) = dao.pruneIssuesOpenedBefore(millis)

    override suspend fun replaceSprintCards(teamId: String, cards: List<SprintCard>) =
        dao.replaceSprintCards(teamId, cards)

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
        )
    }
}
