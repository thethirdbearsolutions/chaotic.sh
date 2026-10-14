package sh.chaotic.auth

import kotlinx.coroutines.test.runTest
import mockwebserver3.MockWebServer
import okhttp3.OkHttpClient
import org.junit.After
import org.junit.Before
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertTrue

class DiscoveryTest {
    private val base = "https://chaotic.example"

    // What backend/app/oauth/discovery.py serves, trimmed to a few extra fields.
    private fun metadata(issuer: String = base, endpointBase: String = base, methods: String = """["S256"]""") = """
        {"issuer": "$issuer",
         "authorization_endpoint": "$endpointBase/oauth/authorize",
         "token_endpoint": "$endpointBase/oauth/token",
         "revocation_endpoint": "$endpointBase/oauth/revoke",
         "scopes_supported": ["chaotic:write", "offline_access"],
         "response_types_supported": ["code"],
         "code_challenge_methods_supported": $methods,
         "client_id_metadata_document_supported": true,
         "a_field_added_later": {"x": 1}}
    """.trimIndent()

    @Test
    fun parsesTheServersMetadata() {
        val found = assertIs<DiscoveryResult.Found>(OAuthDiscovery.parse(base, metadata()))

        assertEquals(
            ServerConfig(
                baseUrl = base,
                authorizationEndpoint = "$base/oauth/authorize",
                tokenEndpoint = "$base/oauth/token",
                revocationEndpoint = "$base/oauth/revoke",
            ),
            found.server,
        )
    }

    @Test
    fun anIssuerOtherThanTheTypedAddressIsNamed() {
        val result = OAuthDiscovery.parse(base, metadata(issuer = "https://www.chaotic.example"))

        val unusable = assertIs<DiscoveryResult.Unusable>(result)
        assertTrue("https://www.chaotic.example" in unusable.message, unusable.message)
    }

    @Test
    fun endpointsOnAnotherOriginAreRefused() {
        assertIs<DiscoveryResult.Unusable>(OAuthDiscovery.parse(base, metadata(endpointBase = "https://evil.example")))
        assertIs<DiscoveryResult.Unusable>(
            OAuthDiscovery.parse(base, metadata(endpointBase = "http://chaotic.example")),
        )
    }

    @Test
    fun aServerWithoutS256IsRefused() {
        assertIs<DiscoveryResult.Unusable>(OAuthDiscovery.parse(base, metadata(methods = """["plain"]""")))
        assertIs<DiscoveryResult.Unusable>(OAuthDiscovery.parse(base, metadata(methods = "[]")))
    }

    @Test
    fun aMissingRevocationEndpointIsAllowed() {
        val body = """{"issuer": "$base", "authorization_endpoint": "$base/a", "token_endpoint": "$base/t",
            "code_challenge_methods_supported": ["S256"]}"""

        val found = assertIs<DiscoveryResult.Found>(OAuthDiscovery.parse(base, body))

        assertEquals(null, found.server.revocationEndpoint)
    }

    @Test
    fun somethingThatIsNotMetadataIsRefused() {
        for (body in listOf("<html>SPA</html>", "[]", """{"issuer": 3}""", "")) {
            assertIs<DiscoveryResult.Unusable>(OAuthDiscovery.parse(base, body), body)
        }
        assertIs<DiscoveryResult.Unusable>(OAuthDiscovery.parse(base, """{"issuer": "$base"}"""))
    }

    private lateinit var server: MockWebServer
    private val http = OkHttpClient()

    @Before
    fun startServer() {
        server = MockWebServer()
        server.start()
    }

    @After
    fun stopServer() {
        server.close()
    }

    @Test
    fun fetchesTheWellKnownDocument() = runTest {
        val local = server.baseUrl()
        server.enqueue(json(metadata(issuer = local, endpointBase = local)))

        val result = OAuthDiscovery(http).discover(local)

        assertIs<DiscoveryResult.Found>(result)
        assertEquals("/.well-known/oauth-authorization-server", server.takeRequest().url.encodedPath)
    }

    @Test
    fun notFoundMeansOAuthIsOff() = runTest {
        server.enqueue(status(404))

        assertEquals(DiscoveryResult.OAuthDisabled, OAuthDiscovery(http).discover(server.baseUrl()))
        assertTrue("OAUTH_ENABLED" in OAuthDiscovery.OAUTH_DISABLED_MESSAGE)
        assertTrue("APP_BASE_URL" in OAuthDiscovery.OAUTH_DISABLED_MESSAGE)
    }

    @Test
    fun serverErrorsAndNetworkFailuresAreRetryable() = runTest {
        server.enqueue(status(503))
        assertIs<DiscoveryResult.Unreachable>(OAuthDiscovery(http).discover(server.baseUrl()))

        val gone = server.baseUrl()
        server.close()
        assertIs<DiscoveryResult.Unreachable>(OAuthDiscovery(http).discover(gone))
    }

    @Test
    fun otherClientErrorsAreUnusable() = runTest {
        server.enqueue(status(403))

        assertIs<DiscoveryResult.Unusable>(OAuthDiscovery(http).discover(server.baseUrl()))
    }
}
