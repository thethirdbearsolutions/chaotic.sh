package sh.chaotic.android.live

import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch
import kotlinx.coroutines.supervisorScope
import okhttp3.OkHttpClient
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.push.ApplicationScope
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.live.LiveFeed
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.coroutines.cancellation.CancellationException

/**
 * The /ws live feed while the app is on screen (CHT-1655): one socket per
 * cached team, opened again when the team list changes. An inbox event
 * syncs the inbox now; an issue event refreshes that issue if it is
 * cached, so an open issue screen updates. The minute poll goes on
 * underneath, so a feed that stops (4003, signed out) loses nothing but
 * speed.
 *
 * It runs on the application scope, off the main thread: [start] when
 * the app comes on screen signed in, [stop] when it leaves. A stop waits
 * [STOP_GRACE_MILLIS] first, so a rotation (the activity stopped and
 * started again at once) keeps the sockets rather than reopening them.
 */
@Singleton
class LiveUpdates
@Inject
constructor(
    private val dao: CacheDao,
    sessions: SessionManager,
    plain: OkHttpClient,
    trigger: SyncTrigger,
    refresher: CacheRefresher,
    @param:ApplicationScope private val scope: CoroutineScope,
) {
    private val feed = LiveFeed(
        connector = OkHttpLiveConnector(plain.newBuilder().pingInterval(PING_SECONDS, TimeUnit.SECONDS).build()),
        grant = sessions::grant,
        refresh = sessions::refreshAfterRejection,
        trigger = trigger,
        onIssueChanged = { issueId -> quietly { refresher.refreshCachedIssue(issueId) } },
    )

    // Touched on the main thread only (the activity's lifecycle).
    private var running: Pair<String, Job>? = null
    private var stopping: Job? = null

    /** On screen and signed in as [person] (any key that changes with the account): follow the feed. */
    fun start(person: String) {
        stopping?.cancel()
        stopping = null
        if (running?.first == person && running?.second?.isActive == true) return
        running?.second?.cancel()
        running = person to scope.launch { run() }
    }

    /** Off screen: stop after the grace period, unless started again first. */
    fun stop() {
        if (stopping != null) return
        stopping = scope.launch {
            delay(STOP_GRACE_MILLIS)
            stopNow()
        }
    }

    /** Signed out: stop at once. */
    fun stopNow() {
        running?.second?.cancel()
        running = null
    }

    private suspend fun run() {
        dao.observeTeams().map { rows -> rows.map { it.id }.toSet() }.distinctUntilChanged().collectLatest { teams ->
            // One team's feed failing must not end the others'.
            supervisorScope { teams.forEach { launch { quietly { feed.watch(it) } } } }
        }
    }

    private suspend fun quietly(block: suspend () -> Unit) {
        try {
            block()
        } catch (e: CancellationException) {
            throw e
        } catch (@Suppress("TooGenericExceptionCaught") e: Exception) {
            // Only the class: a message could carry a URL or a token.
            Log.w(TAG, "Live feed work failed: ${e.javaClass.name}")
        }
    }

    private companion object {
        const val TAG = "LiveUpdates"

        /** Pings find a connection the network dropped silently, well inside the server's 30 s recheck. */
        const val PING_SECONDS = 25L

        const val STOP_GRACE_MILLIS = 5_000L
    }
}
