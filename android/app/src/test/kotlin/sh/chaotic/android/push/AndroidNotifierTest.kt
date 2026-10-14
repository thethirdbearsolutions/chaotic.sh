package sh.chaotic.android.push

import android.app.Notification
import android.app.NotificationManager
import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.sync.push.NotificationAction
import sh.chaotic.sync.push.NotificationPlanner
import sh.chaotic.sync.push.PushChannel
import sh.chaotic.sync.push.PushPayload
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

@RunWith(RobolectricTestRunner::class)
class AndroidNotifierTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val manager = context.getSystemService(NotificationManager::class.java)
    private val notifier = AndroidNotifier(context)

    private fun entry(id: String, kind: String = "gate_pending", collapse: String = "issue:i1") =
        PushPayload.Entry(id, kind, "CHT-7", "Ship the secret plan", null, collapse)

    @Before
    fun channels() {
        manager.cancelAll()
        AndroidNotifier.createChannels(context)
    }

    @Test
    fun everyChannelExistsAndHidesItsContentOnALockedScreen() {
        for (channel in PushChannel.entries) {
            val created = manager.getNotificationChannel(channel.id)
            assertEquals(Notification.VISIBILITY_PRIVATE, created.lockscreenVisibility, channel.id)
        }
        assertEquals(NotificationManager.IMPORTANCE_HIGH, manager.getNotificationChannel("approvals").importance)
    }

    @Test
    fun anEntryIsPrivateWithAPublicVersionThatSaysNothing() {
        notifier.apply(NotificationPlanner.onEntry(entry("e1"), notifier.shown()))
        val posted = manager.activeNotifications.single()
        assertEquals("entry:e1", posted.tag)
        val notification = posted.notification
        assertEquals("approvals", notification.channelId)
        assertEquals("issue:i1", notification.group)
        assertEquals(Notification.VISIBILITY_PRIVATE, notification.visibility)
        val text = notification.extras.getCharSequence(Notification.EXTRA_TEXT).toString()
        assertTrue("Ship the secret plan" in text)
        val public = notification.publicVersion.extras
        val publicText = listOf(Notification.EXTRA_TITLE, Notification.EXTRA_TEXT)
            .joinToString(" ") { public.getCharSequence(it).toString() }
        assertFalse("secret" in publicText)
        assertFalse("CHT-7" in publicText)
    }

    @Test
    fun shownReadsTheShadeBackAndResolvedWithdraws() {
        notifier.apply(NotificationPlanner.onEntry(entry("e1"), notifier.shown()))
        notifier.apply(NotificationPlanner.onEntry(entry("e2", kind = "mention"), notifier.shown()))
        assertEquals(setOf("e1", "e2"), notifier.shown().map { it.entryId }.toSet())
        assertEquals(PushChannel.APPROVALS, notifier.shown().single { it.entryId == "e1" }.channel)
        // Two entries on one issue: bundled under a summary.
        assertTrue(manager.activeNotifications.any { it.tag == "summary:issue:i1" })

        notifier.apply(NotificationPlanner.onResolved(PushPayload.Resolved("e1", "issue:i1"), notifier.shown()))
        assertEquals(listOf("entry:e2"), manager.activeNotifications.map { it.tag })
    }

    @Test
    fun cancelAllEmptiesTheShade() {
        notifier.apply(listOf(NotificationAction.Show(entry("e1"), PushChannel.APPROVALS, "issue:i1")))
        notifier.cancelAll()
        assertTrue(manager.activeNotifications.isEmpty())
    }
}
