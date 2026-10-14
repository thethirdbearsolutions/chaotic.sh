package sh.chaotic.sync.push

import sh.chaotic.sync.push.NotificationAction.Cancel
import sh.chaotic.sync.push.NotificationAction.CancelSummary
import sh.chaotic.sync.push.NotificationAction.Show
import sh.chaotic.sync.push.NotificationAction.Summarize
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class NotificationPlannerTest {
    private fun entry(id: String, kind: String = "mention", collapse: String = "issue:i1") =
        PushPayload.Entry(id, kind, "CHT-1", "Title $id", null, collapse)

    private fun shown(id: String, group: String = "issue:i1", channel: PushChannel = PushChannel.MENTIONS) =
        ShownNotification(id, group, channel)

    @Test
    fun everyKindHasItsChannel() {
        assertEquals(PushChannel.APPROVALS, PushChannel.forKind("gate_pending"))
        assertEquals(PushChannel.APPROVALS, PushChannel.forKind("review_requested"))
        assertEquals(PushChannel.APPROVALS, PushChannel.forKind("gate_rejected"))
        assertEquals(PushChannel.MENTIONS, PushChannel.forKind("mention"))
        assertEquals(PushChannel.ASSIGNMENTS, PushChannel.forKind("assignment"))
        assertEquals(PushChannel.AGENTS, PushChannel.forKind("agent_status"))
        assertEquals(PushChannel.ACCOUNT, PushChannel.forKind("push_device_added"))
        assertEquals(PushChannel.OTHER, PushChannel.forKind("a_kind_from_the_future"))
        assertEquals(PushChannel.Importance.HIGH, PushChannel.APPROVALS.importance)
        assertEquals(PushChannel.entries.size, PushChannel.entries.map { it.id }.toSet().size)
    }

    @Test
    fun aLoneEntryShowsWithoutASummary() {
        val actions = NotificationPlanner.onEntry(entry("e1"), emptyList())
        assertEquals(listOf(Show(entry("e1"), PushChannel.MENTIONS, "issue:i1"), CancelSummary("issue:i1")), actions)
    }

    @Test
    fun aSecondEntryOnTheSameIssueIsCollapsedUnderASummary() {
        val actions = NotificationPlanner.onEntry(entry("e2", kind = "gate_pending"), listOf(shown("e1")))
        assertEquals(
            listOf(
                Show(entry("e2", kind = "gate_pending"), PushChannel.APPROVALS, "issue:i1"),
                // The bundle is as loud as the loudest thing in it.
                Summarize("issue:i1", 2, PushChannel.APPROVALS),
            ),
            actions,
        )
    }

    @Test
    fun otherIssuesDoNotCount() {
        val actions = NotificationPlanner.onEntry(entry("e2"), listOf(shown("e1", group = "issue:other")))
        assertEquals(CancelSummary("issue:i1"), actions.last())
    }

    @Test
    fun theSameEntryAgainReplacesItsNotification() {
        val actions = NotificationPlanner.onEntry(entry("e1"), listOf(shown("e1"), shown("e2")))
        assertEquals(Summarize("issue:i1", 2, PushChannel.MENTIONS), actions.last())
    }

    @Test
    fun resolvedWithdrawsTheEntryAndTheSummaryFollows() {
        val three = listOf(shown("e1"), shown("e2"), shown("e3"))
        assertEquals(
            listOf(Cancel("e1"), Summarize("issue:i1", 2, PushChannel.MENTIONS)),
            NotificationPlanner.onResolved(PushPayload.Resolved("e1", "issue:i1"), three),
        )
        assertEquals(
            listOf(Cancel("e1"), CancelSummary("issue:i1")),
            NotificationPlanner.onResolved(PushPayload.Resolved("e1", "issue:i1"), three.take(2)),
        )
    }

    @Test
    fun resolvedForSomethingNotOnScreenDoesNothing() {
        assertTrue(NotificationPlanner.onResolved(PushPayload.Resolved("gone", "issue:i1"), listOf(shown("e1"))).isEmpty())
    }

    @Test
    fun resolvedFindsTheEntryWhateverGroupTheMessageNames() {
        // The notification's own group is what counts; the message's collapse key is only a hint.
        val actions = NotificationPlanner.onResolved(PushPayload.Resolved("e1", "entry:e1"), listOf(shown("e1")))
        assertEquals(listOf(Cancel("e1"), CancelSummary("issue:i1")), actions)
    }

    @Test
    fun reconcileWithdrawsWhatIsNoLongerWaiting() {
        val shown = listOf(shown("e1"), shown("e2"), shown("e3", group = "issue:i2"), shown("e4", group = "issue:i2"))
        val actions = NotificationPlanner.reconcile(shown) { it in setOf("e2", "e4") }
        assertEquals(
            listOf(Cancel("e1"), Cancel("e3"), CancelSummary("issue:i1"), CancelSummary("issue:i2")),
            actions,
        )
        assertTrue(NotificationPlanner.reconcile(shown) { true }.isEmpty())
    }
}
