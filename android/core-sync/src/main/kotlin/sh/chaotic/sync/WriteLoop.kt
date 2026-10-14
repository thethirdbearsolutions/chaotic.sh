package sh.chaotic.sync

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.withTimeoutOrNull

/**
 * Keeps a write queue going while the process lives (CHT-1613): [run]
 * flushes once at once, then whenever [request] is called (something was
 * queued, the person signed in, an undo window closed) and whenever the
 * last flush said something will be due.
 *
 * It never parks for good on a passing failure. A flush that throws is
 * tried again after a backoff ([ERROR_RETRY_MILLIS] doubling), like one
 * that could not reach the server. Only signed out, or nothing left to
 * send, does it wait for the next [request].
 */
class WriteLoop(private val flush: suspend () -> FlushOutcome, private val onError: (Exception) -> Unit = {}) {
    private val requests = Channel<Unit>(Channel.CONFLATED)

    /** Flush as soon as the loop is free; requests made meanwhile count as one. */
    fun request() {
        requests.trySend(Unit)
    }

    /** Runs until cancelled. */
    @Suppress("TooGenericExceptionCaught") // any failure of a flush is retried, never the end of the loop
    suspend fun run() {
        var wait: Long? = 0
        var errors = 0
        while (true) {
            when (val due = wait) {
                null -> requests.receive()
                0L -> Unit
                else -> withTimeoutOrNull(due) { requests.receive() }
            }
            wait = try {
                next(flush()).also { errors = 0 }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                onError(e)
                errorDelay(errors++)
            }
        }
    }

    private fun next(outcome: FlushOutcome): Long? = when (outcome) {
        is FlushOutcome.Done -> outcome.nextDueInMillis
        is FlushOutcome.Retry -> outcome.afterMillis
        FlushOutcome.Unauthorized -> null
    }

    companion object {
        const val ERROR_RETRY_MILLIS = 5_000L
        private const val MAX_DOUBLINGS = 8

        fun errorDelay(errors: Int): Long =
            (ERROR_RETRY_MILLIS shl errors.coerceAtMost(MAX_DOUBLINGS)).coerceAtMost(WriteQueue.MAX_RETRY_MILLIS)
    }
}
