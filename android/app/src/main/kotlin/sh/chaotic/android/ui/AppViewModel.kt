package sh.chaotic.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.filterIsInstance
import kotlinx.coroutines.launch
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheStore
import javax.inject.Inject

/**
 * Which part of the app to show: it follows the session. Signed out (by
 * the person, by Connected apps, or by a refused refresh), the offline
 * cache is emptied: nothing of one account may show up for the next.
 */
@HiltViewModel
class AppViewModel
@Inject
constructor(sessions: SessionManager, cache: CacheStore) : ViewModel() {
    val state: StateFlow<AuthState> = sessions.state

    init {
        viewModelScope.launch { sessions.load() }
        viewModelScope.launch {
            sessions.state.filterIsInstance<AuthState.SignedOut>().collect { cache.clearAll() }
        }
    }
}
