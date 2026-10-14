package sh.chaotic.android.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.engine.okhttp.OkHttp
import javax.inject.Singleton

/**
 * One HTTP engine (and so one OkHttp connection pool) for every generated API
 * class in core-api. OkHttp is Apache-2.0, so this is fine for the foss flavor.
 */
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideHttpClientEngine(): HttpClientEngine = OkHttp.create()
}
