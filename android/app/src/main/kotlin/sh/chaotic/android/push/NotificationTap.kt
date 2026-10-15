package sh.chaotic.android.push

import android.content.Context
import android.content.Intent

/**
 * What tapping a notification opens (CHT-1660): MainActivity, started
 * under [ALIAS], a name declared in the manifest as a non-exported alias
 * of it. Only this app can start that name, so an entry id it carries
 * came from one of this app's own notifications; MainActivity (exported,
 * as the launcher) ignores the extra under any other name.
 */
object NotificationTap {
    /** The alias's full class name: `.NotificationTapActivity` in the manifest. */
    const val ALIAS = "sh.chaotic.android.NotificationTapActivity"

    private const val EXTRA_ENTRY_ID = "sh.chaotic.android.extra.ENTRY_ID"

    /**
     * The intent for a notification known by [key] (its tag), opening the
     * entry [entryId] when there is one. The key is the intent's
     * identifier, so no two notifications share an intent, and so neither
     * an extra nor a PendingIntent.
     */
    fun intent(context: Context, key: String, entryId: String?): Intent = Intent()
        .setClassName(context, ALIAS)
        .addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        .setIdentifier(key)
        .apply { if (entryId != null) putExtra(EXTRA_ENTRY_ID, entryId) }

    /**
     * The entry a tapped notification is about, or null: for any intent
     * not started under [ALIAS], and for one replayed from Recents (the
     * task's first intent, delivered again long after the tap).
     */
    fun entryId(intent: Intent?): String? = intent
        ?.takeIf { it.component?.className == ALIAS }
        ?.takeIf { it.flags and Intent.FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY == 0 }
        ?.getStringExtra(EXTRA_ENTRY_ID)
}
