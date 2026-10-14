package sh.chaotic.android.ui

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import javax.inject.Inject

/** Which part of the app to show: it follows the session. */
@HiltViewModel
class AppViewModel
@Inject
constructor(sessions: SessionManager) : ViewModel() {
    val state: StateFlow<AuthState> = sessions.state

    init {
        viewModelScope.launch { sessions.load() }
    }
}
