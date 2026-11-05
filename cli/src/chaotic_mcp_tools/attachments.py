"""Files attached to issues (CHT-1996): what the CLI and both MCP servers
share about them.

A comment shows a file by linking to it in markdown, so the web view's
comment renderer needs nothing new: a raster image as ``![name](url)``,
which it shows inline, anything else as ``[name](url)``. ``url`` is the
server-relative ``/api/attachments/<id>/content`` the upload answered
with; it serves the bytes only with a credential.
"""
from __future__ import annotations

import base64
import binascii
import os
import re
import stat
from pathlib import Path

from .errors import ToolInputError

# The types the server shows inline (app.services.attachment_service).
RASTER_IMAGE_TYPES = frozenset({"image/png", "image/jpeg", "image/gif", "image/webp"})

# The largest local file read to upload. The server's own limit is lower
# (10 MiB unless configured) and refuses a larger file from its
# Content-Length before reading it; this only keeps the CLI and the
# stdio MCP server from reading a huge file into memory to send it.
MAX_LOCAL_FILE_BYTES = 64 * 1024 * 1024

# The error_code of a write that went out and got no answer (the CLI
# client's WriteOutcomeUnknown, CHT-1957): it may have been done.
OUTCOME_UNKNOWN = "write_outcome_unknown"

# What could end or restyle a markdown link's text.
_LINK_TEXT_SPECIAL = re.compile(r"([\\\[\]*_`<>])")


def attachment_markdown(attachment: dict) -> str:
    """The markdown that shows ``attachment`` (an upload's answer) in a
    comment."""
    name = _LINK_TEXT_SPECIAL.sub(r"\\\1", attachment.get("filename") or "attachment")
    bang = "!" if attachment.get("content_type") in RASTER_IMAGE_TYPES else ""
    return f"{bang}[{name}]({attachment['url']})"


def with_attachment_lines(content: str, attachments: list[dict]) -> str:
    """``content`` followed by one line per attachment, after a blank line."""
    if not attachments:
        return content
    lines = "\n".join(attachment_markdown(a) for a in attachments)
    return f"{content.rstrip()}\n\n{lines}" if content.strip() else lines


def decode_base64(value: str, what: str = "content_base64") -> bytes:
    """Standard base64 (padding optional, whitespace ignored) -> bytes;
    anything else is the caller's to fix."""
    compact = "".join(value.split())
    compact += "=" * (-len(compact) % 4)
    try:
        return base64.b64decode(compact, validate=True)
    except (binascii.Error, ValueError) as e:
        raise ToolInputError(f"{what} is not valid base64: {e}.") from e


def removal_note(removed: list[str], left: list[dict]) -> str:
    """What became of the files a failed attach-and-comment had already
    uploaded: removed again, or left on the issue (by id) when removing
    them failed too."""
    parts = []
    if removed:
        parts.append(f"the {len(removed)} file(s) already uploaded were removed again")
    if left:
        named = ", ".join(f"{a.get('filename')} ({a.get('id')})" for a in left)
        parts.append(f"these uploaded file(s) could not be removed and are still on the issue: {named}")
    return "; ".join(parts)


def binary_type(head: bytes) -> str | None:
    """The content type a file's first bytes are by signature, among the
    binary types the server stores (its ``sniff_binary_type``); None for
    anything else, plain text included."""
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if head.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "image/webp"
    if head.startswith(b"%PDF-"):
        return "application/pdf"
    return None


def _too_big(path: str) -> ToolInputError:
    return ToolInputError(
        f"{path} is larger than {MAX_LOCAL_FILE_BYTES // (1024 * 1024)} MiB; the server takes "
        "files of at most 10 MiB unless configured otherwise."
    )


def check_local_file(path: str) -> None:
    """What read_local_file would refuse ``path`` for, found without
    reading it: so a command given several files can refuse a bad one
    before it sends any, and still read them one at a time."""
    try:
        st = Path(path).expanduser().stat()
    except FileNotFoundError:
        raise ToolInputError(f"No such file: {path}") from None
    except OSError as e:
        raise ToolInputError(f"Cannot read {path}: {e.strerror or e}") from None
    if not stat.S_ISREG(st.st_mode):
        raise ToolInputError(f"Not a regular file: {path}")
    if st.st_size > MAX_LOCAL_FILE_BYTES:
        raise _too_big(path)


_OPEN_FLAGS = os.O_RDONLY | getattr(os, "O_BINARY", 0) | getattr(os, "O_NONBLOCK", 0)


def read_local_file(path: str, *, follow_links: bool = True) -> tuple[bytes, str]:
    """The bytes of the regular file at ``path`` (``~`` expanded), and its
    name. ToolInputError says why one cannot be read.

    The file is opened first and then checked through the open handle,
    so what is checked is what is read. Without ``follow_links`` the path
    must name the file itself: a symbolic link as its last component is
    refused (``O_NOFOLLOW``), where the platform has it."""
    target = Path(path).expanduser()
    flags = _OPEN_FLAGS | (0 if follow_links else getattr(os, "O_NOFOLLOW", 0))
    try:
        fd = os.open(target, flags)
    except FileNotFoundError:
        raise ToolInputError(f"No such file: {path}") from None
    except OSError as e:
        raise ToolInputError(f"Cannot read {path}: {e.strerror or e}") from None
    try:
        st = os.fstat(fd)
        if not stat.S_ISREG(st.st_mode):
            raise ToolInputError(f"Not a regular file: {path}")
    except BaseException:
        os.close(fd)
        raise
    with os.fdopen(fd, "rb") as f:
        too_big = _too_big(path)
        if st.st_size > MAX_LOCAL_FILE_BYTES:
            raise too_big
        try:
            data = f.read(MAX_LOCAL_FILE_BYTES + 1)
        except OSError as e:
            raise ToolInputError(f"Cannot read {path}: {e.strerror or e}") from None
    if len(data) > MAX_LOCAL_FILE_BYTES:
        raise too_big
    return data, target.name
