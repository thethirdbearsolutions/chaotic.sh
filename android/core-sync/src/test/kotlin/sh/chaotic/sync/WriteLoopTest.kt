package sh.chaotic.sync

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalCoroutinesApi::class)
class WriteLoopTest {
    private val outcomes = ArrayDeque<() -> FlushOutcome>()
    private var flushes = 0
    private val errors = mutableListOf<Exception>()
    private val loop = WriteLoop(
        flush = {
            flushes++
            outcomes.removeFirstOrNull()?.invoke() ?: FlushOutcome.Done(null)
        },
        onError = { errors += it },
    )

    private fun TestScope.started() {
        backgroundScope.launch { loop.run() }
        runCurrent()
    }

    @Test
    fun itFlushesAtOnceThenWaitsForARequest() = runTest {
        started()
        assertEquals(1, flushes)

        advanceTimeBy(60 * 60_000L)
        assertEquals(1, flushes)

        loop.request()
        runCurrent()
        assertEquals(2, flushes)
    }

    @Test
    fun itFlushesAgainWhenSomethingFallsDue() = runTest {
        outcomes += { FlushOutcome.Done(WriteQueue.UNDO_MILLIS) }
        started()

        advanceTimeBy(WriteQueue.UNDO_MILLIS - 1)
        assertEquals(1, flushes)
        advanceTimeBy(2)
        assertEquals(2, flushes)
    }

    @Test
    fun signedOutItWaitsUntilAskedAgain() = runTest {
        // A cold start: the session is still loading, so the first flush finds nobody.
        outcomes += { FlushOutcome.Unauthorized }
        started()
        advanceTimeBy(60 * 60_000L)
        assertEquals(1, flushes)

        loop.request() // signed in
        runCurrent()
        assertEquals(2, flushes)
    }

    @Test
    fun aFlushThatThrowsIsTriedAgainNotTheEndOfTheLoop() = runTest {
        outcomes += { throw IllegalStateException("disk full") }
        outcomes += { throw IllegalStateException("disk full") }
        started()
        assertEquals(1, errors.size)

        advanceTimeBy(WriteLoop.ERROR_RETRY_MILLIS + 1)
        assertEquals(2, flushes)
        // Backing off: the next try is twice as far.
        advanceTimeBy(WriteLoop.ERROR_RETRY_MILLIS * 2 + 1)
        assertEquals(3, flushes)
        assertEquals(2, errors.size)
    }

    @Test
    fun offlineItRetriesAfterTheQueuesBackoff() = runTest {
        outcomes += { FlushOutcome.Retry(30_000) }
        started()

        advanceTimeBy(30_001)

        assertEquals(2, flushes)
    }
}
