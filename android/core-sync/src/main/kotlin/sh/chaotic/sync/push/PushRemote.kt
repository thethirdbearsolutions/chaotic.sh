package sh.chaotic.sync.push

import io.ktor.client.engine.HttpClientEngine
import sh.chaotic.api.apis.PushApi
import sh.chaotic.api.client.ChaoticApi
import sh.chaotic.api.models.PushDeviceRegister
import sh.chaotic.sync.Remote
import sh.chaotic.sync.apiCall
import sh.chaotic.sync.apiStatus

/** The server's VAPID public key (base64url, the uncompressed point) and its fingerprint. */
data class VapidKey(val publicKey: String, val keyId: String)

/** What the app registers for this installation: the distributor's endpoint and the subscription's keys. */
data class PushDevice(val endpoint: String, val p256dh: String, val auth: String, val label: String? = null) {
    // The endpoint is a capability: anyone holding it can push to the phone.
    override fun toString() = "PushDevice(endpoint=<redacted>, label=$label)"
}

/** The /api/push calls the app makes, as the signed-in person (CHT-1604). */
interface PushRemote {
    suspend fun vapidKey(): Remote<VapidKey>

    /** PUT /api/push/devices/{installation_id}: register or replace. */
    suspend fun register(installationId: String, device: PushDevice): Remote<Unit>

    /** DELETE /api/push/devices/{installation_id}. A 404 (already gone) is as good as done. */
    suspend fun unregister(installationId: String): Remote<Unit>

    /** Every inbox kind, and whether the person has it pushed. */
    suspend fun preferences(): Remote<Map<String, Boolean>>
}

/** [PushRemote] on the generated client. */
class ApiPushRemote(
    baseUrl: String,
    engine: HttpClientEngine,
    private val nowMillis: () -> Long = System::currentTimeMillis,
) : PushRemote {
    private val api = PushApi(baseUrl, engine, ChaoticApi.clientConfig)

    override suspend fun vapidKey(): Remote<VapidKey> =
        apiCall(nowMillis, { api.getVapidPublicKeyApiPushVapidPublicKeyGet() }) { VapidKey(it.publicKey, it.keyId) }

    // The answer's body is not read: a newer server's device shape must not make a success look like a failure.
    override suspend fun register(installationId: String, device: PushDevice): Remote<Unit> = apiStatus(nowMillis) {
        api.registerPushDeviceApiPushDevicesInstallationIdPut(
            installationId,
            // transport is left out: web_push is the server's default and only value.
            PushDeviceRegister(
                endpoint = device.endpoint,
                p256dh = device.p256dh,
                auth = device.auth,
                platform = PLATFORM,
                label = device.label?.take(MAX_LABEL_CHARS),
            ),
        )
    }

    override suspend fun unregister(installationId: String): Remote<Unit> {
        val result = apiStatus(nowMillis) { api.deletePushDeviceApiPushDevicesInstallationIdDelete(installationId) }
        return if (result is Remote.HttpError && result.status == HTTP_NOT_FOUND) Remote.Ok(Unit) else result
    }

    override suspend fun preferences(): Remote<Map<String, Boolean>> =
        apiCall(nowMillis, { api.getPushPreferencesApiPushPreferencesGet() }) { it.kinds }

    private companion object {
        const val PLATFORM = "android"

        /** The server's limit on a device label. */
        const val MAX_LABEL_CHARS = 100
        const val HTTP_NOT_FOUND = 404
    }
}
