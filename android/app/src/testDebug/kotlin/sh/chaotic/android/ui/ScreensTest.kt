package sh.chaotic.android.ui

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import org.junit.Rule
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import sh.chaotic.android.ui.home.HomeContent
import sh.chaotic.android.ui.home.HomeState
import sh.chaotic.android.ui.home.HomeTab
import sh.chaotic.android.ui.issue.Fetch
import sh.chaotic.android.ui.issue.IssueContent
import sh.chaotic.android.ui.issue.IssueState
import sh.chaotic.android.ui.markdown.MARKDOWN_COLLAPSED_CHARS
import sh.chaotic.android.ui.markdown.MarkdownText
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.Comment
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.Principal
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.Team
import sh.chaotic.sync.UNKNOWN_VALUE
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Compose UI tests of the read-only screens (CHT-1611), on Robolectric.
 * In src/testDebug because the activity the rule launches comes from
 * ui-test-manifest, a debug-only dependency.
 */
@RunWith(RobolectricTestRunner::class)
// Tall enough that every row of these small lists is laid out and on screen.
@Config(qualifiers = "w411dp-h1200dp")
class ScreensTest {
    @get:Rule
    val compose = createComposeRule()

    private val now = 1_800_000_000_000L
    private val minute = 60_000L

    private val gate = InboxEntry(
        id = "g1", teamId = "t1", kind = "gate_pending", title = "Gate: human review", issueId = "i1",
        issueIdentifier = "CHT-1611", source = Principal("a", "Claude", isAgent = true, ownerName = "ethan"),
        createdAtMillis = now - 5 * minute, updatedAtMicros = 1,
    )
    private val mention = InboxEntry(
        id = "m1", teamId = "t1", kind = "mention", title = "Mentioned you", documentId = "d1",
        documentTitle = "Scoping", source = Principal("u", "Ada"),
        createdAtMillis = now - 3 * 60 * minute, updatedAtMicros = 2, read = true,
    )

    private fun home(state: HomeState, onOpen: (InboxEntry) -> Unit = {}, onTab: (HomeTab) -> Unit = {}) =
        compose.setContent {
            ChaoticTheme {
                HomeContent(
                    state = state,
                    nowMillis = now,
                    onRefresh = {},
                    onSelectTab = onTab,
                    onSelectTeam = {},
                    onOpen = onOpen,
                    onSignOut = {},
                )
            }
        }

    @Test
    fun inboxShowsBothSectionsWhoAndAge() {
        home(HomeState(inbox = InboxSections.of(listOf(mention, gate))))

        compose.onNodeWithText("Needs you").assertIsDisplayed()
        compose.onNodeWithText("For you").assertIsDisplayed()
        compose.onNodeWithText("Claude (agent of ethan)").assertIsDisplayed()
        compose.onNodeWithText("CHT-1611  Gate: human review").assertIsDisplayed()
        compose.onNodeWithText("5m").assertIsDisplayed()
        compose.onNodeWithText("Scoping  Mentioned you").assertIsDisplayed()
        compose.onNodeWithText("3h").assertIsDisplayed()
        // One unread: the badge and the row's dot.
        compose.onNodeWithText("1").assertIsDisplayed()
        compose.onNodeWithContentDescription("Unread").assertIsDisplayed()
    }

    @Test
    fun tappingARowWithAnIssueOpensIt() {
        val opened = mutableListOf<String>()
        home(HomeState(inbox = InboxSections.of(listOf(gate, mention))), onOpen = { opened += it.id })

        compose.onNodeWithText("CHT-1611  Gate: human review").performClick()
        compose.onNodeWithText("Scoping  Mentioned you").performClick()

        assertEquals(listOf("g1"), opened)
    }

    @Test
    fun anEmptyInboxSaysSo() {
        home(HomeState())

        compose.onNodeWithText("Nothing is waiting on you.").assertIsDisplayed()
    }

    @Test
    fun theTeamPickerAppearsOnlyWithMoreThanOneTeam() {
        home(HomeState(teams = listOf(Team("t1", "Third Bear", "TB"), Team("t2", "Side", "SD")), teamId = "t2"))

        compose.onNodeWithText("Team: Side").performClick()
        compose.onNodeWithText("All teams").assertIsDisplayed()
        compose.onNodeWithText("Third Bear").assertIsDisplayed()
    }

    @Test
    fun sprintTabShowsArrearsAndLimbo() {
        val cards = listOf(
            SprintCard("p1", "t1", "Chaotic", "CHT", "s1", "Sprint 118", 20, 23, limbo = false),
            SprintCard("p2", "t1", "Website", "WEB", "s2", "Sprint 4", null, 4, true, listOf("retro", "demo")),
        )
        home(HomeState(sprintCards = cards, tab = HomeTab.SPRINT))

        compose.onNodeWithText("23 of 20 points spent").assertIsDisplayed()
        compose.onNodeWithText(
            "Over budget by 3 points. Tickets cannot move to in progress, done or canceled " +
                "until this sprint is closed.",
        ).assertIsDisplayed()
        compose.onNodeWithText("Closing, waiting on rituals: retro, demo").assertIsDisplayed()
        compose.onNodeWithText("4 points spent, no budget").assertIsDisplayed()
    }

    @Test
    fun issueDetailShowsFieldsDescriptionAndComments() {
        val detail = IssueDetail(
            issue = Issue(
                id = "i1", teamId = "t1", projectId = "p1", identifier = "CHT-1611", title = "Read-only screens",
                description = "## Plan\n\n- **Inbox** first", status = "in_progress", priority = "high",
                estimate = 8, assignee = Principal("a", "Claude", isAgent = true, ownerName = "ethan"),
                updatedAtMillis = now, openedAtMillis = now,
            ),
            comments = listOf(Comment("c1", "i1", Principal("u", "Ada"), "Looks *good*.", now - minute)),
            activity = emptyList(),
        )
        compose.setContent {
            ChaoticTheme { IssueContent(IssueState(detail, Fetch.DONE), nowMillis = now, onBack = {}, onRefresh = {}) }
        }

        compose.onNodeWithText("Read-only screens").assertIsDisplayed()
        compose.onNodeWithText("In progress").assertIsDisplayed()
        compose.onNodeWithText("High").assertIsDisplayed()
        compose.onNodeWithText("Claude (agent of ethan)").assertIsDisplayed()
        compose.onNodeWithText("Plan").assertIsDisplayed()
        compose.onNodeWithText("Inbox first").assertIsDisplayed()
        compose.onNodeWithText("Comments").assertIsDisplayed()
        compose.onNodeWithText("Looks good.").assertIsDisplayed()
    }

    @Test
    fun anIssueNeverCachedAndUnreachableSaysSo() {
        compose.setContent {
            ChaoticTheme { IssueContent(IssueState(null, Fetch.FAILED), nowMillis = now, onBack = {}, onRefresh = {}) }
        }

        compose.onNodeWithText(
            "This issue is not saved on this device yet, and the server cannot be reached.",
        ).assertIsDisplayed()
    }

    @Test
    fun anIssueFromALeftTeamSaysSo() {
        compose.setContent {
            ChaoticTheme {
                IssueContent(
                    IssueState(null, Fetch.TEAM_LOST),
                    nowMillis = now,
                    onBack = {},
                    onRefresh = {},
                )
            }
        }

        compose.onNodeWithText("You are no longer in this issue's team.").assertIsDisplayed()
    }

    @Test
    fun aForbiddenIssueSaysSo() {
        compose.setContent {
            ChaoticTheme {
                IssueContent(IssueState(null, Fetch.FORBIDDEN), nowMillis = now, onBack = {}, onRefresh = {})
            }
        }

        compose.onNodeWithText("The server would not show this issue to this app.").assertIsDisplayed()
    }

    @Test
    fun anUnknownKindHasANeutralLabel() {
        home(HomeState(inbox = InboxSections.of(listOf(mention.copy(kind = UNKNOWN_VALUE)))))

        compose.onNodeWithText("Update").assertIsDisplayed()
    }

    @Test
    fun longMarkdownIsCutUntilAskedFor() {
        val long = "word ".repeat(MARKDOWN_COLLAPSED_CHARS / 4)
        compose.setContent { ChaoticTheme { MarkdownText(long) } }

        compose.onNodeWithText("Show more").performClick()

        compose.onNodeWithText("Show more").assertDoesNotExist()
    }
}
