package sh.chaotic.android.ui.signin

import android.content.Intent
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.receiveAsFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import sh.chaotic.android.BuildConfig
import sh.chaotic.android.auth.AuthorizationRequests
import sh.chaotic.android.auth.DeviceName
import sh.chaotic.auth.DiscoveryResult
import sh.chaotic.auth.InvalidServerUrlException
import sh.chaotic.auth.OAuthDiscovery
import sh.chaotic.auth.OAuthException
import sh.chaotic.auth.ServerConfig
import sh.chaotic.auth.ServerUrl
import sh.chaotic.auth.SessionManager
import sh.chaotic.auth.TokenEndpoint
import java.io.IOException
import javax.inject.Inject
import kotlin.coroutines.cancellation.CancellationException

data class SignInUiState(val serverInput: String = "", val busy: Boolean = false, val error: String? = null)

/**
 * The first screen: server address, discovery, the Custom Tab, the code
 * exchange. The server being signed in to is kept in [SavedStateHandle]
 * while the Custom Tab is open, so a sign-in survives the app's process
 * being killed in the background meanwhile.
 */
@HiltViewModel
class SignInViewModel
@Inject
constructor(
    private val discovery: OAuthDiscovery,
    private val tokens: TokenEndpoint,
    private val sessions: SessionManager,
    private val deviceName: DeviceName,
    private val savedState: SavedStateHandle,
) : ViewModel() {
    private val mutableUi = MutableStateFlow(SignInUiState(serverInput = savedState[SERVER_INPUT] ?: ""))
    val ui: StateFlow<SignInUiState> = mutableUi.asStateFlow()

    private val requests = Channel<AuthorizationRequest>(Channel.BUFFERED)

    /** Authorization requests for the screen to open in a Custom Tab, each once. */
    val authorizationRequests: Flow<AuthorizationRequest> = requests.receiveAsFlow()

    fun onServerInputChanged(text: String) {
        savedState[SERVER_INPUT] = text
        mutableUi.update { it.copy(serverInput = text, error = null) }
    }

    fun signIn() {
        if (mutableUi.value.busy) return
        val baseUrl =
            try {
                ServerUrl.normalize(mutableUi.value.serverInput)
            } catch (e: InvalidServerUrlException) {
                fail(e.message)
                return
            }
        mutableUi.update { it.copy(busy = true, error = null) }
        viewModelScope.launch {
            when (val found = discovery.discover(baseUrl)) {
                is DiscoveryResult.Found -> {
                    savedState[PENDING_SERVER] = json.encodeToString(ServerConfig.serializer(), found.server)
                    requests.send(AuthorizationRequests.build(found.server))
                }

                DiscoveryResult.OAuthDisabled -> fail(OAuthDiscovery.OAUTH_DISABLED_MESSAGE)

                is DiscoveryResult.Unusable -> fail(found.message)

                is DiscoveryResult.Unreachable -> fail(found.message)
            }
        }
    }

    /** The Custom Tab could not be opened (no browser on the device). */
    fun onBrowserUnavailable() {
        fail("Signing in needs a web browser, and none is installed.")
    }

    /** The Custom Tab came back, with a code, an error, or nothing (closed). */
    fun onAuthorizationResult(data: Intent?) {
        val server = pendingServer()
        savedState.remove<String>(PENDING_SERVER)
        val response = data?.let { AuthorizationResponse.fromIntent(it) }
        val error = data?.let { AuthorizationException.fromIntent(it) }
        val code = response?.authorizationCode
        val verifier = response?.request?.codeVerifier
        when {
            server == null -> fail("The sign-in was interrupted. Try again.")

            response == null || code == null || verifier == null -> fail(describe(error))

            !AuthorizationRequests.isFrom(server, response) ->
                fail("The sign-in answer did not come from ${server.baseUrl}.")

            else -> exchange(server, code, verifier)
        }
    }

    @Suppress("TooGenericExceptionCaught") // see the last catch
    private fun exchange(server: ServerConfig, code: String, verifier: String) {
        mutableUi.update { it.copy(busy = true, error = null) }
        viewModelScope.launch {
            try {
                val session =
                    tokens.exchangeCode(server, code, verifier, BuildConfig.OAUTH_REDIRECT_URI, deviceName.get())
                sessions.signedIn(session)
                mutableUi.update { it.copy(busy = false) }
            } catch (e: OAuthException) {
                fail("The server refused the sign-in (${e.error}).")
            } catch (e: IOException) {
                fail("Could not finish signing in: ${e.message ?: e.javaClass.simpleName}.")
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                // SessionManager.signedIn keeps a session it cannot store, so
                // a Keystore failure should not reach here; this is the
                // backstop that keeps any other failure off the main thread.
                fail("Could not finish signing in (${e.javaClass.simpleName}).")
            }
        }
    }

    private fun pendingServer(): ServerConfig? {
        val stored = savedState.get<String>(PENDING_SERVER) ?: return null
        return try {
            json.decodeFromString(ServerConfig.serializer(), stored)
        } catch (_: SerializationException) {
            null
        }
    }

    private fun describe(error: AuthorizationException?): String = when {
        error == null || error == AuthorizationException.GeneralErrors.USER_CANCELED_AUTH_FLOW ->
            "Sign-in was cancelled."

        error.error == "access_denied" -> "Sign-in was declined."

        else -> "Sign-in failed: ${error.errorDescription ?: error.error ?: "unknown error"}."
    }

    private fun fail(message: String?) {
        mutableUi.update { it.copy(busy = false, error = message ?: "Sign-in failed.") }
    }

    private companion object {
        const val SERVER_INPUT = "server_input"
        const val PENDING_SERVER = "pending_server"
        val json = Json { ignoreUnknownKeys = true }
    }
}
