package sh.chaotic.android.ui

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import kotlinx.coroutines.withTimeout
import kotlinx.coroutines.withTimeoutOrNull
import org.junit.After
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.ADA
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.ownerOf
import sh.chaotic.android.testSessions
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.FakeRemote
import sh.chaotic.sync.InMemoryCacheStore
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.Remote
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.entry
import sh.chaotic.sync.open
import sh.chaotic.sync.page
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** Tapping a notification opens its entry's issue, once the cache has the entry (CHT-1660). */
@RunWith(RobolectricTestRunner::class)
class NotificationTapsTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()

    @Before
    fun setUp() = Dispatchers.setMain(Dispatchers.Unconfined)

    @After
    fun tearDown() = Dispatchers.resetMain()

    private suspend fun taps(): NotificationTaps {
        val sessions = testSessions(ADA)
        sessions.load()
        // Claimed for Ada, as AppViewModel does on sign-in.
        store.claim(ownerOf(ADA))
        val cache = CacheSession(store) { sessions.cacheOwner() }
        return NotificationTaps(sessions, store, InboxSyncer(remote, cache), WriteActions(WriteQueue(remote, cache)) {})
    }

    private fun onIssue(id: String, issueId: String? = "i1"): InboxEntry {
        val read = InboxAction(InboxAction.MARK_READ, "/api/inbox/$id/read")
        return entry(id).copy(issueId = issueId, actions = listOf(read))
    }

    private suspend fun cache(entry: InboxEntry) =
        store.applyInbox(InboxChange(false, listOf(entry), emptySet(), setOf(TEAM_A), "c0"))

    private suspend fun waitFor(condition: suspend () -> Boolean) = withTimeout(WAIT_MILLIS) {
        while (!condition()) delay(POLL_MILLIS)
    }

    @Test
    fun aCachedEntryOpensItsIssueAndIsRead() = runBlocking {
        val taps = taps()
        cache(onIssue("e1"))

        taps.open("e1")

        assertEquals(Destination.Issue("i1", TEAM_A), withTimeout(WAIT_MILLIS) { taps.issues.first() })
        assertEquals(listOf("/api/inbox/e1/read"), store.pendingWrites().map { it.path })
        assertTrue(remote.sinceSent.isEmpty(), "no sync for an entry already cached")
    }

    @Test
    fun aPushThatCameBeforeTheSyncIsFoundBySyncing() = runBlocking {
        val taps = taps()
        remote.syncAnswers += Remote.Ok(page(open(onIssue("e1", issueId = "i9")), teams = setOf(TEAM_A)))

        taps.open("e1")

        assertEquals(Destination.Issue("i9", TEAM_A), withTimeout(WAIT_MILLIS) { taps.issues.first() })
        assertEquals(1, remote.sinceSent.size)
    }

    @Test
    fun anEntryOnNoIssueIsReadAndTheInboxStays() = runBlocking {
        val taps = taps()
        cache(onIssue("e1", issueId = null))

        taps.open("e1")

        waitFor { store.pendingWrites().isNotEmpty() }
        assertNull(withTimeoutOrNull(SETTLE_MILLIS) { taps.issues.first() })
    }

    @Test
    fun anEntryTheCacheNeverGetsLeavesTheInbox() = runBlocking {
        val taps = taps()
        // No sync answer queued: the sync fails, as it would offline.

        taps.open("gone")

        waitFor { remote.sinceSent.size == 1 }
        assertNull(withTimeoutOrNull(SETTLE_MILLIS) { taps.issues.first() })
        assertTrue(store.pendingWrites().isEmpty())
    }

    private companion object {
        const val WAIT_MILLIS = 10_000L
        const val POLL_MILLIS = 10L
        const val SETTLE_MILLIS = 300L
    }
}
