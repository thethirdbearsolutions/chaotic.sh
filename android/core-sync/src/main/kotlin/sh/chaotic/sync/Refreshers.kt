package sh.chaotic.sync

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.sync.Semaphore
import kotlinx.coroutines.sync.withPermit
import java.util.concurrent.TimeUnit

/** How a refresh of something other than the inbox ended. */
sealed interface RefreshOutcome {
    data object Refreshed : RefreshOutcome

    /** The server says it is gone (404): it was removed from the cache. */
    data object Gone : RefreshOutcome

    /** The person may no longer see this team (403): everything cached for it was dropped. */
    data object TeamLost : RefreshOutcome

    data object Unauthorized : RefreshOutcome

    /** Nothing changed in the cache: offline, an unreadable answer, a server error. */
    data class Failed(val status: Int? = null) : RefreshOutcome
}

/**
 * Refreshes of the parts of the cache the inbox sync does not cover: the
 * team list, an opened issue, and each project's current sprint card.
 *
 * The session is account-wide, so these are per team, and the server's
 * 403 for a team the person has left is how the device learns it: that
 * team's cache is dropped at once rather than shown until the next inbox
 * sync notices.
 */
class CacheRefresher(
    private val remote: ChaoticRemote,
    private val store: CacheStore,
    private val nowMillis: () -> Long = System::currentTimeMillis,
    /** Current-sprint requests in flight at once, for a team with many projects. */
    private val parallelism: Int = DEFAULT_PARALLELISM,
) {
    /**
     * The team list, which also prunes every left team's cache. Runs when
     * the app comes to the foreground, so it also drops issues not opened
     * for [ISSUE_RETENTION_DAYS] even when no issue is opened.
     */
    suspend fun refreshTeams(): RefreshOutcome {
        pruneIssues()
        return when (val teams = remote.teams()) {
            is Remote.Ok -> {
                store.replaceTeams(teams.value)
                RefreshOutcome.Refreshed
            }

            else -> failure(teams, teamId = null)
        }
    }

    private suspend fun pruneIssues() =
        store.pruneIssuesOpenedBefore(nowMillis() - TimeUnit.DAYS.toMillis(ISSUE_RETENTION_DAYS))

    /**
     * Fetch [issueId] with its comments and activity, as known in [teamId],
     * and keep it as opened now. Issues not opened for [ISSUE_RETENTION_DAYS]
     * are pruned on the way.
     */
    @Suppress("ReturnCount") // a failure of any of the three calls ends the refresh
    suspend fun refreshIssue(issueId: String, teamId: String): RefreshOutcome {
        val now = nowMillis()
        pruneIssues()
        val issue = remote.issue(issueId, teamId)
        if (issue !is Remote.Ok) return failure(issue, teamId, issueId)
        val comments = remote.comments(issueId)
        if (comments !is Remote.Ok) return failure(comments, teamId, issueId)
        val activity = remote.activity(issueId)
        if (activity !is Remote.Ok) return failure(activity, teamId, issueId)
        store.saveIssue(
            IssueDetail(
                issue = issue.value.copy(openedAtMillis = now),
                comments = comments.value.sortedBy { it.createdAtMillis },
                activity = activity.value.sortedBy { it.createdAtMillis },
            ),
        )
        return RefreshOutcome.Refreshed
    }

    /**
     * The current sprint card of every project in [teamId]. A project
     * whose sprint is in limbo also gets the names of the rituals it waits
     * on. All or nothing: a failure part-way keeps the cards already
     * cached.
     */
    suspend fun refreshSprintCards(teamId: String): RefreshOutcome {
        val projects = remote.projects(teamId)
        if (projects !is Remote.Ok) return failure(projects, teamId)
        val gate = Semaphore(parallelism)
        val results = coroutineScope {
            projects.value.map { project -> async { gate.withPermit { sprintCard(project) } } }.awaitAll()
        }
        val failed = results.firstOrNull { it !is Remote.Ok }
        return if (failed != null) {
            failure(failed, teamId)
        } else {
            store.replaceSprintCards(teamId, results.mapNotNull { (it as Remote.Ok).value })
            RefreshOutcome.Refreshed
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

    private suspend fun failure(result: Remote<*>, teamId: String?, issueId: String? = null): RefreshOutcome =
        when (result) {
            is Remote.HttpError -> when (result.status) {
                HTTP_UNAUTHORIZED -> RefreshOutcome.Unauthorized

                HTTP_FORBIDDEN -> {
                    if (teamId != null) store.dropTeam(teamId)
                    RefreshOutcome.TeamLost
                }

                HTTP_NOT_FOUND -> {
                    if (issueId != null) store.deleteIssue(issueId)
                    RefreshOutcome.Gone
                }

                else -> RefreshOutcome.Failed(result.status)
            }

            else -> RefreshOutcome.Failed()
        }

    companion object {
        /** Issues opened on this device stay cached this long after they were last opened. */
        const val ISSUE_RETENTION_DAYS = 7L
        const val DEFAULT_PARALLELISM = 4

        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_FORBIDDEN = 403
        private const val HTTP_NOT_FOUND = 404

        private fun Remote<*>.isNotFound() = this is Remote.HttpError && status == HTTP_NOT_FOUND
    }
}
