package sh.chaotic.auth

import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response
import java.io.IOException

/**
 * The one place a request gets the signed-in person's credentials.
 *
 * For a request to the signed-in server (same origin; a request anywhere
 * else, such as an avatar on another host, goes out untouched and never
 * sees a token) that does not already carry `Authorization`:
 *
 * - adds `Authorization: Bearer <access token>`, refreshing first when it
 *   is about to expire ([SessionManager.accessToken]);
 * - on a 401, refreshes once (single-flight, [SessionManager.refreshAfterRejection])
 *   and retries once with the new token. A second 401 is returned as is;
 * - when [interactive], adds `X-Chaotic-Interactive: 1` to writes (any
 *   method but GET, HEAD and OPTIONS). Everything the app does today is
 *   a person tapping a button; a background writer (an offline queue, a
 *   notification action) should get its own client built with
 *   `interactive = false`, so the server gates it as the agent-like
 *   traffic it is.
 *
 * OkHttp runs interceptors on its own threads, so blocking on the session
 * here does not block the UI.
 */
class AuthInterceptor(private val sessions: SessionManager, private val interactive: Boolean) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val original = chain.request()
        val baseUrl = fromSession { sessions.server() }?.baseUrl
        val ours = baseUrl != null && ServerUrl.isSameOrigin(original.url, baseUrl)
        return if (ours) authenticated(chain, markInteractive(original)) else chain.proceed(original)
    }

    private fun authenticated(chain: Interceptor.Chain, request: Request): Response {
        val token =
            if (request.header(AUTHORIZATION) == null) fromSession { sessions.accessToken() } else null
        return if (token == null) chain.proceed(request) else withRetryOn401(chain, request, token)
    }

    private fun withRetryOn401(chain: Interceptor.Chain, request: Request, token: String): Response {
        val response = chain.proceed(request.withBearer(token))
        // A one-shot body has been consumed and cannot be sent again.
        val retryable = response.code == HTTP_UNAUTHORIZED && request.body?.isOneShot() != true
        val retryToken =
            try {
                if (retryable) fromSession { sessions.refreshAfterRejection(token) } else null
            } catch (e: IOException) {
                response.close()
                throw e
            }
        if (retryToken == null) return response
        response.close()
        return chain.proceed(request.withBearer(retryToken))
    }

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

    private companion object {
        const val AUTHORIZATION = "Authorization"
        const val HTTP_UNAUTHORIZED = 401
        val SAFE_METHODS = setOf("GET", "HEAD", "OPTIONS")
    }
}
