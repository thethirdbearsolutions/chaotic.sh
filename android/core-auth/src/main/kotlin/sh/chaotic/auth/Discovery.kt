package sh.chaotic.auth

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import okhttp3.HttpUrl
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import java.io.IOException

/**
 * The parts of a server's RFC 8414 metadata the app uses, and what is kept
 * of it in the session: the endpoints to refresh and revoke at must not
 * need another discovery round trip.
 */
@Serializable
data class ServerConfig(
    /** The server's base URL, which is also its OAuth issuer and the app's RFC 8707 resource. */
    val baseUrl: String,
    val authorizationEndpoint: String,
    val tokenEndpoint: String,
    /** Absent on a server that cannot revoke; sign-out then only forgets the tokens. */
    val revocationEndpoint: String? = null,
)

/** The outcome of looking a server up. */
sealed interface DiscoveryResult {
    data class Found(val server: ServerConfig) : DiscoveryResult

    /** The metadata document is 404: the server runs with OAuth off. */
    data object OAuthDisabled : DiscoveryResult

    /** The server answered with something the app cannot sign in with; [message] is for the person. */
    data class Unusable(val message: String) : DiscoveryResult

    /** The server could not be reached, or failed (5xx); worth trying again. */
    data class Unreachable(val message: String) : DiscoveryResult
}

@Serializable
private data class AuthorizationServerMetadata(
    val issuer: String? = null,
    @SerialName("authorization_endpoint") val authorizationEndpoint: String? = null,
    @SerialName("token_endpoint") val tokenEndpoint: String? = null,
    @SerialName("revocation_endpoint") val revocationEndpoint: String? = null,
    @SerialName("code_challenge_methods_supported") val codeChallengeMethods: List<String> = emptyList(),
)

/** Fetches and checks `/.well-known/oauth-authorization-server` (RFC 8414). */
class OAuthDiscovery(private val http: OkHttpClient) {
    suspend fun discover(baseUrl: String): DiscoveryResult {
        val request =
            Request
                .Builder()
                .url(baseUrl + WELL_KNOWN_PATH)
                .header("Accept", "application/json")
                .build()
        val response =
            try {
                http.newCall(request).await()
            } catch (e: IOException) {
                return DiscoveryResult.Unreachable("Could not reach $baseUrl (${e.javaClass.simpleName}).")
            }
        return response.use {
            when {
                it.code == HTTP_NOT_FOUND -> DiscoveryResult.OAuthDisabled

                it.code >= HTTP_SERVER_ERROR ->
                    DiscoveryResult.Unreachable("$baseUrl answered ${it.code}; try again in a moment.")

                !it.isSuccessful -> DiscoveryResult.Unusable("$baseUrl answered ${it.code} to the sign-in lookup.")

                else -> parse(baseUrl, it.boundedBody())
            }
        }
    }

    companion object {
        const val WELL_KNOWN_PATH = "/.well-known/oauth-authorization-server"

        /** Shown when the metadata document is 404 (CHT-1610). */
        const val OAUTH_DISABLED_MESSAGE =
            "This server has OAuth turned off; ask its admin to set OAUTH_ENABLED and APP_BASE_URL."

        private const val HTTP_NOT_FOUND = 404
        private const val HTTP_SERVER_ERROR = 500
        private val json = Json { ignoreUnknownKeys = true }

        /**
         * Checks a metadata document fetched from [baseUrl]. The issuer must
         * be exactly [baseUrl] (RFC 8414 §3.3): a server whose APP_BASE_URL
         * differs from the address typed is named, so the person can type
         * that instead. The endpoints must be on the same origin, and
         * PKCE S256 must be supported.
         */
        fun parse(baseUrl: String, body: String): DiscoveryResult {
            val metadata =
                try {
                    json.decodeFromString(AuthorizationServerMetadata.serializer(), body)
                } catch (_: SerializationException) {
                    null
                } catch (_: IllegalArgumentException) {
                    null
                }
            val issuer = metadata?.issuer
            return when {
                metadata == null -> DiscoveryResult.Unusable("$baseUrl does not look like a Chaotic server.")

                issuer == null -> DiscoveryResult.Unusable("$baseUrl did not say what its address is.")

                issuer != baseUrl ->
                    DiscoveryResult.Unusable("This server's address is $issuer. Enter that instead.")

                "S256" !in metadata.codeChallengeMethods ->
                    DiscoveryResult.Unusable("$baseUrl does not support PKCE S256, which the app requires.")

                else -> endpoints(baseUrl, metadata)
            }
        }

        private fun endpoints(baseUrl: String, metadata: AuthorizationServerMetadata): DiscoveryResult {
            val authorize = sameOrigin(baseUrl, metadata.authorizationEndpoint)
            val token = sameOrigin(baseUrl, metadata.tokenEndpoint)
            if (authorize == null || token == null) {
                return DiscoveryResult.Unusable("$baseUrl advertises sign-in endpoints the app will not use.")
            }
            return DiscoveryResult.Found(
                ServerConfig(
                    baseUrl = baseUrl,
                    authorizationEndpoint = authorize.toString(),
                    tokenEndpoint = token.toString(),
                    revocationEndpoint = sameOrigin(baseUrl, metadata.revocationEndpoint)?.toString(),
                ),
            )
        }

        /**
         * [endpoint] parsed, if it is on [baseUrl]'s origin. The origin
         * includes the scheme, and [ServerUrl.normalize] only makes https
         * base URLs, so this also keeps every endpoint on https.
         */
        private fun sameOrigin(baseUrl: String, endpoint: String?): HttpUrl? {
            val url = endpoint?.toHttpUrlOrNull() ?: return null
            return url.takeIf { ServerUrl.isSameOrigin(it, baseUrl) }
        }
    }
}
