package sh.chaotic.sync.push

import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.launch
import kotlinx.coroutines.test.runTest
import kotlinx.coroutines.yield
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertNull
import kotlin.test.assertTrue

class GuardedTest {
    @Test
    fun aCollectorOutlivesAValueWhoseHandlingThrows() = runTest {
        val handled = mutableListOf<Int>()
        val errors = mutableListOf<String>()
        flowOf(1, 2, 3).collectGuarded({ errors += it.javaClass.simpleName }) {
            if (it == 2) throw IllegalStateException("an OEM's NotificationManager")
            handled += it
        }
        assertEquals(listOf(1, 3), handled)
        assertEquals(listOf("IllegalStateException"), errors)
    }

    @Test
    fun aLongLivedCollectorKeepsHandlingEventsAfterAFailure() = runTest {
        val events = MutableSharedFlow<String>()
        val signedOut = mutableListOf<String>()
        var failures = 0
        val job = launch {
            events.collectGuarded({ failures++ }) {
                if (it == "broken") error("unregister failed")
                signedOut += it
            }
        }
        yield()
        events.emit("broken")
        events.emit("ada")
        events.emit("bob")
        yield()
        assertEquals(listOf("ada", "bob"), signedOut, "a later sign-out is still handled")
        assertEquals(1, failures)
        assertTrue(job.isActive)
        job.cancel()
    }

    @Test
    fun aFailureIsReportedAndCancellationIsNot() = runTest {
        var reported: Exception? = null
        assertNull(guarded({ reported = it }) { throw java.security.ProviderException("keystore") })
        assertEquals("keystore", reported?.message)
        reported = null
        assertFailsWith<CancellationException> { guarded({ reported = it }) { throw CancellationException("left") } }
        assertNull(reported)
        assertEquals(7, guarded({}) { 7 })
    }
}
