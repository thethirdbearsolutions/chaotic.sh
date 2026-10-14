package sh.chaotic.auth

import okhttp3.HttpUrl
import okhttp3.HttpUrl.Companion.toHttpUrlOrNull

/** What the person typed is not a server address the app can use. */
class InvalidServerUrlException(message: String) : IllegalArgumentException(message)

/**
 * Turns what the person typed on the first screen into a server base URL.
 *
 * The result is an https origin in the form the server's OAuth issuer
 * takes (`backend/app/config.py`, `oauth_issuer_problem`): scheme and host
 * lower-cased, the default port left out, no path and no trailing slash.
 * Discovery then requires the server's advertised `issuer` to be exactly
 * this string (RFC 8414 §3.3), so the two must be built the same way.
 *
 * - no scheme: https is assumed (`chaotic.example.com`);
 * - `http://`: rewritten to https. Tokens never travel in clear text, and
 *   Android refuses clear-text traffic for this app anyway;
 * - any path, query or fragment is dropped, so a pasted link to a page on
 *   the server still works; user info is refused (it would be a password).
 */
object ServerUrl {
    fun normalize(input: String): String {
        val trimmed = input.trim()
        if (trimmed.isEmpty()) invalid("Enter your Chaotic server's address.")
        val schemeEnd = trimmed.indexOf("://")
        val withScheme =
            when {
                schemeEnd < 0 -> "https://$trimmed"

                trimmed.substring(0, schemeEnd).equals("http", ignoreCase = true) ->
                    "https://" + trimmed.substring(schemeEnd + SCHEME_SEPARATOR_LENGTH)

                trimmed.substring(0, schemeEnd).equals("https", ignoreCase = true) -> trimmed

                else -> invalid("Use an https:// address.")
            }
        val url =
            withScheme.toHttpUrlOrNull()
                ?: invalid("\"$trimmed\" is not a web address.")
        if (url.username.isNotEmpty() || url.password.isNotEmpty()) {
            invalid("Leave the user name and password out of the address.")
        }
        return origin(url)
    }

    /** `https://host[:port]` of [url], with the port only when it is not 443. */
    fun origin(url: HttpUrl): String {
        val port = if (url.port == HttpUrl.defaultPort(url.scheme)) "" else ":${url.port}"
        val host = if (url.host.contains(':')) "[${url.host}]" else url.host
        return "${url.scheme}://$host$port"
    }

    /** Whether [url] is on the server whose base URL is [baseUrl]. */
    fun isSameOrigin(url: HttpUrl, baseUrl: String): Boolean = origin(url) == baseUrl

    private fun invalid(message: String): Nothing = throw InvalidServerUrlException(message)

    private const val SCHEME_SEPARATOR_LENGTH = 3
}
