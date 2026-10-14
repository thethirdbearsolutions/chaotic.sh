package sh.chaotic.android.ui.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import sh.chaotic.android.R
import sh.chaotic.android.ui.theme.ChaoticTheme

@Composable
fun HomeScreen(baseUrl: String, viewModel: HomeViewModel = hiltViewModel()) {
    val me by viewModel.me.collectAsStateWithLifecycle()
    HomeContent(baseUrl = baseUrl, me = me, onRetry = viewModel::refresh, onSignOut = viewModel::signOut)
}

@Composable
private fun HomeContent(
    baseUrl: String,
    me: MeState,
    onRetry: () -> Unit,
    onSignOut: () -> Unit,
    modifier: Modifier = Modifier,
) {
    Scaffold(modifier = modifier.fillMaxSize()) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding).padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp, Alignment.CenterVertically),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(stringResource(R.string.home_title), style = MaterialTheme.typography.headlineMedium)
            when (me) {
                MeState.Loading -> CircularProgressIndicator()

                is MeState.Loaded -> {
                    Text(
                        stringResource(R.string.home_signed_in_as, me.name),
                        style = MaterialTheme.typography.titleMedium,
                    )
                    Text(me.email, style = MaterialTheme.typography.bodyMedium)
                }

                is MeState.Failed -> {
                    Text(me.message, color = MaterialTheme.colorScheme.error)
                    OutlinedButton(onClick = onRetry) { Text(stringResource(R.string.home_retry)) }
                }
            }
            Text(baseUrl, style = MaterialTheme.typography.bodySmall)
            Button(onClick = onSignOut) { Text(stringResource(R.string.home_sign_out)) }
        }
    }
}

@Preview
@Composable
private fun HomePreview() {
    ChaoticTheme {
        HomeContent(
            baseUrl = "https://chaotic.example.com",
            me = MeState.Loaded("Ada", "ada@example.com"),
            onRetry = {},
            onSignOut = {},
        )
    }
}
