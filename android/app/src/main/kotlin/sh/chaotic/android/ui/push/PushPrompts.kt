package sh.chaotic.android.ui.push

import android.Manifest
import android.os.Build
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.platform.LocalUriHandler
import androidx.compose.ui.res.stringResource
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import sh.chaotic.android.R

/** ntfy, the distributor the explanation offers; its site links its F-Droid and Play listings. */
private const val NTFY_URL = "https://ntfy.sh/"

/**
 * The two things the signed-in app asks about push (CHT-1612), each once:
 * on Android 13+, the notification permission, with the reason first; and
 * when no UnifiedPush distributor is installed, what to install.
 */
@Composable
fun PushPrompts(viewModel: PushPromptsViewModel = hiltViewModel()) {
    val askPermission by viewModel.permissionPrompt.collectAsStateWithLifecycle()
    val noDistributor by viewModel.noDistributorNotice.collectAsStateWithLifecycle()
    val uriHandler = LocalUriHandler.current
    val request = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { }

    if (askPermission && Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
        AlertDialog(
            onDismissRequest = viewModel::permissionAnswered,
            title = { Text(stringResource(R.string.push_permission_title)) },
            text = { Text(stringResource(R.string.push_permission_text)) },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.permissionAnswered()
                    request.launch(Manifest.permission.POST_NOTIFICATIONS)
                }) { Text(stringResource(R.string.push_permission_allow)) }
            },
            dismissButton = {
                TextButton(onClick = viewModel::permissionAnswered) {
                    Text(stringResource(R.string.push_permission_not_now))
                }
            },
        )
    } else if (noDistributor) {
        AlertDialog(
            onDismissRequest = viewModel::dismissNoDistributorNotice,
            title = { Text(stringResource(R.string.push_no_distributor_title)) },
            text = { Text(stringResource(R.string.push_no_distributor_text)) },
            confirmButton = {
                TextButton(onClick = {
                    viewModel.dismissNoDistributorNotice()
                    uriHandler.openUri(NTFY_URL)
                }) { Text(stringResource(R.string.push_no_distributor_get)) }
            },
            dismissButton = {
                TextButton(onClick = viewModel::dismissNoDistributorNotice) {
                    Text(stringResource(R.string.push_no_distributor_ok))
                }
            },
        )
    }
}
