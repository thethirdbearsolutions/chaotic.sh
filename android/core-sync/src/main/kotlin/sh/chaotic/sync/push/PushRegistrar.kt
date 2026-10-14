package sh.chaotic.sync.push

import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import sh.chaotic.sync.Remote
import java.util.UUID

/** Where push stands on this device. Only [ACTIVE] stops the poll fallback. */
enum class PushStatus {
    /** Signed out, or not tried yet since signing in. */
    NOT_STARTED,

    /** No UnifiedPush distributor is installed (or the person picked none). */
    NO_DISTRIBUTOR,

    /** The distributor was asked for an endpoint, or the server has not yet accepted it. */
    REGISTERING,

    /** The server has this device's endpoint: pushes arrive. */
    ACTIVE,

    /** The distributor's server is down for now; it sends a new endpoint when it is back. */
    TEMPORARILY_UNAVAILABLE,

    /** The distributor or the server refused the registration; the next app start tries again. */
    FAILED,
}

/** An endpoint the distributor gave that the server has not accepted yet. */
data class PendingEndpoint(val url: String, val p256dh: String, val auth: String) {
    override fun toString() = "PendingEndpoint(url=<redacted>)"
}

/**
 * What the app remembers about push between launches. Nothing secret:
 * the subscription's private key stays in the UnifiedPush connector's
 * Keystore-sealed store; [pending] holds only the public half.
 */
data class PushState(
    /** This installation's id on the server; a new one after every sign-out. */
    val installationId: String? = null,
    val status: PushStatus = PushStatus.NOT_STARTED,
    /** Whose device the server has it as ([sh.chaotic.sync.CacheSession.ownerKey]); null until accepted. */
    val owner: String? = null,
    /** The VAPID key id the distributor was last asked to subscribe under. */
    val vapidKeyId: String? = null,
    val pending: PendingEndpoint? = null,
    /** The "no distributor" explanation was shown; it is shown once. */
    val noDistributorNoticeShown: Boolean = false,
)

/** Keeps [PushState]. [update] is atomic: concurrent updates never lose one another's change. */
interface PushStateStore {
    suspend fun read(): PushState

    suspend fun update(transform: (PushState) -> PushState): PushState
}

/** A process-lifetime store, for tests. */
class InMemoryPushStateStore(private var state: PushState = PushState()) : PushStateStore {
    private val lock = Mutex()

    override suspend fun read(): PushState = lock.withLock { state }

    override suspend fun update(transform: (PushState) -> PushState): PushState =
        lock.withLock { transform(state).also { state = it } }
}

/** The UnifiedPush distributor as the registrar drives it. */
interface PushDistributor {
    /** Ask for an endpoint (again); the answer comes to [PushRegistrar.onEndpoint]. */
    fun register(vapidPublicKey: String)

    /** Stop: the distributor drops the endpoint, and the connector its keys. */
    fun unregister()
}

/**
 * Registers this device for push (CHT-1612) and keeps the registration
 * current:
 *
 * - [start], on every app start while signed in: with a distributor,
 *   fetch the server's VAPID key and ask the distributor for an endpoint
 *   under it (it answers with the same endpoint when nothing changed). A
 *   VAPID key that changed on the server means a new subscription, so the
 *   old one is dropped first.
 * - [onEndpoint]: the distributor's endpoint and keys, kept as pending
 *   and then PUT to the server ([flushPending]; also run by a worker when
 *   the PUT could not be made then). The PUT is idempotent, so a new
 *   endpoint (another distributor, or the same one re-registering) simply
 *   replaces the old.
 * - [onUnregistered], [onRegistrationFailed], [onTemporarilyUnavailable]:
 *   the distributor's other answers. Each leaves push not [PushStatus.ACTIVE],
 *   so the poll fallback runs ([pollFallback]).
 * - [signedOut]: drop the subscription and start the next sign-in with a
 *   new installation id. The server side needs nothing: revoking the
 *   session deleted the device (CHT-1625).
 */
class PushRegistrar(
    private val remote: PushRemote,
    private val store: PushStateStore,
    private val distributor: PushDistributor,
    private val currentOwner: () -> String?,
    private val label: () -> String? = { null },
    private val newInstallationId: () -> String = { UUID.randomUUID().toString() },
) {
    private val flushLock = Mutex()

    suspend fun start(distributorAvailable: Boolean): PushStatus {
        val owner = currentOwner() ?: return PushStatus.NOT_STARTED
        if (!distributorAvailable) {
            return store.update { it.copy(status = PushStatus.NO_DISTRIBUTOR) }.status
        }
        // Not reachable now: keep what there is; the next start tries again.
        val key = (remote.vapidKey() as? Remote.Ok)?.value ?: return store.read().status
        val before = store.read()
        if (before.vapidKeyId != null && before.vapidKeyId != key.keyId) distributor.unregister()
        val state = store.update {
            val stillActive = it.status == PushStatus.ACTIVE && it.owner == owner && it.vapidKeyId == key.keyId
            it.copy(
                installationId = it.installationId ?: newInstallationId(),
                status = if (stillActive) PushStatus.ACTIVE else PushStatus.REGISTERING,
                vapidKeyId = key.keyId,
            )
        }
        distributor.register(key.publicKey)
        return state.status
    }

    /** The distributor's endpoint: kept, then registered with the server. */
    suspend fun onEndpoint(url: String, p256dh: String, auth: String): FlushResult {
        store.update { it.copy(pending = PendingEndpoint(url, p256dh, auth)) }
        return flushPending()
    }

    /** PUT the pending endpoint, if there is one. Single-flight. */
    suspend fun flushPending(): FlushResult = flushLock.withLock {
        val owner = currentOwner() ?: return@withLock FlushResult.NOT_SIGNED_IN
        val state = store.update { it.copy(installationId = it.installationId ?: newInstallationId()) }
        val pending = state.pending ?: return@withLock FlushResult.NOTHING_PENDING
        val result = remote.register(
            checkNotNull(state.installationId),
            PushDevice(pending.url, pending.p256dh, pending.auth, label()),
        )
        when {
            // Signed out, or someone else signed in, while the PUT was on its way.
            currentOwner() != owner -> FlushResult.NOT_SIGNED_IN

            result is Remote.Ok -> {
                store.update {
                    if (it.pending != pending) it else it.copy(status = PushStatus.ACTIVE, owner = owner, pending = null)
                }
                FlushResult.REGISTERED
            }

            result is Remote.HttpError && result.status == HTTP_UNAUTHORIZED -> FlushResult.NOT_SIGNED_IN

            // 409 too many devices, 422 an endpoint or keys the server will not take: retrying will not help.
            result is Remote.HttpError && result.status in HTTP_CLIENT_ERRORS && result.status !in HTTP_RETRYABLE -> {
                store.update { if (it.pending != pending) it else it.copy(status = PushStatus.FAILED, pending = null) }
                FlushResult.REFUSED
            }

            else -> FlushResult.RETRY
        }
    }

    suspend fun onRegistrationFailed() {
        store.update { it.copy(status = PushStatus.FAILED, pending = null) }
    }

    suspend fun onTemporarilyUnavailable() {
        store.update { if (it.status == PushStatus.ACTIVE) it.copy(status = PushStatus.TEMPORARILY_UNAVAILABLE) else it }
    }

    /** The distributor dropped this app (uninstalled, or the person removed it): tell the server too. */
    suspend fun onUnregistered() {
        val state = store.update { it.copy(status = PushStatus.NOT_STARTED, owner = null, pending = null) }
        val id = state.installationId ?: return
        if (currentOwner() != null) remote.unregister(id)
    }

    suspend fun signedOut() {
        distributor.unregister()
        store.update { PushState(noDistributorNoticeShown = it.noDistributorNoticeShown) }
    }

    /** Whether to show the "no distributor" explanation now; true once, then never again. */
    suspend fun takeNoDistributorNotice(): Boolean {
        var show = false
        store.update {
            show = it.status == PushStatus.NO_DISTRIBUTOR && !it.noDistributorNoticeShown
            if (show) it.copy(noDistributorNoticeShown = true) else it
        }
        return show
    }

    enum class FlushResult { REGISTERED, NOTHING_PENDING, NOT_SIGNED_IN, REFUSED, RETRY }

    companion object {
        private const val HTTP_UNAUTHORIZED = 401
        private val HTTP_CLIENT_ERRORS = 400..499

        /** Request Timeout and Too Many Requests: worth another try later. */
        private val HTTP_RETRYABLE = setOf(408, 429)

        /**
         * Whether to poll in the background: signed in, and push is not
         * known to work for this person. A device registered for someone
         * else (the previous sign-in) counts as not working.
         */
        fun pollFallback(state: PushState, owner: String?): Boolean =
            owner != null && !(state.status == PushStatus.ACTIVE && state.owner == owner)

        /** The background poll's period without push: WorkManager's shortest. */
        const val FALLBACK_INTERVAL_MINUTES = 15L
    }
}
