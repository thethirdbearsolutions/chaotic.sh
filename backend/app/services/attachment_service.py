"""Files attached to issues (CHT-1996).

Agents need to attach screenshots as acceptance evidence, and reviewers
need to see them. A file is uploaded as the raw request body, checked by
its bytes and stored once per content in the blob store; a row in
``attachments`` (``OxydeAttachment``) ties it to an issue and, when it
came with one, a comment.

What is stored:

* **Types, by signature.** PNG, JPEG, GIF, WebP, PDF and UTF-8 plain
  text. The type comes from the bytes alone, never from the filename or
  the ``Content-Type`` the client sent. SVG, HTML and anything else are
  refused (415): an SVG or HTML file served from this origin could run
  script, and nothing here needs them.
* **Size.** At most ``attachment_max_bytes`` (10 MiB) per file, counted
  while the body streams in, so a larger one is refused (413) without
  being held whole. One project's files may total at most
  ``attachment_project_quota_bytes`` (1 GiB, counted per row, so the
  same file attached twice counts twice); past it, 409.
* **Names.** ``filename`` is display text. Its path components and
  control characters are dropped and it is cut to ``MAX_FILENAME``
  characters; the blob's own name on disk is its sha256.

The blob store (``BlobStore``) keeps ``<root>/<sha256[:2]>/<sha256>``. A
write goes to a temporary file in ``<root>/tmp`` and is moved into place
with ``os.replace``, so a reader never sees half a file and identical
bytes land on one blob. Deleting a row leaves its blob: other rows may
name it, and a database restored from a backup may still need it.

The sweep (``AttachmentService.sweep_orphans``, run at startup and every
``attachment_sweep_interval_seconds`` by ``run_sweeper``) deletes a blob
once no row names it and it has not been written or reused for
``ORPHAN_GRACE_SECONDS`` (30 days), so a database restored from a recent
backup still finds its files. It also deletes ``tmp/*.part`` files a
killed upload left behind, once they are a day old. The last check of
each blob, its references and then its age, is made holding the
database's writer lock, which an upload also holds from its quota check
until its row commits: a blob an upload is reusing is either dated anew
first (and kept) or deleted first (and the upload stores its own copy).
"""
from __future__ import annotations

import asyncio
import codecs
import hashlib
import logging
import os
import re
import stat
import time
import unicodedata
import uuid
from collections.abc import AsyncIterator
from dataclasses import dataclass, field
from pathlib import Path

from oxyde import execute_raw

from app.config import get_settings
from app.db.transactions import atomic
from app.oxyde_models.attachment import OxydeAttachment

logger = logging.getLogger(__name__)

MAX_FILENAME = 255
DEFAULT_FILENAME = "attachment"
# Enough to recognise every allowed type, and to tell markup from text.
_SNIFF_BYTES = 512
# Enough to tell every binary type apart (WebP's marker ends at byte 12).
_SIGNATURE_BYTES = 16
# What one write, hash and decode step handles: a body that arrives in
# one piece (a keyed upload's, read whole by the idempotency layer) is
# still worked through in pieces.
_PIECE = 64 * 1024
_SHA256 = re.compile(r"[0-9a-f]{64}")
_SHARD = re.compile(r"[0-9a-f]{2}")

# How long a blob no row names is kept (design question 3, answer B): a
# database restored from a backup up to this old still finds its files.
ORPHAN_GRACE_SECONDS = 30 * 24 * 3600
# A temporary upload file older than this belongs to no upload still
# running (one is at most attachment_max_bytes, read in one request).
STALE_PART_SECONDS = 24 * 3600
# Blobs checked against the table per query, and per writer-lock hold.
_SWEEP_BATCH = 200

RASTER_IMAGE_TYPES = frozenset({"image/png", "image/jpeg", "image/gif", "image/webp"})
TEXT_TYPE = "text/plain"
PDF_TYPE = "application/pdf"
# What a text file may not start with: markup a browser would render.
_MARKUP_STARTS = (b"<!doctype", b"<html", b"<svg", b"<?xml", b"<script", b"<head", b"<body", b"<iframe")


def attachment_url(attachment_id: str) -> str:
    return f"/api/attachments/{attachment_id}/content"


class AttachmentRefused(ValueError):
    """Not a file this server stores; ``error_code`` says why and
    ``status_code`` is the answer's status."""

    def __init__(self, status_code: int, error_code: str, message: str):
        super().__init__(message)
        self.status_code = status_code
        self.error_code = error_code


def too_large(max_bytes: int) -> AttachmentRefused:
    return AttachmentRefused(413, "attachment_too_large", f"A file may be at most {_size(max_bytes)}.")


def _size(n: int) -> str:
    if n >= 1024 * 1024 and n % (1024 * 1024) == 0:
        return f"{n // (1024 * 1024)} MiB"
    if n >= 1024 and n % 1024 == 0:
        return f"{n // 1024} KiB"
    return f"{n} bytes"


def sniff_binary_type(head: bytes) -> str | None:
    """The content type ``head`` (a file's first bytes) is by its
    signature, among the binary types stored; None for anything else."""
    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if head.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if head[:6] in (b"GIF87a", b"GIF89a"):
        return "image/gif"
    if head[:4] == b"RIFF" and head[8:12] == b"WEBP":
        return "image/webp"
    if head.startswith(b"%PDF-"):
        return PDF_TYPE
    return None


def looks_like_markup(head: bytes) -> bool:
    """Whether a would-be text file starts like HTML, SVG or XML."""
    start = head.removeprefix(codecs.BOM_UTF8).lstrip().lower()
    return start.startswith(_MARKUP_STARTS)


def clean_filename(name: str | None) -> str:
    """``name`` as display text: its last path component, without
    control or format characters, trimmed, and at most MAX_FILENAME
    characters. Empty becomes DEFAULT_FILENAME."""
    name = (name or "").replace("\\", "/").rsplit("/", 1)[-1]
    name = "".join(ch for ch in name if unicodedata.category(ch)[0] != "C")
    name = name.strip().lstrip(".").strip()
    if len(name) > MAX_FILENAME:
        stem, dot, ext = name.rpartition(".")
        if dot and 0 < len(ext) <= 16:
            name = stem[: MAX_FILENAME - len(ext) - 1] + "." + ext
        else:
            name = name[:MAX_FILENAME]
    return name or DEFAULT_FILENAME


@dataclass
class StagedBlob:
    """An upload written to a temporary file, checked, and not yet in
    the store."""

    temp_path: Path
    sha256: str
    size: int
    content_type: str


class BlobStore:
    """Content-addressed files under one directory (module docstring)."""

    def __init__(self, root: Path | None = None):
        self.root = Path(root) if root is not None else default_root()

    def path_for(self, sha256: str) -> Path:
        if not _SHA256.fullmatch(sha256):
            raise ValueError("not a sha256")
        return self.root / sha256[:2] / sha256

    def exists(self, sha256: str) -> bool:
        return self.path_for(sha256).is_file()

    async def stage(self, chunks: AsyncIterator[bytes], max_bytes: int) -> StagedBlob:
        """Write ``chunks`` to a temporary file, hashing and counting as
        they come, and check what they are. Raises AttachmentRefused
        (and leaves nothing behind) for an empty, oversized or
        disallowed file."""
        tmp_dir = self.root / "tmp"
        tmp_dir.mkdir(parents=True, exist_ok=True)
        temp_path = tmp_dir / f"{uuid.uuid4().hex}.part"
        digest = hashlib.sha256()
        size = 0
        head = b""
        # The binary type, once enough of the head is in to tell; until
        # then (and for good once it is not one) the text check runs.
        binary: str | None = None
        decided = False
        text = _TextCheck()
        try:
            with open(temp_path, "wb") as out:
                async for chunk in chunks:
                    view = memoryview(chunk)
                    for start in range(0, len(view), _PIECE):
                        piece = view[start:start + _PIECE]
                        size += len(piece)
                        if size > max_bytes:
                            raise too_large(max_bytes)
                        if len(head) < _SNIFF_BYTES:
                            head += bytes(piece[: _SNIFF_BYTES - len(head)])
                        if not decided and len(head) >= _SIGNATURE_BYTES:
                            binary, decided = sniff_binary_type(head), True
                        digest.update(piece)
                        if binary is None:
                            text.feed(bytes(piece))
                        out.write(piece)
            if size == 0:
                raise AttachmentRefused(422, "attachment_empty", "The file is empty.")
            content_type = binary if decided else sniff_binary_type(head)
            if content_type is None:
                if not text.finish() or looks_like_markup(head):
                    raise AttachmentRefused(
                        415, "attachment_type_not_allowed",
                        "A file must be a PNG, JPEG, GIF or WebP image, a PDF, or UTF-8 plain text.",
                    )
                content_type = TEXT_TYPE
        except BaseException:
            temp_path.unlink(missing_ok=True)
            raise
        return StagedBlob(temp_path, digest.hexdigest(), size, content_type)

    def commit(self, staged: StagedBlob) -> Path:
        """Move a staged file into the store under its sha256. A blob
        already there has the same bytes, so the staged copy is dropped."""
        final = self.path_for(staged.sha256)
        try:
            # Re-dated, so a sweep's age gate sees a blob in use again,
            # not the orphan it may have been until now. Before the staged
            # copy goes: a blob swept meanwhile is replaced by this one.
            os.utime(final)
        except FileNotFoundError:
            pass
        else:
            staged.temp_path.unlink(missing_ok=True)
            return final
        final.parent.mkdir(parents=True, exist_ok=True)
        os.replace(staged.temp_path, final)
        return final

    @staticmethod
    def discard(staged: StagedBlob) -> None:
        staged.temp_path.unlink(missing_ok=True)

    def blobs_older_than(self, cutoff: float) -> list[tuple[str, Path]]:
        """``(sha256, path)`` of every blob last written before ``cutoff``
        (a ``time.time()``). Anything in the store not named like a blob
        is left alone."""
        found = []
        try:
            shards = [d for d in self.root.iterdir() if _SHARD.fullmatch(d.name) and d.is_dir()]
        except FileNotFoundError:
            return found
        for shard in shards:
            try:
                entries = list(shard.iterdir())
            except FileNotFoundError:
                continue
            for path in entries:
                name = path.name
                if not (_SHA256.fullmatch(name) and name[:2] == shard.name):
                    continue
                mtime = _mtime(path)
                if mtime is not None and mtime < cutoff:
                    found.append((name, path))
        return found

    def delete_stale_parts(self, cutoff: float) -> int:
        """Delete the ``tmp/*.part`` files last written before ``cutoff``;
        how many were."""
        deleted = 0
        try:
            parts = list((self.root / "tmp").glob("*.part"))
        except FileNotFoundError:  # pragma: no cover -- glob of a missing directory is empty
            return 0
        for path in parts:
            mtime = _mtime(path)
            if mtime is not None and mtime < cutoff:
                try:
                    path.unlink()
                except FileNotFoundError:
                    continue
                deleted += 1
        return deleted


def _mtime(path: Path) -> float | None:
    """When ``path`` was last written; None when it is gone, or is not a
    regular file."""
    try:
        st = path.lstat()
    except FileNotFoundError:
        return None
    if not stat.S_ISREG(st.st_mode):
        return None
    return st.st_mtime


@dataclass
class SweepResult:
    """What one sweep deleted."""

    blobs_deleted: int = 0
    bytes_freed: int = 0
    parts_deleted: int = 0
    deleted: list[str] = field(default_factory=list)


class _TextCheck:
    """Whether a stream of bytes is UTF-8 text with no NUL byte."""

    def __init__(self):
        self._decoder = codecs.getincrementaldecoder("utf-8")("strict")
        self.ok = True

    def feed(self, chunk: bytes) -> None:
        if not self.ok:
            return
        if b"\x00" in chunk:
            self.ok = False
            return
        try:
            self._decoder.decode(chunk)
        except UnicodeDecodeError:
            self.ok = False

    def finish(self) -> bool:
        if self.ok:
            try:
                self._decoder.decode(b"", final=True)
            except UnicodeDecodeError:
                self.ok = False
        return self.ok


def default_root() -> Path:
    """``attachments_dir`` if set, else ``attachments/`` beside the
    SQLite database (the data directory ``chaotic system install``
    keeps it in)."""
    settings = get_settings()
    if settings.attachments_dir:
        return Path(settings.attachments_dir).expanduser().resolve()
    path = sqlite_path(settings.database_url)
    if path is None:  # pragma: no cover -- Settings refuses all but an in-memory SQLite URL
        raise RuntimeError("CHAOTIC_ATTACHMENTS_DIR must be set when the database is not SQLite")
    return Path(path).parent / "attachments"


def sqlite_path(url: str) -> str | None:
    """The database file a SQLite URL names, absolute; None otherwise."""
    for prefix in ("sqlite+aiosqlite:///", "sqlite:///"):
        if url.startswith(prefix):
            return os.path.abspath(url[len(prefix):])
    return None


class AttachmentService:
    def __init__(self, store: BlobStore | None = None):
        self.store = store or BlobStore()

    @staticmethod
    async def project_usage(project_id: str) -> int:
        """Bytes the project's attachments take, counted per row."""
        rows = await execute_raw(
            "SELECT COALESCE(SUM(a.size), 0) AS used FROM attachments a "
            "JOIN issues i ON i.id = a.issue_id WHERE i.project_id = ?",
            [project_id],
        )
        return int(rows[0]["used"]) if rows else 0

    async def check_quota(self, project_id: str, adding: int = 0) -> None:
        quota = get_settings().attachment_project_quota_bytes
        used = await self.project_usage(project_id)
        if used + adding > quota or (adding == 0 and used >= quota):
            # 409, not 413: it says how the project stands now, not what
            # the file is, so an Idempotency-Key does not store it and a
            # resend after a deletion goes through.
            raise AttachmentRefused(
                409, "attachment_quota_exceeded",
                f"This project's attachments would exceed its {_size(quota)} quota "
                f"({_size(used)} used). Delete some attachments first.",
            )

    async def upload(
        self, *, issue, project_id: str, uploader_id: str, chunks: AsyncIterator[bytes],
        filename: str | None, comment_id: str | None,
    ) -> OxydeAttachment:
        """Store ``chunks`` as a file attached to ``issue``. The caller
        has checked the issue (and comment) are the uploader's to see."""
        settings = get_settings()
        # Refuse a project already at its quota before reading the body.
        await self.check_quota(project_id)
        staged = await self.store.stage(chunks, settings.attachment_max_bytes)
        try:
            async with atomic():
                # The writer lock first, so the quota read and the insert
                # are one step: two uploads at once cannot both fit.
                await execute_raw("UPDATE attachments SET size = size WHERE 0", [])
                await self.check_quota(project_id, staged.size)
                # Into place before the row: a row whose blob failed to
                # land would answer 410, a blob whose row rolled back is
                # only an orphan for the sweep.
                self.store.commit(staged)
                attachment = await OxydeAttachment.objects.create(
                    issue_id=issue.id, comment_id=comment_id, uploader_id=uploader_id,
                    sha256=staged.sha256, size=staged.size, content_type=staged.content_type,
                    filename=clean_filename(filename),
                )
        finally:
            self.store.discard(staged)
        return attachment

    @staticmethod
    async def list_for_issue(issue_id: str) -> list[OxydeAttachment]:
        return await OxydeAttachment.objects.filter(issue_id=issue_id).order_by("created_at", "id").all()

    @staticmethod
    async def get(attachment_id: str) -> OxydeAttachment | None:
        return await OxydeAttachment.objects.filter(id=attachment_id).first()

    @staticmethod
    async def delete(attachment: OxydeAttachment) -> None:
        """Delete the row. The blob stays for the sweep (module docstring)."""
        await OxydeAttachment.objects.filter(id=attachment.id).delete()

    @staticmethod
    async def _referenced(shas: list[str]) -> set[str]:
        """Those of ``shas`` some attachment row names."""
        if not shas:
            return set()
        marks = ",".join("?" for _ in shas)
        rows = await execute_raw(f"SELECT DISTINCT sha256 FROM attachments WHERE sha256 IN ({marks})", list(shas))
        return {row["sha256"] for row in rows}

    async def sweep_orphans(self, *, now: float | None = None) -> SweepResult:
        """Delete stale ``tmp/*.part`` files, and the blobs no row names
        that are older than ORPHAN_GRACE_SECONDS (module docstring)."""
        now = time.time() if now is None else now
        cutoff = now - ORPHAN_GRACE_SECONDS
        result = SweepResult()
        result.parts_deleted = await asyncio.to_thread(self.store.delete_stale_parts, now - STALE_PART_SECONDS)
        candidates = await asyncio.to_thread(self.store.blobs_older_than, cutoff)
        for start in range(0, len(candidates), _SWEEP_BATCH):
            batch = candidates[start:start + _SWEEP_BATCH]
            # Without the lock first, so a store whose old blobs are all
            # in use never waits for it.
            named = await self._referenced([sha for sha, _ in batch])
            orphans = [(sha, path) for sha, path in batch if sha not in named]
            if not orphans:
                continue
            async with atomic():
                # The writer lock, as an upload takes it: no row can be
                # added for these blobs, nor any of them re-dated by an
                # upload's commit, until this transaction ends.
                await execute_raw("UPDATE attachments SET size = size WHERE 0", [])
                named = await self._referenced([sha for sha, _ in orphans])
                for sha, path in orphans:
                    if sha in named:
                        continue
                    # Read after the reference check: a reuse that landed
                    # before the lock re-dated the blob.
                    try:
                        st = path.lstat()
                    except FileNotFoundError:
                        continue
                    if not stat.S_ISREG(st.st_mode) or st.st_mtime >= cutoff:
                        continue
                    try:
                        path.unlink()
                    except FileNotFoundError:
                        continue
                    result.blobs_deleted += 1
                    result.bytes_freed += st.st_size
                    result.deleted.append(sha)
        return result


async def run_sweeper(interval: float | None = None) -> None:
    """Sweep now, then every ``interval`` seconds
    (``attachment_sweep_interval_seconds``; 0 sweeps once). A failed
    sweep is logged and tried again at the next interval. Runs until
    cancelled (the app's lifespan does, at shutdown)."""
    if interval is None:
        interval = get_settings().attachment_sweep_interval_seconds
    while True:
        try:
            result = await AttachmentService().sweep_orphans()
            if result.blobs_deleted or result.parts_deleted:
                logger.info(
                    "attachment sweep: deleted %d orphaned blob(s) (%d bytes) and %d stale upload file(s)",
                    result.blobs_deleted, result.bytes_freed, result.parts_deleted,
                )
        except asyncio.CancelledError:
            raise
        except Exception:
            logger.exception("attachment sweep failed")
        if interval <= 0:
            return
        await asyncio.sleep(interval)
