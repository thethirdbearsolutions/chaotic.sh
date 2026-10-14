package sh.chaotic.android.auth

import android.security.keystore.KeyGenParameterSpec
import android.security.keystore.KeyProperties
import java.io.IOException
import java.security.GeneralSecurityException
import java.security.KeyStore
import java.security.ProviderException
import javax.crypto.KeyGenerator
import javax.crypto.SecretKey

/**
 * The AES-256 key that seals the stored session. It is made inside the
 * Android Keystore and never leaves it: the app can use it, nothing can
 * read it out, and it is not part of any backup or device transfer, so a
 * session file copied elsewhere does not open (the store then reads as
 * signed out).
 */
internal object KeystoreSessionKey {
    private const val PROVIDER = "AndroidKeyStore"
    private const val ALIAS = "sh.chaotic.android.session.v1"
    private const val KEY_BITS = 256

    /** The key, created on first use. Every Keystore failure surfaces as a [GeneralSecurityException]. */
    @Synchronized
    fun get(): SecretKey = try {
        val keyStore = KeyStore.getInstance(PROVIDER).apply { load(null) }
        (keyStore.getKey(ALIAS, null) as? SecretKey) ?: create()
    } catch (e: IOException) {
        throw GeneralSecurityException("the Android Keystore could not be loaded", e)
    } catch (e: ProviderException) {
        // Some Keystore implementations throw this unchecked exception for an unusable key.
        throw GeneralSecurityException("the Android Keystore refused the session key", e)
    }

    private fun create(): SecretKey {
        val spec =
            KeyGenParameterSpec
                .Builder(ALIAS, KeyProperties.PURPOSE_ENCRYPT or KeyProperties.PURPOSE_DECRYPT)
                .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
                .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
                .setKeySize(KEY_BITS)
                .build()
        return KeyGenerator
            .getInstance(KeyProperties.KEY_ALGORITHM_AES, PROVIDER)
            .apply { init(spec) }
            .generateKey()
    }
}
