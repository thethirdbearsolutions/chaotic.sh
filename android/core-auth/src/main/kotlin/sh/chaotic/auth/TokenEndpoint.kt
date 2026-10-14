package sh.chaotic.auth

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import okhttp3.Dispatcher
import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException

/**
 * The token endpoint answered with an RFC 6749 §5.2 error: a definitive
 * refusal, which asking again with the same parameters will not change.
 * The message carries the error code and the server's description, never
 * a token.
 */
open class OAuthException(val error: String, val description: String?) :
    Exception(if (description == null) error else "$error: $description")

/** `invalid_grant`: the code or refresh token is spent, expired or revoked; the device must sign in again. */
class InvalidGrantException(description: String?) : OAuthException("invalid_grant", description)

/** The server failed or is throttling (5xx, 429, or not an OAuth answer at all); worth trying again later. */
class TransientServerException(message: String) : IOException(message)

/** What a [SessionManager] needs from the token endpoint; [TokenEndpoint] in the app. */
interface SessionTokens {
    /** Throws [OAuthException] on a definitive refusal, [IOException] when the server could not answer. */
    suspend fun refresh(session: Session): Session

    suspend fun revoke(server: ServerConfig, token: String): Boolean
}

/**
 * `/oauth/token` and `/oauth/revoke` for the built-in public client
 * (`backend/app/api/oauth.py`): form-encoded bodies, no client secret,
 * PKCE in place of one.
 *
 * [http] must not be the authenticated client: these calls carry their
 * own credentials in the body, and the authenticating interceptor would
 * otherwise try to refresh through itself.
 */
class TokenEndpoint(base: OkHttpClient, private val clock: () -> Long = System::currentTimeMillis) : SessionTokens {
    /**
     * [base]'s connection pool, but its own [Dispatcher]. A refresh is
     * started from inside [AuthInterceptor], which holds one of the
     * authenticated client's dispatcher slots while it waits: if the
     * refresh were queued on that same dispatcher, a burst of requests to
     * the server (OkHttp runs five per host) would fill every slot with
     * callers waiting for a refresh that could never start (PR #363
     * review, H1). Redirects are not followed: a token request answered
     * with a redirect is a misconfigured server, and following one would
     * resend the refresh token to wherever it points.
     */
    private val http: OkHttpClient =
        base
            .newBuilder()
            .dispatcher(Dispatcher())
            .followRedirects(false)
            .followSslRedirects(false)
            .build()

    /**
     * Redeems an authorization code. [deviceName] is what Connected apps
     * will call this device ("Pixel 8"); the server cleans and shortens it.
     */
    suspend fun exchangeCode(
        server: ServerConfig,
        code: String,
        codeVerifier: String,
        redirectUri: String,
        deviceName: String?,
    ): Session {
        val form =
            FormBody
                .Builder()
                .add("grant_type", "authorization_code")
                .add("client_id", ChaoticOAuth.CLIENT_ID)
                .add("code", code)
                .add("code_verifier", codeVerifier)
                .add("redirect_uri", redirectUri)
                .add("resource", server.baseUrl)
        if (!deviceName.isNullOrBlank()) form.add("device_name", deviceName)
        val issuedAt = clock()
        val issued = post(server.tokenEndpoint, form.build())
        val person =
            issued.chaotic?.person?.takeIf { issued.chaotic.actsAs == ACTS_AS_PERSON }
                ?: throw OAuthException("unexpected_session", "the server did not sign this app in as a person")
        val refreshToken =
            issued.refreshToken
                ?: throw OAuthException("unexpected_session", "the server issued no refresh token")
        return Session(
            server = server,
            person = person,
            accessToken = issued.accessToken,
            refreshToken = refreshToken,
            accessTokenExpiresAtMillis = issuedAt + issued.expiresIn * MILLIS_PER_SECOND,
            accessTokenIssuedAtMillis = issuedAt,
        )
    }

    /**
     * Rotates [session]'s refresh token. The server spends the old one, so
     * the session returned here is the only one that will refresh again:
     * it must be stored before it is used.
     */
    override suspend fun refresh(session: Session): Session {
        val form =
            FormBody
                .Builder()
                .add("grant_type", "refresh_token")
                .add("client_id", ChaoticOAuth.CLIENT_ID)
                .add("refresh_token", session.refreshToken)
                .add("resource", session.server.baseUrl)
                .build()
        val issuedAt = clock()
        val issued = post(session.server.tokenEndpoint, form)
        val person = issued.chaotic?.person?.takeIf { issued.chaotic.actsAs == ACTS_AS_PERSON }
        return session.copy(
            person = person ?: session.person,
            accessToken = issued.accessToken,
            // RFC 6749 §6: a server may keep the refresh token; this one rotates it.
            refreshToken = issued.refreshToken ?: session.refreshToken,
            accessTokenExpiresAtMillis = issuedAt + issued.expiresIn * MILLIS_PER_SECOND,
            accessTokenIssuedAtMillis = issuedAt,
        )
    }

    /**
     * RFC 7009: ends the server-side session [token] belongs to (an access
     * or a refresh token, either ends it). Returns whether the server
     * confirmed; false when there is no revocation endpoint or it could not
     * be reached, so the caller can still forget the tokens locally.
     */
    override suspend fun revoke(server: ServerConfig, token: String): Boolean {
        val endpoint = server.revocationEndpoint ?: return false
        val form =
            FormBody
                .Builder()
                .add("token", token)
                .add("token_type_hint", "refresh_token")
                .add("client_id", ChaoticOAuth.CLIENT_ID)
                .build()
        return try {
            http.newCall(Request.Builder().url(endpoint).post(form).build()).await().use { it.isSuccessful }
        } catch (_: IOException) {
            false
        }
    }

    private suspend fun post(endpoint: String, form: FormBody): TokenResponseBody {
        val request =
            Request
                .Builder()
                .url(endpoint)
                .header("Accept", "application/json")
                .post(form)
                .build()
        return http.newCall(request).await().use { response -> parse(response) }
    }

    private companion object {
        const val ACTS_AS_PERSON = "person"
        const val MILLIS_PER_SECOND = 1000L
        const val HTTP_BAD_REQUEST = 400
        const val HTTP_UNAUTHORIZED = 401
        val json = Json { ignoreUnknownKeys = true }

        fun parse(response: Response): TokenResponseBody {
            val body = response.boundedBody()
            if (!response.isSuccessful) throw refusal(response.code, body)
            val issued = decode(TokenResponseBody.serializer(), body)
            if (issued != null && issued.tokenType.equals(
                    "Bearer",
                    ignoreCase = true,
                ) && issued.accessToken.isNotEmpty()
            ) {
                return issued
            }
            throw if (issued == null) {
                TransientServerException("the token endpoint's answer was not a token response")
            } else {
                OAuthException("unexpected_token", "the server issued a ${issued.tokenType} token")
            }
        }

        /**
         * An RFC 6749 §5.2 error is a 400 or 401 with an `error`; anything
         * else (5xx, 429, a proxy's HTML page) is the server failing, not
         * refusing.
         */
        fun refusal(code: Int, body: String): Exception {
            val error =
                decode(TokenErrorBody.serializer(), body)?.takeIf {
                    code == HTTP_BAD_REQUEST || code == HTTP_UNAUTHORIZED
                }
            return when {
                error == null -> TransientServerException("the token endpoint answered $code")
                error.error == "invalid_grant" -> InvalidGrantException(error.description)
                else -> OAuthException(error.error, error.description)
            }
        }

        fun <T> decode(serializer: kotlinx.serialization.KSerializer<T>, body: String): T? = try {
            json.decodeFromString(serializer, body)
        } catch (_: SerializationException) {
            null
        } catch (_: IllegalArgumentException) {
            null
        }
    }
}

@Serializable
private data class TokenResponseBody(
    @SerialName("access_token") val accessToken: String,
    @SerialName("token_type") val tokenType: String,
    @SerialName("expires_in") val expiresIn: Long,
    @SerialName("refresh_token") val refreshToken: String? = null,
    val chaotic: TokenConnection? = null,
)

@Serializable
private data class TokenConnection(@SerialName("acts_as") val actsAs: String? = null, val person: Person? = null)

@Serializable
private data class TokenErrorBody(val error: String, @SerialName("error_description") val description: String? = null)
