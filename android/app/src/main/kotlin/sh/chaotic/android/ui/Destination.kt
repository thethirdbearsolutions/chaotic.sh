package sh.chaotic.android.ui

import kotlinx.serialization.Serializable

/** Type-safe navigation destinations. Sign-in and the inbox join this list. */
@Serializable
sealed interface Destination {
    @Serializable
    data object Home : Destination
}
