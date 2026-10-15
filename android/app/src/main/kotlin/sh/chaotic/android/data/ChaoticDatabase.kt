package sh.chaotic.android.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.migration.Migration

/**
 * The offline cache (CHT-1611), and the write queue (CHT-1613).
 *
 * The cache can be fetched again from the server; the queue cannot: it is
 * what the person did while offline (approvals, comments) and has not been
 * sent yet. It shares the database so a sign-out empties it in the same
 * transaction as the rest. So from version 2, the first to hold the
 * queue, a schema change migrates (CHT-1666): a version bump adds a
 * [Migration] to [MIGRATIONS] that carries pending_write and write_refusal
 * across (a cache table it may simply drop and recreate; the next sync
 * refills it). There is no destructive fallback from 2 on, so a bump
 * without one fails ChaoticDatabaseMigrationTest rather than emptying
 * every install's queue. Version 1 held only the cache and is still
 * dropped and rebuilt.
 *
 * A change that does not bump [VERSION] would crash every install on open
 * (Room's identity check), so the schema is exported to app/schemas and CI
 * requires each version's schema to be committed and never edited afterwards.
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
        PendingWriteEntity::class,
        WriteRefusalEntity::class,
    ],
    version = ChaoticDatabase.VERSION,
    exportSchema = true,
)
abstract class ChaoticDatabase : RoomDatabase() {
    abstract fun cache(): CacheDao

    companion object {
        const val NAME = "chaotic-cache.db"

        /**
         * 1: the cache (CHT-1611).
         * 2: inbox actions, the write queue and its refusals (CHT-1613).
         */
        const val VERSION = 2

        /** Versions from before the write queue: nothing in them is lost by starting over. */
        private val CACHE_ONLY_VERSIONS = intArrayOf(1)

        /** One per version step from 2 on; each must keep the queued writes (CHT-1666). */
        val MIGRATIONS: Array<Migration> = arrayOf()

        /** The database as the app opens it; tests open it the same way. */
        fun builder(context: Context, name: String = NAME): Builder<ChaoticDatabase> =
            Room.databaseBuilder(context, ChaoticDatabase::class.java, name)
                .addMigrations(*MIGRATIONS)
                .fallbackToDestructiveMigrationFrom(true, *CACHE_ONLY_VERSIONS)
                // Only a debug build can be downgraded in place (adb install -d);
                // an older build cannot read a newer queue anyway.
                .fallbackToDestructiveMigrationOnDowngrade(dropAllTables = true)
    }
}
