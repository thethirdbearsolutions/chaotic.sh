package sh.chaotic.android.di

import android.content.Context
import android.util.Log
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import io.ktor.client.HttpClient
import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.engine.okhttp.OkHttp
import okhttp3.OkHttpClient
import sh.chaotic.android.data.CacheDao
import sh.chaotic.android.data.ChaoticDatabase
import sh.chaotic.android.data.RoomCacheStore
import sh.chaotic.android.data.SessionRemote
import sh.chaotic.android.writes.WriteActions
import sh.chaotic.android.writes.WriteRunner
import sh.chaotic.auth.AuthState
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.CacheRefresher
import sh.chaotic.sync.CacheSession
import sh.chaotic.sync.CacheStore
import sh.chaotic.sync.ChaoticRemote
import sh.chaotic.sync.InboxSyncer
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.WriteQueue
import javax.inject.Singleton

/** Whose the cache is now: the person signed in, on their server; null when signed out. */
fun SessionManager.cacheOwner(): String? =
    (state.value as? AuthState.SignedIn)?.let { CacheSession.ownerKey(it.baseUrl, it.person.id) }

/** The offline cache and what keeps it current (CHT-1611). */
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): ChaoticDatabase =
        ChaoticDatabase.builder(context).build()

    @Provides
    fun provideCacheDao(database: ChaoticDatabase): CacheDao = database.cache()

    @Provides
    @Singleton
    fun provideCacheStore(dao: CacheDao): CacheStore = RoomCacheStore(dao)

    @Provides
    @Singleton
    fun provideRemote(sessions: SessionManager, engine: HttpClientEngine, plain: OkHttpClient): ChaoticRemote =
        // The health probe on the client without credentials (CHT-1671); never closed, like the engine.
        SessionRemote(sessions, engine, probe = HttpClient(OkHttp.create { preconfigured = plain }))

    @Provides
    @Singleton
    fun provideCacheSession(store: CacheStore, sessions: SessionManager): CacheSession =
        CacheSession(store) { sessions.cacheOwner() }

    @Provides
    @Singleton
    fun provideInboxSyncer(remote: ChaoticRemote, session: CacheSession): InboxSyncer = InboxSyncer(remote, session)

    @Provides
    @Singleton
    fun provideCacheRefresher(remote: ChaoticRemote, session: CacheSession): CacheRefresher =
        CacheRefresher(remote, session)

    @Provides
    @Singleton
    fun provideSyncTrigger(): SyncTrigger = SyncTrigger()

    /**
     * The offline write queue (CHT-1613), in the same cache and fenced by
     * the same session. A cached issue that a taken write left stale is
     * fetched again after the flush (CHT-1668).
     */
    @Provides
    @Singleton
    fun provideWriteQueue(remote: ChaoticRemote, session: CacheSession, refresher: CacheRefresher): WriteQueue =
        WriteQueue(
            remote,
            session,
            onIssueStale = { issueId -> refresher.refreshCachedIssue(issueId) },
            // The class only, as the write runner logs: a message could carry what the issue says.
            onStaleRefreshError = { e -> Log.w("ChaoticWrites", "Stale issue refresh failed: ${e.javaClass.name}") },
        )

    @Provides
    @Singleton
    fun provideWriteActions(queue: WriteQueue, runner: WriteRunner): WriteActions = WriteActions(queue, runner::kick)
}
