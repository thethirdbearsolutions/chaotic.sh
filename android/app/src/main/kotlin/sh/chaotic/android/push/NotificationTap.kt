package sh.chaotic.android.push

import android.content.Context
import android.content.Intent

/**
 * A tapped notification about an entry (CHT-1660): which entry, and for
 * whom ([owner], the cache owner key of whoever was signed in when it was
 * posted, as [DecisionTap] carries for its buttons). A notification can
 * outlive its session (a process that died before a sign-out cancelled
 * it), so the tap opens nothing for anyone else.
 *
 * Every notification opens MainActivity under [ALIAS], a name declared in
 * the manifest as a non-exported alias of it. Only this app can start
 * that name, so a tap read from it came from one of this app's own
 * notifications; MainActivity (exported, as the launcher) ignores the
 * extras under any other name.
 */
data class NotificationTap(val entryId: String, val owner: String) {
    companion object {
        /** The alias's full class name: `.NotificationTapActivity` in the manifest. */
        const val ALIAS = "sh.chaotic.android.NotificationTapActivity"

        private const val EXTRA_ENTRY_ID = "sh.chaotic.android.extra.ENTRY_ID"
        private const val EXTRA_OWNER = "sh.chaotic.android.extra.OWNER"

        /**
         * The intent for a notification known by [key] (its tag), opening
         * [tap]'s entry when there is one, or the app as it is. The key is
         * the intent's identifier, so no two notifications share an
         * intent, and so neither extras nor a PendingIntent.
         */
        fun intent(context: Context, key: String, tap: NotificationTap?): Intent = Intent()
            .setClassName(context, ALIAS)
            .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            .setIdentifier(key)
            .apply {
                if (tap != null) {
                    putExtra(EXTRA_ENTRY_ID, tap.entryId)
                    putExtra(EXTRA_OWNER, tap.owner)
                }
            }

        /**
         * The tap [intent] carries, or null: for any intent not started
         * under [ALIAS], and for one replayed from Recents (the task's
         * first intent, delivered again long after the tap).
         */
        fun from(intent: Intent?): NotificationTap? {
            val trusted = intent
                ?.takeIf { it.component?.className == ALIAS }
                ?.takeIf { it.flags and Intent.FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY == 0 }
            val entryId = trusted?.getStringExtra(EXTRA_ENTRY_ID)?.takeIf { it.isNotEmpty() }
            val owner = trusted?.getStringExtra(EXTRA_OWNER)?.takeIf { it.isNotEmpty() }
            return if (entryId != null && owner != null) NotificationTap(entryId, owner) else null
        }
    }
}
