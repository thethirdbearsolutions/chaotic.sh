package sh.chaotic.sync

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/** [CacheStore] in memory: the reference for what the Room store must do, and the tests' fake. */
@Suppress("TooManyFunctions") // the CacheStore interface plus a reader per table for tests
class InMemoryCacheStore : CacheStore {
    private val mutex = Mutex()
    private var cursor: String? = null
    private var owner: String? = null
    private val inbox = linkedMapOf<String, InboxEntry>()
    private val teams = linkedMapOf<String, Team>()
    private val issues = linkedMapOf<String, IssueDetail>()
    private val sprintCards = linkedMapOf<String, SprintCard>()
    private val writes = linkedMapOf<String, PendingWrite>()
    private val refused = linkedMapOf<String, WriteRefusal>()

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

    override suspend fun queueWrite(write: PendingWrite) = mutex.withLock {
        writes.remove(write.key)
        writes[write.key] = write
    }

    override suspend fun pendingWrites(): List<PendingWrite> = mutex.withLock { writes.values.toList() }

    override suspend fun removeWrite(key: String): Boolean = mutex.withLock { writes.remove(key) != null }

    override suspend fun completeWrite(key: String, effect: WriteEffect?) = mutex.withLock {
        writes.remove(key)
        if (effect != null) applyLocked(effect)
    }

    @Suppress("ReturnCount") // an effect on something not cached is a no-op
    private fun applyLocked(effect: WriteEffect) {
        when (effect) {
            is WriteEffect.DropEntry -> {
                inbox.remove(effect.entryId)
            }

            is WriteEffect.MarkRead -> {
                val entry = inbox[effect.entryId] ?: return
                inbox[entry.id] = entry.copy(read = true)
            }

            is WriteEffect.AddComment -> {
                val detail = issues[effect.comment.issueId] ?: return
                val comments = detail.comments.filter { it.id != effect.comment.id } + effect.comment
                issues[detail.issue.id] = detail.copy(comments = comments.sortedBy { it.createdAtMillis })
            }

            is WriteEffect.UpdateIssue -> {
                val detail = issues[effect.issue.id] ?: return
                val issue = effect.issue.copy(
                    teamId = detail.issue.teamId,
                    openedAtMillis = detail.issue.openedAtMillis,
                )
                issues[issue.id] = detail.copy(issue = issue)
            }
        }
    }

    override suspend fun refuseWrite(refusal: WriteRefusal) = mutex.withLock {
        writes.remove(refusal.key)
        refused[refusal.key] = refusal
        while (refused.size > WriteQueue.MAX_REFUSALS) refused.remove(refused.keys.first())
    }

    override suspend fun refusals(): List<WriteRefusal> = mutex.withLock { refused.values.toList() }

    override suspend fun dismissRefusal(key: String) = mutex.withLock {
        refused.remove(key)
        Unit
    }

    override suspend fun owner(): String? = mutex.withLock { owner }

    override suspend fun claim(owner: String) = mutex.withLock {
        if (this.owner != owner) clearLocked()
        this.owner = owner
    }

    override suspend fun clearAll() = mutex.withLock { clearLocked() }

    private fun clearLocked() {
        owner = null
        cursor = null
        inbox.clear()
        teams.clear()
        issues.clear()
        sprintCards.clear()
        writes.clear()
        refused.clear()
    }

    override suspend fun snapshot(): CacheSnapshot = mutex.withLock {
        CacheSnapshot(
            cursor = cursor,
            inbox = inbox.values.sortedBy { it.id },
            teams = teams.values.sortedBy { it.id },
            issues = issues.values.sortedBy { it.issue.id },
            sprintCards = sprintCards.values.sortedBy { it.projectId },
            writes = writes.values.toList(),
            refusals = refused.values.toList(),
        )
    }

    private fun retainTeamsLocked(keep: Set<String>) {
        inbox.values.removeAll { it.teamId !in keep }
        teams.keys.retainAll(keep)
        issues.values.removeAll { it.issue.teamId !in keep }
        sprintCards.values.removeAll { it.teamId !in keep }
    }
}
