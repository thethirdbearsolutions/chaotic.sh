package sh.chaotic.android.ui

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeoutOrNull
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.push.NotificationTap
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSyncer
import javax.inject.Inject

/**
 * Opens what a tapped notification was about (CHT-1660). A push carries
 * the entry's id but not its team, which [Destination.Issue] needs, so the
 * entry is read from the cache; a push that came before the sync did is
 * found by syncing once.
 *
 * The rule for when the issue opens: only for the person the notification
 * was posted for, only if the entry is found within [OPEN_WINDOW_MILLIS]
 * of the tap, and only over the screen the person was on when the tap
 * arrived ([TapRoute]). Anything else leaves them where they are: a tap
 * must not pull them off a screen they went to while it was looking.
 *
 * Opening it reads it, as a tap in the inbox does; the read is queued
 * after the issue is asked for and does not hold it up. A sign-out drops
 * a lookup in flight and anything not yet shown. MainActivity hands this
 * same instance to the signed-in navigation, which collects [opens].
 */
@HiltViewModel
class NotificationTaps
@Inject
constructor(
    private val sessions: SessionManager,
    private val cache: CacheSession,
    private val syncer: InboxSyncer,
    private val writes: WriteActions,
) : ViewModel() {
    /** What the navigation hears about a tap; [tap] numbers the taps. */
    sealed interface Open {
        val tap: Int

        /** A tap arrived: the issue may open over the screen shown now. */
        data class Tapped(override val tap: Int) : Open

        /** The tapped entry is on [issue]. */
        data class Found(override val tap: Int, val issue: Destination.Issue) : Open
    }

    private val events = Channel<Open>(Channel.UNLIMITED)
    private var taps = 0
    private var pending: Job? = null

    val opens: Flow<Open> = events.receiveAsFlow()

    init {
        viewModelScope.launch {
            sessions.state.collect { if (it is AuthState.SignedOut) forget() }
        }
    }

    /** Look [tap]'s entry up and open it; the job is the lookup, done when it has settled. */
    fun open(tap: NotificationTap): Job {
        pending?.cancel()
        val number = ++taps
        events.trySend(Open.Tapped(number))
        return viewModelScope.launch {
            val entry = guarded("find") { withTimeoutOrNull(OPEN_WINDOW_MILLIS) { find(tap) } } ?: return@launch
            entry.issueId?.let { events.trySend(Open.Found(number, Destination.Issue(it, entry.teamId))) }
            guarded("read") { writes.opened(entry) }
        }.also { pending = it }
    }

    private fun forget() {
        pending?.cancel()
        while (events.tryReceive().isSuccess) Unit
    }

    private suspend fun find(tap: NotificationTap): InboxEntry? {
        // The session loads as the app starts.
        sessions.state.first { it is AuthState.SignedIn }
        return cached(tap) ?: run {
            if (sessions.cacheOwner() != tap.owner) return null
            syncer.sync()
            cached(tap)
        }
    }

    /**
     * [tap]'s entry, read the way every cache reader does: for the person
     * the notification was for, once the cache is claimed for them, and
     * not across a sign-out.
     */
    private suspend fun cached(tap: NotificationTap): InboxEntry? {
        val ticket = cache.begin()?.takeIf { sessions.cacheOwner() == tap.owner } ?: return null
        return cache.write(ticket) { listOfNotNull(inboxEntry(tap.entryId)) }?.firstOrNull()
    }

    @Suppress("TooGenericExceptionCaught") // a tap that fails leaves the person on the inbox, never crashes
    private suspend fun <T> guarded(step: String, block: suspend () -> T): T? = try {
        block()
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        Log.w(TAG, "notification tap: $step failed", e)
        null
    }

    companion object {
        /** A few seconds: a sync on a fair network, short enough that the tap is still what the person is doing. */
        const val OPEN_WINDOW_MILLIS = 5_000L
        private const val TAG = "NotificationTaps"
    }
}

/**
 * The navigation's half of the rule in [NotificationTaps]: an issue found
 * for a tap opens only if nothing has moved since that tap arrived, the
 * same screen ([here], the back stack entry's id) and no later tap. One
 * per signed-in navigation, so a tap from before a sign-out has nothing
 * to match.
 */
class TapRoute {
    private var waiting: Pair<Int, String?>? = null

    /** The issue to open for [open], seen while [here] is shown, or null. */
    fun on(open: NotificationTaps.Open, here: String?): Destination.Issue? = when (open) {
        is NotificationTaps.Open.Tapped -> {
            waiting = open.tap to here
            null
        }

        is NotificationTaps.Open.Found -> open.issue.takeIf { waiting == (open.tap to here) }.also { waiting = null }
    }
}
