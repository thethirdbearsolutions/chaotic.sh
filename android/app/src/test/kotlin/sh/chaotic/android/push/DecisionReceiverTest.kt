package sh.chaotic.android.push

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.core.app.RemoteInput
import androidx.test.core.app.ApplicationProvider
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.sync.WriteKind
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNull

/** What a notification button's intent carries, and what the receiver reads from it (CHT-1665). */
@RunWith(RobolectricTestRunner::class)
class DecisionReceiverTest {
    private val context = ApplicationProvider.getApplicationContext<Context>()
    private val tap = DecisionTap("e1", "ada@https://chaotic.test", "gate_pending", "CHT-7", DecisionTap.APPROVE)

    private fun typed(intent: Intent, text: CharSequence): Intent {
        val input = RemoteInput.Builder(DecisionTap.KEY_NOTE).build()
        val results = Bundle().apply { putCharSequence(DecisionTap.KEY_NOTE, text) }
        RemoteInput.addResultsToIntent(arrayOf(input), intent, results)
        return intent
    }

    @Test
    fun aTapRoundTripsThroughItsIntent() {
        assertEquals(tap, DecisionTap.from(tap.toIntent(context)))
        val noIssue = tap.copy(issue = null, decision = DecisionTap.REJECT_WITH_NOTE)
        assertEquals(noIssue, DecisionTap.from(noIssue.toIntent(context)))
    }

    @Test
    fun anIntentThisAppDidNotMakeIsNoTap() {
        assertNull(DecisionTap.from(tap.toIntent(context).setAction("something.else")))
        assertNull(DecisionTap.from(tap.toIntent(context).putExtra("entry", "../etc")))
        assertNull(DecisionTap.from(tap.toIntent(context).putExtra("owner", "")))
        assertNull(DecisionTap.from(tap.toIntent(context).putExtra("kind", "Gate Pending")))
        assertNull(DecisionTap.from(tap.toIntent(context).putExtra("decision", "delete")))
        assertNull(DecisionTap.from(tap.toIntent(context).without("entry")))
        // A malformed issue key is dropped, not trusted.
        assertNull(DecisionTap.from(tap.toIntent(context).putExtra("issue", "<b>"))?.issue)
    }

    private fun Intent.without(name: String): Intent = apply { removeExtra(name) }

    @Test
    fun approveTakesNoNote() {
        assertNull(DecisionReceiver.note(context, typed(tap.toIntent(context), "ignored"), tap))
    }

    @Test
    fun rejectSendsTheCannedNoteWhateverWasTyped() {
        val reject = tap.copy(decision = DecisionTap.REJECT)
        val note = DecisionReceiver.note(context, typed(reject.toIntent(context), "x"), reject)
        assertEquals("Rejected from phone", note)
    }

    @Test
    fun rejectWithNoteSendsWhatWasTyped() {
        val reject = tap.copy(decision = DecisionTap.REJECT_WITH_NOTE)

        fun note(text: String?) = DecisionReceiver.note(
            context,
            reject.toIntent(context).let { if (text == null) it else typed(it, text) },
            reject,
        )

        assertEquals("Needs tests", note("  Needs tests "))
        assertEquals("Rejected from phone", note("   "))
        assertEquals("Rejected from phone", note(null))
        assertEquals(DecisionReceiver.MAX_NOTE_CHARS, note("x".repeat(DecisionReceiver.MAX_NOTE_CHARS + 50))?.length)
    }

    @Test
    fun aJobRoundTripsThroughTheWorkersInput() {
        val job = DecisionJob.of(tap.copy(decision = DecisionTap.REJECT), "Rejected from phone")
        assertEquals(WriteKind.REJECT, job.write)
        assertEquals(job, DecisionJob.from(job.toData()))
        val followed = job.copy(issue = null, note = null, key = "k1", watch = true)
        assertEquals(followed, DecisionJob.from(followed.toData()))
    }
}
