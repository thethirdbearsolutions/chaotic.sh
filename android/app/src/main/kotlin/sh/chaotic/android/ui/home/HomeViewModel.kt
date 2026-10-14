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
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.ui.common.SyncProblem
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.PendingOverlay
import sh.chaotic.sync.PendingWrite
import sh.chaotic.sync.PollSchedule
import sh.chaotic.sync.SprintCard
import sh.chaotic.sync.SyncLoop
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.Team
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteRefusal
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
    /** Writes the server refused, with its reasons, until dismissed (CHT-1613). */
    val refusals: List<WriteRefusal> = emptyList(),
    /** The swipe that can still be taken back, for the undo snackbar. */
    val undo: UndoOffer? = null,
    /** Writes the server kept failing, which wait for the person to retry or discard them. */
    val stalled: List<PendingWrite> = emptyList(),
    /** What an Undo came too late for (the write had gone), to say so once. */
    val tooLate: String? = null,
)

/** The write queue's part of [HomeState]. */
private data class WriteNotices(
    val refusals: List<WriteRefusal>,
    val stalled: List<PendingWrite>,
    val undo: UndoOffer?,
    val tooLate: String?,
)

/** A queued swipe still inside its undo window: [key] is the write's, [label] what it was done to. */
data class UndoOffer(val key: String, val kind: WriteKind, val label: String)

/**
 * The signed-in home: the inbox and the sprint cards, both read from the
 * Room cache and kept current by core-sync. The screen calls
 * [runWhileVisible] while it is on screen (the foreground poll); a pull
 * to refresh calls [refresh].
 *
 * The poll's schedule lives here rather than in the loop, so coming back
 * to the screen (from an issue, or from the background) keeps the
 * interval, the backoff and the server's Retry-After instead of syncing
 * at once; the team list and sprint cards are skipped while fresh. Only a
 * pull to refresh asks for everything now.
 */
@HiltViewModel
@Suppress("TooManyFunctions") // the screen's actions, one function each
class HomeViewModel
@Inject
constructor(
    private val sessions: SessionManager,
    private val savedState: SavedStateHandle,
    dao: CacheDao,
    private val syncer: InboxSyncer,
    private val refresher: CacheRefresher,
    private val trigger: SyncTrigger,
    private val writes: WriteActions,
) : ViewModel() {
    private val selectedTeam = savedState.getStateFlow<String?>(KEY_TEAM, null)
    private val tab = savedState.getStateFlow(KEY_TAB, HomeTab.INBOX.name)
    private val refreshing = MutableStateFlow(false)
    private val problem = MutableStateFlow<SyncProblem?>(null)
    private val undoOffer = MutableStateFlow<UndoOffer?>(null)
    private val tooLate = MutableStateFlow<String?>(null)
    private val schedule = PollSchedule()

    private val teams = dao.observeTeams().map { rows -> rows.map { it.toTeam() } }
    private val queued = dao.observeWrites().map { rows -> rows.mapNotNull { it.toWrite() } }

    // The cache with the queued writes laid over it: a swiped entry leaves at once.
    private val entries = combine(dao.observeInbox(), queued) { rows, queued ->
        PendingOverlay.inbox(rows.map { it.toEntry() }, queued)
    }
    private val refusals = dao.observeRefusals().map { rows -> rows.mapNotNull { it.toRefusal() } }
    private val notices = combine(refusals, queued, undoOffer, tooLate) { refusals, queued, undo, tooLate ->
        WriteNotices(refusals, queued.filter { it.stalled }, undo, tooLate)
    }
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
        combine(data, refreshing, problem, notices) { data, refreshing, problem, notices ->
            data.copy(
                refreshing = refreshing,
                problem = problem,
                refusals = notices.refusals,
                undo = notices.undo,
                stalled = notices.stalled,
                tooLate = notices.tooLate,
            )
        }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(STOP_TIMEOUT_MILLIS), HomeState())

    /** The foreground poll: teams unless fresh, then the inbox loop until cancelled (the screen left) or signed out. */
    suspend fun runWhileVisible() {
        refresher.refreshTeams()
        SyncLoop(syncer, schedule, trigger) { problem.value = SyncProblem.of(it) }.run()
    }

    /** Pull to refresh: the inbox, the team list, and the sprint cards shown. */
    fun refresh() {
        if (refreshing.value) return
        refreshing.value = true
        viewModelScope.launch {
            try {
                problem.value = SyncProblem.of(syncer.sync())
                refresher.refreshTeams(force = true)
                refreshSprintCards(state.value.teamId, force = true)
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

    /** Opening an entry reads it (CHT-1613), through the queue like any write. */
    fun open(entry: InboxEntry) {
        viewModelScope.launch { writes.opened(entry) }
    }

    fun approve(entry: InboxEntry) = offerUndo(entry, WriteKind.APPROVE) { writes.approve(entry) }

    fun reject(entry: InboxEntry, note: String) = offerUndo(entry, WriteKind.REJECT) { writes.reject(entry, note) }

    fun markRead(entry: InboxEntry) = offerUndo(entry, WriteKind.MARK_READ) { writes.markRead(entry) }

    fun archive(entry: InboxEntry) = offerUndo(entry, WriteKind.ARCHIVE) { writes.archive(entry) }

    /** The snackbar's Undo; if the write had already gone, the person is told so. */
    fun undo(key: String) {
        val label = undoOffer.value?.takeIf { it.key == key }?.label
        undoGone(key)
        viewModelScope.launch {
            if (!writes.undo(key) && label != null) tooLate.value = label
        }
    }

    /** The snackbar went away without an undo. */
    fun undoGone(key: String) {
        undoOffer.update { if (it?.key == key) null else it }
    }

    /** The "already sent" notice was shown. */
    fun tooLateShown() {
        tooLate.value = null
    }

    fun dismissRefusal(key: String) {
        viewModelScope.launch { writes.dismissRefusal(key) }
    }

    /** Send a stalled write again. */
    fun retry(key: String) {
        viewModelScope.launch { writes.retry(key) }
    }

    /** Drop a stalled write. */
    fun discard(key: String) {
        viewModelScope.launch { writes.undo(key) }
    }

    private fun offerUndo(entry: InboxEntry, kind: WriteKind, queue: suspend () -> String?) {
        viewModelScope.launch {
            val key = queue() ?: return@launch
            undoOffer.value = UndoOffer(key, kind, entry.issueIdentifier ?: entry.documentTitle ?: entry.title)
        }
    }

    fun signOut() {
        viewModelScope.launch { sessions.signOut() }
    }

    /** [teamId]'s cards, or every team's when it is null; unless [force], those fetched recently are kept. */
    private suspend fun refreshSprintCards(teamId: String?, force: Boolean = false) {
        val teamIds = teamId?.let(::listOf) ?: state.value.teams.map { it.id }
        teamIds.forEach { refresher.refreshSprintCards(it, force) }
    }

    private companion object {
        const val KEY_TEAM = "team"
        const val KEY_TAB = "tab"
        const val STOP_TIMEOUT_MILLIS = 5_000L
    }
}
