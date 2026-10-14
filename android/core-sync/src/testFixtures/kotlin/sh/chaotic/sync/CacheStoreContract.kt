package sh.chaotic.sync

import kotlinx.coroutines.test.runTest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * What every [CacheStore] must do. core-sync runs it against
 * [InMemoryCacheStore]; :app runs it against the Room store, so the two
 * cannot drift.
 */
abstract class CacheStoreContract {
    /** A new, empty store for one test. */
    protected abstract fun createStore(): CacheStore

    private fun detail(issue: Issue, vararg comments: Comment, activity: List<Activity> = emptyList()) =
        IssueDetail(issue, comments.toList(), activity)

    private fun comment(id: String, issueId: String, at: Long) = Comment(
        id = id,
        issueId = issueId,
        author = Principal("u1", "Ada"),
        content = "comment $id",
        createdAtMillis = at,
    )

    private fun change(
        upserts: List<InboxEntry> = emptyList(),
        deletes: Set<String> = emptySet(),
        clear: Boolean = false,
        teams: Set<String> = setOf(TEAM_A, TEAM_B),
        cursor: String? = "c",
    ) = InboxChange(clear = clear, upserts = upserts, deletes = deletes, teamIds = teams, cursor = cursor)

    @Test
    fun anEmptyStoreHasNothing() = runTest {
        val store = createStore()

        assertEquals(CacheSnapshot(null, emptyList(), emptyList(), emptyList(), emptyList()), store.snapshot())
        assertEquals(emptyMap(), store.inboxVersions(listOf("x")))
    }

    @Test
    fun applyInboxUpsertsEveryFieldAndStoresTheCursor() = runTest {
        val store = createStore()
        val full = entry("e1", 5_000).copy(
            body = "body",
            projectId = "p1",
            issueId = "i1",
            issueIdentifier = "CHT-1",
            documentId = "d1",
            documentTitle = "Doc",
            source = Principal("a1", "Claude", isAgent = true, ownerName = "ethan"),
            read = true,
            actions = listOf(
                InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
                InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
                InboxAction(InboxAction.ARCHIVE, "/api/inbox/e1/archive"),
            ),
        )
        val bare = entry("e2", 6_000)

        store.applyInbox(change(upserts = listOf(full, bare), cursor = "c1"))

        assertEquals(listOf(full, bare), store.snapshot().inbox)
        assertEquals("c1", store.inboxCursor())
        assertEquals(mapOf("e1" to 5_000L, "e2" to 6_000L), store.inboxVersions(listOf("e1", "e2", "nope")))
    }

    @Test
    fun applyInboxReplacesById() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("e1", 1_000))))

        store.applyInbox(change(upserts = listOf(entry("e1", 2_000).copy(title = "New"))))

        assertEquals(listOf("New"), store.snapshot().inbox.map { it.title })
    }

    @Test
    fun applyInboxClearsThenDeletesThenUpserts() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("old"), entry("gone"))))

        store.applyInbox(change(upserts = listOf(entry("new")), deletes = setOf("gone", "new"), clear = true))

        // Deletes come before upserts, so an id in both is kept.
        assertEquals(listOf("new"), store.snapshot().inbox.map { it.id })
    }

    @Test
    fun applyInboxDeletesTombstones() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("e1"), entry("e2"))))

        store.applyInbox(change(deletes = setOf("e1")))

        assertEquals(listOf("e2"), store.snapshot().inbox.map { it.id })
    }

    @Test
    fun aNullCursorClearsIt() = runTest {
        val store = createStore()
        store.applyInbox(change(cursor = "c1"))

        store.applyInbox(change(cursor = null))

        assertNull(store.inboxCursor())
    }

    @Test
    fun applyInboxDropsEveryTableOfATeamNotListed() = runTest {
        val store = createStore()
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.saveIssue(detail(issue("ia", TEAM_A), comment("ca", "ia", 1)))
        store.saveIssue(detail(issue("ib", TEAM_B), comment("cb", "ib", 1)))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        store.replaceSprintCards(TEAM_B, listOf(card("pb", TEAM_B)))
        store.applyInbox(change(upserts = listOf(entry("a1"), entry("b1", teamId = TEAM_B))))

        store.applyInbox(change(teams = setOf(TEAM_A)))

        val snapshot = store.snapshot()
        assertEquals(listOf("a1"), snapshot.inbox.map { it.id })
        assertEquals(listOf(TEAM_A), snapshot.teams.map { it.id })
        assertEquals(listOf("ia"), snapshot.issues.map { it.issue.id })
        assertEquals(listOf("ca"), snapshot.issues.single().comments.map { it.id })
        assertEquals(listOf("pa"), snapshot.sprintCards.map { it.projectId })
    }

    @Test
    fun anEmptyTeamListDropsEverything() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("a1"))))
        store.saveIssue(detail(issue("ia")))

        store.applyInbox(change(teams = emptySet()))

        assertTrue(store.snapshot().inbox.isEmpty())
        assertTrue(store.snapshot().issues.isEmpty())
    }

    @Test
    fun replaceTeamsReplacesAndPrunes() = runTest {
        val store = createStore()
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.applyInbox(change(upserts = listOf(entry("a1"), entry("b1", teamId = TEAM_B))))

        store.replaceTeams(listOf(Team(TEAM_B, "B2", "B")))

        assertEquals(listOf(Team(TEAM_B, "B2", "B")), store.snapshot().teams)
        assertEquals(listOf("b1"), store.snapshot().inbox.map { it.id })
    }

    @Test
    fun dropTeamDropsOnlyThatTeam() = runTest {
        val store = createStore()
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.applyInbox(change(upserts = listOf(entry("a1"), entry("b1", teamId = TEAM_B)), cursor = "c1"))
        store.saveIssue(detail(issue("ia", TEAM_A), comment("ca", "ia", 1)))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        store.replaceSprintCards(TEAM_B, listOf(card("pb", TEAM_B)))

        store.dropTeam(TEAM_A)

        val snapshot = store.snapshot()
        assertEquals(listOf("b1"), snapshot.inbox.map { it.id })
        assertEquals(listOf(TEAM_B), snapshot.teams.map { it.id })
        assertTrue(snapshot.issues.isEmpty())
        assertEquals(listOf("pb"), snapshot.sprintCards.map { it.projectId })
        // The cursor stays: the next sync's team digest resets it if it must.
        assertEquals("c1", snapshot.cursor)
    }

    @Test
    fun saveIssueReplacesItsCommentsAndActivity() = runTest {
        val store = createStore()
        val activity = Activity(
            id = "a1",
            issueId = "i1",
            type = "status_changed",
            field = "status",
            oldValue = "todo",
            newValue = "done",
            actor = Principal("u1", "Ada"),
            createdAtMillis = 3,
        )
        store.saveIssue(
            detail(issue("i1"), comment("c1", "i1", 1), comment("c2", "i1", 2), activity = listOf(activity)),
        )

        val updated = issue("i1").copy(title = "Retitled", description = "**md**", estimate = 3)
        store.saveIssue(detail(updated, comment("c2", "i1", 2), comment("c3", "i1", 4)))

        val saved = store.snapshot().issues.single()
        assertEquals(updated, saved.issue)
        assertEquals(listOf("c2", "c3"), saved.comments.map { it.id })
        assertEquals(Principal("u1", "Ada"), saved.comments.first().author)
        assertTrue(saved.activity.isEmpty())

        store.saveIssue(detail(updated, activity = listOf(activity)))
        assertEquals(listOf(activity), store.snapshot().issues.single().activity)
    }

    @Test
    fun deleteIssueTakesItsCommentsAlong() = runTest {
        val store = createStore()
        store.saveIssue(detail(issue("i1"), comment("c1", "i1", 1)))
        store.saveIssue(detail(issue("i2"), comment("c2", "i2", 1)))

        store.deleteIssue("i1")

        assertEquals(listOf("i2"), store.snapshot().issues.map { it.issue.id })
        assertEquals(listOf("c2"), store.snapshot().issues.single().comments.map { it.id })
    }

    @Test
    fun pruneDropsIssuesOpenedBeforeTheCutoff() = runTest {
        val store = createStore()
        store.saveIssue(detail(issue("old", openedAtMillis = 99), comment("c1", "old", 1)))
        store.saveIssue(detail(issue("edge", openedAtMillis = 100)))
        store.saveIssue(detail(issue("new", openedAtMillis = 101)))

        store.pruneIssuesOpenedBefore(100)

        assertEquals(listOf("edge", "new"), store.snapshot().issues.map { it.issue.id })
    }

    @Test
    fun replaceSprintCardsIsPerTeam() = runTest {
        val store = createStore()
        store.replaceSprintCards(TEAM_A, listOf(card("p1"), card("p2")))
        store.replaceSprintCards(TEAM_B, listOf(card("p3", TEAM_B)))
        val limbo = card("p4", limbo = true, budget = null).copy(pendingRituals = listOf("retro", "demo"))

        store.replaceSprintCards(TEAM_A, listOf(limbo))

        assertEquals(listOf(card("p3", TEAM_B), limbo), store.snapshot().sprintCards)
    }

    @Test
    fun clearAllEmptiesEverything() = runTest {
        val store = createStore()
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.applyInbox(change(upserts = listOf(entry("a1")), cursor = "c1"))
        store.saveIssue(detail(issue("i1"), comment("c1", "i1", 1)))
        store.replaceSprintCards(TEAM_A, listOf(card("p1")))
        store.queueWrite(write("w1"))
        store.queueWrite(write("w2"))
        store.refuseWrite(refusal("w2"))

        store.clearAll()

        assertEquals(CacheSnapshot(null, emptyList(), emptyList(), emptyList(), emptyList()), store.snapshot())
    }

    @Test
    fun claimKeepsTheCacheOfTheSameOwner() = runTest {
        val store = createStore()
        store.claim(OWNER)
        store.applyInbox(change(upserts = listOf(entry("a1")), cursor = "c1"))

        store.claim(OWNER)

        assertEquals(OWNER, store.owner())
        assertEquals("c1", store.inboxCursor())
        assertEquals(listOf("a1"), store.snapshot().inbox.map { it.id })
    }

    @Test
    fun claimByAnotherOwnerEmptiesEverythingFirst() = runTest {
        val store = createStore()
        store.claim(OWNER)
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.applyInbox(change(upserts = listOf(entry("a1")), cursor = "c1"))
        store.saveIssue(detail(issue("i1"), comment("c1", "i1", 1)))
        store.replaceSprintCards(TEAM_A, listOf(card("p1")))
        store.queueWrite(write("w1"))
        store.queueWrite(write("w2"))
        store.refuseWrite(refusal("w2"))

        store.claim(OTHER_OWNER)

        assertEquals(OTHER_OWNER, store.owner())
        assertEquals(CacheSnapshot(null, emptyList(), emptyList(), emptyList(), emptyList()), store.snapshot())
    }

    @Test
    fun anUnclaimedCacheIsEmptiedByTheFirstClaim() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("a1")), cursor = "c1"))

        store.claim(OWNER)

        assertTrue(store.snapshot().inbox.isEmpty())
        assertNull(store.inboxCursor())
    }

    @Test
    fun clearAllForgetsTheOwner() = runTest {
        val store = createStore()
        store.claim(OWNER)

        store.clearAll()

        assertNull(store.owner())
    }

    private fun write(key: String, kind: WriteKind = WriteKind.COMMENT, at: Long = 1) = PendingWrite(
        key = key,
        kind = kind,
        path = "/api/inbox/e1/read",
        entryId = "e1",
        issueId = "i1",
        teamId = TEAM_A,
        field = IssueFields.ASSIGNEE,
        value = "value $key",
        valueLabel = "Grace",
        label = "CHT-1",
        createdAtMillis = at,
        notBeforeMillis = at + 4_000,
        attempts = 2,
    )

    private fun refusal(key: String, at: Long = 1) = WriteRefusal(
        key = key,
        kind = WriteKind.UPDATE_ISSUE,
        label = "CHT-1",
        status = 409,
        errorCode = "sprint_in_arrears",
        message = "Sprint is in arrears.",
        entryId = "e1",
        issueId = "i1",
        atMillis = at,
        value = "what was written",
    )

    @Test
    fun writesKeepEveryFieldAndTheOrderTheyWereQueuedIn() = runTest {
        val store = createStore()
        val bare = PendingWrite(
            key = "w0",
            kind = WriteKind.UPDATE_ISSUE,
            label = "CHT-2",
            createdAtMillis = 9,
            notBeforeMillis = 9,
        )
        // Queued later but made earlier: the queue's order is the order of queueing.
        store.queueWrite(write("w2", at = 5))
        store.queueWrite(write("w1", WriteKind.REJECT, at = 3))
        store.queueWrite(bare)

        assertEquals(listOf(write("w2", at = 5), write("w1", WriteKind.REJECT, at = 3), bare), store.pendingWrites())
        assertEquals(store.pendingWrites(), store.snapshot().writes)
    }

    @Test
    fun rescheduleWriteKeepsItsPlaceInTheQueue() = runTest {
        val store = createStore()
        listOf("w1", "w2", "w3").forEach { store.queueWrite(write(it)) }

        assertTrue(store.rescheduleWrite("w2", attempts = 7, notBeforeMillis = 99))
        assertEquals(false, store.rescheduleWrite("nope", attempts = 1, notBeforeMillis = 1))

        assertEquals(
            listOf(write("w1"), write("w2").copy(attempts = 7, notBeforeMillis = 99), write("w3")),
            store.pendingWrites(),
        )
    }

    @Test
    fun removeWriteSaysWhetherItWasThere() = runTest {
        val store = createStore()
        store.queueWrite(write("w1"))
        store.queueWrite(write("w2"))

        assertTrue(store.removeWrite("w1"))
        assertEquals(false, store.removeWrite("w1"))
        assertEquals(listOf("w2"), store.pendingWrites().map { it.key })
    }

    @Test
    fun completeWriteDropsItAndAppliesItsEffect() = runTest {
        val store = createStore()
        store.applyInbox(change(upserts = listOf(entry("e1"), entry("e2"), entry("e3"))))
        val opened = issue("i1", openedAtMillis = 77)
        store.saveIssue(detail(opened, comment("c1", "i1", 1), comment("c3", "i1", 3)))
        listOf("w1", "w2", "w3", "w4", "w5").forEach { store.queueWrite(write(it)) }

        store.completeWrite("w1", WriteEffect.DropEntry("e1"))
        store.completeWrite("w2", WriteEffect.MarkRead("e2"))
        store.completeWrite("w3", WriteEffect.AddComment(comment("c2", "i1", 2)))
        // As the server answers: it knows nothing of when this device opened the issue.
        store.completeWrite("w4", WriteEffect.UpdateIssue(opened.copy(status = "done", openedAtMillis = 0)))
        store.completeWrite("w5", effect = null)

        val snapshot = store.snapshot()
        assertEquals(emptyList(), snapshot.writes)
        assertEquals(listOf("e2" to true, "e3" to false), snapshot.inbox.map { it.id to it.read })
        val saved = snapshot.issues.single()
        assertEquals(listOf("c1", "c2", "c3"), saved.comments.map { it.id })
        assertEquals("done", saved.issue.status)
        assertEquals(77, saved.issue.openedAtMillis)
    }

    @Test
    fun anEffectOnSomethingNotCachedChangesNothing() = runTest {
        val store = createStore()
        store.queueWrite(write("w1"))
        store.queueWrite(write("w2"))
        store.queueWrite(write("w3"))

        store.completeWrite("w1", WriteEffect.MarkRead("nope"))
        store.completeWrite("w2", WriteEffect.AddComment(comment("c1", "nope", 1)))
        store.completeWrite("w3", WriteEffect.UpdateIssue(issue("nope")))

        assertEquals(CacheSnapshot(null, emptyList(), emptyList(), emptyList(), emptyList()), store.snapshot())
    }

    @Test
    fun refuseWriteDropsItAndKeepsTheRefusalUntilDismissed() = runTest {
        val store = createStore()
        store.queueWrite(write("w1"))
        store.queueWrite(write("w2"))
        val bare = WriteRefusal(key = "w2", kind = WriteKind.APPROVE, label = "CHT-2", status = 403, atMillis = 2)

        store.refuseWrite(refusal("w1"))
        store.refuseWrite(bare)

        assertEquals(emptyList(), store.pendingWrites())
        assertEquals(listOf(refusal("w1"), bare), store.refusals())
        assertEquals(store.refusals(), store.snapshot().refusals)

        store.dismissRefusal("w1")
        assertEquals(listOf(bare), store.refusals())
    }

    @Test
    fun onlyTheNewestRefusalsAreKept() = runTest {
        val store = createStore()

        repeat(WriteQueue.MAX_REFUSALS + 3) { store.refuseWrite(refusal("r$it", at = it.toLong())) }

        val kept = store.refusals()
        assertEquals(WriteQueue.MAX_REFUSALS, kept.size)
        assertEquals("r3", kept.first().key)
        assertEquals("r${WriteQueue.MAX_REFUSALS + 2}", kept.last().key)
    }
}
