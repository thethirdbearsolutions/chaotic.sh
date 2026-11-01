package sh.chaotic.android.live

import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import okhttp3.OkHttpClient
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import org.junit.After
import org.junit.Before
import sh.chaotic.auth.ws.WsEnd
import sh.chaotic.sync.live.LiveListener
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

/** OkHttp's WebSocket callbacks as the live feed's events, over a real handshake (CHT-1655). */
class OkHttpLiveConnectorTest {
    private val server = MockWebServer()
    private val events = LinkedBlockingQueue<Any>()
    private val listener = object : LiveListener {
        override fun onOpen() {
            events += "open"
        }

        override fun onMessage(text: String) {
            events += "message:$text"
        }

        override fun onEnd(end: WsEnd) {
            events += end
        }
    }
    private val connector = OkHttpLiveConnector(OkHttpClient())

    @Before
    fun setUp() {
        server.start()
    }

    @After
    fun tearDown() {
        server.close()
    }

    private fun next(): Any? = events.poll(WAIT_SECONDS, TimeUnit.SECONDS)

    private fun url() = server.url("/ws?team_id=A").toString()

    @Test
    fun aRefusedHandshakeReportsItsStatusAndRetryAfter() {
        server.enqueue(MockResponse.Builder().code(503).addHeader("Retry-After", "7").build())

        connector.open(url(), "t1", listener)

        assertEquals(WsEnd.HandshakeRefused(503, "7"), next())
        assertEquals("Bearer t1", server.takeRequest().headers["Authorization"])
    }

    @Test
    fun aCloseCodeAfterOpenIsReportedOnce() {
        server.enqueue(
            MockResponse.Builder().webSocketUpgrade(
                object : WebSocketListener() {
                    override fun onOpen(webSocket: WebSocket, response: Response) {
                        webSocket.send("""{"entity":"inbox"}""")
                        webSocket.close(4001, null)
                    }
                },
            ).build(),
        )

        connector.open(url(), "t1", listener)

        assertEquals("open", next())
        assertEquals("message:{\"entity\":\"inbox\"}", next())
        assertEquals(WsEnd.Closed(4001), next())
        assertNull(events.poll(QUIET_MILLIS, TimeUnit.MILLISECONDS))
    }

    @Test
    fun noAnswerAtAllIsALostConnection() {
        val port = server.port
        server.close()

        connector.open("http://127.0.0.1:$port/ws?team_id=A", "t1", listener)

        assertEquals(WsEnd.ConnectionLost, next())
    }

    @Test
    fun closingItFromThisSideReportsNothing() {
        val opened = LinkedBlockingQueue<WebSocket>()
        server.enqueue(
            MockResponse.Builder().webSocketUpgrade(
                object : WebSocketListener() {
                    override fun onOpen(webSocket: WebSocket, response: Response) {
                        opened += webSocket
                    }
                },
            ).build(),
        )

        val socket = connector.open(url(), "t1", listener)
        assertEquals("open", next())
        socket.close()

        assertNull(events.poll(QUIET_MILLIS, TimeUnit.MILLISECONDS))
    }

    private companion object {
        const val WAIT_SECONDS = 5L
        const val QUIET_MILLIS = 300L
    }
}
