package sh.chaotic.android.push

import android.content.Context
import android.util.Log
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import io.ktor.client.engine.HttpClientEngine
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import sh.chaotic.android.auth.DeviceName
import sh.chaotic.android.auth.KeystorePushKey
import sh.chaotic.android.di.cacheOwner
import sh.chaotic.auth.AesGcmTokenCipher
import sh.chaotic.auth.SessionManager
import sh.chaotic.sync.SyncTrigger
import sh.chaotic.sync.push.PushDistributor
import sh.chaotic.sync.push.PushHandler
import sh.chaotic.sync.push.PushRegistrar
import sh.chaotic.sync.push.PushRemote
import sh.chaotic.sync.push.PushStateStore
import javax.inject.Qualifier
import javax.inject.Singleton

/** A scope that lives as long as the process, for work a push or a worker starts and nothing on screen owns. */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class ApplicationScope

/** Push notifications (CHT-1612). */
@Module
@InstallIn(SingletonComponent::class)
object PushModule {
    @Provides
    @Singleton
    @ApplicationScope
    fun provideApplicationScope(): CoroutineScope = CoroutineScope(
        SupervisorJob() + Dispatchers.Default + CoroutineExceptionHandler { _, e ->
            // A push or a worker must never take the process down. Only the
            // class is logged: a message could carry an endpoint or a key.
            Log.w(TAG, "Background push work failed: ${e.javaClass.name}")
        },
    )

    private const val TAG = "ChaoticPush"

    @Provides
    @Singleton
    fun providePushStateStore(@ApplicationContext context: Context): PushStateStore = SharedPrefsPushStateStore(
        prefs = context.getSharedPreferences("push", Context.MODE_PRIVATE),
        cipher = AesGcmTokenCipher(providesIv = true) { KeystorePushKey.get() },
    )

    @Provides
    @Singleton
    fun providePushRemote(sessions: SessionManager, engine: HttpClientEngine): PushRemote =
        SessionPushRemote(sessions, engine)

    @Provides
    @Singleton
    fun provideDistributor(@ApplicationContext context: Context): PushDistributor = UnifiedPushDistributor(context)

    @Provides
    @Singleton
    fun provideRegistrar(
        remote: PushRemote,
        store: PushStateStore,
        distributor: PushDistributor,
        sessions: SessionManager,
        deviceName: DeviceName,
    ): PushRegistrar = PushRegistrar(remote, store, distributor, { sessions.cacheOwner() }, { deviceName.get() })

    @Provides
    @Singleton
    fun provideNotifier(@ApplicationContext context: Context): AndroidNotifier = AndroidNotifier(context)

    /** A push means the inbox changed: sync now if the app is on screen, and soon in the background either way. */
    @Provides
    @Singleton
    fun provideHandler(
        @ApplicationContext context: Context,
        store: PushStateStore,
        sessions: SessionManager,
        notifier: AndroidNotifier,
        trigger: SyncTrigger,
    ): PushHandler = PushHandler(store, { sessions.cacheOwner() }, notifier) {
        trigger.requestNow()
        PushWork.syncSoon(context)
    }
}
