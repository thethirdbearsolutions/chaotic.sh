package sh.chaotic.android.push

import android.content.SharedPreferences
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.sync.Mutex
import kotlinx.coroutines.sync.withLock
import kotlinx.coroutines.withContext
import sh.chaotic.auth.TokenCipher
import sh.chaotic.sync.push.PendingEndpoint
import sh.chaotic.sync.push.PushState
import sh.chaotic.sync.push.PushStateStore
import sh.chaotic.sync.push.PushStatus
import java.security.GeneralSecurityException
import java.util.Base64
import kotlin.coroutines.CoroutineContext

/**
 * [PushState] in the app's private SharedPreferences (excluded from
 * backups and device transfer by `data_extraction_rules.xml`).
 *
 * A pending endpoint is sealed with [cipher] (a Keystore key on the
 * phone): with the endpoint and the subscription's auth secret, anyone
 * could push messages the app would open, so they are never stored in
 * the clear. One that no longer opens (the key was lost) reads as none;
 * the next app start asks the distributor again.
 */
class SharedPrefsPushStateStore(
    private val prefs: SharedPreferences,
    private val cipher: TokenCipher,
    private val ioContext: CoroutineContext = Dispatchers.IO,
) : PushStateStore {
    private val lock = Mutex()

    override suspend fun read(): PushState = lock.withLock { withContext(ioContext) { load() } }

    override suspend fun update(transform: (PushState) -> PushState): PushState = lock.withLock {
        withContext(ioContext) {
            val before = load()
            val after = transform(before)
            if (after != before) save(after)
            after
        }
    }

    private fun load(): PushState = PushState(
        installationId = prefs.getString(INSTALLATION_ID, null),
        status = prefs.getString(STATUS, null)
            ?.let { name -> PushStatus.entries.firstOrNull { it.name == name } }
            ?: PushStatus.NOT_STARTED,
        owner = prefs.getString(OWNER, null),
        vapidKeyId = prefs.getString(VAPID_KEY_ID, null),
        pending = prefs.getString(PENDING, null)?.let(::open),
        noDistributorNoticeShown = prefs.getBoolean(NOTICE_SHOWN, false),
    )

    private fun save(state: PushState) {
        val sealed = state.pending?.let(::seal)
        prefs
            .edit()
            .putString(INSTALLATION_ID, state.installationId)
            .putString(STATUS, state.status.name)
            .putString(OWNER, state.owner)
            .putString(VAPID_KEY_ID, state.vapidKeyId)
            .putString(PENDING, sealed)
            .putBoolean(NOTICE_SHOWN, state.noDistributorNoticeShown)
            .commit()
    }

    private fun seal(pending: PendingEndpoint): String? = try {
        val plain = listOf(pending.url, pending.p256dh, pending.auth).joinToString(SEPARATOR)
        Base64.getEncoder().encodeToString(cipher.encrypt(plain.encodeToByteArray()))
    } catch (_: GeneralSecurityException) {
        // Not kept: the next app start asks the distributor for the endpoint again.
        null
    }

    private fun open(sealed: String): PendingEndpoint? = try {
        val parts = cipher.decrypt(Base64.getDecoder().decode(sealed)).decodeToString().split(SEPARATOR)
        if (parts.size == PARTS) PendingEndpoint(parts[0], parts[1], parts[2]) else null
    } catch (_: GeneralSecurityException) {
        null
    } catch (_: IllegalArgumentException) {
        null
    }

    private companion object {
        const val INSTALLATION_ID = "installation_id"
        const val STATUS = "status"
        const val OWNER = "owner"
        const val VAPID_KEY_ID = "vapid_key_id"
        const val PENDING = "pending_endpoint"
        const val NOTICE_SHOWN = "no_distributor_notice_shown"

        // A newline cannot occur in a URL or in base64url.
        const val SEPARATOR = "\n"
        const val PARTS = 3
    }
}
