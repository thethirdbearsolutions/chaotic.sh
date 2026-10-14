package sh.chaotic.auth

import kotlinx.coroutines.test.runTest
import java.security.GeneralSecurityException
import java.security.ProviderException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** A store that fails (a broken Keystore, a full disk) must cost the session nothing it can keep (PR #363, M1). */
class TokenStoreFailureTest {
    private class FlakyStore(var stored: Session? = null) : TokenStore {
        var failWith: Exception? = null
        var writes = 0

        override suspend fun read(): Session? {
            failWith?.let { throw it }
            return stored
        }

        override suspend fun write(session: Session) {
            writes++
            failWith?.let { throw it }
            stored = session
        }

        override suspend fun clear() {
            failWith?.let { throw it }
            stored = null
        }
    }

    private val tokens =
        object : SessionTokens {
            var n = 1

            override suspend fun refresh(session: Session): Session {
                n++
                return session.copy(
                    accessToken = "at_$n",
                    refreshToken = "rt_$n",
                    accessTokenExpiresAtMillis = Long.MAX_VALUE,
                )
            }

            override suspend fun revoke(server: ServerConfig, token: String) = true
        }

    @Test
    fun aRefreshWhoseResultCannotBeStoredKeepsTheNewTokensInMemory() = runTest {
        for (failure in listOf(
            GeneralSecurityException("keystore"),
            ProviderException("keystore"),
            IllegalStateException("x"),
        )) {
            val store = FlakyStore(session(expiresAt = 0))
            val manager = SessionManager(store, tokens)
            manager.load()
            store.failWith = failure

            val token = manager.accessToken()

            // The old refresh token is spent server-side; the new one lives on in memory.
            assertEquals("at_${tokens.n}", token, failure.toString())
            assertEquals(token, manager.accessToken())
            assertTrue(manager.state.value is AuthState.SignedIn)

            // Persisting is retried once the store works again.
            store.failWith = null
            manager.accessToken()
            assertEquals("rt_${tokens.n}", store.stored!!.refreshToken)
        }
    }

    @Test
    fun aSignInThatCannotBeStoredStillSignsIn() = runTest {
        val store = FlakyStore()
        val manager = SessionManager(store, tokens)
        store.failWith = ProviderException("keystore")

        manager.signedIn(session(accessToken = "at_9"))

        assertEquals("at_9", manager.accessToken())
        store.failWith = null
        manager.accessToken()
        assertEquals("at_9", store.stored!!.accessToken)
    }

    @Test
    fun anUnreadableStoreReadsAsSignedOut() = runTest {
        val store = FlakyStore(session())
        store.failWith = ProviderException("keystore")
        val manager = SessionManager(store, tokens)

        manager.load()

        assertEquals(AuthState.SignedOut(), manager.state.value)
        assertNull(manager.accessToken())
    }

    @Test
    fun aSignOutThatCannotClearTheStoreStillSignsOutAndClearsLater() = runTest {
        val store = FlakyStore(session())
        val manager = SessionManager(store, tokens)
        manager.load()
        store.failWith = GeneralSecurityException("keystore")

        manager.signOut()

        assertNull(manager.accessToken())
        store.failWith = null
        manager.accessToken()
        assertNull(store.stored)
    }
}
