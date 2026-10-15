package sh.chaotic.sync

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertIs

/** What the write queue does about an issue its writes changed (CHT-1668). */
class WriteQueueStaleIssueTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private var signedIn: String? = OWNER
    private val session = CacheSession(store) { signedIn }
    private var now = 1_000_000L
    private var keys = 0
    private val queue = WriteQueue(remote, session, nowMillis = { now }, newKey = { "k${++keys}" })

    private val gate = entry("g1", kind = "gate_pending").copy(
        issueId = "i1",
        issueIdentifier = "CHT-1",
        actions = listOf(
            InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
            InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
            InboxAction(InboxAction.MARK_READ, "/api/inbox/g1/read"),
            InboxAction(InboxAction.ARCHIVE, "/api/inbox/g1/archive"),
        ),
    )
    private val mention = entry("m1").copy(
        actions = listOf(
            InboxAction(InboxAction.MARK_READ, "/api/inbox/m1/read"),
            InboxAction(InboxAction.ARCHIVE, "/api/inbox/m1/archive"),
        ),
    )

    init {
        runBlocking {
            store.claim(OWNER)
            store.applyInbox(InboxChange(false, listOf(gate, mention), emptySet(), setOf(TEAM_A), "c"))
            store.saveIssue(IssueDetail(issue(), emptyList(), emptyList()))
        }
    }

    /** A queue that records each issue it asks to have fetched again (CHT-1668), through [hook]. */
    private val stale = mutableListOf<String>()
    private val refreshErrors = mutableListOf<Exception>()
    private var hook: suspend (String) -> Unit = { stale += it }
    private val refreshing = WriteQueue(
        remote,
        session,
        nowMillis = { now },
        newKey = { "s${++keys}" },
        onIssueStale = { hook(it) },
        onStaleRefreshError = { refreshErrors += it },
    )

    @Test
    fun aTakenCommentWhoseAnswerCannotBeReadFetchesTheIssueAgain() = runTest {
        // FakeRemote's default answer is a 2xx with nothing the app can read.
        refreshing.comment(issue(), "hello")

        assertEquals(FlushOutcome.Done(null), refreshing.flush())

        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(listOf("i1"), stale)
        assertEquals(1, session.issueWrites("i1"))
    }

    @Test
    fun aTakenUpdateWhoseAnswerCannotBeReadFetchesTheIssueAgain() = runTest {
        refreshing.update(issue(), IssueFields.STATUS, "done")

        refreshing.flush()

        assertEquals(listOf("i1"), stale)
    }

    @Test
    fun anIssueLeftStaleByManyWritesIsFetchedOnceAfterTheFlush() = runTest {
        refreshing.comment(issue(), "a")
        refreshing.comment(issue(), "b")
        refreshing.update(issue(), IssueFields.PRIORITY, "low")

        refreshing.flush()

        assertEquals(listOf("i1"), stale)
        assertEquals(3, session.issueWrites("i1"))
    }

    @Test
    fun aReadableAnswerOrARefusalFetchesNothing() = runTest {
        val stored = Comment("c9", "i1", Principal("ada", "Ada"), "hello", 5)
        val updated = issue().copy(status = "done")
        remote.answerWrite = { sent -> Remote.Ok(if (sent.method == "POST") stored else updated) }
        refreshing.comment(issue(), "hello")
        refreshing.update(issue(), IssueFields.STATUS, "done")
        refreshing.flush()
        assertEquals(2, session.issueWrites("i1"))

        remote.answerWrite = { Remote.HttpError(409, "sprint_in_limbo") }
        refreshing.update(issue(), IssueFields.PRIORITY, "low")
        refreshing.flush()

        assertEquals(emptyList(), stale)
        assertEquals(2, session.issueWrites("i1"))
        assertEquals(1, store.refusals().size)
    }

    @Test
    fun aDecidedGateCountsAsAWriteToItsIssueAndFetchesItAgain() = runTest {
        refreshing.approve(gate, undoMillis = 0)

        refreshing.flush()

        // Approving a gate changes the issue on the server; its effect only drops the entry.
        assertEquals(listOf("i1"), stale)
        assertEquals(1, session.issueWrites("i1"))
    }

    @Test
    fun archivingOrMarkingReadChangesNoIssue() = runTest {
        refreshing.archive(gate, undoMillis = 0)
        refreshing.markRead(mention)

        refreshing.flush()

        assertEquals(2, remote.writesSent.size)
        assertEquals(emptyList(), stale)
        assertEquals(0, session.issueWrites("i1"))
    }

    @Test
    fun theRefreshRunsOnceTheFlushIsOverAndMayFlushAgain() = runTest {
        refreshing.comment(issue(), "a")
        refreshing.archive(mention, undoMillis = 0)
        var sentBefore = -1
        hook = {
            sentBefore = remote.writesSent.size
            // Inside the flush's lock this would never return: the lock is not reentrant.
            assertEquals(FlushOutcome.Done(null), refreshing.flush())
            stale += it
        }

        assertEquals(FlushOutcome.Done(null), refreshing.flush())

        assertEquals(2, sentBefore) // the comment and the archive were both sent before it
        assertEquals(listOf("i1"), stale)
    }

    @Test
    fun aFailedRefreshNeitherHoldsBackTheWritesNorEndsTheFlush() = runTest {
        store.saveIssue(IssueDetail(issue("i2"), emptyList(), emptyList()))
        refreshing.comment(issue(), "a")
        refreshing.comment(issue("i2"), "b")
        hook = { if (it == "i1") throw IllegalStateException("database closed") else stale += it }

        assertEquals(FlushOutcome.Done(null), refreshing.flush())

        assertEquals(2, remote.writesSent.size)
        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(listOf("i2"), stale)
        assertIs<IllegalStateException>(refreshErrors.single())
    }

    @Test
    fun aCancelledRefreshCancelsTheFlush() = runTest {
        refreshing.comment(issue(), "a")
        hook = { throw CancellationException("the app is closing") }

        assertFailsWith<CancellationException> { refreshing.flush() }

        // The write was taken before: it is not sent again.
        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(emptyList(), refreshErrors)
    }

    @Test
    fun aFlushThatEndsOfflineFetchesNothing() = runTest {
        refreshing.comment(issue(), "a")
        refreshing.comment(issue("i2"), "b")
        remote.answerWrite = { sent ->
            if (sent.body.toString().contains("\"a\"")) Remote.Ok(null) else Remote.Unreachable(IOException("down"))
        }

        assertIs<FlushOutcome.Retry>(refreshing.flush())

        assertEquals(1, session.issueWrites("i1"))
        assertEquals(emptyList(), stale)
    }

    @Test
    fun aFlushThatEndsSignedOutFetchesNothing() = runTest {
        refreshing.comment(issue(), "a")
        refreshing.comment(issue("i2"), "b")
        remote.answerWrite = { sent ->
            if (sent.body.toString().contains("\"a\"")) Remote.Ok(null) else Remote.HttpError(401)
        }

        assertEquals(FlushOutcome.Unauthorized, refreshing.flush())

        assertEquals(1, session.issueWrites("i1"))
        assertEquals(emptyList(), stale)
    }

    @Test
    fun aWriteTakenAfterSignOutCountsForNothing() = runTest {
        refreshing.comment(issue(), "a")
        remote.answerWrite = {
            session.end()
            signedIn = null
            Remote.Ok(null)
        }

        assertEquals(FlushOutcome.Unauthorized, refreshing.flush())

        assertEquals(0, session.issueWrites("i1"))
        assertEquals(emptyList(), stale)
    }

    @Test
    fun onlyTakenIssueWritesOutdateAFetch() = runTest {
        remote.answerWrite = { Remote.HttpError(422) }
        queue.update(issue(), IssueFields.STATUS, "done")
        queue.approve(gate, undoMillis = 0)
        queue.flush()
        assertEquals(0, session.issueWrites("i1"))

        remote.answerWrite = { Remote.Ok(null) }
        queue.comment(issue(), "a")
        queue.flush()
        assertEquals(1, session.issueWrites("i1"))
    }
}
