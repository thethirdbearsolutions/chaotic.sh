package sh.chaotic.android.push

import android.content.Context
import android.util.Log
import androidx.work.Constraints
import androidx.work.CoroutineWorker
import androidx.work.Data
import androidx.work.ExistingWorkPolicy
import androidx.work.ForegroundInfo
import androidx.work.NetworkType
import androidx.work.OneTimeWorkRequest
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.OutOfQuotaPolicy
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.withTimeoutOrNull
import sh.chaotic.android.R
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.FlushOutcome
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.NotificationDecision
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.WriteStatus
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

/**
 * How a decision made from a notification is going, as its notification
 * shows it ([AndroidNotifier.showDecision]). [publicText] is what a lock
 * screen hiding sensitive content shows instead of [text]; [expires]
 * takes it down after a while (a settled outcome, not a refusal the
 * person should read).
 */
data class DecisionNotice(val title: String, val text: String, val publicText: String, val expires: Boolean)

/**
 * One step of a notification's decision (CHT-1665), as [DecisionWorker]
 * input. Without [key], a tap still to be queued ([note] is a reject's
 * reason); with it, the queued write of [write]'s kind to follow, for
 * [owner] only. [watch]: an in-app swipe's undo window was open, so look
 * whether it went before taking the buttons away.
 */
data class DecisionJob(
    val entryId: String,
    val owner: String,
    val kind: String,
    val issue: String?,
    val write: WriteKind,
    val note: String? = null,
    val key: String? = null,
    val watch: Boolean = false,
) {
    fun toData(): Data = Data.Builder()
        .putString(ENTRY, entryId)
        .putString(OWNER, owner)
        .putString(KIND, kind)
        .putString(ISSUE, issue)
        .putString(WRITE, write.name)
        .putString(NOTE, note)
        .putString(KEY, key)
        .putBoolean(WATCH, watch)
        .build()

    companion object {
        private const val ENTRY = "entry"
        private const val OWNER = "owner"
        private const val KIND = "kind"
        private const val ISSUE = "issue"
        private const val WRITE = "write"
        private const val NOTE = "note"
        private const val KEY = "key"
        private const val WATCH = "watch"

        /** The tap [tap], with [note] its reason when it rejects. */
        fun of(tap: DecisionTap, note: String?) = DecisionJob(
            entryId = tap.entryId,
            owner = tap.owner,
            kind = tap.kind,
            issue = tap.issue,
            write = if (tap.decision == DecisionTap.APPROVE) WriteKind.APPROVE else WriteKind.REJECT,
            note = note,
        )

        @Suppress("ReturnCount") // each missing field is an early null
        fun from(data: Data): DecisionJob? {
            val write = WriteKind.entries.firstOrNull { it.name == data.getString(WRITE) } ?: return null
            return DecisionJob(
                entryId = data.getString(ENTRY) ?: return null,
                owner = data.getString(OWNER) ?: return null,
                kind = data.getString(KIND) ?: return null,
                issue = data.getString(ISSUE),
                write = write,
                note = data.getString(NOTE),
                key = data.getString(KEY),
                watch = data.getBoolean(WATCH, false),
            )
        }
    }
}

/** The step after a [DecisionJob]: [job], in [delayMillis], once there is a network when [online]. */
data class DecisionStep(val job: DecisionJob, val delayMillis: Long, val online: Boolean)

/**
 * Approve and Reject from a gate or review notification (CHT-1665), run
 * by [DecisionWorker] ([process]) so nothing slow happens in the
 * broadcast.
 *
 * - A tap queues the decision at once (no undo window on a lock screen),
 *   through the cache session and for the person the notification was
 *   posted for only ([WriteQueue.decideFromNotification]). An entry the
 *   cache does not hold yet gets one catch-up sync first: a push can
 *   arrive before the sync that brings its entry in.
 * - Once a decision is on its way, the buttons go and a live notice says
 *   so; the queue is sent, and the notice says how it ended: Approved or
 *   Rejected only when the server took it in this process, the server's
 *   reason when it refused (a 409 `ritual_already_resolved` says who
 *   already decided), or that it waits for the server, looked at again
 *   later. A write that is simply gone (discarded in the app, emptied at
 *   a sign-out) is never called done.
 * - A tap while an in-app swipe on the entry can still be undone looks
 *   again when the undo window closes. If the swipe was undone, the
 *   notice says nothing is known to be sent and points to the app.
 * - Nothing about another account is ever shown: a tap for someone not
 *   signed in says only that, and a step for them drops its notice.
 */
@Singleton
@Suppress("TooManyFunctions") // one per step of a decision, and per notice it shows
class NotificationDecisions
@Inject
constructor(
    @param:ApplicationContext private val context: Context,
    private val sessions: SessionManager,
    private val queue: WriteQueue,
    private val syncer: InboxSyncer,
    private val notifier: AndroidNotifier,
    private val records: DecisionRecords,
) {
    /** Do [job]; the step after it, or null when it is settled. */
    suspend fun process(job: DecisionJob): DecisionStep? {
        // A worker can be the first thing to run in a fresh process.
        sessions.load()
        val key = job.key
        return when {
            key == null -> decide(job)
            job.watch -> watch(job, key)
            else -> settle(job, key)
        }
    }

    /**
     * A tap just arrived, in the receiver: the buttons go at once behind a
     * "Sending" notice, so a second tap cannot follow before the worker
     * runs (CHT-1685). Nothing is looked up here; [process] does that.
     */
    fun tapped(job: DecisionJob) {
        notifier.withdraw(job.entryId)
        notifier.showDecision(job.entryId, pending(title(job), sendingText(job.write)))
    }

    /** [job] failed with an error: whatever it was, the buttons go and the person is pointed to the app. */
    fun failed(job: DecisionJob) {
        notifier.withdraw(job.entryId)
        // No issue key: the account may have changed since.
        notifier.showDecision(job.entryId, pending(appName(), R.string.decision_failed))
    }

    @Suppress("ReturnCount") // a decision already recorded is followed before anything is queued
    private suspend fun decide(job: DecisionJob): DecisionStep? {
        // Run again, or a second tap: follow the write already queued, while the queue still knows it (CHT-1685).
        val recorded = records.get(job.owner, job.entryId)
        val known = recorded?.let { queue.status(it.key, job.owner) }
        if (recorded != null && known != WriteStatus.Unknown && known != WriteStatus.SignedOut) {
            return track(job.copy(key = recorded.key, write = recorded.kind, note = null))
        }
        var result = queue.decideFromNotification(job.owner, job.entryId, job.note)
        if (result == NotificationDecision.Gone) {
            val synced = withTimeoutOrNull(CATCH_UP_MILLIS) { syncer.sync() }
            if (synced != null) result = queue.decideFromNotification(job.owner, job.entryId, job.note)
        }
        return when (result) {
            is NotificationDecision.Queued -> {
                remember(job, DecisionRecords.Recorded(job.write, result.key))
                track(job.copy(key = result.key, note = null))
            }

            is NotificationDecision.AlreadyQueued -> {
                val queued = job.copy(key = result.key, write = result.kind, note = null)
                if (result.dueInMillis > 0) {
                    DecisionStep(queued.copy(watch = true), result.dueInMillis + UNDO_SLACK_MILLIS, online = false)
                } else {
                    remember(job, DecisionRecords.Recorded(result.kind, result.key))
                    track(queued)
                }
            }

            // A decision of ours went out for it and is no longer queued: most likely taken, so never "nothing sent".
            NotificationDecision.Gone -> if (recorded != null) {
                finish(job, pending(title(job), R.string.decision_unknown))
            } else {
                finish(job, settled(title(job), R.string.decision_gone))
            }

            NotificationDecision.NotOffered -> finish(job, settled(title(job), R.string.decision_not_offered))

            // Someone else is signed in, or nobody: not even the issue key is shown.
            NotificationDecision.SignedOut -> finish(job, settled(appName(), R.string.decision_signed_out))
        }
    }

    /**
     * Keep what [job] queued; dropped again if [job]'s person signed out
     * meanwhile, so a sign-out that cleared the records just before this
     * write does not leave one behind.
     */
    private suspend fun remember(job: DecisionJob, recorded: DecisionRecords.Recorded) {
        records.put(job.owner, job.entryId, recorded)
        if (sessions.grant()?.owner != job.owner) records.remove(job.owner, job.entryId)
    }

    /** After an in-app swipe's undo window: follow it if it went, else say it is not known to be sent. */
    private suspend fun watch(job: DecisionJob, key: String): DecisionStep? =
        when (val status = queue.status(key, job.owner)) {
            WriteStatus.Waiting, WriteStatus.Stalled -> track(job.copy(watch = false))

            WriteStatus.Done, is WriteStatus.Refused -> finish(job, statusNotice(job, status))

            // Undone in the app, or taken by a run the queue no longer remembers: the buttons are gone, so say so.
            WriteStatus.Unknown -> finish(job, pending(title(job), R.string.decision_unknown))

            // Not the person signed in now: nothing of theirs stays up.
            WriteStatus.SignedOut -> {
                notifier.cancelDecision(job.entryId)
                null
            }
        }

    /** The decision is on its way: the buttons go, a live notice says so, and the queue is sent. */
    private suspend fun track(job: DecisionJob): DecisionStep? {
        notifier.withdraw(job.entryId)
        notifier.showDecision(job.entryId, pending(title(job), sendingText(job.write)))
        return settle(job, job.key ?: return null)
    }

    /** Send what is due and show where the write is now; the next look while it still waits. */
    private suspend fun settle(job: DecisionJob, key: String): DecisionStep? {
        val outcome = queue.flush()
        return when (val status = queue.status(key, job.owner)) {
            WriteStatus.SignedOut -> {
                // Not the person signed in now: nothing of theirs stays up.
                notifier.cancelDecision(job.entryId)
                null
            }

            WriteStatus.Waiting -> {
                notifier.showDecision(job.entryId, statusNotice(job, status))
                DecisionStep(job, followUpMillis(outcome), online = true)
            }

            else -> {
                notifier.showDecision(job.entryId, statusNotice(job, status))
                null
            }
        }
    }

    private fun finish(job: DecisionJob, notice: DecisionNotice): DecisionStep? {
        notifier.withdraw(job.entryId)
        notifier.showDecision(job.entryId, notice)
        return null
    }

    private fun statusNotice(job: DecisionJob, status: WriteStatus): DecisionNotice {
        val title = title(job)
        return when (status) {
            WriteStatus.Done -> settled(title, doneText(job.write))

            is WriteStatus.Refused -> DecisionNotice(
                title,
                status.refusal.message?.takeIf { it.isNotBlank() } ?: string(R.string.decision_refused),
                // The server's reason can name people: not on a lock screen hiding sensitive content.
                string(R.string.decision_refused_public),
                expires = false,
            )

            WriteStatus.Stalled -> pending(title, R.string.decision_stalled)

            WriteStatus.Unknown -> pending(title, R.string.decision_unknown)

            WriteStatus.Waiting, WriteStatus.SignedOut -> pending(title, R.string.decision_waiting)
        }
    }

    private fun title(job: DecisionJob) = notifier.title(job.kind, job.issue)

    private fun appName() = string(R.string.app_name)

    private fun settled(title: String, text: Int) = string(text).let { DecisionNotice(title, it, it, expires = true) }

    private fun pending(title: String, text: Int) = string(text).let { DecisionNotice(title, it, it, expires = false) }

    private fun string(id: Int) = context.getString(id)

    companion object {
        /** How long a tap waits for a sync to bring in an entry the cache does not hold yet. */
        private const val CATCH_UP_MILLIS = 8_000L

        /** Past an undo window's end, so the in-app flush has had its turn. */
        private const val UNDO_SLACK_MILLIS = 1_000L

        private const val MIN_FOLLOW_UP_MILLIS = 15_000L

        /** When the queue cannot say: about when its first retry falls due. */
        private const val DEFAULT_FOLLOW_UP_MILLIS = 30_000L

        /** When to look again at a write still waiting, after a flush that ended in [outcome]. */
        fun followUpMillis(outcome: FlushOutcome): Long {
            val hint = when (outcome) {
                is FlushOutcome.Done -> outcome.nextDueInMillis
                is FlushOutcome.Retry -> outcome.afterMillis
                FlushOutcome.Unauthorized -> null
            }
            return (hint ?: DEFAULT_FOLLOW_UP_MILLIS).coerceIn(MIN_FOLLOW_UP_MILLIS, WriteQueue.MAX_RETRY_MILLIS)
        }

        private fun sendingText(write: WriteKind) = when (write) {
            WriteKind.REJECT -> R.string.decision_rejecting
            WriteKind.ARCHIVE -> R.string.decision_archiving
            else -> R.string.decision_approving
        }

        private fun doneText(write: WriteKind) = when (write) {
            WriteKind.REJECT -> R.string.decision_rejected
            WriteKind.ARCHIVE -> R.string.decision_archived
            else -> R.string.decision_approved
        }
    }
}

/**
 * The work behind a notification's decision (CHT-1665): one chain per
 * entry, tagged so a sign-out cancels every one ([cancelAll]). A tap's
 * step is expedited, so a lock-screen Approve goes out at once even with
 * the app closed; a step for a write still waiting needs a network.
 */
object DecisionWork {
    private const val TAG = "decision"
    private const val NAME_PREFIX = "decision:"

    private val online = Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()

    fun start(context: Context, job: DecisionJob) = enqueue(
        context,
        job,
        OneTimeWorkRequestBuilder<DecisionWorker>()
            .setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)
            .setInputData(job.toData())
            .addTag(TAG)
            .build(),
    )

    fun next(context: Context, step: DecisionStep) {
        val request = OneTimeWorkRequestBuilder<DecisionWorker>()
            .setInitialDelay(step.delayMillis, TimeUnit.MILLISECONDS)
            .setInputData(step.job.toData())
            .addTag(TAG)
        if (step.online) request.setConstraints(online)
        enqueue(context, step.job, request.build())
    }

    /**
     * Sign-out: no step of the previous person's decisions runs after it,
     * and the finished steps are pruned, so a typed note does not stay in
     * WorkManager's own database; what each decision queued is forgotten.
     */
    fun cancelAll(context: Context) {
        val work = WorkManager.getInstance(context)
        work.cancelAllWorkByTag(TAG)
        work.pruneWork()
        DecisionRecords.clear(context)
    }

    // Appended: a step enqueued by the run before it waits for that run to end.
    private fun enqueue(context: Context, job: DecisionJob, request: OneTimeWorkRequest) {
        WorkManager.getInstance(context)
            .enqueueUniqueWork(NAME_PREFIX + job.entryId, ExistingWorkPolicy.APPEND_OR_REPLACE, request)
    }
}

class DecisionWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    @Suppress("TooGenericExceptionCaught") // a failed step still leaves a notice, and is tried again
    override suspend fun doWork(): Result {
        val job = DecisionJob.from(inputData) ?: return Result.success()
        val decisions = applicationContext.decisionEntryPoint().decisions()
        return try {
            decisions.process(job)?.let { DecisionWork.next(applicationContext, it) }
            Result.success()
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            // The class only: a message could carry a note's text.
            Log.w(TAG, "Decision failed: ${e.javaClass.name}")
            decisions.failed(job)
            if (runAttemptCount < MAX_RETRIES) Result.retry() else Result.failure()
        }
    }

    /** Before Android 12, expedited work runs as a foreground service, which needs a notification. */
    override suspend fun getForegroundInfo(): ForegroundInfo =
        ForegroundInfo(AndroidNotifier.SENDING_ID, applicationContext.decisionEntryPoint().notifier().sending())

    private companion object {
        const val TAG = "ChaoticDecisions"
        const val MAX_RETRIES = 3
    }
}
