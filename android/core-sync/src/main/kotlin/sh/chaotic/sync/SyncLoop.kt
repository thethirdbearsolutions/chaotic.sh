package sh.chaotic.sync

import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.withTimeoutOrNull
import kotlin.random.Random

/**
 * When to sync the inbox next, from how the last run ended:
 *
 * - Synced: after [intervalMillis], or after the server's `retry_after`
 *   when that is longer (syncing sooner only returns the same rows). A run
 *   that stopped at its page cap with more to fetch goes on after
 *   [morePendingMillis].
 * - Failed: back off from [intervalMillis] doubling up to [maxBackoffMillis],
 *   with equal jitter, and never sooner than a `Retry-After` the server sent
 *   (believed up to [maxBackoffMillis]: a misconfigured proxy must not park
 *   the inbox for days).
 * - Unauthorized: stop; the session is ending and polling cannot help.
 *
 * A success resets the backoff. The schedule remembers when the next run
 * is due ([untilDue]), so a loop stopped and started again (the screen
 * left and came back) keeps the interval, the backoff and the server's
 * Retry-After rather than syncing at once. Not thread-safe: one loop at a
 * time.
 */
class PollSchedule(
    private val intervalMillis: Long = DEFAULT_INTERVAL_MILLIS,
    private val maxBackoffMillis: Long = DEFAULT_MAX_BACKOFF_MILLIS,
    private val random: Random = Random.Default,
    private val nowMillis: () -> Long = System::currentTimeMillis,
    private val morePendingMillis: Long = DEFAULT_MORE_PENDING_MILLIS,
) {
    private var failures = 0
    private var dueAtMillis = 0L

    /** Milliseconds until the next run is due; 0 when it is due now (as it is before the first). */
    fun untilDue(): Long = (dueAtMillis - nowMillis()).coerceAtLeast(0)

    /** Milliseconds until the next run, or null to stop polling (the next start then runs at once). */
    fun next(outcome: SyncOutcome): Long? {
        val delay = delayAfter(outcome)
        dueAtMillis = if (delay == null) 0 else nowMillis() + delay
        return delay
    }

    private fun delayAfter(outcome: SyncOutcome): Long? = when (outcome) {
        is SyncOutcome.Synced -> {
            failures = 0
            if (outcome.morePending) {
                morePendingMillis
            } else {
                maxOf(intervalMillis, (outcome.retryAfterSeconds ?: 0) * MILLIS_PER_SECOND)
            }
        }

        SyncOutcome.Unauthorized -> {
            failures = 0
            null
        }

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

        /** A short pause between runs while a backlog drains, so one run never holds the lock for long. */
        const val DEFAULT_MORE_PENDING_MILLIS = 1_000L
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
 * The foreground inbox poll: wait until [schedule] says a run is due (or
 * [trigger] fires), sync, repeat. Run it in a coroutine tied to the app
 * being on screen, with a [schedule] that outlives it; it returns when
 * the session is refused, and otherwise runs until cancelled.
 * [onOutcome] sees every run's result, for the UI's error line.
 */
class SyncLoop(
    private val syncer: InboxSyncer,
    private val schedule: PollSchedule = PollSchedule(),
    private val trigger: SyncTrigger,
    private val onOutcome: suspend (SyncOutcome) -> Unit = {},
) {
    suspend fun run() {
        while (true) {
            val wait = schedule.untilDue()
            if (wait > 0) trigger.await(wait)
            val outcome = syncer.sync()
            onOutcome(outcome)
            schedule.next(outcome) ?: return
        }
    }
}
