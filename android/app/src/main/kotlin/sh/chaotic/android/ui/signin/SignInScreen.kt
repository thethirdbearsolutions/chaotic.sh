package sh.chaotic.android.ui.signin

import android.content.ActivityNotFoundException
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import net.openid.appauth.AuthorizationService
import sh.chaotic.android.R
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.auth.SessionEnded

@Composable
fun SignInScreen(ended: SessionEnded?, viewModel: SignInViewModel = hiltViewModel()) {
    val ui by viewModel.ui.collectAsStateWithLifecycle()
    val context = LocalContext.current
    val authService = remember(context) { AuthorizationService(context) }
    DisposableEffect(authService) { onDispose { authService.dispose() } }
    val launcher =
        rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            viewModel.onAuthorizationResult(result.data)
        }
    LaunchedEffect(viewModel, authService) {
        viewModel.authorizationRequests.collect { request ->
            try {
                launcher.launch(authService.getAuthorizationRequestIntent(request))
            } catch (_: ActivityNotFoundException) {
                viewModel.onBrowserUnavailable()
            }
        }
    }
    SignInContent(
        ui = ui,
        ended = ended,
        onServerInputChanged = viewModel::onServerInputChanged,
        onSignIn = viewModel::signIn,
    )
}

@Composable
private fun SignInContent(
    ui: SignInUiState,
    ended: SessionEnded?,
    onServerInputChanged: (String) -> Unit,
    onSignIn: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Scaffold(modifier = modifier.fillMaxSize()) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding).padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(stringResource(R.string.sign_in_title), style = MaterialTheme.typography.headlineMedium)
            if (ended == SessionEnded.REFUSED_BY_SERVER) {
                Text(stringResource(R.string.sign_in_session_ended), style = MaterialTheme.typography.bodyMedium)
            }
            OutlinedTextField(
                value = ui.serverInput,
                onValueChange = onServerInputChanged,
                label = { Text(stringResource(R.string.sign_in_server_label)) },
                placeholder = { Text(stringResource(R.string.sign_in_server_placeholder)) },
                singleLine = true,
                enabled = !ui.busy,
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Uri, imeAction = ImeAction.Go),
                keyboardActions = KeyboardActions(onGo = { onSignIn() }),
                modifier = Modifier.fillMaxWidth(),
            )
            ui.error?.let {
                Text(it, color = MaterialTheme.colorScheme.error, style = MaterialTheme.typography.bodyMedium)
            }
            if (ui.busy) {
                CircularProgressIndicator()
            } else {
                Button(onClick = onSignIn, enabled = ui.serverInput.isNotBlank()) {
                    Text(stringResource(R.string.sign_in_button))
                }
            }
        }
    }
}

@Preview
@Composable
private fun SignInPreview() {
    ChaoticTheme {
        SignInContent(
            ui = SignInUiState(serverInput = "chaotic.example.com", error = null),
            ended = null,
            onServerInputChanged = {},
            onSignIn = {},
        )
    }
}
