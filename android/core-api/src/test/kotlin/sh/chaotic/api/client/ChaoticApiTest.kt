package sh.chaotic.api.client

import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.respond
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.TextContent
import io.ktor.http.headersOf
import io.ktor.util.reflect.typeInfo
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.int
import sh.chaotic.api.apis.AuthApi
import sh.chaotic.api.apis.IssuesApi
import sh.chaotic.api.models.HTTPValidationError
import sh.chaotic.api.models.IssueStatus
import sh.chaotic.api.models.UserLogin
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
    fun serverValidationErrorBodyDecodes() = runTest {
        // validation-error-422.json is the body this server returns for an
        // empty login; backend/tests/test_validation_error_sanitization.py
        // checks it against a live request, so the two cannot drift.
        val engine =
            MockEngine {
                respond(
                    content = resource("validation-error-422.json"),
                    status = HttpStatusCode.UnprocessableEntity,
                    headers = jsonHeaders,
                )
            }
        val api = AuthApi("https://chaotic.example", engine, ChaoticApi.clientConfig)

        val response = api.loginApiAuthLoginPost(UserLogin(email = "", password = ""))

        assertEquals(422, response.status)
        val error = response.typedBody<HTTPValidationError>(typeInfo<HTTPValidationError>())
        val body = JsonPrimitive("body")
        assertEquals(
            listOf(listOf(body, JsonPrimitive("email")), listOf(body, JsonPrimitive("password"))),
            error.detail!!.map { it.loc },
        )
        assertEquals("Field required", error.detail!!.first().msg)
    }

    @Test
    fun validationErrorLocationMayMixStringsAndIndexes() {
        // `loc` items are anyOf(string, integer): a list index in a body path is a number.
        val body = """{"detail": [{"loc": ["body", "issue_ids", 0], "msg": "Input should be a valid string"}]}"""

        val error = ChaoticApi.json.decodeFromString(HTTPValidationError.serializer(), body)

        assertEquals(0, error.detail!!.single().loc[2].int)
    }

    private fun resource(name: String): String =
        checkNotNull(javaClass.classLoader.getResource(name)) { "missing test resource $name" }.readText()

    /**
     * Why the generated partial-update models are a forbidden import
     * (CHT-1647, in config/detekt/detekt.yml): the generated client, as the
     * app configures it, sends an unassign as an empty body, which changes
     * nothing. This pins the request on the wire, whatever the cause
     * (today both `explicitNulls = false` in [ChaoticApi.json] and the
     * fields' null defaults drop it), so if it ever starts going out with
     * the null this fails, and the rule can be reconsidered. The model is
     * named in full because its import is what the rule refuses.
     */
    @Test
    fun theGeneratedClientSendsAnUnassignAsAnEmptyBody() = runTest {
        var body: String? = null
        val engine =
            MockEngine { request ->
                body = (request.body as TextContent).text
                respond(content = "{}", status = HttpStatusCode.UnprocessableEntity, headers = jsonHeaders)
            }
        val api = IssuesApi("https://chaotic.example", engine, ChaoticApi.clientConfig)

        api.updateIssueApiIssuesIssueIdPatch("i1", sh.chaotic.api.models.IssueUpdate(assigneeId = null))

        assertEquals("{}", body)
    }
}
