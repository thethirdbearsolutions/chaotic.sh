package sh.chaotic.android.ui.issue

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import sh.chaotic.android.R
import sh.chaotic.android.ui.common.RefusalList
import sh.chaotic.android.ui.common.StalledList
import sh.chaotic.android.ui.common.humanize
import sh.chaotic.android.ui.common.rememberNow
import sh.chaotic.android.ui.common.whoLabel
import sh.chaotic.android.ui.markdown.MarkdownText
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.Activity
import sh.chaotic.sync.Comment
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.Principal
import sh.chaotic.sync.RelativeAge

@Composable
fun IssueScreen(onBack: () -> Unit, viewModel: IssueViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    IssueContent(
        state = state,
        nowMillis = rememberNow(),
        onBack = onBack,
        onRefresh = viewModel::refresh,
        writes = IssueWrites(
            onComment = viewModel::comment,
            onStatus = viewModel::setStatus,
            onPriority = viewModel::setPriority,
            onAssign = viewModel::assign,
            onPickAssignee = viewModel::loadMembers,
            onDismissRefusal = viewModel::dismissRefusal,
            onRetry = viewModel::retry,
            onDiscard = viewModel::discard,
        ),
    )
}

/** The issue screen's writes (CHT-1613); the defaults do nothing, for previews and tests. */
class IssueWrites(
    val onComment: (String) -> Unit = {},
    val onStatus: (String) -> Unit = {},
    val onPriority: (String) -> Unit = {},
    /** Null unassigns. */
    val onAssign: (Principal?) -> Unit = {},
    /** The assignee picker opened. */
    val onPickAssignee: () -> Unit = {},
    val onDismissRefusal: (String) -> Unit = {},
    val onRetry: (String) -> Unit = {},
    val onDiscard: (String) -> Unit = {},
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IssueContent(
    state: IssueState,
    nowMillis: Long,
    onBack: () -> Unit,
    onRefresh: () -> Unit,
    modifier: Modifier = Modifier,
    writes: IssueWrites = IssueWrites(),
) {
    Scaffold(
        modifier = modifier.fillMaxSize(),
        topBar = {
            TopAppBar(
                title = { Text(state.detail?.issue?.identifier.orEmpty()) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            painterResource(R.drawable.ic_arrow_back),
                            contentDescription = stringResource(R.string.issue_back),
                        )
                    }
                },
            )
        },
    ) { padding ->
        PullToRefreshBox(
            isRefreshing = state.fetch == Fetch.LOADING && state.detail != null,
            onRefresh = onRefresh,
            modifier = Modifier.fillMaxSize().padding(padding),
        ) {
            LazyColumn(
                Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                if (state.refusals.isNotEmpty()) {
                    item { RefusalList(state.refusals, writes.onDismissRefusal) }
                }
                if (state.stalled.isNotEmpty()) {
                    item { StalledList(state.stalled, writes.onRetry, writes.onDiscard) }
                }
                notice(state)?.let { message -> item { Text(message.text(), color = message.color()) } }
                val detail = state.detail ?: return@LazyColumn
                item { Header(detail.issue, state, writes) }
                item {
                    val description = detail.issue.description
                    if (description.isNullOrBlank()) {
                        Text(
                            stringResource(R.string.issue_no_description),
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    } else {
                        MarkdownText(description)
                    }
                }
                item { SectionTitle(stringResource(R.string.issue_comments)) }
                items(detail.comments, key = { "c-${it.id}" }) { CommentView(it, nowMillis) }
                item { CommentBox(writes.onComment) }
                if (detail.activity.isNotEmpty()) {
                    item { SectionTitle(stringResource(R.string.issue_activity)) }
                    items(detail.activity, key = { "a-${it.id}" }) { ActivityView(it, nowMillis) }
                }
            }
        }
        if (state.fetch == Fetch.LOADING && state.detail == null) {
            LinearProgressIndicator(Modifier.fillMaxWidth().padding(padding))
        }
    }
}

/** What to say above (or instead of) the issue. */
private enum class Notice(val message: Int, val isError: Boolean) {
    LOADING(R.string.issue_loading, false),
    NOT_CACHED(R.string.issue_not_cached, true),
    GONE(R.string.issue_gone, true),
    TEAM_LOST(R.string.issue_team_lost, true),
    FORBIDDEN(R.string.issue_forbidden, true),
    ;

    @Composable
    fun text() = stringResource(message)

    @Composable
    fun color() = if (isError) MaterialTheme.colorScheme.error else MaterialTheme.colorScheme.onSurfaceVariant
}

private fun notice(state: IssueState): Notice? = when (state.fetch) {
    Fetch.GONE -> Notice.GONE
    Fetch.TEAM_LOST -> Notice.TEAM_LOST
    Fetch.FORBIDDEN -> Notice.FORBIDDEN
    Fetch.LOADING -> if (state.detail == null) Notice.LOADING else null
    Fetch.FAILED -> if (state.detail == null) Notice.NOT_CACHED else null
    Fetch.DONE -> null
}

@Composable
private fun SectionTitle(text: String) {
    Text(text, style = MaterialTheme.typography.titleMedium, modifier = Modifier.padding(top = 8.dp))
}

@Composable
private fun CommentView(comment: Comment, nowMillis: Long) {
    Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
        Byline(comment.author, comment.createdAtMillis, nowMillis)
        if (comment.pending) {
            Text(
                stringResource(R.string.issue_comment_pending),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
        MarkdownText(comment.content)
        HorizontalDivider()
    }
}

@Composable
private fun ActivityView(activity: Activity, nowMillis: Long) {
    Column {
        Byline(activity.actor, activity.createdAtMillis, nowMillis)
        val change = listOfNotNull(activity.oldValue, activity.newValue).joinToString(" → ")
        Text(
            listOf(humanize(activity.type), change).filter { it.isNotEmpty() }.joinToString(": "),
            style = MaterialTheme.typography.bodySmall,
        )
    }
}

@Composable
private fun Byline(who: Principal?, atMillis: Long, nowMillis: Long) {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(whoLabel(who), style = MaterialTheme.typography.labelLarge)
        Text(
            RelativeAge.format(atMillis, nowMillis),
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

@Preview
@Composable
private fun IssuePreview() {
    val now = 1_800_000_000_000L
    ChaoticTheme {
        IssueContent(
            state = IssueState(
                detail = IssueDetail(
                    issue = Issue(
                        id = "i1", teamId = "t", projectId = "p", identifier = "CHT-1611",
                        title = "Read-only screens", description = "## Plan\n\n- **Inbox**\n- Issue detail",
                        status = "in_progress", priority = "high", estimate = 8,
                        assignee = Principal("a", "Claude", isAgent = true, ownerName = "ethan"),
                        updatedAtMillis = now, openedAtMillis = now,
                    ),
                    comments = listOf(Comment("c1", "i1", Principal("u", "Ada"), "Looks good.", now - 60_000)),
                    activity = listOf(
                        Activity(
                            "a1",
                            "i1",
                            "status_changed",
                            "status",
                            "todo",
                            "in_progress",
                            Principal("u", "Ada"),
                            now - 120_000,
                        ),
                    ),
                ),
                fetch = Fetch.DONE,
            ),
            nowMillis = now,
            onBack = {},
            onRefresh = {},
        )
    }
}
