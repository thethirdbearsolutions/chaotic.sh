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
     * The server could not be reached at all (offline): every write
     * stays queued, in order, and none is counted as a failed attempt. Try
     * again in [afterMillis].
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
 * - 401: the session ended (or someone else is signed in now); nothing
 *   more is sent.
 * - No answer, and the server does not answer a probe either
 *   ([ChaoticRemote.reachable]): offline. The flush stops, every write
 *   stays where it is, and nothing counts against them.
 * - No answer while the server answers the probe (this write times out,
 *   or its connection is reset), 408, 425, 429 or 5xx, or an answer that
 *   cannot be read: not taken, as far as the app can tell. That write
 *   waits (doubling from [FIRST_RETRY_MILLIS], never sooner than
 *   Retry-After), later writes
 *   about the same entry or issue wait behind it so they cannot overtake
 *   it, and the flush goes on with everything else. After
 *   [MAX_ATTEMPTS] such failures in a row the write is
 *   [PendingWrite.stalled]: no longer sent or shown as done, and it holds
 *   nothing back, until the person retries ([retry]) or discards ([undo])
 *   it. One write the server always fails can never block the rest. A
 *   write that a newer one supersedes ([PendingWrite.supersedes]) is
 *   dropped instead of stalling, and a stalled one is dropped when a
 *   newer one is queued, so a retry never undoes the newer change.
 * - 409 `idempotency_in_flight`: the server is still doing this write
 *   from an earlier send whose answer was lost. Waits and goes again, as
 *   for a 429; the next send gets that earlier send's answer.
 * - Any other 4xx: refused (arrears, limbo, someone else already decided
 *   the gate, a value the server will not take, or 409
 *   `idempotency_key_expired`: the write was done long ago and its answer
 *   is gone). Dropped and kept as a [WriteRefusal] with the server's
 *   reason, never retried. A mark-read or archive of an entry that is
 *   gone (404) is dropped quietly: there is nothing left to tell the
 *   person.
 *
 * The server replays a key's answer for 24 hours, and after that only
 * says the write was already done (for 30 days; see the server's
 * app/api/idempotency.py). So a write older than [REPLAY_WINDOW_MILLIS]
 * (counted from when the person acted, which is no later than its first
 * send) is not sent on its own: it may already have been done, and a
 * status change sent that late could undo a newer one. It stalls, and
 * [retry] refuses it with that explanation; the person discards it, or
 * does it again (a new write, with a new key).
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
        ) { queued -> queued.none { it.entryId == entry.id && it.kind == WriteKind.MARK_READ && !it.stalled } }
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

    /**
     * Take back [key] before it is sent, or discard a stalled write; false
     * when it is being sent, or already was.
     */
    suspend fun undo(key: String): Boolean = picking.withLock {
        if (sending == key) return@withLock false
        val ticket = session.begin() ?: return@withLock false
        session.write(ticket) { removeWrite(key) } ?: false
    }

    /**
     * Send [key] again from scratch (a stalled write the person still
     * wants); false when it is gone. A write something later supersedes
     * ([PendingWrite.supersedes]) is dropped instead, so a retry never
     * undoes a newer change.
     */
    suspend fun retry(key: String): Boolean {
        val ticket = session.begin() ?: return false
        return session.write(ticket) {
            val queued = pendingWrites()
            val write = queued.firstOrNull { it.key == key }
            when {
                write == null -> false

                superseded(write, queued) -> removeWrite(key).let { false }

                // Too late to send safely (the class comment): refused here, with why.
                write.tooOld(nowMillis()) -> refuseWrite(tooOldRefusal(write)).let { false }

                else -> rescheduleWrite(key, attempts = 0, notBeforeMillis = nowMillis())
            }
        } ?: false
    }

    suspend fun dismissRefusal(key: String) {
        val ticket = session.begin() ?: return
        session.write(ticket) { dismissRefusal(key) }
    }

    /** Send every write that is due, in order. See the class comment for what each answer does. */
    suspend fun flush(): FlushOutcome = flushing.withLock {
        val ticket = session.begin() ?: return@withLock FlushOutcome.Unauthorized
        val owner = session.ownerOf(ticket) ?: return@withLock FlushOutcome.Unauthorized
        session.write(ticket) { stallTooOld(nowMillis()) } ?: return@withLock FlushOutcome.Unauthorized
        val tried = HashSet<String>()
        var outcome: FlushOutcome? = null
        while (outcome == null) outcome = flushOne(ticket, owner, tried)
        outcome
    }

    /** Send the next write that may go; null to go on, else how the flush ends. */
    @Suppress("ReturnCount") // signed out, nothing due, and an undo each end this step early
    private suspend fun flushOne(ticket: Long, owner: String, tried: MutableSet<String>): FlushOutcome? {
        val now = nowMillis()
        val queued = session.write(ticket) { pendingWrites() } ?: return FlushOutcome.Unauthorized
        val next = nextToSend(queued, now, tried) ?: return FlushOutcome.Done(nextDueInMillis(queued, now))
        tried += next.key
        val picked = pick(ticket, next.key) ?: return FlushOutcome.Unauthorized
        if (!picked) return null // undone between the read and the pick
        return try {
            send(ticket, next, WriteOrigin(next.key, owner))
        } finally {
            picking.withLock { sending = null }
        }
    }

    /**
     * The first write that is due and has nothing earlier about the same
     * entry or issue still waiting: those keep their order. A stalled
     * write is skipped and holds nothing back.
     */
    private fun nextToSend(queued: List<PendingWrite>, now: Long, tried: Set<String>): PendingWrite? {
        val held = HashSet<String>()
        for (write in queued) {
            if (write.stalled) continue
            val free = write.key !in tried && write.notBeforeMillis <= now && write.targets.none { it in held }
            if (free) return write
            held += write.targets
        }
        return null
    }

    /** How long until a waiting write is due: null when none is (empty, or only stalled ones). */
    private fun nextDueInMillis(queued: List<PendingWrite>, now: Long): Long? =
        queued.filter { !it.stalled && it.notBeforeMillis > now }.minOfOrNull { it.notBeforeMillis - now }

    /** Mark [key] as being sent, if it is still queued: true when it is, null when signed out. */
    private suspend fun pick(ticket: Long, key: String): Boolean? = picking.withLock {
        val still = session.write(ticket) { pendingWrites().any { it.key == key } } ?: return@withLock null
        if (still) sending = key
        still
    }

    /** Send one write and record its answer; null to go on with the next, else how the flush ends. */
    private suspend fun send(ticket: Long, write: PendingWrite, origin: WriteOrigin): FlushOutcome? {
        val result = request(write, origin)
        val stop = stopsTheFlush(result)
        if (stop != null) return stop
        failures = 0
        val written = session.write(ticket) { record(write, result) }
        return if (written == null) FlushOutcome.Unauthorized else null
    }

    /**
     * An answer that ends the flush before anything is recorded: signed
     * out, or offline. A write that got no answer while the server answers
     * a probe is not offline: that write cannot get through (it times out,
     * or its connection is reset), so it counts as a failed attempt and
     * the flush goes on with the rest (CHT-1670).
     */
    private suspend fun stopsTheFlush(result: Remote<Any?>): FlushOutcome? = when {
        result is Remote.HttpError && result.status == HTTP_UNAUTHORIZED -> FlushOutcome.Unauthorized

        // Nothing answers at all: offline, so it says nothing about this write.
        result is Remote.Unreachable && !remote.reachable() -> FlushOutcome.Retry(offlineBackoff())

        else -> null
    }

    /** Record the server's answer to [write]: done, refused, or to be tried again later. */
    private suspend fun CacheStore.record(write: PendingWrite, result: Remote<Any?>) {
        when {
            result is Remote.Ok -> completeWrite(write.key, effect(write, result.value))

            result is Remote.HttpError && !result.isTransient() ->
                if (result.isQuietDrop(write)) {
                    completeWrite(write.key, effect = null)
                } else {
                    refuseWrite(refusal(write, result))
                }

            else -> {
                val attempts = write.attempts + 1
                val wait = retryDelay(attempts, (result as? Remote.HttpError)?.retryAfterMillis ?: 0)
                // A write that stalls while a newer one replaces it is dropped: the newer one goes instead.
                val moot = attempts >= MAX_ATTEMPTS && superseded(write, pendingWrites())
                if (moot) removeWrite(write.key) else rescheduleWrite(write.key, attempts, nowMillis() + wait)
            }
        }
    }

    /**
     * Stall every write too old to send on its own (the class comment),
     * or drop it when a newer one supersedes it, as a stalled write is.
     */
    private suspend fun CacheStore.stallTooOld(now: Long) {
        val queued = pendingWrites()
        for (write in queued.filter { !it.stalled && it.tooOld(now) }) {
            if (superseded(write, queued)) {
                removeWrite(write.key)
            } else {
                rescheduleWrite(write.key, MAX_ATTEMPTS, write.notBeforeMillis)
            }
        }
    }

    private fun tooOldRefusal(write: PendingWrite) = WriteRefusal(
        key = write.key,
        kind = write.kind,
        label = write.label,
        status = HTTP_CONFLICT,
        errorCode = TOO_OLD,
        message = TOO_OLD_MESSAGE,
        entryId = write.entryId,
        issueId = write.issueId,
        atMillis = nowMillis(),
        value = write.value.takeIf { write.kind == WriteKind.COMMENT },
    )

    /** Whether a write queued after [write] supersedes it. */
    private fun superseded(write: PendingWrite, queued: List<PendingWrite>): Boolean =
        queued.dropWhile { it.key != write.key }.drop(1).any { it.supersedes(write) }

    private suspend fun request(write: PendingWrite, origin: WriteOrigin): Remote<Any?> = when (write.kind) {
        WriteKind.APPROVE, WriteKind.ARCHIVE, WriteKind.MARK_READ ->
            remote.act(write.path.orEmpty(), JsonObject(emptyMap()), origin)

        WriteKind.REJECT -> remote.act(write.path.orEmpty(), buildJsonObject { put("note", write.value) }, origin)

        WriteKind.COMMENT -> remote.addComment(write.issueId.orEmpty(), write.value.orEmpty(), origin)

        WriteKind.UPDATE_ISSUE -> {
            val value = write.value?.let(::JsonPrimitive) ?: JsonNull
            remote.updateIssue(
                write.issueId.orEmpty(),
                write.teamId.orEmpty(),
                JsonObject(mapOf(write.field.orEmpty() to value)),
                origin,
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
        // What the person wrote is not lost with the comment.
        value = write.value.takeIf { write.kind == WriteKind.COMMENT },
    )

    /** Offline: doubling from [FIRST_RETRY_MILLIS] to [MAX_RETRY_MILLIS] while nothing answers. */
    private fun offlineBackoff(): Long {
        val doubled = FIRST_RETRY_MILLIS shl failures.coerceAtMost(MAX_DOUBLINGS)
        failures++
        return doubled.coerceAtMost(MAX_RETRY_MILLIS)
    }

    private suspend fun decide(
        entry: InboxEntry,
        kind: WriteKind,
        action: InboxAction,
        value: String?,
        undoMillis: Long,
    ): String? = queue(entry.pendingWrite(kind, action, value, undoMillis)) { queued ->
        // One decision per entry: a second swipe while the first waits is not a second request.
        // A stalled one is not on its way, so it does not stand in for a new one.
        queued.none { it.entryId == entry.id && it.kind in DECISIONS && !it.stalled }
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
            val before = pendingWrites()
            val ok = allowed(before)
            if (ok) {
                queueWrite(write)
                // A stalled write this one replaces would only undo it if retried.
                before.filter { it.stalled && write.supersedes(it) }.forEach { removeWrite(it.key) }
            }
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

        /**
         * How old a write may be and still be sent on its own (the class
         * comment). Shorter than the server's 24-hour replay window, so a
         * resend is always within it.
         */
        const val REPLAY_WINDOW_MILLIS = 23 * 60 * 60_000L

        /** The [WriteRefusal.errorCode] of a write [retry] refused as too old. */
        const val TOO_OLD = "write_too_old"
        const val TOO_OLD_MESSAGE =
            "This is more than a day old and may already have been done, so it was not sent. " +
                "Do it again if it is still needed."

        /** The server's answer while it is still doing an earlier send of the same write. */
        const val IN_FLIGHT = "idempotency_in_flight"

        const val FIRST_RETRY_MILLIS = 5_000L
        const val MAX_RETRY_MILLIS = 15 * 60_000L

        /**
         * Failed sends in a row (each answered, but not taken) before a
         * write stalls: with the doubling waits, about half an hour of a
         * server that keeps failing it.
         */
        const val MAX_ATTEMPTS = 10
        private const val MAX_DOUBLINGS = 10

        /**
         * How long a write waits after its [attempts]th failure: doubling
         * from [FIRST_RETRY_MILLIS] to [MAX_RETRY_MILLIS], and never sooner
         * than the server asked.
         */
        fun retryDelay(attempts: Int, retryAfterMillis: Long): Long {
            val doubled = FIRST_RETRY_MILLIS shl (attempts - 1).coerceIn(0, MAX_DOUBLINGS)
            return maxOf(doubled.coerceAtMost(MAX_RETRY_MILLIS), retryAfterMillis.coerceAtMost(MAX_RETRY_MILLIS))
        }
        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_NOT_FOUND = 404
        private const val HTTP_CONFLICT = 409
        private const val HTTP_TIMEOUT = 408
        private const val HTTP_TOO_EARLY = 425
        private const val HTTP_TOO_MANY = 429
        private const val HTTP_SERVER = 500

        private val DECISIONS = setOf(WriteKind.APPROVE, WriteKind.REJECT, WriteKind.ARCHIVE)

        private fun Remote.HttpError.isTransient() =
            status >= HTTP_SERVER || status == HTTP_TIMEOUT || status == HTTP_TOO_EARLY || status == HTTP_TOO_MANY ||
                (status == HTTP_CONFLICT && errorCode == IN_FLIGHT)

        private fun Remote.HttpError.isQuietDrop(write: PendingWrite) =
            status == HTTP_NOT_FOUND && (write.kind == WriteKind.MARK_READ || write.kind == WriteKind.ARCHIVE)
    }
}
