package sh.chaotic.sync

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.async
import kotlinx.coroutines.test.runTest
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class InboxSyncerTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private val syncer = InboxSyncer(remote, store)

    @Test
    fun firstSyncStoresOpenEntriesAndTheCursor() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), open(entry("e2")), cursor = "c1"))

        val outcome = syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 1), outcome)
        assertEquals(listOf("e1", "e2"), store.inbox().map { it.id })
        assertEquals("c1", store.inboxCursor())
        assertEquals(listOf<String?>(null), remote.sinceSent)
    }

    @Test
    fun theCursorIsSentBackAndAdvances() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e2", 2_000)), cursor = "c2"))

        syncer.sync()
        syncer.sync()

        assertEquals(listOf<String?>(null, "c1"), remote.sinceSent)
        assertEquals("c2", store.inboxCursor())
        assertEquals(setOf("e1", "e2"), store.inbox().map { it.id }.toSet())
    }

    @Test
    fun aPageWithNoCursorKeepsTheOneHeld() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(cursor = null))

        syncer.sync()
        syncer.sync()

        assertEquals("c1", store.inboxCursor())
    }

    @Test
    fun anEmptyFirstSyncLeavesNoCursor() = runTest {
        remote.syncAnswers += Remote.Ok(page(cursor = null))

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 1), syncer.sync())
        assertNull(store.inboxCursor())
    }

    @Test
    fun pagesWhileHasMore() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1", hasMore = true))
        remote.syncAnswers += Remote.Ok(page(open(entry("e2", 2_000)), cursor = "c2", hasMore = true))
        remote.syncAnswers += Remote.Ok(page(open(entry("e3", 3_000)), cursor = "c3"))

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 3), syncer.sync())
        assertEquals(listOf<String?>(null, "c1", "c2"), remote.sinceSent)
        assertEquals("c3", store.inboxCursor())
        assertEquals(3, store.inbox().size)
    }

    @Test
    fun aRunStopsAtItsPageCapAndSaysMoreIsPending() = runTest {
        val capped = InboxSyncer(remote, store, maxPages = 2)
        repeat(3) { remote.syncAnswers += Remote.Ok(page(open(entry("e$it")), cursor = "c$it", hasMore = true)) }

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 2, morePending = true), capped.sync())
        assertEquals("c1", store.inboxCursor())
    }

    @Test
    fun aTombstoneDeletesTheEntry() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), open(entry("e2")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(tombstone(entry("e1", 5_000)), cursor = "c2"))

        syncer.sync()
        syncer.sync()

        assertEquals(listOf("e2"), store.inbox().map { it.id })
    }

    @Test
    fun aTombstoneForAnEntryNeverHeldIsHarmless() = runTest {
        remote.syncAnswers += Remote.Ok(page(tombstone(entry("ghost")), cursor = "c1"))

        syncer.sync()

        assertTrue(store.inbox().isEmpty())
        assertEquals("c1", store.inboxCursor())
    }

    @Test
    fun applyingTheSamePageTwiceIsIdempotent() = runTest {
        // The cursor trails the newest change by the server's safety lag, so
        // recent rows come again on the next sync.
        val repeated = page(open(entry("e1", 1_000)), open(entry("e2", 2_000)), tombstone(entry("e3")), cursor = "c1")
        remote.syncAnswers += Remote.Ok(repeated)
        syncer.sync()
        val once = store.inbox()

        remote.syncAnswers += Remote.Ok(repeated)
        syncer.sync()

        assertEquals(once, store.inbox())
        assertEquals("c1", store.inboxCursor())
    }

    @Test
    fun anOlderCopyDoesNotOverwriteANewerOne() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 5_000, read = true)), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 4_000, read = false)), cursor = "c2"))

        syncer.sync()
        syncer.sync()

        assertEquals(true, store.inbox().single().read)
        assertEquals(5_000, store.inbox().single().updatedAtMicros)
        // The cursor still moves: the page was applied, the stale row skipped.
        assertEquals("c2", store.inboxCursor())
    }

    @Test
    fun anOlderTombstoneDoesNotDeleteANewerEntry() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 5_000)), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(tombstone(entry("e1", 4_000)), cursor = "c2"))

        syncer.sync()
        syncer.sync()

        assertEquals(listOf("e1"), store.inbox().map { it.id })
    }

    @Test
    fun anEqualVersionIsReapplied() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 5_000)), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 5_000).copy(title = "Renamed")), cursor = "c2"))

        syncer.sync()
        syncer.sync()

        assertEquals("Renamed", store.inbox().single().title)
    }

    @Test
    fun resetClearsTheInboxBeforeApplyingThePage() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("old1")), open(entry("old2")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("fresh", 9_000)), cursor = "r1", reset = true, hasMore = true))
        remote.syncAnswers += Remote.Ok(page(open(entry("fresh2", 9_500)), cursor = "r2"))

        syncer.sync()
        syncer.sync()

        assertEquals(setOf("fresh", "fresh2"), store.inbox().map { it.id }.toSet())
        assertEquals(listOf<String?>(null, "c1", "r1"), remote.sinceSent)
        assertEquals("r2", store.inboxCursor())
    }

    @Test
    fun aResetPageReplacesEvenNewerHeldCopies() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 9_000, read = true)), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e1", 1_000, read = false)), cursor = "r1", reset = true))

        syncer.sync()
        syncer.sync()

        assertEquals(false, store.inbox().single().read)
    }

    @Test
    fun anInvalidCursorRestartsWithoutOneAndClears() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("stale")), cursor = "c1"))
        remote.syncAnswers += Remote.HttpError(400, errorCode = "invalid_cursor")
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "n1"))

        syncer.sync()
        val outcome = syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 1), outcome)
        assertEquals(listOf<String?>(null, "c1", null), remote.sinceSent)
        assertEquals(listOf("e1"), store.inbox().map { it.id })
        assertEquals("n1", store.inboxCursor())
    }

    @Test
    fun anInvalidCursorRestartsOnlyOncePerRun() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1", hasMore = true))
        remote.syncAnswers += Remote.HttpError(400, errorCode = "invalid_cursor")
        remote.syncAnswers += Remote.Ok(page(open(entry("e2")), cursor = "c2", hasMore = true))
        remote.syncAnswers += Remote.HttpError(400, errorCode = "invalid_cursor")

        val outcome = syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Failed(SyncOutcome.Reason.SERVER, status = 400), outcome)
        assertEquals(listOf<String?>(null, "c1", null, "c2"), remote.sinceSent)
    }

    @Test
    fun anotherBadRequestIsAFailureNotARestart() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.HttpError(400, errorCode = "something_else")

        syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Failed(SyncOutcome.Reason.SERVER, status = 400), syncer.sync())
        assertEquals("c1", store.inboxCursor())
        assertEquals(listOf("e1"), store.inbox().map { it.id })
    }

    @Test
    fun aTeamMissingFromTeamIdsIsDroppedEverywhere() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.saveIssue(IssueDetail(issue("ia", TEAM_A), emptyList(), emptyList()))
        store.saveIssue(IssueDetail(issue("ib", TEAM_B), emptyList(), emptyList()))
        store.replaceSprintCards(TEAM_B, listOf(card("pb", TEAM_B)))
        remote.syncAnswers += Remote.Ok(page(open(entry("a1")), open(entry("b1", teamId = TEAM_B)), cursor = "c1"))
        // The person left team B: a left team sends no tombstones, only its absence.
        remote.syncAnswers += Remote.Ok(page(cursor = "c2", teams = setOf(TEAM_A)))

        syncer.sync()
        syncer.sync()

        assertEquals(listOf("a1"), store.inbox().map { it.id })
        assertEquals(listOf(TEAM_A), store.teams().map { it.id })
        assertNull(store.issue("ib"))
        assertEquals("ia", store.issue("ia")?.issue?.id)
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun unauthorizedStopsAndChangesNothing() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.HttpError(401)

        syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Unauthorized, syncer.sync())
        assertEquals("c1", store.inboxCursor())
        assertEquals(1, store.inbox().size)
    }

    @Test
    fun aFailureMidPagingKeepsWhatWasApplied() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1", hasMore = true))
        remote.syncAnswers += Remote.HttpError(503, retryAfterMillis = 7_000)

        val outcome = syncer.sync()

        assertEquals<SyncOutcome>(SyncOutcome.Failed(SyncOutcome.Reason.SERVER, status = 503, retryAfterMillis = 7_000), outcome)
        assertEquals("c1", store.inboxCursor())
        assertEquals(listOf("e1"), store.inbox().map { it.id })
    }

    @Test
    fun offlineAndUnreadableAreFailuresThatWriteNothing() = runTest {
        remote.syncAnswers += Remote.Unreachable(IOException("offline"))
        remote.syncAnswers += Remote.Unreadable(IllegalStateException("html"))

        assertEquals<SyncOutcome>(SyncOutcome.Failed(SyncOutcome.Reason.UNREACHABLE), syncer.sync())
        assertEquals<SyncOutcome>(SyncOutcome.Failed(SyncOutcome.Reason.UNREADABLE), syncer.sync())
        assertEquals(0, store.inboxWrites)
    }

    @Test
    fun retryAfterIsReported() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1", retryAfter = 12))

        assertEquals<SyncOutcome>(SyncOutcome.Synced(pages = 1, retryAfterSeconds = 12), syncer.sync())
    }

    @Test
    fun concurrentRunsAreSingleFlight() = runTest {
        val firstStarted = CompletableDeferred<Unit>()
        val release = CompletableDeferred<Unit>()
        var calls = 0
        remote.onSync = {
            calls++
            if (calls == 1) {
                firstStarted.complete(Unit)
                release.await()
            }
        }
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(open(entry("e2", 2_000)), cursor = "c2"))

        val first = async { syncer.sync() }
        firstStarted.await()
        val second = async { syncer.sync() }
        release.complete(Unit)
        first.await()
        second.await()

        // The second run waited and started from the first run's cursor.
        assertEquals(listOf<String?>(null, "c1"), remote.sinceSent)
        assertEquals("c2", store.inboxCursor())
    }

    @Test
    fun aRunAfterAResetPageThatHadNoCursorStartsOver() = runTest {
        remote.syncAnswers += Remote.Ok(page(open(entry("e1")), cursor = "c1"))
        remote.syncAnswers += Remote.Ok(page(cursor = null, reset = true))

        syncer.sync()
        syncer.sync()

        assertNull(store.inboxCursor())
        assertTrue(store.inbox().isEmpty())
        remote.syncAnswers += Remote.Ok(page(cursor = "c3"))
        syncer.sync()
        assertEquals(listOf<String?>(null, "c1", null), remote.sinceSent)
    }
}
