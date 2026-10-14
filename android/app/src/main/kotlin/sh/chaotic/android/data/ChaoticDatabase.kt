package sh.chaotic.android.data

import androidx.room.Database
import androidx.room.RoomDatabase

/**
 * The offline cache (CHT-1611). Everything in it can be fetched again from
 * the server, so a schema change does not migrate: the app is built with
 * a destructive fallback and the cache refills on the next sync.
 *
 * The fallback only covers a change that bumps [version]. A change that
 * does not would crash every install on open (Room's identity check), so
 * the schema is exported to app/schemas and CI requires each version's
 * schema to be committed and never edited afterwards.
 */
@Database(
    entities = [
        InboxEntryEntity::class,
        TeamEntity::class,
        IssueEntity::class,
        CommentEntity::class,
        ActivityEntity::class,
        SprintCardEntity::class,
        SyncStateEntity::class,
    ],
    version = 1,
    exportSchema = true,
)
abstract class ChaoticDatabase : RoomDatabase() {
    abstract fun cache(): CacheDao

    companion object {
        const val NAME = "chaotic-cache.db"
    }
}
