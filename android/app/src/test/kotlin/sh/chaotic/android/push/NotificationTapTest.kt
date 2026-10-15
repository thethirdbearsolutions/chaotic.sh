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

/** Only an intent started under the non-exported alias opens an entry (CHT-1660). */
@RunWith(RobolectricTestRunner::class)
class NotificationTapTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()

    @Test
    fun theAliasIsMainActivityAndNoOtherAppCanStartIt() {
        val alias = context.packageManager.getActivityInfo(ComponentName(context, NotificationTap.ALIAS), 0)
        assertEquals(MainActivity::class.java.name, alias.targetActivity)
        assertFalse(alias.exported)
    }

    @Test
    fun anEntryIdComesBackFromTheAliasIntent() {
        val intent = NotificationTap.intent(context, "entry:e1", "e1")
        assertEquals(context.packageName, intent.component?.packageName)
        assertEquals("e1", NotificationTap.entryId(intent))
        assertNull(NotificationTap.entryId(NotificationTap.intent(context, "summary:issue:i1", null)))
    }

    @Test
    fun theSameExtraSentToTheExportedLauncherIsIgnored() {
        val forged = Intent(context, MainActivity::class.java)
            .putExtras(NotificationTap.intent(context, "entry:e1", "e1"))
        assertNull(NotificationTap.entryId(forged))
        assertNull(NotificationTap.entryId(null))
    }

    @Test
    fun aTapReplayedFromRecentsOpensNothing() {
        val replayed = NotificationTap.intent(context, "entry:e1", "e1")
            .addFlags(Intent.FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY)
        assertNull(NotificationTap.entryId(replayed))
    }
}
