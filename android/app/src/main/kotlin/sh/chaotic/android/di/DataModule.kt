package sh.chaotic.android.di

import android.content.Context
import androidx.room.Room
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import io.ktor.client.engine.HttpClientEngine
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.data.ChaoticDatabase
import sh.chaotic.android.data.RoomCacheStore
import sh.chaotic.android.data.SessionRemote
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.ChaoticRemote
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.SyncTrigger
import javax.inject.Singleton

/** The offline cache and what keeps it current (CHT-1611). */
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): ChaoticDatabase =
        Room.databaseBuilder(context, ChaoticDatabase::class.java, ChaoticDatabase.NAME)
            // A cache: on a schema change, start empty and sync again.
            .fallbackToDestructiveMigration(dropAllTables = true)
            .build()

    @Provides
    fun provideCacheDao(database: ChaoticDatabase): CacheDao = database.cache()

    @Provides
    @Singleton
    fun provideCacheStore(dao: CacheDao): CacheStore = RoomCacheStore(dao)

    @Provides
    @Singleton
    fun provideRemote(sessions: SessionManager, engine: HttpClientEngine): ChaoticRemote =
        SessionRemote(sessions, engine)

    @Provides
    @Singleton
    fun provideInboxSyncer(remote: ChaoticRemote, store: CacheStore): InboxSyncer = InboxSyncer(remote, store)

    @Provides
    @Singleton
    fun provideCacheRefresher(remote: ChaoticRemote, store: CacheStore): CacheRefresher = CacheRefresher(remote, store)

    @Provides
    @Singleton
    fun provideSyncTrigger(): SyncTrigger = SyncTrigger()
}
