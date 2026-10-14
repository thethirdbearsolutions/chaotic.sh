package sh.chaotic.sync

import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.statement.bodyAsText
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import sh.chaotic.api.apis.InboxApi
import sh.chaotic.api.apis.IssuesApi
import sh.chaotic.api.apis.NestedAliasesApi
import sh.chaotic.api.apis.RitualsApi
import sh.chaotic.api.apis.SprintsApi
import sh.chaotic.api.apis.TeamsApi
import sh.chaotic.api.client.ChaoticApi
import sh.chaotic.api.infrastructure.HttpResponse
import sh.chaotic.auth.ws.WsReconnectPolicy
import java.io.IOException
import kotlin.coroutines.cancellation.CancellationException

/**
 * [ChaoticRemote] on the generated client. [engine] is the app's
 * authenticated engine, so every call goes out as the signed-in person;
 * [baseUrl] is the server root. One instance per server: each generated
 * API class owns an HttpClient, built once here.
 */
class ApiRemote(
    baseUrl: String,
    engine: HttpClientEngine,
    private val nowMillis: () -> Long = System::currentTimeMillis,
) : ChaoticRemote {
    private val inboxApi = InboxApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val teamsApi = TeamsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val nestedApi = NestedAliasesApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val sprintsApi = SprintsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val ritualsApi = RitualsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val issuesApi = IssuesApi(baseUrl, engine, ChaoticApi.clientConfig)

    override suspend fun syncInbox(since: String?, limit: Int): Remote<SyncPage> =
        call({ inboxApi.syncInboxApiInboxSyncGet(since = since, limit = limit) }) { it.toSyncPage() }

    override suspend fun teams(): Remote<List<Team>> =
        call({ teamsApi.listMyTeamsApiTeamsGet() }) { teams -> teams.map { it.toTeam() } }

    override suspend fun projects(teamId: String): Remote<List<Project>> {
        val all = mutableListOf<Project>()
        while (all.size < MAX_PROJECTS) {
            val page =
                call({ nestedApi.listTeamProjectsApiTeamsTeamIdProjectsGet(teamId, skip = all.size, limit = PAGE) }) {
                    projects ->
                    projects.map { it.toProject() }
                }
            if (page !is Remote.Ok) return page
            all += page.value
            if (page.value.size < PAGE) break
        }
        return Remote.Ok(all)
    }

    override suspend fun currentSprint(projectId: String): Remote<CurrentSprint> =
        call({ sprintsApi.getCurrentSprintApiSprintsCurrentGet(projectId) }) { it.toCurrentSprint() }

    override suspend fun limbo(projectId: String): Remote<LimboInfo> =
        call({ ritualsApi.getLimboStatusApiRitualsLimboGet(projectId) }) { it.toLimboInfo() }

    override suspend fun issue(issueId: String, teamId: String): Remote<Issue> =
        call({ issuesApi.getIssueApiIssuesIssueIdGet(issueId) }) { it.toIssue(teamId) }

    override suspend fun comments(issueId: String): Remote<List<Comment>> =
        call({ issuesApi.listCommentsApiIssuesIssueIdCommentsGet(issueId) }) { comments ->
            comments.map { it.toComment() }
        }

    override suspend fun activity(issueId: String): Remote<List<Activity>> =
        call({ issuesApi.listActivitiesApiIssuesIssueIdActivitiesGet(issueId) }) { activity ->
            activity.map { it.toActivity() }
        }

    @Suppress("TooGenericExceptionCaught") // see the last catch
    private suspend fun <T, R> call(request: suspend () -> HttpResponse<T>, map: (T) -> R): Remote<R> = try {
        val response = request()
        if (response.success) {
            Remote.Ok(map(response.body()))
        } else {
            Remote.HttpError(
                status = response.status,
                errorCode = errorCode(response),
                retryAfterMillis = WsReconnectPolicy.retryAfterMillis(
                    response.headers.entries.firstOrNull { it.key.equals("Retry-After", true) }?.value?.firstOrNull(),
                    nowMillis(),
                ),
            )
        }
    } catch (e: CancellationException) {
        throw e
    } catch (e: IOException) {
        Remote.Unreachable(e)
    } catch (e: SerializationException) {
        Remote.Unreadable(e)
    } catch (e: Exception) {
        // Ktor wraps a body it cannot convert in its own exception types
        // (NoTransformationFoundException and friends); none may crash a sync.
        Remote.Unreadable(e)
    }

    /** `detail.error_code` (HTTPException with a dict detail) or a top-level `error_code`, if the body has one. */
    @Suppress("TooGenericExceptionCaught", "SwallowedException")
    private suspend fun errorCode(response: HttpResponse<*>): String? = try {
        val body = ChaoticApi.json.parseToJsonElement(response.response.bodyAsText()) as? JsonObject
        val detail = body?.get("detail") as? JsonObject
        ((detail?.get("error_code") ?: body?.get("error_code")) as? JsonPrimitive)?.takeIf { it.isString }?.content
    } catch (e: CancellationException) {
        throw e
    } catch (e: Exception) {
        null
    }

    private companion object {
        const val PAGE = 100

        /** A bound on paging, so a misbehaving server cannot keep the loop going. */
        const val MAX_PROJECTS = 1_000
    }
}
