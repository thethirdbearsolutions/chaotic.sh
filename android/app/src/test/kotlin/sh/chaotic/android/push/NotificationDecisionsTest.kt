package sh.chaotic.android.push

import android.app.Notification
import android.app.NotificationManager
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.ADA
import sh.chaotic.android.GRACE
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.ownerOf
import sh.chaotic.android.testSessions
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.FakeRemote
import sh.chaotic.sync.InMemoryCacheStore
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.entry
import sh.chaotic.sync.push.NotificationPlanner
import sh.chaotic.sync.push.PushPayload
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * Taps that must send nothing (CHT-1665). The paths that queue a write
 * hand it to WorkManager, which core-sync's NotificationDecisionTest
 * covers without it.
 */
@RunWith(RobolectricTestRunner::class)
class NotificationDecisionsTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val manager = context.getSystemService(NotificationManager::class.java)
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()

    @Before
    fun channels() {
        manager.cancelAll()
        AndroidNotifier.createChannels(context)
    }

    private fun gate(id: String) = entry(id, kind = "gate_pending").copy(
        issueId = "i1",
        issueIdentifier = "CHT-7",
        actions = listOf(
            InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
            InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
        ),
    )

    private fun decisions(sessions: SessionManager, session: CacheSession, notifier: AndroidNotifier) =
        NotificationDecisions(context, sessions, WriteQueue(remote, session), InboxSyncer(remote, session), notifier)

    private fun text(): String =
        manager.activeNotifications.single().notification.extras.getCharSequence(Notification.EXTRA_TEXT).toString()

    @Test
    fun aNotificationLeftFromAnEarlierSignInSendsNothing() = runTest {
        // Ada's gate notification is still up; Grace is signed in now, with her own cache.
        val sessions = testSessions(GRACE)
        sessions.load()
        val session = CacheSession(store) { sessions.cacheOwner() }
        val notifier = AndroidNotifier(context) { sessions.cacheOwner() }
        val decisions = decisions(sessions, session, notifier)
        val adaEntry = PushPayload.Entry("g1", "gate_pending", "CHT-7", "Ship it", null, "issue:i1")
        notifier.apply(NotificationPlanner.onEntry(adaEntry, emptyList()))

        decisions.onTap(DecisionTap("g1", ownerOf(ADA), "gate_pending", "CHT-7", DecisionTap.APPROVE), null)

        assertEquals("decision:g1", manager.activeNotifications.single().tag)
        assertTrue("not signed in" in text())
        assertEquals(emptyList(), store.pendingWrites())
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun anEntryNoLongerCachedSaysSoAndSendsNothing() = runTest {
        val sessions = testSessions(ADA)
        sessions.load()
        val session = CacheSession(store) { sessions.cacheOwner() }
        session.begin()
        store.applyInbox(InboxChange(false, listOf(gate("g2")), emptySet(), setOf(TEAM_A), "c"))
        val notifier = AndroidNotifier(context) { sessions.cacheOwner() }
        val decisions = decisions(sessions, session, notifier)

        decisions.onTap(DecisionTap("g1", ownerOf(ADA), "gate_pending", "CHT-7", DecisionTap.REJECT), null)

        assertTrue("no longer waiting" in text())
        assertEquals(emptyList(), store.pendingWrites())
        // It caught up with the server first, in case the push came before its entry's sync.
        assertTrue(remote.sinceSent.isNotEmpty())
    }
}
