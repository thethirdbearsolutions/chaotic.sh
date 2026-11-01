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

    /**
     * What is cached is as current as a fetch could make it, so nothing was
     * saved: it was fetched recently enough (nothing was asked of the
     * server); or, for an issue, writes to it overtook every fetch and the
     * cache holds what they answered; or, for an issue refreshed after a
     * write ([CacheRefresher.refreshCachedIssue]), it is not cached, so
     * there is nothing to bring up to date.
     */
    data object Fresh : RefreshOutcome

    /**
     * The server says it is gone (404): it was removed from the cache. Its
     * team is still listed, or that could not be told (no team, a coded
     * 404, or the team list could not be fetched).
     */
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
@Suppress("TooManyFunctions") // one entry point per part of the cache, and the steps they share
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

    /** The team ids the last fetched team list held, in which session generation: [byTeamList] reuses it briefly. */
    @Volatile private var listed: Pair<Long, Set<String>>? = null

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
            is Remote.Ok -> written(ticket, TEAMS_KEY) { replaceTeams(teams.value) }.also {
                if (it == RefreshOutcome.Refreshed) listed = ticket to teams.value.mapTo(HashSet()) { team -> team.id }
            }

            is Remote.Failure -> failure(ticket, teams, teamId = null)
        }
    }

    /**
     * Fetch [issueId] with its comments and activity, as known in [teamId],
     * and keep it as opened now. Issues not opened for [ISSUE_RETENTION_DAYS]
     * are pruned on the way.
     *
     * A write to the issue that the server takes while this fetch is out
     * (a status change, a comment, a gate decision) makes the fetch older
     * than the cache: saving it would put the old status back, or drop the
     * new comment, until the next refresh (CHT-1668). So such a fetch is
     * not saved but made again, up to [MAX_ISSUE_FETCHES] times in all. If
     * writes overtake every one, the answer is [RefreshOutcome.Fresh] when
     * the issue is cached (the cache holds what those writes answered,
     * newer than any of the fetches), and [RefreshOutcome.Failed] when it
     * is not (there is nothing to show).
     */
    suspend fun refreshIssue(issueId: String, teamId: String): RefreshOutcome =
        refresh(issueId) { teamId to nowMillis() }

    /**
     * [refreshIssue] for an issue that is cached already, after a write to
     * it the cache could not be brought up to date from (CHT-1668). The
     * issue's team and when it was last opened come from the cache, so a
     * write does not count as opening it; an issue that is not cached (it
     * was pruned, or never opened here) is left alone, as
     * [RefreshOutcome.Fresh].
     */
    suspend fun refreshCachedIssue(issueId: String): RefreshOutcome = refresh(issueId) {
        cachedIssue(issueId)?.let { it.teamId to it.openedAtMillis }
    }

    /**
     * [placement] gives the issue's team and when it was opened, read in
     * the store before each fetch and again in the transaction that saves
     * it; null means it is not to be saved (no longer cached).
     */
    @Suppress("ReturnCount") // signed out, not cached, and each fetch's own ending, end the refresh early
    private suspend fun refresh(
        issueId: String,
        placement: suspend CacheStore.() -> Pair<String, Long>?,
    ): RefreshOutcome {
        val ticket = session.begin() ?: return RefreshOutcome.Unauthorized
        session.write(ticket) { pruneIssues() } ?: return RefreshOutcome.Unauthorized
        repeat(MAX_ISSUE_FETCHES) {
            val writes = session.issueWrites(issueId)
            val placed = session.write(ticket) { Placed(placement()) } ?: return RefreshOutcome.Unauthorized
            val teamId = placed.at?.first ?: return RefreshOutcome.Fresh
            val outcome = fetchIssue(ticket, issueId, teamId, writes, placement)
            if (outcome != null) return outcome
        }
        // Overtaken every time: the cache holds the writes' answers, if it holds the issue at all.
        val cached = session.write(ticket) { cachedIssue(issueId) != null } ?: return RefreshOutcome.Unauthorized
        return if (cached) RefreshOutcome.Fresh else RefreshOutcome.Failed()
    }

    /** A nullable result through [CacheSession.write], whose null means signed out. */
    private class Placed(val at: Pair<String, Long>?)

    /** One fetch for [refresh]: how it ended, or null when a write to the issue overtook it. */
    @Suppress("ReturnCount") // a failure of any of the three calls ends the refresh
    private suspend fun fetchIssue(
        ticket: Long,
        issueId: String,
        teamId: String,
        writes: Long,
        placement: suspend CacheStore.() -> Pair<String, Long>?,
    ): RefreshOutcome? {
        val issue = remote.issue(issueId, teamId)
        if (issue !is Remote.Ok) return failure(ticket, issue, teamId, issueId)
        val comments = remote.comments(issueId)
        if (comments !is Remote.Ok) return failure(ticket, comments, teamId, issueId)
        val activity = remote.activity(issueId)
        if (activity !is Remote.Ok) return failure(ticket, activity, teamId, issueId)
        val saved = session.write(ticket) {
            // Checked under the session's lock, which the write queue records its answers under too.
            val opened = placement()?.second
            when {
                session.issueWrites(issueId) != writes -> SaveResult.OVERTAKEN

                opened == null -> SaveResult.UNCACHED

                else -> {
                    saveIssue(
                        IssueDetail(
                            issue = issue.value.copy(openedAtMillis = opened),
                            comments = comments.value.sortedBy { it.createdAtMillis },
                            activity = activity.value.sortedBy { it.createdAtMillis },
                        ),
                    )
                    SaveResult.SAVED
                }
            }
        } ?: return RefreshOutcome.Unauthorized
        return when (saved) {
            SaveResult.SAVED -> RefreshOutcome.Refreshed
            SaveResult.UNCACHED -> RefreshOutcome.Fresh
            SaveResult.OVERTAKEN -> null
        }
    }

    private enum class SaveResult { SAVED, UNCACHED, OVERTAKEN }

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
            HTTP_NOT_FOUND -> notFound(ticket, result, teamId, issueId)
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
    private suspend fun forbidden(ticket: Long, error: Remote.HttpError, teamId: String?): RefreshOutcome =
        if (teamId == null || error.errorCode != null) {
            RefreshOutcome.Forbidden
        } else {
            byTeamList(ticket, teamId, ifStillListed = RefreshOutcome.Forbidden)
        }

    /**
     * A 404 on something of [teamId]. Since CHT-1785 something the person
     * can no longer see answers 404 exactly like something deleted, so a
     * person who left the team now meets a 404 here, not a 403. The issue
     * is dropped either way, and the team list decides whether the whole
     * team went with it (CHT-1801).
     */
    private suspend fun notFound(
        ticket: Long,
        error: Remote.HttpError,
        teamId: String?,
        issueId: String?,
    ): RefreshOutcome {
        if (issueId != null) {
            session.write(ticket) { deleteIssue(issueId) } ?: return RefreshOutcome.Unauthorized
        }
        // As for a 403: a 404 with an error code is about the request, not the team.
        return if (teamId == null || error.errorCode != null) {
            RefreshOutcome.Gone
        } else {
            byTeamList(ticket, teamId, RefreshOutcome.Gone)
        }
    }

    /**
     * Fetch the team list and save it, which drops whatever was cached for
     * a team no longer on it: [RefreshOutcome.TeamLost] when [teamId] is
     * one of those, else [ifStillListed]. Also [ifStillListed] when the
     * list cannot be fetched, so nothing is dropped on a guess. A list
     * fetched in the last [TEAMS_RECHECK_MILLIS] is used again, so a run
     * of 404s or 403s (several teams' cards, several stale issues after
     * one flush) asks for it once.
     */
    @Suppress("ReturnCount") // a list just fetched, no team list, and a write refused, are early answers
    private suspend fun byTeamList(ticket: Long, teamId: String, ifStillListed: RefreshOutcome): RefreshOutcome {
        val recent = listed?.takeIf { it.first == ticket && isFresh(TEAMS_KEY, ticket, TEAMS_RECHECK_MILLIS) }
        if (recent != null) return if (teamId in recent.second) ifStillListed else RefreshOutcome.TeamLost
        val teams = remote.teams() as? Remote.Ok ?: return ifStillListed
        session.write(ticket) { replaceTeams(teams.value) } ?: return RefreshOutcome.Unauthorized
        fetched[TEAMS_KEY] = ticket to nowMillis()
        val ids = teams.value.mapTo(HashSet()) { it.id }
        listed = ticket to ids
        return if (teamId in ids) ifStillListed else RefreshOutcome.TeamLost
    }

    companion object {
        /** Issues opened on this device stay cached this long after they were last opened. */
        const val ISSUE_RETENTION_DAYS = 7L
        const val DEFAULT_PARALLELISM = 4

        /** Fetches of one issue a refresh makes while writes to it keep overtaking them. */
        const val MAX_ISSUE_FETCHES = 3

        /** Teams change rarely, and the inbox sync's `team_ids` prunes a left team in between. */
        const val DEFAULT_TEAMS_MAX_AGE_MILLIS = 5 * 60_000L

        /** Until one request covers a team's sprints (CHT-1657), a tab flick costs one per project. */
        const val DEFAULT_CARDS_MAX_AGE_MILLIS = 60_000L

        /** How long a team list fetched to judge a 403 or 404 answers the next one too. */
        const val TEAMS_RECHECK_MILLIS = 10_000L

        private const val TEAMS_KEY = "teams"
        private const val CARDS_KEY = "cards:"
        private const val HTTP_UNAUTHORIZED = 401
        private const val HTTP_FORBIDDEN = 403
        private const val HTTP_NOT_FOUND = 404

        private fun Remote<*>.isNotFound() = this is Remote.HttpError && status == HTTP_NOT_FOUND
    }
}
