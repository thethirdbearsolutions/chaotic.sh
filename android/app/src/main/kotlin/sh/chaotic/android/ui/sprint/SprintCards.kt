package sh.chaotic.android.ui.sprint

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.SprintBanner
import sh.chaotic.sync.SprintCard

/** Each project's current sprint: points spent against the budget, and why it is stuck, if it is. */
@Composable
fun SprintList(cards: List<SprintCard>, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp),
    ) {
        if (cards.isEmpty()) {
            item { Text(stringResource(R.string.sprint_empty), style = MaterialTheme.typography.bodyLarge) }
        }
        items(cards, key = { it.projectId }) { SprintCardView(it) }
    }
}

@Composable
fun SprintCardView(card: SprintCard, modifier: Modifier = Modifier) {
    Card(modifier.fillMaxWidth()) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text("${card.projectKey} · ${card.projectName}", style = MaterialTheme.typography.labelLarge)
            Text(card.sprintName, style = MaterialTheme.typography.titleMedium)
            val budget = card.budget
            if (budget != null) {
                LinearProgressIndicator(
                    progress = { if (budget > 0) (card.pointsSpent.toFloat() / budget).coerceIn(0f, 1f) else 1f },
                    modifier = Modifier.fillMaxWidth(),
                )
                Text(stringResource(R.string.sprint_points, card.pointsSpent, budget))
            } else {
                Text(stringResource(R.string.sprint_points_unlimited, card.pointsSpent))
            }
            SprintBanner.of(card).forEach { Banner(it) }
        }
    }
}

@Composable
private fun Banner(banner: SprintBanner) {
    val text = when (banner) {
        is SprintBanner.Limbo ->
            if (banner.pendingRituals.isEmpty()) {
                stringResource(R.string.sprint_limbo_unnamed)
            } else {
                stringResource(R.string.sprint_limbo, banner.pendingRituals.joinToString(", "))
            }

        is SprintBanner.Arrears -> stringResource(R.string.sprint_arrears, banner.overBy)
    }
    Card(colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer)) {
        Text(
            text,
            color = MaterialTheme.colorScheme.onErrorContainer,
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.padding(12.dp),
        )
    }
}

@Preview(showBackground = true)
@Composable
private fun SprintPreview() {
    ChaoticTheme {
        SprintList(
            listOf(
                SprintCard("p1", "t", "Chaotic", "CHT", "s1", "Sprint 118", 20, 23, limbo = false),
                SprintCard("p2", "t", "Website", "WEB", "s2", "Sprint 4", 10, 10, true, listOf("retro")),
                SprintCard("p3", "t", "Docs", "DOC", "s3", "Sprint 2", null, 4, false),
            ),
        )
    }
}
