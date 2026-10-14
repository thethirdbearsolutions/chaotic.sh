package sh.chaotic.sync

import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.withTimeoutOrNull
import kotlin.random.Random

/**
 * When to sync the inbox next, from how the last run ended:
 *
 * - Synced: after [intervalMillis], or after the server's `retry_after`
 *   when that is longer (syncing sooner only returns the same rows).
 * - Failed: back off from [intervalMillis] doubling up to [maxBackoffMillis],
 *   with equal jitter, and never sooner than a `Retry-After` the server sent
 *   (believed up to [maxBackoffMillis]: a misconfigured proxy must not park
 *   the inbox for days).
 * - Unauthorized: stop; the session is ending and polling cannot help.
 *
 * A success resets the backoff. Not thread-safe: one per [SyncLoop].
 */
class PollSchedule(
    private val intervalMillis: Long = DEFAULT_INTERVAL_MILLIS,
    private val maxBackoffMillis: Long = DEFAULT_MAX_BACKOFF_MILLIS,
    private val random: Random = Random.Default,
) {
    private var failures = 0

    /** Milliseconds until the next run, or null to stop polling. */
    fun next(outcome: SyncOutcome): Long? = when (outcome) {
        is SyncOutcome.Synced -> {
            failures = 0
            maxOf(intervalMillis, (outcome.retryAfterSeconds ?: 0) * MILLIS_PER_SECOND)
        }

        SyncOutcome.Unauthorized -> null

        is SyncOutcome.Failed -> {
            val ceiling = (intervalMillis shl failures.coerceAtMost(MAX_DOUBLINGS)).coerceAtMost(maxBackoffMillis)
            failures++
            val backoff = ceiling / 2 + random.nextLong(ceiling / 2 + 1)
            maxOf(backoff, outcome.retryAfterMillis.coerceAtMost(maxBackoffMillis))
        }
    }

    companion object {
        /** A minute between foreground polls; push (CHT-1612) and /ws make it sooner. */
        const val DEFAULT_INTERVAL_MILLIS = 60_000L
        const val DEFAULT_MAX_BACKOFF_MILLIS = 15 * 60_000L
        private const val MAX_DOUBLINGS = 10
        private const val MILLIS_PER_SECOND = 1_000L
    }
}

/**
 * Asks the running [SyncLoop] to sync now instead of at its next poll.
 * The seam for everything that knows the inbox changed before the poll
 * does: pull to refresh today, the /ws client and push messages later.
 * Requests made while a sync is running coalesce into one more run.
 */
class SyncTrigger {
    private val requests = Channel<Unit>(Channel.CONFLATED)

    fun requestNow() {
        requests.trySend(Unit)
    }

    internal suspend fun await(timeoutMillis: Long): Boolean = withTimeoutOrNull(timeoutMillis) {
        requests.receive()
        true
    } ?: false
}

/**
 * The foreground inbox poll: sync, wait as [schedule] says or until
 * [trigger] fires, repeat. Run it in a coroutine tied to the app being
 * on screen; it returns when the session is refused, and otherwise runs
 * until cancelled. [onOutcome] sees every run's result, for the UI's
 * refresh indicator and error line.
 */
class SyncLoop(
    private val syncer: InboxSyncer,
    private val schedule: PollSchedule = PollSchedule(),
    private val trigger: SyncTrigger,
    private val onOutcome: suspend (SyncOutcome) -> Unit = {},
) {
    suspend fun run() {
        while (true) {
            val outcome = syncer.sync()
            onOutcome(outcome)
            val delayMillis = schedule.next(outcome) ?: return
            trigger.await(delayMillis)
        }
    }
}
