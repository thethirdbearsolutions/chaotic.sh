package sh.chaotic.sync

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class PendingOverlayTest {
    private fun write(
        key: String,
        kind: WriteKind,
        entryId: String? = null,
        issueId: String? = null,
        field: String? = null,
        value: String? = null,
        valueLabel: String? = null,
        at: Long = 10,
    ) = PendingWrite(
        key = key,
        kind = kind,
        entryId = entryId,
        issueId = issueId,
        field = field,
        value = value,
        valueLabel = valueLabel,
        label = "CHT-1",
        createdAtMillis = at,
        notBeforeMillis = at,
    )

    @Test
    fun decidedAndArchivedEntriesLeaveAndMarkReadReads() {
        val entries = listOf(entry("a"), entry("b"), entry("c"), entry("d"), entry("e"))
        val writes = listOf(
            write("1", WriteKind.APPROVE, entryId = "a"),
            write("2", WriteKind.REJECT, entryId = "b"),
            write("3", WriteKind.ARCHIVE, entryId = "c"),
            write("4", WriteKind.MARK_READ, entryId = "d"),
        )

        val shown = PendingOverlay.inbox(entries, writes)

        assertEquals(listOf("d", "e"), shown.map { it.id })
        assertTrue(shown[0].read)
        assertFalse(shown[1].read)
    }

    @Test
    fun noWritesIsTheCacheAsIs() {
        val entries = listOf(entry("a"))
        assertEquals(entries, PendingOverlay.inbox(entries, emptyList()))
    }

    @Test
    fun fieldChangesApplyInOrderAndCommentsFollowTheStoredOnes() {
        val ada = Principal("ada", "Ada")
        val stored = Comment("c1", "i1", ada, "stored", 5)
        val detail = IssueDetail(issue().copy(assignee = ada), listOf(stored), emptyList())
        val writes = listOf(
            write("1", WriteKind.UPDATE_ISSUE, issueId = "i1", field = IssueFields.STATUS, value = "in_progress"),
            write("2", WriteKind.UPDATE_ISSUE, issueId = "i1", field = IssueFields.STATUS, value = "done"),
            write("3", WriteKind.UPDATE_ISSUE, issueId = "i1", field = IssueFields.PRIORITY, value = "urgent"),
            write(
                "4",
                WriteKind.UPDATE_ISSUE,
                issueId = "i1",
                field = IssueFields.ASSIGNEE,
                value = "g",
                valueLabel = "Grace",
            ),
            write("5", WriteKind.COMMENT, issueId = "i1", value = "on its way", at = 20),
            write("6", WriteKind.COMMENT, issueId = "other", value = "elsewhere"),
            write("7", WriteKind.UPDATE_ISSUE, issueId = "other", field = IssueFields.STATUS, value = "canceled"),
        )

        val shown = PendingOverlay.issue(detail, writes, me = ada)

        assertEquals("done", shown.issue.status)
        assertEquals("urgent", shown.issue.priority)
        assertEquals(Principal("g", "Grace"), shown.issue.assignee)
        assertEquals(
            listOf(stored, Comment("pending:5", "i1", ada, "on its way", 20, pending = true)),
            shown.comments,
        )
    }

    @Test
    fun aPendingUnassignShowsNoAssignee() {
        val detail = IssueDetail(issue().copy(assignee = Principal("ada", "Ada")), emptyList(), emptyList())

        val shown = PendingOverlay.issue(
            detail,
            listOf(write("1", WriteKind.UPDATE_ISSUE, issueId = "i1", field = IssueFields.ASSIGNEE, value = null)),
            me = null,
        )

        assertEquals(null, shown.issue.assignee)
    }

    @Test
    fun onlyApiPathsAreSendable() {
        listOf("/api/inbox/e1/read", "/api/rituals/r1/complete-issue/i-1").forEach {
            assertTrue(WritePaths.isApiPath(it), it)
        }
        listOf(
            "https://evil.example/api/x",
            "//evil.example/api/x",
            "/api/../oauth/token",
            "/api/./x",
            "/api//x",
            "/api/x?y=1",
            "/api/x#y",
            "/api/x\\y",
            "/api/x y",
            "/api/%2e%2e/x",
            "/oauth/token",
            "api/x",
        ).forEach { assertFalse(WritePaths.isApiPath(it), it) }
    }

    @Test
    fun issuePathsRefuseAnythingButAnId() {
        assertEquals("/api/issues/i-1_2/comments", WritePaths.comments("i-1_2"))
        listOf("", "../x", "a/b", "a?b").forEach { id ->
            assertFalse(WritePaths.isApiPath(WritePaths.issue(id)), id)
            assertFalse(WritePaths.isApiPath(WritePaths.comments(id)), id)
        }
    }
}
