package sh.chaotic.android.ui.common

import sh.chaotic.sync.SyncOutcome

/** Why the screen shows saved data instead of fresh: the last sync's failure. */
sealed interface SyncProblem {
    data object Offline : SyncProblem

    data object Unreadable : SyncProblem

    data class Server(val status: Int?) : SyncProblem

    companion object {
        /** Null when the run succeeded, or ended in a sign-out (the screen is about to go). */
        fun of(outcome: SyncOutcome): SyncProblem? = when (outcome) {
            is SyncOutcome.Synced, SyncOutcome.Unauthorized -> null

            is SyncOutcome.Failed -> when (outcome.reason) {
                SyncOutcome.Reason.UNREACHABLE -> Offline
                SyncOutcome.Reason.UNREADABLE -> Unreadable
                SyncOutcome.Reason.SERVER -> Server(outcome.status)
            }
        }
    }
}
