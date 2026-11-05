"""Files attached to issues (CHT-1996).

Out-of-scope callers are probed in test_out_of_scope_is_not_found.py
(ROUTES); this module covers what is stored, how it is served, and who
may delete it.
"""
import base64
import hashlib
import os
from urllib.parse import quote

import pytest
import pytest_asyncio

from app.config import get_settings
from app.enums import TeamRole
from app.oxyde_models.attachment import OxydeAttachment
from app.oxyde_models.idempotency import OxydeIdempotencyRecord
from app.oxyde_models.issue import OxydeIssueComment
from app.oxyde_models.team import OxydeTeamMember
from app.schemas.agent import AgentCreate
from app.services.agent_service import AgentService
from app.services.attachment_service import (
    ORPHAN_GRACE_SECONDS,
    STALE_PART_SECONDS,
    AttachmentService,
    BlobStore,
    clean_filename,
)

pytestmark = pytest.mark.asyncio

PNG = b"\x89PNG\r\n\x1a\n" + b"\x00" * 64
JPEG = b"\xff\xd8\xff\xe0" + b"\x00" * 64
GIF = b"GIF89a" + b"\x00" * 64
WEBP = b"RIFF\x00\x00\x00\x00WEBPVP8 " + b"\x00" * 64
PDF = b"%PDF-1.7\n" + b"\x00" * 64
TEXT = "Fixed. Test log: all green \u2713\n".encode()


async def _upload(client, headers, issue_id, data, filename="shot.png", content_type="application/octet-stream",
                  **params):
    query = {"filename": filename, **params} if filename is not None else params
    return await client.post(
        f"/api/issues/{issue_id}/attachments", params=query, content=data,
        headers={**headers, "Content-Type": content_type},
    )


@pytest.fixture
def settings_env(monkeypatch):
    """Set attachment settings for one test."""
    def _set(**values):
        for name, value in values.items():
            monkeypatch.setenv(name, str(value))
        get_settings.cache_clear()
    yield _set
    monkeypatch.undo()
    get_settings.cache_clear()


@pytest_asyncio.fixture
async def member_headers(test_team, test_user2, auth_headers2):
    """test_user2, a plain member of test_team."""
    await OxydeTeamMember.objects.create(team_id=test_team.id, user_id=test_user2.id, role=TeamRole.MEMBER)
    return auth_headers2


def _blobs():
    root = BlobStore().root
    return sorted(p for p in root.rglob("*") if p.is_file() and p.parent.name != "tmp")


def _temp_files():
    tmp = BlobStore().root / "tmp"
    return sorted(tmp.iterdir()) if tmp.exists() else []


class TestUpload:
    @pytest.mark.parametrize("data,kind", [
        (PNG, "image/png"), (JPEG, "image/jpeg"), (GIF, "image/gif"), (WEBP, "image/webp"),
        (PDF, "application/pdf"), (TEXT, "text/plain"),
    ], ids=["png", "jpeg", "gif", "webp", "pdf", "text"])
    async def test_each_allowed_type_is_stored_and_listed(self, client, auth_headers, test_issue, test_user, data, kind):
        uploaded = await _upload(client, auth_headers, test_issue.id, data, filename="evidence")

        assert uploaded.status_code == 201, uploaded.text
        body = uploaded.json()
        digest = hashlib.sha256(data).hexdigest()
        assert body["content_type"] == kind
        assert body["sha256"] == digest
        assert body["size"] == len(data)
        assert body["issue_id"] == test_issue.id
        assert body["comment_id"] is None
        assert body["uploader_id"] == test_user.id
        assert body["uploader_name"] == test_user.name
        assert body["filename"] == "evidence"
        assert body["url"] == f"/api/attachments/{body['id']}/content"
        assert BlobStore().path_for(digest).read_bytes() == data
        assert _temp_files() == []

        listed = await client.get(f"/api/issues/{test_issue.id}/attachments", headers=auth_headers)
        assert listed.status_code == 200
        assert [a["id"] for a in listed.json()] == [body["id"]]

    async def test_the_type_comes_from_the_bytes_not_the_client(self, client, auth_headers, test_issue):
        png = await _upload(client, auth_headers, test_issue.id, PNG, filename="note.txt", content_type="text/html")
        assert png.status_code == 201
        assert png.json()["content_type"] == "image/png"

        html = await _upload(client, auth_headers, test_issue.id, b"<html><script>alert(1)</script>",
                             filename="shot.png", content_type="image/png")
        assert html.status_code == 415
        assert html.json()["detail"]["error_code"] == "attachment_type_not_allowed"

    @pytest.mark.parametrize("data", [
        b'<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
        b"  \n<!DOCTYPE html><p>hi</p>",
        b"\xef\xbb\xbf<?xml version='1.0'?><svg/>",
        b"<HTML><BODY>x</BODY></HTML>",
        b"MZ\x90\x00\x03\x00\x00\x00",  # an executable
        b"caf\xe9 is not utf-8",
        b"text with a \x00 byte",
        "split \u2713".encode()[:-1],  # a multi-byte character cut short
    ], ids=["svg", "html", "xml-svg", "html-upper", "executable", "latin-1", "nul", "cut-utf8"])
    async def test_anything_else_is_refused(self, client, auth_headers, test_issue, data):
        refused = await _upload(client, auth_headers, test_issue.id, data)

        assert refused.status_code == 415, refused.text
        assert refused.json()["detail"]["error_code"] == "attachment_type_not_allowed"
        assert await OxydeAttachment.objects.count() == 0
        assert _blobs() == [] and _temp_files() == []

    async def test_an_empty_file_is_refused(self, client, auth_headers, test_issue):
        refused = await _upload(client, auth_headers, test_issue.id, b"")

        assert refused.status_code == 422
        assert refused.json()["detail"]["error_code"] == "attachment_empty"

    async def test_identical_bytes_are_stored_once(self, client, auth_headers, test_issue):
        first = await _upload(client, auth_headers, test_issue.id, PNG, filename="a.png")
        second = await _upload(client, auth_headers, test_issue.id, PNG, filename="b.png")

        assert first.status_code == second.status_code == 201
        assert first.json()["id"] != second.json()["id"]
        assert _blobs() == [BlobStore().path_for(hashlib.sha256(PNG).hexdigest())]

    async def test_a_reused_blob_is_dated_anew(self, client, auth_headers, test_issue):
        first = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        blob = BlobStore().path_for(first["sha256"])
        os.utime(blob, (1_000_000, 1_000_000))  # an orphan, long unreferenced

        assert (await _upload(client, auth_headers, test_issue.id, PNG)).status_code == 201

        # A sweep's age gate sees it as in use now.
        assert blob.stat().st_mtime > 1_000_000 + 86400

    async def test_a_blob_swept_while_it_is_reused_is_stored_again(self, client, auth_headers, test_issue):
        from unittest.mock import patch

        first = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        blob = BlobStore().path_for(first["sha256"])
        utime = os.utime

        def swept_first(path, *args, **kwargs):
            # A sweep unlinks the old blob between the upload's look and
            # its re-dating.
            if path == blob:
                blob.unlink(missing_ok=True)
            return utime(path, *args, **kwargs)

        with patch("app.services.attachment_service.os.utime", side_effect=swept_first):
            again = await _upload(client, auth_headers, test_issue.id, PNG)

        assert again.status_code == 201, again.text
        assert blob.read_bytes() == PNG
        assert _temp_files() == []
        served = await client.get(again.json()["url"], headers=auth_headers)
        assert served.status_code == 200 and served.content == PNG

    async def test_a_large_body_in_one_piece_is_worked_through_in_pieces(self, client, auth_headers, test_issue):
        big = PNG + b"\x00" * (300 * 1024)
        uploaded = await _upload(client, {**auth_headers, "Idempotency-Key": "big-1"}, test_issue.id, big)

        assert uploaded.status_code == 201, uploaded.text
        assert uploaded.json()["sha256"] == hashlib.sha256(big).hexdigest()
        assert BlobStore().path_for(uploaded.json()["sha256"]).read_bytes() == big

    async def test_a_large_text_file_checks_every_piece(self, client, auth_headers, test_issue):
        # Valid until the last piece, far past the head.
        bad = b"a" * (200 * 1024) + b"\xff"
        refused = await _upload(client, auth_headers, test_issue.id, bad)

        assert refused.status_code == 415

    async def test_a_tiny_file_is_still_sniffed(self, client, auth_headers, test_issue):
        uploaded = await _upload(client, auth_headers, test_issue.id, b"%PDF-")

        assert uploaded.json()["content_type"] == "application/pdf"

    async def test_a_row_that_fails_to_insert_leaves_only_an_orphan_blob(self, client, auth_headers, test_issue):
        from unittest.mock import patch

        from httpx import ASGITransport, AsyncClient

        from app.main import app

        async with AsyncClient(
            transport=ASGITransport(app=app, raise_app_exceptions=False), base_url="http://test",
        ) as lenient:
            with patch.object(type(OxydeAttachment.objects), "create", side_effect=RuntimeError("boom")):
                failed = await _upload(lenient, auth_headers, test_issue.id, PNG)

        assert failed.status_code == 500
        assert await OxydeAttachment.objects.count() == 0
        # The blob landed before the insert: an orphan for the sweep.
        assert _blobs() == [BlobStore().path_for(hashlib.sha256(PNG).hexdigest())]
        assert _temp_files() == []

    async def test_no_filename_gets_a_default(self, client, auth_headers, test_issue):
        uploaded = await _upload(client, auth_headers, test_issue.id, PNG, filename=None)

        assert uploaded.json()["filename"] == "attachment"

    async def test_an_agent_attaches_in_its_own_project(self, client, test_user, test_team, test_project, test_issue):
        agent, key, _ = await AgentService().create(
            AgentCreate(name="Shot Bot"), test_user, test_team.id, project_id=test_project.id,
        )
        uploaded = await _upload(client, {"Authorization": f"Bearer {key}"}, test_issue.id, PNG)

        assert uploaded.status_code == 201, uploaded.text
        assert uploaded.json()["uploader_id"] == agent.id

    async def test_the_blob_lives_beside_the_database(self, db, tmp_path):
        assert BlobStore().root == tmp_path / "attachments"

    async def test_another_database_needs_a_blob_directory(self):
        from pydantic import ValidationError

        from app.config import Settings

        with pytest.raises(ValidationError, match="CHAOTIC_ATTACHMENTS_DIR"):
            Settings(database_url="postgresql+asyncpg://db/chaotic")
        assert Settings(database_url="postgresql+asyncpg://db/chaotic", attachments_dir="/srv/a").attachments_dir

    async def test_an_attachment_needs_an_issue(self, db):
        with pytest.raises(Exception, match="NOT NULL"):
            await OxydeAttachment.objects.create(sha256="0" * 64, size=1, content_type="text/plain", filename="x")

    async def test_the_blob_directory_can_be_set(self, db, tmp_path, settings_env):
        settings_env(CHAOTIC_ATTACHMENTS_DIR=tmp_path / "elsewhere")
        assert BlobStore().root == tmp_path / "elsewhere"


class TestFilenames:
    @pytest.mark.parametrize("given,kept", [
        ("../../etc/passwd", "passwd"),
        ("C:\\Users\\me\\shot.png", "shot.png"),
        ("..", "attachment"),
        (".hidden.png", "hidden.png"),
        ("bad\r\nheader: x.png", "badheader: x.png"),
        ("\u202egnp.exe", "gnp.exe"),  # a right-to-left override
        ("   ", "attachment"),
        ("caf\u00e9 \u2713.png", "caf\u00e9 \u2713.png"),
    ])
    async def test_a_name_is_display_text(self, given, kept):
        assert clean_filename(given) == kept

    async def test_a_long_name_keeps_its_extension(self):
        name = clean_filename("x" * 400 + ".png")
        assert len(name) == 255 and name.endswith(".png")

    async def test_the_cleaned_name_is_what_is_stored(self, client, auth_headers, test_issue):
        uploaded = await _upload(client, auth_headers, test_issue.id, PNG, filename="../../../tmp/evil.png")

        assert uploaded.json()["filename"] == "evil.png"


class TestLimits:
    async def test_a_declared_length_over_the_limit_is_refused_unread(
        self, client, auth_headers, test_issue, settings_env,
    ):
        settings_env(CHAOTIC_ATTACHMENT_MAX_BYTES=64)
        refused = await _upload(client, auth_headers, test_issue.id, PNG + b"x" * 100)

        assert refused.status_code == 413
        assert refused.json()["detail"]["error_code"] == "attachment_too_large"
        assert _temp_files() == [] and _blobs() == []

    async def test_an_undeclared_length_is_counted_as_it_streams(
        self, client, auth_headers, test_issue, settings_env,
    ):
        settings_env(CHAOTIC_ATTACHMENT_MAX_BYTES=100)
        sent = []

        async def chunks():
            for _ in range(10):
                sent.append(1)
                yield PNG[:40]

        refused = await client.post(
            f"/api/issues/{test_issue.id}/attachments", content=chunks(), headers=auth_headers,
        )

        assert refused.status_code == 413
        assert refused.json()["detail"]["error_code"] == "attachment_too_large"
        # Stopped at the chunk that went over: the rest was never read.
        assert len(sent) == 3
        assert await OxydeAttachment.objects.count() == 0
        assert _temp_files() == [] and _blobs() == []

    async def test_an_undeclared_length_within_the_limit_is_stored(self, client, auth_headers, test_issue):
        async def chunks():
            yield PNG[:10]
            yield PNG[10:]

        uploaded = await client.post(
            f"/api/issues/{test_issue.id}/attachments", content=chunks(), headers=auth_headers,
        )

        assert uploaded.status_code == 201, uploaded.text
        assert uploaded.json()["size"] == len(PNG)

    async def test_a_project_over_its_quota_is_refused(self, client, auth_headers, test_issue, settings_env):
        settings_env(CHAOTIC_ATTACHMENT_PROJECT_QUOTA_BYTES=len(PNG) + 10)
        assert (await _upload(client, auth_headers, test_issue.id, PNG)).status_code == 201

        refused = await _upload(client, auth_headers, test_issue.id, JPEG)

        assert refused.status_code == 409
        assert refused.json()["detail"]["error_code"] == "attachment_quota_exceeded"
        assert await OxydeAttachment.objects.count() == 1
        # Small enough to fit what is left.
        assert (await _upload(client, auth_headers, test_issue.id, b"ok")).status_code == 201

    async def test_a_full_project_is_refused_before_the_body_is_read(
        self, client, auth_headers, test_issue, settings_env,
    ):
        settings_env(CHAOTIC_ATTACHMENT_PROJECT_QUOTA_BYTES=len(PNG))
        assert (await _upload(client, auth_headers, test_issue.id, PNG)).status_code == 201

        refused = await _upload(client, auth_headers, test_issue.id, b"<svg/>")

        # The quota, not the type: the body was never looked at.
        assert refused.status_code == 409
        assert refused.json()["detail"]["error_code"] == "attachment_quota_exceeded"

    async def test_uploads_at_once_cannot_both_take_the_last_room(
        self, client, auth_headers, test_issue, settings_env,
    ):
        import asyncio
        from unittest.mock import patch

        from oxyde import AsyncDatabase, PoolSettings

        from app.services.attachment_service import AttachmentService

        # Several connections, as in production: on the harness's one
        # connection the two uploads would queue for it, lock or no lock.
        url = get_settings().database_url.replace("sqlite+aiosqlite:///", "sqlite:///")
        await AsyncDatabase(url, overwrite=True, settings=PoolSettings(max_connections=4)).connect()

        settings_env(CHAOTIC_ATTACHMENT_PROJECT_QUOTA_BYTES=len(PNG) + len(JPEG) - 1)
        check_quota = AttachmentService.check_quota
        passed: list[int] = []
        both_passed = asyncio.Event()

        async def slow_check(self, project_id, adding=0):
            await check_quota(self, project_id, adding)
            if adding:
                # Hold the room this upload was just told it has, until the
                # other upload has been told too, or a short while. Without
                # the write lock both get there and both insert; with it the
                # other waits for this one's commit and is refused.
                passed.append(adding)
                if len(passed) == 2:
                    both_passed.set()
                try:
                    await asyncio.wait_for(both_passed.wait(), 0.5)
                except TimeoutError:
                    pass

        with patch.object(AttachmentService, "check_quota", slow_check):
            answers = await asyncio.gather(
                _upload(client, auth_headers, test_issue.id, PNG),
                _upload(client, auth_headers, test_issue.id, JPEG),
            )

        assert sorted(a.status_code for a in answers) == [201, 409]
        assert await OxydeAttachment.objects.count() == 1

    async def test_a_quota_refusal_is_asked_again_under_the_same_key(
        self, client, auth_headers, test_issue, settings_env,
    ):
        settings_env(CHAOTIC_ATTACHMENT_PROJECT_QUOTA_BYTES=len(PNG) + 10)
        first = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        keyed = {**auth_headers, "Idempotency-Key": "q-1"}

        refused = await _upload(client, keyed, test_issue.id, JPEG)
        assert refused.status_code == 409
        assert refused.json()["detail"]["error_code"] == "attachment_quota_exceeded"
        assert (await client.delete(f"/api/attachments/{first['id']}", headers=auth_headers)).status_code == 204

        resent = await _upload(client, keyed, test_issue.id, JPEG)

        assert resent.status_code == 201, resent.text
        assert "idempotent-replayed" not in resent.headers

    async def test_a_transfer_encoding_makes_the_length_undeclared(self, test_issue):
        from fastapi import HTTPException
        from starlette.requests import Request

        from app.api.attachments import _refuse_oversized_body

        # Some HTTP parsers pass both headers through: the small declared
        # length must not stand for a chunked body of any size.
        request = Request({"type": "http", "headers": [
            (b"content-length", b"1"), (b"transfer-encoding", b"chunked"), (b"idempotency-key", b"te-1"),
        ]})
        with pytest.raises(HTTPException) as refused:
            await _refuse_oversized_body(request)
        assert refused.value.status_code == 411

        unkeyed = Request({"type": "http", "headers": [(b"content-length", b"1"), (b"transfer-encoding", b"chunked")]})
        assert await _refuse_oversized_body(unkeyed) is None  # counted as it streams instead

    @pytest.mark.parametrize("declared", ["+5", " 12", "1_000", "-1", "\u0661"])
    async def test_a_content_length_must_be_digits(self, test_issue, declared):
        from fastapi import HTTPException
        from starlette.requests import Request

        from app.api.attachments import _refuse_oversized_body

        request = Request({"type": "http", "headers": [(b"content-length", declared.encode())]})
        with pytest.raises(HTTPException) as refused:
            await _refuse_oversized_body(request)
        assert refused.value.status_code == 400

    async def test_the_quota_is_per_project(self, client, auth_headers, test_issue, test_team, settings_env):
        from app.oxyde_models.issue import OxydeIssue
        from app.oxyde_models.project import OxydeProject

        settings_env(CHAOTIC_ATTACHMENT_PROJECT_QUOTA_BYTES=len(PNG))
        other = await OxydeProject.objects.create(team_id=test_team.id, name="Other", key="OTH")
        other_issue = await OxydeIssue.objects.create(
            project_id=other.id, identifier="OTH-1", number=1, title="t",
        )
        assert (await _upload(client, auth_headers, test_issue.id, PNG)).status_code == 201
        assert (await _upload(client, auth_headers, other_issue.id, PNG)).status_code == 201


class TestComments:
    async def test_a_file_can_belong_to_a_comment(self, client, auth_headers, test_issue, test_user):
        comment = await OxydeIssueComment.objects.create(issue_id=test_issue.id, author_id=test_user.id, content="c")

        uploaded = await _upload(client, auth_headers, test_issue.id, PNG, comment_id=comment.id)

        assert uploaded.status_code == 201
        assert uploaded.json()["comment_id"] == comment.id

    async def test_a_comment_on_another_issue_is_not_found(self, client, auth_headers, test_issue, test_project, test_user):
        from app.oxyde_models.issue import OxydeIssue

        other = await OxydeIssue.objects.create(
            project_id=test_project.id, identifier="PROJ-99", number=99, title="other",
        )
        comment = await OxydeIssueComment.objects.create(issue_id=other.id, author_id=test_user.id, content="c")

        refused = await _upload(client, auth_headers, test_issue.id, PNG, comment_id=comment.id)

        assert refused.status_code == 404
        assert refused.json() == {"detail": "Comment not found"}

    async def test_only_to_your_own_comment(self, client, member_headers, test_issue, test_user):
        comment = await OxydeIssueComment.objects.create(issue_id=test_issue.id, author_id=test_user.id, content="c")

        refused = await _upload(client, member_headers, test_issue.id, PNG, comment_id=comment.id)

        assert refused.status_code == 403
        assert refused.json() == {"detail": "Can only attach files to your own comments"}
        assert await OxydeAttachment.objects.count() == 0

    async def test_deleting_the_comment_keeps_the_file(self, client, auth_headers, test_issue, test_user):
        comment = await OxydeIssueComment.objects.create(issue_id=test_issue.id, author_id=test_user.id, content="c")
        uploaded = await _upload(client, auth_headers, test_issue.id, PNG, comment_id=comment.id)

        deleted = await client.delete(f"/api/issues/{test_issue.id}/comments/{comment.id}", headers=auth_headers)

        assert deleted.status_code == 204
        row = await OxydeAttachment.objects.get(id=uploaded.json()["id"])
        assert row.comment_id is None


class TestDownload:
    async def test_an_image_is_served_inline_and_inert(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG, filename="shot.png")).json()

        served = await client.get(uploaded["url"], headers=auth_headers)

        assert served.status_code == 200
        assert served.content == PNG
        assert served.headers["content-type"] == "image/png"
        assert served.headers["x-content-type-options"] == "nosniff"
        assert served.headers["content-security-policy"] == "default-src 'none'; sandbox"
        assert served.headers["cache-control"] == "private, no-cache"
        assert served.headers["vary"].startswith("Authorization, X-Chaotic-Key")
        assert served.headers["etag"] == f"\"{uploaded['sha256']}\""
        assert served.headers["content-disposition"] == "inline; filename=\"shot.png\"; filename*=UTF-8''shot.png"

    @pytest.mark.parametrize("data,kind", [(PDF, "application/pdf"), (TEXT, "text/plain; charset=utf-8")],
                             ids=["pdf", "text"])
    async def test_anything_else_is_served_to_save(self, client, auth_headers, test_issue, data, kind):
        uploaded = (await _upload(client, auth_headers, test_issue.id, data, filename="log")).json()

        served = await client.get(uploaded["url"], headers=auth_headers)

        assert served.content == data
        assert served.headers["content-type"] == kind
        assert served.headers["content-disposition"].startswith("attachment; ")

    async def test_a_name_beyond_ascii_is_encoded(self, client, auth_headers, test_issue):
        name = 'caf\u00e9 "quoted" \u2713.png'
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG, filename=name)).json()

        served = await client.get(uploaded["url"], headers=auth_headers)

        assert served.headers["content-disposition"] == (
            f"inline; filename=\"caf_ _quoted_ _.png\"; filename*=UTF-8''{quote(name, safe='')}"
        )

    async def test_an_api_key_header_works(self, client, test_user, test_team, test_issue):
        agent, key, _ = await AgentService().create(AgentCreate(name="Reader"), test_user, test_team.id)
        uploaded = (await _upload(client, {"X-Chaotic-Key": key}, test_issue.id, PNG)).json()

        served = await client.get(uploaded["url"], headers={"X-Chaotic-Key": key})

        assert served.status_code == 200
        assert served.content == PNG

    async def test_no_credential_no_bytes(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()

        assert (await client.get(uploaded["url"])).status_code == 401

    async def test_a_cached_copy_is_revalidated_with_the_credential(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        etag = f'"{uploaded["sha256"]}"'

        fresh = await client.get(uploaded["url"], headers={**auth_headers, "If-None-Match": etag})
        weak = await client.get(uploaded["url"], headers={**auth_headers, "If-None-Match": f'"x", W/{etag}'})
        stale = await client.get(uploaded["url"], headers={**auth_headers, "If-None-Match": '"other"'})
        anonymous = await client.get(uploaded["url"], headers={"If-None-Match": etag})

        assert fresh.status_code == weak.status_code == 304
        assert fresh.content == b""
        assert fresh.headers["etag"] == etag
        assert fresh.headers["cache-control"] == "private, no-cache"
        assert stale.status_code == 200 and stale.content == PNG
        assert anonymous.status_code == 401

    async def test_a_deleted_attachment_is_not_revalidated(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        await client.delete(f"/api/attachments/{uploaded['id']}", headers=auth_headers)

        gone = await client.get(uploaded["url"], headers={**auth_headers, "If-None-Match": f'"{uploaded["sha256"]}"'})

        assert gone.status_code == 404

    async def test_a_missing_blob_is_gone(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        BlobStore().path_for(uploaded["sha256"]).unlink()

        served = await client.get(uploaded["url"], headers=auth_headers)

        assert served.status_code == 410
        assert served.json()["detail"]["error_code"] == "attachment_blob_missing"
        listed = await client.get(f"/api/issues/{test_issue.id}/attachments", headers=auth_headers)
        assert len(listed.json()) == 1

    async def test_an_unknown_attachment_is_not_found(self, client, auth_headers):
        served = await client.get("/api/attachments/nope/content", headers=auth_headers)

        assert served.status_code == 404
        assert served.json() == {"detail": "Attachment not found"}


class TestDelete:
    async def test_the_uploader_may_delete(self, client, member_headers, auth_headers, test_issue):
        uploaded = (await _upload(client, member_headers, test_issue.id, PNG)).json()

        deleted = await client.delete(f"/api/attachments/{uploaded['id']}", headers=member_headers)

        assert deleted.status_code == 204
        assert (await client.get(uploaded["url"], headers=auth_headers)).status_code == 404
        listed = await client.get(f"/api/issues/{test_issue.id}/attachments", headers=auth_headers)
        assert listed.json() == []
        # The blob stays for the sweep: another row or a restore may need it.
        assert BlobStore().exists(uploaded["sha256"])

    async def test_a_team_admin_may_delete(self, client, member_headers, auth_headers, test_issue):
        uploaded = (await _upload(client, member_headers, test_issue.id, PNG)).json()

        deleted = await client.delete(f"/api/attachments/{uploaded['id']}", headers=auth_headers)

        assert deleted.status_code == 204

    async def test_another_member_may_not(self, client, member_headers, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()

        refused = await client.delete(f"/api/attachments/{uploaded['id']}", headers=member_headers)

        assert refused.status_code == 403
        assert refused.json() == {"detail": "Only the uploader or a team admin can delete an attachment"}
        assert await OxydeAttachment.objects.count() == 1

    async def test_deleting_the_issue_deletes_its_attachments(self, client, auth_headers, test_issue):
        await _upload(client, auth_headers, test_issue.id, PNG)

        assert (await client.delete(f"/api/issues/{test_issue.id}", headers=auth_headers)).status_code == 204

        assert await OxydeAttachment.objects.count() == 0

    async def test_an_uploader_with_attachments_counts_as_an_author(self, client, test_user, test_team, test_issue):
        agent, key, _ = await AgentService().create(AgentCreate(name="Uploader"), test_user, test_team.id)
        await _upload(client, {"Authorization": f"Bearer {key}"}, test_issue.id, PNG)

        counts = await AgentService().authored_counts(agent.id)

        assert counts["issue attachments"] == 1


class TestIdempotency:
    def _keyed(self, headers, key="upload-1"):
        return {**headers, "Idempotency-Key": key}

    async def test_a_resend_stores_the_file_once(self, client, auth_headers, test_issue):
        first = await _upload(client, self._keyed(auth_headers), test_issue.id, PNG)
        again = await _upload(client, self._keyed(auth_headers), test_issue.id, PNG)

        assert first.status_code == again.status_code == 201
        assert again.headers.get("idempotent-replayed") == "true"
        assert again.json() == first.json()
        assert await OxydeAttachment.objects.count() == 1
        assert len(_blobs()) == 1

    async def test_other_bytes_under_the_key_are_refused(self, client, auth_headers, test_issue):
        assert (await _upload(client, self._keyed(auth_headers), test_issue.id, PNG)).status_code == 201

        reused = await _upload(client, self._keyed(auth_headers), test_issue.id, JPEG)

        assert reused.status_code == 422
        assert reused.json()["detail"]["error_code"] == "idempotency_key_reused"
        assert await OxydeAttachment.objects.count() == 1

    async def test_a_refused_upload_replays_its_refusal(self, client, auth_headers, test_issue):
        first = await _upload(client, self._keyed(auth_headers), test_issue.id, b"<svg/>")
        again = await _upload(client, self._keyed(auth_headers), test_issue.id, b"<svg/>")

        assert first.status_code == again.status_code == 415
        assert again.headers.get("idempotent-replayed") == "true"

    async def test_a_keyed_upload_must_declare_its_length(self, client, auth_headers, test_issue):
        async def chunks():
            yield PNG

        refused = await client.post(
            f"/api/issues/{test_issue.id}/attachments", content=chunks(), headers=self._keyed(auth_headers),
        )

        assert refused.status_code == 411
        assert refused.json()["detail"]["error_code"] == "length_required"
        assert await OxydeIdempotencyRecord.objects.count() == 0



def _age(path, seconds):
    """Date ``path`` back by ``seconds``."""
    stamp = path.stat().st_mtime - seconds
    os.utime(path, (stamp, stamp))


class TestSweep:
    """The orphan sweep (design answer 3B): a blob no row names goes
    once it is 30 days old; stale upload files go after a day."""

    async def _orphan(self, client, auth_headers, test_issue, data=PNG):
        uploaded = (await _upload(client, auth_headers, test_issue.id, data)).json()
        assert (await client.delete(f"/api/attachments/{uploaded['id']}", headers=auth_headers)).status_code == 204
        return BlobStore().path_for(uploaded["sha256"])

    async def test_an_old_orphan_is_deleted(self, client, auth_headers, test_issue):
        path = await self._orphan(client, auth_headers, test_issue)
        _age(path, ORPHAN_GRACE_SECONDS + 60)

        result = await AttachmentService().sweep_orphans()

        assert not path.exists()
        assert result.blobs_deleted == 1 and result.bytes_freed == len(PNG)
        assert result.deleted == [path.name]

    async def test_a_recent_orphan_is_kept(self, client, auth_headers, test_issue):
        path = await self._orphan(client, auth_headers, test_issue)
        _age(path, ORPHAN_GRACE_SECONDS - 3600)

        result = await AttachmentService().sweep_orphans()

        assert path.exists() and result.blobs_deleted == 0

    async def test_an_old_blob_a_row_names_is_kept(self, client, auth_headers, test_issue):
        uploaded = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        path = BlobStore().path_for(uploaded["sha256"])
        _age(path, ORPHAN_GRACE_SECONDS * 3)

        result = await AttachmentService().sweep_orphans()

        assert path.exists() and result.blobs_deleted == 0
        assert (await client.get(uploaded["url"], headers=auth_headers)).status_code == 200

    async def test_reuse_re_dates_an_orphan_so_the_sweep_keeps_it(self, client, auth_headers, test_issue):
        path = await self._orphan(client, auth_headers, test_issue)
        _age(path, ORPHAN_GRACE_SECONDS + 60)
        again = (await _upload(client, auth_headers, test_issue.id, PNG)).json()
        assert (await client.delete(f"/api/attachments/{again['id']}", headers=auth_headers)).status_code == 204

        result = await AttachmentService().sweep_orphans()

        assert path.exists() and result.blobs_deleted == 0

    async def test_a_row_added_after_the_first_pass_keeps_the_blob(self, client, auth_headers, test_issue, monkeypatch):
        """The locked second pass asks the table again: an upload that
        named the blob since the unlocked first pass keeps it."""
        path = await self._orphan(client, auth_headers, test_issue)
        _age(path, ORPHAN_GRACE_SECONDS + 60)
        service = AttachmentService()
        answers = iter([set(), {path.name}])

        async def referenced(shas):
            return next(answers)

        monkeypatch.setattr(service, "_referenced", referenced)

        result = await service.sweep_orphans()

        assert path.exists() and result.blobs_deleted == 0

    async def test_a_blob_re_dated_after_the_first_pass_is_kept(self, client, auth_headers, test_issue, monkeypatch):
        """The age is read again after the locked reference check: a
        reuse that re-dated the blob since the scan keeps it."""
        path = await self._orphan(client, auth_headers, test_issue)
        _age(path, ORPHAN_GRACE_SECONDS + 60)
        service = AttachmentService()
        real = service._referenced
        calls = []

        async def referenced(shas):
            calls.append(shas)
            if len(calls) == 2:
                os.utime(path)  # what an upload's commit does to a blob it reuses
            return await real(shas)

        monkeypatch.setattr(service, "_referenced", referenced)

        result = await service.sweep_orphans()

        assert len(calls) == 2
        assert path.exists() and result.blobs_deleted == 0

    async def test_stale_upload_files_are_deleted(self, db):
        tmp = BlobStore().root / "tmp"
        tmp.mkdir(parents=True, exist_ok=True)
        stale, fresh, other = tmp / "a.part", tmp / "b.part", tmp / "c.keep"
        for path in (stale, fresh, other):
            path.write_bytes(b"x")
        _age(stale, STALE_PART_SECONDS + 60)
        _age(other, STALE_PART_SECONDS + 60)

        result = await AttachmentService().sweep_orphans()

        assert result.parts_deleted == 1
        assert not stale.exists() and fresh.exists() and other.exists()

    async def test_files_not_named_like_blobs_are_left_alone(self, db):
        root = BlobStore().root
        stray = [root / "ab" / "notes.txt", root / "zz" / ("z" * 64), root / "ab" / ("cd" + "0" * 62)]
        for path in stray:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(b"x")
            _age(path, ORPHAN_GRACE_SECONDS * 2)

        result = await AttachmentService().sweep_orphans()

        assert result.blobs_deleted == 0 and all(p.exists() for p in stray)

    async def test_a_store_that_does_not_exist_is_nothing_to_sweep(self, tmp_path):
        result = await AttachmentService(BlobStore(tmp_path / "missing")).sweep_orphans()

        assert (result.blobs_deleted, result.parts_deleted) == (0, 0)
        assert not (tmp_path / "missing").exists()

    async def test_the_sweeper_sweeps_now_and_logs_a_failure(self, monkeypatch, caplog):
        from app.services import attachment_service

        runs = []

        async def sweep(self, *, now=None):
            runs.append(now)
            raise RuntimeError("disk on fire")

        monkeypatch.setattr(attachment_service.AttachmentService, "sweep_orphans", sweep)
        with caplog.at_level("ERROR"):
            await attachment_service.run_sweeper(interval=0)

        assert runs == [None]
        assert "attachment sweep failed" in caplog.text

    async def test_the_sweeper_repeats_on_its_interval(self, monkeypatch):
        import asyncio

        from app.services import attachment_service

        runs = []

        async def sweep(self, *, now=None):
            runs.append(1)
            return attachment_service.SweepResult(blobs_deleted=1, parts_deleted=1)

        monkeypatch.setattr(attachment_service.AttachmentService, "sweep_orphans", sweep)
        task = asyncio.create_task(attachment_service.run_sweeper(interval=0.01))
        while len(runs) < 3:
            await asyncio.sleep(0.01)
        task.cancel()
        with pytest.raises(asyncio.CancelledError):
            await task


class TestMcpTools:
    """issue_attach and issue_comment(attach=...) on the hosted server:
    bytes as base64, never a path (that would be the server's file)."""

    @pytest.fixture(autouse=True)
    def _as(self, test_user):
        from app.mcp_server import context
        from .mcp_principal import api_key_principal

        token = context.current_mcp_principal.set(api_key_principal(test_user))
        yield
        context.current_mcp_principal.reset(token)

    async def test_issue_attach_takes_base64(self, test_issue):
        from app.mcp_server import tools

        result = await tools.issue_attach(test_issue.identifier, content_base64=base64.b64encode(PNG).decode(),
                                          filename="shot.png")

        assert result["content_type"] == "image/png" and result["filename"] == "shot.png"
        assert result["markdown"] == f"![shot.png](/api/attachments/{result['id']}/content)"
        assert BlobStore().path_for(result["sha256"]).read_bytes() == PNG
        viewed = await tools.issue_view(test_issue.identifier)
        assert [a["id"] for a in viewed["attachments"]] == [result["id"]]

    async def test_a_path_is_refused_here(self, test_issue, tmp_path):
        from app.mcp_server import tools

        secret = tmp_path / "server-file.txt"
        secret.write_text("server secret")

        result = await tools.issue_attach(test_issue.identifier, path=str(secret))

        assert result["error"]["error_code"] == "tool_input"
        assert "content_base64" in result["error"]["message"]
        assert await OxydeAttachment.objects.count() == 0

    async def test_exactly_one_form_and_valid_base64(self, test_issue):
        from app.mcp_server import tools

        neither = await tools.issue_attach(test_issue.identifier)
        both = await tools.issue_attach(test_issue.identifier, path="x", content_base64="aGk=")
        bad = await tools.issue_attach(test_issue.identifier, content_base64="not base64!")

        for result in (neither, both, bad):
            assert result["error"]["error_code"] == "tool_input", result
        assert await OxydeAttachment.objects.count() == 0

    async def test_the_server_refusals_come_through(self, test_issue, settings_env):
        from app.mcp_server import tools

        svg = await tools.issue_attach(test_issue.identifier, content_base64=base64.b64encode(b"<svg/>").decode())
        settings_env(CHAOTIC_ATTACHMENT_MAX_BYTES=16)
        big = await tools.issue_attach(test_issue.identifier, content_base64=base64.b64encode(PNG).decode())

        assert svg["error"]["error_code"] == "attachment_type_not_allowed"
        assert svg["error"]["http_status"] == 415
        assert big["error"]["error_code"] == "attachment_too_large"
        assert big["error"]["http_status"] == 413

    async def test_comment_with_attachments(self, test_issue):
        from app.mcp_server import tools

        result = await tools.issue_comment(test_issue.identifier, content="Fixed", attach=[
            {"content_base64": base64.b64encode(PNG).decode(), "filename": "after.png"},
            {"content_base64": base64.b64encode(TEXT).decode(), "filename": "run [1].log"},
        ])

        png, text = result["attachments"]
        assert result["content"] == (
            f"Fixed\n\n![after.png](/api/attachments/{png['id']}/content)\n"
            f"[run \\[1\\].log](/api/attachments/{text['id']}/content)"
        )
        assert await OxydeAttachment.objects.count() == 2

    async def test_a_refused_file_posts_nothing_and_removes_the_rest(self, test_issue):
        from app.mcp_server import tools

        result = await tools.issue_comment(test_issue.identifier, content="Fixed", attach=[
            {"content_base64": base64.b64encode(PNG).decode(), "filename": "after.png"},
            {"content_base64": base64.b64encode(b"<html></html>").decode(), "filename": "page.html"},
        ])

        assert result["error"]["error_code"] == "attachment_type_not_allowed"
        assert result["error"]["message"].startswith("Could not attach page.html, so the comment was not posted")
        assert "removed again" in result["error"]["message"]
        assert await OxydeAttachment.objects.count() == 0
        assert await OxydeIssueComment.objects.filter(issue_id=test_issue.id).count() == 0
