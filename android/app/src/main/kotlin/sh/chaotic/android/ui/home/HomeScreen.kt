package sh.chaotic.android.ui.home

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Badge
import androidx.compose.material3.BadgedBox
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.PrimaryTabRow
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Tab
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.pulltorefresh.PullToRefreshBox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.compose.LocalLifecycleOwner
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.repeatOnLifecycle
import sh.chaotic.android.R
import sh.chaotic.android.ui.common.RefusalList
import sh.chaotic.android.ui.common.StalledList
import sh.chaotic.android.ui.common.SyncProblemBanner
import sh.chaotic.android.ui.common.rememberNow
import sh.chaotic.android.ui.inbox.InboxList
import sh.chaotic.android.ui.inbox.InboxRowActions
import sh.chaotic.android.ui.inbox.RejectPanel
import sh.chaotic.android.ui.inbox.TooLateSnackbar
import sh.chaotic.android.ui.inbox.UndoSnackbar
import sh.chaotic.android.ui.sprint.SprintList
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Principal
import sh.chaotic.sync.Team

@Composable
fun HomeScreen(onOpenIssue: (issueId: String, teamId: String) -> Unit, viewModel: HomeViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    val lifecycle = LocalLifecycleOwner.current.lifecycle
    // Poll only while the app is on screen; push (CHT-1612) covers the rest.
    LaunchedEffect(lifecycle, viewModel) {
        lifecycle.repeatOnLifecycle(Lifecycle.State.STARTED) { viewModel.runWhileVisible() }
    }
    HomeContent(
        state = state,
        nowMillis = rememberNow(),
        onRefresh = viewModel::refresh,
        onSelectTab = viewModel::selectTab,
        onSelectTeam = viewModel::selectTeam,
        onOpen = { entry ->
            viewModel.open(entry)
            entry.issueId?.let { onOpenIssue(it, entry.teamId) }
        },
        onSignOut = viewModel::signOut,
        writes = HomeWrites(
            onApprove = viewModel::approve,
            onReject = viewModel::reject,
            onMarkRead = viewModel::markRead,
            onArchive = viewModel::archive,
            onUndo = viewModel::undo,
            onUndoGone = viewModel::undoGone,
            onDismissRefusal = viewModel::dismissRefusal,
            onRetry = viewModel::retry,
            onDiscard = viewModel::discard,
            onTooLateShown = viewModel::tooLateShown,
        ),
    )
}

/** The home screen's writes (CHT-1613); the defaults do nothing, for previews and tests. */
class HomeWrites(
    val onApprove: (InboxEntry) -> Unit = {},
    val onReject: (InboxEntry, String) -> Unit = { _, _ -> },
    val onMarkRead: (InboxEntry) -> Unit = {},
    val onArchive: (InboxEntry) -> Unit = {},
    val onUndo: (String) -> Unit = {},
    val onUndoGone: (String) -> Unit = {},
    val onDismissRefusal: (String) -> Unit = {},
    val onRetry: (String) -> Unit = {},
    val onDiscard: (String) -> Unit = {},
    val onTooLateShown: () -> Unit = {},
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeContent(
    state: HomeState,
    nowMillis: Long,
    onRefresh: () -> Unit,
    onSelectTab: (HomeTab) -> Unit,
    onSelectTeam: (String?) -> Unit,
    onOpen: (InboxEntry) -> Unit,
    onSignOut: () -> Unit,
    modifier: Modifier = Modifier,
    writes: HomeWrites = HomeWrites(),
) {
    val snackbar = remember { SnackbarHostState() }
    var rejecting by remember { mutableStateOf<InboxEntry?>(null) }
    UndoSnackbar(state.undo, snackbar, writes)
    TooLateSnackbar(state.tooLate, snackbar, writes.onTooLateShown)
    Scaffold(
        modifier = modifier.fillMaxSize(),
        snackbarHost = { SnackbarHost(snackbar) },
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.home_title)) },
                actions = {
                    if (state.teams.size > 1) TeamPicker(state.teams, state.teamId, onSelectTeam)
                    OverflowMenu(onSignOut)
                },
            )
        },
    ) { padding ->
        Column(Modifier.fillMaxSize().padding(padding)) {
            PrimaryTabRow(selectedTabIndex = state.tab.ordinal) {
                Tab(
                    selected = state.tab == HomeTab.INBOX,
                    onClick = { onSelectTab(HomeTab.INBOX) },
                    text = {
                        BadgedBox(
                            badge = { if (state.inbox.unread > 0) Badge { Text(state.inbox.unread.toString()) } },
                        ) { Text(stringResource(R.string.home_tab_inbox)) }
                    },
                )
                Tab(
                    selected = state.tab == HomeTab.SPRINT,
                    onClick = { onSelectTab(HomeTab.SPRINT) },
                    text = { Text(stringResource(R.string.home_tab_sprint)) },
                )
            }
            SyncProblemBanner(state.problem)
            RefusalList(state.refusals, writes.onDismissRefusal)
            StalledList(state.stalled, writes.onRetry, writes.onDiscard)
            rejecting?.let { entry ->
                RejectPanel(
                    entry = entry,
                    onReject = { note ->
                        rejecting = null
                        writes.onReject(entry, note)
                    },
                    onCancel = { rejecting = null },
                )
            }
            PullToRefreshBox(
                isRefreshing = state.refreshing,
                onRefresh = onRefresh,
                modifier = Modifier.fillMaxSize(),
            ) {
                when (state.tab) {
                    HomeTab.INBOX -> InboxList(
                        state.inbox,
                        nowMillis,
                        onOpen,
                        actions = InboxRowActions(
                            onApprove = writes.onApprove,
                            onReject = { rejecting = it },
                            onMarkRead = writes.onMarkRead,
                            onArchive = writes.onArchive,
                        ),
                    )

                    HomeTab.SPRINT -> SprintList(state.sprintCards)
                }
            }
        }
    }
}

@Composable
private fun TeamPicker(teams: List<Team>, selected: String?, onSelect: (String?) -> Unit) {
    var open by remember { mutableStateOf(false) }
    val all = stringResource(R.string.home_all_teams)
    Box {
        TextButton(onClick = { open = true }) {
            Text(stringResource(R.string.home_pick_team, teams.firstOrNull { it.id == selected }?.name ?: all))
        }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            DropdownMenuItem(text = { Text(all) }, onClick = {
                open = false
                onSelect(null)
            })
            teams.forEach { team ->
                DropdownMenuItem(text = { Text(team.name) }, onClick = {
                    open = false
                    onSelect(team.id)
                })
            }
        }
    }
}

@Composable
private fun OverflowMenu(onSignOut: () -> Unit) {
    var open by remember { mutableStateOf(false) }
    Box {
        IconButton(onClick = { open = true }) {
            Icon(painterResource(R.drawable.ic_more_vert), contentDescription = stringResource(R.string.home_more))
        }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            DropdownMenuItem(text = { Text(stringResource(R.string.home_sign_out)) }, onClick = {
                open = false
                onSignOut()
            })
        }
    }
}

@Preview
@Composable
private fun HomePreview() {
    val now = 1_800_000_000_000L
    ChaoticTheme {
        HomeContent(
            state = HomeState(
                teams = listOf(Team("t1", "Third Bear", "TB"), Team("t2", "Side", "SD")),
                inbox = InboxSections.of(
                    listOf(
                        InboxEntry(
                            id = "1", teamId = "t1", kind = "review_requested", title = "Review: design note",
                            issueId = "i1", issueIdentifier = "CHT-1611",
                            source = Principal("a", "Claude", isAgent = true, ownerName = "ethan"),
                            createdAtMillis = now - 600_000, updatedAtMicros = 0,
                        ),
                    ),
                ),
            ),
            nowMillis = now,
            onRefresh = {},
            onSelectTab = {},
            onSelectTeam = {},
            onOpen = {},
            onSignOut = {},
        )
    }
}
