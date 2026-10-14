package sh.chaotic.sync.push

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import sh.chaotic.api.client.ChaoticApi
import java.io.File
import java.util.Base64
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertIs
import kotlin.test.assertNull
import kotlin.test.assertTrue

/**
 * The payloads as the server's sender makes them: android/testdata holds
 * plaintexts from `push_sender.entry_payload` and `resolved_payload`,
 * pinned to the server by backend/tests/test_push_vectors.py.
 */
class PushPayloadTest {
    private val vectors: List<JsonObject> by lazy {
        val file = File("../testdata/web-push-vectors.json")
        check(file.exists()) { "run from the core-sync module directory: ${file.absolutePath} is missing" }
        ChaoticApi.json.parseToJsonElement(file.readText()).jsonObject["vectors"]!!.jsonArray.map { it.jsonObject }
    }

    private fun JsonObject.str(name: String) = get(name)!!.jsonPrimitive.content

    private fun plaintext(vector: JsonObject): ByteArray = Base64.getUrlDecoder().decode(vector.str("plaintext"))

    private fun vector(name: String) = vectors.single { it.str("name") == name }

    private fun parse(json: String) = PushPayload.parse(json.encodeToByteArray())

    @Test
    fun everyServerPayloadParsesAsWhatItSays() {
        val payloads = vectors.filter { it["payload"]!!.jsonPrimitive.boolean }
        assertTrue(payloads.size >= 5)
        for (vector in payloads) {
            val bytes = plaintext(vector)
            val json = ChaoticApi.json.parseToJsonElement(bytes.decodeToString()).jsonObject
            fun field(name: String) = (json[name] as? JsonPrimitive)?.takeIf { it.isString }?.content
            when (val parsed = PushPayload.parse(bytes)) {
                is PushPayload.Entry -> {
                    assertEquals("entry", field("type"))
                    assertEquals(field("id"), parsed.id)
                    assertEquals(field("kind"), parsed.kind)
                    assertEquals(field("issue"), parsed.issueIdentifier)
                    assertEquals(field("title"), parsed.title)
                    assertEquals(field("ritual_id"), parsed.ritualId)
                    assertEquals(field("collapse"), parsed.collapse)
                }

                is PushPayload.Resolved -> {
                    assertEquals("resolved", field("type"))
                    assertEquals(field("id"), parsed.id)
                    assertEquals(field("collapse"), parsed.collapse)
                }

                else -> error("${vector.str("name")} parsed as $parsed")
            }
        }
    }

    @Test
    fun theGateVectorInDetail() {
        val parsed = assertIs<PushPayload.Entry>(PushPayload.parse(plaintext(vector("entry-gate-on-issue"))))
        assertEquals("gate_pending", parsed.kind)
        assertEquals("CHT-12", parsed.issueIdentifier)
        assertEquals("Approve the deploy gate", parsed.title)
        assertEquals("issue:a1d4c7e0-1111-4c2b-8d33-000000000012", parsed.collapse)
        assertEquals(PushChannel.APPROVALS, PushChannel.forKind(parsed.kind))
    }

    @Test
    fun theServersTruncatedTitleIsKeptWhole() {
        val parsed = assertIs<PushPayload.Entry>(PushPayload.parse(plaintext(vector("entry-long-title"))))
        assertEquals(200, parsed.title.length)
        assertTrue(parsed.title.endsWith("…"))
    }

    @Test
    fun anEntryWithoutAnIssueOrDocumentCollapsesAlone() {
        val parsed = assertIs<PushPayload.Entry>(PushPayload.parse(plaintext(vector("entry-device-added"))))
        assertEquals("entry:${parsed.id}", parsed.collapse)
        assertNull(parsed.issueIdentifier)
        assertEquals(PushChannel.ACCOUNT, PushChannel.forKind(parsed.kind))
    }

    @Test
    fun bytesThatAreNotAPayloadAreNull() {
        assertNull(PushPayload.parse(plaintext(vector("rfc8291-appendix-a"))))
        assertNull(PushPayload.parse(plaintext(vector("largest-body"))))
        assertNull(PushPayload.parse(ByteArray(0)))
        assertNull(parse("[1, 2]"))
        assertNull(parse("""{"type": "entry", "id": "e1", "kind": "mention"}"""), "no version")
        assertNull(parse("""{"v": "1", "type": "entry", "id": "e1", "kind": "mention"}"""), "a string version")
        assertNull(parse("""{"v": 1, "id": "e1"}"""), "no type")
        assertNull(PushPayload.parse(byteArrayOf(0x7b, 0xff.toByte(), 0x7d)), "not UTF-8")
        assertNull(PushPayload.parse(ByteArray(PushPayload.MAX_BYTES + 1) { ' '.code.toByte() }))
    }

    @Test
    fun aNewerVersionOrTypeIsUnknownNotAnError() {
        assertEquals(PushPayload.Unknown, parse("""{"v": 2, "type": "entry", "id": "e1"}"""))
        assertEquals(PushPayload.Unknown, parse("""{"v": 1, "type": "digest", "id": "e1"}"""))
    }

    @Test
    fun fieldsThatEndUpInNotificationTagsAreChecked() {
        assertNull(parse("""{"v": 1, "type": "entry", "id": "e1/../x", "kind": "mention"}"""), "an id with a slash")
        assertNull(parse("""{"v": 1, "type": "entry", "id": "e1", "kind": "Mention!"}"""), "a malformed kind")
        assertNull(parse("""{"v": 1, "type": "resolved", "id": ""}"""), "an empty id")
        val entry = assertIs<PushPayload.Entry>(
            parse(
                """{"v": 1, "type": "entry", "id": "e1", "kind": "mention", "collapse": "team:t1", "issue": "x y"}""",
            ),
        )
        assertEquals("entry:e1", entry.collapse, "a collapse key the server does not make falls back to the entry")
        assertNull(entry.issueIdentifier)
        val resolved = assertIs<PushPayload.Resolved>(parse("""{"v": 1, "type": "resolved", "id": "e1"}"""))
        assertEquals("entry:e1", resolved.collapse)
    }

    @Test
    fun aMissingTitleIsEmptyAndALongOneIsClippedOnCodePoints() {
        val untitled = assertIs<PushPayload.Entry>(
            parse("""{"v": 1, "type": "entry", "id": "e1", "kind": "mention"}"""),
        )
        assertEquals("", untitled.title)
        val emoji = "😀" // one code point, two UTF-16 units
        val long = assertIs<PushPayload.Entry>(
            parse("""{"v": 1, "type": "entry", "id": "e1", "kind": "mention", "title": "${emoji.repeat(250)}"}"""),
        )
        assertEquals(emoji.repeat(200), long.title)
    }
}
