package sh.chaotic.android.push

import android.content.Context
import androidx.test.core.app.ApplicationProvider
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.test.runTest
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import sh.chaotic.auth.AesGcmTokenCipher
import sh.chaotic.auth.TokenCipher
import sh.chaotic.sync.push.PendingEndpoint
import sh.chaotic.sync.push.PushState
import sh.chaotic.sync.push.PushStatus
import java.security.GeneralSecurityException
import java.security.ProviderException
import javax.crypto.KeyGenerator
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull

@RunWith(RobolectricTestRunner::class)
class SharedPrefsPushStateStoreTest {
    private val prefs = ApplicationProvider.getApplicationContext<Context>()
        .getSharedPreferences("push-test", Context.MODE_PRIVATE)
        .also { it.edit().clear().commit() }
    private val key = KeyGenerator.getInstance("AES").apply { init(256) }.generateKey()
    private val cipher = AesGcmTokenCipher { key }

    private fun store(cipher: TokenCipher = this.cipher) = SharedPrefsPushStateStore(
        prefs,
        cipher,
        Dispatchers.Unconfined,
    )

    private val full = PushState(
        installationId = "install-1",
        status = PushStatus.ACTIVE,
        owner = "ada@https://chaotic.test",
        vapidKeyId = "kid",
        pending = PendingEndpoint("https://ntfy.example/upSecret", "BPublic", "AuthSecret"),
        noDistributorNoticeShown = true,
    )

    @Test
    fun aStateRoundTrips() = runTest {
        store().update { full }
        assertEquals(full, store().read())
        val empty = ApplicationProvider
            .getApplicationContext<Context>()
            .getSharedPreferences("empty", Context.MODE_PRIVATE)
        assertEquals(PushState(), SharedPrefsPushStateStore(empty, cipher, Dispatchers.Unconfined).read())
    }

    @Test
    fun thePendingEndpointIsNeverStoredInTheClear() = runTest {
        store().update { full }
        val stored = prefs.all.values.joinToString(" ")
        assertFalse("upSecret" in stored)
        assertFalse("AuthSecret" in stored)
    }

    @Test
    fun aPendingEndpointThatNoLongerOpensReadsAsNone() = runTest {
        store().update { full }
        val otherKey = KeyGenerator.getInstance("AES").apply { init(256) }.generateKey()
        val state = store(AesGcmTokenCipher { otherKey }).read()
        assertNull(state.pending)
        assertEquals("install-1", state.installationId)
    }

    @Test
    fun aKeystoreThatCannotSealDropsThePendingEndpointNotTheRest() = runTest {
        val broken = object : TokenCipher {
            override fun encrypt(plaintext: ByteArray): ByteArray = throw GeneralSecurityException("no key")

            override fun decrypt(sealed: ByteArray): ByteArray = throw GeneralSecurityException("no key")
        }
        store(broken).update { full }
        val state = store().read()
        assertNull(state.pending)
        assertEquals(PushStatus.ACTIVE, state.status)
    }

    @Test
    fun aKeystoreThatThrowsUncheckedReadsAsNoPendingStateNotACrash() = runTest {
        store().update { full }
        for (failure in listOf(ProviderException("keystore"), IllegalStateException("keystore"))) {
            val broken = object : TokenCipher {
                override fun encrypt(plaintext: ByteArray): ByteArray = throw failure

                override fun decrypt(sealed: ByteArray): ByteArray = throw failure
            }
            val state = store(broken).read()
            assertNull(state.pending, "${failure.javaClass.simpleName} opening")
            assertEquals("install-1", state.installationId)
            store(broken).update { it.copy(vapidKeyId = "kid2", pending = full.pending) }
            assertNull(store().read().pending, "${failure.javaClass.simpleName} sealing")
            store().update { full }
        }
    }

    @Test
    fun anUnknownStatusReadsAsNotStarted() = runTest {
        prefs.edit().putString("status", "FROM_THE_FUTURE").commit()
        assertEquals(PushStatus.NOT_STARTED, store().read().status)
    }
}
