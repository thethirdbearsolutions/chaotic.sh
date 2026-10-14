package sh.chaotic.sync.push

import kotlinx.serialization.SerializationException
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.intOrNull
import sh.chaotic.api.client.ChaoticApi

/**
 * A decrypted push message from the server's Web Push sender
 * (backend/app/services/push_sender.py, CHT-1605). Two kinds, both JSON
 * with `"v": 1`:
 *
 * - `entry`: a new inbox entry: its id, kind, issue identifier, title
 *   (at most 200 characters), ritual id and collapse key;
 * - `resolved`: the entry was settled elsewhere, so its notification is
 *   withdrawn.
 *
 * [Unknown] is a well-formed message this app cannot read (a newer
 * version or type): it shows nothing and only syncs. [parse] returns
 * null for bytes that are not such a message at all.
 */
sealed interface PushPayload {
    data class Entry(
        val id: String,
        val kind: String,
        /** The issue's identifier (`CHT-12`), when the entry is about an issue. */
        val issueIdentifier: String?,
        val title: String,
        val ritualId: String?,
        /** What notifications are grouped by: `issue:<id>`, `document:<id>` or `entry:<id>`. */
        val collapse: String,
    ) : PushPayload

    data class Resolved(val id: String, val collapse: String) : PushPayload

    data object Unknown : PushPayload

    companion object {
        /** The only payload version this app reads. */
        const val VERSION = 1

        /** RFC 8291 bounds a whole message body at 4096 bytes; a plaintext is smaller. */
        const val MAX_BYTES = 4096

        /** The server truncates titles to 200 characters (code points, its ellipsis included). */
        const val MAX_TITLE_CHARS = 200

        private val ID = Regex("^[A-Za-z0-9._-]{1,128}$")
        private val KIND = Regex("^[a-z0-9_]{1,64}$")
        private val IDENTIFIER = Regex("^[A-Za-z0-9_-]{1,32}$")
        private val COLLAPSE = Regex("^(issue|document|entry):[A-Za-z0-9._-]{1,128}$")

        /** The collapse key of an entry not about an issue or a document: the entry alone. */
        fun entryCollapse(id: String) = "entry:$id"

        /**
         * Reads [bytes] as a payload, or null when they are not one: too
         * long, not JSON, or missing what a v1 message must carry. Fields
         * are checked against what the server sends, since an id and a
         * collapse key end up in notification tags.
         */
        @Suppress("ReturnCount") // each way a message can be unreadable is an early return
        fun parse(bytes: ByteArray): PushPayload? {
            val root = json(bytes) ?: return null
            val version = (root["v"] as? JsonPrimitive)?.takeUnless { it.isString }?.intOrNull ?: return null
            if (version != VERSION) return Unknown
            val id = root.string("id")?.takeIf { ID.matches(it) }
            return when (root.string("type")) {
                "entry" -> id?.let { entry(root, it) }
                "resolved" -> id?.let { Resolved(it, root.collapse(it)) }
                null -> null
                else -> Unknown
            }
        }

        private fun json(bytes: ByteArray): JsonObject? {
            if (bytes.isEmpty() || bytes.size > MAX_BYTES) return null
            return try {
                ChaoticApi.json.parseToJsonElement(bytes.decodeToString(throwOnInvalidSequence = true)) as? JsonObject
            } catch (_: SerializationException) {
                null
            } catch (_: CharacterCodingException) {
                null
            }
        }

        private fun entry(root: JsonObject, id: String): Entry? {
            val kind = root.string("kind")?.takeIf { KIND.matches(it) } ?: return null
            return Entry(
                id = id,
                kind = kind,
                issueIdentifier = root.string("issue")?.takeIf { IDENTIFIER.matches(it) },
                title = clip(root.string("title").orEmpty(), MAX_TITLE_CHARS),
                ritualId = root.string("ritual_id")?.takeIf { ID.matches(it) },
                collapse = root.collapse(id),
            )
        }

        private fun JsonObject.string(name: String): String? =
            (get(name) as? JsonPrimitive)?.takeIf { it.isString }?.content

        /** The message's collapse key, or the entry's own when it is missing or not one the server makes. */
        private fun JsonObject.collapse(id: String): String =
            string("collapse")?.takeIf { COLLAPSE.matches(it) } ?: entryCollapse(id)

        /** At most [max] code points of [text], never splitting a surrogate pair. */
        internal fun clip(text: String, max: Int): String {
            if (text.codePointCount(0, text.length) <= max) return text
            return text.substring(0, text.offsetByCodePoints(0, max))
        }
    }
}
