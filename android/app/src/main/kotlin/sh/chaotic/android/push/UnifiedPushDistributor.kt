package sh.chaotic.android.push

import android.app.Activity
import android.content.Context
import kotlinx.coroutines.suspendCancellableCoroutine
import org.unifiedpush.android.connector.INSTANCE_DEFAULT
import org.unifiedpush.android.connector.UnifiedPush
import org.unifiedpush.android.connector.UnifiedPush.VapidNotValidException
import sh.chaotic.android.R
import sh.chaotic.sync.push.PushDistributor
import kotlin.coroutines.resume

/**
 * The UnifiedPush connector library as [PushDistributor] (CHT-1612). The
 * connector makes the Web Push keys for the subscription, keeps the
 * private key sealed by an Android Keystore key, and decrypts messages
 * before they reach [ChaoticPushService]. One instance: the app is signed
 * in to one server as one person at a time.
 */
class UnifiedPushDistributor(private val context: Context) : PushDistributor {
    override fun register(vapidPublicKey: String): Boolean = try {
        UnifiedPush.register(
            context,
            INSTANCE_DEFAULT,
            messageForDistributor = context.getString(R.string.app_name),
            vapid = vapidPublicKey,
        )
        true
    } catch (_: VapidNotValidException) {
        // The server's key is not an uncompressed P-256 point: nothing to register under.
        false
    }

    override fun unregister() {
        UnifiedPush.unregister(context, INSTANCE_DEFAULT)
    }

    companion object {
        /**
         * Whether a distributor is ready to use, picking one if needed: the
         * one already acknowledged, else the person's default (the system
         * may ask them to choose, once). False when none is installed or
         * the person chose none.
         */
        suspend fun pick(activity: Activity): Boolean = when {
            UnifiedPush.getAckDistributor(activity) != null -> true

            UnifiedPush.getDistributors(activity).isEmpty() -> false

            else -> suspendCancellableCoroutine { continuation ->
                UnifiedPush.tryUseCurrentOrDefaultDistributor(activity) { ok ->
                    if (continuation.isActive) continuation.resume(ok)
                }
            }
        }
    }
}
