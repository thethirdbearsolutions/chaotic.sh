package sh.chaotic.android.data

import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Before
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.sync.FakeRemote
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.Remote
import sh.chaotic.sync.TEAM_A
import sh.chaotic.sync.TEAM_B
import sh.chaotic.sync.entry
import sh.chaotic.sync.open
import sh.chaotic.sync.page
import sh.chaotic.sync.tombstone
import kotlin.test.Test
import kotlin.test.assertEquals

/** InboxSyncer end to end on the Room store, read back through the queries the screens observe. */
@RunWith(RobolectricTestRunner::class)
class RoomInboxSyncTest {
    private val remote = FakeRemote()
    private lateinit var database: ChaoticDatabase
    private lateinit var dao: CacheDao
    private lateinit var syncer: InboxSyncer

    @Before
    fun setUp() {
        database = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            ChaoticDatabase::class.java,
        )
            .allowMainThreadQueries()
            .build()
        dao = database.cache()
        syncer = InboxSyncer(remote, RoomCacheStore(dao))
    }

    @After
    fun close() = database.close()

    private suspend fun shown() = dao.observeInbox().first().map { it.id }.sorted()

    @Test
    fun pagesTombstonesResetAndALeftTeam() = runTest {
        remote.syncAnswers += Remote.Ok(
            page(open(entry("a1")), open(entry("b1", teamId = TEAM_B)), cursor = "c1", hasMore = true),
        )
        remote.syncAnswers += Remote.Ok(page(open(entry("a2", 2_000)), cursor = "c2"))
        syncer.sync()
        assertEquals(listOf("a1", "a2", "b1"), shown())

        remote.syncAnswers += Remote.Ok(page(tombstone(entry("a1", 3_000)), cursor = "c3", teams = setOf(TEAM_A)))
        syncer.sync()
        assertEquals(listOf("a2"), shown())

        remote.syncAnswers += Remote.Ok(page(open(entry("a9", 9_000)), cursor = "r1", reset = true))
        syncer.sync()
        assertEquals(listOf("a9"), shown())
        assertEquals("r1", dao.syncValue(CacheDao.INBOX_CURSOR))
        assertEquals(listOf<String?>(null, "c1", "c2", "c3"), remote.sinceSent)
    }
}
