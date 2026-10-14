package sh.chaotic.sync.push

import sh.chaotic.sync.InboxEntry

/**
 * The notification channels, one per kind of thing that needs the
 * person, so each can be silenced or made louder in the system settings
 * on its own. [id] is the Android channel id: never rename one, or the
 * person's settings for it are lost.
 */
enum class PushChannel(val id: String, val importance: Importance) {
    /** Gates and reviews waiting on the person, and gate rejections. */
    APPROVALS("approvals", Importance.HIGH),
    MENTIONS("mentions", Importance.DEFAULT),
    ASSIGNMENTS("assignments", Importance.DEFAULT),
    AGENTS("agents", Importance.LOW),

    /** A new device will get the person's notifications: a security notice, so not quiet. */
    ACCOUNT("account", Importance.HIGH),

    /** A kind this app does not know yet (a newer server's). */
    OTHER("other", Importance.DEFAULT),
    ;

    enum class Importance { HIGH, DEFAULT, LOW }

    companion object {
        /** The channel for an inbox entry kind (the server's wire value). */
        fun forKind(kind: String): PushChannel = when (kind) {
            "gate_pending", "review_requested", "gate_rejected" -> APPROVALS
            "mention" -> MENTIONS
            "assignment" -> ASSIGNMENTS
            "agent_status" -> AGENTS
            "push_device_added" -> ACCOUNT
            else -> OTHER
        }
    }
}

/**
 * The collapse key the server's sender gives this entry
 * (`push_sender.collapse_key`): its issue, else its document, else the
 * entry itself.
 */
fun InboxEntry.collapseKey(): String = when {
    issueId != null -> "issue:$issueId"
    documentId != null -> "document:$documentId"
    else -> PushPayload.entryCollapse(id)
}

/** A notification on screen now, as the notification manager reports it. */
data class ShownNotification(val entryId: String, val group: String, val channel: PushChannel)

/** What to do to the notifications on screen. The Android side carries these out in order. */
sealed interface NotificationAction {
    /** Post (or replace) the notification for [entry], in [group]. */
    data class Show(val entry: PushPayload.Entry, val channel: PushChannel, val group: String) : NotificationAction

    /** Post (or replace) [group]'s summary, standing for [count] notifications. */
    data class Summarize(val group: String, val count: Int, val channel: PushChannel) : NotificationAction

    data class Cancel(val entryId: String) : NotificationAction

    data class CancelSummary(val group: String) : NotificationAction
}

/**
 * One notification per inbox entry, collapsed by issue: every entry's
 * notification goes in its collapse key's group, and a group of two or
 * more gets a summary the system bundles them under. A `resolved`
 * message withdraws its entry's notification, and the group's summary
 * follows what is left. Pure: it works from what is on screen
 * ([ShownNotification]) and returns what to change, so it needs no
 * stored state that could drift from the notification shade.
 */
object NotificationPlanner {
    /** Groups of fewer than this show their notifications as they are, without a summary. */
    const val SUMMARY_THRESHOLD = 2

    fun onEntry(entry: PushPayload.Entry, shown: List<ShownNotification>): List<NotificationAction> {
        val channel = PushChannel.forKind(entry.kind)
        val group = entry.collapse
        val members = shown.filter { it.group == group && it.entryId != entry.id } +
            ShownNotification(entry.id, group, channel)
        return listOf(NotificationAction.Show(entry, channel, group)) + summary(group, members)
    }

    fun onResolved(resolved: PushPayload.Resolved, shown: List<ShownNotification>): List<NotificationAction> =
        withdraw(setOf(resolved.id), shown)

    /**
     * After a sync: withdraw every notification whose entry is no longer
     * waiting ([stillWaiting] false: resolved, archived or read
     * elsewhere), whether or not its `resolved` message ever arrived.
     */
    fun reconcile(shown: List<ShownNotification>, stillWaiting: (String) -> Boolean): List<NotificationAction> =
        withdraw(shown.map { it.entryId }.filterNot(stillWaiting).toSet(), shown)

    private fun withdraw(ids: Set<String>, shown: List<ShownNotification>): List<NotificationAction> {
        val gone = shown.filter { it.entryId in ids }
        if (gone.isEmpty()) return emptyList()
        val actions = mutableListOf<NotificationAction>()
        gone.forEach { actions += NotificationAction.Cancel(it.entryId) }
        for (group in gone.map { it.group }.distinct()) {
            actions += summary(group, shown.filter { it.group == group && it.entryId !in ids })
        }
        return actions
    }

    private fun summary(group: String, members: List<ShownNotification>): List<NotificationAction> =
        if (members.size >= SUMMARY_THRESHOLD) {
            // The loudest channel among them, so a bundle with an approval in it is not quieter than the approval.
            val channel = members.map { it.channel }.minBy { it.importance.ordinal }
            listOf(NotificationAction.Summarize(group, members.size, channel))
        } else {
            listOf(NotificationAction.CancelSummary(group))
        }
}
