package sh.chaotic.android.ui

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import sh.chaotic.android.R
import sh.chaotic.android.ui.theme.ChaoticTheme

@Composable
fun ChaoticApp() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Destination.Home) {
        composable<Destination.Home> { HomeScreen() }
    }
}

@Composable
fun HomeScreen(modifier: Modifier = Modifier) {
    Scaffold(modifier = modifier.fillMaxSize()) { padding ->
        Column(
            modifier = Modifier.fillMaxSize().padding(padding).padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(stringResource(R.string.home_title), style = MaterialTheme.typography.headlineMedium)
            Text(stringResource(R.string.home_body), style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Preview
@Composable
private fun HomeScreenPreview() {
    ChaoticTheme { HomeScreen() }
}
