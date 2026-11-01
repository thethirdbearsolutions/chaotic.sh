package sh.chaotic.android

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.viewModels
import androidx.lifecycle.Lifecycle
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.repeatOnLifecycle
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch
import sh.chaotic.android.live.LiveUpdates
import sh.chaotic.android.push.NotificationTap
import sh.chaotic.android.push.PushController
import sh.chaotic.android.ui.ChaoticApp
import sh.chaotic.android.ui.NotificationTaps
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import javax.inject.Inject

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject lateinit var sessions: SessionManager

    @Inject lateinit var push: PushController

    @Inject lateinit var live: LiveUpdates

    private val taps: NotificationTaps by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        // A recreated activity has handled its intent already.
        if (savedInstanceState == null) openTapped(intent)
        setContent {
            ChaoticTheme {
                ChaoticApp(taps)
            }
        }
        // Each time the app comes on screen signed in, (re)register for push
        // (CHT-1612): the distributor may have changed, or been removed.
        // Picking a distributor can need an activity, so it starts here.
        lifecycleScope.launch {
            repeatOnLifecycle(Lifecycle.State.STARTED) {
                try {
                    sessions.state.collectLatest { state ->
                        if (state is AuthState.SignedIn) {
                            // The live feed while on screen (CHT-1655), for whoever is signed in now.
                            live.start(state.person.id + "@" + state.baseUrl)
                            push.onAppOpen(this@MainActivity)
                        } else {
                            live.stopNow()
                        }
                    }
                } finally {
                    live.stop()
                }
            }
        }
    }

    /** A notification tapped while the app is open (MainActivity is single-top for these intents). */
    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        openTapped(intent)
    }

    private fun openTapped(intent: Intent?) {
        NotificationTap.from(intent)?.let(taps::open)
    }
}
