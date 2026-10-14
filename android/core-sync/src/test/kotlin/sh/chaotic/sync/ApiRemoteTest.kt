package sh.chaotic.sync

import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.MockRequestHandleScope
import io.ktor.client.engine.mock.respond
import io.ktor.client.request.HttpRequestData
import io.ktor.client.request.HttpResponseData
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.TextContent
import io.ktor.http.headersOf
import kotlinx.coroutines.test.runTest
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import sh.chaotic.auth.AuthInterceptor
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull
import kotlin.test.assertTrue

class ApiRemoteTest {
    private val requests = mutableListOf<HttpRequestData>()

    private fun remote(handler: suspend MockRequestHandleScope.(HttpRequestData) -> HttpResponseData) = ApiRemote(
        "https://chaotic.example",
        MockEngine { request ->
            requests += request
            handler(request)
        },
        nowMillis = { 0 },
    )

    private fun MockRequestHandleScope.json(
        body: String,
        status: HttpStatusCode = HttpStatusCode.OK,
        vararg headers: Pair<String, String>,
    ) = respond(
        content = body,
        status = status,
        headers = headersOf(
            *(
                headers.map {
                    it.first to listOf(
                        it.second,
                    )
                } + (HttpHeaders.ContentType to listOf("application/json"))
                ).toTypedArray(),
        ),
    )

    private fun syncEntry(id: String, state: String?, extra: String = "") =
        """
        {"id": "$id", "recipient_user_id": "u1", "kind": "gate_pending", "team_id": "t1",
         "title": "Gate on CHT-1", "created_at": "2026-10-14T05:00:00Z",
         "updated_at": "2026-10-14T05:00:00.000123+00:00", "issue_identifier": "CHT-1",
         "source_user": {"id": "a1", "name": "Claude", "is_agent": true, "owner_name": "ethan"}
         ${if (state != null) ""","state": "$state"""" else ""} $extra}
        """.trimIndent()

    @Test
    fun aKindNewerThanThisAppReadsAsUnknown() = runTest {
        val newer = syncEntry("e1", "open").replace("gate_pending", "a_kind_from_the_future")
        val api = remote { json("""{"entries": [$newer], "has_more": false, "team_ids": ["t1"]}""") }

        val page = assertIs<Remote.Ok<SyncPage>>(api.syncInbox(null, 50)).value

        assertEquals(UNKNOWN_VALUE, page.entries.single().entry.kind)
    }

    @Test
    fun syncSendsTheCursorAndReadsAPage() = runTest {
        val api = remote {
            json(
                """
                {"entries": [${syncEntry("e1", "open")}, ${syncEntry("e2", "resolved")},
                             ${syncEntry("e3", "archived")}, ${syncEntry("e4", "snoozed")},
                             ${syncEntry("e5", null, ""","read_at": "2026-10-14T05:01:00Z"""")},
                             ${syncEntry("e6", null, ""","archived_at": "2026-10-14T05:01:00Z"""")}],
                 "next_cursor": "abc", "has_more": true, "retry_after": 7, "reset": true,
                 "team_ids": ["t1", "t2"], "a_field_this_app_predates": 1}
                """.trimIndent(),
            )
        }

        val page = assertIs<Remote.Ok<SyncPage>>(api.syncInbox("prev", 50)).value

        assertEquals("/api/inbox/sync", requests.single().url.encodedPath)
        assertEquals("prev", requests.single().url.parameters["since"])
        assertEquals("50", requests.single().url.parameters["limit"])
        assertEquals(
            mapOf("e1" to true, "e2" to false, "e3" to false, "e4" to false, "e5" to true, "e6" to false),
            page.entries.associate { it.entry.id to it.open },
        )
        assertEquals("abc", page.nextCursor)
        assertEquals(true, page.hasMore)
        assertEquals(7, page.retryAfterSeconds)
        assertEquals(true, page.reset)
        assertEquals(setOf("t1", "t2"), page.teamIds)
        val first = page.entries.first().entry
        assertEquals(Principal("a1", "Claude", isAgent = true, ownerName = "ethan"), first.source)
        assertEquals("gate_pending", first.kind)
        assertEquals("CHT-1", first.issueIdentifier)
        assertEquals(false, first.read)
        assertEquals(true, page.entries[4].entry.read)
        assertEquals(Timestamps.micros("2026-10-14T05:00:00.000123Z"), first.updatedAtMicros)
    }

    @Test
    fun aFirstSyncSendsNoCursor() = runTest {
        val api = remote { json("""{"entries": [], "team_ids": []}""") }

        val page = assertIs<Remote.Ok<SyncPage>>(api.syncInbox(null, 200)).value

        assertNull(requests.single().url.parameters["since"])
        assertNull(page.nextCursor)
        assertEquals(false, page.hasMore)
    }

    @Test
    fun aStructuredRefusalCarriesItsErrorCode() = runTest {
        val api = remote {
            json(
                """{"detail": {"error_code": "invalid_cursor", "message": "Sync again without it."}}""",
                HttpStatusCode.BadRequest,
            )
        }

        assertEquals(Remote.HttpError(400, errorCode = "invalid_cursor"), api.syncInbox("bad", 200))
    }

    @Test
    fun retryAfterIsRead() = runTest {
        val api = remote { json("""{"detail": "busy"}""", HttpStatusCode.ServiceUnavailable, "Retry-After" to "12") }

        assertEquals(Remote.HttpError(503, retryAfterMillis = 12_000), api.syncInbox(null, 200))
    }

    @Test
    fun aNetworkFailureIsUnreachable() = runTest {
        val api = remote { throw IOException("no route") }

        assertIs<Remote.Unreachable>(api.syncInbox(null, 200))
    }

    @Test
    fun theServerIsReachableWhenItAnswersAtAll() = runTest {
        assertTrue(remote { json("{}", HttpStatusCode.ServiceUnavailable) }.reachable())
        assertEquals("/health", requests.single().url.encodedPath)
        assertEquals(false, remote { throw IOException("no route") }.reachable())
    }

    @Test
    fun anHtmlPageIsUnreadable() = runTest {
        val api = remote {
            respond(
                "<html>Sign in to the hotel wifi</html>",
                HttpStatusCode.OK,
                headersOf(HttpHeaders.ContentType, "text/html"),
            )
        }

        assertIs<Remote.Unreadable>(api.syncInbox(null, 200))
    }

    @Test
    fun projectsArePaged() = runTest {
        val api = remote { request ->
            val skip = request.url.parameters["skip"]!!.toInt()
            val count = if (skip == 0) 100 else 3
            json(
                (0 until count).joinToString(",", "[", "]") {
                    """{"id": "p${skip + it}", "team_id": "t1", "name": "P", "key": "P", "description": null,
                    "color": "#000", "icon": null, "lead_id": null, "issue_count": 0,
                    "estimate_scale": "fibonacci", "unestimated_handling": "default_one_point",
                    "default_sprint_budget": null, "human_rituals_required": false,
                    "require_estimate_on_claim": false, "created_at": "2026-10-14T00:00:00Z",
                    "updated_at": "2026-10-14T00:00:00Z"}"""
                },
            )
        }

        val projects = assertIs<Remote.Ok<List<Project>>>(api.projects("t1")).value

        assertEquals(103, projects.size)
        assertEquals(listOf("0", "100"), requests.map { it.url.parameters["skip"] })
        assertEquals("/api/teams/t1/projects", requests.first().url.encodedPath)
    }

    @Test
    fun anIssueTakesTheTeamItIsKnownBy() = runTest {
        val api = remote {
            json(
                """
                {"id": "i1", "project_id": "p1", "identifier": "CHT-9", "number": 9, "title": "T",
                 "description": "**hi**", "status": "in_review", "priority": "urgent", "issue_type": "bug",
                 "estimate": 3, "assignee_id": "u2", "creator_id": "u1", "sprint_id": null, "parent_id": null,
                 "due_date": null, "completed_at": null, "created_at": "2026-10-14T00:00:00Z",
                 "updated_at": "2026-10-14T00:00:00Z", "assignee_name": "Ada"}
                """.trimIndent(),
            )
        }

        val issue = assertIs<Remote.Ok<Issue>>(api.issue("i1", "t1")).value

        assertEquals("t1", issue.teamId)
        assertEquals("in_review", issue.status)
        // No summary sent: the name beside the id still names the assignee.
        assertEquals(Principal("u2", "Ada"), issue.assignee)
    }

    @Test
    fun limboNamesThePendingRituals() = runTest {
        val api = remote {
            json(
                """
                {"in_limbo": true, "sprint_id": "s1", "completed_rituals": [],
                 "pending_rituals": [{"id": "r1", "name": "retro", "prompt": "p", "approval_mode": "auto",
                                      "note_required": true}]}
                """.trimIndent(),
            )
        }

        assertEquals(Remote.Ok(LimboInfo(true, listOf("retro"))), api.limbo("p1"))
        assertEquals("p1", requests.single().url.parameters["project_id"])
    }

    @Test
    fun entriesCarryTheActionsTheAppCanSendAndNoOthers() = runTest {
        val actions = """,
            "actions": [
              {"kind": "approve", "method": "POST", "path": "/api/rituals/r1/complete-issue/i1", "note": "optional"},
              {"kind": "reject", "path": "/api/rituals/r1/reject-issue/i1", "note": "required"},
              {"kind": "mark_read", "path": "/api/inbox/e1/read"},
              {"kind": "snooze", "path": "/api/inbox/e1/snooze"},
              {"kind": "archive", "path": "https://elsewhere.example/api/inbox/e1/archive"},
              {"kind": "archive", "method": "DELETE", "path": "/api/inbox/e1"}
            ]
        """
        val api = remote { json("""{"entries": [${syncEntry("e1", "open", actions)}], "team_ids": ["t1"]}""") }

        val entry = assertIs<Remote.Ok<SyncPage>>(api.syncInbox(null, 50)).value.entries.single().entry

        assertEquals(
            listOf(
                InboxAction("approve", "/api/rituals/r1/complete-issue/i1", "optional"),
                InboxAction("reject", "/api/rituals/r1/reject-issue/i1", "required"),
                InboxAction("mark_read", "/api/inbox/e1/read", "none"),
            ),
            entry.actions,
        )
    }

    private fun origin(key: String) = WriteOrigin(key, OWNER)

    @Test
    fun anActionIsPostedToItsPathWithItsKey() = runTest {
        val api = remote { json("""{"id": "x"}""") }
        val body = JsonObject(mapOf("note" to JsonPrimitive("Needs tests")))

        assertEquals(Remote.Ok(Unit), api.act("/api/rituals/r1/reject-issue/i1", body, origin("key-1")))

        val request = requests.single()
        assertEquals(HttpMethod.Post, request.method)
        assertEquals("https://chaotic.example/api/rituals/r1/reject-issue/i1", request.url.toString())
        assertEquals("key-1", request.headers["Idempotency-Key"])
        // For AuthInterceptor, which sends it only as this person and strips it (WriteWireTest).
        assertEquals(OWNER, request.headers[AuthInterceptor.EXPECT_OWNER_HEADER])
        assertEquals(ContentType.Application.Json, request.body.contentType?.withoutParameters())
        assertEquals("""{"note":"Needs tests"}""", (request.body as TextContent).text)
    }

    @Test
    fun aPathOffThisServersApiIsNeverSent() = runTest {
        val api = remote { json("{}") }

        val answer = api.act("https://elsewhere.example/steal", JsonObject(emptyMap()), origin("k"))

        assertEquals(400, assertIs<Remote.HttpError>(answer).status)
        assertTrue(requests.isEmpty())
    }

    @Test
    fun anIssueUpdateIsAPatchAndReadsTheIssueBack() = runTest {
        val api = remote {
            json(
                """
                {"id": "i1", "project_id": "p1", "identifier": "CHT-9", "number": 9, "title": "T",
                 "status": "done", "priority": "urgent", "issue_type": "bug", "creator_id": "u1",
                 "created_at": "2026-10-14T00:00:00Z", "updated_at": "2026-10-14T00:00:00Z"}
                """.trimIndent(),
            )
        }

        val issue = api.updateIssue("i1", "t1", JsonObject(mapOf("assignee_id" to JsonNull)), origin("k2"))

        assertEquals("done", assertIs<Remote.Ok<Issue?>>(issue).value?.status)
        assertEquals("t1", issue.value?.teamId)
        val request = requests.single()
        assertEquals(HttpMethod.Patch, request.method)
        assertEquals("/api/issues/i1", request.url.encodedPath)
        assertEquals("""{"assignee_id":null}""", (request.body as TextContent).text)
        assertEquals("k2", request.headers["Idempotency-Key"])
    }

    @Test
    fun aTakenWriteWhoseAnswerCannotBeReadIsStillTaken() = runTest {
        val api = remote { json("""{"not": "a comment"}""", HttpStatusCode.Created) }

        assertEquals(Remote.Ok(null), api.addComment("i1", "hello", origin("k3")))
        assertEquals("/api/issues/i1/comments", requests.single().url.encodedPath)
        assertEquals("""{"content":"hello"}""", (requests.single().body as TextContent).text)
    }

    @Test
    fun aRefusedWriteCarriesTheServersReason() = runTest {
        val bodies = ArrayDeque(
            listOf(
                """{"detail": {"error_code": "ritual_already_resolved", "message": "Already approved by Grace."}}""",
                """{"detail": "Only admins can reject attestations"}""",
                """{"detail": [{"loc": ["body", "note"], "msg": "Field required"}]}""",
                "<html>proxy error</html>",
            ),
        )
        val statuses = ArrayDeque(listOf(409, 403, 422, 409))
        val api = remote { json(bodies.removeFirst(), HttpStatusCode.fromValue(statuses.removeFirst())) }

        val answers = List(4) { api.act("/api/inbox/e1/archive", JsonObject(emptyMap()), origin("k$it")) }

        assertEquals(
            listOf(
                Remote.HttpError(409, "ritual_already_resolved", message = "Already approved by Grace."),
                Remote.HttpError(403, message = "Only admins can reject attestations"),
                Remote.HttpError(422, message = "Field required"),
                Remote.HttpError(409),
            ),
            answers,
        )
    }

    @Test
    fun membersAreNamedByWhatTheServerHas() = runTest {
        val api = remote {
            json(
                """
                [{"id": "m1", "user_id": "u1", "team_id": "t1", "role": "admin", "joined_at": "2026-10-14T00:00:00Z",
                  "user_name": "Ada", "user_email": "ada@example.com"},
                 {"id": "m2", "user_id": "u2", "team_id": "t1", "role": "member", "joined_at": "2026-10-14T00:00:00Z",
                  "user_email": "grace@example.com"}]
                """.trimIndent(),
            )
        }

        assertEquals(
            Remote.Ok(listOf(Principal("u1", "Ada"), Principal("u2", "grace@example.com"))),
            api.members("t1"),
        )
        assertEquals("/api/teams/t1/members", requests.single().url.encodedPath)
    }
}
