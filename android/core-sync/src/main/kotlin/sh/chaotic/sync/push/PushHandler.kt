package sh.chaotic.sync.push

import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.SyncOutcome

/** The notification shade as the push logic sees it: what is on it, and changes to it. */
interface Notifier {
    fun shown(): List<ShownNotification>

    fun apply(actions: List<NotificationAction>)
}

/**
 * What a push message does (CHT-1612):
 *
 * - Every message from the server means the inbox changed, so it asks
 *   for a sync ([requestSync]), decrypted or not.
 * - An `entry` posts its notification, collapsed by issue
 *   ([NotificationPlanner]); a `resolved` withdraws it.
 * - Nothing is shown unless someone is signed in and the device is
 *   registered for that same person: a message still on its way for the
 *   previous sign-in must not show their inbox to the next person.
 * - A message the connector could not decrypt is never shown: its bytes
 *   are whatever the push service was handed, not the server's words.
 */
class PushHandler(
    private val store: PushStateStore,
    private val currentOwner: () -> String?,
    private val notifier: Notifier,
    private val requestSync: () -> Unit,
) {
    suspend fun onMessage(content: ByteArray, decrypted: Boolean) {
        val owner = currentOwner() ?: return
        requestSync()
        if (!decrypted || store.read().owner != owner) return
        when (val payload = PushPayload.parse(content)) {
            is PushPayload.Entry -> notifier.apply(NotificationPlanner.onEntry(payload, notifier.shown()))
            is PushPayload.Resolved -> notifier.apply(NotificationPlanner.onResolved(payload, notifier.shown()))
            PushPayload.Unknown, null -> Unit
        }
    }
}

/**
 * Notifications from the background poll, for a device without push
 * (CHT-1612): the entries a sync newly brought in become notifications
 * the way a push would have made them, and after every sync the ones
 * whose entries are no longer waiting are withdrawn.
 *
 * Only what a push would have said: unread, not caused by the person
 * (except the new-device notice, as the server does), a kind the person
 * has pushed ([wanted]), and recent, so a phone that was off for a week
 * does not ring for every old entry. At most [MAX_PER_RUN], newest first.
 */
object PollNotifications {
    const val MAX_AGE_MILLIS = 24 * 60 * 60 * 1_000L
    const val MAX_PER_RUN = 10

    /** The server's defaults (`PushService.wants`), for when its preferences cannot be fetched. */
    fun wantedByDefault(kind: String): Boolean = kind != "agent_status"

    fun select(
        added: List<InboxEntry>,
        personId: String?,
        nowMillis: Long,
        wanted: (String) -> Boolean = ::wantedByDefault,
    ): List<PushPayload.Entry> = added
        .asSequence()
        .filter { !it.read }
        .filter { it.kind == DEVICE_ADDED || personId == null || it.source?.id != personId }
        .filter { it.kind == DEVICE_ADDED || wanted(it.kind) }
        .filter { it.createdAtMillis >= nowMillis - MAX_AGE_MILLIS }
        .sortedByDescending { it.createdAtMillis }
        .take(MAX_PER_RUN)
        .map {
            PushPayload.Entry(
                id = it.id,
                kind = it.kind,
                issueIdentifier = it.issueIdentifier,
                title = PushPayload.clip(it.title, PushPayload.MAX_TITLE_CHARS),
                ritualId = null,
                collapse = it.collapseKey(),
            )
        }.toList()

    /** Post [entries], one at a time so each sees the shade as the previous left it. */
    fun post(notifier: Notifier, entries: List<PushPayload.Entry>) {
        entries.reversed().forEach { notifier.apply(NotificationPlanner.onEntry(it, notifier.shown())) }
    }

    /** The entries a sync run newly brought in, if it was a run that may notify. */
    fun added(outcome: SyncOutcome): List<InboxEntry> = (outcome as? SyncOutcome.Synced)?.added.orEmpty()

    private const val DEVICE_ADDED = "push_device_added"
}
