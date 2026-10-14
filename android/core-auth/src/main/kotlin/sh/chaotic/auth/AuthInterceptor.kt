package sh.chaotic.auth

import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import java.io.IOException

/**
 * The one place a request gets the signed-in person's credentials.
 *
 * For a request to the signed-in server (same origin; a request anywhere
 * else, such as an avatar on another host, goes out untouched and never
 * sees a token) that does not already carry `Authorization`:
 *
 * - adds `Authorization: Bearer <access token>`, refreshing first when it
 *   is about to expire ([SessionManager.grant]);
 * - on a 401, refreshes once (single-flight, [SessionManager.refreshAfterRejection])
 *   and retries once with the new token, but only a token of the same
 *   person on the same server: if someone else signed in meanwhile, the
 *   401 is returned as is. A second 401 is returned as is too;
 * - when [interactive], adds `X-Chaotic-Interactive: 1` to writes (any
 *   method but GET, HEAD and OPTIONS). Every write the app sends is a
 *   person's own tap: the offline write queue (CHT-1613) only delays
 *   sending one, so it goes out on this client too. Something that
 *   writes on its own, with no tap behind it, should get its own client
 *   built with `interactive = false`, so the server gates it as the
 *   agent-like traffic it is.
 *
 * A request can name the one person it may go out as, in
 * [EXPECT_OWNER_HEADER] (an owner key, [SessionManager.ownerKey]); the
 * header is removed before sending. The write queue does: a write was
 * queued by one person and must never be sent as another. When the
 * signed-in person is anyone else, or nobody, such a request is not sent
 * at all and gets a 401 here.
 *
 * OkHttp runs interceptors on its own threads, so blocking on the session
 * here does not block the UI.
 */
class AuthInterceptor(private val sessions: SessionManager, private val interactive: Boolean) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val expected = original.header(EXPECT_OWNER_HEADER)
        val request = original.newBuilder().removeHeader(EXPECT_OWNER_HEADER).build()
        val baseUrl = fromSession { sessions.server() }?.baseUrl
        val ours = baseUrl != null && ServerUrl.isSameOrigin(request.url, baseUrl)
        return when {
            ours -> authenticated(chain, markInteractive(request), expected)
            expected != null -> notSignedInAs(request)
            else -> chain.proceed(request)
        }
    }

    private fun authenticated(chain: Interceptor.Chain, request: Request, expected: String?): Response {
        if (request.header(AUTHORIZATION) != null) {
            return if (expected == null) chain.proceed(request) else notSignedInAs(request)
        }
        val grant = fromSession { sessions.grant() }
        // The session can have changed since the origin check: a token only
        // ever goes to its own server, and a pinned request only as its owner.
        val usable = grant != null && ServerUrl.isSameOrigin(request.url, grant.baseUrl)
        return when {
            expected != null && (!usable || grant?.owner != expected) -> notSignedInAs(request)
            usable && grant != null -> withRetryOn401(chain, request, grant)
            else -> chain.proceed(request)
        }
    }

    private fun withRetryOn401(chain: Interceptor.Chain, request: Request, grant: Grant): Response {
        val response = chain.proceed(request.withBearer(grant.token))
        // A one-shot body has been consumed and cannot be sent again.
        val retryable = response.code == HTTP_UNAUTHORIZED && request.body?.isOneShot() != true
        val retry =
            try {
                if (retryable) fromSession { sessions.refreshAfterRejection(grant) } else null
            } catch (e: IOException) {
                response.close()
                throw e
            }
        if (retry == null) return response
        response.close()
        return chain.proceed(request.withBearer(retry.token))
    }

    /** The answer to a request pinned to someone who is not signed in: never sent. */
    private fun notSignedInAs(request: Request): Response = Response.Builder()
        .request(request)
        .protocol(Protocol.HTTP_1_1)
        .code(HTTP_UNAUTHORIZED)
        .message("Not signed in as the person this request belongs to")
        .body("".toResponseBody(null))
        .build()

    /**
     * Runs a session call on this OkHttp thread. Anything it throws reaches
     * the caller as an [IOException], the one failure OkHttp delivers to a
     * call's callback: any other exception thrown from an interceptor on an
     * enqueued call kills the dispatcher thread and the app with it.
     */
    @Suppress("TooGenericExceptionCaught")
    private fun <T> fromSession(block: suspend () -> T): T = try {
        runBlocking { block() }
    } catch (e: IOException) {
        throw e
    } catch (e: Exception) {
        throw IOException("the session could not supply a token (${e.javaClass.simpleName})", e)
    }

    private fun markInteractive(request: Request): Request = if (interactive && request.method !in SAFE_METHODS) {
        request.newBuilder().header(ChaoticOAuth.INTERACTIVE_HEADER, "1").build()
    } else {
        request
    }

    private fun Request.withBearer(token: String): Request = newBuilder().header(AUTHORIZATION, "Bearer $token").build()

    companion object {
        /** The owner key ([SessionManager.ownerKey]) a request may go out as; never sent. */
        const val EXPECT_OWNER_HEADER = "X-Chaotic-Client-Owner"

        private const val AUTHORIZATION = "Authorization"
        private const val HTTP_UNAUTHORIZED = 401
        private val SAFE_METHODS = setOf("GET", "HEAD", "OPTIONS")
    }
}
