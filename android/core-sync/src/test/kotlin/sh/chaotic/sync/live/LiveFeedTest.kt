package sh.chaotic.sync.live

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import sh.chaotic.auth.Grant
import sh.chaotic.auth.ws.WsEnd
import sh.chaotic.auth.ws.WsReconnectPolicy
import sh.chaotic.sync.SyncTrigger
import java.io.IOException
import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

/** The /ws live feed on a fake socket (CHT-1655). */
@OptIn(ExperimentalCoroutinesApi::class)
class LiveFeedTest {
    private class FakeSocket(val url: String, val token: String, val listener: LiveListener) : LiveSocket {
        var closed = false

        override fun close() {
            closed = true
        }
    }

    private val sockets = mutableListOf<FakeSocket>()
    private val connector = LiveConnector { url, token, listener ->
        FakeSocket(url, token, listener).also { sockets += it }
    }
    private val trigger = SyncTrigger()
    private var session: Grant? = Grant("t1", "https://chaotic.example", "ada@https://chaotic.example")
    private val refreshedFrom = mutableListOf<String>()
    private var nextToken: String? = "t2"
    private val changed = mutableListOf<String>()

    private fun TestScope.feed() = LiveFeed(
        connector = connector,
        grant = { session },
        refresh = { rejected ->
            refreshedFrom += rejected.token
            nextToken?.let { Grant(it, rejected.baseUrl, rejected.owner) }?.also { session = it }
        },
        trigger = trigger,
        onIssueChanged = { changed += it },
        nowMillis = { testScheduler.currentTime },
        // No jitter: the delays are exact.
        newPolicy = { WsReconnectPolicy(random = Random(0)) },
    )

    private fun TestScope.requested(): Boolean {
        var fired = false
        // A pending request is taken at once; otherwise the wait times out without taking a later one.
        backgroundScope.launch { fired = trigger.await(1) }
        runCurrent()
        advanceTimeBy(2)
        runCurrent()
        return fired
    }

    @Test
    fun itConnectsToTheTeamsFeedWithTheSessionsToken() = runTest {
        backgroundScope.launch { feed().watch("team a") }
        runCurrent()

        val socket = sockets.single()
        assertEquals("wss://chaotic.example/ws?team_id=team+a", socket.url)
        assertEquals("t1", socket.token)
    }

    @Test
    fun anInboxEventAsksTheInboxToSyncNow() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onOpen()
        sockets.single().listener.onMessage("""{"type":"created","entity":"inbox","data":{"id":"e1"}}""")
        runCurrent()

        assertTrue(requested())
    }

    @Test
    fun issueCommentAndActivityEventsRefreshTheirIssue() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        val listener = sockets.single().listener
        listener.onOpen()
        listener.onMessage("""{"type":"updated","entity":"issue","data":{"id":"i1"},"project_id":"p"}""")
        listener.onMessage("""{"type":"created","entity":"comment","data":{"id":"c1","issue_id":"i2"}}""")
        listener.onMessage("""{"type":"created","entity":"activity","data":{"issue_id":"i3"}}""")
        listener.onMessage("""{"type":"updated","entity":"sprint","data":{"id":"s1"}}""")
        listener.onMessage("not json")
        listener.onMessage("[1, 2]")
        runCurrent()

        assertEquals(listOf("i1", "i2", "i3"), changed)
        assertFalse(requested())
    }

    @Test
    fun aDroppedConnectionReconnectsAfterTheBackoffAndCatchesUpOnceEstablished() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.ConnectionLost)
        runCurrent()
        assertEquals(1, sockets.size)
        assertTrue(sockets.single().closed)

        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()
        assertEquals(2, sockets.size)
        sockets[1].listener.onOpen()
        runCurrent()
        // Opened is not accepted: a refused handshake opens first.
        assertFalse(requested())

        advanceTimeBy(WsReconnectPolicy.OPEN_SETTLE_MILLIS + 1)
        runCurrent()
        assertTrue(requested())
    }

    @Test
    fun aFirstConnectionDoesNotAskForASync() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onOpen()
        advanceTimeBy(WsReconnectPolicy.OPEN_SETTLE_MILLIS + 1)
        runCurrent()

        assertFalse(requested())
    }

    @Test
    fun a4001ReconnectsAtOnceWithANewToken() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        val first = sockets.single()
        first.listener.onOpen()
        first.listener.onMessage("""{"entity":"issue","data":{"id":"i1"}}""")
        first.listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_UNAUTHENTICATED))
        runCurrent()

        assertEquals(listOf("t1"), refreshedFrom)
        assertEquals("t2", sockets[1].token)
    }

    @Test
    fun a4001WithNoNewTokenStops() = runTest {
        nextToken = null
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_UNAUTHENTICATED))
        runCurrent()

        assertTrue(watch.isCompleted)
        assertEquals(1, sockets.size)
    }

    @Test
    fun a4001AnsweredWithTheSameTokenStops() = runTest {
        nextToken = "t1"
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_UNAUTHENTICATED))
        runCurrent()

        assertTrue(watch.isCompleted)
    }

    @Test
    fun a4003Stops() = runTest {
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_FORBIDDEN))
        runCurrent()

        assertTrue(watch.isCompleted)
        assertTrue(sockets.single().closed)
    }

    @Test
    fun a503WaitsForRetryAfter() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.HandshakeRefused(503, retryAfter = "120"))
        runCurrent()

        advanceTimeBy(119_000)
        runCurrent()
        assertEquals(1, sockets.size)
        advanceTimeBy(1_001)
        runCurrent()
        assertEquals(2, sockets.size)
    }

    @Test
    fun signedOutBeforeTheRetryStops() = runTest {
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()
        session = null
        sockets.single().listener.onEnd(WsEnd.ConnectionLost)
        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()

        assertTrue(watch.isCompleted)
        assertEquals(1, sockets.size)
    }

    @Test
    fun nobodySignedInConnectsNothing() = runTest {
        session = null
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()

        assertTrue(watch.isCompleted)
        assertTrue(sockets.isEmpty())
    }

    @Test
    fun leavingTheForegroundClosesTheSocket() = runTest {
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()

        watch.cancel()
        runCurrent()

        assertTrue(sockets.single().closed)
    }

    @Test
    fun aTokenThatCannotBeHadForNowIsRetriedNotFatal() = runTest {
        var offline = true
        val feed = LiveFeed(
            connector = connector,
            grant = { if (offline) throw IOException("offline") else session },
            refresh = { null },
            trigger = trigger,
            nowMillis = { testScheduler.currentTime },
            newPolicy = { WsReconnectPolicy(random = Random(0)) },
        )
        val watch = backgroundScope.launch { feed.watch("A") }
        runCurrent()
        assertTrue(sockets.isEmpty())
        assertFalse(watch.isCompleted)

        offline = false
        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()

        assertEquals("t1", sockets.single().token)
    }

    @Test
    fun aRefreshThatCannotReachTheServerBacksOffAndAsksAgain() = runTest {
        var reachable = false
        val feed = LiveFeed(
            connector = connector,
            grant = { session },
            refresh = { rejected ->
                if (!reachable) throw IOException("offline")
                Grant("t2", rejected.baseUrl, rejected.owner).also { session = it }
            },
            trigger = trigger,
            nowMillis = { testScheduler.currentTime },
            newPolicy = { WsReconnectPolicy(random = Random(0)) },
        )
        val watch = backgroundScope.launch { feed.watch("A") }
        runCurrent()
        sockets.single().listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_UNAUTHENTICATED))
        runCurrent()
        assertFalse(watch.isCompleted)

        reachable = true
        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()
        // Asked the session again, which still had t1; that is refused, and the refresh now works.
        sockets.last().listener.onEnd(WsEnd.Closed(WsReconnectPolicy.CLOSE_UNAUTHENTICATED))
        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()

        assertEquals("t2", sockets.last().token)
    }

    @Test
    fun anotherPersonSignedInEndsTheFeed() = runTest {
        val watch = backgroundScope.launch { feed().watch("A") }
        runCurrent()
        session = Grant("g1", "https://chaotic.example", "grace@https://chaotic.example")
        sockets.single().listener.onEnd(WsEnd.ConnectionLost)
        advanceTimeBy(WsReconnectPolicy.DEFAULT_MAX_DELAY_MILLIS)
        runCurrent()

        assertTrue(watch.isCompleted)
        assertEquals(1, sockets.size)
    }

    @Test
    fun anEventDuringAnIssuesRefreshRefreshesItOnceMore() = runTest {
        val release = CompletableDeferred<Unit>()
        val refreshed = mutableListOf<String>()
        val feed = LiveFeed(
            connector = connector,
            grant = { session },
            refresh = { null },
            trigger = trigger,
            onIssueChanged = {
                refreshed += it
                if (refreshed.size == 1) release.await()
            },
            nowMillis = { testScheduler.currentTime },
        )
        backgroundScope.launch { feed.watch("A") }
        runCurrent()
        val listener = sockets.single().listener
        listener.onMessage("""{"entity":"issue","data":{"id":"i1"}}""")
        runCurrent()
        // The issue event and its activity event, while the first refresh is out: one more, not two.
        listener.onMessage("""{"entity":"issue","data":{"id":"i1"}}""")
        listener.onMessage("""{"entity":"activity","data":{"issue_id":"i1"}}""")
        runCurrent()
        assertEquals(listOf("i1"), refreshed)

        release.complete(Unit)
        runCurrent()

        assertEquals(listOf("i1", "i1"), refreshed)
    }

    @Test
    fun aRelationEventRefreshesBothIssues() = runTest {
        backgroundScope.launch { feed().watch("A") }
        runCurrent()
        sockets.single().listener.onMessage(
            """{"entity":"relation","data":{"source_issue_id":"i1","target_issue_id":"i2"}}""",
        )
        sockets.single().listener.onMessage("""{"entity":"attestation","data":{"ritual_id":"r","issue_id":"i3"}}""")
        runCurrent()

        assertEquals(listOf("i1", "i2", "i3"), changed)
    }

    @Test
    fun aPlainServerGetsAPlainSocket() {
        assertEquals("ws://10.0.2.2:24267/ws?team_id=t", LiveFeed.url("http://10.0.2.2:24267/", "t"))
    }
}
