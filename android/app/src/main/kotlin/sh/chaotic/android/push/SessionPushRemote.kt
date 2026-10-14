package sh.chaotic.android.push

import io.ktor.client.engine.HttpClientEngine
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.Remote
import sh.chaotic.sync.push.ApiPushRemote
import sh.chaotic.sync.push.PushDevice
import sh.chaotic.sync.push.PushRemote
import sh.chaotic.sync.push.VapidKey

/**
 * [PushRemote] for whichever server the device is signed in to, like
 * [sh.chaotic.android.data.SessionRemote]: signed out, every call is a 401.
 */
class SessionPushRemote(private val sessions: SessionManager, private val engine: HttpClientEngine) : PushRemote {
    private val mutex = Mutex()
    private var current: Pair<String, ApiPushRemote>? = null

    private suspend fun remote(): ApiPushRemote? {
        val baseUrl = sessions.server()?.baseUrl ?: return null
        return mutex.withLock {
            current?.takeIf { it.first == baseUrl }?.second
                ?: ApiPushRemote(baseUrl, engine).also { current = baseUrl to it }
        }
    }

    private suspend fun <T> call(block: suspend ApiPushRemote.() -> Remote<T>): Remote<T> =
        remote()?.block() ?: Remote.HttpError(HTTP_UNAUTHORIZED)

    override suspend fun vapidKey(): Remote<VapidKey> = call { vapidKey() }

    override suspend fun register(installationId: String, device: PushDevice): Remote<Unit> =
        call { register(installationId, device) }

    override suspend fun unregister(installationId: String): Remote<Unit> = call { unregister(installationId) }

    override suspend fun preferences(): Remote<Map<String, Boolean>> = call { preferences() }

    private companion object {
        const val HTTP_UNAUTHORIZED = 401
    }
}
