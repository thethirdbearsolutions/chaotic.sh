package sh.chaotic.android.push

import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import sh.chaotic.android.MainActivity
import sh.chaotic.android.R
import sh.chaotic.sync.push.NotificationAction
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
 * Every notification is VISIBILITY_PRIVATE with a public version that
 * says only that something is waiting: on a lock screen set to hide
 * sensitive content, no title, issue or kind is shown.
 */
class AndroidNotifier(private val context: Context) : Notifier {
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

    private fun entry(action: NotificationAction.Show): Notification {
        val entry = action.entry
        val label = context.getString(kindTitle(entry.kind))
        val title = entry.issueIdentifier?.let { context.getString(R.string.push_title_with_issue, label, it) } ?: label
        return NotificationCompat
            .Builder(context, action.channel.id)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(entry.title)
            .setStyle(NotificationCompat.BigTextStyle().bigText(entry.title))
            .setVisibility(NotificationCompat.VISIBILITY_PRIVATE)
            .setPublicVersion(publicVersion(action.channel))
            .setGroup(action.group)
            .setGroupAlertBehavior(NotificationCompat.GROUP_ALERT_CHILDREN)
            // The same entry again (a sync or a retried push) updates quietly.
            .setOnlyAlertOnce(true)
            .setAutoCancel(true)
            .setContentIntent(openApp(entry.id))
            .build()
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
        .setContentIntent(openApp(action.group))
        .build()

    /** What a lock screen that hides sensitive content shows instead: the app, and that something is waiting. */
    private fun publicVersion(channel: PushChannel): Notification = NotificationCompat
        .Builder(context, channel.id)
        .setSmallIcon(R.drawable.ic_notification)
        .setContentTitle(context.getString(R.string.app_name))
        .setContentText(context.getString(R.string.push_public_text))
        .build()

    private fun openApp(key: String): PendingIntent = PendingIntent.getActivity(
        context,
        key.hashCode(),
        Intent(context, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),
        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
    )

    companion object {
        private const val ENTRY_TAG = "entry:"
        private const val SUMMARY_TAG = "summary:"
        private const val ENTRY_ID = 1
        private const val SUMMARY_ID = 2

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
            else -> R.string.push_kind_other
        }
    }
}
