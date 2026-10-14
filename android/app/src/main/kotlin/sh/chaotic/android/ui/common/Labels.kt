package sh.chaotic.android.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.produceState
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.delay
import sh.chaotic.android.R
import sh.chaotic.sync.Principal
import sh.chaotic.sync.UNKNOWN_VALUE
import sh.chaotic.sync.Who

@Composable
fun SyncProblemBanner(problem: SyncProblem?, modifier: Modifier = Modifier) {
    val text = when (problem) {
        null -> return
        SyncProblem.Offline -> stringResource(R.string.sync_offline)
        SyncProblem.Unreadable -> stringResource(R.string.sync_unreadable)
        is SyncProblem.Server -> stringResource(R.string.sync_failed, problem.status?.toString() ?: "?")
    }
    Text(
        text,
        style = MaterialTheme.typography.bodySmall,
        color = MaterialTheme.colorScheme.onErrorContainer,
        modifier = modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.errorContainer)
            .padding(horizontal = 16.dp, vertical = 8.dp),
    )
}

/** A person by name, an agent with the person who owns it. */
@Composable
fun whoLabel(principal: Principal?): String = when (val who = Who.of(principal)) {
    is Who.Person -> who.name

    is Who.Agent -> who.ownerName?.let { stringResource(R.string.who_agent, who.name, it) }
        ?: stringResource(R.string.who_agent_unowned, who.name)

    Who.System -> stringResource(R.string.who_system)
}

/** A short label for an inbox entry's kind; one newer than this app gets a neutral label. */
@Composable
fun kindLabel(kind: String): String = when (kind) {
    "gate_pending" -> stringResource(R.string.kind_gate_pending)
    "review_requested" -> stringResource(R.string.kind_review_requested)
    "mention" -> stringResource(R.string.kind_mention)
    "assignment" -> stringResource(R.string.kind_assignment)
    "gate_rejected" -> stringResource(R.string.kind_gate_rejected)
    "agent_status" -> stringResource(R.string.kind_agent_status)
    UNKNOWN_VALUE -> stringResource(R.string.kind_unknown)
    else -> humanize(kind)
}

/** `in_progress` -> `In progress`: wire values the app has no label for. */
fun humanize(value: String): String = value.replace('_', ' ').replaceFirstChar { it.uppercase() }

private const val CLOCK_TICK_MILLIS = 60_000L

/** The wall clock, ticking each minute: enough for "5m"-style ages. */
@Composable
fun rememberNow(): Long {
    val now by produceState(System.currentTimeMillis()) {
        while (true) {
            delay(CLOCK_TICK_MILLIS)
            value = System.currentTimeMillis()
        }
    }
    return now
}
