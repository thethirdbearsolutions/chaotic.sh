package sh.chaotic.android.ui.home

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.ui.common.SyncProblem
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.PollSchedule
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.SyncLoop
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.Team
import sh.chaotic.sync.forDisplay
import javax.inject.Inject

enum class HomeTab { INBOX, SPRINT }

data class HomeState(
    val teams: List<Team> = emptyList(),
    /** The team picked, or null for every team. Only offered with more than one team. */
    val teamId: String? = null,
    val inbox: InboxSections = InboxSections.of(emptyList()),
    val sprintCards: List<SprintCard> = emptyList(),
    val tab: HomeTab = HomeTab.INBOX,
    val refreshing: Boolean = false,
    val problem: SyncProblem? = null,
)

/**
 * The signed-in home: the inbox and the sprint cards, both read from the
 * Room cache and kept current by core-sync. The screen calls
 * [runWhileVisible] while it is on screen (the foreground poll); a pull
 * to refresh calls [refresh].
 */
@HiltViewModel
class HomeViewModel
@Inject
constructor(
    private val sessions: SessionManager,
    private val savedState: SavedStateHandle,
    dao: CacheDao,
    private val syncer: InboxSyncer,
    private val refresher: CacheRefresher,
    private val trigger: SyncTrigger,
) : ViewModel() {
    private val selectedTeam = savedState.getStateFlow<String?>(KEY_TEAM, null)
    private val tab = savedState.getStateFlow(KEY_TAB, HomeTab.INBOX.name)
    private val refreshing = MutableStateFlow(false)
    private val problem = MutableStateFlow<SyncProblem?>(null)

    private val teams = dao.observeTeams().map { rows -> rows.map { it.toTeam() } }
    private val entries = dao.observeInbox().map { rows -> rows.map { it.toEntry() } }
    private val cards = dao.observeAllSprintCards().map { rows -> rows.map { it.toCard() } }

    private val data = combine(teams, entries, cards, selectedTeam, tab) { teams, entries, cards, selected, tab ->
        // A team picked earlier and since left reads as "every team".
        val teamId = selected?.takeIf { id -> teams.any { it.id == id } }
        HomeState(
            teams = teams,
            teamId = teamId,
            inbox = InboxSections.of(entries, teamId),
            sprintCards = cards.filter { teamId == null || it.teamId == teamId }.forDisplay(),
            tab = HomeTab.entries.firstOrNull { it.name == tab } ?: HomeTab.INBOX,
        )
    }

    val state: StateFlow<HomeState> =
        combine(data, refreshing, problem) { data, refreshing, problem ->
            data.copy(refreshing = refreshing, problem = problem)
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(STOP_TIMEOUT_MILLIS), HomeState())

    /** The foreground poll: teams once, then the inbox loop until cancelled (the screen left) or signed out. */
    suspend fun runWhileVisible() {
        refresher.refreshTeams()
        SyncLoop(syncer, PollSchedule(), trigger) { problem.value = SyncProblem.of(it) }.run()
    }

    /** Pull to refresh: the inbox, the team list, and the sprint cards shown. */
    fun refresh() {
        if (refreshing.value) return
        refreshing.value = true
        viewModelScope.launch {
            try {
                problem.value = SyncProblem.of(syncer.sync())
                refresher.refreshTeams()
                refreshSprintCards(state.value.teamId)
            } finally {
                refreshing.value = false
            }
        }
    }

    fun selectTeam(teamId: String?) {
        savedState[KEY_TEAM] = teamId
        if (state.value.tab == HomeTab.SPRINT) viewModelScope.launch { refreshSprintCards(teamId) }
    }

    fun selectTab(tab: HomeTab) {
        savedState[KEY_TAB] = tab.name
        if (tab == HomeTab.SPRINT) viewModelScope.launch { refreshSprintCards(state.value.teamId) }
    }

    fun signOut() {
        viewModelScope.launch { sessions.signOut() }
    }

    /** [teamId]'s cards, or every team's when it is null. */
    private suspend fun refreshSprintCards(teamId: String?) {
        val teamIds = teamId?.let(::listOf) ?: state.value.teams.map { it.id }
        teamIds.forEach { refresher.refreshSprintCards(it) }
    }

    private companion object {
        const val KEY_TEAM = "team"
        const val KEY_TAB = "tab"
        const val STOP_TIMEOUT_MILLIS = 5_000L
    }
}
