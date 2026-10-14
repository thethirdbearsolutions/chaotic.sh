package sh.chaotic.sync

import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

/** Approve and Reject from a notification's buttons (CHT-1665). */
class NotificationDecisionTest {
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
            InboxAction(InboxAction.ARCHIVE, "/api/inbox/g1/archive"),
        ),
    )

    /** A gate the person may no longer decide: the server offers only archive. */
    private val undecidable = entry("g2", kind = "gate_pending").copy(
        issueId = "i2",
        actions = listOf(InboxAction(InboxAction.ARCHIVE, "/api/inbox/g2/archive")),
    )

    init {
        runBlocking {
            store.claim(OWNER)
            store.applyInbox(InboxChange(false, listOf(gate, undecidable), emptySet(), setOf(TEAM_A), "c"))
        }
    }

    @Test
    fun anApprovalGoesAtOnceWithItsKeyAndIsDone() = runTest {
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))

        // No undo window: due now.
        assertEquals(WriteStatus.Waiting, queue.status(queued.key, OWNER))
        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(
            listOf(SentWrite("POST", "/api/rituals/r1/complete-issue/i1", JsonObject(emptyMap()), queued.key, OWNER)),
            remote.writesSent,
        )
        assertEquals(WriteStatus.Done, queue.status(queued.key, OWNER))
        assertEquals(listOf("g2"), store.inbox().map { it.id })
    }

    @Test
    fun aRejectionCarriesItsNote() = runTest {
        val queued = assertIs<NotificationDecision.Queued>(
            queue.decideFromNotification(OWNER, "g1", note = "  Rejected from phone "),
        )

        queue.flush()

        assertEquals(
            SentWrite(
                "POST",
                "/api/rituals/r1/reject-issue/i1",
                JsonObject(mapOf("note" to JsonPrimitive("Rejected from phone"))),
                queued.key,
                OWNER,
            ),
            remote.writesSent.single(),
        )
    }

    @Test
    fun aBlankNoteQueuesNothing() = runTest {
        assertEquals(NotificationDecision.NotOffered, queue.decideFromNotification(OWNER, "g1", note = "   "))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun anEntryNotInTheCacheIsGoneAndNothingIsSent() = runTest {
        assertEquals(NotificationDecision.Gone, queue.decideFromNotification(OWNER, "nope"))

        queue.flush()

        assertEquals(emptyList(), store.pendingWrites())
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun aDecisionTheServerDidNotOfferIsNotQueued() = runTest {
        assertEquals(NotificationDecision.NotOffered, queue.decideFromNotification(OWNER, "g2"))
        assertEquals(NotificationDecision.NotOffered, queue.decideFromNotification(OWNER, "g2", note = "no"))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aSecondDecisionOnTheSameEntryIsNotQueued() = runTest {
        val first = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))

        assertEquals(
            NotificationDecision.AlreadyQueued(first.key, WriteKind.APPROVE, dueInMillis = 0),
            queue.decideFromNotification(OWNER, "g1", note = "no"),
        )
        assertEquals(1, store.pendingWrites().size)
    }

    @Test
    fun anInAppSwipeStillInItsUndoWindowSaysHowLongItHasLeft() = runTest {
        val swipe = assertNotNull(queue.reject(gate, "not yet"))
        now += 1_000

        assertEquals(
            NotificationDecision.AlreadyQueued(swipe, WriteKind.REJECT, WriteQueue.UNDO_MILLIS - 1_000),
            queue.decideFromNotification(OWNER, "g1"),
        )
    }

    @Test
    fun aWriteDiscardedInTheAppIsUnknownNeverDone() = runTest {
        remote.answerWrite = { Remote.HttpError(503) }
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))
        queue.flush()

        assertTrue(queue.undo(queued.key))

        assertEquals(WriteStatus.Unknown, queue.status(queued.key, OWNER))
    }

    @Test
    fun aWriteEmptiedWithTheCacheAtASignOutIsUnknownAfterTheSamePersonSignsInAgain() = runTest {
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))
        signedIn = null
        session.end()

        assertEquals(WriteStatus.SignedOut, queue.status(queued.key, OWNER))
        signedIn = OWNER
        // Back again: the queue was emptied, nothing was sent, so it was not approved.
        assertEquals(WriteStatus.Unknown, queue.status(queued.key, OWNER))
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun anotherPersonsQueueSaysNothingAboutTheWrite() = runTest {
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))
        queue.flush()
        assertEquals(WriteStatus.Done, queue.status(queued.key, OWNER))

        signedIn = OTHER_OWNER

        assertEquals(WriteStatus.SignedOut, queue.status(queued.key, OWNER))
        // Grace's own queue never held it, and it was not hers to be taken.
        assertEquals(WriteStatus.Unknown, queue.status(queued.key, OTHER_OWNER))
    }

    @Test
    fun signedOutNothingIsQueued() = runTest {
        signedIn = null

        assertEquals(NotificationDecision.SignedOut, queue.decideFromNotification(OWNER, "g1"))
        assertEquals(WriteStatus.SignedOut, queue.status("k1", OWNER))
        signedIn = OWNER
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aNotificationLeftFromAnEarlierSignInCannotAct() = runTest {
        // Grace signs in on this phone; Ada's notification is still on the lock screen.
        signedIn = OTHER_OWNER

        assertEquals(NotificationDecision.SignedOut, queue.decideFromNotification(OWNER, "g1"))
        // Even under Grace's own name, Ada's entry is not in Grace's cache.
        assertEquals(NotificationDecision.Gone, queue.decideFromNotification(OTHER_OWNER, "g1"))

        queue.flush()
        assertTrue(remote.writesSent.isEmpty())
    }

    @Test
    fun aRefusalIsReportedWithTheServersMessage() = runTest {
        remote.answerWrite = {
            Remote.HttpError(409, "ritual_already_resolved", message = "Already approved by Grace.")
        }
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))

        queue.flush()

        val refused = assertIs<WriteStatus.Refused>(queue.status(queued.key, OWNER))
        assertEquals("Already approved by Grace.", refused.refusal.message)
        assertEquals("ritual_already_resolved", refused.refusal.errorCode)
    }

    @Test
    fun aWriteTheServerFailsWaitsAndThenStalls() = runTest {
        remote.answerWrite = { Remote.HttpError(503) }
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))

        queue.flush()
        assertEquals(WriteStatus.Waiting, queue.status(queued.key, OWNER))

        repeat(WriteQueue.MAX_ATTEMPTS) {
            now += WriteQueue.MAX_RETRY_MILLIS
            queue.flush()
        }
        assertEquals(WriteStatus.Stalled, queue.status(queued.key, OWNER))
    }

    @Test
    fun offlineItWaits() = runTest {
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        val queued = assertIs<NotificationDecision.Queued>(queue.decideFromNotification(OWNER, "g1"))

        assertIs<FlushOutcome.Retry>(queue.flush())

        assertEquals(WriteStatus.Waiting, queue.status(queued.key, OWNER))
    }
}
