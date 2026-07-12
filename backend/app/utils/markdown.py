"""Markdown text helpers shared across services.

`strip_code_spans` removes fenced and inline code from markdown so that
regexes hunting for *referential* tokens (\\@mentions, CHT-123 issue
identifiers) don't match example code the author never meant as a real
reference. Extracted from inbox_service so the mention path (CHT-1272)
and the cross-reference path (CHT-801) share ONE hardened copy of these
security-sensitive regexes rather than drifting apart.
"""
import re

# Fenced spans: 3+ backticks, closed by the same count OR end-of-string
# (an unclosed fence at EOF still swallows the rest). DOTALL so fences span
# lines. The backreference \1 requires the same run length to close.
_CODE_FENCE_RE = re.compile(r"(`{3,}).*?(?:\1|\Z)", re.DOTALL)
# Inline spans: 1-2 backticks, closed by the same count; DOTALL so a span may
# cross a soft line break. An UNCLOSED run is left as-is (CommonMark treats it
# as literal text, so a token after it should still be seen). (CHT-1272 review:
# multi-line and double-backtick inline spans.)
_INLINE_CODE_RE = re.compile(r"(`{1,2}).*?\1", re.DOTALL)


def strip_code_spans(text: str) -> str:
    """Return `text` with fenced and inline code spans replaced by a space.

    A *space* (not empty) so tokens on either side of a stripped span can't
    weld into a spurious one: e.g. ``CHT-12`x`3`` must not collapse to the
    unrelated identifier ``CHT-123``. The word boundary / whitespace then
    keeps each side's tokens intact for downstream regexes (CHT-801 review).
    """
    return _INLINE_CODE_RE.sub(" ", _CODE_FENCE_RE.sub(" ", text))
