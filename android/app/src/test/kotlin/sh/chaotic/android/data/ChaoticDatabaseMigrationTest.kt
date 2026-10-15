package sh.chaotic.android.data

import android.content.Context
import android.database.sqlite.SQLiteDatabase
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.runBlocking
import org.json.JSONObject
import org.junit.After
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertTrue

/**
 * An app update keeps the writes the person queued while offline
 * (CHT-1666). Each committed schema from version 2 (the first with the
 * write queue) is built from app/schemas, given a queued write and a
 * refusal, then opened the way the app opens it. Room migrates it and
 * then checks the result against the current schema. A version bump
 * without a migration fails here, because Room finds no path and has no
 * destructive fallback, and so does a migration that drops the queue.
 *
 * The old databases are built from the schema files directly, as Room's
 * MigrationTestHelper would. The helper reads the schemas from the test
 * APK's assets, which a Robolectric unit test does not have. A downgrade
 * (a newer build's file) starts over empty, as does version 1.
 */
@RunWith(RobolectricTestRunner::class)
class ChaoticDatabaseMigrationTest {
    private val context: Context = ApplicationProvider.getApplicationContext()
    private val names = mutableListOf<String>()

    @After
    fun deleteDatabases() {
        names.forEach { context.deleteDatabase(it) }
    }

    @Test
    fun theQueueSurvivesAnUpdateFromEveryVersionThatHeldIt() = runBlocking {
        for (version in FIRST_QUEUE_VERSION..ChaoticDatabase.VERSION) {
            val name = createAt(version) { db -> queueRows(version, db).forEach(db::execSQL) }

            val database = ChaoticDatabase.builder(context, name).allowMainThreadQueries().build()
            try {
                val write = database.cache().allWrites().single().toWrite()
                assertEquals("w1", write?.key, "queued write after an update from $version")
                assertEquals("Looks good", write?.value)
                assertEquals(2, write?.attempts)
                val refusal = database.cache().allRefusals().single().toRefusal()
                assertEquals("w0", refusal?.key, "refusal after an update from $version")
                assertEquals(409, refusal?.status)
                assertEquals(ChaoticDatabase.VERSION, database.openHelper.readableDatabase.version)
            } finally {
                database.close()
            }
        }
    }

    @Test
    fun aCacheOnlyVersionStartsOverEmpty() = runBlocking {
        val name = createAt(1) { db ->
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

    @Test
    fun aDowngradeStartsOverEmpty() = runBlocking {
        // A newer build's file, as far as Room can tell: a later version
        // number. The destructive path drops and recreates every table.
        val name = createAt(ChaoticDatabase.VERSION) { db ->
            queueRows(ChaoticDatabase.VERSION, db).forEach(db::execSQL)
            db.version = ChaoticDatabase.VERSION + 1
        }

        val database = ChaoticDatabase.builder(context, name).allowMainThreadQueries().build()
        try {
            assertEquals(emptyList(), database.cache().allWrites())
            assertEquals(emptyList(), database.cache().allRefusals())
            assertEquals(ChaoticDatabase.VERSION, database.openHelper.readableDatabase.version)
        } finally {
            database.close()
        }
    }

    /**
     * A queued write and a refusal, in the shape [version]'s tables have.
     * A version that changes pending_write or write_refusal gets its own
     * rows here, and the migration test then covers the new shape too.
     */
    private fun queueRows(version: Int, db: SQLiteDatabase): List<String> {
        val shape = columns(db, "pending_write") to columns(db, "write_refusal")
        assertEquals(
            V2_QUEUE_SHAPE,
            shape,
            "version $version changed the queue tables: add rows for its shape to queueRows",
        )
        return V2_QUEUE_ROWS
    }

    private fun columns(db: SQLiteDatabase, table: String): List<String> =
        db.rawQuery("PRAGMA table_info(`$table`)", null).use { cursor ->
            buildList { while (cursor.moveToNext()) add(cursor.getString(cursor.getColumnIndexOrThrow("name"))) }
        }

    /**
     * A database file exactly as Room left it at [version]: the committed
     * schema's tables, indices and identity hash, and the version number.
     * [fill] then adds rows to it.
     */
    private fun createAt(version: Int, fill: (SQLiteDatabase) -> Unit): String {
        val schemaFile = File(SCHEMAS, "${ChaoticDatabase::class.java.name}/$version.json")
        assertTrue(schemaFile.isFile, "no committed schema at ${schemaFile.absolutePath}")
        val schema = JSONObject(schemaFile.readText()).getJSONObject("database")
        assertEquals(version, schema.getInt("version"))

        val name = "from-$version.db"
        names += name
        context.deleteDatabase(name)
        val file = context.getDatabasePath(name).apply { parentFile?.mkdirs() }
        SQLiteDatabase.openOrCreateDatabase(file, null).use { db ->
            val entities = schema.getJSONArray("entities")
            for (i in 0 until entities.length()) {
                val entity = entities.getJSONObject(i)
                val table = entity.getString("tableName")
                db.execSQL(entity.getString("createSql").replace(TABLE_NAME, table))
                val indices = entity.optJSONArray("indices") ?: continue
                for (j in 0 until indices.length()) {
                    db.execSQL(indices.getJSONObject(j).getString("createSql").replace(TABLE_NAME, table))
                }
            }
            val setup = schema.getJSONArray("setupQueries")
            for (i in 0 until setup.length()) db.execSQL(setup.getString(i))
            db.version = version
            fill(db)
        }
        return name
    }

    private companion object {
        /** The first version with pending_write and write_refusal (CHT-1613). */
        const val FIRST_QUEUE_VERSION = 2

        /** app/schemas: set by the Gradle test task, else the module directory Gradle runs tests in. */
        val SCHEMAS = File(System.getProperty("chaotic.roomSchemas") ?: "schemas")

        val V2_QUEUE_SHAPE = listOf(
            "seq", "key", "kind", "path", "entryId", "issueId", "teamId", "field", "value",
            "valueLabel", "label", "createdAtMillis", "notBeforeMillis", "attempts",
        ) to listOf(
            "seq", "key", "kind", "label", "status", "errorCode", "message", "entryId", "issueId",
            "atMillis", "value",
        )

        val V2_QUEUE_ROWS = listOf(
            "INSERT INTO pending_write (key, kind, path, entryId, issueId, teamId, field, value, " +
                "valueLabel, label, createdAtMillis, notBeforeMillis, attempts) VALUES " +
                "('w1', 'COMMENT', '/api/issues/i1/comments', NULL, 'i1', 't1', NULL, 'Looks good', " +
                "NULL, 'Comment on CHT-1', 1000, 0, 2)",
            "INSERT INTO write_refusal (key, kind, label, status, errorCode, message, entryId, issueId, " +
                "atMillis, value) VALUES ('w0', 'APPROVE', 'Approve CHT-2', 409, 'conflict', 'Already done', " +
                "'e1', 'i2', 900, NULL)",
        )

        const val TABLE_NAME = "\${TABLE_NAME}"
    }
}
