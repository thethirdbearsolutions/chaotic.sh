package sh.chaotic.android.auth

import android.content.Context
import android.os.Build
import android.provider.Settings
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject

/**
 * What Connected apps calls this phone ("Pixel 8 · Chaotic for Android"):
 * the name the person gave the device, or else its model. Sent once, as
 * `device_name` in the code exchange; the server cleans and shortens it.
 */
class DeviceName
@Inject
constructor(@param:ApplicationContext private val context: Context) {
    fun get(): String? = Settings.Global
        .getString(context.contentResolver, Settings.Global.DEVICE_NAME)
        ?.takeIf { it.isNotBlank() }
        ?: Build.MODEL?.takeIf { it.isNotBlank() }
}
