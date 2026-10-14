package sh.chaotic.sync

import java.io.IOException
import java.util.Collections

const val TEAM_A = "team-a"
const val TEAM_B = "team-b"

/** The person the tests' cache belongs to, and a second one for account switches. */
val OWNER = CacheSession.ownerKey("https://chaotic.test", "ada")
val OTHER_OWNER = CacheSession.ownerKey("https://chaotic.test", "grace")

fun entry(
    id: String,
    updatedAtMicros: Long = 1_000,
    teamId: String = TEAM_A,
    kind: String = "mention",
    createdAtMillis: Long = updatedAtMicros / 1_000,
    read: Boolean = false,
) = InboxEntry(
    id = id,
    teamId = teamId,
    kind = kind,
    title = "Entry $id",
    createdAtMillis = createdAtMillis,
    updatedAtMicros = updatedAtMicros,
    read = read,
)

fun open(entry: InboxEntry) = SyncedEntry(entry, open = true)

fun tombstone(entry: InboxEntry) = SyncedEntry(entry, open = false)

fun page(
    vararg entries: SyncedEntry,
    cursor: String? = "c-${entries.size}",
    hasMore: Boolean = false,
    reset: Boolean = false,
    retryAfter: Int? = null,
    teams: Set<String> = setOf(TEAM_A, TEAM_B),
) = SyncPage(
    entries = entries.toList(),
    nextCursor = cursor,
    hasMore = hasMore,
    retryAfterSeconds = retryAfter,
    reset = reset,
    teamIds = teams,
)

fun issue(id: String = "i1", teamId: String = TEAM_A, openedAtMillis: Long = 0) = Issue(
    id = id,
    teamId = teamId,
    projectId = "p1",
    identifier = "CHT-1",
    title = "An issue",
    status = "todo",
    priority = "high",
    updatedAtMillis = 0,
    openedAtMillis = openedAtMillis,
)

fun card(projectId: String, teamId: String = TEAM_A, budget: Int? = 10, spent: Int = 0, limbo: Boolean = false) =
    SprintCard(
        projectId = projectId,
        teamId = teamId,
        projectName = "Project $projectId",
        projectKey = projectId.uppercase(),
        sprintId = "s-$projectId",
        sprintName = "Sprint 1",
        budget = budget,
        pointsSpent = spent,
        limbo = limbo,
    )

/** A [ChaoticRemote] that answers from queues and records what it was asked. */
class FakeRemote : ChaoticRemote {
    val syncAnswers = ArrayDeque<Remote<SyncPage>>()

    /** Synchronized: the app's ViewModel test reads it from another thread. */
    val sinceSent: MutableList<String?> = Collections.synchronizedList(mutableListOf())
    var teams: Remote<List<Team>> = Remote.Ok(emptyList())
    var projects: MutableMap<String, Remote<List<Project>>> = mutableMapOf()
    var sprints: MutableMap<String, Remote<CurrentSprint>> = mutableMapOf()
    var limbos: MutableMap<String, Remote<LimboInfo>> = mutableMapOf()
    var issues: MutableMap<String, Remote<Issue>> = mutableMapOf()
    var comments: Remote<List<Comment>> = Remote.Ok(emptyList())
    var activity: Remote<List<Activity>> = Remote.Ok(emptyList())

    /** Runs inside each sync call, before it answers: lets a test interleave work. */
    var onSync: suspend () -> Unit = {}

    /** Runs inside each issue call, before it answers. */
    var onIssue: suspend () -> Unit = {}

    /** How many times the team list was asked for. */
    @Volatile var teamCalls = 0

    /** How many times a team's projects were asked for. */
    @Volatile var projectCalls = 0

    override suspend fun syncInbox(since: String?, limit: Int): Remote<SyncPage> {
        sinceSent += since
        onSync()
        return syncAnswers.removeFirstOrNull() ?: Remote.Unreachable(IOException("no answer queued"))
    }

    override suspend fun teams(): Remote<List<Team>> {
        teamCalls++
        return teams
    }

    override suspend fun projects(teamId: String): Remote<List<Project>> {
        projectCalls++
        return projects[teamId] ?: Remote.HttpError(404)
    }

    override suspend fun currentSprint(projectId: String) = sprints[projectId] ?: Remote.HttpError(404)

    override suspend fun limbo(projectId: String) = limbos[projectId] ?: Remote.HttpError(404)

    override suspend fun issue(issueId: String, teamId: String): Remote<Issue> {
        onIssue()
        return when (val answer = issues[issueId] ?: Remote.HttpError(404)) {
            is Remote.Ok -> Remote.Ok(answer.value.copy(teamId = teamId))
            is Remote.Failure -> answer
        }
    }

    override suspend fun comments(issueId: String) = comments

    override suspend fun activity(issueId: String) = activity
}
