package sh.chaotic.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withTimeoutOrNull
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSyncer
import javax.inject.Inject

/**
 * Opens what a tapped notification was about (CHT-1660). A push carries
 * the entry's id but not its team, which [Destination.Issue] needs, so the
 * entry is read from the cache; a push that came before the sync did is
 * found by syncing once. Opening it reads it, as a tap in the inbox does,
 * and an entry on an issue shows that issue ([issues]). An entry the
 * cache never gets (gone meanwhile, or no network) leaves the app on the
 * inbox. Scoped to the activity, so a tap survives a rotation.
 */
@HiltViewModel
class NotificationTaps
@Inject
constructor(
    private val sessions: SessionManager,
    private val store: CacheStore,
    private val syncer: InboxSyncer,
    private val writes: WriteActions,
) : ViewModel() {
    private val opens = Channel<Destination.Issue>(Channel.CONFLATED)
    private var pending: Job? = null

    /** The issue to show for the latest tap; the signed-in navigation collects it. */
    val issues: Flow<Destination.Issue> = opens.receiveAsFlow()

    fun open(entryId: String) {
        pending?.cancel()
        pending = viewModelScope.launch {
            val entry = withTimeoutOrNull(WAIT_MILLIS) { find(entryId) } ?: return@launch
            writes.opened(entry)
            entry.issueId?.let { opens.send(Destination.Issue(it, entry.teamId)) }
        }
    }

    private suspend fun find(entryId: String): InboxEntry? {
        // The session loads as the app starts; the cache is only this person's once it has.
        sessions.state.first { it is AuthState.SignedIn }
        return store.inboxEntry(entryId) ?: run {
            syncer.sync()
            store.inboxEntry(entryId)
        }
    }

    private companion object {
        /** Long enough for a sync on a slow network; after that, the inbox is where the person is. */
        const val WAIT_MILLIS = 30_000L
    }
}
