package sh.chaotic.auth.ws

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException
import kotlin.random.Random

/**
 * How a /ws connection, or an attempt at one, ended. The app's realtime
 * client (a later ticket) maps OkHttp's `WebSocketListener` callbacks to
 * these: `onClosing`/`onClosed` with a code to [Closed], `onFailure` with
 * a response to [HandshakeRefused], `onFailure` without one to
 * [ConnectionLost].
 */
sealed interface WsEnd {
    /** The server sent a close frame with [code]. */
    data class Closed(val code: Int) : WsEnd

    /** The upgrade got an HTTP answer instead of 101; [retryAfter] is its `Retry-After` header, if any. */
    data class HandshakeRefused(val status: Int, val retryAfter: String? = null) : WsEnd

    /** No close frame and no HTTP answer: the network dropped, a timeout, the server went away. */
    data object ConnectionLost : WsEnd
}

/** What to do after a [WsEnd]. */
sealed interface WsDecision {
    /**
     * 4001: the server did not accept this credential (missing, expired,
     * revoked). Never reconnect with the same token. Ask the session for a
     * new one (`SessionManager.refreshAfterRejection(tokenUsed)`): an
     * access token lives ten minutes, so this is how a long-lived socket
     * normally ends. Connect again only if that returns a different token;
     * if it returns null the device is signed out.
     */
    data object Reauthenticate : WsDecision

    /** 4003 (the person may not watch this team, or is deactivated), or a refusal retrying cannot change. */
    data object Stop : WsDecision

    data class Retry(val delayMillis: Long) : WsDecision
}

/**
 * The /ws reconnect rules (CHT-1610, from CHT-1615 / CHT-1635 / CHT-1637;
 * the server side is `backend/app/ws_auth.py`):
 *
 * - A refused handshake is accepted and then closed at once with its
 *   code, so `onOpen` does not mean the credential was accepted. A
 *   connection counts as established, which resets the backoff, only once
 *   a server message has arrived or it has stayed open
 *   [OPEN_SETTLE_MILLIS] (the web app's `WS_OPEN_SETTLE_MS`).
 * - 4001 is [WsDecision.Reauthenticate] and 4003 is [WsDecision.Stop]:
 *   both terminal for the connection, never retried as they are.
 * - 4011 (the server's credential check failed) is retried with backoff.
 * - HTTP 503 (the check failed, before accept) and 429 (too many refusals
 *   from this address) are retried after the larger of the backoff and
 *   `Retry-After`.
 * - Anything else is treated as transient and retried with backoff,
 *   except an HTTP 4xx that says there is no feed to connect to.
 *
 * One instance per realtime connection loop; not thread-safe, so call it
 * from the one place that owns the socket.
 */
class WsReconnectPolicy(
    private val initialDelayMillis: Long = DEFAULT_INITIAL_DELAY_MILLIS,
    private val maxDelayMillis: Long = DEFAULT_MAX_DELAY_MILLIS,
    /** A Retry-After longer than this is not believed: a misconfigured proxy must not park the feed for days. */
    private val maxRetryAfterMillis: Long = DEFAULT_MAX_RETRY_AFTER_MILLIS,
    private val random: Random = Random.Default,
) {
    private var failures = 0
    private var openedAtMillis: Long? = null
    private var messageReceived = false

    /** The socket opened (`onOpen`). Not yet proof the credential was accepted. */
    fun onOpen(nowMillis: Long) {
        openedAtMillis = nowMillis
        messageReceived = false
    }

    /** A server message arrived: the server accepted the credential. */
    fun onMessage() {
        messageReceived = true
    }

    /** Whether the current connection has proven itself (see the class comment). */
    fun isEstablished(nowMillis: Long): Boolean {
        val opened = openedAtMillis ?: return false
        return messageReceived || nowMillis - opened >= OPEN_SETTLE_MILLIS
    }

    fun decide(end: WsEnd, nowMillis: Long): WsDecision {
        if (isEstablished(nowMillis)) failures = 0
        openedAtMillis = null
        messageReceived = false
        return when (end) {
            is WsEnd.Closed -> closed(end.code)
            is WsEnd.HandshakeRefused -> refused(end, nowMillis)
            WsEnd.ConnectionLost -> retry()
        }
    }

    private fun closed(code: Int): WsDecision = when (code) {
        CLOSE_UNAUTHENTICATED -> WsDecision.Reauthenticate
        CLOSE_FORBIDDEN -> WsDecision.Stop
        else -> retry()
    }

    private fun refused(end: WsEnd.HandshakeRefused, nowMillis: Long): WsDecision = when {
        end.status == HTTP_SERVICE_UNAVAILABLE || end.status == HTTP_TOO_MANY_REQUESTS ->
            retry(retryAfterMillis(end.retryAfter, nowMillis))

        end.status == HTTP_UNAUTHORIZED -> WsDecision.Reauthenticate

        // A server without the ASGI denial extension sends its own 403
        // for a refusal over the caps (ws_auth.refuse); a real 4003
        // always arrives as a close code. So this one is transient.
        end.status == HTTP_FORBIDDEN -> retry()

        end.status in HTTP_CLIENT_ERRORS -> WsDecision.Stop

        else -> retry()
    }

    private fun retry(atLeastMillis: Long = 0): WsDecision.Retry {
        val ceiling = (initialDelayMillis shl failures.coerceAtMost(MAX_DOUBLINGS)).coerceAtMost(maxDelayMillis)
        failures++
        // "Equal jitter": half fixed, half random, so clients refused together do not return together.
        val backoff = ceiling / 2 + random.nextLong(ceiling / 2 + 1)
        return WsDecision.Retry(maxOf(backoff, atLeastMillis.coerceAtMost(maxRetryAfterMillis)))
    }

    companion object {
        const val CLOSE_UNAUTHENTICATED = 4001
        const val CLOSE_FORBIDDEN = 4003
        const val CLOSE_INTERNAL_ERROR = 4011

        /** How long an opened socket must stay up to count as accepted without a message (`WS_OPEN_SETTLE_MS`). */
        const val OPEN_SETTLE_MILLIS = 1_000L

        const val DEFAULT_INITIAL_DELAY_MILLIS = 1_000L
        const val DEFAULT_MAX_DELAY_MILLIS = 60_000L
        const val DEFAULT_MAX_RETRY_AFTER_MILLIS = 15 * 60_000L

        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_FORBIDDEN = 403
        private const val HTTP_TOO_MANY_REQUESTS = 429
        private const val HTTP_SERVICE_UNAVAILABLE = 503
        private val HTTP_CLIENT_ERRORS = 400..499
        private const val MAX_DOUBLINGS = 20
        private const val MILLIS_PER_SECOND = 1000L

        /**
         * `Retry-After` (RFC 9110 §10.2.3) in milliseconds from [nowMillis]:
         * delay-seconds (what this server sends) or an HTTP-date. 0 when
         * absent or unreadable.
         */
        fun retryAfterMillis(value: String?, nowMillis: Long): Long {
            val trimmed = value?.trim().orEmpty()
            return when {
                trimmed.isEmpty() -> 0

                trimmed.all { it.isDigit() } -> {
                    val seconds = trimmed.toLongOrNull() ?: Long.MAX_VALUE
                    seconds.coerceAtMost(Long.MAX_VALUE / MILLIS_PER_SECOND) * MILLIS_PER_SECOND
                }

                else -> httpDateMillis(trimmed)?.let { (it - nowMillis).coerceAtLeast(0) } ?: 0
            }
        }

        private fun httpDateMillis(value: String): Long? = try {
            ZonedDateTime.parse(value, DateTimeFormatter.RFC_1123_DATE_TIME).toInstant().toEpochMilli()
        } catch (_: DateTimeParseException) {
            null
        }
    }
}
