package sh.chaotic.android.ui.inbox

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.withTimeoutOrNull
import sh.chaotic.android.R
import sh.chaotic.android.ui.home.HomeWrites
import sh.chaotic.android.ui.home.UndoOffer
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteQueue

/**
 * What an inbox row can do (CHT-1613). A row offers a swipe only for what
 * its entry's server-sent actions allow: on a gate or review, right
 * approves and left rejects (asking for a reason); on anything else,
 * right marks it read and left archives it.
 */
class InboxRowActions(
    val onApprove: (InboxEntry) -> Unit = {},
    val onReject: (InboxEntry) -> Unit = {},
    val onMarkRead: (InboxEntry) -> Unit = {},
    val onArchive: (InboxEntry) -> Unit = {},
)

/**
 * The undo snackbar for a swipe (CHT-1613). It stays up exactly as long
 * as the write waits to be sent (the queue's undo window), and its Undo
 * takes the write back. Not a Short duration: with a screen reader on,
 * Android stretches that well past the window, and an Undo tapped after
 * the write went would do nothing while looking as if it had worked.
 */
@Composable
fun UndoSnackbar(offer: UndoOffer?, host: SnackbarHostState, writes: HomeWrites) {
    val message = offer?.let { undoMessage(it) }
    val undo = stringResource(R.string.undo)
    LaunchedEffect(offer?.key) {
        if (offer == null || message == null) return@LaunchedEffect
        // Cancelling showSnackbar when the window closes dismisses it.
        val result = withTimeoutOrNull(WriteQueue.UNDO_MILLIS) {
            host.showSnackbar(message, actionLabel = undo, duration = SnackbarDuration.Indefinite)
        }
        if (result == SnackbarResult.ActionPerformed) writes.onUndo(offer.key) else writes.onUndoGone(offer.key)
    }
}

/** Says once that an Undo came too late: the write [label] names had already gone to the server. */
@Composable
fun TooLateSnackbar(label: String?, host: SnackbarHostState, onShown: () -> Unit) {
    val message = label?.let { stringResource(R.string.undo_too_late, it) }
    LaunchedEffect(label) {
        if (message == null) return@LaunchedEffect
        host.showSnackbar(message, duration = SnackbarDuration.Short)
        onShown()
    }
}

@Composable
private fun undoMessage(offer: UndoOffer): String = when (offer.kind) {
    WriteKind.APPROVE -> stringResource(R.string.undo_approved, offer.label)
    WriteKind.REJECT -> stringResource(R.string.undo_rejected, offer.label)
    WriteKind.MARK_READ -> stringResource(R.string.undo_marked_read, offer.label)
    else -> stringResource(R.string.undo_archived, offer.label)
}

/**
 * The reason a rejection needs: the server requires one, and the attester
 * reads it to know what to fix. Shown in place above the inbox rather than
 * as a dialog: a separate dialog window never lets the Compose tests on
 * Robolectric settle, and the list stays visible for context.
 */
@Composable
fun RejectPanel(entry: InboxEntry, onReject: (String) -> Unit, onCancel: () -> Unit, modifier: Modifier = Modifier) {
    var note by rememberSaveable(entry.id) { mutableStateOf("") }
    Card(modifier.fillMaxWidth().padding(horizontal = 16.dp, vertical = 8.dp)) {
        Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Text(
                stringResource(R.string.reject_title, entry.issueIdentifier ?: entry.title),
                style = MaterialTheme.typography.titleMedium,
            )
            OutlinedTextField(
                value = note,
                onValueChange = { note = it },
                label = { Text(stringResource(R.string.reject_reason)) },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )
            Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.End) {
                TextButton(onClick = onCancel) { Text(stringResource(R.string.cancel)) }
                TextButton(onClick = { onReject(note) }, enabled = note.isNotBlank()) {
                    Text(stringResource(R.string.inbox_reject))
                }
            }
        }
    }
}
