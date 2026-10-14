package sh.chaotic.sync

import io.ktor.client.HttpClient
import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.request.header
import io.ktor.client.request.request
import io.ktor.client.request.setBody
import io.ktor.client.statement.bodyAsText
import io.ktor.http.ContentType
import io.ktor.http.HttpMethod
import io.ktor.http.content.TextContent
import io.ktor.http.isSuccess
import kotlinx.serialization.DeserializationStrategy
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import sh.chaotic.api.apis.InboxApi
import sh.chaotic.api.apis.IssuesApi
import sh.chaotic.api.apis.NestedAliasesApi
import sh.chaotic.api.apis.RitualsApi
import sh.chaotic.api.apis.SprintsApi
import sh.chaotic.api.apis.TeamsApi
import sh.chaotic.api.client.ChaoticApi
import sh.chaotic.api.infrastructure.HttpResponse
import sh.chaotic.api.models.IssueCommentResponse
import sh.chaotic.api.models.IssueResponse
import sh.chaotic.auth.AuthInterceptor
import sh.chaotic.auth.ws.WsReconnectPolicy
import java.io.Closeable
import java.io.IOException
import kotlin.coroutines.cancellation.CancellationException

/**
 * [ChaoticRemote] on the generated client. [engine] is the app's
 * authenticated engine, so every call goes out as the signed-in person;
 * [baseUrl] is the server root. One instance per server: each generated
 * API class owns an HttpClient, built once here.
 */
@Suppress("TooManyFunctions") // one function per server call the cache and the write queue make
class ApiRemote(
    private val baseUrl: String,
    engine: HttpClientEngine,
    private val nowMillis: () -> Long = System::currentTimeMillis,
    /** The client the writes go out on; one shared across servers holds no server, so it need not be rebuilt. */
    writeClient: HttpClient? = null,
) : ChaoticRemote,
    Closeable {
    private val inboxApi = InboxApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val teamsApi = TeamsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val nestedApi = NestedAliasesApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val sprintsApi = SprintsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val ritualsApi = RitualsApi(baseUrl, engine, ChaoticApi.clientConfig)
    private val issuesApi = IssuesApi(baseUrl, engine, ChaoticApi.clientConfig)

    /** The writes go out by path (an inbox action's, or the issue routes), with an Idempotency-Key header. */
    private val ownsHttp = writeClient == null
    private val http = writeClient ?: HttpClient(engine)

    override suspend fun syncInbox(since: String?, limit: Int): Remote<SyncPage> =
        call({ inboxApi.syncInboxApiInboxSyncGet(since = since, limit = limit) }) { it.toSyncPage() }

    override suspend fun teams(): Remote<List<Team>> =
        call({ teamsApi.listMyTeamsApiTeamsGet() }) { teams -> teams.map { it.toTeam() } }

    override suspend fun projects(teamId: String): Remote<List<Project>> {
        val all = mutableListOf<Project>()
        while (all.size < MAX_PROJECTS) {
            val skip = all.size
            val page =
                call({ nestedApi.listTeamProjectsApiTeamsTeamIdProjectsGet(teamId, skip = skip, limit = PAGE) }) {
                    it.map { project -> project.toProject() }
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

    override suspend fun members(teamId: String): Remote<List<Principal>> =
        call({ teamsApi.listTeamMembersApiTeamsTeamIdMembersGet(teamId) }) { members ->
            members.map { Principal(id = it.userId, name = it.userName ?: it.userEmail ?: it.userId) }
        }

    override suspend fun act(path: String, body: JsonObject, origin: WriteOrigin): Remote<Unit> =
        write(HttpMethod.Post, path, body, origin).map { }

    override suspend fun updateIssue(
        issueId: String,
        teamId: String,
        fields: JsonObject,
        origin: WriteOrigin,
    ): Remote<Issue?> = write(HttpMethod.Patch, WritePaths.issue(issueId), fields, origin).map { text ->
        decodeOrNull(IssueResponse.serializer(), text)?.toIssue(teamId)
    }

    override suspend fun addComment(issueId: String, content: String, origin: WriteOrigin): Remote<Comment?> {
        val body = buildJsonObject { put("content", content) }
        return write(HttpMethod.Post, WritePaths.comments(issueId), body, origin).map { text ->
            decodeOrNull(IssueCommentResponse.serializer(), text)?.toComment()
        }
    }

    /** The write client, when it is this remote's own; the engine is the caller's, and stays open. */
    override fun close() {
        if (ownsHttp) http.close()
    }

    private suspend fun <T, R> call(request: suspend () -> HttpResponse<T>, map: (T) -> R): Remote<R> =
        apiCall(nowMillis, request, map)

    /**
     * One write to [path] on this server, which [WritePaths.isApiPath]
     * must accept: any other path is refused here, unsent. The answer is
     * the body's text on a 2xx.
     */
    @Suppress("TooGenericExceptionCaught") // as apiResponse
    private suspend fun write(
        method: HttpMethod,
        path: String,
        body: JsonObject,
        origin: WriteOrigin,
    ): Remote<String> {
        if (!WritePaths.isApiPath(path)) return Remote.HttpError(HTTP_BAD_REQUEST, message = "Not an API path")
        return try {
            val response = http.request(baseUrl.trimEnd('/') + path) {
                this.method = method
                header(IDEMPOTENCY_KEY, origin.idempotencyKey)
                // AuthInterceptor sends it only as this person, and strips this.
                header(AuthInterceptor.EXPECT_OWNER_HEADER, origin.owner)
                setBody(TextContent(body.toString(), ContentType.Application.Json))
            }
            val text = response.bodyAsText()
            if (response.status.isSuccess()) {
                Remote.Ok(text)
            } else {
                val (code, message) = errorDetail(text)
                Remote.HttpError(
                    status = response.status.value,
                    errorCode = code,
                    retryAfterMillis = WsReconnectPolicy.retryAfterMillis(response.headers["Retry-After"], nowMillis()),
                    message = message,
                )
            }
        } catch (e: CancellationException) {
            throw e
        } catch (e: IOException) {
            Remote.Unreachable(e)
        } catch (e: Exception) {
            // As in apiResponse: Ktor's own exception types must not crash the queue.
            Remote.Unreadable(e)
        }
    }

    /**
     * A 2xx answer read as [strategy], or null when it cannot be: the
     * write was still taken, so it must not be sent again for want of an
     * answer the app can read.
     */
    @Suppress("TooGenericExceptionCaught", "SwallowedException")
    private fun <T> decodeOrNull(strategy: DeserializationStrategy<T>, text: String): T? = try {
        ChaoticApi.json.decodeFromString(strategy, text)
    } catch (e: Exception) {
        null
    }

    private companion object {
        const val PAGE = 100

        /** A bound on paging, so a misbehaving server cannot keep the loop going. */
        const val MAX_PROJECTS = 1_000
        const val HTTP_BAD_REQUEST = 400
        const val IDEMPOTENCY_KEY = "Idempotency-Key"
    }
}

/**
 * One generated-client call as a [Remote]: the mapped body on 2xx, else
 * the status with its error code and Retry-After, and never an exception
 * (other than cancellation).
 */
internal suspend fun <T, R> apiCall(
    nowMillis: () -> Long,
    request: suspend () -> HttpResponse<T>,
    map: (T) -> R,
): Remote<R> = apiResponse(nowMillis, request) { map(it.body()) }

/** [apiCall] for a call whose answer body does not matter: any 2xx is [Remote.Ok]. */
internal suspend fun <T> apiStatus(nowMillis: () -> Long, request: suspend () -> HttpResponse<T>): Remote<Unit> =
    apiResponse(nowMillis, request) { }

@Suppress("TooGenericExceptionCaught") // see the last catch
private suspend fun <T, R> apiResponse(
    nowMillis: () -> Long,
    request: suspend () -> HttpResponse<T>,
    read: suspend (HttpResponse<T>) -> R,
): Remote<R> = try {
    val response = request()
    if (response.success) {
        Remote.Ok(read(response))
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
    errorDetail(response.response.bodyAsText()).first
} catch (e: CancellationException) {
    throw e
} catch (e: Exception) {
    null
}

/**
 * A refusal's error code and message, from the shapes the server sends:
 * `{"detail": {"error_code", "message"}}` (a structured refusal),
 * `{"detail": "text"}` (a plain HTTPException), `{"detail": [{"msg"}]}`
 * (a validation error), or a top-level `error_code`/`message`. Either is
 * null when the body has none, or is not JSON at all.
 */
@Suppress("TooGenericExceptionCaught", "SwallowedException")
internal fun errorDetail(text: String): Pair<String?, String?> = try {
    val body = ChaoticApi.json.parseToJsonElement(text) as? JsonObject
    val detail = body?.get("detail")
    val fields = (detail as? JsonObject) ?: body
    val code = (fields?.get("error_code") as? JsonPrimitive)?.takeIf { it.isString }?.content
    val message = when (detail) {
        is JsonPrimitive -> detail.takeIf { it.isString }?.content
        is JsonArray -> ((detail.firstOrNull() as? JsonObject)?.get("msg") as? JsonPrimitive)?.content
        else -> (fields?.get("message") as? JsonPrimitive)?.takeIf { it.isString }?.content
    }
    code to message
} catch (e: Exception) {
    null to null
}
