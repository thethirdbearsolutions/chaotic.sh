package sh.chaotic.android.auth

import android.net.Uri
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues
import sh.chaotic.android.BuildConfig
import sh.chaotic.auth.ChaoticOAuth
import sh.chaotic.auth.ServerConfig

/** The AppAuth side of sign-in: building the request and checking the answer. */
internal object AuthorizationRequests {
    /**
     * The authorization request for [server]: the built-in client, PKCE
     * S256 (AppAuth makes the verifier and challenge), the whole server as
     * the RFC 8707 resource, and `offline_access` for a refresh token.
     * AppAuth adds and later checks `state`.
     */
    fun build(server: ServerConfig): AuthorizationRequest {
        val configuration =
            AuthorizationServiceConfiguration(
                Uri.parse(server.authorizationEndpoint),
                Uri.parse(server.tokenEndpoint),
            )
        return AuthorizationRequest
            .Builder(
                configuration,
                ChaoticOAuth.CLIENT_ID,
                ResponseTypeValues.CODE,
                Uri.parse(BuildConfig.OAUTH_REDIRECT_URI),
            ).setScope(ChaoticOAuth.SCOPE)
            // An OpenID Connect nonce means nothing here: no ID token is issued.
            .setNonce(null)
            .setAdditionalParameters(mapOf("resource" to server.baseUrl))
            .build()
    }

    /**
     * RFC 9207: the server names itself in `iss` on the redirect (it
     * advertises `authorization_response_iss_parameter_supported`). A
     * response from any other issuer is not for this sign-in.
     */
    fun isFrom(server: ServerConfig, response: AuthorizationResponse): Boolean =
        response.additionalParameters["iss"] == server.baseUrl
}
