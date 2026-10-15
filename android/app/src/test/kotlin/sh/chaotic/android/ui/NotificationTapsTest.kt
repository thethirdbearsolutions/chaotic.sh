package sh.chaotic.android.ui

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.toList
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.advanceTimeBy
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.runCurrent
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.test.setMain
import org.junit.After
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.ADA
import sh.chaotic.android.GRACE
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.ownerOf
import sh.chaotic.android.push.NotificationTap
import sh.chaotic.android.testSessions
import sh.chaotic.android.ui.NotificationTaps.Open
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.auth.SessionManager
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

/**
 * Tapping a notification opens its entry's issue, for the person it was
 * posted for, once the cache has the entry (CHT-1660). On a test
 * dispatcher: every "nothing opens" is checked once the lookup has
 * settled, on a virtual clock.
 */
@RunWith(RobolectricTestRunner::class)
class NotificationTapsTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private lateinit var sessions: SessionManager
    private val seen = mutableListOf<Open>()

    @Before
    fun setUp() = Dispatchers.setMain(StandardTestDispatcher())

    @After
    fun tearDown() = Dispatchers.resetMain()

    private suspend fun TestScope.taps(): NotificationTaps {
        sessions = testSessions(ADA)
        sessions.load()
        val cache = CacheSession(store) { sessions.cacheOwner() }
        val writes = WriteActions(WriteQueue(remote, cache)) {}
        val taps = NotificationTaps(sessions, cache, InboxSyncer(remote, cache), writes)
        backgroundScope.launch { taps.opens.toList(seen) }
        runCurrent()
        return taps
    }

    private fun adas(entryId: String) = NotificationTap(entryId, ownerOf(ADA))

    private fun onIssue(id: String, issueId: String? = "i1"): InboxEntry {
        val read = InboxAction(InboxAction.MARK_READ, "/api/inbox/$id/read")
        return entry(id).copy(issueId = issueId, actions = listOf(read))
    }

    private suspend fun cache(entry: InboxEntry, owner: String = ownerOf(ADA)) {
        store.claim(owner)
        store.applyInbox(InboxChange(false, listOf(entry), emptySet(), setOf(TEAM_A), "c0"))
    }

    /**
     * Run everything due, on the virtual clock. advanceUntilIdle alone
     * stops once only background work is left, before the collector of
     * [seen] (in backgroundScope) has taken the last events.
     */
    private fun TestScope.settle() {
        advanceUntilIdle()
        runCurrent()
    }

    private fun found() = seen.filterIsInstance<Open.Found>().map { it.issue }

    @Test
    fun aCachedEntryOpensItsIssueAndIsRead() = runTest {
        cache(onIssue("e1"))
        val taps = taps()

        taps.open(adas("e1"))
        settle()

        assertEquals(listOf(Open.Tapped(1), Open.Found(1, Destination.Issue("i1", TEAM_A))), seen)
        assertEquals(listOf("/api/inbox/e1/read"), store.pendingWrites().map { it.path })
        assertTrue(remote.sinceSent.isEmpty(), "no sync for an entry already cached")
    }

    @Test
    fun aPushThatCameBeforeTheSyncIsFoundBySyncing() = runTest {
        val taps = taps()
        remote.syncAnswers += Remote.Ok(page(open(onIssue("e1", issueId = "i9")), teams = setOf(TEAM_A)))

        taps.open(adas("e1"))
        settle()

        assertEquals(listOf(Destination.Issue("i9", TEAM_A)), found())
        assertEquals(1, remote.sinceSent.size)
    }

    @Test
    fun anEntryOnNoIssueIsReadAndOpensNothing() = runTest {
        cache(onIssue("e1", issueId = null))
        val taps = taps()

        taps.open(adas("e1"))
        settle()

        assertEquals(emptyList(), found())
        assertEquals(1, store.pendingWrites().size)
    }

    @Test
    fun anEntryTheCacheNeverGetsOpensNothing() = runTest {
        val taps = taps()
        // No sync answer queued: the sync fails, as it would offline.

        val lookup = taps.open(adas("gone"))
        settle()

        assertTrue(lookup.isCompleted)
        assertEquals(1, remote.sinceSent.size)
        assertEquals(emptyList(), found())
        assertTrue(store.pendingWrites().isEmpty())
    }

    @Test
    fun aLookupSlowerThanTheWindowOpensNothing() = runTest {
        val taps = taps()
        remote.syncAnswers += Remote.Ok(page(open(onIssue("e1")), teams = setOf(TEAM_A)))
        remote.onSync = { delay(NotificationTaps.OPEN_WINDOW_MILLIS + 1) }

        val lookup = taps.open(adas("e1"))
        advanceTimeBy(NotificationTaps.OPEN_WINDOW_MILLIS + 2)
        settle()

        assertTrue(lookup.isCompleted)
        assertEquals(emptyList(), found())
        assertTrue(store.pendingWrites().isEmpty())
    }

    @Test
    fun aTapPostedForSomeoneElseOpensNothing() = runTest {
        cache(onIssue("e1"))
        val taps = taps()

        taps.open(NotificationTap("e1", ownerOf(GRACE)))
        settle()

        assertEquals(emptyList(), found())
        assertTrue(remote.sinceSent.isEmpty())
        assertTrue(store.pendingWrites().isEmpty())
    }

    @Test
    fun anotherPersonsCacheIsClaimedBeforeItIsRead() = runTest {
        // Grace's cache, left behind by a process that died before her sign-out emptied it.
        cache(onIssue("e1"), owner = ownerOf(GRACE))
        val taps = taps()

        taps.open(adas("e1"))
        settle()

        assertEquals(emptyList(), found())
        assertEquals(ownerOf(ADA), store.owner())
        assertNull(store.inboxEntry("e1"))
        assertTrue(store.pendingWrites().isEmpty())
    }

    @Test
    fun signingOutDuringTheLookupDropsIt() = runTest {
        val taps = taps()
        val answer = CompletableDeferred<Unit>()
        remote.syncAnswers += Remote.Ok(page(open(onIssue("e1")), teams = setOf(TEAM_A)))
        remote.onSync = { answer.await() }

        val lookup = taps.open(adas("e1"))
        runCurrent()
        sessions.signOut()
        runCurrent()
        answer.complete(Unit)
        settle()

        assertTrue(lookup.isCancelled)
        assertEquals(emptyList(), found())
        assertTrue(store.pendingWrites().isEmpty())
    }

    @Test
    fun aSecondTapReplacesTheFirst() = runTest {
        cache(onIssue("e2", issueId = "i2"))
        val taps = taps()
        val answer = CompletableDeferred<Unit>()
        remote.onSync = { answer.await() }

        val first = taps.open(adas("e1"))
        runCurrent()
        taps.open(adas("e2"))
        settle()

        assertTrue(first.isCancelled)
        assertEquals(listOf(Open.Found(2, Destination.Issue("i2", TEAM_A))), seen.filterIsInstance<Open.Found>())
    }
}

/** The navigation opens a found issue only over the screen the tap arrived on. */
class TapRouteTest {
    private val issue = Destination.Issue("i1", TEAM_A)

    @Test
    fun anIssueOpensOverTheScreenTheTapArrivedOn() {
        val route = TapRoute()
        assertNull(route.on(Open.Tapped(1), "home"))
        assertEquals(issue, route.on(Open.Found(1, issue), "home"))
    }

    @Test
    fun nothingOpensOnceThePersonHasMovedOn() {
        val route = TapRoute()
        route.on(Open.Tapped(1), "home")
        assertNull(route.on(Open.Found(1, issue), "another-issue"))
    }

    @Test
    fun nothingOpensForAnOlderTapOrOneThisNavigationNeverSaw() {
        val route = TapRoute()
        assertNull(route.on(Open.Found(1, issue), "home"))
        route.on(Open.Tapped(1), "home")
        route.on(Open.Tapped(2), "home")
        assertNull(route.on(Open.Found(1, issue), "home"))
    }
}
