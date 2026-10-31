package sh.chaotic.sync

import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.test.runTest
import java.io.IOException
import java.util.concurrent.TimeUnit
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull
import kotlin.test.assertTrue

class CacheRefresherTest {
    private val remote = FakeRemote()
    private val store = InMemoryCacheStore()
    private var now = TimeUnit.DAYS.toMillis(100)
    private var signedIn: String? = OWNER
    private val session = CacheSession(store) { signedIn }
    private val refresher = CacheRefresher(remote, session, nowMillis = { now })

    init {
        runBlocking { store.claim(OWNER) }
    }

    private fun comment(id: String, at: Long) = Comment(
        id = id,
        issueId = "i1",
        content = "c $id",
        createdAtMillis = at,
    )

    @Test
    fun anOpenedIssueIsCachedWithItsCommentsInOrder() = runTest {
        remote.issues["i1"] = Remote.Ok(issue("i1", teamId = "ignored"))
        remote.comments = Remote.Ok(listOf(comment("c2", 20), comment("c1", 10)))

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshIssue("i1", TEAM_A))

        val cached = store.issue("i1")!!
        assertEquals(TEAM_A, cached.issue.teamId)
        assertEquals(now, cached.issue.openedAtMillis)
        assertEquals(listOf("c1", "c2"), cached.comments.map { it.id })
    }

    @Test
    fun aForbiddenIssueDropsItsTeam() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A), emptyList(), emptyList()))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        store.applyInbox(
            InboxChange(
                false,
                listOf(entry("a1"), entry("b1", teamId = TEAM_B)),
                emptySet(),
                setOf(TEAM_A, TEAM_B),
                "c1",
            ),
        )
        remote.issues["i1"] = Remote.HttpError(403)
        remote.teams = Remote.Ok(listOf(Team(TEAM_B, "B", "B")))

        assertEquals<RefreshOutcome>(RefreshOutcome.TeamLost, refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
        assertEquals(listOf(TEAM_B), store.teams().map { it.id })
        assertEquals(listOf("b1"), store.inbox().map { it.id })
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun aForbiddenIssueInATeamStillListedDropsNothing() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A, openedAtMillis = now), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(403)
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Forbidden, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(1, remote.teamCalls)
        assertEquals(listOf(TEAM_A), store.teams().map { it.id })
        assertEquals("i1", store.issue("i1")?.issue?.id)
    }

    @Test
    fun aForbiddenWithAnErrorCodeIsNotAboutTheTeam() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A, openedAtMillis = now), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(403, errorCode = "app_session_refused")

        assertEquals<RefreshOutcome>(RefreshOutcome.Forbidden, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(0, remote.teamCalls)
        assertEquals(listOf(TEAM_A), store.teams().map { it.id })
        assertEquals("i1", store.issue("i1")?.issue?.id)
    }

    @Test
    fun aForbiddenWhenTheTeamListFailsDropsNothing() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        remote.projects[TEAM_A] = Remote.HttpError(403)
        remote.teams = Remote.Unreachable(IOException("offline"))

        assertEquals<RefreshOutcome>(RefreshOutcome.Forbidden, refresher.refreshSprintCards(TEAM_A))

        assertEquals(listOf("pa"), store.sprintCards().map { it.projectId })
    }

    @Test
    fun anIssueArrivingAfterSignOutIsNotWritten() = runTest {
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        remote.onIssue = {
            // Ada signs out and Grace signs in while the issue is on its way.
            session.end()
            signedIn = OTHER_OWNER
        }

        assertEquals<RefreshOutcome>(RefreshOutcome.Unauthorized, refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
        assertNull(store.owner())
    }

    /** The queue as the app builds it: a stale issue is fetched again through this refresher. */
    private fun appQueue() =
        WriteQueue(remote, session, nowMillis = { now }, onIssueStale = refresher::refreshCachedIssue)

    private fun cache(issue: Issue) = runBlocking { store.saveIssue(IssueDetail(issue, emptyList(), emptyList())) }

    @Test
    fun anIssueAWriteLeftStaleIsFetchedAgainAndKeepsWhenItWasOpened() = runTest {
        val opened = now - TimeUnit.DAYS.toMillis(1)
        cache(issue("i1", openedAtMillis = opened))
        remote.issues["i1"] = Remote.Ok(issue("i1").copy(status = "done"))
        remote.comments = Remote.Ok(listOf(comment("c1", 10)))
        val queue = appQueue()
        // Taken, but the answer cannot be read (FakeRemote's default).
        queue.update(issue("i1"), IssueFields.STATUS, "done")

        assertEquals(FlushOutcome.Done(null), queue.flush())

        val cached = store.issue("i1")!!
        assertEquals("done", cached.issue.status)
        assertEquals(TEAM_A, cached.issue.teamId)
        assertEquals(opened, cached.issue.openedAtMillis)
        assertEquals(listOf("c1"), cached.comments.map { it.id })
    }

    @Test
    fun anIssueThatIsNotCachedIsNotFetchedForAWrite() = runTest {
        var calls = 0
        remote.onIssue = { calls++ }

        assertEquals<RefreshOutcome>(RefreshOutcome.Fresh, refresher.refreshCachedIssue("i1"))

        assertEquals(0, calls)
        assertNull(store.issue("i1"))
    }

    @Test
    fun anIssueDroppedDuringItsFetchIsNotPutBack() = runTest {
        cache(issue("i1", openedAtMillis = now))
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        remote.onIssue = { store.deleteIssue("i1") }

        assertEquals<RefreshOutcome>(RefreshOutcome.Fresh, refresher.refreshCachedIssue("i1"))

        assertNull(store.issue("i1"))
    }

    @Test
    fun aFetchOvertakenByATakenWriteIsMadeAgain() = runTest {
        cache(issue("i1", openedAtMillis = now))
        val queue = appQueue()
        val done = issue("i1").copy(status = "done")
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        var calls = 0
        remote.onIssue = {
            if (calls++ == 0) {
                // The person's status change is taken while the old issue is on its way back,
                // and its answer is unreadable, so the queue fetches the issue too.
                queue.update(issue("i1"), IssueFields.STATUS, "done")
                queue.flush()
            } else {
                remote.issues["i1"] = Remote.Ok(done)
            }
        }

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(3, calls) // the first fetch, the queue's, and this refresh's second
        assertEquals("done", store.issue("i1")!!.issue.status)
    }

    @Test
    fun anIssueWhoseWritesKeepOvertakingItsFetchesKeepsWhatTheyAnswered() = runTest {
        cache(issue("i1", openedAtMillis = now).copy(status = "done"))
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        var calls = 0
        remote.onIssue = {
            calls++
            session.write(session.begin()!!) { session.issueWritten("i1") }
        }

        // Not a failure: what is cached is newer than every fetch.
        assertEquals<RefreshOutcome>(RefreshOutcome.Fresh, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(CacheRefresher.MAX_ISSUE_FETCHES, calls)
        assertEquals("done", store.issue("i1")!!.issue.status)
    }

    @Test
    fun anUncachedIssueWhoseWritesOvertakeEveryFetchIsAFailure() = runTest {
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        remote.onIssue = { session.write(session.begin()!!) { session.issueWritten("i1") } }

        // Opened for the first time: nothing cached to show, so not "done".
        assertEquals<RefreshOutcome>(RefreshOutcome.Failed(), refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
    }

    @Test
    fun aWriteToAnotherIssueDoesNotOutdateTheFetch() = runTest {
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        var calls = 0
        remote.onIssue = {
            calls++
            session.write(session.begin()!!) { session.issueWritten("i2") }
        }

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(1, calls)
    }

    @Test
    fun aRefreshWhileSignedOutDoesNothing() = runTest {
        signedIn = null

        assertEquals<RefreshOutcome>(RefreshOutcome.Unauthorized, refresher.refreshTeams())
        assertEquals(0, remote.teamCalls)
    }

    @Test
    fun theTeamListIsNotFetchedAgainWhileFresh() = runTest {
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshTeams())
        now += CacheRefresher.DEFAULT_TEAMS_MAX_AGE_MILLIS - 1
        assertEquals<RefreshOutcome>(RefreshOutcome.Fresh, refresher.refreshTeams())
        assertEquals(1, remote.teamCalls)

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshTeams(force = true))
        now += CacheRefresher.DEFAULT_TEAMS_MAX_AGE_MILLIS
        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshTeams())
        assertEquals(3, remote.teamCalls)
    }

    @Test
    fun sprintCardsAreNotFetchedAgainWhileFreshAndAFailureIsNotRemembered() = runTest {
        remote.projects[TEAM_A] = Remote.HttpError(502)
        assertEquals<RefreshOutcome>(RefreshOutcome.Failed(502), refresher.refreshSprintCards(TEAM_A))

        remote.projects[TEAM_A] = Remote.Ok(listOf(Project("p1", TEAM_A, "Web", "WEB")))
        remote.sprints["p1"] = Remote.Ok(CurrentSprint("s1", "p1", "Sprint 4", 20, 5, false))
        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_A))
        assertEquals<RefreshOutcome>(RefreshOutcome.Fresh, refresher.refreshSprintCards(TEAM_A))
        assertEquals(2, remote.projectCalls)

        // Per team: another team's cards are still fetched.
        remote.projects[TEAM_B] = Remote.Ok(emptyList())
        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_B))
        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_A, force = true))
        now += CacheRefresher.DEFAULT_CARDS_MAX_AGE_MILLIS
        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_A))
        assertEquals(5, remote.projectCalls)
    }

    @Test
    fun freshnessDoesNotCarryIntoTheNextPersonsSession() = runTest {
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))
        refresher.refreshTeams()

        session.end()
        signedIn = OTHER_OWNER

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshTeams())
        assertEquals(2, remote.teamCalls)
        assertEquals(OTHER_OWNER, store.owner())
    }

    @Test
    fun aDeletedIssueIsRemoved() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1"), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(404)
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i1", TEAM_A))
        assertNull(store.issue("i1"))
        assertEquals(listOf(TEAM_A), store.teams().map { it.id })
    }

    @Test
    fun aNotFoundIssueOfATeamNoLongerListedDropsTheTeam() = runTest {
        // Out of scope answers 404 like deleted (CHT-1785): leaving the team now looks like this.
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A), emptyList(), emptyList()))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        remote.issues["i1"] = Remote.HttpError(404)
        remote.teams = Remote.Ok(listOf(Team(TEAM_B, "B", "B")))

        assertEquals<RefreshOutcome>(RefreshOutcome.TeamLost, refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
        assertEquals(listOf(TEAM_B), store.teams().map { it.id })
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun aNotFoundTeamsProjectsDropTheTeamWhenItIsNoLongerListed() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        remote.projects[TEAM_A] = Remote.HttpError(404)
        remote.teams = Remote.Ok(listOf(Team(TEAM_B, "B", "B")))

        assertEquals<RefreshOutcome>(RefreshOutcome.TeamLost, refresher.refreshSprintCards(TEAM_A))

        assertEquals(listOf(TEAM_B), store.teams().map { it.id })
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun aRunOfNotFoundsAsksForTheTeamListOnce() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A), emptyList(), emptyList()))
        store.saveIssue(IssueDetail(issue("i2", TEAM_A), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(404)
        remote.issues["i2"] = Remote.HttpError(404)
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i1", TEAM_A))
        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i2", TEAM_A))

        assertEquals(1, remote.teamCalls)
        now += CacheRefresher.TEAMS_RECHECK_MILLIS
        remote.issues["i3"] = Remote.HttpError(404)
        refresher.refreshIssue("i3", TEAM_A)
        assertEquals(2, remote.teamCalls)
    }

    @Test
    fun aNotFoundWithAnErrorCodeIsNotAboutTheTeam() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(404, errorCode = "issue_deleted")

        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i1", TEAM_A))

        assertEquals(0, remote.teamCalls)
    }

    @Test
    fun aNotFoundIssueWhenTheTeamListFailsDropsOnlyTheIssue() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.saveIssue(IssueDetail(issue("i1", TEAM_A), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(404)
        remote.teams = Remote.Unreachable(IOException("offline"))

        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
        assertEquals(listOf(TEAM_A), store.teams().map { it.id })
    }

    @Test
    fun offlineKeepsTheCachedIssue() = runTest {
        store.saveIssue(IssueDetail(issue("i1", openedAtMillis = now), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.Unreachable(IOException("offline"))

        assertEquals<RefreshOutcome>(RefreshOutcome.Failed(), refresher.refreshIssue("i1", TEAM_A))
        assertEquals("i1", store.issue("i1")?.issue?.id)
    }

    @Test
    fun aFailedCommentsCallSavesNothing() = runTest {
        remote.issues["i1"] = Remote.Ok(issue("i1"))
        remote.comments = Remote.HttpError(500)

        assertEquals<RefreshOutcome>(RefreshOutcome.Failed(500), refresher.refreshIssue("i1", TEAM_A))
        assertNull(store.issue("i1"))
    }

    @Test
    fun issuesNotOpenedForAWeekArePruned() = runTest {
        val eightDaysAgo = now - TimeUnit.DAYS.toMillis(8)
        val sixDaysAgo = now - TimeUnit.DAYS.toMillis(6)
        store.saveIssue(IssueDetail(issue("old", openedAtMillis = eightDaysAgo), emptyList(), emptyList()))
        store.saveIssue(IssueDetail(issue("recent", openedAtMillis = sixDaysAgo), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.Ok(issue("i1"))

        refresher.refreshIssue("i1", TEAM_A)

        assertNull(store.issue("old"))
        assertEquals("recent", store.issue("recent")?.issue?.id)
    }

    @Test
    fun teamsRefreshAlsoPrunesStaleIssues() = runTest {
        store.saveIssue(
            IssueDetail(issue("old", openedAtMillis = now - TimeUnit.DAYS.toMillis(8)), emptyList(), emptyList()),
        )
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A", "A")))

        refresher.refreshTeams()

        assertNull(store.issue("old"))
    }

    @Test
    fun teamsRefreshReplacesTheListAndPrunesLeftTeams() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A"), Team(TEAM_B, "B", "B")))
        store.saveIssue(IssueDetail(issue("ib", TEAM_B), emptyList(), emptyList()))
        remote.teams = Remote.Ok(listOf(Team(TEAM_A, "A renamed", "A")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshTeams())

        assertEquals(listOf(Team(TEAM_A, "A renamed", "A")), store.teams())
        assertNull(store.issue("ib"))
    }

    @Test
    fun sprintCardsCarryLimboRitualNames() = runTest {
        remote.projects[TEAM_A] = Remote.Ok(
            listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "App", "APP")),
        )
        remote.sprints["p1"] = Remote.Ok(
            CurrentSprint("s1", "p1", "Sprint 4", budget = 20, pointsSpent = 25, limbo = false),
        )
        remote.sprints["p2"] = Remote.Ok(
            CurrentSprint("s2", "p2", "Sprint 9", budget = null, pointsSpent = 3, limbo = true),
        )
        remote.limbos["p2"] = Remote.Ok(LimboInfo(inLimbo = true, pendingRituals = listOf("retro", "demo")))

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_A))

        val cards = store.sprintCards().associateBy { it.projectId }
        assertEquals(25, cards.getValue("p1").pointsSpent)
        assertEquals(emptyList(), cards.getValue("p1").pendingRituals)
        assertEquals(listOf("retro", "demo"), cards.getValue("p2").pendingRituals)
        assertEquals("Web", cards.getValue("p1").projectName)
    }

    @Test
    fun sprintCardsReplaceOnlyThatTeamsCards() = runTest {
        store.replaceSprintCards(TEAM_A, listOf(card("gone")))
        store.replaceSprintCards(TEAM_B, listOf(card("pb", TEAM_B)))
        remote.projects[TEAM_A] = Remote.Ok(listOf(Project("p1", TEAM_A, "Web", "WEB")))
        remote.sprints["p1"] = Remote.Ok(CurrentSprint("s1", "p1", "Sprint 4", 20, 5, false))

        refresher.refreshSprintCards(TEAM_A)

        assertEquals(setOf("p1", "pb"), store.sprintCards().map { it.projectId }.toSet())
    }

    @Test
    fun aProjectDeletedMidRefreshIsSkipped() = runTest {
        remote.projects[TEAM_A] = Remote.Ok(
            listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "Gone", "GONE")),
        )
        remote.sprints["p1"] = Remote.Ok(CurrentSprint("s1", "p1", "Sprint 4", 20, 5, false))

        assertEquals<RefreshOutcome>(RefreshOutcome.Refreshed, refresher.refreshSprintCards(TEAM_A))
        assertEquals(listOf("p1"), store.sprintCards().map { it.projectId })
    }

    @Test
    fun aForbiddenTeamDropsItsCards() = runTest {
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))
        remote.projects[TEAM_A] = Remote.HttpError(403)

        assertEquals<RefreshOutcome>(RefreshOutcome.TeamLost, refresher.refreshSprintCards(TEAM_A))
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun aSprintFailureKeepsTheCardsCached() = runTest {
        store.replaceSprintCards(TEAM_A, listOf(card("p1", spent = 1)))
        remote.projects[TEAM_A] = Remote.Ok(
            listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "App", "APP")),
        )
        remote.sprints["p1"] = Remote.Ok(CurrentSprint("s1", "p1", "Sprint 4", 20, 5, false))
        remote.sprints["p2"] = Remote.HttpError(502)

        assertEquals<RefreshOutcome>(RefreshOutcome.Failed(502), refresher.refreshSprintCards(TEAM_A))
        assertEquals(1, store.sprintCards().single().pointsSpent)
    }

    @Test
    fun unauthorizedIsReportedAndChangesNothing() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        remote.teams = Remote.HttpError(401)

        assertEquals<RefreshOutcome>(RefreshOutcome.Unauthorized, refresher.refreshTeams())
        assertEquals(1, store.teams().size)
    }

    @Test
    fun signOutClearsEverything() = runTest {
        store.replaceTeams(listOf(Team(TEAM_A, "A", "A")))
        store.applyInbox(InboxChange(false, listOf(entry("a1")), emptySet(), setOf(TEAM_A), "c1"))
        store.saveIssue(IssueDetail(issue("i1"), emptyList(), emptyList()))
        store.replaceSprintCards(TEAM_A, listOf(card("pa")))

        session.end()

        assertTrue(store.inbox().isEmpty() && store.teams().isEmpty() && store.sprintCards().isEmpty())
        assertNull(store.issue("i1"))
        assertNull(store.inboxCursor())
        assertNull(store.owner())
    }
}
