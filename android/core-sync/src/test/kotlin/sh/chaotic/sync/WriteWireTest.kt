package sh.chaotic.sync

import io.ktor.client.engine.okhttp.OkHttp
import kotlinx.coroutines.runBlocking
import kotlinx.serialization.json.JsonObject
import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import okhttp3.OkHttpClient
import org.junit.After
import org.junit.Before
import sh.chaotic.auth.AuthInterceptor
import sh.chaotic.auth.InMemoryTokenStore
import sh.chaotic.auth.Person
import sh.chaotic.auth.ServerConfig
import sh.chaotic.auth.Session
import sh.chaotic.auth.SessionManager
import sh.chaotic.auth.SessionTokens
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull

/**
 * A queued write on the wire, through the app's real stack: [ApiRemote]
 * on Ktor's OkHttp engine with [AuthInterceptor], against a local server
 * (CHT-1613). The unit tests elsewhere use a mock engine, which never runs
 * the interceptor.
 */
class WriteWireTest {
    private lateinit var server: MockWebServer
    private lateinit var sessions: SessionManager
    private lateinit var api: ApiRemote

    private val tokens = object : SessionTokens {
        override suspend fun refresh(session: Session) = session

        override suspend fun revoke(server: ServerConfig, token: String) = true
    }

    private fun session(personId: String) = Session(
        server = ServerConfig(baseUrl(), "${baseUrl()}/oauth/authorize", "${baseUrl()}/oauth/token"),
        person = Person(personId, personId, "$personId@example.com"),
        accessToken = "at_$personId",
        refreshToken = "rt_$personId",
        accessTokenExpiresAtMillis = Long.MAX_VALUE,
    )

    private fun baseUrl() = server.url("/").toString().removeSuffix("/")

    private fun owner(personId: String) = SessionManager.ownerKey(baseUrl(), personId)

    @Before
    fun start() {
        server = MockWebServer().apply { start() }
        sessions = SessionManager(InMemoryTokenStore(session("ada")), tokens)
        val client = OkHttpClient.Builder().addInterceptor(AuthInterceptor(sessions, interactive = true)).build()
        api = ApiRemote(baseUrl(), OkHttp.create { preconfigured = client })
    }

    @After
    fun stop() {
        api.close()
        server.close()
    }

    @Test
    fun aWriteGoesOutInteractiveAsItsOwnerWithItsKey() = runBlocking {
        server.enqueue(MockResponse.Builder().code(200).body("{}").build())

        val answer = api.act("/api/inbox/e1/read", JsonObject(emptyMap()), WriteOrigin("k1", owner("ada")))

        assertEquals(Remote.Ok(Unit), answer)
        val sent = server.takeRequest()
        assertEquals("Bearer at_ada", sent.headers["Authorization"])
        assertEquals("1", sent.headers["X-Chaotic-Interactive"])
        assertEquals("k1", sent.headers["Idempotency-Key"])
        assertNull(sent.headers[AuthInterceptor.EXPECT_OWNER_HEADER])
    }

    @Test
    fun aWriteQueuedBySomeoneElseIsNeverSent() = runBlocking {
        sessions.signedIn(session("bob"))

        val answer = api.act("/api/inbox/e1/read", JsonObject(emptyMap()), WriteOrigin("k1", owner("ada")))

        assertEquals(401, assertIs<Remote.HttpError>(answer).status)
        assertEquals(0, server.requestCount)
    }
}
