package sh.chaotic.sync.push

import kotlinx.coroutines.flow.Flow
import kotlin.coroutines.cancellation.CancellationException

/**
 * Run [block], handing an exception from it to [onError] instead of
 * throwing (CHT-1612). Push work runs on long-lived scopes where one
 * failure (an OEM's NotificationManager, a Keystore key gone bad) must
 * not end the work that comes after it. Cancellation is not a failure and
 * still propagates.
 */
@Suppress("TooGenericExceptionCaught") // any failure, never a crash: that is the point
suspend fun <T> guarded(onError: (Exception) -> Unit, block: suspend () -> T): T? = try {
    block()
} catch (e: CancellationException) {
    throw e
} catch (e: Exception) {
    onError(e)
    null
}

/**
 * Collect every value, running [action] on each under [guarded]: a value
 * whose handling throws is reported to [onError] and the collection goes
 * on to the next, where a plain `collect` would end for good.
 */
suspend fun <T> Flow<T>.collectGuarded(onError: (Exception) -> Unit, action: suspend (T) -> Unit) =
    collect { value -> guarded(onError) { action(value) } }
