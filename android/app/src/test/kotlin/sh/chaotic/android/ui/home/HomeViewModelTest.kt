package sh.chaotic.android.ui.home

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.viewModelScope
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancelAndJoin
import kotlinx.coroutines.delay
import kotlinx.coroutines.job
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.resetMain
import kotlinx.coroutines.test.setMain
import kotlinx.coroutines.withTimeout
import org.junit.After
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.ADA
import sh.chaotic.android.data.ChaoticDatabase
import sh.chaotic.android.data.RoomCacheStore
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.android.testSessions
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.FakeRemote
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.Remote
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.entry
import sh.chaotic.sync.open
import sh.chaotic.sync.page
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * The home screen's poll across leaving and coming back. Real dispatchers
 * and an in-memory Room database: the poll's schedule runs on the wall
 * clock, and a minute is far longer than this test.
 */
@RunWith(RobolectricTestRunner::class)
class HomeViewModelTest {
    private val remote = FakeRemote()
    private lateinit var database: ChaoticDatabase
    private lateinit var syncer: InboxSyncer
    private lateinit var queue: WriteQueue
    private var home: HomeViewModel? = null

    @Before
    fun setUp() {
        Dispatchers.setMain(Dispatchers.Unconfined)
        database = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            ChaoticDatabase::class.java,
        )
            .allowMainThreadQueries()
            .build()
    }

    @After
    fun tearDown() {
        // Stop the view model's own coroutines before resetting Main. The
        // state's WhileSubscribed upstream and the writes launched from
        // open() run on viewModelScope (Dispatchers.Main.immediate) and can
        // still be resuming on another thread after a test returns; resetMain
        // racing one of them throws "Dispatchers.Main is used concurrently
        // with setting it" (CHT-1867). Join, so none is left mid-resume.
        home?.let { vm -> runBlocking { vm.viewModelScope.coroutineContext.job.cancelAndJoin() } }
        database.close()
        Dispatchers.resetMain()
    }

    private suspend fun viewModel(): HomeViewModel {
        val sessions = testSessions(ADA)
        sessions.load()
        val cache = CacheSession(RoomCacheStore(database.cache())) { sessions.cacheOwner() }
        syncer = InboxSyncer(remote, cache)
        queue = WriteQueue(remote, cache)
        return HomeViewModel(
            sessions = sessions,
            savedState = SavedStateHandle(),
            dao = database.cache(),
            syncer = syncer,
            refresher = CacheRefresher(remote, cache),
            trigger = SyncTrigger(),
            writes = WriteActions(queue) {},
        ).also { home = it }
    }

    private suspend fun waitFor(condition: () -> Boolean) = withTimeout(WAIT_MILLIS) {
        while (!condition()) delay(POLL_MILLIS)
    }

    @Test
    fun comingBackSoonAsksNothingAndAPullAsksForEverything() = runBlocking {
        repeat(3) { remote.syncAnswers += Remote.Ok(page(cursor = "c$it")) }
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))
        val home = viewModel()

        val first = launch(Dispatchers.Default) { home.runWhileVisible() }
        // A run that has finished, not one whose request is out: cancelled
        // mid-write, the poll would never have scheduled its next run (CHT-1663).
        waitFor { syncer.lastSyncedAtMillis.value != null }
        first.cancelAndJoin()

        // Back from an issue a moment later: no sync, no team list.
        val second = launch(Dispatchers.Default) { home.runWhileVisible() }
        delay(SETTLE_MILLIS)
        second.cancelAndJoin()
        assertEquals(1, remote.sinceSent.size)
        assertEquals(1, remote.teamCalls)

        home.refresh()
        waitFor { remote.teamCalls == 2 }
        assertEquals(listOf<String?>(null, "c0"), remote.sinceSent)
    }

    @Test
    fun openingAnUnreadEntryReadsItAtOnceAndQueuesTheWrite() = runBlocking {
        val markRead = InboxAction(InboxAction.MARK_READ, "/api/inbox/e1/read")
        val unread = entry("e1").copy(issueId = "i1", actions = listOf(markRead))
        remote.syncAnswers += Remote.Ok(page(open(unread), teams = setOf(TEAM_A)))
        val home = viewModel()
        val collecting = launch(Dispatchers.Default) { home.state.collect {} }
        syncer.sync()
        waitFor { home.state.value.inbox.unread == 1 }

        home.open(home.state.value.inbox.forYou.single())

        // Shown read before anything is sent.
        waitFor { home.state.value.inbox.unread == 0 }
        assertEquals(emptyList(), remote.writesSent)
        queue.flush()
        assertEquals(listOf("/api/inbox/e1/read"), remote.writesSent.map { it.path })
        collecting.cancelAndJoin()
    }

    private companion object {
        const val WAIT_MILLIS = 10_000L
        const val POLL_MILLIS = 10L
        const val SETTLE_MILLIS = 500L
    }
}
