package sh.chaotic.android

import io.ktor.client.engine.okhttp.OkHttpEngine
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
    fun networkModuleProvidesOkHttpEngine() {
        val engine = NetworkModule.provideHttpClientEngine()
        try {
            assertIs<OkHttpEngine>(engine)
        } finally {
            engine.close()
        }
    }
}
