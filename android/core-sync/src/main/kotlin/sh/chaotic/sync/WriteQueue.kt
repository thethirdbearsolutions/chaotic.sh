package sh.chaotic.sync

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import java.util.UUID

/** How a [WriteQueue.flush] ended. */
sealed interface FlushOutcome {
    /**
     * Every write that was due went out (and was taken or refused).
     * [nextDueInMillis] is how long until the next waiting one is due (an
     * undo window still open), or null when the queue is empty.
     */
    data class Done(val nextDueInMillis: Long?) : FlushOutcome

    /**
     * A write could not be sent (offline, a server error, an answer that
     * could not be read): it and everything after it stay queued, in
     * order. Try again in [afterMillis].
     */
    data class Retry(val afterMillis: Long) : FlushOutcome

    /** Nobody is signed in any more (or someone else is): nothing more is sent. */
    data object Unauthorized : FlushOutcome
}

/**
 * The offline write queue (CHT-1613). The person's actions are queued in
 * the cache through [session], so they belong to whoever is signed in and
 * go when that person signs out; [flush] sends them in the order they
 * were made.
 *
 * Every write carries a client key, sent as its Idempotency-Key, so a
 * resend after a lost answer is not a second write once the server
 * honours the header (CHT-1621). What happens to a write depends on the
 * answer:
 *
 * - 2xx: taken. Dropped from the queue, and the answer applied to the
 *   cache in the same transaction (an approved entry leaves the inbox; an
 *   updated issue is saved as the server now has it).
 * - 401: the session ended; nothing more is sent.
 * - 408, 425, 429 or 5xx, no answer, or an unreadable one: not taken, as
 *   far as the app can tell. It stays first in line, and the flush stops
 *   so later writes to the same thing cannot overtake it.
 * - Any other 4xx: refused (arrears, limbo, someone else already decided
 *   the gate, a value the server will not take). Dropped and kept as a
 *   [WriteRefusal] with the server's reason, never retried. A mark-read or
 *   archive of an entry that is gone (404) is dropped quietly: there is
 *   nothing left to tell the person.
 *
 * One flush at a time; [undo] never removes a write while it is being sent.
 */
@Suppress("TooManyFunctions") // one entry point per thing a person can do, and the flush
class WriteQueue(
    private val remote: ChaoticRemote,
    private val session: CacheSession,
    private val nowMillis: () -> Long = System::currentTimeMillis,
    private val newKey: () -> String = { UUID.randomUUID().toString() },
) {
    private val flushing = Mutex()

    /** Guards [sending]: an undo and the flush's pick of the next write agree on which one is in flight. */
    private val picking = Mutex()
    private var sending: String? = null
    private var failures = 0

    // What a person can do. Each returns the write's key (for an undo), or
    // null when there is nothing to do: the server did not offer that
    // action, it is already queued, or nobody is signed in.

    /** Approve a gate or review entry, after [undoMillis]. */
    suspend fun approve(entry: InboxEntry, undoMillis: Long = UNDO_MILLIS): String? {
        val action = entry.action(InboxAction.APPROVE) ?: return null
        return decide(entry, WriteKind.APPROVE, action, value = null, undoMillis)
    }

    /** Reject a gate or review entry with [note], which the server requires, after [undoMillis]. */
    @Suppress("ReturnCount") // each reason not to queue is an early null
    suspend fun reject(entry: InboxEntry, note: String, undoMillis: Long = UNDO_MILLIS): String? {
        val reason = note.trim().takeIf { it.isNotEmpty() }?.take(MAX_NOTE_CHARS) ?: return null
        val action = entry.action(InboxAction.REJECT) ?: return null
        return decide(entry, WriteKind.REJECT, action, reason, undoMillis)
    }

    suspend fun archive(entry: InboxEntry, undoMillis: Long = UNDO_MILLIS): String? {
        val action = entry.action(InboxAction.ARCHIVE) ?: return null
        return decide(entry, WriteKind.ARCHIVE, action, value = null, undoMillis)
    }

    /** Mark an unread entry read: on opening it (no undo), or by a swipe. */
    @Suppress("ReturnCount") // each reason not to queue is an early null
    suspend fun markRead(entry: InboxEntry, undoMillis: Long = 0): String? {
        if (entry.read) return null
        val action = entry.action(InboxAction.MARK_READ) ?: return null
        return queue(
            entry.pendingWrite(WriteKind.MARK_READ, action, value = null, undoMillis),
        ) { queued -> queued.none { it.entryId == entry.id && it.kind == WriteKind.MARK_READ } }
    }

    @Suppress("ReturnCount") // each reason not to queue is an early null
    suspend fun comment(issue: Issue, content: String): String? {
        val text = content.trim().takeIf { it.isNotEmpty() } ?: return null
        if (!WritePaths.isId(issue.id)) return null
        val now = nowMillis()
        return queue(
            PendingWrite(
                key = newKey(),
                kind = WriteKind.COMMENT,
                issueId = issue.id,
                teamId = issue.teamId,
                value = text,
                label = issue.identifier,
                createdAtMillis = now,
                notBeforeMillis = now,
            ),
        )
    }

    /**
     * Set [field] (one of [IssueFields]) of [issue] to [value]; null
     * unassigns. [valueLabel] is how to show the value meanwhile (the
     * assignee's name).
     */
    suspend fun update(issue: Issue, field: String, value: String?, valueLabel: String? = null): String? {
        val allowed = when (field) {
            IssueFields.STATUS -> value in IssueFields.STATUSES
            IssueFields.PRIORITY -> value in IssueFields.PRIORITIES
            IssueFields.ASSIGNEE -> true
            else -> false
        }
        if (!allowed || !WritePaths.isId(issue.id)) return null
        val now = nowMillis()
        return queue(
            PendingWrite(
                key = newKey(),
                kind = WriteKind.UPDATE_ISSUE,
                issueId = issue.id,
                teamId = issue.teamId,
                field = field,
                value = value,
                valueLabel = valueLabel,
                label = issue.identifier,
                createdAtMillis = now,
                notBeforeMillis = now,
            ),
        )
    }

    /** Take back [key] before it is sent; false when it is being sent, or already was. */
    suspend fun undo(key: String): Boolean = picking.withLock {
        if (sending == key) return@withLock false
        val ticket = session.begin() ?: return@withLock false
        session.write(ticket) { removeWrite(key) } ?: false
    }

    suspend fun dismissRefusal(key: String) {
        val ticket = session.begin() ?: return
        session.write(ticket) { dismissRefusal(key) }
    }

    /** Send every write that is due, in order. See the class comment for what each answer does. */
    suspend fun flush(): FlushOutcome = flushing.withLock {
        val ticket = session.begin() ?: return@withLock FlushOutcome.Unauthorized
        var outcome: FlushOutcome? = null
        while (outcome == null) outcome = flushOne(ticket)
        outcome
    }

    /** Send the first due write; null to go on, else how the flush ends. */
    @Suppress("ReturnCount") // signed out, nothing due, and an undo each end this step early
    private suspend fun flushOne(ticket: Long): FlushOutcome? {
        val now = nowMillis()
        val queued = session.write(ticket) { pendingWrites() } ?: return FlushOutcome.Unauthorized
        val next = queued.firstOrNull { it.notBeforeMillis <= now }
            ?: return FlushOutcome.Done(queued.minOfOrNull { it.notBeforeMillis - now })
        val picked = pick(ticket, next.key) ?: return FlushOutcome.Unauthorized
        if (!picked) return null // undone between the read and the pick
        return try {
            send(ticket, next)
        } finally {
            picking.withLock { sending = null }
        }
    }

    /** Mark [key] as being sent, if it is still queued: true when it is, null when signed out. */
    private suspend fun pick(ticket: Long, key: String): Boolean? = picking.withLock {
        val still = session.write(ticket) { pendingWrites().any { it.key == key } } ?: return@withLock null
        if (still) sending = key
        still
    }

    /** Send one write and record its answer; null to go on with the next, else how the flush ends. */
    private suspend fun send(ticket: Long, write: PendingWrite): FlushOutcome? {
        val result = request(write)
        if (result is Remote.Ok) {
            failures = 0
            val written = session.write(ticket) { completeWrite(write.key, effect(write, result.value)) }
            return if (written == null) FlushOutcome.Unauthorized else null
        }
        val error = result as Remote.Failure
        return when {
            error is Remote.HttpError && error.status == HTTP_UNAUTHORIZED -> FlushOutcome.Unauthorized

            error is Remote.HttpError && !error.isTransient() -> {
                failures = 0
                val written = session.write(ticket) {
                    if (error.isQuietDrop(write)) {
                        completeWrite(write.key, effect = null)
                    } else {
                        refuseWrite(refusal(write, error))
                    }
                }
                if (written == null) FlushOutcome.Unauthorized else null
            }

            else -> FlushOutcome.Retry(backoff((error as? Remote.HttpError)?.retryAfterMillis ?: 0))
        }
    }

    private suspend fun request(write: PendingWrite): Remote<Any?> = when (write.kind) {
        WriteKind.APPROVE, WriteKind.ARCHIVE, WriteKind.MARK_READ ->
            remote.act(write.path.orEmpty(), JsonObject(emptyMap()), write.key)

        WriteKind.REJECT -> remote.act(write.path.orEmpty(), buildJsonObject { put("note", write.value) }, write.key)

        WriteKind.COMMENT -> remote.addComment(write.issueId.orEmpty(), write.value.orEmpty(), write.key)

        WriteKind.UPDATE_ISSUE -> {
            val value = write.value?.let(::JsonPrimitive) ?: JsonNull
            remote.updateIssue(
                write.issueId.orEmpty(),
                write.teamId.orEmpty(),
                JsonObject(mapOf(write.field.orEmpty() to value)),
                write.key,
            )
        }
    }

    private fun effect(write: PendingWrite, answer: Any?): WriteEffect? = when (write.kind) {
        WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE -> write.entryId?.let(WriteEffect::DropEntry)
        WriteKind.MARK_READ -> write.entryId?.let(WriteEffect::MarkRead)
        WriteKind.COMMENT -> (answer as? Comment)?.let(WriteEffect::AddComment)
        WriteKind.UPDATE_ISSUE -> (answer as? Issue)?.let(WriteEffect::UpdateIssue)
    }

    private fun refusal(write: PendingWrite, error: Remote.HttpError) = WriteRefusal(
        key = write.key,
        kind = write.kind,
        label = write.label,
        status = error.status,
        errorCode = error.errorCode,
        message = error.message,
        entryId = write.entryId,
        issueId = write.issueId,
        atMillis = nowMillis(),
    )

    /** Doubling from [FIRST_RETRY_MILLIS] to [MAX_RETRY_MILLIS], and never sooner than the server asked. */
    private fun backoff(retryAfterMillis: Long): Long {
        val doubled = FIRST_RETRY_MILLIS shl failures.coerceAtMost(MAX_DOUBLINGS)
        failures++
        return maxOf(doubled.coerceAtMost(MAX_RETRY_MILLIS), retryAfterMillis.coerceAtMost(MAX_RETRY_MILLIS))
    }

    private suspend fun decide(
        entry: InboxEntry,
        kind: WriteKind,
        action: InboxAction,
        value: String?,
        undoMillis: Long,
    ): String? = queue(entry.pendingWrite(kind, action, value, undoMillis)) { queued ->
        // One decision per entry: a second swipe while the first waits is not a second request.
        queued.none { it.entryId == entry.id && it.kind in DECISIONS }
    }

    private fun InboxEntry.pendingWrite(
        kind: WriteKind,
        action: InboxAction,
        value: String?,
        undoMillis: Long,
    ): PendingWrite {
        val now = nowMillis()
        return PendingWrite(
            key = newKey(),
            kind = kind,
            path = action.path,
            entryId = id,
            issueId = issueId,
            teamId = teamId,
            value = value,
            label = issueIdentifier ?: documentTitle ?: title,
            createdAtMillis = now,
            notBeforeMillis = now + undoMillis.coerceAtLeast(0),
        )
    }

    /** Queue [write] when [allowed] by what is already queued; its key, or null. */
    private suspend fun queue(write: PendingWrite, allowed: (List<PendingWrite>) -> Boolean = { true }): String? {
        val ticket = session.begin() ?: return null
        val queued = session.write(ticket) {
            val ok = allowed(pendingWrites())
            if (ok) queueWrite(write)
            ok
        }
        return write.key.takeIf { queued == true }
    }

    companion object {
        /** How long a swipe can be undone before it is sent. */
        const val UNDO_MILLIS = 4_000L

        /** Refusals kept for the person to see; older ones are dropped. */
        const val MAX_REFUSALS = 50

        /** The server's limit on a rejection's reason. */
        const val MAX_NOTE_CHARS = 10_000

        const val FIRST_RETRY_MILLIS = 5_000L
        const val MAX_RETRY_MILLIS = 15 * 60_000L
        private const val MAX_DOUBLINGS = 10
        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_NOT_FOUND = 404
        private const val HTTP_TIMEOUT = 408
        private const val HTTP_TOO_EARLY = 425
        private const val HTTP_TOO_MANY = 429
        private const val HTTP_SERVER = 500

        private val DECISIONS = setOf(WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE)

        private fun Remote.HttpError.isTransient() =
            status >= HTTP_SERVER || status == HTTP_TIMEOUT || status == HTTP_TOO_EARLY || status == HTTP_TOO_MANY

        private fun Remote.HttpError.isQuietDrop(write: PendingWrite) =
            status == HTTP_NOT_FOUND && (write.kind == WriteKind.MARK_READ || write.kind == WriteKind.ARCHIVE)
    }
}
