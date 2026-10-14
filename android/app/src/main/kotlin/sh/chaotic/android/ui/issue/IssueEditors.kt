package sh.chaotic.android.ui.issue

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import sh.chaotic.android.R
import sh.chaotic.android.ui.common.humanize
import sh.chaotic.android.ui.common.whoLabel
import sh.chaotic.sync.Issue
import sh.chaotic.sync.IssueFields
import sh.chaotic.sync.Principal

// The issue screen's editable parts (CHT-1613): the fields that open a
// picker, and the comment box. Each change is queued, so it works offline
// and shows at once.

@Composable
internal fun Header(issue: Issue, state: IssueState, writes: IssueWrites) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text(issue.title, style = MaterialTheme.typography.headlineSmall)
        PickerField(
            stringResource(R.string.issue_status),
            humanize(issue.status),
            IssueFields.STATUSES.map { Choice(humanize(it)) { writes.onStatus(it) } },
        )
        PickerField(
            stringResource(R.string.issue_priority),
            humanize(issue.priority),
            IssueFields.PRIORITIES.map { Choice(humanize(it)) { writes.onPriority(it) } },
        )
        PickerField(
            stringResource(R.string.issue_assignee),
            issue.assignee?.let { whoLabel(it) } ?: stringResource(R.string.issue_unassigned),
            assigneeChoices(state, writes.onAssign),
            onOpen = writes.onPickAssignee,
        )
        issue.estimate?.let { Field(stringResource(R.string.issue_estimate), it.toString()) }
        HorizontalDivider()
    }
}

/** One entry of a picker; a null [pick] is a line of text, not a choice. */
private class Choice(val text: String, val pick: (() -> Unit)?)

@Composable
private fun assigneeChoices(state: IssueState, onAssign: (Principal?) -> Unit): List<Choice> {
    val me = state.me
    val fixed = listOfNotNull(
        Choice(stringResource(R.string.issue_unassigned)) { onAssign(null) },
        me?.let { Choice(stringResource(R.string.issue_assign_me)) { onAssign(it) } },
    )
    val rest = when (val members = state.members) {
        is Members.Loaded -> members.people.filter { it.id != me?.id }.map { person ->
            Choice(person.name) { onAssign(person) }
        }

        Members.Unavailable -> listOf(Choice(stringResource(R.string.issue_members_unavailable), pick = null))

        Members.NotLoaded, Members.Loading -> listOf(Choice(stringResource(R.string.issue_loading), pick = null))
    }
    return fixed + rest
}

/** A field whose value opens a menu of [choices]; [onOpen] runs as it opens. */
@Composable
private fun PickerField(label: String, value: String, choices: List<Choice>, onOpen: () -> Unit = {}) {
    var open by remember { mutableStateOf(false) }
    Box {
        Row(
            Modifier.clickable(onClickLabel = stringResource(R.string.issue_change, label)) {
                onOpen()
                open = true
            },
        ) { FieldContent(label, value) }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            choices.forEach { choice ->
                val pick = choice.pick
                DropdownMenuItem(
                    text = { Text(choice.text) },
                    enabled = pick != null,
                    onClick = {
                        open = false
                        pick?.invoke()
                    },
                )
            }
        }
    }
}

@Composable
private fun Field(label: String, value: String) {
    Row { FieldContent(label, value) }
}

@Composable
private fun FieldContent(label: String, value: String) {
    Text(
        label,
        style = MaterialTheme.typography.labelLarge,
        color = MaterialTheme.colorScheme.onSurfaceVariant,
        modifier = Modifier.width(96.dp),
    )
    Text(value, style = MaterialTheme.typography.bodyMedium)
}

/** A new comment; it is queued, so it can be written offline and goes when it can. */
@Composable
internal fun CommentBox(onComment: (String) -> Unit) {
    var draft by rememberSaveable { mutableStateOf("") }
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        OutlinedTextField(
            value = draft,
            onValueChange = { draft = it },
            label = { Text(stringResource(R.string.issue_comment_hint)) },
            minLines = 2,
            modifier = Modifier.fillMaxWidth(),
        )
        Button(
            onClick = {
                onComment(draft)
                draft = ""
            },
            enabled = draft.isNotBlank(),
            modifier = Modifier.align(Alignment.End),
        ) { Text(stringResource(R.string.issue_comment_send)) }
    }
}
