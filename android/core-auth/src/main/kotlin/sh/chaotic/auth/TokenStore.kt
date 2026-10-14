package sh.chaotic.auth

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.Json
import java.nio.ByteBuffer
import java.security.GeneralSecurityException
import java.security.SecureRandom
import javax.crypto.Cipher
import javax.crypto.SecretKey
import javax.crypto.spec.GCMParameterSpec
import kotlin.coroutines.CoroutineContext

/** Where the signed-in session lives between launches. One session: v1 signs in to one server at a time. */
interface TokenStore {
    suspend fun read(): Session?

    suspend fun write(session: Session)

    suspend fun clear()
}

/** A process-lifetime store, for tests and previews. */
class InMemoryTokenStore(private var session: Session? = null) : TokenStore {
    override suspend fun read(): Session? = session

    override suspend fun write(session: Session) {
        this.session = session
    }

    override suspend fun clear() {
        session = null
    }
}

/** Opaque bytes on disk: DataStore on Android. */
interface ByteStore {
    suspend fun read(): ByteArray?

    suspend fun write(bytes: ByteArray)

    suspend fun clear()
}

/** Seals and opens bytes. On Android the key never leaves the Keystore. */
interface TokenCipher {
    fun encrypt(plaintext: ByteArray): ByteArray

    /** Throws [GeneralSecurityException] when [sealed] was not sealed by this key, or was altered. */
    fun decrypt(sealed: ByteArray): ByteArray
}

/**
 * AES-256-GCM with a fresh 96-bit IV per write, laid out as
 * `version (1 byte) | iv (12 bytes) | ciphertext+tag`. [key] is asked for on
 * each use, so an Android Keystore key can be created lazily on first use.
 *
 * [providesIv]: an Android Keystore key refuses a caller-chosen IV for
 * encryption (randomized encryption is required by default) and makes its
 * own; a software key takes one from [random].
 */
class AesGcmTokenCipher(
    private val providesIv: Boolean = false,
    private val random: SecureRandom = SecureRandom(),
    private val key: () -> SecretKey,
) : TokenCipher {
    override fun encrypt(plaintext: ByteArray): ByteArray {
        val cipher = Cipher.getInstance(TRANSFORMATION)
        if (providesIv) {
            cipher.init(Cipher.ENCRYPT_MODE, key())
        } else {
            val iv = ByteArray(IV_BYTES).also(random::nextBytes)
            cipher.init(Cipher.ENCRYPT_MODE, key(), GCMParameterSpec(TAG_BITS, iv))
        }
        val iv = cipher.iv
        check(iv.size == IV_BYTES) { "unexpected GCM IV length ${iv.size}" }
        val sealed = cipher.doFinal(plaintext)
        return ByteBuffer
            .allocate(1 + IV_BYTES + sealed.size)
            .put(VERSION)
            .put(iv)
            .put(sealed)
            .array()
    }

    override fun decrypt(sealed: ByteArray): ByteArray {
        if (sealed.size < 1 + IV_BYTES || sealed[0] != VERSION) {
            throw GeneralSecurityException("not a sealed session")
        }
        val cipher = Cipher.getInstance(TRANSFORMATION)
        cipher.init(Cipher.DECRYPT_MODE, key(), GCMParameterSpec(TAG_BITS, sealed, 1, IV_BYTES))
        return cipher.doFinal(sealed, 1 + IV_BYTES, sealed.size - 1 - IV_BYTES)
    }

    private companion object {
        const val TRANSFORMATION = "AES/GCM/NoPadding"
        const val VERSION: Byte = 1
        const val IV_BYTES = 12
        const val TAG_BITS = 128
    }
}

/**
 * A [TokenStore] that keeps the session as JSON sealed by [cipher] in
 * [bytes]. Something on disk that does not open (the Keystore key was
 * lost, as after a restore to a new device, or the file was damaged)
 * reads as signed out, and is deleted: the person signs in again rather
 * than the app failing on every launch.
 */
class EncryptedTokenStore(
    private val cipher: TokenCipher,
    private val bytes: ByteStore,
    /** Where sealing and opening run: Keystore operations block, so never on the main thread. */
    private val cryptoContext: CoroutineContext = Dispatchers.IO,
) : TokenStore {
    override suspend fun read(): Session? {
        val sealed = bytes.read() ?: return null
        val session =
            try {
                val plaintext = withContext(cryptoContext) { cipher.decrypt(sealed) }
                json.decodeFromString(Session.serializer(), plaintext.decodeToString())
            } catch (_: GeneralSecurityException) {
                null
            } catch (_: SerializationException) {
                null
            } catch (_: IllegalArgumentException) {
                null
            }
        if (session == null) bytes.clear()
        return session
    }

    override suspend fun write(session: Session) {
        val plaintext = json.encodeToString(Session.serializer(), session).encodeToByteArray()
        bytes.write(withContext(cryptoContext) { cipher.encrypt(plaintext) })
    }

    override suspend fun clear() {
        bytes.clear()
    }

    private companion object {
        val json = Json { ignoreUnknownKeys = true }
    }
}
