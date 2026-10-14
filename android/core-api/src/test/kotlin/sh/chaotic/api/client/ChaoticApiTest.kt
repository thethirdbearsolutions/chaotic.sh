package sh.chaotic.api.client

import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.respond
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.http.headersOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive
import sh.chaotic.api.apis.AuthApi
import sh.chaotic.api.models.HTTPValidationError
import sh.chaotic.api.models.IssueStatus
import kotlin.test.Test
import kotlin.test.assertEquals

class ChaoticApiTest {
    private val jsonHeaders = headersOf(HttpHeaders.ContentType, "application/json")

    private val userBody =
        """
        {"id": "u1", "email": "a@example.com", "name": "Ada",
         "avatar_url": null, "is_active": true,
         "created_at": "2026-10-14T00:00:00Z",
         "updated_at": "2026-10-14T00:00:00Z",
         "kind": "assistant",
         "a_field_this_app_predates": {"x": 1}}
        """.trimIndent()

    @Test
    fun generatedClientSendsBearerTokenAndDecodesResponse() = runTest {
        val engine =
            MockEngine { request ->
                assertEquals("https://chaotic.example/api/auth/me", request.url.toString())
                assertEquals("Bearer ck_test", request.headers[HttpHeaders.Authorization])
                respond(content = userBody, status = HttpStatusCode.OK, headers = jsonHeaders)
            }
        val api = AuthApi("https://chaotic.example", engine, ChaoticApi.clientConfig)
        api.setBearerToken("ck_test")

        val response = api.getMeApiAuthMeGet()

        assertEquals(200, response.status)
        val user = response.body()
        assertEquals("Ada", user.name)
        assertEquals("assistant", user.kind?.value)
    }

    @Test
    fun unknownEnumValueDecodesToTheUnknownCase() {
        val status = ChaoticApi.json.decodeFromString(IssueStatus.serializer(), "\"a_status_added_later\"")

        assertEquals(IssueStatus.unknown_default_open_api, status)
    }

    @Test
    fun knownEnumValueRoundTripsAsItsWireValue() {
        val encoded = ChaoticApi.json.encodeToString(IssueStatus.serializer(), IssueStatus.in_progress)

        assertEquals("\"in_progress\"", encoded)
    }

    @Test
    fun freeFormAndAnyOfFieldsDecodeAsJsonTrees() {
        // FastAPI's 422 body: `loc` items are anyOf(string, integer), `input`
        // is `{}` and `ctx` a bare object, all three of which the generator
        // would otherwise emit as types that cannot decode.
        val body =
            """
            {"detail": [{"loc": ["body", "items", 0], "msg": "Field required",
                         "type": "missing", "input": {"title": 1}, "ctx": {"min_length": 1}}]}
            """.trimIndent()

        val error = ChaoticApi.json.decodeFromString(HTTPValidationError.serializer(), body)

        val detail = error.detail!!.single()
        assertEquals(listOf(JsonPrimitive("body"), JsonPrimitive("items"), JsonPrimitive(0)), detail.loc)
        assertEquals(1, detail.ctx!!["min_length"]!!.jsonPrimitive.int)
    }
}
