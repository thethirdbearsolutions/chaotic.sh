package sh.chaotic.android.push

import android.app.Activity
import android.content.Context
import android.util.Log
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.Remote
import sh.chaotic.sync.SyncOutcome
import sh.chaotic.sync.push.NotificationPlanner
import sh.chaotic.sync.push.PollNotifications
import sh.chaotic.sync.push.PushRegistrar
import sh.chaotic.sync.push.PushRemote
import sh.chaotic.sync.push.PushStateStore
import sh.chaotic.sync.push.collectGuarded
import sh.chaotic.sync.push.guarded
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Push on Android (CHT-1612), tying core-sync's push logic to the app's
 * lifecycle:
 *
 * - [start] (the Application): create the notification channels; on
 *   sign-out drop the subscription, the notifications and the background
 *   work; and whenever the cached inbox changes, withdraw notifications
 *   whose entries are no longer waiting.
 * - [onAppOpen] (each time the app comes on screen, signed in): pick a
 *   distributor, register, and poll in the background only without push.
 * - [afterBackgroundSync] (the sync worker): in the poll fallback, the
 *   entries the sync brought in become notifications.
 */
@Singleton
class PushController
@Inject
constructor(
    @param:ApplicationContext private val context: Context,
    private val sessions: SessionManager,
    private val registrar: PushRegistrar,
    private val store: PushStateStore,
    private val notifier: AndroidNotifier,
    private val remote: PushRemote,
    private val syncer: InboxSyncer,
    private val dao: CacheDao,
    @param:ApplicationScope private val scope: CoroutineScope,
) {
    private val notice = MutableStateFlow(false)

    /** True while the one-time "install a distributor" explanation should be on screen. */
    val noDistributorNotice: StateFlow<Boolean> = notice.asStateFlow()

    fun start() {
        AndroidNotifier.createChannels(context)
        scope.launch { sessions.load() }
        // These collectors live as long as the process: one event whose
        // handling throws must not end them, or a later sign-out would
        // leave the previous person's notifications up.
        scope.launch {
            sessions.state.collectGuarded(::failed) { if (it is AuthState.SignedOut) signedOut() }
        }
        scope.launch {
            combine(dao.observeInbox(), syncer.lastSyncedAtMillis) { rows, synced -> rows to synced }
                .collectGuarded(::failed) { (rows, synced) ->
                    val read = rows.associate { it.id to it.read }
                    notifier.apply(NotificationPlanner.reconcileWithCache(notifier.shown(), read, synced))
                }
        }
    }

    /** Runs in the activity's scope, outside the application scope's handler: a failure here is logged, not a crash. */
    suspend fun onAppOpen(activity: Activity) {
        guarded(::failed) {
            if (sessions.cacheOwner() == null) return@guarded
            registrar.start(distributorAvailable = UnifiedPushDistributor.pick(activity))
            if (registrar.takeNoDistributorNotice()) notice.value = true
            updateSchedule()
        }
    }

    fun dismissNotice() {
        notice.value = false
    }

    /** Poll in the background exactly when push is not known to work for whoever is signed in. */
    suspend fun updateSchedule() {
        PushWork.setPolling(context, PushRegistrar.pollFallback(store.read(), sessions.cacheOwner()))
    }

    suspend fun afterBackgroundSync(outcome: SyncOutcome) {
        val added = PollNotifications.added(outcome)
        if (added.isEmpty() || !PushRegistrar.pollFallback(store.read(), sessions.cacheOwner())) return
        // The person's own choices when the server can say; its defaults otherwise.
        val wanted = (remote.preferences() as? Remote.Ok)?.value
        val personId = (sessions.state.value as? AuthState.SignedIn)?.person?.id
        val entries = PollNotifications.select(added, personId, System.currentTimeMillis()) { kind ->
            wanted?.get(kind) ?: PollNotifications.wantedByDefault(kind)
        }
        PollNotifications.post(notifier, entries)
    }

    private fun failed(e: Exception) {
        // The class only: a message could carry an endpoint.
        Log.w(TAG, "Push work failed: ${e.javaClass.name}")
    }

    /** Each step on its own: a failed unregister must not leave the previous person's notifications up. */
    private suspend fun signedOut() {
        guarded(::failed) { notifier.cancelAll() }
        guarded(::failed) { PushWork.cancelAll(context) }
        notice.value = false
        guarded(::failed) { registrar.signedOut() }
    }

    private companion object {
        const val TAG = "ChaoticPush"
    }
}
