package sh.chaotic.android.ui

import kotlinx.serialization.Serializable

/** Type-safe destinations of the signed-in app. Sign-in is not one: the session state chooses it. */
@Serializable
sealed interface Destination {
    @Serializable
    data object Home : Destination
}
