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
            listOf(SentWrite("POST", "/api/rituals/r1/complete-issue/i1", JsonObject(emptyMap()), key, OWNER)),
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
                OWNER,
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
    fun aTransientFailureKeepsTheWriteAndLaterOnesAboutTheSameIssueInOrder() = runTest {
        val answers = ArrayDeque<Remote<Any?>>(
            listOf(Remote.Unreachable(IOException("offline")), Remote.HttpError(503), Remote.Ok(null), Remote.Ok(null)),
        )
        remote.answerWrite = { answers.removeFirst() }
        val first = assertNotNull(queue.comment(issue(), "first"))
        val second = assertNotNull(queue.comment(issue(), "second"))

        // Offline: nothing answered, so the flush stops and nothing counts against the write.
        assertIs<FlushOutcome.Retry>(queue.flush())
        assertEquals(0, store.pendingWrites().first().attempts)
        // A 503: the first waits, and the second, about the same issue, waits behind it.
        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS), queue.flush())
        assertEquals(listOf(first, second), store.pendingWrites().map { it.key })
        assertEquals(1, store.pendingWrites().first().attempts)

        now += WriteQueue.FIRST_RETRY_MILLIS
        assertEquals(FlushOutcome.Done(null), queue.flush())
        // The first was tried three times, with the same key each time, before the second went at all.
        assertEquals(listOf(first, first, first, second), remote.writesSent.map { it.idempotencyKey })
    }

    @Test
    fun aFailingWriteHoldsBackNothingAboutAnythingElse() = runTest {
        remote.answerWrite = { sent ->
            if (sent.path.startsWith("/api/issues/")) Remote.HttpError(500) else Remote.Ok(null)
        }
        queue.comment(issue(), "this one breaks the server")
        queue.markRead(mention)

        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS), queue.flush())

        assertEquals(listOf("/api/issues/i1/comments", "/api/inbox/m1/read"), remote.writesSent.map { it.path })
        assertTrue(store.inbox().single { it.id == "m1" }.read)
    }

    @Test
    fun aWriteTheServerKeepsFailingStallsUntilRetriedOrDiscarded() = runTest {
        remote.answerWrite = { sent ->
            if (sent.body["content"] == JsonPrimitive("poison")) Remote.HttpError(500) else Remote.Ok(null)
        }
        val poison = assertNotNull(queue.comment(issue(), "poison"))

        repeat(WriteQueue.MAX_ATTEMPTS - 1) { attempt ->
            val wait = WriteQueue.retryDelay(attempt + 1, 0)
            assertEquals(FlushOutcome.Done(wait), queue.flush())
            now += wait
        }
        // The last failure stalls it: not sent again, not waited for.
        assertEquals(FlushOutcome.Done(null), queue.flush())
        val stalled = store.pendingWrites().single()
        assertTrue(stalled.stalled)
        assertEquals(WriteQueue.MAX_ATTEMPTS, remote.writesSent.size)
        now += WriteQueue.MAX_RETRY_MILLIS
        assertEquals(FlushOutcome.Done(null), queue.flush())
        assertEquals(WriteQueue.MAX_ATTEMPTS, remote.writesSent.size)
        // Nor shown as done.
        val detail = assertNotNull(store.issue("i1"))
        assertEquals(emptyList(), PendingOverlay.issue(detail, store.pendingWrites(), me = null).comments)

        // A later write about the same issue is not held behind it.
        queue.comment(issue(), "fine")
        queue.flush()
        assertEquals("fine", (remote.writesSent.last().body["content"] as JsonPrimitive).content)

        // Retried, it goes again from scratch; discarded, it is gone.
        assertTrue(queue.retry(poison))
        assertEquals(0, store.pendingWrites().single().attempts)
        queue.flush()
        assertEquals(WriteQueue.MAX_ATTEMPTS + 2, remote.writesSent.size)
        assertTrue(queue.undo(poison))
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aWriteOlderThanTheServersReplayWindowIsNotSentOnItsOwn() = runTest {
        // Offline for a day: the write may have reached the server before the connection went.
        val late = assertNotNull(queue.comment(issue(), "sent before the network went"))
        now += WriteQueue.REPLAY_WINDOW_MILLIS

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertTrue(remote.writesSent.isEmpty())
        val stalled = store.pendingWrites().single()
        assertTrue(stalled.stalled)
        assertTrue(stalled.tooOld(now))
        // Nor shown as done.
        val detail = assertNotNull(store.issue("i1"))
        assertEquals(emptyList(), PendingOverlay.issue(detail, store.pendingWrites(), me = null).comments)

        // A retry is refused, with why, and the text is kept; nothing is sent.
        assertFalse(queue.retry(late))
        assertTrue(remote.writesSent.isEmpty())
        assertEquals(emptyList(), store.pendingWrites())
        val refusal = store.refusals().single()
        assertEquals(WriteQueue.TOO_OLD, refusal.errorCode)
        assertEquals(WriteQueue.TOO_OLD_MESSAGE, refusal.message)
        assertEquals("sent before the network went", refusal.value)
    }

    @Test
    fun aWriteJustInsideTheWindowStillGoes() = runTest {
        queue.comment(issue(), "in time")
        now += WriteQueue.REPLAY_WINDOW_MILLIS - 1

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(1, remote.writesSent.size)
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aTooOldChangeANewerOneSupersedesIsDroppedNotStalled() = runTest {
        queue.update(issue(), IssueFields.STATUS, "done")
        now += WriteQueue.REPLAY_WINDOW_MILLIS
        // A newer value for the same field, queued before the next flush.
        val older = store.pendingWrites().single()
        store.queueWrite(older.copy(key = "newer", value = "todo", createdAtMillis = now, notBeforeMillis = now))

        queue.flush()

        assertEquals(listOf("newer"), remote.writesSent.map { it.idempotencyKey })
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aWriteTheServerIsStillDoingIsSentAgainAndGetsItsAnswer() = runTest {
        val answers = ArrayDeque<Remote<Any?>>(
            listOf(
                Remote.HttpError(409, WriteQueue.IN_FLIGHT, retryAfterMillis = 1_000, message = "still being done"),
                Remote.Ok(null),
            ),
        )
        remote.answerWrite = { answers.removeFirst() }
        val key = assertNotNull(queue.comment(issue(), "once"))

        // Again after exactly the server's Retry-After, not counted as a failure.
        assertEquals(FlushOutcome.Done(1_000), queue.flush())
        assertEquals(0, store.pendingWrites().single().attempts)
        assertEquals(emptyList(), store.refusals())
        now += 1_000
        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(listOf(key, key), remote.writesSent.map { it.idempotencyKey })
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aServerThatKeepsSayingBusyFallsBackToTheBackoff() = runTest {
        remote.answerWrite = { Remote.HttpError(503, WriteQueue.BUSY, retryAfterMillis = 1_000) }
        queue.comment(issue(), "busy")

        repeat(WriteQueue.MAX_HINTED_RETRIES) {
            assertEquals(FlushOutcome.Done(1_000), queue.flush())
            now += 1_000
        }
        // Then it counts, and waits as any failure does.
        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS), queue.flush())
        assertEquals(1, store.pendingWrites().single().attempts)
        // A hint after a counted failure is honoured again.
        now += WriteQueue.FIRST_RETRY_MILLIS
        assertEquals(FlushOutcome.Done(1_000), queue.flush())
        assertEquals(1, store.pendingWrites().single().attempts)
    }

    @Test
    fun aWriteTheServerSaysWasDoneLongAgoIsRefused() = runTest {
        remote.answerWrite = { Remote.HttpError(409, "idempotency_key_expired", message = "already done") }
        queue.comment(issue(), "late")

        queue.flush()

        assertEquals(emptyList(), store.pendingWrites())
        assertEquals("idempotency_key_expired", store.refusals().single().errorCode)
    }

    @Test
    fun aWriteThatNeverGetsAnAnswerStallsWhileTheServerAnswers() = runTest {
        // This write times out every time, but the server answers: it is not offline (CHT-1670).
        remote.answersProbe = true
        remote.answerWrite = { sent ->
            if (sent.path.startsWith("/api/issues/")) Remote.Unreachable(IOException("timeout")) else Remote.Ok(null)
        }
        val stuck = assertNotNull(queue.comment(issue(), "never gets through"))
        queue.markRead(mention)

        // It counts against the write, and the rest still goes.
        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS), queue.flush())
        assertTrue(store.inbox().single { it.id == "m1" }.read)
        assertEquals(1, store.pendingWrites().single().attempts)

        repeat(WriteQueue.MAX_ATTEMPTS - 1) {
            now += WriteQueue.MAX_RETRY_MILLIS
            queue.flush()
        }
        assertTrue(store.pendingWrites().single { it.key == stuck }.stalled)
        assertEquals(FlushOutcome.Done(null), queue.flush())
    }

    @Test
    fun aStalledChangeIsDroppedWhenANewerOneToTheSameFieldIsMade() = runTest {
        val old = assertNotNull(queue.update(issue(), IssueFields.STATUS, "done"))
        val comment = assertNotNull(queue.comment(issue(), "kept"))
        store.rescheduleWrite(old, WriteQueue.MAX_ATTEMPTS, now)
        store.rescheduleWrite(comment, WriteQueue.MAX_ATTEMPTS, now)

        // Another field, and a comment, replace nothing.
        val priority = assertNotNull(queue.update(issue(), IssueFields.PRIORITY, "high"))
        assertEquals(listOf(old, comment, priority), store.pendingWrites().map { it.key })
        val newer = assertNotNull(queue.update(issue(), IssueFields.STATUS, "todo"))

        assertEquals(listOf(comment, priority, newer), store.pendingWrites().map { it.key })
    }

    @Test
    fun aChangeThatStallsBehindANewerOneIsDroppedAndTheNewerGoes() = runTest {
        remote.answerWrite = { sent ->
            if (sent.body["status"] == JsonPrimitive("done")) Remote.HttpError(500) else Remote.Ok(null)
        }
        val old = assertNotNull(queue.update(issue(), IssueFields.STATUS, "done"))
        store.rescheduleWrite(old, WriteQueue.MAX_ATTEMPTS - 1, now)
        queue.update(issue(), IssueFields.STATUS, "todo")

        assertEquals(FlushOutcome.Done(null), queue.flush())

        assertEquals(listOf("done", "todo"), remote.writesSent.map { (it.body["status"] as JsonPrimitive).content })
        assertEquals(emptyList(), store.pendingWrites())
    }

    @Test
    fun aRetryNeverUndoesANewerChange() = runTest {
        val old = assertNotNull(queue.update(issue(), IssueFields.STATUS, "done"))
        val newer = assertNotNull(queue.update(issue(), IssueFields.STATUS, "todo"))
        store.rescheduleWrite(old, WriteQueue.MAX_ATTEMPTS, now)

        assertFalse(queue.retry(old))

        assertEquals(listOf(newer), store.pendingWrites().map { it.key })
    }

    @Test
    fun aStalledDecisionDoesNotStopANewOne() = runTest {
        remote.answerWrite = { Remote.HttpError(502) }
        val first = assertNotNull(queue.approve(gate, undoMillis = 0))
        store.rescheduleWrite(first, WriteQueue.MAX_ATTEMPTS, now)

        assertNotNull(queue.approve(gate, undoMillis = 0))
    }

    @Test
    fun retriesBackOffPerWriteAndHonourRetryAfter() = runTest {
        remote.answerWrite = { Remote.HttpError(429, retryAfterMillis = 60_000) }
        queue.comment(issue(), "hello")

        assertEquals(FlushOutcome.Done(60_000), queue.flush())

        remote.answerWrite = { Remote.HttpError(503) }
        now += 60_000
        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS * 2), queue.flush())
        now += WriteQueue.FIRST_RETRY_MILLIS * 2
        assertEquals(FlushOutcome.Done(WriteQueue.FIRST_RETRY_MILLIS * 4), queue.flush())
        assertEquals(WriteQueue.MAX_RETRY_MILLIS, WriteQueue.retryDelay(WriteQueue.MAX_ATTEMPTS, 0))
    }

    @Test
    fun offlineRetriesBackOff() = runTest {
        remote.answerWrite = { Remote.Unreachable(IOException("offline")) }
        queue.comment(issue(), "hello")

        val delays = List(3) { (queue.flush() as FlushOutcome.Retry).afterMillis }

        assertEquals(listOf(1, 2, 4).map { WriteQueue.FIRST_RETRY_MILLIS * it }, delays)
        assertEquals(0, store.pendingWrites().single().attempts)
        // Each time the server was asked whether it answers at all, and it did not.
        assertEquals(3, remote.probes)
    }

    @Test
    fun aWriteGoesOutPinnedToWhoQueuedIt() = runTest {
        queue.comment(issue(), "hello")

        queue.flush()

        assertEquals(OWNER, remote.writesSent.single().owner)
    }

    @Test
    fun aRefusedCommentKeepsItsText() = runTest {
        remote.answerWrite = { Remote.HttpError(403, message = "You no longer have access.") }
        queue.comment(issue(), "  a long thought  ")
        queue.update(issue(), IssueFields.STATUS, "done")

        queue.flush()

        assertEquals(listOf("a long thought", null), store.refusals().map { it.value })
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
            SentWrite(
                "PATCH",
                "/api/issues/i1",
                JsonObject(mapOf("status" to JsonPrimitive("in_progress"))),
                key,
                OWNER,
            ),
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

    /** A queue that records each issue it asks to have fetched again (CHT-1668). */
    private val stale = mutableListOf<Pair<String, String>>()
    private val refreshing =
        WriteQueue(remote, session, nowMillis = { now }, newKey = { "s${++keys}" }) { id, team -> stale += id to team }

    @Test
    fun aTakenCommentWhoseAnswerCannotBeReadFetchesTheIssueAgain() = runTest {
        // FakeRemote's default answer is a 2xx with nothing the app can read.
        refreshing.comment(issue(), "hello")

        assertEquals(FlushOutcome.Done(null), refreshing.flush())

        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(listOf("i1" to TEAM_A), stale)
    }

    @Test
    fun aTakenUpdateWhoseAnswerCannotBeReadFetchesTheIssueAgain() = runTest {
        refreshing.update(issue(), IssueFields.STATUS, "done")

        refreshing.flush()

        assertEquals(listOf("i1" to TEAM_A), stale)
    }

    @Test
    fun aReadableAnswerOrARefusalFetchesNothing() = runTest {
        val stored = Comment("c9", "i1", Principal("ada", "Ada"), "hello", 5)
        val updated = issue().copy(status = "done")
        remote.answerWrite = { sent -> Remote.Ok(if (sent.method == "POST") stored else updated) }
        refreshing.comment(issue(), "hello")
        refreshing.update(issue(), IssueFields.STATUS, "done")
        refreshing.flush()

        remote.answerWrite = { Remote.HttpError(409, "sprint_in_limbo") }
        refreshing.update(issue(), IssueFields.PRIORITY, "low")
        refreshing.flush()

        assertEquals(emptyList(), stale)
        assertEquals(1, store.refusals().size)
    }

    @Test
    fun anInboxActionFetchesNoIssue() = runTest {
        refreshing.approve(gate, undoMillis = 0)

        refreshing.flush()

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
