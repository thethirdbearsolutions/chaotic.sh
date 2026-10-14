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
        // Channels, sign-out cleanup and withdrawing notifications must work
        // whatever started the process: a push, a worker, or the launcher.
        push.start()
        // And whatever a previous process left in the write queue goes out (CHT-1613).
        writes.start()
    }
}
