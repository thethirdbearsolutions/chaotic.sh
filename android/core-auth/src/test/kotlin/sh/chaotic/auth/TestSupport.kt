package sh.chaotic.auth

import mockwebserver3.MockResponse
import mockwebserver3.MockWebServer
import mockwebserver3.RecordedRequest
import java.net.URLDecoder

internal fun MockWebServer.baseUrl(): String = url("/").toString().removeSuffix("/")

internal fun json(body: String, code: Int = 200): MockResponse = MockResponse
    .Builder()
    .code(code)
    .addHeader("Content-Type", "application/json")
    .body(body)
    .build()

internal fun status(code: Int): MockResponse = MockResponse.Builder().code(code).build()

internal fun RecordedRequest.bodyText(): String = body?.utf8().orEmpty()

/** The form fields of a form-encoded request body. */
internal fun RecordedRequest.form(): Map<String, String> = bodyText()
    .split('&')
    .filter { it.isNotEmpty() }
    .associate { pair ->
        val (name, value) = pair.split('=', limit = 2)
        URLDecoder.decode(name, "UTF-8") to URLDecoder.decode(value, "UTF-8")
    }

internal fun serverConfig(baseUrl: String): ServerConfig = ServerConfig(
    baseUrl = baseUrl,
    authorizationEndpoint = "$baseUrl/oauth/authorize",
    tokenEndpoint = "$baseUrl/oauth/token",
    revocationEndpoint = "$baseUrl/oauth/revoke",
)

internal fun session(
    baseUrl: String = "https://chaotic.example",
    accessToken: String = "at_1",
    refreshToken: String = "rt_1",
    expiresAt: Long = Long.MAX_VALUE,
): Session = Session(
    server = serverConfig(baseUrl),
    person = Person(id = "u1", name = "Ada", email = "ada@example.com"),
    accessToken = accessToken,
    refreshToken = refreshToken,
    accessTokenExpiresAtMillis = expiresAt,
)

internal fun tokenResponse(
    access: String,
    refresh: String? = null,
    expiresIn: Long = 600,
    actsAs: String = "person",
): String {
    val refreshField = refresh?.let { """"refresh_token": "$it", """ }.orEmpty()
    val who =
        if (actsAs == "person") {
            """"acts_as": "person", "person": {"id": "u1", "name": "Ada", "email": "ada@example.com"}"""
        } else {
            """"acts_as": "agent", "agent": {"id": "a1", "name": "Bot", "kind": "assistant"}"""
        }
    return """
        {"access_token": "$access", "token_type": "Bearer", "expires_in": $expiresIn, $refreshField
         "scope": "chaotic:write offline_access",
         "chaotic": {$who, "team_id": null, "project_ids": null, "holder_session_id": "hs1"}}
    """.trimIndent()
}
