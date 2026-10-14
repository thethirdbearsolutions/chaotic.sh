package sh.chaotic.sync

import sh.chaotic.api.models.InboxEntryResponse
import sh.chaotic.api.models.InboxEntryState
import sh.chaotic.api.models.InboxSyncResponse
import sh.chaotic.api.models.IssueActivityResponse
import sh.chaotic.api.models.IssueCommentResponse
import sh.chaotic.api.models.IssueResponse
import sh.chaotic.api.models.LimboStatusResponse
import sh.chaotic.api.models.PrincipalSummary
import sh.chaotic.api.models.ProjectResponse
import sh.chaotic.api.models.SprintResponse
import sh.chaotic.api.models.TeamResponse

// From the generated API models to the cache's own records.

/** What the generated client decodes an enum value newer than this app to (enumUnknownDefaultCase). */
private const val GENERATED_UNKNOWN = "unknown_default_open_api"

/** An enum's wire value, with the generator's placeholder for a newer value read as [UNKNOWN_VALUE]. */
private val String.wire: String get() = if (this == GENERATED_UNKNOWN) UNKNOWN_VALUE else this

/** A summary when the server sent one, else just the name it sent beside the id. */
private fun principal(summary: PrincipalSummary?, id: String?, name: String?): Principal? = when {
    summary != null -> Principal(summary.id, summary.name, summary.isAgent == true, summary.ownerName)
    id != null && name != null -> Principal(id = id, name = name)
    else -> null
}

internal fun InboxSyncResponse.toSyncPage() = SyncPage(
    entries = propertyEntries.map { SyncedEntry(it.toInboxEntry(), open = it.isOpen()) },
    nextCursor = nextCursor,
    hasMore = hasMore == true,
    retryAfterSeconds = retryAfter,
    reset = reset == true,
    teamIds = teamIds.toSet(),
)

/**
 * Open, as the contract defines it: `state` is `open`. An older server
 * that sends no `state` is read from the timestamps the state derives
 * from. A state this app does not know is not open: a newer server's new
 * way for an entry to leave the inbox should not leave it on the screen.
 */
internal fun InboxEntryResponse.isOpen(): Boolean = when (state) {
    null -> archivedAt == null && resolvedAt == null
    InboxEntryState.open -> true
    else -> false
}

internal fun InboxEntryResponse.toInboxEntry() = InboxEntry(
    id = id,
    teamId = teamId,
    kind = kind.value.wire,
    title = title,
    body = body,
    projectId = projectId,
    issueId = issueId,
    issueIdentifier = issueIdentifier,
    documentId = documentId,
    documentTitle = documentTitle,
    source = principal(sourceUser, sourceUserId, sourceUserName),
    createdAtMillis = Timestamps.millis(createdAt),
    updatedAtMicros = Timestamps.micros(updatedAt),
    read = readAt != null,
)

internal fun TeamResponse.toTeam() = Team(id = id, name = name, key = key)

internal fun ProjectResponse.toProject() = Project(id = id, teamId = teamId, name = name, key = key)

internal fun SprintResponse.toCurrentSprint() = CurrentSprint(
    id = id,
    projectId = projectId,
    name = name,
    budget = budget,
    pointsSpent = pointsSpent,
    limbo = limbo,
)

internal fun LimboStatusResponse.toLimboInfo() =
    LimboInfo(inLimbo = inLimbo, pendingRituals = pendingRituals.map { it.name })

internal fun IssueResponse.toIssue(teamId: String) = Issue(
    id = id,
    teamId = teamId,
    projectId = projectId,
    identifier = identifier,
    title = title,
    description = description,
    status = status.value.wire,
    priority = priority.value.wire,
    estimate = estimate,
    assignee = principal(assignee, assigneeId, assigneeName),
    updatedAtMillis = Timestamps.millis(updatedAt),
    openedAtMillis = 0,
)

internal fun IssueCommentResponse.toComment() = Comment(
    id = id,
    issueId = issueId,
    author = principal(author, authorId, authorName),
    content = content,
    createdAtMillis = Timestamps.millis(createdAt),
)

internal fun IssueActivityResponse.toActivity() = Activity(
    id = id,
    issueId = issueId,
    type = activityType.value.wire,
    field = fieldName,
    oldValue = oldValue,
    newValue = newValue,
    actor = principal(user, userId, userName),
    createdAtMillis = Timestamps.millis(createdAt),
)
