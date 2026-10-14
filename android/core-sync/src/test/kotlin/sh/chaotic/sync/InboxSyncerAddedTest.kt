package sh.chaotic.sync

import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs

/** [SyncOutcome.Synced.added]: what the poll fallback may notify about (CHT-1612). */
class InboxSyncerAddedTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private val session = CacheSession(store) { OWNER }
    private var now = 5_000L
    private val syncer = InboxSyncer(remote, session, nowMillis = { now })

    init {
        runBlocking { store.claim(OWNER) }
    }

    private suspend fun added(): List<String> = assertIs<SyncOutcome.Synced>(syncer.sync()).added.map { it.id }

    @Test
    fun theFirstSyncIsNotNews() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        assertEquals(emptyList(), added())
    }

    @Test
    fun laterSyncsReportOnlyEntriesTheCacheDidNotHave() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 2_000)), open(entry("e2", 2_000)), cursor = "c2"))
        added()
        assertEquals(listOf("e2"), added(), "e1 was only updated")
    }

    @Test
    fun aResetIsNotNews() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e2", 2_000)), cursor = "c2", reset = true))
        added()
        assertEquals(emptyList(), added())
    }

    @Test
    fun anEntryOpenedAndClosedInOneRunIsNotReported() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(
            page(open(entry("e2", 2_000)), open(entry("e3", 2_000)), cursor = "c2", hasMore = true),
        )
        remote.syncAnswers += Remote.Ok(page(tombstone(entry("e2", 3_000)), open(entry("e3", 3_000)), cursor = "c3"))
        added()
        val outcome = assertIs<SyncOutcome.Synced>(syncer.sync())
        assertEquals(listOf("e3"), outcome.added.map { it.id })
        assertEquals(3_000, outcome.added.single().updatedAtMicros, "the newest copy")
    }

    @Test
    fun lastSyncedIsWhenARunLastCompleted() = runTest {
        assertEquals(null, syncer.lastSyncedAtMillis.value)
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        syncer.sync()
        assertEquals(5_000L, syncer.lastSyncedAtMillis.value)
        now = 9_000L
        syncer.sync() // nothing queued: unreachable
        assertEquals(5_000L, syncer.lastSyncedAtMillis.value, "a failed run is not a sync")
    }

    @Test
    fun aResetSpanningPagesIsNotASyncUntilItCompletes() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        syncer.sync()
        assertEquals(5_000L, syncer.lastSyncedAtMillis.value)
        now = 9_000L
        val seen = mutableListOf<Long?>()
        // The reset's first page clears the cache; the next page is the one that fails.
        remote.syncAnswers += Remote.Ok(page(open(entry("e2", 2_000)), cursor = "c2", reset = true, hasMore = true))
        val outcome = syncer.sync()
        seen += syncer.lastSyncedAtMillis.value
        assertIs<SyncOutcome.Failed>(outcome)
        assertEquals(listOf<Long?>(null), seen, "a half-done reset leaves the cache incomplete")
        remote.syncAnswers += Remote.Ok(page(open(entry("e3", 3_000)), cursor = "c3"))
        syncer.sync()
        assertEquals(9_000L, syncer.lastSyncedAtMillis.value)
    }
}
