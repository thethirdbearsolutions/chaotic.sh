package sh.chaotic.sync

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** [CacheStore] in memory: the reference for what the Room store must do, and the tests' fake. */
class InMemoryCacheStore : CacheStore {
    private val mutex = Mutex()
    private var cursor: String? = null
    private val inbox = linkedMapOf<String, InboxEntry>()
    private val teams = linkedMapOf<String, Team>()
    private val issues = linkedMapOf<String, IssueDetail>()
    private val sprintCards = linkedMapOf<String, SprintCard>()

    /** How many times [applyInbox] ran, for tests that check a sync wrote nothing. */
    var inboxWrites: Int = 0
        private set

    suspend fun inbox(): List<InboxEntry> = mutex.withLock { inbox.values.toList() }

    suspend fun teams(): List<Team> = mutex.withLock { teams.values.toList() }

    suspend fun issue(issueId: String): IssueDetail? = mutex.withLock { issues[issueId] }

    suspend fun sprintCards(): List<SprintCard> = mutex.withLock { sprintCards.values.toList() }

    override suspend fun inboxCursor(): String? = mutex.withLock { cursor }

    override suspend fun inboxVersions(ids: Collection<String>): Map<String, Long> = mutex.withLock {
        ids.mapNotNull { id -> inbox[id]?.let { id to it.updatedAtMicros } }.toMap()
    }

    override suspend fun applyInbox(change: InboxChange) = mutex.withLock {
        inboxWrites++
        if (change.clear) inbox.clear()
        change.deletes.forEach { inbox.remove(it) }
        change.upserts.forEach { inbox[it.id] = it }
        retainTeamsLocked(change.teamIds)
        cursor = change.cursor
    }

    override suspend fun replaceTeams(teams: List<Team>) = mutex.withLock {
        this.teams.clear()
        teams.forEach { this.teams[it.id] = it }
        retainTeamsLocked(teams.map { it.id }.toSet())
    }

    override suspend fun dropTeam(teamId: String) = mutex.withLock {
        inbox.values.removeAll { it.teamId == teamId }
        teams.remove(teamId)
        issues.values.removeAll { it.issue.teamId == teamId }
        sprintCards.values.removeAll { it.teamId == teamId }
        Unit
    }

    override suspend fun saveIssue(detail: IssueDetail) = mutex.withLock {
        issues[detail.issue.id] = detail
    }

    override suspend fun deleteIssue(issueId: String) = mutex.withLock {
        issues.remove(issueId)
        Unit
    }

    override suspend fun pruneIssuesOpenedBefore(millis: Long) = mutex.withLock {
        issues.values.removeAll { it.issue.openedAtMillis < millis }
        Unit
    }

    override suspend fun replaceSprintCards(teamId: String, cards: List<SprintCard>) = mutex.withLock {
        sprintCards.values.removeAll { it.teamId == teamId }
        cards.forEach { sprintCards[it.projectId] = it }
    }

    override suspend fun clearAll() = mutex.withLock {
        cursor = null
        inbox.clear()
        teams.clear()
        issues.clear()
        sprintCards.clear()
    }

    private fun retainTeamsLocked(keep: Set<String>) {
        inbox.values.removeAll { it.teamId !in keep }
        teams.keys.retainAll(keep)
        issues.values.removeAll { it.issue.teamId !in keep }
        sprintCards.values.removeAll { it.teamId !in keep }
    }
}
