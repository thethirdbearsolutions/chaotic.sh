package sh.chaotic.sync

import java.util.concurrent.TimeUnit

/**
 * The inbox as the screen lays it out: "Needs you" (a decision waits on
 * the person: a gate to complete, a review to approve) above "For you"
 * (everything else: mentions, assignments, notices), each newest first.
 */
data class InboxSections(val needsYou: List<InboxEntry>, val forYou: List<InboxEntry>, val unread: Int) {
    val isEmpty: Boolean get() = needsYou.isEmpty() && forYou.isEmpty()

    companion object {
        val NEEDS_YOU_KINDS = setOf("gate_pending", "review_requested")

        /** [entries] in [teamId], or in every team when it is null. */
        fun of(entries: List<InboxEntry>, teamId: String? = null): InboxSections {
            val shown = entries.filter { teamId == null || it.teamId == teamId }
            val newestFirst = compareByDescending<InboxEntry> { it.createdAtMillis }.thenBy { it.id }
            val (needsYou, forYou) = shown.sortedWith(newestFirst).partition { it.kind in NEEDS_YOU_KINDS }
            return InboxSections(needsYou, forYou, unread = shown.count { !it.read })
        }
    }
}

/** Who did something, as a row shows it: a person by name, an agent with its owner. */
sealed interface Who {
    data class Person(val name: String) : Who

    data class Agent(val name: String, val ownerName: String?) : Who

    /** No source: the system itself (a ritual, a sprint rotation). */
    data object System : Who

    companion object {
        fun of(principal: Principal?): Who = when {
            principal == null -> System
            principal.isAgent -> Agent(principal.name, principal.ownerName)
            else -> Person(principal.name)
        }
    }
}

/** A compact age for a list row: "now", "5m", "3h", "2d", "6w", "1y". */
object RelativeAge {
    private const val DAYS_PER_WEEK = 7L
    private const val DAYS_PER_YEAR = 365L

    fun format(thenMillis: Long, nowMillis: Long): String {
        val elapsed = (nowMillis - thenMillis).coerceAtLeast(0)
        val minutes = TimeUnit.MILLISECONDS.toMinutes(elapsed)
        val hours = TimeUnit.MILLISECONDS.toHours(elapsed)
        val days = TimeUnit.MILLISECONDS.toDays(elapsed)
        return when {
            minutes < 1 -> "now"
            hours < 1 -> "${minutes}m"
            days < 1 -> "${hours}h"
            days < DAYS_PER_WEEK -> "${days}d"
            days < DAYS_PER_YEAR -> "${days / DAYS_PER_WEEK}w"
            else -> "${days / DAYS_PER_YEAR}y"
        }
    }
}

/**
 * What the sprint card warns about. Limbo comes first: the sprint is
 * already closing and only its rituals stand in the way. Arrears is a
 * spent budget, which blocks moving tickets to in progress, done or
 * canceled until the sprint is closed.
 */
sealed interface SprintBanner {
    data class Limbo(val pendingRituals: List<String>) : SprintBanner

    data class Arrears(val overBy: Int) : SprintBanner

    companion object {
        fun of(card: SprintCard): List<SprintBanner> = buildList {
            if (card.limbo) add(Limbo(card.pendingRituals))
            val budget = card.budget
            if (budget != null && card.pointsSpent > budget) add(Arrears(card.pointsSpent - budget))
        }
    }
}

/** The order of the sprint tab: cards with something to say first, then by project name. */
fun List<SprintCard>.forDisplay(): List<SprintCard> =
    sortedWith(compareBy<SprintCard> { SprintBanner.of(it).isEmpty() }.thenBy { it.projectName.lowercase() })
