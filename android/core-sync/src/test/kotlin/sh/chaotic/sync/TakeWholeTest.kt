package sh.chaotic.sync

import kotlin.test.Test
import kotlin.test.assertEquals

class TakeWholeTest {
    @Test
    fun aShortStringIsKept() {
        assertEquals("abc", "abc".takeWhole(5))
    }

    @Test
    fun aPlainCutTakesExactlyTheLimit() {
        assertEquals("ab", "abcd".takeWhole(2))
    }

    @Test
    fun aCutThroughAnEmojiDropsItsHalf() {
        val text = "a😀b"
        assertEquals("a", text.takeWhole(2))
        assertEquals("a😀", text.takeWhole(3))
    }

    @Test
    fun anEmojiThatFitsExactlyIsKept() {
        assertEquals("😀", "😀".takeWhole(2))
    }
}
