package sh.chaotic.android

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import sh.chaotic.android.push.PushController
import sh.chaotic.android.writes.WriteRunner
import javax.inject.Inject

@HiltAndroidApp
class ChaoticApplication : Application() {
    @Inject lateinit var push: PushController

    @Inject lateinit var writes: WriteRunner

    override fun onCreate() {
        super.onCreate()
        // TEMPORARY canary (CHT-1723): reached only by reflection, so R8 strips it.
        Class.forName("sh.chaotic.android.R8Canary").getDeclaredConstructor().newInstance()
        // Channels, sign-out cleanup and withdrawing notifications must work
        // whatever started the process: a push, a worker, or the launcher.
        push.start()
        // And whatever a previous process left in the write queue goes out (CHT-1613).
        writes.start()
    }
}

/** TEMPORARY (CHT-1723): proves the release smoke test catches a stripped class. */
internal class R8Canary
