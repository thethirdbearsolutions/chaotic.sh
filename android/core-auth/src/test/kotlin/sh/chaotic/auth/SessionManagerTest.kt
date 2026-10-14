package sh.chaotic.auth

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.CoroutineStart
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.test.runTest
import java.io.IOException
import java.util.concurrent.atomic.AtomicInteger
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class SessionManagerTest {
    /** A token endpoint that issues at_N/rt_N in turn, or fails as told. */
    private class FakeTokens : SessionTokens {
        val refreshes = AtomicInteger()
        val revoked = mutableListOf<String>()
        var failWith: Exception? = null
        var gate: CompletableDeferred<Unit>? = null
        var revokeAnswer = true

        override suspend fun refresh(session: Session): Session {
            gate?.await()
            failWith?.let { throw it }
            val n = refreshes.incrementAndGet() + 1
            return session.copy(
                accessToken = "at_$n",
                refreshToken = "rt_$n",
                accessTokenExpiresAtMillis = NOW + 600_000,
            )
        }

        override suspend fun revoke(server: ServerConfig, token: String): Boolean {
            revoked += token
            return revokeAnswer
        }
    }

    private val tokens = FakeTokens()

    private fun manager(stored: Session?): Pair<SessionManager, InMemoryTokenStore> {
        val store = InMemoryTokenStore(stored)
        return SessionManager(store, tokens, clock = { NOW }) to store
    }

    @Test
    fun loadReportsWhatIsStored() = runTest {
        val (signedOut, _) = manager(null)
        assertEquals(AuthState.Loading, signedOut.state.value)
        signedOut.load()
        assertEquals(AuthState.SignedOut(), signedOut.state.value)

        val (signedIn, _) = manager(session())
        signedIn.load()
        assertEquals(AuthState.SignedIn("https://chaotic.example", session().person), signedIn.state.value)
    }

    @Test
    fun aFreshTokenIsHandedOutAsIs() = runTest {
        val (manager, _) = manager(session(expiresAt = NOW + 10 * 60_000))

        assertEquals("at_1", manager.accessToken())
        assertEquals(0, tokens.refreshes.get())
    }

    @Test
    fun aTokenNearExpiryIsRefreshedAndTheRotationStored() = runTest {
        val (manager, store) = manager(session(expiresAt = NOW + SessionManager.EXPIRY_MARGIN_MILLIS - 1))

        assertEquals("at_2", manager.accessToken())

        assertEquals("rt_2", store.read()!!.refreshToken)
    }

    @Test
    fun concurrentRejectionsRefreshOnce() = runTest {
        // Five requests all got 401 with at_1 at once; spending rt_1 five
        // times would trip the server's reuse detection.
        val (manager, _) = manager(session())
        tokens.gate = CompletableDeferred()

        // Undispatched: each runs until it suspends, so the first is inside
        // the refresh (waiting on the gate) while the other four queue.
        val retries =
            (1..5).map { async(start = CoroutineStart.UNDISPATCHED) { manager.refreshAfterRejection(ada("at_1")) } }
        tokens.gate!!.complete(Unit)

        assertEquals(List(5) { "at_2" }, retries.awaitAll().map { it?.token })
        assertEquals(1, tokens.refreshes.get())
    }

    @Test
    fun aRejectionOfAnAlreadyReplacedTokenDoesNotRefreshAgain() = runTest {
        val (manager, _) = manager(session(accessToken = "at_2"))

        assertEquals("at_2", manager.refreshAfterRejection(ada("at_1"))?.token)
        assertEquals(0, tokens.refreshes.get())
    }

    @Test
    fun aGrantSaysWhoseTokenItIs() = runTest {
        val (manager, _) = manager(session())

        val grant = manager.grant()!!

        assertEquals("at_1", grant.token)
        assertEquals("https://chaotic.example", grant.baseUrl)
        assertEquals("u1@https://chaotic.example", grant.owner)
        assertFalse("at_1" in grant.toString())
    }

    @Test
    fun aRejectionIsNeverRetriedAsSomeoneElse() = runTest {
        // Ada's request was rejected, but Bob has signed in since: his token
        // must not carry her request (CHT-1613).
        val (manager, _) = manager(
            session(accessToken = "at_bob").copy(person = Person("u2", "Bob", "bob@example.com")),
        )

        assertNull(manager.refreshAfterRejection(ada("at_1")))
        assertEquals(0, tokens.refreshes.get())
    }

    @Test
    fun aRejectionIsNeverRetriedOnAnotherServer() = runTest {
        val (manager, _) = manager(session(baseUrl = "https://elsewhere.example", accessToken = "at_9"))

        assertNull(manager.refreshAfterRejection(ada("at_1")))
    }

    /** Ada's grant on the default server, as a request made with [token] held it. */
    private fun ada(token: String) =
        Grant(token, "https://chaotic.example", SessionManager.ownerKey("https://chaotic.example", "u1"))

    @Test
    fun aRefusedRefreshSignsOut() = runTest {
        val (manager, store) = manager(session(expiresAt = 0))
        tokens.failWith = InvalidGrantException("refresh token reused")

        assertNull(manager.accessToken())

        assertNull(store.read())
        assertEquals(AuthState.SignedOut(SessionEnded.REFUSED_BY_SERVER), manager.state.value)
        assertNull(manager.accessToken())
    }

    @Test
    fun aNetworkFailureKeepsTheSession() = runTest {
        val (manager, store) = manager(session(expiresAt = 0))
        tokens.failWith = IOException("offline")

        assertFailsWith<IOException> { manager.accessToken() }

        assertEquals("rt_1", store.read()!!.refreshToken)
        assertTrue(manager.state.value is AuthState.SignedIn)

        tokens.failWith = null
        assertEquals("at_2", manager.accessToken())
    }

    @Test
    fun signOutRevokesThenForgets() = runTest {
        val (manager, store) = manager(session())

        assertTrue(manager.signOut())

        assertEquals(listOf("rt_1"), tokens.revoked)
        assertNull(store.read())
        assertEquals(AuthState.SignedOut(SessionEnded.SIGNED_OUT), manager.state.value)
    }

    @Test
    fun signOutForgetsEvenWhenTheServerCannotBeTold() = runTest {
        val (manager, store) = manager(session())
        tokens.revokeAnswer = false

        assertFalse(manager.signOut())

        assertNull(store.read())
        assertNull(manager.accessToken())
    }

    @Test
    fun signedInStoresTheNewSession() = runTest {
        val (manager, store) = manager(null)

        manager.signedIn(session(accessToken = "at_9"))

        assertEquals("at_9", store.read()!!.accessToken)
        assertEquals("at_9", manager.accessToken())
        assertTrue(manager.state.value is AuthState.SignedIn)
    }

    @Test
    fun theRefreshMarginIsAQuarterOfAShortLifetime() = runTest {
        // Issued for 60 s (the server's minimum): used for 45 s, not
        // refreshed on every request (PR #363 review, L1).
        val issued = NOW - 40_000
        val short = session(expiresAt = issued + 60_000).copy(accessTokenIssuedAtMillis = issued)
        val (manager, _) = manager(short)

        assertEquals("at_1", manager.accessToken())
        assertEquals(0, tokens.refreshes.get())

        assertEquals(15_000, SessionManager.expiryMarginMillis(short))
        assertEquals(
            60_000,
            SessionManager.expiryMarginMillis(short.copy(accessTokenExpiresAtMillis = issued + 600_000)),
        )
        assertEquals(60_000, SessionManager.expiryMarginMillis(session(expiresAt = NOW)))
    }

    private companion object {
        const val NOW = 5_000_000L
    }
}
