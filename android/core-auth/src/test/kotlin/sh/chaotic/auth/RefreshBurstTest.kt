package sh.chaotic.auth

import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import mockwebserver3.RecordedRequest
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.junit.After
import org.junit.Before
import java.io.IOException
import java.util.concurrent.ConcurrentLinkedQueue
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import mockwebserver3.Dispatcher as MockDispatcher

/**
 * PR #363 review, H1: the authenticated client is built from the token
 * endpoint's client, as AuthModule does. A burst of more calls than OkHttp
 * runs per host, all with an expired token, must all complete: the refresh
 * started inside the interceptor must not queue behind the very calls that
 * are waiting for it.
 */
class RefreshBurstTest {
    private lateinit var server: MockWebServer
    private val tokenRequests = AtomicInteger()

    @Before
    fun startServer() {
        server = MockWebServer()
        server.dispatcher =
            object : MockDispatcher() {
                override fun dispatch(request: RecordedRequest): MockResponse = if (request.url.encodedPath ==
                    "/oauth/token"
                ) {
                    tokenRequests.incrementAndGet()
                    json(tokenResponse(access = "at_2", refresh = "rt_2"))
                } else {
                    status(200)
                }
            }
        server.start()
    }

    @After
    fun stopServer() {
        server.close()
    }

    @Test
    fun aBurstWithAnExpiredTokenCompletes() {
        val base = OkHttpClient()
        val sessions =
            SessionManager(InMemoryTokenStore(session(baseUrl = server.baseUrl(), expiresAt = 0)), TokenEndpoint(base))
        val authenticated = base.newBuilder().addInterceptor(AuthInterceptor(sessions, interactive = true)).build()
        val calls = 3 * authenticated.dispatcher.maxRequestsPerHost
        val done = CountDownLatch(calls)
        val codes = ConcurrentLinkedQueue<Int>()

        repeat(calls) {
            authenticated.newCall(Request.Builder().url(server.url("/api/issues/$it")).build()).enqueue(
                object : Callback {
                    override fun onResponse(call: Call, response: Response) {
                        response.use { codes += it.code }
                        done.countDown()
                    }

                    override fun onFailure(call: Call, e: IOException) {
                        done.countDown()
                    }
                },
            )
        }

        assertTrue(
            done.await(20, TimeUnit.SECONDS),
            "the burst deadlocked: ${done.count} of $calls calls never finished",
        )
        assertEquals(List(calls) { 200 }, codes.toList())
        assertEquals(1, tokenRequests.get())
        val authorizations = (1..calls + 1).map { server.takeRequest() }.filter { it.url.encodedPath != "/oauth/token" }
        assertTrue(authorizations.all { it.headers["Authorization"] == "Bearer at_2" })
    }
}
