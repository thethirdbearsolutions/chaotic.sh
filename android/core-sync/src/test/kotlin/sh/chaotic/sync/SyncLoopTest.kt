package sh.chaotic.sync

import kotlinx.coroutines.launch
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import java.io.IOException
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class PollScheduleTest {
    private val failed = SyncOutcome.Failed(SyncOutcome.Reason.UNREACHABLE)

    @Test
    fun aSuccessWaitsTheInterval() {
        val schedule = PollSchedule(intervalMillis = 60_000)

        assertEquals(60_000, schedule.next(SyncOutcome.Synced(1)))
    }

    @Test
    fun aLongerRetryAfterWins() {
        val schedule = PollSchedule(intervalMillis = 10_000)

        assertEquals(30_000, schedule.next(SyncOutcome.Synced(1, retryAfterSeconds = 30)))
        assertEquals(10_000, schedule.next(SyncOutcome.Synced(1, retryAfterSeconds = 2)))
    }

    @Test
    fun failuresBackOffWithJitterUpToTheCap() {
        val schedule = PollSchedule(intervalMillis = 1_000, maxBackoffMillis = 8_000, random = Random(1))

        val delays = List(6) { schedule.next(failed)!! }

        val ceilings = listOf(1_000L, 2_000, 4_000, 8_000, 8_000, 8_000)
        delays.zip(ceilings).forEach { (delay, ceiling) ->
            assertTrue(delay in ceiling / 2..ceiling, "$delay outside ${ceiling / 2}..$ceiling")
        }
    }

    @Test
    fun aSuccessResetsTheBackoff() {
        val schedule = PollSchedule(intervalMillis = 1_000, maxBackoffMillis = 60_000, random = Random(2))
        repeat(5) { schedule.next(failed) }

        schedule.next(SyncOutcome.Synced(1))

        assertTrue(schedule.next(failed)!! <= 1_000)
    }

    @Test
    fun retryAfterOnAFailureIsHonouredUpToTheCap() {
        val schedule = PollSchedule(intervalMillis = 1_000, maxBackoffMillis = 60_000)

        assertEquals(
            45_000,
            schedule.next(SyncOutcome.Failed(SyncOutcome.Reason.SERVER, 503, retryAfterMillis = 45_000)),
        )
        assertEquals(
            60_000,
            schedule.next(SyncOutcome.Failed(SyncOutcome.Reason.SERVER, 429, retryAfterMillis = 86_400_000)),
        )
    }

    @Test
    fun unauthorizedStopsPolling() {
        assertNull(PollSchedule().next(SyncOutcome.Unauthorized))
    }

    @Test
    fun aRunStoppedAtItsPageCapGoesOnSoon() {
        val schedule = PollSchedule(intervalMillis = 60_000, morePendingMillis = 1_000)

        assertEquals(1_000, schedule.next(SyncOutcome.Synced(50, morePending = true)))
    }

    @Test
    fun itRemembersWhenTheNextRunIsDue() {
        var now = 0L
        val schedule = PollSchedule(intervalMillis = 60_000, nowMillis = { now })
        assertEquals(0, schedule.untilDue())

        schedule.next(SyncOutcome.Synced(1))
        now = 20_000
        assertEquals(40_000, schedule.untilDue())

        now = 90_000
        assertEquals(0, schedule.untilDue())

        schedule.next(SyncOutcome.Unauthorized)
        assertEquals(0, schedule.untilDue())
    }
}

class SyncLoopTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private val syncer = InboxSyncer(remote, CacheSession(store) { OWNER })
    private val trigger = SyncTrigger()
    private val outcomes = mutableListOf<SyncOutcome>()

    private fun TestScope.schedule() = PollSchedule(intervalMillis = 60_000, nowMillis = { testScheduler.currentTime })

    private fun TestScope.loop(schedule: PollSchedule = schedule()) = SyncLoop(
        syncer = syncer,
        schedule = schedule,
        trigger = trigger,
        onOutcome = { outcomes += it },
    )

    @Test
    fun aLoopStartedAgainKeepsTheInterval() = runTest {
        repeat(2) { remote.syncAnswers += Remote.Ok(page(cursor = "c$it")) }
        val schedule = schedule()
        val first = launch { loop(schedule).run() }
        runCurrent()
        first.cancel()

        // The screen comes back 10 s later: no sync until the minute is up.
        advanceTimeBy(10_000)
        val second = launch { loop(schedule).run() }
        runCurrent()
        assertEquals(1, remote.sinceSent.size)
        advanceTimeBy(50_001)
        assertEquals(2, remote.sinceSent.size)

        second.cancel()
    }

    @Test
    fun aLoopStartedAgainKeepsTheServersRetryAfter() = runTest {
        remote.syncAnswers += Remote.HttpError(503, retryAfterMillis = 300_000)
        remote.syncAnswers += Remote.Ok(page(cursor = "c1"))
        val schedule = schedule()
        val first = launch { loop(schedule).run() }
        runCurrent()
        first.cancel()

        advanceTimeBy(5_000)
        val second = launch { loop(schedule).run() }
        advanceTimeBy(290_000)
        assertEquals(1, remote.sinceSent.size)
        advanceTimeBy(5_001)
        assertEquals(2, remote.sinceSent.size)

        second.cancel()
    }

    @Test
    fun pollsOnTheInterval() = runTest {
        repeat(3) { remote.syncAnswers += Remote.Ok(page(cursor = "c$it")) }
        val job = launch { loop().run() }

        runCurrent()
        assertEquals(1, remote.sinceSent.size)
        advanceTimeBy(59_000)
        assertEquals(1, remote.sinceSent.size)
        advanceTimeBy(2_000)
        assertEquals(2, remote.sinceSent.size)

        job.cancel()
    }

    @Test
    fun aTriggerSyncsAtOnce() = runTest {
        repeat(2) { remote.syncAnswers += Remote.Ok(page(cursor = "c$it")) }
        val job = launch { loop().run() }
        runCurrent()

        trigger.requestNow()
        runCurrent()

        assertEquals(listOf<String?>(null, "c0"), remote.sinceSent)
        job.cancel()
    }

    @Test
    fun requestsDuringASyncCoalesceIntoOneMoreRun() = runTest {
        repeat(3) { remote.syncAnswers += Remote.Ok(page(cursor = "c$it")) }
        var first = true
        remote.onSync = {
            if (first) {
                first = false
                trigger.requestNow()
                trigger.requestNow()
            }
        }
        val job = launch { loop().run() }

        runCurrent()

        assertEquals(listOf<String?>(null, "c0"), remote.sinceSent)
        job.cancel()
    }

    @Test
    fun unauthorizedEndsTheLoop() = runTest {
        remote.syncAnswers += Remote.HttpError(401)

        loop().run()

        assertEquals(listOf<SyncOutcome>(SyncOutcome.Unauthorized), outcomes)
    }

    @Test
    fun aFailureIsRetriedAfterTheBackoff() = runTest {
        remote.syncAnswers += Remote.Unreachable(IOException("offline"))
        remote.syncAnswers += Remote.Ok(page(cursor = "c1"))
        val job = launch { loop().run() }

        runCurrent()
        advanceTimeBy(60_001)

        assertEquals(
            listOf(SyncOutcome.Failed(SyncOutcome.Reason.UNREACHABLE), SyncOutcome.Synced(1)),
            outcomes,
        )
        job.cancel()
    }
}
