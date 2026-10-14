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

/** Which queued decision a [DecisionWorker] reports on. */
data class DecisionReport(
    val entryId: String,
    val kind: String,
    val issue: String?,
    val approve: Boolean,
    val key: String,
) {
    fun toData(): Data = Data.Builder()
        .putString(ENTRY, entryId)
        .putString(KIND, kind)
        .putString(ISSUE, issue)
        .putBoolean(APPROVE, approve)
        .putString(KEY, key)
        .build()

    companion object {
        private const val ENTRY = "entry"
        private const val KIND = "kind"
        private const val ISSUE = "issue"
        private const val APPROVE = "approve"
        private const val KEY = "key"

        fun from(data: Data): DecisionReport? {
            val entryId = data.getString(ENTRY)
            val kind = data.getString(KIND)
            val key = data.getString(KEY)
            if (entryId == null || kind == null || key == null) return null
            return DecisionReport(entryId, kind, data.getString(ISSUE), data.getBoolean(APPROVE, true), key)
        }
    }
}

/**
 * Approve and Reject from a gate or review notification (CHT-1665).
 *
 * A tap ([onTap]) queues the decision in the write queue at once (no
 * undo window: there is no undo on a lock screen), through the cache
 * session, for the person the notification was posted for only
 * ([WriteQueue.decideFromNotification]). The notification's buttons go,
 * and a notice says what is happening. [DecisionWork] then sends the
 * queue and reports the outcome ([settle]): Approved or Rejected; the
 * server's reason when it refused (a 409 `ritual_already_resolved` says
 * who already decided); or that it waits for the server. The write's
 * Idempotency-Key makes a resend after a lost answer safe.
 */
@Singleton
class NotificationDecisions
@Inject
constructor(
    @param:ApplicationContext private val context: Context,
    private val sessions: SessionManager,
    private val queue: WriteQueue,
    private val syncer: InboxSyncer,
    private val notifier: AndroidNotifier,
) {
    suspend fun onTap(tap: DecisionTap, typed: String?) {
        // A tap can start the process: nothing acts for a session not yet read.
        sessions.load()
        val note = when (tap.decision) {
            DecisionTap.APPROVE -> null
            else -> typed?.trim()?.takeIf { it.isNotEmpty() } ?: context.getString(R.string.decision_canned_note)
        }
        val approve = note == null
        var result = queue.decideFromNotification(tap.owner, tap.entryId, note)
        if (result == NotificationDecision.Gone) {
            // A push can arrive before the sync that brings its entry in: catch up once, then look again.
            val synced = withTimeoutOrNull(CATCH_UP_MILLIS) { syncer.sync() }
            if (synced != null) result = queue.decideFromNotification(tap.owner, tap.entryId, note)
        }
        // Whatever came of it, the buttons go; the notice says what happened.
        notifier.withdraw(tap.entryId)
        notifier.showDecision(tap.entryId, onTapNotice(notifier.title(tap.kind, tap.issue), approve, result))
        if (result is NotificationDecision.Queued) {
            DecisionWork.start(context, DecisionReport(tap.entryId, tap.kind, tap.issue, approve, result.key))
        }
    }

    /**
     * Send what is due and show where [report]'s write is now. Returns
     * how long to wait before looking again while it is still queued,
     * or null once it is settled.
     */
    suspend fun settle(report: DecisionReport): Long? {
        sessions.load()
        val outcome = queue.flush()
        val status = queue.status(report.key)
        if (status == WriteStatus.SignedOut) {
            // Signed out since: whatever this was went with the cache.
            notifier.cancelDecision(report.entryId)
            return null
        }
        notifier.showDecision(report.entryId, statusNotice(notifier.title(report.kind, report.issue), report, status))
        return if (status == WriteStatus.Waiting) followUpMillis(outcome) else null
    }

    private fun onTapNotice(title: String, approve: Boolean, result: NotificationDecision): DecisionNotice =
        when (result) {
            is NotificationDecision.Queued ->
                pending(title, if (approve) R.string.decision_approving else R.string.decision_rejecting)

            NotificationDecision.Gone -> settled(title, R.string.decision_gone)

            NotificationDecision.NotOffered -> settled(title, R.string.decision_not_offered)

            NotificationDecision.AlreadyQueued -> settled(title, R.string.decision_already_queued)

            NotificationDecision.SignedOut -> settled(title, R.string.decision_signed_out)
        }

    private fun statusNotice(title: String, report: DecisionReport, status: WriteStatus): DecisionNotice =
        when (status) {
            WriteStatus.Done ->
                settled(title, if (report.approve) R.string.decision_approved else R.string.decision_rejected)

            is WriteStatus.Refused -> DecisionNotice(
                title,
                status.refusal.message?.takeIf { it.isNotBlank() } ?: string(R.string.decision_refused),
                // The server's reason can name people: not on a lock screen hiding sensitive content.
                string(R.string.decision_refused_public),
                expires = false,
            )

            WriteStatus.Stalled -> pending(title, R.string.decision_stalled)

            WriteStatus.Waiting, WriteStatus.SignedOut -> pending(title, R.string.decision_waiting)
        }

    private fun settled(title: String, text: Int) = string(text).let { DecisionNotice(title, it, it, expires = true) }

    private fun pending(title: String, text: Int) = string(text).let { DecisionNotice(title, it, it, expires = false) }

    private fun string(id: Int) = context.getString(id)

    private companion object {
        /** How long a tap waits for a sync to bring in an entry the cache does not hold yet. */
        const val CATCH_UP_MILLIS = 8_000L

        const val MIN_FOLLOW_UP_MILLIS = 15_000L

        /** When the queue cannot say: about when its first retry falls due. */
        const val DEFAULT_FOLLOW_UP_MILLIS = 30_000L

        fun followUpMillis(outcome: FlushOutcome): Long {
            val hint = when (outcome) {
                is FlushOutcome.Done -> outcome.nextDueInMillis
                is FlushOutcome.Retry -> outcome.afterMillis
                FlushOutcome.Unauthorized -> null
            }
            return (hint ?: DEFAULT_FOLLOW_UP_MILLIS).coerceIn(MIN_FOLLOW_UP_MILLIS, WriteQueue.MAX_RETRY_MILLIS)
        }
    }
}

/**
 * The work that sends a notification's decision and reports on it
 * (CHT-1665). The first run is expedited, so a lock-screen Approve goes
 * out at once even with the app closed; while the write is still queued
 * (offline, or the server failing it), a follow-up waits for a network
 * and looks again. One chain per entry.
 */
object DecisionWork {
    private val online = Constraints.Builder().setRequiredNetworkType(NetworkType.CONNECTED).build()

    fun start(context: Context, report: DecisionReport) = enqueue(
        context,
        report,
        OneTimeWorkRequestBuilder<DecisionWorker>()
            .setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)
            .setInputData(report.toData())
            .build(),
    )

    fun followUp(context: Context, report: DecisionReport, delayMillis: Long) = enqueue(
        context,
        report,
        OneTimeWorkRequestBuilder<DecisionWorker>()
            .setConstraints(online)
            .setInitialDelay(delayMillis, TimeUnit.MILLISECONDS)
            .setInputData(report.toData())
            .build(),
    )

    // Appended: a follow-up enqueued by the run before it waits for that run to end.
    private fun enqueue(context: Context, report: DecisionReport, request: OneTimeWorkRequest) {
        WorkManager.getInstance(context)
            .enqueueUniqueWork(NAME_PREFIX + report.entryId, ExistingWorkPolicy.APPEND_OR_REPLACE, request)
    }

    private const val NAME_PREFIX = "decision:"
}

class DecisionWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    @Suppress("TooGenericExceptionCaught") // a failed send is tried again later, never dropped
    override suspend fun doWork(): Result {
        val report = DecisionReport.from(inputData) ?: return Result.success()
        return try {
            val again = applicationContext.decisionEntryPoint().decisions().settle(report)
            if (again != null) DecisionWork.followUp(applicationContext, report, again)
            Result.success()
        } catch (e: CancellationException) {
            throw e
        } catch (e: Exception) {
            // The class only: a message could carry a note's text.
            Log.w(TAG, "Decision failed: ${e.javaClass.name}")
            Result.retry()
        }
    }

    /** Before Android 12, expedited work runs as a foreground service, which needs a notification. */
    override suspend fun getForegroundInfo(): ForegroundInfo =
        ForegroundInfo(AndroidNotifier.SENDING_ID, applicationContext.decisionEntryPoint().notifier().sending())

    private companion object {
        const val TAG = "ChaoticDecisions"
    }
}
