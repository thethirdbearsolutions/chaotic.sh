package sh.chaotic.android.data

import io.ktor.client.engine.HttpClientEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.Activity
import sh.chaotic.sync.ApiRemote
import sh.chaotic.sync.ChaoticRemote
import sh.chaotic.sync.Comment
import sh.chaotic.sync.CurrentSprint
import sh.chaotic.sync.Issue
import sh.chaotic.sync.LimboInfo
import sh.chaotic.sync.Project
import sh.chaotic.sync.Remote
import sh.chaotic.sync.SyncPage
import sh.chaotic.sync.Team

/**
 * [ChaoticRemote] for whichever server the device is signed in to: an
 * [ApiRemote] on the authenticated engine, rebuilt when the server
 * changes. Signed out, every call is a 401, which the sync and refreshes
 * already treat as "stop".
 */
class SessionRemote(private val sessions: SessionManager, private val engine: HttpClientEngine) : ChaoticRemote {
    private val mutex = Mutex()
    private var current: Pair<String, ApiRemote>? = null

    private suspend fun remote(): ApiRemote? {
        val baseUrl = sessions.server()?.baseUrl ?: return null
        return mutex.withLock {
            current?.takeIf { it.first == baseUrl }?.second
                ?: ApiRemote(baseUrl, engine).also { current = baseUrl to it }
        }
    }

    private suspend fun <T> call(block: suspend ApiRemote.() -> Remote<T>): Remote<T> =
        remote()?.block() ?: Remote.HttpError(HTTP_UNAUTHORIZED)

    override suspend fun syncInbox(since: String?, limit: Int): Remote<SyncPage> = call { syncInbox(since, limit) }

    override suspend fun teams(): Remote<List<Team>> = call { teams() }

    override suspend fun projects(teamId: String): Remote<List<Project>> = call { projects(teamId) }

    override suspend fun currentSprint(projectId: String): Remote<CurrentSprint> = call { currentSprint(projectId) }

    override suspend fun limbo(projectId: String): Remote<LimboInfo> = call { limbo(projectId) }

    override suspend fun issue(issueId: String, teamId: String): Remote<Issue> = call { issue(issueId, teamId) }

    override suspend fun comments(issueId: String): Remote<List<Comment>> = call { comments(issueId) }

    override suspend fun activity(issueId: String): Remote<List<Activity>> = call { activity(issueId) }

    private companion object {
        const val HTTP_UNAUTHORIZED = 401
    }
}
