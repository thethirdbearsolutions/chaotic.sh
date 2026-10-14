package sh.chaotic.android.ui.common

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.sync.WriteKind
import sh.chaotic.sync.WriteRefusal

/**
 * Writes the server refused (CHT-1613), each with what the person did and
 * the server's reason, until dismissed. They are never retried: a sprint
 * in arrears or limbo, or a gate someone else decided, will not change by
 * sending again.
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
                    Text(
                        refusedWhat(refusal),
                        style = MaterialTheme.typography.labelLarge,
                        color = MaterialTheme.colorScheme.onErrorContainer,
                    )
                    Text(
                        refusal.message ?: stringResource(R.string.refusal_no_reason, refusal.status),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onErrorContainer,
                    )
                }
                TextButton(onClick = { onDismiss(refusal.key) }) { Text(stringResource(R.string.refusal_dismiss)) }
            }
        }
    }
}

@Composable
private fun refusedWhat(refusal: WriteRefusal): String = stringResource(
    when (refusal.kind) {
        WriteKind.APPROVE -> R.string.refusal_approve
        WriteKind.REJECT -> R.string.refusal_reject
        WriteKind.MARK_READ -> R.string.refusal_mark_read
        WriteKind.ARCHIVE -> R.string.refusal_archive
        WriteKind.COMMENT -> R.string.refusal_comment
        WriteKind.UPDATE_ISSUE -> R.string.refusal_update
    },
    refusal.label,
)
