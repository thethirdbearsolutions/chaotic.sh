package sh.chaotic.auth

import kotlinx.serialization.Serializable

/** Who the session signs in as, from the token response's `chaotic.person`. */
@Serializable
data class Person(val id: String, val name: String, val email: String)

/**
 * A signed-in device: the server, the person, and the tokens.
 *
 * [toString] never prints a token, so a session that reaches a log line or
 * a crash report by accident does not take its credentials with it.
 */
@Serializable
data class Session(
    val server: ServerConfig,
    val person: Person,
    val accessToken: String,
    val refreshToken: String,
    /** When [accessToken] stops working, by the device clock (epoch milliseconds). */
    val accessTokenExpiresAtMillis: Long,
) {
    override fun toString(): String =
        "Session(server=${server.baseUrl}, person=${person.id}, accessToken=<redacted>, " +
            "refreshToken=<redacted>, accessTokenExpiresAtMillis=$accessTokenExpiresAtMillis)"
}
