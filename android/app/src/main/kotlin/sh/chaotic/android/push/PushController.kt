package sh.chaotic.android.push

import android.app.Activity
import android.content.Context
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
        scope.launch {
            sessions.state.collect { if (it is AuthState.SignedOut) signedOut() }
        }
        scope.launch {
            combine(dao.observeInbox(), syncer.lastSyncedAtMillis) { rows, synced ->
                NotificationPlanner.reconcileWithCache(notifier.shown(), rows.associate { it.id to it.read }, synced)
            }.collect { notifier.apply(it) }
        }
    }

    suspend fun onAppOpen(activity: Activity) {
        if (sessions.cacheOwner() == null) return
        registrar.start(distributorAvailable = UnifiedPushDistributor.pick(activity))
        if (registrar.takeNoDistributorNotice()) notice.value = true
        updateSchedule()
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

    private suspend fun signedOut() {
        registrar.signedOut()
        notifier.cancelAll()
        PushWork.cancelAll(context)
        notice.value = false
    }
}
