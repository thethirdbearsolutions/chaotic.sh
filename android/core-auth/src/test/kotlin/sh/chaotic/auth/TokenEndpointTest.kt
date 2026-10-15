package sh.chaotic.auth

import kotlinx.coroutines.test.runTest
import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import okhttp3.OkHttpClient
import org.junit.After
import org.junit.Before
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class TokenEndpointTest {
    private lateinit var server: MockWebServer
    private lateinit var config: ServerConfig
    private val now = 1_000_000L
    private val endpoint = TokenEndpoint(OkHttpClient(), clock = { now })
    private val redirect = "https://chaotic.sh/app/oauth2redirect"

    @Before
    fun startServer() {
        server = MockWebServer()
        server.start()
        config = serverConfig(server.baseUrl())
    }

    @After
    fun stopServer() {
        server.close()
    }

    @Test
    fun exchangesTheCodeAsThePublicBuiltInClient() = runTest {
        server.enqueue(json(tokenResponse(access = "at_1", refresh = "rt_1", expiresIn = 600)))

        val session = endpoint.exchangeCode(config, "code_1", "v".repeat(43), redirect, "Pixel 8")

        val request = server.takeRequest()
        assertEquals("POST", request.method)
        assertEquals("/oauth/token", request.url.encodedPath)
        assertNull(request.url.query, "parameters go in the body, never the URL")
        assertTrue(request.headers["Content-Type"]!!.startsWith("application/x-www-form-urlencoded"))
        assertEquals(
            mapOf(
                "grant_type" to "authorization_code",
                "client_id" to "builtin:sh.chaotic.android",
                "code" to "code_1",
                "code_verifier" to "v".repeat(43),
                "redirect_uri" to redirect,
                "resource" to config.baseUrl,
                "device_name" to "Pixel 8",
            ),
            request.form(),
        )
        assertEquals("at_1", session.accessToken)
        assertEquals("rt_1", session.refreshToken)
        assertEquals(now + 600_000, session.accessTokenExpiresAtMillis)
        assertEquals(now, session.accessTokenIssuedAtMillis)
        assertEquals(Person("u1", "Ada", "ada@example.com"), session.person)
        assertEquals(config, session.server)
    }

    @Test
    fun aBlankDeviceNameIsLeftOut() = runTest {
        server.enqueue(json(tokenResponse(access = "at_1", refresh = "rt_1")))

        endpoint.exchangeCode(config, "code_1", "v".repeat(43), redirect, " ")

        assertFalse("device_name" in server.takeRequest().form())
    }

    @Test
    fun aSessionThatActsAsAnAgentIsRefused() = runTest {
        // Only the built-in client's sessions act as the person; anything
        // else would mean the server is not treating this app as itself.
        server.enqueue(json(tokenResponse(access = "at_1", refresh = "rt_1", actsAs = "agent")))

        val error =
            assertFailsWith<OAuthException> {
                endpoint.exchangeCode(config, "code_1", "v".repeat(43), redirect, null)
            }
        assertEquals("unexpected_session", error.error)
    }

    @Test
    fun aSignInWithoutARefreshTokenIsRefused() = runTest {
        server.enqueue(json(tokenResponse(access = "at_1", refresh = null)))

        assertFailsWith<OAuthException> { endpoint.exchangeCode(config, "c", "v".repeat(43), redirect, null) }
    }

    @Test
    fun refreshRotatesTheRefreshToken() = runTest {
        server.enqueue(json(tokenResponse(access = "at_2", refresh = "rt_2", expiresIn = 600)))
        val old = session(baseUrl = config.baseUrl, accessToken = "at_1", refreshToken = "rt_1", expiresAt = 0)

        val refreshed = endpoint.refresh(old)

        assertEquals(
            mapOf(
                "grant_type" to "refresh_token",
                "client_id" to "builtin:sh.chaotic.android",
                "refresh_token" to "rt_1",
                "resource" to config.baseUrl,
            ),
            server.takeRequest().form(),
        )
        assertEquals("at_2", refreshed.accessToken)
        assertEquals("rt_2", refreshed.refreshToken)
        assertEquals(now + 600_000, refreshed.accessTokenExpiresAtMillis)
    }

    @Test
    fun invalidGrantIsItsOwnError() = runTest {
        server.enqueue(json("""{"error": "invalid_grant", "error_description": "refresh token reused"}""", 400))

        val error = assertFailsWith<InvalidGrantException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }

        assertEquals("refresh token reused", error.description)
    }

    @Test
    fun otherOAuthErrorsCarryTheirCode() = runTest {
        server.enqueue(
            json("""{"error": "invalid_client", "error_description": "unknown or disabled client"}""", 401),
        )

        val error = assertFailsWith<OAuthException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }

        assertEquals("invalid_client", error.error)
    }

    @Test
    fun serverFailuresAreTransientNotRefusals() = runTest {
        server.enqueue(status(502))
        assertFailsWith<TransientServerException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }

        server.enqueue(json("""{"detail": "Too Many Requests"}""", 429))
        assertFailsWith<TransientServerException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }

        server.enqueue(json("<html>proxy error</html>", 400))
        assertFailsWith<TransientServerException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }
    }

    @Test
    fun redirectsAreNotFollowed() = runTest {
        // Following one would resend the refresh token wherever it points.
        server.enqueue(MockResponse.Builder().code(307).addHeader("Location", server.url("/elsewhere")).build())

        assertFailsWith<TransientServerException> { endpoint.refresh(session(baseUrl = config.baseUrl)) }
        assertEquals(1, server.requestCount)
    }

    @Test
    fun revokesTheRefreshToken() = runTest {
        server.enqueue(status(200))

        assertTrue(endpoint.revoke(config, "rt_1"))

        val request = server.takeRequest()
        assertEquals("/oauth/revoke", request.url.encodedPath)
        assertEquals(
            mapOf(
                "token" to "rt_1",
                "token_type_hint" to "refresh_token",
                "client_id" to "builtin:sh.chaotic.android",
            ),
            request.form(),
        )
    }

    @Test
    fun revokeReportsWhatItCouldNotDo() = runTest {
        assertFalse(endpoint.revoke(config.copy(revocationEndpoint = null), "rt_1"))
        assertEquals(0, server.requestCount)

        val gone = config
        server.close()
        assertFalse(endpoint.revoke(gone, "rt_1"))
    }

    @Test
    fun aSessionNeverPrintsItsTokens() {
        val text = session(accessToken = "at_secret", refreshToken = "rt_secret").toString()

        assertFalse("at_secret" in text, text)
        assertFalse("rt_secret" in text, text)
    }
}
