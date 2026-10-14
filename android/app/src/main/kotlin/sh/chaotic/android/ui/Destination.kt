package sh.chaotic.android.ui

import kotlinx.serialization.Serializable

/** Type-safe destinations of the signed-in app. Sign-in is not one: the session state chooses it. */
@Serializable
sealed interface Destination {
    @Serializable
    data object Home : Destination

    /** One issue, known by the team the inbox entry that led to it is in (the server's issue has no team). */
    @Serializable
    data class Issue(val issueId: String, val teamId: String) : Destination
}
