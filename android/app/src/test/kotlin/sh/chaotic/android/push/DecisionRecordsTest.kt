package sh.chaotic.android.push

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.sync.WriteKind
import java.util.concurrent.TimeUnit
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

/** What a notification's decision queued, kept across processes (CHT-1685). */
@RunWith(RobolectricTestRunner::class)
class DecisionRecordsTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val prefs = context.getSharedPreferences("decision_records", Context.MODE_PRIVATE)
    private var now = TimeUnit.DAYS.toMillis(100)
    private val records = DecisionRecords(prefs) { now }
    private val approved = DecisionRecords.Recorded(WriteKind.APPROVE, "k1")

    @Test
    fun aRecordIsReadBackByAnotherInstancePerPersonAndEntry() {
        records.put("ada@https://a.test", "e1", approved)

        val later = DecisionRecords(prefs) { now }
        assertEquals(approved, later.get("ada@https://a.test", "e1"))
        assertNull(later.get("grace@https://a.test", "e1"))
        assertNull(later.get("ada@https://a.test", "e2"))
    }

    @Test
    fun anOldRecordIsIgnoredAndPrunedOnTheNextPut() {
        records.put("ada", "e1", approved)
        now += DecisionRecords.MAX_AGE_MILLIS + 1

        assertNull(records.get("ada", "e1"))
        records.put("ada", "e2", approved)
        assertEquals(1, prefs.all.size)
    }

    @Test
    fun signOutForgetsEveryRecord() {
        records.put("ada", "e1", approved)

        DecisionRecords.clear(context)

        assertNull(records.get("ada", "e1"))
    }

    @Test
    fun aRemovedRecordLeavesTheOthers() {
        records.put("ada", "e1", approved)
        records.put("ada", "e2", approved)

        records.remove("ada", "e1")

        assertNull(records.get("ada", "e1"))
        assertEquals(approved, records.get("ada", "e2"))
    }
}
