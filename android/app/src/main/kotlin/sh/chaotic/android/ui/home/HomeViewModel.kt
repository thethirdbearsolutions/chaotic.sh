package sh.chaotic.android.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import io.ktor.client.engine.HttpClientEngine
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import sh.chaotic.api.apis.AuthApi
import sh.chaotic.api.client.ChaoticApi
import sh.chaotic.auth.SessionManager
import java.io.IOException
import javax.inject.Inject
import kotlin.coroutines.cancellation.CancellationException

sealed interface MeState {
    data object Loading : MeState

    data class Loaded(val name: String, val email: String) : MeState

    data class Failed(val message: String) : MeState
}

/**
 * The signed-in screen. It asks the server who the app is signed in as
 * (`GET /api/auth/me`) through the generated client on the authenticated
 * engine, which is the proof that a REST call works as the person: the
 * answer comes from the server, not from the token response.
 */
@HiltViewModel
class HomeViewModel
@Inject
constructor(private val sessions: SessionManager, private val engine: HttpClientEngine) :
    ViewModel() {
    private val mutableMe = MutableStateFlow<MeState>(MeState.Loading)
    val me: StateFlow<MeState> = mutableMe.asStateFlow()

    init {
        refresh()
    }

    @Suppress("TooGenericExceptionCaught") // see the last catch
    fun refresh() {
        mutableMe.value = MeState.Loading
        viewModelScope.launch {
            val baseUrl = sessions.server()?.baseUrl ?: return@launch
            mutableMe.value =
                try {
                    val response = AuthApi(baseUrl, engine, ChaoticApi.clientConfig).getMeApiAuthMeGet()
                    if (response.success) {
                        response.body().let { MeState.Loaded(it.name, it.email) }
                    } else {
                        MeState.Failed("The server answered ${response.status}.")
                    }
                } catch (e: IOException) {
                    MeState.Failed("Could not reach the server: ${e.message ?: e.javaClass.simpleName}.")
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    // A body that is not the expected JSON (a proxy's page, say) surfaces
                    // as one of several Ktor and serialization exceptions; none should crash.
                    MeState.Failed("The server's answer could not be read (${e.javaClass.simpleName}).")
                }
        }
    }

    fun signOut() {
        viewModelScope.launch { sessions.signOut() }
    }
}
