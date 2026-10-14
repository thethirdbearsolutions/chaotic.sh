package sh.chaotic.android

import io.ktor.client.engine.okhttp.OkHttpEngine
import okhttp3.OkHttpClient
import sh.chaotic.android.di.NetworkModule
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertTrue

class BuildSetupTest {
    @Test
    fun applicationIdIsTheSameInEveryFlavor() {
        // Neither flavor sets an applicationIdSuffix: an F-Droid install and a
        // Play install are the same app and cannot sit side by side.
        assertEquals("sh.chaotic.android", BuildConfig.APPLICATION_ID)
        assertTrue(BuildConfig.FLAVOR in setOf("foss", "play"))
    }

    @Test
    fun theRedirectIsTheBuiltInClientsPrivateUseScheme() {
        // backend/app/oauth/builtin.py lists the same URI; a backend test
        // checks app/build.gradle.kts against it. The scheme is the
        // application id (RFC 8252 §7.1).
        assertEquals("sh.chaotic.android:/oauth2redirect", BuildConfig.OAUTH_REDIRECT_URI)
        assertTrue(BuildConfig.OAUTH_REDIRECT_URI.startsWith(BuildConfig.APPLICATION_ID + ":"))
    }

    @Test
    fun networkModuleProvidesOkHttpEngine() {
        val engine = NetworkModule.provideHttpClientEngine(OkHttpClient())
        try {
            assertIs<OkHttpEngine>(engine)
        } finally {
            engine.close()
        }
    }
}
