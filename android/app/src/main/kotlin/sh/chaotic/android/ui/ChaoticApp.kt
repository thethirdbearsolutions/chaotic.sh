package sh.chaotic.android.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.hilt.lifecycle.viewmodel.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import sh.chaotic.android.ui.home.HomeScreen
import sh.chaotic.android.ui.issue.IssueScreen
import sh.chaotic.android.ui.push.PushPrompts
import sh.chaotic.android.ui.signin.SignInScreen
import sh.chaotic.auth.AuthState

/**
 * The session decides what is on screen: the sign-in screen while signed
 * out, the app's navigation graph while signed in. Signing out (here, in
 * Connected apps, or by a refused refresh) drops the graph and its back
 * stack with it.
 */
@Composable
fun ChaoticApp(taps: NotificationTaps, viewModel: AppViewModel = hiltViewModel()) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    when (val current = state) {
        AuthState.Loading ->
            Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }

        is AuthState.SignedOut -> SignInScreen(ended = current.ended)

        is AuthState.SignedIn -> SignedInApp(taps)
    }
}

/**
 * [taps] is MainActivity's own instance, handed down rather than looked up
 * again here, so a tap cannot land in a second copy nobody collects.
 */
@Composable
private fun SignedInApp(taps: NotificationTaps) {
    val navController = rememberNavController()
    // A tapped notification's issue (CHT-1660), over the screen shown when
    // the tap arrived, so Back returns there; see NotificationTaps for when.
    LaunchedEffect(taps, navController) {
        val route = TapRoute()
        taps.opens.collect { open ->
            route.on(open, navController.currentBackStackEntry?.id)?.let {
                navController.navigate(it) { launchSingleTop = true }
            }
        }
    }
    NavHost(navController = navController, startDestination = Destination.Home) {
        composable<Destination.Home> {
            HomeScreen(onOpenIssue = { issueId, teamId -> navController.navigate(Destination.Issue(issueId, teamId)) })
        }
        composable<Destination.Issue> { IssueScreen(onBack = { navController.popBackStack() }) }
    }
    PushPrompts()
}
