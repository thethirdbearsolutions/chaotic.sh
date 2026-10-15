package sh.chaotic.android.push

import android.content.ComponentName
import android.content.Context
import android.content.Intent
import androidx.test.core.app.ApplicationProvider
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.android.MainActivity
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull

/** Only an intent started under the non-exported alias carries a tap (CHT-1660). */
@RunWith(RobolectricTestRunner::class)
class NotificationTapTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val tap = NotificationTap("e1", "ada@https://chaotic.test")

    @Test
    fun theAliasIsMainActivityAndNoOtherAppCanStartIt() {
        val alias = context.packageManager.getActivityInfo(ComponentName(context, NotificationTap.ALIAS), 0)
        assertEquals(MainActivity::class.java.name, alias.targetActivity)
        assertFalse(alias.exported)
    }

    @Test
    fun aTapComesBackFromTheAliasIntent() {
        val intent = NotificationTap.intent(context, "entry:e1", tap)
        assertEquals(context.packageName, intent.component?.packageName)
        assertEquals(tap, NotificationTap.from(intent))
        assertNull(NotificationTap.from(NotificationTap.intent(context, "summary:issue:i1", null)))
    }

    @Test
    fun theSameExtrasSentToTheExportedLauncherAreIgnored() {
        val forged = Intent(context, MainActivity::class.java)
            .putExtras(NotificationTap.intent(context, "entry:e1", tap))
        assertNull(NotificationTap.from(forged))
        assertNull(NotificationTap.from(null))
    }

    @Test
    fun aTapReplayedFromRecentsOpensNothing() {
        val replayed = NotificationTap.intent(context, "entry:e1", tap)
            .addFlags(Intent.FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY)
        assertNull(NotificationTap.from(replayed))
    }
}
