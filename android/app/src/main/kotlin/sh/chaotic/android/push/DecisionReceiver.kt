package sh.chaotic.android.push

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.core.app.RemoteInput
import dagger.hilt.EntryPoint
import dagger.hilt.InstallIn
import dagger.hilt.android.EntryPointAccessors
import dagger.hilt.components.SingletonComponent
import sh.chaotic.android.R
import sh.chaotic.sync.takeWhole

/**
 * One tap on a gate or review notification's Approve, Reject or Reject
 * with note (CHT-1665): which entry, for whom ([owner], the cache owner
 * key of the person the notification was posted for), and what to do.
 * It travels in the button's intent; nothing in it is trusted to act on
 * its own: the entry is looked up in that person's cache before anything
 * is queued.
 */
data class DecisionTap(
    val entryId: String,
    val owner: String,
    val kind: String,
    val issue: String?,
    val decision: String,
) {
    fun toIntent(context: Context): Intent = Intent(context, DecisionReceiver::class.java)
        .setAction(ACTION)
        // One distinct intent per entry and button, so no two PendingIntents share extras.
        .setData(Uri.Builder().scheme(SCHEME).authority(decision).appendPath(entryId).build())
        .putExtra(EXTRA_ENTRY, entryId)
        .putExtra(EXTRA_OWNER, owner)
        .putExtra(EXTRA_KIND, kind)
        .putExtra(EXTRA_ISSUE, issue)
        .putExtra(EXTRA_DECISION, decision)

    companion object {
        const val APPROVE = "approve"
        const val REJECT = "reject"
        const val REJECT_WITH_NOTE = "reject-with-note"

        /** The RemoteInput key the typed note comes back under. */
        const val KEY_NOTE = "note"

        private const val ACTION = "sh.chaotic.android.DECIDE"
        private const val SCHEME = "chaotic-decision"
        private const val EXTRA_ENTRY = "entry"
        private const val EXTRA_OWNER = "owner"
        private const val EXTRA_KIND = "kind"
        private const val EXTRA_ISSUE = "issue"
        private const val EXTRA_DECISION = "decision"

        private val DECISIONS = setOf(APPROVE, REJECT, REJECT_WITH_NOTE)

        // What the push payload already allowed (PushPayload.parse).
        private val ID = Regex("^[A-Za-z0-9._-]{1,128}$")
        private val KIND = Regex("^[a-z0-9_]{1,64}$")
        private val IDENTIFIER = Regex("^[A-Za-z0-9_-]{1,32}$")

        /** The tap [intent] carries, or null when it is not one this app made. */
        @Suppress("ReturnCount") // each missing or malformed extra is an early null
        fun from(intent: Intent): DecisionTap? {
            fun extra(name: String, valid: (String) -> Boolean) = intent.getStringExtra(name)?.takeIf(valid)
            val tap = DecisionTap(
                entryId = extra(EXTRA_ENTRY, ID::matches) ?: return null,
                owner = extra(EXTRA_OWNER, String::isNotEmpty) ?: return null,
                kind = extra(EXTRA_KIND, KIND::matches) ?: return null,
                issue = extra(EXTRA_ISSUE, IDENTIFIER::matches),
                decision = extra(EXTRA_DECISION) { it in DECISIONS } ?: return null,
            )
            return tap.takeIf { intent.action == ACTION }
        }
    }
}

/** What [DecisionWorker] needs, which Android constructs without Hilt's help. */
@EntryPoint
@InstallIn(SingletonComponent::class)
interface DecisionEntryPoint {
    fun decisions(): NotificationDecisions

    fun notifier(): AndroidNotifier
}

fun Context.decisionEntryPoint(): DecisionEntryPoint =
    EntryPointAccessors.fromApplication(applicationContext, DecisionEntryPoint::class.java)

/**
 * Where a notification's Approve and Reject buttons arrive (CHT-1665).
 * Not exported: only this app's own PendingIntents reach it. It reads
 * the tap, takes the buttons away behind a "Sending" notice
 * ([NotificationDecisions.tapped]), and hands it to [DecisionWork],
 * whose expedited worker looks the entry up, queues the decision and
 * sends it: nothing slow
 * runs in the broadcast, and a tap survives the process dying, since
 * WorkManager keeps the step until it has run.
 */
class DecisionReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val tap = DecisionTap.from(intent) ?: return
        val job = DecisionJob.of(tap, note(context, intent, tap))
        // The buttons go now, not when the worker runs, so a second tap cannot follow the first (CHT-1685).
        // A notice that cannot be shown must not lose the tap itself.
        runCatching { context.decisionEntryPoint().decisions().tapped(job) }
        DecisionWork.start(context, job)
    }

    companion object {
        /**
         * The worker's input holds at most 10 KB, so a typed note is cut
         * to this many characters (the server allows more; an inline
         * reply is rarely long), on a code-point boundary.
         */
        const val MAX_NOTE_CHARS = 3_000

        /**
         * A reject's reason: what was typed for Reject with note, else the
         * canned "Rejected from phone". Null for Approve.
         */
        fun note(context: Context, intent: Intent, tap: DecisionTap): String? {
            if (tap.decision == DecisionTap.APPROVE) return null
            val typed = if (tap.decision == DecisionTap.REJECT_WITH_NOTE) {
                RemoteInput.getResultsFromIntent(intent)?.getCharSequence(DecisionTap.KEY_NOTE)?.toString()?.trim()
            } else {
                null
            }
            return typed?.takeIf { it.isNotEmpty() }?.takeWhole(MAX_NOTE_CHARS)
                ?: context.getString(R.string.decision_canned_note)
        }
    }
}
