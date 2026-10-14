package sh.chaotic.auth

import kotlinx.coroutines.suspendCancellableCoroutine
import okhttp3.Call
import okhttp3.Callback
import okhttp3.Response
import java.io.IOException
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

/** Runs an OkHttp call without blocking the caller's thread; cancelling the coroutine cancels the call. */
internal suspend fun Call.await(): Response = suspendCancellableCoroutine { continuation ->
    continuation.invokeOnCancellation { cancel() }
    enqueue(
        object : Callback {
            override fun onResponse(call: Call, response: Response) {
                continuation.resume(response) { _, value, _ -> value.close() }
            }

            override fun onFailure(call: Call, e: IOException) {
                continuation.resumeWithException(e)
            }
        },
    )
}

/** Responses that are documents (discovery, the token endpoint) are small; anything larger is not one. */
internal const val MAX_DOCUMENT_BYTES = 64L * 1024

internal fun Response.boundedBody(): String = peekBody(MAX_DOCUMENT_BYTES).string()
