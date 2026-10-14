package sh.chaotic.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import sh.chaotic.android.push.PushController
import sh.chaotic.android.ui.ChaoticApp
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject lateinit var sessions: SessionManager

    @Inject lateinit var push: PushController

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ChaoticTheme {
                ChaoticApp()
            }
        }
        // Each time the app comes on screen signed in, (re)register for push
        // (CHT-1612): the distributor may have changed, or been removed.
        // Picking a distributor can need an activity, so it starts here.
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                sessions.state.collectLatest { state ->
                    if (state is AuthState.SignedIn) push.onAppOpen(this@MainActivity)
                }
            }
        }
    }
}
