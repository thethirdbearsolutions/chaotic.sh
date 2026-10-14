package sh.chaotic.auth

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith

class ServerUrlTest {
    @Test
    fun bareHostBecomesAnHttpsOrigin() {
        assertEquals("https://chaotic.example.com", ServerUrl.normalize("  chaotic.example.com  "))
    }

    @Test
    fun httpIsRewrittenToHttps() {
        assertEquals("https://chaotic.example.com", ServerUrl.normalize("http://chaotic.example.com"))
        assertEquals("https://chaotic.example.com", ServerUrl.normalize("HTTP://Chaotic.Example.com/"))
    }

    @Test
    fun theFormMatchesTheServersIssuer() {
        // Lower-cased host, default port dropped, no path or trailing slash:
        // the form backend/app/config.py requires of APP_BASE_URL.
        assertEquals("https://chaotic.example.com", ServerUrl.normalize("https://CHAOTIC.example.com:443/"))
        assertEquals("https://chaotic.example.com:8443", ServerUrl.normalize("chaotic.example.com:8443"))
    }

    @Test
    fun aPastedPageLinkKeepsOnlyTheOrigin() {
        assertEquals(
            "https://chaotic.example.com",
            ServerUrl.normalize("https://chaotic.example.com/issues/CHT-1?tab=activity#c1"),
        )
    }

    @Test
    fun ipv6HostsKeepTheirBrackets() {
        assertEquals("https://[::1]:8443", ServerUrl.normalize("https://[::1]:8443"))
    }

    @Test
    fun refusesWhatIsNotAnHttpsServer() {
        for (input in listOf(
            "",
            "   ",
            "ftp://chaotic.example.com",
            "https://",
            "https://user:pw@chaotic.example.com",
        )) {
            assertFailsWith<InvalidServerUrlException>(input) { ServerUrl.normalize(input) }
        }
    }
}
