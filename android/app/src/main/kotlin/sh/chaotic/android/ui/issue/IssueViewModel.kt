package sh.chaotic.android.ui.issue

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.toRoute
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.ui.Destination
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.ChaoticRemote
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.IssueFields
import sh.chaotic.sync.PendingOverlay
import sh.chaotic.sync.Principal
import sh.chaotic.sync.RefreshOutcome
import sh.chaotic.sync.Remote
import sh.chaotic.sync.WriteRefusal
import javax.inject.Inject

/** Where the issue screen's data stands: what is cached, and how the last fetch went. */
data class IssueState(
    val detail: IssueDetail? = null,
    val fetch: Fetch = Fetch.LOADING,
    /** This issue's refused writes, until dismissed (CHT-1613). */
    val refusals: List<WriteRefusal> = emptyList(),
    /** Who the issue can be assigned to, fetched when the picker opens. */
    val members: Members = Members.NotLoaded,
    /** The person signed in, offered first in the assignee picker. */
    val me: Principal? = null,
)

sealed interface Members {
    data object NotLoaded : Members

    data object Loading : Members

    data class Loaded(val people: List<Principal>) : Members

    /** Offline, or refused: only "me" and "unassigned" can be offered. */
    data object Unavailable : Members
}

enum class Fetch {
    LOADING,
    DONE,

    /** The fetch failed; whatever is cached is shown. */
    FAILED,

    /** 404: the issue was deleted (and dropped from the cache). */
    GONE,

    /** The person left the issue's team (and that team was dropped from the cache). */
    TEAM_LOST,

    /** A 403 while the person is still in the team: they may not see this issue. */
    FORBIDDEN,
}

/**
 * One issue, from the cache, refreshed from the server each time it is
 * opened, with the person's queued writes to it shown as done (CHT-1613).
 */
@HiltViewModel
class IssueViewModel
@Inject
constructor(
    savedState: SavedStateHandle,
    dao: CacheDao,
    private val refresher: CacheRefresher,
    private val writes: WriteActions,
    private val remote: ChaoticRemote,
    sessions: SessionManager,
) : ViewModel() {
    private val route = savedState.toRoute<Destination.Issue>()
    private val fetch = MutableStateFlow(Fetch.LOADING)
    private val members = MutableStateFlow<Members>(Members.NotLoaded)
    private val me = (sessions.state.value as? AuthState.SignedIn)?.person?.let { Principal(it.id, it.name) }

    private val cached =
        combine(
            dao.observeIssue(route.issueId),
            dao.observeComments(route.issueId),
            dao.observeActivity(route.issueId),
            fetch,
        ) { issue, comments, activity, fetch ->
            IssueState(
                detail = issue?.let {
                    IssueDetail(it.toIssue(), comments.map { c -> c.toComment() }, activity.map { a -> a.toActivity() })
                },
                fetch = fetch,
            )
        }

    val state: StateFlow<IssueState> =
        combine(cached, dao.observeWrites(), dao.observeRefusals(), members) { cached, queued, refused, members ->
            val pending = queued.mapNotNull { it.toWrite() }
            cached.copy(
                detail = cached.detail?.let { PendingOverlay.issue(it, pending, me) },
                refusals = refused.mapNotNull { it.toRefusal() }.filter { it.issueId == route.issueId },
                members = members,
                me = me,
            )
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(STOP_TIMEOUT_MILLIS), IssueState(me = me))

    init {
        refresh()
    }

    fun refresh() {
        fetch.value = Fetch.LOADING
        viewModelScope.launch {
            fetch.value = when (refresher.refreshIssue(route.issueId, route.teamId)) {
                RefreshOutcome.Refreshed, RefreshOutcome.Fresh -> Fetch.DONE

                RefreshOutcome.Gone -> Fetch.GONE

                RefreshOutcome.TeamLost -> Fetch.TEAM_LOST

                RefreshOutcome.Forbidden -> Fetch.FORBIDDEN

                // Signed out: the app is leaving this screen anyway.
                RefreshOutcome.Unauthorized, is RefreshOutcome.Failed -> Fetch.FAILED
            }
        }
    }

    fun comment(content: String) = write { issue -> writes.comment(issue, content) }

    fun setStatus(status: String) = write { issue -> writes.update(issue, IssueFields.STATUS, status) }

    fun setPriority(priority: String) = write { issue -> writes.update(issue, IssueFields.PRIORITY, priority) }

    /** Null unassigns. */
    fun assign(person: Principal?) = write { issue ->
        writes.update(issue, IssueFields.ASSIGNEE, person?.id, person?.name)
    }

    /** The assignee picker opened: fetch the team's members, once. */
    fun loadMembers() {
        if (members.value is Members.Loaded || members.value is Members.Loading) return
        members.value = Members.Loading
        viewModelScope.launch {
            members.value = when (val answer = remote.members(route.teamId)) {
                is Remote.Ok -> Members.Loaded(answer.value.sortedBy { it.name.lowercase() })
                is Remote.Failure -> Members.Unavailable
            }
        }
    }

    fun dismissRefusal(key: String) {
        viewModelScope.launch { writes.dismissRefusal(key) }
    }

    private fun write(queue: suspend (Issue) -> String?) {
        val issue = state.value.detail?.issue ?: return
        viewModelScope.launch { queue(issue) }
    }

    private companion object {
        const val STOP_TIMEOUT_MILLIS = 5_000L
    }
}
