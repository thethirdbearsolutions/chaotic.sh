package sh.chaotic.android.live

import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import sh.chaotic.auth.ws.WsEnd
import sh.chaotic.sync.live.LiveConnector
import sh.chaotic.sync.live.LiveListener
import sh.chaotic.sync.live.LiveSocket
import java.util.concurrent.atomic.AtomicBoolean

/**
 * [LiveConnector] on OkHttp (CHT-1655). [client] carries no credentials of
 * its own: the token goes in the upgrade's Authorization header, so the
 * feed knows which token a 4001 refused. OkHttp's callbacks map to
 * [WsEnd] the way `WsEnd` describes, and only the first end is reported.
 */
class OkHttpLiveConnector(private val client: OkHttpClient) : LiveConnector {
    override fun open(url: String, token: String, listener: LiveListener): LiveSocket {
        val request = Request.Builder().url(url).header("Authorization", "Bearer $token").build()
        val ended = AtomicBoolean(false)
        fun end(end: WsEnd) {
            if (ended.compareAndSet(false, true)) listener.onEnd(end)
        }
        val socket = client.newWebSocket(
            request,
            object : WebSocketListener() {
                override fun onOpen(webSocket: WebSocket, response: Response) = listener.onOpen()

                override fun onMessage(webSocket: WebSocket, text: String) = listener.onMessage(text)

                override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                    webSocket.close(NORMAL_CLOSURE, null)
                    end(WsEnd.Closed(code))
                }

                override fun onClosed(webSocket: WebSocket, code: Int, reason: String) = end(WsEnd.Closed(code))

                override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                    // An HTTP answer instead of 101 is a refused handshake; no answer at all is a lost connection.
                    val refused = response?.takeIf { it.code != SWITCHING_PROTOCOLS }
                    val what = refused?.let { WsEnd.HandshakeRefused(it.code, it.header("Retry-After")) }
                    end(what ?: WsEnd.ConnectionLost)
                }
            },
        )
        return LiveSocket {
            // Ours: nothing more is reported for it.
            ended.set(true)
            socket.cancel()
        }
    }

    private companion object {
        const val NORMAL_CLOSURE = 1000
        const val SWITCHING_PROTOCOLS = 101
    }
}
