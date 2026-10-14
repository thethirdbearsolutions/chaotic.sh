package sh.chaotic.android.writes

import android.content.Context
import android.util.Log
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.ExistingWorkPolicy
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.android.EntryPointAccessors
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeoutOrNull
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.push.ApplicationScope
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.FlushOutcome
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.Issue
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.push.guarded
import javax.inject.Inject
import javax.inject.Singleton

/**
 * What the screens ask of the write queue (CHT-1613): each call queues
 * the write in the cache and has it sent ([onQueued]). The keys returned
 * are for an undo.
 */
class WriteActions(private val queue: WriteQueue, private val onQueued: () -> Unit) {
    suspend fun approve(entry: InboxEntry): String? = queued(queue.approve(entry))

    suspend fun reject(entry: InboxEntry, note: String): String? = queued(queue.reject(entry, note))

    suspend fun archive(entry: InboxEntry): String? = queued(queue.archive(entry))

    /** A swipe: undoable, like the others. */
    suspend fun markRead(entry: InboxEntry): String? = queued(queue.markRead(entry, WriteQueue.UNDO_MILLIS))

    /** Opening the entry: no undo, it goes now. */
    suspend fun opened(entry: InboxEntry): String? = queued(queue.markRead(entry))

    suspend fun comment(issue: Issue, content: String): String? = queued(queue.comment(issue, content))

    suspend fun update(issue: Issue, field: String, value: String?, valueLabel: String? = null): String? =
        queued(queue.update(issue, field, value, valueLabel))

    suspend fun undo(key: String): Boolean = queue.undo(key)

    suspend fun dismissRefusal(key: String) = queue.dismissRefusal(key)

    private fun queued(key: String?): String? {
        if (key != null) onQueued()
        return key
    }
}

/**
 * Sends the write queue while the process lives: at start (whatever a
 * previous process left), whenever something is queued, when an undo
 * window closes, and after a failure's backoff. [WriteWork] covers the
 * rest: it runs when there is a network, even if this process is gone.
 */
@Singleton
class WriteRunner
@Inject
constructor(
    @param:ApplicationContext private val context: Context,
    private val queue: WriteQueue,
    @param:ApplicationScope private val scope: CoroutineScope,
) {
    private val requests = Channel<Unit>(Channel.CONFLATED)

    fun start() {
        scope.launch {
            // Null: nothing is waiting, so wait for a request.
            var wait: Long? = 0
            while (true) {
                val due = wait
                if (due == null) requests.receive() else withTimeoutOrNull(due) { requests.receive() }
                wait = guarded(::failed) { next(queue.flush()) }
            }
        }
    }

    /** Something was queued: send it when it is due, here and, failing that, from WorkManager. */
    fun kick() {
        requests.trySend(Unit)
        WriteWork.schedule(context)
    }

    private fun next(outcome: FlushOutcome): Long? = when (outcome) {
        is FlushOutcome.Done -> outcome.nextDueInMillis
        is FlushOutcome.Retry -> outcome.afterMillis
        FlushOutcome.Unauthorized -> null
    }

    private fun failed(e: Exception) {
        // The class only: a message could carry a comment's text.
        Log.w(TAG, "Write queue failed: ${e.javaClass.name}")
    }

    private companion object {
        const val TAG = "ChaoticWrites"
    }
}

/** What [WriteWorker] needs, which Android constructs without Hilt's help. */
@EntryPoint
@InstallIn(SingletonComponent::class)
interface WriteEntryPoint {
    fun sessions(): SessionManager

    fun queue(): WriteQueue
}

/** The write queue's background sender: once there is a network, until everything due has gone. */
object WriteWork {
    private const val NAME = "write-queue"

    private val online = Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()

    /** One already waiting covers this request too: it sends the whole queue. */
    fun schedule(context: Context) {
        WorkManager.getInstance(context).enqueueUniqueWork(
            NAME,
            ExistingWorkPolicy.KEEP,
            OneTimeWorkRequestBuilder<WriteWorker>().setConstraints(online).build(),
        )
    }

    fun cancel(context: Context) {
        WorkManager.getInstance(context).cancelUniqueWork(NAME)
    }
}

class WriteWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    @Suppress("ReturnCount") // signed out, done, a retry and a refused session each end the work
    override suspend fun doWork(): Result {
        val deps = EntryPointAccessors.fromApplication(applicationContext, WriteEntryPoint::class.java)
        // A worker can be the first thing to run in a fresh process.
        deps.sessions().load()
        if (deps.sessions().cacheOwner() == null) return Result.success()
        repeat(MAX_ROUNDS) {
            when (val outcome = deps.queue().flush()) {
                is FlushOutcome.Done -> {
                    val due = outcome.nextDueInMillis ?: return Result.success()
                    // An undo window still open: a few seconds at most.
                    delay(due)
                }

                is FlushOutcome.Retry -> return Result.retry()

                FlushOutcome.Unauthorized -> return Result.success()
            }
        }
        return Result.retry()
    }

    private companion object {
        /** Enough for writes queued while this one ran; a worker should not run for long. */
        const val MAX_ROUNDS = 10
    }
}
