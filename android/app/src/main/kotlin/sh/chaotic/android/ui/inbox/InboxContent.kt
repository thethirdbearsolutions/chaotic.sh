package sh.chaotic.android.ui.inbox

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.android.ui.common.kindLabel
import sh.chaotic.android.ui.common.whoLabel
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Principal
import sh.chaotic.sync.RelativeAge

/**
 * The inbox list: "Needs you" above "For you". Read-only (CHT-1611): a row
 * opens its issue when it has one; acting on it comes with CHT-1613.
 */
@Composable
fun InboxList(sections: InboxSections, nowMillis: Long, onOpen: (InboxEntry) -> Unit, modifier: Modifier = Modifier) {
    if (sections.isEmpty) {
        // Still a scrolling container, so pull to refresh works on an empty inbox.
        LazyColumn(modifier.fillMaxSize()) {
            item {
                Text(
                    stringResource(R.string.inbox_empty),
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.padding(24.dp),
                )
            }
        }
        return
    }
    LazyColumn(modifier.fillMaxSize()) {
        section(R.string.inbox_needs_you, sections.needsYou, nowMillis, onOpen)
        section(R.string.inbox_for_you, sections.forYou, nowMillis, onOpen)
    }
}

private fun LazyListScope.section(
    title: Int,
    entries: List<InboxEntry>,
    nowMillis: Long,
    onOpen: (InboxEntry) -> Unit,
) {
    if (entries.isEmpty()) return
    item(key = "header-$title") {
        Text(
            stringResource(title),
            style = MaterialTheme.typography.titleSmall,
            color = MaterialTheme.colorScheme.primary,
            modifier = Modifier.padding(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 4.dp),
        )
    }
    items(entries, key = { it.id }) { entry ->
        InboxRow(entry, nowMillis, onOpen = { onOpen(entry) })
        HorizontalDivider()
    }
}

@Composable
private fun InboxRow(entry: InboxEntry, nowMillis: Long, onOpen: () -> Unit) {
    val opens = entry.issueId != null
    Row(
        verticalAlignment = Alignment.Top,
        modifier = Modifier
            .fillMaxWidth()
            .then(if (opens) Modifier.clickable(onClick = onOpen) else Modifier)
            .padding(horizontal = 16.dp, vertical = 12.dp),
    ) {
        val unread = stringResource(R.string.inbox_unread)
        Box(Modifier.padding(top = 6.dp).size(8.dp)) {
            if (!entry.read) {
                Box(
                    Modifier
                        .fillMaxSize()
                        .background(MaterialTheme.colorScheme.primary, CircleShape)
                        .semantics { contentDescription = unread },
                )
            }
        }
        Spacer(Modifier.width(12.dp))
        Column(Modifier.weight(1f)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    whoLabel(entry.source),
                    style = MaterialTheme.typography.labelLarge,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.weight(1f),
                )
                Text(
                    RelativeAge.format(entry.createdAtMillis, nowMillis),
                    style = MaterialTheme.typography.labelMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
            val reference = entry.issueIdentifier ?: entry.documentTitle
            Text(
                listOfNotNull(reference, entry.title).joinToString("  "),
                style = MaterialTheme.typography.bodyMedium,
                fontWeight = if (entry.read) FontWeight.Normal else FontWeight.SemiBold,
                maxLines = 2,
                overflow = TextOverflow.Ellipsis,
            )
            Text(
                kindLabel(entry.kind),
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
private fun InboxPreview() {
    val now = 1_800_000_000_000L
    val minute = 60_000L
    ChaoticTheme {
        InboxList(
            sections = InboxSections.of(
                listOf(
                    InboxEntry(
                        id = "1", teamId = "t", kind = "gate_pending", title = "Gate: human review", issueId = "i1",
                        issueIdentifier = "CHT-1611", source = Principal("a", "Claude", true, "ethan"),
                        createdAtMillis = now - 5 * minute, updatedAtMicros = 0,
                    ),
                    InboxEntry(
                        id = "2", teamId = "t", kind = "mention", title = "Mentioned you", issueId = "i2",
                        issueIdentifier = "CHT-1600", source = Principal("u", "Ada"),
                        createdAtMillis = now - 180 * minute, updatedAtMicros = 0, read = true,
                    ),
                ),
            ),
            nowMillis = now,
            onOpen = {},
        )
    }
}
