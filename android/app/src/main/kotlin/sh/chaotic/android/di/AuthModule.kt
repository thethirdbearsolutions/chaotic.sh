package sh.chaotic.android.di

import android.content.Context
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import sh.chaotic.android.auth.DataStoreByteStore
import sh.chaotic.android.auth.KeystoreSessionKey
import sh.chaotic.auth.AesGcmTokenCipher
import sh.chaotic.auth.AuthInterceptor
import sh.chaotic.auth.EncryptedTokenStore
import sh.chaotic.auth.OAuthDiscovery
import sh.chaotic.auth.SessionManager
import sh.chaotic.auth.TokenEndpoint
import sh.chaotic.auth.TokenStore
import javax.inject.Qualifier
import javax.inject.Singleton

/** The OkHttp client that signs requests in as the person ([AuthInterceptor]). */
@Qualifier
@Retention(AnnotationRetention.BINARY)
annotation class Authenticated

@Module
@InstallIn(SingletonComponent::class)
object AuthModule {
    /**
     * No credentials: discovery and the token endpoint, which carry their
     * own. The authenticated client is built from it, so they share one
     * connection pool.
     */
    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient = OkHttpClient()

    @Provides
    @Singleton
    @Authenticated
    fun provideAuthenticatedOkHttpClient(base: OkHttpClient, sessions: SessionManager): OkHttpClient =
        base.newBuilder().addInterceptor(AuthInterceptor(sessions, interactive = true)).build()

    @Provides
    @Singleton
    fun provideTokenStore(@ApplicationContext context: Context): TokenStore = EncryptedTokenStore(
        cipher = AesGcmTokenCipher(providesIv = true) { KeystoreSessionKey.get() },
        bytes = DataStoreByteStore(context),
    )

    @Provides
    @Singleton
    fun provideTokenEndpoint(base: OkHttpClient): TokenEndpoint = TokenEndpoint(base)

    @Provides
    @Singleton
    fun provideDiscovery(base: OkHttpClient): OAuthDiscovery = OAuthDiscovery(base)

    @Provides
    @Singleton
    fun provideSessionManager(store: TokenStore, tokens: TokenEndpoint): SessionManager = SessionManager(store, tokens)
}
