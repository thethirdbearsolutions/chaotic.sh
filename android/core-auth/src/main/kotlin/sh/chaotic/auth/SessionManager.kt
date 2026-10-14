package sh.chaotic.auth

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

/**
 * An access token and whose it is: [owner] is [SessionManager.ownerKey] of
 * the person and server it was issued for. [toString] never prints the
 * token.
 */
class Grant(val token: String, val baseUrl: String, val owner: String) {
    override fun toString() = "Grant(owner=$owner)"
}

/** What the UI shows: the first screen, or the signed-in app. */
sealed interface AuthState {
    /** The stored session has not been read yet. */
    data object Loading : AuthState

    /** [ended] says why a session the device had is gone, for the sign-in screen; null on a fresh start. */
    data class SignedOut(val ended: SessionEnded? = null) : AuthState

    data class SignedIn(val baseUrl: String, val person: Person) : AuthState
}

enum class SessionEnded {
    /** The person signed out on this device. */
    SIGNED_OUT,

    /** The server refused the refresh token: revoked in Connected apps, reused, idle too long, or the account ended. */
    REFUSED_BY_SERVER,
}

/**
 * The one owner of the session: it reads and writes the [TokenStore],
 * hands out access tokens, and refreshes them.
 *
 * Refreshing is single-flight. The server rotates refresh tokens with
 * reuse detection (`TokenService.refresh`): two concurrent refreshes with
 * the same token would spend it twice, and past its 30 s grace replay the
 * second would end the session. So every refresh happens under [mutex],
 * and a caller whose token was already replaced by another caller's
 * refresh gets the new token instead of refreshing again.
 *
 * Only a definitive refusal from the token endpoint ([OAuthException], of
 * which `invalid_grant` is the usual one) ends the session. A network
 * failure or a 5xx leaves it as it is, and the request that needed the
 * token fails with that error.
 */
@Suppress("TooManyFunctions") // the session's one owner: load, sign in and out, tokens, refresh
class SessionManager(
    private val store: TokenStore,
    private val tokens: SessionTokens,
    private val clock: () -> Long = System::currentTimeMillis,
) {
    private val mutex = Mutex()

    @Volatile private var session: Session? = null

    @Volatile private var loaded = false

    /**
     * The store does not hold what [session] says (a write or clear failed:
     * a Keystore or disk error). Retried on the next locked operation. The
     * in-memory session is the truth meanwhile: after a refresh the old
     * refresh token is spent, so the new one must never be dropped because
     * it could not be written.
     */
    private var unsaved = false
    private val mutableState = MutableStateFlow<AuthState>(AuthState.Loading)

    val state: StateFlow<AuthState> = mutableState.asStateFlow()

    /** Reads the stored session once; later calls are no-ops. */
    suspend fun load() {
        mutex.withLock { ensureLoaded() }
    }

    /**
     * Takes the session a sign-in just produced. It is in effect at once;
     * if it cannot be stored, it is kept in memory and storing is retried.
     */
    suspend fun signedIn(newSession: Session) {
        mutex.withLock {
            session = newSession
            loaded = true
            unsaved = true
            mutableState.value = AuthState.SignedIn(newSession.server.baseUrl, newSession.person)
            persistLocked()
        }
    }

    /** The server the device is signed in to, if any. */
    suspend fun server(): ServerConfig? {
        // Without the lock once loaded: the interceptor asks this for every
        // request, and must not wait behind a refresh or a sign-out in flight
        // (a request to another origin never needs the token at all).
        if (loaded) return session?.server
        return mutex.withLock { ensureLoaded()?.server }
    }

    /**
     * An access token that is not about to expire ([expiryMarginMillis]),
     * refreshing first if needed; null when signed out (or the refresh
     * just ended the session). Throws [java.io.IOException] when a refresh
     * was needed and could not reach the server.
     */
    suspend fun accessToken(): String? = grant()?.token

    /** [accessToken] together with whose it is, read under one lock so the two always agree. */
    suspend fun grant(): Grant? = mutex.withLock {
        val current = ensureLoaded() ?: return@withLock null
        val fresh =
            if (clock() < current.accessTokenExpiresAtMillis - expiryMarginMillis(current)) {
                current
            } else {
                refreshLocked(current)
            }
        fresh?.toGrant()
    }

    /**
     * The server answered 401 to a request made with [rejected]. Returns a
     * token to retry with, or null if there is none. If another caller has
     * already replaced [rejected]'s token, that one is returned without
     * refreshing again.
     *
     * Only ever a token of the same person on the same server: if someone
     * else signed in meanwhile, the request was made as [rejected]'s owner
     * and must not go again as anyone else. An approval or a comment would
     * be recorded under the wrong name, and another server's token would
     * be sent to this one.
     */
    suspend fun refreshAfterRejection(rejected: Grant): Grant? = mutex.withLock {
        val current = ensureLoaded() ?: return@withLock null
        if (current.ownerKey() != rejected.owner) return@withLock null
        val fresh = if (current.accessToken != rejected.token) current else refreshLocked(current)
        fresh?.toGrant()?.takeIf { it.owner == rejected.owner }
    }

    /**
     * Signs this device out: asks the server to end the session (which also
     * drops its push registration server-side), then forgets the tokens.
     * The local sign-out happens even when the server cannot be reached;
     * the server session then ends on its own when it goes unused.
     *
     * Returns whether the server confirmed the revocation.
     */
    suspend fun signOut(): Boolean = mutex.withLock {
        val current = ensureLoaded()
        val revoked = current != null && tokens.revoke(current.server, current.refreshToken)
        endLocked(SessionEnded.SIGNED_OUT)
        revoked
    }

    private suspend fun ensureLoaded(): Session? {
        if (!loaded) {
            session = readStore()
            loaded = true
            val current = session
            mutableState.value =
                if (current == null) {
                    AuthState.SignedOut()
                } else {
                    AuthState.SignedIn(current.server.baseUrl, current.person)
                }
        }
        if (unsaved) persistLocked()
        return session
    }

    private suspend fun refreshLocked(current: Session): Session? {
        val refreshed =
            try {
                tokens.refresh(current)
            } catch (_: OAuthException) {
                endLocked(SessionEnded.REFUSED_BY_SERVER)
                return null
            }
        // In memory first: the old refresh token is already spent, so the
        // new one must survive even if storing it fails.
        session = refreshed
        unsaved = true
        if (refreshed.person != current.person) {
            mutableState.value = AuthState.SignedIn(refreshed.server.baseUrl, refreshed.person)
        }
        persistLocked()
        return refreshed
    }

    private suspend fun endLocked(reason: SessionEnded) {
        session = null
        loaded = true
        unsaved = true
        mutableState.value = AuthState.SignedOut(reason)
        persistLocked()
    }

    /** A store that cannot be read (a broken Keystore, a disk error) reads as signed out; nothing is deleted. */
    @Suppress("TooGenericExceptionCaught") // any store failure, never a crash
    private suspend fun readStore(): Session? = try {
        store.read()
    } catch (e: CancellationException) {
        throw e
    } catch (_: Exception) {
        null
    }

    /** Writes (or clears) the store to match [session]; on failure leaves [unsaved] set for the next try. */
    @Suppress("TooGenericExceptionCaught") // any store failure, never a crash
    private suspend fun persistLocked() {
        try {
            val current = session
            if (current == null) store.clear() else store.write(current)
            unsaved = false
        } catch (e: CancellationException) {
            throw e
        } catch (_: Exception) {
            unsaved = true
        }
    }

    private fun Session.ownerKey() = ownerKey(server.baseUrl, person.id)

    private fun Session.toGrant() = Grant(accessToken, server.baseUrl, ownerKey())

    companion object {
        /** Who a session speaks for: [personId] on the server at [baseUrl] (an id is unique only on its own server). */
        fun ownerKey(baseUrl: String, personId: String) = "$personId@$baseUrl"

        /** Refresh at most this long before the access token expires, so a request never races its expiry. */
        const val EXPIRY_MARGIN_MILLIS = 60_000L

        /** For a short-lived token the margin is this fraction of its lifetime instead. */
        private const val MARGIN_FRACTION_OF_LIFETIME = 4

        /**
         * min(60 s, a quarter of the token's lifetime): a token issued for
         * 60 s (the server's minimum) is used for 45 s, not refreshed on
         * every request.
         */
        fun expiryMarginMillis(session: Session): Long {
            val lifetime = session.accessTokenExpiresAtMillis - session.accessTokenIssuedAtMillis
            return if (session.accessTokenIssuedAtMillis <= 0 || lifetime <= 0) {
                EXPIRY_MARGIN_MILLIS
            } else {
                minOf(EXPIRY_MARGIN_MILLIS, lifetime / MARGIN_FRACTION_OF_LIFETIME)
            }
        }
    }
}
