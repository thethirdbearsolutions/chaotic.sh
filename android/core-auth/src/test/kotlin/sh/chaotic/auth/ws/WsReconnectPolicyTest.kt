package sh.chaotic.auth.ws

import kotlin.random.Random
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertIs
import kotlin.test.assertTrue

class WsReconnectPolicyTest {
    /** Jitter pinned to its top, so delays are exact: the ceiling of each backoff step. */
    private val noJitter =
        object : Random() {
            override fun nextBits(bitCount: Int): Int = 0

            override fun nextLong(until: Long): Long = until - 1
        }

    private fun policy() = WsReconnectPolicy(initialDelayMillis = 1_000, maxDelayMillis = 8_000, random = noJitter)

    private fun delayOf(decision: WsDecision): Long = assertIs<WsDecision.Retry>(decision).delayMillis

    @Test
    fun unauthenticatedIsTerminalForTheCredential() {
        assertEquals(WsDecision.Reauthenticate(0), policy().decide(WsEnd.Closed(4001), 0))
    }

    @Test
    fun forbiddenIsTerminal() {
        assertEquals(WsDecision.Stop, policy().decide(WsEnd.Closed(4003), 0))
    }

    @Test
    fun aFailedCheckIsRetriedWithGrowingBackoff() {
        val policy = policy()

        val delays = (1..5).map { delayOf(policy.decide(WsEnd.Closed(4011), 0)) }

        assertEquals(listOf(1_000L, 2_000L, 4_000L, 8_000L, 8_000L), delays)
    }

    @Test
    fun serviceUnavailableAndTooManyRequestsHonourRetryAfter() {
        assertEquals(30_000L, delayOf(policy().decide(WsEnd.HandshakeRefused(503, "30"), 0)))
        assertEquals(5_000L, delayOf(policy().decide(WsEnd.HandshakeRefused(429, "5"), 0)))
        // The backoff wins when it is longer than Retry-After.
        val policy = policy()
        repeat(3) { policy.decide(WsEnd.ConnectionLost, 0) }
        assertEquals(8_000L, delayOf(policy.decide(WsEnd.HandshakeRefused(429, "1"), 0)))
    }

    @Test
    fun retryAfterWithoutAValueFallsBackToBackoff() {
        assertEquals(1_000L, delayOf(policy().decide(WsEnd.HandshakeRefused(503, null), 0)))
        assertEquals(1_000L, delayOf(policy().decide(WsEnd.HandshakeRefused(503, "soon"), 0)))
    }

    @Test
    fun aHugeRetryAfterIsCapped() {
        val capped = WsReconnectPolicy(maxRetryAfterMillis = 60_000, random = noJitter)

        assertEquals(60_000L, delayOf(capped.decide(WsEnd.HandshakeRefused(429, "999999999999999999999"), 0)))
    }

    @Test
    fun retryAfterAcceptsAnHttpDate() {
        val now = java.time.Instant.parse("2026-10-14T00:00:00Z").toEpochMilli()

        assertEquals(90_000L, WsReconnectPolicy.retryAfterMillis("Wed, 14 Oct 2026 00:01:30 GMT", now))
        assertEquals(0L, WsReconnectPolicy.retryAfterMillis("Tue, 13 Oct 2026 00:00:00 GMT", now))
    }

    @Test
    fun otherHandshakeStatuses() {
        assertEquals(WsDecision.Reauthenticate(0), policy().decide(WsEnd.HandshakeRefused(401), 0))
        // The server's own 403 is the over-cap fallback; a real 4003 is a close code.
        assertIs<WsDecision.Retry>(policy().decide(WsEnd.HandshakeRefused(403), 0))
        assertEquals(WsDecision.Stop, policy().decide(WsEnd.HandshakeRefused(404), 0))
        assertIs<WsDecision.Retry>(policy().decide(WsEnd.HandshakeRefused(502), 0))
    }

    @Test
    fun lossesAndOrdinaryClosesAreRetried() {
        assertIs<WsDecision.Retry>(policy().decide(WsEnd.ConnectionLost, 0))
        assertIs<WsDecision.Retry>(policy().decide(WsEnd.Closed(1001), 0))
        assertIs<WsDecision.Retry>(policy().decide(WsEnd.Closed(1000), 0))
    }

    @Test
    fun openingIsNotProofTheCredentialWasAccepted() {
        // A refused handshake is accepted and then closed at once: that
        // must not reset the backoff, or a refused client reconnects in a
        // tight loop.
        val policy = policy()
        policy.decide(WsEnd.Closed(4011), 0)
        policy.decide(WsEnd.Closed(4011), 0)

        policy.onOpen(nowMillis = 10_000)
        assertFalse(policy.isEstablished(10_010))

        assertEquals(4_000L, delayOf(policy.decide(WsEnd.Closed(4011), 10_010)))
    }

    @Test
    fun aMessageOrASettledOpenResetsTheBackoff() {
        val byMessage = policy()
        repeat(3) { byMessage.decide(WsEnd.ConnectionLost, 0) }
        byMessage.onOpen(100)
        byMessage.onMessage()
        assertTrue(byMessage.isEstablished(100))
        assertEquals(1_000L, delayOf(byMessage.decide(WsEnd.ConnectionLost, 150)))

        val bySettling = policy()
        repeat(3) { bySettling.decide(WsEnd.ConnectionLost, 0) }
        bySettling.onOpen(100)
        assertTrue(bySettling.isEstablished(100 + WsReconnectPolicy.OPEN_SETTLE_MILLIS))
        assertEquals(1_000L, delayOf(bySettling.decide(WsEnd.Closed(1001), 100 + WsReconnectPolicy.OPEN_SETTLE_MILLIS)))
    }

    @Test
    fun jitterStaysWithinTheUpperHalfOfTheStep() {
        val policy = WsReconnectPolicy(initialDelayMillis = 1_000, maxDelayMillis = 1_000, random = Random(42))

        repeat(100) {
            val delay = delayOf(policy.decide(WsEnd.ConnectionLost, 0))
            assertTrue(delay in 500..1_000, "delay $delay")
        }
    }

    @Test
    fun repeatedUnauthenticatedClosesBackOffAndGiveUp() {
        // A fresh token refused again before the connection is established:
        // back off, and stop after MAX_REAUTHENTICATIONS in a row.
        val policy = policy()

        val decisions = (1..4).map { policy.decide(WsEnd.Closed(4001), 0) }

        assertEquals(
            listOf(
                WsDecision.Reauthenticate(0),
                WsDecision.Reauthenticate(1_000),
                WsDecision.Reauthenticate(2_000),
                WsDecision.Stop,
            ),
            decisions,
        )
    }

    @Test
    fun anEstablishedConnectionResetsTheReauthenticationCount() {
        // A long-lived socket whose token expires every ten minutes is closed
        // with 4001 each time; that must never add up to giving up.
        val policy = policy()
        repeat(10) { round ->
            val opened = round * 600_000L
            policy.onOpen(opened)
            policy.onMessage()
            assertEquals(WsDecision.Reauthenticate(0), policy.decide(WsEnd.Closed(4001), opened + 600_000))
        }
    }
}
