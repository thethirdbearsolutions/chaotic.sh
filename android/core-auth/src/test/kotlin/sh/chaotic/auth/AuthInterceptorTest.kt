package sh.chaotic.auth

import mockwebserver3.MockWebServer
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.junit.After
import org.junit.Before
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

class AuthInterceptorTest {
    private lateinit var server: MockWebServer
    private lateinit var other: MockWebServer
    private var refreshes = 0

    private val tokens =
        object : SessionTokens {
            override suspend fun refresh(session: Session): Session {
                refreshes++
                return session.copy(
                    accessToken = "at_2",
                    refreshToken = "rt_2",
                    accessTokenExpiresAtMillis = Long.MAX_VALUE,
                )
            }

            override suspend fun revoke(server: ServerConfig, token: String) = true
        }

    @Before
    fun startServers() {
        server = MockWebServer().apply { start() }
        other = MockWebServer().apply { start() }
    }

    @After
    fun stopServers() {
        server.close()
        other.close()
    }

    private fun client(
        stored: Session? = session(baseUrl = server.baseUrl()),
        interactive: Boolean = true,
    ): OkHttpClient {
        val sessions = SessionManager(InMemoryTokenStore(stored), tokens)
        return OkHttpClient.Builder().addInterceptor(AuthInterceptor(sessions, interactive)).build()
    }

    private fun OkHttpClient.get(url: String) = newCall(Request.Builder().url(url).build()).execute().use { it.code }

    private fun OkHttpClient.post(url: String) =
        newCall(Request.Builder().url(url).post("{}".toRequestBody("application/json".toMediaType())).build())
            .execute()
            .use { it.code }

    @Test
    fun addsTheBearerTokenForTheSignedInServer() {
        server.enqueue(status(200))

        assertEquals(200, client().get(server.url("/api/auth/me").toString()))

        assertEquals("Bearer at_1", server.takeRequest().headers["Authorization"])
    }

    @Test
    fun neverSendsTheTokenToAnotherOrigin() {
        other.enqueue(status(200))

        client().get(other.url("/avatar.png").toString())

        assertNull(other.takeRequest().headers["Authorization"])
    }

    @Test
    fun signedOutRequestsGoOutBare() {
        server.enqueue(status(401))

        assertEquals(401, client(stored = null).get(server.url("/api/auth/me").toString()))

        assertNull(server.takeRequest().headers["Authorization"])
    }

    @Test
    fun a401RefreshesOnceAndRetries() {
        server.enqueue(status(401))
        server.enqueue(status(200))

        assertEquals(200, client().get(server.url("/api/auth/me").toString()))

        assertEquals("Bearer at_1", server.takeRequest().headers["Authorization"])
        assertEquals("Bearer at_2", server.takeRequest().headers["Authorization"])
        assertEquals(1, refreshes)
    }

    @Test
    fun aSecond401IsReturned() {
        server.enqueue(status(401))
        server.enqueue(status(401))

        assertEquals(401, client().get(server.url("/api/auth/me").toString()))

        assertEquals(2, server.requestCount)
    }

    @Test
    fun anExpiredTokenIsRefreshedBeforeTheRequest() {
        server.enqueue(status(200))

        client(stored = session(baseUrl = server.baseUrl(), expiresAt = 0)).get(server.url("/api/x").toString())

        assertEquals("Bearer at_2", server.takeRequest().headers["Authorization"])
        assertEquals(1, server.requestCount)
    }

    @Test
    fun writesAreMarkedInteractiveAndReadsAreNot() {
        server.enqueue(status(200))
        server.enqueue(status(200))

        val client = client()
        client.get(server.url("/api/issues").toString())
        client.post(server.url("/api/issues").toString())

        assertNull(server.takeRequest().headers["X-Chaotic-Interactive"])
        assertEquals("1", server.takeRequest().headers["X-Chaotic-Interactive"])
    }

    @Test
    fun aBackgroundClientIsNotInteractive() {
        server.enqueue(status(200))

        client(interactive = false).post(server.url("/api/issues").toString())

        assertNull(server.takeRequest().headers["X-Chaotic-Interactive"])
    }

    @Test
    fun anExplicitAuthorizationIsLeftAlone() {
        server.enqueue(status(200))

        client()
            .newCall(Request.Builder().url(server.url("/api/x")).header("Authorization", "Bearer mine").build())
            .execute()
            .close()

        assertEquals("Bearer mine", server.takeRequest().headers["Authorization"])
    }
}
