package sh.chaotic.sync

// The offline write queue's records (CHT-1613). Everything the person does
// in the app (approve, reject, mark read, archive, comment, change a
// field) is first a [PendingWrite] in the cache's queue, and only then a
// request: the screens show the cache with the queue laid over it
// ([PendingOverlay]), and [WriteQueue] sends the queue in order whenever
// it can.

/** What a queued write does. The request, the overlay and the cache's update on success all follow from it. */
enum class WriteKind {
    /** One of an inbox entry's actions: complete a gate, or approve a review. */
    APPROVE,

    /** Reject a gate or review; [PendingWrite.value] is the reason. */
    REJECT,
    MARK_READ,
    ARCHIVE,

    /** Comment on [PendingWrite.issueId]; [PendingWrite.value] is the text. */
    COMMENT,

    /** Set one field of [PendingWrite.issueId]: [PendingWrite.field] to [PendingWrite.value]. */
    UPDATE_ISSUE,
}

/**
 * One write waiting to be sent.
 *
 * [key] is the client idempotency key, made once when the person acted and
 * sent with every attempt, so the server can tell a resend from a second
 * write (CHT-1621). Writes are sent in the order they were queued, each
 * no sooner than [notBeforeMillis]: a swipe waits out its undo window
 * there, and an undo deletes the write before it was ever sent.
 */
data class PendingWrite(
    val key: String,
    val kind: WriteKind,
    /** Where an inbox kind is POSTed (the entry's own action); the issue kinds' paths follow from [issueId]. */
    val path: String? = null,
    val entryId: String? = null,
    val issueId: String? = null,
    /** The team the issue is known in, for the issue the server answers with. */
    val teamId: String? = null,
    /** For [WriteKind.UPDATE_ISSUE]: `status`, `priority` or `assignee_id`. */
    val field: String? = null,
    /** The reason, the comment, or the field's new value (null to unassign). */
    val value: String? = null,
    /** How to show [value] while the write waits: the new assignee's name. */
    val valueLabel: String? = null,
    /** What the person did, in their words for a refusal: "Approve CHT-12". */
    val label: String,
    val createdAtMillis: Long,
    val notBeforeMillis: Long,
    /** Sends the server answered with a passing failure (a 5xx, a 429, an unreadable answer). */
    val attempts: Int = 0,
) {
    /**
     * Failed [WriteQueue.MAX_ATTEMPTS] times in a row: no longer sent on
     * its own, nor shown as done, until the person retries or discards it.
     * It holds back nothing behind it.
     */
    val stalled: Boolean get() = attempts >= WriteQueue.MAX_ATTEMPTS

    /**
     * Older than [WriteQueue.REPLAY_WINDOW_MILLIS] at [nowMillis]: too late
     * to send on its own, since it may already have been done.
     */
    fun tooOld(nowMillis: Long): Boolean = nowMillis - createdAtMillis >= WriteQueue.REPLAY_WINDOW_MILLIS

    /** What it is about, for keeping writes to the same thing in order. */
    val targets: List<String> get() = listOfNotNull(entryId?.let { "entry:$it" }, issueId?.let { "issue:$it" })

    /**
     * Whether this write, made after [earlier], makes it moot: a newer
     * value for the same field of the same issue, or a newer decision (or
     * mark-read) on the same entry. Sending [earlier] after this one would
     * undo what the person chose last. A comment supersedes nothing.
     */
    fun supersedes(earlier: PendingWrite): Boolean = when (kind) {
        WriteKind.COMMENT -> false

        WriteKind.UPDATE_ISSUE ->
            earlier.kind == WriteKind.UPDATE_ISSUE && earlier.issueId == issueId && earlier.field == field

        WriteKind.MARK_READ -> earlier.kind == WriteKind.MARK_READ && entryId != null && earlier.entryId == entryId

        WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE ->
            earlier.kind in DECISION_KINDS && entryId != null && earlier.entryId == entryId
    }

    private companion object {
        val DECISION_KINDS = setOf(WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE)
    }
}

/**
 * A write the server refused, kept until the person has seen it: the
 * write itself is gone from the queue and will not be retried (a sprint
 * in arrears or limbo, a gate someone else already decided, a field the
 * server would not take). A refused comment keeps its text in [value],
 * and a refused rejection its note (CHT-1683).
 */
data class WriteRefusal(
    val key: String,
    val kind: WriteKind,
    val label: String,
    val status: Int,
    val errorCode: String? = null,
    /** The server's explanation, when it gave one. */
    val message: String? = null,
    val entryId: String? = null,
    val issueId: String? = null,
    val atMillis: Long,
    val value: String? = null,
)

/** What a write the server took changes in the cache, in the transaction that drops it from the queue. */
sealed interface WriteEffect {
    /** The entry was decided or archived: it is no longer waiting. */
    data class DropEntry(val entryId: String) : WriteEffect

    data class MarkRead(val entryId: String) : WriteEffect

    /** The comment as stored, added to its issue if that is cached. */
    data class AddComment(val comment: Comment) : WriteEffect

    /** The issue as the server now has it, if it is cached (when it was last opened is kept). */
    data class UpdateIssue(val issue: Issue) : WriteEffect
}

/** Where the issue writes go, and which paths a write may go to at all. */
object WritePaths {
    /** The issue's path; for anything but an id, a path [isApiPath] refuses, so nothing is sent. */
    fun issue(issueId: String) = if (isId(issueId)) "/api/issues/$issueId" else NOWHERE

    fun comments(issueId: String) = if (isId(issueId)) "${issue(issueId)}/comments" else NOWHERE

    private const val NOWHERE = ""

    /**
     * An absolute path under `/api/` with nothing that could take it
     * anywhere else: no scheme or host, no `..` segment, no query or
     * fragment, no backslash or whitespace. The server sends inbox action
     * paths; the app checks them before ever sending a credential there.
     */
    fun isApiPath(path: String): Boolean = path.startsWith("/api/") &&
        path.none { it.isWhitespace() || it in FORBIDDEN } &&
        path.split('/').none { it == ".." || it == "." } &&
        !path.contains("//")

    private const val FORBIDDEN = "?#\\%"

    /** Whether [id] can be a path segment as it is: ids are UUIDs, so anything else is refused rather than escaped. */
    fun isId(id: String): Boolean = id.isNotEmpty() && id.all { it.isLetterOrDigit() || it == '-' || it == '_' }
}

/**
 * The cache as the person should see it while writes wait: what they did
 * shows at once, and goes away again if the write is undone or refused.
 * The cache itself only ever holds what the server said, so a refused
 * write needs no undoing there. A stalled write is not laid over: it is
 * not on its way, and the person is shown it to retry or discard.
 */
object PendingOverlay {
    private val DECIDED = setOf(WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE)

    /** [entries] without those decided or archived, and read where a mark-read waits. */
    fun inbox(entries: List<InboxEntry>, queued: List<PendingWrite>): List<InboxEntry> {
        val writes = queued.filterNot { it.stalled }
        if (writes.isEmpty()) return entries
        val gone = writes.filter { it.kind in DECIDED }.mapNotNullTo(HashSet()) { it.entryId }
        val read = writes.filter { it.kind == WriteKind.MARK_READ }.mapNotNullTo(HashSet()) { it.entryId }
        return entries.filter { it.id !in gone }.map { if (it.id in read && !it.read) it.copy(read = true) else it }
    }

    /**
     * [detail] with its waiting field changes applied in order, and its
     * waiting comments after the stored ones, by [me] and marked pending.
     */
    fun issue(detail: IssueDetail, writes: List<PendingWrite>, me: Principal?): IssueDetail {
        val mine = writes.filter { it.issueId == detail.issue.id && !it.stalled }
        if (mine.isEmpty()) return detail
        var issue = detail.issue
        mine.filter { it.kind == WriteKind.UPDATE_ISSUE }.forEach { issue = issue.with(it) }
        val comments = mine.filter { it.kind == WriteKind.COMMENT && it.value != null }.map {
            Comment(
                id = PENDING_PREFIX + it.key,
                issueId = detail.issue.id,
                author = me,
                content = it.value.orEmpty(),
                createdAtMillis = it.createdAtMillis,
                pending = true,
            )
        }
        return detail.copy(issue = issue, comments = detail.comments + comments)
    }

    private fun Issue.with(write: PendingWrite): Issue = when (write.field) {
        IssueFields.STATUS -> write.value?.let { copy(status = it) } ?: this
        IssueFields.PRIORITY -> write.value?.let { copy(priority = it) } ?: this
        IssueFields.ASSIGNEE -> copy(assignee = write.value?.let { Principal(it, write.valueLabel ?: it) })
        else -> this
    }

    const val PENDING_PREFIX = "pending:"
}

/** The issue fields the app changes, and the values it offers (the server's wire values, in its order). */
object IssueFields {
    const val STATUS = "status"
    const val PRIORITY = "priority"
    const val ASSIGNEE = "assignee_id"

    val STATUSES = listOf("backlog", "todo", "in_progress", "in_review", "done", "canceled")
    val PRIORITIES = listOf("no_priority", "low", "medium", "high", "urgent")
}

/**
 * At most [maxChars] UTF-16 units of this string, never ending on half of
 * a surrogate pair: a code point at the cut is dropped whole, not split
 * into an unpaired surrogate the server would refuse or mangle (CHT-1685).
 * Only code points are kept whole: a cluster such as a flag or a ZWJ
 * emoji can still be cut between its code points.
 */
fun String.takeWhole(maxChars: Int): String {
    val cut = take(maxChars)
    return if (cut.length < length && cut.isNotEmpty() && cut.last().isHighSurrogate()) cut.dropLast(1) else cut
}
