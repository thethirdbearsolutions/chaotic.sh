package sh.chaotic.android.ui.inbox

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.AlertDialog
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
import sh.chaotic.android.R
import sh.chaotic.android.ui.home.HomeWrites
import sh.chaotic.android.ui.home.UndoOffer
import sh.chaotic.sync.InboxEntry
import sh.chaotic.sync.WriteKind

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
 * The undo snackbar for a swipe (CHT-1613). It stays up as long as the
 * write waits to be sent (the short duration is the queue's four-second
 * undo window), and its Undo takes the write back.
 */
@Composable
fun UndoSnackbar(offer: UndoOffer?, host: SnackbarHostState, writes: HomeWrites) {
    val message = offer?.let { undoMessage(it) }
    val undo = stringResource(R.string.undo)
    LaunchedEffect(offer?.key) {
        if (offer == null || message == null) return@LaunchedEffect
        val result = host.showSnackbar(message, actionLabel = undo, duration = SnackbarDuration.Short)
        if (result == SnackbarResult.ActionPerformed) writes.onUndo(offer.key) else writes.onUndoGone(offer.key)
    }
}

@Composable
private fun undoMessage(offer: UndoOffer): String = when (offer.kind) {
    WriteKind.APPROVE -> stringResource(R.string.undo_approved, offer.label)
    WriteKind.REJECT -> stringResource(R.string.undo_rejected, offer.label)
    WriteKind.MARK_READ -> stringResource(R.string.undo_marked_read, offer.label)
    else -> stringResource(R.string.undo_archived, offer.label)
}

/** The reason a rejection needs: the server requires one, and the attester reads it to know what to fix. */
@Composable
fun RejectDialog(entry: InboxEntry, onReject: (String) -> Unit, onCancel: () -> Unit) {
    var note by rememberSaveable(entry.id) { mutableStateOf("") }
    AlertDialog(
        onDismissRequest = onCancel,
        title = { Text(stringResource(R.string.reject_title, entry.issueIdentifier ?: entry.title)) },
        text = {
            OutlinedTextField(
                value = note,
                onValueChange = { note = it },
                label = { Text(stringResource(R.string.reject_reason)) },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )
        },
        confirmButton = {
            TextButton(onClick = { onReject(note) }, enabled = note.isNotBlank()) {
                Text(stringResource(R.string.inbox_reject))
            }
        },
        dismissButton = {
            TextButton(onClick = onCancel) { Text(stringResource(R.string.cancel)) }
        },
    )
}
