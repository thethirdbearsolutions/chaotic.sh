package sh.chaotic.sync

import kotlinx.coroutines.CompletableDeferred
import kotlinx.coroutines.async
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertIs
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class WriteQueueTest {
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

    private fun conflict(message: String, code: String) = Remote.HttpError(409, code, message = message)

    @Test
    fun anApprovalWaitsOutItsUndoWindowThenGoesWithItsKey() = runTest {
        val key = assertNotNull(queue.approve(gate))

        assertEquals(FlushOutcome.Done(WriteQueue.UNDO_MILLIS), queue.flush())
        assertTrue(remote.writesSent.isEmpty())

        now += WriteQueue.UNDO_MILLIS
        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(
            listOf(SentWrite("POST", "/api/rituals/r1/complete-issue/i1", JsonObject(emptyMap()), key)),
            remote.writesSent,
        )
        // Taken: out of the queue and out of the inbox at once, before the sync's tombstone.
        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(listOf("m1"), store.inbox().map { it.id })
    }

    @Test
    fun anUndoInsideTheWindowSendsNothing() = runTest {
        val key = assertNotNull(queue.approve(gate))

        assertTrue(queue.undo(key))
        now += WriteQueue.UNDO_MILLIS

        assertEquals(FlushOutcome.Done(null), queue.flush())
        assertTrue(remote.writesSent.isEmpty())
        assertEquals(setOf("g1", "m1"), store.inbox().map { it.id }.toSet())
    }

    @Test
    fun aWriteBeingSentCannotBeUndone() = runTest {
        val key = assertNotNull(queue.approve(gate, undoMillis = 0))
        val inFlight = CompletableDeferred<Unit>()
        val release = CompletableDeferred<Unit>()
        remote.answerWrite = {
            inFlight.complete(Unit)
            release.await()
            Remote.Ok(null)
        }

        val flush = async { queue.flush() }
        inFlight.await()
        assertFalse(queue.undo(key))
        release.complete(Unit)

        assertEquals(FlushOutcome.Done(null), flush.await())
        assertEquals(1, remote.writesSent.size)
    }

    @Test
    fun aRejectionCarriesItsReason() = runTest {
        val key = assertNotNull(queue.reject(gate, "  Needs tests  ", undoMillis = 0))

        queue.flush()

        assertEquals(
            SentWrite(
                "POST",
                "/api/rituals/r1/reject-issue/i1",
                JsonObject(mapOf("note" to JsonPrimitive("Needs tests"))),
                key,
            ),
            remote.writesSent.single(),
        )
    }

    @Test
    fun aRejectionWithoutAReasonIsNotQueued() = runTest {
        assertNull(queue.reject(gate, "   "))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun anActionTheServerDidNotOfferIsNotQueued() = runTest {
        assertNull(queue.approve(mention))
        assertNull(queue.reject(mention, "no"))
        assertNull(queue.markRead(mention.copy(actions = emptyList())))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aSecondDecisionOnTheSameEntryIsNotQueued() = runTest {
        assertNotNull(queue.approve(gate))
        assertNull(queue.reject(gate, "changed my mind"))
        assertNull(queue.archive(gate))

        assertEquals(listOf(WriteKind.APPROVE), store.pendingWrites().map { it.kind })
    }

    @Test
    fun markReadIsImmediateOnlyOnceAndNotForAReadEntry() = runTest {
        assertNotNull(queue.markRead(mention))
        assertNull(queue.markRead(mention))
        assertNull(queue.markRead(mention.copy(id = "m2", read = true)))

        queue.flush()

        assertEquals(listOf("/api/inbox/m1/read"), remote.writesSent.map { it.path })
        assertTrue(store.inbox().single { it.id == "m1" }.read)
    }

    @Test
    fun aMarkReadOrArchiveOfAnEntryThatIsGoneIsDroppedQuietly() = runTest {
        remote.answerWrite = { Remote.HttpError(404) }
        queue.markRead(mention)
        queue.archive(gate, undoMillis = 0)

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(2, remote.writesSent.size)
        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(emptyList(), store.refusals())
    }

    @Test
    fun aRefusalIsKeptWithTheServersReasonAndNotRetried() = runTest {
        remote.answerWrite = { conflict("Already approved by Grace.", "ritual_already_resolved") }
        val key = assertNotNull(queue.approve(gate, undoMillis = 0))

        assertEquals(FlushOutcome.Done(null), queue.flush())
        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(1, remote.writesSent.size)
        val refusal = store.refusals().single()
        assertEquals(key, refusal.key)
        assertEquals(WriteKind.APPROVE, refusal.kind)
        assertEquals("CHT-1", refusal.label)
        assertEquals(409, refusal.status)
        assertEquals("ritual_already_resolved", refusal.errorCode)
        assertEquals("Already approved by Grace.", refusal.message)
        // The cache was never changed, so the entry is still there for the next sync to settle.
        assertTrue(store.inbox().any { it.id == "g1" })

        queue.dismissRefusal(key)
        assertEquals(emptyList(), store.refusals())
    }

    @Test
    fun anArrearsRefusalIsDroppedAndTheNextWriteStillGoes() = runTest {
        remote.answerWrite = { sent ->
            if (sent.body["status"] != null) {
                Remote.HttpError(409, "sprint_in_arrears", message = "Sprint is in arrears in project CHT.")
            } else {
                Remote.Ok(null)
            }
        }
        queue.update(issue(), IssueFields.STATUS, "done")
        queue.update(issue(), IssueFields.PRIORITY, "urgent")

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(2, remote.writesSent.size)
        assertEquals(listOf("sprint_in_arrears"), store.refusals().map { it.errorCode })
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aTransientFailureKeepsTheWriteAndEverythingAfterItInOrder() = runTest {
        val answers = ArrayDeque<Remote<Any?>>(
            listOf(Remote.Unreachable(IOException("offline")), Remote.HttpError(503), Remote.Ok(null), Remote.Ok(null)),
        )
        remote.answerWrite = { answers.removeFirst() }
        val first = assertNotNull(queue.comment(issue(), "first"))
        val second = assertNotNull(queue.comment(issue(), "second"))

        assertIs<FlushOutcome.Retry>(queue.flush())
        assertIs<FlushOutcome.Retry>(queue.flush())
        assertEquals(listOf(first, second), store.pendingWrites().map { it.key })

        assertEquals(FlushOutcome.Done(null), queue.flush())
        // The first was tried three times, with the same key each time, before the second went at all.
        assertEquals(listOf(first, first, first, second), remote.writesSent.map { it.idempotencyKey })
    }

    @Test
    fun retriesBackOffAndHonourRetryAfter() = runTest {
        remote.answerWrite = { Remote.HttpError(429, retryAfterMillis = 60_000) }
        queue.comment(issue(), "hello")

        assertEquals(FlushOutcome.Retry(60_000), queue.flush())

        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        val delays = List(3) { (queue.flush() as FlushOutcome.Retry).afterMillis }
        assertEquals(
            listOf(2, 4, 8).map { WriteQueue.FIRST_RETRY_MILLIS * it },
            delays,
        )
    }

    @Test
    fun aSuccessResetsTheBackoff() = runTest {
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        queue.comment(issue(), "a")
        queue.flush()
        queue.flush()
        remote.answerWrite = { Remote.Ok(null) }
        queue.flush()

        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        queue.comment(issue(), "b")

        assertEquals(FlushOutcome.Retry(WriteQueue.FIRST_RETRY_MILLIS), queue.flush())
    }

    @Test
    fun anIssueUpdateSendsOneFieldAndSavesTheServersIssue() = runTest {
        val answered = issue().copy(status = "in_progress", updatedAtMillis = 99, openedAtMillis = 0)
        remote.answerWrite = { Remote.Ok(answered) }
        val key = assertNotNull(queue.update(issue(), IssueFields.STATUS, "in_progress"))

        queue.flush()

        assertEquals(
            SentWrite("PATCH", "/api/issues/i1", JsonObject(mapOf("status" to JsonPrimitive("in_progress"))), key),
            remote.writesSent.single(),
        )
        val saved = assertNotNull(store.issue("i1")).issue
        assertEquals("in_progress", saved.status)
        assertEquals(99, saved.updatedAtMillis)
    }

    @Test
    fun unassigningSendsANull() = runTest {
        queue.update(issue(), IssueFields.ASSIGNEE, null)

        queue.flush()

        assertEquals(JsonObject(mapOf("assignee_id" to JsonNull)), remote.writesSent.single().body)
    }

    @Test
    fun aValueTheAppDoesNotKnowIsNotQueued() = runTest {
        assertNull(queue.update(issue(), IssueFields.STATUS, "shipped"))
        assertNull(queue.update(issue(), IssueFields.PRIORITY, "whenever"))
        assertNull(queue.update(issue(), "title", "x"))
        assertNull(queue.comment(issue(), "  "))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aCommentIsAddedToTheCachedIssueAsStored() = runTest {
        val stored = Comment("c9", "i1", Principal("ada", "Ada"), "hello", 5)
        remote.answerWrite = { Remote.Ok(stored) }
        queue.comment(issue(), " hello ")

        queue.flush()

        assertEquals(JsonObject(mapOf("content" to JsonPrimitive("hello"))), remote.writesSent.single().body)
        assertEquals(listOf(stored), assertNotNull(store.issue("i1")).comments)
    }

    @Test
    fun aRefusedSessionStopsTheFlushAndKeepsTheQueue() = runTest {
        remote.answerWrite = { Remote.HttpError(401) }
        queue.comment(issue(), "a")
        queue.comment(issue(), "b")

        assertEquals(FlushOutcome.Unauthorized, queue.flush())

        assertEquals(1, remote.writesSent.size)
        assertEquals(2, store.pendingWrites().size)
    }

    @Test
    fun signedOutNothingIsQueuedOrSent() = runTest {
        queue.comment(issue(), "a")
        signedIn = null

        assertNull(queue.comment(issue(), "b"))
        assertEquals(FlushOutcome.Unauthorized, queue.flush())
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun anotherPersonSigningInEmptiesTheQueueBeforeAnythingIsSent() = runTest {
        queue.comment(issue(), "Ada's comment")
        signedIn = OTHER_OWNER

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertTrue(remote.writesSent.isEmpty())
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aSignOutWhileAWriteIsInFlightDropsItsAnswer() = runTest {
        val stored = Comment("c9", "i1", Principal("ada", "Ada"), "hello", 5)
        remote.answerWrite = {
            session.end()
            Remote.Ok(stored)
        }
        queue.comment(issue(), "hello")

        assertEquals(FlushOutcome.Unauthorized, queue.flush())
        assertEquals(CacheSnapshot(null, emptyList(), emptyList(), emptyList(), emptyList()), store.snapshot())
    }

    @Test
    fun writesGoInTheOrderTheyWereMadeOnceDue() = runTest {
        queue.archive(mention) // waits out the undo window
        queue.comment(issue(), "now")

        assertEquals(FlushOutcome.Done(WriteQueue.UNDO_MILLIS), queue.flush())
        assertEquals(listOf("/api/issues/i1/comments"), remote.writesSent.map { it.path })

        now += WriteQueue.UNDO_MILLIS
        queue.flush()
        assertEquals(listOf("/api/issues/i1/comments", "/api/inbox/m1/archive"), remote.writesSent.map { it.path })
    }

    @Test
    fun refusalsAreCapped() = runTest {
        remote.answerWrite = { Remote.HttpError(422, message = "no") }
        repeat(WriteQueue.MAX_REFUSALS + 2) { queue.comment(issue(), "c$it") }

        queue.flush()

        val refusals = store.refusals()
        assertEquals(WriteQueue.MAX_REFUSALS, refusals.size)
        assertEquals("k3", refusals.first().key)
    }
}
