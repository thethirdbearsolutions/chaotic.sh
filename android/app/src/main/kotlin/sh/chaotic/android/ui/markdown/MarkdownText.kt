package sh.chaotic.android.ui.markdown

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.produceState
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.LinkAnnotation
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLinkStyles
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withLink
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import sh.chaotic.android.R

/** Text longer than this is shown cut, with a "Show more". */
const val MARKDOWN_COLLAPSED_CHARS = 10_000

/** Never more than this is drawn, even shown in full: the rest is on the web. */
const val MARKDOWN_MAX_CHARS = 200_000

/** Up to this length the parse runs in composition; longer text is parsed off the main thread. */
private const val PARSE_IN_PLACE_CHARS = 4_000

/**
 * Markdown from the server (an issue description, a comment), drawn with
 * [MarkdownParser]'s subset. Anyone on the team writes it, at any length,
 * so a long text is cut to [MARKDOWN_COLLAPSED_CHARS] until asked for,
 * never drawn past [MARKDOWN_MAX_CHARS], and parsed off the main thread.
 */
@Composable
fun MarkdownText(markdown: String, modifier: Modifier = Modifier) {
    var expanded by rememberSaveable(markdown) { mutableStateOf(false) }
    val limit = if (expanded) MARKDOWN_MAX_CHARS else MARKDOWN_COLLAPSED_CHARS
    val shown = remember(markdown, limit) { markdown.take(limit) }
    val parsedNow = remember(shown) { if (shown.length <= PARSE_IN_PLACE_CHARS) MarkdownParser.parse(shown) else null }
    val parsedLater by produceState<List<MdBlock>?>(null, shown) {
        if (parsedNow == null) value = withContext(Dispatchers.Default) { MarkdownParser.parse(shown) }
    }
    Column(modifier, verticalArrangement = Arrangement.spacedBy(8.dp)) {
        (parsedNow ?: parsedLater)?.forEach { Block(it) }
        when {
            markdown.length <= shown.length -> Unit

            !expanded -> TextButton(onClick = { expanded = true }) {
                Text(stringResource(R.string.markdown_show_more))
            }

            else -> Text(
                stringResource(R.string.markdown_truncated, markdown.length - shown.length),
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Composable
private fun Block(block: MdBlock) {
    val typography = MaterialTheme.typography
    when (block) {
        is MdBlock.Heading -> Text(
            annotated(block.spans),
            style = when (block.level) {
                1 -> typography.titleLarge
                2 -> typography.titleMedium
                else -> typography.titleSmall
            },
        )

        is MdBlock.Paragraph -> Text(annotated(block.spans), style = typography.bodyMedium)

        is MdBlock.ListItem -> Row {
            Text(block.marker, style = typography.bodyMedium, modifier = Modifier.width(24.dp))
            Text(annotated(block.spans), style = typography.bodyMedium)
        }

        is MdBlock.Quote -> Text(
            annotated(block.spans),
            style = typography.bodyMedium.copy(fontStyle = FontStyle.Italic),
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(start = 12.dp),
        )

        is MdBlock.Code -> Text(
            block.text,
            style = TextStyle(fontFamily = FontFamily.Monospace, fontSize = typography.bodySmall.fontSize),
            modifier = Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.surfaceVariant)
                .horizontalScroll(rememberScrollState())
                .padding(8.dp),
        )
    }
}

@Composable
private fun annotated(spans: List<MdSpan>): AnnotatedString {
    val linkColor = MaterialTheme.colorScheme.primary
    val codeBackground = MaterialTheme.colorScheme.surfaceVariant
    return buildAnnotatedString {
        spans.forEach { span ->
            val style = SpanStyle(
                fontWeight = if (span.bold) FontWeight.Bold else null,
                fontStyle = if (span.italic) FontStyle.Italic else null,
                fontFamily = if (span.code) FontFamily.Monospace else null,
                background = if (span.code) codeBackground else Color.Unspecified,
            )
            val url = span.url
            if (url != null) {
                val linkStyles = TextLinkStyles(SpanStyle(color = linkColor, textDecoration = TextDecoration.Underline))
                withLink(LinkAnnotation.Url(url, linkStyles)) { withStyle(style) { append(span.text) } }
            } else {
                withStyle(style) { append(span.text) }
            }
        }
    }
}
