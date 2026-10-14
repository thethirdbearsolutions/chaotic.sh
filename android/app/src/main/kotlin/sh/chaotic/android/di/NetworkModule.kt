package sh.chaotic.android.di

import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import io.ktor.client.engine.HttpClientEngine
import io.ktor.client.engine.okhttp.OkHttp
import okhttp3.OkHttpClient
import javax.inject.Singleton

/**
 * One HTTP engine for every generated API class in core-api, on the
 * authenticated OkHttp client: each request goes out as the signed-in
 * person, refreshing the token when it has to (CHT-1610). OkHttp is
 * Apache-2.0, so this is fine for the foss flavor.
 */
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {
    @Provides
    @Singleton
    fun provideHttpClientEngine(@Authenticated client: OkHttpClient): HttpClientEngine =
        OkHttp.create { preconfigured = client }
}
