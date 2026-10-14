package sh.chaotic.sync

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
    private val refresher = CacheRefresher(remote, store, nowMillis = { now })

    private fun comment(id: String, at: Long) = Comment(id = id, issueId = "i1", content = "c $id", createdAtMillis = at)

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
        store.applyInbox(InboxChange(false, listOf(entry("a1"), entry("b1", teamId = TEAM_B)), emptySet(), setOf(TEAM_A, TEAM_B), "c1"))
        remote.issues["i1"] = Remote.HttpError(403)

        assertEquals<RefreshOutcome>(RefreshOutcome.TeamLost, refresher.refreshIssue("i1", TEAM_A))

        assertNull(store.issue("i1"))
        assertEquals(listOf(TEAM_B), store.teams().map { it.id })
        assertEquals(listOf("b1"), store.inbox().map { it.id })
        assertTrue(store.sprintCards().isEmpty())
    }

    @Test
    fun aDeletedIssueIsRemoved() = runTest {
        store.saveIssue(IssueDetail(issue("i1"), emptyList(), emptyList()))
        remote.issues["i1"] = Remote.HttpError(404)

        assertEquals<RefreshOutcome>(RefreshOutcome.Gone, refresher.refreshIssue("i1", TEAM_A))
        assertNull(store.issue("i1"))
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
        remote.projects[TEAM_A] = Remote.Ok(listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "App", "APP")))
        remote.sprints["p1"] = Remote.Ok(CurrentSprint("s1", "p1", "Sprint 4", budget = 20, pointsSpent = 25, limbo = false))
        remote.sprints["p2"] = Remote.Ok(CurrentSprint("s2", "p2", "Sprint 9", budget = null, pointsSpent = 3, limbo = true))
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
        remote.projects[TEAM_A] = Remote.Ok(listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "Gone", "GONE")))
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
        remote.projects[TEAM_A] = Remote.Ok(listOf(Project("p1", TEAM_A, "Web", "WEB"), Project("p2", TEAM_A, "App", "APP")))
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

        store.clearAll()

        assertTrue(store.inbox().isEmpty() && store.teams().isEmpty() && store.sprintCards().isEmpty())
        assertNull(store.issue("i1"))
        assertNull(store.inboxCursor())
    }
}
