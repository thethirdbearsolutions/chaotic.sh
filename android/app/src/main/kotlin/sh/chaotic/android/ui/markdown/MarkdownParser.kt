package sh.chaotic.android.ui.markdown

import java.net.URI

/**
 * A small Markdown reader for issue descriptions and comments: the subset
 * people write in tickets (headings, paragraphs, bullet and numbered
 * lists, quotes, fenced code, and inline bold, italic, code and links).
 * Anything else is shown as the text it is. Plain Kotlin, so it is tested
 * on the JVM; MarkdownText draws the result.
 *
 * Not CommonMark: no nested lists, tables, HTML, reference links or
 * images (an image shows as its alt text). A link whose label is not its
 * own address is followed by the address's host, so a label cannot pass
 * for a different site.
 *
 * Linear in the input: the text is anyone's on the team, of any length,
 * so no input may make a scan run once per character.
 */
sealed interface MdBlock {
    data class Heading(val level: Int, val spans: List<MdSpan>) : MdBlock

    data class Paragraph(val spans: List<MdSpan>) : MdBlock

    /** One list item; [marker] is "•" or the item's number with its dot. */
    data class ListItem(val marker: String, val spans: List<MdSpan>) : MdBlock

    data class Quote(val spans: List<MdSpan>) : MdBlock

    data class Code(val text: String) : MdBlock
}

/** A run of text with its inline styles; [url] is set for a link. */
data class MdSpan(
    val text: String,
    val bold: Boolean = false,
    val italic: Boolean = false,
    val code: Boolean = false,
    val url: String? = null,
)

object MarkdownParser {
    private const val MAX_HEADING = 6
    private val heading = Regex("^(#{1,6})\\s+(.*?)\\s*#*\\s*$")
    private val bullet = Regex("^\\s{0,3}[-*+]\\s+(.*)$")
    private val numbered = Regex("^\\s{0,3}(\\d{1,9})[.)]\\s+(.*)$")
    private val quote = Regex("^\\s{0,3}>\\s?(.*)$")
    private val fence = Regex("^\\s{0,3}(```|~~~)")

    fun parse(markdown: String): List<MdBlock> {
        val blocks = mutableListOf<MdBlock>()
        val paragraph = mutableListOf<String>()
        fun flush() {
            if (paragraph.isNotEmpty()) blocks += MdBlock.Paragraph(inline(paragraph.joinToString(" ")))
            paragraph.clear()
        }

        val lines = markdown.replace("\r\n", "\n").split('\n')
        var i = 0
        while (i < lines.size) {
            val line = lines[i]
            val fenceMatch = fence.find(line)
            when {
                fenceMatch != null -> {
                    flush()
                    val marker = fenceMatch.groupValues[1]
                    val code = mutableListOf<String>()
                    i++
                    while (i < lines.size && !lines[i].trimStart().startsWith(marker)) code += lines[i++]
                    blocks += MdBlock.Code(code.joinToString("\n"))
                }

                line.isBlank() -> flush()

                else -> {
                    val block = lineBlock(line)
                    if (block == null) {
                        paragraph += line.trim()
                    } else {
                        flush()
                        blocks += block
                    }
                }
            }
            i++
        }
        flush()
        return blocks
    }

    private fun lineBlock(line: String): MdBlock? = heading.find(line)?.let {
        MdBlock.Heading(it.groupValues[1].length.coerceAtMost(MAX_HEADING), inline(it.groupValues[2]))
    }
        ?: bullet.find(line)?.let { MdBlock.ListItem("•", inline(it.groupValues[1])) }
        ?: numbered.find(line)?.let { MdBlock.ListItem("${it.groupValues[1]}.", inline(it.groupValues[2])) }
        ?: quote.find(line)?.let { MdBlock.Quote(inline(it.groupValues[1])) }

    /** Inline spans of one block's text. Unclosed markers are literal text. */
    fun inline(text: String): List<MdSpan> = InlineReader(text).read()

    private class InlineReader(private val text: String) {
        // For each position, where the next `]`, `)` and backtick are (-1: none),
        // so finding a link's or a code span's end is a lookup, not a scan.
        private val nextBracket = nextIndexes(']')
        private val nextParen = nextIndexes(')')
        private val nextTick = nextIndexes('`')
        private val spans = mutableListOf<MdSpan>()
        private val plain = StringBuilder()
        private var bold = false
        private var italic = false

        fun read(): List<MdSpan> {
            var i = 0
            while (i < text.length) {
                i = step(i)
            }
            emit()
            return merge(spans)
        }

        @Suppress("CyclomaticComplexMethod", "ReturnCount")
        private fun step(i: Int): Int {
            val c = text[i]
            if (c == '\\' && i + 1 < text.length && text[i + 1] in ESCAPABLE) {
                plain.append(text[i + 1])
                return i + 2
            }
            if (c == '`') {
                val end = nextTick.at(i + 1)
                if (end > i) {
                    emit()
                    spans += MdSpan(text.substring(i + 1, end), code = true)
                    return end + 1
                }
            }
            if (c == '!' && text.startsWith("![", i)) {
                link(i + 1)?.let { (label, _, end) ->
                    plain.append(label)
                    return end
                }
            }
            if (c == '[') {
                link(i)?.let { (label, url, end) ->
                    emit()
                    val safe = url.takeIf { it.startsWith("https://") || it.startsWith("http://") }
                    spans += MdSpan(label, bold = bold, italic = italic, url = safe)
                    if (safe != null) shownHost(label, safe)?.let { plain.append(" ($it)") }
                    return end
                }
            }
            if (togglesBold(i, c)) {
                emit()
                bold = !bold
                return i + 2
            }
            if (togglesItalic(i, c)) {
                emit()
                italic = !italic
                return i + 1
            }
            plain.append(c)
            return i + 1
        }

        /** `[label](url)` starting at [start]: the label, the url, and the index after it. */
        private fun link(start: Int): Triple<String, String, Int>? {
            val close = nextBracket.at(start + 1)
            val opensUrl = close >= 0 && text.getOrNull(close + 1) == '('
            val end = if (opensUrl) nextParen.at(close + 2) else -1
            return if (end < 0) {
                null
            } else {
                Triple(text.substring(start + 1, close), text.substring(close + 2, end).trim(), end + 1)
            }
        }

        private fun nextIndexes(c: Char): IntArray {
            val next = IntArray(text.length + 1)
            next[text.length] = -1
            for (i in text.indices.reversed()) next[i] = if (text[i] == c) i else next[i + 1]
            return next
        }

        /** The host to show after a link labelled [label]; null when the label already shows the address. */
        private fun shownHost(label: String, url: String): String? {
            val host = runCatching { URI(url).host }.getOrNull() ?: return url
            val shown = label.trim().removeSuffix("/")
            return host.takeUnless { shown == url.removeSuffix("/") || shown.equals(host, ignoreCase = true) }
        }

        private fun isEmphasis(c: Char) = c == '*' || c == '_'

        /** `**`/`__` closes an open bold, or opens one when a closing pair follows. */
        private fun togglesBold(i: Int, c: Char): Boolean {
            val marker = "$c$c"
            val isMarker = isEmphasis(c) && text.startsWith(marker, i)
            return isMarker && (bold || text.indexOf(marker, i + 2) > i + 2)
        }

        /** `*`/`_` closes an open italic, or opens one (see [opensItalic]). */
        private fun togglesItalic(i: Int, c: Char): Boolean = isEmphasis(c) && (italic || opensItalic(i, c))

        /** An opening `*`/`_` is followed by a non-space and has a closing one later; `_` not inside a word. */
        private fun opensItalic(i: Int, c: Char): Boolean {
            val next = text.getOrNull(i + 1)
            val insideWord = c == '_' && i > 0 && text[i - 1].isLetterOrDigit()
            return next != null && !next.isWhitespace() && !insideWord && text.indexOf(c, i + 1) > i + 1
        }

        private fun emit() {
            if (plain.isNotEmpty()) spans += MdSpan(plain.toString(), bold = bold, italic = italic)
            plain.clear()
        }

        private fun merge(spans: List<MdSpan>): List<MdSpan> = spans.fold(mutableListOf()) { out, span ->
            val last = out.lastOrNull()
            if (last != null && last.copy(text = "") == span.copy(text = "") && last.url == null) {
                out[out.lastIndex] = last.copy(text = last.text + span.text)
            } else {
                out += span
            }
            out
        }

        companion object {
            const val ESCAPABLE = "\\`*_{}[]()#+-.!>~|"
        }
    }
}

/** This table's entry at [i], or -1 (none) past its end. */
private fun IntArray.at(i: Int) = if (i < size) this[i] else -1
