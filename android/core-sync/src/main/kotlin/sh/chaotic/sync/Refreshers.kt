package sh.chaotic.sync

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.TimeUnit

/** How a refresh of something other than the inbox ended. */
sealed interface RefreshOutcome {
    data object Refreshed : RefreshOutcome

    /** What is cached was fetched recently enough; nothing was asked of the server. */
    data object Fresh : RefreshOutcome

    /** The server says it is gone (404): it was removed from the cache. */
    data object Gone : RefreshOutcome

    /** The person is no longer in the team (the team list says so): everything cached for it was dropped. */
    data object TeamLost : RefreshOutcome

    /** A 403 for this read while the person is still in the team (or it could not be told): nothing was dropped. */
    data object Forbidden : RefreshOutcome

    /** Nobody is signed in any more (a 401, or a sign-out during the refresh): nothing was written. */
    data object Unauthorized : RefreshOutcome

    /** Nothing changed in the cache: offline, an unreadable answer, a server error. */
    data class Failed(val status: Int? = null) : RefreshOutcome
}

/**
 * Refreshes of the parts of the cache the inbox sync does not cover: the
 * team list, an opened issue, and each project's current sprint card.
 *
 * The session is account-wide, so these are per team. A 403 can mean the
 * person left the team, but not only that (a refused app session, a
 * scope), and a membership 403 carries no error code to tell them apart.
 * So a 403 with no code is followed by a team-list refresh, and a team is
 * dropped only when that list no longer has it.
 *
 * Every write goes through [session], so a refresh that finishes after a
 * sign-out writes nothing. The team list and the sprint cards are not
 * fetched again within [teamsMaxAgeMillis] and [cardsMaxAgeMillis] of the
 * last fetch unless forced (a pull to refresh): coming back to the home
 * screen, or flicking between tabs, does not repeat the requests.
 */
class CacheRefresher(
    private val remote: ChaoticRemote,
    private val session: CacheSession,
    private val nowMillis: () -> Long = System::currentTimeMillis,
    /** Current-sprint requests in flight at once, for a team with many projects. */
    private val parallelism: Int = DEFAULT_PARALLELISM,
    private val teamsMaxAgeMillis: Long = DEFAULT_TEAMS_MAX_AGE_MILLIS,
    private val cardsMaxAgeMillis: Long = DEFAULT_CARDS_MAX_AGE_MILLIS,
) {
    /** When each key was last fetched, and in which session generation. */
    private val fetched = ConcurrentHashMap<String, Pair<Long, Long>>()

    /**
     * The team list, which also prunes every left team's cache, and drops
     * issues not opened for [ISSUE_RETENTION_DAYS] (it runs when the app
     * comes to the foreground, even when no issue is opened).
     */
    @Suppress("ReturnCount") // signed out, fresh, and the answer each end the refresh
    suspend fun refreshTeams(force: Boolean = false): RefreshOutcome {
        val ticket = session.begin() ?: return RefreshOutcome.Unauthorized
        session.write(ticket) { pruneIssues() } ?: return RefreshOutcome.Unauthorized
        if (!force && isFresh(TEAMS_KEY, ticket, teamsMaxAgeMillis)) return RefreshOutcome.Fresh
        return when (val teams = remote.teams()) {
            is Remote.Ok -> written(ticket, TEAMS_KEY) { replaceTeams(teams.value) }
            is Remote.Failure -> failure(ticket, teams, teamId = null)
        }
    }

    /**
     * Fetch [issueId] with its comments and activity, as known in [teamId],
     * and keep it as opened now. Issues not opened for [ISSUE_RETENTION_DAYS]
     * are pruned on the way.
     */
    @Suppress("ReturnCount") // a failure of any of the three calls ends the refresh
    suspend fun refreshIssue(issueId: String, teamId: String): RefreshOutcome {
        val ticket = session.begin() ?: return RefreshOutcome.Unauthorized
        val now = nowMillis()
        session.write(ticket) { pruneIssues() } ?: return RefreshOutcome.Unauthorized
        val issue = remote.issue(issueId, teamId)
        if (issue !is Remote.Ok) return failure(ticket, issue, teamId, issueId)
        val comments = remote.comments(issueId)
        if (comments !is Remote.Ok) return failure(ticket, comments, teamId, issueId)
        val activity = remote.activity(issueId)
        if (activity !is Remote.Ok) return failure(ticket, activity, teamId, issueId)
        val detail = IssueDetail(
            issue = issue.value.copy(openedAtMillis = now),
            comments = comments.value.sortedBy { it.createdAtMillis },
            activity = activity.value.sortedBy { it.createdAtMillis },
        )
        return written(ticket, key = null) { saveIssue(detail) }
    }

    /**
     * The current sprint card of every project in [teamId]. A project
     * whose sprint is in limbo also gets the names of the rituals it waits
     * on. All or nothing: a failure part-way keeps the cards already
     * cached.
     */
    @Suppress("ReturnCount") // signed out, fresh, and a failed project list each end the refresh
    suspend fun refreshSprintCards(teamId: String, force: Boolean = false): RefreshOutcome {
        val ticket = session.begin() ?: return RefreshOutcome.Unauthorized
        val key = CARDS_KEY + teamId
        if (!force && isFresh(key, ticket, cardsMaxAgeMillis)) return RefreshOutcome.Fresh
        val projects = remote.projects(teamId)
        if (projects !is Remote.Ok) return failure(ticket, projects, teamId)
        val gate = Semaphore(parallelism)
        val results = coroutineScope {
            projects.value.map { project -> async { gate.withPermit { sprintCard(project) } } }.awaitAll()
        }
        val failed = results.firstOrNull { it !is Remote.Ok }
        return if (failed != null) {
            failure(ticket, failed, teamId)
        } else {
            written(ticket, key) { replaceSprintCards(teamId, results.mapNotNull { (it as Remote.Ok).value }) }
        }
    }

    /** The project's card; null when the project went away between the list and this call. */
    @Suppress("ReturnCount") // a failure of either call ends this project's card
    private suspend fun sprintCard(project: Project): Remote<SprintCard?> {
        val sprint = remote.currentSprint(project.id)
        val current =
            when (sprint) {
                is Remote.Ok -> sprint.value
                is Remote.Failure -> return if (sprint.isNotFound()) Remote.Ok(null) else sprint
            }
        val pending =
            if (current.limbo) {
                when (val limbo = remote.limbo(project.id)) {
                    is Remote.Ok -> limbo.value.pendingRituals
                    is Remote.Failure -> return if (limbo.isNotFound()) Remote.Ok(null) else limbo
                }
            } else {
                emptyList()
            }
        return Remote.Ok(
            SprintCard(
                projectId = project.id,
                teamId = project.teamId,
                projectName = project.name,
                projectKey = project.key,
                sprintId = current.id,
                sprintName = current.name,
                budget = current.budget,
                pointsSpent = current.pointsSpent,
                limbo = current.limbo,
                pendingRituals = pending,
            ),
        )
    }

    private suspend fun CacheStore.pruneIssues() =
        pruneIssuesOpenedBefore(nowMillis() - TimeUnit.DAYS.toMillis(ISSUE_RETENTION_DAYS))

    private fun isFresh(key: String, ticket: Long, maxAgeMillis: Long): Boolean {
        val (generation, at) = fetched[key] ?: return false
        return generation == ticket && nowMillis() - at < maxAgeMillis
    }

    /** Write through the session; on success remember [key] as fetched now. */
    private suspend fun written(ticket: Long, key: String?, block: suspend CacheStore.() -> Unit): RefreshOutcome {
        session.write(ticket) { block() } ?: return RefreshOutcome.Unauthorized
        if (key != null) fetched[key] = ticket to nowMillis()
        return RefreshOutcome.Refreshed
    }

    private suspend fun failure(
        ticket: Long,
        result: Remote<*>,
        teamId: String?,
        issueId: String? = null,
    ): RefreshOutcome = when (result) {
        is Remote.HttpError -> when (result.status) {
            HTTP_UNAUTHORIZED -> RefreshOutcome.Unauthorized

            HTTP_FORBIDDEN -> forbidden(ticket, result, teamId)

            HTTP_NOT_FOUND -> {
                if (issueId == null) {
                    RefreshOutcome.Gone
                } else {
                    session.write(ticket) { deleteIssue(issueId) }?.let { RefreshOutcome.Gone }
                        ?: RefreshOutcome.Unauthorized
                }
            }

            else -> RefreshOutcome.Failed(result.status)
        }

        else -> RefreshOutcome.Failed()
    }

    /**
     * A 403 on something of [teamId]. The membership check answers with no
     * error code; anything with one (an app session refused, a scope) is
     * about this request, not the team. For a codeless one, the team list
     * decides: the team is dropped only when the list no longer has it.
     */
    @Suppress("ReturnCount") // each way to tell (a code, no team list, a write refused) is an early answer
    private suspend fun forbidden(ticket: Long, error: Remote.HttpError, teamId: String?): RefreshOutcome {
        if (teamId == null || error.errorCode != null) return RefreshOutcome.Forbidden
        val teams = remote.teams() as? Remote.Ok ?: return RefreshOutcome.Forbidden
        session.write(ticket) { replaceTeams(teams.value) } ?: return RefreshOutcome.Unauthorized
        fetched[TEAMS_KEY] = ticket to nowMillis()
        return if (teams.value.any { it.id == teamId }) RefreshOutcome.Forbidden else RefreshOutcome.TeamLost
    }

    companion object {
        /** Issues opened on this device stay cached this long after they were last opened. */
        const val ISSUE_RETENTION_DAYS = 7L
        const val DEFAULT_PARALLELISM = 4

        /** Teams change rarely, and the inbox sync's `team_ids` prunes a left team in between. */
        const val DEFAULT_TEAMS_MAX_AGE_MILLIS = 5 * 60_000L

        /** Until one request covers a team's sprints (CHT-1657), a tab flick costs one per project. */
        const val DEFAULT_CARDS_MAX_AGE_MILLIS = 60_000L

        private const val TEAMS_KEY = "teams"
        private const val CARDS_KEY = "cards:"
        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_FORBIDDEN = 403
        private const val HTTP_NOT_FOUND = 404

        private fun Remote<*>.isNotFound() = this is Remote.HttpError && status == HTTP_NOT_FOUND
    }
}
