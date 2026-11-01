package sh.chaotic.android.push

import android.content.Context
import android.content.SharedPreferences
import androidx.core.content.edit
import dagger.hilt.android.qualifiers.ApplicationContext
import sh.chaotic.sync.WriteKind
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Which write a notification's decision queued, per person and entry
 * (CHT-1685), kept on disk so a tap step that runs again (after the
 * process died, or a retry after an error) or a second tap follows the
 * decision already made instead of reporting "Nothing was sent" for a
 * write the server took, or queueing again one it refused. Only the
 * write's kind and client key are kept, never a note. Emptied at
 * sign-out ([clear]); a record older than [MAX_AGE_MILLIS] is dropped.
 */
@Singleton
class DecisionRecords internal constructor(private val prefs: SharedPreferences, private val now: () -> Long) {
    @Inject
    constructor(@ApplicationContext context: Context) : this(prefs(context), System::currentTimeMillis)

    /** The decision queued for [entryId] on behalf of [owner], if one is recorded. */
    fun get(owner: String, entryId: String): Recorded? {
        val parts = prefs.getString(name(owner, entryId), null)?.split(SEPARATOR) ?: return null
        val kind = WriteKind.entries.firstOrNull { it.name == parts.getOrNull(0) }
        val key = parts.getOrNull(1)?.takeIf { it.isNotEmpty() }
        val at = parts.getOrNull(2)?.toLongOrNull()
        val fresh = at != null && now() - at <= MAX_AGE_MILLIS
        return if (kind != null && key != null && fresh) Recorded(kind, key) else null
    }

    fun put(owner: String, entryId: String, recorded: Recorded) {
        val at = now()
        prefs.edit(commit = true) {
            prefs.all.forEach { (name, value) ->
                val stamp = (value as? String)?.substringAfterLast(SEPARATOR)?.toLongOrNull()
                if (stamp == null || at - stamp > MAX_AGE_MILLIS) remove(name)
            }
            putString(name(owner, entryId), listOf(recorded.kind.name, recorded.key, at).joinToString(SEPARATOR))
        }
    }

    fun remove(owner: String, entryId: String) = prefs.edit(commit = true) { remove(name(owner, entryId)) }

    fun clear() = prefs.edit(commit = true) { clear() }

    data class Recorded(val kind: WriteKind, val key: String)

    companion object {
        private const val FILE = "decision_records"
        private const val SEPARATOR = "|"

        /** Longer than any undo window or retry a decision waits through. */
        val MAX_AGE_MILLIS = TimeUnit.DAYS.toMillis(7)

        private fun prefs(context: Context) = context.getSharedPreferences(FILE, Context.MODE_PRIVATE)

        // The owner key holds a server URL; '\n' never appears in it or in an entry id.
        private fun name(owner: String, entryId: String) = owner + "\n" + entryId

        /** At sign-out, from where no instance is at hand; written in the background, off the caller's thread. */
        fun clear(context: Context) = prefs(context).edit { clear() }
    }
}
