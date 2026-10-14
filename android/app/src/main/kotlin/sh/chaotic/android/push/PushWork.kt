package sh.chaotic.android.push

import android.content.Context
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.android.EntryPointAccessors
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineScope
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.SyncOutcome
import sh.chaotic.sync.push.PushHandler
import sh.chaotic.sync.push.PushRegistrar
import java.util.concurrent.TimeUnit

/** What the push service and the workers need, which Android constructs without Hilt's help. */
@EntryPoint
@InstallIn(SingletonComponent::class)
interface PushEntryPoint {
    fun sessions(): SessionManager

    fun syncer(): InboxSyncer

    fun registrar(): PushRegistrar

    fun handler(): PushHandler

    fun controller(): PushController

    @ApplicationScope
    fun scope(): CoroutineScope
}

fun Context.pushEntryPoint(): PushEntryPoint =
    EntryPointAccessors.fromApplication(applicationContext, PushEntryPoint::class.java)

/**
 * The background inbox sync (CHT-1612): soon after a push says the inbox
 * changed, and every 15 minutes while there is no push (the poll
 * fallback). Both need a network.
 */
object PushWork {
    private const val PERIODIC = "inbox-poll"
    private const val SOON = "inbox-sync-soon"

    private val online = Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()

    /** Sync once, as soon as there is a network. One already waiting covers this request too. */
    fun syncSoon(context: Context) {
        WorkManager.getInstance(context).enqueueUniqueWork(
            SOON,
            ExistingWorkPolicy.KEEP,
            OneTimeWorkRequestBuilder<InboxSyncWorker>().setConstraints(online).build(),
        )
    }

    fun setPolling(context: Context, enabled: Boolean) {
        val work = WorkManager.getInstance(context)
        if (enabled) {
            work.enqueueUniquePeriodicWork(
                PERIODIC,
                ExistingPeriodicWorkPolicy.KEEP,
                PeriodicWorkRequestBuilder<InboxSyncWorker>(PushRegistrar.FALLBACK_INTERVAL_MINUTES, TimeUnit.MINUTES)
                    .setConstraints(online)
                    .build(),
            )
        } else {
            work.cancelUniqueWork(PERIODIC)
        }
    }

    fun cancelAll(context: Context) {
        val work = WorkManager.getInstance(context)
        work.cancelUniqueWork(PERIODIC)
        work.cancelUniqueWork(SOON)
    }
}

/**
 * One background sync: register an endpoint the server could not be
 * told about earlier, sync the inbox, and in the poll fallback turn what
 * it brought in into notifications. Signed out, it stops all background
 * work instead.
 */
class InboxSyncWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        val deps = applicationContext.pushEntryPoint()
        val sessions = deps.sessions()
        // A worker can be the first thing to run in a fresh process.
        sessions.load()
        if (sessions.cacheOwner() == null) {
            PushWork.cancelAll(applicationContext)
            return Result.success()
        }
        val registered = deps.registrar().flushPending()
        val outcome = deps.syncer().sync()
        deps.controller().afterBackgroundSync(outcome)
        deps.controller().updateSchedule()
        return when {
            outcome is SyncOutcome.Failed -> Result.retry()
            registered == PushRegistrar.FlushResult.RETRY -> Result.retry()
            else -> Result.success()
        }
    }
}
