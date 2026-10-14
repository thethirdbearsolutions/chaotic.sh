package sh.chaotic.android.push

import kotlinx.coroutines.launch
import org.unifiedpush.android.connector.FailedReason
import org.unifiedpush.android.connector.PushService
import org.unifiedpush.android.connector.data.PushEndpoint
import org.unifiedpush.android.connector.data.PushMessage
import sh.chaotic.sync.push.PushRegistrar

/**
 * Where the UnifiedPush distributor's events arrive (CHT-1612), already
 * decrypted by the connector. Each is handed to core-sync's push logic on
 * the application scope, after loading the session: a push can start the
 * process, and nothing is shown or registered for a session not yet read.
 * Nothing here logs an endpoint, a key or a message.
 */
class ChaoticPushService : PushService() {
    private val deps by lazy { applicationContext.pushEntryPoint() }

    private fun work(block: suspend () -> Unit) {
        deps.scope().launch {
            deps.sessions().load()
            block()
        }
    }

    override fun onNewEndpoint(endpoint: PushEndpoint, instance: String) {
        // Without the subscription's keys the server cannot encrypt to this device, and refuses it.
        val keys = endpoint.pubKeySet ?: return
        work {
            val result = deps.registrar().onEndpoint(endpoint.url, keys.pubKey, keys.auth)
            // The server could not be told now: the sync worker tries again when there is a network.
            if (result == PushRegistrar.FlushResult.RETRY) PushWork.syncSoon(applicationContext)
            deps.controller().updateSchedule()
        }
    }

    override fun onMessage(message: PushMessage, instance: String) {
        work { deps.handler().onMessage(message.content, message.decrypted) }
    }

    override fun onRegistrationFailed(reason: FailedReason, instance: String) {
        work {
            deps.registrar().onRegistrationFailed()
            deps.controller().updateSchedule()
        }
    }

    override fun onUnregistered(instance: String) {
        work {
            deps.registrar().onUnregistered()
            deps.controller().updateSchedule()
        }
    }

    override fun onTempUnavailable(instance: String) {
        work {
            deps.registrar().onTemporarilyUnavailable()
            deps.controller().updateSchedule()
        }
    }
}
