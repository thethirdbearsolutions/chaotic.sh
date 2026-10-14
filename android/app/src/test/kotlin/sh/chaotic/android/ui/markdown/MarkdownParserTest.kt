package sh.chaotic.android.ui.markdown

import kotlin.test.Test
import kotlin.test.assertEquals

class MarkdownParserTest {
    private fun text(value: String) = MdSpan(value)

    @Test
    fun blocks() {
        val blocks = MarkdownParser.parse(
            """
            # Title
            First line
            continues here.

            - one
            * two
            3. three
            > quoted

            ```kotlin
            val x = 1

            val y = 2
            ```
            ### Small ###
            """.trimIndent(),
        )

        assertEquals(
            listOf(
                MdBlock.Heading(1, listOf(text("Title"))),
                MdBlock.Paragraph(listOf(text("First line continues here."))),
                MdBlock.ListItem("•", listOf(text("one"))),
                MdBlock.ListItem("•", listOf(text("two"))),
                MdBlock.ListItem("3.", listOf(text("three"))),
                MdBlock.Quote(listOf(text("quoted"))),
                MdBlock.Code("val x = 1\n\nval y = 2"),
                MdBlock.Heading(3, listOf(text("Small"))),
            ),
            blocks,
        )
    }

    @Test
    fun anUnclosedFenceRunsToTheEnd() {
        assertEquals(listOf(MdBlock.Code("a\nb")), MarkdownParser.parse("```\na\nb"))
    }

    @Test
    fun inlineStyles() {
        assertEquals(
            listOf(
                text("a "),
                MdSpan("bold", bold = true),
                text(" and "),
                MdSpan("italic", italic = true),
                text(" and "),
                MdSpan("code *not italic*", code = true),
                text(" and "),
                MdSpan("both", bold = true, italic = true),
            ),
            MarkdownParser.inline("a **bold** and _italic_ and `code *not italic*` and ***both***"),
        )
    }

    @Test
    fun linksKeepOnlyWebUrls() {
        assertEquals(
            // Any other scheme keeps the label and drops the link.
            listOf(text("see "), MdSpan("the PR", url = "https://example.com/pr/1"), text(" or this")),
            MarkdownParser.inline("see [the PR](https://example.com/pr/1) or [this](javascript:void)"),
        )
    }

    @Test
    fun imagesShowTheirAltText() {
        assertEquals(listOf(text("a diagram here")), MarkdownParser.inline("a ![diagram](https://x/y.png) here"))
    }

    @Test
    fun unmatchedMarkersAreLiteral() {
        assertEquals(
            listOf(text("2 * 3 = 6, snake_case_name, **open")),
            MarkdownParser.inline("2 * 3 = 6, snake_case_name, **open"),
        )
        assertEquals(listOf(text("[not a link] and `tick")), MarkdownParser.inline("[not a link] and `tick"))
    }

    @Test
    fun escapes() {
        assertEquals(listOf(text("*literal* [x]")), MarkdownParser.inline("\\*literal\\* \\[x\\]"))
    }

    @Test
    fun emptyInputHasNoBlocks() {
        assertEquals(emptyList(), MarkdownParser.parse("  \n\n"))
    }
}
