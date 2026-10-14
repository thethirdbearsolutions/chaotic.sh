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
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.IssueDetail
import sh.chaotic.sync.RefreshOutcome
import javax.inject.Inject

/** Where the issue screen's data stands: what is cached, and how the last fetch went. */
data class IssueState(val detail: IssueDetail? = null, val fetch: Fetch = Fetch.LOADING)

enum class Fetch {
    LOADING,
    DONE,

    /** The fetch failed; whatever is cached is shown. */
    FAILED,

    /** 404: the issue was deleted (and dropped from the cache). */
    GONE,

    /** 403: the person left the issue's team (and that team was dropped from the cache). */
    TEAM_LOST,
}

/** One issue, from the cache, refreshed from the server each time it is opened. */
@HiltViewModel
class IssueViewModel
@Inject
constructor(
    savedState: SavedStateHandle,
    dao: CacheDao,
    private val refresher: CacheRefresher,
) : ViewModel() {
    private val route = savedState.toRoute<Destination.Issue>()
    private val fetch = MutableStateFlow(Fetch.LOADING)

    val state: StateFlow<IssueState> =
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
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(STOP_TIMEOUT_MILLIS), IssueState())

    init {
        refresh()
    }

    fun refresh() {
        fetch.value = Fetch.LOADING
        viewModelScope.launch {
            fetch.value = when (refresher.refreshIssue(route.issueId, route.teamId)) {
                RefreshOutcome.Refreshed -> Fetch.DONE

                RefreshOutcome.Gone -> Fetch.GONE

                RefreshOutcome.TeamLost -> Fetch.TEAM_LOST

                // Signed out: the app is leaving this screen anyway.
                RefreshOutcome.Unauthorized, is RefreshOutcome.Failed -> Fetch.FAILED
            }
        }
    }

    private companion object {
        const val STOP_TIMEOUT_MILLIS = 5_000L
    }
}
