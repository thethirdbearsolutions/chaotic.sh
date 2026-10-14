package sh.chaotic.sync

/** What one call to the server came back with. */
sealed interface Remote<out T> {
    data class Ok<T>(val value: T) : Remote<T>

    /** Anything but [Ok]. */
    sealed interface Failure : Remote<Nothing>

    /**
     * The server answered with a non-2xx [status]. [errorCode] is the
     * `detail.error_code` of a structured refusal, when there is one;
     * [retryAfterMillis] is its `Retry-After` header, 0 when absent.
     */
    data class HttpError(val status: Int, val errorCode: String? = null, val retryAfterMillis: Long = 0) :
        Failure

    /** No answer: offline, a timeout, DNS. Nothing about the cache changes. */
    data class Unreachable(val cause: Throwable) : Failure

    /** An answer that is not the JSON this app expects (a captive portal's page, say). */
    data class Unreadable(val cause: Throwable) : Failure
}

/** One page of GET /api/inbox/sync, in cache terms. */
data class SyncPage(
    /** Open entries and tombstones, oldest change first. */
    val entries: List<SyncedEntry>,
    val nextCursor: String?,
    val hasMore: Boolean,
    val retryAfterSeconds: Int?,
    val reset: Boolean,
    val teamIds: Set<String>,
)

/**
 * An entry as the sync sent it: [open] false is a tombstone (resolved,
 * archived, or a state this app does not know).
 */
data class SyncedEntry(val entry: InboxEntry, val open: Boolean)

data class LimboInfo(val inLimbo: Boolean, val pendingRituals: List<String>)

/**
 * Sprint as the card needs it. The server's current-sprint endpoint
 * creates a sprint when a project has none, so there always is one.
 */
data class CurrentSprint(
    val id: String,
    val projectId: String,
    val name: String,
    val budget: Int?,
    val pointsSpent: Int,
    val limbo: Boolean,
)

/**
 * The server calls the cache needs, as the signed-in person. [ApiRemote]
 * is the real one, on the generated client; tests use a fake.
 */
interface ChaoticRemote {
    suspend fun syncInbox(since: String?, limit: Int): Remote<SyncPage>

    suspend fun teams(): Remote<List<Team>>

    suspend fun projects(teamId: String): Remote<List<Project>>

    suspend fun currentSprint(projectId: String): Remote<CurrentSprint>

    suspend fun limbo(projectId: String): Remote<LimboInfo>

    /** The issue; [teamId] is the team the caller knows it by (the server's issue has no team field). */
    suspend fun issue(issueId: String, teamId: String): Remote<Issue>

    suspend fun comments(issueId: String): Remote<List<Comment>>

    suspend fun activity(issueId: String): Remote<List<Activity>>
}
