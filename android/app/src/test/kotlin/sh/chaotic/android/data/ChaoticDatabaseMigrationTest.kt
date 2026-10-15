package sh.chaotic.android.data

import android.content.Context
import androidx.room.testing.MigrationTestHelper
import androidx.test.core.app.ApplicationProvider
import androidx.test.platform.app.InstrumentationRegistry
import kotlinx.coroutines.runBlocking
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import kotlin.test.assertEquals

/**
 * An app update keeps the writes the person queued while offline
 * (CHT-1666). Each committed schema from version 2 (the first with the
 * write queue) is built from app/schemas, given a queued write and a
 * refusal, then opened the way the app opens it. A version bump without a
 * migration fails here (Room finds no path and no destructive fallback),
 * and so does a migration that drops the queue.
 */
@RunWith(RobolectricTestRunner::class)
class ChaoticDatabaseMigrationTest {
    @get:Rule
    val helper = MigrationTestHelper(InstrumentationRegistry.getInstrumentation(), ChaoticDatabase::class.java)

    private val context: Context = ApplicationProvider.getApplicationContext()

    @Test
    fun theQueueSurvivesAnUpdateFromEveryVersionThatHeldIt() = runBlocking {
        for (version in FIRST_QUEUE_VERSION..ChaoticDatabase.VERSION) {
            val name = "from-$version.db"
            helper.createDatabase(name, version).use { db ->
                db.execSQL(
                    "INSERT INTO pending_write (key, kind, path, entryId, issueId, teamId, field, value, " +
                        "valueLabel, label, createdAtMillis, notBeforeMillis, attempts) VALUES " +
                        "('w1', 'COMMENT', '/api/issues/i1/comments', NULL, 'i1', 't1', NULL, 'Looks good', " +
                        "NULL, 'Comment on CHT-1', 1000, 0, 2)",
                )
                db.execSQL(
                    "INSERT INTO write_refusal (key, kind, label, status, errorCode, message, entryId, issueId, " +
                        "atMillis, value) VALUES ('w0', 'APPROVE', 'Approve CHT-2', 409, 'conflict', 'Already done', " +
                        "'e1', 'i2', 900, NULL)",
                )
            }
            // Room's own check that the migrated schema is the current one.
            helper.runMigrationsAndValidate(name, ChaoticDatabase.VERSION, true, *ChaoticDatabase.MIGRATIONS).close()

            val database = ChaoticDatabase.builder(context, name).allowMainThreadQueries().build()
            try {
                val write = database.cache().allWrites().single().toWrite()
                assertEquals("w1", write?.key, "queued write after an update from $version")
                assertEquals("Looks good", write?.value)
                assertEquals(2, write?.attempts)
                val refusal = database.cache().allRefusals().single().toRefusal()
                assertEquals("w0", refusal?.key, "refusal after an update from $version")
                assertEquals(409, refusal?.status)
            } finally {
                database.close()
            }
        }
    }

    @Test
    fun aCacheOnlyVersionStartsOverEmpty() = runBlocking {
        val name = "from-1.db"
        helper.createDatabase(name, 1).use { db ->
            db.execSQL("INSERT INTO team (id, name, `key`) VALUES ('t1', 'Team', 'T')")
        }

        val database = ChaoticDatabase.builder(context, name).allowMainThreadQueries().build()
        try {
            assertEquals(emptyList(), database.cache().allTeams())
            assertEquals(emptyList(), database.cache().allWrites())
        } finally {
            database.close()
        }
    }

    private companion object {
        /** The first version with pending_write and write_refusal (CHT-1613). */
        const val FIRST_QUEUE_VERSION = 2
    }
}
