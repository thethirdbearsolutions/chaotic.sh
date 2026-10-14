package sh.chaotic.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import dagger.hilt.android.AndroidEntryPoint
import sh.chaotic.android.ui.ChaoticApp
import sh.chaotic.android.ui.theme.ChaoticTheme

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            ChaoticTheme {
                ChaoticApp()
            }
        }
    }
}
