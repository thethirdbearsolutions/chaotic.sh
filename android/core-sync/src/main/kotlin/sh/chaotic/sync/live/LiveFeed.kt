package sh.chaotic.sync.live

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.selects.onTimeout
import kotlinx.coroutines.selects.select
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import sh.chaotic.auth.Grant
import sh.chaotic.auth.ws.WsDecision
import sh.chaotic.auth.ws.WsEnd
import sh.chaotic.auth.ws.WsReconnectPolicy
import sh.chaotic.sync.SyncTrigger
import java.io.IOException
import java.net.URLEncoder

/** What a socket reports, from whatever thread its library calls back on. */
interface LiveListener {
    fun onOpen()

    fun onMessage(text: String)

    /** Called at most once per socket: how it ended. */
    fun onEnd(end: WsEnd)
}

/** An open /ws connection; [close] ends it from this side, and reports nothing more. */
fun interface LiveSocket {
    fun close()
}

/** Opens a WebSocket to [url] with `Authorization: Bearer [token]` (the app's is on OkHttp). */
fun interface LiveConnector {
    fun open(url: String, token: String, listener: LiveListener): LiveSocket
}

/**
 * The foreground /ws live feed (CHT-1655): one connection per team,
 * following the server's handshake contract (`docs/ws-client-contract.md`)
 * through [WsReconnectPolicy].
 *
 * - An inbox event asks the inbox poll to run now ([SyncTrigger]); so does
 *   a connection that becomes established after a reconnect, since events
 *   were missed while it was down.
 * - An issue, comment, activity, attestation or relation event refreshes
 *   the issues it names if they are cached ([onIssueChanged]): one
 *   refresh per issue at a time (and once more if it changed meanwhile),
 *   at most [MAX_REFRESHES] at once.
 * - 4001 (or a handshake 401) asks the session for a new token
 *   ([refresh], given the grant the socket used) and connects again only
 *   with a different one; 4003, a refusal retrying cannot change, no
 *   session, or another person signed in ends [watch]. Anything else
 *   retries after the policy's delay, and so does a token that cannot be
 *   had for now (an IOException from [grant] or [refresh]: offline while
 *   it was due a refresh).
 *
 * The socket carries the token in its own header rather than going
 * through the app's authenticating client, so the feed always knows which
 * token the server refused.
 */
class LiveFeed(
    private val connector: LiveConnector,
    private val grant: suspend () -> Grant?,
    private val refresh: suspend (rejected: Grant) -> Grant?,
    private val trigger: SyncTrigger,
    private val onIssueChanged: suspend (issueId: String) -> Unit = {},
    private val nowMillis: () -> Long = System::currentTimeMillis,
    private val sleep: suspend (Long) -> Unit = { delay(it) },
    private val newPolicy: () -> WsReconnectPolicy = { WsReconnectPolicy() },
) {
    private sealed interface Event {
        data object Open : Event

        data class Message(val text: String) : Event

        data class End(val end: WsEnd) : Event
    }

    /** Follow [teamId]'s feed until cancelled, or until it cannot go on (signed out, 4003, refused for good). */
    @Suppress("ReturnCount", "CyclomaticComplexMethod") // each way the feed stops for good is an early return
    suspend fun watch(teamId: String): Unit = coroutineScope {
        val policy = newPolicy()
        val refreshes = IssueRefreshes(this)
        var owner: String? = null
        var current: Grant? = null
        var end: WsEnd? = null
        var reconnecting = false
        while (true) {
            // A token that cannot be had for now (offline while it is due a refresh) is a lost connection.
            if (current == null) {
                current = try {
                    grant() ?: return@coroutineScope
                } catch (_: IOException) {
                    null
                }
                // Someone else signed in: their feed is not this one.
                if (current != null && owner != null && current.owner != owner) return@coroutineScope
            }
            val grant = current
            if (grant != null && end == null) {
                owner = grant.owner
                end = connect(grant, teamId, policy, reconnecting, refreshes::changed)
                reconnecting = true
            }
            when (val decision = policy.decide(end ?: WsEnd.ConnectionLost, nowMillis())) {
                WsDecision.Stop -> return@coroutineScope

                is WsDecision.Retry -> {
                    sleep(decision.delayMillis)
                    // Asked again: the session may have refreshed the token meanwhile.
                    current = null
                }

                is WsDecision.Reauthenticate -> {
                    sleep(decision.delayMillis)
                    val rejected = grant ?: return@coroutineScope
                    val fresh = try {
                        refresh(rejected) ?: return@coroutineScope
                    } catch (_: IOException) {
                        // Not refused, just not reachable: back off as for a lost connection, then ask again.
                        current = null
                        end = WsEnd.ConnectionLost
                        continue
                    }
                    // The same token again would only be refused again.
                    if (fresh.token == rejected.token) return@coroutineScope
                    current = fresh
                }
            }
            end = null
        }
    }

    /**
     * One refresh per issue at a time, and at most [MAX_REFRESHES] at once.
     * An event for an issue whose refresh is already out marks it to be
     * refreshed once more when that one ends: the one out may have read
     * the issue before the change the event is about.
     */
    private inner class IssueRefreshes(private val scope: CoroutineScope) {
        private val lock = Any()
        private val running = mutableMapOf<String, Boolean>()
        private val permits = Semaphore(MAX_REFRESHES)

        fun changed(issueId: String) {
            synchronized(lock) {
                if (issueId in running) {
                    running[issueId] = true
                    return
                }
                running[issueId] = false
            }
            scope.launch {
                do {
                    permits.withPermit { onIssueChanged(issueId) }
                    val again = synchronized(lock) {
                        val dirty = running[issueId] == true
                        if (dirty) running[issueId] = false else running.remove(issueId)
                        dirty
                    }
                } while (again)
            }
        }
    }

    /** One connection, from open to end; the socket is closed however this returns. */
    private suspend fun connect(
        grant: Grant,
        teamId: String,
        policy: WsReconnectPolicy,
        reconnecting: Boolean,
        issueChanged: (String) -> Unit,
    ): WsEnd {
        val events = Channel<Event>(Channel.UNLIMITED)
        val socket = connector.open(url(grant.baseUrl, teamId), grant.token, Relay(events))
        try {
            var caughtUp = !reconnecting
            while (true) {
                // Until it is established, wake when the settle window would make it so. A select, not a
                // timeout around receive(): a timeout could cancel a receive that had already taken an event.
                val event = select {
                    events.onReceive { it }
                    if (!caughtUp) onTimeout(WsReconnectPolicy.OPEN_SETTLE_MILLIS) { null }
                }
                when (event) {
                    null -> {}

                    Event.Open -> policy.onOpen(nowMillis())

                    is Event.Message -> {
                        policy.onMessage()
                        handle(event.text, issueChanged)
                    }

                    is Event.End -> return event.end
                }
                if (!caughtUp && policy.isEstablished(nowMillis())) {
                    caughtUp = true
                    trigger.requestNow()
                }
            }
        } finally {
            socket.close()
        }
    }

    private fun handle(text: String, issueChanged: (String) -> Unit) {
        val message = try {
            Json.parseToJsonElement(text) as? JsonObject
        } catch (_: IllegalArgumentException) {
            null
        } ?: return
        val data = message["data"] as? JsonObject
        when (message.string("entity")) {
            "inbox" -> trigger.requestNow()

            "issue" -> data?.string("id")?.let(issueChanged)

            "comment", "activity", "attestation" -> data?.string("issue_id")?.let(issueChanged)

            "relation" -> listOfNotNull(data?.string("source_issue_id"), data?.string("target_issue_id"))
                .forEach(issueChanged)
        }
    }

    /** Hands a socket's callbacks to the loop, in order, whatever thread they come from. */
    private class Relay(private val events: Channel<Event>) : LiveListener {
        override fun onOpen() {
            events.trySend(Event.Open)
        }

        override fun onMessage(text: String) {
            events.trySend(Event.Message(text))
        }

        override fun onEnd(end: WsEnd) {
            events.trySend(Event.End(end))
        }
    }

    companion object {
        /** Issue refreshes out at once, across all of a team's events: each is three requests. */
        const val MAX_REFRESHES = 3

        /** `wss://host/ws?team_id=…` for an https server, `ws://` for a plain one. */
        fun url(baseUrl: String, teamId: String): String {
            val base = baseUrl.trimEnd('/')
            val socket = when {
                base.startsWith("https://") -> "wss://" + base.removePrefix("https://")
                base.startsWith("http://") -> "ws://" + base.removePrefix("http://")
                else -> base
            }
            return "$socket/ws?team_id=" + URLEncoder.encode(teamId, Charsets.UTF_8)
        }

        private fun JsonObject.string(key: String): String? =
            (this[key] as? JsonPrimitive)?.takeIf { it.isString }?.content
    }
}
