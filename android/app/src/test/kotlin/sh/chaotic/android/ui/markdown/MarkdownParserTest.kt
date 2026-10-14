package sh.chaotic.android.ui.markdown

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

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
            listOf(text("see "), MdSpan("the PR", url = "https://example.com/pr/1"), text(" (example.com) or this")),
            MarkdownParser.inline("see [the PR](https://example.com/pr/1) or [this](javascript:void)"),
        )
    }

    @Test
    fun aLinkLabelledWithAnotherAddressShowsTheRealHost() {
        assertEquals(
            listOf(MdSpan("https://good.example", url = "https://evil.example/x"), text(" (evil.example)")),
            MarkdownParser.inline("[https://good.example](https://evil.example/x)"),
        )
        // A label that is the address, or its host, shows nothing more.
        assertEquals(
            listOf(
                MdSpan("https://a.example/", url = "https://a.example"),
                text(" and "),
                MdSpan("a.example", url = "https://a.example/p"),
            ),
            MarkdownParser.inline("[https://a.example/](https://a.example) and [a.example](https://a.example/p)"),
        )
    }

    // The first took 15 s at this size (desktop JVM) when each `[` scanned ahead for its `]`;
    // all of them together now take about a second.
    @org.junit.Test(timeout = 10_000)
    fun pathologicalInputIsLinear() {
        val size = 1_000_000
        listOf(
            "[".repeat(size),
            "[a](".repeat(size / 4),
            "![".repeat(size / 2),
            "[]".repeat(size / 2) + "x",
            "`" + "a".repeat(size),
            "*a ".repeat(size / 3),
            "**a".repeat(size / 3),
            "_a ".repeat(size / 3),
        ).forEach { input ->
            assertTrue(MarkdownParser.inline(input).isNotEmpty(), input.take(8))
        }
        // Unclosed brackets stay literal text.
        assertEquals(listOf(MdBlock.Paragraph(listOf(text("[".repeat(size))))), MarkdownParser.parse("[".repeat(size)))
        assertEquals(size / 4, MarkdownParser.parse("- [\n".repeat(size / 4)).size)
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
