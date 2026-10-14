package sh.chaotic.android.data

import androidx.room.Database
import androidx.room.RoomDatabase

/**
 * The offline cache (CHT-1611). Everything in it can be fetched again from
 * the server, so a schema change does not migrate: the app is built with
 * a destructive fallback and the cache refills on the next sync. That is
 * also why the schema is not exported.
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
    exportSchema = false,
)
abstract class ChaoticDatabase : RoomDatabase() {
    abstract fun cache(): CacheDao

    companion object {
        const val NAME = "chaotic-cache.db"
    }
}
