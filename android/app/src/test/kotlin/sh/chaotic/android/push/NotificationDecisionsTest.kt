package sh.chaotic.android.push

import android.app.Notification
import android.app.NotificationManager
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.ADA
import sh.chaotic.android.GRACE
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.ownerOf
import sh.chaotic.android.testSession
import sh.chaotic.android.testSessions
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.FakeRemote
import sh.chaotic.sync.FlushOutcome
import sh.chaotic.sync.InMemoryCacheStore
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.Remote
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.entry
import sh.chaotic.sync.open
import sh.chaotic.sync.page
import sh.chaotic.sync.push.NotificationPlanner
import sh.chaotic.sync.push.PushPayload
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** A notification's decision, step by step, as [DecisionWorker] runs it (CHT-1665). */
@RunWith(RobolectricTestRunner::class)
class NotificationDecisionsTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val manager = context.getSystemService(NotificationManager::class.java)
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private val sessions = testSessions(ADA)
    private val session = CacheSession(store) { sessions.cacheOwner() }
    private val notifier = AndroidNotifier(context) { sessions.cacheOwner() }
    private val queue = WriteQueue(remote, session)
    private val decisions = NotificationDecisions(context, sessions, queue, InboxSyncer(remote, session), notifier)

    private val gate = entry("g1", kind = "gate_pending").copy(
        issueId = "i1",
        issueIdentifier = "CHT-7",
        actions = listOf(
            InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
            InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
        ),
    )

    private val approve = DecisionJob("g1", ownerOf(ADA), "gate_pending", "CHT-7", WriteKind.APPROVE)

    @Before
    fun setUp() = runBlocking {
        manager.cancelAll()
        AndroidNotifier.createChannels(context)
        sessions.load()
        // Ada's gate notification, with its buttons.
        notifier.apply(
            NotificationPlanner.onEntry(
                PushPayload.Entry("g1", "gate_pending", "CHT-7", "Ship it", null, "issue:i1"),
                emptyList(),
            ),
        )
    }

    private suspend fun cache(vararg entries: InboxEntry) {
        session.begin()
        store.applyInbox(InboxChange(false, entries.toList(), emptySet(), setOf(TEAM_A), "c"))
    }

    private fun decision(): Notification? =
        manager.activeNotifications.firstOrNull { it.tag == "decision:g1" }?.notification

    private fun text(notification: Notification?) =
        notification?.extras?.getCharSequence(Notification.EXTRA_TEXT).toString()

    private fun title(notification: Notification?) =
        notification?.extras?.getCharSequence(Notification.EXTRA_TITLE).toString()

    private fun entryShown() = manager.activeNotifications.any { it.tag == "entry:g1" }

    @Test
    fun anApprovalIsSentAndSaysApprovedOnlyOnceTaken() = runTest {
        cache(gate)

        assertNull(decisions.process(approve))

        assertEquals("/api/rituals/r1/complete-issue/i1", remote.writesSent.single().path)
        assertEquals("Approved", text(decision()))
        assertFalse(entryShown())
    }

    @Test
    fun anEntryNotCachedYetIsCaughtUpWithASyncFirst() = runTest {
        session.begin()
        // The push came before the sync that brings its entry in.
        remote.syncAnswers += Remote.Ok(page(open(gate), teams = setOf(TEAM_A)))

        assertNull(decisions.process(approve))

        assertEquals(1, remote.writesSent.size)
        assertEquals("Approved", text(decision()))
    }

    @Test
    fun anEntryStillNotThereAfterTheSyncSaysSoAndSendsNothing() = runTest {
        cache()

        assertNull(decisions.process(approve.copy(write = WriteKind.REJECT, note = "Rejected from phone")))

        assertTrue("no longer waiting" in text(decision()))
        assertTrue(remote.sinceSent.isNotEmpty())
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun aRefusalShowsTheServersReasonButNotOnTheLockScreen() = runTest {
        cache(gate)
        remote.answerWrite = {
            Remote.HttpError(409, "ritual_already_resolved", message = "Already approved by Grace.")
        }

        assertNull(decisions.process(approve))

        val notice = assertNotNull(decision())
        assertEquals("Already approved by Grace.", text(notice))
        assertFalse("Grace" in text(notice.publicVersion))
    }

    @Test
    fun offlineItSaysSoAndLooksAgainOnceThereIsANetwork() = runTest {
        cache(gate)
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }

        val step = assertNotNull(decisions.process(approve))

        assertTrue(step.online)
        assertNotNull(step.job.key)
        assertTrue("Not sent yet" in text(decision()))
        assertFalse(entryShown())
    }

    @Test
    fun aNotificationLeftFromAnEarlierSignInSendsNothingAndShowsNoIssueKey() = runTest {
        sessions.signedIn(testSession(GRACE))
        cache(gate)

        assertNull(decisions.process(approve))

        assertTrue("not signed in" in text(decision()))
        assertFalse("CHT-7" in title(decision()))
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun aStepAfterASignOutAndSomeoneElseSigningInShowsNothing() = runTest {
        cache(gate)
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        val step = assertNotNull(decisions.process(approve))

        sessions.signOut()
        session.end()
        sessions.signedIn(testSession(GRACE))
        remote.answerWrite = { Remote.Ok(null) }

        assertNull(decisions.process(step.job))
        assertNull(decision())
        assertTrue(remote.writesSent.none { it.owner == ownerOf(GRACE) })
    }

    @Test
    fun aStepAfterTheSamePersonSignsBackInNeverSaysApproved() = runTest {
        cache(gate)
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        val step = assertNotNull(decisions.process(approve))

        sessions.signOut()
        session.end()
        sessions.signedIn(testSession(ADA))
        remote.answerWrite = { Remote.Ok(null) }

        assertNull(decisions.process(step.job))
        assertTrue("No longer queued" in text(decision()))
    }

    @Test
    fun aSecondTapFollowsTheFirstDecisionWithALiveNotice() = runTest {
        cache(gate)
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        val first = assertNotNull(decisions.process(approve))

        val second = assertNotNull(decisions.process(approve.copy(write = WriteKind.REJECT, note = "no")))

        assertEquals(first.job.key, second.job.key)
        assertEquals(WriteKind.APPROVE, second.job.write)
        assertTrue("Not sent yet" in text(decision()))
    }

    @Test
    fun aTapWhileAnInAppSwipeCanBeUndoneKeepsTheButtons() = runTest {
        cache(gate)
        queue.approve(gate)

        val step = assertNotNull(decisions.process(approve))

        assertTrue(step.job.watch)
        assertFalse(step.online)
        assertTrue(step.delayMillis > 0)
        assertTrue(entryShown())
        assertNull(decision())
    }

    @Test
    fun aSwipeUndoneInTheAppLeavesTheNotificationAsItIs() = runTest {
        cache(gate)
        val key = assertNotNull(queue.approve(gate))
        val step = assertNotNull(decisions.process(approve))
        queue.undo(key)

        assertNull(decisions.process(step.job))

        assertTrue(entryShown())
        assertNull(decision())
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun aFailedStepTakesTheButtonsAwayAndPointsToTheApp() {
        decisions.failed(approve)

        assertFalse(entryShown())
        assertTrue("Open Chaotic" in text(decision()))
        assertFalse("CHT-7" in title(decision()))
    }

    @Test
    fun theNextLookIsClampedToSaneBounds() {
        assertEquals(15_000L, NotificationDecisions.followUpMillis(FlushOutcome.Done(1)))
        assertEquals(30_000L, NotificationDecisions.followUpMillis(FlushOutcome.Done(null)))
        assertEquals(60_000L, NotificationDecisions.followUpMillis(FlushOutcome.Retry(60_000)))
        val longest = NotificationDecisions.followUpMillis(FlushOutcome.Retry(Long.MAX_VALUE))
        assertEquals(WriteQueue.MAX_RETRY_MILLIS, longest)
        assertEquals(30_000L, NotificationDecisions.followUpMillis(FlushOutcome.Unauthorized))
    }
}
