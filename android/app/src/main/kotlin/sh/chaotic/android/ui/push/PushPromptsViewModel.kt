package sh.chaotic.android.ui.push

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.content.ContextCompat
import androidx.core.content.edit
import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import sh.chaotic.android.push.PushController
import javax.inject.Inject

/**
 * The two things the signed-in app asks about push (CHT-1612), each once:
 * on Android 13+, the notification permission, with the reason first; and
 * when no UnifiedPush distributor is installed, what to install.
 */
@HiltViewModel
class PushPromptsViewModel
@Inject
constructor(
    @param:ApplicationContext private val context: Context,
    private val push: PushController,
) : ViewModel() {
    private val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
    private val askPermission = MutableStateFlow(shouldAskPermission())

    val permissionPrompt: StateFlow<Boolean> = askPermission
    val noDistributorNotice: StateFlow<Boolean> = push.noDistributorNotice

    private fun shouldAskPermission(): Boolean = Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
        ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) !=
        PackageManager.PERMISSION_GRANTED &&
        !prefs.getBoolean(KEY_ASKED, false)

    /** The reason was shown and answered (either way): never again. The system keeps its own answer. */
    fun permissionAnswered() {
        prefs.edit { putBoolean(KEY_ASKED, true) }
        askPermission.value = false
    }

    fun dismissNoDistributorNotice() = push.dismissNotice()

    private companion object {
        const val PREFS = "push_ui"
        const val KEY_ASKED = "notification_permission_asked"
    }
}
