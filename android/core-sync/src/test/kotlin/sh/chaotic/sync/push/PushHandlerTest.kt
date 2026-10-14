package sh.chaotic.sync.push

import kotlinx.coroutines.test.runTest
import sh.chaotic.sync.OTHER_OWNER
import sh.chaotic.sync.OWNER
import sh.chaotic.sync.Principal
import sh.chaotic.sync.SyncOutcome
import sh.chaotic.sync.entry
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/** A notification shade in memory: what [Notifier.apply] leaves on it. */
class FakeNotifier : Notifier {
    val onScreen = linkedMapOf<String, ShownNotification>()
    val summaries = mutableMapOf<String, Int>()
    val applied = mutableListOf<NotificationAction>()

    override fun shown() = onScreen.values.toList()

    override fun apply(actions: List<NotificationAction>) {
        applied += actions
        for (action in actions) {
            when (action) {
                is NotificationAction.Show -> onScreen[action.entry.id] =
                    ShownNotification(action.entry.id, action.group, action.channel)

                is NotificationAction.Cancel -> onScreen.remove(action.entryId)

                is NotificationAction.Summarize -> summaries[action.group] = action.count

                is NotificationAction.CancelSummary -> summaries.remove(action.group)
            }
        }
    }
}

class PushHandlerTest {
    private val store = InMemoryPushStateStore(PushState(status = PushStatus.ACTIVE, owner = OWNER))
    private val notifier = FakeNotifier()
    private var owner: String? = OWNER
    private var syncs = 0
    private val handler = PushHandler(store, { owner }, notifier) { syncs++ }

    private val entryJson =
        """{"v":1,"type":"entry","id":"e1","kind":"gate_pending","issue":"CHT-1","title":"Gate","ritual_id":null,"collapse":"issue:i1"}"""
    private val secondJson = entryJson.replace("\"e1\"", "\"e2\"").replace("gate_pending", "mention")
    private val resolvedJson = """{"v":1,"type":"resolved","id":"e1","collapse":"issue:i1"}"""

    @Test
    fun anEntryIsShownAndTheInboxSynced() = runTest {
        handler.onMessage(entryJson.encodeToByteArray(), decrypted = true)
        assertEquals(1, syncs)
        assertEquals(ShownNotification("e1", "issue:i1", PushChannel.APPROVALS), notifier.onScreen["e1"])
    }

    @Test
    fun entriesOnOneIssueCollapseAndResolvedWithdrawsThem() = runTest {
        handler.onMessage(entryJson.encodeToByteArray(), decrypted = true)
        handler.onMessage(secondJson.encodeToByteArray(), decrypted = true)
        assertEquals(mapOf("issue:i1" to 2), notifier.summaries)
        handler.onMessage(resolvedJson.encodeToByteArray(), decrypted = true)
        assertEquals(setOf("e2"), notifier.onScreen.keys)
        assertTrue(notifier.summaries.isEmpty())
        assertEquals(3, syncs)
    }

    @Test
    fun anUndecryptedMessageOnlySyncs() = runTest {
        handler.onMessage(entryJson.encodeToByteArray(), decrypted = false)
        assertEquals(1, syncs)
        assertTrue(notifier.applied.isEmpty())
    }

    @Test
    fun anUnreadableOrNewerMessageOnlySyncs() = runTest {
        handler.onMessage("not json".encodeToByteArray(), decrypted = true)
        handler.onMessage("""{"v":2,"type":"entry"}""".encodeToByteArray(), decrypted = true)
        assertEquals(2, syncs)
        assertTrue(notifier.applied.isEmpty())
    }

    @Test
    fun signedOutNothingHappens() = runTest {
        owner = null
        handler.onMessage(entryJson.encodeToByteArray(), decrypted = true)
        assertEquals(0, syncs)
        assertTrue(notifier.applied.isEmpty())
    }

    @Test
    fun aMessageForThePreviousSignInIsNotShownToTheNext() = runTest {
        owner = OTHER_OWNER
        handler.onMessage(entryJson.encodeToByteArray(), decrypted = true)
        assertEquals(1, syncs, "the next person's inbox may still have changed")
        assertTrue(notifier.applied.isEmpty())
    }
}

class PollNotificationsTest {
    private val now = 10L * 24 * 60 * 60 * 1_000

    private fun added(
        id: String,
        kind: String = "mention",
        ageMillis: Long = 0,
        read: Boolean = false,
        by: String? = "bob",
    ) = entry(id, kind = kind, read = read, createdAtMillis = now - ageMillis).copy(
        source = by?.let { Principal(it, it) },
        issueId = "i-$id",
        issueIdentifier = "CHT-$id",
    )

    @Test
    fun whatAPushWouldHaveSaid() {
        val picked = PollNotifications.select(
            listOf(
                added("1"),
                added("2", read = true),
                added("3", by = "ada"),
                added("4", kind = "agent_status"),
                added("5", ageMillis = PollNotifications.MAX_AGE_MILLIS + 1),
                added("6", kind = "push_device_added", by = "ada"),
                added("7", by = null),
            ),
            personId = "ada",
            nowMillis = now,
        )
        assertEquals(listOf("1", "6", "7"), picked.map { it.id }.sorted())
        val one = picked.single { it.id == "1" }
        assertEquals("issue:i-1", one.collapse)
        assertEquals("CHT-1", one.issueIdentifier)
    }

    @Test
    fun theServersPreferencesDecideWhenKnown() {
        val picked = PollNotifications.select(
            listOf(added("1"), added("2", kind = "agent_status"), added("3", kind = "push_device_added")),
            personId = "ada",
            nowMillis = now,
            wanted = { it == "agent_status" },
        )
        assertEquals(listOf("2", "3"), picked.map { it.id }.sorted(), "the new-device notice cannot be turned off")
    }

    @Test
    fun atMostTenNewestFirstAndPostedOldestFirst() {
        val many = (1..15).map { added("$it", ageMillis = it * 1_000L) }
        val picked = PollNotifications.select(many, "ada", now)
        assertEquals((1..10).map { "$it" }, picked.map { it.id })
        val notifier = FakeNotifier()
        PollNotifications.post(notifier, picked)
        assertEquals((10 downTo 1).map { "$it" }, notifier.onScreen.keys.toList())
    }

    @Test
    fun onlyASyncedRunHasAddedEntries() {
        assertEquals(emptyList(), PollNotifications.added(SyncOutcome.Unauthorized))
        val e = added("1")
        assertEquals(listOf(e), PollNotifications.added(SyncOutcome.Synced(1, added = listOf(e))))
    }
}
