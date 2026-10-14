package sh.chaotic.auth

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock

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
class SessionManager(
    private val store: TokenStore,
    private val tokens: SessionTokens,
    private val clock: () -> Long = System::currentTimeMillis,
) {
    private val mutex = Mutex()
    private var session: Session? = null
    private var loaded = false
    private val mutableState = MutableStateFlow<AuthState>(AuthState.Loading)

    val state: StateFlow<AuthState> = mutableState.asStateFlow()

    /** Reads the stored session once; later calls are no-ops. */
    suspend fun load() {
        mutex.withLock { ensureLoaded() }
    }

    /** Stores the session a sign-in just produced. */
    suspend fun signedIn(newSession: Session) {
        mutex.withLock {
            store.write(newSession)
            session = newSession
            loaded = true
            mutableState.value = AuthState.SignedIn(newSession.server.baseUrl, newSession.person)
        }
    }

    /** The server the device is signed in to, if any. */
    suspend fun server(): ServerConfig? = mutex.withLock { ensureLoaded()?.server }

    /**
     * An access token that is good for at least [EXPIRY_MARGIN_MILLIS] more,
     * refreshing first if needed; null when signed out (or the refresh
     * just ended the session). Throws [java.io.IOException] when a refresh
     * was needed and could not reach the server.
     */
    suspend fun accessToken(): String? = mutex.withLock {
        val current = ensureLoaded() ?: return@withLock null
        if (clock() < current.accessTokenExpiresAtMillis - EXPIRY_MARGIN_MILLIS) {
            current.accessToken
        } else {
            refreshLocked(current)?.accessToken
        }
    }

    /**
     * The server answered 401 to a request made with [rejected]. Returns a
     * token to retry with, or null if there is none. If another caller has
     * already replaced [rejected], that token is returned without
     * refreshing again.
     */
    suspend fun refreshAfterRejection(rejected: String): String? = mutex.withLock {
        val current = ensureLoaded() ?: return@withLock null
        if (current.accessToken != rejected) {
            current.accessToken
        } else {
            refreshLocked(current)?.accessToken
        }
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
            session = store.read()
            loaded = true
            val current = session
            mutableState.value =
                if (current == null) {
                    AuthState.SignedOut()
                } else {
                    AuthState.SignedIn(current.server.baseUrl, current.person)
                }
        }
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
        // Stored before it is used: the old refresh token is already spent.
        store.write(refreshed)
        session = refreshed
        if (refreshed.person != current.person) {
            mutableState.value = AuthState.SignedIn(refreshed.server.baseUrl, refreshed.person)
        }
        return refreshed
    }

    private suspend fun endLocked(reason: SessionEnded) {
        store.clear()
        session = null
        loaded = true
        mutableState.value = AuthState.SignedOut(reason)
    }

    companion object {
        /** Refresh this long before the access token expires, so a request never races its expiry. */
        const val EXPIRY_MARGIN_MILLIS = 60_000L
    }
}
