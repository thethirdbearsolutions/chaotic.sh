package sh.chaotic.android.data

import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import org.junit.After
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.CacheStoreContract

/** The Room store passes the same contract as core-sync's in-memory one. */
@RunWith(RobolectricTestRunner::class)
class RoomCacheStoreTest : CacheStoreContract() {
    private val databases = mutableListOf<ChaoticDatabase>()

    override fun createStore(): CacheStore {
        val database = Room.inMemoryDatabaseBuilder(
            ApplicationProvider.getApplicationContext(),
            ChaoticDatabase::class.java,
        )
            .allowMainThreadQueries()
            .build()
        databases += database
        return RoomCacheStore(database.cache())
    }

    @After
    fun close() {
        databases.forEach { it.close() }
    }
}
