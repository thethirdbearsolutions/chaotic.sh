package sh.chaotic.android.push

import com.google.crypto.tink.apps.fixed_webpush.WebPushHybridDecrypt
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import java.io.File
import java.security.GeneralSecurityException
import java.util.Base64
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

/**
 * The server's push bodies open on the phone (CHT-1612): every vector in
 * android/testdata/web-push-vectors.json (made by the backend's
 * `push_sender.encrypt`, pinned by backend/tests/test_push_vectors.py) is
 * decrypted with the UnifiedPush connector's own Web Push decryption, the
 * code its DefaultKeyManager runs for every message.
 */
class WebPushInteropTest {
    private val vectors: List<JsonObject> by lazy {
        val file = File("../testdata/web-push-vectors.json")
        check(file.exists()) { "run from the app module directory: ${file.absolutePath} is missing" }
        Json.parseToJsonElement(file.readText()).jsonObject["vectors"]!!.jsonArray.map { it.jsonObject }
    }

    private fun JsonObject.bytes(name: String): ByteArray = Base64.getUrlDecoder().decode(
        get(name)!!.jsonPrimitive.content,
    )

    private fun decrypter(vector: JsonObject) = WebPushHybridDecrypt
        .Builder()
        .withAuthSecret(vector.bytes("auth"))
        .withRecipientPublicKey(vector.bytes("ua_public"))
        .withRecipientPrivateKey(vector.bytes("ua_private"))
        .build()

    @Test
    fun everyServerBodyDecryptsToItsPlaintext() {
        assertTrue(vectors.size >= 7)
        for (vector in vectors) {
            val plaintext = decrypter(vector).decrypt(vector.bytes("body"), null)
            assertContentEquals(vector.bytes("plaintext"), plaintext, vector["name"].toString())
        }
    }

    @Test
    fun aTamperedBodyIsRefused() {
        val vector = vectors.first { it["payload"]!!.jsonPrimitive.content == "true" }
        val body = vector.bytes("body")
        body[body.size - 1] = (body[body.size - 1].toInt() xor 1).toByte()
        assertFailsWith<GeneralSecurityException> { decrypter(vector).decrypt(body, null) }
    }

    @Test
    fun anotherDevicesKeysCannotOpenIt() {
        val (one, other) = vectors.filter { it["payload"]!!.jsonPrimitive.content == "true" }.take(2)
        assertFailsWith<GeneralSecurityException> { decrypter(other).decrypt(one.bytes("body"), null) }
    }
}
