package sh.chaotic.android.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.sync.PendingWrite
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteRefusal

/**
 * Writes the server refused (CHT-1613), each with what the person did and
 * the server's reason, until dismissed. They are never retried: a sprint
 * in arrears or limbo, or a gate someone else decided, will not change by
 * sending again. A refused comment shows its text, to copy, so what the
 * person wrote is not lost.
 */
@Composable
fun RefusalList(refusals: List<WriteRefusal>, onDismiss: (String) -> Unit, modifier: Modifier = Modifier) {
    if (refusals.isEmpty()) return
    Column(modifier.fillMaxWidth().background(MaterialTheme.colorScheme.errorContainer)) {
        refusals.forEach { refusal ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(start = 16.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
            ) {
                Column(Modifier.weight(1f)) {
                    Notice(couldNot(refusal.kind, refusal.label), MaterialTheme.typography.labelLarge)
                    Notice(
                        refusal.message ?: stringResource(R.string.refusal_no_reason, refusal.status),
                        MaterialTheme.typography.bodySmall,
                    )
                    refusal.value?.let { text ->
                        SelectionContainer { Notice(text, MaterialTheme.typography.bodyMedium) }
                    }
                }
                TextButton(onClick = { onDismiss(refusal.key) }) { Text(stringResource(R.string.refusal_dismiss)) }
            }
        }
    }
}

/**
 * Writes the server kept failing (CHT-1613): they are no longer sent on
 * their own, nor shown as done, until the person sends them again or
 * discards them.
 */
@Composable
fun StalledList(
    stalled: List<PendingWrite>,
    onRetry: (String) -> Unit,
    onDiscard: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    if (stalled.isEmpty()) return
    Column(modifier.fillMaxWidth().background(MaterialTheme.colorScheme.errorContainer)) {
        stalled.forEach { write ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.padding(start = 16.dp, end = 4.dp, top = 4.dp, bottom = 4.dp),
            ) {
                Column(Modifier.weight(1f)) {
                    Notice(couldNot(write.kind, write.label), MaterialTheme.typography.labelLarge)
                    Notice(stringResource(R.string.stalled_reason), MaterialTheme.typography.bodySmall)
                    val text = write.value
                    if (write.kind == WriteKind.COMMENT && text != null) {
                        SelectionContainer { Notice(text, MaterialTheme.typography.bodyMedium) }
                    }
                }
                TextButton(onClick = { onRetry(write.key) }) { Text(stringResource(R.string.stalled_retry)) }
                TextButton(onClick = { onDiscard(write.key) }) { Text(stringResource(R.string.stalled_discard)) }
            }
        }
    }
}

@Composable
private fun Notice(text: String, style: TextStyle) {
    Text(text, style = style, color = MaterialTheme.colorScheme.onErrorContainer)
}

@Composable
private fun couldNot(kind: WriteKind, label: String): String = stringResource(
    when (kind) {
        WriteKind.APPROVE -> R.string.refusal_approve
        WriteKind.REJECT -> R.string.refusal_reject
        WriteKind.MARK_READ -> R.string.refusal_mark_read
        WriteKind.ARCHIVE -> R.string.refusal_archive
        WriteKind.COMMENT -> R.string.refusal_comment
        WriteKind.UPDATE_ISSUE -> R.string.refusal_update
    },
    label,
)
