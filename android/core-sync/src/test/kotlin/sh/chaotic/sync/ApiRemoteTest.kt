package sh.chaotic.sync

import io.ktor.client.engine.mock.MockEngine
import io.ktor.client.engine.mock.MockRequestHandleScope
import io.ktor.client.engine.mock.respond
import io.ktor.client.request.HttpRequestData
import io.ktor.client.request.HttpResponseData
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpStatusCode
import io.ktor.http.headersOf
import kotlinx.coroutines.test.runTest
import java.io.IOException
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull

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
}
