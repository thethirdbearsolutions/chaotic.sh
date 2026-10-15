package sh.chaotic.android.ui

import android.graphics.Bitmap
import androidx.compose.runtime.Composable
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.asAndroidBitmap
import androidx.compose.ui.test.captureToImage
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTouchInput
import androidx.compose.ui.test.swipeLeft
import org.junit.Rule
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode
import sh.chaotic.android.ui.common.SyncProblem
import sh.chaotic.android.ui.home.HomeContent
import sh.chaotic.android.ui.home.HomeState
import sh.chaotic.android.ui.home.HomeTab.SPRINT
import sh.chaotic.android.ui.home.UndoOffer
import sh.chaotic.android.ui.issue.Fetch
import sh.chaotic.android.ui.issue.IssueContent
import sh.chaotic.android.ui.issue.IssueState
import sh.chaotic.android.ui.signin.SignInContent
import sh.chaotic.android.ui.signin.SignInUiState
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.Activity
import sh.chaotic.sync.Comment
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.PendingWrite
import sh.chaotic.sync.Principal
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteQueue
import java.io.File
import kotlin.test.Test
import kotlin.test.assertTrue

/**
 * Screenshots of the main screens with sample data (CHT-1730), so the app
 * can be seen without a device: Robolectric's native graphics draw each
 * screen at a phone's size (411x891dp at xxhdpi, about 1080x2340 pixels)
 * and the PNGs go to app/build/screenshots, which CI uploads as an
 * artifact. Nothing compares them against a stored copy; each test only
 * checks that something was drawn. Every team, project, person and
 * address here is made up: never put real data from a server in these.
 */
@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(qualifiers = "w411dp-h891dp-xxhdpi")
class ScreenshotsTest {
    @get:Rule
    val compose = createComposeRule()

    private val now = 1_800_000_000_000L
    private val minute = 60_000L
    private val hour = 60 * minute

    private val priya = Principal("u1", "Priya Natarajan")
    private val marcus = Principal("u2", "Marcus Webb")
    private val agent = Principal("a1", "Claude", isAgent = true, ownerName = "Priya Natarajan")

    private val gate = InboxEntry(
        id = "e1", teamId = "t1", kind = "gate_pending", title = "Gate: human review before close",
        issueId = "i1", issueIdentifier = "LP-482", source = agent,
        createdAtMillis = now - 4 * minute, updatedAtMicros = 6,
        actions = listOf(
            InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
            InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
        ),
    )

    private val inbox = listOf(
        gate,
        InboxEntry(
            id = "e2", teamId = "t1", kind = "review_requested", title = "Review: countdown hold logic",
            issueId = "i2", issueIdentifier = "LP-475", source = marcus,
            createdAtMillis = now - 38 * minute, updatedAtMicros = 5,
        ),
        InboxEntry(
            id = "e3", teamId = "t1", kind = "gate_rejected", title = "Rejected: needs a fuel-load test",
            issueId = "i3", issueIdentifier = "LP-469", source = priya,
            createdAtMillis = now - 2 * hour, updatedAtMicros = 4,
        ),
        InboxEntry(
            id = "e4", teamId = "t1", kind = "assignment", title = "Pad camera feed on the dashboard",
            issueId = "i4", issueIdentifier = "LP-488", source = priya,
            createdAtMillis = now - 3 * hour, updatedAtMicros = 3,
            actions = listOf(InboxAction(InboxAction.MARK_READ, "/api/inbox/e4/read")),
        ),
        InboxEntry(
            id = "e5", teamId = "t1", kind = "mention", title = "Mentioned you", documentId = "d1",
            documentTitle = "Launch checklist", source = marcus,
            createdAtMillis = now - 26 * hour, updatedAtMicros = 2, read = true,
        ),
        InboxEntry(
            id = "e6", teamId = "t1", kind = "agent_status", title = "Finished: rename telemetry fields",
            issueId = "i6", issueIdentifier = "LP-461", source = agent,
            createdAtMillis = now - 3 * 24 * hour, updatedAtMicros = 1, read = true,
        ),
    )

    private val teams = listOf(Team("t1", "Acme Rocketry", "ACME"), Team("t2", "Moonbase Ops", "MOON"))

    private val sprintCards = listOf(
        SprintCard("p1", "t1", "Launchpad", "LP", "s1", "Sprint 42", budget = 20, pointsSpent = 13, limbo = false),
        SprintCard("p2", "t1", "Telemetry", "TEL", "s2", "Sprint 7", budget = 8, pointsSpent = 10, limbo = false),
        SprintCard(
            "p3", "t1", "Field Guide", "FG", "s3", "Sprint 12", budget = 10, pointsSpent = 10, limbo = true,
            pendingRituals = listOf("retro", "changelog"),
        ),
        SprintCard("p4", "t2", "Rover", "ROV", "s4", "Sprint 3", budget = null, pointsSpent = 5, limbo = false),
    )

    private val issue = Issue(
        id = "i1", teamId = "t1", projectId = "p1", identifier = "LP-482",
        title = "Abort the countdown from the pad console",
        description = """
            ## Goal

            The pad crew can **abort the countdown** without walking back to mission control.

            - One button, with a confirm step
            - The abort reason goes into the launch log
            - Works while the pad network is down
        """.trimIndent(),
        status = "in_review", priority = "high", estimate = 5, assignee = agent,
        updatedAtMillis = now - 4 * minute, openedAtMillis = now,
    )

    private val detail = IssueDetail(
        issue = issue,
        comments = listOf(
            Comment(
                id = "c1",
                issueId = "i1",
                author = marcus,
                content = "Tried it on the test stand. Can the confirm step time out after ten seconds?",
                createdAtMillis = now - 2 * hour,
            ),
            Comment(
                id = "c2",
                issueId = "i1",
                author = agent,
                content = "Done: it times out after ten seconds now, and there is a test for it.",
                createdAtMillis = now - 30 * minute,
            ),
        ),
        activity = listOf(
            Activity("a1", "i1", "status_changed", "status", "in_progress", "in_review", agent, now - 5 * minute),
            Activity("a2", "i1", "priority_changed", "priority", "medium", "high", priya, now - 5 * hour),
        ),
    )

    /** Draws [content], runs [then] (a gesture, typing), and saves what is on screen as [name].png. */
    private fun shoot(name: String, dark: Boolean = false, then: () -> Unit = {}, content: @Composable () -> Unit) {
        compose.setContent { ChaoticTheme(darkTheme = dark, dynamicColor = false) { content() } }
        then()
        compose.waitForIdle()
        val bitmap = compose.onRoot().captureToImage().asAndroidBitmap()
        val pixels = IntArray(bitmap.width * bitmap.height)
        bitmap.getPixels(pixels, 0, bitmap.width, 0, 0, bitmap.width, bitmap.height)
        assertTrue(pixels.distinct().size > 2, "$name drew a blank screen")
        val dir = File(System.getProperty("chaotic.screenshotDir") ?: "build/screenshots").apply { mkdirs() }
        File(dir, "$name.png").outputStream().use { bitmap.compress(Bitmap.CompressFormat.PNG, 100, it) }
    }

    @Composable
    private fun Home(state: HomeState) = HomeContent(
        state = state,
        nowMillis = now,
        onRefresh = {},
        onSelectTab = {},
        onSelectTeam = {},
        onOpen = {},
        onSignOut = {},
    )

    @Test
    fun signIn() = shoot("01-sign-in") {
        SignInContent(
            ui = SignInUiState(serverInput = "chaotic.example.com"),
            ended = null,
            onServerInputChanged = {},
            onSignIn = {},
        )
    }

    @Test
    fun inbox() = shoot("02-inbox") { Home(HomeState(teams = teams, inbox = InboxSections.of(inbox))) }

    @Test
    fun inboxApproveSwipe() = shoot(
        "03-inbox-swipe-to-approve",
        then = {
            // Held part way, so the row shows what letting go would do.
            compose.onNodeWithText(GATE_ROW).performTouchInput {
                down(centerLeft + Offset(width * 0.05f, 0f))
                moveBy(Offset(width * 0.15f, 0f))
                moveBy(Offset(width * 0.15f, 0f))
            }
        },
    ) { Home(HomeState(teams = teams, inbox = InboxSections.of(inbox))) }

    @Test
    fun inboxReject() = shoot(
        "04-inbox-reject-with-reason",
        then = {
            compose.onNodeWithText(GATE_ROW).performTouchInput { swipeLeft() }
            compose.onNodeWithText("Why (required: the requester reads this)")
                .performTextInput("Needs a dry run on the test stand first.")
        },
    ) { Home(HomeState(teams = teams, inbox = InboxSections.of(inbox))) }

    @Test
    fun issueDetail() = shoot("05-issue-detail") {
        IssueContent(IssueState(detail, Fetch.DONE), nowMillis = now, onBack = {}, onRefresh = {})
    }

    @Test
    fun sprints() = shoot("06-sprints-and-budgets") {
        Home(HomeState(teams = teams, inbox = InboxSections.of(inbox), sprintCards = sprintCards, tab = SPRINT))
    }

    @Test
    fun offlineWithQueuedWrites() {
        val stalled = PendingWrite(
            key = "k1",
            kind = WriteKind.COMMENT,
            issueId = "i2",
            value = "Looks right to me; flying it on the next test.",
            label = "LP-475",
            createdAtMillis = now - hour,
            notBeforeMillis = now,
            attempts = WriteQueue.MAX_ATTEMPTS,
        )
        shoot("07-offline-queued-writes") {
            Home(
                HomeState(
                    teams = teams,
                    inbox = InboxSections.of(inbox.drop(1)),
                    problem = SyncProblem.Offline,
                    stalled = listOf(stalled),
                    undo = UndoOffer("k2", WriteKind.APPROVE, "LP-482"),
                ),
            )
        }
    }

    @Test
    fun issueWithACommentWaitingToSend() = shoot("08-issue-comment-waiting") {
        val waiting = Comment("pending:k3", "i1", priya, "Approving once CI is green.", now, pending = true)
        IssueContent(
            IssueState(detail.copy(comments = detail.comments + waiting), Fetch.DONE),
            nowMillis = now,
            onBack = {},
            onRefresh = {},
        )
    }

    @Test
    fun inboxDark() = shoot("09-inbox-dark", dark = true) {
        Home(HomeState(teams = teams, inbox = InboxSections.of(inbox)))
    }

    @Test
    fun issueDetailDark() = shoot("10-issue-detail-dark", dark = true) {
        IssueContent(IssueState(detail, Fetch.DONE), nowMillis = now, onBack = {}, onRefresh = {})
    }

    @Test
    fun sprintsDark() = shoot("11-sprints-and-budgets-dark", dark = true) {
        Home(HomeState(teams = teams, sprintCards = sprintCards, tab = SPRINT))
    }

    private companion object {
        const val GATE_ROW = "LP-482  Gate: human review before close"
    }
}
