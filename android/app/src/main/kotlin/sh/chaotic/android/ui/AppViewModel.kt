package sh.chaotic.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheSession
import javax.inject.Inject

/**
 * Which part of the app to show: it follows the session. Signed out (by
 * the person, by Connected apps, or by a refused refresh), the offline
 * cache is emptied and every write still in flight is refused: nothing of
 * one account may show up for the next. Signed in, the cache is claimed
 * for that person at once, so a cache another person left behind is
 * emptied before the home screen reads it.
 */
@HiltViewModel
class AppViewModel
@Inject
constructor(sessions: SessionManager, cache: CacheSession) : ViewModel() {
    val state: StateFlow<AuthState> = sessions.state

    init {
        viewModelScope.launch { sessions.load() }
        viewModelScope.launch {
            sessions.state.collect { state ->
                when (state) {
                    is AuthState.SignedOut -> cache.end()
                    is AuthState.SignedIn -> cache.begin()
                    AuthState.Loading -> Unit
                }
            }
        }
    }
}
