package sh.chaotic.android.auth

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.test.core.app.ApplicationProvider
import net.openid.appauth.RedirectUriReceiverActivity
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.w3c.dom.Element
import sh.chaotic.android.BuildConfig
import java.io.File
import javax.xml.parsers.DocumentBuilderFactory
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * The sign-in redirect reaches AppAuth only through the App Links URL
 * (CHT-1649): AppAuth's own custom-scheme filter is replaced, so no
 * private-use scheme opens the app, and the filter asks Android to verify
 * the domain against chaotic.sh's assetlinks.json.
 */
@RunWith(RobolectricTestRunner::class)
class OAuthRedirectFilterTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()

    private fun receivers(uri: String): List<String> {
        val intent =
            Intent(Intent.ACTION_VIEW, Uri.parse(uri))
                .addCategory(Intent.CATEGORY_BROWSABLE)
                .setPackage(context.packageName)
        return context.packageManager.queryIntentActivities(intent, 0).map { it.activityInfo.name }
    }

    @Test
    fun theRedirectReachesAppAuthsReceiver() {
        assertEquals(
            listOf(RedirectUriReceiverActivity::class.java.name),
            receivers(BuildConfig.OAUTH_REDIRECT_URI + "?code=cac_x&state=s&iss=https%3A%2F%2Fhost"),
        )
    }

    @Test
    fun nothingElseOnTheDomainOpensTheApp() {
        val others =
            listOf(
                "https://chaotic.sh/",
                "https://chaotic.sh/app/other",
                "https://chaotic.sh/app/oauth2redirect/extra",
                "http://chaotic.sh/app/oauth2redirect",
                "https://www.chaotic.sh/app/oauth2redirect",
            )
        for (uri in others) {
            assertEquals(emptyList(), receivers(uri), uri)
        }
    }

    @Test
    fun noPrivateUseSchemeOpensTheApp() {
        // The old redirect, and the placeholder AppAuth's replaced filter would have used.
        for (uri in listOf("sh.chaotic.android:/oauth2redirect", "sh.chaotic.android.unused:/oauth2redirect")) {
            assertEquals(emptyList(), receivers(uri), uri)
        }
    }

    @Test
    fun theFilterAsksForAppLinksVerification() {
        // Robolectric does not expose autoVerify, so read the source manifest
        // (unit tests run in the module directory).
        val manifest =
            DocumentBuilderFactory
                .newInstance()
                .apply { isNamespaceAware = true }
                .newDocumentBuilder()
                .parse(File("src/main/AndroidManifest.xml"))
        val android = "http://schemas.android.com/apk/res/android"
        val activities = manifest.getElementsByTagName("activity")
        val receiver =
            (0 until activities.length)
                .map { activities.item(it) as Element }
                .single { it.getAttributeNS(android, "name") == RedirectUriReceiverActivity::class.java.name }
        assertEquals("replace", receiver.getAttributeNS("http://schemas.android.com/tools", "node"))
        val filters = receiver.getElementsByTagName("intent-filter")
        assertEquals(1, filters.length)
        assertEquals("true", (filters.item(0) as Element).getAttributeNS(android, "autoVerify"))
    }
}
