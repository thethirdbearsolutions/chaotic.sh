package sh.chaotic.sync

// What the app caches, in its own shape rather than the generated API
// models: only the fields the screens draw, with timestamps already parsed.
// Enum-like fields (`kind`, `status`, `priority`, `type`) are kept as the
// server's wire value. One a newer server adds cannot be: the generated
// client decodes it to a placeholder, which is stored as [UNKNOWN_VALUE]
// and shown with a neutral label.

/** An enum value this app's client does not know (a newer server's). */
const val UNKNOWN_VALUE = "unknown"

/** A person, or an agent with the person who owns it (the server's PrincipalSummary). */
data class Principal(val id: String, val name: String, val isAgent: Boolean = false, val ownerName: String? = null)

data class Team(val id: String, val name: String, val key: String)

/** One open inbox entry. Resolved and archived ones are never stored: they are tombstones. */
data class InboxEntry(
    val id: String,
    val teamId: String,
    val kind: String,
    val title: String,
    val body: String? = null,
    val projectId: String? = null,
    val issueId: String? = null,
    val issueIdentifier: String? = null,
    val documentId: String? = null,
    val documentTitle: String? = null,
    val source: Principal? = null,
    val createdAtMillis: Long,
    /** Microseconds, the server's own precision, so two changes in one millisecond still order. */
    val updatedAtMicros: Long,
    val read: Boolean = false,
)

data class Issue(
    val id: String,
    val teamId: String,
    val projectId: String,
    val identifier: String,
    val title: String,
    val description: String? = null,
    val status: String,
    val priority: String,
    val estimate: Int? = null,
    val assignee: Principal? = null,
    val updatedAtMillis: Long,
    /** When the person last opened it on this device; the cache keeps what was opened in the last week. */
    val openedAtMillis: Long,
)

data class Comment(
    val id: String,
    val issueId: String,
    val author: Principal? = null,
    val content: String,
    val createdAtMillis: Long,
)

data class Activity(
    val id: String,
    val issueId: String,
    val type: String,
    val field: String? = null,
    val oldValue: String? = null,
    val newValue: String? = null,
    val actor: Principal? = null,
    val createdAtMillis: Long,
)

data class IssueDetail(val issue: Issue, val comments: List<Comment>, val activity: List<Activity>)

data class Project(val id: String, val teamId: String, val name: String, val key: String)

/** One project's current sprint, as its card draws it. */
data class SprintCard(
    val projectId: String,
    val teamId: String,
    val projectName: String,
    val projectKey: String,
    val sprintId: String,
    val sprintName: String,
    /** Null for an unlimited sprint. */
    val budget: Int?,
    val pointsSpent: Int,
    val limbo: Boolean,
    /** The rituals a sprint in limbo is waiting on, by name. Empty unless [limbo]. */
    val pendingRituals: List<String> = emptyList(),
)
