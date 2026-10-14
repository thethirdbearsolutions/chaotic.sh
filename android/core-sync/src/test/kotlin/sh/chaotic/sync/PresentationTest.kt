package sh.chaotic.sync

import java.util.concurrent.TimeUnit
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class PresentationTest {
    @Test
    fun needsYouHoldsGatesAndReviewsAboveEverythingElseNewestFirst() {
        val entries = listOf(
            entry("mention-old", kind = "mention", createdAtMillis = 1),
            entry("gate", kind = "gate_pending", createdAtMillis = 2),
            entry("assignment", kind = "assignment", createdAtMillis = 5),
            entry("review", kind = "review_requested", createdAtMillis = 4),
            entry("novel", kind = "a_kind_added_later", createdAtMillis = 3),
        )

        val sections = InboxSections.of(entries)

        assertEquals(listOf("review", "gate"), sections.needsYou.map { it.id })
        assertEquals(listOf("assignment", "novel", "mention-old"), sections.forYou.map { it.id })
    }

    @Test
    fun unreadCountsOnlyWhatIsShown() {
        val entries = listOf(
            entry("a1", read = false),
            entry("a2", read = true),
            entry("b1", teamId = TEAM_B, read = false),
        )

        assertEquals(2, InboxSections.of(entries).unread)
        assertEquals(1, InboxSections.of(entries, TEAM_A).unread)
        assertEquals(listOf("b1"), InboxSections.of(entries, TEAM_B).forYou.map { it.id })
        assertTrue(InboxSections.of(entries, "team-none").isEmpty)
    }

    @Test
    fun whoNamesAgentsWithTheirOwner() {
        assertEquals(
            Who.Agent("Claude", "ethan"),
            Who.of(Principal("u1", "Claude", isAgent = true, ownerName = "ethan")),
        )
        assertEquals(Who.Person("Ada"), Who.of(Principal("u2", "Ada")))
        assertEquals(Who.System, Who.of(null))
    }

    @Test
    fun relativeAge() {
        val now = TimeUnit.DAYS.toMillis(1_000)
        fun ago(millis: Long) = RelativeAge.format(now - millis, now)

        assertEquals("now", ago(30_000))
        assertEquals("now", RelativeAge.format(now + 5_000, now))
        assertEquals("5m", ago(TimeUnit.MINUTES.toMillis(5)))
        assertEquals("3h", ago(TimeUnit.HOURS.toMillis(3)))
        assertEquals("2d", ago(TimeUnit.DAYS.toMillis(2)))
        assertEquals("6w", ago(TimeUnit.DAYS.toMillis(45)))
        assertEquals("1y", ago(TimeUnit.DAYS.toMillis(400)))
    }

    @Test
    fun sprintBanners() {
        assertEquals(emptyList(), SprintBanner.of(card("p", budget = 10, spent = 10)))
        assertEquals(listOf(SprintBanner.Arrears(3)), SprintBanner.of(card("p", budget = 10, spent = 13)))
        assertEquals(emptyList(), SprintBanner.of(card("p", budget = null, spent = 500)))
        assertEquals(
            listOf(SprintBanner.Limbo(listOf("retro")), SprintBanner.Arrears(1)),
            SprintBanner.of(card("p", budget = 1, spent = 2, limbo = true).copy(pendingRituals = listOf("retro"))),
        )
    }

    @Test
    fun cardsWithABannerComeFirst() {
        val cards = listOf(
            card("a").copy(projectName = "alpha"),
            card("z", budget = 1, spent = 5).copy(projectName = "Zulu"),
            card("b").copy(projectName = "Beta"),
            card("y", limbo = true).copy(projectName = "yankee"),
        )

        assertEquals(listOf("yankee", "Zulu", "alpha", "Beta"), cards.forDisplay().map { it.projectName })
    }
}

class TimestampsTest {
    @Test
    fun readsTheServersFormats() {
        assertEquals(1_000L, Timestamps.millis("1970-01-01T00:00:01Z"))
        assertEquals(1_000L, Timestamps.millis("1970-01-01T00:00:01+00:00"))
        assertEquals(1_000L, Timestamps.millis("1970-01-01T01:00:01+01:00"))
        // No offset: UTC, as the server means it.
        assertEquals(1_000L, Timestamps.millis("1970-01-01T00:00:01"))
    }

    @Test
    fun keepsMicroseconds() {
        assertEquals(1_000_001L, Timestamps.micros("1970-01-01T00:00:01.000001+00:00"))
        assertTrue(Timestamps.micros("2026-10-14T05:51:27.137216Z") > Timestamps.micros("2026-10-14T05:51:27.137215Z"))
    }

    @Test
    fun unreadableIsZero() {
        assertEquals(0L, Timestamps.millis("yesterday"))
        assertEquals(0L, Timestamps.micros(null))
    }
}
