package sh.chaotic.android.ui

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.test.UnconfinedTestDispatcher
import kotlinx.coroutines.test.advanceUntilIdle
import kotlinx.coroutines.test.resetMain
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
import sh.chaotic.android.testSessions
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.InMemoryCacheStore
import sh.chaotic.sync.InboxChange
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.entry
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

/** The cache follows the session: emptied on sign-out, claimed (and emptied of anyone else's) on sign-in. */
@RunWith(RobolectricTestRunner::class)
class AppViewModelTest {
    private val store = InMemoryCacheStore()

    private fun inbox(id: String) = InboxChange(false, listOf(entry(id)), emptySet(), setOf(TEAM_A), "c-$id")

    @Before
    fun setUp() = Dispatchers.setMain(UnconfinedTestDispatcher())

    @After
    fun tearDown() = Dispatchers.resetMain()

    @Test
    fun signingOutEmptiesTheCache() = runTest {
        val sessions = testSessions(ADA)
        AppViewModel(sessions, CacheSession(store) { sessions.cacheOwner() })
        advanceUntilIdle()
        assertEquals(ownerOf(ADA), store.owner())
        store.applyInbox(inbox("a1"))

        sessions.signOut()
        advanceUntilIdle()

        assertNull(store.owner())
        assertNull(store.inboxCursor())
        assertTrue(store.inbox().isEmpty())
    }

    @Test
    fun signingInAsSomeoneElseEmptiesWhatTheyLeft() = runTest {
        store.claim(ownerOf(GRACE))
        store.applyInbox(inbox("g1"))
        val sessions = testSessions(ADA)

        AppViewModel(sessions, CacheSession(store) { sessions.cacheOwner() })
        advanceUntilIdle()

        assertEquals(ownerOf(ADA), store.owner())
        assertTrue(store.inbox().isEmpty())
    }
}
