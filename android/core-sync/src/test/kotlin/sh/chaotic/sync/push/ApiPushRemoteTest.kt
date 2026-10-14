package sh.chaotic.sync.push

import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.MockRequestHandleScope
import io.ktor.client.engine.mock.respond
import io.ktor.client.request.HttpRequestData
import io.ktor.client.request.HttpResponseData
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.OutgoingContent
import io.ktor.http.headersOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import sh.chaotic.api.client.ChaoticApi
import sh.chaotic.sync.Remote
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertIs

class ApiPushRemoteTest {
    private val requests = mutableListOf<HttpRequestData>()

    private fun remote(handler: suspend MockRequestHandleScope.(HttpRequestData) -> HttpResponseData) = ApiPushRemote(
        "https://chaotic.example",
        MockEngine { request ->
            requests += request
            handler(request)
        },
        nowMillis = { 0 },
    )

    private fun MockRequestHandleScope.json(body: String, status: HttpStatusCode = HttpStatusCode.OK) =
        respond(body, status, headersOf(HttpHeaders.ContentType, "application/json"))

    private fun HttpRequestData.bodyText(): String = when (val content = body) {
        is OutgoingContent.ByteArrayContent -> content.bytes().decodeToString()
        else -> error("unexpected body ${content::class}")
    }

    @Test
    fun registerPutsTheEndpointAndKeys() = runTest {
        val api = remote { json("""{"id":"d1"}""", HttpStatusCode.Created) }
        val result = api.register("install-1", PushDevice("https://ntfy.example/up1", "BP", "AU", "x".repeat(150)))
        assertIs<Remote.Ok<Unit>>(result)
        val request = requests.single()
        assertEquals(HttpMethod.Put, request.method)
        assertEquals("/api/push/devices/install-1", request.url.encodedPath)
        val body = ChaoticApi.json.parseToJsonElement(request.bodyText()).jsonObject
        assertEquals("https://ntfy.example/up1", body["endpoint"]!!.jsonPrimitive.content)
        assertEquals("BP", body["p256dh"]!!.jsonPrimitive.content)
        assertEquals("AU", body["auth"]!!.jsonPrimitive.content)
        assertEquals("android", body["platform"]!!.jsonPrimitive.content)
        assertEquals(100, body["label"]!!.jsonPrimitive.content.length, "the server's label limit")
        assertFalse("transport" in body, "web_push is the server's default")
    }

    @Test
    fun aRefusalCarriesItsErrorCode() = runTest {
        val api = remote {
            json("""{"detail":{"error_code":"too_many_push_devices","message":"no"}}""", HttpStatusCode.Conflict)
        }
        val result = assertIs<Remote.HttpError>(api.register("install-1", PushDevice("https://e", "p", "a")))
        assertEquals(409, result.status)
        assertEquals("too_many_push_devices", result.errorCode)
    }

    @Test
    fun unregisteringSomethingAlreadyGoneIsFine() = runTest {
        val api = remote { respond("", HttpStatusCode.NotFound) }
        assertIs<Remote.Ok<Unit>>(api.unregister("install-1"))
        assertEquals(HttpMethod.Delete, requests.single().method)
        val failing = remote { respond("", HttpStatusCode.InternalServerError) }
        assertEquals(500, assertIs<Remote.HttpError>(failing.unregister("install-1")).status)
    }

    @Test
    fun theVapidKeyAndPreferences() = runTest {
        val api = remote { request ->
            when (request.url.encodedPath) {
                "/api/push/vapid-public-key" -> json("""{"public_key":"BKey","key_id":"kid"}""")
                else -> json("""{"kinds":{"mention":true,"agent_status":false}}""")
            }
        }
        assertEquals(VapidKey("BKey", "kid"), assertIs<Remote.Ok<VapidKey>>(api.vapidKey()).value)
        assertEquals(
            mapOf("mention" to true, "agent_status" to false),
            assertIs<Remote.Ok<Map<String, Boolean>>>(api.preferences()).value,
        )
    }
}
