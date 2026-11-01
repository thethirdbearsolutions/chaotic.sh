package sh.chaotic.android.push

import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.app.RemoteInput
import sh.chaotic.android.R
import sh.chaotic.sync.push.NotificationAction
import sh.chaotic.sync.push.NotificationPlanner
import sh.chaotic.sync.push.Notifier
import sh.chaotic.sync.push.PushChannel
import sh.chaotic.sync.push.PushPayload
import sh.chaotic.sync.push.ShownNotification

/**
 * Carries out [NotificationAction]s on the system notification shade
 * (CHT-1612). Each inbox entry is one notification, tagged with its entry
 * id so a `resolved` message can withdraw exactly it, and grouped by its
 * collapse key so entries on one issue are bundled under a summary.
 *
 * What the shade shows is the state: [shown] reads it back from the
 * system, so nothing here can drift from what the person sees.
 *
 * Every notification is VISIBILITY_PRIVATE with a public version: on a
 * lock screen set to hide sensitive content, the entry's own text is
 * never shown. Most public versions say only that something is waiting.
 * A gate or a review waiting on the person ([DECIDABLE_KINDS]) has
 * Approve, Reject and Reject-with-note buttons (CHT-1665), on the lock
 * screen too, so its public version says what they decide: the kind and
 * the issue (`Gate waiting on you · CHT-12`), still without the entry's
 * text. The buttons go to [DecisionReceiver] and act only for the person
 * [owner] names, the one signed in when the notification was posted.
 */
@Suppress("TooManyFunctions") // the Notifier, plus one function per notification it posts
class AndroidNotifier(private val context: Context, private val owner: () -> String? = { null }) : Notifier {
    private val manager: NotificationManager = context.getSystemService(NotificationManager::class.java)

    override fun shown(): List<ShownNotification> = manager.activeNotifications.mapNotNull { status ->
        val tag: String? = status.tag
        if (tag == null || !tag.startsWith(ENTRY_TAG)) return@mapNotNull null
        val entryId = tag.removePrefix(ENTRY_TAG)
        val notification = status.notification
        ShownNotification(
            entryId = entryId,
            group = notification.group ?: PushPayload.entryCollapse(entryId),
            channel = PushChannel.entries.firstOrNull { it.id == notification.channelId } ?: PushChannel.OTHER,
            postedAtMillis = status.postTime,
        )
    }

    // Posting is checked against areNotificationsEnabled(), which on Android 13+ is false without POST_NOTIFICATIONS.
    @SuppressLint("MissingPermission")
    override fun apply(actions: List<NotificationAction>) {
        val canPost = NotificationManagerCompat.from(context).areNotificationsEnabled()
        for (action in actions) {
            when (action) {
                is NotificationAction.Show -> if (canPost) {
                    manager.notify(ENTRY_TAG + action.entry.id, ENTRY_ID, entry(action))
                }

                is NotificationAction.Summarize -> if (canPost) {
                    manager.notify(SUMMARY_TAG + action.group, SUMMARY_ID, summary(action))
                }

                is NotificationAction.Cancel -> manager.cancel(ENTRY_TAG + action.entryId, ENTRY_ID)

                is NotificationAction.CancelSummary -> manager.cancel(SUMMARY_TAG + action.group, SUMMARY_ID)
            }
        }
    }

    /** Sign-out: nothing of the previous person stays on screen. */
    fun cancelAll() = manager.cancelAll()

    /** What a notification about an entry of [kind] on [issue] is titled: `Gate waiting on you · CHT-12`. */
    fun title(kind: String, issue: String?): String {
        val label = context.getString(kindTitle(kind))
        return issue?.let { context.getString(R.string.push_title_with_issue, label, it) } ?: label
    }

    /**
     * Take [entryId]'s notification down (its buttons with it), keeping
     * its group's summary right: a decision on it was made (CHT-1665).
     */
    fun withdraw(entryId: String) = apply(NotificationPlanner.reconcile(shown()) { it.entryId != entryId })

    /**
     * Show how a decision made from [entryId]'s notification is going
     * ([DecisionNotice]), in its own notification: a later push or sync
     * about the entry never touches it. Quiet, private, and gone after a
     * while once it [DecisionNotice.expires].
     */
    @SuppressLint("MissingPermission") // checked against areNotificationsEnabled(), as in apply()
    fun showDecision(entryId: String, notice: DecisionNotice) {
        if (!NotificationManagerCompat.from(context).areNotificationsEnabled()) return
        val channel = PushChannel.APPROVALS.id
        val public = NotificationCompat
            .Builder(context, channel)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(notice.title)
            .setContentText(notice.publicText)
            .build()
        val builder = NotificationCompat
            .Builder(context, channel)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(notice.title)
            .setContentText(notice.text)
            .setStyle(NotificationCompat.BigTextStyle().bigText(notice.text))
            .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
            .setPublicVersion(public)
            .setSilent(true)
            .setAutoCancel(true)
            .setContentIntent(openApp(DECISION_TAG + entryId, entryId))
        if (notice.expires) builder.setTimeoutAfter(DECISION_TIMEOUT_MILLIS)
        manager.notify(DECISION_TAG + entryId, DECISION_ID, builder.build())
    }

    fun cancelDecision(entryId: String) = manager.cancel(DECISION_TAG + entryId, DECISION_ID)

    /** What an expedited decision worker shows while it runs as a foreground service (before Android 12). */
    fun sending(): Notification = NotificationCompat
        .Builder(context, PushChannel.APPROVALS.id)
        .setSmallIcon(R.drawable.ic_notification)
        .setContentTitle(context.getString(R.string.decision_sending))
        .setSilent(true)
        .build()

    private fun entry(action: NotificationAction.Show): Notification {
        val entry = action.entry
        val title = title(entry.kind, entry.issueIdentifier)
        // Buttons only for a gate or review, and only for whoever is signed in now.
        val owner = owner().takeIf { entry.kind in DECIDABLE_KINDS }
        val decisions = owner?.let { decisionActions(entry, it) }.orEmpty()
        val public = owner?.let { decisionPublicVersion(action, title, decisions) } ?: publicVersion(action.channel)
        val builder = NotificationCompat
            .Builder(context, action.channel.id)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(entry.title)
            .setStyle(NotificationCompat.BigTextStyle().bigText(entry.title))
            .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
            .setPublicVersion(public)
            .setGroup(action.group)
            .setGroupAlertBehavior(NotificationCompat.GROUP_ALERT_CHILDREN)
            // The same entry again (a sync or a retried push) updates quietly.
            .setOnlyAlertOnce(true)
            .setAutoCancel(true)
            .setContentIntent(openApp(ENTRY_TAG + entry.id, entry.id))
        decisions.forEach(builder::addAction)
        return builder.build()
    }

    /**
     * A decidable entry's lock-screen face when sensitive content is
     * hidden: its title (the kind and the issue) and its buttons, which
     * the system shows from this version there. Never the entry's text.
     */
    private fun decisionPublicVersion(
        action: NotificationAction.Show,
        title: String,
        decisions: List<NotificationCompat.Action>,
    ): Notification {
        val builder = NotificationCompat
            .Builder(context, action.channel.id)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
        decisions.forEach(builder::addAction)
        return builder.build()
    }

    /**
     * Approve, Reject (with the canned note), and Reject with a note typed
     * inline. No unlock is asked for (Third's decision on CHT-1613).
     */
    private fun decisionActions(entry: PushPayload.Entry, owner: String): List<NotificationCompat.Action> {
        val tap = { decision: String -> DecisionTap(entry.id, owner, entry.kind, entry.issueIdentifier, decision) }
        val note = RemoteInput
            .Builder(DecisionTap.KEY_NOTE)
            .setLabel(context.getString(R.string.decision_note_label))
            .build()
        return listOf(
            decisionAction(R.string.decision_approve, tap(DecisionTap.APPROVE), mutable = false).build(),
            decisionAction(R.string.decision_reject, tap(DecisionTap.REJECT), mutable = false).build(),
            decisionAction(R.string.decision_reject_with_note, tap(DecisionTap.REJECT_WITH_NOTE), mutable = true)
                .addRemoteInput(note)
                .setAllowGeneratedReplies(false)
                .setSemanticAction(NotificationCompat.Action.SEMANTIC_ACTION_REPLY)
                .build(),
        )
    }

    private fun decisionAction(label: Int, tap: DecisionTap, mutable: Boolean): NotificationCompat.Action.Builder {
        // Mutable only where the system must fill in the typed note; the
        // receiver's own extras win over anything filled in.
        val mutability = if (mutable) PendingIntent.FLAG_MUTABLE else PendingIntent.FLAG_IMMUTABLE
        val intent = PendingIntent.getBroadcast(
            context,
            0,
            tap.toIntent(context),
            mutability or PendingIntent.FLAG_UPDATE_CURRENT,
        )
        return NotificationCompat.Action
            .Builder(R.drawable.ic_notification, context.getString(label), intent)
            .setShowsUserInterface(false)
            .setAuthenticationRequired(false)
    }

    private fun summary(action: NotificationAction.Summarize): Notification = NotificationCompat
        .Builder(context, action.channel.id)
        .setSmallIcon(R.drawable.ic_notification)
        .setContentTitle(context.resources.getQuantityString(R.plurals.push_summary, action.count, action.count))
        .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
        .setPublicVersion(publicVersion(action.channel))
        .setGroup(action.group)
        .setGroupSummary(true)
        .setGroupAlertBehavior(NotificationCompat.GROUP_ALERT_CHILDREN)
        .setOnlyAlertOnce(true)
        .setAutoCancel(true)
        .setContentIntent(openApp(SUMMARY_TAG + action.group, entryId = null))
        .build()

    /** What a lock screen that hides sensitive content shows instead: the app, and that something is waiting. */
    private fun publicVersion(channel: PushChannel): Notification = NotificationCompat
        .Builder(context, channel.id)
        .setSmallIcon(R.drawable.ic_notification)
        .setContentTitle(context.getString(R.string.app_name))
        .setContentText(context.getString(R.string.push_public_text))
        .build()

    /**
     * Opens the app; on [entryId]'s issue when there is one, for whoever is
     * signed in now (CHT-1660). A summary opens the inbox: its entries can
     * be on different issues.
     */
    private fun openApp(key: String, entryId: String?): PendingIntent {
        val tap = entryId?.let { id -> owner()?.let { NotificationTap(id, it) } }
        return PendingIntent.getActivity(
            context,
            0,
            NotificationTap.intent(context, key, tap),
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
        )
    }

    companion object {
        private const val ENTRY_TAG = "entry:"
        private const val SUMMARY_TAG = "summary:"
        private const val DECISION_TAG = "decision:"
        private const val ENTRY_ID = 1
        private const val SUMMARY_ID = 2
        private const val DECISION_ID = 3

        /** The id an expedited decision worker's foreground notification is posted under (before Android 12). */
        const val SENDING_ID = 4

        /** How long a decision's outcome stays up once it is settled. */
        private const val DECISION_TIMEOUT_MILLIS = 2 * 60_000L

        /** The entry kinds that wait on the person's decision, and so get Approve and Reject buttons. */
        val DECIDABLE_KINDS = setOf("gate_pending", "review_requested")

        /** Create (or update the names of) the channels. Idempotent; the person's own settings for each are kept. */
        fun createChannels(context: Context) {
            val manager = context.getSystemService(NotificationManager::class.java)
            manager.createNotificationChannels(
                PushChannel.entries.map { channel ->
                    NotificationChannel(channel.id, context.getString(channelName(channel)), importance(channel))
                        .apply {
                            description = context.getString(channelDescription(channel))
                            // A hint only: the system ignores an app's lock-screen setting for a
                            // channel. What keeps content off the lock screen is each
                            // notification's VISIBILITY_PRIVATE and its content-free public version.
                            lockscreenVisibility = Notification.VISIBILITY_PRIVATE
                        }
                },
            )
        }

        private fun importance(channel: PushChannel) = when (channel.importance) {
            PushChannel.Importance.HIGH -> NotificationManager.IMPORTANCE_HIGH
            PushChannel.Importance.DEFAULT -> NotificationManager.IMPORTANCE_DEFAULT
            PushChannel.Importance.LOW -> NotificationManager.IMPORTANCE_LOW
        }

        private fun channelName(channel: PushChannel) = when (channel) {
            PushChannel.APPROVALS -> R.string.push_channel_approvals
            PushChannel.MENTIONS -> R.string.push_channel_mentions
            PushChannel.ASSIGNMENTS -> R.string.push_channel_assignments
            PushChannel.AGENTS -> R.string.push_channel_agents
            PushChannel.ACCOUNT -> R.string.push_channel_account
            PushChannel.OTHER -> R.string.push_channel_other
        }

        private fun channelDescription(channel: PushChannel) = when (channel) {
            PushChannel.APPROVALS -> R.string.push_channel_approvals_description
            PushChannel.MENTIONS -> R.string.push_channel_mentions_description
            PushChannel.ASSIGNMENTS -> R.string.push_channel_assignments_description
            PushChannel.AGENTS -> R.string.push_channel_agents_description
            PushChannel.ACCOUNT -> R.string.push_channel_account_description
            PushChannel.OTHER -> R.string.push_channel_other_description
        }

        private fun kindTitle(kind: String) = when (kind) {
            "gate_pending" -> R.string.push_kind_gate_pending
            "review_requested" -> R.string.push_kind_review_requested
            "gate_rejected" -> R.string.push_kind_gate_rejected
            "mention" -> R.string.push_kind_mention
            "assignment" -> R.string.push_kind_assignment
            "agent_status" -> R.string.push_kind_agent_status
            "push_device_added" -> R.string.push_kind_push_device_added
            "children_closed" -> R.string.push_kind_children_closed
            else -> R.string.push_kind_other
        }
    }
}
