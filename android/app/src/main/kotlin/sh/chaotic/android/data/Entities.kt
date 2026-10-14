package sh.chaotic.android.data

import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import sh.chaotic.sync.Activity
import sh.chaotic.sync.Comment
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.Issue
import sh.chaotic.sync.PendingWrite
import sh.chaotic.sync.Principal
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteRefusal

// The Room tables of the offline cache (CHT-1611), and the mapping to and
// from core-sync's records. A principal is stored as four flat columns
// (id, name, is-agent, owner name), all null when there is none.

private fun principal(id: String?, name: String?, isAgent: Boolean?, ownerName: String?): Principal? =
    if (id != null && name != null) Principal(id, name, isAgent == true, ownerName) else null

@Entity(tableName = "inbox_entry", indices = [Index("teamId")])
data class InboxEntryEntity(
    @PrimaryKey val id: String,
    val teamId: String,
    val kind: String,
    val title: String,
    val body: String?,
    val projectId: String?,
    val issueId: String?,
    val issueIdentifier: String?,
    val documentId: String?,
    val documentTitle: String?,
    val sourceId: String?,
    val sourceName: String?,
    val sourceIsAgent: Boolean?,
    val sourceOwnerName: String?,
    val createdAtMillis: Long,
    val updatedAtMicros: Long,
    val read: Boolean,
    /** The entry's actions (CHT-1613), one per line: kind, note and path, tab-separated. */
    val actions: String,
) {
    fun toEntry() = InboxEntry(
        id = id,
        teamId = teamId,
        kind = kind,
        title = title,
        body = body,
        projectId = projectId,
        issueId = issueId,
        issueIdentifier = issueIdentifier,
        documentId = documentId,
        documentTitle = documentTitle,
        source = principal(sourceId, sourceName, sourceIsAgent, sourceOwnerName),
        createdAtMillis = createdAtMillis,
        updatedAtMicros = updatedAtMicros,
        read = read,
        actions = decodeActions(actions),
    )

    companion object {
        // A kind and a note are single words, and a path that reached the
        // cache passed WritePaths.isApiPath, which allows no whitespace.
        private fun encodeActions(actions: List<InboxAction>): String =
            actions.joinToString("\n") { "${it.kind}\t${it.note}\t${it.path}" }

        private fun decodeActions(encoded: String): List<InboxAction> = encoded.split('\n').mapNotNull { line ->
            val parts = line.split('\t')
            if (parts.size == ACTION_PARTS) InboxAction(kind = parts[0], path = parts[2], note = parts[1]) else null
        }

        private const val ACTION_PARTS = 3

        fun of(entry: InboxEntry) = InboxEntryEntity(
            id = entry.id,
            teamId = entry.teamId,
            kind = entry.kind,
            title = entry.title,
            body = entry.body,
            projectId = entry.projectId,
            issueId = entry.issueId,
            issueIdentifier = entry.issueIdentifier,
            documentId = entry.documentId,
            documentTitle = entry.documentTitle,
            sourceId = entry.source?.id,
            sourceName = entry.source?.name,
            sourceIsAgent = entry.source?.isAgent,
            sourceOwnerName = entry.source?.ownerName,
            createdAtMillis = entry.createdAtMillis,
            updatedAtMicros = entry.updatedAtMicros,
            read = entry.read,
            actions = encodeActions(entry.actions),
        )
    }
}

/** For the version check of a sync page. */
data class InboxVersion(val id: String, val updatedAtMicros: Long)

@Entity(tableName = "team")
data class TeamEntity(@PrimaryKey val id: String, val name: String, val key: String) {
    fun toTeam() = Team(id, name, key)

    companion object {
        fun of(team: Team) = TeamEntity(team.id, team.name, team.key)
    }
}

@Entity(tableName = "issue", indices = [Index("teamId")])
data class IssueEntity(
    @PrimaryKey val id: String,
    val teamId: String,
    val projectId: String,
    val identifier: String,
    val title: String,
    val description: String?,
    val status: String,
    val priority: String,
    val estimate: Int?,
    val assigneeId: String?,
    val assigneeName: String?,
    val assigneeIsAgent: Boolean?,
    val assigneeOwnerName: String?,
    val updatedAtMillis: Long,
    val openedAtMillis: Long,
) {
    fun toIssue() = Issue(
        id = id,
        teamId = teamId,
        projectId = projectId,
        identifier = identifier,
        title = title,
        description = description,
        status = status,
        priority = priority,
        estimate = estimate,
        assignee = principal(assigneeId, assigneeName, assigneeIsAgent, assigneeOwnerName),
        updatedAtMillis = updatedAtMillis,
        openedAtMillis = openedAtMillis,
    )

    companion object {
        fun of(issue: Issue) = IssueEntity(
            id = issue.id,
            teamId = issue.teamId,
            projectId = issue.projectId,
            identifier = issue.identifier,
            title = issue.title,
            description = issue.description,
            status = issue.status,
            priority = issue.priority,
            estimate = issue.estimate,
            assigneeId = issue.assignee?.id,
            assigneeName = issue.assignee?.name,
            assigneeIsAgent = issue.assignee?.isAgent,
            assigneeOwnerName = issue.assignee?.ownerName,
            updatedAtMillis = issue.updatedAtMillis,
            openedAtMillis = issue.openedAtMillis,
        )
    }
}

@Entity(tableName = "comment", indices = [Index("issueId")])
data class CommentEntity(
    @PrimaryKey val id: String,
    val issueId: String,
    val authorId: String?,
    val authorName: String?,
    val authorIsAgent: Boolean?,
    val authorOwnerName: String?,
    val content: String,
    val createdAtMillis: Long,
) {
    fun toComment() = Comment(
        id = id,
        issueId = issueId,
        author = principal(authorId, authorName, authorIsAgent, authorOwnerName),
        content = content,
        createdAtMillis = createdAtMillis,
    )

    companion object {
        fun of(comment: Comment) = CommentEntity(
            id = comment.id,
            issueId = comment.issueId,
            authorId = comment.author?.id,
            authorName = comment.author?.name,
            authorIsAgent = comment.author?.isAgent,
            authorOwnerName = comment.author?.ownerName,
            content = comment.content,
            createdAtMillis = comment.createdAtMillis,
        )
    }
}

@Entity(tableName = "activity", indices = [Index("issueId")])
data class ActivityEntity(
    @PrimaryKey val id: String,
    val issueId: String,
    val type: String,
    val field: String?,
    val oldValue: String?,
    val newValue: String?,
    val actorId: String?,
    val actorName: String?,
    val actorIsAgent: Boolean?,
    val actorOwnerName: String?,
    val createdAtMillis: Long,
) {
    fun toActivity() = Activity(
        id = id,
        issueId = issueId,
        type = type,
        field = field,
        oldValue = oldValue,
        newValue = newValue,
        actor = principal(actorId, actorName, actorIsAgent, actorOwnerName),
        createdAtMillis = createdAtMillis,
    )

    companion object {
        fun of(activity: Activity) = ActivityEntity(
            id = activity.id,
            issueId = activity.issueId,
            type = activity.type,
            field = activity.field,
            oldValue = activity.oldValue,
            newValue = activity.newValue,
            actorId = activity.actor?.id,
            actorName = activity.actor?.name,
            actorIsAgent = activity.actor?.isAgent,
            actorOwnerName = activity.actor?.ownerName,
            createdAtMillis = activity.createdAtMillis,
        )
    }
}

@Entity(tableName = "sprint_card", indices = [Index("teamId")])
data class SprintCardEntity(
    @PrimaryKey val projectId: String,
    val teamId: String,
    val projectName: String,
    val projectKey: String,
    val sprintId: String,
    val sprintName: String,
    val budget: Int?,
    val pointsSpent: Int,
    val limbo: Boolean,
    /** Ritual names, one per line (a name never holds a newline: it is a single-line field). */
    val pendingRituals: String,
) {
    fun toCard() = SprintCard(
        projectId = projectId,
        teamId = teamId,
        projectName = projectName,
        projectKey = projectKey,
        sprintId = sprintId,
        sprintName = sprintName,
        budget = budget,
        pointsSpent = pointsSpent,
        limbo = limbo,
        pendingRituals = if (pendingRituals.isEmpty()) emptyList() else pendingRituals.split('\n'),
    )

    companion object {
        fun of(card: SprintCard) = SprintCardEntity(
            projectId = card.projectId,
            teamId = card.teamId,
            projectName = card.projectName,
            projectKey = card.projectKey,
            sprintId = card.sprintId,
            sprintName = card.sprintName,
            budget = card.budget,
            pointsSpent = card.pointsSpent,
            limbo = card.limbo,
            pendingRituals = card.pendingRituals.joinToString("\n") { it.replace('\n', ' ') },
        )
    }
}

/** Small values the sync keeps, by key: the inbox cursor and whose cache this is. */
@Entity(tableName = "sync_state")
data class SyncStateEntity(@PrimaryKey val key: String, val value: String)

private fun writeKind(name: String): WriteKind? = WriteKind.entries.firstOrNull { it.name == name }

/**
 * The write queue (CHT-1613), in the order the writes were queued ([seq]).
 * It lives in the cache's database so that a sign-out or another person's
 * claim empties it with the rest, in one transaction.
 */
@Entity(tableName = "pending_write", indices = [Index(value = ["key"], unique = true)])
data class PendingWriteEntity(
    @PrimaryKey(autoGenerate = true) val seq: Long = 0,
    val key: String,
    val kind: String,
    val path: String?,
    val entryId: String?,
    val issueId: String?,
    val teamId: String?,
    val field: String?,
    val value: String?,
    val valueLabel: String?,
    val label: String,
    val createdAtMillis: Long,
    val notBeforeMillis: Long,
    /**
     * Sends the server answered with a passing failure;
     * [sh.chaotic.sync.WriteQueue.MAX_ATTEMPTS] of them stall the write.
     */
    val attempts: Int = 0,
) {
    /** Null for a kind this build does not know, which only a downgrade could have written. */
    fun toWrite(): PendingWrite? = writeKind(kind)?.let {
        PendingWrite(
            key = key,
            kind = it,
            path = path,
            entryId = entryId,
            issueId = issueId,
            teamId = teamId,
            field = field,
            value = value,
            valueLabel = valueLabel,
            label = label,
            createdAtMillis = createdAtMillis,
            notBeforeMillis = notBeforeMillis,
            attempts = attempts,
        )
    }

    companion object {
        fun of(write: PendingWrite) = PendingWriteEntity(
            key = write.key,
            kind = write.kind.name,
            path = write.path,
            entryId = write.entryId,
            issueId = write.issueId,
            teamId = write.teamId,
            field = write.field,
            value = write.value,
            valueLabel = write.valueLabel,
            label = write.label,
            createdAtMillis = write.createdAtMillis,
            notBeforeMillis = write.notBeforeMillis,
            attempts = write.attempts,
        )
    }
}

/** Refused writes the person has not dismissed yet, oldest first ([seq]). */
@Entity(tableName = "write_refusal", indices = [Index(value = ["key"], unique = true)])
data class WriteRefusalEntity(
    @PrimaryKey(autoGenerate = true) val seq: Long = 0,
    val key: String,
    val kind: String,
    val label: String,
    val status: Int,
    val errorCode: String?,
    val message: String?,
    val entryId: String?,
    val issueId: String?,
    val atMillis: Long,
    /** A refused comment's text, so what the person wrote is not lost with it. */
    val value: String? = null,
) {
    fun toRefusal(): WriteRefusal? = writeKind(kind)?.let {
        WriteRefusal(
            key = key,
            kind = it,
            label = label,
            status = status,
            errorCode = errorCode,
            message = message,
            entryId = entryId,
            issueId = issueId,
            atMillis = atMillis,
            value = value,
        )
    }

    companion object {
        fun of(refusal: WriteRefusal) = WriteRefusalEntity(
            key = refusal.key,
            kind = refusal.kind.name,
            label = refusal.label,
            status = refusal.status,
            errorCode = refusal.errorCode,
            message = refusal.message,
            entryId = refusal.entryId,
            issueId = refusal.issueId,
            atMillis = refusal.atMillis,
            value = refusal.value,
        )
    }
}
