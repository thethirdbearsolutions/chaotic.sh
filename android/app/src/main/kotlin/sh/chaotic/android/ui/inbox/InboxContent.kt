package sh.chaotic.android.ui.inbox

import androidx.compose.animation.core.animate
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.Orientation
import androidx.compose.foundation.gestures.draggable
import androidx.compose.foundation.gestures.rememberDraggableState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.offset
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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.CustomAccessibilityAction
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.customActions
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.android.ui.common.kindLabel
import sh.chaotic.android.ui.common.whoLabel
import sh.chaotic.android.ui.theme.ChaoticTheme
import sh.chaotic.sync.InboxAction
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.InboxSections
import sh.chaotic.sync.Principal
import sh.chaotic.sync.RelativeAge
import kotlin.math.abs
import kotlin.math.roundToInt

/**
 * The inbox list: "Needs you" above "For you". A row opens its issue when
 * it has one, and swipes as [InboxRowActions] says (CHT-1613).
 */
@Composable
fun InboxList(
    sections: InboxSections,
    nowMillis: Long,
    onOpen: (InboxEntry) -> Unit,
    modifier: Modifier = Modifier,
    actions: InboxRowActions = InboxRowActions(),
) {
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
        section(R.string.inbox_needs_you, sections.needsYou, nowMillis, onOpen, actions)
        section(R.string.inbox_for_you, sections.forYou, nowMillis, onOpen, actions)
    }
}

private fun LazyListScope.section(
    title: Int,
    entries: List<InboxEntry>,
    nowMillis: Long,
    onOpen: (InboxEntry) -> Unit,
    actions: InboxRowActions,
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
        SwipeRow(swipeRight = rightAction(entry, actions), swipeLeft = leftAction(entry, actions)) {
            InboxRow(entry, nowMillis, onOpen = { onOpen(entry) })
        }
        HorizontalDivider()
    }
}

/** One way to swipe a row: what it is called, its color, and what it does. */
private class Swipe(val label: String, val color: Color, val onColor: Color, val run: () -> Unit)

@Composable
private fun rightAction(entry: InboxEntry, actions: InboxRowActions): Swipe? = when {
    entry.action(InboxAction.APPROVE) != null -> Swipe(
        stringResource(R.string.inbox_approve),
        MaterialTheme.colorScheme.primaryContainer,
        MaterialTheme.colorScheme.onPrimaryContainer,
    ) { actions.onApprove(entry) }

    entry.action(InboxAction.REJECT) == null && !entry.read && entry.action(InboxAction.MARK_READ) != null -> Swipe(
        stringResource(R.string.inbox_mark_read),
        MaterialTheme.colorScheme.secondaryContainer,
        MaterialTheme.colorScheme.onSecondaryContainer,
    ) { actions.onMarkRead(entry) }

    else -> null
}

@Composable
private fun leftAction(entry: InboxEntry, actions: InboxRowActions): Swipe? = when {
    entry.action(InboxAction.REJECT) != null -> Swipe(
        stringResource(R.string.inbox_reject),
        MaterialTheme.colorScheme.errorContainer,
        MaterialTheme.colorScheme.onErrorContainer,
    ) { actions.onReject(entry) }

    entry.action(InboxAction.APPROVE) == null && entry.action(InboxAction.ARCHIVE) != null -> Swipe(
        stringResource(R.string.inbox_archive),
        MaterialTheme.colorScheme.tertiaryContainer,
        MaterialTheme.colorScheme.onTertiaryContainer,
    ) { actions.onArchive(entry) }

    else -> null
}

/** Past this share of the row's width, letting go commits the swipe. */
private const val SWIPE_THRESHOLD = 0.35f

/** Which of the two a drag to [offset] reveals; null at rest. */
private fun revealed(offset: Float, swipeRight: Swipe?, swipeLeft: Swipe?): Swipe? = when {
    offset > 0 -> swipeRight
    offset < 0 -> swipeLeft
    else -> null
}

/** Where a drag by [delta] moves the row: never towards a side that has nothing to reveal. */
private fun dragged(offset: Float, delta: Float, swipeRight: Swipe?, swipeLeft: Swipe?): Float {
    val next = offset + delta
    return if (revealed(next, swipeRight, swipeLeft) == null) 0f else next
}

/** What letting go at [offset] of a row [width] wide commits: past the threshold, the side revealed. */
private fun committed(offset: Float, width: Int, swipeRight: Swipe?, swipeLeft: Swipe?): Swipe? =
    if (width > 0 && abs(offset) > width * SWIPE_THRESHOLD) revealed(offset, swipeRight, swipeLeft) else null

/**
 * A row that slides sideways to reveal [swipeRight] or [swipeLeft], and
 * runs it (with a haptic tick) when let go far enough; it springs back
 * either way. Both are also accessibility actions, so a screen reader
 * can approve or reject without a swipe.
 */
@Composable
private fun SwipeRow(swipeRight: Swipe?, swipeLeft: Swipe?, content: @Composable () -> Unit) {
    val haptics = LocalHapticFeedback.current
    var offset by remember { mutableFloatStateOf(0f) }
    var width by remember { mutableIntStateOf(0) }
    val drag = rememberDraggableState { delta -> offset = dragged(offset, delta, swipeRight, swipeLeft) }
    val swipes = listOfNotNull(swipeRight, swipeLeft)
    Box(
        Modifier
            .fillMaxWidth()
            .onSizeChanged { width = it.width }
            .semantics {
                customActions = swipes.map { swipe ->
                    CustomAccessibilityAction(swipe.label) {
                        swipe.run()
                        true
                    }
                }
            },
    ) {
        revealed(offset, swipeRight, swipeLeft)?.let { SwipeBackground(it, fromStart = offset > 0) }
        Box(
            Modifier
                .offset { IntOffset(offset.roundToInt(), 0) }
                .background(MaterialTheme.colorScheme.surface)
                .draggable(
                    state = drag,
                    orientation = Orientation.Horizontal,
                    enabled = swipes.isNotEmpty(),
                    onDragStopped = {
                        committed(offset, width, swipeRight, swipeLeft)?.let { swipe ->
                            haptics.performHapticFeedback(HapticFeedbackType.LongPress)
                            swipe.run()
                        }
                        animate(offset, 0f) { value, _ -> offset = value }
                    },
                ),
        ) { content() }
    }
}

/** What is under a row being swiped: the action's name, on the side it was uncovered from. */
@Composable
private fun BoxScope.SwipeBackground(swipe: Swipe, fromStart: Boolean) {
    Box(
        Modifier.matchParentSize().background(swipe.color).padding(horizontal = 24.dp),
        contentAlignment = if (fromStart) Alignment.CenterStart else Alignment.CenterEnd,
    ) {
        Text(swipe.label, color = swipe.onColor, style = MaterialTheme.typography.labelLarge)
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
