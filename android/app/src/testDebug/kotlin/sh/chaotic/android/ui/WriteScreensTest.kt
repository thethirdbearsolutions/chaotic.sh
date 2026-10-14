package sh.chaotic.android.ui

import androidx.compose.ui.semantics.SemanticsActions
import androidx.compose.ui.semantics.getOrNull
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTouchInput
import androidx.compose.ui.test.swipeLeft
import androidx.compose.ui.test.swipeRight
import org.junit.Rule
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import sh.chaotic.android.ui.home.HomeContent
import sh.chaotic.android.ui.home.HomeState
import sh.chaotic.android.ui.home.HomeWrites
import sh.chaotic.android.ui.home.UndoOffer
import sh.chaotic.android.ui.inbox.RejectPanel
import sh.chaotic.android.ui.issue.Fetch
import sh.chaotic.android.ui.issue.IssueContent
import sh.chaotic.android.ui.issue.IssueState
import sh.chaotic.android.ui.issue.IssueWrites
import sh.chaotic.android.ui.issue.Members
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.Comment
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.Principal
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteQueue
import sh.chaotic.sync.WriteRefusal
import kotlin.test.Test
import kotlin.test.assertEquals

/** Compose UI tests of the write actions (CHT-1613), on Robolectric like [ScreensTest]. */
@RunWith(RobolectricTestRunner::class)
@Config(qualifiers = "w411dp-h1200dp")
class WriteScreensTest {
    @get:Rule
    val compose = createComposeRule()

    private val now = 1_800_000_000_000L

    private val gate = InboxEntry(
        id = "g1", teamId = "t1", kind = "gate_pending", title = "Gate: human review", issueId = "i1",
        issueIdentifier = "CHT-1611", source = Principal("a", "Claude", isAgent = true, ownerName = "ethan"),
        createdAtMillis = now - 60_000, updatedAtMicros = 1,
        actions = listOf(
            InboxAction(InboxAction.APPROVE, "/api/rituals/r1/complete-issue/i1", "optional"),
            InboxAction(InboxAction.REJECT, "/api/rituals/r1/reject-issue/i1", "required"),
            InboxAction(InboxAction.ARCHIVE, "/api/inbox/g1/archive"),
        ),
    )
    private val mention = InboxEntry(
        id = "m1", teamId = "t1", kind = "mention", title = "Mentioned you", issueId = "i2",
        issueIdentifier = "CHT-1600", source = Principal("u", "Ada"),
        createdAtMillis = now - 120_000, updatedAtMicros = 2,
        actions = listOf(
            InboxAction(InboxAction.MARK_READ, "/api/inbox/m1/read"),
            InboxAction(InboxAction.ARCHIVE, "/api/inbox/m1/archive"),
        ),
    )

    /** Every call the screen made, as "what:argument". */
    private val calls = mutableListOf<String>()

    private val homeWrites = HomeWrites(
        onApprove = { calls += "approve:${it.id}" },
        onReject = { entry, note -> calls += "reject:${entry.id}:$note" },
        onMarkRead = { calls += "read:${it.id}" },
        onArchive = { calls += "archive:${it.id}" },
        onUndo = { calls += "undo:$it" },
        onUndoGone = { calls += "gone:$it" },
        onDismissRefusal = { calls += "dismiss:$it" },
    )

    private fun home(state: HomeState) = compose.setContent {
        ChaoticTheme {
            HomeContent(
                state = state,
                nowMillis = now,
                onRefresh = {},
                onSelectTab = {},
                onSelectTeam = {},
                onOpen = { calls += "open:${it.id}" },
                onSignOut = {},
                writes = homeWrites,
            )
        }
    }

    @Test
    fun swipingAGateRightApprovesIt() {
        home(HomeState(inbox = InboxSections.of(listOf(gate))))

        compose.onNodeWithText("CHT-1611  Gate: human review").performTouchInput { swipeRight() }
        compose.waitForIdle()

        assertEquals(listOf("approve:g1"), calls)
    }

    @Test
    fun swipingAGateLeftAsksForAReasonBeforeRejecting() {
        home(HomeState(inbox = InboxSections.of(listOf(gate))))

        compose.onNodeWithText("CHT-1611  Gate: human review").performTouchInput { swipeLeft() }
        compose.onNodeWithText("Reject CHT-1611?").assertIsDisplayed()
        assertEquals(emptyList(), calls)
        compose.onNodeWithText("Why (required: the requester reads this)").performTextInput("Needs tests")
        compose.onNodeWithText("Reject").performClick()

        assertEquals(listOf("reject:g1:Needs tests"), calls)
        compose.onNodeWithText("Reject CHT-1611?").assertDoesNotExist()
    }

    @Test
    fun aRejectionNeedsAReason() {
        compose.setContent {
            ChaoticTheme {
                RejectPanel(gate, onReject = { calls += "reject:${gate.id}:$it" }, onCancel = {})
            }
        }

        // No reason, no reject.
        compose.onNodeWithText("Reject").assertIsNotEnabled()
        compose.onNodeWithText("Why (required: the requester reads this)").performTextInput("Needs tests")
        compose.onNodeWithText("Reject").performClick()

        assertEquals(listOf("reject:g1:Needs tests"), calls)
    }

    @Test
    fun otherRowsSwipeToMarkReadAndArchive() {
        home(HomeState(inbox = InboxSections.of(listOf(mention))))

        compose.onNodeWithText("CHT-1600  Mentioned you").performTouchInput { swipeRight() }
        compose.waitForIdle()
        compose.onNodeWithText("CHT-1600  Mentioned you").performTouchInput { swipeLeft() }
        compose.waitForIdle()

        assertEquals(listOf("read:m1", "archive:m1"), calls)
    }

    @Test
    fun aRowWithoutActionsDoesNotSwipe() {
        home(HomeState(inbox = InboxSections.of(listOf(gate.copy(actions = emptyList())))))

        compose.onNodeWithText("CHT-1611  Gate: human review").performTouchInput { swipeRight() }
        compose.waitForIdle()

        assertEquals(emptyList(), calls)
    }

    @Test
    fun swipesAreAlsoAccessibilityActions() {
        home(HomeState(inbox = InboxSections.of(listOf(gate))))

        val node = compose.onNode(SemanticsMatcher.keyIsDefined(SemanticsActions.CustomActions)).fetchSemanticsNode()
        val actions = node.config.getOrNull(SemanticsActions.CustomActions).orEmpty()
        assertEquals(listOf("Approve", "Reject"), actions.map { it.label })
        compose.runOnIdle { actions.first().action() }

        assertEquals(listOf("approve:g1"), calls)
    }

    @Test
    fun aSwipeCanBeUndoneFromTheSnackbar() {
        home(HomeState(undo = UndoOffer("k1", WriteKind.APPROVE, "CHT-1611")))

        compose.onNodeWithText("Approving CHT-1611").assertIsDisplayed()
        compose.onNodeWithText("Undo").performClick()
        compose.waitForIdle()

        assertEquals(listOf("undo:k1"), calls)
    }

    @Test
    fun theUndoSnackbarLeavesWhenTheWindowCloses() {
        home(HomeState(undo = UndoOffer("k1", WriteKind.APPROVE, "CHT-1611")))
        compose.onNodeWithText("Approving CHT-1611").assertIsDisplayed()

        compose.mainClock.advanceTimeBy(WriteQueue.UNDO_MILLIS + 1_000)
        compose.waitForIdle()

        compose.onNodeWithText("Undo").assertDoesNotExist()
        assertEquals(listOf("gone:k1"), calls)
    }

    @Test
    fun aRefusalShowsTheServersReasonUntilDismissed() {
        val refusal = WriteRefusal(
            key = "k1",
            kind = WriteKind.UPDATE_ISSUE,
            label = "CHT-7",
            status = 409,
            errorCode = "sprint_in_arrears",
            message = "Sprint is in arrears in project CHT.",
            atMillis = now,
        )
        home(HomeState(refusals = listOf(refusal)))

        compose.onNodeWithText("Could not change CHT-7").assertIsDisplayed()
        compose.onNodeWithText("Sprint is in arrears in project CHT.").assertIsDisplayed()
        compose.onNodeWithText("Dismiss").performClick()

        assertEquals(listOf("dismiss:k1"), calls)
    }

    private val issue = Issue(
        id = "i1", teamId = "t1", projectId = "p1", identifier = "CHT-1611", title = "Write actions",
        status = "in_progress", priority = "high", updatedAtMillis = now, openedAtMillis = now,
    )

    private val issueWrites = IssueWrites(
        onComment = { calls += "comment:$it" },
        onStatus = { calls += "status:$it" },
        onPriority = { calls += "priority:$it" },
        onAssign = { calls += "assign:${it?.id}" },
        onPickAssignee = { calls += "members" },
        onDismissRefusal = { calls += "dismiss:$it" },
    )

    private fun issue(state: IssueState) = compose.setContent {
        ChaoticTheme {
            IssueContent(state = state, nowMillis = now, onBack = {}, onRefresh = {}, writes = issueWrites)
        }
    }

    @Test
    fun aCommentIsSentAndAWaitingOneSaysSo() {
        val waiting = Comment("pending:k", "i1", Principal("ada", "Ada"), "On its way", now, pending = true)
        issue(IssueState(IssueDetail(issue, listOf(waiting), emptyList()), Fetch.DONE))

        compose.onNodeWithText("Waiting to send").assertIsDisplayed()
        compose.onNodeWithText("Add a comment").performTextInput("Looks good")
        compose.onNodeWithText("Send").performClick()

        assertEquals(listOf("comment:Looks good"), calls)
    }

    @Test
    fun statusAndPriorityArePickedFromTheirFields() {
        issue(IssueState(IssueDetail(issue, emptyList(), emptyList()), Fetch.DONE))

        compose.onNodeWithText("In progress").performClick()
        compose.onNodeWithText("Done").performClick()
        compose.onNodeWithText("High").performClick()
        compose.onNodeWithText("Urgent").performClick()

        assertEquals(listOf("status:done", "priority:urgent"), calls)
    }

    @Test
    fun theAssigneePickerOffersMeUnassignedAndTheTeam() {
        val state = IssueState(
            IssueDetail(issue, emptyList(), emptyList()),
            Fetch.DONE,
            members = Members.Loaded(listOf(Principal("ada", "Ada"), Principal("grace", "Grace"))),
            me = Principal("ada", "Ada"),
        )
        issue(state)

        compose.onNodeWithText("Unassigned").performClick()
        compose.onNodeWithText("Me").assertIsDisplayed()
        compose.onNodeWithText("Grace").performClick()

        assertEquals(listOf("members", "assign:grace"), calls)
    }
}
