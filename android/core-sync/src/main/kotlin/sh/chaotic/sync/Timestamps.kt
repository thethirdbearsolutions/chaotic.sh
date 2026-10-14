package sh.chaotic.sync

import java.time.Instant
import java.time.LocalDateTime
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeParseException
import java.util.concurrent.TimeUnit

/**
 * The server's timestamps are ISO 8601 in UTC (`DateTimeUTC`), usually with
 * an offset and microseconds. A value without an offset is read as UTC, the
 * same assumption the server makes; one that cannot be read at all is 0, so
 * a malformed row sorts first instead of failing the whole sync.
 */
object Timestamps {
    private const val NANOS_PER_MICRO = 1_000L

    fun instant(value: String?): Instant? {
        if (value.isNullOrBlank()) return null
        return try {
            OffsetDateTime.parse(value).toInstant()
        } catch (_: DateTimeParseException) {
            try {
                LocalDateTime.parse(value).toInstant(ZoneOffset.UTC)
            } catch (_: DateTimeParseException) {
                null
            }
        }
    }

    fun millis(value: String?): Long = instant(value)?.toEpochMilli() ?: 0L

    fun micros(value: String?): Long = instant(value)?.let {
        TimeUnit.SECONDS.toMicros(it.epochSecond) + it.nano / NANOS_PER_MICRO
    } ?: 0L
}
