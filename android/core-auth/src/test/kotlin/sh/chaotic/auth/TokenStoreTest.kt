package sh.chaotic.auth

import kotlinx.coroutines.test.runTest
import java.security.GeneralSecurityException
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull

class TokenStoreTest {
    private class MemoryBytes : ByteStore {
        var bytes: ByteArray? = null

        override suspend fun read(): ByteArray? = bytes

        override suspend fun write(bytes: ByteArray) {
            this.bytes = bytes
        }

        override suspend fun clear() {
            bytes = null
        }
    }

    private fun aesKey(): SecretKey = KeyGenerator.getInstance("AES").apply { init(256) }.generateKey()

    @Test
    fun aSessionRoundTripsSealed() = runTest {
        val bytes = MemoryBytes()
        val key = aesKey()
        val store = EncryptedTokenStore(AesGcmTokenCipher { key }, bytes)
        val session = session(accessToken = "at_secret", refreshToken = "rt_secret")

        store.write(session)

        assertEquals(session, store.read())
        val onDisk = assertNotNull(bytes.bytes).decodeToString(throwOnInvalidSequence = false)
        assertFalse("at_secret" in onDisk, "the access token is stored in the clear")
        assertFalse("rt_secret" in onDisk, "the refresh token is stored in the clear")
    }

    @Test
    fun eachWriteUsesAFreshIv() {
        val key = aesKey()
        val cipher = AesGcmTokenCipher { key }

        val first = cipher.encrypt("same".encodeToByteArray())
        val second = cipher.encrypt("same".encodeToByteArray())

        assertFalse(first.contentEquals(second))
        assertContentEquals("same".encodeToByteArray(), cipher.decrypt(second))
    }

    @Test
    fun alteredOrForeignBytesDoNotOpen() {
        val key = aesKey()
        val cipher = AesGcmTokenCipher { key }
        val sealed = cipher.encrypt("hello".encodeToByteArray())

        val flipped = sealed.copyOf().also { it[it.size - 1] = (it[it.size - 1].toInt() xor 1).toByte() }
        assertFailsWith<GeneralSecurityException> { cipher.decrypt(flipped) }
        assertFailsWith<GeneralSecurityException> { AesGcmTokenCipher { aesKey() }.decrypt(sealed) }
        assertFailsWith<GeneralSecurityException> { cipher.decrypt(byteArrayOf(1, 2, 3)) }
        assertFailsWith<GeneralSecurityException> {
            cipher.decrypt(
                byteArrayOf(9) + sealed.copyOfRange(1, sealed.size),
            )
        }
    }

    @Test
    fun aSessionThatNoLongerOpensReadsAsSignedOutAndIsDeleted() = runTest {
        // As after a restore to a new phone: the file came along, the Keystore key did not.
        val bytes = MemoryBytes()
        EncryptedTokenStore(AesGcmTokenCipher { aesKey() }, bytes).write(session())

        val store = EncryptedTokenStore(AesGcmTokenCipher { aesKey() }, bytes)

        assertNull(store.read())
        assertNull(bytes.bytes)
    }

    @Test
    fun clearForgetsTheSession() = runTest {
        val bytes = MemoryBytes()
        val key = aesKey()
        val store = EncryptedTokenStore(AesGcmTokenCipher { key }, bytes)
        store.write(session())

        store.clear()

        assertNull(store.read())
        assertNull(bytes.bytes)
    }
}
